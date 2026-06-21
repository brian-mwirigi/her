/* =========================================
   FALLING FLOWER PETALS — PREMIUM ENGINE
   ========================================= */
(function () {
  const canvas = document.getElementById('petals-canvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Rich petal color palette — purples, pinks, golds, soft lavenders
  const petalPalettes = [
    { fill: 'rgba(201, 79, 181, 0.55)', stroke: 'rgba(228, 160, 213, 0.3)' },   // magenta
    { fill: 'rgba(167, 139, 250, 0.45)', stroke: 'rgba(196, 181, 253, 0.3)' },   // lavender
    { fill: 'rgba(245, 216, 154, 0.4)',  stroke: 'rgba(255, 224, 160, 0.3)' },   // gold
    { fill: 'rgba(255, 126, 179, 0.5)',  stroke: 'rgba(255, 182, 213, 0.3)' },   // coral pink
    { fill: 'rgba(228, 160, 213, 0.5)',  stroke: 'rgba(255, 214, 236, 0.3)' },   // soft pink
    { fill: 'rgba(196, 181, 253, 0.4)',  stroke: 'rgba(221, 214, 254, 0.3)' },   // pale purple
    { fill: 'rgba(255, 180, 162, 0.4)',  stroke: 'rgba(255, 214, 204, 0.3)' },   // peach
  ];

  class Petal {
    constructor() {
      this.reset();
      this.y = Math.random() * -canvas.height;
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = -25;
      this.size = Math.random() * 14 + 7;
      this.speedY = Math.random() * 1 + 0.3;
      this.speedX = Math.random() * 0.6 - 0.3;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.025;
      this.palette = petalPalettes[Math.floor(Math.random() * petalPalettes.length)];
      this.opacity = Math.random() * 0.5 + 0.25;
      this.swayAmplitude = Math.random() * 50 + 25;
      this.swaySpeed = Math.random() * 0.015 + 0.008;
      this.swayOffset = Math.random() * Math.PI * 2;
      this.life = 0;
      // Second petal layer for a more realistic look
      this.hasTwin = Math.random() > 0.4;
      this.twinAngle = Math.random() * 0.6 + 0.3;
    }

    update() {
      this.life++;
      this.y += this.speedY;
      this.x += Math.sin(this.life * this.swaySpeed + this.swayOffset) * 0.6 + this.speedX;
      this.rotation += this.rotationSpeed;
      if (this.y > canvas.height + 30) this.reset();
    }

    drawPetalShape(cx, cy, s, angle) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(s * 0.5, -s * 0.6, s * 1.1, -s * 0.35, s * 0.55, s * 0.45);
      ctx.bezierCurveTo(s * 0.25, s * 0.85, -s * 0.15, s * 0.55, 0, 0);
      ctx.fillStyle = this.palette.fill;
      ctx.fill();

      // Subtle inner vein line
      ctx.beginPath();
      ctx.moveTo(s * 0.05, s * 0.05);
      ctx.quadraticCurveTo(s * 0.4, s * 0.1, s * 0.35, s * 0.35);
      ctx.strokeStyle = this.palette.stroke;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.restore();
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;

      // Main petal
      this.drawPetalShape(0, 0, this.size, 0);

      // Twin petal for fullness
      if (this.hasTwin) {
        ctx.globalAlpha = this.opacity * 0.6;
        this.drawPetalShape(0, 0, this.size * 0.85, this.twinAngle * Math.PI);
      }

      // Soft glow
      ctx.globalAlpha = this.opacity * 0.15;
      const grad = ctx.createRadialGradient(this.size * 0.3, this.size * 0.2, 0, this.size * 0.3, this.size * 0.2, this.size);
      grad.addColorStop(0, this.palette.fill);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(-this.size, -this.size, this.size * 3, this.size * 3);

      ctx.restore();
    }
  }

  const petals = [];
  const count = Math.min(55, Math.floor(window.innerWidth / 28));
  for (let i = 0; i < count; i++) petals.push(new Petal());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of petals) { p.update(); p.draw(); }
    requestAnimationFrame(animate);
  }
  animate();

  /* =========================================
     FLOATING HEARTS — SOFTER PALETTE
     ========================================= */
  const heartsBg = document.getElementById('hearts-bg');
  const heartChars = ['♥', '♡', '❤', '💕', '💗', '✦', '✧'];
  const heartHues = [290, 300, 310, 320, 270, 40]; // purples, magentas, gold

  function createFloatingHeart() {
    const el = document.createElement('span');
    el.className = 'floating-heart';
    el.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
    el.style.left = Math.random() * 100 + '%';
    el.style.fontSize = (Math.random() * 1 + 0.5) + 'rem';
    el.style.animationDuration = (Math.random() * 10 + 10) + 's';
    el.style.animationDelay = Math.random() * 3 + 's';
    const hue = heartHues[Math.floor(Math.random() * heartHues.length)];
    el.style.color = `hsl(${hue}, ${60 + Math.random() * 30}%, ${65 + Math.random() * 20}%)`;
    heartsBg.appendChild(el);
    setTimeout(() => el.remove(), 22000);
  }

  setInterval(createFloatingHeart, 1200);
  for (let i = 0; i < 6; i++) setTimeout(createFloatingHeart, i * 300);

  /* =========================================
     SPARKLE CURSOR — RICHER COLORS
     ========================================= */
  const sparkleContainer = document.getElementById('sparkle-container');
  let lastSpark = 0;
  const sparkleColors = [
    'rgba(201, 79, 181, .8)',
    'rgba(167, 139, 250, .8)',
    'rgba(245, 216, 154, .8)',
    'rgba(255, 126, 179, .7)',
    'rgba(255, 255, 255, .5)',
    'rgba(228, 160, 213, .7)'
  ];

  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastSpark < 45) return;
    lastSpark = now;

    const sp = document.createElement('div');
    sp.className = 'sparkle';
    const sz = Math.random() * 5 + 2.5;
    sp.style.width = sz + 'px';
    sp.style.height = sz + 'px';
    sp.style.left = (e.clientX - sz / 2) + 'px';
    sp.style.top = (e.clientY - sz / 2) + 'px';
    const c = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
    sp.style.background = c;
    sp.style.boxShadow = `0 0 ${sz * 3}px ${c}`;
    sparkleContainer.appendChild(sp);
    setTimeout(() => sp.remove(), 700);
  });

  /* =========================================
     SCROLL REVEAL
     ========================================= */
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.section-title').forEach(el => obs.observe(el));
  const lc = document.getElementById('letter-card');
  if (lc) obs.observe(lc);
  document.querySelectorAll('.timeline-item').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.2) + 's';
    obs.observe(el);
  });
  const pc = document.querySelector('.promise-card');
  if (pc) obs.observe(pc);

  /* =========================================
     PARALLAX HERO GLOW
     ========================================= */
  const heroGlow = document.querySelector('.hero-glow');
  document.addEventListener('mousemove', (e) => {
    if (!heroGlow) return;
    const x = (e.clientX / window.innerWidth - .5) * 25;
    const y = (e.clientY / window.innerHeight - .5) * 25;
    heroGlow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
  });

  /* =========================================
     INTRO OVERLAY + MUSIC — ELVIS PRESLEY
     ========================================= */
  const introOverlay = document.getElementById('intro-overlay');
  const introBtn = document.getElementById('intro-btn');
  const musicToggle = document.getElementById('music-toggle');
  const bgMusic = document.getElementById('bg-music');
  let isPlaying = false;

  if (bgMusic) bgMusic.volume = 0.5;

  // Intro button starts the music and fades away the overlay
  if (introBtn && introOverlay) {
    introBtn.addEventListener('click', () => {
      introOverlay.classList.add('hidden');
      if (bgMusic) {
        bgMusic.play().then(() => {
          isPlaying = true;
          musicToggle.classList.add('playing');
        }).catch(() => {});
      }
    });
  }

  // Toggle button to pause/resume
  if (musicToggle && bgMusic) {
    musicToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isPlaying) {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        isPlaying = false;
      } else {
        bgMusic.play();
        musicToggle.classList.add('playing');
        isPlaying = true;
      }
    });
  }

  /* =========================================
     CLICK HEART BURST — RICHER
     ========================================= */
  const burstHues = [290, 305, 320, 335, 40, 270]; // purple-pink-gold range

  document.addEventListener('click', (e) => {
    for (let i = 0; i < 8; i++) {
      const h = document.createElement('span');
      h.textContent = Math.random() > 0.3 ? '♥' : '✦';
      h.style.cssText = `
        position:fixed;
        left:${e.clientX}px; top:${e.clientY}px;
        pointer-events:none; z-index:99999;
        font-size:${Math.random() * 14 + 8}px;
        transition:all .8s cubic-bezier(.25,.46,.45,.94);
        opacity:1;
      `;
      const hue = burstHues[Math.floor(Math.random() * burstHues.length)];
      h.style.color = `hsl(${hue}, 75%, ${60 + Math.random() * 20}%)`;
      h.style.textShadow = `0 0 8px hsla(${hue}, 80%, 60%, .5)`;
      document.body.appendChild(h);

      const angle = (Math.PI * 2 / 8) * i + (Math.random() - .5) * .5;
      const dist = 35 + Math.random() * 45;

      requestAnimationFrame(() => {
        h.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist - 35}px) scale(0) rotate(${Math.random() * 180}deg)`;
        h.style.opacity = '0';
      });
      setTimeout(() => h.remove(), 850);
    }
  });

  /* =========================================
     SUBTITLE GLOW PULSE
     ========================================= */
  const sub = document.querySelector('.hero-subtitle');
  if (sub) {
    setInterval(() => {
      const intensity = 10 + Math.random() * 15;
      const alpha = 0.15 + Math.random() * 0.25;
      sub.style.textShadow = `0 0 ${intensity}px rgba(201, 79, 181, ${alpha}), 0 0 ${intensity * 2}px rgba(167, 139, 250, ${alpha * 0.5})`;
    }, 2500);
  }

})();
