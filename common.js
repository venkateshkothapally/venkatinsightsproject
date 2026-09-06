/**
 * Venkat Insights - Core Portal Shared Architecture (common.js)
 * Master engine for:
 * 1. Unified Responsive Header & Active Nav Pills
 * 2. Theme Management (Light / Dark mode persistence)
 * 3. Cross-Page Universal Search with Auto-Scroll & Pulse Highlight
 * 4. Dynamic Live Updates Ticker with Auto-Urgency Badges ("thicker scroll")
 * 5. Deep-Link Target Handler & Sticky Footer Synchronization
 */

(function () {
    'use strict';

    const root = document.documentElement;

    // Helper: Determine if the current page is inside a subfolder
    function isInSubfolder() {
        const path = window.location.pathname.replace(/\\/g, '/').toLowerCase();
        return /\/(career|education|governmentservices|newsandarticles)\//.test(path);
    }

    function getBasePath() {
        return isInSubfolder() ? '../' : './';
    }

    // ============================================================
    // 1. THEME MANAGEMENT
    // ============================================================
    function syncThemeToggleIcons() {
        const isDark = root.getAttribute('data-theme') === 'dark' || root.classList.contains('dark');
        const buttons = document.querySelectorAll('.theme-btn, #themeBtn, #themeToggleBtn');

        buttons.forEach(button => {
            const moon = button.querySelector('.icon-moon');
            const sun = button.querySelector('.icon-sun');

            if (moon && sun) {
                moon.style.display = isDark ? 'none' : 'block';
                sun.style.display = isDark ? 'block' : 'none';
            } else {
                button.innerHTML = isDark
                    ? '<svg class="icon-sun" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>'
                    : '<svg class="icon-moon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>';
            }

            button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
            button.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        });
    }

    function applyTheme(theme) {
        const isDark = theme === 'dark';
        root.setAttribute('data-theme', isDark ? 'dark' : 'light');
        root.classList.toggle('dark', isDark);
        if (document.body) {
            document.body.classList.toggle('dark', isDark);
            document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
        }

        try { localStorage.setItem('vi-theme', isDark ? 'dark' : 'light'); } catch (e) {}
        syncThemeToggleIcons();
    }

    window.toggleTheme = function () {
        const isDark = root.getAttribute('data-theme') === 'dark' || root.classList.contains('dark');
        applyTheme(isDark ? 'light' : 'dark');
    };
    window.syncThemeToggleIcons = syncThemeToggleIcons;

    // ============================================================
    // 2. NAVIGATION CONFIG & CURRENT PAGE DETECTION
    // ============================================================
    const navigationLinks = [
        { label: 'Home', url: 'index.html', id: 'home' },
        { label: 'Government Services', url: 'governmentservices/governmentservices.html', id: 'government' },
        { label: 'Education', url: 'education/education.html', id: 'education' },
        { label: 'News', url: 'Newsandarticles/newsandarticles.html', id: 'news' },
        { label: 'Career', url: 'career/career.html', id: 'career' },
        { label: 'Tools', url: 'tools.html', id: 'tools' },
        { label: '80+ AI Tools', url: 'aitools.html', id: 'ai' },
        { label: 'About', url: 'about.html', id: 'about' }
    ];

    function getCurrentPage() {
        const page = (document.body && document.body.getAttribute('data-page')) || root.getAttribute('data-page');
        if (page) return page;

        const path = window.location.pathname.replace(/\\/g, '/').toLowerCase();
        if (path.includes('governmentservices')) return 'government';
        if (path.includes('education')) return 'education';
        if (path.includes('newsandarticles')) return 'news';
        if (path.includes('career')) return 'career';
        if (path.includes('aitools')) return 'ai';
        if (path.includes('tools')) return 'tools';
        if (path.includes('about')) return 'about';
        if (path.includes('privacy')) return 'privacy';
        if (path.includes('terms')) return 'terms';
        if (path.includes('disclaimer')) return 'disclaimer';
        return 'home';
    }

    window.toggleMobileMenu = function () {
        const nav = document.getElementById('navPillsContainer') || document.querySelector('.nav-pills-wrapper');
        const overlay = document.getElementById('mobileOverlay');
        const menuBtn = document.querySelector('.mobile-menu-btn');

        if (!nav) return;
        const isOpen = nav.classList.toggle('mobile-open');

        if (overlay) overlay.classList.toggle('active', isOpen);
        if (menuBtn) {
            menuBtn.classList.toggle('active', isOpen);
            menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    // ============================================================
    // 3. UNIVERSAL CROSS-PAGE SEARCH ENGINE
    // ============================================================
    // High-coverage built-in index across Govt Services, Education, Career, AI Tools & News
    const DEFAULT_SEARCH_INDEX = [
        // --- Government Services Categories & Portals ---
        { id: 'cat-gov-aadhaar', title: 'Aadhaar Services (All Services)', cat: 'Government Services', page: 'governmentservices/governmentservices.html', target: 'cat-aadhaar', desc: 'UIDAI, My Aadhaar, Download e-Aadhaar, Check Status, Lock/Unlock' },
        { id: 'cat-gov-pan', title: 'PAN Services (All Services)', cat: 'Government Services', page: 'governmentservices/governmentservices.html', target: 'cat-pan', desc: 'Apply New PAN, Download e-PAN, Reprint PAN, PAN Status Track' },
        { id: 'cat-gov-passport', title: 'Passport Services (All Services)', cat: 'Government Services', page: 'governmentservices/governmentservices.html', target: 'cat-passport', desc: 'Passport Seva, Tatkaal Passport, Police Clearance, Book Appointment' },
        { id: 'cat-gov-food', title: 'Food & Civil Supplies (Ration Card)', cat: 'Government Services', page: 'governmentservices/governmentservices.html', target: 'cat-food', desc: 'Ration card search, FSC application, Civil supplies portal' },
        { id: 'cat-gov-transport', title: 'Transport & RTA Services', cat: 'Government Services', page: 'governmentservices/governmentservices.html', target: 'cat-transport', desc: 'Driving Licence, LLR, Vehicle Registration, RTA Telangana' },
        { id: 'cat-gov-health', title: 'Health & Medical Services', cat: 'Government Services', page: 'governmentservices/governmentservices.html', target: 'cat-health', desc: 'eSanjeevani teleconsultation, Aarogyasri health scheme' },
        { id: 'cat-gov-electricity', title: 'Electricity & Utilities', cat: 'Government Services', page: 'governmentservices/governmentservices.html', target: 'cat-electricity', desc: 'TGSPDCI, TSSPDCL electricity bill payment & new connection' },
        { id: 'svc-gov-myaadhaar', title: 'My Aadhaar Portal', cat: 'Government Services', page: 'governmentservices/governmentservices.html', target: 'svc-gov-my-aadhaar', desc: 'Aadhaar online services, download e-Aadhaar & update' },

        // --- Government Services Individual Services ---
        { id: 'svc-gov-aadhaar-uidai', title: 'UIDAI Aadhaar Portal', cat: 'Government Services', page: 'governmentservices/governmentservices.html', target: 'svc-gov-aadhaar-uidai', desc: 'Official Aadhaar portal, enrollment & digital services' },
        { id: 'svc-gov-aadhaar-download', title: 'Download e-Aadhaar', cat: 'Government Services', page: 'governmentservices/governmentservices.html', target: 'svc-gov-aadhaar-download', desc: 'Download official digital copy of Aadhaar card' },
        { id: 'svc-gov-aadhaar-status', title: 'Check Aadhaar Status', cat: 'Government Services', page: 'governmentservices/governmentservices.html', target: 'svc-gov-aadhaar-status', desc: 'Track Aadhaar enrollment and update status' },
        { id: 'svc-gov-aadhaar-lock', title: 'Lock / Unlock Aadhaar Biometrics', cat: 'Government Services', page: 'governmentservices/governmentservices.html', target: 'svc-gov-aadhaar-lock', desc: 'Secure biometric details from misuse' },
        { id: 'svc-gov-pan-apply', title: 'Apply for New PAN Card', cat: 'Government Services', page: 'governmentservices/governmentservices.html', target: 'svc-gov-pan-apply', desc: 'Online application for PAN card allotment' },
        { id: 'svc-gov-pan-download', title: 'Download e-PAN Card', cat: 'Government Services', page: 'governmentservices/governmentservices.html', target: 'svc-gov-pan-download', desc: 'Instant electronic PAN card download' },
        { id: 'svc-gov-pan-status', title: 'Check PAN Card Status', cat: 'Government Services', page: 'governmentservices/governmentservices.html', target: 'svc-gov-pan-status', desc: 'Track UTI / NSDL PAN application status' },
        { id: 'svc-gov-passport-seva', title: 'Passport Seva Portal', cat: 'Government Services', page: 'governmentservices/governmentservices.html', target: 'svc-gov-passport-seva', desc: 'Official Government of India passport services' },
        { id: 'svc-gov-passport-tatkaal', title: 'Tatkaal Passport Appointment', cat: 'Government Services', page: 'governmentservices/governmentservices.html', target: 'svc-gov-passport-tatkaal', desc: 'Fast-track passport application & appointment booking' },
        { id: 'svc-gov-food-ration', title: 'Telangana Ration Card Download', cat: 'Government Services', page: 'governmentservices/governmentservices.html', target: 'svc-gov-food-ration', desc: 'Food security card download & status search' },
        { id: 'svc-gov-transport-dl', title: 'Driving Licence Slot Booking', cat: 'Government Services', page: 'governmentservices/governmentservices.html', target: 'svc-gov-transport-dl', desc: 'Telangana RTA driving test slot booking' },
        { id: 'svc-gov-transport-ll', title: 'Learner Licence (LLR) Booking', cat: 'Government Services', page: 'governmentservices/governmentservices.html', target: 'svc-gov-transport-ll', desc: 'Book online slot for learner driving licence test' },
        { id: 'svc-gov-health-sanjeevani', title: 'eSanjeevani National Teleconsultation', cat: 'Government Services', page: 'governmentservices/governmentservices.html', target: 'svc-gov-health-sanjeevani', desc: 'Free online doctor consultation portal' },
        { id: 'svc-gov-health-arogyasri', title: 'Aarogyasri Health Scheme Portal', cat: 'Government Services', page: 'governmentservices/governmentservices.html', target: 'svc-gov-health-arogyasri', desc: 'Telangana healthcare scheme beneficiary services' },
        { id: 'svc-gov-agri-bhubharati', title: 'Bhu Bharati Land Records', cat: 'Government Services', page: 'governmentservices/governmentservices.html', target: 'svc-gov-agri-bhubharati', desc: 'Digital land records & passbook verification' },
        { id: 'svc-gov-agri-igrs', title: 'IGRS Telangana Stamps & Registration', cat: 'Government Services', page: 'governmentservices/governmentservices.html', target: 'svc-gov-agri-igrs', desc: 'Property registration, EC & market value search' },

        // --- Education & Exams Portal ---
        { id: 'svc-edu-144', title: 'TS LAWCET Law Admissions & Counselling 2026', cat: 'Education', page: 'education/education.html', target: 'svc-edu-144', desc: 'Telangana State Law Common Entrance Test for 3-Year / 5-Year LL.B & LL.M courses.' },
        { id: 'svc-edu-50', title: 'Prof Jayashankar Agriculture University Results', cat: 'Education', page: 'education/education.html', target: 'svc-edu-50', desc: 'PJTSAU university examination results and rank cards' },
        { id: 'svc-edu-101', title: 'UGC NET JRF & Assistant Professor Eligibility', cat: 'Education', page: 'education/education.html', target: 'svc-edu-101', desc: 'Official NTA UGC NET notification and hall tickets' },
        { id: 'svc-edu-eamcet', title: 'TS EAMCET / EAPCET Engineering & Agriculture', cat: 'Education', page: 'education/education.html', target: 'svc-edu-eamcet', desc: 'Telangana engineering & agriculture common entrance test' },
        { id: 'svc-edu-ecet', title: 'TS ECET Diploma Lateral Entry', cat: 'Education', page: 'education/education.html', target: 'svc-edu-ecet', desc: 'Engineering common entrance test for diploma holders' },
        { id: 'svc-edu-polycet', title: 'TS POLYCET Polytechnic Entrance', cat: 'Education', page: 'education/education.html', target: 'svc-edu-polycet', desc: 'Admission into diploma courses in engineering & non-engineering' },
        { id: 'svc-edu-dost', title: 'DOST Telangana Degree Admissions', cat: 'Education', page: 'education/education.html', target: 'svc-edu-dost', desc: 'Degree Online Services Telangana unified degree seat allotment' },
        { id: 'svc-edu-icet', title: 'TS ICET MBA & MCA Admissions', cat: 'Education', page: 'education/education.html', target: 'svc-edu-icet', desc: 'Telangana integrated common entrance test for MBA & MCA' },
        { id: 'svc-edu-edcet', title: 'TS EDCET B.Ed Admission Test', cat: 'Education', page: 'education/education.html', target: 'svc-edu-edcet', desc: 'Education common entrance test for B.Ed admissions' },
        { id: 'svc-edu-scholarships', title: 'ePass Telangana Post-Matric Scholarships', cat: 'Education', page: 'education/education.html', target: 'svc-edu-scholarships', desc: 'Reimbursement of tuition fees & maintenance fee scholarships' },
        { id: 'svc-edu-ssc', title: 'Telangana SSC 10th Board Results & Hall Tickets', cat: 'Education', page: 'education/education.html', target: 'svc-edu-ssc', desc: 'BSE Telangana class 10 examinations & marks memos' },
        { id: 'svc-edu-inter', title: 'TS Inter 1st & 2nd Year Results', cat: 'Education', page: 'education/education.html', target: 'svc-edu-inter', desc: 'TSBIE Intermediate public examinations results' },

        // --- Career & Government Jobs ---
        { id: 'svc-job-RRB-NTPC-2026', title: 'RRB NTPC Graduate & Undergraduate Posts', cat: 'Career', page: 'career/career.html', target: 'svc-job-RRB-NTPC-2026', desc: 'Railway Recruitment Board NTPC recruitment notification' },
        { id: 'svc-job-RRB-JE-2026', title: 'RRB Junior Engineer (JE) 4029 Posts', cat: 'Career', page: 'career/career.html', target: 'svc-job-RRB-JE-2026', desc: 'Diploma & B.Tech Railway Junior Engineer vacancies' },
        { id: 'svc-job-IBPS-PO-2026', title: 'IBPS PO Probationary Officer CRP PO/MT', cat: 'Career', page: 'career/career.html', target: 'svc-job-IBPS-PO-2026', desc: 'Public sector bank PO recruitment notification' },
        { id: 'svc-job-IBPS-CLERK-2026', title: 'IBPS Clerk 2026 Recruitment', cat: 'Career', page: 'career/career.html', target: 'svc-job-IBPS-CLERK-2026', desc: 'Clerical cadre vacancies across Indian public banks' },
        { id: 'svc-job-SBI-JA', title: 'SBI Junior Associate (Clerk) 8773 Posts', cat: 'Career', page: 'career/career.html', target: 'svc-job-SBI-JA', desc: 'State Bank of India customer support & sales clerk posts' },
        { id: 'svc-job-SSC-CGL-2026', title: 'SSC Combined Graduate Level (CGL)', cat: 'Career', page: 'career/career.html', target: 'svc-job-SSC-CGL-2026', desc: 'Staff Selection Commission central government group B & C posts' },
        { id: 'svc-job-SSC-MTS', title: 'SSC Multi Tasking Staff (MTS) & Havaldar', cat: 'Career', page: 'career/career.html', target: 'svc-job-SSC-MTS', desc: 'Staff Selection Commission 10th pass central government jobs' },
        { id: 'svc-job-UPSC-CSE-2026', title: 'UPSC Civil Services Examination (IAS / IPS)', cat: 'Career', page: 'career/career.html', target: 'svc-job-UPSC-CSE-2026', desc: 'Union Public Service Commission prestigious civil services' },
        { id: 'svc-job-ARMY-AGNI-2026', title: 'Indian Army Agniveer General Duty', cat: 'Career', page: 'career/career.html', target: 'svc-job-ARMY-AGNI-2026', desc: 'Indian Army Agnipath recruitment rally notifications' },
        { id: 'svc-job-TSLPRB-CONST', title: 'TSLPRB Police Constable 7112 Posts', cat: 'Career', page: 'career/career.html', target: 'svc-job-TSLPRB-CONST', desc: 'Telangana State Police Constable & Fireman recruitment' },
        { id: 'svc-job-DRDO-SCI-2026', title: 'DRDO Scientist B & Research Associate', cat: 'Career', page: 'career/career.html', target: 'svc-job-DRDO-SCI-2026', desc: 'Defence Research and Development Organisation positions' },

        // --- 80+ AI Tools ---
        { id: 'svc-ai-chatgpt', title: 'ChatGPT Images & Reasoning 2.0', cat: '80+ AI Tools', page: 'aitools.html', target: 'svc-ai-chatgpt-images-2-0', desc: 'OpenAI conversational AI and multi-modal image generation' },
        { id: 'svc-ai-midjourney', title: 'Midjourney V8 Image Generator', cat: '80+ AI Tools', page: 'aitools.html', target: 'svc-ai-midjourney-v8', desc: 'Photorealistic generative image creation model' },
        { id: 'svc-ai-claude', title: 'Claude 3.7 Sonnet & Opus', cat: '80+ AI Tools', page: 'aitools.html', target: 'svc-ai-claude', desc: 'Advanced coding, long-document reasoning and analysis' },
        { id: 'svc-ai-manus', title: 'Manus Autonomous AI Agent', cat: '80+ AI Tools', page: 'aitools.html', target: 'svc-ai-manus-ai-agent', desc: 'Autonomous execution agent for browser & digital workflows' },
        { id: 'svc-ai-flux', title: 'Flux.2 High-Fidelity Image Generator', cat: '80+ AI Tools', page: 'aitools.html', target: 'svc-ai-flux-2', desc: 'Black Forest Labs state-of-the-art open image model' },
        { id: 'svc-ai-runway', title: 'Runway Gen-3 Alpha Video Maker', cat: '80+ AI Tools', page: 'aitools.html', target: 'svc-ai-runway-gen-3-alpha', desc: 'Generative video effects, motion brush, and text-to-video' },
        { id: 'svc-ai-elevenlabs', title: 'ElevenLabs Voice Generator', cat: '80+ AI Tools', page: 'aitools.html', target: 'svc-ai-elevenlabs', desc: 'AI speech, voice cloning and text-to-audio engine' },

        // --- Newspapers & Articles ---
        { id: 'svc-news-eenadu', title: 'Eenadu Telugu ePaper & Daily News', cat: 'News & Articles', page: 'Newsandarticles/newsandarticles.html', target: 'svc-news-eenadu', desc: 'Leading Telugu daily newspaper and online digital edition' },
        { id: 'svc-news-sakshi', title: 'Sakshi Telugu Daily ePaper', cat: 'News & Articles', page: 'Newsandarticles/newsandarticles.html', target: 'svc-news-sakshi', desc: 'Andhra Pradesh & Telangana Telugu newspaper & digital edition' },
        { id: 'svc-news-hindu', title: 'The Hindu National Daily Newspaper', cat: 'News & Articles', page: 'Newsandarticles/newsandarticles.html', target: 'svc-news-the-hindu', desc: 'National English newspaper renowned for civil services prep' },
        { id: 'svc-news-times', title: 'The Times of India Daily ePaper', cat: 'News & Articles', page: 'Newsandarticles/newsandarticles.html', target: 'svc-news-the-times-of-india', desc: 'India\'s leading English daily newspaper' },

        // --- Tools & Calculators ---
        { id: 'tool-age-calc', title: 'Exam Age & Cutoff Calculator', cat: 'Tools', page: 'tools.html', target: 'tool-age-calc', desc: 'Calculate exact years, months and days as of notification cutoff date' },
        { id: 'tool-cgpa-converter', title: 'CGPA to Percentage Converter', cat: 'Tools', page: 'tools.html', target: 'tool-cgpa-converter', desc: 'CBSE, AICTE and university 10-point scale formula' },
        { id: 'tool-word-counter', title: 'Word & Character Counter', cat: 'Tools', page: 'tools.html', target: 'tool-word-counter', desc: 'Statement of purpose, essay word count and reading time' }
    ];

    // Storage keys for automated search learning & recent searches
    const RECENT_SEARCHES_KEY = 'vi_recent_searches';
    const AUTO_SEARCH_DATA_KEY = 'vi_auto_search_data';

    function getStoredItemSafe(key) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    }

    function setStoredItemSafe(key, val) {
        try {
            localStorage.setItem(key, JSON.stringify(val));
        } catch (e) {}
    }

    function getRelativePagePath() {
        const path = window.location.pathname.replace(/\\/g, '/').toLowerCase();
        if (path.includes('governmentservices')) return 'governmentservices/governmentservices.html';
        if (path.includes('education')) return 'education/education.html';
        if (path.includes('newsandarticles')) return 'Newsandarticles/newsandarticles.html';
        if (path.includes('career')) return 'career/career.html';
        if (path.includes('aitools')) return 'aitools.html';
        if (path.includes('tools')) return 'tools.html';
        if (path.includes('about')) return 'about.html';
        if (path.includes('privacypolicy')) return 'privacypolicy.html';
        if (path.includes('termsofuse')) return 'termsofuse.html';
        if (path.includes('disclaimer')) return 'disclaimer.html';
        return 'index.html';
    }

    function getPageDefaultCategory() {
        const p = getCurrentPage();
        switch (p) {
            case 'government': return 'Government Services';
            case 'education': return 'Education';
            case 'career': return 'Career';
            case 'ai': return '80+ AI Tools';
            case 'news': return 'News & Articles';
            case 'tools': return 'Tools';
            case 'about': return 'About';
            default: return 'Portals';
        }
    }

    // ============================================================
    // UNIVERSAL SEARCH ENGINE ARCHITECTURE
    // Auto-discovers services, categories, tools, and pages from JS datasets & DOM
    // ============================================================
    window.VI_SEARCH = {
        index: (typeof window.VI_MASTER_SEARCH_INDEX !== 'undefined' && Array.isArray(window.VI_MASTER_SEARCH_INDEX)) 
            ? [...window.VI_MASTER_SEARCH_INDEX] 
            : [...DEFAULT_SEARCH_INDEX],
        autoData: getStoredItemSafe(AUTO_SEARCH_DATA_KEY),
        recentSearches: getStoredItemSafe(RECENT_SEARCHES_KEY),
        _indexedIds: new Set(),
        _hasPreloaded: false,
        _harvestDebounceTimer: null,

        init: function () {
            this.index.forEach(item => {
                if (item && item.id) this._indexedIds.add(item.id);
            });
            if (Array.isArray(this.autoData) && this.autoData.length > 0) {
                this.register(this.autoData, false);
            }
            this.autoHarvest();
            this.initDomObserver();
            this.schedulePreload();
        },

        schedulePreload: function () {
            if (this._hasPreloaded) return;
            const preload = () => {
                this._hasPreloaded = true;
                const base = getBasePath();
                let loadedAny = false;

                if (typeof window.EDUCATION_SERVICES === 'undefined') {
                    const s1 = document.createElement('script');
                    s1.src = base + 'education/data.js';
                    s1.defer = true;
                    s1.onload = () => { window.VI_SEARCH.autoHarvest(); };
                    document.head.appendChild(s1);
                    loadedAny = true;
                }
                if (typeof window.VI_JOBS === 'undefined') {
                    const s2 = document.createElement('script');
                    s2.src = base + 'career/careerdata.js';
                    s2.defer = true;
                    s2.onload = () => { window.VI_SEARCH.autoHarvest(); };
                    document.head.appendChild(s2);
                    loadedAny = true;
                }
                if (typeof window.tools === 'undefined') {
                    const s3 = document.createElement('script');
                    s3.src = base + 'tools.js';
                    s3.defer = true;
                    s3.onload = () => { window.VI_SEARCH.autoHarvest(); };
                    document.head.appendChild(s3);
                    loadedAny = true;
                }
            };

            if ('requestIdleCallback' in window) {
                window.requestIdleCallback(preload, { timeout: 2500 });
            } else {
                setTimeout(preload, 1200);
            }
        },

        initDomObserver: function () {
            try {
                if (typeof MutationObserver === 'undefined') return;
                const observer = new MutationObserver((mutations) => {
                    let shouldHarvest = false;
                    for (const m of mutations) {
                        if (m.addedNodes && m.addedNodes.length > 0) {
                            for (const node of m.addedNodes) {
                                if (node.nodeType === 1) {
                                    if (node.matches && (node.matches('.service-card, .tool-card, .tool-widget-card, [data-target], [data-category]'))) {
                                        shouldHarvest = true;
                                        break;
                                    }
                                    if (node.querySelector && node.querySelector('.service-card, .tool-card, .tool-widget-card, [data-target], [data-category]')) {
                                        shouldHarvest = true;
                                        break;
                                    }
                                }
                            }
                        }
                        if (shouldHarvest) break;
                    }
                    if (shouldHarvest) {
                        clearTimeout(this._harvestDebounceTimer);
                        this._harvestDebounceTimer = setTimeout(() => this.autoHarvest(), 250);
                    }
                });
                observer.observe(document.documentElement || document.body, { childList: true, subtree: true });
            } catch (e) {}
        },

        register: function (items, persist = false) {
            if (!Array.isArray(items)) return;
            let addedNew = false;
            items.forEach(it => {
                if (!it || !it.id) return;
                if (!it.type) {
                    if (it.id.startsWith('cat-')) it.type = 'category';
                    else if (it.id.startsWith('tool-')) it.type = 'tool';
                    else if (it.id.startsWith('page-')) it.type = 'page';
                    else it.type = 'service';
                }
                if (!this._indexedIds.has(it.id)) {
                    this._indexedIds.add(it.id);
                    this.index.push(it);
                    if (persist) {
                        if (!this.autoData.some(x => x.id === it.id)) {
                            this.autoData.push(it);
                            addedNew = true;
                        }
                    }
                } else {
                    const existing = this.index.find(x => x.id === it.id);
                    if (existing && it.type && existing.type !== it.type) {
                        existing.type = it.type;
                    }
                }
            });
            if (addedNew) {
                setStoredItemSafe(AUTO_SEARCH_DATA_KEY, this.autoData.slice(0, 400));
            }
        },

        addRecentSearch: function (q) {
            if (!q || typeof q !== 'string') return;
            const term = q.trim();
            if (term.length < 2) return;
            this.recentSearches = this.recentSearches.filter(r => r.toLowerCase() !== term.toLowerCase());
            this.recentSearches.unshift(term);
            if (this.recentSearches.length > 8) this.recentSearches = this.recentSearches.slice(0, 8);
            setStoredItemSafe(RECENT_SEARCHES_KEY, this.recentSearches);
        },

        removeRecentSearch: function (q) {
            if (!q) return;
            const term = q.trim().toLowerCase();
            this.recentSearches = this.recentSearches.filter(r => r.toLowerCase() !== term);
            setStoredItemSafe(RECENT_SEARCHES_KEY, this.recentSearches);
        },

        clearRecentSearches: function () {
            this.recentSearches = [];
            try { localStorage.removeItem(RECENT_SEARCHES_KEY); } catch (e) {}
        },

        getRecentSearches: function () {
            return this.recentSearches || [];
        },

        autoHarvest: function () {
            const harvested = [];

            // Helper for category slug
            const catSlug = (name) => 'cat-' + String(name).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');

            // 1. Education data & categories
            const eduList = window.EDUCATION_SERVICES || window.SERVICES;
            if (Array.isArray(eduList)) {
                const eduCats = new Set();
                eduList.forEach(s => {
                    const sid = s.id;
                    const safeId = `svc-edu-${sid}`;
                    harvested.push({
                        id: safeId,
                        title: s.serviceName,
                        cat: s.category || 'Education',
                        page: 'education/education.html',
                        target: safeId,
                        type: 'service',
                        desc: `${s.category || ''} • ${s.subCategory || ''} • ${s.shortDescription || ''}`.trim()
                    });
                    if (s.category) eduCats.add(s.category);
                });

                eduCats.forEach(catName => {
                    const targetSlug = catSlug(catName);
                    harvested.push({
                        id: `cat-edu-${targetSlug}`,
                        title: `${catName} (Category)`,
                        cat: 'Education Categories',
                        page: 'education/education.html',
                        target: targetSlug,
                        type: 'category',
                        desc: `Browse all ${catName} entrance exams, admissions and results in Education`
                    });
                });
            }

            // 2. Career jobs & categories
            const jobList = window.VI_JOBS || window.jobs;
            if (Array.isArray(jobList)) {
                const jobCats = new Set();
                jobList.forEach(j => {
                    const safeId = 'svc-job-' + (j.id || j.postName).replace(/[^a-zA-Z0-9_-]/g, '-');
                    harvested.push({
                        id: safeId,
                        title: `${j.board} - ${j.postName}`,
                        cat: j.category || 'Career',
                        page: 'career/career.html',
                        target: safeId,
                        type: 'service',
                        desc: `${j.category || ''} • ${j.qualification || ''} • Last Date: ${j.lastDate || 'N/A'}`.trim()
                    });
                    if (j.category) jobCats.add(j.category);
                });

                jobCats.forEach(cName => {
                    const targetSlug = catSlug(cName);
                    harvested.push({
                        id: `cat-career-${targetSlug}`,
                        title: `${cName} (Jobs Category)`,
                        cat: 'Career Categories',
                        page: 'career/career.html',
                        target: targetSlug,
                        type: 'category',
                        desc: `View all active recruitment notifications under ${cName}`
                    });
                });
            }

            // 3. Government Services & categories
            const govCats = window.categoriesData || window.VI_GOV_CATEGORIES;
            if (Array.isArray(govCats)) {
                govCats.forEach(c => {
                    if (c.id && c.id !== 'all') {
                        const targetId = `cat-${c.id}`;
                        harvested.push({
                            id: `cat-gov-${c.id}`,
                            title: `${c.title} (Government Category)`,
                            cat: 'Government Services',
                            page: 'governmentservices/governmentservices.html',
                            target: targetId,
                            type: 'category',
                            desc: `Browse all ${c.title} official online portals and citizen services`
                        });
                    }
                    if (Array.isArray(c.services)) {
                        c.services.forEach(s => {
                            const slug = (s.id || s.name).toLowerCase().replace(/[^a-z0-9]+/g, '-');
                            harvested.push({
                                id: `svc-gov-${slug}`,
                                title: `${s.name} - ${c.title}`,
                                cat: c.title || 'Government Services',
                                page: 'governmentservices/governmentservices.html',
                                target: `svc-gov-${slug}`,
                                type: 'service',
                                desc: s.desc || `${c.title} verified portal`
                            });
                        });
                    }
                });
            }

            // 4. 80+ AI Tools & categories
            if (Array.isArray(window.aiToolsData)) {
                const aiCats = new Set();
                window.aiToolsData.forEach(t => {
                    const slug = 'svc-ai-' + t.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    harvested.push({
                        id: slug,
                        title: t.name,
                        cat: t.category ? `${t.category} AI Tools` : '80+ AI Tools',
                        page: 'aitools.html',
                        target: slug,
                        type: 'tool',
                        desc: `Category: ${t.category || ''} • AI powered tool for productivity`
                    });
                    if (t.category) aiCats.add(t.category);
                });

                aiCats.forEach(catName => {
                    const targetSlug = catSlug(catName);
                    harvested.push({
                        id: `cat-ai-${targetSlug}`,
                        title: `${catName} AI Tools (Category)`,
                        cat: 'AI Tool Categories',
                        page: 'aitools.html',
                        target: targetSlug,
                        type: 'category',
                        desc: `Browse all curated ${catName} artificial intelligence tools`
                    });
                });
            }

            // 5. Newspapers & Articles
            if (Array.isArray(window.newspapersData)) {
                window.newspapersData.forEach(n => {
                    const slug = n.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    harvested.push({
                        id: `svc-news-${slug}`,
                        title: `${n.name} (${n.language} ${n.type})`,
                        cat: 'News & Articles',
                        page: 'Newsandarticles/newsandarticles.html',
                        target: `svc-news-${slug}`,
                        type: 'service',
                        desc: `${n.language || ''} ${n.subcat || ''} • Daily ePaper edition`
                    });
                });
            }
            if (Array.isArray(window.publishedArticles)) {
                window.publishedArticles.forEach(a => {
                    harvested.push({
                        id: `svc-art-${a.id}`,
                        title: a.title,
                        cat: 'Published Articles',
                        page: 'Newsandarticles/newsandarticles.html',
                        target: `svc-art-${a.id}`,
                        type: 'service',
                        desc: `${a.category || ''} • By ${a.author || ''} • ${a.excerpt || ''}`.trim()
                    });
                });
            }

            // 6. Tools array
            if (Array.isArray(window.tools)) {
                window.tools.forEach(t => {
                    const slug = t.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    harvested.push({
                        id: `tool-${slug}`,
                        title: t.name,
                        cat: 'Tools',
                        page: 'tools.html',
                        target: `tool-${slug}`,
                        type: 'tool',
                        desc: `${t.category || ''} • ${t.description || ''}`.trim()
                    });
                });
            }

            // 7. Important Portal Pages
            const importantPages = [
                { id: 'page-home', title: 'Home Page', page: 'index.html', target: '', cat: 'Portal Page', type: 'page', desc: 'Venkat Insights central hub for jobs, education, govt services & tools' },
                { id: 'page-gov', title: 'Government Services Portal', page: 'governmentservices/governmentservices.html', target: '', cat: 'Portal Page', type: 'page', desc: 'Telangana & National citizen services, Aadhaar, PAN, Passport, Ration' },
                { id: 'page-edu', title: 'Education & Entrance Exams Portal', page: 'education/education.html', target: '', cat: 'Portal Page', type: 'page', desc: 'TS EAMCET, LAWCET, ICET, POLYCET, GATE 2027, results & scholarships' },
                { id: 'page-career', title: 'Career & Govt Jobs Dashboard', page: 'career/career.html', target: '', cat: 'Portal Page', type: 'page', desc: 'Railway RRB, Banking IBPS/SBI, SSC, UPSC, Defence recruitment notifications' },
                { id: 'page-ai', title: '80+ Best AI Tools Directory', page: 'aitools.html', target: '', cat: 'Portal Page', type: 'page', desc: 'Curated directory of top AI tools across text, image, video, audio and code' },
                { id: 'page-tools', title: 'Online Student & Applicant Tools', page: 'tools.html', target: '', cat: 'Portal Page', type: 'page', desc: 'Exam age calculator, CGPA to percentage converter, word counter' },
                { id: 'page-news', title: 'News, Articles & Daily ePapers', page: 'Newsandarticles/newsandarticles.html', target: '', cat: 'Portal Page', type: 'page', desc: 'Eenadu, Sakshi, The Hindu, Times of India daily digital papers' },
                { id: 'page-about', title: 'About Venkat Insights & Developer', page: 'about.html', target: '', cat: 'Portal Page', type: 'page', desc: 'Mission, vision, developer profile (Venkatesh Kothapally) and contact info' }
            ];
            importantPages.forEach(p => harvested.push(p));

            // 8. Live DOM crawling on active page for dynamic & custom user cards
            try {
                const domCards = document.querySelectorAll(
                    '.service-card, .tool-widget-card, .tool-card, .newspaper-card, .article-feed-card, .featured-card, [data-target], [data-id]'
                );
                const curPage = getRelativePagePath();
                const curCat = getPageDefaultCategory();

                domCards.forEach(el => {
                    const titleEl = el.querySelector('h1, h2, h3, h4, .card-title, .post-title, .newspaper-name, strong');
                    const title = titleEl ? titleEl.textContent.trim() : '';
                    if (!title || title.length < 2) return;

                    let targetId = el.id || el.getAttribute('data-target') || el.getAttribute('data-id');
                    if (!targetId) {
                        targetId = `svc-auto-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                        el.id = targetId;
                        el.setAttribute('data-target', targetId);
                    }

                    const descEl = el.querySelector('.card-desc, p, .subtext, .newspaper-body p, .article-feed-excerpt');
                    const desc = descEl ? descEl.textContent.trim() : '';

                    const tagEl = el.querySelector('.badge, .tag, .cat, .category, .newspaper-badge, .card-cat-badge');
                    const cat = tagEl ? tagEl.textContent.trim() : curCat;

                    harvested.push({
                        id: targetId.startsWith('svc-') || targetId.startsWith('tool-') || targetId.startsWith('cat-') ? targetId : `dom-${targetId}`,
                        title: title,
                        cat: cat || curCat,
                        page: curPage,
                        target: targetId,
                        type: el.classList.contains('tool-card') || el.classList.contains('tool-widget-card') ? 'tool' : 'service',
                        desc: desc
                    });
                });
            } catch (e) {}

            if (harvested.length > 0) {
                this.register(harvested, false);
            }
        },

        query: function (q, maxResults = 14) {
            this.autoHarvest();
            if (!q || !q.trim()) return [];

            const rawTerm = q.trim();
            const term = rawTerm.toLowerCase().replace(/adhar/g, 'aadhaar');
            const words = term.split(/\s+/).filter(Boolean);

            const scored = [];

            this.index.forEach(item => {
                if (!item || !item.title) return;

                const title = String(item.title).toLowerCase().replace(/adhar/g, 'aadhaar');
                const cat = String(item.cat || '').toLowerCase().replace(/adhar/g, 'aadhaar');
                const desc = String(item.desc || '').toLowerCase().replace(/adhar/g, 'aadhaar');
                const tags = Array.isArray(item.tags) ? item.tags.map(t => String(t).toLowerCase()) : [];
                const itemType = item.type || (item.id && item.id.startsWith('cat-') ? 'category' : (item.id && item.id.startsWith('tool-') ? 'tool' : (item.id && item.id.startsWith('page-') ? 'page' : 'service')));

                let score = 0;

                // Priority 1: Exact service/category/page name match
                if (title === term) {
                    score += 650;
                }
                // Priority 2: Title starts with exact query (prefix match)
                else if (title.startsWith(term)) {
                    score += 380;
                }
                // Priority 3: Word in title starts with query (prefix match per word)
                else if (title.split(/\s+/).some(w => w.startsWith(term))) {
                    score += 260;
                }
                // Priority 4: Partial title match
                else if (title.includes(term)) {
                    score += 180;
                }

                // Priority 5: Category match
                if (cat === term) {
                    score += 240;
                } else if (cat.startsWith(term)) {
                    score += 160;
                } else if (cat.includes(term)) {
                    score += 110;
                }

                // Priority 6: Keyword / Tag match
                if (tags.some(t => t === term)) {
                    score += 150;
                } else if (tags.some(t => t.startsWith(term))) {
                    score += 110;
                } else if (tags.some(t => t.includes(term))) {
                    score += 70;
                }

                // Priority 7: Description / content match
                if (desc.includes(term)) {
                    score += 55;
                }

                // Multi-word token evaluation
                if (words.length > 1) {
                    let allWordsMatch = true;
                    let tokenScore = 0;
                    for (const w of words) {
                        const inTitle = title.includes(w);
                        const inCat = cat.includes(w);
                        const inTag = tags.some(t => t.includes(w));
                        const inDesc = desc.includes(w);

                        if (inTitle) tokenScore += 45;
                        else if (inCat) tokenScore += 30;
                        else if (inTag) tokenScore += 25;
                        else if (inDesc) tokenScore += 15;
                        else {
                            allWordsMatch = false;
                        }
                    }
                    if (allWordsMatch) {
                        score += 160 + tokenScore;
                    }
                }

                // Boost Categories when query mentions category or matches category term
                if (itemType === 'category' && (cat.includes(term) || title.includes(term))) {
                    score += 85;
                }

                if (score > 0) {
                    scored.push({ item, score, itemType });
                }
            });

            return scored
                .sort((a, b) => b.score - a.score)
                .slice(0, maxResults)
                .map(res => ({
                    ...res.item,
                    type: res.itemType
                }));
        }
    };

    window.VI_SEARCH.init();

    // Auto-load master search database if not yet included
    if (typeof window.VI_MASTER_SEARCH_INDEX === 'undefined') {
        const s = document.createElement('script');
        s.src = getBasePath() + 'searchdata.js';
        s.onload = function () {
            if (window.VI_SEARCH && Array.isArray(window.VI_MASTER_SEARCH_INDEX)) {
                window.VI_SEARCH.register(window.VI_MASTER_SEARCH_INDEX);
            }
        };
        document.head.appendChild(s);
    }

    // Helper: Build the correct relative link for a target page
    function resolvePageUrl(pagePath) {
        if (!pagePath) return '';
        const inSub = isInSubfolder();
        const currentPath = window.location.pathname.replace(/\\/g, '/').toLowerCase();

        // Check if user is already on that exact page
        const isCurrentPage = currentPath.includes(pagePath.toLowerCase().replace('../', ''));
        if (isCurrentPage) return '';

        return inSub ? `../${pagePath}` : `./${pagePath}`;
    }

    function getCatClass(cat, type) {
        if (type === 'category') return 'category-icon';
        if (type === 'tool') return 'tool';
        if (type === 'page') return 'page-icon';
        const c = String(cat).toLowerCase();
        if (c.includes('gov')) return 'gov';
        if (c.includes('edu')) return 'edu';
        if (c.includes('career') || c.includes('job')) return 'career';
        if (c.includes('ai')) return 'ai';
        if (c.includes('tool')) return 'tool';
        return 'news';
    }

    function getCatAbbr(cat, type) {
        if (type === 'category') return '📁';
        if (type === 'tool') return '🧮';
        if (type === 'page') return '🌐';
        const c = String(cat).toLowerCase();
        if (c.includes('gov')) return 'GOV';
        if (c.includes('edu')) return 'EDU';
        if (c.includes('career') || c.includes('job')) return 'JOB';
        if (c.includes('ai')) return 'AI';
        if (c.includes('tool')) return 'TOOL';
        return 'NEWS';
    }

    function getBadgeHTML(item) {
        const type = item.type || 'service';
        if (type === 'category') {
            return '<span class="search-badge-tag badge-category">CATEGORY</span>';
        }
        if (type === 'tool') {
            return '<span class="search-badge-tag badge-tool">TOOL</span>';
        }
        if (type === 'page') {
            return '<span class="search-badge-tag badge-page">PAGE</span>';
        }
        return `<span class="search-badge-tag badge-service">${escapeHtml(getCatAbbr(item.cat))}</span>`;
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function highlightMatch(text, query) {
        if (!text) return '';
        if (!query || !query.trim()) return escapeHtml(text);
        const words = query.trim().split(/\s+/).filter(w => w.length > 0)
            .map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
        if (words.length === 0) return escapeHtml(text);
        const regex = new RegExp(`(${words.join('|')})`, 'gi');
        const testRegex = new RegExp(`^(?:${words.join('|')})$`, 'i');
        const parts = String(text).split(regex);
        return parts.map(part => {
            if (testRegex.test(part)) {
                return `<mark>${escapeHtml(part)}</mark>`;
            }
            return escapeHtml(part);
        }).join('');
    }

    // ============================================================
    // 4. DYNAMIC LIVE TICKER ("THICKER SCROLL")
    // Automatically pulls & calculates urgency across Govt, Education & Career
    // ============================================================
    const INITIAL_TICKER_UPDATES = [
        {
            category: "Govt Jobs",
            title: "SSC CGL 2026 Tier-1 Examination Notification Out",
            page: "career/career.html",
            target: "svc-job-SSC-CGL-2026",
            lastDate: "15 Sep 2026",
            expiryDate: "2026-09-15"
        },
        {
            category: "Railway",
            title: "RRB NTPC 2026 Graduate Posts Online Form Open",
            page: "career/career.html",
            target: "svc-job-RRB-NTPC-2026",
            lastDate: "25 Sep 2026",
            expiryDate: "2026-09-25"
        },
        {
            category: "Govt Services",
            title: "Telangana RTA: Learner Licence Slot Booking Available",
            page: "governmentservices/governmentservices.html",
            target: "svc-gov-transport-ll",
            lastDate: "",
            expiryDate: ""
        },
        {
            category: "Education",
            title: "TS EAMCET Counselling & Web Options Schedule Announced",
            page: "education/education.html",
            target: "svc-edu-eamcet",
            lastDate: "28 Sep 2026",
            expiryDate: "2026-09-28"
        },
        {
            category: "Banking",
            title: "IBPS PO / MT 2026 Application Closing Soon",
            page: "career/career.html",
            target: "svc-job-IBPS-PO-2026",
            lastDate: "06 Sep 2026",
            expiryDate: "2026-09-06"
        },
        {
            category: "Govt Services",
            title: "Aadhaar Document Update Portal Active: Free Online Verification",
            page: "governmentservices/governmentservices.html",
            target: "svc-gov-aadhaar-uidai",
            lastDate: "",
            expiryDate: ""
        },
        {
            category: "80+ AI Tools",
            title: "15 New Next-Gen Autonomous AI Agents & Video Makers Added",
            page: "aitools.html",
            target: "svc-ai-manus",
            lastDate: "",
            expiryDate: ""
        }
    ];

    window.VI_TICKER = {
        updates: [...INITIAL_TICKER_UPDATES],
        addUpdate: function (item) {
            if (!item || !item.title) return;
            // Avoid duplicate additions
            if (!this.updates.some(u => u.title === item.title)) {
                this.updates.unshift(item);
                this.render();
            }
        },
        render: function () {
            const track = document.getElementById('tickerTrack');
            if (!track) return;
            track.innerHTML = generateTickerItemsHTML(this.updates);
        }
    };

    function generateTickerItemsHTML(itemsList) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const activeItems = itemsList.filter(item => {
            if (!item.expiryDate) return true;
            const exp = new Date(item.expiryDate);
            exp.setHours(0, 0, 0, 0);
            return exp >= today;
        });

        if (activeItems.length === 0) {
            return '<span class="ticker-item">No active updates at the moment.</span>';
        }

        const buildOneSet = (list) => list.map(item => {
            let badgeText = item.category.toUpperCase();
            let badgeClass = "new";

            if (item.expiryDate) {
                const itemDate = new Date(item.expiryDate);
                itemDate.setHours(0, 0, 0, 0);
                const diffDays = Math.ceil((itemDate - today) / (1000 * 60 * 60 * 24));

                if (diffDays <= 0) {
                    badgeText = "CLOSES TODAY";
                    badgeClass = "closing";
                } else if (diffDays <= 5) {
                    badgeText = `CLOSING IN ${diffDays}D`;
                    badgeClass = "closing";
                } else if (diffDays <= 15) {
                    badgeText = "AVAILABLE";
                    badgeClass = "available";
                } else {
                    badgeText = "NEW";
                    badgeClass = "new";
                }
            } else {
                badgeText = "LATEST";
                badgeClass = "latest";
            }

            const pageUrl = resolvePageUrl(item.page);
            const targetAttr = item.target ? `data-target="${item.target}"` : '';
            const href = pageUrl ? `${pageUrl}?target=${item.target || ''}` : `#${item.target || ''}`;
            const dateStr = item.lastDate ? `<span style="opacity:0.8; font-size:0.86em;"> &mdash; Last Date: ${item.lastDate}</span>` : '';

            return `
                <a href="${href}" class="ticker-item vi-target-trigger" ${targetAttr}>
                    <span class="ticker-badge ${badgeClass}">${badgeText}</span>
                    <span>${item.title}</span>${dateStr}
                </a>
                <span class="ticker-separator">&#9670;</span>
            `;
        }).join('');

        // Duplicate the list so continuous CSS marquee has a seamless infinite loop
        return buildOneSet(activeItems) + buildOneSet(activeItems);
    }

    // ============================================================
    // 5. HEADER UI GENERATION
    // ============================================================
    function getHeaderHTML() {
        const currentPageId = getCurrentPage();
        const base = getBasePath();

        const navHTML = navigationLinks.map(link => {
            const isActive = link.id === currentPageId ? 'active' : '';
            return `<a href="${base}${link.url}" class="nav-pill ${isActive}" data-page="${link.id}">${link.label}</a>`;
        }).join('');

        const isGov = currentPageId === 'government';
        return `
            ${isGov ? '' : '<div class="mobile-overlay" id="mobileOverlay"></div>'}
            <header class="navbar-wrapper" id="navbarWrapper">
                <div class="navbar-container">
                    <a href="${base}index.html" class="brand-logo" aria-label="Venkat Insights Home">
                        <div class="logo-box">
                            <img src="https://yt3.googleusercontent.com/4v1xmWtq6zF97zQKTMasxeUMAxjrAPD5cNlwp3bGLHzhPl82FtsydTCYlYoa2S2Ezmxjc5ckq0I=s88-c-k-c0x00ffffff-no-rj" alt="Vi Logo" onerror="this.onerror=null; this.src='https://via.placeholder.com/42x42/4f46e5/ffffff?text=Vi';">
                        </div>
                        <div class="brand-text">
                            <h1>Venkat Insights</h1>
                            <p class="tagline">Jobs &bull; Education &bull; Services &bull; Insights</p>
                        </div>
                    </a>
                    
                    <div class="nav-search-box" id="searchBox" role="combobox" aria-haspopup="listbox" aria-expanded="false" aria-owns="searchDropdown">
                        <svg class="search-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <input type="text" id="searchInput" placeholder="Search services, jobs, exams, AI tools... (Ctrl+K)" autocomplete="off" aria-label="Search all services, categories and tools" aria-autocomplete="list" aria-controls="searchDropdown">
                        <button class="clear-btn" id="clearSearchBtn" type="button" aria-label="Clear Search">&times;</button>
                        <div class="search-dropdown" id="searchDropdown" role="listbox" aria-label="Search suggestions"></div>
                    </div>
                    
                    <div class="navbar-actions">
                        <button class="icon-btn theme-btn" id="themeToggleBtn" type="button" aria-label="Toggle dark/light theme" title="Toggle theme">
                            <svg class="icon-moon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                            <svg class="icon-sun" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="display:none;"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                        </button>
                        ${isGov ? '' : `
                        <button class="icon-btn mobile-menu-btn" id="mobileMenuBtn" type="button" aria-label="Toggle navigation menu" title="Menu">
                            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </button>`}
                    </div>
                </div>
                
                <nav class="nav-pills-wrapper" id="navPillsContainer" aria-label="Main Navigation">
                    <div class="nav-pills-container">${navHTML}</div>
                </nav>
                
                <div class="common-ticker" role="marquee" aria-label="Live updates ticker">
                    <div class="ticker-label">&#9889; LIVE UPDATES</div>
                    <div class="ticker-track-wrapper">
                        <div class="ticker-track" id="tickerTrack">
                            ${generateTickerItemsHTML(window.VI_TICKER.updates)}
                        </div>
                    </div>
                </div>
            </header>
        `;
    }

    // ============================================================
    // 6. TARGET AUTO-SCROLL & 3D ANIMATED SERVICE HIGHLIGHT HANDLER
    // Highlight remains active until user interacts with the card
    // ============================================================
    let activeHighlightedCard = null;
    let removeHighlightHandler = null;

    function dismissCurrentHighlight() {
        if (activeHighlightedCard) {
            const card = activeHighlightedCard;
            card.classList.add('vi-highlight-diminish');
            setTimeout(() => {
                card.classList.remove('vi-highlight-3d', 'vi-highlight-pulse', 'vi-highlight-diminish');
            }, 500);
            if (removeHighlightHandler) {
                card.removeEventListener('click', removeHighlightHandler);
                card.removeEventListener('touchstart', removeHighlightHandler);
                card.removeEventListener('keydown', removeHighlightHandler);
                document.removeEventListener('click', removeHighlightHandler);
                removeHighlightHandler = null;
            }
            activeHighlightedCard = null;
        }
    }

    function pulseAndScrollToElement(el) {
        if (!el) return;

        // Clean up any previously pulsing or 3D highlighted elements
        dismissCurrentHighlight();
        document.querySelectorAll('.vi-highlight-3d, .vi-highlight-pulse, .vi-highlight-diminish').forEach(n => {
            n.classList.remove('vi-highlight-3d', 'vi-highlight-pulse', 'vi-highlight-diminish');
        });

        // If element is inside a collapsed section or requires category tab switch, try to make visible
        if (el.style.display === 'none') {
            el.style.display = '';
        }

        // Calculate offset to account for sticky header & ticker
        const headerOffset = 115;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth'
        });

        // Trigger 3D highlight effect
        void el.offsetWidth;
        el.classList.add('vi-highlight-3d');
        activeHighlightedCard = el;

        // Interactive dismissal: stays active until the user clicks, taps, or engages with the card
        removeHighlightHandler = function () {
            dismissCurrentHighlight();
        };

        // Attach listeners after brief delay so current click event doesn't prematurely trigger dismissal
        setTimeout(() => {
            if (activeHighlightedCard === el) {
                el.addEventListener('click', removeHighlightHandler, { once: true });
                el.addEventListener('touchstart', removeHighlightHandler, { passive: true, once: true });
                el.addEventListener('keydown', removeHighlightHandler, { once: true });
                // Also smoothly dismiss if user clicks anywhere else on the document
                const outsideDismiss = function (evt) {
                    if (!el.contains(evt.target)) {
                        dismissCurrentHighlight();
                        document.removeEventListener('click', outsideDismiss);
                    }
                };
                setTimeout(() => {
                    document.addEventListener('click', outsideDismiss, { once: true });
                }, 400);
            }
        }, 300);
    }

    window.pulseAndScrollToElement = pulseAndScrollToElement;
    window.dismissCurrentHighlight = dismissCurrentHighlight;

    // Check query params for deep-link targets (e.g. ?target=svc-gov-aadhaar or #svc-gov-aadhaar)
    function checkUrlTarget() {
        const params = new URLSearchParams(window.location.search);
        const targetId = params.get('target') || (window.location.hash ? window.location.hash.replace('#', '') : null);
        const searchVal = params.get('search') || params.get('q');

        if (searchVal && !targetId) {
            const input = document.getElementById('searchInput');
            if (input) {
                input.value = searchVal;
                const clearBtn = document.getElementById('clearSearchBtn');
                if (clearBtn) clearBtn.style.display = 'inline-flex';
                if (typeof window.filterServices === 'function') {
                    try { window.filterServices(searchVal); } catch (e) {}
                }
            }
        }

        if (!targetId) return;

        // Trigger section switches before polling for element
        if (typeof window.resolveGovTarget === 'function') window.resolveGovTarget(targetId);
        if (typeof window.resolveEduTarget === 'function') window.resolveEduTarget(targetId);
        if (typeof window.resolveCareerTarget === 'function') window.resolveCareerTarget(targetId);
        if (typeof window.resolveAiTarget === 'function') window.resolveAiTarget(targetId);
        if (typeof window.resolveNewsTarget === 'function') window.resolveNewsTarget(targetId);
        if (typeof window.resolveToolTarget === 'function') window.resolveToolTarget(targetId);

        // Try locating element immediately or poll briefly for async/dynamic lists
        let attempts = 0;
        const interval = setInterval(() => {
            attempts++;
            const el = document.getElementById(targetId) || document.querySelector(`[data-id="${targetId}"]`) || document.querySelector(`[data-target="${targetId}"]`);
            if (el) {
                clearInterval(interval);
                setTimeout(() => pulseAndScrollToElement(el), 200);
            } else if (attempts > 12) {
                clearInterval(interval);
            }
        }, 150);
    }

    // ============================================================
    // 7. UNIVERSAL SEARCH BOX BEHAVIOR & KEYBOARD NAVIGATION
    // ============================================================
    let highlightedIndex = -1;

    function renderRecentAndQuickSearches() {
        const dropdown = document.getElementById('searchDropdown');
        if (!dropdown) return;

        const recents = window.VI_SEARCH.getRecentSearches();
        let html = '';

        if (Array.isArray(recents) && recents.length > 0) {
            html += `
                <div class="search-recent-header">
                    <span>Recent Searches</span>
                    <button class="search-clear-all" id="clearRecentSearchesBtn" type="button">Clear All</button>
                </div>
            `;
            recents.forEach(r => {
                const safeQuery = String(r).replace(/"/g, '&quot;');
                html += `
                    <div class="search-recent-item" data-query="${safeQuery}">
                        <div class="search-recent-left">
                            <span class="search-recent-icon">
                                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </span>
                            <span class="search-recent-text">${r}</span>
                        </div>
                        <button class="search-recent-remove" data-remove="${safeQuery}" type="button" aria-label="Remove search" title="Remove">&times;</button>
                    </div>
                `;
            });
        }

        html += `
            <div class="search-recent-header">
                <span>Quick Categories</span>
            </div>
            <div class="search-pills-row">
                <button class="search-pill-btn" type="button" data-fill="Aadhaar">🆔 Aadhaar</button>
                <button class="search-pill-btn" type="button" data-fill="PAN">💳 PAN</button>
                <button class="search-pill-btn" type="button" data-fill="Entrance Exams">🎓 Entrance Exams</button>
                <button class="search-pill-btn" type="button" data-fill="Railway">🚆 Railway Jobs</button>
                <button class="search-pill-btn" type="button" data-fill="AI Tools">🤖 80+ AI Tools</button>
                <button class="search-pill-btn" type="button" data-fill="ePaper">📰 ePapers</button>
                <button class="search-pill-btn" type="button" data-fill="Calculator">🧮 Calculators</button>
            </div>
        `;

        dropdown.innerHTML = html;
        dropdown.classList.add('active');
        highlightedIndex = -1;

        // Clear all recent searches
        const clearBtn = document.getElementById('clearRecentSearchesBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                window.VI_SEARCH.clearRecentSearches();
                renderRecentAndQuickSearches();
            });
        }

        // Click recent search to populate input and search
        dropdown.querySelectorAll('.search-recent-item').forEach(el => {
            el.addEventListener('click', (e) => {
                if (e.target.closest('.search-recent-remove')) return;
                const q = el.getAttribute('data-query');
                const searchInput = document.getElementById('searchInput');
                if (searchInput && q) {
                    searchInput.value = q;
                    handleSearchInput();
                }
            });
        });

        // Remove single recent search
        dropdown.querySelectorAll('.search-recent-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const q = btn.getAttribute('data-remove');
                window.VI_SEARCH.removeRecentSearch(q);
                renderRecentAndQuickSearches();
            });
        });

        // Quick category pill click
        dropdown.querySelectorAll('.search-pill-btn').forEach(pill => {
            pill.addEventListener('click', () => {
                const fill = pill.getAttribute('data-fill');
                const searchInput = document.getElementById('searchInput');
                if (searchInput && fill) {
                    searchInput.value = fill;
                    handleSearchInput();
                }
            });
        });
    }

    function handleSearchInput() {
        const searchBox = document.getElementById('searchBox');
        const searchInput = document.getElementById('searchInput');
        const clearBtn = document.getElementById('clearSearchBtn');
        const dropdown = document.getElementById('searchDropdown');
        if (!searchInput) return;

        const val = searchInput.value;
        const trimmed = val.trim();
        if (clearBtn) clearBtn.style.display = trimmed.length > 0 ? 'inline-flex' : 'none';

        // Trigger real-time on-page search/filter on the active page (Govt, Education, AI Tools, Career, News)
        if (typeof window.filterServices === 'function') {
            try { window.filterServices(val); } catch (e) { console.error('filterServices error:', e); }
        }

        if (!dropdown) return;

        if (trimmed.length === 0) {
            renderRecentAndQuickSearches();
            if (searchBox) searchBox.setAttribute('aria-expanded', 'false');
            return;
        }

        const results = window.VI_SEARCH.query(trimmed, 14);
        highlightedIndex = -1;
        searchInput.removeAttribute('aria-activedescendant');

        if (results.length === 0) {
            dropdown.innerHTML = `
                <div class="search-no-results">
                    No matching services found for "<strong>${escapeHtml(trimmed)}</strong>".
                    <div class="search-no-results-hint">Try searching for Aadhaar, PAN, EAMCET, Railway, or AI tools.</div>
                </div>
            `;
            dropdown.classList.add('active');
            if (searchBox) searchBox.setAttribute('aria-expanded', 'true');
            return;
        }

        // Group results by category
        const grouped = {};
        results.forEach(r => {
            const catName = r.cat || 'General';
            if (!grouped[catName]) grouped[catName] = [];
            grouped[catName].push(r);
        });

        let html = '';
        let globalIdx = 0;

        for (const cat in grouped) {
            html += `<div class="search-cat-header">${escapeHtml(cat)}</div>`;
            grouped[cat].forEach(item => {
                const pageUrl = resolvePageUrl(item.page);
                const isCurrent = pageUrl === '';
                const href = isCurrent ? `#${item.target}` : `${pageUrl}?target=${encodeURIComponent(item.target)}`;
                const iconClass = getCatClass(item.cat, item.type);
                const iconText = getCatAbbr(item.cat, item.type);
                const badgeHtml = getBadgeHTML(item);
                const optId = `search-opt-${globalIdx}`;
                const subDesc = item.desc || (item.type === 'category' ? `Explore all ${item.title} services` : item.cat);

                html += `
                    <a href="${href}" class="search-result-item" id="${optId}" role="option" aria-selected="false" data-index="${globalIdx}" data-target="${escapeHtml(item.target)}" data-current="${isCurrent}">
                        <div class="search-res-icon ${iconClass}">${iconText}</div>
                        <div class="search-res-content">
                            <div class="search-res-title">${highlightMatch(item.title, trimmed)}</div>
                            <div class="search-res-sub">${highlightMatch(subDesc, trimmed)}</div>
                        </div>
                        ${badgeHtml}
                    </a>
                `;
                globalIdx++;
            });
        }

        dropdown.innerHTML = html;
        dropdown.classList.add('active');
        if (searchBox) searchBox.setAttribute('aria-expanded', 'true');

        // Attach click interceptors for items on the current page
        dropdown.querySelectorAll('.search-result-item').forEach(el => {
            el.addEventListener('click', function (e) {
                // Record search query in recent searches
                window.VI_SEARCH.addRecentSearch(trimmed);

                const isCur = el.getAttribute('data-current') === 'true';
                const target = el.getAttribute('data-target');
                if (isCur && target) {
                    e.preventDefault();
                    dropdown.classList.remove('active');
                    if (searchBox) searchBox.setAttribute('aria-expanded', 'false');

                    // Dismiss any existing highlight
                    dismissCurrentHighlight();

                    // If target is handled by a page resolver, delegate to it
                    let handled = false;
                    if (typeof window.resolveGovTarget === 'function') { window.resolveGovTarget(target); handled = true; }
                    if (typeof window.resolveEduTarget === 'function') { window.resolveEduTarget(target); handled = true; }
                    if (typeof window.resolveCareerTarget === 'function') { window.resolveCareerTarget(target); handled = true; }
                    if (typeof window.resolveAiTarget === 'function') { window.resolveAiTarget(target); handled = true; }
                    if (typeof window.resolveNewsTarget === 'function') { window.resolveNewsTarget(target); handled = true; }
                    if (typeof window.resolveToolTarget === 'function') { window.resolveToolTarget(target); handled = true; }

                    if (!handled) {
                        const targetEl = document.getElementById(target) || document.querySelector(`[data-id="${target}"]`) || document.querySelector(`[data-target="${target}"]`);
                        if (targetEl) {
                            pulseAndScrollToElement(targetEl);
                        }
                    }
                }
            });
        });
    }

    function handleSearchKeydown(e) {
        const searchBox = document.getElementById('searchBox');
        const searchInput = document.getElementById('searchInput');
        const dropdown = document.getElementById('searchDropdown');
        if (!dropdown || !dropdown.classList.contains('active')) return;

        const items = dropdown.querySelectorAll('.search-result-item');

        if (e.key === 'ArrowDown') {
            if (items.length > 0) {
                e.preventDefault();
                highlightedIndex = (highlightedIndex + 1) % items.length;
                updateSearchHighlight(items, searchInput);
            }
        } else if (e.key === 'ArrowUp') {
            if (items.length > 0) {
                e.preventDefault();
                highlightedIndex = (highlightedIndex - 1 + items.length) % items.length;
                updateSearchHighlight(items, searchInput);
            }
        } else if (e.key === 'Enter') {
            if (searchInput && searchInput.value.trim()) {
                window.VI_SEARCH.addRecentSearch(searchInput.value.trim());
            }
            if (highlightedIndex >= 0 && items[highlightedIndex]) {
                e.preventDefault();
                items[highlightedIndex].click();
            } else if (items.length > 0) {
                e.preventDefault();
                items[0].click();
            }
        } else if (e.key === 'Escape') {
            dropdown.classList.remove('active');
            if (searchBox) searchBox.setAttribute('aria-expanded', 'false');
            if (searchInput) searchInput.removeAttribute('aria-activedescendant');
            highlightedIndex = -1;
        }
    }

    function updateSearchHighlight(items, searchInput) {
        items.forEach((it, idx) => {
            const isHl = idx === highlightedIndex;
            it.classList.toggle('highlighted', isHl);
            it.setAttribute('aria-selected', isHl ? 'true' : 'false');
            if (isHl) {
                it.scrollIntoView({ block: 'nearest' });
                if (searchInput && it.id) {
                    searchInput.setAttribute('aria-activedescendant', it.id);
                }
            }
        });
    }

    // ============================================================
    // 8. SITE SHELL INITIALIZATION
    // ============================================================
    window.renderVISiteShell = function () {
        // Remove duplicate or legacy navbar elements
        document.querySelectorAll('header.navbar-wrapper, header.navbar, .mobile-overlay').forEach(el => el.remove());

        // Inject the unified header at start of body
        document.body.insertAdjacentHTML('afterbegin', getHeaderHTML());

        // Sub-switcher for News page if applicable
        if (getCurrentPage() === 'news') {
            const tickerEl = document.querySelector('.common-ticker');
            if (tickerEl) {
                tickerEl.insertAdjacentHTML('beforebegin', `
                    <nav class="vi-view-switcher" aria-label="News and Articles View Switcher">
                        <button class="nav-pill active" id="pill-newspapers" type="button" onclick="if(typeof switchMainView === 'function') switchMainView('newspapers')">Newspapers &amp; ePapers</button>
                        <button class="nav-pill" id="pill-articles" type="button" onclick="if(typeof switchMainView === 'function') switchMainView('articles')">Published Articles</button>
                    </nav>
                `);
            }
        }

        // Attach Header Events
        const themeBtn = document.getElementById('themeToggleBtn');
        if (themeBtn) themeBtn.addEventListener('click', window.toggleTheme);

        const searchInput = document.getElementById('searchInput');
        const clearBtn = document.getElementById('clearSearchBtn');
        const dropdown = document.getElementById('searchDropdown');

        if (searchInput) {
            searchInput.addEventListener('input', handleSearchInput);
            searchInput.addEventListener('keydown', handleSearchKeydown);
            searchInput.addEventListener('focus', () => {
                if (searchInput.value.trim()) {
                    handleSearchInput();
                } else {
                    renderRecentAndQuickSearches();
                }
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (searchInput) {
                    searchInput.value = '';
                    searchInput.focus();
                }
                clearBtn.style.display = 'none';
                renderRecentAndQuickSearches();
                // Call local page filter if present
                if (typeof window.filterServices === 'function') window.filterServices('');
                if (typeof window.clearSearch === 'function') window.clearSearch();
            });
        }

        // Dismiss dropdown on click outside
        document.addEventListener('click', (e) => {
            const searchBox = document.getElementById('searchBox');
            if (searchBox && !searchBox.contains(e.target)) {
                if (dropdown) dropdown.classList.remove('active');
                searchBox.setAttribute('aria-expanded', 'false');
                if (searchInput) searchInput.removeAttribute('aria-activedescendant');
            }
        });

        // Global keyboard shortcut: Ctrl+K / Cmd+K to focus universal search
        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
                const sInput = document.getElementById('searchInput');
                if (sInput) {
                    e.preventDefault();
                    sInput.focus();
                    sInput.select();
                }
            }
        });

        const menuBtn = document.getElementById('mobileMenuBtn');
        if (menuBtn) menuBtn.addEventListener('click', window.toggleMobileMenu);

        const overlay = document.getElementById('mobileOverlay');
        if (overlay) overlay.addEventListener('click', window.toggleMobileMenu);

        // Synchronize Footer Elements (Year + Back to Top)
        const yearEl = document.getElementById('footerYear');
        if (yearEl) yearEl.textContent = new Date().getFullYear();

        const btt = document.getElementById('backToTop') || document.querySelector('.back-to-top');
        if (btt) {
            window.addEventListener('scroll', () => {
                btt.classList.toggle('visible', window.scrollY > 300);
            }, { passive: true });
            btt.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        syncThemeToggleIcons();
        checkUrlTarget();
    };

    // ============================================================
    // 9. BOOTSTRAP ON LOAD
    // ============================================================
    let savedTheme = null;
    try { savedTheme = localStorage.getItem('vi-theme'); } catch (e) {}
    if (!savedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        savedTheme = 'dark';
    }
    applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.renderVISiteShell();
            if (window.VI_SEARCH && typeof window.VI_SEARCH.autoHarvest === 'function') {
                window.VI_SEARCH.autoHarvest();
            }
            setTimeout(() => {
                if (window.VI_SEARCH && typeof window.VI_SEARCH.autoHarvest === 'function') {
                    window.VI_SEARCH.autoHarvest();
                }
            }, 600);
        });
    } else {
        window.renderVISiteShell();
        if (window.VI_SEARCH && typeof window.VI_SEARCH.autoHarvest === 'function') {
            window.VI_SEARCH.autoHarvest();
        }
        setTimeout(() => {
            if (window.VI_SEARCH && typeof window.VI_SEARCH.autoHarvest === 'function') {
                window.VI_SEARCH.autoHarvest();
            }
        }, 600);
    }

})();