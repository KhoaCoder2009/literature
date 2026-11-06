/* =========================================================================
   3. BACKGROUND CANVAS PARTICLES, HERO SHOWCASE & ANIMATIONS
   ========================================================================= */

const canvas = document.getElementById('bg-canvas');
const ctx = canvas && typeof canvas.getContext === 'function' ? canvas.getContext('2d') : null;
let bgParticles = [];
let mouseWind = { x: 0, y: 0 };
let lastMouse = { x: 0, y: 0 };
let bgAnimTime = 0;
let bgParticlesEnabled = true;

try {
  bgParticlesEnabled = localStorage.getItem('vq_bg_particles') !== 'false';
} catch(e) {}

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initBgParticles();
}
if (canvas) {
  window.addEventListener('resize', resizeCanvas);
}

function initBgParticles() {
  if (!canvas) return;
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
if (canvas && ctx) {
  resizeCanvas();
}

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
  if (!canvas || !ctx) return;
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

/* === HERO STUDY QUOTES: NHẬN ĐỊNH VĂN HỌC & TRUYỀN CẢM HỨNG === */
const HERO_STUDY_QUOTES = [
  {
    tag: 'LÝ LUẬN VĂN HỌC',
    quote: '“Văn học là nhân học.”',
    author: '— M. Gorki —',
    tip: 'Dùng làm câu dẫn Mở bài hoặc Kết bài cho các đề nghị luận về giá trị nhân đạo và sứ mệnh nuôi dưỡng tâm hồn của văn chương.',
    img: './assets/gorki.jpg',
    accent: '#b45309',
    border: '#f59e0b',
    bgLight: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 45%, #fffdf5 100%)',
    bgDark: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
  },
  {
    tag: 'LÝ LUẬN VĂN HỌC',
    quote: '“Nghệ thuật không cần phải là ánh trăng lừa dối, nghệ thuật không nên là ánh trăng lừa dối, nghệ thuật có thể chỉ là tiếng đau khổ kia, thoát ra từ những kiếp lầm than.”',
    author: '— Nam Cao (Trăng sáng) —',
    tip: 'Rất đắt giá khi phân tích mối quan hệ giữa văn học và hiện thực cuộc sống, hoặc khi viết về các tác phẩm hiện thực phê phán.',
    img: './assets/nam-cao.jpg',
    accent: '#dc2626',
    border: '#ef4444',
    bgLight: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 45%, #fffdf8 100%)',
    bgDark: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
  },
  {
    tag: 'THIÊN CHỨC NHÀ VĂN',
    quote: '“Nhà văn tồn tại ở trên đời có lẽ trước hết là để làm công việc giống như kẻ nâng giấc cho những con người bị cùng đường, tuyệt lộ, bị cái ác hoặc số phận đen đủi dồn đến chân tường.”',
    author: '— Nguyễn Minh Châu —',
    tip: 'Dùng để bàn luận sâu sắc về tấm lòng nhân đạo, sự thấu cảm và thiên chức bảo vệ con người của người cầm bút.',
    img: './assets/nguyen-minh-chau.jpg',
    accent: '#059669',
    border: '#10b981',
    bgLight: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 45%, #fafffd 100%)',
    bgDark: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
  },
  {
    tag: 'LÝ LUẬN VỀ THƠ',
    quote: '“Thơ là tiếng lòng, là sự đồng điệu giữa tâm hồn nhà thơ và tâm hồn người đọc.”',
    author: '— Tố Hữu —',
    tip: 'Áp dụng tuyệt vời cho Mở bài hoặc Kết bài của mọi đề phân tích, cảm nhận một đoạn thơ trữ tình.',
    img: './assets/to-huu.jpg',
    accent: '#7c3aed',
    border: '#8b5cf6',
    bgLight: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 45%, #fcfaff 100%)',
    bgDark: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
  },
  {
    tag: 'SỨ MỆNH VĂN CHƯƠNG',
    quote: '“Văn chương không phải là cách đem đến cho người đọc sự thoát ly hay sự quên; trái lại văn chương là một thứ khí giới thanh cao và đắc lực mà chúng ta có, để vừa tố cáo và thay đổi một cái thế giới giả dối và tàn ác, vừa làm cho lòng người được thêm trong sạch và phong phú hơn.”',
    author: '— Thạch Lam (Theo dòng) —',
    tip: 'Nhận định vàng cho mọi bài văn nghị luận khi bàn về chức năng giáo dục và thanh lọc tâm hồn của văn chương.',
    img: './assets/thach-lam.jpg',
    accent: '#0891b2',
    border: '#06b6d4',
    bgLight: 'linear-gradient(135deg, #ecfeff 0%, #cffafe 45%, #fafffd 100%)',
    bgDark: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
  },
  {
    tag: 'GIÁ TRỊ NHÂN ĐẠO',
    quote: '“Văn học là nhân đạo hóa con người.”',
    author: '— Victor Hugo —',
    tip: 'Dùng làm câu dẫn khi phân tích tư tưởng nhân văn, tình yêu thương con người trong tác phẩm văn học.',
    img: './assets/victor-hugo.jpg',
    accent: '#7c3aed',
    border: '#8b5cf6',
    bgLight: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 45%, #fcfaff 100%)',
    bgDark: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
  },
  {
    tag: 'LÝ TƯỞNG SỐNG · NLXH',
    quote: '“Nếu là con chim, chiếc lá / Thì con chim phải hót, chiếc lá phải xanh / Lẽ nào vay mà không có trả / Sống là cho, đâu chỉ nhận riêng mình.”',
    author: '— Tố Hữu —',
    tip: 'Dẫn chứng thơ cực hay cho đoạn văn 200 chữ về lối sống cống hiến, lòng nhân ái, trách nhiệm của tuổi trẻ.',
    img: './assets/to-huu.jpg',
    accent: '#059669',
    border: '#10b981',
    bgLight: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 45%, #fafffd 100%)',
    bgDark: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
  },
  {
    tag: 'SÁNG TẠO NGHỆ THUẬT',
    quote: '“Mỗi tác phẩm phải là một phát minh về hình thức và một khám phá về nội dung.”',
    author: '— Leonid Leonov —',
    tip: 'Dùng để đánh giá tài năng độc đáo, phong cách nghệ thuật riêng biệt của tác giả ở phần Đánh giá chung.',
    img: './assets/leonov.jpg',
    accent: '#b45309',
    border: '#f59e0b',
    bgLight: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 45%, #fffdf5 100%)',
    bgDark: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
  },
  {
    tag: 'BẢN LĨNH SỐNG · NLXH',
    quote: '“Con người có thể bị hủy diệt chứ không thể bị khuất phục.”',
    author: '— Ernest Hemingway (Ông già và biển cả) —',
    tip: 'Câu châm ngôn kinh điển cho các đề nghị luận xã hội về nghị lực vượt khó, ý chí kiên cường trước nghịch cảnh.',
    img: './assets/hemingway.jpg',
    accent: '#dc2626',
    border: '#ef4444',
    bgLight: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 45%, #fffdf8 100%)',
    bgDark: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
  },
  {
    tag: 'TIẾP NHẬN VĂN HỌC',
    quote: '“Khi tác phẩm kết thúc, ấy mới là lúc cuộc sống thực sự của nó bắt đầu trong lòng người đọc.”',
    author: '— Tiếp nhận văn học (J.P. Sartre) —',
    tip: 'Dùng cho phần Kết bài để khẳng định sức sống vượt thời gian và dư âm của tác phẩm trong lòng độc giả.',
    img: './assets/sartre.jpg',
    accent: '#0891b2',
    border: '#06b6d4',
    bgLight: 'linear-gradient(135deg, #ecfeff 0%, #cffafe 45%, #fafffd 100%)',
    bgDark: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
  },
  {
    tag: 'LỜI BÁC DẠY · TRUYỀN CẢM HỨNG',
    quote: '“Non sông Việt Nam có trở nên tươi đẹp hay không, dân tộc Việt Nam có bước tới đài vinh quang để sánh vai với các cường quốc năm châu được hay không, chính là nhờ một phần lớn ở công học tập của các em.”',
    author: '— Chủ tịch Hồ Chí Minh —',
    tip: 'Dẫn chứng mẫu mực cho các đề bài về khát vọng cống hiến, trách nhiệm học tập của thế hệ trẻ hôm nay.',
    img: './assets/bac-ho.jpg',
    accent: '#b45309',
    border: '#f59e0b',
    bgLight: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 45%, #fffdf5 100%)',
    bgDark: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
  }
];

let heroQuoteIndex = 0;
let heroQuoteTimer = null;

function applyHeroQuote(idx, animate = true) {
  const item = HERO_STUDY_QUOTES[idx];
  if (!item) return;

  const showcase = document.querySelector('#hero-showcase');
  const card = document.querySelector('#hero-study-card');
  const img = document.querySelector('#study-img');
  const imgWrap = document.querySelector('#study-img-wrap');
  const tag = document.querySelector('#study-tag');
  const quote = document.querySelector('#study-quote');
  const author = document.querySelector('#study-author');
  const oldTip = document.querySelector('#study-tip');
  if (oldTip) oldTip.remove();

  if (!card || !img || !quote) return;

  const updateContent = () => {
    img.onerror = () => {
      img.src = './assets/victor-hugo.jpg';
    };
    img.src = item.img;
    img.alt = item.author;
    if (tag) tag.textContent = item.tag;
    quote.textContent = item.quote;
    if (author) author.textContent = item.author;

    // Apply font size adjustment for long quotes
    if (item.quote.length > 90) {
      quote.classList.add('long-quote');
    } else {
      quote.classList.remove('long-quote');
    }

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    // Đảm bảo thẻ con hero-study-card luôn trong suốt, không bao giờ tạo khối chữ nhật cắt vụn:
    card.style.background = 'transparent';
    card.style.border = 'none';
    card.style.boxShadow = 'none';

    // Đổi màu nền mượt mà trực tiếp trên toàn bộ khung hero-showcase lớn:
    if (showcase) {
      showcase.style.background = isDark ? item.bgDark : item.bgLight;
    }
    if (tag) {
      tag.style.color = item.accent;
    }
    if (author) {
      author.style.color = isDark ? '#fde047' : item.accent;
    }
    if (imgWrap) {
      imgWrap.style.boxShadow = isDark
        ? `0 12px 28px rgba(0, 0, 0, 0.5), 0 0 0 2.5px ${item.accent}66`
        : `0 12px 28px rgba(0, 0, 0, 0.12), 0 0 0 2.5px ${item.accent}55`;
    }
  };

  if (animate && typeof gsap !== 'undefined') {
    gsap.to(card, {
      opacity: 0,
      y: 6,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        updateContent();
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.35,
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

function nextHeroQuote() {
  rotateHeroQuote();
  if (typeof playSound === 'function') playSound('pop');
}

function copyCurrentHeroQuote() {
  const item = HERO_STUDY_QUOTES[heroQuoteIndex] || HERO_STUDY_QUOTES[0];
  const text = `${item.quote} (${item.author})`;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      if (typeof toast === 'function') toast('📋 Đã sao chép nhận định văn học!', 'ok');
    }).catch(() => {
      if (typeof toast === 'function') toast('📋 ' + text, 'ok');
    });
  } else if (typeof toast === 'function') {
    toast('📋 ' + text, 'ok');
  }
}

function startHeroQuoteRotation() {
  stopHeroQuoteRotation();
  heroQuoteTimer = setInterval(rotateHeroQuote, 12000);
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
