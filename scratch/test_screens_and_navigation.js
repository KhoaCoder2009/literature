const fs = require('fs');

console.log('🧪 Bắt đầu kiểm thử Điều hướng Screens, Form Validations & Chống can thiệp...\n');

// Mock DOM with simulated elements
const elements = {};
function createMockEl(id, tagName = 'div') {
  return {
    id,
    tagName: tagName.toUpperCase(),
    value: '',
    textContent: '',
    innerHTML: '',
    style: {},
    classList: {
      _classes: new Set(),
      add(c) { this._classes.add(c); },
      remove(c) { this._classes.delete(c); },
      toggle(c, force) {
        if (force === undefined) {
          if (this._classes.has(c)) this._classes.delete(c); else this._classes.add(c);
        } else if (force) {
          this._classes.add(c);
        } else {
          this._classes.delete(c);
        }
      },
      contains(c) { return this._classes.has(c); }
    },
    setAttribute: () => {},
    getAttribute: () => null,
    matches: sel => true,
    addEventListener: () => {},
    dispatchEvent: () => {},
    focus: () => {},
    showModal: function() { this.open = true; },
    close: function() { this.open = false; },
    open: false
  };
}

// Pre-create common elements
const screenIds = ['s-home', 's-lib', 's-setup', 's-game', 's-res', 's-writing', 's-reading', 's-history'];
const scrElements = [];
screenIds.forEach(id => {
  const el = createMockEl(id);
  elements[id] = el;
  scrElements.push(el);
});

[
  'navbar-menu-btn', 'mobile-sidebar', 'settings-dialog', 'login-dialog', 'student-name-dialog',
  'start-writing-dialog', 'start-reading-dialog', 'start-quiz-dialog',
  'reading-workspace-view', 'reading-list-view', 'writing-workspace-view', 'writing-list-view',
  'workspace-prompt-text', 'workspace-prompt-toggle-btn', 'workspace-prompt-genre-pill',
  'workspace-thinking-card', 'workspace-thinking-guide-body', 'btn-toggle-thinking-guide',
  'login-username', 'login-password', 'login-remember', 'login-error-alert', 'btn-submit-login',
  'start-writing-nick', 'start-writing-class', 'start-writing-timer-preset', 'start-writing-set-id',
  'start-reading-nick', 'start-reading-class', 'start-reading-timer-preset', 'start-reading-set-id',
  'history-page-search', 'history-page-set-filter',
  'lv', 'ev', 'lf', 'lf-clear'
].forEach(id => {
  elements[id] = createMockEl(id);
});

global.window = global;
global.window.innerWidth = 1280;
global.window.innerHeight = 800;
global.window.scrollTo = () => {};
global.window.addEventListener = () => {};

global.document = {
  body: createMockEl('body', 'body'),
  documentElement: {
    getAttribute: () => 'light',
    setAttribute: () => {}
  },
  getElementById: id => elements[id] || null,
  querySelector: sel => {
    if (sel.startsWith('#')) return elements[sel.substring(1)] || null;
    return null;
  },
  querySelectorAll: sel => {
    if (sel === '.scr') return scrElements;
    return [];
  },
  addEventListener: () => {}
};

const storage = {};
global.localStorage = {
  getItem: k => (k in storage ? storage[k] : null),
  setItem: (k, v) => { storage[k] = String(v); },
  removeItem: k => { delete storage[k]; },
  clear: () => { Object.keys(storage).forEach(k => delete storage[k]); }
};
global.sessionStorage = global.localStorage;
global.navigator = { clipboard: { writeText: async () => {} } };
global.location = { hash: '', reload: () => {} };
global.toast = () => {};
global.esc = s => s;
global.N = s => String(s || '').toLowerCase();
global.uid = () => 'uid_' + Math.random().toString(36).substr(2, 9);
global.playSound = () => {};
global.confirm = () => true;

// Evaluate bundle
eval(fs.readFileSync('dist/app.bundle.js', 'utf8'));

let pass = 0;
let fail = 0;
function test(condition, name) {
  if (condition) {
    pass++;
    console.log(`  ✓ PASS: ${name}`);
  } else {
    fail++;
    console.error(`  ❌ FAIL: ${name}`);
  }
}

async function runTests() {
  // 1. ROUTING & ACCESS PERMISSION TEST
  console.log('--- 1. KIỂM THỬ ĐIỀU HƯỚNG VÀ PHÂN QUYỀN TRUY CẬP (ROUTING) ---');

  // As student: public screens work
  go('home');
  test(currentScreen === 'home', `Học sinh truy cập trang chủ: currentScreen = 'home'`);
  test(elements['s-home'].classList.contains('on'), `Màn hình #s-home kích hoạt class 'on'`);

  go('setup');
  test(currentScreen === 'setup', `Học sinh truy cập phòng Bài học: currentScreen = 'setup'`);

  go('reading');
  test(currentScreen === 'reading', `Học sinh truy cập phòng Đọc hiểu: currentScreen = 'reading'`);

  go('writing');
  test(currentScreen === 'writing', `Học sinh truy cập phòng Luyện viết: currentScreen = 'writing'`);

  go('history');
  test(currentScreen === 'history', `Học sinh xem Lịch sử làm bài: currentScreen = 'history'`);

  // As student: lib must be blocked!
  go('lib');
  test(currentScreen !== 'lib', `Học sinh KHÔNG thể truy cập trái phép Thư viện quản trị (bị chặn)`);

  // Login as Teacher: lib is allowed!
  await Auth.login('tuanh', '123456');
  go('lib');
  test(currentScreen === 'lib', `Giáo viên đăng nhập truy cập thành công Thư viện: currentScreen = 'lib'`);
  test(elements['s-lib'].classList.contains('on'), `Màn hình #s-lib kích hoạt class 'on'`);

  // 2. EXAM SETUP MODAL & STUDENT NAME VALIDATION
  console.log('\n--- 2. KIỂM THỬ FORM MODAL VÀO PHÒNG THI & HỌC SINH ---');

  test(typeof openStartWritingModal === 'function', 'Hàm openStartWritingModal tồn tại');
  test(typeof closeStartWritingModal === 'function', 'Hàm closeStartWritingModal tồn tại');
  test(typeof openStartReadingModal === 'function', 'Hàm openStartReadingModal tồn tại');
  test(typeof closeStartReadingModal === 'function', 'Hàm closeStartReadingModal tồn tại');

  // Test student identity persistence
  if (typeof Auth.saveStudentIdentity === 'function') {
    Auth.saveStudentIdentity('Trần Thị Hoa', '12A2');
    test(Auth.getSavedStudentName() === 'Trần Thị Hoa', 'Lưu và lấy đúng họ tên học sinh: Trần Thị Hoa');
    test(Auth.getSavedStudentClass() === '12A2', 'Lưu và lấy đúng lớp học sinh: 12A2');
  }

  // 3. SECURITY SHIELD & CHEAT PREVENTION
  console.log('\n--- 3. KIỂM THỬ LỚP BẢO VỆ CHỐNG CAN THIỆP & QUY CHẾ THI ---');

  test(typeof window.__SECURITY_SHIELD !== 'undefined', 'Đối tượng bảo mật __SECURITY_SHIELD kích hoạt');
  test(typeof isStudentInputField === 'function', 'Hàm kiểm tra ô làm bài của học sinh tồn tại');
  test(typeof preventPasteCopy === 'function', 'Hàm chặn Copy/Paste bài thi tồn tại');

  // 4. UI THINKING GUIDE TOGGLE & COLLAPSE
  console.log('\n--- 4. KIỂM THỬ NÚT & GIAO DIỆN GỢI Ý TƯ DUY ---');

  test(typeof toggleWorkspaceThinkingGuide === 'function', 'Hàm toggleWorkspaceThinkingGuide tồn tại trên window');
  test(typeof insertSetThinkingGuideToActiveSection === 'function', 'Hàm chèn gợi ý vào bài viết tồn tại');

  // Test toggle behavior
  elements['workspace-thinking-card'].style.display = 'none';
  toggleWorkspaceThinkingGuide();
  test(elements['workspace-thinking-card'].style.display === 'block', 'Bấm Gợi ý tư duy mở hộp gợi ý (display: block)');
  toggleWorkspaceThinkingGuide();
  test(elements['workspace-thinking-card'].style.display === 'none', 'Bấm lần 2 thu gọn hộp gợi ý (display: none)');

  console.log(`\n========================================`);
  console.log(`KẾT QUẢ KIỂM THỬ BỔ SUNG: ${pass} PASS, ${fail} FAIL`);
  console.log(`========================================\n`);

  process.exit(fail > 0 ? 1 : 0);
}

runTests().catch(e => {
  console.error('Test error:', e);
  process.exit(1);
});
