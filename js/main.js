// main.js — Инициализация, переключение слайдов, базовые интерактивы

// Глобальные функции навигации по слайдам
window.showSlide = function(idx) {
  const slides = Array.from(document.querySelectorAll('.slide'));
  if (!slides.length) return;
  slides.forEach((slide, i) => {
    slide.style.display = (i === idx) ? 'flex' : 'none';
  });
  window.currentSlide = idx;
  updateProgressBar(idx, slides.length);
  updateQuickNav(idx);

  // После переключения слайда, если есть графики — отрисовать их заново
  // (иначе canvas может быть скрыт при первой инициализации)
  if (slides[idx].querySelector('#beforeAfterChart') && typeof window.drawResultsChart === 'function') {
    window.drawResultsChart();
  }
  if (slides[idx].querySelector('#roiBarChart') && typeof window.drawRoiChart === 'function') {
    window.drawRoiChart();
  }

  window.scrollTo(0, 0);
};
window.nextSlide = function() {
  const slides = Array.from(document.querySelectorAll('.slide'));
  if (typeof window.currentSlide !== 'number') window.currentSlide = 0;
  if (window.currentSlide < slides.length - 1) {
    window.showSlide(window.currentSlide + 1);
  }
};
window.prevSlide = function() {
  if (typeof window.currentSlide !== 'number') window.currentSlide = 0;
  if (window.currentSlide > 0) {
    window.showSlide(window.currentSlide - 1);
  }
};

function updateProgressBar(idx, total) {
  const bar = document.querySelector('.progress-bar');
  if (bar) {
    bar.style.width = ((idx + 1) / total * 100) + '%';
  }
}
function updateQuickNav(idx) {
  const dots = document.querySelectorAll('.nav-dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === idx);
  });
}

// Основная инициализация (вызывается после динамической загрузки слайдов)
window.initSlides = function() {
  // Показываем первый слайд
  window.showSlide(0);

  // Кнопки ← →
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') window.nextSlide();
    if (e.key === 'ArrowLeft') window.prevSlide();
  });

  // Анимация появления для fade-in
  document.querySelectorAll('.fade-in').forEach((el, i) => {
    setTimeout(() => el.classList.add('animated'), 200 + i * 120);
  });

  // Анимация для fade-in-green (индикаторы)
  document.querySelectorAll('.fade-in-green').forEach((el, i) => {
    setTimeout(() => el.classList.add('animated'), 400 + i * 250);
  });

  // Для checklist — интерактивное отмечание
  document.querySelectorAll('.checklist-items .checkable').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('checked');
    });
  });

  // Таймлайн внедрения — описание этапа по клику
  document.querySelectorAll('.timeline-step').forEach(step => {
    step.addEventListener('click', () => {
      let idx = step.getAttribute('data-step');
      document.querySelectorAll('.timeline-step').forEach(s => s.classList.remove('active'));
      step.classList.add('active');
      document.querySelectorAll('.step-desc').forEach(desc => {
        desc.classList.remove('active');
        if (desc.getAttribute('data-step') === idx) desc.classList.add('active');
      });
      // Прогресс-бар
      const bar = document.querySelector('.timeline-progress .progress-bar');
      if (bar) {
        bar.style.width = (idx / 4 * 100) + '%';
      }
    });
  });
  // Показываем первый этап по умолчанию (если есть)
  let firstStep = document.querySelector('.timeline-step[data-step="1"]');
  if (firstStep) firstStep.click();

  // Риски — клик для "отклонения" риска
  document.querySelectorAll('.risk-row').forEach(row => {
    row.addEventListener('click', () => {
      row.classList.toggle('resolved');
    });
  });

  // Нижегородский контекст — интерактивная карта
  document.querySelectorAll('.map-marker').forEach(marker => {
    marker.addEventListener('click', () => {
      let city = marker.getAttribute('data-city');
      document.querySelectorAll('.map-marker').forEach(m => m.classList.remove('active'));
      marker.classList.add('active');
      document.querySelectorAll('.nnov-info').forEach(block => {
        block.classList.remove('active');
        if (block.getAttribute('data-city') === city) block.classList.add('active');
      });
    });
  });
  // По умолчанию — показать Нижний Новгород
  let nnMarker = document.querySelector('.map-marker[data-city="nn"]');
  if (nnMarker) nnMarker.click();

  // Финальный слайд — анимация появления контактов/QR
  let thanksContacts = document.querySelector('.slide-thanks .thanks-contact');
  if (thanksContacts) {
    setTimeout(() => thanksContacts.classList.add('fade-in'), 400);
  }

  // После загрузки всех слайдов — отрисовать графики, если нужно (актуально для первого слайда с графиком)
  if (typeof window.drawResultsChart === 'function') window.drawResultsChart();
  if (typeof window.drawRoiChart === 'function') window.drawRoiChart();
};