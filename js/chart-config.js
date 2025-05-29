// js/chart-config.js
// Конфигурация графиков
window.initCharts = function() {
    // График результатов
    const resultsCtx = document.getElementById('resultsChart');
    if (resultsCtx) {
        new Chart(resultsCtx, {
            type: 'bar',
            data: {
                labels: ['До автоматизации', 'После автоматизации'],
                datasets: [
                    {
                        label: 'Время (часы/месяц)',
                        data: [40, 10],
                        backgroundColor: 'rgba(76, 201, 240, 0.7)',
                        borderColor: 'rgba(76, 201, 240, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Ошибки (шт/отчет)',
                        data: [5, 1],
                        backgroundColor: 'rgba(247, 37, 133, 0.7)',
                        borderColor: 'rgba(247, 37, 133, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Затраты (%)',
                        data: [100, 55],
                        backgroundColor: 'rgba(67, 97, 238, 0.7)',
                        borderColor: 'rgba(67, 97, 238, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#e2e8f0'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(100, 116, 139, 0.3)'
                        },
                        ticks: {
                            color: '#94a3b8'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#94a3b8'
                        }
                    }
                }
            }
        });
    }
    
    // График ROI (если есть на слайде)
    const roiCtx = document.getElementById('roiChart');
    if (roiCtx) {
        // Конфигурация для графика ROI
        // (будет обрабатываться отдельно в roi-chart.js)
    }
};