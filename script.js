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

// Элементы
const statsBlock = document.querySelector('.stats-block');
const allTitles = document.querySelectorAll('.main-page .section-block h2');
const allIntros = document.querySelectorAll('.main-page .section-block .section-intro');
const serviceCards = document.querySelectorAll('.main-page .section-block .section-grid .card');
const aboutusHeaders = document.querySelectorAll('.main-page .section-about-us .section-name');
const companyValues = document.querySelectorAll('.main-page .section-about-us .section-company-values'); // Убрал .visible
const dateElements = document.querySelectorAll('.main-page .section-about-us .section-date'); // Исправил название
const aboutusTexts = document.querySelectorAll('.main-page .section-about-us .section-about-us-text'); // Исправил название
const aboutusQuotes = document.querySelectorAll('.main-page .section-about-us .section-about-us-quote'); // Исправил название
const licenseElements = document.querySelectorAll('.main-page .section-about-us .section-license'); // Исправил название
const contactInfoElements = document.querySelectorAll('.main-page .section-about-us .section-contact-info'); // Исправил название

// Собираем все наблюдаемые элементы
const observedElements = [];

if (statsBlock) observedElements.push(statsBlock);
allTitles.forEach(el => observedElements.push(el));
allIntros.forEach(el => observedElements.push(el));
serviceCards.forEach(card => observedElements.push(card));
aboutusHeaders.forEach(el => observedElements.push(el));
companyValues.forEach(el => observedElements.push(el));
dateElements.forEach(el => observedElements.push(el));
aboutusTexts.forEach(el => observedElements.push(el));
aboutusQuotes.forEach(el => observedElements.push(el));
licenseElements.forEach(el => observedElements.push(el));
contactInfoElements.forEach(el => observedElements.push(el));

// Создаём один observer
if (observedElements.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (!entry.isIntersecting) return;

      // Статистика — особая логика
      if (el === statsBlock && !el.classList.contains('animated')) {
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

  // Наблюдаем за всеми
  observedElements.forEach(el => observer.observe(el));
}
