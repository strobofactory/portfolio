(() => {
  const labels = {
    ja: '日本語',
    en: 'English',
    es: 'Español',
    zh: '中文',
    ko: '한국어'
  };

  function enhance() {
    const wrap = document.querySelector('.langSwitch');
    if (!wrap || wrap.dataset.enhanced === '1') return;

    const buttons = [...wrap.querySelectorAll('button[data-lang]')];
    if (!buttons.length) return;

    wrap.dataset.enhanced = '1';
    wrap.classList.add('langSelectWrap');
    wrap.setAttribute('aria-label', 'Language selection');

    buttons.forEach(button => {
      button.hidden = true;
      button.setAttribute('aria-hidden', 'true');
      button.tabIndex = -1;
    });

    [...wrap.querySelectorAll('span')].forEach(separator => {
      separator.hidden = true;
      separator.setAttribute('aria-hidden', 'true');
    });

    const select = document.createElement('select');
    select.className = 'langSelect';
    select.setAttribute('aria-label', 'Language');

    buttons.forEach(button => {
      const code = button.dataset.lang;
      const option = document.createElement('option');
      option.value = code;
      option.textContent = labels[code] || code.toUpperCase();
      select.appendChild(option);
    });

    function sync() {
      const current = localStorage.getItem('sf-products-lang') || 'ja';
      if ([...select.options].some(option => option.value === current)) {
        select.value = current;
      }
    }

    select.addEventListener('change', () => {
      const target = buttons.find(button => button.dataset.lang === select.value);
      if (target) target.click();
      requestAnimationFrame(sync);
    });

    wrap.appendChild(select);
    sync();
  }

  const style = document.createElement('style');
  style.textContent = `
    .langSwitch.langSelectWrap{
      display:inline-flex!important;
      align-items:center!important;
      margin-left:4px!important;
      white-space:nowrap;
    }
    .langSwitch.langSelectWrap > button,
    .langSwitch.langSelectWrap > span{
      display:none!important;
    }
    .langSelect{
      width:104px;
      height:31px;
      border:1px solid var(--ink);
      border-radius:0;
      background:#fff;
      color:var(--ink);
      padding:0 30px 0 11px;
      font:inherit;
      font-size:10px;
      letter-spacing:.02em;
      line-height:1;
      cursor:pointer;
      outline:none;
    }
    .langSelect:hover,
    .langSelect:focus{
      border-color:var(--accent-dark);
    }
    @media(max-width:640px){
      .langSelect{
        width:96px;
        height:30px;
        padding-left:9px;
        font-size:9px;
      }
    }
  `;
  document.head.appendChild(style);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhance);
  } else {
    enhance();
  }
  setTimeout(enhance, 100);
})();
