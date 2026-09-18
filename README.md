# ỨNG DỤNG TRẮC NGHIỆM TƯƠNG TÁC TOÁN 6 — BỘ 5 ĐỀ ÔN TẬP CHƯƠNG I

Ứng dụng web trắc nghiệm tương tác độc lập (Single Page Web Application) dành cho học sinh và giáo viên môn **Toán 6**, bám sát chương trình **GDPT 2018** (Bài 1 đến Bài 4 - Chương I: Tập hợp, Số tự nhiên, Thứ tự trong tập hợp các số tự nhiên, Phép cộng và phép trừ số tự nhiên).

---

## 🌟 TÍNH NĂNG NỔI BẬT

### 1. Chuẩn Hóa Cấu Trúc Đề Thi Mới (Bộ GD&ĐT)
Mỗi đề gồm **10 câu hỏi**, chuẩn thang **10.0 điểm**, thời gian làm bài **20 phút**:
- **Phần 1: Trắc nghiệm nhiều lựa chọn (6 câu = 3.0 điểm)** — 4 phương án A, B, C, D.
- **Phần 2: Trắc nghiệm Đúng / Sai (2 câu = 4.0 điểm)** — Mỗi câu gồm 4 ý $a, b, c, d$. Chấm điểm lũy tiến chuẩn xác (1 ý đúng = 0.2đ, 2 ý = 0.5đ, 3 ý = 1.0đ, 4 ý = 2.0đ).
- **Phần 3: Trắc nghiệm Trả lời ngắn (2 câu = 3.0 điểm)** — Học sinh tự tính toán và nhập đáp số, hệ thống tự động kiểm tra và chuẩn hóa câu trả lời.

### 2. 3 Chế Độ Tương Tác Linh Hoạt
1. ⏱️ **Chế độ Thi Thử (Exam Mode):**
   - Đồng hồ bấm giờ đếm ngược 20 phút (tự động nộp khi hết giờ).
   - Ẩn toàn bộ đáp án và lời giải trong quá trình làm bài.
   - Nộp bài hiển thị bảng điểm chi tiết theo từng phần, đánh giá xếp loại năng lực, kèm hiệu ứng pháo hoa chúc mừng (*Canvas Confetti*) khi đạt điểm cao!
2. 💡 **Chế độ Luyện Tập Tức Thì (Practice Mode):**
   - Chọn phương án hoặc nhập câu trả lời đến đâu biết ngay đúng/sai đến đó.
   - Hiển thị ngay lời giải chi tiết và mẹo làm bài nhanh để khắc sâu kiến thức.
3. 👨‍🏫 **Chế độ Bản Giáo Viên (Teacher Mode):**
   - Hiển thị đầy đủ đáp án chuẩn và lời giải cho toàn bộ 10 câu để giáo viên giảng dạy, trình chiếu trên tivi/máy chiếu hoặc chấm bài.

### 3. Công Nghệ Hiển Thị Công Thức Toán & Đồ Họa Cao Cấp
- Tích hợp thư viện toán học **KaTeX** hiển thị sắc nét các ký hiệu: $\in, \notin, \mathbb{N}, \mathbb{N}^*, \le, \ge, <, >, \{ \dots \}$.
- Hỗ trợ giao diện **Sáng / Tối (Light Mode / Dark Mode)** dịu mắt, chống mỏi mắt khi học lâu.
- Thiết kế **Responsive** 100% trên Điện thoại thông minh, Máy tính bảng (iPad), Laptop, PC và Màn hình tương tác.
- Tự động lưu tiến độ vào **Local Storage** (không sợ mất bài làm khi lỡ tải lại trang).

### 4. Hỗ Trợ In Ấn & Xuất File Word Tiện Lợi
- 🖨️ **In Bản Học Sinh:** Đề thi được tối ưu cho in ấn A4 (ẩn đáp án, có khung thông tin trường lớp, khung điểm, lời phê giáo viên).
- 📑 **In Bản Giáo Viên:** Có sẵn bảng đáp án và hướng dẫn chấm chi tiết.
- 📥 **Xuất Word (.doc):** Tải file về máy chỉ bằng 1 cú click chuột, mở và chỉnh sửa trực tiếp trên Microsoft Word.

---

## 📁 CẤU TRÚC THƯ MỤC DỰ ÁN

```
d:/WEBAPP AI/CHATBOT/TN-TUONGTAC/
├── index.html            # Ứng dụng Web chính (chạy độc lập, không cần cài đặt server)
├── questions_data.js     # Cơ sở dữ liệu 5 bộ đề ôn tập có cấu trúc
├── de_thi_goc.md         # Bản thảo tài liệu 5 đề thi định dạng Markdown chuẩn
└── README.md             # Hướng dẫn sử dụng và tài liệu chi tiết
```

---

## 🚀 HƯỚNG DẪN KHỞI CHẠY & SỬ DỤNG

### Cách 1: Chạy trực tiếp trên máy tính (Offline 100%)
1. Mở thư mục `d:\WEBAPP AI\CHATBOT\TN-TUONGTAC`.
2. Click đúp chuột vào tệp `index.html`.
3. Ứng dụng sẽ tự động mở trên trình duyệt mặc định (Google Chrome, Microsoft Edge, Cốc Cốc, v.v.) và sẵn sàng sử dụng ngay lập tức!

### Cách 2: Triển khai lên Web miễn phí (Netlify / Vercel / GitHub Pages)
- **Netlify:** Kéo thả thư mục `TN-TUONGTAC` vào [app.netlify.com/drop](https://app.netlify.com/drop) là có ngay link web online chia sẻ cho học sinh toàn trường làm bài trên điện thoại!
