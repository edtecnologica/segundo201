// Visores 3D autónomos realizados con un pequeño motor de proyección en Canvas.
// Son reconstrucciones geométricas aproximadas, no escaneos de las maquetas.
(function(){
'use strict';
const V=(x,y,z)=>({x,y,z});
function shade(hex,k){let s=hex.replace('#','');if(s.length===3)s=[...s].map(c=>c+c).join('');const c=[0,2,4].map(i=>parseInt(s.slice(i,i+2),16));return `rgb(${c.map(x=>Math.min(255,Math.max(0,Math.round(x*k)))).join(',')})`}
class Builder{
 constructor(){this.faces=[];this.labels=[];}
 face(points,color,alpha=1,stroke=false){this.faces.push({points,color,alpha,stroke})}
 box(x,y,z,w,h,d,color){
 const X=[x-w/2,x+w/2],Y=[y-h/2,y+h/2],Z=[z-d/2,z+d/2];
 const p=(a,b,c)=>V(X[a],Y[b],Z[c]);
 this.face([p(0,0,1),p(1,0,1),p(1,1,1),p(0,1,1)],shade(color,.94));
 this.face([p(1,0,0),p(0,0,0),p(0,1,0),p(1,1,0)],shade(color,.72));
 this.face([p(0,0,0),p(0,0,1),p(0,1,1),p(0,1,0)],shade(color,.8));
 this.face([p(1,0,1),p(1,0,0),p(1,1,0),p(1,1,1)],shade(color,.67));
 this.face([p(0,1,1),p(1,1,1),p(1,1,0),p(0,1,0)],shade(color,1.11));
 this.face([p(0,0,0),p(1,0,0),p(1,0,1),p(0,0,1)],shade(color,.54));
 }
 line(a,b,thick,color){const dx=b.x-a.x,dz=b.z-a.z,dist=Math.hypot(dx,dz);if(dist<.03){this.box(a.x,(a.y+b.y)/2,a.z,thick,Math.abs(b.y-a.y)+thick,thick,color);return}let ux=dx/dist,uz=dz/dist;let cross=V(-uz*thick/2,0,ux*thick/2);const top=V(b.x,b.y,b.z),bottom=V(a.x,a.y,a.z);this.face([V(bottom.x-cross.x,bottom.y,bottom.z-cross.z),V(bottom.x+cross.x,bottom.y,bottom.z+cross.z),V(top.x+cross.x,top.y,top.z+cross.z),V(top.x-cross.x,top.y,top.z-cross.z)],color,1,true)}
 cyl(x,y,z,r,h,color,n=12){let bot=[],top=[];for(let i=0;i<n;i++){const a=i/n*Math.PI*2;bot.push(V(x+r*Math.cos(a),y-h/2,z+r*Math.sin(a)));top.push(V(x+r*Math.cos(a),y+h/2,z+r*Math.sin(a)));}for(let i=0;i<n;i++){const a=i,b=(i+1)%n;this.face([bot[a],bot[b],top[b],top[a]],shade(color,.83+i/n*.13));}this.face(top,shade(color,1.06));}
 label(s,x,y,z,color='#fff',size=15){this.labels.push({s,p:V(x,y,z),color,size})}
 checker(w,d,nx,nz,y,one,two){this.box(0,y-.08,0,w,.16,d,'#484854');for(let i=0;i<nx;i++)for(let j=0;j<nz;j++){let x=-w/2+(i+.5)*w/nx,z=-d/2+(j+.5)*d/nz;this.face([V(x-w/nx/2,y+.01,z-d/nz/2),V(x+w/nx/2,y+.01,z-d/nz/2),V(x+w/nx/2,y+.01,z+d/nz/2),V(x-w/nx/2,y+.01,z+d/nz/2)],(i+j)%2?one:two)}}
}
const add=(b,...args)=>b.box(...args);
function chair(b){
 b.box(0,-.17,0,5,.32,4.4,'#42806d');
 for(let i=0;i<15;i++)b.line(V(-2.42+i*.34,.006,2.2),V(-2.42+i*.34,.006,-2.2),.012,'#5b9c8c');
 b.box(0,1.17,.23,2.8,.22,2.0,'#c28b39');
 b.box(0,2.12,-.75,2.8,1.8,.22,'#c99745');
 for(let x of [-1.22,1.22])for(let z of [-.58,1.03])b.box(x,.53,z,.17,1.15,.22,'#aa7c42');
 for(let x of [-1.18,1.18])b.line(V(x,.13,1.04),V(x,2.62,-.8),.12,'#a47534');
 b.box(0,2.85,-.75,2.77,.11,.23,'#e0b35f');
}
function kiosk(b){
 b.box(0,-.08,0,5.3,.16,4.3,'#a58e7b');
 b.box(0,.75,.79,4.1,1.52,1.65,'#3b2924');
 b.box(0,1.54,1.2,4.25,.13,.77,'#604035');
 for(let x of [-1.9,1.9])for(let z of [-.76,1.48])b.box(x,2.45,z,.17,3,.17,'#372827');
 b.box(0,3.85,.28,4.9,.22,3.55,'#382a27');
 b.box(0,4.05,.28,5,.12,3.75,'#2c2423');
 for(let row=0;row<3;row++){
   b.box(0,1.05+row*.63,-.76,3.65,.08,.6,'#654740');
   for(let i=0;i<10;i++){
     const colors=['#c84c38','#e5b95f','#398c92','#6278ad','#8a7455','#b94c68'];
     b.box(-1.55+i*.34,1.26+row*.63,-.55,.28,.35,.23,colors[(i+row*2)%6]);
   }
 }
 b.box(0,.82,1.65,2.7,.55,.055,'#e8d1c4');b.label('KIOSCO',0,.82,1.74,'#8e2d3f',18);
}
function aula(b){
 b.checker(6.6,5.1,9,7,0,'#202b42','#2c6695');
 b.box(0,2.2,-2.59,6.6,4.4,.2,'#efe8d8');
 b.box(3.27,2.2,0,.15,4.4,5.1,'#f5ede0');
 b.box(1.1,2.55,-2.44,2.65,1.4,.07,'#624347');
 b.box(-2,2.15,-1.65,1.52,3.3,1.5,'#c67b2c');
 for(let i=0;i<2;i++)b.box(-1.15,2.15+i*.65,-.84,.08,.07,.2,'#32353e');
 const seats=[[-.6,.75],[1.4,.65],[-.5,1.8],[1.4,1.8]];
 seats.forEach(([x,z],i)=>{
  b.box(x,1.05,z,.95,.1,.57,'#dc6d91');
  b.box(x-.16,.67,z,.08,.75,.09,'#777e85');b.box(x+.16,.67,z,.08,.75,.09,'#777e85');
  b.box(x,.78,z+.6,.6,.18,.35,'#64ae57');
 });
}
function ac(b){
 b.box(0,-.14,0,5.5,.26,4,'#e4e0d8');
 b.box(0,1.42,0,3.4,3,2.95,'#f4f3ee');
 b.box(0,1.62,1.54,2.63,2.3,.08,'#e3eff1');
 b.box(0,.09,1.63,3.1,.16,.2,'#b8bfc0');
 for(let i=0;i<6;i++){
  let row=Math.floor(i/3),col=i%3;
  let x=-.94+col*.93,y=.9+row*1.04;
  b.cyl(x,y,.96,.34,.36,'#73a9b7',14);
  b.cyl(x,y,1.18,.22,.04,'#2e67bf',14);
 }
}
function solar(b){
 b.box(0,-.15,0,5.5,.3,4.1,'#d8d1c9');
 b.box(0,.85,0,3.5,1.3,2.8,'#27242a');
 b.box(0,1.48,-.28,3.47,.08,2.5,'#6d7075');
 // Inclined lid with black, reflective central panel
 b.face([V(-1.92,1.39,1.24),V(1.92,1.39,1.24),V(1.92,3.37,-1.35),V(-1.92,3.37,-1.35)],'#242126');
 b.face([V(-1.63,1.6,1.12),V(1.63,1.6,1.12),V(1.63,3.15,-1.2),V(-1.63,3.15,-1.2)],'#8c9498',.87,true);
 b.line(V(-1.53,1.69,1.07),V(1.48,3.09,-1.13),.027,'#d9dee1');
 b.cyl(0,.91,.14,.54,.12,'#bcb6ac');
}
function hygiene(b){
 b.box(0,-.18,0,5.7,.28,4.6,'#947963');
 b.box(0,.82,.18,4.9,1.67,2.25,'#e4e3dc');
 b.box(0,.82,1.345,.10,1.62,.05,'#d2cbc0');
 b.box(-1.18,.83,1.39,.075,1.62,.07,'#827a73');
 b.box(0,2.18,-.87,5.0,2.1,.21,'#719bbb');
 for(let x of [-1.52,0,1.52]){
   b.cyl(x,1.7,.19,.47,.14,'#4a525f',15);
   b.cyl(x,1.75,.2,.28,.04,'#232e38',15);
   b.line(V(x,1.88,-.5),V(x,2.5,-.5),.085,'#424f5f');
   b.line(V(x,2.5,-.5),V(x,2.5,-.15),.08,'#424f5f');
 }
 b.box(0,.6,1.46,.48,.62,.09,'#9f854c');b.box(0,.9,1.53,.56,.16,.13,'#f4d99c');
}
function whiteRoom(b){
 b.box(0,-.11,0,6.3,.22,4.7,'#e7ba3f');
 b.box(0,2.05,-2.38,6.3,4.25,.16,'#f0eee4');
 b.box(-3.08,2.05,0,.16,4.25,4.7,'#f0eee4');
 b.box(3.08,2.05,0,.16,4.25,4.7,'#e6e3df');
 b.box(0,2.83,-2.25,1.55,.94,.09,'#b99a79');
 b.box(0,.67,-.37,4.4,.4,.55,'#f9f8f1');b.box(0,.67,1.06,4.4,.4,.55,'#f9f8f1');
 for(let z of [-.55,.5])b.box(2.44,1.65,z,.72,.1,.5,'#9b7345');
 b.box(-2.66,1.4,.12,.75,.1,.7,'#9b7345');
}
function make(type){let b=new Builder();if(type==='chair')chair(b);if(type==='aula')aula(b);if(type==='kiosk')kiosk(b);if(type==='ac')ac(b);if(type==='solar')solar(b);if(type==='hygiene')hygiene(b);if(type==='whiteRoom')whiteRoom(b);return b}
class Viewer{
 constructor(canvas,type){this.canvas=canvas;this.ctx=canvas.getContext('2d');this.type=type;this.model=make(type);this.yaw=.58;this.pitch=-.30;this.zoom=1;this.drag=false;this.motion=true;this.destroyed=false;this.last=0;this.pointerStart=null;this.handleResize=()=>this.resize();this.pointerDown=e=>{this.drag=true;this.motion=false;this.pointerStart=[e.clientX,e.clientY];canvas.setPointerCapture(e.pointerId);canvas.style.cursor='grabbing';};this.pointerMove=e=>{if(!this.drag)return;const dx=e.clientX-this.pointerStart[0],dy=e.clientY-this.pointerStart[1];this.yaw+=dx*.011;this.pitch=Math.max(-1.20,Math.min(1.05,this.pitch-dy*.008));this.pointerStart=[e.clientX,e.clientY]};this.pointerUp=()=>{this.drag=false;canvas.style.cursor='grab'};this.wheel=e=>{e.preventDefault();this.zoom=Math.min(1.9,Math.max(.66,this.zoom+(e.deltaY<0?.085:-.085)))};canvas.addEventListener('pointerdown',this.pointerDown);window.addEventListener('pointerup',this.pointerUp);canvas.addEventListener('pointermove',this.pointerMove);canvas.addEventListener('wheel',this.wheel,{passive:false});this.resize();requestAnimationFrame(t=>this.frame(t))}
 reset(){this.yaw=.58;this.pitch=-.30;this.zoom=1;this.motion=true;}
 setType(type){this.type=type;this.model=make(type);this.reset()}
 resize(){const r=this.canvas.getBoundingClientRect();const d=Math.min(window.devicePixelRatio||1,2);this.canvas.width=Math.max(1,Math.round(r.width*d));this.canvas.height=Math.max(1,Math.round(r.height*d));this.dpr=d}
 project(p){const cs=Math.cos(this.yaw),sn=Math.sin(this.yaw);const x=cs*p.x+sn*p.z,z=-sn*p.x+cs*p.z;const cp=Math.cos(this.pitch),sp=Math.sin(this.pitch);const y=cp*p.y-sp*z,zz=sp*p.y+cp*z;const w=this.canvas.width,h=this.canvas.height,base=Math.min(w,h)*1.45*this.zoom,dist=13;const scale=base/(dist-zz);return {x:w*.5+x*scale,y:h*.60-y*scale,z:zz}}
 frame(t){if(this.destroyed)return;const dt=Math.min((t-this.last)/1000,.06);this.last=t;if(this.motion&&dt)this.yaw+=dt*.22;this.draw();requestAnimationFrame(tt=>this.frame(tt))}
 draw(){const ctx=this.ctx,w=this.canvas.width,h=this.canvas.height,d=this.dpr;ctx.clearRect(0,0,w,h);
 const grad=ctx.createLinearGradient(0,0,0,h);grad.addColorStop(0,'#f8f5ef');grad.addColorStop(1,'#e5e1d9');ctx.fillStyle=grad;ctx.fillRect(0,0,w,h);
 ctx.strokeStyle='rgba(114,77,85,.085)';ctx.lineWidth=d;for(let i=0;i<18;i++){let yy=(h*.23+i*h*.06);ctx.beginPath();ctx.moveTo(0,yy);ctx.lineTo(w,yy);ctx.stroke();}for(let i=0;i<23;i++){let xx=(i*w/22);ctx.beginPath();ctx.moveTo(xx,0);ctx.lineTo(xx,h);ctx.stroke();}
 ctx.save();ctx.fillStyle='rgba(64,36,41,.11)';ctx.beginPath();ctx.ellipse(w*.5,h*.79,Math.min(w,h)*.34*this.zoom,Math.min(w,h)*.085*this.zoom,0,0,Math.PI*2);ctx.fill();ctx.restore();
 const faces=this.model.faces.map((f,i)=>({f,i,pts:f.points.map(p=>this.project(p))}));faces.sort((a,b)=>a.pts.reduce((s,p)=>s+p.z,0)/a.pts.length-b.pts.reduce((s,p)=>s+p.z,0)/b.pts.length);
 for(const {f,pts} of faces){ctx.beginPath();ctx.moveTo(pts[0].x,pts[0].y);for(let i=1;i<pts.length;i++)ctx.lineTo(pts[i].x,pts[i].y);ctx.closePath();ctx.globalAlpha=f.alpha;ctx.fillStyle=f.color;ctx.fill();ctx.globalAlpha=1;ctx.lineWidth=Math.max(.6,d*.68);ctx.strokeStyle='rgba(25,21,25,.17)';ctx.stroke();}
 ctx.save();ctx.textAlign='center';ctx.textBaseline='middle';for(let l of this.model.labels){let p=this.project(l.p);ctx.font=`800 ${Math.max(11,l.size*this.zoom*d)}px Arial`;ctx.fillStyle=l.color;ctx.fillText(l.s,p.x,p.y);}ctx.restore();
 const size=10*d;ctx.strokeStyle='rgba(118,42,62,.34)';ctx.lineWidth=d*1.5;for(let x of [26*d,w-26*d])for(let y of [26*d,h-26*d]){ctx.beginPath();ctx.moveTo(x+(x<w/2?size:-size),y);ctx.lineTo(x,y);ctx.lineTo(x,y+(y<h/2?size:-size));ctx.stroke()}
 }
 destroy(){this.destroyed=true;this.canvas.removeEventListener('pointerdown',this.pointerDown);this.canvas.removeEventListener('pointermove',this.pointerMove);window.removeEventListener('pointerup',this.pointerUp);this.canvas.removeEventListener('wheel',this.wheel)}
}
window.Technology3D={Viewer};
})();
