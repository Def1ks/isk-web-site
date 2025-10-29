// Функция бургер меню
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.mobile-menu');

if (menuToggle && menu) {
  menuToggle.addEventListener('click', function () {
    this.classList.toggle('active');
    menu.classList.toggle('active');
  });

  // Закрытие меню при клике по ссылке внутри него
  const navLinks = menu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });

  // Закрытие меню при клике вне его области
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !menuToggle.contains(e.target) && menu.classList.contains('active')) {
      menu.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });
}

// Появление текста в hero-секции
document.addEventListener('DOMContentLoaded', function () {
  const textElement = document.querySelector('.hero .text');
  if (textElement) {
    setTimeout(() => {
      textElement.classList.add('visible');
    }, 100); 
  }
});

// Функция для анимации счётчиков
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const duration = 1500;
    let start = 0;
    const stepTime = Math.abs(Math.floor(duration / target));

    const timer = setInterval(() => {
      start += 1;
      counter.textContent = start;

      if (start === target) {
        clearInterval(timer);
        if (target === 80 || target === 45) {
          counter.textContent = `${target}+`;
        }
      }
    }, stepTime);
  });
}

// Функция для реализации функция появления
const fadeElements = document.querySelectorAll('.fade-on-scroll');

const observedElements = Array.from(fadeElements);

if (observedElements.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (!entry.isIntersecting) return;

      if (el.classList.contains('stats-block') && !el.classList.contains('animated')) {
        el.classList.add('visible', 'animated');
        animateCounters(); 
        observer.unobserve(el);
        return;
      }

      el.classList.add('visible'); 
      observer.unobserve(el);
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  observedElements.forEach(el => observer.observe(el));
}


