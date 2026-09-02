const tools = [
  { name: 'ChatGPT', category: 'Writing', description: 'Drafting, editing, brainstorming and idea generation.' },
  { name: 'Perplexity', category: 'Research', description: 'Fast question answering with sources and references.' },
  { name: 'Canva', category: 'Design', description: 'Create presentations, posters and marketing visuals.' },
  { name: 'Notion AI', category: 'Productivity', description: 'Turn notes and tasks into action plans quickly.' },
  { name: 'Gamma', category: 'Presentation', description: 'Generate polished decks in minutes.' },
  { name: 'Claude', category: 'Writing', description: 'Long-form writing and document summarization.' },
  { name: 'Midjourney', category: 'Image', description: 'AI art generation for concepts and creative work.' },
  { name: 'Runway', category: 'Video', description: 'Video generation and editing for fast content creation.' },
  { name: 'Grammarly', category: 'Writing', description: 'Polish grammar and improve clarity.' },
  { name: 'Otter.ai', category: 'Meeting', description: 'Transcribe calls and summarize key points.' },
  { name: 'Descript', category: 'Audio', description: 'Edit audio like text and produce polished podcasts.' },
  { name: 'Leonardo AI', category: 'Image', description: 'Generate creative visuals for design and storytelling.' }
];

const grid = document.getElementById('aiGrid');
const searchInput = document.getElementById('aiSearch');
const themeBtn = document.querySelector('.theme-btn');
const body = document.body;

function renderTools(filter = '') {
  const list = tools.filter((tool) => tool.name.toLowerCase().includes(filter.toLowerCase()) || tool.category.toLowerCase().includes(filter.toLowerCase()));
  grid.innerHTML = list.map((tool) => `
    <article class="ai-card">
      <h3>${tool.name}</h3>
      <p>${tool.description}</p>
      <div class="ai-meta">
        <span>${tool.category}</span>
        <span class="ai-tag">AI</span>
      </div>
    </article>
  `).join('');
}

searchInput?.addEventListener('input', (event) => renderTools(event.target.value));
renderTools();

document.getElementById('year').textContent = new Date().getFullYear();

function applyTheme(theme) {
  body.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('vi-theme', theme);
}
applyTheme(localStorage.getItem('vi-theme') || 'light');

themeBtn?.addEventListener('click', () => applyTheme(body.classList.contains('dark') ? 'light' : 'dark'));
