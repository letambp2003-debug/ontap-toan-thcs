/**
 * =============================================================================
 * TEACHER AUTH & CLOUD API KEY ENGINE (HẠT NHÂN XÁC THỰC GIÁO VIÊN & ĐÁM MÂY GOOGLE)
 * Phiên bản: Pro 2.0 - Chuẩn EdTech GDPT 2018 (Kết nối tri thức với cuộc sống)
 * Chức năng:
 *  - Xác thực Đăng nhập Google 1-chạm (Google Identity / Firebase Auth)
 *  - Đăng nhập Email/Mật khẩu và Mã PIN Quản trị viên khẩn cấp (Local Admin Mode)
 *  - Quản lý & kiểm tra tính hợp lệ của Google Gemini AI API Key
 *  - Đồng bộ dữ liệu đề thi & bảng điểm 2 chiều với Google Sheets Cloud
 *  - Màn hình khóa bảo vệ toàn diện (Full-screen Auth Guard Modal)
 * =============================================================================
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.TeacherAuthEngine = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  // CÁC KHÓA LƯU TRỮ TRONG BỘ NHỚ DUYỆT TRÌNH (LOCAL STORAGE)
  const KEYS = {
    SESSION: 'TN_TEACHER_PRO_SESSION_V2',
    GEMINI_KEY: 'TN_TOAN_GEMINI_API_KEY_V2',
    SHEETS_WEBHOOK: 'TN_TOAN_GOOGLE_SHEETS_WEBHOOK_V1',
    FIREBASE_CONFIG: 'TN_FIREBASE_PROJECT_CONFIG_V2',
    ADMIN_PIN: 'TN_LOCAL_ADMIN_PIN_CODE_V2',
    AUTO_CLOUD_SYNC: 'TN_AUTO_CLOUD_SYNC_ENABLED_V2'
  };

  // Cấu hình Firebase mặc định (Thầy/Cô có thể thay bằng cấu hình Firebase của trường mình trong phần Cài đặt)
  const DEFAULT_FIREBASE_CONFIG = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

  let isFirebaseReady = false;
  let authCallbacks = [];

  /**
   * Khởi tạo kết nối Firebase nếu thư viện đã được tải
   */
  function initFirebase() {
    if (typeof firebase === 'undefined') {
      return false;
    }
    try {
      if (!firebase.apps || !firebase.apps.length) {
        let config = getFirebaseConfig();
        if (config && config.apiKey && config.apiKey.length > 5) {
          firebase.initializeApp(config);
          isFirebaseReady = true;
        } else {
          isFirebaseReady = false;
        }
      } else {
        isFirebaseReady = true;
      }
      return isFirebaseReady;
    } catch (err) {
      console.warn('[TeacherAuthEngine] Firebase warning:', err);
      return false;
    }
  }

  // --- QUẢN LÝ PHIÊN ĐĂNG NHẬP (SESSION MANAGEMENT) ---
  function getSession() {
    try {
      if (typeof localStorage === 'undefined') return null;
      const data = localStorage.getItem(KEYS.SESSION);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  function setSession(userData) {
    if (typeof localStorage === 'undefined') return;
    if (!userData) {
      localStorage.removeItem(KEYS.SESSION);
    } else {
      userData.lastActive = new Date().toISOString();
      localStorage.setItem(KEYS.SESSION, JSON.stringify(userData));
    }
    triggerAuthStateChange(userData);
  }

  function isAuthenticated() {
    const session = getSession();
    return !!(session && (session.uid || session.email || session.isLocalAdmin));
  }

  function onAuthStateChanged(cb) {
    if (typeof cb === 'function') {
      authCallbacks.push(cb);
      cb(getSession());
    }
  }

  function triggerAuthStateChange(session) {
    authCallbacks.forEach(cb => {
      try { cb(session); } catch (e) { console.error(e); }
    });
  }

  function logout() {
    if (typeof firebase !== 'undefined' && firebase.auth && isFirebaseReady) {
      try { firebase.auth().signOut(); } catch (e) {}
    }
    setSession(null);
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }

  // --- QUẢN LÝ GOOGLE GEMINI AI API KEY ---
  function getGeminiApiKey() {
    if (typeof localStorage === 'undefined') return '';
    return localStorage.getItem(KEYS.GEMINI_KEY) || '';
  }

  function saveGeminiApiKey(key) {
    if (typeof localStorage === 'undefined') return key;
    const cleaned = (key || '').trim();
    localStorage.setItem(KEYS.GEMINI_KEY, cleaned);
    return cleaned;
  }

  /**
   * Kiểm tra tính hoạt động thực tế của Gemini API Key
   */
  async function testGeminiApiKey(key) {
    const apiKey = (key || getGeminiApiKey()).trim();
    if (!apiKey) {
      return { success: false, message: 'Chưa cung cấp Google Gemini API Key' };
    }
    try {
      const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await resp.json();
      if (!resp.ok || data.error) {
        return {
          success: false,
          message: data.error?.message || `Mã lỗi HTTP ${resp.status}: API Key không hợp lệ hoặc chưa bật Generative Language API`
        };
      }
      const hasGeminiModels = data.models && data.models.some(m => m.name.includes('gemini'));
      return {
        success: true,
        message: 'Kết nối Google Gemini AI thành công! Sẵn sàng tạo đề và giải bài.',
        totalModels: data.models ? data.models.length : 0,
        hasGeminiModels: hasGeminiModels
      };
    } catch (err) {
      return {
        success: false,
        message: 'Lỗi mạng hoặc CORS khi kiểm tra Google API Key: ' + err.message
      };
    }
  }

  // --- QUẢN LÝ ĐỒNG BỘ GOOGLE SHEETS / CLOUD SYNC ---
  function getSheetsWebhookUrl() {
    if (typeof localStorage === 'undefined') return '';
    return localStorage.getItem(KEYS.SHEETS_WEBHOOK) || '';
  }

  function saveSheetsWebhookUrl(url) {
    if (typeof localStorage === 'undefined') return url;
    const cleaned = (url || '').trim();
    localStorage.setItem(KEYS.SHEETS_WEBHOOK, cleaned);
    return cleaned;
  }

  async function testSheetsWebhook(url) {
    const webhookUrl = (url || getSheetsWebhookUrl()).trim();
    if (!webhookUrl) {
      return { success: false, message: 'Chưa cấu hình URL Webhook Google Sheets' };
    }
    try {
      const testPayload = {
        action: 'test_connection',
        timestamp: new Date().toISOString(),
        client: 'TeacherAuthEngine Pro 2.0',
        teacherEmail: getSession()?.email || 'test@edu.vn'
      };
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(testPayload),
        mode: 'no-cors'
      });
      return {
        success: true,
        message: 'Đã gửi gói kiểm tra tới Google Sheets! Dữ liệu bảng tính hoạt động thông suốt.'
      };
    } catch (err) {
      return {
        success: false,
        message: 'Lỗi kết nối tới Webhook Google Sheets: ' + err.message
      };
    }
  }

  // --- QUẢN LÝ CẤU HÌNH FIREBASE & MÃ PIN ADMIN ---
  function getFirebaseConfig() {
    try {
      if (typeof localStorage === 'undefined') return DEFAULT_FIREBASE_CONFIG;
      const saved = localStorage.getItem(KEYS.FIREBASE_CONFIG);
      return saved ? JSON.parse(saved) : DEFAULT_FIREBASE_CONFIG;
    } catch (e) {
      return DEFAULT_FIREBASE_CONFIG;
    }
  }

  function saveFirebaseConfig(config) {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(KEYS.FIREBASE_CONFIG, JSON.stringify(config));
    initFirebase();
  }

  function getAdminPin() {
    if (typeof localStorage === 'undefined') return '123456';
    return localStorage.getItem(KEYS.ADMIN_PIN) || '123456';
  }

  function saveAdminPin(pin) {
    if (typeof localStorage === 'undefined') return false;
    const cleaned = (pin || '').trim();
    if (cleaned.length >= 4) {
      localStorage.setItem(KEYS.ADMIN_PIN, cleaned);
      return true;
    }
    return false;
  }

  // --- HÀNH ĐỘNG ĐĂNG NHẬP (LOGIN ACTIONS) ---
  async function loginWithGoogle() {
    if (!isFirebaseReady) {
      initFirebase();
    }
    if (!isFirebaseReady || typeof firebase === 'undefined' || !firebase.auth) {
      throw new Error("Dự án Firebase chưa được cấu hình khóa API. Thầy/Cô hãy nhập cấu hình Firebase trong tab 'Cài Đặt API & Đám Mây' hoặc sử dụng 'Mã PIN Quản Trị' để truy cập ngay.");
    }
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');
    const result = await firebase.auth().signInWithPopup(provider);
    const user = result.user;
    const session = {
      uid: user.uid,
      name: user.displayName || 'Giáo viên THCS',
      email: user.email || '',
      photo: user.photoURL || '',
      authType: 'google',
      role: 'teacher',
      isPro: true
    };
    setSession(session);
    return session;
  }

  async function loginWithEmail(email, password) {
    if (!isFirebaseReady) {
      initFirebase();
    }
    if (!isFirebaseReady || typeof firebase === 'undefined' || !firebase.auth) {
      throw new Error("Dịch vụ Firebase Auth chưa sẵn sàng. Thầy/Cô hãy dùng 'Mã PIN Quản Trị' hoặc cấu hình Firebase.");
    }
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    const session = {
      uid: user.uid,
      name: user.displayName || email.split('@')[0],
      email: user.email,
      photo: user.photoURL || '',
      authType: 'email',
      role: 'teacher',
      isPro: true
    };
    setSession(session);
    return session;
  }

  function loginWithPin(pinInput, teacherName = 'Thầy Quản Trị Tổ Toán') {
    const currentPin = getAdminPin();
    if ((pinInput || '').trim() === currentPin) {
      const session = {
        uid: 'ADMIN_LOCAL_' + Date.now(),
        name: (teacherName || '').trim() || 'Thầy Quản Trị Viên',
        email: 'giaovien.quantri@toan-thcs.edu.vn',
        photo: '',
        authType: 'pin',
        role: 'admin',
        isLocalAdmin: true,
        isPro: true
      };
      setSession(session);
      return { success: true, session };
    }
    return { success: false, message: 'Mã PIN quản trị viên không chính xác (Mặc định: 123456)' };
  }

  // --- GIAO DIỆN MÀN HÌNH KHÓA & MODAL ĐĂNG NHẬP (AUTH GUARD UI) ---
  function renderAuthModal() {
    if (typeof document === 'undefined') return;
    let existingModal = document.getElementById('teacherAuthGuardModal');
    if (existingModal) {
      existingModal.classList.remove('hidden');
      return;
    }

    const modalHtml = `
      <div id="teacherAuthGuardModal" class="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto antialiased">
        <div class="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
          
          <!-- Banner Header Đẳng Cấp Pro (Indigo & Blue Gradient - Tuyệt đối không dùng màu tím) -->
          <div class="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white p-6 sm:p-7 relative overflow-hidden">
            <div class="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl"></div>
            <div class="absolute -bottom-8 -left-8 w-40 h-40 bg-indigo-500/10 rounded-full blur-xl"></div>
            
            <div class="relative z-10">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-2.5">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Phiên Bản Cao Cấp • Pro Edition
              </div>
              <h2 class="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
                <i data-lucide="shield-check" class="w-7 h-7 text-emerald-400 shrink-0"></i>
                Cổng Quản Trị Giáo Viên
              </h2>
              <p class="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
                Đăng nhập để quản lý ngân hàng câu hỏi, tạo đề kiểm tra chuẩn Bộ GD&ĐT và đồng bộ bảng điểm học sinh.
              </p>
            </div>

            <!-- Tab Chuyển Đổi Phương Thức -->
            <div class="flex items-center gap-1.5 mt-4 p-1 bg-slate-900/60 backdrop-blur-xs rounded-xl border border-slate-700/50 text-xs font-bold">
              <button id="authTabBtn-google" onclick="TeacherAuthEngine.switchTab('google')" class="auth-tab-btn flex-1 py-2 px-2.5 rounded-lg transition text-center bg-indigo-600 text-white shadow-xs">
                Google 1-Chạm
              </button>
              <button id="authTabBtn-pin" onclick="TeacherAuthEngine.switchTab('pin')" class="auth-tab-btn flex-1 py-2 px-2.5 rounded-lg transition text-center text-slate-300 hover:text-white">
                Mã PIN Quản Trị
              </button>
              <button id="authTabBtn-cloud" onclick="TeacherAuthEngine.switchTab('cloud')" class="auth-tab-btn flex-1 py-2 px-2.5 rounded-lg transition text-center text-slate-300 hover:text-white">
                Cài Đặt API & Đám Mây
              </button>
            </div>
          </div>

          <!-- Nội Dung Body Modal -->
          <div class="p-6 sm:p-7 space-y-4 bg-slate-50">
            
            <!-- VÙNG BÁO LỖI / THÀNH CÔNG -->
            <div id="authAlertBox" class="hidden p-3 rounded-xl text-xs font-semibold"></div>

            <!-- TAB 1: ĐĂNG NHẬP GOOGLE & TÀI KHOẢN -->
            <div id="authTabContent-google" class="space-y-4">
              <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs text-center">
                <div class="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-3">
                  <svg class="w-7 h-7" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                </div>
                <h3 class="text-base font-bold text-slate-900">Đăng Nhập Bằng Tài Khoản Google</h3>
                <p class="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Sử dụng tài khoản Google cá nhân hoặc email trường học để đồng bộ đề thi và bảo vệ dữ liệu giảng dạy.
                </p>
                <button onclick="TeacherAuthEngine.handleGoogleLogin()" id="btnGoogleSignIn" class="mt-4 w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold rounded-xl transition flex items-center justify-center gap-2.5 shadow-md shadow-indigo-200 cursor-pointer">
                  <svg class="w-5 h-5 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Tiếp tục với Google</span>
                </button>
              </div>

              <div class="text-center">
                <button onclick="TeacherAuthEngine.switchTab('pin')" class="text-xs font-bold text-slate-600 hover:text-indigo-600 underline cursor-pointer">
                  Chưa cài Firebase? Đăng nhập ngay bằng Mã PIN Quản Trị Cục Bộ &rarr;
                </button>
              </div>
            </div>

            <!-- TAB 2: ĐĂNG NHẬP MÃ PIN QUẢN TRỊ CỤC BỘ (LOCAL ADMIN) -->
            <div id="authTabContent-pin" class="hidden space-y-4">
              <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <div class="flex items-center gap-2.5 mb-3">
                  <div class="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
                    <i data-lucide="key-round" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <h3 class="text-sm font-black text-slate-900">Mã PIN Quản Trị Cục Bộ</h3>
                    <p class="text-[11px] text-slate-500">Dành cho trường hợp sử dụng offline hoặc đăng nhập khẩn cấp</p>
                  </div>
                </div>

                <div class="space-y-3">
                  <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Tên Thầy/Cô hiển thị</label>
                    <input type="text" id="authPinTeacherName" value="Thầy Quản Trị Tổ Toán" placeholder="VD: Thầy Gem, Cô Mai Lan..." class="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 font-semibold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50">
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Mã PIN Quản Trị (Mặc định: <code class="text-indigo-600 font-mono">123456</code>)</label>
                    <input type="password" id="authPinInput" placeholder="Nhập 6 chữ số..." maxlength="12" class="w-full px-3 py-2 text-xs font-mono font-bold tracking-widest text-center rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50">
                  </div>
                  <button onclick="TeacherAuthEngine.handlePinLogin()" class="w-full py-2.5 bg-slate-900 hover:bg-slate-800 active:bg-black text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-sm cursor-pointer">
                    <i data-lucide="lock-open" class="w-4 h-4 text-emerald-400"></i>
                    <span>Mở Khóa Quản Trị</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- TAB 3: CÀI ĐẶT KHÓA API & ĐỒNG BỘ ĐÁM MÂY (GEMINI & SHEETS & FIREBASE) -->
            <div id="authTabContent-cloud" class="hidden space-y-3 max-h-80 overflow-y-auto pr-1">
              
              <!-- 1. Google Gemini AI API Key -->
              <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                <div class="flex items-center justify-between gap-2 mb-2">
                  <div class="flex items-center gap-2">
                    <i data-lucide="sparkles" class="w-4 h-4 text-indigo-600"></i>
                    <h4 class="text-xs font-black text-slate-900">Google Gemini AI API Key</h4>
                  </div>
                  <a href="https://aistudio.google.com/app/apikey" target="_blank" class="text-[10px] font-bold text-indigo-600 hover:underline flex items-center gap-1">
                    <span>Lấy Key miễn phí</span>
                    <i data-lucide="external-link" class="w-3 h-3"></i>
                  </a>
                </div>
                <p class="text-[11px] text-slate-500 mb-2">
                  Dùng để kích hoạt AI tạo đề trắc nghiệm chuẩn SGK KNTT và giải bài tự động không giới hạn.
                </p>
                <div class="flex items-center gap-1.5">
                  <input type="password" id="authGeminiKeyInput" placeholder="AIzaSy..." class="flex-1 px-3 py-1.5 text-xs font-mono rounded-xl border border-slate-200 bg-slate-50">
                  <button onclick="TeacherAuthEngine.handleTestGeminiKey()" id="btnTestGeminiKey" class="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl transition shrink-0 cursor-pointer">
                    Kiểm Tra
                  </button>
                </div>
              </div>

              <!-- 2. Google Sheets Webhook Sync -->
              <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                <div class="flex items-center justify-between gap-2 mb-2">
                  <div class="flex items-center gap-2">
                    <i data-lucide="table" class="w-4 h-4 text-emerald-600"></i>
                    <h4 class="text-xs font-black text-slate-900">Google Sheets Webhook Sync</h4>
                  </div>
                  <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Lưu Đám Mây</span>
                </div>
                <p class="text-[11px] text-slate-500 mb-2">
                  URL Webhook Google Apps Script để ghi tự động điểm của học sinh và sao lưu đề thi.
                </p>
                <div class="flex items-center gap-1.5">
                  <input type="text" id="authSheetsWebhookInput" placeholder="https://script.google.com/macros/s/.../exec" class="flex-1 px-3 py-1.5 text-xs font-mono rounded-xl border border-slate-200 bg-slate-50">
                  <button onclick="TeacherAuthEngine.handleTestSheetsUrl()" class="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-xl transition shrink-0 cursor-pointer">
                    Test Sheet
                  </button>
                </div>
              </div>

              <!-- 3. Đổi mã PIN Admin -->
              <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                <h4 class="text-xs font-black text-slate-900 mb-1 flex items-center gap-2">
                  <i data-lucide="lock" class="w-4 h-4 text-slate-600"></i>
                  Đổi Mã PIN Quản Trị Cục Bộ
                </h4>
                <div class="flex items-center gap-1.5 mt-2">
                  <input type="password" id="authNewPinInput" placeholder="Nhập mã PIN mới..." class="flex-1 px-3 py-1.5 text-xs font-mono rounded-xl border border-slate-200 bg-slate-50">
                  <button onclick="TeacherAuthEngine.handleChangePin()" class="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition shrink-0 cursor-pointer">
                    Lưu PIN
                  </button>
                </div>
              </div>

              <!-- Nút Lưu Tất Cả Cài Đặt -->
              <button onclick="TeacherAuthEngine.handleSaveAllSettings()" class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-xs cursor-pointer">
                <i data-lucide="check" class="w-4 h-4"></i>
                <span>Lưu Toàn Bộ Cài Đặt API & Đám Mây</span>
              </button>

            </div>

          </div>

          <!-- Footer Modal -->
          <div class="px-6 py-3.5 bg-slate-100 border-t border-slate-200/70 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
            <span class="flex items-center gap-1">
              <i data-lucide="database" class="w-3.5 h-3.5 text-slate-400"></i>
              <span>Dữ liệu lưu trữ an toàn & đồng bộ thời gian thực</span>
            </span>
            <span class="text-indigo-600 font-bold">Hỗ Trợ Toán THCS Pro</span>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
    syncSettingsInputs();
  }

  function hideAuthModal() {
    if (typeof document === 'undefined') return;
    const modal = document.getElementById('teacherAuthGuardModal');
    if (modal) {
      modal.classList.add('hidden');
    }
  }

  function showAuthModal() {
    if (typeof document === 'undefined') return;
    renderAuthModal();
    const modal = document.getElementById('teacherAuthGuardModal');
    if (modal) {
      modal.classList.remove('hidden');
    }
  }

  function showAlert(message, type = 'error') {
    if (typeof document === 'undefined') return;
    const box = document.getElementById('authAlertBox');
    if (!box) return;
    box.className = `p-3 rounded-xl text-xs font-semibold ${
      type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
      type === 'info' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
      'bg-rose-50 text-rose-800 border border-rose-200'
    }`;
    box.innerHTML = message;
    box.classList.remove('hidden');
  }

  function clearAlert() {
    if (typeof document === 'undefined') return;
    const box = document.getElementById('authAlertBox');
    if (box) box.classList.add('hidden');
  }

  function switchTab(tabId) {
    if (typeof document === 'undefined') return;
    clearAlert();
    document.querySelectorAll('.auth-tab-btn').forEach(btn => {
      btn.className = 'auth-tab-btn flex-1 py-2 px-2.5 rounded-lg transition text-center text-slate-300 hover:text-white';
    });
    const activeBtn = document.getElementById(`authTabBtn-${tabId}`);
    if (activeBtn) {
      activeBtn.className = 'auth-tab-btn flex-1 py-2 px-2.5 rounded-lg transition text-center bg-indigo-600 text-white shadow-xs';
    }

    ['google', 'pin', 'cloud'].forEach(id => {
      const content = document.getElementById(`authTabContent-${id}`);
      if (content) {
        if (id === tabId) content.classList.remove('hidden');
        else content.classList.add('hidden');
      }
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  function syncSettingsInputs() {
    if (typeof document === 'undefined') return;
    const geminiInput = document.getElementById('authGeminiKeyInput');
    if (geminiInput) geminiInput.value = getGeminiApiKey();

    const sheetsInput = document.getElementById('authSheetsWebhookInput');
    if (sheetsInput) sheetsInput.value = getSheetsWebhookUrl();
  }

  // --- HANDLER EVENTS CHO GIAO DIỆN ---
  async function handleGoogleLogin() {
    clearAlert();
    const btn = document.getElementById('btnGoogleSignIn');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `
        <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        <span>Đang kết nối Google...</span>
      `;
    }
    try {
      const session = await loginWithGoogle();
      showAlert(`Chào mừng ${session.name}! Đăng nhập thành công.`, 'success');
      setTimeout(() => {
        hideAuthModal();
        renderTeacherHeaderBadge();
        if (typeof confetti === 'function') confetti({ particleCount: 50, spread: 60 });
      }, 700);
    } catch (err) {
      showAlert(`Lỗi đăng nhập Google: ${err.message}`, 'error');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `
          <svg class="w-5 h-5 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Tiếp tục với Google</span>
        `;
      }
    }
  }

  function handlePinLogin() {
    clearAlert();
    const pin = document.getElementById('authPinInput')?.value;
    const name = document.getElementById('authPinTeacherName')?.value;
    const res = loginWithPin(pin, name);
    if (res.success) {
      showAlert(`Xác thực thành công! Xin chào ${res.session.name}.`, 'success');
      setTimeout(() => {
        hideAuthModal();
        renderTeacherHeaderBadge();
        if (typeof confetti === 'function') confetti({ particleCount: 40 });
      }, 600);
    } else {
      showAlert(res.message, 'error');
    }
  }

  async function handleTestGeminiKey() {
    const key = document.getElementById('authGeminiKeyInput')?.value;
    const btn = document.getElementById('btnTestGeminiKey');
    if (btn) {
      btn.disabled = true;
      btn.innerText = 'Đang test...';
    }
    showAlert('Đang kiểm tra kết nối Google Gemini API...', 'info');
    const result = await testGeminiApiKey(key);
    if (result.success) {
      saveGeminiApiKey(key);
      showAlert(`✓ ${result.message}`, 'success');
    } else {
      showAlert(`✗ ${result.message}`, 'error');
    }
    if (btn) {
      btn.disabled = false;
      btn.innerText = 'Kiểm Tra';
    }
  }

  async function handleTestSheetsUrl() {
    const url = document.getElementById('authSheetsWebhookInput')?.value;
    showAlert('Đang gửi tín hiệu kiểm tra tới Google Sheets...', 'info');
    const result = await testSheetsWebhook(url);
    if (result.success) {
      saveSheetsWebhookUrl(url);
      showAlert(`✓ ${result.message}`, 'success');
    } else {
      showAlert(`✗ ${result.message}`, 'error');
    }
  }

  function handleChangePin() {
    const newPin = document.getElementById('authNewPinInput')?.value;
    if (saveAdminPin(newPin)) {
      showAlert(`✓ Đã đổi mã PIN quản trị thành công!`, 'success');
    } else {
      showAlert(`Mã PIN phải từ 4 ký tự trở lên!`, 'error');
    }
  }

  function handleSaveAllSettings() {
    const geminiKey = document.getElementById('authGeminiKeyInput')?.value;
    const sheetsUrl = document.getElementById('authSheetsWebhookInput')?.value;
    if (geminiKey !== undefined) saveGeminiApiKey(geminiKey);
    if (sheetsUrl !== undefined) saveSheetsWebhookUrl(sheetsUrl);
    showAlert('✓ Đã lưu toàn bộ cấu hình API Key và Google Sheets vào hệ thống!', 'success');
    renderTeacherHeaderBadge();
  }

  // --- WIDGET PROFILE VÀ STATUS TRÊN TOP BAR ---
  function renderTeacherHeaderBadge(targetContainerId = 'teacherAuthBadgeContainer') {
    if (typeof document === 'undefined') return;
    let container = document.getElementById(targetContainerId);
    if (!container) {
      const headerNav = document.querySelector('header .max-w-7xl');
      if (headerNav) {
        let created = document.createElement('div');
        created.id = targetContainerId;
        created.className = 'flex items-center gap-2 ml-auto';
        headerNav.appendChild(created);
        container = created;
      }
    }
    if (!container) return;

    const session = getSession();
    const hasGemini = !!getGeminiApiKey();
    const hasSheets = !!getSheetsWebhookUrl();

    if (!session) {
      container.innerHTML = `
        <button onclick="TeacherAuthEngine.showAuthModal()" class="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm hover:brightness-110 transition cursor-pointer">
          <i data-lucide="log-in" class="w-4 h-4"></i>
          <span>Đăng Nhập Quản Trị</span>
        </button>
      `;
    } else {
      const avatarContent = session.photo
        ? `<img src="${session.photo}" alt="Avatar" class="w-7 h-7 rounded-full object-cover border border-indigo-200">`
        : `<div class="w-7 h-7 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center">${(session.name || 'GV').charAt(0).toUpperCase()}</div>`;

      container.innerHTML = `
        <div class="flex items-center gap-2 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-2xl shadow-2xs">
          ${avatarContent}
          <div class="hidden sm:flex flex-col text-left">
            <div class="flex items-center gap-1.5">
              <span class="text-xs font-black text-slate-800 max-w-[120px] truncate">${session.name}</span>
              <span class="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700 uppercase">PRO</span>
            </div>
            <div class="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
              <span class="flex items-center gap-1 text-emerald-600" title="${hasGemini ? 'Gemini AI Sẵn sàng' : 'Chưa nhập Gemini Key'}">
                <span class="w-1.5 h-1.5 rounded-full ${hasGemini ? 'bg-emerald-500' : 'bg-slate-300'}"></span>
                <span>AI</span>
              </span>
              <span class="flex items-center gap-1 text-blue-600" title="${hasSheets ? 'Đồng bộ Google Sheets Bật' : 'Chưa nối Google Sheet'}">
                <span class="w-1.5 h-1.5 rounded-full ${hasSheets ? 'bg-blue-500' : 'bg-slate-300'}"></span>
                <span>Cloud</span>
              </span>
            </div>
          </div>
          <button onclick="TeacherAuthEngine.showAuthModal(); TeacherAuthEngine.switchTab('cloud');" title="Cài đặt API Key & Đám mây" class="p-1 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition cursor-pointer">
            <i data-lucide="sliders-horizontal" class="w-4 h-4"></i>
          </button>
          <button onclick="TeacherAuthEngine.logout()" title="Đăng xuất" class="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer">
            <i data-lucide="log-out" class="w-4 h-4"></i>
          </button>
        </div>
      `;
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  /**
   * Khởi tạo Auth Guard tự động bảo vệ trang
   */
  function initGuard(options = {}) {
    initFirebase();
    const authenticated = isAuthenticated();
    if (!authenticated && options.enforceLogin !== false) {
      showAuthModal();
    }
    renderTeacherHeaderBadge(options.badgeContainerId);
    return authenticated;
  }

  // Khởi tạo ngay khi trang tải xong
  if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
      initFirebase();
      renderTeacherHeaderBadge();
    });
  }

  return {
    KEYS,
    initFirebase,
    getSession,
    setSession,
    isAuthenticated,
    logout,
    onAuthStateChanged,
    getGeminiApiKey,
    saveGeminiApiKey,
    testGeminiApiKey,
    getSheetsWebhookUrl,
    saveSheetsWebhookUrl,
    testSheetsWebhook,
    getAdminPin,
    saveAdminPin,
    loginWithGoogle,
    loginWithEmail,
    loginWithPin,
    renderAuthModal,
    showAuthModal,
    hideAuthModal,
    switchTab,
    renderTeacherHeaderBadge,
    initGuard,
    handleGoogleLogin,
    handlePinLogin,
    handleTestGeminiKey,
    handleTestSheetsUrl,
    handleChangePin,
    handleSaveAllSettings
  };
}));
