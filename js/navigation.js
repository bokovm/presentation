// navigation.js
document.addEventListener('DOMContentLoaded', () => {
    // Боковая навигация
    const navMenu = document.querySelector('.side-menu');
    if (navMenu) {
        navMenu.querySelectorAll('.side-menu-item').forEach((item, idx) => {
            item.addEventListener('click', () => {
                goToSlide(idx);
            });
        });
    }

    // Функция перехода к слайду по индексу
    window.goToSlide = function(idx) {
        showSlide(idx);
    };

    // Клик по прогресс-бару
    const bar = document.querySelector('.progress-bar');
    if (bar) {
        bar.addEventListener('click', e => {
            const slides = document.querySelectorAll('.slide');
            const barWidth = bar.offsetWidth;
            const clickPosition = e.offsetX;
            const percent = clickPosition / barWidth;
            const idx = Math.floor(percent * slides.length);
            goToSlide(idx);
        });
    }
});