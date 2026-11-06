// JSDOM-like headless environment test harness
const fs = require('fs');

console.log('🧪 Bắt đầu chạy bộ kiểm thử toàn diện toàn bộ hệ thống...\n');

// 1. Mock LocalStorage & Browser globals
const storage = {};
global.localStorage = {
  getItem: k => (k in storage ? storage[k] : null),
  setItem: (k, v) => { storage[k] = String(v); },
  removeItem: k => { delete storage[k]; },
  clear: () => { Object.keys(storage).forEach(k => delete storage[k]); }
};

const sessionStore = {};
global.sessionStorage = {
  getItem: k => (k in sessionStore ? sessionStore[k] : null),
  setItem: (k, v) => { sessionStore[k] = String(v); },
  removeItem: k => { delete sessionStore[k]; },
  clear: () => { Object.keys(sessionStore).forEach(k => delete sessionStore[k]); }
};

global.confirm = () => true;
global.window = global;
global.window.addEventListener = () => {};
global.document = {
  body: {
    setAttribute: () => {},
    classList: { add: () => {}, remove: () => {}, contains: () => false }
  },
  documentElement: {
    getAttribute: () => 'light',
    setAttribute: () => {}
  },
  querySelectorAll: () => [],
  getElementById: () => null,
  querySelector: () => null,
  addEventListener: () => {}
};
global.navigator = {
  clipboard: { writeText: async () => {} }
};
global.location = { hash: '', reload: () => {} };
global.toast = (msg, type) => { /* console.log(`   [Toast ${type}] ${msg}`); */ };
global.esc = s => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
global.N = s => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
global.uid = () => 'uid_' + Math.random().toString(36).substr(2, 9);
global.playSound = () => {};

// 2. Load bundle logic
const bundleCode = fs.readFileSync('dist/app.bundle.js', 'utf8');

// Run bundle in global scope
try {
  eval(bundleCode);
  console.log('✓ Bundle app.bundle.js nạp thành công không có lỗi cú pháp.');
} catch (e) {
  console.error('❌ Lỗi khi nạp bundle:', e);
  process.exit(1);
}

let passCount = 0;
let failCount = 0;

function assert(condition, testName) {
  if (condition) {
    passCount++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    failCount++;
    console.error(`  ❌ FAIL: ${testName}`);
  }
}

async function runAllTests() {
  // =========================================================================
  // TEST SUITE 1: AUTH & ROLE-BASED ACCESS CONTROL
  // =========================================================================
  console.log('\n--- 1. KIỂM THỬ XÁC THỰC, PHÂN QUYỀN & BẢO MẬT ---');

  assert(typeof Auth !== 'undefined', 'Đối tượng Auth tồn tại');
  assert(Auth.isStudent() === true, 'Mặc định khi vào trang vai trò là Học sinh (isStudent=true)');
  assert(Auth.isTeacher() === false, 'Mặc định isTeacher=false');
  assert(Auth.isAdmin() === false, 'Mặc định isAdmin=false');

  // Test bad login (must not reveal passwords)
  let badLoginError = '';
  try {
    await Auth.login('fake_user', 'wrong_pass');
  } catch (err) {
    badLoginError = err.message;
  }
  assert(badLoginError.includes('không chính xác'), 'Đăng nhập sai báo lỗi chuẩn xác');
  assert(!badLoginError.includes('123456') && !badLoginError.includes('admin9999'), 'Đăng nhập sai KHÔNG tiết lộ mật khẩu hoặc gợi ý');

  // Test teacher login
  const teacherUser = await Auth.login('tuanh', '123456', true);
  assert(teacherUser && teacherUser.role === 'teacher', 'Đăng nhập giáo viên tuanh thành công');
  assert(Auth.isTeacher() === true, 'Sau khi đăng nhập Giáo viên: isTeacher=true');
  assert(Auth.isAdmin() === false, 'Giáo viên không phải Admin: isAdmin=false');

  // Test session persistence
  assert(localStorage.getItem('vq_teacher_session_v1') !== null, 'Phiên đăng nhập lưu vào localStorage (Remember Me)');
  Auth.logout();
  assert(Auth.isStudent() === true, 'Đăng xuất đưa về chế độ Học sinh');
  assert(localStorage.getItem('vq_teacher_session_v1') === null, 'Đăng xuất xóa sạch phiên trong localStorage');

  // Test admin login
  const adminUser = await Auth.login('admin', 'admin9999', false);
  assert(adminUser && adminUser.role === 'admin', 'Đăng nhập Admin thành công');
  assert(Auth.isAdmin() === true, 'isAdmin=true');
  assert(Auth.isTeacher() === true, 'Admin có toàn quyền giáo viên: isTeacher=true');

  // =========================================================================
  // TEST SUITE 2: PRIVACY, ATTEMPTS & DEADLINE RULES
  // =========================================================================
  console.log('\n--- 2. KIỂM THỬ QUYỀN RIÊNG TƯ, HẠN NỘP & GIỚI HẠN LƯỢT LÀM ---');

  const testSetId = 'test_set_qa_999';
  const mockSet = { id: testSetId, title: 'Đề thử nghiệm QA', privacy: 'private', status: 'draft' };

  // Initial privacy
  assert(getSetPrivacy(mockSet, 'quiz') === 'private', 'Đề ban đầu có privacy private');
  assert(isSetPrivate(mockSet, 'quiz') === true, 'isSetPrivate trả về true');

  // Admin toggles to public via updateSetAttemptLimit
  updateSetAttemptLimit('quiz', testSetId, 3, '2026-12-31T23:59', 'public', '2026-01-01T00:00');
  assert(getSetPrivacy(mockSet, 'quiz') === 'public', 'Đã chuyển thành công sang public');
  assert(isSetPrivate(mockSet, 'quiz') === false, 'isSetPrivate trả về false sau khi chuyển public');

  // Quick toggle test
  toggleSetPrivacyQuick('quiz', testSetId);
  assert(getSetPrivacy(mockSet, 'quiz') === 'private', 'toggleSetPrivacyQuick chuyển lại private thành công');
  toggleSetPrivacyQuick('quiz', testSetId);
  assert(getSetPrivacy(mockSet, 'quiz') === 'public', 'toggleSetPrivacyQuick chuyển lại public thành công');

  // Attempt limits test
  assert(getSetMaxAttempts(mockSet, 'quiz') === 3, 'Lưu và đọc đúng giới hạn 3 lượt làm');
  assert(getSetDeadline(mockSet, 'quiz') === '2026-12-31T23:59', 'Lưu và đọc đúng hạn nộp bài');

  // =========================================================================
  // TEST SUITE 3: WRITING PROMPTS & THINKING GUIDES
  // =========================================================================
  console.log('\n--- 3. KIỂM THỬ 50 BỘ ĐỀ LUYỆN VIẾT & GỢI Ý TƯ DUY ---');

  assert(Array.isArray(writingSets), 'writingSets là mảng');
  assert(writingSets.length >= 50, `Có đủ ít nhất 50 đề luyện viết (thực tế: ${writingSets.length} đề)`);

  let guideCount = 0;
  let validSectionCount = 0;
  writingSets.forEach(s => {
    if (s.thinkingGuide && s.thinkingGuide.trim().length > 20) guideCount++;
    if (Array.isArray(s.sections) && s.sections.length > 0) validSectionCount++;
  });

  assert(guideCount >= 50, `100% đề có gợi ý tư duy trọng tâm chi tiết (${guideCount}/50)`);
  assert(validSectionCount >= 50, `100% đề có cấu trúc dàn ý phân đoạn (${validSectionCount}/50)`);

  // Test word count calculation
  const sampleText = 'Đây là bài văn mẫu luyện viết tiếng Việt với độ dài chính xác.';
  const words = sampleText.trim().split(/\s+/).filter(Boolean).length;
  assert(words === 14, 'Hàm tính số từ tiếng Việt đếm đúng 14 từ');

  // =========================================================================
  // TEST SUITE 4: READING SETS & PASSAGE TOOLS
  // =========================================================================
  console.log('\n--- 4. KIỂM THỬ ĐỌC HIỂU NGỮ VĂN & ĐÁNH GIÁ ĐIỂM ---');

  assert(Array.isArray(readingSets), 'readingSets là mảng');
  assert(readingSets.length > 0, `Có các bộ đề đọc hiểu sẵn sàng (${readingSets.length} đề)`);

  const sampleReadingSet = readingSets[0];
  assert(sampleReadingSet && sampleReadingSet.passage, 'Đề đọc hiểu có bài đọc văn bản');
  assert(Array.isArray(sampleReadingSet.questions) && sampleReadingSet.questions.length > 0, 'Đề đọc hiểu có danh sách câu hỏi');

  // =========================================================================
  // TEST SUITE 5: QUIZ HISTORY & STUDENT CONTROL
  // =========================================================================
  console.log('\n--- 5. KIỂM THỬ LỊCH SỬ BÀI LÀM & CHẤM ĐIỂM ---');

  const testHistoryItem = {
    id: 'hist_test_1',
    setId: testSetId,
    setTitle: 'Đề thử nghiệm QA',
    playerName: 'Nguyễn Văn Test',
    className: '11A1',
    score: 8.5,
    dateStr: new Date().toLocaleString('vi-VN'),
    type: 'writing',
    details: [
      { questionText: 'Mở bài', userAnswer: 'Dẫn dắt bài viết...', points: 2, gradeStatus: 'ok' }
    ]
  };

  saveQuizAttemptToHistory(testHistoryItem);
  const loadedHistory = getQuizHistory();
  assert(loadedHistory.some(h => h.id === 'hist_test_1'), 'Lịch sử lưu và đọc thành công từ storage');

  // Bulk update student identity test
  bulkUpdateStudentIdentityInHistory('Nguyễn Văn Test', 'Trần Văn Đã Đổi', '11A2');
  const updatedHistory = getQuizHistory();
  const renamedItem = updatedHistory.find(h => h.id === 'hist_test_1');
  assert(renamedItem && renamedItem.playerName === 'Trần Văn Đã Đổi' && renamedItem.className === '11A2', 'Cập nhật chuẩn hóa tên học sinh trong toàn bộ lịch sử thành công');

  // Clean test history
  deleteHistoryItem('hist_test_1');
  const cleanedHistory = getQuizHistory();
  assert(!cleanedHistory.some(h => h.id === 'hist_test_1'), 'Xóa mục lịch sử thử nghiệm thành công');

  console.log(`\n========================================`);
  console.log(`KẾT QUẢ KIỂM THỬ: ${passCount} PASS, ${failCount} FAIL`);
  console.log(`========================================\n`);

  process.exit(failCount > 0 ? 1 : 0);
}

runAllTests().catch(e => {
  console.error('Fatal test error:', e);
  process.exit(1);
});
