// js/results-chart.js
// Отрисовка графика "до/после" на слайде "ЦИФРЫ ГОВОРЯТ САМИ ЗА СЕБЯ"

// Вызывать window.drawResultsChart() после появления canvas в DOM
window.drawResultsChart = function() {
  // Изменен ID канваса на 'beforeAfterChart'
  const canvas = document.getElementById('beforeAfterChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  // Данные: [название, ДО, ПОСЛЕ, цвет]
  // Обновил данные для лучшего отображения на графике
  const data = [
    { label: 'Время (ч)', before: 40, after: 10, color: "#4cc9f0" }, // Цвет акцентный
    { label: 'Ошибки (шт)', before: 5, after: 1, color: "#f72585" }, // Цвет вторичный
    { label: 'Затраты (%)', before: 100, after: 55, color: "#4361ee" } // Цвет основной
  ];

  // Настройки
  const margin = 60;
  const barWidth = 25; // Уменьшил ширину столбиков
  const barGap = 15;   // Уменьшил отступ между столбиками в группе
  const groupGap = 40; // Отступ между группами столбиков
  const maxValue = Math.max(...data.map(d => Math.max(d.before, d.after))) * 1.1; // Максимальное значение для масштабирования

  ctx.clearRect(0, 0, w, h);

  // Ось Y (0, 50, 100)
  ctx.font = "bold 13px Montserrat, Arial, sans-serif";
  ctx.fillStyle = "#94a3b8"; // Цвет текста из CSS переменных
  ctx.textAlign = "right";
  [0, 25, 50, 75, 100].forEach(yVal => { // Добавил больше меток для лучшей читаемости
    let y = h - margin - (yVal / maxValue) * (h - margin * 2);
    ctx.fillText(yVal + (yVal <=100 ? "%" : ""), margin - 10, y + 5); // Добавил % для затрат
    ctx.beginPath();
    ctx.moveTo(margin, y);
    ctx.lineTo(w - margin, y);
    ctx.strokeStyle = "rgba(148, 163, 184, 0.2)"; // Более светлая сетка
    ctx.stroke();
  });
  ctx.fillText("0", margin - 10, h - margin + 5); // Метка для 0

  let xOffset = margin + 20; // Начальная позиция для первого бара

  data.forEach((item, i) => {
    let x = xOffset + i * (barWidth * 2 + barGap + groupGap);

    // ДО
    let yBefore = h - margin - (item.before / maxValue) * (h - margin * 2);
    ctx.fillStyle = "#94a3b8"; // Нейтральный цвет для "до"
    ctx.fillRect(x, yBefore, barWidth, h - margin - yBefore);

    // ПОСЛЕ
    let yAfter = h - margin - (item.after / maxValue) * (h - margin * 2);
    ctx.fillStyle = item.color; // Цвет из данных
    ctx.fillRect(x + barWidth + barGap, yAfter, barWidth, h - margin - yAfter);

    // Подписи снизу
    ctx.font = "14px Montserrat, Arial, sans-serif";
    ctx.fillStyle = "#e2e8f0"; // Цвет текста из CSS переменных
    ctx.textAlign = "center";
    ctx.fillText(item.label, x + barWidth + barGap / 2, h - margin + 20);

    // Значения над столбиками
    ctx.font = "bold 14px Montserrat, Arial, sans-serif";
    ctx.fillStyle = "#e2e8f0";
    ctx.fillText(item.before, x + barWidth / 2, yBefore - 8);
    ctx.fillText(item.after, x + barWidth + barGap + barWidth / 2, yAfter - 8);
  });

  // Легенда
  ctx.font = "14px Montserrat, Arial, sans-serif";
  ctx.textAlign = "left";
  const legendX = w - margin - 100;
  const legendY = margin + 20;
  const legendRectSize = 10;
  const legendSpacing = 20;

  ctx.fillStyle = "#94a3b8";
  ctx.fillRect(legendX, legendY, legendRectSize, legendRectSize);
  ctx.fillStyle = "#e2e8f0";
  ctx.fillText("До", legendX + legendRectSize + 5, legendY + 9);

  ctx.fillStyle = "#4cc9f0"; // Использую один из акцентных цветов для "После"
  ctx.fillRect(legendX, legendY + legendSpacing, legendRectSize, legendRectSize);
  ctx.fillStyle = "#e2e8f0";
  ctx.fillText("После", legendX + legendRectSize + 5, legendY + legendSpacing + 9);
};
