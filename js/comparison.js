// js/comparison.js
document.addEventListener('DOMContentLoaded', () => {
    const filterContainer = document.getElementById('software-filters');
    const softwareItems = document.querySelectorAll('.software-item');
    
    if (!filterContainer) return;
    
    // Создаем фильтры
    const filters = [
        { id: 'filter-cloud', label: 'Облачное решение', key: 'cloud' },
        { id: 'filter-mobile', label: 'Мобильное приложение', key: 'mobile' },
        { id: 'filter-tax', label: 'Поддержка налогов', key: 'taxSupport' },
        { id: 'filter-inventory', label: 'Учет товаров', key: 'inventory' },
        { id: 'filter-nds', label: 'Поддержка НДС', key: 'nds' },
        { id: 'filter-usn', label: 'Поддержка УСН', key: 'usn' }
    ];
    
    filters.forEach(filter => {
        const filterElement = document.createElement('div');
        filterElement.className = 'filter-item';
        filterElement.innerHTML = `
            <input type="checkbox" id="${filter.id}" data-key="${filter.key}">
            <label for="${filter.id}">${filter.label}</label>
        `;
        filterContainer.appendChild(filterElement);
    });
    
    // Обработка фильтрации
    filterContainer.addEventListener('change', () => {
        const activeFilters = {};
        
        // Собираем активные фильтры
        document.querySelectorAll('#software-filters input:checked').forEach(input => {
            activeFilters[input.dataset.key] = true;
        });
        
        // Применяем фильтры к ПО
        softwareItems.forEach(item => {
            let matches = true;
            
            for (const key in activeFilters) {
                if (item.dataset[key] !== 'true') {
                    matches = false;
                    break;
                }
            }
            
            item.style.display = matches ? 'block' : 'none';
        });
    });
    
    // Инициализация табов
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetId = link.dataset.target;
            
            // Обновляем активные табы
            tabLinks.forEach(tab => tab.classList.remove('active'));
            link.classList.add('active');
            
            // Показываем целевой контент
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetId) {
                    content.classList.add('active');
                }
            });
        });
    });
});