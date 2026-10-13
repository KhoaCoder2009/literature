# 📖 HỆ THỐNG HỌC TẬP VÀ LUYỆN THI NGỮ VĂN TRỰC TUYẾN

> Nền tảng ôn luyện, thi thử và quản lý học tập môn Ngữ Văn hiện đại dành cho Giáo viên và Học sinh, tích hợp chấm điểm tự luận, thi trắc nghiệm tương tác, rèn luyện đọc hiểu và viết văn theo cấu trúc đề thi mới.

---

## 📑 MỤC LỤC
1. [Giới thiệu tổng quan](#1-giới-thiệu-tổng-quan)
2. [Cấu trúc thư mục dự án](#2-cấu-trúc-thư-mục-dự-án)
3. [Các phân hệ chức năng chính](#3-các-phân-hệ-chức-năng-chính)
4. [Cơ chế Phân quyền & Danh sách tài khoản](#4-cơ-chế-phân-quyền--danh-sách-tài-khoản)
5. [Tính năng Trạng thái Xuất bản (Published / Draft)](#5-tính-năng-trạng-thái-xuất-bản-published--draft)
6. [Hệ thống Bảo mật & Chống gian lận](#6-hệ-thống-bảo-mật--chống-gian-lận)
7. [Hướng dẫn cài đặt, chạy và đóng gói (Build)](#7-hướng-dẫn-cài-đặt-chạy-và-đóng-gói-build)
8. [Cơ sở dữ liệu Supabase Cloud](#8-cơ-sở-dữ-liệu-supabase-cloud)

---

## 1. Giới thiệu tổng quan

Hệ thống được xây dựng nhằm tối ưu hóa trải nghiệm giảng dạy và học tập môn Ngữ Văn:
- **Dành cho Giáo viên & Quản trị viên**: Soạn thảo bộ đề linh hoạt (Trắc nghiệm, Đọc hiểu, Nghị luận viết), quản lý ngân hàng câu hỏi, chấm bài tự luận trực tiếp với nhận xét chi tiết, quản lý danh sách học sinh.
- **Dành cho Học sinh**: Làm bài trắc nghiệm với hiệu ứng sinh động, luyện giải đề đọc hiểu bám sát ngữ liệu trích đoạn, luyện viết đoạn văn / bài văn với bộ đếm từ và đồng hồ canh giờ, xem lịch sử và kết quả bài làm.
- **Công nghệ nền tảng**: Kiến trúc Vanilla JavaScript module hóa, Vanilla CSS hiện đại kết hợp Glassmorphism, Ionicons offline, đóng gói tối ưu hóa bằng Node.js (`build.js`), lưu trữ đám mây qua Supabase REST API & LocalStorage offline fallback.

---

## 2. Cấu trúc thư mục dự án

Toàn bộ dự án đã được dọn dẹp sạch sẽ, loại bỏ hoàn toàn các file ảnh rác, dữ liệu mẫu không cần thiết và môi trường ảo thừa, cấu trúc chuẩn hóa như sau:

```text
├── assets/                          # Tài nguyên tĩnh của ứng dụng
│   ├── ionicons/                    # Bộ icon Ionicons ngoại tuyến (esm & cjs)
│   ├── aristotle.jpg                # Chân dung danh nhân (Banner danh ngôn)
│   ├── bac-ho.jpg                   # Chân dung Bác Hồ (Banner danh ngôn)
│   ├── gsap.min.js                  # Thư viện hiệu ứng chuyển động GSAP
│   ├── lenin.jpg                    # Chân dung V.I. Lê-nin (Banner danh ngôn)
│   ├── logo-nguvan.png              # Logo nhận diện thương hiệu chính
│   ├── mandela.jpg                  # Chân dung Nelson Mandela (Banner danh ngôn)
│   ├── three.min.js                 # Thư viện đồ họa 3D Three.js
│   └── victor-hugo.jpg              # Chân dung Victor Hugo (Banner danh ngôn)
│
├── components/                      # Các thành phần giao diện HTML mô-đun hóa
│   ├── components.js                # Bộ nạp injector tự động cho components
│   ├── dialogs.html                 # Các hộp thoại Modal (Đăng nhập, Tạo đề, Chấm điểm...)
│   ├── navbar.html                  # Thanh điều hướng phía trên (Header & Navigation)
│   ├── screen-accounts.html         # Màn hình Quản lý tài khoản (Admin & Giáo viên)
│   ├── screen-game.html             # Màn hình phòng thi trắc nghiệm (Quiz, Boss, Timed)
│   ├── screen-history.html          # Màn hình Lịch sử bài làm & Bàn chấm thi của giáo viên
│   ├── screen-home.html             # Màn hình Trang chủ (Hero Quotes, Chế độ luyện tập)
│   ├── screen-lib.html              # Màn hình Kho học liệu & Soạn thảo bộ đề
│   ├── screen-reading.html          # Màn hình Luyện Đọc hiểu (Split-view Ngữ liệu & Câu hỏi)
│   ├── screen-res.html              # Màn hình Bảng tổng kết kết quả thi
│   ├── screen-setup.html            # Màn hình Cài đặt phòng thi & chọn bộ đề
│   ├── screen-writing.html          # Màn hình Luyện Viết văn (Nghị luận xã hội & văn học)
│   └── settings-dialog.html         # Hộp thoại Cài đặt âm thanh, giao diện & hệ thống
│
├── css/                             # Mã nguồn stylesheet phân tầng
│   ├── reading.css                  # Giao diện phân hệ Đọc hiểu
│   ├── style.css                    # Toàn bộ Style cốt lõi, Header, Themes, Bảng điểm
│   └── writing.css                  # Giao diện phân hệ Luyện viết văn
│
├── dist/                            # Sản phẩm đóng gói (Distribution bundle)
│   ├── app.bundle.css               # CSS bundle gộp toàn bộ giao diện đã tối ưu
│   └── app.bundle.js                # JS bundle duy nhất nhúng sẵn HTML và mã bảo mật
│
├── js/                              # Mã nguồn logic JavaScript chia theo chức năng
│   ├── app.js                       # Điểm khởi chạy chính của ứng dụng
│   ├── audio.js                     # Quản lý âm thanh Web Audio & SFX
│   ├── auth.js                      # Xác thực đăng nhập, phân quyền RBAC & quản lý tài khoản
│   ├── core.js                      # Bộ định tuyến (Routing), hằng số, cấu hình bảo mật
│   ├── editor.js                    # Trình soạn thảo câu hỏi trắc nghiệm đa định dạng
│   ├── gameplay.js                  # Cơ chế chạy bài thi trắc nghiệm, tính điểm, đấu Boss
│   ├── library.js                   # Quản lý kho học liệu 3 tab (Bài học, Đọc hiểu, Viết)
│   ├── prompt.js                    # Tích hợp AI sinh đề thi tự động
│   ├── reading.js                   # Logic phân hệ Đọc hiểu (Bộ đề, lưu nháp, nộp bài)
│   ├── security.js                  # Lớp bảo vệ chống mở DevTools, chặn gian lận
│   ├── storage.js                   # Lưu trữ dữ liệu, chấm bài tự luận, đồng bộ Supabase
│   ├── visuals.js                   # Hiệu ứng Canvas hạt hoa rơi, đổi câu danh ngôn
│   └── writing.js                   # Logic phân hệ Luyện viết văn (Bộ đếm từ, hẹn giờ)
│
├── supabase/                        # Cấu hình máy chủ Supabase Backend
│   ├── functions/generate-questions # Edge function AI hỗ trợ tạo đề thi
│   ├── migrations/                  # Lịch sử cập nhật cấu trúc database
│   └── config.toml                  # File cấu hình dự án Supabase CLI
│
├── .env                             # Khóa môi trường bí mật Supabase (Anon Key & URL)
├── .gitignore                       # Danh sách loại trừ kiểm soát phiên bản Git
├── build.js                         # Kịch bản tự động đóng gói toàn bộ dự án sang dist/
├── danh_sach_tai_khoan_12A2.csv     # File danh sách tài khoản 40 học sinh 12A2 dạng CSV
├── danh_sach_tai_khoan_12A2.txt     # File danh sách tài khoản 40 học sinh 12A2 dạng TXT
├── favicon.ico                      # Biểu tượng tab trình duyệt
├── index.html                       # Trang chủ nạp bundle
└── supabase-schema.sql              # Kịch bản SQL tạo bảng cơ sở dữ liệu trên Supabase
```

---

## 3. Các phân hệ chức năng chính

### 3.1. Ôn tập & Thi trắc nghiệm
- **3 Chế độ chơi**:
  - *Luyện tập tự do (Quiz)*: Không áp lực thời gian, có giải thích đáp án chi tiết.
  - *Thử thách tính giờ (Timed)*: Áp lực thời gian đếm ngược, rèn phản xạ nhanh.
  - *Diệt Rồng / Đấu Boss (Boss Mode)*: Trả lời đúng để gây sát thương hạ gục Boss, đồ họa kịch tính.
- **Đa dạng dạng câu hỏi**: Trắc nghiệm 4 lựa chọn, Đúng/Sai (4 ý theo format đề mới), Điền từ, Trả lời ngắn, Ghép nối cặp thẻ.

### 3.2. Luyện Đọc hiểu Ngữ Văn
- **Ngữ liệu trích đoạn chất lượng cao**: Các tác phẩm kinh điển và hiện đại (Inamori Kazuo, Rosie Nguyễn, Nguyễn Khoa Điềm, Chu Quang Tiềm, Nguyễn Ngọc Tư...).
- **Ma trận 5 câu chuẩn đề thi tốt nghiệp THPT**:
  - Câu 1 & 2: Nhận biết (1.0 điểm/câu).
  - Câu 3 & 4: Thông hiểu (1.0 điểm/câu).
  - Câu 5: Vận dụng (Viết đoạn văn ~200 chữ, 2.0 điểm).
- **Giao diện Split-View**: Cột trái đọc văn bản (có thể phóng to/thu nhỏ cỡ chữ `A+`/`A-`), cột phải điền câu trả lời với tính năng tự động lưu bản nháp theo thời gian thực.

### 3.3. Luyện Viết văn (Nghị luận xã hội & Văn học)
- Chia dàn ý chuẩn: Mở bài, Thân bài, Kết bài với hướng dẫn gợi ý chi tiết.
- Bộ đếm từ tự động cập nhật ngay khi gõ.
- Đồng hồ canh giờ làm bài và cảnh báo khi sắp hết giờ.
- **Tích hợp Kho học liệu**: Tab "Bộ đề Viết" hiển thị số lượng bộ đề thời gian thực (`#lib-writing-badge`), số câu hỏi/phần dàn ý trên từng thẻ bài, hỗ trợ giáo viên lọc theo chủ đề, chỉnh sửa và tạo đề mới.

### 3.4. Hệ thống Chấm bài & Lịch sử
- Học sinh sau khi nộp bài sẽ lưu kết quả vào Lịch sử.
- Toàn bộ dữ liệu hiển thị là bài làm thật của người học (đã gỡ bỏ sạch sẽ các bài mẫu thử nghiệm).
- Giáo viên / Admin mở màn hình **Lịch sử làm bài** để chấm trực tiếp từng câu hỏi tự luận của học sinh:
  - Chọn nhanh trạng thái: `Đạt (Điểm tối đa)` | `Một phần` | `Chưa đạt (0đ)`.
  - Nhập nhận xét chi tiết của giáo viên gửi tới học sinh.
  - Nút **Lưu kết quả chấm**: Tự động tính tổng điểm, cập nhật trạng thái đã chấm `✅ Đã chấm` và đồng bộ lên đám mây.

---

## 4. Cơ chế Phân quyền & Danh sách tài khoản

Hệ thống thiết lập phân quyền 3 cấp độ (Role-Based Access Control - RBAC) độc lập:

| Vai trò | Mã Role | Quyền hạn chính |
| :--- | :---: | :--- |
| **Quản trị viên** | `admin` | Toàn quyền tối cao: Quản lý cả tài khoản Giáo viên và Học sinh, chỉnh sửa/xóa/tạo mọi bộ đề, chấm điểm tất cả bài thi. |
| **Giáo viên** | `teacher` | Quản lý học sinh, tạo/sửa/xóa đề thi, chấm điểm bài làm của học sinh, xem toàn bộ lịch sử thi. |
| **Học sinh** | `student` | Tham gia làm bài, luyện tập đọc hiểu/viết văn, xem lại bài làm và điểm số của bản thân. Không thể sửa/xóa đề hoặc can thiệp bài của người khác. |

### Thông tin đăng nhập chuẩn:
- **Tài khoản Quản trị viên (Admin)**:
  - Tên đăng nhập: `admin`
  - Họ và tên: `ADMIN`
  - Mật khẩu: `admin9999` (hoặc `123456`)
- **Tài khoản Giáo viên (Teacher)**:
  - Tên đăng nhập: `tuanh` (hoặc `giaovien`)
  - Họ và tên: `Hoàng Thị Tú Anh`
  - Mật khẩu: `123456`
- **Tài khoản Học sinh (Lớp 12A2 - 40 học sinh)**:
  - Tên đăng nhập: Các chữ cái đầu viết tắt + `@bpbd.vn` (ví dụ: `tdk@bpbd.vn`, `nqa@bpbd.vn`, `nhba@bpbd.vn`...). Hai trường hợp trùng lặp được gắn tên chính ở đuôi để phân biệt (`nttnguyet@bpbd.vn` & `nttnhi@bpbd.vn`; `tmthien@bpbd.vn` & `tmtuong@bpbd.vn`). Đồng thời vẫn hỗ trợ đăng nhập qua tên đầy đủ cũ hoặc mã STT (`12a2_01` -> `12a2_40`).
  - Mật khẩu ban đầu: Ngày tháng đuôi năm sinh theo định dạng 6 chữ số `ddmmyy` (ví dụ: sinh ngày 20/07/2009 -> Mật khẩu là `200709`).
  - Danh sách chi tiết được lưu trữ và đồng bộ tại [`danh_sach_tai_khoan_12A2.txt`](file:///c:/Users/hs207/Downloads/files/danh_sach_tai_khoan_12A2.txt), [`danh_sach_tai_khoan_12A2.csv`](file:///c:/Users/hs207/Downloads/files/danh_sach_tai_khoan_12A2.csv) và kịch bản nạp cơ sở dữ liệu [`supabase/seed_accounts_12a2.sql`](file:///c:/Users/hs207/Downloads/files/supabase/seed_accounts_12a2.sql).

### 4.2. Hệ thống Lưu đăng nhập & Chuyển đổi tài khoản (Multi-Account Switcher):
- **Tự động ghi nhớ tài khoản**: Khi đăng nhập thành công (online hoặc offline), hệ thống lưu tài khoản an toàn vào danh sách thiết bị (`vq_saved_accounts_v2`), người dùng có thể tùy chọn bật/tắt checkbox *"Ghi nhớ tài khoản trên thiết bị này"*.
- **Chuyển đổi tài khoản 1 chạm (Instant Account Switcher)**:
  - Trên thanh Navbar: Nhấp vào thông tin người dùng để mở Menu -> Danh sách các tài khoản đã lưu trên máy hiển thị trực quan (có Avatar, Họ tên, Tên đăng nhập và Huy hiệu vai trò). Nhấp vào bất kỳ tài khoản nào để chuyển đổi ngay lập tức mà không cần nhập lại mật khẩu.
  - Trong hộp thoại Đăng nhập: Khi đã có tài khoản lưu trên máy, giao diện tự động hiển thị danh sách để người dùng chọn nhanh tài khoản học tập hoặc bấm *"Đăng nhập tài khoản khác"*.
- **Thêm và Quản lý tài khoản**:
  - Nút **"+ Thêm tài khoản khác"** cho phép đăng nhập thêm tài khoản mới vào thiết bị mà không làm mất các tài khoản cũ.
  - Nút biểu tượng xóa (thùng rác / `x`) cho phép gỡ từng tài khoản khỏi máy bất cứ lúc nào.
  - Hỗ trợ **"Đăng xuất tài khoản này"** hoặc **"Đăng xuất tất cả tài khoản"** trên thiết bị chỉ với một nút bấm.

*Lưu ý: Hệ thống hỗ trợ đăng nhập ngoại tuyến (Offline Fallback) tự động ngay cả khi mất kết nối mạng với Supabase.*

---

## 5. Tính năng Trạng thái Xuất bản (Published / Draft)

Trong phân hệ **Đọc hiểu** và **Kho học liệu**:
1. **Trạng thái Đã xuất bản (`published`)**:
   - Bộ đề hiển thị công khai cho học sinh làm bài trên cả màn hình Luyện đọc hiểu và Thư viện.
   - Hiển thị huy hiệu `🟢 Đã xuất bản` rõ ràng trên thẻ bài.
2. **Trạng thái Bản nháp (`draft`)**:
   - Dành riêng cho Giáo viên / Admin đang trong quá trình soạn thảo và hoàn thiện ngữ liệu hoặc câu hỏi.
   - Hiển thị huy hiệu `🟡 Bản nháp`.
   - **Tự động ẩn hoàn toàn đối với tài khoản Học sinh** để tránh làm các đề chưa hoàn chỉnh.
3. **Cách đổi trạng thái**:
   - Giáo viên nhấn nút **Sửa đề** -> Chọn mục **Trạng thái bộ đề** -> Chuyển giữa `Đã xuất bản (Published)` hoặc `Bản nháp (Draft)` -> Nhấn **Lưu bộ đề**.

---

## 6. Hệ thống Bảo mật & Chống gian lận

Để đảm bảo tính khách quan và nghiêm túc trong quá trình kiểm tra, hệ thống trang bị lớp bảo mật **Security Shield**:
1. **Chặn sao chép & dán (Anti Copy-Paste)**:
   - Vô hiệu hóa tính năng Dán (Ctrl+V, Shift+Insert) vào các ô làm bài văn và bài đọc hiểu.
   - Vô hiệu hóa việc Sao chép (Ctrl+C, Ctrl+X) nội dung đề thi ra ngoài.
2. **Giám sát rời phòng thi (Focus Tracking)**:
   - Phát hiện học sinh chuyển tab trình duyệt hoặc thu nhỏ cửa sổ trong khi đang làm bài.
   - Đưa ra cảnh báo trực tiếp kèm số lần vi phạm và ghi nhận vào lịch sử bài thi.
3. **Chống can thiệp mã nguồn**:
   - Cơ chế tự động khóa và xóa log nhạy cảm trên Console.
   - Đóng gói toàn bộ code vào `dist/app.bundle.js` và giấu đường dẫn trực tiếp.

---

## 7. Hướng dẫn cài đặt, chạy và đóng gói (Build)

### 7.1. Chạy ứng dụng trực tiếp
Hệ thống là ứng dụng Web thuần túy, bạn có thể chạy bằng bất kỳ HTTP Server nào:
- Dùng tiện ích mở rộng **Live Server** trên VS Code.
- Hoặc chạy bằng Node.js CLI:
  ```bash
  npx serve .
  ```
  Truy cập địa chỉ hiển thị trên terminal (ví dụ: `http://localhost:3000`).

### 7.2. Đóng gói ứng dụng (Build Bundle)
Mỗi khi có thay đổi trong thư mục `components/`, `css/` hoặc `js/`, hãy chạy lệnh đóng gói:
```bash
node build.js
```
Kịch bản `build.js` sẽ tự động:
1. Nạp và nhúng toàn bộ file `.html` trong `components/` vào DOM injector.
2. Gộp toàn bộ CSS (`style.css`, `writing.css`, `reading.css`) thành `dist/app.bundle.css`.
3. Gộp toàn bộ script JavaScript theo đúng thứ tự phụ thuộc thành `dist/app.bundle.js`.
4. Cập nhật `index.html` để tải trực tiếp bản bundle.

---

## 8. Cơ sở dữ liệu Supabase Cloud

Dự án đã tích hợp sẵn cơ chế đồng bộ lên cơ sở dữ liệu PostgreSQL của Supabase:
- **`question_sets`**: Lưu trữ các bộ câu hỏi ôn tập.
- **`leaderboard_entries`**: Bảng xếp hạng điểm số và thành tích.
- **`quiz_submissions`**: Lưu trữ toàn bộ bài làm thi trắc nghiệm, đọc hiểu và bài viết của học sinh cùng điểm số, nhận xét của giáo viên.
- **`user_accounts`**: Quản lý thông tin tài khoản người dùng, phân quyền vai trò.

Kịch bản khởi tạo bảng và các chính sách bảo mật RLS được cung cấp đầy đủ trong file:
👉 [`supabase-schema.sql`](file:///c:/Users/hs207/Downloads/files/supabase-schema.sql)

---
*Tài liệu được cập nhật tự động và đồng bộ với phiên bản mã nguồn mới nhất.*
