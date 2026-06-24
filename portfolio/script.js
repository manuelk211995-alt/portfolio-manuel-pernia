// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
});

// Close menu on link click
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.skill-card, .project-card, .stat, .section__title').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Contact form
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = 'Message sent!';
  btn.style.background = 'linear-gradient(135deg, #00b894, #00cec9)';
  this.reset();
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
  }, 3000);
});

// Header shadow on scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 50
    ? '0 2px 20px rgba(0,0,0,0.3)'
    : 'none';
});
