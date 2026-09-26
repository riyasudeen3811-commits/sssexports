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
// ── Hero Video (Autoplay with Sound + Mute Toggle) ──
const heroVideo = document.getElementById('hero-video');
const soundBtn = document.getElementById('hero-sound-btn');
const soundIconOn = document.getElementById('sound-icon-on');
const soundIconOff = document.getElementById('sound-icon-off');

if (heroVideo) {
  // Helper to sync icon display based on mute state
  const syncSoundUI = () => {
    if (heroVideo.muted) {
      if (soundIconOn) soundIconOn.style.display = 'none';
      if (soundIconOff) soundIconOff.style.display = 'block';
    } else {
      if (soundIconOn) soundIconOn.style.display = 'block';
      if (soundIconOff) soundIconOff.style.display = 'none';
    }
  };

  // Attempt sound ON initially
  heroVideo.muted = false;
  heroVideo.volume = 1.0;
  syncSoundUI();

  const playPromise = heroVideo.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // If browser policy blocks initial unmuted autoplay, fallback to muted play & update icon
      heroVideo.muted = true;
      syncSoundUI();
      heroVideo.play().catch(() => {});
    });
  }

  // Toggle Mute / Unmute on Button Click
  if (soundBtn) {
    soundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      heroVideo.muted = !heroVideo.muted;
      if (!heroVideo.muted) {
        heroVideo.volume = 1.0;
        heroVideo.play().catch(() => {});
      }
      syncSoundUI();
    });
  }
}










