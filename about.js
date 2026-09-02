const themeBtn = document.querySelector('.theme-btn');
const body = document.body;

function applyTheme(theme) {
  body.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('vi-theme', theme);
}
applyTheme(localStorage.getItem('vi-theme') || 'light');

themeBtn?.addEventListener('click', () => {
  const next = body.classList.contains('dark') ? 'light' : 'dark';
  applyTheme(next);
});

const counters = document.querySelectorAll('[data-target]');
counters.forEach((counter) => {
  const target = Number(counter.getAttribute('data-target'));
  let value = 0;
  const step = Math.max(1, Math.ceil(target / 60));
  const timer = setInterval(() => {
    value += step;
    counter.textContent = value >= target ? target : value;
    if (value >= target) clearInterval(timer);
  }, 25);
});

document.getElementById('year').textContent = new Date().getFullYear();
