/* =========================================================================
   APPLICATION SECURE DISTRIBUTION BUNDLE
   Bảo mật & đóng gói toàn bộ logic - Chống can thiệp Console và DevTools
   ========================================================================= */

/* =========================================================================
   COMPONENTS BUNDLE & SYNCHRONOUS DOM INJECTOR
   ========================================================================= */
window.COMPONENTS = {
  "navbar": "<canvas id=\"bg-canvas\"></canvas>\n\n<nav>\n  <button class=\"btn sm gh mobile-menu-toggle\" type=\"button\" onclick=\"toggleMobileMenu()\" aria-label=\"Mở danh mục điều hướng\" aria-controls=\"mobile-sidebar\" aria-expanded=\"false\" title=\"Danh mục điều hướng\">\n    <ion-icon name=\"menu-outline\" style=\"font-size: 20px;\"></ion-icon> <span class=\"nav-btn-label\">Danh mục</span>\n  </button>\n\n  <div class=\"nav-brand-wrap\" onclick=\"go('home')\" title=\"Về trang chủ\">\n    <img src=\"./assets/logo-nguvan.png\" alt=\"Biểu trưng Ngữ Văn\" class=\"nav-brand-img\">\n  </div>\n\n  <div class=\"nav-desktop-links\" id=\"nav-desktop-links\">\n    <a data-g=\"home\" onclick=\"go('home')\" class=\"nav-link on\">\n      <ion-icon name=\"home-outline\"></ion-icon> <span>Trang chủ</span>\n    </a>\n    <a data-g=\"setup\" onclick=\"go('setup')\" class=\"nav-link\">\n      <ion-icon name=\"book-outline\"></ion-icon> <span>Bài học</span>\n    </a>\n    <a data-g=\"reading\" onclick=\"go('reading')\" class=\"nav-link\">\n      <ion-icon name=\"document-text-outline\"></ion-icon> <span>Đọc hiểu</span>\n    </a>\n    <a data-g=\"writing\" onclick=\"go('writing')\" class=\"nav-link\">\n      <ion-icon name=\"create-outline\"></ion-icon> <span>Luyện viết</span>\n    </a>\n    <a data-g=\"history\" onclick=\"go('history')\" class=\"nav-link\">\n      <ion-icon name=\"time-outline\"></ion-icon> <span>Lịch sử</span>\n    </a>\n    <a data-g=\"lib\" class=\"nav-link\" onclick=\"go('lib')\">\n      <ion-icon name=\"library-outline\"></ion-icon> <span>Thư viện</span>\n    </a>\n  </div>\n\n  <div class=\"nav-user-area\" id=\"nav-user-area\">\n    <button class=\"btn sm gh nav-streak-pill\" id=\"nav-streak-btn\" type=\"button\" onclick=\"openGamificationModal()\" title=\"Chuỗi ngày học liên tục &amp; Huy hiệu chinh phục\">\n      <ion-icon name=\"flame\" style=\"font-size: 16px; color: #f97316;\"></ion-icon> <span id=\"nav-streak-count\">1</span>\n    </button>\n    <button class=\"btn sm gh nav-quote-pill\" id=\"nav-quote-btn\" type=\"button\" onclick=\"openQuoteOfDayModal()\" title=\"Góc truyền cảm hứng văn học mỗi ngày\" style=\"display:none;\">\n      <ion-icon name=\"sparkles-outline\" style=\"font-size: 17px; color: var(--yellow);\"></ion-icon>\n    </button>\n    <button class=\"btn sm gh nav-qa-pill\" id=\"nav-qa-btn\" type=\"button\" onclick=\"openQaReportModal()\" title=\"Báo cáo lỗi hoặc đặt câu hỏi thắc mắc kiến thức\">\n      <ion-icon name=\"help-buoy-outline\" style=\"font-size: 17px;\"></ion-icon> <span class=\"nav-btn-label\">Hỏi đáp</span>\n    </button>\n    <button class=\"btn sm gh nav-settings-btn\" type=\"button\" onclick=\"openSettingsDialog()\" title=\"Cài đặt\">\n      <ion-icon name=\"settings-outline\" style=\"font-size: 17px;\"></ion-icon> <span class=\"nav-btn-label\">Cài đặt</span>\n    </button>\n  </div>\n</nav>\n\n<div class=\"mobile-menu-backdrop\" onclick=\"closeMobileMenu()\" aria-hidden=\"true\"></div>\n<aside class=\"mobile-sidebar\" id=\"mobile-sidebar\" aria-label=\"Danh mục điều hướng\" aria-hidden=\"true\">\n  <div class=\"mobile-sidebar-header\">\n    <div style=\"display:flex;align-items:center;cursor:pointer;\" onclick=\"go('home'); closeMobileMenu();\" title=\"Về trang chủ\">\n      <img src=\"./assets/logo-nguvan.png\" alt=\"Biểu trưng Ngữ Văn\" class=\"sidebar-logo\">\n    </div>\n    <button class=\"btn sm gh\" type=\"button\" onclick=\"closeMobileMenu()\" aria-label=\"Đóng danh mục\">\n      <ion-icon name=\"close-outline\" style=\"font-size: 20px;\"></ion-icon>\n    </button>\n  </div>\n\n  <div class=\"sidebar-links-list\">\n    <div class=\"sidebar-section-title\">Học tập</div>\n    <a data-g=\"home\" onclick=\"go('home'); closeMobileMenu();\">\n      <span class=\"sidebar-icon\"><ion-icon name=\"home-outline\"></ion-icon></span> <span>Trang chủ</span>\n    </a>\n    <a data-g=\"setup\" onclick=\"go('setup'); closeMobileMenu();\">\n      <span class=\"sidebar-icon\"><ion-icon name=\"book-outline\"></ion-icon></span> <span>Bài học</span>\n    </a>\n    <a data-g=\"reading\" onclick=\"go('reading'); closeMobileMenu();\">\n      <span class=\"sidebar-icon\"><ion-icon name=\"document-text-outline\"></ion-icon></span> <span>Đọc hiểu</span>\n    </a>\n    <a data-g=\"writing\" onclick=\"go('writing'); closeMobileMenu();\">\n      <span class=\"sidebar-icon\"><ion-icon name=\"create-outline\"></ion-icon></span> <span>Luyện viết</span>\n    </a>\n\n    <div class=\"sidebar-section-title\">Quản lý</div>\n    <a data-g=\"lib\" onclick=\"go('lib'); closeMobileMenu();\">\n      <span class=\"sidebar-icon\"><ion-icon name=\"library-outline\"></ion-icon></span> <span>Thư viện</span>\n    </a>\n    <a data-g=\"history\" onclick=\"go('history'); closeMobileMenu();\">\n      <span class=\"sidebar-icon\"><ion-icon name=\"time-outline\"></ion-icon></span> <span>Lịch sử</span>\n    </a>\n\n    <div class=\"sidebar-section-title\">Tiện ích</div>\n    <a onclick=\"closeMobileMenu(); openGamificationModal();\">\n      <span class=\"sidebar-icon\"><ion-icon name=\"flame-outline\"></ion-icon></span> <span>Tiến độ &amp; Huy hiệu</span>\n    </a>\n    <a onclick=\"closeMobileMenu(); openQuoteOfDayModal();\">\n      <span class=\"sidebar-icon\"><ion-icon name=\"sparkles-outline\"></ion-icon></span> <span>Góc cảm hứng</span>\n    </a>\n    <a onclick=\"closeMobileMenu(); openQaReportModal();\">\n      <span class=\"sidebar-icon\"><ion-icon name=\"help-buoy-outline\"></ion-icon></span> <span>Hỏi đáp &amp; Báo lỗi</span>\n    </a>\n    <a onclick=\"closeMobileMenu(); openSettingsDialog();\">\n      <span class=\"sidebar-icon\"><ion-icon name=\"settings-outline\"></ion-icon></span> <span>Cài đặt</span>\n    </a>\n  </div>\n</aside>",
  "settings-dialog": "<!-- SETTINGS DIALOG -->\n<dialog id=\"settings-dialog\" class=\"settings-modal\">\n  <div class=\"settings-header\">\n    <div class=\"settings-title-wrap\">\n      <h3>Cài đặt</h3>\n    </div>\n    <button class=\"btn sm gh\" type=\"button\" onclick=\"closeSettingsDialog()\" aria-label=\"Đóng cài đặt\">\n      <ion-icon name=\"close-outline\" style=\"font-size: 20px;\"></ion-icon>\n    </button>\n  </div>\n  <div class=\"settings-body\" style=\"overflow-y: auto; -webkit-overflow-scrolling: touch;\">\n    <!-- Hiệu ứng âm thanh -->\n    <div class=\"settings-item\">\n      <div class=\"settings-item-info\">\n        <div class=\"settings-item-icon\">\n          <ion-icon name=\"volume-high-outline\" style=\"font-size: 20px;\"></ion-icon>\n        </div>\n        <div>\n          <div class=\"settings-item-name\">Hiệu ứng âm thanh</div>\n          <div class=\"settings-item-desc\">Âm thanh khi chọn đáp án và thao tác</div>\n        </div>\n      </div>\n      <button class=\"btn sm\" id=\"btn-setting-sound\" onclick=\"toggleSound()\">Bật</button>\n    </div>\n    <!-- Giao diện Sáng / Tối -->\n    <div class=\"settings-item\">\n      <div class=\"settings-item-info\">\n        <div class=\"settings-item-icon\">\n          <ion-icon name=\"moon-outline\" style=\"font-size: 20px;\"></ion-icon>\n        </div>\n        <div>\n          <div class=\"settings-item-name\">Giao diện (Sáng / Tối)</div>\n          <div class=\"settings-item-desc\">Chuyển đổi giao diện Sáng hoặc Tối</div>\n        </div>\n      </div>\n      <button class=\"btn sm gh\" id=\"btn-setting-theme\" onclick=\"toggleTheme()\">Sáng</button>\n    </div>\n    <!-- Chế độ Máy chiếu -->\n    <div class=\"settings-item\">\n      <div class=\"settings-item-info\">\n        <div class=\"settings-item-icon\">\n          <ion-icon name=\"tv-outline\" style=\"font-size: 20px;\"></ion-icon>\n        </div>\n        <div>\n          <div class=\"settings-item-name\">Chế độ máy chiếu</div>\n          <div class=\"settings-item-desc\">Tăng kích thước chữ hiển thị trên máy chiếu</div>\n        </div>\n      </div>\n      <button class=\"btn sm gh\" id=\"btn-setting-projector\" onclick=\"toggleProjectorMode()\">Tắt</button>\n    </div>\n  </div>\n  <div class=\"settings-footer\">\n    <button class=\"btn au\" type=\"button\" onclick=\"closeSettingsDialog()\">\n      <ion-icon name=\"checkmark-outline\"></ion-icon> Hoàn tất\n    </button>\n  </div>\n</dialog>",
  "screen-home": "<!-- SCREEN 1: HOME -->\n<section id=\"s-home\" class=\"scr\">\n  <div class=\"wrap\">\n    <!-- HERO SHOWCASE -->\n    <div class=\"hero-showcase\" id=\"hero-showcase\">\n      <div class=\"hero-study-card\" id=\"hero-study-card\">\n        <div class=\"study-card-img-wrap\" id=\"study-img-wrap\">\n          <img class=\"study-card-img\" id=\"study-img\" src=\"./assets/bac-ho.jpg\" alt=\"Chủ tịch Hồ Chí Minh\">\n        </div>\n        <div class=\"study-card-content\" id=\"study-content\">\n          <div class=\"study-quote-tag\" id=\"study-tag\">Lời dạy của Bác Hồ</div>\n          <div class=\"study-main-quote long-quote\" id=\"study-quote\">“Non sông Việt Nam có trở nên tươi đẹp hay không, dân tộc Việt Nam có bước tới đài vinh quang để sánh vai với các cường quốc năm châu được hay không, chính là nhờ một phần lớn ở công học tập của các em.”</div>\n          <div class=\"study-quote-author\" id=\"study-author\">— Chủ tịch Hồ Chí Minh —</div>\n        </div>\n      </div>\n    </div>\n\n    <!-- GAMIFICATION & QUOTE OF THE DAY GRID -->\n    <div class=\"home-enrichment-grid\">\n      <!-- 1. CƠ CHẾ GAMIFICATION: STREAK, PROGRESS BAR & BADGES -->\n      <div class=\"card gami-home-card\" id=\"home-gamification-card\">\n        <div class=\"gami-card-header\">\n          <div class=\"gami-title-group\">\n            <span class=\"gami-flame-badge\" id=\"home-streak-flame\">🔥</span>\n            <div>\n              <h3 class=\"gami-heading\">Chuỗi <span id=\"home-streak-days\">1</span> Ngày Học Liên Tục</h3>\n              <p class=\"gami-subtitle\" id=\"home-rank-title\">Danh hiệu: Tân Sĩ Tử · 0 XP</p>\n            </div>\n          </div>\n          <button class=\"btn au sm\" type=\"button\" onclick=\"openGamificationModal()\">\n            <ion-icon name=\"ribbon-outline\"></ion-icon> <span>Huy hiệu (<span id=\"home-badges-unlocked-count\">1/8</span>)</span>\n          </button>\n        </div>\n\n        <!-- Thanh tiến trình XP & Mục tiêu ngày (Gộp 2 cột gọn gàng) -->\n        <div class=\"gami-progress-section gami-progress-dual\">\n          <div class=\"gami-progress-col\">\n            <div class=\"gami-progress-labels\">\n              <span>Cấp độ (<span id=\"home-xp-current\">0</span>/<span id=\"home-xp-next\">100</span> XP)</span>\n              <b id=\"home-xp-percent\">0%</b>\n            </div>\n            <div class=\"gami-progress-track\">\n              <div class=\"gami-progress-fill\" id=\"home-xp-bar\" style=\"width: 15%;\"></div>\n            </div>\n          </div>\n\n          <div class=\"gami-progress-col\">\n            <div class=\"gami-progress-labels\">\n              <span>Mục tiêu ngày (<span id=\"home-daily-done\">0</span>/3 bài)</span>\n              <b id=\"home-daily-percent\">0%</b>\n            </div>\n            <div class=\"gami-progress-track gami-daily-track\">\n              <div class=\"gami-progress-fill gami-daily-fill\" id=\"home-daily-bar\" style=\"width: 0%;\"></div>\n            </div>\n          </div>\n        </div>\n\n        <!-- Lịch tuần 7 ngày -->\n        <div class=\"gami-week-row\" id=\"home-streak-week-row\"></div>\n\n        <!-- Dải huy hiệu nhanh -->\n        <div class=\"gami-mini-badges-row\" id=\"home-mini-badges-row\"></div>\n      </div>\n\n      <!-- 2. GÓC TRUYỀN CẢM HỨNG (QUOTE OF THE DAY) -->\n      <div class=\"card qotd-home-card\" id=\"home-qotd-card\">\n        <div class=\"qotd-header\">\n          <div class=\"qotd-badge-tag\">\n            <ion-icon name=\"sparkles-outline\"></ion-icon> <span>Nhận định văn học hôm nay</span>\n          </div>\n          <div class=\"qotd-header-actions\">\n            <button class=\"btn gh sm qotd-icon-btn\" type=\"button\" onclick=\"nextQuoteOfDay()\" title=\"Đổi nhận định / câu văn khác\">\n              <ion-icon name=\"shuffle-outline\"></ion-icon> <span>Đổi câu</span>\n            </button>\n            <button class=\"btn gh sm qotd-icon-btn\" type=\"button\" onclick=\"openQuoteOfDayModal()\" title=\"Mở kho nhận định &amp; Sổ tay văn học\">\n              <ion-icon name=\"book-outline\"></ion-icon> <span>Sổ tay</span>\n            </button>\n          </div>\n        </div>\n\n        <blockquote class=\"qotd-quote-box\" id=\"home-qotd-text\">\n          “Văn học là nhân học.”\n        </blockquote>\n\n        <div class=\"qotd-meta-tip-wrap\">\n          <div class=\"qotd-author-row\">\n            <span class=\"qotd-category-pill\" id=\"home-qotd-category\">Lý luận văn học</span>\n            <b class=\"qotd-author-name\" id=\"home-qotd-author\">— M. Gorki —</b>\n          </div>\n          <div class=\"qotd-usage-tip\" id=\"home-qotd-tip\">\n            <b>💡 Vận dụng:</b> Dùng làm câu dẫn Mở bài hoặc Kết bài cho các đề phân tích giá trị nhân đạo và thiên chức của nhà văn.\n          </div>\n        </div>\n\n        <div class=\"qotd-footer-actions\">\n          <button class=\"btn gh sm\" type=\"button\" onclick=\"copyCurrentQuoteOfDay()\">\n            <ion-icon name=\"copy-outline\"></ion-icon> <span>Sao chép</span>\n          </button>\n          <button class=\"btn cy sm\" type=\"button\" id=\"btn-save-qotd-home\" onclick=\"toggleSaveCurrentQuote()\">\n            <ion-icon name=\"bookmark-outline\"></ion-icon> <span>Lưu sổ tay</span>\n          </button>\n        </div>\n      </div>\n    </div>\n\n\n    <!-- LEADERBOARD -->\n    <div class=\"card lb-card\">\n      <div class=\"lb-header-bar\">\n        <div class=\"lb-title-wrap\">\n          <span class=\"lb-trophy-icon\">\n            <ion-icon name=\"trophy-outline\"></ion-icon>\n          </span>\n          <div>\n            <h2 class=\"lb-heading\">Bảng Vàng Thành Tích</h2>\n            <p class=\"lb-subheading\">Kết quả học tập qua các lượt làm bài</p>\n          </div>\n        </div>\n        <div class=\"lb-filters\">\n          <div class=\"lb-search-wrap\">\n            <input id=\"lb-search\" class=\"lb-search-input\" placeholder=\"Tìm học sinh, lớp, bộ đề...\" oninput=\"renderLeaderboard()\">\n          </div>\n          <select id=\"lb-mode-filter\" class=\"lb-mode-select\" onchange=\"renderLeaderboard()\" style=\"display:none;\">\n            <option value=\"\">Tất cả kết quả</option>\n          </select>\n          <button class=\"btn gh sm lb-filter-reset\" onclick=\"resetLbFilters()\" title=\"Xóa bộ lọc tìm kiếm\">\n            <ion-icon name=\"close-circle-outline\"></ion-icon> <span>Xóa lọc</span>\n          </button>\n          <button class=\"btn gh sm lb-filter-reset\" onclick=\"R.home()\" title=\"Làm mới bảng xếp hạng\">\n            <ion-icon name=\"refresh-outline\"></ion-icon>\n          </button>\n        </div>\n      </div>\n      <div id=\"lb-container\"></div>\n    </div>\n  </div>\n</section>",
  "screen-lib": "<!-- SCREEN 2: LIBRARY / EDITOR -->\n<section id=\"s-lib\" class=\"scr\">\n  <div class=\"wrap\">\n    <div id=\"lv\">\n      <!-- Library Hero Banner -->\n      <div class=\"cartoon-lib-banner\">\n        <div class=\"lib-banner-content\">\n          <h1 style=\"font-size:clamp(22px, 3.5vw, 28px); margin:0 0 4px; font-weight:800;\">Kho học liệu &amp; Đề thi</h1>\n          <p class=\"mut\" style=\"margin:0; font-size:14.5px;\">Quản lý tập trung các bộ đề Bài học, Đọc hiểu và Luyện viết</p>\n        </div>\n        <span id=\"sync-badge\" class=\"sync-badge\" aria-live=\"polite\">Đã đồng bộ</span>\n      </div>\n\n      <!-- Segmented Tabs for 3 Sections -->\n      <div class=\"lib-tabs-bar\" role=\"tablist\" aria-label=\"Phân loại kho học liệu\">\n        <button class=\"lib-tab-btn active\" id=\"tab-btn-lessons\" data-tab=\"lessons\" type=\"button\" onclick=\"switchLibTab('lessons')\">\n          <span>Bộ đề Bài học</span>\n          <span class=\"lib-tab-badge\" id=\"lib-lessons-badge\">0</span>\n        </button>\n        <button class=\"lib-tab-btn\" id=\"tab-btn-reading\" data-tab=\"reading\" type=\"button\" onclick=\"switchLibTab('reading')\">\n          <span>Bộ đề Đọc hiểu</span>\n          <span class=\"lib-tab-badge\" id=\"lib-reading-badge\">0</span>\n        </button>\n        <button class=\"lib-tab-btn\" id=\"tab-btn-writing\" data-tab=\"writing\" type=\"button\" onclick=\"switchLibTab('writing')\">\n          <span>Bộ đề Viết</span>\n          <span class=\"lib-tab-badge\" id=\"lib-writing-badge\">0</span>\n        </button>\n      </div>\n\n      <!-- PANE 1: BỘ ĐỀ BÀI HỌC -->\n      <div id=\"lib-pane-lessons\" class=\"lib-tab-pane active\">\n        <!-- Search & Topic Tags Filter -->\n        <div class=\"lib-search-filter-card\">\n          <div class=\"lib-search-bar-row\">\n            <div class=\"lib-search-input-box\">\n              <span class=\"lib-search-lead-icon\">\n                <ion-icon name=\"search-outline\"></ion-icon>\n              </span>\n              <input id=\"lf\" type=\"text\" placeholder=\"Tìm kiếm bộ đề bài học theo tên, thẻ chủ đề…\" oninput=\"onLibSearchInput()\" autocomplete=\"off\">\n              <button id=\"lf-clear\" class=\"lib-search-clear-btn\" type=\"button\" onclick=\"clearLibSearch()\" aria-label=\"Xóa tìm kiếm\" hidden>\n                <ion-icon name=\"close-outline\"></ion-icon>\n              </button>\n            </div>\n            <div class=\"hud teacher-only lib-inline-actions\">\n              <button class=\"btn au sm\" onclick=\"newSet()\">\n                <ion-icon name=\"add-outline\"></ion-icon> Tạo bộ mới\n              </button>\n              <button class=\"btn cy sm\" onclick=\"openPromptDialog()\">\n                <ion-icon name=\"sparkles-outline\"></ion-icon> Soạn bằng AI\n              </button>\n              <button id=\"bulk-delete-start\" class=\"btn gh sm\" onclick=\"enableBulkDeleteMode()\">\n                <ion-icon name=\"trash-outline\"></ion-icon> Xóa nhiều\n              </button>\n              <div id=\"bulk-delete-actions\" hidden style=\"display:inline-flex; gap:6px;\">\n                <button id=\"bulk-delete\" class=\"btn no sm\" onclick=\"deleteSelectedSets()\" disabled>Xóa đã chọn (0)</button>\n                <button class=\"btn gh sm\" onclick=\"cancelBulkDeleteMode()\">Hủy</button>\n              </div>\n            </div>\n          </div>\n          <div class=\"topic-filter-row\">\n            <div class=\"topic-filter-meta\">\n              <span class=\"topic-filter-title\">Chủ đề:</span>\n              <span id=\"topic-filter-summary\" class=\"topic-filter-summary\"></span>\n            </div>\n            <div id=\"topic-chips-bar\" class=\"topic-chips-bar\" role=\"tablist\" aria-label=\"Bộ lọc thẻ chủ đề\"></div>\n          </div>\n        </div>\n        <div class=\"setup-sets-grid\" id=\"lg\"></div>\n      </div>\n\n      <!-- PANE 2: BỘ ĐỀ ĐỌC HIỂU -->\n      <div id=\"lib-pane-reading\" class=\"lib-tab-pane\">\n        <div class=\"lib-search-filter-card\">\n          <div class=\"lib-search-bar-row\">\n            <div class=\"lib-search-input-box\">\n              <span class=\"lib-search-lead-icon\">\n                <ion-icon name=\"search-outline\"></ion-icon>\n              </span>\n              <input id=\"lib-reading-search\" type=\"text\" placeholder=\"Tìm kiếm bộ đề đọc hiểu theo tên tác phẩm, tác giả...\" oninput=\"onLibReadingSearchInput()\" autocomplete=\"off\">\n            </div>\n            <div class=\"hud teacher-only lib-inline-actions\">\n              <button class=\"btn au sm\" type=\"button\" onclick=\"openCreateReadingSetModal()\" title=\"Tạo đề đọc hiểu mới\">\n                <ion-icon name=\"add-outline\"></ion-icon> Thêm đề mới\n              </button>\n              <button class=\"btn gh sm\" type=\"button\" onclick=\"promptAddNewReadingCategory()\" title=\"Tạo thêm chủ đề mới\">\n                <ion-icon name=\"pricetag-outline\"></ion-icon> + Chủ đề\n              </button>\n              <button class=\"btn gh sm\" type=\"button\" onclick=\"promptDeleteCurrentReadingCategory()\" title=\"Xóa chủ đề\">\n                <ion-icon name=\"trash-outline\"></ion-icon> Xóa chủ đề\n              </button>\n            </div>\n          </div>\n          <div class=\"topic-filter-row\">\n            <div class=\"topic-filter-meta\">\n              <span class=\"topic-filter-title\">Chủ đề:</span>\n              <span id=\"lib-reading-topic-summary\" class=\"topic-filter-summary\"></span>\n            </div>\n            <div id=\"lib-reading-chips-bar\" class=\"topic-chips-bar\" role=\"tablist\" aria-label=\"Bộ lọc chủ đề đọc hiểu\"></div>\n          </div>\n        </div>\n        <div class=\"setup-sets-grid\" id=\"lib-reading-grid\"></div>\n      </div>\n\n      <!-- PANE 3: BỘ ĐỀ VIẾT -->\n      <div id=\"lib-pane-writing\" class=\"lib-tab-pane\">\n        <div class=\"lib-search-filter-card\">\n          <div class=\"lib-search-bar-row\">\n            <div class=\"lib-search-input-box\">\n              <span class=\"lib-search-lead-icon\">\n                <ion-icon name=\"search-outline\"></ion-icon>\n              </span>\n              <input id=\"lib-writing-search\" type=\"text\" placeholder=\"Tìm kiếm bộ đề viết theo tiêu đề, dạng đề...\" oninput=\"onLibWritingSearchInput()\" autocomplete=\"off\">\n            </div>\n            <div class=\"hud teacher-only lib-inline-actions\">\n              <button class=\"btn au sm\" type=\"button\" onclick=\"openCreateWritingSetModal()\" title=\"Tạo bộ đề mới\">\n                <ion-icon name=\"add-outline\"></ion-icon> Thêm bộ mới\n              </button>\n              <button class=\"btn gh sm\" type=\"button\" onclick=\"promptAddNewCategory()\" title=\"Tạo thêm chủ đề mới\">\n                <ion-icon name=\"pricetag-outline\"></ion-icon> + Chủ đề\n              </button>\n              <button class=\"btn gh sm\" type=\"button\" onclick=\"promptDeleteCurrentCategory()\" title=\"Xóa chủ đề (có xác nhận)\">\n                <ion-icon name=\"trash-outline\"></ion-icon> Xóa chủ đề\n              </button>\n            </div>\n          </div>\n          <div class=\"topic-filter-row\">\n            <div class=\"topic-filter-meta\">\n              <span class=\"topic-filter-title\">Chủ đề:</span>\n              <span id=\"lib-writing-topic-summary\" class=\"topic-filter-summary\"></span>\n            </div>\n            <div id=\"lib-writing-chips-bar\" class=\"topic-chips-bar\" role=\"tablist\" aria-label=\"Bộ lọc chủ đề viết\"></div>\n          </div>\n        </div>\n        <div class=\"setup-sets-grid\" id=\"lib-writing-grid\"></div>\n      </div>\n    </div>\n\n    <!-- EDITOR VIEW -->\n    <div id=\"ev\" hidden>\n      <div style=\"display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:14px; flex-wrap:wrap;\">\n        <h1 style=\"font-size:22px; margin:0; font-weight:800;\">Soạn thảo bộ câu hỏi</h1>\n        <button class=\"btn gh sm\" onclick=\"go('lib')\">\n          <ion-icon name=\"arrow-back-outline\"></ion-icon> Quay lại thư viện\n        </button>\n      </div>\n      <div class=\"card\">\n        <div class=\"g2\">\n          <label>Tên bộ câu hỏi<input id=\"et\" oninput=\"meta()\"></label>\n          <label>Chủ đề / Bài học<input id=\"ec\" oninput=\"meta()\"></label>\n        </div>\n        <div class=\"editor-meta-bar\">\n          <div class=\"editor-meta-item\">\n            <span class=\"editor-meta-lbl\">Biểu tượng:</span>\n            <button class=\"emoji-trigger\" type=\"button\" onclick=\"toggleEmojiPicker()\" id=\"emoji-trigger-btn\"><span id=\"current-emo\">📖</span> ▾</button>\n          </div>\n          <div class=\"editor-meta-item\">\n            <label for=\"set-privacy\" class=\"editor-meta-lbl\"><ion-icon name=\"eye-outline\"></ion-icon> Hiển thị:</label>\n            <select id=\"set-privacy\" class=\"inp\" onchange=\"meta()\" title=\"Chọn chế độ hiển thị cho bộ đề\">\n              <option value=\"public\">Công khai</option>\n              <option value=\"private\">Riêng tư</option>\n            </select>\n          </div>\n          <div class=\"editor-meta-item\">\n            <label for=\"set-max-attempts\" class=\"editor-meta-lbl\"><ion-icon name=\"timer-outline\"></ion-icon> Số lượt:</label>\n            <input type=\"number\" id=\"set-max-attempts\" min=\"0\" max=\"999\" value=\"0\" class=\"inp\" style=\"width:68px;text-align:center;\" onchange=\"meta()\" title=\"0 = Không giới hạn\">\n          </div>\n          <div class=\"editor-meta-item\">\n            <label for=\"set-open-at\" class=\"editor-meta-lbl\"><ion-icon name=\"time-outline\"></ion-icon> Mở lúc:</label>\n            <input type=\"datetime-local\" id=\"set-open-at\" class=\"inp\" onchange=\"meta()\" title=\"Để trống = Mở ngay\">\n            <button type=\"button\" class=\"btn gh sm\" onclick=\"$('#set-open-at').value=''; meta();\" title=\"Mở ngay\" style=\"padding:2px 6px;height:28px;\">✕</button>\n          </div>\n          <div class=\"editor-meta-item\">\n            <label for=\"set-deadline\" class=\"editor-meta-lbl\"><ion-icon name=\"alarm-outline\"></ion-icon> Hạn nộp:</label>\n            <input type=\"datetime-local\" id=\"set-deadline\" class=\"inp\" onchange=\"meta()\" title=\"Để trống = Không giới hạn hạn nộp\">\n            <button type=\"button\" class=\"btn gh sm\" onclick=\"$('#set-deadline').value=''; meta();\" title=\"Xóa hạn nộp\" style=\"padding:2px 6px;height:28px;\">✕</button>\n          </div>\n        </div>\n        <div class=\"emoji-picker\" id=\"emoji-picker\"></div>\n      </div>\n\n      <div class=\"g2\" style=\"margin-top:16px; align-items:start;\">\n        <div class=\"card question-list-card\">\n          <h3 style=\"margin-bottom:10px;\">Danh sách câu hỏi (<span id=\"en\"></span>)</h3>\n          <input id=\"ef\" oninput=\"renderQs()\" placeholder=\"Tìm câu hỏi…\">\n          <div id=\"el\" style=\"margin-top:12px;\"></div>\n        </div>\n\n        <div class=\"card\">\n          <h3 id=\"eh\">Thêm câu hỏi mới</h3>\n          <div class=\"tabs\" id=\"ty\" style=\"display:flex; flex-wrap:wrap; gap:6px; margin-bottom:12px;\"></div>\n          \n          <label>Nội dung câu hỏi\n            <textarea id=\"fc\" placeholder=\"Nội dung câu hỏi (mặc định với dạng Đúng/Sai: Phát biểu sau đây là đúng?)\"></textarea>\n          </label>\n\n          <div data-t=\"tf\">\n            <label>Văn bản / Ngữ liệu đọc hiểu (không bắt buộc)\n              <textarea id=\"tf-passage\" style=\"min-height:85px;\" placeholder=\"Dán văn bản ngữ liệu, trích đoạn văn học nếu câu hỏi cần đọc hiểu...\"></textarea>\n            </label>\n            <div style=\"font-size:12.5px; color:var(--mut); margin:2px 0 10px;\">\n              Nếu để trống câu hỏi phía trên, hệ thống sẽ mặc định là: <b>\"Phát biểu sau đây là đúng?\"</b>\n            </div>\n            <label style=\"font-weight:700; margin-bottom:6px; display:block;\">4 phát biểu (nhấp chọn phát biểu Đúng / Sai):</label>\n            <div id=\"tf-items-editor\" class=\"tf-editor-container\"></div>\n          </div>\n\n          <div data-t=\"mc img\">\n            <label>4 phương án (đáp án đúng sẽ chọn sau khi thêm câu)</label>\n            <div id=\"fo\" class=\"option-editor\"></div>\n          </div>\n          \n          <div data-t=\"img\">\n            <label>Tải ảnh minh họa (PNG/JPG/WebP, &lt;1.5MB)\n              <input type=\"file\" accept=\"image/png,image/jpeg,image/webp\" onchange=\"pickImg(this)\">\n            </label>\n            <img id=\"fi\" class=\"qi\" hidden>\n          </div>\n          \n          <div data-t=\"short fill\">\n            <label>Đáp án chấp nhận (cách nhau bởi dấu |)<input id=\"fk\" placeholder=\"Hồ Chí Minh | Nguyễn Ái Quốc\"></label>\n          </div>\n          \n          <div data-t=\"match\">\n            <label>Các cặp ghép nối (mỗi dòng \"Vế 1 | Vế 2\")<textarea id=\"fp\"></textarea></label>\n          </div>\n          \n          <label>Lời giải thích chi tiết<textarea id=\"fe\" style=\"min-height:60px\"></textarea></label>\n          \n          <div class=\"g2\">\n            <label>Độ khó\n              <select id=\"fd\">\n                <option>Dễ</option>\n                <option>Trung bình</option>\n                <option>Khó</option>\n              </select>\n            </label>\n            <label>Nguồn trích dẫn<input id=\"fs\"></label>\n          </div>\n          \n          <div style=\"display:flex; gap:10px; margin-top:16px;\">\n            <button id=\"qsave\" class=\"btn au\" onclick=\"saveQ()\">\n              <ion-icon name=\"add-circle-outline\"></ion-icon> Thêm câu hỏi vào bộ\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>",
  "screen-setup": "<!-- SCREEN 3: SETUP & LESSONS (BÀI HỌC) -->\n<section id=\"s-setup\" class=\"scr\">\n  <div class=\"wrap\">\n    <!-- Hero Banner -->\n    <div class=\"cartoon-lib-banner setup-hero-banner\">\n      <div class=\"lib-banner-content\">\n        <h1 style=\"font-size:clamp(22px, 3.5vw, 28px); margin:0 0 4px; font-weight:800;\">Phòng bài học</h1>\n        <p class=\"mut\" style=\"margin:0; font-size:14.5px;\">Chọn bộ đề bài học bên dưới để bắt đầu luyện tập và thử thách kiến thức</p>\n      </div>\n    </div>\n\n    <!-- Search & Topic Filter Card -->\n    <div class=\"lib-search-filter-card\" style=\"margin: 0 0 16px;\">\n      <div class=\"lib-search-bar-row\">\n        <div class=\"lib-search-input-box\">\n          <span class=\"lib-search-lead-icon\">\n            <ion-icon name=\"search-outline\"></ion-icon>\n          </span>\n          <input id=\"setup-search\" type=\"text\" placeholder=\"Tìm kiếm bộ đề bài học theo tên, tác phẩm, chủ đề…\" oninput=\"onSetupSearchInput()\" autocomplete=\"off\">\n        </div>\n      </div>\n      <div class=\"topic-filter-row\" style=\"margin-top:10px;\">\n        <div class=\"topic-filter-meta\">\n          <span class=\"topic-filter-title\">Lọc theo chủ đề bài học:</span>\n          <span id=\"setup-topic-summary\" class=\"topic-filter-summary\"></span>\n        </div>\n        <div id=\"setup-topic-chips\" class=\"topic-chips-bar\" role=\"tablist\" aria-label=\"Bộ lọc chủ đề bài học\"></div>\n      </div>\n    </div>\n\n    <!-- Hidden compatibility elements for existing logic -->\n    <input type=\"hidden\" id=\"nick\" value=\"\">\n    <input type=\"hidden\" id=\"class-name\" value=\"\">\n    <select id=\"ss\" style=\"display:none;\" onchange=\"updateSetupQuestionCount()\"></select>\n    <input id=\"cnt-display\" type=\"hidden\" value=\"0\">\n\n    <!-- Grid of sets matching the user image -->\n    <div id=\"setup-sets-grid\" class=\"setup-sets-grid\"></div>\n\n    <!-- MODAL: HỎI TÊN VÀ LỚP KHI NHẤP VÀO BỘ CÂU HỎI -->\n    <dialog id=\"start-quiz-dialog\" class=\"writing-modal setup-start-modal\">\n      <div class=\"writing-modal-header\">\n        <div class=\"writing-modal-title\">\n          <h3 id=\"start-dialog-heading\">Thông tin người học</h3>\n        </div>\n        <button class=\"btn sm gh\" type=\"button\" onclick=\"closeStartQuizModal()\" aria-label=\"Đóng\">\n          <ion-icon name=\"close-outline\" style=\"font-size: 20px;\"></ion-icon>\n        </button>\n      </div>\n      \n      <form id=\"start-quiz-form\" onsubmit=\"handleStartQuizSubmit(event)\" class=\"writing-modal-form-wrap\">\n        <input type=\"hidden\" id=\"start-quiz-set-id\">\n        \n        <div class=\"writing-modal-body\" style=\"padding: 20px 24px;\">\n          <!-- Thông tin bộ đề đang chọn -->\n          <div class=\"setup-modal-set-preview\" id=\"start-modal-preview\">\n            <span class=\"setup-modal-pill\" id=\"start-modal-set-badge\">10 câu</span>\n            <h4 id=\"start-modal-set-title\" style=\"margin: 6px 0 0; font-size: 18px; font-weight: 800; line-height: 1.35;\"></h4>\n            <span id=\"start-modal-set-topic\" class=\"mut\" style=\"font-size: 13px; font-weight: 600; display: block; margin-top: 4px;\"></span>\n          </div>\n\n          <div style=\"margin-top: 18px;\">\n            <label for=\"start-nick\" style=\"font-weight: 700; display: block; margin-bottom: 6px; font-size: 14px;\">\n              Tên học sinh / Biệt danh <span style=\"color:var(--red)\">*</span>\n            </label>\n            <input type=\"text\" id=\"start-nick\" required maxlength=\"20\" placeholder=\"Nhập tên của bạn...\" style=\"font-size: 15px; padding: 11px 14px; width: 100%;\">\n          </div>\n\n          <div style=\"margin-top: 14px;\">\n            <label for=\"start-class-name\" style=\"font-weight: 700; display: block; margin-bottom: 6px; font-size: 14px;\">\n              Lớp (không bắt buộc)\n            </label>\n            <input type=\"text\" id=\"start-class-name\" maxlength=\"30\" placeholder=\"Ví dụ: 11A1, 10A2...\" style=\"font-size: 15px; padding: 11px 14px; width: 100%;\">\n          </div>\n        </div>\n\n        <div class=\"writing-modal-footer\">\n          <button type=\"button\" class=\"btn gh\" onclick=\"closeStartQuizModal()\">Hủy</button>\n          <button type=\"submit\" class=\"btn au\" style=\"font-weight: 800;\">\n            <ion-icon name=\"play-outline\"></ion-icon> Bắt đầu làm bài\n          </button>\n        </div>\n      </form>\n    </dialog>\n  </div>\n</section>",
  "screen-game": "<!-- SCREEN 4: GAMEPLAY -->\n<section id=\"s-game\" class=\"scr\">\n  <div class=\"wrap\">\n    <div class=\"hud\">\n      <div class=\"hud-pill\">Điểm: <b id=\"hs\">0</b></div>\n      <div class=\"hud-pill\">Chuỗi đúng: <b id=\"hc\">0</b></div>\n      <div class=\"hud-pill\" id=\"ht\" style=\"display:none;\"><ion-icon name=\"timer-outline\"></ion-icon> 20s</div>\n      <div class=\"hud-pill\">Câu: <b id=\"hp\">1/10</b></div>\n      <div style=\"display:flex; align-items:center; gap:8px; margin-left:auto;\">\n        <button class=\"btn gh sm\" id=\"btn-projector-toggle\" onclick=\"toggleProjectorMode()\" title=\"Chế độ máy chiếu\">\n          <ion-icon name=\"tv-outline\"></ion-icon> Máy chiếu\n        </button>\n        <button class=\"btn no sm btn-exit-exam\" type=\"button\" onclick=\"confirmExitCurrentSession('quiz')\" title=\"Thoát khỏi bài làm (Hệ thống sẽ nộp bài và tính 1 lượt làm)\">\n          <ion-icon name=\"log-out-outline\"></ion-icon> Thoát bài\n        </button>\n      </div>\n    </div>\n\n    <div class=\"bar\"><i id=\"pb\"></i></div>\n\n    <div id=\"boss\" hidden style=\"display:none !important;\"></div>\n\n    <!-- QUESTION CARD -->\n    <div class=\"card\" id=\"q\"></div>\n    \n  </div>\n</section>",
  "screen-res": "<!-- SCREEN 5: RESULTS -->\n<section id=\"s-res\" class=\"scr\">\n  <div class=\"wrap\">\n    <div class=\"hero\">\n      <h1 id=\"rt\">Kết quả bài làm</h1>\n      <p id=\"rn\" class=\"mut\" style=\"font-size:18px;\"></p>\n    </div>\n    <div class=\"card\" style=\"text-align:center;\">\n      <p id=\"score-save-status\" role=\"status\" aria-live=\"polite\" style=\"margin:0 0 10px;\">Đang lưu kết quả bảng xếp hạng...</p>\n      <button class=\"btn gh sm\" id=\"score-save-retry\" onclick=\"saveScoreToLeaderboard()\" hidden>\n        <ion-icon name=\"refresh-outline\"></ion-icon> Thử lưu lại\n      </button>\n    </div>\n    <div class=\"g3\" id=\"rs\" style=\"margin-bottom:24px;\"></div>\n\n    <div style=\"display:flex; flex-wrap:wrap; gap:12px; justify-content:center;\">\n      <button class=\"btn au\" onclick=\"replay()\">\n        <ion-icon name=\"refresh-outline\"></ion-icon> Làm lại\n      </button>\n      <button class=\"btn cy\" onclick=\"go('history')\">\n        <ion-icon name=\"time-outline\"></ion-icon> Xem lịch sử bài làm\n      </button>\n      <button class=\"btn gh\" onclick=\"go('setup')\">\n        <ion-icon name=\"book-outline\"></ion-icon> Chọn bộ khác\n      </button>\n      <button class=\"btn gh\" onclick=\"go('home')\">\n        <ion-icon name=\"home-outline\"></ion-icon> Trang chủ\n      </button>\n    </div>\n\n    <h2 style=\"margin-top:32px;\">Chi tiết từng câu hỏi</h2>\n    <div id=\"rv\"></div>\n  </div>\n</section>",
  "screen-writing": "<!-- SCREEN 5: WRITING PRACTICE (LUYỆN VIẾT) -->\n<section id=\"s-writing\" class=\"scr\">\n  <div class=\"wrap writing-wrap\">\n\n    <!-- VIEW 1: DANH SÁCH BỘ ĐỀ LUYỆN VIẾT -->\n    <div id=\"writing-list-view\">\n      <!-- Cartoon Hero Banner -->\n      <div class=\"writing-hero-banner\">\n        <div class=\"writing-hero-content\">\n          <h1 style=\"font-size:clamp(22px, 3.5vw, 28px); margin:0 0 4px; font-weight:800;\">Luyện viết văn</h1>\n          <p class=\"writing-hero-desc\">Rèn luyện kỹ năng viết văn theo cấu trúc mở bài, thân bài, kết bài và các dạng đề chuẩn.</p>\n        </div>\n      </div>\n\n      <!-- Action & Filters Bar -->\n      <div class=\"writing-control-bar card\">\n        <div class=\"writing-control-top\">\n          <div class=\"writing-search-box\" style=\"flex:1;\">\n            <span class=\"writing-search-icon\">\n              <ion-icon name=\"search-outline\"></ion-icon>\n            </span>\n            <input type=\"text\" id=\"writing-search-input\" placeholder=\"Tìm kiếm bộ đề theo tên, dạng đề hoặc chủ đề...\" oninput=\"onWritingSearchInput()\">\n          </div>\n        </div>\n\n        <div class=\"writing-category-filter\">\n          <div class=\"writing-filter-chips-wrap\">\n            <span class=\"reading-filter-label\">Chủ đề:</span>\n            <div class=\"writing-category-chips\" id=\"writing-category-chips\"></div>\n          </div>\n        </div>\n      </div>\n\n      <!-- Container danh sách các bộ đề (sắp xếp và gom nhóm theo chủ đề) -->\n      <div id=\"writing-sets-container\"></div>\n    </div>\n\n    <!-- VIEW 2: PHÒNG LUYỆN VIẾT (SPLIT SCREEN WORKSPACE) -->\n    <div id=\"writing-workspace-view\" style=\"display:none;\">\n      <!-- Workspace Navigation Bar -->\n      <div class=\"writing-workspace-nav\">\n        <div class=\"writing-workspace-title-box\">\n          <h3 id=\"workspace-set-title\">Đề bài luyện viết</h3>\n          <span id=\"workspace-set-badge\" class=\"tag ok\">Nghị luận xã hội</span>\n        </div>\n        <div class=\"writing-workspace-actions\" style=\"display:flex; align-items:center; gap:8px;\">\n          <button class=\"btn no sm btn-exit-exam\" type=\"button\" onclick=\"confirmExitCurrentSession('writing')\" title=\"Thoát bài luyện viết (Sẽ nộp bài và tính 1 lượt làm)\">\n            <ion-icon name=\"log-out-outline\"></ion-icon> <span>Thoát bài</span>\n          </button>\n          <button class=\"btn au sm\" onclick=\"submitWritingEssay()\" title=\"Nộp bài viết để lưu vào Lịch sử và giáo viên chấm điểm\" style=\"font-weight:700;\">\n            <ion-icon name=\"send-outline\"></ion-icon> <span>Nộp bài viết</span>\n          </button>\n          <button class=\"btn no sm teacher-only\" id=\"btn-delete-opened-writing-set\" onclick=\"deleteCurrentOpenedWritingSet()\" title=\"Xóa đề này khỏi danh sách\">\n            <ion-icon name=\"trash-outline\"></ion-icon> <span>Xóa đề</span>\n          </button>\n        </div>\n      </div>\n\n      <!-- Split Layout Container -->\n      <div class=\"writing-split-container\" id=\"writing-split-container\">\n        \n        <!-- LEFT PANEL: Đề bài & Dàn ý ngữ liệu -->\n        <div class=\"writing-left-panel\" id=\"writing-left-panel\">\n          <div class=\"writing-panel-scroll\">\n            \n            <!-- Hộp đề bài -->\n            <div class=\"writing-prompt-card\">\n              <div class=\"writing-prompt-header\">\n                <span class=\"writing-prompt-tag\">Đề bài</span>\n                <button type=\"button\" class=\"btn cy sm scaffold-trigger-btn\" onclick=\"toggleWritingScaffoldingPanel()\" title=\"Mở Giàn giáo nhận thức: Từ khóa, Công thức viết đoạn &amp; Sơ đồ dàn ý trống\">\n                  <ion-icon name=\"bulb-outline\"></ion-icon> <span>Gợi ý tư duy</span>\n                </button>\n              </div>\n              <div class=\"writing-prompt-text-wrapper\">\n                <p id=\"workspace-prompt-text\" class=\"writing-prompt-text\"></p>\n                <button type=\"button\" id=\"workspace-prompt-toggle-btn\" class=\"writing-prompt-toggle\" onclick=\"togglePromptExpand()\">Xem thêm</button>\n              </div>\n            </div>\n\n            <!-- Hộp Giàn giáo nhận thức (Scaffolding) cho Luyện viết -->\n            <div class=\"scaffold-box writing-scaffold-card\" id=\"writing-scaffolding-panel\" style=\"display:none;\">\n              <div class=\"scaffold-header\">\n                <div class=\"scaffold-title-row\">\n                  <span class=\"scaffold-badge-icon\">💡</span>\n                  <div>\n                    <h4 class=\"scaffold-title\">Giàn Giáo Nhận Thức (Scaffolding)</h4>\n                    <p class=\"scaffold-subtitle\">Công thức tư duy, từ khóa gợi mở &amp; sơ đồ dàn ý trống GDPT 2018</p>\n                  </div>\n                </div>\n                <button type=\"button\" class=\"btn gh sm\" onclick=\"toggleWritingScaffoldingPanel()\" style=\"padding:2px 8px;\">Thu gọn</button>\n              </div>\n              <div id=\"writing-scaffolding-body\"></div>\n            </div>\n\n          </div>\n        </div>\n\n        <!-- RESIZE SPLITTER / DIVIDER -->\n        <div class=\"writing-splitter\" id=\"writing-splitter\" title=\"Kéo để thay đổi độ rộng 2 cột\">\n          <div class=\"writing-splitter-handle\"></div>\n        </div>\n\n        <!-- RIGHT PANEL: Không gian viết bài theo từng phần bài viết -->\n        <div class=\"writing-right-panel\" id=\"writing-right-panel\">\n          \n          <!-- Header thanh công cụ phải -->\n          <div class=\"writing-editor-header\">\n            <span style=\"font-size:14px; font-weight:700; color:var(--ink);\">Bài làm</span>\n            <div style=\"display:flex; align-items:center; gap:8px; flex-wrap:wrap;\">\n              <div class=\"writing-word-count-badge\">\n                Tổng số từ: <b id=\"workspace-total-words\">0</b>\n              </div>\n            </div>\n          </div>\n\n          <!-- Danh sách các ô viết theo từng phần của Dàn ý -->\n          <div class=\"writing-sections-list\" id=\"writing-sections-list\"></div>\n\n          <!-- Bottom Sticky Action Bar -->\n          <div class=\"writing-bottom-bar\">\n            <div class=\"writing-timer-box\" id=\"writing-timer-box\">\n              <span class=\"writing-timer-label\">⏱️ Áp lực phòng thi:</span>\n              <select class=\"ept-mode-select\" id=\"writing-timer-preset\" onchange=\"setWritingPressureMode(this.value)\" title=\"Chọn chế độ hẹn giờ rèn áp lực phòng thi\">\n                <option value=\"0\">Đếm xuôi (Tự do)</option>\n                <option value=\"20\">🔥 20 phút (Đoạn NLXH 200 chữ)</option>\n                <option value=\"45\">⚡ 45 phút (Bài nghị luận ngắn)</option>\n                <option value=\"60\">🏆 60 phút (Bài Nghị luận Văn học)</option>\n                <option value=\"90\">🎓 90 phút (Đề thi tổng hợp)</option>\n              </select>\n              <b class=\"writing-timer-value\" id=\"workspace-timer-display\">00:00:00</b>\n              <button class=\"writing-timer-btn\" id=\"workspace-timer-btn\" onclick=\"toggleWritingTimer()\" title=\"Tạm dừng / Tiếp tục\">\n                ⏸\n              </button>\n              <button class=\"writing-timer-btn\" type=\"button\" onclick=\"resetWritingPressureTimer()\" title=\"Đặt lại đồng hồ\">\n                ↺\n              </button>\n            </div>\n\n            <div class=\"writing-bottom-buttons\" style=\"display:flex; align-items:center; gap:8px;\">\n              <button class=\"writing-btn-review\" type=\"button\" onclick=\"openWritingReviewModal()\">\n                <ion-icon name=\"document-text-outline\"></ion-icon> <span>Xem &amp; Xuất bài</span>\n              </button>\n              <button class=\"btn au sm\" type=\"button\" onclick=\"submitWritingEssay()\" title=\"Nộp bài viết vào Lịch sử\" style=\"font-weight:700; height:42px; padding:0 18px; border-radius:10px;\">\n                <ion-icon name=\"send-outline\"></ion-icon> <span>Nộp bài viết</span>\n              </button>\n            </div>\n          </div>\n\n        </div>\n\n      </div>\n    </div>\n\n  </div>\n</section>",
  "screen-reading": "<!-- SCREEN: READING COMPREHENSION (ĐỌC HIỂU NGỮ VĂN) -->\n<section id=\"s-reading\" class=\"scr\">\n  <div class=\"wrap reading-wrap\">\n\n    <!-- VIEW 1: DANH SÁCH BỘ ĐỀ ĐỌC HIỂU -->\n    <div id=\"reading-list-view\">\n      <!-- Cartoon Hero Banner -->\n      <div class=\"reading-hero-banner\">\n        <div class=\"reading-hero-content\">\n          <h1 style=\"font-size:clamp(22px, 3.5vw, 28px); margin:0 0 4px; font-weight:800;\">Luyện Đọc hiểu Ngữ Văn</h1>\n          <p class=\"reading-hero-desc\">Rèn luyện kỹ năng đọc hiểu văn bản, nhận diện phương thức biểu đạt, biện pháp nghệ thuật và phát triển tư duy phản biện.</p>\n        </div>\n      </div>\n\n      <!-- Action & Filters Bar -->\n      <div class=\"reading-control-bar card\">\n        <div class=\"reading-control-top\">\n          <div class=\"reading-search-box\">\n            <span class=\"reading-search-icon\">\n              <ion-icon name=\"search-outline\"></ion-icon>\n            </span>\n            <input type=\"text\" id=\"reading-search-input\" placeholder=\"Tìm kiếm bộ đề đọc hiểu theo tên bài, tác giả hoặc thể loại...\" oninput=\"onReadingSearchInput()\">\n          </div>\n        </div>\n\n        <div class=\"reading-category-filter\">\n          <div class=\"reading-filter-chips-wrap\">\n            <span class=\"reading-filter-label\">Chủ đề:</span>\n            <div class=\"reading-category-chips\" id=\"reading-category-chips\"></div>\n          </div>\n        </div>\n      </div>\n\n      <!-- Container danh sách các bộ đề đọc hiểu (sắp xếp theo chủ đề) -->\n      <div id=\"reading-sets-container\"></div>\n    </div>\n\n    <!-- VIEW 2: PHÒNG ĐỌC HIỂU & LÀM BÀI (SPLIT SCREEN WORKSPACE) -->\n    <div id=\"reading-workspace-view\" style=\"display:none;\">\n      <!-- Workspace Navigation Bar -->\n      <div class=\"reading-workspace-nav\">\n        <div class=\"reading-workspace-title-box\">\n          <h3 id=\"reading-workspace-set-title\">Đề bài đọc hiểu</h3>\n          <span id=\"reading-workspace-set-badge\" class=\"tag cy\">Thơ hiện đại</span>\n        </div>\n        <div class=\"reading-workspace-actions\">\n          <div class=\"exam-pressure-timer-widget\" id=\"reading-pressure-timer-widget\">\n            <span class=\"ept-icon\">⏱️</span>\n            <select class=\"ept-mode-select\" id=\"reading-timer-preset\" onchange=\"setReadingPressureTimer(this.value)\" title=\"Chọn thời gian rèn áp lực phòng thi\">\n              <option value=\"0\">Tự do (Đếm xuôi)</option>\n              <option value=\"15\">🔥 15 phút (Đọc hiểu nhanh)</option>\n              <option value=\"20\" selected>⚡ 20 phút (Đoạn văn 200 chữ)</option>\n              <option value=\"30\">🏆 30 phút (Đọc hiểu + Đoạn văn)</option>\n              <option value=\"45\">🎓 45 phút (Đề kiểm tra)</option>\n            </select>\n            <b class=\"ept-clock\" id=\"reading-timer-clock\">20:00</b>\n            <button type=\"button\" class=\"ept-ctrl-btn\" id=\"reading-timer-toggle-btn\" onclick=\"toggleReadingPressureTimer()\" title=\"Bắt đầu / Tạm dừng đồng hồ\">▶️</button>\n            <button type=\"button\" class=\"ept-ctrl-btn\" onclick=\"resetReadingPressureTimer()\" title=\"Đặt lại đồng hồ\">↺</button>\n          </div>\n          <button class=\"btn no sm btn-exit-exam\" type=\"button\" onclick=\"confirmExitCurrentSession('reading')\" title=\"Thoát bài đọc hiểu (Sẽ nộp bài và tính 1 lượt làm)\">\n            <ion-icon name=\"log-out-outline\"></ion-icon> <span>Thoát bài</span>\n          </button>\n          <button class=\"btn gh sm\" onclick=\"resetCurrentReadingDraft()\" title=\"Xóa toàn bộ câu trả lời để làm lại từ đầu\">\n            <ion-icon name=\"refresh-outline\"></ion-icon> <span>Làm lại</span>\n          </button>\n          <button class=\"btn no sm teacher-only\" onclick=\"deleteCurrentOpenedReadingSet()\" title=\"Xóa đề này khỏi danh sách\">\n            <ion-icon name=\"trash-outline\"></ion-icon> <span>Xóa đề</span>\n          </button>\n          <button class=\"btn au sm\" onclick=\"submitReadingAnswers()\" title=\"Nộp bài và xem đánh giá chi tiết\">\n            <ion-icon name=\"checkmark-done-outline\"></ion-icon> <span>Nộp bài làm</span>\n          </button>\n        </div>\n      </div>\n\n      <!-- Split Layout Container -->\n      <div class=\"reading-split-container\" id=\"reading-split-container\">\n        <!-- Cột trái: Văn bản / Ngữ liệu đọc hiểu -->\n        <div class=\"reading-passage-panel card\">\n          <div class=\"reading-panel-header\">\n            <div class=\"reading-panel-title\">\n              <span class=\"reading-panel-icon\">\n                <ion-icon name=\"document-text-outline\" style=\"font-size: 20px;\"></ion-icon>\n              </span>\n              <h4>I. PHẦN ĐỌC HIỂU (3,0 điểm)</h4>\n            </div>\n            <div class=\"reading-text-tools\">\n              <button class=\"btn gh sm btn-icon-only\" type=\"button\" onclick=\"changePassageFontSize(-1)\" title=\"Giảm cỡ chữ\">A-</button>\n              <button class=\"btn gh sm btn-icon-only\" type=\"button\" onclick=\"changePassageFontSize(1)\" title=\"Tăng cỡ chữ\">A+</button>\n            </div>\n          </div>\n          \n          <div class=\"reading-passage-content-wrap\" id=\"reading-passage-scroll\">\n            <div class=\"reading-passage-meta\" id=\"reading-passage-meta\">\n              <span class=\"reading-meta-tag\" id=\"reading-passage-genre\"></span>\n              <span class=\"reading-meta-author\" id=\"reading-passage-author\"></span>\n              <span class=\"reading-meta-work\" id=\"reading-passage-work\" style=\"display:none;\"></span>\n            </div>\n            <div class=\"reading-passage-lead-text\"><b>Đọc đoạn trích:</b></div>\n            <article class=\"reading-passage-body\" id=\"reading-passage-text\">\n              <!-- Nội dung văn bản đọc hiểu -->\n            </article>\n            <div class=\"reading-passage-source\" id=\"reading-passage-source\">\n              <!-- Nguồn trích dẫn -->\n            </div>\n          </div>\n        </div>\n\n        <!-- Cột phải: Hệ thống câu hỏi & Trả lời -->\n        <div class=\"reading-questions-panel card\">\n          <div class=\"reading-panel-header\">\n            <div class=\"reading-panel-title\">\n              <span class=\"reading-panel-icon\">\n                <ion-icon name=\"create-outline\" style=\"font-size: 20px;\"></ion-icon>\n              </span>\n              <h4>Thực hiện các yêu cầu sau: (<span id=\"reading-q-count\">0</span> câu)</h4>\n            </div>\n            <span class=\"reading-save-status\" id=\"reading-save-status\">\n              <ion-icon name=\"cloud-done-outline\"></ion-icon> Tự động lưu\n            </span>\n          </div>\n\n          <div class=\"reading-questions-list\" id=\"reading-questions-list\">\n            <!-- Danh sách câu hỏi render bởi JS -->\n          </div>\n        </div>\n      </div>\n    </div>\n\n  </div>\n</section>",
  "screen-history": "<!-- SCREEN: QUIZ HISTORY (LỊCH SỬ BÀI LÀM) -->\n<section id=\"s-history\" class=\"scr\">\n  <div class=\"wrap\">\n    <!-- Hero Banner -->\n    <div class=\"cartoon-lib-banner history-hero-banner\" style=\"margin-bottom:16px;\">\n      <div class=\"lib-banner-content\">\n        <h1 style=\"font-size:clamp(22px, 3.5vw, 28px); margin:0 0 4px; font-weight:800;\">\n          Lịch sử bài làm &amp; Tiến độ\n        </h1>\n        <p class=\"mut\" style=\"margin:0; font-size:14.5px;\">\n          Theo dõi kết quả làm bài, câu trả lời tự luận và tiến trình ôn tập\n        </p>\n      </div>\n    </div>\n\n\n    <!-- Filter & Search Bar Card -->\n    <div class=\"lib-search-filter-card\" style=\"margin: 0 0 16px;\">\n      <div class=\"lib-search-bar-row\" style=\"display:flex; gap:12px; align-items:center; flex-wrap:wrap;\">\n        <div class=\"lib-search-input-box\" style=\"flex:1; min-width:240px;\">\n          <input id=\"history-page-search\" type=\"text\" placeholder=\"Tìm kiếm theo tên học sinh, lớp, tác phẩm, chủ đề…\" oninput=\"onHistoryPageSearchInput()\" autocomplete=\"off\">\n        </div>\n        <div style=\"display:flex; align-items:center; gap:10px; flex-wrap:wrap;\">\n          <select id=\"history-page-set-filter\" onchange=\"onHistoryPageSetFilterChange()\" style=\"height:46px; border-radius:14px; border:2px solid var(--stroke); padding:0 14px; font-weight:700; font-size:13.5px; background:var(--bg-card); color:var(--ink); min-width:200px; max-width:280px;\" title=\"Lọc theo bộ câu hỏi\">\n            <option value=\"\">Tất cả bộ đề</option>\n          </select>\n          <button class=\"btn no sm teacher-only\" type=\"button\" onclick=\"clearAllQuizHistory()\" title=\"Xóa toàn bộ lịch sử trên máy\" style=\"height:46px; padding:0 14px; font-weight:700; border-radius:14px;\">\n            <ion-icon name=\"trash-outline\"></ion-icon> <span>Xóa tất cả</span>\n          </button>\n        </div>\n      </div>\n\n      <!-- Type Filter Chips (Tất cả / Bài học / Đọc hiểu) -->\n      <div class=\"topic-filter-row\" style=\"margin-top:12px;\">\n        <div class=\"topic-filter-meta\">\n          <span class=\"topic-filter-title\">Loại bài làm:</span>\n        </div>\n        <div class=\"topic-chips-bar\" role=\"tablist\">\n          <button class=\"topic-chip active\" id=\"hist-chip-all\" type=\"button\" onclick=\"setHistoryTypeFilter('all')\">\n            Tất cả <span id=\"hist-count-all\" class=\"chip-count\">(0)</span>\n          </button>\n          <button class=\"topic-chip\" id=\"hist-chip-quiz\" type=\"button\" onclick=\"setHistoryTypeFilter('quiz')\">\n            Bài học <span id=\"hist-count-quiz\" class=\"chip-count\">(0)</span>\n          </button>\n          <button class=\"topic-chip\" id=\"hist-chip-reading\" type=\"button\" onclick=\"setHistoryTypeFilter('reading')\">\n            Đọc hiểu <span id=\"hist-count-reading\" class=\"chip-count\">(0)</span>\n          </button>\n          <button class=\"topic-chip\" id=\"hist-chip-writing\" type=\"button\" onclick=\"setHistoryTypeFilter('writing')\">\n            Luyện viết <span id=\"hist-count-writing\" class=\"chip-count\">(0)</span>\n          </button>\n          <button class=\"topic-chip\" id=\"hist-chip-ungraded\" type=\"button\" onclick=\"setHistoryTypeFilter('ungraded')\">\n            Chờ chấm <span id=\"hist-count-ungraded\" class=\"chip-count\">(0)</span>\n          </button>\n          <button class=\"topic-chip\" id=\"hist-chip-graded\" type=\"button\" onclick=\"setHistoryTypeFilter('graded')\">\n            Đã chấm <span id=\"hist-count-graded\" class=\"chip-count\">(0)</span>\n          </button>\n        </div>\n      </div>\n\n      <!-- Active Set Filter Badge -->\n      <div id=\"history-page-active-filter-badge\" style=\"display:none; margin-top:12px; padding:8px 14px; background:rgba(217, 169, 79, 0.15); border:1.5px solid var(--gold); border-radius:12px; font-size:13.5px; font-weight:700; align-items:center; justify-content:space-between;\">\n        <span id=\"history-page-filter-badge-text\"></span>\n        <button class=\"btn gh sm\" type=\"button\" onclick=\"clearHistoryPageSetFilter()\" style=\"padding:2px 10px; font-size:12.5px; height:28px;\">\n          <ion-icon name=\"close-circle-outline\"></ion-icon> Xem tất cả bộ đề\n        </button>\n      </div>\n    </div>\n\n    <!-- History Items Container -->\n    <div id=\"history-page-list-container\" class=\"history-list-wrap\">\n      <!-- Rendered by JS -->\n    </div>\n  </div>\n</section>",
  "dialogs": "<!-- FEEDBACK DIALOG -->\n<dialog id=\"feedback-dialog\" aria-live=\"polite\">\n  <div id=\"fb\"></div>\n</dialog>\n\n<!-- CONFIRM DELETE DIALOG -->\n<dialog id=\"dlg\">\n  <p id=\"dm\" style=\"font-size:16px; font-weight:600; margin-bottom:20px;\"></p>\n  <div style=\"display:flex; gap:10px; justify-content:flex-end;\">\n    <button class=\"btn gh sm\" onclick=\"dlg.close()\">Hủy</button>\n    <button class=\"btn no sm\" id=\"dy\">Xóa</button>\n  </div>\n</dialog>\n\n<!-- AI PROMPT DIALOG -->\n<dialog id=\"prompt-dialog\">\n  <div class=\"prompt-dialog-header\">\n    <div>\n      <h2 style=\"display:flex; align-items:center; gap:8px;\">Tạo bộ câu hỏi bằng trợ lý AI</h2>\n      <p class=\"mut\" style=\"margin:4px 0 0; font-size:13px;\">Tạo câu lệnh → Gửi AI → Nhập câu hỏi vào hệ thống</p>\n    </div>\n    <button class=\"btn gh sm prompt-dialog-close\" type=\"button\"\n      onclick=\"$('#prompt-dialog').close()\" aria-label=\"Đóng cửa sổ tạo bộ câu hỏi\" title=\"Đóng\">×</button>\n  </div>\n\n  <div style=\"background:rgba(217, 169, 79, 0.12); border:1px solid var(--gold); border-radius:12px; padding:9px 13px; margin-bottom:14px; font-size:13px; line-height:1.5;\">\n    Hệ thống tạo câu lệnh chuẩn để gửi sang <b>ChatGPT, Gemini hoặc Claude</b>. Sau khi AI trả lời, bạn dán kết quả vào <b>Bước 3</b> bên dưới để tự động tạo bộ câu hỏi.\n  </div>\n\n  <!-- BƯỚC 1 -->\n  <div class=\"prompt-step-box\">\n    <div class=\"prompt-step-title\">\n      <span class=\"prompt-step-badge\">1</span>\n      <span>Thiết lập nội dung & Tạo câu lệnh</span>\n    </div>\n    \n    <label for=\"prompt-topic\" style=\"font-weight:600;\">Chủ đề / Tác phẩm / Bài học <span style=\"color:var(--gold);\">*</span></label>\n    <input id=\"prompt-topic\" type=\"text\" maxlength=\"500\"\n      placeholder=\"Ví dụ: Ông già và biển cả, Vợ nhặt, Tây Tiến, Chí Phèo...\">\n\n    <!-- TỔNG SỐ CÂU HỎI & CHIA ĐỀU -->\n    <div style=\"display:grid; grid-template-columns: 1fr auto; gap:12px; margin-top:12px; align-items:end;\">\n      <div>\n        <label for=\"prompt-question-count\" style=\"font-weight:600;\">Tổng số câu hỏi của bộ đề</label>\n        <select id=\"prompt-question-count\" onchange=\"onPromptTotalCountChange()\">\n          <option value=\"4\">4 câu</option>\n          <option value=\"5\">5 câu</option>\n          <option value=\"6\">6 câu</option>\n          <option value=\"8\">8 câu</option>\n          <option value=\"10\" selected>10 câu</option>\n          <option value=\"12\">12 câu</option>\n          <option value=\"15\">15 câu</option>\n          <option value=\"16\">16 câu</option>\n          <option value=\"20\">20 câu</option>\n          <option value=\"25\">25 câu</option>\n          <option value=\"30\">30 câu</option>\n        </select>\n      </div>\n      <div>\n        <button class=\"btn gh sm\" type=\"button\" onclick=\"autoDistributePromptTypes()\" title=\"Chia đều số câu theo các dạng đang chọn\" style=\"height:42px; padding:0 12px; font-weight:700;\">\n          Chia đều số câu\n        </button>\n      </div>\n    </div>\n\n    <!-- PHÂN BỔ SỐ CÂU THEO TỪNG DẠNG -->\n    <fieldset style=\"margin-top:12px; padding:12px 14px; border:1px solid var(--stroke); border-radius:12px; background:var(--bg);\">\n      <div style=\"display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:6px;\">\n        <legend style=\"padding:0 6px; font-weight:700; font-size:12px; color:var(--mut); margin:0;\">PHÂN BỔ SỐ CÂU THEO TỪNG DẠNG</legend>\n        <span id=\"prompt-count-status-badge\" style=\"font-size:11.5px; font-weight:700; padding:2px 8px; border-radius:6px;\"></span>\n      </div>\n\n      <div style=\"display:flex; flex-direction:column; gap:8px;\">\n        <!-- Dạng 1: Trắc nghiệm -->\n        <div class=\"prompt-type-item\" style=\"display:flex; align-items:center; justify-content:space-between; gap:10px; padding:7px 12px; background:var(--bg-card); border:1px solid var(--stroke); border-radius:10px;\">\n          <label style=\"margin:0; display:flex; align-items:center; gap:8px; cursor:pointer; font-weight:600; font-size:13.5px; flex:1;\">\n            <input type=\"checkbox\" id=\"prompt-type-cb-mc\" name=\"prompt-question-type\" value=\"mc\" checked onchange=\"onPromptTypeToggle('mc')\" style=\"width:auto; margin:0;\">\n            <span>Trắc nghiệm (4 lựa chọn)</span>\n          </label>\n          <div style=\"display:flex; align-items:center; gap:4px;\">\n            <button type=\"button\" class=\"btn gh sm\" onclick=\"adjustPromptTypeCount('mc', -1)\" style=\"width:26px; height:26px; padding:0; min-height:unset; font-size:14px; font-weight:900;\">-</button>\n            <input id=\"prompt-count-mc\" type=\"number\" min=\"0\" max=\"50\" value=\"4\" oninput=\"onPromptTypeCountInput('mc')\" style=\"width:44px; text-align:center; padding:2px 4px; font-weight:800; font-size:13.5px; height:26px; border-radius:6px;\">\n            <button type=\"button\" class=\"btn gh sm\" onclick=\"adjustPromptTypeCount('mc', 1)\" style=\"width:26px; height:26px; padding:0; min-height:unset; font-size:14px; font-weight:900;\">+</button>\n            <span style=\"font-size:12px; color:var(--mut); min-width:22px;\">câu</span>\n          </div>\n        </div>\n\n        <!-- Dạng 2: Đúng / Sai -->\n        <div class=\"prompt-type-item\" style=\"display:flex; align-items:center; justify-content:space-between; gap:10px; padding:7px 12px; background:var(--bg-card); border:1px solid var(--stroke); border-radius:10px;\">\n          <label style=\"margin:0; display:flex; align-items:center; gap:8px; cursor:pointer; font-weight:600; font-size:13.5px; flex:1;\">\n            <input type=\"checkbox\" id=\"prompt-type-cb-tf\" name=\"prompt-question-type\" value=\"tf\" checked onchange=\"onPromptTypeToggle('tf')\" style=\"width:auto; margin:0;\">\n            <span>Đúng / Sai (4 ý)</span>\n          </label>\n          <div style=\"display:flex; align-items:center; gap:4px;\">\n            <button type=\"button\" class=\"btn gh sm\" onclick=\"adjustPromptTypeCount('tf', -1)\" style=\"width:26px; height:26px; padding:0; min-height:unset; font-size:14px; font-weight:900;\">-</button>\n            <input id=\"prompt-count-tf\" type=\"number\" min=\"0\" max=\"50\" value=\"2\" oninput=\"onPromptTypeCountInput('tf')\" style=\"width:44px; text-align:center; padding:2px 4px; font-weight:800; font-size:13.5px; height:26px; border-radius:6px;\">\n            <button type=\"button\" class=\"btn gh sm\" onclick=\"adjustPromptTypeCount('tf', 1)\" style=\"width:26px; height:26px; padding:0; min-height:unset; font-size:14px; font-weight:900;\">+</button>\n            <span style=\"font-size:12px; color:var(--mut); min-width:22px;\">câu</span>\n          </div>\n        </div>\n\n        <!-- Dạng 3: Trả lời ngắn -->\n        <div class=\"prompt-type-item\" style=\"display:flex; align-items:center; justify-content:space-between; gap:10px; padding:7px 12px; background:var(--bg-card); border:1px solid var(--stroke); border-radius:10px;\">\n          <label style=\"margin:0; display:flex; align-items:center; gap:8px; cursor:pointer; font-weight:600; font-size:13.5px; flex:1;\">\n            <input type=\"checkbox\" id=\"prompt-type-cb-short\" name=\"prompt-question-type\" value=\"short\" checked onchange=\"onPromptTypeToggle('short')\" style=\"width:auto; margin:0;\">\n            <span>Trả lời ngắn</span>\n          </label>\n          <div style=\"display:flex; align-items:center; gap:4px;\">\n            <button type=\"button\" class=\"btn gh sm\" onclick=\"adjustPromptTypeCount('short', -1)\" style=\"width:26px; height:26px; padding:0; min-height:unset; font-size:14px; font-weight:900;\">-</button>\n            <input id=\"prompt-count-short\" type=\"number\" min=\"0\" max=\"50\" value=\"2\" oninput=\"onPromptTypeCountInput('short')\" style=\"width:44px; text-align:center; padding:2px 4px; font-weight:800; font-size:13.5px; height:26px; border-radius:6px;\">\n            <button type=\"button\" class=\"btn gh sm\" onclick=\"adjustPromptTypeCount('short', 1)\" style=\"width:26px; height:26px; padding:0; min-height:unset; font-size:14px; font-weight:900;\">+</button>\n            <span style=\"font-size:12px; color:var(--mut); min-width:22px;\">câu</span>\n          </div>\n        </div>\n\n        <!-- Dạng 4: Điền từ -->\n        <div class=\"prompt-type-item\" style=\"display:flex; align-items:center; justify-content:space-between; gap:10px; padding:7px 12px; background:var(--bg-card); border:1px solid var(--stroke); border-radius:10px;\">\n          <label style=\"margin:0; display:flex; align-items:center; gap:8px; cursor:pointer; font-weight:600; font-size:13.5px; flex:1;\">\n            <input type=\"checkbox\" id=\"prompt-type-cb-fill\" name=\"prompt-question-type\" value=\"fill\" checked onchange=\"onPromptTypeToggle('fill')\" style=\"width:auto; margin:0;\">\n            <span>Điền từ vào chỗ trống</span>\n          </label>\n          <div style=\"display:flex; align-items:center; gap:4px;\">\n            <button type=\"button\" class=\"btn gh sm\" onclick=\"adjustPromptTypeCount('fill', -1)\" style=\"width:26px; height:26px; padding:0; min-height:unset; font-size:14px; font-weight:900;\">-</button>\n            <input id=\"prompt-count-fill\" type=\"number\" min=\"0\" max=\"50\" value=\"2\" oninput=\"onPromptTypeCountInput('fill')\" style=\"width:44px; text-align:center; padding:2px 4px; font-weight:800; font-size:13.5px; height:26px; border-radius:6px;\">\n            <button type=\"button\" class=\"btn gh sm\" onclick=\"adjustPromptTypeCount('fill', 1)\" style=\"width:26px; height:26px; padding:0; min-height:unset; font-size:14px; font-weight:900;\">+</button>\n            <span style=\"font-size:12px; color:var(--mut); min-width:22px;\">câu</span>\n          </div>\n        </div>\n      </div>\n\n      <!-- TỔNG KẾT & CẢNH BÁO TỔNG SỐ CÂU -->\n      <div id=\"prompt-sum-indicator\" style=\"margin-top:10px; font-size:12.5px; padding:7px 12px; border-radius:8px; display:flex; justify-content:space-between; align-items:center; font-weight:600;\"></div>\n    </fieldset>\n\n    <label for=\"prompt-source\" style=\"margin-top:12px; font-weight:600;\">\n      Văn bản / Ngữ liệu đọc hiểu <span style=\"font-weight:400; color:var(--mut); font-size:12px;\">(Không bắt buộc)</span>\n    </label>\n    <textarea id=\"prompt-source\" maxlength=\"20000\"\n      placeholder=\"Dán đoạn trích nếu muốn câu hỏi đọc hiểu bám sát ngữ liệu riêng. Nếu để trống, AI sẽ tự động tạo câu hỏi dựa trên kiến thức tác phẩm chuẩn theo SGK...\"\n      style=\"min-height:85px;\"></textarea>\n    <div style=\"display:flex; justify-content:flex-end; align-items:center; margin-top:4px; font-size:12px;\">\n      <span id=\"prompt-source-count\" class=\"mut\" aria-live=\"polite\"></span>\n    </div>\n\n    <div style=\"margin-top:12px;\">\n      <button class=\"btn au\" type=\"button\" onclick=\"buildQuestionPrompt()\" style=\"width:100%; justify-content:center; font-weight:700; padding:11px;\">\n        Tạo câu lệnh AI\n      </button>\n    </div>\n  </div>\n\n  <!-- BƯỚC 2 -->\n  <div class=\"prompt-step-box\">\n    <div class=\"prompt-step-title\">\n      <span class=\"prompt-step-badge\">2</span>\n      <span>Gửi câu lệnh sang AI để nhận câu hỏi</span>\n    </div>\n    \n    <label for=\"prompt-output\" style=\"font-weight:600; font-size:13px;\">Câu lệnh AI đã sẵn sàng:</label>\n    <textarea id=\"prompt-output\" readonly style=\"min-height:110px; font-size:12px; font-family:monospace;\"\n      placeholder=\"Câu lệnh sẽ xuất hiện tại đây sau khi bạn nhấn nút ở Bước 1...\"></textarea>\n    \n    <div style=\"display:flex; flex-wrap:wrap; gap:8px; margin-top:8px; align-items:center;\">\n      <button class=\"btn cy sm\" type=\"button\" onclick=\"copyQuestionPrompt()\">\n        <ion-icon name=\"copy-outline\"></ion-icon> Sao chép câu lệnh\n      </button>\n      <span style=\"font-size:12px; color:var(--mut); margin:0 4px;\">Hoặc mở nhanh AI:</span>\n      <button class=\"btn gh sm\" type=\"button\" onclick=\"openExternalAI('chatgpt')\">Mở ChatGPT</button>\n      <button class=\"btn gh sm\" type=\"button\" onclick=\"openExternalAI('gemini')\">Mở Gemini</button>\n      <button class=\"btn gh sm\" type=\"button\" onclick=\"openExternalAI('claude')\">Mở Claude</button>\n    </div>\n  </div>\n\n  <!-- BƯỚC 3 -->\n  <div class=\"prompt-step-box\" style=\"margin-bottom:0;\">\n    <div class=\"prompt-step-title\">\n      <span class=\"prompt-step-badge\">3</span>\n      <span>Dán kết quả từ AI & Nhập vào hệ thống</span>\n    </div>\n    \n    <label for=\"prompt-result\" style=\"font-weight:600; font-size:13px;\">\n      Dán kết quả tại đây:\n      <span style=\"font-weight:400; color:var(--mut); font-size:12px;\">(Hỗ trợ JSON hoặc văn bản trắc nghiệm: Câu 1: A, B, C, D...)</span>\n    </label>\n    <textarea id=\"prompt-result\" maxlength=\"150000\"\n      placeholder=\"Dán câu trả lời của ChatGPT/Gemini/Claude vào đây...\"\n      style=\"min-height:110px;\"></textarea>\n\n    <div style=\"display:flex; gap:10px; justify-content:flex-end; margin-top:14px;\">\n      <button class=\"btn gh sm\" type=\"button\" onclick=\"$('#prompt-dialog').close()\">Đóng</button>\n      <button class=\"btn au\" type=\"button\" onclick=\"importPromptQuestionSet()\" style=\"font-weight:700;\">\n        Nhập bộ câu hỏi\n      </button>\n    </div>\n  </div>\n</dialog>\n\n<!-- QUIZ HISTORY LIST MODAL -->\n<dialog id=\"quiz-history-dialog\" class=\"history-dialog\">\n  <div class=\"history-modal-header\">\n    <div class=\"history-header-title-box\">\n      <h2 style=\"margin:0; font-size:22px; font-weight:800; display:flex; align-items:center; gap:8px;\">\n        <ion-icon name=\"time-outline\" style=\"font-size:24px; color:var(--gold);\"></ion-icon> <span>Lịch sử bài làm</span>\n      </h2>\n      <div style=\"display:flex; align-items:center; gap:8px; flex-wrap:wrap;\">\n        <span class=\"history-total-badge\" id=\"history-total-count\">0 lượt làm bài</span>\n        <span id=\"history-sync-indicator\" style=\"font-size:12px; font-weight:600; color:var(--mut);\"></span>\n      </div>\n    </div>\n    <div style=\"display:flex; align-items:center; gap:8px;\">\n      <button class=\"btn gh sm\" type=\"button\" onclick=\"loadQuizHistoryFromSupabase(true)\" title=\"Tải lại từ máy chủ\" style=\"padding:0 8px; height:32px;\">\n        <ion-icon name=\"refresh-outline\" style=\"font-size: 18px;\"></ion-icon>\n      </button>\n      <button class=\"btn no sm teacher-only\" type=\"button\" onclick=\"clearAllQuizHistory()\" title=\"Xóa toàn bộ lịch sử\">\n        <ion-icon name=\"trash-outline\"></ion-icon> <span>Xóa tất cả</span>\n      </button>\n      <button class=\"btn gh sm\" type=\"button\" onclick=\"closeHistoryModal()\" aria-label=\"Đóng\">\n        <ion-icon name=\"close-outline\" style=\"font-size: 20px;\"></ion-icon>\n      </button>\n    </div>\n  </div>\n\n  <div class=\"history-search-bar\" style=\"display:flex; gap:10px; align-items:center; flex-wrap:wrap;\">\n    <div style=\"flex:1; min-width:180px; position:relative; display:flex; align-items:center;\">\n      <span class=\"history-search-icon\">\n        <ion-icon name=\"search-outline\"></ion-icon>\n      </span>\n      <input id=\"history-search-input\" type=\"text\" placeholder=\"Tìm theo học sinh, lớp, từ khóa...\" oninput=\"onHistorySearchInput()\" style=\"width:100%;\">\n    </div>\n    <select id=\"history-set-filter\" onchange=\"onHistorySetFilterChange()\" style=\"height:44px; border-radius:12px; border:2px solid var(--stroke); padding:0 12px; font-weight:700; font-size:13px; background:var(--bg-card); color:var(--ink); max-width:260px;\" title=\"Lọc theo bộ câu hỏi\">\n      <option value=\"\">Tất cả bộ đề</option>\n    </select>\n  </div>\n  <div id=\"history-active-filter-badge\" style=\"display:none; margin:8px 0 4px; padding:6px 12px; background:rgba(217, 169, 79, 0.15); border:1.5px solid var(--gold); border-radius:10px; font-size:13px; font-weight:700; align-items:center; justify-content:space-between;\">\n    <span id=\"history-filter-badge-text\"></span>\n    <button class=\"btn gh sm\" type=\"button\" onclick=\"clearHistorySetFilter()\" style=\"padding:2px 8px; font-size:12px; height:24px;\">\n      <ion-icon name=\"close-circle-outline\"></ion-icon> Xem tất cả\n    </button>\n  </div>\n\n  <div class=\"history-list-wrap\" id=\"history-list-container\">\n    <!-- Rendered by JS -->\n  </div>\n\n  <div class=\"history-modal-footer\">\n    <button class=\"btn gh\" type=\"button\" onclick=\"closeHistoryModal()\">Đóng</button>\n  </div>\n</dialog>\n\n<!-- QUIZ HISTORY DETAIL MODAL -->\n<dialog id=\"history-detail-dialog\" class=\"history-dialog history-detail-modal\">\n  <div class=\"history-modal-header\">\n    <div class=\"history-header-title-box\">\n      <h2 style=\"margin:0; font-size:20px; font-weight:800;\" id=\"history-detail-title\">\n        Chi tiết bài làm\n      </h2>\n    </div>\n    <div style=\"display:flex; align-items:center; gap:8px;\">\n      <button class=\"btn cy sm\" id=\"btn-toggle-grading-mode\" type=\"button\" onclick=\"toggleHistoryGradingMode()\" title=\"Chuyển đổi giữa chế độ xem và chế độ chấm bài\">\n        <ion-icon name=\"create-outline\"></ion-icon> Chấm bài thủ công\n      </button>\n      <button class=\"btn gh sm\" type=\"button\" onclick=\"closeHistoryDetailModal()\" aria-label=\"Đóng\">\n        <ion-icon name=\"close-outline\" style=\"font-size: 20px;\"></ion-icon>\n      </button>\n    </div>\n  </div>\n\n  <div class=\"history-detail-content-wrap\">\n    <div id=\"history-detail-meta\"></div>\n    <div id=\"history-detail-grading-toolbar\" style=\"display:none;\"></div>\n    <h3 style=\"margin:16px 0 10px; font-size:16px; font-weight:800;\" id=\"history-detail-section-heading\">Danh sách câu hỏi &amp; Bài làm:</h3>\n    <div id=\"history-detail-questions-list\"></div>\n    <div id=\"history-detail-grading-summary\"></div>\n  </div>\n\n  <div class=\"history-modal-footer\">\n    <button class=\"btn au sm\" id=\"btn-save-grading-footer\" type=\"button\" onclick=\"saveManualGrading()\" style=\"display:none; font-weight:800;\">\n      <ion-icon name=\"checkmark-circle-outline\"></ion-icon> Lưu kết quả chấm\n    </button>\n    <button class=\"btn gh\" type=\"button\" onclick=\"closeHistoryDetailModal()\">Đóng</button>\n  </div>\n</dialog>\n\n<!-- WRITING MODAL 1: TẠO / CHỈNH SỬA BỘ ĐỀ LUYỆN VIẾT -->\n<dialog id=\"writing-set-dialog\" class=\"writing-modal writing-set-modal-large\">\n  <div class=\"writing-modal-header\">\n    <div class=\"writing-modal-title\">\n      <h3 id=\"writing-dialog-heading\">Tạo bộ đề luyện viết</h3>\n    </div>\n    <button class=\"btn sm gh\" type=\"button\" onclick=\"closeCreateWritingSetModal()\" aria-label=\"Đóng\">\n      <ion-icon name=\"close-outline\" style=\"font-size: 20px;\"></ion-icon>\n    </button>\n  </div>\n  \n  <form id=\"writing-set-form\" onsubmit=\"handleSaveWritingSet(event)\" class=\"writing-modal-form-wrap\">\n    <input type=\"hidden\" id=\"edit-writing-set-id\">\n\n    <div class=\"writing-modal-body\">\n      <div class=\"g2\">\n        <div>\n          <label for=\"input-set-title\">Tên bộ đề / Tiêu đề <span style=\"color:var(--red)\">*</span></label>\n          <input type=\"text\" id=\"input-set-title\" required placeholder=\"Ví dụ: Nghị luận xã hội về ý nghĩa của sự sẻ chia...\">\n        </div>\n        <div>\n          <label for=\"input-set-category\">Chủ đề / Dạng đề <span style=\"color:var(--red)\">*</span></label>\n          <select id=\"input-set-category\" onchange=\"onCategorySelectChange(this.value)\">\n            <option value=\"doan-nlvh\">Đoạn văn NLVH (200 chữ)</option>\n            <option value=\"bai-nlvh\">Bài văn NLVH (600 chữ)</option>\n            <option value=\"doan-nlxh\">Đoạn văn NLXH (200 chữ)</option>\n            <option value=\"bai-nlxh\">Bài văn NLXH (600 chữ)</option>\n          </select>\n        </div>\n      </div>\n\n      <!-- Cấu hình hiển thị, thời gian & lượt làm (Gộp gọn 2x2) -->\n      <div class=\"modal-settings-grid-2x2\">\n        <div class=\"modal-setting-field\">\n          <label for=\"writing-form-privacy\"><ion-icon name=\"eye-outline\"></ion-icon> Chế độ hiển thị</label>\n          <select id=\"writing-form-privacy\">\n            <option value=\"public\">🌐 Công khai (Cho học sinh)</option>\n            <option value=\"private\">🔒 Riêng tư (Tạm ẩn)</option>\n          </select>\n        </div>\n\n        <div class=\"modal-setting-field\">\n          <label for=\"writing-form-max-attempts\"><ion-icon name=\"timer-outline\"></ion-icon> Giới hạn lượt (0 = Không giới hạn)</label>\n          <div style=\"display:flex; align-items:center; gap:6px;\">\n            <input type=\"number\" id=\"writing-form-max-attempts\" min=\"0\" max=\"999\" value=\"0\" style=\"width:90px; text-align:center; font-weight:700;\">\n            <span style=\"font-size:12.5px; color:var(--mut); font-weight:600;\">lượt</span>\n          </div>\n        </div>\n\n        <div class=\"modal-setting-field\">\n          <label for=\"writing-form-open-at\"><ion-icon name=\"time-outline\"></ion-icon> Thời gian mở đề</label>\n          <div style=\"display:flex; align-items:center; gap:6px;\">\n            <input type=\"datetime-local\" id=\"writing-form-open-at\" style=\"flex:1;\">\n            <button type=\"button\" class=\"btn gh sm\" onclick=\"$('#writing-form-open-at').value=''\" title=\"Mở ngay\" style=\"padding:2px 8px; height:32px;\">✕</button>\n          </div>\n        </div>\n\n        <div class=\"modal-setting-field\">\n          <label for=\"writing-form-deadline\"><ion-icon name=\"calendar-outline\"></ion-icon> Hạn chót nộp bài</label>\n          <div style=\"display:flex; align-items:center; gap:6px;\">\n            <input type=\"datetime-local\" id=\"writing-form-deadline\" style=\"flex:1;\">\n            <button type=\"button\" class=\"btn gh sm\" onclick=\"$('#writing-form-deadline').value=''\" title=\"Xóa hạn nộp\" style=\"padding:2px 8px; height:32px;\">✕</button>\n          </div>\n        </div>\n      </div>\n\n      <div style=\"margin-top:16px;\">\n        <label for=\"input-set-prompt\">Nội dung đề bài chi tiết <span style=\"color:var(--red)\">*</span></label>\n        <textarea id=\"input-set-prompt\" required placeholder=\"Dán nội dung đề bài, câu hỏi yêu cầu tại đây...\"></textarea>\n      </div>\n\n      <!-- Các phần viết -->\n      <div style=\"margin-top:20px;\">\n        <div style=\"display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:8px;\">\n          <label style=\"margin:0; font-size:15px; font-weight:700;\">\n            Các phần bài viết (<span id=\"modal-section-count\">3</span> phần)\n          </label>\n          <div style=\"display:flex; gap:8px;\">\n            <button type=\"button\" class=\"btn gh sm\" onclick=\"applyQuickOutlineTemplate()\">Nạp cấu trúc mẫu</button>\n            <button type=\"button\" class=\"btn cy sm\" onclick=\"addNewOutlineSectionRow()\">\n              <ion-icon name=\"add-outline\"></ion-icon> Thêm phần\n            </button>\n          </div>\n        </div>\n        <p class=\"mut\" style=\"font-size:13px; margin:0 0 12px;\">Cấu trúc chuẩn 3 phần (Mở bài, Thân bài, Kết bài).</p>\n        \n        <div id=\"modal-sections-editor\" class=\"modal-sections-editor-list\"></div>\n      </div>\n    </div>\n\n    <div class=\"writing-modal-footer\">\n      <button type=\"button\" class=\"btn gh\" onclick=\"closeCreateWritingSetModal()\">Hủy</button>\n      <button type=\"submit\" class=\"btn au\">\n        <ion-icon name=\"save-outline\"></ion-icon> Lưu bộ đề\n      </button>\n    </div>\n  </form>\n</dialog>\n\n<!-- WRITING MODAL 2: XEM BÀI HOÀN CHỈNH & XUẤT BÀI -->\n<dialog id=\"writing-review-dialog\" class=\"writing-modal review-modal\">\n  <div class=\"writing-modal-header review-header\">\n    <div class=\"writing-modal-title\">\n      <h3>Tổng quan bài viết</h3>\n    </div>\n    <button class=\"btn sm gh\" type=\"button\" onclick=\"closeWritingReviewModal()\">\n      <ion-icon name=\"close-outline\" style=\"font-size: 20px;\"></ion-icon>\n    </button>\n  </div>\n\n  <div class=\"writing-modal-body review-body\">\n    <!-- Stat metrics cards -->\n    <div class=\"review-stats-grid\">\n      <div class=\"review-stat-card\">\n        <span class=\"stat-num\" id=\"review-stat-words\">0</span>\n        <span class=\"stat-label\">Tổng số từ</span>\n      </div>\n      <div class=\"review-stat-card\">\n        <span class=\"stat-num\" id=\"review-stat-paragraphs\">0</span>\n        <span class=\"stat-label\">Số đoạn văn</span>\n      </div>\n      <div class=\"review-stat-card\">\n        <span class=\"stat-num\" id=\"review-stat-time\">00:00:00</span>\n        <span class=\"stat-label\">Thời gian làm</span>\n      </div>\n      <div class=\"review-stat-card\">\n        <span class=\"stat-num\" id=\"review-stat-wpm\">0</span>\n        <span class=\"stat-label\">Tốc độ (từ / phút)</span>\n      </div>\n    </div>\n\n    <!-- Combined essay text -->\n    <div class=\"review-essay-box\">\n      <div class=\"review-essay-meta\">\n        <h4 id=\"review-essay-topic\">Đề bài luyện viết</h4>\n        <span class=\"tag ok\" id=\"review-essay-tag\">Hoàn tất</span>\n      </div>\n      <div class=\"review-essay-text\" id=\"review-essay-combined-content\"></div>\n    </div>\n\n    <!-- Feedback suggestions box -->\n    <div class=\"review-feedback-box\">\n      <div class=\"review-feedback-title\">Nhận xét sơ bộ:</div>\n      <div id=\"review-feedback-content\" class=\"review-feedback-list\"></div>\n    </div>\n  </div>\n\n  <div class=\"writing-modal-footer review-footer\">\n    <button class=\"btn gh\" type=\"button\" onclick=\"copyCombinedEssayToClipboard()\">\n      <ion-icon name=\"copy-outline\"></ion-icon> Sao chép bài viết\n    </button>\n    <button class=\"btn cy\" type=\"button\" onclick=\"downloadCombinedEssayAsText()\">\n      <ion-icon name=\"download-outline\"></ion-icon> Tải tệp .txt\n    </button>\n    <button class=\"btn au\" type=\"button\" onclick=\"submitWritingEssay(); closeWritingReviewModal();\" style=\"font-weight:800;\">\n      <ion-icon name=\"send-outline\"></ion-icon> Nộp bài chấm điểm\n    </button>\n    <button class=\"btn gh\" type=\"button\" onclick=\"closeWritingReviewModal()\">Đóng</button>\n  </div>\n</dialog>\n\n<!-- READING MODAL 1: TẠO / SỬA ĐỀ ĐỌC HIỂU -->\n<dialog id=\"reading-edit-modal\" class=\"writing-modal reading-modal\">\n  <div class=\"writing-modal-header\">\n    <div class=\"writing-modal-title\">\n      <h3 id=\"reading-modal-title\">Thêm bộ đề đọc hiểu mới</h3>\n    </div>\n    <button class=\"btn sm gh\" type=\"button\" onclick=\"closeReadingEditModal()\" aria-label=\"Đóng\">\n      <ion-icon name=\"close-outline\" style=\"font-size: 20px;\"></ion-icon>\n    </button>\n  </div>\n\n  <form id=\"reading-edit-form\" onsubmit=\"handleReadingFormSubmit(event)\" class=\"writing-modal-form-wrap\">\n    <input type=\"hidden\" id=\"reading-form-id\">\n\n    <div class=\"writing-modal-body\">\n      <!-- Hàng 1: Tên đề bài & Chủ đề -->\n      <div class=\"g2\" style=\"margin-bottom:14px;\">\n        <div>\n          <label for=\"reading-form-title\" style=\"font-weight:700; display:block; margin-bottom:5px;\">\n            Tựa bài / Tên đề đọc hiểu <span style=\"color:var(--red)\">*</span>\n          </label>\n          <input type=\"text\" id=\"reading-form-title\" required placeholder=\"Ví dụ: Sống hết mình cho thời khắc hiện tại...\" style=\"width:100%;\">\n        </div>\n        <div>\n          <label for=\"reading-form-category\" style=\"font-weight:700; display:block; margin-bottom:5px;\">\n            Chủ đề / Dạng bài <span style=\"color:var(--red)\">*</span>\n          </label>\n          <select id=\"reading-form-category\" required style=\"width:100%;\"></select>\n        </div>\n      </div>\n\n      <!-- Cấu hình trạng thái, thời gian & lượt làm (Gộp gọn 2x2) -->\n      <div class=\"modal-settings-grid-2x2\" style=\"margin-bottom:14px;\">\n        <div class=\"modal-setting-field\">\n          <label for=\"reading-form-status\"><ion-icon name=\"eye-outline\"></ion-icon> Trạng thái bộ đề</label>\n          <select id=\"reading-form-status\" style=\"width:100%;\">\n            <option value=\"published\">🟢 Đã xuất bản (Cho học sinh)</option>\n            <option value=\"draft\">🟡 Bản nháp (Tạm ẩn)</option>\n          </select>\n        </div>\n\n        <div class=\"modal-setting-field\">\n          <label for=\"reading-form-max-attempts\"><ion-icon name=\"timer-outline\"></ion-icon> Giới hạn lượt (0 = Không giới hạn)</label>\n          <div style=\"display:flex; align-items:center; gap:6px;\">\n            <input type=\"number\" id=\"reading-form-max-attempts\" min=\"0\" max=\"999\" value=\"0\" style=\"width:90px; text-align:center; font-weight:700;\">\n            <span style=\"font-size:12.5px; font-weight:600; color:var(--mut);\">lượt</span>\n          </div>\n        </div>\n\n        <div class=\"modal-setting-field\">\n          <label for=\"reading-form-open-at\"><ion-icon name=\"time-outline\"></ion-icon> Thời gian mở đề</label>\n          <div style=\"display:flex; align-items:center; gap:6px;\">\n            <input type=\"datetime-local\" id=\"reading-form-open-at\" style=\"flex:1;\">\n            <button type=\"button\" class=\"btn gh sm\" onclick=\"$('#reading-form-open-at').value=''\" title=\"Mở ngay\" style=\"padding:2px 8px; height:32px;\">✕</button>\n          </div>\n        </div>\n\n        <div class=\"modal-setting-field\">\n          <label for=\"reading-form-deadline\"><ion-icon name=\"calendar-outline\"></ion-icon> Hạn chót nộp bài</label>\n          <div style=\"display:flex; align-items:center; gap:6px;\">\n            <input type=\"datetime-local\" id=\"reading-form-deadline\" style=\"flex:1;\">\n            <button type=\"button\" class=\"btn gh sm\" onclick=\"$('#reading-form-deadline').value=''\" title=\"Xóa hạn nộp\" style=\"padding:2px 8px; height:32px;\">✕</button>\n          </div>\n        </div>\n      </div>\n\n      <!-- Hàng 2: Tác phẩm, Tác giả & Thể loại -->\n      <div class=\"g3\" style=\"display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:12px; margin-bottom:14px;\">\n        <div>\n          <label for=\"reading-form-work\" style=\"font-weight:700; display:block; margin-bottom:5px;\">\n            Tên tác phẩm\n          </label>\n          <input type=\"text\" id=\"reading-form-work\" placeholder=\"Ví dụ: Cách sống: từ bình thường trở nên phi thường...\" style=\"width:100%;\">\n        </div>\n        <div>\n          <label for=\"reading-form-author\" style=\"font-weight:700; display:block; margin-bottom:5px;\">\n            Tác giả\n          </label>\n          <input type=\"text\" id=\"reading-form-author\" placeholder=\"Ví dụ: Inamori Kazuo\" style=\"width:100%;\">\n        </div>\n        <div>\n          <label for=\"reading-form-genre\" style=\"font-weight:700; display:block; margin-bottom:5px;\">\n            Thể loại văn bản\n          </label>\n          <input type=\"text\" id=\"reading-form-genre\" placeholder=\"Ví dụ: Văn bản nghị luận, Thơ tự do...\" style=\"width:100%;\">\n        </div>\n      </div>\n\n      <!-- Ngữ liệu đọc hiểu -->\n      <div style=\"margin-bottom:16px;\">\n        <label for=\"reading-form-passage\" style=\"font-weight:700; display:block; margin-bottom:5px;\">\n          Văn bản / Ngữ liệu đọc hiểu (Đoạn trích) <span style=\"color:var(--red)\">*</span>\n        </label>\n        <textarea id=\"reading-form-passage\" required rows=\"9\" placeholder=\"Dán hoặc nhập toàn bộ đoạn trích / văn bản đọc hiểu vào đây...\" style=\"width:100%; font-family:inherit; line-height:1.6;\"></textarea>\n      </div>\n\n      <!-- Nguồn trích dẫn -->\n      <div style=\"margin-bottom:18px;\">\n        <label for=\"reading-form-source\" style=\"font-weight:700; display:block; margin-bottom:5px;\">\n          Ghi chú nguồn trích dẫn tác phẩm, tác giả, NXB, năm, trang\n        </label>\n        <input type=\"text\" id=\"reading-form-source\" placeholder=\"(Trích Cách sống: từ bình thường trở nên phi thường, Inamori Kazuo, NXB Lao động, 2020, tr. 103-104)\" style=\"width:100%;\">\n      </div>\n\n      <!-- Danh sách câu hỏi đọc hiểu -->\n      <div class=\"reading-form-questions-section\">\n        <div style=\"display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;\">\n          <div>\n            <h4 style=\"margin:0; font-size:16px; font-weight:800; display:flex; align-items:center; gap:8px; flex-wrap:wrap;\">\n              <span>Hệ thống câu hỏi đọc hiểu</span>\n              <span class=\"tag cy\" style=\"font-size:12.5px; font-weight:800; padding:3px 10px;\">\n                Tổng điểm: <b id=\"reading-modal-total-score\">10.0đ</b> / 10.0 điểm\n              </span>\n            </h4>\n            <span class=\"mut\" style=\"font-size:12.5px;\">Chuẩn thang 10đ: Câu 1,2: Nhận biết (1.5đ) • Câu 3,4: Thông hiểu (2.0đ) • Câu 5: Vận dụng (3.0đ)</span>\n          </div>\n          <div style=\"display:flex; gap:6px; flex-wrap:wrap;\">\n            <button type=\"button\" class=\"btn au sm\" onclick=\"applyStandard5QuestionTemplate()\" title=\"Tự động nạp khung chuẩn 5 câu: 2 Nhận biết • 2 Thông hiểu • 1 Vận dụng (Đoạn văn) - Chuẩn thang 10 điểm\">\n              <ion-icon name=\"flash-outline\"></ion-icon> Mẫu chuẩn 5 câu\n            </button>\n            <button type=\"button\" class=\"btn gh sm\" onclick=\"openQuickImportModal()\" title=\"Dán nhanh toàn bộ đề thi để tự động trích xuất\">\n              <ion-icon name=\"clipboard-outline\"></ion-icon> Dán nhanh đề thi\n            </button>\n            <button type=\"button\" class=\"btn cy sm\" onclick=\"addQuestionToReadingForm()\">\n              <ion-icon name=\"add-outline\"></ion-icon> Thêm câu hỏi\n            </button>\n          </div>\n        </div>\n        <div id=\"reading-form-questions-list\"></div>\n      </div>\n    </div>\n\n    <div class=\"writing-modal-footer\">\n      <button type=\"button\" class=\"btn gh\" onclick=\"closeReadingEditModal()\">Hủy</button>\n      <button type=\"submit\" class=\"btn au\" style=\"font-weight:800;\">\n        <ion-icon name=\"save-outline\"></ion-icon> Lưu đề đọc hiểu\n      </button>\n    </div>\n  </form>\n</dialog>\n\n<!-- READING MODAL 2: DÁN NHANH TOÀN BỘ ĐỀ THI (QUICK IMPORT) -->\n<dialog id=\"reading-quick-import-modal\" class=\"writing-modal\" style=\"max-width:680px;\">\n  <div class=\"writing-modal-header\">\n    <div class=\"writing-modal-title\">\n      <h3 style=\"display:flex; align-items:center; gap:8px;\">\n        <ion-icon name=\"clipboard-outline\"></ion-icon> Dán nhanh toàn bộ đề thi Đọc hiểu\n      </h3>\n    </div>\n    <button class=\"btn sm gh\" type=\"button\" onclick=\"closeQuickImportModal()\" aria-label=\"Đóng\">\n      <ion-icon name=\"close-outline\" style=\"font-size: 20px;\"></ion-icon>\n    </button>\n  </div>\n  <div class=\"writing-modal-body\" style=\"padding:18px 22px;\">\n    <p class=\"mut\" style=\"margin:0 0 12px; font-size:13.5px; line-height:1.5;\">\n      Dán nguyên văn đề thi (gồm đoạn trích, nguồn <i>(Trích ...)</i> và các <b>Câu 1, 2, 3, 4, 5</b> hoặc phần Làm văn). Hệ thống sẽ tự động bóc tách và điền vào các ô cho bạn!\n    </p>\n    <textarea id=\"reading-quick-import-text\" rows=\"12\" placeholder=\"Ví dụ:\nI. PHẦN ĐỌC HIỂU (3,0 điểm)\nĐọc đoạn trích:\nKhông cần ngôn ngữ, mọi sự sống nhỏ nhoi trong tự nhiên...\n(Trích Cách sống: từ bình thường trở nên phi thường, Inamori Kazuo, NXB Lao động, 2020)\n\nThực hiện các yêu cầu sau:\nCâu 1: Xác định phương thức biểu đạt chính...\nCâu 2: Theo đoạn trích...\nCâu 3: Chỉ ra điểm tương đồng...\nCâu 4: Anh/chị có đồng tình...\nCâu 5: Viết đoạn văn (khoảng 200 chữ)...\" style=\"width:100%; font-family:inherit; font-size:13.5px; line-height:1.6;\"></textarea>\n  </div>\n  <div class=\"writing-modal-footer\">\n    <button type=\"button\" class=\"btn gh\" onclick=\"closeQuickImportModal()\">Hủy</button>\n    <button type=\"button\" class=\"btn au\" onclick=\"handleQuickImportSubmit()\" style=\"font-weight:800;\">\n      <ion-icon name=\"flash-outline\"></ion-icon> Tự động bóc tách &amp; Áp dụng\n    </button>\n  </div>\n</dialog>\n\n<!-- READING MODAL 3: KẾT QUẢ / ĐÁP ÁN THAM KHẢO KHI NỘP BÀI -->\n<dialog id=\"reading-result-modal\" class=\"writing-modal reading-modal\">\n  <div class=\"writing-modal-header\">\n    <div class=\"writing-modal-title\">\n      <h3>Kết quả bài làm &amp; Đáp án tham khảo</h3>\n    </div>\n    <button class=\"btn sm gh\" type=\"button\" onclick=\"closeReadingResultModal()\" aria-label=\"Đóng\">\n      <ion-icon name=\"close-outline\" style=\"font-size: 20px;\"></ion-icon>\n    </button>\n  </div>\n\n  <div class=\"writing-modal-body\" style=\"padding:20px 24px;\">\n    <div class=\"reading-result-hero\">\n      <div style=\"font-size:36px; margin-bottom:6px; color:var(--primary);\">\n        <ion-icon name=\"ribbon-outline\"></ion-icon>\n      </div>\n      <h3 style=\"margin:0 0 6px; font-weight:800;\">Đã hoàn thành bài đọc hiểu!</h3>\n      <p class=\"mut\" style=\"margin:0; font-size:14px;\">Dưới đây là phần so sánh giữa câu trả lời của bạn và đáp án chuẩn.</p>\n    </div>\n\n    <div id=\"reading-result-comparison-list\" style=\"margin-top:20px;\"></div>\n  </div>\n\n  <div class=\"writing-modal-footer\">\n    <button type=\"button\" class=\"btn au\" onclick=\"closeReadingResultModal(); go('home'); toast('Nộp bài thành công! Bài làm đọc hiểu đã được lưu vào Lịch sử.', 'ok');\" style=\"font-weight:800;\">\n      <ion-icon name=\"home-outline\"></ion-icon> Về trang chủ\n    </button>\n    <button type=\"button\" class=\"btn gh\" onclick=\"closeReadingResultModal()\">Đóng</button>\n  </div>\n</dialog>\n\n<!-- SET ATTEMPT LIMIT, PRIVACY & DEADLINE DIALOG (GIÁO VIÊN & ADMIN) -->\n<!-- SET ATTEMPT LIMIT, PRIVACY & DEADLINE DIALOG (GIÁO VIÊN & ADMIN) -->\n<dialog id=\"set-attempt-limit-dialog\" class=\"set-cfg-dialog\">\n  <div class=\"set-cfg-header\">\n    <div class=\"set-cfg-header-title\">\n      <div class=\"set-cfg-icon\"><ion-icon name=\"options-outline\"></ion-icon></div>\n      <div>\n        <h3>Cài đặt &amp; Giao bài</h3>\n        <p>Quyền Giáo viên &amp; Quản trị viên</p>\n      </div>\n    </div>\n    <button type=\"button\" class=\"set-cfg-close-btn\" onclick=\"closeSetAttemptLimitModal()\" title=\"Đóng\">\n      <ion-icon name=\"close-outline\"></ion-icon>\n    </button>\n  </div>\n\n  <div class=\"set-cfg-body\">\n    <!-- Thông tin bộ đề -->\n    <div class=\"set-cfg-target-card\">\n      <div class=\"set-cfg-target-type\" id=\"limit-modal-type-badge\">DẠNG BÀI</div>\n      <div class=\"set-cfg-target-title\" id=\"limit-modal-title\">Tên bộ đề</div>\n    </div>\n\n    <input type=\"hidden\" id=\"limit-modal-target-type\" value=\"\">\n    <input type=\"hidden\" id=\"limit-modal-target-id\" value=\"\">\n\n    <!-- CẶP CÀI ĐẶT: CHẾ ĐỘ HIỂN THỊ & SỐ LƯỢT LÀM -->\n    <div class=\"set-cfg-grid-2\">\n      <!-- 1. Chế độ hiển thị -->\n      <div class=\"set-cfg-card\">\n        <label for=\"limit-modal-privacy\" class=\"set-cfg-label\">\n          <ion-icon name=\"eye-outline\"></ion-icon> <span>Chế độ hiển thị</span>\n        </label>\n        <select id=\"limit-modal-privacy\" class=\"set-cfg-select\">\n          <option value=\"public\">🌐 Công khai</option>\n          <option value=\"private\">🔒 Riêng tư</option>\n        </select>\n      </div>\n\n      <!-- 2. Giới hạn số lượt làm -->\n      <div class=\"set-cfg-card\">\n        <div class=\"set-cfg-label-row\">\n          <label for=\"limit-modal-input\" class=\"set-cfg-label\">\n            <ion-icon name=\"timer-outline\"></ion-icon> <span>Lượt làm bài</span>\n          </label>\n          <span id=\"limit-modal-explain\" class=\"set-cfg-status status-gray\">Không giới hạn</span>\n        </div>\n        <div class=\"set-cfg-input-stepper-row\">\n          <input type=\"number\" id=\"limit-modal-input\" min=\"0\" max=\"999\" step=\"1\" value=\"0\" class=\"set-cfg-number-input\" oninput=\"onLimitModalInputChange(this.value)\">\n          <div class=\"set-cfg-chips-inline\">\n            <button type=\"button\" class=\"set-cfg-chip\" onclick=\"setLimitModalPreset(0)\" title=\"Không giới hạn\">♾️</button>\n            <button type=\"button\" class=\"set-cfg-chip\" onclick=\"setLimitModalPreset(1)\" title=\"1 lượt\">1</button>\n            <button type=\"button\" class=\"set-cfg-chip\" onclick=\"setLimitModalPreset(2)\" title=\"2 lượt\">2</button>\n            <button type=\"button\" class=\"set-cfg-chip\" onclick=\"setLimitModalPreset(3)\" title=\"3 lượt\">3</button>\n            <button type=\"button\" class=\"set-cfg-chip\" onclick=\"setLimitModalPreset(5)\" title=\"5 lượt\">5</button>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!-- 3. Lịch mở đề (Thời gian bắt đầu làm) -->\n    <div class=\"set-cfg-card\">\n      <div class=\"set-cfg-label-row\">\n        <label for=\"limit-modal-open-at\" class=\"set-cfg-label\">\n          <ion-icon name=\"time-outline\"></ion-icon> <span>Thời gian mở đề</span>\n        </label>\n        <span id=\"limit-modal-open-at-status\" class=\"set-cfg-status status-green\">🟢 Mở ngay</span>\n      </div>\n      <div class=\"set-cfg-input-row\">\n        <input type=\"datetime-local\" id=\"limit-modal-open-at\" class=\"set-cfg-datetime-input\" onchange=\"onLimitModalOpenAtChange(this.value)\">\n        <button type=\"button\" class=\"set-cfg-action-btn\" onclick=\"setLimitModalOpenAtPreset('none')\">✕ Mở ngay</button>\n      </div>\n      <div class=\"set-cfg-chips-wrap\">\n        <button type=\"button\" class=\"set-cfg-chip\" onclick=\"setLimitModalOpenAtPreset('none')\">🚀 Mở ngay</button>\n        <button type=\"button\" class=\"set-cfg-chip\" onclick=\"setLimitModalOpenAtPreset('tomorrow-8am')\">🌅 8:00 Sáng mai</button>\n        <button type=\"button\" class=\"set-cfg-chip\" onclick=\"setLimitModalOpenAtPreset('tomorrow-14pm')\">☀️ 14:00 Chiều mai</button>\n        <button type=\"button\" class=\"set-cfg-chip\" onclick=\"setLimitModalOpenAtPreset('monday-8am')\">📅 Đầu tuần tới (8:00)</button>\n      </div>\n    </div>\n\n    <!-- 4. Hạn chót nộp bài (Deadline) -->\n    <div class=\"set-cfg-card\">\n      <div class=\"set-cfg-label-row\">\n        <label for=\"limit-modal-deadline\" class=\"set-cfg-label\">\n          <ion-icon name=\"calendar-outline\"></ion-icon> <span>Hạn chót nộp bài</span>\n        </label>\n        <span id=\"limit-modal-deadline-status\" class=\"set-cfg-status status-gray\">Không đặt hạn</span>\n      </div>\n      <div class=\"set-cfg-input-row\">\n        <input type=\"datetime-local\" id=\"limit-modal-deadline\" class=\"set-cfg-datetime-input\" onchange=\"onLimitModalDeadlineChange(this.value)\">\n        <button type=\"button\" class=\"set-cfg-action-btn\" onclick=\"setLimitModalDeadlinePreset('none')\">✕ Xóa hạn</button>\n      </div>\n      <div class=\"set-cfg-chips-wrap\">\n        <button type=\"button\" class=\"set-cfg-chip\" onclick=\"setLimitModalDeadlinePreset('none')\">♾️ Không hạn</button>\n        <button type=\"button\" class=\"set-cfg-chip\" onclick=\"setLimitModalDeadlinePreset('tonight')\">🌙 Tối nay (23:59)</button>\n        <button type=\"button\" class=\"set-cfg-chip\" onclick=\"setLimitModalDeadlinePreset('tomorrow')\">☀️ Tối mai (23:59)</button>\n        <button type=\"button\" class=\"set-cfg-chip\" onclick=\"setLimitModalDeadlinePreset('3days')\">📅 3 ngày tới</button>\n        <button type=\"button\" class=\"set-cfg-chip\" onclick=\"setLimitModalDeadlinePreset('7days')\">🗓️ 1 tuần tới</button>\n      </div>\n    </div>\n\n    <!-- FOOTER ACTIONS -->\n    <div class=\"set-cfg-footer\">\n      <button type=\"button\" class=\"btn gh\" onclick=\"closeSetAttemptLimitModal()\">Hủy</button>\n      <button type=\"button\" class=\"btn au\" onclick=\"submitSetAttemptLimit()\">\n        <ion-icon name=\"checkmark-circle-outline\"></ion-icon> <span>Lưu cài đặt</span>\n      </button>\n    </div>\n  </div>\n</dialog>\n\n<!-- EXIT EXAM CONFIRMATION DIALOG (CẢNH BÁO NỘP BÀI KHI THOÁT) -->\n<dialog id=\"exit-exam-confirm-dialog\" class=\"writing-modal exit-confirm-modal\" style=\"max-width:520px; border-radius:24px; border:3.5px solid var(--stroke); box-shadow:0 12px 0 var(--stroke); padding:0; overflow:hidden;\">\n  <div style=\"background:linear-gradient(135deg, #ef4444 0%, #b91c1c 100%); padding:20px 24px; color:#ffffff; display:flex; align-items:center; justify-content:space-between; gap:12px;\">\n    <div style=\"display:flex; align-items:center; gap:12px;\">\n      <span style=\"font-size:32px; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.25)); line-height:1;\"><ion-icon name=\"warning-outline\"></ion-icon></span>\n      <div>\n        <h3 style=\"margin:0; font-size:19px; font-weight:800; color:#ffffff;\">Xác nhận thoát bài làm?</h3>\n        <p style=\"margin:2px 0 0; font-size:12.5px; opacity:0.95; font-weight:600;\">Hành động này sẽ nộp bài và tính 1 lượt làm</p>\n      </div>\n    </div>\n    <button type=\"button\" class=\"btn gh sm\" onclick=\"closeExitConfirmModal()\" style=\"border:none; color:#ffffff; background:rgba(0,0,0,0.2); width:32px; height:32px; padding:0; border-radius:50%; font-size:18px;\">✕</button>\n  </div>\n\n  <div style=\"padding:22px 24px; background:var(--bg-card);\">\n    <div style=\"background:rgba(239, 68, 68, 0.08); border:2px dashed rgba(239, 68, 68, 0.4); border-radius:14px; padding:14px 16px; margin-bottom:18px;\">\n      <p style=\"margin:0 0 8px; font-weight:800; color:#dc2626; font-size:14px; display:flex; align-items:center; gap:6px;\">\n        <ion-icon name=\"alert-circle-outline\" style=\"font-size:18px;\"></ion-icon> LƯU Ý QUAN TRỌNG TRƯỚC KHI RỜI ĐI:\n      </p>\n      <ul style=\"margin:0; padding-left:20px; font-size:13px; line-height:1.6; color:var(--ink);\">\n        <li>Hệ thống sẽ <b>tự động nộp các câu bạn đã làm</b> tính đến thời điểm này.</li>\n        <li>Hệ thống sẽ <b>tính mất 1 LƯỢT LÀM</b> của bạn trên bộ câu hỏi này.</li>\n        <li>Bài làm sẽ được lưu vào mục <b>Lịch sử</b> để giáo viên xem xét và đối chiếu.</li>\n      </ul>\n    </div>\n\n    <p style=\"font-size:13.5px; font-weight:600; color:var(--ink); margin:0 0 20px; text-align:center;\">\n      Bạn có chắc chắn muốn kết thúc bài làm và nộp kết quả ngay bây giờ không?\n    </p>\n\n    <div style=\"display:flex; justify-content:flex-end; gap:10px; flex-wrap:wrap;\">\n      <button type=\"button\" class=\"btn gh\" onclick=\"closeExitConfirmModal()\" style=\"font-weight:700; flex:1; min-width:140px; justify-content:center;\">\n        <ion-icon name=\"arrow-back-outline\"></ion-icon> Tiếp tục làm bài\n      </button>\n      <button type=\"button\" class=\"btn no\" id=\"btn-confirm-exit-action\" onclick=\"executeExitSessionSubmit()\" style=\"font-weight:800; flex:1; min-width:160px; justify-content:center;\">\n        <ion-icon name=\"log-out-outline\"></ion-icon> Xác nhận nộp &amp; Thoát\n      </button>\n    </div>\n  </div>\n</dialog>\n\n<!-- =======================================================================\n     GAMIFICATION DIALOG (CHUỖI NGÀY HỌC, PROGRESS BAR & BỘ SƯU TẬP HUY HIỆU)\n     ======================================================================= -->\n<dialog id=\"gamification-dialog\" class=\"gami-modal\">\n  <div class=\"gami-modal-header\">\n    <div style=\"display:flex; align-items:center; gap:12px;\">\n      <span style=\"font-size:34px; line-height:1;\">🔥</span>\n      <div>\n        <h3 style=\"margin:0; font-size:20px; font-weight:800; color:#ffffff;\">Hành Trình Chinh Phục Ngữ Văn</h3>\n        <p style=\"margin:2px 0 0; font-size:13px; opacity:0.95; font-weight:600;\">Chuỗi ngày học liên tục (Streak), Cấp độ &amp; Huy hiệu danh giá</p>\n      </div>\n    </div>\n    <button type=\"button\" class=\"btn gh sm\" onclick=\"closeGamificationModal()\" style=\"background:rgba(0,0,0,0.2); color:#fff; border:none; border-radius:50%; width:34px; height:34px; padding:0;\">✕</button>\n  </div>\n\n  <div class=\"gami-modal-body\" id=\"gamification-modal-body\">\n    <!-- Sẽ được render động bởi enhancements.js -->\n  </div>\n</dialog>\n\n<!-- =======================================================================\n     QUOTE OF THE DAY DIALOG (GÓC TRUYỀN CẢM HỨNG & SỔ TAY VĂN HỌC)\n     ======================================================================= -->\n<dialog id=\"quote-of-day-dialog\" class=\"qotd-modal\">\n  <div class=\"qotd-modal-header\">\n    <div style=\"display:flex; align-items:center; gap:12px;\">\n      <span style=\"font-size:32px; line-height:1;\">✨</span>\n      <div>\n        <h3 style=\"margin:0; font-size:20px; font-weight:800; color:#ffffff;\">Góc Truyền Cảm Hứng Văn Học</h3>\n        <p style=\"margin:2px 0 0; font-size:13px; opacity:0.95; font-weight:600;\">Nuôi dưỡng tâm hồn &amp; Kho nhận định lý luận văn học đắt giá</p>\n      </div>\n    </div>\n    <button type=\"button\" class=\"btn gh sm\" onclick=\"closeQuoteOfDayModal()\" style=\"background:rgba(0,0,0,0.2); color:#fff; border:none; border-radius:50%; width:34px; height:34px; padding:0;\">✕</button>\n  </div>\n\n  <div class=\"qotd-modal-body\" id=\"qotd-modal-body\">\n    <!-- Sẽ được render động bởi enhancements.js -->\n  </div>\n</dialog>\n\n<!-- =======================================================================\n     QA & BUG REPORT DIALOG (BÁO CÁO LỖI / THẮC MẮC KIẾN THỨC)\n     ======================================================================= -->\n<dialog id=\"qa-report-dialog\" class=\"qa-modal\">\n  <div class=\"qa-modal-header\">\n    <div style=\"display:flex; align-items:center; gap:12px;\">\n      <span style=\"font-size:32px; line-height:1;\">💬</span>\n      <div>\n        <h3 style=\"margin:0; font-size:19px; font-weight:800; color:#ffffff;\">Báo Cáo Lỗi &amp; Giải Đáp Thắc Mắc</h3>\n        <p style=\"margin:2px 0 0; font-size:12.5px; opacity:0.95; font-weight:600;\">Đặt câu hỏi trực tiếp để được giải đáp kịp thời trên lớp</p>\n      </div>\n    </div>\n    <button type=\"button\" class=\"btn gh sm\" onclick=\"closeQaReportModal()\" style=\"background:rgba(0,0,0,0.2); color:#fff; border:none; border-radius:50%; width:34px; height:34px; padding:0;\">✕</button>\n  </div>\n\n  <div class=\"qa-modal-tabs\">\n    <button type=\"button\" class=\"qa-tab-btn active\" id=\"qa-tab-btn-form\" onclick=\"switchQaModalTab('form')\">\n      <ion-icon name=\"paper-plane-outline\"></ion-icon> <span>Gửi câu hỏi / Báo lỗi</span>\n    </button>\n    <button type=\"button\" class=\"qa-tab-btn\" id=\"qa-tab-btn-list\" onclick=\"switchQaModalTab('list')\">\n      <ion-icon name=\"list-outline\"></ion-icon> <span>Danh sách thắc mắc (<span id=\"qa-saved-count\">0</span>)</span>\n    </button>\n    <button type=\"button\" class=\"qa-tab-btn\" id=\"qa-tab-btn-config\" onclick=\"switchQaModalTab('config')\">\n      <ion-icon name=\"settings-outline\"></ion-icon> <span>Kết nối Email / Sheets</span>\n    </button>\n  </div>\n\n  <div class=\"qa-modal-body\">\n    <!-- TAB 1: FORM GỬI THẮC MẮC / BÁO LỖI -->\n    <div id=\"qa-pane-form\">\n      <div class=\"qa-context-banner\" id=\"qa-context-banner\">\n        <ion-icon name=\"location-outline\"></ion-icon>\n        <span>Vị trí đang xem: <b id=\"qa-current-context-label\">Trang chủ</b></span>\n      </div>\n\n      <div class=\"qa-form-grid-2\">\n        <div>\n          <label class=\"qa-label\" for=\"qa-student-name\">Họ và tên học sinh <span style=\"color:var(--red);\">*</span></label>\n          <input type=\"text\" id=\"qa-student-name\" class=\"qa-input\" placeholder=\"Nhập họ tên của em...\" maxlength=\"60\">\n        </div>\n        <div>\n          <label class=\"qa-label\" for=\"qa-student-class\">Lớp</label>\n          <input type=\"text\" id=\"qa-student-class\" class=\"qa-input\" placeholder=\"Ví dụ: 11A1, 12A2...\" maxlength=\"25\">\n        </div>\n      </div>\n\n      <div style=\"margin-top:12px;\">\n        <label class=\"qa-label\" for=\"qa-issue-type\">Phân loại nội dung</label>\n        <select id=\"qa-issue-type\" class=\"qa-select\">\n          <option value=\"Thắc mắc kiến thức\">❓ Thắc mắc kiến thức Ngữ văn (Cần giải đáp trên lớp)</option>\n          <option value=\"Góp ý viết đoạn/bài\">✍️ Xin hướng dẫn cách lập dàn ý / viết đoạn văn 200 chữ</option>\n          <option value=\"Báo lỗi câu hỏi/đáp án\">🐞 Báo lỗi nội dung câu hỏi / Đáp án chưa chính xác</option>\n          <option value=\"Báo lỗi kỹ thuật\">⚙️ Báo lỗi hiển thị / Kỹ thuật trên web</option>\n        </select>\n      </div>\n\n      <div style=\"margin-top:12px;\">\n        <label class=\"qa-label\" for=\"qa-message-input\">Nội dung câu hỏi hoặc lỗi phát hiện <span style=\"color:var(--red);\">*</span></label>\n        <div class=\"qa-quick-chips\">\n          <button type=\"button\" class=\"qa-chip\" onclick=\"fillQuickQaTemplate('Em chưa hiểu rõ cách triển khai luận điểm và dẫn chứng ở đề này ạ.')\">+ Chưa hiểu cách triển khai luận điểm</button>\n          <button type=\"button\" class=\"qa-chip\" onclick=\"fillQuickQaTemplate('Thầy/cô giải thích thêm giúp em tác dụng biện pháp tu từ trong ngữ liệu này với ạ.')\">+ Hỏi về biện pháp tu từ</button>\n          <button type=\"button\" class=\"qa-chip\" onclick=\"fillQuickQaTemplate('Cho em hỏi công thức viết đoạn 200 chữ cho chủ đề này nên bắt đầu như thế nào ạ?')\">+ Hỏi cách viết đoạn 200 chữ</button>\n          <button type=\"button\" class=\"qa-chip\" onclick=\"fillQuickQaTemplate('Em thấy đáp án của câu hỏi này có điểm chưa khớp với ngữ liệu, nhờ kiểm tra lại giúp em ạ.')\">+ Báo lỗi đáp án câu hỏi</button>\n        </div>\n        <textarea id=\"qa-message-input\" class=\"qa-textarea\" rows=\"4\" placeholder=\"Nhập chi tiết phần kiến thức em chưa hiểu hoặc lỗi em gặp phải để được giải đáp kịp thời trên lớp...\" maxlength=\"2000\"></textarea>\n      </div>\n\n      <div class=\"qa-submit-row\">\n        <button type=\"button\" class=\"btn gh sm\" onclick=\"submitQaViaMailto()\" title=\"Mở trình gửi Email trực tiếp\">\n          <ion-icon name=\"mail-outline\"></ion-icon> <span>Gửi qua Email</span>\n        </button>\n        <button type=\"button\" class=\"btn au\" id=\"btn-submit-qa-report\" onclick=\"submitQaReportForm()\">\n          <ion-icon name=\"send-outline\"></ion-icon> <span>Gửi thắc mắc ngay</span>\n        </button>\n      </div>\n    </div>\n\n    <!-- TAB 2: DANH SÁCH THẮC MẮC CỦA LỚP -->\n    <div id=\"qa-pane-list\" style=\"display:none;\">\n      <div style=\"display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:12px;\">\n        <span style=\"font-size:13px; color:var(--mut); font-weight:600;\">Tổng hợp câu hỏi học sinh gửi để giải đáp trên lớp</span>\n        <div style=\"display:flex; gap:6px;\">\n          <button type=\"button\" class=\"btn cy sm\" onclick=\"exportQaReportsToCsv()\" title=\"Xuất file CSV mở bằng Google Sheets / Excel\">\n            <ion-icon name=\"download-outline\"></ion-icon> <span>Xuất Google Sheets (CSV)</span>\n          </button>\n          <button type=\"button\" class=\"btn no sm\" onclick=\"clearAllQaReports()\" title=\"Xóa toàn bộ danh sách\">\n            <ion-icon name=\"trash-outline\"></ion-icon> <span>Xóa hết</span>\n          </button>\n        </div>\n      </div>\n      <div id=\"qa-reports-list-container\" class=\"qa-reports-list\"></div>\n    </div>\n\n    <!-- TAB 3: CẤU HÌNH GOOGLE SHEETS & EMAIL NHẬN -->\n    <div id=\"qa-pane-config\" style=\"display:none;\">\n      <div class=\"qa-config-box\">\n        <h4 style=\"margin:0 0 6px; font-size:15px;\">⚙️ Cấu hình Kênh Nhận Thắc Mắc Trực Tiếp</h4>\n        <p style=\"margin:0 0 14px; font-size:12.5px; color:var(--mut); line-height:1.5;\">\n          Khi học sinh bấm <b>Gửi thắc mắc</b>, dữ liệu sẽ tự động lưu trên hệ thống, đồng thời đẩy thẳng về <b>Google Sheets Webhook</b> hoặc <b>Email</b> bạn thiết lập bên dưới.\n        </p>\n\n        <label class=\"qa-label\" for=\"qa-cfg-email\">📧 Địa chỉ Email nhận câu hỏi</label>\n        <input type=\"email\" id=\"qa-cfg-email\" class=\"qa-input\" placeholder=\"Ví dụ: giaovien.nguvan@gmail.com\">\n\n        <label class=\"qa-label\" for=\"qa-cfg-webhook\" style=\"margin-top:12px;\">📊 Google Sheets Webhook URL (Apps Script Web App URL)</label>\n        <input type=\"url\" id=\"qa-cfg-webhook\" class=\"qa-input\" placeholder=\"https://script.google.com/macros/s/.../exec\">\n        <p style=\"margin:6px 0 14px; font-size:11.5px; color:var(--mut); line-height:1.45;\">\n          💡 <i>Mẹo:</i> Trong Google Sheets, vào <b>Tiện ích mở rộng → Apps Script</b>, dán hàm <code>doPost(e)</code> nhận JSON và triển khai dạng <i>Ứng dụng Web (Bất kỳ ai)</i> rồi dán link vào ô trên để tự động ghi từng dòng câu hỏi của học sinh vào bảng tính!\n        </p>\n\n        <div style=\"display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;\">\n          <button type=\"button\" class=\"btn gh sm\" onclick=\"copyAppsScriptSnippet()\">\n            <ion-icon name=\"code-slash-outline\"></ion-icon> <span>Sao chép mã Apps Script mẫu</span>\n          </button>\n          <button type=\"button\" class=\"btn au sm\" onclick=\"saveQaIntegrationConfig()\">\n            <ion-icon name=\"save-outline\"></ion-icon> <span>Lưu cấu hình kết nối</span>\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n</dialog>\n\n<!-- FLOATING QA / BUG REPORT BUTTON (Hidden to avoid duplicating topbar #nav-qa-btn) & TOAST & BACK TO TOP -->\n<button id=\"fab-qa-report\" class=\"fab-qa-btn\" style=\"display:none;\" onclick=\"openQaReportModal()\" aria-label=\"Báo cáo lỗi hoặc Gửi thắc mắc\" title=\"Đặt câu hỏi thắc mắc hoặc Báo lỗi\">\n  <span class=\"fab-qa-icon\">💬</span>\n  <span class=\"fab-qa-text\">Hỏi đáp / Báo lỗi</span>\n</button>\n<div id=\"toast\" role=\"status\"></div>\n<button id=\"back-to-top\" onclick=\"window.scrollTo({top:0,behavior:'smooth'})\" aria-label=\"Về đầu trang\" title=\"Về đầu trang\">\n  <ion-icon name=\"arrow-up-outline\"></ion-icon>\n</button>"
};

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


/* =========================================================================
   1. CORE UTILITIES, CONSTANTS & NAVIGATION
   ========================================================================= */

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const uid = () => Math.random().toString(36).slice(2, 9);
const N = s => String(s || '').trim().toLowerCase().replace(/\s+/g, ' ');
const lines = s => s.split('\n').map(x => x.trim()).filter(Boolean);

window.$ = $;
window.$$ = $$;
window.esc = esc;
window.uid = uid;

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
    historyTable: _0xdec('Ky8zIAUpLzg3MykpMzU0KQ=='),
    usersTable: _0xdec('Lyk/KAU7OTk1LzQuKQ==')
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
window.toast = toast;

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
window.ask = ask;

function isExamInProgress() {
  if (window.__SECURITY_SHIELD && typeof window.__SECURITY_SHIELD.isExamActive === 'function') {
    return window.__SECURITY_SHIELD.isExamActive();
  }
  if (currentScreen === 'game') return true;
  const wsWriting = document.getElementById('writing-workspace-view');
  if (currentScreen === 'writing' && wsWriting && wsWriting.style.display === 'block') return true;
  const wsReading = document.getElementById('reading-workspace-view');
  if (currentScreen === 'reading' && wsReading && wsReading.style.display === 'block') return true;
  return false;
}
window.isExamInProgress = isExamInProgress;

window.addEventListener('beforeunload', function(e) {
  if (typeof isExamInProgress === 'function' && isExamInProgress()) {
    e.preventDefault();
    e.returnValue = 'Bạn đang trong quá trình làm bài thi! Vui lòng nộp bài trước khi thoát.';
    return e.returnValue;
  }
});

function go(n, p) {
  if (n !== 'res' && n !== currentScreen && isExamInProgress()) {
    toast('⚠️ Bạn đang làm bài! Phải nộp bài xong mới được thoát.', 'bad');
    return;
  }
  if (n === 'accounts') {
    n = 'home';
  }
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
window.go = go;

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


/* =========================================================================
   2. WEB AUDIO SYNTHESIZER & SOUND EFFECTS
   ========================================================================= */

const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx;

// SFX Sound Enabled
let soundEnabled = true;
try {
  soundEnabled = localStorage.getItem('vq_sound_enabled') !== 'false';
} catch (error) {
  console.warn('Could not load sound preference:', error);
}

function initAudioContext() {
  if (!AudioCtx) return;
  if (!audioCtx) {
    audioCtx = new AudioCtx();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

// Bật/tắt trạng thái hiển thị của nút âm thanh
function toggleSoundButtonState() {
  const button = $('#sound-toggle');
  if (button) {
    button.textContent = soundEnabled ? '🔊' : '🔇';
    button.title = soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh';
    button.setAttribute('aria-label', soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh');
    button.setAttribute('aria-pressed', String(soundEnabled));
  }
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  toggleSoundButtonState();
  try {
    localStorage.setItem('vq_sound_enabled', String(soundEnabled));
  } catch (error) {
    console.warn('Could not save sound preference:', error);
  }
  if (soundEnabled) {
    playSound('pop');
  }
  if (typeof updateSettingsUI === 'function') updateSettingsUI();
}

function playSound(type) {
  if (!soundEnabled) return;
  try {
    initAudioContext();
    if (!audioCtx) return;

    const t = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'click' || type === 'pop') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(740, t + 0.07);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      osc.start(t);
      osc.stop(t + 0.08);
    } else if (type === 'correct') {
      // Âm thanh vui tươi khi trả lời đúng
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);

      osc.type = 'sine';
      osc2.type = 'triangle';

      osc.frequency.setValueAtTime(523.25, t); // C5
      osc.frequency.setValueAtTime(659.25, t + 0.09); // E5
      osc.frequency.setValueAtTime(783.99, t + 0.18); // G5
      osc.frequency.setValueAtTime(1046.50, t + 0.27); // C6

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

      osc2.frequency.setValueAtTime(261.63, t); // C4
      gain2.gain.setValueAtTime(0.08, t);
      gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc.start(t);
      osc2.start(t);
      osc.stop(t + 0.45);
      osc2.stop(t + 0.35);
    } else if (type === 'wrong') {
      // Âm thanh báo sai nhẹ nhàng
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, t);
      osc.frequency.linearRampToValueAtTime(180, t + 0.18);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.start(t);
      osc.stop(t + 0.25);
    } else if (type === 'win') {
      // Hoàn thành xuất sắc
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.connect(g);
        g.connect(audioCtx.destination);
        o.type = 'triangle';
        o.frequency.setValueAtTime(freq, t + idx * 0.1);
        g.gain.setValueAtTime(0.15, t + idx * 0.1);
        g.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.1 + 0.3);
        o.start(t + idx * 0.1);
        o.stop(t + idx * 0.1 + 0.3);
      });
    }
  } catch (err) {
    console.warn('Audio play error:', err);
  }
}

// Khởi động AudioContext khi tương tác lần đầu
window.addEventListener('click', function unlockAudio() {
  initAudioContext();
  window.removeEventListener('click', unlockAudio);
}, { once: true });


/* =========================================================================
   3. BACKGROUND CANVAS PARTICLES, HERO SHOWCASE & ANIMATIONS
   ========================================================================= */

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let bgParticles = [];
let mouseWind = { x: 0, y: 0 };
let lastMouse = { x: 0, y: 0 };
let bgAnimTime = 0;
let bgParticlesEnabled = true;

try {
  bgParticlesEnabled = localStorage.getItem('vq_bg_particles') !== 'false';
} catch(e) {}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initBgParticles();
}
window.addEventListener('resize', resizeCanvas);

function initBgParticles() {
  bgParticles = [];
  const count = Math.min(45, Math.floor(window.innerWidth / 32));
  for (let i = 0; i < count; i++) {
    const type = i % 3 === 0 ? 'petal' : (i % 3 === 1 ? 'sparkle' : 'leaf');
    bgParticles.push({
      type,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: type === 'sparkle' ? 1.5 + Math.random() * 2.5 : 8 + Math.random() * 10,
      speedY: type === 'sparkle' ? 0.3 + Math.random() * 0.4 : 0.6 + Math.random() * 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      angle: Math.random() * Math.PI * 2,
      angularSpeed: (Math.random() - 0.5) * 0.025,
      phase: Math.random() * Math.PI * 2,
      opacity: type === 'sparkle' ? 0.45 + Math.random() * 0.45 : 0.28 + Math.random() * 0.42
    });
  }
}
resizeCanvas();

window.addEventListener('mousemove', e => {
  const dx = e.clientX - lastMouse.x;
  const dy = e.clientY - lastMouse.y;
  mouseWind.x += dx * 0.02;
  mouseWind.y += dy * 0.02;
  mouseWind.x = Math.max(-2, Math.min(2, mouseWind.x));
  mouseWind.y = Math.max(-2, Math.min(2, mouseWind.y));
  lastMouse.x = e.clientX;
  lastMouse.y = e.clientY;
}, { passive: true });

function drawLotusPetal(c, x, y, size, angle, opacity, isDark) {
  c.save();
  c.translate(x, y);
  c.rotate(angle);
  c.beginPath();
  c.moveTo(0, -size);
  c.bezierCurveTo(size * 0.75, -size * 0.4, size * 0.75, size * 0.65, 0, size);
  c.bezierCurveTo(-size * 0.75, size * 0.65, -size * 0.75, -size * 0.4, 0, -size);
  
  const grad = c.createLinearGradient(0, -size, 0, size);
  if (isDark) {
    grad.addColorStop(0, 'rgba(244, 114, 182, ' + (opacity * 0.75) + ')');
    grad.addColorStop(1, 'rgba(251, 191, 36, ' + (opacity * 0.5) + ')');
  } else {
    grad.addColorStop(0, 'rgba(251, 113, 133, ' + opacity + ')');
    grad.addColorStop(0.5, 'rgba(244, 114, 182, ' + (opacity * 0.85) + ')');
    grad.addColorStop(1, 'rgba(253, 224, 71, ' + (opacity * 0.6) + ')');
  }
  c.fillStyle = grad;
  c.fill();
  c.restore();
}

function drawSparkleParticle(c, x, y, radius, alpha, isDark) {
  c.save();
  c.beginPath();
  c.arc(x, y, radius, 0, Math.PI * 2);
  c.fillStyle = isDark ? '#fef08a' : '#f59e0b';
  c.globalAlpha = alpha;
  c.shadowColor = '#facc15';
  c.shadowBlur = 6;
  c.fill();
  c.restore();
}

function drawAutumnLeaf(c, x, y, size, angle, opacity, isDark) {
  c.save();
  c.translate(x, y);
  c.rotate(angle);
  c.beginPath();
  c.moveTo(0, -size);
  c.quadraticCurveTo(size * 0.45, 0, 0, size);
  c.quadraticCurveTo(-size * 0.45, 0, 0, -size);
  c.fillStyle = isDark ? 'rgba(52, 211, 153, ' + opacity + ')' : 'rgba(16, 185, 129, ' + (opacity * 0.85) + ')';
  c.fill();
  c.restore();
}

function drawBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (bgParticlesEnabled) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    bgAnimTime += 0.015;

    mouseWind.x *= 0.96;
    mouseWind.y *= 0.96;

    for (let i = 0; i < bgParticles.length; i++) {
      const p = bgParticles[i];
      p.angle += p.angularSpeed;
      p.x += p.speedX + Math.sin(bgAnimTime + p.phase) * 0.75 + mouseWind.x;
      p.y += p.speedY + mouseWind.y * 0.5;

      if (p.y > canvas.height + 25) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
      if (p.x < -25) p.x = canvas.width + 20;
      if (p.x > canvas.width + 25) p.x = -20;

      if (p.type === 'petal') {
        drawLotusPetal(ctx, p.x, p.y, p.size, p.angle, p.opacity, isDark);
      } else if (p.type === 'sparkle') {
        const pulseAlpha = p.opacity * (0.6 + Math.sin(bgAnimTime * 2.5 + p.phase) * 0.4);
        drawSparkleParticle(ctx, p.x, p.y, p.size, pulseAlpha, isDark);
      } else if (p.type === 'leaf') {
        drawAutumnLeaf(ctx, p.x, p.y, p.size, p.angle, p.opacity, isDark);
      }
    }
  }

  requestAnimationFrame(drawBackground);
}
drawBackground();

/* === HERO STUDY QUOTES === */
const HERO_STUDY_QUOTES = [
  {
    tag: 'LỜI DẠY CỦA BÁC HỒ',
    quote: '“Non sông Việt Nam có trở nên tươi đẹp hay không, dân tộc Việt Nam có bước tới đài vinh quang để sánh vai với các cường quốc năm châu được hay không, chính là nhờ một phần lớn ở công học tập của các em.”',
    author: '— Chủ tịch Hồ Chí Minh —',
    img: './assets/bac-ho.jpg',
    accent: '#b45309',
    border: '#f59e0b',
    bgLight: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 45%, #fffdf5 100%)',
    bgDark: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
  },
  {
    tag: 'TRI THỨC LÀ SỨC MẠNH',
    quote: '“Học, học nữa, học mãi.”',
    author: '— V.I. Lê-nin —',
    img: './assets/lenin.jpg',
    accent: '#dc2626',
    border: '#ef4444',
    bgLight: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 45%, #fffdf8 100%)',
    bgDark: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
  },
  {
    tag: 'BẢN LĨNH TRI THỨC',
    quote: '“Giáo dục là vũ khí mạnh nhất mà bạn có thể dùng để thay đổi thế giới.”',
    author: '— Nelson Mandela —',
    img: './assets/mandela.jpg',
    accent: '#059669',
    border: '#10b981',
    bgLight: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 45%, #fafffd 100%)',
    bgDark: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
  },
  {
    tag: 'ÁNH SÁNG TÂM HỒN',
    quote: '“Văn học là nhân đạo hóa con người.”',
    author: '— Victor Hugo —',
    img: './assets/victor-hugo.jpg',
    accent: '#7c3aed',
    border: '#8b5cf6',
    bgLight: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 45%, #fcfaff 100%)',
    bgDark: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
  },
  {
    tag: 'ĐAM MÊ KHÁM PHÁ',
    quote: '“Học tập không bao giờ làm cạn kiệt trí óc.”',
    author: '— Leonardo da Vinci —',
    img: './assets/aristotle.jpg',
    accent: '#0891b2',
    border: '#06b6d4',
    bgLight: 'linear-gradient(135deg, #ecfeff 0%, #cffafe 45%, #fafffd 100%)',
    bgDark: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
  }
];

let heroQuoteIndex = 0;
let heroQuoteTimer = null;

function applyHeroQuote(idx, animate = true) {
  const item = HERO_STUDY_QUOTES[idx];
  if (!item) return;

  const showcase = document.querySelector('#hero-showcase');
  const card = document.querySelector('#hero-study-card');
  const img = document.querySelector('#study-img');
  const imgWrap = document.querySelector('#study-img-wrap');
  const tag = document.querySelector('#study-tag');
  const quote = document.querySelector('#study-quote');
  const author = document.querySelector('#study-author');

  if (!card || !img || !quote) return;

  const updateContent = () => {
    img.src = item.img;
    img.alt = item.author;
    if (tag) tag.textContent = item.tag;
    quote.textContent = item.quote;
    if (author) author.textContent = item.author;

    // Apply font size adjustment for long quotes
    if (item.quote.length > 90) {
      quote.classList.add('long-quote');
    } else {
      quote.classList.remove('long-quote');
    }

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    // Đảm bảo thẻ con hero-study-card luôn trong suốt, không bao giờ tạo khối chữ nhật cắt vụn:
    card.style.background = 'transparent';
    card.style.border = 'none';
    card.style.boxShadow = 'none';

    // Đổi màu nền mượt mà trực tiếp trên toàn bộ khung hero-showcase lớn:
    if (showcase) {
      showcase.style.background = isDark ? item.bgDark : item.bgLight;
    }
    if (tag) {
      tag.style.color = item.accent;
    }
    if (author) {
      author.style.color = isDark ? '#fde047' : item.accent;
    }
    if (imgWrap) {
      imgWrap.style.boxShadow = isDark
        ? `0 12px 28px rgba(0, 0, 0, 0.5), 0 0 0 2.5px ${item.accent}66`
        : `0 12px 28px rgba(0, 0, 0, 0.12), 0 0 0 2.5px ${item.accent}55`;
    }
  };

  if (animate && typeof gsap !== 'undefined') {
    gsap.to(card, {
      opacity: 0,
      y: 6,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        updateContent();
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: 'power2.out'
        });
      }
    });
  } else {
    updateContent();
  }
}

function rotateHeroQuote() {
  heroQuoteIndex = (heroQuoteIndex + 1) % HERO_STUDY_QUOTES.length;
  applyHeroQuote(heroQuoteIndex, true);
}

function startHeroQuoteRotation() {
  stopHeroQuoteRotation();
  heroQuoteTimer = setInterval(rotateHeroQuote, 8500);
}

function stopHeroQuoteRotation() {
  if (heroQuoteTimer) {
    clearInterval(heroQuoteTimer);
    heroQuoteTimer = null;
  }
}

function animateScreenIn(screenId) {
  if (typeof gsap === 'undefined') return;
  const target = document.querySelector('#s-' + screenId);
  if (!target) return;
  gsap.fromTo(target, 
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', clearProps: 'all' }
  );
}


/* =========================================================================
   4. DATA PERSISTENCE & SUPABASE CLOUD SYNC
   ========================================================================= */

function getSupabaseRequestHeaders(extra = {}) {
  return {
    'apikey': appConfig.supabase.anonKey,
    'Authorization': `Bearer ${appConfig.supabase.anonKey}`,
    'Content-Type': 'application/json',
    ...extra
  };
}

async function loadSetsFromSupabase() {
  if (!isSupabaseConfigured()) return false;
  try {
    const url = `${appConfig.supabase.url.replace(/\/$/, '')}/rest/v1/${appConfig.supabase.table || 'question_sets'}?select=id,title,topic,status,qs&order=updated_at.desc`;
    const res = await fetch(url, {
      method: 'GET',
      headers: getSupabaseRequestHeaders()
    });
    if (!res.ok) throw new Error('Supabase request failed');
    const rows = await res.json();
    if (Array.isArray(rows)) {
      sets = rows.filter(row => row.status !== 'deleted' && !String(row.id).startsWith('set_')).map(row => ({
        id: String(row.id),
        emo: row.emo || '📖',
        title: row.title || 'Bộ câu hỏi',
        topic: row.topic || '',
        status: row.status || 'draft',
        maxAttempts: (typeof getSetMaxAttempts === 'function' ? getSetMaxAttempts(row.id, 'quiz') : 0),
        deadline: (typeof getSetDeadline === 'function' ? getSetDeadline(row.id, 'quiz') : ''),
        qs: Array.isArray(row.qs) ? row.qs : []
      }));
      return true;
    }
  } catch (e) {
    console.warn('Supabase load failed, fallback localStorage:', e);
  }
  return false;
}

async function archiveQuestionSetInSupabase(id) {
  if (!isSupabaseConfigured()) return;
  const table = appConfig.supabase.table || 'question_sets';
  const query = new URLSearchParams({ id: `eq.${String(id)}` });
  const url = `${appConfig.supabase.url.replace(/\/$/, '')}/rest/v1/${table}?${query}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: getSupabaseRequestHeaders({ 'Prefer': 'return=representation' }),
    body: JSON.stringify({ status: 'deleted' })
  });
  if (!res.ok) {
    const details = await res.text();
    throw new Error(details || `Supabase delete failed (${res.status})`);
  }
  const archivedRows = await res.json();
  if (!Array.isArray(archivedRows) || !archivedRows.some(row => String(row.id) === String(id))) {
    console.warn('Bộ câu hỏi không tồn tại trên máy chủ hoặc chỉ tồn tại trên trình duyệt:', id);
    return;
  }
}

async function archiveQuestionSets(ids) {
  const results = await Promise.allSettled(ids.map(id => archiveQuestionSetInSupabase(id)));
  return results.map((result, index) => ({
    id: String(ids[index]),
    error: result.status === 'rejected' ? result.reason : null
  }));
}

async function syncSetsToSupabase() {
  if (!isSupabaseConfigured()) return;
  try {
    const rows = sets.map(s => ({
      id: String(s.id),
      title: s.title,
      topic: s.topic || '',
      status: s.status || 'draft',
      qs: s.qs || []
    }));
    const url = `${appConfig.supabase.url.replace(/\/$/, '')}/rest/v1/${appConfig.supabase.table || 'question_sets'}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: getSupabaseRequestHeaders({ 'Prefer': 'resolution=merge-duplicates' }),
      body: JSON.stringify(rows)
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || 'Supabase sync failed');
    }
  } catch (e) {
    console.warn('Supabase save failed:', e);
  }
}

let syncDebounceTimer = null;
function setSyncBadge(state, text) {
  const badge = $('#sync-badge');
  if (!badge) return;
  badge.className = 'sync-badge ' + (state || '');
  badge.textContent = { saving: '⏳ Đang lưu...', saved: '✅ Đã đồng bộ', error: '⚠️ Lỗi lưu' }[state] || text || '☁️ Đã đồng bộ';
}

const save = () => { 
  try { localStorage.vq_cartoon = JSON.stringify(sets); } catch (e) {}
  setSyncBadge('saving');
  clearTimeout(syncDebounceTimer);
  syncDebounceTimer = setTimeout(async () => {
    try {
      await syncSetsToSupabase();
      setSyncBadge('saved');
      setTimeout(() => setSyncBadge('', '☁️ Đã đồng bộ'), 2000);
    } catch (e) {
      setSyncBadge('error');
    }
  }, 800);
};

let _lbAllRows = [];

R.home = async () => {
  if (typeof applyHeroQuote === 'function') {
    applyHeroQuote(heroQuoteIndex, false);
  }
  if (typeof startHeroQuoteRotation === 'function') {
    startHeroQuoteRotation();
  }
  if (typeof renderHomeSets === 'function') {
    renderHomeSets();
  }
  
  const host = $('#lb-container');
  if (!host) return;
  if (!isSupabaseConfigured()) {
    host.textContent = 'Chưa kết nối Supabase nên bảng xếp hạng chưa thể tải.';
    return;
  }
  host.innerHTML = '<p class="mut" role="status">⏳ Đang tải bảng xếp hạng...</p>';
  try {
    const table = appConfig.supabase.leaderboardTable || 'leaderboard_entries';
    const url = `${appConfig.supabase.url.replace(/\/$/, '')}/rest/v1/${table}?select=player_name,class_name,set_title,score,correct_count,question_count,accuracy,game_mode,elapsed_seconds&order=score.desc,correct_count.desc,created_at.asc&limit=50`;
    const res = await fetch(url, {
      headers: {
        'apikey': appConfig.supabase.anonKey,
        'Authorization': `Bearer ${appConfig.supabase.anonKey}`,
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) {
      const details = await res.text();
      throw new Error(details || `Supabase request failed (${res.status})`);
    }
    const rows = await res.json();
    if (!Array.isArray(rows)) throw new Error('Bảng xếp hạng trả về dữ liệu không hợp lệ.');
    _lbAllRows = rows;
    renderLeaderboard();
  } catch (error) {
    console.error('Leaderboard load failed:', error);
    host.innerHTML = '<p role="alert">Không tải được bảng xếp hạng. Kiểm tra bảng leaderboard_entries và quyền đọc Supabase, rồi thử tải lại.</p><button class="btn gh sm" onclick="R.home()">↻ Tải lại</button>';
  }
};

function renderLeaderboard() {
  const host = $('#lb-container');
  if (!host) return;
  const search = N($('#lb-search')?.value || '');
  const mode = $('#lb-mode-filter')?.value || '';

  const AVATAR_GRADIENTS = [
    'linear-gradient(135deg, #f43f5e, #fb7185)',
    'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    'linear-gradient(135deg, #06b6d4, #22d3ee)',
    'linear-gradient(135deg, #10b981, #34d399)',
    'linear-gradient(135deg, #f59e0b, #fbbf24)',
    'linear-gradient(135deg, #ec4899, #f472b6)'
  ];

  const MEDAL_GOLD_SVG = '<svg class="lb-medal-svg" viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Huy chương vàng"><path d="M6.5 2H9.5L12 8L14.5 2H17.5L13.8 10.5H10.2L6.5 2Z" fill="#EF4444"/><path d="M9.5 2L12 7.2L14.5 2H12.5L12 3.2L11.5 2H9.5Z" fill="#3B82F6"/><circle cx="12" cy="15.2" r="6.8" fill="#F59E0B" stroke="#B45309" stroke-width="1.3"/><circle cx="12" cy="15.2" r="5.2" fill="#FDE047"/><polygon points="12,12.5 12.85,14.3 14.8,14.5 13.35,15.85 13.75,17.75 12,16.75 10.25,17.75 10.65,15.85 9.2,14.5 11.15,14.3" fill="#B45309"/></svg>';
  const MEDAL_SILVER_SVG = '<svg class="lb-medal-svg" viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Huy chương bạc"><path d="M6.5 2H9.5L12 8L14.5 2H17.5L13.8 10.5H10.2L6.5 2Z" fill="#3B82F6"/><path d="M9.5 2L12 7.2L14.5 2H12.5L12 3.2L11.5 2H9.5Z" fill="#0EA5E9"/><circle cx="12" cy="15.2" r="6.8" fill="#94A3B8" stroke="#475569" stroke-width="1.3"/><circle cx="12" cy="15.2" r="5.2" fill="#F1F5F9"/><polygon points="12,12.5 12.85,14.3 14.8,14.5 13.35,15.85 13.75,17.75 12,16.75 10.25,17.75 10.65,15.85 9.2,14.5 11.15,14.3" fill="#475569"/></svg>';
  const MEDAL_BRONZE_SVG = '<svg class="lb-medal-svg" viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Huy chương đồng"><path d="M6.5 2H9.5L12 8L14.5 2H17.5L13.8 10.5H10.2L6.5 2Z" fill="#10B981"/><path d="M9.5 2L12 7.2L14.5 2H12.5L12 3.2L11.5 2H9.5Z" fill="#059669"/><circle cx="12" cy="15.2" r="6.8" fill="#EA580C" stroke="#9A3412" stroke-width="1.3"/><circle cx="12" cy="15.2" r="5.2" fill="#FED7AA"/><polygon points="12,12.5 12.85,14.3 14.8,14.5 13.35,15.85 13.75,17.75 12,16.75 10.25,17.75 10.65,15.85 9.2,14.5 11.15,14.3" fill="#9A3412"/></svg>';

  let rows = _lbAllRows;
  if (search) rows = rows.filter(r => N(r.player_name + ' ' + (r.class_name || '') + ' ' + r.set_title).includes(search));
  if (mode) rows = rows.filter(r => r.game_mode === mode);

  if (!rows.length) {
    host.innerHTML = `
      <div class="lb-empty-state">
        <div class="lb-empty-icon">🏆</div>
        <p class="lb-empty-title">Chưa có thành tích nào phù hợp</p>
        <p class="lb-empty-hint">${search || mode ? 'Thử xóa bộ lọc để xem toàn bộ bảng vàng.' : 'Hãy hoàn thành một lượt ôn tập để ghi danh vào bảng vàng!'}</p>
      </div>
    `;
    return;
  }

  host.innerHTML = `
    <div class="lb-table-wrap">
      <table class="leaderboard">
        <thead>
          <tr>
            <th style="width:85px;">Hạng</th>
            <th>Học sinh</th>
            <th style="width:85px;">Lớp</th>
            <th>Bộ đề ôn tập</th>
            <th style="width:115px;">Điểm số</th>
            <th style="width:155px;">Độ chính xác</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row, index) => {
            const acc = Number(row.accuracy) || 0;
            const score = Number(row.score) || 0;
            const correct = Number(row.correct_count) || 0;
            const total = Number(row.question_count) || 0;
            const name = (row.player_name || 'Học sinh').trim();
            const initial = name ? name.charAt(0).toUpperCase() : 'H';
            const gradIndex = Math.abs(name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)) % AVATAR_GRADIENTS.length;
            const avatarGrad = AVATAR_GRADIENTS[gradIndex];

            let rowClass = 'lb-row';
            let badgeClass = 'lb-badge-regular';
            let badgeContent = `<span class="lb-rank-num">#${index + 1}</span>`;

            if (index === 0) {
              rowClass += ' lb-row-top1';
              badgeClass = 'lb-badge-gold';
              badgeContent = `${MEDAL_GOLD_SVG} <span class="lb-rank-num">1</span>`;
            } else if (index === 1) {
              rowClass += ' lb-row-top2';
              badgeClass = 'lb-badge-silver';
              badgeContent = `${MEDAL_SILVER_SVG} <span class="lb-rank-num">2</span>`;
            } else if (index === 2) {
              rowClass += ' lb-row-top3';
              badgeClass = 'lb-badge-bronze';
              badgeContent = `${MEDAL_BRONZE_SVG} <span class="lb-rank-num">3</span>`;
            }

            const barCls = acc >= 80 ? 'acc-bar-high' : acc >= 50 ? 'acc-bar-mid' : 'acc-bar-low';

            return `
            <tr class="${rowClass}">
              <td>
                <span class="lb-rank-badge ${badgeClass}">${badgeContent}</span>
              </td>
              <td>
                <div class="lb-player-cell">
                  <div class="lb-avatar-initial" style="background:${avatarGrad};">${initial}</div>
                  <span class="lb-player-name">${esc(name)}</span>
                </div>
              </td>
              <td>
                ${row.class_name ? `<span class="lb-class-pill">${esc(row.class_name)}</span>` : `<span class="lb-dash">—</span>`}
              </td>
              <td>
                <span class="lb-set-title" title="${esc(row.set_title)}">📖 ${esc(row.set_title)}</span>
              </td>
              <td>
                <div class="lb-score-wrap">
                  <span class="lb-score-num">${score}</span>
                  <span class="lb-score-pts">pts</span>
                </div>
              </td>
              <td>
                <div class="lb-acc-wrap">
                  <div class="lb-acc-top">
                    <span class="lb-acc-pct">${acc.toFixed(0)}%</span>
                    <span class="lb-acc-fraction">${correct}/${total} câu</span>
                  </div>
                  <div class="acc-bar">
                    <div class="acc-bar-fill ${barCls}" style="width:${Math.min(100, Math.max(0, acc))}%;"></div>
                  </div>
                </div>
              </td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function resetLbFilters() {
  const s = $('#lb-search'); if (s) s.value = '';
  const m = $('#lb-mode-filter'); if (m) m.value = '';
  renderLeaderboard();
}

async function saveScoreToLeaderboard() {
  if (!G || !G.scoreEntry) return;
  const status = $('#score-save-status');
  const retryButton = $('#score-save-retry');
  if (G.scoreSaved) {
    if (status) status.textContent = '✅ Đã lưu kết quả vào bảng xếp hạng.';
    if (retryButton) retryButton.hidden = true;
    return;
  }
  if (!isSupabaseConfigured()) {
    if (status) status.textContent = 'ℹ️ Chưa cấu hình Supabase nên điểm số chỉ lưu trong phiên chơi này.';
    if (retryButton) retryButton.hidden = true;
    return;
  }
  G.scoreSavePending = true;
  if (status) status.textContent = '⏳ Đang lưu kết quả bảng xếp hạng...';
  if (retryButton) retryButton.hidden = true;
  try {
    const table = appConfig.supabase.leaderboardTable || 'leaderboard_entries';
    const url = `${appConfig.supabase.url.replace(/\/$/, '')}/rest/v1/${table}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'apikey': appConfig.supabase.anonKey,
        'Authorization': `Bearer ${appConfig.supabase.anonKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(G.scoreEntry)
    });
    if (!res.ok) {
      const details = await res.text();
      throw new Error(details || `Supabase leaderboard save failed (${res.status})`);
    }
    G.scoreSaved = true;
    if (status) status.textContent = '✅ Đã lưu kết quả thành công vào bảng xếp hạng!';
    if (retryButton) retryButton.hidden = true;
  } catch (error) {
    console.error('Save score failed:', error);
    if (status) status.textContent = '⚠️ Không thể lưu điểm lên máy chủ.';
    if (retryButton) retryButton.hidden = false;
  } finally {
    G.scoreSavePending = false;
  }
}

// =========================================================================
// QUIZ & SUBMISSION HISTORY SYSTEM (LỊCH SỬ BÀI LÀM - CLOUD + LOCAL)
// =========================================================================

const QUIZ_HISTORY_KEY = 'vq_quiz_history_v1';
let currentHistorySearchQuery = '';
let isSyncingQuizHistory = false;

function getAllRawQuizHistory() {
  try {
    const raw = localStorage.getItem(QUIZ_HISTORY_KEY);
    let list = raw ? JSON.parse(raw) : [];
    if (Array.isArray(list)) {
      // Lọc sạch toàn bộ bài thi mẫu / dữ liệu thử nghiệm cũ để chỉ giữ dữ liệu thật
      list = list.filter(item => item && !String(item.id).startsWith('sample_'));
      if (window.__SECURITY_SHIELD && typeof window.__SECURITY_SHIELD.verify === 'function') {
        list.forEach(item => {
          if (item && item._secSig && !window.__SECURITY_SHIELD.verify(item)) {
            item.isTampered = true;
          }
        });
      }
    }
    return list;
  } catch (e) {
    console.error('Failed to parse quiz history:', e);
    return [];
  }
}

function isItemBelongToStudent(item, user) {
  if (!user) return false;
  if (user.role === 'teacher' || user.role === 'admin') return true;
  if (!item) return false;

  // 1. So khớp ID người dùng Supabase
  if (item.userId && user.id && String(item.userId) === String(user.id)) return true;

  // 2. So khớp username
  if (item.username && user.username && String(item.username).toLowerCase() === String(user.username).toLowerCase()) return true;

  // 3. So khớp tên người học hoặc biệt danh
  const pName = String(item.playerName || '').trim().toLowerCase();
  const fName = String(user.full_name || '').trim().toLowerCase();
  const uName = String(user.username || '').trim().toLowerCase();

  if (pName && (pName === fName || pName === uName)) return true;

  return false;
}

/* =========================================================================
   SET ATTEMPT LIMITS & SUBMISSION DEADLINE SYSTEM
   (GIỚI HẠN LƯỢT LÀM BÀI & THỜI HẠN NỘP BÀI)
   Quyền quản lý: Giáo viên & Quản trị viên
   Áp dụng: Bài học (Trắc nghiệm), Đọc hiểu, Luyện viết
   ========================================================================= */

const SET_ATTEMPT_LIMITS_KEY = 'vq_set_attempt_limits_v1';
const SET_DEADLINES_KEY = 'vq_set_deadlines_v1';

function getSetAttemptLimitsMap() {
  try {
    const raw = localStorage.getItem(SET_ATTEMPT_LIMITS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveSetAttemptLimitsMap(map) {
  try {
    localStorage.setItem(SET_ATTEMPT_LIMITS_KEY, JSON.stringify(map));
  } catch (e) {}
}

function getSetDeadlinesMap() {
  try {
    const raw = localStorage.getItem(SET_DEADLINES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveSetDeadlinesMap(map) {
  try {
    localStorage.setItem(SET_DEADLINES_KEY, JSON.stringify(map));
  } catch (e) {}
}

const SET_PRIVACY_MAP_KEY = 'lit_set_privacy_map';
const SET_OPEN_AT_MAP_KEY = 'lit_set_open_at_map';

function getSetPrivacyMap() {
  try {
    const raw = localStorage.getItem(SET_PRIVACY_MAP_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveSetPrivacyMap(map) {
  try {
    localStorage.setItem(SET_PRIVACY_MAP_KEY, JSON.stringify(map));
  } catch (e) {}
}

function getSetOpenAtMap() {
  try {
    const raw = localStorage.getItem(SET_OPEN_AT_MAP_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveSetOpenAtMap(map) {
  try {
    localStorage.setItem(SET_OPEN_AT_MAP_KEY, JSON.stringify(map));
  } catch (e) {}
}

function getSetPrivacy(setOrId, type = '') {
  let id = '';
  let directPrivacy = '';
  if (typeof setOrId === 'object' && setOrId !== null) {
    id = String(setOrId.id || '');
    if (setOrId.privacy) directPrivacy = String(setOrId.privacy).trim();
    else if (setOrId.status === 'draft' || setOrId.isDraft) directPrivacy = 'private';
    else if (setOrId.status === 'published') directPrivacy = 'public';
  } else {
    id = String(setOrId || '');
  }

  const map = getSetPrivacyMap();
  const mapPrivacy = map[id] ? String(map[id]).trim() : '';
  return (directPrivacy || mapPrivacy || 'public').toLowerCase();
}

function isSetPrivate(setOrId, type = '') {
  return getSetPrivacy(setOrId, type) === 'private';
}

function isStudentPrivacyBlocked(setOrId, type = '') {
  if (typeof Auth === 'undefined' || !Auth.isStudent()) return false;
  return isSetPrivate(setOrId, type);
}

function getSetOpenAt(setOrId, type = '') {
  let id = '';
  let directOpenAt = '';
  if (typeof setOrId === 'object' && setOrId !== null) {
    id = String(setOrId.id || '');
    if (setOrId.openAt) directOpenAt = String(setOrId.openAt).trim();
    else if (setOrId.open_at) directOpenAt = String(setOrId.open_at).trim();
  } else {
    id = String(setOrId || '');
  }

  const map = getSetOpenAtMap();
  const mapOpenAt = map[id] ? String(map[id]).trim() : '';
  return directOpenAt || mapOpenAt || '';
}

function isSetNotYetOpen(setOrId, type = '') {
  const openAt = getSetOpenAt(setOrId, type);
  if (!openAt) return false;
  const time = new Date(openAt).getTime();
  if (isNaN(time)) return false;
  return Date.now() < time;
}

function isStudentOpenBlocked(setOrId, type = '') {
  if (typeof Auth === 'undefined' || !Auth.isStudent()) return false;
  return isSetNotYetOpen(setOrId, type);
}

function getSetMaxAttempts(setOrId, type = '') {
  let id = '';
  let directLimit = 0;
  if (typeof setOrId === 'object' && setOrId !== null) {
    id = String(setOrId.id || '');
    if (setOrId.maxAttempts !== undefined && setOrId.maxAttempts !== null) {
      directLimit = parseInt(setOrId.maxAttempts, 10) || 0;
    }
  } else {
    id = String(setOrId || '');
  }

  const map = getSetAttemptLimitsMap();
  const mapLimit = map[id] !== undefined ? (parseInt(map[id], 10) || 0) : 0;
  return Math.max(0, directLimit || mapLimit || 0);
}

function getSetDeadline(setOrId, type = '') {
  let id = '';
  let directDeadline = '';
  if (typeof setOrId === 'object' && setOrId !== null) {
    id = String(setOrId.id || '');
    if (setOrId.deadline) directDeadline = String(setOrId.deadline).trim();
  } else {
    id = String(setOrId || '');
  }

  const map = getSetDeadlinesMap();
  const mapDeadline = map[id] ? String(map[id]).trim() : '';
  return directDeadline || mapDeadline || '';
}

function isSetDeadlineExpired(setOrId, type = '') {
  const dl = getSetDeadline(setOrId, type);
  if (!dl) return false;
  const time = new Date(dl).getTime();
  if (isNaN(time)) return false;
  return Date.now() > time;
}

function isStudentDeadlineBlocked(setOrId, type = '') {
  if (typeof Auth === 'undefined' || !Auth.isStudent()) return false;
  return isSetDeadlineExpired(setOrId, type);
}

function getStudentAttemptCount(setId) {
  if (typeof Auth === 'undefined') return 0;
  const user = Auth.getCurrentUser();
  if (!user || user.role === 'teacher' || user.role === 'admin') return 0;

  const list = (typeof getAllRawQuizHistory === 'function') ? getAllRawQuizHistory() : [];
  const targetIdStr = String(setId);
  return list.filter(item => {
    if (!item || String(item.setId) !== targetIdStr) return false;

    // 1. So khớp ID người dùng Supabase
    if (item.userId && user.id && String(item.userId) === String(user.id)) return true;

    // 2. So khớp username
    if (item.username && user.username && String(item.username).toLowerCase() === String(user.username).toLowerCase()) return true;

    // 3. So khớp họ tên hoặc tên người làm
    const pName = String(item.playerName || '').trim().toLowerCase();
    const fName = String(user.full_name || '').trim().toLowerCase();
    const uName = String(user.username || '').trim().toLowerCase();
    if (pName && (pName === fName || pName === uName)) return true;

    return false;
  }).length;
}

function isStudentAttemptExceeded(setOrId, type = '') {
  if (typeof Auth === 'undefined' || !Auth.isStudent()) return false;
  const maxAttempts = getSetMaxAttempts(setOrId, type);
  if (!maxAttempts || maxAttempts <= 0) return false;
  const id = typeof setOrId === 'object' && setOrId !== null ? setOrId.id : setOrId;
  const count = getStudentAttemptCount(id);
  return count >= maxAttempts;
}

function isStudentEntryBlocked(setOrId, type = '') {
  if (typeof Auth === 'undefined' || !Auth.isStudent()) return false;
  return isStudentPrivacyBlocked(setOrId, type) || isStudentOpenBlocked(setOrId, type) || isStudentDeadlineBlocked(setOrId, type) || isStudentAttemptExceeded(setOrId, type);
}

function getStudentBlockInfo(setOrId, type = '') {
  if (typeof Auth === 'undefined' || !Auth.isStudent()) {
    return { blocked: false, isPrivate: false, isNotYetOpen: false, isDeadlineExpired: false, isAttemptExceeded: false, count: 0, maxAttempts: 0, hasSubmissions: false, openAt: '', deadline: '', message: '' };
  }
  const id = typeof setOrId === 'object' && setOrId !== null ? setOrId.id : setOrId;
  const isPrivate = isStudentPrivacyBlocked(setOrId, type);
  const isNotYetOpen = isStudentOpenBlocked(setOrId, type);
  const isDeadlineExpired = isStudentDeadlineBlocked(setOrId, type);
  const isAttemptExceeded = isStudentAttemptExceeded(setOrId, type);
  const count = getStudentAttemptCount(id);
  const maxAttempts = getSetMaxAttempts(setOrId, type);
  const openAt = getSetOpenAt(setOrId, type);
  const deadline = getSetDeadline(setOrId, type);
  const hasSubmissions = count > 0;
  const blocked = isPrivate || isNotYetOpen || isDeadlineExpired || isAttemptExceeded;

  let message = '';
  if (isPrivate) {
    message = 'Bộ đề này đang ở chế độ Riêng tư (ẩn), chỉ dành cho Giáo viên. Học sinh chưa thể vào làm!';
  } else if (isNotYetOpen) {
    message = `Bộ đề này chưa đến thời gian mở! Bài làm sẽ chính thức mở vào lúc: ${formatDeadlineDisplay(openAt)}. Vui lòng quay lại sau!`;
  } else if (isDeadlineExpired && isAttemptExceeded) {
    message = `Hạn nộp bài đã kết thúc và bạn cũng đã dùng hết số lượt làm bài (${count}/${maxAttempts} lượt). Bạn chỉ có quyền xem lại kết quả đã nộp!`;
  } else if (isDeadlineExpired) {
    message = `Thời hạn nộp bài đã kết thúc (${formatDeadlineDisplay(deadline)}). Bạn không thể vào làm bài mới!`;
  } else if (isAttemptExceeded) {
    message = `Bạn đã hoàn thành đủ số lượt làm bài cho phép (${count}/${maxAttempts} lượt). Bạn chỉ có quyền xem lại kết quả đã nộp!`;
  }

  return { blocked, isPrivate, isNotYetOpen, isDeadlineExpired, isAttemptExceeded, count, maxAttempts, hasSubmissions, openAt, deadline, message };
}

function formatDeadlineDisplay(dlStr) {
  if (!dlStr) return '';
  try {
    const d = new Date(dlStr);
    if (isNaN(d.getTime())) return dlStr;
    const pad = n => String(n).padStart(2, '0');
    const timeStr = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
    const dateStr = `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;

    const now = new Date();
    const isToday = now.toDateString() === d.toDateString();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const isTomorrow = tomorrow.toDateString() === d.toDateString();

    if (isToday) return `${timeStr} Hôm nay`;
    if (isTomorrow) return `${timeStr} Ngày mai`;
    return `${timeStr} ${dateStr}`;
  } catch (e) {
    return dlStr;
  }
}

function updateSetAttemptLimit(type, setId, limit, deadline, privacy, openAt) {
  if (typeof Auth !== 'undefined' && !Auth.isTeacher() && !Auth.isAdmin()) {
    toast('Chỉ tài khoản Giáo viên và Quản trị viên mới có quyền đổi cài đặt bộ đề!', 'bad');
    return false;
  }

  const numLimit = Math.max(0, parseInt(limit, 10) || 0);
  const targetIdStr = String(setId);
  const deadlineStr = (deadline !== undefined && deadline !== null) ? String(deadline).trim() : '';
  const privacyStr = (privacy === 'private' ? 'private' : 'public');
  const openAtStr = (openAt !== undefined && openAt !== null) ? String(openAt).trim() : '';

  // 1. Lưu vào map lượt làm
  const map = getSetAttemptLimitsMap();
  map[targetIdStr] = numLimit;
  saveSetAttemptLimitsMap(map);

  // 2. Lưu vào map hạn nộp
  const dMap = getSetDeadlinesMap();
  if (deadlineStr) {
    dMap[targetIdStr] = deadlineStr;
  } else {
    delete dMap[targetIdStr];
  }
  saveSetDeadlinesMap(dMap);

  // 3. Lưu vào map chế độ riêng tư
  const pMap = getSetPrivacyMap();
  if (privacyStr === 'private') {
    pMap[targetIdStr] = 'private';
  } else {
    delete pMap[targetIdStr];
  }
  saveSetPrivacyMap(pMap);

  // 4. Lưu vào map ngày mở đề
  const oMap = getSetOpenAtMap();
  if (openAtStr) {
    oMap[targetIdStr] = openAtStr;
  } else {
    delete oMap[targetIdStr];
  }
  saveSetOpenAtMap(oMap);

  // 5. Cập nhật đối tượng bộ đề tương ứng trong bộ nhớ
  if (type === 'quiz' || type === 'lessons' || type === 'set') {
    if (typeof sets !== 'undefined' && Array.isArray(sets)) {
      const target = sets.find(s => String(s.id) === targetIdStr);
      if (target) {
        target.maxAttempts = numLimit;
        target.deadline = deadlineStr;
        target.privacy = privacyStr;
        target.openAt = openAtStr;
        if (typeof save === 'function') save();
      }
    }
  } else if (type === 'reading') {
    if (typeof readingSets !== 'undefined' && Array.isArray(readingSets)) {
      const target = readingSets.find(s => String(s.id) === targetIdStr);
      if (target) {
        target.maxAttempts = numLimit;
        target.deadline = deadlineStr;
        target.privacy = privacyStr;
        target.status = (privacyStr === 'private' ? 'draft' : 'published');
        target.openAt = openAtStr;
        if (typeof saveReadingData === 'function') saveReadingData();
      }
    }
  } else if (type === 'writing') {
    if (typeof writingSets !== 'undefined' && Array.isArray(writingSets)) {
      const target = writingSets.find(s => String(s.id) === targetIdStr);
      if (target) {
        target.maxAttempts = numLimit;
        target.deadline = deadlineStr;
        target.privacy = privacyStr;
        target.openAt = openAtStr;
        if (typeof saveWritingSets === 'function') saveWritingSets();
      }
    }
  }

  // 6. Render lại các danh sách đang hiển thị
  if (typeof renderLibLessonsPane === 'function') renderLibLessonsPane();
  if (typeof renderLibReadingPane === 'function') renderLibReadingPane();
  if (typeof renderLibWritingPane === 'function') renderLibWritingPane();
  if (typeof renderReadingSetsGrid === 'function') renderReadingSetsGrid();
  if (typeof renderWritingSetsGrid === 'function') renderWritingSetsGrid();
  if (typeof renderSetupSetsGrid === 'function') renderSetupSetsGrid();
  if (typeof renderHomeSets === 'function') renderHomeSets();

  const details = [];
  details.push(privacyStr === 'private' ? 'Chế độ: 🔒 Riêng tư' : 'Chế độ: 🌐 Công khai');
  if (openAtStr) details.push(`Mở lúc: ${formatDeadlineDisplay(openAtStr)}`);
  details.push(numLimit > 0 ? `Lượt: tối đa ${numLimit} lần` : 'Lượt: không giới hạn');
  if (deadlineStr) details.push(`Hạn nộp: ${formatDeadlineDisplay(deadlineStr)}`);
  toast(`Đã cập nhật cài đặt thành công! (${details.join(' • ')})`, 'ok');
  return true;
}

function openSetAttemptLimitModal(type, setId) {
  if (typeof Auth !== 'undefined' && !Auth.isTeacher() && !Auth.isAdmin()) {
    toast('Chỉ Giáo viên và Quản trị viên mới có quyền cài đặt lượt làm, thời gian mở và hạn nộp!', 'bad');
    return;
  }
  const dialog = document.getElementById('set-attempt-limit-dialog');
  if (!dialog) return;

  let title = 'Bộ đề';
  let typeLabel = 'Trắc nghiệm / Bài học';
  let maxAttempts = 0;
  let deadline = '';
  let privacy = 'public';
  let openAt = '';

  if (type === 'quiz' || type === 'lessons' || type === 'set') {
    type = 'quiz';
    typeLabel = '📚 BÀI HỌC / TRẮC NGHIỆM';
    const s = (typeof sets !== 'undefined' && Array.isArray(sets)) ? sets.find(x => String(x.id) === String(setId)) : null;
    if (s) {
      title = s.title;
      maxAttempts = getSetMaxAttempts(s, 'quiz');
      deadline = getSetDeadline(s, 'quiz');
      privacy = getSetPrivacy(s, 'quiz');
      openAt = getSetOpenAt(s, 'quiz');
    }
  } else if (type === 'reading') {
    typeLabel = '📑 ĐỀ ĐỌC HIỂU';
    const s = (typeof readingSets !== 'undefined' && Array.isArray(readingSets)) ? readingSets.find(x => String(x.id) === String(setId)) : null;
    if (s) {
      title = s.title;
      maxAttempts = getSetMaxAttempts(s, 'reading');
      deadline = getSetDeadline(s, 'reading');
      privacy = getSetPrivacy(s, 'reading');
      openAt = getSetOpenAt(s, 'reading');
    }
  } else if (type === 'writing') {
    typeLabel = '✍️ ĐỀ LUYỆN VIẾT VĂN';
    const s = (typeof writingSets !== 'undefined' && Array.isArray(writingSets)) ? writingSets.find(x => String(x.id) === String(setId)) : null;
    if (s) {
      title = s.title;
      maxAttempts = getSetMaxAttempts(s, 'writing');
      deadline = getSetDeadline(s, 'writing');
      privacy = getSetPrivacy(s, 'writing');
      openAt = getSetOpenAt(s, 'writing');
    }
  }

  const typeInp = document.getElementById('limit-modal-target-type');
  if (typeInp) typeInp.value = type;
  const idInp = document.getElementById('limit-modal-target-id');
  if (idInp) idInp.value = setId;
  const badgeEl = document.getElementById('limit-modal-type-badge');
  if (badgeEl) badgeEl.textContent = typeLabel;
  const titleEl = document.getElementById('limit-modal-title');
  if (titleEl) titleEl.textContent = title;

  // Privacy Select
  const privacyInp = document.getElementById('limit-modal-privacy');
  if (privacyInp) {
    privacyInp.value = (privacy === 'private' ? 'private' : 'public');
  }

  // OpenAt Input
  const openAtInp = document.getElementById('limit-modal-open-at');
  if (openAtInp) {
    openAtInp.value = openAt || '';
    onLimitModalOpenAtChange(openAtInp.value);
  }

  // Attempts Input
  const inp = document.getElementById('limit-modal-input');
  if (inp) {
    inp.value = maxAttempts || 0;
    onLimitModalInputChange(inp.value);
  }

  // Deadline Input
  const deadlineInp = document.getElementById('limit-modal-deadline');
  if (deadlineInp) {
    deadlineInp.value = deadline || '';
    onLimitModalDeadlineChange(deadlineInp.value);
  }

  dialog.showModal();
}

function closeSetAttemptLimitModal() {
  const dialog = document.getElementById('set-attempt-limit-dialog');
  if (dialog && dialog.open) dialog.close();
}

function setLimitModalPreset(val) {
  const inp = document.getElementById('limit-modal-input');
  if (inp) {
    inp.value = val;
    onLimitModalInputChange(val);
  }
}

function onLimitModalInputChange(val) {
  const num = parseInt(val, 10) || 0;
  const explain = document.getElementById('limit-modal-explain');
  if (explain) {
    explain.textContent = num <= 0 ? 'Không giới hạn' : `Tối đa ${num} lượt`;
    explain.className = 'set-cfg-status ' + (num <= 0 ? 'status-gray' : 'status-blue');
  }
}

function toLocalDateTimeString(d) {
  const pad = n => String(n).padStart(2, '0');
  const Y = d.getFullYear();
  const M = pad(d.getMonth() + 1);
  const D = pad(d.getDate());
  const h = pad(d.getHours());
  const m = pad(d.getMinutes());
  return `${Y}-${M}-${D}T${h}:${m}`;
}

function setLimitModalOpenAtPreset(preset) {
  const inp = document.getElementById('limit-modal-open-at');
  if (!inp) return;

  if (preset === 'none') {
    inp.value = '';
    onLimitModalOpenAtChange('');
    return;
  }

  const now = new Date();
  let targetDate = null;
  if (preset === 'now') {
    targetDate = new Date(now.getTime() - 60000); // 1 minute ago
  } else if (preset === 'tomorrow-8am') {
    targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 8, 0, 0);
  } else if (preset === 'tomorrow-14pm') {
    targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 14, 0, 0);
  } else if (preset === 'monday-8am') {
    const daysUntilMonday = ((1 + 7 - now.getDay()) % 7) || 7;
    targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilMonday, 8, 0, 0);
  }

  if (targetDate) {
    inp.value = toLocalDateTimeString(targetDate);
    onLimitModalOpenAtChange(inp.value);
  }
}

function onLimitModalOpenAtChange(val) {
  const statusEl = document.getElementById('limit-modal-open-at-status');
  if (!statusEl) return;
  statusEl.style.color = '';
  if (!val) {
    statusEl.textContent = '🟢 Mở ngay';
    statusEl.className = 'set-cfg-status status-green';
    return;
  }
  const time = new Date(val).getTime();
  if (isNaN(time)) {
    statusEl.textContent = 'Ngày không hợp lệ';
    statusEl.className = 'set-cfg-status status-red';
    return;
  }
  const isNotYet = Date.now() < time;
  if (isNotYet) {
    statusEl.textContent = '⏳ Mở lúc: ' + formatDeadlineDisplay(val);
    statusEl.className = 'set-cfg-status status-blue';
  } else {
    statusEl.textContent = '🟢 Đã mở: ' + formatDeadlineDisplay(val);
    statusEl.className = 'set-cfg-status status-green';
  }
}

function setLimitModalDeadlinePreset(preset) {
  const inp = document.getElementById('limit-modal-deadline');
  if (!inp) return;

  if (preset === 'none') {
    inp.value = '';
    onLimitModalDeadlineChange('');
    return;
  }

  const now = new Date();
  let targetDate = null;
  if (preset === 'tonight') {
    targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 0);
  } else if (preset === 'tomorrow') {
    targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 23, 59, 0);
  } else if (preset === '3days') {
    targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 23, 59, 0);
  } else if (preset === '7days') {
    targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 23, 59, 0);
  }

  if (targetDate) {
    inp.value = toLocalDateTimeString(targetDate);
    onLimitModalDeadlineChange(inp.value);
  }
}

function onLimitModalDeadlineChange(val) {
  const statusEl = document.getElementById('limit-modal-deadline-status');
  if (!statusEl) return;
  statusEl.style.color = '';
  if (!val) {
    statusEl.textContent = 'Không đặt hạn';
    statusEl.className = 'set-cfg-status status-gray';
    return;
  }
  const time = new Date(val).getTime();
  if (isNaN(time)) {
    statusEl.textContent = 'Ngày không hợp lệ';
    statusEl.className = 'set-cfg-status status-red';
    return;
  }
  const isExpired = Date.now() > time;
  if (isExpired) {
    statusEl.textContent = '⚠️ Quá hạn: ' + formatDeadlineDisplay(val);
    statusEl.className = 'set-cfg-status status-red';
  } else {
    statusEl.textContent = '🟢 Hạn: ' + formatDeadlineDisplay(val);
    statusEl.className = 'set-cfg-status status-green';
  }
}

function submitSetAttemptLimit() {
  const type = document.getElementById('limit-modal-target-type')?.value;
  const id = document.getElementById('limit-modal-target-id')?.value;
  const inp = document.getElementById('limit-modal-input');
  const limit = parseInt(inp ? inp.value : 0, 10) || 0;
  const deadlineInp = document.getElementById('limit-modal-deadline');
  const deadline = (deadlineInp ? deadlineInp.value : '').trim();
  const privacyInp = document.getElementById('limit-modal-privacy');
  const privacy = (privacyInp ? privacyInp.value : 'public').trim();
  const openAtInp = document.getElementById('limit-modal-open-at');
  const openAt = (openAtInp ? openAtInp.value : '').trim();

  if (type && id) {
    updateSetAttemptLimit(type, id, limit, deadline, privacy, openAt);
  }
  closeSetAttemptLimitModal();
}

function getSetPrivacyBadgeHtml(s, type = 'quiz') {
  if (!s) return '';
  const isTeacherOrAdmin = (typeof Auth !== 'undefined' && (Auth.isTeacher() || Auth.isAdmin()));
  if (!isTeacherOrAdmin) return '';

  const isPriv = isSetPrivate(s, type);
  if (isPriv) {
    return `<button type="button" class="lib-pill pill-privacy-private" onclick="event.stopPropagation(); openSetAttemptLimitModal('${type}', '${esc(s.id)}')" title="Chế độ Riêng tư (Học sinh bị ẩn). Nhấp để đổi sang Công khai"><ion-icon name="lock-closed-outline"></ion-icon> Riêng tư</button>`;
  }
  return '';
}

function getSetOpenAtBadgeHtml(s, type = 'quiz') {
  if (!s) return '';
  const openAt = getSetOpenAt(s, type);
  if (!openAt) return '';

  const isTeacherOrAdmin = (typeof Auth !== 'undefined' && (Auth.isTeacher() || Auth.isAdmin()));
  const isStudent = (typeof Auth !== 'undefined' && Auth.isStudent());
  const notYetOpen = isSetNotYetOpen(s, type);

  if (isTeacherOrAdmin) {
    return `<button type="button" class="lib-pill pill-teacher-open-at" onclick="event.stopPropagation(); openSetAttemptLimitModal('${type}', '${esc(s.id)}')" title="Lịch mở bài làm: ${formatDeadlineDisplay(openAt)}. Nhấp để đổi"><ion-icon name="time-outline"></ion-icon> Mở: ${formatDeadlineDisplay(openAt)}</button>`;
  }

  if (isStudent && notYetOpen) {
    return `<span class="lib-pill pill-open-at-pending" title="Bộ đề sẽ mở vào lúc ${formatDeadlineDisplay(openAt)}"><ion-icon name="hourglass-outline"></ion-icon> Mở: ${formatDeadlineDisplay(openAt)}</span>`;
  }

  return '';
}

function getSetAttemptBadgeHtml(s, type = 'quiz') {
  if (!s) return '';
  const isTeacherOrAdmin = (typeof Auth !== 'undefined' && (Auth.isTeacher() || Auth.isAdmin()));
  const isStudent = (typeof Auth !== 'undefined' && Auth.isStudent());
  const maxAttempts = getSetMaxAttempts(s, type);

  if (isTeacherOrAdmin) {
    if (maxAttempts > 0) {
      return `<button type="button" class="lib-pill pill-teacher-limit" onclick="event.stopPropagation(); openSetAttemptLimitModal('${type}', '${esc(s.id)}')" title="Nhấp để sửa giới hạn số lượt & hạn nộp bài"><ion-icon name="timer-outline"></ion-icon> Giới hạn: ${maxAttempts} lượt</button>`;
    }
    return '';
  }

  if (isStudent && maxAttempts > 0) {
    const count = getStudentAttemptCount(s.id);
    if (count >= maxAttempts) {
      return `<span class="lib-pill pill-attempt-exhausted" title="Bạn đã hoàn thành đủ số lượt cho phép (${count}/${maxAttempts}). Chỉ được xem lại bài đã nộp!"><ion-icon name="lock-closed-outline"></ion-icon> Đã hết lượt (${count}/${maxAttempts})</span>`;
    } else {
      return `<span class="lib-pill pill-attempt-active" title="Số lượt làm bài của bạn"><ion-icon name="hourglass-outline"></ion-icon> Đã làm: ${count}/${maxAttempts} lượt</span>`;
    }
  }

  return '';
}

function getSetDeadlineBadgeHtml(s, type = 'quiz') {
  if (!s) return '';
  const dl = getSetDeadline(s, type);
  const isTeacherOrAdmin = (typeof Auth !== 'undefined' && (Auth.isTeacher() || Auth.isAdmin()));
  const isStudent = (typeof Auth !== 'undefined' && Auth.isStudent());

  if (isTeacherOrAdmin) {
    if (dl) {
      const isExpired = isSetDeadlineExpired(s, type);
      return `<button type="button" class="lib-pill pill-teacher-deadline" onclick="event.stopPropagation(); openSetAttemptLimitModal('${type}', '${esc(s.id)}')" title="Hạn nộp: ${formatDeadlineDisplay(dl)}. Nhấp để đổi hoặc xóa."><ion-icon name="calendar-outline"></ion-icon> Hạn: ${formatDeadlineDisplay(dl)}${isExpired ? ' (Hết hạn)' : ''}</button>`;
    }
    return '';
  }

  if (isStudent && dl) {
    const isExpired = isSetDeadlineExpired(s, type);
    if (isExpired) {
      return `<span class="lib-pill pill-deadline-expired" title="Thời hạn nộp bài đã kết thúc vào ${formatDeadlineDisplay(dl)}"><ion-icon name="alarm-outline"></ion-icon> Hết hạn: ${formatDeadlineDisplay(dl)}</span>`;
    } else {
      return `<span class="lib-pill pill-deadline-active" title="Hạn chót nộp bài: ${formatDeadlineDisplay(dl)}"><ion-icon name="time-outline"></ion-icon> Hạn: ${formatDeadlineDisplay(dl)}</span>`;
    }
  }

  return '';
}

/* =========================================================================
   EXIT EXAM SESSION CONFIRMATION & FORCED SUBMIT HANDLERS
   ========================================================================= */
let pendingExitSessionType = null;

function confirmExitCurrentSession(type = 'quiz') {
  pendingExitSessionType = type;
  const dialog = document.getElementById('exit-exam-confirm-dialog');
  if (dialog) {
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  }
}

function closeExitConfirmModal() {
  const dialog = document.getElementById('exit-exam-confirm-dialog');
  if (dialog) {
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
  }
  pendingExitSessionType = null;
}

function executeExitSessionSubmit() {
  const type = pendingExitSessionType || 'quiz';
  closeExitConfirmModal();

  if (type === 'quiz') {
    if (typeof forceSubmitAndExitQuiz === 'function') {
      forceSubmitAndExitQuiz();
    } else if (typeof end === 'function') {
      end();
    }
  } else if (type === 'reading') {
    if (typeof submitReadingAnswers === 'function') {
      toast('Đang nộp bài đọc hiểu và kết thúc lượt làm...', 'ok');
      submitReadingAnswers();
    }
  } else if (type === 'writing') {
    if (typeof submitWritingEssay === 'function') {
      toast('Đang nộp bài luyện viết và kết thúc lượt làm...', 'ok');
      submitWritingEssay();
    }
  }
}

window.confirmExitCurrentSession = confirmExitCurrentSession;
window.closeExitConfirmModal = closeExitConfirmModal;
window.executeExitSessionSubmit = executeExitSessionSubmit;

window.getSetAttemptLimitsMap = getSetAttemptLimitsMap;
window.saveSetAttemptLimitsMap = saveSetAttemptLimitsMap;
window.getSetDeadlinesMap = getSetDeadlinesMap;
window.saveSetDeadlinesMap = saveSetDeadlinesMap;
window.getSetPrivacyMap = getSetPrivacyMap;
window.saveSetPrivacyMap = saveSetPrivacyMap;
window.getSetOpenAtMap = getSetOpenAtMap;
window.saveSetOpenAtMap = saveSetOpenAtMap;
window.getSetPrivacy = getSetPrivacy;
window.isSetPrivate = isSetPrivate;
window.isStudentPrivacyBlocked = isStudentPrivacyBlocked;
window.getSetOpenAt = getSetOpenAt;
window.isSetNotYetOpen = isSetNotYetOpen;
window.isStudentOpenBlocked = isStudentOpenBlocked;
window.getSetMaxAttempts = getSetMaxAttempts;
window.getSetDeadline = getSetDeadline;
window.isSetDeadlineExpired = isSetDeadlineExpired;
window.isStudentDeadlineBlocked = isStudentDeadlineBlocked;
window.getStudentAttemptCount = getStudentAttemptCount;
window.isStudentAttemptExceeded = isStudentAttemptExceeded;
window.isStudentEntryBlocked = isStudentEntryBlocked;
window.getStudentBlockInfo = getStudentBlockInfo;
window.formatDeadlineDisplay = formatDeadlineDisplay;
window.updateSetAttemptLimit = updateSetAttemptLimit;
window.openSetAttemptLimitModal = openSetAttemptLimitModal;
window.closeSetAttemptLimitModal = closeSetAttemptLimitModal;
window.setLimitModalPreset = setLimitModalPreset;
window.onLimitModalInputChange = onLimitModalInputChange;
window.setLimitModalOpenAtPreset = setLimitModalOpenAtPreset;
window.onLimitModalOpenAtChange = onLimitModalOpenAtChange;
window.setLimitModalDeadlinePreset = setLimitModalDeadlinePreset;
window.onLimitModalDeadlineChange = onLimitModalDeadlineChange;
window.submitSetAttemptLimit = submitSetAttemptLimit;
window.getSetPrivacyBadgeHtml = getSetPrivacyBadgeHtml;
window.getSetOpenAtBadgeHtml = getSetOpenAtBadgeHtml;
window.getSetAttemptBadgeHtml = getSetAttemptBadgeHtml;
window.getSetDeadlineBadgeHtml = getSetDeadlineBadgeHtml;

function getQuizHistory(forceAll = false) {
  return getAllRawQuizHistory();
}

function mapSupabaseRowToHistory(row) {
  const d = new Date(row.created_at || Date.now());
  const details = Array.isArray(row.details) ? row.details : [];
  const hasGradedDetail = details.some(x => x && (x.isGraded || x.gradeStatus || (x.points !== undefined && x.points > 0)));
  const isGraded = Boolean(row.is_graded || hasGradedDetail);
  const teacherFeedback = row.teacher_feedback || (details.find(x => x && x.generalTeacherFeedback)?.generalTeacherFeedback || '');

  return {
    id: String(row.id),
    userId: row.user_id || '',
    timestamp: d.getTime(),
    dateStr: d.toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }),
    type: row.type || 'quiz',
    playerName: row.player_name || 'Học sinh',
    className: row.class_name || '',
    setId: row.set_id || '',
    setTitle: row.set_title || 'Bài làm',
    setTopic: row.set_topic || '',
    setEmo: row.set_emo || (row.type === 'writing' ? '✍️' : (row.type === 'reading' ? '📑' : '📖')),
    score: parseFloat(row.score) || 0,
    correctCount: Number(row.correct_count) || 0,
    wrongCount: Number(row.wrong_count) || 0,
    savedShortCount: Number(row.saved_short_count) || 0,
    answeredCount: Number(row.saved_short_count) || 0,
    totalWords: Number(row.saved_short_count) || (details.reduce((acc, d) => acc + (d.words || (d.userAnswer ? d.userAnswer.trim().split(/\s+/).filter(Boolean).length : 0)), 0)),
    totalQuestions: Number(row.total_questions) || 0,
    accuracy: Number(row.accuracy) || 0,
    elapsedSeconds: Number(row.elapsed_seconds) || 0,
    details: details,
    isGraded: isGraded,
    teacherFeedback: teacherFeedback,
    teacherName: row.teacher_name || '',
    gradedAt: row.graded_at ? new Date(row.graded_at).getTime() : (isGraded ? d.getTime() : 0),
    gradedDateStr: row.graded_at ? new Date(row.graded_at).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }) : ''
  };
}

// Xử lý xung đột giữa dữ liệu máy chủ và dữ liệu cục bộ đã được chấm điểm
function mergeHistoryItem(localItem, cloudItem) {
  if (!cloudItem) return localItem;
  if (!localItem) return cloudItem;

  // Nếu bản cục bộ đã được giáo viên chấm nhưng trên đám mây chưa được chấm -> Giữ bản cục bộ và đồng bộ lên đám mây
  if (localItem.isGraded && !cloudItem.isGraded) {
    saveQuizAttemptToSupabase(localItem);
    return localItem;
  }
  // Nếu trên đám mây đã được chấm mà cục bộ chưa -> Giữ bản đám mây
  if (cloudItem.isGraded && !localItem.isGraded) {
    return cloudItem;
  }
  // Nếu cả hai đều đã được chấm điểm -> Chọn bản có thời gian chấm (gradedAt) mới hơn
  if (localItem.isGraded && cloudItem.isGraded) {
    const localGraded = localItem.gradedAt || localItem.timestamp || 0;
    const cloudGraded = cloudItem.gradedAt || cloudItem.timestamp || 0;
    if (localGraded >= cloudGraded) {
      if (localGraded > cloudGraded) saveQuizAttemptToSupabase(localItem);
      return localItem;
    }
    return cloudItem;
  }
  // Nếu cả hai chưa được chấm điểm -> Giữ bản mới hơn
  const localTime = localItem.timestamp || 0;
  const cloudTime = cloudItem.timestamp || 0;
  return localTime >= cloudTime ? localItem : cloudItem;
}

async function saveQuizAttemptToSupabase(entry) {
  if (!isSupabaseConfigured()) return false;
  try {
    let playerName = String(entry.playerName || '').trim();
    let className = String(entry.className || '').trim();
    if (!playerName) playerName = 'Học sinh';

    const userId = String(entry.userId || (typeof Auth !== 'undefined' && Auth.getCurrentUser() ? Auth.getCurrentUser().id : '') || localStorage.getItem('vq_user_id') || '').trim();
    const table = appConfig.supabase.historyTable || 'quiz_submissions';
    const baseUrl = `${appConfig.supabase.url.replace(/\/$/, '')}/rest/v1/${table}`;

    const scoreNum = Math.round((parseFloat(entry.score) || 0) * 100) / 100;
    const isGraded = Boolean(entry.isGraded);
    const teacherFeedback = String(entry.teacherFeedback || '').trim();
    const teacherName = String(entry.teacherName || '').trim();
    const gradedAtIso = entry.gradedAt 
      ? new Date(entry.gradedAt).toISOString() 
      : (isGraded ? new Date().toISOString() : null);

    const details = Array.isArray(entry.details) ? entry.details : [];

    // Nếu bài làm này đã được chấm điểm, thử cập nhật nhanh bằng PATCH trước
    if (isGraded) {
      try {
        const patchRes = await fetch(`${baseUrl}?id=eq.${encodeURIComponent(entry.id)}`, {
          method: 'PATCH',
          headers: getSupabaseRequestHeaders({ 'Prefer': 'return=minimal' }),
          body: JSON.stringify({
            score: scoreNum,
            details: details,
            is_graded: true,
            teacher_feedback: teacherFeedback,
            teacher_name: teacherName,
            graded_at: gradedAtIso
          })
        });

        if (patchRes.ok) {
          return true;
        }
      } catch (patchErr) {
        console.warn('Supabase history PATCH note:', patchErr);
      }
    }

    // Nếu không hoặc chưa có trên máy chủ, thực hiện POST upsert đầy đủ
    const row = {
      id: String(entry.id),
      user_id: userId,
      type: entry.type || 'quiz',
      player_name: playerName.slice(0, 50),
      class_name: className.slice(0, 30),
      set_id: String(entry.setId || 'set_default'),
      set_title: String(entry.setTitle || 'Bài làm').slice(0, 100),
      set_topic: String(entry.setTopic || '').slice(0, 100),
      set_emo: String(entry.setEmo || '📖').slice(0, 10),
      score: scoreNum,
      correct_count: Math.max(0, Number(entry.correctCount) || 0),
      wrong_count: Math.max(0, Number(entry.wrongCount) || 0),
      saved_short_count: Math.max(0, Number(entry.savedShortCount || entry.answeredCount) || 0),
      total_questions: Math.max(0, Number(entry.totalQuestions) || 0),
      accuracy: Math.min(100, Math.max(0, Number(entry.accuracy) || 0)),
      elapsed_seconds: Math.max(0, Number(entry.elapsedSeconds) || 0),
      details: details,
      created_at: new Date(entry.timestamp || Date.now()).toISOString(),
      is_graded: isGraded,
      teacher_feedback: teacherFeedback,
      teacher_name: teacherName,
      graded_at: gradedAtIso
    };

    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: getSupabaseRequestHeaders({ 'Prefer': 'resolution=merge-duplicates' }),
      body: JSON.stringify(row)
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn('Supabase history save note:', res.status, errText);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase history sync error:', err);
    return false;
  }
}

async function loadQuizHistoryFromSupabase(forceNotice) {
  if (!isSupabaseConfigured() || isSyncingQuizHistory) return;

  const indicator = document.getElementById('history-sync-indicator');
  const pageBadge = document.getElementById('history-sync-badge-page');
  const setIndicatorText = (txt, cls) => {
    if (indicator) indicator.textContent = txt;
    if (pageBadge) {
      pageBadge.textContent = txt;
      pageBadge.className = 'sync-badge ' + (cls || '');
    }
  };
  setIndicatorText('☁️ Đang đồng bộ...');
  isSyncingQuizHistory = true;

  try {
    const table = appConfig.supabase.historyTable || 'quiz_submissions';
    let queryParams = 'select=*&order=created_at.desc&limit=100';
    if (typeof Auth !== 'undefined') {
      const u = Auth.getCurrentUser();
      if (u && u.role === 'student') {
        const studentName = u.full_name || u.username;
        queryParams = `select=*&or=(user_id.eq.${encodeURIComponent(u.id)},username.eq.${encodeURIComponent(u.username)},player_name.eq.${encodeURIComponent(studentName)})&order=created_at.desc&limit=100`;
      }
    }
    const url = `${appConfig.supabase.url.replace(/\/$/, '')}/rest/v1/${table}?${queryParams}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: getSupabaseRequestHeaders()
    });

    if (res.ok) {
      const rows = await res.json();
      if (Array.isArray(rows)) {
        const cloudEntries = rows.map(mapSupabaseRowToHistory);
        const localList = getAllRawQuizHistory();
        const mergedMap = new Map();
        const localMap = new Map(localList.map(item => [String(item.id), item]));

        // Hợp nhất dữ liệu thông minh không làm mất kết quả chấm cục bộ
        cloudEntries.forEach(cloudItem => {
          const id = String(cloudItem.id);
          const localItem = localMap.get(id);
          mergedMap.set(id, mergeHistoryItem(localItem, cloudItem));
        });
        localList.forEach(item => {
          if (!mergedMap.has(String(item.id))) {
            mergedMap.set(String(item.id), item);
          }
        });

        const mergedList = Array.from(mergedMap.values())
          .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
          .slice(0, 100);

        localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(mergedList));
        renderHistoryList();
        if (typeof renderHistoryPage === 'function') renderHistoryPage();
        setIndicatorText('☁️ Đã đồng bộ Database', 'saved');
        if (forceNotice) toast('Đã đồng bộ lịch sử bài làm từ máy chủ!', 'ok');
      } else {
        setIndicatorText('☁️ Đã kết nối Database', 'saved');
      }
    } else {
      setIndicatorText('💾 Lưu trên máy', '');
    }
  } catch (err) {
    console.warn('Load history from Supabase failed:', err);
    setIndicatorText('💾 Lưu trên máy', '');
  } finally {
    isSyncingQuizHistory = false;
  }
}

function saveQuizAttemptToHistory(entry) {
  try {
    if (typeof Auth !== 'undefined') {
      const u = Auth.getCurrentUser();
      if (u) {
        if (!entry.userId) entry.userId = u.id;
        if (!entry.username) entry.username = u.username;
        if (!entry.userRole) entry.userRole = u.role;
        if (!entry.playerName || entry.playerName === 'Học sinh') {
          entry.playerName = u.full_name || u.username;
        }
        if (!entry.className && u.class_name) {
          entry.className = u.class_name;
        }
      }
    }
    if (window.__SECURITY_SHIELD && typeof window.__SECURITY_SHIELD.sign === 'function') {
      entry._secSig = window.__SECURITY_SHIELD.sign(entry);
    }
    const history = getAllRawQuizHistory();
    history.unshift(entry);
    if (history.length > 100) history.length = 100;
    localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(history));

    saveQuizAttemptToSupabase(entry);
    if (typeof onActivityCompletedGamification === 'function') {
      try { onActivityCompletedGamification(entry); } catch (_) {}
    }
    return true;
  } catch (e) {
    console.error('Failed to save quiz attempt to history:', e);
    return false;
  }
}

function deleteHistoryItem(id) {
  if (typeof Auth !== 'undefined' && !Auth.isTeacher()) {
    return toast('Chỉ tài khoản Giáo viên mới có quyền xóa lịch sử bài làm.', 'bad');
  }
  if (!confirm('Bạn có chắc chắn muốn xóa bản ghi lịch sử này?')) return;
  try {
    let history = getAllRawQuizHistory();
    history = history.filter(item => String(item.id) !== String(id));
    localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(history));
    renderHistoryList();
    if (typeof renderHistoryPage === 'function') renderHistoryPage();
    toast('Đã xóa lượt làm bài khỏi lịch sử.', 'ok');

    if (isSupabaseConfigured()) {
      const table = appConfig.supabase.historyTable || 'quiz_submissions';
      const url = `${appConfig.supabase.url.replace(/\/$/, '')}/rest/v1/${table}?id=eq.${encodeURIComponent(String(id))}`;
      fetch(url, {
        method: 'DELETE',
        headers: getSupabaseRequestHeaders()
      }).catch(e => console.warn('Supabase history delete failed:', e));
    }
  } catch (e) {
    console.error(e);
  }
}

function clearAllQuizHistory() {
  if (window.Auth && !window.Auth.isTeacher()) {
    return toast('Chỉ tài khoản Giáo viên mới có quyền xóa toàn bộ lịch sử bài làm.', 'bad');
  }
  const history = getQuizHistory();
  if (!history.length) return toast('Lịch sử hiện đang trống.', 'bad');
  if (!confirm(`Bạn có chắc muốn xóa toàn bộ ${history.length} lượt làm bài trong lịch sử trên máy này?`)) return;
  try {
    localStorage.removeItem(QUIZ_HISTORY_KEY);
    renderHistoryList();
    if (typeof renderHistoryPage === 'function') renderHistoryPage();
    toast('Đã xóa toàn bộ lịch sử bài làm trên máy này.', 'ok');
  } catch (e) {
    console.error(e);
  }
}

// =========================================================================
// DEDICATED HISTORY PAGE ROUTING & RENDERING (TRANG LỊCH SỬ RIÊNG BIỆT)
// =========================================================================

let currentHistoryTypeFilter = 'all'; // 'all' | 'quiz' | 'reading'
let historyPageSearchQuery = '';
let historyPageSetFilter = '';

R.history = (targetSetId) => {
  if (targetSetId) {
    historyPageSetFilter = String(targetSetId);
  }
  const searchInput = document.getElementById('history-page-search');
  if (searchInput && !targetSetId) {
    historyPageSearchQuery = searchInput.value.trim().toLowerCase();
  } else if (searchInput && targetSetId) {
    searchInput.value = '';
    historyPageSearchQuery = '';
  }

  updateHistoryPageSetDropdown();
  renderHistoryPage();

  if (isSupabaseConfigured()) {
    loadQuizHistoryFromSupabase(false);
  }
};

function setHistoryTypeFilter(type) {
  currentHistoryTypeFilter = type || 'all';
  document.querySelectorAll('#s-history .topic-chip').forEach(btn => {
    btn.classList.toggle('active', btn.id === `hist-chip-${type}`);
  });
  renderHistoryPage();
}

function onHistoryPageSearchInput() {
  const input = document.getElementById('history-page-search');
  historyPageSearchQuery = (input ? input.value : '').trim().toLowerCase();
  renderHistoryPage();
}

function onHistoryPageSetFilterChange() {
  const select = document.getElementById('history-page-set-filter');
  historyPageSetFilter = select ? select.value : '';
  renderHistoryPage();
}

function clearHistoryPageSetFilter() {
  historyPageSetFilter = '';
  historyPageSearchQuery = '';
  const searchInput = document.getElementById('history-page-search');
  if (searchInput) searchInput.value = '';
  const select = document.getElementById('history-page-set-filter');
  if (select) select.value = '';
  renderHistoryPage();
}

function updateHistoryPageSetDropdown() {
  const select = document.getElementById('history-page-set-filter');
  if (!select) return;
  const allHistory = getQuizHistory();
  const setMap = new Map();
  allHistory.forEach(item => {
    const sId = String(item.setId || '');
    if (sId && !setMap.has(sId)) {
      setMap.set(sId, { id: sId, title: item.setTitle || 'Bộ đề', emo: item.setEmo || '📖', count: 1 });
    } else if (sId && setMap.has(sId)) {
      setMap.get(sId).count++;
    }
  });

  const curVal = historyPageSetFilter || '';
  let html = `<option value="">📚 Tất cả bộ đề (${allHistory.length})</option>`;
  Array.from(setMap.values()).forEach(s => {
    const sel = s.id === curVal ? 'selected' : '';
    html += `<option value="${esc(s.id)}" ${sel}>${s.emo} ${esc(s.title)} (${s.count} lượt)</option>`;
  });
  select.innerHTML = html;
}

function renderHistoryPage() {
  const container = document.getElementById('history-page-list-container');
  if (!container) return;

  const allHistory = getQuizHistory();
  updateHistoryPageSetDropdown();

  // 1. Stats calculation
  const totalAttempts = allHistory.length;
  let totalAcc = 0;
  let accCount = 0;
  let totalSavedShort = 0;
  let totalSecs = 0;

  allHistory.forEach(h => {
    if (h.type === 'quiz' || !h.type) {
      if (h.accuracy !== undefined) {
        totalAcc += Number(h.accuracy) || 0;
        accCount++;
      }
      totalSavedShort += Number(h.savedShortCount) || 0;
      totalSecs += Number(h.elapsedSeconds) || 0;
    } else if (h.type === 'reading') {
      totalSavedShort += Number(h.answeredCount) || 0;
    } else if (h.type === 'writing') {
      totalSavedShort += Number(h.answeredCount || h.totalQuestions) || 0;
      totalSecs += Number(h.elapsedSeconds) || 0;
    }
  });

  const avgAcc = accCount ? Math.round(totalAcc / accCount) : 0;
  const totalMins = Math.round(totalSecs / 60);

  const statAttemptsEl = document.getElementById('stat-total-attempts');
  const statAvgAccEl = document.getElementById('stat-avg-accuracy');
  const statSavedShortEl = document.getElementById('stat-total-saved-short');
  const statTotalTimeEl = document.getElementById('stat-total-time');

  if (statAttemptsEl) statAttemptsEl.textContent = totalAttempts;
  if (statAvgAccEl) statAvgAccEl.textContent = `${avgAcc}%`;
  if (statSavedShortEl) statSavedShortEl.textContent = totalSavedShort;
  if (statTotalTimeEl) statTotalTimeEl.textContent = totalMins > 60 ? `${Math.floor(totalMins/60)}h ${totalMins%60}p` : `${totalMins}p`;

  const countAllEl = document.getElementById('hist-count-all');
  const countQuizEl = document.getElementById('hist-count-quiz');
  const countReadingEl = document.getElementById('hist-count-reading');
  const countWritingEl = document.getElementById('hist-count-writing');
  const countUngradedEl = document.getElementById('hist-count-ungraded');
  const countGradedEl = document.getElementById('hist-count-graded');
  if (countAllEl) countAllEl.textContent = `(${allHistory.length})`;
  if (countQuizEl) countQuizEl.textContent = `(${allHistory.filter(h => h.type === 'quiz' || !h.type).length})`;
  if (countReadingEl) countReadingEl.textContent = `(${allHistory.filter(h => h.type === 'reading').length})`;
  if (countWritingEl) countWritingEl.textContent = `(${allHistory.filter(h => h.type === 'writing').length})`;
  if (countUngradedEl) countUngradedEl.textContent = `(${allHistory.filter(h => !h.isGraded && (h.type === 'reading' || h.type === 'writing' || h.savedShortCount > 0 || (Array.isArray(h.details) && h.details.some(d => d.status === 'saved')))).length})`;
  if (countGradedEl) countGradedEl.textContent = `(${allHistory.filter(h => h.isGraded).length})`;

  // 2. Filter records
  let filtered = allHistory;
  if (currentHistoryTypeFilter && currentHistoryTypeFilter !== 'all') {
    filtered = filtered.filter(h => {
      const isQuiz = h.type === 'quiz' || !h.type;
      if (currentHistoryTypeFilter === 'quiz') return isQuiz;
      if (currentHistoryTypeFilter === 'reading') return h.type === 'reading';
      if (currentHistoryTypeFilter === 'writing') return h.type === 'writing';
      if (currentHistoryTypeFilter === 'ungraded') {
        return !h.isGraded && (h.type === 'reading' || h.type === 'writing' || h.savedShortCount > 0 || (Array.isArray(h.details) && h.details.some(d => d.status === 'saved')));
      }
      if (currentHistoryTypeFilter === 'graded') {
        return Boolean(h.isGraded);
      }
      return true;
    });
  }

  if (historyPageSetFilter) {
    filtered = filtered.filter(h => String(h.setId) === String(historyPageSetFilter));
  }

  if (historyPageSearchQuery) {
    filtered = filtered.filter(h => {
      const hay = (String(h.setTitle) + ' ' + String(h.playerName) + ' ' + String(h.className) + ' ' + String(h.setTopic || '')).toLowerCase();
      return hay.includes(historyPageSearchQuery);
    });
  }

  // Active filter badge update
  const badgeWrap = document.getElementById('history-page-active-filter-badge');
  const badgeText = document.getElementById('history-page-filter-badge-text');
  if (badgeWrap && badgeText) {
    if (historyPageSetFilter) {
      const targetItem = allHistory.find(h => String(h.setId) === String(historyPageSetFilter));
      const targetTitle = targetItem ? targetItem.setTitle : 'Bộ câu hỏi đã chọn';
      badgeText.innerHTML = `🔍 Đang xem lịch sử bộ đề: <b>${esc(targetTitle)}</b> (${filtered.length} lượt)`;
      badgeWrap.style.display = 'flex';
    } else {
      badgeWrap.style.display = 'none';
    }
  }

  const isTeacher = typeof Auth === 'undefined' || Auth.isTeacher();
  const searchInput = document.getElementById('history-page-search');
  if (searchInput) {
    searchInput.placeholder = isTeacher 
      ? 'Tìm kiếm theo tên học sinh, lớp, tác phẩm, chủ đề…' 
      : 'Tìm kiếm theo tác phẩm, chủ đề bài làm của bạn…';
  }

  if (!filtered.length) {
    const emptyDesc = allHistory.length 
      ? 'Không tìm thấy lượt làm bài nào phù hợp với bộ lọc hoặc từ khóa tìm kiếm.' 
      : (isTeacher 
          ? 'Sau khi học sinh hoàn thành bài học, đọc hiểu hoặc luyện viết, toàn bộ bài làm sẽ tự động lưu lại tại đây để giáo viên chấm điểm.' 
          : 'Sau khi bạn hoàn thành bài học, đọc hiểu hoặc luyện viết, toàn bộ bài làm và câu trả lời của bạn sẽ tự động lưu lại tại đây.');

    container.innerHTML = `
      <div class="card empty-history-box" style="text-align:center; padding:50px 20px; border-radius:24px;">
        <span class="empty-history-icon" style="font-size:52px; display:block; margin-bottom:12px; color:var(--mut);"><ion-icon name="time-outline"></ion-icon></span>
        <h3 style="margin:0 0 8px; font-weight:800; font-size:20px;">${isTeacher ? 'Chưa có lịch sử làm bài phù hợp' : 'Bạn chưa có bài làm nào trong lịch sử'}</h3>
        <p class="mut" style="margin:0 auto; max-width:520px; font-size:14.5px;">
          ${emptyDesc}
        </p>
      </div>`;
    return;
  }

  container.innerHTML = filtered.map(renderHistoryItemCardHtml).join('');
}

function renderHistoryItemCardHtml(item) {
  const isQuiz = item.type === 'quiz' || !item.type;
  const isWriting = item.type === 'writing';
  const typeIcon = isWriting ? '<ion-icon name="create-outline"></ion-icon>' : (item.type === 'reading' ? '<ion-icon name="document-text-outline"></ion-icon>' : '<ion-icon name="book-outline"></ion-icon>');
  const typeName = isWriting ? 'Luyện viết' : (item.type === 'reading' ? 'Đọc hiểu' : 'Bài học');
  const isGraded = Boolean(item.isGraded);
  const hasUngradedShort = !isGraded && (item.type === 'reading' || item.type === 'writing' || item.savedShortCount > 0 || (Array.isArray(item.details) && item.details.some(d => d.status === 'saved')));
  const canGrade = Boolean(typeof Auth === 'undefined' || Auth.canGradeSubmissions());

  // Thiết lập ô điểm hiển thị nổi bật ở góc phải thẻ
  let scoreBoxClass = 'score-box-quiz';
  let scoreValue = '0đ';
  let scoreSub = 'ĐIỂM SỐ';
  let scoreTooltip = 'Điểm số bài làm';

  const rawScore = item.score !== undefined && item.score !== null ? parseFloat(item.score) : 0;
  const formattedScore = (Math.round(rawScore * 100) / 100).toFixed(2).replace(/\.?0+$/, '') + 'đ';

  if (item.isTampered) {
    scoreBoxClass = 'score-box-waiting';
    scoreValue = 'Vô hiệu';
    scoreSub = '<ion-icon name="warning-outline"></ion-icon> CAN THIỆP';
    scoreTooltip = 'Phát hiện dữ liệu bài làm bị sửa đổi bất thường qua Console hoặc LocalStorage!';
  } else if (isGraded) {
    scoreBoxClass = 'score-box-graded';
    scoreValue = formattedScore;
    scoreSub = '<ion-icon name="checkmark-done-outline"></ion-icon> ĐÃ CHẤM';
    scoreTooltip = `Bài làm đã được chấm điểm: ${formattedScore}`;
  } else if (hasUngradedShort) {
    scoreBoxClass = 'score-box-waiting';
    scoreValue = 'Chờ chấm';
    scoreSub = '<ion-icon name="hourglass-outline"></ion-icon> ĐỢI CHẤM';
    scoreTooltip = isWriting ? 'Bài viết đang chờ giáo viên chấm điểm' : 'Bài làm có câu tự luận đang chờ giáo viên chấm điểm';
  } else {
    scoreBoxClass = 'score-box-quiz';
    scoreValue = formattedScore;
    scoreSub = (item.accuracy !== undefined && item.accuracy !== null) ? `<ion-icon name="pie-chart-outline"></ion-icon> ${item.accuracy}% ĐÚNG` : '<ion-icon name="ribbon-outline"></ion-icon> ĐIỂM SỐ';
    scoreTooltip = `Điểm bài làm: ${formattedScore} (${item.accuracy || 0}% đúng)`;
  }

  let statsHtml = '';
  if (isQuiz) {
    statsHtml = `
      <span class="history-pill pill-acc"><ion-icon name="pie-chart-outline"></ion-icon> ${item.accuracy || 0}% (${item.correctCount || 0}/${item.totalQuestions || 0} đúng)</span>
      ${item.savedShortCount ? `<span class="history-pill pill-short"><ion-icon name="create-outline"></ion-icon> ${item.savedShortCount} tự luận</span>` : ''}
      <span class="history-pill pill-time"><ion-icon name="time-outline"></ion-icon> ${item.elapsedSeconds ? Math.floor(item.elapsedSeconds / 60) + 'p ' + (item.elapsedSeconds % 60) + 's' : '—'}</span>
    `;
  } else if (item.type === 'reading') {
    statsHtml = `
      <span class="history-pill pill-score"><ion-icon name="document-text-outline"></ion-icon> ${item.answeredCount || 0}/${item.totalQuestions || 0} câu đã làm</span>
    `;
  } else if (isWriting) {
    const totalWords = item.totalWords || (item.details ? item.details.reduce((sum, d) => sum + (d.words || 0), 0) : 0);
    statsHtml = `
      <span class="history-pill pill-acc"><ion-icon name="create-outline"></ion-icon> ${totalWords} từ</span>
      <span class="history-pill pill-score"><ion-icon name="document-text-outline"></ion-icon> ${item.answeredCount || item.totalQuestions || 3}/${item.totalQuestions || 3} phần đã viết</span>
      <span class="history-pill pill-time"><ion-icon name="time-outline"></ion-icon> ${item.elapsedSeconds ? Math.floor(item.elapsedSeconds / 60) + 'p ' + (item.elapsedSeconds % 60) + 's' : '—'}</span>
    `;
  }

  if (isGraded) {
    if (item.teacherFeedback) {
      statsHtml += `<span class="history-pill pill-short" title="${esc(item.teacherFeedback)}"><ion-icon name="chatbubble-ellipses-outline"></ion-icon> Lời phê: "${esc(item.teacherFeedback.slice(0, 35))}${item.teacherFeedback.length > 35 ? '…' : ''}"</span>`;
    }
  } else if (hasUngradedShort) {
    statsHtml += `<span class="history-pill pill-ungraded"><ion-icon name="hourglass-outline"></ion-icon> Chờ chấm ${isWriting ? 'bài viết' : 'tự luận'}</span>`;
  }

  return `
    <div class="history-item-card">
      <div class="history-item-top">
        <div class="history-item-left">
          <div class="history-item-title-row">
            <span class="history-item-badge">${typeIcon} ${typeName}</span>
            <h4 class="history-item-title" onclick="openHistoryForSet('${esc(item.setId)}', '${esc(item.setTitle)}')" style="cursor:pointer;" title="Nhấp để chỉ xem các bài làm của bộ đề này">
              ${esc(item.setTitle || 'Bài làm')}
            </h4>
          </div>

          <div class="history-item-meta">
            <span><ion-icon name="person-outline"></ion-icon> Học sinh: <b>${esc(item.playerName || 'Học sinh')}</b></span>
            ${item.className ? `<span>· Lớp: <b>${esc(item.className)}</b></span>` : ''}
            ${item.setTopic ? `<span>· Chủ đề: <b>${esc(item.setTopic)}</b></span>` : ''}
            <span>· <ion-icon name="calendar-outline"></ion-icon> ${item.dateStr || ''}</span>
          </div>
        </div>

        <!-- GÓC PHẢI THẺ: HIỂN THỊ SCORE / KẾT QUẢ NỔI BẬT DỄ NHÌN -->
        <div class="history-card-score-box ${scoreBoxClass}" title="${esc(scoreTooltip)}">
          <span class="history-score-main">${scoreValue}</span>
          <span class="history-score-sub">${scoreSub}</span>
        </div>
      </div>

      <div class="history-item-stats">
        ${statsHtml}
      </div>

      <div class="history-item-footer">
        ${canGrade ? `
          ${isGraded ? `
            <button class="btn cy sm" type="button" onclick="viewHistoryDetail('${esc(item.id)}', true)">
              <ion-icon name="create-outline"></ion-icon> Sửa điểm / Chấm lại
            </button>
            <button class="btn gh sm" type="button" onclick="viewHistoryDetail('${esc(item.id)}', false)">
              <ion-icon name="eye-outline"></ion-icon> Xem chi tiết bài làm
            </button>
          ` : `
            <button class="btn au sm" type="button" onclick="viewHistoryDetail('${esc(item.id)}', true)" style="font-weight:800;">
              <ion-icon name="create-outline"></ion-icon> Chấm bài ngay
            </button>
            <button class="btn gh sm" type="button" onclick="viewHistoryDetail('${esc(item.id)}', false)">
              <ion-icon name="eye-outline"></ion-icon> Xem chi tiết bài làm
            </button>
          `}
          <button class="btn no sm btn-icon-only teacher-only" type="button" onclick="deleteHistoryItem('${esc(item.id)}')" title="Xóa lượt này">
            <ion-icon name="trash-outline"></ion-icon>
          </button>
        ` : `
          ${isGraded ? `
            <button class="btn au sm" type="button" onclick="viewHistoryDetail('${esc(item.id)}', false)" style="font-weight:800;">
              <ion-icon name="eye-outline"></ion-icon> Xem kết quả &amp; Lời phê của giáo viên
            </button>
          ` : `
            <button class="btn gh sm" type="button" onclick="viewHistoryDetail('${esc(item.id)}', false)">
              <ion-icon name="eye-outline"></ion-icon> Xem lại bài đã làm (Chờ giáo viên chấm)
            </button>
          `}
        `}
      </div>
    </div>
  `;
}

function openHistoryForSet(setId, setTitle) {
  go('history', setId);
}

function openHistoryModal(setId = '') {
  go('history', setId);
}

function closeHistoryModal() {
  const dialog = document.getElementById('quiz-history-dialog');
  if (dialog && dialog.open) dialog.close();
}

let currentHistorySetFilter = '';

function onHistorySetFilterChange() {
  const select = document.getElementById('history-set-filter');
  currentHistorySetFilter = select ? select.value : '';
  renderHistoryList();
}

function clearHistorySetFilter() {
  currentHistorySetFilter = '';
  currentHistorySearchQuery = '';
  const searchInput = document.getElementById('history-search-input');
  if (searchInput) searchInput.value = '';
  const select = document.getElementById('history-set-filter');
  if (select) select.value = '';
  renderHistoryList();
}

function updateHistorySetFilterDropdown() {
  const select = document.getElementById('history-set-filter');
  if (!select) return;
  const allHistory = getQuizHistory();
  const setMap = new Map();
  allHistory.forEach(item => {
    const sId = String(item.setId || '');
    if (sId && !setMap.has(sId)) {
      setMap.set(sId, { id: sId, title: item.setTitle || 'Bộ đề', emo: item.setEmo || '📖', count: 1 });
    } else if (sId && setMap.has(sId)) {
      setMap.get(sId).count++;
    }
  });

  const curVal = currentHistorySetFilter || '';
  let html = `<option value="">Tất cả bộ đề (${allHistory.length})</option>`;
  Array.from(setMap.values()).forEach(s => {
    const sel = s.id === curVal ? 'selected' : '';
    html += `<option value="${esc(s.id)}" ${sel}>${esc(s.title)} (${s.count} lượt)</option>`;
  });
  select.innerHTML = html;
}

function onHistorySearchInput() {
  const input = document.getElementById('history-search-input');
  currentHistorySearchQuery = (input ? input.value : '').trim().toLowerCase();
  renderHistoryList();
}

function renderHistoryList() {
  const container = document.getElementById('history-list-container');
  const countBadge = document.getElementById('history-total-count');
  if (!container) return;

  const allHistory = getQuizHistory();
  updateHistorySetFilterDropdown();

  let filtered = allHistory;
  if (currentHistorySetFilter) {
    filtered = filtered.filter(h => String(h.setId) === String(currentHistorySetFilter));
  }
  if (currentHistorySearchQuery) {
    filtered = filtered.filter(h => {
      const hay = (String(h.setTitle) + ' ' + String(h.playerName) + ' ' + String(h.className) + ' ' + String(h.setTopic || '')).toLowerCase();
      return hay.includes(currentHistorySearchQuery);
    });
  }

  if (countBadge) {
    countBadge.textContent = currentHistorySetFilter 
      ? `${filtered.length}/${allHistory.length} lượt bài này`
      : `${allHistory.length} lượt làm bài`;
  }

  // Update active filter badge
  const badgeWrap = document.getElementById('history-active-filter-badge');
  const badgeText = document.getElementById('history-filter-badge-text');
  if (badgeWrap && badgeText) {
    if (currentHistorySetFilter) {
      const targetItem = allHistory.find(h => String(h.setId) === String(currentHistorySetFilter));
      const targetTitle = targetItem ? targetItem.setTitle : 'Bộ câu hỏi đã chọn';
      badgeText.innerHTML = `<ion-icon name="funnel-outline"></ion-icon> Lọc theo bộ đề: <b>${esc(targetTitle)}</b> (${filtered.length} lượt làm)`;
      badgeWrap.style.display = 'flex';
    } else {
      badgeWrap.style.display = 'none';
    }
  }

  const isTeacher = typeof Auth === 'undefined' || Auth.isTeacher();
  if (!filtered.length) {
    const emptyDesc = allHistory.length 
      ? 'Không tìm thấy lượt làm bài nào cho bộ đề hoặc từ khóa này.' 
      : (isTeacher 
          ? 'Sau khi học sinh hoàn thành bài học, đọc hiểu hoặc luyện viết, kết quả sẽ tự động được lưu lại tại đây để giáo viên chấm điểm.' 
          : 'Sau khi bạn hoàn thành bài học, đọc hiểu hoặc luyện viết, toàn bộ bài làm và câu trả lời của bạn sẽ tự động lưu lại tại đây.');

    container.innerHTML = `
      <div class="empty-history-box">
        <span class="empty-history-icon" style="color:var(--mut);"><ion-icon name="time-outline"></ion-icon></span>
        <h3 style="margin:8px 0 4px; font-weight:800;">${isTeacher ? 'Chưa có lịch sử bài làm nào' : 'Bạn chưa có bài làm nào trong lịch sử'}</h3>
        <p class="mut" style="margin:0; font-size:14px;">
          ${emptyDesc}
        </p>
      </div>`;
    return;
  }

  container.innerHTML = filtered.map(renderHistoryItemCardHtml).join('');
}

// =========================================================================
// MANUAL GRADING SYSTEM IMPLEMENTATION (CHẤM BÀI THỦ CÔNG)
// =========================================================================

let currentViewingHistoryId = null;
let isHistoryGradingMode = false;

function viewHistoryDetail(id, startInGradingMode = false) {
  const history = getAllRawQuizHistory();
  const item = history.find(h => String(h.id) === String(id));
  if (!item) return toast('Không tìm thấy bài làm trong lịch sử.', 'bad');

  if (typeof Auth !== 'undefined') {
    const u = Auth.getCurrentUser();
    if (u && u.role === 'student' && !isItemBelongToStudent(item, u)) {
      return toast('Bạn chỉ có quyền xem bài làm của chính mình.', 'bad');
    }
  }

  currentViewingHistoryId = String(id);
  const canGrade = typeof Auth === 'undefined' || Auth.canGradeSubmissions();
  isHistoryGradingMode = canGrade ? Boolean(startInGradingMode) : false;

  renderHistoryDetailModalView();

  const dialog = document.getElementById('history-detail-dialog');
  if (dialog && !dialog.open) dialog.showModal();
}

function toggleHistoryGradingMode() {
  if (typeof Auth !== 'undefined' && !Auth.canGradeSubmissions()) {
    return toast('Chỉ giáo viên mới có quyền chấm bài và sửa điểm!', 'bad');
  }
  isHistoryGradingMode = !isHistoryGradingMode;
  renderHistoryDetailModalView();
}

function renderHistoryDetailModalView() {
  const history = getAllRawQuizHistory();
  const item = history.find(h => String(h.id) === String(currentViewingHistoryId));
  if (!item) return;

  const canGrade = typeof Auth === 'undefined' || Auth.canGradeSubmissions();
  if (!canGrade) {
    isHistoryGradingMode = false;
  }

  const titleEl = document.getElementById('history-detail-title');
  const metaEl = document.getElementById('history-detail-meta');
  const toolbarEl = document.getElementById('history-detail-grading-toolbar');
  const headingEl = document.getElementById('history-detail-section-heading');
  const listEl = document.getElementById('history-detail-questions-list');
  const summaryEl = document.getElementById('history-detail-grading-summary');
  const toggleBtn = document.getElementById('btn-toggle-grading-mode');
  const saveFooterBtn = document.getElementById('btn-save-grading-footer');

  if (titleEl) titleEl.textContent = `${item.setTitle || 'Chi tiết bài làm'}`;

  if (toggleBtn) {
    if (!canGrade) {
      toggleBtn.style.display = 'none';
    } else {
      toggleBtn.style.display = 'inline-flex';
      if (isHistoryGradingMode) {
        toggleBtn.innerHTML = '<span><ion-icon name="eye-outline"></ion-icon> Xem bài làm</span>';
        toggleBtn.className = 'btn gh sm';
        toggleBtn.title = 'Trở về chế độ xem thông thường';
      } else {
        toggleBtn.innerHTML = `<span><ion-icon name="create-outline"></ion-icon> ${item.isGraded ? 'Sửa điểm / Chấm lại' : 'Chấm bài thủ công'}</span>`;
        toggleBtn.className = 'btn cy sm';
        toggleBtn.title = 'Bật chế độ cho điểm và nhận xét từng câu';
      }
    }
  }

  if (saveFooterBtn) {
    saveFooterBtn.style.display = isHistoryGradingMode ? 'inline-flex' : 'none';
  }

  const isWriting = item.type === 'writing';
  if (headingEl) {
    headingEl.textContent = isHistoryGradingMode
      ? (isWriting ? 'Chấm điểm & Nhận xét từng phần bài viết (Thang 10đ chuẩn):' : 'Chấm điểm & Nhận xét từng câu hỏi:')
      : (isWriting ? 'Nội dung bài viết theo từng phần dàn ý:' : 'Danh sách câu hỏi & Bài làm:');
  }

  const details = Array.isArray(item.details) ? item.details : [];
  const itemTotalMaxScore = isWriting ? 10.0 : details.reduce((sum, d) => {
    const m = (d.maxScore !== undefined && d.maxScore !== null && Number(d.maxScore) > 0)
      ? Number(d.maxScore)
      : 1.0;
    return sum + m;
  }, 0);

  const isGraded = Boolean(item.isGraded);
  if (metaEl) {
    const totalWords = item.totalWords || details.reduce((sum, d) => sum + (d.words || ((d.userAnswer || '').trim().split(/\s+/).filter(Boolean).length)), 0);
    metaEl.innerHTML = `
      <div style="display:flex; flex-wrap:wrap; gap:12px; font-size:13.5px; margin-bottom:14px; background:var(--bg-base); border:2px solid var(--stroke); border-radius:14px; padding:12px 16px; align-items:center;">
        <span><ion-icon name="person-outline"></ion-icon> Học sinh: <b>${esc(item.playerName || 'Học sinh')}</b></span>
        ${item.className ? `<span>· Lớp: <b>${esc(item.className)}</b></span>` : ''}
        <span>· Ngày làm: <b>${item.dateStr || ''}</b></span>
        ${isWriting
          ? `<span>· Bài viết: <b>${totalWords} từ</b> • <b>${item.answeredCount || details.length}/${details.length} phần</b></span>`
          : (item.type === 'reading' 
              ? `<span>· Đọc hiểu: <b>${item.answeredCount || 0}/${item.totalQuestions || 0} câu</b></span>` 
              : `<span>· Trắc nghiệm: <b>${item.accuracy || 0}%</b> (${item.correctCount || 0}/${item.totalQuestions || 0} câu đúng)</span>`
            )
        }
        <span class="tag ${isGraded ? 'ok' : 'cy'}" style="font-weight:800;">
          ${isGraded ? `<ion-icon name="checkmark-done-outline"></ion-icon> Đã chấm: ${item.score || 0}/${itemTotalMaxScore > 0 ? itemTotalMaxScore : (isWriting ? 10.0 : 6.0)}đ` : '<ion-icon name="hourglass-outline"></ion-icon> Chờ chấm điểm'}
        </span>
        ${item.gradedDateStr ? `<span class="mut" style="font-size:12.5px;">(Chấm lúc: ${item.gradedDateStr})</span>` : ''}
        <span class="tag gh" style="font-size:11.5px; font-weight:700;">
          ${canGrade ? '<ion-icon name="school-outline"></ion-icon> Giáo viên chấm bài' : '<ion-icon name="person-outline"></ion-icon> Học sinh xem kết quả'}
        </span>
      </div>
    `;
  }

  if (toolbarEl) {
    if (isHistoryGradingMode) {
      toolbarEl.style.display = 'flex';
      toolbarEl.className = 'history-grading-toolbar';
      toolbarEl.innerHTML = `
        <div class="history-grading-toolbar-title">
          <span><ion-icon name="create-outline"></ion-icon></span> <span>Bảng công cụ Chấm bài của Giáo viên ${isWriting ? '(Thang 10đ Chuẩn)' : ''}</span>
        </div>
        <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
          <button type="button" class="btn gh sm" onclick="gradeAllQuestionsQuick('ok')" title="Cho điểm tối đa từng câu / phần" style="font-size:12px; padding:4px 10px;">
            <ion-icon name="flash-outline"></ion-icon> Đạt tất cả (${itemTotalMaxScore > 0 ? itemTotalMaxScore : (isWriting ? 10 : details.length)}đ)
          </button>
          <button type="button" class="btn cy sm" onclick="autoCalculateTotalPoints()" title="Cộng dồn điểm từ tất cả các phần" style="font-size:12px; padding:4px 10px;">
            <ion-icon name="calculator-outline"></ion-icon> Tính tổng điểm
          </button>
          <button type="button" class="btn au sm" onclick="saveManualGrading()" style="font-size:12.5px; font-weight:800; padding:4px 14px;">
            <ion-icon name="save-outline"></ion-icon> Lưu kết quả chấm
          </button>
        </div>
      `;
    } else {
      toolbarEl.style.display = 'none';
    }
  }

  if (listEl) {
    if (!details.length) {
      listEl.innerHTML = '<p class="mut" style="padding:16px; text-align:center;">Không có dữ liệu chi tiết cho bài làm này.</p>';
    } else {
      listEl.innerHTML = details.map((d, idx) => {
        const defaultSecMax = isWriting ? (idx === 1 ? 6.0 : 2.0) : 1.0;
        const maxPts = (d.maxScore !== undefined && d.maxScore !== null && Number(d.maxScore) > 0)
          ? Number(d.maxScore)
          : defaultSecMax;
        const halfPts = Math.round((maxPts / 2) * 100) / 100;

        let badgeCls = 'bad';
        let badgeTxt = '<ion-icon name="close-circle-outline"></ion-icon> Chưa chính xác';
        if (d.gradeStatus === 'ok' || (!d.gradeStatus && d.status === 'ok')) {
          badgeCls = 'ok';
          badgeTxt = '<ion-icon name="checkmark-circle-outline"></ion-icon> Đúng / Đạt';
        } else if (d.gradeStatus === 'partial') {
          badgeCls = 'cy';
          badgeTxt = '<ion-icon name="ellipse-outline"></ion-icon> Một phần';
        } else if (d.gradeStatus === 'bad' || (!d.gradeStatus && d.status === 'bad')) {
          badgeCls = 'bad';
          badgeTxt = '<ion-icon name="close-circle-outline"></ion-icon> Chưa đạt';
        } else if (d.status === 'saved') {
          badgeCls = 'cy';
          badgeTxt = isWriting ? '<ion-icon name="create-outline"></ion-icon> Bài viết (Chờ chấm)' : '<ion-icon name="document-text-outline"></ion-icon> Tự luận (Chờ chấm)';
        } else if (d.status === 'no') {
          badgeCls = 'gh';
          badgeTxt = '<ion-icon name="time-outline"></ion-icon> Bỏ qua';
        }

        const userAns = (d.userAnswer || '').trim();
        const words = (userAns.match(/\S+/g) || []).length;
        const curStatus = d.gradeStatus || (d.status === 'ok' ? 'ok' : d.status === 'bad' ? 'bad' : 'ok');
        const curPoints = d.points !== undefined ? d.points : (d.status === 'ok' ? maxPts : 0);

        let quickPillsHtml = '';
        if (maxPts >= 6.0) {
          quickPillsHtml = `
            <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, 1.0)">1.0</button>
            <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, 2.0)">2.0</button>
            <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, 3.0)">3.0</button>
            <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, 4.0)">4.0</button>
            <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, 5.0)">5.0</button>
            <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, ${maxPts})">${maxPts}đ</button>
          `;
        } else if (maxPts >= 2.0) {
          quickPillsHtml = `
            <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, 0.5)">0.5</button>
            <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, 1.0)">1.0</button>
            <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, 1.5)">1.5</button>
            <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, ${maxPts})">${maxPts}đ</button>
          `;
        } else {
          quickPillsHtml = `
            <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, 0.25)">0.25</button>
            <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, 0.5)">0.5</button>
            <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, 0.75)">0.75</button>
            <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, ${maxPts})">${maxPts}đ</button>
          `;
        }

        const secLabel = isWriting ? (d.sectionTitle || d.questionText || `Phần ${idx + 1}`) : `Câu ${idx + 1}`;

        return `
          <div class="history-detail-q-card" id="hist-card-q-${idx}">
            <div class="history-detail-q-head">
              <div style="display:flex; align-items:center; gap:8px;">
                <span class="history-detail-q-num">${isWriting ? `Phần ${idx + 1}: ${esc(secLabel)}` : `Câu ${idx + 1}`}</span>
                ${d.questionType ? `<span class="tag gh" style="font-size:11px;">${esc(d.questionType)}</span>` : ''}
              </div>
              <div style="display:flex; align-items:center; gap:8px;">
                <span class="tag gh" style="font-size:11.5px; font-weight:700;"><ion-icon name="trophy-outline"></ion-icon> Tối đa: ${maxPts}đ</span>
                ${d.points !== undefined ? `<span class="tag ${d.points > 0 ? 'ok' : 'gh'}" style="font-weight:800;"><ion-icon name="star-outline"></ion-icon> ${d.points}đ</span>` : ''}
                <span class="tag ${badgeCls}">${badgeTxt}</span>
              </div>
            </div>

            <div class="history-detail-q-body">
              ${!isWriting ? `<p class="history-detail-q-text"><b>${esc(d.questionText)}</b></p>` : ''}
              
              ${d.sectionGuide ? `
                <div class="history-detail-ans-row" style="margin-top:4px;">
                  <span class="history-detail-ans-label"><ion-icon name="list-outline"></ion-icon> Dàn ý định hướng:</span>
                </div>
                <div class="history-detail-ans-val rubric-guide-box" style="white-space:pre-wrap; line-height:1.6; font-size:13.5px;">
                  ${esc(d.sectionGuide)}
                </div>
              ` : ''}

              <div class="history-detail-ans-row" style="margin-top:8px;">
                <span class="history-detail-ans-label">${isWriting ? 'Bài viết của học sinh:' : 'Bài làm của học sinh:'}</span>
                ${words > 0 ? `<span class="mut" style="font-size:12px;">(<ion-icon name="create-outline"></ion-icon> ${words} từ)</span>` : ''}
              </div>
              <div class="history-detail-ans-val student-essay-box ${d.status === 'ok' ? 'correct' : d.status === 'saved' ? 'saved' : 'wrong'}" style="white-space:pre-wrap; line-height:1.7; font-size:14.5px;">
                ${esc(userAns || (isWriting ? '(Để trống - Học sinh chưa viết phần này)' : '(Để trống - Học sinh chưa trả lời)'))}
              </div>

              ${d.correctAnswer ? `
                <div class="history-detail-ans-row" style="margin-top:8px;">
                  <span class="history-detail-ans-label">Đáp án chuẩn / Thang điểm:</span>
                </div>
                <div class="history-detail-ans-val rubric-guide-box">
                  ${esc(d.correctAnswer)}
                </div>
              ` : ''}

              ${d.explanation ? `
                <div class="history-detail-explanation">
                  <b>Giải thích chi tiết:</b> ${esc(d.explanation)}
                </div>
              ` : ''}

              <!-- KHU VỰC CHẤM BÀI CHO CÂU NÀY -->
              ${isHistoryGradingMode ? `
                <div class="history-manual-grading-panel" id="grading-panel-${idx}">
                  <div class="grading-panel-top">
                    <span class="grading-panel-label"><ion-icon name="create-outline"></ion-icon> Đánh giá ${isWriting ? `Phần ${idx + 1}` : `Câu ${idx + 1}`} (Tối đa ${maxPts}đ):</span>
                    <div class="grading-quick-status-btns">
                      <button type="button" class="grading-quick-status-btn ${curStatus === 'ok' ? 'active-ok' : ''}" onclick="setQuestionGradeStatus(${idx}, 'ok', ${maxPts})">
                        <ion-icon name="checkmark-circle-outline"></ion-icon> Đạt (${maxPts}đ)
                      </button>
                      <button type="button" class="grading-quick-status-btn ${curStatus === 'partial' ? 'active-partial' : ''}" onclick="setQuestionGradeStatus(${idx}, 'partial', ${halfPts})">
                        <ion-icon name="ellipse-outline"></ion-icon> Một phần (${halfPts}đ)
                      </button>
                      <button type="button" class="grading-quick-status-btn ${curStatus === 'bad' ? 'active-bad' : ''}" onclick="setQuestionGradeStatus(${idx}, 'bad', 0)">
                        <ion-icon name="close-circle-outline"></ion-icon> Chưa đạt (0đ)
                      </button>
                    </div>
                  </div>

                  <div class="grading-inputs-row">
                    <div class="grading-points-input-box">
                      <label for="grade-point-${idx}">Số điểm ${isWriting ? 'phần này' : 'câu này'} (tối đa ${maxPts}đ):</label>
                      <input type="number" id="grade-point-${idx}" class="grade-point-input" step="0.25" min="0" max="${maxPts}" data-max="${maxPts}" value="${curPoints}" oninput="onQuestionPointsChanged()" style="width:74px; text-align:center; font-weight:800; font-size:15px; border-radius:8px; padding:4px 6px;">
                      <span class="mut" style="font-size:13px; font-weight:700;">/ ${maxPts} điểm</span>
                      <div class="grading-quick-pills">
                        ${quickPillsHtml}
                        <button type="button" class="btn gh sm" onclick="setQuestionPointQuick(${idx}, 0)">0đ</button>
                      </div>
                    </div>
                  </div>

                  <div class="grading-comment-box" style="margin-top:6px;">
                    <input type="text" id="grade-comment-${idx}" class="grade-comment-input" placeholder="Nhận xét của giáo viên cho ${isWriting ? 'phần này' : 'câu này'} (ví dụ: Diễn đạt mạch lạc, thiếu dẫn chứng...)" value="${esc(d.teacherComment || '')}">
                    <div style="display:flex; flex-wrap:wrap; gap:5px; margin-top:6px;">
                      <span style="font-size:11.5px; color:var(--mut); font-weight:700; align-self:center;">Mẫu nhận xét nhanh:</span>
                      ${isWriting ? `
                        <button type="button" class="history-quick-feedback-chip" onclick="appendQuickQuestionComment(${idx}, 'Diễn đạt mượt mà, cảm xúc.')">+ Diễn đạt tốt</button>
                        <button type="button" class="history-quick-feedback-chip" onclick="appendQuickQuestionComment(${idx}, 'Luận điểm rõ ràng, dẫn chứng xác đáng.')">+ Đầy đủ dẫn chứng</button>
                        <button type="button" class="history-quick-feedback-chip" onclick="appendQuickQuestionComment(${idx}, 'Cần bổ sung thêm dẫn chứng thực tế.')">+ Thiếu dẫn chứng</button>
                        <button type="button" class="history-quick-feedback-chip" onclick="appendQuickQuestionComment(${idx}, 'Chú ý liên kết đoạn và chính tả.')">+ Chú ý liên kết đoạn</button>
                      ` : `
                        <button type="button" class="history-quick-feedback-chip" onclick="appendQuickQuestionComment(${idx}, 'Diễn đạt tốt, giàu cảm xúc.')">+ Diễn đạt tốt</button>
                        <button type="button" class="history-quick-feedback-chip" onclick="appendQuickQuestionComment(${idx}, 'Nêu đúng trọng tâm, cần bổ sung dẫn chứng.')">+ Thiếu dẫn chứng</button>
                        <button type="button" class="history-quick-feedback-chip" onclick="appendQuickQuestionComment(${idx}, 'Cần phân tích sâu hơn.')">+ Cần phân tích sâu</button>
                        <button type="button" class="history-quick-feedback-chip" onclick="appendQuickQuestionComment(${idx}, 'Chú ý lỗi chính tả và diễn đạt.')">+ Lỗi chính tả</button>
                      `}
                    </div>
                  </div>
                </div>
              ` : `
                ${(d.isGraded || d.teacherComment || (d.points !== undefined && d.points > 0)) ? `
                  <div class="history-graded-result-box">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
                      <span>Điểm ${isWriting ? `Phần ${idx + 1}` : `câu ${idx + 1}`}: <b>${d.points !== undefined ? d.points : 0} / ${maxPts}</b> điểm</span>
                      <span class="tag ${curStatus === 'ok' ? 'ok' : curStatus === 'partial' ? 'cy' : 'bad'}">
                        ${curStatus === 'ok' ? '<ion-icon name="checkmark-circle-outline"></ion-icon> Đạt' : curStatus === 'partial' ? '<ion-icon name="ellipse-outline"></ion-icon> Đạt một phần' : '<ion-icon name="close-circle-outline"></ion-icon> Chưa đạt'}
                      </span>
                    </div>
                    ${d.teacherComment ? `<div class="history-teacher-comment"><ion-icon name="chatbubble-ellipses-outline"></ion-icon> <b>Nhận xét của GV:</b> ${esc(d.teacherComment)}</div>` : ''}
                  </div>
                ` : ''}
              `}
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // SUMMARY & OVERALL CARD
  if (summaryEl) {
    if (isHistoryGradingMode) {
      summaryEl.innerHTML = `
        <div class="history-overall-grading-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:8px;">
            <h4 style="margin:0; font-size:16px; font-weight:800; display:flex; align-items:center; gap:6px;">
              <span><ion-icon name="create-outline"></ion-icon></span> <span>Tổng kết điểm &amp; Lời phê của Giáo viên ${isWriting ? '(Thang 10đ Chuẩn)' : ''}</span>
            </h4>
            <button type="button" class="btn cy sm" onclick="autoCalculateTotalPoints()" title="Cộng dồn điểm từ tất cả các phần trên">
              <ion-icon name="calculator-outline"></ion-icon> Tự động tính tổng từ các phần
            </button>
          </div>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:14px; margin-bottom:14px;">
            <div>
              <label for="grade-total-score" style="font-weight:700; font-size:13.5px; display:block; margin-bottom:5px;">
                Tổng điểm toàn bài:
              </label>
              <div style="display:flex; align-items:center; gap:8px;">
                <input type="number" id="grade-total-score" step="0.25" min="0" max="${itemTotalMaxScore || 10}" value="${item.score || 0}" oninput="updateGradeRankBadge(${itemTotalMaxScore})" style="width:110px; text-align:center; font-weight:900; font-size:22px; border-radius:10px; padding:6px 8px; color:var(--primary);">
                <span style="font-weight:800; font-size:16px;">/ ${itemTotalMaxScore || (isWriting ? 10.0 : 6.0)} điểm</span>
              </div>
            </div>
            <div>
              <label style="font-weight:700; font-size:13.5px; display:block; margin-bottom:5px;">
                Xếp loại kết quả:
              </label>
              <div id="grade-rank-badge-wrap">
                ${getGradeRankBadge(item.score, itemTotalMaxScore)}
              </div>
            </div>
          </div>

          <div style="margin-bottom:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; flex-wrap:wrap; gap:6px;">
              <label for="grade-general-feedback" style="font-weight:700; font-size:13.5px; margin:0;">
                Lời phê / Nhận xét chung cho học sinh:
              </label>
            </div>
            <textarea id="grade-general-feedback" rows="3" placeholder="Nhập nhận xét tổng quát về kiến thức, kỹ năng trình bày, ưu điểm và điểm cần khắc phục của bài làm..." style="width:100%; font-family:inherit; font-size:13.5px; border-radius:10px; padding:9px 12px; line-height:1.5;">${esc(item.teacherFeedback || '')}</textarea>
            
            <div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:8px;">
              <span style="font-size:12px; color:var(--mut); font-weight:700; align-self:center;">Mẫu lời phê nhanh:</span>
              ${isWriting ? `
                <button type="button" class="btn gh sm quick-template-btn" onclick="applyQuickGeneralFeedback('Bài viết rất xuất sắc, bố cục 3 phần chặt chẽ, luận điểm rõ ràng, dẫn chứng thuyết phục và giàu cảm xúc.')">
                  <ion-icon name="ribbon-outline"></ion-icon> Xuất sắc &amp; Sắc bén
                </button>
                <button type="button" class="btn gh sm quick-template-btn" onclick="applyQuickGeneralFeedback('Bố cục bài viết hoàn chỉnh, diễn đạt lưu loát. Cần phân tích sâu sắc hơn ở thân bài và mở rộng dẫn chứng.')">
                  <ion-icon name="thumbs-up-outline"></ion-icon> Đầy đủ &amp; Cần mở rộng
                </button>
                <button type="button" class="btn gh sm quick-template-btn" onclick="applyQuickGeneralFeedback('Cần chú ý phát triển ý ở thân bài, trau chuốt câu từ và khắc phục các lỗi diễn đạt, chính tả.')">
                  <ion-icon name="alert-circle-outline"></ion-icon> Cần cố gắng thêm
                </button>
              ` : `
                <button type="button" class="btn gh sm quick-template-btn" onclick="applyQuickGeneralFeedback('Bài làm rất tốt, nắm vững kiến thức trọng tâm, lập luận sắc bén và diễn đạt giàu cảm xúc.')">
                  <ion-icon name="ribbon-outline"></ion-icon> Rất tốt &amp; Sắc bén
                </button>
                <button type="button" class="btn gh sm quick-template-btn" onclick="applyQuickGeneralFeedback('Nắm vững kiến thức cơ bản, diễn đạt khá tốt, cần chú ý phân tích sâu hơn và bổ sung dẫn chứng.')">
                  <ion-icon name="thumbs-up-outline"></ion-icon> Đạt yêu cầu &amp; Cần bổ sung
                </button>
                <button type="button" class="btn gh sm quick-template-btn" onclick="applyQuickGeneralFeedback('Cần đọc kỹ ngữ liệu và câu hỏi, rèn luyện thêm kỹ năng diễn đạt và phân tích bài làm.')">
                  <ion-icon name="alert-circle-outline"></ion-icon> Cần cố gắng thêm
                </button>
              `}
            </div>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button type="button" class="btn gh" onclick="toggleHistoryGradingMode()">Hủy</button>
            <button type="button" class="btn au" onclick="saveManualGrading()" style="font-weight:800; padding:10px 24px; font-size:14.5px;">
              <ion-icon name="save-outline"></ion-icon> Lưu kết quả chấm bài
            </button>
          </div>
        </div>
      `;
    } else if (item.isGraded) {
      summaryEl.innerHTML = `
        <div class="history-overall-grading-card" style="border-color:rgba(34, 197, 94, 0.4); background:rgba(34, 197, 94, 0.06);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
            <h4 style="margin:0; font-size:16px; font-weight:800; display:flex; align-items:center; gap:6px;">
              <span><ion-icon name="trophy-outline"></ion-icon></span> <span>Kết quả chấm bài của Giáo viên</span>
            </h4>
            <button type="button" class="btn cy sm" onclick="toggleHistoryGradingMode()" style="font-weight:700;">
              <ion-icon name="create-outline"></ion-icon> Sửa điểm / Chấm lại
            </button>
          </div>
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px; flex-wrap:wrap;">
            <span style="font-size:24px; font-weight:900; color:var(--green);">
              ${item.score || 0} / ${itemTotalMaxScore || (isWriting ? 10.0 : 6.0)} điểm
            </span>
            ${getGradeRankBadge(item.score, itemTotalMaxScore)}
            ${item.gradedDateStr ? `<span class="mut" style="font-size:12.5px;">(Chấm lúc: ${item.gradedDateStr})</span>` : ''}
          </div>
          ${item.teacherFeedback ? `
            <div style="padding:10px 14px; border-radius:10px; background:var(--bg-card); border:1px solid var(--stroke); font-size:13.5px; line-height:1.6;">
              <b><ion-icon name="chatbubble-ellipses-outline"></ion-icon> Lời phê của Giáo viên:</b><br>${esc(item.teacherFeedback).replace(/\n/g, '<br>')}
            </div>
          ` : ''}
        </div>
      `;
    } else {
      summaryEl.innerHTML = `
        <div style="text-align:center; margin-top:20px; padding:22px; border:2px dashed var(--stroke); border-radius:16px; background:var(--bg-base);">
          <p class="mut" style="margin:0 0 12px; font-size:14.5px;">Bài làm này đang ở trạng thái <b>chờ chấm điểm thủ công</b>.</p>
          ${canGrade ? `
          <button type="button" class="btn au" onclick="toggleHistoryGradingMode()" style="font-weight:800; padding:10px 24px;">
            <ion-icon name="create-outline"></ion-icon> Bắt đầu chấm bài ngay
          </button>
          ` : ''}
        </div>
      `;
    }
  }
}

function setQuestionGradeStatus(idx, status, customPt) {
  if (typeof Auth !== 'undefined' && !Auth.canGradeSubmissions()) return;
  const history = getQuizHistory();
  const item = history.find(h => String(h.id) === String(currentViewingHistoryId));
  if (item && item.details && item.details[idx]) {
    item.details[idx].gradeStatus = status;
    const maxPts = (item.details[idx].maxScore !== undefined && item.details[idx].maxScore !== null && Number(item.details[idx].maxScore) > 0)
      ? Number(item.details[idx].maxScore)
      : 1.0;
    const pointEl = document.getElementById(`grade-point-${idx}`);
    if (pointEl) {
      if (status === 'bad') {
        pointEl.value = '0';
      } else if (status === 'ok') {
        pointEl.value = customPt !== undefined ? String(customPt) : String(maxPts);
      } else if (status === 'partial') {
        pointEl.value = customPt !== undefined ? String(customPt) : String(Math.round((maxPts / 2) * 100) / 100);
      }
    }
    // Update active button state in DOM
    const panel = document.getElementById(`grading-panel-${idx}`);
    if (panel) {
      panel.querySelectorAll('.grading-quick-status-btn').forEach(btn => {
        btn.classList.remove('active-ok', 'active-partial', 'active-bad');
      });
      const btns = panel.querySelectorAll('.grading-quick-status-btn');
      if (status === 'ok' && btns[0]) btns[0].classList.add('active-ok');
      else if (status === 'partial' && btns[1]) btns[1].classList.add('active-partial');
      else if (status === 'bad' && btns[2]) btns[2].classList.add('active-bad');
    }
    onQuestionPointsChanged();
  }
}

function setQuestionPointQuick(idx, pt) {
  if (typeof Auth !== 'undefined' && !Auth.canGradeSubmissions()) return;
  const pointEl = document.getElementById(`grade-point-${idx}`);
  if (pointEl) {
    pointEl.value = String(pt);
    onQuestionPointsChanged();
  }
}

function appendQuickQuestionComment(idx, text) {
  if (typeof Auth !== 'undefined' && !Auth.canGradeSubmissions()) return;
  const commentEl = document.getElementById(`grade-comment-${idx}`);
  if (commentEl) {
    const cur = commentEl.value.trim();
    if (!cur) {
      commentEl.value = text;
    } else if (!cur.includes(text)) {
      commentEl.value = cur + ' ' + text;
    }
    commentEl.focus();
  }
}

function applyQuickGeneralFeedback(text) {
  if (typeof Auth !== 'undefined' && !Auth.canGradeSubmissions()) return;
  const feedbackEl = document.getElementById('grade-general-feedback');
  if (feedbackEl) {
    feedbackEl.value = text;
    feedbackEl.focus();
  }
}

function gradeAllQuestionsQuick(status = 'ok') {
  if (typeof Auth !== 'undefined' && !Auth.canGradeSubmissions()) return;
  const history = getAllRawQuizHistory();
  const item = history.find(h => String(h.id) === String(currentViewingHistoryId));
  if (!item || !Array.isArray(item.details)) return;

  item.details.forEach((d, idx) => {
    d.gradeStatus = status;
    const maxPts = (d.maxScore !== undefined && d.maxScore !== null && Number(d.maxScore) > 0)
      ? Number(d.maxScore)
      : 1.0;
    const pointEl = document.getElementById(`grade-point-${idx}`);
    if (pointEl) {
      if (status === 'ok') pointEl.value = String(maxPts);
      else if (status === 'partial') pointEl.value = String(Math.round((maxPts / 2) * 100) / 100);
      else pointEl.value = '0';
    }

    const panel = document.getElementById(`grading-panel-${idx}`);
    if (panel) {
      panel.querySelectorAll('.grading-quick-status-btn').forEach(btn => {
        btn.classList.remove('active-ok', 'active-partial', 'active-bad');
      });
      const btns = panel.querySelectorAll('.grading-quick-status-btn');
      if (status === 'ok' && btns[0]) btns[0].classList.add('active-ok');
      else if (status === 'partial' && btns[1]) btns[1].classList.add('active-partial');
      else if (status === 'bad' && btns[2]) btns[2].classList.add('active-bad');
    }
  });

  autoCalculateTotalPoints(true);
  toast(`Đã áp dụng ${status === 'ok' ? 'điểm tối đa từng câu' : status} cho tất cả ${item.details.length} câu hỏi!`, 'ok');
}

function onQuestionPointsChanged() {
  autoCalculateTotalPoints(true);
}

function autoCalculateTotalPoints(syncInput = true) {
  const pointInputs = document.querySelectorAll('.grade-point-input');
  let sum = 0;
  pointInputs.forEach(inp => {
    sum += parseFloat(inp.value) || 0;
  });
  sum = Math.round(sum * 100) / 100;
  const totalInput = document.getElementById('grade-total-score');
  if (totalInput && syncInput) {
    totalInput.value = String(sum);
  }
  updateGradeRankBadge();
}

function getGradeRankBadge(score, maxScore = 10) {
  const num = parseFloat(score) || 0;
  const max = parseFloat(maxScore) || 10;
  const ratio = max > 0 ? (num / max) : 0;
  let label = 'Cần cố gắng <ion-icon name="alert-circle-outline"></ion-icon>';
  let cls = 'rank-yeu';
  if (ratio >= 0.85) {
    label = 'Xuất sắc / Giỏi <ion-icon name="ribbon-outline"></ion-icon>';
    cls = 'rank-gioi';
  } else if (ratio >= 0.65) {
    label = 'Khá <ion-icon name="thumbs-up-outline"></ion-icon>';
    cls = 'rank-kha';
  } else if (ratio >= 0.50) {
    label = 'Trung bình <ion-icon name="flash-outline"></ion-icon>';
    cls = 'rank-tb';
  }
  return `<span class="history-rank-badge ${cls}">${label}</span>`;
}

function updateGradeRankBadge(maxScore) {
  const totalInput = document.getElementById('grade-total-score');
  const badgeWrap = document.getElementById('grade-rank-badge-wrap');
  if (totalInput && badgeWrap) {
    const history = getAllRawQuizHistory();
    const item = history.find(h => String(h.id) === String(currentViewingHistoryId));
    const details = (item && Array.isArray(item.details)) ? item.details : [];
    const isWriting = item && item.type === 'writing';
    const totalMax = maxScore || (isWriting ? 10.0 : details.reduce((sum, d) => sum + (Number(d.maxScore) || 1.0), 0)) || 10;
    badgeWrap.innerHTML = getGradeRankBadge(parseFloat(totalInput.value) || 0, totalMax);
  }
}

async function saveManualGrading() {
  if (typeof Auth !== 'undefined' && !Auth.canGradeSubmissions()) {
    return toast('Chỉ giáo viên mới có quyền chấm bài và lưu kết quả!', 'bad');
  }
  const history = getAllRawQuizHistory();
  const item = history.find(h => String(h.id) === String(currentViewingHistoryId));
  if (!item) return toast('Không tìm thấy bài làm cần lưu!', 'bad');

  const oldScore = (item.score !== undefined && item.score !== null) ? Number(item.score) : 0;
  const totalScoreInput = document.getElementById('grade-total-score');
  const generalFeedbackInput = document.getElementById('grade-general-feedback');
  const newScore = totalScoreInput ? parseFloat(totalScoreInput.value) || 0 : (item.score || 0);
  const generalFeedback = generalFeedbackInput ? generalFeedbackInput.value.trim() : '';

  if (Array.isArray(item.details)) {
    item.details.forEach((d, idx) => {
      const pointEl = document.getElementById(`grade-point-${idx}`);
      const commentEl = document.getElementById(`grade-comment-${idx}`);
      if (pointEl) d.points = Math.max(0, parseFloat(pointEl.value) || 0);
      if (commentEl) d.teacherComment = commentEl.value.trim();
      d.isGraded = true;
      if (d.gradeStatus === 'ok') d.status = 'ok';
      else if (d.gradeStatus === 'bad') d.status = 'bad';
      else if (d.gradeStatus === 'partial') d.status = 'partial';
      // Lưu nhận xét chung vào detail đầu tiên để đồng bộ qua Supabase jsonb
      if (idx === 0) d.generalTeacherFeedback = generalFeedback;
    });
  }

  const u = typeof Auth !== 'undefined' ? Auth.getCurrentUser() : null;
  const teacherName = u ? (u.full_name || u.username) : 'Giáo viên';

  item.isGraded = true;
  item.score = Math.round(newScore * 100) / 100;
  item.teacherFeedback = generalFeedback;
  item.teacherName = teacherName;
  item.gradedAt = Date.now();
  item.gradedDateStr = new Date().toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });

  // 1. Lưu ngay lập tức vào localStorage để đảm bảo dữ liệu không bị mất
  try {
    localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.error('Failed to save graded history:', e);
  }

  // 2. Chuyển giao diện ra khỏi chế độ chấm điểm và cập nhật thẻ hiển thị
  isHistoryGradingMode = false;
  renderHistoryDetailModalView();
  renderHistoryList();
  if (typeof renderHistoryPage === 'function') renderHistoryPage();

  toast(`🎉 Đã lưu kết quả chấm bài thành công! (Điểm: ${item.score}đ)`, 'ok');

  // 3. Đồng bộ lên đám mây (Supabase)
  try {
    const synced = await saveQuizAttemptToSupabase(item);
    if (synced) {
      const syncBadge = document.getElementById('history-sync-indicator');
      if (syncBadge) syncBadge.textContent = '☁️ Đã lưu đám mây';
    }
  } catch (syncErr) {
    console.warn('Lỗi đồng bộ kết quả chấm lên máy chủ:', syncErr);
  }
}


function closeHistoryDetailModal() {
  const dialog = document.getElementById('history-detail-dialog');
  if (dialog && dialog.open) dialog.close();
}

function copyHistoryDetailText() {
  const history = getQuizHistory();
  const item = history.find(h => String(h.id) === String(currentViewingHistoryId));
  if (!item) return;

  const lines = [
    `=== KẾT QUẢ BÀI LÀM: ${item.setTitle || 'Bài làm'} ===`,
    `Học sinh: ${item.playerName || 'Học sinh'}${item.className ? ' - Lớp: ' + item.className : ''}`,
    `Thời gian làm: ${item.dateStr || ''}`,
    item.isGraded ? `TỔNG ĐIỂM: ${item.score || 0} điểm` : `Điểm số: ${item.score || 0}`,
    item.teacherFeedback ? `Lời phê của giáo viên: ${item.teacherFeedback}` : '',
    '',
    '--- CHI TIẾT TỪNG CÂU HỎI ---'
  ];

  const details = Array.isArray(item.details) ? item.details : [];
  details.forEach((d, idx) => {
    lines.push(`Câu ${idx + 1}: ${d.questionText}`);
    lines.push(`- Trả lời: ${d.userAnswer || '(Để trống)'}`);
    if (d.points !== undefined) lines.push(`- Điểm câu: ${d.points}đ (${d.gradeStatus === 'ok' ? 'Đạt' : d.gradeStatus === 'partial' ? 'Một phần' : 'Chưa đạt'})`);
    if (d.teacherComment) lines.push(`- Nhận xét: ${d.teacherComment}`);
    lines.push('');
  });

  navigator.clipboard.writeText(lines.filter(l => l !== null).join('\n')).then(() => {
    toast('Đã sao chép toàn bộ kết quả bài làm & điểm số vào clipboard!', 'ok');
  }).catch(() => {
    toast('Không thể sao chép tự động.', 'bad');
  });
}




/* =========================================================================
   5. LIBRARY & QUESTION SETS MANAGEMENT
   ========================================================================= */

let currentLibTab = 'lessons';
let currentTopicFilter = '';
let currentLibReadingTopic = '';
let currentLibWritingTopic = '';
let libReadingSearchQuery = '';
let libWritingSearchQuery = '';

const LIB_CARD_PALETTES = [
  'linear-gradient(135deg, #1e293b 0%, #334155 100%)', // Slate Navy
  'linear-gradient(135deg, #312e81 0%, #4338ca 100%)', // Deep Indigo
  'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)', // Deep Teal
  'linear-gradient(135deg, #92400e 0%, #b45309 100%)'  // Warm Bronze
];

const cardHtml = (s, idx = 0) => {
  const bg = LIB_CARD_PALETTES[idx % LIB_CARD_PALETTES.length];
  const qList = Array.isArray(s.qs) ? s.qs : [];
  const qCount = qList.length;
  const mcCount = qList.filter(q => q.type === 'mc' || q.type === 'img').length;
  const shortCount = qList.filter(q => q.type === 'short' || q.type === 'fill').length;
  const tfCount = qList.filter(q => q.type === 'tf').length;
  const matchCount = qList.filter(q => q.type === 'match').length;

  const easyCount = qList.filter(q => q.diff === 'Dễ').length;
  const medCount = qList.filter(q => q.diff === 'Trung bình').length;
  const hardCount = qList.filter(q => q.diff === 'Khó').length;

  const topicName = (s.topic && s.topic.trim()) ? s.topic.trim() : 'Chưa phân loại';

  const blockInfo = (typeof getStudentBlockInfo === 'function') ? getStudentBlockInfo(s, 'quiz') : { blocked: false, isDeadlineExpired: false, isNotYetOpen: false, hasSubmissions: false, message: '' };
  const isBlocked = blockInfo.blocked;
  const attemptBadge = (typeof getSetAttemptBadgeHtml === 'function') ? getSetAttemptBadgeHtml(s, 'quiz') : '';
  const deadlineBadge = (typeof getSetDeadlineBadgeHtml === 'function') ? getSetDeadlineBadgeHtml(s, 'quiz') : '';
  const privacyBadge = (typeof getSetPrivacyBadgeHtml === 'function') ? getSetPrivacyBadgeHtml(s, 'quiz') : '';
  const openAtBadge = (typeof getSetOpenAtBadgeHtml === 'function') ? getSetOpenAtBadgeHtml(s, 'quiz') : '';

  const pills = [];
  if (mcCount) pills.push(`<span class="lib-pill pill-mc"><ion-icon name="list-outline"></ion-icon> ${mcCount} trắc nghiệm</span>`);
  if (shortCount) pills.push(`<span class="lib-pill pill-short"><ion-icon name="create-outline"></ion-icon> ${shortCount} tự luận</span>`);
  if (tfCount) pills.push(`<span class="lib-pill pill-tf"><ion-icon name="checkmark-circle-outline"></ion-icon> ${tfCount} đúng/sai</span>`);
  if (matchCount) pills.push(`<span class="lib-pill pill-match"><ion-icon name="link-outline"></ion-icon> ${matchCount} nối cặp</span>`);
  if (!pills.length) pills.push(`<span class="lib-pill pill-empty"><ion-icon name="alert-circle-outline"></ion-icon> Chưa có câu hỏi</span>`);

  let diffSummary = '';
  if (easyCount || medCount || hardCount) {
    const parts = [];
    if (easyCount) parts.push(`🟢 ${easyCount} dễ`);
    if (medCount) parts.push(`🟡 ${medCount} TB`);
    if (hardCount) parts.push(`🔴 ${hardCount} khó`);
    diffSummary = `<span class="lib-diff-summary" title="Phân bố độ khó">${parts.join(' · ')}</span>`;
  }

  const isSelected = selectedSetIds.has(String(s.id));
  const canEdit = !window.Auth || window.Auth.canEditContent();
  const isTeacherOrAdmin = window.Auth && (window.Auth.isTeacher() || window.Auth.isAdmin());
  const cardOnClick = bulkDeleteMode 
    ? `toggleSetFromCard(event, '${esc(s.id)}')`
    : (canEdit 
        ? `go('edit', '${esc(s.id)}')` 
        : (isBlocked 
            ? (blockInfo.hasSubmissions ? `openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')` : `toast('${esc(blockInfo.message)}', 'bad')`) 
            : `go('setup', '${esc(s.id)}')`));

  return `
<div class="setup-grid-card lib-detailed-card set ${bulkDeleteMode ? 'bulk-selectable' : ''}${isSelected ? ' selected' : ''}" onclick="${cardOnClick}">
  <div class="setup-card-banner lib-card-banner" style="background: ${bg};">
    <div class="setup-card-top-info" style="display:flex; justify-content:space-between; align-items:center; width:100%; gap:6px;">
      ${bulkDeleteMode ? `<label class="set-select lib-set-select" onclick="event.stopPropagation()"><input type="checkbox" data-set-id="${esc(s.id)}" ${isSelected ? 'checked' : ''} onchange="toggleSetSelection(this)"> Chọn xóa</label>` : ''}
      <span class="setup-card-count-pill">${qCount} câu hỏi</span>
      ${openAtBadge ? `<div onclick="event.stopPropagation()">${openAtBadge}</div>` : ''}
    </div>
    <h3 class="setup-card-title">${esc(s.title)}</h3>
    <span class="setup-card-watermark"><ion-icon name="book-outline"></ion-icon></span>
  </div>

  <div class="lib-card-details">
    <div class="lib-card-meta-row">
      <span class="clickable-topic-tag" title="Nhấp để lọc theo thẻ: ${esc(topicName)}" onclick="event.stopPropagation(); setTopicFilter('${esc(topicName)}')"><ion-icon name="pricetag-outline"></ion-icon> ${esc(topicName)}</span>
      ${diffSummary}
    </div>
    ${(privacyBadge || attemptBadge || deadlineBadge) ? `
      <div class="lib-card-badges-row" onclick="event.stopPropagation()">
        ${privacyBadge}${attemptBadge}${deadlineBadge}
      </div>
    ` : ''}

    <div class="lib-card-breakdown">
      ${pills.join('')}
    </div>
  </div>

  <div class="lib-card-actions-box">
    <div class="lib-launch-row">
      ${isBlocked ? (blockInfo.hasSubmissions ? `
        <button class="btn-setup-action lib-launch-btn lib-view-only-btn" type="button" onclick="event.stopPropagation(); openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')">
          <span class="btn-setup-icon"><ion-icon name="eye-outline"></ion-icon></span>
          <span>Xem lại bài làm</span>
        </button>
      ` : `
        <button class="btn-setup-action lib-launch-btn lib-locked-btn" type="button" onclick="event.stopPropagation(); toast('${esc(blockInfo.message)}', 'bad')" title="${esc(blockInfo.message)}">
          <span class="btn-setup-icon"><ion-icon name="${blockInfo.isNotYetOpen ? 'time-outline' : 'lock-closed-outline'}"></ion-icon></span>
          <span>${blockInfo.isNotYetOpen ? 'Chưa mở' : (blockInfo.isDeadlineExpired ? 'Đã hết hạn' : 'Đã khóa')}</span>
        </button>
      `) : `
        <button class="btn-setup-action lib-launch-btn" type="button" onclick="event.stopPropagation(); go('setup', '${esc(s.id)}')">
          <span class="btn-setup-icon"><ion-icon name="play-outline"></ion-icon></span>
          <span>Vào học bài ngay</span>
        </button>
      `}
    </div>

    ${(canEdit || isTeacherOrAdmin) ? `
      <div class="lib-tools-row">
        ${canEdit ? `<button class="lib-mini-tool-btn cy btn-edit-set" type="button" onclick="event.stopPropagation(); go('edit','${esc(s.id)}')" title="Sửa nội dung câu hỏi"><ion-icon name="create-outline"></ion-icon> <span>Sửa</span></button>` : ''}
        <button class="lib-mini-tool-btn gh" type="button" onclick="event.stopPropagation(); openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')" title="Xem lịch sử làm bài của bộ đề này"><ion-icon name="time-outline"></ion-icon> <span>Lịch sử</span></button>
        ${isTeacherOrAdmin ? `<button class="lib-mini-tool-btn au" type="button" onclick="event.stopPropagation(); openSetAttemptLimitModal('quiz', '${esc(s.id)}')" title="Cài đặt số lượt & hạn nộp bài"><ion-icon name="timer-outline"></ion-icon> <span>Giao bài</span></button>` : ''}
        ${canEdit ? `<button class="lib-mini-tool-btn no btn-delete-set" type="button" onclick="event.stopPropagation(); del('${esc(s.id)}')" title="Xóa bộ đề"><ion-icon name="trash-outline"></ion-icon> <span>Xóa</span></button>` : ''}
      </div>
    ` : `
      <div class="lib-tools-row">
        <button class="lib-mini-tool-btn gh" type="button" onclick="event.stopPropagation(); openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')" title="Xem lịch sử bài làm của bạn" style="width:100%;">
          <ion-icon name="time-outline"></ion-icon> <span>Xem lịch sử của bạn</span>
        </button>
      </div>
    `}
  </div>
</div>`;
};

const readingLibCardHtml = (s, idx = 0) => {
  const bg = LIB_CARD_PALETTES[idx % LIB_CARD_PALETTES.length];
  const qList = Array.isArray(s.questions) ? s.questions : [];
  const qCount = qList.length;
  const topic = (s.genre || s.category || 'Đọc hiểu').trim();
  const author = (s.author || '').trim() || 'Khuyết danh';

  const nbCount = qList.filter(q => q.level === 'nhan-biet' || (q.levelName && q.levelName.includes('Nhận biết'))).length;
  const thCount = qList.filter(q => q.level === 'thong-hieu' || (q.levelName && q.levelName.includes('Thông hiểu'))).length;
  const vdCount = qList.filter(q => q.level === 'van-dung' || (q.levelName && q.levelName.includes('Vận dụng'))).length;

  const blockInfo = (typeof getStudentBlockInfo === 'function') ? getStudentBlockInfo(s, 'reading') : { blocked: false, isDeadlineExpired: false, isNotYetOpen: false, hasSubmissions: false, message: '' };
  const isBlocked = blockInfo.blocked;
  const attemptBadge = (typeof getSetAttemptBadgeHtml === 'function') ? getSetAttemptBadgeHtml(s, 'reading') : '';
  const deadlineBadge = (typeof getSetDeadlineBadgeHtml === 'function') ? getSetDeadlineBadgeHtml(s, 'reading') : '';
  const privacyBadge = (typeof getSetPrivacyBadgeHtml === 'function') ? getSetPrivacyBadgeHtml(s, 'reading') : '';
  const openAtBadge = (typeof getSetOpenAtBadgeHtml === 'function') ? getSetOpenAtBadgeHtml(s, 'reading') : '';

  const pills = [];
  if (nbCount) pills.push(`<span class="lib-pill pill-nb">🟢 ${nbCount} Nhận biết</span>`);
  if (thCount) pills.push(`<span class="lib-pill pill-th">🟡 ${thCount} Thông hiểu</span>`);
  if (vdCount) pills.push(`<span class="lib-pill pill-vd">🔴 ${vdCount} Vận dụng</span>`);
  if (!pills.length) pills.push(`<span class="lib-pill pill-empty"><ion-icon name="document-text-outline"></ion-icon> ${qCount} câu hỏi đọc hiểu</span>`);

  const passageSnippet = (s.passage || '').trim().replace(/\r?\n+/g, ' / ');
  const canEdit = !window.Auth || window.Auth.canEditContent();
  const isTeacherOrAdmin = window.Auth && (window.Auth.isTeacher() || window.Auth.isAdmin());
  const cardOnClick = canEdit 
    ? `openEditReadingSetModal('${esc(s.id)}')` 
    : (isBlocked 
        ? (blockInfo.hasSubmissions ? `openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')` : `toast('${esc(blockInfo.message)}', 'bad')`) 
        : `go('reading', '${esc(s.id)}')`);

  return `
<div class="setup-grid-card lib-detailed-card" onclick="${cardOnClick}">
  <div class="setup-card-banner lib-card-banner" style="background: ${bg};">
    <div class="setup-card-top-info" style="display:flex; justify-content:space-between; align-items:center; width:100%; gap:6px;">
      <span class="setup-card-count-pill">${qCount} câu hỏi</span>
      ${openAtBadge ? `<div onclick="event.stopPropagation()">${openAtBadge}</div>` : (s.status === 'draft' ? '<span class="lib-pill pill-draft" style="color:var(--amber); border-color:var(--amber);"><ion-icon name="document-text-outline"></ion-icon> Bản nháp</span>' : '')}
    </div>
    <h3 class="setup-card-title">${esc(s.title)}</h3>
    <span class="setup-card-watermark"><ion-icon name="document-text-outline"></ion-icon></span>
  </div>

  <div class="lib-card-details">
    <div class="lib-card-meta-row">
      <span class="clickable-topic-tag" title="Nhấp để lọc theo chủ đề: ${esc(topic)}" onclick="event.stopPropagation(); setLibReadingTopicFilter('${esc(topic)}')"><ion-icon name="pricetag-outline"></ion-icon> ${esc(topic)}</span>
      <span class="lib-meta-author" title="Tác giả"><ion-icon name="person-outline"></ion-icon> ${esc(author)}</span>
    </div>

    ${(privacyBadge || attemptBadge || deadlineBadge) ? `
      <div class="lib-card-badges-row" onclick="event.stopPropagation()">
        ${privacyBadge}${attemptBadge}${deadlineBadge}
      </div>
    ` : ''}

    <div class="lib-card-breakdown">
      ${pills.join('')}
    </div>

    ${passageSnippet ? `
      <div class="lib-card-preview-box lib-quote-box" title="${esc(passageSnippet)}">
        <span class="lib-quote-icon">“</span>${esc(passageSnippet.slice(0, 95))}${passageSnippet.length > 95 ? '…' : ''}
      </div>
    ` : `
      <div class="lib-card-preview-box mut">
        <span>Chưa có nội dung ngữ liệu trích đoạn.</span>
      </div>
    `}
  </div>

  <div class="lib-card-actions-box">
    <div class="lib-launch-row">
      ${isBlocked ? (blockInfo.hasSubmissions ? `
        <button class="btn-setup-action lib-launch-btn lib-view-only-btn" type="button" onclick="event.stopPropagation(); openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')">
          <span class="btn-setup-icon"><ion-icon name="eye-outline"></ion-icon></span>
          <span>Xem lại bài làm</span>
        </button>
      ` : `
        <button class="btn-setup-action lib-launch-btn lib-locked-btn" type="button" onclick="event.stopPropagation(); toast('${esc(blockInfo.message)}', 'bad')" title="${esc(blockInfo.message)}">
          <span class="btn-setup-icon"><ion-icon name="${blockInfo.isNotYetOpen ? 'time-outline' : 'lock-closed-outline'}"></ion-icon></span>
          <span>${blockInfo.isNotYetOpen ? 'Chưa mở' : (blockInfo.isDeadlineExpired ? 'Đã hết hạn' : 'Đã khóa')}</span>
        </button>
      `) : `
        <button class="btn-setup-action lib-launch-btn" type="button" onclick="event.stopPropagation(); go('reading', '${esc(s.id)}')">
          <span class="btn-setup-icon"><ion-icon name="play-outline"></ion-icon></span>
          <span>Đọc hiểu</span>
        </button>
      `}
    </div>

    ${(canEdit || isTeacherOrAdmin) ? `
      <div class="lib-tools-row">
        ${canEdit ? `<button class="lib-mini-tool-btn cy btn-edit-set" type="button" onclick="event.stopPropagation(); openEditReadingSetModal('${esc(s.id)}')" title="Sửa thông tin đề đọc hiểu"><ion-icon name="create-outline"></ion-icon> <span>Sửa</span></button>` : ''}
        <button class="lib-mini-tool-btn gh" type="button" onclick="event.stopPropagation(); openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')" title="Xem lịch sử làm bài"><ion-icon name="time-outline"></ion-icon> <span>Lịch sử</span></button>
        ${isTeacherOrAdmin ? `<button class="lib-mini-tool-btn au" type="button" onclick="event.stopPropagation(); openSetAttemptLimitModal('reading', '${esc(s.id)}')" title="Cài đặt số lượt & hạn nộp bài"><ion-icon name="timer-outline"></ion-icon> <span>Giao bài</span></button>` : ''}
        ${canEdit ? `<button class="lib-mini-tool-btn no btn-delete-set" type="button" onclick="event.stopPropagation(); deleteReadingSet('${esc(s.id)}'); R.lib();" title="Xóa đề đọc hiểu"><ion-icon name="trash-outline"></ion-icon> <span>Xóa</span></button>` : ''}
      </div>
    ` : `
      <div class="lib-tools-row">
        <button class="lib-mini-tool-btn gh" type="button" onclick="event.stopPropagation(); openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')" title="Xem lịch sử bài làm của bạn" style="width:100%;">
          <ion-icon name="time-outline"></ion-icon> <span>Xem lịch sử của bạn</span>
        </button>
      </div>
    `}
  </div>
</div>`;
};

const writingLibCardHtml = (s, idx = 0) => {
  const bg = LIB_CARD_PALETTES[idx % LIB_CARD_PALETTES.length];
  const secList = Array.isArray(s.sections) ? s.sections : [];
  const secCount = secList.length;
  const topic = (s.categoryName || s.category || 'Luyện viết').trim();
  const promptSnippet = (s.prompt || '').trim();

  const blockInfo = (typeof getStudentBlockInfo === 'function') ? getStudentBlockInfo(s, 'writing') : { blocked: false, isDeadlineExpired: false, isNotYetOpen: false, hasSubmissions: false, message: '' };
  const isBlocked = blockInfo.blocked;
  const attemptBadge = (typeof getSetAttemptBadgeHtml === 'function') ? getSetAttemptBadgeHtml(s, 'writing') : '';
  const deadlineBadge = (typeof getSetDeadlineBadgeHtml === 'function') ? getSetDeadlineBadgeHtml(s, 'writing') : '';
  const privacyBadge = (typeof getSetPrivacyBadgeHtml === 'function') ? getSetPrivacyBadgeHtml(s, 'writing') : '';
  const openAtBadge = (typeof getSetOpenAtBadgeHtml === 'function') ? getSetOpenAtBadgeHtml(s, 'writing') : '';

  const outlineStepsHtml = secList.length ? `
    <div class="lib-outline-stepper">
      ${secList.map((sec, i) => `<span class="lib-step-pill">${i === 0 ? '🟢' : i === 1 ? '🟡' : '🔴'} ${esc(sec.title || 'Phần ' + (i+1))}</span>`).join('<span class="lib-step-arrow">→</span>')}
    </div>
  ` : `<span class="lib-pill pill-empty"><ion-icon name="create-outline"></ion-icon> ${secCount} phần dàn ý</span>`;

  const canEdit = !window.Auth || window.Auth.canEditContent();
  const isTeacherOrAdmin = window.Auth && (window.Auth.isTeacher() || window.Auth.isAdmin());
  const cardOnClick = canEdit 
    ? `editWritingSet('${esc(s.id)}')` 
    : (isBlocked 
        ? (blockInfo.hasSubmissions ? `openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')` : `toast('${esc(blockInfo.message)}', 'bad')`) 
        : `go('writing', '${esc(s.id)}')`);

  return `
<div class="setup-grid-card lib-detailed-card" onclick="${cardOnClick}">
  <div class="setup-card-banner lib-card-banner" style="background: ${bg};">
    <div class="setup-card-top-info" style="display:flex; justify-content:space-between; align-items:center; width:100%; gap:6px;">
      <span class="setup-card-count-pill">${secCount} phần câu hỏi</span>
      ${openAtBadge ? `<div onclick="event.stopPropagation()">${openAtBadge}</div>` : (s.status === 'draft' ? '<span class="lib-pill pill-draft" style="color:var(--amber); border-color:var(--amber);"><ion-icon name="document-text-outline"></ion-icon> Bản nháp</span>' : '')}
    </div>
    <h3 class="setup-card-title">${esc(s.title)}</h3>
    <span class="setup-card-watermark"><ion-icon name="create-outline"></ion-icon></span>
  </div>

  <div class="lib-card-details">
    <div class="lib-card-meta-row">
      <span class="clickable-topic-tag" title="Nhấp để lọc theo chủ đề: ${esc(topic)}" onclick="event.stopPropagation(); setLibWritingTopicFilter('${esc(topic)}')"><ion-icon name="pricetag-outline"></ion-icon> ${esc(topic)}</span>
      <span class="lib-meta-note"><ion-icon name="document-text-outline"></ion-icon> Dàn ý chuẩn</span>
    </div>

    ${(privacyBadge || attemptBadge || deadlineBadge) ? `
      <div class="lib-card-badges-row" onclick="event.stopPropagation()">
        ${privacyBadge}${attemptBadge}${deadlineBadge}
      </div>
    ` : ''}

    <div class="lib-card-breakdown">
      ${outlineStepsHtml}
    </div>

    ${promptSnippet ? `
      <div class="lib-card-preview-box lib-prompt-box" title="${esc(promptSnippet)}">
        <span class="lib-preview-lead">Đề bài:</span> ${esc(promptSnippet.slice(0, 95))}${promptSnippet.length > 95 ? '…' : ''}
      </div>
    ` : `
      <div class="lib-card-preview-box mut">
        <span>Chưa có nội dung đề bài và dàn ý.</span>
      </div>
    `}
  </div>

  <div class="lib-card-actions-box">
    <div class="lib-launch-row">
      ${isBlocked ? (blockInfo.hasSubmissions ? `
        <button class="btn-setup-action lib-launch-btn lib-view-only-btn" type="button" onclick="event.stopPropagation(); openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')">
          <span class="btn-setup-icon"><ion-icon name="eye-outline"></ion-icon></span>
          <span>Xem lại bài làm</span>
        </button>
      ` : `
        <button class="btn-setup-action lib-launch-btn lib-locked-btn" type="button" onclick="event.stopPropagation(); toast('${esc(blockInfo.message)}', 'bad')" title="${esc(blockInfo.message)}">
          <span class="btn-setup-icon"><ion-icon name="${blockInfo.isNotYetOpen ? 'time-outline' : 'lock-closed-outline'}"></ion-icon></span>
          <span>${blockInfo.isNotYetOpen ? 'Chưa mở' : (blockInfo.isDeadlineExpired ? 'Đã hết hạn' : 'Đã khóa')}</span>
        </button>
      `) : `
        <button class="btn-setup-action lib-launch-btn" type="button" onclick="event.stopPropagation(); go('writing', '${esc(s.id)}')">
          <span class="btn-setup-icon"><ion-icon name="play-outline"></ion-icon></span>
          <span>Luyện viết ngay</span>
        </button>
      `}
    </div>

    ${(canEdit || isTeacherOrAdmin) ? `
      <div class="lib-tools-row">
        ${canEdit ? `<button class="lib-mini-tool-btn cy btn-edit-set" type="button" onclick="event.stopPropagation(); editWritingSet('${esc(s.id)}')" title="Sửa đề và dàn ý"><ion-icon name="create-outline"></ion-icon> <span>Sửa</span></button>` : ''}
        <button class="lib-mini-tool-btn gh" type="button" onclick="event.stopPropagation(); openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')" title="Xem lịch sử làm bài"><ion-icon name="time-outline"></ion-icon> <span>Lịch sử</span></button>
        ${isTeacherOrAdmin ? `<button class="lib-mini-tool-btn au" type="button" onclick="event.stopPropagation(); openSetAttemptLimitModal('writing', '${esc(s.id)}')" title="Cài đặt số lượt & hạn nộp bài"><ion-icon name="timer-outline"></ion-icon> <span>Giao bài</span></button>` : ''}
        ${canEdit ? `<button class="lib-mini-tool-btn no btn-delete-set" type="button" onclick="event.stopPropagation(); deleteWritingSet('${esc(s.id)}'); setTimeout(() => R.lib(), 100);" title="Xóa đề"><ion-icon name="trash-outline"></ion-icon> <span>Xóa</span></button>` : ''}
      </div>
    ` : `
      <div class="lib-tools-row">
        <button class="lib-mini-tool-btn gh" type="button" onclick="event.stopPropagation(); openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')" title="Xem lịch sử bài làm của bạn" style="width:100%;">
          <ion-icon name="time-outline"></ion-icon> <span>Xem lịch sử của bạn</span>
        </button>
      </div>
    `}
  </div>
</div>`;
};

function setTopicFilter(topic) {
  topic = String(topic || '').trim();
  if (currentTopicFilter.toLowerCase() === topic.toLowerCase()) {
    currentTopicFilter = ''; // toggle off back to all
  } else {
    currentTopicFilter = topic;
  }
  R.lib();
}

function onLibSearchInput() {
  const input = $('#lf');
  const clearBtn = $('#lf-clear');
  if (clearBtn && input) {
    clearBtn.hidden = !input.value.trim();
  }
  R.lib();
}

function clearLibSearch() {
  const input = $('#lf');
  if (input) input.value = '';
  const clearBtn = $('#lf-clear');
  if (clearBtn) clearBtn.hidden = true;
  R.lib();
  input?.focus();
}

function renderTopicChips(allSets, filteredSets) {
  const container = $('#topic-chips-bar');
  if (!container) return;

  const topicCounts = {};
  allSets.forEach(s => {
    const t = (s.topic && s.topic.trim()) ? s.topic.trim() : 'Chưa phân loại';
    topicCounts[t] = (topicCounts[t] || 0) + 1;
  });

  const uniqueTopics = Object.keys(topicCounts).sort((a, b) => {
    if (a === 'Chưa phân loại') return 1;
    if (b === 'Chưa phân loại') return -1;
    return a.localeCompare(b, 'vi');
  });

  let chipsHtml = `
    <button type="button" class="topic-chip ${!currentTopicFilter ? 'active' : ''}" onclick="setTopicFilter('')" role="tab" aria-selected="${!currentTopicFilter}">
      <span><ion-icon name="pricetag-outline"></ion-icon> Tất cả</span>
      <span class="topic-chip-count">${allSets.length}</span>
    </button>
  `;

  uniqueTopics.forEach(top => {
    const isActive = currentTopicFilter && currentTopicFilter.toLowerCase() === top.toLowerCase();
    const count = topicCounts[top];
    chipsHtml += `
      <button type="button" class="topic-chip ${isActive ? 'active' : ''}" onclick="setTopicFilter('${esc(top)}')" role="tab" aria-selected="${isActive}">
        <span>${esc(top)}</span>
        <span class="topic-chip-count">${count}</span>
      </button>
    `;
  });

  container.innerHTML = chipsHtml;

  const summary = $('#topic-filter-summary');
  if (summary) {
    if (currentTopicFilter) {
      summary.innerHTML = `Đang chọn: <b>${esc(currentTopicFilter)}</b> (${filteredSets.length}/${allSets.length} bộ) · <a href="javascript:void(0)" onclick="setTopicFilter('')" style="color:var(--yellow); text-decoration:underline; font-weight:800;">✕ Xem tất cả</a>`;
    } else {
      summary.textContent = `Tổng cộng: ${allSets.length} bộ câu hỏi`;
    }
  }
}

R.lib = () => {
  $('#lv').hidden = 0; $('#ev').hidden = 1;
  updateLibTabsUI();

  if (currentLibTab === 'reading') {
    renderLibReadingPane();
    return;
  }
  if (currentLibTab === 'writing') {
    renderLibWritingPane();
    return;
  }

  // LESSONS PANE
  const input = $('#lf');
  const f = input ? N(input.value) : '';
  const clearBtn = $('#lf-clear');
  if (clearBtn && input) clearBtn.hidden = !input.value.trim();

  const isStudent = Boolean(window.Auth && window.Auth.isStudent());
  const l = sets.filter(s => {
    if (isStudent && s.privacy === 'private') return false;
    const topic = (s.topic && s.topic.trim()) ? s.topic.trim() : 'Chưa phân loại';
    const matchTopic = !currentTopicFilter || topic.toLowerCase() === currentTopicFilter.toLowerCase();
    const matchText = !f || N(s.title + ' ' + (s.topic || '')).includes(f);
    return matchTopic && matchText;
  });

  renderTopicChips(sets, l);

  if (l.length) {
    $('#lg').innerHTML = l.map(cardHtml).join('');
  } else {
    $('#lg').innerHTML = `
      <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 42px 24px;">
        <div style="font-size: 42px; margin-bottom: 12px; color: var(--mut);"><ion-icon name="search-outline"></ion-icon></div>
        <h3 style="margin-bottom: 8px;">Không tìm thấy bộ bài học nào</h3>
        <p style="color: var(--mut); margin-bottom: 18px; max-width: 480px; margin-left: auto; margin-right: auto;">
          ${currentTopicFilter ? `Không có bộ bài học nào thuộc thẻ "<b>${esc(currentTopicFilter)}</b>"${f ? ` với từ khóa "<b>${esc(input.value)}</b>"` : ''}.` : `Không tìm thấy bộ bài học nào khớp với từ khóa "<b>${esc(input ? input.value : '')}</b>".`}
        </p>
        <button class="btn au sm" onclick="clearLibSearch(); setTopicFilter('');"><ion-icon name="refresh-outline"></ion-icon> Hiển thị tất cả bộ bài học</button>
      </div>`;
  }
  updateBulkDeleteButton();
};

function updateBulkDeleteButton() {
  selectedSetIds.forEach(id => {
    if (!sets.some(set => String(set.id) === id)) selectedSetIds.delete(id);
  });
  $('#bulk-delete-start').hidden = bulkDeleteMode;
  $('#bulk-delete-actions').hidden = !bulkDeleteMode;
  const button = $('#bulk-delete');
  button.textContent = `🗑️ Xóa đã chọn (${selectedSetIds.size})`;
  button.disabled = selectedSetIds.size === 0;
}

function enableBulkDeleteMode() {
  if (window.Auth && !window.Auth.canEditContent()) {
    return toast('Học sinh không có quyền xóa bộ đề!', 'bad');
  }
  bulkDeleteMode = true;
  R.lib();
}

function cancelBulkDeleteMode() {
  bulkDeleteMode = false;
  selectedSetIds.clear();
  R.lib();
}

function toggleSetSelection(checkbox) {
  const id = String(checkbox.dataset.setId);
  setSetSelected(id, checkbox.checked);
}

function toggleSetFromCard(event, id) {
  if (!bulkDeleteMode || event.target.closest('button, input, label')) return;
  const checkbox = event.currentTarget.querySelector('.set-select input');
  setSetSelected(id, !selectedSetIds.has(String(id)));
  checkbox.checked = selectedSetIds.has(String(id));
}

function setSetSelected(id, selected) {
  id = String(id);
  if (selected) selectedSetIds.add(id);
  else selectedSetIds.delete(id);
  const card = document.querySelector(`.set-select input[data-set-id="${CSS.escape(id)}"]`)?.closest('.set');
  if (card) card.classList.toggle('selected', selected);
  updateBulkDeleteButton();
}

function deleteSelectedSets() {
  const ids = new Set(selectedSetIds);
  if (!ids.size) return;
  ask(`Bạn có chắc chắn muốn xóa ${ids.size} bộ câu hỏi đã chọn?`, async () => {
    const results = await archiveQuestionSets([...ids]);
    const deletedIds = new Set(results.filter(result => !result.error).map(result => result.id));
    sets = sets.filter(set => !deletedIds.has(String(set.id)));
    selectedSetIds.clear();
    bulkDeleteMode = false;
    if (deletedIds.size) save();
    R.lib();
    const failed = results.filter(result => result.error);
    if (failed.length) {
      failed.forEach(result => console.error(`Could not delete question set ${result.id}:`, result.error));
      toast(`Đã xóa ${deletedIds.size}/${ids.size} bộ. ${failed.length} bộ chưa xóa được; hãy thử lại.`, 'bad');
    } else {
      toast(`Đã xóa ${deletedIds.size} bộ câu hỏi.`, 'ok');
    }
  });
}

function newSet() {
  if (window.Auth && !window.Auth.canEditContent()) {
    return toast('Học sinh không có quyền tạo bộ đề mới! Vui lòng đăng nhập tài khoản Giáo viên.', 'bad');
  }
  const s = { id: uid(), emo: '📖', title: 'Bộ câu hỏi mới', topic: '', qs: [] };
  sets.unshift(s); save(); go('edit', s.id);
}

function dup(id) {
  if (window.Auth && !window.Auth.canEditContent()) {
    return toast('Học sinh không có quyền sao chép bộ đề! Vui lòng đăng nhập tài khoản Giáo viên.', 'bad');
  }
  const s = sets.find(x => x.id == id);
  if (!s) return;
  sets.unshift({ ...JSON.parse(JSON.stringify(s)), id: uid(), title: s.title + ' (Bản sao)' });
  save(); R.lib(); toast('Đã sao chép bộ câu hỏi!', 'ok');
}

function del(id) {
  if (window.Auth && !window.Auth.canEditContent()) {
    return toast('Học sinh không có quyền xóa bộ đề! Vui lòng đăng nhập tài khoản Giáo viên.', 'bad');
  }
  ask('Bạn có chắc chắn muốn xóa bộ câu hỏi này?', async () => {
    const [result] = await archiveQuestionSets([id]);
    if (result.error) {
      console.error(`Could not delete question set ${result.id}:`, result.error);
      toast('Không xóa được bộ câu hỏi đã lưu trên máy chủ; hãy thử lại.', 'bad');
      return;
    }
    sets = sets.filter(x => String(x.id) !== String(id));
    selectedSetIds.delete(String(id));
    save(); R.lib();
    toast('Đã xóa bộ câu hỏi.', 'ok');
  });
}

function meta() {
  if (!CS) return;
  CS.title = $('#et').value;
  CS.topic = $('#ec').value;
  const limitInp = $('#set-max-attempts');
  if (limitInp) {
    const lim = Math.max(0, parseInt(limitInp.value, 10) || 0);
    CS.maxAttempts = lim;
    if (typeof getSetAttemptLimitsMap === 'function' && typeof saveSetAttemptLimitsMap === 'function') {
      const map = getSetAttemptLimitsMap();
      map[String(CS.id)] = lim;
      saveSetAttemptLimitsMap(map);
    }
  }
  const deadlineInp = $('#set-deadline');
  if (deadlineInp) {
    const dl = (deadlineInp.value || '').trim();
    CS.deadline = dl;
    if (typeof getSetDeadlinesMap === 'function' && typeof saveSetDeadlinesMap === 'function') {
      const dMap = getSetDeadlinesMap();
      if (dl) dMap[String(CS.id)] = dl;
      else delete dMap[String(CS.id)];
      saveSetDeadlinesMap(dMap);
    }
  }
  const privacyInp = $('#set-privacy');
  if (privacyInp) {
    const priv = (privacyInp.value || 'public').trim();
    CS.privacy = priv;
    if (typeof getSetPrivacyMap === 'function' && typeof saveSetPrivacyMap === 'function') {
      const pMap = getSetPrivacyMap();
      pMap[String(CS.id)] = priv;
      saveSetPrivacyMap(pMap);
    }
  }
  const openAtInp = $('#set-open-at');
  if (openAtInp) {
    const oa = (openAtInp.value || '').trim();
    CS.openAt = oa;
    if (typeof getSetOpenAtMap === 'function' && typeof saveSetOpenAtMap === 'function') {
      const oMap = getSetOpenAtMap();
      if (oa) oMap[String(CS.id)] = oa;
      else delete oMap[String(CS.id)];
      saveSetOpenAtMap(oMap);
    }
  }
  save();
}

function renderHomeSets() {
  const container = $('#home-sets-container');
  if (!container) return;
  
  const isStudent = (typeof Auth !== 'undefined' && Auth.isStudent());
  const validSets = (sets || []).filter(s => {
    if (String(s.id).startsWith('set_')) return false;
    if (isStudent && typeof isSetPrivate === 'function' && isSetPrivate(s, 'quiz')) return false;
    return true;
  });
  
  if (!validSets.length) {
    container.innerHTML = `
      <div class="empty-sets-card">
        <span class="empty-icon"><ion-icon name="book-outline"></ion-icon></span>
        <h3 style="margin:8px 0;">Chưa có bộ câu hỏi nào</h3>
        <p class="mut" style="margin:0 0 16px;">Hãy tạo bộ câu hỏi đầu tiên của bạn để bắt đầu ôn tập!</p>
        <button class="btn au" onclick="newSet()"><ion-icon name="add-outline"></ion-icon> Tạo bộ đề ngay</button>
      </div>`;
    return;
  }

  const colorClasses = ['set-card-coral', 'set-card-emerald', 'set-card-violet', 'set-card-amber', 'set-card-cyan'];
  
  container.innerHTML = validSets.slice(0, 8).map((s, idx) => {
    const qCount = s.qs ? s.qs.length : 0;
    const mcCount = s.qs ? s.qs.filter(q => q.type === 'mc' || q.type === 'img').length : 0;
    const shortCount = s.qs ? s.qs.filter(q => q.type === 'short' || q.type === 'fill').length : 0;
    const tfCount = s.qs ? s.qs.filter(q => q.type === 'tf').length : 0;
    const matchCount = s.qs ? s.qs.filter(q => q.type === 'match').length : 0;
    
    const parts = [];
    if (mcCount) parts.push(`${mcCount} trắc nghiệm`);
    if (shortCount) parts.push(`${shortCount} tự luận`);
    if (tfCount) parts.push(`${tfCount} đúng/sai`);
    if (matchCount) parts.push(`${matchCount} nối`);
    const details = parts.length ? parts.join(' · ') : 'Chưa có câu hỏi';
    
    const colorClass = colorClasses[idx % colorClasses.length];
    
    const blockInfo = (typeof getStudentBlockInfo === 'function') ? getStudentBlockInfo(s, 'quiz') : { blocked: false, isDeadlineExpired: false, isNotYetOpen: false, hasSubmissions: false, message: '' };
    const attemptBadge = (typeof getSetAttemptBadgeHtml === 'function') ? getSetAttemptBadgeHtml(s, 'quiz') : '';
    const deadlineBadge = (typeof getSetDeadlineBadgeHtml === 'function') ? getSetDeadlineBadgeHtml(s, 'quiz') : '';
    const privacyBadge = (typeof getSetPrivacyBadgeHtml === 'function') ? getSetPrivacyBadgeHtml(s, 'quiz') : '';
    const openAtBadge = (typeof getSetOpenAtBadgeHtml === 'function') ? getSetOpenAtBadgeHtml(s, 'quiz') : '';

    return `
      <div class="cartoon-set-card ${colorClass}" onclick="startSetStudy('${esc(s.id)}')">
        <div class="set-card-glow"></div>
        <div class="set-card-top">
          <span class="set-card-emoji"><ion-icon name="book-outline"></ion-icon></span>
          <span class="set-card-tag"><ion-icon name="pricetag-outline"></ion-icon> ${esc(s.topic || 'Chưa phân loại')}</span>
        </div>
        <h3 class="set-card-title">${esc(s.title)}</h3>
        <p class="set-card-meta"><ion-icon name="document-text-outline"></ion-icon> <b>${qCount}</b> câu hỏi (${details})</p>
        ${(privacyBadge || openAtBadge || attemptBadge || deadlineBadge) ? `<div style="display:flex; flex-wrap:wrap; gap:6px; margin:6px 0 10px;" onclick="event.stopPropagation()">${privacyBadge}${openAtBadge}${attemptBadge}${deadlineBadge}</div>` : ''}
        <div class="set-card-footer">
          ${blockInfo.blocked 
            ? (blockInfo.hasSubmissions 
                ? `<span class="set-card-btn" style="background:#475569;"><ion-icon name="eye-outline"></ion-icon> Xem lại bài làm →</span>`
                : `<span class="set-card-btn" style="background:#94a3b8;"><ion-icon name="${blockInfo.isNotYetOpen ? 'time-outline' : 'lock-closed-outline'}"></ion-icon> ${blockInfo.isNotYetOpen ? 'Chưa mở' : (blockInfo.isDeadlineExpired ? 'Đã hết hạn nộp' : 'Đã khóa')}</span>`)
            : `<span class="set-card-btn"><ion-icon name="play-outline"></ion-icon> Vào bài học ngay →</span>`}
        </div>
      </div>
    `;
  }).join('');
}

function startSetStudy(id) {
  if (!id) return;
  const s = sets.find(x => String(x.id) === String(id));
  if (!s) return;
  if (typeof isStudentEntryBlocked === 'function' && isStudentEntryBlocked(s, 'quiz')) {
    const info = (typeof getStudentBlockInfo === 'function') ? getStudentBlockInfo(s, 'quiz') : { hasSubmissions: false, message: 'Bộ đề này đã khóa đối với bạn!' };
    toast(info.message, 'bad');
    if (info.hasSubmissions) {
      openHistoryForSet(s.id, s.title);
    }
    return;
  }
  go('setup', s.id);
}

/* =========================================================================
   LIBRARY 3-TAB SWITCHER & PANE RENDERERS (BÀI HỌC, ĐỌC HIỂU, VIẾT)
   ========================================================================= */

function switchLibTab(tab) {
  currentLibTab = tab;
  try { sessionStorage.setItem('vq_lib_tab', tab); } catch (e) {}
  updateLibTabsUI();
  R.lib();
}

function updateLibTabsUI() {
  try {
    const saved = sessionStorage.getItem('vq_lib_tab');
    if (saved && ['lessons', 'reading', 'writing'].includes(saved)) {
      currentLibTab = saved;
    }
  } catch (e) {}

  document.querySelectorAll('.lib-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === currentLibTab);
  });
  document.querySelectorAll('.lib-tab-pane').forEach(pane => {
    pane.classList.toggle('active', pane.id === `lib-pane-${currentLibTab}`);
  });

  // 1. Lessons Badge
  const validLessonSets = (sets || []).filter(s => !String(s.id).startsWith('set_'));
  const lessonBadge = $('#lib-lessons-badge');
  if (lessonBadge) lessonBadge.textContent = validLessonSets.length;

  // 2. Reading Badge
  if (typeof readingSets === 'undefined' || !readingSets.length) {
    if (typeof loadReadingData === 'function') loadReadingData();
  }
  const readingBadge = $('#lib-reading-badge');
  if (readingBadge && typeof readingSets !== 'undefined') {
    readingBadge.textContent = readingSets.length;
  }

  // 3. Writing Badge
  if (typeof writingSets === 'undefined' || !writingSets.length) {
    if (typeof loadWritingSets === 'function') loadWritingSets();
  }
  const writingBadge = $('#lib-writing-badge');
  if (writingBadge && typeof writingSets !== 'undefined') {
    writingBadge.textContent = writingSets.length;
  }
}

// --- READING PANE LOGIC ---
function onLibReadingSearchInput() {
  libReadingSearchQuery = ($('#lib-reading-search')?.value || '').trim().toLowerCase();
  renderLibReadingPane();
}

function setLibReadingTopicFilter(top) {
  top = String(top || '').trim();
  currentLibReadingTopic = currentLibReadingTopic.toLowerCase() === top.toLowerCase() ? '' : top;
  renderLibReadingPane();
}

function renderLibReadingPane() {
  if (typeof loadReadingData === 'function' && (!readingSets || !readingSets.length)) {
    loadReadingData();
  }
  const container = $('#lib-reading-grid');
  const chipsBar = $('#lib-reading-chips-bar');
  const summaryEl = $('#lib-reading-topic-summary');
  if (!container) return;

  const allSets = Array.isArray(readingSets) ? readingSets : [];

  // Render Topic Chips
  if (chipsBar) {
    const catMap = new Map();
    allSets.forEach(s => {
      const c = (s.genre || s.category || 'Chưa phân loại').trim();
      catMap.set(c, (catMap.get(c) || 0) + 1);
    });

    const isAll = !currentLibReadingTopic;
    let chipsHtml = `
      <button class="topic-chip ${isAll ? 'active' : ''}" type="button" onclick="setLibReadingTopicFilter('')">
        <span>Tất cả</span> <span class="topic-chip-count">${allSets.length}</span>
      </button>
    `;
    catMap.forEach((count, cat) => {
      const isActive = currentLibReadingTopic.toLowerCase() === cat.toLowerCase();
      chipsHtml += `
        <button class="topic-chip ${isActive ? 'active' : ''}" type="button" onclick="setLibReadingTopicFilter('${esc(cat)}')">
          <span>${esc(cat)}</span> <span class="topic-chip-count">${count}</span>
        </button>
      `;
    });
    chipsBar.innerHTML = chipsHtml;
    if (summaryEl) {
      summaryEl.textContent = isAll ? `Tổng cộng: ${allSets.length} đề` : `Đang lọc: "${currentLibReadingTopic}"`;
    }
  }

  // Filter Sets
  const isStudent = Boolean(window.Auth && window.Auth.isStudent());
  const filtered = allSets.filter(s => {
    if (isStudent && s.status === 'draft') return false;
    if (isStudent && s.privacy === 'private') return false;
    const top = (s.genre || s.category || 'Chưa phân loại').trim();
    if (currentLibReadingTopic && top.toLowerCase() !== currentLibReadingTopic.toLowerCase()) {
      return false;
    }
    if (libReadingSearchQuery) {
      const hay = (String(s.title) + ' ' + String(s.author) + ' ' + String(s.genre) + ' ' + String(s.category)).toLowerCase();
      if (!hay.includes(libReadingSearchQuery)) return false;
    }
    return true;
  });

  if (!filtered.length) {
    container.innerHTML = `
      <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 42px 24px;">
        <div style="font-size: 42px; margin-bottom: 12px; color: var(--mut);"><ion-icon name="document-text-outline"></ion-icon></div>
        <h3 style="margin-bottom: 8px;">Không tìm thấy đề đọc hiểu nào</h3>
        <p style="color: var(--mut); margin-bottom: 18px;">Hãy thử tìm kiếm với từ khóa khác hoặc tạo thêm đề đọc hiểu mới.</p>
        <button class="btn au sm" onclick="openCreateReadingSetModal()"><ion-icon name="add-outline"></ion-icon> Thêm đề đọc hiểu mới</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((s, idx) => readingLibCardHtml(s, idx)).join('');
}

// --- WRITING PANE LOGIC ---
function onLibWritingSearchInput() {
  libWritingSearchQuery = ($('#lib-writing-search')?.value || '').trim().toLowerCase();
  renderLibWritingPane();
}

function setLibWritingTopicFilter(top) {
  top = String(top || '').trim();
  currentLibWritingTopic = currentLibWritingTopic.toLowerCase() === top.toLowerCase() ? '' : top;
  renderLibWritingPane();
}

function renderLibWritingPane() {
  if (typeof loadWritingSets === 'function' && (!writingSets || !writingSets.length)) {
    loadWritingSets();
  }
  const container = $('#lib-writing-grid');
  const chipsBar = $('#lib-writing-chips-bar');
  const summaryEl = $('#lib-writing-topic-summary');
  if (!container) return;

  const allSets = Array.isArray(writingSets) ? writingSets : [];

  // Render Topic Chips
  if (chipsBar) {
    const catMap = new Map();
    allSets.forEach(s => {
      const c = (s.categoryName || s.category || 'Chưa phân loại').trim();
      catMap.set(c, (catMap.get(c) || 0) + 1);
    });

    const isAll = !currentLibWritingTopic;
    let chipsHtml = `
      <button class="topic-chip ${isAll ? 'active' : ''}" type="button" onclick="setLibWritingTopicFilter('')">
        <span>Tất cả</span> <span class="topic-chip-count">${allSets.length}</span>
      </button>
    `;
    catMap.forEach((count, cat) => {
      const isActive = currentLibWritingTopic.toLowerCase() === cat.toLowerCase();
      chipsHtml += `
        <button class="topic-chip ${isActive ? 'active' : ''}" type="button" onclick="setLibWritingTopicFilter('${esc(cat)}')">
          <span>${esc(cat)}</span> <span class="topic-chip-count">${count}</span>
        </button>
      `;
    });
    chipsBar.innerHTML = chipsHtml;
    if (summaryEl) {
      summaryEl.textContent = isAll ? `Tổng cộng: ${allSets.length} đề` : `Đang lọc: "${currentLibWritingTopic}"`;
    }
  }

  // Filter Sets
  const isStudent = Boolean(window.Auth && window.Auth.isStudent());
  const filtered = allSets.filter(s => {
    if (isStudent && s.status === 'draft') return false;
    if (isStudent && s.privacy === 'private') return false;
    const top = (s.categoryName || s.category || 'Chưa phân loại').trim();
    if (currentLibWritingTopic && top.toLowerCase() !== currentLibWritingTopic.toLowerCase()) {
      return false;
    }
    if (libWritingSearchQuery) {
      const hay = (String(s.title) + ' ' + String(s.categoryName) + ' ' + String(s.prompt)).toLowerCase();
      if (!hay.includes(libWritingSearchQuery)) return false;
    }
    return true;
  });

  if (!filtered.length) {
    container.innerHTML = `
      <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 42px 24px;">
        <div style="font-size: 42px; margin-bottom: 12px; color: var(--mut);"><ion-icon name="create-outline"></ion-icon></div>
        <h3 style="margin-bottom: 8px;">Không tìm thấy đề viết nào</h3>
        <p style="color: var(--mut); margin-bottom: 18px;">Hãy thử tìm kiếm với từ khóa khác hoặc tạo thêm đề luyện viết mới.</p>
        <button class="btn au sm" onclick="openCreateWritingSetModal()"><ion-icon name="add-outline"></ion-icon> Thêm đề viết mới</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((s, idx) => writingLibCardHtml(s, idx)).join('');
}


/* =========================================================================
   6. AI PROMPT BUILDER & QUESTION IMPORTER
   ========================================================================= */

const QUESTION_TYPE_LABELS = {
  mc: 'trắc nghiệm (4 lựa chọn)', short: 'trả lời ngắn', fill: 'điền từ vào chỗ trống', tf: 'đúng / sai (4 ý)'
};

const PROMPT_ALL_TYPES = ['mc', 'tf', 'short', 'fill'];

function getPromptTypeCounts() {
  const counts = {};
  PROMPT_ALL_TYPES.forEach(t => {
    const cb = $(`#prompt-type-cb-${t}`);
    const input = $(`#prompt-count-${t}`);
    if (cb && cb.checked && input) {
      counts[t] = Math.max(0, parseInt(input.value) || 0);
    } else {
      counts[t] = 0;
    }
  });
  return counts;
}

function updatePromptSumIndicator() {
  const total = Number($('#prompt-question-count')?.value) || 10;
  const counts = getPromptTypeCounts();
  const sum = Object.values(counts).reduce((a, b) => a + b, 0);

  const indicator = $('#prompt-sum-indicator');
  const badge = $('#prompt-count-status-badge');
  if (!indicator) return sum;

  if (sum === total) {
    indicator.style.background = 'rgba(16, 185, 129, 0.12)';
    indicator.style.color = '#065f46';
    indicator.style.border = '1px solid #10b981';
    indicator.innerHTML = `<span><b>Tổng các dạng:</b> ${sum}/${total} câu (Khớp với số câu bộ đề)</span>`;
    if (badge) {
      badge.textContent = `Khớp ${sum}/${total} câu`;
      badge.style.background = '#d1fae5';
      badge.style.color = '#065f46';
    }
  } else if (sum < total) {
    const diff = total - sum;
    indicator.style.background = 'rgba(245, 158, 11, 0.12)';
    indicator.style.color = '#92400e';
    indicator.style.border = '1px solid #f59e0b';
    indicator.innerHTML = `
      <span><b>Tổng các dạng:</b> ${sum}/${total} câu (Thiếu ${diff} câu)</span>
      <button type="button" class="btn gh sm" onclick="autoDistributePromptTypes()" style="padding:2px 8px; font-size:11px; height:24px;">Bù ${diff} câu</button>
    `;
    if (badge) {
      badge.textContent = `Thiếu ${diff} câu`;
      badge.style.background = '#fef3c7';
      badge.style.color = '#92400e';
    }
  } else {
    const diff = sum - total;
    indicator.style.background = 'rgba(239, 68, 68, 0.12)';
    indicator.style.color = '#991b1b';
    indicator.style.border = '1px solid #ef4444';
    indicator.innerHTML = `
      <span><b>Tổng các dạng:</b> ${sum}/${total} câu (Thừa ${diff} câu)</span>
      <button type="button" class="btn gh sm" onclick="autoDistributePromptTypes()" style="padding:2px 8px; font-size:11px; height:24px;">Cân bằng lại</button>
    `;
    if (badge) {
      badge.textContent = `Thừa ${diff} câu`;
      badge.style.background = '#fee2e2';
      badge.style.color = '#991b1b';
    }
  }
  return sum;
}

function onPromptTotalCountChange() {
  autoDistributePromptTypes();
}

function autoDistributePromptTypes() {
  const total = Number($('#prompt-question-count')?.value) || 10;
  const activeTypes = PROMPT_ALL_TYPES.filter(t => {
    const cb = $(`#prompt-type-cb-${t}`);
    return cb && cb.checked;
  });

  if (!activeTypes.length) {
    const mcCb = $('#prompt-type-cb-mc');
    if (mcCb) mcCb.checked = true;
    activeTypes.push('mc');
  }

  const base = Math.floor(total / activeTypes.length);
  let rem = total % activeTypes.length;

  PROMPT_ALL_TYPES.forEach(t => {
    const input = $(`#prompt-count-${t}`);
    if (activeTypes.includes(t)) {
      const val = base + (rem > 0 ? 1 : 0);
      if (rem > 0) rem--;
      if (input) {
        input.value = val;
        input.disabled = false;
      }
    } else {
      if (input) {
        input.value = 0;
        input.disabled = true;
      }
    }
  });

  updatePromptSumIndicator();
}

function onPromptTypeToggle(type) {
  const cb = $(`#prompt-type-cb-${type}`);
  const input = $(`#prompt-count-${type}`);
  if (!cb || !input) return;

  if (cb.checked) {
    input.disabled = false;
    if (parseInt(input.value) <= 0) {
      input.value = 1;
    }
  } else {
    input.value = 0;
    input.disabled = true;
  }
  updatePromptSumIndicator();
}

function adjustPromptTypeCount(type, delta) {
  const cb = $(`#prompt-type-cb-${type}`);
  const input = $(`#prompt-count-${type}`);
  if (!input) return;

  let current = Math.max(0, parseInt(input.value) || 0);
  let next = Math.max(0, current + delta);
  input.value = next;

  if (cb) {
    if (next > 0) {
      cb.checked = true;
      input.disabled = false;
    } else {
      cb.checked = false;
      input.disabled = true;
    }
  }
  updatePromptSumIndicator();
}

function onPromptTypeCountInput(type) {
  const cb = $(`#prompt-type-cb-${type}`);
  const input = $(`#prompt-count-${type}`);
  if (!input) return;

  let val = Math.max(0, parseInt(input.value) || 0);
  input.value = val;
  if (cb) {
    cb.checked = val > 0;
    input.disabled = val === 0 && !cb.checked;
  }
  updatePromptSumIndicator();
}

function getPromptOptions() {
  const topic = $('#prompt-topic')?.value?.trim() || '';
  const sourceText = $('#prompt-source')?.value?.trim() || '';
  const questionCount = Number($('#prompt-question-count')?.value) || 10;
  const counts = getPromptTypeCounts();
  const sum = Object.values(counts).reduce((a, b) => a + b, 0);

  if (!topic) throw new Error('Vui lòng nhập chủ đề hoặc bài học (Ví dụ: Ông già và biển cả, Vợ nhặt...).');
  if (sum === 0) throw new Error('Vui lòng chọn ít nhất một dạng câu hỏi với số lượng > 0.');
  if (sum !== questionCount) {
    throw new Error(`Tổng số câu theo các dạng (${sum} câu) phải bằng số câu của bộ đề (${questionCount} câu)! Hãy điều chỉnh hoặc nhấn nút "⚡ Chia đều số câu".`);
  }

  const activeTypes = Object.keys(counts).filter(t => counts[t] > 0);
  return { topic, sourceText, questionCount, counts, activeTypes };
}

function openPromptDialog() {
  if (window.Auth && !window.Auth.canEditContent()) {
    return toast('Học sinh không có quyền sử dụng tính năng tạo đề bằng AI! Vui lòng đăng nhập tài khoản Giáo viên.', 'bad');
  }
  if ($('#prompt-topic')) $('#prompt-topic').value = '';
  if ($('#prompt-question-count')) $('#prompt-question-count').value = '10';
  PROMPT_ALL_TYPES.forEach(t => {
    const cb = $(`#prompt-type-cb-${t}`);
    if (cb) cb.checked = true;
  });
  autoDistributePromptTypes();
  if ($('#prompt-source')) $('#prompt-source').value = '';
  if ($('#prompt-output')) $('#prompt-output').value = '';
  if ($('#prompt-result')) $('#prompt-result').value = '';
  updatePromptSourceRequirement();
  $('#prompt-dialog')?.showModal();
  $('#prompt-topic')?.focus();
}

function updatePromptSourceRequirement() {
  const sourceText = ($('#prompt-source')?.value || '').trim();
  const sourceCharacters = Array.from(sourceText).length;
  const guidanceEl = $('#prompt-source-guidance');
  const countEl = $('#prompt-source-count');
  if (!countEl) return;

  if (sourceCharacters === 0) {
    if (guidanceEl) guidanceEl.textContent = '';
    countEl.textContent = 'Chế độ: Kiến thức SGK';
    countEl.style.color = 'var(--cyan)';
  } else {
    if (guidanceEl) guidanceEl.textContent = '';
    countEl.textContent = `Độ dài văn bản: ${sourceCharacters.toLocaleString('vi-VN')} ký tự`;
    countEl.style.color = sourceCharacters >= 30 ? 'var(--green)' : 'var(--gold)';
  }
}

function openExternalAI(tool) {
  const prompt = $('#prompt-output')?.value?.trim() || '';
  if (prompt && navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(prompt).catch(() => {});
  }
  let url = 'https://chatgpt.com';
  let name = 'ChatGPT';
  if (tool === 'gemini') {
    url = 'https://gemini.google.com';
    name = 'Google Gemini';
  } else if (tool === 'claude') {
    url = 'https://claude.ai';
    name = 'Claude AI';
  }
  window.open(url, '_blank');
  toast(`Đang mở ${name}! Bạn hãy dán (Ctrl + V) câu lệnh vào ô trò chuyện.`, 'ok');
}

function buildQuestionPrompt() {
  try {
    const { topic, sourceText, questionCount, counts, activeTypes } = getPromptOptions();

    // Xây dựng danh sách phân bổ dạng câu hỏi chuẩn theo số lượng từng dạng
    const typePlan = [];
    activeTypes.forEach(type => {
      for (let i = 0; i < counts[type]; i++) {
        typePlan.push(type);
      }
    });

    const hasSource = Boolean(sourceText && sourceText.length > 0);

    const typeExamples = [];
    if (counts.mc > 0) {
      typeExamples.push(`[DẠNG TRẮC NGHIỆM 4 PHƯƠNG ÁN - "type": "mc" (Tạo đúng ${counts.mc} câu)]
{
  "type": "mc",
  "c": "Nội dung câu hỏi kiến thức / đọc hiểu rõ ràng?",
  "o": ["Phương án A", "Phương án B", "Phương án C", "Phương án D"],
  "a": 0,
  "e": "Lời giải thích chi tiết, chỉ rõ căn cứ trong tác phẩm: “...”",
  "d": "Dễ"
}
* Quy tắc: "o" gồm đúng 4 phương án dạng chuỗi (KHÔNG tự viết thêm tiền tố "A.", "B.", "C.", "D."). "a" là số nguyên từ 0 đến 3 (0 là đáp án đầu tiên).`);
    }

    if (counts.tf > 0) {
      typeExamples.push(`[DẠNG ĐÚNG / SAI 4 Ý - "type": "tf" (Tạo đúng ${counts.tf} câu)]
{
  "type": "tf",
  "c": "Phát biểu sau đây là đúng?",
  "passage": "Trích đoạn văn bản nếu cần đọc hiểu riêng (hoặc để rỗng \"\")",
  "items": [
    { "text": "Nội dung nhận định a...", "correct": true },
    { "text": "Nội dung nhận định b...", "correct": false },
    { "text": "Nội dung nhận định c...", "correct": true },
    { "text": "Nội dung nhận định d...", "correct": false }
  ],
  "e": "Phân tích cụ thể tính đúng/sai của từng nhận định a, b, c, d kèm trích dẫn: “...”",
  "d": "Trung bình"
}
* Quy tắc: "items" có đúng 4 nhận định (ý a, b, c, d). "correct" BẮT BUỘC là boolean true hoặc false.`);
    }

    if (counts.short > 0) {
      typeExamples.push(`[DẠNG TRẢ LỜI NGẮN - "type": "short" (Tạo đúng ${counts.short} câu)]
{
  "type": "short",
  "c": "Câu hỏi ngắn gọn yêu cầu người học tự điền đáp án ngắn (tên nhân vật, năm, sự kiện, chi tiết...)?",
  "acc": ["Đáp án chuẩn", "Cách viết khác"],
  "e": "Giải thích chi tiết kèm căn cứ bài học: “...”",
  "d": "Trung bình"
}
* Quy tắc: "acc" là mảng các cách diễn đạt đáp án đúng được chấp nhận.`);
    }

    if (counts.fill > 0) {
      typeExamples.push(`[DẠNG ĐIỀN TỪ VÀO CHỖ TRỐNG - "type": "fill" (Tạo đúng ${counts.fill} câu)]
{
  "type": "fill",
  "c": "Câu văn trích dẫn có đúng một vị trí chỗ trống ký hiệu bằng đúng 5 dấu gạch dưới: _____ ",
  "acc": ["Từ cần điền", "Từ đồng nghĩa"],
  "e": "Giải thích chi tiết và trích dẫn nguyên văn câu gốc: “...”",
  "d": "Dễ"
}
* Quy tắc: Trong "c" bắt buộc phải có ký hiệu _____ để biểu thị vị trí cần điền.`);
    }

    const typeBreakdownLines = activeTypes.map(t => {
      return `+ Dạng ${QUESTION_TYPE_LABELS[t]}: đúng ${counts[t]} câu`;
    }).join('\n');

    const contextSection = hasSource
      ? `=== VĂN BẢN NGUỒN CĂN CỨ ===\n<source_text>\n${sourceText}\n</source_text>`
      : `=== CĂN CỨ KIẾN THỨC BÀI HỌC ===\nVì không có văn bản ngữ liệu đính kèm, bạn hãy sử dụng kiến thức chuẩn xác, chính thống về tác phẩm/chủ đề "${topic}" trong SGK Ngữ văn theo Chương trình Giáo dục phổ thông 2018 (tác giả, xuất xứ, hoàn cảnh sáng tác, cốt truyện, nhân vật, chi tiết nghệ thuật, thông điệp tư tưởng).`;

    const authenticityRule = hasSource
      ? `1. TÍNH XÁC THỰC: 100% câu hỏi và đáp án phải có căn cứ trực tiếp trong văn bản nguồn được cung cấp. Giữ đúng tên nhân vật, con số, sự kiện, không bịa đặt.`
      : `1. TÍNH CHUẨN XÁC: 100% câu hỏi và đáp án phải bám sát nội dung bài học/tác phẩm "${topic}" theo chuẩn kiến thức kỹ năng môn Ngữ văn. Không bịa đặt tình tiết.`;

    const promptText = `Bạn là một chuyên gia khảo thí và biên soạn câu hỏi kiểm tra đánh giá môn Ngữ Văn (theo Chương trình Giáo dục phổ thông mới). Hãy tạo một bộ câu hỏi ôn tập chất lượng cao về bài học dưới đây.

=== THÔNG TIN BỘ CÂU HỎI ===
- Chủ đề / Bài học: ${topic}
- Tổng số lượng câu hỏi cần tạo: đúng ${questionCount} câu.
- Phân bổ chính xác số lượng từng dạng câu hỏi (BẮT BUỘC TUÂN THỦ ĐÚNG SỐ LƯỢNG NÀY):
${typeBreakdownLines}

=== NGUYÊN TẮC BẮT BUỘC ===
${authenticityRule}
2. CHUẨN MỰC HỌC LIỆU: Câu hỏi rõ ràng, không tối nghĩa, không lặp ý. Độ khó "d" gồm 3 mức: "Dễ" (nhận biết), "Trung bình" (thông hiểu), "Khó" (vận dụng).
3. LỜI GIẢI THÍCH (trường "e"): Phải giải thích cặn kẽ và BẮT BUỘC có ít nhất một đoạn trích dẫn cụ thể đặt trong dấu ngoặc kép cong “...”.
4. KHÔNG TẠO CHẾ ĐỘ CHƠI: Không thêm bất kỳ trường chế độ chơi (game_mode, boss, timer, cấp độ game). Hệ thống chỉ dùng câu hỏi để vào làm bài và trả lời trực tiếp.
5. ĐỊNH DẠNG ĐẦU RA: CHỈ XUẤT RA DUY NHẤT MỘT KHỐI JSON HỢP LỆ (raw JSON), KHÔNG kèm bất kỳ văn bản chào hỏi, lời dẫn hay giải thích nào bên ngoài khối JSON.

=== QUY CHUẨN CÁC DẠNG CÂU HỎI (TRONG MẢNG "qs") ===
${typeExamples.join('\n\n')}

=== CẤU TRÚC JSON ĐẦU RA BẮT BUỘC ===
{
  "title": "Tên bộ câu hỏi ngắn gọn, trang trọng",
  "topic": ${JSON.stringify(topic)},
  "qs": [
    // Danh sách đúng ${questionCount} câu hỏi (gồm đúng ${activeTypes.map(t => `${counts[t]} câu ${QUESTION_TYPE_LABELS[t]}`).join(', ')}) theo cấu trúc mẫu ở trên
  ]
}

${contextSection}`;

    $('#prompt-output').value = promptText;
    $('#prompt-output').focus();
    copyQuestionPrompt(true);
    toast('Đã tạo câu lệnh chi tiết và tự động sao chép! Hãy dán sang ChatGPT / Gemini.', 'ok');
  } catch (error) {
    toast(error.message || 'Không tạo được câu lệnh.', 'bad');
  }
}

async function copyQuestionPrompt(silent = false) {
  const prompt = $('#prompt-output')?.value || '';
  if (!prompt) return !silent && toast('Hãy tạo câu lệnh trước khi sao chép.', 'bad');
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(prompt);
      if (!silent) toast('Đã sao chép câu lệnh thành công!', 'ok');
    } else {
      throw new Error('Clipboard API unavailable');
    }
  } catch (error) {
    $('#prompt-output')?.focus();
    $('#prompt-output')?.select();
    if (!silent) toast('Câu lệnh đã được chọn, hãy nhấn Ctrl+C để sao chép.', 'bad');
  }
}

function extractQuestionFromObj(rawObj, index) {
  if (!rawObj || typeof rawObj !== 'object') return null;
  const num = index + 1;

  // Trích xuất nội dung câu hỏi
  let c = String(
    rawObj.c || rawObj.question || rawObj.content || rawObj.text ||
    rawObj.cau_hoi || rawObj.cauHoi || rawObj.q || rawObj.de_bai || ''
  ).trim();

  // Nếu nội dung câu hỏi bị nhầm là cả khối JSON thô thì bỏ qua
  if (c.startsWith('{') && c.endsWith('}') && (c.includes('"type"') || c.includes('"qs"'))) return null;

  // Xác định dạng câu hỏi
  let rawType = String(rawObj.type || rawObj.dạng || '').toLowerCase();
  let type = 'mc';
  if (rawType === 'tf' || rawType.includes('dung') || rawType.includes('true') || Array.isArray(rawObj.items)) {
    type = 'tf';
  } else if (rawType === 'short' || rawType.includes('ngan') || rawType.includes('short')) {
    type = 'short';
  } else if (rawType === 'fill' || rawType.includes('dien') || rawType.includes('fill') || c.includes('_____')) {
    type = 'fill';
  } else {
    type = 'mc';
  }

  let e = String(
    rawObj.e || rawObj.explanation || rawObj.explain || rawObj.giai_thich ||
    rawObj.loi_giai || rawObj.huong_dan || 'Căn cứ vào kiến thức tác phẩm/bài học.'
  ).trim();

  let d = ['Dễ', 'Trung bình', 'Khó'].includes(rawObj.d || rawObj.difficulty || rawObj.do_kho)
    ? (rawObj.d || rawObj.difficulty || rawObj.do_kho)
    : 'Trung bình';

  const item = {
    id: uid(),
    type,
    c,
    e,
    d
  };

  if (type === 'mc') {
    if (!c) c = `Câu hỏi trắc nghiệm ${num}`;
    item.c = c;
    let o = Array.isArray(rawObj.o) ? rawObj.o
      : Array.isArray(rawObj.options) ? rawObj.options
      : Array.isArray(rawObj.choices) ? rawObj.choices
      : Array.isArray(rawObj.answers) ? rawObj.answers
      : Array.isArray(rawObj.phuong_an) ? rawObj.phuong_an
      : [];

    o = o.map(opt => String(opt).replace(/^[A-Da-d][\.\:\)\s]+/, '').trim()).filter(Boolean);
    while (o.length < 4) o.push(`Phương án ${'ABCD'[o.length] || (o.length + 1)}`);
    if (o.length > 4) o = o.slice(0, 4);
    item.o = o;

    let a = rawObj.a !== undefined ? rawObj.a
      : rawObj.answer !== undefined ? rawObj.answer
      : rawObj.correct !== undefined ? rawObj.correct
      : rawObj.key !== undefined ? rawObj.key
      : rawObj.dap_an_dung;

    if (typeof a === 'string') {
      const upper = a.trim().toUpperCase();
      if (upper === 'A' || upper === '0') a = 0;
      else if (upper === 'B' || upper === '1') a = 1;
      else if (upper === 'C' || upper === '2') a = 2;
      else if (upper === 'D' || upper === '3') a = 3;
      else {
        const found = o.findIndex(opt => opt.toLowerCase() === a.trim().toLowerCase());
        a = found !== -1 ? found : 0;
      }
    } else if (typeof a === 'number') {
      a = Math.min(3, Math.max(0, Math.floor(a)));
    } else {
      a = 0;
    }
    item.a = a;
  } else if (type === 'tf') {
    if (!c) c = 'Phát biểu sau đây là đúng?';
    item.c = c;
    item.passage = typeof rawObj.passage === 'string' ? rawObj.passage.trim() : '';
    let items = Array.isArray(rawObj.items) ? rawObj.items : Array.isArray(rawObj.statements) ? rawObj.statements : [];
    if (items.length) {
      item.items = items.slice(0, 4).map((it, idx) => {
        const text = String(it.text || it.statement || it.c || `Phát biểu ${'abcd'[idx]}`).trim();
        const cor = it.correct === true || it.correct === 'true' || it.correct === 'Đúng' || it.correct === 'đúng' || it.correct === 1;
        return { text, correct: cor };
      });
      while (item.items.length < 4) {
        item.items.push({ text: `Phát biểu nhận định ${'abcd'[item.items.length]}`, correct: true });
      }
    } else {
      item.items = [
        { text: 'Phát biểu nhận định a', correct: true },
        { text: 'Phát biểu nhận định b', correct: false },
        { text: 'Phát biểu nhận định c', correct: true },
        { text: 'Phát biểu nhận định d', correct: false }
      ];
    }
  } else {
    if (!c) c = type === 'fill' ? 'Điền từ thích hợp vào chỗ trống: _____' : `Câu hỏi trả lời ngắn ${num}`;
    item.c = c;
    let acc = rawObj.acc || rawObj.answers || rawObj.a || rawObj.answer;
    if (Array.isArray(acc)) {
      item.acc = acc.map(x => String(x).trim()).filter(Boolean);
    } else if (typeof acc === 'string' && acc.trim()) {
      item.acc = acc.split(/[\|,]/).map(x => x.trim()).filter(Boolean);
    } else {
      item.acc = ['đáp án'];
    }
    if (!item.acc.length) item.acc = ['đáp án'];
  }

  return item;
}

function parseQuestionsFromAnyJson(rawInput) {
  let questions = [];
  let title = '';
  let topic = '';

  let cleaned = rawInput.trim();
  const fence = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fence) cleaned = fence[1].trim();

  // Loại bỏ comments một dòng //... và dấu phẩy thừa
  let noComments = cleaned.replace(/(^|[^:])\/\/[^\r\n]*/g, '$1');
  let noTrailingCommas = noComments.replace(/,\s*([}\]])/g, '$1');

  let parsed = null;
  try {
    parsed = JSON.parse(noTrailingCommas);
  } catch (e1) {
    const firstBrace = noTrailingCommas.indexOf('{');
    const firstBracket = noTrailingCommas.indexOf('[');
    let sliceText = noTrailingCommas;
    if (firstBracket !== -1 && (firstBrace === -1 || firstBracket < firstBrace)) {
      const lastBracket = noTrailingCommas.lastIndexOf(']');
      if (lastBracket > firstBracket) sliceText = noTrailingCommas.substring(firstBracket, lastBracket + 1);
    } else if (firstBrace !== -1) {
      const lastBrace = noTrailingCommas.lastIndexOf('}');
      if (lastBrace > firstBrace) sliceText = noTrailingCommas.substring(firstBrace, lastBrace + 1);
    }
    try {
      parsed = JSON.parse(sliceText);
    } catch (e2) {
      // Tiếp tục xuống bộ bóc tách đối tượng riêng lẻ
    }
  }

  if (parsed && typeof parsed === 'object') {
    if (typeof parsed.title === 'string' && parsed.title.trim()) title = parsed.title.trim();
    if (typeof parsed.topic === 'string' && parsed.topic.trim()) topic = parsed.topic.trim();

    let rawList = null;
    if (Array.isArray(parsed)) {
      rawList = parsed;
    } else {
      const possibleKeys = ['qs', 'questions', 'cau_hoi', 'cauHoi', 'items', 'data', 'list', 'danh_sach', 'quiz', 'de_thi'];
      for (const key of possibleKeys) {
        if (Array.isArray(parsed[key]) && parsed[key].length) {
          rawList = parsed[key];
          break;
        }
      }
      if (!rawList && (parsed.type || parsed.c || parsed.question || parsed.o || parsed.options)) {
        rawList = [parsed];
      }
    }

    if (rawList && Array.isArray(rawList)) {
      rawList.forEach((q, idx) => {
        const item = extractQuestionFromObj(q, idx);
        if (item) questions.push(item);
      });
    }
  }

  // 2. Nếu parse tổng thể không ra câu hỏi, dùng bộ đếm ngoặc nhọn để bóc tách từng JSON Object riêng biệt
  if (!questions.length) {
    const jsonChunks = [];
    let depth = 0;
    let startIdx = -1;
    let inString = false;
    let escapeNext = false;

    for (let i = 0; i < rawInput.length; i++) {
      const ch = rawInput[i];
      if (inString) {
        if (escapeNext) escapeNext = false;
        else if (ch === '\\') escapeNext = true;
        else if (ch === '"') inString = false;
        continue;
      }
      if (ch === '"') { inString = true; continue; }
      if (ch === '{') {
        if (depth === 0) startIdx = i;
        depth++;
      } else if (ch === '}') {
        depth--;
        if (depth === 0 && startIdx !== -1) {
          jsonChunks.push(rawInput.substring(startIdx, i + 1));
          startIdx = -1;
        } else if (depth < 0) {
          depth = 0;
          startIdx = -1;
        }
      }
    }

    for (const chunk of jsonChunks) {
      let cleanChunk = chunk.replace(/,\s*([}\]])/g, '$1');
      try {
        const obj = JSON.parse(cleanChunk);
        if (obj && typeof obj === 'object') {
          if (Array.isArray(obj.qs) || Array.isArray(obj.questions) || Array.isArray(obj.cau_hoi)) {
            const arr = obj.qs || obj.questions || obj.cau_hoi;
            arr.forEach((q) => {
              const item = extractQuestionFromObj(q, questions.length);
              if (item) questions.push(item);
            });
            if (obj.title && !title) title = obj.title;
            if (obj.topic && !topic) topic = obj.topic;
          } else if (obj.c || obj.question || obj.type || obj.o || obj.options) {
            const item = extractQuestionFromObj(obj, questions.length);
            if (item) questions.push(item);
          }
        }
      } catch (err) {
        // Fallback: bóc tách trường bằng biểu thức chính quy (Regex) nếu JSON bị lỗi nháy kép bên trong
        const cMatch = cleanChunk.match(/"(?:c|question|content|text)"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/i);
        const typeMatch = cleanChunk.match(/"type"\s*:\s*"([^"]+)"/i);
        const aMatch = cleanChunk.match(/"(?:a|answer|correct|key)"\s*:\s*([0-3]|"[A-Da-d0-3]")/i);
        const optMatches = cleanChunk.match(/"(?:o|options|choices|answers)"\s*:\s*\[([\s\S]*?)\]/i);

        if (cMatch || optMatches) {
          let cVal = cMatch ? cMatch[1].replace(/\\"/g, '"').trim() : `Câu hỏi trắc nghiệm ${questions.length + 1}`;
          let oList = [];
          if (optMatches) {
            const optStrings = optMatches[1].match(/"([^"\\]*(?:\\.[^"\\]*)*)"/g);
            if (optStrings) oList = optStrings.map(s => s.slice(1, -1).replace(/\\"/g, '"').trim());
          }
          while (oList.length < 4) oList.push(`Phương án ${'ABCD'[oList.length]}`);
          let aVal = aMatch ? parseInt(aMatch[1].replace(/"/g, '')) || 0 : 0;
          const fallbackItem = {
            id: uid(),
            type: typeMatch ? typeMatch[1] : 'mc',
            c: cVal,
            o: oList.slice(0, 4),
            a: Math.min(3, Math.max(0, aVal)),
            e: 'Dựa vào kiến thức bài học.',
            d: 'Trung bình'
          };
          questions.push(fallbackItem);
        }
      }
    }
  }

  return { questions, title, topic };
}

function parseRawTextQuestions(text) {
  if (!text || typeof text !== 'string') return [];
  const trimmed = text.trim();

  // Ngăn chặn tuyệt đối: Không nhận diện các văn bản là JSON hoặc code
  if (trimmed.startsWith('{') || trimmed.startsWith('[') || trimmed.includes('"type":') || trimmed.includes('"qs":') || trimmed.includes('"questions":')) {
    return [];
  }

  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const questions = [];

  const qBlocks = [];
  let currentBlock = [];
  const isQStart = (line) => /^(?:Câu\s*\d+|Bài\s*\d+|\d+[\.\:\)])/i.test(line);

  for (const line of lines) {
    if (isQStart(line) && currentBlock.length > 0) {
      qBlocks.push(currentBlock.join('\n'));
      currentBlock = [line];
    } else {
      currentBlock.push(line);
    }
  }
  if (currentBlock.length > 0) {
    qBlocks.push(currentBlock.join('\n'));
  }

  for (const block of qBlocks) {
    const blockLines = block.split('\n').map(l => l.trim()).filter(Boolean);
    if (!blockLines.length) continue;

    let questionText = blockLines[0].replace(/^(?:Câu\s*\d+[\.\:\)]*|Bài\s*\d+[\.\:\)]*|\d+[\.\:\)])\s*/i, '').trim();
    let options = [];
    let answerIndex = 0;
    let explanation = '';
    let answerText = '';
    let isTf = false;
    let tfItems = [];
    let inOptions = false;

    for (let i = 1; i < blockLines.length; i++) {
      const line = blockLines[i];

      const ansMatch = line.match(/^(?:Đáp\s*án|Key|Answer|Đ\/a)\s*[\:\.]\s*(.*)$/i);
      if (ansMatch) {
        answerText = ansMatch[1].trim();
        continue;
      }
      const expMatch = line.match(/^(?:Lời\s*giải|Giải\s*thích|Explanation|HD|Gợi\s*ý)\s*[\:\.]\s*(.*)$/i);
      if (expMatch) {
        explanation = expMatch[1].trim();
        continue;
      }

      const tfMatch = line.match(/^([a-d])[\.\:\)]\s*(.*?)(?:[\:\-–\s]+(Đúng|Sai|True|False))?$/i);
      if (tfMatch && (/đúng/i.test(questionText) || /sai/i.test(questionText) || tfMatch[3])) {
        isTf = true;
        const stmtText = tfMatch[2].trim();
        const cor = tfMatch[3] ? /đúng|true/i.test(tfMatch[3]) : true;
        tfItems.push({ text: stmtText || `Nhận định ${tfMatch[1]}`, correct: cor });
        continue;
      }

      const optMatch = line.match(/^([A-D])[\.\:\)]\s*(.*)$/i);
      if (optMatch) {
        inOptions = true;
        options.push(optMatch[2].trim());
        continue;
      }

      if (!inOptions && !line.match(/^(?:Đáp|Lời|Giải|HD|Key)/i)) {
        questionText += ' ' + line;
      }
    }

    if (isTf && tfItems.length >= 2) {
      while (tfItems.length < 4) {
        tfItems.push({ text: `Phát biểu ${'abcd'[tfItems.length]}`, correct: false });
      }
      questions.push({
        id: uid(),
        type: 'tf',
        c: questionText || 'Phát biểu sau đây là đúng?',
        passage: '',
        items: tfItems.slice(0, 4),
        e: explanation || 'Căn cứ vào kiến thức tác phẩm.',
        d: 'Trung bình'
      });
      continue;
    }

    if (options.length >= 2) {
      while (options.length < 4) {
        options.push(`Phương án ${'ABCD'[options.length]}`);
      }
      if (options.length > 4) options = options.slice(0, 4);

      if (answerText) {
        const upper = answerText.toUpperCase().trim();
        if (['A', 'B', 'C', 'D'].includes(upper[0])) {
          answerIndex = ['A', 'B', 'C', 'D'].indexOf(upper[0]);
        } else {
          const idx = options.findIndex(opt => opt.toLowerCase() === answerText.toLowerCase());
          if (idx !== -1) answerIndex = idx;
        }
      }

      questions.push({
        id: uid(),
        type: 'mc',
        c: questionText || 'Câu hỏi trắc nghiệm',
        o: options,
        a: answerIndex,
        e: explanation || 'Căn cứ vào kiến thức tác phẩm.',
        d: 'Trung bình'
      });
      continue;
    }

    if (questionText && !questionText.startsWith('{') && !questionText.includes('"type"')) {
      const isFill = questionText.includes('_____') || /điền/i.test(questionText);
      questions.push({
        id: uid(),
        type: isFill ? 'fill' : 'short',
        c: questionText,
        acc: answerText ? [answerText] : ['đáp án'],
        e: explanation || 'Căn cứ vào kiến thức bài học.',
        d: 'Trung bình'
      });
    }
  }

  return questions;
}

function importPromptQuestionSet() {
  if (window.Auth && !window.Auth.canEditContent()) {
    return toast('Học sinh không có quyền nhập bộ câu hỏi!', 'bad');
  }
  try {
    const rawInput = $('#prompt-result')?.value?.trim() || '';
    if (!rawInput) throw new Error('Vui lòng dán kết quả JSON hoặc văn bản câu hỏi từ AI vào ô Bước 3.');

    const defaultTopic = $('#prompt-topic')?.value?.trim() || 'Ngữ văn';
    let questions = [];
    let extractedTitle = '';
    let extractedTopic = defaultTopic;

    // 1. Thử bóc tách qua bộ đọc JSON đa năng
    const jsonResult = parseQuestionsFromAnyJson(rawInput);
    if (jsonResult && jsonResult.questions && jsonResult.questions.length) {
      questions = jsonResult.questions;
      if (jsonResult.title) extractedTitle = jsonResult.title;
      if (jsonResult.topic) extractedTopic = jsonResult.topic;
    }

    // 2. Nếu không bóc tách được từ JSON, thử bộ bóc tách văn bản thô dạng đề thi (Câu 1: A, B, C, D...)
    if (!questions.length) {
      questions = parseRawTextQuestions(rawInput);
    }

    if (!questions.length) {
      throw new Error('Không nhận diện được câu hỏi hợp lệ trong nội dung bạn vừa dán. Hãy kiểm tra lại kết quả từ AI (hỗ trợ cả JSON và văn bản trắc nghiệm Câu 1: A, B, C, D...).');
    }

    const title = extractedTitle || `${extractedTopic} - Bộ câu hỏi`;
    const topic = extractedTopic || defaultTopic;
    const set = { id: uid(), emo: '📖', title, topic, qs: questions };

    sets.unshift(set);
    save();
    $('#prompt-dialog')?.close();
    R.lib();
    go('edit', set.id);
    toast(`🎉 Đã nhập thành công bộ câu hỏi gồm ${questions.length} câu!`, 'ok');
  } catch (error) {
    toast(error.message || 'Không thể nhập dữ liệu. Vui lòng kiểm tra lại phản hồi từ AI.', 'bad');
  }
}


/* =========================================================================
   7. QUESTION EDITOR & EMOJI PICKER
   ========================================================================= */

const EMOJIS = ['📖','📜','📚','✍️','📑','🏛️','🎓',
'🖋️','📝','✒️','🔍','🎯','🏆','🇻🇳','💬','🌏',
'🌿','🔖','📄','🗂️','📊','📌','✨','⭐','🥇',
'🕊️','🏫','📐','💼','📂','📰','🏷️','✏️','📘','📕'];

function initEmojiPicker() {
  const picker = $('#emoji-picker');
  if (!picker) return;
  picker.innerHTML = EMOJIS.map(e =>
    `<button type="button" title="${e}" onclick="selectEmoji('${e}')">${e}</button>`
  ).join('');
}

function toggleEmojiPicker() {
  const picker = $('#emoji-picker');
  if (!picker) return;
  const isOpen = picker.classList.toggle('open');
  const btn = $('#emoji-trigger-btn');
  if (btn) btn.setAttribute('aria-expanded', String(isOpen));
}

function selectEmoji(emoji) {
  if (!CS) return;
  CS.emo = emoji;
  const currentEmo = $('#current-emo');
  if (currentEmo) currentEmo.textContent = emoji;
  $('#emoji-picker').classList.remove('open');
  save();
  toast(`Đã chọn biểu tượng ${emoji}`, 'ok');
}

// Close emoji picker when clicking outside
document.addEventListener('click', e => {
  const picker = $('#emoji-picker');
  if (!picker) return;
  const btn = $('#emoji-trigger-btn');
  if (!picker.contains(e.target) && (!btn || !btn.contains(e.target))) {
    picker.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }
});

function ensureQuestionCompatibility(question) {
  if (!question || question.type !== 'tf') return;
  if (!Array.isArray(question.items) || question.items.length !== 4) {
    question.items = [
      { text: question.c || 'Phát biểu nhận định a', correct: question.a === 0 },
      { text: 'Phát biểu nhận định b', correct: question.a !== 0 },
      { text: 'Phát biểu nhận định c', correct: question.a === 0 },
      { text: 'Phát biểu nhận định d', correct: question.a !== 0 }
    ];
  }
}

R.edit = id => {
  if (window.Auth && !window.Auth.canEditContent()) {
    toast('Học sinh không có quyền chỉnh sửa bộ đề! Vui lòng đăng nhập tài khoản Giáo viên.', 'bad');
    go('lib');
    return;
  }
  $('#lv').hidden = 1; $('#ev').hidden = 0;
  if (!sets.length) newSet();
  CS = sets.find(s => s.id == id) || CS || sets[0];
  $('#et').value = CS.title; $('#ec').value = CS.topic;
  if ($('#set-max-attempts')) {
    $('#set-max-attempts').value = (typeof getSetMaxAttempts === 'function' ? getSetMaxAttempts(CS, 'quiz') : (CS.maxAttempts || 0));
  }
  if ($('#set-deadline')) {
    $('#set-deadline').value = (typeof getSetDeadline === 'function' ? getSetDeadline(CS, 'quiz') : (CS.deadline || ''));
  }
  if ($('#set-privacy')) {
    $('#set-privacy').value = (typeof getSetPrivacy === 'function' ? getSetPrivacy(CS, 'quiz') : (CS.privacy || 'public'));
  }
  if ($('#set-open-at')) {
    $('#set-open-at').value = (typeof getSetOpenAt === 'function' ? getSetOpenAt(CS, 'quiz') : (CS.openAt || ''));
  }
  const currentEmo = $('#current-emo');
  if (currentEmo) currentEmo.textContent = CS.emo || '📖';
  initEmojiPicker();
  $('#ty').innerHTML = Object.entries(T_).filter(([k]) => k !== 'img').map(([k, v]) => `<button class="tab ${k==ET?'on':''}" onclick="setT('${k}')">${v}</button>`).join('');
  resetForm(); renderQs();
};

function setT(t) {
  ET = t;
  document.querySelectorAll('#ty .tab').forEach((b, i) => b.classList.toggle('on', Object.keys(T_).filter(k => k !== 'img')[i] == t));
  document.querySelectorAll('[data-t]').forEach(el => {
    const ts = el.dataset.t.split(' ');
    el.hidden = !ts.includes(t);
  });
  if (t === 'tf') renderTfItemFields();
  if (t === 'mc' || t === 'img') renderOptionFields();
}

function resetForm() {
  EQ = null; $('#eh').textContent = 'Thêm câu hỏi mới'; $('#qsave').textContent = '💾 Thêm câu hỏi vào bộ';
  ['fc', 'fk', 'fp', 'fe', 'fs', 'tf-passage'].forEach(i => {
    const el = $('#' + i);
    if (el) el.value = '';
  });
  $('#fd').value = 'Dễ';
  $('#fi').hidden = 1; $('#fi').src = ''; IMG = null;
  const imageInput = document.querySelector('input[type="file"]');
  if (imageInput) imageInput.value = '';
  setT(ET);
}

function renderTfItemFields(items = null) {
  const container = $('#tf-items-editor');
  if (!container) return;
  const defaultItems = [
    { text: '', correct: true },
    { text: '', correct: false },
    { text: '', correct: true },
    { text: '', correct: false }
  ];
  const list = (items && Array.isArray(items) && items.length === 4) ? items : defaultItems;
  container.innerHTML = list.map((item, index) => {
    const isTrue = item.correct !== false;
    return `
      <div class="tf-editor-row" data-index="${index}">
        <span class="tf-letter-badge">${'abcd'[index]})</span>
        <input type="text" class="tf-item-text" value="${esc(item.text || '')}" placeholder="Nhập nội dung phát biểu ${'abcd'[index]}...">
        <div class="tf-switch-group">
          <button type="button" class="tf-switch-btn tf-switch-true ${isTrue ? 'active' : ''}" onclick="toggleTfEditorItem(${index}, true)">Đúng</button>
          <button type="button" class="tf-switch-btn tf-switch-false ${!isTrue ? 'active' : ''}" onclick="toggleTfEditorItem(${index}, false)">Sai</button>
        </div>
      </div>`;
  }).join('');
}

function toggleTfEditorItem(index, isTrue) {
  const row = document.querySelector(`.tf-editor-row[data-index="${index}"]`);
  if (!row) return;
  const trueBtn = row.querySelector('.tf-switch-true');
  const falseBtn = row.querySelector('.tf-switch-false');
  trueBtn.classList.toggle('active', isTrue);
  falseBtn.classList.toggle('active', !isTrue);
}

function renderOptionFields(options = ['', '', '', '']) {
  const values = Array.from({ length: 4 }, (_, index) => options[index] || '');
  $('#fo').innerHTML = values.map((value, index) => `
    <div class="option-row">
      <span class="option-letter">${'ABCD'[index]}</span>
      <input class="opt-in" placeholder="Phương án ${'ABCD'[index]}" value="${esc(value)}">
    </div>
  `).join('');
}

function pickImg(i) {
  const f = i.files[0];
  if (!f) return;
  if (f.size > 1.5 * 1024 * 1024) return toast('Kích thước ảnh phải nhỏ hơn 1.5MB!', 'bad');
  const r = new FileReader();
  r.onload = e => { IMG = e.target.result; $('#fi').src = IMG; $('#fi').hidden = 0; };
  r.readAsDataURL(f);
}

function renderQs() {
  const f = N($('#ef').value), l = CS.qs.map((q, i) => [q, i]).filter(([q]) => !f || N(q.c).includes(f));
  $('#en').textContent = CS.qs.length + ' câu';
  $('#el').innerHTML = l.length ? l.map(([q, i]) => {
    let extra = '';
    if (q.type === 'tf') {
      ensureQuestionCompatibility(q);
      const itemsHtml = q.items.map((it, itemIdx) => `
        <div class="tf-card-item-row">
          <span class="tf-card-letter">${'abcd'[itemIdx]})</span>
          <span class="tf-card-text">${esc(it.text || 'Chưa nhập nội dung')}</span>
          <div class="tf-card-badges">
            <button type="button" class="tf-quick-btn ${it.correct ? 'btn-is-true' : 'btn-dim'}" onclick="toggleTfQuickAnswer(${i}, ${itemIdx})" title="Bấm để đổi đáp án nhanh">${it.correct ? '✓ Đúng' : '✗ Sai'}</button>
          </div>
        </div>
      `).join('');
      extra = `
        ${q.passage ? `<div class="tf-card-passage">📜 <b>Ngữ liệu:</b> ${esc(q.passage)}</div>` : ''}
        <div class="tf-card-items-wrap">${itemsHtml}</div>
      `;
    } else if (q.o) {
      const options = q.o ? q.o : [];
      const answerIndex = Number(q.a);
      const correctAnswer = Number.isInteger(answerIndex) && answerIndex >= 0 && answerIndex < options.length ? options[answerIndex] : null;
      extra = `
        <div class="option-preview-list">
          ${options.map((option, optionIndex) => `
            <button type="button" class="option-chip ${optionIndex === answerIndex ? 'correct' : ''}" onclick="setCorrectAnswer(${i}, ${optionIndex})" title="Bấm để chọn đáp án đúng cho câu này">
              <b>${'ABCD'[optionIndex]}.</b> ${esc(option)}
            </button>
          `).join('')}
        </div>
        <div class="correct-answer-status ${correctAnswer ? 'is-set' : 'is-missing'}">
          ${correctAnswer ? `Đáp án đúng: ${'ABCD'[answerIndex]}. ${esc(correctAnswer)}` : 'Chưa chọn đáp án đúng cho câu này. Hãy bấm vào một phương án ở trên.'}
        </div>`;
    }
    return `
<div class="card item">
  <div class="hud" style="margin-bottom:8px;">
    <b>#${i+1} · ${q.type === 'tf' ? 'Đúng/Sai (4 ý)' : T_[q.type]}</b>
    <span class="tag">${q.d || 'Dễ'}</span>
    <button class="btn gh sm" style="margin-left:auto;" onclick="qact(${i},'up')" ${i==0?'disabled':''}>↑</button>
    <button class="btn gh sm" onclick="qact(${i},'dn')" ${i==CS.qs.length-1?'disabled':''}>↓</button>
    <button class="btn gh sm" onclick="qact(${i},'ed')">Sửa</button>
    <button class="btn gh sm" onclick="qact(${i},'dl')">Xóa</button>
  </div>
  <div>${esc(q.c)}</div>
  ${q.img ? `<img class="qi" src="${q.img}">` : ''}
  ${extra}
  ${q.e ? `<div class="mut" style="font-size:12px; margin-top:6px;"><b>Giải thích:</b> ${esc(q.e)}</div>` : ''}
</div>`;
  }).join('') : '<p class="mut">Chưa có câu hỏi nào. Dùng form bên phải để thêm câu hỏi đầu tiên!</p>';
}

function toggleTfQuickAnswer(questionIndex, itemIndex) {
  const q = CS.qs[questionIndex];
  if (!q || q.type !== 'tf') return;
  ensureQuestionCompatibility(q);
  q.items[itemIndex].correct = !q.items[itemIndex].correct;
  save();
  renderQs();
  toast(`Đã đổi phát biểu ${'abcd'[itemIndex]} thành ${q.items[itemIndex].correct ? 'ĐÚNG' : 'SAI'}`, 'ok');
}

function setCorrectAnswer(questionIndex, answerIndex) {
  const question = CS.qs[questionIndex];
  if (!question || !question.o || answerIndex < 0 || answerIndex >= question.o.length) return;
  question.a = answerIndex;
  save();
  renderQs();
  toast(`Đã chọn đáp án đúng: ${'ABCD'[answerIndex]}`, 'ok');
}

function qact(i, a) {
  const L = CS.qs, q = L[i];
  if (a == 'dl') {
    ask('Xóa câu hỏi này?', () => { L.splice(i, 1); save(); renderQs(); });
  } else if (a == 'up' && i > 0) {
    [L[i], L[i-1]] = [L[i-1], L[i]]; save(); renderQs();
  } else if (a == 'dn' && i < L.length - 1) {
    [L[i], L[i+1]] = [L[i+1], L[i]]; save(); renderQs();
  } else if (a == 'ed') {
    EQ = q; $('#eh').textContent = 'Sửa câu hỏi #' + (i + 1); $('#qsave').textContent = '💾 Cập nhật câu hỏi';
    $('#fc').value = q.c; $('#fe').value = q.e || ''; $('#fd').value = q.d || 'Dễ'; $('#fs').value = q.s || '';
    if (q.img) { $('#fi').src = q.img; $('#fi').hidden = 0; IMG = q.img; }
    setT(q.type);
    if (q.type == 'tf') {
      ensureQuestionCompatibility(q);
      $('#tf-passage').value = q.passage || '';
      renderTfItemFields(q.items);
    } else if (q.o) {
      renderOptionFields(q.o);
    } else if (q.acc) {
      $('#fk').value = q.acc.join(' | ');
    } else if (q.p) {
      $('#fp').value = q.p.map(x => x[0] + ' | ' + x[1]).join('\n');
    }
  }
}

function saveQ() {
  const t = ET;
  let c = $('#fc').value.trim();
  if (t === 'tf' && !c) {
    c = 'Phát biểu sau đây là đúng?';
  }
  if (!c) return toast('Vui lòng nhập nội dung câu hỏi!', 'bad');
  const wasEditing = Boolean(EQ);
  const q = { id: EQ?.id || uid(), type: t, c, e: $('#fe').value.trim(), d: $('#fd').value, s: $('#fs').value.trim() };
  if (IMG) q.img = IMG;
  if (t == 'mc' || t == 'img') {
    const optionInputs = [...document.querySelectorAll('#fo .opt-in')];
    const options = optionInputs.map(input => input.value.trim());
    if (options.some(option => !option)) return toast('Vui lòng nhập đầy đủ cả 4 phương án trắc nghiệm!', 'bad');
    q.o = options;
    q.a = Number.isInteger(EQ?.a) && EQ.a >= 0 && EQ.a < 4 ? EQ.a : null;
  } else if (t == 'tf') {
    const passage = $('#tf-passage') ? $('#tf-passage').value.trim() : '';
    const itemRows = document.querySelectorAll('.tf-editor-row');
    const items = [];
    let hasEmpty = false;
    itemRows.forEach(row => {
      const text = row.querySelector('.tf-item-text').value.trim();
      const isTrue = row.querySelector('.tf-switch-true').classList.contains('active');
      if (!text) hasEmpty = true;
      items.push({ text, correct: isTrue });
    });
    if (items.length !== 4 || hasEmpty) {
      return toast('Vui lòng nhập đầy đủ nội dung cho cả 4 phát biểu a, b, c, d!', 'bad');
    }
    q.passage = passage;
    q.items = items;
  } else if (t == 'short' || t == 'fill') {
    const k = $('#fk').value.trim();
    if (!k) return toast('Vui lòng nhập ít nhất một đáp án chấp nhận!', 'bad');
    q.acc = k.split('|').map(x => x.trim()).filter(Boolean);
  } else if (t == 'match') {
    const p = lines($('#fp').value).map(l => l.split('|').map(x => x.trim())).filter(x => x.length == 2 && x[0] && x[1]);
    if (p.length < 2) return toast('Cần ít nhất 2 cặp ghép nối hợp lệ!', 'bad');
    q.p = p;
  }
  if (EQ) {
    const idx = CS.qs.findIndex(x => x.id == q.id);
    if (idx != -1) CS.qs[idx] = q;
  } else {
    CS.qs.push(q);
  }
  save(); resetForm(); renderQs();
  toast(wasEditing ? 'Đã cập nhật câu hỏi!' : (t === 'mc' || t === 'img' ? 'Đã thêm câu hỏi! Hãy chọn đáp án đúng ở danh sách bên dưới.' : 'Đã thêm câu hỏi!'), 'ok');
}


/* =========================================================================
   8. GAMEPLAY & STUDENT QUIZ ENGINE
   ========================================================================= */

let currentSetupTopic = 'all';
let setupSearchQuery = '';

const SETUP_PALETTES = [
  'linear-gradient(135deg, #1e293b 0%, #334155 100%)', // Slate Navy
  'linear-gradient(135deg, #312e81 0%, #4338ca 100%)', // Deep Indigo
  'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)', // Deep Teal
  'linear-gradient(135deg, #92400e 0%, #b45309 100%)'  // Warm Bronze
];

function onPlayerInfoChange() {
  const nick = $('#nick')?.value.trim();
  const className = $('#class-name')?.value.trim();
  try {
    if (nick) localStorage.setItem('vq_player_nick', nick);
    if (className) localStorage.setItem('vq_player_class', className);
  } catch (e) {}
}

function onSetupSearchInput() {
  setupSearchQuery = ($('#setup-search')?.value || '').trim().toLowerCase();
  renderSetupSetsGrid();
}

function setSetupTopicFilter(topic) {
  currentSetupTopic = topic;
  renderSetupSetsGrid();
}

function selectAndStartSetupQuiz(id) {
  const s = sets.find(x => String(x.id) === String(id));
  if (s && typeof isStudentEntryBlocked === 'function' && isStudentEntryBlocked(s, 'quiz')) {
    const info = (typeof getStudentBlockInfo === 'function') ? getStudentBlockInfo(s, 'quiz') : { hasSubmissions: false, message: 'Bộ đề này đã khóa đối với bạn!' };
    toast(info.message, 'bad');
    if (info.hasSubmissions) {
      openHistoryForSet(s.id, s.title);
    }
    return;
  }
  openStartQuizModal(id);
}

function openStartQuizModal(id) {
  const s = sets.find(x => String(x.id) === String(id));
  if (!s) return;

  if (typeof isStudentEntryBlocked === 'function' && isStudentEntryBlocked(s, 'quiz')) {
    const info = (typeof getStudentBlockInfo === 'function') ? getStudentBlockInfo(s, 'quiz') : { hasSubmissions: false, message: 'Bộ đề này đã khóa đối với bạn!' };
    toast(info.message, 'bad');
    if (info.hasSubmissions) {
      openHistoryForSet(s.id, s.title);
    }
    return;
  }

  const setIdInput = $('#start-quiz-set-id');
  if (setIdInput) setIdInput.value = s.id;

  const titleEl = $('#start-modal-set-title');
  if (titleEl) titleEl.textContent = s.title;

  const badgeEl = $('#start-modal-set-badge');
  if (badgeEl) badgeEl.textContent = (s.qs ? s.qs.length : 0) + ' câu hỏi';

  const topicEl = $('#start-modal-set-topic');
  if (topicEl) topicEl.textContent = s.topic ? 'Chủ đề: ' + s.topic : '';

  // Điền thông tin học sinh từ tài khoản đang đăng nhập
  const u = (typeof Auth !== 'undefined') ? Auth.getCurrentUser() : null;
  const nickInput = $('#start-nick');
  const classInput = $('#start-class-name');
  if (u) {
    if (nickInput) nickInput.value = u.full_name || u.username;
    if (classInput) classInput.value = u.class_name || '';
  } else {
    try {
      const savedNick = localStorage.getItem('vq_player_nick') || '';
      const savedClass = localStorage.getItem('vq_player_class') || '';
      if (nickInput && savedNick) nickInput.value = savedNick;
      if (classInput && savedClass) classInput.value = savedClass;
    } catch (e) {}
  }

  const dlg = $('#start-quiz-dialog');
  if (dlg) {
    if (!dlg._hasBackdropListener) {
      dlg._hasBackdropListener = true;
      dlg.addEventListener('click', (e) => {
        const rect = dlg.getBoundingClientRect();
        const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height
          && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
        if (!isInDialog) closeStartQuizModal();
      });
    }
    dlg.showModal();
    setTimeout(() => {
      const input = $('#start-nick');
      if (input) {
        input.focus();
        input.select();
      }
    }, 50);
  }
}

function closeStartQuizModal() {
  const dlg = $('#start-quiz-dialog');
  if (dlg && dlg.open) dlg.close();
}

function handleStartQuizSubmit(e) {
  if (e) e.preventDefault();
  const id = $('#start-quiz-set-id')?.value;
  const nick = ($('#start-nick')?.value || '').trim();
  const className = ($('#start-class-name')?.value || '').trim();

  if (!nick) {
    return toast('Vui lòng nhập tên học sinh!', 'bad');
  }

  // Save to localStorage
  try {
    localStorage.setItem('vq_player_nick', nick);
    if (className) localStorage.setItem('vq_player_class', className);
    else localStorage.removeItem('vq_player_class');
  } catch (err) {}

  // Sync to hidden inputs
  if ($('#nick')) $('#nick').value = nick;
  if ($('#class-name')) $('#class-name').value = className;
  if ($('#ss')) $('#ss').value = id;

  updateSetupQuestionCount();
  closeStartQuizModal();

  // Launch quiz
  begin();
}

function renderSetupSetsGrid(selectedId) {
  const container = $('#setup-sets-grid');
  if (!container) return;

  const isStudent = (typeof Auth !== 'undefined' && Auth.isStudent());
  const validSets = (sets || []).filter(s => {
    if (String(s.id).startsWith('set_')) return false;
    if (isStudent && typeof isSetPrivate === 'function' && isSetPrivate(s, 'quiz')) return false;
    return true;
  });

  // 1. Render Topic Chips
  const chipsContainer = $('#setup-topic-chips');
  const summaryEl = $('#setup-topic-summary');
  if (chipsContainer) {
    const topicMap = new Map();
    validSets.forEach(s => {
      const top = (s.topic || 'Chưa phân loại').trim();
      topicMap.set(top, (topicMap.get(top) || 0) + 1);
    });

    const isAll = currentSetupTopic === 'all';
    let chipsHtml = `
      <button class="topic-chip ${isAll ? 'active' : ''}" type="button" onclick="setSetupTopicFilter('all')">
        Tất cả <span class="chip-count">(${validSets.length})</span>
      </button>
    `;

    topicMap.forEach((count, top) => {
      const isActive = currentSetupTopic === top;
      chipsHtml += `
        <button class="topic-chip ${isActive ? 'active' : ''}" type="button" onclick="setSetupTopicFilter('${esc(top)}')">
          ${esc(top)} <span class="chip-count">(${count})</span>
        </button>
      `;
    });

    chipsContainer.innerHTML = chipsHtml;
    if (summaryEl) {
      summaryEl.textContent = isAll ? `(${validSets.length} bộ đề)` : `(Lọc theo "${currentSetupTopic}")`;
    }
  }

  // 2. Filter Sets
  const filteredSets = validSets.filter(s => {
    if (currentSetupTopic !== 'all' && (s.topic || 'Chưa phân loại').trim() !== currentSetupTopic) {
      return false;
    }
    if (setupSearchQuery) {
      const t = (String(s.title) + ' ' + String(s.topic)).toLowerCase();
      if (!t.includes(setupSearchQuery)) return false;
    }
    return true;
  });

  if (!filteredSets.length) {
    container.innerHTML = `
      <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 40px 20px;">
        <span style="font-size: 48px; display: block; margin-bottom: 12px;">📚</span>
        <h3 style="margin: 0 0 8px;">Không tìm thấy bộ đề bài học phù hợp</h3>
        <p class="mut" style="margin: 0;">Hãy thử tìm kiếm với từ khóa khác hoặc tạo thêm câu hỏi tại mục Thư viện.</p>
      </div>
    `;
    return;
  }

  // 3. Render Cards matching the user's reference image
  container.innerHTML = filteredSets.map((s, idx) => {
    const bg = SETUP_PALETTES[idx % SETUP_PALETTES.length];
    const qCount = Array.isArray(s.qs) ? s.qs.length : 0;
    const isSelected = selectedId && String(s.id) === String(selectedId);
    const blockInfo = (typeof getStudentBlockInfo === 'function') ? getStudentBlockInfo(s, 'quiz') : { blocked: false, isDeadlineExpired: false, isNotYetOpen: false, hasSubmissions: false, message: '' };
    const attemptBadge = (typeof getSetAttemptBadgeHtml === 'function') ? getSetAttemptBadgeHtml(s, 'quiz') : '';
    const deadlineBadge = (typeof getSetDeadlineBadgeHtml === 'function') ? getSetDeadlineBadgeHtml(s, 'quiz') : '';
    const privacyBadge = (typeof getSetPrivacyBadgeHtml === 'function') ? getSetPrivacyBadgeHtml(s, 'quiz') : '';
    const openAtBadge = (typeof getSetOpenAtBadgeHtml === 'function') ? getSetOpenAtBadgeHtml(s, 'quiz') : '';
    const topic = (s.topic && s.topic.trim()) ? s.topic.trim() : 'Ngữ văn';

    const cardOnClick = blockInfo.blocked 
      ? (blockInfo.hasSubmissions ? `openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')` : `toast('${esc(blockInfo.message)}', 'bad')`) 
      : `selectAndStartSetupQuiz('${esc(s.id)}')`;

    return `
      <div class="setup-grid-card ${isSelected ? 'selected-card' : ''}" onclick="${cardOnClick}">
        <div class="setup-card-banner" style="background: ${bg};">
          <div class="setup-card-top-info">
            <span class="setup-card-count-pill">${qCount} câu</span>
          </div>
          <h3 class="setup-card-title">${esc(s.title)}</h3>
        </div>
        <div class="setup-card-body">
          <div class="setup-card-topic-row">
            <span class="setup-card-topic" title="${esc(topic)}">
              <ion-icon name="pricetag-outline"></ion-icon> <span>${esc(topic)}</span>
            </span>
          </div>
          ${(privacyBadge || openAtBadge || attemptBadge || deadlineBadge) ? `
            <div class="setup-card-badges-row" onclick="event.stopPropagation()">
              ${privacyBadge}${openAtBadge}${attemptBadge}${deadlineBadge}
            </div>` : ''}
          <div class="setup-card-action-row">
            ${blockInfo.blocked ? (blockInfo.hasSubmissions ? `
              <button class="btn-setup-action lib-view-only-btn" type="button" onclick="event.stopPropagation(); openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')">
                <span class="btn-setup-icon"><ion-icon name="eye-outline"></ion-icon></span>
                <span>Xem lại bài làm</span>
              </button>
            ` : `
              <button class="btn-setup-action lib-locked-btn" type="button" onclick="event.stopPropagation(); toast('${esc(blockInfo.message)}', 'bad')" title="${esc(blockInfo.message)}">
                <span class="btn-setup-icon"><ion-icon name="${blockInfo.isNotYetOpen ? 'time-outline' : 'lock-closed-outline'}"></ion-icon></span>
                <span>${blockInfo.isNotYetOpen ? 'Chưa mở' : (blockInfo.isDeadlineExpired ? 'Đã hết hạn' : 'Đã khóa')}</span>
              </button>
            `) : `
              <button class="btn-setup-action" type="button" onclick="event.stopPropagation(); selectAndStartSetupQuiz('${esc(s.id)}')">
                <span class="btn-setup-icon">▶</span>
                <span>Vào bài học ngay</span>
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function updateSetupQuestionCount() {
  const s = sets.find(x => x.id == $('#ss')?.value);
  const cntDisplay = $('#cnt-display');
  if (!cntDisplay) return;
  const count = s && Array.isArray(s.qs) ? s.qs.length : 0;
  cntDisplay.value = `${count} câu hỏi (Tự động theo bộ đề)`;
}

R.setup = id => {
  const validSets = sets.filter(s => !String(s.id).startsWith('set_'));
  const ss = $('#ss');
  if (ss) {
    ss.innerHTML = validSets.map(s => `<option value="${s.id}" ${s.id == id ? 'selected' : ''}>${esc(s.title)} (${s.qs.length} câu)</option>`).join('');
    if (id) ss.value = id;
  }
  updateSetupQuestionCount();
  try {
    const savedNick = localStorage.getItem('vq_player_nick');
    const savedClass = localStorage.getItem('vq_player_class');
    if (savedNick && $('#nick') && !$('#nick').value) $('#nick').value = savedNick;
    if (savedClass && $('#class-name') && !$('#class-name').value) $('#class-name').value = savedClass;
  } catch (e) {}

  renderSetupSetsGrid(id);
};

function begin() {
  onPlayerInfoChange();
  const selectedId = $('#start-quiz-set-id')?.value || $('#ss')?.value;
  const s = sets.find(x => String(x.id) === String(selectedId)) || sets.find(x => x.id == $('#ss')?.value);
  const nm = ($('#nick')?.value || '').trim();
  if (!nm) return toast('Vui lòng nhập biệt danh!', 'bad');
  if (!s || !s.qs.length) return toast('Bộ câu hỏi này chưa có dữ liệu!', 'bad');

  if (typeof isStudentEntryBlocked === 'function' && isStudentEntryBlocked(s, 'quiz')) {
    const info = (typeof getStudentBlockInfo === 'function') ? getStudentBlockInfo(s, 'quiz') : { hasSubmissions: false, message: 'Bộ đề này đã khóa đối với bạn!' };
    toast(info.message, 'bad');
    if (info.hasSubmissions) {
      openHistoryForSet(s.id, s.title);
    }
    return;
  }
  if (s.qs.some(q => {
    if (q.type === 'tf') {
      ensureQuestionCompatibility(q);
      return !q.items || q.items.length !== 4 || q.items.some(it => typeof it.correct !== 'boolean');
    }
    return q.o && !Number.isInteger(q.a);
  })) {
    return toast('Hãy chọn đáp án đúng cho tất cả câu hỏi trong danh sách câu hỏi.', 'bad');
  }
  
  G = {
    s, m: 'quiz', nm,
    className: $('#class-name').value.trim(),
    qs: [...s.qs].sort(() => Math.random() - .5),
    i: 0, sc: 0, cb: 0, best: 0, ok: 0, bad: 0, no: 0, hp: 100, t0: Date.now(),
    log: [], sec: 0
  };
  go('game'); nextQ();
  if (window.__SECURITY_SHIELD && typeof window.__SECURITY_SHIELD.startExam === 'function') {
    window.__SECURITY_SHIELD.startExam('quiz');
  }
}

const opts = q => q.o || [];

function getQuizScore10() {
  if (!G || !G.qs || !G.qs.length) return 0;
  const total = G.qs.length;
  const score = (G.ok / total) * 10;
  return Math.min(10, Math.max(0, Math.round(score * 10) / 10));
}

function forceSubmitAndExitQuiz() {
  if (!G || !G.qs) {
    go('setup');
    return;
  }
  // Ghi nhận các câu còn lại là bỏ qua
  for (let idx = G.i; idx < G.qs.length; idx++) {
    const q = G.qs[idx];
    if (q && !G.log.some(l => l.q && l.q.id === q.id)) {
      G.bad++;
      G.log.push({
        q,
        st: 'no',
        pts: 0,
        submittedAnswer: 'Chưa làm (Thoát bài làm)',
        correctAnswer: q.type == 'match' ? 'Ghép nối' : (q.o ? `${'ABCD'[q.a]}` : (q.acc || []).join(' / '))
      });
    }
  }
  G.i = G.qs.length;
  toast('Đã nộp bài và ghi nhận 1 lượt làm!', 'ok');
  end();
}
window.forceSubmitAndExitQuiz = forceSubmitAndExitQuiz;

function hud() {
  const scoreEl = $('#hs');
  const score10 = getQuizScore10();
  scoreEl.textContent = `${score10.toFixed(1)}/10đ`;
  const comboEl = $('#hc').parentElement;
  $('#hc').textContent = G.cb;
  if (G.cb >= 3) comboEl.classList.add('combo-hot');
  else comboEl.classList.remove('combo-hot');
  $('#hp').textContent = (G.i + 1) + '/' + G.qs.length;
  $('#pb').style.width = (G.i / G.qs.length * 100) + '%';
  const bossEl = $('#boss');
  if (bossEl) bossEl.hidden = true;
}

function tick() {
  const timerEl = $('#ht');
  if (!timerEl) return;
  timerEl.textContent = '⏱ ' + G.tl + ' giây';
  timerEl.classList.toggle('timer-urgent', G.tl <= Math.ceil(G.sec * 0.25));
  timerEl.classList.toggle('timer-warning', G.tl > Math.ceil(G.sec * 0.25) && G.tl <= Math.ceil(G.sec * 0.5));
}

function advanceAfterFeedback() {
  clearTimeout(feedbackTimeout);
  clearInterval(feedbackCountdown);
  if ($('#feedback-dialog') && $('#feedback-dialog').open) $('#feedback-dialog').close();
  G.i++;
  nextQ();
}

// Global keydown handler
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeMobileMenu();
    return;
  }
  if (!G || G.lock) {
    if (event.key === 'Enter' && $('#feedback-dialog') && $('#feedback-dialog').open) {
      event.preventDefault();
      advanceAfterFeedback();
    }
    return;
  }
  const q = G.qs[G.i];
  if (!q) return;
  const key = event.key;
  if (q.o && ['1', '2', '3', '4'].includes(key)) {
    const idx = parseInt(key) - 1;
    const optButtons = document.querySelectorAll('#q .opt');
    if (optButtons[idx]) {
      event.preventDefault();
      pick(idx);
    }
  } else if (event.key === 'Enter' && (q.type === 'short' || q.type === 'fill')) {
    const input = $('#ans');
    if (input && document.activeElement === input) {
      event.preventDefault();
      sub();
    }
  }
});

function nextQ() {
  if (G.i >= G.qs.length) return end();
  clearTimeout(feedbackTimeout);
  clearInterval(feedbackCountdown);
  if ($('#feedback-dialog') && $('#feedback-dialog').open) $('#feedback-dialog').close();
  const q = G.qs[G.i]; G.lock = 0; $('#fb').innerHTML = ''; hud();
  
  let h = `<span class="tag">${q.type === 'tf' ? 'Đúng/Sai (4 ý)' : T_[q.type]}</span> <span class="tag">${q.d || 'Dễ'}</span>
    ${q.img ? `<br><img class="qi" src="${q.img}">` : ''}`;
  
  if (q.type === 'tf') {
    ensureQuestionCompatibility(q);
    G.tfAnswers = { 0: null, 1: null, 2: null, 3: null };

    if (q.passage) {
      h += `
        <div class="reading-passage-card">
          <div class="reading-passage-header">📜 Ngữ liệu đọc hiểu</div>
          <div class="reading-passage-body">${esc(q.passage)}</div>
        </div>`;
    }

    h += `<h2 style="margin:12px 0;">${esc(q.c || 'Phát biểu sau đây là đúng?')}</h2>`;

    h += `
      <div class="tf-game-card">
        <div class="tf-game-instruction">
          👉 <i>Hãy chọn <b>Đúng</b> hoặc <b>Sai</b> cho từng phát biểu dưới đây:</i>
        </div>
        <div class="tf-game-items" id="tf-game-items">
          ${q.items.map((it, idx) => `
            <div class="tf-game-row" id="tf-row-${idx}" data-idx="${idx}">
              <div class="tf-game-text">
                <span class="tf-game-letter">${'abcd'[idx]})</span>
                <span class="tf-game-desc">${esc(it.text)}</span>
              </div>
              <div class="tf-game-choice-btns">
                <button type="button" class="tf-choice-btn tf-btn-true" id="tf-btn-${idx}-true" onclick="chooseTf(${idx}, true)">
                  ✓ Đúng
                </button>
                <button type="button" class="tf-choice-btn tf-btn-false" id="tf-btn-${idx}-false" onclick="chooseTf(${idx}, false)">
                  ✗ Sai
                </button>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="tf-game-footer">
          <button id="tf-submit-btn" class="btn au" onclick="submitTf()" disabled>
            🔒 Vui lòng chọn Đúng / Sai cho cả 4 câu (0/4)
          </button>
        </div>
      </div>`;
  } else if (q.type == 'match') {
    G.sel = null; G.pr = {}; G.Rr = q.p.map((p, i) => i).sort(() => Math.random() - .5);
    h += `<h2 style="margin:12px 0;">${esc(q.c)}</h2>`;
    h += '<div class="mt"><div id="ml"></div><div id="mr"></div></div>';
  } else if (q.type == 'short' || q.type == 'fill') {
    h += `<h2 style="margin:12px 0;">${esc(q.c)}</h2>`;
    h += '<input id="ans" autocomplete="off" spellcheck="false" data-ms-editor="false" autocorrect="off" autocapitalize="off" oncontextmenu="return false;" placeholder="Nhập câu trả lời của bạn..." onkeydown="event.key==\'Enter\'&&sub()" onpaste="preventPasteCopy(event, \'paste\')" oncopy="preventPasteCopy(event, \'copy\')" oncut="preventPasteCopy(event, \'cut\')"><br><br><button class="btn au" onclick="sub()">Gửi đáp án</button>';
  } else {
    h += `<h2 style="margin:12px 0;">${esc(q.c)}</h2>`;
    h += opts(q).map((x, i) => `<button class="opt" onclick="pick(${i})"><b>${'ABCDEF'[i]}</b>${esc(x)}</button>`).join('');
  }
  
  $('#q').innerHTML = h;
  q.type == 'match' && mt();
  $('#ans')?.focus();

  const timerEl = $('#ht');
  if (timerEl) {
    timerEl.textContent = '⏱ ∞';
    timerEl.classList.remove('timer-urgent', 'timer-warning');
  }
}

function chooseTf(idx, val) {
  if (!G || G.lock || !G.tfAnswers) return;
  playSound('pop');
  G.tfAnswers[idx] = val;

  const row = $(`#tf-row-${idx}`);
  if (row) {
    const trueBtn = $(`#tf-btn-${idx}-true`);
    const falseBtn = $(`#tf-btn-${idx}-false`);
    trueBtn?.classList.toggle('selected', val === true);
    falseBtn?.classList.toggle('selected', val === false);
  }

  const answeredCount = [0, 1, 2, 3].filter(i => G.tfAnswers[i] !== null).length;
  const submitBtn = $('#tf-submit-btn');
  if (submitBtn) {
    if (answeredCount === 4) {
      submitBtn.disabled = false;
      submitBtn.textContent = '✓ Xác nhận & Nộp câu trả lời';
      submitBtn.classList.remove('au');
      submitBtn.classList.add('cy');
    } else {
      submitBtn.disabled = true;
      submitBtn.textContent = `🔒 Vui lòng chọn Đúng / Sai cho cả 4 câu (${answeredCount}/4)`;
      submitBtn.classList.add('au');
      submitBtn.classList.remove('cy');
    }
  }
}

function submitTf() {
  if (!G || G.lock || !G.tfAnswers) return;
  const answeredCount = [0, 1, 2, 3].filter(i => G.tfAnswers[i] !== null).length;
  if (answeredCount < 4) return toast('Vui lòng chọn Đúng / Sai cho cả 4 phát biểu!', 'bad');
  fin('tf', G.tfAnswers);
}

function mt() {
  const q = G.qs[G.i];
  $('#ml').innerHTML = q.p.map((p, i) => `<div class="mi" id="l${i}" onclick="ml(${i})">${esc(p[0])}</div>`).join('');
  $('#mr').innerHTML = G.Rr.map(j => `<div class="mi" id="r${j}" onclick="mr(${j})">${esc(q.p[j][1])}</div>`).join('');
}

function ml(i) { if (G.lock) return; playSound('pop'); G.sel = i; document.querySelectorAll('#ml .mi').forEach((e, idx) => e.classList.toggle('sel', idx == i)); }
function mr(j) {
  if (G.lock || G.sel === null) return;
  playSound('pop');
  G.pr[G.sel] = j;
  $(`#l${G.sel}`).classList.add('dn'); $(`#r${j}`).classList.add('dn');
  G.sel = null; document.querySelectorAll('#ml .mi').forEach(e => e.classList.remove('sel'));
  const q = G.qs[G.i];
  if (Object.keys(G.pr).length == q.p.length) fin(Object.entries(G.pr).every(([k, v]) => k == v) ? 1 : 0);
}

function pick(i) { fin(i == G.qs[G.i].a ? 1 : 0, i); }

function sub() {
  const answer = $('#ans').value.trim();
  fin('short', answer);
}

function fin(r, u) {
  if (G.lock) return; G.lock = 1; clearInterval(T);
  const q = G.qs[G.i]; let pts = 0, st;

  if (r === 'short') {
    const answer = u || '';
    const ans = (q.acc && q.acc.length) ? q.acc.join(' / ') : '';
    st = 'saved';
    pts = 0;
    playSound('pop');

    G.log.push({
      q,
      st: 'saved',
      pts: 0,
      submittedAnswer: answer || '(Chưa nhập)',
      correctAnswer: ans || 'Chờ giáo viên chấm / đối chiếu'
    });
    hud();

    const last = G.i + 1 >= G.qs.length;
    $('#fb').innerHTML = `
      <div style="font-size:20px; font-weight:800; color:var(--primary); margin-bottom:8px;">
        📝 Đã lưu câu trả lời tự luận!
      </div>
      <div style="background:var(--bg-base); border:2px dashed var(--stroke); border-radius:14px; padding:12px 16px; margin:12px 0; text-align:left;">
        <p style="margin:0 0 6px; font-size:14px;"><b>Câu hỏi:</b> ${esc(q.c)}</p>
        <p style="margin:0; font-size:14px; color:var(--primary);"><b>Câu trả lời của bạn:</b> <i>${esc(answer || '(Để trống)')}</i></p>
      </div>
      <p class="mut" style="font-size:13px; margin:8px 0;">
        ℹ️ Câu hỏi tự luận đã được lưu lại để giáo viên chấm điểm và đối chiếu sau (không chấm liền).
      </p>
      <div style="margin-top:16px;">
        <button class="btn au lg" style="width:100%; font-size:17px;" onclick="advanceAfterFeedback()">
          ${last ? '🏁 Hoàn thành bài làm' : 'Tiếp tục câu tiếp theo →'}
        </button>
      </div>`;
    $('#feedback-dialog').showModal();
    return;
  }

  if (r === 'tf') {
    let correctCount = 0;
    const details = [];
    q.items.forEach((it, idx) => {
      const userVal = G.tfAnswers ? G.tfAnswers[idx] : null;
      const isCorrect = userVal !== null && userVal === it.correct;
      if (isCorrect) correctCount++;
      const row = $(`#tf-row-${idx}`);
      if (row) {
        row.classList.add(isCorrect ? 'tf-row-correct' : 'tf-row-wrong');
        const badge = document.createElement('div');
        badge.className = `tf-result-badge ${isCorrect ? 'tf-badge-ok' : 'tf-badge-bad'}`;
        badge.innerHTML = isCorrect ? `✅ Đúng (+Đ/S)` : `❌ Sai (Đáp án đúng: <b>${it.correct ? 'ĐÚNG' : 'SAI'}</b>)`;
        row.appendChild(badge);
      }
      details.push({
        letter: 'abcd'[idx],
        text: it.text,
        userVal: userVal === true ? 'Đúng' : userVal === false ? 'Sai' : 'Chưa chọn',
        correctVal: it.correct ? 'Đúng' : 'Sai',
        isCorrect
      });
    });

    pts = correctCount === 4 ? 200 : correctCount === 3 ? 120 : correctCount === 2 ? 60 : correctCount === 1 ? 25 : 0;
    st = correctCount >= 3 ? 'ok' : 'bad';

    if (correctCount >= 3) {
      G.ok++; G.cb++; if (G.cb > G.best) G.best = G.cb;
      playSound('correct');
    } else {
      G.bad++; G.cb = 0;
      playSound('wrong');
    }
    G.sc += pts;

    const submittedSummary = `${correctCount}/4 ý đúng (${details.map(d => `${d.letter}: ${d.userVal}`).join(', ')})`;
    const correctSummary = details.map(d => `${d.letter}: ${d.correctVal}`).join(', ');

    G.log.push({ q, st, pts, submittedAnswer: submittedSummary, correctAnswer: correctSummary });
    hud();

    const last = G.i + 1 >= G.qs.length;
    $('#fb').innerHTML = `
      <div class="tf-modal-feedback">
        <div class="feedback-badge-row">
          <span class="tf-score-pill ${correctCount >= 3 ? 'ok' : 'bad'}">
            ${correctCount === 4 ? '🌟 Xuất sắc: 4/4 ý đúng!' : correctCount === 3 ? '👍 Tốt: 3/4 ý đúng' : `Cần cố gắng: ${correctCount}/4 ý đúng`}
          </span>
          <span class="feedback-points-tag">+${pts} điểm</span>
        </div>
        <div class="tf-modal-details-list">
          ${details.map(d => `
            <div class="tf-modal-detail-item ${d.isCorrect ? 'ok' : 'bad'}">
              <span><b>${d.letter})</b> ${esc(d.text)}</span>
              <span class="tf-modal-tag">${d.isCorrect ? '✅ Bạn chọn đúng' : `❌ Đáp án: <b>${d.correctVal}</b>`}</span>
            </div>
          `).join('')}
        </div>
        ${q.e ? `<div class="tf-modal-explanation"><b>Giải thích chi tiết:</b><br>${esc(q.e)}</div>` : ''}
        <button class="btn au lg" style="width:100%; font-size:17px; margin-top:14px;" onclick="advanceAfterFeedback()">
          ${last ? '🏁 Xem kết quả cuộc thi' : 'Tiếp tục câu tiếp theo →'}
        </button>
      </div>`;
    $('#feedback-dialog').showModal();
    return;
  }

  // MC or other question types
  if (r === 1) {
    pts = 100;
    st = 'ok'; G.ok++; G.cb++; if (G.cb > G.best) G.best = G.cb;
    playSound('correct');
  } else {
    st = 'bad'; G.bad++; G.cb = 0;
    playSound('wrong');
  }
  G.sc += pts;

  const ans = q.type == 'match'
    ? q.p.map(x => x[0] + ' ↔ ' + x[1]).join('; ')
    : (q.o ? `${'ABCD'[q.a]}. ${q.o[q.a]}` : (q.acc || []).join(' / '));
  const submittedAnswer = q.type == 'match'
    ? Object.entries(G.pr || {}).map(([k, v]) => `${q.p[k][0]} ↔ ${q.p[v][1]}`).join('; ')
    : (q.o ? (u !== null && u !== undefined && q.o[u] ? `${'ABCD'[u]}. ${q.o[u]}` : 'Chưa trả lời') : String(u || ''));

  G.log.push({ q, st, pts, submittedAnswer, correctAnswer: ans });
  hud();

  const b = document.querySelectorAll('#q .opt');
  if (b.length && q.a !== undefined) {
    b.forEach((x, idx) => {
      if (idx == q.a) x.classList.add('ok');
      if (idx == u && idx != q.a) x.classList.add('no');
    });
  }

  const last = G.i + 1 >= G.qs.length;
  $('#fb').innerHTML = `
    <div style="font-size:20px; font-weight:800; color:${st=='ok'?'var(--green)':'var(--red)'}">
      ${st=='ok' ? '🎉 Chính xác! +' + pts + ' điểm' : '❌ Chưa chính xác'}
    </div>
    ${st!='ok' ? `<p style="margin:10px 0;"><b>Đáp án đúng:</b> ${esc(ans)}</p>` : ''}
    ${q.e ? `<p class="mut" style="font-size:14px; margin:10px 0;"><b>Giải thích:</b> ${esc(q.e)}</p>` : ''}
    <div style="margin-top:16px;">
      <button class="btn au lg" style="width:100%; font-size:17px;" onclick="advanceAfterFeedback()">
        ${last ? '🏁 Xem kết quả' : 'Tiếp tục câu tiếp theo →'}
      </button>
    </div>`;
  $('#feedback-dialog').showModal();
}

async function end() {
  clearInterval(T); const n = G.log.length, dt = Math.round((Date.now() - G.t0) / 1000);
  if (window.__SECURITY_SHIELD && typeof window.__SECURITY_SHIELD.endExam === 'function') {
    window.__SECURITY_SHIELD.endExam(true);
  }
  go('res');
  $('#rt').textContent = '🎉 HOÀN THÀNH BÀI LÀM!';
  $('#rn').textContent = 'Người chơi: ' + G.nm + (G.className ? ' (' + G.className + ')' : '') + ' | ' + G.s.title;
  
  const savedCount = G.log.filter(x => x.st === 'saved').length;
  const gradedCount = G.log.filter(x => x.st !== 'saved').length;
  const accuracy = gradedCount ? Math.round(G.ok / gradedCount * 100) : 100;

  const totalQuestions = Math.max(1, G.qs.length);
  const score10 = getQuizScore10();

  const statItems = [
    ['Tổng điểm (Thang 10)', `${score10.toFixed(1)} / 10.0 điểm`],
    ['Trả lời đúng', `${G.ok} / ${totalQuestions} câu`],
    ['Trả lời sai / Bỏ qua', `${G.bad} câu`]
  ];
  if (savedCount > 0) {
    statItems.push(['Tự luận đã lưu', `${savedCount} câu`]);
  }
  statItems.push(
    ['Độ chính xác TN', accuracy + '%'],
    ['Chuỗi đúng liên tiếp', G.best],
    ['Thời gian', dt + ' giây']
  );

  $('#rs').innerHTML = statItems.map(x => `<div class="card stat"><b>${x[1]}</b>${x[0]}</div>`).join('');

  $('#rv').innerHTML = G.log.map((l, idx) => {
    let icon = '❌';
    let tagCls = 'bad';
    let tagTxt = `+${l.pts}`;
    if (l.st === 'ok') {
      icon = '✅';
      tagCls = 'ok';
    } else if (l.st === 'saved') {
      icon = '📝';
      tagCls = 'cy';
      tagTxt = 'Tự luận đã lưu';
    } else if (l.st === 'no') {
      icon = '⏰';
      tagCls = 'gh';
      tagTxt = 'Bỏ qua';
    }

    return `
      <div class="row result-row-anim" style="animation-delay:${idx * 0.05}s">
        <div>
          <b>${icon} ${esc(l.q.c || l.q.text || '')}</b><br>
          <span class="mut"><b>Bạn trả lời:</b> ${esc(l.submittedAnswer || 'Chưa trả lời')}</span><br>
          ${l.st === 'saved' ? `
            <span class="mut" style="color:var(--primary);">ℹ️ <i>Câu hỏi tự luận đã lưu vào lịch sử bài làm để chấm/đối chiếu sau.</i></span>
            ${l.correctAnswer && l.correctAnswer !== 'Chờ giáo viên chấm / đối chiếu' ? `<br><span class="mut"><b>Đáp án tham khảo:</b> ${esc(l.correctAnswer)}</span>` : ''}
          ` : `
            <span class="mut"><b>Đáp án đúng:</b> ${esc(l.correctAnswer)}</span>
          `}
          ${l.q.e ? `<br><span class="mut"><b>Giải thích:</b> ${esc(l.q.e)}</span>` : ''}
        </div>
        <span class="tag ${tagCls}">${tagTxt}</span>
      </div>`;
  }).join('');

  // LƯU VÀO HỆ THỐNG LỊCH SỬ BÀI LÀM (LOCALSTORAGE)
  const historyEntry = {
    id: 'hist_' + uid(),
    timestamp: Date.now(),
    dateStr: new Date().toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }),
    type: 'quiz',
    playerName: G.nm,
    className: G.className || '',
    setId: String(G.s.id),
    setTitle: G.s.title,
    setTopic: G.s.topic || 'Chưa phân loại',
    setEmo: G.s.emo || '📖',
    score: score10,
    correctCount: G.ok,
    wrongCount: G.bad,
    savedShortCount: savedCount,
    totalQuestions: n,
    accuracy: accuracy,
    elapsedSeconds: dt,
    details: G.log.map(item => ({
      questionText: item.q.c || item.q.text || '',
      questionType: item.q.type,
      userAnswer: item.submittedAnswer || '',
      correctAnswer: item.correctAnswer || '',
      status: item.st,
      points: item.pts,
      explanation: item.q.e || ''
    }))
  };
  if (typeof saveQuizAttemptToHistory === 'function') {
    saveQuizAttemptToHistory(historyEntry);
  }

  const sanitizedPlayerName = String(G.nm || 'Học sinh').trim().slice(0, 20) || 'Học sinh';
  const validQuestionCount = Math.max(1, n);
  const validCorrectCount = Math.min(validQuestionCount, Math.max(0, G.ok || 0));
  const validGameMode = ['quiz', 'timed', 'boss'].includes(G.m) ? G.m : 'quiz';

  G.scoreEntry = {
    id: uid(),
    player_name: sanitizedPlayerName,
    class_name: String(G.className || '').trim().slice(0, 50),
    set_id: String(G.s.id),
    set_title: String(G.s.title || 'Bộ đề'),
    score: Math.max(0, Number(score10) || 0),
    correct_count: validCorrectCount,
    question_count: validQuestionCount,
    accuracy: Math.min(100, Math.max(0, Number(accuracy) || 0)),
    game_mode: validGameMode,
    elapsed_seconds: Math.max(0, parseInt(dt, 10) || 0)
  };
  await saveScoreToLeaderboard();
}

function replay() { go('setup', G.s.id); }


/* =========================================================================
   WRITING PRACTICE MODULE (LUYỆN VIẾT VĂN THEO DÀN Ý)
   ========================================================================= */

const DEFAULT_WRITING_SETS = [
  // =========================================================================
  // NHÓM 1: VIẾT ĐOẠN NGHỊ LUẬN VĂN HỌC (~200 CHỮ - 1 ĐOẠN DUY NHẤT)
  // =========================================================================
  {
    id: 'writing_doan_nlvh_chude',
    status: 'published',
    category: 'doan-nlvh',
    categoryName: 'Đoạn văn NLVH (200 chữ)',
    subType: 'nlvh_doan_chude',
    icon: '🖋️',
    title: '[Đoạn NLVH - Dạng 1] Phân tích, đánh giá NỘI DUNG CHỦ ĐỀ tác phẩm',
    prompt: 'Viết một đoạn văn (khoảng 200 chữ, chỉ viết trong 1 đoạn văn, không xuống hàng) phân tích, đánh giá nội dung chủ đề của một đoạn thơ hoặc truyện ngắn mà anh/chị tâm đắc (Ví dụ: Chủ đề tình mẫu tử thiêng liêng trong bài thơ "Mây và sóng" - R. Tagore hoặc chủ đề số phận con người trong truyện ngắn).',
    sections: [
      {
        id: 'sec_doan_200',
        title: 'Đoạn văn Nghị luận Văn học (~200 chữ - Không xuống dòng)',
        placeholder: 'Viết liền mạch trong 1 đoạn văn duy nhất (khoảng 200 chữ, không xuống hàng) theo đúng trình tự: Mở đoạn (Câu dẫn + GTVĐNL + Nêu chủ đề) ➔ Phân tích 2-3 khía cạnh chủ đề (Thứ nhất... Thứ hai... Thứ ba...) ➔ Đánh giá vai trò chủ đề & thông điệp ➔ Nghệ thuật ➔ Kết đoạn...',
        guide: '• Hình thức: Chỉ viết trong 1 đoạn văn, không xuống hàng (~200 chữ).\n• Mở đoạn: Câu dẫn + Giới thiệu VĐNL (nội dung chủ đề tác phẩm A) + Nêu rõ chủ đề.\n• Thân đoạn: Phân tích từng khía cạnh của chủ đề (Gọi tên yếu tố + dẫn chứng + phân tích ngắn): Thứ nhất, chủ đề thể hiện qua... Thứ hai, chủ đề còn được làm rõ qua... Thứ ba, chủ đề được làm sáng tỏ qua... (Thơ: Nhan đề, Hình tượng trung tâm, Tình cảm cảm xúc | Truyện: Tình huống truyện, Nhân vật, Chi tiết đặc sắc).\n• Đánh giá & Nghệ thuật: Nêu ý nghĩa của chủ đề, thông điệp tác phẩm và các yếu tố nghệ thuật (thể thơ, từ ngữ, hình ảnh, biện pháp tu từ...)\n• Kết đoạn: Khẳng định lại giá trị và trích dẫn.',
        sample: ''
      }
    ]
  },
  {
    id: 'writing_doan_nlvh_nt_tho',
    status: 'published',
    category: 'doan-nlvh',
    categoryName: 'Đoạn văn NLVH (200 chữ)',
    subType: 'nlvh_doan_nt_tho',
    icon: '🖋️',
    title: '[Đoạn NLVH - Dạng 2] Phân tích, đánh giá NGHỆ THUẬT THƠ',
    prompt: 'Viết một đoạn văn (khoảng 200 chữ, không xuống hàng) phân tích, đánh giá những nét đặc sắc về nghệ thuật (thể thơ, hình ảnh, từ ngữ, biện pháp tu từ) trong đoạn thơ trích bài "Tây Tiến" (Quang Dũng) hoặc "Sóng" (Xuân Quỳnh).',
    sections: [
      {
        id: 'sec_doan_200',
        title: 'Đoạn văn Phân tích Nghệ thuật Thơ (~200 chữ - Không xuống dòng)',
        placeholder: 'Viết trong 1 đoạn văn duy nhất: Câu dẫn + GTVĐNL ➔ Thứ nhất, thể thơ (gọi tên + tác dụng) ➔ Thứ hai, hình ảnh (nhận xét + dẫn chứng + phân tích) ➔ Thứ ba, từ ngữ ➔ Thứ tư, biện pháp tu từ ➔ Khẳng định vai trò làm rõ chủ đề & thông điệp...',
        guide: '• Mở đoạn: Câu dẫn + Giới thiệu VĐNL (đặc sắc nghệ thuật đoạn thơ).\n• Phân tích các khía cạnh nghệ thuật:\n  + Thứ nhất, thể thơ... (gọi tên + nêu tác dụng).\n  + Thứ hai, hình ảnh... (nhận xét chung + đưa dẫn chứng + phân tích).\n  + Thứ ba, từ ngữ... (nhận xét chung + đưa dẫn chứng từ ngữ đắt giá + phân tích).\n  + Thứ tư, biện pháp tu từ... (nhận xét chung + đưa dẫn chứng + phân tích).\n• Đánh giá & Kết đoạn: Các yếu tố hình thức góp phần làm rõ chủ đề tác phẩm (nêu chủ đề) và hỗ trợ nhà thơ chuyển tải thông điệp sâu sắc đến người đọc.',
        sample: ''
      }
    ]
  },
  {
    id: 'writing_doan_nlvh_camxuc_tho',
    status: 'published',
    category: 'doan-nlvh',
    categoryName: 'Đoạn văn NLVH (200 chữ)',
    subType: 'nlvh_doan_camxuc_tho',
    icon: '🖋️',
    title: '[Đoạn NLVH - Dạng 3] Phân tích, đánh giá TÌNH CẢM, CẢM XÚC trong thơ',
    prompt: 'Viết một đoạn văn (khoảng 200 chữ, không xuống hàng) phân tích, đánh giá mạch tình cảm, cảm xúc của chủ thể trữ tình trong khổ thơ: "Trước muôn trùng sóng bể / Em nghĩ về anh, em / Em nghĩ về biển lớn / Từ nơi nào sóng lên?..." (Sóng - Xuân Quỳnh).',
    sections: [
      {
        id: 'sec_doan_200',
        title: 'Đoạn văn Phân tích Tình cảm, Cảm xúc trong Thơ (~200 chữ)',
        placeholder: 'Viết trong 1 đoạn văn duy nhất: Mở đoạn (Câu dẫn + GTVĐNL) ➔ Phân tích Cảm xúc 1 (dẫn chứng + phân tích) ➔ Cảm xúc 2 (dẫn chứng + phân tích) ➔ Đánh giá (cảm xúc chân thành, gửi gắm triết lí nhân sinh, thông điệp & phong cách tác giả)...',
        guide: '• Mở đoạn: Câu dẫn + Nêu VĐNL (tình cảm, cảm xúc trong đoạn thơ).\n• Phân tích: Chỉ rõ từng cung bậc cảm xúc (Cảm xúc 1 + dẫn chứng + phân tích; Cảm xúc 2 + dẫn chứng + phân tích...).\n• Đánh giá & Kết đoạn: Cảm xúc trong sáng, chân thành, thể hiện cái nhìn tích cực; qua đó gửi gắm triết lí nhân sinh, thông điệp (chức năng giáo dục, nhận thức, thẩm mĩ của văn chương) và tiêu biểu cho phong cách nhà thơ.',
        sample: ''
      }
    ]
  },
  {
    id: 'writing_doan_nlvh_nt_truyen',
    status: 'published',
    category: 'doan-nlvh',
    categoryName: 'Đoạn văn NLVH (200 chữ)',
    subType: 'nlvh_doan_nt_truyen',
    icon: '🖋️',
    title: '[Đoạn NLVH - Dạng 4] Phân tích NGHỆ THUẬT TRUYỆN NGẮN',
    prompt: 'Viết một đoạn văn (khoảng 200 chữ, không xuống hàng) phân tích các yếu tố nghệ thuật đặc sắc (ngôi kể, điểm nhìn, tình huống truyện, chi tiết nghệ thuật, ngôn ngữ, giọng điệu, miêu tả tâm lí) trong một đoạn trích truyện ngắn hiện đại.',
    sections: [
      {
        id: 'sec_doan_200',
        title: 'Đoạn văn Phân tích Nghệ thuật Truyện ngắn (~200 chữ)',
        placeholder: 'Viết liền mạch 1 đoạn văn: Mở đoạn ➔ Phân tích ngôi kể & điểm nhìn ➔ Tình huống truyện & tác dụng ➔ Chi tiết nghệ thuật, ngôn ngữ, giọng điệu, miêu tả diễn biến nội tâm ➔ Đánh giá tài năng, cá tính sáng tạo của nhà văn & thông điệp...',
        guide: '• Phân tích các phương diện: Ngôi kể (ngôi thứ mấy, tác dụng), Điểm nhìn, Tình huống truyện (tình huống gì, phân tích tác dụng), Chi tiết nghệ thuật đặc sắc, Ngôn ngữ, Giọng điệu, Miêu tả diễn biến nội tâm tinh tế.\n• Đánh giá: Thể hiện tài năng, phong cách, cá tính sáng tạo của tác giả; góp phần làm nổi bật chủ đề, tư tưởng, thông điệp của tác phẩm.',
        sample: ''
      }
    ]
  },
  {
    id: 'writing_doan_nlvh_nhanvat',
    status: 'published',
    category: 'doan-nlvh',
    categoryName: 'Đoạn văn NLVH (200 chữ)',
    subType: 'nlvh_doan_nhanvat',
    icon: '🖋️',
    title: '[Đoạn NLVH - Dạng 5] Phân tích ĐẶC ĐIỂM NHÂN VẬT văn học',
    prompt: 'Viết một đoạn văn (khoảng 200 chữ, không xuống hàng) phân tích vẻ đẹp phẩm chất, tính cách và nghệ thuật xây dựng một nhân vật văn học tiêu biểu (ví dụ: nhân vật Tràng, bà cụ Tứ trong "Vợ nhặt" - Kim Lân hoặc nhân vật Mị trong "Vợ chồng A Phủ" - Tô Hoài).',
    sections: [
      {
        id: 'sec_doan_200',
        title: 'Đoạn văn Phân tích Đặc điểm Nhân vật (~200 chữ)',
        placeholder: 'Viết 1 đoạn văn duy nhất: Mở đoạn & Khái quát (tên tuổi, hoàn cảnh, ngoại hình...) ➔ Phân tích Vẻ đẹp/Phẩm chất 1 (dẫn chứng hành động, lời nói + phân tích) ➔ Vẻ đẹp/Phẩm chất 2 ➔ Nghệ thuật xây dựng nhân vật (tình huống, tâm lí, ngôi kể, điểm nhìn) ➔ Đánh giá (tiêu biểu cho tầng lớp nào, thông điệp của tác giả)...',
        guide: '• Khái quát: Giới thiệu tên tuổi, hoàn cảnh, ngoại hình, nghề nghiệp nhân vật.\n• Phân tích phẩm chất: Vẻ đẹp 1 (Gọi tên + dẫn chứng hành động, lời nói, thái độ + phân tích); Vẻ đẹp 2...\n• Nghệ thuật xây dựng nhân vật: Khắc họa qua hành động, lời nói, tâm lí; đặt trong tình huống truyện độc đáo; ngôi kể, điểm nhìn, ngôn ngữ, giọng điệu.\n• Đánh giá: Nhân vật tiêu biểu cho tầng lớp nào? Thông qua đó tác giả gửi gắm thông điệp gì về con người và cuộc sống?',
        sample: ''
      }
    ]
  },

  // =========================================================================
  // NHÓM 2: VIẾT BÀI NGHỊ LUẬN VĂN HỌC (~600 CHỮ - CHIA NHIỀU ĐOẠN)
  // =========================================================================
  {
    id: 'writing_bai_nlvh_1tacpham',
    status: 'published',
    category: 'bai-nlvh',
    categoryName: 'Bài văn NLVH (600 chữ)',
    subType: 'nlvh_bai_1tacpham',
    icon: '📜',
    title: '[Bài NLVH - Dạng 1] Phân tích, đánh giá nội dung, chủ đề & nghệ thuật MỘT tác phẩm Thơ/Truyện',
    prompt: 'Viết bài văn nghị luận (khoảng 600 chữ) phân tích, đánh giá nội dung, chủ đề và những nét đặc sắc về hình thức nghệ thuật của bài thơ "Tây Tiến" (Quang Dũng) hoặc một tác phẩm truyện ngắn tiêu biểu trong chương trình Ngữ văn THPT.',
    sections: [
      {
        id: 'sec_mo_bai',
        title: 'I. Mở bài',
        placeholder: 'Trích dẫn nhận định / dẫn dắt ➔ Giới thiệu tác giả, tác phẩm và nêu vấn đề nghị luận (giá trị nội dung, chủ đề và đặc sắc nghệ thuật)...',
        guide: 'Dẫn dắt từ nhận định văn học hoặc đề tài; giới thiệu tác giả, tác phẩm và nêu khái quát giá trị nội dung, chủ đề cùng hình thức nghệ thuật đặc sắc của tác phẩm.',
        sample: ''
      },
      {
        id: 'sec_than_bai_nd',
        title: 'II. Thân bài - 1. Khái quát & Phân tích Nội dung, Chủ đề',
        placeholder: 'Bước 1: Phân tích (Gọi tên yếu tố + nêu dẫn chứng + phân tích tác dụng) ➔ Bước 2: Đánh giá vai trò với chủ đề / thông điệp...',
        guide: '• Với THƠ: Làm rõ Đề tài, Chủ đề, Tình cảm cảm xúc – Mạch cảm xúc, Chủ thể trữ tình/Nhân vật trữ tình, Tư tưởng, Thông điệp.\n• Với TRUYỆN: Làm rõ Đề tài, Chủ đề, Vẻ đẹp hình tượng nhân vật (phẩm chất, tính cách, diễn biến tâm trạng...), Tư tưởng, Thông điệp.',
        sample: ''
      },
      {
        id: 'sec_than_bai_nt',
        title: 'II. Thân bài - 2. Phân tích, đánh giá Hình thức Nghệ thuật',
        placeholder: 'Phân tích các tiêu chí hình thức theo đặc trưng thể loại (Thơ: Thể thơ, từ ngữ, hình ảnh, BPTT, vần nhịp, giọng điệu | Truyện: Ngôi kể, điểm nhìn, nhan đề, tình huống, chi tiết tiêu biểu, ngôn ngữ, kết thúc, giọng điệu)...',
        guide: '• Với THƠ: Thể thơ, Từ ngữ, Hình ảnh, Biện pháp tu từ, Vần/nhịp, Giọng điệu.\n• Với TRUYỆN: Ngôi kể, Điểm nhìn, Nhan đề (gây tò mò, gợi liên tưởng, khắc sâu ý nghĩa), Tình huống truyện, Ngôn ngữ (đối thoại/độc thoại), Chi tiết tiêu biểu (triển khai cốt truyện, khắc họa nhân vật, thể hiện chủ đề), Kết thúc truyện, Giọng điệu trần thuật.',
        sample: ''
      },
      {
        id: 'sec_ket_bai',
        title: 'III. Kết bài',
        placeholder: 'Khẳng định lại giá trị tư tưởng và nghệ thuật của tác phẩm; nêu sức sống của tác phẩm trong lòng người đọc...',
        guide: 'Tổng kết giá trị nội dung, chủ đề và nghệ thuật; khẳng định tài năng của tác giả và dư âm, thông điệp sâu sắc đối với người đọc hôm nay.',
        sample: ''
      }
    ]
  },
  {
    id: 'writing_bai_nlvh_sosanh',
    status: 'published',
    category: 'bai-nlvh',
    categoryName: 'Bài văn NLVH (600 chữ)',
    subType: 'nlvh_bai_sosanh',
    icon: '📜',
    title: '[Bài NLVH - Dạng 2] So sánh, đánh giá HAI đoạn trích / tác phẩm Thơ hoặc Truyện',
    prompt: 'Viết bài văn nghị luận (khoảng 600 chữ) so sánh, đánh giá hai đoạn trích thơ hoặc hai nhân vật trong hai tác phẩm truyện ngắn để làm nổi bật điểm tương đồng, điểm khác biệt và phong cách sáng tạo độc đáo của mỗi nhà văn, nhà thơ.',
    sections: [
      {
        id: 'sec_mo_bai',
        title: 'I. Mở bài',
        placeholder: 'Trích dẫn – dẫn dắt – giới thiệu Tác phẩm 1 + Tác giả 1, Tác phẩm 2 + Tác giả 2 + câu chốt VĐNL (điểm tương đồng, khác biệt) + Trích dẫn 2 đoạn...',
        guide: 'Trích dẫn – dẫn dắt – nêu tên Tác phẩm 1 + Tác giả 1, Tác phẩm 2 + Tác giả 2 + câu chốt VĐNL (điểm tương đồng, khác biệt). Trích 2 đoạn thơ (nếu ngắn) hoặc trích 2 đoạn truyện (dùng “...”, câu đầu và cuối).',
        sample: ''
      },
      {
        id: 'sec_tb_khaiquat_tuongdong',
        title: 'II. Thân bài - 1. Khái quát chung & 2. Điểm tương đồng',
        placeholder: '1. Khái quát thông tin tác giả, tác phẩm, hoàn cảnh sáng tác, xuất xứ.\n2. Điểm tương đồng về Nội dung và Nghệ thuật (Trình bày: Thứ nhất... Thứ hai... kèm lí lẽ và bằng chứng)...',
        guide: '1. Khái quát chung: Thông tin về tác giả, tác phẩm, hoàn cảnh sáng tác, xuất xứ.\n2. Điểm tương đồng: Bám theo bảng tiêu chí thể loại (Nội dung: đề tài, chủ đề, hình tượng thơ/nhân vật, cảm hứng chủ đạo, tư tưởng thông điệp | Nghệ thuật: thể loại, bút pháp...). Trình bày: thứ nhất, thứ hai... kèm lí lẽ và bằng chứng.',
        sample: ''
      },
      {
        id: 'sec_tb_khacbiet',
        title: 'II. Thân bài - 3. Điểm khác biệt (Nội dung & Hình thức)',
        placeholder: 'Phân tích điểm khác biệt giữa 2 đoạn trích/tác phẩm về Nội dung và Hình thức nghệ thuật (Thứ nhất... Thứ hai... kèm lí lẽ và bằng chứng)...',
        guide: '• Nếu so sánh 2 đoạn thơ: Chú trọng Nội dung (Đề tài, hình tượng thơ, cảm hứng chủ đạo) & Hình thức (Chủ thể trữ tình, từ ngữ hình ảnh, biện pháp nghệ thuật).\n• Nếu so sánh 2 nhân vật / truyện: Chú trọng Nội dung (Kiểu nhân vật, tình cảm tác giả) & Hình thức (Ngôi kể, điểm nhìn, cách xây dựng nhân vật, chi tiết, giọng điệu).',
        sample: ''
      },
      {
        id: 'sec_tb_ligiai_danhgia',
        title: 'II. Thân bài - 4. Lí giải giống/khác nhau & 5. Đánh giá chung',
        placeholder: '4. Lí giải vì sao có điểm tương đồng và khác biệt.\n5. Đánh giá ý nghĩa của sự tương đồng, khác biệt đối với phong cách tác giả và nền văn học...',
        guide: '4. Lí giải: Giống nhau do cùng hoàn cảnh sống, cùng đề cập một hiện tượng đời sống, cùng quan điểm thẩm mĩ hoặc chịu ảnh hưởng nhau. Khác biệt do cá tính sáng tạo riêng, thời đại/truyền thống văn hóa khác nhau, đối tượng và cảm xúc đặc thù.\n5. Đánh giá: Thể hiện sự thống nhất trong quan điểm/thi pháp thời đại và sự độc đáo, đa dạng làm phong phú nền văn học.',
        sample: ''
      },
      {
        id: 'sec_ket_bai',
        title: 'III. Kết bài',
        placeholder: 'Khẳng định lại giá trị đặc sắc của cả hai tác phẩm và sức sống trong lòng độc giả...',
        guide: 'Khái quát lại giá trị của sự tương đồng và khác biệt giữa hai tác phẩm; nêu cảm nhận và bài học tiếp nhận văn chương.',
        sample: ''
      }
    ]
  },

  // =========================================================================
  // NHÓM 3: ĐOẠN VĂN NGHỊ LUẬN XÃ HỘI (~200 CHỮ - 1 ĐOẠN DUY NHẤT)
  // =========================================================================
  {
    id: 'writing_doan_nlxh_ynghia',
    status: 'published',
    category: 'doan-nlxh',
    categoryName: 'Đoạn văn NLXH (200 chữ)',
    subType: 'nlxh_doan_ynghia',
    icon: '🌱',
    title: '[Đoạn NLXH - Định dạng 1 & 2] Ý nghĩa / Giá trị / Tầm quan trọng của một vấn đề (200 chữ)',
    prompt: 'Viết một đoạn văn nghị luận xã hội (khoảng 200 chữ, chỉ viết trong 1 đoạn văn, không xuống hàng) trình bày suy nghĩ của anh/chị về ý nghĩa, tầm quan trọng của lòng kiên trì và bản lĩnh vượt khó đối với tuổi trẻ hôm nay.',
    sections: [
      {
        id: 'sec_doan_200',
        title: 'Đoạn văn NLXH về Ý nghĩa / Giá trị (~200 chữ - Không xuống dòng)',
        placeholder: 'Viết trong 1 đoạn văn duy nhất: Mở đoạn ➔ Giải thích (1 câu) ➔ Bàn luận 3 luận điểm (Thứ nhất, A giúp ta mở rộng hiểu biết, bản lĩnh, hoàn thiện nhân cách... Thứ hai, A còn giúp ta thành công, được tin tưởng, hạnh phúc... Thứ ba, đối với xã hội, cải thiện chất lượng sống, văn minh hơn...) + Dẫn chứng ➔ Bài học nhận thức, hành động & Kết đoạn...',
        guide: '• Hình thức: Chỉ viết trong 1 đoạn văn, không xuống hàng (~200 chữ).\n• Mở đoạn: Nêu vấn đề nghị luận (Nếu gắn với Đọc hiểu: nêu 1-2 câu về vấn đề xã hội trong phần đọc hiểu trước).\n• Thân đoạn (4 bước):\n  1. Giải thích: 1 câu ngắn gọn.\n  2. Bàn luận (Đưa ra 3 luận điểm kèm 1-2 câu lí giải):\n     + Thứ nhất, A giúp ta mở rộng hiểu biết, có ý chí, bản lĩnh, hoàn thiện nhân cách (+ 1-2 câu lí giải).\n     + Thứ hai, A còn giúp ta thành công hơn, được sự tin tưởng, tín nhiệm, mang lại sự bình an, hạnh phúc (+ 1-2 câu lí giải).\n     + Thứ ba, đối với xã hội, A góp phần cải thiện chất lượng sống, làm cộng đồng tốt đẹp, văn minh hơn (+ 1-2 câu lí giải).\n  3. Dẫn chứng: Nêu dẫn chứng thực tế tiêu biểu.\n  4. Bài học nhận thức và hành động.\n• Kết đoạn: Khẳng định lại giá trị vấn đề.',
        sample: ''
      }
    ]
  },
  {
    id: 'writing_doan_nlxh_giaiphap',
    status: 'published',
    category: 'doan-nlxh',
    categoryName: 'Đoạn văn NLXH (200 chữ)',
    subType: 'nlxh_doan_giaiphap',
    icon: '🌱',
    title: '[Đoạn NLXH - Định dạng 3] Cách thức / Giải pháp / Trách nhiệm của tuổi trẻ (200 chữ)',
    prompt: 'Viết một đoạn văn nghị luận xã hội (khoảng 200 chữ, chỉ viết trong 1 đoạn văn, không xuống hàng) trình bày suy nghĩ của anh/chị về trách nhiệm và những giải pháp thiết thực của người trẻ để giữ gìn bản sắc văn hóa dân tộc trong kỷ nguyên hội nhập.',
    sections: [
      {
        id: 'sec_doan_200',
        title: 'Đoạn văn NLXH về Giải pháp / Trách nhiệm (~200 chữ - Không xuống dòng)',
        placeholder: 'Viết trong 1 đoạn văn duy nhất: Mở đoạn ➔ Giải thích (1 câu) ➔ Bàn luận 3 cấp độ giải pháp (Thứ nhất, đối với cá nhân: nâng cao nhận thức, rèn kĩ năng, thái độ tích cực & hành động cụ thể... Thứ hai, đối với gia đình, nhà trường: giáo dục, thấu hiểu, lắng nghe... Thứ ba, đối với cộng đồng, xã hội: chính sách, sự kiện, truyền thông...) + Dẫn chứng ➔ Bài học & Kết đoạn...',
        guide: '• Hình thức: Chỉ viết trong 1 đoạn văn, không xuống hàng (~200 chữ).\n• Mở đoạn: Giới thiệu vấn đề trách nhiệm / giải pháp.\n• Thân đoạn:\n  1. Giải thích: 1 câu.\n  2. Bàn luận 3 luận điểm giải pháp:\n     + Thứ nhất, đối với cá nhân: Cần nâng cao nhận thức (điều chỉnh quan điểm, tư duy), rèn luyện kĩ năng, thay đổi thói quen, chủ động học hỏi (+ 1-2 câu lí giải); có thái độ tích cực và hành động cụ thể.\n     + Thứ hai, đối với gia đình, nhà trường: Tăng cường giáo dục, thấu hiểu, lắng nghe, định hướng.\n     + Thứ ba, đối với cộng đồng, xã hội: Hoàn thiện chính sách, tổ chức sự kiện, đẩy mạnh truyền thông.\n  3. Dẫn chứng thực tế.\n  4. Bài học nhận thức, hành động & Kết đoạn.',
        sample: ''
      }
    ]
  },

  // =========================================================================
  // NHÓM 4: BÀI VĂN NGHỊ LUẬN XÃ HỘI (~600 CHỮ - CHIA NHIỀU ĐOẠN)
  // =========================================================================
  {
    id: 'writing_bai_nlxh_tutuong',
    status: 'published',
    category: 'bai-nlxh',
    categoryName: 'Bài văn NLXH (600 chữ)',
    subType: 'nlxh_bai_tutuong',
    icon: '🌍',
    title: '[Bài NLXH - Dạng 1] Nghị luận về một TƯ TƯỞNG ĐẠO LÍ / CÂU NÓI (600 chữ)',
    prompt: 'Viết bài văn nghị luận xã hội (khoảng 600 chữ) bàn về ý kiến: “Sống là cho, đâu chỉ nhận riêng mình” (Tố Hữu) hoặc một tư tưởng đạo lí sâu sắc về lẽ sống của tuổi trẻ hôm nay.',
    sections: [
      {
        id: 'sec_mo_bai',
        title: 'I. Mở bài & Đoạn 1: Giải thích câu nói / tư tưởng',
        placeholder: 'Mở bài: Dẫn dắt + Nêu vấn đề nghị luận & trích dẫn câu nói.\nĐoạn 1 (Giải thích): Giải thích từ ngữ quan trọng, từng vế câu ➔ Chốt nghĩa cả câu: “Vậy câu nói này có nghĩa là...”',
        guide: '• Mở bài: Dẫn dắt và trích dẫn nguyên văn ý kiến / câu nói.\n• Đoạn 1 - Giải thích: Giải thích các từ ngữ trọng tâm, từng vế câu, sau đó rút ra ý nghĩa toàn câu (“Vậy câu này có nghĩa là...”).',
        sample: ''
      },
      {
        id: 'sec_tb_banluan',
        title: 'II. Thân bài - Bàn luận & Chứng minh (3 luận điểm tách đoạn + Dẫn chứng)',
        placeholder: 'Trả lời: Vì sao đặt ra vấn đề này? Vấn đề này có ý nghĩa gì?\n- Đoạn Luận điểm 1 (Ý nghĩa 1: đối với nhận thức, nhân cách cá nhân) + Lí lẽ & Dẫn chứng.\n- Đoạn Luận điểm 2 (Ý nghĩa 2: giúp thành công, hạnh phúc, gắn kết) + Lí lẽ & Dẫn chứng.\n- Đoạn Luận điểm 3 (Ý nghĩa 3: đối với cộng đồng, xã hội) + Lí lẽ & Dẫn chứng.',
        guide: 'Đưa ra hệ thống luận điểm, lí lẽ, bằng chứng làm sáng tỏ quan điểm:\n+ Vì sao đặt ra vấn đề này?\n+ Vấn đề này có ý nghĩa gì? (Đưa ra 3 luận điểm Ý nghĩa 1, Ý nghĩa 2, Ý nghĩa 3, mỗi luận điểm tách thành 1 đoạn nhỏ kèm lí lẽ và dẫn chứng thực tế).',
        sample: ''
      },
      {
        id: 'sec_tb_phephan_giaiphap_kb',
        title: 'III. Phê phán mở rộng, Giải pháp bài học & Kết bài',
        placeholder: '- Đoạn Phê phán, mở rộng: Phê phán biểu hiện trái ngược; chỉ ra mặt cần bổ sung (nếu có).\n- Đoạn Giải pháp & Bài học: Liên hệ bản thân, bài học nhận thức và hành động.\n- Kết bài: Khẳng định lại giá trị của tư tưởng đạo lí.',
        guide: '• Đoạn Phê phán, mở rộng vấn đề (Nếu câu nói có phần chưa toàn diện thì chỉ ra thêm mặt hạn chế).\n• Đoạn Giải pháp, liên hệ bản thân, bài học nhận thức và hành động.\n• Kết bài: Khép lại vấn đề và gửi gắm thông điệp.',
        sample: ''
      }
    ]
  },
  {
    id: 'writing_bai_nlxh_hientuong',
    status: 'published',
    category: 'bai-nlxh',
    categoryName: 'Bài văn NLXH (600 chữ)',
    subType: 'nlxh_bai_hientuong',
    icon: '🌍',
    title: '[Bài NLXH - Dạng 2] Nghị luận về một HIỆN TƯỢNG ĐỜI SỐNG (600 chữ)',
    prompt: 'Viết bài văn nghị luận xã hội (khoảng 600 chữ) trình bày suy nghĩ của anh/chị về một hiện tượng đời sống đang được xã hội quan tâm hiện nay (ví dụ: văn hóa ứng xử trên mạng xã hội của giới trẻ, hoặc phong trào sống xanh bảo vệ môi trường).',
    sections: [
      {
        id: 'sec_mo_bai_thuctrang',
        title: 'I. Mở bài & Đoạn 1: Giải thích + Thực trạng',
        placeholder: 'Mở bài: Dẫn dắt và giới thiệu hiện tượng đời sống.\nĐoạn 1: Giải thích khái niệm hiện tượng và nêu rõ thực trạng, biểu hiện cụ thể trong đời sống hiện nay...',
        guide: '• Mở bài: Giới thiệu hiện tượng đời sống cần bàn luận.\n• Đoạn 1: Giải thích bản chất hiện tượng + Nêu bức tranh thực trạng (phổ biến như thế nào, biểu hiện ở đâu).',
        sample: ''
      },
      {
        id: 'sec_tb_nguyennhan_hauqua',
        title: 'II. Thân bài - Đoạn 2: Nguyên nhân & Đoạn 3: Tác dụng / Hậu quả',
        placeholder: '- Đoạn 2 (Nguyên nhân): Phân tích nguyên nhân chủ quan (từ ý thức cá nhân) và khách quan (gia đình, nhà trường, xã hội, công nghệ).\n- Đoạn 3 (Tác dụng hoặc Hậu quả): Phân tích sâu tác động đối với cá nhân và xã hội + Dẫn chứng thực tế...',
        guide: '• Đoạn 2: Phân tích nguyên nhân chủ quan và khách quan dẫn đến hiện tượng.\n• Đoạn 3: Phân tích tác dụng/ý nghĩa (nếu là hiện tượng tốt) hoặc hậu quả/tác hại (nếu là hiện tượng tiêu cực) kèm dẫn chứng xác thực.',
        sample: ''
      },
      {
        id: 'sec_tb_giaiphap_kb',
        title: 'III. Thân bài - Đoạn 4: Giải pháp (Cá nhân, Cộng đồng, Trước mắt, Lâu dài) & Kết bài',
        placeholder: '- Đoạn 4 (Giải pháp): Đề xuất giải pháp từ phía cá nhân, gia đình/nhà trường, cộng đồng/xã hội (cả trước mắt và lâu dài).\n- Kết bài: Khái quát lại vấn đề và liên hệ bài học bản thân...',
        guide: '• Đoạn 4: Đề xuất hệ thống giải pháp cụ thể: cá nhân, gia đình, nhà trường, cộng đồng; giải pháp trước mắt và lâu dài.\n• Kết bài: Khẳng định thông điệp và trách nhiệm của bản thân.',
        sample: ''
      }
    ]
  },
  {
    id: 'writing_bai_nlxh_vdxh_tpvh',
    status: 'published',
    category: 'bai-nlxh',
    categoryName: 'Bài văn NLXH (600 chữ)',
    subType: 'nlxh_bai_vdxh_tpvh',
    icon: '🌍',
    title: '[Bài NLXH - Dạng 3] Nghị luận về một VẤN ĐỀ XÃ HỘI đặt ra trong tác phẩm văn học (600 chữ)',
    prompt: 'Từ khát vọng sống và niềm tin vào sự lương thiện của các nhân vật trong truyện ngắn "Vợ nhặt" (Kim Lân) hoặc "Chí Phèo" (Nam Cao), anh/chị hãy viết bài văn nghị luận (khoảng 600 chữ) bàn về sức mạnh của tình người và sự thấu cảm trong cuộc sống hôm nay.',
    sections: [
      {
        id: 'sec_mo_bai_bieuhien',
        title: 'I. Mở bài & Đoạn 1: Giải thích + Biểu hiện VĐXH trong tác phẩm & đời sống',
        placeholder: 'Mở bài: Giới thiệu tác phẩm văn học và vấn đề xã hội đặt ra.\nĐoạn 1: Giải thích vấn đề + Nêu biểu hiện của vấn đề xã hội đó trong tác phẩm văn học (dẫn chứng) và ngoài đời thực...',
        guide: '• Mở bài: Dẫn dắt từ tác phẩm văn học đến vấn đề xã hội cần bàn luận.\n• Đoạn 1: Giải thích khái niệm + Nêu biểu hiện của vấn đề xã hội trong tác phẩm văn học (kèm dẫn chứng ngắn gọn) và biểu hiện ngoài xã hội.',
        sample: ''
      },
      {
        id: 'sec_tb_banluan_3ynghia',
        title: 'II. Thân bài - Bàn luận, chứng minh VĐXH (3 luận điểm Ý nghĩa + Dẫn chứng)',
        placeholder: 'Trả lời: Vì sao đặt ra vấn đề này? Vấn đề này có ý nghĩa gì?\n- Đoạn Ý nghĩa 1 (đối với cá nhân) + Lí lẽ.\n- Đoạn Ý nghĩa 2 (đối với mối quan hệ con người) + Lí lẽ.\n- Đoạn Ý nghĩa 3 (đối với sự phát triển xã hội) + Dẫn chứng thực tế đời sống...',
        guide: 'Bàn luận, chứng minh vấn đề xã hội:\n+ Vì sao đặt ra vấn đề này?\n+ Vấn đề này có ý nghĩa gì? (Tách thành 3 đoạn luận điểm: Ý nghĩa 1, Ý nghĩa 2, Ý nghĩa 3 kèm dẫn chứng đời sống thực tế).',
        sample: ''
      },
      {
        id: 'sec_tb_phephan_giaiphap_kb',
        title: 'III. Phê phán mở rộng, Giải pháp liên hệ bản thân & Kết bài',
        placeholder: '- Đoạn Phê phán, mở rộng vấn đề.\n- Đoạn Giải pháp, liên hệ bản thân, bài học nhận thức và hành động.\n- Kết bài: Khẳng định sức sống của tác phẩm và ý nghĩa thời sự của vấn đề xã hội...',
        guide: '• Đoạn Phê phán, mở rộng vấn đề.\n• Đoạn Giải pháp, liên hệ bản thân, rút ra bài học nhận thức và hành động.\n• Kết bài: Khép lại vấn đề và khẳng định giá trị nhân văn kết nối từ trang văn ra cuộc đời.',
        sample: ''
      }
    ]
  }
];

let writingSets = [];
let currentWritingSet = null;
let currentWritingDraft = {};
let currentWritingCategory = 'all';
let writingTimerInterval = null;
let writingTimerSeconds = 0;
let isWritingTimerRunning = false;
let isPromptExpanded = false;
let autoSaveDraftTimer = null;
let editingSections = [];

// =========================================================================
// DATA PERSISTENCE & INITIALIZATION
// =========================================================================

function loadWritingSets() {
  try {
    const raw = localStorage.getItem('vq_writing_sets');
    if (raw) {
      let parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const legacyDefaultIds = new Set(['writing_nlxh_kientri', 'writing_nlvh_taytien', 'writing_nlxh_tuhoc', 'writing_camthu_song']);
        parsed = parsed.filter(s => 
          s &&
          !legacyDefaultIds.has(s.id) &&
          s.category !== 'ielts-task1' &&
          s.category !== 'ielts-task2' &&
          !String(s.id).includes('ielts') &&
          !String(s.title).toLowerCase().includes('ielts')
        ).map(s => {
          const is200Words = /200\s*chữ|đoạn\s*văn/i.test(String(s.title) + ' ' + String(s.prompt));
          if (s.category === 'other' || s.category === 'nl-xh') {
            s.category = is200Words ? 'doan-nlxh' : 'bai-nlxh';
            s.categoryName = is200Words ? 'Đoạn văn NLXH (200 chữ)' : 'Bài văn NLXH (600 chữ)';
            s.icon = is200Words ? '🌱' : '🌍';
          } else if (s.category === 'nl-vh' || s.category === 'cam-thu') {
            s.category = is200Words ? 'doan-nlvh' : 'bai-nlvh';
            s.categoryName = is200Words ? 'Đoạn văn NLVH (200 chữ)' : 'Bài văn NLVH (600 chữ)';
            s.icon = is200Words ? '🖋️' : '📜';
          }
          if (!s.status) s.status = 'published';
          return s;
        });

        const existingIds = new Set(parsed.map(s => s.id));
        const merged = [];
        for (const def of DEFAULT_WRITING_SETS) {
          const found = parsed.find(p => p.id === def.id);
          merged.push(found || JSON.parse(JSON.stringify(def)));
        }
        for (const p of parsed) {
          if (!DEFAULT_WRITING_SETS.some(d => d.id === p.id)) {
            merged.push(p);
          }
        }
        writingSets = merged;
        saveWritingSets();
        return;
      }
    }
  } catch (err) {
    console.warn('Lỗi đọc vq_writing_sets từ localStorage:', err);
  }
  writingSets = JSON.parse(JSON.stringify(DEFAULT_WRITING_SETS));
  saveWritingSets();
}

function saveWritingSets() {
  try {
    localStorage.setItem('vq_writing_sets', JSON.stringify(writingSets));
  } catch (err) {
    console.error('Không thể lưu vq_writing_sets vào localStorage:', err);
  }
}

// Tự động nạp dữ liệu đề luyện viết ngay khi khởi chạy
loadWritingSets();

// Router hook
R.writing = function(setId) {
  loadWritingSets();
  if (setId) {
    const target = writingSets.find(s => s.id === setId);
    if (target) {
      openWritingWorkspace(target);
      return;
    }
  }
  showWritingListView();
};

// =========================================================================
// LIST VIEW, DYNAMIC CATEGORIES & FILTER
// =========================================================================

const DEFAULT_CATEGORIES = [
  { id: 'doan-nlvh', name: 'Đoạn văn NLVH (200 chữ)', icon: '🖋️' },
  { id: 'bai-nlvh', name: 'Bài văn NLVH (600 chữ)', icon: '📜' },
  { id: 'doan-nlxh', name: 'Đoạn văn NLXH (200 chữ)', icon: '🌱' },
  { id: 'bai-nlxh', name: 'Bài văn NLXH (600 chữ)', icon: '🌍' }
];

function getWritingCategories() {
  let list = null;
  try {
    const raw = localStorage.getItem('vq_writing_categories');
    if (raw) list = JSON.parse(raw);
  } catch (e) {}

  const legacyCatIds = new Set(['nl-xh', 'nl-vh', 'cam-thu', 'other']);
  if (!Array.isArray(list) || list.length === 0) {
    list = [...DEFAULT_CATEGORIES];
  } else {
    list = list.filter(c => c && c.id && !legacyCatIds.has(c.id));
    DEFAULT_CATEGORIES.forEach(defCat => {
      if (!list.some(x => x.id === defCat.id)) {
        list.push({ ...defCat });
      }
    });
  }
  saveWritingCategories(list);
  return list;
}

function saveWritingCategories(cats) {
  try {
    localStorage.setItem('vq_writing_categories', JSON.stringify(cats));
  } catch (e) {}
}

function renderCategoryFilterBar() {
  const container = $('#writing-category-chips');
  if (!container) return;

  const cats = getWritingCategories();
  const allCount = writingSets.length;

  let html = `
    <button type="button" class="w-chip ${currentWritingCategory === 'all' ? 'on' : ''}" data-cat="all" onclick="filterWritingCategory('all')">
      <span>Tất cả</span> <span class="w-chip-count">${allCount}</span>
    </button>
  `;

  cats.forEach(c => {
    const count = writingSets.filter(s => s.category === c.id).length;
    html += `
      <button type="button" class="w-chip ${currentWritingCategory === c.id ? 'on' : ''}" data-cat="${c.id}" onclick="filterWritingCategory('${c.id}')">
        <span><ion-icon name="pricetag-outline"></ion-icon> ${esc(c.name)}</span>
        <span class="w-chip-count">${count}</span>
      </button>
    `;
  });

  container.innerHTML = html;
}

function promptAddNewCategory() {
  if (typeof Auth !== 'undefined' && !Auth.canEditContent()) {
    toast('Chỉ giáo viên mới có quyền thêm chủ đề mới!', 'bad');
    return;
  }
  const name = prompt('Nhập tên chủ đề / dạng đề mới (ví dụ: Đọc hiểu văn bản, Phân tích nhân vật...):');
  if (!name || !name.trim()) return;
  const cleanName = name.trim();
  const id = 'cat_' + Math.random().toString(36).slice(2, 8);

  const cats = getWritingCategories();
  if (cats.some(c => c.name.toLowerCase() === cleanName.toLowerCase())) {
    toast('Chủ đề này đã tồn tại!', 'bad');
    return;
  }

  cats.push({ id, name: cleanName, icon: '🏷️' });
  saveWritingCategories(cats);

  toast(`Đã thêm chủ đề mới: "${cleanName}"!`, 'ok');
  if (typeof filterWritingCategory === 'function') filterWritingCategory(id);
  if (typeof R !== 'undefined' && typeof R.lib === 'function') R.lib();
}

function promptDeleteCategory(catId) {
  if (typeof Auth !== 'undefined' && !Auth.canEditContent()) {
    toast('Chỉ giáo viên mới có quyền xóa chủ đề!', 'bad');
    return;
  }
  const cats = getWritingCategories();
  const cat = cats.find(c => c.id === catId);
  if (!cat) return;

  if (cats.length <= 1) {
    toast('Hệ thống cần giữ lại ít nhất 1 chủ đề luyện viết!', 'bad');
    return;
  }

  const affectedSets = writingSets.filter(s => s.category === cat.id);
  const remainingCats = cats.filter(c => c.id !== cat.id);
  const fallbackCat = remainingCats[0];

  let confirmMsg = `Bạn có chắc chắn muốn xóa chủ đề "${cat.name}" không?`;
  if (affectedSets.length > 0) {
    confirmMsg += `\n(${affectedSets.length} bộ đề thuộc chủ đề này sẽ được chuyển sang "${fallbackCat.name}")`;
  }

  if (!confirm(confirmMsg)) {
    return;
  }

  // 1. Chuyển các bộ đề thuộc chủ đề này sang fallbackCat
  writingSets.forEach(s => {
    if (s.category === cat.id) {
      s.category = fallbackCat.id;
      s.categoryName = fallbackCat.name;
      s.icon = fallbackCat.icon || '✍️';
    }
  });
  saveWritingSets();

  // 2. Cập nhật và lưu danh sách chủ đề
  saveWritingCategories(remainingCats);

  // 3. Nếu đang xem chủ đề này, chuyển về 'all'
  if (currentWritingCategory === cat.id) {
    currentWritingCategory = 'all';
  }
  if (typeof currentLibWritingTopic !== 'undefined' && (currentLibWritingTopic.toLowerCase() === cat.name.toLowerCase() || currentLibWritingTopic === cat.id)) {
    currentLibWritingTopic = '';
  }

  // 4. Đồng bộ giao diện
  renderCategoryFilterBar();
  renderWritingSetsGrid();
  updateModalCategorySelect();
  toast(`Đã xóa chủ đề "${cat.name}" thành công!`, 'ok');
  if (typeof R !== 'undefined' && typeof R.lib === 'function') R.lib();
}

function promptDeleteCurrentCategory() {
  if (typeof Auth !== 'undefined' && !Auth.canEditContent()) {
    toast('Chỉ giáo viên mới có quyền xóa chủ đề!', 'bad');
    return;
  }
  const cats = getWritingCategories();

  let targetCatId = null;
  if (typeof currentLibWritingTopic !== 'undefined' && currentLibWritingTopic) {
    const match = cats.find(c => c.name.toLowerCase() === currentLibWritingTopic.toLowerCase() || c.id === currentLibWritingTopic);
    if (match) targetCatId = match.id;
  }
  if (!targetCatId && currentWritingCategory !== 'all') {
    targetCatId = currentWritingCategory;
  }

  if (targetCatId) {
    promptDeleteCategory(targetCatId);
    return;
  }

  if (cats.length <= 1) {
    toast('Hệ thống cần giữ lại ít nhất 1 chủ đề luyện viết!', 'bad');
    return;
  }

  const catNames = cats.map((c, i) => `${i + 1}. ${c.icon || '🏷️'} ${c.name}`).join('\n');
  const chosen = prompt(`Nhập số thứ tự của chủ đề bạn muốn xóa:\n\n${catNames}\n\n(Hoặc bấm nút ✕ ngay trên từng thẻ chủ đề)`);
  if (!chosen || !chosen.trim()) return;
  const idx = parseInt(chosen.trim(), 10) - 1;
  if (isNaN(idx) || idx < 0 || idx >= cats.length) {
    toast('Số thứ tự không hợp lệ!', 'bad');
    return;
  }
  promptDeleteCategory(cats[idx].id);
}

const deleteCustomCategory = promptDeleteCategory;

function changeSetCategory(setId, newCatId) {
  const set = writingSets.find(s => s.id === setId);
  if (!set) return;
  const cats = getWritingCategories();
  const targetCat = cats.find(c => c.id === newCatId);
  if (targetCat) {
    set.category = targetCat.id;
    set.categoryName = targetCat.name;
    set.icon = targetCat.icon;
  }
  saveWritingSets();
  toast(`Đã chuyển bộ đề sang chủ đề "${targetCat ? targetCat.name : newCatId}"!`, 'ok');
  renderCategoryFilterBar();
  renderWritingSetsGrid();
}

function showWritingListView() {
  stopWritingTimer();
  if ($('#writing-list-view')) $('#writing-list-view').style.display = 'block';
  if ($('#writing-workspace-view')) $('#writing-workspace-view').style.display = 'none';
  renderCategoryFilterBar();
  renderWritingSetsGrid();
}

function filterWritingCategory(cat) {
  currentWritingCategory = cat;
  renderCategoryFilterBar();
  renderWritingSetsGrid();
}

function onWritingSearchInput() {
  renderWritingSetsGrid();
}

const WRITING_PALETTES = [
  'linear-gradient(135deg, #1e293b 0%, #334155 100%)', // Slate Navy
  'linear-gradient(135deg, #312e81 0%, #4338ca 100%)', // Deep Indigo
  'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)', // Deep Teal
  'linear-gradient(135deg, #92400e 0%, #b45309 100%)'  // Warm Bronze
];

function renderWritingSetsGrid() {
  const container = $('#writing-sets-container') || $('#writing-sets-grid');
  if (!container) return;

  const query = ($('#writing-search-input')?.value || '').trim().toLowerCase();
  const cats = getWritingCategories();

  const isStudent = Boolean(window.Auth && window.Auth.isStudent());

  const renderCard = (s, idx = 0) => {
    const bg = WRITING_PALETTES[idx % WRITING_PALETTES.length];
    const sectionCount = s.sections ? s.sections.length : 0;
    const topic = s.categoryName || s.category || 'Luyện viết';
    const watermark = '<ion-icon name="create-outline"></ion-icon>';
    const blockInfo = (typeof getStudentBlockInfo === 'function') ? getStudentBlockInfo(s, 'writing') : { blocked: false, isDeadlineExpired: false, isNotYetOpen: false, hasSubmissions: false, message: '' };
    const isBlocked = blockInfo.blocked;
    const attemptBadge = (typeof getSetAttemptBadgeHtml === 'function') ? getSetAttemptBadgeHtml(s, 'writing') : '';
    const deadlineBadge = (typeof getSetDeadlineBadgeHtml === 'function') ? getSetDeadlineBadgeHtml(s, 'writing') : '';
    const privacyBadge = (typeof getSetPrivacyBadgeHtml === 'function') ? getSetPrivacyBadgeHtml(s, 'writing') : '';
    const openAtBadge = (typeof getSetOpenAtBadgeHtml === 'function') ? getSetOpenAtBadgeHtml(s, 'writing') : '';
    const isTeacherOrAdmin = window.Auth && (window.Auth.isTeacher() || window.Auth.isAdmin());
    const cardOnClick = isBlocked 
      ? (blockInfo.hasSubmissions ? `openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')` : `toast('${esc(blockInfo.message)}', 'bad')`) 
      : `openWritingWorkspaceById('${esc(s.id)}')`;

    return `
      <div class="setup-grid-card" onclick="${cardOnClick}">
        <div class="setup-card-banner" style="background: ${bg}; position:relative;">
          <div class="setup-card-top-info">
            <span class="setup-card-count-pill">${sectionCount} phần</span>
            <div style="display:flex; gap:4px; position:relative; z-index:2;" onclick="event.stopPropagation()">
              <button class="reading-h-mini-btn" type="button" title="Lịch sử bài làm" onclick="event.stopPropagation(); openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')"><ion-icon name="time-outline"></ion-icon></button>
              ${isTeacherOrAdmin ? `<button class="reading-h-mini-btn" type="button" title="Cài đặt lượt làm & hạn nộp bài" onclick="event.stopPropagation(); openSetAttemptLimitModal('writing', '${esc(s.id)}')"><ion-icon name="timer-outline"></ion-icon></button>` : ''}
              ${(!window.Auth || window.Auth.canEditContent()) ? `<button class="reading-h-mini-btn reading-h-btn-del" type="button" title="Xóa đề bài" onclick="event.stopPropagation(); deleteWritingSet('${esc(s.id)}')"><ion-icon name="trash-outline"></ion-icon></button>` : ''}
            </div>
          </div>
          <h3 class="setup-card-title">${esc(s.title)}</h3>
        </div>
        <div class="setup-card-body">
          <div class="setup-card-topic-row">
            <span class="setup-card-topic" title="${esc(topic)}">
              <ion-icon name="pricetag-outline"></ion-icon> <span>${esc(topic)}</span>
            </span>
          </div>
          ${(privacyBadge || openAtBadge || attemptBadge || deadlineBadge) ? `
            <div class="setup-card-badges-row" onclick="event.stopPropagation()">
              ${privacyBadge}${openAtBadge}${attemptBadge}${deadlineBadge}
            </div>` : ''}
          <div class="setup-card-action-row">
            ${isBlocked ? (blockInfo.hasSubmissions ? `
              <button class="btn-setup-action lib-view-only-btn" type="button" onclick="event.stopPropagation(); openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')">
                <span class="btn-setup-icon"><ion-icon name="eye-outline"></ion-icon></span>
                <span>Xem lại bài làm</span>
              </button>
            ` : `
              <button class="btn-setup-action lib-locked-btn" type="button" onclick="event.stopPropagation(); toast('${esc(blockInfo.message)}', 'bad')" title="${esc(blockInfo.message)}">
                <span class="btn-setup-icon"><ion-icon name="${blockInfo.isNotYetOpen ? 'time-outline' : 'lock-closed-outline'}"></ion-icon></span>
                <span>${blockInfo.isNotYetOpen ? 'Chưa mở' : (blockInfo.isDeadlineExpired ? 'Đã hết hạn' : 'Đã khóa')}</span>
              </button>
            `) : `
              <button class="btn-setup-action" type="button" onclick="event.stopPropagation(); openWritingWorkspaceById('${esc(s.id)}')">
                <span class="btn-setup-icon"><ion-icon name="play-outline"></ion-icon></span>
                <span>Vào luyện viết ngay</span>
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  };

  // Case 1: Lọc và sắp xếp theo một chủ đề cụ thể được chọn
  if (currentWritingCategory !== 'all') {
    const activeCat = cats.find(c => c.id === currentWritingCategory) || {
      id: currentWritingCategory,
      name: currentWritingCategory,
      icon: '🏷️'
    };

    const filtered = writingSets.filter(s => {
      if (s.category !== currentWritingCategory) return false;
      if (isStudent && typeof isSetPrivate === 'function' && isSetPrivate(s, 'writing')) return false;
      if (!query) return true;
      return (s.title && s.title.toLowerCase().includes(query)) ||
             (s.prompt && s.prompt.toLowerCase().includes(query));
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="writing-cat-header-bar">
          <div class="writing-cat-header-title">
            <span style="font-size: 24px; color: var(--mut);"><ion-icon name="pricetag-outline"></ion-icon></span>
            <div>
              <h3 style="margin: 0; font-size: 17px; font-weight: 800;">Chủ đề: ${esc(activeCat.name)}</h3>
              <span class="mut" style="font-size: 12.5px;">Chưa có bộ đề nào trong chủ đề này</span>
            </div>
          </div>
        </div>
        <div style="text-align:center; padding: 40px 20px;" class="card">
          <span style="font-size: 40px; color: var(--mut);"><ion-icon name="create-outline"></ion-icon></span>
          <h3 style="margin: 12px 0 6px;">Chưa có bộ đề nào thuộc chủ đề "${esc(activeCat.name)}"</h3>
          <p class="mut">Chưa có bộ đề nào trong chủ đề này. Bạn có thể chọn chủ đề khác hoặc vào Thư viện để quản lý.</p>
          <div style="display:flex; justify-content:center; gap:10px; margin-top:16px;">
            <button class="btn gh sm" onclick="filterWritingCategory('all')">← Xem tất cả bộ đề</button>
            <button class="btn au sm" onclick="go('lib')"><ion-icon name="library-outline"></ion-icon> Mở Thư viện quản lý</button>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="writing-cat-header-bar">
        <div class="writing-cat-header-title">
          <span style="font-size: 24px; color: var(--mut);"><ion-icon name="pricetag-outline"></ion-icon></span>
          <div>
            <h3 style="margin: 0; font-size: 17px; font-weight: 800;">Chủ đề: ${esc(activeCat.name)}</h3>
            <span class="mut" style="font-size: 12.5px;">Đang hiển thị ${filtered.length} bộ đề</span>
          </div>
        </div>
      </div>
      <div class="setup-sets-grid">
        ${filtered.map((s, i) => renderCard(s, i)).join('')}
      </div>
    `;
      return;
  }

  // Case 2: "Tất cả" - Hiện HẾT tất cả các bộ đề trong một danh sách lưới chung
  const filtered = writingSets.filter(s => {
    if (isStudent && typeof isSetPrivate === 'function' && isSetPrivate(s, 'writing')) return false;
    if (!query) return true;
    return (s.title && s.title.toLowerCase().includes(query)) ||
           (s.prompt && s.prompt.toLowerCase().includes(query)) ||
           (s.categoryName && s.categoryName.toLowerCase().includes(query));
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 40px 20px;" class="card">
        <span style="font-size: 40px; color: var(--mut);"><ion-icon name="search-outline"></ion-icon></span>
        <h3 style="margin: 12px 0 6px;">Không tìm thấy bộ đề phù hợp</h3>
        <p class="mut">Hãy thử tìm kiếm với từ khóa khác hoặc tự tạo một bộ đề mới!</p>
        <button class="btn au sm" onclick="openCreateWritingSetModal()"><ion-icon name="add-outline"></ion-icon> Tạo bộ đề mới</button>
      </div>
    `;
    return;
  }

  // Sắp xếp các bộ đề theo thứ tự các chủ đề đã thiết lập
  const catOrder = {};
  cats.forEach((c, idx) => { catOrder[c.id] = idx; });
  const sorted = [...filtered].sort((a, b) => {
    const orderA = catOrder[a.category] !== undefined ? catOrder[a.category] : 999;
    const orderB = catOrder[b.category] !== undefined ? catOrder[b.category] : 999;
    if (orderA !== orderB) return orderA - orderB;
    return 0;
  });

  container.innerHTML = `
    <div class="setup-sets-grid">
      ${sorted.map((s, i) => renderCard(s, i)).join('')}
    </div>
  `;
}

// =========================================================================
// WORKSPACE VIEW (SPLIT SCREEN)
// =========================================================================

function openWritingWorkspaceById(setId) {
  const set = writingSets.find(s => s.id === setId);
  if (set) openWritingWorkspace(set);
}

function openWritingWorkspace(set) {
  if (typeof isStudentEntryBlocked === 'function' && isStudentEntryBlocked(set, 'writing')) {
    const info = (typeof getStudentBlockInfo === 'function') ? getStudentBlockInfo(set, 'writing') : { hasSubmissions: false, message: 'Bộ đề luyện viết này đã khóa đối với bạn!' };
    toast(info.message, 'bad');
    if (info.hasSubmissions) {
      openHistoryForSet(set.id, set.title);
    }
    return;
  }
  currentWritingSet = set;
  if (typeof window !== 'undefined') window.currentWritingSetId = set.id;
  if ($('#writing-list-view')) $('#writing-list-view').style.display = 'none';
  if ($('#writing-workspace-view')) $('#writing-workspace-view').style.display = 'block';
  if (window.__SECURITY_SHIELD && typeof window.__SECURITY_SHIELD.startExam === 'function') {
    window.__SECURITY_SHIELD.startExam('writing');
  }

  // Set Nav Title & Badge
  $('#workspace-set-title').textContent = set.title;
  $('#workspace-set-badge').textContent = set.categoryName || set.category;

  const deleteBtn = document.getElementById('btn-delete-opened-writing-set') || document.querySelector('#writing-workspace-view button[onclick*="deleteCurrentOpenedWritingSet"]');
  if (deleteBtn) {
    if (typeof Auth !== 'undefined' && !Auth.canEditContent()) {
      deleteBtn.style.display = 'none';
    } else {
      deleteBtn.style.display = 'inline-flex';
    }
  }

  // Set Prompt Card
  const promptEl = $('#workspace-prompt-text');
  promptEl.textContent = set.prompt;
  isPromptExpanded = false;
  promptEl.classList.add('collapsed');
  const toggleBtn = $('#workspace-prompt-toggle-btn');
  if (set.prompt && set.prompt.length > 150) {
    toggleBtn.style.display = 'inline-block';
    toggleBtn.textContent = 'Xem thêm';
  } else {
    toggleBtn.style.display = 'none';
  }

  // Outline card removed from student workspace (no hints shown during testing)
  const outlineContent = $('#workspace-outline-content');
  if (outlineContent) {
    outlineContent.innerHTML = '';
  }

  // Load existing draft
  loadDraftForCurrentSet();

  // Render Section Inputs in Right Panel
  renderWritingSections();

  // Initialize Scaffolding & Pressure Timer
  if (typeof initWritingScaffoldingAndTimer === 'function') {
    initWritingScaffoldingAndTimer();
  }

  // Start Timer
  startWritingTimer();

  // Setup auto-save every 15s
  clearInterval(autoSaveDraftTimer);
  autoSaveDraftTimer = setInterval(() => {
    saveCurrentWritingDraft(false);
  }, 15000);

  // Initialize split resizer
  setupSplitter();
}

function exitWritingWorkspace(force = false) {
  if (!force && typeof isExamInProgress === 'function' && isExamInProgress()) {
    toast('⚠️ Bạn đang làm bài luyện viết! Phải nộp bài xong mới được thoát.', 'bad');
    return false;
  }
  saveCurrentWritingDraft(false);
  stopWritingTimer();
  clearInterval(autoSaveDraftTimer);
  currentWritingSet = null;
  if (typeof window !== 'undefined') window.currentWritingSetId = null;
  if (window.__SECURITY_SHIELD && typeof window.__SECURITY_SHIELD.endExam === 'function') {
    window.__SECURITY_SHIELD.endExam(Boolean(force));
  }
  showWritingListView();
  return true;
}

function togglePromptExpand() {
  const promptEl = $('#workspace-prompt-text');
  const toggleBtn = $('#workspace-prompt-toggle-btn');
  isPromptExpanded = !isPromptExpanded;
  if (isPromptExpanded) {
    promptEl.classList.remove('collapsed');
    toggleBtn.textContent = 'Thu gọn';
  } else {
    promptEl.classList.add('collapsed');
    toggleBtn.textContent = 'Xem thêm';
  }
}

function renderWritingSections() {
  const container = $('#writing-sections-list');
  if (!container || !currentWritingSet) return;

  const sections = currentWritingSet.sections || [];
  container.innerHTML = sections.map((sec, idx) => {
    const savedText = currentWritingDraft.sections?.[sec.id] || '';
    const wordCount = countWords(savedText);

    return `
      <div class="writing-section-block" data-sec-id="${sec.id}">
        <div class="writing-section-header">
          <label class="writing-section-title" for="sec-input-${sec.id}">
            ${idx + 1}. ${esc(sec.title)}
          </label>
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <button type="button" class="btn cy sm scaffold-trigger-btn" onclick="toggleWritingSectionScaffolding('${esc(sec.id)}', ${idx})" title="Mở Gợi ý tư duy &amp; Sơ đồ dàn ý trống cho phần này">
              💡 Gợi ý tư duy
            </button>
            <span class="writing-section-count" id="sec-count-${sec.id}">
              ${wordCount} từ
            </span>
            <button type="button" class="writing-section-clear-btn" onclick="clearSectionText('${sec.id}')" title="Xóa nội dung đoạn này">
              <ion-icon name="close-circle-outline"></ion-icon> Xóa đoạn
            </button>
          </div>
        </div>

        <div class="scaffold-box writing-sec-scaffold-box" id="writing-sec-scaffold-${esc(sec.id)}" style="display:none;"></div>

        <textarea 
          id="sec-input-${sec.id}"
          class="writing-textarea" 
          placeholder="${esc(sec.placeholder || 'Nhập phần viết ' + sec.title + ' của bạn ở đây...')}"
          oninput="onSectionInput('${sec.id}', this)"
          onpaste="preventPasteCopy(event, 'paste')"
          oncopy="preventPasteCopy(event, 'copy')"
          oncut="preventPasteCopy(event, 'cut')"
          oncontextmenu="return false;"
          spellcheck="false"
          data-ms-editor="false"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
        >${esc(savedText)}</textarea>
      </div>
    `;
  }).join('');

  updateTotalWordsDisplay();
}

function onSectionInput(secId, textareaEl) {
  if (!currentWritingDraft.sections) currentWritingDraft.sections = {};
  currentWritingDraft.sections[secId] = textareaEl.value;

  const wCount = countWords(textareaEl.value);
  const countEl = $(`#sec-count-${secId}`);
  if (countEl) countEl.textContent = `${wCount} từ`;

  updateTotalWordsDisplay();
}

function toggleSampleDisplay(isShown) {
  // Bài văn mẫu tham khảo đã được gỡ bỏ theo yêu cầu
}

function countWords(str) {
  if (!str) return 0;
  const cleaned = str.trim().replace(/\s+/g, ' ');
  if (!cleaned) return 0;
  return cleaned.split(' ').length;
}

function updateTotalWordsDisplay() {
  let total = 0;
  if (currentWritingDraft && currentWritingDraft.sections) {
    for (const val of Object.values(currentWritingDraft.sections)) {
      total += countWords(val);
    }
  }
  const display = $('#workspace-total-words');
  if (display) display.textContent = total;
  return total;
}

// =========================================================================
// TIMER & DRAFT PERSISTENCE
// =========================================================================

function startWritingTimer() {
  stopWritingTimer();
  isWritingTimerRunning = true;
  updateTimerButtonUI();
  writingTimerInterval = setInterval(() => {
    writingTimerSeconds++;
    updateTimerDisplay();
  }, 1000);
}

function stopWritingTimer() {
  isWritingTimerRunning = false;
  clearInterval(writingTimerInterval);
  writingTimerInterval = null;
  updateTimerButtonUI();
}

function toggleWritingTimer() {
  if (isWritingTimerRunning) {
    stopWritingTimer();
  } else {
    startWritingTimer();
  }
}

function updateTimerButtonUI() {
  const btn = $('#workspace-timer-btn');
  if (btn) btn.textContent = isWritingTimerRunning ? '⏸' : '▶️';
}

function updateTimerDisplay() {
  const display = $('#workspace-timer-display');
  if (display) {
    display.textContent = formatSeconds(writingTimerSeconds);
  }
}

function formatSeconds(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  const pad = n => String(n).padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function loadDraftForCurrentSet() {
  if (!currentWritingSet) return;
  const key = 'vq_writing_draft_' + currentWritingSet.id;
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      currentWritingDraft = JSON.parse(raw);
      writingTimerSeconds = currentWritingDraft.elapsedSeconds || 0;
      updateTimerDisplay();
      return;
    }
  } catch (e) {}
  currentWritingDraft = { sections: {}, elapsedSeconds: 0 };
  writingTimerSeconds = 0;
  updateTimerDisplay();
}

function saveCurrentWritingDraft(showToastNotice = true) {
  if (!currentWritingSet) return;
  const key = 'vq_writing_draft_' + currentWritingSet.id;
  currentWritingDraft.elapsedSeconds = writingTimerSeconds;
  currentWritingDraft.totalWords = updateTotalWordsDisplay();
  currentWritingDraft.lastSaved = new Date().toISOString();

  try {
    localStorage.setItem(key, JSON.stringify(currentWritingDraft));
    if (showToastNotice) {
      toast(`Đã lưu bài viết thành công! (${currentWritingDraft.totalWords} từ · ${formatSeconds(writingTimerSeconds)})`, 'ok');
      if (typeof playSound === 'function') playSound('correct');
    }
  } catch (err) {
    if (showToastNotice) toast('Không thể lưu vào bộ nhớ trình duyệt!', 'no');
  }
}

function resetCurrentWritingDraft() {
  ask('Bạn có chắc muốn xóa toàn bộ nội dung đang viết để làm lại từ đầu không?', () => {
    currentWritingDraft = { sections: {}, elapsedSeconds: 0 };
    writingTimerSeconds = 0;
    updateTimerDisplay();
    renderWritingSections();
    saveCurrentWritingDraft(false);
    toast('Đã làm mới không gian viết!', 'ok');
  });
}

function clearSectionText(secId) {
  const input = $(`#sec-input-${secId}`);
  if (!input) return;
  if (!input.value.trim()) {
    toast('Đoạn này hiện đang trống.', '');
    return;
  }
  ask('Bạn có chắc muốn xóa toàn bộ nội dung của đoạn này không?', () => {
    input.value = '';
    onSectionInput(secId, input);
    saveCurrentWritingDraft(false);
    toast('Đã xóa nội dung đoạn thành công!', 'ok');
  });
}

function deleteCurrentOpenedSet() {
  if (!currentWritingSet) return;
  ask(`Bạn có chắc muốn xóa bộ đề "${currentWritingSet.title}" khỏi danh sách không?`, () => {
    const id = currentWritingSet.id;
    writingSets = writingSets.filter(s => s.id !== id);
    try { localStorage.removeItem('vq_writing_draft_' + id); } catch (e) {}
    saveWritingSets();
    exitWritingWorkspace();
    toast('Đã xóa bộ đề thành công!', 'ok');
  });
}

function resetDefaultWritingSets() {
  ask('Khôi phục lại toàn bộ các bộ đề mẫu chuẩn SGK ban đầu của hệ thống?', () => {
    writingSets = JSON.parse(JSON.stringify(DEFAULT_WRITING_SETS));
    saveWritingSets();
    renderWritingSetsGrid();
    toast('Đã khôi phục các bộ đề mẫu thành công!', 'ok');
  });
}

// =========================================================================
// SPLITTER RESIZE LOGIC
// =========================================================================

function setupSplitter() {
  const splitter = $('#writing-splitter');
  const container = $('#writing-split-container');
  const leftPanel = $('#writing-left-panel');
  if (!splitter || !container || !leftPanel) return;

  let isDragging = false;

  splitter.onmousedown = function(e) {
    if (window.innerWidth <= 900) return;
    isDragging = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    function onMouseMove(ev) {
      if (!isDragging) return;
      const rect = container.getBoundingClientRect();
      const offset = ev.clientX - rect.left;
      const minW = 280;
      const maxW = rect.width - 320;
      if (offset >= minW && offset <= maxW) {
        const percent = (offset / rect.width) * 100;
        container.style.gridTemplateColumns = `${percent}% 12px 1fr`;
      }
    }

    function onMouseUp() {
      isDragging = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };
}

// =========================================================================
// MODAL 1: TẠO & CHỈNH SỬA BỘ ĐỀ
// =========================================================================

function updateModalCategorySelect(selectedId) {
  const select = $('#input-set-category');
  if (!select) return;
  const cats = getWritingCategories();
  select.innerHTML = cats.map(c => `
    <option value="${c.id}" ${c.id === selectedId ? 'selected' : ''}>${c.icon} ${esc(c.name)}</option>
  `).join('');
}

function openCreateWritingSetModal(presetCat) {
  if (typeof Auth !== 'undefined' && !Auth.canEditContent()) {
    toast('Chỉ giáo viên mới có quyền tạo bộ đề luyện viết!', 'bad');
    return;
  }
  const dlg = $('#writing-set-dialog');
  if (!dlg) return;

  const targetCat = presetCat || (currentWritingCategory !== 'all' ? currentWritingCategory : 'nl-xh');

  $('#writing-dialog-heading').textContent = 'Tạo bộ đề luyện viết mới';
  $('#edit-writing-set-id').value = '';
  $('#input-set-title').value = '';
  updateModalCategorySelect(targetCat);
  $('#input-set-prompt').value = '';
  if ($('#writing-form-max-attempts')) $('#writing-form-max-attempts').value = 0;
  if ($('#writing-form-deadline')) $('#writing-form-deadline').value = '';
  if ($('#writing-form-privacy')) $('#writing-form-privacy').value = 'public';
  if ($('#writing-form-open-at')) $('#writing-form-open-at').value = '';

  // Nạp mẫu dàn ý theo dạng đề
  applyQuickOutlineTemplate(targetCat);

  dlg.showModal();
}

function editWritingSet(id) {
  if (typeof Auth !== 'undefined' && !Auth.canEditContent()) {
    toast('Chỉ giáo viên mới có quyền chỉnh sửa bộ đề!', 'bad');
    return;
  }
  if (!writingSets || !writingSets.length) loadWritingSets();
  const targetId = id || (currentWritingSet && currentWritingSet.id) || (typeof window !== 'undefined' ? window.currentWritingSetId : null);
  const set = writingSets.find(s => String(s.id) === String(targetId));
  if (!set) return toast('Không tìm thấy bộ đề luyện viết này!', 'bad');

  const dlg = $('#writing-set-dialog');
  if (!dlg) return;

  $('#writing-dialog-heading').textContent = 'Chỉnh sửa bộ đề luyện viết';
  $('#edit-writing-set-id').value = set.id;
  $('#input-set-title').value = set.title || '';
  updateModalCategorySelect(set.category || 'nl-xh');
  $('#input-set-prompt').value = set.prompt || '';
  const limitEl = $('#writing-form-max-attempts');
  if (limitEl) {
    limitEl.value = (typeof getSetMaxAttempts === 'function' ? getSetMaxAttempts(set, 'writing') : (set.maxAttempts || 0));
  }
  const deadlineEl = $('#writing-form-deadline');
  if (deadlineEl) {
    deadlineEl.value = (typeof getSetDeadline === 'function' ? getSetDeadline(set, 'writing') : (set.deadline || ''));
  }
  const privacyEl = $('#writing-form-privacy');
  if (privacyEl) {
    privacyEl.value = (typeof getSetPrivacy === 'function' ? getSetPrivacy(set, 'writing') : (set.privacy || 'public'));
  }
  const openAtEl = $('#writing-form-open-at');
  if (openAtEl) {
    openAtEl.value = (typeof getSetOpenAt === 'function' ? getSetOpenAt(set, 'writing') : (set.openAt || ''));
  }

  editingSections = JSON.parse(JSON.stringify(set.sections || []));
  renderModalSectionsEditor();

  dlg.showModal();
}
window.editWritingSet = editWritingSet;
window.openEditWritingSetModal = editWritingSet;

function closeCreateWritingSetModal() {
  const dlg = $('#writing-set-dialog');
  if (dlg && dlg.open) dlg.close();
}

function onCategorySelectChange(cat) {
  const editId = $('#edit-writing-set-id')?.value;
  if (!editId) {
    applyQuickOutlineTemplate(cat);
  }
}



function applyQuickOutlineTemplate(forcedCategory) {
  const cat = forcedCategory || $('#input-set-category').value;
  if (cat === 'doan-nlvh') {
    editingSections = [
      {
        id: 'sec_' + uid(),
        title: 'Đoạn văn Nghị luận Văn học (~200 chữ - Không xuống dòng)',
        guide: '• Hình thức: Chỉ viết trong 1 đoạn văn, không xuống hàng (~200 chữ).\n• Cấu trúc: Mở đoạn (Câu trích dẫn + Nêu VĐNL) ➔ Phân tích 2-3 luận điểm (Gọi tên yếu tố + dẫn chứng + tác dụng) ➔ Đánh giá & Nghệ thuật ➔ Kết đoạn – trích dẫn.',
        sample: ''
      }
    ];
  } else if (cat === 'bai-nlvh' || cat === 'nl-vh') {
    editingSections = [
      {
        id: 'sec_' + uid(),
        title: 'I. Mở bài',
        guide: 'Trích dẫn – dẫn dắt – giới thiệu tác giả, tác phẩm và câu chốt vấn đề nghị luận.',
        sample: ''
      },
      {
        id: 'sec_' + uid(),
        title: 'II. Thân bài - Phân tích & Đánh giá Nội dung, Chủ đề',
        guide: 'Bước 1: Phân tích (Gọi tên yếu tố + nêu dẫn chứng + phân tích tác dụng) theo đặc trưng thể loại Thơ/Truyện.\nBước 2: Đánh giá vai trò đối với chủ đề và thông điệp tư tưởng.',
        sample: ''
      },
      {
        id: 'sec_' + uid(),
        title: 'II. Thân bài - Phân tích Hình thức Nghệ thuật & Mở rộng',
        guide: 'Phân tích các yếu tố nghệ thuật đặc sắc (Thơ: thể thơ, từ ngữ, hình ảnh, BPTT, vần nhịp, giọng điệu | Truyện: ngôi kể, điểm nhìn, nhan đề, tình huống, chi tiết tiêu biểu, ngôn ngữ, giọng điệu).',
        sample: ''
      },
      {
        id: 'sec_' + uid(),
        title: 'III. Kết bài',
        guide: 'Khái quát lại giá trị nội dung và nghệ thuật của tác phẩm; nêu sức sống của tác phẩm trong lòng người đọc.',
        sample: ''
      }
    ];
  } else if (cat === 'doan-nlxh') {
    editingSections = [
      {
        id: 'sec_' + uid(),
        title: 'Đoạn văn Nghị luận Xã hội (~200 chữ - Không xuống dòng)',
        guide: '• Hình thức: Chỉ viết trong 1 đoạn văn, không xuống hàng (~200 chữ).\n• Mở đoạn: Nêu VĐNL.\n• Thân đoạn (4 bước): 1. Giải thích (1 câu) ➔ 2. Bàn luận 3 luận điểm (Ý nghĩa: Thứ nhất giúp mở rộng hiểu biết/bản lĩnh; Thứ hai giúp thành công/hạnh phúc; Thứ ba đối với xã hội | Giải pháp: Thứ nhất cá nhân; Thứ hai gia đình/nhà trường; Thứ ba cộng đồng/xã hội) ➔ 3. Dẫn chứng thực tế ➔ 4. Bài học nhận thức, hành động & Kết đoạn.',
        sample: ''
      }
    ];
  } else {
    // bai-nlxh (Bài văn Nghị luận xã hội ~600 chữ)
    editingSections = [
      {
        id: 'sec_' + uid(),
        title: 'I. Mở bài & Đoạn 1: Giải thích',
        guide: 'Mở bài: Dẫn dắt và nêu vấn đề nghị luận.\nĐoạn 1 (Giải thích): Giải thích từ ngữ quan trọng, vế câu, rút ra ý nghĩa cả câu hoặc nêu thực trạng vấn đề.',
        sample: ''
      },
      {
        id: 'sec_' + uid(),
        title: 'II. Thân bài - Bàn luận & Chứng minh (3 luận điểm tách đoạn + Dẫn chứng)',
        guide: 'Trả lời: Vì sao đặt ra vấn đề này? Vấn đề này có ý nghĩa gì? (Đưa ra 3 luận điểm Ý nghĩa 1, Ý nghĩa 2, Ý nghĩa 3 tách đoạn rõ ràng + Dẫn chứng thực tế).',
        sample: ''
      },
      {
        id: 'sec_' + uid(),
        title: 'III. Phê phán mở rộng, Giải pháp liên hệ bản thân & Kết bài',
        guide: '• Đoạn Phê phán, mở rộng vấn đề.\n• Đoạn Giải pháp, liên hệ bản thân, bài học nhận thức và hành động.\n• Kết bài: Khẳng định lại ý nghĩa vấn đề.',
        sample: ''
      }
    ];
  }

  renderModalSectionsEditor();
}

function addNewOutlineSectionRow() {
  const titles = ['Mở bài', 'Thân bài', 'Kết bài'];
  const nextTitle = editingSections.length < 3 ? titles[editingSections.length] : `Phần ${editingSections.length + 1}`;
  editingSections.push({
    id: 'sec_' + uid(),
    title: nextTitle,
    guide: '',
    sample: ''
  });
  renderModalSectionsEditor();
}

function removeModalSectionRow(idx) {
  if (editingSections.length <= 1) {
    toast('Bộ đề cần có ít nhất 1 phần bài viết!', 'no');
    return;
  }
  editingSections.splice(idx, 1);
  renderModalSectionsEditor();
}

function renderModalSectionsEditor() {
  const container = $('#modal-sections-editor');
  if (!container) return;
  $('#modal-section-count').textContent = editingSections.length;

  container.innerHTML = editingSections.map((sec, idx) => `
    <div class="modal-section-item">
      <div class="modal-section-item-head">
        <span style="font-weight:900; color:var(--primary); font-size:14px; padding:4px 8px; background:rgba(99,102,241,0.1); border-radius:8px;">#${idx + 1}</span>
        <input 
          type="text" 
          value="${esc(sec.title)}" 
          placeholder="Tên phần (ví dụ: Mở bài, Luận điểm 1, Phân tích nghệ thuật, Kết bài...)" 
          oninput="editingSections[${idx}].title = this.value"
          required
        >
        <button type="button" class="btn no sm" onclick="removeModalSectionRow(${idx})" title="Xóa phần này">✕</button>
      </div>
      <div class="modal-section-inputs">
        <div class="modal-field-col" style="flex:1;">
          <label class="modal-sub-label">Hướng dẫn chấm / Yêu cầu cần đạt cho phần này:</label>
          <textarea 
            placeholder="Nêu yêu cầu cần đạt, định hướng luận cứ để giáo viên chấm điểm..." 
            oninput="editingSections[${idx}].guide = this.value"
          >${esc(sec.guide || '')}</textarea>
        </div>
      </div>
    </div>
  `).join('');
}

function handleSaveWritingSet(e) {
  if (e) e.preventDefault();
  const editId = $('#edit-writing-set-id').value;
  const title = $('#input-set-title').value.trim();
  const category = $('#input-set-category').value;
  const prompt = $('#input-set-prompt').value.trim();

  if (!title || !prompt) {
    toast('Vui lòng nhập tên bộ đề và nội dung đề bài!', 'no');
    return;
  }

  if (editingSections.length === 0) {
    toast('Vui lòng tạo ít nhất 1 phần bài viết!', 'no');
    return;
  }

  const categoryNames = {};
  const icons = {};
  getWritingCategories().forEach(c => {
    categoryNames[c.id] = c.name;
    icons[c.id] = c.icon;
  });

  let targetSet = null;
  const maxAttempts = Math.max(0, parseInt($('#writing-form-max-attempts')?.value, 10) || 0);
  const deadline = ($('#writing-form-deadline')?.value || '').trim();
  const privacy = ($('#writing-form-privacy')?.value || 'public').trim();
  const openAt = ($('#writing-form-open-at')?.value || '').trim();

  if (editId) {
    const idx = writingSets.findIndex(s => String(s.id) === String(editId));
    if (idx !== -1) {
      writingSets[idx] = {
        ...writingSets[idx],
        title,
        category,
        categoryName: categoryNames[category] || category,
        icon: icons[category] || '✍️',
        prompt,
        privacy,
        openAt,
        maxAttempts,
        deadline,
        sections: JSON.parse(JSON.stringify(editingSections))
      };
      targetSet = writingSets[idx];
      if (typeof getSetAttemptLimitsMap === 'function' && typeof saveSetAttemptLimitsMap === 'function') {
        const map = getSetAttemptLimitsMap();
        map[String(editId)] = maxAttempts;
        saveSetAttemptLimitsMap(map);
      }
      if (typeof getSetDeadlinesMap === 'function' && typeof saveSetDeadlinesMap === 'function') {
        const dMap = getSetDeadlinesMap();
        if (deadline) dMap[String(editId)] = deadline;
        else delete dMap[String(editId)];
        saveSetDeadlinesMap(dMap);
      }
      if (typeof getSetPrivacyMap === 'function' && typeof saveSetPrivacyMap === 'function') {
        const pMap = getSetPrivacyMap();
        pMap[String(editId)] = privacy;
        saveSetPrivacyMap(pMap);
      }
      if (typeof getSetOpenAtMap === 'function' && typeof saveSetOpenAtMap === 'function') {
        const oMap = getSetOpenAtMap();
        if (openAt) oMap[String(editId)] = openAt;
        else delete oMap[String(editId)];
        saveSetOpenAtMap(oMap);
      }
      toast('Đã cập nhật bộ đề luyện viết thành công!', 'ok');
    }
  } else {
    const newId = 'ws_' + uid();
    const newSet = {
      id: newId,
      title,
      category,
      categoryName: categoryNames[category] || category,
      icon: icons[category] || '✍️',
      prompt,
      privacy,
      openAt,
      maxAttempts,
      deadline,
      sections: JSON.parse(JSON.stringify(editingSections))
    };
    writingSets.unshift(newSet);
    targetSet = newSet;
    if (typeof getSetAttemptLimitsMap === 'function' && typeof saveSetAttemptLimitsMap === 'function') {
      const map = getSetAttemptLimitsMap();
      map[String(newId)] = maxAttempts;
      saveSetAttemptLimitsMap(map);
    }
    if (typeof getSetDeadlinesMap === 'function' && typeof saveSetDeadlinesMap === 'function') {
      const dMap = getSetDeadlinesMap();
      if (deadline) dMap[String(newId)] = deadline;
      else delete dMap[String(newId)];
      saveSetDeadlinesMap(dMap);
    }
    if (typeof getSetPrivacyMap === 'function' && typeof saveSetPrivacyMap === 'function') {
      const pMap = getSetPrivacyMap();
      pMap[String(newId)] = privacy;
      saveSetPrivacyMap(pMap);
    }
    if (typeof getSetOpenAtMap === 'function' && typeof saveSetOpenAtMap === 'function') {
      const oMap = getSetOpenAtMap();
      if (openAt) oMap[String(newId)] = openAt;
      else delete oMap[String(newId)];
      saveSetOpenAtMap(oMap);
    }
    toast('Đã tạo bộ đề mới thành công!', 'ok');
  }

  saveWritingSets();
  closeCreateWritingSetModal();

  // Nếu đang mở phòng luyện viết đúng đề này -> cập nhật ngay giao diện phòng viết
  if (currentWritingSet && targetSet && String(currentWritingSet.id) === String(targetSet.id)) {
    openWritingWorkspace(targetSet);
  } else {
    renderCategoryFilterBar();
    renderWritingSetsGrid();
  }

  // Đồng bộ giao diện Thư viện (Kho học liệu) nếu đang mở
  if (typeof renderLibWritingPane === 'function') renderLibWritingPane();
  if (typeof updateLibTabsUI === 'function') updateLibTabsUI();
}

function deleteCurrentOpenedWritingSet() {
  if (typeof Auth !== 'undefined' && !Auth.canEditContent()) {
    toast('Chỉ giáo viên mới có quyền xóa bộ đề!', 'bad');
    return;
  }
  if (!currentWritingSet) return;
  const id = currentWritingSet.id;
  ask(`Bạn có chắc muốn xóa đề luyện viết "${currentWritingSet.title}" này không?`, () => {
    writingSets = writingSets.filter(s => String(s.id) !== String(id));
    try { localStorage.removeItem('vq_writing_draft_' + id); } catch (e) {}
    saveWritingSets();
    exitWritingWorkspace();
    toast('Đã xóa bộ đề luyện viết!', 'ok');
  });
}
window.deleteCurrentOpenedWritingSet = deleteCurrentOpenedWritingSet;

function deleteWritingSet(id) {
  if (typeof Auth !== 'undefined' && !Auth.canEditContent()) {
    toast('Chỉ giáo viên mới có quyền xóa bộ đề!', 'bad');
    return;
  }
  ask('Bạn có chắc muốn xóa bộ đề luyện viết này không?', () => {
    writingSets = writingSets.filter(s => s.id !== id);
    try { localStorage.removeItem('vq_writing_draft_' + id); } catch (e) {}
    saveWritingSets();
    renderCategoryFilterBar();
    renderWritingSetsGrid();
    toast('Đã xóa bộ đề!', 'ok');
  });
}

function duplicateWritingSet(id) {
  if (typeof Auth !== 'undefined' && !Auth.canEditContent()) {
    toast('Chỉ giáo viên mới có quyền nhân bản bộ đề!', 'bad');
    return;
  }
  const set = writingSets.find(s => s.id === id);
  if (!set) return;
  const clone = JSON.parse(JSON.stringify(set));
  clone.id = 'ws_' + uid();
  clone.title = clone.title + ' (Bản sao)';
  writingSets.unshift(clone);
  saveWritingSets();
  renderWritingSetsGrid();
  toast('Đã nhân bản bộ đề thành công!', 'ok');
}

// =========================================================================
// MODAL 2: XEM BÀI VIẾT HOÀN CHỈNH & XUẤT BÀI
// =========================================================================

function openWritingReviewModal() {
  if (!currentWritingSet) return;
  const dlg = $('#writing-review-dialog');
  if (!dlg) return;

  saveCurrentWritingDraft(false);

  const totalWords = updateTotalWordsDisplay();
  const sections = currentWritingSet.sections || [];
  
  // Combine all section texts
  const paragraphs = [];
  sections.forEach(sec => {
    const text = (currentWritingDraft.sections?.[sec.id] || '').trim();
    if (text) paragraphs.push(text);
  });

  const combinedText = paragraphs.join('\n\n') || '(Chưa có nội dung bài viết. Hãy quay lại và nhập bài làm của bạn nhé!)';
  
  // Stats
  $('#review-stat-words').textContent = totalWords;
  $('#review-stat-paragraphs').textContent = paragraphs.length;
  $('#review-stat-time').textContent = formatSeconds(writingTimerSeconds);
  
  const minutes = Math.max(1, Math.round(writingTimerSeconds / 60));
  const wpm = Math.round(totalWords / minutes);
  $('#review-stat-wpm').textContent = wpm;

  $('#review-essay-topic').textContent = currentWritingSet.title;
  $('#review-essay-combined-content').textContent = combinedText;

  // Automated Feedback Insights
  const feedbackList = $('#review-feedback-content');
  const suggestions = [];

  if (totalWords === 0) {
    suggestions.push('⚠️ Bạn chưa viết từ nào. Hãy dành thời gian hoàn thiện các phần của bài viết nhé.');
  } else {
    if (currentWritingSet.category === 'nl-xh') {
      if (totalWords < 180) {
        suggestions.push(`Đoạn văn nghị luận xã hội 200 chữ thường dao động từ 180 - 250 từ. Bạn đang có ${totalWords} từ, hãy mở rộng thêm dẫn chứng thực tế.`);
      } else if (totalWords > 350) {
        suggestions.push(`Dung lượng khá dài (${totalWords} từ). Nếu là đề bài yêu cầu đoạn văn 200 chữ, bạn nên cô đọng lại các câu giải thích.`);
      } else {
        suggestions.push(`✅ Dung lượng rất phù hợp với dung lượng đoạn văn nghị luận xã hội (${totalWords} từ).`);
      }
    } else if (currentWritingSet.category === 'nl-vh') {
      if (totalWords < 400) {
        suggestions.push(`Bài văn nghị luận văn học nên có từ 400 - 800 từ trở lên để phân tích sâu sắc cả nội dung và nghệ thuật (hiện có ${totalWords} từ).`);
      } else {
        suggestions.push(`✅ Dung lượng bài viết tương đối đầy đủ (${totalWords} từ).`);
      }
    } else if (currentWritingSet.category === 'cam-thu') {
      if (totalWords < 150) {
        suggestions.push(`Đoạn văn cảm thụ nên phát triển từ 150 - 250 từ để làm nổi bật cái hay, cái đẹp của hình tượng ngôn từ.`);
      } else {
        suggestions.push(`✅ Dung lượng đoạn văn cảm thụ đạt chuẩn (${totalWords} từ).`);
      }
    }

    if (paragraphs.length < sections.length) {
      suggestions.push(`Bạn còn ${sections.length - paragraphs.length} phần của bài viết chưa hoàn thành.`);
    } else {
      suggestions.push(`Bạn đã hoàn thành đầy đủ cả ${sections.length} phần của bài viết! Bố cục mạch lạc và đồng đều.`);
    }
  }

  feedbackList.innerHTML = suggestions.map(s => `<div style="margin-bottom:6px;">${s}</div>`).join('');

  dlg.showModal();
}

function closeWritingReviewModal() {
  const dlg = $('#writing-review-dialog');
  if (dlg && dlg.open) dlg.close();
}

function copyCombinedEssayToClipboard() {
  const text = $('#review-essay-combined-content')?.textContent;
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    toast('Đã sao chép toàn bộ bài viết vào bộ nhớ tạm!', 'ok');
  }).catch(() => {
    toast('Không thể tự động sao chép, bạn hãy bôi đen để sao chép nhé.', 'no');
  });
}

function downloadCombinedEssayAsText() {
  if (!currentWritingSet) return;
  const topic = currentWritingSet.title || 'Bai_Luyen_Viet';
  const text = $('#review-essay-combined-content')?.textContent || '';
  const dateStr = new Date().toLocaleDateString('vi-VN');
  
  const fileContent = `=== BÀI LUYỆN VIẾT: ${topic} ===\nNgày viết: ${dateStr}\nThời gian làm: ${formatSeconds(writingTimerSeconds)}\nTổng số từ: ${updateTotalWordsDisplay()}\n\n--- NỘI DUNG BÀI VIẾT ---\n\n${text}\n\n=== HẾT ===`;

  const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${topic.replace(/[^a-zA-Z0-9_\u00C0-\u1EF9]/g, '_')}.txt`;
  a.click();
  URL.revokeObjectURL(a.href);
  toast('Đã tải xuống tệp bài viết!', 'ok');
}

// =========================================================================
// NỘP BÀI VIẾT VÀO LỊCH SỬ ĐỂ CHẤM ĐIỂM (THANG 10Đ CHUẨN)
// =========================================================================

function getWritingSectionMaxScore(sec, idx, totalSecs) {
  if (totalSecs === 3) {
    const lowerTitle = (sec?.title || '').toLowerCase();
    if (lowerTitle.includes('mở')) return 2.0;
    if (lowerTitle.includes('kết')) return 2.0;
    if (lowerTitle.includes('thân')) return 6.0;
    return idx === 1 ? 6.0 : 2.0;
  }
  return Math.round((10.0 / Math.max(1, totalSecs)) * 10) / 10;
}

function submitWritingEssay() {
  if (!currentWritingSet) {
    toast('Không tìm thấy thông tin bộ đề luyện viết hiện tại!', 'bad');
    return;
  }

  if (typeof isStudentEntryBlocked === 'function' && isStudentEntryBlocked(currentWritingSet, 'writing')) {
    const info = (typeof getStudentBlockInfo === 'function') ? getStudentBlockInfo(currentWritingSet, 'writing') : { message: 'Đề luyện viết này đã kết thúc!' };
    toast(`⚠️ ${info.message}`, 'bad');
    return;
  }

  saveCurrentWritingDraft(false);

  const totalWords = updateTotalWordsDisplay();
  const sections = currentWritingSet.sections || [];

  if (totalWords === 0) {
    toast('Vui lòng viết nội dung bài làm trước khi nộp bài!', 'bad');
    return;
  }

  const answeredSections = sections.filter(sec => {
    const text = (currentWritingDraft.sections?.[sec.id] || '').trim();
    return text.length > 0;
  });

  const confirmMsg = answeredSections.length < sections.length
    ? `Bạn mới viết ${answeredSections.length}/${sections.length} phần của bài viết (${totalWords} từ). Bạn có chắc chắn muốn nộp bài chấm điểm không?`
    : `Xác nhận nộp bài viết "${currentWritingSet.title}" (${totalWords} từ) để lưu vào lịch sử và gửi giáo viên chấm điểm?`;

  if (!confirm(confirmMsg)) return;

  const user = typeof Auth !== 'undefined' ? Auth.getCurrentUser() : null;
  const pName = (user ? (user.full_name || user.username) : (localStorage.getItem('vq_player_nick') || localStorage.getItem('vq_player_name') || '')).trim() || 'Học sinh';
  const cName = (user ? (user.class_name || '') : (localStorage.getItem('vq_player_class') || '')).trim();

  const details = sections.map((sec, idx) => {
    const text = (currentWritingDraft.sections?.[sec.id] || '').trim();
    const words = countWords(text);
    const maxScore = getWritingSectionMaxScore(sec, idx, sections.length);
    return {
      questionNumber: idx + 1,
      questionText: sec.title || `Phần ${idx + 1}`,
      questionType: 'Luyện viết',
      sectionId: sec.id,
      sectionTitle: sec.title || `Phần ${idx + 1}`,
      sectionGuide: sec.guide || '',
      userAnswer: text,
      words: words,
      maxScore: maxScore,
      points: 0,
      gradeStatus: 'saved',
      status: 'saved',
      isGraded: false,
      teacherComment: ''
    };
  });

  const entry = {
    id: 'hist_' + uid(),
    timestamp: Date.now(),
    dateStr: new Date().toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }),
    type: 'writing',
    userId: user ? user.id : '',
    username: user ? user.username : '',
    userRole: user ? user.role : 'student',
    playerName: pName,
    className: cName,
    setId: String(currentWritingSet.id),
    setTitle: currentWritingSet.title || 'Luyện viết văn',
    setTopic: currentWritingSet.categoryName || 'Luyện viết',
    setEmo: currentWritingSet.icon || '✍️',
    score: 0,
    totalWords: totalWords,
    totalQuestions: sections.length,
    answeredCount: answeredSections.length,
    savedShortCount: totalWords,
    elapsedSeconds: writingTimerSeconds,
    isGraded: false,
    teacherFeedback: '',
    teacherName: '',
    details: details
  };

  try {
    if (typeof saveQuizAttemptToHistory === 'function') {
      saveQuizAttemptToHistory(entry);
    } else {
      const historyKey = typeof QUIZ_HISTORY_KEY !== 'undefined' ? QUIZ_HISTORY_KEY : 'vq_quiz_history_v1';
      const raw = localStorage.getItem(historyKey);
      const hist = raw ? JSON.parse(raw) : [];
      hist.unshift(entry);
      localStorage.setItem(historyKey, JSON.stringify(hist));
    }

    if (window.__SECURITY_SHIELD && typeof window.__SECURITY_SHIELD.endExam === 'function') {
      window.__SECURITY_SHIELD.endExam(true);
    }

    // 1. Đóng modal xem bài nếu đang mở
    if (typeof closeWritingReviewModal === 'function') {
      closeWritingReviewModal();
    }

    // 2. Thoát khỏi phòng viết văn và dọn dẹp bộ đếm
    if (typeof exitWritingWorkspace === 'function') {
      exitWritingWorkspace(true);
    }

    // 3. Chuyển ngay ra Trang chủ
    if (typeof go === 'function') {
      go('home');
    }

    // 4. Hiển thị thông báo nộp bài thành công
    toast(`🎉 Nộp bài thành công! Bài làm (${totalWords} từ) đã được gửi và lưu vào Lịch sử bài làm.`, 'ok');
  } catch (err) {
    console.error('Submit writing error:', err);
    toast('Lỗi khi lưu bài viết vào lịch sử.', 'bad');
  }
}

if (typeof window !== 'undefined') {
  window.submitWritingEssay = submitWritingEssay;
  window.getWritingSectionMaxScore = getWritingSectionMaxScore;
  window.promptAddNewCategory = promptAddNewCategory;
  window.promptDeleteCurrentCategory = promptDeleteCurrentCategory;
  window.promptDeleteCategory = promptDeleteCategory;
}



/* =========================================================================
   READING COMPREHENSION MODULE (ĐỌC HIỂU NGỮ VĂN)
   ========================================================================= */

const DEFAULT_READING_CATEGORIES = [
  'Nghị luận & Kỹ năng sống',
  'Thơ hiện đại',
  'Văn xuôi & Tản văn',
  'Nghị luận & Thông tin'
];

const DEFAULT_READING_SETS = [
  {
    id: 'reading_preset_inamori',
    title: 'Sống hết mình cho thời khắc hiện tại',
    work: 'Cách sống: từ bình thường trở nên phi thường',
    category: 'Nghị luận & Kỹ năng sống',
    genre: 'Văn bản nghị luận',
    author: 'Inamori Kazuo',
    source: '(Trích Cách sống: từ bình thường trở nên phi thường, Inamori Kazuo, NXB Lao động, 2020, tr. 103-104)',
    passage: `Không cần ngôn ngữ, mọi sự sống nhỏ nhoi trong tự nhiên đều dạy cho loài người chứng kiến tầm quan trọng của việc "sống hết mình ở thời khắc này". Chẳng hạn tại vùng Tsunoda thuộc Bắc cực, giữa mùa hè ngắn ngủi, các loại thực vật đua nhau nảy mầm, nở thật nhiều hoa, kết hạt, chen chúc vươn mình trong khoảng không với mảnh đời thật ngắn ngủi. Có lẽ chúng chuẩn bị sẵn sàng để đối phó với mùa đông dài khắc nghiệt sắp tới và phó thác sinh mạng mình cho tự nhiên. Rõ ràng là chúng thực sự sống hết mình cho hiện tại, không ảo tưởng, không phân tâm.

Ngay cả ở vùng sa mạc khô cằn Sahara, nơi mà mỗi năm chỉ có một hai cơn mưa, nhưng mỗi khi có những giọt nước mưa hiếm hoi trút xuống thì các loài thực vật lại vội vã nảy mầm và nở hoa. Và trong khoảng thời gian từ một đến hai tuần ngắn ngủi, chúng ra hạt, oằn mình chịu đựng trong cát, trong cái nóng như thiêu như đốt, tiếp tục sống chờ đến trận mưa sau để nòi giống của chúng sẽ lại trỗi dậy... Quả thật là muôn loài trong tự nhiên đều sống hết mình, sống nghiêm túc trong từng khoảnh khắc, trong suốt khoảng thời gian sống được hạn định.

Sống hết mình cho hiện tại sẽ đưa sự sống, dù nhỏ bé, vươn đến ngày mai. Vậy thì loài người chúng ta lại càng phải biết trân trọng cuộc sống mỗi ngày để không thua kém cỏ cây muông thú.`,
    questions: [
      {
        id: 'q1',
        level: 'nhan-biet',
        levelName: 'Nhận biết (Câu 1)',
        maxScore: 1.0,
        text: 'Xác định phương thức biểu đạt chính được sử dụng trong đoạn trích.',
        guide: '- Phương thức biểu đạt chính: Nghị luận.\n- Phương thức kết hợp: Miêu tả, biểu cảm.'
      },
      {
        id: 'q2',
        level: 'nhan-biet',
        levelName: 'Nhận biết (Câu 2)',
        maxScore: 1.0,
        text: 'Theo đoạn trích, các loài thực vật ở vùng Tsunoda thuộc Bắc cực sinh trưởng như thế nào giữa mùa hè ngắn ngủi?',
        guide: '- Theo đoạn trích, giữa mùa hè ngắn ngủi, các loài thực vật ở vùng Tsunoda thuộc Bắc cực: "đua nhau nảy mầm, nở thật nhiều hoa, kết hạt, chen chúc vươn mình trong khoảng không với mảnh đời thật ngắn ngủi".'
      },
      {
        id: 'q3',
        level: 'thong-hieu',
        levelName: 'Thông hiểu (Câu 3)',
        maxScore: 1.0,
        text: 'Chỉ ra những điểm tương đồng về sự sống của các loài thực vật ở vùng Tsunoda thuộc Bắc cực và ở vùng sa mạc Sahara trong đoạn trích.',
        guide: '- Những điểm tương đồng về sự sống của thực vật ở hai vùng:\n+ Đều sinh tồn trong môi trường tự nhiên khắc nghiệt, thử thách sinh tử (mùa đông giá lạnh dài ngày ở Bắc cực và nắng nóng thiêu đốt, khô cằn ở sa mạc Sahara).\n+ Đều tận dụng tối đa khoảng thời gian thuận lợi ngắn ngủi (mùa hè ngắn ngủi hoặc những giọt nước mưa hiếm hoi) để vội vã nảy mầm, nở hoa, ra hạt duy trì sự sống.\n+ Đều sống hết mình, sống nghiêm túc trong từng khoảnh khắc được hạn định, không ảo tưởng, không phân tâm.'
      },
      {
        id: 'q4',
        level: 'thong-hieu',
        levelName: 'Thông hiểu (Câu 4)',
        maxScore: 1.0,
        text: 'Anh/ Chị có đồng tình với nhận định của tác giả: “Sống hết mình cho hiện tại sẽ đưa sự sống, dù nhỏ bé, vươn đến ngày mai”? Vì sao?',
        guide: '- Bày tỏ quan điểm rõ ràng: Đồng tình (hoặc đồng tình phần lớn với lý lẽ thuyết phục).\n- Lý giải thuyết phục:\n+ Hiện tại là nền tảng trực tiếp kiến tạo nên tương lai; khi dốc hết tâm sức sống trọn vẹn ở thời khắc này, ta tích lũy giá trị nội lực và tôi luyện ý chí kiên cường.\n+ Dù cá nhân hay sự sống có nhỏ bé trước vũ trụ bao la, thái độ sống nhiệt huyết, kiên trì sẽ mở ra cơ hội sinh tồn và phát triển bền vững cho ngày mai.\n+ Sống hết mình cho hiện tại giúp con người không phải hối tiếc về quá khứ và vững vàng, tự tin bước tới tương lai.'
      },
      {
        id: 'q5',
        level: 'van-dung',
        levelName: 'Vận dụng (Đoạn văn ~200 chữ)',
        maxScore: 2.0,
        text: 'Từ nội dung đoạn trích ở phần đọc hiểu, anh/chị hãy viết một đoạn văn (khoảng 200 chữ) trình bày suy nghĩ của bản thân về sự cần thiết phải trân trọng cuộc sống mỗi ngày.',
        guide: '1. Yêu cầu hình thức:\n- Viết đúng hình thức một đoạn văn nghị luận xã hội dung lượng khoảng 200 chữ.\n- Diễn đạt trôi chảy, lập luận chặt chẽ, không mắc lỗi chính tả, dùng từ.\n\n2. Yêu cầu nội dung:\n- Mở đoạn: Dẫn dắt vấn đề từ ngữ liệu đọc hiểu: Sự cần thiết phải trân trọng cuộc sống mỗi ngày.\n- Thân đoạn:\n  + Giải thích: Trân trọng cuộc sống mỗi ngày là thái độ sống tích cực, biết quý giá trị thời gian, sống có ý nghĩa và nỗ lực hết mình trong từng khoảnh khắc.\n  + Vì sao cần trân trọng: Đời người là hữu hạn, mỗi ngày trôi qua không bao giờ trở lại; sống trọn vẹn giúp ta hoàn thiện bản thân, lan tỏa yêu thương và tạo dựng nền tảng vững chắc cho tương lai.\n  + Dẫn chứng: Cỏ cây nơi Bắc cực hay sa mạc Sahara dù gặp nghịch cảnh vẫn sống kiên cường; con người càng cần nỗ lực không ngừng nghỉ.\n  + Phản đề: Phê phán những người sống thờ ơ, lãng phí thời gian vào mạng xã hội hay chìm đắm trong ảo tưởng, lo âu viển vông.\n- Kết đoạn & Liên hệ bản thân: Bài học nhận thức và hành động: Bản thân mỗi học sinh cần sống có lý tưởng, học tập chăm chỉ và trân quý từng ngày được sống, được cống hiến.'
      }
    ]
  },
  {
    id: 'reading_preset_rosie',
    title: 'Khát vọng dấn thân và giá trị của trải nghiệm',
    work: 'Tuổi trẻ đáng giá bao nhiêu?',
    category: 'Nghị luận & Kỹ năng sống',
    genre: 'Văn bản nghị luận',
    author: 'Rosie Nguyễn',
    source: '(Trích "Tuổi trẻ đáng giá bao nhiêu?", Rosie Nguyễn, NXB Nhã Nam & Hội Nhà văn, 2018, tr. 85-86)',
    passage: `Thế giới là một cuốn sách mở, và những người không bước ra ngoài khám phá chỉ mới đọc được một trang duy nhất. Tuổi trẻ là tài sản quý giá nhất của đời người, không phải vì ta có sức khỏe dẻo dai hay thời gian dồi dào, mà bởi đây là thời điểm ta có quyền được thử, được sai và được bắt đầu lại mà không sợ hãi. Nếu bạn chọn sống một cuộc đời an nhàn, lặp đi lặp lại những lối mòn cũ kỹ từ ngày này qua ngày khác, bạn đang tự biến tuổi thanh xuân rực rỡ của mình thành một vùng ao tù phẳng lặng.

Nghịch cảnh và những va vấp không sinh ra để vùi dập con người, mà để tôi luyện bản lĩnh và mài giũa ý chí. Giống như loài đại bàng chỉ bay vút lên bầu trời cao rộng khi đối mặt với những cơn giông bão dữ dội, người trẻ chỉ thực sự trưởng thành khi dám bước ra khỏi vùng an toàn, dấn thân vào những thử thách mới và chịu trách nhiệm với cuộc đời mình. Đừng sợ thất bại, bởi thất bại chỉ là một điểm dừng chân tạm thời để bạn học lại bài học về lòng kiên trì. Thứ đáng sợ nhất của tuổi trẻ không phải là vấp ngã, mà là sự hèn nhát, buông xuôi và sống một cuộc đời vô vị, mờ nhạt.

Hãy sống như một dòng sông cuồn cuộn chảy ra biển lớn, vượt qua ghềnh thác để vươn tới đại dương mênh mông, thay vì chấp nhận làm vũng nước đọng khô cạn dưới ánh mặt trời.`,
    questions: [
      {
        id: 'q1',
        level: 'nhan-biet',
        levelName: 'Nhận biết (Câu 1)',
        maxScore: 1.0,
        text: 'Xác định phương thức biểu đạt chính được sử dụng trong đoạn trích trên.',
        guide: '- Phương thức biểu đạt chính: Nghị luận.\n- Phương thức kết hợp: Miêu tả, biểu cảm.'
      },
      {
        id: 'q2',
        level: 'nhan-biet',
        levelName: 'Nhận biết (Câu 2)',
        maxScore: 1.0,
        text: 'Theo đoạn trích, vì sao tuổi trẻ lại được coi là tài sản quý giá nhất của đời người?',
        guide: '- Theo đoạn trích, tuổi trẻ là tài sản quý giá nhất của đời người: "không phải vì ta có sức khỏe dẻo dai hay thời gian dồi dào, mà bởi đây là thời điểm ta có quyền được thử, được sai và được bắt đầu lại mà không sợ hãi".'
      },
      {
        id: 'q3',
        level: 'thong-hieu',
        levelName: 'Thông hiểu (Câu 3)',
        maxScore: 1.0,
        text: 'Chỉ ra và nêu tác dụng của hình ảnh so sánh, đối lập: "Hãy sống như một dòng sông cuồn cuộn chảy ra biển lớn... thay vì chấp nhận làm vũng nước đọng khô cạn" trong đoạn trích.',
        guide: '- Phân tích hình ảnh: Tác giả đối lập giữa "dòng sông cuồn cuộn chảy ra biển lớn" (tượng trưng cho tinh thần dấn thân, khát khao khám phá, vượt qua khó khăn để cống hiến và vươn tới tầm vóc lớn lao) với "vũng nước đọng khô cạn" (tượng trưng cho lối sống an phận, khép kín, thụ động và tàn lụi theo thời gian).\n- Tác dụng: Làm tăng sức gợi cảm, truyền tải thông điệp mạnh mẽ thức tỉnh người trẻ sống có hoài bão, bản lĩnh và không ngừng tiến về phía trước.'
      },
      {
        id: 'q4',
        level: 'thong-hieu',
        levelName: 'Thông hiểu (Câu 4)',
        maxScore: 1.0,
        text: 'Anh/ Chị có đồng tình với nhận định của tác giả: “Thứ đáng sợ nhất của tuổi trẻ không phải là vấp ngã, mà là sự hèn nhát, buông xuôi và sống một cuộc đời vô vị, mờ nhạt”? Vì sao?',
        guide: '- Thí sinh bày tỏ quan điểm rõ ràng: Đồng tình (hoặc đồng tình phần lớn với lý giải thuyết phục).\n- Lý giải hợp lý:\n+ Vấp ngã là quy luật tất yếu giúp con người rút ra bài học kinh nghiệm, trưởng thành và tôi luyện bản lĩnh; sau vấp ngã người ta vẫn có thể đứng dậy làm lại.\n+ Sự hèn nhát, buông xuôi sẽ triệt tiêu ý chí phấn đấu, biến cuộc đời thành chuỗi ngày tẻ nhạt, lãng phí thanh xuân quý giá và không đóng góp được giá trị cho cộng đồng.\n+ Sống không dám dấn thân đồng nghĩa với việc tự tước bỏ cơ hội phát triển của chính mình.'
      },
      {
        id: 'q5',
        level: 'van-dung',
        levelName: 'Vận dụng (Đoạn văn ~200 chữ)',
        maxScore: 2.0,
        text: 'Từ nội dung đoạn trích ở phần đọc hiểu, anh/chị hãy viết một đoạn văn (khoảng 200 chữ) trình bày suy nghĩ của bản thân về ý nghĩa của việc dám bước ra khỏi "vùng an toàn" đối với thế hệ trẻ hôm nay.',
        guide: '1. Yêu cầu hình thức:\n- Viết đúng một đoạn văn nghị luận xã hội dung lượng khoảng 200 chữ.\n- Diễn đạt trôi chảy, lập luận chặt chẽ, không sai chính tả, dùng từ.\n\n2. Yêu cầu nội dung:\n- Mở đoạn: Dẫn dắt thông điệp từ đoạn trích và nêu vấn đề: Ý nghĩa của việc dám bước ra khỏi "vùng an toàn".\n- Thân đoạn:\n  + Giải thích: "Vùng an toàn" là nơi quen thuộc, ít rủi ro và thiếu thử thách; bước ra khỏi vùng an toàn là dám đương đầu với cái mới, thử thách bản thân và chịu trách nhiệm với lựa chọn của mình.\n  + Vì sao cần bước ra: Giúp người trẻ khám phá tiềm năng ẩn giấu, tích lũy kinh nghiệm phong phú, rèn luyện bản lĩnh kiên cường trước biến động thời đại.\n  + Dẫn chứng: Những tấm gương khởi nghiệp sáng tạo, thanh niên dấn thân vào các dự án cộng đồng khó khăn.\n  + Phản đề: Phê phán lối sống an phận thủ thường, sợ thất bại, sống thụ động và ỷ lại vào gia đình.\n- Kết đoạn & Liên hệ bản thân: Bài học nhận thức và hành động: Bản thân mỗi học sinh cần không ngừng học tập, chủ động rèn luyện kỹ năng mới và tự tin dấn thân theo đuổi ước mơ.'
      }
    ]
  },
  {
    id: 'reading_preset_1',
    title: 'Đất Nước và cội nguồn yêu thương',
    work: 'Mặt đường khát vọng',
    category: 'Thơ hiện đại',
    genre: 'Thơ tự do',
    author: 'Nguyễn Khoa Điềm',
    source: '(Trích trường ca "Mặt đường khát vọng", NXB Giải phóng, 1974)',
    passage: `Khi ta lớn lên Đất Nước đã có rồi
Đất Nước có trong những cái "ngày xửa ngày xưa..." mẹ thường hay kể
Đất Nước bắt đầu với miếng trầu bây giờ bà ăn
Đất Nước lớn lên khi dân mình biết trồng tre mà đánh giặc
Tóc mẹ thì bới sau đầu
Cha mẹ thương nhau bằng gừng cay muối mặn
Cái kèo, cái cột thành tên
Hạt gạo phải một nắng hai sương xay, giã, dần, sàng
Đất Nước có từ ngày đó...

...Đất là nơi anh đến trường
Nước là nơi em tắm
Đất Nước là nơi ta hò hẹn
Đất Nước là nơi em đánh rơi chiếc khăn trong nỗi nhớ thầm
Đất là nơi "con chim phượng hoàng bay về hòn núi bạc"
Nước là nơi "con cá ngư ông móng nước biển khơi"
Thời gian đằng đẵng
Không gian mênh mông
Đất Nước là nơi dân mình đoàn tụ...`,
    questions: [
      {
        id: 'q1',
        level: 'nhan-biet',
        levelName: 'Nhận biết (Câu 1)',
        text: 'Chỉ ra thể thơ và phương thức biểu đạt chính của đoạn trích trên.',
        guide: '- Thể thơ: Thơ tự do (không bị gò bó về số chữ trong câu).\n- Phương thức biểu đạt chính: Biểu cảm kết hợp miêu tả và tự sự.'
      },
      {
        id: 'q2',
        level: 'nhan-biet',
        levelName: 'Nhận biết (Câu 2)',
        text: 'Theo tác giả, Đất Nước có từ khi nào và gắn liền với những hình ảnh thân thuộc nào?',
        guide: '- Đất Nước có từ những nét văn hóa, phong tục cổ truyền: câu chuyện cổ tích mẹ kể, miếng trầu bà ăn, phong tục bới tóc sau đầu, truyền thống đánh giặc cứu nước bằng tre làng, đạo lý thủy chung gừng cay muối mặn, cây lúa hạt gạo lao động vất vả.'
      },
      {
        id: 'q3',
        level: 'thong-hieu',
        levelName: 'Thông hiểu (Câu 3)',
        text: 'Anh/chị hiểu như thế nào về hình ảnh: "Cha mẹ thương nhau bằng gừng cay muối mặn"? Nêu tác dụng của hình ảnh này.',
        guide: '- "Gừng cay muối mặn" mượn từ ca dao xưa, tượng trưng cho tình nghĩa thủy chung son sắt, cùng nhau vượt qua thăng trầm, gian khó.\n- Tác dụng: Khắc họa vẻ đẹp tâm hồn người Việt, khẳng định cội nguồn Đất Nước được xây đắp từ tình cảm gia đình bền chặt và đạo nghĩa truyền thống thiêng liêng.'
      },
      {
        id: 'q4',
        level: 'thong-hieu',
        levelName: 'Thông hiểu (Câu 4)',
        text: 'Phân tích ý nghĩa biểu tượng của không gian Đất Nước trong các dòng thơ: "Đất là nơi anh đến trường / Nước là nơi em tắm / Đất Nước là nơi ta hò hẹn...".',
        guide: '- Tác giả tách từ "Đất Nước" thành hai thành tố "Đất" và "Nước" gắn với không gian sinh hoạt, kỷ niệm tuổi thơ và tình yêu lứa đôi riêng tư của mỗi cá nhân.\n- Sau đó hợp nhất thành "Đất Nước" - không gian hò hẹn, nơi hội tụ yêu thương thiêng liêng và gắn bó máu thịt với đời sống con người.'
      },
      {
        id: 'q5',
        level: 'van-dung',
        levelName: 'Vận dụng (Đoạn văn ~200 chữ)',
        text: 'Từ thông điệp của đoạn trích, hãy viết một đoạn văn (khoảng 200 chữ) nêu suy nghĩ của anh/chị về trách nhiệm của thế hệ trẻ đối với quê hương, đất nước hôm nay.',
        guide: '1. Hình thức: Đoạn văn khoảng 200 chữ, hành văn lưu loát, lập luận chặt chẽ.\n2. Nội dung:\n- Mở đoạn: Trách nhiệm của thế hệ trẻ đối với Tổ quốc.\n- Thân đoạn:\n  + Biết trân trọng và phát huy các giá trị văn hóa truyền thống, cội nguồn lịch sử dân tộc.\n  + Ra sức học tập, tu dưỡng đạo đức, làm chủ khoa học công nghệ để cống hiến cho công cuộc hiện đại hóa đất nước.\n  + Sẵn sàng cống hiến và bảo vệ chủ quyền biên giới, biển đảo thiêng liêng.\n  + Phê phán lối sống vô cảm, lười biếng, lai căng mất gốc.\n- Kết đoạn: Bài học hành động và quyết tâm của bản thân.'
      }
    ]
  },
  {
    id: 'reading_preset_2',
    title: 'Thói quen đọc sách và sự trưởng thành tinh thần',
    work: 'Bàn về đọc sách',
    category: 'Nghị luận & Thông tin',
    genre: 'Văn bản nghị luận',
    author: 'Chu Quang Tiềm',
    source: '(Trích "Bàn về đọc sách", SGK Ngữ văn 9, NXB Giáo dục)',
    passage: `Học vấn không chỉ là chuyện đọc sách, nhưng đọc sách vẫn là một con đường quan trọng của học vấn. Bởi vì học vấn không chỉ là chuyện cá nhân, mà là việc của toàn thể nhân loại. Những tri thức quý báu nhất của nhân loại đều được ghi chép và lưu giữ trong sách vở.

Đọc sách là tiếp thu những kinh nghiệm quý báu của cha ông đã tích lũy từ hàng ngàn năm qua. Nếu không đọc sách, con người sẽ phải bắt đầu mọi thứ lại từ con số không, và sự tiến hóa của trí tuệ nhân loại sẽ bị chậm lại vô tận.

Tuy nhiên, đọc sách không cốt lấy nhiều mà cốt lấy tinh. Đọc mười quyển sách một cách qua loa không bằng đọc một quyển sách mà hiểu sâu sắc, suy ngẫm tường tận từng trang và rút ra bài học hành động cho bản thân. Đọc sách có phương pháp chính là chiếc chìa khóa vàng mở ra kho tàng tri thức bao la của cuộc đời.`,
    questions: [
      {
        id: 'q1',
        level: 'nhan-biet',
        levelName: 'Nhận biết (Câu 1)',
        text: 'Theo đoạn trích, vì sao đọc sách là con đường quan trọng của học vấn?',
        guide: '- Vì học vấn là thành quả tích lũy của toàn thể nhân loại, và những tri thức quý báu nhất đều được ghi chép, lưu giữ lại qua các trang sách.'
      },
      {
        id: 'q2',
        level: 'nhan-biet',
        levelName: 'Nhận biết (Câu 2)',
        text: 'Tác giả chỉ ra hậu quả gì đối với con người nếu không đọc sách?',
        guide: '- Nếu không đọc sách, con người sẽ phải bắt đầu mọi thứ lại từ con số không, và sự tiến hóa của trí tuệ nhân loại sẽ bị chậm lại vô tận.'
      },
      {
        id: 'q3',
        level: 'thong-hieu',
        levelName: 'Thông hiểu (Câu 3)',
        text: 'Tác giả quan niệm thế nào về việc "đọc sách không cốt lấy nhiều mà cốt lấy tinh"?',
        guide: '- Tác giả nhấn mạnh chất lượng hơn số lượng: Đọc sách cần sự tập trung, thấu hiểu tường tận bản chất vấn đề, nghiền ngẫm sâu sắc thay vì chỉ đọc lướt qua loa theo số lượng bề nổi.'
      },
      {
        id: 'q4',
        level: 'thong-hieu',
        levelName: 'Thông hiểu (Câu 4)',
        text: 'Anh/chị hiểu như thế nào về hình ảnh: "Đọc sách có phương pháp chính là chiếc chìa khóa vàng mở ra kho tàng tri thức bao la của cuộc đời"?',
        guide: '- Hình ảnh so sánh "chiếc chìa khóa vàng" khẳng định vai trò quyết định của phương pháp đọc đúng đắn. Phương pháp đọc sách khoa học giúp con người tiếp thu tri thức hiệu quả, biến tri thức thành năng lực và phát triển trí tuệ bản thân.'
      },
      {
        id: 'q5',
        level: 'van-dung',
        levelName: 'Vận dụng (Đoạn văn ~200 chữ)',
        text: 'Từ ý kiến của Chu Quang Tiềm, hãy viết một đoạn văn (khoảng 200 chữ) rút ra bài học về tầm quan trọng của việc phát triển văn hóa đọc cho giới trẻ trong thời đại số.',
        guide: '1. Hình thức: Đoạn văn chuẩn khoảng 200 chữ.\n2. Nội dung:\n- Khẳng định giá trị của văn hóa đọc giữa thời đại công nghệ số.\n- Phân tích: Đọc sách bồi đắp tư duy phản biện, làm sâu sắc cảm xúc và rèn luyện tính kiên nhẫn; giúp người trẻ không bị cuốn theo các trào lưu thông tin mì ăn liền hời hợt trên mạng xã hội.\n- Đề xuất giải pháp và liên hệ bản thân: Tạo thói quen đọc mỗi ngày 15-30 phút, chọn sách tinh hoa, ghi chép và áp dụng bài học vào thực tế.'
      }
    ]
  },
  {
    id: 'reading_preset_3',
    title: 'Nơi chốn bình yên trong ký ức của mẹ',
    work: 'Khói trời buông tỏa',
    category: 'Văn xuôi & Tản văn',
    genre: 'Tản văn',
    author: 'Nguyễn Ngọc Tư',
    source: '(Trích tập tản văn "Khói trời buông tỏa", NXB Trẻ)',
    passage: `Tôi nhớ hoài căn bếp của má ngày xưa. Căn bếp nhỏ mái lá đơn sơ, vách trát bằng đất bùn trộn rơm mà ấm sực mùi khói củi. Mỗi chiều mưa giông, má ngồi bên bếp lửa đỏ bập bùng, mái tóc lấm tấm sợi bạc khẽ rung theo từng nhịp thổi ống nứa cho ngọn lửa bùng lên.

Mùi cơm sôi thơm nức quyện với mùi cá kho tiêu sực nức cả chái nhà. Những ngày đó, dù bên ngoài gió lạnh hay cuộc sống còn bao nỗi chật vật thiếu thốn, chỉ cần bước chân vào bếp, ngồi sà xuống bên má, hơ đôi bàn tay ướt lạnh trên ánh lửa là mọi mỏi mệt của tôi dường như tan biến hết.

Bây giờ về phố, sống giữa những căn bếp hiện đại, sạch bóng mùi ga và lò vi sóng, đôi lúc tôi thèm đến cồn cào mùi khói cay nồng mắt ấy. Không phải vì ta hoài cổ, mà bởi nơi căn bếp khói lam chiều ấy có bóng hình người mẹ tần tảo sớm hôm dành trọn đời cho con cái.`,
    questions: [
      {
        id: 'q1',
        level: 'nhan-biet',
        levelName: 'Nhận biết (Câu 1)',
        text: 'Tìm những chi tiết, hình ảnh miêu tả căn bếp và hình bóng người mẹ trong đoạn văn.',
        guide: '- Căn bếp: Mái lá đơn sơ, vách đất bùn trộn rơm, ấm sực mùi khói củi, lửa đỏ bập bùng, mùi cơm sôi thơm nức, mùi cá kho tiêu.\n- Người mẹ: Mái tóc lấm tấm sợi bạc khẽ rung, ngồi bên bếp lửa thổi ống nứa, tần tảo sớm hôm.'
      },
      {
        id: 'q2',
        level: 'nhan-biet',
        levelName: 'Nhận biết (Câu 2)',
        text: 'Xác định phương thức biểu đạt chính và ngôi kể của đoạn trích trên.',
        guide: '- Phương thức biểu đạt chính: Biểu cảm kết hợp miêu tả và tự sự.\n- Ngôi kể: Ngôi thứ nhất (nhân vật xưng "tôi").'
      },
      {
        id: 'q3',
        level: 'thong-hieu',
        levelName: 'Thông hiểu (Câu 3)',
        text: 'Nêu cảm xúc và tâm trạng của nhân vật "tôi" khi nhớ về căn bếp xưa và bóng dáng mẹ hiền.',
        guide: '- Cảm giác ấm áp, bình yên và an lòng khi được sà vào lòng mẹ.\n- Nỗi nhớ thương da diết, lòng biết ơn sâu sắc đối với sự hy sinh thầm lặng, chịu thương chịu khó của người mẹ.'
      },
      {
        id: 'q4',
        level: 'thong-hieu',
        levelName: 'Thông hiểu (Câu 4)',
        text: 'Phân tích ý nghĩa biểu tượng của hình ảnh "mùi khói củi" trong đoạn trích.',
        guide: '- "Mùi khói củi" không chỉ là mùi vị giác quan chân thực của bếp quê mộc mạc, mà đã trở thành biểu tượng nghệ thuật thiêng liêng cho tình mẫu tử, cho ký ức tuổi thơ êm đềm và tổ ấm gia đình bình yên không gì thay thế được.'
      },
      {
        id: 'q5',
        level: 'van-dung',
        levelName: 'Vận dụng (Đoạn văn ~200 chữ)',
        text: 'Từ tình cảm của nhân vật "tôi" dành cho má, hãy viết một đoạn văn (khoảng 200 chữ) trình bày suy nghĩ về ý nghĩa của gia đình đối với mỗi con người giữa nhịp sống hiện đại hối hả.',
        guide: '1. Hình thức: Đoạn văn khoảng 200 chữ, diễn đạt cảm xúc chân thành.\n2. Nội dung:\n- Khẳng định: Gia đình là điểm tựa tinh thần vững chắc nhất của đời người.\n- Phân tích: Giữa áp lực xô bồ của cuộc sống hiện đại, gia đình là nơi chốn bình yên che chở ta khỏi bão giông, nơi có tình yêu thương vô điều kiện của cha mẹ.\n- Trách nhiệm: Biết trân trọng giây phút sum vầy, dành thời gian quan tâm, chăm sóc cha mẹ khi còn có thể.\n- Phê phán những ai mải mê chạy theo danh lợi mà thờ ơ, lạnh nhạt với mái ấm gia đình.'
      }
    ]
  }
];

// STATE VARIABLES
let readingSets = [];
let readingCategories = [];
let currentReadingCategory = 'all';
let readingSearchQuery = '';
let currentReadingSetId = null;
let showReadingAnswers = false;
let passageFontSize = 16;

// INITIALIZATION & PERSISTENCE
function initReadingModule() {
  loadReadingData();
  initReadingDialogDismissals();
}

function loadReadingData() {
  try {
    const savedCategories = localStorage.getItem('vq_reading_categories_v1');
    if (savedCategories) {
      try { readingCategories = JSON.parse(savedCategories); } catch (e) { readingCategories = []; }
    }
    if (!Array.isArray(readingCategories) || !readingCategories.length) {
      readingCategories = [...DEFAULT_READING_CATEGORIES];
    } else {
      DEFAULT_READING_CATEGORIES.forEach(cat => {
        if (!readingCategories.includes(cat)) readingCategories.push(cat);
      });
    }
    localStorage.setItem('vq_reading_categories_v1', JSON.stringify(readingCategories));

    const savedSets = localStorage.getItem('vq_reading_sets_v1');
    let loaded = [];
    if (savedSets) {
      try { loaded = JSON.parse(savedSets); } catch (e) { loaded = []; }
    }
    if (!Array.isArray(loaded)) loaded = [];

    if (loaded.length > 0) {
      // Đảm bảo tất cả câu hỏi trong các bộ đề đều có maxScore và status
      loaded.forEach(s => {
        if (!s.status) s.status = 'published';
        if (Array.isArray(s.questions)) {
          s.questions.forEach((q, idx) => {
            if (q.maxScore === undefined || q.maxScore === null || isNaN(q.maxScore)) {
              q.maxScore = idx === 4 ? 2.0 : 1.0;
            } else {
              q.maxScore = Number(q.maxScore);
            }
          });
        }
      });

      // Bổ sung các bộ đề mặc định nếu chưa có trong danh sách
      const existingIds = new Set(loaded.map(s => String(s.id)));
      DEFAULT_READING_SETS.forEach(def => {
        if (!existingIds.has(String(def.id))) {
          const cloneDef = JSON.parse(JSON.stringify(def));
          if (!cloneDef.status) cloneDef.status = 'published';
          loaded.push(cloneDef);
        }
      });
      readingSets = loaded;
    } else {
      readingSets = JSON.parse(JSON.stringify(DEFAULT_READING_SETS)).map(s => ({ ...s, status: s.status || 'published' }));
    }
    localStorage.setItem('vq_reading_sets_v1', JSON.stringify(readingSets));
  } catch (err) {
    console.error('Lỗi khi tải dữ liệu đọc hiểu:', err);
    readingCategories = [...DEFAULT_READING_CATEGORIES];
    readingSets = JSON.parse(JSON.stringify(DEFAULT_READING_SETS));
  }
}

function saveReadingData() {
  try {
    localStorage.setItem('vq_reading_categories_v1', JSON.stringify(readingCategories));
    localStorage.setItem('vq_reading_sets_v1', JSON.stringify(readingSets));
  } catch (err) {
    console.error('Lỗi khi lưu dữ liệu đọc hiểu:', err);
  }
}

function initReadingDialogDismissals() {
  ['reading-edit-modal', 'reading-result-modal'].forEach(modalId => {
    const dlg = document.getElementById(modalId);
    if (dlg && !dlg._hasBackdropDismiss) {
      dlg._hasBackdropDismiss = true;
      dlg.addEventListener('click', (e) => {
        const rect = dlg.getBoundingClientRect();
        const inDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height
          && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
        if (!inDialog) dlg.close();
      });
    }
  });
}

// ROUTING HOOK
const setReadingRoute = function(setId) {
  initReadingModule();
  if (setId) {
    openReadingSet(setId);
  } else {
    exitReadingWorkspace();
  }
};
if (typeof R !== 'undefined') R.reading = setReadingRoute;
if (typeof window !== 'undefined') {
  if (!window.R) window.R = typeof R !== 'undefined' ? R : {};
  window.R.reading = setReadingRoute;
}

// VIEW SWITCHING
function exitReadingWorkspace(force = false) {
  if (!force && typeof isExamInProgress === 'function' && isExamInProgress()) {
    toast('⚠️ Bạn đang làm bài đọc hiểu! Phải nộp bài xong mới được thoát.', 'bad');
    return false;
  }
  currentReadingSetId = null;
  if (typeof window !== 'undefined') window.currentReadingSetId = null;
  if (window.__SECURITY_SHIELD && typeof window.__SECURITY_SHIELD.endExam === 'function') {
    window.__SECURITY_SHIELD.endExam(Boolean(force));
  }
  const listView = document.getElementById('reading-list-view');
  const workView = document.getElementById('reading-workspace-view');
  if (listView) listView.style.display = 'block';
  if (workView) workView.style.display = 'none';
  renderReadingListView();
  return true;
}

function openReadingSet(id) {
  const set = readingSets.find(s => String(s.id) === String(id));
  if (!set) {
    toast('Không tìm thấy bộ đề đọc hiểu này!', 'bad');
    exitReadingWorkspace();
    return;
  }

  if (typeof isStudentEntryBlocked === 'function' && isStudentEntryBlocked(set, 'reading')) {
    const info = (typeof getStudentBlockInfo === 'function') ? getStudentBlockInfo(set, 'reading') : { hasSubmissions: false, message: 'Bộ đề đọc hiểu này đã bị khóa đối với bạn!' };
    toast(info.message, 'bad');
    if (info.hasSubmissions) {
      openHistoryForSet(set.id, set.title);
    }
    return;
  }

  currentReadingSetId = set.id;
  if (typeof window !== 'undefined') window.currentReadingSetId = set.id;
  showReadingAnswers = false;

  const listView = document.getElementById('reading-list-view');
  const workView = document.getElementById('reading-workspace-view');
  if (listView) listView.style.display = 'none';
  if (workView) workView.style.display = 'block';
  if (window.__SECURITY_SHIELD && typeof window.__SECURITY_SHIELD.startExam === 'function') {
    window.__SECURITY_SHIELD.startExam('reading');
  }

  renderReadingWorkspace(set);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// RENDER LIST VIEW
function renderReadingListView() {
  renderReadingCategoryChips();
  renderReadingSetsGrid();
}

function renderReadingCategoryChips() {
  const container = document.getElementById('reading-category-chips');
  if (!container) return;

  const allCount = readingSets.length;
  let html = `
    <button class="reading-chip ${currentReadingCategory === 'all' ? 'active' : ''}" type="button" onclick="setReadingCategoryFilter('all')">
      Tất cả <span class="reading-chip-count">(${allCount})</span>
    </button>
  `;

  readingCategories.forEach(cat => {
    const count = readingSets.filter(s => (s.category || '').trim() === cat).length;
    const isActive = currentReadingCategory === cat;
    html += `
      <button class="reading-chip ${isActive ? 'active' : ''}" type="button" onclick="setReadingCategoryFilter('${esc(cat)}')">
        ${esc(cat)} <span class="reading-chip-count">(${count})</span>
      </button>
    `;
  });

  container.innerHTML = html;
}

function setReadingCategoryFilter(category) {
  currentReadingCategory = category;
  renderReadingListView();
}

function onReadingSearchInput() {
  readingSearchQuery = (document.getElementById('reading-search-input')?.value || '').trim().toLowerCase();
  renderReadingSetsGrid();
}

const READING_PALETTES = [
  'linear-gradient(135deg, #1e293b 0%, #334155 100%)', // Slate Navy
  'linear-gradient(135deg, #312e81 0%, #4338ca 100%)', // Deep Indigo
  'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)', // Deep Teal
  'linear-gradient(135deg, #92400e 0%, #b45309 100%)'  // Warm Bronze
];

function renderReadingSetsGrid() {
  const container = document.getElementById('reading-sets-container');
  if (!container) return;

  // Filter sets
  const isStudent = Boolean(window.Auth && window.Auth.isStudent());
  const filteredSets = readingSets.filter(s => {
    // Học sinh chỉ xem bộ đề đã xuất bản (status !== 'draft') và không phải riêng tư
    if (isStudent) {
      if (s.status === 'draft') return false;
      if (typeof isSetPrivate === 'function' && isSetPrivate(s, 'reading')) return false;
    }
    if (currentReadingCategory !== 'all' && (s.category || '').trim() !== currentReadingCategory) {
      return false;
    }
    if (readingSearchQuery) {
      const hay = (String(s.title) + ' ' + String(s.author) + ' ' + String(s.category) + ' ' + String(s.genre)).toLowerCase();
      if (!hay.includes(readingSearchQuery)) return false;
    }
    return true;
  });

  if (!filteredSets.length) {
    container.innerHTML = `
      <div class="card reading-empty-state">
        <div style="font-size:46px; margin-bottom:12px;">📑</div>
        <h3 style="margin:0 0 8px;">Không tìm thấy đề đọc hiểu nào</h3>
        <p class="mut" style="margin:0 0 16px;">Hãy thử tìm kiếm từ khóa khác hoặc tạo bộ đề đọc hiểu mới.</p>
        <button class="btn au sm" onclick="openCreateReadingSetModal()">+ Tạo đề đọc hiểu mới</button>
      </div>
    `;
    return;
  }

  // Group by category if "all" is active, or display flat
  if (currentReadingCategory === 'all' && !readingSearchQuery) {
    const groups = new Map();
    filteredSets.forEach(s => {
      const cat = (s.category || 'Chưa phân loại').trim();
      if (!groups.has(cat)) groups.set(cat, []);
      groups.get(cat).push(s);
    });

    let groupsHtml = '';
    let globalIdx = 0;
    groups.forEach((items, cat) => {
      groupsHtml += `
        <div class="reading-category-group">
          <div class="reading-group-title">
            <span><ion-icon name="pricetag-outline"></ion-icon> ${esc(cat)}</span>
            <span class="reading-group-count">${items.length} đề</span>
          </div>
          <div class="reading-horizontal-list">
            ${items.map(s => renderSingleReadingCard(s, globalIdx++)).join('')}
          </div>
        </div>
      `;
    });
    container.innerHTML = groupsHtml;
  } else {
    container.innerHTML = `
      <div class="reading-horizontal-list">
        ${filteredSets.map((s, idx) => renderSingleReadingCard(s, idx)).join('')}
      </div>
    `;
  }
}

function renderSingleReadingCard(s, idx = 0) {
  const bg = READING_PALETTES[idx % READING_PALETTES.length];
  const qList = Array.isArray(s.questions) ? s.questions : [];
  const qCount = qList.length;
  const topic = s.genre || s.category || 'Đọc hiểu';
  const author = (s.author || '').trim();
  const work = (s.work || '').trim();
  const watermark = '<ion-icon name="document-text-outline"></ion-icon>';

  const nbCount = qList.filter(q => q.level === 'nhan-biet' || (q.levelName && q.levelName.includes('Nhận biết'))).length;
  const thCount = qList.filter(q => q.level === 'thong-hieu' || (q.levelName && q.levelName.includes('Thông hiểu'))).length;
  const vdCount = qList.filter(q => q.level === 'van-dung' || (q.levelName && q.levelName.includes('Vận dụng'))).length;

  const isUserCreated = String(s.id).startsWith('reading_user_');

  // Snippet
  const snippet = (s.passage || '').trim().replace(/\r?\n+/g, ' ');
  const cleanSnippet = snippet.length > 170 ? snippet.slice(0, 170) + '…' : snippet;

  const blockInfo = (typeof getStudentBlockInfo === 'function') ? getStudentBlockInfo(s, 'reading') : { blocked: false, isDeadlineExpired: false, hasSubmissions: false, message: '' };
  const isBlocked = blockInfo.blocked;
  const attemptBadge = (typeof getSetAttemptBadgeHtml === 'function') ? getSetAttemptBadgeHtml(s, 'reading') : '';
  const deadlineBadge = (typeof getSetDeadlineBadgeHtml === 'function') ? getSetDeadlineBadgeHtml(s, 'reading') : '';
  const privacyBadge = (typeof getSetPrivacyBadgeHtml === 'function') ? getSetPrivacyBadgeHtml(s, 'reading') : '';
  const openAtBadge = (typeof getSetOpenAtBadgeHtml === 'function') ? getSetOpenAtBadgeHtml(s, 'reading') : '';
  const isTeacherOrAdmin = window.Auth && (window.Auth.isTeacher() || window.Auth.isAdmin());
  const cardOnClick = isBlocked 
    ? (blockInfo.hasSubmissions ? `openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')` : `toast('${esc(blockInfo.message)}', 'bad')`) 
    : `openReadingSet('${esc(s.id)}')`;

  return `
    <div class="reading-h-card" onclick="${cardOnClick}">
      <!-- Cột trái: Card Banner nổi bật dạng bìa sách/thẻ -->
      <div class="reading-h-banner" style="background: ${bg};">
        <div class="reading-h-banner-watermark">${watermark}</div>
        <span class="reading-h-count-pill">${qCount} câu hỏi</span>
        ${s.status === 'draft' ? '<span class="reading-h-status-pill status-draft"><ion-icon name="document-text-outline"></ion-icon> Bản nháp</span>' : ''}
        <span class="reading-h-topic-pill" title="${esc(topic)}">${esc(topic)}</span>
      </div>

      <!-- Cột giữa: Toàn bộ thông tin chính của đề -->
      <div class="reading-h-body">
        <div class="reading-h-title-row">
          <h3 class="reading-h-title">${esc(s.title)}</h3>
        </div>

        ${(author || work) ? `
          <div class="reading-h-meta-tags">
            ${author ? `<span class="reading-h-meta-item"><ion-icon name="person-outline"></ion-icon> <b>${esc(author)}</b></span>` : ''}
            ${work ? `<span class="reading-h-meta-item"><ion-icon name="book-outline"></ion-icon> <i>${esc(work)}</i></span>` : ''}
          </div>
        ` : ''}

        <!-- Ma trận cấp độ chuẩn 5 câu & Badges -->
        <div class="reading-h-breakdown">
          ${(privacyBadge || openAtBadge || attemptBadge || deadlineBadge) ? `<div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:6px; width:100%;">${privacyBadge}${openAtBadge}${attemptBadge}${deadlineBadge}</div>` : ''}
          ${nbCount ? `<span class="lib-pill pill-nb" title="${nbCount} câu Nhận biết">🟢 ${nbCount} Nhận biết</span>` : ''}
          ${thCount ? `<span class="lib-pill pill-th" title="${thCount} câu Thông hiểu">🟡 ${thCount} Thông hiểu</span>` : ''}
          ${vdCount ? `<span class="lib-pill pill-vd" title="${vdCount} câu Vận dụng (Đoạn văn ~200 chữ)">🟣 ${vdCount} Vận dụng</span>` : ''}
        </div>

        ${cleanSnippet ? `
          <div class="reading-h-snippet" title="${esc(snippet)}">
            <span class="reading-h-snippet-quote">“</span>${esc(cleanSnippet)}
          </div>
        ` : ''}
      </div>

      <!-- Cột phải: Khối nút thao tác thẻ -->
      <div class="reading-h-actions" onclick="event.stopPropagation()">
        ${isBlocked ? (blockInfo.hasSubmissions ? `
          <button class="btn au reading-h-btn-enter lib-view-only-btn" type="button" onclick="openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')">
            <span><ion-icon name="eye-outline"></ion-icon> Xem lại bài làm</span>
          </button>
        ` : `
          <button class="btn au reading-h-btn-enter lib-locked-btn" type="button" onclick="toast('${esc(blockInfo.message)}', 'bad')" title="${esc(blockInfo.message)}">
            <span><ion-icon name="lock-closed-outline"></ion-icon> ${blockInfo.isDeadlineExpired ? 'Đã hết hạn' : 'Đã khóa'}</span>
          </button>
        `) : `
          <button class="btn au reading-h-btn-enter" type="button" onclick="openReadingSet('${esc(s.id)}')">
            <span><ion-icon name="play-outline"></ion-icon> Vào đọc hiểu</span>
          </button>
        `}
        <div class="reading-h-mini-row" style="margin-top:6px;">
          <button class="reading-h-mini-btn" type="button" title="Lịch sử làm bài" onclick="openHistoryForSet('${esc(s.id)}', '${esc(s.title)}')">
            <ion-icon name="time-outline"></ion-icon> Lịch sử
          </button>
          ${isTeacherOrAdmin ? `
            <button class="reading-h-mini-btn" type="button" title="Cài đặt giới hạn số lượt & hạn nộp bài cho học sinh" onclick="openSetAttemptLimitModal('reading', '${esc(s.id)}')">
              <ion-icon name="timer-outline"></ion-icon> Lượt &amp; Hạn
            </button>
          ` : ''}
          ${(isUserCreated && (!window.Auth || window.Auth.canEditContent())) ? `
            <button class="reading-h-mini-btn reading-h-btn-del" type="button" title="Xóa đề này" onclick="deleteReadingSet('${esc(s.id)}')">
              <ion-icon name="trash-outline"></ion-icon> Xóa đề
            </button>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

// WORKSPACE RENDERING
function renderReadingWorkspace(set) {
  // Hide workspace delete button if student
  const deleteWsBtn = document.querySelector('#reading-workspace-view button[onclick*="deleteCurrentOpenedReadingSet"]');
  if (deleteWsBtn) {
    deleteWsBtn.style.display = (!window.Auth || window.Auth.canEditContent()) ? '' : 'none';
  }

  // Title & Badges
  const titleEl = document.getElementById('reading-workspace-set-title');
  const badgeEl = document.getElementById('reading-workspace-set-badge');
  if (titleEl) titleEl.textContent = set.title;
  if (badgeEl) badgeEl.textContent = set.genre || set.category || 'Đọc hiểu';

  // Left Panel: Passage
  const genreEl = document.getElementById('reading-passage-genre');
  const authorEl = document.getElementById('reading-passage-author');
  const workEl = document.getElementById('reading-passage-work');
  const textEl = document.getElementById('reading-passage-text');
  const sourceEl = document.getElementById('reading-passage-source');

  if (genreEl) genreEl.textContent = set.genre || set.category || 'Đọc hiểu';
  if (authorEl) authorEl.textContent = set.author ? `Tác giả: ${set.author}` : '';
  if (workEl) {
    if (set.work) {
      workEl.textContent = `Tác phẩm: ${set.work}`;
      workEl.style.display = 'inline-block';
    } else {
      workEl.style.display = 'none';
    }
  }
  if (textEl) {
    textEl.textContent = set.passage || '';
    textEl.style.fontSize = passageFontSize + 'px';
  }
  if (sourceEl) sourceEl.textContent = set.source || '';

  // Right Panel: Questions
  const qCountEl = document.getElementById('reading-q-count');
  const qListEl = document.getElementById('reading-questions-list');
  const questions = Array.isArray(set.questions) ? set.questions : [];
  if (qCountEl) qCountEl.textContent = questions.length;

  // Cập nhật tiêu đề điểm tổng của phần đọc hiểu ở cột trái
  const totalScore = questions.reduce((sum, q) => sum + (Number(q.maxScore) || 1.0), 0);
  const passageTitleH4 = document.querySelector('.reading-passage-panel .reading-panel-title h4');
  if (passageTitleH4) {
    passageTitleH4.textContent = `I. PHẦN ĐỌC HIỂU (${totalScore.toFixed(1).replace('.', ',')} điểm)`;
  }

  // Retrieve saved answers
  const savedAnswers = getSavedReadingDraft(set.id);

  if (qListEl) {
    qListEl.innerHTML = questions.map((q, idx) => {
      const levelClass = getLevelClass(q.level);
      const levelTitle = q.levelName || getLevelTitle(q.level);
      const maxPts = (q.maxScore !== undefined && q.maxScore !== null) ? Number(q.maxScore) : (idx === 4 ? 2.0 : 1.0);
      const answerVal = savedAnswers[q.id || idx] || '';
      const lvlStr = String(q.level || '').toLowerCase();
      const isNonEssayLevel = lvlStr === 'nhan-biet' || lvlStr === 'thong-hieu';
      const isParagraphQuestion = !isNonEssayLevel && (
        Boolean(q.isParagraph) ||
        /viết\s*(một\s*)?đoạn\s*văn|viết\s*đoạn|khoảng\s*\d+\s*chữ|\b\d+\s*chữ\b/i.test(q.text || '') ||
        (lvlStr === 'van-dung' && /đoạn\s*văn/i.test(q.levelName || '') && /viết/i.test(q.text || ''))
      );
      const words = (answerVal.trim().match(/\S+/g) || []).length;
      let wcClass = 'wc-low';
      let wcNote = '(Đoạn văn tiêu chuẩn khoảng 200 chữ)';
      if (words >= 180 && words <= 230) {
        wcClass = 'wc-ideal';
        wcNote = '✓ Đạt chuẩn dung lượng (~200 chữ)';
      } else if (words > 230) {
        wcClass = 'wc-high';
        wcNote = '⚠️ Đoạn văn hơi dài (>230 chữ)';
      }

      return `
        <div class="reading-question-card ${isParagraphQuestion ? 'reading-q-essay-card' : ''}" id="card-q-${idx}">
          <div class="reading-q-header" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <span class="reading-q-number">Câu ${idx + 1}</span>
              <span class="reading-q-level ${levelClass}">${esc(levelTitle)}</span>
            </div>
            <div style="display:flex; align-items:center; gap:6px;">
              <button type="button" class="btn cy sm scaffold-trigger-btn" onclick="toggleReadingQuestionScaffolding(${idx}, ${isParagraphQuestion ? 'true' : 'false'})" title="Mở Gợi ý tư duy (Giàn giáo nhận thức): Từ khóa, Công thức &amp; Sơ đồ dàn ý trống">
                💡 Gợi ý tư duy
              </button>
              <span class="tag cy" style="font-weight:800; font-size:12px; padding:2px 8px;"><ion-icon name="trophy-outline"></ion-icon> ${maxPts} điểm</span>
            </div>
          </div>
          <div class="reading-q-text">${esc(q.text)}</div>
          <div class="scaffold-box reading-q-scaffold-box" id="reading-scaffold-box-${idx}" style="display:none;"></div>
          <div class="reading-answer-box">
            <textarea
              id="reading-q-textarea-${idx}"
              class="reading-answer-textarea ${isParagraphQuestion ? 'reading-essay-textarea' : ''}"
              rows="${isParagraphQuestion ? 7 : 3}"
              placeholder="${isParagraphQuestion ? 'Viết đoạn văn khoảng 200 chữ tại đây (rút ra thông điệp hoặc liên hệ bài học cuộc sống)...' : 'Nhập câu trả lời của bạn...'}"
              oninput="handleReadingAnswerInput('${esc(set.id)}', '${esc(q.id || idx)}', this.value, ${idx}, ${isParagraphQuestion ? 'true' : 'false'})"
              onpaste="preventPasteCopy(event, 'paste')"
              oncopy="preventPasteCopy(event, 'copy')"
              oncut="preventPasteCopy(event, 'cut')"
              oncontextmenu="return false;"
              spellcheck="false"
              data-ms-editor="false"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
            >${esc(answerVal)}</textarea>
            ${isParagraphQuestion ? `
              <div class="reading-word-counter ${wcClass}" id="reading-wc-${idx}">
                <span><ion-icon name="create-outline"></ion-icon> Đếm từ:</span>
                <span class="wc-num">${words}</span> từ
                <span class="wc-note">${wcNote}</span>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  if (typeof initReadingPressureTimer === 'function') {
    initReadingPressureTimer();
  }
  updateAnswersToggleButtonState();
}

function getLevelClass(lvl) {
  switch (String(lvl).toLowerCase()) {
    case 'nhan-biet': return 'level-nhan-biet';
    case 'thong-hieu': return 'level-thong-hieu';
    case 'van-dung': return 'level-van-dung';
    case 'van-dung-cao': return 'level-van-dung-cao';
    default: return 'level-nhan-biet';
  }
}

function getLevelTitle(lvl) {
  switch (String(lvl).toLowerCase()) {
    case 'nhan-biet': return 'Nhận biết';
    case 'thong-hieu': return 'Thông hiểu';
    case 'van-dung': return 'Vận dụng (Đoạn văn)';
    case 'van-dung-cao': return 'Vận dụng cao';
    default: return 'Nhận biết';
  }
}

// FONT SIZE ADJUSTMENT
function changePassageFontSize(delta) {
  passageFontSize = Math.max(13, Math.min(26, passageFontSize + delta * 2));
  const textEl = document.getElementById('reading-passage-text');
  if (textEl) {
    textEl.style.fontSize = passageFontSize + 'px';
  }
}

// ANSWERS GUIDE (REMOVED DURING EXAM)
function toggleReadingAnswersGuide() {}

function updateAnswersToggleButtonState() {
  const btn = document.getElementById('btn-toggle-reading-answers');
  if (btn) btn.remove();
}

// DRAFT SAVING
function getSavedReadingDraft(setId) {
  try {
    const raw = localStorage.getItem('vq_reading_draft_' + setId);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

let autoSaveTimer = null;
function handleReadingAnswerInput(setId, qId, val, idx, isParagraph) {
  if (isParagraph && typeof idx === 'number') {
    const wcEl = document.getElementById(`reading-wc-${idx}`);
    if (wcEl) {
      const words = (val.trim().match(/\S+/g) || []).length;
      const numEl = wcEl.querySelector('.wc-num');
      const noteEl = wcEl.querySelector('.wc-note');
      if (numEl) numEl.textContent = words;
      wcEl.classList.remove('wc-low', 'wc-ideal', 'wc-high');
      if (words >= 180 && words <= 230) {
        wcEl.classList.add('wc-ideal');
        if (noteEl) noteEl.textContent = '✓ Đạt chuẩn dung lượng (~200 chữ)';
      } else if (words > 230) {
        wcEl.classList.add('wc-high');
        if (noteEl) noteEl.textContent = 'Đoạn văn hơi dài (>230 chữ)';
      } else {
        wcEl.classList.add('wc-low');
        if (noteEl) noteEl.textContent = '(Đoạn văn tiêu chuẩn khoảng 200 chữ)';
      }
    }
  }

  const statusEl = document.getElementById('reading-save-status');
  if (statusEl) statusEl.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon> Đang lưu...';

  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(() => {
    try {
      const draft = getSavedReadingDraft(setId);
      draft[qId] = val;
      localStorage.setItem('vq_reading_draft_' + setId, JSON.stringify(draft));
      if (statusEl) statusEl.innerHTML = '<ion-icon name="cloud-done-outline"></ion-icon> Đã lưu tự động';
    } catch (e) {
      if (statusEl) statusEl.innerHTML = '<ion-icon name="alert-circle-outline"></ion-icon> Lỗi lưu trữ';
    }
  }, 400);
}

function resetCurrentReadingDraft() {
  if (!currentReadingSetId) return;
  if (!confirm('Bạn có chắc muốn xóa tất cả câu trả lời của đề này để làm lại từ đầu không?')) return;

  try {
    localStorage.removeItem('vq_reading_draft_' + currentReadingSetId);
  } catch (e) {}

  document.querySelectorAll('.reading-answer-textarea').forEach(tx => {
    tx.value = '';
  });
  toast('Đã làm mới lại bài đọc hiểu!', 'ok');
}

// SUBMIT & REVIEW
function submitReadingAnswers() {
  const set = readingSets.find(s => String(s.id) === String(currentReadingSetId));
  if (!set) return;

  if (typeof isStudentEntryBlocked === 'function' && isStudentEntryBlocked(set, 'reading')) {
    const info = (typeof getStudentBlockInfo === 'function') ? getStudentBlockInfo(set, 'reading') : { message: 'Đề đọc hiểu này đã kết thúc!' };
    toast(`⚠️ ${info.message}`, 'bad');
    return;
  }

  const draft = getSavedReadingDraft(set.id);
  const questions = Array.isArray(set.questions) ? set.questions : [];

  let answeredCount = 0;
  questions.forEach((q, idx) => {
    const a = (draft[q.id || idx] || '').trim();
    if (a) answeredCount++;
  });

  const listContainer = document.getElementById('reading-result-comparison-list');
  if (listContainer) {
    listContainer.innerHTML = questions.map((q, idx) => {
      const userAns = (draft[q.id || idx] || '').trim();
      return `
        <div class="reading-result-item">
          <div class="reading-result-q-title">
            Câu ${idx + 1}: ${esc(q.text)}
          </div>
          <div class="reading-result-user-ans">
            <b>Bài làm của bạn:</b><br>
            ${userAns ? esc(userAns).replace(/\n/g, '<br>') : '<i style="color:var(--mut);">Chưa trả lời câu này</i>'}
          </div>
          <div class="reading-result-guide-ans">
            <b>Đáp án chuẩn:</b><br>
            ${esc(q.guide || 'Chưa có đáp án.').replace(/\n/g, '<br>')}
          </div>
        </div>
      `;
    }).join('');
  }

  const modal = document.getElementById('reading-result-modal');
  if (modal) modal.showModal();

  // Lưu vào lịch sử bài làm
  try {
    if (typeof saveQuizAttemptToHistory === 'function') {
      const u = window.Auth ? window.Auth.getCurrentUser() : null;
      const pName = (u && u.full_name) ? u.full_name : ((localStorage.getItem('vq_player_nick') || '').trim() || 'Học sinh');
      const cName = (u && u.class_name) ? u.class_name : (localStorage.getItem('vq_player_class') || '').trim();
      saveQuizAttemptToHistory({
        id: 'hist_' + uid(),
        timestamp: Date.now(),
        dateStr: new Date().toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }),
        type: 'reading',
        playerName: pName,
        className: cName,
        userId: u ? u.id : '',
        setId: String(set.id),
        setTitle: set.title,
        setTopic: set.genre || set.category || 'Đọc hiểu',
        setEmo: set.emo || '📑',
        score: 0,
        answeredCount,
        totalQuestions: questions.length,
        elapsedSeconds: 0,
        details: questions.map((q, idx) => ({
          questionText: q.text,
          questionType: 'reading',
          maxScore: Number(q.maxScore || (idx === 4 ? 2.0 : 1.0)),
          userAnswer: (draft[q.id || idx] || '').trim(),
          correctAnswer: q.guide || 'Chưa có đáp án chuẩn',
          status: 'saved',
          points: 0,
          explanation: ''
        }))
      });
      if (window.__SECURITY_SHIELD && typeof window.__SECURITY_SHIELD.endExam === 'function') {
        window.__SECURITY_SHIELD.endExam(true);
      }
      toast('🎉 Nộp bài thành công! Bài làm đọc hiểu đã được lưu vào Lịch sử.', 'ok');
    }
  } catch (e) {
    console.error('Save reading history error:', e);
  }
}

function closeReadingResultModal() {
  const modal = document.getElementById('reading-result-modal');
  if (modal && modal.open) modal.close();
  exitReadingWorkspace(true);
  if (typeof go === 'function') go('home');
}

function copyReadingStudentAnswers() {
  const set = readingSets.find(s => String(s.id) === String(currentReadingSetId));
  if (!set) return;

  const draft = getSavedReadingDraft(set.id);
  const questions = Array.isArray(set.questions) ? set.questions : [];

  let text = `BÀI LÀM ĐỌC HIỂU: ${set.title}\n`;
  text += `Tác giả: ${set.author || 'Khuyết danh'} - Thể loại: ${set.genre || set.category}\n\n`;

  questions.forEach((q, idx) => {
    const userAns = (draft[q.id || idx] || '').trim();
    text += `Câu ${idx + 1}: ${q.text}\n`;
    text += `Trả lời: ${userAns || '(Chưa làm)'}\n\n`;
  });

  navigator.clipboard.writeText(text).then(() => {
    toast('Đã sao chép toàn bộ bài làm vào bộ nhớ tạm!', 'ok');
  }).catch(() => {
    toast('Không thể sao chép tự động', 'bad');
  });
}

// CREATE & EDIT MODAL
function populateCategorySelect(selectEl, selectedVal) {
  if (!selectEl) return;
  selectEl.innerHTML = readingCategories.map(cat => `
    <option value="${esc(cat)}" ${cat === selectedVal ? 'selected' : ''}>${esc(cat)}</option>
  `).join('');
}

function openCreateReadingSetModal() {
  if (window.Auth && !window.Auth.canEditContent()) {
    return toast('Học sinh không có quyền tạo đề đọc hiểu! Vui lòng đăng nhập tài khoản Giáo viên.', 'bad');
  }
  const modal = document.getElementById('reading-edit-modal');
  if (!modal) return;

  document.getElementById('reading-modal-title').textContent = 'Thêm bộ đề đọc hiểu mới';
  document.getElementById('reading-form-id').value = '';
  document.getElementById('reading-form-title').value = '';
  const workEl = document.getElementById('reading-form-work');
  if (workEl) workEl.value = '';
  document.getElementById('reading-form-author').value = '';
  document.getElementById('reading-form-genre').value = '';
  document.getElementById('reading-form-passage').value = '';
  document.getElementById('reading-form-source').value = '';

  const catSelect = document.getElementById('reading-form-category');
  populateCategorySelect(catSelect, currentReadingCategory !== 'all' ? currentReadingCategory : readingCategories[0]);

  const statusEl = document.getElementById('reading-form-status');
  if (statusEl) statusEl.value = 'published';

  const maxAttemptsEl = document.getElementById('reading-form-max-attempts');
  if (maxAttemptsEl) maxAttemptsEl.value = 0;

  const deadlineEl = document.getElementById('reading-form-deadline');
  if (deadlineEl) deadlineEl.value = '';

  const openAtEl = document.getElementById('reading-form-open-at');
  if (openAtEl) openAtEl.value = '';

  // Khởi tạo sẵn khung chuẩn 5 câu hỏi (2 Nhận biết • 2 Thông hiểu • 1 Vận dụng / Đoạn văn)
  applyStandard5QuestionTemplate(false);

  modal.showModal();
}

function openEditReadingSetModal(id) {
  if (window.Auth && !window.Auth.canEditContent()) {
    return toast('Học sinh không có quyền chỉnh sửa đề đọc hiểu! Vui lòng đăng nhập tài khoản Giáo viên.', 'bad');
  }
  const targetId = id || currentReadingSetId || (typeof window !== 'undefined' ? window.currentReadingSetId : null);
  const set = readingSets.find(s => String(s.id) === String(targetId));
  if (!set) {
    toast('Không tìm thấy bộ đề đọc hiểu để chỉnh sửa!', 'bad');
    return;
  }

  const modal = document.getElementById('reading-edit-modal');
  if (!modal) return;

  document.getElementById('reading-modal-title').textContent = 'Chỉnh sửa bộ đề đọc hiểu';
  document.getElementById('reading-form-id').value = set.id;
  document.getElementById('reading-form-title').value = set.title || '';
  const workEl = document.getElementById('reading-form-work');
  if (workEl) workEl.value = set.work || '';
  document.getElementById('reading-form-author').value = set.author || '';
  document.getElementById('reading-form-genre').value = set.genre || '';
  document.getElementById('reading-form-passage').value = set.passage || '';
  document.getElementById('reading-form-source').value = set.source || '';

  const editStatusEl = document.getElementById('reading-form-status');
  if (editStatusEl) editStatusEl.value = set.status || 'published';

  const editOpenAtEl = document.getElementById('reading-form-open-at');
  if (editOpenAtEl) {
    editOpenAtEl.value = (typeof getSetOpenAt === 'function' ? getSetOpenAt(set, 'reading') : (set.openAt || ''));
  }

  const maxAttemptsEl = document.getElementById('reading-form-max-attempts');
  if (maxAttemptsEl) {
    maxAttemptsEl.value = (typeof getSetMaxAttempts === 'function' ? getSetMaxAttempts(set, 'reading') : (set.maxAttempts || 0));
  }

  const editDeadlineEl = document.getElementById('reading-form-deadline');
  if (editDeadlineEl) {
    editDeadlineEl.value = (typeof getSetDeadline === 'function' ? getSetDeadline(set, 'reading') : (set.deadline || ''));
  }

  const catSelect = document.getElementById('reading-form-category');
  populateCategorySelect(catSelect, set.category || readingCategories[0]);

  const qList = document.getElementById('reading-form-questions-list');
  if (qList) {
    qList.innerHTML = '';
    const qs = Array.isArray(set.questions) && set.questions.length ? set.questions : [{ level: 'nhan-biet', text: '', guide: '', maxScore: 1.0 }];
    qs.forEach(q => addQuestionToReadingForm(q));
    renumberReadingFormQuestions();
    updateReadingModalTotalScore();
  }

  modal.showModal();
}

function closeReadingEditModal() {
  const modal = document.getElementById('reading-edit-modal');
  if (modal && modal.open) modal.close();
}

// KHUNG CHUẨN 5 CÂU HỎI THEO MA TRẬN ĐỀ THI (THANG ĐIỂM 10,0)
function applyStandard5QuestionTemplate(confirmBeforeReplace = true) {
  const qList = document.getElementById('reading-form-questions-list');
  if (!qList) return;

  if (confirmBeforeReplace && qList.children.length > 0) {
    if (!confirm('Bạn có muốn đặt lại danh sách câu hỏi theo Khung chuẩn 5 câu (Tổng 10,0 điểm: 2 Nhận biết • 2 Thông hiểu • 1 Vận dụng)?')) {
      return;
    }
  }

  qList.innerHTML = '';

  // Câu 1 & 2: Mức độ Nhận biết (1.5đ mỗi câu = 3.0đ)
  addQuestionToReadingForm({
    level: 'nhan-biet',
    maxScore: 1.5,
    text: 'Xác định phương thức biểu đạt chính / thể thơ được sử dụng trong đoạn trích.',
    guide: '- Phương thức biểu đạt chính: Nghị luận / Tự sự / Miêu tả / Biểu cảm...\n- Thể thơ: Tự do / Bảy chữ / Lục bát...'
  });
  addQuestionToReadingForm({
    level: 'nhan-biet',
    maxScore: 1.5,
    text: 'Theo đoạn trích, [chi tiết / hình ảnh / sự việc] sinh trưởng / diễn ra như thế nào?',
    guide: '- Căn cứ trực tiếp vào câu chữ trong văn bản để trả lời ngắn gọn, chính xác.'
  });

  // Câu 3 & 4: Mức độ Thông hiểu (2.0đ mỗi câu = 4.0đ)
  addQuestionToReadingForm({
    level: 'thong-hieu',
    maxScore: 2.0,
    text: 'Chỉ ra những điểm tương đồng / hiểu như thế nào về câu văn: "[trích dẫn cụm từ/câu văn]"?',
    guide: '- Ý nghĩa trực tiếp của câu nói / hình ảnh.\n- Ý nghĩa biểu tượng và thông điệp mà tác giả muốn gửi gắm.'
  });
  addQuestionToReadingForm({
    level: 'thong-hieu',
    maxScore: 2.0,
    text: 'Anh/chị có đồng tình với nhận định của tác giả: "[trích nhận định]"? Vì sao?',
    guide: '- Bày tỏ rõ quan điểm: Đồng tình / Không đồng tình.\n- Đưa ra 2-3 lý lẽ thuyết phục để lý giải vì sao.'
  });

  // Câu 5: Mức độ Vận dụng (Rút ra thông điệp hoặc liên hệ bài học cuộc sống)(Đoạn văn - 3.0đ)
  addQuestionToReadingForm({
    level: 'van-dung',
    maxScore: 3.0,
    text: 'Từ nội dung đoạn trích ở phần đọc hiểu, anh/chị hãy viết một đoạn văn (khoảng 200 chữ) trình bày suy nghĩ của bản thân về sự cần thiết phải [rút ra thông điệp / liên hệ bài học cuộc sống].',
    guide: '1. Yêu cầu hình thức: Đoạn văn khoảng 200 chữ, diễn đạt mạch lạc, không xuống dòng.\n2. Yêu cầu nội dung:\n- Mở đoạn: Dẫn dắt vấn đề nghị luận từ ngữ liệu.\n- Thân đoạn: Giải thích ngắn gọn; phân tích vì sao; dẫn chứng thực tế; phản đề phê phán.\n- Kết đoạn: Bài học nhận thức và hành động của bản thân.'
  });

  renumberReadingFormQuestions();
  updateReadingModalTotalScore();
  if (confirmBeforeReplace) {
    toast('Đã nạp khung chuẩn 5 câu hỏi (Tổng 10,0 điểm) thành công!', 'ok');
  }
}

// DÁN NHANH TOÀN BỘ ĐỀ THI (QUICK IMPORT)
function openQuickImportModal() {
  const modal = document.getElementById('reading-quick-import-modal');
  if (modal) {
    const txtArea = document.getElementById('reading-quick-import-text');
    if (txtArea) txtArea.value = '';
    modal.showModal();
  }
}

function closeQuickImportModal() {
  const modal = document.getElementById('reading-quick-import-modal');
  if (modal && modal.open) modal.close();
}

function handleQuickImportSubmit() {
  const raw = (document.getElementById('reading-quick-import-text')?.value || '').trim();
  if (!raw) {
    return toast('Vui lòng dán nội dung đề thi vào ô văn bản!', 'bad');
  }

  // Bóc tách nguồn trích dẫn
  let source = '';
  const sourceMatch = raw.match(/\(Trích[^\)]+\)/i) || raw.match(/\([^\)]*(?:NXB|trang|tr\.)[^\)]*\)/i);
  if (sourceMatch) {
    source = sourceMatch[0].trim();
  }

  // Tác giả và tác phẩm từ nguồn trích dẫn nếu có
  let author = '';
  let work = '';
  if (source) {
    const afterTrich = source.replace(/^\(Trích\s*/i, '').replace(/\)$/, '');
    const parts = afterTrich.split(/,|–|-/).map(p => p.trim());
    if (parts.length >= 1) work = parts[0].replace(/["“”'']/g, '');
    if (parts.length >= 2) author = parts[1];
  }

  // Tách câu hỏi
  // Tìm các vị trí: Câu 1, Câu 2, Câu 3, Câu 4, Câu 5 hoặc II. Làm văn
  const questionRegex = /(?:Câu\s*([1-5])\s*[:\.]|(?:II|2)\s*[\.\:]\s*LÀM\s*VĂN[^\n]*\n*Câu\s*1\s*(?:\([^\)]*\))?[:\.])/gi;
  let firstQIndex = raw.search(/(?:Câu\s*1\s*[:\.]|Thực hiện các yêu cầu)/i);
  if (firstQIndex === -1) firstQIndex = raw.search(/Câu\s*1/i);

  let passage = '';
  if (firstQIndex !== -1) {
    passage = raw.slice(0, firstQIndex).trim();
  } else {
    passage = raw;
  }

  // Làm sạch phần mở đầu của đoạn trích (bỏ "I. PHẦN ĐỌC HIỂU", "Đọc đoạn trích:")
  passage = passage.replace(/^[^\n]*PHẦN\s*ĐỌC\s*HIỂU[^\n]*\n+/i, '');
  passage = passage.replace(/^[^\n]*Đọc\s*đoạn\s*trích[^\n]*\n+/i, '');
  if (source && passage.includes(source)) {
    passage = passage.replace(source, '').trim();
  }

  // Bóc tách danh sách câu hỏi
  const questions = [];
  const qBlocks = [];
  const lines = raw.split('\n');
  let currentQNum = null;
  let currentQText = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/^\s*Câu\s*([1-5])\s*[:\.]\s*(.*)$/i) || line.match(/LÀM\s*VĂN[^\n]*\n*Câu\s*1\s*(?:\([^\)]*\))?[:\.]\s*(.*)$/i);
    const essayMatch = line.match(/^\s*(?:II|2)\s*[\.\:]\s*LÀM\s*VĂN/i);

    if (match) {
      if (currentQNum !== null && currentQText.length) {
        qBlocks.push({ num: currentQNum, text: currentQText.join('\n').trim() });
      }
      currentQNum = match[1] ? parseInt(match[1]) : 5;
      currentQText = [match[2] || ''];
    } else if (essayMatch) {
      // Chuyển sang câu làm văn (thường là câu 5 hoặc câu đoạn văn)
      if (currentQNum !== null && currentQText.length) {
        qBlocks.push({ num: currentQNum, text: currentQText.join('\n').trim() });
      }
      currentQNum = 5;
      currentQText = [];
    } else if (currentQNum !== null) {
      currentQText.push(line);
    }
  }
  if (currentQNum !== null && currentQText.length) {
    qBlocks.push({ num: currentQNum, text: currentQText.join('\n').trim() });
  }

  // Điền vào form
  const titleInput = document.getElementById('reading-form-title');
  if (titleInput && !titleInput.value) {
    titleInput.value = work ? `Đọc hiểu: ${work}` : 'Bài đọc hiểu mới';
  }
  const workInput = document.getElementById('reading-form-work');
  if (workInput && work) workInput.value = work;
  const authorInput = document.getElementById('reading-form-author');
  if (authorInput && author) authorInput.value = author;
  const passageInput = document.getElementById('reading-form-passage');
  if (passageInput && passage) passageInput.value = passage;
  const sourceInput = document.getElementById('reading-form-source');
  if (sourceInput && source) sourceInput.value = source;

  // Render câu hỏi bóc tách được
  const qList = document.getElementById('reading-form-questions-list');
  if (qList && qBlocks.length) {
    qList.innerHTML = '';
    qBlocks.forEach((qb, idx) => {
      let level = 'nhan-biet';
      if (idx === 0 || idx === 1) level = 'nhan-biet';
      else if (idx === 2 || idx === 3) level = 'thong-hieu';
      else level = 'van-dung';

      addQuestionToReadingForm({
        level,
        text: qb.text,
        guide: ''
      });
    });
    renumberReadingFormQuestions();
  }

  closeQuickImportModal();
  toast('Đã tự động bóc tách đề thi thành công!', 'ok');
}

function updateReadingModalTotalScore() {
  const inputs = document.querySelectorAll('#reading-form-questions-list .q-score-input');
  let total = 0;
  inputs.forEach(inp => {
    const val = parseFloat(inp.value) || 0;
    total += val;
  });
  const totalEl = document.getElementById('reading-modal-total-score');
  if (totalEl) {
    totalEl.textContent = (Math.round(total * 100) / 100).toFixed(2).replace(/\.?0+$/, '') + 'đ';
  }
}

function addQuestionToReadingForm(data = { level: 'nhan-biet', text: '', guide: '', maxScore: 1.0 }) {
  const qList = document.getElementById('reading-form-questions-list');
  if (!qList) return;

  const count = qList.querySelectorAll('.reading-modal-question-item').length;
  const item = document.createElement('div');
  item.className = 'reading-modal-question-item';

  const defaultScore = (data.maxScore !== undefined && data.maxScore !== null && !isNaN(data.maxScore))
    ? Number(data.maxScore)
    : (count === 4 ? 2.0 : 1.0);

  item.innerHTML = `
    <div class="reading-modal-question-header" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
      <span style="font-weight:800; font-size:14.5px;">Câu hỏi ${count + 1}</span>
      <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
        <label style="margin:0; font-size:13px; font-weight:700; display:flex; align-items:center; gap:5px;">
          <span><ion-icon name="trophy-outline"></ion-icon> Điểm tối đa:</span>
          <input type="number" class="q-score-input" step="0.25" min="0.25" max="10" value="${defaultScore}" oninput="updateReadingModalTotalScore()" style="width:68px; text-align:center; font-weight:800; font-size:13.5px; border-radius:8px; padding:3px 6px;">
          <span style="font-size:12px; font-weight:600; color:var(--mut);">đ</span>
        </label>
        <select class="q-level-input" style="font-size:13px; padding:4px 8px; border-radius:8px;">
          <option value="nhan-biet" ${data.level === 'nhan-biet' ? 'selected' : ''}>🟢 Nhận biết (Câu 1, 2)</option>
          <option value="thong-hieu" ${data.level === 'thong-hieu' ? 'selected' : ''}>🟡 Thông hiểu (Câu 3, 4)</option>
          <option value="van-dung" ${data.level === 'van-dung' ? 'selected' : ''}>🟣 Vận dụng - Đoạn văn (Câu 5)</option>
          <option value="van-dung-cao" ${data.level === 'van-dung-cao' ? 'selected' : ''}>🔴 Vận dụng cao (Mở rộng)</option>
        </select>
        <button type="button" class="btn no sm btn-icon-only" onclick="this.closest('.reading-modal-question-item').remove(); renumberReadingFormQuestions(); updateReadingModalTotalScore();" title="Xóa câu hỏi này"><ion-icon name="close-outline"></ion-icon></button>
      </div>
    </div>
    <div style="margin-bottom:8px;">
      <textarea class="q-text-input" rows="2" placeholder="Nội dung câu hỏi..." style="width:100%; font-family:inherit;" required>${esc(data.text || '')}</textarea>
    </div>
    <div>
      <textarea class="q-guide-input" rows="2" placeholder="Đáp án chuẩn / Thang điểm / Hướng dẫn chấm..." style="width:100%; font-size:13.5px; font-family:inherit;">${esc(data.guide || '')}</textarea>
    </div>
  `;

  qList.appendChild(item);
  updateReadingModalTotalScore();
}

function renumberReadingFormQuestions() {
  const items = document.querySelectorAll('#reading-form-questions-list .reading-modal-question-item');
  items.forEach((item, idx) => {
    const numEl = item.querySelector('.reading-modal-question-header span');
    let label = `Câu ${idx + 1}`;
    if (idx === 0 || idx === 1) label += ' [Nhận biết]';
    else if (idx === 2 || idx === 3) label += ' [Thông hiểu]';
    else if (idx === 4) label += ' [Vận dụng - Đoạn văn]';
    if (numEl) numEl.textContent = label;
  });
}

function handleReadingFormSubmit(e) {
  if (e) e.preventDefault();

  const id = document.getElementById('reading-form-id').value;
  const title = (document.getElementById('reading-form-title').value || '').trim();
  const work = (document.getElementById('reading-form-work')?.value || '').trim();
  const category = (document.getElementById('reading-form-category').value || '').trim();
  const author = (document.getElementById('reading-form-author').value || '').trim();
  const genre = (document.getElementById('reading-form-genre').value || '').trim();
  const passage = (document.getElementById('reading-form-passage').value || '').trim();
  const source = (document.getElementById('reading-form-source').value || '').trim();

  if (!title || !passage) {
    return toast('Vui lòng nhập tên đề bài và nội dung ngữ liệu!', 'bad');
  }

  // Parse questions
  const qElements = document.querySelectorAll('#reading-form-questions-list .reading-modal-question-item');
  const questions = [];
  qElements.forEach((el, idx) => {
    const lvl = el.querySelector('.q-level-input')?.value || 'nhan-biet';
    const txt = (el.querySelector('.q-text-input')?.value || '').trim();
    const gde = (el.querySelector('.q-guide-input')?.value || '').trim();
    const scoreVal = parseFloat(el.querySelector('.q-score-input')?.value);
    const maxScore = (!isNaN(scoreVal) && scoreVal > 0) ? scoreVal : (idx === 4 ? 2.0 : 1.0);
    if (txt) {
      questions.push({
        id: 'q_' + (idx + 1) + '_' + Date.now(),
        level: lvl,
        levelName: getLevelTitle(lvl),
        text: txt,
        guide: gde,
        maxScore
      });
    }
  });

  if (!questions.length) {
    return toast('Vui lòng thêm ít nhất 1 câu hỏi đọc hiểu!', 'bad');
  }

  if (category && !readingCategories.includes(category)) {
    readingCategories.push(category);
  }

  const status = document.getElementById('reading-form-status')?.value || 'published';
  const openAt = (document.getElementById('reading-form-open-at')?.value || '').trim();
  const privacy = status === 'draft' ? 'private' : 'public';
  const maxAttempts = Math.max(0, parseInt(document.getElementById('reading-form-max-attempts')?.value, 10) || 0);
  const deadline = (document.getElementById('reading-form-deadline')?.value || '').trim();
  let targetSetId = id;
  if (id) {
    // Edit existing
    const idx = readingSets.findIndex(s => String(s.id) === String(id));
    if (idx !== -1) {
      readingSets[idx] = {
        ...readingSets[idx],
        title,
        work,
        category: category || 'Nghị luận & Kỹ năng sống',
        author,
        genre: genre || category || 'Đọc hiểu',
        passage,
        source,
        status,
        privacy,
        openAt,
        maxAttempts,
        deadline,
        questions
      };
      if (typeof getSetAttemptLimitsMap === 'function' && typeof saveSetAttemptLimitsMap === 'function') {
        const map = getSetAttemptLimitsMap();
        map[String(targetSetId)] = maxAttempts;
        saveSetAttemptLimitsMap(map);
      }
      if (typeof getSetDeadlinesMap === 'function' && typeof saveSetDeadlinesMap === 'function') {
        const dMap = getSetDeadlinesMap();
        if (deadline) dMap[String(targetSetId)] = deadline;
        else delete dMap[String(targetSetId)];
        saveSetDeadlinesMap(dMap);
      }
      if (typeof getSetOpenAtMap === 'function' && typeof saveSetOpenAtMap === 'function') {
        const oMap = getSetOpenAtMap();
        if (openAt) oMap[String(targetSetId)] = openAt;
        else delete oMap[String(targetSetId)];
        saveSetOpenAtMap(oMap);
      }
      if (typeof getSetPrivacyMap === 'function' && typeof saveSetPrivacyMap === 'function') {
        const pMap = getSetPrivacyMap();
        pMap[String(targetSetId)] = privacy;
        saveSetPrivacyMap(pMap);
      }
      toast('Đã cập nhật bộ đề đọc hiểu thành công!', 'ok');
    }
  } else {
    // Create new
    targetSetId = 'reading_user_' + Date.now();
    const newSet = {
      id: targetSetId,
      title,
      work,
      category: category || 'Nghị luận & Kỹ năng sống',
      author,
      genre: genre || category || 'Đọc hiểu',
      passage,
      source,
      status,
      privacy,
      openAt,
      maxAttempts,
      deadline,
      questions
    };
    readingSets.unshift(newSet);
    if (typeof getSetAttemptLimitsMap === 'function' && typeof saveSetAttemptLimitsMap === 'function') {
      const map = getSetAttemptLimitsMap();
      map[String(targetSetId)] = maxAttempts;
      saveSetAttemptLimitsMap(map);
    }
    if (typeof getSetDeadlinesMap === 'function' && typeof saveSetDeadlinesMap === 'function') {
      const dMap = getSetDeadlinesMap();
      if (deadline) dMap[String(targetSetId)] = deadline;
      else delete dMap[String(targetSetId)];
      saveSetDeadlinesMap(dMap);
    }
    if (typeof getSetOpenAtMap === 'function' && typeof saveSetOpenAtMap === 'function') {
      const oMap = getSetOpenAtMap();
      if (openAt) oMap[String(targetSetId)] = openAt;
      else delete oMap[String(targetSetId)];
      saveSetOpenAtMap(oMap);
    }
    if (typeof getSetPrivacyMap === 'function' && typeof saveSetPrivacyMap === 'function') {
      const pMap = getSetPrivacyMap();
      pMap[String(targetSetId)] = privacy;
      saveSetPrivacyMap(pMap);
    }
    toast('🎉 Đã tạo bộ đề đọc hiểu mới thành công!', 'ok');
  }

  // Luôn reset bộ lọc để bộ đề mới tạo lập tức hiện lên đầu trang
  currentReadingCategory = 'all';
  readingSearchQuery = '';
  const searchInput = document.getElementById('reading-search-input');
  if (searchInput) searchInput.value = '';

  saveReadingData();
  closeReadingEditModal();

  // Đồng bộ cả giao diện Thư viện (Kho học liệu) nếu đang mở
  if (typeof updateLibTabsUI === 'function') updateLibTabsUI();
  if (typeof renderLibReadingPane === 'function') renderLibReadingPane();

  if (currentReadingSetId && currentReadingSetId === targetSetId) {
    const updated = readingSets.find(s => String(s.id) === String(targetSetId));
    if (updated) renderReadingWorkspace(updated);
  } else {
    renderReadingListView();
  }
}

// DELETE SET
function deleteReadingSet(id) {
  if (window.Auth && !window.Auth.canEditContent()) {
    return toast('Học sinh không có quyền xóa đề đọc hiểu! Vui lòng đăng nhập tài khoản Giáo viên.', 'bad');
  }
  const set = readingSets.find(s => String(s.id) === String(id));
  if (!set) return;

  if (!confirm(`Bạn có chắc muốn xóa đề đọc hiểu "${set.title}" không?`)) return;

  readingSets = readingSets.filter(s => String(s.id) !== String(id));
  try {
    localStorage.removeItem('vq_reading_draft_' + id);
  } catch (e) {}

  saveReadingData();
  toast('Đã xóa bộ đề đọc hiểu!', 'ok');
  renderReadingListView();
}

function duplicateReadingSet(id) {
  if (window.Auth && !window.Auth.canEditContent()) {
    return toast('Học sinh không có quyền sao chép đề đọc hiểu!', 'bad');
  }
  const set = readingSets.find(s => String(s.id) === String(id));
  if (!set) return;
  const clone = JSON.parse(JSON.stringify(set));
  clone.id = 'reading_copy_' + uid();
  clone.title = clone.title + ' (Bản sao)';
  readingSets.unshift(clone);
  saveReadingData();
  renderReadingListView();
  toast('Đã nhân bản bộ đề đọc hiểu thành công!', 'ok');
}

function deleteCurrentOpenedReadingSet() {
  if (window.Auth && !window.Auth.canEditContent()) {
    return toast('Học sinh không có quyền xóa đề đọc hiểu!', 'bad');
  }
  if (!currentReadingSetId) return;
  deleteReadingSet(currentReadingSetId);
  exitReadingWorkspace();
}

// CATEGORY MANAGEMENT
function promptAddNewReadingCategory() {
  if (window.Auth && !window.Auth.canEditContent()) {
    return toast('Học sinh không có quyền thêm chủ đề đọc hiểu!', 'bad');
  }
  const name = prompt('Nhập tên chủ đề / thể loại đọc hiểu mới:');
  if (!name || !name.trim()) return;

  const trimmed = name.trim();
  if (readingCategories.includes(trimmed)) {
    return toast('Chủ đề này đã tồn tại!', 'bad');
  }

  readingCategories.push(trimmed);
  saveReadingData();
  toast(`Đã thêm chủ đề "${trimmed}"`, 'ok');
  if (typeof renderReadingListView === 'function') renderReadingListView();
  if (typeof R !== 'undefined' && typeof R.lib === 'function') R.lib();
}

function promptDeleteCurrentReadingCategory() {
  if (window.Auth && !window.Auth.canEditContent()) {
    return toast('Học sinh không có quyền xóa chủ đề đọc hiểu!', 'bad');
  }
  let catToDelete = '';

  // 1. Nếu đang lọc một chủ đề trong Thư viện hoặc màn hình Đọc hiểu
  if (typeof currentLibReadingTopic !== 'undefined' && currentLibReadingTopic) {
    catToDelete = currentLibReadingTopic;
  } else if (currentReadingCategory && currentReadingCategory !== 'all') {
    catToDelete = currentReadingCategory;
  }

  // 2. Nếu chưa chọn chủ đề cụ thể nào, hiển thị danh sách cho chọn
  if (!catToDelete) {
    const validCats = (readingCategories || []).filter(c => c && c !== 'Chưa phân loại' && c !== 'all');
    if (!validCats.length) {
      return toast('Không có chủ đề đọc hiểu nào để xóa!', 'bad');
    }
    const catList = validCats.map((c, i) => `${i + 1}. ${c}`).join('\n');
    const chosen = prompt(`Nhập số thứ tự của chủ đề đọc hiểu bạn muốn xóa:\n\n${catList}`);
    if (!chosen || !chosen.trim()) return;
    const idx = parseInt(chosen.trim(), 10) - 1;
    if (isNaN(idx) || idx < 0 || idx >= validCats.length) {
      return toast('Số thứ tự không hợp lệ!', 'bad');
    }
    catToDelete = validCats[idx];
  }

  if (!confirm(`Bạn có chắc chắn muốn xóa chủ đề "${catToDelete}" không? Các bộ đề thuộc chủ đề này sẽ được chuyển sang "Chưa phân loại".`)) {
    return;
  }

  readingCategories = readingCategories.filter(c => c !== catToDelete);
  readingSets.forEach(s => {
    if (s.genre === catToDelete || s.category === catToDelete) {
      s.genre = 'Chưa phân loại';
      s.category = 'Chưa phân loại';
    }
  });

  currentReadingCategory = 'all';
  if (typeof currentLibReadingTopic !== 'undefined') currentLibReadingTopic = '';
  saveReadingData();
  toast(`Đã xóa chủ đề "${catToDelete}"`, 'ok');
  if (typeof renderReadingListView === 'function') renderReadingListView();
  if (typeof R !== 'undefined' && typeof R.lib === 'function') R.lib();
}

if (typeof window !== 'undefined') {
  window.promptAddNewReadingCategory = promptAddNewReadingCategory;
  window.promptDeleteCurrentReadingCategory = promptDeleteCurrentReadingCategory;
}

// Tự động khởi tạo dữ liệu đọc hiểu ngay khi nạp script
initReadingModule();
if (typeof currentScreen !== 'undefined' && currentScreen === 'reading') {
  exitReadingWorkspace();
}


/* =========================================================================
   10. GDPT 2018 EDUCATIONAL ENHANCEMENTS MODULE
   - 1. Giàn giáo nhận thức (Scaffolding - "Gợi ý tư duy" chuẩn hóa theo 12 dạng bài NLVH & NLXH)
   - 2. Cơ chế Gamification (Streak chuỗi ngày học, Thanh tiến trình XP & Huy hiệu)
   - 3. Góc truyền cảm hứng (Quote of the Day & Sổ tay trích dẫn văn học)
   - 4. Bộ đếm thời gian (Timer) rèn áp lực phòng thi (20p NLXH, 60p NLVH...)
   - 5. Hệ thống "Báo cáo lỗi / Thắc mắc" (Đẩy về Email / Google Sheets / Quản lý lớp)
   ========================================================================= */

(function initEducationalEnhancements(global) {
  'use strict';

  const GAMI_STORAGE_KEY = 'vq_gamification_v1';
  const SAVED_QUOTES_KEY = 'vq_saved_quotes_v1';
  const QA_REPORTS_KEY = 'vq_qa_reports_v1';
  const QA_CONFIG_KEY = 'vq_qa_config_v1';

  // =========================================================================
  // PHẦN 1: KHO DỮ LIỆU GÓC TRUYỀN CẢM HỨNG (QUOTE OF THE DAY)
  // =========================================================================
  const INSPIRATIONAL_QUOTES = [
    {
      id: 'q1',
      quote: '“Văn học là nhân học.”',
      author: 'M. Gorki',
      category: 'Lý luận văn học',
      tip: 'Dùng làm câu dẫn Mở bài hoặc Kết bài cho các đề nghị luận về giá trị nhân đạo và sứ mệnh nuôi dưỡng tâm hồn của văn chương.'
    },
    {
      id: 'q2',
      quote: '“Nghệ thuật không cần phải là ánh trăng lừa dối, nghệ thuật không nên là ánh trăng lừa dối, nghệ thuật có thể chỉ là tiếng đau khổ kia, thoát ra từ những kiếp lầm than.”',
      author: 'Nam Cao (Trăng sáng)',
      category: 'Lý luận văn học',
      tip: 'Rất đắt giá khi phân tích mối quan hệ giữa văn học và hiện thực cuộc sống, hoặc khi viết về các tác phẩm hiện thực phê phán.'
    },
    {
      id: 'q3',
      quote: '“Nhà văn tồn tại ở trên đời có lẽ trước hết là để làm công việc giống như kẻ nâng giấc cho những con người bị cùng đường, tuyệt lộ, bị cái ác hoặc số phận đen đủi dồn đến chân tường.”',
      author: 'Nguyễn Minh Châu',
      category: 'Thiên chức nhà văn',
      tip: 'Dùng để bàn luận sâu sắc về tấm lòng nhân đạo, sự thấu cảm và thiên chức bảo vệ con người của người cầm bút.'
    },
    {
      id: 'q4',
      quote: '“Thơ là tiếng lòng, là sự đồng điệu giữa tâm hồn nhà thơ và tâm hồn người đọc.”',
      author: 'Tố Hữu',
      category: 'Lý luận về Thơ',
      tip: 'Áp dụng tuyệt vời cho Mở bài hoặc Kết bài của mọi đề phân tích, cảm nhận một đoạn thơ trữ tình.'
    },
    {
      id: 'q5',
      quote: '“Nếu là con chim, chiếc lá / Thì con chim phải hót, chiếc lá phải xanh / Lẽ nào vay mà không có trả / Sống là cho, đâu chỉ nhận riêng mình.”',
      author: 'Tố Hữu',
      category: 'Châm ngôn sống · NLXH',
      tip: 'Dẫn chứng thơ cực hay cho đoạn văn 200 chữ về lối sống cống hiến, lòng nhân ái, trách nhiệm của tuổi trẻ.'
    },
    {
      id: 'q6',
      quote: '“Đừng hỏi Tổ quốc đã làm gì cho ta, mà cần hỏi ta đã làm gì cho Tổ quốc hôm nay.”',
      author: 'Nhạc sĩ Vũ Hoàng',
      category: 'Khát vọng tuổi trẻ · NLXH',
      tip: 'Dùng trong đoạn văn nghị luận xã hội 200 chữ về tinh thần trách nhiệm, lòng yêu nước và khát vọng cống hiến.'
    },
    {
      id: 'q7',
      quote: '“Khi tác phẩm kết thúc, ấy mới là lúc cuộc sống thực sự của nó bắt đầu trong lòng người đọc.”',
      author: 'Tiếp nhận văn học',
      category: 'Tiếp nhận văn học',
      tip: 'Dùng cho phần Kết bài để khẳng định sức sống vượt thời gian và dư âm của tác phẩm trong lòng độc giả.'
    },
    {
      id: 'q8',
      quote: '“Con người có thể bị hủy diệt chứ không thể bị khuất phục.”',
      author: 'Ernest Hemingway (Ông già và biển cả)',
      category: 'Bản lĩnh sống · NLXH',
      tip: 'Câu châm ngôn kinh điển cho các đề nghị luận xã hội về nghị lực vượt khó, ý chí kiên cường trước nghịch cảnh.'
    },
    {
      id: 'q9',
      quote: '“Mỗi tác phẩm phải là một phát minh về hình thức và một khám phá về nội dung.”',
      author: 'Leonid Leonov',
      category: 'Sáng tạo nghệ thuật',
      tip: 'Dùng để đánh giá tài năng độc đáo, phong cách nghệ thuật riêng biệt của tác giả ở phần Đánh giá chung.'
    },
    {
      id: 'q10',
      quote: '“Không có câu chuyện cổ tích nào đẹp hơn câu chuyện do chính cuộc sống viết nên.”',
      author: 'Hans Christian Andersen',
      category: 'Châm ngôn sống · NLXH',
      tip: 'Phù hợp để mở đoạn nghị luận xã hội về vẻ đẹp của sự nỗ lực tự thân, lòng tử tế đời thường và giá trị sống đích thực.'
    },
    {
      id: 'q11',
      quote: '“Văn chương không phải là cách đem đến cho người đọc sự thoát ly hay sự quên; trái lại văn chương là một thứ khí giới thanh cao và đắc lực mà chúng ta có, để vừa tố cáo và thay đổi một cái thế giới giả dối và tàn ác, vừa làm cho lòng người được thêm trong sạch và phong phú hơn.”',
      author: 'Thạch Lam (Theo dòng)',
      category: 'Lý luận văn học',
      tip: 'Nhận định vàng cho mọi bài văn nghị luận văn học khi bàn về chức năng giáo dục và thanh lọc tâm hồn của văn chương.'
    },
    {
      id: 'q12',
      quote: '“Hãy hướng về phía mặt trời, bóng tối sẽ ngả về sau lưng bạn.”',
      author: 'Walt Whitman',
      category: 'Thái độ sống tích cực · NLXH',
      tip: 'Câu mở đoạn hoặc kết đoạn truyền cảm hứng mạnh mẽ cho đề bài về niềm tin, sự lạc quan và thái độ sống tích cực.'
    }
  ];

  let currentQuoteIndex = 0;

  function getTodayDateString() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function initQuoteOfTheDay() {
    const todayStr = getTodayDateString();
    let hash = 0;
    for (let i = 0; i < todayStr.length; i++) {
      hash = (hash * 31 + todayStr.charCodeAt(i)) % INSPIRATIONAL_QUOTES.length;
    }
    currentQuoteIndex = hash;
    renderHomeQuoteOfDay();
  }

  function getSavedQuoteIds() {
    try {
      const raw = localStorage.getItem(SAVED_QUOTES_KEY);
      const list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (_) {
      return [];
    }
  }

  function saveQuoteIds(ids) {
    try {
      localStorage.setItem(SAVED_QUOTES_KEY, JSON.stringify(ids));
    } catch (_) {}
  }

  function renderHomeQuoteOfDay() {
    const item = INSPIRATIONAL_QUOTES[currentQuoteIndex] || INSPIRATIONAL_QUOTES[0];
    const textEl = document.getElementById('home-qotd-text');
    const authorEl = document.getElementById('home-qotd-author');
    const catEl = document.getElementById('home-qotd-category');
    const tipEl = document.getElementById('home-qotd-tip');
    const saveBtn = document.getElementById('btn-save-qotd-home');

    if (textEl) textEl.textContent = item.quote;
    if (authorEl) authorEl.textContent = `— ${item.author} —`;
    if (catEl) catEl.textContent = item.category;
    if (tipEl) tipEl.innerHTML = `<b>💡 Gợi ý vận dụng viết văn:</b> ${esc(item.tip)}`;

    if (saveBtn) {
      const savedIds = getSavedQuoteIds();
      const isSaved = savedIds.includes(item.id);
      saveBtn.innerHTML = isSaved
        ? '<ion-icon name="bookmark"></ion-icon> <span>Đã lưu sổ tay</span>'
        : '<ion-icon name="bookmark-outline"></ion-icon> <span>Lưu vào sổ tay</span>';
    }
  }

  function nextQuoteOfDay() {
    currentQuoteIndex = (currentQuoteIndex + 1) % INSPIRATIONAL_QUOTES.length;
    renderHomeQuoteOfDay();
    if (typeof playSound === 'function') playSound('pop');
  }

  function copyCurrentQuoteOfDay() {
    const item = INSPIRATIONAL_QUOTES[currentQuoteIndex] || INSPIRATIONAL_QUOTES[0];
    const textToCopy = `${item.quote} (${item.author})`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        toast('📋 Đã sao chép câu văn truyền cảm hứng!', 'ok');
      }).catch(() => {
        toast('Đã chọn nội dung câu văn!', 'ok');
      });
    } else {
      toast('📋 ' + textToCopy, 'ok');
    }
  }

  function toggleSaveCurrentQuote(quoteId) {
    const targetId = quoteId || (INSPIRATIONAL_QUOTES[currentQuoteIndex] && INSPIRATIONAL_QUOTES[currentQuoteIndex].id);
    if (!targetId) return;
    let saved = getSavedQuoteIds();
    if (saved.includes(targetId)) {
      saved = saved.filter(id => id !== targetId);
      toast('Đã bỏ lưu khỏi Sổ tay văn học.', 'ok');
    } else {
      saved.push(targetId);
      toast('🔖 Đã lưu nhận định vào Sổ tay Văn học cá nhân!', 'ok');
      awardCustomGamificationPoints(5, 'quote_saved');
    }
    saveQuoteIds(saved);
    renderHomeQuoteOfDay();
    const dlg = document.getElementById('quote-of-day-dialog');
    if (dlg && dlg.open) {
      renderQuoteOfDayModalBody();
    }
  }

  function openQuoteOfDayModal() {
    const dlg = document.getElementById('quote-of-day-dialog');
    if (!dlg) return;
    renderQuoteOfDayModalBody();
    dlg.showModal();
  }

  function closeQuoteOfDayModal() {
    const dlg = document.getElementById('quote-of-day-dialog');
    if (dlg && dlg.open) dlg.close();
  }

  function renderQuoteOfDayModalBody(filterMode = 'all') {
    const body = document.getElementById('qotd-modal-body');
    if (!body) return;
    const savedIds = getSavedQuoteIds();
    const currentItem = INSPIRATIONAL_QUOTES[currentQuoteIndex] || INSPIRATIONAL_QUOTES[0];
    const listToShow = filterMode === 'saved'
      ? INSPIRATIONAL_QUOTES.filter(q => savedIds.includes(q.id))
      : INSPIRATIONAL_QUOTES;

    body.innerHTML = `
      <div class="qotd-modal-spotlight">
        <div class="qotd-spotlight-badge">🌟 CÂU VĂN / NHẬN ĐỊNH TÂM ĐẮC HÔM NAY</div>
        <blockquote class="qotd-spotlight-quote">${esc(currentItem.quote)}</blockquote>
        <div class="qotd-spotlight-author">— ${esc(currentItem.author)} (${esc(currentItem.category)}) —</div>
        <div class="qotd-spotlight-tip"><b>💡 Hướng dẫn đưa vào bài thi:</b> ${esc(currentItem.tip)}</div>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:12px;">
          <button type="button" class="btn au sm" onclick="nextQuoteOfDay(); renderQuoteOfDayModalBody('${filterMode}');">
            <ion-icon name="shuffle-outline"></ion-icon> <span>Khám phá câu khác</span>
          </button>
          <button type="button" class="btn cy sm" onclick="copyCurrentQuoteOfDay()">
            <ion-icon name="copy-outline"></ion-icon> <span>Sao chép trích dẫn</span>
          </button>
          <button type="button" class="btn gh sm" onclick="toggleSaveCurrentQuote('${currentItem.id}')">
            <ion-icon name="${savedIds.includes(currentItem.id) ? 'bookmark' : 'bookmark-outline'}"></ion-icon>
            <span>${savedIds.includes(currentItem.id) ? 'Đã lưu trong Sổ tay' : 'Lưu vào Sổ tay'}</span>
          </button>
        </div>
      </div>

      <div class="qotd-filter-bar">
        <button type="button" class="btn ${filterMode === 'all' ? 'au' : 'gh'} sm" onclick="renderQuoteOfDayModalBody('all')">
          📚 Tất cả nhận định (${INSPIRATIONAL_QUOTES.length})
        </button>
        <button type="button" class="btn ${filterMode === 'saved' ? 'au' : 'gh'} sm" onclick="renderQuoteOfDayModalBody('saved')">
          🔖 Sổ tay đã lưu (${savedIds.length})
        </button>
      </div>

      <div class="qotd-list-grid">
        ${listToShow.length ? listToShow.map(q => {
          const isSaved = savedIds.includes(q.id);
          return `
            <div class="qotd-list-item">
              <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-bottom:6px;">
                <span class="qotd-category-pill">${esc(q.category)}</span>
                <div style="display:flex; gap:6px;">
                  <button type="button" class="btn gh sm" style="padding:2px 8px; font-size:12px;" onclick="copySpecificQuote('${q.id}')" title="Sao chép câu này">📋 Copy</button>
                  <button type="button" class="btn ${isSaved ? 'cy' : 'gh'} sm" style="padding:2px 8px; font-size:12px;" onclick="toggleSaveCurrentQuote('${q.id}')">
                    ${isSaved ? '🔖 Đã lưu' : '+ Lưu'}
                  </button>
                </div>
              </div>
              <div class="qotd-item-quote">${esc(q.quote)}</div>
              <div class="qotd-item-author">— ${esc(q.author)}</div>
              <div class="qotd-item-tip">💡 <i>${esc(q.tip)}</i></div>
            </div>
          `;
        }).join('') : `
          <div style="text-align:center; padding:28px 16px; color:var(--mut);">
            Chưa có câu trích dẫn nào được lưu trong Sổ tay. Hãy bấm nút <b>+ Lưu</b> ở các câu nhận định bạn yêu thích nhé!
          </div>
        `}
      </div>
    `;
  }

  function copySpecificQuote(quoteId) {
    const item = INSPIRATIONAL_QUOTES.find(q => q.id === quoteId);
    if (!item) return;
    const text = `${item.quote} (${item.author})`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => toast('📋 Đã sao chép nhận định văn học!', 'ok'));
    } else {
      toast('📋 ' + text, 'ok');
    }
  }


  // =========================================================================
  // PHẦN 2: CƠ CHẾ GAMIFICATION (STREAK, PROGRESS BAR, XP & HUY HIỆU)
  // =========================================================================
  const BADGES_CATALOG = [
    {
      id: 'first_flame',
      icon: '🔥',
      name: 'Ngọn Lửa Khởi Đầu',
      desc: 'Bắt đầu ngày học đầu tiên trên hệ thống',
      xpBonus: 20
    },
    {
      id: 'streak_3',
      icon: '⚡',
      name: 'Chiến Binh Kiên Trì',
      desc: 'Đạt chuỗi 3 ngày học liên tục (Streak)',
      xpBonus: 50
    },
    {
      id: 'streak_7',
      icon: '👑',
      name: 'Huyền Thoại Tuần Lễ',
      desc: 'Đạt chuỗi 7 ngày học liên tục không gián đoạn',
      xpBonus: 120
    },
    {
      id: 'quiz_sniper',
      icon: '🎯',
      name: 'Xạ Thủ Trắc Nghiệm',
      desc: 'Đạt từ 8.0 điểm trở lên trong một bài học trắc nghiệm',
      xpBonus: 40
    },
    {
      id: 'reading_explorer',
      icon: '📖',
      name: 'Nhà Phê Bình Trẻ',
      desc: 'Hoàn thành một đề luyện Đọc hiểu văn bản',
      xpBonus: 40
    },
    {
      id: 'writing_master',
      icon: '✍️',
      name: 'Cây Bút Vàng 200 Chữ',
      desc: 'Hoàn thành và nộp một bài Luyện viết nghị luận',
      xpBonus: 50
    },
    {
      id: 'scaffold_thinker',
      icon: '💡',
      name: 'Kiến Trúc Sư Tư Duy',
      desc: 'Sử dụng "Gợi ý tư duy (Giàn giáo nhận thức)" để lập dàn ý',
      xpBonus: 30
    },
    {
      id: 'perfect_scholar',
      icon: '🏆',
      name: 'Bảng Vàng Thủ Khoa',
      desc: 'Đạt điểm 10/10 tuyệt đối hoặc hoàn thành từ 5 bài luyện tập',
      xpBonus: 80
    }
  ];

  const LEVEL_RANKS = [
    { minXp: 0, maxXp: 100, title: '🌱 Tân Sĩ Tử', level: 1 },
    { minXp: 100, maxXp: 250, title: '📖 Mầm Văn Học', level: 2 },
    { minXp: 250, maxXp: 500, title: '🖋️ Cây Bút Trẻ', level: 3 },
    { minXp: 500, maxXp: 900, title: '🎓 Nhà Phê Bình Trẻ', level: 4 },
    { minXp: 900, maxXp: 1500, title: '👑 Bậc Thầy Ngôn Từ', level: 5 },
    { minXp: 1500, maxXp: 3000, title: '🐉 Trạng Nguyên Ngữ Văn', level: 6 }
  ];

  function getGamificationState() {
    const today = getTodayDateString();
    let state = {
      streak: 1,
      bestStreak: 1,
      lastActiveDate: today,
      activeDates: [today],
      xp: 25,
      dailyActivities: { [today]: 0 },
      unlockedBadges: ['first_flame'],
      usedScaffolding: false
    };

    try {
      const raw = localStorage.getItem(GAMI_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        state = { ...state, ...parsed };
        if (!Array.isArray(state.activeDates)) state.activeDates = [today];
        if (!Array.isArray(state.unlockedBadges)) state.unlockedBadges = ['first_flame'];
        if (!state.dailyActivities || typeof state.dailyActivities !== 'object') state.dailyActivities = {};
      }
    } catch (_) {}

    if (!state.activeDates.includes(today)) {
      state.activeDates.push(today);
      if (state.activeDates.length > 60) state.activeDates = state.activeDates.slice(-60);

      const yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      const yStr = `${yesterdayDate.getFullYear()}-${String(yesterdayDate.getMonth() + 1).padStart(2, '0')}-${String(yesterdayDate.getDate()).padStart(2, '0')}`;

      if (state.lastActiveDate === yStr) {
        state.streak = (Number(state.streak) || 1) + 1;
      } else if (state.lastActiveDate !== today) {
        state.streak = 1;
      }
      state.lastActiveDate = today;
      state.xp = (Number(state.xp) || 0) + 10;
    }

    if (state.streak > (state.bestStreak || 1)) {
      state.bestStreak = state.streak;
    }

    syncGamificationWithHistory(state);
    saveGamificationState(state);
    return state;
  }

  function saveGamificationState(state) {
    try {
      localStorage.setItem(GAMI_STORAGE_KEY, JSON.stringify(state));
    } catch (_) {}
  }

  function syncGamificationWithHistory(state) {
    let history = [];
    try {
      if (typeof getAllRawQuizHistory === 'function') {
        history = getAllRawQuizHistory();
      } else {
        const raw = localStorage.getItem('vq_quiz_history_v1');
        history = raw ? JSON.parse(raw) : [];
      }
    } catch (_) {}

    if (!Array.isArray(history)) return;

    const unlock = (badgeId) => {
      if (!state.unlockedBadges.includes(badgeId)) {
        state.unlockedBadges.push(badgeId);
        const b = BADGES_CATALOG.find(x => x.id === badgeId);
        if (b) state.xp = (Number(state.xp) || 0) + b.xpBonus;
      }
    };

    unlock('first_flame');
    if (state.streak >= 3) unlock('streak_3');
    if (state.streak >= 7) unlock('streak_7');
    if (state.usedScaffolding) unlock('scaffold_thinker');

    const hasHighQuiz = history.some(h => (!h.type || h.type === 'quiz') && Number(h.score) >= 8);
    if (hasHighQuiz) unlock('quiz_sniper');

    const hasReading = history.some(h => h.type === 'reading');
    if (hasReading) unlock('reading_explorer');

    const hasWriting = history.some(h => h.type === 'writing');
    if (hasWriting) unlock('writing_master');

    const hasPerfectOr5 = history.length >= 5 || history.some(h => Number(h.score) >= 10);
    if (hasPerfectOr5) unlock('perfect_scholar');

    const today = getTodayDateString();
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayHistoryCount = history.filter(h => Number(h.timestamp) >= todayStart.getTime()).length;
    const savedTodayCount = Number(state.dailyActivities[today] || 0);
    state.dailyActivities[today] = Math.max(savedTodayCount, todayHistoryCount);

    const minCalculatedXp = 25 + history.length * 30 + state.unlockedBadges.length * 20;
    if ((Number(state.xp) || 0) < minCalculatedXp) {
      state.xp = minCalculatedXp;
    }
  }

  function getRankInfo(xp) {
    const val = Math.max(0, Number(xp) || 0);
    for (let i = 0; i < LEVEL_RANKS.length; i++) {
      const r = LEVEL_RANKS[i];
      if (val < r.maxXp || i === LEVEL_RANKS.length - 1) {
        const progress = Math.min(100, Math.max(5, Math.round(((val - r.minXp) / Math.max(1, r.maxXp - r.minXp)) * 100)));
        return {
          ...r,
          currentXp: val,
          progressPercent: progress
        };
      }
    }
    return { ...LEVEL_RANKS[0], currentXp: val, progressPercent: 10 };
  }

  function onActivityCompletedGamification(entry) {
    const state = getGamificationState();
    const today = getTodayDateString();
    state.dailyActivities[today] = (Number(state.dailyActivities[today]) || 0) + 1;
    state.xp = (Number(state.xp) || 0) + 35;

    syncGamificationWithHistory(state);
    saveGamificationState(state);
    renderGamificationUI();
  }

  function awardCustomGamificationPoints(points, reason) {
    const state = getGamificationState();
    const today = getTodayDateString();
    state.xp = (Number(state.xp) || 0) + (Number(points) || 10);
    if (reason === 'scaffolding') {
      state.usedScaffolding = true;
      state.dailyActivities[today] = Math.max(1, Number(state.dailyActivities[today]) || 0);
    }
    syncGamificationWithHistory(state);
    saveGamificationState(state);
    renderGamificationUI();
  }

  function renderGamificationUI() {
    const state = getGamificationState();
    const rank = getRankInfo(state.xp);
    const today = getTodayDateString();
    const dailyDone = Number(state.dailyActivities[today] || 0);
    const dailyGoal = 3;
    const dailyPercent = Math.min(100, Math.round((dailyDone / dailyGoal) * 100));

    const navStreak = document.getElementById('nav-streak-count');
    if (navStreak) navStreak.textContent = state.streak;

    const streakDaysEl = document.getElementById('home-streak-days');
    const rankTitleEl = document.getElementById('home-rank-title');
    const unlockedCountEl = document.getElementById('home-badges-unlocked-count');
    const xpCurEl = document.getElementById('home-xp-current');
    const xpNextEl = document.getElementById('home-xp-next');
    const xpPctEl = document.getElementById('home-xp-percent');
    const xpBarEl = document.getElementById('home-xp-bar');
    const dailyDoneEl = document.getElementById('home-daily-done');
    const dailyPctEl = document.getElementById('home-daily-percent');
    const dailyBarEl = document.getElementById('home-daily-bar');

    if (streakDaysEl) streakDaysEl.textContent = state.streak;
    if (rankTitleEl) rankTitleEl.textContent = `Cấp ${rank.level}: ${rank.title} · ${state.xp} XP`;
    if (unlockedCountEl) unlockedCountEl.textContent = `${state.unlockedBadges.length}/${BADGES_CATALOG.length}`;
    if (xpCurEl) xpCurEl.textContent = state.xp;
    if (xpNextEl) xpNextEl.textContent = rank.maxXp;
    if (xpPctEl) xpPctEl.textContent = `${rank.progressPercent}%`;
    if (xpBarEl) xpBarEl.style.width = `${rank.progressPercent}%`;
    if (dailyDoneEl) dailyDoneEl.textContent = dailyDone;
    if (dailyPctEl) dailyPctEl.textContent = `${dailyPercent}%`;
    if (dailyBarEl) dailyBarEl.style.width = `${dailyPercent}%`;

    const weekRow = document.getElementById('home-streak-week-row');
    if (weekRow) {
      const dayLabels = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
      const daysHtml = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        const isActive = state.activeDates.includes(dStr);
        const isToday = i === 0;
        daysHtml.push(`
          <div class="gami-day-pill ${isActive ? 'active' : ''} ${isToday ? 'today' : ''}" title="Ngày ${d.toLocaleDateString('vi-VN')}">
            <span class="gami-day-name">${dayLabels[d.getDay()]}</span>
            <span class="gami-day-dot">${isActive ? '🔥' : '•'}</span>
          </div>
        `);
      }
      weekRow.innerHTML = daysHtml.join('');
    }

    const miniBadgesRow = document.getElementById('home-mini-badges-row');
    if (miniBadgesRow) {
      miniBadgesRow.innerHTML = BADGES_CATALOG.map(b => {
        const unlocked = state.unlockedBadges.includes(b.id);
        return `
          <div class="gami-mini-badge ${unlocked ? 'unlocked' : 'locked'}" onclick="openGamificationModal()" title="${esc(b.name)}: ${esc(b.desc)}">
            <span class="gami-mini-badge-icon">${b.icon}</span>
            <span class="gami-mini-badge-name">${esc(b.name)}</span>
          </div>
        `;
      }).join('');
    }
  }

  function openGamificationModal() {
    const dlg = document.getElementById('gamification-dialog');
    if (!dlg) return;
    renderGamificationModalBody();
    dlg.showModal();
  }

  function closeGamificationModal() {
    const dlg = document.getElementById('gamification-dialog');
    if (dlg && dlg.open) dlg.close();
  }

  function renderGamificationModalBody() {
    const body = document.getElementById('gamification-modal-body');
    if (!body) return;
    const state = getGamificationState();
    const rank = getRankInfo(state.xp);
    const today = getTodayDateString();
    const dailyDone = Number(state.dailyActivities[today] || 0);
    const dailyPercent = Math.min(100, Math.round((dailyDone / 3) * 100));

    body.innerHTML = `
      <div class="gami-modal-stats-grid">
        <div class="gami-stat-box">
          <div class="gami-stat-icon">🔥</div>
          <div>
            <div class="gami-stat-val">${state.streak} ngày</div>
            <div class="gami-stat-lbl">Chuỗi học liên tục (Kỷ lục: ${state.bestStreak || state.streak})</div>
          </div>
        </div>
        <div class="gami-stat-box">
          <div class="gami-stat-icon">⭐</div>
          <div>
            <div class="gami-stat-val">${state.xp} XP</div>
            <div class="gami-stat-lbl">${rank.title} (Cấp ${rank.level})</div>
          </div>
        </div>
        <div class="gami-stat-box">
          <div class="gami-stat-icon">🏅</div>
          <div>
            <div class="gami-stat-val">${state.unlockedBadges.length} / ${BADGES_CATALOG.length}</div>
            <div class="gami-stat-lbl">Huy hiệu đã chinh phục</div>
          </div>
        </div>
      </div>

      <div class="gami-modal-progress-card">
        <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:700; margin-bottom:6px;">
          <span>Tiến trình lên cấp tiếp theo (${state.xp} / ${rank.maxXp} XP)</span>
          <span>${rank.progressPercent}%</span>
        </div>
        <div class="gami-progress-track">
          <div class="gami-progress-fill" style="width:${rank.progressPercent}%;"></div>
        </div>

        <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:700; margin:12px 0 6px;">
          <span>Mục tiêu học tập hôm nay (${dailyDone} / 3 bài tập hoàn thành)</span>
          <span>${dailyPercent}%</span>
        </div>
        <div class="gami-progress-track gami-daily-track">
          <div class="gami-progress-fill gami-daily-fill" style="width:${dailyPercent}%;"></div>
        </div>
      </div>

      <h4 style="margin:16px 0 10px; font-size:15px; font-weight:800;">🏅 Bộ Sưu Tập Huy Hiệu Chinh Phục GDPT 2018</h4>
      <div class="gami-badges-full-grid">
        ${BADGES_CATALOG.map(b => {
          const isUnlocked = state.unlockedBadges.includes(b.id);
          return `
            <div class="gami-badge-card ${isUnlocked ? 'is-unlocked' : 'is-locked'}">
              <div class="gami-badge-big-icon">${b.icon}</div>
              <div class="gami-badge-info">
                <div class="gami-badge-title-row">
                  <b>${esc(b.name)}</b>
                  <span class="gami-badge-xp">+${b.xpBonus} XP</span>
                </div>
                <p>${esc(b.desc)}</p>
                <span class="gami-badge-status ${isUnlocked ? 'ok' : 'mut'}">
                  ${isUnlocked ? '✓ Đã chinh phục' : '🔒 Chưa mở khóa'}
                </span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }


  // =========================================================================
  // PHẦN 3: GIÀN GIÁO NHẬN THỨC (SCAFFOLDING) THEO ĐÚNG 12 DẠNG BÀI TRONG FILE
  // =========================================================================
  const SCAFFOLD_TEMPLATES = {
    // --- NHÓM 1: ĐOẠN VĂN NGHỊ LUẬN VĂN HỌC (~200 CHỮ - 1 ĐOẠN DUY NHẤT) ---
    nlvh_doan_chude: {
      group: 'Đoạn văn NLVH (~200 chữ)',
      name: '1. Đoạn NLVH: Phân tích, đánh giá NỘI DUNG CHỦ ĐỀ (Thơ / Truyện)',
      singleParagraph: true,
      formRule: 'Hình thức: Chỉ viết trong 1 đoạn văn, không xuống hàng. Dung lượng: Khoảng 200 chữ (từ 2/3 đến tối đa 1 trang giấy thi, chừa lại 3 dòng).',
      formulaSteps: ['Câu dẫn + GTVĐNL', 'Nêu chủ đề', 'Phân tích 2-3 khía cạnh (Thứ nhất, Thứ hai, Thứ ba)', 'Đánh giá vai trò chủ đề', 'Nghệ thuật', 'Kết đoạn – Trích dẫn'],
      referenceHtml: `
        <div class="scaffold-ref-table-wrap">
          <table class="scaffold-ref-table">
            <thead>
              <tr>
                <th>Chủ đề của THƠ thể hiện qua</th>
                <th>Chủ đề của TRUYỆN thể hiện qua</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>• Nhan đề<br>• Hình tượng trung tâm<br>• Tình cảm, cảm xúc</td>
                <td>• Tình huống truyện<br>• Nhân vật (tính cách, phẩm chất, hành động)<br>• Chi tiết đặc sắc</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      fields: [
        { label: '1. Câu dẫn + GTVĐNL & Nêu chủ đề tác phẩm:', placeholder: 'VD: Chủ đề của bài thơ/truyện ngắn A là ca ngợi tình mẫu tử thiêng liêng, cao quý...' },
        { label: '2. Khía cạnh 1 (Gọi tên yếu tố + dẫn chứng + phân tích ngắn):', placeholder: 'Thứ nhất, chủ đề được thể hiện qua [nhan đề / tình huống truyện / hình tượng...]' },
        { label: '3. Khía cạnh 2 (Gọi tên yếu tố + dẫn chứng + phân tích ngắn):', placeholder: 'Thứ hai, chủ đề còn được làm rõ qua [nhân vật / tình cảm cảm xúc / chi tiết...]' },
        { label: '4. Khía cạnh 3 (Gọi tên yếu tố + dẫn chứng + phân tích ngắn):', placeholder: 'Thứ ba, chủ đề còn được làm sáng tỏ qua...' },
        { label: '5. Đánh giá vai trò chủ đề & Thông điệp:', placeholder: 'Chủ đề có ý nghĩa sâu sắc, khơi gợi... góp phần làm rõ thông điệp... của tác phẩm' },
        { label: '6. Phân tích nghệ thuật & Kết đoạn (kèm trích dẫn):', placeholder: 'Bằng thể thơ/ngôi kể, từ ngữ, hình ảnh, biện pháp tu từ đặc sắc, tác phẩm mãi ngân vang...' }
      ]
    },

    nlvh_doan_nt_tho: {
      group: 'Đoạn văn NLVH (~200 chữ)',
      name: '2. Đoạn NLVH: Phân tích, đánh giá NGHỆ THUẬT THƠ',
      singleParagraph: true,
      formRule: 'Hình thức: Chỉ viết trong 1 đoạn văn, không xuống hàng (~200 chữ). Luôn gắn các yếu tố hình thức với việc làm rõ chủ đề và thông điệp.',
      formulaSteps: ['Câu dẫn + GTVĐNL', 'Thứ nhất: Thể thơ', 'Thứ hai: Hình ảnh', 'Thứ ba: Từ ngữ', 'Thứ tư: Biện pháp tu từ', 'Làm rõ Chủ đề & Thông điệp'],
      referenceHtml: '',
      fields: [
        { label: '1. Mở đoạn (Câu dẫn + Giới thiệu VĐNL nghệ thuật thơ):', placeholder: 'Giới thiệu tác giả, đoạn thơ và nhận xét khái quát về đặc sắc nghệ thuật...' },
        { label: '2. Thứ nhất - Thể thơ (Gọi tên + Nêu tác dụng):', placeholder: 'Thứ nhất, thể thơ [gọi tên thể thơ, vần nhịp] có tác dụng tạo âm hưởng...' },
        { label: '3. Thứ hai - Hình ảnh (Nhận xét chung + Dẫn chứng + Phân tích):', placeholder: 'Thứ hai, hệ thống hình ảnh [nhận xét + dẫn chứng “...” + phân tích]...' },
        { label: '4. Thứ ba - Từ ngữ (Nhận xét chung + Dẫn chứng từ ngữ hay + Phân tích):', placeholder: 'Thứ ba, cách dùng từ ngữ [nhận xét + dẫn chứng từ láy/động từ mạnh “...” + phân tích]...' },
        { label: '5. Thứ tư - Biện pháp tu từ (Nhận xét + Dẫn chứng + Phân tích):', placeholder: 'Thứ tư, biện pháp tu từ [ẩn dụ/nhân hóa/điệp...] qua câu thơ “...” đã làm nổi bật...' },
        { label: '6. Đánh giá (Làm rõ chủ đề & Thông điệp tác phẩm):', placeholder: 'Các yếu tố hình thức trên đã góp phần làm rõ chủ đề [nêu chủ đề], đồng thời hỗ trợ nhà thơ chuyển tải thông điệp...' }
      ]
    },

    nlvh_doan_camxuc_tho: {
      group: 'Đoạn văn NLVH (~200 chữ)',
      name: '3. Đoạn NLVH: Phân tích, đánh giá TÌNH CẢM, CẢM XÚC trong thơ',
      singleParagraph: true,
      formRule: 'Hình thức: Chỉ viết trong 1 đoạn văn, không xuống hàng (~200 chữ). Chỉ rõ từng cung bậc cảm xúc kèm dẫn chứng và phân tích.',
      formulaSteps: ['Câu dẫn + GTVĐNL', 'Cảm xúc 1 (Dẫn chứng + Phân tích)', 'Cảm xúc 2 (Dẫn chứng + Phân tích)', 'Nghệ thuật biểu đạt', 'Đánh giá triết lí nhân sinh & Phong cách'],
      referenceHtml: '',
      fields: [
        { label: '1. Mở đoạn (Câu dẫn + Giới thiệu VĐNL tình cảm, cảm xúc):', placeholder: 'Giới thiệu tác giả, bài thơ và mạch cảm xúc chủ đạo của chủ thể trữ tình...' },
        { label: '2. Phân tích Cảm xúc 1 (Gọi tên + Dẫn chứng + Phân tích):', placeholder: 'Trước hết, đoạn thơ khắc họa cung bậc cảm xúc [gọi tên + dẫn chứng “...” + phân tích]...' },
        { label: '3. Phân tích Cảm xúc 2 (Gọi tên + Dẫn chứng + Phân tích):', placeholder: 'Bên cạnh đó, mạch cảm xúc còn lắng đọng ở [gọi tên cảm xúc 2 + dẫn chứng + phân tích]...' },
        { label: '4. Nghệ thuật thể hiện cảm xúc:', placeholder: 'Mạch cảm xúc ấy được thể hiện qua thể thơ, giọng điệu, từ ngữ và hình ảnh giàu sức gợi...' },
        { label: '5. Đánh giá & Kết đoạn (Triết lí nhân sinh, Chức năng văn chương & Phong cách):', placeholder: 'Cảm xúc trong sáng, chân thành, gửi gắm triết lí nhân sinh và thông điệp... Đó phải chăng là chức năng giáo dục, nhận thức, thẩm mĩ của văn chương? Bài thơ tiêu biểu cho phong cách...' }
      ]
    },

    nlvh_doan_nt_truyen: {
      group: 'Đoạn văn NLVH (~200 chữ)',
      name: '4. Đoạn NLVH: Phân tích NGHỆ THUẬT TRUYỆN NGẮN',
      singleParagraph: true,
      formRule: 'Hình thức: Chỉ viết trong 1 đoạn văn, không xuống hàng (~200 chữ). Bám sát các yếu tố tự sự: ngôi kể, điểm nhìn, tình huống, chi tiết, ngôn ngữ, giọng điệu, tâm lí.',
      formulaSteps: ['Câu dẫn + GTVĐNL', 'Ngôi kể & Điểm nhìn', 'Tình huống truyện', 'Chi tiết nghệ thuật & Nội tâm', 'Ngôn ngữ & Giọng điệu', 'Đánh giá tài năng & Chủ đề'],
      referenceHtml: '',
      fields: [
        { label: '1. Mở đoạn (Câu dẫn + Giới thiệu VĐNL nghệ thuật truyện ngắn):', placeholder: 'Giới thiệu tác giả, tác phẩm và đặc sắc nghệ thuật tự sự của truyện ngắn...' },
        { label: '2. Ngôi kể & Điểm nhìn (Ngôi thứ mấy? Tác dụng?):', placeholder: 'Trước hết, truyện sử dụng ngôi kể thứ [nhất/ba] kết hợp điểm nhìn [bên trong/bên ngoài] giúp...' },
        { label: '3. Tình huống truyện (Tình huống gì? Phân tích & Tác dụng?):', placeholder: 'Đặc biệt, nhà văn đã đặt nhân vật vào tình huống [nêu tình huống + tác dụng làm bộc lộ tính cách]...' },
        { label: '4. Chi tiết nghệ thuật & Miêu tả diễn biến nội tâm:', placeholder: 'Cùng với đó là chi tiết nghệ thuật đắt giá [dẫn chứng] và ngòi bút miêu tả tâm lí nhân vật tinh tế...' },
        { label: '5. Ngôn ngữ & Giọng điệu trần thuật:', placeholder: 'Ngôn ngữ truyện mộc mạc, giàu cá tính kết hợp cùng giọng điệu [trầm buồn/ấm áp/triết lí]...' },
        { label: '6. Đánh giá (Tài năng, cá tính sáng tạo & Chủ đề, thông điệp):', placeholder: 'Qua đó khẳng định tài năng, cá tính sáng tạo của nhà văn và làm nổi bật chủ đề, tư tưởng, thông điệp...' }
      ]
    },

    nlvh_doan_nhanvat: {
      group: 'Đoạn văn NLVH (~200 chữ)',
      name: '5. Đoạn NLVH: Phân tích ĐẶC ĐIỂM NHÂN VẬT',
      singleParagraph: true,
      formRule: 'Hình thức: Chỉ viết trong 1 đoạn văn, không xuống hàng (~200 chữ). Kết hợp phân tích phẩm chất (qua hành động, lời nói, thái độ) với nghệ thuật xây dựng nhân vật.',
      formulaSteps: ['Mở đoạn & Khái quát (tên, ngoại hình, hoàn cảnh)', 'Vẻ đẹp / Phẩm chất 1 (D/c + PT)', 'Vẻ đẹp / Phẩm chất 2 (D/c + PT)', 'Nghệ thuật xây dựng nhân vật', 'Đánh giá (Tiêu biểu cho tầng lớp & Thông điệp)'],
      referenceHtml: '',
      fields: [
        { label: '1. Mở đoạn & Khái quát nhân vật (Tên tuổi, ngoại hình, nghề nghiệp, hoàn cảnh):', placeholder: 'Giới thiệu tác giả, tác phẩm, nhân vật và vài nét khái quát về số phận/ngoại hình...' },
        { label: '2. Vẻ đẹp / Phẩm chất 1 (Gọi tên + Dẫn chứng hành động, lời nói, thái độ + Phân tích):', placeholder: 'Trước hết, nhân vật hiện lên với vẻ đẹp [phẩm chất 1] thể hiện qua chi tiết/lời nói “...”' },
        { label: '3. Vẻ đẹp / Phẩm chất 2 (Gọi tên + Dẫn chứng + Phân tích):', placeholder: 'Không chỉ vậy, ở nhân vật còn sáng ngời phẩm chất [phẩm chất 2] qua hành động/nội tâm “...”' },
        { label: '4. Nghệ thuật xây dựng nhân vật (Tình huống, tâm lí, ngôi kể, điểm nhìn, ngôn ngữ):', placeholder: 'Nhân vật được khắc họa sinh động qua tình huống truyện độc đáo, miêu tả tâm lí tinh tế, ngôi kể và ngôn ngữ đối thoại...' },
        { label: '5. Đánh giá (Tiêu biểu cho tầng lớp nào? Thông điệp của tác giả?):', placeholder: 'Nhân vật là hình ảnh tiêu biểu cho người lao động/con người... Qua đó nhà văn gửi gắm thông điệp nhân đạo sâu sắc...' }
      ]
    },

    // --- NHÓM 2: ĐOẠN VĂN NGHỊ LUẬN XÃ HỘI (~200 CHỮ - 1 ĐOẠN DUY NHẤT) ---
    nlxh_doan_ynghia: {
      group: 'Đoạn văn NLXH (~200 chữ)',
      name: '6. Đoạn NLXH (Định dạng 1 & 2): Ý NGHĨA / GIÁ TRỊ / TẦM QUAN TRỌNG của một vấn đề',
      singleParagraph: true,
      formRule: 'Hình thức: Chỉ viết trong 1 đoạn văn, không xuống hàng (~200 chữ). Nếu đề gắn với phần Đọc hiểu: nêu 1–2 câu về vấn đề xã hội trong phần đọc hiểu trước. Bàn luận phải đưa ra 3 luận điểm kèm dẫn chứng.',
      formulaSteps: ['Mở đoạn', 'Giải thích (1 câu)', 'Thứ nhất: Mở rộng hiểu biết, bản lĩnh, nhân cách', 'Thứ hai: Thành công, tín nhiệm, hạnh phúc', 'Thứ ba: Đối với xã hội', 'Dẫn chứng thực tế', 'Bài học & Kết đoạn'],
      referenceHtml: '',
      fields: [
        { label: '1. Mở đoạn (Nêu VĐNL; nếu từ Đọc hiểu thì dẫn 1-2 câu từ văn bản):', placeholder: 'Từ văn bản đọc hiểu / Trong hành trình sống, [vấn đề A] đóng vai trò vô cùng quan trọng...' },
        { label: '2. Giải thích (1 câu ngắn gọn):', placeholder: 'Hiểu một cách giản dị, [vấn đề A] chính là...' },
        { label: '3. Luận điểm 1 - Đối với bản lĩnh & nhân cách (+ 1-2 câu lí giải):', placeholder: 'Thứ nhất, [A] giúp ta mở rộng hiểu biết, rèn ý chí, bản lĩnh và hoàn thiện nhân cách bởi...' },
        { label: '4. Luận điểm 2 - Đối với thành công & hạnh phúc (+ 1-2 câu lí giải):', placeholder: 'Thứ hai, [A] còn giúp ta thành công hơn, nhận được sự tin tưởng, tín nhiệm và mang lại bình an, hạnh phúc...' },
        { label: '5. Luận điểm 3 - Đối với cộng đồng, xã hội (+ 1-2 câu lí giải):', placeholder: 'Thứ ba, đối với xã hội, [A] góp phần cải thiện chất lượng sống, làm cho cộng đồng tốt đẹp, văn minh hơn...' },
        { label: '6. Dẫn chứng thực tế tiêu biểu:', placeholder: 'Thực tế đã chứng minh qua tấm gương của...' },
        { label: '7. Bài học nhận thức, hành động & Kết đoạn:', placeholder: 'Vì vậy, mỗi người trẻ chúng ta cần nhận thức sâu sắc và rèn luyện [A] mỗi ngày để...' }
      ]
    },

    nlxh_doan_giaiphap: {
      group: 'Đoạn văn NLXH (~200 chữ)',
      name: '7. Đoạn NLXH (Định dạng 3): CÁCH THỨC / GIẢI PHÁP / TRÁCH NHIỆM của tuổi trẻ',
      singleParagraph: true,
      formRule: 'Hình thức: Chỉ viết trong 1 đoạn văn, không xuống hàng (~200 chữ). Bàn luận 3 luận điểm giải pháp theo 3 cấp độ: Cá nhân ➔ Gia đình, nhà trường ➔ Cộng đồng, xã hội + Dẫn chứng.',
      formulaSteps: ['Mở đoạn', 'Giải thích (1 câu)', 'Thứ nhất: Đối với cá nhân (Nhận thức, kĩ năng, thái độ, hành động)', 'Thứ hai: Gia đình, nhà trường', 'Thứ ba: Cộng đồng, xã hội', 'Dẫn chứng', 'Bài học & Kết đoạn'],
      referenceHtml: '',
      fields: [
        { label: '1. Mở đoạn (Nêu vấn đề trách nhiệm / giải pháp của tuổi trẻ):', placeholder: 'Trước yêu cầu của thời đại mới, việc tìm ra giải pháp / phát huy trách nhiệm của tuổi trẻ trong [vấn đề A] là vô cùng cấp thiết...' },
        { label: '2. Giải thích (1 câu ngắn gọn):', placeholder: 'Hiểu một cách cốt lõi, [vấn đề A] là...' },
        { label: '3. Giải pháp 1 - Đối với cá nhân (Nhận thức, kĩ năng, thói quen, thái độ & hành động):', placeholder: 'Thứ nhất, đối với cá nhân, cần nâng cao nhận thức (điều chỉnh quan điểm, tư duy), rèn luyện kĩ năng..., chủ động học hỏi; bên cạnh đó cần có thái độ tích cực và hành động cụ thể như...' },
        { label: '4. Giải pháp 2 - Đối với gia đình, nhà trường:', placeholder: 'Thứ hai, đối với gia đình và nhà trường, cần tăng cường giáo dục, thấu hiểu, lắng nghe và đồng hành định hướng...' },
        { label: '5. Giải pháp 3 - Đối với cộng đồng, xã hội:', placeholder: 'Thứ ba, đối với cộng đồng và xã hội, cần xây dựng chính sách thiết thực, tổ chức sự kiện và đẩy mạnh truyền thông...' },
        { label: '6. Dẫn chứng thực tế:', placeholder: 'Minh chứng tiêu biểu là những người trẻ / chương trình... đã góp phần...' },
        { label: '7. Bài học nhận thức, hành động & Kết đoạn:', placeholder: 'Khép lại, mỗi người trẻ hãy bắt đầu từ những hành động nhỏ nhất ngay hôm nay để...' }
      ]
    },

    // --- NHÓM 3: BÀI VĂN NGHỊ LUẬN VĂN HỌC (~600 CHỮ - CHIA NHIỀU ĐOẠN) ---
    nlvh_bai_1tacpham: {
      group: 'Bài văn NLVH (~600 chữ)',
      name: '8. Bài NLVH (Dạng 1): Phân tích, đánh giá nội dung, chủ đề & nghệ thuật MỘT tác phẩm Thơ/Truyện',
      singleParagraph: false,
      formRule: 'Dung lượng: Khoảng 600 chữ (chia thành nhiều đoạn). Luôn nhớ 2 bước: Bước 1: Phân tích (Gọi tên yếu tố + nêu dẫn chứng + phân tích tác dụng) ➔ Bước 2: Đánh giá (vai trò với chủ đề / thông điệp rút ra).',
      formulaSteps: ['I. Mở bài', 'II.1. Nội dung & Chủ đề (Theo đặc trưng Thơ/Truyện)', 'II.2. Hình thức Nghệ thuật (Theo đặc trưng Thơ/Truyện)', 'II.3. Đánh giá Tư tưởng & Thông điệp', 'III. Kết bài'],
      referenceHtml: `
        <div class="scaffold-ref-table-wrap">
          <table class="scaffold-ref-table">
            <thead>
              <tr>
                <th>Tiêu chí THƠ (Nội dung &amp; Hình thức)</th>
                <th>Tiêu chí TRUYỆN (Nội dung &amp; Hình thức)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>• Nội dung:</b> Đề tài, Chủ đề, Tình cảm cảm xúc – Mạch cảm xúc, Chủ thể trữ tình/Nhân vật trữ tình, Tư tưởng, Thông điệp.<br><b>• Hình thức:</b> Thể thơ, Từ ngữ, Hình ảnh, Biện pháp tu từ, Vần/nhịp, Giọng điệu.</td>
                <td><b>• Nội dung:</b> Đề tài, Chủ đề, Vẻ đẹp hình tượng nhân vật (phẩm chất, tính cách, tâm trạng...), Tư tưởng, Thông điệp.<br><b>• Hình thức:</b> Ngôi kể, Điểm nhìn, Nhan đề (gây tò mò, gợi liên tưởng, khắc sâu ý nghĩa), Tình huống truyện, Ngôn ngữ, Chi tiết tiêu biểu, Kết thúc truyện, Giọng điệu.</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      fields: [
        { label: '1. Mở bài (Trích dẫn – dẫn dắt – giới thiệu tác giả, tác phẩm & VĐNL):', placeholder: 'Giới thiệu tác giả, tác phẩm và khái quát giá trị nội dung, chủ đề, nghệ thuật...' },
        { label: '2. Thân bài - Phân tích Đề tài, Chủ đề & Mạch cảm xúc / Hình tượng nhân vật:', placeholder: 'Bước 1: Phân tích (gọi tên + dẫn chứng + tác dụng) các yếu tố nội dung chủ đề...' },
        { label: '3. Thân bài - Phân tích Hình thức Nghệ thuật đặc sắc (Thơ hoặc Truyện):', placeholder: 'Phân tích thể thơ, từ ngữ, hình ảnh, BPTT (với Thơ) hoặc ngôi kể, điểm nhìn, tình huống, chi tiết tiêu biểu, ngôn ngữ (với Truyện)...' },
        { label: '4. Thân bài - Đánh giá vai trò đối với Tư tưởng, Thông điệp & Phong cách tác giả:', placeholder: 'Bước 2: Đánh giá vai trò của nội dung và nghệ thuật trong việc thể hiện tư tưởng, thông điệp và tài năng nhà văn...' },
        { label: '5. Kết bài (Khẳng định giá trị & dư âm tác phẩm):', placeholder: 'Khẳng định lại vị trí, sức sống của tác phẩm trong lòng người đọc...' }
      ]
    },

    nlvh_bai_sosanh: {
      group: 'Bài văn NLVH (~600 chữ)',
      name: '9. Bài NLVH (Dạng 2): So sánh, đánh giá HAI đoạn trích / tác phẩm Thơ hoặc Truyện',
      singleParagraph: false,
      formRule: 'Dung lượng: Khoảng 600 chữ. Thân bài chia thành 5 mục rõ ràng: 1. Khái quát chung ➔ 2. Điểm tương đồng ➔ 3. Điểm khác biệt ➔ 4. Lí giải giống/khác nhau ➔ 5. Đánh giá chung.',
      formulaSteps: ['I. Mở bài (TP1+TG1, TP2+TG2)', 'II.1. Khái quát chung', 'II.2. Điểm tương đồng', 'II.3. Điểm khác biệt', 'II.4. Lí giải giống & khác', 'II.5. Đánh giá & III. Kết bài'],
      referenceHtml: `
        <div class="scaffold-ref-table-wrap">
          <table class="scaffold-ref-table">
            <thead>
              <tr>
                <th>Tiêu chí</th>
                <th>So sánh hai tác phẩm THƠ</th>
                <th>So sánh hai tác phẩm TRUYỆN / KÍ / KỊCH</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Nội dung</b></td>
                <td>Đề tài, chủ đề; hình tượng thơ; cảm hứng chủ đạo; tư tưởng, thông điệp.</td>
                <td>Đề tài, chủ đề; hình tượng nhân vật (kiểu nhân vật, tình cảm tác giả); tư tưởng, thông điệp; giá trị hiện thực &amp; nhân đạo.</td>
              </tr>
              <tr>
                <td><b>Hình thức</b></td>
                <td>Thể thơ, vần, nhịp; sáng tạo từ ngữ, hình ảnh, biểu tượng; chủ thể trữ tình, cấu tứ, biện pháp tu từ.</td>
                <td><b>Truyện:</b> Cốt truyện, cách xây dựng nhân vật, ngôi kể, điểm nhìn, lời kể, kết thúc...<br><b>Kịch:</b> Xung đột kịch, nhân vật hành động, lời thoại.<br><b>Kí:</b> Tính phi hư cấu, kết hợp sự kiện hiện thực với trải nghiệm.</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      fields: [
        { label: '1. I. Mở bài (Trích dẫn – dẫn dắt – TP1+TG1, TP2+TG2 – chốt tương đồng, khác biệt):', placeholder: 'Giới thiệu hai tác phẩm, hai tác giả và nêu vấn đề nghị luận (điểm tương đồng và khác biệt)...' },
        { label: '2. II.1. Khái quát chung (Thông tin tác giả, tác phẩm, hoàn cảnh sáng tác, xuất xứ):', placeholder: 'Giới thiệu ngắn gọn hoàn cảnh sáng tác, xuất xứ của hai đoạn trích/tác phẩm...' },
        { label: '3. II.2. Điểm tương đồng (Nội dung & Nghệ thuật - kèm lí lẽ và bằng chứng):', placeholder: 'Thứ nhất, hai tác phẩm gặp gỡ nhau ở đề tài, chủ đề, cảm hứng... Thứ hai...' },
        { label: '4. II.3. Điểm khác biệt (Nội dung & Hình thức thể hiện - kèm lí lẽ và bằng chứng):', placeholder: 'Về nội dung (hình tượng thơ/kiểu nhân vật)... Về hình thức (chủ thể trữ tình, từ ngữ, ngôi kể, điểm nhìn, cách xây dựng nhân vật)...' },
        { label: '5. II.4. Lí giải điểm giống, khác nhau:', placeholder: 'Hai tác phẩm có điểm giống nhau xuất phát từ việc [cùng hoàn cảnh/đề tài/quan điểm thẩm mĩ]... Và điều dẫn đến sự khác biệt là do [cá tính sáng tạo riêng, thời đại, văn hóa, đối tượng đặc thù]...' },
        { label: '6. II.5. Đánh giá ý nghĩa & III. Kết bài:', placeholder: 'Sự thống nhất trong quan điểm/thi pháp thời đại cùng sự độc đáo, đa dạng trong phong cách nghệ thuật đã làm phong phú nền văn học...' }
      ]
    },

    // --- NHÓM 4: BÀI VĂN NGHỊ LUẬN XÃ HỘI (~600 CHỮ - CHIA NHIỀU ĐOẠN) ---
    nlxh_bai_tutuong: {
      group: 'Bài văn NLXH (~600 chữ)',
      name: '10. Bài NLXH (Dạng 1): Nghị luận về một TƯ TƯỞNG ĐẠO LÍ / CÂU NÓI',
      singleParagraph: false,
      formRule: 'Dung lượng: Khoảng 600 chữ. Bàn luận phải tách thành 3 đoạn luận điểm (Ý nghĩa 1, Ý nghĩa 2, Ý nghĩa 3) kèm lí lẽ và dẫn chứng.',
      formulaSteps: ['Mở bài', 'Đoạn 1: Giải thích từ ngữ & cả câu', 'Đoạn 2, 3, 4: Bàn luận 3 Ý nghĩa + Dẫn chứng', 'Đoạn 5: Phê phán, mở rộng', 'Đoạn 6: Giải pháp, liên hệ & Kết bài'],
      referenceHtml: '',
      fields: [
        { label: '1. Mở bài & Đoạn 1 - Giải thích (Từ ngữ quan trọng, vế câu ➔ “Vậy câu này có nghĩa là...”):', placeholder: 'Dẫn dắt câu nói. Giải thích các từ khóa và rút ra ý nghĩa cả câu: “Vậy câu nói này có nghĩa là...”' },
        { label: '2. Đoạn Bàn luận - Ý nghĩa 1 (Vì sao đặt ra vấn đề? Ý nghĩa 1 + Lí lẽ & Dẫn chứng):', placeholder: 'Trước hết, tư tưởng này giúp mỗi cá nhân mở rộng nhận thức, hoàn thiện nhân cách...' },
        { label: '3. Đoạn Bàn luận - Ý nghĩa 2 & Ý nghĩa 3 (+ Lí lẽ & Dẫn chứng thực tế):', placeholder: 'Bên cạnh đó (Ý nghĩa 2)... Không những vậy, đối với cộng đồng xã hội (Ý nghĩa 3)... Dẫn chứng thực tế...' },
        { label: '4. Đoạn Phê phán, mở rộng vấn đề (Chỉ ra biểu hiện trái ngược hoặc mặt hạn chế nếu có):', placeholder: 'Tuy nhiên, trong cuộc sống vẫn còn những người... (Hoặc bổ sung góc nhìn toàn diện cho câu nói)...' },
        { label: '5. Đoạn Giải pháp, liên hệ bản thân, bài học nhận thức & hành động + Kết bài:', placeholder: 'Từ đó, mỗi người trẻ cần... Khẳng định lại giá trị bền vững của câu nói.' }
      ]
    },

    nlxh_bai_hientuong: {
      group: 'Bài văn NLXH (~600 chữ)',
      name: '11. Bài NLXH (Dạng 2): Nghị luận về một HIỆN TƯỢNG ĐỜI SỐNG',
      singleParagraph: false,
      formRule: 'Dung lượng: Khoảng 600 chữ. Triển khai theo mạch 4 bước: Giải thích + Thực trạng ➔ Nguyên nhân ➔ Tác dụng hoặc Hậu quả ➔ Giải pháp (cá nhân, cộng đồng / trước mắt, lâu dài).',
      formulaSteps: ['Mở bài', 'Đoạn 1: Giải thích + Thực trạng', 'Đoạn 2: Nguyên nhân', 'Đoạn 3: Tác dụng / Hậu quả + D/c', 'Đoạn 4: Giải pháp (Cá nhân, cộng đồng, trước mắt, lâu dài) & Kết bài'],
      referenceHtml: '',
      fields: [
        { label: '1. Mở bài & Đoạn 1 - Giải thích + Thực trạng hiện nay:', placeholder: 'Giới thiệu hiện tượng đời sống. Giải thích bản chất và nêu bức tranh thực trạng, biểu hiện cụ thể...' },
        { label: '2. Đoạn 2 - Nguyên nhân (Chủ quan & Khách quan):', placeholder: 'Hiện tượng trên xuất phát từ nguyên nhân chủ quan (ý thức cá nhân) và khách quan (gia đình, nhà trường, xã hội)...' },
        { label: '3. Đoạn 3 - Tác dụng (Ý nghĩa) hoặc Hậu quả (Tác hại) + Dẫn chứng:', placeholder: 'Phân tích những tác động sâu sắc đối với cá nhân và cộng đồng kèm dẫn chứng thực tế...' },
        { label: '4. Đoạn 4 - Giải pháp (Cá nhân, cộng đồng / Trước mắt, lâu dài) & Kết bài:', placeholder: 'Để phát huy/khắc phục hiện tượng này, về phía cá nhân... về phía cộng đồng... (giải pháp trước mắt và lâu dài)...' }
      ]
    },

    nlxh_bai_vdxh_tpvh: {
      group: 'Bài văn NLXH (~600 chữ)',
      name: '12. Bài NLXH (Dạng 3): Nghị luận về một VẤN ĐỀ XÃ HỘI đặt ra trong tác phẩm văn học',
      singleParagraph: false,
      formRule: 'Dung lượng: Khoảng 600 chữ. Kết nối từ biểu hiện của vấn đề xã hội trong tác phẩm văn học (dẫn chứng) ra đời sống xã hội (3 luận điểm Ý nghĩa + Phê phán + Giải pháp).',
      formulaSteps: ['Mở bài', 'Đoạn 1: Giải thích + Biểu hiện trong TP văn học & Xã hội', 'Đoạn 2, 3, 4: Bàn luận 3 Ý nghĩa + Dẫn chứng đời sống', 'Đoạn 5: Phê phán, mở rộng', 'Đoạn 6: Giải pháp, bài học & Kết bài'],
      referenceHtml: '',
      fields: [
        { label: '1. Mở bài & Đoạn 1 - Giải thích + Biểu hiện VĐXH trong tác phẩm văn học (d/c) & Xã hội:', placeholder: 'Giới thiệu tác phẩm văn học và vấn đề xã hội đặt ra. Giải thích vấn đề và chỉ ra biểu hiện trong tác phẩm + ngoài đời thực...' },
        { label: '2. Đoạn Bàn luận - Vì sao đặt ra vấn đề? Ý nghĩa 1 & Ý nghĩa 2:', placeholder: 'Bước ra từ trang sách, vấn đề này mang ý nghĩa lớn lao. Thứ nhất (Ý nghĩa 1)... Thứ hai (Ý nghĩa 2)...' },
        { label: '3. Đoạn Bàn luận - Ý nghĩa 3 + Dẫn chứng thực tế đời sống:', placeholder: 'Thứ ba, đối với cộng đồng xã hội (Ý nghĩa 3)... Thực tế đời sống đã chứng minh qua...' },
        { label: '4. Đoạn Phê phán, mở rộng vấn đề:', placeholder: 'Bên cạnh đó, cần lên án/phê phán những biểu hiện lệch lạc, thờ ơ...' },
        { label: '5. Đoạn Giải pháp, liên hệ bản thân, bài học nhận thức & hành động + Kết bài:', placeholder: 'Mỗi người trẻ cần hành động thiết thực... Khẳng định giá trị nhân văn kết nối từ tác phẩm đến cuộc đời.' }
      ]
    }
  };

  function detectBestTemplateKey(text, subTypeHint, isParagraphHint) {
    if (subTypeHint && SCAFFOLD_TEMPLATES[subTypeHint]) return subTypeHint;
    const t = String(text || '').toLowerCase();

    if (t.includes('so sánh')) return 'nlvh_bai_sosanh';
    if (t.includes('hiện tượng')) return 'nlxh_bai_hientuong';
    if (t.includes('trong tác phẩm') && (t.includes('xã hội') || t.includes('cuộc sống hôm nay'))) return 'nlxh_bai_vdxh_tpvh';
    if (t.includes('giải pháp') || t.includes('làm thế nào') || t.includes('cách thức') || t.includes('trách nhiệm')) {
      return 'nlxh_doan_giaiphap';
    }
    if (t.includes('nhân vật')) return 'nlvh_doan_nhanvat';
    if (t.includes('tình cảm') || t.includes('cảm xúc') || t.includes('mạch cảm xúc')) return 'nlvh_doan_camxuc_tho';
    if (t.includes('nghệ thuật') && (t.includes('truyện') || t.includes('ngôi kể') || t.includes('tình huống'))) return 'nlvh_doan_nt_truyen';
    if (t.includes('nghệ thuật') && (t.includes('thơ') || t.includes('khổ thơ') || t.includes('đoạn thơ'))) return 'nlvh_doan_nt_tho';
    if (t.includes('chủ đề')) return 'nlvh_doan_chude';

    if (isParagraphHint || t.includes('200 chữ') || t.includes('đoạn văn')) {
      if (t.includes('thơ') || t.includes('truyện') || t.includes('tác phẩm')) return 'nlvh_doan_chude';
      return 'nlxh_doan_ynghia';
    }
    if (t.includes('600 chữ') || t.includes('bài văn')) {
      if (t.includes('thơ') || t.includes('truyện') || t.includes('tác phẩm')) return 'nlvh_bai_1tacpham';
      return 'nlxh_bai_tutuong';
    }
    return 'nlxh_doan_ynghia';
  }

  function buildTemplateSelectOptionsHtml(selectedKey) {
    return Object.entries(SCAFFOLD_TEMPLATES).map(([key, tpl]) =>
      `<option value="${key}" ${key === selectedKey ? 'selected' : ''}>[${esc(tpl.group)}] ${esc(tpl.name)}</option>`
    ).join('');
  }

  function extractSmartKeywordsFromText(text) {
    const t = String(text || '').toLowerCase();
    const kwSet = new Set();

    if (t.includes('tuổi trẻ') || t.includes('khát vọng') || t.includes('ước mơ') || t.includes('cống hiến')) {
      ['Khát vọng vươn lên', 'Lý tưởng sống đẹp', 'Dấn thân & Cống hiến', 'Nhiệt huyết thanh xuân', 'Hoàn thiện nhân cách'].forEach(k => kwSet.add(k));
    }
    if (t.includes('nhân ái') || t.includes('sẻ chia') || t.includes('yêu thương') || t.includes('thấu cảm') || t.includes('tình người')) {
      ['Sự thấu cảm', 'Tình người ấm áp', 'Sống là cho đi', 'Gắn kết cộng đồng', 'Lòng trắc ẩn'].forEach(k => kwSet.add(k));
    }
    if (t.includes('bản lĩnh') || t.includes('kiên trì') || t.includes('khó khăn') || t.includes('nghịch cảnh') || t.includes('ý chí')) {
      ['Bản lĩnh kiên cường', 'Ý chí nghị lực', 'Vượt lên nghịch cảnh', 'Mở rộng hiểu biết', 'Bình an & Hạnh phúc'].forEach(k => kwSet.add(k));
    }
    if (t.includes('thơ') || t.includes('trữ tình')) {
      ['Chủ thể trữ tình', 'Hình tượng trung tâm', 'Mạch cảm xúc', 'Nhịp điệu ngân vang', 'Biện pháp tu từ đặc sắc'].forEach(k => kwSet.add(k));
    }
    if (t.includes('truyện') || t.includes('nhân vật')) {
      ['Tình huống truyện độc đáo', 'Điểm nhìn trần thuật', 'Chi tiết nghệ thuật đắt giá', 'Diễn biến nội tâm tinh tế', 'Cá tính sáng tạo'].forEach(k => kwSet.add(k));
    }

    const defaults = [
      'Giá trị nhân văn sâu sắc',
      'Thông điệp giàu ý nghĩa',
      'Triết lí nhân sinh',
      'Bài học nhận thức & hành động',
      'Cộng đồng văn minh, tốt đẹp'
    ];
    defaults.forEach(k => {
      if (kwSet.size < 8) kwSet.add(k);
    });

    return Array.from(kwSet);
  }

  // 3A. Giàn giáo nhận thức cho câu hỏi Đọc hiểu & Đoạn văn 200 chữ
  function toggleReadingQuestionScaffolding(idx, isParagraph) {
    const box = document.getElementById(`reading-scaffold-box-${idx}`);
    if (!box) return;

    if (box.style.display !== 'none') {
      box.style.display = 'none';
      return;
    }

    awardCustomGamificationPoints(10, 'scaffolding');
    const card = document.getElementById(`card-q-${idx}`);
    const qText = card ? (card.querySelector('.reading-q-text')?.textContent || '') : '';
    const defaultTplKey = isParagraph ? detectBestTemplateKey(qText, null, true) : 'reading_short';
    renderReadingQuestionScaffoldContent(idx, defaultTplKey, qText);
    box.style.display = 'block';
  }

  function renderReadingQuestionScaffoldContent(idx, tplKey, qTextOverride) {
    const box = document.getElementById(`reading-scaffold-box-${idx}`);
    if (!box) return;
    const card = document.getElementById(`card-q-${idx}`);
    const qText = qTextOverride !== undefined ? qTextOverride : (card ? (card.querySelector('.reading-q-text')?.textContent || '') : '');
    const keywords = extractSmartKeywordsFromText(qText);

    if (tplKey === 'reading_short') {
      box.innerHTML = `
        <div class="scaffold-inner">
          <div class="scaffold-top-bar" style="flex-wrap:wrap; gap:8px;">
            <span class="scaffold-tag">💡 GIÀN GIÁO NHẬN THỨC · ĐỌC HIỂU &amp; NGHỊ LUẬN</span>
            <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
              <select class="ept-mode-select" style="max-width:290px;" onchange="renderReadingQuestionScaffoldContent(${idx}, this.value)">
                <option value="reading_short" selected>[Đọc hiểu] Công thức 3 bước trả lời câu đọc hiểu</option>
                ${buildTemplateSelectOptionsHtml('')}
              </select>
              <button type="button" class="btn gh sm" style="padding:2px 8px; font-size:12px;" onclick="document.getElementById('reading-scaffold-box-${idx}').style.display='none'">Đóng</button>
            </div>
          </div>

          <div class="scaffold-formula-banner">
            <b>📐 Công thức 3 bước trả lời Đọc hiểu đạt điểm tối đa:</b>
            <div class="scaffold-steps-pills">
              <span class="scaffold-step-pill">1. Chỉ ra trực tiếp (Gọi tên yếu tố &amp; dẫn chứng)</span> ➔
              <span class="scaffold-step-pill">2. Phân tích tác dụng nội dung</span> ➔
              <span class="scaffold-step-pill">3. Giá trị nghệ thuật / Thông điệp</span>
            </div>
          </div>

          <div class="scaffold-keywords-section">
            <div class="scaffold-lbl">🔑 Từ khóa gợi mở (Bấm để chèn nhanh vào ô trả lời):</div>
            <div class="scaffold-kw-list">
              ${keywords.map(kw => `
                <button type="button" class="scaffold-kw-chip" onclick="insertKeywordIntoReadingAnswer(${idx}, '${esc(kw)}')">+ ${esc(kw)}</button>
              `).join('')}
            </div>
          </div>

          <div class="scaffold-outline-builder">
            <div class="scaffold-lbl">🧩 Sơ đồ dàn ý trống 3 bước:</div>
            <div class="scaffold-grid-steps">
              <div class="scaffold-step-field">
                <label>Bước 1 - Gọi tên yếu tố / Chỉ ra dẫn chứng trong văn bản:</label>
                <input type="text" id="r-scaf-${idx}-s1" placeholder="Ví dụ: Biện pháp tu từ / Chi tiết thể hiện qua từ ngữ “...”">
              </div>
              <div class="scaffold-step-field">
                <label>Bước 2 - Phân tích tác dụng nội dung / cảm xúc:</label>
                <input type="text" id="r-scaf-${idx}-s2" placeholder="Ví dụ: Làm nổi bật hình ảnh / tâm trạng... của nhân vật trữ tình.">
              </div>
              <div class="scaffold-step-field">
                <label>Bước 3 - Đánh giá tác dụng nghệ thuật / Thông điệp:</label>
                <input type="text" id="r-scaf-${idx}-s3" placeholder="Ví dụ: Giúp lời văn/thơ giàu hình ảnh, nhịp điệu và gửi gắm thông điệp...">
              </div>
            </div>
            <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:10px;">
              <button type="button" class="btn au sm" onclick="assembleReadingScaffoldToTextarea(${idx}, false, 3)">
                <ion-icon name="flash-outline"></ion-icon> <span>Ghép câu trả lời vào ô làm bài</span>
              </button>
            </div>
          </div>
        </div>
      `;
      return;
    }

    const tpl = SCAFFOLD_TEMPLATES[tplKey] || SCAFFOLD_TEMPLATES.nlxh_doan_ynghia;
    box.innerHTML = `
      <div class="scaffold-inner">
        <div class="scaffold-top-bar" style="flex-wrap:wrap; gap:8px;">
          <span class="scaffold-tag">💡 ${esc(tpl.group.toUpperCase())}</span>
          <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
            <select class="ept-mode-select" style="max-width:320px;" onchange="renderReadingQuestionScaffoldContent(${idx}, this.value)">
              <option value="reading_short">[Đọc hiểu] Công thức 3 bước trả lời câu đọc hiểu</option>
              ${buildTemplateSelectOptionsHtml(tplKey)}
            </select>
            <button type="button" class="btn gh sm" style="padding:2px 8px; font-size:12px;" onclick="document.getElementById('reading-scaffold-box-${idx}').style.display='none'">Đóng</button>
          </div>
        </div>

        <div class="scaffold-formula-banner">
          <div style="margin-bottom:4px; color:#b45309; font-weight:800; font-size:12px;">📌 ${esc(tpl.formRule)}</div>
          <b>📐 Cấu trúc dàn ý chuẩn (${esc(tpl.name)}):</b>
          <div class="scaffold-steps-pills">
            ${tpl.formulaSteps.map(st => `<span class="scaffold-step-pill">${esc(st)}</span>`).join(' ➔ ')}
          </div>
        </div>

        ${tpl.referenceHtml || ''}

        <div class="scaffold-keywords-section">
          <div class="scaffold-lbl">🔑 Từ khóa gợi mở (Bấm vào để chèn nhanh vào bài viết):</div>
          <div class="scaffold-kw-list">
            ${keywords.map(kw => `
              <button type="button" class="scaffold-kw-chip" onclick="insertKeywordIntoReadingAnswer(${idx}, '${esc(kw)}')">+ ${esc(kw)}</button>
            `).join('')}
          </div>
        </div>

        <div class="scaffold-outline-builder">
          <div class="scaffold-lbl">🧩 Sơ đồ dàn ý trống tự điền (Điền các bước rồi bấm Ghép vào ô làm bài):</div>
          <div class="scaffold-grid-steps">
            ${tpl.fields.map((f, fIdx) => `
              <div class="scaffold-step-field">
                <label>${esc(f.label)}</label>
                <input type="text" id="r-scaf-${idx}-s${fIdx + 1}" placeholder="${esc(f.placeholder)}">
              </div>
            `).join('')}
          </div>
          <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:10px;">
            <button type="button" class="btn au sm" onclick="assembleReadingScaffoldToTextarea(${idx}, ${tpl.singleParagraph ? 'true' : 'false'}, ${tpl.fields.length})">
              <ion-icon name="flash-outline"></ion-icon> <span>Ghép dàn ý thành ${tpl.singleParagraph ? '1 đoạn văn (không xuống dòng)' : 'bài viết'} đưa vào ô làm bài</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function insertKeywordIntoReadingAnswer(idx, kw) {
    const tx = document.getElementById(`reading-q-textarea-${idx}`);
    if (!tx) return;
    const cur = tx.value;
    tx.value = cur ? `${cur.trim()} ${kw}` : kw;
    tx.dispatchEvent(new Event('input', { bubbles: true }));
    tx.focus();
    toast(`Đã chèn từ khóa: "${kw}"`, 'ok');
  }

  function assembleReadingScaffoldToTextarea(idx, isSingleParagraph, stepsCount = 7) {
    const tx = document.getElementById(`reading-q-textarea-${idx}`);
    if (!tx) return;

    const parts = [];
    for (let i = 1; i <= stepsCount; i++) {
      const inp = document.getElementById(`r-scaf-${idx}-s${i}`);
      const val = inp ? inp.value.trim() : '';
      if (val) {
        parts.push(/[.!?]$/.test(val) ? val : val + '.');
      }
    }

    if (!parts.length) {
      toast('Hãy điền ít nhất 1 ý vào sơ đồ dàn ý trống trước khi ghép nhé!', 'bad');
      return;
    }

    const joined = isSingleParagraph ? parts.join(' ') : parts.map(p => '- ' + p).join('\n');
    tx.value = tx.value.trim() ? (isSingleParagraph ? `${tx.value.trim()} ${joined}` : `${tx.value.trim()}\n${joined}`) : joined;
    tx.dispatchEvent(new Event('input', { bubbles: true }));
    tx.focus();
    toast('✨ Đã ghép dàn ý vào ô làm bài! Bạn hãy hoàn thiện thêm câu chữ cho thật mượt mà nhé.', 'ok');
  }

  // 3B. Giàn giáo nhận thức cho Luyện viết (Toàn bài & Từng đoạn theo đúng 12 dạng bài)
  let activeWritingTemplateKey = 'nlxh_doan_ynghia';

  function initWritingScaffoldingAndTimer() {
    const panel = document.getElementById('writing-scaffolding-panel');
    if (panel) panel.style.display = 'none';

    const curSet = typeof currentWritingSet !== 'undefined' ? currentWritingSet : null;
    const promptText = curSet ? `${curSet.title || ''} ${curSet.prompt || ''}` : '';
    activeWritingTemplateKey = detectBestTemplateKey(promptText, curSet && curSet.subType, curSet && curSet.category && curSet.category.startsWith('doan-'));

    renderWritingMainScaffoldingBody(activeWritingTemplateKey);
    initWritingPressureTimerUI(curSet);
  }

  function toggleWritingScaffoldingPanel() {
    const panel = document.getElementById('writing-scaffolding-panel');
    if (!panel) return;
    if (panel.style.display === 'none') {
      renderWritingMainScaffoldingBody(activeWritingTemplateKey);
      panel.style.display = 'block';
      awardCustomGamificationPoints(10, 'scaffolding');
    } else {
      panel.style.display = 'none';
    }
  }

  function renderWritingMainScaffoldingBody(selectedKey) {
    const body = document.getElementById('writing-scaffolding-body');
    if (!body) return;
    if (selectedKey && SCAFFOLD_TEMPLATES[selectedKey]) {
      activeWritingTemplateKey = selectedKey;
    }
    const tpl = SCAFFOLD_TEMPLATES[activeWritingTemplateKey] || SCAFFOLD_TEMPLATES.nlxh_doan_ynghia;
    const promptText = document.getElementById('workspace-prompt-text')?.textContent || '';
    const keywords = extractSmartKeywordsFromText(promptText);
    const connectors = [
      'Thứ nhất,',
      'Thứ hai,',
      'Thứ ba,',
      'Thứ tư,',
      'Bên cạnh đó,',
      'Thực tế đã chứng minh',
      'Nhìn từ góc độ ngược lại,',
      'Qua đó, tác giả gửi gắm thông điệp'
    ];

    body.innerHTML = `
      <div style="margin-bottom:10px;">
        <label class="scaffold-lbl" for="writing-main-tpl-select">📂 Chọn đúng Dạng bài Nghị luận (Theo tài liệu phương pháp):</label>
        <select id="writing-main-tpl-select" class="qa-select" style="font-weight:700; font-size:12.5px;" onchange="renderWritingMainScaffoldingBody(this.value)">
          ${buildTemplateSelectOptionsHtml(activeWritingTemplateKey)}
        </select>
      </div>

      <div class="scaffold-formula-banner">
        <div style="margin-bottom:4px; color:#b45309; font-weight:800; font-size:12px;">📌 ${esc(tpl.formRule)}</div>
        <b>📐 Quy trình các bước triển khai:</b>
        <div class="scaffold-steps-pills">
          ${tpl.formulaSteps.map(st => `<span class="scaffold-step-pill">${esc(st)}</span>`).join(' ➔ ')}
        </div>
      </div>

      ${tpl.referenceHtml || ''}

      <div class="scaffold-keywords-section">
        <div class="scaffold-lbl">🔑 Từ khóa gợi ý theo đề (Bấm để chèn vào phần đang viết):</div>
        <div class="scaffold-kw-list">
          ${keywords.map(kw => `
            <button type="button" class="scaffold-kw-chip" onclick="insertTextIntoActiveWritingSection('${esc(kw)}')">+ ${esc(kw)}</button>
          `).join('')}
        </div>
      </div>

      <div class="scaffold-keywords-section" style="margin-top:8px;">
        <div class="scaffold-lbl">🔗 Cụm từ dẫn luận điểm chuẩn theo tài liệu:</div>
        <div class="scaffold-kw-list">
          ${connectors.map(c => `
            <button type="button" class="scaffold-kw-chip connector" onclick="insertTextIntoActiveWritingSection('${esc(c)} ')">+ ${esc(c)}...</button>
          `).join('')}
        </div>
      </div>
    `;
  }

  function toggleWritingSectionScaffolding(secId, idx) {
    const box = document.getElementById(`writing-sec-scaffold-${secId}`);
    if (!box) return;

    if (box.style.display !== 'none') {
      box.style.display = 'none';
      return;
    }

    awardCustomGamificationPoints(10, 'scaffolding');
    renderWritingSectionScaffoldingContent(secId, idx, activeWritingTemplateKey);
    box.style.display = 'block';
  }

  function renderWritingSectionScaffoldingContent(secId, idx, tplKey) {
    const box = document.getElementById(`writing-sec-scaffold-${secId}`);
    if (!box) return;
    if (tplKey && SCAFFOLD_TEMPLATES[tplKey]) {
      activeWritingTemplateKey = tplKey;
    }
    const tpl = SCAFFOLD_TEMPLATES[activeWritingTemplateKey] || SCAFFOLD_TEMPLATES.nlxh_doan_ynghia;
    const promptText = document.getElementById('workspace-prompt-text')?.textContent || '';
    const keywords = extractSmartKeywordsFromText(promptText);

    box.innerHTML = `
      <div class="scaffold-inner">
        <div class="scaffold-top-bar" style="flex-wrap:wrap; gap:8px;">
          <span class="scaffold-tag">💡 SƠ ĐỒ DÀN Ý: ${esc(tpl.name)}</span>
          <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
            <select class="ept-mode-select" style="max-width:290px;" onchange="renderWritingSectionScaffoldingContent('${esc(secId)}', ${idx}, this.value)">
              ${buildTemplateSelectOptionsHtml(activeWritingTemplateKey)}
            </select>
            <button type="button" class="btn gh sm" style="padding:2px 8px; font-size:12px;" onclick="document.getElementById('writing-sec-scaffold-${secId}').style.display='none'">Đóng</button>
          </div>
        </div>

        <div class="scaffold-formula-banner">
          <div style="margin-bottom:4px; color:#b45309; font-weight:800; font-size:12px;">📌 ${esc(tpl.formRule)}</div>
          <div class="scaffold-steps-pills">
            ${tpl.formulaSteps.map(st => `<span class="scaffold-step-pill">${esc(st)}</span>`).join(' ➔ ')}
          </div>
        </div>

        ${tpl.referenceHtml || ''}

        <div class="scaffold-keywords-section">
          <div class="scaffold-lbl">🔑 Từ khóa gợi ý nhanh (Bấm để chèn vào đoạn này):</div>
          <div class="scaffold-kw-list">
            ${keywords.map(kw => `
              <button type="button" class="scaffold-kw-chip" onclick="insertTextIntoSpecificWritingSection('${esc(secId)}', '${esc(kw)}')">+ ${esc(kw)}</button>
            `).join('')}
          </div>
        </div>

        <div class="scaffold-outline-builder">
          <div class="scaffold-lbl">🧩 Điền từng bước theo công thức để tự động ghép vào bài viết:</div>
          <div class="scaffold-grid-steps">
            ${tpl.fields.map((f, fIdx) => `
              <div class="scaffold-step-field">
                <label>${esc(f.label)}</label>
                <input type="text" id="w-scaf-${secId}-s${fIdx + 1}" placeholder="${esc(f.placeholder)}">
              </div>
            `).join('')}
          </div>
          <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:10px;">
            <button type="button" class="btn au sm" onclick="assembleWritingSectionScaffold('${esc(secId)}', ${tpl.singleParagraph ? 'true' : 'false'}, ${tpl.fields.length})">
              <ion-icon name="flash-outline"></ion-icon> <span>Ghép dàn ý thành ${tpl.singleParagraph ? '1 đoạn văn (không xuống dòng)' : 'các đoạn văn'}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function insertTextIntoSpecificWritingSection(secId, text) {
    const tx = document.getElementById(`sec-input-${secId}`);
    if (!tx) return;
    tx.value = tx.value ? `${tx.value.trim()} ${text}` : text;
    if (typeof onSectionInput === 'function') onSectionInput(secId, tx);
    tx.focus();
    toast(`Đã chèn: "${text}"`, 'ok');
  }

  function insertTextIntoActiveWritingSection(text) {
    const allTx = document.querySelectorAll('.writing-textarea');
    if (!allTx.length) return;
    const tx = document.activeElement && document.activeElement.classList.contains('writing-textarea')
      ? document.activeElement
      : allTx[0];
    const secId = tx.id.replace('sec-input-', '');
    insertTextIntoSpecificWritingSection(secId, text);
  }

  function assembleWritingSectionScaffold(secId, isSingleParagraph = true, stepsCount = 7) {
    const tx = document.getElementById(`sec-input-${secId}`);
    if (!tx) return;
    const parts = [];
    for (let i = 1; i <= stepsCount; i++) {
      const inp = document.getElementById(`w-scaf-${secId}-s${i}`);
      const val = inp ? inp.value.trim() : '';
      if (val) {
        parts.push(/[.!?]$/.test(val) ? val : val + '.');
      }
    }
    if (!parts.length) {
      toast('Hãy điền ít nhất 1 ý vào sơ đồ dàn ý trước khi ghép nhé!', 'bad');
      return;
    }
    const separator = isSingleParagraph ? ' ' : '\n\n';
    const compiled = parts.join(separator);
    tx.value = tx.value.trim()
      ? (isSingleParagraph ? `${tx.value.trim()} ${compiled}` : `${tx.value.trim()}\n\n${compiled}`)
      : compiled;
    if (typeof onSectionInput === 'function') onSectionInput(secId, tx);
    tx.focus();
    toast(isSingleParagraph ? '✨ Đã ghép thành 1 đoạn văn liền mạch (không xuống dòng)!' : '✨ Đã ghép dàn ý thành các đoạn văn trong bài viết!', 'ok');
  }


  // =========================================================================
  // PHẦN 4: BỘ ĐẾM THỜI GIAN (TIMER) RÈN ÁP LỰC PHÒNG THI
  // =========================================================================
  let readingTimerInterval = null;
  let readingTimerRunning = false;
  let readingTimerModeMinutes = 20;
  let readingTimerSecondsLeft = 20 * 60;
  let readingTimerElapsed = 0;

  function initReadingPressureTimer() {
    stopReadingPressureTimer();
    const sel = document.getElementById('reading-timer-preset');
    const mins = sel ? parseInt(sel.value, 10) : 20;
    readingTimerModeMinutes = isNaN(mins) ? 20 : mins;
    readingTimerSecondsLeft = readingTimerModeMinutes * 60;
    readingTimerElapsed = 0;
    updateReadingTimerClockUI();
  }

  function setReadingPressureTimer(minutesVal) {
    stopReadingPressureTimer();
    const mins = parseInt(minutesVal, 10) || 0;
    readingTimerModeMinutes = mins;
    readingTimerSecondsLeft = mins * 60;
    readingTimerElapsed = 0;
    updateReadingTimerClockUI();
    if (mins > 0) {
      startReadingPressureTimer();
      toast(`⏱️ Đã bật chế độ rèn áp lực phòng thi: ${mins} phút!`, 'ok');
    } else {
      toast('⏱️ Đã chuyển sang chế độ đếm xuôi tự do.', 'ok');
    }
  }

  function startReadingPressureTimer() {
    stopReadingPressureTimer();
    readingTimerRunning = true;
    const toggleBtn = document.getElementById('reading-timer-toggle-btn');
    if (toggleBtn) toggleBtn.textContent = '⏸';

    readingTimerInterval = setInterval(() => {
      readingTimerElapsed++;
      if (readingTimerModeMinutes > 0) {
        if (readingTimerSecondsLeft > 0) {
          readingTimerSecondsLeft--;
          updateReadingTimerClockUI();
          if (readingTimerSecondsLeft === 300) {
            toast('⚠️ Còn 5 phút làm bài! Hãy rà soát lại các câu trả lời và đoạn văn 200 chữ.', 'bad');
          } else if (readingTimerSecondsLeft === 60) {
            toast('🔥 Chỉ còn 1 phút cuối cùng! Hãy hoàn thành câu kết đoạn.', 'bad');
          }
        } else {
          stopReadingPressureTimer();
          if (typeof playSound === 'function') playSound('wrong');
          toast('⏰ HẾT GIỜ LÀM BÀI! Bạn đã hoàn thành phiên rèn áp lực phòng thi.', 'bad');
        }
      } else {
        updateReadingTimerClockUI();
      }
    }, 1000);
  }

  function stopReadingPressureTimer() {
    readingTimerRunning = false;
    if (readingTimerInterval) {
      clearInterval(readingTimerInterval);
      readingTimerInterval = null;
    }
    const toggleBtn = document.getElementById('reading-timer-toggle-btn');
    if (toggleBtn) toggleBtn.textContent = '▶️';
  }

  function toggleReadingPressureTimer() {
    if (readingTimerRunning) {
      stopReadingPressureTimer();
    } else {
      startReadingPressureTimer();
    }
  }

  function resetReadingPressureTimer() {
    stopReadingPressureTimer();
    readingTimerSecondsLeft = readingTimerModeMinutes * 60;
    readingTimerElapsed = 0;
    updateReadingTimerClockUI();
    toast('↺ Đã đặt lại đồng hồ làm bài.', 'ok');
  }

  function updateReadingTimerClockUI() {
    const clockEl = document.getElementById('reading-timer-clock');
    const widget = document.getElementById('reading-pressure-timer-widget');
    if (!clockEl) return;

    const secsToShow = readingTimerModeMinutes > 0 ? readingTimerSecondsLeft : readingTimerElapsed;
    const m = Math.floor(secsToShow / 60);
    const s = secsToShow % 60;
    clockEl.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

    if (widget) {
      widget.classList.remove('timer-warn', 'timer-danger');
      if (readingTimerModeMinutes > 0) {
        if (readingTimerSecondsLeft <= 60) widget.classList.add('timer-danger');
        else if (readingTimerSecondsLeft <= 300) widget.classList.add('timer-warn');
      }
    }
  }

  // 4B. Chế độ Đếm ngược rèn áp lực phòng thi cho Luyện viết
  let writingPressureMinutes = 0;
  let writingCountdownNotified5m = false;
  let writingCountdownNotified1m = false;
  let writingCountdownEnded = false;

  function initWritingPressureTimerUI(curSet) {
    // Tự động gợi ý 20 phút cho Đoạn văn 200 chữ, 60 phút cho Bài văn 600 chữ
    const isDoan200 = curSet && String(curSet.category || '').startsWith('doan-');
    const isBai600 = curSet && String(curSet.category || '').startsWith('bai-');
    writingPressureMinutes = isDoan200 ? 20 : (isBai600 ? 60 : 0);
    writingCountdownNotified5m = false;
    writingCountdownNotified1m = false;
    writingCountdownEnded = false;
    const sel = document.getElementById('writing-timer-preset');
    if (sel) sel.value = String(writingPressureMinutes);
    const box = document.getElementById('writing-timer-box');
    if (box) box.classList.remove('timer-warn', 'timer-danger');
  }

  function setWritingPressureMode(minutesVal) {
    const mins = parseInt(minutesVal, 10) || 0;
    writingPressureMinutes = mins;
    writingCountdownNotified5m = false;
    writingCountdownNotified1m = false;
    writingCountdownEnded = false;

    if (typeof writingTimerSeconds !== 'undefined') {
      writingTimerSeconds = 0;
    }
    if (typeof startWritingTimer === 'function') {
      startWritingTimer();
    }
    refreshWritingPressureDisplay();

    if (mins > 0) {
      toast(`⏱️ Đã bật đồng hồ đếm ngược ${mins} phút rèn áp lực phòng thi!`, 'ok');
    } else {
      toast('⏱️ Đã chuyển sang chế độ đếm thời gian tự do.', 'ok');
    }
  }

  function resetWritingPressureTimer() {
    if (typeof writingTimerSeconds !== 'undefined') {
      writingTimerSeconds = 0;
    }
    writingCountdownNotified5m = false;
    writingCountdownNotified1m = false;
    writingCountdownEnded = false;
    refreshWritingPressureDisplay();
    toast('↺ Đã đặt lại đồng hồ luyện viết!', 'ok');
  }

  function refreshWritingPressureDisplay() {
    const display = document.getElementById('workspace-timer-display');
    const box = document.getElementById('writing-timer-box');
    if (!display) return;

    const elapsed = typeof writingTimerSeconds !== 'undefined' ? writingTimerSeconds : 0;
    if (writingPressureMinutes > 0) {
      const totalAllowed = writingPressureMinutes * 60;
      const remaining = Math.max(0, totalAllowed - elapsed);
      const h = Math.floor(remaining / 3600);
      const m = Math.floor((remaining % 3600) / 60);
      const s = remaining % 60;
      const pad = n => String(n).padStart(2, '0');
      display.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;

      if (box) {
        box.classList.remove('timer-warn', 'timer-danger');
        if (remaining <= 60) box.classList.add('timer-danger');
        else if (remaining <= 300) box.classList.add('timer-warn');
      }

      if (remaining === 300 && !writingCountdownNotified5m) {
        writingCountdownNotified5m = true;
        toast('⚠️ Còn 5 phút làm bài viết! Hãy khẩn trương hoàn thiện phần Kết.', 'bad');
      } else if (remaining === 60 && !writingCountdownNotified1m) {
        writingCountdownNotified1m = true;
        toast('🔥 Còn 1 phút cuối cùng! Hãy kiểm tra lại chính tả và chuẩn bị nộp bài.', 'bad');
      } else if (remaining === 0 && !writingCountdownEnded) {
        writingCountdownEnded = true;
        if (typeof stopWritingTimer === 'function') stopWritingTimer();
        if (typeof playSound === 'function') playSound('wrong');
        toast('⏰ ĐÃ HẾT THỜI GIAN LÀM BÀI! Hãy nộp bài để ghi nhận kết quả rèn luyện.', 'bad');
      }
    } else {
      if (box) box.classList.remove('timer-warn', 'timer-danger');
      if (typeof formatSeconds === 'function') {
        display.textContent = formatSeconds(elapsed);
      }
    }
  }

  const origUpdateTimerDisplay = global.updateTimerDisplay;
  global.updateTimerDisplay = function() {
    if (writingPressureMinutes > 0) {
      refreshWritingPressureDisplay();
    } else if (typeof origUpdateTimerDisplay === 'function') {
      origUpdateTimerDisplay();
    }
  };


  // =========================================================================
  // PHẦN 5: NÚT "BÁO CÁO LỖI / THẮC MẮC" (ĐẨY VỀ EMAIL / GOOGLE SHEETS)
  // =========================================================================
  function getQaReports() {
    try {
      const raw = localStorage.getItem(QA_REPORTS_KEY);
      const list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (_) {
      return [];
    }
  }

  function saveQaReports(list) {
    try {
      localStorage.setItem(QA_REPORTS_KEY, JSON.stringify(list));
    } catch (_) {}
  }

  function getQaConfig() {
    try {
      const raw = localStorage.getItem(QA_CONFIG_KEY);
      return raw ? JSON.parse(raw) : { email: '', webhookUrl: '' };
    } catch (_) {
      return { email: '', webhookUrl: '' };
    }
  }

  function saveQaIntegrationConfig() {
    const email = (document.getElementById('qa-cfg-email')?.value || '').trim();
    const webhookUrl = (document.getElementById('qa-cfg-webhook')?.value || '').trim();
    try {
      localStorage.setItem(QA_CONFIG_KEY, JSON.stringify({ email, webhookUrl }));
      toast('✅ Đã lưu cấu hình Email và Google Sheets Webhook!', 'ok');
    } catch (_) {
      toast('Không thể lưu cấu hình.', 'bad');
    }
  }

  function detectCurrentStudyContext() {
    const scr = typeof currentScreen !== 'undefined' ? currentScreen : 'home';
    const mapNames = {
      home: 'Trang chủ',
      setup: 'Chọn bài học Trắc nghiệm',
      game: 'Đang làm bài Trắc nghiệm',
      res: 'Màn hình Kết quả Trắc nghiệm',
      reading: 'Luyện Đọc hiểu Ngữ văn',
      writing: 'Luyện Viết văn',
      lib: 'Thư viện Học liệu',
      history: 'Lịch sử Bài làm & Chấm điểm'
    };
    let label = mapNames[scr] || 'Trang chủ';

    if (scr === 'reading') {
      const rTitle = document.getElementById('reading-workspace-set-title')?.textContent;
      const rView = document.getElementById('reading-workspace-view');
      if (rView && rView.style.display !== 'none' && rTitle) {
        label = `Đọc hiểu: ${rTitle}`;
      }
    } else if (scr === 'writing') {
      const wTitle = document.getElementById('workspace-set-title')?.textContent;
      const wView = document.getElementById('writing-workspace-view');
      if (wView && wView.style.display !== 'none' && wTitle) {
        label = `Luyện viết: ${wTitle}`;
      }
    } else if (scr === 'game' && typeof G !== 'undefined' && G && G.s) {
      label = `Trắc nghiệm: ${G.s.title || 'Bộ đề'} (Câu ${(G.i || 0) + 1})`;
    }
    return label;
  }

  function openQaReportModal() {
    const dlg = document.getElementById('qa-report-dialog');
    if (!dlg) return;

    const ctxLabel = document.getElementById('qa-current-context-label');
    if (ctxLabel) ctxLabel.textContent = detectCurrentStudyContext();

    const nameInp = document.getElementById('qa-student-name');
    const classInp = document.getElementById('qa-student-class');
    if (nameInp && !nameInp.value.trim()) {
      nameInp.value = localStorage.getItem('vq_player_nick') || '';
    }
    if (classInp && !classInp.value.trim()) {
      classInp.value = localStorage.getItem('vq_player_class') || '';
    }

    const cfg = getQaConfig();
    const cfgEmail = document.getElementById('qa-cfg-email');
    const cfgWebhook = document.getElementById('qa-cfg-webhook');
    if (cfgEmail) cfgEmail.value = cfg.email || '';
    if (cfgWebhook) cfgWebhook.value = cfg.webhookUrl || '';

    updateQaCountBadge();
    switchQaModalTab('form');
    dlg.showModal();
  }

  function closeQaReportModal() {
    const dlg = document.getElementById('qa-report-dialog');
    if (dlg && dlg.open) dlg.close();
  }

  function switchQaModalTab(tab) {
    ['form', 'list', 'config'].forEach(t => {
      const pane = document.getElementById(`qa-pane-${t}`);
      const btn = document.getElementById(`qa-tab-btn-${t}`);
      if (pane) pane.style.display = t === tab ? 'block' : 'none';
      if (btn) btn.classList.toggle('active', t === tab);
    });
    if (tab === 'list') {
      renderQaReportsList();
    }
  }

  function fillQuickQaTemplate(text) {
    const tx = document.getElementById('qa-message-input');
    if (!tx) return;
    tx.value = text;
    tx.focus();
  }

  function updateQaCountBadge() {
    const badge = document.getElementById('qa-saved-count');
    if (badge) badge.textContent = getQaReports().length;
  }

  async function submitQaReportForm() {
    const name = (document.getElementById('qa-student-name')?.value || '').trim();
    const cls = (document.getElementById('qa-student-class')?.value || '').trim();
    const type = (document.getElementById('qa-issue-type')?.value || 'Thắc mắc kiến thức').trim();
    const msg = (document.getElementById('qa-message-input')?.value || '').trim();
    const context = detectCurrentStudyContext();

    if (!name) {
      toast('Vui lòng nhập họ tên của em để thầy/cô tiện giải đáp nhé!', 'bad');
      document.getElementById('qa-student-name')?.focus();
      return;
    }
    if (!msg) {
      toast('Vui lòng nhập nội dung câu hỏi hoặc lỗi cần báo cáo!', 'bad');
      document.getElementById('qa-message-input')?.focus();
      return;
    }

    try {
      localStorage.setItem('vq_player_nick', name);
      if (cls) localStorage.setItem('vq_player_class', cls);
    } catch (_) {}

    const reportItem = {
      id: 'qa_' + uid(),
      timestamp: Date.now(),
      dateStr: new Date().toLocaleString('vi-VN'),
      studentName: name,
      className: cls || 'Chưa rõ',
      issueType: type,
      context: context,
      message: msg,
      resolved: false
    };

    const list = getQaReports();
    list.unshift(reportItem);
    saveQaReports(list);
    updateQaCountBadge();

    const cfg = getQaConfig();
    if (cfg.webhookUrl && /^https?:\/\//i.test(cfg.webhookUrl)) {
      try {
        fetch(cfg.webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reportItem)
        }).catch(() => {});
      } catch (_) {}
    }

    const msgInput = document.getElementById('qa-message-input');
    if (msgInput) msgInput.value = '';

    toast('🎉 Đã gửi câu hỏi / thắc mắc thành công! Giáo viên sẽ giải đáp cho em trên lớp.', 'ok');
    switchQaModalTab('list');
  }

  function submitQaViaMailto() {
    const name = (document.getElementById('qa-student-name')?.value || '').trim() || 'Học sinh';
    const cls = (document.getElementById('qa-student-class')?.value || '').trim();
    const type = (document.getElementById('qa-issue-type')?.value || 'Thắc mắc kiến thức').trim();
    const msg = (document.getElementById('qa-message-input')?.value || '').trim();
    const context = detectCurrentStudyContext();

    if (!msg) {
      toast('Vui lòng nhập nội dung câu hỏi trước khi gửi Email!', 'bad');
      return;
    }

    const cfg = getQaConfig();
    const targetEmail = cfg.email || '';
    const subject = encodeURIComponent(`[Ngữ Văn THPT - ${type}] Câu hỏi từ ${name} (${cls || 'Lớp'})`);
    const body = encodeURIComponent(
      `Họ và tên học sinh: ${name}\n` +
      `Lớp: ${cls || 'Không ghi'}\n` +
      `Phân loại: ${type}\n` +
      `Bài học / Vị trí đang xem: ${context}\n` +
      `Thời gian gửi: ${new Date().toLocaleString('vi-VN')}\n\n` +
      `Nội dung câu hỏi / thắc mắc:\n${msg}`
    );
    window.open(`mailto:${targetEmail}?subject=${subject}&body=${body}`, '_blank');
  }

  function renderQaReportsList() {
    const container = document.getElementById('qa-reports-list-container');
    if (!container) return;
    const list = getQaReports();

    if (!list.length) {
      container.innerHTML = `
        <div style="text-align:center; padding:32px 16px; color:var(--mut);">
          <div style="font-size:36px; margin-bottom:8px;">📭</div>
          <b>Chưa có thắc mắc hoặc báo lỗi nào</b>
          <p style="font-size:12.5px; margin:4px 0 0;">Các câu hỏi do học sinh gửi sẽ hiển thị tại đây để giáo viên giải đáp trên lớp hoặc xuất ra Google Sheets.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(item => `
      <div class="qa-report-card ${item.resolved ? 'is-resolved' : ''}">
        <div class="qa-report-top">
          <div>
            <span class="qa-type-tag">${esc(item.issueType)}</span>
            <b style="margin-left:6px;">${esc(item.studentName)}</b>
            <span class="mut" style="font-size:12px;">(${esc(item.className)})</span>
          </div>
          <span class="mut" style="font-size:11.5px;">${esc(item.dateStr)}</span>
        </div>
        <div class="qa-report-ctx">📍 Vị trí: <b>${esc(item.context)}</b></div>
        <div class="qa-report-msg">${esc(item.message)}</div>
        <div class="qa-report-actions">
          <button type="button" class="btn ${item.resolved ? 'gh' : 'au'} sm" style="padding:3px 10px; font-size:12px;" onclick="toggleQaReportResolved('${item.id}')">
            ${item.resolved ? '✓ Đã giải đáp trên lớp' : 'Đánh dấu đã giải đáp'}
          </button>
          <button type="button" class="btn no sm" style="padding:3px 10px; font-size:12px;" onclick="deleteSingleQaReport('${item.id}')">
            Xóa
          </button>
        </div>
      </div>
    `).join('');
  }

  function toggleQaReportResolved(id) {
    const list = getQaReports();
    const item = list.find(x => x.id === id);
    if (!item) return;
    item.resolved = !item.resolved;
    saveQaReports(list);
    renderQaReportsList();
  }

  function deleteSingleQaReport(id) {
    let list = getQaReports().filter(x => x.id !== id);
    saveQaReports(list);
    updateQaCountBadge();
    renderQaReportsList();
  }

  function clearAllQaReports() {
    if (!confirm('Bạn có chắc muốn xóa toàn bộ danh sách câu hỏi thắc mắc không?')) return;
    saveQaReports([]);
    updateQaCountBadge();
    renderQaReportsList();
    toast('Đã xóa danh sách thắc mắc.', 'ok');
  }

  function exportQaReportsToCsv() {
    const list = getQaReports();
    if (!list.length) {
      toast('Chưa có dữ liệu câu hỏi nào để xuất file!', 'bad');
      return;
    }
    const headers = ['Thời gian', 'Họ tên học sinh', 'Lớp', 'Phân loại', 'Vị trí bài học', 'Nội dung thắc mắc', 'Trạng thái'];
    const csvRows = [
      headers.join(','),
      ...list.map(r => [
        `"${String(r.dateStr || '').replace(/"/g, '""')}"`,
        `"${String(r.studentName || '').replace(/"/g, '""')}"`,
        `"${String(r.className || '').replace(/"/g, '""')}"`,
        `"${String(r.issueType || '').replace(/"/g, '""')}"`,
        `"${String(r.context || '').replace(/"/g, '""')}"`,
        `"${String(r.message || '').replace(/"/g, '""')}"`,
        `"${r.resolved ? 'Đã giải đáp' : 'Chờ giải đáp'}"`
      ].join(','))
    ];

    const blob = new Blob(['\uFEFF' + csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `thac-mac-hoc-sinh-${getTodayDateString()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast('📊 Đã tải xuống file CSV (mở trực tiếp bằng Google Sheets hoặc Excel)!', 'ok');
  }

  function copyAppsScriptSnippet() {
    const snippet = `function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([new Date(), data.studentName, data.className, data.issueType, data.context, data.message]);
  return ContentService.createTextOutput("OK");
}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(snippet).then(() => {
        toast('📋 Đã sao chép mã Google Apps Script! Hãy dán vào Tiện ích mở rộng -> Apps Script trong Google Sheets.', 'ok');
      });
    } else {
      toast('Đã lấy mã Apps Script mẫu!', 'ok');
    }
  }


  // =========================================================================
  // KHỞI TẠO & XUẤT HÀM TOÀN CỤC (WINDOW EXPORTS)
  // =========================================================================
  function initAllEnhancements() {
    try {
      initQuoteOfTheDay();
      renderGamificationUI();
      updateQaCountBadge();
    } catch (e) {
      console.warn('Enhancements init warning:', e);
    }
  }

  global.nextQuoteOfDay = nextQuoteOfDay;
  global.copyCurrentQuoteOfDay = copyCurrentQuoteOfDay;
  global.toggleSaveCurrentQuote = toggleSaveCurrentQuote;
  global.openQuoteOfDayModal = openQuoteOfDayModal;
  global.closeQuoteOfDayModal = closeQuoteOfDayModal;
  global.renderQuoteOfDayModalBody = renderQuoteOfDayModalBody;
  global.copySpecificQuote = copySpecificQuote;

  global.openGamificationModal = openGamificationModal;
  global.closeGamificationModal = closeGamificationModal;
  global.onActivityCompletedGamification = onActivityCompletedGamification;
  global.awardCustomGamificationPoints = awardCustomGamificationPoints;
  global.renderGamificationUI = renderGamificationUI;

  global.toggleReadingQuestionScaffolding = toggleReadingQuestionScaffolding;
  global.renderReadingQuestionScaffoldContent = renderReadingQuestionScaffoldContent;
  global.insertKeywordIntoReadingAnswer = insertKeywordIntoReadingAnswer;
  global.assembleReadingScaffoldToTextarea = assembleReadingScaffoldToTextarea;

  global.initWritingScaffoldingAndTimer = initWritingScaffoldingAndTimer;
  global.toggleWritingScaffoldingPanel = toggleWritingScaffoldingPanel;
  global.renderWritingMainScaffoldingBody = renderWritingMainScaffoldingBody;
  global.toggleWritingSectionScaffolding = toggleWritingSectionScaffolding;
  global.renderWritingSectionScaffoldingContent = renderWritingSectionScaffoldingContent;
  global.insertTextIntoSpecificWritingSection = insertTextIntoSpecificWritingSection;
  global.insertTextIntoActiveWritingSection = insertTextIntoActiveWritingSection;
  global.assembleWritingSectionScaffold = assembleWritingSectionScaffold;

  global.initReadingPressureTimer = initReadingPressureTimer;
  global.setReadingPressureTimer = setReadingPressureTimer;
  global.toggleReadingPressureTimer = toggleReadingPressureTimer;
  global.resetReadingPressureTimer = resetReadingPressureTimer;

  global.setWritingPressureMode = setWritingPressureMode;
  global.resetWritingPressureTimer = resetWritingPressureTimer;

  global.openQaReportModal = openQaReportModal;
  global.closeQaReportModal = closeQaReportModal;
  global.switchQaModalTab = switchQaModalTab;
  global.fillQuickQaTemplate = fillQuickQaTemplate;
  global.submitQaReportForm = submitQaReportForm;
  global.submitQaViaMailto = submitQaViaMailto;
  global.toggleQaReportResolved = toggleQaReportResolved;
  global.deleteSingleQaReport = deleteSingleQaReport;
  global.clearAllQaReports = clearAllQaReports;
  global.exportQaReportsToCsv = exportQaReportsToCsv;
  global.saveQaIntegrationConfig = saveQaIntegrationConfig;
  global.copyAppsScriptSnippet = copyAppsScriptSnippet;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllEnhancements);
  } else {
    initAllEnhancements();
  }
})(window);


/* =========================================================================
   9. APPLICATION INITIALIZATION, MODALS & EVENT HOOKS
   ========================================================================= */

let isProjectorMode = false;
function toggleProjectorMode() {
  isProjectorMode = !isProjectorMode;
  document.body.classList.toggle('projector-mode', isProjectorMode);
  const btn = $('#btn-projector-toggle');
  if (btn) {
    btn.textContent = isProjectorMode ? 'Tắt máy chiếu' : 'Máy chiếu';
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
    soundBtn.textContent = soundEnabled ? 'Bật' : 'Tắt';
    soundBtn.className = 'btn sm settings-action-btn ' + (soundEnabled ? 'au' : 'gh');
  }
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const themeBtn = $('#btn-setting-theme');
  if (themeBtn) {
    themeBtn.textContent = isDark ? 'Tối' : 'Sáng';
    themeBtn.className = 'btn sm settings-action-btn ' + (isDark ? 'cy' : 'au');
  }
  const projBtn = $('#btn-setting-projector');
  if (projBtn) {
    projBtn.textContent = isProjectorMode ? 'Bật' : 'Tắt';
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
  $('.mobile-menu-toggle')?.setAttribute('aria-label', 'Đóng danh mục');
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
    toggle.setAttribute('aria-label', 'Mở danh mục');
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
try {
  let initialScreen = 'home';
  try {
    const savedScreen = sessionStorage.getItem('vq_current_screen');
    if (savedScreen && ['home', 'lib', 'setup', 'writing', 'reading', 'history'].includes(savedScreen)) {
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
} catch (err) {
  console.warn('App startup warning:', err);
}

async function initPersistedData() {
  const fromSupabase = await loadSetsFromSupabase();
  if (!fromSupabase) {
    try { const x = JSON.parse(localStorage.vq_cartoon); if (Array.isArray(x) && x.length) sets = x; } catch (e) {}
  }
  sets = sets.filter(s => {
    if (String(s.id).startsWith('set_')) return false;
    const t = (String(s.title) + ' ' + String(s.topic) + ' ' + String(s.id)).toLowerCase();
    if (t.includes('ielts') || t.includes('english') || t.includes('tiếng anh')) return false;
    return true;
  });
  save();
  if (typeof renderHomeSets === 'function') renderHomeSets();
}

initPersistedData().then(() => {
  if (currentScreen === 'lib') R.lib();
  if (currentScreen === 'home') R.home();
  if (currentScreen === 'setup' && typeof R.setup === 'function') R.setup();
  if (currentScreen === 'writing' && typeof R.writing === 'function') R.writing();
  if (currentScreen === 'reading' && typeof R.reading === 'function') R.reading();
});

// Clean up any legacy SGK theme attributes
try {
  localStorage.removeItem('vq_sgk_theme');
  localStorage.removeItem('vq_sgk_autorotate');
  document.documentElement.removeAttribute('data-sgk-theme');
} catch(e) {}



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
  if (window.Auth) freezeObj('Auth', window.Auth);

  // 2. Khóa cứng toàn bộ hàm gọi từ DOM & giao diện bài làm
  const protectedFunctionList = [
    '$', '$$', 'esc', 'uid', 'toast', 'ask', 'go',
    'preventPasteCopy', 'isStudentInputField',
    'toggleSound', 'playSound', 'playNote', 'toggleTheme', 'toggleProjectorMode',
    'openSettingsDialog', 'closeSettingsDialog', 'updateSettingsUI',
    'toggleMobileMenu', 'closeMobileMenu',
    'openLoginDialog', 'closeLoginDialog', 'switchLoginDialogTab', 'handleLoginSubmit', 'logoutUser',
    'openAccountManagerModal', 'closeAccountManagerModal',
    'openCreateAccountModal', 'closeCreateAccountModal', 'handleCreateAccountSubmit',
    'openResetPasswordModal', 'closeResetPasswordModal', 'handleResetPasswordSubmit',
    'openChangePasswordModal', 'closeChangePasswordModal', 'handleChangePasswordSubmit',
    'fillSampleAccount', 'exportAccountsList', 'deleteUserAccountById', 'toggleUserDropdown', 'closeUserDropdown',
    'switchAccountQuick', 'removeSavedAccountQuick', 'logoutAllAccounts',
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
    'onPromptTotalCountChange', 'onPromptTypeCountInput',
    'nextQuoteOfDay', 'copyCurrentQuoteOfDay', 'toggleSaveCurrentQuote',
    'openQuoteOfDayModal', 'closeQuoteOfDayModal', 'renderQuoteOfDayModalBody', 'copySpecificQuote',
    'openGamificationModal', 'closeGamificationModal', 'onActivityCompletedGamification',
    'awardCustomGamificationPoints', 'renderGamificationUI',
    'toggleReadingQuestionScaffolding', 'renderReadingQuestionScaffoldContent', 'insertKeywordIntoReadingAnswer', 'assembleReadingScaffoldToTextarea',
    'initWritingScaffoldingAndTimer', 'toggleWritingScaffoldingPanel', 'renderWritingMainScaffoldingBody', 'toggleWritingSectionScaffolding', 'renderWritingSectionScaffoldingContent',
    'insertTextIntoSpecificWritingSection', 'insertTextIntoActiveWritingSection', 'assembleWritingSectionScaffold',
    'initReadingPressureTimer', 'setReadingPressureTimer', 'toggleReadingPressureTimer', 'resetReadingPressureTimer',
    'setWritingPressureMode', 'resetWritingPressureTimer',
    'openQaReportModal', 'closeQaReportModal', 'switchQaModalTab', 'fillQuickQaTemplate',
    'submitQaReportForm', 'submitQaViaMailto', 'toggleQaReportResolved',
    'deleteSingleQaReport', 'clearAllQaReports', 'exportQaReportsToCsv',
    'saveQaIntegrationConfig', 'copyAppsScriptSnippet'
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
