// =============================================================================
// CƠ SỞ DỮ LIỆU ĐỀ THI & ĐẤU TRƯỜNG TOÁN THCS (GDPT 2018 - KẾT NỐI TRI THỨC)
// =============================================================================

const EXAM_DATA = [
  {
    "id": 1,
    "title": "Đề số 1: Ôn tập Bài 1 đến Bài 4 (Chương I)",
    "subtitle": "Tập hợp - Số tự nhiên - Thứ tự số tự nhiên - Phép cộng và trừ",
    "grade": "Toán 6",
    "timeMinutes": 20,
    "parts": [
      {
        "partId": 1,
        "title": "PHẦN 1: TRẮC NGHIỆM NHIỀU LỰA CHỌN (6 câu)",
        "instruction": "Chọn một phương án đúng nhất. Mỗi câu đúng được 0.5 điểm.",
        "questions": [
          {
            "id": "1_1",
            "number": 1,
            "type": "mcq",
            "content": "Cho tập hợp $A = \\{1; 2; 3; 4\\}$. Khẳng định nào sau đây là đúng?",
            "options": [
              {
                "key": "A",
                "text": "$0 \\in A$"
              },
              {
                "key": "B",
                "text": "$1 \\notin A$"
              },
              {
                "key": "C",
                "text": "$2 \\in A$"
              },
              {
                "key": "D",
                "text": "$5 \\in A$"
              }
            ],
            "correctAnswer": "C",
            "explanation": "Số 2 là một phần tử thuộc tập hợp $A$, nên kí hiệu $2 \\in A$ là chính xác. Các phương án khác sai vì $0 \\notin A$, $1 \\in A$, $5 \\notin A$.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B1",
            "lessonName": "Bài 1: Tập hợp",
            "level": "NB",
            "xp": 10
          },
          {
            "id": "1_2",
            "number": 2,
            "type": "mcq",
            "content": "Số tự nhiên liền sau của số 199 là:",
            "options": [
              {
                "key": "A",
                "text": "198"
              },
              {
                "key": "B",
                "text": "200"
              },
              {
                "key": "C",
                "text": "190"
              },
              {
                "key": "D",
                "text": "201"
              }
            ],
            "correctAnswer": "B",
            "explanation": "Để tìm số tự nhiên liền sau của một số, ta cộng thêm 1 đơn vị: $199 + 1 = 200$.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B3",
            "lessonName": "Bài 3: Thứ tự trong tập hợp các số tự nhiên",
            "level": "NB",
            "xp": 10
          },
          {
            "id": "1_3",
            "number": 3,
            "type": "mcq",
            "content": "Trong số 250, chữ số 5 có giá trị bằng bao nhiêu?",
            "options": [
              {
                "key": "A",
                "text": "5"
              },
              {
                "key": "B",
                "text": "50"
              },
              {
                "key": "C",
                "text": "500"
              },
              {
                "key": "D",
                "text": "0"
              }
            ],
            "correctAnswer": "B",
            "explanation": "Chữ số 5 nằm ở hàng chục, vì vậy giá trị của nó là $5 \\times 10 = 50$.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B2",
            "lessonName": "Bài 2: Cách ghi số tự nhiên",
            "level": "NB",
            "xp": 10
          },
          {
            "id": "1_4",
            "number": 4,
            "type": "mcq",
            "content": "Số La Mã XIX biểu diễn số tự nhiên nào trong hệ thập phân?",
            "options": [
              {
                "key": "A",
                "text": "19"
              },
              {
                "key": "B",
                "text": "21"
              },
              {
                "key": "C",
                "text": "11"
              },
              {
                "key": "D",
                "text": "9"
              }
            ],
            "correctAnswer": "A",
            "explanation": "Trong hệ số La Mã: X = 10, IX = 9. Do đó $\\text{XIX} = 10 + 9 = 19$.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B2",
            "lessonName": "Bài 2: Cách ghi số tự nhiên",
            "level": "TH",
            "xp": 20
          },
          {
            "id": "1_5",
            "number": 5,
            "type": "mcq",
            "content": "Kết quả của phép tính $15 + 49 + 85$ là:",
            "options": [
              {
                "key": "A",
                "text": "139"
              },
              {
                "key": "B",
                "text": "149"
              },
              {
                "key": "C",
                "text": "159"
              },
              {
                "key": "D",
                "text": "169"
              }
            ],
            "correctAnswer": "B",
            "explanation": "Áp dụng tính chất giao hoán và kết hợp để tính nhanh: $(15 + 85) + 49 = 100 + 49 = 149$.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B4",
            "lessonName": "Bài 4: Phép cộng và phép trừ số tự nhiên",
            "level": "TH",
            "xp": 20
          },
          {
            "id": "1_6",
            "number": 6,
            "type": "mcq",
            "content": "Tìm số tự nhiên $x$, biết: $x - 15 = 20$.",
            "options": [
              {
                "key": "A",
                "text": "$x = 5$"
              },
              {
                "key": "B",
                "text": "$x = 25$"
              },
              {
                "key": "C",
                "text": "$x = 35$"
              },
              {
                "key": "D",
                "text": "$x = 300$"
              }
            ],
            "correctAnswer": "C",
            "explanation": "Muốn tìm số bị trừ, ta lấy hiệu cộng với số trừ: $x = 20 + 15 = 35$.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B4",
            "lessonName": "Bài 4: Phép cộng và phép trừ số tự nhiên",
            "level": "TH",
            "xp": 20
          }
        ]
      },
      {
        "partId": 2,
        "title": "PHẦN 2: TRẮC NGHIỆM ĐÚNG/SAI (2 câu)",
        "instruction": "Đánh dấu Đúng (Đ) hoặc Sai (S) cho mỗi ý a, b, c, d.",
        "questions": [
          {
            "id": "1_7",
            "number": 7,
            "type": "tf",
            "content": "Cho tập hợp $M = \\{1; 2; 3; 4\\}$.",
            "items": [
              {
                "key": "a",
                "text": "Tập hợp $M$ có thể viết bằng dấu hiệu đặc trưng là: $M = \\{x \\in \\mathbb{N}^* \\mid x \\le 4\\}$.",
                "correctAnswer": "Đ",
                "explanation": "Đúng, vì $\\mathbb{N}^* = \\{1; 2; 3; \\dots\\}$, kết hợp $x \\le 4$ cho ta chính xác các số $1, 2, 3, 4$."
              },
              {
                "key": "b",
                "text": "Phần tử $0 \\in M$.",
                "correctAnswer": "S",
                "explanation": "Sai, vì trong tập hợp $M$ không chứa phần tử số 0."
              },
              {
                "key": "c",
                "text": "Số phần tử của tập hợp $M$ là 4.",
                "correctAnswer": "Đ",
                "explanation": "Đúng, tập $M$ gồm đúng 4 phần tử là $1, 2, 3, 4$."
              },
              {
                "key": "d",
                "text": "Tập hợp $M$ gồm các số tự nhiên nhỏ hơn 4.",
                "correctAnswer": "S",
                "explanation": "Sai, các số tự nhiên nhỏ hơn 4 là $0, 1, 2, 3$, trong khi tập $M$ có phần tử 4 và không có phần tử 0."
              }
            ],
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B1",
            "lessonName": "Bài 1: Tập hợp",
            "level": "TH",
            "xp": 25
          },
          {
            "id": "1_8",
            "number": 8,
            "type": "tf",
            "content": "Xét các phép tính và tính chất sau trong tập hợp số tự nhiên:",
            "items": [
              {
                "key": "a",
                "text": "Tính chất giao hoán của phép cộng là $a + b = b + a$.",
                "correctAnswer": "Đ",
                "explanation": "Đúng theo định nghĩa tính chất giao hoán phép cộng."
              },
              {
                "key": "b",
                "text": "$(a + b) + c = a + (b + c)$ là tính chất kết hợp.",
                "correctAnswer": "Đ",
                "explanation": "Đúng theo định nghĩa tính chất kết hợp phép cộng."
              },
              {
                "key": "c",
                "text": "Phép tính $15 - 20$ có thể thực hiện được trong tập hợp số tự nhiên.",
                "correctAnswer": "S",
                "explanation": "Sai, trong tập số tự nhiên $\\mathbb{N}$, phép trừ $a - b$ chỉ thực hiện được khi $a \\ge b$."
              },
              {
                "key": "d",
                "text": "Khi cộng một số với 0, kết quả bằng chính số đó.",
                "correctAnswer": "Đ",
                "explanation": "Đúng, vì với mọi số tự nhiên $a$, ta luôn có $a + 0 = 0 + a = a$."
              }
            ],
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B4",
            "lessonName": "Bài 4: Phép cộng và phép trừ số tự nhiên",
            "level": "VD",
            "xp": 35
          }
        ]
      },
      {
        "partId": 3,
        "title": "PHẦN 3: TRẮC NGHIỆM TRẢ LỜI NGẮN (2 câu)",
        "instruction": "Ghi kết quả cuối cùng (số nguyên hoặc giá trị cần tìm). Mỗi câu đúng 1.5 điểm.",
        "questions": [
          {
            "id": "1_9",
            "number": 9,
            "type": "short",
            "content": "Để chuẩn bị vật liệu làm \"Trạm thao tác vi mô\", 49 học sinh của lớp 6A mỗi bạn mang đến 2 vỏ hộp giấy. Hỏi cả lớp đã chuẩn bị được tất cả bao nhiêu vỏ hộp giấy?",
            "correctAnswers": [
              "98",
              "98 vỏ hộp",
              "98 hộp"
            ],
            "unit": "vỏ hộp",
            "explanation": "Số vỏ hộp cả lớp chuẩn bị được là: $49 \\times 2 = 98$ (vỏ hộp).",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B1",
            "lessonName": "Bài 1: Tập hợp",
            "level": "VD",
            "xp": 35
          },
          {
            "id": "1_10",
            "number": 10,
            "type": "short",
            "content": "Tính nhanh giá trị của biểu thức: $2026 - 199$.",
            "correctAnswers": [
              "1827"
            ],
            "explanation": "Thêm 1 vào số trừ và số bị trừ để làm tròn số trừ thành 200: $(2026 + 1) - (199 + 1) = 2027 - 200 = 1827$.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B4",
            "lessonName": "Bài 4: Phép cộng và phép trừ số tự nhiên",
            "level": "VDC",
            "xp": 50
          }
        ]
      }
    ],
    "gradeNum": 6,
    "book": "KNTT",
    "chapter": 1
  },
  {
    "id": 2,
    "title": "Đề số 2: Ôn tập Bài 1 đến Bài 4 (Chương I)",
    "subtitle": "Tập hợp - Số tự nhiên - Thứ tự số tự nhiên - Phép cộng và trừ",
    "grade": "Toán 6",
    "timeMinutes": 20,
    "parts": [
      {
        "partId": 1,
        "title": "PHẦN 1: TRẮC NGHIỆM NHIỀU LỰA CHỌN (6 câu)",
        "instruction": "Chọn một phương án đúng nhất. Mỗi câu đúng được 0.5 điểm.",
        "questions": [
          {
            "id": "2_1",
            "number": 1,
            "type": "mcq",
            "content": "Tập hợp $X$ gồm các chữ cái tiếng Việt trong từ \"TOÁN\" là:",
            "options": [
              {
                "key": "A",
                "text": "$X = \\{T; O; A; N\\}$"
              },
              {
                "key": "B",
                "text": "$X = \\{T; O; Á; N\\}$"
              },
              {
                "key": "C",
                "text": "$X = (T; O; A; N)$"
              },
              {
                "key": "D",
                "text": "$X = [T; O; A; N]$"
              }
            ],
            "correctAnswer": "A",
            "explanation": "Theo quy ước SGK Toán 6, các chữ cái tiếng Việt lấy theo chữ cái in hoa không dấu: $X = \\{T; O; A; N\\}$, viết trong dấu ngoặc nhọn $\\{\\}$.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B1",
            "lessonName": "Bài 1: Tập hợp",
            "level": "NB",
            "xp": 10
          },
          {
            "id": "2_2",
            "number": 2,
            "type": "mcq",
            "content": "Sự khác biệt giữa tập hợp $\\mathbb{N}$ và tập hợp $\\mathbb{N}^*$ là:",
            "options": [
              {
                "key": "A",
                "text": "Tập $\\mathbb{N}^*$ không chứa số 1."
              },
              {
                "key": "B",
                "text": "Tập $\\mathbb{N}^*$ không chứa số 0."
              },
              {
                "key": "C",
                "text": "Tập $\\mathbb{N}$ không chứa số 0."
              },
              {
                "key": "D",
                "text": "Không có sự khác biệt."
              }
            ],
            "correctAnswer": "B",
            "explanation": "$\\mathbb{N} = \\{0; 1; 2; 3; \\dots\\}$ còn $\\mathbb{N}^* = \\{1; 2; 3; \\dots\\}$. Điểm khác biệt duy nhất là $\\mathbb{N}^*$ không chứa số 0.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B1",
            "lessonName": "Bài 1: Tập hợp",
            "level": "NB",
            "xp": 10
          },
          {
            "id": "2_3",
            "number": 3,
            "type": "mcq",
            "content": "Viết số 24 bằng chữ số La Mã:",
            "options": [
              {
                "key": "A",
                "text": "XXIIII"
              },
              {
                "key": "B",
                "text": "XIV"
              },
              {
                "key": "C",
                "text": "XXIV"
              },
              {
                "key": "D",
                "text": "XXVI"
              }
            ],
            "correctAnswer": "C",
            "explanation": "Số $24 = 20 + 4$. 20 là XX, 4 là IV, do đó viết là XXIV.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B2",
            "lessonName": "Bài 2: Cách ghi số tự nhiên",
            "level": "TH",
            "xp": 20
          },
          {
            "id": "2_4",
            "number": 4,
            "type": "mcq",
            "content": "Sắp xếp các số $15; 12; 19; 20$ theo thứ tự tăng dần:",
            "options": [
              {
                "key": "A",
                "text": "$20 < 19 < 15 < 12$"
              },
              {
                "key": "B",
                "text": "$12 < 15 < 19 < 20$"
              },
              {
                "key": "C",
                "text": "$12 < 19 < 15 < 20$"
              },
              {
                "key": "D",
                "text": "$15 < 12 < 19 < 20$"
              }
            ],
            "correctAnswer": "B",
            "explanation": "So sánh các số: $12 < 15 < 19 < 20$ là thứ tự từ nhỏ đến lớn (tăng dần).",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B3",
            "lessonName": "Bài 3: Thứ tự trong tập hợp các số tự nhiên",
            "level": "TH",
            "xp": 20
          },
          {
            "id": "2_5",
            "number": 5,
            "type": "mcq",
            "content": "Kết quả của phép tính $100 - (25 + 35)$ là:",
            "options": [
              {
                "key": "A",
                "text": "40"
              },
              {
                "key": "B",
                "text": "110"
              },
              {
                "key": "C",
                "text": "50"
              },
              {
                "key": "D",
                "text": "60"
              }
            ],
            "correctAnswer": "A",
            "explanation": "Thực hiện phép tính trong ngoặc trước: $25 + 35 = 60$, sau đó lấy $100 - 60 = 40$.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B4",
            "lessonName": "Bài 4: Phép cộng và phép trừ số tự nhiên",
            "level": "TH",
            "xp": 20
          },
          {
            "id": "2_6",
            "number": 6,
            "type": "mcq",
            "content": "Tìm số tự nhiên $x$, biết $20 - x = 5$:",
            "options": [
              {
                "key": "A",
                "text": "$x = 25$"
              },
              {
                "key": "B",
                "text": "$x = 15$"
              },
              {
                "key": "C",
                "text": "$x = 10$"
              },
              {
                "key": "D",
                "text": "$x = 100$"
              }
            ],
            "correctAnswer": "B",
            "explanation": "Muốn tìm số trừ, ta lấy số bị trừ trừ đi hiệu: $x = 20 - 5 = 15$.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B4",
            "lessonName": "Bài 4: Phép cộng và phép trừ số tự nhiên",
            "level": "TH",
            "xp": 20
          }
        ]
      },
      {
        "partId": 2,
        "title": "PHẦN 2: TRẮC NGHIỆM ĐÚNG/SAI (2 câu)",
        "instruction": "Đánh dấu Đúng (Đ) hoặc Sai (S) cho mỗi ý a, b, c, d.",
        "questions": [
          {
            "id": "2_7",
            "number": 7,
            "type": "tf",
            "content": "Xét tia số gốc $O$ nằm ngang (chiều dương từ trái sang phải):",
            "items": [
              {
                "key": "a",
                "text": "Điểm biểu diễn số 0 là gốc của tia số.",
                "correctAnswer": "Đ",
                "explanation": "Đúng, gốc $O$ của tia số ứng với số 0."
              },
              {
                "key": "b",
                "text": "Điểm biểu diễn số 5 nằm bên trái điểm biểu diễn số 3.",
                "correctAnswer": "S",
                "explanation": "Sai, vì $5 > 3$ nên điểm 5 nằm bên phải điểm 3."
              },
              {
                "key": "c",
                "text": "Hai số tự nhiên liên tiếp luôn hơn kém nhau 1 đơn vị.",
                "correctAnswer": "Đ",
                "explanation": "Đúng, hai số tự nhiên liên tiếp có dạng $n$ và $n + 1$."
              },
              {
                "key": "d",
                "text": "Có một số tự nhiên lớn nhất nằm ở cuối tia số.",
                "correctAnswer": "S",
                "explanation": "Sai, tập số tự nhiên là vô hạn, tia số kéo dài vô tận về bên phải và không có số tự nhiên lớn nhất."
              }
            ],
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B3",
            "lessonName": "Bài 3: Thứ tự trong tập hợp các số tự nhiên",
            "level": "TH",
            "xp": 25
          },
          {
            "id": "2_8",
            "number": 8,
            "type": "tf",
            "content": "Cấu tạo của số tự nhiên 345:",
            "items": [
              {
                "key": "a",
                "text": "Số 345 có 3 chữ số.",
                "correctAnswer": "Đ",
                "explanation": "Đúng, 345 gồm ba chữ số: 3, 4 và 5."
              },
              {
                "key": "b",
                "text": "Chữ số hàng chục là số 4 và có giá trị là 40.",
                "correctAnswer": "Đ",
                "explanation": "Đúng, chữ số 4 ở hàng chục có giá trị $4 \\times 10 = 40$."
              },
              {
                "key": "c",
                "text": "Chữ số hàng trăm là 3 và có giá trị là 30.",
                "correctAnswer": "S",
                "explanation": "Sai, chữ số 3 ở hàng trăm có giá trị là 300, không phải 30."
              },
              {
                "key": "d",
                "text": "Số 345 có thể viết thành tổng: $300 + 40 + 5$.",
                "correctAnswer": "Đ",
                "explanation": "Đúng, phân tích theo cấu tạo thập phân: $345 = 300 + 40 + 5$."
              }
            ],
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B2",
            "lessonName": "Bài 2: Cách ghi số tự nhiên",
            "level": "TH",
            "xp": 25
          }
        ]
      },
      {
        "partId": 3,
        "title": "PHẦN 3: TRẮC NGHIỆM TRẢ LỜI NGẮN (2 câu)",
        "instruction": "Ghi kết quả cuối cùng (số nguyên hoặc giá trị cần tìm). Mỗi câu đúng 1.5 điểm.",
        "questions": [
          {
            "id": "2_9",
            "number": 9,
            "type": "short",
            "content": "Viết số tự nhiên $x$ lớn nhất thoả mãn: $x < 25$.",
            "correctAnswers": [
              "24"
            ],
            "explanation": "Số tự nhiên lớn nhất nhỏ hơn 25 là số liền trước của 25, tức là $25 - 1 = 24$.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B3",
            "lessonName": "Bài 3: Thứ tự trong tập hợp các số tự nhiên",
            "level": "VD",
            "xp": 35
          },
          {
            "id": "2_10",
            "number": 10,
            "type": "short",
            "content": "Tính nhanh tổng: $37 + 198 + 63$.",
            "correctAnswers": [
              "298"
            ],
            "explanation": "Nhóm các số có tổng tròn trăm: $(37 + 63) + 198 = 100 + 198 = 298$.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B4",
            "lessonName": "Bài 4: Phép cộng và phép trừ số tự nhiên",
            "level": "VD",
            "xp": 35
          }
        ]
      }
    ],
    "gradeNum": 6,
    "book": "KNTT",
    "chapter": 1
  },
  {
    "id": 3,
    "title": "Đề số 3: Ôn tập Bài 1 đến Bài 4 (Chương I)",
    "subtitle": "Tập hợp - Số tự nhiên - Thứ tự số tự nhiên - Phép cộng và trừ",
    "grade": "Toán 6",
    "timeMinutes": 20,
    "parts": [
      {
        "partId": 1,
        "title": "PHẦN 1: TRẮC NGHIỆM NHIỀU LỰA CHỌN (6 câu)",
        "instruction": "Chọn một phương án đúng nhất. Mỗi câu đúng được 0.5 điểm.",
        "questions": [
          {
            "id": "3_1",
            "number": 1,
            "type": "mcq",
            "content": "Cách viết liệt kê các phần tử của tập hợp $A = \\{x \\in \\mathbb{N} \\mid 5 < x \\le 8\\}$ là:",
            "options": [
              {
                "key": "A",
                "text": "$A = \\{5; 6; 7; 8\\}$"
              },
              {
                "key": "B",
                "text": "$A = \\{6; 7; 8\\}$"
              },
              {
                "key": "C",
                "text": "$A = \\{6; 7\\}$"
              },
              {
                "key": "D",
                "text": "$A = \\{5; 6; 7\\}$"
              }
            ],
            "correctAnswer": "B",
            "explanation": "$5 < x \\le 8$ nghĩa là $x$ lớn hơn 5 và nhỏ hơn hoặc bằng 8. Các số tự nhiên thỏa mãn là 6, 7, 8. Do đó $A = \\{6; 7; 8\\}$.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B1",
            "lessonName": "Bài 1: Tập hợp",
            "level": "NB",
            "xp": 10
          },
          {
            "id": "3_2",
            "number": 2,
            "type": "mcq",
            "content": "Số gồm 5 nghìn, 2 chục và 1 đơn vị được viết là:",
            "options": [
              {
                "key": "A",
                "text": "521"
              },
              {
                "key": "B",
                "text": "5021"
              },
              {
                "key": "C",
                "text": "5201"
              },
              {
                "key": "D",
                "text": "5210"
              }
            ],
            "correctAnswer": "B",
            "explanation": "Hàng nghìn là 5, hàng trăm khuyết nên là 0, hàng chục là 2, hàng đơn vị là 1. Số viết được là 5021.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B2",
            "lessonName": "Bài 2: Cách ghi số tự nhiên",
            "level": "NB",
            "xp": 10
          },
          {
            "id": "3_3",
            "number": 3,
            "type": "mcq",
            "content": "Khẳng định nào sau đây sai khi nói về chữ số La Mã?",
            "options": [
              {
                "key": "A",
                "text": "Chữ I biểu diễn số 1."
              },
              {
                "key": "B",
                "text": "Chữ V biểu diễn số 5."
              },
              {
                "key": "C",
                "text": "Chữ X biểu diễn số 10."
              },
              {
                "key": "D",
                "text": "Có kí tự La Mã biểu diễn số 0."
              }
            ],
            "correctAnswer": "D",
            "explanation": "Trong hệ số La Mã cổ điển không có ký tự nào để biểu diễn số 0.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B2",
            "lessonName": "Bài 2: Cách ghi số tự nhiên",
            "level": "NB",
            "xp": 10
          },
          {
            "id": "3_4",
            "number": 4,
            "type": "mcq",
            "content": "Số tự nhiên $x$ thoả mãn $199 < x < 201$ là:",
            "options": [
              {
                "key": "A",
                "text": "198"
              },
              {
                "key": "B",
                "text": "200"
              },
              {
                "key": "C",
                "text": "202"
              },
              {
                "key": "D",
                "text": "199"
              }
            ],
            "correctAnswer": "B",
            "explanation": "Số tự nhiên duy nhất nằm giữa 199 và 201 là 200.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B3",
            "lessonName": "Bài 3: Thứ tự trong tập hợp các số tự nhiên",
            "level": "TH",
            "xp": 20
          },
          {
            "id": "3_5",
            "number": 5,
            "type": "mcq",
            "content": "Tính giá trị biểu thức: $125 - 25 - 30$.",
            "options": [
              {
                "key": "A",
                "text": "130"
              },
              {
                "key": "B",
                "text": "70"
              },
              {
                "key": "C",
                "text": "100"
              },
              {
                "key": "D",
                "text": "80"
              }
            ],
            "correctAnswer": "B",
            "explanation": "Thực hiện theo thứ tự từ trái qua phải: $125 - 25 = 100$, sau đó $100 - 30 = 70$.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B4",
            "lessonName": "Bài 4: Phép cộng và phép trừ số tự nhiên",
            "level": "TH",
            "xp": 20
          },
          {
            "id": "3_6",
            "number": 6,
            "type": "mcq",
            "content": "Tìm số tự nhiên $x$, biết: $x + 49 = 100$.",
            "options": [
              {
                "key": "A",
                "text": "$x = 149$"
              },
              {
                "key": "B",
                "text": "$x = 51$"
              },
              {
                "key": "C",
                "text": "$x = 41$"
              },
              {
                "key": "D",
                "text": "$x = 61$"
              }
            ],
            "correctAnswer": "B",
            "explanation": "Muốn tìm số hạng chưa biết, ta lấy tổng trừ đi số hạng đã biết: $x = 100 - 49 = 51$.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B4",
            "lessonName": "Bài 4: Phép cộng và phép trừ số tự nhiên",
            "level": "TH",
            "xp": 20
          }
        ]
      },
      {
        "partId": 2,
        "title": "PHẦN 2: TRẮC NGHIỆM ĐÚNG/SAI (2 câu)",
        "instruction": "Đánh dấu Đúng (Đ) hoặc Sai (S) cho mỗi ý a, b, c, d.",
        "questions": [
          {
            "id": "3_7",
            "number": 7,
            "type": "tf",
            "content": "Cho các tập hợp và phần tử:",
            "items": [
              {
                "key": "a",
                "text": "$0 \\in \\mathbb{N}^*$.",
                "correctAnswer": "S",
                "explanation": "Sai, vì $\\mathbb{N}^*$ là tập các số tự nhiên khác 0."
              },
              {
                "key": "b",
                "text": "Tập hợp các số tự nhiên $\\mathbb{N} = \\{0; 1; 2; 3; \\dots\\}$.",
                "correctAnswer": "Đ",
                "explanation": "Đúng theo định nghĩa tập số tự nhiên $\\mathbb{N}$."
              },
              {
                "key": "c",
                "text": "Hai chữ số 3 và 5 ghép được thành hai số có hai chữ số khác nhau là 35 và 53.",
                "correctAnswer": "Đ",
                "explanation": "Đúng, các số có 2 chữ số khác nhau tạo từ 3 và 5 là 35 và 53."
              },
              {
                "key": "d",
                "text": "Khi viết tập hợp bằng cách liệt kê, mỗi phần tử có thể viết lặp lại nhiều lần.",
                "correctAnswer": "S",
                "explanation": "Sai, quy tắc viết tập hợp là mỗi phần tử chỉ được liệt kê một lần."
              }
            ],
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B1",
            "lessonName": "Bài 1: Tập hợp",
            "level": "TH",
            "xp": 25
          },
          {
            "id": "3_8",
            "number": 8,
            "type": "tf",
            "content": "Xét các mối quan hệ trong phép cộng và phép trừ:",
            "items": [
              {
                "key": "a",
                "text": "Muốn tìm số hạng chưa biết, ta lấy tổng trừ đi số hạng đã biết.",
                "correctAnswer": "Đ",
                "explanation": "Đúng theo quy tắc tìm thành phần chưa biết của phép cộng."
              },
              {
                "key": "b",
                "text": "Trong phép tính $a - b = c$, $b$ được gọi là số bị trừ.",
                "correctAnswer": "S",
                "explanation": "Sai, trong phép tính $a - b = c$, $a$ là số bị trừ, còn $b$ là số trừ."
              },
              {
                "key": "c",
                "text": "Nếu $x - 5 = 10$ thì $x = 15$.",
                "correctAnswer": "Đ",
                "explanation": "Đúng, vì $x = 10 + 5 = 15$."
              },
              {
                "key": "d",
                "text": "Phép trừ hai số tự nhiên luôn luôn thực hiện được.",
                "correctAnswer": "S",
                "explanation": "Sai, phép trừ số tự nhiên chỉ thực hiện được khi số bị trừ lớn hơn hoặc bằng số trừ."
              }
            ],
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B4",
            "lessonName": "Bài 4: Phép cộng và phép trừ số tự nhiên",
            "level": "VD",
            "xp": 35
          }
        ]
      },
      {
        "partId": 3,
        "title": "PHẦN 3: TRẮC NGHIỆM TRẢ LỜI NGẮN (2 câu)",
        "instruction": "Ghi kết quả cuối cùng (số nguyên hoặc giá trị cần tìm). Mỗi câu đúng 1.5 điểm.",
        "questions": [
          {
            "id": "3_9",
            "number": 9,
            "type": "short",
            "content": "Trong buổi thu gom nắp chai tái chế, Nhóm 1 gom được 145 chiếc, Nhóm 2 gom được 120 chiếc. Cả hai nhóm thu được tổng cộng bao nhiêu nắp chai?",
            "correctAnswers": [
              "265",
              "265 chiếc",
              "265 nắp chai"
            ],
            "unit": "nắp chai",
            "explanation": "Tổng số nắp chai cả hai nhóm gom được là: $145 + 120 = 265$ (chiếc).",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B4",
            "lessonName": "Bài 4: Phép cộng và phép trừ số tự nhiên",
            "level": "VD",
            "xp": 35
          },
          {
            "id": "3_10",
            "number": 10,
            "type": "short",
            "content": "Tính nhanh: $2026 + 199 - 26$.",
            "correctAnswers": [
              "2199"
            ],
            "explanation": "Áp dụng giao hoán và kết hợp: $(2026 - 26) + 199 = 2000 + 199 = 2199$.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B4",
            "lessonName": "Bài 4: Phép cộng và phép trừ số tự nhiên",
            "level": "VD",
            "xp": 35
          }
        ]
      }
    ],
    "gradeNum": 6,
    "book": "KNTT",
    "chapter": 1
  },
  {
    "id": 4,
    "title": "Đề số 4: Ôn tập Bài 1 đến Bài 4 (Chương I)",
    "subtitle": "Tập hợp - Số tự nhiên - Thứ tự số tự nhiên - Phép cộng và trừ",
    "grade": "Toán 6",
    "timeMinutes": 20,
    "parts": [
      {
        "partId": 1,
        "title": "PHẦN 1: TRẮC NGHIỆM NHIỀU LỰA CHỌN (6 câu)",
        "instruction": "Chọn một phương án đúng nhất. Mỗi câu đúng được 0.5 điểm.",
        "questions": [
          {
            "id": "4_1",
            "number": 1,
            "type": "mcq",
            "content": "Cho tập hợp $P = \\{a; b; c\\}$. Kí hiệu nào sau đây đúng?",
            "options": [
              {
                "key": "A",
                "text": "$a \\notin P$"
              },
              {
                "key": "B",
                "text": "$d \\in P$"
              },
              {
                "key": "C",
                "text": "$b \\in P$"
              },
              {
                "key": "D",
                "text": "$P \\in c$"
              }
            ],
            "correctAnswer": "C",
            "explanation": "Vì $b$ là một phần tử thuộc tập hợp $P$, nên $b \\in P$ là chính xác.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B1",
            "lessonName": "Bài 1: Tập hợp",
            "level": "NB",
            "xp": 10
          },
          {
            "id": "4_2",
            "number": 2,
            "type": "mcq",
            "content": "Số chẵn liền sau của số 10 là:",
            "options": [
              {
                "key": "A",
                "text": "8"
              },
              {
                "key": "B",
                "text": "9"
              },
              {
                "key": "C",
                "text": "11"
              },
              {
                "key": "D",
                "text": "12"
              }
            ],
            "correctAnswer": "D",
            "explanation": "Hai số chẵn liên tiếp hơn kém nhau 2 đơn vị. Số chẵn liền sau số 10 là $10 + 2 = 12$.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B3",
            "lessonName": "Bài 3: Thứ tự trong tập hợp các số tự nhiên",
            "level": "NB",
            "xp": 10
          },
          {
            "id": "4_3",
            "number": 3,
            "type": "mcq",
            "content": "Số La Mã XXIX có giá trị là:",
            "options": [
              {
                "key": "A",
                "text": "21"
              },
              {
                "key": "B",
                "text": "19"
              },
              {
                "key": "C",
                "text": "29"
              },
              {
                "key": "D",
                "text": "31"
              }
            ],
            "correctAnswer": "C",
            "explanation": "XX biểu thị 20, IX biểu thị 9. Do đó $\\text{XXIX} = 20 + 9 = 29$.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B2",
            "lessonName": "Bài 2: Cách ghi số tự nhiên",
            "level": "TH",
            "xp": 20
          },
          {
            "id": "4_4",
            "number": 4,
            "type": "mcq",
            "content": "Số tự nhiên nhỏ nhất có 3 chữ số khác nhau là:",
            "options": [
              {
                "key": "A",
                "text": "100"
              },
              {
                "key": "B",
                "text": "102"
              },
              {
                "key": "C",
                "text": "123"
              },
              {
                "key": "D",
                "text": "987"
              }
            ],
            "correctAnswer": "B",
            "explanation": "Chữ số hàng trăm nhỏ nhất phải khác 0 nên là 1, chữ số hàng chục nhỏ nhất khác 1 nên là 0, chữ số hàng đơn vị nhỏ nhất khác 1 và 0 là 2. Vậy số đó là 102.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B2",
            "lessonName": "Bài 2: Cách ghi số tự nhiên",
            "level": "NB",
            "xp": 10
          },
          {
            "id": "4_5",
            "number": 5,
            "type": "mcq",
            "content": "Tính $200 - 55$:",
            "options": [
              {
                "key": "A",
                "text": "145"
              },
              {
                "key": "B",
                "text": "155"
              },
              {
                "key": "C",
                "text": "135"
              },
              {
                "key": "D",
                "text": "255"
              }
            ],
            "correctAnswer": "A",
            "explanation": "Thực hiện phép trừ: $200 - 55 = 145$.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B4",
            "lessonName": "Bài 4: Phép cộng và phép trừ số tự nhiên",
            "level": "TH",
            "xp": 20
          },
          {
            "id": "4_6",
            "number": 6,
            "type": "mcq",
            "content": "Tìm $x$, biết: $x - 15 = 49$.",
            "options": [
              {
                "key": "A",
                "text": "$x = 34$"
              },
              {
                "key": "B",
                "text": "$x = 64$"
              },
              {
                "key": "C",
                "text": "$x = 54$"
              },
              {
                "key": "D",
                "text": "$x = 74$"
              }
            ],
            "correctAnswer": "B",
            "explanation": "Số bị trừ = hiệu + số trừ: $x = 49 + 15 = 64$.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B4",
            "lessonName": "Bài 4: Phép cộng và phép trừ số tự nhiên",
            "level": "TH",
            "xp": 20
          }
        ]
      },
      {
        "partId": 2,
        "title": "PHẦN 2: TRẮC NGHIỆM ĐÚNG/SAI (2 câu)",
        "instruction": "Đánh dấu Đúng (Đ) hoặc Sai (S) cho mỗi ý a, b, c, d.",
        "questions": [
          {
            "id": "4_7",
            "number": 7,
            "type": "tf",
            "content": "Quy tắc ghi số tự nhiên:",
            "items": [
              {
                "key": "a",
                "text": "Số tự nhiên được ghi bởi 10 chữ số từ 0 đến 9.",
                "correctAnswer": "Đ",
                "explanation": "Đúng, hệ thập phân sử dụng 10 chữ số: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9."
              },
              {
                "key": "b",
                "text": "Giá trị của một chữ số không thay đổi dù đứng ở bất kì vị trí nào.",
                "correctAnswer": "S",
                "explanation": "Sai, hệ thập phân là hệ ghi số theo vị trí; giá trị của mỗi chữ số phụ thuộc vào hàng mà nó đứng."
              },
              {
                "key": "c",
                "text": "Số tự nhiên có hai chữ số thì chữ số hàng chục phải khác 0.",
                "correctAnswer": "Đ",
                "explanation": "Đúng, chữ số đầu tiên của một số tự nhiên luôn phải khác 0."
              },
              {
                "key": "d",
                "text": "Chữ số 0 không được phép đứng cuối cùng của một số.",
                "correctAnswer": "S",
                "explanation": "Sai, chữ số 0 hoàn toàn có thể đứng ở hàng đơn vị (ví dụ các số tròn chục, tròn trăm: 10, 20, 100)."
              }
            ],
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B2",
            "lessonName": "Bài 2: Cách ghi số tự nhiên",
            "level": "TH",
            "xp": 25
          },
          {
            "id": "4_8",
            "number": 8,
            "type": "tf",
            "content": "Thứ tự các số trên tia số:",
            "items": [
              {
                "key": "a",
                "text": "Nếu $a < b$ thì điểm $a$ nằm bên phải điểm $b$.",
                "correctAnswer": "S",
                "explanation": "Sai, nếu $a < b$ thì điểm $a$ phải nằm bên trái điểm $b$ trên tia số nằm ngang."
              },
              {
                "key": "b",
                "text": "Số liền trước của một số luôn nhỏ hơn số đó 1 đơn vị.",
                "correctAnswer": "Đ",
                "explanation": "Đúng, số liền trước của $n$ (với $n > 0$) là $n - 1$."
              },
              {
                "key": "c",
                "text": "Tính chất bắc cầu: Nếu $a < b$ và $b < c$ thì $a < c$.",
                "correctAnswer": "Đ",
                "explanation": "Đúng, đây là tính chất bắc cầu của quan hệ so sánh thứ tự."
              },
              {
                "key": "d",
                "text": "Điểm biểu diễn số 100 luôn nằm bên phải điểm biểu diễn số 99.",
                "correctAnswer": "Đ",
                "explanation": "Đúng, vì $100 > 99$."
              }
            ],
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B3",
            "lessonName": "Bài 3: Thứ tự trong tập hợp các số tự nhiên",
            "level": "TH",
            "xp": 25
          }
        ]
      },
      {
        "partId": 3,
        "title": "PHẦN 3: TRẮC NGHIỆM TRẢ LỜI NGẮN (2 câu)",
        "instruction": "Ghi kết quả cuối cùng (số nguyên hoặc giá trị cần tìm). Mỗi câu đúng 1.5 điểm.",
        "questions": [
          {
            "id": "4_9",
            "number": 9,
            "type": "short",
            "content": "Tìm số tự nhiên $x$ thỏa mãn điều kiện $15 < x < 17$.",
            "correctAnswers": [
              "16"
            ],
            "explanation": "Số tự nhiên duy nhất nằm giữa 15 và 17 là 16.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B3",
            "lessonName": "Bài 3: Thứ tự trong tập hợp các số tự nhiên",
            "level": "VD",
            "xp": 35
          },
          {
            "id": "4_10",
            "number": 10,
            "type": "short",
            "content": "Khối 6 của trường THCS Đặng Thúc Vịnh có tổng cộng 120 học sinh. Biết riêng lớp 6A có 49 học sinh. Hỏi các lớp còn lại của khối 6 có tổng cộng bao nhiêu học sinh?",
            "correctAnswers": [
              "71",
              "71 học sinh"
            ],
            "unit": "học sinh",
            "explanation": "Số học sinh các lớp còn lại của khối 6 là: $120 - 49 = 71$ (học sinh).",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B4",
            "lessonName": "Bài 4: Phép cộng và phép trừ số tự nhiên",
            "level": "VDC",
            "xp": 50
          }
        ]
      }
    ],
    "gradeNum": 6,
    "book": "KNTT",
    "chapter": 1
  },
  {
    "id": 5,
    "title": "Đề số 5: Ôn tập Bài 1 đến Bài 4 (Chương I)",
    "subtitle": "Tập hợp - Số tự nhiên - Thứ tự số tự nhiên - Phép cộng và trừ",
    "grade": "Toán 6",
    "timeMinutes": 20,
    "parts": [
      {
        "partId": 1,
        "title": "PHẦN 1: TRẮC NGHIỆM NHIỀU LỰA CHỌN (6 câu)",
        "instruction": "Chọn một phương án đúng nhất. Mỗi câu đúng được 0.5 điểm.",
        "questions": [
          {
            "id": "5_1",
            "number": 1,
            "type": "mcq",
            "content": "Tập hợp các số tự nhiên không vượt quá 3 được liệt kê là:",
            "options": [
              {
                "key": "A",
                "text": "$\\{1; 2; 3\\}$"
              },
              {
                "key": "B",
                "text": "$\\{0; 1; 2\\}$"
              },
              {
                "key": "C",
                "text": "$\\{0; 1; 2; 3\\}$"
              },
              {
                "key": "D",
                "text": "$\\{1; 2\\}$"
              }
            ],
            "correctAnswer": "C",
            "explanation": "\"Không vượt quá 3\" nghĩa là nhỏ hơn hoặc bằng 3. Trong tập số tự nhiên gồm các số $0, 1, 2, 3$.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B1",
            "lessonName": "Bài 1: Tập hợp",
            "level": "NB",
            "xp": 10
          },
          {
            "id": "5_2",
            "number": 2,
            "type": "mcq",
            "content": "Số tự nhiên lớn nhất có 2 chữ số là:",
            "options": [
              {
                "key": "A",
                "text": "90"
              },
              {
                "key": "B",
                "text": "98"
              },
              {
                "key": "C",
                "text": "99"
              },
              {
                "key": "D",
                "text": "100"
              }
            ],
            "correctAnswer": "C",
            "explanation": "Các số có 2 chữ số chạy từ 10 đến 99, do đó số lớn nhất là 99.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B2",
            "lessonName": "Bài 2: Cách ghi số tự nhiên",
            "level": "NB",
            "xp": 10
          },
          {
            "id": "5_3",
            "number": 3,
            "type": "mcq",
            "content": "Viết số 14 bằng chữ số La Mã:",
            "options": [
              {
                "key": "A",
                "text": "XIIII"
              },
              {
                "key": "B",
                "text": "XIV"
              },
              {
                "key": "C",
                "text": "XVI"
              },
              {
                "key": "D",
                "text": "VIX"
              }
            ],
            "correctAnswer": "B",
            "explanation": "Số $14 = 10 + 4$. Số 10 là X, số 4 là IV, do đó viết là XIV.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B2",
            "lessonName": "Bài 2: Cách ghi số tự nhiên",
            "level": "TH",
            "xp": 20
          },
          {
            "id": "5_4",
            "number": 4,
            "type": "mcq",
            "content": "Điền kí hiệu thích hợp vào chỗ trống: $2025 \\dots 2026$.",
            "options": [
              {
                "key": "A",
                "text": "$>$"
              },
              {
                "key": "B",
                "text": "$=$"
              },
              {
                "key": "C",
                "text": "$<$"
              },
              {
                "key": "D",
                "text": "$\\ge$"
              }
            ],
            "correctAnswer": "C",
            "explanation": "Vì $2025$ nhỏ hơn $2026$ nên điền dấu $<$, ta được $2025 < 2026$.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B3",
            "lessonName": "Bài 3: Thứ tự trong tập hợp các số tự nhiên",
            "level": "NB",
            "xp": 10
          },
          {
            "id": "5_5",
            "number": 5,
            "type": "mcq",
            "content": "Tính: $45 + 55$.",
            "options": [
              {
                "key": "A",
                "text": "90"
              },
              {
                "key": "B",
                "text": "100"
              },
              {
                "key": "C",
                "text": "110"
              },
              {
                "key": "D",
                "text": "80"
              }
            ],
            "correctAnswer": "B",
            "explanation": "$45 + 55 = 100$.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B4",
            "lessonName": "Bài 4: Phép cộng và phép trừ số tự nhiên",
            "level": "NB",
            "xp": 10
          },
          {
            "id": "5_6",
            "number": 6,
            "type": "mcq",
            "content": "Tìm số tự nhiên $x$, biết $50 - x = 10$.",
            "options": [
              {
                "key": "A",
                "text": "$x = 60$"
              },
              {
                "key": "B",
                "text": "$x = 500$"
              },
              {
                "key": "C",
                "text": "$x = 40$"
              },
              {
                "key": "D",
                "text": "$x = 5$"
              }
            ],
            "correctAnswer": "C",
            "explanation": "Số trừ = số bị trừ - hiệu: $x = 50 - 10 = 40$.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B4",
            "lessonName": "Bài 4: Phép cộng và phép trừ số tự nhiên",
            "level": "TH",
            "xp": 20
          }
        ]
      },
      {
        "partId": 2,
        "title": "PHẦN 2: TRẮC NGHIỆM ĐÚNG/SAI (2 câu)",
        "instruction": "Đánh dấu Đúng (Đ) hoặc Sai (S) cho mỗi ý a, b, c, d.",
        "questions": [
          {
            "id": "5_7",
            "number": 7,
            "type": "tf",
            "content": "Mối quan hệ giữa phép cộng và phép trừ:",
            "items": [
              {
                "key": "a",
                "text": "Nếu $a + b = c$ thì $c - a = b$.",
                "correctAnswer": "Đ",
                "explanation": "Đúng, đây là mối liên hệ nghịch đảo giữa phép cộng và phép trừ."
              },
              {
                "key": "b",
                "text": "Số bị trừ = Số trừ - Hiệu.",
                "correctAnswer": "S",
                "explanation": "Sai, quy tắc đúng là: Số bị trừ = Số trừ + Hiệu."
              },
              {
                "key": "c",
                "text": "Tổng của hai số tự nhiên luôn lớn hơn hoặc bằng mỗi số hạng của tổng.",
                "correctAnswer": "Đ",
                "explanation": "Đúng, vì $a, b \\ge 0$ nên $a + b \\ge a$ và $a + b \\ge b$."
              },
              {
                "key": "d",
                "text": "Muốn tìm số trừ, ta lấy số bị trừ cộng với hiệu.",
                "correctAnswer": "S",
                "explanation": "Sai, quy tắc đúng là: Số trừ = Số bị trừ - Hiệu."
              }
            ],
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B4",
            "lessonName": "Bài 4: Phép cộng và phép trừ số tự nhiên",
            "level": "VD",
            "xp": 35
          },
          {
            "id": "5_8",
            "number": 8,
            "type": "tf",
            "content": "Kí hiệu chữ số La Mã:",
            "items": [
              {
                "key": "a",
                "text": "Chữ V có giá trị là 5.",
                "correctAnswer": "Đ",
                "explanation": "Đúng, trong ký tự La Mã, V đại diện cho số 5."
              },
              {
                "key": "b",
                "text": "Chữ IX có giá trị là 11.",
                "correctAnswer": "S",
                "explanation": "Sai, IX có giá trị là 9 (10 - 1), còn 11 là XI."
              },
              {
                "key": "c",
                "text": "Cụm IV có giá trị là 4.",
                "correctAnswer": "Đ",
                "explanation": "Đúng, IV có giá trị là 4 (5 - 1)."
              },
              {
                "key": "d",
                "text": "Chữ X đứng trước chữ V thì giá trị giảm đi (XV là 5).",
                "correctAnswer": "S",
                "explanation": "Sai, XV là $10 + 5 = 15$."
              }
            ],
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B2",
            "lessonName": "Bài 2: Cách ghi số tự nhiên",
            "level": "TH",
            "xp": 25
          }
        ]
      },
      {
        "partId": 3,
        "title": "PHẦN 3: TRẮC NGHIỆM TRẢ LỜI NGẮN (2 câu)",
        "instruction": "Ghi kết quả cuối cùng (số nguyên hoặc giá trị cần tìm). Mỗi câu đúng 1.5 điểm.",
        "questions": [
          {
            "id": "5_9",
            "number": 9,
            "type": "short",
            "content": "Để chia nhóm thực hành môn Toán, giáo viên yêu cầu mỗi nhóm có đúng 5 bạn. Nếu một lớp có 49 học sinh, lớp đó sẽ xếp được nhiều nhất bao nhiêu nhóm đủ 5 bạn?",
            "correctAnswers": [
              "9",
              "9 nhóm"
            ],
            "unit": "nhóm",
            "explanation": "Thực hiện phép chia có dư: $49 : 5 = 9$ (dư 4). Vậy xếp được nhiều nhất 9 nhóm đủ 5 bạn (còn dư 4 bạn).",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B4",
            "lessonName": "Bài 4: Phép cộng và phép trừ số tự nhiên",
            "level": "VD",
            "xp": 35
          },
          {
            "id": "5_10",
            "number": 10,
            "type": "short",
            "content": "Tính nhẩm giá trị biểu thức: $199 + 45$.",
            "correctAnswers": [
              "244"
            ],
            "explanation": "Áp dụng phương pháp thêm - bớt: $199 + 1 + 44 = 200 + 44 = 244$.",
            "grade": 6,
            "book": "KNTT",
            "chapter": 1,
            "lessonId": "K6_C1_B4",
            "lessonName": "Bài 4: Phép cộng và phép trừ số tự nhiên",
            "level": "VD",
            "xp": 35
          }
        ]
      }
    ],
    "gradeNum": 6,
    "book": "KNTT",
    "chapter": 1
  }
];

const KNTT_CURRICULUM_TREE = {
  "6": {
    "gradeName": "Toán 6 (Kết nối tri thức với cuộc sống)",
    "chapters": [
      {
        "chapterId": 1,
        "title": "Chương I: Tập hợp các số tự nhiên",
        "description": "Tập hợp, hệ thập phân, số La Mã, thứ tự số tự nhiên, phép tính cộng trừ nhân chia",
        "lessons": [
          {
            "lessonId": "K6_C1_B1",
            "name": "Bài 1: Tập hợp",
            "questionCount": 9
          },
          {
            "lessonId": "K6_C1_B2",
            "name": "Bài 2: Cách ghi số tự nhiên",
            "questionCount": 12
          },
          {
            "lessonId": "K6_C1_B3",
            "name": "Bài 3: Thứ tự trong tập hợp các số tự nhiên",
            "questionCount": 9
          },
          {
            "lessonId": "K6_C1_B4",
            "name": "Bài 4: Phép cộng và phép trừ số tự nhiên",
            "questionCount": 20
          },
          {
            "lessonId": "K6_C1_B5",
            "name": "Bài 5: Phép nhân và phép chia số tự nhiên",
            "questionCount": 0
          },
          {
            "lessonId": "K6_C1_B6",
            "name": "Bài 6: Lũy thừa với số mũ tự nhiên",
            "questionCount": 0
          },
          {
            "lessonId": "K6_C1_B7",
            "name": "Bài 7: Thứ tự thực hiện các phép tính",
            "questionCount": 0
          },
          {
            "lessonId": "K6_C1_OT",
            "name": "Ôn tập Chương I",
            "questionCount": 50
          }
        ]
      },
      {
        "chapterId": 2,
        "title": "Chương II: Tính chia hết trong tập hợp các số tự nhiên",
        "description": "Quan hệ chia hết, dấu hiệu chia hết cho 2, 3, 5, 9, số nguyên tố, ƯCLN và BCNN",
        "lessons": [
          {
            "lessonId": "K6_C2_B8",
            "name": "Bài 8: Quan hệ chia hết và tính chất",
            "questionCount": 0
          },
          {
            "lessonId": "K6_C2_B9",
            "name": "Bài 9: Dấu hiệu chia hết",
            "questionCount": 0
          },
          {
            "lessonId": "K6_C2_B10",
            "name": "Bài 10: Số nguyên tố",
            "questionCount": 0
          },
          {
            "lessonId": "K6_C2_B11",
            "name": "Bài 11: Ước chung. Ước chung lớn nhất",
            "questionCount": 0
          },
          {
            "lessonId": "K6_C2_B12",
            "name": "Bài 12: Bội chung. Bội chung nhỏ nhất",
            "questionCount": 0
          }
        ]
      },
      {
        "chapterId": 3,
        "title": "Chương III: Số nguyên",
        "description": "Tập hợp các số nguyên âm, số nguyên dương, trục số và các phép toán",
        "lessons": [
          {
            "lessonId": "K6_C3_B13",
            "name": "Bài 13: Tập hợp các số nguyên",
            "questionCount": 0
          },
          {
            "lessonId": "K6_C3_B14",
            "name": "Bài 14: Phép cộng và phép trừ số nguyên",
            "questionCount": 0
          },
          {
            "lessonId": "K6_C3_B15",
            "name": "Bài 15: Quy tắc dấu ngoặc",
            "questionCount": 0
          },
          {
            "lessonId": "K6_C3_B16",
            "name": "Bài 16: Phép nhân số nguyên",
            "questionCount": 0
          },
          {
            "lessonId": "K6_C3_B17",
            "name": "Bài 17: Phép chia hết. Ước và bội của số nguyên",
            "questionCount": 0
          }
        ]
      },
      {
        "chapterId": 4,
        "title": "Chương IV: Một số hình phẳng trong thực tiễn",
        "description": "Tam giác đều, hình vuông, lục giác đều, hình chữ nhật, hình thoi, hình bình hành, hình thang cân",
        "lessons": [
          {
            "lessonId": "K6_C4_B18",
            "name": "Bài 18: Tam giác đều. Hình vuông. Lục giác đều",
            "questionCount": 0
          },
          {
            "lessonId": "K6_C4_B19",
            "name": "Bài 19: Hình chữ nhật. Hình thoi",
            "questionCount": 0
          },
          {
            "lessonId": "K6_C4_B20",
            "name": "Bài 20: Hình bình hành. Hình thang cân",
            "questionCount": 0
          },
          {
            "lessonId": "K6_C4_B21",
            "name": "Bài 21: Chu vi và diện tích các hình phẳng",
            "questionCount": 0
          }
        ]
      },
      {
        "chapterId": 5,
        "title": "Chương V: Tính đối xứng của hình phẳng trong tự nhiên",
        "description": "Hình có trục đối xứng, hình có tâm đối xứng trong đời sống và nghệ thuật",
        "lessons": [
          {
            "lessonId": "K6_C5_B22",
            "name": "Bài 22: Hình có trục đối xứng",
            "questionCount": 0
          },
          {
            "lessonId": "K6_C5_B23",
            "name": "Bài 23: Hình có tâm đối xứng",
            "questionCount": 0
          }
        ]
      }
    ]
  },
  "7": {
    "gradeName": "Toán 7 (Kết nối tri thức với cuộc sống)",
    "chapters": [
      {
        "chapterId": 1,
        "title": "Chương I: Số hữu tỉ",
        "description": "Tập hợp các số hữu tỉ, các phép tính với số hữu tỉ và lũy thừa",
        "lessons": [
          {
            "lessonId": "K7_C1_B1",
            "name": "Bài 1: Tập hợp các số hữu tỉ",
            "questionCount": 0
          },
          {
            "lessonId": "K7_C1_B2",
            "name": "Bài 2: Cộng, trừ, nhân, chia số hữu tỉ",
            "questionCount": 0
          }
        ]
      },
      {
        "chapterId": 2,
        "title": "Chương II: Số thực",
        "description": "Số vô tỉ, căn bậc hai số học và tập hợp số thực",
        "lessons": [
          {
            "lessonId": "K7_C2_B5",
            "name": "Bài 5: Số vô tỉ. Căn bậc hai số học",
            "questionCount": 0
          }
        ]
      }
    ]
  },
  "8": {
    "gradeName": "Toán 8 (Kết nối tri thức với cuộc sống)",
    "chapters": [
      {
        "chapterId": 1,
        "title": "Chương I: Đa thức",
        "description": "Đơn thức, đa thức nhiều biến và các phép toán",
        "lessons": [
          {
            "lessonId": "K8_C1_B1",
            "name": "Bài 1: Đơn thức",
            "questionCount": 0
          },
          {
            "lessonId": "K8_C1_B2",
            "name": "Bài 2: Đa thức",
            "questionCount": 0
          }
        ]
      }
    ]
  },
  "9": {
    "gradeName": "Toán 9 (Kết nối tri thức với cuộc sống)",
    "chapters": [
      {
        "chapterId": 1,
        "title": "Chương I: Phương trình và hệ phương trình",
        "description": "Phương trình bậc nhất hai ẩn, hệ hai phương trình bậc nhất hai ẩn",
        "lessons": [
          {
            "lessonId": "K9_C1_B1",
            "name": "Bài 1: Khái niệm phương trình bậc nhất hai ẩn",
            "questionCount": 0
          }
        ]
      }
    ]
  }
};


/**
 * Hàm truy vấn câu hỏi linh hoạt cho Đấu trường OLM và Luyện tập
 * @param {Object} options - { grade, chapter, lessonId, level, limit, shuffle }
 * @returns {Array} Danh sách câu hỏi phù hợp
 */
function getQuestionsForArena(options) {
  options = options || {};
  var grade = options.grade || 6;
  var chapter = options.chapter || null;
  var lessonId = options.lessonId || null;
  var level = options.level || null;
  var limit = typeof options.limit === 'number' ? options.limit : 10;
  var shuffle = options.shuffle !== false;

  var pool = [];

  // 1. Thu thập từ EXAM_DATA mặc định
  if (Array.isArray(EXAM_DATA)) {
    EXAM_DATA.forEach(function(exam) {
      if (exam.gradeNum && exam.gradeNum !== Number(grade)) return;
      if (exam.parts) {
        exam.parts.forEach(function(part) {
          if (part.questions) {
            part.questions.forEach(function(q) {
              pool.push(Object.assign({}, q, {
                examId: exam.id,
                examTitle: exam.title,
                partId: part.partId
              }));
            });
          }
        });
      }
    });
  }

  // 2. Thu thập thêm từ LocalStorage nếu giáo viên nạp câu hỏi mới
  try {
    if (typeof localStorage !== 'undefined') {
      var stored = localStorage.getItem('TN_TOAN_TEACHER_DATA_V2');
      if (stored) {
        var customData = JSON.parse(stored);
        if (Array.isArray(customData)) {
          customData.forEach(function(exam) {
            if (exam.gradeNum && exam.gradeNum !== Number(grade)) return;
            if (exam.parts) {
              exam.parts.forEach(function(part) {
                if (part.questions) {
                  part.questions.forEach(function(q) {
                    pool.push(Object.assign({}, q, {
                      examId: exam.id,
                      examTitle: exam.title,
                      partId: part.partId,
                      isCustom: true
                    }));
                  });
                }
              });
            }
          });
        }
      }
    }
  } catch (e) {
    console.warn('Không thể nạp dữ liệu câu hỏi tùy chỉnh:', e);
  }

  // 3. Lọc theo tiêu chí
  var filtered = pool.filter(function(q) {
    if (grade && q.grade && q.grade !== Number(grade)) return false;
    if (chapter && q.chapter && q.chapter !== Number(chapter)) return false;
    if (lessonId && q.lessonId && q.lessonId !== lessonId) return false;
    if (level && level !== 'ALL' && q.level && q.level !== level) return false;
    return true;
  });

  // Nếu bộ lọc quá hẹp dẫn tới rỗng, lấy từ toàn bộ câu hỏi khối lớp
  if (filtered.length === 0) {
    filtered = pool.filter(function(q) {
      return !grade || (q.grade === Number(grade));
    });
  }

  // 4. Trộn ngẫu nhiên
  if (shuffle) {
    filtered = filtered.slice().sort(function() { return Math.random() - 0.5; });
  }

  // 5. Cắt theo số lượng giới hạn
  if (limit && limit > 0) {
    return filtered.slice(0, limit);
  }

  return filtered;
}

// =============================================================================
// BỘ CÔNG CỤ CHUẨN HÓA CÔNG THỨC KATEX & BÓC TÁCH ĐỀ THI TỰ ĐỘNG
// =============================================================================

const VN_DIACRITICS = /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẼẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴĐ]/i;

const VN_COMMON_WORDS = new Set([
  'cho', 'biết', 'tìm', 'tính', 'hãy', 'các', 'sau', 'khi', 'thu', 'gọn', 'bậc', 'số', 'phần', 'hệ',
  'đa', 'thức', 'đơn', 'là', 'nào', 'dưới', 'đây', 'đúng', 'sai', 'giá', 'trị', 'tại', 'với', 'trong',
  'kết', 'quả', 'phép', 'tổng', 'hiệu', 'tích', 'thương', 'rút', 'khẳng', 'định', 'tập', 'hợp', 'tự', 'nhiên'
]);

function isVietnameseWord(word) {
  if (!word) return false;
  var clean = word.toLowerCase().replace(/^[^\p{L}]+|[^\p{L}]+$/gu, '');
  if (!clean) return false;
  if (VN_DIACRITICS.test(clean)) return true;
  if (VN_COMMON_WORDS.has(clean)) return true;
  if (clean.length >= 3 && /^[a-zA-Z]+$/.test(clean) && !['sin', 'cos', 'tan', 'cot', 'log', 'lim', 'deg'].includes(clean)) {
    return true;
  }
  return false;
}

function normalizeMath(text) {
  if (!text) return '';
  text = String(text).trim();

  // Nếu chuỗi đã chứa kí hiệu KaTeX thì giữ nguyên
  if (text.includes('$') || text.includes('\\(') || text.includes('\\[') || text.includes('$$')) {
    return text;
  }

  // 1. Nếu toàn bộ chuỗi là phương án trắc nghiệm toán / công thức thuần (không chứa tiếng Việt)
  var words = text.split(/\s+/);
  var hasVn = words.some(function(w) { return isVietnameseWord(w); });

  if (!hasVn && /[0-9a-zA-Z\^\_\+\-\*\/\(\)\{\}\=\>\<]/.test(text)) {
    var math = text;
    math = math.replace(/(^|\s|\()(-?\d+)\/(\d+)($|\s|\))/g, '$1\\frac{$2}{$3}$4');
    math = math.replace(/\s*\*\s*/g, ' \\cdot ');
    return '$' + math.trim() + '$';
  }

  // 2. Nếu là câu tiếng Việt chứa công thức toán xen kẽ
  var tokens = text.split(/(\s+)/);
  var mathBuffer = [];
  var resultTokens = [];

  function flushMath() {
    if (mathBuffer.length > 0) {
      var mathStr = mathBuffer.join('');
      var trailingPunct = '';
      var punctMatch = mathStr.match(/([;:,.\?!]+)$/);
      if (punctMatch) {
        trailingPunct = punctMatch[1];
        mathStr = mathStr.substring(0, mathStr.length - trailingPunct.length);
      }

      mathStr = mathStr.trim();
      if (mathStr) {
        mathStr = mathStr.replace(/\((-?\d+)\/(\d+)\)/g, '\\frac{$1}{$2}');
        mathStr = mathStr.replace(/(^|\s)(-?\d+)\/(\d+)($|\s)/g, '$1\\frac{$2}{$3}$4');
        mathStr = mathStr.replace(/\s*\*\s*/g, ' \\cdot ');
        resultTokens.push('$' + mathStr + '$' + (trailingPunct ? trailingPunct + ' ' : ' '));
      } else if (trailingPunct) {
        resultTokens.push(trailingPunct + ' ');
      }
      mathBuffer = [];
    }
  }

  for (var i = 0; i < tokens.length; i++) {
    var tok = tokens[i];
    if (/^\s+$/.test(tok)) {
      if (mathBuffer.length > 0) {
        mathBuffer.push(tok);
      } else {
        resultTokens.push(tok);
      }
      continue;
    }

    if (isVietnameseWord(tok)) {
      flushMath();
      resultTokens.push(tok);
    } else if (/[0-9\^\_\+\-\*\/\(\)\{\}\=\>\<]/.test(tok) || /^[xyzabckmnpqrABCDEFMNPQR][;:,.\?!]?$/.test(tok)) {
      mathBuffer.push(tok);
    } else {
      flushMath();
      resultTokens.push(tok);
    }
  }
  flushMath();

  return resultTokens.join('').replace(/\s+/g, ' ').trim();
}

function splitOptions(text) {
  if (!text) return [];
  var re = /(?:^|\s+|[\t]+)(?:\[([A-D])\]|([A-D])[\.\:\)])\s*/g;
  var matches = [];
  var m;
  while ((m = re.exec(text)) !== null) {
    matches.push({ key: (m[1] || m[2]).toUpperCase(), index: m.index, matchLength: m[0].length });
  }
  if (matches.length === 0) return [];
  var options = [];
  for (var i = 0; i < matches.length; i++) {
    var cur = matches[i];
    var next = matches[i + 1];
    var start = cur.index + cur.matchLength;
    var end = next ? next.index : text.length;
    var optText = text.substring(start, end).trim();
    optText = normalizeMath(optText);
    options.push({ key: cur.key, text: optText });
  }
  return options;
}

function parseExamQuestions(rawText) {
  if (!rawText) return [];
  rawText = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/\u00A0/g, ' ').trim();

  // 1. Trường hợp nạp chuỗi JSON
  if (rawText.startsWith('[')) {
    try {
      var parsed = JSON.parse(rawText);
      if (Array.isArray(parsed)) {
        return parsed.map(function(item, idx) {
          var content = normalizeMath(item.content || item.question || item.prompt || '');
          var options = [];
          if (Array.isArray(item.options)) {
            options = item.options.map(function(opt) {
              if (typeof opt === 'string') {
                var sp = splitOptions(opt);
                return sp.length > 0 ? sp[0] : { key: 'A', text: normalizeMath(opt) };
              }
              return { key: opt.key || 'A', text: normalizeMath(opt.text || '') };
            });
          }
          return {
            id: item.id || ('q_' + Date.now() + '_' + idx),
            type: item.type || 'mcq',
            level: (item.level || 'NB').toUpperCase(),
            content: content,
            options: options,
            correctAnswer: (item.correctAnswer || item.answer || 'A').toUpperCase(),
            explanation: normalizeMath(item.explanation || item.explain || ''),
            hint: item.hint || ''
          };
        });
      }
    } catch (e) {
      console.warn('JSON parse fallback:', e);
    }
  }

  // 2. Trường hợp nạp văn bản thô / trích xuất từ Word (.docx)
  var lines = rawText.split('\n').map(function(l) { return l.trim(); }).filter(Boolean);
  var questions = [];
  var currentQ = null;

  function pushCurrent() {
    if (currentQ && currentQ.content) {
      currentQ.content = normalizeMath(currentQ.content);
      if (currentQ.explanation) {
        currentQ.explanation = normalizeMath(currentQ.explanation);
      }
      questions.push(currentQ);
      currentQ = null;
    }
  }

  lines.forEach(function(line) {
    var qMatch = line.match(/^(?:Câu|Bài|Q|Question)\s*(\d+)[\.\:]?\s*(.*)/i);
    if (qMatch) {
      pushCurrent();
      currentQ = {
        id: 'q_' + Date.now() + '_' + (questions.length + 1),
        number: parseInt(qMatch[1]) || (questions.length + 1),
        type: 'mcq',
        level: 'NB',
        content: qMatch[2] || '',
        options: [],
        correctAnswer: 'A',
        explanation: '',
        hint: ''
      };
      return;
    }

    if (!currentQ) return;

    var ansMatch = line.match(/^(?:Đáp\s*án|Đáp\s*án\s*đúng|Chọn|Key|Answer)[\.\:\s]+([A-D]|Đúng|Sai|[0-9\/\-\.]+)/i);
    if (ansMatch) {
      currentQ.correctAnswer = ansMatch[1].toUpperCase();
      return;
    }

    var expMatch = line.match(/^(?:Lời\s*giải|Hướng\s*dẫn\s*giải|Giải\s*thích|HDG|Explanation)[\.\:\s]+(.*)/i);
    if (expMatch) {
      currentQ.explanation = expMatch[1];
      return;
    }

    var opts = splitOptions(line);
    if (opts && opts.length > 0) {
      opts.forEach(function(o) {
        var exists = currentQ.options.find(function(ex) { return ex.key === o.key; });
        if (!exists) {
          currentQ.options.push(o);
        }
      });
      return;
    }

    if (currentQ.options.length === 0) {
      currentQ.content += ' ' + line;
    } else {
      currentQ.explanation += (currentQ.explanation ? ' ' : '') + line;
    }
  });

  pushCurrent();
  return questions;
}

function autoRepairQuestions(exams) {
  if (!Array.isArray(exams)) return exams;
  var modified = false;

  exams.forEach(function(exam) {
    if (!exam.parts) return;
    exam.parts.forEach(function(part) {
      if (!part.questions) return;
      part.questions.forEach(function(q) {
        // 1. Tự động sửa chữa các phương án A/B/C/D bị dính vào một ô
        if (q.type === 'mcq' && Array.isArray(q.options)) {
          if (q.options.length === 1 && q.options[0] && q.options[0].text) {
            var rawText = q.options[0].text;
            if (/(?:^|\s+)[B-D][\.\:\)]\s*/.test(rawText)) {
              var fullText = (q.options[0].key ? q.options[0].key + '. ' : '') + rawText;
              var splitOpts = splitOptions(fullText);
              if (splitOpts && splitOpts.length >= 2) {
                q.options = splitOpts;
                modified = true;
              }
            }
          } else if (q.options.length > 1) {
            var mergedText = q.options.map(function(o) { return (o.key ? o.key + '. ' : '') + (o.text || o); }).join(' ');
            if (/(?:^|\s+)B[\.\:\)]\s*/.test(mergedText) && /(?:^|\s+)C[\.\:\)]\s*/.test(mergedText)) {
              var splitOpts = splitOptions(mergedText);
              if (splitOpts && splitOpts.length === 4) {
                q.options = splitOpts;
                modified = true;
              }
            }
          }

          q.options.forEach(function(opt) {
            if (opt && opt.text) {
              var norm = normalizeMath(opt.text);
              if (norm !== opt.text) {
                opt.text = norm;
                modified = true;
              }
            }
          });
        }

        // 2. Chuẩn hóa KaTeX cho nội dung câu hỏi
        if (q.content) {
          var normContent = normalizeMath(q.content);
          if (normContent !== q.content) {
            q.content = normContent;
            modified = true;
          }
        }

        // 3. Chuẩn hóa KaTeX cho lời giải
        if (q.explanation) {
          var normExplain = normalizeMath(q.explanation);
          if (normExplain !== q.explanation) {
            q.explanation = normExplain;
            modified = true;
          }
        }
      });
    });
  });

  return exams;
}

// Hỗ trợ xuất ra môi trường trình duyệt (window) & Node.js
if (typeof window !== 'undefined') {
  window.EXAM_DATA = EXAM_DATA;
  window.KNTT_CURRICULUM_TREE = KNTT_CURRICULUM_TREE;
  window.getQuestionsForArena = getQuestionsForArena;
  window.MathNormalizer = {
    normalizeMath: normalizeMath,
    splitOptions: splitOptions
  };
  window.QuestionParser = {
    parseExamQuestions: parseExamQuestions,
    autoRepairQuestions: autoRepairQuestions
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    EXAM_DATA: EXAM_DATA,
    KNTT_CURRICULUM_TREE: KNTT_CURRICULUM_TREE,
    getQuestionsForArena: getQuestionsForArena,
    normalizeMath: normalizeMath,
    splitOptions: splitOptions,
    parseExamQuestions: parseExamQuestions,
    autoRepairQuestions: autoRepairQuestions
  };
}

