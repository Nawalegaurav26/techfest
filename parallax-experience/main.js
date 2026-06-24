/**
 * Beyond the Horizon — Parallax Experience
 * main.js — All animations, parallax, WebGL, Three.js, counters, particles
 *
 * Architecture:
 *  1. Utilities (RAF loop, lerp, clamp)
 *  2. Navigation (scroll-aware, mobile menu, progress bar)
 *  3. Parallax Engine (multi-layer scroll depth)
 *  4. WebGL Hero Shader (cosmic nebula + stars)
 *  5. Three.js About Section (interactive 3D geometry)
 *  6. Stars Canvas (testimonials background)
 *  7. Particle Burst (CTA section)
 *  8. Reveal Animations (IntersectionObserver)
 *  9. Counter Animations
 * 10. Form handler
 * 11. Hero scroll fade
 * 12. Feature card 3D tilt
 * 13. ScrollSpy nav highlighting
 */

'use strict';

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const listen = (el, type, fn, options = {}) => el.addEventListener(type, fn, { passive: true, ...options });

const tickers = new Set();
let rafId = null;
const tick = (time) => { tickers.forEach(fn => fn(time)); rafId = requestAnimationFrame(tick); };
requestAnimationFrame(tick);

/* 2. NAVIGATION */
(function initNav() {
  const nav = document.getElementById('main-nav');
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const backdrop = document.getElementById('mobile-backdrop');
  const closeBtn = document.getElementById('mobile-close');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link, .mobile-menu__cta');

  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.setAttribute('role', 'progressbar');
  progressBar.setAttribute('aria-hidden', 'true');
  document.body.prepend(progressBar);

  listen(window, 'scroll', () => {
    const scrolled = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${(scrolled / docH) * 100}%`;
    nav.classList.toggle('is-scrolled', scrolled > 50);
  });

  function openMenu() {
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  }
  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    hamburger?.focus();
  }

  hamburger?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  backdrop?.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && mobileMenu?.classList.contains('is-open')) closeMenu(); });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
})();

/* 3. PARALLAX ENGINE */
(function initParallax() {
  const elements = document.querySelectorAll('[data-parallax]');
  if (!elements.length) return;
  let scrollY = 0, currentScrollY = 0;
  listen(window, 'scroll', () => { scrollY = window.pageYOffset; });
  tickers.add(() => {
    currentScrollY = lerp(currentScrollY, scrollY, 0.08);
    elements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.5;
      const rect = el.closest('section')?.getBoundingClientRect() ?? { top: 0, height: window.innerHeight };
      const secTop = rect.top + currentScrollY;
      const relY = currentScrollY - secTop;
      el.style.transform = `translateY(${relY * speed}px)`;
    });
  });
})();

/* 4. WEBGL HERO SHADER */
(function initHeroShader() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) { canvas.style.display = 'none'; return; }

  function syncSize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
  }
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(syncSize).observe(canvas);
  syncSize();

  const VS = `attribute vec2 a_pos; varying vec2 v_uv; void main() { v_uv = a_pos * 0.5 + 0.5; gl_Position = vec4(a_pos, 0.0, 1.0); }`;
  const FS = `
    precision highp float;
    uniform float u_time; uniform vec2 u_res; uniform vec2 u_mouse; varying vec2 v_uv;
    float hash21(vec2 p) { p = fract(p * vec2(127.1, 311.7)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
    float noise(vec2 p) { vec2 i = floor(p); vec2 f = fract(p); vec2 u = f*f*(3.0-2.0*f); return mix(mix(hash21(i),hash21(i+vec2(1,0)),u.x),mix(hash21(i+vec2(0,1)),hash21(i+vec2(1,1)),u.x),u.y); }
    float fbm(vec2 p) { float v=0.0,amp=0.5; for(int i=0;i<5;i++){v+=amp*noise(p);p=p*2.0+vec2(1.3,1.7);amp*=0.5;} return v; }
    void main() {
      vec2 p = (gl_FragCoord.xy*2.0-u_res)/min(u_res.x,u_res.y);
      vec2 mouse = (u_mouse/u_res-0.5)*2.0; p += mouse*0.05;
      vec3 col = vec3(0.01,0.01,0.04);
      float n1=fbm(p*1.2+vec2(u_time*0.03,u_time*0.02));
      float n2=fbm(p*1.5+vec2(u_time*-0.02,u_time*0.03)+3.7);
      float n3=fbm(p*0.8+vec2(u_time*0.015,u_time*-0.025)+7.3);
      col += vec3(0.35,0.15,0.80)*n1*0.5*smoothstep(0.3,0.7,n1);
      col += vec3(0.85,0.18,0.48)*n2*0.35*smoothstep(0.35,0.75,n2);
      col += vec3(0.05,0.6,0.8)*n3*0.2*smoothstep(0.4,0.8,n3);
      float vig=1.0-length(v_uv-0.5)*1.4; col*=clamp(vig,0.0,1.0);
      for(float layer=0.0;layer<3.0;layer++){vec2 st=v_uv*(500.0+layer*200.0);vec2 id=floor(st);float h=hash21(id+layer*17.3);if(h>0.994){vec2 gv=fract(st)-0.5;float d=length(gv);float pulse=0.5+0.5*sin(u_time*(1.5+h*3.0)+h*6.28);float star=smoothstep(0.15,0.0,d)*pulse;float brightness=0.4+h*0.6;col+=vec3(brightness,brightness*0.9,1.0)*star*(1.0-layer*0.2);}}
      col=1.0-exp(-col*1.2); col=pow(col,vec3(0.85));
      gl_FragColor=vec4(col,1.0);
    }`;

  function compile(type, src) { const s=gl.createShader(type); gl.shaderSource(s,src); gl.compileShader(s); return s; }
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog); gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(aPos); gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
  const uTime = gl.getUniformLocation(prog,'u_time'), uRes = gl.getUniformLocation(prog,'u_res'), uMouse = gl.getUniformLocation(prog,'u_mouse');
  let mouse = { x: canvas.width/2, y: canvas.height/2 };
  listen(window, 'mousemove', (e) => { const r=canvas.getBoundingClientRect(); if(r.width&&r.height){mouse.x=((e.clientX-r.left)/r.width)*canvas.width;mouse.y=(1-(e.clientY-r.top)/r.height)*canvas.height;} });
  tickers.add((t) => { syncSize(); gl.viewport(0,0,canvas.width,canvas.height); gl.uniform1f(uTime,t*0.001); gl.uniform2f(uRes,canvas.width,canvas.height); gl.uniform2f(uMouse,mouse.x,mouse.y); gl.drawArrays(gl.TRIANGLE_STRIP,0,4); });
})();

/* 5. THREE.JS 3D SCENE */
(function initThreeJS() {
  if (typeof THREE === 'undefined') return;
  const container = document.getElementById('threejs-container');
  if (!container) return;
  const w = container.clientWidth||400, h = container.clientHeight||400;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, w/h, 0.1, 100);
  camera.position.set(0,0,3.5);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(w,h); renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)); renderer.setClearColor(0x000000,0);
  container.appendChild(renderer.domElement);
  const geo = new THREE.IcosahedronGeometry(1.1,1);
  const matSolid = new THREE.MeshPhongMaterial({ color:0x7C3AED, emissive:0x3b0764, specular:0xffffff, shininess:80, transparent:true, opacity:0.85, flatShading:true });
  const matWire = new THREE.MeshBasicMaterial({ color:0xEC4899, wireframe:true, transparent:true, opacity:0.35 });
  const solid = new THREE.Mesh(geo,matSolid); const wireframe = new THREE.Mesh(geo,matWire); solid.add(wireframe); scene.add(solid);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.6,0.012,16,100), new THREE.MeshBasicMaterial({ color:0x8B5CF6, transparent:true, opacity:0.4 }));
  ring.rotation.x = Math.PI/3; scene.add(ring);
  const partGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(80*3);
  for(let i=0;i<80;i++){const t=Math.random()*Math.PI*2,p=Math.acos(2*Math.random()-1),r=1.8+Math.random()*0.8;positions[i*3]=r*Math.sin(p)*Math.cos(t);positions[i*3+1]=r*Math.sin(p)*Math.sin(t);positions[i*3+2]=r*Math.cos(p);}
  partGeo.setAttribute('position',new THREE.BufferAttribute(positions,3));
  const particles = new THREE.Points(partGeo, new THREE.PointsMaterial({ color:0x06B6D4, size:0.035, transparent:true, opacity:0.7 }));
  scene.add(particles);
  scene.add(new THREE.AmbientLight(0x4020a0,0.8));
  const pLight1 = new THREE.PointLight(0xEC4899,2,10); pLight1.position.set(3,3,3); scene.add(pLight1);
  scene.add(Object.assign(new THREE.PointLight(0x06B6D4,1.5,10),{position:{x:-3,y:-2,z:2}}));
  let isDragging=false,prevX=0,prevY=0,rotX=0,rotY=0,velX=0,velY=0;
  container.addEventListener('mousedown',(e)=>{isDragging=true;prevX=e.clientX;prevY=e.clientY;});
  window.addEventListener('mouseup',()=>isDragging=false);
  window.addEventListener('mousemove',(e)=>{if(!isDragging)return;velX=(e.clientX-prevX)*0.01;velY=(e.clientY-prevY)*0.01;prevX=e.clientX;prevY=e.clientY;});
  container.addEventListener('touchstart',(e)=>{isDragging=true;prevX=e.touches[0].clientX;prevY=e.touches[0].clientY;},{passive:true});
  window.addEventListener('touchend',()=>isDragging=false,{passive:true});
  window.addEventListener('touchmove',(e)=>{if(!isDragging)return;velX=(e.touches[0].clientX-prevX)*0.01;velY=(e.touches[0].clientY-prevY)*0.01;prevX=e.touches[0].clientX;prevY=e.touches[0].clientY;},{passive:true});
  tickers.add((t)=>{
    const time=t*0.001;
    if(!isDragging){velX*=0.93;velY*=0.93;rotX+=0.004;rotY+=0.003;}
    rotX+=velY;rotY+=velX;
    solid.rotation.x=rotX;solid.rotation.y=rotY;solid.position.y=Math.sin(time*0.7)*0.1;
    ring.rotation.z=time*0.15;particles.rotation.y=time*0.08;particles.rotation.x=time*0.05;
    pLight1.intensity=1.5+Math.sin(time*1.5)*0.5;
    renderer.render(scene,camera);
  });
  window.addEventListener('resize',()=>{const w2=container.clientWidth||400,h2=container.clientHeight||400;camera.aspect=w2/h2;camera.updateProjectionMatrix();renderer.setSize(w2,h2);});
})();

/* 6. STARS CANVAS */
(function initStars() {
  const canvas = document.getElementById('stars-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  function resize() { canvas.width=canvas.clientWidth||window.innerWidth; canvas.height=canvas.clientHeight||400; }
  resize(); listen(window,'resize',resize);
  const stars = Array.from({length:200},()=>({x:Math.random(),y:Math.random(),r:Math.random()*1.5+0.3,speed:Math.random()*0.3+0.1,phase:Math.random()*Math.PI*2}));
  tickers.add((t)=>{
    const time=t*0.001, W=canvas.width, H=canvas.height;
    ctx.clearRect(0,0,W,H);
    stars.forEach(s=>{
      const alpha=0.3+0.5*Math.sin(time*s.speed+s.phase);
      ctx.beginPath(); ctx.arc(s.x*W,s.y*H,s.r*(0.8+0.4*Math.sin(time*s.speed*2+s.phase)),0,Math.PI*2);
      ctx.fillStyle=`rgba(255,255,255,${alpha})`; ctx.fill();
    });
  });
})();

/* 7. PARTICLE BURST */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  function resize() { canvas.width=canvas.clientWidth||window.innerWidth; canvas.height=canvas.clientHeight||600; }
  resize(); listen(window,'resize',resize);
  const COLORS=['#8B5CF6','#EC4899','#06B6D4','#a78bfa','#f472b6','#22d3ee'];
  function newAmbient(){return{x:Math.random(),y:1+Math.random()*0.2,vx:(Math.random()-0.5)*0.001,vy:-(0.0003+Math.random()*0.0008),r:Math.random()*2.5+0.5,alpha:Math.random()*0.5+0.1,color:COLORS[Math.floor(Math.random()*COLORS.length)],life:0,maxLife:0.6+Math.random()*0.4};}
  const particles = Array.from({length:80},()=>newAmbient());
  tickers.add((t)=>{
    const time=t*0.001,W=canvas.width,H=canvas.height,CX=W/2,CY=H/2;
    ctx.clearRect(0,0,W,H);
    particles.forEach((p,i)=>{
      p.life+=0.004; if(p.life>p.maxLife){particles[i]=newAmbient();return;}
      const progress=p.life/p.maxLife,alpha=p.alpha*Math.sin(progress*Math.PI);
      const x=p.x*W+p.vx*W*p.life*1000,y=p.y*H+p.vy*H*p.life*1000,r=p.r*(0.8+0.4*Math.sin(time*2+i));
      const glow=ctx.createRadialGradient(x,y,0,x,y,r*4);
      glow.addColorStop(0,p.color+Math.round(alpha*255).toString(16).padStart(2,'0'));
      glow.addColorStop(1,p.color+'00');
      ctx.beginPath();ctx.arc(x,y,r*4,0,Math.PI*2);ctx.fillStyle=glow;ctx.fill();
      ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=p.color;ctx.globalAlpha=alpha;ctx.fill();ctx.globalAlpha=1;
    });
    const ringR=80+Math.sin(time*1.5)*15;
    const ringGrad=ctx.createRadialGradient(CX,CY,ringR*0.8,CX,CY,ringR);
    ringGrad.addColorStop(0,'rgba(139,92,246,0.08)');ringGrad.addColorStop(0.5,'rgba(139,92,246,0.15)');ringGrad.addColorStop(1,'rgba(139,92,246,0)');
    ctx.beginPath();ctx.arc(CX,CY,ringR,0,Math.PI*2);ctx.fillStyle=ringGrad;ctx.fill();
  });
})();

/* 8. REVEAL ANIMATIONS */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);} });
  }, { rootMargin:'0px 0px -60px 0px', threshold:0.12 });
  elements.forEach(el=>observer.observe(el));
})();

/* 9. COUNTER ANIMATIONS */
(function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry=>{ if(!entry.isIntersecting)return; animateCounter(entry.target); observer.unobserve(entry.target); });
  }, { threshold:0.5 });
  counters.forEach(el=>observer.observe(el));
  function animateCounter(el) {
    const target=parseInt(el.dataset.target,10), duration=2400, start=performance.now();
    const ease=(t)=>t===1?1:1-Math.pow(2,-10*t);
    function format(v){if(target>=1000){if(v<target)return Math.round(v).toLocaleString();return(target/1000).toFixed(target%1000===0?0:1)+'K';}return Math.round(v);}
    function update(now){const elapsed=now-start,progress=clamp(elapsed/duration,0,1),value=ease(progress)*target;el.textContent=format(value);if(progress<1)requestAnimationFrame(update);else el.textContent=format(target);}
    requestAnimationFrame(update);
  }
})();

/* 10. FORM HANDLER */
(function initForm() {
  const form=document.getElementById('cta-form'),input=document.getElementById('cta-email'),button=document.getElementById('cta-submit-btn');
  if (!form) return;
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email=input.value.trim(),valid=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if(!valid){input.style.borderColor='#EC4899';input.setAttribute('aria-invalid','true');input.focus();setTimeout(()=>{input.style.borderColor='';input.removeAttribute('aria-invalid');},2500);return;}
    button.textContent='\u2726 Launched!';button.style.background='#06B6D4';button.disabled=true;input.value='';
    setTimeout(()=>{button.innerHTML='<span>Launch</span><span class="material-symbols-outlined" aria-hidden="true">rocket_launch</span>';button.style.background='';button.disabled=false;},4000);
  });
})();

/* 11. HERO SCROLL FADE */
(function initHeroFade() {
  const content=document.getElementById('hero-content'),indicator=document.getElementById('scroll-indicator');
  if(!content)return;
  let scrollY=0;
  listen(window,'scroll',()=>{scrollY=window.pageYOffset;});
  tickers.add(()=>{
    const progress=clamp(scrollY/(window.innerHeight*0.5),0,1),opacity=1-progress,ty=progress*-40;
    if(content){content.style.opacity=opacity;content.style.transform=`translateY(${ty}px)`;}
    if(indicator)indicator.style.opacity=1-clamp(scrollY/150,0,1);
  });
})();

/* 12. FEATURE CARD 3D TILT */
(function initCardTilt() {
  document.querySelectorAll('.feature-card').forEach(card=>{
    card.addEventListener('mousemove',(e)=>{
      const rect=card.getBoundingClientRect(),x=(e.clientX-rect.left)/rect.width-0.5,y=(e.clientY-rect.top)/rect.height-0.5;
      card.style.transform=`translateY(-6px) perspective(600px) rotateX(${-y*10}deg) rotateY(${x*10}deg)`;
    });
    card.addEventListener('mouseleave',()=>{card.style.transform='';});
  });
})();

/* 13. SCROLLSPY NAV */
(function initScrollSpy() {
  const sections=document.querySelectorAll('section[id]'),navLinks=document.querySelectorAll('.nav__link');
  listen(window,'scroll',()=>{
    let current='';
    sections.forEach(section=>{if(section.getBoundingClientRect().top<window.innerHeight*0.4)current=section.id;});
    navLinks.forEach(link=>{const href=link.getAttribute('href').slice(1);link.style.color=href===current?'#8B5CF6':'';});
  });
})();

console.log('%c✦ Beyond the Horizon','color:#8B5CF6;font-size:18px;font-weight:bold;');
console.log('%cParallax experience loaded. Enjoy the cosmos!','color:#EC4899;font-size:12px;');
