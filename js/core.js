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
const R = window.R = (window.R || {});

const appConfig = window.APP_CONFIG || {};
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
  if (['home', 'lib', 'setup', 'writing', 'reading', 'history'].includes(sc)) {
    try {
      sessionStorage.setItem('vq_current_screen', sc);
    } catch (error) {
      console.warn('Could not save current screen:', error);
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
