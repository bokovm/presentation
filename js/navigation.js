// navigation.js — Управление навигацией и быстрым переходом по слайдам

document.addEventListener('DOMContentLoaded', () => {
  // Быстрая боковая навигация (если есть боковое меню)
  const navMenu = document.querySelector('.side-menu');
  if (navMenu) {
    navMenu.querySelectorAll('.side-menu-item').forEach((item, idx) => {
      item.addEventListener('click', () => {
        goToSlide(idx);
      });
    });
  }

  // Функция перехода к слайду по индексу (использует main.js)
  window.goToSlide = function(idx) {
    const slides = Array.from(document.querySelectorAll('.slide'));
    if (idx >= 0 && idx < slides.length) {
      slides.forEach((slide, i) => {
        slide.style.display = (i === idx) ? 'flex' : 'none';
      });
      // Прогресс-бар
      const bar = document.querySelector('.progress-bar');
      if (bar) {
        bar.style.width = ((idx + 1) / slides.length * 100) + '%';
      }
      window.scrollTo(0, 0);
    }
  };

  // Клик по прогресс-бару — переход к нужному слайду
  const bar = document.querySelector('.progress-bar');
  if (bar) {
    bar.addEventListener('click', e => {
      const slides = Array.from(document.querySelectorAll('.slide'));
      let percent = e.offsetX / bar.offsetWidth;
      let idx = Math.floor(percent * slides.length);
      window.goToSlide(idx);
    });
  }
});