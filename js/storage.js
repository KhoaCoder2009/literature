/* =========================================================================
   4. DATA PERSISTENCE & SUPABASE CLOUD SYNC
   ========================================================================= */

function getSupabaseRequestHeaders(extra = {}) {
  return {
    'apikey': appConfig.supabase.anonKey,
    'Authorization': `Bearer ${appConfig.supabase.anonKey}`,
    'Content-Type': 'application/json',
    ...extra
  };
}

async function loadSetsFromSupabase() {
  if (!isSupabaseConfigured()) return false;
  try {
    const url = `${appConfig.supabase.url.replace(/\/$/, '')}/rest/v1/${appConfig.supabase.table || 'question_sets'}?select=id,title,topic,status,qs&order=updated_at.desc`;
    const res = await fetch(url, {
      method: 'GET',
      headers: getSupabaseRequestHeaders()
    });
    if (!res.ok) throw new Error('Supabase request failed');
    const rows = await res.json();
    if (Array.isArray(rows)) {
      sets = rows.filter(row => row.status !== 'deleted' && !String(row.id).startsWith('set_')).map(row => ({
        id: String(row.id),
        emo: row.emo || '📖',
        title: row.title || 'Bộ câu hỏi',
        topic: row.topic || '',
        status: row.status || 'draft',
        qs: Array.isArray(row.qs) ? row.qs : []
      }));
      return true;
    }
  } catch (e) {
    console.warn('Supabase load failed, fallback localStorage:', e);
  }
  return false;
}

async function archiveQuestionSetInSupabase(id) {
  if (!isSupabaseConfigured()) return;
  const table = appConfig.supabase.table || 'question_sets';
  const query = new URLSearchParams({ id: `eq.${String(id)}` });
  const url = `${appConfig.supabase.url.replace(/\/$/, '')}/rest/v1/${table}?${query}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: getSupabaseRequestHeaders({ 'Prefer': 'return=representation' }),
    body: JSON.stringify({ status: 'deleted' })
  });
  if (!res.ok) {
    const details = await res.text();
    throw new Error(details || `Supabase delete failed (${res.status})`);
  }
  const archivedRows = await res.json();
  if (!Array.isArray(archivedRows) || !archivedRows.some(row => String(row.id) === String(id))) {
    throw new Error('Không tìm thấy bộ câu hỏi trên Supabase.');
  }
}

async function archiveQuestionSets(ids) {
  const results = await Promise.allSettled(ids.map(id => archiveQuestionSetInSupabase(id)));
  return results.map((result, index) => ({
    id: String(ids[index]),
    error: result.status === 'rejected' ? result.reason : null
  }));
}

async function syncSetsToSupabase() {
  if (!isSupabaseConfigured()) return;
  try {
    const rows = sets.map(s => ({
      id: String(s.id),
      title: s.title,
      topic: s.topic || '',
      status: s.status || 'draft',
      qs: s.qs || []
    }));
    const url = `${appConfig.supabase.url.replace(/\/$/, '')}/rest/v1/${appConfig.supabase.table || 'question_sets'}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: getSupabaseRequestHeaders({ 'Prefer': 'resolution=merge-duplicates' }),
      body: JSON.stringify(rows)
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || 'Supabase sync failed');
    }
  } catch (e) {
    console.warn('Supabase save failed:', e);
  }
}

let syncDebounceTimer = null;
function setSyncBadge(state, text) {
  const badge = $('#sync-badge');
  if (!badge) return;
  badge.className = 'sync-badge ' + (state || '');
  badge.textContent = { saving: '⏳ Đang lưu...', saved: '✅ Đã đồng bộ', error: '⚠️ Lỗi lưu' }[state] || text || '☁️ Đã đồng bộ';
}

const save = () => { 
  try { localStorage.vq_cartoon = JSON.stringify(sets); } catch (e) {}
  setSyncBadge('saving');
  clearTimeout(syncDebounceTimer);
  syncDebounceTimer = setTimeout(async () => {
    try {
      await syncSetsToSupabase();
      setSyncBadge('saved');
      setTimeout(() => setSyncBadge('', '☁️ Đã đồng bộ'), 2000);
    } catch (e) {
      setSyncBadge('error');
    }
  }, 800);
};

let _lbAllRows = [];

R.home = async () => {
  if (typeof applyHeroQuote === 'function') {
    applyHeroQuote(heroQuoteIndex, false);
  }
  if (typeof startHeroQuoteRotation === 'function') {
    startHeroQuoteRotation();
  }
  if (typeof renderHomeSets === 'function') {
    renderHomeSets();
  }
  
  const host = $('#lb-container');
  if (!host) return;
  if (!isSupabaseConfigured()) {
    host.textContent = 'Chưa kết nối Supabase nên bảng xếp hạng chưa thể tải.';
    return;
  }
  host.innerHTML = '<p class="mut" role="status">⏳ Đang tải bảng xếp hạng...</p>';
  try {
    const table = appConfig.supabase.leaderboardTable || 'leaderboard_entries';
    const url = `${appConfig.supabase.url.replace(/\/$/, '')}/rest/v1/${table}?select=player_name,class_name,set_title,score,correct_count,question_count,accuracy,game_mode,elapsed_seconds&order=score.desc,correct_count.desc,created_at.asc&limit=50`;
    const res = await fetch(url, {
      headers: {
        'apikey': appConfig.supabase.anonKey,
        'Authorization': `Bearer ${appConfig.supabase.anonKey}`,
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) {
      const details = await res.text();
      throw new Error(details || `Supabase request failed (${res.status})`);
    }
    const rows = await res.json();
    if (!Array.isArray(rows)) throw new Error('Bảng xếp hạng trả về dữ liệu không hợp lệ.');
    _lbAllRows = rows;
    renderLeaderboard();
  } catch (error) {
    console.error('Leaderboard load failed:', error);
    host.innerHTML = '<p role="alert">Không tải được bảng xếp hạng. Kiểm tra bảng leaderboard_entries và quyền đọc Supabase, rồi thử tải lại.</p><button class="btn gh sm" onclick="R.home()">↻ Tải lại</button>';
  }
};

function renderLeaderboard() {
  const host = $('#lb-container');
  if (!host) return;
  const search = N($('#lb-search')?.value || '');
  const mode = $('#lb-mode-filter')?.value || '';

  const AVATAR_GRADIENTS = [
    'linear-gradient(135deg, #f43f5e, #fb7185)',
    'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    'linear-gradient(135deg, #06b6d4, #22d3ee)',
    'linear-gradient(135deg, #10b981, #34d399)',
    'linear-gradient(135deg, #f59e0b, #fbbf24)',
    'linear-gradient(135deg, #ec4899, #f472b6)'
  ];

  const MEDAL_GOLD_SVG = '<svg class="lb-medal-svg" viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Huy chương vàng"><path d="M6.5 2H9.5L12 8L14.5 2H17.5L13.8 10.5H10.2L6.5 2Z" fill="#EF4444"/><path d="M9.5 2L12 7.2L14.5 2H12.5L12 3.2L11.5 2H9.5Z" fill="#3B82F6"/><circle cx="12" cy="15.2" r="6.8" fill="#F59E0B" stroke="#B45309" stroke-width="1.3"/><circle cx="12" cy="15.2" r="5.2" fill="#FDE047"/><polygon points="12,12.5 12.85,14.3 14.8,14.5 13.35,15.85 13.75,17.75 12,16.75 10.25,17.75 10.65,15.85 9.2,14.5 11.15,14.3" fill="#B45309"/></svg>';
  const MEDAL_SILVER_SVG = '<svg class="lb-medal-svg" viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Huy chương bạc"><path d="M6.5 2H9.5L12 8L14.5 2H17.5L13.8 10.5H10.2L6.5 2Z" fill="#3B82F6"/><path d="M9.5 2L12 7.2L14.5 2H12.5L12 3.2L11.5 2H9.5Z" fill="#0EA5E9"/><circle cx="12" cy="15.2" r="6.8" fill="#94A3B8" stroke="#475569" stroke-width="1.3"/><circle cx="12" cy="15.2" r="5.2" fill="#F1F5F9"/><polygon points="12,12.5 12.85,14.3 14.8,14.5 13.35,15.85 13.75,17.75 12,16.75 10.25,17.75 10.65,15.85 9.2,14.5 11.15,14.3" fill="#475569"/></svg>';
  const MEDAL_BRONZE_SVG = '<svg class="lb-medal-svg" viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Huy chương đồng"><path d="M6.5 2H9.5L12 8L14.5 2H17.5L13.8 10.5H10.2L6.5 2Z" fill="#10B981"/><path d="M9.5 2L12 7.2L14.5 2H12.5L12 3.2L11.5 2H9.5Z" fill="#059669"/><circle cx="12" cy="15.2" r="6.8" fill="#EA580C" stroke="#9A3412" stroke-width="1.3"/><circle cx="12" cy="15.2" r="5.2" fill="#FED7AA"/><polygon points="12,12.5 12.85,14.3 14.8,14.5 13.35,15.85 13.75,17.75 12,16.75 10.25,17.75 10.65,15.85 9.2,14.5 11.15,14.3" fill="#9A3412"/></svg>';

  let rows = _lbAllRows;
  if (search) rows = rows.filter(r => N(r.player_name + ' ' + (r.class_name || '') + ' ' + r.set_title).includes(search));
  if (mode) rows = rows.filter(r => r.game_mode === mode);

  if (!rows.length) {
    host.innerHTML = `
      <div class="lb-empty-state">
        <div class="lb-empty-icon">🏆</div>
        <p class="lb-empty-title">Chưa có thành tích nào phù hợp</p>
        <p class="lb-empty-hint">${search || mode ? 'Thử xóa bộ lọc để xem toàn bộ bảng vàng.' : 'Hãy hoàn thành một lượt ôn tập để ghi danh vào bảng vàng!'}</p>
      </div>
    `;
    return;
  }

  host.innerHTML = `
    <div class="lb-table-wrap">
      <table class="leaderboard">
        <thead>
          <tr>
            <th style="width:85px;">Hạng</th>
            <th>Học sinh</th>
            <th style="width:85px;">Lớp</th>
            <th>Bộ đề ôn tập</th>
            <th style="width:115px;">Điểm số</th>
            <th style="width:155px;">Độ chính xác</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row, index) => {
            const acc = Number(row.accuracy) || 0;
            const score = Number(row.score) || 0;
            const correct = Number(row.correct_count) || 0;
            const total = Number(row.question_count) || 0;
            const name = (row.player_name || 'Học sinh').trim();
            const initial = name ? name.charAt(0).toUpperCase() : 'H';
            const gradIndex = Math.abs(name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)) % AVATAR_GRADIENTS.length;
            const avatarGrad = AVATAR_GRADIENTS[gradIndex];

            let rowClass = 'lb-row';
            let badgeClass = 'lb-badge-regular';
            let badgeContent = `<span class="lb-rank-num">#${index + 1}</span>`;

            if (index === 0) {
              rowClass += ' lb-row-top1';
              badgeClass = 'lb-badge-gold';
              badgeContent = `${MEDAL_GOLD_SVG} <span class="lb-rank-num">1</span>`;
            } else if (index === 1) {
              rowClass += ' lb-row-top2';
              badgeClass = 'lb-badge-silver';
              badgeContent = `${MEDAL_SILVER_SVG} <span class="lb-rank-num">2</span>`;
            } else if (index === 2) {
              rowClass += ' lb-row-top3';
              badgeClass = 'lb-badge-bronze';
              badgeContent = `${MEDAL_BRONZE_SVG} <span class="lb-rank-num">3</span>`;
            }

            const barCls = acc >= 80 ? 'acc-bar-high' : acc >= 50 ? 'acc-bar-mid' : 'acc-bar-low';

            return `
            <tr class="${rowClass}">
              <td>
                <span class="lb-rank-badge ${badgeClass}">${badgeContent}</span>
              </td>
              <td>
                <div class="lb-player-cell">
                  <div class="lb-avatar-initial" style="background:${avatarGrad};">${initial}</div>
                  <span class="lb-player-name">${esc(name)}</span>
                </div>
              </td>
              <td>
                ${row.class_name ? `<span class="lb-class-pill">${esc(row.class_name)}</span>` : `<span class="lb-dash">—</span>`}
              </td>
              <td>
                <span class="lb-set-title" title="${esc(row.set_title)}">📖 ${esc(row.set_title)}</span>
              </td>
              <td>
                <div class="lb-score-wrap">
                  <span class="lb-score-num">${score}</span>
                  <span class="lb-score-pts">pts</span>
                </div>
              </td>
              <td>
                <div class="lb-acc-wrap">
                  <div class="lb-acc-top">
                    <span class="lb-acc-pct">${acc.toFixed(0)}%</span>
                    <span class="lb-acc-fraction">${correct}/${total} câu</span>
                  </div>
                  <div class="acc-bar">
                    <div class="acc-bar-fill ${barCls}" style="width:${Math.min(100, Math.max(0, acc))}%;"></div>
                  </div>
                </div>
              </td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function resetLbFilters() {
  const s = $('#lb-search'); if (s) s.value = '';
  const m = $('#lb-mode-filter'); if (m) m.value = '';
  renderLeaderboard();
}

async function saveScoreToLeaderboard() {
  if (!G || !G.scoreEntry) return;
  const status = $('#score-save-status');
  const retryButton = $('#score-save-retry');
  if (G.scoreSaved) {
    if (status) status.textContent = '✅ Đã lưu kết quả vào bảng xếp hạng.';
    if (retryButton) retryButton.hidden = true;
    return;
  }
  if (!isSupabaseConfigured()) {
    if (status) status.textContent = 'ℹ️ Chưa cấu hình Supabase nên điểm số chỉ lưu trong phiên chơi này.';
    if (retryButton) retryButton.hidden = true;
    return;
  }
  G.scoreSavePending = true;
  if (status) status.textContent = '⏳ Đang lưu kết quả bảng xếp hạng...';
  if (retryButton) retryButton.hidden = true;
  try {
    const table = appConfig.supabase.leaderboardTable || 'leaderboard_entries';
    const url = `${appConfig.supabase.url.replace(/\/$/, '')}/rest/v1/${table}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'apikey': appConfig.supabase.anonKey,
        'Authorization': `Bearer ${appConfig.supabase.anonKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(G.scoreEntry)
    });
    if (!res.ok) {
      const details = await res.text();
      throw new Error(details || `Supabase leaderboard save failed (${res.status})`);
    }
    G.scoreSaved = true;
    if (status) status.textContent = '✅ Đã lưu kết quả thành công vào bảng xếp hạng!';
    if (retryButton) retryButton.hidden = true;
  } catch (error) {
    console.error('Save score failed:', error);
    if (status) status.textContent = '⚠️ Không thể lưu điểm lên máy chủ.';
    if (retryButton) retryButton.hidden = false;
  } finally {
    G.scoreSavePending = false;
  }
}

// =========================================================================
// QUIZ & SUBMISSION HISTORY SYSTEM (LỊCH SỬ BÀI LÀM - CLOUD + LOCAL)
// =========================================================================

const QUIZ_HISTORY_KEY = 'vq_quiz_history_v1';
let currentHistorySearchQuery = '';
let isSyncingQuizHistory = false;

function getQuizHistory() {
  try {
    const raw = localStorage.getItem(QUIZ_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse quiz history:', e);
    return [];
  }
}

function mapSupabaseRowToHistory(row) {
  const d = new Date(row.created_at || Date.now());
  const details = Array.isArray(row.details) ? row.details : [];
  const hasGradedDetail = details.some(x => x && (x.isGraded || x.gradeStatus || (x.points !== undefined && x.points > 0)));
  const isGraded = Boolean(row.is_graded || hasGradedDetail);
  const teacherFeedback = row.teacher_feedback || (details.find(x => x && x.generalTeacherFeedback)?.generalTeacherFeedback || '');

  return {
    id: String(row.id),
    userId: row.user_id || '',
    timestamp: d.getTime(),
    dateStr: d.toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }),
    type: row.type || 'quiz',
    playerName: row.player_name || 'Học sinh',
    className: row.class_name || '',
    setId: row.set_id || '',
    setTitle: row.set_title || 'Bài làm',
    setTopic: row.set_topic || '',
    setEmo: row.set_emo || (row.type === 'writing' ? '✍️' : (row.type === 'reading' ? '📑' : '📖')),
    score: parseFloat(row.score) || 0,
    correctCount: Number(row.correct_count) || 0,
    wrongCount: Number(row.wrong_count) || 0,
    savedShortCount: Number(row.saved_short_count) || 0,
    answeredCount: Number(row.saved_short_count) || 0,
    totalWords: Number(row.saved_short_count) || (details.reduce((acc, d) => acc + (d.words || (d.userAnswer ? d.userAnswer.trim().split(/\s+/).filter(Boolean).length : 0)), 0)),
    totalQuestions: Number(row.total_questions) || 0,
    accuracy: Number(row.accuracy) || 0,
    elapsedSeconds: Number(row.elapsed_seconds) || 0,
    details: details,
    isGraded: isGraded,
    teacherFeedback: teacherFeedback,
    teacherName: row.teacher_name || '',
    gradedAt: row.graded_at ? new Date(row.graded_at).getTime() : (isGraded ? d.getTime() : 0),
    gradedDateStr: row.graded_at ? new Date(row.graded_at).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }) : ''
  };
}

// Xử lý xung đột giữa dữ liệu máy chủ và dữ liệu cục bộ đã được chấm điểm
function mergeHistoryItem(localItem, cloudItem) {
  if (!cloudItem) return localItem;
  if (!localItem) return cloudItem;

  // Nếu bản cục bộ đã được giáo viên chấm nhưng trên đám mây chưa được chấm -> Giữ bản cục bộ và đồng bộ lên đám mây
  if (localItem.isGraded && !cloudItem.isGraded) {
    saveQuizAttemptToSupabase(localItem);
    return localItem;
  }
  // Nếu trên đám mây đã được chấm mà cục bộ chưa -> Giữ bản đám mây
  if (cloudItem.isGraded && !localItem.isGraded) {
    return cloudItem;
  }
  // Nếu cả hai đều đã được chấm điểm -> Chọn bản có thời gian chấm (gradedAt) mới hơn
  if (localItem.isGraded && cloudItem.isGraded) {
    const localGraded = localItem.gradedAt || localItem.timestamp || 0;
    const cloudGraded = cloudItem.gradedAt || cloudItem.timestamp || 0;
    if (localGraded >= cloudGraded) {
      if (localGraded > cloudGraded) saveQuizAttemptToSupabase(localItem);
      return localItem;
    }
    return cloudItem;
  }
  // Nếu cả hai chưa được chấm điểm -> Giữ bản mới hơn
  const localTime = localItem.timestamp || 0;
  const cloudTime = cloudItem.timestamp || 0;
  return localTime >= cloudTime ? localItem : cloudItem;
}

async function saveQuizAttemptToSupabase(entry) {
  if (!isSupabaseConfigured()) return false;
  try {
    let playerName = String(entry.playerName || '').trim();
    let className = String(entry.className || '').trim();
    if (!playerName) playerName = 'Học sinh';

    const userId = localStorage.getItem('vq_user_id') || '';
    const table = appConfig.supabase.historyTable || 'quiz_submissions';
    const baseUrl = `${appConfig.supabase.url.replace(/\/$/, '')}/rest/v1/${table}`;

    const scoreNum = Math.round((parseFloat(entry.score) || 0) * 100) / 100;
    const isGraded = Boolean(entry.isGraded);
    const teacherFeedback = String(entry.teacherFeedback || '').trim();
    const teacherName = String(entry.teacherName || '').trim();
    const gradedAtIso = entry.gradedAt 
      ? new Date(entry.gradedAt).toISOString() 
      : (isGraded ? new Date().toISOString() : null);

    const details = Array.isArray(entry.details) ? entry.details : [];

    // Nếu bài làm này đã được chấm điểm, thử cập nhật nhanh bằng PATCH trước
    if (isGraded) {
      try {
        const patchRes = await fetch(`${baseUrl}?id=eq.${encodeURIComponent(entry.id)}`, {
          method: 'PATCH',
          headers: getSupabaseRequestHeaders({ 'Prefer': 'return=minimal' }),
          body: JSON.stringify({
            score: scoreNum,
            details: details,
            is_graded: true,
            teacher_feedback: teacherFeedback,
            teacher_name: teacherName,
            graded_at: gradedAtIso
          })
        });

        if (patchRes.ok) {
          return true;
        }
      } catch (patchErr) {
        console.warn('Supabase history PATCH note:', patchErr);
      }
    }

    // Nếu không hoặc chưa có trên máy chủ, thực hiện POST upsert đầy đủ
    const row = {
      id: String(entry.id),
      user_id: userId,
      type: entry.type || 'quiz',
      player_name: playerName.slice(0, 50),
      class_name: className.slice(0, 30),
      set_id: String(entry.setId || 'set_default'),
      set_title: String(entry.setTitle || 'Bài làm').slice(0, 100),
      set_topic: String(entry.setTopic || '').slice(0, 100),
      set_emo: String(entry.setEmo || '📖').slice(0, 10),
      score: scoreNum,
      correct_count: Math.max(0, Number(entry.correctCount) || 0),
      wrong_count: Math.max(0, Number(entry.wrongCount) || 0),
      saved_short_count: Math.max(0, Number(entry.savedShortCount || entry.answeredCount) || 0),
      total_questions: Math.max(0, Number(entry.totalQuestions) || 0),
      accuracy: Math.min(100, Math.max(0, Number(entry.accuracy) || 0)),
      elapsed_seconds: Math.max(0, Number(entry.elapsedSeconds) || 0),
      details: details,
      created_at: new Date(entry.timestamp || Date.now()).toISOString(),
      is_graded: isGraded,
      teacher_feedback: teacherFeedback,
      teacher_name: teacherName,
      graded_at: gradedAtIso
    };

    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: getSupabaseRequestHeaders({ 'Prefer': 'resolution=merge-duplicates' }),
      body: JSON.stringify(row)
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn('Supabase history save note:', res.status, errText);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase history sync error:', err);
    return false;
  }
}

async function loadQuizHistoryFromSupabase(forceNotice) {
  if (!isSupabaseConfigured() || isSyncingQuizHistory) return;
  const indicator = document.getElementById('history-sync-indicator');
  const pageBadge = document.getElementById('history-sync-badge-page');
  const setIndicatorText = (txt, cls) => {
    if (indicator) indicator.textContent = txt;
    if (pageBadge) {
      pageBadge.textContent = txt;
      pageBadge.className = 'sync-badge ' + (cls || '');
    }
  };
  setIndicatorText('☁️ Đang đồng bộ...');
  isSyncingQuizHistory = true;

  try {
    const table = appConfig.supabase.historyTable || 'quiz_submissions';
    const queryParams = 'select=*&order=created_at.desc&limit=100';
    const url = `${appConfig.supabase.url.replace(/\/$/, '')}/rest/v1/${table}?${queryParams}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: getSupabaseRequestHeaders()
    });

    if (res.ok) {
      const rows = await res.json();
      if (Array.isArray(rows)) {
        const cloudEntries = rows.map(mapSupabaseRowToHistory);
        const localList = getQuizHistory();
        const mergedMap = new Map();
        const localMap = new Map(localList.map(item => [String(item.id), item]));

        // Hợp nhất dữ liệu thông minh không làm mất kết quả chấm cục bộ
        cloudEntries.forEach(cloudItem => {
          const id = String(cloudItem.id);
          const localItem = localMap.get(id);
          mergedMap.set(id, mergeHistoryItem(localItem, cloudItem));
        });
        localList.forEach(item => {
          if (!mergedMap.has(String(item.id))) {
            mergedMap.set(String(item.id), item);
          }
        });

        const mergedList = Array.from(mergedMap.values())
          .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
          .slice(0, 100);

        localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(mergedList));
        renderHistoryList();
        if (typeof renderHistoryPage === 'function') renderHistoryPage();
        setIndicatorText('☁️ Đã đồng bộ Database', 'saved');
        if (forceNotice) toast('Đã đồng bộ lịch sử bài làm từ máy chủ!', 'ok');
      } else {
        setIndicatorText('☁️ Đã kết nối Database', 'saved');
      }
    } else {
      setIndicatorText('💾 Lưu trên máy', '');
    }
  } catch (err) {
    console.warn('Load history from Supabase failed:', err);
    setIndicatorText('💾 Lưu trên máy', '');
  } finally {
    isSyncingQuizHistory = false;
  }
}

function saveQuizAttemptToHistory(entry) {
  try {
    const history = getQuizHistory();
    history.unshift(entry);
    if (history.length > 100) history.length = 100;
    localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(history));

    saveQuizAttemptToSupabase(entry);
    return true;
  } catch (e) {
    console.error('Failed to save quiz attempt to history:', e);
    return false;
  }
}

function deleteHistoryItem(id) {
  if (!confirm('Bạn có chắc chắn muốn xóa bản ghi lịch sử này?')) return;
  try {
    let history = getQuizHistory();
    history = history.filter(item => String(item.id) !== String(id));
    localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(history));
    renderHistoryList();
    if (typeof renderHistoryPage === 'function') renderHistoryPage();
    toast('Đã xóa lượt làm bài khỏi lịch sử.', 'ok');

    if (isSupabaseConfigured()) {
      const table = appConfig.supabase.historyTable || 'quiz_submissions';
      const url = `${appConfig.supabase.url.replace(/\/$/, '')}/rest/v1/${table}?id=eq.${encodeURIComponent(String(id))}`;
      fetch(url, {
        method: 'DELETE',
        headers: getSupabaseRequestHeaders()
      }).catch(e => console.warn('Supabase history delete failed:', e));
    }
  } catch (e) {
    console.error(e);
  }
}

function clearAllQuizHistory() {
  if (window.Auth && !window.Auth.isTeacher()) {
    return toast('Chỉ tài khoản Giáo viên mới có quyền xóa toàn bộ lịch sử bài làm.', 'bad');
  }
  const history = getQuizHistory();
  if (!history.length) return toast('Lịch sử hiện đang trống.', 'bad');
  if (!confirm(`Bạn có chắc muốn xóa toàn bộ ${history.length} lượt làm bài trong lịch sử trên máy này?`)) return;
  try {
    localStorage.removeItem(QUIZ_HISTORY_KEY);
    renderHistoryList();
    if (typeof renderHistoryPage === 'function') renderHistoryPage();
    toast('Đã xóa toàn bộ lịch sử bài làm trên máy này.', 'ok');
  } catch (e) {
    console.error(e);
  }
}

// =========================================================================
// DEDICATED HISTORY PAGE ROUTING & RENDERING (TRANG LỊCH SỬ RIÊNG BIỆT)
// =========================================================================

let currentHistoryTypeFilter = 'all'; // 'all' | 'quiz' | 'reading'
let historyPageSearchQuery = '';
let historyPageSetFilter = '';

R.history = (targetSetId) => {
  if (targetSetId) {
    historyPageSetFilter = String(targetSetId);
  }
  const searchInput = document.getElementById('history-page-search');
  if (searchInput && !targetSetId) {
    historyPageSearchQuery = searchInput.value.trim().toLowerCase();
  } else if (searchInput && targetSetId) {
    searchInput.value = '';
    historyPageSearchQuery = '';
  }

  updateHistoryPageSetDropdown();
  renderHistoryPage();

  if (isSupabaseConfigured()) {
    loadQuizHistoryFromSupabase(false);
  }
};

function setHistoryTypeFilter(type) {
  currentHistoryTypeFilter = type || 'all';
  document.querySelectorAll('#s-history .topic-chip').forEach(btn => {
    btn.classList.toggle('active', btn.id === `hist-chip-${type}`);
  });
  renderHistoryPage();
}

function onHistoryPageSearchInput() {
  const input = document.getElementById('history-page-search');
  historyPageSearchQuery = (input ? input.value : '').trim().toLowerCase();
  renderHistoryPage();
}

function onHistoryPageSetFilterChange() {
  const select = document.getElementById('history-page-set-filter');
  historyPageSetFilter = select ? select.value : '';
  renderHistoryPage();
}

function clearHistoryPageSetFilter() {
  historyPageSetFilter = '';
  historyPageSearchQuery = '';
  const searchInput = document.getElementById('history-page-search');
  if (searchInput) searchInput.value = '';
  const select = document.getElementById('history-page-set-filter');
  if (select) select.value = '';
  renderHistoryPage();
}

function updateHistoryPageSetDropdown() {
  const select = document.getElementById('history-page-set-filter');
  if (!select) return;
  const allHistory = getQuizHistory();
  const setMap = new Map();
  allHistory.forEach(item => {
    const sId = String(item.setId || '');
    if (sId && !setMap.has(sId)) {
      setMap.set(sId, { id: sId, title: item.setTitle || 'Bộ đề', emo: item.setEmo || '📖', count: 1 });
    } else if (sId && setMap.has(sId)) {
      setMap.get(sId).count++;
    }
  });

  const curVal = historyPageSetFilter || '';
  let html = `<option value="">📚 Tất cả bộ đề (${allHistory.length})</option>`;
  Array.from(setMap.values()).forEach(s => {
    const sel = s.id === curVal ? 'selected' : '';
    html += `<option value="${esc(s.id)}" ${sel}>${s.emo} ${esc(s.title)} (${s.count} lượt)</option>`;
  });
  select.innerHTML = html;
}

function renderHistoryPage() {
  const container = document.getElementById('history-page-list-container');
  if (!container) return;

  const allHistory = getQuizHistory();
  updateHistoryPageSetDropdown();

  // 1. Stats calculation
  const totalAttempts = allHistory.length;
  let totalAcc = 0;
  let accCount = 0;
  let totalSavedShort = 0;
  let totalSecs = 0;

  allHistory.forEach(h => {
    if (h.type === 'quiz' || !h.type) {
      if (h.accuracy !== undefined) {
        totalAcc += Number(h.accuracy) || 0;
        accCount++;
      }
      totalSavedShort += Number(h.savedShortCount) || 0;
      totalSecs += Number(h.elapsedSeconds) || 0;
    } else if (h.type === 'reading') {
      totalSavedShort += Number(h.answeredCount) || 0;
    } else if (h.type === 'writing') {
      totalSavedShort += Number(h.answeredCount || h.totalQuestions) || 0;
      totalSecs += Number(h.elapsedSeconds) || 0;
    }
  });

  const avgAcc = accCount ? Math.round(totalAcc / accCount) : 0;
  const totalMins = Math.round(totalSecs / 60);

  const statAttemptsEl = document.getElementById('stat-total-attempts');
  const statAvgAccEl = document.getElementById('stat-avg-accuracy');
  const statSavedShortEl = document.getElementById('stat-total-saved-short');
  const statTotalTimeEl = document.getElementById('stat-total-time');

  if (statAttemptsEl) statAttemptsEl.textContent = totalAttempts;
  if (statAvgAccEl) statAvgAccEl.textContent = `${avgAcc}%`;
  if (statSavedShortEl) statSavedShortEl.textContent = totalSavedShort;
  if (statTotalTimeEl) statTotalTimeEl.textContent = totalMins > 60 ? `${Math.floor(totalMins/60)}h ${totalMins%60}p` : `${totalMins}p`;

  const countAllEl = document.getElementById('hist-count-all');
  const countQuizEl = document.getElementById('hist-count-quiz');
  const countReadingEl = document.getElementById('hist-count-reading');
  const countWritingEl = document.getElementById('hist-count-writing');
  const countUngradedEl = document.getElementById('hist-count-ungraded');
  const countGradedEl = document.getElementById('hist-count-graded');
  if (countAllEl) countAllEl.textContent = `(${allHistory.length})`;
  if (countQuizEl) countQuizEl.textContent = `(${allHistory.filter(h => h.type === 'quiz' || !h.type).length})`;
  if (countReadingEl) countReadingEl.textContent = `(${allHistory.filter(h => h.type === 'reading').length})`;
  if (countWritingEl) countWritingEl.textContent = `(${allHistory.filter(h => h.type === 'writing').length})`;
  if (countUngradedEl) countUngradedEl.textContent = `(${allHistory.filter(h => !h.isGraded && (h.type === 'reading' || h.type === 'writing' || h.savedShortCount > 0 || (Array.isArray(h.details) && h.details.some(d => d.status === 'saved')))).length})`;
  if (countGradedEl) countGradedEl.textContent = `(${allHistory.filter(h => h.isGraded).length})`;

  // 2. Filter records
  let filtered = allHistory;
  if (currentHistoryTypeFilter && currentHistoryTypeFilter !== 'all') {
    filtered = filtered.filter(h => {
      const isQuiz = h.type === 'quiz' || !h.type;
      if (currentHistoryTypeFilter === 'quiz') return isQuiz;
      if (currentHistoryTypeFilter === 'reading') return h.type === 'reading';
      if (currentHistoryTypeFilter === 'writing') return h.type === 'writing';
      if (currentHistoryTypeFilter === 'ungraded') {
        return !h.isGraded && (h.type === 'reading' || h.type === 'writing' || h.savedShortCount > 0 || (Array.isArray(h.details) && h.details.some(d => d.status === 'saved')));
      }
      if (currentHistoryTypeFilter === 'graded') {
        return Boolean(h.isGraded);
      }
      return true;
    });
  }

  if (historyPageSetFilter) {
    filtered = filtered.filter(h => String(h.setId) === String(historyPageSetFilter));
  }

  if (historyPageSearchQuery) {
    filtered = filtered.filter(h => {
      const hay = (String(h.setTitle) + ' ' + String(h.playerName) + ' ' + String(h.className) + ' ' + String(h.setTopic || '')).toLowerCase();
      return hay.includes(historyPageSearchQuery);
    });
  }

  // Active filter badge update
  const badgeWrap = document.getElementById('history-page-active-filter-badge');
  const badgeText = document.getElementById('history-page-filter-badge-text');
  if (badgeWrap && badgeText) {
    if (historyPageSetFilter) {
      const targetItem = allHistory.find(h => String(h.setId) === String(historyPageSetFilter));
      const targetTitle = targetItem ? targetItem.setTitle : 'Bộ câu hỏi đã chọn';
      badgeText.innerHTML = `🔍 Đang xem lịch sử bộ đề: <b>${esc(targetTitle)}</b> (${filtered.length} lượt)`;
      badgeWrap.style.display = 'flex';
    } else {
      badgeWrap.style.display = 'none';
    }
  }

  if (!filtered.length) {
    container.innerHTML = `
      <div class="card empty-history-box" style="text-align:center; padding:50px 20px; border-radius:24px;">
        <span class="empty-history-icon" style="font-size:52px; display:block; margin-bottom:12px;">📜</span>
        <h3 style="margin:0 0 8px; font-weight:800; font-size:20px;">Chưa có lịch sử làm bài phù hợp</h3>
        <p class="mut" style="margin:0 auto; max-width:520px; font-size:14.5px;">
          ${allHistory.length ? 'Không tìm thấy lượt làm bài nào phù hợp với bộ lọc hoặc từ khóa tìm kiếm.' : 'Sau khi bạn hoàn thành bài học, đọc hiểu hoặc luyện viết, toàn bộ bài làm và câu trả lời sẽ tự động lưu lại tại đây và đồng bộ lên Database.'}
        </p>
        ${!allHistory.length ? `
          <div style="margin-top:16px; display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
            <button class="btn au" type="button" onclick="createSampleQuizSubmissionForGrading()" style="font-weight:800; padding:10px 18px;">
              📑 Nạp bài đọc hiểu mẫu (6đ)
            </button>
            <button class="btn cy" type="button" onclick="createSampleWritingSubmissionForGrading()" style="font-weight:800; padding:10px 18px;">
              ✍️ Nạp bài viết mẫu (10đ)
            </button>
          </div>
        ` : ''}
      </div>`;
    return;
  }

  container.innerHTML = filtered.map(renderHistoryItemCardHtml).join('');
}

function renderHistoryItemCardHtml(item) {
  const isQuiz = item.type === 'quiz' || !item.type;
  const isWriting = item.type === 'writing';
  const typeIcon = isWriting ? '✍️' : (item.type === 'reading' ? '📑' : '📖');
  const typeName = isWriting ? 'Luyện viết' : (item.type === 'reading' ? 'Đọc hiểu' : 'Bài học');
  const isGraded = Boolean(item.isGraded);
  const hasUngradedShort = !isGraded && (item.type === 'reading' || item.type === 'writing' || item.savedShortCount > 0 || (Array.isArray(item.details) && item.details.some(d => d.status === 'saved')));

  // Thiết lập ô điểm hiển thị nổi bật ở góc phải thẻ
  let scoreBoxClass = 'score-box-quiz';
  let scoreValue = '0đ';
  let scoreSub = 'ĐIỂM SỐ';
  let scoreTooltip = 'Điểm số bài làm';

  const rawScore = item.score !== undefined && item.score !== null ? parseFloat(item.score) : 0;
  const formattedScore = (Math.round(rawScore * 100) / 100).toFixed(2).replace(/\.?0+$/, '') + 'đ';

  if (isGraded) {
    scoreBoxClass = 'score-box-graded';
    scoreValue = formattedScore;
    scoreSub = '✅ ĐÃ CHẤM';
    scoreTooltip = `Bài làm đã được chấm điểm: ${formattedScore}`;
  } else if (hasUngradedShort) {
    scoreBoxClass = 'score-box-waiting';
    scoreValue = 'Chờ chấm';
    scoreSub = '⏳ ĐỢI CHẤM';
    scoreTooltip = isWriting ? 'Bài viết đang chờ giáo viên chấm điểm' : 'Bài làm có câu tự luận đang chờ giáo viên chấm điểm';
  } else {
    scoreBoxClass = 'score-box-quiz';
    scoreValue = formattedScore;
    scoreSub = (item.accuracy !== undefined && item.accuracy !== null) ? `🎯 ${item.accuracy}% ĐÚNG` : '🏆 ĐIỂM SỐ';
    scoreTooltip = `Điểm bài làm: ${formattedScore} (${item.accuracy || 0}% đúng)`;
  }

  let statsHtml = '';
  if (isQuiz) {
    statsHtml = `
      <span class="history-pill pill-acc">🎯 ${item.accuracy || 0}% (${item.correctCount || 0}/${item.totalQuestions || 0} đúng)</span>
      ${item.savedShortCount ? `<span class="history-pill pill-short">📝 ${item.savedShortCount} tự luận</span>` : ''}
      <span class="history-pill pill-time">⏱️ ${item.elapsedSeconds ? Math.floor(item.elapsedSeconds / 60) + 'p ' + (item.elapsedSeconds % 60) + 's' : '—'}</span>
    `;
  } else if (item.type === 'reading') {
    statsHtml = `
      <span class="history-pill pill-score">📑 ${item.answeredCount || 0}/${item.totalQuestions || 0} câu đã làm</span>
    `;
  } else if (isWriting) {
    const totalWords = item.totalWords || (item.details ? item.details.reduce((sum, d) => sum + (d.words || 0), 0) : 0);
    statsHtml = `
      <span class="history-pill pill-acc">📝 ${totalWords} từ</span>
      <span class="history-pill pill-score">📑 ${item.answeredCount || item.totalQuestions || 3}/${item.totalQuestions || 3} phần đã viết</span>
      <span class="history-pill pill-time">⏱️ ${item.elapsedSeconds ? Math.floor(item.elapsedSeconds / 60) + 'p ' + (item.elapsedSeconds % 60) + 's' : '—'}</span>
    `;
  }

  if (isGraded) {
    if (item.teacherFeedback) {
      statsHtml += `<span class="history-pill pill-short" title="${esc(item.teacherFeedback)}">💬 Lời phê: "${esc(item.teacherFeedback.slice(0, 35))}${item.teacherFeedback.length > 35 ? '…' : ''}"</span>`;
    }
  } else if (hasUngradedShort) {
    statsHtml += `<span class="history-pill pill-ungraded">⏳ Chờ chấm ${isWriting ? 'bài viết' : 'tự luận'}</span>`;
  }

  return `
    <div class="history-item-card">
      <div class="history-item-top">
        <div class="history-item-left">
          <div class="history-item-title-row">
            <span class="history-item-badge">${typeIcon} ${typeName}</span>
            <h4 class="history-item-title" onclick="openHistoryForSet('${esc(item.setId)}', '${esc(item.setTitle)}')" style="cursor:pointer;" title="Nhấp để chỉ xem các bài làm của bộ đề này">
              ${esc(item.setTitle || 'Bài làm')}
            </h4>
          </div>

          <div class="history-item-meta">
            <span>👤 Học sinh: <b>${esc(item.playerName || 'Học sinh')}</b></span>
            ${item.className ? `<span>· Lớp: <b>${esc(item.className)}</b></span>` : ''}
            ${item.setTopic ? `<span>· Chủ đề: <b>${esc(item.setTopic)}</b></span>` : ''}
            <span>· 📅 ${item.dateStr || ''}</span>
          </div>
        </div>

        <!-- GÓC PHẢI THẺ: HIỂN THỊ SCORE / KẾT QUẢ NỔI BẬT DỄ NHÌN -->
        <div class="history-card-score-box ${scoreBoxClass}" title="${esc(scoreTooltip)}">
          <span class="history-score-main">${scoreValue}</span>
          <span class="history-score-sub">${scoreSub}</span>
        </div>
      </div>

      <div class="history-item-stats">
        ${statsHtml}
      </div>

      <div class="history-item-footer">
        ${isGraded ? `
          <button class="btn cy sm" type="button" onclick="viewHistoryDetail('${esc(item.id)}', true)">
            ✏️ Sửa điểm / Chấm lại
          </button>
          <button class="btn gh sm" type="button" onclick="viewHistoryDetail('${esc(item.id)}', false)">
            👁️ Xem chi tiết bài làm
          </button>
        ` : `
          <button class="btn au sm" type="button" onclick="viewHistoryDetail('${esc(item.id)}', true)" style="font-weight:800;">
            ✏️ Chấm bài ngay
          </button>
          <button class="btn gh sm" type="button" onclick="viewHistoryDetail('${esc(item.id)}', false)">
            👁️ Xem chi tiết bài làm
          </button>
        `}
        <button class="btn no sm btn-icon-only" type="button" onclick="deleteHistoryItem('${esc(item.id)}')" title="Xóa lượt này">
          🗑️
        </button>
      </div>
    </div>
  `;
}

function openHistoryForSet(setId, setTitle) {
  go('history', setId);
}

function openHistoryModal(setId = '') {
  go('history', setId);
}

function closeHistoryModal() {
  const dialog = document.getElementById('quiz-history-dialog');
  if (dialog && dialog.open) dialog.close();
}

let currentHistorySetFilter = '';

function onHistorySetFilterChange() {
  const select = document.getElementById('history-set-filter');
  currentHistorySetFilter = select ? select.value : '';
  renderHistoryList();
}

function clearHistorySetFilter() {
  currentHistorySetFilter = '';
  currentHistorySearchQuery = '';
  const searchInput = document.getElementById('history-search-input');
  if (searchInput) searchInput.value = '';
  const select = document.getElementById('history-set-filter');
  if (select) select.value = '';
  renderHistoryList();
}

function updateHistorySetFilterDropdown() {
  const select = document.getElementById('history-set-filter');
  if (!select) return;
  const allHistory = getQuizHistory();
  const setMap = new Map();
  allHistory.forEach(item => {
    const sId = String(item.setId || '');
    if (sId && !setMap.has(sId)) {
      setMap.set(sId, { id: sId, title: item.setTitle || 'Bộ đề', emo: item.setEmo || '📖', count: 1 });
    } else if (sId && setMap.has(sId)) {
      setMap.get(sId).count++;
    }
  });

  const curVal = currentHistorySetFilter || '';
  let html = `<option value="">📚 Tất cả bộ đề (${allHistory.length})</option>`;
  Array.from(setMap.values()).forEach(s => {
    const sel = s.id === curVal ? 'selected' : '';
    html += `<option value="${esc(s.id)}" ${sel}>${s.emo} ${esc(s.title)} (${s.count} lượt)</option>`;
  });
  select.innerHTML = html;
}

function onHistorySearchInput() {
  const input = document.getElementById('history-search-input');
  currentHistorySearchQuery = (input ? input.value : '').trim().toLowerCase();
  renderHistoryList();
}

function renderHistoryList() {
  const container = document.getElementById('history-list-container');
  const countBadge = document.getElementById('history-total-count');
  if (!container) return;

  const allHistory = getQuizHistory();
  updateHistorySetFilterDropdown();

  let filtered = allHistory;
  if (currentHistorySetFilter) {
    filtered = filtered.filter(h => String(h.setId) === String(currentHistorySetFilter));
  }
  if (currentHistorySearchQuery) {
    filtered = filtered.filter(h => {
      const hay = (String(h.setTitle) + ' ' + String(h.playerName) + ' ' + String(h.className) + ' ' + String(h.setTopic || '')).toLowerCase();
      return hay.includes(currentHistorySearchQuery);
    });
  }

  if (countBadge) {
    countBadge.textContent = currentHistorySetFilter 
      ? `${filtered.length}/${allHistory.length} lượt bài này`
      : `${allHistory.length} lượt làm bài`;
  }

  // Update active filter badge
  const badgeWrap = document.getElementById('history-active-filter-badge');
  const badgeText = document.getElementById('history-filter-badge-text');
  if (badgeWrap && badgeText) {
    if (currentHistorySetFilter) {
      const targetItem = allHistory.find(h => String(h.setId) === String(currentHistorySetFilter));
      const targetTitle = targetItem ? targetItem.setTitle : 'Bộ câu hỏi đã chọn';
      badgeText.innerHTML = `🔍 Lọc theo bộ đề: <b>${esc(targetTitle)}</b> (${filtered.length} lượt làm)`;
      badgeWrap.style.display = 'flex';
    } else {
      badgeWrap.style.display = 'none';
    }
  }

  if (!filtered.length) {
    container.innerHTML = `
      <div class="empty-history-box">
        <span class="empty-history-icon">📜</span>
        <h3 style="margin:8px 0 4px; font-weight:800;">Chưa có lịch sử bài làm nào</h3>
        <p class="mut" style="margin:0; font-size:14px;">
          ${allHistory.length ? 'Không tìm thấy lượt làm bài nào cho bộ đề hoặc từ khóa này.' : 'Sau khi bạn hoàn thành bài học, đọc hiểu hoặc luyện viết, kết quả và câu trả lời sẽ tự động được lưu lại tại đây để giáo viên chấm điểm.'}
        </p>
        ${!allHistory.length ? `
          <div style="margin-top:14px; display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
            <button class="btn au" type="button" onclick="createSampleQuizSubmissionForGrading()" style="font-weight:800; padding:9px 16px;">
              📑 Nạp bài đọc hiểu mẫu (6đ)
            </button>
            <button class="btn cy" type="button" onclick="createSampleWritingSubmissionForGrading()" style="font-weight:800; padding:9px 16px;">
              ✍️ Nạp bài viết mẫu (10đ)
            </button>
          </div>
        ` : ''}
      </div>`;
    return;
  }

  container.innerHTML = filtered.map(renderHistoryItemCardHtml).join('');
}

// =========================================================================
// MANUAL GRADING SYSTEM IMPLEMENTATION (CHẤM BÀI THỦ CÔNG)
// =========================================================================

let currentViewingHistoryId = null;
let isHistoryGradingMode = false;

function viewHistoryDetail(id, startInGradingMode = false) {
  const history = getQuizHistory();
  const item = history.find(h => String(h.id) === String(id));
  if (!item) return toast('Không tìm thấy bài làm trong lịch sử.', 'bad');

  currentViewingHistoryId = String(id);
  isHistoryGradingMode = Boolean(startInGradingMode);

  renderHistoryDetailModalView();

  const dialog = document.getElementById('history-detail-dialog');
  if (dialog && !dialog.open) dialog.showModal();
}

function toggleHistoryGradingMode() {
  isHistoryGradingMode = !isHistoryGradingMode;
  renderHistoryDetailModalView();
}

function renderHistoryDetailModalView() {
  const history = getQuizHistory();
  const item = history.find(h => String(h.id) === String(currentViewingHistoryId));
  if (!item) return;

  const titleEl = document.getElementById('history-detail-title');
  const metaEl = document.getElementById('history-detail-meta');
  const toolbarEl = document.getElementById('history-detail-grading-toolbar');
  const headingEl = document.getElementById('history-detail-section-heading');
  const listEl = document.getElementById('history-detail-questions-list');
  const summaryEl = document.getElementById('history-detail-grading-summary');
  const toggleBtn = document.getElementById('btn-toggle-grading-mode');
  const saveFooterBtn = document.getElementById('btn-save-grading-footer');

  if (titleEl) titleEl.textContent = `${item.setTitle || 'Chi tiết bài làm'}`;

  if (toggleBtn) {
    toggleBtn.style.display = 'inline-flex';
    if (isHistoryGradingMode) {
      toggleBtn.innerHTML = '<span>👁️ Xem bài làm</span>';
      toggleBtn.className = 'btn gh sm';
      toggleBtn.title = 'Trở về chế độ xem thông thường';
    } else {
      toggleBtn.innerHTML = `<span>✏️ ${item.isGraded ? 'Sửa điểm / Chấm lại' : 'Chấm bài thủ công'}</span>`;
      toggleBtn.className = 'btn cy sm';
      toggleBtn.title = 'Bật chế độ cho điểm và nhận xét từng câu';
    }
  }

  if (saveFooterBtn) {
    saveFooterBtn.style.display = isHistoryGradingMode ? 'inline-flex' : 'none';
  }

  const isWriting = item.type === 'writing';
  if (headingEl) {
    headingEl.textContent = isHistoryGradingMode
      ? (isWriting ? 'Chấm điểm & Nhận xét từng phần bài viết (Thang 10đ chuẩn):' : 'Chấm điểm & Nhận xét từng câu hỏi:')
      : (isWriting ? 'Nội dung bài viết theo từng phần dàn ý:' : 'Danh sách câu hỏi & Bài làm:');
  }

  const details = Array.isArray(item.details) ? item.details : [];
  const itemTotalMaxScore = isWriting ? 10.0 : details.reduce((sum, d) => {
    const m = (d.maxScore !== undefined && d.maxScore !== null && Number(d.maxScore) > 0)
      ? Number(d.maxScore)
      : 1.0;
    return sum + m;
  }, 0);

  const isGraded = Boolean(item.isGraded);
  if (metaEl) {
    const totalWords = item.totalWords || details.reduce((sum, d) => sum + (d.words || ((d.userAnswer || '').trim().split(/\s+/).filter(Boolean).length)), 0);
    metaEl.innerHTML = `
      <div style="display:flex; flex-wrap:wrap; gap:12px; font-size:13.5px; margin-bottom:14px; background:var(--bg-base); border:2px solid var(--stroke); border-radius:14px; padding:12px 16px; align-items:center;">
        <span>👤 Học sinh: <b>${esc(item.playerName || 'Học sinh')}</b></span>
        ${item.className ? `<span>· Lớp: <b>${esc(item.className)}</b></span>` : ''}
        <span>· Ngày làm: <b>${item.dateStr || ''}</b></span>
        ${isWriting
          ? `<span>· Bài viết: <b>${totalWords} từ</b> • <b>${item.answeredCount || details.length}/${details.length} phần</b></span>`
          : (item.type === 'reading' 
              ? `<span>· Đọc hiểu: <b>${item.answeredCount || 0}/${item.totalQuestions || 0} câu</b></span>` 
              : `<span>· Trắc nghiệm: <b>${item.accuracy || 0}%</b> (${item.correctCount || 0}/${item.totalQuestions || 0} câu đúng)</span>`
            )
        }
        <span class="tag ${isGraded ? 'ok' : 'cy'}" style="font-weight:800;">
          ${isGraded ? `✅ Đã chấm: ${item.score || 0}/${itemTotalMaxScore > 0 ? itemTotalMaxScore : (isWriting ? 10.0 : 6.0)}đ` : '⏳ Chờ chấm điểm'}
        </span>
        ${item.gradedDateStr ? `<span class="mut" style="font-size:12.5px;">(Chấm lúc: ${item.gradedDateStr})</span>` : ''}
        <span class="tag gh" style="font-size:11.5px; font-weight:700;">👨‍🏫 Chế độ Giáo viên Chấm bài</span>
      </div>
    `;
  }

  if (toolbarEl) {
    if (isHistoryGradingMode) {
      toolbarEl.style.display = 'flex';
      toolbarEl.className = 'history-grading-toolbar';
      toolbarEl.innerHTML = `
        <div class="history-grading-toolbar-title">
          <span>✏️</span> <span>Bảng công cụ Chấm bài của Giáo viên ${isWriting ? '(Thang 10đ Chuẩn)' : ''}</span>
        </div>
        <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
          <button type="button" class="btn gh sm" onclick="gradeAllQuestionsQuick('ok')" title="Cho điểm tối đa từng câu / phần" style="font-size:12px; padding:4px 10px;">
            ⚡ Đạt tất cả (${itemTotalMaxScore > 0 ? itemTotalMaxScore : (isWriting ? 10 : details.length)}đ)
          </button>
          <button type="button" class="btn cy sm" onclick="autoCalculateTotalPoints()" title="Cộng dồn điểm từ tất cả các phần" style="font-size:12px; padding:4px 10px;">
            ⚡ Tính tổng điểm
          </button>
          <button type="button" class="btn au sm" onclick="saveManualGrading()" style="font-size:12.5px; font-weight:800; padding:4px 14px;">
            💾 Lưu kết quả chấm
          </button>
        </div>
      `;
    } else {
      toolbarEl.style.display = 'none';
    }
  }

  if (listEl) {
    if (!details.length) {
      listEl.innerHTML = '<p class="mut" style="padding:16px; text-align:center;">Không có dữ liệu chi tiết cho bài làm này.</p>';
    } else {
      listEl.innerHTML = details.map((d, idx) => {
        const defaultSecMax = isWriting ? (idx === 1 ? 6.0 : 2.0) : 1.0;
        const maxPts = (d.maxScore !== undefined && d.maxScore !== null && Number(d.maxScore) > 0)
          ? Number(d.maxScore)
          : defaultSecMax;
        const halfPts = Math.round((maxPts / 2) * 100) / 100;

        let badgeCls = 'bad';
        let badgeTxt = '❌ Chưa chính xác';
        if (d.gradeStatus === 'ok' || (!d.gradeStatus && d.status === 'ok')) {
          badgeCls = 'ok';
          badgeTxt = '✅ Đúng / Đạt';
        } else if (d.gradeStatus === 'partial') {
          badgeCls = 'cy';
          badgeTxt = '🟡 Một phần';
        } else if (d.gradeStatus === 'bad' || (!d.gradeStatus && d.status === 'bad')) {
          badgeCls = 'bad';
          badgeTxt = '❌ Chưa đạt';
        } else if (d.status === 'saved') {
          badgeCls = 'cy';
          badgeTxt = isWriting ? '✍️ Bài viết (Chờ chấm)' : '📝 Tự luận (Chờ chấm)';
        } else if (d.status === 'no') {
          badgeCls = 'gh';
          badgeTxt = '⏰ Bỏ qua';
        }

        const userAns = (d.userAnswer || '').trim();
        const words = (userAns.match(/\S+/g) || []).length;
        const curStatus = d.gradeStatus || (d.status === 'ok' ? 'ok' : d.status === 'bad' ? 'bad' : 'ok');
        const curPoints = d.points !== undefined ? d.points : (d.status === 'ok' ? maxPts : 0);

        let quickPillsHtml = '';
        if (maxPts >= 6.0) {
          quickPillsHtml = `
            <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, 1.0)">1.0</button>
            <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, 2.0)">2.0</button>
            <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, 3.0)">3.0</button>
            <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, 4.0)">4.0</button>
            <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, 5.0)">5.0</button>
            <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, ${maxPts})">${maxPts}đ</button>
          `;
        } else if (maxPts >= 2.0) {
          quickPillsHtml = `
            <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, 0.5)">0.5</button>
            <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, 1.0)">1.0</button>
            <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, 1.5)">1.5</button>
            <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, ${maxPts})">${maxPts}đ</button>
          `;
        } else {
          quickPillsHtml = `
            <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, 0.25)">0.25</button>
            <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, 0.5)">0.5</button>
            <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, 0.75)">0.75</button>
            <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, ${maxPts})">${maxPts}đ</button>
          `;
        }

        const secLabel = isWriting ? (d.sectionTitle || d.questionText || `Phần ${idx + 1}`) : `Câu ${idx + 1}`;

        return `
          <div class="history-detail-q-card" id="hist-card-q-${idx}">
            <div class="history-detail-q-head">
              <div style="display:flex; align-items:center; gap:8px;">
                <span class="history-detail-q-num">${isWriting ? `Phần ${idx + 1}: ${esc(secLabel)}` : `Câu ${idx + 1}`}</span>
                ${d.questionType ? `<span class="tag gh" style="font-size:11px;">${esc(d.questionType)}</span>` : ''}
              </div>
              <div style="display:flex; align-items:center; gap:8px;">
                <span class="tag gh" style="font-size:11.5px; font-weight:700;">🎯 Tối đa: ${maxPts}đ</span>
                ${d.points !== undefined ? `<span class="tag ${d.points > 0 ? 'ok' : 'gh'}" style="font-weight:800;">⭐ ${d.points}đ</span>` : ''}
                <span class="tag ${badgeCls}">${badgeTxt}</span>
              </div>
            </div>

            <div class="history-detail-q-body">
              ${!isWriting ? `<p class="history-detail-q-text"><b>${esc(d.questionText)}</b></p>` : ''}
              
              ${d.sectionGuide ? `
                <div class="history-detail-ans-row" style="margin-top:4px;">
                  <span class="history-detail-ans-label">📋 Dàn ý định hướng:</span>
                </div>
                <div class="history-detail-ans-val rubric-guide-box" style="white-space:pre-wrap; line-height:1.6; font-size:13.5px;">
                  ${esc(d.sectionGuide)}
                </div>
              ` : ''}

              <div class="history-detail-ans-row" style="margin-top:8px;">
                <span class="history-detail-ans-label">${isWriting ? 'Bài viết của học sinh:' : 'Bài làm của học sinh:'}</span>
                ${words > 0 ? `<span class="mut" style="font-size:12px;">(📝 ${words} từ)</span>` : ''}
              </div>
              <div class="history-detail-ans-val student-essay-box ${d.status === 'ok' ? 'correct' : d.status === 'saved' ? 'saved' : 'wrong'}" style="white-space:pre-wrap; line-height:1.7; font-size:14.5px;">
                ${esc(userAns || (isWriting ? '(Để trống - Học sinh chưa viết phần này)' : '(Để trống - Học sinh chưa trả lời)'))}
              </div>

              ${d.correctAnswer ? `
                <div class="history-detail-ans-row" style="margin-top:8px;">
                  <span class="history-detail-ans-label">💡 Đáp án chuẩn / Gợi ý chấm điểm:</span>
                </div>
                <div class="history-detail-ans-val rubric-guide-box">
                  ${esc(d.correctAnswer)}
                </div>
              ` : ''}

              ${d.explanation ? `
                <div class="history-detail-explanation">
                  💡 <b>Giải thích chi tiết:</b> ${esc(d.explanation)}
                </div>
              ` : ''}

              <!-- KHU VỰC CHẤM BÀI CHO CÂU NÀY -->
              ${isHistoryGradingMode ? `
                <div class="history-manual-grading-panel" id="grading-panel-${idx}">
                  <div class="grading-panel-top">
                    <span class="grading-panel-label">✏️ Đánh giá ${isWriting ? `Phần ${idx + 1}` : `Câu ${idx + 1}`} (Tối đa ${maxPts}đ):</span>
                    <div class="grading-quick-status-btns">
                      <button type="button" class="grading-quick-status-btn ${curStatus === 'ok' ? 'active-ok' : ''}" onclick="setQuestionGradeStatus(${idx}, 'ok', ${maxPts})">
                        ✅ Đạt (${maxPts}đ)
                      </button>
                      <button type="button" class="grading-quick-status-btn ${curStatus === 'partial' ? 'active-partial' : ''}" onclick="setQuestionGradeStatus(${idx}, 'partial', ${halfPts})">
                        🟡 Một phần (${halfPts}đ)
                      </button>
                      <button type="button" class="grading-quick-status-btn ${curStatus === 'bad' ? 'active-bad' : ''}" onclick="setQuestionGradeStatus(${idx}, 'bad', 0)">
                        ❌ Chưa đạt (0đ)
                      </button>
                    </div>
                  </div>

                  <div class="grading-inputs-row">
                    <div class="grading-points-input-box">
                      <label for="grade-point-${idx}">Số điểm ${isWriting ? 'phần này' : 'câu này'} (tối đa ${maxPts}đ):</label>
                      <input type="number" id="grade-point-${idx}" class="grade-point-input" step="0.25" min="0" max="${maxPts}" data-max="${maxPts}" value="${curPoints}" oninput="onQuestionPointsChanged()" style="width:74px; text-align:center; font-weight:800; font-size:15px; border-radius:8px; padding:4px 6px;">
                      <span class="mut" style="font-size:13px; font-weight:700;">/ ${maxPts} điểm</span>
                      <div class="grading-quick-pills">
                        ${quickPillsHtml}
                        <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, 0)">0đ</button>
                      </div>
                    </div>
                  </div>

                  <div class="grading-comment-box" style="margin-top:6px;">
                    <input type="text" id="grade-comment-${idx}" class="grade-comment-input" placeholder="Nhận xét của giáo viên cho ${isWriting ? 'phần này' : 'câu này'} (ví dụ: Diễn đạt mạch lạc, thiếu dẫn chứng...)" value="${esc(d.teacherComment || '')}">
                    <div style="display:flex; flex-wrap:wrap; gap:5px; margin-top:6px;">
                      <span style="font-size:11.5px; color:var(--mut); font-weight:700; align-self:center;">Gợi ý nhận xét:</span>
                      ${isWriting ? `
                        <button type="button" class="history-quick-feedback-chip" onclick="appendQuickQuestionComment(${idx}, 'Diễn đạt mượt mà, cảm xúc.')">+ Diễn đạt tốt</button>
                        <button type="button" class="history-quick-feedback-chip" onclick="appendQuickQuestionComment(${idx}, 'Luận điểm rõ ràng, dẫn chứng xác đáng.')">+ Đầy đủ dẫn chứng</button>
                        <button type="button" class="history-quick-feedback-chip" onclick="appendQuickQuestionComment(${idx}, 'Cần bổ sung thêm dẫn chứng thực tế.')">+ Thiếu dẫn chứng</button>
                        <button type="button" class="history-quick-feedback-chip" onclick="appendQuickQuestionComment(${idx}, 'Chú ý liên kết đoạn và chính tả.')">+ Chú ý liên kết đoạn</button>
                      ` : `
                        <button type="button" class="history-quick-feedback-chip" onclick="appendQuickQuestionComment(${idx}, 'Diễn đạt tốt, giàu cảm xúc.')">+ Diễn đạt tốt</button>
                        <button type="button" class="history-quick-feedback-chip" onclick="appendQuickQuestionComment(${idx}, 'Nêu đúng trọng tâm, cần bổ sung dẫn chứng.')">+ Thiếu dẫn chứng</button>
                        <button type="button" class="history-quick-feedback-chip" onclick="appendQuickQuestionComment(${idx}, 'Cần phân tích sâu hơn.')">+ Cần phân tích sâu</button>
                        <button type="button" class="history-quick-feedback-chip" onclick="appendQuickQuestionComment(${idx}, 'Chú ý lỗi chính tả và diễn đạt.')">+ Lỗi chính tả</button>
                      `}
                    </div>
                  </div>
                </div>
              ` : `
                ${(d.isGraded || d.teacherComment || (d.points !== undefined && d.points > 0)) ? `
                  <div class="history-graded-result-box">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
                      <span>⭐ Điểm ${isWriting ? `Phần ${idx + 1}` : `câu ${idx + 1}`}: <b>${d.points !== undefined ? d.points : 0} / ${maxPts}</b> điểm</span>
                      <span class="tag ${curStatus === 'ok' ? 'ok' : curStatus === 'partial' ? 'cy' : 'bad'}">
                        ${curStatus === 'ok' ? '✅ Đạt' : curStatus === 'partial' ? '🟡 Đạt một phần' : '❌ Chưa đạt'}
                      </span>
                    </div>
                    ${d.teacherComment ? `<div class="history-teacher-comment">💬 <b>Nhận xét của GV:</b> ${esc(d.teacherComment)}</div>` : ''}
                  </div>
                ` : ''}
              `}
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // SUMMARY & OVERALL CARD
  if (summaryEl) {
    if (isHistoryGradingMode) {
      summaryEl.innerHTML = `
        <div class="history-overall-grading-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:8px;">
            <h4 style="margin:0; font-size:16px; font-weight:800; display:flex; align-items:center; gap:6px;">
              <span>📝</span> <span>Tổng kết điểm &amp; Lời phê của Giáo viên ${isWriting ? '(Thang 10đ Chuẩn)' : ''}</span>
            </h4>
            <button type="button" class="btn cy sm" onclick="autoCalculateTotalPoints()" title="Cộng dồn điểm từ tất cả các phần trên">
              ⚡ Tự động tính tổng từ các phần
            </button>
          </div>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:14px; margin-bottom:14px;">
            <div>
              <label for="grade-total-score" style="font-weight:700; font-size:13.5px; display:block; margin-bottom:5px;">
                Tổng điểm toàn bài:
              </label>
              <div style="display:flex; align-items:center; gap:8px;">
                <input type="number" id="grade-total-score" step="0.25" min="0" max="${itemTotalMaxScore || 10}" value="${item.score || 0}" oninput="updateGradeRankBadge(${itemTotalMaxScore})" style="width:110px; text-align:center; font-weight:900; font-size:22px; border-radius:10px; padding:6px 8px; color:var(--primary);">
                <span style="font-weight:800; font-size:16px;">/ ${itemTotalMaxScore || (isWriting ? 10.0 : 6.0)} điểm</span>
              </div>
            </div>
            <div>
              <label style="font-weight:700; font-size:13.5px; display:block; margin-bottom:5px;">
                Xếp loại kết quả:
              </label>
              <div id="grade-rank-badge-wrap">
                ${getGradeRankBadge(item.score, itemTotalMaxScore)}
              </div>
            </div>
          </div>

          <div style="margin-bottom:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; flex-wrap:wrap; gap:6px;">
              <label for="grade-general-feedback" style="font-weight:700; font-size:13.5px; margin:0;">
                Lời phê / Nhận xét chung cho học sinh:
              </label>
            </div>
            <textarea id="grade-general-feedback" rows="3" placeholder="Nhập nhận xét tổng quát về kiến thức, kỹ năng trình bày, ưu điểm và điểm cần khắc phục của bài làm..." style="width:100%; font-family:inherit; font-size:13.5px; border-radius:10px; padding:9px 12px; line-height:1.5;">${esc(item.teacherFeedback || '')}</textarea>
            
            <div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:8px;">
              <span style="font-size:12px; color:var(--mut); font-weight:700; align-self:center;">Mẫu lời phê nhanh:</span>
              ${isWriting ? `
                <button type="button" class="btn gh sm quick-template-btn" onclick="applyQuickGeneralFeedback('🌟 Bài viết rất xuất sắc, bố cục 3 phần chặt chẽ, luận điểm rõ ràng, dẫn chứng thuyết phục và giàu cảm xúc.')">
                  🌟 Xuất sắc &amp; Sắc bén
                </button>
                <button type="button" class="btn gh sm quick-template-btn" onclick="applyQuickGeneralFeedback('👍 Bố cục bài viết hoàn chỉnh, diễn đạt lưu loát. Cần phân tích sâu sắc hơn ở thân bài và mở rộng dẫn chứng.')">
                  👍 Đầy đủ &amp; Cần mở rộng
                </button>
                <button type="button" class="btn gh sm quick-template-btn" onclick="applyQuickGeneralFeedback('⚠️ Cần chú ý phát triển ý ở thân bài, trau chuốt câu từ và khắc phục các lỗi diễn đạt, chính tả.')">
                  ⚠️ Cần cố gắng thêm
                </button>
              ` : `
                <button type="button" class="btn gh sm quick-template-btn" onclick="applyQuickGeneralFeedback('🌟 Bài làm rất tốt, nắm vững kiến thức trọng tâm, lập luận sắc bén và diễn đạt giàu cảm xúc.')">
                  🌟 Rất tốt &amp; Sắc bén
                </button>
                <button type="button" class="btn gh sm quick-template-btn" onclick="applyQuickGeneralFeedback('👍 Nắm vững kiến thức cơ bản, diễn đạt khá tốt, cần chú ý phân tích sâu hơn và bổ sung dẫn chứng.')">
                  👍 Đạt yêu cầu &amp; Cần bổ sung
                </button>
                <button type="button" class="btn gh sm quick-template-btn" onclick="applyQuickGeneralFeedback('⚠️ Cần đọc kỹ ngữ liệu và câu hỏi, rèn luyện thêm kỹ năng diễn đạt và phân tích bài làm.')">
                  ⚠️ Cần cố gắng thêm
                </button>
              `}
            </div>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button type="button" class="btn gh" onclick="toggleHistoryGradingMode()">Hủy</button>
            <button type="button" class="btn au" onclick="saveManualGrading()" style="font-weight:800; padding:10px 24px; font-size:14.5px;">
              💾 Lưu kết quả chấm bài
            </button>
          </div>
        </div>
      `;
    } else if (item.isGraded) {
      summaryEl.innerHTML = `
        <div class="history-overall-grading-card" style="border-color:rgba(34, 197, 94, 0.4); background:rgba(34, 197, 94, 0.06);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
            <h4 style="margin:0; font-size:16px; font-weight:800; display:flex; align-items:center; gap:6px;">
              <span>🏆</span> <span>Kết quả chấm bài của Giáo viên</span>
            </h4>
            <button type="button" class="btn cy sm" onclick="toggleHistoryGradingMode()" style="font-weight:700;">
              ✏️ Sửa điểm / Chấm lại
            </button>
          </div>
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px; flex-wrap:wrap;">
            <span style="font-size:24px; font-weight:900; color:var(--green);">
              ${item.score || 0} / ${itemTotalMaxScore || (isWriting ? 10.0 : 6.0)} điểm
            </span>
            ${getGradeRankBadge(item.score, itemTotalMaxScore)}
            ${item.gradedDateStr ? `<span class="mut" style="font-size:12.5px;">(Chấm lúc: ${item.gradedDateStr})</span>` : ''}
          </div>
          ${item.teacherFeedback ? `
            <div style="padding:10px 14px; border-radius:10px; background:var(--bg-card); border:1px solid var(--stroke); font-size:13.5px; line-height:1.6;">
              <b>💬 Lời phê của Giáo viên:</b><br>${esc(item.teacherFeedback).replace(/\n/g, '<br>')}
            </div>
          ` : ''}
        </div>
      `;
    } else {
      summaryEl.innerHTML = `
        <div style="text-align:center; margin-top:20px; padding:22px; border:2px dashed var(--stroke); border-radius:16px; background:var(--bg-base);">
          <p class="mut" style="margin:0 0 12px; font-size:14.5px;">Bài làm này đang ở trạng thái <b>chờ chấm điểm thủ công</b>.</p>
          <button type="button" class="btn au" onclick="toggleHistoryGradingMode()" style="font-weight:800; padding:10px 24px;">
            ✏️ Bắt đầu chấm bài ngay
          </button>
        </div>
      `;
    }
  }
}

function setQuestionGradeStatus(idx, status, customPt) {
  const history = getQuizHistory();
  const item = history.find(h => String(h.id) === String(currentViewingHistoryId));
  if (item && item.details && item.details[idx]) {
    item.details[idx].gradeStatus = status;
    const maxPts = (item.details[idx].maxScore !== undefined && item.details[idx].maxScore !== null && Number(item.details[idx].maxScore) > 0)
      ? Number(item.details[idx].maxScore)
      : 1.0;
    const pointEl = document.getElementById(`grade-point-${idx}`);
    if (pointEl) {
      if (status === 'bad') {
        pointEl.value = '0';
      } else if (status === 'ok') {
        pointEl.value = customPt !== undefined ? String(customPt) : String(maxPts);
      } else if (status === 'partial') {
        pointEl.value = customPt !== undefined ? String(customPt) : String(Math.round((maxPts / 2) * 100) / 100);
      }
    }
    // Update active button state in DOM
    const panel = document.getElementById(`grading-panel-${idx}`);
    if (panel) {
      panel.querySelectorAll('.grading-quick-status-btn').forEach(btn => {
        btn.classList.remove('active-ok', 'active-partial', 'active-bad');
      });
      const btns = panel.querySelectorAll('.grading-quick-status-btn');
      if (status === 'ok' && btns[0]) btns[0].classList.add('active-ok');
      else if (status === 'partial' && btns[1]) btns[1].classList.add('active-partial');
      else if (status === 'bad' && btns[2]) btns[2].classList.add('active-bad');
    }
    onQuestionPointsChanged();
  }
}

function setQuestionPointQuick(idx, pt) {
  const pointEl = document.getElementById(`grade-point-${idx}`);
  if (pointEl) {
    pointEl.value = String(pt);
    onQuestionPointsChanged();
  }
}

function appendQuickQuestionComment(idx, text) {
  const commentEl = document.getElementById(`grade-comment-${idx}`);
  if (commentEl) {
    const cur = commentEl.value.trim();
    if (!cur) {
      commentEl.value = text;
    } else if (!cur.includes(text)) {
      commentEl.value = cur + ' ' + text;
    }
    commentEl.focus();
  }
}

function applyQuickGeneralFeedback(text) {
  const feedbackEl = document.getElementById('grade-general-feedback');
  if (feedbackEl) {
    feedbackEl.value = text;
    feedbackEl.focus();
  }
}

function gradeAllQuestionsQuick(status = 'ok') {
  const history = getQuizHistory();
  const item = history.find(h => String(h.id) === String(currentViewingHistoryId));
  if (!item || !Array.isArray(item.details)) return;

  item.details.forEach((d, idx) => {
    d.gradeStatus = status;
    const maxPts = (d.maxScore !== undefined && d.maxScore !== null && Number(d.maxScore) > 0)
      ? Number(d.maxScore)
      : 1.0;
    const pointEl = document.getElementById(`grade-point-${idx}`);
    if (pointEl) {
      if (status === 'ok') pointEl.value = String(maxPts);
      else if (status === 'partial') pointEl.value = String(Math.round((maxPts / 2) * 100) / 100);
      else pointEl.value = '0';
    }

    const panel = document.getElementById(`grading-panel-${idx}`);
    if (panel) {
      panel.querySelectorAll('.grading-quick-status-btn').forEach(btn => {
        btn.classList.remove('active-ok', 'active-partial', 'active-bad');
      });
      const btns = panel.querySelectorAll('.grading-quick-status-btn');
      if (status === 'ok' && btns[0]) btns[0].classList.add('active-ok');
      else if (status === 'partial' && btns[1]) btns[1].classList.add('active-partial');
      else if (status === 'bad' && btns[2]) btns[2].classList.add('active-bad');
    }
  });

  autoCalculateTotalPoints(true);
  toast(`Đã áp dụng ${status === 'ok' ? 'điểm tối đa từng câu' : status} cho tất cả ${item.details.length} câu hỏi!`, 'ok');
}

function onQuestionPointsChanged() {
  autoCalculateTotalPoints(true);
}

function autoCalculateTotalPoints(syncInput = true) {
  const pointInputs = document.querySelectorAll('.grade-point-input');
  let sum = 0;
  pointInputs.forEach(inp => {
    sum += parseFloat(inp.value) || 0;
  });
  sum = Math.round(sum * 100) / 100;
  const totalInput = document.getElementById('grade-total-score');
  if (totalInput && syncInput) {
    totalInput.value = String(sum);
  }
  updateGradeRankBadge();
}

function getGradeRankBadge(score, maxScore = 10) {
  const num = parseFloat(score) || 0;
  const max = parseFloat(maxScore) || 10;
  const ratio = max > 0 ? (num / max) : 0;
  let label = 'Cần cố gắng ⚠️';
  let cls = 'rank-yeu';
  if (ratio >= 0.85) {
    label = 'Xuất sắc / Giỏi 🌟';
    cls = 'rank-gioi';
  } else if (ratio >= 0.65) {
    label = 'Khá 👍';
    cls = 'rank-kha';
  } else if (ratio >= 0.50) {
    label = 'Trung bình ⚡';
    cls = 'rank-tb';
  }
  return `<span class="history-rank-badge ${cls}">${label}</span>`;
}

function updateGradeRankBadge(maxScore) {
  const totalInput = document.getElementById('grade-total-score');
  const badgeWrap = document.getElementById('grade-rank-badge-wrap');
  if (totalInput && badgeWrap) {
    const history = getQuizHistory();
    const item = history.find(h => String(h.id) === String(currentViewingHistoryId));
    const details = (item && Array.isArray(item.details)) ? item.details : [];
    const isWriting = item && item.type === 'writing';
    const totalMax = maxScore || (isWriting ? 10.0 : details.reduce((sum, d) => sum + (Number(d.maxScore) || 1.0), 0)) || 10;
    badgeWrap.innerHTML = getGradeRankBadge(parseFloat(totalInput.value) || 0, totalMax);
  }
}

async function saveManualGrading() {
  const history = getQuizHistory();
  const item = history.find(h => String(h.id) === String(currentViewingHistoryId));
  if (!item) return toast('Không tìm thấy bài làm cần lưu!', 'bad');

  const oldScore = (item.score !== undefined && item.score !== null) ? Number(item.score) : 0;
  const totalScoreInput = document.getElementById('grade-total-score');
  const generalFeedbackInput = document.getElementById('grade-general-feedback');
  const newScore = totalScoreInput ? parseFloat(totalScoreInput.value) || 0 : (item.score || 0);
  const generalFeedback = generalFeedbackInput ? generalFeedbackInput.value.trim() : '';

  if (Array.isArray(item.details)) {
    item.details.forEach((d, idx) => {
      const pointEl = document.getElementById(`grade-point-${idx}`);
      const commentEl = document.getElementById(`grade-comment-${idx}`);
      if (pointEl) d.points = Math.max(0, parseFloat(pointEl.value) || 0);
      if (commentEl) d.teacherComment = commentEl.value.trim();
      d.isGraded = true;
      if (d.gradeStatus === 'ok') d.status = 'ok';
      else if (d.gradeStatus === 'bad') d.status = 'bad';
      else if (d.gradeStatus === 'partial') d.status = 'partial';
      // Lưu nhận xét chung vào detail đầu tiên để đồng bộ qua Supabase jsonb
      if (idx === 0) d.generalTeacherFeedback = generalFeedback;
    });
  }

  const teacherName = 'Giáo viên';

  item.isGraded = true;
  item.score = Math.round(newScore * 100) / 100;
  item.teacherFeedback = generalFeedback;
  item.teacherName = teacherName;
  item.gradedAt = Date.now();
  item.gradedDateStr = new Date().toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });

  // 1. Lưu ngay lập tức vào localStorage để đảm bảo dữ liệu không bị mất
  try {
    localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.error('Failed to save graded history:', e);
  }

  // 2. Chuyển giao diện ra khỏi chế độ chấm điểm và cập nhật thẻ hiển thị
  isHistoryGradingMode = false;
  renderHistoryDetailModalView();
  renderHistoryList();
  if (typeof renderHistoryPage === 'function') renderHistoryPage();

  toast(`🎉 Đã lưu kết quả chấm bài thành công! (Điểm: ${item.score}đ)`, 'ok');

  // 3. Đồng bộ lên đám mây (Supabase)
  try {
    const synced = await saveQuizAttemptToSupabase(item);
    if (synced) {
      const syncBadge = document.getElementById('history-sync-indicator');
      if (syncBadge) syncBadge.textContent = '☁️ Đã lưu đám mây';
    }
  } catch (syncErr) {
    console.warn('Lỗi đồng bộ kết quả chấm lên máy chủ:', syncErr);
  }
}

function createSampleQuizSubmissionForGrading() {
  const sample = {
    id: 'sample_reading_' + Date.now(),
    type: 'reading',
    setId: 'set_sample_reading_1',
    setTitle: 'Đọc hiểu: Bài thơ Vội Vàng (Xuân Diệu)',
    setTopic: 'Thơ ca hiện đại Việt Nam',
    playerName: 'Nguyễn Văn An',
    className: '12A1',
    dateStr: new Date().toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }),
    timestamp: Date.now(),
    totalQuestions: 4,
    answeredCount: 4,
    isGraded: false,
    score: 0,
    details: [
      {
        questionNumber: 1,
        questionType: 'Nhận biết',
        maxScore: 1.0,
        questionText: 'Xác định phương thức biểu đạt chính và thể thơ của bài thơ Vội Vàng.',
        userAnswer: 'Phương thức biểu đạt chính là biểu cảm. Thể thơ là thể thơ tự do (8 chữ hiện đại).',
        correctAnswer: '- Phương thức biểu đạt chính: Biểu cảm kết hợp nghị luận và miêu tả.\n- Thể thơ: Tự do (8 tiếng).',
        explanation: 'Bài thơ thể hiện trực tiếp cảm xúc, khát vọng sống cuồng nhiệt của thi sĩ Xuân Diệu qua thể thơ tự do linh hoạt.',
        status: 'saved',
        points: 0
      },
      {
        questionNumber: 2,
        questionType: 'Thông hiểu',
        maxScore: 1.0,
        questionText: 'Chỉ ra và nêu tác dụng của biện pháp tu từ điệp ngữ trong câu thơ: "Tôi muốn tắt nắng đi / Cho màu đừng nhạt mất / Tôi muốn buộc gió lại / Cho hương đừng bay đi".',
        userAnswer: 'Biện pháp tu từ: Điệp cấu trúc "Tôi muốn... Cho... đừng". Tác dụng: Nhấn mạnh ước muốn tha thiết, mãnh liệt của nhân vật trữ tình muốn đoạt quyền tạo hóa để lưu giữ lại vẻ đẹp tươi non nhất của trần thế.',
        correctAnswer: '- Điệp ngữ "Tôi muốn...", "Cho... đừng..." lặp lại hai lần.\n- Tác dụng: Tạo nhịp điệu dồn dập, khẳng định ước muốn táo bạo, phi lý nhưng thể hiện tình yêu sự sống tha thiết, muốn níu giữ hương sắc cuộc đời tươi đẹp.',
        explanation: 'Xuân Diệu muốn níu giữ vẻ đẹp thiên nhiên lúc tràn đầy sức sống nhất, thể hiện lòng yêu đời tha thiết.',
        status: 'saved',
        points: 0
      },
      {
        questionNumber: 3,
        questionType: 'Vận dụng',
        maxScore: 2.0,
        questionText: 'Hình ảnh bức tranh thiên nhiên mùa xuân trong khổ thơ thứ hai được tác giả cảm nhận qua những giác quan nào?',
        userAnswer: 'Thiên nhiên được cảm nhận qua thị giác (ong bướm tuần tháng mật, hoa đồng nội xanh rì), thính giác (khúc tình si của yến anh), và vị giác (ánh sáng chớp hàng mi). Tất cả như một bàn tiệc trần gian quyến rũ.',
        correctAnswer: 'Xuân Diệu cảm nhận thiên nhiên bằng mọi giác quan: thị giác (sắc xanh đồng nội, cành tơ phơ phất), thính giác (khúc tình si yến anh), vị giác & khứu giác (tháng mật, tuần rượu). Thiên nhiên hiện ra tươi mới, tình tứ như một thiên đường trên mặt đất.',
        explanation: 'Nhà thơ đã huy động mọi giác quan để đón nhận vẻ đẹp tràn trề sinh lực của mùa xuân.',
        status: 'saved',
        points: 0
      },
      {
        questionNumber: 4,
        questionType: 'Vận dụng cao',
        maxScore: 2.0,
        questionText: 'Từ quan niệm sống "Vội vàng" của Xuân Diệu, em hãy rút ra thông điệp sống ý nghĩa cho tuổi trẻ hôm nay (viết đoạn văn ngắn 3 - 5 câu).',
        userAnswer: 'Tuổi trẻ là quãng thời gian đẹp đẽ và rực rỡ nhất của đời người. Chúng ta không nên sống hoài, sống phí mà phải biết trân trọng từng phút giây hiện tại để học tập, cống hiến và yêu thương. Sống vội vàng không phải là sống gấp, sống hưởng thụ ích kỷ mà là sống sâu sắc, có ích cho gia đình và xã hội.',
        correctAnswer: 'Học sinh nêu thông điệp tích cực: Trân trọng thời gian tuổi trẻ; sống chủ động, cống hiến hết mình; biết yêu thương và biến ước mơ thành hành động cụ thể để mỗi ngày trôi qua đều có ý nghĩa.',
        explanation: 'Đoạn văn cần mạch lạc, nêu được nhận thức đúng đắn về quan niệm sống của tuổi trẻ.',
        status: 'saved',
        points: 0
      }
    ]
  };

  const history = getQuizHistory();
  history.unshift(sample);
  try {
    localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(history));
  } catch (e) {}

  renderHistoryList();
  if (typeof renderHistoryPage === 'function') renderHistoryPage();
  toast('✨ Đã nạp bài làm mẫu! Bạn có thể nhấn "Chấm bài ngay" để thử nghiệm.', 'ok');
}

function createSampleWritingSubmissionForGrading() {
  const sample = {
    id: 'sample_writing_' + Date.now(),
    type: 'writing',
    setId: 'writing_sample_nlxh_kientri',
    setTitle: 'Nghị luận xã hội: Ý nghĩa của lòng kiên trì',
    setTopic: 'Nghị luận xã hội',
    playerName: 'Trần Thị Mai',
    className: '12A2',
    dateStr: new Date().toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }),
    timestamp: Date.now(),
    totalQuestions: 3,
    answeredCount: 3,
    totalWords: 245,
    savedShortCount: 245,
    elapsedSeconds: 1250,
    isGraded: false,
    score: 0,
    details: [
      {
        questionNumber: 1,
        questionText: 'Mở bài',
        sectionId: 'sec_mo_bai',
        sectionTitle: 'Mở bài (2.0 điểm)',
        sectionGuide: 'Dẫn dắt trực tiếp và nêu vấn đề nghị luận: Lòng kiên trì là chiếc la bàn và kim chỉ nam dẫn lối đến thành công của mỗi con người trong cuộc sống hiện đại.',
        questionType: 'Luyện viết',
        userAnswer: 'Trên hành trình vươn tới ước mơ và khẳng định giá trị bản thân, kiên trì chính là chiếc la bàn vững chắc và là kim chỉ nam giúp mỗi con người vượt qua mọi giông bão cuộc đời để chạm tới đỉnh vinh quang.',
        words: 39,
        maxScore: 2.0,
        points: 0,
        gradeStatus: 'saved',
        status: 'saved',
        teacherComment: ''
      },
      {
        questionNumber: 2,
        questionText: 'Thân bài',
        sectionId: 'sec_than_bai',
        sectionTitle: 'Thân bài (6.0 điểm)',
        sectionGuide: '1. Giải thích: Kiên trì là sự bền bỉ, nhẫn nại theo đuổi mục tiêu dù gặp muôn vàn khó khăn, thử thách mà không hề bỏ cuộc giữa chừng.\n2. Bàn luận & Dẫn chứng: Lòng kiên trì rèn giũa bản lĩnh thép, biến trở ngại thành cơ hội và tích lũy tri thức. Dẫn chứng: Thomas Edison, Thầy giáo Nguyễn Ngọc Ký...\n3. Phản đề: Phê phán lối sống thiếu kiên nhẫn, "cả thèm chóng chán".',
        questionType: 'Luyện viết',
        userAnswer: 'Trước hết, kiên trì là sự bền bỉ, nhẫn nại theo đuổi mục tiêu đã đề ra, dẫu phải đối mặt với muôn vàn gian nan, thử thách mà không hề chùn bước hay buông xuôi giữa chừng. Lòng kiên trì tôi luyện cho ta bản lĩnh thép, biến những chông gai trên đường đời thành bệ phóng tích lũy tri thức và kinh nghiệm sống quý báu. Người có lòng kiên định luôn nhìn thấy cơ hội ngay trong nghịch cảnh; tiêu biểu như nhà bác học Thomas Edison đã trải qua hàng nghìn lần thử nghiệm thất bại trước khi thắp sáng nhân loại bằng phát minh bóng đèn điện. Ngược lại, những kẻ thiếu kiên nhẫn, "cả thèm chóng chán", hễ thấy khó khăn đã vội vàng nản chí sẽ mãi dậm chân tại chỗ và khó có thể chạm tay vào quả ngọt của thành công.',
        words: 165,
        maxScore: 6.0,
        points: 0,
        gradeStatus: 'saved',
        status: 'saved',
        teacherComment: ''
      },
      {
        questionNumber: 3,
        questionText: 'Kết bài',
        sectionId: 'sec_ket_bai',
        sectionTitle: 'Kết bài (2.0 điểm)',
        sectionGuide: 'Khái quát lại ý nghĩa của lòng kiên trì; rút ra bài học nhận thức và phương hướng hành động cụ thể cho bản thân trong học tập và cuộc sống.',
        questionType: 'Luyện viết',
        userAnswer: 'Tóm lại, thành công không đến sau một đêm mà là kết tinh của chuỗi ngày bền bỉ nỗ lực. Là một học sinh đang đứng trước ngưỡng cửa tương lai, em tự nhắc nhở mình phải luôn kiên trì rèn luyện và trau dồi tri thức mỗi ngày.',
        words: 41,
        maxScore: 2.0,
        points: 0,
        gradeStatus: 'saved',
        status: 'saved',
        teacherComment: ''
      }
    ]
  };

  const history = getQuizHistory();
  history.unshift(sample);
  try {
    localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(history));
  } catch (e) {}

  renderHistoryList();
  if (typeof renderHistoryPage === 'function') renderHistoryPage();
  toast('✨ Đã nạp bài viết mẫu (Thang 10đ)! Bạn có thể nhấn "Chấm bài ngay" để trải nghiệm.', 'ok');
}

function closeHistoryDetailModal() {
  const dialog = document.getElementById('history-detail-dialog');
  if (dialog && dialog.open) dialog.close();
}

function copyHistoryDetailText() {
  const history = getQuizHistory();
  const item = history.find(h => String(h.id) === String(currentViewingHistoryId));
  if (!item) return;

  const lines = [
    `=== KẾT QUẢ BÀI LÀM: ${item.setTitle || 'Bài làm'} ===`,
    `Học sinh: ${item.playerName || 'Học sinh'}${item.className ? ' - Lớp: ' + item.className : ''}`,
    `Thời gian làm: ${item.dateStr || ''}`,
    item.isGraded ? `TỔNG ĐIỂM: ${item.score || 0} điểm` : `Điểm số: ${item.score || 0}`,
    item.teacherFeedback ? `Lời phê của giáo viên: ${item.teacherFeedback}` : '',
    '',
    '--- CHI TIẾT TỪNG CÂU HỎI ---'
  ];

  const details = Array.isArray(item.details) ? item.details : [];
  details.forEach((d, idx) => {
    lines.push(`Câu ${idx + 1}: ${d.questionText}`);
    lines.push(`- Trả lời: ${d.userAnswer || '(Để trống)'}`);
    if (d.points !== undefined) lines.push(`- Điểm câu: ${d.points}đ (${d.gradeStatus === 'ok' ? 'Đạt' : d.gradeStatus === 'partial' ? 'Một phần' : 'Chưa đạt'})`);
    if (d.teacherComment) lines.push(`- Nhận xét: ${d.teacherComment}`);
    lines.push('');
  });

  navigator.clipboard.writeText(lines.filter(l => l !== null).join('\n')).then(() => {
    toast('Đã sao chép toàn bộ kết quả bài làm & điểm số vào clipboard!', 'ok');
  }).catch(() => {
    toast('Không thể sao chép tự động.', 'bad');
  });
}


