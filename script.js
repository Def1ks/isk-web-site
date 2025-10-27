const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.mobile-menu'); 
menuToggle.addEventListener('click', function() {
  this.classList.toggle('active');
  menu.classList.toggle('active'); 
});

document.addEventListener('DOMContentLoaded', function() {
  const textElement = document.querySelector('.section-1 .text');
  textElement.classList.add('visible');
});

// Функция для анимации счётчиков
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target'); // Получаем целевое число
    const duration = 1500; // Длительность анимации в миллисекундах
    let start = 0;
    const stepTime = Math.abs(Math.floor(duration / target)); // Интервал обновления

    const timer = setInterval(() => {
      start += 1;
      counter.textContent = start;

      if (start === target) {
        clearInterval(timer);
        // Если нужно показать "+", добавим его
        if (target === 80 || target === 45) {
          counter.textContent = `${target}+`;
        }
      }
    }, stepTime);
  });
}

// Создаем Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      // Запускаем анимацию
      animateCounters();
      // Помечаем, что анимация уже прошла
      entry.target.classList.add('animated');
      // Останавливаем наблюдение за этим элементом (если нужно)
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1, // Элемент считается видимым, если 10% его высоты в зоне просмотра
  rootMargin: '0px 0px -50px 0px' // Начинаем анимацию, когда элемент на 50px выше нижнего края экрана
});

// Находим блок со статистикой и начинаем наблюдать
const statsBlock = document.querySelector('.stats-block');
if (statsBlock) {
  observer.observe(statsBlock);
}