/* =========================================================================
   7. QUESTION EDITOR & EMOJI PICKER
   ========================================================================= */

const EMOJIS = ['📖','📜','📚','✨','🌟','🚀','🎯',
'🏆','🎮','🐉','🥇','🔥','⚡','🌈','👑','🛡️','⚔️',
'🧠','💡','🔮','🇻🇳','💬','🌏','🌿','🍎','⚽','🎵',
'🦋','🐼','🐭','🙏','👋','💚','💛','💙','💯','🌞'];

function initEmojiPicker() {
  const picker = $('#emoji-picker');
  if (!picker) return;
  picker.innerHTML = EMOJIS.map(e =>
    `<button type="button" title="${e}" onclick="selectEmoji('${e}')">${e}</button>`
  ).join('');
}

function toggleEmojiPicker() {
  const picker = $('#emoji-picker');
  if (!picker) return;
  const isOpen = picker.classList.toggle('open');
  const btn = $('#emoji-trigger-btn');
  if (btn) btn.setAttribute('aria-expanded', String(isOpen));
}

function selectEmoji(emoji) {
  if (!CS) return;
  CS.emo = emoji;
  const currentEmo = $('#current-emo');
  if (currentEmo) currentEmo.textContent = emoji;
  $('#emoji-picker').classList.remove('open');
  save();
  toast(`Đã chọn biểu tượng ${emoji}`, 'ok');
}

// Close emoji picker when clicking outside
document.addEventListener('click', e => {
  const picker = $('#emoji-picker');
  if (!picker) return;
  const btn = $('#emoji-trigger-btn');
  if (!picker.contains(e.target) && (!btn || !btn.contains(e.target))) {
    picker.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }
});

function ensureQuestionCompatibility(question) {
  if (!question || question.type !== 'tf') return;
  if (!Array.isArray(question.items) || question.items.length !== 4) {
    question.items = [
      { text: question.c || 'Phát biểu nhận định a', correct: question.a === 0 },
      { text: 'Phát biểu nhận định b', correct: question.a !== 0 },
      { text: 'Phát biểu nhận định c', correct: question.a === 0 },
      { text: 'Phát biểu nhận định d', correct: question.a !== 0 }
    ];
  }
}

R.edit = id => {
  $('#lv').hidden = 1; $('#ev').hidden = 0;
  if (!sets.length) newSet();
  CS = sets.find(s => s.id == id) || CS || sets[0];
  $('#et').value = CS.title; $('#ec').value = CS.topic;
  const currentEmo = $('#current-emo');
  if (currentEmo) currentEmo.textContent = CS.emo || '📖';
  initEmojiPicker();
  $('#ty').innerHTML = Object.entries(T_).filter(([k]) => k !== 'img').map(([k, v]) => `<button class="tab ${k==ET?'on':''}" onclick="setT('${k}')">${v}</button>`).join('');
  resetForm(); renderQs();
};

function setT(t) {
  ET = t;
  document.querySelectorAll('#ty .tab').forEach((b, i) => b.classList.toggle('on', Object.keys(T_).filter(k => k !== 'img')[i] == t));
  document.querySelectorAll('[data-t]').forEach(el => {
    const ts = el.dataset.t.split(' ');
    el.hidden = !ts.includes(t);
  });
  if (t === 'tf') renderTfItemFields();
  if (t === 'mc' || t === 'img') renderOptionFields();
}

function resetForm() {
  EQ = null; $('#eh').textContent = 'Thêm câu hỏi mới'; $('#qsave').textContent = '💾 Thêm câu hỏi vào bộ';
  ['fc', 'fk', 'fp', 'fe', 'fs', 'tf-passage'].forEach(i => {
    const el = $('#' + i);
    if (el) el.value = '';
  });
  $('#fd').value = 'Dễ';
  $('#fi').hidden = 1; $('#fi').src = ''; IMG = null;
  const imageInput = document.querySelector('input[type="file"]');
  if (imageInput) imageInput.value = '';
  setT(ET);
}

function renderTfItemFields(items = null) {
  const container = $('#tf-items-editor');
  if (!container) return;
  const defaultItems = [
    { text: '', correct: true },
    { text: '', correct: false },
    { text: '', correct: true },
    { text: '', correct: false }
  ];
  const list = (items && Array.isArray(items) && items.length === 4) ? items : defaultItems;
  container.innerHTML = list.map((item, index) => {
    const isTrue = item.correct !== false;
    return `
      <div class="tf-editor-row" data-index="${index}">
        <span class="tf-letter-badge">${'abcd'[index]})</span>
        <input type="text" class="tf-item-text" value="${esc(item.text || '')}" placeholder="Nhập nội dung phát biểu ${'abcd'[index]}...">
        <div class="tf-switch-group">
          <button type="button" class="tf-switch-btn tf-switch-true ${isTrue ? 'active' : ''}" onclick="toggleTfEditorItem(${index}, true)">Đúng</button>
          <button type="button" class="tf-switch-btn tf-switch-false ${!isTrue ? 'active' : ''}" onclick="toggleTfEditorItem(${index}, false)">Sai</button>
        </div>
      </div>`;
  }).join('');
}

function toggleTfEditorItem(index, isTrue) {
  const row = document.querySelector(`.tf-editor-row[data-index="${index}"]`);
  if (!row) return;
  const trueBtn = row.querySelector('.tf-switch-true');
  const falseBtn = row.querySelector('.tf-switch-false');
  trueBtn.classList.toggle('active', isTrue);
  falseBtn.classList.toggle('active', !isTrue);
}

function renderOptionFields(options = ['', '', '', '']) {
  const values = Array.from({ length: 4 }, (_, index) => options[index] || '');
  $('#fo').innerHTML = values.map((value, index) => `
    <div class="option-row">
      <span class="option-letter">${'ABCD'[index]}</span>
      <input class="opt-in" placeholder="Phương án ${'ABCD'[index]}" value="${esc(value)}">
    </div>
  `).join('');
}

function pickImg(i) {
  const f = i.files[0];
  if (!f) return;
  if (f.size > 1.5 * 1024 * 1024) return toast('Kích thước ảnh phải nhỏ hơn 1.5MB!', 'bad');
  const r = new FileReader();
  r.onload = e => { IMG = e.target.result; $('#fi').src = IMG; $('#fi').hidden = 0; };
  r.readAsDataURL(f);
}

function renderQs() {
  const f = N($('#ef').value), l = CS.qs.map((q, i) => [q, i]).filter(([q]) => !f || N(q.c).includes(f));
  $('#en').textContent = CS.qs.length + ' câu';
  $('#el').innerHTML = l.length ? l.map(([q, i]) => {
    let extra = '';
    if (q.type === 'tf') {
      ensureQuestionCompatibility(q);
      const itemsHtml = q.items.map((it, itemIdx) => `
        <div class="tf-card-item-row">
          <span class="tf-card-letter">${'abcd'[itemIdx]})</span>
          <span class="tf-card-text">${esc(it.text || 'Chưa nhập nội dung')}</span>
          <div class="tf-card-badges">
            <button type="button" class="tf-quick-btn ${it.correct ? 'btn-is-true' : 'btn-dim'}" onclick="toggleTfQuickAnswer(${i}, ${itemIdx})" title="Bấm để đổi đáp án nhanh">${it.correct ? '✓ Đúng' : '✗ Sai'}</button>
          </div>
        </div>
      `).join('');
      extra = `
        ${q.passage ? `<div class="tf-card-passage">📜 <b>Ngữ liệu:</b> ${esc(q.passage)}</div>` : ''}
        <div class="tf-card-items-wrap">${itemsHtml}</div>
      `;
    } else if (q.o) {
      const options = q.o ? q.o : [];
      const answerIndex = Number(q.a);
      const correctAnswer = Number.isInteger(answerIndex) && answerIndex >= 0 && answerIndex < options.length ? options[answerIndex] : null;
      extra = `
        <div class="option-preview-list">
          ${options.map((option, optionIndex) => `
            <button type="button" class="option-chip ${optionIndex === answerIndex ? 'correct' : ''}" onclick="setCorrectAnswer(${i}, ${optionIndex})" title="Bấm để chọn đáp án đúng cho câu này">
              <b>${'ABCD'[optionIndex]}.</b> ${esc(option)}
            </button>
          `).join('')}
        </div>
        <div class="correct-answer-status ${correctAnswer ? 'is-set' : 'is-missing'}">
          ${correctAnswer ? `Đáp án đúng: ${'ABCD'[answerIndex]}. ${esc(correctAnswer)}` : 'Chưa chọn đáp án đúng cho câu này. Hãy bấm vào một phương án ở trên.'}
        </div>`;
    }
    return `
<div class="card item">
  <div class="hud" style="margin-bottom:8px;">
    <b>#${i+1} · ${q.type === 'tf' ? 'Đúng/Sai (4 ý)' : T_[q.type]}</b>
    <span class="tag">${q.d || 'Dễ'}</span>
    <button class="btn gh sm" style="margin-left:auto;" onclick="qact(${i},'up')" ${i==0?'disabled':''}>↑</button>
    <button class="btn gh sm" onclick="qact(${i},'dn')" ${i==CS.qs.length-1?'disabled':''}>↓</button>
    <button class="btn gh sm" onclick="qact(${i},'ed')">Sửa</button>
    <button class="btn gh sm" onclick="qact(${i},'dl')">Xóa</button>
  </div>
  <div>${esc(q.c)}</div>
  ${q.img ? `<img class="qi" src="${q.img}">` : ''}
  ${extra}
  ${q.e ? `<div class="mut" style="font-size:12px; margin-top:6px;">💡 ${esc(q.e)}</div>` : ''}
</div>`;
  }).join('') : '<p class="mut">Chưa có câu hỏi nào. Dùng form bên phải để thêm câu hỏi đầu tiên!</p>';
}

function toggleTfQuickAnswer(questionIndex, itemIndex) {
  const q = CS.qs[questionIndex];
  if (!q || q.type !== 'tf') return;
  ensureQuestionCompatibility(q);
  q.items[itemIndex].correct = !q.items[itemIndex].correct;
  save();
  renderQs();
  toast(`Đã đổi phát biểu ${'abcd'[itemIndex]} thành ${q.items[itemIndex].correct ? 'ĐÚNG' : 'SAI'}`, 'ok');
}

function setCorrectAnswer(questionIndex, answerIndex) {
  const question = CS.qs[questionIndex];
  if (!question || !question.o || answerIndex < 0 || answerIndex >= question.o.length) return;
  question.a = answerIndex;
  save();
  renderQs();
  toast(`Đã chọn đáp án đúng: ${'ABCD'[answerIndex]}`, 'ok');
}

function qact(i, a) {
  const L = CS.qs, q = L[i];
  if (a == 'dl') {
    ask('Xóa câu hỏi này?', () => { L.splice(i, 1); save(); renderQs(); });
  } else if (a == 'up' && i > 0) {
    [L[i], L[i-1]] = [L[i-1], L[i]]; save(); renderQs();
  } else if (a == 'dn' && i < L.length - 1) {
    [L[i], L[i+1]] = [L[i+1], L[i]]; save(); renderQs();
  } else if (a == 'ed') {
    EQ = q; $('#eh').textContent = 'Sửa câu hỏi #' + (i + 1); $('#qsave').textContent = '💾 Cập nhật câu hỏi';
    $('#fc').value = q.c; $('#fe').value = q.e || ''; $('#fd').value = q.d || 'Dễ'; $('#fs').value = q.s || '';
    if (q.img) { $('#fi').src = q.img; $('#fi').hidden = 0; IMG = q.img; }
    setT(q.type);
    if (q.type == 'tf') {
      ensureQuestionCompatibility(q);
      $('#tf-passage').value = q.passage || '';
      renderTfItemFields(q.items);
    } else if (q.o) {
      renderOptionFields(q.o);
    } else if (q.acc) {
      $('#fk').value = q.acc.join(' | ');
    } else if (q.p) {
      $('#fp').value = q.p.map(x => x[0] + ' | ' + x[1]).join('\n');
    }
  }
}

function saveQ() {
  const t = ET;
  let c = $('#fc').value.trim();
  if (t === 'tf' && !c) {
    c = 'Phát biểu sau đây là đúng?';
  }
  if (!c) return toast('Vui lòng nhập nội dung câu hỏi!', 'bad');
  const wasEditing = Boolean(EQ);
  const q = { id: EQ?.id || uid(), type: t, c, e: $('#fe').value.trim(), d: $('#fd').value, s: $('#fs').value.trim() };
  if (IMG) q.img = IMG;
  if (t == 'mc' || t == 'img') {
    const optionInputs = [...document.querySelectorAll('#fo .opt-in')];
    const options = optionInputs.map(input => input.value.trim());
    if (options.some(option => !option)) return toast('Vui lòng nhập đầy đủ cả 4 phương án trắc nghiệm!', 'bad');
    q.o = options;
    q.a = Number.isInteger(EQ?.a) && EQ.a >= 0 && EQ.a < 4 ? EQ.a : null;
  } else if (t == 'tf') {
    const passage = $('#tf-passage') ? $('#tf-passage').value.trim() : '';
    const itemRows = document.querySelectorAll('.tf-editor-row');
    const items = [];
    let hasEmpty = false;
    itemRows.forEach(row => {
      const text = row.querySelector('.tf-item-text').value.trim();
      const isTrue = row.querySelector('.tf-switch-true').classList.contains('active');
      if (!text) hasEmpty = true;
      items.push({ text, correct: isTrue });
    });
    if (items.length !== 4 || hasEmpty) {
      return toast('Vui lòng nhập đầy đủ nội dung cho cả 4 phát biểu a, b, c, d!', 'bad');
    }
    q.passage = passage;
    q.items = items;
  } else if (t == 'short' || t == 'fill') {
    const k = $('#fk').value.trim();
    if (!k) return toast('Vui lòng nhập ít nhất một đáp án chấp nhận!', 'bad');
    q.acc = k.split('|').map(x => x.trim()).filter(Boolean);
  } else if (t == 'match') {
    const p = lines($('#fp').value).map(l => l.split('|').map(x => x.trim())).filter(x => x.length == 2 && x[0] && x[1]);
    if (p.length < 2) return toast('Cần ít nhất 2 cặp ghép nối hợp lệ!', 'bad');
    q.p = p;
  }
  if (EQ) {
    const idx = CS.qs.findIndex(x => x.id == q.id);
    if (idx != -1) CS.qs[idx] = q;
  } else {
    CS.qs.push(q);
  }
  save(); resetForm(); renderQs();
  toast(wasEditing ? 'Đã cập nhật câu hỏi!' : (t === 'mc' || t === 'img' ? 'Đã thêm câu hỏi! Hãy chọn đáp án đúng ở danh sách bên dưới.' : 'Đã thêm câu hỏi!'), 'ok');
}
