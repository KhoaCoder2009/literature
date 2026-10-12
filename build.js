/**
 * =========================================================================
 * PRODUCTION BUILD & BUNDLING SYSTEM
 * Đóng gói tự động:
 * 1. Tất cả CSS (style.css, writing.css, reading.css) -> dist/app.bundle.css
 * 2. Tất cả HTML Components (components/*.html) -> nhúng trực tiếp vào bundle
 * 3. Tất cả JS (security.js, config.js, core, audio, visuals, storage, library,
 *    prompt, editor, gameplay, writing, reading, app) -> dist/app.bundle.js
 * 4. Tự động kích hoạt lớp bảo vệ chống can thiệp Console và DevTools
 * 5. Cập nhật index.html chỉ nạp dist/app.bundle.css & dist/app.bundle.js
 *
 * Chạy lệnh: node build.js
 * =========================================================================
 */

const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const distDir = path.join(rootDir, 'dist');
const componentsDir = path.join(rootDir, 'components');
const cssDir = path.join(rootDir, 'css');
const jsDir = path.join(rootDir, 'js');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

console.log('🚀 Bắt đầu quá trình đóng gói và bảo mật mã nguồn...\n');

// ---------------------------------------------------------------------------
// 1. ĐÓNG GÓI HTML COMPONENTS
// ---------------------------------------------------------------------------
const componentFiles = [
  { name: 'navbar', file: 'navbar.html' },
  { name: 'settings-dialog', file: 'settings-dialog.html' },
  { name: 'screen-home', file: 'screen-home.html' },
  { name: 'screen-lib', file: 'screen-lib.html' },
  { name: 'screen-setup', file: 'screen-setup.html' },
  { name: 'screen-game', file: 'screen-game.html' },
  { name: 'screen-res', file: 'screen-res.html' },
  { name: 'screen-writing', file: 'screen-writing.html' },
  { name: 'screen-reading', file: 'screen-reading.html' },
  { name: 'screen-history', file: 'screen-history.html' },
  { name: 'dialogs', file: 'dialogs.html' }
];

const components = {};
componentFiles.forEach(({ name, file }) => {
  const filePath = path.join(componentsDir, file);
  if (fs.existsSync(filePath)) {
    components[name] = fs.readFileSync(filePath, 'utf8').trim();
    console.log(`  ✓ Đã nạp component: ${file}`);
  } else {
    console.warn(`  ! Cảnh báo: Không tìm thấy ${file}`);
  }
});

const componentsJsContent = `/* =========================================================================
   COMPONENTS BUNDLE & SYNCHRONOUS DOM INJECTOR
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

// Ghi đồng thời vào components/components.js để phục vụ dev
fs.writeFileSync(path.join(componentsDir, 'components.js'), componentsJsContent, 'utf8');

// ---------------------------------------------------------------------------
// 2. ĐÓNG GÓI TẤT CẢ CSS -> dist/app.bundle.css
// ---------------------------------------------------------------------------
const cssFiles = [
  path.join(cssDir, 'style.css'),
  path.join(cssDir, 'writing.css'),
  path.join(cssDir, 'reading.css')
];

let bundleCssContent = `/* =========================================================================
   APPLICATION STYLESHEET BUNDLE (TỰ ĐỘNG ĐÓNG GÓI)
   ========================================================================= */\n\n`;

cssFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    bundleCssContent += content + '\n\n';
    console.log(`  ✓ Đã gộp CSS: ${path.basename(file)}`);
  } else {
    console.warn(`  ! Không tìm thấy CSS: ${file}`);
  }
});

const outputCssPath = path.join(distDir, 'app.bundle.css');
fs.writeFileSync(outputCssPath, bundleCssContent, 'utf8');
console.log(`\n📦 Đã xuất CSS bundle: dist/app.bundle.css (${(bundleCssContent.length / 1024).toFixed(1)} KB)`);

// ---------------------------------------------------------------------------
// 3. ĐÓNG GÓI TẤT CẢ JS & BẢO MẬT -> dist/app.bundle.js
// ---------------------------------------------------------------------------
const jsOrder = [
  path.join(jsDir, 'security.js'),
  path.join(jsDir, 'core.js'),
  path.join(jsDir, 'audio.js'),
  path.join(jsDir, 'visuals.js'),
  path.join(jsDir, 'storage.js'),
  path.join(jsDir, 'library.js'),
  path.join(jsDir, 'prompt.js'),
  path.join(jsDir, 'editor.js'),
  path.join(jsDir, 'gameplay.js'),
  path.join(jsDir, 'writing.js'),
  path.join(jsDir, 'reading.js'),
  path.join(jsDir, 'app.js')
];

let bundleJsContent = `/* =========================================================================
   APPLICATION SECURE DISTRIBUTION BUNDLE
   Bảo mật & đóng gói toàn bộ logic - Chống can thiệp Console và DevTools
   ========================================================================= */\n\n`;

// Thêm phần components & DOM injector vào đầu
bundleJsContent += componentsJsContent + '\n\n';

jsOrder.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    bundleJsContent += content + '\n\n';
    console.log(`  ✓ Đã gộp Script: ${path.basename(file)}`);
  } else {
    console.warn(`  ! Không tìm thấy Script: ${file}`);
  }
});

// Thêm tầng khóa cứng bảo mật (Lockdown) ở cuối bundle
const securityLockdownSnippet = `
/* =========================================================================
   SECURITY LOCKDOWN: KHÓA CỨNG TOÀN BỘ HÀM VÀ ĐỐI TƯỢNG TOÀN CỤC
   Ngăn chặn hoàn toàn việc sửa đổi, ghi đè hoặc hack điểm qua DevTools Console
   ========================================================================= */
(function applyConsoleTamperProofing() {
  if (!window.__SECURITY_SHIELD || typeof window.__SECURITY_SHIELD.freezeGlobal !== 'function') return;

  const freezeFn = window.__SECURITY_SHIELD.freezeGlobal;
  const freezeObj = window.__SECURITY_SHIELD.freezeObject;

  // 1. Đóng băng cấu hình và bộ đối tượng
  if (window.COMPONENTS) freezeObj('COMPONENTS', window.COMPONENTS);
  if (typeof T_ !== 'undefined') freezeObj('T_', T_);
  if (window.R) freezeObj('R', window.R);

  // 2. Khóa cứng toàn bộ hàm gọi từ DOM & giao diện bài làm
  const protectedFunctionList = [
    '$', '$$', 'esc', 'uid', 'toast', 'ask', 'go',
    'preventPasteCopy', 'isStudentInputField',
    'toggleSound', 'playSound', 'playNote', 'toggleTheme', 'toggleProjectorMode',
    'openSettingsDialog', 'closeSettingsDialog', 'updateSettingsUI',
    'toggleMobileMenu', 'closeMobileMenu',
    'saveScoreToLeaderboard', 'getQuizHistory', 'saveQuizAttemptToHistory',
    'deleteHistoryItem', 'clearAllQuizHistory', 'loadQuizHistoryFromSupabase',
    'setHistoryTypeFilter', 'onHistoryPageSearchInput', 'onHistoryPageSetFilterChange',
    'clearHistoryPageSetFilter', 'viewHistoryDetail', 'closeHistoryDetailModal',
    'closeHistoryModal', 'openHistoryForSet', 'toggleHistoryGradingMode',
    'gradeAllQuestionsQuick', 'setQuestionPointQuick', 'setQuestionGradeStatus',
    'appendQuickQuestionComment', 'applyQuickGeneralFeedback', 'saveManualGrading',
    'switchLibTab', 'clearLibSearch', 'onLibSearchInput',
    'enableBulkDeleteMode', 'cancelBulkDeleteMode', 'deleteSelectedSets',
    'newSet', 'del', 'openPromptDialog', 'close',
    'openQuickImportModal', 'closeQuickImportModal', 'handleQuickImportSubmit',
    'selectEmoji', 'toggleEmojiPicker', 'setT', 'saveQ', 'renderQs', 'pickImg',
    'setTopicFilter', 'filterWritingCategory', 'onWritingSearchInput',
    'promptAddNewCategory', 'promptDeleteCurrentCategory', 'promptDeleteCategory',
    'openCreateWritingSetModal', 'closeCreateWritingSetModal', 'handleSaveWritingSet',
    'editWritingSet', 'openEditWritingSetModal', 'deleteWritingSet',
    'deleteCurrentOpenedWritingSet', 'openWritingWorkspaceById', 'exitWritingWorkspace',
    'toggleWritingTimer', 'togglePromptExpand', 'clearSectionText',
    'applyQuickOutlineTemplate', 'addNewOutlineSectionRow', 'removeModalSectionRow',
    'copyCombinedEssayToClipboard', 'downloadCombinedEssayAsText',
    'openWritingReviewModal', 'closeWritingReviewModal', 'submitWritingEssay',
    'getWritingSectionMaxScore',
    'setReadingCategoryFilter', 'onReadingSearchInput', 'onLibReadingSearchInput',
    'promptAddNewReadingCategory', 'promptDeleteCurrentReadingCategory',
    'openCreateReadingSetModal', 'closeReadingEditModal', 'handleReadingFormSubmit',
    'openEditReadingSetModal', 'deleteReadingSet', 'deleteCurrentOpenedReadingSet',
    'openReadingSet', 'exitReadingWorkspace', 'changePassageFontSize',
    'toggleReadingAnswersGuide', 'resetCurrentReadingDraft', 'submitReadingAnswers',
    'closeReadingResultModal', 'addQuestionToReadingForm', 'applyStandard5QuestionTemplate',
    'autoCalculateTotalPoints', 'setCorrectAnswer', 'toggleTfEditorItem',
    'selectAndStartSetupQuiz', 'handleStartQuizSubmit', 'closeStartQuizModal',
    'updateSetupQuestionCount', 'setSetupTopicFilter', 'onSetupSearchInput',
    'pick', 'chooseTf', 'submitTf', 'sub', 'advanceAfterFeedback', 'replay',
    'resetLbFilters', 'renderLeaderboard',
    'openExternalAI', 'importPromptQuestionSet', 'copyQuestionPrompt', 'buildQuestionPrompt',
    'adjustPromptTypeCount', 'autoDistributePromptTypes', 'onPromptTypeToggle',
    'onPromptTotalCountChange', 'onPromptTypeCountInput'
  ];

  protectedFunctionList.forEach(name => {
    try {
      if (typeof window[name] === 'function') {
        freezeFn(name, window[name]);
      }
    } catch (_) {}
  });

  try {
    Object.seal(window.R);
  } catch (_) {}
})();
`;

bundleJsContent += securityLockdownSnippet;

const outputJsPath = path.join(distDir, 'app.bundle.js');
fs.writeFileSync(outputJsPath, bundleJsContent, 'utf8');
console.log(`\n📦 Đã xuất JS bundle: dist/app.bundle.js (${(bundleJsContent.length / 1024).toFixed(1)} KB)`);

// ---------------------------------------------------------------------------
// 4. CẬP NHẬT index.html CHỈ SỬ DỤNG BUNDLE (ẨN TẤT CẢ TÊN FILE NGUYÊN BẢN)
// ---------------------------------------------------------------------------
const indexPath = path.join(rootDir, 'index.html');
if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, 'utf8');

  // Thay thế các link CSS riêng lẻ bằng 1 link bundle duy nhất
  const cssPattern = /<!--[\s\S]*?-->|<link\s+rel="stylesheet"\s+href="\.\/css\/[^"]+"\s*\/?>(\r?\n)*/gi;
  // Thay thế vùng CSS
  html = html.replace(
    /(<link\s+rel="stylesheet"\s+href="\.\/css\/style\.css[^"]*">)[\s\S]*?(<link\s+rel="stylesheet"\s+href="\.\/css\/reading\.css[^"]*">)/i,
    '<link rel="stylesheet" href="./dist/app.bundle.css?v=3.0">'
  );

  // Thay thế các thẻ script riêng lẻ bằng 1 bundle script duy nhất
  html = html.replace(
    /(<script\s+src="\.\/config\.js[^"]*"><\/script>)[\s\S]*?(<script\s+src="\.\/js\/app\.js[^"]*"><\/script>)/i,
    '<script src="./dist/app.bundle.js?v=3.0"></script>'
  );

  fs.writeFileSync(indexPath, html, 'utf8');
  console.log('✓ Đã cập nhật index.html sang chế độ Bundle duy nhất (ẩn hoàn toàn các tên file nguồn)');
}

console.log('\n🎉 BUILD THÀNH CÔNG! Website đã được sắp xếp gọn gàng và khóa bảo mật Console tối đa!');
