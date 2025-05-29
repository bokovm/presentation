// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    const slidesContainer = document.getElementById('slides-container');
    const slideFiles = [
        'slides/01-problem.html',
        'slides/02-hypothesis.html',
        'slides/03-goals.html',    // Исправленный файл
        'slides/04-methodology.html',
        'slides/05-results.html',
        'slides/06-roi.html',      // Контент из 07-solutions.html
        'slides/07-solutions.html', // Новый файл для сравнения ПО
        'slides/08-trends.html',
        'slides/09-checklist.html',
        'slides/10-implementation.html',
        'slides/11-risks.html',
        'slides/12-nnov-context.html',
        'slides/13-conclusion.html',
        'slides/14-thanks.html'
    ];

    // Загружаем титульный слайд
    slidesContainer.innerHTML = `
        <section id="slide-cover" class="slide active" data-bg="abstract-bg">
            <div class="content fade-in-up">
                <h1>АВТОМАТИЗАЦИЯ БУХУЧЕТА В МАЛОМ БИЗНЕСЕ</h1>
                <p class="subtitle">Влияние на эффективность и снижение ошибок</p>
                <div class="credits">
                    <p>ГБПОУ «Богородский политехнический техникум»</p>
                    <p>Выполнил: Боков Макар (1-2Б)</p>
                    <p>Преподаватель: [Имя Фамилия]</p>
                    <p>2023</p>
                </div>
            </div>
        </section>
    `;

    // Создаем массив промисов для загрузки слайдов
    const slidePromises = slideFiles.map(file => {
        return fetch(file)
            .then(response => {
                if (!response.ok) throw new Error(`Ошибка загрузки: ${file}`);
                return response.text();
            })
            .then(html => {
                const slide = document.createElement('section');
                slide.className = 'slide';
                slide.innerHTML = html;
                slidesContainer.appendChild(slide);
            });
    });

    // Ждем загрузки всех слайдов перед инициализацией навигации
    Promise.all(slidePromises)
        .then(() => {
            initNavigation();
        })
        .catch(error => {
            console.error('Ошибка загрузки слайдов:', error);
            // Создаем заглушку для ошибки
            const errorSlide = document.createElement('section');
            errorSlide.className = 'slide';
            errorSlide.innerHTML = `
                <div class="content">
                    <h2>Ошибка загрузки</h2>
                    <p>${error.message}</p>
                </div>
            `;
            slidesContainer.appendChild(errorSlide);
            initNavigation();
        });
});