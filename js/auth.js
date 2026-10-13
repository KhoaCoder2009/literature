/* =========================================================================
   AUTH & ROLE-BASED ACCESS CONTROL (RBAC)
   Quản lý tài khoản, Đăng nhập, Vai trò Giáo viên (Toàn quyền) & Học sinh
   Lưu trữ cơ sở dữ liệu Supabase: public.user_accounts
   ========================================================================= */

(function initAuthModule(global) {
  'use strict';

  const STORAGE_USER_KEY = 'vq_current_user_v2';
  const PASSWORD_SALT = 'nguvan_sec_2026_';

  // -------------------------------------------------------------------------
  // 1. MÃ HÓA MẬT KHẨU (SHA-256 HASHING WITH SALT)
  // -------------------------------------------------------------------------
  async function hashPassword(rawPassword) {
    const text = PASSWORD_SALT + String(rawPassword || '');
    try {
      if (typeof crypto !== 'undefined' && crypto.subtle && typeof crypto.subtle.digest === 'function') {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      }
    } catch (e) {
      console.warn('WebCrypto subtle hash fallback:', e);
    }
    // Fallback pure JS SHA-256 implementation
    return sha256Fallback(text);
  }

  function sha256Fallback(ascii) {
    function rightRotate(value, amount) {
      return (value >>> amount) | (value << (32 - amount));
    }
    const mathPow = Math.pow;
    const maxWord = mathPow(2, 32);
    let lengthProperty = 'length';
    let i, j;
    let result = '';
    const words = [];
    const asciiBitLength = ascii[lengthProperty] * 8;
    let hash = sha256Fallback.h = sha256Fallback.h || [];
    const k = sha256Fallback.k = sha256Fallback.k || [];
    let primeCounter = k[lengthProperty];

    const isComposite = {};
    for (let candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (i = 0; i < 313; i += candidate) {
          isComposite[i] = candidate;
        }
        hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
        k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
      }
    }

    ascii += '\x80';
    while ((ascii[lengthProperty] % 64) - 56) ascii += '\x00';
    for (i = 0; i < ascii[lengthProperty]; i++) {
      j = ascii.charCodeAt(i);
      if (j >> 8) return '';
      words[i >> 2] |= j << ((3 - (i % 4)) * 8);
    }
    words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
    words[words[lengthProperty]] = asciiBitLength;

    for (j = 0; j < words[lengthProperty];) {
      const w = words.slice(j, (j += 16));
      const oldHash = hash;
      hash = hash.slice(0, 8);

      for (i = 0; i < 64; i++) {
        const w15 = w[i - 15], w2 = w[i - 2];
        const s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
        const s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
        const ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
        const maj = (hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]);
        const temp1 = (hash[7] + (rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25)) + ch + k[i] + (w[i] = (i < 16) ? (w[i] | 0) : ((w[i - 16] + s0 + w[i - 7] + s1) | 0))) | 0;
        const temp2 = ((rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22)) + maj) | 0;

        hash = [(temp1 + temp2) | 0].concat(hash);
        hash[4] = (hash[4] + temp1) | 0;
        hash.pop();
      }

      for (i = 0; i < 8; i++) {
        hash[i] = (hash[i] + oldHash[i]) | 0;
      }
    }

    for (i = 0; i < 8; i++) {
      for (let b = 3; b >= 0; b--) {
        const byte = (hash[i] >> (b * 8)) & 255;
        result += ((byte < 16 ? '0' : '') + byte.toString(16));
      }
    }
    return result;
  }

  // -------------------------------------------------------------------------
  // 2. SUPABASE REST HELPERS FOR USER ACCOUNTS
  // -------------------------------------------------------------------------
  function getUsersApiUrl(query = '') {
    if (typeof isSupabaseConfigured !== 'function' || !isSupabaseConfigured()) {
      return null;
    }
    const table = (appConfig.supabase && appConfig.supabase.usersTable) || 'user_accounts';
    const baseUrl = appConfig.supabase.url.replace(/\/$/, '');
    return `${baseUrl}/rest/v1/${table}${query ? '?' + query : ''}`;
  }

  function getApiHeaders(extra = {}) {
    return {
      'apikey': appConfig.supabase.anonKey,
      'Authorization': `Bearer ${appConfig.supabase.anonKey}`,
      'Content-Type': 'application/json',
      ...extra
    };
  }

  // -------------------------------------------------------------------------
  // 3. AUTH STATE & LOGIC
  // -------------------------------------------------------------------------
  let currentUser = null;

  function loadStoredUser() {
    try {
      const raw = localStorage.getItem(STORAGE_USER_KEY);
      if (raw) {
        const u = JSON.parse(raw);
        if (u && u.username && u.role) {
          if (u.class_name && u.class_name.toLowerCase().includes('tổ ngữ văn')) {
            u.class_name = '';
            try { localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(u)); } catch (e) {}
          }
          if (u.username === 'admin@bpbd.vn' || u.username === 'admin') {
            u.username = 'admin';
            u.role = 'admin';
            try { localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(u)); } catch (e) {}
          }
          if ((u.role === 'teacher' || u.role === 'admin') && (u.username === 'giaovien' || u.username === 'tuanh' || u.username === 'admin' || u.full_name === 'Quản trị viên Hệ thống' || u.full_name === 'Giáo viên Ngữ Văn' || u.full_name === 'ADMIN')) {
            u.full_name = 'Hoàng Thị Tú Anh';
          }
          u.avatar = 'ion:person';
          try { localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(u)); } catch (e) {}
          if (localStorage.getItem('vq_player_class') && localStorage.getItem('vq_player_class').toLowerCase().includes('tổ ngữ văn')) {
            localStorage.removeItem('vq_player_class');
          }
          currentUser = u;
          return u;
        }
      }
    } catch (e) {
      console.warn('Lỗi đọc phiên người dùng:', e);
    }
    currentUser = null;
    return null;
  }

  function saveStoredUser(user) {
    currentUser = user;
    try {
      if (user) {
        if (user.username === 'admin@bpbd.vn' || user.username === 'admin') {
          user.username = 'admin';
          user.role = 'admin';
        }
        user.avatar = 'ion:person';
        localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
        // Đồng bộ sẵn thông tin làm bài
        localStorage.setItem('vq_player_nick', user.full_name || user.username);
        if (user.class_name && !user.class_name.toLowerCase().includes('tổ ngữ văn')) {
          localStorage.setItem('vq_player_class', user.class_name);
        } else {
          localStorage.removeItem('vq_player_class');
        }
      } else {
        localStorage.removeItem(STORAGE_USER_KEY);
      }
    } catch (e) {
      console.warn('Lỗi lưu phiên người dùng:', e);
    }
  }

  function getRoleAvatarInfo(u) {
    return {
      icon: 'person-outline',
      roleClass: 'default-user',
      bg: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
      color: '#ffffff'
    };
  }

  function renderAvatarMarkup(u, extraClass = '') {
    const info = getRoleAvatarInfo(u);
    const altName = esc(u?.full_name || u?.username || 'Avatar');
    return `<div class="user-ion-avatar ${info.roleClass} ${extraClass}" style="background:${info.bg}; color:${info.color};" title="${altName}"><ion-icon name="${info.icon}"></ion-icon></div>`;
  }

  // -------------------------------------------------------------------------
  // DANH SÁCH CHUẨN HỌC SINH LỚP 12A2 ĐƯỢC CẤP (STT 01 -> 40)
  // Đảm bảo thứ tự hiển thị luôn theo đúng danh sách giáo viên đã gửi
  // -------------------------------------------------------------------------
  const OFFICIAL_12A2_STUDENTS_LIST = [
    { stt: 1, name: 'Nguyễn Quốc An', username: 'nguyenquocan@bpbd.vn', id: 'usr_12a2_01' },
    { stt: 2, name: 'Nguyễn Hoàng Bảo Anh', username: 'nguyenhoangbaoanh@bpbd.vn', id: 'usr_12a2_02' },
    { stt: 3, name: 'Huỳnh Minh Ánh', username: 'huynhminhanh@bpbd.vn', id: 'usr_12a2_03' },
    { stt: 4, name: 'Nguyễn Bảo Châu', username: 'nguyenbaochau@bpbd.vn', id: 'usr_12a2_04' },
    { stt: 5, name: 'Nguyễn Ngọc Minh Châu', username: 'nguyenngocminhchau@bpbd.vn', id: 'usr_12a2_05' },
    { stt: 6, name: 'Nguyễn Thị Mỹ Duyên', username: 'nguyenthimyduyen@bpbd.vn', id: 'usr_12a2_06' },
    { stt: 7, name: 'Nguyễn Thị Anh Đào', username: 'nguyenthianhdao@bpbd.vn', id: 'usr_12a2_07' },
    { stt: 8, name: 'Trần Tiến Đạt', username: 'trantiendat@bpbd.vn', id: 'usr_12a2_08' },
    { stt: 9, name: 'Võ Thanh Giang', username: 'vothanhgiang@bpbd.vn', id: 'usr_12a2_09' },
    { stt: 10, name: 'Nguyễn Hoàng Hải', username: 'nguyenhoanghai@bpbd.vn', id: 'usr_12a2_10' },
    { stt: 11, name: 'Mai Gia Hân', username: 'maigiahan@bpbd.vn', id: 'usr_12a2_11' },
    { stt: 12, name: 'Bùi Quốc Huy', username: 'buiquochuy@bpbd.vn', id: 'usr_12a2_12' },
    { stt: 13, name: 'Lê Xuân Nhật Huy', username: 'lexuannhathuy@bpbd.vn', id: 'usr_12a2_13' },
    { stt: 14, name: 'Lê Nguyễn Đăng Khoa', username: 'lenguyendangkhoa@bpbd.vn', id: 'usr_12a2_14' },
    { stt: 15, name: 'Trần Đăng Khoa', username: 'trandangkhoa@bpbd.vn', id: 'usr_12a2_15' },
    { stt: 16, name: 'Nguyễn Thị Xuân Linh', username: 'nguyenthixuanlinh@bpbd.vn', id: 'usr_12a2_16' },
    { stt: 17, name: 'Phạm Tấn Lực', username: 'phamtanluc@bpbd.vn', id: 'usr_12a2_17' },
    { stt: 18, name: 'Trần Thị Ngọc My', username: 'tranthingocmy@bpbd.vn', id: 'usr_12a2_18' },
    { stt: 19, name: 'Nguyễn Trung Nghĩa', username: 'nguyentrungnghia@bpbd.vn', id: 'usr_12a2_19' },
    { stt: 20, name: 'Mai Như Ngọc', username: 'mainhungoc@bpbd.vn', id: 'usr_12a2_20' },
    { stt: 21, name: 'Võ Hữu Ngọc', username: 'vohuungoc@bpbd.vn', id: 'usr_12a2_21' },
    { stt: 22, name: 'Nguyễn Thị Thu Nguyệt', username: 'nguyenthithunguyet@bpbd.vn', id: 'usr_12a2_22' },
    { stt: 23, name: 'Nguyễn Thanh Tuyết Nhi', username: 'nguyenthanhtuyetnhi@bpbd.vn', id: 'usr_12a2_23' },
    { stt: 24, name: 'Lâm Tâm Như', username: 'lamtamnhu@bpbd.vn', id: 'usr_12a2_24' },
    { stt: 25, name: 'Dương Chấn Phong', username: 'duongchanphong@bpbd.vn', id: 'usr_12a2_25' },
    { stt: 26, name: 'Lâm Thiên Phúc', username: 'lamthienphuc@bpbd.vn', id: 'usr_12a2_26' },
    { stt: 27, name: 'Từ Thị Mai Phương', username: 'tuthimaiphuong@bpbd.vn', id: 'usr_12a2_27' },
    { stt: 28, name: 'Nguyễn Hoàng Sơn', username: 'nguyenhoangson@bpbd.vn', id: 'usr_12a2_28' },
    { stt: 29, name: 'Nguyễn Minh Tâm', username: 'nguyenminhtam@bpbd.vn', id: 'usr_12a2_29' },
    { stt: 30, name: 'Nguyễn Hoàng Thái', username: 'nguyenhoangthai@bpbd.vn', id: 'usr_12a2_30' },
    { stt: 31, name: 'Trịnh Minh Thiên', username: 'trinhminhthien@bpbd.vn', id: 'usr_12a2_31' },
    { stt: 32, name: 'Trần Thị Ngọc Thùy', username: 'tranthingocthuy@bpbd.vn', id: 'usr_12a2_32' },
    { stt: 33, name: 'Hồ Quỳnh Kim Thủy', username: 'hoquynhkimthuy@bpbd.vn', id: 'usr_12a2_33' },
    { stt: 34, name: 'Phạm Thị Ngọc Trâm', username: 'phamthingoctram@bpbd.vn', id: 'usr_12a2_34' },
    { stt: 35, name: 'Quách Thị Thanh Tuyền', username: 'quachthithanhtuyen@bpbd.vn', id: 'usr_12a2_35' },
    { stt: 36, name: 'Trần Minh Tướng', username: 'tranminhtuong@bpbd.vn', id: 'usr_12a2_36' },
    { stt: 37, name: 'Nguyễn Thị Vi', username: 'nguyenthivi@bpbd.vn', id: 'usr_12a2_37' },
    { stt: 38, name: 'Đinh Thị Yến Vy', username: 'dinhthiyenvy@bpbd.vn', id: 'usr_12a2_38' },
    { stt: 39, name: 'Mai Phương Vy', username: 'maiphuongvy@bpbd.vn', id: 'usr_12a2_39' },
    { stt: 40, name: 'Trần Trúc Vy', username: 'trantrucvy@bpbd.vn', id: 'usr_12a2_40' }
  ];

  function getStudentOfficialStt(acc) {
    if (!acc) return null;
    if (acc.id && /^usr_12a2_(\d+)$/i.test(acc.id)) {
      return parseInt(acc.id.match(/^usr_12a2_(\d+)$/i)[1], 10);
    }
    const cleanUser = String(acc.username || '').toLowerCase().trim();
    const item = OFFICIAL_12A2_STUDENTS_LIST.find(s => 
      s.username.toLowerCase() === cleanUser || 
      s.username.split('@')[0] === cleanUser ||
      (acc.full_name && s.name.toLowerCase() === acc.full_name.trim().toLowerCase())
    );
    return item ? item.stt : null;
  }

  function compareVietnameseNames(nameA, nameB) {
    const partsA = String(nameA || '').trim().split(/\s+/);
    const partsB = String(nameB || '').trim().split(/\s+/);
    const firstNameA = partsA[partsA.length - 1] || '';
    const firstNameB = partsB[partsB.length - 1] || '';
    const cmp = firstNameA.localeCompare(firstNameB, 'vi');
    if (cmp !== 0) return cmp;
    return String(nameA || '').localeCompare(String(nameB || ''), 'vi');
  }

  function sortAccountsByOfficialList(accounts) {
    if (!Array.isArray(accounts)) return [];
    return [...accounts].sort((a, b) => {
      // 1. Phân loại vai trò: Quản trị viên (1) -> Giáo viên (2) -> Học sinh (3)
      const getRoleRank = acc => {
        if (acc.role === 'admin') return 1;
        if (acc.role === 'teacher') return 2;
        return 3;
      };

      const rankA = getRoleRank(a);
      const rankB = getRoleRank(b);

      if (rankA !== rankB) {
        return rankA - rankB;
      }

      // Cùng vai trò Quản trị viên:
      if (rankA === 1) {
        if (a.username === 'admin') return -1;
        if (b.username === 'admin') return 1;
        return (a.full_name || a.username).localeCompare(b.full_name || b.username, 'vi');
      }

      // Cùng vai trò Giáo viên:
      if (rankA === 2) {
        return (a.full_name || a.username).localeCompare(b.full_name || b.username, 'vi');
      }

      // 2. Đối với học sinh: Sắp xếp CHÍNH XÁC theo thứ tự danh sách lớp 12A2 đã gửi (STT 01 -> 40)
      const sttA = getStudentOfficialStt(a);
      const sttB = getStudentOfficialStt(b);

      if (sttA !== null && sttB !== null) {
        return sttA - sttB;
      }
      if (sttA !== null && sttB === null) return -1;
      if (sttA === null && sttB !== null) return 1;

      // 3. Học sinh khác: sắp xếp theo lớp rồi theo tên chuẩn tiếng Việt
      const classCmp = (a.class_name || '').localeCompare(b.class_name || '');
      if (classCmp !== 0) return classCmp;

      return compareVietnameseNames(a.full_name || a.username, b.full_name || b.username);
    });
  }

  function getOfflineAccountsList() {
    return [
      { id: 'usr_admin_01', username: 'admin', full_name: 'Hoàng Thị Tú Anh', class_name: '', role: 'admin', avatar: 'ion:person' },
      { id: 'usr_teacher_01', username: 'tuanh', full_name: 'Hoàng Thị Tú Anh', class_name: '', role: 'teacher', avatar: 'ion:person' },
      ...OFFICIAL_12A2_STUDENTS_LIST.map(s => ({
        id: s.id,
        username: s.username,
        full_name: s.name,
        class_name: '12A2',
        role: 'student',
        avatar: 'ion:person'
      }))
    ];
  }

  const Auth = {
    // Truy vấn trạng thái người dùng
    getCurrentUser() {
      if (!currentUser) loadStoredUser();
      return currentUser;
    },

    isLoggedIn() {
      return Boolean(this.getCurrentUser());
    },

    isAdmin() {
      const u = this.getCurrentUser();
      return Boolean(u && u.role === 'admin');
    },

    isTeacher() {
      const u = this.getCurrentUser();
      return Boolean(u && (u.role === 'teacher' || u.role === 'admin'));
    },

    isStudent() {
      const u = this.getCurrentUser();
      return Boolean(u && u.role === 'student');
    },

    // Kiểm tra quyền vào màn hình quản lý tài khoản: Cả Admin và Giáo viên
    canManageAccounts() {
      return this.isTeacher();
    },

    // Kiểm tra toàn quyền quản lý tài khoản (kể cả Giáo viên & Admin): Chỉ Admin
    canManageAllAccounts() {
      return this.isAdmin();
    },

    // Kiểm tra quyền chỉnh sửa bài và tạo đề: Giáo viên & Quản trị viên
    canEditContent() {
      return this.isTeacher();
    },

    // Kiểm tra quyền chấm bài: Giáo viên & Quản trị viên
    canGradeSubmissions() {
      return this.isTeacher();
    },

    // ĐĂNG NHẬP
    async login(rawUsername, rawPassword) {
      const username = String(rawUsername || '').trim().toLowerCase();
      const password = String(rawPassword || '').trim();

      if (!username || !password) {
        return { success: false, error: 'Vui lòng nhập đầy đủ Tên đăng nhập và Mật khẩu!' };
      }

      const passHash = await hashPassword(password);

      // 1. Thử xác thực với Supabase
      if (typeof isSupabaseConfigured === 'function' && isSupabaseConfigured()) {
        try {
          const queryUser = (username === 'admin' || username === 'admin@bpbd.vn')
            ? 'in.(admin,admin@bpbd.vn)'
            : `eq.${encodeURIComponent(username)}`;
          const url = getUsersApiUrl(`username=${queryUser}&select=id,username,password_hash,full_name,class_name,role,avatar,created_at`);
          const res = await fetch(url, { method: 'GET', headers: getApiHeaders() });
          if (res.ok) {
            const rows = await res.json();
            if (Array.isArray(rows) && rows.length > 0) {
              const account = rows[0];
              if (account.password_hash === passHash) {
                // Xác thực thành công
                const finalUsername = (account.username === 'admin@bpbd.vn' || account.username === 'admin') ? 'admin' : account.username;
                let userRole = account.role || 'student';
                if (finalUsername === 'admin') {
                  userRole = 'admin';
                }
                const isStaff = userRole === 'teacher' || userRole === 'admin';
                const userObj = {
                  id: account.id,
                  username: finalUsername,
                  full_name: account.full_name || finalUsername,
                  class_name: account.class_name || '',
                  role: userRole,
                  avatar: 'ion:person'
                };
                saveStoredUser(userObj);

                // Cập nhật last_login ngầm
                try {
                  const updateUrl = getUsersApiUrl(`id=eq.${encodeURIComponent(account.id)}`);
                  fetch(updateUrl, {
                    method: 'PATCH',
                    headers: getApiHeaders(),
                    body: JSON.stringify({ last_login: new Date().toISOString() })
                  }).catch(() => {});
                } catch (_) {}

                this.applyRolePermissions();
                return { success: true, user: userObj };
              } else {
                return { success: false, error: 'Mật khẩu không chính xác!' };
              }
            } else {
              return { success: false, error: 'Tên đăng nhập không tồn tại trên hệ thống!' };
            }
          }
        } catch (err) {
          console.warn('Lỗi kết nối máy chủ xác thực:', err);
        }
      }

      // 2. Fallback ngoại tuyến: Tài khoản mẫu mặc định phòng khi mất mạng
      if ((username === 'admin' || username === 'admin@bpbd.vn') && (password === 'admin9999' || password === '123456')) {
        const adminObj = {
          id: 'usr_admin_01',
          username: 'admin',
          full_name: 'Hoàng Thị Tú Anh',
          class_name: '',
          role: 'admin',
          avatar: 'ion:person'
        };
        saveStoredUser(adminObj);
        this.applyRolePermissions();
        return { success: true, user: adminObj };
      }

      if ((username === 'giaovien' || username === 'tuanh' || username === 'tuanh@bpbd.vn') && (password === '123456' || password === 'tuanh123')) {
        const teacherObj = {
          id: 'usr_teacher_offline',
          username: 'giaovien',
          full_name: 'Hoàng Thị Tú Anh',
          class_name: '',
          role: 'teacher',
          avatar: 'ion:person'
        };
        saveStoredUser(teacherObj);
        this.applyRolePermissions();
        return { success: true, user: teacherObj };
      }

      if (username === 'hocsinh' && password === '123456') {
        const studentObj = {
          id: 'usr_student_offline',
          username: 'hocsinh',
          full_name: 'Nguyễn Văn An',
          class_name: '12A2',
          role: 'student',
          avatar: 'ion:person'
        };
        saveStoredUser(studentObj);
        this.applyRolePermissions();
        return { success: true, user: studentObj };
      }

      // Hỗ trợ đăng nhập ngoại tuyến cho 40 học sinh lớp 12A2
      const matched12A2 = OFFICIAL_12A2_STUDENTS_LIST.find(s =>
        s.username.toLowerCase() === username ||
        s.username.split('@')[0].toLowerCase() === username ||
        s.id.toLowerCase() === username
      );
      if (matched12A2 && password === '123456') {
        const studentObj = {
          id: matched12A2.id,
          username: matched12A2.username,
          full_name: matched12A2.name,
          class_name: '12A2',
          role: 'student',
          avatar: 'ion:person'
        };
        saveStoredUser(studentObj);
        this.applyRolePermissions();
        return { success: true, user: studentObj };
      }

      return { success: false, error: 'Không thể kết nối máy chủ hoặc thông tin đăng nhập không hợp lệ!' };
    },

    // ĐĂNG XUẤT
    logout() {
      saveStoredUser(null);
      this.applyRolePermissions();
      if (typeof toast === 'function') {
        toast('Đã đăng xuất tài khoản thành công.', 'ok');
      }
      if (typeof exitReadingWorkspace === 'function') exitReadingWorkspace();
      if (typeof exitWritingWorkspace === 'function') exitWritingWorkspace();
      if (typeof closeStartQuizModal === 'function') closeStartQuizModal();
      if (typeof currentScreen !== 'undefined' && currentScreen !== 'home') {
        if (typeof go === 'function') go('home');
      }
    },

    // LẤY DANH SÁCH TẤT CẢ TÀI KHOẢN (Quản trị viên & Giáo viên)
    async getAllAccounts() {
      if (!this.canManageAccounts()) {
        throw new Error('Chỉ Quản trị viên và Giáo viên mới có quyền xem danh sách tài khoản!');
      }
      if (typeof isSupabaseConfigured === 'function' && isSupabaseConfigured()) {
        try {
          const url = getUsersApiUrl('select=id,username,full_name,class_name,role,avatar,created_at,last_login&order=role.asc,id.asc');
          const res = await fetch(url, { method: 'GET', headers: getApiHeaders() });
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
              return sortAccountsByOfficialList(data);
            }
          }
        } catch (e) {
          console.warn('Lỗi tải danh sách tài khoản từ máy chủ:', e);
        }
      }
      return sortAccountsByOfficialList(getOfflineAccountsList());
    },

    // CẤP TÀI KHOẢN MỚI
    // - Quản trị viên: Toàn quyền cấp tài khoản Quản trị viên, Giáo viên, Học sinh
    // - Giáo viên: CHỈ ĐƯỢC PHÉP cấp tài khoản Học sinh
    async createAccount({ username, password, fullName, className, role, avatar }) {
      if (!this.canManageAccounts()) {
        return { success: false, error: 'Bạn không có quyền cấp tài khoản!' };
      }

      // Kiểm tra thẩm quyền phân vai trò
      let assignedRole = 'student';
      if (this.isAdmin()) {
        if (role === 'admin') assignedRole = 'admin';
        else if (role === 'teacher') assignedRole = 'teacher';
        else assignedRole = 'student';
      } else {
        // Giáo viên thường chỉ được cấp tài khoản Học sinh
        if (role && role !== 'student') {
          return {
            success: false,
            error: 'Giáo viên chỉ có quyền quản lý và cấp tài khoản Học sinh! Chỉ Quản trị viên mới có quyền cấp tài khoản Giáo viên hoặc Quản trị viên.'
          };
        }
        assignedRole = 'student';
      }

      const cleanUsername = String(username || '').trim().toLowerCase();
      if (!cleanUsername || cleanUsername.length < 3) {
        return { success: false, error: 'Tên đăng nhập phải có ít nhất 3 ký tự (không dấu, không khoảng cách)!' };
      }
      if (!/^[a-z0-9_.-]+$/.test(cleanUsername)) {
        return { success: false, error: 'Tên đăng nhập chỉ chứa chữ cái thường, số và ký tự dấu gạch (_ - .)' };
      }

      const cleanPassword = String(password || '').trim();
      if (!cleanPassword || cleanPassword.length < 4) {
        return { success: false, error: 'Mật khẩu phải có ít nhất 4 ký tự!' };
      }

      const cleanName = String(fullName || '').trim();
      if (!cleanName) {
        return { success: false, error: 'Vui lòng nhập Họ và tên người dùng!' };
      }

      const cleanClass = String(className || '').trim();
      const isStaffRole = assignedRole === 'teacher' || assignedRole === 'admin';
      const userAvatar = 'ion:' + (assignedRole === 'admin' ? 'shield-checkmark' : (assignedRole === 'teacher' ? 'ribbon' : 'person'));
      const passHash = await hashPassword(cleanPassword);
      const newId = 'usr_' + Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);

      if (typeof isSupabaseConfigured === 'function' && isSupabaseConfigured()) {
        try {
          // Kiểm tra xem tên đăng nhập đã tồn tại chưa
          const checkUrl = getUsersApiUrl(`username=eq.${encodeURIComponent(cleanUsername)}&select=id`);
          const checkRes = await fetch(checkUrl, { method: 'GET', headers: getApiHeaders() });
          if (checkRes.ok) {
            const existing = await checkRes.json();
            if (Array.isArray(existing) && existing.length > 0) {
              return { success: false, error: `Tên đăng nhập "${cleanUsername}" đã tồn tại! Vui lòng chọn tên khác.` };
            }
          }

          // Thêm bản ghi vào database
          const insertUrl = getUsersApiUrl();
          const insertRes = await fetch(insertUrl, {
            method: 'POST',
            headers: getApiHeaders({ 'Prefer': 'return=representation' }),
            body: JSON.stringify([{
              id: newId,
              username: cleanUsername,
              password_hash: passHash,
              full_name: cleanName,
              class_name: cleanClass,
              role: assignedRole,
              avatar: userAvatar
            }])
          });

          if (!insertRes.ok) {
            const errTxt = await insertRes.text();
            throw new Error(errTxt || 'Lỗi thêm tài khoản lên máy chủ.');
          }

          return {
            success: true,
            user: { id: newId, username: cleanUsername, full_name: cleanName, class_name: cleanClass, role: assignedRole, avatar: userAvatar }
          };
        } catch (e) {
          console.error(e);
          return { success: false, error: 'Lỗi khi lưu tài khoản vào cơ sở dữ liệu: ' + (e.message || e) };
        }
      }

      return { success: false, error: 'Cơ sở dữ liệu Supabase chưa được cấu hình!' };
    },

    // ĐẶT LẠI MẬT KHẨU TÀI KHOẢN
    // - Quản trị viên: Toàn quyền đặt lại cho Giáo viên, Học sinh & Admin
    // - Giáo viên: CHỈ ĐƯỢC PHÉP đặt lại cho Học sinh
    async resetUserPassword(userId, newPassword, targetRole) {
      if (!this.canManageAccounts()) {
        return { success: false, error: 'Bạn không có quyền đặt lại mật khẩu!' };
      }

      if (!this.isAdmin()) {
        if (targetRole === 'teacher' || targetRole === 'admin') {
          return { success: false, error: 'Giáo viên chỉ có quyền đặt lại mật khẩu cho Học sinh! Chỉ Quản trị viên mới có quyền thao tác trên tài khoản Giáo viên.' };
        }
        // Kiểm tra đối chiếu trên DB Supabase nếu có
        if (typeof isSupabaseConfigured === 'function' && isSupabaseConfigured()) {
          try {
            const checkUrl = getUsersApiUrl(`id=eq.${encodeURIComponent(userId)}&select=role`);
            const checkRes = await fetch(checkUrl, { method: 'GET', headers: getApiHeaders() });
            if (checkRes.ok) {
              const rows = await checkRes.json();
              if (rows[0] && (rows[0].role === 'teacher' || rows[0].role === 'admin')) {
                return { success: false, error: 'Giáo viên chỉ có quyền đặt lại mật khẩu cho Học sinh! Chỉ Quản trị viên mới có quyền thao tác trên tài khoản Giáo viên.' };
              }
            }
          } catch (_) {}
        }
      }

      const cleanPass = String(newPassword || '').trim();
      if (!cleanPass || cleanPass.length < 4) {
        return { success: false, error: 'Mật khẩu mới phải có ít nhất 4 ký tự!' };
      }

      const passHash = await hashPassword(cleanPass);
      if (typeof isSupabaseConfigured === 'function' && isSupabaseConfigured()) {
        const url = getUsersApiUrl(`id=eq.${encodeURIComponent(userId)}`);
        const res = await fetch(url, {
          method: 'PATCH',
          headers: getApiHeaders(),
          body: JSON.stringify({ password_hash: passHash })
        });
        if (!res.ok) return { success: false, error: 'Không thể cập nhật mật khẩu trên máy chủ.' };
        return { success: true };
      }
      return { success: false, error: 'Cơ sở dữ liệu chưa sẵn sàng.' };
    },

    // TỰ ĐỔI MẬT KHẨU CỦA CHÍNH MÌNH (Dành cho học sinh & giáo viên đang đăng nhập)
    async changeOwnPassword(oldPassword, newPassword) {
      const u = this.getCurrentUser();
      if (!u) return { success: false, error: 'Vui lòng đăng nhập trước khi đổi mật khẩu!' };

      const cleanOld = String(oldPassword || '').trim();
      const cleanNew = String(newPassword || '').trim();
      if (!cleanNew || cleanNew.length < 4) {
        return { success: false, error: 'Mật khẩu mới phải có ít nhất 4 ký tự!' };
      }

      const oldHash = await hashPassword(cleanOld);
      const newHash = await hashPassword(cleanNew);

      if (typeof isSupabaseConfigured === 'function' && isSupabaseConfigured()) {
        // Kiểm tra mật khẩu cũ trước
        const checkUrl = getUsersApiUrl(`id=eq.${encodeURIComponent(u.id)}&select=password_hash`);
        const checkRes = await fetch(checkUrl, { method: 'GET', headers: getApiHeaders() });
        if (checkRes.ok) {
          const rows = await checkRes.json();
          if (rows[0] && rows[0].password_hash !== oldHash) {
            return { success: false, error: 'Mật khẩu hiện tại không đúng!' };
          }
        }

        // Cập nhật
        const updateUrl = getUsersApiUrl(`id=eq.${encodeURIComponent(u.id)}`);
        const updateRes = await fetch(updateUrl, {
          method: 'PATCH',
          headers: getApiHeaders(),
          body: JSON.stringify({ password_hash: newHash })
        });
        if (!updateRes.ok) return { success: false, error: 'Lỗi cập nhật mật khẩu trên máy chủ!' };
        return { success: true };
      }

      return { success: true };
    },

    // XÓA TÀI KHOẢN
    // - Quản trị viên: Toàn quyền xóa tài khoản Giáo viên & Học sinh (không thể tự xóa chính mình)
    // - Giáo viên: CHỈ ĐƯỢC PHÉP xóa tài khoản Học sinh
    async deleteAccount(userId, targetRole) {
      if (!this.canManageAccounts()) {
        return { success: false, error: 'Bạn không có quyền xóa tài khoản!' };
      }
      const u = this.getCurrentUser();
      if (u && (u.id === userId || u.username === userId)) {
        return { success: false, error: 'Bạn không thể tự xóa tài khoản đang đăng nhập!' };
      }

      if (!this.isAdmin()) {
        if (targetRole === 'teacher' || targetRole === 'admin') {
          return { success: false, error: 'Giáo viên chỉ có quyền quản lý và xóa tài khoản Học sinh! Chỉ Quản trị viên mới có quyền xóa tài khoản Giáo viên.' };
        }
        // Kiểm tra đối chiếu trên DB Supabase nếu có
        if (typeof isSupabaseConfigured === 'function' && isSupabaseConfigured()) {
          try {
            const checkUrl = getUsersApiUrl(`id=eq.${encodeURIComponent(userId)}&select=role`);
            const checkRes = await fetch(checkUrl, { method: 'GET', headers: getApiHeaders() });
            if (checkRes.ok) {
              const rows = await checkRes.json();
              if (rows[0] && (rows[0].role === 'teacher' || rows[0].role === 'admin')) {
                return { success: false, error: 'Giáo viên chỉ có quyền quản lý và xóa tài khoản Học sinh! Chỉ Quản trị viên mới có quyền xóa tài khoản Giáo viên.' };
              }
            }
          } catch (_) {}
        }
      }

      if (typeof isSupabaseConfigured === 'function' && isSupabaseConfigured()) {
        const url = getUsersApiUrl(`id=eq.${encodeURIComponent(userId)}`);
        const res = await fetch(url, { method: 'DELETE', headers: getApiHeaders() });
        if (!res.ok) return { success: false, error: 'Lỗi khi xóa tài khoản trên máy chủ!' };
        return { success: true };
      }
      return { success: false, error: 'Cơ sở dữ liệu chưa sẵn sàng.' };
    },

    // -----------------------------------------------------------------------
    // 4. ÁP DỤNG PHÂN QUYỀN VÀ CẬP NHẬT GIAO DIỆN TOÀN CỤC (RBAC UI SYNC)
    // -----------------------------------------------------------------------
    applyRolePermissions() {
      const u = this.getCurrentUser();
      const role = u ? u.role : 'guest';
      const isTeacher = this.isTeacher();
      const isStudent = this.isStudent();
      const isLoggedIn = Boolean(u);

      // Cập nhật trạng thái trên thẻ body
      document.body.dataset.userRole = role;
      document.body.dataset.isLoggedIn = isLoggedIn ? 'true' : 'false';

      // 1. CẬP NHẬT WIDGET NGƯỜI DÙNG TRÊN THANH NAVBAR
      this.renderNavbarUserWidget(u);

      // 2. CẬP NHẬT HEADER TRONG MENU MOBILE SIDEBAR
      this.renderMobileSidebarUser(u);

      // 3. ĐỒNG BỘ THÔNG TIN NGƯỜI HỌC VÀO CÁC Ô TÊN KHI LÀM BÀI
      if (u) {
        const nickInput = document.getElementById('nick');
        if (nickInput) nickInput.value = u.full_name || u.username;
        const classInput = document.getElementById('class-name');
        if (classInput) classInput.value = u.class_name || '';
        const startNick = document.getElementById('start-nick');
        if (startNick && !startNick.value) startNick.value = u.full_name || u.username;
        const startClass = document.getElementById('start-class-name');
        if (startClass && !startClass.value) startClass.value = u.class_name || '';
      }

      // 4. KIỂM SOÁT HIỂN THỊ CÁC NÚT BIÊN TẬP / SỬA / XÓA BỘ ĐỀ (CHỈ GIÁO VIÊN)
      document.querySelectorAll('.teacher-only').forEach(el => {
        el.style.display = isTeacher ? '' : 'none';
      });

      // 5. CẬP NHẬT CÁC MÀN HÌNH ĐANG HIỂN THỊ
      if (typeof currentScreen !== 'undefined') {
        if ((currentScreen === 'lib' || currentScreen === 'accounts') && isStudent) {
          if (typeof go === 'function') go('home');
        } else if (currentScreen === 'accounts' && isTeacher) {
          loadAndRenderAccounts();
        } else if (currentScreen === 'history') {
          if (typeof renderHistoryPage === 'function') renderHistoryPage();
          if (typeof loadQuizHistoryFromSupabase === 'function') loadQuizHistoryFromSupabase(false);
        } else if (currentScreen === 'lib' && typeof R !== 'undefined' && typeof R.lib === 'function') {
          R.lib();
        } else if (currentScreen === 'reading' && typeof R !== 'undefined' && typeof R.reading === 'function') {
          // Cập nhật danh sách đề đọc hiểu để ẩn/hiện nút Sửa/Xóa
          if (typeof renderReadingSetsList === 'function') renderReadingSetsList();
        } else if (currentScreen === 'writing' && typeof R !== 'undefined' && typeof R.writing === 'function') {
          // Cập nhật danh sách đề viết để ẩn/hiện nút Sửa/Xóa
          if (typeof renderWritingSetsList === 'function') renderWritingSetsList();
        }
      }

      // 6. KIỂM SOÁT NÚT CHẤM BÀI TRONG LỊCH SỬ
      const gradingBtn = document.getElementById('btn-toggle-grading-mode');
      if (gradingBtn) {
        gradingBtn.style.display = isTeacher ? 'inline-flex' : 'none';
      }
      const gradingToolbar = document.getElementById('history-detail-grading-toolbar');
      if (gradingToolbar && !isTeacher) {
        gradingToolbar.style.display = 'none';
      }
      const saveGradingFooter = document.getElementById('btn-save-grading-footer');
      if (saveGradingFooter && !isTeacher) {
        saveGradingFooter.style.display = 'none';
      }
    },

    // RENDER WIDGET PROFILE TRÊN NAVBAR
    renderNavbarUserWidget(u) {
      const container = document.getElementById('nav-user-widget');
      if (!container) return;

      if (!u) {
        // CHƯA ĐĂNG NHẬP
        container.innerHTML = `
          <button class="btn au sm nav-login-btn" type="button" onclick="openLoginDialog()" title="Đăng nhập để học và lưu tiến độ">
            <ion-icon name="log-in-outline"></ion-icon> <span class="nav-btn-label">Đăng nhập</span>
          </button>
        `;
        return;
      }

      // ĐÃ ĐĂNG NHẬP
      const isTeacher = u.role === 'teacher' || u.role === 'admin';
      let roleBadgeHtml = '';
      if (u.role === 'admin') {
        roleBadgeHtml = `<span class="user-role-badge admin"><ion-icon name="shield-checkmark-outline"></ion-icon> Quản trị viên</span>`;
      } else if (u.role === 'teacher') {
        roleBadgeHtml = `<span class="user-role-badge teacher"><ion-icon name="ribbon-outline"></ion-icon> Giáo viên</span>`;
      } else {
        roleBadgeHtml = `<span class="user-role-badge student"><ion-icon name="person-outline"></ion-icon> Học sinh</span>`;
      }
      const cleanClass = (u.class_name && !u.class_name.toLowerCase().includes('tổ ngữ văn')) ? u.class_name : '';
      const classText = cleanClass ? ` • ${esc(cleanClass)}` : '';

      container.innerHTML = `
        <div class="nav-user-pill" onclick="toggleUserDropdown(event)" title="Nhấp để xem menu tài khoản" tabindex="0" role="button" aria-haspopup="true">
          <div class="user-pill-avatar-wrap">
            ${renderAvatarMarkup(u, 'user-pill-avatar-img')}
            <span class="user-pill-status-dot"></span>
          </div>
          <div class="user-pill-text">
            <span class="user-pill-name">${esc(u.full_name || u.username)}</span>
            <div class="user-pill-meta">
              ${roleBadgeHtml}
              ${cleanClass ? `<span class="user-pill-class">Lớp ${esc(cleanClass)}</span>` : ''}
            </div>
          </div>
          <ion-icon name="chevron-down-outline" class="user-pill-arrow"></ion-icon>
        </div>

        <!-- DROPDOWN MENU -->
        <div class="user-dropdown-menu" id="user-dropdown-menu" style="display:none;" onclick="event.stopPropagation()">
          <div class="dropdown-header">
            <div class="dropdown-avatar-box">
              ${renderAvatarMarkup(u, 'dropdown-avatar-img')}
            </div>
            <div class="dropdown-info">
              <strong class="dropdown-name">${esc(u.full_name || u.username)}</strong>
              <div class="dropdown-meta">
                ${roleBadgeHtml}
                <span class="dropdown-username">@${esc(u.username)}</span>
                ${cleanClass ? `<span class="dropdown-class-badge">${esc(cleanClass)}</span>` : ''}
              </div>
            </div>
          </div>

          <div class="dropdown-divider"></div>

          <div class="dropdown-items">
            ${isTeacher ? `
              <button class="dropdown-item teacher-action" type="button" onclick="closeUserDropdown(); go('accounts');">
                <span class="dropdown-item-icon icon-purple">
                  <ion-icon name="people-outline"></ion-icon>
                </span>
                <span class="dropdown-item-label">Quản lý tài khoản</span>
                <ion-icon name="chevron-forward-outline" class="dropdown-item-chevron"></ion-icon>
              </button>
              <button class="dropdown-item teacher-action" type="button" onclick="closeUserDropdown(); go('history');">
                <span class="dropdown-item-icon icon-cyan">
                  <ion-icon name="time-outline"></ion-icon>
                </span>
                <span class="dropdown-item-label">Lịch sử &amp; Chấm bài</span>
                <ion-icon name="chevron-forward-outline" class="dropdown-item-chevron"></ion-icon>
              </button>
            ` : `
              <button class="dropdown-item" type="button" onclick="closeUserDropdown(); go('history');">
                <span class="dropdown-item-icon icon-cyan">
                  <ion-icon name="time-outline"></ion-icon>
                </span>
                <span class="dropdown-item-label">Lịch sử bài làm</span>
                <ion-icon name="chevron-forward-outline" class="dropdown-item-chevron"></ion-icon>
              </button>
            `}
            <button class="dropdown-item" type="button" onclick="closeUserDropdown(); openChangePasswordModal();">
              <span class="dropdown-item-icon icon-amber">
                <ion-icon name="lock-closed-outline"></ion-icon>
              </span>
              <span class="dropdown-item-label">Đổi mật khẩu</span>
              <ion-icon name="chevron-forward-outline" class="dropdown-item-chevron"></ion-icon>
            </button>
            <button class="dropdown-item" type="button" onclick="closeUserDropdown(); openSettingsDialog();">
              <span class="dropdown-item-icon icon-cyan">
                <ion-icon name="settings-outline"></ion-icon>
              </span>
              <span class="dropdown-item-label">Cài đặt</span>
              <ion-icon name="chevron-forward-outline" class="dropdown-item-chevron"></ion-icon>
            </button>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item danger" type="button" onclick="closeUserDropdown(); logoutUser();">
              <span class="dropdown-item-icon icon-red">
                <ion-icon name="log-out-outline"></ion-icon>
              </span>
              <span class="dropdown-item-label">Đăng xuất</span>
            </button>
          </div>
        </div>
      `;
    },

    // Đã bỏ phần đăng nhập / tài khoản ra khỏi sidebar (chỉ giữ trên navbar cho gọn)
    renderMobileSidebarUser(u) {
      const container = document.getElementById('sidebar-user-header');
      if (container) container.innerHTML = '';
    },

    // KHỞI ĐỘNG MODULE AUTH
    init() {
      loadStoredUser();
      this.applyRolePermissions();
      if (typeof R !== 'undefined') {
        R.accounts = function() {
          loadAndRenderAccounts();
        };
      }
    }
  };

  // -------------------------------------------------------------------------
  // 5. CÁC HÀM TƯƠNG TÁC GIAO DIỆN (UI DIALOGS & EVENTS)
  // -------------------------------------------------------------------------

  // DROPDOWN
  global.toggleUserDropdown = function(e) {
    if (e) e.stopPropagation();
    const menu = document.getElementById('user-dropdown-menu');
    const pill = document.querySelector('.nav-user-pill');
    if (!menu) return;
    const isShown = menu.classList.contains('show') || menu.style.display === 'block';
    if (isShown) {
      menu.classList.remove('show');
      menu.style.display = 'none';
      if (pill) pill.classList.remove('active');
    } else {
      menu.classList.add('show');
      menu.style.display = 'block';
      if (pill) pill.classList.add('active');
    }
  };

  global.closeUserDropdown = function() {
    const menu = document.getElementById('user-dropdown-menu');
    const pill = document.querySelector('.nav-user-pill');
    if (menu) {
      menu.classList.remove('show');
      menu.style.display = 'none';
    }
    if (pill) pill.classList.remove('active');
  };

  document.addEventListener('click', () => {
    global.closeUserDropdown();
  });

  // DIALOG ĐĂNG NHẬP
  global.openLoginDialog = function() {
    const dlg = document.getElementById('login-dialog');
    if (!dlg) return;
    const errBox = document.getElementById('login-error-msg');
    if (errBox) errBox.style.display = 'none';
    const form = document.getElementById('login-form');
    if (form) form.reset();
    try {
      if (typeof dlg.showModal === 'function') {
        if (!dlg.open) dlg.showModal();
      } else {
        dlg.setAttribute('open', '');
      }
    } catch (e) {
      dlg.setAttribute('open', '');
    }
    setTimeout(() => {
      document.getElementById('login-username')?.focus();
    }, 100);
  };

  global.closeLoginDialog = function() {
    const dlg = document.getElementById('login-dialog');
    if (!dlg) return;
    try {
      if (typeof dlg.close === 'function' && dlg.open) {
        dlg.close();
      } else {
        dlg.removeAttribute('open');
      }
    } catch (e) {
      dlg.removeAttribute('open');
    }
  };

  global.togglePasswordVisibility = function(inputId, btnEl) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const isPass = input.type === 'password';
    input.type = isPass ? 'text' : 'password';
    if (btnEl) btnEl.innerHTML = isPass ? '<ion-icon name="eye-off-outline"></ion-icon>' : '<ion-icon name="eye-outline"></ion-icon>';
  };

  // NÚT ĐIỀN NHANH TÀI KHOẢN MẪU ĐỂ TEST
  global.fillSampleAccount = function(role) {
    const userInput = document.getElementById('login-username');
    const passInput = document.getElementById('login-password');
    if (!userInput || !passInput) return;

    if (role === 'admin') {
      userInput.value = 'admin';
      passInput.value = 'admin9999';
    } else if (role === 'teacher') {
      userInput.value = 'giaovien';
      passInput.value = '123456';
    } else {
      userInput.value = 'hocsinh';
      passInput.value = '123456';
    }
    const errBox = document.getElementById('login-error-msg');
    if (errBox) errBox.style.display = 'none';
  };

  global.handleLoginSubmit = async function(e) {
    if (e) e.preventDefault();
    const userInput = document.getElementById('login-username');
    const passInput = document.getElementById('login-password');
    const submitBtn = document.getElementById('btn-submit-login');
    const errBox = document.getElementById('login-error-msg');

    const username = userInput ? userInput.value.trim() : '';
    const password = passInput ? passInput.value.trim() : '';

    if (!username || !password) {
      if (errBox) {
        errBox.textContent = 'Vui lòng nhập đầy đủ Tên đăng nhập và Mật khẩu!';
        errBox.style.display = 'block';
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon> Đang đăng nhập...';
    }
    if (errBox) errBox.style.display = 'none';

    try {
      const res = await Auth.login(username, password);
      if (res.success) {
        closeLoginDialog();
        const roleGreeting = (res.user.role === 'admin' ? 'Quản trị viên' : (res.user.role === 'teacher' ? 'Cô/Thầy' : 'Bạn'));
        toast(`Đăng nhập thành công! Chào mừng ${roleGreeting} ${res.user.full_name || res.user.username}`, 'ok');
      } else {
        if (errBox) {
          errBox.textContent = res.error || 'Đăng nhập không thành công!';
          errBox.style.display = 'block';
        }
      }
    } catch (err) {
      if (errBox) {
        errBox.textContent = 'Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại!';
        errBox.style.display = 'block';
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<ion-icon name="log-in-outline"></ion-icon> Đăng nhập';
      }
    }
  };

  global.logoutUser = function() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?')) {
      Auth.logout();
    }
  };

  // MÀN HÌNH QUẢN LÝ TÀI KHOẢN (DÀNH CHO GIÁO VIÊN)
  let cachedAccountsList = [];

  global.openAccountManagerModal = function() {
    if (!Auth.isTeacher()) {
      return toast('Chỉ tài khoản Giáo viên mới có quyền quản lý tài khoản!', 'bad');
    }
    go('accounts');
  };

  global.closeAccountManagerModal = function() {
    go('home');
  };

  // Đăng ký router
  if (typeof R !== 'undefined') {
    R.accounts = function() {
      loadAndRenderAccounts();
    };
  }

  global.loadAndRenderAccounts = loadAndRenderAccounts;

  global.resetAccountFilters = function() {
    const s = document.getElementById('acc-search-input');
    const r = document.getElementById('acc-filter-role');
    const c = document.getElementById('acc-filter-class');
    if (s) s.value = '';
    if (r) r.value = '';
    if (c) c.value = '';
    filterAccountsList();
  };

  async function loadAndRenderAccounts(showToast = false) {
    const tableBody = document.getElementById('account-table-body');
    const loadingEl = document.getElementById('account-manager-loading');
    if (loadingEl) loadingEl.style.display = 'block';
    if (tableBody) tableBody.innerHTML = '';

    try {
      const accounts = await Auth.getAllAccounts();
      cachedAccountsList = sortAccountsByOfficialList(accounts || []);
      renderAccountsTable(cachedAccountsList);
      updateAccountsStats(cachedAccountsList);
      populateAccountClassFilter(cachedAccountsList);
      if (showToast) {
        toast('Đã cập nhật danh sách tài khoản từ máy chủ!', 'ok');
      }
    } catch (e) {
      if (tableBody) {
        tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:var(--red);padding:24px;">⚠️ Lỗi tải danh sách tài khoản: ${esc(e.message)}</td></tr>`;
      }
    } finally {
      if (loadingEl) loadingEl.style.display = 'none';
    }
  }

  function updateAccountsStats(accounts) {
    const totalEl = document.getElementById('acc-stat-total');
    const adminEl = document.getElementById('acc-stat-admins');
    const teacherEl = document.getElementById('acc-stat-teachers');
    const studentEl = document.getElementById('acc-stat-students');

    const total = accounts.length;
    const admins = accounts.filter(a => a.role === 'admin').length;
    const teachers = accounts.filter(a => a.role === 'teacher').length;
    const students = accounts.filter(a => a.role === 'student' || (!a.role && a.role !== 'admin' && a.role !== 'teacher')).length;

    if (totalEl) totalEl.textContent = total;
    if (adminEl) adminEl.textContent = admins;
    if (teacherEl) teacherEl.textContent = teachers;
    if (studentEl) studentEl.textContent = students;
  }

  function populateAccountClassFilter(accounts) {
    const select = document.getElementById('acc-filter-class');
    if (!select) return;
    const currentVal = select.value;
    const classes = Array.from(new Set(accounts.map(a => a.class_name).filter(c => c && !c.toLowerCase().includes('tổ ngữ văn')))).sort();

    select.innerHTML = '<option value="">Tất cả các lớp</option>' +
      classes.map(c => `<option value="${esc(c)}" ${c === currentVal ? 'selected' : ''}>Lớp ${esc(c)}</option>`).join('');
  }

  global.filterAccountsList = function() {
    const searchVal = String(document.getElementById('acc-search-input')?.value || '').trim().toLowerCase();
    const roleVal = document.getElementById('acc-filter-role')?.value || '';
    const classVal = document.getElementById('acc-filter-class')?.value || '';

    const filtered = cachedAccountsList.filter(a => {
      const matchSearch = !searchVal ||
        a.username.toLowerCase().includes(searchVal) ||
        (a.full_name && a.full_name.toLowerCase().includes(searchVal)) ||
        (a.class_name && a.class_name.toLowerCase().includes(searchVal));
      const matchRole = !roleVal || a.role === roleVal;
      const matchClass = !classVal || a.class_name === classVal;
      return matchSearch && matchRole && matchClass;
    });

    renderAccountsTable(sortAccountsByOfficialList(filtered));
  };

  function renderAccountsTable(accounts) {
    const tableBody = document.getElementById('account-table-body');
    if (!tableBody) return;

    if (!accounts || accounts.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center; padding:32px; color:var(--mut);">
            Chưa có tài khoản nào phù hợp với bộ lọc tìm kiếm.
          </td>
        </tr>
      `;
      return;
    }

    const currentUser = Auth.getCurrentUser();
    const currentUserId = currentUser?.id;
    const currentUsername = currentUser?.username;
    const isCurrentAdmin = Auth.isAdmin();

    tableBody.innerHTML = accounts.map((acc, index) => {
      let roleBadge = '';
      let sttBadge = '';

      if (acc.role === 'admin') {
        roleBadge = `<span class="user-role-badge sm admin"><ion-icon name="shield-checkmark-outline"></ion-icon> Quản trị viên</span>`;
        sttBadge = `<span class="tag au sm" style="font-size:10.5px; font-weight:800; padding:2px 6px;">ADMIN</span>`;
      } else if (acc.role === 'teacher') {
        roleBadge = `<span class="user-role-badge sm teacher"><ion-icon name="ribbon-outline"></ion-icon> Giáo viên</span>`;
        sttBadge = `<span class="tag cy sm" style="font-size:11px; font-weight:800; padding:2px 7px;">GV</span>`;
      } else {
        roleBadge = `<span class="user-role-badge sm student"><ion-icon name="person-outline"></ion-icon> Học sinh</span>`;
        const officialStt = getStudentOfficialStt(acc);
        sttBadge = `<span style="font-weight:700; color:var(--ink); font-variant-numeric:tabular-nums;">${String(officialStt !== null ? officialStt : (index + 1)).padStart(2, '0')}</span>`;
      }

      const isSelf = (currentUserId === acc.id) || (currentUsername && currentUsername === acc.username);
      const isTargetStaff = (acc.role === 'teacher' || acc.role === 'admin');
      const canManageThisRow = isCurrentAdmin || (!isTargetStaff);

      const lastLoginStr = acc.last_login
        ? new Date(acc.last_login).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' })
        : 'Chưa đăng nhập';

      // Tạo nút thao tác dựa trên quyền hạn
      let actionsHtml = '';
      if (isSelf) {
        actionsHtml = `<span class="tag ok sm" title="Tài khoản của bạn" style="padding:4px 14px; font-weight:700;">Bạn</span>`;
      } else if (!canManageThisRow) {
        // Giáo viên nhìn thấy tài khoản Giáo viên hoặc Admin: không có quyền sửa/xóa
        actionsHtml = `
          <span class="tag mut sm" style="font-size:11px; font-weight:700; padding:4px 10px; opacity:0.85; display:inline-flex; align-items:center; gap:4px;" title="Giáo viên chỉ có quyền quản lý học sinh. Chỉ Quản trị viên mới được thao tác tài khoản này.">
            <ion-icon name="lock-closed-outline"></ion-icon> Chỉ Admin
          </span>
        `;
      } else {
        // Admin quản lý mọi tài khoản, hoặc Giáo viên quản lý học sinh
        actionsHtml = `
          <div class="acc-action-btns">
            <button class="btn cy sm" type="button" onclick="openResetPasswordModal('${esc(acc.id)}', '${esc(acc.username)}', '${esc(acc.full_name)}', '${esc(acc.role)}')" title="Đặt lại mật khẩu">
              <ion-icon name="key-outline"></ion-icon> Đổi MK
            </button>
            <button class="btn no sm" type="button" onclick="deleteUserAccountById('${esc(acc.id)}', '${esc(acc.username)}', '${esc(acc.role)}')" title="Xóa tài khoản">
              <ion-icon name="trash-outline"></ion-icon> Xóa
            </button>
          </div>
        `;
      }

      return `
        <tr>
          <td style="text-align:center;">${sttBadge}</td>
          <td>
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="width:30px; height:30px; border-radius:50%; overflow:hidden; flex-shrink:0; border:1.5px solid var(--stroke); box-shadow:0 1px 4px rgba(0,0,0,0.06);">
                ${renderAvatarMarkup(acc, 'table-avatar-img')}
              </div>
              <strong style="color:var(--primary); font-family:monospace; font-size:13.5px;">${esc(acc.username)}</strong>
            </div>
          </td>
          <td style="font-weight:700;">${esc(acc.full_name || '—')}</td>
          <td style="text-align:center;">${acc.class_name ? `<span class="tag cy sm">${esc(acc.class_name)}</span>` : '<span class="mut">—</span>'}</td>
          <td style="text-align:center;">${roleBadge}</td>
          <td style="font-size:12.5px; color:var(--mut); text-align:center; white-space:nowrap;">${lastLoginStr}</td>
          <td style="text-align:center;">${actionsHtml}</td>
        </tr>
      `;
    }).join('');
  }

  // DIALOG CẤP TÀI KHOẢN MỚI
  global.openCreateAccountModal = function() {
    if (!Auth.canManageAccounts()) {
      return toast('Bạn không có quyền cấp tài khoản!', 'bad');
    }
    const dlg = document.getElementById('create-account-dialog');
    if (!dlg) return;
    const form = document.getElementById('create-account-form');
    if (form) form.reset();
    const errBox = document.getElementById('create-account-error');
    if (errBox) errBox.style.display = 'none';

    // Cập nhật danh sách vai trò cho phép:
    // - Quản trị viên: Có thể cấp Học sinh, Giáo viên hoặc Quản trị viên
    // - Giáo viên: CHỈ ĐƯỢC CẤP HỌC SINH
    const roleSelect = document.getElementById('new-acc-role');
    if (roleSelect) {
      if (Auth.isAdmin()) {
        roleSelect.innerHTML = `
          <option value="student" selected>Học sinh (Làm bài, xem kết quả - Không sửa đề/chấm)</option>
          <option value="teacher">Giáo viên (Sửa đề, chấm bài &amp; quản lý học sinh)</option>
          <option value="admin">Quản trị viên (Toàn quyền quản lý GV &amp; Học sinh)</option>
        `;
      } else {
        roleSelect.innerHTML = `
          <option value="student" selected>Học sinh (Làm bài, xem kết quả - Giáo viên quản lý)</option>
        `;
      }
    }

    // Mặc định mật khẩu ban đầu
    const passInput = document.getElementById('new-acc-password');
    if (passInput) passInput.value = '123456';

    dlg.showModal();
    setTimeout(() => {
      document.getElementById('new-acc-username')?.focus();
    }, 100);
  };

  global.closeCreateAccountModal = function() {
    const dlg = document.getElementById('create-account-dialog');
    if (dlg && dlg.open) dlg.close();
  };

  global.handleCreateAccountSubmit = async function(e) {
    if (e) e.preventDefault();
    const username = document.getElementById('new-acc-username')?.value.trim();
    const password = document.getElementById('new-acc-password')?.value.trim();
    const fullName = document.getElementById('new-acc-fullname')?.value.trim();
    const className = document.getElementById('new-acc-class')?.value.trim();
    const role = document.getElementById('new-acc-role')?.value || 'student';
    const avatar = document.getElementById('new-acc-avatar')?.value || '🎓';
    const errBox = document.getElementById('create-account-error');
    const submitBtn = document.getElementById('btn-submit-create-account');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '⏳ Đang tạo...';
    }
    if (errBox) errBox.style.display = 'none';

    try {
      const res = await Auth.createAccount({ username, password, fullName, className, role, avatar });
      if (res.success) {
        closeCreateAccountModal();
        toast(`✅ Cấp tài khoản thành công cho: ${fullName} (@${username})!`, 'ok');
        await loadAndRenderAccounts();
      } else {
        if (errBox) {
          errBox.textContent = res.error || 'Không thể tạo tài khoản!';
          errBox.style.display = 'block';
        }
      }
    } catch (err) {
      if (errBox) {
        errBox.textContent = 'Lỗi: ' + (err.message || err);
        errBox.style.display = 'block';
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<ion-icon name="checkmark-circle-outline"></ion-icon> Lưu & Cấp tài khoản';
      }
    }
  };

  // DIALOG ĐẶT LẠI MẬT KHẨU
  let resetTargetUserId = null;
  let resetTargetUserRole = null;
  global.openResetPasswordModal = function(userId, username, fullName, role) {
    if (!Auth.canManageAccounts()) {
      return toast('Bạn không có quyền quản lý tài khoản!', 'bad');
    }
    if ((role === 'teacher' || role === 'admin') && !Auth.isAdmin()) {
      return toast('Giáo viên chỉ có quyền đặt lại mật khẩu cho Học sinh! Chỉ Quản trị viên mới được thao tác trên tài khoản Giáo viên.', 'bad');
    }

    resetTargetUserId = userId;
    resetTargetUserRole = role;
    const dlg = document.getElementById('reset-password-dialog');
    if (!dlg) return;
    const targetInfo = document.getElementById('reset-user-target-info');
    if (targetInfo) {
      let roleLabel = 'Học sinh';
      if (role === 'admin') roleLabel = 'Quản trị viên';
      else if (role === 'teacher') roleLabel = 'Giáo viên';
      targetInfo.textContent = `${fullName} (@${username}) • [${roleLabel}]`;
    }
    const input = document.getElementById('reset-new-password');
    if (input) input.value = '123456';
    const errBox = document.getElementById('reset-password-error');
    if (errBox) errBox.style.display = 'none';
    dlg.showModal();
  };

  global.closeResetPasswordModal = function() {
    const dlg = document.getElementById('reset-password-dialog');
    if (dlg && dlg.open) dlg.close();
    resetTargetUserId = null;
    resetTargetUserRole = null;
  };

  global.handleResetPasswordSubmit = async function(e) {
    if (e) e.preventDefault();
    if (!resetTargetUserId) return;
    const newPass = document.getElementById('reset-new-password')?.value.trim();
    const errBox = document.getElementById('reset-password-error');
    const submitBtn = document.getElementById('btn-submit-reset-password');

    if (!newPass || newPass.length < 4) {
      if (errBox) {
        errBox.textContent = 'Mật khẩu phải có ít nhất 4 ký tự!';
        errBox.style.display = 'block';
      }
      return;
    }

    if (submitBtn) submitBtn.disabled = true;

    try {
      const res = await Auth.resetUserPassword(resetTargetUserId, newPass, resetTargetUserRole);
      if (res.success) {
        closeResetPasswordModal();
        toast('✅ Đã đặt lại mật khẩu thành công!', 'ok');
      } else {
        if (errBox) {
          errBox.textContent = res.error || 'Lỗi đặt lại mật khẩu.';
          errBox.style.display = 'block';
        }
      }
    } catch (err) {
      if (errBox) {
        errBox.textContent = 'Lỗi: ' + (err.message || err);
        errBox.style.display = 'block';
      }
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  };

  // XÓA TÀI KHOẢN
  global.deleteUserAccountById = async function(userId, username, role) {
    if ((role === 'teacher' || role === 'admin') && !Auth.isAdmin()) {
      return toast('Giáo viên chỉ có quyền quản lý và xóa tài khoản Học sinh! Chỉ Quản trị viên mới được xóa tài khoản Giáo viên.', 'bad');
    }
    const roleLabel = role === 'admin' ? 'Quản trị viên' : (role === 'teacher' ? 'Giáo viên' : 'Học sinh');
    if (!confirm(`Bạn có chắc chắn muốn xóa tài khoản ${roleLabel} "@${username}" khỏi cơ sở dữ liệu? Người này sẽ không thể đăng nhập nữa.`)) {
      return;
    }
    try {
      const res = await Auth.deleteAccount(userId, role);
      if (res.success) {
        toast(`Đã xóa tài khoản "@${username}".`, 'ok');
        await loadAndRenderAccounts();
      } else {
        toast(res.error || 'Lỗi khi xóa tài khoản.', 'bad');
      }
    } catch (e) {
      toast('Lỗi xóa: ' + e.message, 'bad');
    }
  };

  // DIALOG TỰ ĐỔI MẬT KHẨU CÁ NHÂN
  global.openChangePasswordModal = function() {
    if (!Auth.isLoggedIn()) {
      return openLoginDialog();
    }
    const dlg = document.getElementById('change-password-dialog');
    if (!dlg) return;
    const form = document.getElementById('change-password-form');
    if (form) form.reset();
    const errBox = document.getElementById('change-password-error');
    if (errBox) errBox.style.display = 'none';
    dlg.showModal();
  };

  global.closeChangePasswordModal = function() {
    const dlg = document.getElementById('change-password-dialog');
    if (dlg && dlg.open) dlg.close();
  };

  global.handleChangePasswordSubmit = async function(e) {
    if (e) e.preventDefault();
    const oldPass = document.getElementById('change-old-password')?.value.trim();
    const newPass = document.getElementById('change-new-password')?.value.trim();
    const confirmPass = document.getElementById('change-confirm-password')?.value.trim();
    const errBox = document.getElementById('change-password-error');
    const submitBtn = document.getElementById('btn-submit-change-password');

    if (!oldPass || !newPass) {
      if (errBox) {
        errBox.textContent = 'Vui lòng nhập đầy đủ mật khẩu cũ và mới!';
        errBox.style.display = 'block';
      }
      return;
    }

    if (newPass !== confirmPass) {
      if (errBox) {
        errBox.textContent = 'Xác nhận mật khẩu mới không khớp!';
        errBox.style.display = 'block';
      }
      return;
    }

    if (newPass.length < 4) {
      if (errBox) {
        errBox.textContent = 'Mật khẩu mới phải có tối thiểu 4 ký tự!';
        errBox.style.display = 'block';
      }
      return;
    }

    if (submitBtn) submitBtn.disabled = true;

    try {
      const res = await Auth.changeOwnPassword(oldPass, newPass);
      if (res.success) {
        closeChangePasswordModal();
        toast('🎉 Đã đổi mật khẩu thành công!', 'ok');
      } else {
        if (errBox) {
          errBox.textContent = res.error || 'Không thể đổi mật khẩu!';
          errBox.style.display = 'block';
        }
      }
    } catch (err) {
      if (errBox) {
        errBox.textContent = 'Lỗi: ' + (err.message || err);
        errBox.style.display = 'block';
      }
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  };

  // XUẤT DANH SÁCH TÀI KHOẢN RA TỆP VĂN BẢN
  global.exportAccountsList = function() {
    if (!cachedAccountsList || !cachedAccountsList.length) {
      return toast('Không có tài khoản nào để xuất!', 'bad');
    }
    const sorted = sortAccountsByOfficialList(cachedAccountsList);
    let content = 'DANH SÁCH TÀI KHOẢN NGƯỜI DÙNG - HỆ THỐNG NGỮ VĂN (ADMIN • GIÁO VIÊN • HỌC SINH 12A2)\n';
    content += `Ngày xuất: ${new Date().toLocaleString('vi-VN')}\n`;
    content += '-----------------------------------------------------------------------------------------\n';
    content += 'STT   | Tên đăng nhập (Email)          | Họ và tên              | Lớp  | Vai trò        | Đăng nhập cuối\n';
    content += '------+--------------------------------+------------------------+------+----------------+---------------------\n';

    sorted.forEach((acc, i) => {
      let roleText = 'Học sinh';
      if (acc.role === 'admin') roleText = 'Quản trị viên';
      else if (acc.role === 'teacher') roleText = 'Giáo viên';

      const lastLogin = acc.last_login ? new Date(acc.last_login).toLocaleString('vi-VN') : 'Chưa đăng nhập';
      const officialStt = getStudentOfficialStt(acc);
      let sttText = String(officialStt !== null ? officialStt : (i + 1)).padStart(2, '0');
      if (acc.role === 'admin') sttText = 'ADMIN';
      else if (acc.role === 'teacher') sttText = 'GV';

      content += `${sttText.padEnd(5)} | ${acc.username.padEnd(30)} | ${(acc.full_name || '').padEnd(22)} | ${(acc.class_name || '').padEnd(4)} | ${roleText.padEnd(14)} | ${lastLogin}\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `danh_sach_tai_khoan_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast('Đã xuất danh sách tài khoản theo thứ tự chuẩn thành công!', 'ok');
  };

  // Expose to window
  global.Auth = Auth;

  // Tự động khởi chạy khi DOM sẵn sàng
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Auth.init());
  } else {
    Auth.init();
  }

})(window);
