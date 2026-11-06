/* =========================================================================
   AUTHENTICATION & ROLE-BASED ACCESS CONTROL (RBAC) MODULE
   - Học sinh (Mặc định): Vào làm bài trực tiếp (Bài học, Đọc hiểu, Luyện viết)
     không cần đăng nhập tài khoản; chỉ cần nhập Họ tên & Lớp.
   - Giáo viên / Quản trị viên (Đăng nhập tài khoản):
     + Đăng bài tập, bài học, đọc hiểu, luyện viết (Thư viện)
     + Kiểm soát toàn bộ lịch sử làm bài, chấm điểm & nhận xét
     + Kiểm soát tên học sinh (sửa tên từng bài, chuẩn hóa tên hàng loạt, lọc/xóa)
     + Quản lý tài khoản Giáo viên & quyền cao nhất trên hệ thống
   ========================================================================= */

const Auth = (() => {
  const STORAGE_TEACHER_SESSION_KEY = 'vq_teacher_session_v1';
  const STORAGE_CUSTOM_TEACHERS_KEY = 'vq_custom_teachers_v1';
  const STORAGE_CUSTOM_PW_OVERRIDES_KEY = 'vq_teacher_pw_overrides_v1';
  const PASSWORD_SALT = 'nguvan_sec_2026_';

  let currentTeacherUser = null;
  let pendingAfterStudentNameCallback = null;

  // Danh sách tài khoản Giáo viên & Quản trị viên mặc định (hoạt động cả khi Offline & Online)
  const BUILTIN_TEACHER_ACCOUNTS = [
    {
      id: 'usr_admin_root',
      username: 'admin',
      passwords: ['admin9999', '123456'],
      full_name: 'Quản trị viên Hệ thống',
      class_name: 'Ban Giám Hiệu / Admin',
      role: 'admin',
      avatar: '🛡️'
    },
    {
      id: 'usr_teacher_main',
      username: 'giaovien',
      passwords: ['123456', 'giaovien123'],
      full_name: 'Cô Tú Anh (Giáo viên Ngữ văn)',
      class_name: 'Giáo viên Bộ môn',
      role: 'teacher',
      avatar: '👑'
    },
    {
      id: 'usr_teacher_tuanh',
      username: 'tuanh',
      passwords: ['123456', 'tuanh123'],
      full_name: 'Cô Tú Anh',
      class_name: 'Giáo viên Ngữ văn',
      role: 'teacher',
      avatar: '👑'
    }
  ];

  async function hashPassword(plainText) {
    const raw = PASSWORD_SALT + String(plainText || '').trim();
    if (window.crypto && window.crypto.subtle) {
      const msgBuffer = new TextEncoder().encode(raw);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      const chr = raw.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return 'fb_' + Math.abs(hash).toString(16);
  }

  function getSavedStudentName() {
    try {
      return (localStorage.getItem('vq_player_nick') || '').trim();
    } catch (e) {
      return '';
    }
  }

  function getSavedStudentClass() {
    try {
      return (localStorage.getItem('vq_player_class') || '').trim();
    } catch (e) {
      return '';
    }
  }

  function setSavedStudentInfo(name, className) {
    const cleanName = String(name || '').trim();
    const cleanClass = String(className || '').trim();
    try {
      if (cleanName) localStorage.setItem('vq_player_nick', cleanName);
      localStorage.setItem('vq_player_class', cleanClass);
    } catch (e) {}

    const nickEl = document.getElementById('player-nick');
    if (nickEl && cleanName) nickEl.value = cleanName;
    const classEl = document.getElementById('player-class');
    if (classEl) classEl.value = cleanClass;
  }

  function getCustomTeacherAccounts() {
    try {
      const raw = localStorage.getItem(STORAGE_CUSTOM_TEACHERS_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function saveCustomTeacherAccounts(list) {
    try {
      localStorage.setItem(STORAGE_CUSTOM_TEACHERS_KEY, JSON.stringify(list || []));
    } catch (e) {}
  }

  function getPasswordOverrides() {
    try {
      const raw = localStorage.getItem(STORAGE_CUSTOM_PW_OVERRIDES_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function savePasswordOverride(username, newPassword) {
    try {
      const overrides = getPasswordOverrides();
      overrides[String(username || '').toLowerCase()] = String(newPassword || '');
      localStorage.setItem(STORAGE_CUSTOM_PW_OVERRIDES_KEY, JSON.stringify(overrides));
    } catch (e) {}
  }

  function loadSession() {
    try {
      const raw = localStorage.getItem(STORAGE_TEACHER_SESSION_KEY) || sessionStorage.getItem(STORAGE_TEACHER_SESSION_KEY);
      if (!raw) {
        currentTeacherUser = null;
        return null;
      }
      const parsed = JSON.parse(raw);
      if (parsed && parsed.username && (parsed.role === 'teacher' || parsed.role === 'admin')) {
        currentTeacherUser = parsed;
        return currentTeacherUser;
      }
    } catch (e) {
      console.warn('Không thể đọc phiên đăng nhập Giáo viên:', e);
    }
    currentTeacherUser = null;
    return null;
  }

  function saveSession(userObj, remember = true) {
    const safeUser = {
      id: userObj.id || ('usr_' + Date.now()),
      username: String(userObj.username || '').toLowerCase(),
      full_name: userObj.full_name || userObj.username,
      class_name: userObj.class_name || 'Giáo viên',
      role: userObj.role === 'admin' ? 'admin' : 'teacher',
      avatar: userObj.avatar || (userObj.role === 'admin' ? '🛡️' : '👑'),
      loginAt: new Date().toISOString()
    };
    currentTeacherUser = safeUser;
    try {
      const str = JSON.stringify(safeUser);
      if (remember) {
        localStorage.setItem(STORAGE_TEACHER_SESSION_KEY, str);
      } else {
        sessionStorage.setItem(STORAGE_TEACHER_SESSION_KEY, str);
      }
    } catch (e) {}
    return safeUser;
  }

  function clearSession() {
    currentTeacherUser = null;
    try {
      localStorage.removeItem(STORAGE_TEACHER_SESSION_KEY);
      sessionStorage.removeItem(STORAGE_TEACHER_SESSION_KEY);
    } catch (e) {}
  }

  // Học sinh không cần đăng nhập vẫn được tính là được phép làm bài (isLoggedIn = true)
  function isLoggedIn() {
    return true;
  }

  function isTeacherLoggedIn() {
    return !!currentTeacherUser;
  }

  function isAdmin() {
    return !!(currentTeacherUser && currentTeacherUser.role === 'admin');
  }

  function isTeacher() {
    return !!(currentTeacherUser && (currentTeacherUser.role === 'teacher' || currentTeacherUser.role === 'admin'));
  }

  function isStudent() {
    return !isTeacher();
  }

  function canEditContent() {
    return isTeacher();
  }

  function canGradeSubmissions() {
    return isTeacher();
  }

  function getCurrentUser() {
    if (currentTeacherUser) return currentTeacherUser;
    const sName = getSavedStudentName();
    const sClass = getSavedStudentClass();
    return {
      id: 'usr_student_guest',
      username: 'hocsinh',
      full_name: sName || 'Học sinh',
      class_name: sClass || '',
      role: 'student',
      avatar: '🎓'
    };
  }

  // Đăng nhập tài khoản Giáo viên / Quản trị viên
  async function login(username, password, remember = true) {
    const cleanUsername = String(username || '').trim().toLowerCase();
    const cleanPassword = String(password || '').trim();

    if (!cleanUsername || !cleanPassword) {
      throw new Error('Vui lòng nhập đầy đủ tên tài khoản và mật khẩu Giáo viên.');
    }

    const overrides = getPasswordOverrides();

    // 1. Kiểm tra tài khoản Giáo viên / Admin tích hợp sẵn
    const builtin = BUILTIN_TEACHER_ACCOUNTS.find(a => a.username.toLowerCase() === cleanUsername);
    if (builtin) {
      const overridePw = overrides[cleanUsername];
      const isMatch = overridePw
        ? (cleanPassword === overridePw)
        : builtin.passwords.includes(cleanPassword);
      if (isMatch) {
        const sessionUser = saveSession(builtin, remember);
        applyRolePermissions();
        return sessionUser;
      }
    }

    // 2. Kiểm tra tài khoản Giáo viên tạo thêm trên máy (Local Custom Teachers)
    const customTeachers = getCustomTeacherAccounts();
    const customMatch = customTeachers.find(a => String(a.username || '').toLowerCase() === cleanUsername);
    if (customMatch) {
      const overridePw = overrides[cleanUsername];
      const pwHash = await hashPassword(cleanPassword);
      const isMatch = overridePw
        ? (cleanPassword === overridePw)
        : (customMatch.password === cleanPassword || customMatch.password_hash === pwHash);
      if (isMatch) {
        const sessionUser = saveSession(customMatch, remember);
        applyRolePermissions();
        return sessionUser;
      }
    }

    // 3. Kiểm tra trên Supabase (nếu có kết nối)
    if (typeof supabaseClient !== 'undefined' && supabaseClient) {
      try {
        const { data: userRecord, error } = await supabaseClient
          .from('user_accounts')
          .select('*')
          .eq('username', cleanUsername)
          .maybeSingle();

        if (!error && userRecord) {
          if (userRecord.role !== 'teacher' && userRecord.role !== 'admin') {
            throw new Error('Học sinh không cần đăng nhập tài khoản! Các em có thể vào làm bài trực tiếp ngay trên web.');
          }
          const pwHash = await hashPassword(cleanPassword);
          const overridePw = overrides[cleanUsername];
          const isMatch = overridePw
            ? (cleanPassword === overridePw)
            : (userRecord.password_hash === pwHash || userRecord.password_hash === cleanPassword);

          if (!isMatch) {
            throw new Error('Mật khẩu Giáo viên không chính xác. Vui lòng kiểm tra lại!');
          }

          const sessionUser = saveSession(userRecord, remember);
          applyRolePermissions();
          return sessionUser;
        }
      } catch (err) {
        if (err && err.message && (err.message.includes('Mật khẩu') || err.message.includes('Học sinh'))) {
          throw err;
        }
      }
    }

    throw new Error('Tài khoản hoặc mật khẩu Giáo viên không chính xác. Vui lòng kiểm tra lại!');
  }

  function logout() {
    clearSession();
    applyRolePermissions();
    if (typeof cur !== 'undefined' && (cur === 'lib' || cur === 'edit')) {
      if (typeof go === 'function') go('home');
    }
  }

  async function changePassword(oldPassword, newPassword) {
    if (!currentTeacherUser) throw new Error('Bạn chưa đăng nhập tài khoản Giáo viên.');
    if (!newPassword || String(newPassword).trim().length < 6) {
      throw new Error('Mật khẩu mới phải có ít nhất 6 ký tự.');
    }

    const uname = String(currentTeacherUser.username || '').toLowerCase();
    const cleanOld = String(oldPassword || '').trim();
    const cleanNew = String(newPassword || '').trim();

    // Xác thực mật khẩu cũ bằng cách gọi thử login
    await login(uname, cleanOld, true);

    // Lưu mật khẩu mới vào local override
    savePasswordOverride(uname, cleanNew);

    // Cập nhật trong danh sách custom teachers nếu có
    const customList = getCustomTeacherAccounts();
    const idx = customList.findIndex(a => String(a.username || '').toLowerCase() === uname);
    if (idx !== -1) {
      customList[idx].password = cleanNew;
      customList[idx].password_hash = await hashPassword(cleanNew);
      saveCustomTeacherAccounts(customList);
    }

    // Đồng bộ lên Supabase nếu tài khoản nằm trên Supabase
    if (typeof supabaseClient !== 'undefined' && supabaseClient) {
      try {
        const newHash = await hashPassword(cleanNew);
        await supabaseClient
          .from('user_accounts')
          .update({ password_hash: newHash })
          .eq('username', uname);
      } catch (e) {}
    }

    return true;
  }

  function applyRolePermissions() {
    const teacherActive = isTeacher();
    const roleAttr = isAdmin() ? 'admin' : (teacherActive ? 'teacher' : 'student');

    if (document.body) {
      document.body.setAttribute('data-user-role', roleAttr);
    }

    // Ẩn/hiện tất cả các nút .teacher-only trên toàn bộ giao diện
    document.querySelectorAll('.teacher-only').forEach(el => {
      if (teacherActive) {
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });

    // Chế độ chấm điểm trong lịch sử
    const gradeBtn = document.getElementById('btn-toggle-grading-mode');
    if (gradeBtn) gradeBtn.style.display = teacherActive ? 'inline-flex' : 'none';

    const gradingToolbar = document.getElementById('history-detail-grading-toolbar');
    if (gradingToolbar && !teacherActive) gradingToolbar.style.display = 'none';

    const saveGradingFooter = document.getElementById('btn-save-grading-footer');
    if (saveGradingFooter && !teacherActive) saveGradingFooter.style.display = 'none';

    // Điền sẵn tên học sinh & lớp vào ô nhập ở màn hình Bài học nếu đang ở chế độ Học sinh
    if (!teacherActive) {
      const nickInput = document.getElementById('player-nick');
      const classInput = document.getElementById('player-class');
      const savedName = getSavedStudentName();
      const savedClass = getSavedStudentClass();
      if (nickInput && savedName && !nickInput.value) nickInput.value = savedName;
      if (classInput && savedClass && !classInput.value) classInput.value = savedClass;
    }

    if (typeof renderNavbarUserWidget === 'function') renderNavbarUserWidget();
    if (typeof renderMobileSidebarUser === 'function') renderMobileSidebarUser();
    if (typeof updateSettingsUI === 'function') updateSettingsUI();

    // Cập nhật lại các danh sách đề đang hiển thị để ẩn/hiện nút Sửa/Xóa/Cài đặt của Giáo viên
    try {
      if (typeof cur !== 'undefined') {
        if (cur === 'setup' && typeof renderSetupSetsGrid === 'function') renderSetupSetsGrid();
        if (cur === 'reading' && typeof renderReadingListView === 'function') renderReadingListView();
        if (cur === 'writing' && typeof renderWritingSetsGrid === 'function') renderWritingSetsGrid();
        if (cur === 'history' && typeof renderHistoryPage === 'function') renderHistoryPage();
        if (cur === 'lib' && typeof R !== 'undefined' && typeof R.lib === 'function') {
          if (teacherActive) R.lib();
        }
      }
    } catch (e) {}
  }

  function init() {
    loadSession();
    applyRolePermissions();
  }

  // Tự động phục hồi phiên đăng nhập ngay khi khởi tạo module Auth
  try {
    loadSession();
  } catch (_) {}

  return {
    init,
    loadSession,
    login,
    logout,
    changePassword,
    isLoggedIn,
    isTeacherLoggedIn,
    isAdmin,
    isTeacher,
    isStudent,
    canEditContent,
    canGradeSubmissions,
    getCurrentUser,
    getSavedStudentName,
    getSavedStudentClass,
    setSavedStudentInfo,
    getCustomTeacherAccounts,
    saveCustomTeacherAccounts,
    savePasswordOverride,
    hashPassword,
    BUILTIN_TEACHER_ACCOUNTS,
    applyRolePermissions,
    setPendingStudentCallback: (cb) => { pendingAfterStudentNameCallback = cb; },
    consumePendingStudentCallback: () => {
      const cb = pendingAfterStudentNameCallback;
      pendingAfterStudentNameCallback = null;
      return cb;
    }
  };
})();

// Tự động khởi chạy Auth.init() để khôi phục phiên đăng nhập và phân quyền trên giao diện
try {
  Auth.init();
} catch (_) {}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      try { Auth.init(); } catch (_) {}
    });
  } else {
    try { Auth.init(); } catch (_) {}
  }
}

/* =========================================================================
   UI WIDGETS: TOPBAR & MOBILE SIDEBAR USER AREA
   ========================================================================= */

function renderNavbarUserWidget() {
  const container = document.getElementById('nav-user-widget');
  if (!container) return;

  const escHtml = typeof esc === 'function' ? esc : (s => String(s || ''));

  // TRƯỜNG HỢP 1: ĐÃ ĐĂNG NHẬP TÀI KHOẢN GIÁO VIÊN / ADMIN (QUYỀN CAO NHẤT)
  if (Auth.isTeacher()) {
    const user = Auth.getCurrentUser();
    const isAdmin = Auth.isAdmin();
    const roleLabel = isAdmin ? 'Quản trị viên' : 'Giáo viên';
    const roleBadgeClass = isAdmin ? 'admin' : 'teacher';
    const roleIcon = isAdmin ? '🛡️' : '👑';

    container.innerHTML = `
      <div class="nav-user-pill" id="nav-user-pill-btn" onclick="toggleUserDropdownMenu(event)" title="Tài khoản ${escHtml(roleLabel)}: ${escHtml(user.full_name)}">
        <div class="user-pill-avatar-wrap ${roleBadgeClass}">
          <span class="user-pill-avatar">${roleIcon}</span>
        </div>
        <span class="user-pill-name">${escHtml(user.full_name)}</span>
        <span class="user-role-badge ${roleBadgeClass}">${roleLabel}</span>
        <span class="user-pill-arrow"><ion-icon name="chevron-down-outline"></ion-icon></span>
      </div>

      <div class="user-dropdown-menu" id="user-dropdown-menu" onclick="event.stopPropagation()">
        <div class="dropdown-header">
          <div class="dropdown-avatar-wrap">
            <div class="dropdown-avatar-box" style="font-size:22px;">${roleIcon}</div>
            <span class="dropdown-online-dot"></span>
          </div>
          <div class="dropdown-info">
            <div style="font-weight:800; font-size:14px; color:var(--tx);">${escHtml(user.full_name)}</div>
            <div style="font-size:11.5px; color:var(--mut);">@${escHtml(user.username)} · Quyền cao nhất</div>
          </div>
        </div>

        <div style="padding:6px 0; display:flex; flex-direction:column; gap:2px;">
          <button type="button" class="btn gh sm" style="justify-content:flex-start; width:100%; border:none; padding:8px 10px;" onclick="closeUserDropdownMenu(); go('lib');">
            <ion-icon name="library-outline" style="color:var(--au);"></ion-icon>
            <span>Đăng bài tập &amp; Quản lý Thư viện</span>
          </button>
          <button type="button" class="btn gh sm" style="justify-content:flex-start; width:100%; border:none; padding:8px 10px;" onclick="closeUserDropdownMenu(); go('history');">
            <ion-icon name="checkmark-done-circle-outline" style="color:#10b981;"></ion-icon>
            <span>Kiểm soát Lịch sử &amp; Chấm bài</span>
          </button>
          <button type="button" class="btn gh sm" style="justify-content:flex-start; width:100%; border:none; padding:8px 10px;" onclick="closeUserDropdownMenu(); openAccountManagerModal('students');">
            <ion-icon name="people-outline" style="color:#3b82f6;"></ion-icon>
            <span>Kiểm soát Tên Học sinh &amp; Tài khoản</span>
          </button>
          <button type="button" class="btn gh sm" style="justify-content:flex-start; width:100%; border:none; padding:8px 10px;" onclick="closeUserDropdownMenu(); openChangePasswordModal();">
            <ion-icon name="key-outline" style="color:var(--mut);"></ion-icon>
            <span>Đổi mật khẩu Giáo viên</span>
          </button>
        </div>

        <div style="border-top:1px solid var(--bd); padding-top:6px; margin-top:2px;">
          <button type="button" class="btn no sm" style="justify-content:center; width:100%;" onclick="closeUserDropdownMenu(); logoutUser();">
            <ion-icon name="log-out-outline"></ion-icon>
            <span>Đăng xuất Giáo viên</span>
          </button>
        </div>
      </div>
    `;
    return;
  }

  // TRƯỜNG HỢP 2: CHẾ ĐỘ HỌC SINH (KHÔNG CẦN ĐĂNG NHẬP TÀI KHOẢN)
  const sName = Auth.getSavedStudentName();
  const sClass = Auth.getSavedStudentClass();
  const studentDisplay = sName
    ? `${sName}${sClass ? ' (' + sClass + ')' : ''}`
    : 'Nhập tên HS';

  container.innerHTML = `
    <div class="nav-student-bar">
      <button type="button" class="nav-student-pill" onclick="openStudentNameModal()" title="Học sinh: Bấm để đổi Họ tên &amp; Lớp (không cần đăng nhập)">
        <span>🎓</span>
        <span class="nav-student-name">${escHtml(studentDisplay)}</span>
        <ion-icon name="create-outline" style="font-size:13px; color:var(--mut); flex-shrink:0;"></ion-icon>
      </button>
      <button type="button" class="nav-teacher-login-btn" onclick="openLoginDialog()" title="Đăng nhập tài khoản Giáo viên &amp; Quản trị viên (Học sinh không cần đăng nhập)">
        <ion-icon name="log-in-outline" style="font-size:15px;"></ion-icon>
        <span>Đăng nhập</span>
      </button>
    </div>
  `;
}

function renderMobileSidebarUser() {
  const container = document.getElementById('sidebar-user-header');
  if (!container) return;

  const escHtml = typeof esc === 'function' ? esc : (s => String(s || ''));

  if (Auth.isTeacher()) {
    const user = Auth.getCurrentUser();
    const isAdmin = Auth.isAdmin();
    container.innerHTML = `
      <div style="padding:12px; margin-bottom:8px; border-radius:10px; background:var(--bg2); border:1px solid var(--bd);">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
          <span style="font-size:22px;">${isAdmin ? '🛡️' : '👑'}</span>
          <div style="min-width:0; flex:1;">
            <div style="font-weight:800; font-size:13.5px; color:var(--tx); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escHtml(user.full_name)}</div>
            <div style="font-size:11.5px; color:var(--au); font-weight:700;">${isAdmin ? 'Quản trị viên (Toàn quyền)' : 'Giáo viên (Toàn quyền)'}</div>
          </div>
        </div>
        <div style="display:flex; gap:6px; flex-wrap:wrap;">
          <button type="button" class="btn cy sm" style="flex:1; font-size:11.5px;" onclick="closeMobileMenu(); openAccountManagerModal('students');">
            <ion-icon name="people-outline"></ion-icon> <span>QL Học sinh</span>
          </button>
          <button type="button" class="btn no sm" style="font-size:11.5px;" onclick="closeMobileMenu(); logoutUser();">
            <ion-icon name="log-out-outline"></ion-icon> <span>Thoát</span>
          </button>
        </div>
      </div>
    `;
  } else {
    const sName = Auth.getSavedStudentName();
    const sClass = Auth.getSavedStudentClass();
    container.innerHTML = `
      <div style="padding:10px 12px; margin-bottom:8px; border-radius:10px; background:var(--bg2); border:1px solid var(--bd); display:flex; flex-direction:column; gap:8px;">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
          <div style="font-size:12.5px; font-weight:700; color:var(--tx);">
            🎓 ${escHtml(sName || 'Học sinh (Chưa nhập tên)')} ${sClass ? '<span style="color:var(--mut);">· ' + escHtml(sClass) + '</span>' : ''}
          </div>
          <button type="button" class="btn gh sm" style="padding:3px 8px; font-size:11.5px;" onclick="closeMobileMenu(); openStudentNameModal();">Đổi tên</button>
        </div>
        <button type="button" class="btn au sm" style="width:100%; justify-content:center;" onclick="closeMobileMenu(); openLoginDialog();">
          <ion-icon name="shield-checkmark-outline"></ion-icon> <span>Đăng nhập Giáo viên</span>
        </button>
      </div>
    `;
  }
}

function toggleUserDropdownMenu(e) {
  if (e) e.stopPropagation();
  const menu = document.getElementById('user-dropdown-menu');
  const pill = document.getElementById('nav-user-pill-btn');
  if (!menu) return;
  const isOpen = menu.classList.toggle('show');
  if (pill) pill.classList.toggle('active', isOpen);
}

function closeUserDropdownMenu() {
  const menu = document.getElementById('user-dropdown-menu');
  const pill = document.getElementById('nav-user-pill-btn');
  if (menu) menu.classList.remove('show');
  if (pill) pill.classList.remove('active');
}

if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
  document.addEventListener('click', () => {
    closeUserDropdownMenu();
  });
}

/* =========================================================================
   DIALOG ĐĂNG NHẬP GIÁO VIÊN / ADMIN
   ========================================================================= */

function openLoginDialog() {
  const dlg = document.getElementById('login-dialog');
  if (!dlg) return;

  const errEl = document.getElementById('login-error-alert');
  if (errEl) {
    errEl.style.display = 'none';
    errEl.textContent = '';
  }

  if (typeof dlg.showModal === 'function') {
    if (!dlg.open) dlg.showModal();
  } else {
    dlg.setAttribute('open', 'open');
  }

  setTimeout(() => {
    const uInput = document.getElementById('login-username');
    if (uInput) uInput.focus();
  }, 60);
}

function closeLoginDialog() {
  const dlg = document.getElementById('login-dialog');
  if (!dlg) return;
  if (typeof dlg.close === 'function' && dlg.open) dlg.close();
  else dlg.removeAttribute('open');
}

function switchAuthTab() {
  // Giữ tương thích ngược
}

function toggleAuthPasswordEye(inputId, btnEl) {
  const inp = document.getElementById(inputId);
  if (!inp) return;
  const isPw = inp.type === 'password';
  inp.type = isPw ? 'text' : 'password';
  if (btnEl) {
    const icon = btnEl.querySelector('ion-icon');
    if (icon) icon.setAttribute('name', isPw ? 'eye-off-outline' : 'eye-outline');
  }
}

async function handleAuthLoginSubmit(e) {
  if (e) e.preventDefault();
  const username = document.getElementById('login-username')?.value || '';
  const password = document.getElementById('login-password')?.value || '';
  const remember = document.getElementById('login-remember')?.checked !== false;
  const errEl = document.getElementById('login-error-alert');
  const submitBtn = document.getElementById('btn-submit-login');

  if (errEl) errEl.style.display = 'none';
  if (submitBtn) submitBtn.disabled = true;

  try {
    const user = await Auth.login(username, password, remember);
    closeLoginDialog();
    const pwInput = document.getElementById('login-password');
    if (pwInput) pwInput.value = '';
    if (typeof toast === 'function') {
      toast(`Chào mừng ${user.full_name}! Đã mở khóa toàn bộ quyền Giáo viên.`, 'ok');
    }
  } catch (err) {
    if (errEl) {
      errEl.textContent = err.message || 'Đăng nhập không thành công.';
      errEl.style.display = 'block';
    }
  } finally {
    if (submitBtn) submitBtn.disabled = false;
  }
}

function handleAuthRegisterSubmit(e) {
  if (e) e.preventDefault();
}

function logoutUser() {
  if (!Auth.isTeacher()) {
    openStudentNameModal();
    return;
  }
  Auth.logout();
  if (typeof toast === 'function') {
    toast('Đã đăng xuất tài khoản Giáo viên. Đang ở chế độ Học sinh làm bài.', 'ok');
  }
}

/* =========================================================================
   DIALOG NHẬP TÊN HỌC SINH & GIÁO VIÊN SỬA TÊN HỌC SINH TRONG LỊCH SỬ
   ========================================================================= */

function openStudentNameModal(afterSaveCallback) {
  const dlg = document.getElementById('student-name-dialog');
  if (!dlg) {
    if (typeof afterSaveCallback === 'function') afterSaveCallback();
    return;
  }

  Auth.setPendingStudentCallback(typeof afterSaveCallback === 'function' ? afterSaveCallback : null);

  const editIdInput = document.getElementById('edit-history-student-id');
  const bulkOldInput = document.getElementById('bulk-rename-old-name');
  if (editIdInput) editIdInput.value = '';
  if (bulkOldInput) bulkOldInput.value = '';

  const titleEl = document.getElementById('student-name-dialog-title');
  const subEl = document.getElementById('student-name-dialog-sub');
  const btnLabel = document.getElementById('student-name-submit-label');

  if (titleEl) titleEl.textContent = 'Thông tin Học sinh làm bài';
  if (subEl) subEl.textContent = 'Học sinh chỉ cần nhập Họ tên & Lớp, không cần tài khoản đăng nhập';
  if (btnLabel) btnLabel.textContent = afterSaveCallback ? 'Lưu & Bắt đầu làm bài' : 'Lưu thông tin';

  const nameInput = document.getElementById('student-modal-name');
  const classInput = document.getElementById('student-modal-class');
  if (nameInput) nameInput.value = Auth.getSavedStudentName();
  if (classInput) classInput.value = Auth.getSavedStudentClass();

  if (typeof dlg.showModal === 'function') {
    if (!dlg.open) dlg.showModal();
  } else {
    dlg.setAttribute('open', 'open');
  }

  setTimeout(() => {
    if (nameInput) {
      nameInput.focus();
      nameInput.select();
    }
  }, 60);
}

function closeStudentNameModal() {
  const dlg = document.getElementById('student-name-dialog');
  if (!dlg) return;
  Auth.setPendingStudentCallback(null);
  if (typeof dlg.close === 'function' && dlg.open) dlg.close();
  else dlg.removeAttribute('open');
}

function ensureStudentNameBeforeExam(callback) {
  // Nếu là Giáo viên đang làm thử hoặc Học sinh đã có tên hợp lệ thì vào thẳng
  if (Auth.isTeacher()) {
    if (typeof callback === 'function') callback();
    return true;
  }
  const currentName = Auth.getSavedStudentName();
  if (currentName && currentName !== 'Học sinh' && currentName !== 'Khách') {
    if (typeof callback === 'function') callback();
    return true;
  }
  openStudentNameModal(callback);
  return false;
}

// Giáo viên sửa tên & lớp của học sinh trên 1 bài nộp cụ thể trong Lịch sử
function openEditHistoryStudentModal(historyId) {
  if (!Auth.isTeacher()) {
    if (typeof toast === 'function') toast('Chỉ Giáo viên mới có quyền chỉnh sửa tên học sinh trong lịch sử!', 'err');
    return;
  }

  const allHistory = typeof getAllRawQuizHistory === 'function' ? getAllRawQuizHistory() : [];
  const item = allHistory.find(h => String(h.id) === String(historyId));
  if (!item) {
    if (typeof toast === 'function') toast('Không tìm thấy bản ghi bài làm này.', 'err');
    return;
  }

  const dlg = document.getElementById('student-name-dialog');
  if (!dlg) return;

  const editIdInput = document.getElementById('edit-history-student-id');
  const bulkOldInput = document.getElementById('bulk-rename-old-name');
  if (editIdInput) editIdInput.value = String(historyId);
  if (bulkOldInput) bulkOldInput.value = '';

  const titleEl = document.getElementById('student-name-dialog-title');
  const subEl = document.getElementById('student-name-dialog-sub');
  const btnLabel = document.getElementById('student-name-submit-label');

  if (titleEl) titleEl.textContent = 'Sửa Tên & Lớp Học sinh (Bài nộp)';
  if (subEl) subEl.textContent = `Đề bài: ${item.setTitle || 'Bài làm'}`;
  if (btnLabel) btnLabel.textContent = 'Cập nhật bài nộp';

  const nameInput = document.getElementById('student-modal-name');
  const classInput = document.getElementById('student-modal-class');
  if (nameInput) nameInput.value = item.playerName || '';
  if (classInput) classInput.value = item.className || '';

  if (typeof dlg.showModal === 'function') {
    if (!dlg.open) dlg.showModal();
  } else {
    dlg.setAttribute('open', 'open');
  }
}

// Giáo viên đổi/chuẩn hóa tên học sinh hàng loạt trên toàn bộ lịch sử
function openBulkRenameStudentModal(oldName, oldClass) {
  if (!Auth.isTeacher()) return;
  const dlg = document.getElementById('student-name-dialog');
  if (!dlg) return;

  const editIdInput = document.getElementById('edit-history-student-id');
  const bulkOldInput = document.getElementById('bulk-rename-old-name');
  if (editIdInput) editIdInput.value = '';
  if (bulkOldInput) bulkOldInput.value = String(oldName || '');

  const titleEl = document.getElementById('student-name-dialog-title');
  const subEl = document.getElementById('student-name-dialog-sub');
  const btnLabel = document.getElementById('student-name-submit-label');

  if (titleEl) titleEl.textContent = 'Chuẩn hóa Tên & Lớp Học sinh';
  if (subEl) subEl.textContent = `Cập nhật đồng loạt tất cả bài nộp của "${oldName}"`;
  if (btnLabel) btnLabel.textContent = 'Cập nhật toàn bộ';

  const nameInput = document.getElementById('student-modal-name');
  const classInput = document.getElementById('student-modal-class');
  if (nameInput) nameInput.value = oldName || '';
  if (classInput) classInput.value = oldClass || '';

  if (typeof dlg.showModal === 'function') {
    if (!dlg.open) dlg.showModal();
  } else {
    dlg.setAttribute('open', 'open');
  }
}

async function handleStudentNameSubmit(e) {
  if (e) e.preventDefault();

  const newName = (document.getElementById('student-modal-name')?.value || '').trim();
  const newClass = (document.getElementById('student-modal-class')?.value || '').trim();
  const editHistoryId = (document.getElementById('edit-history-student-id')?.value || '').trim();
  const bulkOldName = (document.getElementById('bulk-rename-old-name')?.value || '').trim();

  if (!newName) {
    if (typeof toast === 'function') toast('Vui lòng nhập họ và tên học sinh!', 'err');
    return;
  }

  // TH1: Giáo viên sửa tên học sinh trên 1 bài nộp cụ thể
  if (editHistoryId && Auth.isTeacher()) {
    await updateHistoryStudentIdentity(editHistoryId, newName, newClass);
    closeStudentNameModal();
    if (typeof renderHistoryPage === 'function') renderHistoryPage();
    if (typeof renderStudentControlList === 'function') renderStudentControlList();
    if (typeof toast === 'function') toast(`Đã cập nhật tên học sinh thành "${newName}"!`, 'ok');
    return;
  }

  // TH2: Giáo viên chuẩn hóa tên học sinh hàng loạt
  if (bulkOldName && Auth.isTeacher()) {
    const updatedCount = await bulkUpdateStudentIdentityInHistory(bulkOldName, newName, newClass);
    closeStudentNameModal();
    if (typeof renderHistoryPage === 'function') renderHistoryPage();
    if (typeof renderStudentControlList === 'function') renderStudentControlList();
    if (typeof toast === 'function') {
      toast(`Đã chuẩn hóa tên "${newName}" cho ${updatedCount} bài làm!`, 'ok');
    }
    return;
  }

  // TH3: Học sinh lưu tên & lớp của mình để làm bài
  Auth.setSavedStudentInfo(newName, newClass);
  const cb = Auth.consumePendingStudentCallback();
  closeStudentNameModal();
  renderNavbarUserWidget();
  renderMobileSidebarUser();

  if (typeof toast === 'function') {
    toast(`Xin chào ${newName}${newClass ? ' (' + newClass + ')' : ''}! Chúc em làm bài tốt.`, 'ok');
  }

  if (typeof cb === 'function') {
    cb();
  }
}

async function updateHistoryStudentIdentity(historyId, newName, newClass) {
  try {
    const raw = localStorage.getItem('vq_quiz_history_v1');
    const list = raw ? JSON.parse(raw) : [];
    let targetItem = null;

    for (let i = 0; i < list.length; i++) {
      if (String(list[i].id) === String(historyId)) {
        list[i].playerName = newName;
        list[i].className = newClass;
        targetItem = list[i];
        break;
      }
    }

    localStorage.setItem('vq_quiz_history_v1', JSON.stringify(list));

    if (targetItem && typeof supabaseClient !== 'undefined' && supabaseClient) {
      await supabaseClient
        .from('quiz_results')
        .update({
          player_name: newName,
          detail: targetItem
        })
        .eq('id', String(historyId));
    }
  } catch (err) {
    console.warn('Lỗi cập nhật tên học sinh:', err);
  }
}

async function bulkUpdateStudentIdentityInHistory(oldName, newName, newClass) {
  let count = 0;
  try {
    const raw = localStorage.getItem('vq_quiz_history_v1');
    const list = raw ? JSON.parse(raw) : [];
    const oldNorm = String(oldName || '').trim().toLowerCase();
    const updatedItems = [];

    for (let i = 0; i < list.length; i++) {
      const pName = String(list[i].playerName || '').trim().toLowerCase();
      if (pName === oldNorm) {
        list[i].playerName = newName;
        if (newClass) list[i].className = newClass;
        count++;
        updatedItems.push(list[i]);
      }
    }

    localStorage.setItem('vq_quiz_history_v1', JSON.stringify(list));

    if (updatedItems.length > 0 && typeof supabaseClient !== 'undefined' && supabaseClient) {
      for (const item of updatedItems) {
        await supabaseClient
          .from('quiz_results')
          .update({
            player_name: newName,
            detail: item
          })
          .eq('id', String(item.id));
      }
    }
  } catch (err) {
    console.warn('Lỗi chuẩn hóa tên học sinh hàng loạt:', err);
  }
  return count;
}

async function deleteStudentAllHistory(studentName) {
  if (!Auth.isTeacher()) return;
  const cleanTarget = String(studentName || '').trim();
  if (!cleanTarget) return;

  const ok = typeof showConfirmModal === 'function'
    ? await showConfirmModal(`Bạn có chắc chắn muốn xóa toàn bộ lịch sử làm bài của học sinh "${cleanTarget}" không?`, {
        title: 'Xóa lịch sử của học sinh',
        confirmText: 'Xóa toàn bộ',
        cancelText: 'Hủy'
      })
    : confirm(`Xóa toàn bộ bài làm của học sinh "${cleanTarget}"?`);

  if (!ok) return;

  try {
    const raw = localStorage.getItem('vq_quiz_history_v1');
    const list = raw ? JSON.parse(raw) : [];
    const targetLower = cleanTarget.toLowerCase();
    const removedIds = [];
    const remaining = list.filter(item => {
      const match = String(item.playerName || '').trim().toLowerCase() === targetLower;
      if (match && item.id) removedIds.push(String(item.id));
      return !match;
    });

    localStorage.setItem('vq_quiz_history_v1', JSON.stringify(remaining));

    if (removedIds.length > 0 && typeof supabaseClient !== 'undefined' && supabaseClient) {
      await supabaseClient.from('quiz_results').delete().in('id', removedIds);
    }

    renderStudentControlList();
    if (typeof renderHistoryPage === 'function') renderHistoryPage();
    if (typeof toast === 'function') {
      toast(`Đã xóa ${removedIds.length} bài làm của học sinh "${cleanTarget}".`, 'ok');
    }
  } catch (err) {
    console.warn('Lỗi xóa bài làm của học sinh:', err);
  }
}

function filterHistoryByStudentName(studentName) {
  closeAccountManagerModal();
  if (typeof go === 'function') go('history');
  setTimeout(() => {
    const searchInput = document.getElementById('history-page-search');
    if (searchInput) {
      searchInput.value = studentName || '';
      if (typeof onHistoryPageSearchInput === 'function') onHistoryPageSearchInput();
    }
  }, 60);
}

/* =========================================================================
   TRUNG TÂM KIỂM SOÁT HỌC SINH & TÀI KHOẢN GIÁO VIÊN (#account-manager-dialog)
   ========================================================================= */

function openAccountManagerModal(defaultTab = 'students') {
  if (!Auth.isTeacher()) {
    openLoginDialog();
    return;
  }
  const dlg = document.getElementById('account-manager-dialog');
  if (!dlg) return;

  switchControlModalTab(defaultTab || 'students');
  renderStudentControlList();
  renderTeacherAccountsList();

  if (typeof dlg.showModal === 'function') {
    if (!dlg.open) dlg.showModal();
  } else {
    dlg.setAttribute('open', 'open');
  }
}

function closeAccountManagerModal() {
  const dlg = document.getElementById('account-manager-dialog');
  if (!dlg) return;
  if (typeof dlg.close === 'function' && dlg.open) dlg.close();
  else dlg.removeAttribute('open');
}

function switchControlModalTab(tabName) {
  const isStudents = tabName !== 'accounts';
  const paneStudents = document.getElementById('ctrl-pane-students');
  const paneAccounts = document.getElementById('ctrl-pane-accounts');
  const btnStudents = document.getElementById('ctrl-tab-btn-students');
  const btnAccounts = document.getElementById('ctrl-tab-btn-accounts');

  if (paneStudents) paneStudents.style.display = isStudents ? 'block' : 'none';
  if (paneAccounts) paneAccounts.style.display = isStudents ? 'none' : 'block';
  if (btnStudents) btnStudents.classList.toggle('active', isStudents);
  if (btnAccounts) btnAccounts.classList.toggle('active', !isStudents);

  if (isStudents) renderStudentControlList();
  else renderTeacherAccountsList();
}

function renderStudentControlList(forceSync = false) {
  const container = document.getElementById('ctrl-student-list-container');
  const countBadge = document.getElementById('ctrl-student-count');
  if (!container) return;

  if (forceSync && typeof fetchQuizHistoryFromSupabase === 'function') {
    fetchQuizHistoryFromSupabase().then(() => renderStudentControlList(false));
  }

  const allHistory = typeof getAllRawQuizHistory === 'function' ? getAllRawQuizHistory() : [];
  const studentMap = new Map();

  allHistory.forEach(item => {
    const rawName = String(item.playerName || 'Khách').trim() || 'Khách';
    const key = rawName.toLowerCase();
    if (!studentMap.has(key)) {
      studentMap.set(key, {
        name: rawName,
        className: item.className || '',
        totalSubmissions: 0,
        gradedCount: 0,
        totalScore10: 0,
        scoredCount: 0,
        lastActive: item.timestamp || item.date || ''
      });
    }
    const st = studentMap.get(key);
    st.totalSubmissions++;
    if (!st.className && item.className) st.className = item.className;
    if (item.gradingStatus === 'graded') st.gradedCount++;
    const numScore = parseFloat(item.totalScore10 ?? item.score10 ?? item.pct);
    if (!isNaN(numScore)) {
      st.totalScore10 += (numScore > 10 ? numScore / 10 : numScore);
      st.scoredCount++;
    }
  });

  const students = Array.from(studentMap.values()).sort((a, b) => b.totalSubmissions - a.totalSubmissions);
  if (countBadge) countBadge.textContent = String(students.length);

  const query = (document.getElementById('ctrl-student-search')?.value || '').trim().toLowerCase();
  const filtered = query
    ? students.filter(s => s.name.toLowerCase().includes(query) || String(s.className || '').toLowerCase().includes(query))
    : students;

  const escHtml = typeof esc === 'function' ? esc : (s => String(s || ''));

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:28px 16px; color:var(--mut); background:var(--bg2); border-radius:10px; border:1px dashed var(--bd);">
        Chưa có học sinh nào nộp bài phù hợp với từ khóa tìm kiếm.
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(st => {
    const avg = st.scoredCount > 0 ? (st.totalScore10 / st.scoredCount).toFixed(1) : '—';
    const safeJsName = escHtml(st.name).replace(/'/g, "\\'");
    const safeJsClass = escHtml(st.className || '').replace(/'/g, "\\'");

    return `
      <div class="student-ctrl-card">
        <div style="display:flex; align-items:center; gap:10px; min-width:200px; flex:1;">
          <div style="width:36px; height:36px; border-radius:9px; background:var(--bg2); border:1px solid var(--bd); display:flex; align-items:center; justify-content:center; font-size:17px; flex-shrink:0;">🎓</div>
          <div style="min-width:0;">
            <div style="font-weight:800; font-size:14px; color:var(--tx); display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
              <span>${escHtml(st.name)}</span>
              ${st.className ? `<span class="user-role-badge student">Lớp ${escHtml(st.className)}</span>` : '<span style="font-size:11px; color:var(--mut); font-weight:500;">(Chưa ghi lớp)</span>'}
            </div>
            <div style="font-size:12px; color:var(--mut); margin-top:2px;">
              Đã nộp: <b style="color:var(--tx);">${st.totalSubmissions} bài</b> · Đã chấm: <b>${st.gradedCount}/${st.totalSubmissions}</b> · Điểm TB: <b style="color:var(--au);">${avg}</b>
            </div>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
          <button type="button" class="btn gh sm" onclick="filterHistoryByStudentName('${safeJsName}')" title="Xem tất cả bài làm của học sinh này">
            <ion-icon name="eye-outline"></ion-icon> <span>Xem bài (${st.totalSubmissions})</span>
          </button>
          <button type="button" class="btn cy sm" onclick="openBulkRenameStudentModal('${safeJsName}', '${safeJsClass}')" title="Sửa hoặc chuẩn hóa tên &amp; lớp cho học sinh này">
            <ion-icon name="create-outline"></ion-icon> <span>Sửa tên / Lớp</span>
          </button>
          <button type="button" class="btn no sm" onclick="deleteStudentAllHistory('${safeJsName}')" title="Xóa toàn bộ bài nộp của học sinh này">
            <ion-icon name="trash-outline"></ion-icon>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

async function renderTeacherAccountsList() {
  const container = document.getElementById('account-manager-list');
  if (!container) return;

  const escHtml = typeof esc === 'function' ? esc : (s => String(s || ''));
  const customList = Auth.getCustomTeacherAccounts();

  const merged = [
    ...Auth.BUILTIN_TEACHER_ACCOUNTS.map(a => ({ ...a, isBuiltin: true })),
    ...customList.map(a => ({ ...a, isBuiltin: false }))
  ];

  container.innerHTML = merged.map(acc => {
    const isAdmin = acc.role === 'admin';
    const safeUname = escHtml(acc.username).replace(/'/g, "\\'");
    return `
      <div class="student-ctrl-card">
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="width:36px; height:36px; border-radius:9px; background:var(--bg2); border:1px solid var(--bd); display:flex; align-items:center; justify-content:center; font-size:18px;">
            ${isAdmin ? '🛡️' : '👑'}
          </div>
          <div>
            <div style="font-weight:800; font-size:14px; color:var(--tx); display:flex; align-items:center; gap:6px;">
              <span>${escHtml(acc.full_name)}</span>
              <span class="user-role-badge ${isAdmin ? 'admin' : 'teacher'}">${isAdmin ? 'Quản trị viên' : 'Giáo viên'}</span>
            </div>
            <div style="font-size:12px; color:var(--mut);">Tài khoản: <code>@${escHtml(acc.username)}</code> ${acc.isBuiltin ? '· Hệ thống mặc định' : '· Tài khoản bổ sung'}</div>
          </div>
        </div>
        <div style="display:flex; gap:6px;">
          <button type="button" class="btn gh sm" onclick="adminResetUserPassword('${safeUname}', '${ safeUname }')">
            <ion-icon name="key-outline"></ion-icon> <span>Đặt lại MK</span>
          </button>
          ${!acc.isBuiltin ? `
            <button type="button" class="btn no sm" onclick="adminDeleteUserAccount('${safeUname}', '${safeUname}')">
              <ion-icon name="trash-outline"></ion-icon>
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

async function handleAdminCreateUser(e) {
  if (e) e.preventDefault();
  if (!Auth.isTeacher()) return;

  const username = (document.getElementById('new-acc-username')?.value || '').trim().toLowerCase();
  const password = (document.getElementById('new-acc-password')?.value || '').trim();
  const fullName = (document.getElementById('new-acc-fullname')?.value || '').trim();
  const role = document.getElementById('new-acc-role')?.value === 'admin' ? 'admin' : 'teacher';

  if (!username || !password || !fullName) {
    if (typeof toast === 'function') toast('Vui lòng nhập đầy đủ thông tin tài khoản Giáo viên!', 'err');
    return;
  }

  const customList = Auth.getCustomTeacherAccounts();
  if (
    Auth.BUILTIN_TEACHER_ACCOUNTS.some(a => a.username === username) ||
    customList.some(a => a.username === username)
  ) {
    if (typeof toast === 'function') toast(`Tài khoản "${username}" đã tồn tại!`, 'err');
    return;
  }

  const pwHash = await Auth.hashPassword(password);
  const newAcc = {
    id: 'usr_' + Date.now(),
    username,
    password,
    password_hash: pwHash,
    full_name: fullName,
    class_name: role === 'admin' ? 'Quản trị viên' : 'Giáo viên',
    role,
    avatar: role === 'admin' ? '🛡️' : '👑'
  };

  customList.push(newAcc);
  Auth.saveCustomTeacherAccounts(customList);

  if (typeof supabaseClient !== 'undefined' && supabaseClient) {
    try {
      await supabaseClient.from('user_accounts').insert([{
        username,
        password_hash: pwHash,
        full_name: fullName,
        class_name: newAcc.class_name,
        role,
        avatar: newAcc.avatar
      }]);
    } catch (err) {}
  }

  const form = document.getElementById('admin-create-user-form');
  if (form) form.reset();
  renderTeacherAccountsList();
  if (typeof toast === 'function') toast(`Đã tạo tài khoản Giáo viên "@${username}" thành công!`, 'ok');
}

async function adminResetUserPassword(userId, username) {
  if (!Auth.isTeacher()) return;
  const newPw = prompt(`Nhập mật khẩu mới cho tài khoản Giáo viên "@${username}" (tối thiểu 6 ký tự):`, '123456');
  if (!newPw || newPw.trim().length < 6) return;

  Auth.savePasswordOverride(username, newPw.trim());
  const customList = Auth.getCustomTeacherAccounts();
  const idx = customList.findIndex(a => a.username === username);
  if (idx !== -1) {
    customList[idx].password = newPw.trim();
    customList[idx].password_hash = await Auth.hashPassword(newPw.trim());
    Auth.saveCustomTeacherAccounts(customList);
  }
  if (typeof toast === 'function') toast(`Đã đặt lại mật khẩu cho tài khoản "@${username}"!`, 'ok');
}

function adminDeleteUserAccount(userId, username) {
  if (!Auth.isTeacher()) return;
  const customList = Auth.getCustomTeacherAccounts().filter(a => a.username !== username);
  Auth.saveCustomTeacherAccounts(customList);
  renderTeacherAccountsList();
  if (typeof toast === 'function') toast(`Đã xóa tài khoản "@${username}".`, 'ok');
}

/* =========================================================================
   DIALOG ĐỔI MẬT KHẨU GIÁO VIÊN
   ========================================================================= */

function openChangePasswordModal() {
  if (!Auth.isTeacher()) {
    openLoginDialog();
    return;
  }
  const dlg = document.getElementById('change-password-dialog');
  if (!dlg) return;
  const alertEl = document.getElementById('change-password-alert');
  if (alertEl) alertEl.style.display = 'none';
  const form = document.getElementById('change-password-form');
  if (form) form.reset();

  if (typeof dlg.showModal === 'function') {
    if (!dlg.open) dlg.showModal();
  } else {
    dlg.setAttribute('open', 'open');
  }
}

function closeChangePasswordModal() {
  const dlg = document.getElementById('change-password-dialog');
  if (!dlg) return;
  if (typeof dlg.close === 'function' && dlg.open) dlg.close();
  else dlg.removeAttribute('open');
}

async function handleChangePasswordSubmit(e) {
  if (e) e.preventDefault();
  const oldPw = document.getElementById('change-old-password')?.value || '';
  const newPw = document.getElementById('change-new-password')?.value || '';
  const confirmPw = document.getElementById('change-confirm-password')?.value || '';
  const alertEl = document.getElementById('change-password-alert');

  if (newPw !== confirmPw) {
    if (alertEl) {
      alertEl.textContent = 'Mật khẩu xác nhận không khớp!';
      alertEl.style.display = 'block';
    }
    return;
  }

  try {
    await Auth.changePassword(oldPw, newPw);
    closeChangePasswordModal();
    if (typeof toast === 'function') toast('Đã đổi mật khẩu Giáo viên thành công!', 'ok');
  } catch (err) {
    if (alertEl) {
      alertEl.textContent = err.message || 'Không thể đổi mật khẩu.';
      alertEl.style.display = 'block';
    }
  }
}

// Giữ các hàm stub tương thích ngược
function openUserProfileModal() {
  if (Auth.isTeacher()) openAccountManagerModal('students');
  else openStudentNameModal();
}
function closeUserProfileModal() {}
function handleProfileUpdateSubmit(e) { if (e) e.preventDefault(); }
function handleUpgradeTeacherSubmit(e) { if (e) e.preventDefault(); }
function selectAvatarPickerOption() {}
function handleCustomAvatarUpload() {}


// Expose all functions to global window
window.Auth = Auth;
window.renderNavbarUserWidget = renderNavbarUserWidget;
window.renderMobileSidebarUser = renderMobileSidebarUser;
window.toggleUserDropdownMenu = toggleUserDropdownMenu;
window.closeUserDropdownMenu = closeUserDropdownMenu;
window.openLoginDialog = openLoginDialog;
window.closeLoginDialog = closeLoginDialog;
window.switchAuthTab = switchAuthTab;
window.toggleAuthPasswordEye = toggleAuthPasswordEye;
window.handleAuthLoginSubmit = handleAuthLoginSubmit;
window.handleAuthRegisterSubmit = handleAuthRegisterSubmit;
window.logoutUser = logoutUser;
window.openStudentNameModal = openStudentNameModal;
window.closeStudentNameModal = closeStudentNameModal;
window.ensureStudentNameBeforeExam = ensureStudentNameBeforeExam;
window.openEditHistoryStudentModal = openEditHistoryStudentModal;
window.openBulkRenameStudentModal = openBulkRenameStudentModal;
window.handleStudentNameSubmit = handleStudentNameSubmit;
window.updateHistoryStudentIdentity = updateHistoryStudentIdentity;
window.bulkUpdateStudentIdentityInHistory = bulkUpdateStudentIdentityInHistory;
window.deleteStudentAllHistory = deleteStudentAllHistory;
window.filterHistoryByStudentName = filterHistoryByStudentName;
window.openAccountManagerModal = openAccountManagerModal;
window.closeAccountManagerModal = closeAccountManagerModal;
window.switchControlModalTab = switchControlModalTab;
window.renderStudentControlList = renderStudentControlList;
window.renderTeacherAccountsList = renderTeacherAccountsList;
window.handleAdminCreateUser = handleAdminCreateUser;
window.adminResetUserPassword = adminResetUserPassword;
window.adminDeleteUserAccount = adminDeleteUserAccount;
window.openChangePasswordModal = openChangePasswordModal;
window.closeChangePasswordModal = closeChangePasswordModal;
window.handleChangePasswordSubmit = handleChangePasswordSubmit;
window.openUserProfileModal = openUserProfileModal;
window.closeUserProfileModal = closeUserProfileModal;
window.handleProfileUpdateSubmit = handleProfileUpdateSubmit;
window.handleUpgradeTeacherSubmit = handleUpgradeTeacherSubmit;
window.selectAvatarPickerOption = selectAvatarPickerOption;
window.handleCustomAvatarUpload = handleCustomAvatarUpload;
