const grid = document.getElementById('filmGrid');
const statusEl = document.getElementById('filmStatus');
const countEl = document.getElementById('filmCount');
const filters = Array.from(document.querySelectorAll('#filmFilters button'));
const lang = (document.documentElement.lang || 'ja').toLowerCase();
const locale = lang.startsWith('en') ? 'en' : 'ja';
let works = [];

const categoryAliases = [
  { label: 'AI Video', keys: ['ai video', 'ai', 'generative', 'veo', 'sora', 'midjourney'] },
  { label: 'Animation', keys: ['animation', 'anime', 'motion', 'motion graphics'] },
  { label: 'Live / Event', keys: ['live', 'event', 'stream', 'streaming'] },
  { label: 'YouTube', keys: ['youtube', 'channel'] },
  { label: 'Commercial', keys: ['commercial', 'cm', 'advertising', 'ad'] },
  { label: 'Corporate', keys: ['corporate', 'company', 'vp', 'brand', 'documentary'] }
];

const categoryDisplay = {
  ja: {
    'Corporate': '企業映像',
    'Commercial': 'CM・広告',
    'AI Video': 'AI映像',
    'Animation': 'アニメーション',
    'YouTube': 'YouTube',
    'Live / Event': 'ライブ・イベント'
  },
  en: {
    'Corporate': 'Corporate',
    'Commercial': 'Commercial',
    'AI Video': 'AI Video',
    'Animation': 'Animation',
    'YouTube': 'YouTube',
    'Live / Event': 'Live / Event'
  }
};

const ui = {
  ja: {
    untitled: '無題',
    categoryEmpty: 'このカテゴリの掲載作品はまだありません。',
    preparing: '掲載作品を準備しています。',
    loaded: n => `${n}件の掲載作品`,
    loadError: '映像作品を一時的に読み込めません。'
  },
  en: {
    untitled: 'Untitled',
    categoryEmpty: 'No works are currently listed in this category.',
    preparing: 'Portfolio works are being prepared.',
    loaded: n => `${n} works listed`,
    loadError: 'Video works are temporarily unavailable.'
  }
};

const uiText = ui[locale];

function buildLanguageSelector() {
  const nav = document.querySelector('.topbar nav');
  if (!nav) return;

  nav.querySelectorAll('a[lang], .language-select').forEach(el => el.remove());

  const select = document.createElement('select');
  select.className = 'language-select';
  select.setAttribute('aria-label', locale === 'ja' ? '言語を選択' : 'Select language');
  select.innerHTML = `
    <option value="/"${locale === 'ja' ? ' selected' : ''}>日本語</option>
    <option value="/en.html"${locale === 'en' ? ' selected' : ''}>English</option>
  `;
  select.addEventListener('change', () => {
    if (select.value) window.location.href = select.value;
  });

  nav.appendChild(select);

  const style = document.createElement('style');
  style.textContent = `
    .language-select{
      appearance:none;-webkit-appearance:none;border:1px solid var(--line);background:#fff;color:var(--ink);
      font:inherit;font-size:10px;letter-spacing:.06em;padding:8px 28px 8px 10px;cursor:pointer;border-radius:0;
      background-image:linear-gradient(45deg,transparent 50%,var(--ink) 50%),linear-gradient(135deg,var(--ink) 50%,transparent 50%);
      background-position:calc(100% - 12px) 50%,calc(100% - 8px) 50%;background-size:4px 4px,4px 4px;background-repeat:no-repeat
    }
    .language-select:focus{outline:1px solid var(--accent);outline-offset:2px}
    @media(max-width:760px){.language-select{font-size:9px;padding:7px 26px 7px 9px}}
  `;
  document.head.appendChild(style);
}

buildLanguageSelector();

function esc(value = '') {
  return String(value).replace(/[&<>'\"]/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '\"': '&quot;'
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
    name: item.name || uiText.untitled,
    link: item.link || (id ? `https://vimeo.com/${id}` : '#'),
    client: getPrefixedTag(tags, 'client'),
    category: inferCategory(item),
    year: date ? new Date(date).getFullYear() : '',
    thumb: getThumb(item)
  };
}

function render(filter = 'All') {
  const visible = filter === 'All' ? works : works.filter(work => work.category === filter);
  if (!visible.length) {
    grid.innerHTML = works.length
      ? `<div class="empty-state">${uiText.categoryEmpty}</div>`
      : `<div class="empty-state">${uiText.preparing}</div>`;
    return;
  }

  grid.innerHTML = visible.map(work => `
    <a class="film-card" href="${esc(work.link)}" target="_blank" rel="noreferrer">
      <div class="film-thumb">${work.thumb ? `<img src="${esc(work.thumb)}" alt="${esc(work.name)}" loading="lazy">` : ''}</div>
      <div class="film-meta">
        <div>
          <div class="film-category">${esc(categoryDisplay[locale][work.category] || work.category)}</div>
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
    const response = await fetch(`/api/vimeo?t=${Date.now()}`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' }
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload?.error || `HTTP ${response.status}`);

    works = (payload.data || []).map(normalize).filter(item => item.link && item.name);
    if (countEl) countEl.textContent = String(works.length).padStart(2, '0');
    statusEl.textContent = works.length ? uiText.loaded(works.length) : uiText.preparing;
    render('All');
  } catch (error) {
    console.error('Vimeo load failed:', error);
    if (countEl) countEl.textContent = '—';
    statusEl.textContent = uiText.loadError;
    statusEl.classList.add('is-error');
    grid.innerHTML = `<div class="empty-state">${uiText.loadError}</div>`;
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
