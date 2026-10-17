(function () {
  'use strict';

  if (window.VITheme && window.VITheme.__isGlobalThemeManager) {
    return;
  }

  const root = document.documentElement;
  const storageKey = 'vi-theme';
  let currentTheme = 'light';
  let hasSavedPreference = false;
  let warnedAboutStorage = false;

  function warnStorage(error) {
    if (warnedAboutStorage) return;
    warnedAboutStorage = true;
    console.warn('Theme preference storage is unavailable; theme changes will apply for this page only.', error);
  }

  function readSavedTheme() {
    try {
      const savedTheme = localStorage.getItem(storageKey);
      return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : null;
    } catch (error) {
      warnStorage(error);
      return null;
    }
  }

  function getDefaultTheme() {
    const pageDefault = root.getAttribute('data-default-theme');
    if (pageDefault === 'dark' || pageDefault === 'light') return pageDefault;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function syncControls() {
    const isDark = currentTheme === 'dark';
    document.querySelectorAll('[data-theme-toggle], .theme-btn, #themeBtn, #themeToggleBtn').forEach((button) => {
      if (button.dataset.viThemeBound !== 'true') {
        button.dataset.viThemeBound = 'true';
        button.addEventListener('click', (event) => {
          event.preventDefault();
          toggleTheme();
        });
      }

      const moon = button.querySelector('.icon-moon');
      const sun = button.querySelector('.icon-sun');

      if (moon && sun) {
        moon.style.display = isDark ? 'none' : 'block';
        sun.style.display = isDark ? 'block' : 'none';
      }

      button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      button.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      button.setAttribute('aria-pressed', String(isDark));
    });
  }

  function applyTheme(theme, persist) {
    if (theme !== 'dark' && theme !== 'light') {
      theme = getDefaultTheme();
    }

    currentTheme = theme;
    root.setAttribute('data-theme', theme);
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;

    if (document.body) {
      document.body.setAttribute('data-theme', theme);
      document.body.classList.toggle('dark', theme === 'dark');
    }

    if (persist) {
      try {
        localStorage.setItem(storageKey, theme);
        hasSavedPreference = true;
      } catch (error) {
        warnStorage(error);
      }
    }

    syncControls();
  }

  function toggleTheme() {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark', true);
  }

  window.VITheme = {
    __isGlobalThemeManager: true,
    get: () => currentTheme,
    set: (theme) => applyTheme(theme === 'dark' || theme === 'light' ? theme : getDefaultTheme(), true),
    toggle: toggleTheme,
    sync: syncControls
  };
  window.toggleTheme = toggleTheme;
  window.syncThemeToggleIcons = syncControls;

  const savedTheme = readSavedTheme();
  hasSavedPreference = savedTheme !== null;
  applyTheme(savedTheme || getDefaultTheme(), false);

  if (typeof MutationObserver !== 'undefined') {
    const controlObserver = new MutationObserver((mutations) => {
      if (mutations.some((mutation) => mutation.addedNodes.length > 0)) syncControls();
    });
    controlObserver.observe(document.documentElement, { childList: true, subtree: true });
  }

  window.addEventListener('storage', (event) => {
    if (event.key !== storageKey) return;
    const theme = event.newValue === 'dark' || event.newValue === 'light'
      ? event.newValue
      : getDefaultTheme();
    hasSavedPreference = event.newValue === 'dark' || event.newValue === 'light';
    applyTheme(theme, false);
  });

  if (window.matchMedia) {
    const preference = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemThemeChange = (event) => {
      if (!hasSavedPreference) applyTheme(event.matches ? 'dark' : 'light', false);
    };
    if (preference.addEventListener) {
      preference.addEventListener('change', onSystemThemeChange);
    } else if (preference.addListener) {
      preference.addListener(onSystemThemeChange);
    }
  }

  function addStandaloneToggle() {
    const commonShell = Array.from(document.scripts).some((script) =>
      /(?:^|\/)common\.js(?:[?#].*)?$/i.test(script.getAttribute('src') || '')
    );
    if (commonShell || document.querySelector('[data-theme-toggle], .theme-btn, #themeBtn, #themeToggleBtn')) {
      syncControls();
      return;
    }

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'vi-theme-toggle';
    button.setAttribute('data-theme-toggle', '');
    button.innerHTML = `
      <svg class="icon-moon" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
      </svg>
      <svg class="icon-sun" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
      </svg>
    `;

    const host = document.querySelector('.nav-container, .nav-inner, .nav-flex, .main-nav, .page-header');
    if (host) {
      button.classList.add('vi-theme-toggle--inline');
      host.appendChild(button);
    } else {
      button.classList.add('vi-theme-toggle--floating');
      document.body.appendChild(button);
    }
    syncControls();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addStandaloneToggle, { once: true });
  } else {
    addStandaloneToggle();
  }

  document.addEventListener('DOMContentLoaded', syncControls, { once: true });
})();
