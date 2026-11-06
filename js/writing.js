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

