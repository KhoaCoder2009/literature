/* =========================================================================
   9. APPLICATION INITIALIZATION, MODALS & EVENT HOOKS
   ========================================================================= */

let isProjectorMode = false;
function toggleProjectorMode() {
  isProjectorMode = !isProjectorMode;
  document.body.classList.toggle('projector-mode', isProjectorMode);
  const btn = $('#btn-projector-toggle');
  if (btn) {
    btn.textContent = isProjectorMode ? '🖥️ Tắt máy chiếu' : '🖥️ Máy chiếu';
    btn.classList.toggle('au', isProjectorMode);
    btn.classList.toggle('gh', !isProjectorMode);
  }
  updateSettingsUI();
  toast(isProjectorMode ? 'Đã bật chế độ máy chiếu: Chữ to rõ cho lớp học!' : 'Đã tắt chế độ máy chiếu', 'ok');
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  if (typeof playSound === 'function') playSound('pop');
  if (typeof applyHeroQuote === 'function' && currentScreen === 'home') {
    applyHeroQuote(heroQuoteIndex, false);
  }
  updateSettingsUI();
}

function openSettingsDialog() {
  const dlg = $('#settings-dialog');
  if (dlg) {
    updateSettingsUI();
    dlg.showModal();
    if (typeof playSound === 'function') playSound('pop');
  }
}

function closeSettingsDialog() {
  const dlg = $('#settings-dialog');
  if (dlg && dlg.open) {
    dlg.close();
    if (typeof playSound === 'function') playSound('pop');
  }
}

function updateSettingsUI() {
  const soundBtn = $('#btn-setting-sound');
  if (soundBtn) {
    soundBtn.textContent = soundEnabled ? '🔊 Đang BẬT' : '🔇 Đang TẮT';
    soundBtn.className = 'btn sm settings-action-btn ' + (soundEnabled ? 'au' : 'gh');
  }
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const themeBtn = $('#btn-setting-theme');
  if (themeBtn) {
    themeBtn.textContent = isDark ? '🌙 TỐI' : '☀️ SÁNG';
    themeBtn.className = 'btn sm settings-action-btn ' + (isDark ? 'cy' : 'au');
  }
  const projBtn = $('#btn-setting-projector');
  if (projBtn) {
    projBtn.textContent = isProjectorMode ? '🖥️ BẬT' : '🖥️ TẮT';
    projBtn.className = 'btn sm settings-action-btn ' + (isProjectorMode ? 'au' : 'gh');
  }
}

function toggleMobileMenu() {
  if (document.body.classList.contains('mobile-menu-open')) {
    closeMobileMenu();
    return;
  }
  document.body.classList.add('mobile-menu-open');
  $('.mobile-menu-toggle')?.setAttribute('aria-expanded', 'true');
  $('.mobile-menu-toggle')?.setAttribute('aria-label', 'Đóng menu');
  const sidebar = $('.mobile-sidebar');
  if (sidebar) {
    sidebar.setAttribute('aria-hidden', 'false');
    sidebar.inert = false;
    sidebar.querySelector('a')?.focus();
  }
}

function closeMobileMenu() {
  const wasOpen = document.body.classList.contains('mobile-menu-open');
  document.body.classList.remove('mobile-menu-open');
  const toggle = $('.mobile-menu-toggle');
  const sidebar = $('.mobile-sidebar');
  if (toggle) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Mở menu');
    if (wasOpen) toggle.focus();
  }
  if (sidebar) {
    sidebar.setAttribute('aria-hidden', 'true');
    sidebar.inert = true;
  }
}

// Global button sound effects
document.addEventListener('click', e => {
  const target = e.target.closest('button');
  if (!target || !soundEnabled) return;
  const action = target.getAttribute('onclick') || '';
  if (
    action.includes('pick(') ||
    action.includes('chooseTf(') ||
    action.includes('submitTf(') ||
    action.includes('sub(') ||
    action.includes('toggleSound(') ||
    action.includes('advanceAfterFeedback(')
  ) return;
  if (typeof playSound === 'function') playSound('pop');
});

// Setup input persistence
$('#nick')?.addEventListener('input', () => {
  try { localStorage.setItem('vq_player_nick', $('#nick').value.trim()); } catch (e) {}
});
$('#class-name')?.addEventListener('input', () => {
  try { localStorage.setItem('vq_player_class', $('#class-name').value.trim()); } catch (e) {}
});

// Prompt events
$('#prompt-question-count')?.addEventListener('change', updatePromptSourceRequirement);
$('#prompt-source')?.addEventListener('input', updatePromptSourceRequirement);

// Back to top button
const backToTopBtn = $('#back-to-top');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });
}

// App startup
let initialScreen = 'home';
try {
  const savedScreen = sessionStorage.getItem('vq_current_screen');
  if (savedScreen && ['home', 'lib', 'setup'].includes(savedScreen)) {
    initialScreen = savedScreen;
  }
} catch (error) {
  console.warn('Could not read saved screen:', error);
}

go(initialScreen);
updateSettingsUI();
if (typeof applyHeroQuote === 'function') applyHeroQuote(0, false);
if (initialScreen === 'home' && typeof startHeroQuoteRotation === 'function') {
  startHeroQuoteRotation();
}

async function initPersistedData() {
  const fromSupabase = await loadSetsFromSupabase();
  if (!fromSupabase) {
    try { const x = JSON.parse(localStorage.vq_cartoon); if (Array.isArray(x) && x.length) sets = x; } catch (e) {}
  }
  sets = sets.filter(s => !String(s.id).startsWith('set_'));
  save();
  if (typeof renderHomeSets === 'function') renderHomeSets();
}

initPersistedData().then(() => {
  if (currentScreen === 'lib') R.lib();
  if (currentScreen === 'home') R.home();
});

// Clean up any legacy SGK theme attributes
try {
  localStorage.removeItem('vq_sgk_theme');
  localStorage.removeItem('vq_sgk_autorotate');
  document.documentElement.removeAttribute('data-sgk-theme');
} catch(e) {}
