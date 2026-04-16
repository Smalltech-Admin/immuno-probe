(function(){
  const STORAGE_KEY='immunoprobe-lang';
  const DEFAULT_LANG='ja';

  function getLang(){
    return localStorage.getItem(STORAGE_KEY)||DEFAULT_LANG;
  }

  function setLang(lang){
    localStorage.setItem(STORAGE_KEY,lang);
    applyLang(lang);
    syncSelects(lang);
  }

  function applyLang(lang){
    if(typeof TRANSLATIONS==='undefined')return;
    const t=TRANSLATIONS[lang]||TRANSLATIONS[DEFAULT_LANG];
    if(!t)return;
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      const key=el.getAttribute('data-i18n');
      if(t[key]!==undefined){
        if(el.tagName==='INPUT'&&el.type!=='submit'){
          el.placeholder=t[key];
        }else if(el.tagName==='OPTION'){
          el.textContent=t[key];
        }else{
          el.innerHTML=t[key];
        }
      }
    });
    document.documentElement.lang=lang==='zh'?'zh-CN':lang==='hi'?'hi':lang;
  }

  function syncSelects(lang){
    document.querySelectorAll('#langSelect,#langSelectMobile,#langSelectFooter').forEach(function(s){
      if(s)s.value=lang;
    });
  }

  window.handleLang=function(lang){
    if(lang===getLang())return;
    setLang(lang);
  };

  document.addEventListener('DOMContentLoaded',function(){
    const lang=getLang();
    syncSelects(lang);
    if(lang!==DEFAULT_LANG)applyLang(lang);
  });
})();
