/**
 * =========================================================================
 * BẢO MẬT NÂNG CAO & CHỐNG CAN THIỆP CONSOLE / DEVTOOLS
 * Hệ thống chống gian lận, chống sửa đổi mã nguồn và bảo vệ bài thi
 * =========================================================================
 */

(function initSecurityShield() {
  'use strict';

  // 0. THÔNG BÁO BẢO MẬT GIAO DIỆN
  function showSecurityNotice(msg) {
    if (typeof window.toast === 'function') {
      window.toast(msg, 'bad');
    } else {
      const existing = document.getElementById('sec-warning-toast');
      if (existing) existing.remove();
      const div = document.createElement('div');
      div.id = 'sec-warning-toast';
      div.textContent = msg;
      div.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#ef4444;color:#fff;padding:12px 24px;border-radius:12px;font-family:sans-serif;font-weight:700;font-size:14px;box-shadow:0 8px 30px rgba(0,0,0,0.3);z-index:2147483647;transition:all 0.3s ease;';
      if (document.body) {
        document.body.appendChild(div);
      } else if (document.documentElement) {
        document.documentElement.appendChild(div);
      }
      setTimeout(() => {
        try { div.remove(); } catch (_) {}
      }, 2800);
    }
  }

  // 1. CHẶN TRIỆT ĐỂ CÁC TỔ HỢP PHÍM TẮT DEVTOOLS (CTRL+SHIFT+I, F12,...)
  function isDevToolsShortcut(e) {
    const key = (e.key || '').toUpperCase();
    const code = e.code || '';
    const keyCode = e.keyCode || e.which || 0;
    const ctrlOrMeta = Boolean(e.ctrlKey || e.metaKey);
    const shift = Boolean(e.shiftKey);
    const alt = Boolean(e.altKey);

    // F12 (Phím mở DevTools trực tiếp)
    if (key === 'F12' || code === 'F12' || keyCode === 123) {
      return true;
    }

    // Ctrl + Shift + I hoặc Cmd + Option + I (Công cụ cho nhà phát triển)
    const isI = key === 'I' || code === 'KeyI' || keyCode === 73;
    if ((ctrlOrMeta && shift && isI) || (ctrlOrMeta && alt && isI)) {
      return true;
    }

    // Ctrl + Shift + J hoặc Cmd + Option + J (Mở trực tiếp Console)
    const isJ = key === 'J' || code === 'KeyJ' || keyCode === 74;
    if ((ctrlOrMeta && shift && isJ) || (ctrlOrMeta && alt && isJ)) {
      return true;
    }

    // Ctrl + Shift + C hoặc Cmd + Option + C (Inspect Element / Soi phần tử)
    const isC = key === 'C' || code === 'KeyC' || keyCode === 67;
    if ((ctrlOrMeta && shift && isC) || (ctrlOrMeta && alt && isC)) {
      return true;
    }

    // Ctrl + Shift + K (Web Console Firefox)
    const isK = key === 'K' || code === 'KeyK' || keyCode === 75;
    if (ctrlOrMeta && shift && isK) {
      return true;
    }

    // Ctrl + Shift + E (Network Tab Firefox)
    const isE = key === 'E' || code === 'KeyE' || keyCode === 69;
    if (ctrlOrMeta && shift && isE) {
      return true;
    }

    // Ctrl + U hoặc Cmd + Option + U (Xem mã nguồn trang / View Source)
    const isU = key === 'U' || code === 'KeyU' || keyCode === 85;
    if (ctrlOrMeta && isU) {
      return true;
    }

    // Ctrl + S (Lưu trang web)
    const isS = key === 'S' || code === 'KeyS' || keyCode === 83;
    if (ctrlOrMeta && isS) {
      return true;
    }

    // Shift + F10 (Phím mở menu chuột phải Windows)
    if (shift && (key === 'F10' || code === 'F10' || keyCode === 121)) {
      return true;
    }

    return false;
  }

  function handleSecurityHotkeys(e) {
    if (isDevToolsShortcut(e)) {
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === 'function') {
        e.stopImmediatePropagation();
      }
      e.returnValue = false;
      showSecurityNotice('⚠️ Thao tác mở DevTools (Ctrl+Shift+I / F12) đã bị vô hiệu hóa hoàn toàn!');
      return false;
    }
  }

  ['keydown', 'keyup'].forEach(eventType => {
    window.addEventListener(eventType, handleSecurityHotkeys, true);
    document.addEventListener(eventType, handleSecurityHotkeys, true);
  });

  // 2. CHẶN TRIỆT ĐỂ MENU NGỮ CẢNH (CONTEXTMENU, CHUỘT PHẢI, MICROSOFT EDITOR)
  function blockContextMenuEvent(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === 'function') {
        e.stopImmediatePropagation();
      }
    }
    return false;
  }

  // Khóa cứng contextmenu ở mọi tầng (window, document, capture & bubble)
  window.addEventListener('contextmenu', blockContextMenuEvent, true);
  document.addEventListener('contextmenu', blockContextMenuEvent, true);
  window.oncontextmenu = blockContextMenuEvent;
  document.oncontextmenu = blockContextMenuEvent;

  // Chặn các nút chuột phụ (chuột phải, nút giữa) trên mousedown, mouseup, pointerdown, auxclick
  ['mousedown', 'mouseup', 'pointerdown', 'pointerup', 'auxclick'].forEach(eventType => {
    document.addEventListener(eventType, function(e) {
      if (e.button === 2 || e.which === 3) {
        blockContextMenuEvent(e);
        return false;
      }
    }, true);
  });

  // 3. VÔ HIỆU HÓA HOÀN TOÀN MICROSOFT EDITOR & KIỂM TRA CHÍNH TẢ (CHỐNG BUNG MENU KHI NHẤN CHUỘT TRÁI)
  function disableEditorAndSpellcheck(el) {
    if (!el || el.nodeType !== 1) return;
    try {
      el.spellcheck = false;
      el.setAttribute('spellcheck', 'false');
      el.setAttribute('data-ms-editor', 'false');
      el.setAttribute('autocomplete', 'off');
      el.setAttribute('autocorrect', 'off');
      el.setAttribute('autocapitalize', 'off');
      el.oncontextmenu = blockContextMenuEvent;
    } catch (_) {}
  }

  function sanitizeAllInputs() {
    try {
      document.querySelectorAll('input, textarea, [contenteditable]').forEach(disableEditorAndSpellcheck);
      if (document.documentElement) {
        document.documentElement.setAttribute('data-ms-editor', 'false');
        document.documentElement.setAttribute('spellcheck', 'false');
      }
      if (document.body) {
        document.body.setAttribute('data-ms-editor', 'false');
        document.body.setAttribute('spellcheck', 'false');
      }
    } catch (_) {}
  }

  // Chạy ngay và theo dõi mọi element mới sinh ra qua MutationObserver
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', sanitizeAllInputs);
  } else {
    sanitizeAllInputs();
  }

  try {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(m => {
        m.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            if (node.matches && node.matches('input, textarea, [contenteditable]')) {
              disableEditorAndSpellcheck(node);
            }
            if (node.querySelectorAll) {
              node.querySelectorAll('input, textarea, [contenteditable]').forEach(disableEditorAndSpellcheck);
            }
          }
        });
      });
    });
    observer.observe(document.documentElement || document.body, { childList: true, subtree: true });
  } catch (_) {}

  // Đảm bảo khi focus/click chuột trái vào bất kỳ ô nhập liệu nào cũng luôn tắt spellcheck
  document.addEventListener('focusin', function(e) {
    if (e.target && (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT')) {
      disableEditorAndSpellcheck(e.target);
    }
  }, true);

  // 4. CHỐNG KÉO THẢ SOURCE & CHỐNG KÉO ẢNH
  document.addEventListener('dragstart', function(e) {
    if (e.target && (e.target.nodeName === 'IMG' || e.target.classList?.contains('writing-textarea'))) {
      e.preventDefault();
    }
  }, true);

  // 4. BẢO MẬT CONSOLE & XÓA ĐỊNH KỲ
  const warningBanner = () => {
    try {
      console.log(
        '%c⛔ DỪNG LẠI! (STOP!)',
        'color:#ef4444;font-size:32px;font-weight:900;text-shadow:2px 2px 0 #000,-1px -1px 0 #000;font-family:sans-serif;'
      );
      console.log(
        '%cĐây là khu vực bảo mật dành cho nhà phát triển hệ thống.\n' +
        'Mọi hành vi mở Console, can thiệp mã nguồn, sửa điểm số hoặc can thiệp bài thi đều BỊ VÔ HIỆU HÓA HOÀN TOÀN và ghi nhận vi phạm quy chế thi cử!',
        'color:#f59e0b;font-size:14px;font-weight:700;line-height:1.6;font-family:sans-serif;'
      );
    } catch (_) {}
  };

  // Hiển thị cảnh báo lúc đầu
  warningBanner();

  // Dọn dẹp console định kỳ và in lại cảnh báo
  setInterval(function secureConsoleHeartbeat() {
    try {
      if (typeof console !== 'undefined' && console.clear) {
        console.clear();
        warningBanner();
      }
    } catch (_) {}
  }, 3000);

  // 5. CƠ CHẾ KHÓA CỨNG HÀM VÀ BIẾN (OBJECT.DEFINEPROPERTY CHỐNG GHI ĐÈ TỪ CONSOLE)
  function freezeGlobalFunction(name, fn) {
    if (typeof fn !== 'function') return;
    try {
      Object.defineProperty(window, name, {
        value: fn,
        writable: false,       // Không thể gán lại: window.go = ... sẽ lỗi hoặc bị lờ đi
        configurable: false,   // Không thể xóa: delete window.go sẽ thất bại
        enumerable: true
      });
    } catch (e) {
      // Fallback nếu property đã tồn tại và không configurable
      try { window[name] = fn; } catch (_) {}
    }
  }

  function freezeGlobalObject(name, obj) {
    if (!obj || typeof obj !== 'object') return;
    try {
      Object.freeze(obj);
      Object.defineProperty(window, name, {
        value: obj,
        writable: false,
        configurable: false,
        enumerable: true
      });
    } catch (e) {
      try { Object.freeze(obj); } catch (_) {}
    }
  }

  // 6. CHỮ KÝ BẢO MẬT TOÀN VẸN CHO DỮ LIỆU BÀI LÀM TRONG LOCALSTORAGE
  const CHECKSUM_SALT = 'NGU_VAN_ANTI_CHEAT_2026_SECURE_HASH_SALT';
  function createSubmissionSignature(data) {
    try {
      const raw = `${data.id || ''}:${data.type || data.mode || ''}:${data.score ?? ''}:${data.timestamp || ''}:${CHECKSUM_SALT}`;
      let hash = 0;
      for (let i = 0; i < raw.length; i++) {
        hash = ((hash << 5) - hash) + raw.charCodeAt(i);
        hash |= 0;
      }
      return 'sec_' + Math.abs(hash).toString(36);
    } catch (_) {
      return '';
    }
  }

  function verifySubmissionIntegrity(data) {
    if (!data) return false;
    if (!data._secSig) return true; // Dữ liệu cũ trước khi áp dụng bảo mật
    return data._secSig === createSubmissionSignature(data);
  }

  // 7. PHÁT HIỆN & KHÓA TOÀN MÀN HÌNH KHI MỞ DEVTOOLS QUA "CÔNG CỤ KHÁC" HOẶC PHÍM TẮT
  let isDevToolsCurtainActive = false;

  function setDevToolsLockdown(locked) {
    if (isDevToolsCurtainActive === locked) return;
    isDevToolsCurtainActive = locked;

    let curtain = document.getElementById('devtools-security-curtain');
    if (locked) {
      if (!curtain) {
        curtain = document.createElement('div');
        curtain.id = 'devtools-security-curtain';
        curtain.innerHTML = `
          <div class="sec-curtain-card">
            <div class="sec-curtain-icon">⛔</div>
            <h2 class="sec-curtain-title">PHÁT HIỆN CÔNG CỤ NHÀ PHÁT TRIỂN (DEVTOOLS)</h2>
            <p class="sec-curtain-desc">
              Hệ thống phát hiện bạn vừa mở <b>Công cụ cho nhà phát triển / DevTools</b> (từ menu Công cụ khác hoặc phím tắt).
            </p>
            <div class="sec-curtain-badge">🔒 TOÀN BỘ MÀN HÌNH ĐÃ TỰ ĐỘNG KHÓA ĐỂ BẢO VỆ BÀI THI</div>
            <p class="sec-curtain-note">
              Để tiếp tục làm bài, vui lòng <b>ĐÓNG DEVTOOLS</b> (nhấn nút ✕ trên cửa sổ kiểm tra mã)!
            </p>
            <button type="button" class="btn cy sm sec-curtain-retry-btn" onclick="window.__SECURITY_SHIELD && window.__SECURITY_SHIELD.checkDevTools(true)">
              🔄 Tôi đã đóng DevTools (Kiểm tra lại)
            </button>
          </div>
        `;
        document.body.appendChild(curtain);
      }
      curtain.style.display = 'flex';
      document.body.classList.add('devtools-locked');
      try { console.clear(); warningBanner(); } catch (_) {}
    } else {
      if (curtain) curtain.style.display = 'none';
      document.body.classList.remove('devtools-locked');
    }
  }

  // Đối tượng bẫy để phát hiện DevTools ngay cả khi mở ở cửa sổ riêng biệt (Undocked)
  let devtoolsGetterTriggered = false;
  let detectorImg = null;
  try {
    if (typeof Image !== 'undefined') {
      detectorImg = new Image();
      Object.defineProperty(detectorImg, 'id', {
        get: function() {
          devtoolsGetterTriggered = true;
          return 'sec-detect-token';
        }
      });
    }
  } catch (_) {}

  function checkDevToolsState(isManual) {
    try {
      const threshold = 160;
      const widthDiff = (window.outerWidth - window.innerWidth) > threshold;
      const heightDiff = (window.outerHeight - window.innerHeight) > threshold;
      let isOpen = Boolean(widthDiff || heightDiff);

      // Kiểm tra bổ sung bằng bẫy getter (hữu hiệu cả khi mở cửa sổ rời)
      if (!isOpen) {
        devtoolsGetterTriggered = false;
        try {
          console.log('%c', detectorImg);
          console.clear();
        } catch (_) {}
        if (devtoolsGetterTriggered) {
          isOpen = true;
        }
      }

      setDevToolsLockdown(isOpen);

      if (isManual) {
        if (!isOpen) {
          showSecurityNotice('✅ Đã đóng DevTools thành công. Bạn có thể tiếp tục làm bài!');
        } else {
          showSecurityNotice('⚠️ Cửa sổ DevTools vẫn đang mở. Vui lòng đóng DevTools trước!');
        }
      }
      return isOpen;
    } catch (_) {
      return false;
    }
  }

  // 8. BẢO MẬT QUY CHẾ THI: BẮT BUỘC CHẾ ĐỘ TOÀN MÀN HÌNH (FULLSCREEN) ĐẾN KHI NỘP BÀI
  let activeExamMode = null; // 'quiz' | 'writing' | 'reading' | null
  let isExamSubmitted = false;
  let isFsCurtainActive = false;

  function isFullscreen() {
    return Boolean(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );
  }

  function isExamActive() {
    if (isExamSubmitted) return false;

    const cur = window.currentScreen || (typeof currentScreen !== 'undefined' ? currentScreen : '');

    if (activeExamMode) {
      if (activeExamMode === 'quiz') {
        const scrGame = document.getElementById('s-game');
        if (scrGame && scrGame.classList && typeof scrGame.classList.contains === 'function' && scrGame.classList.contains('on')) return true;
        if (cur === 'game') return true;
      }
      if (activeExamMode === 'writing') {
        const ws = document.getElementById('writing-workspace-view');
        if (ws && ws.style.display !== 'none') return true;
      }
      if (activeExamMode === 'reading') {
        const ws = document.getElementById('reading-workspace-view');
        if (ws && ws.style.display !== 'none') return true;
      }
      return true;
    }

    // Tự động nhận diện khi người dùng đang ở giao diện làm bài
    const scrGame = document.getElementById('s-game');
    if (scrGame && scrGame.classList && typeof scrGame.classList.contains === 'function' && scrGame.classList.contains('on')) return true;
    if (cur === 'game') return true;

    const wsWriting = document.getElementById('writing-workspace-view');
    if (wsWriting && wsWriting.style.display === 'block') return true;

    const wsReading = document.getElementById('reading-workspace-view');
    if (wsReading && wsReading.style.display === 'block') return true;

    return false;
  }

  function setFullscreenLockdown(locked) {
    if (isFsCurtainActive === locked) return;
    isFsCurtainActive = locked;

    let curtain = document.getElementById('fullscreen-exam-curtain');
    if (locked) {
      if (!curtain) {
        curtain = document.createElement('div');
        curtain.id = 'fullscreen-exam-curtain';
        curtain.innerHTML = `
          <div class="fs-curtain-card">
            <div class="fs-curtain-icon">🖥️</div>
            <h2 class="fs-curtain-title">YÊU CẦU CHẾ ĐỘ TOÀN MÀN HÌNH</h2>
            <p class="fs-curtain-desc">
              Theo quy chế thi cử, bạn <b>bắt buộc phải duy trì chế độ Toàn màn hình (Full Screen)</b> trong suốt quá trình làm bài cho đến khi nộp bài.
            </p>
            <div class="fs-curtain-badge">🔒 BÀI LÀM ĐANG TẠM KHÓA ĐỂ ĐẢM BẢO MINH BẠCH</div>
            <p class="fs-curtain-note">
              Nội dung bài làm đã được làm mờ và khóa thao tác. Vui lòng nhấn nút bên dưới để bật Toàn màn hình và tiếp tục làm bài.
            </p>
            <button type="button" class="fs-curtain-btn" onclick="window.__SECURITY_SHIELD && window.__SECURITY_SHIELD.requestFullscreen()">
              🖥️ BẬT TOÀN MÀN HÌNH ĐỂ TIẾP TỤC
            </button>
          </div>
        `;
        document.body.appendChild(curtain);
      }
      curtain.style.display = 'flex';
      document.body.classList.add('exam-fullscreen-locked');
      showSecurityNotice('⚠️ Quy chế thi: Bài làm bắt buộc ở chế độ Toàn màn hình đến khi nộp bài!');
    } else {
      if (curtain) curtain.style.display = 'none';
      document.body.classList.remove('exam-fullscreen-locked');
    }
  }

  function requestExamFullscreen() {
    const el = document.documentElement;
    const rfs = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
    if (rfs) {
      try {
        const p = rfs.call(el);
        if (p && typeof p.then === 'function') {
          p.then(() => {
            updateFullscreenEnforcement();
          }).catch(err => {
            console.warn('Fullscreen request blocked or dismissed:', err);
            updateFullscreenEnforcement();
          });
        } else {
          updateFullscreenEnforcement();
        }
      } catch (err) {
        console.warn('Fullscreen invocation error:', err);
        updateFullscreenEnforcement();
      }
    }
  }

  function updateFullscreenEnforcement() {
    const examActive = isExamActive();
    if (!examActive) {
      setFullscreenLockdown(false);
      return;
    }
    const inFs = isFullscreen();
    setFullscreenLockdown(!inFs);
  }

  function startExamSession(mode) {
    isExamSubmitted = false;
    activeExamMode = mode || 'exam';
    requestExamFullscreen();
    setTimeout(updateFullscreenEnforcement, 120);
  }

  function endExamSession(submitted = false) {
    if (submitted) {
      isExamSubmitted = true;
      activeExamMode = null;
      setFullscreenLockdown(false);
      if (isFullscreen()) {
        try {
          if (document.exitFullscreen) document.exitFullscreen();
          else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
          else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
          else if (document.msExitFullscreen) document.msExitFullscreen();
        } catch (_) {}
      }
      showSecurityNotice('✅ Đã nộp bài thành công! Kết thúc chế độ toàn màn hình.');
    } else {
      activeExamMode = null;
      setFullscreenLockdown(false);
    }
  }

  // Lắng nghe sự kiện thay đổi fullscreen của trình duyệt (Esc, F11, click...)
  ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(ev => {
    document.addEventListener(ev, updateFullscreenEnforcement, true);
    window.addEventListener(ev, updateFullscreenEnforcement, true);
  });

  // Giám sát định kỳ chế độ fullscreen trong khi làm bài
  setInterval(updateFullscreenEnforcement, 350);

  const shield = {
    freezeGlobal: freezeGlobalFunction,
    freezeObject: freezeGlobalObject,
    sign: createSubmissionSignature,
    verify: verifySubmissionIntegrity,
    checkDevTools: checkDevToolsState,
    startExam: startExamSession,
    endExam: endExamSession,
    requestFullscreen: requestExamFullscreen,
    isExamActive: isExamActive,
    checkFullscreen: updateFullscreenEnforcement
  };
  Object.freeze(shield);

  try {
    Object.defineProperty(window, '__SECURITY_SHIELD', {
      value: shield,
      writable: false,
      configurable: false,
      enumerable: true
    });
  } catch (_) {
    window.__SECURITY_SHIELD = shield;
  }

})();
