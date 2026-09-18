/**
 * =============================================================================
 * GEMINI AI EXAM GENERATION SERVICE (DỊCH VỤ SINH ĐỀ THÔNG MINH BẰNG GEMINI AI)
 * Dành cho Hệ Thống Ôn Tập & Quản Trị Đề Thi Toán THCS (KNTT)
 * =============================================================================
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.GeminiExamService = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {

  const STORAGE_KEY_API = 'TN_TOAN_GEMINI_API_KEY';

  const Service = {
    // 1. QUẢN LÝ API KEY
    getApiKey: function() {
      try {
        if (typeof localStorage !== 'undefined') {
          return localStorage.getItem(STORAGE_KEY_API) || '';
        }
      } catch (e) {
        console.warn('[GeminiExamService] Read localStorage failed:', e);
      }
      return '';
    },

    setApiKey: function(apiKey) {
      try {
        if (typeof localStorage !== 'undefined') {
          if (apiKey && apiKey.trim()) {
            localStorage.setItem(STORAGE_KEY_API, apiKey.trim());
          } else {
            localStorage.removeItem(STORAGE_KEY_API);
          }
          return true;
        }
      } catch (e) {
        console.warn('[GeminiExamService] Save localStorage failed:', e);
      }
      return false;
    },

    hasApiKey: function() {
      const key = this.getApiKey();
      return !!(key && key.length >= 10);
    },

    // 2. TẠO PROMPT CHUYÊN BIỆT CHO TOÁN GDPT 2018 (KNTT)
    buildPrompt: function(options) {
      const grade = options.grade || 8;
      const chapter = options.chapter || 'Chương I: Đa thức';
      const lesson = options.lesson || 'Toàn bộ chương';
      const topic = options.topic || '';
      const nbCount = Number(options.nbCount) || 3;
      const thCount = Number(options.thCount) || 3;
      const vdCount = Number(options.vdCount) || 3;
      const vdcCount = Number(options.vdcCount) || 1;
      const totalQuestions = nbCount + thCount + vdCount + vdcCount;

      return `Bạn là một chuyên gia khảo thí và biên soạn đề thi môn Toán THCS hàng đầu Việt Nam theo chương trình Giáo dục phổ thông 2018, bộ sách "Kết nối tri thức với cuộc sống".

YÊU CẦU BIÊN SOẠN ĐỀ THI:
- Khối lớp: Toán ${grade}
- Chương: ${chapter}
- Bài học / Chủ đề: ${lesson} ${topic ? '(' + topic + ')' : ''}
- Tổng số câu: ${totalQuestions} câu hỏi
  + Nhận biết (NB): ${nbCount} câu
  + Thông hiểu (TH): ${thCount} câu
  + Vận dụng (VD): ${vdCount} câu
  + Vận dụng cao (VDC): ${vdcCount} câu

CẤU TRÚC ĐỀ THI CHUẨN ĐỊNH DẠNG MỚI (GDPT 2018):
- Gồm 3 dạng thức câu hỏi:
  1. "mcq" (Trắc nghiệm 4 lựa chọn A, B, C, D): chiếm khoảng 60% số câu.
  2. "tf" (Trắc nghiệm Đúng / Sai): có đúng 4 ý a, b, c, d; mỗi ý xét đúng hoặc sai.
  3. "short" (Trắc nghiệm trả lời ngắn): điền số hoặc biểu thức rút gọn duy nhất.

QUY TẮC TOÁN HỌC & CÔNG THỨC (BẮT BUỘC):
- Tất cả công thức toán, biến số, phân số, số mũ, căn bậc hai, góc, độ PHẢI được bao quanh bởi một dấu đô-la: $ ... $ (chuẩn KaTeX).
- Ví dụ đúng: $x^2 - 4xy + 4y^2$, $\\frac{2}{3}$, $\\widehat{A} = 60^\\circ$, $A \\parallel B$.
- Tuyệt đối KHÔNG viết công thức trần không có $.
- Nội dung câu hỏi và lời giải bằng tiếng Việt chuẩn mực, sư phạm, chính xác tuyệt đối về mặt toán học.

ĐỊNH DẠNG ĐẦU RA (JSON THUẦN TÚY):
Trả về DUY NHẤT một đối tượng JSON hợp lệ, KHÔNG kèm lời mở đầu, KHÔNG kèm markdown ngoài khối JSON. Schema như sau:
{
  "title": "Tên đề thi phù hợp với nội dung",
  "grade": ${grade},
  "chapter": "${chapter}",
  "topic": "${lesson}",
  "timeMinutes": ${options.timeMinutes || 15},
  "questions": [
    {
      "id": "q_ai_1",
      "number": 1,
      "type": "mcq",
      "level": "NB",
      "content": "Nội dung câu hỏi có công thức $x^2$...",
      "options": [
        { "key": "A", "text": "$x+1$" },
        { "key": "B", "text": "$x-1$" },
        { "key": "C", "text": "$2x$" },
        { "key": "D", "text": "$x^2$" }
      ],
      "correctAnswer": "A",
      "explanation": "Lời giải chi tiết từng bước...",
      "hint": "Gợi ý ngắn cho học sinh..."
    },
    {
      "id": "q_ai_2",
      "number": 2,
      "type": "tf",
      "level": "TH",
      "content": "Cho biểu thức $P = ...$. Xét tính đúng/sai của các khẳng định sau:",
      "prompt": "Cho biểu thức $P = ...$. Xét tính đúng/sai của các khẳng định sau:",
      "items": [
        { "key": "a", "label": "a", "text": "Khẳng định 1...", "correctAnswer": "Đ", "explanation": "Giải thích..." },
        { "key": "b", "label": "b", "text": "Khẳng định 2...", "correctAnswer": "S", "explanation": "Giải thích..." },
        { "key": "c", "label": "c", "text": "Khẳng định 3...", "correctAnswer": "Đ", "explanation": "Giải thích..." },
        { "key": "d", "label": "d", "text": "Khẳng định 4...", "correctAnswer": "S", "explanation": "Giải thích..." }
      ],
      "correctAnswer": "B",
      "explanation": "Đánh giá chi tiết 4 mệnh đề a, b, c, d.",
      "hint": "Gợi ý..."
    },
    {
      "id": "q_ai_3",
      "number": 3,
      "type": "short",
      "level": "VD",
      "content": "Tính giá trị của biểu thức...",
      "correctAnswer": "12",
      "correctAnswers": ["12"],
      "explanation": "Các bước tính...",
      "hint": "Gợi ý..."
    }
  ]
}`;
    },

    // 3. GỌI API GEMINI ĐỂ SINH ĐỀ
    generateExam: async function(options) {
      options = options || {};
      const apiKey = options.apiKey || this.getApiKey();

      if (!apiKey || apiKey.trim().length < 10) {
        throw new Error('Chưa có API Key Google Gemini. Vui lòng bấm "🔑 Cấu hình Gemini AI" để nhập key miễn phí.');
      }

      const prompt = this.buildPrompt(options);

      const modelsToTry = ['gemini-2.5-flash', 'gemini-1.5-flash'];
      let lastError = null;

      for (const model of modelsToTry) {
        try {
          const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;
          
          const requestBody = {
            contents: [
              {
                parts: [
                  { text: prompt }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.4,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 8192
            }
          };

          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const msg = errorData.error ? errorData.error.message : response.statusText;
            throw new Error(`Gemini API (${model}) [HTTP ${response.status}]: ${msg}`);
          }

          const data = await response.json();
          if (!data.candidates || data.candidates.length === 0 || !data.candidates[0].content) {
            throw new Error('Gemini không trả về nội dung câu trả lời.');
          }

          let textResponse = data.candidates[0].content.parts.map(p => p.text).join('\n');

          // Làm sạch chuỗi markdown code block nếu có: ```json ... ```
          textResponse = textResponse.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();

          const parsedExam = JSON.parse(textResponse);

          // Chuẩn hóa định dạng đề thi
          const grade = Number(options.grade) || 8;
          const examObj = {
            id: 'AI-' + Date.now(),
            code: 'AI-K' + grade + '-' + Math.floor(1000 + Math.random() * 9000),
            title: parsedExam.title || `Đề thi AI Toán ${grade} - ${options.chapter || 'GDPT 2018'}`,
            grade: grade,
            subject: `Toán học ${grade} (KNTT)`,
            chapter: options.chapter || parsedExam.chapter || 'Chương trình GDPT 2018',
            topic: options.lesson || parsedExam.topic || 'Sáng tạo bởi Gemini AI',
            timeMinutes: Number(options.timeMinutes) || parsedExam.timeMinutes || 15,
            levelTarget: 'standard',
            description: `Đề thi sáng tạo tự động bởi Google Gemini AI (${model}) bám sát SGK Kết nối tri thức.`,
            createdAt: new Date().toISOString(),
            createdBy: `Google Gemini AI (${model})`,
            questions: []
          };

          if (Array.isArray(parsedExam.questions)) {
            examObj.questions = parsedExam.questions.map((q, idx) => {
              const qType = q.type || 'mcq';
              let optionsArr = q.options || [];
              if (qType === 'tf' && (!optionsArr || optionsArr.length === 0)) {
                optionsArr = [
                  { key: 'A', text: 'Tất cả các ý đều đúng' },
                  { key: 'B', text: 'Xem đánh giá chi tiết a, b, c, d' }
                ];
              } else if (qType === 'short' && (!optionsArr || optionsArr.length === 0)) {
                optionsArr = [
                  { key: 'Đáp số', text: String(q.correctAnswer || '') }
                ];
              }

              return {
                id: q.id || ('ai_q_' + (idx + 1)),
                number: idx + 1,
                type: qType,
                level: (q.level || 'NB').toUpperCase(),
                grade: grade,
                chapter: examObj.chapter,
                topic: examObj.topic,
                content: q.content || q.prompt || '',
                options: optionsArr,
                items: q.items || undefined,
                correctAnswer: q.correctAnswer || 'A',
                correctAnswers: q.correctAnswers || [String(q.correctAnswer || 'A')],
                explanation: q.explanation || 'Áp dụng kiến thức SGK Kết nối tri thức.',
                hint: q.hint || 'Quan sát kỹ câu hỏi và làm theo từng bước.'
              };
            });
          }

          return examObj;
        } catch (err) {
          console.warn(`Thử model ${model} thất bại:`, err);
          lastError = err;
        }
      }

      throw lastError || new Error('Không thể kết nối tới Google Gemini API.');
    }
  };

  return Service;
}));
