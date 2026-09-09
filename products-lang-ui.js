(() => {
  const labels = {ja:'日本語', en:'English', es:'Español', zh:'中文', ko:'한국어'};
  const short = {ja:'JA', en:'EN', es:'ES', zh:'ZH', ko:'KO'};

  function enhance(){
    const wrap = document.querySelector('.langSwitch');
    if(!wrap || wrap.dataset.enhanced === '1') return;
    wrap.dataset.enhanced = '1';
    const originalButtons = [...wrap.querySelectorAll('button[data-lang]')];
    if(!originalButtons.length) return;

    originalButtons.forEach(b => b.style.display = 'none');
    [...wrap.querySelectorAll('span')].forEach(s => s.style.display = 'none');

    const picker = document.createElement('div');
    picker.className = 'langPicker';

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'langPickerTrigger';
    trigger.setAttribute('aria-haspopup','true');
    trigger.setAttribute('aria-expanded','false');

    const menu = document.createElement('div');
    menu.className = 'langPickerMenu';
    menu.hidden = true;

    function current(){
      return localStorage.getItem('sf-products-lang') || 'ja';
    }
    function sync(){
      const lang = current();
      trigger.textContent = `Language: ${short[lang] || 'JA'} ▾`;
      menu.querySelectorAll('button[data-lang-choice]').forEach(b => {
        const active = b.dataset.langChoice === lang;
        b.classList.toggle('active', active);
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
    }

    originalButtons.forEach(src => {
      const code = src.dataset.lang;
      const b = document.createElement('button');
      b.type = 'button';
      b.dataset.langChoice = code;
      b.textContent = labels[code] || code.toUpperCase();
      b.addEventListener('click', () => {
        src.click();
        menu.hidden = true;
        trigger.setAttribute('aria-expanded','false');
        setTimeout(sync, 0);
      });
      menu.appendChild(b);
    });

    trigger.addEventListener('click', e => {
      e.stopPropagation();
      menu.hidden = !menu.hidden;
      trigger.setAttribute('aria-expanded', menu.hidden ? 'false' : 'true');
    });
    document.addEventListener('click', e => {
      if(!picker.contains(e.target)){
        menu.hidden = true;
        trigger.setAttribute('aria-expanded','false');
      }
    });

    picker.append(trigger, menu);
    wrap.appendChild(picker);
    sync();
  }

  const style = document.createElement('style');
  style.textContent = `
    .langSwitch{position:relative;display:inline-flex!important;align-items:center!important;margin-left:4px!important}
    .langPicker{position:relative}
    .langPickerTrigger{border:1px solid var(--ink)!important;background:#fff!important;color:var(--ink)!important;padding:8px 11px!important;font-size:10px!important;letter-spacing:.08em!important;text-transform:uppercase;cursor:pointer;white-space:nowrap}
    .langPickerTrigger:hover{border-color:var(--accent)!important;color:var(--accent-dark)!important}
    .langPickerMenu{position:absolute;right:0;top:calc(100% + 7px);z-index:50;min-width:150px;background:#fff;border:1px solid var(--ink);box-shadow:0 10px 28px rgba(0,0,0,.1);padding:4px}
    .langPickerMenu[hidden]{display:none}
    .langPickerMenu button{display:block!important;width:100%;border:0!important;background:#fff!important;color:var(--ink)!important;text-align:left;padding:9px 10px!important;font-size:11px!important;letter-spacing:.03em!important;cursor:pointer}
    .langPickerMenu button:hover,.langPickerMenu button.active{background:var(--soft)!important;color:var(--accent-dark)!important}
    @media(max-width:640px){.langPickerTrigger{padding:7px 9px!important;font-size:9px!important}.langPickerMenu{right:0;min-width:138px}}
  `;
  document.head.appendChild(style);

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', enhance);
  else enhance();
  setTimeout(enhance, 100);
})();