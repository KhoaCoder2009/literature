/* =========================================================================
   AUTH & ROLE-BASED ACCESS CONTROL (RBAC) - CHẾ ĐỘ MỞ (KHÔNG BẮT ĐĂNG NHẬP)
   Đã gỡ bỏ tính năng đăng nhập & đăng ký theo yêu cầu.
   Tất cả người dùng đều có toàn quyền học tập, làm bài, chấm điểm và tạo đề.
   ========================================================================= */

(function initAuthModule(global) {
  'use strict';

  function getDefaultUser() {
    let savedNick = '';
    let savedClass = '';
    try {
      savedNick = localStorage.getItem('vq_player_nick') || '';
      savedClass = localStorage.getItem('vq_player_class') || '';
    } catch (_) {}

    return {
      id: 'usr_guest',
      username: 'guest',
      full_name: savedNick || 'Học sinh',
      class_name: savedClass || '',
      role: 'teacher',
      avatar: '🎓'
    };
  }

  const Auth = {
    getCurrentUser() {
      return getDefaultUser();
    },

    isLoggedIn() {
      return true;
    },

    isAdmin() {
      return true;
    },

    isTeacher() {
      return true;
    },

    isStudent() {
      return false;
    },

    canManageAccounts() {
      return false;
    },

    canManageAllAccounts() {
      return false;
    },

    canEditContent() {
      return true;
    },

    canGradeSubmissions() {
      return true;
    },

    async login() {
      return { success: true, user: getDefaultUser() };
    },

    logout() {
      return { success: true };
    },

    applyRolePermissions() {
      // Hiển thị đầy đủ các công cụ biên tập và quản lý học liệu cho người dùng
      document.querySelectorAll('.teacher-only').forEach(el => {
        el.style.display = '';
      });

      const gradingBtn = document.getElementById('btn-toggle-grading-mode');
      if (gradingBtn) gradingBtn.style.display = 'inline-flex';

      const gradingToolbar = document.getElementById('history-detail-grading-toolbar');
      if (gradingToolbar) gradingToolbar.style.display = '';

      const saveGradingFooter = document.getElementById('btn-save-grading-footer');
      if (saveGradingFooter) saveGradingFooter.style.display = '';
    },

    renderNavbarUserWidget() {
      const container = document.getElementById('nav-user-widget');
      if (container) container.innerHTML = '';
    },

    renderMobileSidebarUser() {
      const container = document.getElementById('sidebar-user-header');
      if (container) container.innerHTML = '';
    },

    getSavedAccounts() { return []; },
    saveAccount() {},
    removeSavedAccount() {},
    switchAccount() {},
    logoutAll() {},

    init() {
      this.applyRolePermissions();
      this.renderNavbarUserWidget();
    }
  };

  // Các hàm tương thích giao diện (No-op an toàn)
  global.toggleUserDropdown = function() {};
  global.closeUserDropdown = function() {};
  global.openLoginDialog = function() {};
  global.closeLoginDialog = function() {};
  global.switchLoginDialogTab = function() {};
  global.switchAccountQuick = function() {};
  global.removeSavedAccountQuick = function() {};
  global.logoutAllAccounts = function() {};
  global.togglePasswordVisibility = function() {};
  global.fillSampleAccount = function() {};
  global.handleLoginSubmit = function(e) { if (e) e.preventDefault(); };
  global.logoutUser = function() {};
  global.openAccountManagerModal = function() {};
  global.closeAccountManagerModal = function() {};
  global.loadAndRenderAccounts = function() {};
  global.resetAccountFilters = function() {};
  global.filterAccountsList = function() {};
  global.openCreateAccountModal = function() {};
  global.closeCreateAccountModal = function() {};
  global.handleCreateAccountSubmit = function(e) { if (e) e.preventDefault(); };
  global.openResetPasswordModal = function() {};
  global.closeResetPasswordModal = function() {};
  global.handleResetPasswordSubmit = function(e) { if (e) e.preventDefault(); };
  global.deleteUserAccountById = function() {};
  global.openChangePasswordModal = function() {};
  global.closeChangePasswordModal = function() {};
  global.handleChangePasswordSubmit = function(e) { if (e) e.preventDefault(); };
  global.exportAccountsList = function() {};

  global.Auth = Auth;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Auth.init());
  } else {
    Auth.init();
  }
})(window);
