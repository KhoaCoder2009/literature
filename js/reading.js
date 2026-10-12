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
      // Đảm bảo tất cả câu hỏi trong các bộ đề đều có maxScore
      loaded.forEach(s => {
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
          loaded.push(JSON.parse(JSON.stringify(def)));
        }
      });
      readingSets = loaded;
    } else {
      readingSets = JSON.parse(JSON.stringify(DEFAULT_READING_SETS));
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
function exitReadingWorkspace() {
  currentReadingSetId = null;
  if (typeof window !== 'undefined') window.currentReadingSetId = null;
  const listView = document.getElementById('reading-list-view');
  const workView = document.getElementById('reading-workspace-view');
  if (listView) listView.style.display = 'block';
  if (workView) workView.style.display = 'none';
  renderReadingListView();
}

function openReadingSet(id) {
  const set = readingSets.find(s => String(s.id) === String(id));
  if (!set) {
    toast('Không tìm thấy bộ đề đọc hiểu này!', 'bad');
    exitReadingWorkspace();
    return;
  }

  currentReadingSetId = set.id;
  if (typeof window !== 'undefined') window.currentReadingSetId = set.id;
  showReadingAnswers = false;

  const listView = document.getElementById('reading-list-view');
  const workView = document.getElementById('reading-workspace-view');
  if (listView) listView.style.display = 'none';
  if (workView) workView.style.display = 'block';

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

function renderReadingSetsGrid() {
  const container = document.getElementById('reading-sets-container');
  if (!container) return;

  // Filter sets
  const filteredSets = readingSets.filter(s => {
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
            <span>🏷️ ${esc(cat)}</span>
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
  const watermark = s.emo || '📖';

  const nbCount = qList.filter(q => q.level === 'nhan-biet' || (q.levelName && q.levelName.includes('Nhận biết'))).length;
  const thCount = qList.filter(q => q.level === 'thong-hieu' || (q.levelName && q.levelName.includes('Thông hiểu'))).length;
  const vdCount = qList.filter(q => q.level === 'van-dung' || (q.levelName && q.levelName.includes('Vận dụng'))).length;

  const isUserCreated = String(s.id).startsWith('reading_user_');

  // Snippet
  const snippet = (s.passage || '').trim().replace(/\r?\n+/g, ' ');
  const cleanSnippet = snippet.length > 170 ? snippet.slice(0, 170) + '…' : snippet;

  return `
    <div class="reading-h-card" onclick="openReadingSet('${esc(s.id)}')">
      <!-- Cột trái: Card Banner nổi bật dạng bìa sách/thẻ -->
      <div class="reading-h-banner" style="background: ${bg};">
        <div class="reading-h-banner-watermark">${watermark}</div>
        <span class="reading-h-count-pill">${qCount} câu hỏi</span>
        ${isUserCreated ? '<span class="reading-h-user-tag">✏️ Đề tự tạo</span>' : ''}
        <span class="reading-h-topic-pill" title="${esc(topic)}">${esc(topic)}</span>
      </div>

      <!-- Cột giữa: Toàn bộ thông tin chính của đề -->
      <div class="reading-h-body">
        <div class="reading-h-title-row">
          <h3 class="reading-h-title">${esc(s.title)}</h3>
        </div>

        ${(author || work) ? `
          <div class="reading-h-meta-tags">
            ${author ? `<span class="reading-h-meta-item">👤 <b>${esc(author)}</b></span>` : ''}
            ${work ? `<span class="reading-h-meta-item">📖 <i>${esc(work)}</i></span>` : ''}
          </div>
        ` : ''}

        <!-- Ma trận cấp độ chuẩn 5 câu -->
        <div class="reading-h-breakdown">
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
        <button class="btn au reading-h-btn-enter" type="button" onclick="openReadingSet('${esc(s.id)}')">
          <span>▶ Vào đọc hiểu</span>
        </button>
        ${isUserCreated ? `
          <div class="reading-h-mini-row">
            <button class="reading-h-mini-btn reading-h-btn-del" type="button" title="Xóa đề này" onclick="deleteReadingSet('${esc(s.id)}')">
              <span>🗑️ Xóa đề</span>
            </button>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// WORKSPACE RENDERING
function renderReadingWorkspace(set) {
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
          <div class="reading-q-header" style="display:flex; justify-content:space-between; align-items:center;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="reading-q-number">Câu ${idx + 1}</span>
              <span class="reading-q-level ${levelClass}">${esc(levelTitle)}</span>
            </div>
            <span class="tag cy" style="font-weight:800; font-size:12px; padding:2px 8px;">🎯 ${maxPts} điểm</span>
          </div>
          <div class="reading-q-text">${esc(q.text)}</div>
          <div class="reading-answer-box">
            <textarea
              class="reading-answer-textarea ${isParagraphQuestion ? 'reading-essay-textarea' : ''}"
              rows="${isParagraphQuestion ? 7 : 3}"
              placeholder="${isParagraphQuestion ? 'Viết đoạn văn khoảng 200 chữ tại đây (rút ra thông điệp hoặc liên hệ bài học cuộc sống)...' : 'Nhập câu trả lời của bạn...'}"
              oninput="handleReadingAnswerInput('${esc(set.id)}', '${esc(q.id || idx)}', this.value, ${idx}, ${isParagraphQuestion ? 'true' : 'false'})"
            >${esc(answerVal)}</textarea>
            ${isParagraphQuestion ? `
              <div class="reading-word-counter ${wcClass}" id="reading-wc-${idx}">
                <span>📝 Đếm từ:</span>
                <span class="wc-num">${words}</span> từ
                <span class="wc-note">${wcNote}</span>
              </div>
              <div class="reading-q-tip">
                💡 <b>Mẹo làm bài Câu ${idx + 1} (Đoạn văn):</b> Viết một đoạn văn hoàn chỉnh (khoảng 200 chữ). Cấu trúc gồm: <b>Mở đoạn</b> (dẫn dắt & nêu thông điệp), <b>Thân đoạn</b> (giải thích, vì sao cần trân trọng/thực hiện, dẫn chứng thực tế), <b>Kết đoạn</b> (bài học nhận thức và liên hệ bản thân).
              </div>
            ` : ''}
          </div>
          
          <div class="reading-guide-box" id="guide-box-${idx}" style="display: ${showReadingAnswers ? 'block' : 'none'};">
            <div class="reading-guide-label">
              <span>💡</span> <span>Gợi ý &amp; Đáp án tham khảo</span>
            </div>
            <div class="reading-guide-content" style="white-space:pre-wrap;">${esc(q.guide || 'Chưa có gợi ý chi tiết.')}</div>
          </div>
        </div>
      `;
    }).join('');
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

// TOGGLE ANSWERS GUIDE
function toggleReadingAnswersGuide() {
  showReadingAnswers = !showReadingAnswers;
  const guideBoxes = document.querySelectorAll('.reading-guide-box');
  guideBoxes.forEach(box => {
    box.style.display = showReadingAnswers ? 'block' : 'none';
  });
  updateAnswersToggleButtonState();
  toast(showReadingAnswers ? 'Đã hiển thị gợi ý đáp án' : 'Đã ẩn gợi ý đáp án', 'ok');
}

function updateAnswersToggleButtonState() {
  const btn = document.getElementById('btn-toggle-reading-answers');
  if (btn) {
    btn.innerHTML = showReadingAnswers 
      ? `<span>👁️‍🗨️</span> <span>Ẩn gợi ý đáp án</span>` 
      : `<span>💡</span> <span>Xem gợi ý đáp án</span>`;
    btn.classList.toggle('au', showReadingAnswers);
    btn.classList.toggle('gh', !showReadingAnswers);
  }
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
        if (noteEl) noteEl.textContent = '⚠️ Đoạn văn hơi dài (>230 chữ)';
      } else {
        wcEl.classList.add('wc-low');
        if (noteEl) noteEl.textContent = '(Đoạn văn tiêu chuẩn khoảng 200 chữ)';
      }
    }
  }

  const statusEl = document.getElementById('reading-save-status');
  if (statusEl) statusEl.textContent = '⏳ Đang lưu...';

  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(() => {
    try {
      const draft = getSavedReadingDraft(setId);
      draft[qId] = val;
      localStorage.setItem('vq_reading_draft_' + setId, JSON.stringify(draft));
      if (statusEl) statusEl.textContent = '💾 Đã lưu tự động';
    } catch (e) {
      if (statusEl) statusEl.textContent = '⚠️ Lỗi lưu trữ';
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
            <b>Đáp án / Gợi ý chuẩn:</b><br>
            ${esc(q.guide || 'Chưa có đáp án gợi ý.').replace(/\n/g, '<br>')}
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
      const pName = (localStorage.getItem('vq_player_nick') || '').trim() || 'Học sinh';
      const cName = (localStorage.getItem('vq_player_class') || '').trim();
      saveQuizAttemptToHistory({
        id: 'hist_' + uid(),
        timestamp: Date.now(),
        dateStr: new Date().toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }),
        type: 'reading',
        playerName: pName,
        className: cName,
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
          correctAnswer: q.guide || 'Chưa có đáp án gợi ý',
          status: 'saved',
          points: 0,
          explanation: ''
        }))
      });
      toast('🎉 Nộp bài thành công! Bài làm đọc hiểu đã được lưu vào Lịch sử.', 'ok');
    }
  } catch (e) {
    console.error('Save reading history error:', e);
  }
}

function closeReadingResultModal() {
  const modal = document.getElementById('reading-result-modal');
  if (modal && modal.open) modal.close();
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

  // Khởi tạo sẵn khung chuẩn 5 câu hỏi (2 Nhận biết • 2 Thông hiểu • 1 Vận dụng / Đoạn văn)
  applyStandard5QuestionTemplate(false);

  modal.showModal();
}

function openEditReadingSetModal(id) {
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

// KHUNG CHUẨN 5 CÂU HỎI THEO MA TRẬN ĐỀ THI (THANG ĐIỂM 6,0)
function applyStandard5QuestionTemplate(confirmBeforeReplace = true) {
  const qList = document.getElementById('reading-form-questions-list');
  if (!qList) return;

  if (confirmBeforeReplace && qList.children.length > 0) {
    if (!confirm('Bạn có muốn đặt lại danh sách câu hỏi theo Khung chuẩn 5 câu (Tổng 6,0 điểm: 2 Nhận biết • 2 Thông hiểu • 1 Vận dụng)?')) {
      return;
    }
  }

  qList.innerHTML = '';

  // Câu 1 & 2: Mức độ Nhận biết (1.0đ mỗi câu)
  addQuestionToReadingForm({
    level: 'nhan-biet',
    maxScore: 1.0,
    text: 'Xác định phương thức biểu đạt chính / thể thơ được sử dụng trong đoạn trích.',
    guide: '- Phương thức biểu đạt chính: Nghị luận / Tự sự / Miêu tả / Biểu cảm...\n- Thể thơ: Tự do / Bảy chữ / Lục bát...'
  });
  addQuestionToReadingForm({
    level: 'nhan-biet',
    maxScore: 1.0,
    text: 'Theo đoạn trích, [chi tiết / hình ảnh / sự việc] sinh trưởng / diễn ra như thế nào?',
    guide: '- Căn cứ trực tiếp vào câu chữ trong văn bản để trả lời ngắn gọn, chính xác.'
  });

  // Câu 3 & 4: Mức độ Thông hiểu (1.0đ mỗi câu)
  addQuestionToReadingForm({
    level: 'thong-hieu',
    maxScore: 1.0,
    text: 'Chỉ ra những điểm tương đồng / hiểu như thế nào về câu văn: "[trích dẫn cụm từ/câu văn]"?',
    guide: '- Ý nghĩa trực tiếp của câu nói / hình ảnh.\n- Ý nghĩa biểu tượng và thông điệp mà tác giả muốn gửi gắm.'
  });
  addQuestionToReadingForm({
    level: 'thong-hieu',
    maxScore: 1.0,
    text: 'Anh/chị có đồng tình với nhận định của tác giả: "[trích nhận định]"? Vì sao?',
    guide: '- Bày tỏ rõ quan điểm: Đồng tình / Không đồng tình.\n- Đưa ra 2-3 lý lẽ thuyết phục để lý giải vì sao.'
  });

  // Câu 5: Mức độ Vận dụng (Rút ra thông điệp hoặc liên hệ bài học cuộc sống)(Đoạn văn - 2.0đ)
  addQuestionToReadingForm({
    level: 'van-dung',
    maxScore: 2.0,
    text: 'Từ nội dung đoạn trích ở phần đọc hiểu, anh/chị hãy viết một đoạn văn (khoảng 200 chữ) trình bày suy nghĩ của bản thân về sự cần thiết phải [rút ra thông điệp / liên hệ bài học cuộc sống].',
    guide: '1. Yêu cầu hình thức: Đoạn văn khoảng 200 chữ, diễn đạt mạch lạc, không xuống dòng.\n2. Yêu cầu nội dung:\n- Mở đoạn: Dẫn dắt vấn đề nghị luận từ ngữ liệu.\n- Thân đoạn: Giải thích ngắn gọn; phân tích vì sao; dẫn chứng thực tế; phản đề phê phán.\n- Kết đoạn: Bài học nhận thức và hành động của bản thân.'
  });

  renumberReadingFormQuestions();
  updateReadingModalTotalScore();
  if (confirmBeforeReplace) {
    toast('Đã nạp khung chuẩn 5 câu hỏi (Tổng 6,0 điểm) thành công!', 'ok');
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
          <span>🎯 Điểm tối đa:</span>
          <input type="number" class="q-score-input" step="0.25" min="0.25" max="10" value="${defaultScore}" oninput="updateReadingModalTotalScore()" style="width:68px; text-align:center; font-weight:800; font-size:13.5px; border-radius:8px; padding:3px 6px;">
          <span style="font-size:12px; font-weight:600; color:var(--mut);">đ</span>
        </label>
        <select class="q-level-input" style="font-size:13px; padding:4px 8px; border-radius:8px;">
          <option value="nhan-biet" ${data.level === 'nhan-biet' ? 'selected' : ''}>🟢 Nhận biết (Câu 1, 2)</option>
          <option value="thong-hieu" ${data.level === 'thong-hieu' ? 'selected' : ''}>🟡 Thông hiểu (Câu 3, 4)</option>
          <option value="van-dung" ${data.level === 'van-dung' ? 'selected' : ''}>🟣 Vận dụng - Đoạn văn (Câu 5)</option>
          <option value="van-dung-cao" ${data.level === 'van-dung-cao' ? 'selected' : ''}>🔴 Vận dụng cao (Mở rộng)</option>
        </select>
        <button type="button" class="btn no sm btn-icon-only" onclick="this.closest('.reading-modal-question-item').remove(); renumberReadingFormQuestions(); updateReadingModalTotalScore();" title="Xóa câu hỏi này">✕</button>
      </div>
    </div>
    <div style="margin-bottom:8px;">
      <textarea class="q-text-input" rows="2" placeholder="Nội dung câu hỏi..." style="width:100%; font-family:inherit;" required>${esc(data.text || '')}</textarea>
    </div>
    <div>
      <textarea class="q-guide-input" rows="2" placeholder="Gợi ý đáp án / Thang điểm / Hướng dẫn chấm..." style="width:100%; font-size:13.5px; font-family:inherit;">${esc(data.guide || '')}</textarea>
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
        questions
      };
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
      questions
    };
    readingSets.unshift(newSet);
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
  if (!currentReadingSetId) return;
  deleteReadingSet(currentReadingSetId);
  exitReadingWorkspace();
}

// CATEGORY MANAGEMENT
function promptAddNewReadingCategory() {
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
