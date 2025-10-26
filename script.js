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