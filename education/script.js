/* ============================================================
   Education & Exams Portal — Vanilla JS
   Renders data from data.js (window.EDUCATION_SERVICES)
   ============================================================ */

(function () {
  'use strict';

  // ----- Lucide helper -----
  function renderIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  // ----- Data -----
  const SERVICES = window.EDUCATION_SERVICES || [];
  const CATEGORY_META = window.CATEGORY_META || {};

  // ----- State -----
  const state = {
    query: '',
    activeCategory: 'All',
  };

  // ----- Date helpers -----
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  function parseDate(iso) {
    if (!iso) return null;
    const d = new Date(iso + 'T00:00:00');
    return isNaN(d.getTime()) ? null : d;
  }

  function fmtDate(iso) {
    const d = parseDate(iso);
    if (!d) return '—';
    return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  }

  function fmtRelative(iso) {
    const d = parseDate(iso);
    if (!d) return '';
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const diff = Math.round((now - d) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'today';
    if (diff === 1) return 'yesterday';
    if (diff < 7 && diff > 0) return `${diff} days ago`;
    if (diff < 30 && diff > 0) return `${Math.floor(diff / 7)} week${Math.floor(diff/7) !== 1 ? 's' : ''} ago`;
    if (diff > 0) return `${Math.floor(diff / 30)} month${Math.floor(diff/30) !== 1 ? 's' : ''} ago`;
    if (diff === -1) return 'tomorrow';
    if (diff > -7) return `in ${-diff} days`;
    if (diff > -30) return `in ${Math.floor(-diff / 7)} week${Math.floor(-diff/7) !== 1 ? 's' : ''}`;
    return `in ${Math.floor(-diff / 30)} month${Math.floor(-diff/30) !== 1 ? 's' : ''}`;
  }

  function getStatus(service) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = parseDate(service.applicationStartDate);
    const end = parseDate(service.applicationLastDate);
    if (start && today < start) return 'upcoming';
    if (end && today > end) return 'closed';
    return 'open';
  }

  function statusLabel(s) {
    return s === 'open' ? 'Open Now' : s === 'upcoming' ? 'Upcoming' : 'Closed';
  }

  // ----- Category meta helper -----
  function getMeta(cat) {
    return CATEGORY_META[cat] || CATEGORY_META['Other'] || { icon: 'layout-grid', color: '#10b981', soft: '#d1fae5' };
  }

  // ----- Build category list -----
  function buildCategories() {
    const counts = new Map();
    for (const s of SERVICES) {
      counts.set(s.category, (counts.get(s.category) || 0) + 1);
    }
    const list = Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
    return list;
  }

  function renderCategoryList() {
    const container = document.getElementById('category-list');
    const cats = buildCategories();
    const totalCount = SERVICES.length;

    const items = [
      {
        name: 'All',
        count: totalCount,
        icon: 'layout-grid',
        color: '#10b981',
        soft: '#d1fae5',
      },
      ...cats.map((c) => ({ ...c, ...getMeta(c.name) })),
    ];

    container.innerHTML = items.map((c) => `
      <div class="cat-item ${state.activeCategory === c.name ? 'active' : ''}"
           data-cat="${escapeAttr(c.name)}"
           style="--cat-color: ${c.color}; --cat-soft: ${c.soft};">
        <div class="cat-icon"><i data-lucide="${c.icon}"></i></div>
        <span class="cat-name" title="${escapeAttr(c.name)}">${escapeHtml(c.name)}</span>
        <span class="cat-count">${c.count}</span>
      </div>
    `).join('');

    container.querySelectorAll('.cat-item').forEach((el) => {
      el.addEventListener('click', () => {
        state.activeCategory = el.dataset.cat;
        renderCategoryList();
        renderServices();
        renderLatest();
        // close sidebar on mobile after pick
        if (window.innerWidth <= 880) closeSidebar();
      });
    });
    renderIcons();
  }

  // ----- Filter services -----
  function filterServices() {
    const q = state.query.trim().toLowerCase();
    return SERVICES.filter((s) => {
      if (q) {
        return (
          s.serviceName.toLowerCase().includes(q) ||
          (s.subCategory || '').toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          (s.shortDescription || '').toLowerCase().includes(q)
        );
      }
      if (state.activeCategory !== 'All' && s.category !== state.activeCategory) return false;
      return true;
    });
  }

  // ----- Render service groups -----
  function renderServices() {
    const groupsContainer = document.getElementById('service-groups');
    const emptyState = document.getElementById('empty-state');
    const titleEl = document.getElementById('results-title');
    const subEl = document.getElementById('results-sub');
    const countEl = document.getElementById('result-count');
    const resetBtn = document.getElementById('reset-filters');

    const filtered = filterServices();
    countEl.textContent = filtered.length;

    const hasFilters = state.query.trim() !== '' || state.activeCategory !== 'All';
    resetBtn.hidden = !hasFilters;

    if (hasFilters) {
      titleEl.textContent = state.query.trim()
        ? 'Matching services'
        : state.activeCategory;
      let sub = `Showing ${filtered.length} of ${SERVICES.length} services`;
      if (state.activeCategory !== 'All') sub += ` in ${state.activeCategory}`;
      if (state.query.trim()) sub += ` matching "${state.query.trim()}"`;
      subEl.textContent = sub;
    } else {
      titleEl.textContent = 'All Services';
      const catCount = new Set(SERVICES.map(s => s.category)).size;
      subEl.textContent = `Showing all ${SERVICES.length} services across ${catCount} categories`;
    }

    if (filtered.length === 0) {
      groupsContainer.innerHTML = '';
      emptyState.hidden = false;
      return;
    }
    emptyState.hidden = true;

    // Group by category, preserve category sort order from sidebar
    const catOrder = buildCategories().map(c => c.name);
    const groups = new Map();
    for (const s of filtered) {
      if (!groups.has(s.category)) groups.set(s.category, []);
      groups.get(s.category).push(s);
    }
    const sortedGroups = catOrder
      .filter(name => groups.has(name))
      .map(name => ({ category: name, items: groups.get(name) }));

    groupsContainer.innerHTML = sortedGroups.map(({ category, items }) => {
      const meta = getMeta(category);
      return `
        <div class="service-group" id="group-${slugify(category)}">
          <div class="group-header" style="--cat-color: ${meta.color}; --cat-soft: ${meta.soft};">
            <div class="group-icon"><i data-lucide="${meta.icon}"></i></div>
            <div>
              <div class="group-title">${escapeHtml(category)}</div>
              <div class="group-sub">${items.length} service${items.length !== 1 ? 's' : ''} available</div>
            </div>
          </div>
          <div class="cards-grid">
            ${items.map(cardHtml).join('')}
          </div>
        </div>
      `;
    }).join('');

    // Attach click handlers
    groupsContainer.querySelectorAll('.service-card').forEach((el) => {
      el.addEventListener('click', () => {
        const id = parseInt(el.dataset.id, 10);
        const svc = SERVICES.find(s => s.id === id);
        if (svc) openModal(svc);
      });
    });

    renderIcons();
  }

  // ----- Service card markup -----
  function cardHtml(s) {
    const meta = getMeta(s.category);
    const status = getStatus(s);
    return `
      <article class="service-card" id="svc-edu-${s.id}" data-id="${s.id}" data-target="svc-edu-${s.id}"
               style="--cat-color: ${meta.color}; --cat-soft: ${meta.soft};">
        <div class="card-top">
          <img class="card-logo" src="${s.logo}" alt="${escapeAttr(s.serviceName)} logo" loading="lazy" />
          <div class="card-top-right">
            <span class="card-cat-badge" title="${escapeAttr(s.category)}">${escapeHtml(s.category)}</span>
            <h3 class="card-title">${escapeHtml(s.serviceName)}</h3>
          </div>
        </div>
        <p class="card-desc">${escapeHtml(s.shortDescription || '')}</p>
        <div class="card-dates">
          <div class="card-date-row">
            <i data-lucide="calendar-plus"></i>
            <span class="lbl">Posted:</span>
            <span class="val">${fmtDate(s.postDate)}</span>
          </div>
          <div class="card-date-row">
            <i data-lucide="calendar-days"></i>
            <span class="lbl">Apply:</span>
            <span class="val">${fmtDate(s.applicationStartDate)}</span>
          </div>
          <div class="card-date-row">
            <i data-lucide="calendar-x"></i>
            <span class="lbl">Last date:</span>
            <span class="val">${fmtDate(s.applicationLastDate)}</span>
          </div>
        </div>
        <div class="card-foot">
          <span class="status-badge ${status}">
            <span class="status-dot"></span>
            ${statusLabel(status)}
          </span>
          <span class="view-btn">View details <i data-lucide="arrow-right"></i></span>
        </div>
      </article>
    `;
  }

  // ----- Latest updates strip -----
  function renderLatest() {
    const track = document.getElementById('latest-track');
    if (!track) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Dynamic filtering based on postDate and applicationLastDate:
    // Only display services whose application last date has not expired (today <= lastDate).
    // Once last date has passed, automatically hide it!
    const isCatActive = state.activeCategory && state.activeCategory !== 'All';
    let candidates = SERVICES.filter(s => {
      if (isCatActive && s.category !== state.activeCategory) return false;
      const end = parseDate(s.applicationLastDate);
      if (end && today > end) return false; // Hide expired services!
      return getStatus(s) !== 'closed';
    });

    // If specific category has no currently open announcements, show latest open across all categories
    if (candidates.length === 0 && isCatActive) {
      candidates = SERVICES.filter(s => {
        const end = parseDate(s.applicationLastDate);
        if (end && today > end) return false;
        return getStatus(s) !== 'closed';
      });
    }

    // Sort by postDate desc (latest added first)
    const sorted = [...candidates].sort((a, b) => (b.postDate || '').localeCompare(a.postDate || ''));
    const top = sorted.slice(0, 12);

    if (top.length === 0) {
      track.innerHTML = `
        <div style="padding: 18px; color: var(--text-muted); font-size: 14px;">
          No active admission or entrance alerts currently open in this category.
        </div>
      `;
      return;
    }

    track.innerHTML = top.map((s) => {
      const meta = getMeta(s.category);
      const status = getStatus(s);
      return `
        <article class="latest-card" data-id="${s.id}"
                 style="--cat-color: ${meta.color}; --cat-soft: ${meta.soft};">
          <div class="latest-card-top">
            <img class="latest-card-logo" src="${s.logo}" alt="" loading="lazy" />
            <span class="latest-cat-badge" title="${escapeAttr(s.category)}">${escapeHtml(s.category)}</span>
          </div>
          <h3 class="latest-card-title">${escapeHtml(s.serviceName)}</h3>
          <div class="latest-card-dates">
            <div class="row">
              <i data-lucide="calendar-plus"></i>
              <span class="label">Posted:</span>
              <span>${fmtDate(s.postDate)}</span>
              <span style="color: var(--text-soft)">(${fmtRelative(s.postDate)})</span>
            </div>
            <div class="row">
              <i data-lucide="calendar-x"></i>
              <span class="label">Last date:</span>
              <span style="font-weight: 700; color: ${status === 'open' ? 'var(--primary-dark)' : 'inherit'}">${fmtDate(s.applicationLastDate)}</span>
            </div>
          </div>
          <div class="latest-status ${status}">
            <span class="latest-status-dot"></span>
            ${statusLabel(status)}
          </div>
        </article>
      `;
    }).join('');

    track.querySelectorAll('.latest-card').forEach((el) => {
      el.addEventListener('click', () => {
        const id = parseInt(el.dataset.id, 10);
        const svc = SERVICES.find(s => s.id === id);
        if (svc) openModal(svc);
      });
    });
    renderIcons();
  }

  // ----- Modal -----
  const ACTION_META = {
    notification:  { label: 'Notification', icon: 'bell',        sub: 'Official notice' },
    officialSite:  { label: 'Official Site', icon: 'globe',       sub: 'Visit portal' },
    webOptions:    { label: 'Web Options', icon: 'list-checks', sub: 'Counselling' },
    results:       { label: 'Results',     icon: 'award',        sub: 'Check scores' },
    rankCard:      { label: 'Rank Card',   icon: 'badge-check',  sub: 'Download' },
    hallTicket:    { label: 'Hall Ticket', icon: 'ticket',       sub: 'Admit card' },
    previousYearPapers: { label: 'Previous Papers', icon: 'file-text', sub: 'Past exams' },
    syllabus:      { label: 'Syllabus',    icon: 'book',         sub: 'Study material' },
    apply:         { label: 'Apply Now',   icon: 'edit-3',       sub: 'Submit application' },
    collegeslist:   { label: 'Colleges List', icon: 'building',     sub: 'Participating colleges' },
    support:        { label: 'Support',     icon: 'headphones',   sub: 'Contact helpdesk' },
    answerKey:      { label: 'Answer Key', icon: 'file-text', sub: 'Check answers' },
    
  };

  function openModal(s) {
    const modal = document.getElementById('modal');
    const body = document.getElementById('modal-body');
    const meta = getMeta(s.category);
    const status = getStatus(s);

    const actionsHtml = Object.entries(s.actions || {})
      .filter(([k, v]) => v && ACTION_META[k])
      .map(([k, url]) => {
        const a = ACTION_META[k];
        return `
          <a class="action-btn" data-kind="${k}" href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer">
            <span class="action-icon"><i data-lucide="${a.icon}"></i></span>
            <span class="action-btn-text">
              ${a.label}
              <small>${a.sub}</small>
            </span>
          </a>
        `;
      }).join('');

    body.innerHTML = `
      <div class="modal-banner" style="--cat-color: ${meta.color};">
        <div class="modal-banner-row">
          <img class="modal-logo" src="${s.logo}" alt="${escapeAttr(s.serviceName)} logo" />
          <div class="modal-banner-text">
            <span class="modal-cat">${escapeHtml(s.category)}</span>
            <h2 class="modal-title" id="modal-title">${escapeHtml(s.serviceName)}</h2>
            ${s.subCategory ? `<p class="modal-subcat">${escapeHtml(s.subCategory)}</p>` : ''}
          </div>
        </div>
      </div>

      <div class="modal-section">
        <h4><i data-lucide="info"></i> Description</h4>
        <p class="modal-description">${escapeHtml(s.description || '')}</p>
      </div>

      <div class="modal-section">
        <h4><i data-lucide="calendar"></i> Important Dates</h4>
        <div class="modal-dates">
          <div class="date-cell">
            <div class="lbl">Posted on</div>
            <div class="val">${fmtDate(s.postDate)}</div>
          </div>
          <div class="date-cell">
            <div class="lbl">Application opens</div>
            <div class="val">${fmtDate(s.applicationStartDate)}</div>
          </div>
          <div class="date-cell">
            <div class="lbl">Last date</div>
            <div class="val">${fmtDate(s.applicationLastDate)}</div>
          </div>
          <div class="date-cell ${s.examDate ? '' : 'empty'}">
            <div class="lbl">Exam date</div>
            <div class="val">${s.examDate ? fmtDate(s.examDate) : 'N/A'}</div>
          </div>
          <div class="date-cell ${s.resultDate ? '' : 'empty'}">
            <div class="lbl">Result date</div>
            <div class="val">${s.resultDate ? fmtDate(s.resultDate) : 'N/A'}</div>
          </div>
          <div class="date-cell" style="border-left-color: ${status === 'open' ? '#10b981' : status === 'upcoming' ? '#f59e0b' : '#ef4444'};">
            <div class="lbl">Status</div>
            <div class="val">${statusLabel(status)}</div>
          </div>
        </div>
      </div>

      ${actionsHtml ? `
        <div class="modal-section">
          <h4><i data-lucide="link"></i> Quick Actions</h4>
          <div class="modal-actions">${actionsHtml}</div>
        </div>` : ''
      }

      <div class="modal-section">
        <h4><i data-lucide="info"></i> Service Details</h4>
        <div class="modal-meta-list">
          <div class="modal-meta-row">
            <i data-lucide="globe"></i>
            <span class="k">Official link</span>
            <span class="v"><a href="${escapeAttr(s.officialLink)}" target="_blank" rel="noopener noreferrer" style="color: var(--primary-dark); text-decoration: underline;">${escapeHtml(s.officialLink)}</a></span>
          </div>
          <div class="modal-meta-row">
            <i data-lucide="tag"></i>
            <span class="k">Sub-category</span>
            <span class="v">${escapeHtml(s.subCategory || '—')}</span>
          </div>
          <div class="modal-meta-row">
            <i data-lucide="hash"></i>
            <span class="k">Service ID</span>
            <span class="v">#${s.id}</span>
          </div>
          <div class="modal-meta-row">
            <i data-lucide="clock"></i>
            <span class="k">Last updated</span>
            <span class="v">${fmtDate(s.postDate)} (${fmtRelative(s.postDate)})</span>
          </div>
        </div>
      </div>
    `;

    modal.hidden = false;
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
    renderIcons();

    // Close on backdrop / close button
    modal.querySelectorAll('[data-close]').forEach((el) => {
      el.addEventListener('click', closeModal);
    });
    // Esc to close
    document.addEventListener('keydown', onEscClose);
  }

  function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.hidden = true;
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onEscClose);
  }

  function onEscClose(e) {
    if (e.key === 'Escape') closeModal();
  }

  // ----- Toast -----
  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.hidden = false;
    // Reset animation
    toast.style.animation = 'none';
    void toast.offsetWidth;
    toast.style.animation = '';
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => { toast.hidden = true; }, 2800);
  }

  // ----- Sidebar mobile toggle -----
  function openSidebar() {
    document.getElementById('sidebar').classList.add('open');
    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'sidebar-overlay';
      overlay.addEventListener('click', closeSidebar);
      document.body.appendChild(overlay);
    }
    requestAnimationFrame(() => overlay.classList.add('show'));
  }
  function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    const overlay = document.querySelector('.sidebar-overlay');
    if (overlay) overlay.classList.remove('show');
  }

  // ----- Helpers -----
  function escapeHtml(s) {
    if (s == null) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  function escapeAttr(s) { return escapeHtml(s); }
  function slugify(s) {
    return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

  // ----- Wire up controls -----
  function init() {
    // Search — bridge the header's #searchInput to our filter logic
    const search = document.getElementById('searchInput');
    if (search) {
      search.addEventListener('input', () => {
        state.query = search.value;
        renderServices();
      });
    }

    // Reset
    document.getElementById('reset-filters').addEventListener('click', resetFilters);
    const emptyReset = document.getElementById('empty-reset');
    if (emptyReset) emptyReset.addEventListener('click', resetFilters);

    // Latest nav
    document.getElementById('latest-prev').addEventListener('click', () => {
      document.getElementById('latest-track').scrollBy({ left: -300, behavior: 'smooth' });
    });
    document.getElementById('latest-next').addEventListener('click', () => {
      document.getElementById('latest-track').scrollBy({ left: 300, behavior: 'smooth' });
    });

    // Mobile categories toggle (the header's mobile-menu-btn toggles nav pills,
    // so we provide a separate button for the categories sidebar)
    const catToggle = document.getElementById('mobile-cat-toggle');
    if (catToggle) catToggle.addEventListener('click', openSidebar);

    // Close modal on backdrop click (delegated)
    document.getElementById('modal').addEventListener('click', (e) => {
      if (e.target.matches('[data-close]') || e.target.closest('[data-close]')) {
        closeModal();
      }
    });

    // Restore theme preference on boot
    applyStoredTheme();

    // Render
    renderLatest();
    renderCategoryList();
    renderServices();

    // Register Education services into Universal Search
    if (window.VI_SEARCH && Array.isArray(SERVICES)) {
      const eduSearchItems = SERVICES.map(s => ({
        id: `svc-edu-${s.id}`,
        title: s.serviceName,
        cat: 'Education',
        page: 'education/education.html',
        target: `svc-edu-${s.id}`,
        desc: `${s.category} • ${s.subCategory || ''} • ${s.shortDescription || ''}`
      }));
      window.VI_SEARCH.register(eduSearchItems);
    }

    // Deep-link target resolution: If loaded with ?target=... or #... or called from search
    function resolveEduTarget(targetParam) {
      document.querySelectorAll('.vi-highlight-pulse').forEach(el => el.classList.remove('vi-highlight-pulse'));
      const params = new URLSearchParams(window.location.search);
      const target = targetParam || params.get('target') || (window.location.hash ? window.location.hash.replace('#', '') : '');
      if (!target) return;

      try {
        const currentUrl = new URL(window.location.href);
        if (targetParam) currentUrl.searchParams.set('target', targetParam);
        window.history.replaceState({}, '', currentUrl.toString());
      } catch (e) {}

      const match = SERVICES.find(s => `svc-edu-${s.id}` === target || target.includes(String(s.id)));
      if (match) {
        state.activeCategory = match.category;
        state.query = '';
        renderCategoryList();
        renderServices();
        renderLatest();
        setTimeout(() => {
          const cardEl = document.getElementById(`svc-edu-${match.id}`) || document.querySelector(`[data-id="${match.id}"]`);
          if (cardEl && typeof window.pulseAndScrollToElement === 'function') {
            window.pulseAndScrollToElement(cardEl);
          }
        }, 300);
      }
    }
    window.resolveEduTarget = resolveEduTarget;
    setTimeout(resolveEduTarget, 200);
  }

  function resetFilters() {
    state.query = '';
    state.activeCategory = 'All';
    const search = document.getElementById('searchInput');
    if (search) search.value = '';
    const clearBtn = document.getElementById('clearSearchBtn');
    if (clearBtn) clearBtn.style.display = 'none';
    renderCategoryList();
    renderServices();
  }

  // ----- Expose globals for the header markup's inline handlers -----
  // filterServices() is called by the header's search input oninput
  window.filterServices = function (query) {
    const search = document.getElementById('searchInput');
    state.query = typeof query === 'string' ? query : (search ? search.value : '');
    renderServices();
  };

  window.clearSearch = function () {
    const search = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    if (search) { search.value = ''; search.focus(); }
    if (clearSearchBtn) clearSearchBtn.style.display = 'none';
    state.query = '';
    renderServices();
  };

  // toggleTheme() — switches dark/light mode, persists in localStorage
  window.toggleTheme = function () {
    const root = document.documentElement;
    const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', nextTheme);
    root.classList.toggle('dark', nextTheme === 'dark');
    try { localStorage.setItem('vi-theme', nextTheme); } catch (e) {}
    if (typeof window.syncThemeToggleIcons === 'function') {
      window.syncThemeToggleIcons();
    }
    const icon = document.getElementById('themeIcon');
    if (icon) {
      const darkPath = 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z';
      const lightPath = 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z';
      const pathEl = icon.querySelector('path');
      if (pathEl) pathEl.setAttribute('d', nextTheme === 'dark' ? darkPath : lightPath);
    }
  };

  function applyStoredTheme() {
    let theme = 'light';
    try { theme = localStorage.getItem('vi-theme') || 'light'; } catch (e) {}
    const isDark = theme === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
    if (typeof window.syncThemeToggleIcons === 'function') {
      window.syncThemeToggleIcons();
    }
    const icon = document.getElementById('themeIcon');
    if (icon) {
      const pathEl = icon.querySelector('path');
      if (pathEl) pathEl.setAttribute('d', isDark ? 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' : 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z');
    }
  }

  // Boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
