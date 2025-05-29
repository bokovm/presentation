// js/results-chart.js
// Отрисовка графика "до/после" на слайде "ЦИФРЫ ГОВОРЯТ САМИ ЗА СЕБЯ"

// Вызывать window.drawResultsChart() после появления canvas в DOM
window.drawResultsChart = function() {
  const canvas = document.getElementById('beforeAfterChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  // Данные: [название, ДО, ПОСЛЕ, цвет]
  const data = [
    { label: 'Время (ч)', before: 3.2, after: 0.8, color: "#2A5CAA" },
    { label: 'Ошибки (шт)', before: 5, after: 1, color: "#10B981" },
    { label: 'Затраты (%)', before: 100, after: 70, color: "#F97316" }
  ];

  // Настройки
  const margin = 60;
  const barWidth = 32;
  const barGap = 28;
  const groupGap = 50;
  const maxValue = 110;

  ctx.clearRect(0, 0, w, h);

  // Ось Y (0, 50, 100)
  ctx.font = "bold 13px Montserrat, Arial, sans-serif";
  ctx.fillStyle = "#aaa";
  ctx.textAlign = "right";
  [0, 50, 100].forEach(yVal => {
    let y = h - margin - (yVal / maxValue) * (h - margin * 2);
    ctx.fillText(yVal, margin - 8, y + 5);
    ctx.beginPath();
    ctx.moveTo(margin, y);
    ctx.lineTo(w - margin, y);
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // Столбики
  let x = margin + 10;
  data.forEach((item, i) => {
    // ДО
    let yBefore = h - margin - (item.before / maxValue) * (h - margin * 2);
    ctx.fillStyle = "#ddd";
    ctx.fillRect(x, yBefore, barWidth, h - margin - yBefore);
    // ПОСЛЕ
    let yAfter = h - margin - (item.after / maxValue) * (h - margin * 2);
    ctx.fillStyle = item.color;
    ctx.fillRect(x + barWidth + barGap, yAfter, barWidth, h - margin - yAfter);

    // Подписи снизу
    ctx.font = "12px Montserrat, Arial, sans-serif";
    ctx.fillStyle = "#374151";
    ctx.textAlign = "center";
    ctx.fillText(item.label, x + barWidth + barGap / 2, h - margin + 30);

    // Значения над столбиками
    ctx.font = "bold 13px Montserrat, Arial, sans-serif";
    ctx.fillStyle = "#2A5CAA";
    ctx.fillText(item.before, x + barWidth / 2, yBefore - 8);
    ctx.fillStyle = item.color;
    ctx.fillText(item.after, x + barWidth + barGap + barWidth / 2, yAfter - 8);

    // Метки "до"/"после"
    if (i === 0) {
      ctx.font = "bold 13px Montserrat, Arial, sans-serif";
      ctx.fillStyle = "#bbb";
      ctx.fillText("ДО", x + barWidth / 2, h - margin + 15);
      ctx.fillStyle = "#444";
      ctx.fillText("ПОСЛЕ", x + barWidth + barGap + barWidth / 2, h - margin + 15);
    }

    x += barWidth * 2 + barGap + groupGap;
  });

  // Название оси Y
  ctx.save();
  ctx.translate(margin - 45, h / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.font = "bold 15px Montserrat, Arial, sans-serif";
  ctx.fillStyle = "#888";
  ctx.fillText("Показатель", 0, 0);
  ctx.restore();
}