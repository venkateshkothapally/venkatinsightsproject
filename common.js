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
        // --- Government Services ---
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
        { id: 'svc-news-times', title: 'The Times of India Daily ePaper', cat: 'News & Articles', page: 'Newsandarticles/newsandarticles.html', target: 'svc-news-the-times-of-india', desc: 'India\'s leading English daily newspaper' }
    ];

    window.VI_SEARCH = {
        index: (typeof window.VI_MASTER_SEARCH_INDEX !== 'undefined' && Array.isArray(window.VI_MASTER_SEARCH_INDEX)) 
            ? [...window.VI_MASTER_SEARCH_INDEX] 
            : [...DEFAULT_SEARCH_INDEX],
        register: function (items) {
            if (!Array.isArray(items)) return;
            items.forEach(it => {
                if (!this.index.some(x => x.id === it.id)) {
                    this.index.push(it);
                }
            });
        },
        query: function (q, maxResults = 12) {
            if (!q || !q.trim()) return [];
            const term = q.toLowerCase().trim();
            const words = term.split(/\s+/);

            return this.index
                .map(item => {
                    const text = `${item.title} ${item.cat} ${item.desc || ''}`.toLowerCase();
                    let score = 0;
                    if (item.title.toLowerCase().startsWith(term)) score += 100;
                    else if (item.title.toLowerCase().includes(term)) score += 50;
                    
                    let allWordsMatch = true;
                    for (const w of words) {
                        if (text.includes(w)) score += 10;
                        else allWordsMatch = false;
                    }
                    return { item, score: allWordsMatch ? score : 0 };
                })
                .filter(res => res.score > 0)
                .sort((a, b) => b.score - a.score)
                .slice(0, maxResults)
                .map(res => res.item);
        }
    };

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
        const inSub = isInSubfolder();
        const currentPath = window.location.pathname.replace(/\\/g, '/').toLowerCase();

        // Check if user is already on that exact page
        const isCurrentPage = currentPath.includes(pagePath.toLowerCase().replace('../', ''));
        if (isCurrentPage) return '';

        return inSub ? `../${pagePath}` : `./${pagePath}`;
    }

    function getCatClass(cat) {
        const c = String(cat).toLowerCase();
        if (c.includes('gov')) return 'gov';
        if (c.includes('edu')) return 'edu';
        if (c.includes('career') || c.includes('job')) return 'career';
        if (c.includes('ai')) return 'ai';
        return 'news';
    }

    function getCatAbbr(cat) {
        const c = String(cat).toLowerCase();
        if (c.includes('gov')) return 'GOV';
        if (c.includes('edu')) return 'EDU';
        if (c.includes('career') || c.includes('job')) return 'JOB';
        if (c.includes('ai')) return 'AI';
        return 'NEWS';
    }

    function highlightMatch(text, query) {
        if (!query) return text;
        const qEscaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${qEscaped})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
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

        return `
            <div class="mobile-overlay" id="mobileOverlay"></div>
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
                    
                    <div class="nav-search-box" id="searchBox">
                        <svg class="search-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <input type="text" id="searchInput" placeholder="Search services, jobs, exams, AI tools..." autocomplete="off" aria-label="Search all services">
                        <button class="clear-btn" id="clearSearchBtn" type="button" aria-label="Clear Search">&times;</button>
                        <div class="search-dropdown" id="searchDropdown" role="listbox"></div>
                    </div>
                    
                    <div class="navbar-actions">
                        <button class="icon-btn theme-btn" id="themeToggleBtn" type="button" aria-label="Toggle dark/light theme" title="Toggle theme">
                            <svg class="icon-moon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                            <svg class="icon-sun" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="display:none;"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                        </button>
                        <button class="icon-btn mobile-menu-btn" id="mobileMenuBtn" type="button" aria-label="Toggle navigation menu" title="Menu">
                            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </button>
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
    // 6. TARGET AUTO-SCROLL & PULSE HIGHLIGHT HANDLER
    // ============================================================
    function pulseAndScrollToElement(el) {
        if (!el) return;
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

        // Trigger pulse highlight
        el.classList.remove('vi-highlight-pulse');
        // Force reflow
        void el.offsetWidth;
        el.classList.add('vi-highlight-pulse');

        setTimeout(() => {
            el.classList.remove('vi-highlight-pulse');
        }, 3200);
    }

    window.pulseAndScrollToElement = pulseAndScrollToElement;

    // Check query params for deep-link targets (e.g. ?target=svc-gov-aadhaar or #svc-gov-aadhaar)
    function checkUrlTarget() {
        const params = new URLSearchParams(window.location.search);
        const targetId = params.get('target') || (window.location.hash ? window.location.hash.replace('#', '') : null);
        const searchVal = params.get('search') || params.get('q');

        if (searchVal) {
            const input = document.getElementById('searchInput');
            if (input) {
                input.value = searchVal;
                const clearBtn = document.getElementById('clearSearchBtn');
                if (clearBtn) clearBtn.style.display = 'inline-flex';
            }
        }

        if (!targetId) return;

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

    function handleSearchInput() {
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
            dropdown.classList.remove('active');
            dropdown.innerHTML = '';
            highlightedIndex = -1;
            return;
        }

        const results = window.VI_SEARCH.query(trimmed, 12);
        highlightedIndex = -1;

        if (results.length === 0) {
            dropdown.innerHTML = `
                <div class="search-no-results">
                    No matching services found for "<strong>${trimmed.replace(/[<>&"]/g, '')}</strong>".<br>
                    <small style="color: var(--vi-text-muted, #64748b); margin-top: 4px; display: inline-block;">Try searching for Aadhaar, PAN, EAMCET, Railway, or AI tools.</small>
                </div>
            `;
            dropdown.classList.add('active');
            return;
        }

        // Group results by category
        const grouped = {};
        results.forEach(r => {
            if (!grouped[r.cat]) grouped[r.cat] = [];
            grouped[r.cat].push(r);
        });

        let html = '';
        let globalIdx = 0;

        for (const cat in grouped) {
            html += `<div class="search-cat-header">${cat}</div>`;
            grouped[cat].forEach(item => {
                const pageUrl = resolvePageUrl(item.page);
                const isCurrent = pageUrl === '';
                const href = isCurrent ? `#${item.target}` : `${pageUrl}?target=${item.target}&search=${encodeURIComponent(trimmed)}`;
                const iconClass = getCatClass(item.cat);
                const iconText = getCatAbbr(item.cat);

                html += `
                    <a href="${href}" class="search-result-item" data-index="${globalIdx}" data-target="${item.target}" data-current="${isCurrent}">
                        <div class="search-res-icon ${iconClass}">${iconText}</div>
                        <div class="search-res-content">
                            <div class="search-res-title">${highlightMatch(item.title, trimmed)}</div>
                            <div class="search-res-sub">${item.desc ? highlightMatch(item.desc, trimmed) : item.cat}</div>
                        </div>
                        <span class="search-badge-tag">${item.cat}</span>
                    </a>
                `;
                globalIdx++;
            });
        }

        dropdown.innerHTML = html;
        dropdown.classList.add('active');

        // Attach click interceptors for items on the current page
        dropdown.querySelectorAll('.search-result-item').forEach(el => {
            el.addEventListener('click', function (e) {
                const isCur = el.getAttribute('data-current') === 'true';
                const target = el.getAttribute('data-target');
                if (isCur && target) {
                    e.preventDefault();
                    dropdown.classList.remove('active');

                    // If target is in another category, switch tab first
                    if (typeof window.resolveGovTarget === 'function') window.resolveGovTarget(target);
                    if (typeof window.resolveEduTarget === 'function') window.resolveEduTarget(target);
                    if (typeof window.resolveCareerTarget === 'function') window.resolveCareerTarget(target);
                    if (typeof window.resolveAiTarget === 'function') window.resolveAiTarget(target);

                    const targetEl = document.getElementById(target) || document.querySelector(`[data-id="${target}"]`) || document.querySelector(`[data-target="${target}"]`);
                    if (targetEl) {
                        pulseAndScrollToElement(targetEl);
                    }
                }
            });
        });
    }

    function handleSearchKeydown(e) {
        const dropdown = document.getElementById('searchDropdown');
        if (!dropdown || !dropdown.classList.contains('active')) return;

        const items = dropdown.querySelectorAll('.search-result-item');
        if (items.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            highlightedIndex = (highlightedIndex + 1) % items.length;
            updateSearchHighlight(items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            highlightedIndex = (highlightedIndex - 1 + items.length) % items.length;
            updateSearchHighlight(items);
        } else if (e.key === 'Enter') {
            if (highlightedIndex >= 0 && items[highlightedIndex]) {
                e.preventDefault();
                items[highlightedIndex].click();
            }
        } else if (e.key === 'Escape') {
            dropdown.classList.remove('active');
            highlightedIndex = -1;
        }
    }

    function updateSearchHighlight(items) {
        items.forEach((it, idx) => {
            it.classList.toggle('highlighted', idx === highlightedIndex);
            if (idx === highlightedIndex) it.scrollIntoView({ block: 'nearest' });
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
                if (searchInput.value.trim()) handleSearchInput();
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (searchInput) {
                    searchInput.value = '';
                    searchInput.focus();
                }
                clearBtn.style.display = 'none';
                if (dropdown) {
                    dropdown.classList.remove('active');
                    dropdown.innerHTML = '';
                }
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
        });
    } else {
        window.renderVISiteShell();
    }

})();