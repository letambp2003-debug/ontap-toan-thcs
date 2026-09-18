# -*- coding: utf-8 -*-
import json

with open('tools/raw_exams.json', 'r', encoding='utf-8') as f:
    exams = json.load(f)


lesson_map = {
    '1_1': {'lessonId': 'K6_C1_B1', 'lessonName': 'Bài 1: Tập hợp', 'level': 'NB', 'xp': 10},
    '1_2': {'lessonId': 'K6_C1_B3', 'lessonName': 'Bài 3: Thứ tự trong tập hợp các số tự nhiên', 'level': 'NB', 'xp': 10},
    '1_3': {'lessonId': 'K6_C1_B2', 'lessonName': 'Bài 2: Cách ghi số tự nhiên', 'level': 'NB', 'xp': 10},
    '1_4': {'lessonId': 'K6_C1_B2', 'lessonName': 'Bài 2: Cách ghi số tự nhiên', 'level': 'TH', 'xp': 20},
    '1_5': {'lessonId': 'K6_C1_B4', 'lessonName': 'Bài 4: Phép cộng và phép trừ số tự nhiên', 'level': 'TH', 'xp': 20},
    '1_6': {'lessonId': 'K6_C1_B4', 'lessonName': 'Bài 4: Phép cộng và phép trừ số tự nhiên', 'level': 'TH', 'xp': 20},
    '1_7': {'lessonId': 'K6_C1_B1', 'lessonName': 'Bài 1: Tập hợp', 'level': 'TH', 'xp': 25},
    '1_8': {'lessonId': 'K6_C1_B4', 'lessonName': 'Bài 4: Phép cộng và phép trừ số tự nhiên', 'level': 'VD', 'xp': 35},
    '1_9': {'lessonId': 'K6_C1_B1', 'lessonName': 'Bài 1: Tập hợp', 'level': 'VD', 'xp': 35},
    '1_10': {'lessonId': 'K6_C1_B4', 'lessonName': 'Bài 4: Phép cộng và phép trừ số tự nhiên', 'level': 'VDC', 'xp': 50},

    '2_1': {'lessonId': 'K6_C1_B1', 'lessonName': 'Bài 1: Tập hợp', 'level': 'NB', 'xp': 10},
    '2_2': {'lessonId': 'K6_C1_B1', 'lessonName': 'Bài 1: Tập hợp', 'level': 'NB', 'xp': 10},
    '2_3': {'lessonId': 'K6_C1_B2', 'lessonName': 'Bài 2: Cách ghi số tự nhiên', 'level': 'TH', 'xp': 20},
    '2_4': {'lessonId': 'K6_C1_B3', 'lessonName': 'Bài 3: Thứ tự trong tập hợp các số tự nhiên', 'level': 'TH', 'xp': 20},
    '2_5': {'lessonId': 'K6_C1_B4', 'lessonName': 'Bài 4: Phép cộng và phép trừ số tự nhiên', 'level': 'TH', 'xp': 20},
    '2_6': {'lessonId': 'K6_C1_B4', 'lessonName': 'Bài 4: Phép cộng và phép trừ số tự nhiên', 'level': 'TH', 'xp': 20},
    '2_7': {'lessonId': 'K6_C1_B3', 'lessonName': 'Bài 3: Thứ tự trong tập hợp các số tự nhiên', 'level': 'TH', 'xp': 25},
    '2_8': {'lessonId': 'K6_C1_B2', 'lessonName': 'Bài 2: Cách ghi số tự nhiên', 'level': 'TH', 'xp': 25},
    '2_9': {'lessonId': 'K6_C1_B3', 'lessonName': 'Bài 3: Thứ tự trong tập hợp các số tự nhiên', 'level': 'VD', 'xp': 35},
    '2_10': {'lessonId': 'K6_C1_B4', 'lessonName': 'Bài 4: Phép cộng và phép trừ số tự nhiên', 'level': 'VD', 'xp': 35},

    '3_1': {'lessonId': 'K6_C1_B1', 'lessonName': 'Bài 1: Tập hợp', 'level': 'NB', 'xp': 10},
    '3_2': {'lessonId': 'K6_C1_B2', 'lessonName': 'Bài 2: Cách ghi số tự nhiên', 'level': 'NB', 'xp': 10},
    '3_3': {'lessonId': 'K6_C1_B2', 'lessonName': 'Bài 2: Cách ghi số tự nhiên', 'level': 'NB', 'xp': 10},
    '3_4': {'lessonId': 'K6_C1_B3', 'lessonName': 'Bài 3: Thứ tự trong tập hợp các số tự nhiên', 'level': 'TH', 'xp': 20},
    '3_5': {'lessonId': 'K6_C1_B4', 'lessonName': 'Bài 4: Phép cộng và phép trừ số tự nhiên', 'level': 'TH', 'xp': 20},
    '3_6': {'lessonId': 'K6_C1_B4', 'lessonName': 'Bài 4: Phép cộng và phép trừ số tự nhiên', 'level': 'TH', 'xp': 20},
    '3_7': {'lessonId': 'K6_C1_B1', 'lessonName': 'Bài 1: Tập hợp', 'level': 'TH', 'xp': 25},
    '3_8': {'lessonId': 'K6_C1_B4', 'lessonName': 'Bài 4: Phép cộng và phép trừ số tự nhiên', 'level': 'VD', 'xp': 35},
    '3_9': {'lessonId': 'K6_C1_B4', 'lessonName': 'Bài 4: Phép cộng và phép trừ số tự nhiên', 'level': 'VD', 'xp': 35},
    '3_10': {'lessonId': 'K6_C1_B4', 'lessonName': 'Bài 4: Phép cộng và phép trừ số tự nhiên', 'level': 'VD', 'xp': 35},

    '4_1': {'lessonId': 'K6_C1_B1', 'lessonName': 'Bài 1: Tập hợp', 'level': 'NB', 'xp': 10},
    '4_2': {'lessonId': 'K6_C1_B3', 'lessonName': 'Bài 3: Thứ tự trong tập hợp các số tự nhiên', 'level': 'NB', 'xp': 10},
    '4_3': {'lessonId': 'K6_C1_B2', 'lessonName': 'Bài 2: Cách ghi số tự nhiên', 'level': 'TH', 'xp': 20},
    '4_4': {'lessonId': 'K6_C1_B2', 'lessonName': 'Bài 2: Cách ghi số tự nhiên', 'level': 'NB', 'xp': 10},
    '4_5': {'lessonId': 'K6_C1_B4', 'lessonName': 'Bài 4: Phép cộng và phép trừ số tự nhiên', 'level': 'TH', 'xp': 20},
    '4_6': {'lessonId': 'K6_C1_B4', 'lessonName': 'Bài 4: Phép cộng và phép trừ số tự nhiên', 'level': 'TH', 'xp': 20},
    '4_7': {'lessonId': 'K6_C1_B2', 'lessonName': 'Bài 2: Cách ghi số tự nhiên', 'level': 'TH', 'xp': 25},
    '4_8': {'lessonId': 'K6_C1_B3', 'lessonName': 'Bài 3: Thứ tự trong tập hợp các số tự nhiên', 'level': 'TH', 'xp': 25},
    '4_9': {'lessonId': 'K6_C1_B3', 'lessonName': 'Bài 3: Thứ tự trong tập hợp các số tự nhiên', 'level': 'VD', 'xp': 35},
    '4_10': {'lessonId': 'K6_C1_B4', 'lessonName': 'Bài 4: Phép cộng và phép trừ số tự nhiên', 'level': 'VDC', 'xp': 50},

    '5_1': {'lessonId': 'K6_C1_B1', 'lessonName': 'Bài 1: Tập hợp', 'level': 'NB', 'xp': 10},
    '5_2': {'lessonId': 'K6_C1_B2', 'lessonName': 'Bài 2: Cách ghi số tự nhiên', 'level': 'NB', 'xp': 10},
    '5_3': {'lessonId': 'K6_C1_B2', 'lessonName': 'Bài 2: Cách ghi số tự nhiên', 'level': 'TH', 'xp': 20},
    '5_4': {'lessonId': 'K6_C1_B3', 'lessonName': 'Bài 3: Thứ tự trong tập hợp các số tự nhiên', 'level': 'NB', 'xp': 10},
    '5_5': {'lessonId': 'K6_C1_B4', 'lessonName': 'Bài 4: Phép cộng và phép trừ số tự nhiên', 'level': 'NB', 'xp': 10},
    '5_6': {'lessonId': 'K6_C1_B4', 'lessonName': 'Bài 4: Phép cộng và phép trừ số tự nhiên', 'level': 'TH', 'xp': 20},
    '5_7': {'lessonId': 'K6_C1_B4', 'lessonName': 'Bài 4: Phép cộng và phép trừ số tự nhiên', 'level': 'VD', 'xp': 35},
    '5_8': {'lessonId': 'K6_C1_B2', 'lessonName': 'Bài 2: Cách ghi số tự nhiên', 'level': 'TH', 'xp': 25},
    '5_9': {'lessonId': 'K6_C1_B4', 'lessonName': 'Bài 4: Phép cộng và phép trừ số tự nhiên', 'level': 'VD', 'xp': 35},
    '5_10': {'lessonId': 'K6_C1_B4', 'lessonName': 'Bài 4: Phép cộng và phép trừ số tự nhiên', 'level': 'VD', 'xp': 35},
}

for exam in exams:
    exam['gradeNum'] = 6
    exam['book'] = 'KNTT'
    exam['chapter'] = 1
    for part in exam.get('parts', []):
        for q in part.get('questions', []):
            qid = q.get('id')
            if qid in lesson_map:
                info = lesson_map[qid]
                q['grade'] = 6
                q['book'] = 'KNTT'
                q['chapter'] = 1
                q['lessonId'] = info['lessonId']
                q['lessonName'] = info['lessonName']
                q['level'] = info['level']
                q['xp'] = info['xp']

curriculum = {
    '6': {
        'gradeName': 'Toán 6 (Kết nối tri thức với cuộc sống)',
        'chapters': [
            {
                'chapterId': 1,
                'title': 'Chương I: Tập hợp các số tự nhiên',
                'description': 'Tập hợp, hệ thập phân, số La Mã, thứ tự số tự nhiên, phép tính cộng trừ nhân chia',
                'lessons': [
                    {'lessonId': 'K6_C1_B1', 'name': 'Bài 1: Tập hợp', 'questionCount': 9},
                    {'lessonId': 'K6_C1_B2', 'name': 'Bài 2: Cách ghi số tự nhiên', 'questionCount': 12},
                    {'lessonId': 'K6_C1_B3', 'name': 'Bài 3: Thứ tự trong tập hợp các số tự nhiên', 'questionCount': 9},
                    {'lessonId': 'K6_C1_B4', 'name': 'Bài 4: Phép cộng và phép trừ số tự nhiên', 'questionCount': 20},
                    {'lessonId': 'K6_C1_B5', 'name': 'Bài 5: Phép nhân và phép chia số tự nhiên', 'questionCount': 0},
                    {'lessonId': 'K6_C1_B6', 'name': 'Bài 6: Lũy thừa với số mũ tự nhiên', 'questionCount': 0},
                    {'lessonId': 'K6_C1_B7', 'name': 'Bài 7: Thứ tự thực hiện các phép tính', 'questionCount': 0},
                    {'lessonId': 'K6_C1_OT', 'name': 'Ôn tập Chương I', 'questionCount': 50}
                ]
            },
            {
                'chapterId': 2,
                'title': 'Chương II: Tính chia hết trong tập hợp các số tự nhiên',
                'description': 'Quan hệ chia hết, dấu hiệu chia hết cho 2, 3, 5, 9, số nguyên tố, ƯCLN và BCNN',
                'lessons': [
                    {'lessonId': 'K6_C2_B8', 'name': 'Bài 8: Quan hệ chia hết và tính chất', 'questionCount': 0},
                    {'lessonId': 'K6_C2_B9', 'name': 'Bài 9: Dấu hiệu chia hết', 'questionCount': 0},
                    {'lessonId': 'K6_C2_B10', 'name': 'Bài 10: Số nguyên tố', 'questionCount': 0},
                    {'lessonId': 'K6_C2_B11', 'name': 'Bài 11: Ước chung. Ước chung lớn nhất', 'questionCount': 0},
                    {'lessonId': 'K6_C2_B12', 'name': 'Bài 12: Bội chung. Bội chung nhỏ nhất', 'questionCount': 0}
                ]
            },
            {
                'chapterId': 3,
                'title': 'Chương III: Số nguyên',
                'description': 'Tập hợp các số nguyên âm, số nguyên dương, trục số và các phép toán',
                'lessons': [
                    {'lessonId': 'K6_C3_B13', 'name': 'Bài 13: Tập hợp các số nguyên', 'questionCount': 0},
                    {'lessonId': 'K6_C3_B14', 'name': 'Bài 14: Phép cộng và phép trừ số nguyên', 'questionCount': 0},
                    {'lessonId': 'K6_C3_B15', 'name': 'Bài 15: Quy tắc dấu ngoặc', 'questionCount': 0},
                    {'lessonId': 'K6_C3_B16', 'name': 'Bài 16: Phép nhân số nguyên', 'questionCount': 0},
                    {'lessonId': 'K6_C3_B17', 'name': 'Bài 17: Phép chia hết. Ước và bội của số nguyên', 'questionCount': 0}
                ]
            },
            {
                'chapterId': 4,
                'title': 'Chương IV: Một số hình phẳng trong thực tiễn',
                'description': 'Tam giác đều, hình vuông, lục giác đều, hình chữ nhật, hình thoi, hình bình hành, hình thang cân',
                'lessons': [
                    {'lessonId': 'K6_C4_B18', 'name': 'Bài 18: Tam giác đều. Hình vuông. Lục giác đều', 'questionCount': 0},
                    {'lessonId': 'K6_C4_B19', 'name': 'Bài 19: Hình chữ nhật. Hình thoi', 'questionCount': 0},
                    {'lessonId': 'K6_C4_B20', 'name': 'Bài 20: Hình bình hành. Hình thang cân', 'questionCount': 0},
                    {'lessonId': 'K6_C4_B21', 'name': 'Bài 21: Chu vi và diện tích các hình phẳng', 'questionCount': 0}
                ]
            },
            {
                'chapterId': 5,
                'title': 'Chương V: Tính đối xứng của hình phẳng trong tự nhiên',
                'description': 'Hình có trục đối xứng, hình có tâm đối xứng trong đời sống và nghệ thuật',
                'lessons': [
                    {'lessonId': 'K6_C5_B22', 'name': 'Bài 22: Hình có trục đối xứng', 'questionCount': 0},
                    {'lessonId': 'K6_C5_B23', 'name': 'Bài 23: Hình có tâm đối xứng', 'questionCount': 0}
                ]
            }
        ]
    },
    '7': {
        'gradeName': 'Toán 7 (Kết nối tri thức với cuộc sống)',
        'chapters': [
            {
                'chapterId': 1,
                'title': 'Chương I: Số hữu tỉ',
                'description': 'Tập hợp các số hữu tỉ, các phép tính với số hữu tỉ và lũy thừa',
                'lessons': [
                    {'lessonId': 'K7_C1_B1', 'name': 'Bài 1: Tập hợp các số hữu tỉ', 'questionCount': 0},
                    {'lessonId': 'K7_C1_B2', 'name': 'Bài 2: Cộng, trừ, nhân, chia số hữu tỉ', 'questionCount': 0}
                ]
            },
            {
                'chapterId': 2,
                'title': 'Chương II: Số thực',
                'description': 'Số vô tỉ, căn bậc hai số học và tập hợp số thực',
                'lessons': [
                    {'lessonId': 'K7_C2_B5', 'name': 'Bài 5: Số vô tỉ. Căn bậc hai số học', 'questionCount': 0}
                ]
            }
        ]
    },
    '8': {
        'gradeName': 'Toán 8 (Kết nối tri thức với cuộc sống)',
        'chapters': [
            {
                'chapterId': 1,
                'title': 'Chương I: Đa thức',
                'description': 'Đơn thức, đa thức nhiều biến và các phép toán',
                'lessons': [
                    {'lessonId': 'K8_C1_B1', 'name': 'Bài 1: Đơn thức', 'questionCount': 0},
                    {'lessonId': 'K8_C1_B2', 'name': 'Bài 2: Đa thức', 'questionCount': 0}
                ]
            }
        ]
    },
    '9': {
        'gradeName': 'Toán 9 (Kết nối tri thức với cuộc sống)',
        'chapters': [
            {
                'chapterId': 1,
                'title': 'Chương I: Phương trình và hệ phương trình',
                'description': 'Phương trình bậc nhất hai ẩn, hệ hai phương trình bậc nhất hai ẩn',
                'lessons': [
                    {'lessonId': 'K9_C1_B1', 'name': 'Bài 1: Khái niệm phương trình bậc nhất hai ẩn', 'questionCount': 0}
                ]
            }
        ]
    }
}

helper_code = """
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

// Hỗ trợ xuất ra môi trường trình duyệt (window) & Node.js
if (typeof window !== 'undefined') {
  window.EXAM_DATA = EXAM_DATA;
  window.KNTT_CURRICULUM_TREE = KNTT_CURRICULUM_TREE;
  window.getQuestionsForArena = getQuestionsForArena;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    EXAM_DATA: EXAM_DATA,
    KNTT_CURRICULUM_TREE: KNTT_CURRICULUM_TREE,
    getQuestionsForArena: getQuestionsForArena
  };
}
"""

output = '// =============================================================================\n'
output += '// CƠ SỞ DỮ LIỆU ĐỀ THI & ĐẤU TRƯỜNG TOÁN THCS (GDPT 2018 - KẾT NỐI TRI THỨC)\n'
output += '// =============================================================================\n\n'
output += 'const EXAM_DATA = ' + json.dumps(exams, ensure_ascii=False, indent=2) + ';\n\n'
output += 'const KNTT_CURRICULUM_TREE = ' + json.dumps(curriculum, ensure_ascii=False, indent=2) + ';\n\n'
output += helper_code

with open('questions_data.js', 'w', encoding='utf-8') as f:
    f.write(output)

print('SUCCESS! questions_data.js written. Size:', len(output))
