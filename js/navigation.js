// js/navigation.js
function initNavigation() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const navDots = document.querySelectorAll('.nav-dot');
    const progressBar = document.getElementById('progress-bar');
    
    let currentSlide = 0;

    // Показываем текущий слайд
    function showSlide(index) {
        // Проверка на валидность индекса
        if (index < 0 || index >= slides.length) return;
        
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        
        // Обновляем точки навигации
        navDots.forEach(dot => dot.classList.remove('active'));
        navDots[index].classList.add('active');
        
        // Обновляем прогресс бар
        const progress = ((index + 1) / slides.length) * 100;
        progressBar.style.width = `${progress}%`;
        
        currentSlide = index;
        
        // Прокрутка к началу слайда
        slides[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Переход к следующему слайду
    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            showSlide(currentSlide + 1);
        }
    }

    // Переход к предыдущему слайду
    function prevSlide() {
        if (currentSlide > 0) {
            showSlide(currentSlide - 1);
        }
    }

    // Обработчики событий для кнопок
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Навигация по точкам
    navDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.dataset.slide);
            showSlide(slideIndex);
        });
    });

    // Навигация клавишами
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'Home') showSlide(0);
        if (e.key === 'End') showSlide(slides.length - 1);
    });

    // Инициализация первого слайда
    showSlide(0);
    
    // Обновляем состояние кнопок
    function updateButtonStates() {
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === slides.length - 1;
    }
    
    // Обновляем состояние кнопок при смене слайдов
    const observer = new MutationObserver(updateButtonStates);
    observer.observe(slidesContainer, { childList: true, subtree: true });
    updateButtonStates();
}