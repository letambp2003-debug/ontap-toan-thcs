/**
 * =============================================================================
 * GEOMETRY SVG VECTOR ENGINE (BỘ VẼ HÌNH HỌC VECTOR TỰ ĐỘNG CHUẨN SGK)
 * Dành cho Chuyên đề Tứ giác - Toán 8 (KNTT) & GDPT 2018
 * =============================================================================
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.GeometrySvgEngine = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {

  const Engine = {
    // 1. VẼ HÌNH THANG CÂN (ISOSCELES TRAPEZOID)
    renderTrapezoid: function(options) {
      options = options || {};
      const w = 260;
      const h = 160;
      // Tọa độ 4 đỉnh: A(75, 40), B(185, 40), C(225, 125), D(35, 125)
      // Đường cao AH từ A(75, 40) vuông góc xuống D-C tại H(75, 125)
      return `
        <svg viewBox="0 0 ${w} ${h}" class="max-w-[240px] max-h-[150px] mx-auto my-2 select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradTrap" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#eff6ff" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#dbeafe" stop-opacity="0.5"/>
            </linearGradient>
          </defs>
          <!-- Thân hình thang cân -->
          <polygon points="75,40 185,40 225,125 35,125" fill="url(#gradTrap)" stroke="#1e293b" stroke-width="2" stroke-linejoin="round"/>
          
          <!-- Đường cao AH (nét đứt) -->
          <line x1="75" y1="40" x2="75" y2="125" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="4,3"/>
          <!-- Ký hiệu góc vuông tại H -->
          <path d="M 75,115 L 85,115 L 85,125" fill="none" stroke="#3b82f6" stroke-width="1.2"/>
          
          <!-- Cung góc ở hai đáy D và C -->
          <path d="M 55,125 A 20,20 0 0,0 48,110" fill="none" stroke="#e11d48" stroke-width="1.5"/>
          <path d="M 205,125 A 20,20 0 0,1 212,110" fill="none" stroke="#e11d48" stroke-width="1.5"/>

          <!-- Đỉnh A, B, C, D, H -->
          <text x="68" y="32" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="13" fill="#0f172a">A</text>
          <text x="188" y="32" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="13" fill="#0f172a">B</text>
          <text x="232" y="132" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="13" fill="#0f172a">C</text>
          <text x="20" y="132" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="13" fill="#0f172a">D</text>
          <text x="70" y="142" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="11" fill="#3b82f6">H</text>
        </svg>
      `;
    },

    // 2. VẼ HÌNH BÌNH HÀNH (PARALLELOGRAM)
    renderParallelogram: function(options) {
      options = options || {};
      const w = 260;
      const h = 160;
      // Đỉnh: A(70, 35), B(220, 35), C(190, 125), D(40, 125)
      // Giao điểm đường chéo O: trung điểm AC: (130, 80)
      return `
        <svg viewBox="0 0 ${w} ${h}" class="max-w-[240px] max-h-[150px] mx-auto my-2 select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradPara" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#f0fdf4" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#dcfce7" stop-opacity="0.5"/>
            </linearGradient>
          </defs>
          <!-- Thân hình bình hành -->
          <polygon points="70,35 220,35 190,125 40,125" fill="url(#gradPara)" stroke="#1e293b" stroke-width="2" stroke-linejoin="round"/>
          
          <!-- Hai đường chéo AC và BD -->
          <line x1="70" y1="35" x2="190" y2="125" stroke="#059669" stroke-width="1.5" stroke-dasharray="4,3"/>
          <line x1="220" y1="35" x2="40" y2="125" stroke="#059669" stroke-width="1.5" stroke-dasharray="4,3"/>
          
          <!-- Điểm O -->
          <circle cx="130" cy="80" r="3" fill="#059669"/>

          <!-- Đỉnh -->
          <text x="62" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="13" fill="#0f172a">A</text>
          <text x="225" y="32" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="13" fill="#0f172a">B</text>
          <text x="195" y="135" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="13" fill="#0f172a">C</text>
          <text x="25" y="132" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="13" fill="#0f172a">D</text>
          <text x="135" y="78" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="12" fill="#059669">O</text>
        </svg>
      `;
    },

    // 3. VẼ HÌNH CHỮ NHẬT (RECTANGLE)
    renderRectangle: function(options) {
      options = options || {};
      const w = 260;
      const h = 160;
      // Đỉnh: A(45, 35), B(215, 35), C(215, 125), D(45, 125)
      return `
        <svg viewBox="0 0 ${w} ${h}" class="max-w-[240px] max-h-[150px] mx-auto my-2 select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradRect" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#f8fafc" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#e2e8f0" stop-opacity="0.5"/>
            </linearGradient>
          </defs>
          <!-- Thân hình chữ nhật -->
          <rect x="45" y="35" width="170" height="90" fill="url(#gradRect)" stroke="#1e293b" stroke-width="2" stroke-linejoin="round"/>
          
          <!-- Hai đường chéo AC và BD -->
          <line x1="45" y1="35" x2="215" y2="125" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="4,3"/>
          <line x1="215" y1="35" x2="45" y2="125" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="4,3"/>
          
          <!-- Ký hiệu góc vuông tại A, B, C, D -->
          <path d="M 45,47 L 57,47 L 57,35" fill="none" stroke="#1e293b" stroke-width="1.2"/>
          <path d="M 203,35 L 203,47 L 215,47" fill="none" stroke="#1e293b" stroke-width="1.2"/>
          <path d="M 215,113 L 203,113 L 203,125" fill="none" stroke="#1e293b" stroke-width="1.2"/>
          <path d="M 57,125 L 57,113 L 45,113" fill="none" stroke="#1e293b" stroke-width="1.2"/>

          <!-- Điểm O -->
          <circle cx="130" cy="80" r="3" fill="#6366f1"/>

          <!-- Đỉnh -->
          <text x="32" y="30" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="13" fill="#0f172a">A</text>
          <text x="220" y="30" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="13" fill="#0f172a">B</text>
          <text x="220" y="135" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="13" fill="#0f172a">C</text>
          <text x="32" y="135" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="13" fill="#0f172a">D</text>
          <text x="135" y="76" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="12" fill="#6366f1">O</text>
        </svg>
      `;
    },

    // 4. VẼ HÌNH THOI (RHOMBUS)
    renderRhombus: function(options) {
      options = options || {};
      const w = 260;
      const h = 160;
      // Đỉnh: A(130, 25), B(225, 80), C(130, 135), D(35, 80)
      // Trung điểm O(130, 80), đường chéo vuông góc
      return `
        <svg viewBox="0 0 ${w} ${h}" class="max-w-[240px] max-h-[150px] mx-auto my-2 select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradRhomb" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fffbeb" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#fef3c7" stop-opacity="0.5"/>
            </linearGradient>
          </defs>
          <!-- Thân hình thoi -->
          <polygon points="130,25 225,80 130,135 35,80" fill="url(#gradRhomb)" stroke="#1e293b" stroke-width="2" stroke-linejoin="round"/>
          
          <!-- Hai đường chéo AC và BD -->
          <line x1="130" y1="25" x2="130" y2="135" stroke="#d97706" stroke-width="1.5" stroke-dasharray="4,3"/>
          <line x1="35" y1="80" x2="225" y2="80" stroke="#d97706" stroke-width="1.5" stroke-dasharray="4,3"/>
          
          <!-- Ký hiệu góc vuông tại O -->
          <path d="M 130,70 L 140,70 L 140,80" fill="none" stroke="#d97706" stroke-width="1.2"/>

          <!-- Đỉnh -->
          <text x="125" y="18" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="13" fill="#0f172a">A</text>
          <text x="232" y="85" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="13" fill="#0f172a">B</text>
          <text x="125" y="152" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="13" fill="#0f172a">C</text>
          <text x="20" y="85" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="13" fill="#0f172a">D</text>
          <text x="143" y="93" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="11" fill="#d97706">O</text>
        </svg>
      `;
    },

    // 5. VẼ HÌNH VUÔNG (SQUARE)
    renderSquare: function(options) {
      options = options || {};
      const w = 260;
      const h = 160;
      // Đỉnh: A(75, 25), B(185, 25), C(185, 135), D(75, 135)
      return `
        <svg viewBox="0 0 ${w} ${h}" class="max-w-[240px] max-h-[150px] mx-auto my-2 select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradSquare" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#e0f2fe" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#bae6fd" stop-opacity="0.5"/>
            </linearGradient>
          </defs>
          <!-- Thân hình vuông -->
          <rect x="75" y="25" width="110" height="110" fill="url(#gradSquare)" stroke="#1e293b" stroke-width="2" stroke-linejoin="round"/>
          
          <!-- Hai đường chéo AC và BD -->
          <line x1="75" y1="25" x2="185" y2="135" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="4,3"/>
          <line x1="185" y1="25" x2="75" y2="135" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="4,3"/>
          
          <!-- Góc vuông tại A và O -->
          <path d="M 75,37 L 87,37 L 87,25" fill="none" stroke="#1e293b" stroke-width="1.2"/>
          <circle cx="130" cy="80" r="3" fill="#0284c7"/>

          <!-- Đỉnh -->
          <text x="60" y="22" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="13" fill="#0f172a">A</text>
          <text x="190" y="22" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="13" fill="#0f172a">B</text>
          <text x="190" y="145" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="13" fill="#0f172a">C</text>
          <text x="60" y="145" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="13" fill="#0f172a">D</text>
          <text x="135" y="76" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="11" fill="#0284c7">O</text>
        </svg>
      `;
    },

    // 6. TỰ ĐỘNG PHÁT HIỆN VÀ GẮN HÌNH MINH HỌA VÀO CÂU HỎI
    getDiagramForQuestion: function(question) {
      if (!question) return null;
      if (question.diagram) {
        switch (question.diagram) {
          case 'trapezoid': return this.renderTrapezoid();
          case 'parallelogram': return this.renderParallelogram();
          case 'rectangle': return this.renderRectangle();
          case 'rhombus': return this.renderRhombus();
          case 'square': return this.renderSquare();
        }
      }

      const text = ((question.content || '') + ' ' + (question.topic || '') + ' ' + (question.lessonName || '')).toLowerCase();
      
      // Chỉ gắn hình nếu là bài thuộc tứ giác hoặc hình học
      if (!text.includes('hình') && !text.includes('tứ giác')) return null;

      if (text.includes('hình thang cân') || text.includes('hình thang')) {
        return this.renderTrapezoid();
      }
      if (text.includes('hình bình hành')) {
        return this.renderParallelogram();
      }
      if (text.includes('hình chữ nhật')) {
        return this.renderRectangle();
      }
      if (text.includes('hình thoi')) {
        return this.renderRhombus();
      }
      if (text.includes('hình vuông')) {
        return this.renderSquare();
      }

      return null;
    }
  };

  return Engine;
}));
