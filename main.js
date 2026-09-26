/* SSS EXPORTS — Main JS */

// ── Scroll reveal ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); } });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// ── Navbar scroll ──
const navbar = document.querySelector('.navbar');
const onScroll = () => { navbar && navbar.classList.toggle('scrolled', window.scrollY > 60); };
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── Mobile nav ──
const hamburger = document.querySelector('.nav-hamburger');
const mobileNav = document.querySelector('.nav-mobile');
const mobileClose = document.querySelector('.nav-mobile-close');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
}
if (mobileClose) {
  mobileClose.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
}
document.querySelectorAll('.nav-mobile a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Active nav link ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
  if (a.getAttribute('href') === currentPage) a.classList.add('active');
});

// ── Smooth scroll for in-page anchors ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
// ── Hero Video (Force Instant Autoplay) ──
const heroVideo = document.getElementById('hero-video');
if (heroVideo) {
  // Ensure muted (required for autoplay policy)
  heroVideo.muted = true;
  // Try to play immediately
  const playVideo = () => {
    heroVideo.play().catch(() => {
      // If autoplay is still blocked, retry on first user interaction
      const retryPlay = () => {
        heroVideo.play();
        document.removeEventListener('click', retryPlay);
        document.removeEventListener('touchstart', retryPlay);
        document.removeEventListener('scroll', retryPlay);
      };
      document.addEventListener('click', retryPlay, { once: true });
      document.addEventListener('touchstart', retryPlay, { once: true });
      document.addEventListener('scroll', retryPlay, { once: true, passive: true });
    });
  };
  // Play as soon as we have enough data, or immediately if already ready
  if (heroVideo.readyState >= 2) {
    playVideo();
  } else {
    heroVideo.addEventListener('loadeddata', playVideo, { once: true });
  }
}










