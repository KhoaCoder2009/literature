/**
 * BUILD SCRIPT
 * Chạy lệnh: node build.js
 * Tự động đóng gói tất cả các file HTML trong thư mục components/ vào components/components.js
 */

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');
const files = [
  { name: 'navbar', file: 'navbar.html' },
  { name: 'settings-dialog', file: 'settings-dialog.html' },
  { name: 'screen-home', file: 'screen-home.html' },
  { name: 'screen-lib', file: 'screen-lib.html' },
  { name: 'screen-setup', file: 'screen-setup.html' },
  { name: 'screen-game', file: 'screen-game.html' },
  { name: 'screen-res', file: 'screen-res.html' },
  { name: 'dialogs', file: 'dialogs.html' }
];

const components = {};

files.forEach(({ name, file }) => {
  const filePath = path.join(componentsDir, file);
  if (fs.existsSync(filePath)) {
    components[name] = fs.readFileSync(filePath, 'utf8').trim();
    console.log(`✓ Đã nạp component: ${file}`);
  } else {
    console.warn(`! Không tìm thấy file: ${file}`);
  }
});

const outputJs = `/* =========================================================================
   COMPONENTS BUNDLE & SYNCHRONOUS DOM INJECTOR
   Tự động sinh bởi build.js - Không cần chỉnh sửa thủ công file này
   ========================================================================= */

window.COMPONENTS = ${JSON.stringify(components, null, 2)};

(function renderModularComponents() {
  document.querySelectorAll('[data-component]').forEach(placeholder => {
    const name = placeholder.getAttribute('data-component');
    const markup = window.COMPONENTS[name];
    if (markup) {
      const fragment = document.createRange().createContextualFragment(markup);
      placeholder.replaceWith(fragment);
    }
  });
})();
`;

fs.writeFileSync(path.join(componentsDir, 'components.js'), outputJs, 'utf8');
console.log('\n🎉 Đã cập nhật thành công components/components.js!');
