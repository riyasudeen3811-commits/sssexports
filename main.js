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
// ── Hero Video (Play with Sound) ──
const heroVideo = document.getElementById('hero-video');
if (heroVideo) {
  // Step 1: Try to play WITH sound
  heroVideo.muted = false;
  const attempt = heroVideo.play();

  if (attempt !== undefined) {
    attempt.catch(() => {
      // Step 2: Browser blocked sound — play muted first so video starts
      heroVideo.muted = true;
      heroVideo.play().catch(() => {});

      // Step 3: Unmute on first REAL user gesture (click/tap/keypress)
      // NOTE: scroll does NOT count as a user gesture for audio policy
      const unlockAudio = () => {
        heroVideo.muted = false;
        // Some browsers need a fresh play() call after unmuting
        heroVideo.play().catch(() => {});
        // Clean up all listeners
        ['pointerdown', 'click', 'touchstart', 'keydown'].forEach(evt =>
          document.removeEventListener(evt, unlockAudio, true)
        );
      };
      ['pointerdown', 'click', 'touchstart', 'keydown'].forEach(evt =>
        document.addEventListener(evt, unlockAudio, { capture: true, once: true })
      );
    });
  }
}










