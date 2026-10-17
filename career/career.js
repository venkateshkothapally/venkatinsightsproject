/**
 * Venkat Insights - Career & Government Jobs Dashboard (career.js)
 * Master controller for Job Portal tables, live statistics, sorting, and universal search integration
 */

(function () {
    'use strict';

    const jobs = window.VI_JOBS || [];
    let activeCategory = 'All Government Jobs';
    let isLatestUpdatesExpanded = false;
    let activeStatFilter = null;
    let sortMode = 'posted';

    /* ---------- Date helpers ---------- */
    function parseDateString(dateStr) {
        if (!dateStr) return null;
        const parts = String(dateStr).split(/[-/]/);
        if (parts.length !== 3) return null;
        return new Date(+parts[2], +parts[1] - 1, +parts[0]);
    }

    function daysLeft(dateStr) {
        const d = parseDateString(dateStr);
        if (!d) return null;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return Math.round((d - today) / 86400000);
    }

    function getActiveJobs() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return jobs.filter(job => {
            const d = parseDateString(job.lastDate);
            if (d) {
                d.setHours(0, 0, 0, 0);
                if (d < today) return false;
            }
            const posted = parseDateString(job.postDate);
            if (posted) {
                posted.setHours(0, 0, 0, 0);
                if (posted > today) return false;
            }
            return true;
        });
    }

    function sortJobs(list) {
        const arr = [...list];
        if (sortMode === 'closing') {
            arr.sort((a, b) => (parseDateString(a.lastDate) || Infinity) - (parseDateString(b.lastDate) || Infinity));
        } else {
            arr.sort((a, b) => (parseDateString(b.postDate) || 0) - (parseDateString(a.postDate) || 0));
        }
        return arr;
    }

    /* ---------- Badges & Status ---------- */
    function daysLeftBadge(dateStr) {
        const dl = daysLeft(dateStr);
        if (dl === null) return '';
        let cls = 'ok', txt;
        if (dl < 0)       { cls = 'urgent'; txt = 'Expired'; }
        else if (dl === 0){ cls = 'urgent'; txt = 'Closes today'; }
        else if (dl <= 3) { cls = 'urgent'; txt = dl + ' days left'; }
        else if (dl <= 7) { cls = 'soon';   txt = dl + ' days left'; }
        else              { cls = 'ok';     txt = dl + ' days left'; }
        return '<span class="days-left ' + cls + '">' + txt + '</span>';
    }

    function applicationStatus(job) {
        const last = daysLeft(job.lastDate);
        const post = daysLeft(job.postDate);
        if (last === null) return '<span class="days-left ok">Date unavailable</span>';
        if (last < 0) return '<span class="days-left expired">Expired</span>';
        if (post !== null && post > 0) return '<span class="days-left upcoming">Available soon</span>';
        return daysLeftBadge(job.lastDate);
    }

    function jobSourceNote(job) {
        if (job.isDemo) return '<span class="job-source-note">Sample / unverified</span>';
        if (!job.sourceAvailable) return '<span class="job-source-note">Source unavailable</span>';
        return '';
    }

    /* ---------- Table Row & Block Builders ---------- */
    function buildRow(job, showCategory) {
        const middleCell = showCategory
        ? '<td><span class="cat-chip">' + job.category + '</span></td>'
        : '<td class="cell-muted">' + (job.advertisement || '—') + '</td>';
        const safeId = job.targetId || ('svc-job-' + String(job.id || job.postName).replace(/[^a-zA-Z0-9_-]/g, '-'));
        const details = job.sourceAvailable
        ? '<a href="' + job.detailsUrl + '" class="details-link" target="_blank" rel="noopener noreferrer">View / Apply</a>'
        : '<span class="details-link details-link-disabled" aria-label="Application source unavailable">Unavailable</span>';

        return '<tr id="' + safeId + '" data-target="' + safeId + '" data-title="' + job.postName.replace(/"/g, '&quot;') + '">' +
        '<td class="cell-muted">' + job.postDate + '</td>' +
        '<td><strong>' + job.board + '</strong>' + jobSourceNote(job) + '</td>' +
        '<td class="cell-post">' + job.postName + '</td>' +
        '<td class="cell-muted">' + job.qualification + '</td>' +
        middleCell +
        '<td><div class="last-date-cell"><span class="last-date">' + (job.lastDate || 'Not announced') + '</span>' + applicationStatus(job) + '</div></td>' +
        '<td>' + details + '</td>' +
        '</tr>';
    }

    function tableBlock(title, count, headers, bodyHtml) {
        const head = headers.map(h => '<th>' + h + '</th>').join('');
        return '<div class="job-section-block">' +
            '<div class="section-title"><span>' + title + '</span>' +
            '<span class="title-count">' + count + (count === 1 ? ' job' : ' jobs') + '</span></div>' +
            '<div class="table-responsive" tabindex="0" aria-label="Scrollable ' + title + ' table"><table class="job-table">' +
            '<thead><tr>' + head + '</tr></thead><tbody>' + bodyHtml + '</tbody>' +
            '</table></div></div>';
    }

    function renderDashboard() {
        const container = document.getElementById('jobTablesContainer');
        if (!container) return;
        container.innerHTML = '';

        const allJobs = jobs;
        const allActive = getActiveJobs();
        const latestPanel = document.getElementById('latestUpdatesPanel');
        const latestTable = document.getElementById('latestUpdatesTable');
        const mainLayout = document.querySelector('.main-layout');
        const searchInput = document.getElementById('searchInput');
        const query = (searchInput ? searchInput.value : '').trim().toLowerCase();

        let sourceJobs = isLatestUpdatesExpanded ? allActive : allJobs;
        let resultsTitle = '⚡ Latest Job Applications';
        if (activeStatFilter) {
            sourceJobs = allActive;
            if (activeStatFilter === 'closing') {
                sourceJobs = allActive.filter(job => {
                    const days = daysLeft(job.lastDate);
                    return days !== null && days >= 0 && days <= 7;
                });
                resultsTitle = '⏳ Jobs Closing This Week';
            } else if (activeStatFilter === 'new') {
                sourceJobs = allActive.filter(job => {
                    const days = daysLeft(job.postDate);
                    return days !== null && days >= -7 && days <= 0;
                });
                resultsTitle = '✨ New Jobs This Week';
            } else if (activeStatFilter === 'categories') {
                resultsTitle = '▦ Jobs by Category';
            } else {
                resultsTitle = '✓ Active Jobs';
            }
        }
        let filtered = sourceJobs;
        if (!isLatestUpdatesExpanded && !activeStatFilter && activeCategory !== 'All Government Jobs') {
            filtered = filtered.filter(job => job.category === activeCategory);
        }
        const resultTotal = filtered.length;
        if (query) {
            filtered = filtered.filter(j =>
                j.postName.toLowerCase().includes(query) ||
                j.board.toLowerCase().includes(query) ||
                j.qualification.toLowerCase().includes(query) ||
                j.category.toLowerCase().includes(query) ||
                (j.advertisement || '').toLowerCase().includes(query)
            );
        }
        filtered = sortJobs(filtered);

        updateCategoryCounts(allJobs);
        const isStatsView = Boolean(activeStatFilter);
        const isResultsView = isLatestUpdatesExpanded || isStatsView;
        updateResultCount(filtered.length, resultTotal, query);
        updateBreadcrumb(isResultsView ? (activeStatFilter ? resultsTitle.replace(/^[^\w]+/u, '') : 'Latest Updates') : null);

        if (latestPanel && latestTable) {
            latestPanel.hidden = !isResultsView;
            if (mainLayout) mainLayout.classList.toggle('is-latest-mode', isResultsView);
            latestTable.innerHTML = '';
            if (isResultsView && filtered.length) {
                if (activeStatFilter === 'categories') {
                    const grouped = [...new Set(filtered.map(job => job.category))];
                    latestTable.innerHTML = grouped.map(category => {
                        const categoryJobs = filtered.filter(job => job.category === category);
                        const body = categoryJobs.map(job => buildRow(job, true)).join('');
                        return tableBlock(category, categoryJobs.length,
                            ['Post Date', 'Board', 'Post Name', 'Qualification', 'Category', 'Last Date', 'Apply'], body);
                    }).join('');
                } else {
                    const body = filtered.map(j => buildRow(j, true)).join('');
                    latestTable.innerHTML = tableBlock(resultsTitle, filtered.length,
                        ['Post Date', 'Board', 'Post Name', 'Qualification', 'Category', 'Last Date', 'Apply'], body);
                }
            } else if (isResultsView) {
                latestTable.innerHTML = '<div class="job-section-block"><div class="empty-state">' +
                    '<p><strong>' + (query ? 'No matching job applications' : 'No jobs to show for this selection') + '</strong></p>' +
                    '<p class="empty-hint">' + (query ? 'Try a different keyword.' : 'Check back for new notifications.') + '</p></div></div>';
            }
        } else if (mainLayout) {
            mainLayout.classList.remove('is-latest-mode');
        }

        if (isResultsView) {
            attachTableHoverInteractions();
            return;
        }

        if (filtered.length === 0) {
            container.innerHTML = '<div class="job-section-block"><div class="empty-state">' +
                '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0 1 14 0z"/></svg>' +
                '<p><strong>No matching job notifications</strong></p>' +
                '<p class="empty-hint">Try a different keyword or category.</p></div></div>';
            return;
        }

        const cats = activeCategory === 'All Government Jobs'
            ? [...new Set(filtered.map(j => j.category))]
            : [activeCategory];

        let html = '';
        cats.forEach(cat => {
            const catJobs = filtered.filter(j => j.category === cat);
            if (!catJobs.length) return;
            const body = catJobs.map(j => buildRow(j, false)).join('');
            html += tableBlock(cat, catJobs.length,
                ['Post Date', 'Board', 'Post Name', 'Qualification', 'Advt No', 'Last Date', 'Apply'], body);
        });

        container.innerHTML = html || '<div class="job-section-block"><div class="empty-state">' +
            '<p><strong>No jobs available in this category</strong></p></div></div>';

        attachTableHoverInteractions();
    }

    function updateCategoryCounts(activeJobs) {
        const all = document.getElementById('count-all');
        if (all) all.textContent = activeJobs.length;
        document.querySelectorAll('.category-item').forEach(item => {
            const cat = item.getAttribute('data-category');
            if (cat === 'All Government Jobs') return;
            const badge = item.querySelector('.badge-count');
            if (badge) badge.textContent = activeJobs.filter(j => j.category === cat).length;
        });
    }

    function updateResultCount(shown, total, query) {
        const el = document.getElementById('resultCount');
        if (!el) return;
        el.textContent = query
            ? 'Showing ' + shown + ' of ' + total + ' for "' + query + '"'
            : 'Showing ' + shown + ' of ' + total + ' notifications';
    }

    function updateBreadcrumb(resultLabel) {
        const el = document.getElementById('crumbCurrent');
        if (el) el.textContent = resultLabel || (isLatestUpdatesExpanded ? 'Latest Updates' : activeCategory);
    }

    function attachTableHoverInteractions() {
        document.querySelectorAll('.job-table').forEach(table => {
            table.querySelectorAll('tbody tr').forEach(row => {
                row.addEventListener('mouseenter', () => row.classList.add('highlight-row'));
                row.addEventListener('mouseleave', () => row.classList.remove('highlight-row'));
                row.querySelectorAll('td').forEach(cell => {
                    cell.addEventListener('mouseenter', () => cell.classList.add('highlight-cell'));
                    cell.addEventListener('mouseleave', () => cell.classList.remove('highlight-cell'));
                });
            });
        });
    }

    /* ---------- Animated Stats Counter ---------- */
    function updateStats() {
        const active = getActiveJobs();
        const total = active.length;
        const cats = new Set(active.map(j => j.category)).size;
        const closing = active.filter(j => { const d = daysLeft(j.lastDate); return d !== null && d >= 0 && d <= 7; }).length;
        const fresh = active.filter(j => { const d = daysLeft(j.postDate); return d !== null && d >= -7 && d <= 0; }).length;
        animateValue('statTotal', total);
        animateValue('statCats', cats);
        animateValue('statClosing', closing);
        animateValue('statFresh', fresh);
    }

    function animateValue(id, target) {
        const el = document.getElementById(id);
        if (!el) return;
        const duration = 800, start = performance.now();
        function tick(now) {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased);
            if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    /* ---------- Universal Search & Filter Bridge ---------- */
    window.filterServices = function () {
        renderDashboard();
    };

    window.clearSearch = function () {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.value = '';
        renderDashboard();
    };

    /* Register all Career Jobs into Universal Search */
    function registerJobsWithSearch() {
        if (!window.VI_SEARCH || !Array.isArray(jobs)) return;
        const searchItems = jobs.map(j => {
            const safeId = j.targetId || ('svc-job-' + String(j.id || j.postName).replace(/[^a-zA-Z0-9_-]/g, '-'));
            return {
                id: safeId,
                title: `${j.board} - ${j.postName}`,
                cat: 'Career',
                page: 'career/career.html',
                target: safeId,
                desc: `${j.category} • ${j.qualification} • Last Date: ${j.lastDate || 'N/A'}`
            };
        });
        window.VI_SEARCH.register(searchItems);
    }

    /* Deep-link target handler */
    function resolveCareerTarget(targetParam) {
        document.querySelectorAll('.vi-highlight-pulse').forEach(el => el.classList.remove('vi-highlight-pulse'));
        const params = new URLSearchParams(window.location.search);
        const target = targetParam || params.get('target') || (window.location.hash ? window.location.hash.replace('#', '') : '');
        if (!target) return;

        try {
            const currentUrl = new URL(window.location.href);
            if (targetParam) currentUrl.searchParams.set('target', targetParam);
            window.history.replaceState({}, '', currentUrl.toString());
        } catch (e) {}

        const cleanTarget = target.trim();
        const strippedTarget = cleanTarget.replace(/^svc-job-/, '').replace(/^cat-/, '');

        // Category check
        const allCats = [...new Set(jobs.map(j => j.category))];
        const catMatch = allCats.find(c => {
            const catSlug = c.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            return cleanTarget === `cat-${catSlug}` || catSlug === strippedTarget.toLowerCase() || c.toLowerCase() === strippedTarget.toLowerCase();
        });

        if (cleanTarget.startsWith('cat-') && catMatch) {
            activeCategory = catMatch;
            isLatestUpdatesExpanded = false;
            activeStatFilter = null;
            document.querySelectorAll('[data-stat-filter]').forEach(stat => stat.setAttribute('aria-pressed', 'false'));
            document.querySelectorAll('.category-item').forEach(el => {
                el.classList.toggle('active', el.getAttribute('data-category') === catMatch);
            });
            renderDashboard();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // Exact job match
        const match = jobs.find(j => {
            const safeId = j.targetId || ('svc-job-' + String(j.id || j.postName).replace(/[^a-zA-Z0-9_-]/g, '-'));
            const rawId = String(j.id || '');
            const postSlug = String(j.postName || '').replace(/[^a-zA-Z0-9_-]/g, '-');
            return safeId === cleanTarget || rawId === cleanTarget || rawId === strippedTarget || postSlug === strippedTarget;
        });

        if (match) {
            activeCategory = match.category;
            isLatestUpdatesExpanded = false;
            activeStatFilter = null;
            document.querySelectorAll('[data-stat-filter]').forEach(stat => stat.setAttribute('aria-pressed', 'false'));
            document.querySelectorAll('.category-item').forEach(el => {
                el.classList.toggle('active', el.getAttribute('data-category') === match.category);
            });
            renderDashboard();

            setTimeout(() => {
                const targetId = match.targetId || ('svc-job-' + String(match.id || match.postName).replace(/[^a-zA-Z0-9_-]/g, '-'));
                const rowEl = document.getElementById(targetId) || document.getElementById(cleanTarget) || document.querySelector(`[data-target="${targetId}"]`) || document.querySelector(`[data-target="${cleanTarget}"]`);
                if (rowEl && typeof window.pulseAndScrollToElement === 'function') {
                    window.pulseAndScrollToElement(rowEl);
                }
            }, 300);
            return;
        }

        if (catMatch) {
            activeCategory = catMatch;
            isLatestUpdatesExpanded = false;
            activeStatFilter = null;
            document.querySelectorAll('[data-stat-filter]').forEach(stat => stat.setAttribute('aria-pressed', 'false'));
            document.querySelectorAll('.category-item').forEach(el => {
                el.classList.toggle('active', el.getAttribute('data-category') === catMatch);
            });
            renderDashboard();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    window.resolveCareerTarget = resolveCareerTarget;

    /* ---------- DOM Event Listeners ---------- */
    const latestBtn = document.getElementById('latestUpdatesBtn');
    if (latestBtn) {
        latestBtn.addEventListener('click', function () {
            isLatestUpdatesExpanded = !isLatestUpdatesExpanded;
            activeStatFilter = null;
            document.querySelectorAll('[data-stat-filter]').forEach(stat => stat.setAttribute('aria-pressed', 'false'));
            this.classList.toggle('is-active', isLatestUpdatesExpanded);
            this.querySelector('.btn-label').textContent = isLatestUpdatesExpanded ? 'Back to Categories' : 'Latest Updates';
            renderDashboard();
            const target = isLatestUpdatesExpanded
                ? document.getElementById('latestUpdatesPanel')
                : document.querySelector('.content-toolbar');
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    document.querySelectorAll('[data-stat-filter]').forEach(stat => {
        stat.addEventListener('click', function () {
            const filter = this.getAttribute('data-stat-filter');
            activeStatFilter = activeStatFilter === filter ? null : filter;
            isLatestUpdatesExpanded = false;
            if (latestBtn) {
                latestBtn.classList.remove('is-active');
                latestBtn.querySelector('.btn-label').textContent = 'Latest Updates';
            }
            document.querySelectorAll('[data-stat-filter]').forEach(button => {
                button.setAttribute('aria-pressed', String(button === this && activeStatFilter === filter));
            });
            renderDashboard();
            if (activeStatFilter) {
                document.getElementById('latestUpdatesPanel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', function () {
            document.querySelectorAll('.category-item').forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            activeCategory = this.getAttribute('data-category');
            isLatestUpdatesExpanded = false;
            activeStatFilter = null;
            document.querySelectorAll('[data-stat-filter]').forEach(stat => stat.setAttribute('aria-pressed', 'false'));
            if (latestBtn) {
                latestBtn.classList.remove('is-active');
                latestBtn.querySelector('.btn-label').textContent = 'Latest Updates';
            }
            renderDashboard();
        });
    });

    const sortSel = document.getElementById('sortSelect');
    if (sortSel) {
        sortSel.addEventListener('change', function () {
            sortMode = this.value;
            renderDashboard();
        });
    }

    /* Newsletter subscription handler */
    const newsForm = document.getElementById('newsletterForm');
    if (newsForm) {
        newsForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('newsletterEmail');
            const msg = document.getElementById('newsletterMsg');
            if (!email || !email.value || email.value.indexOf('@') === -1) {
                if (msg) msg.textContent = '⚠ Please enter a valid email address.';
            } else {
                if (msg) msg.textContent = '✓ Subscribed! Job alerts will be sent to ' + email.value;
                this.reset();
            }
            if (msg) {
                msg.style.display = 'block';
                clearTimeout(msg._t);
                msg._t = setTimeout(function () { msg.style.display = 'none'; }, 4500);
            }
        });
    }

    /* Initialize Career Dashboard */
    updateStats();
    renderDashboard();
    registerJobsWithSearch();
    setTimeout(resolveCareerTarget, 200);

})();