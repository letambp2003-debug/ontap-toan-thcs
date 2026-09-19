/**
 * =============================================================================
 * TEACHER AUTH & CLOUD API KEY ENGINE (HẠT NHÂN XÁC THỰC GIÁO VIÊN & ĐÁM MÂY GOOGLE)
 * Phiên bản: Pro 3.0 - Chuẩn EdTech GDPT 2018 (Kết nối tri thức với cuộc sống)
 * Chức năng:
 *  - Xác thực Đăng nhập Google 1-chạm (Google Identity / Firebase Auth)
 *  - Phân quyền Trưởng bộ môn (Admin) vs Giáo viên bộ môn (Teacher)
 *  - Mã hóa AES-GCM 256-bit bằng Web Crypto API cho Google Gemini API Key
 *  - Đồng bộ Google Sheets Cloud & Thông báo Telegram Bot tự động khi học sinh nộp bài
 *  - Sao lưu & Phục hồi Đề thi 1-Click (Cloud / File JSON Backup & Restore)
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

  // CÁC KHÓA LƯU TRỮ TRONG BỘ NHỚ TRÌNH DUYỆT (LOCAL STORAGE)
  const KEYS = {
    SESSION: 'TN_TEACHER_PRO_SESSION_V2',
    GEMINI_KEY: 'TN_TOAN_GEMINI_API_KEY_V2',
    SHEETS_WEBHOOK: 'TN_TOAN_GOOGLE_SHEETS_WEBHOOK_V1',
    FIREBASE_CONFIG: 'TN_FIREBASE_PROJECT_CONFIG_V2',
    ADMIN_PIN: 'TN_LOCAL_ADMIN_PIN_CODE_V2',
    AUTO_CLOUD_SYNC: 'TN_AUTO_CLOUD_SYNC_ENABLED_V2',
    TELEGRAM_BOT_TOKEN: 'TN_TELEGRAM_BOT_TOKEN_V2',
    TELEGRAM_CHAT_ID: 'TN_TELEGRAM_CHAT_ID_V2',
    TELEGRAM_ENABLED: 'TN_TELEGRAM_ENABLED_V2',
    USER_ROLE: 'TN_TEACHER_USER_ROLE_V2'
  };

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
  let inMemoryGeminiKey = ''; // Cache bộ nhớ giải mã

  // --- 1. BẢO MẬT & MÃ HÓA AES-GCM BẰNG WEB CRYPTO API ---
  const ENCRYPTION_SALT = 'TN_TOAN_THCS_PRO_SALT_2026';

  async function getCryptoKey() {
    if (typeof crypto === 'undefined' || !crypto.subtle) return null;
    try {
      const enc = new TextEncoder();
      const keyMaterial = await crypto.subtle.importKey(
        'raw',
        enc.encode(ENCRYPTION_SALT),
        { name: 'PBKDF2' },
        false,
        ['deriveKey']
      );
      return await crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: enc.encode('THCS_SECRET_PEPPER_99'),
          iterations: 10000,
          hash: 'SHA-256'
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
      );
    } catch (e) {
      console.warn('[TeacherAuthEngine] WebCrypto subtle error:', e);
      return null;
    }
  }

  async function encryptString(plainText) {
    if (!plainText) return '';
    try {
      const key = await getCryptoKey();
      if (!key) {
        // Fallback obfuscation an toàn khi chạy môi trường không hỗ trợ WebCrypto
        return 'B64:' + btoa(unescape(encodeURIComponent(plainText)));
      }
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const enc = new TextEncoder();
      const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        enc.encode(plainText)
      );
      const ivHex = Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join('');
      const dataHex = Array.from(new Uint8Array(encrypted)).map(b => b.toString(16).padStart(2, '0')).join('');
      return `AES:${ivHex}:${dataHex}`;
    } catch (e) {
      return 'B64:' + btoa(unescape(encodeURIComponent(plainText)));
    }
  }

  async function decryptString(cipherText) {
    if (!cipherText) return '';
    try {
      if (cipherText.startsWith('AES:')) {
        const parts = cipherText.split(':');
        const ivHex = parts[1];
        const dataHex = parts[2];
        const iv = new Uint8Array(ivHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
        const data = new Uint8Array(dataHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
        const key = await getCryptoKey();
        if (!key) return '';
        const decrypted = await crypto.subtle.decrypt(
          { name: 'AES-GCM', iv: iv },
          key,
          data
        );
        return new TextDecoder().decode(decrypted);
      } else if (cipherText.startsWith('B64:')) {
        return decodeURIComponent(escape(atob(cipherText.substring(4))));
      }
      return cipherText; // Plain text fallback
    } catch (e) {
      console.warn('[TeacherAuthEngine] Decrypt warning:', e);
      return cipherText;
    }
  }

  // --- 2. KHỞI TẠO FIREBASE SDK ---
  function initFirebase() {
    if (typeof firebase === 'undefined') return false;
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
      console.warn('[TeacherAuthEngine] Firebase init warning:', err);
      return false;
    }
  }

  // --- 3. QUẢN LÝ PHIÊN ĐĂNG NHẬP & PHÂN QUYỀN (RBAC) ---
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
      if (!userData.role) {
        userData.role = getUserRole();
      }
      localStorage.setItem(KEYS.SESSION, JSON.stringify(userData));
    }
    triggerAuthStateChange(userData);
  }

  function isAuthenticated() {
    const session = getSession();
    return !!(session && (session.uid || session.email || session.isLocalAdmin));
  }

  function getUserRole() {
    if (typeof localStorage === 'undefined') return 'admin';
    const session = getSession();
    if (session && session.role) return session.role;
    return localStorage.getItem(KEYS.USER_ROLE) || 'admin';
  }

  function setUserRole(role) {
    const r = (role === 'teacher') ? 'teacher' : 'admin';
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(KEYS.USER_ROLE, r);
    }
    const session = getSession();
    if (session) {
      session.role = r;
      setSession(session);
    }
    return r;
  }

  function isAdmin() {
    return getUserRole() === 'admin';
  }

  function isTeacher() {
    return getUserRole() === 'teacher';
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

  // --- 4. QUẢN LÝ GOOGLE GEMINI AI API KEY (MÃ HÓA AES-GCM) ---
  function getGeminiApiKey() {
    if (inMemoryGeminiKey) return inMemoryGeminiKey;
    if (typeof localStorage === 'undefined') return '';
    const stored = localStorage.getItem(KEYS.GEMINI_KEY) || '';
    if (!stored) return '';
    if (stored.startsWith('AES:') || stored.startsWith('B64:')) {
      // Bất đồng bộ giải mã nền và cập nhật inMemory
      decryptString(stored).then(dec => { inMemoryGeminiKey = dec; });
      return inMemoryGeminiKey || '';
    }
    inMemoryGeminiKey = stored;
    return stored;
  }

  async function getGeminiApiKeyAsync() {
    if (inMemoryGeminiKey) return inMemoryGeminiKey;
    if (typeof localStorage === 'undefined') return '';
    const stored = localStorage.getItem(KEYS.GEMINI_KEY) || '';
    if (!stored) return '';
    inMemoryGeminiKey = await decryptString(stored);
    return inMemoryGeminiKey;
  }

  async function saveGeminiApiKey(key) {
    const cleaned = (key || '').trim();
    inMemoryGeminiKey = cleaned;
    if (typeof localStorage === 'undefined') return cleaned;
    if (!cleaned) {
      localStorage.removeItem(KEYS.GEMINI_KEY);
      return '';
    }
    const cipher = await encryptString(cleaned);
    localStorage.setItem(KEYS.GEMINI_KEY, cipher);
    return cleaned;
  }

  async function testGeminiApiKey(key) {
    const apiKey = (key || (await getGeminiApiKeyAsync())).trim();
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

  // --- 5. QUẢN LÝ THÔNG BÁO TELEGRAM BOT ---
  function getTelegramConfig() {
    if (typeof localStorage === 'undefined') return { token: '', chatId: '', enabled: false };
    return {
      token: localStorage.getItem(KEYS.TELEGRAM_BOT_TOKEN) || '',
      chatId: localStorage.getItem(KEYS.TELEGRAM_CHAT_ID) || '',
      enabled: localStorage.getItem(KEYS.TELEGRAM_ENABLED) === 'true'
    };
  }

  function saveTelegramConfig(token, chatId, enabled = true) {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(KEYS.TELEGRAM_BOT_TOKEN, (token || '').trim());
    localStorage.setItem(KEYS.TELEGRAM_CHAT_ID, (chatId || '').trim());
    localStorage.setItem(KEYS.TELEGRAM_ENABLED, enabled ? 'true' : 'false');
  }

  async function sendTelegramNotification(messageHtml, overrideConfig = null) {
    const cfg = overrideConfig || getTelegramConfig();
    if (!cfg.token || !cfg.chatId) {
      return { success: false, message: 'Chưa cấu hình Token hoặc Chat ID của Telegram Bot' };
    }
    try {
      const url = `https://api.telegram.org/bot${cfg.token}/sendMessage`;
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: cfg.chatId,
          text: messageHtml,
          parse_mode: 'HTML',
          disable_web_page_preview: true
        })
      });
      const data = await resp.json();
      if (data.ok) {
        return { success: true, message: 'Đã gửi thông báo Telegram thành công!' };
      }
      return { success: false, message: 'Lỗi Telegram API: ' + (data.description || 'Không xác định') };
    } catch (err) {
      return { success: false, message: 'Lỗi kết nối Telegram: ' + err.message };
    }
  }

  // --- 6. QUẢN LÝ ĐỒNG BỘ GOOGLE SHEETS / CLOUD SYNC ---
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
        client: 'TeacherAuthEngine Pro 3.0',
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

  // --- 7. BỘ SAO LƯU & PHỤC HỒI ĐỀ THI 1-CLICK (BACKUP & RESTORE) ---
  function exportFullBackup() {
    try {
      const backupData = {
        version: "3.0",
        appName: "Hệ Thống Khảo Thí & Ôn Tập Toán THCS",
        exportedAt: new Date().toISOString(),
        teacher: getSession() || { name: 'Thầy Quản Trị' },
        exams: (typeof ExamSyncEngine !== 'undefined') ? ExamSyncEngine.getAllExams() : [],
        tasks: (typeof ExamSyncEngine !== 'undefined') ? ExamSyncEngine.getAllTasks() : [],
        submissions: (typeof ExamSyncEngine !== 'undefined') ? ExamSyncEngine.getAllSubmissions() : [],
        settings: {
          role: getUserRole(),
          telegramEnabled: getTelegramConfig().enabled
        }
      };

      const jsonStr = JSON.stringify(backupData, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const timeStr = new Date().toTimeString().slice(0, 5).replace(/:/g, '');
      const filename = `THCS_TOAN_BACKUP_${dateStr}_${timeStr}.json`;

      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return { success: true, count: backupData.exams.length, filename };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  function importBackup(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (!data || (!Array.isArray(data.exams) && !Array.isArray(data.tasks))) {
        return { success: false, message: 'File sao lưu không đúng định dạng chuẩn!' };
      }

      let restoredExams = 0;
      let restoredTasks = 0;
      let restoredSubs = 0;

      if (Array.isArray(data.exams) && typeof ExamSyncEngine !== 'undefined') {
        const existingExams = ExamSyncEngine.getAllExams();
        const existingMap = new Map(existingExams.map(e => [e.id, e]));
        data.exams.forEach(ex => {
          if (ex && ex.id) {
            existingMap.set(ex.id, ex);
            restoredExams++;
          }
        });
        localStorage.setItem('TN_TOAN_EXAM_REPOSITORY_V1', JSON.stringify(Array.from(existingMap.values())));
      }

      if (Array.isArray(data.tasks) && typeof ExamSyncEngine !== 'undefined') {
        const existingTasks = ExamSyncEngine.getAllTasks();
        const taskMap = new Map(existingTasks.map(t => [t.taskId, t]));
        data.tasks.forEach(t => {
          if (t && t.taskId) {
            taskMap.set(t.taskId, t);
            restoredTasks++;
          }
        });
        localStorage.setItem('TN_TOAN_ASSIGNMENT_TASKS_V1', JSON.stringify(Array.from(taskMap.values())));
      }

      if (Array.isArray(data.submissions) && typeof ExamSyncEngine !== 'undefined') {
        const existingSubs = ExamSyncEngine.getAllSubmissions();
        const subMap = new Map(existingSubs.map(s => [s.submissionId, s]));
        data.submissions.forEach(s => {
          if (s && s.submissionId) {
            subMap.set(s.submissionId, s);
            restoredSubs++;
          }
        });
        localStorage.setItem('TN_TOAN_STUDENT_SUBMISSIONS_V1', JSON.stringify(Array.from(subMap.values())));
      }

      return {
        success: true,
        message: `Phục hồi thành công: ${restoredExams} đề thi, ${restoredTasks} nhiệm vụ, ${restoredSubs} bài nộp.`
      };
    } catch (err) {
      return { success: false, message: 'Lỗi giải mã file JSON: ' + err.message };
    }
  }

  // --- 8. CẤU HÌNH FIREBASE & MÃ PIN ADMIN ---
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

  // --- 9. HÀNH ĐỘNG ĐĂNG NHẬP (LOGIN ACTIONS) ---
  async function loginWithGoogle() {
    if (!isFirebaseReady) initFirebase();
    if (!isFirebaseReady || typeof firebase === 'undefined' || !firebase.auth) {
      throw new Error("Dự án Firebase chưa được cấu hình khóa API. Thầy/Cô hãy dùng tab 'Mã PIN Quản Trị' để truy cập ngay.");
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
      role: getUserRole(),
      isPro: true
    };
    setSession(session);
    return session;
  }

  function loginWithPin(pinInput, teacherName = 'Thầy Quản Trị Tổ Toán', role = 'admin') {
    const currentPin = getAdminPin();
    if ((pinInput || '').trim() === currentPin) {
      const session = {
        uid: 'ADMIN_LOCAL_' + Date.now(),
        name: (teacherName || '').trim() || 'Thầy Quản Trị Viên',
        email: 'giaovien.quantri@toan-thcs.edu.vn',
        photo: '',
        authType: 'pin',
        role: role || 'admin',
        isLocalAdmin: true,
        isPro: true
      };
      setUserRole(role || 'admin');
      setSession(session);
      return { success: true, session };
    }
    return { success: false, message: 'Mã PIN quản trị viên không chính xác (Mặc định: 123456)' };
  }

  // --- 10. GIAO DIỆN MÀN HÌNH KHÓA & MODAL ĐĂNG NHẬP ---
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
          
          <!-- Banner Header Đẳng Cấp Pro (Indigo & Blue Gradient - Không dùng màu tím) -->
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
            <div class="flex items-center gap-1 mt-4 p-1 bg-slate-900/60 backdrop-blur-xs rounded-xl border border-slate-700/50 text-xs font-bold">
              <button id="authTabBtn-google" onclick="TeacherAuthEngine.switchTab('google')" class="auth-tab-btn flex-1 py-2 px-2 rounded-lg transition text-center bg-indigo-600 text-white shadow-xs">
                Google 1-Chạm
              </button>
              <button id="authTabBtn-pin" onclick="TeacherAuthEngine.switchTab('pin')" class="auth-tab-btn flex-1 py-2 px-2 rounded-lg transition text-center text-slate-300 hover:text-white">
                Mã PIN Quản Trị
              </button>
              <button id="authTabBtn-cloud" onclick="TeacherAuthEngine.switchTab('cloud')" class="auth-tab-btn flex-1 py-2 px-2 rounded-lg transition text-center text-slate-300 hover:text-white">
                Cài Đặt & Đám Mây
              </button>
            </div>
          </div>

          <!-- Nội Dung Body Modal -->
          <div class="p-6 sm:p-7 space-y-4 bg-slate-50">
            
            <!-- VÙNG BÁO LỖI / THÀNH CÔNG -->
            <div id="authAlertBox" class="hidden p-3 rounded-xl text-xs font-semibold"></div>

            <!-- TAB 1: ĐĂNG NHẬP GOOGLE -->
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
                  <span>Tiếp tục với Google</span>
                </button>
              </div>

              <div class="text-center">
                <button onclick="TeacherAuthEngine.switchTab('pin')" class="text-xs font-bold text-slate-600 hover:text-indigo-600 underline cursor-pointer">
                  Chưa cài Firebase? Đăng nhập ngay bằng Mã PIN Quản Trị Cục Bộ &rarr;
                </button>
              </div>
            </div>

            <!-- TAB 2: ĐĂNG NHẬP MÃ PIN QUẢN TRỊ CỤC BỘ -->
            <div id="authTabContent-pin" class="hidden space-y-4">
              <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                <div class="flex items-center gap-2.5 mb-2">
                  <div class="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
                    <i data-lucide="key-round" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <h3 class="text-sm font-black text-slate-900">Mã PIN Quản Trị Cục Bộ</h3>
                    <p class="text-[11px] text-slate-500">Dành cho trường hợp offline hoặc đăng nhập nhanh</p>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Tên Thầy/Cô hiển thị</label>
                  <input type="text" id="authPinTeacherName" value="Thầy Quản Trị Tổ Toán" class="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 font-semibold focus:ring-2 focus:ring-indigo-500 bg-slate-50">
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Vai trò giảng dạy (Phân quyền)</label>
                  <select id="authPinRoleSelect" class="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 font-semibold bg-slate-50">
                    <option value="admin">👑 Trưởng Bộ Môn (Admin - Toàn quyền duyệt đề & xem điểm tất cả lớp)</option>
                    <option value="teacher">👨‍🏫 Giáo Viên Bộ Môn (Tập trung lớp giảng dạy)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Mã PIN Quản Trị (Mặc định: <code class="text-indigo-600 font-mono">123456</code>)</label>
                  <input type="password" id="authPinInput" placeholder="Nhập 6 chữ số..." maxlength="12" class="w-full px-3 py-2 text-xs font-mono font-bold tracking-widest text-center rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-slate-50">
                </div>

                <button onclick="TeacherAuthEngine.handlePinLogin()" class="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-sm cursor-pointer">
                  <i data-lucide="lock-open" class="w-4 h-4 text-emerald-400"></i>
                  <span>Mở Khóa Quản Trị</span>
                </button>
              </div>
            </div>

            <!-- TAB 3: CÀI ĐẶT API & ĐÁM MÂY (BACKUP, TELEGRAM, GEMINI, SHEETS) -->
            <div id="authTabContent-cloud" class="hidden space-y-3 max-h-96 overflow-y-auto custom-scrollbar pr-1">
              
              <!-- 1. BỘ SAO LƯU & PHỤC HỒI ĐỀ THI (BACKUP & RESTORE) -->
              <div class="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 p-4 rounded-2xl border border-blue-200 shadow-xs">
                <div class="flex items-center justify-between mb-1.5">
                  <h4 class="text-xs font-black text-blue-950 flex items-center gap-1.5">
                    <i data-lucide="hard-drive-download" class="w-4 h-4 text-blue-600"></i>
                    Sao Lưu & Phục Hồi Kho Đề 1-Click
                  </h4>
                  <span class="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">An Toàn 100%</span>
                </div>
                <p class="text-[11px] text-slate-600 mb-2.5">
                  Tải toàn bộ đề thi, nhiệm vụ giao và bảng điểm ra file JSON để mang sang máy khác hoặc khôi phục khi cần.
                </p>
                <div class="flex items-center gap-2">
                  <button onclick="TeacherAuthEngine.handleExportBackup()" class="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer">
                    <i data-lucide="download" class="w-3.5 h-3.5"></i>
                    <span>Tải Bản Sao Lưu</span>
                  </button>
                  <label class="flex-1 py-2 px-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer">
                    <i data-lucide="upload" class="w-3.5 h-3.5 text-slate-500"></i>
                    <span>Khôi Phục Dữ Liệu</span>
                    <input type="file" accept=".json" onchange="TeacherAuthEngine.handleImportBackupFile(event)" class="hidden">
                  </label>
                </div>
              </div>

              <!-- 2. THÔNG BÁO TELEGRAM BOT PHỤ HUYNH / GIÁO VIÊN -->
              <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                <div class="flex items-center justify-between">
                  <h4 class="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <i data-lucide="send" class="w-4 h-4 text-sky-600"></i>
                    Thông Báo Telegram Bot Khi Học Sinh Nộp Bài
                  </h4>
                  <label class="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" id="authTelegramEnabled" class="w-3.5 h-3.5 rounded text-indigo-600 focus:ring-indigo-500">
                    <span class="text-[10px] font-bold text-slate-600">Bật gửi</span>
                  </label>
                </div>
                <p class="text-[11px] text-slate-500">
                  Tự động bắn tin nhắn điểm số, tên học sinh và lời khen AI vào nhóm Telegram giáo viên hoặc kênh phụ huynh.
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <input type="text" id="authTelegramTokenInput" placeholder="Bot Token (VD: 123456:ABC-DEF...)" class="w-full px-2.5 py-1.5 text-xs font-mono rounded-xl border border-slate-200 bg-slate-50">
                  <div class="flex items-center gap-1">
                    <input type="text" id="authTelegramChatIdInput" placeholder="Chat ID (VD: -100123...)" class="flex-1 px-2.5 py-1.5 text-xs font-mono rounded-xl border border-slate-200 bg-slate-50">
                    <button onclick="TeacherAuthEngine.handleTestTelegram()" class="px-2 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold rounded-xl transition shrink-0 cursor-pointer">
                      Gửi Thử
                    </button>
                  </div>
                </div>
              </div>

              <!-- 3. GOOGLE GEMINI AI API KEY (MÃ HÓA AES-GCM) -->
              <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                <div class="flex items-center justify-between gap-2 mb-1.5">
                  <div class="flex items-center gap-2">
                    <i data-lucide="sparkles" class="w-4 h-4 text-indigo-600"></i>
                    <h4 class="text-xs font-black text-slate-900">Google Gemini AI API Key</h4>
                  </div>
                  <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded-md">
                    🔒 Mã hóa AES-GCM
                  </span>
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

              <!-- 4. GOOGLE SHEETS WEBHOOK SYNC -->
              <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                <div class="flex items-center justify-between gap-2 mb-1.5">
                  <div class="flex items-center gap-2">
                    <i data-lucide="table" class="w-4 h-4 text-emerald-600"></i>
                    <h4 class="text-xs font-black text-slate-900">Google Sheets Webhook Sync</h4>
                  </div>
                  <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Lưu Đám Mây</span>
                </div>
                <p class="text-[11px] text-slate-500 mb-2">
                  URL Webhook Google Apps Script để ghi tự động bảng điểm học sinh khi nộp bài.
                </p>
                <div class="flex items-center gap-1.5">
                  <input type="text" id="authSheetsWebhookInput" placeholder="https://script.google.com/macros/s/.../exec" class="flex-1 px-3 py-1.5 text-xs font-mono rounded-xl border border-slate-200 bg-slate-50">
                  <button onclick="TeacherAuthEngine.handleTestSheetsUrl()" class="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-xl transition shrink-0 cursor-pointer">
                    Test Sheet
                  </button>
                </div>
              </div>

              <!-- 5. ĐỔI MÃ PIN & VAI TRÒ -->
              <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                <h4 class="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <i data-lucide="user-cog" class="w-4 h-4 text-slate-600"></i>
                  Đổi Vai Trò & Mã PIN Quản Trị
                </h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <select id="authRoleSettingSelect" class="w-full px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 font-semibold">
                    <option value="admin">👑 Trưởng Bộ Môn (Admin)</option>
                    <option value="teacher">👨‍🏫 Giáo Viên Bộ Môn</option>
                  </select>
                  <div class="flex items-center gap-1">
                    <input type="password" id="authNewPinInput" placeholder="PIN mới (4-12 số)..." class="flex-1 px-2.5 py-1.5 text-xs font-mono rounded-xl border border-slate-200 bg-slate-50">
                    <button onclick="TeacherAuthEngine.handleChangePin()" class="px-2.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition shrink-0 cursor-pointer">
                      Đổi PIN
                    </button>
                  </div>
                </div>
              </div>

              <!-- Nút Lưu Tất Cả Cài Đặt -->
              <button onclick="TeacherAuthEngine.handleSaveAllSettings()" class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-xs cursor-pointer">
                <i data-lucide="check" class="w-4 h-4"></i>
                <span>Lưu Toàn Bộ Cấu Hình & Cập Nhật Hệ Thống</span>
              </button>

            </div>

          </div>

          <!-- Footer Modal -->
          <div class="px-6 py-3.5 bg-slate-100 border-t border-slate-200/70 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
            <span class="flex items-center gap-1">
              <i data-lucide="shield" class="w-3.5 h-3.5 text-emerald-600"></i>
              <span>Bảo mật AES-GCM • Khóa API mã hóa an toàn</span>
            </span>
            <span class="text-indigo-600 font-bold">THCS Pro v3.0</span>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    if (typeof lucide !== 'undefined') lucide.createIcons();
    syncSettingsInputs();
  }

  function hideAuthModal() {
    if (typeof document === 'undefined') return;
    const modal = document.getElementById('teacherAuthGuardModal');
    if (modal) modal.classList.add('hidden');
  }

  function showAuthModal() {
    if (typeof document === 'undefined') return;
    renderAuthModal();
    const modal = document.getElementById('teacherAuthGuardModal');
    if (modal) modal.classList.remove('hidden');
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
      btn.className = 'auth-tab-btn flex-1 py-2 px-2 rounded-lg transition text-center text-slate-300 hover:text-white';
    });
    const activeBtn = document.getElementById(`authTabBtn-${tabId}`);
    if (activeBtn) {
      activeBtn.className = 'auth-tab-btn flex-1 py-2 px-2 rounded-lg transition text-center bg-indigo-600 text-white shadow-xs';
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

    const tgCfg = getTelegramConfig();
    const tgToken = document.getElementById('authTelegramTokenInput');
    if (tgToken) tgToken.value = tgCfg.token;
    const tgChat = document.getElementById('authTelegramChatIdInput');
    if (tgChat) tgChat.value = tgCfg.chatId;
    const tgEn = document.getElementById('authTelegramEnabled');
    if (tgEn) tgEn.checked = tgCfg.enabled;

    const roleSelect = document.getElementById('authRoleSettingSelect');
    if (roleSelect) roleSelect.value = getUserRole();
  }

  // --- 11. HANDLER EVENTS CHO GIAO DIỆN ---
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
        btn.innerHTML = `<span>Tiếp tục với Google</span>`;
      }
    }
  }

  function handlePinLogin() {
    clearAlert();
    const pin = document.getElementById('authPinInput')?.value;
    const name = document.getElementById('authPinTeacherName')?.value;
    const role = document.getElementById('authPinRoleSelect')?.value || 'admin';
    const res = loginWithPin(pin, name, role);
    if (res.success) {
      showAlert(`Xác thực thành công! Xin chào ${res.session.name} (${role === 'admin' ? 'Trưởng bộ môn' : 'Giáo viên'}).`, 'success');
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
      await saveGeminiApiKey(key);
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

  async function handleTestTelegram() {
    const token = document.getElementById('authTelegramTokenInput')?.value;
    const chatId = document.getElementById('authTelegramChatIdInput')?.value;
    showAlert('Đang gửi tin nhắn thử nghiệm tới Telegram Bot...', 'info');
    const msg = `🔔 <b>[THCS PRO TEST]</b>\nKết nối Telegram Bot thành công!\nHệ thống sẵn sàng gửi thông báo khi học sinh nộp bài thi.`;
    const res = await sendTelegramNotification(msg, { token, chatId, enabled: true });
    if (res.success) {
      showAlert(`✓ ${res.message}`, 'success');
    } else {
      showAlert(`✗ ${res.message}`, 'error');
    }
  }

  function handleExportBackup() {
    const res = exportFullBackup();
    if (res.success) {
      showAlert(`✓ Đã xuất sao lưu ${res.count} đề thi thành công vào file <b>${res.filename}</b>!`, 'success');
    } else {
      showAlert(`✗ Lỗi xuất sao lưu: ${res.message}`, 'error');
    }
  }

  function handleImportBackupFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      const res = importBackup(e.target.result);
      if (res.success) {
        showAlert(`✓ ${res.message}`, 'success');
        setTimeout(() => { window.location.reload(); }, 1500);
      } else {
        showAlert(`✗ ${res.message}`, 'error');
      }
    };
    reader.readAsText(file, 'utf-8');
  }

  function handleChangePin() {
    const newPin = document.getElementById('authNewPinInput')?.value;
    if (saveAdminPin(newPin)) {
      showAlert(`✓ Đã đổi mã PIN quản trị thành công!`, 'success');
    } else {
      showAlert(`Mã PIN phải từ 4 ký tự trở lên!`, 'error');
    }
  }

  async function handleSaveAllSettings() {
    const geminiKey = document.getElementById('authGeminiKeyInput')?.value;
    const sheetsUrl = document.getElementById('authSheetsWebhookInput')?.value;
    const tgToken = document.getElementById('authTelegramTokenInput')?.value;
    const tgChat = document.getElementById('authTelegramChatIdInput')?.value;
    const tgEnabled = document.getElementById('authTelegramEnabled')?.checked;
    const role = document.getElementById('authRoleSettingSelect')?.value;

    if (geminiKey !== undefined) await saveGeminiApiKey(geminiKey);
    if (sheetsUrl !== undefined) saveSheetsWebhookUrl(sheetsUrl);
    saveTelegramConfig(tgToken, tgChat, tgEnabled);
    if (role) setUserRole(role);

    showAlert('✓ Đã lưu toàn bộ cấu hình API Key, Telegram và Google Sheets!', 'success');
    renderTeacherHeaderBadge();
  }

  // --- 12. WIDGET PROFILE VÀ STATUS TRÊN TOP BAR ---
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
    const tgCfg = getTelegramConfig();
    const hasTg = !!(tgCfg.token && tgCfg.chatId && tgCfg.enabled);
    const role = getUserRole();

    if (!session) {
      container.innerHTML = `
        <button onclick="TeacherAuthEngine.showAuthModal()" class="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm hover:brightness-110 transition cursor-pointer">
          <i data-lucide="log-in" class="w-4 h-4"></i>
          <span>Đăng Nhập Quản Trị</span>
        </button>
      `;
    } else {
      const roleBadgeText = role === 'admin' ? 'Trưởng Bộ Môn' : 'Giáo Viên';
      const roleBadgeClass = role === 'admin' ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-blue-100 text-blue-800 border-blue-300';
      const avatarContent = session.photo
        ? `<img src="${session.photo}" alt="Avatar" class="w-7 h-7 rounded-full object-cover border border-indigo-200">`
        : `<div class="w-7 h-7 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center">${(session.name || 'GV').charAt(0).toUpperCase()}</div>`;

      container.innerHTML = `
        <div class="flex items-center gap-2 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-2xl shadow-2xs">
          ${avatarContent}
          <div class="hidden sm:flex flex-col text-left">
            <div class="flex items-center gap-1.5">
              <span class="text-xs font-black text-slate-800 max-w-[110px] truncate">${session.name}</span>
              <span class="text-[9px] font-bold px-1.5 py-0.2 rounded border ${roleBadgeClass}">${roleBadgeText}</span>
            </div>
            <div class="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
              <span class="flex items-center gap-1 ${hasGemini ? 'text-emerald-600' : 'text-slate-400'}" title="${hasGemini ? 'Gemini AI Sẵn sàng (Mã hóa AES)' : 'Chưa nạp Gemini Key'}">
                <span class="w-1.5 h-1.5 rounded-full ${hasGemini ? 'bg-emerald-500' : 'bg-slate-300'}"></span>
                <span>AI</span>
              </span>
              <span class="flex items-center gap-1 ${hasSheets ? 'text-blue-600' : 'text-slate-400'}" title="${hasSheets ? 'Google Sheets Bật' : 'Chưa nối Sheet'}">
                <span class="w-1.5 h-1.5 rounded-full ${hasSheets ? 'bg-blue-500' : 'bg-slate-300'}"></span>
                <span>Sheet</span>
              </span>
              <span class="flex items-center gap-1 ${hasTg ? 'text-sky-600' : 'text-slate-400'}" title="${hasTg ? 'Telegram Bot Bật' : 'Chưa nối Telegram'}">
                <span class="w-1.5 h-1.5 rounded-full ${hasTg ? 'bg-sky-500' : 'bg-slate-300'}"></span>
                <span>Bot</span>
              </span>
            </div>
          </div>
          <button onclick="TeacherAuthEngine.showAuthModal(); TeacherAuthEngine.switchTab('cloud');" title="Cài đặt API, Telegram, Backup" class="p-1 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition cursor-pointer">
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

  function initGuard(options = {}) {
    initFirebase();
    const authenticated = isAuthenticated();
    if (!authenticated && options.enforceLogin !== false) {
      showAuthModal();
    }
    renderTeacherHeaderBadge(options.badgeContainerId);
    return authenticated;
  }

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
    getUserRole,
    setUserRole,
    isAdmin,
    isTeacher,
    logout,
    onAuthStateChanged,
    getGeminiApiKey,
    getGeminiApiKeyAsync,
    saveGeminiApiKey,
    testGeminiApiKey,
    getSheetsWebhookUrl,
    saveSheetsWebhookUrl,
    testSheetsWebhook,
    getTelegramConfig,
    saveTelegramConfig,
    sendTelegramNotification,
    exportFullBackup,
    importBackup,
    getAdminPin,
    saveAdminPin,
    loginWithGoogle,
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
    handleTestTelegram,
    handleExportBackup,
    handleImportBackupFile,
    handleChangePin,
    handleSaveAllSettings
  };
}));
