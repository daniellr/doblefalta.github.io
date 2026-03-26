// ============================================
// DOBLE DOBLE FALTA — Script
// ============================================

// Intersection Observer: fade-in cards on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.app-card, .contact-card').forEach((el) => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Inject fade-in styles dynamically
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.4s steps(4), transform 0.4s steps(4);
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

// Active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((a) => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { threshold: 0.5 }
);

sections.forEach((s) => navObserver.observe(s));

// Inject nav active style
const navStyle = document.createElement('style');
navStyle.textContent = `.nav-links a.active { color: var(--yellow); }`;
document.head.appendChild(navStyle);

// Easter egg: Konami code → hero title changes
const konami = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a'
];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konami[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konami.length) {
      const title = document.querySelector('.hero-title');
      title.textContent = '¡CHEAT CODE ACTIVADO!';
      title.style.color = 'var(--pink)';
      title.style.fontSize = 'clamp(1rem, 4vw, 2rem)';
      const label = document.querySelector('.hero-label');
      label.textContent = '[ modo trampa desbloqueado ]';
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});
