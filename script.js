// Функция бургер меню
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.mobile-menu'); 
menuToggle.addEventListener('click', function() {
  this.classList.toggle('active');
  menu.classList.toggle('active'); 
});

document.addEventListener('click', (e) => {
  if (!menu.contains(e.target) && !menuToggle.contains(e.target) && menu.classList.contains('active')) {
    menu.classList.remove('active');
    menuToggle.classList.remove('active');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const textElement = document.querySelector('.hero .text');
  textElement.classList.add('visible');
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

const statsBlock = document.querySelector('.stats-block'); 

// Создаем Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsBlock.classList.contains('animated')) {
      statsBlock.classList.add('visible');  
      animateCounters();
      statsBlock.classList.add('animated');
      observer.unobserve(statsBlock);
    }
  });
}, {
  threshold: 0.3,
  rootMargin: '0px 0px -50px 0px'
});


if (statsBlock) {
  observer.observe(statsBlock); 
}