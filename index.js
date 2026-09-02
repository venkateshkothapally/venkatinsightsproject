const root = document.body;
const themeBtn = document.querySelector('.theme-btn');

function applyTheme(saved) {
  const enabled = saved === 'dark';
  root.classList.toggle('dark', enabled);
  localStorage.setItem('vi-theme', enabled ? 'dark' : 'light');
}

const savedTheme = localStorage.getItem('vi-theme') || 'light';
applyTheme(savedTheme);

themeBtn?.addEventListener('click', () => {
  const isDark = !root.classList.contains('dark');
  applyTheme(isDark ? 'dark' : 'light');
});
