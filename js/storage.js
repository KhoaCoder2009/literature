/* =========================================================================
   4. DATA PERSISTENCE & SUPABASE CLOUD SYNC
   ========================================================================= */

async function loadSetsFromSupabase() {
  if (!isSupabaseConfigured()) return false;
  try {
    const url = `${appConfig.supabase.url.replace(/\/$/, '')}/rest/v1/${appConfig.supabase.table || 'question_sets'}?select=id,title,topic,status,qs&order=updated_at.desc`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': appConfig.supabase.anonKey,
        'Authorization': `Bearer ${appConfig.supabase.anonKey}`,
        'Content-Type': 'application/json'
      }
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
    headers: {
      'apikey': appConfig.supabase.anonKey,
      'Authorization': 'Bearer ' + appConfig.supabase.anonKey,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({ status: 'deleted' })
  });
  if (!res.ok) {
    const details = await res.text();
    throw new Error(details || `Supabase delete failed (${res.status})`);
  }
  const archivedRows = await res.json();
  if (!Array.isArray(archivedRows) || !archivedRows.some(row => String(row.id) === String(id))) {
    throw new Error('Không tìm thấy bộ câu hỏi trên Supabase hoặc bạn không có quyền xóa.');
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
      headers: {
        'apikey': appConfig.supabase.anonKey,
        'Authorization': `Bearer ${appConfig.supabase.anonKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
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
    setEmo: row.set_emo || '📖',
    score: Number(row.score) || 0,
    correctCount: Number(row.correct_count) || 0,
    wrongCount: Number(row.wrong_count) || 0,
    savedShortCount: Number(row.saved_short_count) || 0,
    answeredCount: Number(row.saved_short_count) || 0,
    totalQuestions: Number(row.total_questions) || 0,
    accuracy: Number(row.accuracy) || 0,
    elapsedSeconds: Number(row.elapsed_seconds) || 0,
    details: details,
    isGraded: isGraded,
    teacherFeedback: teacherFeedback,
    gradedDateStr: row.graded_at ? new Date(row.graded_at).toLocaleString('vi-VN') : ''
  };
}

async function saveQuizAttemptToSupabase(entry) {
  if (!isSupabaseConfigured()) return;
  try {
    const table = appConfig.supabase.historyTable || 'quiz_submissions';
    const url = `${appConfig.supabase.url.replace(/\/$/, '')}/rest/v1/${table}`;
    const row = {
      id: String(entry.id),
      user_id: localStorage.getItem('vq_user_id') || '',
      type: entry.type || 'quiz',
      player_name: String(entry.playerName || 'Học sinh').trim().slice(0, 50),
      class_name: String(entry.className || '').trim().slice(0, 30),
      set_id: String(entry.setId || ''),
      set_title: String(entry.setTitle || 'Bài làm').slice(0, 100),
      set_topic: String(entry.setTopic || '').slice(0, 100),
      set_emo: String(entry.setEmo || '📖').slice(0, 10),
      score: Math.max(0, Number(entry.score) || 0),
      correct_count: Math.max(0, Number(entry.correctCount) || 0),
      wrong_count: Math.max(0, Number(entry.wrongCount) || 0),
      saved_short_count: Math.max(0, Number(entry.savedShortCount || entry.answeredCount) || 0),
      total_questions: Math.max(0, Number(entry.totalQuestions) || 0),
      accuracy: Math.min(100, Math.max(0, Number(entry.accuracy) || 0)),
      elapsed_seconds: Math.max(0, Number(entry.elapsedSeconds) || 0),
      details: Array.isArray(entry.details) ? entry.details : [],
      created_at: new Date(entry.timestamp || Date.now()).toISOString()
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'apikey': appConfig.supabase.anonKey,
        'Authorization': `Bearer ${appConfig.supabase.anonKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify(row)
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn('Supabase history save note:', res.status, errText);
    }
  } catch (err) {
    console.warn('Supabase history sync error:', err);
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
    const url = `${appConfig.supabase.url.replace(/\/$/, '')}/rest/v1/${table}?select=*&order=created_at.desc&limit=100`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': appConfig.supabase.anonKey,
        'Authorization': `Bearer ${appConfig.supabase.anonKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (res.ok) {
      const rows = await res.json();
      if (Array.isArray(rows) && rows.length > 0) {
        const cloudEntries = rows.map(mapSupabaseRowToHistory);
        const localList = getQuizHistory();
        const mergedMap = new Map();
        cloudEntries.forEach(item => mergedMap.set(String(item.id), item));
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
        headers: {
          'apikey': appConfig.supabase.anonKey,
          'Authorization': `Bearer ${appConfig.supabase.anonKey}`
        }
      }).catch(e => console.warn('Supabase history delete failed:', e));
    }
  } catch (e) {
    console.error(e);
  }
}

function clearAllQuizHistory() {
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
  const countUngradedEl = document.getElementById('hist-count-ungraded');
  const countGradedEl = document.getElementById('hist-count-graded');
  if (countAllEl) countAllEl.textContent = `(${allHistory.length})`;
  if (countQuizEl) countQuizEl.textContent = `(${allHistory.filter(h => h.type === 'quiz' || !h.type).length})`;
  if (countReadingEl) countReadingEl.textContent = `(${allHistory.filter(h => h.type === 'reading').length})`;
  if (countUngradedEl) countUngradedEl.textContent = `(${allHistory.filter(h => !h.isGraded && (h.type === 'reading' || h.savedShortCount > 0 || (Array.isArray(h.details) && h.details.some(d => d.status === 'saved')))).length})`;
  if (countGradedEl) countGradedEl.textContent = `(${allHistory.filter(h => h.isGraded).length})`;

  // 2. Filter records
  let filtered = allHistory;
  if (currentHistoryTypeFilter && currentHistoryTypeFilter !== 'all') {
    filtered = filtered.filter(h => {
      const isQuiz = h.type === 'quiz' || !h.type;
      if (currentHistoryTypeFilter === 'quiz') return isQuiz;
      if (currentHistoryTypeFilter === 'reading') return h.type === 'reading';
      if (currentHistoryTypeFilter === 'ungraded') {
        return !h.isGraded && (h.type === 'reading' || h.savedShortCount > 0 || (Array.isArray(h.details) && h.details.some(d => d.status === 'saved')));
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
          ${allHistory.length ? 'Không tìm thấy lượt làm bài nào phù hợp với bộ lọc hoặc từ khóa tìm kiếm.' : 'Sau khi bạn hoàn thành ôn tập hoặc đọc hiểu, toàn bộ bài làm và câu trả lời sẽ tự động lưu lại tại đây và đồng bộ lên Database.'}
        </p>
      </div>`;
    return;
  }

  container.innerHTML = filtered.map(renderHistoryItemCardHtml).join('');
}

function renderHistoryItemCardHtml(item) {
  const isQuiz = item.type === 'quiz' || !item.type;
  const typeIcon = item.type === 'reading' ? '📑' : '📖';
  const typeName = item.type === 'reading' ? 'Đọc hiểu' : 'Bài học';
  const isGraded = Boolean(item.isGraded);
  const hasUngradedShort = !isGraded && (item.type === 'reading' || item.savedShortCount > 0 || (Array.isArray(item.details) && item.details.some(d => d.status === 'saved')));

  let statsHtml = '';
  if (isQuiz) {
    statsHtml = `
      <span class="history-pill pill-score">🏆 ${item.score || 0} điểm</span>
      <span class="history-pill pill-acc">🎯 ${item.accuracy || 0}% (${item.correctCount || 0}/${item.totalQuestions || 0} đúng)</span>
      ${item.savedShortCount ? `<span class="history-pill pill-short">📝 ${item.savedShortCount} tự luận</span>` : ''}
      <span class="history-pill pill-time">⏱️ ${item.elapsedSeconds ? Math.floor(item.elapsedSeconds / 60) + 'p ' + (item.elapsedSeconds % 60) + 's' : '—'}</span>
    `;
  } else if (item.type === 'reading') {
    statsHtml = `
      <span class="history-pill pill-score">📑 ${item.answeredCount || 0}/${item.totalQuestions || 0} câu đã trả lời</span>
      <span class="history-pill pill-time">⏱️ ${item.dateStr || ''}</span>
    `;
  }

  if (isGraded) {
    statsHtml += `<span class="history-pill pill-graded">✅ Đã chấm: <b>${item.score || 0}</b>đ</span>`;
    if (item.teacherFeedback) {
      statsHtml += `<span class="history-pill pill-short" title="${esc(item.teacherFeedback)}">💬 Có lời phê</span>`;
    }
  } else if (hasUngradedShort) {
    statsHtml += `<span class="history-pill pill-ungraded">⏳ Chờ chấm điểm</span>`;
  }

  return `
    <div class="history-item-card">
      <div class="history-item-top">
        <div class="history-item-title-box">
          <span class="history-item-badge">${typeIcon} ${typeName}</span>
          <h4 class="history-item-title" onclick="openHistoryForSet('${esc(item.setId)}', '${esc(item.setTitle)}')" style="cursor:pointer;" title="Nhấp để chỉ xem các bài làm của bộ đề này">
            ${esc(item.setTitle || 'Bài làm')}
          </h4>
        </div>
        <span class="history-item-date">${item.dateStr || ''}</span>
      </div>

      <div class="history-item-meta">
        <span>👤 Học sinh: <b>${esc(item.playerName || 'Học sinh')}</b></span>
        ${item.className ? `<span>· Lớp: <b>${esc(item.className)}</b></span>` : ''}
        ${item.setTopic ? `<span>· Chủ đề: <b>${esc(item.setTopic)}</b></span>` : ''}
      </div>

      <div class="history-item-stats">
        ${statsHtml}
      </div>

      <div class="history-item-footer">
        <button class="btn au sm" type="button" onclick="viewHistoryDetail('${esc(item.id)}', false)">
          👁️ Xem bài làm
        </button>
        <button class="btn cy sm" type="button" onclick="viewHistoryDetail('${esc(item.id)}', true)">
          ✏️ ${isGraded ? 'Sửa điểm / Chấm lại' : 'Chấm bài'}
        </button>
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
          ${allHistory.length ? 'Không tìm thấy lượt làm bài nào cho bộ đề hoặc từ khóa này.' : 'Sau khi bạn hoàn thành bài học hoặc đọc hiểu, kết quả và câu trả lời sẽ tự động được lưu lại tại đây.'}
        </p>
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

  if (headingEl) {
    headingEl.textContent = isHistoryGradingMode
      ? 'Chấm điểm từng câu hỏi:'
      : 'Danh sách câu hỏi & Bài làm:';
  }

  const isGraded = Boolean(item.isGraded);
  if (metaEl) {
    metaEl.innerHTML = `
      <div style="display:flex; flex-wrap:wrap; gap:12px; font-size:13.5px; margin-bottom:14px; background:var(--bg-base); border:2px solid var(--stroke); border-radius:14px; padding:12px 16px; align-items:center;">
        <span>👤 Học sinh: <b>${esc(item.playerName || 'Học sinh')}</b></span>
        ${item.className ? `<span>· Lớp: <b>${esc(item.className)}</b></span>` : ''}
        <span>· Ngày làm: <b>${item.dateStr || ''}</b></span>
        ${item.type === 'reading' 
          ? `<span>· Đọc hiểu: <b>${item.answeredCount || 0}/${item.totalQuestions || 0} câu</b></span>` 
          : `<span>· Trắc nghiệm: <b>${item.accuracy || 0}%</b> (${item.correctCount || 0}/${item.totalQuestions || 0} câu đúng)</span>`
        }
        <span class="tag ${isGraded ? 'ok' : 'cy'}" style="font-weight:800;">
          ${isGraded ? `✅ Đã chấm: ${item.score || 0}đ` : '⏳ Chờ chấm điểm'}
        </span>
        ${item.gradedDateStr ? `<span class="mut" style="font-size:12.5px;">(Chấm lúc: ${item.gradedDateStr})</span>` : ''}
      </div>
    `;
  }

  if (toolbarEl) {
    if (isHistoryGradingMode) {
      toolbarEl.style.display = 'flex';
      toolbarEl.className = 'history-grading-toolbar';
      toolbarEl.innerHTML = `
        <div class="history-grading-toolbar-title">
          <span>✏️</span> <span>Chế độ Chấm bài thủ công</span>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <button type="button" class="btn cy sm" onclick="autoCalculateTotalPoints()" style="font-size:12.5px; padding:3px 10px;">
            ⚡ Tính tổng điểm các câu
          </button>
          <button type="button" class="btn au sm" onclick="saveManualGrading()" style="font-size:12.5px; font-weight:800; padding:3px 12px;">
            💾 Lưu kết quả
          </button>
        </div>
      `;
    } else {
      toolbarEl.style.display = 'none';
    }
  }

  const details = Array.isArray(item.details) ? item.details : [];
  if (listEl) {
    if (!details.length) {
      listEl.innerHTML = '<p class="mut">Không có dữ liệu chi tiết cho bài làm này.</p>';
    } else {
      listEl.innerHTML = details.map((d, idx) => {
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
          badgeTxt = '📝 Tự luận (Chờ chấm)';
        } else if (d.status === 'no') {
          badgeCls = 'gh';
          badgeTxt = '⏰ Bỏ qua';
        }

        const userAns = (d.userAnswer || '').trim();
        const words = (userAns.match(/\S+/g) || []).length;
        const curStatus = d.gradeStatus || (d.status === 'ok' ? 'ok' : d.status === 'bad' ? 'bad' : 'ok');
        const curPoints = d.points !== undefined ? d.points : (d.status === 'ok' ? 1 : 0);

        return `
          <div class="history-detail-q-card" id="hist-card-q-${idx}">
            <div class="history-detail-q-head">
              <div style="display:flex; align-items:center; gap:8px;">
                <span class="history-detail-q-num">Câu ${idx + 1}</span>
                ${d.questionType ? `<span class="tag gh" style="font-size:11px;">${esc(d.questionType)}</span>` : ''}
              </div>
              <div style="display:flex; align-items:center; gap:8px;">
                ${d.points !== undefined ? `<span class="tag ${d.points > 0 ? 'ok' : 'gh'}" style="font-weight:800;">⭐ ${d.points}đ</span>` : ''}
                <span class="tag ${badgeCls}">${badgeTxt}</span>
              </div>
            </div>

            <div class="history-detail-q-body">
              <p class="history-detail-q-text"><b>${esc(d.questionText)}</b></p>
              
              <div class="history-detail-ans-row">
                <span class="history-detail-ans-label">Câu trả lời của bạn:</span>
                ${words > 30 ? `<span class="mut" style="font-size:12px;">(📝 ${words} từ)</span>` : ''}
              </div>
              <div class="history-detail-ans-val ${d.status === 'ok' ? 'correct' : d.status === 'saved' ? 'saved' : 'wrong'}" style="margin-bottom:8px; line-height:1.6; white-space:pre-wrap; background:rgba(0,0,0,0.02); padding:8px 12px; border-radius:8px; border:1px solid var(--stroke);">
                ${esc(userAns || '(Để trống)')}
              </div>

              ${d.correctAnswer ? `
                <div class="history-detail-ans-row">
                  <span class="history-detail-ans-label">${d.status === 'saved' || item.type === 'reading' ? '💡 Gợi ý / Đáp án chuẩn:' : 'Đáp án đúng:'}</span>
                </div>
                <div class="history-detail-ans-val guide" style="margin-bottom:8px; line-height:1.6; white-space:pre-wrap; font-size:13.5px;">
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
                    <span class="grading-panel-label">✏️ Chấm điểm câu ${idx + 1}:</span>
                    <div class="grading-quick-status-btns">
                      <button type="button" class="grading-quick-status-btn ${curStatus === 'ok' ? 'active-ok' : ''}" onclick="setQuestionGradeStatus(${idx}, 'ok')">
                        ✅ Đạt
                      </button>
                      <button type="button" class="grading-quick-status-btn ${curStatus === 'partial' ? 'active-partial' : ''}" onclick="setQuestionGradeStatus(${idx}, 'partial')">
                        🟡 Một phần
                      </button>
                      <button type="button" class="grading-quick-status-btn ${curStatus === 'bad' ? 'active-bad' : ''}" onclick="setQuestionGradeStatus(${idx}, 'bad')">
                        ❌ Chưa đạt
                      </button>
                    </div>
                  </div>

                  <div class="grading-inputs-row">
                    <div class="grading-points-input-box">
                      <label for="grade-point-${idx}">Số điểm:</label>
                      <input type="number" id="grade-point-${idx}" class="grade-point-input" step="0.25" min="0" max="10" value="${curPoints}" oninput="onQuestionPointsChanged()" style="width:72px; text-align:center; font-weight:800; font-size:15px; border-radius:8px; padding:4px 6px;">
                      <span class="mut" style="font-size:13px;">điểm</span>
                      <div class="grading-quick-pills">
                        <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, 0.25)">0.25</button>
                        <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, 0.5)">0.5</button>
                        <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, 1.0)">1.0</button>
                        <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, 2.0)">2.0</button>
                        <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, 0)">0đ</button>
                      </div>
                    </div>
                  </div>

                  <div class="grading-comment-box">
                    <input type="text" id="grade-comment-${idx}" class="grade-comment-input" placeholder="Nhận xét của giáo viên cho câu này (ví dụ: Diễn đạt tốt, thiếu dẫn chứng...)" value="${esc(d.teacherComment || '')}">
                  </div>
                </div>
              ` : `
                ${(d.isGraded || d.teacherComment || (d.points !== undefined && d.points > 0)) ? `
                  <div class="history-graded-result-box">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
                      <span>⭐ Điểm câu ${idx + 1}: <b>${d.points !== undefined ? d.points : 0}</b> điểm</span>
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
              <span>📝</span> <span>Tổng kết điểm &amp; Lời phê của giáo viên</span>
            </h4>
            <button type="button" class="btn cy sm" onclick="autoCalculateTotalPoints()" title="Cộng dồn điểm từ tất cả các câu hỏi trên">
              ⚡ Tự động tính tổng từ các câu
            </button>
          </div>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:14px; margin-bottom:14px;">
            <div>
              <label for="grade-total-score" style="font-weight:700; font-size:13.5px; display:block; margin-bottom:5px;">
                Tổng điểm toàn bài:
              </label>
              <div style="display:flex; align-items:center; gap:8px;">
                <input type="number" id="grade-total-score" step="0.25" min="0" max="100" value="${item.score || 0}" oninput="updateGradeRankBadge()" style="width:100px; text-align:center; font-weight:900; font-size:20px; border-radius:10px; padding:6px 8px; color:var(--primary);">
                <span style="font-weight:700; font-size:15px;">điểm</span>
              </div>
            </div>
            <div>
              <label style="font-weight:700; font-size:13.5px; display:block; margin-bottom:5px;">
                Xếp loại kết quả:
              </label>
              <div id="grade-rank-badge-wrap">
                ${getGradeRankBadge(item.score)}
              </div>
            </div>
          </div>

          <div style="margin-bottom:16px;">
            <label for="grade-general-feedback" style="font-weight:700; font-size:13.5px; display:block; margin-bottom:5px;">
              Lời phê / Nhận xét chung cho học sinh:
            </label>
            <textarea id="grade-general-feedback" rows="3" placeholder="Nhập nhận xét tổng quát về kiến thức, kỹ năng trình bày, ưu điểm và điểm cần khắc phục của bài làm..." style="width:100%; font-family:inherit; font-size:13.5px; border-radius:10px; padding:9px 12px; line-height:1.5;">${esc(item.teacherFeedback || '')}</textarea>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button type="button" class="btn gh" onclick="toggleHistoryGradingMode()">Hủy</button>
            <button type="button" class="btn au" onclick="saveManualGrading()" style="font-weight:800; padding:10px 22px;">
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
              <span>🏆</span> <span>Kết quả chấm bài của giáo viên</span>
            </h4>
            <button type="button" class="btn cy sm" onclick="toggleHistoryGradingMode()">
              ✏️ Sửa điểm / Chấm lại
            </button>
          </div>
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px; flex-wrap:wrap;">
            <span style="font-size:22px; font-weight:900; color:var(--green);">
              ${item.score || 0} điểm
            </span>
            ${getGradeRankBadge(item.score)}
            ${item.gradedDateStr ? `<span class="mut" style="font-size:12.5px;">(Chấm lúc: ${item.gradedDateStr})</span>` : ''}
          </div>
          ${item.teacherFeedback ? `
            <div style="padding:10px 14px; border-radius:10px; background:var(--bg-card); border:1px solid var(--stroke); font-size:13.5px; line-height:1.6;">
              <b>💬 Lời phê của giáo viên:</b><br>${esc(item.teacherFeedback).replace(/\n/g, '<br>')}
            </div>
          ` : ''}
        </div>
      `;
    } else {
      summaryEl.innerHTML = `
        <div style="text-align:center; margin-top:20px; padding:18px; border:2px dashed var(--stroke); border-radius:16px;">
          <p class="mut" style="margin:0 0 10px; font-size:14px;">Bài làm này chưa được chấm điểm thủ công.</p>
          <button type="button" class="btn cy" onclick="toggleHistoryGradingMode()" style="font-weight:700;">
            ✏️ Bắt đầu chấm bài ngay
          </button>
        </div>
      `;
    }
  }
}

function setQuestionGradeStatus(idx, status) {
  const history = getQuizHistory();
  const item = history.find(h => String(h.id) === String(currentViewingHistoryId));
  if (item && item.details && item.details[idx]) {
    item.details[idx].gradeStatus = status;
    const pointEl = document.getElementById(`grade-point-${idx}`);
    if (pointEl) {
      if (status === 'bad') {
        pointEl.value = '0';
      } else if (status === 'ok' && (parseFloat(pointEl.value) || 0) === 0) {
        pointEl.value = '1';
      } else if (status === 'partial' && (parseFloat(pointEl.value) || 0) === 0) {
        pointEl.value = '0.5';
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

function getGradeRankBadge(score) {
  const num = parseFloat(score) || 0;
  let label = 'Cần cố gắng ⚠️';
  let cls = 'rank-yeu';
  if (num >= 8.5) {
    label = 'Xuất sắc / Giỏi 🌟';
    cls = 'rank-gioi';
  } else if (num >= 6.5) {
    label = 'Khá 👍';
    cls = 'rank-kha';
  } else if (num >= 5.0) {
    label = 'Trung bình ⚡';
    cls = 'rank-tb';
  }
  return `<span class="history-rank-badge ${cls}">${label}</span>`;
}

function updateGradeRankBadge() {
  const totalInput = document.getElementById('grade-total-score');
  const badgeWrap = document.getElementById('grade-rank-badge-wrap');
  if (totalInput && badgeWrap) {
    badgeWrap.innerHTML = getGradeRankBadge(parseFloat(totalInput.value) || 0);
  }
}

function saveManualGrading() {
  const history = getQuizHistory();
  const item = history.find(h => String(h.id) === String(currentViewingHistoryId));
  if (!item) return toast('Không tìm thấy bài làm cần lưu!', 'bad');

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

  item.isGraded = true;
  item.score = Math.round(newScore * 100) / 100;
  item.teacherFeedback = generalFeedback;
  item.gradedAt = Date.now();
  item.gradedDateStr = new Date().toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });

  // Save to localStorage
  try {
    localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.error('Failed to save graded history:', e);
  }

  // Sync to Supabase
  saveQuizAttemptToSupabase(item);

  // Re-render
  renderHistoryList();
  if (typeof renderHistoryPage === 'function') renderHistoryPage();
  isHistoryGradingMode = false;
  renderHistoryDetailModalView();

  toast('Đã lưu kết quả chấm bài thành công!', 'ok');
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

