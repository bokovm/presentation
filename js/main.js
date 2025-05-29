// main.js — Инициализация, переключение слайдов, базовые интерактивы

document.addEventListener('DOMContentLoaded', () => {
  // Навигация по слайдам
  const slides = Array.from(document.querySelectorAll('.slide'));
  let currentSlide = 0;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.style.display = (i === idx) ? 'flex' : 'none';
    });
    updateProgressBar(idx);
    window.scrollTo(0, 0);
  }

  function nextSlide() {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      showSlide(currentSlide);
    }
  }
  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
      showSlide(currentSlide);
    }
  }

  function updateProgressBar(idx) {
    const bar = document.querySelector('.progress-bar');
    if (bar) {
      bar.style.width = ((idx + 1) / slides.length * 100) + '%';
    }
  }

  // Кнопки навигации
  document.querySelectorAll('.nav-btn.next').forEach(btn => btn.addEventListener('click', nextSlide));
  document.querySelectorAll('.nav-btn.prev').forEach(btn => btn.addEventListener('click', prevSlide));

  // Клавиши ← →
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  // Первоначальный показ
  showSlide(currentSlide);

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
  // Показываем первый этап по умолчанию
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
});
