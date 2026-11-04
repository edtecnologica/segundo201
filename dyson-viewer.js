/* Visor 3D autónomo (WebGL 1), sin CDN ni dependencias externas.
   Modelo: recreación aproximada del prototipo artesanal fotografiado. */
(function(){
'use strict';
const vertSource = `
attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec3 aColor;
uniform mat4 uProj;
uniform float uYaw;
uniform float uPitch;
uniform float uDistance;
varying vec3 vNormal;
varying vec3 vColor;
vec3 turn(vec3 p){
 float c=cos(uYaw),s=sin(uYaw);
 vec3 p1=vec3(c*p.x+s*p.z,p.y,-s*p.x+c*p.z);
 float cp=cos(uPitch),sp=sin(uPitch);
 return vec3(p1.x,cp*p1.y-sp*p1.z,sp*p1.y+cp*p1.z);
}
void main(){
 vec3 q=turn(aPosition);
 q.z-=uDistance;
 gl_Position=uProj*vec4(q,1.0);
 vNormal=normalize(turn(aNormal));
 vColor=aColor;
}`;
const fragSource = `
precision mediump float;
varying vec3 vNormal;
varying vec3 vColor;
void main(){
 vec3 n=normalize(vNormal);
 vec3 light=normalize(vec3(-0.45,0.78,1.08));
 float diff=max(dot(n,light),0.0);
 float fill=max(dot(n,normalize(vec3(0.6,-0.2,-0.7))),0.0);
 float shaded=0.34+0.64*diff+0.10*fill;
 float shine=pow(max(dot(reflect(-light,n),vec3(0.0,0.0,1.0)),0.0),16.0)*0.11;
 vec3 col=vColor*shaded+vec3(shine);
 gl_FragColor=vec4(col,1.0);
}`;
function compile(gl,type,source){
 const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);
 if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(shader));
 return shader;
}
function program(gl){
 const prg=gl.createProgram();gl.attachShader(prg,compile(gl,gl.VERTEX_SHADER,vertSource));gl.attachShader(prg,compile(gl,gl.FRAGMENT_SHADER,fragSource));gl.linkProgram(prg);
 if(!gl.getProgramParameter(prg,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(prg));return prg;
}
function decodePacked(b64){
 const decoded=atob(b64);
 const bytes=new Uint8Array(decoded.length);
 for(let i=0;i<decoded.length;i++)bytes[i]=decoded.charCodeAt(i);
 return new Float32Array(bytes.buffer);
}
class DysonViewer{
 constructor(canvas){
  this.canvas=canvas;this.gl=canvas.getContext('webgl',{alpha:true,antialias:true,preserveDrawingBuffer:false}) || canvas.getContext('experimental-webgl');
  if(!this.gl || !window.DYSON_MESH_DATA)throw new Error('Este navegador no pudo iniciar el visor 3D.');
  this.yaw=0.44;this.pitch=0.14;this.distance=7.15;this.autoSpin=true;this.alive=true;this.drag=null;this.last=null;
  const gl=this.gl;this.prg=program(gl);gl.useProgram(this.prg);
  this.vertCount=window.DYSON_MESH_DATA.count;
  this.vbo=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,this.vbo);gl.bufferData(gl.ARRAY_BUFFER,decodePacked(window.DYSON_MESH_DATA.base64),gl.STATIC_DRAW);
  for(const [label,offset] of [['aPosition',0],['aNormal',12],['aColor',24]]){
   const loc=gl.getAttribLocation(this.prg,label);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,3,gl.FLOAT,false,36,offset);
  }
  this.uProj=gl.getUniformLocation(this.prg,'uProj');this.uYaw=gl.getUniformLocation(this.prg,'uYaw');this.uPitch=gl.getUniformLocation(this.prg,'uPitch');this.uDistance=gl.getUniformLocation(this.prg,'uDistance');
  gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.disable(gl.CULL_FACE);
  this.onPointerDown=e=>{
   if(e.pointerType==='mouse'&&e.button!==0)return;
   this.drag={id:e.pointerId,x:e.clientX,y:e.clientY};this.autoSpin=false;
   canvas.setPointerCapture(e.pointerId);
   canvas.dispatchEvent(new CustomEvent('dyson-spin-changed',{detail:{playing:false}}));
  };
  this.onPointerMove=e=>{
   if(!this.drag||this.drag.id!==e.pointerId)return;
   const dx=e.clientX-this.drag.x,dy=e.clientY-this.drag.y;
   this.yaw+=dx*0.010;this.pitch=Math.min(1.48,Math.max(-1.48,this.pitch+dy*0.008));this.drag.x=e.clientX;this.drag.y=e.clientY;
  };
  this.onPointerUp=e=>{if(this.drag&&this.drag.id===e.pointerId)this.drag=null;};
  this.onWheel=e=>{e.preventDefault();this.zoom(e.deltaY>0?0.35:-0.35);};
  canvas.addEventListener('pointerdown',this.onPointerDown);canvas.addEventListener('pointermove',this.onPointerMove);
  canvas.addEventListener('pointerup',this.onPointerUp);canvas.addEventListener('pointercancel',this.onPointerUp);
  canvas.addEventListener('wheel',this.onWheel,{passive:false});
  this.frame=requestAnimationFrame(t=>this.render(t));
 }
 zoom(diff){this.distance=Math.max(4.2,Math.min(12.0,this.distance+diff));}
 reset(){this.yaw=0.44;this.pitch=0.14;this.distance=7.15;this.autoSpin=true;this.last=null;}
 render(time){
  if(!this.alive)return;
  const gl=this.gl,c=this.canvas;
  const w=Math.max(1,Math.round(c.clientWidth*Math.min(2,window.devicePixelRatio||1)));
  const h=Math.max(1,Math.round(c.clientHeight*Math.min(2,window.devicePixelRatio||1)));
  if(w!==c.width||h!==c.height){c.width=w;c.height=h;gl.viewport(0,0,w,h);}
  if(this.last!==null&&this.autoSpin)this.yaw+=(Math.min(100,time-this.last)/1000)*0.27;
  this.last=time;
  const aspect=w/h,f=1/Math.tan(40*Math.PI/360),near=0.1,far=100;
  const pr=new Float32Array([f/aspect,0,0,0,0,f,0,0,0,0,(far+near)/(near-far),-1,0,0,2*far*near/(near-far),0]);
  gl.useProgram(this.prg);gl.uniformMatrix4fv(this.uProj,false,pr);gl.uniform1f(this.uYaw,this.yaw);gl.uniform1f(this.uPitch,this.pitch);gl.uniform1f(this.uDistance,this.distance);
  gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES,0,this.vertCount);
  this.frame=requestAnimationFrame(t=>this.render(t));
 }
 destroy(){
  if(!this.alive)return;this.alive=false;cancelAnimationFrame(this.frame);
  const c=this.canvas;
  c.removeEventListener('pointerdown',this.onPointerDown);c.removeEventListener('pointermove',this.onPointerMove);
  c.removeEventListener('pointerup',this.onPointerUp);c.removeEventListener('pointercancel',this.onPointerUp);c.removeEventListener('wheel',this.onWheel);
  this.gl.deleteBuffer(this.vbo);this.gl.deleteProgram(this.prg);
 }
}

/* Fallback para navegadores sin WebGL: fotogramas renderizados a partir de la misma geometría 3D. */
class DysonFallbackViewer{
 constructor(canvas){
  this.canvas=canvas;this.stage=canvas.parentElement;this.yaw=.44;this.pitch=.14;this.distance=7.15;this.autoSpin=true;this.alive=true;this.last=null;this.drag=null;this.prev='';
  this.img=document.createElement('img');this.img.className='dyson-fallback-frame';
  this.img.alt='Vista tridimensional de la recreación de la maqueta, con rotación interactiva';
  this.img.draggable=false;canvas.hidden=true;canvas.after(this.img);
  const img=this.img;
  this.onPointerDown=e=>{if(e.pointerType==='mouse'&&e.button!==0)return;this.drag={id:e.pointerId,x:e.clientX,y:e.clientY};this.autoSpin=false;img.setPointerCapture(e.pointerId);canvas.dispatchEvent(new CustomEvent('dyson-spin-changed',{detail:{playing:false}}));};
  this.onPointerMove=e=>{if(!this.drag||this.drag.id!==e.pointerId)return;this.yaw+=(e.clientX-this.drag.x)*.012;this.pitch=Math.max(-.44,Math.min(.62,this.pitch+(e.clientY-this.drag.y)*.008));this.drag.x=e.clientX;this.drag.y=e.clientY;this.update();};
  this.onPointerUp=e=>{if(this.drag&&this.drag.id===e.pointerId)this.drag=null;};
  this.onWheel=e=>{e.preventDefault();this.zoom(e.deltaY>0?.35:-.35);};
  img.addEventListener('pointerdown',this.onPointerDown);img.addEventListener('pointermove',this.onPointerMove);img.addEventListener('pointerup',this.onPointerUp);img.addEventListener('pointercancel',this.onPointerUp);img.addEventListener('wheel',this.onWheel,{passive:false});
  this.frame=requestAnimationFrame(t=>this.render(t));this.update();
 }
 zoom(delta){this.distance=Math.max(4.3,Math.min(12.0,this.distance+delta));this.update();}
 reset(){this.yaw=.44;this.pitch=.14;this.distance=7.15;this.autoSpin=true;this.last=null;this.update();}
 update(){
  const p=Math.max(0,Math.min(2,Math.round((this.pitch+.44)/.53)));
  const yaw=((this.yaw-.44)%(2*Math.PI)+2*Math.PI)%(2*Math.PI);
  const y=Math.round(yaw/(2*Math.PI)*24)%24;
  const src=`assets/dyson/renders/p${p}_y${String(y).padStart(2,'0')}.webp`;
  if(this.prev!==src){this.img.src=src;this.prev=src;}
  this.img.style.transform=`translate(-50%,-50%) scale(${7.15/this.distance})`;
 }
 render(t){if(!this.alive)return;if(this.last!==null&&this.autoSpin)this.yaw+=Math.min(100,t-this.last)/1000*.26;this.last=t;this.update();this.frame=requestAnimationFrame(tt=>this.render(tt));}
 destroy(){if(!this.alive)return;this.alive=false;cancelAnimationFrame(this.frame);const i=this.img;i.removeEventListener('pointerdown',this.onPointerDown);i.removeEventListener('pointermove',this.onPointerMove);i.removeEventListener('pointerup',this.onPointerUp);i.removeEventListener('pointercancel',this.onPointerUp);i.removeEventListener('wheel',this.onWheel);i.remove();this.canvas.hidden=false;}
}
window.DysonFallbackViewer=DysonFallbackViewer;
window.DysonViewer=DysonViewer;
})();
