/**
 * =========================================================================
 * BẢO MẬT NÂNG CAO & CHỐNG CAN THIỆP CONSOLE / DEVTOOLS
 * Hệ thống chống gian lận, chống sửa đổi mã nguồn và bảo vệ bài thi
 * =========================================================================
 */

(function initSecurityShield() {
  'use strict';

  // 1. CHẶN CÁC PHÍM TẮT MỞ DEVTOOLS, VIEW SOURCE & SAVE PAGE
  const BLOCKED_KEYS = [
    { key: 'F12' },
    { key: 'I', ctrl: true, shift: true },
    { key: 'I', meta: true, alt: true },
    { key: 'J', ctrl: true, shift: true },
    { key: 'J', meta: true, alt: true },
    { key: 'C', ctrl: true, shift: true },
    { key: 'C', meta: true, alt: true },
    { key: 'U', ctrl: true },
    { key: 'U', meta: true },
    { key: 'S', ctrl: true },
    { key: 'S', meta: true },
    { key: 'F10', shift: true }
  ];

  function showSecurityNotice(msg) {
    if (typeof toast === 'function') {
      toast(msg, 'bad');
    } else {
      const existing = document.getElementById('sec-warning-toast');
      if (existing) existing.remove();
      const div = document.createElement('div');
      div.id = 'sec-warning-toast';
      div.textContent = msg;
      div.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#ef4444;color:#fff;padding:12px 24px;border-radius:12px;font-family:sans-serif;font-weight:700;font-size:14px;box-shadow:0 8px 30px rgba(0,0,0,0.3);z-index:999999;transition:all 0.3s ease;';
      document.body.appendChild(div);
      setTimeout(() => div.remove(), 2800);
    }
  }

  window.addEventListener('keydown', function handleSecurityHotkeys(e) {
    const key = (e.key || '').toUpperCase();
    const ctrl = e.ctrlKey;
    const meta = e.metaKey;
    const shift = e.shiftKey;
    const alt = e.altKey;

    for (let i = 0; i < BLOCKED_KEYS.length; i++) {
      const b = BLOCKED_KEYS[i];
      const matchKey = key === b.key;
      const matchCtrl = b.ctrl ? (ctrl || (b.meta && meta)) : (!b.ctrl ? !ctrl : true);
      const matchShift = b.shift ? shift : (!b.shift ? !shift : true);
      const matchAlt = b.alt ? alt : true;

      if (matchKey && (b.ctrl ? (ctrl || meta) : true) && (b.shift ? shift : true) && (b.alt ? alt : true)) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        showSecurityNotice('⚠️ Thao tác kiểm tra mã nguồn (F12/Inspect/Console) đã bị vô hiệu hóa!');
        return false;
      }
    }
  }, true);

  // 2. CHẶN MENU CHUỘT PHẢI (CONTEXTMENU)
  document.addEventListener('contextmenu', function disableContextMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    showSecurityNotice('⚠️ Chuột phải đã bị khóa để bảo mật nội dung và kết quả học tập!');
    return false;
  }, true);

  // 3. CHỐNG KÉO THẢ SOURCE & CHỐNG CHỌN TOÀN BỘ TRANG BẰNG CTRL+A KHI KHÔNG TRONG VĂN BẢN
  document.addEventListener('dragstart', function(e) {
    if (e.target && e.target.nodeName === 'IMG') {
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

  // 7. PHÁT HIỆN DEVTOOLS DỰA TRÊN KÍCH THƯỚC CỬA SỔ
  let devtoolsDetected = false;
  setInterval(function detectDevToolsOpen() {
    const widthDiff = window.outerWidth - window.innerWidth > 160;
    const heightDiff = window.outerHeight - window.innerHeight > 160;
    if ((widthDiff || heightDiff) && !devtoolsDetected) {
      devtoolsDetected = true;
      try { console.clear(); warningBanner(); } catch (_) {}
    } else if (!widthDiff && !heightDiff) {
      devtoolsDetected = false;
    }
  }, 2000);

  const shield = {
    freezeGlobal: freezeGlobalFunction,
    freezeObject: freezeGlobalObject,
    sign: createSubmissionSignature,
    verify: verifySubmissionIntegrity
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
