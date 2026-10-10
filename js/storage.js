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
