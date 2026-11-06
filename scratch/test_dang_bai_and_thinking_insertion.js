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
assert(bodyEl.innerHTML.includes('nlvh_doan_nt_truyen" selected'), 'Dropdown Dạng bài tự động chọn đúng nlvh_doan_nt_truyen cho đề truyện');
assert(bodyEl.innerHTML.includes('Bám sát các yếu tố tự sự: ngôi kể, điểm nhìn, tình huống'), 'Hiển thị đúng Quy tắc hình thức của dạng nghệ thuật truyện ngắn');
assert(bodyEl.innerHTML.includes('Ngôi kể &amp; Điểm nhìn') || bodyEl.innerHTML.includes('Ngôi kể & Điểm nhìn'), 'Hiển thị đúng Quy trình các bước triển khai');
assert(bodyEl.innerHTML.includes('Tình huống truyện độc đáo'), 'Hiển thị đúng Từ khóa gợi ý theo đề truyện');
assert(bodyEl.innerHTML.includes('Thứ nhất,'), 'Hiển thị đúng Cụm từ dẫn luận điểm');
assert(bodyEl.innerHTML.includes('GỢI Ý TƯ DUY TRỌNG TÂM'), 'Hiển thị khung Gợi ý tư duy trọng tâm');
assert(bodyEl.innerHTML.includes('scaffold-kw-chip-static'), 'Từ khóa là thẻ span tĩnh (chỉ đọc, không chèn tự động)');

// 3. Mở đề NLXH "Áp lực tạo nên kim cương" (Đề 1) và kiểm tra tính chính xác tuyệt đối
const setNLXH = window.writingSets.find(s => s.id === 'doan_nlxh_01');
assert(Boolean(setNLXH), 'Tìm thấy Đề 1 NLXH (doan_nlxh_01)');
window.currentWritingSet = setNLXH;
window.renderWorkspaceThinkingGuide(setNLXH);
assert(bodyEl.innerHTML.includes('nlxh_doan_ynghia" selected'), 'Đề "Áp lực tạo nên kim cương" tự động chọn đúng dạng Đoạn NLXH (nlxh_doan_ynghia)');
assert(bodyEl.innerHTML.includes('Thử thách tôi luyện bản lĩnh'), 'Hiển thị từ khóa chuẩn theo đề: "Thử thách tôi luyện bản lĩnh"');
assert(bodyEl.innerHTML.includes('Biến áp lực thành động lực'), 'Hiển thị từ khóa chuẩn theo đề: "Biến áp lực thành động lực"');
assert(!bodyEl.innerHTML.includes('Tình huống truyện độc đáo'), 'Đề NLXH không bị nhầm lẫn từ khóa của truyện ngắn');
assert(!bodyEl.innerHTML.includes('Bấm để chèn vào phần đang viết'), 'Không còn dòng chữ kêu gọi bấm chèn vào bài');

// 4. Kiểm tra nguyên tắc Sư phạm: Không chèn hay ghi đè bài của học sinh
const mockTextarea = document.getElementById('sec-input-sec_doan_200');
mockTextarea.value = 'Bài làm của học sinh...';
mockTextarea.classList.contains = (c) => c === 'writing-textarea';

window.insertSetThinkingGuideToActiveSection();
assert(mockTextarea.value === 'Bài làm của học sinh...', 'Gợi ý tư duy thuần túy để đọc, không tự ý chèn đè bài của học sinh');

window.insertScaffoldFormulaOutline();
assert(mockTextarea.value === 'Bài làm của học sinh...', 'Khung sườn thuần túy để đọc tham khảo, không tự ý chèn đè bài');

window.insertTextIntoActiveWritingSection('Thử thách tôi luyện bản lĩnh');
assert(mockTextarea.value === 'Bài làm của học sinh...', 'Từ khóa thuần túy để đọc tham khảo, không chèn đè vào ô bài viết');

// 5. Kiểm tra chuyển đổi dạng bài trên dropdown
window.onScaffoldTemplateChange('nlxh_doan_tachai');
assert(bodyEl.innerHTML.includes('nlxh_doan_tachai" selected'), 'Chuyển đổi thành công sang dạng Tác hại / Hậu quả');
assert(bodyEl.innerHTML.includes('TÁC HẠI / HẬU QUẢ'), 'Nội dung hiển thị theo dạng mới');

console.log(`\n========================================`);
console.log(`KẾT QUẢ KIỂM THỬ: ${pass} PASS, ${fail} FAIL`);
console.log(`========================================\n`);

if (fail > 0) process.exit(1);
