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

    nlxh_doan_tachai: {
      group: 'Đoạn văn NLXH (~200 chữ)',
      name: '7B. Đoạn NLXH (Định dạng 2): TÁC HẠI / HẬU QUẢ của một thói quen / hiện tượng tiêu cực',
      singleParagraph: true,
      formRule: 'Hình thức: Chỉ viết trong 1 đoạn văn, không xuống hàng (~200 chữ). Bàn luận 3 tác hại trực tiếp: Đối với bản thân (thời gian, năng lực, cơ hội) ➔ Đối với uy tín, mối quan hệ ➔ Đối với xã hội + Dẫn chứng thực tế + Bài học nhận thức, hành động.',
      formulaSteps: ['Mở đoạn (Nêu VĐNL)', 'Giải thích ngắn', 'Thứ nhất: Tác hại đối với bản thân', 'Thứ hai: Tác hại đối với uy tín, mối quan hệ', 'Thứ ba: Tác hại đối với xã hội', 'Dẫn chứng thực tế', 'Bài học & Kết đoạn'],
      referenceHtml: '',
      fields: [
        { label: '1. Mở đoạn (Nêu hiện tượng/thói quen tiêu cực cần bàn luận):', placeholder: 'Trong đời sống hiện đại, thói quen / hiện tượng [A] đang để lại những hệ lụy khôn lường...' },
        { label: '2. Giải thích (1 câu ngắn gọn về bản chất của [A]):', placeholder: 'Hiểu một cách rõ ràng, [A] chính là biểu hiện của...' },
        { label: '3. Tác hại 1 - Đối với bản thân (Đánh mất cơ hội, trì trệ năng lực):', placeholder: 'Thứ nhất, [A] khiến cá nhân đánh mất những cơ hội quý báu để phát triển bản thân, rơi vào trạng thái trì trệ...' },
        { label: '4. Tác hại 2 - Đối với uy tín & các mối quan hệ:', placeholder: 'Thứ hai, [A] làm suy giảm uy tín cá nhân, đánh mất niềm tin từ thầy cô, bạn bè và đối tác...' },
        { label: '5. Tác hại 3 - Đối với cộng đồng, xã hội:', placeholder: 'Thứ ba, về lâu dài, [A] tạo ra sức ỳ cho toàn xã hội, kìm hãm sự phát triển chung của cộng đồng...' },
        { label: '6. Dẫn chứng thực tế:', placeholder: 'Thực tế cho thấy, nhiều người trẻ vì [A] mà đã phải trả giá bằng...' },
        { label: '7. Bài học nhận thức, hành động & Kết đoạn:', placeholder: 'Bởi vậy, mỗi chúng ta cần kiên quyết từ bỏ [A], rèn luyện lối sống kỉ luật, chủ động để vững bước tương lai.' }
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
    if (t.includes('tác hại') || t.includes('hệ lụy') || t.includes('hậu quả')) return 'nlxh_doan_tachai';
    if (t.includes('hiện tượng')) return 'nlxh_bai_hientuong';
    if (t.includes('trong tác phẩm') && (t.includes('xã hội') || t.includes('cuộc sống hôm nay'))) return 'nlxh_bai_vdxh_tpvh';
    if (t.includes('giải pháp') || t.includes('làm thế nào') || t.includes('cách thức') || t.includes('trách nhiệm') || t.includes('cần làm')) {
      return 'nlxh_doan_giaiphap';
    }
    if (t.includes('nhân vật')) return 'nlvh_doan_nhanvat';
    if (t.includes('tình cảm') || t.includes('cảm xúc') || t.includes('mạch cảm xúc')) return 'nlvh_doan_camxuc_tho';
    if (t.includes('nghệ thuật') && (t.includes('truyện') || t.includes('ngôi kể') || t.includes('tình huống') || t.includes('chi tiết'))) return 'nlvh_doan_nt_truyen';
    if (t.includes('nghệ thuật') && (t.includes('thơ') || t.includes('khổ thơ') || t.includes('đoạn thơ') || t.includes('từ láy') || t.includes('nghệ thuật đối'))) return 'nlvh_doan_nt_tho';
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

  function renderWorkspaceThinkingGuide(curSet) {
    const card = document.getElementById('workspace-thinking-card');
    const body = document.getElementById('workspace-thinking-guide-body');
    const sub = document.getElementById('workspace-thinking-card-sub');
    const btn = document.getElementById('btn-toggle-thinking-guide');
    if (!card || !body) return;

    if (!curSet) {
      card.style.display = 'none';
      if (btn) btn.style.display = 'none';
      return;
    }

    let guide = (curSet.thinkingGuide || '').trim();
    if (!guide && typeof autoGenerateThinkingGuideForSet === 'function') {
      guide = autoGenerateThinkingGuideForSet(curSet);
    }

    if (guide) {
      card.style.display = 'block';
      body.textContent = guide;
      if (btn) {
        btn.style.display = 'inline-flex';
        btn.classList.add('active');
        const span = btn.querySelector('span');
        if (span) span.textContent = 'Thu gọn gợi ý';
      }
      if (sub) {
        const isDoan = String(curSet.category || '').startsWith('doan-');
        sub.textContent = isDoan
          ? 'Định hướng 01 đoạn văn 200 chữ: Luận điểm then chốt & Thao tác lập luận'
          : 'Định hướng toàn bài: Khung luận điểm, Thao tác phân tích & Dẫn chứng tiêu biểu';
      }
    } else {
      card.style.display = 'none';
      if (btn) btn.style.display = 'none';
    }
  }

  function toggleWorkspaceThinkingGuide() {
    const card = document.getElementById('workspace-thinking-card');
    const btn = document.getElementById('btn-toggle-thinking-guide');
    if (!card) return;

    const isHidden = (card.style.display === 'none' || (typeof window !== 'undefined' && typeof window.getComputedStyle === 'function' && window.getComputedStyle(card).display === 'none'));
    if (isHidden) {
      const curSet = typeof currentWritingSet !== 'undefined' ? currentWritingSet : null;
      renderWorkspaceThinkingGuide(curSet);
      card.style.display = 'block';
      if (btn) {
        btn.classList.add('active');
        const span = typeof btn.querySelector === 'function' ? btn.querySelector('span') : null;
        if (span) span.textContent = 'Thu gọn gợi ý';
      }
      toast('💡 Đã mở gợi ý tư duy dưới đề bài!', 'ok');
    } else {
      card.style.display = 'none';
      if (btn) {
        btn.classList.remove('active');
        const span = typeof btn.querySelector === 'function' ? btn.querySelector('span') : null;
        if (span) span.textContent = 'Gợi ý tư duy';
      }
    }
  }

  function initWritingScaffoldingAndTimer() {
    const panel = document.getElementById('writing-scaffolding-panel');
    if (panel) panel.style.display = 'none';

    const curSet = typeof currentWritingSet !== 'undefined' ? currentWritingSet : null;
    const promptText = curSet ? `${curSet.title || ''} ${curSet.prompt || ''}` : '';
    activeWritingTemplateKey = detectBestTemplateKey(promptText, curSet && curSet.subType, curSet && curSet.category && curSet.category.startsWith('doan-'));

    renderWorkspaceThinkingGuide(curSet);
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
    const curSet = typeof currentWritingSet !== 'undefined' ? currentWritingSet : null;
    const promptText = document.getElementById('workspace-prompt-text')?.textContent || (curSet ? curSet.prompt : '');
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

    const thinkingGuide = curSet && curSet.thinkingGuide ? curSet.thinkingGuide.trim() : '';

    const thinkingGuideHtml = thinkingGuide ? `
      <div class="scaffold-specific-guide-card">
        <div class="scaffold-guide-card-header">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="scaffold-guide-badge">🎯 GỢI Ý TƯ DUY TRỌNG TÂM CỦA ĐỀ NÀY</span>
          </div>
          <div class="scaffold-guide-actions">
            <button type="button" class="btn au sm scaffold-action-btn" onclick="insertSetThinkingGuideToActiveSection()" title="Chèn toàn bộ gợi ý tư duy này vào bài làm để phát triển bài viết">
              <ion-icon name="flash-outline"></ion-icon> <span>Chèn gợi ý tư duy vào bài viết</span>
            </button>
            <button type="button" class="btn gh sm scaffold-action-btn" onclick="insertScaffoldFormulaOutline()" title="Chèn khung sườn các bước theo dạng bài vào bài làm">
              <ion-icon name="list-outline"></ion-icon> <span>Chèn sườn dàn ý</span>
            </button>
          </div>
        </div>
        <div class="scaffold-thinking-guide-text">${esc(thinkingGuide)}</div>
      </div>
    ` : `
      <div class="scaffold-specific-guide-card">
        <div class="scaffold-guide-card-header">
          <span class="scaffold-guide-badge">💡 KHUNG DÀN Ý &amp; QUY TRÌNH DẠNG BÀI</span>
          <button type="button" class="btn au sm scaffold-action-btn" onclick="insertScaffoldFormulaOutline()" title="Chèn khung sườn các bước theo dạng bài vào bài làm">
            <ion-icon name="list-outline"></ion-icon> <span>Chèn sườn dàn ý vào bài viết</span>
          </button>
        </div>
      </div>
    `;

    body.innerHTML = `
      ${thinkingGuideHtml}

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
    const curSet = typeof currentWritingSet !== 'undefined' ? currentWritingSet : null;
    const promptText = document.getElementById('workspace-prompt-text')?.textContent || '';
    const keywords = extractSmartKeywordsFromText(promptText);

    const sec = curSet && curSet.sections ? curSet.sections.find(s => s.id === secId) : null;
    const secGuide = (sec && sec.guide) ? sec.guide : (curSet ? curSet.thinkingGuide : '');

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

        ${secGuide ? `
          <div class="scaffold-specific-guide-card" style="margin-bottom:10px;">
            <div class="scaffold-guide-card-header">
              <span class="scaffold-guide-badge">🎯 GỢI Ý RIÊNG CHO PHẦN NÀY</span>
              <button type="button" class="btn au sm scaffold-action-btn" onclick="insertSpecificSectionGuide('${esc(secId)}')" style="font-size:11.5px; padding:3px 8px;">
                <ion-icon name="flash-outline"></ion-icon> <span>Chèn gợi ý vào ô này</span>
              </button>
            </div>
            <div class="scaffold-thinking-guide-text">${esc(secGuide)}</div>
          </div>
        ` : ''}

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
    tx.dispatchEvent(new Event('input', { bubbles: true }));
    tx.focus();
    toast(`Đã chèn: "${text}"`, 'ok');
  }

  function insertSpecificSectionGuide(secId) {
    const curSet = typeof currentWritingSet !== 'undefined' ? currentWritingSet : null;
    const sec = curSet && curSet.sections ? curSet.sections.find(s => s.id === secId) : null;
    const textToInsert = (sec && sec.guide) ? sec.guide : (curSet ? curSet.thinkingGuide : '');
    if (!textToInsert) {
      toast('Không có gợi ý riêng cho phần này!', 'bad');
      return;
    }
    const tx = document.getElementById(`sec-input-${secId}`);
    if (!tx) return;
    const existing = tx.value.trim();
    if (existing) {
      tx.value = `${existing}\n\n[GỢI Ý ĐỊNH HƯỚNG]:\n${textToInsert}`;
    } else {
      tx.value = `[GỢI Ý ĐỊNH HƯỚNG]:\n${textToInsert}`;
    }
    if (typeof onSectionInput === 'function') onSectionInput(secId, tx);
    tx.dispatchEvent(new Event('input', { bubbles: true }));
    tx.focus();
    toast('⚡ Đã chèn gợi ý vào ô làm bài! Bạn hãy phát triển thành bài văn hoàn chỉnh.', 'ok');
  }

  function insertSetThinkingGuideToActiveSection() {
    const curSet = typeof currentWritingSet !== 'undefined' ? currentWritingSet : null;
    if (!curSet || !curSet.thinkingGuide) {
      toast('Bộ đề này chưa có gợi ý tư duy riêng!', 'bad');
      return;
    }

    let targetTx = null;
    if (document.activeElement && document.activeElement.classList && document.activeElement.classList.contains('writing-textarea')) {
      targetTx = document.activeElement;
    }
    if (!targetTx) {
      targetTx = document.getElementById('sec-input-sec_doan_200') || document.querySelector('#writing-sections-list textarea');
    }

    if (!targetTx) {
      toast('Không tìm thấy ô nhập bài viết!', 'bad');
      return;
    }

    const secId = targetTx.id.replace('sec-input-', '');
    const guideText = curSet.thinkingGuide.trim();

    const existing = targetTx.value.trim();
    if (existing) {
      targetTx.value = `${existing}\n\n[GỢI Ý TƯ DUY ĐỊNH HƯỚNG]:\n${guideText}`;
    } else {
      targetTx.value = `[GỢI Ý TƯ DUY ĐỊNH HƯỚNG]:\n${guideText}`;
    }

    if (typeof onSectionInput === 'function') {
      onSectionInput(secId, targetTx);
    }
    targetTx.dispatchEvent(new Event('input', { bubbles: true }));
    targetTx.focus();
    toast('⚡ Đã chèn Gợi ý tư duy vào bài viết! Hãy phát triển thành câu văn hoàn chỉnh nhé.', 'ok');
  }

  function insertScaffoldFormulaOutline() {
    const tpl = SCAFFOLD_TEMPLATES[activeWritingTemplateKey] || SCAFFOLD_TEMPLATES.nlxh_doan_ynghia;
    let targetTx = null;

    if (document.activeElement && document.activeElement.classList && document.activeElement.classList.contains('writing-textarea')) {
      targetTx = document.activeElement;
    }
    if (!targetTx) {
      targetTx = document.getElementById('sec-input-sec_doan_200') || document.querySelector('#writing-sections-list textarea');
    }
    if (!targetTx) {
      toast('Không tìm thấy ô nhập bài viết!', 'bad');
      return;
    }

    const secId = targetTx.id.replace('sec-input-', '');
    const outlineLines = tpl.formulaSteps.map((st, i) => `${i + 1}. ${st}: ...`).join('\n');

    const existing = targetTx.value.trim();
    if (existing) {
      targetTx.value = `${existing}\n\n[KHUNG SƯỜN DÀN Ý - ${tpl.name.toUpperCase()}]:\n${outlineLines}`;
    } else {
      targetTx.value = `[KHUNG SƯỜN DÀN Ý - ${tpl.name.toUpperCase()}]:\n${outlineLines}`;
    }

    if (typeof onSectionInput === 'function') {
      onSectionInput(secId, targetTx);
    }
    targetTx.dispatchEvent(new Event('input', { bubbles: true }));
    targetTx.focus();
    toast('📋 Đã chèn Khung sườn dàn ý vào ô viết!', 'ok');
  }

  function insertTextIntoActiveWritingSection(text) {
    let tx = null;
    if (document.activeElement && document.activeElement.classList && document.activeElement.classList.contains('writing-textarea')) {
      tx = document.activeElement;
    }
    if (!tx) {
      tx = document.getElementById('sec-input-sec_doan_200') || document.querySelector('#writing-sections-list textarea');
    }
    if (!tx) {
      toast('Vui lòng bấm chọn ô bài viết muốn chèn!', 'bad');
      return;
    }
    const secId = tx.id.replace('sec-input-', '');
    tx.value = tx.value ? `${tx.value.trim()} ${text}` : text;
    if (typeof onSectionInput === 'function') onSectionInput(secId, tx);
    tx.dispatchEvent(new Event('input', { bubbles: true }));
    tx.focus();
    toast(`Đã chèn: "${text}"`, 'ok');
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
    const sel = document.getElementById('start-reading-timer-preset') || document.getElementById('reading-timer-preset');
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

    const modeTag = document.getElementById('reading-timer-mode-tag');
    if (modeTag) {
      modeTag.textContent = mins > 0 ? `⚡ ${mins} phút` : '⏳ Tự do';
    }

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
          toast('⏰ HẾT GIỜ LÀM BÀI! Đang tự động thu bài đọc hiểu và lưu gửi về cho Giáo viên/Admin...', 'bad');
          if (typeof submitReadingAnswers === 'function') {
            submitReadingAnswers(true);
          }
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
    const sel = document.getElementById('start-writing-timer-preset') || document.getElementById('writing-timer-preset');
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

    const modeTag = document.getElementById('workspace-timer-mode-tag');
    if (modeTag) {
      modeTag.textContent = mins > 0 ? `⏱️ ${mins} phút` : '⏳ Tự do';
    }

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
        toast('⏰ HẾT GIỜ LÀM BÀI! Đang tự động thu bài và lưu gửi về cho Giáo viên/Admin...', 'bad');
        if (typeof submitWritingEssay === 'function') {
          submitWritingEssay(true);
        }
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
  global.renderWorkspaceThinkingGuide = renderWorkspaceThinkingGuide;
  global.toggleWorkspaceThinkingGuide = toggleWorkspaceThinkingGuide;
  global.toggleWritingScaffoldingPanel = toggleWritingScaffoldingPanel;
  global.renderWritingMainScaffoldingBody = renderWritingMainScaffoldingBody;
  global.toggleWritingSectionScaffolding = toggleWritingSectionScaffolding;
  global.renderWritingSectionScaffoldingContent = renderWritingSectionScaffoldingContent;
  global.insertTextIntoSpecificWritingSection = insertTextIntoSpecificWritingSection;
  global.insertTextIntoActiveWritingSection = insertTextIntoActiveWritingSection;
  global.assembleWritingSectionScaffold = assembleWritingSectionScaffold;
  global.insertSetThinkingGuideToActiveSection = insertSetThinkingGuideToActiveSection;
  global.insertScaffoldFormulaOutline = insertScaffoldFormulaOutline;
  global.insertSpecificSectionGuide = insertSpecificSectionGuide;

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
