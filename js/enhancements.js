/* =========================================================================
   10. GDPT 2018 EDUCATIONAL ENHANCEMENTS MODULE
   - 1. Giàn giáo nhận thức (Scaffolding - "Gợi ý tư duy" cho Tự luận & Đoạn 200 chữ)
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

    // Cập nhật chuỗi ngày học liên tục (Streak) khi mở web hôm nay
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
      state.xp = (Number(state.xp) || 0) + 10; // Cộng 10 XP điểm danh mỗi ngày
    }

    if (state.streak > (state.bestStreak || 1)) {
      state.bestStreak = state.streak;
    }

    // Đồng bộ thêm thành tích từ lịch sử làm bài hiện có
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

    // Tính số hoạt động trong ngày hôm nay từ lịch sử
    const today = getTodayDateString();
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayHistoryCount = history.filter(h => Number(h.timestamp) >= todayStart.getTime()).length;
    const savedTodayCount = Number(state.dailyActivities[today] || 0);
    state.dailyActivities[today] = Math.max(savedTodayCount, todayHistoryCount);

    // Đảm bảo XP tối thiểu tương ứng với lịch sử
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

    // Navbar Streak
    const navStreak = document.getElementById('nav-streak-count');
    if (navStreak) navStreak.textContent = state.streak;

    // Home Card Elements
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

    // Render 7-day Duolingo style week row
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

    // Render mini badges row on Home
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
  // PHẦN 3: GIÀN GIÁO NHẬN THỨC (SCAFFOLDING) - NÚT "GỢI Ý TƯ DUY"
  // =========================================================================
  function extractSmartKeywordsFromText(text) {
    const t = String(text || '').toLowerCase();
    const kwSet = new Set();

    if (t.includes('tuổi trẻ') || t.includes('khát vọng') || t.includes('ước mơ') || t.includes('cống hiến')) {
      ['Khát vọng vươn lên', 'Lý tưởng sống đẹp', 'Dấn thân & Cống hiến', 'Nhiệt huyết thanh xuân', 'Vượt qua giới hạn'].forEach(k => kwSet.add(k));
    }
    if (t.includes('nhân ái') || t.includes('sẻ chia') || t.includes('yêu thương') || t.includes('thấu cảm') || t.includes('tình người')) {
      ['Sự thấu cảm', 'Tình người ấm áp', 'Sống là cho đi', 'Gắn kết cộng đồng', 'Lòng trắc ẩn'].forEach(k => kwSet.add(k));
    }
    if (t.includes('bản lĩnh') || t.includes('khó khăn') || t.includes('nghịch cảnh') || t.includes('ý chí') || t.includes('thất bại')) {
      ['Bản lĩnh kiên cường', 'Ý chí nghị lực', 'Vượt lên nghịch cảnh', 'Biến thử thách thành cơ hội', 'Tinh thần lạc quan'].forEach(k => kwSet.add(k));
    }
    if (t.includes('gia đình') || t.includes('mẹ') || t.includes('cha') || t.includes('quê hương') || t.includes('nguồn cội')) {
      ['Điểm tựa tâm hồn', 'Tình mẫu tử thiêng liêng', 'Nghĩa tình nguồn cội', 'Bến đỗ bình yên', 'Lòng biết ơn'].forEach(k => kwSet.add(k));
    }
    if (t.includes('biện pháp') || t.includes('tu từ') || t.includes('nghệ thuật') || t.includes('hình ảnh')) {
      ['Tăng sức gợi hình, gợi cảm', 'Nhấn mạnh sắc thái biểu đạt', 'Tạo nhịp điệu ngân vang', 'Khắc họa sinh động', 'Thể hiện tấm lòng tác giả'].forEach(k => kwSet.add(k));
    }

    // Mặc định bổ sung các từ khóa học thuật chuẩn GDPT 2018
    const defaults = [
      'Giá trị nhân văn sâu sắc',
      'Thông điệp giàu ý nghĩa',
      'Nhận thức & Hành động',
      'Trách nhiệm cá nhân',
      'Góc nhìn đa chiều',
      'Bản sắc riêng biệt'
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

    // Lấy nội dung câu hỏi để gợi ý từ khóa sát đề
    const card = document.getElementById(`card-q-${idx}`);
    const qText = card ? (card.querySelector('.reading-q-text')?.textContent || '') : '';
    const keywords = extractSmartKeywordsFromText(qText);

    if (isParagraph) {
      // Sơ đồ Giàn giáo nhận thức chuẩn cho Đoạn văn 200 chữ (6 bước)
      box.innerHTML = `
        <div class="scaffold-inner">
          <div class="scaffold-top-bar">
            <span class="scaffold-tag">💡 GIÀN GIÁO NHẬN THỨC · ĐOẠN VĂN 200 CHỮ</span>
            <button type="button" class="btn gh sm" style="padding:2px 8px; font-size:12px;" onclick="document.getElementById('reading-scaffold-box-${idx}').style.display='none'">Đóng</button>
          </div>

          <div class="scaffold-formula-banner">
            <b>📐 Công thức 6 bước viết đoạn 200 chữ chuẩn GDPT 2018:</b>
            <div class="scaffold-steps-pills">
              <span class="scaffold-step-pill">1. Câu chủ đề</span> ➔
              <span class="scaffold-step-pill">2. Giải thích</span> ➔
              <span class="scaffold-step-pill">3. Bàn luận</span> ➔
              <span class="scaffold-step-pill">4. Chứng minh</span> ➔
              <span class="scaffold-step-pill">5. Phản đề</span> ➔
              <span class="scaffold-step-pill">6. Bài học</span>
            </div>
          </div>

          <div class="scaffold-keywords-section">
            <div class="scaffold-lbl">🔑 Từ khóa gợi mở (Bấm vào để chèn nhanh vào bài viết):</div>
            <div class="scaffold-kw-list">
              ${keywords.map(kw => `
                <button type="button" class="scaffold-kw-chip" onclick="insertKeywordIntoReadingAnswer(${idx}, '${esc(kw)}')">+ ${esc(kw)}</button>
              `).join('')}
            </div>
          </div>

          <div class="scaffold-outline-builder">
            <div class="scaffold-lbl">🧩 Sơ đồ dàn ý trống (Điền ý ngắn vào các bước rồi bấm Ghép thành đoạn văn):</div>
            <div class="scaffold-grid-steps">
              <div class="scaffold-step-field">
                <label>1. Mở đoạn (Câu chủ đề):</label>
                <input type="text" id="r-scaf-${idx}-s1" placeholder="Ví dụ: Từ ngữ liệu trên, ta nhận ra vai trò vô cùng to lớn của [vấn đề nghị luận] trong cuộc sống...">
              </div>
              <div class="scaffold-step-field">
                <label>2. Giải thích khái niệm / ý nghĩa:</label>
                <input type="text" id="r-scaf-${idx}-s2" placeholder="Ví dụ: Hiểu một cách giản dị, [từ khóa] chính là thái độ sống / phẩm chất...">
              </div>
              <div class="scaffold-step-field">
                <label>3. Bàn luận (Biểu hiện &amp; Ý nghĩa, vì sao?):</label>
                <input type="text" id="r-scaf-${idx}-s3" placeholder="Ví dụ: Trong hành trình trưởng thành, phẩm chất này giúp con người vượt qua thử thách, lan tỏa giá trị tốt đẹp...">
              </div>
              <div class="scaffold-step-field">
                <label>4. Chứng minh (Dẫn chứng thực tế):</label>
                <input type="text" id="r-scaf-${idx}-s4" placeholder="Ví dụ: Thực tế đã chứng minh qua tấm gương của... đã kiên trì nỗ lực để...">
              </div>
              <div class="scaffold-step-field">
                <label>5. Phản đề (Mở rộng / Phê phán):</label>
                <input type="text" id="r-scaf-${idx}-s5" placeholder="Ví dụ: Tuy nhiên, vẫn còn một bộ phận người sống thờ ơ, thiếu đi ý thức... thật đáng buồn.">
              </div>
              <div class="scaffold-step-field">
                <label>6. Kết đoạn (Bài học nhận thức &amp; hành động):</label>
                <input type="text" id="r-scaf-${idx}-s6" placeholder="Ví dụ: Khép lại trang viết, mỗi người trẻ chúng ta cần rèn luyện bản thân bắt đầu từ những hành động nhỏ nhất...">
              </div>
            </div>
            <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:10px;">
              <button type="button" class="btn au sm" onclick="assembleReadingScaffoldToTextarea(${idx}, true)">
                <ion-icon name="flash-outline"></ion-icon> <span>Ghép dàn ý thành đoạn văn đưa vào ô làm bài</span>
              </button>
            </div>
          </div>
        </div>
      `;
    } else {
      // Sơ đồ Giàn giáo nhận thức cho câu hỏi Đọc hiểu tự luận (3 bước)
      box.innerHTML = `
        <div class="scaffold-inner">
          <div class="scaffold-top-bar">
            <span class="scaffold-tag">💡 GIÀN GIÁO NHẬN THỨC · CÂU HỎI ĐỌC HIỂU</span>
            <button type="button" class="btn gh sm" style="padding:2px 8px; font-size:12px;" onclick="document.getElementById('reading-scaffold-box-${idx}').style.display='none'">Đóng</button>
          </div>

          <div class="scaffold-formula-banner">
            <b>📐 Công thức 3 bước trả lời đọc hiểu đạt điểm tối đa:</b>
            <div class="scaffold-steps-pills">
              <span class="scaffold-step-pill">1. Chỉ ra trực tiếp (Gọi tên &amp; từ ngữ)</span> ➔
              <span class="scaffold-step-pill">2. Tác dụng nội dung (Gợi hình ảnh/cảm xúc)</span> ➔
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
                <label>Bước 1 - Chỉ ra dấu hiệu / chi tiết trong văn bản:</label>
                <input type="text" id="r-scaf-${idx}-s1" placeholder="Ví dụ: Biện pháp tu từ / Chi tiết thể hiện qua từ ngữ “...”">
              </div>
              <div class="scaffold-step-field">
                <label>Bước 2 - Phân tích tác dụng nội dung / ý nghĩa:</label>
                <input type="text" id="r-scaf-${idx}-s2" placeholder="Ví dụ: Nhấn mạnh và làm nổi bật vẻ đẹp / tâm trạng... của nhân vật trữ tình.">
              </div>
              <div class="scaffold-step-field">
                <label>Bước 3 - Tác dụng nghệ thuật / Thông điệp rút ra:</label>
                <input type="text" id="r-scaf-${idx}-s3" placeholder="Ví dụ: Giúp lời văn/thơ giàu hình ảnh, giàu nhịp điệu và khơi gợi sự đồng cảm sâu sắc.">
              </div>
            </div>
            <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:10px;">
              <button type="button" class="btn au sm" onclick="assembleReadingScaffoldToTextarea(${idx}, false)">
                <ion-icon name="flash-outline"></ion-icon> <span>Ghép câu trả lời vào ô làm bài</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }

    box.style.display = 'block';
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

  function assembleReadingScaffoldToTextarea(idx, isParagraph) {
    const tx = document.getElementById(`reading-q-textarea-${idx}`);
    if (!tx) return;

    const stepsCount = isParagraph ? 6 : 3;
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

    const joined = isParagraph ? parts.join(' ') : parts.map(p => '- ' + p).join('\n');
    tx.value = tx.value.trim() ? (tx.value.trim() + '\n' + joined) : joined;
    tx.dispatchEvent(new Event('input', { bubbles: true }));
    tx.focus();
    toast('✨ Đã ghép dàn ý vào ô làm bài! Bạn hãy hoàn thiện thêm câu chữ cho thật mượt mà nhé.', 'ok');
  }

  // 3B. Giàn giáo nhận thức cho Luyện viết (Toàn bài & Từng đoạn)
  function initWritingScaffoldingAndTimer() {
    const panel = document.getElementById('writing-scaffolding-panel');
    if (panel) panel.style.display = 'none';
    renderWritingMainScaffoldingBody();
    initWritingPressureTimerUI();
  }

  function toggleWritingScaffoldingPanel() {
    const panel = document.getElementById('writing-scaffolding-panel');
    if (!panel) return;
    if (panel.style.display === 'none') {
      renderWritingMainScaffoldingBody();
      panel.style.display = 'block';
      awardCustomGamificationPoints(10, 'scaffolding');
    } else {
      panel.style.display = 'none';
    }
  }

  function renderWritingMainScaffoldingBody() {
    const body = document.getElementById('writing-scaffolding-body');
    if (!body) return;
    const promptText = document.getElementById('workspace-prompt-text')?.textContent || '';
    const keywords = extractSmartKeywordsFromText(promptText);
    const connectors = [
      'Trước hết, cần hiểu rằng',
      'Thực vậy, trong cuộc sống',
      'Bên cạnh đó, không thể phủ nhận',
      'Minh chứng tiêu biểu cho điều này là',
      'Nhìn từ góc độ ngược lại',
      'Khép lại trang viết, ta nhận ra'
    ];

    body.innerHTML = `
      <div class="scaffold-formula-banner">
        <b>📐 Công thức chuẩn viết Đoạn / Bài Nghị luận GDPT 2018:</b>
        <div class="scaffold-steps-pills">
          <span class="scaffold-step-pill">1. Câu chủ đề (Mở đoạn)</span> ➔
          <span class="scaffold-step-pill">2. Giải thích</span> ➔
          <span class="scaffold-step-pill">3. Bàn luận (Phân tích)</span> ➔
          <span class="scaffold-step-pill">4. Chứng minh</span> ➔
          <span class="scaffold-step-pill">5. Phản đề</span> ➔
          <span class="scaffold-step-pill">6. Rút ra bài học</span>
        </div>
      </div>

      <div class="scaffold-keywords-section">
        <div class="scaffold-lbl">🔑 Từ khóa gợi ý theo đề (Bấm để chèn vào phần đang viết):</div>
        <div class="scaffold-kw-list">
          ${keywords.map(kw => `
            <button type="button" class="scaffold-kw-chip" onclick="insertTextIntoActiveWritingSection('${esc(kw)}')">+ ${esc(kw)}</button>
          `).join('')}
        </div>
      </div>

      <div class="scaffold-keywords-section" style="margin-top:8px;">
        <div class="scaffold-lbl">🔗 Cụm từ nối chuyển ý mạch lạc:</div>
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
    const promptText = document.getElementById('workspace-prompt-text')?.textContent || '';
    const keywords = extractSmartKeywordsFromText(promptText);

    box.innerHTML = `
      <div class="scaffold-inner">
        <div class="scaffold-top-bar">
          <span class="scaffold-tag">💡 GỢI Ý TƯ DUY &amp; SƠ ĐỒ DÀN Ý TRỐNG (PHẦN ${idx + 1})</span>
          <button type="button" class="btn gh sm" style="padding:2px 8px; font-size:12px;" onclick="document.getElementById('writing-sec-scaffold-${secId}').style.display='none'">Đóng</button>
        </div>

        <div class="scaffold-keywords-section">
          <div class="scaffold-lbl">🔑 Từ khóa gợi ý nhanh (Bấm để chèn vào đoạn này):</div>
          <div class="scaffold-kw-list">
            ${keywords.map(kw => `
              <button type="button" class="scaffold-kw-chip" onclick="insertTextIntoSpecificWritingSection('${esc(secId)}', '${esc(kw)}')">+ ${esc(kw)}</button>
            `).join('')}
          </div>
        </div>

        <div class="scaffold-outline-builder">
          <div class="scaffold-lbl">🧩 Điền nhanh các bước tư duy để tự động ghép thành đoạn văn:</div>
          <div class="scaffold-grid-steps">
            <div class="scaffold-step-field">
              <label>1. Câu chủ đề / Luận điểm chính:</label>
              <input type="text" id="w-scaf-${secId}-s1" placeholder="Nêu trực tiếp luận điểm hoặc câu mở đoạn...">
            </div>
            <div class="scaffold-step-field">
              <label>2. Giải thích / Làm rõ khái niệm:</label>
              <input type="text" id="w-scaf-${secId}-s2" placeholder="Giải thích ý nghĩa từ khóa hoặc bối cảnh...">
            </div>
            <div class="scaffold-step-field">
              <label>3. Bàn luận &amp; Phân tích chuyên sâu:</label>
              <input type="text" id="w-scaf-${secId}-s3" placeholder="Phân tích biểu hiện, nguyên nhân, tác dụng, giá trị...">
            </div>
            <div class="scaffold-step-field">
              <label>4. Chứng minh (Dẫn chứng tiêu biểu):</label>
              <input type="text" id="w-scaf-${secId}-s4" placeholder="Đưa dẫn chứng thực tế hoặc chi tiết nghệ thuật đắt giá...">
            </div>
            <div class="scaffold-step-field">
              <label>5. Phản đề / Mở rộng nâng cao:</label>
              <input type="text" id="w-scaf-${secId}-s5" placeholder="Nhìn nhận chiều ngược lại hoặc mở rộng vấn đề...">
            </div>
            <div class="scaffold-step-field">
              <label>6. Rút ra bài học / Tiểu kết đoạn:</label>
              <input type="text" id="w-scaf-${secId}-s6" placeholder="Khẳng định lại vấn đề và liên hệ bài học bản thân...">
            </div>
          </div>
          <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:10px;">
            <button type="button" class="btn au sm" onclick="assembleWritingSectionScaffold('${esc(secId)}')">
              <ion-icon name="flash-outline"></ion-icon> <span>Ghép dàn ý vào phần viết này</span>
            </button>
          </div>
        </div>
      </div>
    `;
    box.style.display = 'block';
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

  function assembleWritingSectionScaffold(secId) {
    const tx = document.getElementById(`sec-input-${secId}`);
    if (!tx) return;
    const parts = [];
    for (let i = 1; i <= 6; i++) {
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
    const paragraph = parts.join(' ');
    tx.value = tx.value.trim() ? `${tx.value.trim()}\n${paragraph}` : paragraph;
    if (typeof onSectionInput === 'function') onSectionInput(secId, tx);
    tx.focus();
    toast('✨ Đã ghép sơ đồ dàn ý thành đoạn văn trong bài viết!', 'ok');
  }


  // =========================================================================
  // PHẦN 4: BỘ ĐẾM THỜI GIAN (TIMER) RÈN ÁP LỰC PHÒNG THI
  // =========================================================================
  // 4A. Đồng hồ đếm ngược cho phòng Đọc hiểu (Reading Workspace)
  let readingTimerInterval = null;
  let readingTimerRunning = false;
  let readingTimerModeMinutes = 20; // Mặc định 20 phút cho đoạn văn / đọc hiểu
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

  // 4B. Chế độ Đếm ngược rèn áp lực phòng thi cho Luyện viết (Writing Workspace)
  let writingPressureMinutes = 0; // 0 = Đếm xuôi, 20 = NLXH, 60 = NLVH...
  let writingCountdownNotified5m = false;
  let writingCountdownNotified1m = false;
  let writingCountdownEnded = false;

  function initWritingPressureTimerUI() {
    writingPressureMinutes = 0;
    writingCountdownNotified5m = false;
    writingCountdownNotified1m = false;
    writingCountdownEnded = false;
    const sel = document.getElementById('writing-timer-preset');
    if (sel) sel.value = '0';
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
        toast('⚠️ Còn 5 phút làm bài viết! Hãy khẩn trương hoàn thiện phần Kết bài.', 'bad');
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

  // Hook vào updateTimerDisplay của writing.js để hiển thị đếm ngược khi bật chế độ áp lực phòng thi
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

    // Nếu giáo viên đã cấu hình Google Sheets Webhook URL, đẩy tự động sang Google Sheets
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
  global.insertKeywordIntoReadingAnswer = insertKeywordIntoReadingAnswer;
  global.assembleReadingScaffoldToTextarea = assembleReadingScaffoldToTextarea;

  global.initWritingScaffoldingAndTimer = initWritingScaffoldingAndTimer;
  global.toggleWritingScaffoldingPanel = toggleWritingScaffoldingPanel;
  global.toggleWritingSectionScaffolding = toggleWritingSectionScaffolding;
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
