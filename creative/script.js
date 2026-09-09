const grid = document.getElementById('filmGrid');
const statusEl = document.getElementById('filmStatus');
const countEl = document.getElementById('filmCount');
const filters = Array.from(document.querySelectorAll('#filmFilters button'));
const lang = (document.documentElement.lang || 'ja').toLowerCase();
const locale = lang.startsWith('es') ? 'es' : lang.startsWith('zh') ? 'zh' : lang.startsWith('ko') ? 'ko' : lang.startsWith('en') ? 'en' : 'ja';
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
  ja: {'Corporate':'企業映像','Commercial':'CM・広告','AI Video':'AI映像','Animation':'アニメーション','YouTube':'YouTube','Live / Event':'ライブ・イベント'},
  en: {'Corporate':'Corporate','Commercial':'Commercial','AI Video':'AI Video','Animation':'Animation','YouTube':'YouTube','Live / Event':'Live / Event'},
  es: {'Corporate':'Corporativo','Commercial':'Publicidad','AI Video':'Vídeo IA','Animation':'Animación','YouTube':'YouTube','Live / Event':'Directo / Evento'},
  zh: {'Corporate':'企业影像','Commercial':'广告','AI Video':'AI 视频','Animation':'动画','YouTube':'YouTube','Live / Event':'直播 / 活动'},
  ko: {'Corporate':'기업 영상','Commercial':'광고','AI Video':'AI 영상','Animation':'애니메이션','YouTube':'YouTube','Live / Event':'라이브 / 이벤트'}
};

const ui = {
  ja:{untitled:'無題',categoryEmpty:'このカテゴリの掲載作品はまだありません。',preparing:'掲載作品を準備しています。',loaded:n=>`${n}件の掲載作品`,loadError:'映像作品を一時的に読み込めません。',select:'言語を選択'},
  en:{untitled:'Untitled',categoryEmpty:'No works are currently listed in this category.',preparing:'Portfolio works are being prepared.',loaded:n=>`${n} works listed`,loadError:'Video works are temporarily unavailable.',select:'Select language'},
  es:{untitled:'Sin título',categoryEmpty:'Todavía no hay trabajos publicados en esta categoría.',preparing:'Estamos preparando los trabajos del portafolio.',loaded:n=>`${n} trabajos publicados`,loadError:'Los trabajos de vídeo no están disponibles temporalmente.',select:'Seleccionar idioma'},
  zh:{untitled:'未命名',categoryEmpty:'该分类目前还没有展示作品。',preparing:'正在准备作品内容。',loaded:n=>`已展示 ${n} 件作品`,loadError:'视频作品暂时无法加载。',select:'选择语言'},
  ko:{untitled:'제목 없음',categoryEmpty:'이 카테고리에는 아직 공개된 작품이 없습니다.',preparing:'포트폴리오 작품을 준비하고 있습니다.',loaded:n=>`${n}개 작품`,loadError:'영상 작품을 일시적으로 불러올 수 없습니다.',select:'언어 선택'}
};
const uiText = ui[locale];

function buildLanguageSelector() {
  const nav = document.querySelector('.topbar nav');
  if (!nav) return;
  nav.querySelectorAll('a[lang], .language-select, .language-buttons').forEach(el => el.remove());

  const languageLabels = {
    ja: { ja:'日本語', en:'英語', es:'スペイン語', zh:'中国語', ko:'韓国語' },
    en: { ja:'Japanese', en:'English', es:'Spanish', zh:'Chinese', ko:'Korean' },
    es: { ja:'Japonés', en:'Inglés', es:'Español', zh:'Chino', ko:'Coreano' },
    zh: { ja:'日语', en:'英语', es:'西班牙语', zh:'中文', ko:'韩语' },
    ko: { ja:'일본어', en:'영어', es:'스페인어', zh:'중국어', ko:'한국어' }
  };
  const paths = {ja:'/', en:'/en.html', es:'/es.html', zh:'/zh.html', ko:'/ko.html'};

  const select = document.createElement('select');
  select.className = 'language-select';
  select.setAttribute('aria-label', uiText.select);
  select.innerHTML = Object.entries(paths).map(([code, href]) =>
    `<option value="${href}"${code === locale ? ' selected' : ''}>${languageLabels[locale][code]}</option>`
  ).join('');
  select.addEventListener('change', () => {
    if (select.value) window.location.href = select.value;
  });
  nav.appendChild(select);

  if (!document.getElementById('language-select-style')) {
    const style = document.createElement('style');
    style.id = 'language-select-style';
    style.textContent = `.language-select{appearance:none;-webkit-appearance:none;border:1px solid var(--ink);background:#fff;color:var(--ink);font:inherit;font-size:10px;letter-spacing:.04em;padding:8px 28px 8px 10px;cursor:pointer;border-radius:0;background-image:linear-gradient(45deg,transparent 50%,var(--ink) 50%),linear-gradient(135deg,var(--ink) 50%,transparent 50%);background-position:calc(100% - 12px) 50%,calc(100% - 8px) 50%;background-size:4px 4px,4px 4px;background-repeat:no-repeat}.language-select:focus{outline:2px solid var(--accent);outline-offset:2px}@media(max-width:760px){.language-select{font-size:9px;padding:7px 26px 7px 9px}}`;
    document.head.appendChild(style);
  }
}
buildLanguageSelector();

function applySocialHeadingSpacing() {
  if (document.getElementById('social-heading-spacing')) return;
  const style = document.createElement('style');
  style.id = 'social-heading-spacing';
  style.textContent = `.social.section .section-head h2{line-height:1.12}`;
  document.head.appendChild(style);
}
applySocialHeadingSpacing();

function esc(value = '') { return String(value).replace(/[&<>'\"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'}[ch])); }
function tagsToStrings(tags) { return Array.isArray(tags) ? tags.map(tag => typeof tag === 'string' ? tag : tag?.name).filter(Boolean) : []; }
function getPrefixedTag(tags, prefix) { const lower=prefix.toLowerCase(); const found=tags.find(tag=>tag.toLowerCase().startsWith(`${lower}:`)||tag.toLowerCase().startsWith(`${lower}=`)); if(!found)return ''; return found.slice(found.indexOf(':')>=0?found.indexOf(':')+1:found.indexOf('=')+1).trim(); }
function inferCategory(item) { const tags=tagsToStrings(item.tags); const explicit=getPrefixedTag(tags,'category'); if(explicit){const exact=categoryAliases.find(entry=>entry.label.toLowerCase()===explicit.toLowerCase()); return exact?exact.label:explicit;} const haystack=`${item.name||''} ${item.description||''} ${tags.join(' ')}`.toLowerCase(); const match=categoryAliases.find(entry=>entry.keys.some(key=>haystack.includes(key))); return match?match.label:'Corporate'; }
function getThumb(item) { const sizes=item?.pictures?.sizes||[]; if(!sizes.length)return ''; return [...sizes].sort((a,b)=>(b.width||0)-(a.width||0))[0]?.link||sizes[sizes.length-1]?.link||''; }
function normalize(item) { const tags=tagsToStrings(item.tags); const date=item.release_time||item.created_time||''; const id=String(item.uri||'').split('/').filter(Boolean).pop()||''; return {id,name:item.name||uiText.untitled,link:item.link||(id?`https://vimeo.com/${id}`:'#'),client:getPrefixedTag(tags,'client'),category:inferCategory(item),year:date?new Date(date).getFullYear():'',thumb:getThumb(item)}; }
function render(filter='All') { const visible=filter==='All'?works:works.filter(work=>work.category===filter); if(!visible.length){grid.innerHTML=works.length?`<div class="empty-state">${uiText.categoryEmpty}</div>`:`<div class="empty-state">${uiText.preparing}</div>`;return;} grid.innerHTML=visible.map(work=>`<a class="film-card" href="${esc(work.link)}" target="_blank" rel="noreferrer"><div class="film-thumb">${work.thumb?`<img src="${esc(work.thumb)}" alt="${esc(work.name)}" loading="lazy">`:''}</div><div class="film-meta"><div><div class="film-category">${esc((categoryDisplay[locale]||categoryDisplay.en)[work.category]||work.category)}</div><h3>${esc(work.name)}</h3>${work.client?`<p class="film-client">${esc(work.client)}</p>`:''}</div><div class="film-year">${esc(work.year)}</div></div></a>`).join(''); }
async function loadVimeo(){try{const response=await fetch(`/api/vimeo?t=${Date.now()}`,{cache:'no-store',headers:{Accept:'application/json'}});const payload=await response.json().catch(()=>({}));if(!response.ok)throw new Error(payload?.error||`HTTP ${response.status}`);works=(payload.data||[]).map(normalize).filter(item=>item.link&&item.name);if(countEl)countEl.textContent=String(works.length).padStart(2,'0');statusEl.textContent=works.length?uiText.loaded(works.length):uiText.preparing;render('All');}catch(error){console.error('Vimeo load failed:',error);if(countEl)countEl.textContent='—';statusEl.textContent=uiText.loadError;statusEl.classList.add('is-error');grid.innerHTML=`<div class="empty-state">${uiText.loadError}</div>`;}}
filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(item=>item.classList.remove('active'));button.classList.add('active');render(button.dataset.filter||'All');}));
loadVimeo();