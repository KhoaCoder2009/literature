/* =========================================================================
   8. GAMEPLAY & STUDENT QUIZ ENGINE
   ========================================================================= */

let currentSetupTopic = 'all';
let setupSearchQuery = '';

const SETUP_PALETTES = [
  'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)', // 1. Red / Coral (Ngữ văn)
  'linear-gradient(135deg, #fb923c 0%, #ea580c 100%)', // 2. Orange (Toán)
  'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', // 3. Amber / Gold
  'linear-gradient(135deg, #10b981 0%, #059669 100%)', // 4. Emerald / Dark Green
  'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)', // 5. Lime / Light Green
  'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)', // 6. Teal / Olive
  'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', // 7. Navy / Dark Blue
  'linear-gradient(135deg, #3b82f6 0%, #0284c7 100%)', // 8. Medium Blue
  'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)'  // 9. Cyan / Light Blue
];

function onPlayerInfoChange() {
  const nick = $('#nick')?.value.trim();
  const className = $('#class-name')?.value.trim();
  try {
    if (nick) localStorage.setItem('vq_player_nick', nick);
    if (className) localStorage.setItem('vq_player_class', className);
  } catch (e) {}
}

function onSetupSearchInput() {
  setupSearchQuery = ($('#setup-search')?.value || '').trim().toLowerCase();
  renderSetupSetsGrid();
}

function setSetupTopicFilter(topic) {
  currentSetupTopic = topic;
  renderSetupSetsGrid();
}

function selectAndStartSetupQuiz(id) {
  if (typeof Auth !== 'undefined' && !Auth.isLoggedIn()) {
    toast('Vui lòng đăng nhập tài khoản để vào làm bài!', 'bad');
    if (typeof openLoginDialog === 'function') openLoginDialog();
    return;
  }
  const s = sets.find(x => String(x.id) === String(id));
  if (s && typeof isStudentEntryBlocked === 'function' && isStudentEntryBlocked(s, 'quiz')) {
    const info = (typeof getStudentBlockInfo === 'function') ? getStudentBlockInfo(s, 'quiz') : { hasSubmissions: false, message: 'Bộ đề này đã khóa đối với bạn!' };
    toast(info.message, 'bad');
    if (info.hasSubmissions) {
      openHistoryForSet(s.id, s.title);
    }
    return;
  }
  openStartQuizModal(id);
}

function openStartQuizModal(id) {
  if (typeof Auth !== 'undefined' && !Auth.isLoggedIn()) {
    toast('Vui lòng đăng nhập tài khoản để vào làm bài!', 'bad');
    if (typeof openLoginDialog === 'function') openLoginDialog();
    return;
  }
  const s = sets.find(x => String(x.id) === String(id));
  if (!s) return;

  if (typeof isStudentEntryBlocked === 'function' && isStudentEntryBlocked(s, 'quiz')) {
    const info = (typeof getStudentBlockInfo === 'function') ? getStudentBlockInfo(s, 'quiz') : { hasSubmissions: false, message: 'Bộ đề này đã khóa đối với bạn!' };
    toast(info.message, 'bad');
    if (info.hasSubmissions) {
      openHistoryForSet(s.id, s.title);
    }
    return;
  }

  const setIdInput = $('#start-quiz-set-id');
  if (setIdInput) setIdInput.value = s.id;

  const titleEl = $('#start-modal-set-title');
  if (titleEl) titleEl.textContent = s.title;

  const badgeEl = $('#start-modal-set-badge');
  if (badgeEl) badgeEl.textContent = (s.qs ? s.qs.length : 0) + ' câu hỏi';

  const topicEl = $('#start-modal-set-topic');
  if (topicEl) topicEl.textContent = s.topic ? 'Chủ đề: ' + s.topic : '';

  // Điền thông tin học sinh từ tài khoản đang đăng nhập
  const u = (typeof Auth !== 'undefined') ? Auth.getCurrentUser() : null;
  const nickInput = $('#start-nick');
  const classInput = $('#start-class-name');
  if (u) {
    if (nickInput) nickInput.value = u.full_name || u.username;
    if (classInput) classInput.value = u.class_name || '';
  } else {
    try {
      const savedNick = localStorage.getItem('vq_player_nick') || '';
      const savedClass = localStorage.getItem('vq_player_class') || '';
      if (nickInput && savedNick) nickInput.value = savedNick;
      if (classInput && savedClass) classInput.value = savedClass;
    } catch (e) {}
  }

  const dlg = $('#start-quiz-dialog');
  if (dlg) {
    if (!dlg._hasBackdropListener) {
      dlg._hasBackdropListener = true;
      dlg.addEventListener('click', (e) => {
        const rect = dlg.getBoundingClientRect();
        const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height
          && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
        if (!isInDialog) closeStartQuizModal();
      });
    }
    dlg.showModal();
    setTimeout(() => {
      const input = $('#start-nick');
      if (input) {
        input.focus();
        input.select();
      }
    }, 50);
  }
}

function closeStartQuizModal() {
  const dlg = $('#start-quiz-dialog');
  if (dlg && dlg.open) dlg.close();
}

function handleStartQuizSubmit(e) {
  if (e) e.preventDefault();
  if (typeof Auth !== 'undefined' && !Auth.isLoggedIn()) {
    toast('Vui lòng đăng nhập tài khoản để vào làm bài!', 'bad');
    if (typeof openLoginDialog === 'function') openLoginDialog();
    return;
  }
  const id = $('#start-quiz-set-id')?.value;
  const nick = ($('#start-nick')?.value || '').trim();
  const className = ($('#start-class-name')?.value || '').trim();

  if (!nick) {
    return toast('Vui lòng nhập tên học sinh!', 'bad');
  }

  // Save to localStorage
  try {
    localStorage.setItem('vq_player_nick', nick);
    if (className) localStorage.setItem('vq_player_class', className);
    else localStorage.removeItem('vq_player_class');
  } catch (err) {}

  // Sync to hidden inputs
  if ($('#nick')) $('#nick').value = nick;
  if ($('#class-name')) $('#class-name').value = className;
  if ($('#ss')) $('#ss').value = id;

  updateSetupQuestionCount();
  closeStartQuizModal();

  // Launch quiz
  begin();
}

function renderSetupSetsGrid(selectedId) {
  const container = $('#setup-sets-grid');
  if (!container) return;

  const validSets = (sets || []).filter(s => !String(s.id).startsWith('set_'));

  // 1. Render Topic Chips
  const chipsContainer = $('#setup-topic-chips');
  const summaryEl = $('#setup-topic-summary');
  if (chipsContainer) {
    const topicMap = new Map();
    validSets.forEach(s => {
      const top = (s.topic || 'Chưa phân loại').trim();
      topicMap.set(top, (topicMap.get(top) || 0) + 1);
    });

    const isAll = currentSetupTopic === 'all';
    let chipsHtml = `
      <button class="topic-chip ${isAll ? 'active' : ''}" type="button" onclick="setSetupTopicFilter('all')">
        Tất cả <span class="chip-count">(${validSets.length})</span>
      </button>
    `;

    topicMap.forEach((count, top) => {
      const isActive = currentSetupTopic === top;
      chipsHtml += `
        <button class="topic-chip ${isActive ? 'active' : ''}" type="button" onclick="setSetupTopicFilter('${esc(top)}')">
          ${esc(top)} <span class="chip-count">(${count})</span>
        </button>
      `;
    });

    chipsContainer.innerHTML = chipsHtml;
    if (summaryEl) {
      summaryEl.textContent = isAll ? `(${validSets.length} bộ đề)` : `(Lọc theo "${currentSetupTopic}")`;
    }
  }

  // 2. Filter Sets
  const filteredSets = validSets.filter(s => {
    if (currentSetupTopic !== 'all' && (s.topic || 'Chưa phân loại').trim() !== currentSetupTopic) {
      return false;
    }
    if (setupSearchQuery) {
      const t = (String(s.title) + ' ' + String(s.topic)).toLowerCase();
      if (!t.includes(setupSearchQuery)) return false;
    }
    return true;
  });

  if (!filteredSets.length) {
    container.innerHTML = `
      <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 40px 20px;">
        <span style="font-size: 48px; display: block; margin-bottom: 12px;">📚</span>
        <h3 style="margin: 0 0 8px;">Không tìm thấy bộ đề bài học phù hợp</h3>
        <p class="mut" style="margin: 0;">Hãy thử tìm kiếm với từ khóa khác hoặc tạo thêm câu hỏi tại mục Thư viện.</p>
      </div>
    `;
    return;
  }

  // 3. Render Cards matching the user's reference image
  container.innerHTML = filteredSets.map((s, idx) => {
    const bg = SETUP_PALETTES[idx % SETUP_PALETTES.length];
    const qCount = Array.isArray(s.qs) ? s.qs.length : 0;
    const isSelected = selectedId && String(s.id) === String(selectedId);
    const blockInfo = (typeof getStudentBlockInfo === 'function') ? getStudentBlockInfo(s, 'quiz') : { blocked: false, isDeadlineExpired: false, hasSubmissions: false, message: '' };
    const attemptBadge = (typeof getSetAttemptBadgeHtml === 'function') ? getSetAttemptBadgeHtml(s, 'quiz') : '';
    const deadlineBadge = (typeof getSetDeadlineBadgeHtml === 'function') ? getSetDeadlineBadgeHtml(s, 'quiz') : '';
    const cardOnClick = blockInfo.blocked 
      ? (blockInfo.hasSubmissions ? `openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')` : `toast('${esc(blockInfo.message)}', 'bad')`) 
      : `selectAndStartSetupQuiz('${esc(s.id)}')`;

    return `
      <div class="setup-grid-card ${isSelected ? 'selected-card' : ''}" onclick="${cardOnClick}">
        <div class="setup-card-banner" style="background: ${bg};">
          <div class="setup-card-top-info">
            <span class="setup-card-count-pill">${qCount} câu</span>
          </div>
          <h3 class="setup-card-title">${esc(s.title)}</h3>
          <span class="setup-card-watermark">${s.emo || '📖'}</span>
        </div>
        <div class="setup-card-body">
          ${blockInfo.blocked ? (blockInfo.hasSubmissions ? `
            <button class="btn-setup-action lib-view-only-btn" type="button" onclick="event.stopPropagation(); openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')">
              <span class="btn-setup-icon"><ion-icon name="eye-outline"></ion-icon></span>
              <span>Xem lại bài làm</span>
            </button>
          ` : `
            <button class="btn-setup-action lib-locked-btn" type="button" onclick="event.stopPropagation(); toast('${esc(blockInfo.message)}', 'bad')" title="${esc(blockInfo.message)}">
              <span class="btn-setup-icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
              <span>${blockInfo.isDeadlineExpired ? 'Đã hết hạn' : 'Đã khóa'}</span>
            </button>
          `) : `
            <button class="btn-setup-action" type="button" onclick="event.stopPropagation(); selectAndStartSetupQuiz('${esc(s.id)}')">
              <span class="btn-setup-icon">▶</span>
              <span>Vào bài học</span>
            </button>
          `}
          ${(attemptBadge || deadlineBadge) ? `<div style="display:flex; flex-wrap:wrap; gap:4px; margin-top:8px;">${attemptBadge}${deadlineBadge}</div>` : ''}
          <div class="setup-card-meta">
            <span class="setup-card-topic" title="${esc(s.topic || 'Chưa phân loại')}">
              🏷️ ${esc(s.topic || 'Ngữ văn')}
            </span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function updateSetupQuestionCount() {
  const s = sets.find(x => x.id == $('#ss')?.value);
  const cntDisplay = $('#cnt-display');
  if (!cntDisplay) return;
  const count = s && Array.isArray(s.qs) ? s.qs.length : 0;
  cntDisplay.value = `${count} câu hỏi (Tự động theo bộ đề)`;
}

R.setup = id => {
  if (typeof Auth !== 'undefined' && !Auth.isLoggedIn()) {
    if (typeof go === 'function') go('home');
    if (typeof openLoginDialog === 'function') openLoginDialog();
    return;
  }
  const validSets = sets.filter(s => !String(s.id).startsWith('set_'));
  const ss = $('#ss');
  if (ss) {
    ss.innerHTML = validSets.map(s => `<option value="${s.id}" ${s.id == id ? 'selected' : ''}>${esc(s.title)} (${s.qs.length} câu)</option>`).join('');
    if (id) ss.value = id;
  }
  updateSetupQuestionCount();
  try {
    const savedNick = localStorage.getItem('vq_player_nick');
    const savedClass = localStorage.getItem('vq_player_class');
    if (savedNick && $('#nick') && !$('#nick').value) $('#nick').value = savedNick;
    if (savedClass && $('#class-name') && !$('#class-name').value) $('#class-name').value = savedClass;
  } catch (e) {}

  renderSetupSetsGrid(id);
};

function begin() {
  if (typeof Auth !== 'undefined' && !Auth.isLoggedIn()) {
    toast('Vui lòng đăng nhập tài khoản để vào làm bài!', 'bad');
    if (typeof openLoginDialog === 'function') openLoginDialog();
    return;
  }
  onPlayerInfoChange();
  const selectedId = $('#start-quiz-set-id')?.value || $('#ss')?.value;
  const s = sets.find(x => String(x.id) === String(selectedId)) || sets.find(x => x.id == $('#ss')?.value);
  const nm = ($('#nick')?.value || '').trim();
  if (!nm) return toast('Vui lòng nhập biệt danh!', 'bad');
  if (!s || !s.qs.length) return toast('Bộ câu hỏi này chưa có dữ liệu!', 'bad');

  if (typeof isStudentEntryBlocked === 'function' && isStudentEntryBlocked(s, 'quiz')) {
    const info = (typeof getStudentBlockInfo === 'function') ? getStudentBlockInfo(s, 'quiz') : { hasSubmissions: false, message: 'Bộ đề này đã khóa đối với bạn!' };
    toast(info.message, 'bad');
    if (info.hasSubmissions) {
      openHistoryForSet(s.id, s.title);
    }
    return;
  }
  if (s.qs.some(q => {
    if (q.type === 'tf') {
      ensureQuestionCompatibility(q);
      return !q.items || q.items.length !== 4 || q.items.some(it => typeof it.correct !== 'boolean');
    }
    return q.o && !Number.isInteger(q.a);
  })) {
    return toast('Hãy chọn đáp án đúng cho tất cả câu hỏi trong danh sách câu hỏi.', 'bad');
  }
  
  G = {
    s, m: 'quiz', nm,
    className: $('#class-name').value.trim(),
    qs: [...s.qs].sort(() => Math.random() - .5),
    i: 0, sc: 0, cb: 0, best: 0, ok: 0, bad: 0, no: 0, hp: 100, t0: Date.now(),
    log: [], sec: 0
  };
  go('game'); nextQ();
  if (window.__SECURITY_SHIELD && typeof window.__SECURITY_SHIELD.startExam === 'function') {
    window.__SECURITY_SHIELD.startExam('quiz');
  }
}

const opts = q => q.o || [];

function hud() {
  const scoreEl = $('#hs');
  const prevScore = parseInt(scoreEl.textContent) || 0;
  if (G.sc > prevScore) {
    scoreEl.classList.remove('score-pop');
    void scoreEl.offsetWidth;
    scoreEl.classList.add('score-pop');
  }
  scoreEl.textContent = G.sc;
  const comboEl = $('#hc').parentElement;
  $('#hc').textContent = G.cb;
  if (G.cb >= 3) comboEl.classList.add('combo-hot');
  else comboEl.classList.remove('combo-hot');
  $('#hp').textContent = (G.i + 1) + '/' + G.qs.length;
  $('#pb').style.width = (G.i / G.qs.length * 100) + '%';
  const bossEl = $('#boss');
  if (bossEl) bossEl.hidden = true;
}

function tick() {
  const timerEl = $('#ht');
  if (!timerEl) return;
  timerEl.textContent = '⏱ ' + G.tl + ' giây';
  timerEl.classList.toggle('timer-urgent', G.tl <= Math.ceil(G.sec * 0.25));
  timerEl.classList.toggle('timer-warning', G.tl > Math.ceil(G.sec * 0.25) && G.tl <= Math.ceil(G.sec * 0.5));
}

function advanceAfterFeedback() {
  clearTimeout(feedbackTimeout);
  clearInterval(feedbackCountdown);
  if ($('#feedback-dialog') && $('#feedback-dialog').open) $('#feedback-dialog').close();
  G.i++;
  nextQ();
}

// Global keydown handler
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeMobileMenu();
    return;
  }
  if (!G || G.lock) {
    if (event.key === 'Enter' && $('#feedback-dialog') && $('#feedback-dialog').open) {
      event.preventDefault();
      advanceAfterFeedback();
    }
    return;
  }
  const q = G.qs[G.i];
  if (!q) return;
  const key = event.key;
  if (q.o && ['1', '2', '3', '4'].includes(key)) {
    const idx = parseInt(key) - 1;
    const optButtons = document.querySelectorAll('#q .opt');
    if (optButtons[idx]) {
      event.preventDefault();
      pick(idx);
    }
  } else if (event.key === 'Enter' && (q.type === 'short' || q.type === 'fill')) {
    const input = $('#ans');
    if (input && document.activeElement === input) {
      event.preventDefault();
      sub();
    }
  }
});

function nextQ() {
  if (G.i >= G.qs.length) return end();
  clearTimeout(feedbackTimeout);
  clearInterval(feedbackCountdown);
  if ($('#feedback-dialog') && $('#feedback-dialog').open) $('#feedback-dialog').close();
  const q = G.qs[G.i]; G.lock = 0; $('#fb').innerHTML = ''; hud();
  
  let h = `<span class="tag">${q.type === 'tf' ? 'Đúng/Sai (4 ý)' : T_[q.type]}</span> <span class="tag">${q.d || 'Dễ'}</span>
    ${q.img ? `<br><img class="qi" src="${q.img}">` : ''}`;
  
  if (q.type === 'tf') {
    ensureQuestionCompatibility(q);
    G.tfAnswers = { 0: null, 1: null, 2: null, 3: null };

    if (q.passage) {
      h += `
        <div class="reading-passage-card">
          <div class="reading-passage-header">📜 Ngữ liệu đọc hiểu</div>
          <div class="reading-passage-body">${esc(q.passage)}</div>
        </div>`;
    }

    h += `<h2 style="margin:12px 0;">${esc(q.c || 'Phát biểu sau đây là đúng?')}</h2>`;

    h += `
      <div class="tf-game-card">
        <div class="tf-game-instruction">
          👉 <i>Hãy chọn <b>Đúng</b> hoặc <b>Sai</b> cho từng phát biểu dưới đây:</i>
        </div>
        <div class="tf-game-items" id="tf-game-items">
          ${q.items.map((it, idx) => `
            <div class="tf-game-row" id="tf-row-${idx}" data-idx="${idx}">
              <div class="tf-game-text">
                <span class="tf-game-letter">${'abcd'[idx]})</span>
                <span class="tf-game-desc">${esc(it.text)}</span>
              </div>
              <div class="tf-game-choice-btns">
                <button type="button" class="tf-choice-btn tf-btn-true" id="tf-btn-${idx}-true" onclick="chooseTf(${idx}, true)">
                  ✓ Đúng
                </button>
                <button type="button" class="tf-choice-btn tf-btn-false" id="tf-btn-${idx}-false" onclick="chooseTf(${idx}, false)">
                  ✗ Sai
                </button>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="tf-game-footer">
          <button id="tf-submit-btn" class="btn au" onclick="submitTf()" disabled>
            🔒 Vui lòng chọn Đúng / Sai cho cả 4 câu (0/4)
          </button>
        </div>
      </div>`;
  } else if (q.type == 'match') {
    G.sel = null; G.pr = {}; G.Rr = q.p.map((p, i) => i).sort(() => Math.random() - .5);
    h += `<h2 style="margin:12px 0;">${esc(q.c)}</h2>`;
    h += '<div class="mt"><div id="ml"></div><div id="mr"></div></div>';
  } else if (q.type == 'short' || q.type == 'fill') {
    h += `<h2 style="margin:12px 0;">${esc(q.c)}</h2>`;
    h += '<input id="ans" autocomplete="off" spellcheck="false" data-ms-editor="false" autocorrect="off" autocapitalize="off" oncontextmenu="return false;" placeholder="Nhập câu trả lời của bạn..." onkeydown="event.key==\'Enter\'&&sub()" onpaste="preventPasteCopy(event, \'paste\')" oncopy="preventPasteCopy(event, \'copy\')" oncut="preventPasteCopy(event, \'cut\')"><br><br><button class="btn au" onclick="sub()">Gửi đáp án</button>';
  } else {
    h += `<h2 style="margin:12px 0;">${esc(q.c)}</h2>`;
    h += opts(q).map((x, i) => `<button class="opt" onclick="pick(${i})"><b>${'ABCDEF'[i]}</b>${esc(x)}</button>`).join('');
  }
  
  $('#q').innerHTML = h;
  q.type == 'match' && mt();
  $('#ans')?.focus();

  const timerEl = $('#ht');
  if (timerEl) {
    timerEl.textContent = '⏱ ∞';
    timerEl.classList.remove('timer-urgent', 'timer-warning');
  }
}

function chooseTf(idx, val) {
  if (!G || G.lock || !G.tfAnswers) return;
  playSound('pop');
  G.tfAnswers[idx] = val;

  const row = $(`#tf-row-${idx}`);
  if (row) {
    const trueBtn = $(`#tf-btn-${idx}-true`);
    const falseBtn = $(`#tf-btn-${idx}-false`);
    trueBtn?.classList.toggle('selected', val === true);
    falseBtn?.classList.toggle('selected', val === false);
  }

  const answeredCount = [0, 1, 2, 3].filter(i => G.tfAnswers[i] !== null).length;
  const submitBtn = $('#tf-submit-btn');
  if (submitBtn) {
    if (answeredCount === 4) {
      submitBtn.disabled = false;
      submitBtn.textContent = '✓ Xác nhận & Nộp câu trả lời';
      submitBtn.classList.remove('au');
      submitBtn.classList.add('cy');
    } else {
      submitBtn.disabled = true;
      submitBtn.textContent = `🔒 Vui lòng chọn Đúng / Sai cho cả 4 câu (${answeredCount}/4)`;
      submitBtn.classList.add('au');
      submitBtn.classList.remove('cy');
    }
  }
}

function submitTf() {
  if (!G || G.lock || !G.tfAnswers) return;
  const answeredCount = [0, 1, 2, 3].filter(i => G.tfAnswers[i] !== null).length;
  if (answeredCount < 4) return toast('Vui lòng chọn Đúng / Sai cho cả 4 phát biểu!', 'bad');
  fin('tf', G.tfAnswers);
}

function mt() {
  const q = G.qs[G.i];
  $('#ml').innerHTML = q.p.map((p, i) => `<div class="mi" id="l${i}" onclick="ml(${i})">${esc(p[0])}</div>`).join('');
  $('#mr').innerHTML = G.Rr.map(j => `<div class="mi" id="r${j}" onclick="mr(${j})">${esc(q.p[j][1])}</div>`).join('');
}

function ml(i) { if (G.lock) return; playSound('pop'); G.sel = i; document.querySelectorAll('#ml .mi').forEach((e, idx) => e.classList.toggle('sel', idx == i)); }
function mr(j) {
  if (G.lock || G.sel === null) return;
  playSound('pop');
  G.pr[G.sel] = j;
  $(`#l${G.sel}`).classList.add('dn'); $(`#r${j}`).classList.add('dn');
  G.sel = null; document.querySelectorAll('#ml .mi').forEach(e => e.classList.remove('sel'));
  const q = G.qs[G.i];
  if (Object.keys(G.pr).length == q.p.length) fin(Object.entries(G.pr).every(([k, v]) => k == v) ? 1 : 0);
}

function pick(i) { fin(i == G.qs[G.i].a ? 1 : 0, i); }

function sub() {
  const answer = $('#ans').value.trim();
  fin('short', answer);
}

function fin(r, u) {
  if (G.lock) return; G.lock = 1; clearInterval(T);
  const q = G.qs[G.i]; let pts = 0, st;

  if (r === 'short') {
    const answer = u || '';
    const ans = (q.acc && q.acc.length) ? q.acc.join(' / ') : '';
    st = 'saved';
    pts = 0;
    playSound('pop');

    G.log.push({
      q,
      st: 'saved',
      pts: 0,
      submittedAnswer: answer || '(Chưa nhập)',
      correctAnswer: ans || 'Chờ giáo viên chấm / đối chiếu'
    });
    hud();

    const last = G.i + 1 >= G.qs.length;
    $('#fb').innerHTML = `
      <div style="font-size:20px; font-weight:800; color:var(--primary); margin-bottom:8px;">
        📝 Đã lưu câu trả lời tự luận!
      </div>
      <div style="background:var(--bg-base); border:2px dashed var(--stroke); border-radius:14px; padding:12px 16px; margin:12px 0; text-align:left;">
        <p style="margin:0 0 6px; font-size:14px;"><b>Câu hỏi:</b> ${esc(q.c)}</p>
        <p style="margin:0; font-size:14px; color:var(--primary);"><b>Câu trả lời của bạn:</b> <i>${esc(answer || '(Để trống)')}</i></p>
      </div>
      <p class="mut" style="font-size:13px; margin:8px 0;">
        ℹ️ Câu hỏi tự luận đã được lưu lại để giáo viên chấm điểm và đối chiếu sau (không chấm liền).
      </p>
      <div style="margin-top:16px;">
        <button class="btn au lg" style="width:100%; font-size:17px;" onclick="advanceAfterFeedback()">
          ${last ? '🏁 Hoàn thành bài làm' : 'Tiếp tục câu tiếp theo →'}
        </button>
      </div>`;
    $('#feedback-dialog').showModal();
    return;
  }

  if (r === 'tf') {
    let correctCount = 0;
    const details = [];
    q.items.forEach((it, idx) => {
      const userVal = G.tfAnswers ? G.tfAnswers[idx] : null;
      const isCorrect = userVal !== null && userVal === it.correct;
      if (isCorrect) correctCount++;
      const row = $(`#tf-row-${idx}`);
      if (row) {
        row.classList.add(isCorrect ? 'tf-row-correct' : 'tf-row-wrong');
        const badge = document.createElement('div');
        badge.className = `tf-result-badge ${isCorrect ? 'tf-badge-ok' : 'tf-badge-bad'}`;
        badge.innerHTML = isCorrect ? `✅ Đúng (+Đ/S)` : `❌ Sai (Đáp án đúng: <b>${it.correct ? 'ĐÚNG' : 'SAI'}</b>)`;
        row.appendChild(badge);
      }
      details.push({
        letter: 'abcd'[idx],
        text: it.text,
        userVal: userVal === true ? 'Đúng' : userVal === false ? 'Sai' : 'Chưa chọn',
        correctVal: it.correct ? 'Đúng' : 'Sai',
        isCorrect
      });
    });

    pts = correctCount === 4 ? 200 : correctCount === 3 ? 120 : correctCount === 2 ? 60 : correctCount === 1 ? 25 : 0;
    st = correctCount >= 3 ? 'ok' : 'bad';

    if (correctCount >= 3) {
      G.ok++; G.cb++; if (G.cb > G.best) G.best = G.cb;
      playSound('correct');
    } else {
      G.bad++; G.cb = 0;
      playSound('wrong');
    }
    G.sc += pts;

    const submittedSummary = `${correctCount}/4 ý đúng (${details.map(d => `${d.letter}: ${d.userVal}`).join(', ')})`;
    const correctSummary = details.map(d => `${d.letter}: ${d.correctVal}`).join(', ');

    G.log.push({ q, st, pts, submittedAnswer: submittedSummary, correctAnswer: correctSummary });
    hud();

    const last = G.i + 1 >= G.qs.length;
    $('#fb').innerHTML = `
      <div class="tf-modal-feedback">
        <div class="feedback-badge-row">
          <span class="tf-score-pill ${correctCount >= 3 ? 'ok' : 'bad'}">
            ${correctCount === 4 ? '🌟 Xuất sắc: 4/4 ý đúng!' : correctCount === 3 ? '👍 Tốt: 3/4 ý đúng' : `Cần cố gắng: ${correctCount}/4 ý đúng`}
          </span>
          <span class="feedback-points-tag">+${pts} điểm</span>
        </div>
        <div class="tf-modal-details-list">
          ${details.map(d => `
            <div class="tf-modal-detail-item ${d.isCorrect ? 'ok' : 'bad'}">
              <span><b>${d.letter})</b> ${esc(d.text)}</span>
              <span class="tf-modal-tag">${d.isCorrect ? '✅ Bạn chọn đúng' : `❌ Đáp án: <b>${d.correctVal}</b>`}</span>
            </div>
          `).join('')}
        </div>
        ${q.e ? `<div class="tf-modal-explanation"><b>Giải thích chi tiết:</b><br>${esc(q.e)}</div>` : ''}
        <button class="btn au lg" style="width:100%; font-size:17px; margin-top:14px;" onclick="advanceAfterFeedback()">
          ${last ? '🏁 Xem kết quả cuộc thi' : 'Tiếp tục câu tiếp theo →'}
        </button>
      </div>`;
    $('#feedback-dialog').showModal();
    return;
  }

  // MC or other question types
  if (r === 1) {
    pts = 100;
    st = 'ok'; G.ok++; G.cb++; if (G.cb > G.best) G.best = G.cb;
    playSound('correct');
  } else {
    st = 'bad'; G.bad++; G.cb = 0;
    playSound('wrong');
  }
  G.sc += pts;

  const ans = q.type == 'match'
    ? q.p.map(x => x[0] + ' ↔ ' + x[1]).join('; ')
    : (q.o ? `${'ABCD'[q.a]}. ${q.o[q.a]}` : (q.acc || []).join(' / '));
  const submittedAnswer = q.type == 'match'
    ? Object.entries(G.pr || {}).map(([k, v]) => `${q.p[k][0]} ↔ ${q.p[v][1]}`).join('; ')
    : (q.o ? (u !== null && u !== undefined && q.o[u] ? `${'ABCD'[u]}. ${q.o[u]}` : 'Chưa trả lời') : String(u || ''));

  G.log.push({ q, st, pts, submittedAnswer, correctAnswer: ans });
  hud();

  const b = document.querySelectorAll('#q .opt');
  if (b.length && q.a !== undefined) {
    b.forEach((x, idx) => {
      if (idx == q.a) x.classList.add('ok');
      if (idx == u && idx != q.a) x.classList.add('no');
    });
  }

  const last = G.i + 1 >= G.qs.length;
  $('#fb').innerHTML = `
    <div style="font-size:20px; font-weight:800; color:${st=='ok'?'var(--green)':'var(--red)'}">
      ${st=='ok' ? '🎉 Chính xác! +' + pts + ' điểm' : '❌ Chưa chính xác'}
    </div>
    ${st!='ok' ? `<p style="margin:10px 0;"><b>Đáp án đúng:</b> ${esc(ans)}</p>` : ''}
    ${q.e ? `<p class="mut" style="font-size:14px; margin:10px 0;"><b>Giải thích:</b> ${esc(q.e)}</p>` : ''}
    <div style="margin-top:16px;">
      <button class="btn au lg" style="width:100%; font-size:17px;" onclick="advanceAfterFeedback()">
        ${last ? '🏁 Xem kết quả' : 'Tiếp tục câu tiếp theo →'}
      </button>
    </div>`;
  $('#feedback-dialog').showModal();
}

async function end() {
  clearInterval(T); const n = G.log.length, dt = Math.round((Date.now() - G.t0) / 1000);
  if (window.__SECURITY_SHIELD && typeof window.__SECURITY_SHIELD.endExam === 'function') {
    window.__SECURITY_SHIELD.endExam(true);
  }
  go('res');
  $('#rt').textContent = '🎉 HOÀN THÀNH BÀI LÀM!';
  $('#rn').textContent = 'Người chơi: ' + G.nm + (G.className ? ' (' + G.className + ')' : '') + ' | ' + G.s.title;
  
  const savedCount = G.log.filter(x => x.st === 'saved').length;
  const gradedCount = G.log.filter(x => x.st !== 'saved').length;
  const accuracy = gradedCount ? Math.round(G.ok / gradedCount * 100) : 100;

  const statItems = [
    ['Tổng điểm TN', G.sc],
    ['Trả lời đúng', G.ok],
    ['Trả lời sai', G.bad]
  ];
  if (savedCount > 0) {
    statItems.push(['Tự luận đã lưu', `${savedCount} câu`]);
  }
  statItems.push(
    ['Độ chính xác TN', accuracy + '%'],
    ['Chuỗi đúng liên tiếp', G.best],
    ['Thời gian', dt + ' giây']
  );

  $('#rs').innerHTML = statItems.map(x => `<div class="card stat"><b>${x[1]}</b>${x[0]}</div>`).join('');

  $('#rv').innerHTML = G.log.map((l, idx) => {
    let icon = '❌';
    let tagCls = 'bad';
    let tagTxt = `+${l.pts}`;
    if (l.st === 'ok') {
      icon = '✅';
      tagCls = 'ok';
    } else if (l.st === 'saved') {
      icon = '📝';
      tagCls = 'cy';
      tagTxt = 'Tự luận đã lưu';
    } else if (l.st === 'no') {
      icon = '⏰';
      tagCls = 'gh';
      tagTxt = 'Bỏ qua';
    }

    return `
      <div class="row result-row-anim" style="animation-delay:${idx * 0.05}s">
        <div>
          <b>${icon} ${esc(l.q.c || l.q.text || '')}</b><br>
          <span class="mut"><b>Bạn trả lời:</b> ${esc(l.submittedAnswer || 'Chưa trả lời')}</span><br>
          ${l.st === 'saved' ? `
            <span class="mut" style="color:var(--primary);">ℹ️ <i>Câu hỏi tự luận đã lưu vào lịch sử bài làm để chấm/đối chiếu sau.</i></span>
            ${l.correctAnswer && l.correctAnswer !== 'Chờ giáo viên chấm / đối chiếu' ? `<br><span class="mut"><b>Đáp án tham khảo:</b> ${esc(l.correctAnswer)}</span>` : ''}
          ` : `
            <span class="mut"><b>Đáp án đúng:</b> ${esc(l.correctAnswer)}</span>
          `}
          ${l.q.e ? `<br><span class="mut"><b>Giải thích:</b> ${esc(l.q.e)}</span>` : ''}
        </div>
        <span class="tag ${tagCls}">${tagTxt}</span>
      </div>`;
  }).join('');

  // LƯU VÀO HỆ THỐNG LỊCH SỬ BÀI LÀM (LOCALSTORAGE)
  const historyEntry = {
    id: 'hist_' + uid(),
    timestamp: Date.now(),
    dateStr: new Date().toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }),
    type: 'quiz',
    playerName: G.nm,
    className: G.className || '',
    setId: String(G.s.id),
    setTitle: G.s.title,
    setTopic: G.s.topic || 'Chưa phân loại',
    setEmo: G.s.emo || '📖',
    score: G.sc,
    correctCount: G.ok,
    wrongCount: G.bad,
    savedShortCount: savedCount,
    totalQuestions: n,
    accuracy: accuracy,
    elapsedSeconds: dt,
    details: G.log.map(item => ({
      questionText: item.q.c || item.q.text || '',
      questionType: item.q.type,
      userAnswer: item.submittedAnswer || '',
      correctAnswer: item.correctAnswer || '',
      status: item.st,
      points: item.pts,
      explanation: item.q.e || ''
    }))
  };
  if (typeof saveQuizAttemptToHistory === 'function') {
    saveQuizAttemptToHistory(historyEntry);
  }

  G.scoreEntry = {
    id: uid(),
    player_name: G.nm,
    class_name: G.className || '',
    set_id: String(G.s.id),
    set_title: G.s.title,
    score: G.sc,
    correct_count: G.ok,
    question_count: Math.max(1, n),
    accuracy: accuracy,
    game_mode: G.m,
    elapsed_seconds: dt
  };
  await saveScoreToLeaderboard();
}

function replay() { go('setup', G.s.id); }
