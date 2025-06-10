// main.js
// Инициализация презентации
window.initPresentation = function() {
    // Показываем первый слайд
    showSlide(0);
    
    // Удалена привязка кнопок навигации, оставлена только клавиатурная навигация
    // document.getElementById('prev-btn').addEventListener('click', prevSlide);
    // document.getElementById('next-btn').addEventListener('click', nextSlide);
    
    // Клавиатурная навигация
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowUp') showSlide(0);
    });
    
    // Инициализация компонентов
    setTimeout(() => {
        // Инициализация графиков
        if (typeof initCharts === 'function') initCharts();
        if (typeof initComparison === 'function') initComparison();
        if (typeof initCalculator === 'function') initCalculator();
    }, 500);
};

// Показать слайд
function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    
    // Скрыть все слайды
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Показать текущий слайд
    if (index >= 0 && index < totalSlides) {
        slides[index].classList.add('active');
        
        // Обновление счетчика удалено, так как счетчик удален из HTML
        // document.getElementById('current-slide').textContent = index + 1;
        // document.getElementById('total-slides').textContent = totalSlides;
        
        // Обновляем прогресс-бар
        const progress = ((index + 1) / totalSlides) * 100;
        document.getElementById('progress-bar').style.width = `${progress}%`;
        
        // Инициализация специфичных компонентов для слайда
        setTimeout(() => {
            if (index === 5 && typeof drawResultsChart === 'function') drawResultsChart();
            if (index === 6 && typeof drawRoiChart === 'function') drawRoiChart();
        }, 100);
    }
}

// Следующий слайд
function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    const currentIndex = Array.from(slides).findIndex(slide => 
        slide.classList.contains('active'));
    let nextIndex = currentIndex + 1;
    if (nextIndex >= slides.length) {
        nextIndex = 0; // или оставить на последнем: nextIndex = slides.length - 1;
    }
    showSlide(nextIndex);
}

// Предыдущий слайд
function prevSlide() {
    const slides = document.querySelectorAll('.slide');
    const currentIndex = Array.from(slides).findIndex(slide => 
        slide.classList.contains('active'));
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
        prevIndex = slides.length - 1; // или оставить на первом: prevIndex = 0;
    }
    showSlide(prevIndex);
}
