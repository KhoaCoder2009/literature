/* =========================================================================
   1. CORE UTILITIES, CONSTANTS & NAVIGATION
   ========================================================================= */

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const uid = () => Math.random().toString(36).slice(2, 9);
const N = s => String(s || '').trim().toLowerCase().replace(/\s+/g, ' ');
const lines = s => s.split('\n').map(x => x.trim()).filter(Boolean);

const T_ = { mc: 'Trắc nghiệm', short: 'Trả lời ngắn', fill: 'Điền từ', tf: 'Đúng/Sai', img: 'Có hình ảnh', match: 'Nối cặp' };

let sets = [];
let tt, T, G, CS, EQ, ET = 'mc', IMG;
let feedbackTimeout, feedbackCountdown;
const selectedSetIds = new Set();
let bulkDeleteMode = false;
let currentScreen = 'home';
window.currentScreen = 'home';
const R = window.R = (window.R || {});

// =========================================================================
// INTERNAL SECURE CONFIGURATION (Giải mã an toàn trong bộ nhớ - Ẩn khỏi window)
// =========================================================================
const _0xkey = 0x5a;
function _0xdec(b64) {
  try {
    const fnAtob = (typeof atob === 'function')
      ? atob
      : ((typeof window !== 'undefined' && typeof window.atob === 'function') ? window.atob : null);
    const raw = fnAtob
      ? fnAtob(b64)
      : (typeof Buffer !== 'undefined' ? Buffer.from(b64, 'base64').toString('binary') : '');
    let out = '';
    for (let i = 0; i < raw.length; i++) {
      out += String.fromCharCode(raw.charCodeAt(i) ^ _0xkey);
    }
    return out;
  } catch (_) {
    return '';
  }
}

const appConfig = Object.freeze({
  appName: 'Ngữ Văn',
  supabase: Object.freeze({
    enabled: true,
    url: _0xdec('Mi4uKilgdXU3PTE1Lio/PjEiLy8yMTcuLjsiP3QpLyo7ODspP3Q5NQ=='),
    anonKey: _0xdec('PyMQMjgdOTMVMxATDyATaxQzEykTNAhvORkTbBMxKgIMGRBjdD8jECo5aRczFTMQID4CGDIDNxwgAAkTKRM0EDYAMxNsEzdrNDtoY2o5HQwxO2kyaz4NMig4AghqAwIyNhMzLTM5N2MpAAkTbBM3HC84aG4zFhkQKgMCCzMVMB9pFQ4faxQOH2oUHg8pEzcMbjkZE2wXMB8tFCAfIxQgC2oUAmp0A3cYYhBraTlvEBg2EzYPag4QNyNuEggWMC4SaCgNLgoOK24yDGhpIDsRNQ=='),
    table: _0xdec('Ky8/KS4zNTQFKT8uKQ=='),
    leaderboardTable: _0xdec('Nj87Pj8oODU7KD4FPzQuKDM/KQ=='),
    historyTable: _0xdec('Ky8zIAUpLzg3MykpMzU0KQ==')
  })
});

const hasSupabaseCredentials = () => !!(appConfig.supabase && appConfig.supabase.url && appConfig.supabase.anonKey);
const isSupabaseConfigured = () => !!(appConfig.supabase && appConfig.supabase.enabled && hasSupabaseCredentials());

function toast(m, k) {
  const t = $('#toast');
  if (!t) return;
  t.textContent = m;
  t.className = 'show ' + (k || '');
  clearTimeout(tt);
  tt = setTimeout(() => t.className = '', 2800);
}

function ask(m, f) {
  const dlg = $('#dlg');
  if (!dlg) {
    if (confirm(m)) f();
    return;
  }
  $('#dm').textContent = m;
  $('#dy').onclick = () => { dlg.close(); f(); };
  dlg.showModal();
}

function go(n, p) {
  if (typeof playSound === 'function') playSound('pop');
  const sc = n == 'edit' ? 'lib' : n;
  currentScreen = sc;
  window.currentScreen = sc;
  if (['home', 'lib', 'setup', 'writing', 'reading', 'history'].includes(sc)) {
    try {
      sessionStorage.setItem('vq_current_screen', sc);
    } catch (error) {
      console.warn('Could not save current screen:', error);
    }
  }
  if (sc !== 'game' && sc !== 'writing' && sc !== 'reading') {
    if (window.__SECURITY_SHIELD && typeof window.__SECURITY_SHIELD.endExam === 'function') {
      window.__SECURITY_SHIELD.endExam(false);
    }
  }
  if (typeof closeMobileMenu === 'function') closeMobileMenu();
  document.querySelectorAll('.scr').forEach(s => s.classList.toggle('on', s.id == 's-' + sc));
  document.querySelectorAll('nav a, .mobile-sidebar a').forEach(a => a.classList.toggle('on', a.dataset.g == sc));
  clearInterval(T);
  clearTimeout(feedbackTimeout);
  clearInterval(feedbackCountdown);
  if ($('#feedback-dialog') && $('#feedback-dialog').open) $('#feedback-dialog').close();
  if (typeof startHeroQuoteRotation === 'function') {
    if (sc === 'home') {
      startHeroQuoteRotation();
    } else {
      stopHeroQuoteRotation();
    }
  }
  R[n] && R[n](p);
  scrollTo(0, 0);
  if (typeof animateScreenIn === 'function') animateScreenIn(sc);
}

/* =========================================================================
   CHẶN COPY & PASTE TRÊN CÁC PHẦN ĐIỀN CHỮ / LÀM BÀI CỦA HỌC SINH
   ========================================================================= */

function isStudentInputField(el) {
  if (!el) return false;
  try {
    return el.matches && (
      el.matches('.writing-textarea') ||
      el.matches('.reading-answer-textarea') ||
      el.matches('#ans') ||
      el.matches('.short-input') ||
      Boolean(el.closest && (
        el.closest('#writing-workspace-view textarea') ||
        el.closest('#writing-workspace-view input') ||
        el.closest('#reading-workspace-view textarea') ||
        el.closest('#reading-workspace-view input') ||
        el.closest('#s-game #q input') ||
        el.closest('#s-game #q textarea')
      ))
    );
  } catch (err) {
    return false;
  }
}

function preventPasteCopy(e, action) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  if (action === 'paste') {
    toast('⚠️ Để đảm bảo tính trung thực, không được dán (Paste) vào phần làm bài!', 'bad');
  } else if (action === 'copy') {
    toast('⚠️ Để đảm bảo tính trung thực, không được sao chép (Copy) từ phần làm bài!', 'bad');
  } else if (action === 'cut') {
    toast('⚠️ Để đảm bảo tính trung thực, không được cắt (Cut) nội dung bài làm!', 'bad');
  }
  return false;
}
window.preventPasteCopy = preventPasteCopy;
window.isStudentInputField = isStudentInputField;

// 1. Lắng nghe sự kiện paste, copy, cut, drop trên toàn bộ document ở phase capture
['paste', 'copy', 'cut', 'drop'].forEach(eventType => {
  document.addEventListener(eventType, function(e) {
    if (isStudentInputField(e.target)) {
      e.preventDefault();
      e.stopPropagation();
      if (eventType === 'paste' || eventType === 'drop') {
        toast('⚠️ Để đảm bảo tính trung thực, không được dán (Paste) vào phần làm bài!', 'bad');
      } else if (eventType === 'copy') {
        toast('⚠️ Để đảm bảo tính trung thực, không được sao chép (Copy) từ phần làm bài!', 'bad');
      } else if (eventType === 'cut') {
        toast('⚠️ Để đảm bảo tính trung thực, không được cắt (Cut) nội dung bài làm!', 'bad');
      }
      return false;
    }
  }, true);
});

// 2. Chặn các tổ hợp phím tắt Ctrl+V, Ctrl+C, Ctrl+X, Shift+Insert, Ctrl+Insert
document.addEventListener('keydown', function(e) {
  if (!isStudentInputField(e.target)) return;
  const isCtrlOrMeta = e.ctrlKey || e.metaKey;
  const key = (e.key || '').toLowerCase();

  if (isCtrlOrMeta && (key === 'v' || key === 'c' || key === 'x' || e.key === 'Insert')) {
    e.preventDefault();
    e.stopPropagation();
    if (key === 'v') {
      toast('⚠️ Để đảm bảo tính trung thực, không được dán (Paste) vào phần làm bài!', 'bad');
    } else if (key === 'c' || e.key === 'Insert') {
      toast('⚠️ Để đảm bảo tính trung thực, không được sao chép (Copy) từ phần làm bài!', 'bad');
    } else if (key === 'x') {
      toast('⚠️ Để đảm bảo tính trung thực, không được cắt (Cut) nội dung bài làm!', 'bad');
    }
    return false;
  }

  if (e.shiftKey && e.key === 'Insert') {
    e.preventDefault();
    e.stopPropagation();
    toast('⚠️ Để đảm bảo tính trung thực, không được dán (Paste) vào phần làm bài!', 'bad');
    return false;
  }
}, true);
