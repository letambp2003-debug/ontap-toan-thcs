/**
 * =============================================================================
 * EXAM EXPORT ENGINE (BỘ XUẤT ĐỀ THI CHUẨN BỘ GIÁO DỤC & ĐÀO TẠO - WORD & PDF)
 * Dành cho Hệ Thống Khảo Thí & Quản Trị Đề Thi Toán THCS (KNTT)
 * =============================================================================
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ExamExportEngine = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {

  const Engine = {
    // 1. CHUẨN HÓA CÔNG THỨC TOÁN CHO MICROSOFT WORD
    mathToWordText: function(str) {
      if (!str) return '';
      let text = String(str);
      // Thay thế các ký hiệu KaTeX cơ bản sang ký tự Unicode đẹp trong Word
      text = text.replace(/\$([^$]+)\$/g, function(match, inner) {
        let m = inner;
        m = m.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1/$2');
        m = m.replace(/\\cdot/g, '·');
        m = m.replace(/\\times/g, '×');
        m = m.replace(/\\le/g, '≤');
        m = m.replace(/\\ge/g, '≥');
        m = m.replace(/\\ne/g, '≠');
        m = m.replace(/\\approx/g, '≈');
        m = m.replace(/\\sqrt\{([^}]+)\}/g, '√($1)');
        m = m.replace(/\\sqrt/g, '√');
        m = m.replace(/\\pm/g, '±');
        m = m.replace(/\\in/g, '∈');
        m = m.replace(/\\notin/g, '∉');
        m = m.replace(/\\subset/g, '⊂');
        m = m.replace(/\\not\\subset/g, '⊄');
        m = m.replace(/\\varnothing/g, '∅');
        m = m.replace(/\\mathbb\{R\}/g, 'ℝ');
        m = m.replace(/\\mathbb\{Q\}/g, 'ℚ');
        m = m.replace(/\\mathbb\{Z\}/g, 'ℤ');
        m = m.replace(/\\mathbb\{N\}/g, 'ℕ');
        m = m.replace(/\\mathbb\{I\}/g, '𝕀');
        m = m.replace(/\\parallel/g, '∥');
        m = m.replace(/\\perp/g, '⊥');
        m = m.replace(/\\widehat\{([^}]+)\}/g, '∠$1');
        m = m.replace(/\^\\circ/g, '°');
        m = m.replace(/\^2/g, '²');
        m = m.replace(/\^3/g, '³');
        m = m.replace(/\^4/g, '⁴');
        m = m.replace(/\^5/g, '⁵');
        m = m.replace(/\^n/g, 'ⁿ');
        m = m.replace(/_1/g, '₁');
        m = m.replace(/_2/g, '₂');
        m = m.replace(/\\Delta/g, 'Δ');
        m = m.replace(/\\text\{([^}]+)\}/g, '$1');
        return m;
      });
      return text;
    },

    // 2. SINH HTML ĐẦY ĐỦ CHUẨN ĐỀ THI BỘ GD&ĐT
    generateMinistryHtml: function(exam, options) {
      options = options || {};
      const schoolName = options.schoolName || "TRƯỜNG THCS ........................................";
      const departmentName = options.departmentName || "PHÒNG GD&ĐT ...................................";
      const examYear = options.examYear || "2025 - 2026";
      const includeAnswers = options.includeAnswers !== false;
      const isWordExport = !!options.isWordExport;

      const questions = exam.questions || [];
      const mcqQuestions = questions.filter(q => q.type === 'mcq' || (!q.items && !q.correctAnswers));
      const tfQuestions = questions.filter(q => q.type === 'tf' || (q.items && q.items.length > 0));
      const shortQuestions = questions.filter(q => q.type === 'short' || (q.correctAnswers && q.correctAnswers.length > 0));

      const formatText = isWordExport ? this.mathToWordText : (t => t);

      // Phần I: Trắc nghiệm 4 lựa chọn
      let part1Html = '';
      if (mcqQuestions.length > 0) {
        part1Html = `
          <div class="part-container" style="margin-top: 15px;">
            <div style="font-weight: bold; font-size: 13pt; text-transform: uppercase; margin-bottom: 5px;">
              PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn (${mcqQuestions.length} câu)
            </div>
            <div style="font-style: italic; font-size: 11pt; margin-bottom: 10px; color: #475569;">
              Thí sinh trả lời từ câu 1 đến câu ${mcqQuestions.length}. Mỗi câu hỏi thí sinh chỉ chọn một phương án đúng nhất.
            </div>
            ${mcqQuestions.map(q => {
              const svgDiagram = (typeof GeometrySvgEngine !== 'undefined' && !isWordExport) 
                ? (GeometrySvgEngine.getDiagramForQuestion(q) || '') 
                : '';

              const opts = q.options || [];
              return `
                <div class="question-block" style="margin-bottom: 12px; page-break-inside: avoid;">
                  <div style="font-size: 12pt; line-height: 1.5; margin-bottom: 4px;">
                    <strong>Câu ${q.number}.</strong> ${formatText(q.content)}
                  </div>
                  ${svgDiagram}
                  <div style="display: table; width: 100%; margin-top: 4px; font-size: 11.5pt;">
                    <div style="display: table-row;">
                      <div style="display: table-cell; width: 25%; padding: 2px 4px;"><strong>A.</strong> ${formatText(opts[0] ? opts[0].text : '')}</div>
                      <div style="display: table-cell; width: 25%; padding: 2px 4px;"><strong>B.</strong> ${formatText(opts[1] ? opts[1].text : '')}</div>
                      <div style="display: table-cell; width: 25%; padding: 2px 4px;"><strong>C.</strong> ${formatText(opts[2] ? opts[2].text : '')}</div>
                      <div style="display: table-cell; width: 25%; padding: 2px 4px;"><strong>D.</strong> ${formatText(opts[3] ? opts[3].text : '')}</div>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `;
      }

      // Phần II: Trắc nghiệm Đúng / Sai
      let part2Html = '';
      if (tfQuestions.length > 0) {
        part2Html = `
          <div class="part-container" style="margin-top: 20px;">
            <div style="font-weight: bold; font-size: 13pt; text-transform: uppercase; margin-bottom: 5px;">
              PHẦN II. Câu trắc nghiệm đúng sai (${tfQuestions.length} câu)
            </div>
            <div style="font-style: italic; font-size: 11pt; margin-bottom: 10px; color: #475569;">
              Thí sinh trả lời các câu hỏi sau. Trong mỗi ý a), b), c), d) ở mỗi câu, thí sinh chọn đúng hoặc sai.
            </div>
            ${tfQuestions.map(q => {
              const svgDiagram = (typeof GeometrySvgEngine !== 'undefined' && !isWordExport) 
                ? (GeometrySvgEngine.getDiagramForQuestion(q) || '') 
                : '';

              return `
                <div class="question-block" style="margin-bottom: 14px; page-break-inside: avoid;">
                  <div style="font-size: 12pt; line-height: 1.5; margin-bottom: 4px;">
                    <strong>Câu ${q.number}.</strong> ${formatText(q.content || q.prompt)}
                  </div>
                  ${svgDiagram}
                  <table style="width: 100%; border-collapse: collapse; margin-top: 4px; font-size: 11.5pt;">
                    ${(q.items || []).map(it => `
                      <tr>
                        <td style="width: 85%; padding: 3px 0; vertical-align: top;">
                          <strong>${it.key || it.label})</strong> ${formatText(it.text)}
                        </td>
                        <td style="width: 15%; text-align: right; font-style: italic; color: #64748b; font-size: 10.5pt;">
                          [ Đúng / Sai ]
                        </td>
                      </tr>
                    `).join('')}
                  </table>
                </div>
              `;
            }).join('')}
          </div>
        `;
      }

      // Phần III: Trả lời ngắn
      let part3Html = '';
      if (shortQuestions.length > 0) {
        part3Html = `
          <div class="part-container" style="margin-top: 20px;">
            <div style="font-weight: bold; font-size: 13pt; text-transform: uppercase; margin-bottom: 5px;">
              PHẦN III. Câu trắc nghiệm trả lời ngắn (${shortQuestions.length} câu)
            </div>
            <div style="font-style: italic; font-size: 11pt; margin-bottom: 10px; color: #475569;">
              Thí sinh trả lời các câu hỏi sau và viết kết quả cuối cùng vào ô tương ứng.
            </div>
            ${shortQuestions.map(q => {
              const svgDiagram = (typeof GeometrySvgEngine !== 'undefined' && !isWordExport) 
                ? (GeometrySvgEngine.getDiagramForQuestion(q) || '') 
                : '';

              return `
                <div class="question-block" style="margin-bottom: 12px; page-break-inside: avoid;">
                  <div style="font-size: 12pt; line-height: 1.5; margin-bottom: 4px;">
                    <strong>Câu ${q.number}.</strong> ${formatText(q.content)}
                  </div>
                  ${svgDiagram}
                  <div style="font-size: 11pt; margin-top: 4px; color: #334155;">
                    Đáp số: ..........................................................................................................
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `;
      }

      // Bảng đáp án và hướng dẫn chấm
      let answersTableHtml = '';
      if (includeAnswers) {
        answersTableHtml = `
          <div class="answers-section" style="page-break-before: always; margin-top: 30px; padding-top: 15px; border-top: 2px dashed #94a3b8;">
            <div style="text-align: center; font-weight: bold; font-size: 14pt; text-transform: uppercase; margin-bottom: 10px;">
              ĐÁP ÁN & HƯỚNG DẪN CHẤM CHI TIẾT
            </div>
            <div style="text-align: center; font-style: italic; margin-bottom: 15px; font-size: 11pt;">
              (Kèm theo Đề kiểm tra mã: <strong>${exam.examCode || exam.code || '101'}</strong> - Môn Toán ${exam.grade})
            </div>
            
            <table style="width: 100%; border-collapse: collapse; font-size: 11pt;" border="1" cellpadding="6">
              <thead>
                <tr style="background-color: #f1f5f9; text-align: center;">
                  <th style="width: 10%; border: 1px solid #000;">Câu</th>
                  <th style="width: 15%; border: 1px solid #000;">Dạng</th>
                  <th style="width: 25%; border: 1px solid #000;">Đáp án đúng</th>
                  <th style="width: 50%; border: 1px solid #000;">Hướng dẫn giải tóm tắt</th>
                </tr>
              </thead>
              <tbody>
                ${questions.map(q => {
                  let ansText = '';
                  if (q.type === 'tf' || (q.items && q.items.length > 0)) {
                    ansText = (q.items || []).map(it => `${it.key}: ${it.correctAnswer}`).join('; ');
                  } else if (q.type === 'short' || q.correctAnswers) {
                    ansText = q.correctAnswers ? q.correctAnswers.join(' hoặc ') : (q.correctAnswer || '');
                  } else {
                    ansText = q.correctAnswer || 'A';
                  }

                  let typeLabel = q.type === 'tf' ? 'Đúng/Sai' : (q.type === 'short' ? 'Điền số' : 'Trắc nghiệm');
                  return `
                    <tr>
                      <td style="text-align: center; font-weight: bold; border: 1px solid #000;">Câu ${q.number}</td>
                      <td style="text-align: center; border: 1px solid #000;">${typeLabel}</td>
                      <td style="text-align: center; font-weight: bold; color: #b91c1c; border: 1px solid #000;">${formatText(ansText)}</td>
                      <td style="border: 1px solid #000; font-size: 10pt;">${formatText(q.explanation || 'Áp dụng quy tắc và công thức SGK Kết nối tri thức.')}</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        `;
      }

      return `
        <div class="ministry-exam-page" style="font-family: 'Times New Roman', Times, serif; color: #000; max-width: 800px; margin: 0 auto; line-height: 1.35; padding: 20px;">
          
          <!-- BẢNG TIÊU ĐỀ 2 CỘT CHUẨN BỘ GIÁO DỤC -->
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;" border="0">
            <tr>
              <td style="width: 45%; text-align: center; vertical-align: top; line-height: 1.4;">
                <div style="font-size: 11pt; text-transform: uppercase;">${departmentName}</div>
                <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase;">${schoolName}</div>
                <div style="font-size: 10pt; margin-top: 4px;">─────────────</div>
                <div style="font-size: 11pt; font-weight: bold; margin-top: 4px;">ĐỀ CHÍNH THỨC</div>
              </td>
              <td style="width: 55%; text-align: center; vertical-align: top; line-height: 1.4;">
                <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase;">KIỂM TRA ĐỊNH KỲ NĂM HỌC ${examYear}</div>
                <div style="font-size: 12.5pt; font-weight: bold; text-transform: uppercase; color: #0f172a;">MÔN: TOÁN - KHỐI ${exam.grade || 8}</div>
                <div style="font-size: 11pt; font-style: italic;">Thời gian làm bài: <strong>${exam.timeMinutes || 45} phút</strong></div>
                <div style="font-size: 10.5pt; font-style: italic;">(Không kể thời gian phát đề)</div>
                <div style="margin-top: 5px; font-weight: bold; font-size: 11.5pt;">Mã đề thi: <span style="border: 1px solid #000; padding: 1px 8px;">${exam.examCode || exam.code || '101'}</span></div>
              </td>
            </tr>
          </table>

          <!-- KHUNG ĐIỀN THÔNG TIN THÍ SINH -->
          <div style="border: 1px solid #000; padding: 8px 12px; margin-bottom: 18px; font-size: 11.5pt; line-height: 1.8;">
            Họ và tên học sinh: .................................................................................... Lớp: ........................<br>
            Số báo danh: ..................................................... Phòng thi: ..................... Điểm số: ....................
          </div>

          <!-- NỘI DUNG CÁC PHẦN ĐỀ THI -->
          ${part1Html}
          ${part2Html}
          ${part3Html}

          <div style="text-align: center; font-style: italic; margin-top: 25px; font-size: 11pt;">
            ─── HẾT ───<br>
            <span style="font-size: 10pt; color: #64748b;">(Cán bộ coi thi không giải thích gì thêm)</span>
          </div>

          <!-- BẢNG ĐÁP ÁN -->
          ${answersTableHtml}

        </div>
      `;
    },

    // 3. XUẤT FILE WORD (.DOC / .DOCX)
    exportToWordDocx: function(exam, options) {
      options = options || {};
      options.isWordExport = true;
      const htmlContent = this.generateMinistryHtml(exam, options);

      const wordTemplate = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset='utf-8'>
          <title>${exam.title}</title>
          <style>
            @page Section1 {
              size: 210mm 297mm;
              margin: 20mm 15mm 20mm 20mm;
              mso-header-margin: 10mm;
              mso-footer-margin: 10mm;
              mso-paper-source: 0;
            }
            div.Section1 { page: Section1; }
            body {
              font-family: 'Times New Roman', Times, serif;
              font-size: 12pt;
              line-height: 1.35;
              color: #000;
            }
            table { border-collapse: collapse; }
          </style>
        </head>
        <body>
          <div class="Section1">
            ${htmlContent}
          </div>
        </body>
        </html>
      `;

      const blob = new Blob(['\ufeff', wordTemplate], {
        type: 'application/msword;charset=utf-8'
      });

      const filename = `De_Thi_Toan_${exam.grade || 8}_${(exam.examCode || exam.code || '101').replace(/[^a-zA-Z0-9_-]/g, '')}.doc`;
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    },

    // 4. IN ẤN & LƯU PDF CHUẨN VECTOR VỚI KATEX
    printExamPdf: function(exam, options) {
      options = options || {};
      options.isWordExport = false;
      const htmlBody = this.generateMinistryHtml(exam, options);

      const printWindow = window.open('', '_blank', 'width=900,height=800');
      if (!printWindow) {
        alert('Trình duyệt đang chặn cửa sổ bật lên (Pop-up). Vui lòng cho phép Pop-up để in đề thi.');
        return;
      }

      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="vi">
        <head>
          <meta charset="UTF-8">
          <title>${exam.title} - Bản In Chuẩn Bộ GD&ĐT</title>
          
          <!-- KaTeX CDN -->
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
          <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
          <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>

          <style>
            body {
              font-family: 'Times New Roman', Times, serif;
              background-color: #fff;
              color: #000;
              margin: 0;
              padding: 0;
            }
            @page {
              size: A4;
              margin: 15mm 15mm 15mm 15mm;
            }
            @media print {
              .no-print { display: none !important; }
              body { padding: 0 !important; }
              .page-break { page-break-before: always; }
            }
            .print-toolbar {
              background: #f8fafc;
              border-bottom: 1px solid #e2e8f0;
              padding: 12px 24px;
              position: sticky;
              top: 0;
              z-index: 100;
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-family: system-ui, sans-serif;
            }
            .btn {
              padding: 8px 16px;
              font-weight: bold;
              border-radius: 8px;
              cursor: pointer;
              font-size: 13px;
              border: none;
            }
            .btn-primary { background: #2563eb; color: #fff; }
            .btn-secondary { background: #e2e8f0; color: #334155; margin-right: 8px; }
            .katex { font-size: 1.05em !important; }
          </style>
        </head>
        <body>
          <div class="print-toolbar no-print">
            <div>
              <strong>Bản Xem Trước In / Lưu PDF (Chuẩn Bộ GD&ĐT)</strong>
              <span style="color: #64748b; font-size: 12px; margin-left: 10px;">Toán ${exam.grade || 8} &bull; Mã đề: ${exam.examCode || '101'}</span>
            </div>
            <div>
              <button onclick="window.close()" class="btn btn-secondary">Đóng</button>
              <button onclick="window.print()" class="btn btn-primary">🖨️ In Ngay / Lưu PDF</button>
            </div>
          </div>

          <div id="printContent">
            ${htmlBody}
          </div>

          <script>
            window.addEventListener('DOMContentLoaded', () => {
              if (window.renderMathInElement) {
                renderMathInElement(document.getElementById('printContent'), {
                  delimiters: [
                    { left: '$$', right: '$$', display: true },
                    { left: '$', right: '$', display: false },
                    { left: '\\\\(', right: '\\\\)', display: false },
                    { left: '\\\\[', right: '\\\\]', display: true }
                  ],
                  throwOnError: false
                });
              }
            });
          </script>
        </body>
        </html>
      `);

      printWindow.document.close();
    }
  };

  return Engine;
}));
