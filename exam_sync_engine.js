/**
 * =============================================================================
 * EXAM SYNC & AUTOMATION ENGINE (HẠT NHÂN QUẢN TRỊ ĐỀ & ĐỒNG BỘ KẾT QUẢ)
 * Phiên bản: 1.0 - Chuẩn EdTech GDPT 2018 (Kết nối tri thức với cuộc sống)
 * =============================================================================
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ExamSyncEngine = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {

  // KHO LƯU TRỮ KEY
  const STORAGE_KEYS = {
    EXAMS: 'TN_TOAN_EXAM_REPOSITORY_V1',
    TASKS: 'TN_TOAN_ASSIGNMENT_TASKS_V1',
    SUBMISSIONS: 'TN_TOAN_STUDENT_SUBMISSIONS_V1',
    ACTIVE_STUDENT: 'TN_TOAN_ACTIVE_STUDENT_SESSION_V1',
    CLASS_HISTORY: 'TN_TOAN_CLASS_HISTORY_V1',
    SHEETS_WEBHOOK: 'TN_TOAN_GOOGLE_SHEETS_WEBHOOK_V1'
  };

  const SYNC_CHANNEL_NAME = 'TN_TOAN_EXAM_BROADCAST_CHANNEL';

  // Thiết lập BroadcastChannel để đồng bộ tức thì giữa các tab trình duyệt
  let broadcastChannel = null;
  if (typeof BroadcastChannel !== 'undefined') {
    try {
      broadcastChannel = new BroadcastChannel(SYNC_CHANNEL_NAME);
    } catch (e) {
      console.warn('[ExamSyncEngine] BroadcastChannel not available:', e);
    }
  }

  // --- DỮ LIỆU ĐỀ THI MẶC ĐỊNH (DEFAULT REPOSITORY) ---
  const DEFAULT_EXAMS = [
    {
      id: "EXAM-K8-001",
      code: "DE-K8-C1-01",
      title: "Đề kiểm tra 15 phút: Đơn thức và Đa thức nhiều biến",
      grade: 8,
      subject: "Toán học 8 (KNTT)",
      chapter: "Chương I: Đa thức",
      topic: "Đơn thức và Đa thức",
      timeMinutes: 15,
      levelTarget: "all",
      description: "Kiểm tra nhận biết đơn thức thu gọn, bậc của đơn thức, thu gọn đa thức nhiều biến.",
      createdAt: "2026-09-18T08:00:00.000Z",
      createdBy: "Tổ Toán THCS",
      questions: [
        {
          id: "t8_c1_01",
          number: 1,
          level: "NB",
          content: "Biểu thức nào sau đây là một đơn thức thu gọn?",
          options: [
            { key: "A", text: "$2x^2y \\cdot 3x$" },
            { key: "B", text: "$-5x^3y^2$" },
            { key: "C", text: "$x^2 + y$" },
            { key: "D", text: "$4xy(x - 1)$" }
          ],
          correctAnswer: "B",
          hint: "Đơn thức thu gọn là đơn thức chỉ gồm tích của một số với các biến, mỗi biến chỉ viết một lần với số mũ nguyên dương.",
          explanation: "$-5x^3y^2$ có hệ số là $-5$, mỗi biến $x, y$ chỉ viết một lần, đây là đơn thức thu gọn."
        },
        {
          id: "t8_c1_02",
          number: 2,
          level: "NB",
          content: "Bậc của đơn thức $A = -3x^2y^4z$ là:",
          options: [
            { key: "A", text: "6" },
            { key: "B", text: "7" },
            { key: "C", text: "8" },
            { key: "D", text: "2" }
          ],
          correctAnswer: "B",
          hint: "Bậc của đơn thức có hệ số khác 0 là tổng số mũ của tất cả các biến có trong đơn thức đó.",
          explanation: "Bậc của đơn thức là tổng các số mũ: $2 + 4 + 1 = 7$."
        },
        {
          id: "t8_c1_03",
          number: 3,
          level: "TH",
          content: "Thu gọn đơn thức $M = 2x^2y \\cdot \\left(-\\frac{1}{2}xy^3\\right)$ ta được:",
          options: [
            { key: "A", text: "$-x^3y^4$" },
            { key: "B", text: "$x^3y^4$" },
            { key: "C", text: "$-x^2y^3$" },
            { key: "D", text: "$-4x^3y^4$" }
          ],
          correctAnswer: "A",
          hint: "Nhân các hệ số với nhau và nhân các phần biến cùng cơ số với nhau.",
          explanation: "Ta có: $M = \\left(2 \\cdot -\\frac{1}{2}\\right) \\cdot (x^2 \\cdot x) \\cdot (y \\cdot y^3) = -1 \\cdot x^3 \\cdot y^4 = -x^3y^4$."
        },
        {
          id: "t8_c1_04",
          number: 4,
          level: "TH",
          content: "Tổng của hai đơn thức đồng dạng $3x^2y$ và $-5x^2y$ bằng:",
          options: [
            { key: "A", text: "$-2x^4y^2$" },
            { key: "B", text: "$-8x^2y$" },
            { key: "C", text: "$-2x^2y$" },
            { key: "D", text: "$2x^2y$" }
          ],
          correctAnswer: "C",
          hint: "Cộng trừ hai đơn thức đồng dạng: cộng trừ phần hệ số và giữ nguyên phần biến.",
          explanation: "$3x^2y + (-5x^2y) = (3 - 5)x^2y = -2x^2y$."
        },
        {
          id: "t8_c1_05",
          number: 5,
          level: "VD",
          content: "Giá trị của đa thức $P = x^2 - 2xy + y^2$ tại $x = 102$ và $y = 2$ là:",
          options: [
            { key: "A", text: "100" },
            { key: "B", text: "10 000" },
            { key: "C", text: "1 000" },
            { key: "D", text: "104" }
          ],
          correctAnswer: "B",
          hint: "Nhận dạng hằng đẳng thức bình phương của một hiệu trước khi thay số.",
          explanation: "Ta có: $P = (x - y)^2$. Thay $x = 102, y = 2 \\Rightarrow P = (102 - 2)^2 = 100^2 = 10 000$."
        }
      ]
    },
    {
      id: "EXAM-K8-002",
      code: "DE-K8-C2-01",
      title: "Đề rèn luyện nâng cao: Hằng đẳng thức đáng nhớ & Ứng dụng",
      grade: 8,
      subject: "Toán học 8 (KNTT)",
      chapter: "Chương II: Hằng đẳng thức đáng nhớ",
      topic: "7 Hằng đẳng thức",
      timeMinutes: 25,
      levelTarget: "advanced",
      description: "Thử thách bứt phá điểm 8-10 cho học sinh khá giỏi về phân tích đa thức thành nhân tử.",
      createdAt: "2026-09-18T08:30:00.000Z",
      createdBy: "Tổ Toán THCS",
      questions: [
        {
          id: "t8_c2_01",
          number: 1,
          level: "NB",
          content: "Khai triển của hằng đẳng thức $(a + b)^2$ là:",
          options: [
            { key: "A", text: "$a^2 + b^2$" },
            { key: "B", text: "$a^2 + 2ab + b^2$" },
            { key: "C", text: "$a^2 - 2ab + b^2$" },
            { key: "D", text: "$a^2 + ab + b^2$" }
          ],
          correctAnswer: "B",
          hint: "Bình phương của một tổng bằng bình phương số thứ nhất cộng hai lần tích số thứ nhất với số thứ hai cộng bình phương số thứ hai.",
          explanation: "$(a + b)^2 = a^2 + 2ab + b^2$."
        },
        {
          id: "t8_c2_02",
          number: 2,
          level: "TH",
          content: "Biểu thức $4x^2 - 9$ được viết dưới dạng tích là:",
          options: [
            { key: "A", text: "$(2x - 3)(2x + 3)$" },
            { key: "B", text: "$(4x - 9)(4x + 9)$" },
            { key: "C", text: "$(2x - 3)^2$" },
            { key: "D", text: "$(2x + 3)^2$" }
          ],
          correctAnswer: "A",
          hint: "Áp dụng hằng đẳng thức hiệu hai bình phương: $A^2 - B^2 = (A - B)(A + B)$.",
          explanation: "$4x^2 - 9 = (2x)^2 - 3^2 = (2x - 3)(2x + 3)$."
        },
        {
          id: "t8_c2_03",
          number: 3,
          level: "VD",
          content: "Rút gọn biểu thức $A = (x + 2)^2 - (x - 2)^2$ ta được:",
          options: [
            { key: "A", text: "$8x$" },
            { key: "B", text: "$4x$" },
            { key: "C", text: "$8$" },
            { key: "D", text: "$2x^2 + 8$" }
          ],
          correctAnswer: "A",
          hint: "Dùng hằng đẳng thức hiệu hai bình phương hoặc khai triển từng bình phương rồi trừ đi.",
          explanation: "$A = (x^2 + 4x + 4) - (x^2 - 4x + 4) = 4x - (-4x) = 8x$."
        },
        {
          id: "t8_c2_04",
          number: 4,
          level: "VD",
          content: "Tìm $x$ biết: $(x - 3)^2 - x(x + 4) = 9$.",
          options: [
            { key: "A", text: "$x = 0$" },
            { key: "B", text: "$x = 1$" },
            { key: "C", text: "$x = -1$" },
            { key: "D", text: "$x = 2$" }
          ],
          correctAnswer: "A",
          hint: "Khai triển vế trái, rút gọn hệ số của $x^2$ và chuyển vế tìm $x$.",
          explanation: "Ta có: $x^2 - 6x + 9 - x^2 - 4x = 9 \\Leftrightarrow -10x + 9 = 9 \\Leftrightarrow -10x = 0 \\Leftrightarrow x = 0$."
        },
        {
          id: "t8_c2_05",
          number: 5,
          level: "VDC",
          content: "Giá trị nhỏ nhất của biểu thức $M = x^2 - 4x + 7$ là:",
          options: [
            { key: "A", text: "3" },
            { key: "B", text: "7" },
            { key: "C", text: "-4" },
            { key: "D", text: "2" }
          ],
          correctAnswer: "A",
          hint: "Biến đổi biểu thức về dạng $(x - a)^2 + m$. Khi đó GTNN là $m$.",
          explanation: "$M = (x^2 - 4x + 4) + 3 = (x - 2)^2 + 3 \\ge 3$ với mọi $x$. Dấu '=' xảy ra khi $x = 2$. Vậy GTNN là 3."
        }
      ]
    },
    {
      id: "EXAM-K6-001",
      code: "DE-K6-C1-01",
      title: "Đề tổng ôn Toán 6: Tập hợp & Số tự nhiên (Bài 1 - Bài 4)",
      grade: 6,
      subject: "Toán học 6 (KNTT)",
      chapter: "Chương I: Tập hợp các số tự nhiên",
      topic: "Tập hợp & Phép tính",
      timeMinutes: 20,
      levelTarget: "all",
      description: "Đề ôn tập nền tảng bám sát SGK Kết nối tri thức.",
      createdAt: "2026-09-18T07:00:00.000Z",
      createdBy: "Tổ Toán THCS",
      questions: [
        {
          id: "t6_c1_01",
          number: 1,
          level: "NB",
          content: "Cho tập hợp $A = \\{1; 2; 3; 4\\}$. Khẳng định nào sau đây là đúng?",
          options: [
            { key: "A", text: "$0 \\in A$" },
            { key: "B", text: "$1 \\notin A$" },
            { key: "C", text: "$2 \\in A$" },
            { key: "D", text: "$5 \\in A$" }
          ],
          correctAnswer: "C",
          hint: "Xem các phần tử được liệt kê bên trong dấu ngoặc nhọn của tập hợp $A$.",
          explanation: "Số 2 nằm trong danh sách phần tử của $A$ nên $2 \\in A$ là đúng."
        },
        {
          id: "t6_c1_02",
          number: 2,
          level: "NB",
          content: "Số tự nhiên liền sau của số 199 là:",
          options: [
            { key: "A", text: "198" },
            { key: "B", text: "200" },
            { key: "C", text: "190" },
            { key: "D", text: "201" }
          ],
          correctAnswer: "B",
          hint: "Số liền sau của số $n$ là $n + 1$.",
          explanation: "$199 + 1 = 200$."
        },
        {
          id: "t6_c1_03",
          number: 3,
          level: "TH",
          content: "Số La Mã XIX biểu diễn số tự nhiên nào trong hệ thập phân?",
          options: [
            { key: "A", text: "19" },
            { key: "B", text: "21" },
            { key: "C", text: "11" },
            { key: "D", text: "9" }
          ],
          correctAnswer: "A",
          hint: "X là 10, IX là 9. Ghép lại $10 + 9$.",
          explanation: "XIX = 10 + 9 = 19."
        },
        {
          id: "t6_c1_04",
          number: 4,
          level: "TH",
          content: "Kết quả của phép tính $15 + 28 + 85 + 72$ tính nhanh là:",
          options: [
            { key: "A", text: "200" },
            { key: "B", text: "190" },
            { key: "C", text: "210" },
            { key: "D", text: "180" }
          ],
          correctAnswer: "A",
          hint: "Nhóm các số tròn chục: $(15 + 85) + (28 + 72)$.",
          explanation: "$(15 + 85) + (28 + 72) = 100 + 100 = 200$."
        },
        {
          id: "t6_c1_05",
          number: 5,
          level: "VD",
          content: "Một đoàn tàu hỏa có 10 toa chở khách, mỗi toa có 12 khoang, mỗi khoang có 4 ghế ngồi. Đoàn tàu đó chở được tối đa bao nhiêu hành khách?",
          options: [
            { key: "A", text: "480 hành khách" },
            { key: "B", text: "400 hành khách" },
            { key: "C", text: "120 hành khách" },
            { key: "D", text: "500 hành khách" }
          ],
          correctAnswer: "A",
          hint: "Thực hiện nhân liên tiếp số toa $\\times$ số khoang $\\times$ số ghế mỗi khoang.",
          explanation: "Tổng số chỗ ngồi là: $10 \\times 12 \\times 4 = 480$ hành khách."
        }
      ]
    },
{
  "id": "EXAM-K8-DE1",
  "code": "DE-K8-C1-01",
  "title": "Đề số 1: Đơn thức và Đa thức nhiều biến (Bài 1 - Bài 4)",
  "grade": 8,
  "subject": "Toán học 8 (KNTT)",
  "chapter": "Chương I: Đa thức",
  "topic": "Đơn thức & Đa thức",
  "timeMinutes": 45,
  "levelTarget": "standard",
  "description": "Khái niệm đơn thức, đa thức, phép cộng, trừ và nhân đa thức",
  "createdAt": "2026-09-18T10:00:00.000Z",
  "createdBy": "Tổ Toán THCS (Chương trình mới)",
  "parts": [
    {
      "partId": 1,
      "title": "PHẦN 1: TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (5 câu)",
      "instruction": "Mỗi câu hỏi chỉ chọn một phương án đúng.",
      "questions": [
        {
          "id": "t8_d1_q1",
          "number": 1,
          "type": "mcq",
          "level": "NB",
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
          "explanation": "Đơn thức là biểu thức đại số chỉ gồm một số, một biến hoặc một tích giữa các số và các biến. $\\frac{x}{y}$ chứa phép chia cho biến nên không phải là đơn thức.",
          "hint": "Đơn thức không chứa phép cộng, trừ giữa các biến và không chứa biến ở mẫu số."
        },
        {
          "id": "t8_d1_q2",
          "number": 2,
          "type": "mcq",
          "level": "NB",
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
          "explanation": "Hạng tử $x^3y$ có bậc là $3 + 1 = 4$; hạng tử $-2xy^2$ có bậc là $1 + 2 = 3$; số $5$ có bậc $0$. Bậc của đa thức là bậc cao nhất của các hạng tử trong dạng thu gọn, tức là $4$.",
          "hint": "Bậc của đa thức là bậc của hạng tử có bậc cao nhất trong dạng thu gọn."
        },
        {
          "id": "t8_d1_q3",
          "number": 3,
          "type": "mcq",
          "level": "TH",
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
          "explanation": "Ta cộng các hệ số và giữ nguyên phần biến: $3x^2y + 5x^2y = (3 + 5)x^2y = 8x^2y$.",
          "hint": "Cộng hai đơn thức đồng dạng: cộng hệ số, giữ nguyên phần biến."
        },
        {
          "id": "t8_d1_q4",
          "number": 4,
          "type": "mcq",
          "level": "TH",
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
          "explanation": "Áp dụng quy tắc nhân đơn thức với đa thức: $-2x(x^2 - 3x + 1) = (-2x) \\cdot x^2 - (-2x) \\cdot 3x + (-2x) \\cdot 1 = -2x^3 + 6x^2 - 2x$.",
          "hint": "Lưu ý quy tắc dấu khi nhân: $(-2x) \\cdot (-3x) = +6x^2$."
        },
        {
          "id": "t8_d1_q5",
          "number": 5,
          "type": "mcq",
          "level": "TH",
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
          "explanation": "Ta nhân đa thức với đa thức hoặc dùng hằng đẳng thức hiệu hai bình phương: $(x - 2)(x + 2) = x^2 + 2x - 2x - 4 = x^2 - 4$.",
          "hint": "Áp dụng hằng đẳng thức $(a - b)(a + b) = a^2 - b^2$."
        }
      ]
    },
    {
      "partId": 2,
      "title": "PHẦN 2: TRẮC NGHIỆM ĐÚNG SAI (3 câu)",
      "instruction": "Trong mỗi ý a), b), c), d) ở mỗi câu, chọn đúng hoặc sai.",
      "questions": [
        {
          "id": "t8_d1_tf1",
          "number": 1,
          "type": "tf",
          "level": "VD",
          "prompt": "Cho biểu thức $A = 2x(x^2 - y) - 2x^3 + 3xy$.",
          "items": [
            {
              "label": "a",
              "text": "Biểu thức $A$ sau khi rút gọn là một đa thức bậc 2.",
              "correctAnswer": "Đ",
              "explanation": "Ta có $A = 2x^3 - 2xy - 2x^3 + 3xy = xy$, có bậc là $1 + 1 = 2$."
            },
            {
              "label": "b",
              "text": "Hệ số của hạng tử chứa $xy$ trong đa thức $A$ thu gọn là $1$.",
              "correctAnswer": "Đ",
              "explanation": "$A = 1xy$, hệ số bằng $1$."
            },
            {
              "label": "c",
              "text": "Giá trị của $A$ tại $x = 2, y = -1$ là $-2$.",
              "correctAnswer": "Đ",
              "explanation": "Thay $x = 2, y = -1 \\Rightarrow A = 2 \\cdot (-1) = -2$."
            },
            {
              "label": "d",
              "text": "Biểu thức $A$ luôn nhận giá trị dương với mọi $x, y > 0$.",
              "correctAnswer": "Đ",
              "explanation": "Khi $x > 0$ và $y > 0$ thì tích $xy > 0$, do đó $A > 0$."
            }
          ]
        },
        {
          "id": "t8_d1_tf2",
          "number": 2,
          "type": "tf",
          "level": "VD",
          "prompt": "Xét các đa thức $M = 3x^2 - 2xy + y^2$ và $N = x^2 + 2xy - y^2$.",
          "items": [
            {
              "label": "a",
              "text": "Đa thức tổng $M + N = 4x^2$.",
              "correctAnswer": "Đ",
              "explanation": "$M + N = (3x^2 + x^2) + (-2xy + 2xy) + (y^2 - y^2) = 4x^2$."
            },
            {
              "label": "b",
              "text": "Đa thức hiệu $M - N = 2x^2 - 4xy + 2y^2$.",
              "correctAnswer": "Đ",
              "explanation": "$M - N = (3x^2 - x^2) + (-2xy - 2xy) + [y^2 - (-y^2)] = 2x^2 - 4xy + 2y^2$."
            },
            {
              "label": "c",
              "text": "Bậc của đa thức $M + N$ là $4$.",
              "correctAnswer": "S",
              "explanation": "$M + N = 4x^2$, bậc của đa thức này là $2$, không phải $4$."
            },
            {
              "label": "d",
              "text": "Tại $x = 1, y = 1$, giá trị của biểu thức $M - N$ bằng $0$.",
              "correctAnswer": "Đ",
              "explanation": "Thay $x = 1, y = 1 \\Rightarrow 2(1)^2 - 4(1)(1) + 2(1)^2 = 2 - 4 + 2 = 0$."
            }
          ]
        },
        {
          "id": "t8_d1_tf3",
          "number": 3,
          "type": "tf",
          "level": "VD",
          "prompt": "Thực hiện phép nhân đa thức $P = (x - y)(x^2 + xy + y^2)$.",
          "items": [
            {
              "label": "a",
              "text": "Trong đa thức tích $P$ (sau thu gọn) có chứa hạng tử $x^2y$.",
              "correctAnswer": "S",
              "explanation": "Khai triển $P = x^3 + x^2y + xy^2 - x^2y - xy^2 - y^3 = x^3 - y^3$, các hạng tử chứa $x^2y$ triệt tiêu hết."
            },
            {
              "label": "b",
              "text": "Kết quả thu gọn của phép nhân là đa thức $x^3 - y^3$.",
              "correctAnswer": "Đ",
              "explanation": "Đây chính là hằng đẳng thức hiệu hai lập phương: $(x - y)(x^2 + xy + y^2) = x^3 - y^3$."
            },
            {
              "label": "c",
              "text": "Bậc của đa thức $P$ là $3$.",
              "correctAnswer": "Đ",
              "explanation": "$x^3 - y^3$ có bậc cao nhất là $3$."
            },
            {
              "label": "d",
              "text": "Đa thức $P$ có chứa biến $xy$.",
              "correctAnswer": "S",
              "explanation": "Sau khi thu gọn, $P = x^3 - y^3$ không còn chứa biến $xy$."
            }
          ]
        }
      ]
    },
    {
      "partId": 3,
      "title": "PHẦN 3: TRẮC NGHIỆM TRẢ LỜI NGẮN (2 câu)",
      "instruction": "Viết kết quả cuối cùng vào ô trống.",
      "questions": [
        {
          "id": "t8_d1_sa1",
          "number": 1,
          "type": "short",
          "level": "VD",
          "content": "Tìm phần hệ số của đơn thức $B = \\left(-\\frac{1}{2}x^2y\\right) \\cdot (4xy^3)$ sau khi thu gọn.",
          "correctAnswers": [
            "-2"
          ],
          "explanation": "Ta có: $B = \\left(-\\frac{1}{2} \\cdot 4\\right) \\cdot (x^2 \\cdot x) \\cdot (y \\cdot y^3) = -2x^3y^4$. Vậy phần hệ số là $-2$.",
          "hint": "Nhân hệ số với hệ số: $-\\frac{1}{2} \\cdot 4 = -2$."
        },
        {
          "id": "t8_d1_sa2",
          "number": 2,
          "type": "short",
          "level": "VD",
          "content": "Tính giá trị của biểu thức $Q = x(x - 1) - y(x - 1)$ tại $x = 10, y = 9$.",
          "correctAnswers": [
            "9"
          ],
          "explanation": "Đặt nhân tử chung: $Q = (x - 1)(x - y)$. Thay $x = 10, y = 9$ vào: $Q = (10 - 1)(10 - 9) = 9 \\cdot 1 = 9$.",
          "hint": "Nhóm nhân tử chung $(x - 1)$ trước khi thay số."
        }
      ]
    }
  ],
  "questions": [
    {
      "id": "t8_d1_q1",
      "number": 1,
      "type": "mcq",
      "level": "NB",
      "content": "Trong các biểu thức sau, biểu thức nào là đơn thức?",
      "hint": "Đơn thức không chứa phép cộng, trừ giữa các biến và không chứa biến ở mẫu số.",
      "explanation": "Đơn thức là biểu thức đại số chỉ gồm một số, một biến hoặc một tích giữa các số và các biến. $\\frac{x}{y}$ chứa phép chia cho biến nên không phải là đơn thức.",
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
      "correctAnswer": "B"
    },
    {
      "id": "t8_d1_q2",
      "number": 2,
      "type": "mcq",
      "level": "NB",
      "content": "Bậc của đa thức $P = x^3y - 2xy^2 + 5$ là:",
      "hint": "Bậc của đa thức là bậc của hạng tử có bậc cao nhất trong dạng thu gọn.",
      "explanation": "Hạng tử $x^3y$ có bậc là $3 + 1 = 4$; hạng tử $-2xy^2$ có bậc là $1 + 2 = 3$; số $5$ có bậc $0$. Bậc của đa thức là bậc cao nhất của các hạng tử trong dạng thu gọn, tức là $4$.",
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
      "correctAnswer": "B"
    },
    {
      "id": "t8_d1_q3",
      "number": 3,
      "type": "mcq",
      "level": "TH",
      "content": "Kết quả của phép tính $3x^2y + 5x^2y$ là:",
      "hint": "Cộng hai đơn thức đồng dạng: cộng hệ số, giữ nguyên phần biến.",
      "explanation": "Ta cộng các hệ số và giữ nguyên phần biến: $3x^2y + 5x^2y = (3 + 5)x^2y = 8x^2y$.",
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
      "correctAnswer": "B"
    },
    {
      "id": "t8_d1_q4",
      "number": 4,
      "type": "mcq",
      "level": "TH",
      "content": "Kết quả của phép nhân $-2x(x^2 - 3x + 1)$ là:",
      "hint": "Lưu ý quy tắc dấu khi nhân: $(-2x) \\cdot (-3x) = +6x^2$.",
      "explanation": "Áp dụng quy tắc nhân đơn thức với đa thức: $-2x(x^2 - 3x + 1) = (-2x) \\cdot x^2 - (-2x) \\cdot 3x + (-2x) \\cdot 1 = -2x^3 + 6x^2 - 2x$.",
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
      "correctAnswer": "B"
    },
    {
      "id": "t8_d1_q5",
      "number": 5,
      "type": "mcq",
      "level": "TH",
      "content": "Phép nhân hai đa thức $(x - 2)$ và $(x + 2)$ cho kết quả là:",
      "hint": "Áp dụng hằng đẳng thức $(a - b)(a + b) = a^2 - b^2$.",
      "explanation": "Ta nhân đa thức với đa thức hoặc dùng hằng đẳng thức hiệu hai bình phương: $(x - 2)(x + 2) = x^2 + 2x - 2x - 4 = x^2 - 4$.",
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
      "correctAnswer": "B"
    },
    {
      "id": "t8_d1_q6",
      "number": 6,
      "type": "tf",
      "level": "VD",
      "content": "Cho biểu thức $A = 2x(x^2 - y) - 2x^3 + 3xy$.",
      "hint": "Đọc kỹ lý thuyết SGK Kết nối tri thức để tìm hướng giải quyết.",
      "explanation": "",
      "items": [
        {
          "key": "a",
          "text": "Biểu thức $A$ sau khi rút gọn là một đa thức bậc 2.",
          "correctAnswer": "Đ",
          "explanation": "Ta có $A = 2x^3 - 2xy - 2x^3 + 3xy = xy$, có bậc là $1 + 1 = 2$."
        },
        {
          "key": "b",
          "text": "Hệ số của hạng tử chứa $xy$ trong đa thức $A$ thu gọn là $1$.",
          "correctAnswer": "Đ",
          "explanation": "$A = 1xy$, hệ số bằng $1$."
        },
        {
          "key": "c",
          "text": "Giá trị của $A$ tại $x = 2, y = -1$ là $-2$.",
          "correctAnswer": "Đ",
          "explanation": "Thay $x = 2, y = -1 \\Rightarrow A = 2 \\cdot (-1) = -2$."
        },
        {
          "key": "d",
          "text": "Biểu thức $A$ luôn nhận giá trị dương với mọi $x, y > 0$.",
          "correctAnswer": "Đ",
          "explanation": "Khi $x > 0$ và $y > 0$ thì tích $xy > 0$, do đó $A > 0$."
        }
      ],
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem bảng đánh giá chi tiết a, b, c, d"
        }
      ],
      "correctAnswer": "B"
    },
    {
      "id": "t8_d1_q7",
      "number": 7,
      "type": "tf",
      "level": "VD",
      "content": "Xét các đa thức $M = 3x^2 - 2xy + y^2$ và $N = x^2 + 2xy - y^2$.",
      "hint": "Đọc kỹ lý thuyết SGK Kết nối tri thức để tìm hướng giải quyết.",
      "explanation": "",
      "items": [
        {
          "key": "a",
          "text": "Đa thức tổng $M + N = 4x^2$.",
          "correctAnswer": "Đ",
          "explanation": "$M + N = (3x^2 + x^2) + (-2xy + 2xy) + (y^2 - y^2) = 4x^2$."
        },
        {
          "key": "b",
          "text": "Đa thức hiệu $M - N = 2x^2 - 4xy + 2y^2$.",
          "correctAnswer": "Đ",
          "explanation": "$M - N = (3x^2 - x^2) + (-2xy - 2xy) + [y^2 - (-y^2)] = 2x^2 - 4xy + 2y^2$."
        },
        {
          "key": "c",
          "text": "Bậc của đa thức $M + N$ là $4$.",
          "correctAnswer": "S",
          "explanation": "$M + N = 4x^2$, bậc của đa thức này là $2$, không phải $4$."
        },
        {
          "key": "d",
          "text": "Tại $x = 1, y = 1$, giá trị của biểu thức $M - N$ bằng $0$.",
          "correctAnswer": "Đ",
          "explanation": "Thay $x = 1, y = 1 \\Rightarrow 2(1)^2 - 4(1)(1) + 2(1)^2 = 2 - 4 + 2 = 0$."
        }
      ],
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem bảng đánh giá chi tiết a, b, c, d"
        }
      ],
      "correctAnswer": "B"
    },
    {
      "id": "t8_d1_q8",
      "number": 8,
      "type": "tf",
      "level": "VD",
      "content": "Thực hiện phép nhân đa thức $P = (x - y)(x^2 + xy + y^2)$.",
      "hint": "Đọc kỹ lý thuyết SGK Kết nối tri thức để tìm hướng giải quyết.",
      "explanation": "",
      "items": [
        {
          "key": "a",
          "text": "Trong đa thức tích $P$ (sau thu gọn) có chứa hạng tử $x^2y$.",
          "correctAnswer": "S",
          "explanation": "Khai triển $P = x^3 + x^2y + xy^2 - x^2y - xy^2 - y^3 = x^3 - y^3$, các hạng tử chứa $x^2y$ triệt tiêu hết."
        },
        {
          "key": "b",
          "text": "Kết quả thu gọn của phép nhân là đa thức $x^3 - y^3$.",
          "correctAnswer": "Đ",
          "explanation": "Đây chính là hằng đẳng thức hiệu hai lập phương: $(x - y)(x^2 + xy + y^2) = x^3 - y^3$."
        },
        {
          "key": "c",
          "text": "Bậc của đa thức $P$ là $3$.",
          "correctAnswer": "Đ",
          "explanation": "$x^3 - y^3$ có bậc cao nhất là $3$."
        },
        {
          "key": "d",
          "text": "Đa thức $P$ có chứa biến $xy$.",
          "correctAnswer": "S",
          "explanation": "Sau khi thu gọn, $P = x^3 - y^3$ không còn chứa biến $xy$."
        }
      ],
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem bảng đánh giá chi tiết a, b, c, d"
        }
      ],
      "correctAnswer": "B"
    },
    {
      "id": "t8_d1_q9",
      "number": 9,
      "type": "short",
      "level": "VD",
      "content": "Tìm phần hệ số của đơn thức $B = \\left(-\\frac{1}{2}x^2y\\right) \\cdot (4xy^3)$ sau khi thu gọn.",
      "hint": "Nhân hệ số với hệ số: $-\\frac{1}{2} \\cdot 4 = -2$.",
      "explanation": "Ta có: $B = \\left(-\\frac{1}{2} \\cdot 4\\right) \\cdot (x^2 \\cdot x) \\cdot (y \\cdot y^3) = -2x^3y^4$. Vậy phần hệ số là $-2$.",
      "correctAnswers": [
        "-2"
      ],
      "correctAnswer": "-2",
      "options": [
        {
          "key": "Đáp số",
          "text": "-2"
        }
      ]
    },
    {
      "id": "t8_d1_q10",
      "number": 10,
      "type": "short",
      "level": "VD",
      "content": "Tính giá trị của biểu thức $Q = x(x - 1) - y(x - 1)$ tại $x = 10, y = 9$.",
      "hint": "Nhóm nhân tử chung $(x - 1)$ trước khi thay số.",
      "explanation": "Đặt nhân tử chung: $Q = (x - 1)(x - y)$. Thay $x = 10, y = 9$ vào: $Q = (10 - 1)(10 - 9) = 9 \\cdot 1 = 9$.",
      "correctAnswers": [
        "9"
      ],
      "correctAnswer": "9",
      "options": [
        {
          "key": "Đáp số",
          "text": "9"
        }
      ]
    }
  ]
},
{
  "id": "EXAM-K8-DE2",
  "code": "DE-K8-C1-02",
  "title": "Đề số 2: Đơn thức đồng dạng & Các phép toán đa thức",
  "grade": 8,
  "subject": "Toán học 8 (KNTT)",
  "chapter": "Chương I: Đa thức",
  "topic": "Đơn thức đồng dạng & Phép tính",
  "timeMinutes": 45,
  "levelTarget": "standard",
  "description": "Rút gọn biểu thức, tính giá trị và xác định bậc đa thức",
  "createdAt": "2026-09-18T10:00:00.000Z",
  "createdBy": "Tổ Toán THCS (Chương trình mới)",
  "parts": [
    {
      "partId": 1,
      "title": "PHẦN 1: TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (5 câu)",
      "instruction": "Mỗi câu hỏi chỉ chọn một phương án đúng.",
      "questions": [
        {
          "id": "t8_d2_q1",
          "number": 1,
          "type": "mcq",
          "level": "NB",
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
          "explanation": "Hai đơn thức đồng dạng là hai đơn thức có hệ số khác $0$ và có cùng phần biến. Đơn thức $-2x^2y$ có cùng phần biến là $x^2y$.",
          "hint": "Tìm đơn thức có đúng phần biến $x^2y$."
        },
        {
          "id": "t8_d2_q2",
          "number": 2,
          "type": "mcq",
          "level": "NB",
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
          "explanation": "Hạng tử $-2x^2y^3$ có bậc là $2 + 3 = 5$, đây là hạng tử có bậc cao nhất của đa thức $M$. Vậy bậc của $M$ là $5$.",
          "hint": "Tính tổng số mũ của các biến ở từng hạng tử: $2 + 3 = 5$."
        },
        {
          "id": "t8_d2_q3",
          "number": 3,
          "type": "mcq",
          "level": "TH",
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
          "explanation": "Ta có: $3x^2y \\cdot (-2xy) = [3 \\cdot (-2)] \\cdot (x^2 \\cdot x) \\cdot (y \\cdot y) = -6x^3y^2$.",
          "hint": "Nhân hệ số với hệ số, cộng các số mũ của cùng cơ số."
        },
        {
          "id": "t8_d2_q4",
          "number": 4,
          "type": "mcq",
          "level": "TH",
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
          "explanation": "Ta có: $(x - 1)(x + 2) - x^2 = x^2 + 2x - x - 2 - x^2 = x - 2$.",
          "hint": "Khai triển $(x - 1)(x + 2)$ rồi trừ đi $x^2$."
        },
        {
          "id": "t8_d2_q5",
          "number": 5,
          "type": "mcq",
          "level": "TH",
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
          "explanation": "Thay $x = 1, y = -2$ vào đa thức: $1 \\cdot (-2) + 2 \\cdot 1 = -2 + 2 = 0$.",
          "hint": "Thay trực tiếp $x = 1$ và $y = -2$ vào biểu thức."
        }
      ]
    },
    {
      "partId": 2,
      "title": "PHẦN 2: TRẮC NGHIỆM ĐÚNG SAI (3 câu)",
      "instruction": "Trong mỗi ý a), b), c), d) ở mỗi câu, chọn đúng hoặc sai.",
      "questions": [
        {
          "id": "t8_d2_tf1",
          "number": 1,
          "type": "tf",
          "level": "TH",
          "prompt": "Thực hiện phép nhân $K = (x + y)(x - y)$.",
          "items": [
            {
              "label": "a",
              "text": "Đa thức kết quả sau khi thu gọn là $x^2 - y^2$.",
              "correctAnswer": "Đ",
              "explanation": "$(x + y)(x - y) = x^2 - xy + xy - y^2 = x^2 - y^2$."
            },
            {
              "label": "b",
              "text": "Đa thức kết quả có chứa hạng tử $xy$.",
              "correctAnswer": "S",
              "explanation": "Hạng tử $xy$ và $-xy$ triệt tiêu lẫn nhau nên không còn chứa $xy$."
            },
            {
              "label": "c",
              "text": "Bậc của đa thức $K$ là $2$.",
              "correctAnswer": "Đ",
              "explanation": "$x^2 - y^2$ có bậc cao nhất là $2$."
            },
            {
              "label": "d",
              "text": "Tại $x = 2, y = 2$, giá trị của đa thức $K$ bằng $0$.",
              "correctAnswer": "Đ",
              "explanation": "Tại $x = 2, y = 2 \\Rightarrow K = 2^2 - 2^2 = 0$."
            }
          ]
        },
        {
          "id": "t8_d2_tf2",
          "number": 2,
          "type": "tf",
          "level": "VD",
          "prompt": "Cho hai đa thức $A = 2x^2 + 3x - 1$ và $B = 2x^2 - x + 5$.",
          "items": [
            {
              "label": "a",
              "text": "Đa thức hiệu $A - B$ là một đa thức bậc 2.",
              "correctAnswer": "S",
              "explanation": "$A - B = (2x^2 - 2x^2) + [3x - (-x)] + (-1 - 5) = 4x - 6$, đây là đa thức bậc $1$."
            },
            {
              "label": "b",
              "text": "Hệ số của hạng tử bậc cao nhất trong đa thức $A - B$ là $4$.",
              "correctAnswer": "Đ",
              "explanation": "Hạng tử bậc cao nhất là $4x$, có hệ số bằng $4$."
            },
            {
              "label": "c",
              "text": "Đa thức $A - B$ có hạng tử tự do là $-6$.",
              "correctAnswer": "Đ",
              "explanation": "Hạng tử không chứa biến là $-6$."
            },
            {
              "label": "d",
              "text": "Tại $x = 1$, giá trị của biểu thức $A - B$ bằng $-2$.",
              "correctAnswer": "Đ",
              "explanation": "Thay $x = 1 \\Rightarrow 4(1) - 6 = -2$."
            }
          ]
        },
        {
          "id": "t8_d2_tf3",
          "number": 3,
          "type": "tf",
          "level": "TH",
          "prompt": "Cho đơn thức $M = 3x^2y \\cdot (-2xy^2)$.",
          "items": [
            {
              "label": "a",
              "text": "Dạng thu gọn của $M$ là $-6x^3y^3$.",
              "correctAnswer": "Đ",
              "explanation": "$3 \\cdot (-2) = -6$, $x^2 \\cdot x = x^3$, $y \\cdot y^2 = y^3 \\Rightarrow -6x^3y^3$."
            },
            {
              "label": "b",
              "text": "Bậc của đơn thức $M$ là $5$.",
              "correctAnswer": "S",
              "explanation": "Bậc là $3 + 3 = 6$, không phải $5$."
            },
            {
              "label": "c",
              "text": "Phần hệ số của đơn thức $M$ là $-6$.",
              "correctAnswer": "Đ",
              "explanation": "Hệ số chính xác là $-6$."
            },
            {
              "label": "d",
              "text": "Giá trị của $M$ luôn âm với mọi $x > 0, y > 0$.",
              "correctAnswer": "Đ",
              "explanation": "Do $x > 0, y > 0 \\Rightarrow x^3y^3 > 0$, nhân với $-6$ sẽ luôn nhận giá trị âm."
            }
          ]
        }
      ]
    },
    {
      "partId": 3,
      "title": "PHẦN 3: TRẮC NGHIỆM TRẢ LỜI NGẮN (2 câu)",
      "instruction": "Viết kết quả cuối cùng vào ô trống.",
      "questions": [
        {
          "id": "t8_d2_sa1",
          "number": 1,
          "type": "short",
          "level": "VD",
          "content": "Tìm bậc của đa thức thu gọn $P = 5x^4 - 2x^3y + 20xy^3 - 5x^4 + y^2$.",
          "correctAnswers": [
            "4"
          ],
          "explanation": "Thu gọn: $P = (5x^4 - 5x^4) - 2x^3y + 20xy^3 + y^2 = -2x^3y + 20xy^3 + y^2$. Các hạng tử $-2x^3y$ và $20xy^3$ đều có bậc $3 + 1 = 1 + 3 = 4$. Vậy bậc của đa thức là $4$.",
          "hint": "Thu gọn hạng tử đồng dạng $5x^4 - 5x^4 = 0$ trước khi xác định bậc."
        },
        {
          "id": "t8_d2_sa2",
          "number": 2,
          "type": "short",
          "level": "VD",
          "content": "Tính giá trị của biểu thức $H = (x + 1)(x^2 - x + 1)$ tại $x = 2$.",
          "correctAnswers": [
            "9"
          ],
          "explanation": "Áp dụng hằng đẳng thức tổng hai lập phương: $H = x^3 + 1$. Thay $x = 2$ vào: $H = 2^3 + 1 = 8 + 1 = 9$.",
          "hint": "Nhận biết hằng đẳng thức $(a + b)(a^2 - ab + b^2) = a^3 + b^3$."
        }
      ]
    }
  ],
  "questions": [
    {
      "id": "t8_d2_q1",
      "number": 1,
      "type": "mcq",
      "level": "NB",
      "content": "Trong các đơn thức sau, đơn thức nào đồng dạng với $5x^2y$?",
      "hint": "Tìm đơn thức có đúng phần biến $x^2y$.",
      "explanation": "Hai đơn thức đồng dạng là hai đơn thức có hệ số khác $0$ và có cùng phần biến. Đơn thức $-2x^2y$ có cùng phần biến là $x^2y$.",
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
      "correctAnswer": "B"
    },
    {
      "id": "t8_d2_q2",
      "number": 2,
      "type": "mcq",
      "level": "NB",
      "content": "Bậc của đa thức $M = x^4 - 2x^2y^3 + 3x - 5$ là:",
      "hint": "Tính tổng số mũ của các biến ở từng hạng tử: $2 + 3 = 5$.",
      "explanation": "Hạng tử $-2x^2y^3$ có bậc là $2 + 3 = 5$, đây là hạng tử có bậc cao nhất của đa thức $M$. Vậy bậc của $M$ là $5$.",
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
      "correctAnswer": "B"
    },
    {
      "id": "t8_d2_q3",
      "number": 3,
      "type": "mcq",
      "level": "TH",
      "content": "Kết quả của phép tính $3x^2y \\cdot (-2xy)$ là:",
      "hint": "Nhân hệ số với hệ số, cộng các số mũ của cùng cơ số.",
      "explanation": "Ta có: $3x^2y \\cdot (-2xy) = [3 \\cdot (-2)] \\cdot (x^2 \\cdot x) \\cdot (y \\cdot y) = -6x^3y^2$.",
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
      "correctAnswer": "A"
    },
    {
      "id": "t8_d2_q4",
      "number": 4,
      "type": "mcq",
      "level": "TH",
      "content": "Kết quả rút gọn của biểu thức $(x - 1)(x + 2) - x^2$ là:",
      "hint": "Khai triển $(x - 1)(x + 2)$ rồi trừ đi $x^2$.",
      "explanation": "Ta có: $(x - 1)(x + 2) - x^2 = x^2 + 2x - x - 2 - x^2 = x - 2$.",
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
      "correctAnswer": "A"
    },
    {
      "id": "t8_d2_q5",
      "number": 5,
      "type": "mcq",
      "level": "TH",
      "content": "Giá trị của đa thức $xy + 2x$ tại $x = 1, y = -2$ là:",
      "hint": "Thay trực tiếp $x = 1$ và $y = -2$ vào biểu thức.",
      "explanation": "Thay $x = 1, y = -2$ vào đa thức: $1 \\cdot (-2) + 2 \\cdot 1 = -2 + 2 = 0$.",
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
      "correctAnswer": "A"
    },
    {
      "id": "t8_d2_q6",
      "number": 6,
      "type": "tf",
      "level": "TH",
      "content": "Thực hiện phép nhân $K = (x + y)(x - y)$.",
      "hint": "Đọc kỹ lý thuyết SGK Kết nối tri thức để tìm hướng giải quyết.",
      "explanation": "",
      "items": [
        {
          "key": "a",
          "text": "Đa thức kết quả sau khi thu gọn là $x^2 - y^2$.",
          "correctAnswer": "Đ",
          "explanation": "$(x + y)(x - y) = x^2 - xy + xy - y^2 = x^2 - y^2$."
        },
        {
          "key": "b",
          "text": "Đa thức kết quả có chứa hạng tử $xy$.",
          "correctAnswer": "S",
          "explanation": "Hạng tử $xy$ và $-xy$ triệt tiêu lẫn nhau nên không còn chứa $xy$."
        },
        {
          "key": "c",
          "text": "Bậc của đa thức $K$ là $2$.",
          "correctAnswer": "Đ",
          "explanation": "$x^2 - y^2$ có bậc cao nhất là $2$."
        },
        {
          "key": "d",
          "text": "Tại $x = 2, y = 2$, giá trị của đa thức $K$ bằng $0$.",
          "correctAnswer": "Đ",
          "explanation": "Tại $x = 2, y = 2 \\Rightarrow K = 2^2 - 2^2 = 0$."
        }
      ],
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem bảng đánh giá chi tiết a, b, c, d"
        }
      ],
      "correctAnswer": "B"
    },
    {
      "id": "t8_d2_q7",
      "number": 7,
      "type": "tf",
      "level": "VD",
      "content": "Cho hai đa thức $A = 2x^2 + 3x - 1$ và $B = 2x^2 - x + 5$.",
      "hint": "Đọc kỹ lý thuyết SGK Kết nối tri thức để tìm hướng giải quyết.",
      "explanation": "",
      "items": [
        {
          "key": "a",
          "text": "Đa thức hiệu $A - B$ là một đa thức bậc 2.",
          "correctAnswer": "S",
          "explanation": "$A - B = (2x^2 - 2x^2) + [3x - (-x)] + (-1 - 5) = 4x - 6$, đây là đa thức bậc $1$."
        },
        {
          "key": "b",
          "text": "Hệ số của hạng tử bậc cao nhất trong đa thức $A - B$ là $4$.",
          "correctAnswer": "Đ",
          "explanation": "Hạng tử bậc cao nhất là $4x$, có hệ số bằng $4$."
        },
        {
          "key": "c",
          "text": "Đa thức $A - B$ có hạng tử tự do là $-6$.",
          "correctAnswer": "Đ",
          "explanation": "Hạng tử không chứa biến là $-6$."
        },
        {
          "key": "d",
          "text": "Tại $x = 1$, giá trị của biểu thức $A - B$ bằng $-2$.",
          "correctAnswer": "Đ",
          "explanation": "Thay $x = 1 \\Rightarrow 4(1) - 6 = -2$."
        }
      ],
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem bảng đánh giá chi tiết a, b, c, d"
        }
      ],
      "correctAnswer": "B"
    },
    {
      "id": "t8_d2_q8",
      "number": 8,
      "type": "tf",
      "level": "TH",
      "content": "Cho đơn thức $M = 3x^2y \\cdot (-2xy^2)$.",
      "hint": "Đọc kỹ lý thuyết SGK Kết nối tri thức để tìm hướng giải quyết.",
      "explanation": "",
      "items": [
        {
          "key": "a",
          "text": "Dạng thu gọn của $M$ là $-6x^3y^3$.",
          "correctAnswer": "Đ",
          "explanation": "$3 \\cdot (-2) = -6$, $x^2 \\cdot x = x^3$, $y \\cdot y^2 = y^3 \\Rightarrow -6x^3y^3$."
        },
        {
          "key": "b",
          "text": "Bậc của đơn thức $M$ là $5$.",
          "correctAnswer": "S",
          "explanation": "Bậc là $3 + 3 = 6$, không phải $5$."
        },
        {
          "key": "c",
          "text": "Phần hệ số của đơn thức $M$ là $-6$.",
          "correctAnswer": "Đ",
          "explanation": "Hệ số chính xác là $-6$."
        },
        {
          "key": "d",
          "text": "Giá trị của $M$ luôn âm với mọi $x > 0, y > 0$.",
          "correctAnswer": "Đ",
          "explanation": "Do $x > 0, y > 0 \\Rightarrow x^3y^3 > 0$, nhân với $-6$ sẽ luôn nhận giá trị âm."
        }
      ],
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem bảng đánh giá chi tiết a, b, c, d"
        }
      ],
      "correctAnswer": "B"
    },
    {
      "id": "t8_d2_q9",
      "number": 9,
      "type": "short",
      "level": "VD",
      "content": "Tìm bậc của đa thức thu gọn $P = 5x^4 - 2x^3y + 20xy^3 - 5x^4 + y^2$.",
      "hint": "Thu gọn hạng tử đồng dạng $5x^4 - 5x^4 = 0$ trước khi xác định bậc.",
      "explanation": "Thu gọn: $P = (5x^4 - 5x^4) - 2x^3y + 20xy^3 + y^2 = -2x^3y + 20xy^3 + y^2$. Các hạng tử $-2x^3y$ và $20xy^3$ đều có bậc $3 + 1 = 1 + 3 = 4$. Vậy bậc của đa thức là $4$.",
      "correctAnswers": [
        "4"
      ],
      "correctAnswer": "4",
      "options": [
        {
          "key": "Đáp số",
          "text": "4"
        }
      ]
    },
    {
      "id": "t8_d2_q10",
      "number": 10,
      "type": "short",
      "level": "VD",
      "content": "Tính giá trị của biểu thức $H = (x + 1)(x^2 - x + 1)$ tại $x = 2$.",
      "hint": "Nhận biết hằng đẳng thức $(a + b)(a^2 - ab + b^2) = a^3 + b^3$.",
      "explanation": "Áp dụng hằng đẳng thức tổng hai lập phương: $H = x^3 + 1$. Thay $x = 2$ vào: $H = 2^3 + 1 = 8 + 1 = 9$.",
      "correctAnswers": [
        "9"
      ],
      "correctAnswer": "9",
      "options": [
        {
          "key": "Đáp số",
          "text": "9"
        }
      ]
    }
  ]
},
{
  "id": "EXAM-K8-DE3",
  "code": "DE-K8-C1-03",
  "title": "Đề số 3: Thu gọn đa thức & Nhân đa thức",
  "grade": 8,
  "subject": "Toán học 8 (KNTT)",
  "chapter": "Chương I: Đa thức",
  "topic": "Thu gọn & Nhân đa thức",
  "timeMinutes": 45,
  "levelTarget": "standard",
  "description": "Rèn luyện kĩ năng nhân đơn thức với đa thức, đa thức với đa thức",
  "createdAt": "2026-09-18T10:00:00.000Z",
  "createdBy": "Tổ Toán THCS (Chương trình mới)",
  "parts": [
    {
      "partId": 1,
      "title": "PHẦN 1: TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (5 câu)",
      "instruction": "Mỗi câu hỏi chỉ chọn một phương án đúng.",
      "questions": [
        {
          "id": "t8_d3_q1",
          "number": 1,
          "type": "mcq",
          "level": "NB",
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
          "explanation": "Biểu thức $\\frac{1}{x} + y$ có chứa biến $x$ ở dưới mẫu thức nên không phải là đa thức.",
          "hint": "Đa thức không được chứa biến ở mẫu số của phân thức."
        },
        {
          "id": "t8_d3_q2",
          "number": 2,
          "type": "mcq",
          "level": "NB",
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
          "explanation": "$(x^2 + 2y) + (x^2 - 2y) = (x^2 + x^2) + (2y - 2y) = 2x^2$.",
          "hint": "Cộng các hạng tử đồng dạng: $2y + (-2y) = 0$."
        },
        {
          "id": "t8_d3_q3",
          "number": 3,
          "type": "mcq",
          "level": "TH",
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
          "explanation": "Ta có: $\\left(-\\frac{1}{2}x^2y\\right)^2 = \\left(-\\frac{1}{2}\\right)^2 \\cdot (x^2)^2 \\cdot y^2 = \\frac{1}{4}x^4y^2$. Hệ số là $\\frac{1}{4}$.",
          "hint": "Bình phương một số âm là một số dương: $(-\\frac{1}{2})^2 = \\frac{1}{4}$."
        },
        {
          "id": "t8_d3_q4",
          "number": 4,
          "type": "mcq",
          "level": "TH",
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
          "explanation": "$(x - y)(x - y) = (x - y)^2 = x^2 - 2xy + y^2$.",
          "hint": "Đây là hằng đẳng thức bình phương của một hiệu: $(a - b)^2 = a^2 - 2ab + b^2$."
        },
        {
          "id": "t8_d3_q5",
          "number": 5,
          "type": "mcq",
          "level": "TH",
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
          "explanation": "Nhóm các đơn thức đồng dạng: $(5 + 2 - 7)x^3y - 4xy^2 = 0x^3y - 4xy^2 = -4xy^2$.",
          "hint": "Tính hệ số của $x^3y$: $5 + 2 - 7 = 0$."
        }
      ]
    },
    {
      "partId": 2,
      "title": "PHẦN 2: TRẮC NGHIỆM ĐÚNG SAI (3 câu)",
      "instruction": "Trong mỗi ý a), b), c), d) ở mỗi câu, chọn đúng hoặc sai.",
      "questions": [
        {
          "id": "t8_d3_tf1",
          "number": 1,
          "type": "tf",
          "level": "VD",
          "prompt": "Cho biểu thức $P = x^2(x - y) + y(x^2 - y)$.",
          "items": [
            {
              "label": "a",
              "text": "Đa thức $P$ sau khi thu gọn có $3$ hạng tử.",
              "correctAnswer": "S",
              "explanation": "Khai triển: $P = x^3 - x^2y + x^2y - y^2 = x^3 - y^2$, chỉ có $2$ hạng tử."
            },
            {
              "label": "b",
              "text": "Bậc của đa thức $P$ thu gọn là $3$.",
              "correctAnswer": "Đ",
              "explanation": "Hạng tử $x^3$ có bậc là $3$, cao nhất."
            },
            {
              "label": "c",
              "text": "Hệ số của phần biến $y^2$ trong $P$ là $-1$.",
              "correctAnswer": "Đ",
              "explanation": "Hạng tử là $-y^2 = (-1)y^2$ nên hệ số bằng $-1$."
            },
            {
              "label": "d",
              "text": "Tại $x = 1, y = -1$, giá trị của biểu thức $P$ bằng $0$.",
              "correctAnswer": "Đ",
              "explanation": "Thay $x = 1, y = -1 \\Rightarrow P = 1^3 - (-1)^2 = 1 - 1 = 0$."
            }
          ]
        },
        {
          "id": "t8_d3_tf2",
          "number": 2,
          "type": "tf",
          "level": "TH",
          "prompt": "Xét đơn thức $A = \\left(-\\frac{1}{3}x^2y^3\\right) \\cdot (-6x^3y)$.",
          "items": [
            {
              "label": "a",
              "text": "Hệ số của đơn thức $A$ sau thu gọn là $2$.",
              "correctAnswer": "Đ",
              "explanation": "Hệ số: $(-\\frac{1}{3}) \\cdot (-6) = 2$."
            },
            {
              "label": "b",
              "text": "Bậc của đơn thức $A$ là $9$.",
              "correctAnswer": "Đ",
              "explanation": "$A = 2x^5y^4$, bậc là $5 + 4 = 9$."
            },
            {
              "label": "c",
              "text": "Phần biến của đơn thức $A$ là $x^5y^4$.",
              "correctAnswer": "Đ",
              "explanation": "$x^2 \\cdot x^3 = x^5$, $y^3 \\cdot y = y^4 \\Rightarrow x^5y^4$."
            },
            {
              "label": "d",
              "text": "Mọi đơn thức đồng dạng với $A$ đều có phần biến là $x^6y^3$.",
              "correctAnswer": "S",
              "explanation": "Đơn thức đồng dạng với $A$ phải có cùng phần biến là $x^5y^4$."
            }
          ]
        },
        {
          "id": "t8_d3_tf3",
          "number": 3,
          "type": "tf",
          "level": "VD",
          "prompt": "Cho biểu thức $Q = (2x - 1)(3x + 2)$.",
          "items": [
            {
              "label": "a",
              "text": "Hệ số của hạng tử chứa $x^2$ trong đa thức kết quả là $6$.",
              "correctAnswer": "Đ",
              "explanation": "$2x \\cdot 3x = 6x^2$."
            },
            {
              "label": "b",
              "text": "Hệ số của hạng tử chứa $x$ trong đa thức kết quả là $-1$.",
              "correctAnswer": "S",
              "explanation": "Khai triển: $4x - 3x = 1x$, hệ số của $x$ là $1$, không phải $-1$."
            },
            {
              "label": "c",
              "text": "Hạng tử tự do của đa thức kết quả là $-2$.",
              "correctAnswer": "Đ",
              "explanation": "$(-1) \\cdot 2 = -2$."
            },
            {
              "label": "d",
              "text": "Tổng các hệ số của đa thức $Q$ (sau khi khai triển và thu gọn) là $7$.",
              "correctAnswer": "S",
              "explanation": "$Q = 6x^2 + x - 2$, tổng hệ số là $6 + 1 - 2 = 5$."
            }
          ]
        }
      ]
    },
    {
      "partId": 3,
      "title": "PHẦN 3: TRẮC NGHIỆM TRẢ LỜI NGẮN (2 câu)",
      "instruction": "Viết kết quả cuối cùng vào ô trống.",
      "questions": [
        {
          "id": "t8_d3_sa1",
          "number": 1,
          "type": "short",
          "level": "VDC",
          "content": "Tìm hệ số của phần biến $x^2y^2$ trong đa thức kết quả của phép nhân $(x - y)(x + y)(x^2 + y^2)$.",
          "correctAnswers": [
            "0"
          ],
          "explanation": "Ta có: $(x - y)(x + y)(x^2 + y^2) = (x^2 - y^2)(x^2 + y^2) = x^4 - y^4$. Đa thức kết quả không có hạng tử chứa $x^2y^2$, nên hệ số của nó bằng $0$.",
          "hint": "Áp dụng liên tiếp hai lần hằng đẳng thức hiệu hai bình phương."
        },
        {
          "id": "t8_d3_sa2",
          "number": 2,
          "type": "short",
          "level": "VD",
          "content": "Tính giá trị biểu thức $K = (x - 2)(x + 2) - (x - 3)(x + 3)$ tại $x = 2026$.",
          "correctAnswers": [
            "5"
          ],
          "explanation": "Khai triển: $K = (x^2 - 4) - (x^2 - 9) = x^2 - 4 - x^2 + 9 = 5$. Kết quả không phụ thuộc vào $x$, nên tại $x = 2026$ giá trị vẫn bằng $5$.",
          "hint": "Rút gọn biểu thức trước, nhận xét xem kết quả có phụ thuộc vào biến $x$ không."
        }
      ]
    }
  ],
  "questions": [
    {
      "id": "t8_d3_q1",
      "number": 1,
      "type": "mcq",
      "level": "NB",
      "content": "Biểu thức nào sau đây KHÔNG phải là đa thức?",
      "hint": "Đa thức không được chứa biến ở mẫu số của phân thức.",
      "explanation": "Biểu thức $\\frac{1}{x} + y$ có chứa biến $x$ ở dưới mẫu thức nên không phải là đa thức.",
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
      "correctAnswer": "B"
    },
    {
      "id": "t8_d3_q2",
      "number": 2,
      "type": "mcq",
      "level": "NB",
      "content": "Tổng của hai đa thức $x^2 + 2y$ và $x^2 - 2y$ là:",
      "hint": "Cộng các hạng tử đồng dạng: $2y + (-2y) = 0$.",
      "explanation": "$(x^2 + 2y) + (x^2 - 2y) = (x^2 + x^2) + (2y - 2y) = 2x^2$.",
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
      "correctAnswer": "B"
    },
    {
      "id": "t8_d3_q3",
      "number": 3,
      "type": "mcq",
      "level": "TH",
      "content": "Hệ số của đơn thức $\\left(-\\frac{1}{2}x^2y\\right)^2$ sau khi thu gọn là:",
      "hint": "Bình phương một số âm là một số dương: $(-\\frac{1}{2})^2 = \\frac{1}{4}$.",
      "explanation": "Ta có: $\\left(-\\frac{1}{2}x^2y\\right)^2 = \\left(-\\frac{1}{2}\\right)^2 \\cdot (x^2)^2 \\cdot y^2 = \\frac{1}{4}x^4y^2$. Hệ số là $\\frac{1}{4}$.",
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
      "correctAnswer": "B"
    },
    {
      "id": "t8_d3_q4",
      "number": 4,
      "type": "mcq",
      "level": "TH",
      "content": "Phép nhân hai đa thức $(x - y)(x - y)$ có kết quả thu gọn là:",
      "hint": "Đây là hằng đẳng thức bình phương của một hiệu: $(a - b)^2 = a^2 - 2ab + b^2$.",
      "explanation": "$(x - y)(x - y) = (x - y)^2 = x^2 - 2xy + y^2$.",
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
      "correctAnswer": "B"
    },
    {
      "id": "t8_d3_q5",
      "number": 5,
      "type": "mcq",
      "level": "TH",
      "content": "Đa thức $P = 5x^3y - 4xy^2 + 2x^3y - 7x^3y$ sau khi thu gọn là:",
      "hint": "Tính hệ số của $x^3y$: $5 + 2 - 7 = 0$.",
      "explanation": "Nhóm các đơn thức đồng dạng: $(5 + 2 - 7)x^3y - 4xy^2 = 0x^3y - 4xy^2 = -4xy^2$.",
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
      "correctAnswer": "A"
    },
    {
      "id": "t8_d3_q6",
      "number": 6,
      "type": "tf",
      "level": "VD",
      "content": "Cho biểu thức $P = x^2(x - y) + y(x^2 - y)$.",
      "hint": "Đọc kỹ lý thuyết SGK Kết nối tri thức để tìm hướng giải quyết.",
      "explanation": "",
      "items": [
        {
          "key": "a",
          "text": "Đa thức $P$ sau khi thu gọn có $3$ hạng tử.",
          "correctAnswer": "S",
          "explanation": "Khai triển: $P = x^3 - x^2y + x^2y - y^2 = x^3 - y^2$, chỉ có $2$ hạng tử."
        },
        {
          "key": "b",
          "text": "Bậc của đa thức $P$ thu gọn là $3$.",
          "correctAnswer": "Đ",
          "explanation": "Hạng tử $x^3$ có bậc là $3$, cao nhất."
        },
        {
          "key": "c",
          "text": "Hệ số của phần biến $y^2$ trong $P$ là $-1$.",
          "correctAnswer": "Đ",
          "explanation": "Hạng tử là $-y^2 = (-1)y^2$ nên hệ số bằng $-1$."
        },
        {
          "key": "d",
          "text": "Tại $x = 1, y = -1$, giá trị của biểu thức $P$ bằng $0$.",
          "correctAnswer": "Đ",
          "explanation": "Thay $x = 1, y = -1 \\Rightarrow P = 1^3 - (-1)^2 = 1 - 1 = 0$."
        }
      ],
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem bảng đánh giá chi tiết a, b, c, d"
        }
      ],
      "correctAnswer": "B"
    },
    {
      "id": "t8_d3_q7",
      "number": 7,
      "type": "tf",
      "level": "TH",
      "content": "Xét đơn thức $A = \\left(-\\frac{1}{3}x^2y^3\\right) \\cdot (-6x^3y)$.",
      "hint": "Đọc kỹ lý thuyết SGK Kết nối tri thức để tìm hướng giải quyết.",
      "explanation": "",
      "items": [
        {
          "key": "a",
          "text": "Hệ số của đơn thức $A$ sau thu gọn là $2$.",
          "correctAnswer": "Đ",
          "explanation": "Hệ số: $(-\\frac{1}{3}) \\cdot (-6) = 2$."
        },
        {
          "key": "b",
          "text": "Bậc của đơn thức $A$ là $9$.",
          "correctAnswer": "Đ",
          "explanation": "$A = 2x^5y^4$, bậc là $5 + 4 = 9$."
        },
        {
          "key": "c",
          "text": "Phần biến của đơn thức $A$ là $x^5y^4$.",
          "correctAnswer": "Đ",
          "explanation": "$x^2 \\cdot x^3 = x^5$, $y^3 \\cdot y = y^4 \\Rightarrow x^5y^4$."
        },
        {
          "key": "d",
          "text": "Mọi đơn thức đồng dạng với $A$ đều có phần biến là $x^6y^3$.",
          "correctAnswer": "S",
          "explanation": "Đơn thức đồng dạng với $A$ phải có cùng phần biến là $x^5y^4$."
        }
      ],
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem bảng đánh giá chi tiết a, b, c, d"
        }
      ],
      "correctAnswer": "B"
    },
    {
      "id": "t8_d3_q8",
      "number": 8,
      "type": "tf",
      "level": "VD",
      "content": "Cho biểu thức $Q = (2x - 1)(3x + 2)$.",
      "hint": "Đọc kỹ lý thuyết SGK Kết nối tri thức để tìm hướng giải quyết.",
      "explanation": "",
      "items": [
        {
          "key": "a",
          "text": "Hệ số của hạng tử chứa $x^2$ trong đa thức kết quả là $6$.",
          "correctAnswer": "Đ",
          "explanation": "$2x \\cdot 3x = 6x^2$."
        },
        {
          "key": "b",
          "text": "Hệ số của hạng tử chứa $x$ trong đa thức kết quả là $-1$.",
          "correctAnswer": "S",
          "explanation": "Khai triển: $4x - 3x = 1x$, hệ số của $x$ là $1$, không phải $-1$."
        },
        {
          "key": "c",
          "text": "Hạng tử tự do của đa thức kết quả là $-2$.",
          "correctAnswer": "Đ",
          "explanation": "$(-1) \\cdot 2 = -2$."
        },
        {
          "key": "d",
          "text": "Tổng các hệ số của đa thức $Q$ (sau khi khai triển và thu gọn) là $7$.",
          "correctAnswer": "S",
          "explanation": "$Q = 6x^2 + x - 2$, tổng hệ số là $6 + 1 - 2 = 5$."
        }
      ],
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem bảng đánh giá chi tiết a, b, c, d"
        }
      ],
      "correctAnswer": "B"
    },
    {
      "id": "t8_d3_q9",
      "number": 9,
      "type": "short",
      "level": "VDC",
      "content": "Tìm hệ số của phần biến $x^2y^2$ trong đa thức kết quả của phép nhân $(x - y)(x + y)(x^2 + y^2)$.",
      "hint": "Áp dụng liên tiếp hai lần hằng đẳng thức hiệu hai bình phương.",
      "explanation": "Ta có: $(x - y)(x + y)(x^2 + y^2) = (x^2 - y^2)(x^2 + y^2) = x^4 - y^4$. Đa thức kết quả không có hạng tử chứa $x^2y^2$, nên hệ số của nó bằng $0$.",
      "correctAnswers": [
        "0"
      ],
      "correctAnswer": "0",
      "options": [
        {
          "key": "Đáp số",
          "text": "0"
        }
      ]
    },
    {
      "id": "t8_d3_q10",
      "number": 10,
      "type": "short",
      "level": "VD",
      "content": "Tính giá trị biểu thức $K = (x - 2)(x + 2) - (x - 3)(x + 3)$ tại $x = 2026$.",
      "hint": "Rút gọn biểu thức trước, nhận xét xem kết quả có phụ thuộc vào biến $x$ không.",
      "explanation": "Khai triển: $K = (x^2 - 4) - (x^2 - 9) = x^2 - 4 - x^2 + 9 = 5$. Kết quả không phụ thuộc vào $x$, nên tại $x = 2026$ giá trị vẫn bằng $5$.",
      "correctAnswers": [
        "5"
      ],
      "correctAnswer": "5",
      "options": [
        {
          "key": "Đáp số",
          "text": "5"
        }
      ]
    }
  ]
},
{
  "id": "EXAM-K8-DE4",
  "code": "DE-K8-C1-04",
  "title": "Đề số 4: Phép trừ đa thức & Giá trị biểu thức",
  "grade": 8,
  "subject": "Toán học 8 (KNTT)",
  "chapter": "Chương I: Đa thức",
  "topic": "Phép trừ đa thức",
  "timeMinutes": 45,
  "levelTarget": "standard",
  "description": "Rèn luyện quy tắc đổi dấu khi bỏ ngoặc và tính giá trị biểu thức đa thức",
  "createdAt": "2026-09-18T10:00:00.000Z",
  "createdBy": "Tổ Toán THCS (Chương trình mới)",
  "parts": [
    {
      "partId": 1,
      "title": "PHẦN 1: TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (5 câu)",
      "instruction": "Mỗi câu hỏi chỉ chọn một phương án đúng.",
      "questions": [
        {
          "id": "t8_d4_q1",
          "number": 1,
          "type": "mcq",
          "level": "NB",
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
          "explanation": "Đơn thức $A$ có phần hệ số là $3$ và phần biến là $x^2y^3z$.",
          "hint": "Phần biến gồm tất cả các chữ cái cùng số mũ của chúng."
        },
        {
          "id": "t8_d4_q2",
          "number": 2,
          "type": "mcq",
          "level": "TH",
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
          "explanation": "Bỏ dấu ngoặc có dấu '-' đằng trước: $2x^2 - xy - x^2 + 2xy = (2x^2 - x^2) + (-xy + 2xy) = x^2 + xy$.",
          "hint": "Chú ý đổi dấu: $-(-2xy) = +2xy$."
        },
        {
          "id": "t8_d4_q3",
          "number": 3,
          "type": "mcq",
          "level": "TH",
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
          "explanation": "Nhân $x^2$ với từng hạng tử: $x^2 \\cdot 2x - x^2 \\cdot 3y = 2x^3 - 3x^2y$.",
          "hint": "Lấy $x^2$ nhân với $2x$ và $x^2$ nhân với $-3y$."
        },
        {
          "id": "t8_d4_q4",
          "number": 4,
          "type": "mcq",
          "level": "NB",
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
          "explanation": "Theo quy ước trong SGK Toán 8, số $0$ được gọi là đa thức không và không có bậc.",
          "hint": "Số $0$ là một trường hợp đặc biệt không được gán bậc."
        },
        {
          "id": "t8_d4_q5",
          "number": 5,
          "type": "mcq",
          "level": "TH",
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
          "explanation": "Cách 1: Thay trực tiếp $x = 2 \\Rightarrow 2^2 - 4(2) + 4 = 4 - 8 + 4 = 0$. Cách 2: $(x - 2)^2 = (2 - 2)^2 = 0$.",
          "hint": "Nhận dạng hằng đẳng thức $(x - 2)^2$."
        }
      ]
    },
    {
      "partId": 2,
      "title": "PHẦN 2: TRẮC NGHIỆM ĐÚNG SAI (3 câu)",
      "instruction": "Trong mỗi ý a), b), c), d) ở mỗi câu, chọn đúng hoặc sai.",
      "questions": [
        {
          "id": "t8_d4_tf1",
          "number": 1,
          "type": "tf",
          "level": "VD",
          "prompt": "Rút gọn biểu thức $E = (x + y)(x + y) - 2xy$.",
          "items": [
            {
              "label": "a",
              "text": "Đa thức $E$ sau khi thu gọn là $x^2 + y^2$.",
              "correctAnswer": "Đ",
              "explanation": "$E = (x + y)^2 - 2xy = x^2 + 2xy + y^2 - 2xy = x^2 + y^2$."
            },
            {
              "label": "b",
              "text": "Đa thức $E$ có bậc là $4$.",
              "correctAnswer": "S",
              "explanation": "$x^2 + y^2$ có bậc cao nhất là $2$, không phải $4$."
            },
            {
              "label": "c",
              "text": "Đa thức $E$ luôn nhận giá trị không âm với mọi $x, y$.",
              "correctAnswer": "Đ",
              "explanation": "Vì $x^2 \\ge 0$ và $y^2 \\ge 0$ với mọi $x, y$ nên $x^2 + y^2 \\ge 0$."
            },
            {
              "label": "d",
              "text": "Tại $x = 3, y = -4$, giá trị của $E$ là $25$.",
              "correctAnswer": "Đ",
              "explanation": "Thay số: $3^2 + (-4)^2 = 9 + 16 = 25$."
            }
          ]
        },
        {
          "id": "t8_d4_tf2",
          "number": 2,
          "type": "tf",
          "level": "TH",
          "prompt": "Cho hai đa thức $A = 5x^2y - 4xy^2$ và $B = -5x^2y + 4xy^2$.",
          "items": [
            {
              "label": "a",
              "text": "Hai đa thức $A$ và $B$ là hai đa thức đối nhau.",
              "correctAnswer": "Đ",
              "explanation": "$B = -(5x^2y - 4xy^2) = -A$, vậy $A$ và $B$ là hai đa thức đối nhau."
            },
            {
              "label": "b",
              "text": "Đa thức tổng $A + B = 0$.",
              "correctAnswer": "Đ",
              "explanation": "Tổng của hai đa thức đối nhau luôn bằng $0$."
            },
            {
              "label": "c",
              "text": "Đa thức hiệu $A - B = 0$.",
              "correctAnswer": "S",
              "explanation": "$A - B = A - (-A) = 2A = 10x^2y - 8xy^2 \\ne 0$."
            },
            {
              "label": "d",
              "text": "Bậc của đa thức hiệu $A - B$ là $3$.",
              "correctAnswer": "Đ",
              "explanation": "$10x^2y - 8xy^2$ có các hạng tử bậc $2 + 1 = 1 + 2 = 3$."
            }
          ]
        },
        {
          "id": "t8_d4_tf3",
          "number": 3,
          "type": "tf",
          "level": "TH",
          "prompt": "Xét đơn thức $F = -5x^3y^2z$.",
          "items": [
            {
              "label": "a",
              "text": "Đơn thức $F$ có $3$ biến.",
              "correctAnswer": "Đ",
              "explanation": "Có 3 biến là $x, y, z$."
            },
            {
              "label": "b",
              "text": "Bậc của đơn thức $F$ là $6$.",
              "correctAnswer": "Đ",
              "explanation": "Bậc là tổng các số mũ: $3 + 2 + 1 = 6$."
            },
            {
              "label": "c",
              "text": "Giá trị của $F$ tại $x = 1, y = 1, z = -1$ là $5$.",
              "correctAnswer": "Đ",
              "explanation": "$-5 \\cdot 1^3 \\cdot 1^2 \\cdot (-1) = 5$."
            },
            {
              "label": "d",
              "text": "Bình phương của đơn thức $F$ có phần hệ số là $-25$.",
              "correctAnswer": "S",
              "explanation": "$F^2 = [(-5)x^3y^2z]^2 = 25x^6y^4z^2$, hệ số là $25$, không phải $-25$."
            }
          ]
        }
      ]
    },
    {
      "partId": 3,
      "title": "PHẦN 3: TRẮC NGHIỆM TRẢ LỜI NGẮN (2 câu)",
      "instruction": "Viết kết quả cuối cùng vào ô trống.",
      "questions": [
        {
          "id": "t8_d4_sa1",
          "number": 1,
          "type": "short",
          "level": "VD",
          "content": "Tìm bậc của đa thức $M = x^3y^2 + xy^4 - x^5 + 5$.",
          "correctAnswers": [
            "5"
          ],
          "explanation": "Các hạng tử $x^3y^2$ có bậc $3+2=5$; $xy^4$ có bậc $1+4=5$; $-x^5$ có bậc $5$; số $5$ có bậc $0$. Bậc cao nhất là $5$.",
          "hint": "Xem bậc lớn nhất của các hạng tử trong đa thức."
        },
        {
          "id": "t8_d4_sa2",
          "number": 2,
          "type": "short",
          "level": "VD",
          "content": "Tính giá trị của biểu thức $N = \\frac{1}{2}xy \\cdot (-4x^2y)$ tại $x = -1, y = 2$.",
          "correctAnswers": [
            "8"
          ],
          "explanation": "Thu gọn: $N = [\\frac{1}{2} \\cdot (-4)] \\cdot (x \\cdot x^2) \\cdot (y \\cdot y) = -2x^3y^2$. Thay $x = -1, y = 2 \\Rightarrow N = -2(-1)^3(2)^2 = -2(-1)(4) = 8$.",
          "hint": "Thu gọn đơn thức về dạng $-2x^3y^2$ trước khi thay số."
        }
      ]
    }
  ],
  "questions": [
    {
      "id": "t8_d4_q1",
      "number": 1,
      "type": "mcq",
      "level": "NB",
      "content": "Đơn thức $A = 3x^2y^3z$. Phần biến của đơn thức này là:",
      "hint": "Phần biến gồm tất cả các chữ cái cùng số mũ của chúng.",
      "explanation": "Đơn thức $A$ có phần hệ số là $3$ và phần biến là $x^2y^3z$.",
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
      "correctAnswer": "B"
    },
    {
      "id": "t8_d4_q2",
      "number": 2,
      "type": "mcq",
      "level": "TH",
      "content": "Kết quả của phép trừ đa thức $(2x^2 - xy) - (x^2 - 2xy)$ là:",
      "hint": "Chú ý đổi dấu: $-(-2xy) = +2xy$.",
      "explanation": "Bỏ dấu ngoặc có dấu '-' đằng trước: $2x^2 - xy - x^2 + 2xy = (2x^2 - x^2) + (-xy + 2xy) = x^2 + xy$.",
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
      "correctAnswer": "B"
    },
    {
      "id": "t8_d4_q3",
      "number": 3,
      "type": "mcq",
      "level": "TH",
      "content": "Kết quả của phép nhân đơn thức với đa thức $x^2(2x - 3y)$ là:",
      "hint": "Lấy $x^2$ nhân với $2x$ và $x^2$ nhân với $-3y$.",
      "explanation": "Nhân $x^2$ với từng hạng tử: $x^2 \\cdot 2x - x^2 \\cdot 3y = 2x^3 - 3x^2y$.",
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
      "correctAnswer": "A"
    },
    {
      "id": "t8_d4_q4",
      "number": 4,
      "type": "mcq",
      "level": "NB",
      "content": "Bậc của đa thức không (số $0$) là:",
      "hint": "Số $0$ là một trường hợp đặc biệt không được gán bậc.",
      "explanation": "Theo quy ước trong SGK Toán 8, số $0$ được gọi là đa thức không và không có bậc.",
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
      "correctAnswer": "C"
    },
    {
      "id": "t8_d4_q5",
      "number": 5,
      "type": "mcq",
      "level": "TH",
      "content": "Giá trị của biểu thức $x^2 - 4x + 4$ tại $x = 2$ là:",
      "hint": "Nhận dạng hằng đẳng thức $(x - 2)^2$.",
      "explanation": "Cách 1: Thay trực tiếp $x = 2 \\Rightarrow 2^2 - 4(2) + 4 = 4 - 8 + 4 = 0$. Cách 2: $(x - 2)^2 = (2 - 2)^2 = 0$.",
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
      "correctAnswer": "C"
    },
    {
      "id": "t8_d4_q6",
      "number": 6,
      "type": "tf",
      "level": "VD",
      "content": "Rút gọn biểu thức $E = (x + y)(x + y) - 2xy$.",
      "hint": "Đọc kỹ lý thuyết SGK Kết nối tri thức để tìm hướng giải quyết.",
      "explanation": "",
      "items": [
        {
          "key": "a",
          "text": "Đa thức $E$ sau khi thu gọn là $x^2 + y^2$.",
          "correctAnswer": "Đ",
          "explanation": "$E = (x + y)^2 - 2xy = x^2 + 2xy + y^2 - 2xy = x^2 + y^2$."
        },
        {
          "key": "b",
          "text": "Đa thức $E$ có bậc là $4$.",
          "correctAnswer": "S",
          "explanation": "$x^2 + y^2$ có bậc cao nhất là $2$, không phải $4$."
        },
        {
          "key": "c",
          "text": "Đa thức $E$ luôn nhận giá trị không âm với mọi $x, y$.",
          "correctAnswer": "Đ",
          "explanation": "Vì $x^2 \\ge 0$ và $y^2 \\ge 0$ với mọi $x, y$ nên $x^2 + y^2 \\ge 0$."
        },
        {
          "key": "d",
          "text": "Tại $x = 3, y = -4$, giá trị của $E$ là $25$.",
          "correctAnswer": "Đ",
          "explanation": "Thay số: $3^2 + (-4)^2 = 9 + 16 = 25$."
        }
      ],
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem bảng đánh giá chi tiết a, b, c, d"
        }
      ],
      "correctAnswer": "B"
    },
    {
      "id": "t8_d4_q7",
      "number": 7,
      "type": "tf",
      "level": "TH",
      "content": "Cho hai đa thức $A = 5x^2y - 4xy^2$ và $B = -5x^2y + 4xy^2$.",
      "hint": "Đọc kỹ lý thuyết SGK Kết nối tri thức để tìm hướng giải quyết.",
      "explanation": "",
      "items": [
        {
          "key": "a",
          "text": "Hai đa thức $A$ và $B$ là hai đa thức đối nhau.",
          "correctAnswer": "Đ",
          "explanation": "$B = -(5x^2y - 4xy^2) = -A$, vậy $A$ và $B$ là hai đa thức đối nhau."
        },
        {
          "key": "b",
          "text": "Đa thức tổng $A + B = 0$.",
          "correctAnswer": "Đ",
          "explanation": "Tổng của hai đa thức đối nhau luôn bằng $0$."
        },
        {
          "key": "c",
          "text": "Đa thức hiệu $A - B = 0$.",
          "correctAnswer": "S",
          "explanation": "$A - B = A - (-A) = 2A = 10x^2y - 8xy^2 \\ne 0$."
        },
        {
          "key": "d",
          "text": "Bậc của đa thức hiệu $A - B$ là $3$.",
          "correctAnswer": "Đ",
          "explanation": "$10x^2y - 8xy^2$ có các hạng tử bậc $2 + 1 = 1 + 2 = 3$."
        }
      ],
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem bảng đánh giá chi tiết a, b, c, d"
        }
      ],
      "correctAnswer": "B"
    },
    {
      "id": "t8_d4_q8",
      "number": 8,
      "type": "tf",
      "level": "TH",
      "content": "Xét đơn thức $F = -5x^3y^2z$.",
      "hint": "Đọc kỹ lý thuyết SGK Kết nối tri thức để tìm hướng giải quyết.",
      "explanation": "",
      "items": [
        {
          "key": "a",
          "text": "Đơn thức $F$ có $3$ biến.",
          "correctAnswer": "Đ",
          "explanation": "Có 3 biến là $x, y, z$."
        },
        {
          "key": "b",
          "text": "Bậc của đơn thức $F$ là $6$.",
          "correctAnswer": "Đ",
          "explanation": "Bậc là tổng các số mũ: $3 + 2 + 1 = 6$."
        },
        {
          "key": "c",
          "text": "Giá trị của $F$ tại $x = 1, y = 1, z = -1$ là $5$.",
          "correctAnswer": "Đ",
          "explanation": "$-5 \\cdot 1^3 \\cdot 1^2 \\cdot (-1) = 5$."
        },
        {
          "key": "d",
          "text": "Bình phương của đơn thức $F$ có phần hệ số là $-25$.",
          "correctAnswer": "S",
          "explanation": "$F^2 = [(-5)x^3y^2z]^2 = 25x^6y^4z^2$, hệ số là $25$, không phải $-25$."
        }
      ],
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem bảng đánh giá chi tiết a, b, c, d"
        }
      ],
      "correctAnswer": "B"
    },
    {
      "id": "t8_d4_q9",
      "number": 9,
      "type": "short",
      "level": "VD",
      "content": "Tìm bậc của đa thức $M = x^3y^2 + xy^4 - x^5 + 5$.",
      "hint": "Xem bậc lớn nhất của các hạng tử trong đa thức.",
      "explanation": "Các hạng tử $x^3y^2$ có bậc $3+2=5$; $xy^4$ có bậc $1+4=5$; $-x^5$ có bậc $5$; số $5$ có bậc $0$. Bậc cao nhất là $5$.",
      "correctAnswers": [
        "5"
      ],
      "correctAnswer": "5",
      "options": [
        {
          "key": "Đáp số",
          "text": "5"
        }
      ]
    },
    {
      "id": "t8_d4_q10",
      "number": 10,
      "type": "short",
      "level": "VD",
      "content": "Tính giá trị của biểu thức $N = \\frac{1}{2}xy \\cdot (-4x^2y)$ tại $x = -1, y = 2$.",
      "hint": "Thu gọn đơn thức về dạng $-2x^3y^2$ trước khi thay số.",
      "explanation": "Thu gọn: $N = [\\frac{1}{2} \\cdot (-4)] \\cdot (x \\cdot x^2) \\cdot (y \\cdot y) = -2x^3y^2$. Thay $x = -1, y = 2 \\Rightarrow N = -2(-1)^3(2)^2 = -2(-1)(4) = 8$.",
      "correctAnswers": [
        "8"
      ],
      "correctAnswer": "8",
      "options": [
        {
          "key": "Đáp số",
          "text": "8"
        }
      ]
    }
  ]
},
{
  "id": "EXAM-K8-DE5",
  "code": "DE-K8-C1-05",
  "title": "Đề số 5: Tổng ôn tập toàn diện Chương I (Đa thức)",
  "grade": 8,
  "subject": "Toán học 8 (KNTT)",
  "chapter": "Chương I: Đa thức",
  "topic": "Tổng ôn Chương I",
  "timeMinutes": 45,
  "levelTarget": "standard",
  "description": "Đánh giá chuẩn năng lực Toán 8 KNTT theo ma trận GDPT 2018",
  "createdAt": "2026-09-18T10:00:00.000Z",
  "createdBy": "Tổ Toán THCS (Chương trình mới)",
  "parts": [
    {
      "partId": 1,
      "title": "PHẦN 1: TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (5 câu)",
      "instruction": "Mỗi câu hỏi chỉ chọn một phương án đúng.",
      "questions": [
        {
          "id": "t8_d5_q1",
          "number": 1,
          "type": "mcq",
          "level": "NB",
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
          "explanation": "Ta có thể viết $\\frac{2x^2y}{3} = \\frac{2}{3}x^2y$, đây là tích của số $\\frac{2}{3}$ với các biến $x, y$, do đó nó là một đơn thức.",
          "hint": "Hệ số có thể là một phân số."
        },
        {
          "id": "t8_d5_q2",
          "number": 2,
          "type": "mcq",
          "level": "TH",
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
          "explanation": "Khai triển: $2x \\cdot x + 2x \\cdot 1 - 2x^2 = 2x^2 + 2x - 2x^2 = 2x$.",
          "hint": "Thực hiện phép nhân $2x(x + 1) = 2x^2 + 2x$ rồi trừ đi $2x^2$."
        },
        {
          "id": "t8_d5_q3",
          "number": 3,
          "type": "mcq",
          "level": "NB",
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
          "explanation": "Hạng tử $x^4$ có bậc $4$; hạng tử $3x^2y^2$ có bậc $2 + 2 = 4$; hạng tử $-y^4$ có bậc $4$. Bậc của đa thức là $4$.",
          "hint": "Tính bậc của từng hạng tử: $2 + 2 = 4$."
        },
        {
          "id": "t8_d5_q4",
          "number": 4,
          "type": "mcq",
          "level": "TH",
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
          "explanation": "Nhân $x$ với từng hạng tử: $x(x^2 - xy + y^2) = x \\cdot x^2 - x \\cdot xy + x \\cdot y^2 = x^3 - x^2y + xy^2$.",
          "hint": "Nhân $x$ vào từng số hạng của đa thức."
        },
        {
          "id": "t8_d5_q5",
          "number": 5,
          "type": "mcq",
          "level": "NB",
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
          "explanation": "Cặp đơn thức $-2x^2y$ và $5x^2y$ có hệ số khác $0$ và có cùng phần biến là $x^2y$ nên đồng dạng với nhau.",
          "hint": "Tìm cặp đơn thức có đúng phần biến $x^2y$."
        }
      ]
    },
    {
      "partId": 2,
      "title": "PHẦN 2: TRẮC NGHIỆM ĐÚNG SAI (3 câu)",
      "instruction": "Trong mỗi ý a), b), c), d) ở mỗi câu, chọn đúng hoặc sai.",
      "questions": [
        {
          "id": "t8_d5_tf1",
          "number": 1,
          "type": "tf",
          "level": "VD",
          "prompt": "Cho biểu thức $M = (2x^2y - 3xy^2) - (x^2y - 4xy^2)$.",
          "items": [
            {
              "label": "a",
              "text": "Hệ số của hạng tử $x^2y$ trong đa thức thu gọn là $1$.",
              "correctAnswer": "Đ",
              "explanation": "$2x^2y - x^2y = 1x^2y$, hệ số là $1$."
            },
            {
              "label": "b",
              "text": "Hệ số của hạng tử $xy^2$ trong đa thức thu gọn là $-1$.",
              "correctAnswer": "S",
              "explanation": "$-3xy^2 - (-4xy^2) = -3xy^2 + 4xy^2 = 1xy^2$, hệ số là $1$, không phải $-1$."
            },
            {
              "label": "c",
              "text": "Bậc của đa thức $M$ là $3$.",
              "correctAnswer": "Đ",
              "explanation": "$x^2y + xy^2$ có bậc là $3$."
            },
            {
              "label": "d",
              "text": "Giá trị của $M$ luôn bằng $0$ khi $x = -y$.",
              "correctAnswer": "Đ",
              "explanation": "Thay $x = -y \\Rightarrow (-y)^2y + (-y)y^2 = y^3 - y^3 = 0$."
            }
          ]
        },
        {
          "id": "t8_d5_tf2",
          "number": 2,
          "type": "tf",
          "level": "TH",
          "prompt": "Thực hiện phép nhân đa thức $K = 2x(x^2 - xy + 1)$.",
          "items": [
            {
              "label": "a",
              "text": "Đa thức tích $K$ có $3$ hạng tử.",
              "correctAnswer": "Đ",
              "explanation": "$K = 2x^3 - 2x^2y + 2x$, gồm đúng $3$ hạng tử."
            },
            {
              "label": "b",
              "text": "Bậc của đa thức $K$ là $3$.",
              "correctAnswer": "Đ",
              "explanation": "Hạng tử $2x^3$ có bậc là $3$, cao nhất."
            },
            {
              "label": "c",
              "text": "Trong đa thức $K$ có chứa hạng tử $-2x^2y$.",
              "correctAnswer": "Đ",
              "explanation": "$2x \\cdot (-xy) = -2x^2y$."
            },
            {
              "label": "d",
              "text": "Giá trị của đa thức $K$ tại $x = 1, y = 1$ là $2$.",
              "correctAnswer": "Đ",
              "explanation": "Thay $x = 1, y = 1 \\Rightarrow 2(1)^3 - 2(1)^2(1) + 2(1) = 2 - 2 + 2 = 2$."
            }
          ]
        },
        {
          "id": "t8_d5_tf3",
          "number": 3,
          "type": "tf",
          "level": "TH",
          "prompt": "Cho hai biểu thức $P = x^2 - y^2$ và $Q = x^2 + y^2$.",
          "items": [
            {
              "label": "a",
              "text": "Đa thức tổng $P + Q = 2x^2$.",
              "correctAnswer": "Đ",
              "explanation": "$(x^2 - y^2) + (x^2 + y^2) = 2x^2$."
            },
            {
              "label": "b",
              "text": "Đa thức hiệu $P - Q = 2y^2$.",
              "correctAnswer": "S",
              "explanation": "$P - Q = x^2 - y^2 - x^2 - y^2 = -2y^2$, không phải $2y^2$."
            },
            {
              "label": "c",
              "text": "Bậc của đa thức tổng $P + Q$ luôn bằng $2$ với mọi $x \\ne 0$.",
              "correctAnswer": "Đ",
              "explanation": "$2x^2$ có bậc bằng $2$ khi $x \\ne 0$."
            },
            {
              "label": "d",
              "text": "Tích $P \\cdot Q$ bằng $x^4 - y^4$.",
              "correctAnswer": "Đ",
              "explanation": "$(x^2 - y^2)(x^2 + y^2) = (x^2)^2 - (y^2)^2 = x^4 - y^4$."
            }
          ]
        }
      ]
    },
    {
      "partId": 3,
      "title": "PHẦN 3: TRẮC NGHIỆM TRẢ LỜI NGẮN (2 câu)",
      "instruction": "Viết kết quả cuối cùng vào ô trống.",
      "questions": [
        {
          "id": "t8_d5_sa1",
          "number": 1,
          "type": "short",
          "level": "NB",
          "content": "Tìm hệ số của hạng tử có bậc cao nhất trong đa thức $5x^4 - 3x^3 + 2x^5 - 1$.",
          "correctAnswers": [
            "2"
          ],
          "explanation": "Hạng tử có bậc cao nhất là $2x^5$ (bậc $5$), hệ số của nó là $2$.",
          "hint": "Tìm số mũ lớn nhất của $x$ rồi đọc hệ số đi kèm."
        },
        {
          "id": "t8_d5_sa2",
          "number": 2,
          "type": "short",
          "level": "VD",
          "content": "Tính giá trị của biểu thức $A = 2x^2y - 3x^2y + 5x^2y$ tại $x = 2, y = -1$.",
          "correctAnswers": [
            "-16"
          ],
          "explanation": "Thu gọn: $A = (2 - 3 + 5)x^2y = 4x^2y$. Thay $x = 2, y = -1 \\Rightarrow A = 4 \\cdot (2)^2 \\cdot (-1) = 4 \\cdot 4 \\cdot (-1) = -16$.",
          "hint": "Thu gọn các đơn thức đồng dạng trước: $2 - 3 + 5 = 4$."
        }
      ]
    }
  ],
  "questions": [
    {
      "id": "t8_d5_q1",
      "number": 1,
      "type": "mcq",
      "level": "NB",
      "content": "Biểu thức $\\frac{2x^2y}{3}$ có phải là đơn thức không?",
      "hint": "Hệ số có thể là một phân số.",
      "explanation": "Ta có thể viết $\\frac{2x^2y}{3} = \\frac{2}{3}x^2y$, đây là tích của số $\\frac{2}{3}$ với các biến $x, y$, do đó nó là một đơn thức.",
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
      "correctAnswer": "A"
    },
    {
      "id": "t8_d5_q2",
      "number": 2,
      "type": "mcq",
      "level": "TH",
      "content": "Rút gọn biểu thức $2x(x + 1) - 2x^2$ ta được đa thức:",
      "hint": "Thực hiện phép nhân $2x(x + 1) = 2x^2 + 2x$ rồi trừ đi $2x^2$.",
      "explanation": "Khai triển: $2x \\cdot x + 2x \\cdot 1 - 2x^2 = 2x^2 + 2x - 2x^2 = 2x$.",
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
      "correctAnswer": "A"
    },
    {
      "id": "t8_d5_q3",
      "number": 3,
      "type": "mcq",
      "level": "NB",
      "content": "Đa thức $Q = x^4 + 3x^2y^2 - y^4$ có bậc là:",
      "hint": "Tính bậc của từng hạng tử: $2 + 2 = 4$.",
      "explanation": "Hạng tử $x^4$ có bậc $4$; hạng tử $3x^2y^2$ có bậc $2 + 2 = 4$; hạng tử $-y^4$ có bậc $4$. Bậc của đa thức là $4$.",
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
      "correctAnswer": "A"
    },
    {
      "id": "t8_d5_q4",
      "number": 4,
      "type": "mcq",
      "level": "TH",
      "content": "Tích của đa thức $x^2 - xy + y^2$ và đơn thức $x$ là:",
      "hint": "Nhân $x$ vào từng số hạng của đa thức.",
      "explanation": "Nhân $x$ với từng hạng tử: $x(x^2 - xy + y^2) = x \\cdot x^2 - x \\cdot xy + x \\cdot y^2 = x^3 - x^2y + xy^2$.",
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
      "correctAnswer": "B"
    },
    {
      "id": "t8_d5_q5",
      "number": 5,
      "type": "mcq",
      "level": "NB",
      "content": "Cặp đơn thức nào sau đây đồng dạng với nhau?",
      "hint": "Tìm cặp đơn thức có đúng phần biến $x^2y$.",
      "explanation": "Cặp đơn thức $-2x^2y$ và $5x^2y$ có hệ số khác $0$ và có cùng phần biến là $x^2y$ nên đồng dạng với nhau.",
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
      "correctAnswer": "B"
    },
    {
      "id": "t8_d5_q6",
      "number": 6,
      "type": "tf",
      "level": "VD",
      "content": "Cho biểu thức $M = (2x^2y - 3xy^2) - (x^2y - 4xy^2)$.",
      "hint": "Đọc kỹ lý thuyết SGK Kết nối tri thức để tìm hướng giải quyết.",
      "explanation": "",
      "items": [
        {
          "key": "a",
          "text": "Hệ số của hạng tử $x^2y$ trong đa thức thu gọn là $1$.",
          "correctAnswer": "Đ",
          "explanation": "$2x^2y - x^2y = 1x^2y$, hệ số là $1$."
        },
        {
          "key": "b",
          "text": "Hệ số của hạng tử $xy^2$ trong đa thức thu gọn là $-1$.",
          "correctAnswer": "S",
          "explanation": "$-3xy^2 - (-4xy^2) = -3xy^2 + 4xy^2 = 1xy^2$, hệ số là $1$, không phải $-1$."
        },
        {
          "key": "c",
          "text": "Bậc của đa thức $M$ là $3$.",
          "correctAnswer": "Đ",
          "explanation": "$x^2y + xy^2$ có bậc là $3$."
        },
        {
          "key": "d",
          "text": "Giá trị của $M$ luôn bằng $0$ khi $x = -y$.",
          "correctAnswer": "Đ",
          "explanation": "Thay $x = -y \\Rightarrow (-y)^2y + (-y)y^2 = y^3 - y^3 = 0$."
        }
      ],
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem bảng đánh giá chi tiết a, b, c, d"
        }
      ],
      "correctAnswer": "B"
    },
    {
      "id": "t8_d5_q7",
      "number": 7,
      "type": "tf",
      "level": "TH",
      "content": "Thực hiện phép nhân đa thức $K = 2x(x^2 - xy + 1)$.",
      "hint": "Đọc kỹ lý thuyết SGK Kết nối tri thức để tìm hướng giải quyết.",
      "explanation": "",
      "items": [
        {
          "key": "a",
          "text": "Đa thức tích $K$ có $3$ hạng tử.",
          "correctAnswer": "Đ",
          "explanation": "$K = 2x^3 - 2x^2y + 2x$, gồm đúng $3$ hạng tử."
        },
        {
          "key": "b",
          "text": "Bậc của đa thức $K$ là $3$.",
          "correctAnswer": "Đ",
          "explanation": "Hạng tử $2x^3$ có bậc là $3$, cao nhất."
        },
        {
          "key": "c",
          "text": "Trong đa thức $K$ có chứa hạng tử $-2x^2y$.",
          "correctAnswer": "Đ",
          "explanation": "$2x \\cdot (-xy) = -2x^2y$."
        },
        {
          "key": "d",
          "text": "Giá trị của đa thức $K$ tại $x = 1, y = 1$ là $2$.",
          "correctAnswer": "Đ",
          "explanation": "Thay $x = 1, y = 1 \\Rightarrow 2(1)^3 - 2(1)^2(1) + 2(1) = 2 - 2 + 2 = 2$."
        }
      ],
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem bảng đánh giá chi tiết a, b, c, d"
        }
      ],
      "correctAnswer": "B"
    },
    {
      "id": "t8_d5_q8",
      "number": 8,
      "type": "tf",
      "level": "TH",
      "content": "Cho hai biểu thức $P = x^2 - y^2$ và $Q = x^2 + y^2$.",
      "hint": "Đọc kỹ lý thuyết SGK Kết nối tri thức để tìm hướng giải quyết.",
      "explanation": "",
      "items": [
        {
          "key": "a",
          "text": "Đa thức tổng $P + Q = 2x^2$.",
          "correctAnswer": "Đ",
          "explanation": "$(x^2 - y^2) + (x^2 + y^2) = 2x^2$."
        },
        {
          "key": "b",
          "text": "Đa thức hiệu $P - Q = 2y^2$.",
          "correctAnswer": "S",
          "explanation": "$P - Q = x^2 - y^2 - x^2 - y^2 = -2y^2$, không phải $2y^2$."
        },
        {
          "key": "c",
          "text": "Bậc của đa thức tổng $P + Q$ luôn bằng $2$ với mọi $x \\ne 0$.",
          "correctAnswer": "Đ",
          "explanation": "$2x^2$ có bậc bằng $2$ khi $x \\ne 0$."
        },
        {
          "key": "d",
          "text": "Tích $P \\cdot Q$ bằng $x^4 - y^4$.",
          "correctAnswer": "Đ",
          "explanation": "$(x^2 - y^2)(x^2 + y^2) = (x^2)^2 - (y^2)^2 = x^4 - y^4$."
        }
      ],
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem bảng đánh giá chi tiết a, b, c, d"
        }
      ],
      "correctAnswer": "B"
    },
    {
      "id": "t8_d5_q9",
      "number": 9,
      "type": "short",
      "level": "NB",
      "content": "Tìm hệ số của hạng tử có bậc cao nhất trong đa thức $5x^4 - 3x^3 + 2x^5 - 1$.",
      "hint": "Tìm số mũ lớn nhất của $x$ rồi đọc hệ số đi kèm.",
      "explanation": "Hạng tử có bậc cao nhất là $2x^5$ (bậc $5$), hệ số của nó là $2$.",
      "correctAnswers": [
        "2"
      ],
      "correctAnswer": "2",
      "options": [
        {
          "key": "Đáp số",
          "text": "2"
        }
      ]
    },
    {
      "id": "t8_d5_q10",
      "number": 10,
      "type": "short",
      "level": "VD",
      "content": "Tính giá trị của biểu thức $A = 2x^2y - 3x^2y + 5x^2y$ tại $x = 2, y = -1$.",
      "hint": "Thu gọn các đơn thức đồng dạng trước: $2 - 3 + 5 = 4$.",
      "explanation": "Thu gọn: $A = (2 - 3 + 5)x^2y = 4x^2y$. Thay $x = 2, y = -1 \\Rightarrow A = 4 \\cdot (2)^2 \\cdot (-1) = 4 \\cdot 4 \\cdot (-1) = -16$.",
      "correctAnswers": [
        "-16"
      ],
      "correctAnswer": "-16",
      "options": [
        {
          "key": "Đáp số",
          "text": "-16"
        }
      ]
    }
  ]
},
{
  "id": "EXAM-K8-DE6",
  "code": "DE-K8-C2-01",
  "title": "Đề số 6: Hằng đẳng thức đáng nhớ & Phân tích đa thức thành nhân tử",
  "grade": 8,
  "subject": "Toán học 8 (KNTT)",
  "chapter": "Chương II: Hằng đẳng thức đáng nhớ & Ứng dụng",
  "topic": "7 Hằng đẳng thức & Nhân tử",
  "timeMinutes": 45,
  "levelTarget": "standard",
  "description": "7 hằng đẳng thức đáng nhớ, phân tích đa thức thành nhân tử và ứng dụng",
  "createdAt": "2026-09-18T08:00:00.000Z",
  "createdBy": "Tổ Toán THCS",
  "questions": [
    {
      "id": "11_1",
      "number": 1,
      "type": "mcq",
      "level": "NB",
      "lessonId": "K8_C2_B6",
      "lessonName": "Bài 6: Hiệu hai bình phương. Bình phương của một tổng hay một hiệu",
      "chapter": 2,
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
      "correctAnswers": [
        "B"
      ],
      "explanation": "Theo hằng đẳng thức bình phương của một tổng: $(A + B)^2 = A^2 + 2AB + B^2$.",
      "hint": "Bình phương số thứ nhất cộng 2 lần tích cộng bình phương số thứ hai."
    },
    {
      "id": "11_2",
      "number": 2,
      "type": "mcq",
      "level": "NB",
      "lessonId": "K8_C2_B6",
      "lessonName": "Bài 6: Hiệu hai bình phương. Bình phương của một tổng hay một hiệu",
      "chapter": 2,
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
      "correctAnswers": [
        "A"
      ],
      "explanation": "Áp dụng hằng đẳng thức hiệu hai bình phương $A^2 - B^2 = (A - B)(A + B)$ với $16 = 4^2$.",
      "hint": "Nhận dạng $A^2 - B^2$ với $B = 4$."
    },
    {
      "id": "11_3",
      "number": 3,
      "type": "mcq",
      "level": "TH",
      "lessonId": "K8_C2_B6",
      "lessonName": "Bài 6: Hiệu hai bình phương. Bình phương của một tổng hay một hiệu",
      "chapter": 2,
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
      "correctAnswers": [
        "B"
      ],
      "explanation": "Ta có: $M = (x^2 + 6x + 9) - (x^2 - 6x + 9) = 6x - (-6x) = 12x$.",
      "hint": "Khai triển từng bình phương rồi trừ các hạng tử đồng dạng."
    },
    {
      "id": "11_4",
      "number": 4,
      "type": "mcq",
      "level": "TH",
      "lessonId": "K8_C2_B9",
      "lessonName": "Bài 9: Phân tích đa thức thành nhân tử",
      "chapter": 2,
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
      "correctAnswers": [
        "B"
      ],
      "explanation": "Ta có: $x^2 - 2 \\cdot x \\cdot 2 + 2^2 = (x - 2)^2$.",
      "hint": "Nhận dạng hằng đẳng thức bình phương của một hiệu $(A - B)^2$."
    },
    {
      "id": "11_5",
      "number": 5,
      "type": "mcq",
      "level": "VD",
      "lessonId": "K8_C2_B6",
      "lessonName": "Bài 6: Hiệu hai bình phương. Bình phương của một tổng hay một hiệu",
      "chapter": 2,
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
      "correctAnswers": [
        "A"
      ],
      "explanation": "$99^2 - 1^2 = (99 - 1)(99 + 1) = 98 \\cdot 100 = 9800$.",
      "hint": "Áp dụng $a^2 - b^2 = (a - b)(a + b)$ với $a = 99, b = 1$."
    },
    {
      "id": "11_6",
      "number": 6,
      "type": "tf",
      "level": "TH",
      "lessonId": "K8_C2_B7",
      "lessonName": "Bài 7: Lập phương của một tổng. Lập phương của một hiệu",
      "chapter": 2,
      "content": "Cho biểu thức $P = (x + 2)^3$. Xét tính đúng/sai của các khẳng định sau:",
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem đánh giá chi tiết a, b, c, d"
        }
      ],
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
      "correctAnswers": [
        "A"
      ],
      "explanation": "",
      "hint": ""
    },
    {
      "id": "11_7",
      "number": 7,
      "type": "tf",
      "level": "VD",
      "lessonId": "K8_C2_B8",
      "lessonName": "Bài 8: Tổng và hiệu hai lập phương",
      "chapter": 2,
      "content": "Cho hai biểu thức $A = x^3 - 8$ và $B = (x - 2)(x^2 + 2x + 4)$.",
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem đánh giá chi tiết a, b, c, d"
        }
      ],
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
      "correctAnswers": [
        "A"
      ],
      "explanation": "",
      "hint": ""
    },
    {
      "id": "11_8",
      "number": 8,
      "type": "tf",
      "level": "VD",
      "lessonId": "K8_C2_B9",
      "lessonName": "Bài 9: Phân tích đa thức thành nhân tử",
      "chapter": 2,
      "content": "Xét việc phân tích đa thức $K = x^2 - 2xy + y^2 - 9$ thành nhân tử:",
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem đánh giá chi tiết a, b, c, d"
        }
      ],
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
      "correctAnswers": [
        "A"
      ],
      "explanation": "",
      "hint": ""
    },
    {
      "id": "11_9",
      "number": 9,
      "type": "short",
      "level": "VD",
      "lessonId": "K8_C2_B6",
      "lessonName": "Bài 6: Hiệu hai bình phương. Bình phương của một tổng hay một hiệu",
      "chapter": 2,
      "content": "Tìm giá trị nhỏ nhất của biểu thức $A = x^2 - 6x + 10$.",
      "options": [
        {
          "key": "Đáp số",
          "text": "1"
        }
      ],
      "correctAnswer": "1",
      "correctAnswers": [
        "1"
      ],
      "explanation": "Ta biến đổi: $A = (x^2 - 6x + 9) + 1 = (x - 3)^2 + 1 \\ge 1$. Dấu '=' xảy ra khi $x = 3$. Vậy GTNN là 1.",
      "hint": "Đưa về dạng $(x - a)^2 + m$."
    },
    {
      "id": "11_10",
      "number": 10,
      "type": "short",
      "level": "VD",
      "lessonId": "K8_C2_B6",
      "lessonName": "Bài 6: Hiệu hai bình phương. Bình phương của một tổng hay một hiệu",
      "chapter": 2,
      "content": "Tìm số thực dương $x$ thỏa mãn phương trình: $x^2 - 25 = 0$.",
      "options": [
        {
          "key": "Đáp số",
          "text": "5"
        }
      ],
      "correctAnswer": "5",
      "correctAnswers": [
        "5"
      ],
      "explanation": "$x^2 - 25 = 0 \\Leftrightarrow (x - 5)(x + 5) = 0 \\Leftrightarrow x = 5$ hoặc $x = -5$. Do $x > 0$ nên $x = 5$.",
      "hint": "Dùng hằng đẳng thức hiệu hai bình phương và chú ý điều kiện $x > 0$."
    }
  ]
},
{
  "id": "EXAM-K8-DE7",
  "code": "DE-K8-C3-01",
  "title": "Đề số 7: Tứ giác & Các hình thang, hình bình hành, hình chữ nhật",
  "grade": 8,
  "subject": "Toán học 8 (KNTT)",
  "chapter": "Chương III: Tứ giác",
  "topic": "Tứ giác & Các hình",
  "timeMinutes": 45,
  "levelTarget": "standard",
  "description": "Định lý tổng các góc tứ giác, hình thang cân, hình bình hành, hình chữ nhật, hình thoi, hình vuông",
  "createdAt": "2026-09-18T08:00:00.000Z",
  "createdBy": "Tổ Toán THCS",
  "questions": [
    {
      "id": "12_1",
      "number": 1,
      "type": "mcq",
      "level": "NB",
      "lessonId": "K8_C3_B10",
      "lessonName": "Bài 10: Tứ giác",
      "chapter": 3,
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
      "correctAnswers": [
        "B"
      ],
      "explanation": "Theo định lý: Tổng các góc của một tứ giác bằng $360^\\circ$.",
      "hint": "Nhớ định lý tổng các góc trong một tứ giác."
    },
    {
      "id": "12_2",
      "number": 2,
      "type": "mcq",
      "level": "NB",
      "lessonId": "K8_C3_B11",
      "lessonName": "Bài 11: Hình thang cân",
      "chapter": 3,
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
      "correctAnswers": [
        "A"
      ],
      "explanation": "Định nghĩa: Hình thang cân là hình thang có hai góc kề một đáy bằng nhau.",
      "hint": "Xem lại định nghĩa hình thang cân trong SGK KNTT."
    },
    {
      "id": "12_3",
      "number": 3,
      "type": "mcq",
      "level": "TH",
      "lessonId": "K8_C3_B10",
      "lessonName": "Bài 10: Tứ giác",
      "chapter": 3,
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
      "correctAnswers": [
        "B"
      ],
      "explanation": "Ta có: $\\widehat{D} = 360^\\circ - (70^\\circ + 80^\\circ + 100^\\circ) = 360^\\circ - 250^\\circ = 110^\\circ$.",
      "hint": "Lấy $360^\\circ$ trừ tổng ba góc đã biết."
    },
    {
      "id": "12_4",
      "number": 4,
      "type": "mcq",
      "level": "TH",
      "lessonId": "K8_C3_B12",
      "lessonName": "Bài 12: Hình bình hành",
      "chapter": 3,
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
      "correctAnswers": [
        "C"
      ],
      "explanation": "Hình bình hành nói chung hai đường chéo cắt nhau tại trung điểm mỗi đường chứ không bắt buộc vuông góc (chỉ hình thoi và hình vuông mới vuông góc).",
      "hint": "Hai đường chéo vuông góc là đặc trưng của hình thoi hoặc hình vuông."
    },
    {
      "id": "12_5",
      "number": 5,
      "type": "mcq",
      "level": "VD",
      "lessonId": "K8_C3_B14",
      "lessonName": "Bài 14: Hình thoi và hình vuông",
      "chapter": 3,
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
      "correctAnswers": [
        "B"
      ],
      "explanation": "Dấu hiệu nhận biết: Hình chữ nhật có hai đường chéo vuông góc với nhau là hình vuông.",
      "hint": "Hình chữ nhật có thêm tính chất của hình thoi thì trở thành hình gì?"
    },
    {
      "id": "12_6",
      "number": 6,
      "type": "tf",
      "level": "TH",
      "lessonId": "K8_C3_B10",
      "lessonName": "Bài 10: Tứ giác",
      "chapter": 3,
      "content": "Cho tứ giác lồi $ABCD$. Xét tính đúng/sai của các khẳng định sau:",
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem đánh giá chi tiết a, b, c, d"
        }
      ],
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
      "correctAnswers": [
        "A"
      ],
      "explanation": "",
      "hint": ""
    },
    {
      "id": "12_7",
      "number": 7,
      "type": "tf",
      "level": "VD",
      "lessonId": "K8_C3_B12",
      "lessonName": "Bài 12: Hình bình hành",
      "chapter": 3,
      "content": "Cho hình bình hành $ABCD$ có $AB = 8\\text{ cm}, BC = 5\\text{ cm}$.",
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem đánh giá chi tiết a, b, c, d"
        }
      ],
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
      "correctAnswers": [
        "A"
      ],
      "explanation": "",
      "hint": ""
    },
    {
      "id": "12_8",
      "number": 8,
      "type": "tf",
      "level": "VD",
      "lessonId": "K8_C3_B13",
      "lessonName": "Bài 13: Hình chữ nhật",
      "chapter": 3,
      "content": "Cho tam giác $ABC$ vuông tại $A$, có trung tuyến $AM$. Gọi $D$ là điểm đối xứng với $A$ qua $M$.",
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem đánh giá chi tiết a, b, c, d"
        }
      ],
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
      "correctAnswers": [
        "A"
      ],
      "explanation": "",
      "hint": ""
    },
    {
      "id": "12_9",
      "number": 9,
      "type": "short",
      "level": "TH",
      "lessonId": "K8_C3_B11",
      "lessonName": "Bài 11: Hình thang cân",
      "chapter": 3,
      "content": "Cho hình thang cân $ABCD$ ($AB \\parallel CD$) có góc $\\widehat{D} = 70^\\circ$. Tính số đo góc $\\widehat{A}$ (đơn vị: độ).",
      "options": [
        {
          "key": "Đáp số",
          "text": "110"
        }
      ],
      "correctAnswer": "110",
      "correctAnswers": [
        "110",
        "110 độ",
        "110°"
      ],
      "explanation": "Vì $AB \\parallel CD$ nên hai góc trong cùng phía bù nhau: $\\widehat{A} + \\widehat{D} = 180^\\circ \\Rightarrow \\widehat{A} = 180^\\circ - 70^\\circ = 110^\\circ$.",
      "hint": "Hai góc trong cùng phía có tổng bằng $180^\\circ$."
    },
    {
      "id": "12_10",
      "number": 10,
      "type": "short",
      "level": "VD",
      "lessonId": "K8_C3_B13",
      "lessonName": "Bài 13: Hình chữ nhật",
      "chapter": 3,
      "content": "Một mảnh vườn hình chữ nhật có chiều dài là $8\\text{ m}$ và chiều rộng là $6\\text{ m}$. Tính độ dài đường chéo của mảnh vườn đó (đơn vị: mét).",
      "options": [
        {
          "key": "Đáp số",
          "text": "10"
        }
      ],
      "correctAnswer": "10",
      "correctAnswers": [
        "10",
        "10m",
        "10 m",
        "10 mét"
      ],
      "explanation": "Theo định lý Pythagore trong tam giác vuông tạo bởi hai kích thước: $d = \\sqrt{8^2 + 6^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10\\text{ m}$.",
      "hint": "Dùng định lý Pythagore: $c = \\sqrt{a^2 + b^2}$."
    }
  ]
},
{
  "id": "EXAM-K7-DE1",
  "code": "DE-K7-C1-01",
  "title": "Đề số 1: Số hữu tỉ và các phép toán trên tập hợp Q",
  "grade": 7,
  "subject": "Toán học 7 (KNTT)",
  "chapter": "Tập hợp số hữu tỉ, cộng trừ nhân chia, lũy thừa của một số hữu tỉ",
  "topic": "Số hữu tỉ & Phép tính",
  "timeMinutes": 45,
  "levelTarget": "standard",
  "description": "Tập hợp số hữu tỉ, cộng trừ nhân chia, lũy thừa của một số hữu tỉ",
  "createdAt": "2026-09-18T08:00:00.000Z",
  "createdBy": "Tổ Toán THCS",
  "questions": [
    {
      "id": "13_1",
      "number": 1,
      "type": "mcq",
      "level": "NB",
      "grade": 7,
      "chapter": 1,
      "lessonId": "K7_C1_B1",
      "lessonName": "Bài 1: Tập hợp các số hữu tỉ",
      "topic": "Số hữu tỉ & Phép tính",
      "content": "Khẳng định nào sau đây là đúng về tập hợp số hữu tỉ $\\mathbb{Q}$?",
      "options": [
        {
          "key": "A",
          "text": "$-3 \\notin \\mathbb{Q}$"
        },
        {
          "key": "B",
          "text": "$\\frac{2}{3} \\in \\mathbb{Q}$"
        },
        {
          "key": "C",
          "text": "$\\sqrt{2} \\in \\mathbb{Q}$"
        },
        {
          "key": "D",
          "text": "$\\mathbb{N} \\not\\subset \\mathbb{Q}$"
        }
      ],
      "correctAnswer": "B",
      "correctAnswers": [
        "B"
      ],
      "explanation": "Số hữu tỉ là số viết được dưới dạng phân số $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z}, b \\ne 0$. Do đó $\\frac{2}{3} \\in \\mathbb{Q}$.",
      "hint": "Xem lại định nghĩa số hữu tỉ trong SGK Toán 7."
    },
    {
      "id": "13_2",
      "number": 2,
      "type": "mcq",
      "level": "NB",
      "grade": 7,
      "chapter": 1,
      "lessonId": "K7_C1_B1",
      "lessonName": "Bài 1: Tập hợp các số hữu tỉ",
      "topic": "Số hữu tỉ & Phép tính",
      "content": "Số đối của số hữu tỉ $-\\frac{3}{5}$ là:",
      "options": [
        {
          "key": "A",
          "text": "$\\frac{3}{5}$"
        },
        {
          "key": "B",
          "text": "$-\\frac{5}{3}$"
        },
        {
          "key": "C",
          "text": "$\\frac{5}{3}$"
        },
        {
          "key": "D",
          "text": "$-\\frac{3}{5}$"
        }
      ],
      "correctAnswer": "A",
      "correctAnswers": [
        "A"
      ],
      "explanation": "Số đối của số hữu tỉ $x$ là $-x$. Số đối của $-\\frac{3}{5}$ là $\\frac{3}{5}$.",
      "hint": "Đổi dấu của số đã cho."
    },
    {
      "id": "13_3",
      "number": 3,
      "type": "mcq",
      "level": "TH",
      "grade": 7,
      "chapter": 1,
      "lessonId": "K7_C1_B2",
      "lessonName": "Bài 2: Cộng, trừ, nhân, chia số hữu tỉ",
      "topic": "Số hữu tỉ & Phép tính",
      "content": "Kết quả của phép tính $\\frac{-1}{3} + \\frac{5}{6}$ là:",
      "options": [
        {
          "key": "A",
          "text": "$\\frac{1}{2}$"
        },
        {
          "key": "B",
          "text": "$\\frac{4}{9}$"
        },
        {
          "key": "C",
          "text": "$\\frac{1}{3}$"
        },
        {
          "key": "D",
          "text": "$-\\frac{1}{2}$"
        }
      ],
      "correctAnswer": "A",
      "correctAnswers": [
        "A"
      ],
      "explanation": "Quy đồng mẫu số chung là $6$: $\\frac{-1}{3} + \\frac{5}{6} = \\frac{-2}{6} + \\frac{5}{6} = \\frac{3}{6} = \\frac{1}{2}$.",
      "hint": "Quy đồng mẫu số chung là 6 rồi cộng tử."
    },
    {
      "id": "13_4",
      "number": 4,
      "type": "mcq",
      "level": "TH",
      "grade": 7,
      "chapter": 1,
      "lessonId": "K7_C1_B3",
      "lessonName": "Bài 3: Lũy thừa với số mũ tự nhiên của một số hữu tỉ",
      "topic": "Số hữu tỉ & Phép tính",
      "content": "Giá trị của biểu thức $\\left(-\\frac{1}{2}\\right)^3$ bằng:",
      "options": [
        {
          "key": "A",
          "text": "$\\frac{1}{8}$"
        },
        {
          "key": "B",
          "text": "$-\\frac{1}{8}$"
        },
        {
          "key": "C",
          "text": "$-\\frac{1}{6}$"
        },
        {
          "key": "D",
          "text": "$\\frac{1}{6}$"
        }
      ],
      "correctAnswer": "B",
      "correctAnswers": [
        "B"
      ],
      "explanation": "$\\left(-\\frac{1}{2}\\right)^3 = \\frac{(-1)^3}{2^3} = -\\frac{1}{8}$.",
      "hint": "Lũy thừa bậc lẻ của một số âm luôn mang dấu âm."
    },
    {
      "id": "13_5",
      "number": 5,
      "type": "mcq",
      "level": "VD",
      "grade": 7,
      "chapter": 1,
      "lessonId": "K7_C1_B2",
      "lessonName": "Bài 2: Cộng, trừ, nhân, chia số hữu tỉ",
      "topic": "Số hữu tỉ & Phép tính",
      "content": "Tìm số hữu tỉ $x$ biết: $\\frac{2}{3} - x = \\frac{1}{6}$.",
      "options": [
        {
          "key": "A",
          "text": "$x = \\frac{1}{2}$"
        },
        {
          "key": "B",
          "text": "$x = \\frac{5}{6}$"
        },
        {
          "key": "C",
          "text": "$x = -\\frac{1}{2}$"
        },
        {
          "key": "D",
          "text": "$x = \\frac{1}{3}$"
        }
      ],
      "correctAnswer": "A",
      "correctAnswers": [
        "A"
      ],
      "explanation": "$x = \\frac{2}{3} - \\frac{1}{6} = \\frac{4}{6} - \\frac{1}{6} = \\frac{3}{6} = \\frac{1}{2}$.",
      "hint": "Chuyển vế: $x = \\frac{2}{3} - \\frac{1}{6}$."
    },
    {
      "id": "13_6",
      "number": 6,
      "type": "tf",
      "level": "TH",
      "grade": 7,
      "chapter": 1,
      "lessonId": "K7_C1_B1",
      "lessonName": "Bài 1: Tập hợp các số hữu tỉ",
      "topic": "Số hữu tỉ & Phép tính",
      "content": "Cho các số hữu tỉ: $a = -0{,}75; b = \\frac{3}{4}; c = 0; d = -\\frac{5}{4}$.",
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem đánh giá chi tiết a, b, c, d"
        }
      ],
      "items": [
        {
          "key": "a",
          "label": "a",
          "text": "Số $a$ và số $b$ là hai số đối nhau.",
          "correctAnswer": "Đ",
          "explanation": "$-0{,}75 = -\\frac{3}{4}$, do đó $a$ và $b$ đối nhau."
        },
        {
          "key": "b",
          "label": "b",
          "text": "Trên trục số, điểm biểu diễn số $d$ nằm bên phải điểm biểu diễn số $a$.",
          "correctAnswer": "S",
          "explanation": "$d = -1{,}25 < a = -0{,}75$ nên điểm $d$ nằm bên trái điểm $a$."
        },
        {
          "key": "c",
          "label": "c",
          "text": "Thứ tự tăng dần của các số là $d < a < c < b$.",
          "correctAnswer": "Đ",
          "explanation": "$-1{,}25 < -0{,}75 < 0 < 0{,}75$."
        },
        {
          "key": "d",
          "label": "d",
          "text": "Cả 4 số đã cho đều thuộc tập hợp số hữu tỉ $\\mathbb{Q}$.",
          "correctAnswer": "Đ",
          "explanation": "Mọi số thập phân và phân số trên đều là số hữu tỉ."
        }
      ],
      "correctAnswers": [
        "A"
      ],
      "explanation": "",
      "hint": ""
    },
    {
      "id": "13_7",
      "number": 7,
      "type": "tf",
      "level": "VD",
      "grade": 7,
      "chapter": 1,
      "lessonId": "K7_C1_B3",
      "lessonName": "Bài 3: Lũy thừa với số mũ tự nhiên của một số hữu tỉ",
      "topic": "Số hữu tỉ & Phép tính",
      "content": "Xét các khẳng định về lũy thừa số hữu tỉ:",
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem đánh giá chi tiết a, b, c, d"
        }
      ],
      "items": [
        {
          "key": "a",
          "label": "a",
          "text": "$\\left(\\frac{2}{3}\\right)^2 \\cdot \\left(\\frac{2}{3}\\right)^3 = \\left(\\frac{2}{3}\\right)^5$.",
          "correctAnswer": "Đ",
          "explanation": "Áp dụng công thức nhân hai lũy thừa cùng cơ số: $x^m \\cdot x^n = x^{m+n}$."
        },
        {
          "key": "b",
          "label": "b",
          "text": "$\\left[\\left(-\\frac{1}{2}\\right)^2\\right]^3 = \\left(-\\frac{1}{2}\\right)^6 = \\frac{1}{64}$.",
          "correctAnswer": "Đ",
          "explanation": "$(x^m)^n = x^{m \\cdot n}$ và $(-1/2)^6 = 1/64$."
        },
        {
          "key": "c",
          "label": "c",
          "text": "$\\left(\\frac{3}{5}\\right)^5 : \\left(\\frac{3}{5}\\right)^2 = \\left(\\frac{3}{5}\\right)^3 = \\frac{27}{125}$.",
          "correctAnswer": "Đ",
          "explanation": "Chia hai lũy thừa cùng cơ số: $5 - 2 = 3$ và $3^3/5^3 = 27/125$."
        },
        {
          "key": "d",
          "label": "d",
          "text": "$\\left(-\\frac{1}{3}\\right)^0 = 0$.",
          "correctAnswer": "S",
          "explanation": "Quy ước: Với $x \\ne 0$ thì $x^0 = 1$ chứ không bằng 0."
        }
      ],
      "correctAnswers": [
        "A"
      ],
      "explanation": "",
      "hint": ""
    },
    {
      "id": "13_8",
      "number": 8,
      "type": "tf",
      "level": "VD",
      "grade": 7,
      "chapter": 1,
      "lessonId": "K7_C1_B2",
      "lessonName": "Bài 2: Cộng, trừ, nhân, chia số hữu tỉ",
      "topic": "Số hữu tỉ & Phép tính",
      "content": "Một bạn học sinh thực hiện phép tính: $A = \\frac{3}{7} \\cdot \\frac{5}{11} + \\frac{3}{7} \\cdot \\frac{6}{11}$.",
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem đánh giá chi tiết a, b, c, d"
        }
      ],
      "items": [
        {
          "key": "a",
          "label": "a",
          "text": "Có thể đặt $\\frac{3}{7}$ làm thừa số chung.",
          "correctAnswer": "Đ",
          "explanation": "Áp dụng tính chất phân phối: $a \\cdot b + a \\cdot c = a(b + c)$."
        },
        {
          "key": "b",
          "label": "b",
          "text": "Tổng $\\frac{5}{11} + \\frac{6}{11}$ bằng $1$.",
          "correctAnswer": "Đ",
          "explanation": "$\\frac{5 + 6}{11} = \\frac{11}{11} = 1$."
        },
        {
          "key": "c",
          "label": "c",
          "text": "Giá trị của biểu thức $A = \\frac{3}{7}$.",
          "correctAnswer": "Đ",
          "explanation": "$A = \\frac{3}{7} \\cdot 1 = \\frac{3}{7}$."
        },
        {
          "key": "d",
          "label": "d",
          "text": "Biểu thức $A$ có giá trị lớn hơn $1$.",
          "correctAnswer": "S",
          "explanation": "$\\frac{3}{7} < 1$."
        }
      ],
      "correctAnswers": [
        "A"
      ],
      "explanation": "",
      "hint": ""
    },
    {
      "id": "13_9",
      "number": 9,
      "type": "short",
      "level": "TH",
      "grade": 7,
      "chapter": 1,
      "lessonId": "K7_C1_B2",
      "lessonName": "Bài 2: Cộng, trừ, nhân, chia số hữu tỉ",
      "topic": "Số hữu tỉ & Phép tính",
      "content": "Tính giá trị của biểu thức: $P = \\left(\\frac{1}{2} - \\frac{1}{3}\\right) \\cdot 12$.",
      "options": [
        {
          "key": "Đáp số",
          "text": "2"
        }
      ],
      "correctAnswer": "2",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$\\frac{1}{2} - \\frac{1}{3} = \\frac{1}{6}$. Vậy $P = \\frac{1}{6} \\cdot 12 = 2$.",
      "hint": "Tính trong ngoặc trước rồi nhân với 12."
    },
    {
      "id": "13_10",
      "number": 10,
      "type": "short",
      "level": "VD",
      "grade": 7,
      "chapter": 1,
      "lessonId": "K7_C1_B3",
      "lessonName": "Bài 3: Lũy thừa với số mũ tự nhiên của một số hữu tỉ",
      "topic": "Số hữu tỉ & Phép tính",
      "content": "Tìm số tự nhiên $n$ thỏa mãn: $2^n = 32$.",
      "options": [
        {
          "key": "Đáp số",
          "text": "5"
        }
      ],
      "correctAnswer": "5",
      "correctAnswers": [
        "5"
      ],
      "explanation": "Ta có $32 = 2^5 \\Rightarrow 2^n = 2^5 \\Rightarrow n = 5$.",
      "hint": "Đưa 32 về lũy thừa cơ số 2."
    }
  ]
},
{
  "id": "EXAM-K7-DE2",
  "code": "DE-K7-C2-01",
  "title": "Đề số 2: Số thực & Căn bậc hai số học",
  "grade": 7,
  "subject": "Toán học 7 (KNTT)",
  "chapter": "Căn bậc hai số học, số vô tỉ, tập hợp số thực và giá trị tuyệt đối",
  "topic": "Số thực & Căn bậc hai",
  "timeMinutes": 45,
  "levelTarget": "standard",
  "description": "Căn bậc hai số học, số vô tỉ, tập hợp số thực và giá trị tuyệt đối",
  "createdAt": "2026-09-18T08:00:00.000Z",
  "createdBy": "Tổ Toán THCS",
  "questions": [
    {
      "id": "14_1",
      "number": 1,
      "type": "mcq",
      "level": "NB",
      "grade": 7,
      "chapter": 2,
      "lessonId": "K7_C2_B5",
      "lessonName": "Bài 5: Làm quen với số thập phân vô hạn tuần hoàn. Số vô tỉ",
      "topic": "Số thực & Căn bậc hai",
      "content": "Căn bậc hai số học của số $49$ là:",
      "options": [
        {
          "key": "A",
          "text": "$7$"
        },
        {
          "key": "B",
          "text": "$-7$"
        },
        {
          "key": "C",
          "text": "$\\pm 7$"
        },
        {
          "key": "D",
          "text": "$2401$"
        }
      ],
      "correctAnswer": "A",
      "correctAnswers": [
        "A"
      ],
      "explanation": "Căn bậc hai số học của số dương $a$ là số không âm $x$ sao cho $x^2 = a$. Do $7^2 = 49$ và $7 > 0$ nên $\\sqrt{49} = 7$.",
      "hint": "Căn bậc hai số học luôn là một số không âm."
    },
    {
      "id": "14_2",
      "number": 2,
      "type": "mcq",
      "level": "NB",
      "grade": 7,
      "chapter": 2,
      "lessonId": "K7_C2_B6",
      "lessonName": "Bài 6: Số thực và giá trị tuyệt đối của một số thực",
      "topic": "Số thực & Căn bậc hai",
      "content": "Giá trị tuyệt đối của $-3{,}5$ bằng:",
      "options": [
        {
          "key": "A",
          "text": "$-3{,}5$"
        },
        {
          "key": "B",
          "text": "$3{,}5$"
        },
        {
          "key": "C",
          "text": "$\\pm 3{,}5$"
        },
        {
          "key": "D",
          "text": "$0$"
        }
      ],
      "correctAnswer": "B",
      "correctAnswers": [
        "B"
      ],
      "explanation": "Giá trị tuyệt đối của một số âm là số đối của nó: $|-3{,}5| = 3{,}5$.",
      "hint": "Khoảng cách từ điểm -3,5 đến gốc 0 trên trục số."
    },
    {
      "id": "14_3",
      "number": 3,
      "type": "mcq",
      "level": "TH",
      "grade": 7,
      "chapter": 2,
      "lessonId": "K7_C2_B5",
      "lessonName": "Bài 5: Làm quen với số thập phân vô hạn tuần hoàn. Số vô tỉ",
      "topic": "Số thực & Căn bậc hai",
      "content": "Số nào sau đây là số vô tỉ?",
      "options": [
        {
          "key": "A",
          "text": "$\\sqrt{4}$"
        },
        {
          "key": "B",
          "text": "$\\frac{1}{3}$"
        },
        {
          "key": "C",
          "text": "$\\sqrt{5}$"
        },
        {
          "key": "D",
          "text": "$-0{,}25$"
        }
      ],
      "correctAnswer": "C",
      "correctAnswers": [
        "C"
      ],
      "explanation": "$\\sqrt{4} = 2 \\in \\mathbb{Q}$, $\\frac{1}{3} \\in \\mathbb{Q}$, $-0{,}25 \\in \\mathbb{Q}$. $\\sqrt{5} \\approx 2{,}236...$ là số thập phân vô hạn không tuần hoàn nên là số vô tỉ.",
      "hint": "Số vô tỉ là số viết được dưới dạng thập phân vô hạn không tuần hoàn."
    },
    {
      "id": "14_4",
      "number": 4,
      "type": "mcq",
      "level": "TH",
      "grade": 7,
      "chapter": 2,
      "lessonId": "K7_C2_B6",
      "lessonName": "Bài 6: Số thực và giá trị tuyệt đối của một số thực",
      "topic": "Số thực & Căn bậc hai",
      "content": "So sánh hai số thực $x = \\sqrt{10}$ và $y = 3$:",
      "options": [
        {
          "key": "A",
          "text": "$x > y$"
        },
        {
          "key": "B",
          "text": "$x < y$"
        },
        {
          "key": "C",
          "text": "$x = y$"
        },
        {
          "key": "D",
          "text": "Không so sánh được"
        }
      ],
      "correctAnswer": "A",
      "correctAnswers": [
        "A"
      ],
      "explanation": "Ta có $3 = \\sqrt{9}$. Do $10 > 9$ nên $\\sqrt{10} > \\sqrt{9} \\Rightarrow x > y$.",
      "hint": "Đưa số 3 về dạng căn bậc hai: $3 = \\sqrt{9}$."
    },
    {
      "id": "14_5",
      "number": 5,
      "type": "mcq",
      "level": "VD",
      "grade": 7,
      "chapter": 2,
      "lessonId": "K7_C2_B6",
      "lessonName": "Bài 6: Số thực và giá trị tuyệt đối của một số thực",
      "topic": "Số thực & Căn bậc hai",
      "content": "Tìm số thực $x$ biết $|x| = 4$ và $x < 0$:",
      "options": [
        {
          "key": "A",
          "text": "$x = 4$"
        },
        {
          "key": "B",
          "text": "$x = -4$"
        },
        {
          "key": "C",
          "text": "$x = \\pm 4$"
        },
        {
          "key": "D",
          "text": "$x = 16$"
        }
      ],
      "correctAnswer": "B",
      "correctAnswers": [
        "B"
      ],
      "explanation": "$|x| = 4 \\Leftrightarrow x = 4$ hoặc $x = -4$. Vì $x < 0$ nên $x = -4$.",
      "hint": "Chú ý điều kiện $x < 0$."
    },
    {
      "id": "14_6",
      "number": 6,
      "type": "tf",
      "level": "TH",
      "grade": 7,
      "chapter": 2,
      "lessonId": "K7_C2_B6",
      "lessonName": "Bài 6: Số thực và giá trị tuyệt đối của một số thực",
      "topic": "Số thực & Căn bậc hai",
      "content": "Xét các quan hệ giữa các tập hợp số $\\mathbb{N}, \\mathbb{Z}, \\mathbb{Q}, \\mathbb{I}, \\mathbb{R}$:",
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem đánh giá chi tiết a, b, c, d"
        }
      ],
      "items": [
        {
          "key": "a",
          "label": "a",
          "text": "Tập hợp số thực $\\mathbb{R}$ bao gồm cả số hữu tỉ và số vô tỉ.",
          "correctAnswer": "Đ",
          "explanation": "$\\mathbb{R} = \\mathbb{Q} \\cup \\mathbb{I}$."
        },
        {
          "key": "b",
          "label": "b",
          "text": "Mọi số nguyên đều là số thực.",
          "correctAnswer": "Đ",
          "explanation": "$\\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$."
        },
        {
          "key": "c",
          "label": "c",
          "text": "Giao của tập số hữu tỉ $\\mathbb{Q}$ và tập số vô tỉ $\\mathbb{I}$ là tập rỗng $\\varnothing$.",
          "correctAnswer": "Đ",
          "explanation": "Một số không thể vừa là số hữu tỉ vừa là số vô tỉ."
        },
        {
          "key": "d",
          "label": "d",
          "text": "$\\sqrt{9}$ là một số vô tỉ.",
          "correctAnswer": "S",
          "explanation": "$\\sqrt{9} = 3$ là số tự nhiên, hữu tỉ chứ không phải vô tỉ."
        }
      ],
      "correctAnswers": [
        "A"
      ],
      "explanation": "",
      "hint": ""
    },
    {
      "id": "14_7",
      "number": 7,
      "type": "tf",
      "level": "VD",
      "grade": 7,
      "chapter": 2,
      "lessonId": "K7_C2_B6",
      "lessonName": "Bài 6: Số thực và giá trị tuyệt đối của một số thực",
      "topic": "Số thực & Căn bậc hai",
      "content": "Cho biểu thức $A = |x - 3| + 5$. Xét tính đúng sai:",
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem đánh giá chi tiết a, b, c, d"
        }
      ],
      "items": [
        {
          "key": "a",
          "label": "a",
          "text": "Với mọi số thực $x$, ta luôn có $|x - 3| \\ge 0$.",
          "correctAnswer": "Đ",
          "explanation": "Giá trị tuyệt đối luôn không âm."
        },
        {
          "key": "b",
          "label": "b",
          "text": "Giá trị nhỏ nhất của biểu thức $A$ bằng $5$.",
          "correctAnswer": "Đ",
          "explanation": "$A = |x - 3| + 5 \\ge 0 + 5 = 5$."
        },
        {
          "key": "c",
          "label": "c",
          "text": "Giá trị nhỏ nhất của $A$ đạt được khi $x = 0$.",
          "correctAnswer": "S",
          "explanation": "Dấu bằng xảy ra khi $x - 3 = 0 \\Leftrightarrow x = 3$."
        },
        {
          "key": "d",
          "label": "d",
          "text": "Tại $x = -2$, giá trị của $A$ bằng $10$.",
          "correctAnswer": "Đ",
          "explanation": "Thay $x = -2 \\Rightarrow |-2 - 3| + 5 = |-5| + 5 = 5 + 5 = 10$."
        }
      ],
      "correctAnswers": [
        "A"
      ],
      "explanation": "",
      "hint": ""
    },
    {
      "id": "14_8",
      "number": 8,
      "type": "tf",
      "level": "VD",
      "grade": 7,
      "chapter": 2,
      "lessonId": "K7_C2_B5",
      "lessonName": "Bài 5: Làm quen với số thập phân vô hạn tuần hoàn. Số vô tỉ",
      "topic": "Số thực & Căn bậc hai",
      "content": "Cho tam giác vuông có hai cạnh góc vuông là $3\\text{ cm}$ và $4\\text{ cm}$.",
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem đánh giá chi tiết a, b, c, d"
        }
      ],
      "items": [
        {
          "key": "a",
          "label": "a",
          "text": "Bình phương độ dài cạnh huyền bằng $3^2 + 4^2 = 25$.",
          "correctAnswer": "Đ",
          "explanation": "Theo định lý Pythagore: $a^2 + b^2 = c^2$."
        },
        {
          "key": "b",
          "label": "b",
          "text": "Độ dài cạnh huyền bằng $\\sqrt{25} = 5\\text{ cm}$.",
          "correctAnswer": "Đ",
          "explanation": "$\\sqrt{25} = 5$."
        },
        {
          "key": "c",
          "label": "c",
          "text": "Độ dài cạnh huyền là một số vô tỉ.",
          "correctAnswer": "S",
          "explanation": "$5$ là số nguyên hữu tỉ, không phải vô tỉ."
        },
        {
          "key": "d",
          "label": "d",
          "text": "Chu vi của tam giác vuông đó là $12\\text{ cm}$.",
          "correctAnswer": "Đ",
          "explanation": "$3 + 4 + 5 = 12\\text{ cm}$."
        }
      ],
      "correctAnswers": [
        "A"
      ],
      "explanation": "",
      "hint": ""
    },
    {
      "id": "14_9",
      "number": 9,
      "type": "short",
      "level": "TH",
      "grade": 7,
      "chapter": 2,
      "lessonId": "K7_C2_B5",
      "lessonName": "Bài 5: Số vô tỉ. Căn bậc hai số học",
      "topic": "Số thực & Căn bậc hai",
      "content": "Tính giá trị của biểu thức: $M = \\sqrt{64} - \\sqrt{25}$.",
      "options": [
        {
          "key": "Đáp số",
          "text": "3"
        }
      ],
      "correctAnswer": "3",
      "correctAnswers": [
        "3"
      ],
      "explanation": "$\\sqrt{64} = 8, \\sqrt{25} = 5 \\Rightarrow M = 8 - 5 = 3$.",
      "hint": "Khai căn từng số: 8 trừ 5."
    },
    {
      "id": "14_10",
      "number": 10,
      "type": "short",
      "level": "VD",
      "grade": 7,
      "chapter": 2,
      "lessonId": "K7_C2_B6",
      "lessonName": "Bài 6: Số thực và giá trị tuyệt đối của một số thực",
      "topic": "Số thực & Căn bậc hai",
      "content": "Tìm số thực dương $x$ thỏa mãn: $x^2 = 81$.",
      "options": [
        {
          "key": "Đáp số",
          "text": "9"
        }
      ],
      "correctAnswer": "9",
      "correctAnswers": [
        "9"
      ],
      "explanation": "$x^2 = 81 \\Leftrightarrow x = 9$ hoặc $x = -9$. Do $x > 0$ nên $x = 9$.",
      "hint": "Tìm căn bậc hai số học của 81."
    }
  ]
},
{
  "id": "EXAM-K9-DE1",
  "code": "DE-K9-C1-01",
  "title": "Đề số 1: Phương trình và Hệ phương trình bậc nhất hai ẩn",
  "grade": 9,
  "subject": "Toán học 9 (KNTT)",
  "chapter": "Khái niệm phương trình bậc nhất 2 ẩn, phương pháp thế và cộng đại số",
  "topic": "Hệ phương trình bậc nhất hai ẩn",
  "timeMinutes": 45,
  "levelTarget": "standard",
  "description": "Khái niệm phương trình bậc nhất 2 ẩn, phương pháp thế và cộng đại số",
  "createdAt": "2026-09-18T08:00:00.000Z",
  "createdBy": "Tổ Toán THCS",
  "questions": [
    {
      "id": "15_1",
      "number": 1,
      "type": "mcq",
      "level": "NB",
      "grade": 9,
      "chapter": 1,
      "lessonId": "K9_C1_B1",
      "lessonName": "Bài 1: Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn",
      "topic": "Hệ phương trình bậc nhất hai ẩn",
      "content": "Phương trình nào sau đây là phương trình bậc nhất hai ẩn?",
      "options": [
        {
          "key": "A",
          "text": "$2x - 3y = 5$"
        },
        {
          "key": "B",
          "text": "$x^2 + y = 3$"
        },
        {
          "key": "C",
          "text": "$xy + 2 = 0$"
        },
        {
          "key": "D",
          "text": "$2x - \\frac{3}{y} = 1$"
        }
      ],
      "correctAnswer": "A",
      "correctAnswers": [
        "A"
      ],
      "explanation": "Phương trình bậc nhất hai ẩn có dạng $ax + by = c$ với $a, b$ không đồng thời bằng 0.",
      "hint": "Bậc của mỗi ẩn x và y phải bằng 1 và không có tích xy."
    },
    {
      "id": "15_2",
      "number": 2,
      "type": "mcq",
      "level": "NB",
      "grade": 9,
      "chapter": 1,
      "lessonId": "K9_C1_B1",
      "lessonName": "Bài 1: Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn",
      "topic": "Hệ phương trình bậc nhất hai ẩn",
      "content": "Cặp số nào sau đây là nghiệm của phương trình $2x + y = 7$?",
      "options": [
        {
          "key": "A",
          "text": "$(2; 3)$"
        },
        {
          "key": "B",
          "text": "$(3; 2)$"
        },
        {
          "key": "C",
          "text": "$(1; 4)$"
        },
        {
          "key": "D",
          "text": "$(4; 0)$"
        }
      ],
      "correctAnswer": "A",
      "correctAnswers": [
        "A"
      ],
      "explanation": "Thay $x = 2, y = 3$: $2(2) + 3 = 4 + 3 = 7$ (thỏa mãn).",
      "hint": "Thay tọa độ từng cặp (x; y) vào vế trái."
    },
    {
      "id": "15_3",
      "number": 3,
      "type": "mcq",
      "level": "TH",
      "grade": 9,
      "chapter": 1,
      "lessonId": "K9_C1_B2",
      "lessonName": "Bài 2: Giải hệ hai phương trình bậc nhất hai ẩn",
      "topic": "Hệ phương trình bậc nhất hai ẩn",
      "content": "Nghiệm của hệ phương trình $\\begin{cases} x + y = 5 \\\\ x - y = 1 \\end{cases}$ là:",
      "options": [
        {
          "key": "A",
          "text": "$(3; 2)$"
        },
        {
          "key": "B",
          "text": "$(2; 3)$"
        },
        {
          "key": "C",
          "text": "$(4; 1)$"
        },
        {
          "key": "D",
          "text": "$(5; 0)$"
        }
      ],
      "correctAnswer": "A",
      "correctAnswers": [
        "A"
      ],
      "explanation": "Cộng hai phương trình vế theo vế: $2x = 6 \\Rightarrow x = 3$. Suy ra $y = 5 - 3 = 2$.",
      "hint": "Cộng hai phương trình để khử y."
    },
    {
      "id": "15_4",
      "number": 4,
      "type": "mcq",
      "level": "TH",
      "grade": 9,
      "chapter": 1,
      "lessonId": "K9_C1_B2",
      "lessonName": "Bài 2: Giải hệ hai phương trình bậc nhất hai ẩn",
      "topic": "Hệ phương trình bậc nhất hai ẩn",
      "content": "Số nghiệm của hệ phương trình $\\begin{cases} 2x - y = 3 \\\\ 4x - 2y = 6 \\end{cases}$ là:",
      "options": [
        {
          "key": "A",
          "text": "Vô nghiệm"
        },
        {
          "key": "B",
          "text": "Có nghiệm duy nhất"
        },
        {
          "key": "C",
          "text": "Vô số nghiệm"
        },
        {
          "key": "D",
          "text": "Có đúng 2 nghiệm"
        }
      ],
      "correctAnswer": "C",
      "correctAnswers": [
        "C"
      ],
      "explanation": "Nhân phương trình thứ nhất với 2 ta được chính là phương trình thứ hai ($4x - 2y = 6$). Do đó hai đường thẳng trùng nhau nên hệ có vô số nghiệm.",
      "hint": "Xét tỉ lệ các hệ số: $\\frac{2}{4} = \\frac{-1}{-2} = \\frac{3}{6}$."
    },
    {
      "id": "15_5",
      "number": 5,
      "type": "mcq",
      "level": "VD",
      "grade": 9,
      "chapter": 1,
      "lessonId": "K9_C1_B3",
      "lessonName": "Bài 3: Giải bài toán bằng cách lập hệ phương trình",
      "topic": "Hệ phương trình bậc nhất hai ẩn",
      "content": "Hai bạn An và Bình có tổng cộng $50$ viên bi. An cho Bình $5$ viên bi thì số bi của An gấp đôi số bi của Bình. Ban đầu An có bao nhiêu viên bi?",
      "options": [
        {
          "key": "A",
          "text": "$35$"
        },
        {
          "key": "B",
          "text": "$30$"
        },
        {
          "key": "C",
          "text": "$40$"
        },
        {
          "key": "D",
          "text": "$25$"
        }
      ],
      "correctAnswer": "A",
      "correctAnswers": [
        "A"
      ],
      "explanation": "Gọi số bi của An là $x$, Bình là $y$ ($x + y = 50$). Sau khi cho: $x - 5 = 2(y + 5) \\Leftrightarrow x - 2y = 15$. Giải hệ ta được $x = 35, y = 15$.",
      "hint": "Lập hệ: $x + y = 50$ và $x - 5 = 2(y + 5)$."
    },
    {
      "id": "15_6",
      "number": 6,
      "type": "tf",
      "level": "TH",
      "grade": 9,
      "chapter": 1,
      "lessonId": "K9_C1_B2",
      "lessonName": "Bài 2: Giải hệ hai phương trình bậc nhất hai ẩn",
      "topic": "Hệ phương trình bậc nhất hai ẩn",
      "content": "Cho hệ phương trình $\\begin{cases} 2x + 3y = 7 \\\\ 3x - y = 5 \\end{cases}$.",
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem đánh giá chi tiết a, b, c, d"
        }
      ],
      "items": [
        {
          "key": "a",
          "label": "a",
          "text": "Từ phương trình (2) có thể rút ra $y = 3x - 5$.",
          "correctAnswer": "Đ",
          "explanation": "$3x - y = 5 \\Rightarrow y = 3x - 5$."
        },
        {
          "key": "b",
          "label": "b",
          "text": "Thế $y = 3x - 5$ vào (1) ta được phương trình một ẩn $11x - 15 = 7$.",
          "correctAnswer": "Đ",
          "explanation": "$2x + 3(3x - 5) = 2x + 9x - 15 = 11x - 15 = 7$."
        },
        {
          "key": "c",
          "label": "c",
          "text": "Giá trị của ẩn $x$ tìm được bằng $2$.",
          "correctAnswer": "Đ",
          "explanation": "$11x = 22 \\Rightarrow x = 2$."
        },
        {
          "key": "d",
          "label": "d",
          "text": "Nghiệm của hệ phương trình đã cho là $(x; y) = (2; -1)$.",
          "correctAnswer": "S",
          "explanation": "Với $x = 2 \\Rightarrow y = 3(2) - 5 = 1$. Nghiệm là $(2; 1)$, không phải $(2; -1)$."
        }
      ],
      "correctAnswers": [
        "A"
      ],
      "explanation": "",
      "hint": ""
    },
    {
      "id": "15_7",
      "number": 7,
      "type": "tf",
      "level": "VD",
      "grade": 9,
      "chapter": 1,
      "lessonId": "K9_C1_B2",
      "lessonName": "Bài 2: Giải hệ hai phương trình bậc nhất hai ẩn",
      "topic": "Hệ phương trình bậc nhất hai ẩn",
      "content": "Cho hệ phương trình có chứa tham số $m$: $\\begin{cases} mx + y = 3 \\\\ x + y = 1 \\end{cases}$.",
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem đánh giá chi tiết a, b, c, d"
        }
      ],
      "items": [
        {
          "key": "a",
          "label": "a",
          "text": "Khi $m = 1$, hệ phương trình vô nghiệm.",
          "correctAnswer": "Đ",
          "explanation": "Khi $m = 1$, hệ thành $x + y = 3$ và $x + y = 1$ (vô lý)."
        },
        {
          "key": "b",
          "label": "b",
          "text": "Khi $m \\ne 1$, hệ phương trình luôn có nghiệm duy nhất.",
          "correctAnswer": "Đ",
          "explanation": "Định thức hệ số $D = m(1) - 1(1) = m - 1 \\ne 0$ khi $m \\ne 1$."
        },
        {
          "key": "c",
          "label": "c",
          "text": "Khi $m = 2$, nghiệm của hệ phương trình là $(2; -1)$.",
          "correctAnswer": "Đ",
          "explanation": "Trừ vế: $x = 2 \\Rightarrow y = 1 - 2 = -1$."
        },
        {
          "key": "d",
          "label": "d",
          "text": "Tồn tại giá trị của $m$ để hệ phương trình có vô số nghiệm.",
          "correctAnswer": "S",
          "explanation": "Để vô số nghiệm thì $m = 1$ và $3/1 = 1/1$ (vô lý vì $3 \\ne 1$). Vậy không thể vô số nghiệm."
        }
      ],
      "correctAnswers": [
        "A"
      ],
      "explanation": "",
      "hint": ""
    },
    {
      "id": "15_8",
      "number": 8,
      "type": "tf",
      "level": "VD",
      "grade": 9,
      "chapter": 1,
      "lessonId": "K9_C1_B3",
      "lessonName": "Bài 3: Giải bài toán bằng cách lập hệ phương trình",
      "topic": "Hệ phương trình bậc nhất hai ẩn",
      "content": "Một hình chữ nhật có chu vi $28\\text{ m}$. Nếu tăng chiều dài thêm $2\\text{ m}$ và giảm chiều rộng đi $1\\text{ m}$ thì diện tích không đổi.",
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem đánh giá chi tiết a, b, c, d"
        }
      ],
      "items": [
        {
          "key": "a",
          "label": "a",
          "text": "Nửa chu vi của hình chữ nhật là $14\\text{ m}$.",
          "correctAnswer": "Đ",
          "explanation": "Nửa chu vi = $28 / 2 = 14\\text{ m}$."
        },
        {
          "key": "b",
          "label": "b",
          "text": "Gọi chiều dài là $x$ và chiều rộng là $y$ thì $x + y = 14$ ($x > y > 0$).",
          "correctAnswer": "Đ",
          "explanation": "Đúng theo dữ kiện nửa chu vi."
        },
        {
          "key": "c",
          "label": "c",
          "text": "Chiều dài của mảnh vườn là $8\\text{ m}$ và chiều rộng là $6\\text{ m}$.",
          "correctAnswer": "Đ",
          "explanation": "$(x + 2)(y - 1) = xy \\Rightarrow 2y - x = 2$. Kết hợp $x + y = 14 \\Rightarrow 3y = 16$ (xem lại: $(8+2)(6-1) = 10 \\times 5 = 50 \\ne 48$)."
        },
        {
          "key": "d",
          "label": "d",
          "text": "Diện tích ban đầu của hình chữ nhật bằng $48\\text{ m}^2$.",
          "correctAnswer": "S",
          "explanation": "Giải hệ: $x+y=14$ và $2y - x = 2 \\Rightarrow 3y = 16 \\Rightarrow y = 16/3$ m."
        }
      ],
      "correctAnswers": [
        "A"
      ],
      "explanation": "",
      "hint": ""
    },
    {
      "id": "15_9",
      "number": 9,
      "type": "short",
      "level": "TH",
      "grade": 9,
      "chapter": 1,
      "lessonId": "K9_C1_B2",
      "lessonName": "Bài 2: Giải hệ hai phương trình bậc nhất hai ẩn",
      "topic": "Hệ phương trình bậc nhất hai ẩn",
      "content": "Tìm giá trị của $x$ trong nghiệm $(x; y)$ của hệ phương trình: $\\begin{cases} 3x + 2y = 8 \\\\ 2x - 2y = 2 \\end{cases}$.",
      "options": [
        {
          "key": "Đáp số",
          "text": "2"
        }
      ],
      "correctAnswer": "2",
      "correctAnswers": [
        "2"
      ],
      "explanation": "Cộng hai phương trình: $5x = 10 \\Rightarrow x = 2$.",
      "hint": "Cộng hai vế để triệt tiêu biến y."
    },
    {
      "id": "15_10",
      "number": 10,
      "type": "short",
      "level": "VD",
      "grade": 9,
      "chapter": 1,
      "lessonId": "K9_C1_B3",
      "lessonName": "Bài 3: Giải bài toán bằng cách lập hệ phương trình",
      "topic": "Hệ phương trình bậc nhất hai ẩn",
      "content": "Tìm hai số có tổng bằng $25$ và hiệu bằng $7$. Giá trị của số lớn bằng bao nhiêu?",
      "options": [
        {
          "key": "Đáp số",
          "text": "16"
        }
      ],
      "correctAnswer": "16",
      "correctAnswers": [
        "16"
      ],
      "explanation": "Số lớn là: $(25 + 7) : 2 = 32 : 2 = 16$.",
      "hint": "Số lớn = (Tổng + Hiệu) / 2."
    }
  ]
},
{
  "id": "EXAM-K9-DE2",
  "code": "DE-K9-C2-01",
  "title": "Đề số 2: Phương trình bậc hai một ẩn và Định lý Viète",
  "grade": 9,
  "subject": "Toán học 9 (KNTT)",
  "chapter": "Công thức nghiệm, tính biệt thức Delta và ứng dụng định lý Viète",
  "topic": "Phương trình bậc hai & Viète",
  "timeMinutes": 45,
  "levelTarget": "standard",
  "description": "Công thức nghiệm, tính biệt thức Delta và ứng dụng định lý Viète",
  "createdAt": "2026-09-18T08:00:00.000Z",
  "createdBy": "Tổ Toán THCS",
  "questions": [
    {
      "id": "16_1",
      "number": 1,
      "type": "mcq",
      "level": "NB",
      "grade": 9,
      "chapter": 2,
      "lessonId": "K9_C2_B6",
      "lessonName": "Bài 6: Phương trình bậc hai một ẩn",
      "topic": "Phương trình bậc hai & Viète",
      "content": "Biệt thức $\\Delta$ của phương trình bậc hai $ax^2 + bx + c = 0$ ($a \\ne 0$) là:",
      "options": [
        {
          "key": "A",
          "text": "$\\Delta = b^2 - 4ac$"
        },
        {
          "key": "B",
          "text": "$\\Delta = b^2 - ac$"
        },
        {
          "key": "C",
          "text": "$\\Delta = b^2 + 4ac$"
        },
        {
          "key": "D",
          "text": "$\\Delta = 4ac - b^2$"
        }
      ],
      "correctAnswer": "A",
      "correctAnswers": [
        "A"
      ],
      "explanation": "Theo công thức nghiệm, $\\Delta = b^2 - 4ac$.",
      "hint": "Xem lại công thức biệt thức Delta."
    },
    {
      "id": "16_2",
      "number": 2,
      "type": "mcq",
      "level": "NB",
      "grade": 9,
      "chapter": 2,
      "lessonId": "K9_C2_B6",
      "lessonName": "Bài 6: Phương trình bậc hai một ẩn",
      "topic": "Phương trình bậc hai & Viète",
      "content": "Phương trình $x^2 - 4x + 4 = 0$ có bao nhiêu nghiệm?",
      "options": [
        {
          "key": "A",
          "text": "Có nghiệm kép"
        },
        {
          "key": "B",
          "text": "Có hai nghiệm phân biệt"
        },
        {
          "key": "C",
          "text": "Vô nghiệm"
        },
        {
          "key": "D",
          "text": "Có vô số nghiệm"
        }
      ],
      "correctAnswer": "A",
      "correctAnswers": [
        "A"
      ],
      "explanation": "$\\Delta' = (-2)^2 - 1 \\cdot 4 = 0 \\Rightarrow$ phương trình có nghiệm kép $x_1 = x_2 = 2$.",
      "hint": "Nhận dạng hằng đẳng thức $(x - 2)^2 = 0$."
    },
    {
      "id": "16_3",
      "number": 3,
      "type": "mcq",
      "level": "TH",
      "grade": 9,
      "chapter": 2,
      "lessonId": "K9_C2_B7",
      "lessonName": "Bài 7: Định lý Viète và ứng dụng",
      "topic": "Phương trình bậc hai & Viète",
      "content": "Nếu $x_1, x_2$ là hai nghiệm của phương trình $x^2 - 7x + 12 = 0$ thì tổng $S = x_1 + x_2$ và tích $P = x_1 x_2$ là:",
      "options": [
        {
          "key": "A",
          "text": "$S = 7; P = 12$"
        },
        {
          "key": "B",
          "text": "$S = -7; P = 12$"
        },
        {
          "key": "C",
          "text": "$S = 7; P = -12$"
        },
        {
          "key": "D",
          "text": "$S = 12; P = 7$"
        }
      ],
      "correctAnswer": "A",
      "correctAnswers": [
        "A"
      ],
      "explanation": "Theo định lý Viète: $S = -\\frac{b}{a} = -\\frac{-7}{1} = 7$ và $P = \\frac{c}{a} = \\frac{12}{1} = 12$.",
      "hint": "$S = -b/a, P = c/a$."
    },
    {
      "id": "16_4",
      "number": 4,
      "type": "mcq",
      "level": "TH",
      "grade": 9,
      "chapter": 2,
      "lessonId": "K9_C2_B6",
      "lessonName": "Bài 6: Phương trình bậc hai một ẩn",
      "topic": "Phương trình bậc hai & Viète",
      "content": "Tập nghiệm của phương trình $x^2 - 5x = 0$ là:",
      "options": [
        {
          "key": "A",
          "text": "$S = \\{0; 5\\}$"
        },
        {
          "key": "B",
          "text": "$S = \\{5\\}$"
        },
        {
          "key": "C",
          "text": "$S = \\{0; -5\\}$"
        },
        {
          "key": "D",
          "text": "$S = \\{-5\\}$"
        }
      ],
      "correctAnswer": "A",
      "correctAnswers": [
        "A"
      ],
      "explanation": "$x(x - 5) = 0 \\Leftrightarrow x = 0$ hoặc $x = 5$.",
      "hint": "Đặt x làm nhân tử chung."
    },
    {
      "id": "16_5",
      "number": 5,
      "type": "mcq",
      "level": "VD",
      "grade": 9,
      "chapter": 2,
      "lessonId": "K9_C2_B7",
      "lessonName": "Bài 7: Định lý Viète và ứng dụng",
      "topic": "Phương trình bậc hai & Viète",
      "content": "Gọi $x_1, x_2$ là hai nghiệm của phương trình $x^2 - 3x - 4 = 0$. Giá trị của biểu thức $M = x_1^2 + x_2^2$ bằng:",
      "options": [
        {
          "key": "A",
          "text": "$17$"
        },
        {
          "key": "B",
          "text": "$1$"
        },
        {
          "key": "C",
          "text": "$9$"
        },
        {
          "key": "D",
          "text": "$25$"
        }
      ],
      "correctAnswer": "A",
      "correctAnswers": [
        "A"
      ],
      "explanation": "Ta có $S = 3, P = -4$. Biểu thức $M = (x_1 + x_2)^2 - 2x_1 x_2 = S^2 - 2P = 3^2 - 2(-4) = 9 + 8 = 17$.",
      "hint": "Biến đổi $x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2$."
    },
    {
      "id": "16_6",
      "number": 6,
      "type": "tf",
      "level": "TH",
      "grade": 9,
      "chapter": 2,
      "lessonId": "K9_C2_B6",
      "lessonName": "Bài 6: Phương trình bậc hai một ẩn",
      "topic": "Phương trình bậc hai & Viète",
      "content": "Cho phương trình bậc hai $2x^2 - 5x + 2 = 0$.",
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem đánh giá chi tiết a, b, c, d"
        }
      ],
      "items": [
        {
          "key": "a",
          "label": "a",
          "text": "Biệt thức $\\Delta$ của phương trình bằng $9$.",
          "correctAnswer": "Đ",
          "explanation": "$\\Delta = (-5)^2 - 4(2)(2) = 25 - 16 = 9$."
        },
        {
          "key": "b",
          "label": "b",
          "text": "Phương trình có hai nghiệm phân biệt.",
          "correctAnswer": "Đ",
          "explanation": "Vì $\\Delta = 9 > 0$ nên phương trình có hai nghiệm phân biệt."
        },
        {
          "key": "c",
          "label": "c",
          "text": "Một trong hai nghiệm của phương trình là $x = 2$.",
          "correctAnswer": "Đ",
          "explanation": "$x_1 = (5 + 3)/4 = 2$."
        },
        {
          "key": "d",
          "label": "d",
          "text": "Nghiệm còn lại của phương trình là số âm.",
          "correctAnswer": "S",
          "explanation": "$x_2 = (5 - 3)/4 = 2/4 = 1/2 > 0$."
        }
      ],
      "correctAnswers": [
        "A"
      ],
      "explanation": "",
      "hint": ""
    },
    {
      "id": "16_7",
      "number": 7,
      "type": "tf",
      "level": "VD",
      "grade": 9,
      "chapter": 2,
      "lessonId": "K9_C2_B7",
      "lessonName": "Bài 7: Định lý Viète và ứng dụng",
      "topic": "Phương trình bậc hai & Viète",
      "content": "Cho phương trình $x^2 - 2(m-1)x + 2m - 5 = 0$ ($m$ là tham số).",
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem đánh giá chi tiết a, b, c, d"
        }
      ],
      "items": [
        {
          "key": "a",
          "label": "a",
          "text": "Biệt thức $\\Delta' = (m-1)^2 - (2m - 5) = m^2 - 4m + 6$.",
          "correctAnswer": "Đ",
          "explanation": "$\\Delta' = m^2 - 2m + 1 - 2m + 5 = m^2 - 4m + 6$."
        },
        {
          "key": "b",
          "label": "b",
          "text": "Ta có $\\Delta' = (m-2)^2 + 2 > 0$ với mọi số thực $m$.",
          "correctAnswer": "Đ",
          "explanation": "$m^2 - 4m + 4 + 2 = (m - 2)^2 + 2 \\ge 2 > 0$."
        },
        {
          "key": "c",
          "label": "c",
          "text": "Phương trình luôn có hai nghiệm phân biệt với mọi giá trị của $m$.",
          "correctAnswer": "Đ",
          "explanation": "Vì $\\Delta' > 0$ với mọi $m$."
        },
        {
          "key": "d",
          "label": "d",
          "text": "Khi $m = 2$, tích hai nghiệm của phương trình bằng $0$.",
          "correctAnswer": "S",
          "explanation": "Tích $P = 2m - 5$. Khi $m = 2 \\Rightarrow P = 2(2) - 5 = -1 \\ne 0$."
        }
      ],
      "correctAnswers": [
        "A"
      ],
      "explanation": "",
      "hint": ""
    },
    {
      "id": "16_8",
      "number": 8,
      "type": "tf",
      "level": "VD",
      "grade": 9,
      "chapter": 2,
      "lessonId": "K9_C2_B7",
      "lessonName": "Bài 7: Định lý Viète và ứng dụng",
      "topic": "Phương trình bậc hai & Viète",
      "content": "Xét việc nhẩm nghiệm của phương trình bậc hai:",
      "options": [
        {
          "key": "A",
          "text": "Tất cả các ý đều đúng"
        },
        {
          "key": "B",
          "text": "Xem đánh giá chi tiết a, b, c, d"
        }
      ],
      "items": [
        {
          "key": "a",
          "label": "a",
          "text": "Phương trình $x^2 - 3x + 2 = 0$ có $a + b + c = 1 - 3 + 2 = 0$.",
          "correctAnswer": "Đ",
          "explanation": "Tổng các hệ số bằng 0."
        },
        {
          "key": "b",
          "label": "b",
          "text": "Phương trình trên có một nghiệm $x_1 = 1$ và $x_2 = 2$.",
          "correctAnswer": "Đ",
          "explanation": "Nếu $a+b+c=0$ thì $x_1=1, x_2=c/a=2$."
        },
        {
          "key": "c",
          "label": "c",
          "text": "Phương trình $x^2 + 5x + 4 = 0$ có $a - b + c = 1 - 5 + 4 = 0$.",
          "correctAnswer": "Đ",
          "explanation": "Đúng theo công thức nhẩm nghiệm $a - b + c = 0$."
        },
        {
          "key": "d",
          "label": "d",
          "text": "Phương trình $x^2 + 5x + 4 = 0$ có nghiệm $x = 1$.",
          "correctAnswer": "S",
          "explanation": "Khi $a - b + c = 0$ thì $x_1 = -1$ và $x_2 = -4$."
        }
      ],
      "correctAnswers": [
        "A"
      ],
      "explanation": "",
      "hint": ""
    },
    {
      "id": "16_9",
      "number": 9,
      "type": "short",
      "level": "TH",
      "grade": 9,
      "chapter": 2,
      "lessonId": "K9_C2_B6",
      "lessonName": "Bài 6: Phương trình bậc hai một ẩn",
      "topic": "Phương trình bậc hai & Viète",
      "content": "Tính giá trị của biệt thức $\\Delta$ của phương trình: $x^2 - 6x + 8 = 0$.",
      "options": [
        {
          "key": "Đáp số",
          "text": "4"
        }
      ],
      "correctAnswer": "4",
      "correctAnswers": [
        "4"
      ],
      "explanation": "$\\Delta = (-6)^2 - 4(1)(8) = 36 - 32 = 4$.",
      "hint": "Áp dụng $\\Delta = b^2 - 4ac$."
    },
    {
      "id": "16_10",
      "number": 10,
      "type": "short",
      "level": "VD",
      "grade": 9,
      "chapter": 2,
      "lessonId": "K9_C2_B7",
      "lessonName": "Bài 7: Định lý Viète và ứng dụng",
      "topic": "Phương trình bậc hai & Viète",
      "content": "Biết phương trình $x^2 - 5x + q = 0$ có một nghiệm bằng $2$. Tìm nghiệm còn lại.",
      "options": [
        {
          "key": "Đáp số",
          "text": "3"
        }
      ],
      "correctAnswer": "3",
      "correctAnswers": [
        "3"
      ],
      "explanation": "Theo Viète, $x_1 + x_2 = 5 \\Rightarrow 2 + x_2 = 5 \\Rightarrow x_2 = 3$.",
      "hint": "Tổng hai nghiệm bằng 5."
    }
  ]
}
];

  // --- NHIỆM VỤ MẪU (DEFAULT TASKS) ---
  const DEFAULT_TASKS = [
    {
      taskId: "TASK-8A1-01",
      examId: "EXAM-K8-001",
      examTitle: "Đề kiểm tra 15 phút: Đơn thức và Đa thức nhiều biến",
      grade: 8,
      assignedClass: "8A1",
      teacherName: "Thầy Gem",
      assignedDate: "2026-09-18T08:15:00.000Z",
      dueDate: "2026-09-25T23:59:59.000Z",
      status: "active",
      note: "Các em làm bài cẩn thận, có thể hỏi gia sư AI khi gặp bế tắc."
    },
    {
      taskId: "TASK-6B-01",
      examId: "EXAM-K6-001",
      examTitle: "Đề tổng ôn Toán 6: Tập hợp & Số tự nhiên (Bài 1 - Bài 4)",
      grade: 6,
      assignedClass: "6B",
      teacherName: "Cô Lan",
      assignedDate: "2026-09-18T08:30:00.000Z",
      dueDate: "2026-09-22T23:59:59.000Z",
      status: "active",
      note: "Bài tập rèn luyện cuối tuần."
    }
  ];

  // --- BÀI NỘP MẪU ĐẦU TIÊN (SEEDED SUBMISSIONS) ---
  const DEFAULT_SUBMISSIONS = [
    {
      submissionId: "SUB-1726650001",
      taskId: "TASK-8A1-01",
      examId: "EXAM-K8-001",
      examTitle: "Đề kiểm tra 15 phút: Đơn thức và Đa thức nhiều biến",
      studentName: "Trần Minh Quân",
      className: "8A1",
      teacherName: "Thầy Gem",
      score: 10,
      correctCount: 5,
      totalQuestions: 5,
      timeSpentSeconds: 420,
      submittedAt: "2026-09-18T08:45:00.000Z",
      aiFeedback: "Xuất sắc! Nắm rất vững khái niệm đơn thức thu gọn và hằng đẳng thức.",
      answersDetail: [
        { questionId: "t8_c1_01", selected: "B", correct: "B", isCorrect: true },
        { questionId: "t8_c1_02", selected: "B", correct: "B", isCorrect: true },
        { questionId: "t8_c1_03", selected: "A", correct: "A", isCorrect: true },
        { questionId: "t8_c1_04", selected: "C", correct: "C", isCorrect: true },
        { questionId: "t8_c1_05", selected: "B", correct: "B", isCorrect: true }
      ]
    },
    {
      submissionId: "SUB-1726650002",
      taskId: "TASK-8A1-01",
      examId: "EXAM-K8-001",
      examTitle: "Đề kiểm tra 15 phút: Đơn thức và Đa thức nhiều biến",
      studentName: "Lê Ngọc Mai",
      className: "8A1",
      teacherName: "Thầy Gem",
      score: 8,
      correctCount: 4,
      totalQuestions: 5,
      timeSpentSeconds: 510,
      submittedAt: "2026-09-18T09:10:00.000Z",
      aiFeedback: "Khá tốt. Cần lưu ý phép cộng trừ hệ số của đơn thức đồng dạng (câu 4).",
      answersDetail: [
        { questionId: "t8_c1_01", selected: "B", correct: "B", isCorrect: true },
        { questionId: "t8_c1_02", selected: "B", correct: "B", isCorrect: true },
        { questionId: "t8_c1_03", selected: "A", correct: "A", isCorrect: true },
        { questionId: "t8_c1_04", selected: "B", correct: "C", isCorrect: false },
        { questionId: "t8_c1_05", selected: "B", correct: "B", isCorrect: true }
      ]
    }
  ];

  // Helper đọc LocalStorage an toàn
  function getStorage(key, fallback) {
    try {
      if (typeof localStorage !== 'undefined') {
        const item = localStorage.getItem(key);
        if (item) return JSON.parse(item);
      }
    } catch (e) {
      console.warn('[ExamSyncEngine] Read storage failed:', key, e);
    }
    return fallback;
  }

  // Helper ghi LocalStorage an toàn
  function setStorage(key, value) {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (e) {
      console.warn('[ExamSyncEngine] Write storage failed:', key, e);
    }
  }

  // Helper phát tin nhắn tới các tab khác
  function broadcast(type, payload) {
    if (broadcastChannel) {
      try {
        broadcastChannel.postMessage({ type, payload, timestamp: Date.now() });
      } catch (e) {
        console.warn('[ExamSyncEngine] Broadcast failed:', e);
      }
    }
  }

  // Khởi tạo dữ liệu ban đầu nếu chưa có
  function initEngine() {
    let exams = getStorage(STORAGE_KEYS.EXAMS, null);
    if (!exams || !Array.isArray(exams) || exams.length === 0) {
      setStorage(STORAGE_KEYS.EXAMS, DEFAULT_EXAMS);
    } else {
      let changed = false;
      DEFAULT_EXAMS.forEach(defExam => {
        const found = exams.some(e => e.id === defExam.id || e.code === defExam.code);
        if (!found) {
          exams.push(defExam);
          changed = true;
        }
      });
      if (changed) {
        setStorage(STORAGE_KEYS.EXAMS, exams);
      }
    }

    let tasks = getStorage(STORAGE_KEYS.TASKS, null);
    if (!tasks || !Array.isArray(tasks)) {
      setStorage(STORAGE_KEYS.TASKS, DEFAULT_TASKS);
    }

    let subs = getStorage(STORAGE_KEYS.SUBMISSIONS, null);
    if (!subs || !Array.isArray(subs)) {
      setStorage(STORAGE_KEYS.SUBMISSIONS, DEFAULT_SUBMISSIONS);
    }
  }

  // Chạy khởi tạo ngay
  initEngine();

  // ===========================================================================
  // PUBLIC API CỦA ENGINE
  // ===========================================================================
  const Engine = {
    // 1. QUẢN LÝ KHO ĐỀ THI (EXAM REPOSITORY)
    getAllExams: function() {
      let exams = getStorage(STORAGE_KEYS.EXAMS, DEFAULT_EXAMS);
      if (typeof window !== 'undefined' && window.QuestionParser && typeof window.QuestionParser.autoRepairQuestions === 'function') {
        exams = window.QuestionParser.autoRepairQuestions(exams);
      }
      return exams;
    },

    getExamById: function(examId) {
      const exams = this.getAllExams();
      return exams.find(e => e.id === examId || e.code === examId) || null;
    },

    saveExam: function(examData) {
      let exams = this.getAllExams();
      if (!examData.id) {
        examData.id = "EXAM-" + Date.now();
      }
      if (!examData.createdAt) {
        examData.createdAt = new Date().toISOString();
      }

      const existingIndex = exams.findIndex(e => e.id === examData.id);
      if (existingIndex >= 0) {
        exams[existingIndex] = examData;
      } else {
        exams.unshift(examData);
      }
      setStorage(STORAGE_KEYS.EXAMS, exams);
      broadcast('EXAM_UPDATED', examData);
      return examData;
    },

    deleteExam: function(examId) {
      let exams = this.getAllExams();
      exams = exams.filter(e => e.id !== examId);
      setStorage(STORAGE_KEYS.EXAMS, exams);
      broadcast('EXAM_DELETED', { examId });
      return true;
    },

        // 2. BỘ TẠO ĐỀ TỰ ĐỘNG THÔNG MINH (AUTO EXAM MATRIX GENERATOR)
    generateAutoExam: function(options) {
      const grade = Number(options.grade) || 8;
      const nbCount = Number(options.nbCount) || 3;
      const thCount = Number(options.thCount) || 3;
      const vdCount = Number(options.vdCount) || 3;
      const vdcCount = Number(options.vdcCount) || 1;
      const totalRequested = nbCount + thCount + vdCount + vdcCount;
      const timeMinutes = Number(options.timeMinutes) || 15;
      const title = options.title || `Đề kiểm tra tự động Toán ${grade} - KNTT`;
      const createdBy = options.createdBy || "Bộ Tạo Đề Thông Minh AI";
      const targetChapter = (options.chapter || '').toLowerCase().trim();
      const targetLessonId = (options.lessonId && options.lessonId !== 'ALL') ? options.lessonId : null;
      const targetClass = options.targetClass || null;
      const dedupClass = !!options.dedupClass;

      let classUsedIds = new Set();
      if (dedupClass && targetClass) {
        classUsedIds = new Set(this.getClassQuestionHistory(targetClass));
      }

      let questionPool = [];

      function formatQuestion(q, sourceExam) {
        return {
          id: q.id || ("Q_" + Math.random().toString(36).substr(2, 9)),
          number: q.number,
          type: q.type || 'mcq',
          level: (q.level || 'NB').toUpperCase(),
          grade: grade,
          chapter: q.chapter || (sourceExam ? sourceExam.chapter : null) || 1,
          lessonId: q.lessonId || (sourceExam ? sourceExam.lessonId : null) || null,
          lessonName: q.lessonName || (sourceExam ? sourceExam.lessonName : null) || '',
          topic: q.lessonName || (sourceExam ? (sourceExam.topic || sourceExam.title) : ''),
          content: q.content || q.prompt || "",
          options: q.options || [],
          items: q.items || [],
          correctAnswer: q.correctAnswer || (q.options && q.options[0] ? q.options[0].key : "A"),
          correctAnswers: q.correctAnswers || (q.correctAnswer ? [q.correctAnswer] : ["A"]),
          hint: q.hint || "Hãy quan sát kĩ dữ kiện đầu bài và áp dụng quy tắc bài học.",
          explanation: q.explanation || "Thực hiện các bước biến đổi theo định nghĩa và công thức SGK Kết nối tri thức."
        };
      }

      // 1. Lấy từ EXAM_DATA (ĐÃ LỌC CHẶT CHẼ THEO GRADE)
      let examDataSource = [];
      if (typeof window !== 'undefined' && window.EXAM_DATA && Array.isArray(window.EXAM_DATA)) {
        examDataSource = window.EXAM_DATA;
      } else if (typeof EXAM_DATA !== 'undefined' && Array.isArray(EXAM_DATA)) {
        examDataSource = EXAM_DATA;
      }

      examDataSource.forEach(exam => {
        const examGrade = Number(exam.gradeNum) || (exam.grade && exam.grade.includes('8') ? 8 : 6);
        if (examGrade !== grade) return; // BỎ QUA KHỐI KHÁC!

        if (exam.parts) {
          exam.parts.forEach(p => {
            if (p.questions) {
              p.questions.forEach(q => {
                if (q.grade && Number(q.grade) !== grade) return;
                const formatted = formatQuestion(q, exam);
                if (!questionPool.some(x => x.id === formatted.id || (x.content && x.content.trim() === formatted.content.trim()))) {
                  questionPool.push(formatted);
                }
              });
            }
          });
        }
      });

      // 2. Lấy từ DEFAULT_EXAMS (ĐÃ LỌC CHẶT CHẼ THEO GRADE)
      DEFAULT_EXAMS.forEach(e => {
        const defGrade = Number(e.grade) || (e.subject && e.subject.includes('8') ? 8 : 6);
        if (defGrade !== grade) return; // BỎ QUA KHỐI KHÁC!

        if (e.questions) {
          e.questions.forEach(q => {
            if (q.grade && Number(q.grade) !== grade) return;
            const formatted = formatQuestion(q, e);
            if (!questionPool.some(x => x.id === formatted.id || (x.content && x.content.trim() === formatted.content.trim()))) {
              questionPool.push(formatted);
            }
          });
        }
      });

      // 3. Lọc theo Bài học cụ thể nếu giáo viên chọn
      let activePool = questionPool;
      if (targetLessonId) {
        const lessonFiltered = questionPool.filter(q => {
          if (q.lessonId && q.lessonId === targetLessonId) return true;
          if (q.id && q.id.includes(targetLessonId)) return true;
          return false;
        });
        if (lessonFiltered.length > 0) {
          activePool = lessonFiltered;
        }
      } else if (targetChapter && !targetChapter.includes('tổng hợp') && !targetChapter.includes('toàn bộ') && !targetChapter.includes('all')) {
        // Lọc theo Chương / Chủ đề SGK KNTT
        const keywords = [];
        const chapLower = targetChapter.toLowerCase();
        if (chapLower.includes('đa thức')) keywords.push('đa thức', 'đơn thức');
        if (chapLower.includes('hằng đẳng thức')) keywords.push('hằng đẳng thức', 'bình phương', 'lập phương', 'nhân tử');
        if (chapLower.includes('tứ giác')) keywords.push('tứ giác', 'hình thang', 'hình bình hành', 'hình chữ nhật', 'hình thoi', 'hình vuông');
        if (chapLower.includes('thalès') || chapLower.includes('thales')) keywords.push('thalès', 'thales', 'đường trung bình', 'phân giác', 'tỉ lệ');
        if (chapLower.includes('dữ liệu') || chapLower.includes('biểu đồ')) keywords.push('dữ liệu', 'biểu đồ', 'thống kê', 'phân loại dữ liệu');
        if (chapLower.includes('phân thức')) keywords.push('phân thức', 'mẫu thức', 'tử thức');
        if (chapLower.includes('phương trình') || chapLower.includes('hàm số')) keywords.push('phương trình', 'hàm số', 'đồ thị', 'hệ số góc', 'bậc nhất');
        if (chapLower.includes('biến cố') || chapLower.includes('xác suất')) keywords.push('biến cố', 'xác suất', 'kết quả thuận lợi', 'thực nghiệm');
        if (chapLower.includes('đồng dạng') || chapLower.includes('pythagore')) keywords.push('đồng dạng', 'pythagore', 'tam giác vuông');
        if (chapLower.includes('hình khối') || chapLower.includes('hình chóp')) keywords.push('hình chóp', 'tam giác đều', 'tứ giác đều', 'thể tích');
        if (chapLower.includes('tập hợp')) keywords.push('tập hợp', 'số tự nhiên');
        if (chapLower.includes('chia hết')) keywords.push('chia hết', 'nguyên tố', 'ước chung', 'bội chung');

        const chapterFiltered = questionPool.filter(q => {
          const chapterStr = (q.chapter ? String(q.chapter) : '').toLowerCase();
          const topicStr = (q.topic || '').toLowerCase();
          const contentStr = (q.content || '').toLowerCase();
          return keywords.some(kw => chapterStr.includes(kw) || topicStr.includes(kw) || contentStr.includes(kw));
        });

        if (chapterFiltered.length >= Math.min(6, totalRequested)) {
          activePool = chapterFiltered;
        }
      }

      // Phân chia theo mức độ
      let nbPool = activePool.filter(q => q.level === 'NB');
      let thPool = activePool.filter(q => q.level === 'TH');
      let vdPool = activePool.filter(q => q.level === 'VD');
      let vdcPool = activePool.filter(q => q.level === 'VDC');

      if (nbPool.length < nbCount) {
        const moreNb = questionPool.filter(q => q.level === 'NB' && !nbPool.includes(q));
        nbPool = nbPool.concat(moreNb);
      }
      if (thPool.length < thCount) {
        const moreTh = questionPool.filter(q => q.level === 'TH' && !thPool.includes(q));
        thPool = thPool.concat(moreTh);
      }
      if (vdPool.length < vdCount) {
        const moreVd = questionPool.filter(q => q.level === 'VD' && !vdPool.includes(q));
        vdPool = vdPool.concat(moreVd);
      }
      if (vdcPool.length < vdcCount) {
        const moreVdc = questionPool.filter(q => q.level === 'VDC' && !vdcPool.includes(q));
        vdcPool = vdcPool.concat(moreVdc);
      }

      // Hàm bốc câu hỏi có hỗ trợ chống trùng lớp học (class deduplication)
      function pickWithoutReplacement(sourceArr, count, usedSet) {
        if (!sourceArr || sourceArr.length === 0 || count <= 0) return [];
        const available = sourceArr.filter(q => !usedSet.has(q.id));

        let unassignedForClass = available;
        if (dedupClass && classUsedIds.size > 0) {
          const fresh = available.filter(q => !classUsedIds.has(q.id));
          if (fresh.length >= count) {
            unassignedForClass = fresh;
          } else if (fresh.length > 0) {
            // Lấy tất cả câu chưa giao trước, phần còn lại lấy từ câu đã giao
            const pickedFresh = fresh.slice().sort(() => Math.random() - 0.5);
            pickedFresh.forEach(q => usedSet.add(q.id));
            const stillNeed = count - pickedFresh.length;
            const remainingPool = available.filter(q => !usedSet.has(q.id));
            const pickedRest = remainingPool.slice().sort(() => Math.random() - 0.5).slice(0, stillNeed);
            pickedRest.forEach(q => usedSet.add(q.id));
            return pickedFresh.concat(pickedRest);
          }
        }

        const shuffled = unassignedForClass.slice().sort(() => Math.random() - 0.5);
        const picked = shuffled.slice(0, count);
        picked.forEach(q => usedSet.add(q.id));
        return picked;
      }

      const usedIds = new Set();
      const selectedQuestions = [];

      selectedQuestions.push(...pickWithoutReplacement(nbPool, nbCount, usedIds));
      selectedQuestions.push(...pickWithoutReplacement(thPool, thCount, usedIds));
      selectedQuestions.push(...pickWithoutReplacement(vdPool, vdCount, usedIds));

      let pickedVdc = pickWithoutReplacement(vdcPool, vdcCount, usedIds);
      if (pickedVdc.length < vdcCount) {
        const fallbackVd = pickWithoutReplacement(vdPool, vdcCount - pickedVdc.length, usedIds);
        pickedVdc.push(...fallbackVd);
      }
      selectedQuestions.push(...pickedVdc);

      if (selectedQuestions.length < totalRequested) {
        const remainingNeeded = totalRequested - selectedQuestions.length;
        selectedQuestions.push(...pickWithoutReplacement(activePool, remainingNeeded, usedIds));
      }
      if (selectedQuestions.length < totalRequested) {
        const remainingNeeded = totalRequested - selectedQuestions.length;
        selectedQuestions.push(...pickWithoutReplacement(questionPool, remainingNeeded, usedIds));
      }

      const finalQuestions = selectedQuestions.map((q, idx) => ({
        ...q,
        number: idx + 1
      }));

      const newExam = {
        id: "AUTO-" + Date.now(),
        code: "AUTO-K" + grade + "-" + Math.floor(1000 + Math.random() * 9000),
        title: title,
        grade: grade,
        subject: `Toán học ${grade} (KNTT)`,
        chapter: options.chapter || "Chương trình GDPT 2018",
        lessonId: targetLessonId || null,
        topic: options.topic || (targetLessonId || "Tổng hợp kiến thức"),
        timeMinutes: timeMinutes,
        levelTarget: (vdcCount > 0 || vdCount >= 4) ? "advanced" : "standard",
        description: `Đề thi tự động chuẩn KNTT gồm ${finalQuestions.length} câu: ${nbCount} NB, ${thCount} TH, ${vdCount} VD, ${vdcCount} VDC.`,
        createdAt: new Date().toISOString(),
        createdBy: createdBy,
        questions: finalQuestions
      };

      return newExam;
    },

    // 2.1. ĐỔI CÂU HỎI KHÁC TRỰC TIẾP TRÊN BẢN XEM TRƯỚC (REROLL QUESTION)
    rerollQuestion: function(exam, questionIndex) {
      if (!exam || !Array.isArray(exam.questions) || questionIndex < 0 || questionIndex >= exam.questions.length) {
        return { success: false, message: 'Dữ liệu đề thi hoặc vị trí câu hỏi không hợp lệ.' };
      }

      const currentQ = exam.questions[questionIndex];
      const grade = Number(exam.grade) || (exam.subject && exam.subject.includes('8') ? 8 : 6);
      const level = (currentQ.level || 'NB').toUpperCase();
      const type = currentQ.type || 'mcq';
      const existingIds = new Set(exam.questions.map(q => q.id));

      // Lấy toàn bộ câu hỏi khả dụng từ kho đề
      const allExams = this.getAllExams();
      let candidates = [];

      allExams.forEach(e => {
        const eGrade = Number(e.grade) || (e.subject && e.subject.includes('8') ? 8 : 6);
        if (eGrade !== grade) return;

        if (Array.isArray(e.questions)) {
          e.questions.forEach(q => {
            if (existingIds.has(q.id)) return;
            if (q.content && q.content.trim() === currentQ.content.trim()) return;

            // Ưu tiên 1: Cùng mức độ và cùng loại
            if (q.level === level && q.type === type) {
              candidates.push(q);
            }
          });
        }
      });

      // Nếu không có câu cùng loại thì nới lỏng: chỉ cần cùng mức độ
      if (candidates.length === 0) {
        allExams.forEach(e => {
          const eGrade = Number(e.grade) || (e.subject && e.subject.includes('8') ? 8 : 6);
          if (eGrade !== grade) return;

          if (Array.isArray(e.questions)) {
            e.questions.forEach(q => {
              if (existingIds.has(q.id)) return;
              if (q.level === level) {
                candidates.push(q);
              }
            });
          }
        });
      }

      if (candidates.length === 0) {
        return { success: false, message: 'Không còn câu hỏi thay thế cùng mức độ trong ngân hàng.' };
      }

      // Bốc ngẫu nhiên 1 câu
      const picked = candidates[Math.floor(Math.random() * candidates.length)];
      const replacedQ = {
        ...picked,
        number: questionIndex + 1
      };

      exam.questions[questionIndex] = replacedQ;

      // Nếu đề này đã lưu trong kho, đồng bộ cập nhật lại
      const existingExam = this.getExamById(exam.id);
      if (existingExam) {
        this.saveExam(exam);
      }

      return {
        success: true,
        newQuestion: replacedQ,
        exam: exam
      };
    },

    // 2.2. TẠO 4 MÃ ĐỀ HOÁN VỊ & BẢNG SOI ĐÁP ÁN NHANH (EXAM PERMUTATION MATRIX)
    generatePermutedExams: function(baseExam, codes) {
      if (!baseExam || !Array.isArray(baseExam.questions) || baseExam.questions.length === 0) {
        return { success: false, message: 'Đề thi gốc không hợp lệ hoặc không có câu hỏi.' };
      }

      codes = Array.isArray(codes) && codes.length > 0 ? codes : ['101', '102', '103', '104'];

      // Phân loại câu hỏi đề gốc theo dạng để xáo trộn trong từng dạng (bảo toàn cấu trúc 3 phần)
      const mcqQuestions = baseExam.questions.filter(q => q.type === 'mcq' || (!q.items && !q.correctAnswers));
      const tfQuestions = baseExam.questions.filter(q => q.type === 'tf' || (q.items && q.items.length > 0));
      const shortQuestions = baseExam.questions.filter(q => q.type === 'short' || (q.correctAnswers && q.correctAnswers.length > 0));

      const permutedExams = [];

      function shuffleArray(arr) {
        const copy = arr.slice();
        for (let i = copy.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = copy[i];
          copy[i] = copy[j];
          copy[j] = temp;
        }
        return copy;
      }

      codes.forEach((code, codeIdx) => {
        // Mã đầu tiên (101) có thể giữ nguyên câu hỏi hoặc xáo trộn; ở đây ta xáo trộn cho cả 4 mã đề
        let permMcq = [];
        let permTf = shuffleArray(tfQuestions);
        let permShort = shuffleArray(shortQuestions);

        // Đối với MCQ: xáo trộn thứ tự câu hỏi VÀ xáo trộn thứ tự các phương án A, B, C, D
        const shuffledMcqRaw = shuffleArray(mcqQuestions);
        shuffledMcqRaw.forEach(q => {
          const qCopy = JSON.parse(JSON.stringify(q));
          if (Array.isArray(qCopy.options) && qCopy.options.length === 4) {
            // Xác định text của phương án đúng ban đầu
            const correctOpt = qCopy.options.find(o => o.key === qCopy.correctAnswer) || qCopy.options[0];
            const correctText = correctOpt.text;

            // Xáo trộn danh sách nội dung phương án
            const shuffledTexts = shuffleArray(qCopy.options.map(o => o.text));
            const newOptions = [];
            const alphabet = ['A', 'B', 'C', 'D'];
            let newCorrectKey = 'A';

            alphabet.forEach((letter, i) => {
              newOptions.push({ key: letter, text: shuffledTexts[i] });
              if (shuffledTexts[i] === correctText) {
                newCorrectKey = letter;
              }
            });

            qCopy.options = newOptions;
            qCopy.correctAnswer = newCorrectKey;
          }
          permMcq.push(qCopy);
        });

        // Ghép các phần theo chuẩn GDPT 2018: Phần I (MCQ) -> Phần II (Đúng/Sai) -> Phần III (Trả lời ngắn)
        const allQuestions = [...permMcq, ...permTf, ...permShort].map((q, idx) => ({
          ...q,
          number: idx + 1,
          originalQuestionId: q.id
        }));

        const permExam = {
          ...JSON.parse(JSON.stringify(baseExam)),
          id: (baseExam.id || 'EXAM') + '-CODE-' + code,
          examCode: code,
          code: (baseExam.code || 'DE') + '-' + code,
          title: baseExam.title + ' (Mã đề ' + code + ')',
          baseExamId: baseExam.id,
          questions: allQuestions
        };

        permutedExams.push(permExam);
      });

      // Tạo Bảng Soi Đáp Án Ma Trận (Answer Matrix Key)
      const maxQuestions = permutedExams[0].questions.length;
      const answerMatrixKey = [];

      for (let i = 0; i < maxQuestions; i++) {
        const row = {
          number: i + 1,
          type: permutedExams[0].questions[i].type,
          answers: {}
        };

        codes.forEach((code, cIdx) => {
          const q = permutedExams[cIdx].questions[i];
          if (q.type === 'tf') {
            const itemsAns = (q.items || []).map(it => it.key + ': ' + it.correctAnswer).join(', ');
            row.answers[code] = itemsAns || 'Đ-S-Đ-Đ';
          } else if (q.type === 'short') {
            row.answers[code] = q.correctAnswers ? q.correctAnswers.join('/') : (q.correctAnswer || '');
          } else {
            row.answers[code] = q.correctAnswer || 'A';
          }
        });

        answerMatrixKey.push(row);
      }

      return {
        success: true,
        baseExam: baseExam,
        codes: codes,
        permutedExams: permutedExams,
        answerMatrixKey: answerMatrixKey
      };
    },

    // 2.3. CẤU HÌNH GOOGLE SHEETS WEBHOOK
    getSheetsWebhookUrl: function() {
      if (typeof TeacherAuthEngine !== 'undefined' && TeacherAuthEngine.getSheetsWebhookUrl) {
        const authUrl = TeacherAuthEngine.getSheetsWebhookUrl();
        if (authUrl) return authUrl;
      }
      return getStorage(STORAGE_KEYS.SHEETS_WEBHOOK, '');
    },

    setSheetsWebhookUrl: function(url) {
      if (typeof TeacherAuthEngine !== 'undefined' && TeacherAuthEngine.saveSheetsWebhookUrl) {
        TeacherAuthEngine.saveSheetsWebhookUrl(url);
      }
      setStorage(STORAGE_KEYS.SHEETS_WEBHOOK, (url || '').trim());
      return true;
    },

    // 2.4. QUẢN LÝ LỊCH SỬ CÂU HỎI THEO LỚP (CLASS DEDUPLICATION ENGINE)
    getClassQuestionHistory: function(classCode) {
      if (!classCode) return [];
      const historyMap = getStorage(STORAGE_KEYS.CLASS_HISTORY, {});
      return historyMap[classCode] || [];
    },

    recordClassAssignment: function(classCode, questionIds) {
      if (!classCode || !Array.isArray(questionIds) || questionIds.length === 0) return [];
      const historyMap = getStorage(STORAGE_KEYS.CLASS_HISTORY, {});
      const existing = new Set(historyMap[classCode] || []);
      questionIds.forEach(id => { if (id) existing.add(id); });
      historyMap[classCode] = Array.from(existing);
      setStorage(STORAGE_KEYS.CLASS_HISTORY, historyMap);
      return historyMap[classCode];
    },

    clearClassHistory: function(classCode) {
      const historyMap = getStorage(STORAGE_KEYS.CLASS_HISTORY, {});
      if (classCode) {
        delete historyMap[classCode];
      } else {
        for (const k in historyMap) delete historyMap[k];
      }
      setStorage(STORAGE_KEYS.CLASS_HISTORY, historyMap);
      return true;
    },

    // 3. QUẢN LÝ GIAO NHIỆM VỤ (ASSIGNMENT HUB)
    getAllTasks: function() {
      return getStorage(STORAGE_KEYS.TASKS, DEFAULT_TASKS);
    },

    getTaskById: function(taskId) {
      const tasks = this.getAllTasks();
      return tasks.find(t => t.taskId === taskId) || null;
    },

    createTask: function(taskData) {
      let tasks = this.getAllTasks();
      if (!taskData.taskId) {
        taskData.taskId = "TASK-" + Math.floor(100000 + Math.random() * 900000);
      }
      if (!taskData.assignedDate) {
        taskData.assignedDate = new Date().toISOString();
      }
      taskData.status = taskData.status || "active";

      tasks.unshift(taskData);
      setStorage(STORAGE_KEYS.TASKS, tasks);

      // Tự động ghi nhận danh sách ID câu hỏi vào lịch sử của lớp để chống trùng lặp
      if (taskData.assignedClass) {
        let qIds = [];
        if (Array.isArray(taskData.questionIds) && taskData.questionIds.length > 0) {
          qIds = taskData.questionIds;
        } else if (taskData.examId) {
          const targetEx = this.getExamById(taskData.examId);
          if (targetEx && Array.isArray(targetEx.questions)) {
            qIds = targetEx.questions.map(q => q.id);
          }
        }
        if (qIds.length > 0) {
          this.recordClassAssignment(taskData.assignedClass, qIds);
        }
      }

      broadcast('TASK_CREATED', taskData);
      return taskData;
    },

    // 4. QUẢN LÝ BÀI NỘP VÀ ĐỒNG BỘ KẾT QUẢ (STUDENT SUBMISSIONS)
    getAllSubmissions: function() {
      return getStorage(STORAGE_KEYS.SUBMISSIONS, DEFAULT_SUBMISSIONS);
    },

    getSubmissionsByTaskId: function(taskId) {
      const subs = this.getAllSubmissions();
      return subs.filter(s => s.taskId === taskId);
    },

    getSubmissionsByExamId: function(examId) {
      const subs = this.getAllSubmissions();
      return subs.filter(s => s.examId === examId);
    },

    submitStudentExam: function(submissionData) {
      let subs = this.getAllSubmissions();
      submissionData.submissionId = "SUB-" + Date.now();
      submissionData.submittedAt = new Date().toISOString();

      // Thêm vào đầu danh sách
      subs.unshift(submissionData);
      setStorage(STORAGE_KEYS.SUBMISSIONS, subs);

      // Bắn tín hiệu đồng bộ ngay cho các tab Giáo viên đang mở
      broadcast('NEW_STUDENT_SUBMISSION', submissionData);

      // Gửi kết quả về Google Sheets Webhook nếu giáo viên đã cài đặt
      const webhookUrl = this.getSheetsWebhookUrl();
      if (webhookUrl && webhookUrl.startsWith('http') && typeof fetch !== 'undefined') {
        try {
          fetch(webhookUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submissionData)
          }).catch(err => console.warn('[ExamSyncEngine] Webhook error:', err));
        } catch (e) {
          console.warn('[ExamSyncEngine] Cannot send webhook:', e);
        }
      }

      return submissionData;
    },

    // 5. PHÂN TÍCH VÀ CHẨN ĐOÁN HỌC TẬP (DIAGNOSTIC & ANALYTICS)
    computeTaskAnalytics: function(taskId) {
      const subs = this.getSubmissionsByTaskId(taskId);
      if (subs.length === 0) {
        return {
          totalSubmitted: 0,
          averageScore: 0,
          highestScore: 0,
          lowestScore: 0,
          gradeDistribution: { excellent: 0, good: 0, average: 0, poor: 0 },
          questionErrorStats: []
        };
      }

      let totalScore = 0;
      let highest = -1;
      let lowest = 999;
      let dist = { excellent: 0, good: 0, average: 0, poor: 0 };
      let questionWrongMap = {};

      subs.forEach(s => {
        const sc = s.score;
        totalScore += sc;
        if (sc > highest) highest = sc;
        if (sc < lowest) lowest = sc;

        if (sc >= 8.5) dist.excellent++;
        else if (sc >= 6.5) dist.good++;
        else if (sc >= 5.0) dist.average++;
        else dist.poor++;

        if (Array.isArray(s.answersDetail)) {
          s.answersDetail.forEach(ans => {
            if (!ans.isCorrect) {
              questionWrongMap[ans.questionId] = (questionWrongMap[ans.questionId] || 0) + 1;
            }
          });
        }
      });

      const questionErrorStats = Object.keys(questionWrongMap).map(qId => ({
        questionId: qId,
        wrongCount: questionWrongMap[qId],
        wrongRate: Math.round((questionWrongMap[qId] / subs.length) * 100)
      })).sort((a, b) => b.wrongCount - a.wrongCount);

      return {
        totalSubmitted: subs.length,
        averageScore: (totalScore / subs.length).toFixed(1),
        highestScore: highest,
        lowestScore: lowest,
        gradeDistribution: dist,
        questionErrorStats: questionErrorStats
      };
    },

    // 6. ĐỒNG BỘ PHIÊN HỌC SINH (ACTIVE STUDENT SESSION)
    saveStudentSession: function(sessionData) {
      setStorage(STORAGE_KEYS.ACTIVE_STUDENT, sessionData);
    },

    getStudentSession: function() {
      return getStorage(STORAGE_KEYS.ACTIVE_STUDENT, null);
    },

    // 7. ĐĂNG KÝ LẮNG NGHE SỰ KIỆN TỪ TAB KHÁC
    onSyncEvent: function(callback) {
      if (broadcastChannel && typeof callback === 'function') {
        broadcastChannel.onmessage = function(event) {
          callback(event.data);
        };
      }
    }
  };

  return Engine;
}));
