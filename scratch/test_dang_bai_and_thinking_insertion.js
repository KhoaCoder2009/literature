/**
 * Test Suite: Tự động phân loại theo Dạng bài & Chèn Gợi ý tư duy
 */
const fs = require('fs');
const path = require('path');

const bundleJs = fs.readFileSync(path.join(__dirname, '../dist/app.bundle.js'), 'utf8');

const elements = {};
function getOrCreateElement(id) {
  if (!elements[id]) {
    elements[id] = {
      id,
      style: {},
      classList: {
        contains: (c) => false,
        add: () => {},
        remove: () => {}
      },
      value: '',
      innerHTML: '',
      textContent: '',
      querySelector: () => null,
      dispatchEvent: () => {},
      focus: () => {},
      addEventListener: () => {}
    };
  }
  return elements[id];
}

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
  getElementById: (id) => getOrCreateElement(id),
  querySelector: (sel) => getOrCreateElement('mock_' + sel.replace(/[^a-zA-Z0-9_-]/g, '_')),
  addEventListener: () => {}
};
global.navigator = { clipboard: { writeText: async () => {} } };
global.location = { hash: '', reload: () => {} };
global.toast = () => {};
global.awardCustomGamificationPoints = () => {};

eval(bundleJs);

console.log('🧪 Bắt đầu kiểm thử tính năng Tự xếp theo Dạng & Chèn Gợi ý tư duy...\n');

let pass = 0, fail = 0;
function assert(cond, msg) {
  if (cond) {
    console.log(`  ✓ PASS: ${msg}`);
    pass++;
  } else {
    console.error(`  ✗ FAIL: ${msg}`);
    fail++;
  }
}

// 1. Kiểm tra 50 đề luyện viết có đủ subType chuẩn
assert(Array.isArray(window.writingSets), 'writingSets là mảng');
assert(window.writingSets.length >= 50, `Có ${window.writingSets.length} đề luyện viết`);

// Kiểm tra 1 đề truyện ngắn (Đề 21 - tiếng chửi Chí Phèo)
const setTruyen = window.writingSets.find(s => s.id === 'doan_nlvh_01');
assert(Boolean(setTruyen), 'Tìm thấy Đề 21 (doan_nlvh_01)');
assert(setTruyen.subType === 'nlvh_doan_nt_truyen', `Đề 21 có subType là nlvh_doan_nt_truyen (thực tế: ${setTruyen.subType})`);

// 2. Mở đề truyện ngắn và kiểm tra renderWorkspaceThinkingGuide
window.currentWritingSet = setTruyen;
window.renderWorkspaceThinkingGuide(setTruyen);

const bodyEl = document.getElementById('workspace-thinking-guide-body');
assert(Boolean(bodyEl.innerHTML), 'workspace-thinking-guide-body đã render HTML');
assert(bodyEl.innerHTML.includes('nlvh_doan_nt_truyen" selected'), 'Dropdown Dạng bài tự động chọn đúng nlvh_doan_nt_truyen');
assert(bodyEl.innerHTML.includes('Bám sát các yếu tố tự sự: ngôi kể, điểm nhìn, tình huống'), 'Hiển thị đúng Quy tắc hình thức của dạng nghệ thuật truyện ngắn');
assert(bodyEl.innerHTML.includes('Ngôi kể &amp; Điểm nhìn') || bodyEl.innerHTML.includes('Ngôi kể & Điểm nhìn'), 'Hiển thị đúng Quy trình các bước triển khai');
assert(bodyEl.innerHTML.includes('Tình huống truyện độc đáo'), 'Hiển thị đúng Từ khóa gợi ý theo đề');
assert(bodyEl.innerHTML.includes('Thứ nhất,'), 'Hiển thị đúng Cụm từ dẫn luận điểm');
assert(bodyEl.innerHTML.includes('GỢI Ý TƯ DUY TRỌNG TÂM CỦA ĐỀ NÀY'), 'Hiển thị khung Gợi ý tư duy trọng tâm');

// 3. Kiểm tra chèn gợi ý vào ô bài viết
const mockTextarea = document.getElementById('sec-input-sec_doan_200');
mockTextarea.value = '';
mockTextarea.classList.contains = (c) => c === 'writing-textarea';

window.insertSetThinkingGuideToActiveSection();
assert(mockTextarea.value.includes('[GỢI Ý TƯ DUY ĐỊNH HƯỚNG]:'), 'Chèn thành công Gợi ý tư duy vào bài viết');
assert(mockTextarea.value.includes('Chi tiết nghệ thuật đặc sắc'), 'Nội dung gợi ý đề 21 xuất hiện trong ô bài viết');

// 4. Kiểm tra chèn sườn dàn ý
mockTextarea.value = '';
window.insertScaffoldFormulaOutline();
assert(mockTextarea.value.includes('[KHUNG SƯỜN DÀN Ý'), 'Chèn thành công Khung sườn dàn ý vào bài viết');
assert(mockTextarea.value.includes('Tình huống truyện'), 'Sườn dàn ý chứa bước Tình huống truyện');

// 5. Kiểm tra chèn từ khóa gợi ý và cụm từ dẫn
mockTextarea.value = 'Đoạn văn bắt đầu.';
window.insertTextIntoActiveWritingSection('Tình huống truyện độc đáo');
assert(mockTextarea.value.includes('Tình huống truyện độc đáo'), 'Chèn từ khóa thành công vào cuối bài');

// 6. Kiểm tra chuyển đổi dạng bài trên dropdown
window.onScaffoldTemplateChange('nlxh_doan_tachai');
assert(bodyEl.innerHTML.includes('nlxh_doan_tachai" selected'), 'Chuyển đổi thành công sang dạng Tác hại / Hậu quả');
assert(bodyEl.innerHTML.includes('TÁC HẠI / HẬU QUẢ'), 'Nội dung hiển thị theo dạng mới');

console.log(`\n========================================`);
console.log(`KẾT QUẢ KIỂM THỬ: ${pass} PASS, ${fail} FAIL`);
console.log(`========================================\n`);

if (fail > 0) process.exit(1);
