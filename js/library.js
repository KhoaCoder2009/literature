/* =========================================================================
   5. LIBRARY & QUESTION SETS MANAGEMENT
   ========================================================================= */

let currentTopicFilter = '';

const cardHtml = s => {
  const qCount = s.qs.length;
  const mcCount = s.qs.filter(q => q.type === 'mc' || q.type === 'img').length;
  const shortCount = s.qs.filter(q => q.type === 'short' || q.type === 'fill').length;
  const tfCount = s.qs.filter(q => q.type === 'tf').length;
  const matchCount = s.qs.filter(q => q.type === 'match').length;
  const statParts = [];
  if (mcCount) statParts.push(`📝 ${mcCount} trắc nghiệm`);
  if (shortCount) statParts.push(`✏️ ${shortCount} tự luận`);
  if (tfCount) statParts.push(`✅ ${tfCount} đúng/sai`);
  if (matchCount) statParts.push(`🔗 ${matchCount} nối cặp`);
  return `
<div class="card set ${bulkDeleteMode ? `bulk-selectable${selectedSetIds.has(String(s.id)) ? ' selected' : ''}` : ''}" onclick="toggleSetFromCard(event, '${esc(s.id)}')">
  ${bulkDeleteMode ? `<label class="set-select"><input type="checkbox" data-set-id="${esc(s.id)}" ${selectedSetIds.has(String(s.id)) ? 'checked' : ''} onchange="toggleSetSelection(this)"> Chọn xóa</label>` : ''}
  <div class="cov">${s.emo || '📜'}</div>
  <h3>${esc(s.title)}</h3>
  <span class="tag clickable-topic-tag" title="Nhấp để lọc theo thẻ: ${esc(s.topic || 'Chưa phân loại')}" onclick="event.stopPropagation(); setTopicFilter('${esc(s.topic || 'Chưa phân loại')}')">🏷️ ${esc(s.topic || 'Chưa phân loại')}</span>
  <div class="card-stats">${qCount} câu hỏi${statParts.length ? ' · ' + statParts.join(' · ') : ''}</div>
  <div class="ac" style="flex-wrap:wrap; margin-top:12px;">
    <button class="btn au sm" onclick="go('setup','${s.id}')">🎮 Ôn tập</button>
    <button class="btn gh sm" onclick="go('edit','${s.id}')">✏️ Sửa</button>
    <button class="btn gh sm" onclick="dup('${s.id}')">📋 Sao chép</button>
    <button class="btn gh sm" onclick="del('${s.id}')">🗑️ Xóa</button>
  </div>
</div>`;
};

function setTopicFilter(topic) {
  topic = String(topic || '').trim();
  if (currentTopicFilter.toLowerCase() === topic.toLowerCase()) {
    currentTopicFilter = ''; // toggle off back to all
  } else {
    currentTopicFilter = topic;
  }
  R.lib();
}

function onLibSearchInput() {
  const input = $('#lf');
  const clearBtn = $('#lf-clear');
  if (clearBtn && input) {
    clearBtn.hidden = !input.value.trim();
  }
  R.lib();
}

function clearLibSearch() {
  const input = $('#lf');
  if (input) input.value = '';
  const clearBtn = $('#lf-clear');
  if (clearBtn) clearBtn.hidden = true;
  R.lib();
  input?.focus();
}

function renderTopicChips(allSets, filteredSets) {
  const container = $('#topic-chips-bar');
  if (!container) return;

  const topicCounts = {};
  allSets.forEach(s => {
    const t = (s.topic && s.topic.trim()) ? s.topic.trim() : 'Chưa phân loại';
    topicCounts[t] = (topicCounts[t] || 0) + 1;
  });

  const uniqueTopics = Object.keys(topicCounts).sort((a, b) => {
    if (a === 'Chưa phân loại') return 1;
    if (b === 'Chưa phân loại') return -1;
    return a.localeCompare(b, 'vi');
  });

  let chipsHtml = `
    <button type="button" class="topic-chip ${!currentTopicFilter ? 'active' : ''}" onclick="setTopicFilter('')" role="tab" aria-selected="${!currentTopicFilter}">
      <span>🏷️ Tất cả</span>
      <span class="topic-chip-count">${allSets.length}</span>
    </button>
  `;

  uniqueTopics.forEach(top => {
    const isActive = currentTopicFilter && currentTopicFilter.toLowerCase() === top.toLowerCase();
    const count = topicCounts[top];
    chipsHtml += `
      <button type="button" class="topic-chip ${isActive ? 'active' : ''}" onclick="setTopicFilter('${esc(top)}')" role="tab" aria-selected="${isActive}">
        <span>${esc(top)}</span>
        <span class="topic-chip-count">${count}</span>
      </button>
    `;
  });

  container.innerHTML = chipsHtml;

  const summary = $('#topic-filter-summary');
  if (summary) {
    if (currentTopicFilter) {
      summary.innerHTML = `Đang chọn: <b>${esc(currentTopicFilter)}</b> (${filteredSets.length}/${allSets.length} bộ) · <a href="javascript:void(0)" onclick="setTopicFilter('')" style="color:var(--yellow); text-decoration:underline; font-weight:800;">✕ Xem tất cả</a>`;
    } else {
      summary.textContent = `Tổng cộng: ${allSets.length} bộ câu hỏi`;
    }
  }
}

R.lib = () => {
  $('#lv').hidden = 0; $('#ev').hidden = 1;
  const input = $('#lf');
  const f = input ? N(input.value) : '';
  const clearBtn = $('#lf-clear');
  if (clearBtn && input) clearBtn.hidden = !input.value.trim();

  const l = sets.filter(s => {
    const topic = (s.topic && s.topic.trim()) ? s.topic.trim() : 'Chưa phân loại';
    const matchTopic = !currentTopicFilter || topic.toLowerCase() === currentTopicFilter.toLowerCase();
    const matchText = !f || N(s.title + ' ' + (s.topic || '')).includes(f);
    return matchTopic && matchText;
  });

  renderTopicChips(sets, l);

  if (l.length) {
    $('#lg').innerHTML = l.map(cardHtml).join('');
  } else {
    $('#lg').innerHTML = `
      <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 42px 24px;">
        <div style="font-size: 42px; margin-bottom: 12px;">🔍</div>
        <h3 style="margin-bottom: 8px;">Không tìm thấy bộ câu hỏi nào</h3>
        <p style="color: var(--mut); margin-bottom: 18px; max-width: 480px; margin-left: auto; margin-right: auto;">
          ${currentTopicFilter ? `Không có bộ câu hỏi nào thuộc thẻ "<b>${esc(currentTopicFilter)}</b>"${f ? ` với từ khóa "<b>${esc(input.value)}</b>"` : ''}.` : `Không tìm thấy bộ câu hỏi nào khớp với từ khóa "<b>${esc(input ? input.value : '')}</b>".`}
        </p>
        <button class="btn au sm" onclick="clearLibSearch(); setTopicFilter('');">🔄 Hiển thị tất cả bộ câu hỏi</button>
      </div>`;
  }
  updateBulkDeleteButton();
};

function updateBulkDeleteButton() {
  selectedSetIds.forEach(id => {
    if (!sets.some(set => String(set.id) === id)) selectedSetIds.delete(id);
  });
  $('#bulk-delete-start').hidden = bulkDeleteMode;
  $('#bulk-delete-actions').hidden = !bulkDeleteMode;
  const button = $('#bulk-delete');
  button.textContent = `🗑️ Xóa đã chọn (${selectedSetIds.size})`;
  button.disabled = selectedSetIds.size === 0;
}

function enableBulkDeleteMode() {
  bulkDeleteMode = true;
  R.lib();
}

function cancelBulkDeleteMode() {
  bulkDeleteMode = false;
  selectedSetIds.clear();
  R.lib();
}

function toggleSetSelection(checkbox) {
  const id = String(checkbox.dataset.setId);
  setSetSelected(id, checkbox.checked);
}

function toggleSetFromCard(event, id) {
  if (!bulkDeleteMode || event.target.closest('button, input, label')) return;
  const checkbox = event.currentTarget.querySelector('.set-select input');
  setSetSelected(id, !selectedSetIds.has(String(id)));
  checkbox.checked = selectedSetIds.has(String(id));
}

function setSetSelected(id, selected) {
  id = String(id);
  if (selected) selectedSetIds.add(id);
  else selectedSetIds.delete(id);
  const card = document.querySelector(`.set-select input[data-set-id="${CSS.escape(id)}"]`)?.closest('.set');
  if (card) card.classList.toggle('selected', selected);
  updateBulkDeleteButton();
}

function deleteSelectedSets() {
  const ids = new Set(selectedSetIds);
  if (!ids.size) return;
  ask(`Bạn có chắc chắn muốn xóa ${ids.size} bộ câu hỏi đã chọn?`, async () => {
    const results = await archiveQuestionSets([...ids]);
    const deletedIds = new Set(results.filter(result => !result.error).map(result => result.id));
    sets = sets.filter(set => !deletedIds.has(String(set.id)));
    selectedSetIds.clear();
    bulkDeleteMode = false;
    if (deletedIds.size) save();
    R.lib();
    const failed = results.filter(result => result.error);
    if (failed.length) {
      failed.forEach(result => console.error(`Could not delete question set ${result.id}:`, result.error));
      toast(`Đã xóa ${deletedIds.size}/${ids.size} bộ. ${failed.length} bộ chưa xóa được; hãy thử lại.`, 'bad');
    } else {
      toast(`Đã xóa ${deletedIds.size} bộ câu hỏi.`, 'ok');
    }
  });
}

function newSet() {
  const s = { id: uid(), emo: '📖', title: 'Bộ câu hỏi mới', topic: '', qs: [] };
  sets.unshift(s); save(); go('edit', s.id);
}

function dup(id) {
  const s = sets.find(x => x.id == id);
  if (!s) return;
  sets.unshift({ ...JSON.parse(JSON.stringify(s)), id: uid(), title: s.title + ' (Bản sao)' });
  save(); R.lib(); toast('Đã sao chép bộ câu hỏi!', 'ok');
}

function del(id) {
  ask('Bạn có chắc chắn muốn xóa bộ câu hỏi này?', async () => {
    const [result] = await archiveQuestionSets([id]);
    if (result.error) {
      console.error(`Could not delete question set ${result.id}:`, result.error);
      toast('Không xóa được bộ câu hỏi đã lưu trên máy chủ; hãy thử lại.', 'bad');
      return;
    }
    sets = sets.filter(x => String(x.id) !== String(id));
    selectedSetIds.delete(String(id));
    save(); R.lib();
    toast('Đã xóa bộ câu hỏi.', 'ok');
  });
}

function meta() {
  if (!CS) return;
  CS.title = $('#et').value;
  CS.topic = $('#ec').value;
  save();
}

function renderHomeSets() {
  const container = $('#home-sets-container');
  if (!container) return;
  
  const validSets = (sets || []).filter(s => !String(s.id).startsWith('set_'));
  
  if (!validSets.length) {
    container.innerHTML = `
      <div class="empty-sets-card">
        <span class="empty-icon">📖</span>
        <h3 style="margin:8px 0;">Chưa có bộ câu hỏi nào</h3>
        <p class="mut" style="margin:0 0 16px;">Hãy tạo bộ câu hỏi đầu tiên của bạn để bắt đầu ôn tập!</p>
        <button class="btn au" onclick="newSet()">+ Tạo bộ đề ngay</button>
      </div>`;
    return;
  }

  const colorClasses = ['set-card-coral', 'set-card-emerald', 'set-card-violet', 'set-card-amber', 'set-card-cyan'];
  
  container.innerHTML = validSets.slice(0, 8).map((s, idx) => {
    const qCount = s.qs ? s.qs.length : 0;
    const mcCount = s.qs ? s.qs.filter(q => q.type === 'mc' || q.type === 'img').length : 0;
    const shortCount = s.qs ? s.qs.filter(q => q.type === 'short' || q.type === 'fill').length : 0;
    const tfCount = s.qs ? s.qs.filter(q => q.type === 'tf').length : 0;
    const matchCount = s.qs ? s.qs.filter(q => q.type === 'match').length : 0;
    
    const parts = [];
    if (mcCount) parts.push(`${mcCount} trắc nghiệm`);
    if (shortCount) parts.push(`${shortCount} tự luận`);
    if (tfCount) parts.push(`${tfCount} đúng/sai`);
    if (matchCount) parts.push(`${matchCount} nối`);
    const details = parts.length ? parts.join(' · ') : 'Chưa có câu hỏi';
    
    const colorClass = colorClasses[idx % colorClasses.length];
    
    return `
      <div class="cartoon-set-card ${colorClass}" onclick="startSetStudy('${esc(s.id)}')">
        <div class="set-card-glow"></div>
        <div class="set-card-top">
          <span class="set-card-emoji">${s.emo || '📖'}</span>
          <span class="set-card-tag">🏷️ ${esc(s.topic || 'Chưa phân loại')}</span>
        </div>
        <h3 class="set-card-title">${esc(s.title)}</h3>
        <p class="set-card-meta">📝 <b>${qCount}</b> câu hỏi (${details})</p>
        <div class="set-card-footer">
          <span class="set-card-btn">🚀 Ôn tập ngay →</span>
        </div>
      </div>
    `;
  }).join('');
}

function startSetStudy(id) {
  if (!id) return;
  const s = sets.find(x => String(x.id) === String(id));
  if (!s) return;
  go('setup', s.id);
}
