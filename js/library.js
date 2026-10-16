/* =========================================================================
   5. LIBRARY & QUESTION SETS MANAGEMENT
   ========================================================================= */

let currentLibTab = 'lessons';
let currentTopicFilter = '';
let currentLibReadingTopic = '';
let currentLibWritingTopic = '';
let libReadingSearchQuery = '';
let libWritingSearchQuery = '';

const LIB_CARD_PALETTES = [
  'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)', // 1. Red / Coral
  'linear-gradient(135deg, #fb923c 0%, #ea580c 100%)', // 2. Orange
  'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', // 3. Amber / Gold
  'linear-gradient(135deg, #10b981 0%, #059669 100%)', // 4. Emerald
  'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)', // 5. Lime
  'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)', // 6. Teal
  'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', // 7. Navy Blue
  'linear-gradient(135deg, #3b82f6 0%, #0284c7 100%)', // 8. Medium Blue
  'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)'  // 9. Cyan
];

const cardHtml = (s, idx = 0) => {
  const bg = LIB_CARD_PALETTES[idx % LIB_CARD_PALETTES.length];
  const qList = Array.isArray(s.qs) ? s.qs : [];
  const qCount = qList.length;
  const mcCount = qList.filter(q => q.type === 'mc' || q.type === 'img').length;
  const shortCount = qList.filter(q => q.type === 'short' || q.type === 'fill').length;
  const tfCount = qList.filter(q => q.type === 'tf').length;
  const matchCount = qList.filter(q => q.type === 'match').length;

  const easyCount = qList.filter(q => q.diff === 'Dễ').length;
  const medCount = qList.filter(q => q.diff === 'Trung bình').length;
  const hardCount = qList.filter(q => q.diff === 'Khó').length;

  const topicName = (s.topic && s.topic.trim()) ? s.topic.trim() : 'Chưa phân loại';

  const blockInfo = (typeof getStudentBlockInfo === 'function') ? getStudentBlockInfo(s, 'quiz') : { blocked: false, isDeadlineExpired: false, isNotYetOpen: false, hasSubmissions: false, message: '' };
  const isBlocked = blockInfo.blocked;
  const attemptBadge = (typeof getSetAttemptBadgeHtml === 'function') ? getSetAttemptBadgeHtml(s, 'quiz') : '';
  const deadlineBadge = (typeof getSetDeadlineBadgeHtml === 'function') ? getSetDeadlineBadgeHtml(s, 'quiz') : '';
  const privacyBadge = (typeof getSetPrivacyBadgeHtml === 'function') ? getSetPrivacyBadgeHtml(s, 'quiz') : '';
  const openAtBadge = (typeof getSetOpenAtBadgeHtml === 'function') ? getSetOpenAtBadgeHtml(s, 'quiz') : '';

  const pills = [];
  if (attemptBadge) pills.push(attemptBadge);
  if (deadlineBadge) pills.push(deadlineBadge);
  if (mcCount) pills.push(`<span class="lib-pill pill-mc"><ion-icon name="list-outline"></ion-icon> ${mcCount} trắc nghiệm</span>`);
  if (shortCount) pills.push(`<span class="lib-pill pill-short"><ion-icon name="create-outline"></ion-icon> ${shortCount} tự luận</span>`);
  if (tfCount) pills.push(`<span class="lib-pill pill-tf"><ion-icon name="checkmark-circle-outline"></ion-icon> ${tfCount} đúng/sai</span>`);
  if (matchCount) pills.push(`<span class="lib-pill pill-match"><ion-icon name="link-outline"></ion-icon> ${matchCount} nối cặp</span>`);
  if (!pills.length) pills.push(`<span class="lib-pill pill-empty"><ion-icon name="alert-circle-outline"></ion-icon> Chưa có câu hỏi</span>`);

  let diffSummary = '';
  if (easyCount || medCount || hardCount) {
    const parts = [];
    if (easyCount) parts.push(`🟢 ${easyCount} dễ`);
    if (medCount) parts.push(`🟡 ${medCount} TB`);
    if (hardCount) parts.push(`🔴 ${hardCount} khó`);
    diffSummary = `<span class="lib-diff-summary" title="Phân bố độ khó">${parts.join(' · ')}</span>`;
  }

  const isSelected = selectedSetIds.has(String(s.id));
  const canEdit = !window.Auth || window.Auth.canEditContent();
  const isTeacherOrAdmin = window.Auth && (window.Auth.isTeacher() || window.Auth.isAdmin());
  const cardOnClick = bulkDeleteMode 
    ? `toggleSetFromCard(event, '${esc(s.id)}')`
    : (canEdit 
        ? `go('edit', '${esc(s.id)}')` 
        : (isBlocked 
            ? (blockInfo.hasSubmissions ? `openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')` : `toast('${esc(blockInfo.message)}', 'bad')`) 
            : `go('setup', '${esc(s.id)}')`));

  return `
<div class="setup-grid-card lib-detailed-card set ${bulkDeleteMode ? 'bulk-selectable' : ''}${isSelected ? ' selected' : ''}" onclick="${cardOnClick}">
  <div class="setup-card-banner lib-card-banner" style="background: ${bg};">
    <div class="setup-card-top-info" style="display:flex; justify-content:space-between; align-items:center; width:100%; gap:6px;">
      ${bulkDeleteMode ? `<label class="set-select lib-set-select" onclick="event.stopPropagation()"><input type="checkbox" data-set-id="${esc(s.id)}" ${isSelected ? 'checked' : ''} onchange="toggleSetSelection(this)"> Chọn xóa</label>` : ''}
      <span class="setup-card-count-pill">${qCount} câu hỏi</span>
      ${openAtBadge ? `<div onclick="event.stopPropagation()">${openAtBadge}</div>` : ''}
    </div>
    <h3 class="setup-card-title">${esc(s.title)}</h3>
    <span class="setup-card-watermark"><ion-icon name="book-outline"></ion-icon></span>
  </div>

  <div class="lib-card-details">
    <div class="lib-card-meta-row">
      <span class="clickable-topic-tag" title="Nhấp để lọc theo thẻ: ${esc(topicName)}" onclick="event.stopPropagation(); setTopicFilter('${esc(topicName)}')"><ion-icon name="pricetag-outline"></ion-icon> ${esc(topicName)}</span>
      ${diffSummary}
    ${(privacyBadge || attemptBadge || deadlineBadge) ? `
      <div class="lib-card-badges-row" onclick="event.stopPropagation()">
        ${privacyBadge}${attemptBadge}${deadlineBadge}
      </div>
    ` : ''}

    <div class="lib-card-breakdown">
      ${pills.join('')}
    </div>
  </div>

  <div class="lib-card-actions-box">
    <div class="lib-launch-row">
      ${isBlocked ? (blockInfo.hasSubmissions ? `
        <button class="btn-setup-action lib-launch-btn lib-view-only-btn" type="button" onclick="event.stopPropagation(); openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')">
          <span class="btn-setup-icon"><ion-icon name="eye-outline"></ion-icon></span>
          <span>Xem lại bài làm</span>
        </button>
      ` : `
        <button class="btn-setup-action lib-launch-btn lib-locked-btn" type="button" onclick="event.stopPropagation(); toast('${esc(blockInfo.message)}', 'bad')" title="${esc(blockInfo.message)}">
          <span class="btn-setup-icon"><ion-icon name="${blockInfo.isNotYetOpen ? 'time-outline' : 'lock-closed-outline'}"></ion-icon></span>
          <span>${blockInfo.isNotYetOpen ? 'Chưa mở' : (blockInfo.isDeadlineExpired ? 'Đã hết hạn' : 'Đã khóa')}</span>
        </button>
      `) : `
        <button class="btn-setup-action lib-launch-btn" type="button" onclick="event.stopPropagation(); go('setup', '${esc(s.id)}')">
          <span class="btn-setup-icon"><ion-icon name="play-outline"></ion-icon></span>
          <span>Vào học bài ngay</span>
        </button>
      `}
    </div>

    ${(canEdit || isTeacherOrAdmin) ? `
      <div class="lib-tools-row">
        ${canEdit ? `<button class="lib-mini-tool-btn cy btn-edit-set" type="button" onclick="event.stopPropagation(); go('edit','${esc(s.id)}')" title="Sửa nội dung câu hỏi"><ion-icon name="create-outline"></ion-icon> <span>Sửa</span></button>` : ''}
        <button class="lib-mini-tool-btn gh" type="button" onclick="event.stopPropagation(); openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')" title="Xem lịch sử làm bài của bộ đề này"><ion-icon name="time-outline"></ion-icon> <span>Lịch sử</span></button>
        ${isTeacherOrAdmin ? `<button class="lib-mini-tool-btn au" type="button" onclick="event.stopPropagation(); openSetAttemptLimitModal('quiz', '${esc(s.id)}')" title="Cài đặt số lượt & hạn nộp bài"><ion-icon name="timer-outline"></ion-icon> <span>Lượt &amp; Hạn</span></button>` : ''}
        ${canEdit ? `<button class="lib-mini-tool-btn no btn-delete-set" type="button" onclick="event.stopPropagation(); del('${esc(s.id)}')" title="Xóa bộ đề"><ion-icon name="trash-outline"></ion-icon> <span>Xóa</span></button>` : ''}
      </div>
    ` : `
      <div class="lib-tools-row">
        <button class="lib-mini-tool-btn gh" type="button" onclick="event.stopPropagation(); openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')" title="Xem lịch sử bài làm của bạn" style="width:100%;">
          <ion-icon name="time-outline"></ion-icon> <span>Xem lịch sử của bạn</span>
        </button>
      </div>
    `}
  </div>
</div>`;
};

const readingLibCardHtml = (s, idx = 0) => {
  const bg = LIB_CARD_PALETTES[idx % LIB_CARD_PALETTES.length];
  const qList = Array.isArray(s.questions) ? s.questions : [];
  const qCount = qList.length;
  const topic = (s.genre || s.category || 'Đọc hiểu').trim();
  const author = (s.author || '').trim() || 'Khuyết danh';

  const nbCount = qList.filter(q => q.level === 'nhan-biet' || (q.levelName && q.levelName.includes('Nhận biết'))).length;
  const thCount = qList.filter(q => q.level === 'thong-hieu' || (q.levelName && q.levelName.includes('Thông hiểu'))).length;
  const vdCount = qList.filter(q => q.level === 'van-dung' || (q.levelName && q.levelName.includes('Vận dụng'))).length;

  const blockInfo = (typeof getStudentBlockInfo === 'function') ? getStudentBlockInfo(s, 'reading') : { blocked: false, isDeadlineExpired: false, isNotYetOpen: false, hasSubmissions: false, message: '' };
  const isBlocked = blockInfo.blocked;
  const attemptBadge = (typeof getSetAttemptBadgeHtml === 'function') ? getSetAttemptBadgeHtml(s, 'reading') : '';
  const deadlineBadge = (typeof getSetDeadlineBadgeHtml === 'function') ? getSetDeadlineBadgeHtml(s, 'reading') : '';
  const privacyBadge = (typeof getSetPrivacyBadgeHtml === 'function') ? getSetPrivacyBadgeHtml(s, 'reading') : '';
  const openAtBadge = (typeof getSetOpenAtBadgeHtml === 'function') ? getSetOpenAtBadgeHtml(s, 'reading') : '';

  const pills = [];
  if (attemptBadge) pills.push(attemptBadge);
  if (deadlineBadge) pills.push(deadlineBadge);
  if (nbCount) pills.push(`<span class="lib-pill pill-nb">🟢 ${nbCount} Nhận biết</span>`);
  if (thCount) pills.push(`<span class="lib-pill pill-th">🟡 ${thCount} Thông hiểu</span>`);
  if (vdCount) pills.push(`<span class="lib-pill pill-vd">🔴 ${vdCount} Vận dụng</span>`);
  if (!pills.length) pills.push(`<span class="lib-pill pill-empty"><ion-icon name="document-text-outline"></ion-icon> ${qCount} câu hỏi đọc hiểu</span>`);

  const passageSnippet = (s.passage || '').trim().replace(/\r?\n+/g, ' / ');
  const canEdit = !window.Auth || window.Auth.canEditContent();
  const isTeacherOrAdmin = window.Auth && (window.Auth.isTeacher() || window.Auth.isAdmin());
  const cardOnClick = canEdit 
    ? `openEditReadingSetModal('${esc(s.id)}')` 
    : (isBlocked 
        ? (blockInfo.hasSubmissions ? `openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')` : `toast('${esc(blockInfo.message)}', 'bad')`) 
        : `go('reading', '${esc(s.id)}')`);

  return `
<div class="setup-grid-card lib-detailed-card" onclick="${cardOnClick}">
  <div class="setup-card-banner lib-card-banner" style="background: ${bg};">
    <div class="setup-card-top-info" style="display:flex; justify-content:space-between; align-items:center; width:100%; gap:6px;">
      <span class="setup-card-count-pill">${qCount} câu hỏi</span>
      ${openAtBadge ? `<div onclick="event.stopPropagation()">${openAtBadge}</div>` : (s.status === 'draft' ? '<span class="lib-pill pill-draft" style="color:var(--amber); border-color:var(--amber);"><ion-icon name="document-text-outline"></ion-icon> Bản nháp</span>' : '')}
    </div>
    <h3 class="setup-card-title">${esc(s.title)}</h3>
    <span class="setup-card-watermark"><ion-icon name="document-text-outline"></ion-icon></span>
  </div>

  <div class="lib-card-details">
    <div class="lib-card-meta-row">
      <span class="clickable-topic-tag" title="Nhấp để lọc theo chủ đề: ${esc(topic)}" onclick="event.stopPropagation(); setLibReadingTopicFilter('${esc(topic)}')"><ion-icon name="pricetag-outline"></ion-icon> ${esc(topic)}</span>
      <span class="lib-meta-author" title="Tác giả"><ion-icon name="person-outline"></ion-icon> ${esc(author)}</span>
    </div>

    ${(privacyBadge || attemptBadge || deadlineBadge) ? `
      <div class="lib-card-badges-row" onclick="event.stopPropagation()">
        ${privacyBadge}${attemptBadge}${deadlineBadge}
      </div>
    ` : ''}

    <div class="lib-card-breakdown">
      ${pills.join('')}
    </div>

    ${passageSnippet ? `
      <div class="lib-card-preview-box lib-quote-box" title="${esc(passageSnippet)}">
        <span class="lib-quote-icon">“</span>${esc(passageSnippet.slice(0, 95))}${passageSnippet.length > 95 ? '…' : ''}
      </div>
    ` : `
      <div class="lib-card-preview-box mut">
        <span>Chưa có nội dung ngữ liệu trích đoạn.</span>
      </div>
    `}
  </div>

  <div class="lib-card-actions-box">
    <div class="lib-launch-row">
      ${isBlocked ? (blockInfo.hasSubmissions ? `
        <button class="btn-setup-action lib-launch-btn lib-view-only-btn" type="button" onclick="event.stopPropagation(); openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')">
          <span class="btn-setup-icon"><ion-icon name="eye-outline"></ion-icon></span>
          <span>Xem lại bài làm</span>
        </button>
      ` : `
        <button class="btn-setup-action lib-launch-btn lib-locked-btn" type="button" onclick="event.stopPropagation(); toast('${esc(blockInfo.message)}', 'bad')" title="${esc(blockInfo.message)}">
          <span class="btn-setup-icon"><ion-icon name="${blockInfo.isNotYetOpen ? 'time-outline' : 'lock-closed-outline'}"></ion-icon></span>
          <span>${blockInfo.isNotYetOpen ? 'Chưa mở' : (blockInfo.isDeadlineExpired ? 'Đã hết hạn' : 'Đã khóa')}</span>
        </button>
      `) : `
        <button class="btn-setup-action lib-launch-btn" type="button" onclick="event.stopPropagation(); go('reading', '${esc(s.id)}')">
          <span class="btn-setup-icon"><ion-icon name="play-outline"></ion-icon></span>
          <span>Đọc hiểu</span>
        </button>
      `}
    </div>

    ${(canEdit || isTeacherOrAdmin) ? `
      <div class="lib-tools-row">
        ${canEdit ? `<button class="lib-mini-tool-btn cy btn-edit-set" type="button" onclick="event.stopPropagation(); openEditReadingSetModal('${esc(s.id)}')" title="Sửa thông tin đề đọc hiểu"><ion-icon name="create-outline"></ion-icon> <span>Sửa</span></button>` : ''}
        <button class="lib-mini-tool-btn gh" type="button" onclick="event.stopPropagation(); openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')" title="Xem lịch sử làm bài"><ion-icon name="time-outline"></ion-icon> <span>Lịch sử</span></button>
        ${isTeacherOrAdmin ? `<button class="lib-mini-tool-btn au" type="button" onclick="event.stopPropagation(); openSetAttemptLimitModal('reading', '${esc(s.id)}')" title="Cài đặt số lượt & hạn nộp bài"><ion-icon name="timer-outline"></ion-icon> <span>Lượt &amp; Hạn</span></button>` : ''}
        ${canEdit ? `<button class="lib-mini-tool-btn no btn-delete-set" type="button" onclick="event.stopPropagation(); deleteReadingSet('${esc(s.id)}'); R.lib();" title="Xóa đề đọc hiểu"><ion-icon name="trash-outline"></ion-icon> <span>Xóa</span></button>` : ''}
      </div>
    ` : `
      <div class="lib-tools-row">
        <button class="lib-mini-tool-btn gh" type="button" onclick="event.stopPropagation(); openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')" title="Xem lịch sử bài làm của bạn" style="width:100%;">
          <ion-icon name="time-outline"></ion-icon> <span>Xem lịch sử của bạn</span>
        </button>
      </div>
    `}
  </div>
</div>`;
};

const writingLibCardHtml = (s, idx = 0) => {
  const bg = LIB_CARD_PALETTES[idx % LIB_CARD_PALETTES.length];
  const secList = Array.isArray(s.sections) ? s.sections : [];
  const secCount = secList.length;
  const topic = (s.categoryName || s.category || 'Luyện viết').trim();
  const promptSnippet = (s.prompt || '').trim();

  const blockInfo = (typeof getStudentBlockInfo === 'function') ? getStudentBlockInfo(s, 'writing') : { blocked: false, isDeadlineExpired: false, isNotYetOpen: false, hasSubmissions: false, message: '' };
  const isBlocked = blockInfo.blocked;
  const attemptBadge = (typeof getSetAttemptBadgeHtml === 'function') ? getSetAttemptBadgeHtml(s, 'writing') : '';
  const deadlineBadge = (typeof getSetDeadlineBadgeHtml === 'function') ? getSetDeadlineBadgeHtml(s, 'writing') : '';
  const privacyBadge = (typeof getSetPrivacyBadgeHtml === 'function') ? getSetPrivacyBadgeHtml(s, 'writing') : '';
  const openAtBadge = (typeof getSetOpenAtBadgeHtml === 'function') ? getSetOpenAtBadgeHtml(s, 'writing') : '';

  const outlineStepsHtml = secList.length ? `
    <div class="lib-outline-stepper">
      ${secList.map((sec, i) => `<span class="lib-step-pill">${i === 0 ? '🟢' : i === 1 ? '🟡' : '🔴'} ${esc(sec.title || 'Phần ' + (i+1))}</span>`).join('<span class="lib-step-arrow">→</span>')}
    </div>
  ` : `<span class="lib-pill pill-empty"><ion-icon name="create-outline"></ion-icon> ${secCount} phần dàn ý</span>`;

  const canEdit = !window.Auth || window.Auth.canEditContent();
  const isTeacherOrAdmin = window.Auth && (window.Auth.isTeacher() || window.Auth.isAdmin());
  const cardOnClick = canEdit 
    ? `editWritingSet('${esc(s.id)}')` 
    : (isBlocked 
        ? (blockInfo.hasSubmissions ? `openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')` : `toast('${esc(blockInfo.message)}', 'bad')`) 
        : `go('writing', '${esc(s.id)}')`);

  return `
<div class="setup-grid-card lib-detailed-card" onclick="${cardOnClick}">
  <div class="setup-card-banner lib-card-banner" style="background: ${bg};">
    <div class="setup-card-top-info" style="display:flex; justify-content:space-between; align-items:center; width:100%; gap:6px;">
      <span class="setup-card-count-pill">${secCount} phần câu hỏi</span>
      ${openAtBadge ? `<div onclick="event.stopPropagation()">${openAtBadge}</div>` : (s.status === 'draft' ? '<span class="lib-pill pill-draft" style="color:var(--amber); border-color:var(--amber);"><ion-icon name="document-text-outline"></ion-icon> Bản nháp</span>' : '')}
    </div>
    <h3 class="setup-card-title">${esc(s.title)}</h3>
    <span class="setup-card-watermark"><ion-icon name="create-outline"></ion-icon></span>
  </div>

  <div class="lib-card-details">
    <div class="lib-card-meta-row">
      <span class="clickable-topic-tag" title="Nhấp để lọc theo chủ đề: ${esc(topic)}" onclick="event.stopPropagation(); setLibWritingTopicFilter('${esc(topic)}')"><ion-icon name="pricetag-outline"></ion-icon> ${esc(topic)}</span>
      <span class="lib-meta-note"><ion-icon name="document-text-outline"></ion-icon> Dàn ý chuẩn</span>
    </div>

    ${(privacyBadge || attemptBadge || deadlineBadge) ? `
      <div class="lib-card-badges-row" onclick="event.stopPropagation()">
        ${privacyBadge}${attemptBadge}${deadlineBadge}
      </div>
    ` : ''}

    <div class="lib-card-breakdown">
      ${outlineStepsHtml}
    </div>

    ${promptSnippet ? `
      <div class="lib-card-preview-box lib-prompt-box" title="${esc(promptSnippet)}">
        <span class="lib-preview-lead">Đề bài:</span> ${esc(promptSnippet.slice(0, 95))}${promptSnippet.length > 95 ? '…' : ''}
      </div>
    ` : `
      <div class="lib-card-preview-box mut">
        <span>Chưa có nội dung đề bài và dàn ý.</span>
      </div>
    `}
  </div>

  <div class="lib-card-actions-box">
    <div class="lib-launch-row">
      ${isBlocked ? (blockInfo.hasSubmissions ? `
        <button class="btn-setup-action lib-launch-btn lib-view-only-btn" type="button" onclick="event.stopPropagation(); openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')">
          <span class="btn-setup-icon"><ion-icon name="eye-outline"></ion-icon></span>
          <span>Xem lại bài làm</span>
        </button>
      ` : `
        <button class="btn-setup-action lib-launch-btn lib-locked-btn" type="button" onclick="event.stopPropagation(); toast('${esc(blockInfo.message)}', 'bad')" title="${esc(blockInfo.message)}">
          <span class="btn-setup-icon"><ion-icon name="${blockInfo.isNotYetOpen ? 'time-outline' : 'lock-closed-outline'}"></ion-icon></span>
          <span>${blockInfo.isNotYetOpen ? 'Chưa mở' : (blockInfo.isDeadlineExpired ? 'Đã hết hạn' : 'Đã khóa')}</span>
        </button>
      `) : `
        <button class="btn-setup-action lib-launch-btn" type="button" onclick="event.stopPropagation(); go('writing', '${esc(s.id)}')">
          <span class="btn-setup-icon"><ion-icon name="play-outline"></ion-icon></span>
          <span>Luyện viết ngay</span>
        </button>
      `}
    </div>

    ${(canEdit || isTeacherOrAdmin) ? `
      <div class="lib-tools-row">
        ${canEdit ? `<button class="lib-mini-tool-btn cy btn-edit-set" type="button" onclick="event.stopPropagation(); editWritingSet('${esc(s.id)}')" title="Sửa đề và dàn ý"><ion-icon name="create-outline"></ion-icon> <span>Sửa</span></button>` : ''}
        <button class="lib-mini-tool-btn gh" type="button" onclick="event.stopPropagation(); openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')" title="Xem lịch sử làm bài"><ion-icon name="time-outline"></ion-icon> <span>Lịch sử</span></button>
        ${isTeacherOrAdmin ? `<button class="lib-mini-tool-btn au" type="button" onclick="event.stopPropagation(); openSetAttemptLimitModal('writing', '${esc(s.id)}')" title="Cài đặt số lượt & hạn nộp bài"><ion-icon name="timer-outline"></ion-icon> <span>Lượt &amp; Hạn</span></button>` : ''}
        ${canEdit ? `<button class="lib-mini-tool-btn no btn-delete-set" type="button" onclick="event.stopPropagation(); deleteWritingSet('${esc(s.id)}'); setTimeout(() => R.lib(), 100);" title="Xóa đề"><ion-icon name="trash-outline"></ion-icon> <span>Xóa</span></button>` : ''}
      </div>
    ` : `
      <div class="lib-tools-row">
        <button class="lib-mini-tool-btn gh" type="button" onclick="event.stopPropagation(); openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')" title="Xem lịch sử bài làm của bạn" style="width:100%;">
          <ion-icon name="time-outline"></ion-icon> <span>Xem lịch sử của bạn</span>
        </button>
      </div>
    `}
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
      <span><ion-icon name="pricetag-outline"></ion-icon> Tất cả</span>
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
  updateLibTabsUI();

  if (currentLibTab === 'reading') {
    renderLibReadingPane();
    return;
  }
  if (currentLibTab === 'writing') {
    renderLibWritingPane();
    return;
  }

  // LESSONS PANE
  const input = $('#lf');
  const f = input ? N(input.value) : '';
  const clearBtn = $('#lf-clear');
  if (clearBtn && input) clearBtn.hidden = !input.value.trim();

  const isStudent = Boolean(window.Auth && window.Auth.isStudent());
  const l = sets.filter(s => {
    if (isStudent && s.privacy === 'private') return false;
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
        <div style="font-size: 42px; margin-bottom: 12px; color: var(--mut);"><ion-icon name="search-outline"></ion-icon></div>
        <h3 style="margin-bottom: 8px;">Không tìm thấy bộ bài học nào</h3>
        <p style="color: var(--mut); margin-bottom: 18px; max-width: 480px; margin-left: auto; margin-right: auto;">
          ${currentTopicFilter ? `Không có bộ bài học nào thuộc thẻ "<b>${esc(currentTopicFilter)}</b>"${f ? ` với từ khóa "<b>${esc(input.value)}</b>"` : ''}.` : `Không tìm thấy bộ bài học nào khớp với từ khóa "<b>${esc(input ? input.value : '')}</b>".`}
        </p>
        <button class="btn au sm" onclick="clearLibSearch(); setTopicFilter('');"><ion-icon name="refresh-outline"></ion-icon> Hiển thị tất cả bộ bài học</button>
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
  if (window.Auth && !window.Auth.canEditContent()) {
    return toast('Học sinh không có quyền xóa bộ đề!', 'bad');
  }
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
  if (window.Auth && !window.Auth.canEditContent()) {
    return toast('Học sinh không có quyền tạo bộ đề mới! Vui lòng đăng nhập tài khoản Giáo viên.', 'bad');
  }
  const s = { id: uid(), emo: '📖', title: 'Bộ câu hỏi mới', topic: '', qs: [] };
  sets.unshift(s); save(); go('edit', s.id);
}

function dup(id) {
  if (window.Auth && !window.Auth.canEditContent()) {
    return toast('Học sinh không có quyền sao chép bộ đề! Vui lòng đăng nhập tài khoản Giáo viên.', 'bad');
  }
  const s = sets.find(x => x.id == id);
  if (!s) return;
  sets.unshift({ ...JSON.parse(JSON.stringify(s)), id: uid(), title: s.title + ' (Bản sao)' });
  save(); R.lib(); toast('Đã sao chép bộ câu hỏi!', 'ok');
}

function del(id) {
  if (window.Auth && !window.Auth.canEditContent()) {
    return toast('Học sinh không có quyền xóa bộ đề! Vui lòng đăng nhập tài khoản Giáo viên.', 'bad');
  }
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
  const limitInp = $('#set-max-attempts');
  if (limitInp) {
    const lim = Math.max(0, parseInt(limitInp.value, 10) || 0);
    CS.maxAttempts = lim;
    if (typeof getSetAttemptLimitsMap === 'function' && typeof saveSetAttemptLimitsMap === 'function') {
      const map = getSetAttemptLimitsMap();
      map[String(CS.id)] = lim;
      saveSetAttemptLimitsMap(map);
    }
  }
  const deadlineInp = $('#set-deadline');
  if (deadlineInp) {
    const dl = (deadlineInp.value || '').trim();
    CS.deadline = dl;
    if (typeof getSetDeadlinesMap === 'function' && typeof saveSetDeadlinesMap === 'function') {
      const dMap = getSetDeadlinesMap();
      if (dl) dMap[String(CS.id)] = dl;
      else delete dMap[String(CS.id)];
      saveSetDeadlinesMap(dMap);
    }
  }
  const privacyInp = $('#set-privacy');
  if (privacyInp) {
    const priv = (privacyInp.value || 'public').trim();
    CS.privacy = priv;
    if (typeof getSetPrivacyMap === 'function' && typeof saveSetPrivacyMap === 'function') {
      const pMap = getSetPrivacyMap();
      pMap[String(CS.id)] = priv;
      saveSetPrivacyMap(pMap);
    }
  }
  const openAtInp = $('#set-open-at');
  if (openAtInp) {
    const oa = (openAtInp.value || '').trim();
    CS.openAt = oa;
    if (typeof getSetOpenAtMap === 'function' && typeof saveSetOpenAtMap === 'function') {
      const oMap = getSetOpenAtMap();
      if (oa) oMap[String(CS.id)] = oa;
      else delete oMap[String(CS.id)];
      saveSetOpenAtMap(oMap);
    }
  }
  save();
}

function renderHomeSets() {
  const container = $('#home-sets-container');
  if (!container) return;
  
  const isStudent = (typeof Auth !== 'undefined' && Auth.isStudent());
  const validSets = (sets || []).filter(s => {
    if (String(s.id).startsWith('set_')) return false;
    if (isStudent && typeof isSetPrivate === 'function' && isSetPrivate(s, 'quiz')) return false;
    return true;
  });
  
  if (!validSets.length) {
    container.innerHTML = `
      <div class="empty-sets-card">
        <span class="empty-icon"><ion-icon name="book-outline"></ion-icon></span>
        <h3 style="margin:8px 0;">Chưa có bộ câu hỏi nào</h3>
        <p class="mut" style="margin:0 0 16px;">Hãy tạo bộ câu hỏi đầu tiên của bạn để bắt đầu ôn tập!</p>
        <button class="btn au" onclick="newSet()"><ion-icon name="add-outline"></ion-icon> Tạo bộ đề ngay</button>
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
    
    const blockInfo = (typeof getStudentBlockInfo === 'function') ? getStudentBlockInfo(s, 'quiz') : { blocked: false, isDeadlineExpired: false, isNotYetOpen: false, hasSubmissions: false, message: '' };
    const attemptBadge = (typeof getSetAttemptBadgeHtml === 'function') ? getSetAttemptBadgeHtml(s, 'quiz') : '';
    const deadlineBadge = (typeof getSetDeadlineBadgeHtml === 'function') ? getSetDeadlineBadgeHtml(s, 'quiz') : '';
    const privacyBadge = (typeof getSetPrivacyBadgeHtml === 'function') ? getSetPrivacyBadgeHtml(s, 'quiz') : '';
    const openAtBadge = (typeof getSetOpenAtBadgeHtml === 'function') ? getSetOpenAtBadgeHtml(s, 'quiz') : '';

    return `
      <div class="cartoon-set-card ${colorClass}" onclick="startSetStudy('${esc(s.id)}')">
        <div class="set-card-glow"></div>
        <div class="set-card-top">
          <span class="set-card-emoji"><ion-icon name="book-outline"></ion-icon></span>
          <span class="set-card-tag"><ion-icon name="pricetag-outline"></ion-icon> ${esc(s.topic || 'Chưa phân loại')}</span>
        </div>
        <h3 class="set-card-title">${esc(s.title)}</h3>
        <p class="set-card-meta"><ion-icon name="document-text-outline"></ion-icon> <b>${qCount}</b> câu hỏi (${details})</p>
        ${(privacyBadge || openAtBadge || attemptBadge || deadlineBadge) ? `<div style="display:flex; flex-wrap:wrap; gap:6px; margin:6px 0 10px;" onclick="event.stopPropagation()">${privacyBadge}${openAtBadge}${attemptBadge}${deadlineBadge}</div>` : ''}
        <div class="set-card-footer">
          ${blockInfo.blocked 
            ? (blockInfo.hasSubmissions 
                ? `<span class="set-card-btn" style="background:#475569;"><ion-icon name="eye-outline"></ion-icon> Xem lại bài làm →</span>`
                : `<span class="set-card-btn" style="background:#94a3b8;"><ion-icon name="${blockInfo.isNotYetOpen ? 'time-outline' : 'lock-closed-outline'}"></ion-icon> ${blockInfo.isNotYetOpen ? 'Chưa mở' : (blockInfo.isDeadlineExpired ? 'Đã hết hạn nộp' : 'Đã khóa')}</span>`)
            : `<span class="set-card-btn"><ion-icon name="play-outline"></ion-icon> Vào bài học ngay →</span>`}
        </div>
      </div>
    `;
  }).join('');
}

function startSetStudy(id) {
  if (!id) return;
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
  go('setup', s.id);
}

/* =========================================================================
   LIBRARY 3-TAB SWITCHER & PANE RENDERERS (BÀI HỌC, ĐỌC HIỂU, VIẾT)
   ========================================================================= */

function switchLibTab(tab) {
  currentLibTab = tab;
  try { sessionStorage.setItem('vq_lib_tab', tab); } catch (e) {}
  updateLibTabsUI();
  R.lib();
}

function updateLibTabsUI() {
  try {
    const saved = sessionStorage.getItem('vq_lib_tab');
    if (saved && ['lessons', 'reading', 'writing'].includes(saved)) {
      currentLibTab = saved;
    }
  } catch (e) {}

  document.querySelectorAll('.lib-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === currentLibTab);
  });
  document.querySelectorAll('.lib-tab-pane').forEach(pane => {
    pane.classList.toggle('active', pane.id === `lib-pane-${currentLibTab}`);
  });

  // 1. Lessons Badge
  const validLessonSets = (sets || []).filter(s => !String(s.id).startsWith('set_'));
  const lessonBadge = $('#lib-lessons-badge');
  if (lessonBadge) lessonBadge.textContent = validLessonSets.length;

  // 2. Reading Badge
  if (typeof readingSets === 'undefined' || !readingSets.length) {
    if (typeof loadReadingData === 'function') loadReadingData();
  }
  const readingBadge = $('#lib-reading-badge');
  if (readingBadge && typeof readingSets !== 'undefined') {
    readingBadge.textContent = readingSets.length;
  }

  // 3. Writing Badge
  if (typeof writingSets === 'undefined' || !writingSets.length) {
    if (typeof loadWritingSets === 'function') loadWritingSets();
  }
  const writingBadge = $('#lib-writing-badge');
  if (writingBadge && typeof writingSets !== 'undefined') {
    writingBadge.textContent = writingSets.length;
  }
}

// --- READING PANE LOGIC ---
function onLibReadingSearchInput() {
  libReadingSearchQuery = ($('#lib-reading-search')?.value || '').trim().toLowerCase();
  renderLibReadingPane();
}

function setLibReadingTopicFilter(top) {
  top = String(top || '').trim();
  currentLibReadingTopic = currentLibReadingTopic.toLowerCase() === top.toLowerCase() ? '' : top;
  renderLibReadingPane();
}

function renderLibReadingPane() {
  if (typeof loadReadingData === 'function' && (!readingSets || !readingSets.length)) {
    loadReadingData();
  }
  const container = $('#lib-reading-grid');
  const chipsBar = $('#lib-reading-chips-bar');
  const summaryEl = $('#lib-reading-topic-summary');
  if (!container) return;

  const allSets = Array.isArray(readingSets) ? readingSets : [];

  // Render Topic Chips
  if (chipsBar) {
    const catMap = new Map();
    allSets.forEach(s => {
      const c = (s.genre || s.category || 'Chưa phân loại').trim();
      catMap.set(c, (catMap.get(c) || 0) + 1);
    });

    const isAll = !currentLibReadingTopic;
    let chipsHtml = `
      <button class="topic-chip ${isAll ? 'active' : ''}" type="button" onclick="setLibReadingTopicFilter('')">
        <span>Tất cả</span> <span class="topic-chip-count">${allSets.length}</span>
      </button>
    `;
    catMap.forEach((count, cat) => {
      const isActive = currentLibReadingTopic.toLowerCase() === cat.toLowerCase();
      chipsHtml += `
        <button class="topic-chip ${isActive ? 'active' : ''}" type="button" onclick="setLibReadingTopicFilter('${esc(cat)}')">
          <span>${esc(cat)}</span> <span class="topic-chip-count">${count}</span>
        </button>
      `;
    });
    chipsBar.innerHTML = chipsHtml;
    if (summaryEl) {
      summaryEl.textContent = isAll ? `Tổng cộng: ${allSets.length} đề` : `Đang lọc: "${currentLibReadingTopic}"`;
    }
  }

  // Filter Sets
  const isStudent = Boolean(window.Auth && window.Auth.isStudent());
  const filtered = allSets.filter(s => {
    if (isStudent && s.status === 'draft') return false;
    if (isStudent && s.privacy === 'private') return false;
    const top = (s.genre || s.category || 'Chưa phân loại').trim();
    if (currentLibReadingTopic && top.toLowerCase() !== currentLibReadingTopic.toLowerCase()) {
      return false;
    }
    if (libReadingSearchQuery) {
      const hay = (String(s.title) + ' ' + String(s.author) + ' ' + String(s.genre) + ' ' + String(s.category)).toLowerCase();
      if (!hay.includes(libReadingSearchQuery)) return false;
    }
    return true;
  });

  if (!filtered.length) {
    container.innerHTML = `
      <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 42px 24px;">
        <div style="font-size: 42px; margin-bottom: 12px; color: var(--mut);"><ion-icon name="document-text-outline"></ion-icon></div>
        <h3 style="margin-bottom: 8px;">Không tìm thấy đề đọc hiểu nào</h3>
        <p style="color: var(--mut); margin-bottom: 18px;">Hãy thử tìm kiếm với từ khóa khác hoặc tạo thêm đề đọc hiểu mới.</p>
        <button class="btn au sm" onclick="openCreateReadingSetModal()"><ion-icon name="add-outline"></ion-icon> Thêm đề đọc hiểu mới</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((s, idx) => readingLibCardHtml(s, idx)).join('');
}

// --- WRITING PANE LOGIC ---
function onLibWritingSearchInput() {
  libWritingSearchQuery = ($('#lib-writing-search')?.value || '').trim().toLowerCase();
  renderLibWritingPane();
}

function setLibWritingTopicFilter(top) {
  top = String(top || '').trim();
  currentLibWritingTopic = currentLibWritingTopic.toLowerCase() === top.toLowerCase() ? '' : top;
  renderLibWritingPane();
}

function renderLibWritingPane() {
  if (typeof loadWritingSets === 'function' && (!writingSets || !writingSets.length)) {
    loadWritingSets();
  }
  const container = $('#lib-writing-grid');
  const chipsBar = $('#lib-writing-chips-bar');
  const summaryEl = $('#lib-writing-topic-summary');
  if (!container) return;

  const allSets = Array.isArray(writingSets) ? writingSets : [];

  // Render Topic Chips
  if (chipsBar) {
    const catMap = new Map();
    allSets.forEach(s => {
      const c = (s.categoryName || s.category || 'Chưa phân loại').trim();
      catMap.set(c, (catMap.get(c) || 0) + 1);
    });

    const isAll = !currentLibWritingTopic;
    let chipsHtml = `
      <button class="topic-chip ${isAll ? 'active' : ''}" type="button" onclick="setLibWritingTopicFilter('')">
        <span>Tất cả</span> <span class="topic-chip-count">${allSets.length}</span>
      </button>
    `;
    catMap.forEach((count, cat) => {
      const isActive = currentLibWritingTopic.toLowerCase() === cat.toLowerCase();
      chipsHtml += `
        <button class="topic-chip ${isActive ? 'active' : ''}" type="button" onclick="setLibWritingTopicFilter('${esc(cat)}')">
          <span>${esc(cat)}</span> <span class="topic-chip-count">${count}</span>
        </button>
      `;
    });
    chipsBar.innerHTML = chipsHtml;
    if (summaryEl) {
      summaryEl.textContent = isAll ? `Tổng cộng: ${allSets.length} đề` : `Đang lọc: "${currentLibWritingTopic}"`;
    }
  }

  // Filter Sets
  const isStudent = Boolean(window.Auth && window.Auth.isStudent());
  const filtered = allSets.filter(s => {
    if (isStudent && s.status === 'draft') return false;
    if (isStudent && s.privacy === 'private') return false;
    const top = (s.categoryName || s.category || 'Chưa phân loại').trim();
    if (currentLibWritingTopic && top.toLowerCase() !== currentLibWritingTopic.toLowerCase()) {
      return false;
    }
    if (libWritingSearchQuery) {
      const hay = (String(s.title) + ' ' + String(s.categoryName) + ' ' + String(s.prompt)).toLowerCase();
      if (!hay.includes(libWritingSearchQuery)) return false;
    }
    return true;
  });

  if (!filtered.length) {
    container.innerHTML = `
      <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 42px 24px;">
        <div style="font-size: 42px; margin-bottom: 12px; color: var(--mut);"><ion-icon name="create-outline"></ion-icon></div>
        <h3 style="margin-bottom: 8px;">Không tìm thấy đề viết nào</h3>
        <p style="color: var(--mut); margin-bottom: 18px;">Hãy thử tìm kiếm với từ khóa khác hoặc tạo thêm đề luyện viết mới.</p>
        <button class="btn au sm" onclick="openCreateWritingSetModal()"><ion-icon name="add-outline"></ion-icon> Thêm đề viết mới</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((s, idx) => writingLibCardHtml(s, idx)).join('');
}
