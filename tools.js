const tools = [
  { name: 'Resume Builder', category: 'Career', description: 'Create a concise, professional resume in minutes.' },
  { name: 'Exam Tracker', category: 'Education', description: 'Track important dates with simple reminders.' },
  { name: 'Link Organizer', category: 'Utilities', description: 'Keep all official links and references in one place.' },
  { name: 'Word Counter', category: 'Writing', description: 'Useful for essays, applications, and content drafts.' },
  { name: 'PDF Splitter', category: 'Files', description: 'Break large PDFs into workable sections.' },
  { name: 'Checklist Generator', category: 'Productivity', description: 'Plan preparation and application steps with clarity.' },
  { name: 'URL Cleaner', category: 'Utilities', description: 'Quickly normalize long links for sharing.' },
  { name: 'Note Snapshot', category: 'Writing', description: 'Capture main points from articles, updates, and resources.' }
];

window.tools = tools;

const grid = document.getElementById('toolsGrid');
const searchInput = document.getElementById('toolSearch');

function renderTools(filter = '') {
  if (!grid) return;
  const list = tools.filter((tool) => tool.name.toLowerCase().includes(filter.toLowerCase()) || tool.category.toLowerCase().includes(filter.toLowerCase()));
  grid.innerHTML = list.map((tool) => `
    <article class="tool-card" id="tool-${tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}">
      <h3>${tool.name}</h3>
      <p>${tool.description}</p>
      <div class="tool-meta">
        <span>${tool.category}</span>
        <span class="tool-tag">Ready</span>
      </div>
    </article>
  `).join('');
}

searchInput?.addEventListener('input', (event) => renderTools(event.target.value));
if (grid) renderTools();

const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();
