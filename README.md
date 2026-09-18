# HỆ THỐNG GIA SƯ AI VÀ ÔN TẬP TOÁN THCS (GDPT 2018)

Hệ thống ứng dụng tương tác đa nền tảng (Single Page Web Applications) độc lập 100%, phục vụ việc giảng dạy, ôn tập, bồi dưỡng môn **Toán THCS (Khối 6, 7, 8, 9)** theo chuẩn **Chương trình GDPT 2018** (Bộ sách Kết Nối Tri Thức Với Cuộc Sống).

---

## 🌟 BỘ TỨ ỨNG DỤNG TÍCH HỢP

### 1. 🏆 Đấu Trường Tri Thức OLM (`dautruong.html`)
- **Mô hình Gamification (Thi đấu & Đua top OLM)**:
  - Chọn **Khối lớp (Khối 6, 7, 8, 9)** và Bài học theo phân phối SGK Kết Nối Tri Thức.
  - Phân tầng 4 mức độ nhận thức: **🥉 Khởi Động (NB) | 🥈 Vượt Chướng Ngại (TH) | 🥇 Tăng Tốc (VD) | 👑 Đấu Sĩ Tinh Anh (VDC)**.
- **3 Chế độ chơi hấp dẫn**:
  - 🌿 *Luyện Tập Tự Do:* Không giới hạn thời gian, có gợi ý tư duy Socratic và lời giải chi tiết.
  - 💖 *Vượt Ải Sinh Tồn (3 Trái Tim):* Mỗi lần chọn sai mất 1 ❤️, chuỗi đúng nhân đôi điểm combo streak!
  - ⚔️ *Đấu Trường OLM:* Đồng hồ đếm ngược 15:00 kịch tính, thưởng tốc độ làm bài.
- **Bảng Vàng Vinh Danh (Leaderboard) & Thẻ Chứng Nhận (PNG):** Tự động ghi danh Top 10 học sinh xuất sắc nhất và hỗ trợ xuất ảnh Chứng nhận thi đấu qua HTML5 Canvas.

### 2. 🤖 Chatbot Gia Sư AI Tương Tác 100% (`index.html` / `chatbot.html`)
- **Phương pháp Socratic sư phạm**: Không đưa đáp án ngay mà khéo léo gợi mở từng bước, kiên nhẫn đồng hành cùng học sinh.
- **Âm thanh phản hồi trực quan (Web Audio API Synthesizer)**: Âm thanh vỗ tay chúc mừng khi làm đúng, chuông nhắc nhở nhẹ nhàng khi chọn sai.
- **Thẻ Kết Quả Học Tập (Report Card)**: Tự động tổng hợp số câu đúng, phân loại năng lực và hỗ trợ xuất ảnh PNG để học sinh gửi bài cho giáo viên qua Zalo.
- **Cá nhân hóa theo mã lớp**: Bản riêng biệt cho từng lớp như `lop-6a1.html` (Đại trà), `lop-6a2.html` (Nâng cao).

### 3. 📝 Bảng Đề Thi & Bấm Giờ Trắc Nghiệm (`tracnghiem.html`)
- **Đồng hồ bấm giờ 20 phút**: Tự động nộp bài và khóa đề khi hết giờ.
- **3 Chế độ linh hoạt**: Thi Thử (ẩn đáp án), Luyện Tập (xem giải thích từng câu), Bản Giáo Viên (đầy đủ đáp án trình chiếu).
- **Xuất file Word (.doc) & In ấn A4**: Thiết kế tinh gọn, có sẵn khung điểm, trường lớp và lời phê của giáo viên.

### 4. ⚙️ Cổng Quản Trị Giáo Viên (`quan-ly-giao-vien.html`)
- **Phân loại theo Khối lớp**: Chuyển đổi linh hoạt giữa **Khối 6, Khối 7, Khối 8, Khối 9** và theo đối tượng học sinh (**Đại trà / Củng cố** hoặc **Nâng cao / Bồi dưỡng**).
- **Bộ tạo câu hỏi trực quan 3 Dạng thức**:
  - *Phần 1:* Trắc nghiệm nhiều lựa chọn (4 phương án $A, B, C, D$).
  - *Phần 2:* Trắc nghiệm Đúng / Sai (4 ý khẳng định $a, b, c, d$).
  - *Phần 3:* Trắc nghiệm Trả lời ngắn (kèm gợi ý từng bước Socratic).
- **Trích xuất tự động từ file Word (.docx) & văn bản thô**: Tích hợp công nghệ `mammoth.js` giúp giáo viên tải file Word đề thi để tự động bóc tách vào ngân hàng đề.
- **Nạp tài liệu tri thức (`kt.md`) & Hồ sơ nhân cách (`tc.md`)**: Biên soạn trực tiếp vào hệ thống.
- **Đồng bộ thời gian thực (Real-time LocalSync)**: Bấm **"Lưu & Kích Hoạt Ngay"** cập nhật tức thì cho cả Chatbot và Đấu trường OLM.

---

## 📁 CẤU TRÚC THƯ MỤC HỆ THỐNG

```
d:/WEBAPP AI/CHATBOT/TN-TUONGTAC/
├── dautruong.html          # ĐẤU TRƯỜNG TRI THỨC OLM (Thi đấu, 3 tim, bảng vàng Top 10)
├── index.html              # Ứng dụng Chatbot AI chính (Học sinh)
├── chatbot.html            # Bản alias song song của Chatbot AI
├── quan-ly-giao-vien.html  # CỔNG QUẢN TRỊ GIÁO VIÊN (Nạp học liệu, thêm câu hỏi Khối 6-9)
├── tracnghiem.html         # Bảng đề thi trắc nghiệm bấm giờ 20 phút & xuất Word
├── lop-6a1.html            # Trang đóng gói dành riêng cho lớp 6A1 (Đại trà)
├── lop-6a2.html            # Trang đóng gói dành riêng cho lớp 6A2 (Nâng cao)
├── questions_data.js       # Ngân hàng đề thi & Cây bài học SGK Kết Nối Tri Thức
├── kt.md                   # Hồ sơ Tri thức & Kiến thức trọng tâm Toán 6
├── tc.md                   # Hồ sơ Sư phạm & Nguyên tắc ứng xử của Gia Sư AI
├── de_thi_goc.md           # Đề thi gốc bản đầy đủ định dạng Markdown
└── README.md               # Tài liệu hướng dẫn sử dụng chi tiết
```

---

## 🚀 HƯỚNG DẪN KHỞI CHẠY VÀ SỬ DỤNG

### Dành Cho Giáo Viên
1. Mở tệp `quan-ly-giao-vien.html` trên trình duyệt Chrome, Edge hoặc Cốc Cốc.
2. Chọn **Khối lớp (Khối 6, 7, 8, 9)** và đối tượng (**Đại trà** hoặc **Nâng cao**).
3. Nhập câu hỏi mới hoặc nạp tài liệu `kt.md`.
4. Bấm **"Lưu & Kích Hoạt Ngay"** $\rightarrow$ Hệ thống tự động ghi nhớ và cập nhật cho Chatbot học sinh.
5. Khi cần xuất dữ liệu để lưu trữ lâu dài hoặc nạp lại trên máy khác, bấm **"Xuất File questions_data.js"**.

### Dành Cho Học Sinh
1. Mở `index.html` (hoặc `lop-6a1.html`, `lop-6a2.html`).
2. Nhập Họ và tên, sau đó tương tác giải bài cùng Gia Sư AI.
3. Khi hoàn thành bài học, bấm **"🎖️ Thẻ Điểm"** $\rightarrow$ **"Tải Thẻ Điểm (PNG)"** để nộp bài cho thầy cô.
