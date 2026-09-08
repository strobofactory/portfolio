const grid = document.getElementById('filmGrid');
const statusEl = document.getElementById('filmStatus');
const filters = Array.from(document.querySelectorAll('#filmFilters button'));
let works = [];

const categoryAliases = [
  { label: 'AI Video', keys: ['ai video', 'ai', 'generative', 'veo', 'sora', 'midjourney'] },
  { label: 'Animation', keys: ['animation', 'anime', 'motion', 'motion graphics'] },
  { label: 'Live / Event', keys: ['live', 'event', 'stream', 'streaming'] },
  { label: 'YouTube', keys: ['youtube', 'channel'] },
  { label: 'Commercial', keys: ['commercial', 'cm', 'advertising', 'ad'] },
  { label: 'Corporate', keys: ['corporate', 'company', 'vp', 'brand', 'documentary'] }
];

function esc(value = '') {
  return String(value).replace(/[&<>'"]/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[ch]));
}

function tagsToStrings(tags) {
  return Array.isArray(tags) ? tags.map(tag => typeof tag === 'string' ? tag : tag?.name).filter(Boolean) : [];
}

function getPrefixedTag(tags, prefix) {
  const lower = prefix.toLowerCase();
  const found = tags.find(tag => tag.toLowerCase().startsWith(`${lower}:`) || tag.toLowerCase().startsWith(`${lower}=`));
  if (!found) return '';
  return found.slice(found.indexOf(':') >= 0 ? found.indexOf(':') + 1 : found.indexOf('=') + 1).trim();
}

function inferCategory(item) {
  const tags = tagsToStrings(item.tags);
  const explicit = getPrefixedTag(tags, 'category');
  if (explicit) {
    const exact = categoryAliases.find(entry => entry.label.toLowerCase() === explicit.toLowerCase());
    return exact ? exact.label : explicit;
  }

  const haystack = `${item.name || ''} ${item.description || ''} ${tags.join(' ')}`.toLowerCase();
  const match = categoryAliases.find(entry => entry.keys.some(key => haystack.includes(key)));
  return match ? match.label : 'Corporate';
}

function getThumb(item) {
  const sizes = item?.pictures?.sizes || [];
  if (!sizes.length) return '';
  return [...sizes].sort((a, b) => (b.width || 0) - (a.width || 0))[0]?.link || sizes[sizes.length - 1]?.link || '';
}

function normalize(item) {
  const tags = tagsToStrings(item.tags);
  const date = item.release_time || item.created_time || '';
  const id = String(item.uri || '').split('/').filter(Boolean).pop() || '';
  return {
    id,
    name: item.name || 'Untitled',
    link: item.link || (id ? `https://vimeo.com/${id}` : '#'),
    description: item.description || '',
    client: getPrefixedTag(tags, 'client'),
    category: inferCategory(item),
    year: date ? new Date(date).getFullYear() : '',
    thumb: getThumb(item)
  };
}

function render(filter = 'All') {
  const visible = filter === 'All' ? works : works.filter(work => work.category === filter);
  if (!visible.length) {
    grid.innerHTML = '<div class="empty-state">このカテゴリの公開作品はまだありません。Vimeo側のタグ整理に合わせて自動反映されます。</div>';
    return;
  }

  grid.innerHTML = visible.map(work => `
    <a class="film-card" href="${esc(work.link)}" target="_blank" rel="noreferrer">
      <div class="film-thumb">
        ${work.thumb ? `<img src="${esc(work.thumb)}" alt="${esc(work.name)}" loading="lazy">` : ''}
      </div>
      <div class="film-meta">
        <div>
          <div class="film-category">${esc(work.category)}</div>
          <h3>${esc(work.name)}</h3>
          ${work.client ? `<p class="film-client">${esc(work.client)}</p>` : ''}
        </div>
        <div class="film-year">${esc(work.year)}</div>
      </div>
    </a>
  `).join('');
}

async function loadVimeo() {
  try {
    const response = await fetch('/api/vimeo', { headers: { Accept: 'application/json' } });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload?.error || `HTTP ${response.status}`);

    works = (payload.data || []).map(normalize).filter(item => item.link && item.name);
    statusEl.textContent = works.length
      ? `${works.length} portfolio works — synced from Vimeo`
      : 'No Vimeo works tagged “portfolio” yet';
    render('All');
  } catch (error) {
    console.error('Vimeo load failed:', error);
    statusEl.textContent = 'Vimeo connection is not configured yet. Add VIMEO_ACCESS_TOKEN in Vercel to activate the film archive.';
    statusEl.classList.add('is-error');
    grid.innerHTML = '<div class="empty-state">Film archive ready. Vimeo APIを接続すると、ここへ作品が自動表示されます。</div>';
  }
}

filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    render(button.dataset.filter || 'All');
  });
});

loadVimeo();
