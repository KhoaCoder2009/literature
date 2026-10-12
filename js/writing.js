/* =========================================================================
   WRITING PRACTICE MODULE (LUYỆN VIẾT VĂN THEO DÀN Ý)
   ========================================================================= */

const DEFAULT_WRITING_SETS = [
  {
    id: 'writing_sample_nlxh_kientri',
    category: 'nl-xh',
    categoryName: 'Nghị luận xã hội',
    icon: '🌱',
    title: 'Nghị luận xã hội (200 chữ): Ý nghĩa của lòng kiên trì',
    prompt: 'Viết một đoạn văn (khoảng 200 chữ) trình bày suy nghĩ của anh/chị về ý nghĩa của lòng kiên trì trên con đường vươn tới thành công của mỗi con người trong cuộc sống hiện đại.',
    sections: [
      {
        id: 'sec_mo_bai',
        title: 'Mở bài',
        placeholder: 'Nhập phần mở bài / mở đoạn tại đây...',
        guide: 'Dẫn dắt trực tiếp và nêu vấn đề nghị luận: Lòng kiên trì là chiếc la bàn và kim chỉ nam dẫn lối đến thành công của mỗi con người trong cuộc sống hiện đại.',
        sample: 'Trên hành trình vươn tới ước mơ, kiên trì chính là chiếc la bàn vững chắc và là kim chỉ nam giúp mỗi con người vượt qua mọi giông bão cuộc đời để chạm tới thành công.'
      },
      {
        id: 'sec_than_bai',
        title: 'Thân bài',
        placeholder: 'Nhập phần thân bài / thân đoạn tại đây...',
        guide: '1. Giải thích: Kiên trì là sự bền bỉ, nhẫn nại theo đuổi mục tiêu dù gặp muôn vàn khó khăn, thử thách mà không hề bỏ cuộc giữa chừng.\n2. Bàn luận & Dẫn chứng: Lòng kiên trì rèn giũa bản lĩnh thép, biến trở ngại thành cơ hội và tích lũy tri thức. Dẫn chứng: Nhà bác học Thomas Edison kiên trì thử nghiệm hàng nghìn lần mới phát minh ra bóng đèn điện; Thầy giáo Nguyễn Ngọc Ký kiên trì tập viết bằng chân...\n3. Phản đề & Mở rộng: Phê phán lối sống thiếu kiên nhẫn, "cả thèm chóng chán", thấy gian nan đã vội vàng buông xuôi.',
        sample: 'Trước hết, kiên trì là sự bền bỉ, nhẫn nại theo đuổi mục tiêu đã đề ra, dẫu phải đối mặt với muôn vàn khó khăn, thất bại mà không hề chùn bước hay bỏ cuộc giữa chừng. Lòng kiên trì rèn giũa cho ta bản lĩnh thép, giúp biến những thử thách thành bệ phóng tôi luyện trí tuệ và nghị lực. Người kiên trì luôn tìm thấy cơ hội trong nghịch cảnh; như Thomas Edison đã trải qua hàng nghìn lần thử nghiệm thất bại trước khi thắp sáng nhân loại bằng bóng đèn điện. Trái lại, những kẻ thiếu kiên nhẫn, "cả thèm chóng chán", vừa thấy gian nan đã vội vàng buông xuôi sẽ mãi dậm chân tại chỗ và khó có thể chạm tay vào quả ngọt của thành công.'
      },
      {
        id: 'sec_ket_bai',
        title: 'Kết bài',
        placeholder: 'Nhập phần kết bài / kết đoạn tại đây...',
        guide: 'Khái quát lại ý nghĩa của lòng kiên trì; rút ra bài học nhận thức và phương hướng hành động cụ thể cho bản thân trong học tập và cuộc sống.',
        sample: 'Tóm lại, thành công không đến sau một đêm mà là kết tinh của chuỗi ngày bền bỉ nỗ lực. Là học sinh, em tự nhắc nhở mình phải luôn kiên định với mục tiêu học tập, không ngừng tôi luyện ý chí để vững bước tương lai.'
      }
    ]
  },
  {
    id: 'writing_sample_nlvh_taytien',
    category: 'nl-vh',
    categoryName: 'Nghị luận văn học',
    icon: '📜',
    title: 'Nghị luận văn học: Hình tượng người lính Tây Tiến (Quang Dũng)',
    prompt: 'Cảm nhận về vẻ đẹp hào hùng và bi tráng của hình tượng người lính Tây Tiến trong đoạn thơ: "Tây Tiến đoàn binh không mọc tóc / Quân xanh màu lá dữ oai hùm / Mắt trừng gửi mộng qua biên giới / Đêm mơ Hà Nội dáng kiều thơm..." (Tây Tiến - Quang Dũng).',
    sections: [
      {
        id: 'sec_mo_bai',
        title: 'Mở bài',
        placeholder: 'Nhập phần mở bài tại đây...',
        guide: 'Giới thiệu tác giả Quang Dũng (hồn thơ phóng khoáng, hồn hậu, lãng mạn), bài thơ "Tây Tiến" và đoạn thơ khắc họa chân dung kiêu hùng của đoàn binh.',
        sample: 'Quang Dũng là một nghệ sĩ đa tài, một hồn thơ phóng khoáng, hồn hậu và lãng mạn. Nhắc đến ông, người đọc không thể không nhớ đến "Tây Tiến" - bài ca tuyệt tác về những người lính thời kỳ kháng chiến chống Pháp. Đặc biệt, vẻ đẹp hào hùng và bi tráng của người lính Tây Tiến được kết tinh rực rỡ nhất qua đoạn thơ khắc họa chân dung kiêu hùng của họ.'
      },
      {
        id: 'sec_than_bai',
        title: 'Thân bài',
        placeholder: 'Nhập phần thân bài tại đây...',
        guide: '1. Luận điểm 1: Vẻ đẹp hào hùng, dữ dội - Hiện thực chiến tranh khốc liệt ("không mọc tóc", "quân xanh màu lá") được nâng lên tầm vóc phi thường qua ngòi bút lãng mạn ("dữ oai hùm").\n2. Luận điểm 2: Tâm hồn hào hoa, lãng mạn - Khát vọng chiến đấu qua biên giới gắn liền với nỗi nhớ quê hương ("Mắt trừng gửi mộng qua biên giới / Đêm mơ Hà Nội dáng kiều thơm").\n3. Đánh giá nghệ thuật: Bút pháp lãng mạn kết hợp cảm hứng bi tráng, ngôn từ giàu tính tạo hình và nhạc điệu.',
        sample: 'Ngay từ những câu thơ đầu, Quang Dũng không hề né tránh hiện thực khốc liệt của chiến tranh. Căn bệnh sốt rét rừng hiểm ác đã khiến đoàn binh "không mọc tóc", làn da "xanh màu lá". Thế nhưng, qua ngòi bút lãng mạn, hiện thực ấy không hề gợi sự tiều tụy mà trái lại toát lên khí phách hiên ngang "dữ oai hùm" như những vị chúa sơn lâm làm chủ đại ngàn. Bên cạnh nét hào hùng là một thế giới nội tâm vô cùng lãng mạn, hào hoa của những chàng trai đất Hà thành. "Mắt trừng" chứa chan ý chí căm thù giặc và khát vọng chiến đấu qua biên giới; nhưng khi đêm về, tâm hồn họ lại hướng về quê hương với "dáng kiều thơm" - nguồn động lực tinh thần diệu kỳ sưởi ấm những đêm đông lạnh giá nơi chiến trường. Với thể thơ thất ngôn giàu nhạc điệu, kết hợp giữa từ ngữ Hán Việt cổ kính và ngôn ngữ đời thường, Quang Dũng đã khắc họa thành công bức tượng đài bi tráng về người lính cách mạng.'
      },
      {
        id: 'sec_ket_bai',
        title: 'Kết bài',
        placeholder: 'Nhập phần kết bài tại đây...',
        guide: 'Tổng kết giá trị nội dung và nghệ thuật của đoạn trích; khẳng định sức sống bất diệt của hình tượng người lính Tây Tiến trong dòng chảy văn học dân tộc.',
        sample: 'Với bút pháp lãng mạn kết hợp chất bi tráng hào hùng, Quang Dũng đã dựng nên một tượng đài bất tử về người lính vệ quốc. Đoạn thơ không chỉ là khúc ca tri ân thế hệ cha anh mà còn khơi dậy trong lòng mỗi chúng ta niềm tự hào sâu sắc và ý thức trách nhiệm đối với non sông đất nước hôm nay.'
      }
    ]
  },
  {
    id: 'writing_sample_nlxh_tuhoc',
    category: 'nl-xh',
    categoryName: 'Nghị luận xã hội',
    icon: '💡',
    title: 'Nghị luận xã hội: Tinh thần tự học trong thời đại số',
    prompt: 'Viết bài văn ngắn trình bày suy nghĩ của anh/chị về vai trò của tinh thần tự học đối với thế hệ trẻ trong kỷ nguyên bùng nổ công nghệ thông tin ngày nay.',
    sections: [
      {
        id: 'sec_mo_bai',
        title: 'Mở bài',
        placeholder: 'Nhập phần mở bài tại đây...',
        guide: 'Dẫn dắt trực tiếp hoặc trích dẫn câu danh ngôn về việc học (Lênin, Bác Hồ), giới thiệu vai trò sống còn của tinh thần tự học trong kỷ nguyên 4.0.',
        sample: '"Học, học nữa, học mãi" - lời dạy của V.I.Lênin chưa bao giờ mất đi tính thời sự. Đặc biệt trong thế kỷ 21, khi tri thức nhân loại biến đổi từng ngày, tinh thần tự học chính là chiếc chìa khóa vàng giúp người trẻ mở cánh cửa thành công và khẳng định giá trị bản thân.'
      },
      {
        id: 'sec_than_bai',
        title: 'Thân bài',
        placeholder: 'Nhập phần thân bài tại đây...',
        guide: '1. Giải thích: Tự học là quá trình chủ động, tự giác lĩnh hội kiến thức, kỹ năng mà không phụ thuộc vào sự thúc ép.\n2. Bàn luận & Dẫn chứng: Tự học giúp người học làm chủ công nghệ, thích ứng nhanh với biến động thời đại, rèn tư duy phản biện và khả năng sáng tạo. Dẫn chứng: Tấm gương Bác Hồ tự học ngoại ngữ và văn hóa thế giới...\n3. Phản đề: Phê phán lối học vẹt, thụ động, ỷ lại vào thiết bị điện tử hoặc gian lận thi cử.',
        sample: 'Tự học là quá trình chủ động, tự giác chiếm lĩnh tri thức mà không phụ thuộc vào sự ép buộc của người khác. Trong thời đại số, tự học biểu hiện qua việc biết tìm kiếm, chọn lọc thông tin trên mạng, tự rèn luyện kỹ năng qua các khóa học trực tuyến và luôn tò mò, khám phá những chân trời kiến thức mới. Tinh thần tự học giúp mỗi người chủ động làm chủ cuộc sống, không bị động trước những thay đổi nhanh chóng của xã hội. Hơn thế, tự học rèn luyện tư duy độc lập, sáng tạo và bản lĩnh kiên trì. Chủ tịch Hồ Chí Minh là tấm gương sáng ngời về tinh thần tự học: từ bến cảng Nhà Rồng ra đi tìm đường cứu nước, Người đã tự học nhiều thứ tiếng và tinh hoa văn hóa nhân loại để lãnh đạo cách mạng Việt Nam thành công. Ngược lại, nếu chỉ học một cách thụ động, ỷ lại vào trí tuệ nhân tạo hay phó mặc cho trường lớp, người trẻ sẽ dễ dàng bị tụt hậu và đào thải.'
      },
      {
        id: 'sec_ket_bai',
        title: 'Kết bài',
        placeholder: 'Nhập phần kết bài tại đây...',
        guide: 'Khẳng định lại ý nghĩa to lớn của tinh thần tự học; rút ra bài học nhận thức và phương hướng hành động cho bản thân học sinh.',
        sample: 'Khép lại trang sách, mỗi chúng ta cần nhận thức sâu sắc rằng: đường đời là một cái thang không có nấc chót và việc học là quyển sách không có trang cuối. Là học sinh, em nguyện không ngừng trau dồi tinh thần tự giác học tập mỗi ngày để trở thành công dân có ích cho quê hương.'
      }
    ]
  },
  {
    id: 'writing_sample_camthu_song',
    category: 'cam-thu',
    categoryName: 'Cảm thụ văn học',
    icon: '🌊',
    title: 'Cảm thụ văn học: Khát vọng tình yêu trong bài thơ "Sóng" (Xuân Quỳnh)',
    prompt: 'Viết đoạn văn cảm nhận về khát vọng lý giải tình yêu của người phụ nữ qua khổ thơ: "Trước muôn trùng sóng bể / Em nghĩ về anh, em / Em nghĩ về biển lớn / Từ nơi nào sóng lên? / Gió bắt đầu từ đâu? / Gió bắt đầu từ gió / Gió bắt đầu từ đâu? / Em cũng không biết nữa / Khi nào ta yêu nhau" (Sóng - Xuân Quỳnh).',
    sections: [
      {
        id: 'sec_mo_bai',
        title: 'Mở bài',
        placeholder: 'Nhập phần mở bài / mở đoạn tại đây...',
        guide: 'Giới thiệu tác giả Xuân Quỳnh (hồn thơ giàu nữ tính, chân thành, da diết) và đoạn thơ thể hiện khát vọng lý giải tình yêu trong thi phẩm "Sóng".',
        sample: 'Xuân Quỳnh là một trong những gương mặt tiêu biểu của thơ ca kháng chiến chống Mỹ với hồn thơ giàu nữ tính, chân thành và luôn khắc khoải khát vọng hạnh phúc đời thường. Trong thi phẩm "Sóng", khổ thơ thứ ba và thứ tư đã lắng đọng nỗi niềm trăn trở muôn thuở của người phụ nữ khi đứng trước biển lớn tình yêu.'
      },
      {
        id: 'sec_than_bai',
        title: 'Thân bài',
        placeholder: 'Nhập phần thân bài / thân đoạn tại đây...',
        guide: '1. Cảm nhận & Phân tích: Đứng trước "muôn trùng sóng bể", người con gái soi mình vào sóng để tự nhận thức ("Em nghĩ về anh, em / Em nghĩ về biển lớn"). Điệp từ "nghĩ" thể hiện sự suy tư sâu lắng.\n2. Khát vọng truy tìm khởi nguồn tình yêu: Chuỗi câu hỏi tu từ về sóng và gió dẫn đến phát hiện tự nhiên, chân thực ("Em cũng không biết nữa / Khi nào ta yêu nhau"). Tình yêu huyền diệu và bí ẩn như thiên nhiên vạn vật.\n3. Đánh giá nghệ thuật: Thể thơ năm chữ giàu nhịp điệu, cấu tứ sóng đôi giữa sóng và em.',
        sample: 'Đứng trước "muôn trùng sóng bể", người con gái soi mình vào sóng để tự nhận thức: "Em nghĩ về anh, em / Em nghĩ về biển lớn". Điệp từ "nghĩ" vang lên như một nhịp đập thổn thức, suy tư. Từ trăn trở về nguồn gốc của sóng và gió: "Từ nơi nào sóng lên? / Gió bắt đầu từ đâu?", nhân vật trữ tình đã đi đến một phát hiện đầy nữ tính và chân thực: "Em cũng không biết nữa / Khi nào ta yêu nhau". Tình yêu giống như sóng biển và gió trời, bí ẩn, tự nhiên và không thể lý giải bằng lý trí thuần túy mà chỉ có thể cảm nhận bằng trái tim.'
      },
      {
        id: 'sec_ket_bai',
        title: 'Kết bài',
        placeholder: 'Nhập phần kết bài / kết đoạn tại đây...',
        guide: 'Tổng kết giá trị tư tưởng và nét đặc sắc nghệ thuật; chia sẻ cảm xúc và rung động sâu sắc của bản thân.',
        sample: 'Bằng thể thơ năm chữ nhịp nhàng như những con sóng vỗ, Xuân Quỳnh đã vẽ nên một nét duyên dáng, đáng yêu của người phụ nữ đang yêu: hồn nhiên, thành thật trước quy luật bất biến của tình cảm muôn đời.'
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
        // Loại bỏ sạch các bộ đề IELTS cũ hoặc tên liên quan IELTS
        parsed = parsed.filter(s => 
          s &&
          s.category !== 'ielts-task1' &&
          s.category !== 'ielts-task2' &&
          !String(s.id).includes('ielts') &&
          !String(s.title).toLowerCase().includes('ielts')
        ).map(s => {
          if (s.category === 'other') {
            s.category = 'nl-xh';
            s.categoryName = 'Nghị luận xã hội';
            s.icon = '🌱';
          }
          return s;
        });

        const existingIds = new Set(parsed.map(s => s.id));
        for (const def of DEFAULT_WRITING_SETS) {
          if (!existingIds.has(def.id)) {
            parsed.push(def);
          }
        }
        writingSets = parsed;
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
  { id: 'nl-xh', name: 'Nghị luận xã hội', icon: '🌱' },
  { id: 'nl-vh', name: 'Nghị luận văn học', icon: '📜' },
  { id: 'cam-thu', name: 'Cảm thụ văn học', icon: '🌊' }
];

function getWritingCategories() {
  let list = null;
  try {
    const raw = localStorage.getItem('vq_writing_categories');
    if (raw) list = JSON.parse(raw);
  } catch (e) {}

  if (!Array.isArray(list) || list.length === 0) {
    list = [...DEFAULT_CATEGORIES];
    try {
      const custom = JSON.parse(localStorage.getItem('vq_writing_custom_cats')) || [];
      custom.forEach(c => {
        if (c && c.id && !list.some(x => x.id === c.id)) list.push(c);
      });
    } catch (e) {}
    saveWritingCategories(list);
  }

  return list.filter(c => c && c.id && c.id !== 'other');
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
        <span>${c.icon || '🏷️'} ${esc(c.name)}</span>
        <span class="w-chip-count">${count}</span>
        <span class="w-chip-del" onclick="event.stopPropagation(); promptDeleteCategory('${c.id}')" title="Xóa chủ đề '${esc(c.name)}'" aria-label="Xóa chủ đề">✕</span>
      </button>
    `;
  });

  container.innerHTML = html;
}

function promptAddNewCategory() {
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

  ask(confirmMsg, () => {
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

    // 4. Đồng bộ giao diện
    renderCategoryFilterBar();
    renderWritingSetsGrid();
    updateModalCategorySelect();
    toast(`Đã xóa chủ đề "${cat.name}" thành công!`, 'ok');
    if (typeof R !== 'undefined' && typeof R.lib === 'function') R.lib();
  });
}

function promptDeleteCurrentCategory() {
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
  'linear-gradient(135deg, #ef4444 0%, #f87171 100%)', // Red / Coral
  'linear-gradient(135deg, #f97316 0%, #fb923c 100%)', // Orange
  'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)', // Amber / Gold
  'linear-gradient(135deg, #15803d 0%, #22c55e 100%)', // Dark green
  'linear-gradient(135deg, #84cc16 0%, #a3e635 100%)', // Light green / Lime
  'linear-gradient(135deg, #14b8a6 0%, #2dd4bf 100%)', // Teal
  'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)', // Dark blue
  'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)', // Sky / Medium Blue
  'linear-gradient(135deg, #06b6d4 0%, #67e8f9 100%)', // Cyan
];

function renderWritingSetsGrid() {
  const container = $('#writing-sets-container') || $('#writing-sets-grid');
  if (!container) return;

  const query = ($('#writing-search-input')?.value || '').trim().toLowerCase();
  const cats = getWritingCategories();

  const renderCard = (s, idx = 0) => {
    const bg = WRITING_PALETTES[idx % WRITING_PALETTES.length];
    const sectionCount = s.sections ? s.sections.length : 0;
    const topic = s.categoryName || s.category || 'Luyện viết';
    const watermark = s.icon || '✍️';

    return `
      <div class="setup-grid-card" onclick="openWritingWorkspaceById('${esc(s.id)}')">
        <div class="setup-card-banner" style="background: ${bg}; position:relative;">
          <div class="setup-card-top-info" style="display:flex; justify-content:space-between; align-items:center; width:100%;">
            <span class="setup-card-count-pill">${sectionCount} phần dàn ý</span>
            <div style="display:flex; gap:4px; position:relative; z-index:2;" onclick="event.stopPropagation()">
              <button class="reading-h-mini-btn reading-h-btn-del" type="button" title="Xóa đề bài" onclick="event.stopPropagation(); deleteWritingSet('${esc(s.id)}')">🗑️</button>
            </div>
          </div>
          <h3 class="setup-card-title">${esc(s.title)}</h3>
          <span class="setup-card-watermark">${watermark}</span>
        </div>
        <div class="setup-card-body">
          <div style="display:flex; gap:8px; width:100%;">
            <button class="btn-setup-action" type="button" onclick="event.stopPropagation(); openWritingWorkspaceById('${esc(s.id)}')" style="flex:1;">
              <span class="btn-setup-icon">▶</span>
              <span>Vào luyện viết</span>
            </button>
          </div>
          <div class="setup-card-meta" style="margin-top:6px;">
            <span class="setup-card-topic" title="${esc(topic)}">
              🏷️ ${esc(topic)}
            </span>
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
      if (!query) return true;
      return (s.title && s.title.toLowerCase().includes(query)) ||
             (s.prompt && s.prompt.toLowerCase().includes(query));
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="writing-cat-header-bar">
          <div class="writing-cat-header-title">
            <span style="font-size: 24px;">${activeCat.icon || '🏷️'}</span>
            <div>
              <h3 style="margin: 0; font-size: 17px; font-weight: 800;">Chủ đề: ${esc(activeCat.name)}</h3>
              <span class="mut" style="font-size: 12.5px;">Chưa có bộ đề nào trong chủ đề này</span>
            </div>
          </div>
          <div class="writing-cat-header-actions">
            <button class="btn no sm" type="button" onclick="promptDeleteCategory('${activeCat.id}')" title="Xóa chủ đề này">
              <span>🗑️</span> <span>Xóa chủ đề này</span>
            </button>
          </div>
        </div>
        <div style="text-align:center; padding: 40px 20px;" class="card">
          <span style="font-size: 40px;">📝</span>
          <h3 style="margin: 12px 0 6px;">Chưa có bộ đề nào thuộc chủ đề "${esc(activeCat.name)}"</h3>
          <p class="mut">Hãy bấm nút bên dưới để tạo ngay bộ đề luyện viết hoặc xóa chủ đề nếu không dùng nữa!</p>
          <div style="display:flex; justify-content:center; gap:10px; margin-top:16px;">
            <button class="btn au sm" onclick="openCreateWritingSetModal('${currentWritingCategory}')">➕ Thêm bộ mới</button>
            <button class="btn no sm" onclick="promptDeleteCategory('${activeCat.id}')">🗑️ Xóa chủ đề này</button>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="writing-cat-header-bar">
        <div class="writing-cat-header-title">
          <span style="font-size: 24px;">${activeCat.icon || '🏷️'}</span>
          <div>
            <h3 style="margin: 0; font-size: 17px; font-weight: 800;">Chủ đề: ${esc(activeCat.name)}</h3>
            <span class="mut" style="font-size: 12.5px;">Đang hiển thị ${filtered.length} bộ đề</span>
          </div>
        </div>
        <div class="writing-cat-header-actions">
          <button class="btn au sm" onclick="openCreateWritingSetModal('${currentWritingCategory}')">
            <span>➕</span> <span>Thêm bộ mới</span>
          </button>
          <button class="btn no sm" type="button" onclick="promptDeleteCategory('${activeCat.id}')" title="Xóa chủ đề '${esc(activeCat.name)}'">
            <span>🗑️</span> <span>Xóa chủ đề này</span>
          </button>
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
    if (!query) return true;
    return (s.title && s.title.toLowerCase().includes(query)) ||
           (s.prompt && s.prompt.toLowerCase().includes(query)) ||
           (s.categoryName && s.categoryName.toLowerCase().includes(query));
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 40px 20px;" class="card">
        <span style="font-size: 40px;">🔍</span>
        <h3 style="margin: 12px 0 6px;">Không tìm thấy bộ đề phù hợp</h3>
        <p class="mut">Hãy thử tìm kiếm với từ khóa khác hoặc tự tạo một bộ đề mới!</p>
        <button class="btn au sm" onclick="openCreateWritingSetModal()">➕ Tạo bộ đề mới</button>
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
  currentWritingSet = set;
  if (typeof window !== 'undefined') window.currentWritingSetId = set.id;
  if ($('#writing-list-view')) $('#writing-list-view').style.display = 'none';
  if ($('#writing-workspace-view')) $('#writing-workspace-view').style.display = 'block';

  // Set Nav Title & Badge
  $('#workspace-set-title').textContent = set.title;
  $('#workspace-set-badge').textContent = set.categoryName || set.category;

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

  // Set Outline Card under Prompt
  const outlineContent = $('#workspace-outline-content');
  if (outlineContent) {
    if (set.sections && set.sections.length > 0) {
      outlineContent.innerHTML = set.sections.map((sec, idx) => `
        <div class="writing-outline-item">
          <b style="display:flex; align-items:center; gap:6px; font-size:14px; color:var(--primary);">
            <span>📌</span> <span>${idx + 1}. ${esc(sec.title)}</span>
          </b>
          ${sec.guide ? `
            <div class="writing-outline-text" style="color:var(--ink); margin-top:5px; line-height:1.6; font-size:13.5px; white-space:pre-line;">
              ${esc(sec.guide)}
            </div>
          ` : ''}
        </div>
      `).join('');
    } else {
      outlineContent.innerHTML = '<p class="mut">Chưa có dàn ý cho đề này.</p>';
    }
  }

  // Load existing draft
  loadDraftForCurrentSet();

  // Render Section Inputs in Right Panel
  renderWritingSections();

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

function exitWritingWorkspace() {
  saveCurrentWritingDraft(false);
  stopWritingTimer();
  clearInterval(autoSaveDraftTimer);
  currentWritingSet = null;
  if (typeof window !== 'undefined') window.currentWritingSetId = null;
  showWritingListView();
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
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="writing-section-count" id="sec-count-${sec.id}">
              ${wordCount} từ
            </span>
            <button type="button" class="writing-section-clear-btn" onclick="clearSectionText('${sec.id}')" title="Xóa nội dung đoạn này">
              ✕ Xóa đoạn
            </button>
          </div>
        </div>

        <textarea 
          id="sec-input-${sec.id}"
          class="writing-textarea" 
          placeholder="${esc(sec.placeholder || 'Nhập phần viết ' + sec.title + ' của bạn ở đây...')}"
          oninput="onSectionInput('${sec.id}', this)"
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
  const dlg = $('#writing-set-dialog');
  if (!dlg) return;

  const targetCat = presetCat || (currentWritingCategory !== 'all' ? currentWritingCategory : 'nl-xh');

  $('#writing-dialog-heading').textContent = 'Tạo bộ đề luyện viết mới';
  $('#edit-writing-set-id').value = '';
  $('#input-set-title').value = '';
  updateModalCategorySelect(targetCat);
  $('#input-set-prompt').value = '';

  // Nạp mẫu dàn ý theo dạng đề
  applyQuickOutlineTemplate(targetCat);

  dlg.showModal();
}

function editWritingSet(id) {
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
  if (cat === 'nl-vh') {
    editingSections = [
      {
        id: 'sec_' + uid(),
        title: 'Mở bài',
        guide: 'Giới thiệu tác giả, tác phẩm, hoàn cảnh sáng tác và vấn đề / đoạn trích / nhân vật cần phân tích, cảm nhận.',
        sample: ''
      },
      {
        id: 'sec_' + uid(),
        title: 'Thân bài',
        guide: '1. Luận điểm 1: Phân tích chi tiết nội dung, hình tượng và các tầng ý nghĩa của tác phẩm / đoạn trích.\n2. Luận điểm 2: Chiều sâu tư tưởng, cảm xúc của tác giả gửi gắm qua tác phẩm.\n3. Đánh giá đặc sắc nghệ thuật: Bút pháp, thể loại, kết cấu, ngôn ngữ, giọng điệu đặc trưng.',
        sample: ''
      },
      {
        id: 'sec_' + uid(),
        title: 'Kết bài',
        guide: 'Khái quát lại giá trị nội dung và nghệ thuật của tác phẩm; nêu ấn tượng, bài học và sức sống bền bỉ của tác phẩm trong lòng độc giả.',
        sample: ''
      }
    ];
  } else if (cat === 'cam-thu') {
    editingSections = [
      {
        id: 'sec_' + uid(),
        title: 'Mở bài',
        guide: 'Giới thiệu tác giả, tác phẩm và cảm nhận chung nhất về đoạn thơ / đoạn văn trích dẫn.',
        sample: ''
      },
      {
        id: 'sec_' + uid(),
        title: 'Thân bài',
        guide: '1. Cảm nhận về hình ảnh, chi tiết và từ ngữ đắt giá trong đoạn trích.\n2. Phân tích các biện pháp tu từ độc đáo và tác dụng gợi hình, gợi cảm.\n3. Tư tưởng, thông điệp và cảm xúc của nhân vật trữ tình / tác giả.',
        sample: ''
      },
      {
        id: 'sec_' + uid(),
        title: 'Kết bài',
        guide: 'Tổng kết giá trị tư tưởng và nét đặc sắc nghệ thuật; chia sẻ cảm xúc và liên hệ suy nghĩ bản thân.',
        sample: ''
      }
    ];
  } else {
    // Mặc định hoặc Nghị luận xã hội
    editingSections = [
      {
        id: 'sec_' + uid(),
        title: 'Mở bài',
        guide: 'Dẫn dắt trực tiếp hoặc gián tiếp, giới thiệu chính xác vấn đề nghị luận xã hội cần bàn luận.',
        sample: ''
      },
      {
        id: 'sec_' + uid(),
        title: 'Thân bài',
        guide: '1. Giải thích: Làm rõ khái niệm, biểu hiện của vấn đề trong thực tế đời sống.\n2. Bàn luận & Dẫn chứng: Phân tích nguyên nhân, vai trò, ý nghĩa; đưa ra dẫn chứng thực tế thuyết phục (người thật việc thật).\n3. Phản đề & Mở rộng: Phê phán những hành vi, nhận thức lệch lạc; nhìn nhận vấn đề đa chiều.',
        sample: ''
      },
      {
        id: 'sec_' + uid(),
        title: 'Kết bài',
        guide: 'Khái quát lại ý nghĩa vấn đề; rút ra bài học nhận thức và phương hướng hành động thiết thực cho bản thân.',
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
          <label class="modal-sub-label">💡 Dàn ý cho phần này (hiển thị dưới đề bài):</label>
          <textarea 
            placeholder="Nêu ý chính, định hướng luận cứ cần triển khai cho phần này..." 
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
        sections: JSON.parse(JSON.stringify(editingSections))
      };
      targetSet = writingSets[idx];
      toast('Đã cập nhật bộ đề luyện viết thành công!', 'ok');
    }
  } else {
    const newSet = {
      id: 'ws_' + uid(),
      title,
      category,
      categoryName: categoryNames[category] || category,
      icon: icons[category] || '✍️',
      prompt,
      sections: JSON.parse(JSON.stringify(editingSections))
    };
    writingSets.unshift(newSet);
    targetSet = newSet;
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
        suggestions.push(`💡 Đoạn văn nghị luận xã hội 200 chữ thường dao động từ 180 - 250 từ. Bạn đang có ${totalWords} từ, hãy mở rộng thêm dẫn chứng thực tế.`);
      } else if (totalWords > 350) {
        suggestions.push(`💡 Dung lượng khá dài (${totalWords} từ). Nếu là đề bài yêu cầu đoạn văn 200 chữ, bạn nên cô đọng lại các câu giải thích.`);
      } else {
        suggestions.push(`✅ Dung lượng rất phù hợp với dung lượng đoạn văn nghị luận xã hội (${totalWords} từ).`);
      }
    } else if (currentWritingSet.category === 'nl-vh') {
      if (totalWords < 400) {
        suggestions.push(`💡 Bài văn nghị luận văn học nên có từ 400 - 800 từ trở lên để phân tích sâu sắc cả nội dung và nghệ thuật (hiện có ${totalWords} từ).`);
      } else {
        suggestions.push(`✅ Dung lượng bài viết tương đối đầy đủ (${totalWords} từ).`);
      }
    } else if (currentWritingSet.category === 'cam-thu') {
      if (totalWords < 150) {
        suggestions.push(`💡 Đoạn văn cảm thụ nên phát triển từ 150 - 250 từ để làm nổi bật cái hay, cái đẹp của hình tượng ngôn từ.`);
      } else {
        suggestions.push(`✅ Dung lượng đoạn văn cảm thụ đạt chuẩn (${totalWords} từ).`);
      }
    }

    if (paragraphs.length < sections.length) {
      suggestions.push(`💡 Bạn còn ${sections.length - paragraphs.length} phần của bài viết chưa hoàn thành.`);
    } else {
      suggestions.push(`🎉 Bạn đã hoàn thành đầy đủ cả ${sections.length} phần của bài viết! Bố cục mạch lạc và đồng đều.`);
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

  const pName = (localStorage.getItem('vq_player_nick') || localStorage.getItem('vq_player_name') || '').trim() || 'Học sinh';
  const cName = (localStorage.getItem('vq_player_class') || '').trim();

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

    // 1. Đóng modal xem bài nếu đang mở
    if (typeof closeWritingReviewModal === 'function') {
      closeWritingReviewModal();
    }

    // 2. Thoát khỏi phòng viết văn và dọn dẹp bộ đếm
    if (typeof exitWritingWorkspace === 'function') {
      exitWritingWorkspace();
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

