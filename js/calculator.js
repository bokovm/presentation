// js/calculator.js
document.addEventListener('DOMContentLoaded', () => {
    const roiBtn = document.getElementById('roi-calculator-btn');
    const modal = document.createElement('div');
    modal.id = 'roi-modal';
    modal.style.display = 'none';
    
    // Структура модального окна
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>Рассчитайте ваш ROI</h2>
            <div class="calculator-form">
                <div class="form-group">
                    <label for="business-type">Тип бизнеса:</label>
                    <select id="business-type">
                        <option value="ip">ИП</option>
                        <option value="ooo-services">ООО (Услуги)</option>
                        <option value="ooo-trade">ООО (Торговля)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="revenue">Среднемесячный оборот (руб):</label>
                    <input type="number" id="revenue" min="0" value="500000">
                </div>
                <div class="form-group">
                    <label for="accounting-cost">Текущие затраты на бухгалтерию (руб/мес):</label>
                    <input type="number" id="accounting-cost" min="0" value="20000">
                </div>
                <div class="form-group">
                    <label for="errors">Ошибок в отчетности (шт/мес):</label>
                    <input type="number" id="errors" min="0" value="5">
                </div>
                <div class="form-group">
                    <label for="fines">Штрафов в год (руб):</label>
                    <input type="number" id="fines" min="0" value="30000">
                </div>
                <button id="calculate-btn">Рассчитать</button>
            </div>
            <div class="results-container">
                <div class="result-card">
                    <h3>Прогноз экономии</h3>
                    <p>Срок окупаемости: <span id="payback-period">-</span></p>
                    <p>Годовая экономия: <span id="year-savings">-</span> руб</p>
                    <div class="savings-graph">
                        <div class="graph-bar">
                            <div class="bar-label">До</div>
                            <div class="bar-fill" style="height: 100%; background-color: #F97316;"></div>
                            <div class="bar-value" id="before-cost">-</div>
                        </div>
                        <div class="graph-bar">
                            <div class="bar-label">После</div>
                            <div class="bar-fill" style="height: 70%; background-color: #10B981;"></div>
                            <div class="bar-value" id="after-cost">-</div>
                        </div>
                    </div>
                </div>
                <div class="result-card">
                    <h3>Рекомендуемое ПО</h3>
                    <div id="software-recommendation">
                        <p>Выберите параметры для расчета</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Открытие/закрытие модального окна
    if (roiBtn) {
        roiBtn.addEventListener('click', () => {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    
    modal.querySelector('.close-btn').addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    });
    
    // Расчет ROI
    document.getElementById('calculate-btn').addEventListener('click', calculateROI);
    
    function calculateROI() {
        const businessType = document.getElementById('business-type').value;
        const revenue = parseInt(document.getElementById('revenue').value);
        const accountingCost = parseInt(document.getElementById('accounting-cost').value);
        const errors = parseInt(document.getElementById('errors').value);
        const fines = parseInt(document.getElementById('fines').value);
        
        // Параметры расчета (обычно загружаются из roi-data.json)
        const config = {
            'ip': { softwareCost: 1000, savingPercentage: 40 },
            'ooo-services': { softwareCost: 3300, savingPercentage: 35 },
            'ooo-trade': { softwareCost: 5000, savingPercentage: 30 }
        };
        
        const { softwareCost, savingPercentage } = config[businessType];
        const monthlySavings = accountingCost * (savingPercentage / 100) + (fines / 12 * 0.9);
        const paybackMonths = (softwareCost / monthlySavings).toFixed(1);
        const yearlySavings = monthlySavings * 12 - softwareCost;
        
        // Обновление UI
        document.getElementById('payback-period').textContent = `${paybackMonths} мес`;
        document.getElementById('year-savings').textContent = yearlySavings.toLocaleString();
        document.getElementById('before-cost').textContent = `${accountingCost.toLocaleString()} руб`;
        document.getElementById('after-cost').textContent = `${(accountingCost * (1 - savingPercentage/100)).toLocaleString()} руб`;
        
        // Анимация столбцов
        document.querySelector('.savings-graph .bar-fill:last-child').style.height = `${100 - savingPercentage}%`;
        
        // Рекомендация ПО
        const recommendations = {
            'ip': 'Моё Дело',
            'ooo-services': 'Контур.Бухгалтерия',
            'ooo-trade': '1С:Бухгалтерия'
        };
        
        document.getElementById('software-recommendation').innerHTML = `
            <div class="recommendation-card">
                <h4>${recommendations[businessType]}</h4>
                <p>Стоимость: ${softwareCost.toLocaleString()} руб/мес</p>
                <p>Экономия: ~${Math.round(savingPercentage)}% затрат на бухгалтерию</p>
            </div>
        `;
    }
});