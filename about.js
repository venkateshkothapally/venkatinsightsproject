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
