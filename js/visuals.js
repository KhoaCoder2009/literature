/* =========================================================================
   3. BACKGROUND CANVAS PARTICLES, HERO SHOWCASE & ANIMATIONS
   ========================================================================= */

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let bgParticles = [];
let mouseWind = { x: 0, y: 0 };
let lastMouse = { x: 0, y: 0 };
let bgAnimTime = 0;
let bgParticlesEnabled = true;

try {
  bgParticlesEnabled = localStorage.getItem('vq_bg_particles') !== 'false';
} catch(e) {}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initBgParticles();
}
window.addEventListener('resize', resizeCanvas);

function initBgParticles() {
  bgParticles = [];
  const count = Math.min(45, Math.floor(window.innerWidth / 32));
  for (let i = 0; i < count; i++) {
    const type = i % 3 === 0 ? 'petal' : (i % 3 === 1 ? 'sparkle' : 'leaf');
    bgParticles.push({
      type,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: type === 'sparkle' ? 1.5 + Math.random() * 2.5 : 8 + Math.random() * 10,
      speedY: type === 'sparkle' ? 0.3 + Math.random() * 0.4 : 0.6 + Math.random() * 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      angle: Math.random() * Math.PI * 2,
      angularSpeed: (Math.random() - 0.5) * 0.025,
      phase: Math.random() * Math.PI * 2,
      opacity: type === 'sparkle' ? 0.45 + Math.random() * 0.45 : 0.28 + Math.random() * 0.42
    });
  }
}
resizeCanvas();

window.addEventListener('mousemove', e => {
  const dx = e.clientX - lastMouse.x;
  const dy = e.clientY - lastMouse.y;
  mouseWind.x += dx * 0.02;
  mouseWind.y += dy * 0.02;
  mouseWind.x = Math.max(-2, Math.min(2, mouseWind.x));
  mouseWind.y = Math.max(-2, Math.min(2, mouseWind.y));
  lastMouse.x = e.clientX;
  lastMouse.y = e.clientY;
}, { passive: true });

function drawLotusPetal(c, x, y, size, angle, opacity, isDark) {
  c.save();
  c.translate(x, y);
  c.rotate(angle);
  c.beginPath();
  c.moveTo(0, -size);
  c.bezierCurveTo(size * 0.75, -size * 0.4, size * 0.75, size * 0.65, 0, size);
  c.bezierCurveTo(-size * 0.75, size * 0.65, -size * 0.75, -size * 0.4, 0, -size);
  
  const grad = c.createLinearGradient(0, -size, 0, size);
  if (isDark) {
    grad.addColorStop(0, 'rgba(244, 114, 182, ' + (opacity * 0.75) + ')');
    grad.addColorStop(1, 'rgba(251, 191, 36, ' + (opacity * 0.5) + ')');
  } else {
    grad.addColorStop(0, 'rgba(251, 113, 133, ' + opacity + ')');
    grad.addColorStop(0.5, 'rgba(244, 114, 182, ' + (opacity * 0.85) + ')');
    grad.addColorStop(1, 'rgba(253, 224, 71, ' + (opacity * 0.6) + ')');
  }
  c.fillStyle = grad;
  c.fill();
  c.restore();
}

function drawSparkleParticle(c, x, y, radius, alpha, isDark) {
  c.save();
  c.beginPath();
  c.arc(x, y, radius, 0, Math.PI * 2);
  c.fillStyle = isDark ? '#fef08a' : '#f59e0b';
  c.globalAlpha = alpha;
  c.shadowColor = '#facc15';
  c.shadowBlur = 6;
  c.fill();
  c.restore();
}

function drawAutumnLeaf(c, x, y, size, angle, opacity, isDark) {
  c.save();
  c.translate(x, y);
  c.rotate(angle);
  c.beginPath();
  c.moveTo(0, -size);
  c.quadraticCurveTo(size * 0.45, 0, 0, size);
  c.quadraticCurveTo(-size * 0.45, 0, 0, -size);
  c.fillStyle = isDark ? 'rgba(52, 211, 153, ' + opacity + ')' : 'rgba(16, 185, 129, ' + (opacity * 0.85) + ')';
  c.fill();
  c.restore();
}

function drawBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (bgParticlesEnabled) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    bgAnimTime += 0.015;

    mouseWind.x *= 0.96;
    mouseWind.y *= 0.96;

    for (let i = 0; i < bgParticles.length; i++) {
      const p = bgParticles[i];
      p.angle += p.angularSpeed;
      p.x += p.speedX + Math.sin(bgAnimTime + p.phase) * 0.75 + mouseWind.x;
      p.y += p.speedY + mouseWind.y * 0.5;

      if (p.y > canvas.height + 25) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
      if (p.x < -25) p.x = canvas.width + 20;
      if (p.x > canvas.width + 25) p.x = -20;

      if (p.type === 'petal') {
        drawLotusPetal(ctx, p.x, p.y, p.size, p.angle, p.opacity, isDark);
      } else if (p.type === 'sparkle') {
        const pulseAlpha = p.opacity * (0.6 + Math.sin(bgAnimTime * 2.5 + p.phase) * 0.4);
        drawSparkleParticle(ctx, p.x, p.y, p.size, pulseAlpha, isDark);
      } else if (p.type === 'leaf') {
        drawAutumnLeaf(ctx, p.x, p.y, p.size, p.angle, p.opacity, isDark);
      }
    }
  }

  requestAnimationFrame(drawBackground);
}
drawBackground();

/* === HERO STUDY QUOTES === */
const HERO_STUDY_QUOTES = [
  {
    tag: '✨ LỜI DẠY CỦA BÁC HỒ',
    quote: '“Non sông Việt Nam có trở nên tươi đẹp hay không, dân tộc Việt Nam có bước tới đài vinh quang để sánh vai với các cường quốc năm châu được hay không, chính là nhờ một phần lớn ở công học tập của các em.”',
    author: '— Chủ tịch Hồ Chí Minh —',
    img: './assets/bac-ho.jpg',
    accent: '#f59e0b',
    border: '#f59e0b',
    bgLight: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
    bgDark: 'linear-gradient(135deg, #451a03 0%, #78350f 100%)'
  },
  {
    tag: '💡 TRI THỨC LÀ SỨC MẠNH',
    quote: '“Học, học nữa, học mãi.”',
    author: '— V.I. Lê-nin —',
    img: './assets/lenin.jpg',
    accent: '#ef4444',
    border: '#ef4444',
    bgLight: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
    bgDark: 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 100%)'
  },
  {
    tag: '🌟 BẢN LĨNH TRI THỨC',
    quote: '“Giáo dục là vũ khí mạnh nhất mà bạn có thể dùng để thay đổi thế giới.”',
    author: '— Nelson Mandela —',
    img: './assets/mandela.jpg',
    accent: '#10b981',
    border: '#10b981',
    bgLight: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
    bgDark: 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)'
  },
  {
    tag: '✨ ÁNH SÁNG TÂM HỒN',
    quote: '“Văn học là nhân đạo hóa con người.”',
    author: '— Victor Hugo —',
    img: './assets/victor-hugo.jpg',
    accent: '#8b5cf6',
    border: '#8b5cf6',
    bgLight: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
    bgDark: 'linear-gradient(135deg, #2e1065 0%, #4c1d95 100%)'
  },
  {
    tag: '📚 ĐAM MÊ KHÁM PHÁ',
    quote: '“Học tập không bao giờ làm cạn kiệt trí óc.”',
    author: '— Leonardo da Vinci —',
    img: './assets/aristotle.jpg',
    accent: '#06b6d4',
    border: '#06b6d4',
    bgLight: 'linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)',
    bgDark: 'linear-gradient(135deg, #083344 0%, #164e63 100%)'
  }
];

let heroQuoteIndex = 0;
let heroQuoteTimer = null;

function applyHeroQuote(idx, animate = true) {
  const item = HERO_STUDY_QUOTES[idx];
  if (!item) return;

  const card = document.querySelector('#hero-study-card');
  const img = document.querySelector('#study-img');
  const tag = document.querySelector('#study-tag');
  const quote = document.querySelector('#study-quote');
  const author = document.querySelector('#study-author');

  if (!card || !img || !quote) return;

  const updateContent = () => {
    img.src = item.img;
    img.alt = item.author;
    tag.textContent = item.tag;
    quote.textContent = item.quote;
    author.textContent = item.author;

    // Apply font size adjustment for long quotes
    if (item.quote.length > 90) {
      quote.classList.add('long-quote');
    } else {
      quote.classList.remove('long-quote');
    }

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    card.style.background = isDark ? item.bgDark : item.bgLight;
    card.style.borderColor = item.border;
    tag.style.color = item.accent;
  };

  if (animate && typeof gsap !== 'undefined') {
    gsap.to(card, {
      opacity: 0,
      scale: 0.98,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        updateContent();
        gsap.to(card, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out'
        });
      }
    });
  } else {
    updateContent();
  }
}

function rotateHeroQuote() {
  heroQuoteIndex = (heroQuoteIndex + 1) % HERO_STUDY_QUOTES.length;
  applyHeroQuote(heroQuoteIndex, true);
}

function startHeroQuoteRotation() {
  stopHeroQuoteRotation();
  heroQuoteTimer = setInterval(rotateHeroQuote, 8500);
}

function stopHeroQuoteRotation() {
  if (heroQuoteTimer) {
    clearInterval(heroQuoteTimer);
    heroQuoteTimer = null;
  }
}

function animateScreenIn(screenId) {
  if (typeof gsap === 'undefined') return;
  const target = document.querySelector('#s-' + screenId);
  if (!target) return;
  gsap.fromTo(target, 
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', clearProps: 'all' }
  );
}
