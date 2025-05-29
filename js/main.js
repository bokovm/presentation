// main.js
// Инициализация презентации
window.initPresentation = function() {
    // Показываем первый слайд
    showSlide(0);
    
    // Навигация
    document.getElementById('prev-btn').addEventListener('click', prevSlide);
    document.getElementById('next-btn').addEventListener('click', nextSlide);
    
    // Клавиатурная навигация
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowUp') showSlide(0);
    });
    
    // Инициализация компонентов
    setTimeout(() => {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            VanillaTilt.init(card, {
                max: 8,
                speed: 300,
                glare: true,
                'max-glare': 0.2,
                gyroscope: true
            });
        });
        
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
        slide.style.display = 'none';
        slide.classList.remove('active');
    });
    
    // Показать текущий слайд
    if (index >= 0 && index < totalSlides) {
        slides[index].style.display = 'flex';
        slides[index].classList.add('active');
        
        // Обновляем счетчик
        document.getElementById('current-slide').textContent = index + 1;
        document.getElementById('total-slides').textContent = totalSlides;
        
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
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
}

// Предыдущий слайд
function prevSlide() {
    const slides = document.querySelectorAll('.slide');
    const currentIndex = Array.from(slides).findIndex(slide => 
        slide.classList.contains('active'));
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
}