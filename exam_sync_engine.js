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
    ACTIVE_STUDENT: 'TN_TOAN_ACTIVE_STUDENT_SESSION_V1'
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
      return getStorage(STORAGE_KEYS.EXAMS, DEFAULT_EXAMS);
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
      const timeMinutes = Number(options.timeMinutes) || 15;
      const title = options.title || `Đề kiểm tra tự động Toán ${grade} - KNTT`;
      const createdBy = options.createdBy || "Bộ Tạo Đề Thông Minh AI";

      let questionPool = [];

      // Lấy từ EXAM_DATA có sẵn trong window nếu đã load questions_data.js
      if (typeof window !== 'undefined' && window.EXAM_DATA && Array.isArray(window.EXAM_DATA)) {
        window.EXAM_DATA.forEach(exam => {
          if (exam.parts) {
            exam.parts.forEach(p => {
              if (p.questions) {
                p.questions.forEach(q => {
                  questionPool.push({
                    id: q.id || ("Q_" + Math.random().toString(36).substr(2, 9)),
                    level: (q.level || 'NB').toUpperCase(),
                    content: q.content,
                    options: q.options || [],
                    correctAnswer: q.correctAnswer || (q.options && q.options[0] ? q.options[0].key : "A"),
                    hint: q.hint || "Hãy quan sát kĩ dữ kiện đầu bài và áp dụng công thức tương ứng.",
                    explanation: q.explanation || "Thực hiện các bước biến đổi theo quy tắc bài học."
                  });
                });
              }
            });
          }
        });
      }

      // Thêm câu hỏi từ kho đề mặc định
      DEFAULT_EXAMS.forEach(e => {
        if (e.questions) {
          e.questions.forEach(q => questionPool.push(q));
        }
      });

      // Lọc câu hỏi theo mức độ
      const nbPool = questionPool.filter(q => q.level === 'NB');
      const thPool = questionPool.filter(q => q.level === 'TH');
      const vdPool = questionPool.filter(q => q.level === 'VD');
      const vdcPool = questionPool.filter(q => q.level === 'VDC');

      function pickRandom(arr, count) {
        if (!arr || arr.length === 0) return [];
        const shuffled = arr.slice().sort(() => Math.random() - 0.5);
        if (shuffled.length >= count) return shuffled.slice(0, count);
        const res = [];
        for (let i = 0; i < count; i++) {
          res.push(shuffled[i % shuffled.length]);
        }
        return res;
      }

      const selectedQuestions = [
        ...pickRandom(nbPool, nbCount),
        ...pickRandom(thPool, thCount),
        ...pickRandom(vdPool, vdCount),
        ...pickRandom(vdcPool, vdcCount)
      ];

      // Đánh lại số thứ tự câu
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
        topic: options.topic || "Tổng hợp kiến thức",
        timeMinutes: timeMinutes,
        levelTarget: (vdcCount > 0 || vdCount >= 4) ? "advanced" : "standard",
        description: `Đề thi tự động gồm ${finalQuestions.length} câu: ${nbCount} NB, ${thCount} TH, ${vdCount} VD, ${vdcCount} VDC.`,
        createdAt: new Date().toISOString(),
        createdBy: createdBy,
        questions: finalQuestions
      };

      return newExam;
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
