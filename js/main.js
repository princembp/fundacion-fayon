/* =====================================================
   Fundación Fayón Cultural y Patrimonial — main.js
===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Navbar scroll ---- */
  const nav = document.getElementById('nav');
  const scrollTopBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
    if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  });

  /* ---- Mobile menu ---- */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    mobileMenu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => mobileMenu.classList.remove('open'))
    );
  }

  /* ---- Marcar enlace activo en nav según página actual ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- Fade-in al hacer scroll ---- */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

});

/* ---- Scroll to top ---- */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---- Carousel museo ---- */
let carouselIndex = 0;
const CAROUSEL_TOTAL = 12;

function carouselMove(dir) {
  carouselIndex = (carouselIndex + dir + CAROUSEL_TOTAL) % CAROUSEL_TOTAL;
  carouselUpdate();
}

function carouselUpdate() {
  const track = document.getElementById('carouselTrack');
  if (!track) return;
  track.style.transform = `translateX(-${carouselIndex * 100}%)`;
  document.getElementById('carouselCurrent').textContent = carouselIndex + 1;
  document.querySelectorAll('.carousel__dot').forEach((d, i) =>
    d.classList.toggle('active', i === carouselIndex)
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const dotsEl = document.getElementById('carouselDots');
  if (dotsEl) {
    for (let i = 0; i < CAROUSEL_TOTAL; i++) {
      const btn = document.createElement('button');
      btn.className = 'carousel__dot' + (i === 0 ? ' active' : '');
      btn.setAttribute('aria-label', `Foto ${i + 1}`);
      btn.onclick = () => { carouselIndex = i; carouselUpdate(); };
      dotsEl.appendChild(btn);
    }
    setInterval(() => carouselMove(1), 4000);
  }
});

/* ---- Formulario de contacto (mailto fallback) ---- */
function handleForm(e) {
  e.preventDefault();
  const nombre  = document.getElementById('nombre')?.value || '';
  const email   = document.getElementById('email')?.value || '';
  const asunto  = document.getElementById('asunto')?.value || 'Consulta general';
  const mensaje = document.getElementById('mensaje')?.value || '';
  const body    = encodeURIComponent(`Nombre: ${nombre}\nEmail: ${email}\n\n${mensaje}`);
  window.location.href = `mailto:turismo@fayon.es?subject=${encodeURIComponent(asunto)}&body=${body}`;
}
