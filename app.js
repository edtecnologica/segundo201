(() => {
'use strict';
const DATA = window.EXPO_DATA;
const $ = (selector,root=document)=>root.querySelector(selector);
const grid=$('#project-grid');
const modal=$('#project-modal');
const modalBody=$('#modal-body');
const lightbox=$('#lightbox');
let active=null, extra=null, viewMode='model', modelIndex=0, photoIndex=0, posterIndex=0, viewer=null, activeFilter='all';
const photo=n=>`assets/fotos/${String(n).padStart(2,'0')}.webp`;
const iconSvg=(id)=>id===4?`<svg viewBox="0 0 100 100" aria-hidden="true"><rect x="15" y="29" width="70" height="53" rx="2"/><path d="M15 37h70M30 29v-11h40v11M29 54h42M29 65h26"/></svg>`:`<svg viewBox="0 0 100 100" aria-hidden="true"><rect x="17" y="36" width="66" height="42"/><path d="M29 36v-15h42v15M16 54h68M34 68h32M37 20h26"/><circle cx="72" cy="25" r="3"/></svg>`;
function renderCards(){
 grid.innerHTML=DATA.projects.map(p=>{
 const picture=p.cover===null?`<div class="project-abstract">${iconSvg(p.id)}</div>`:`<img src="${photo(p.cover)}" alt="Fotografía del proyecto ${p.short}" loading="lazy">`;
 let label=p.models.length?'Modelo 3D · Fotografías':p.posters.length?'Afiche digitalizado':'Consigna disponible';
 return `<article class="project-card" data-id="${p.id}" data-model="${p.models.length?1:0}" data-poster="${p.posters.length?1:0}">
  <div class="project-card-photo">${picture}<span class="project-number">GRUPO ${String(p.id).padStart(2,'0')}</span></div>
  <div class="project-card-body"><span class="card-tag">${p.short}</span><h3>${p.title}</h3><p>${p.topic}</p>
  <div class="card-bottom"><small>${label}</small><button aria-label="Explorar grupo ${p.id}: ${p.title}" data-open="${p.id}">Explorar <span>↗</span></button></div></div></article>`}).join('');filterCards();
}
function filterCards(){const q=$('#project-search').value.trim().toLocaleLowerCase('es');let count=0;$$('.project-card').forEach(c=>{const p=DATA.projects.find(x=>x.id===Number(c.dataset.id));let match=(activeFilter==='all'||(activeFilter==='models'&&p.models.length)||(activeFilter==='posters'&&p.posters.length));match=match&&`${p.title} ${p.topic} ${p.short} ${p.chosen}`.toLocaleLowerCase('es').includes(q);c.hidden=!match;if(match)count++});$('#no-results').hidden=count>0}
function $$(s,root=document){return [...root.querySelectorAll(s)]}
function openProject(p){active=p;extra=null;modelIndex=0;photoIndex=0;posterIndex=0;viewMode=p.models.length?'model':p.photos.length?'photo':p.posters.length?'poster':'empty';renderDetail();showModal();history.replaceState(null,'',location.pathname+location.search+`#grupo-${p.id}`)}
function openExtra(which){extra=which;active=null;photoIndex=0;posterIndex=0;modelIndex=0;viewMode=which==='prototype'?'model':'poster';renderDetail();showModal();history.replaceState(null,'',location.pathname+location.search+`#archivo-${which}`)}
function showModal(){modal.hidden=false;modal.setAttribute('aria-hidden','false');document.body.classList.add('body-modal-open');$('.modal-content').scrollTop=0;$('.modal-content').focus()}
function closeModal(){destroyViewer();modal.hidden=true;modal.setAttribute('aria-hidden','true');document.body.classList.remove('body-modal-open');active=null;extra=null;history.replaceState(null,'',location.pathname+location.search+'#proyectos')}
function destroyViewer(){if(viewer){viewer.destroy();viewer=null}}
function textCard(kicker,title,content,css=''){return `<section class="info-card ${css}"><div class="info-kicker">${kicker}</div>${title?`<h3>${title}</h3>`:''}${content}</section>`}
function para(v){return `<p>${v}</p>`}
function renderDetail(){
 const p=active;
 if(p){
  $('#modal-group').textContent=`GRUPO ${String(p.id).padStart(2,'0')}`;
  const options=p.options.length?textCard('Alternativas consideradas','Ideas que se pusieron sobre la mesa',`<ul>${p.options.map(x=>`<li>${x}</li>`).join('')}</ul>`):'';
  const evalText=p.evaluation?textCard('Evaluación',null,para(p.evaluation)):'';
  const posterContent=p.posters.length?`<div class="poster-grid">${p.posters.map((n,i)=>`<button class="poster-item" data-lightbox="${n}" aria-label="Ampliar afiche ${i+1} del grupo ${p.id}"><img src="${photo(n)}" alt="Afiche ${i+1} del grupo ${p.id}" loading="lazy"></button>`).join('')}</div>`:'';
  const posterCard=p.posters.length?textCard('Afiches del grupo','Los originales, para consultar',`${para('Podés abrir cada afiche para leerlo en tamaño grande. Sus contenidos principales aparecen escritos en esta ficha.')}${posterContent}`):textCard('Registro documental',null,para('No se identificó un afiche de este grupo en el material recibido.'));
  modalBody.innerHTML=`<header class="modal-title-area"><div class="eyebrow"><span class="eyebrow-line"></span> EDUCACIÓN TECNOLÓGICA / SEGUNDO AÑO</div><h2>${p.title}</h2><p>${p.context}</p></header>
  <div class="view-layout"><div class="viewer-column"><section class="viewer-main" aria-label="Explorador de la maqueta"><div class="view-tabs">${renderTabs()}</div><div class="viewer-surface" id="viewer-surface"></div><div class="viewer-bottom" id="viewer-bottom"></div></section><div class="photo-strip" id="photo-strip"></div><div class="gallery-caption" id="gallery-caption"></div></div>
  <div class="info-column">${textCard('Situación problemática','El desafío',para(p.challenge),'highlight')}
  ${textCard('Solución elegida','Lo que diseñaron',para(p.chosen),'quote')}${options}
  ${textCard('Construcción y organización',null,para(p.process))}${evalText}${posterCard}
  ${textCard('Sobre el modelo virtual',null,para(p.notes),'')}
  <p class="doc-note">Información construida a partir de la consigna del grupo, los afiches legibles y las fotografías proporcionadas. Las recreaciones 3D no son escaneos fotogramétricos.</p>
  </div></div>`;
 } else if(extra==='prototype'){
  $('#modal-group').textContent='ARCHIVO VISUAL';
  const a=DATA.extra;
  modalBody.innerHTML=`<header class="modal-title-area"><div class="eyebrow"><span class="eyebrow-line"></span> MATERIAL SIN GRUPO CONFIRMADO</div><h2>${a.title}</h2><p>${a.description}</p></header><div class="view-layout"><div class="viewer-column"><section class="viewer-main"><div class="view-tabs">${renderTabs()}</div><div class="viewer-surface" id="viewer-surface"></div><div class="viewer-bottom" id="viewer-bottom"></div></section><div class="photo-strip" id="photo-strip"></div><div class="gallery-caption" id="gallery-caption"></div></div><div class="info-column">${textCard('Material recibido','Espacio con bancos y estantes',para('Se observa una base amarilla, paredes blancas, dos elementos largos a modo de bancos o apoyos, y pequeños estantes en los muros.'),'highlight')}${textCard('Correspondencia pendiente','Sin atribución confirmada',para('No hay información que permita vincular con certeza esta maqueta con uno de los grupos del documento. Por eso se presenta aparte.'))}${textCard('Recreación virtual',null,para('La geometría 3D fue interpretada visualmente a partir de las fotos. No reproduce cada detalle real.'))}</div></div>`;
 } else {
  $('#modal-group').textContent='AFICHE COMPLEMENTARIO';
  const a=DATA.additionalPoster;
  modalBody.innerHTML=`<header class="modal-title-area"><div class="eyebrow"><span class="eyebrow-line"></span> OTRO MATERIAL DEL ARCHIVO</div><h2>${a.title}</h2><p>${a.description}</p></header><div class="view-layout"><div class="viewer-column"><section class="viewer-main"><div class="view-tabs"><button class="view-tab active" data-view="poster">Afiche original</button></div><div class="viewer-surface" id="viewer-surface"></div><div class="viewer-bottom" id="viewer-bottom"></div></section><div class="gallery-caption">Fotografía original incluida en el ZIP.</div></div><div class="info-column">${textCard('Transcripción del afiche','¿Qué es una esfera de Dyson?',para('Una esfera de Dyson es una estructura hipotética pensada para captar energía de una estrella. El afiche la relaciona con civilizaciones avanzadas y con la escala de Kardashev.'),'highlight')}${textCard('Aportes mencionados','Freeman Dyson',para('El afiche indica que la idea fue propuesta en 1960 por el físico y matemático Freeman Dyson. También aclara que no tendría que ser una esfera sólida: podría consistir en satélites, anillos u otros componentes que capten energía estelar.'))}${textCard('Nota del archivo',null,para('Este afiche se conserva como material complementario. No lo atribuimos a ninguno de los siete grupos porque su temática es diferente.'))}</div></div>`;
 }
 renderSurface();
}
function renderTabs(){
 const hasModel=active?!!active.models.length:extra==='prototype';
 const hasPhotos=active?!!active.photos.length:extra==='prototype';
 const hasPoster=active?!!active.posters.length:extra==='dyson';
 return `${hasModel?`<button data-view="model" class="view-tab ${viewMode==='model'?'active':''}">↻ Modelo 3D</button>`:''}${hasPhotos?`<button data-view="photo" class="view-tab ${viewMode==='photo'?'active':''}">▧ Fotografías</button>`:''}${hasPoster?`<button data-view="poster" class="view-tab ${viewMode==='poster'?'active':''}">▤ Afiche</button>`:''}${!(hasModel||hasPhotos||hasPoster)?'<button class="view-tab active">Información</button>':''}`
}
function currentPhotos(){return active?active.photos:extra==='prototype'?DATA.extra.photos:[]}
function currentPosters(){return active?active.posters:extra==='dyson'?[DATA.additionalPoster.photo]:[]}
function currentModels(){return active?active.models:extra==='prototype'?[{name:'Espacio de aula',type:DATA.extra.model}]:[]}
function renderSurface(){destroyViewer();const surface=$('#viewer-surface');if(!surface)return;const ph=currentPhotos(),po=currentPosters(),mo=currentModels();
 if(viewMode==='model'&&mo.length){surface.innerHTML='<canvas id="model-canvas" role="img" aria-label="Modelo tridimensional aproximado. Usá el mouse o el dedo para girarlo."></canvas>';viewer=new Technology3D.Viewer($('#model-canvas'),mo[modelIndex].type);}
 else if(viewMode==='photo'&&ph.length){const i=ph[photoIndex];surface.innerHTML=`<img class="viewer-photo" id="main-photo" draggable="false" src="${photo(i)}" alt="Vista ${photoIndex+1} de ${ph.length} de la maqueta"><button class="photo-open" data-lightbox="${i}" aria-label="Ampliar fotografía" style="position:absolute;right:14px;top:14px;border:0;background:#fffef5;color:#76263d;font-weight:900;padding:9px 12px">Ampliar ↗</button>`;setupPhotoSwipe();}
 else if(viewMode==='poster'&&po.length){let id=po[posterIndex];surface.innerHTML=`<img class="viewer-photo" style="background:#eee3df" src="${photo(id)}" alt="Afiche del proyecto"><button data-lightbox="${id}" style="position:absolute;right:14px;top:14px;border:0;background:#fffef5;color:#76263d;font-weight:900;padding:9px 12px">Ampliar ↗</button>`;}
 else{surface.innerHTML='<div class="viewer-empty">Este proyecto todavía no tiene una maqueta 3D verificada.<small>Podés conocer la consigna y consultar su afiche, si está disponible, en la ficha digitalizada.</small></div>'}
 if($$('.view-tab').length>0)$$('.view-tab').forEach(t=>t.classList.toggle('active',t.dataset.view===viewMode));
 const bottom=$('#viewer-bottom');if(bottom){if(viewMode==='model'&&mo.length){bottom.innerHTML=`<span class="viewer-tip"><b>Arrastrá para girar</b> · Rueda para acercar</span><div class="viewer-controls">${mo.length>1?`<select class="model-select" id="model-picker" aria-label="Elegir modelo">${mo.map((m,i)=>`<option value="${i}" ${i===modelIndex?'selected':''}>${m.name}</option>`).join('')}</select>`:''}<button class="mini-button" data-action="zoom-out" aria-label="Alejar">−</button><button class="mini-button" data-action="zoom-in" aria-label="Acercar">＋</button><button class="mini-button" data-action="reset">↻ Reiniciar</button></div>`}
 else if(viewMode==='photo'&&ph.length){bottom.innerHTML=`<span class="viewer-tip"><b>Vista ${photoIndex+1} de ${ph.length}</b> · Fotos reales</span><div class="viewer-controls"><button class="mini-button" data-action="prev-photo" aria-label="Foto anterior">←</button><button class="mini-button" data-action="next-photo" aria-label="Foto siguiente">→</button></div>`}
 else if(viewMode==='poster'&&po.length){bottom.innerHTML=`<span class="viewer-tip"><b>Afiche ${posterIndex+1} de ${po.length}</b> · Registro original</span><div class="viewer-controls"><button class="mini-button" data-action="prev-poster" ${po.length<2?'disabled':''}>←</button><button class="mini-button" data-action="next-poster" ${po.length<2?'disabled':''}>→</button></div>`}
 else bottom.innerHTML='<span class="viewer-tip">Consigna y registros documentales</span>'}
 const strip=$('#photo-strip'),caption=$('#gallery-caption');if(strip){strip.innerHTML=ph.length?ph.map((n,i)=>`<button class="photo-thumb ${viewMode==='photo'&&photoIndex===i?'selected':''}" data-photo-index="${i}" aria-label="Ver fotografía ${i+1}"><img src="${photo(n)}" alt="" loading="lazy"></button>`).join(''):'';if(caption)caption.textContent=ph.length?'Fotografías del prototipo desde distintos ángulos. Tocá una miniatura para ampliar la vista.':'Sin fotografías asociadas con certeza a este grupo.';}
}
function setupPhotoSwipe(){const im=$('#main-photo');if(!im)return;let sx=null;im.addEventListener('pointerdown',e=>{sx=e.clientX});im.addEventListener('pointerup',e=>{if(sx===null)return;const delta=e.clientX-sx;if(Math.abs(delta)>28)movePhoto(delta>0?-1:1);sx=null})}
function movePhoto(dir){const arr=currentPhotos();if(!arr.length)return;photoIndex=(photoIndex+dir+arr.length)%arr.length;viewMode='photo';renderSurface()}
function movePoster(dir){const arr=currentPosters();if(!arr.length)return;posterIndex=(posterIndex+dir+arr.length)%arr.length;viewMode='poster';renderSurface()}
function openLightbox(n){$('#lightbox-image').src=photo(n);$('#lightbox-caption').textContent=String(n===DATA.additionalPoster.photo?'Afiche complementario':n>=60?'Afiche original de los estudiantes':'Fotografía original de la maqueta');lightbox.hidden=false}
function closeLightbox(){lightbox.hidden=true;$('#lightbox-image').removeAttribute('src')}
function init(){
 renderCards();$('#method-steps').innerHTML=DATA.method.map(s=>`<article class="method-step"><span>${s.number}</span><h3>${s.title}</h3><p>${s.text}</p></article>`).join('');
 $$('.filter').forEach(b=>b.addEventListener('click',()=>{activeFilter=b.dataset.filter;$$('.filter').forEach(t=>{t.classList.toggle('active',t===b);t.setAttribute('aria-pressed',String(t===b))});filterCards()}));
 $('#project-search').addEventListener('input',filterCards);
 document.addEventListener('click',e=>{const card=e.target.closest('.project-card');if(card&&e.target.closest('[data-open]')){openProject(DATA.projects.find(p=>p.id===Number(card.dataset.id)));return}const arch=e.target.closest('[data-extra]');if(arch){openExtra(arch.dataset.extra);return}const lb=e.target.closest('[data-lightbox]');if(lb){openLightbox(Number(lb.dataset.lightbox));return}if(e.target.closest('[data-close="modal"]')){closeModal();return}const tab=e.target.closest('[data-view]');if(tab&&modal.contains(tab)){viewMode=tab.dataset.view;renderSurface();return}const thumb=e.target.closest('[data-photo-index]');if(thumb){photoIndex=Number(thumb.dataset.photoIndex);viewMode='photo';renderSurface();return}const act=e.target.closest('[data-action]');if(act&&modal.contains(act)){const which=act.dataset.action;if(which==='prev-photo')movePhoto(-1);if(which==='next-photo')movePhoto(1);if(which==='prev-poster')movePoster(-1);if(which==='next-poster')movePoster(1);if(which==='reset'&&viewer)viewer.reset();if(which==='zoom-in'&&viewer)viewer.zoom=Math.min(1.9,viewer.zoom+.15);if(which==='zoom-out'&&viewer)viewer.zoom=Math.max(.6,viewer.zoom-.15);}});
 document.addEventListener('change',e=>{if(e.target.id==='model-picker'){modelIndex=Number(e.target.value);viewMode='model';renderSurface()}});
 $('#close-lightbox').addEventListener('click',closeLightbox);lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!lightbox.hidden){closeLightbox();return}if(!modal.hidden)closeModal()}if(!modal.hidden&&lightbox.hidden&&viewMode==='photo'&&e.key==='ArrowRight')movePhoto(1);if(!modal.hidden&&lightbox.hidden&&viewMode==='photo'&&e.key==='ArrowLeft')movePhoto(-1)});
 window.addEventListener('resize',()=>{if(viewer)viewer.resize()});
 let m=location.hash.match(/^#grupo-(\d)$/);if(m){const p=DATA.projects.find(x=>x.id===Number(m[1]));if(p)openProject(p)}
}
document.addEventListener('DOMContentLoaded',init);
})();
