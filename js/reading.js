/* =========================================================================
   READING COMPREHENSION MODULE (ĐỌC HIỂU NGỮ VĂN)
   ========================================================================= */

const DEFAULT_READING_CATEGORIES = [
  'Thơ hiện đại',
  'Văn xuôi & Tản văn',
  'Nghị luận & Thông tin'
];

const DEFAULT_READING_SETS = [
  {
    id: 'reading_preset_1',
    title: 'Đất Nước và cội nguồn yêu thương',
    category: 'Thơ hiện đại',
    genre: 'Thơ tự do',
    author: 'Nguyễn Khoa Điềm',
    source: '(Trích trường ca "Mặt đường khát vọng", NXB Giải phóng, 1974)',
    passage: `Khi ta lớn lên Đất Nước đã có rồi
Đất Nước có trong những cái "ngày xửa ngày xưa..." mẹ thường hay kể
Đất Nước bắt đầu với miếng trầu bây giờ bà ăn
Đất Nước lớn lên khi dân mình biết trồng tre mà đánh giặc
Tóc mẹ thì bới sau đầu
Cha mẹ thương nhau bằng gừng cay muối mặn
Cái kèo, cái cột thành tên
Hạt gạo phải một nắng hai sương xay, giã, dần, sàng
Đất Nước có từ ngày đó...

...Đất là nơi anh đến trường
Nước là nơi em tắm
Đất Nước là nơi ta hò hẹn
Đất Nước là nơi em đánh rơi chiếc khăn trong nỗi nhớ thầm
Đất là nơi "con chim phượng hoàng bay về hòn núi bạc"
Nước là nơi "con cá ngư ông móng nước biển khơi"
Thời gian đằng đẵng
Không gian mênh mông
Đất Nước là nơi dân mình đoàn tụ...`,
    questions: [
      {
        id: 'q1',
        level: 'nhan-biet',
        levelName: 'Nhận biết',
        text: 'Chỉ ra thể thơ và phương thức biểu đạt chính của đoạn trích trên.',
        guide: '- Thể thơ: Thơ tự do (không bị gò bó về số chữ trong câu).\n- Phương thức biểu đạt chính: Biểu cảm kết hợp miêu tả và tự sự.'
      },
      {
        id: 'q2',
        level: 'nhan-biet',
        levelName: 'Nhận biết',
        text: 'Theo tác giả, Đất Nước có từ khi nào và gắn liền với những hình ảnh thân thuộc nào?',
        guide: '- Đất Nước có từ những nét văn hóa, phong tục cổ truyền: câu chuyện cổ tích mẹ kể, miếng trầu bà ăn, phong tục bới tóc sau đầu, truyền thống đánh giặc cứu nước bằng tre làng, đạo lý thủy chung gừng cay muối mặn, cây lúa hạt gạo lao động vất vả.'
      },
      {
        id: 'q3',
        level: 'thong-hieu',
        levelName: 'Thông hiểu',
        text: 'Anh/chị hiểu như thế nào về hình ảnh: "Cha mẹ thương nhau bằng gừng cay muối mặn"? Nêu tác dụng của hình ảnh này.',
        guide: '- "Gừng cay muối mặn" mượn từ ca dao xưa, tượng trưng cho tình nghĩa thủy chung son sắt, cùng nhau vượt qua thăng trầm, gian khó.\n- Tác dụng: Khắc họa vẻ đẹp tâm hồn người Việt, khẳng định cội nguồn Đất Nước được xây đắp từ tình cảm gia đình bền chặt và đạo nghĩa truyền thống thiêng liêng.'
      },
      {
        id: 'q4',
        level: 'van-dung',
        levelName: 'Vận dụng',
        text: 'Từ thông điệp của đoạn trích, hãy nêu suy nghĩ của anh/chị về trách nhiệm của thế hệ trẻ đối với quê hương, đất nước hôm nay.',
        guide: '- Thế hệ trẻ cần biết trân trọng những giá trị văn hóa truyền thống, cội nguồn lịch sử.\n- Nỗ lực học tập, rèn luyện tri thức, sống có lý tưởng cống hiến.\n- Chung tay xây dựng, phát triển kinh tế đất nước và bảo vệ chủ quyền thiêng liêng của Tổ quốc.'
      }
    ]
  },
  {
    id: 'reading_preset_2',
    title: 'Thói quen đọc sách và sự trưởng thành tinh thần',
    category: 'Nghị luận & Thông tin',
    genre: 'Văn bản nghị luận',
    author: 'Chu Quang Tiềm',
    source: '(Trích "Bàn về đọc sách", SGK Ngữ văn 9, NXB Giáo dục)',
    passage: `Học vấn không chỉ là chuyện đọc sách, nhưng đọc sách vẫn là một con đường quan trọng của học vấn. Bởi vì học vấn không chỉ là chuyện cá nhân, mà là việc của toàn thể nhân loại. Những tri thức quý báu nhất của nhân loại đều được ghi chép và lưu giữ trong sách vở.

Đọc sách là tiếp thu những kinh nghiệm quý báu của cha ông đã tích lũy từ hàng ngàn năm qua. Nếu không đọc sách, con người sẽ phải bắt đầu mọi thứ lại từ con số không, và sự tiến hóa của trí tuệ nhân loại sẽ bị chậm lại vô tận.

Tuy nhiên, đọc sách không cốt lấy nhiều mà cốt lấy tinh. Đọc mười quyển sách một cách qua loa không bằng đọc một quyển sách mà hiểu sâu sắc, suy ngẫm tường tận từng trang và rút ra bài học hành động cho bản thân. Đọc sách có phương pháp chính là chiếc chìa khóa vàng mở ra kho tàng tri thức bao la của cuộc đời.`,
    questions: [
      {
        id: 'q1',
        level: 'nhan-biet',
        levelName: 'Nhận biết',
        text: 'Theo đoạn trích, vì sao đọc sách là con đường quan trọng của học vấn?',
        guide: '- Vì học vấn là thành quả tích lũy của nhân loại, và những tri thức quý báu nhất đều được ghi chép, lưu giữ lại qua các trang sách.'
      },
      {
        id: 'q2',
        level: 'thong-hieu',
        levelName: 'Thông hiểu',
        text: 'Tác giả quan niệm thế nào về việc "đọc sách không cốt lấy nhiều mà cốt lấy tinh"?',
        guide: '- Tác giả nhấn mạnh chất lượng hơn số lượng: Đọc sách cần sự tập trung, thấu hiểu tường tận bản chất vấn đề, nghiền ngẫm sâu sắc thay vì chỉ đọc lướt qua loa theo số lượng bề nổi.'
      },
      {
        id: 'q3',
        level: 'van-dung',
        levelName: 'Vận dụng',
        text: 'Anh/chị hãy chỉ ra một thách thức lớn đối với văn hóa đọc của giới trẻ trong kỷ nguyên internet và mạng xã hội hiện nay.',
        guide: '- Sự bùng nổ của thông tin nhanh, mạng xã hội (video ngắn, tin tức giải trí mì ăn liền) dễ khiến người trẻ phân tán tập trung, lười đọc sách sâu, thiếu kiên nhẫn khi đọc các văn bản dài và giàu chiều sâu tư tưởng.'
      },
      {
        id: 'q4',
        level: 'van-dung-cao',
        levelName: 'Vận dụng cao',
        text: 'Anh/chị hãy đề xuất một giải pháp thiết thực để duy trì và phát triển thói quen đọc sách mỗi ngày cho bản thân.',
        guide: '- Lên kế hoạch đọc sách cố định: Dành 15-30 phút mỗi ngày trước khi đi ngủ hoặc buổi sáng sớm.\n- Chọn sách phù hợp với sở thích và nhu cầu phát triển bản thân.\n- Ghi chép (take note) lại những câu nói tâm đắc và chia sẻ cùng bạn bè, câu lạc bộ sách.'
      }
    ]
  },
  {
    id: 'reading_preset_3',
    title: 'Nơi chốn bình yên trong ký ức của mẹ',
    category: 'Văn xuôi & Tản văn',
    genre: 'Tản văn',
    author: 'Nguyễn Ngọc Tư',
    source: '(Trích tập tản văn "Khói trời buông tỏa", NXB Trẻ)',
    passage: `Tôi nhớ hoài căn bếp của má ngày xưa. Căn bếp nhỏ mái lá đơn sơ, vách trát bằng đất bùn trộn rơm mà ấm sực mùi khói củi. Mỗi chiều mưa giông, má ngồi bên bếp lửa đỏ bập bùng, mái tóc lấm tấm sợi bạc khẽ rung theo từng nhịp thổi ống nứa cho ngọn lửa bùng lên.

Mùi cơm sôi thơm nức quyện với mùi cá kho tiêu sực nức cả chái nhà. Những ngày đó, dù bên ngoài gió lạnh hay cuộc sống còn bao nỗi chật vật thiếu thốn, chỉ cần bước chân vào bếp, ngồi sà xuống bên má, hơ đôi bàn tay ướt lạnh trên ánh lửa là mọi mỏi mệt của tôi dường như tan biến hết.

Bây giờ về phố, sống giữa những căn bếp hiện đại, sạch bóng mùi ga và lò vi sóng, đôi lúc tôi thèm đến cồn cào mùi khói cay nồng mắt ấy. Không phải vì ta hoài cổ, mà bởi nơi căn bếp khói lam chiều ấy có bóng hình người mẹ tần tảo sớm hôm dành trọn đời cho con cái.`,
    questions: [
      {
        id: 'q1',
        level: 'nhan-biet',
        levelName: 'Nhận biết',
        text: 'Tìm những chi tiết, hình ảnh miêu tả căn bếp và hình bóng người mẹ trong đoạn văn.',
        guide: '- Căn bếp: Mái lá đơn sơ, vách đất bùn trộn rơm, ấm sực mùi khói củi, lửa đỏ bập bùng, mùi cơm sôi thơm nức, mùi cá kho tiêu.\n- Người mẹ: Mái tóc lấm tấm sợi bạc khẽ rung, ngồi bên bếp lửa thổi ống nứa, tần tảo sớm hôm.'
      },
      {
        id: 'q2',
        level: 'thong-hieu',
        levelName: 'Thông hiểu',
        text: 'Nêu cảm xúc của nhân vật "tôi" khi nhớ về căn bếp xưa và bóng dáng mẹ hiền.',
        guide: '- Cảm giác ấm áp, bình yên và an lòng khi ở bên mẹ.\n- Nỗi nhớ thương da diết, lòng biết ơn sâu sắc đối với sự hy sinh thầm lặng, chịu thương chịu khó của người mẹ.'
      },
      {
        id: 'q3',
        level: 'van-dung',
        levelName: 'Vận dụng',
        text: 'Phân tích ý nghĩa của hình ảnh "mùi khói củi" trong đoạn trích.',
        guide: '- "Mùi khói củi" không chỉ là mùi vị giác quan chân thực của bếp quê mộc mạc, mà đã trở thành biểu tượng nghệ thuật thiêng liêng cho tình mẫu tử, cho ký ức tuổi thơ êm đềm và tổ ấm gia đình bình yên không gì thay thế được.'
      },
      {
        id: 'q4',
        level: 'van-dung-cao',
        levelName: 'Vận dụng cao',
        text: 'Đoạn trích gợi cho anh/chị bài học gì về việc gìn giữ tình cảm gia đình giữa nhịp sống hiện đại hối hả?',
        guide: '- Giữa cuộc sống bận rộn nhiều cám dỗ, cần luôn hướng về nguồn cội, biết trân trọng những phút giây sum họp bên gia đình.\n- Yêu thương, quan tâm và phụng dưỡng cha mẹ khi họ còn ở bên ta, không để sự thờ ơ làm nguội lạnh mái ấm.'
      }
    ]
  }
];

// STATE VARIABLES
let readingSets = [];
let readingCategories = [];
let currentReadingCategory = 'all';
let readingSearchQuery = '';
let currentReadingSetId = null;
let showReadingAnswers = false;
let passageFontSize = 16;

// INITIALIZATION & PERSISTENCE
function initReadingModule() {
  loadReadingData();
  initReadingDialogDismissals();
}

function loadReadingData() {
  try {
    const savedCategories = localStorage.getItem('vq_reading_categories_v1');
    if (savedCategories) {
      readingCategories = JSON.parse(savedCategories);
    } else {
      readingCategories = [...DEFAULT_READING_CATEGORIES];
      localStorage.setItem('vq_reading_categories_v1', JSON.stringify(readingCategories));
    }

    const savedSets = localStorage.getItem('vq_reading_sets_v1');
    if (savedSets) {
      readingSets = JSON.parse(savedSets);
    } else {
      readingSets = JSON.parse(JSON.stringify(DEFAULT_READING_SETS));
      localStorage.setItem('vq_reading_sets_v1', JSON.stringify(readingSets));
    }
  } catch (err) {
    console.error('Lỗi khi tải dữ liệu đọc hiểu:', err);
    readingCategories = [...DEFAULT_READING_CATEGORIES];
    readingSets = JSON.parse(JSON.stringify(DEFAULT_READING_SETS));
  }
}

function saveReadingData() {
  try {
    localStorage.setItem('vq_reading_categories_v1', JSON.stringify(readingCategories));
    localStorage.setItem('vq_reading_sets_v1', JSON.stringify(readingSets));
  } catch (err) {
    console.error('Lỗi khi lưu dữ liệu đọc hiểu:', err);
  }
}

function initReadingDialogDismissals() {
  ['reading-edit-modal', 'reading-result-modal'].forEach(modalId => {
    const dlg = document.getElementById(modalId);
    if (dlg && !dlg._hasBackdropDismiss) {
      dlg._hasBackdropDismiss = true;
      dlg.addEventListener('click', (e) => {
        const rect = dlg.getBoundingClientRect();
        const inDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height
          && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
        if (!inDialog) dlg.close();
      });
    }
  });
}

// ROUTING HOOK
if (!window.R) window.R = {};
window.R.reading = function(setId) {
  initReadingModule();
  if (setId) {
    openReadingSet(setId);
  } else {
    exitReadingWorkspace();
  }
};

// VIEW SWITCHING
function exitReadingWorkspace() {
  currentReadingSetId = null;
  const listView = document.getElementById('reading-list-view');
  const workView = document.getElementById('reading-workspace-view');
  if (listView) listView.style.display = 'block';
  if (workView) workView.style.display = 'none';
  renderReadingListView();
}

function openReadingSet(id) {
  const set = readingSets.find(s => String(s.id) === String(id));
  if (!set) {
    toast('Không tìm thấy bộ đề đọc hiểu này!', 'bad');
    exitReadingWorkspace();
    return;
  }

  currentReadingSetId = set.id;
  showReadingAnswers = false;

  const listView = document.getElementById('reading-list-view');
  const workView = document.getElementById('reading-workspace-view');
  if (listView) listView.style.display = 'none';
  if (workView) workView.style.display = 'block';

  renderReadingWorkspace(set);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// RENDER LIST VIEW
function renderReadingListView() {
  renderReadingCategoryChips();
  renderReadingSetsGrid();
}

function renderReadingCategoryChips() {
  const container = document.getElementById('reading-category-chips');
  if (!container) return;

  const allCount = readingSets.length;
  let html = `
    <button class="reading-chip ${currentReadingCategory === 'all' ? 'active' : ''}" type="button" onclick="setReadingCategoryFilter('all')">
      Tất cả <span class="reading-chip-count">(${allCount})</span>
    </button>
  `;

  readingCategories.forEach(cat => {
    const count = readingSets.filter(s => (s.category || '').trim() === cat).length;
    const isActive = currentReadingCategory === cat;
    html += `
      <button class="reading-chip ${isActive ? 'active' : ''}" type="button" onclick="setReadingCategoryFilter('${esc(cat)}')">
        ${esc(cat)} <span class="reading-chip-count">(${count})</span>
      </button>
    `;
  });

  container.innerHTML = html;
}

function setReadingCategoryFilter(category) {
  currentReadingCategory = category;
  renderReadingListView();
}

function onReadingSearchInput() {
  readingSearchQuery = (document.getElementById('reading-search-input')?.value || '').trim().toLowerCase();
  renderReadingSetsGrid();
}

const READING_PALETTES = [
  'linear-gradient(135deg, #ef4444 0%, #f87171 100%)', // Red / Coral
  'linear-gradient(135deg, #f97316 0%, #fb923c 100%)', // Orange
  'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)', // Amber / Gold
  'linear-gradient(135deg, #15803d 0%, #22c55e 100%)', // Dark green
  'linear-gradient(135deg, #84cc16 0%, #a3e635 100%)', // Light green / Lime
  'linear-gradient(135deg, #14b8a6 0%, #2dd4bf 100%)', // Teal
  'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)', // Dark blue
  'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)', // Sky / Medium Blue
  'linear-gradient(135deg, #06b6d4 0%, #67e8f9 100%)', // Cyan
];

function renderReadingSetsGrid() {
  const container = document.getElementById('reading-sets-container');
  if (!container) return;

  // Filter sets
  const filteredSets = readingSets.filter(s => {
    if (currentReadingCategory !== 'all' && (s.category || '').trim() !== currentReadingCategory) {
      return false;
    }
    if (readingSearchQuery) {
      const hay = (String(s.title) + ' ' + String(s.author) + ' ' + String(s.category) + ' ' + String(s.genre)).toLowerCase();
      if (!hay.includes(readingSearchQuery)) return false;
    }
    return true;
  });

  if (!filteredSets.length) {
    container.innerHTML = `
      <div class="card reading-empty-state">
        <div style="font-size:46px; margin-bottom:12px;">📑</div>
        <h3 style="margin:0 0 8px;">Không tìm thấy đề đọc hiểu nào</h3>
        <p class="mut" style="margin:0 0 16px;">Hãy thử tìm kiếm từ khóa khác hoặc tạo bộ đề đọc hiểu mới.</p>
        <button class="btn au sm" onclick="openCreateReadingSetModal()">+ Tạo đề đọc hiểu mới</button>
      </div>
    `;
    return;
  }

  // Group by category if "all" is active, or display flat
  if (currentReadingCategory === 'all' && !readingSearchQuery) {
    const groups = new Map();
    filteredSets.forEach(s => {
      const cat = (s.category || 'Chưa phân loại').trim();
      if (!groups.has(cat)) groups.set(cat, []);
      groups.get(cat).push(s);
    });

    let groupsHtml = '';
    let globalIdx = 0;
    groups.forEach((items, cat) => {
      groupsHtml += `
        <div class="reading-category-group">
          <div class="reading-group-title">
            <span>🏷️ ${esc(cat)}</span>
            <span class="reading-group-count">${items.length} đề</span>
          </div>
          <div class="setup-sets-grid">
            ${items.map(s => renderSingleReadingCard(s, globalIdx++)).join('')}
          </div>
        </div>
      `;
    });
    container.innerHTML = groupsHtml;
  } else {
    container.innerHTML = `
      <div class="setup-sets-grid">
        ${filteredSets.map((s, idx) => renderSingleReadingCard(s, idx)).join('')}
      </div>
    `;
  }
}

function renderSingleReadingCard(s, idx = 0) {
  const bg = READING_PALETTES[idx % READING_PALETTES.length];
  const qCount = Array.isArray(s.questions) ? s.questions.length : 0;
  const topic = s.genre || s.category || 'Đọc hiểu';
  const watermark = s.emo || '📖';

  return `
    <div class="setup-grid-card" onclick="openReadingSet('${esc(s.id)}')">
      <div class="setup-card-banner" style="background: ${bg};">
        <div class="setup-card-top-info">
          <span class="setup-card-count-pill">${qCount} câu hỏi</span>
        </div>
        <h3 class="setup-card-title">${esc(s.title)}</h3>
        <span class="setup-card-watermark">${watermark}</span>
      </div>
      <div class="setup-card-body">
        <button class="btn-setup-action" type="button" onclick="event.stopPropagation(); openReadingSet('${esc(s.id)}')">
          <span class="btn-setup-icon">▶</span>
          <span>Vào đọc hiểu</span>
        </button>
        <div class="setup-card-meta">
          <span class="setup-card-topic" title="${esc(topic)}">
            🏷️ ${esc(topic)}
          </span>
        </div>
      </div>
    </div>
  `;
}

// WORKSPACE RENDERING
function renderReadingWorkspace(set) {
  // Title & Badges
  const titleEl = document.getElementById('reading-workspace-set-title');
  const badgeEl = document.getElementById('reading-workspace-set-badge');
  if (titleEl) titleEl.textContent = set.title;
  if (badgeEl) badgeEl.textContent = set.genre || set.category || 'Đọc hiểu';

  // Left Panel: Passage
  const genreEl = document.getElementById('reading-passage-genre');
  const authorEl = document.getElementById('reading-passage-author');
  const textEl = document.getElementById('reading-passage-text');
  const sourceEl = document.getElementById('reading-passage-source');

  if (genreEl) genreEl.textContent = set.category || 'Đọc hiểu';
  if (authorEl) authorEl.textContent = set.author ? `Tác giả: ${set.author}` : '';
  if (textEl) {
    textEl.textContent = set.passage || '';
    textEl.style.fontSize = passageFontSize + 'px';
  }
  if (sourceEl) sourceEl.textContent = set.source || '';

  // Right Panel: Questions
  const qCountEl = document.getElementById('reading-q-count');
  const qListEl = document.getElementById('reading-questions-list');
  const questions = Array.isArray(set.questions) ? set.questions : [];
  if (qCountEl) qCountEl.textContent = questions.length;

  // Retrieve saved answers
  const savedAnswers = getSavedReadingDraft(set.id);

  if (qListEl) {
    qListEl.innerHTML = questions.map((q, idx) => {
      const levelClass = getLevelClass(q.level);
      const levelTitle = q.levelName || getLevelTitle(q.level);
      const answerVal = savedAnswers[q.id || idx] || '';

      return `
        <div class="reading-question-card" id="card-q-${idx}">
          <div class="reading-q-header">
            <span class="reading-q-number">Câu ${idx + 1}</span>
            <span class="reading-q-level ${levelClass}">${esc(levelTitle)}</span>
          </div>
          <div class="reading-q-text">${esc(q.text)}</div>
          <div class="reading-answer-box">
            <textarea
              class="reading-answer-textarea"
              placeholder="Nhập câu trả lời của bạn..."
              oninput="handleReadingAnswerInput('${esc(set.id)}', '${esc(q.id || idx)}', this.value)"
            >${esc(answerVal)}</textarea>
          </div>
          
          <div class="reading-guide-box" id="guide-box-${idx}" style="display: ${showReadingAnswers ? 'block' : 'none'};">
            <div class="reading-guide-label">
              <span>💡</span> <span>Gợi ý &amp; Đáp án tham khảo</span>
            </div>
            <div class="reading-guide-content" style="white-space:pre-wrap;">${esc(q.guide || 'Chưa có gợi ý chi tiết.')}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  updateAnswersToggleButtonState();
}

function getLevelClass(lvl) {
  switch (String(lvl).toLowerCase()) {
    case 'nhan-biet': return 'level-nhan-biet';
    case 'thong-hieu': return 'level-thong-hieu';
    case 'van-dung': return 'level-van-dung';
    case 'van-dung-cao': return 'level-van-dung-cao';
    default: return 'level-nhan-biet';
  }
}

function getLevelTitle(lvl) {
  switch (String(lvl).toLowerCase()) {
    case 'nhan-biet': return 'Nhận biết';
    case 'thong-hieu': return 'Thông hiểu';
    case 'van-dung': return 'Vận dụng';
    case 'van-dung-cao': return 'Vận dụng cao';
    default: return 'Nhận biết';
  }
}

// FONT SIZE ADJUSTMENT
function changePassageFontSize(delta) {
  passageFontSize = Math.max(13, Math.min(26, passageFontSize + delta * 2));
  const textEl = document.getElementById('reading-passage-text');
  if (textEl) {
    textEl.style.fontSize = passageFontSize + 'px';
  }
}

// TOGGLE ANSWERS GUIDE
function toggleReadingAnswersGuide() {
  showReadingAnswers = !showReadingAnswers;
  const guideBoxes = document.querySelectorAll('.reading-guide-box');
  guideBoxes.forEach(box => {
    box.style.display = showReadingAnswers ? 'block' : 'none';
  });
  updateAnswersToggleButtonState();
  toast(showReadingAnswers ? 'Đã hiển thị gợi ý đáp án' : 'Đã ẩn gợi ý đáp án', 'ok');
}

function updateAnswersToggleButtonState() {
  const btn = document.getElementById('btn-toggle-reading-answers');
  if (btn) {
    btn.innerHTML = showReadingAnswers 
      ? `<span>👁️‍🗨️</span> <span>Ẩn gợi ý đáp án</span>` 
      : `<span>💡</span> <span>Xem gợi ý đáp án</span>`;
    btn.classList.toggle('au', showReadingAnswers);
    btn.classList.toggle('gh', !showReadingAnswers);
  }
}

// DRAFT SAVING
function getSavedReadingDraft(setId) {
  try {
    const raw = localStorage.getItem('vq_reading_draft_' + setId);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

let autoSaveTimer = null;
function handleReadingAnswerInput(setId, qId, val) {
  const statusEl = document.getElementById('reading-save-status');
  if (statusEl) statusEl.textContent = '⏳ Đang lưu...';

  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(() => {
    try {
      const draft = getSavedReadingDraft(setId);
      draft[qId] = val;
      localStorage.setItem('vq_reading_draft_' + setId, JSON.stringify(draft));
      if (statusEl) statusEl.textContent = '💾 Đã lưu tự động';
    } catch (e) {
      if (statusEl) statusEl.textContent = '⚠️ Lỗi lưu trữ';
    }
  }, 400);
}

function resetCurrentReadingDraft() {
  if (!currentReadingSetId) return;
  if (!confirm('Bạn có chắc muốn xóa tất cả câu trả lời của đề này để làm lại từ đầu không?')) return;

  try {
    localStorage.removeItem('vq_reading_draft_' + currentReadingSetId);
  } catch (e) {}

  document.querySelectorAll('.reading-answer-textarea').forEach(tx => {
    tx.value = '';
  });
  toast('Đã làm mới lại bài đọc hiểu!', 'ok');
}

// SUBMIT & REVIEW
function submitReadingAnswers() {
  const set = readingSets.find(s => String(s.id) === String(currentReadingSetId));
  if (!set) return;

  const draft = getSavedReadingDraft(set.id);
  const questions = Array.isArray(set.questions) ? set.questions : [];

  let answeredCount = 0;
  questions.forEach((q, idx) => {
    const a = (draft[q.id || idx] || '').trim();
    if (a) answeredCount++;
  });

  const listContainer = document.getElementById('reading-result-comparison-list');
  if (listContainer) {
    listContainer.innerHTML = questions.map((q, idx) => {
      const userAns = (draft[q.id || idx] || '').trim();
      return `
        <div class="reading-result-item">
          <div class="reading-result-q-title">
            Câu ${idx + 1}: ${esc(q.text)}
          </div>
          <div class="reading-result-user-ans">
            <b>Bài làm của bạn:</b><br>
            ${userAns ? esc(userAns).replace(/\n/g, '<br>') : '<i style="color:var(--mut);">Chưa trả lời câu này</i>'}
          </div>
          <div class="reading-result-guide-ans">
            <b>Đáp án / Gợi ý chuẩn:</b><br>
            ${esc(q.guide || 'Chưa có đáp án gợi ý.').replace(/\n/g, '<br>')}
          </div>
        </div>
      `;
    }).join('');
  }

  const modal = document.getElementById('reading-result-modal');
  if (modal) modal.showModal();
}

function closeReadingResultModal() {
  const modal = document.getElementById('reading-result-modal');
  if (modal && modal.open) modal.close();
}

function copyReadingStudentAnswers() {
  const set = readingSets.find(s => String(s.id) === String(currentReadingSetId));
  if (!set) return;

  const draft = getSavedReadingDraft(set.id);
  const questions = Array.isArray(set.questions) ? set.questions : [];

  let text = `BÀI LÀM ĐỌC HIỂU: ${set.title}\n`;
  text += `Tác giả: ${set.author || 'Khuyết danh'} - Thể loại: ${set.genre || set.category}\n\n`;

  questions.forEach((q, idx) => {
    const userAns = (draft[q.id || idx] || '').trim();
    text += `Câu ${idx + 1}: ${q.text}\n`;
    text += `Trả lời: ${userAns || '(Chưa làm)'}\n\n`;
  });

  navigator.clipboard.writeText(text).then(() => {
    toast('Đã sao chép toàn bộ bài làm vào bộ nhớ tạm!', 'ok');
  }).catch(() => {
    toast('Không thể sao chép tự động', 'bad');
  });
}

// CREATE & EDIT MODAL
function populateCategorySelect(selectEl, selectedVal) {
  if (!selectEl) return;
  selectEl.innerHTML = readingCategories.map(cat => `
    <option value="${esc(cat)}" ${cat === selectedVal ? 'selected' : ''}>${esc(cat)}</option>
  `).join('');
}

function openCreateReadingSetModal() {
  const modal = document.getElementById('reading-edit-modal');
  if (!modal) return;

  document.getElementById('reading-modal-title').textContent = 'Thêm bộ đề đọc hiểu mới';
  document.getElementById('reading-form-id').value = '';
  document.getElementById('reading-form-title').value = '';
  document.getElementById('reading-form-author').value = '';
  document.getElementById('reading-form-genre').value = '';
  document.getElementById('reading-form-passage').value = '';
  document.getElementById('reading-form-source').value = '';

  const catSelect = document.getElementById('reading-form-category');
  populateCategorySelect(catSelect, currentReadingCategory !== 'all' ? currentReadingCategory : readingCategories[0]);

  // Default questions
  const qList = document.getElementById('reading-form-questions-list');
  if (qList) {
    qList.innerHTML = '';
    // Add 4 standard blank questions
    addQuestionToReadingForm({ level: 'nhan-biet', text: '', guide: '' });
    addQuestionToReadingForm({ level: 'thong-hieu', text: '', guide: '' });
    addQuestionToReadingForm({ level: 'van-dung', text: '', guide: '' });
    addQuestionToReadingForm({ level: 'van-dung-cao', text: '', guide: '' });
  }

  modal.showModal();
}

function openEditReadingSetModal(id) {
  const set = readingSets.find(s => String(s.id) === String(id));
  if (!set) return;

  const modal = document.getElementById('reading-edit-modal');
  if (!modal) return;

  document.getElementById('reading-modal-title').textContent = 'Chỉnh sửa bộ đề đọc hiểu';
  document.getElementById('reading-form-id').value = set.id;
  document.getElementById('reading-form-title').value = set.title || '';
  document.getElementById('reading-form-author').value = set.author || '';
  document.getElementById('reading-form-genre').value = set.genre || '';
  document.getElementById('reading-form-passage').value = set.passage || '';
  document.getElementById('reading-form-source').value = set.source || '';

  const catSelect = document.getElementById('reading-form-category');
  populateCategorySelect(catSelect, set.category || readingCategories[0]);

  const qList = document.getElementById('reading-form-questions-list');
  if (qList) {
    qList.innerHTML = '';
    const qs = Array.isArray(set.questions) && set.questions.length ? set.questions : [{ level: 'nhan-biet', text: '', guide: '' }];
    qs.forEach(q => addQuestionToReadingForm(q));
  }

  modal.showModal();
}

function closeReadingEditModal() {
  const modal = document.getElementById('reading-edit-modal');
  if (modal && modal.open) modal.close();
}

function addQuestionToReadingForm(data = { level: 'nhan-biet', text: '', guide: '' }) {
  const qList = document.getElementById('reading-form-questions-list');
  if (!qList) return;

  const count = qList.querySelectorAll('.reading-modal-question-item').length;
  const item = document.createElement('div');
  item.className = 'reading-modal-question-item';

  item.innerHTML = `
    <div class="reading-modal-question-header">
      <span style="font-weight:800; font-size:14.5px;">Câu hỏi ${count + 1}</span>
      <div style="display:flex; gap:8px; align-items:center;">
        <select class="q-level-input" style="font-size:13px; padding:4px 8px; border-radius:8px;">
          <option value="nhan-biet" ${data.level === 'nhan-biet' ? 'selected' : ''}>Nhận biết</option>
          <option value="thong-hieu" ${data.level === 'thong-hieu' ? 'selected' : ''}>Thông hiểu</option>
          <option value="van-dung" ${data.level === 'van-dung' ? 'selected' : ''}>Vận dụng</option>
          <option value="van-dung-cao" ${data.level === 'van-dung-cao' ? 'selected' : ''}>Vận dụng cao</option>
        </select>
        <button type="button" class="btn no sm btn-icon-only" onclick="this.closest('.reading-modal-question-item').remove(); renumberReadingFormQuestions();" title="Xóa câu hỏi này">✕</button>
      </div>
    </div>
    <div style="margin-bottom:8px;">
      <textarea class="q-text-input" rows="2" placeholder="Nội dung câu hỏi..." style="width:100%;" required>${esc(data.text || '')}</textarea>
    </div>
    <div>
      <textarea class="q-guide-input" rows="2" placeholder="Gợi ý đáp án / Thang điểm..." style="width:100%; font-size:13.5px;">${esc(data.guide || '')}</textarea>
    </div>
  `;

  qList.appendChild(item);
}

function renumberReadingFormQuestions() {
  const items = document.querySelectorAll('#reading-form-questions-list .reading-modal-question-item');
  items.forEach((item, idx) => {
    const numEl = item.querySelector('.reading-modal-question-header span');
    if (numEl) numEl.textContent = `Câu hỏi ${idx + 1}`;
  });
}

function handleReadingFormSubmit(e) {
  if (e) e.preventDefault();

  const id = document.getElementById('reading-form-id').value;
  const title = (document.getElementById('reading-form-title').value || '').trim();
  const category = (document.getElementById('reading-form-category').value || '').trim();
  const author = (document.getElementById('reading-form-author').value || '').trim();
  const genre = (document.getElementById('reading-form-genre').value || '').trim();
  const passage = (document.getElementById('reading-form-passage').value || '').trim();
  const source = (document.getElementById('reading-form-source').value || '').trim();

  if (!title || !passage) {
    return toast('Vui lòng nhập tên đề bài và nội dung ngữ liệu!', 'bad');
  }

  // Parse questions
  const qElements = document.querySelectorAll('#reading-form-questions-list .reading-modal-question-item');
  const questions = [];
  qElements.forEach((el, idx) => {
    const lvl = el.querySelector('.q-level-input')?.value || 'nhan-biet';
    const txt = (el.querySelector('.q-text-input')?.value || '').trim();
    const gde = (el.querySelector('.q-guide-input')?.value || '').trim();
    if (txt) {
      questions.push({
        id: 'q_' + (idx + 1) + '_' + Date.now(),
        level: lvl,
        levelName: getLevelTitle(lvl),
        text: txt,
        guide: gde
      });
    }
  });

  if (!questions.length) {
    return toast('Vui lòng thêm ít nhất 1 câu hỏi đọc hiểu!', 'bad');
  }

  if (id) {
    // Edit existing
    const idx = readingSets.findIndex(s => String(s.id) === String(id));
    if (idx !== -1) {
      readingSets[idx] = {
        ...readingSets[idx],
        title,
        category,
        author,
        genre: genre || category,
        passage,
        source,
        questions
      };
      toast('Đã cập nhật bộ đề đọc hiểu thành công!', 'ok');
    }
  } else {
    // Create new
    const newId = 'reading_user_' + Date.now();
    const newSet = {
      id: newId,
      title,
      category,
      author,
      genre: genre || category,
      passage,
      source,
      questions
    };
    readingSets.unshift(newSet);
    toast('Đã tạo bộ đề đọc hiểu mới thành công!', 'ok');
  }

  saveReadingData();
  closeReadingEditModal();

  if (currentReadingSetId) {
    const updated = readingSets.find(s => String(s.id) === String(currentReadingSetId));
    if (updated) renderReadingWorkspace(updated);
  } else {
    renderReadingListView();
  }
}

// DELETE SET
function deleteReadingSet(id) {
  const set = readingSets.find(s => String(s.id) === String(id));
  if (!set) return;

  if (!confirm(`Bạn có chắc muốn xóa đề đọc hiểu "${set.title}" không?`)) return;

  readingSets = readingSets.filter(s => String(s.id) !== String(id));
  try {
    localStorage.removeItem('vq_reading_draft_' + id);
  } catch (e) {}

  saveReadingData();
  toast('Đã xóa bộ đề đọc hiểu!', 'ok');
  renderReadingListView();
}

function duplicateReadingSet(id) {
  const set = readingSets.find(s => String(s.id) === String(id));
  if (!set) return;
  const clone = JSON.parse(JSON.stringify(set));
  clone.id = 'reading_copy_' + uid();
  clone.title = clone.title + ' (Bản sao)';
  readingSets.unshift(clone);
  saveReadingData();
  renderReadingListView();
  toast('Đã nhân bản bộ đề đọc hiểu thành công!', 'ok');
}

function deleteCurrentOpenedReadingSet() {
  if (!currentReadingSetId) return;
  deleteReadingSet(currentReadingSetId);
  exitReadingWorkspace();
}

// CATEGORY MANAGEMENT
function promptAddNewReadingCategory() {
  const name = prompt('Nhập tên chủ đề / thể loại đọc hiểu mới:');
  if (!name || !name.trim()) return;

  const trimmed = name.trim();
  if (readingCategories.includes(trimmed)) {
    return toast('Chủ đề này đã tồn tại!', 'bad');
  }

  readingCategories.push(trimmed);
  saveReadingData();
  toast(`Đã thêm chủ đề "${trimmed}"`, 'ok');
  renderReadingListView();
}

function promptDeleteCurrentReadingCategory() {
  if (currentReadingCategory === 'all') {
    return toast('Vui lòng chọn một chủ đề cụ thể để xóa!', 'bad');
  }

  const catToDelete = currentReadingCategory;
  if (!confirm(`Bạn có chắc chắn muốn xóa chủ đề "${catToDelete}" không? Các bộ đề thuộc chủ đề này sẽ được chuyển sang "Chưa phân loại".`)) {
    return;
  }

  readingCategories = readingCategories.filter(c => c !== catToDelete);
  readingSets.forEach(s => {
    if (s.category === catToDelete) s.category = 'Chưa phân loại';
  });

  currentReadingCategory = 'all';
  saveReadingData();
  toast(`Đã xóa chủ đề "${catToDelete}"`, 'ok');
  renderReadingListView();
}
