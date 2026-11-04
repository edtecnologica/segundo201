/* Muestra digital autónoma. Información basada en los afiches y las consignas aportadas por la escuela.
   Visor: secuencia de fotografías recortadas del prototipo. No genera una malla 3D. */
(() => {
'use strict';
const PHOTOS = {"1": ["assets/maquetas_sin_fondo/g1_00.webp", "assets/maquetas_sin_fondo/g1_01.webp", "assets/maquetas_sin_fondo/g1_02.webp", "assets/maquetas_sin_fondo/g1_03.webp", "assets/maquetas_sin_fondo/g1_04.webp", "assets/maquetas_sin_fondo/g1_05.webp", "assets/maquetas_sin_fondo/g1_06.webp", "assets/maquetas_sin_fondo/g1_07.webp", "assets/maquetas_sin_fondo/g1_08.webp"], "2": ["assets/maquetas_sin_fondo/g2_00.webp", "assets/maquetas_sin_fondo/g2_01.webp", "assets/maquetas_sin_fondo/g2_02.webp", "assets/maquetas_sin_fondo/g2_03.webp", "assets/maquetas_sin_fondo/g2_04.webp", "assets/maquetas_sin_fondo/g2_05.webp", "assets/maquetas_sin_fondo/g2_06.webp", "assets/maquetas_sin_fondo/g2_07.webp", "assets/maquetas_sin_fondo/g2_08.webp"], "3": ["assets/maquetas_sin_fondo/g3_00.webp", "assets/maquetas_sin_fondo/g3_01.webp", "assets/maquetas_sin_fondo/g3_02.webp", "assets/maquetas_sin_fondo/g3_03.webp", "assets/maquetas_sin_fondo/g3_04.webp", "assets/maquetas_sin_fondo/g3_05.webp", "assets/maquetas_sin_fondo/g3_06.webp", "assets/maquetas_sin_fondo/g3_07.webp", "assets/maquetas_sin_fondo/g3_08.webp"], "5": ["assets/maquetas_sin_fondo/g5_00.webp", "assets/maquetas_sin_fondo/g5_01.webp", "assets/maquetas_sin_fondo/g5_02.webp", "assets/maquetas_sin_fondo/g5_03.webp", "assets/maquetas_sin_fondo/g5_04.webp", "assets/maquetas_sin_fondo/g5_05.webp", "assets/maquetas_sin_fondo/g5_06.webp", "assets/maquetas_sin_fondo/g5_07.webp", "assets/maquetas_sin_fondo/g5_08.webp", "assets/maquetas_sin_fondo/g5_09.webp"], "6": ["assets/maquetas_sin_fondo/g6_00.webp", "assets/maquetas_sin_fondo/g6_01.webp", "assets/maquetas_sin_fondo/g6_02.webp", "assets/maquetas_sin_fondo/g6_03.webp", "assets/maquetas_sin_fondo/g6_04.webp", "assets/maquetas_sin_fondo/g6_05.webp", "assets/maquetas_sin_fondo/g6_06.webp", "assets/maquetas_sin_fondo/g6_07.webp", "assets/maquetas_sin_fondo/g6_08.webp", "assets/maquetas_sin_fondo/g6_09.webp", "assets/maquetas_sin_fondo/g6_10.webp", "assets/maquetas_sin_fondo/g6_11.webp", "assets/maquetas_sin_fondo/g6_12.webp", "assets/maquetas_sin_fondo/g6_13.webp"], "7": ["assets/maquetas_sin_fondo/g7_00.webp", "assets/maquetas_sin_fondo/g7_01.webp", "assets/maquetas_sin_fondo/g7_02.webp", "assets/maquetas_sin_fondo/g7_03.webp", "assets/maquetas_sin_fondo/g7_04.webp", "assets/maquetas_sin_fondo/g7_05.webp", "assets/maquetas_sin_fondo/g7_06.webp", "assets/maquetas_sin_fondo/g7_07.webp", "assets/maquetas_sin_fondo/g7_08.webp", "assets/maquetas_sin_fondo/g7_09.webp"]};
const A = 'assets/';
const assetURL = path => (path.startsWith('assets/') ? path : A + path);
const PROJECTS = [
  {id:1,title:'Un lugar para sentarse',short:'Bancos y asientos para aprovechar mejor los recreos.',category:'PATIO Y CONVIVENCIA',problem:'¿Cómo podríamos diseñar un lugar cómodo, resistente y seguro para que los estudiantes puedan sentarse y aprovechar mejor el patio escolar?',intro:'Ante la falta de espacios para sentarse en los recreos, el grupo investigó y comparó distintas propuestas de bancos y mesas.',model:[{type:'chair',label:'Asiento construido'}],photos:PHOTOS[1],cutout:'recortes/g1.webp',featured:7,posters:['afiches/grupo_1.webp'],alt:['Bancos que se puedan trasladar de un lugar a otro con mayor facilidad.','Incorporar mesas y bancos destinados a comer y descansar.','Mesas redondas rodeadas de bancos de cemento.'],chosen:'El afiche señala como elegida la primera alternativa. La maqueta fotografiada representa un asiento realizado con cartón.',process:'En la evaluación, el grupo explica que compartieron propuestas, buscaron materiales, realizaron bocetos y se distribuyeron las tareas de corte, pintura y armado.',eval:'La evaluación del afiche describe cómo organizaron el trabajo y construyeron la silla.',source:'Afiche del grupo 1 y consigna docente.'},
  {id:2,title:'Un aula con más espacio',short:'Distribución del mobiliario y circulación dentro del aula.',category:'ESPACIOS ESCOLARES',problem:'¿Cómo podríamos organizar el aula para aprovechar mejor el espacio y facilitar la circulación, el trabajo y la seguridad?',intro:'La propuesta parte de aulas con espacio reducido que dificultan la circulación y la organización de actividades.',model:[{type:'whiteRoom',label:'Distribución del aula'}],photos:PHOTOS[2],cutout:'recortes/g2.webp',featured:1,posters:[],alt:[],chosen:'La maqueta muestra una representación de un sector del aula con mobiliario y espacios interiores.',process:'La consigna invitó a investigar alternativas, elegir una, diseñar la distribución final y construir una maqueta.',eval:'',source:'Consigna docente y fotografías de la maqueta.'},
  {id:3,title:'Temperaturas en el aula',short:'Alternativas para mejorar el confort térmico.',category:'CONFORT Y ENERGÍA',problem:'¿Qué solución podríamos crear para que las aulas sean más frescas en verano y más cálidas en invierno?',intro:'El grupo abordó las dificultades que provocan el calor en verano y el frío en invierno, imaginando soluciones para mejorar las condiciones térmicas.',model:[{type:'ac',label:'Mini aire acondicionado'},{type:'solar',label:'Horno solar'}],photos:PHOTOS[3],cutout:'recortes/g3.webp',featured:3,posters:['afiches/grupo_3.webp'],alt:['Paneles aislantes y ventanas con parasoles.','Cortinas térmicas y zonas de sombra en el exterior del aula.','Horno solar y mini aire acondicionado.'],chosen:'El afiche indica que eligieron representar dos propuestas: el mini aire acondicionado y el horno solar.',process:'Las fotografías permiten recorrer los dos prototipos y la base sobre la que fueron presentados.',eval:'',source:'Afiche del grupo 3, consigna docente y fotografías.'},
  {id:4,title:'Objetos perdidos',short:'Una propuesta para recuperar y organizar pertenencias.',category:'ORGANIZACIÓN ESCOLAR',problem:'¿Cómo podríamos organizar un sistema para identificar, guardar y recuperar los objetos perdidos dentro de la escuela?',intro:'Los estudiantes buscaron una forma más clara y ordenada de guardar e identificar útiles y pertenencias encontrados en la escuela.',model:[],photos:[],cutout:'',featured:0,posters:['afiches/grupo_4.webp'],alt:['Caja destinada a guardar objetos perdidos.','Etiquetas para identificar las pertenencias.','Cámara para observar el aula.'],chosen:'La alternativa elegida fue una caja de objetos perdidos para cada curso, identificada con un color diferente. El afiche propone verde para primero, rojo para segundo y azul para tercero.',process:'El afiche incluye alternativas, la elección de una solución y una reflexión sobre su utilidad para toda la escuela.',eval:'El grupo señala que concentrar los objetos encontrados en lugares conocidos facilitaría su devolución y que sería importante informar a todos los cursos dónde se encuentran las cajas.',source:'Afiche del grupo 4 y consigna docente.'},
  {id:5,title:'Un kiosco escolar',short:'Ideas para organizar la venta y exhibición de productos.',category:'SERVICIOS Y ORGANIZACIÓN',problem:'¿Cómo podríamos diseñar y organizar un kiosco escolar que permita atender de manera rápida, ordenada, segura e higiénica?',intro:'El grupo trabajó sobre la necesidad de contar con un espacio propio para exhibir y vender productos dentro de la escuela.',model:[{type:'kiosk',label:'Kiosco escolar'}],photos:PHOTOS[5],cutout:'recortes/g5.webp',featured:0,posters:['afiches/grupo_5.webp','afiches/grupo_5_-_2.webp'],alt:['Una estantería hecha con madera o materiales reciclados para organizar productos.','Un puesto de venta, construido con materiales reutilizados, para ubicarse en un sector del patio.'],chosen:'Un segundo afiche identifica como elegida la «propuesta 1». Las dos láminas y las fotos de la maqueta se presentan juntas para conservar lo registrado por los estudiantes.',process:'En la planificación registrada se mencionan cartón, pinturas, papel, pegamento, pinceles y pistola de silicona, junto con precauciones para su uso.',eval:'En el afiche de evaluación el grupo considera que su propuesta proporciona un espacio fijo y plantea mejorar la resistencia de la estructura.',source:'Dos afiches del grupo 5, consigna docente y fotografías.'},
  {id:6,title:'Dispositivos para aprender',short:'Organización del uso de recursos tecnológicos entre cursos.',category:'RECURSOS TECNOLÓGICOS',problem:'¿Cómo podríamos organizar, compartir o trasladar los dispositivos tecnológicos disponibles para que puedan ser utilizados por diferentes cursos de manera segura y ordenada?',intro:'La consigna plantea una dificultad concreta: los equipos tecnológicos son limitados y deben ser utilizados por distintos grupos.',model:[{type:'aula',label:'Representación del aula'}],photos:PHOTOS[6],cutout:'recortes/g6.webp',featured:1,posters:[],alt:[],chosen:'Las fotografías muestran una maqueta de aula con mobiliario, paredes y un espacio delimitado.',process:'Los estudiantes debían investigar alternativas de organización de equipamiento, elaborar un diseño y representarlo mediante un prototipo.',eval:'',source:'Consigna docente y fotografías de la maqueta.'},
  {id:7,title:'Elementos de higiene',short:'Un sistema de almacenamiento y reposición para espacios compartidos.',category:'CUIDADO DE LA ESCUELA',problem:'¿Cómo podríamos organizar un sistema que permita controlar y reponer los elementos de higiene antes de que se terminen?',intro:'El grupo identificó la importancia de disponer de jabón, papel y otros artículos de higiene durante la jornada escolar.',model:[{type:'hygiene',label:'Mueble de higiene'}],photos:PHOTOS[7],cutout:'recortes/g7.webp',featured:0,posters:['afiches/grupo_7.webp'],alt:['Designar responsables para controlar las existencias y contar con un mueble para los repuestos.','Instalar un armario con candado para guardar los productos.','Designar una persona encargada del abastecimiento.'],chosen:'El afiche propone un armario con llave debajo del tocador, desde el cual se puedan solicitar los elementos cuando hagan falta.',process:'La organización del trabajo incluye diseño, materiales como cartón, tijeras y pegamento, y la construcción de la maqueta.',eval:'El grupo indica que la maqueta cumple con la idea prevista, que realizó una base más grande que la pensada inicialmente y que resolvió dificultades por falta de materiales. Considera que la propuesta sería económica y práctica.',source:'Afiche del grupo 7 y consigna docente.'}
];
const POSTER_NOTES={
1:[['Alternativa elegida','En el afiche del grupo 1 aparece una flecha que identifica la primera alternativa como la elegida. Después registraron bocetos, búsqueda de materiales y distribución de tareas para realizar la maqueta.']],
3:[['Propuestas investigadas','Se mencionan paneles aislantes, ventanas con parasoles, cortinas térmicas, zonas de sombra en el exterior, horno solar y mini aire acondicionado. La lámina indica que se eligieron estos últimos dos modelos para representar las propuestas.']],
4:[['Aplicación a toda la escuela','El afiche plantea una caja para cada curso, con colores diferenciados: primero verde, segundo rojo y tercero azul. La evaluación señala que reunir los objetos encontrados en lugares conocidos ayudaría a encontrarlos y devolverlos.']],
5:[['La segunda lámina','La organización registra cartón, pinturas, papel, pegamento y pinceles. Como medio técnico se menciona una pistola de silicona, con la recomendación de utilizarla con cuidado.'],['Evaluación realizada por el grupo','El afiche indica que la solución cuenta con un espacio fijo, que se utilizaron los materiales previstos y que los integrantes participaron. También registra cambios durante el proceso, dificultades con el pegamento y la necesidad de mejorar la resistencia y durabilidad del prototipo.']],
7:[['Otras propuestas del equipo','Además del armario con llave, se pensó en responsables de controlar los productos de higiene y mantener repuestos disponibles.'],['Evaluación de la construcción','La evaluación indica que se completó la maqueta en el tiempo previsto; uno de los cambios fue ampliar la base; la falta de materiales se resolvió con los que se tenían disponibles. El grupo considera que se podría mejorar el diseño de los muebles.']]
};



const MODEL_VARIANTS = {
  1:[{label:'Asiento construido', frames:PHOTOS[1]}],
  2:[{label:'Distribución del aula', frames:PHOTOS[2]}],
  3:[{label:'Prototipos térmicos', frames:PHOTOS[3]}],
  5:[{label:'Kiosco escolar', frames:PHOTOS[5]}],
  6:[{label:'Representación del aula', frames:PHOTOS[6]}],
  7:[{label:'Mueble de higiene', frames:PHOTOS[7]}]
};
PROJECTS.forEach(p=>{ if(MODEL_VARIANTS[p.id]) p.model = MODEL_VARIANTS[p.id]; });

const byId = id => PROJECTS.find(p => p.id === Number(id));
const $ = (q, root=document) => root.querySelector(q);
const $$ = (q, root=document) => Array.from(root.querySelectorAll(q));
const escapeHTML = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const photoURL = path => assetURL(path);
let activeFilter='all',activeProject=null,activeTab='',photoIndex=0,posterIndex=0,variantIndex=0,spinState=null,photoTimer=null,photoPlaying=false,photoPointer=null,spinPointer=null;
const grid=$('#project-grid'),modal=$('#project-modal'),modalContent=$('#modal-content');

function getCardImage(p){
  if(p.photos?.length) return photoURL(p.photos[p.featured || 0]);
  if(p.posters?.length) return assetURL(p.posters[0]);
  return '';
}

function cards(projects){
  return projects.map(p=>{
    const img=getCardImage(p);
    const tag = p.model.length ? 'VISUALIZACIÓN INTERACTIVA' : 'REGISTRO DOCUMENTAL';
    return `<article class="project-card"><div class="card-art ${p.posters.length && !p.photos.length ? 'poster-only':''}"><span class="card-num">GRUPO ${String(p.id).padStart(2,'0')}</span>${img?`<img src="${img}" alt="Proyecto del grupo ${p.id}" loading="lazy">`:''}<span class="card-status">${tag}</span></div><div class="card-body"><div class="card-category">${p.category}</div><h3>${p.title}</h3><p>${p.short}</p><div class="card-bottom"><span>Explorar el proyecto</span><b aria-hidden="true">↗</b></div></div><button class="card-click" data-project="${p.id}" aria-label="Ver proyecto del grupo ${p.id}: ${p.title}"></button></article>`;
  }).join('');
}

function filterProjects(){
  const term=$('#search').value.trim().toLocaleLowerCase('es');
  const matching=PROJECTS.filter(p=> (activeFilter==='all'||(activeFilter==='3d'&&p.model.length)||(activeFilter==='poster'&&p.posters.length)) && (!term || [p.title,p.short,p.category,p.problem,p.intro].join(' ').toLocaleLowerCase('es').includes(term)));
  grid.innerHTML = cards(matching);
  $('#empty-search').hidden = !!matching.length;
}
$$('.filter').forEach(b=>b.addEventListener('click',()=>{$$('.filter').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed', String(x===b));});activeFilter=b.dataset.filter;filterProjects();}));
$('#search').addEventListener('input', filterProjects);
grid.addEventListener('click', e=>{ const el=e.target.closest('[data-project]'); if(el) openProject(el.dataset.project); });
filterProjects();

function infoBlock(label,title,html){ return html?`<section class="info-block"><div class="section-mini">${label}</div>${title?`<h3>${title}</h3>`:''}${html}</section>`:''; }
function description(p){
  const alternatives = p.alt.length ? infoBlock('ALTERNATIVAS DEL AFICHE','Las ideas propuestas',`<ul>${p.alt.map(a=>`<li>${escapeHTML(a)}</li>`).join('')}</ul>`) : '';
  return infoBlock('01 / PUNTO DE PARTIDA','La situación problemática',`<p class="quote-problem">“${escapeHTML(p.problem)}”</p><p class="source-tag">Consigna asignada al grupo</p>`) +
    alternatives +
    (p.chosen ? infoBlock('02 / LA PROPUESTA','Del diseño a la maqueta',`<p>${escapeHTML(p.chosen)}</p>`) : '') +
    (p.process ? infoBlock('03 / CÓMO TRABAJARON','Organización y construcción',`<p>${escapeHTML(p.process)}</p>`) : '') +
    (p.eval ? infoBlock('04 / REFLEXIÓN','La evaluación',`<p>${escapeHTML(p.eval)}</p>`) : '') +
    (POSTER_NOTES[p.id] ? infoBlock('LECTURA DIGITAL DEL AFICHE','Otros registros',POSTER_NOTES[p.id].map(([h,t])=>`<p style="margin-bottom:12px"><strong style="color:var(--wine)">${escapeHTML(h)}.</strong> ${escapeHTML(t)}</p>`).join('')) : '') +
    infoBlock('MATERIALES CONSULTADOS','',`<p class="source-tag">${escapeHTML(p.source)}</p>`);
}
function tabSpecs(p){ return [...(p.model.length?[['model','Vista giratoria']]:[]), ...(p.photos.length?[['photos','Fotografías']]:[]), ...(p.posters.length?[['posters','Afiche']]:[])]; }
function closePhotoSeq(){ if(photoTimer){ clearInterval(photoTimer); photoTimer=null; } photoPlaying=false; updatePhotoButtons(); }
function stopSpin(){ if(spinState?.timer){ clearInterval(spinState.timer); spinState.timer=null; } if(spinState) spinState.playing=false; updateSpinButtons(); }
function closeMedia(){ closePhotoSeq(); stopSpin(); spinPointer=null; photoPointer=null; releaseDyson(); }
function closeModal(){ closeMedia(); modal.hidden=true; modal.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-active'); activeProject=null; }
function openProject(id){
  const p=byId(id); if(!p) return; closeMedia(); activeProject=p; activeTab=''; variantIndex=0; photoIndex=p.featured||0; posterIndex=0;
  $('#modal-number').textContent='GRUPO '+String(p.id).padStart(2,'0');
  const tabs=tabSpecs(p);
  modalContent.innerHTML=`<div class="modal-title-area"><div><div class="detail-kicker">GRUPO ${String(p.id).padStart(2,'0')} · ${p.category}</div><h2>${p.title}</h2></div><p class="detail-summary">${p.intro}</p></div><div class="modal-columns"><div class="modal-viewer-side"><div class="tabs" role="tablist">${tabs.map(([key,label])=>`<button class="tab" role="tab" data-tab="${key}" aria-selected="false">${label}</button>`).join('')}</div><div id="variant-area"></div><div class="view-display" id="display"></div><div id="display-tools"></div><p class="viewer-foot" id="viewer-foot"></p></div><aside class="info-side">${description(p)}</aside></div>`;
  modal.hidden=false; modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-active'); $('.modal-panel',modal).scrollTop=0;
  switchTab(tabs[0][0]); $('.modal-panel',modal).focus({preventScroll:true});
}
function switchTab(tab){ if(!activeProject) return; closeMedia(); activeTab=tab; $$('.tab',modal).forEach(b=>{const yes=b.dataset.tab===tab; b.classList.toggle('active',yes); b.setAttribute('aria-selected', String(yes));}); $('#variant-area').innerHTML=''; $('#display-tools').innerHTML=''; $('#display').className='view-display'; if(tab==='model') renderModel(); if(tab==='photos') renderPhotos(); if(tab==='posters') renderPosters(); }

function renderModel(){
  const p=activeProject, variants=p.model, spec=variants[variantIndex] || variants[0];
  if(variants.length>1) $('#variant-area').innerHTML=`<div class="variant-switch">${variants.map((v,i)=>`<button data-variant="${i}" class="${variantIndex===i?'active':''}">${escapeHTML(v.label)}</button>`).join('')}</div>`;
  spinState={frames:spec.frames.slice(), index:0, zoom:1, playing:true, timer:null};
  $('#display').classList.add('has-model');
  $('#display').innerHTML=`<div class="spin-stage" id="spin-stage" aria-label="Visualización interactiva"><div class="spin-backdrop"></div><div class="spin-ground"></div><img class="spin-frame-img" id="spin-img" alt="Vista interactiva del prototipo"><span class="model-badge">Fotografías sin fondo</span><div class="model-instructions"><span>↔ Arrastrá para girar</span><span>⤢ Tocá para ampliar</span></div><span class="spin-count" id="spin-count"></span></div>`;
  $('#display-tools').innerHTML='<div class="model-toolbar"><button class="toolbtn" data-control="spin">⏸ Pausar giro</button><button class="toolbtn" data-control="prevSpin">← Vista anterior</button><button class="toolbtn" data-control="nextSpin">Vista siguiente →</button><button class="toolbtn" data-control="zoomIn">＋ Acercar</button><button class="toolbtn" data-control="zoomOut">－ Alejar</button><button class="toolbtn" data-control="resetSpin">↺ Reiniciar</button><button class="toolbtn" data-control="openSpin">⤢ Ampliar</button></div>';
  $('#viewer-foot').textContent='La vista giratoria está compuesta por fotografías de distintas caras del prototipo, recortadas por el usuario. No es un escaneo tridimensional volumétrico.';
  updateSpinFrame(); startSpin();
  const stage=$('#spin-stage');
  stage.addEventListener('pointerdown', e=>{ if(e.pointerType==='mouse' && e.button!==0) return; stopSpin(); spinPointer={x:e.clientX}; stage.setPointerCapture(e.pointerId); });
  stage.addEventListener('pointermove', e=>{ if(!spinPointer||!spinState) return; const dx=e.clientX-spinPointer.x; if(Math.abs(dx)>28){ spinState.index=(spinState.index+(dx<0?1:-1)+spinState.frames.length)%spinState.frames.length; spinPointer.x=e.clientX; updateSpinFrame(); }});
  stage.addEventListener('pointerup', ()=>spinPointer=null); stage.addEventListener('pointercancel', ()=>spinPointer=null);
  stage.addEventListener('wheel', e=>{ e.preventDefault(); if(!spinState) return; spinState.zoom=Math.max(.8, Math.min(2.2, spinState.zoom + (e.deltaY<0?0.08:-0.08))); updateSpinZoom(); }, {passive:false});
  stage.addEventListener('dblclick', ()=> openLightbox(photoURL(spinState.frames[spinState.index]), `Grupo ${activeProject.id} · Vista ${spinState.index+1}`));
}
function startSpin(){ if(!spinState) return; stopSpin(); spinState.playing=true; spinState.timer=setInterval(()=>{ spinState.index=(spinState.index+1)%spinState.frames.length; updateSpinFrame(); }, 900); updateSpinButtons(); }
function updateSpinButtons(){ const b=$('[data-control="spin"]'); if(b) b.textContent=(spinState?.playing?'⏸ Pausar giro':'▶ Reanudar giro'); }
function updateSpinZoom(){ const img=$('#spin-img'); if(img) img.style.transform=`translate(-50%,-50%) scale(${spinState?.zoom||1})`; }
function updateSpinFrame(){ if(activeTab!=='model' || !spinState) return; const img=$('#spin-img'); if(!img) return; img.src=photoURL(spinState.frames[spinState.index]); img.alt=`Vista ${spinState.index+1} del prototipo del grupo ${activeProject.id}`; $('#spin-count').textContent=`${String(spinState.index+1).padStart(2,'0')} / ${String(spinState.frames.length).padStart(2,'0')}`; updateSpinZoom(); }

function renderPhotos(){
  const p=activeProject; photoIndex=((photoIndex%p.photos.length)+p.photos.length)%p.photos.length;
  $('#display').classList.add('has-photos');
  $('#display').innerHTML=`<div class="real-frame" id="real-frame" aria-label="Galería de fotografías"><div class="spin-backdrop"></div><img src="${photoURL(p.photos[photoIndex])}" alt="Fotografía ${photoIndex+1} del grupo ${p.id}" draggable="false"><span class="drag-hint">↔ Arrastrá o usá las miniaturas</span><span class="frame-count" id="frame-count"></span></div>`;
  $('#display-tools').innerHTML=`<div class="thumb-strip" id="thumb-strip">${p.photos.map((url,i)=>`<button data-photo="${i}" aria-label="Ver fotografía ${i+1}" class="${i===photoIndex?'selected':''}"><img src="${photoURL(url)}" alt="" loading="lazy"></button>`).join('')}</div><div class="photo-tools"><button class="toolbtn" data-control="prevPhoto">← Anterior</button><button class="toolbtn" data-control="playPhoto">▶ Recorrer</button><button class="toolbtn" data-control="nextPhoto">Siguiente →</button><button class="toolbtn" data-control="openPhoto">⤢ Ampliar</button><small>${p.photos.length} registros fotográficos</small></div>`;
  $('#viewer-foot').textContent='Fotografías del prototipo sin fondo, organizadas para la exposición digital.';
  updatePhoto();
  const frame=$('#real-frame');
  frame.addEventListener('pointerdown', e=>{ if(e.pointerType==='mouse'&&e.button!==0) return; photoPointer={x:e.clientX}; frame.setPointerCapture(e.pointerId); closePhotoSeq(); });
  frame.addEventListener('pointermove', e=>{ if(!photoPointer) return; const dx=e.clientX-photoPointer.x; if(Math.abs(dx)>30){ photoIndex=(photoIndex+(dx<0?1:-1)+p.photos.length)%p.photos.length; photoPointer.x=e.clientX; updatePhoto(); }});
  frame.addEventListener('pointerup', ()=>photoPointer=null); frame.addEventListener('pointercancel', ()=>photoPointer=null);
}
function updatePhoto(){ if(activeTab!=='photos'||!activeProject) return; const img=$('#real-frame img'); if(!img) return; img.src=photoURL(activeProject.photos[photoIndex]); img.alt=`Fotografía ${photoIndex+1} de ${activeProject.photos.length} del grupo ${activeProject.id}`; $('#frame-count').textContent=`${String(photoIndex+1).padStart(2,'0')} / ${String(activeProject.photos.length).padStart(2,'0')}`; $$('[data-photo]').forEach(b=>b.classList.toggle('selected', Number(b.dataset.photo)===photoIndex)); const selected=$(`[data-photo="${photoIndex}"]`); if(selected){ const rail=selected.parentElement; rail.scrollLeft=Math.max(0, selected.offsetLeft - rail.clientWidth/2 + selected.offsetWidth/2); } }
function updatePhotoButtons(){ const b=$('[data-control="playPhoto"]'); if(b) b.textContent = photoPlaying ? '⏸ Pausar' : '▶ Recorrer'; }

function renderPosters(){
  const p=activeProject;
  $('#display').classList.add('has-poster');
  const sel=p.posters.length>1 ? `<div class="poster-selector">${p.posters.map((_,i)=>`<button class="${posterIndex===i?'active':''}" data-poster="${i}">Afiche ${i+1}</button>`).join('')}</div>` : '';
  $('#display').innerHTML=`${sel}<img class="poster-frame" src="${assetURL(p.posters[posterIndex])}" alt="Afiche digitalizado del grupo ${p.id}" data-fullposter>`;
  $('#display-tools').innerHTML='<div class="model-toolbar"><button class="toolbtn" data-control="openPoster">⤢ Ampliar afiche</button></div>';
  $('#viewer-foot').textContent='Los afiches se muestran como registro documental del trabajo presentado por cada grupo.';
}

function openLightbox(src,label){ $('#lightbox-img').src=src; $('#lightbox-label').textContent=label; $('#lightbox').hidden=false; }
function closeLightbox(){ $('#lightbox').hidden=true; $('#lightbox-img').src=''; }

modal.addEventListener('click', e=>{
  if(e.target.closest('[data-close]')){ closeModal(); return; }
  if(!activeProject) return;
  const tab=e.target.closest('[data-tab]'); if(tab){ switchTab(tab.dataset.tab); return; }
  const variant=e.target.closest('[data-variant]'); if(variant){ variantIndex=Number(variant.dataset.variant); renderModel(); return; }
  const thumb=e.target.closest('[data-photo]'); if(thumb){ closePhotoSeq(); photoIndex=Number(thumb.dataset.photo); updatePhoto(); return; }
  const psel=e.target.closest('[data-poster]'); if(psel){ posterIndex=Number(psel.dataset.poster); renderPosters(); return; }
  if(e.target.closest('[data-fullposter]')){ openLightbox(assetURL(activeProject.posters[posterIndex]),`Afiche del grupo ${activeProject.id}`); return; }
  const ctl=e.target.closest('[data-control]'); if(!ctl) return; const a=ctl.dataset.control;
  if(a==='spin'){ if(spinState?.playing) stopSpin(); else startSpin(); return; }
  if(a==='prevSpin'){ stopSpin(); spinState.index=(spinState.index-1+spinState.frames.length)%spinState.frames.length; updateSpinFrame(); return; }
  if(a==='nextSpin'){ stopSpin(); spinState.index=(spinState.index+1)%spinState.frames.length; updateSpinFrame(); return; }
  if(a==='zoomIn'){ if(spinState){ spinState.zoom=Math.min(2.2, spinState.zoom+0.12); updateSpinZoom(); } return; }
  if(a==='zoomOut'){ if(spinState){ spinState.zoom=Math.max(.8, spinState.zoom-0.12); updateSpinZoom(); } return; }
  if(a==='resetSpin'){ renderModel(); return; }
  if(a==='openSpin'){ if(spinState) openLightbox(photoURL(spinState.frames[spinState.index]), `Grupo ${activeProject.id} · Vista ${spinState.index+1}`); return; }
  if(a==='prevPhoto'){ closePhotoSeq(); photoIndex=(photoIndex-1+activeProject.photos.length)%activeProject.photos.length; updatePhoto(); return; }
  if(a==='nextPhoto'){ closePhotoSeq(); photoIndex=(photoIndex+1)%activeProject.photos.length; updatePhoto(); return; }
  if(a==='playPhoto'){ if(photoPlaying){ closePhotoSeq(); } else { photoPlaying=true; updatePhotoButtons(); photoTimer=setInterval(()=>{ photoIndex=(photoIndex+1)%activeProject.photos.length; updatePhoto(); },1000);} return; }
  if(a==='openPhoto'){ openLightbox(photoURL(activeProject.photos[photoIndex]), `Grupo ${activeProject.id} · Fotografía ${photoIndex+1}`); return; }
  if(a==='openPoster'){ openLightbox(assetURL(activeProject.posters[posterIndex]), `Grupo ${activeProject.id} · Afiche`); return; }
});

// Esta sección complementaria usa las imágenes de la maqueta y una recreación 3D.
// Las fotos son reales y el archivo .glb es interpretativo, no un escaneo exacto.
const DYSON_PHOTOS=[1,2,3,4,5].map(i=>`assets/dyson/vista_${String(i).padStart(2,'0')}.webp`);
let dysonViewer=null,dysonPhoto=2,dysonPanel='model',dysonActive=false;
function releaseDyson(){
  if(dysonViewer){dysonViewer.destroy();dysonViewer=null;}
  dysonActive=false;
}
function dysonChangePanel(panel){
  if(!dysonActive)return;
  dysonPanel=panel;
  $$('.dyson-tab',modal).forEach(b=>{let on=b.dataset.dysonTab===panel;b.classList.toggle('active',on);b.setAttribute('aria-selected',String(on));});
  $$('[data-dyson-panel]',modal).forEach(p=>p.hidden=p.dataset.dysonPanel!==panel);
  const canvas=$('#dyson-canvas');
  if(panel==='model'&&!dysonViewer){
    try{
      dysonViewer=new window.DysonViewer(canvas);
      canvas.addEventListener('dyson-spin-changed',()=>{
        const btn=$('[data-dyson-action="spin"]');if(btn)btn.textContent='▶ Reanudar giro';
      });
    }catch(err){
      // Mismo modelo 3D, renderizado como secuencia de vistas si WebGL no está disponible.
      dysonViewer=new window.DysonFallbackViewer(canvas);
      const watermark=$('.dyson-watermark');if(watermark)watermark.textContent='MODELO 3D · VISTA RENDERIZADA';
      canvas.addEventListener('dyson-spin-changed',()=>{const b=$('[data-dyson-action="spin"]');if(b)b.textContent='▶ Reanudar giro';});
    }
  }
}
function dysonUpdatePhoto(){
  const img=$('#dyson-photo');if(!img)return;
  img.src=assetURL(DYSON_PHOTOS[dysonPhoto]);img.alt=`Maqueta de la esfera de Dyson · vista ${dysonPhoto+1} de 5`;
  $('#dyson-photo-count').textContent=`${String(dysonPhoto+1).padStart(2,'0')} / 05`;
  $$('[data-dyson-photo]',modal).forEach(b=>b.classList.toggle('selected',Number(b.dataset.dysonPhoto)===dysonPhoto));
}
function openDyson(){
  closeMedia();activeProject=null;dysonActive=true;dysonPhoto=2;dysonPanel='model';
  $('#modal-number').textContent='UNA INQUIETUD DE LOS CHICOS';
  modalContent.innerHTML=`
  <div class="dyson-modal">
    <div class="dyson-intro"><div><div class="detail-kicker">EXPOSICIÓN COMPLEMENTARIA · EDUCACIÓN TECNOLÓGICA</div><h2>La esfera de <em>Dyson.</em></h2><p>Una investigación surgida de la curiosidad de los estudiantes, acompañada por una maqueta que construyeron y presentaron.</p></div><div class="dyson-authors">GERVASIO GUTIÉRREZ<br>JOAQUÍN NAVARRO</div></div>
    <div class="dyson-layout">
      <div class="dyson-left">
        <div class="dyson-tabs" role="tablist" aria-label="Explorar esfera de Dyson">
          <button class="dyson-tab active" data-dyson-tab="model" role="tab" aria-selected="true">◉ Modelo 3D</button>
          <button class="dyson-tab" data-dyson-tab="photos" role="tab" aria-selected="false">▣ 5 imágenes reales</button>
          <button class="dyson-tab" data-dyson-tab="poster" role="tab" aria-selected="false">▤ Afiche de investigación</button>
        </div>
        <section class="dyson-display" data-dyson-panel="model">
          <div class="dyson-3d-stage"><div class="dyson-stage-glow"></div><canvas id="dyson-canvas" aria-label="Modelo tridimensional interactivo de una esfera naranja rodeada de dos aros negros"></canvas><span class="dyson-watermark">RECREACIÓN 3D ORIENTATIVA</span><p id="dyson-error" class="dyson-error" hidden></p><div class="dyson-hint">Arrastrá para girar · Ruedita para acercar</div></div>
          <div class="dyson-controls"><button data-dyson-action="spin">⏸ Pausar giro</button><button data-dyson-action="left">↶ Girar</button><button data-dyson-action="right">↷ Girar</button><button data-dyson-action="in">＋ Acercar</button><button data-dyson-action="out">－ Alejar</button><button data-dyson-action="reset">↺ Reiniciar</button></div>
          <p class="dyson-note">Modelo tridimensional construido a partir de la apariencia de la maqueta de los estudiantes. Se puede rotar libremente; no es un escaneo exacto.</p>
        </section>
        <section class="dyson-display" data-dyson-panel="photos" hidden>
          <div class="dyson-photo-stage"><img id="dyson-photo" src="${assetURL(DYSON_PHOTOS[2])}" alt="Maqueta real de la esfera de Dyson"/><span id="dyson-photo-count">03 / 05</span></div>
          <div class="dyson-photo-controls"><button data-dyson-action="prev-photo">← Anterior</button><button data-dyson-action="full-photo">⤢ Ampliar foto</button><button data-dyson-action="next-photo">Siguiente →</button></div>
          <div class="dyson-thumbs">${DYSON_PHOTOS.map((p,i)=>`<button data-dyson-photo="${i}" class="${i===2?'selected':''}" aria-label="Ver imagen ${i+1}"><img src="${assetURL(p)}" alt="" loading="lazy" /></button>`).join('')}</div>
          <p class="dyson-note">Cinco fotografías de la maqueta real, entregadas con fondo transparente. Conservan sus colores, texturas y construcción artesanal.</p>
        </section>
        <section class="dyson-display" data-dyson-panel="poster" hidden>
          <div class="dyson-poster-stage"><img id="dyson-poster" src="${assetURL('afiches/esfera_dyson_trabajo_aparte.webp')}" alt="Afiche original del trabajo sobre la esfera de Dyson" /></div>
          <p class="dyson-note">Afiche digitalizado del trabajo presentado. Hacé clic para ampliarlo.</p>
        </section>
      </div>
      <aside class="dyson-right">
        <div class="section-mini">UNA INQUIETUD DE LOS CHICOS</div>
        <h3>Imaginar otras tecnologías</h3>
        <p>Gervasio Gutiérrez y Joaquín Navarro investigaron por iniciativa propia el concepto de la esfera de Dyson y lo compartieron mediante un afiche y una maqueta.</p>
        <div class="dyson-fact"><strong>¿Qué es una esfera de Dyson?</strong><p>Es un concepto hipotético: un sistema de estructuras alrededor de una estrella diseñado para captar parte de la energía que emite. El físico Freeman Dyson analizó esta posibilidad en 1960.</p></div>
        <p>Las fotografías muestran la interpretación de los chicos: una esfera naranja, que representa la estrella, rodeada de estructuras negras. No significa que exista una estructura de ese tipo en el espacio.</p>
        <p>El modelo 3D recrea esas formas de manera aproximada. Para conocer los detalles auténticos de la maqueta, utilizá la galería de imágenes reales.</p>
        <a href="assets/dyson/esfera_dyson_recreacion.glb" class="dyson-glb-link" download="esfera_dyson_recreacion.glb">↓ Descargar recreación 3D (.glb)</a>
        <p class="dyson-source">Fuentes: fotografías, afiche de los estudiantes y recreación digital de la maqueta.</p>
      </aside>
    </div>
  </div>`;
  modal.hidden=false;modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-active');
  $('.modal-panel',modal).scrollTop=0;$('.modal-panel',modal).focus({preventScroll:true});
  dysonChangePanel('model');
}
$('#open-dyson').addEventListener('click', openDyson);
modal.addEventListener('click',e=>{
  if(!dysonActive)return;
  const tab=e.target.closest('[data-dyson-tab]');if(tab){dysonChangePanel(tab.dataset.dysonTab);return;}
  const photo=e.target.closest('[data-dyson-photo]');if(photo){dysonPhoto=Number(photo.dataset.dysonPhoto);dysonUpdatePhoto();return;}
  if(e.target.closest('#dyson-poster')){openLightbox(assetURL('afiches/esfera_dyson_trabajo_aparte.webp'),'Esfera de Dyson · Afiche del trabajo');return;}
  const btn=e.target.closest('[data-dyson-action]');if(!btn)return;
  const a=btn.dataset.dysonAction;
  if(a==='prev-photo'||a==='next-photo'){dysonPhoto=(dysonPhoto+(a==='next-photo'?1:4))%5;dysonUpdatePhoto();return;}
  if(a==='full-photo'){openLightbox(assetURL(DYSON_PHOTOS[dysonPhoto]),`Maqueta de la esfera de Dyson · Vista ${dysonPhoto+1}`);return;}
  if(!dysonViewer)return;
  if(a==='spin'){dysonViewer.autoSpin=!dysonViewer.autoSpin;btn.textContent=dysonViewer.autoSpin?'⏸ Pausar giro':'▶ Reanudar giro';}
  if(a==='left'){dysonViewer.autoSpin=false;dysonViewer.yaw-=0.33;const b=$('[data-dyson-action="spin"]');if(b)b.textContent='▶ Reanudar giro';}
  if(a==='right'){dysonViewer.autoSpin=false;dysonViewer.yaw+=0.33;const b=$('[data-dyson-action="spin"]');if(b)b.textContent='▶ Reanudar giro';}
  if(a==='in')dysonViewer.zoom(-0.35);
  if(a==='out')dysonViewer.zoom(0.35);
  if(a==='reset'){dysonViewer.reset();const b=$('[data-dyson-action="spin"]');if(b)b.textContent='⏸ Pausar giro';}
});
$('#lightbox-close').addEventListener('click', closeLightbox);
$('#lightbox').addEventListener('click', e=>{ if(e.target.id==='lightbox') closeLightbox(); });
document.addEventListener('keydown', e=>{
  if(e.key==='Escape'){ if(!$('#lightbox').hidden) closeLightbox(); else if(!modal.hidden) closeModal(); }
  if(!modal.hidden && activeTab==='photos' && activeProject && $('#lightbox').hidden){ if(e.key==='ArrowRight'||e.key==='ArrowLeft'){ photoIndex=(photoIndex+(e.key==='ArrowRight'?1:-1)+activeProject.photos.length)%activeProject.photos.length; updatePhoto(); } }
  if(!modal.hidden && activeTab==='model' && spinState && $('#lightbox').hidden){ if(e.key==='ArrowRight'||e.key==='ArrowLeft'){ stopSpin(); spinState.index=(spinState.index+(e.key==='ArrowRight'?1:-1)+spinState.frames.length)%spinState.frames.length; updateSpinFrame(); } }
});
window.addEventListener('scroll', ()=>{ $('#scroll-progress').style.width=(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100 || 0)+'%'; }, {passive:true});
})();
