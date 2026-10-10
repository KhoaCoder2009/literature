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
const R = {};

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
  if (['home', 'lib', 'setup'].includes(sc)) {
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
