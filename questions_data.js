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
  },
{
  "id": 6,
  "code": "DE-K8-C1-01",
  "title": "Đề số 1: Đơn thức và Đa thức nhiều biến (Bài 1 - Bài 4)",
  "subtitle": "Khái niệm đơn thức, đa thức, phép cộng, trừ và nhân đa thức",
  "grade": "Toán 8",
  "gradeNum": 8,
  "book": "KNTT",
  "chapter": 1,
  "timeMinutes": 45,
  "parts": [
    {
      "partId": 1,
      "title": "PHẦN 1: TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (5 câu)",
      "instruction": "Mỗi câu hỏi chỉ chọn một phương án đúng.",
      "questions": [
        {
          "id": "6_1",
          "number": 1,
          "type": "mcq",
          "level": "NB",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Đơn thức là biểu thức đại số chỉ gồm một số, một biến hoặc một tích giữa các số và các biến. $\\frac{x}{y}$ chứa phép chia cho biến nên không phải là đơn thức.",
          "hint": "Đơn thức không chứa phép cộng, trừ giữa các biến và không chứa biến ở mẫu số.",
          "content": "Trong các biểu thức sau, biểu thức nào là đơn thức?",
          "options": [
            {
              "key": "A",
              "text": "$x + y$"
            },
            {
              "key": "B",
              "text": "$2x^2y$"
            },
            {
              "key": "C",
              "text": "$\\frac{x}{y}$"
            },
            {
              "key": "D",
              "text": "$x - 2$"
            }
          ],
          "correctAnswer": "B",
          "xp": 10
        },
        {
          "id": "6_2",
          "number": 2,
          "type": "mcq",
          "level": "NB",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Hạng tử $x^3y$ có bậc là $3 + 1 = 4$; hạng tử $-2xy^2$ có bậc là $1 + 2 = 3$; số $5$ có bậc $0$. Bậc của đa thức là bậc cao nhất của các hạng tử trong dạng thu gọn, tức là $4$.",
          "hint": "Bậc của đa thức là bậc của hạng tử có bậc cao nhất trong dạng thu gọn.",
          "content": "Bậc của đa thức $P = x^3y - 2xy^2 + 5$ là:",
          "options": [
            {
              "key": "A",
              "text": "$3$"
            },
            {
              "key": "B",
              "text": "$4$"
            },
            {
              "key": "C",
              "text": "$5$"
            },
            {
              "key": "D",
              "text": "$2$"
            }
          ],
          "correctAnswer": "B",
          "xp": 10
        },
        {
          "id": "6_3",
          "number": 3,
          "type": "mcq",
          "level": "TH",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Ta cộng các hệ số và giữ nguyên phần biến: $3x^2y + 5x^2y = (3 + 5)x^2y = 8x^2y$.",
          "hint": "Cộng hai đơn thức đồng dạng: cộng hệ số, giữ nguyên phần biến.",
          "content": "Kết quả của phép tính $3x^2y + 5x^2y$ là:",
          "options": [
            {
              "key": "A",
              "text": "$8x^4y^2$"
            },
            {
              "key": "B",
              "text": "$8x^2y$"
            },
            {
              "key": "C",
              "text": "$15x^2y$"
            },
            {
              "key": "D",
              "text": "$8xy$"
            }
          ],
          "correctAnswer": "B",
          "xp": 20
        },
        {
          "id": "6_4",
          "number": 4,
          "type": "mcq",
          "level": "TH",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Áp dụng quy tắc nhân đơn thức với đa thức: $-2x(x^2 - 3x + 1) = (-2x) \\cdot x^2 - (-2x) \\cdot 3x + (-2x) \\cdot 1 = -2x^3 + 6x^2 - 2x$.",
          "hint": "Lưu ý quy tắc dấu khi nhân: $(-2x) \\cdot (-3x) = +6x^2$.",
          "content": "Kết quả của phép nhân $-2x(x^2 - 3x + 1)$ là:",
          "options": [
            {
              "key": "A",
              "text": "$-2x^3 - 6x^2 - 2x$"
            },
            {
              "key": "B",
              "text": "$-2x^3 + 6x^2 - 2x$"
            },
            {
              "key": "C",
              "text": "$-2x^3 + 6x^2 + 2x$"
            },
            {
              "key": "D",
              "text": "$2x^3 - 6x^2 - 2x$"
            }
          ],
          "correctAnswer": "B",
          "xp": 20
        },
        {
          "id": "6_5",
          "number": 5,
          "type": "mcq",
          "level": "TH",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Ta nhân đa thức với đa thức hoặc dùng hằng đẳng thức hiệu hai bình phương: $(x - 2)(x + 2) = x^2 + 2x - 2x - 4 = x^2 - 4$.",
          "hint": "Áp dụng hằng đẳng thức $(a - b)(a + b) = a^2 - b^2$.",
          "content": "Phép nhân hai đa thức $(x - 2)$ và $(x + 2)$ cho kết quả là:",
          "options": [
            {
              "key": "A",
              "text": "$x^2 - 2$"
            },
            {
              "key": "B",
              "text": "$x^2 - 4$"
            },
            {
              "key": "C",
              "text": "$x^2 + 4$"
            },
            {
              "key": "D",
              "text": "$x^2 - 4x + 4$"
            }
          ],
          "correctAnswer": "B",
          "xp": 20
        }
      ]
    },
    {
      "partId": 2,
      "title": "PHẦN 2: TRẮC NGHIỆM ĐÚNG SAI (3 câu)",
      "instruction": "Trong mỗi ý a), b), c), d) ở mỗi câu, chọn đúng hoặc sai.",
      "questions": [
        {
          "id": "6_1",
          "number": 1,
          "type": "tf",
          "level": "VD",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "",
          "hint": "",
          "content": "Cho biểu thức $A = 2x(x^2 - y) - 2x^3 + 3xy$.",
          "prompt": "Cho biểu thức $A = 2x(x^2 - y) - 2x^3 + 3xy$.",
          "items": [
            {
              "key": "a",
              "label": "a",
              "text": "Biểu thức $A$ sau khi rút gọn là một đa thức bậc 2.",
              "correctAnswer": "Đ",
              "explanation": "Ta có $A = 2x^3 - 2xy - 2x^3 + 3xy = xy$, có bậc là $1 + 1 = 2$."
            },
            {
              "key": "b",
              "label": "b",
              "text": "Hệ số của hạng tử chứa $xy$ trong đa thức $A$ thu gọn là $1$.",
              "correctAnswer": "Đ",
              "explanation": "$A = 1xy$, hệ số bằng $1$."
            },
            {
              "key": "c",
              "label": "c",
              "text": "Giá trị của $A$ tại $x = 2, y = -1$ là $-2$.",
              "correctAnswer": "Đ",
              "explanation": "Thay $x = 2, y = -1 \\Rightarrow A = 2 \\cdot (-1) = -2$."
            },
            {
              "key": "d",
              "label": "d",
              "text": "Biểu thức $A$ luôn nhận giá trị dương với mọi $x, y > 0$.",
              "correctAnswer": "Đ",
              "explanation": "Khi $x > 0$ và $y > 0$ thì tích $xy > 0$, do đó $A > 0$."
            }
          ],
          "xp": 35
        },
        {
          "id": "6_2",
          "number": 2,
          "type": "tf",
          "level": "VD",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "",
          "hint": "",
          "content": "Xét các đa thức $M = 3x^2 - 2xy + y^2$ và $N = x^2 + 2xy - y^2$.",
          "prompt": "Xét các đa thức $M = 3x^2 - 2xy + y^2$ và $N = x^2 + 2xy - y^2$.",
          "items": [
            {
              "key": "a",
              "label": "a",
              "text": "Đa thức tổng $M + N = 4x^2$.",
              "correctAnswer": "Đ",
              "explanation": "$M + N = (3x^2 + x^2) + (-2xy + 2xy) + (y^2 - y^2) = 4x^2$."
            },
            {
              "key": "b",
              "label": "b",
              "text": "Đa thức hiệu $M - N = 2x^2 - 4xy + 2y^2$.",
              "correctAnswer": "Đ",
              "explanation": "$M - N = (3x^2 - x^2) + (-2xy - 2xy) + [y^2 - (-y^2)] = 2x^2 - 4xy + 2y^2$."
            },
            {
              "key": "c",
              "label": "c",
              "text": "Bậc của đa thức $M + N$ là $4$.",
              "correctAnswer": "S",
              "explanation": "$M + N = 4x^2$, bậc của đa thức này là $2$, không phải $4$."
            },
            {
              "key": "d",
              "label": "d",
              "text": "Tại $x = 1, y = 1$, giá trị của biểu thức $M - N$ bằng $0$.",
              "correctAnswer": "Đ",
              "explanation": "Thay $x = 1, y = 1 \\Rightarrow 2(1)^2 - 4(1)(1) + 2(1)^2 = 2 - 4 + 2 = 0$."
            }
          ],
          "xp": 35
        },
        {
          "id": "6_3",
          "number": 3,
          "type": "tf",
          "level": "VD",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "",
          "hint": "",
          "content": "Thực hiện phép nhân đa thức $P = (x - y)(x^2 + xy + y^2)$.",
          "prompt": "Thực hiện phép nhân đa thức $P = (x - y)(x^2 + xy + y^2)$.",
          "items": [
            {
              "key": "a",
              "label": "a",
              "text": "Trong đa thức tích $P$ (sau thu gọn) có chứa hạng tử $x^2y$.",
              "correctAnswer": "S",
              "explanation": "Khai triển $P = x^3 + x^2y + xy^2 - x^2y - xy^2 - y^3 = x^3 - y^3$, các hạng tử chứa $x^2y$ triệt tiêu hết."
            },
            {
              "key": "b",
              "label": "b",
              "text": "Kết quả thu gọn của phép nhân là đa thức $x^3 - y^3$.",
              "correctAnswer": "Đ",
              "explanation": "Đây chính là hằng đẳng thức hiệu hai lập phương: $(x - y)(x^2 + xy + y^2) = x^3 - y^3$."
            },
            {
              "key": "c",
              "label": "c",
              "text": "Bậc của đa thức $P$ là $3$.",
              "correctAnswer": "Đ",
              "explanation": "$x^3 - y^3$ có bậc cao nhất là $3$."
            },
            {
              "key": "d",
              "label": "d",
              "text": "Đa thức $P$ có chứa biến $xy$.",
              "correctAnswer": "S",
              "explanation": "Sau khi thu gọn, $P = x^3 - y^3$ không còn chứa biến $xy$."
            }
          ],
          "xp": 35
        }
      ]
    },
    {
      "partId": 3,
      "title": "PHẦN 3: TRẮC NGHIỆM TRẢ LỜI NGẮN (2 câu)",
      "instruction": "Viết kết quả cuối cùng vào ô trống.",
      "questions": [
        {
          "id": "6_1",
          "number": 1,
          "type": "short",
          "level": "VD",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Ta có: $B = \\left(-\\frac{1}{2} \\cdot 4\\right) \\cdot (x^2 \\cdot x) \\cdot (y \\cdot y^3) = -2x^3y^4$. Vậy phần hệ số là $-2$.",
          "hint": "Nhân hệ số với hệ số: $-\\frac{1}{2} \\cdot 4 = -2$.",
          "content": "Tìm phần hệ số của đơn thức $B = \\left(-\\frac{1}{2}x^2y\\right) \\cdot (4xy^3)$ sau khi thu gọn.",
          "correctAnswers": [
            "-2"
          ],
          "correctAnswer": "-2",
          "xp": 40
        },
        {
          "id": "6_2",
          "number": 2,
          "type": "short",
          "level": "VD",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Đặt nhân tử chung: $Q = (x - 1)(x - y)$. Thay $x = 10, y = 9$ vào: $Q = (10 - 1)(10 - 9) = 9 \\cdot 1 = 9$.",
          "hint": "Nhóm nhân tử chung $(x - 1)$ trước khi thay số.",
          "content": "Tính giá trị của biểu thức $Q = x(x - 1) - y(x - 1)$ tại $x = 10, y = 9$.",
          "correctAnswers": [
            "9"
          ],
          "correctAnswer": "9",
          "xp": 40
        }
      ]
    }
  ]
},
{
  "id": 7,
  "code": "DE-K8-C1-02",
  "title": "Đề số 2: Đơn thức đồng dạng & Các phép toán đa thức",
  "subtitle": "Rút gọn biểu thức, tính giá trị và xác định bậc đa thức",
  "grade": "Toán 8",
  "gradeNum": 8,
  "book": "KNTT",
  "chapter": 1,
  "timeMinutes": 45,
  "parts": [
    {
      "partId": 1,
      "title": "PHẦN 1: TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (5 câu)",
      "instruction": "Mỗi câu hỏi chỉ chọn một phương án đúng.",
      "questions": [
        {
          "id": "7_1",
          "number": 1,
          "type": "mcq",
          "level": "NB",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Hai đơn thức đồng dạng là hai đơn thức có hệ số khác $0$ và có cùng phần biến. Đơn thức $-2x^2y$ có cùng phần biến là $x^2y$.",
          "hint": "Tìm đơn thức có đúng phần biến $x^2y$.",
          "content": "Trong các đơn thức sau, đơn thức nào đồng dạng với $5x^2y$?",
          "options": [
            {
              "key": "A",
              "text": "$5xy^2$"
            },
            {
              "key": "B",
              "text": "$-2x^2y$"
            },
            {
              "key": "C",
              "text": "$5x^2y^2$"
            },
            {
              "key": "D",
              "text": "$x^2$"
            }
          ],
          "correctAnswer": "B",
          "xp": 10
        },
        {
          "id": "7_2",
          "number": 2,
          "type": "mcq",
          "level": "NB",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Hạng tử $-2x^2y^3$ có bậc là $2 + 3 = 5$, đây là hạng tử có bậc cao nhất của đa thức $M$. Vậy bậc của $M$ là $5$.",
          "hint": "Tính tổng số mũ của các biến ở từng hạng tử: $2 + 3 = 5$.",
          "content": "Bậc của đa thức $M = x^4 - 2x^2y^3 + 3x - 5$ là:",
          "options": [
            {
              "key": "A",
              "text": "$4$"
            },
            {
              "key": "B",
              "text": "$5$"
            },
            {
              "key": "C",
              "text": "$6$"
            },
            {
              "key": "D",
              "text": "$2$"
            }
          ],
          "correctAnswer": "B",
          "xp": 10
        },
        {
          "id": "7_3",
          "number": 3,
          "type": "mcq",
          "level": "TH",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Ta có: $3x^2y \\cdot (-2xy) = [3 \\cdot (-2)] \\cdot (x^2 \\cdot x) \\cdot (y \\cdot y) = -6x^3y^2$.",
          "hint": "Nhân hệ số với hệ số, cộng các số mũ của cùng cơ số.",
          "content": "Kết quả của phép tính $3x^2y \\cdot (-2xy)$ là:",
          "options": [
            {
              "key": "A",
              "text": "$-6x^3y^2$"
            },
            {
              "key": "B",
              "text": "$6x^3y^2$"
            },
            {
              "key": "C",
              "text": "$-6x^2y^2$"
            },
            {
              "key": "D",
              "text": "$-x^3y^2$"
            }
          ],
          "correctAnswer": "A",
          "xp": 20
        },
        {
          "id": "7_4",
          "number": 4,
          "type": "mcq",
          "level": "TH",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Ta có: $(x - 1)(x + 2) - x^2 = x^2 + 2x - x - 2 - x^2 = x - 2$.",
          "hint": "Khai triển $(x - 1)(x + 2)$ rồi trừ đi $x^2$.",
          "content": "Kết quả rút gọn của biểu thức $(x - 1)(x + 2) - x^2$ là:",
          "options": [
            {
              "key": "A",
              "text": "$x - 2$"
            },
            {
              "key": "B",
              "text": "$3x - 2$"
            },
            {
              "key": "C",
              "text": "$-x - 2$"
            },
            {
              "key": "D",
              "text": "$x + 2$"
            }
          ],
          "correctAnswer": "A",
          "xp": 20
        },
        {
          "id": "7_5",
          "number": 5,
          "type": "mcq",
          "level": "TH",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Thay $x = 1, y = -2$ vào đa thức: $1 \\cdot (-2) + 2 \\cdot 1 = -2 + 2 = 0$.",
          "hint": "Thay trực tiếp $x = 1$ và $y = -2$ vào biểu thức.",
          "content": "Giá trị của đa thức $xy + 2x$ tại $x = 1, y = -2$ là:",
          "options": [
            {
              "key": "A",
              "text": "$0$"
            },
            {
              "key": "B",
              "text": "$1$"
            },
            {
              "key": "C",
              "text": "$2$"
            },
            {
              "key": "D",
              "text": "$-1$"
            }
          ],
          "correctAnswer": "A",
          "xp": 20
        }
      ]
    },
    {
      "partId": 2,
      "title": "PHẦN 2: TRẮC NGHIỆM ĐÚNG SAI (3 câu)",
      "instruction": "Trong mỗi ý a), b), c), d) ở mỗi câu, chọn đúng hoặc sai.",
      "questions": [
        {
          "id": "7_1",
          "number": 1,
          "type": "tf",
          "level": "TH",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "",
          "hint": "",
          "content": "Thực hiện phép nhân $K = (x + y)(x - y)$.",
          "prompt": "Thực hiện phép nhân $K = (x + y)(x - y)$.",
          "items": [
            {
              "key": "a",
              "label": "a",
              "text": "Đa thức kết quả sau khi thu gọn là $x^2 - y^2$.",
              "correctAnswer": "Đ",
              "explanation": "$(x + y)(x - y) = x^2 - xy + xy - y^2 = x^2 - y^2$."
            },
            {
              "key": "b",
              "label": "b",
              "text": "Đa thức kết quả có chứa hạng tử $xy$.",
              "correctAnswer": "S",
              "explanation": "Hạng tử $xy$ và $-xy$ triệt tiêu lẫn nhau nên không còn chứa $xy$."
            },
            {
              "key": "c",
              "label": "c",
              "text": "Bậc của đa thức $K$ là $2$.",
              "correctAnswer": "Đ",
              "explanation": "$x^2 - y^2$ có bậc cao nhất là $2$."
            },
            {
              "key": "d",
              "label": "d",
              "text": "Tại $x = 2, y = 2$, giá trị của đa thức $K$ bằng $0$.",
              "correctAnswer": "Đ",
              "explanation": "Tại $x = 2, y = 2 \\Rightarrow K = 2^2 - 2^2 = 0$."
            }
          ],
          "xp": 35
        },
        {
          "id": "7_2",
          "number": 2,
          "type": "tf",
          "level": "VD",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "",
          "hint": "",
          "content": "Cho hai đa thức $A = 2x^2 + 3x - 1$ và $B = 2x^2 - x + 5$.",
          "prompt": "Cho hai đa thức $A = 2x^2 + 3x - 1$ và $B = 2x^2 - x + 5$.",
          "items": [
            {
              "key": "a",
              "label": "a",
              "text": "Đa thức hiệu $A - B$ là một đa thức bậc 2.",
              "correctAnswer": "S",
              "explanation": "$A - B = (2x^2 - 2x^2) + [3x - (-x)] + (-1 - 5) = 4x - 6$, đây là đa thức bậc $1$."
            },
            {
              "key": "b",
              "label": "b",
              "text": "Hệ số của hạng tử bậc cao nhất trong đa thức $A - B$ là $4$.",
              "correctAnswer": "Đ",
              "explanation": "Hạng tử bậc cao nhất là $4x$, có hệ số bằng $4$."
            },
            {
              "key": "c",
              "label": "c",
              "text": "Đa thức $A - B$ có hạng tử tự do là $-6$.",
              "correctAnswer": "Đ",
              "explanation": "Hạng tử không chứa biến là $-6$."
            },
            {
              "key": "d",
              "label": "d",
              "text": "Tại $x = 1$, giá trị của biểu thức $A - B$ bằng $-2$.",
              "correctAnswer": "Đ",
              "explanation": "Thay $x = 1 \\Rightarrow 4(1) - 6 = -2$."
            }
          ],
          "xp": 35
        },
        {
          "id": "7_3",
          "number": 3,
          "type": "tf",
          "level": "TH",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "",
          "hint": "",
          "content": "Cho đơn thức $M = 3x^2y \\cdot (-2xy^2)$.",
          "prompt": "Cho đơn thức $M = 3x^2y \\cdot (-2xy^2)$.",
          "items": [
            {
              "key": "a",
              "label": "a",
              "text": "Dạng thu gọn của $M$ là $-6x^3y^3$.",
              "correctAnswer": "Đ",
              "explanation": "$3 \\cdot (-2) = -6$, $x^2 \\cdot x = x^3$, $y \\cdot y^2 = y^3 \\Rightarrow -6x^3y^3$."
            },
            {
              "key": "b",
              "label": "b",
              "text": "Bậc của đơn thức $M$ là $5$.",
              "correctAnswer": "S",
              "explanation": "Bậc là $3 + 3 = 6$, không phải $5$."
            },
            {
              "key": "c",
              "label": "c",
              "text": "Phần hệ số của đơn thức $M$ là $-6$.",
              "correctAnswer": "Đ",
              "explanation": "Hệ số chính xác là $-6$."
            },
            {
              "key": "d",
              "label": "d",
              "text": "Giá trị của $M$ luôn âm với mọi $x > 0, y > 0$.",
              "correctAnswer": "Đ",
              "explanation": "Do $x > 0, y > 0 \\Rightarrow x^3y^3 > 0$, nhân với $-6$ sẽ luôn nhận giá trị âm."
            }
          ],
          "xp": 35
        }
      ]
    },
    {
      "partId": 3,
      "title": "PHẦN 3: TRẮC NGHIỆM TRẢ LỜI NGẮN (2 câu)",
      "instruction": "Viết kết quả cuối cùng vào ô trống.",
      "questions": [
        {
          "id": "7_1",
          "number": 1,
          "type": "short",
          "level": "VD",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Thu gọn: $P = (5x^4 - 5x^4) - 2x^3y + 20xy^3 + y^2 = -2x^3y + 20xy^3 + y^2$. Các hạng tử $-2x^3y$ và $20xy^3$ đều có bậc $3 + 1 = 1 + 3 = 4$. Vậy bậc của đa thức là $4$.",
          "hint": "Thu gọn hạng tử đồng dạng $5x^4 - 5x^4 = 0$ trước khi xác định bậc.",
          "content": "Tìm bậc của đa thức thu gọn $P = 5x^4 - 2x^3y + 20xy^3 - 5x^4 + y^2$.",
          "correctAnswers": [
            "4"
          ],
          "correctAnswer": "4",
          "xp": 40
        },
        {
          "id": "7_2",
          "number": 2,
          "type": "short",
          "level": "VD",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Áp dụng hằng đẳng thức tổng hai lập phương: $H = x^3 + 1$. Thay $x = 2$ vào: $H = 2^3 + 1 = 8 + 1 = 9$.",
          "hint": "Nhận biết hằng đẳng thức $(a + b)(a^2 - ab + b^2) = a^3 + b^3$.",
          "content": "Tính giá trị của biểu thức $H = (x + 1)(x^2 - x + 1)$ tại $x = 2$.",
          "correctAnswers": [
            "9"
          ],
          "correctAnswer": "9",
          "xp": 40
        }
      ]
    }
  ]
},
{
  "id": 8,
  "code": "DE-K8-C1-03",
  "title": "Đề số 3: Thu gọn đa thức & Nhân đa thức",
  "subtitle": "Rèn luyện kĩ năng nhân đơn thức với đa thức, đa thức với đa thức",
  "grade": "Toán 8",
  "gradeNum": 8,
  "book": "KNTT",
  "chapter": 1,
  "timeMinutes": 45,
  "parts": [
    {
      "partId": 1,
      "title": "PHẦN 1: TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (5 câu)",
      "instruction": "Mỗi câu hỏi chỉ chọn một phương án đúng.",
      "questions": [
        {
          "id": "8_1",
          "number": 1,
          "type": "mcq",
          "level": "NB",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Biểu thức $\\frac{1}{x} + y$ có chứa biến $x$ ở dưới mẫu thức nên không phải là đa thức.",
          "hint": "Đa thức không được chứa biến ở mẫu số của phân thức.",
          "content": "Biểu thức nào sau đây KHÔNG phải là đa thức?",
          "options": [
            {
              "key": "A",
              "text": "$x^2 - 3x$"
            },
            {
              "key": "B",
              "text": "$\\frac{1}{x} + y$"
            },
            {
              "key": "C",
              "text": "$\\frac{x + y}{2}$"
            },
            {
              "key": "D",
              "text": "$5$"
            }
          ],
          "correctAnswer": "B",
          "xp": 10
        },
        {
          "id": "8_2",
          "number": 2,
          "type": "mcq",
          "level": "NB",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "$(x^2 + 2y) + (x^2 - 2y) = (x^2 + x^2) + (2y - 2y) = 2x^2$.",
          "hint": "Cộng các hạng tử đồng dạng: $2y + (-2y) = 0$.",
          "content": "Tổng của hai đa thức $x^2 + 2y$ và $x^2 - 2y$ là:",
          "options": [
            {
              "key": "A",
              "text": "$2x^2 + 4y$"
            },
            {
              "key": "B",
              "text": "$2x^2$"
            },
            {
              "key": "C",
              "text": "$4y$"
            },
            {
              "key": "D",
              "text": "$0$"
            }
          ],
          "correctAnswer": "B",
          "xp": 10
        },
        {
          "id": "8_3",
          "number": 3,
          "type": "mcq",
          "level": "TH",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Ta có: $\\left(-\\frac{1}{2}x^2y\\right)^2 = \\left(-\\frac{1}{2}\\right)^2 \\cdot (x^2)^2 \\cdot y^2 = \\frac{1}{4}x^4y^2$. Hệ số là $\\frac{1}{4}$.",
          "hint": "Bình phương một số âm là một số dương: $(-\\frac{1}{2})^2 = \\frac{1}{4}$.",
          "content": "Hệ số của đơn thức $\\left(-\\frac{1}{2}x^2y\\right)^2$ sau khi thu gọn là:",
          "options": [
            {
              "key": "A",
              "text": "$-\\frac{1}{2}$"
            },
            {
              "key": "B",
              "text": "$\\frac{1}{4}$"
            },
            {
              "key": "C",
              "text": "$-\\frac{1}{4}$"
            },
            {
              "key": "D",
              "text": "$1$"
            }
          ],
          "correctAnswer": "B",
          "xp": 20
        },
        {
          "id": "8_4",
          "number": 4,
          "type": "mcq",
          "level": "TH",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "$(x - y)(x - y) = (x - y)^2 = x^2 - 2xy + y^2$.",
          "hint": "Đây là hằng đẳng thức bình phương của một hiệu: $(a - b)^2 = a^2 - 2ab + b^2$.",
          "content": "Phép nhân hai đa thức $(x - y)(x - y)$ có kết quả thu gọn là:",
          "options": [
            {
              "key": "A",
              "text": "$x^2 - y^2$"
            },
            {
              "key": "B",
              "text": "$x^2 - 2xy + y^2$"
            },
            {
              "key": "C",
              "text": "$x^2 + 2xy + y^2$"
            },
            {
              "key": "D",
              "text": "$x^2 + y^2$"
            }
          ],
          "correctAnswer": "B",
          "xp": 20
        },
        {
          "id": "8_5",
          "number": 5,
          "type": "mcq",
          "level": "TH",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Nhóm các đơn thức đồng dạng: $(5 + 2 - 7)x^3y - 4xy^2 = 0x^3y - 4xy^2 = -4xy^2$.",
          "hint": "Tính hệ số của $x^3y$: $5 + 2 - 7 = 0$.",
          "content": "Đa thức $P = 5x^3y - 4xy^2 + 2x^3y - 7x^3y$ sau khi thu gọn là:",
          "options": [
            {
              "key": "A",
              "text": "$-4xy^2$"
            },
            {
              "key": "B",
              "text": "$14x^3y - 4xy^2$"
            },
            {
              "key": "C",
              "text": "$4xy^2$"
            },
            {
              "key": "D",
              "text": "$0$"
            }
          ],
          "correctAnswer": "A",
          "xp": 20
        }
      ]
    },
    {
      "partId": 2,
      "title": "PHẦN 2: TRẮC NGHIỆM ĐÚNG SAI (3 câu)",
      "instruction": "Trong mỗi ý a), b), c), d) ở mỗi câu, chọn đúng hoặc sai.",
      "questions": [
        {
          "id": "8_1",
          "number": 1,
          "type": "tf",
          "level": "VD",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "",
          "hint": "",
          "content": "Cho biểu thức $P = x^2(x - y) + y(x^2 - y)$.",
          "prompt": "Cho biểu thức $P = x^2(x - y) + y(x^2 - y)$.",
          "items": [
            {
              "key": "a",
              "label": "a",
              "text": "Đa thức $P$ sau khi thu gọn có $3$ hạng tử.",
              "correctAnswer": "S",
              "explanation": "Khai triển: $P = x^3 - x^2y + x^2y - y^2 = x^3 - y^2$, chỉ có $2$ hạng tử."
            },
            {
              "key": "b",
              "label": "b",
              "text": "Bậc của đa thức $P$ thu gọn là $3$.",
              "correctAnswer": "Đ",
              "explanation": "Hạng tử $x^3$ có bậc là $3$, cao nhất."
            },
            {
              "key": "c",
              "label": "c",
              "text": "Hệ số của phần biến $y^2$ trong $P$ là $-1$.",
              "correctAnswer": "Đ",
              "explanation": "Hạng tử là $-y^2 = (-1)y^2$ nên hệ số bằng $-1$."
            },
            {
              "key": "d",
              "label": "d",
              "text": "Tại $x = 1, y = -1$, giá trị của biểu thức $P$ bằng $0$.",
              "correctAnswer": "Đ",
              "explanation": "Thay $x = 1, y = -1 \\Rightarrow P = 1^3 - (-1)^2 = 1 - 1 = 0$."
            }
          ],
          "xp": 35
        },
        {
          "id": "8_2",
          "number": 2,
          "type": "tf",
          "level": "TH",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "",
          "hint": "",
          "content": "Xét đơn thức $A = \\left(-\\frac{1}{3}x^2y^3\\right) \\cdot (-6x^3y)$.",
          "prompt": "Xét đơn thức $A = \\left(-\\frac{1}{3}x^2y^3\\right) \\cdot (-6x^3y)$.",
          "items": [
            {
              "key": "a",
              "label": "a",
              "text": "Hệ số của đơn thức $A$ sau thu gọn là $2$.",
              "correctAnswer": "Đ",
              "explanation": "Hệ số: $(-\\frac{1}{3}) \\cdot (-6) = 2$."
            },
            {
              "key": "b",
              "label": "b",
              "text": "Bậc của đơn thức $A$ là $9$.",
              "correctAnswer": "Đ",
              "explanation": "$A = 2x^5y^4$, bậc là $5 + 4 = 9$."
            },
            {
              "key": "c",
              "label": "c",
              "text": "Phần biến của đơn thức $A$ là $x^5y^4$.",
              "correctAnswer": "Đ",
              "explanation": "$x^2 \\cdot x^3 = x^5$, $y^3 \\cdot y = y^4 \\Rightarrow x^5y^4$."
            },
            {
              "key": "d",
              "label": "d",
              "text": "Mọi đơn thức đồng dạng với $A$ đều có phần biến là $x^6y^3$.",
              "correctAnswer": "S",
              "explanation": "Đơn thức đồng dạng với $A$ phải có cùng phần biến là $x^5y^4$."
            }
          ],
          "xp": 35
        },
        {
          "id": "8_3",
          "number": 3,
          "type": "tf",
          "level": "VD",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "",
          "hint": "",
          "content": "Cho biểu thức $Q = (2x - 1)(3x + 2)$.",
          "prompt": "Cho biểu thức $Q = (2x - 1)(3x + 2)$.",
          "items": [
            {
              "key": "a",
              "label": "a",
              "text": "Hệ số của hạng tử chứa $x^2$ trong đa thức kết quả là $6$.",
              "correctAnswer": "Đ",
              "explanation": "$2x \\cdot 3x = 6x^2$."
            },
            {
              "key": "b",
              "label": "b",
              "text": "Hệ số của hạng tử chứa $x$ trong đa thức kết quả là $-1$.",
              "correctAnswer": "S",
              "explanation": "Khai triển: $4x - 3x = 1x$, hệ số của $x$ là $1$, không phải $-1$."
            },
            {
              "key": "c",
              "label": "c",
              "text": "Hạng tử tự do của đa thức kết quả là $-2$.",
              "correctAnswer": "Đ",
              "explanation": "$(-1) \\cdot 2 = -2$."
            },
            {
              "key": "d",
              "label": "d",
              "text": "Tổng các hệ số của đa thức $Q$ (sau khi khai triển và thu gọn) là $7$.",
              "correctAnswer": "S",
              "explanation": "$Q = 6x^2 + x - 2$, tổng hệ số là $6 + 1 - 2 = 5$."
            }
          ],
          "xp": 35
        }
      ]
    },
    {
      "partId": 3,
      "title": "PHẦN 3: TRẮC NGHIỆM TRẢ LỜI NGẮN (2 câu)",
      "instruction": "Viết kết quả cuối cùng vào ô trống.",
      "questions": [
        {
          "id": "8_1",
          "number": 1,
          "type": "short",
          "level": "VDC",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Ta có: $(x - y)(x + y)(x^2 + y^2) = (x^2 - y^2)(x^2 + y^2) = x^4 - y^4$. Đa thức kết quả không có hạng tử chứa $x^2y^2$, nên hệ số của nó bằng $0$.",
          "hint": "Áp dụng liên tiếp hai lần hằng đẳng thức hiệu hai bình phương.",
          "content": "Tìm hệ số của phần biến $x^2y^2$ trong đa thức kết quả của phép nhân $(x - y)(x + y)(x^2 + y^2)$.",
          "correctAnswers": [
            "0"
          ],
          "correctAnswer": "0",
          "xp": 40
        },
        {
          "id": "8_2",
          "number": 2,
          "type": "short",
          "level": "VD",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Khai triển: $K = (x^2 - 4) - (x^2 - 9) = x^2 - 4 - x^2 + 9 = 5$. Kết quả không phụ thuộc vào $x$, nên tại $x = 2026$ giá trị vẫn bằng $5$.",
          "hint": "Rút gọn biểu thức trước, nhận xét xem kết quả có phụ thuộc vào biến $x$ không.",
          "content": "Tính giá trị biểu thức $K = (x - 2)(x + 2) - (x - 3)(x + 3)$ tại $x = 2026$.",
          "correctAnswers": [
            "5"
          ],
          "correctAnswer": "5",
          "xp": 40
        }
      ]
    }
  ]
},
{
  "id": 9,
  "code": "DE-K8-C1-04",
  "title": "Đề số 4: Phép trừ đa thức & Giá trị biểu thức",
  "subtitle": "Rèn luyện quy tắc đổi dấu khi bỏ ngoặc và tính giá trị biểu thức đa thức",
  "grade": "Toán 8",
  "gradeNum": 8,
  "book": "KNTT",
  "chapter": 1,
  "timeMinutes": 45,
  "parts": [
    {
      "partId": 1,
      "title": "PHẦN 1: TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (5 câu)",
      "instruction": "Mỗi câu hỏi chỉ chọn một phương án đúng.",
      "questions": [
        {
          "id": "9_1",
          "number": 1,
          "type": "mcq",
          "level": "NB",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Đơn thức $A$ có phần hệ số là $3$ và phần biến là $x^2y^3z$.",
          "hint": "Phần biến gồm tất cả các chữ cái cùng số mũ của chúng.",
          "content": "Đơn thức $A = 3x^2y^3z$. Phần biến của đơn thức này là:",
          "options": [
            {
              "key": "A",
              "text": "$3$"
            },
            {
              "key": "B",
              "text": "$x^2y^3z$"
            },
            {
              "key": "C",
              "text": "$x^2y^3$"
            },
            {
              "key": "D",
              "text": "$z$"
            }
          ],
          "correctAnswer": "B",
          "xp": 10
        },
        {
          "id": "9_2",
          "number": 2,
          "type": "mcq",
          "level": "TH",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Bỏ dấu ngoặc có dấu '-' đằng trước: $2x^2 - xy - x^2 + 2xy = (2x^2 - x^2) + (-xy + 2xy) = x^2 + xy$.",
          "hint": "Chú ý đổi dấu: $-(-2xy) = +2xy$.",
          "content": "Kết quả của phép trừ đa thức $(2x^2 - xy) - (x^2 - 2xy)$ là:",
          "options": [
            {
              "key": "A",
              "text": "$x^2 - 3xy$"
            },
            {
              "key": "B",
              "text": "$x^2 + xy$"
            },
            {
              "key": "C",
              "text": "$3x^2 + xy$"
            },
            {
              "key": "D",
              "text": "$x^2 - xy$"
            }
          ],
          "correctAnswer": "B",
          "xp": 20
        },
        {
          "id": "9_3",
          "number": 3,
          "type": "mcq",
          "level": "TH",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Nhân $x^2$ với từng hạng tử: $x^2 \\cdot 2x - x^2 \\cdot 3y = 2x^3 - 3x^2y$.",
          "hint": "Lấy $x^2$ nhân với $2x$ và $x^2$ nhân với $-3y$.",
          "content": "Kết quả của phép nhân đơn thức với đa thức $x^2(2x - 3y)$ là:",
          "options": [
            {
              "key": "A",
              "text": "$2x^3 - 3x^2y$"
            },
            {
              "key": "B",
              "text": "$2x^3 - 3xy$"
            },
            {
              "key": "C",
              "text": "$2x^2 - 3x^2y$"
            },
            {
              "key": "D",
              "text": "$2x^3 + 3x^2y$"
            }
          ],
          "correctAnswer": "A",
          "xp": 20
        },
        {
          "id": "9_4",
          "number": 4,
          "type": "mcq",
          "level": "NB",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Theo quy ước trong SGK Toán 8, số $0$ được gọi là đa thức không và không có bậc.",
          "hint": "Số $0$ là một trường hợp đặc biệt không được gán bậc.",
          "content": "Bậc của đa thức không (số $0$) là:",
          "options": [
            {
              "key": "A",
              "text": "$0$"
            },
            {
              "key": "B",
              "text": "$1$"
            },
            {
              "key": "C",
              "text": "Không có bậc"
            },
            {
              "key": "D",
              "text": "Bậc tuỳ ý"
            }
          ],
          "correctAnswer": "C",
          "xp": 10
        },
        {
          "id": "9_5",
          "number": 5,
          "type": "mcq",
          "level": "TH",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Cách 1: Thay trực tiếp $x = 2 \\Rightarrow 2^2 - 4(2) + 4 = 4 - 8 + 4 = 0$. Cách 2: $(x - 2)^2 = (2 - 2)^2 = 0$.",
          "hint": "Nhận dạng hằng đẳng thức $(x - 2)^2$.",
          "content": "Giá trị của biểu thức $x^2 - 4x + 4$ tại $x = 2$ là:",
          "options": [
            {
              "key": "A",
              "text": "$2$"
            },
            {
              "key": "B",
              "text": "$4$"
            },
            {
              "key": "C",
              "text": "$0$"
            },
            {
              "key": "D",
              "text": "$8$"
            }
          ],
          "correctAnswer": "C",
          "xp": 20
        }
      ]
    },
    {
      "partId": 2,
      "title": "PHẦN 2: TRẮC NGHIỆM ĐÚNG SAI (3 câu)",
      "instruction": "Trong mỗi ý a), b), c), d) ở mỗi câu, chọn đúng hoặc sai.",
      "questions": [
        {
          "id": "9_1",
          "number": 1,
          "type": "tf",
          "level": "VD",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "",
          "hint": "",
          "content": "Rút gọn biểu thức $E = (x + y)(x + y) - 2xy$.",
          "prompt": "Rút gọn biểu thức $E = (x + y)(x + y) - 2xy$.",
          "items": [
            {
              "key": "a",
              "label": "a",
              "text": "Đa thức $E$ sau khi thu gọn là $x^2 + y^2$.",
              "correctAnswer": "Đ",
              "explanation": "$E = (x + y)^2 - 2xy = x^2 + 2xy + y^2 - 2xy = x^2 + y^2$."
            },
            {
              "key": "b",
              "label": "b",
              "text": "Đa thức $E$ có bậc là $4$.",
              "correctAnswer": "S",
              "explanation": "$x^2 + y^2$ có bậc cao nhất là $2$, không phải $4$."
            },
            {
              "key": "c",
              "label": "c",
              "text": "Đa thức $E$ luôn nhận giá trị không âm với mọi $x, y$.",
              "correctAnswer": "Đ",
              "explanation": "Vì $x^2 \\ge 0$ và $y^2 \\ge 0$ với mọi $x, y$ nên $x^2 + y^2 \\ge 0$."
            },
            {
              "key": "d",
              "label": "d",
              "text": "Tại $x = 3, y = -4$, giá trị của $E$ là $25$.",
              "correctAnswer": "Đ",
              "explanation": "Thay số: $3^2 + (-4)^2 = 9 + 16 = 25$."
            }
          ],
          "xp": 35
        },
        {
          "id": "9_2",
          "number": 2,
          "type": "tf",
          "level": "TH",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "",
          "hint": "",
          "content": "Cho hai đa thức $A = 5x^2y - 4xy^2$ và $B = -5x^2y + 4xy^2$.",
          "prompt": "Cho hai đa thức $A = 5x^2y - 4xy^2$ và $B = -5x^2y + 4xy^2$.",
          "items": [
            {
              "key": "a",
              "label": "a",
              "text": "Hai đa thức $A$ và $B$ là hai đa thức đối nhau.",
              "correctAnswer": "Đ",
              "explanation": "$B = -(5x^2y - 4xy^2) = -A$, vậy $A$ và $B$ là hai đa thức đối nhau."
            },
            {
              "key": "b",
              "label": "b",
              "text": "Đa thức tổng $A + B = 0$.",
              "correctAnswer": "Đ",
              "explanation": "Tổng của hai đa thức đối nhau luôn bằng $0$."
            },
            {
              "key": "c",
              "label": "c",
              "text": "Đa thức hiệu $A - B = 0$.",
              "correctAnswer": "S",
              "explanation": "$A - B = A - (-A) = 2A = 10x^2y - 8xy^2 \\ne 0$."
            },
            {
              "key": "d",
              "label": "d",
              "text": "Bậc của đa thức hiệu $A - B$ là $3$.",
              "correctAnswer": "Đ",
              "explanation": "$10x^2y - 8xy^2$ có các hạng tử bậc $2 + 1 = 1 + 2 = 3$."
            }
          ],
          "xp": 35
        },
        {
          "id": "9_3",
          "number": 3,
          "type": "tf",
          "level": "TH",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "",
          "hint": "",
          "content": "Xét đơn thức $F = -5x^3y^2z$.",
          "prompt": "Xét đơn thức $F = -5x^3y^2z$.",
          "items": [
            {
              "key": "a",
              "label": "a",
              "text": "Đơn thức $F$ có $3$ biến.",
              "correctAnswer": "Đ",
              "explanation": "Có 3 biến là $x, y, z$."
            },
            {
              "key": "b",
              "label": "b",
              "text": "Bậc của đơn thức $F$ là $6$.",
              "correctAnswer": "Đ",
              "explanation": "Bậc là tổng các số mũ: $3 + 2 + 1 = 6$."
            },
            {
              "key": "c",
              "label": "c",
              "text": "Giá trị của $F$ tại $x = 1, y = 1, z = -1$ là $5$.",
              "correctAnswer": "Đ",
              "explanation": "$-5 \\cdot 1^3 \\cdot 1^2 \\cdot (-1) = 5$."
            },
            {
              "key": "d",
              "label": "d",
              "text": "Bình phương của đơn thức $F$ có phần hệ số là $-25$.",
              "correctAnswer": "S",
              "explanation": "$F^2 = [(-5)x^3y^2z]^2 = 25x^6y^4z^2$, hệ số là $25$, không phải $-25$."
            }
          ],
          "xp": 35
        }
      ]
    },
    {
      "partId": 3,
      "title": "PHẦN 3: TRẮC NGHIỆM TRẢ LỜI NGẮN (2 câu)",
      "instruction": "Viết kết quả cuối cùng vào ô trống.",
      "questions": [
        {
          "id": "9_1",
          "number": 1,
          "type": "short",
          "level": "VD",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Các hạng tử $x^3y^2$ có bậc $3+2=5$; $xy^4$ có bậc $1+4=5$; $-x^5$ có bậc $5$; số $5$ có bậc $0$. Bậc cao nhất là $5$.",
          "hint": "Xem bậc lớn nhất của các hạng tử trong đa thức.",
          "content": "Tìm bậc của đa thức $M = x^3y^2 + xy^4 - x^5 + 5$.",
          "correctAnswers": [
            "5"
          ],
          "correctAnswer": "5",
          "xp": 40
        },
        {
          "id": "9_2",
          "number": 2,
          "type": "short",
          "level": "VD",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Thu gọn: $N = [\\frac{1}{2} \\cdot (-4)] \\cdot (x \\cdot x^2) \\cdot (y \\cdot y) = -2x^3y^2$. Thay $x = -1, y = 2 \\Rightarrow N = -2(-1)^3(2)^2 = -2(-1)(4) = 8$.",
          "hint": "Thu gọn đơn thức về dạng $-2x^3y^2$ trước khi thay số.",
          "content": "Tính giá trị của biểu thức $N = \\frac{1}{2}xy \\cdot (-4x^2y)$ tại $x = -1, y = 2$.",
          "correctAnswers": [
            "8"
          ],
          "correctAnswer": "8",
          "xp": 40
        }
      ]
    }
  ]
},
{
  "id": 10,
  "code": "DE-K8-C1-05",
  "title": "Đề số 5: Tổng ôn tập toàn diện Chương I (Đa thức)",
  "subtitle": "Đánh giá chuẩn năng lực Toán 8 KNTT theo ma trận GDPT 2018",
  "grade": "Toán 8",
  "gradeNum": 8,
  "book": "KNTT",
  "chapter": 1,
  "timeMinutes": 45,
  "parts": [
    {
      "partId": 1,
      "title": "PHẦN 1: TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (5 câu)",
      "instruction": "Mỗi câu hỏi chỉ chọn một phương án đúng.",
      "questions": [
        {
          "id": "10_1",
          "number": 1,
          "type": "mcq",
          "level": "NB",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Ta có thể viết $\\frac{2x^2y}{3} = \\frac{2}{3}x^2y$, đây là tích của số $\\frac{2}{3}$ với các biến $x, y$, do đó nó là một đơn thức.",
          "hint": "Hệ số có thể là một phân số.",
          "content": "Biểu thức $\\frac{2x^2y}{3}$ có phải là đơn thức không?",
          "options": [
            {
              "key": "A",
              "text": "Có"
            },
            {
              "key": "B",
              "text": "Không"
            },
            {
              "key": "C",
              "text": "Chỉ khi $x = 0$"
            },
            {
              "key": "D",
              "text": "Chỉ khi $y = 0$"
            }
          ],
          "correctAnswer": "A",
          "xp": 10
        },
        {
          "id": "10_2",
          "number": 2,
          "type": "mcq",
          "level": "TH",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Khai triển: $2x \\cdot x + 2x \\cdot 1 - 2x^2 = 2x^2 + 2x - 2x^2 = 2x$.",
          "hint": "Thực hiện phép nhân $2x(x + 1) = 2x^2 + 2x$ rồi trừ đi $2x^2$.",
          "content": "Rút gọn biểu thức $2x(x + 1) - 2x^2$ ta được đa thức:",
          "options": [
            {
              "key": "A",
              "text": "$2x$"
            },
            {
              "key": "B",
              "text": "$4x^2 + 2x$"
            },
            {
              "key": "C",
              "text": "$-2x$"
            },
            {
              "key": "D",
              "text": "$2$"
            }
          ],
          "correctAnswer": "A",
          "xp": 20
        },
        {
          "id": "10_3",
          "number": 3,
          "type": "mcq",
          "level": "NB",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Hạng tử $x^4$ có bậc $4$; hạng tử $3x^2y^2$ có bậc $2 + 2 = 4$; hạng tử $-y^4$ có bậc $4$. Bậc của đa thức là $4$.",
          "hint": "Tính bậc của từng hạng tử: $2 + 2 = 4$.",
          "content": "Đa thức $Q = x^4 + 3x^2y^2 - y^4$ có bậc là:",
          "options": [
            {
              "key": "A",
              "text": "$4$"
            },
            {
              "key": "B",
              "text": "$2$"
            },
            {
              "key": "C",
              "text": "$6$"
            },
            {
              "key": "D",
              "text": "$8$"
            }
          ],
          "correctAnswer": "A",
          "xp": 10
        },
        {
          "id": "10_4",
          "number": 4,
          "type": "mcq",
          "level": "TH",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Nhân $x$ với từng hạng tử: $x(x^2 - xy + y^2) = x \\cdot x^2 - x \\cdot xy + x \\cdot y^2 = x^3 - x^2y + xy^2$.",
          "hint": "Nhân $x$ vào từng số hạng của đa thức.",
          "content": "Tích của đa thức $x^2 - xy + y^2$ và đơn thức $x$ là:",
          "options": [
            {
              "key": "A",
              "text": "$x^3 - x^2y + y^2$"
            },
            {
              "key": "B",
              "text": "$x^3 - x^2y + xy^2$"
            },
            {
              "key": "C",
              "text": "$x^3 - xy + xy^2$"
            },
            {
              "key": "D",
              "text": "$x^2 - x^2y + xy^2$"
            }
          ],
          "correctAnswer": "B",
          "xp": 20
        },
        {
          "id": "10_5",
          "number": 5,
          "type": "mcq",
          "level": "NB",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Cặp đơn thức $-2x^2y$ và $5x^2y$ có hệ số khác $0$ và có cùng phần biến là $x^2y$ nên đồng dạng với nhau.",
          "hint": "Tìm cặp đơn thức có đúng phần biến $x^2y$.",
          "content": "Cặp đơn thức nào sau đây đồng dạng với nhau?",
          "options": [
            {
              "key": "A",
              "text": "$3xy$ và $3x^2y$"
            },
            {
              "key": "B",
              "text": "$-2x^2y$ và $5x^2y$"
            },
            {
              "key": "C",
              "text": "$xy^2$ và $x^2y$"
            },
            {
              "key": "D",
              "text": "$x^2$ và $y^2$"
            }
          ],
          "correctAnswer": "B",
          "xp": 10
        }
      ]
    },
    {
      "partId": 2,
      "title": "PHẦN 2: TRẮC NGHIỆM ĐÚNG SAI (3 câu)",
      "instruction": "Trong mỗi ý a), b), c), d) ở mỗi câu, chọn đúng hoặc sai.",
      "questions": [
        {
          "id": "10_1",
          "number": 1,
          "type": "tf",
          "level": "VD",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "",
          "hint": "",
          "content": "Cho biểu thức $M = (2x^2y - 3xy^2) - (x^2y - 4xy^2)$.",
          "prompt": "Cho biểu thức $M = (2x^2y - 3xy^2) - (x^2y - 4xy^2)$.",
          "items": [
            {
              "key": "a",
              "label": "a",
              "text": "Hệ số của hạng tử $x^2y$ trong đa thức thu gọn là $1$.",
              "correctAnswer": "Đ",
              "explanation": "$2x^2y - x^2y = 1x^2y$, hệ số là $1$."
            },
            {
              "key": "b",
              "label": "b",
              "text": "Hệ số của hạng tử $xy^2$ trong đa thức thu gọn là $-1$.",
              "correctAnswer": "S",
              "explanation": "$-3xy^2 - (-4xy^2) = -3xy^2 + 4xy^2 = 1xy^2$, hệ số là $1$, không phải $-1$."
            },
            {
              "key": "c",
              "label": "c",
              "text": "Bậc của đa thức $M$ là $3$.",
              "correctAnswer": "Đ",
              "explanation": "$x^2y + xy^2$ có bậc là $3$."
            },
            {
              "key": "d",
              "label": "d",
              "text": "Giá trị của $M$ luôn bằng $0$ khi $x = -y$.",
              "correctAnswer": "Đ",
              "explanation": "Thay $x = -y \\Rightarrow (-y)^2y + (-y)y^2 = y^3 - y^3 = 0$."
            }
          ],
          "xp": 35
        },
        {
          "id": "10_2",
          "number": 2,
          "type": "tf",
          "level": "TH",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "",
          "hint": "",
          "content": "Thực hiện phép nhân đa thức $K = 2x(x^2 - xy + 1)$.",
          "prompt": "Thực hiện phép nhân đa thức $K = 2x(x^2 - xy + 1)$.",
          "items": [
            {
              "key": "a",
              "label": "a",
              "text": "Đa thức tích $K$ có $3$ hạng tử.",
              "correctAnswer": "Đ",
              "explanation": "$K = 2x^3 - 2x^2y + 2x$, gồm đúng $3$ hạng tử."
            },
            {
              "key": "b",
              "label": "b",
              "text": "Bậc của đa thức $K$ là $3$.",
              "correctAnswer": "Đ",
              "explanation": "Hạng tử $2x^3$ có bậc là $3$, cao nhất."
            },
            {
              "key": "c",
              "label": "c",
              "text": "Trong đa thức $K$ có chứa hạng tử $-2x^2y$.",
              "correctAnswer": "Đ",
              "explanation": "$2x \\cdot (-xy) = -2x^2y$."
            },
            {
              "key": "d",
              "label": "d",
              "text": "Giá trị của đa thức $K$ tại $x = 1, y = 1$ là $2$.",
              "correctAnswer": "Đ",
              "explanation": "Thay $x = 1, y = 1 \\Rightarrow 2(1)^3 - 2(1)^2(1) + 2(1) = 2 - 2 + 2 = 2$."
            }
          ],
          "xp": 35
        },
        {
          "id": "10_3",
          "number": 3,
          "type": "tf",
          "level": "TH",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "",
          "hint": "",
          "content": "Cho hai biểu thức $P = x^2 - y^2$ và $Q = x^2 + y^2$.",
          "prompt": "Cho hai biểu thức $P = x^2 - y^2$ và $Q = x^2 + y^2$.",
          "items": [
            {
              "key": "a",
              "label": "a",
              "text": "Đa thức tổng $P + Q = 2x^2$.",
              "correctAnswer": "Đ",
              "explanation": "$(x^2 - y^2) + (x^2 + y^2) = 2x^2$."
            },
            {
              "key": "b",
              "label": "b",
              "text": "Đa thức hiệu $P - Q = 2y^2$.",
              "correctAnswer": "S",
              "explanation": "$P - Q = x^2 - y^2 - x^2 - y^2 = -2y^2$, không phải $2y^2$."
            },
            {
              "key": "c",
              "label": "c",
              "text": "Bậc của đa thức tổng $P + Q$ luôn bằng $2$ với mọi $x \\ne 0$.",
              "correctAnswer": "Đ",
              "explanation": "$2x^2$ có bậc bằng $2$ khi $x \\ne 0$."
            },
            {
              "key": "d",
              "label": "d",
              "text": "Tích $P \\cdot Q$ bằng $x^4 - y^4$.",
              "correctAnswer": "Đ",
              "explanation": "$(x^2 - y^2)(x^2 + y^2) = (x^2)^2 - (y^2)^2 = x^4 - y^4$."
            }
          ],
          "xp": 35
        }
      ]
    },
    {
      "partId": 3,
      "title": "PHẦN 3: TRẮC NGHIỆM TRẢ LỜI NGẮN (2 câu)",
      "instruction": "Viết kết quả cuối cùng vào ô trống.",
      "questions": [
        {
          "id": "10_1",
          "number": 1,
          "type": "short",
          "level": "NB",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Hạng tử có bậc cao nhất là $2x^5$ (bậc $5$), hệ số của nó là $2$.",
          "hint": "Tìm số mũ lớn nhất của $x$ rồi đọc hệ số đi kèm.",
          "content": "Tìm hệ số của hạng tử có bậc cao nhất trong đa thức $5x^4 - 3x^3 + 2x^5 - 1$.",
          "correctAnswers": [
            "2"
          ],
          "correctAnswer": "2",
          "xp": 40
        },
        {
          "id": "10_2",
          "number": 2,
          "type": "short",
          "level": "VD",
          "grade": 8,
          "book": "KNTT",
          "chapter": 1,
          "lessonId": "K8_C1_B1_4",
          "lessonName": "Chương I: Đa thức nhiều biến (Bài 1 - Bài 4)",
          "explanation": "Thu gọn: $A = (2 - 3 + 5)x^2y = 4x^2y$. Thay $x = 2, y = -1 \\Rightarrow A = 4 \\cdot (2)^2 \\cdot (-1) = 4 \\cdot 4 \\cdot (-1) = -16$.",
          "hint": "Thu gọn các đơn thức đồng dạng trước: $2 - 3 + 5 = 4$.",
          "content": "Tính giá trị của biểu thức $A = 2x^2y - 3x^2y + 5x^2y$ tại $x = 2, y = -1$.",
          "correctAnswers": [
            "-16"
          ],
          "correctAnswer": "-16",
          "xp": 40
        }
      ]
    }
  ]
}
,
{
  "id": 11,
  "code": "DE-K8-C2-01",
  "title": "Đề số 6: Hằng đẳng thức đáng nhớ & Phân tích đa thức thành nhân tử",
  "subtitle": "7 hằng đẳng thức đáng nhớ, phân tích đa thức thành nhân tử và ứng dụng",
  "grade": "Toán 8",
  "gradeNum": 8,
  "book": "KNTT",
  "chapter": 2,
  "timeMinutes": 45,
  "topic": "7 Hằng đẳng thức & Nhân tử",
  "levelTarget": "standard",
  "parts": [
    {
      "partId": 1,
      "title": "PHẦN 1: TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (5 câu)",
      "instruction": "Chọn một phương án đúng nhất.",
      "questions": [
        {
          "id": "11_1",
          "number": 1,
          "type": "mcq",
          "level": "NB",
          "grade": 8,
          "book": "KNTT",
          "chapter": 2,
          "lessonId": "K8_C2_B6",
          "lessonName": "Bài 6: Hiệu hai bình phương. Bình phương của một tổng hay một hiệu",
          "content": "Khai triển hằng đẳng thức $(A + B)^2$ ta được kết quả là:",
          "options": [
            {
              "key": "A",
              "text": "$A^2 + B^2$"
            },
            {
              "key": "B",
              "text": "$A^2 + 2AB + B^2$"
            },
            {
              "key": "C",
              "text": "$A^2 - 2AB + B^2$"
            },
            {
              "key": "D",
              "text": "$A^2 + AB + B^2$"
            }
          ],
          "correctAnswer": "B",
          "explanation": "Theo hằng đẳng thức bình phương của một tổng: $(A + B)^2 = A^2 + 2AB + B^2$.",
          "hint": "Bình phương số thứ nhất cộng 2 lần tích cộng bình phương số thứ hai.",
          "xp": 10
        },
        {
          "id": "11_2",
          "number": 2,
          "type": "mcq",
          "level": "NB",
          "grade": 8,
          "book": "KNTT",
          "chapter": 2,
          "lessonId": "K8_C2_B6",
          "lessonName": "Bài 6: Hiệu hai bình phương. Bình phương của một tổng hay một hiệu",
          "content": "Biểu thức $x^2 - 16$ được viết dưới dạng tích là:",
          "options": [
            {
              "key": "A",
              "text": "$(x - 4)(x + 4)$"
            },
            {
              "key": "B",
              "text": "$(x - 16)(x + 16)$"
            },
            {
              "key": "C",
              "text": "$(x - 4)^2$"
            },
            {
              "key": "D",
              "text": "$(x + 4)^2$"
            }
          ],
          "correctAnswer": "A",
          "explanation": "Áp dụng hằng đẳng thức hiệu hai bình phương $A^2 - B^2 = (A - B)(A + B)$ với $16 = 4^2$.",
          "hint": "Nhận dạng $A^2 - B^2$ với $B = 4$.",
          "xp": 10
        },
        {
          "id": "11_3",
          "number": 3,
          "type": "mcq",
          "level": "TH",
          "grade": 8,
          "book": "KNTT",
          "chapter": 2,
          "lessonId": "K8_C2_B6",
          "lessonName": "Bài 6: Hiệu hai bình phương. Bình phương của một tổng hay một hiệu",
          "content": "Rút gọn biểu thức $M = (x + 3)^2 - (x - 3)^2$ ta được:",
          "options": [
            {
              "key": "A",
              "text": "$6x$"
            },
            {
              "key": "B",
              "text": "$12x$"
            },
            {
              "key": "C",
              "text": "$18$"
            },
            {
              "key": "D",
              "text": "$2x^2 + 18$"
            }
          ],
          "correctAnswer": "B",
          "explanation": "Ta có: $M = (x^2 + 6x + 9) - (x^2 - 6x + 9) = 6x - (-6x) = 12x$.",
          "hint": "Khai triển từng bình phương rồi trừ các hạng tử đồng dạng.",
          "xp": 20
        },
        {
          "id": "11_4",
          "number": 4,
          "type": "mcq",
          "level": "TH",
          "grade": 8,
          "book": "KNTT",
          "chapter": 2,
          "lessonId": "K8_C2_B9",
          "lessonName": "Bài 9: Phân tích đa thức thành nhân tử",
          "content": "Phân tích đa thức $x^2 - 4x + 4$ thành nhân tử được kết quả là:",
          "options": [
            {
              "key": "A",
              "text": "$(x + 2)^2$"
            },
            {
              "key": "B",
              "text": "$(x - 2)^2$"
            },
            {
              "key": "C",
              "text": "$(x - 4)^2$"
            },
            {
              "key": "D",
              "text": "$(x - 2)(x + 2)$"
            }
          ],
          "correctAnswer": "B",
          "explanation": "Ta có: $x^2 - 2 \\cdot x \\cdot 2 + 2^2 = (x - 2)^2$.",
          "hint": "Nhận dạng hằng đẳng thức bình phương của một hiệu $(A - B)^2$.",
          "xp": 20
        },
        {
          "id": "11_5",
          "number": 5,
          "type": "mcq",
          "level": "VD",
          "grade": 8,
          "book": "KNTT",
          "chapter": 2,
          "lessonId": "K8_C2_B6",
          "lessonName": "Bài 6: Hiệu hai bình phương. Bình phương của một tổng hay một hiệu",
          "content": "Tính nhanh giá trị của biểu thức $99^2 - 1$ ta được:",
          "options": [
            {
              "key": "A",
              "text": "$9800$"
            },
            {
              "key": "B",
              "text": "$9900$"
            },
            {
              "key": "C",
              "text": "$9700$"
            },
            {
              "key": "D",
              "text": "$9600$"
            }
          ],
          "correctAnswer": "A",
          "explanation": "$99^2 - 1^2 = (99 - 1)(99 + 1) = 98 \\cdot 100 = 9800$.",
          "hint": "Áp dụng $a^2 - b^2 = (a - b)(a + b)$ với $a = 99, b = 1$.",
          "xp": 30
        }
      ]
    },
    {
      "partId": 2,
      "title": "PHẦN 2: TRẮC NGHIỆM ĐÚNG SAI (3 câu)",
      "instruction": "Trong mỗi ý a), b), c), d) ở mỗi câu, chọn đúng hoặc sai.",
      "questions": [
        {
          "id": "11_6",
          "number": 1,
          "type": "tf",
          "level": "TH",
          "grade": 8,
          "book": "KNTT",
          "chapter": 2,
          "lessonId": "K8_C2_B7",
          "lessonName": "Bài 7: Lập phương của một tổng. Lập phương của một hiệu",
          "content": "Cho biểu thức $P = (x + 2)^3$. Xét tính đúng/sai của các khẳng định sau:",
          "prompt": "Cho biểu thức $P = (x + 2)^3$. Xét tính đúng/sai của các khẳng định sau:",
          "items": [
            {
              "key": "a",
              "label": "a",
              "text": "Khai triển của $P$ là $x^3 + 6x^2 + 12x + 8$.",
              "correctAnswer": "Đ",
              "explanation": "$(x + 2)^3 = x^3 + 3x^2(2) + 3x(2^2) + 2^3 = x^3 + 6x^2 + 12x + 8$."
            },
            {
              "key": "b",
              "label": "b",
              "text": "Hệ số của hạng tử chứa $x^2$ trong khai triển bằng $6$.",
              "correctAnswer": "Đ",
              "explanation": "Hạng tử chứa $x^2$ là $6x^2$, hệ số là 6."
            },
            {
              "key": "c",
              "label": "c",
              "text": "Bậc của đa thức $P$ sau khai triển là $4$.",
              "correctAnswer": "S",
              "explanation": "Bậc cao nhất là $3$, không phải $4$."
            },
            {
              "key": "d",
              "label": "d",
              "text": "Tại $x = -2$, giá trị của biểu thức $P$ bằng $0$.",
              "correctAnswer": "Đ",
              "explanation": "Thay $x = -2 \\Rightarrow (-2 + 2)^3 = 0$."
            }
          ],
          "xp": 35
        },
        {
          "id": "11_7",
          "number": 2,
          "type": "tf",
          "level": "VD",
          "grade": 8,
          "book": "KNTT",
          "chapter": 2,
          "lessonId": "K8_C2_B8",
          "lessonName": "Bài 8: Tổng và hiệu hai lập phương",
          "content": "Cho hai biểu thức $A = x^3 - 8$ và $B = (x - 2)(x^2 + 2x + 4)$.",
          "prompt": "Cho hai biểu thức $A = x^3 - 8$ và $B = (x - 2)(x^2 + 2x + 4)$.",
          "items": [
            {
              "key": "a",
              "label": "a",
              "text": "Hai biểu thức $A$ và $B$ luôn bằng nhau với mọi giá trị của $x$.",
              "correctAnswer": "Đ",
              "explanation": "Đây là hằng đẳng thức hiệu hai lập phương: $x^3 - 2^3 = (x - 2)(x^2 + 2x + 4)$."
            },
            {
              "key": "b",
              "label": "b",
              "text": "Biểu thức $x^2 + 2x + 4$ được gọi là bình phương thiếu của một tổng.",
              "correctAnswer": "Đ",
              "explanation": "Đúng theo quy ước tên gọi trong SGK KNTT."
            },
            {
              "key": "c",
              "label": "c",
              "text": "Giá trị của $x^2 + 2x + 4$ luôn dương với mọi số thực $x$.",
              "correctAnswer": "Đ",
              "explanation": "$x^2 + 2x + 4 = (x + 1)^2 + 3 > 0$ với mọi $x$."
            },
            {
              "key": "d",
              "label": "d",
              "text": "Tại $x = 2$, giá trị của $A$ và $B$ đều bằng $4$.",
              "correctAnswer": "S",
              "explanation": "Tại $x = 2$, $A = B = 2^3 - 8 = 0$."
            }
          ],
          "xp": 35
        },
        {
          "id": "11_8",
          "number": 3,
          "type": "tf",
          "level": "VD",
          "grade": 8,
          "book": "KNTT",
          "chapter": 2,
          "lessonId": "K8_C2_B9",
          "lessonName": "Bài 9: Phân tích đa thức thành nhân tử",
          "content": "Xét việc phân tích đa thức $K = x^2 - 2xy + y^2 - 9$ thành nhân tử:",
          "prompt": "Xét việc phân tích đa thức $K = x^2 - 2xy + y^2 - 9$ thành nhân tử:",
          "items": [
            {
              "key": "a",
              "label": "a",
              "text": "Ba hạng tử đầu tạo thành bình phương của một hiệu: $(x - y)^2$.",
              "correctAnswer": "Đ",
              "explanation": "$x^2 - 2xy + y^2 = (x - y)^2$."
            },
            {
              "key": "b",
              "label": "b",
              "text": "Đa thức $K$ được viết lại là $(x - y)^2 - 3^2$.",
              "correctAnswer": "Đ",
              "explanation": "$9 = 3^2$, do đó $K = (x - y)^2 - 3^2$."
            },
            {
              "key": "c",
              "label": "c",
              "text": "Kết quả phân tích thành nhân tử là $(x - y - 3)(x - y + 3)$.",
              "correctAnswer": "Đ",
              "explanation": "Áp dụng $A^2 - B^2 = (A - B)(A + B)$."
            },
            {
              "key": "d",
              "label": "d",
              "text": "Tại $x = 5, y = 2$, giá trị của biểu thức $K$ bằng $16$.",
              "correctAnswer": "S",
              "explanation": "Thay $x = 5, y = 2 \\Rightarrow K = (5 - 2)^2 - 9 = 9 - 9 = 0$."
            }
          ],
          "xp": 35
        }
      ]
    },
    {
      "partId": 3,
      "title": "PHẦN 3: TRẮC NGHIỆM TRẢ LỜI NGẮN (2 câu)",
      "instruction": "Viết kết quả cuối cùng vào ô trống.",
      "questions": [
        {
          "id": "11_9",
          "number": 1,
          "type": "short",
          "level": "VD",
          "grade": 8,
          "book": "KNTT",
          "chapter": 2,
          "lessonId": "K8_C2_B6",
          "lessonName": "Bài 6: Hiệu hai bình phương. Bình phương của một tổng hay một hiệu",
          "content": "Tìm giá trị nhỏ nhất của biểu thức $A = x^2 - 6x + 10$.",
          "correctAnswers": [
            "1"
          ],
          "correctAnswer": "1",
          "explanation": "Ta biến đổi: $A = (x^2 - 6x + 9) + 1 = (x - 3)^2 + 1 \\ge 1$. Dấu '=' xảy ra khi $x = 3$. Vậy GTNN là 1.",
          "hint": "Đưa về dạng $(x - a)^2 + m$.",
          "xp": 40
        },
        {
          "id": "11_10",
          "number": 2,
          "type": "short",
          "level": "VD",
          "grade": 8,
          "book": "KNTT",
          "chapter": 2,
          "lessonId": "K8_C2_B6",
          "lessonName": "Bài 6: Hiệu hai bình phương. Bình phương của một tổng hay một hiệu",
          "content": "Tìm số thực dương $x$ thỏa mãn phương trình: $x^2 - 25 = 0$.",
          "correctAnswers": [
            "5"
          ],
          "correctAnswer": "5",
          "explanation": "$x^2 - 25 = 0 \\Leftrightarrow (x - 5)(x + 5) = 0 \\Leftrightarrow x = 5$ hoặc $x = -5$. Do $x > 0$ nên $x = 5$.",
          "hint": "Dùng hằng đẳng thức hiệu hai bình phương và chú ý điều kiện $x > 0$.",
          "xp": 40
        }
      ]
    }
  ]
},
{
  "id": 12,
  "code": "DE-K8-C3-01",
  "title": "Đề số 7: Tứ giác & Các hình thang, hình bình hành, hình chữ nhật",
  "subtitle": "Định lý tổng các góc tứ giác, hình thang cân, hình bình hành, hình chữ nhật, hình thoi, hình vuông",
  "grade": "Toán 8",
  "gradeNum": 8,
  "book": "KNTT",
  "chapter": 3,
  "timeMinutes": 45,
  "topic": "Tứ giác & Các hình",
  "levelTarget": "standard",
  "parts": [
    {
      "partId": 1,
      "title": "PHẦN 1: TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (5 câu)",
      "instruction": "Chọn một phương án đúng nhất.",
      "questions": [
        {
          "id": "12_1",
          "number": 1,
          "type": "mcq",
          "level": "NB",
          "grade": 8,
          "book": "KNTT",
          "chapter": 3,
          "lessonId": "K8_C3_B10",
          "lessonName": "Bài 10: Tứ giác",
          "content": "Tổng số đo các góc trong một tứ giác lồi luôn bằng:",
          "options": [
            {
              "key": "A",
              "text": "$180^\\circ$"
            },
            {
              "key": "B",
              "text": "$360^\\circ$"
            },
            {
              "key": "C",
              "text": "$270^\\circ$"
            },
            {
              "key": "D",
              "text": "$540^\\circ$"
            }
          ],
          "correctAnswer": "B",
          "explanation": "Theo định lý: Tổng các góc của một tứ giác bằng $360^\\circ$.",
          "hint": "Nhớ định lý tổng các góc trong một tứ giác.",
          "xp": 10
        },
        {
          "id": "12_2",
          "number": 2,
          "type": "mcq",
          "level": "NB",
          "grade": 8,
          "book": "KNTT",
          "chapter": 3,
          "lessonId": "K8_C3_B11",
          "lessonName": "Bài 11: Hình thang cân",
          "content": "Hình thang cân là hình thang có:",
          "options": [
            {
              "key": "A",
              "text": "Hai góc kề một đáy bằng nhau"
            },
            {
              "key": "B",
              "text": "Hai cạnh đáy bằng nhau"
            },
            {
              "key": "C",
              "text": "Hai góc đối bằng nhau"
            },
            {
              "key": "D",
              "text": "Hai cạnh bên song song"
            }
          ],
          "correctAnswer": "A",
          "explanation": "Định nghĩa: Hình thang cân là hình thang có hai góc kề một đáy bằng nhau.",
          "hint": "Xem lại định nghĩa hình thang cân trong SGK KNTT.",
          "xp": 10
        },
        {
          "id": "12_3",
          "number": 3,
          "type": "mcq",
          "level": "TH",
          "grade": 8,
          "book": "KNTT",
          "chapter": 3,
          "lessonId": "K8_C3_B10",
          "lessonName": "Bài 10: Tứ giác",
          "content": "Cho tứ giác $ABCD$ có $\\widehat{A} = 70^\\circ, \\widehat{B} = 80^\\circ, \\widehat{C} = 100^\\circ$. Số đo góc $D$ là:",
          "options": [
            {
              "key": "A",
              "text": "$100^\\circ$"
            },
            {
              "key": "B",
              "text": "$110^\\circ$"
            },
            {
              "key": "C",
              "text": "$120^\\circ$"
            },
            {
              "key": "D",
              "text": "$90^\\circ$"
            }
          ],
          "correctAnswer": "B",
          "explanation": "Ta có: $\\widehat{D} = 360^\\circ - (70^\\circ + 80^\\circ + 100^\\circ) = 360^\\circ - 250^\\circ = 110^\\circ$.",
          "hint": "Lấy $360^\\circ$ trừ tổng ba góc đã biết.",
          "xp": 20
        },
        {
          "id": "12_4",
          "number": 4,
          "type": "mcq",
          "level": "TH",
          "grade": 8,
          "book": "KNTT",
          "chapter": 3,
          "lessonId": "K8_C3_B12",
          "lessonName": "Bài 12: Hình bình hành",
          "content": "Khẳng định nào sau đây KHÔNG PHẢI là tính chất của hình bình hành?",
          "options": [
            {
              "key": "A",
              "text": "Các cạnh đối bằng nhau"
            },
            {
              "key": "B",
              "text": "Các góc đối bằng nhau"
            },
            {
              "key": "C",
              "text": "Hai đường chéo vuông góc với nhau"
            },
            {
              "key": "D",
              "text": "Hai đường chéo cắt nhau tại trung điểm của mỗi đường"
            }
          ],
          "correctAnswer": "C",
          "explanation": "Hình bình hành nói chung hai đường chéo cắt nhau tại trung điểm mỗi đường chứ không bắt buộc vuông góc (chỉ hình thoi và hình vuông mới vuông góc).",
          "hint": "Hai đường chéo vuông góc là đặc trưng của hình thoi hoặc hình vuông.",
          "xp": 20
        },
        {
          "id": "12_5",
          "number": 5,
          "type": "mcq",
          "level": "VD",
          "grade": 8,
          "book": "KNTT",
          "chapter": 3,
          "lessonId": "K8_C3_B14",
          "lessonName": "Bài 14: Hình thoi và hình vuông",
          "content": "Hình chữ nhật có hai đường chéo vuông góc với nhau là:",
          "options": [
            {
              "key": "A",
              "text": "Hình bình hành"
            },
            {
              "key": "B",
              "text": "Hình vuông"
            },
            {
              "key": "C",
              "text": "Hình thang cân"
            },
            {
              "key": "D",
              "text": "Hình thoi"
            }
          ],
          "correctAnswer": "B",
          "explanation": "Dấu hiệu nhận biết: Hình chữ nhật có hai đường chéo vuông góc với nhau là hình vuông.",
          "hint": "Hình chữ nhật có thêm tính chất của hình thoi thì trở thành hình gì?",
          "xp": 30
        }
      ]
    },
    {
      "partId": 2,
      "title": "PHẦN 2: TRẮC NGHIỆM ĐÚNG SAI (3 câu)",
      "instruction": "Trong mỗi ý a), b), c), d) ở mỗi câu, chọn đúng hoặc sai.",
      "questions": [
        {
          "id": "12_6",
          "number": 1,
          "type": "tf",
          "level": "TH",
          "grade": 8,
          "book": "KNTT",
          "chapter": 3,
          "lessonId": "K8_C3_B10",
          "lessonName": "Bài 10: Tứ giác",
          "content": "Cho tứ giác lồi $ABCD$. Xét tính đúng/sai của các khẳng định sau:",
          "prompt": "Cho tứ giác lồi $ABCD$. Xét tính đúng/sai của các khẳng định sau:",
          "items": [
            {
              "key": "a",
              "label": "a",
              "text": "Tứ giác $ABCD$ có thể có $4$ góc nhọn.",
              "correctAnswer": "S",
              "explanation": "Nếu cả 4 góc đều nhọn thì tổng 4 góc nhỏ hơn $4 \\times 90^\\circ = 360^\\circ$ (vô lý)."
            },
            {
              "key": "b",
              "label": "b",
              "text": "Tứ giác $ABCD$ có thể có $4$ góc vuông.",
              "correctAnswer": "Đ",
              "explanation": "Khi 4 góc đều bằng $90^\\circ$, tứ giác là hình chữ nhật."
            },
            {
              "key": "c",
              "label": "c",
              "text": "Tổng các góc ngoài (mỗi đỉnh lấy một góc) của tứ giác bằng $360^\\circ$.",
              "correctAnswer": "Đ",
              "explanation": "Định lý: Tổng các góc ngoài của một đa giác lồi luôn bằng $360^\\circ$."
            },
            {
              "key": "d",
              "label": "d",
              "text": "Tứ giác $ABCD$ có nhiều nhất $3$ góc tù.",
              "correctAnswer": "Đ",
              "explanation": "Nếu có 4 góc tù thì tổng lớn hơn $360^\\circ$, do đó có tối đa 3 góc tù."
            }
          ],
          "xp": 35
        },
        {
          "id": "12_7",
          "number": 2,
          "type": "tf",
          "level": "VD",
          "grade": 8,
          "book": "KNTT",
          "chapter": 3,
          "lessonId": "K8_C3_B12",
          "lessonName": "Bài 12: Hình bình hành",
          "content": "Cho hình bình hành $ABCD$ có $AB = 8\\text{ cm}, BC = 5\\text{ cm}$.",
          "prompt": "Cho hình bình hành $ABCD$ có $AB = 8\\text{ cm}, BC = 5\\text{ cm}$.",
          "items": [
            {
              "key": "a",
              "label": "a",
              "text": "Độ dài cạnh $CD = 8\\text{ cm}$ và $AD = 5\\text{ cm}$.",
              "correctAnswer": "Đ",
              "explanation": "Vì trong hình bình hành các cạnh đối bằng nhau: $CD = AB = 8\\text{ cm}, AD = BC = 5\\text{ cm}$."
            },
            {
              "key": "b",
              "label": "b",
              "text": "Chu vi của hình bình hành $ABCD$ bằng $26\\text{ cm}$.",
              "correctAnswer": "Đ",
              "explanation": "Chu vi $P = 2(AB + BC) = 2(8 + 5) = 26\\text{ cm}$."
            },
            {
              "key": "c",
              "label": "c",
              "text": "Hai đường chéo $AC$ và $BD$ luôn bằng nhau.",
              "correctAnswer": "S",
              "explanation": "Hình bình hành nói chung hai đường chéo không bằng nhau (chỉ bằng nhau khi là hình chữ nhật)."
            },
            {
              "key": "d",
              "label": "d",
              "text": "Góc $\\widehat{A}$ và góc $\\widehat{B}$ là hai góc bù nhau (tổng bằng $180^\\circ$).",
              "correctAnswer": "Đ",
              "explanation": "Vì $AD \\parallel BC$ nên hai góc trong cùng phía $\\widehat{A} + \\widehat{B} = 180^\\circ$."
            }
          ],
          "xp": 35
        },
        {
          "id": "12_8",
          "number": 3,
          "type": "tf",
          "level": "VD",
          "grade": 8,
          "book": "KNTT",
          "chapter": 3,
          "lessonId": "K8_C3_B13",
          "lessonName": "Bài 13: Hình chữ nhật",
          "content": "Cho tam giác $ABC$ vuông tại $A$, có trung tuyến $AM$. Gọi $D$ là điểm đối xứng với $A$ qua $M$.",
          "prompt": "Cho tam giác $ABC$ vuông tại $A$, có trung tuyến $AM$. Gọi $D$ là điểm đối xứng với $A$ qua $M$.",
          "items": [
            {
              "key": "a",
              "label": "a",
              "text": "Tứ giác $ABDC$ có hai đường chéo cắt nhau tại trung điểm của mỗi đường.",
              "correctAnswer": "Đ",
              "explanation": "$M$ là trung điểm của $BC$ (gt) và $M$ là trung điểm của $AD$ (do đối xứng)."
            },
            {
              "key": "b",
              "label": "b",
              "text": "Tứ giác $ABDC$ là một hình bình hành.",
              "correctAnswer": "Đ",
              "explanation": "Tứ giác có hai đường chéo cắt nhau tại trung điểm mỗi đường là hình bình hành."
            },
            {
              "key": "c",
              "label": "c",
              "text": "Tứ giác $ABDC$ là một hình chữ nhật.",
              "correctAnswer": "Đ",
              "explanation": "Hình bình hành có một góc vuông ($\\widehat{A} = 90^\\circ$) là hình chữ nhật."
            },
            {
              "key": "d",
              "label": "d",
              "text": "Độ dài đoạn thẳng $AM$ bằng một nửa độ dài cạnh $BC$.",
              "correctAnswer": "Đ",
              "explanation": "Trong tam giác vuông, đường trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền: $AM = \\frac{1}{2}BC$."
            }
          ],
          "xp": 35
        }
      ]
    },
    {
      "partId": 3,
      "title": "PHẦN 3: TRẮC NGHIỆM TRẢ LỜI NGẮN (2 câu)",
      "instruction": "Viết kết quả cuối cùng vào ô trống.",
      "questions": [
        {
          "id": "12_9",
          "number": 1,
          "type": "short",
          "level": "TH",
          "grade": 8,
          "book": "KNTT",
          "chapter": 3,
          "lessonId": "K8_C3_B11",
          "lessonName": "Bài 11: Hình thang cân",
          "content": "Cho hình thang cân $ABCD$ ($AB \\parallel CD$) có góc $\\widehat{D} = 70^\\circ$. Tính số đo góc $\\widehat{A}$ (đơn vị: độ).",
          "correctAnswers": [
            "110",
            "110 độ",
            "110°"
          ],
          "correctAnswer": "110",
          "explanation": "Vì $AB \\parallel CD$ nên hai góc trong cùng phía bù nhau: $\\widehat{A} + \\widehat{D} = 180^\\circ \\Rightarrow \\widehat{A} = 180^\\circ - 70^\\circ = 110^\\circ$.",
          "hint": "Hai góc trong cùng phía có tổng bằng $180^\\circ$.",
          "xp": 40
        },
        {
          "id": "12_10",
          "number": 2,
          "type": "short",
          "level": "VD",
          "grade": 8,
          "book": "KNTT",
          "chapter": 3,
          "lessonId": "K8_C3_B13",
          "lessonName": "Bài 13: Hình chữ nhật",
          "content": "Một mảnh vườn hình chữ nhật có chiều dài là $8\\text{ m}$ và chiều rộng là $6\\text{ m}$. Tính độ dài đường chéo của mảnh vườn đó (đơn vị: mét).",
          "correctAnswers": [
            "10",
            "10m",
            "10 m",
            "10 mét"
          ],
          "correctAnswer": "10",
          "explanation": "Theo định lý Pythagore trong tam giác vuông tạo bởi hai kích thước: $d = \\sqrt{8^2 + 6^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10\\text{ m}$.",
          "hint": "Dùng định lý Pythagore: $c = \\sqrt{a^2 + b^2}$.",
          "xp": 40
        }
      ]
    }
  ]
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
          { "lessonId": "K8_C1_B1", "name": "Bài 1: Đơn thức", "questionCount": 10 },
          { "lessonId": "K8_C1_B2", "name": "Bài 2: Đa thức", "questionCount": 10 },
          { "lessonId": "K8_C1_B3", "name": "Bài 3: Phép cộng và phép trừ đa thức", "questionCount": 8 },
          { "lessonId": "K8_C1_B4", "name": "Bài 4: Phép nhân đa thức", "questionCount": 8 },
          { "lessonId": "K8_C1_B5", "name": "Bài 5: Phép chia đa thức cho đơn thức", "questionCount": 6 }
        ]
      },
      {
        "chapterId": 2,
        "title": "Chương II: Hằng đẳng thức đáng nhớ & Ứng dụng",
        "description": "7 hằng đẳng thức đáng nhớ, phân tích đa thức thành nhân tử",
        "lessons": [
          { "lessonId": "K8_C2_B6", "name": "Bài 6: Hiệu hai bình phương. Bình phương của một tổng hay một hiệu", "questionCount": 10 },
          { "lessonId": "K8_C2_B7", "name": "Bài 7: Lập phương của một tổng. Lập phương của một hiệu", "questionCount": 8 },
          { "lessonId": "K8_C2_B8", "name": "Bài 8: Tổng và hiệu hai lập phương", "questionCount": 8 },
          { "lessonId": "K8_C2_B9", "name": "Bài 9: Phân tích đa thức thành nhân tử", "questionCount": 12 }
        ]
      },
      {
        "chapterId": 3,
        "title": "Chương III: Tứ giác",
        "description": "Tứ giác, hình thang cân, hình bình hành, hình chữ nhật, hình thoi, hình vuông",
        "lessons": [
          { "lessonId": "K8_C3_B10", "name": "Bài 10: Tứ giác", "questionCount": 10 },
          { "lessonId": "K8_C3_B11", "name": "Bài 11: Hình thang cân", "questionCount": 10 },
          { "lessonId": "K8_C3_B12", "name": "Bài 12: Hình bình hành", "questionCount": 10 },
          { "lessonId": "K8_C3_B13", "name": "Bài 13: Hình chữ nhật", "questionCount": 10 },
          { "lessonId": "K8_C3_B14", "name": "Bài 14: Hình thoi và hình vuông", "questionCount": 10 }
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

