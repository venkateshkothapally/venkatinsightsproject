        const LOGO_AADHAAR = "https://beta.uidai.gov.in/assets/logo/logoWithTitle.svg";
        const LOGO_AADHAARMINI = "../logos/governmentservices/aadhaar.png";

        const LOGO_PAN = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvkOedxd7c_V9fuxP5WPO2ynKqGbVUXo0x2-DXw5cqWQ&s=10";
        const LOGO_PASSPORT = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVayndY8uhgCddy2rMm45PorGT6PxzFR6XJtnYsncKuBTnu3RGXejJAGF4&s=10";
        const LOGO_TELANGANA = "https://upload.wikimedia.org/wikipedia/commons/3/30/Emblem_of_Telangana.svg";
        const LOGO_HEALTH = "https://esanjeevani.mohfw.gov.in/assets/images/logo.png";
        const LOGO_ELECTRICITY = "https://tgsouthernpower.org/assets/images/logo.png";

        const categoriesData = [
            {
                id: 'all',
                title: 'All Services',
                categoryLogo: null,
                icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`
            },
            {
                id: 'aadhaar',
                title: 'Aadhaar Services',
                categoryLogo: LOGO_AADHAAR,
                icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h2a2 2 0 012 2v1m-4 0h4"></path></svg>`,
                services: [
                    { name: 'UIDAI', desc: 'Official Aadhaar portal', url: 'https://uidai.gov.in', logo: LOGO_AADHAARMINI },
                    { name: 'My Aadhaar', desc: 'Aadhaar online services', url: 'https://myaadhaar.uidai.gov.in', logo: LOGO_AADHAARMINI },
                    { name: 'Download Aadhaar', desc: 'Get your e-Aadhaar', url: 'https://myaadhaar.uidai.gov.in/genricDownloadAadhaar', logo: LOGO_AADHAARMINI },
                    { name: 'Check Aadhaar Status', desc: 'Track application status', url: 'https://myaadhaar.uidai.gov.in/CheckAadhaarStatus', logo: LOGO_AADHAARMINI },
                    { name: 'Lock/Unlock Aadhaar', desc: 'Secure your Aadhaar', url: 'https://myaadhaar.uidai.gov.in/lock-unlock-aadhaar', logo: LOGO_AADHAARMINI },
                    { name: 'Enrolment Forms', desc: 'Download forms', url: 'https://uidai.gov.in/enrolment-and-updates.html', logo: LOGO_AADHAARMINI },
                    { name: 'Aadhaar Update', desc: 'Download or Order Card', url: 'https://www.uidai.gov.in/my-aadhaar', logo: LOGO_AADHAARMINI }    
                ]
            },
            {
                id: 'pan',
                title: 'PAN Services',
                categoryLogo: LOGO_PAN,
                icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>`,
                services: [
                    { name: 'PAN Apply', desc: 'Apply for new PAN card', url: 'https://onlineservices.proteantech.in/paam/endUserRegisterContact.html', logo: LOGO_PAN },
                    { name: 'Download e-PAN', desc: 'Get electronic PAN', url: 'https://onlineservices.proteantech.in/paam/requestAndDownloadEPAN.html', logo: LOGO_PAN },
                    { name: 'Reprint PAN Card', desc: 'Reprint your PAN', url: 'https://onlineservices.proteantech.in/paam/ReprintEPan.html', logo: LOGO_PAN },
                    { name: 'PAN Status', desc: 'Track PAN application', url: 'https://tin.tin.proteantech.in/pantan/StatusTrack.html', logo: LOGO_PAN }
                ]
            },
            {
                id: 'passport',
                title: 'Passport Services',
                categoryLogo: LOGO_PASSPORT,
                icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>`,
                services: [
                    { name: 'Passport Seva', desc: 'Official passport portal', url: 'https://www.passportindia.gov.in', logo: LOGO_PASSPORT },
                    { name: 'Passport Application', desc: 'Apply for passport', url: 'https://www.passportindia.gov.in', logo: LOGO_PASSPORT },
                    { name: 'Tatkaal Passport', desc: 'Fast-track passport', url: 'https://www.passportindia.gov.in', logo: LOGO_PASSPORT },
                    { name: 'Police Clearance Certificate', desc: 'PCC application', url: 'https://www.passportindia.gov.in', logo: LOGO_PASSPORT },
                    { name: 'Track Application', desc: 'Track passport status', url: 'https://www.passportindia.gov.in', logo: LOGO_PASSPORT },
                    { name: 'Book Appointment', desc: 'Schedule passport appointment', url: 'https://www.passportindia.gov.in', logo: LOGO_PASSPORT }
                ]
            },
            {
                id: 'food',
                title: 'Food & Civil Supplies',
                categoryLogo: LOGO_TELANGANA,
                icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>`,
                services: [
                    { name: 'Ration Card Download', desc: 'Download food security card', url: 'https://epds.telangana.gov.in', logo: LOGO_TELANGANA },
                    { name: 'Food Security Card Search', desc: 'Search FSC details', url: 'https://epds.telangana.gov.in', logo: LOGO_TELANGANA },
                    { name: 'National Food Security Portal', desc: 'NFSA portal', url: 'https://nfsa.gov.in', logo: LOGO_TELANGANA },
                    { name: 'Mera Ration App', desc: 'One Nation One Ration Card', url: 'https://play.google.com/store/apps/details?id=com.fsc.app.tg_nic_fsc', logo: LOGO_TELANGANA },
                    { name: 'Download FSC Card', desc: 'Food Security Card', url: 'https://epds.telangana.gov.in', logo: LOGO_TELANGANA }
                ]
            },
            {
                id: 'transport',
                title: 'Telangana Transport Services',
                categoryLogo: LOGO_TELANGANA,
                icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 17h8M8 17a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 104 0 2 2 0 00-4 0zM3 9l2-4h14l2 4M3 9h18v6H3V9z"></path></svg>`,
                services: [
                    { name: 'Driving Licence', desc: 'DL search & info', url: 'https://transport.telangana.gov.in', logo: LOGO_TELANGANA },
                    { name: 'Learner Licence Slot Booking', desc: 'Book LL test slot', url: 'https://transport.telangana.gov.in', logo: LOGO_TELANGANA },
                    { name: 'DL Slot Booking', desc: 'Book driving test', url: 'https://transport.telangana.gov.in', logo: LOGO_TELANGANA }
                ]
            },
            {
                id: 'health',
                title: 'Health Services',
                categoryLogo: LOGO_HEALTH,
                icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>`,
                services: [
                    { name: 'eSanjeevani OPD', desc: 'National Teleconsultation', url: 'https://esanjeevani.mohfw.gov.in', logo: LOGO_HEALTH },
                    { name: 'Arogyasri Portal', desc: 'Health scheme services', url: 'https://aarogyasri.telangana.gov.in', logo: LOGO_TELANGANA }
                ]
            },
            {
                id: 'agri',
                title: 'Agriculture & Land Services',
                categoryLogo: LOGO_TELANGANA,
                icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v18m0-18C9 3 5 5 5 9c0 4 4 6 7 6m0-15c3 0 7 2 7 6 0 4-4 6-7 6m0 0c-3 0-7 2-7 6 0 2 2 3 4 3m3-9c3 0 7 2 7 6 0 2-2 3-4 3"></path></svg>`,
                services: [
                    { name: 'Bhu Bharati', desc: 'Land records portal', url: 'https://bhubharati.telangana.gov.in', logo: LOGO_TELANGANA },
                    { name: 'IGRS Telangana', desc: 'Registration and stamps', url: 'https://registration.telangana.gov.in', logo: LOGO_TELANGANA }
                ]
            },
            {
                id: 'utility',
                title: 'Utility Services',
                categoryLogo: LOGO_ELECTRICITY,
                icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>`,
                services: [
                    { name: 'TGSPDCL Electricity', desc: 'Southern power bills', url: 'https://tgsouthernpower.org', logo: LOGO_ELECTRICITY },
                    { name: 'TGNPDCL Electricity', desc: 'Northern power bills', url: 'https://tgnpdcl.com', logo: LOGO_ELECTRICITY }
                ]
            },
            {
                id: 'gas',
                title: 'Gas Booking Services',
                categoryLogo: 'https://cx.indianoil.in/assets/images/logo.png',
                icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path></svg>`,
                services: [
                    { name: 'Indane Gas', desc: 'LPG cylinder booking', url: 'https://cx.indianoil.in', logo: 'https://cx.indianoil.in/assets/images/logo.png' },
                    { name: 'HP Gas', desc: 'Refill booking & services', url: 'https://myhpgas.in', logo: 'https://myhpgas.in/HPGas/Images/logo.png' }
                ]
            },
            {
                id: 'quick_gov',
                title: 'Quick Government Portals',
                categoryLogo: LOGO_TELANGANA,
                icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>`,
                services: [
                    { name: 'MeeSeva Telangana', desc: 'Citizen service portal', url: 'https://tg.meeseva.telangana.gov.in', logo: LOGO_TELANGANA },
                    { name: 'Telangana e-Challan', desc: 'Traffic challan payment', url: 'https://echallan.tspolice.gov.in', logo: LOGO_TELANGANA }
                ]
            }
        ];

        let activeCategoryId = 'all';

        function renderSidebar() {
            const sidebarMenu = document.getElementById('sidebarMenu');
            sidebarMenu.innerHTML = '';

            categoriesData.forEach(cat => {
                const btn = document.createElement('button');
                btn.className = `menu-item ${cat.id === activeCategoryId ? 'active' : ''}`;
                btn.onclick = () => selectCategory(cat.id);
                btn.innerHTML = `
                    ${cat.icon}
                    <span>${cat.title}</span>
                `;
                sidebarMenu.appendChild(btn);
            });
        }

        function getAllServices() {
            let list = [];
            categoriesData.forEach(cat => {
                if (cat.services) {
                    list = list.concat(cat.services);
                }
            });
            return list;
        }

        function renderServices(searchQuery = '') {
            const grid = document.getElementById('servicesGrid');
            const titleElem = document.getElementById('categoryTitle');
            const subtitleElem = document.getElementById('categorySubtitle');
            const headerIconBox = document.getElementById('headerIconBox');
            const clearBtn = document.getElementById('clearSearchBtn');

            if (!grid) return;
            grid.innerHTML = '';

            const searchInput = document.getElementById('searchInput');
            const raw = typeof searchQuery === 'string' ? searchQuery : (searchInput ? searchInput.value : '');
            const trimmedQuery = (raw || '').trim().toLowerCase();
            const allServicesList = getAllServices();
            const totalCategoriesCount = categoriesData.length - 1;

            let listToDisplay = [];

            if (clearBtn) {
                clearBtn.style.display = trimmedQuery !== '' ? 'flex' : 'none';
            }

            if (trimmedQuery !== '') {
                listToDisplay = allServicesList.filter(s => 
                    s.name.toLowerCase().includes(trimmedQuery) || 
                    s.desc.toLowerCase().includes(trimmedQuery)
                );

                if (titleElem) titleElem.innerText = `Search Results for "${raw.trim()}"`;
                if (subtitleElem) subtitleElem.innerText = `Found ${listToDisplay.length} service${listToDisplay.length === 1 ? '' : 's'} across all categories`;
                
                if (headerIconBox) {
                    headerIconBox.className = 'header-icon-box has-svg';
                    headerIconBox.innerHTML = `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>`;
                }
            } else {
                if (activeCategoryId === 'all') {
                    listToDisplay = allServicesList;
                    if (titleElem) titleElem.innerText = 'All Government Services';
                    if (subtitleElem) subtitleElem.innerText = `${allServicesList.length} verified services available across ${totalCategoriesCount} categories`;
                    if (headerIconBox) {
                        headerIconBox.className = 'header-icon-box has-svg';
                        headerIconBox.innerHTML = `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`;
                    }
                } else {
                    const cat = categoriesData.find(c => c.id === activeCategoryId);
                    listToDisplay = cat ? (cat.services || []) : [];
                    if (titleElem) titleElem.innerText = cat ? cat.title : 'Services';
                    if (subtitleElem) subtitleElem.innerText = `${listToDisplay.length} resources available in this category`;
                    
                    if (headerIconBox) {
                        if (cat && cat.categoryLogo) {
                            headerIconBox.className = 'header-icon-box';
                            headerIconBox.innerHTML = `<img src="${cat.categoryLogo}" alt="${cat.title}">`;
                        } else if (cat) {
                            headerIconBox.className = 'header-icon-box has-svg';
                            headerIconBox.innerHTML = cat.icon;
                        }
                    }
                }
            }

            if (listToDisplay.length === 0) {
                grid.innerHTML = `
                    <div class="empty-state">
                        <h3>No matching services found</h3>
                        <p>Try searching for a different keyword or browse categories from the sidebar.</p>
                    </div>
                `;
                return;
            }

            listToDisplay.forEach(item => {
                const card = document.createElement('a');
                card.className = 'service-card';
                card.href = item.url;
                card.target = '_blank';
                card.rel = 'noopener noreferrer';
                const slug = (item.id || item.name).toLowerCase().replace(/[^a-z0-9]+/g, '-');
                card.id = `svc-gov-${slug}`;
                card.setAttribute('data-target', `svc-gov-${slug}`);

                card.innerHTML = `
                    <div class="card-top">
                        <div class="card-header-left">
                            <img class="card-logo" src="${item.logo}" alt="${item.name}" onerror="this.style.display='none'">
                            <span class="card-title">${item.name}</span>
                        </div>
                        <svg class="external-link-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                    </div>
                    <div class="card-desc">${item.desc}</div>
                `;
                grid.appendChild(card);
            });
        }

        function selectCategory(catId) {
            activeCategoryId = catId;
            const searchEl = document.getElementById('searchInput');
            if (searchEl) searchEl.value = '';
            renderSidebar();
            renderServices();
        }
        window.selectCategory = selectCategory;

        function filterServices(query) {
            const searchEl = document.getElementById('searchInput');
            const q = typeof query === 'string' ? query : (searchEl ? searchEl.value : '');
            renderServices(q);
        }
        window.filterServices = filterServices;

        function clearSearch() {
            const searchEl = document.getElementById('searchInput');
            if (searchEl) searchEl.value = '';
            renderServices('');
        }
        window.clearSearch = clearSearch;
        window.clearSearch = clearSearch;

        // Auto-register government services into Universal Search
        function registerGovServicesWithSearch() {
            if (!window.VI_SEARCH || !Array.isArray(categoriesData)) return;
            const govItems = [];
            categoriesData.forEach(cat => {
                if (Array.isArray(cat.services)) {
                    cat.services.forEach(s => {
                        const slug = (s.id || s.name).toLowerCase().replace(/[^a-z0-9]+/g, '-');
                        govItems.push({
                            id: `svc-gov-${slug}`,
                            title: `${s.name} - ${cat.title}`,
                            cat: 'Government Services',
                            page: 'governmentservices/governmentservices.html',
                            target: `svc-gov-${slug}`,
                            desc: s.desc
                        });
                    });
                }
            });
            window.VI_SEARCH.register(govItems);
        }

        // Deep-link target resolution: If loaded with ?target=... or #...
        function resolveGovTarget() {
            const params = new URLSearchParams(window.location.search);
            const target = params.get('target') || (window.location.hash ? window.location.hash.replace('#', '') : '');
            if (!target) return;

            // Find matching service across categories
            for (const cat of categoriesData) {
                if (cat.services) {
                    const match = cat.services.find(s => {
                        const slug = `svc-gov-${(s.id || s.name).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                        return slug === target || target.includes(s.name.toLowerCase());
                    });
                    if (match) {
                        activeCategoryId = cat.id;
                        renderSidebar();
                        renderServices();
                        setTimeout(() => {
                            const el = document.getElementById(target) || document.querySelector(`[data-target="${target}"]`);
                            if (el && typeof window.pulseAndScrollToElement === 'function') {
                                window.pulseAndScrollToElement(el);
                            }
                        }, 250);
                        break;
                    }
                }
            }
        }

        renderSidebar();
        renderServices();
        registerGovServicesWithSearch();
        setTimeout(resolveGovTarget, 200);
    