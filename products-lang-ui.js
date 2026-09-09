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
    wrap.classList.add('langButtonGroup');
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('aria-label', 'Language selection');

    // The base i18n switch uses slash separators. A button group does not need them.
    [...wrap.querySelectorAll('span')].forEach(separator => {
      separator.hidden = true;
      separator.setAttribute('aria-hidden', 'true');
    });

    function sync() {
      const current = localStorage.getItem('sf-products-lang') || 'ja';
      buttons.forEach(button => {
        const code = button.dataset.lang;
        const active = code === current || button.classList.contains('active');
        button.classList.add('langChoiceButton');
        button.textContent = labels[code] || code.toUpperCase();
        button.setAttribute('aria-label', labels[code] || code.toUpperCase());
        button.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
    }

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        requestAnimationFrame(sync);
      });
    });

    sync();
  }

  const style = document.createElement('style');
  style.textContent = `
    .langSwitch.langButtonGroup{
      display:inline-flex!important;
      align-items:center!important;
      gap:5px!important;
      margin-left:4px!important;
      white-space:nowrap;
    }
    .langSwitch.langButtonGroup > span{
      display:none!important;
    }
    .langSwitch.langButtonGroup .langChoiceButton{
      display:inline-flex!important;
      align-items:center;
      justify-content:center;
      min-height:30px;
      border:1px solid var(--line)!important;
      background:#fff!important;
      color:var(--muted)!important;
      padding:6px 9px!important;
      border-radius:4px;
      font-size:10px!important;
      line-height:1;
      letter-spacing:.03em!important;
      text-transform:none!important;
      cursor:pointer;
      transition:border-color .15s ease,background .15s ease,color .15s ease;
    }
    .langSwitch.langButtonGroup .langChoiceButton:hover{
      border-color:var(--accent)!important;
      color:var(--accent-dark)!important;
    }
    .langSwitch.langButtonGroup .langChoiceButton.active,
    .langSwitch.langButtonGroup .langChoiceButton[aria-pressed="true"]{
      border-color:var(--accent)!important;
      background:var(--accent)!important;
      color:#fff!important;
    }
    @media(max-width:900px){
      .langSwitch.langButtonGroup{
        flex:0 0 auto;
      }
    }
    @media(max-width:640px){
      .langSwitch.langButtonGroup{
        gap:4px!important;
      }
      .langSwitch.langButtonGroup .langChoiceButton{
        min-height:28px;
        padding:5px 7px!important;
        font-size:9px!important;
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
