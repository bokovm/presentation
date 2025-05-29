// js/roi-chart.js
// Отрисовка столбиковой диаграммы ROI на слайде ROI АВТОМАТИЗАЦИИ.
// Использует данные из файла roi-data.json, который должен лежать в корне сайта или папке data/

document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('roiBarChart');
  if (!canvas) return;

  // Путь к JSON-файлу с данными (подберите свой путь, если лежит не в корне)
  fetch('data/roi-data.json')
    .then(r => r.json())
    .then(data => drawRoiChart(canvas, data));
});

function drawRoiChart(canvas, data) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  // Настройки
  const margin = 60;
  const barWidth = 54;
  const barGap = 60;
  const maxRoi = Math.max(...data.map(x => x.roi), 252);
  const colors = ['#10B981', '#2A5CAA', '#F97316'];

  // Очистка
  ctx.clearRect(0, 0, w, h);

  // Подписи оси Y (ROI, %)
  ctx.font = "bold 14px Montserrat, Arial";
  ctx.fillStyle = "#aaa";
  ctx.textAlign = "right";
  for (let yVal of [0, 100, 200, 300]) {
    let y = h - margin - (yVal / 300) * (h - margin * 2);
    ctx.fillText(yVal + '%', margin - 10, y + 5);
    ctx.beginPath();
    ctx.moveTo(margin, y);
    ctx.lineTo(w - margin, y);
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Столбики
  let x = margin + 10;
  data.forEach((item, i) => {
    let barHeight = (item.roi / 300) * (h - margin * 2);
    let y = h - margin - barHeight;

    ctx.fillStyle = colors[i % colors.length];
    ctx.fillRect(x, y, barWidth, barHeight);

    // Обводка
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, barWidth, barHeight);

    // Подпись ROI над столбиком
    ctx.font = "bold 15px Montserrat, Arial";
    ctx.fillStyle = "#2A5CAA";
    ctx.textAlign = "center";
    ctx.fillText(item.roi + "%", x + barWidth / 2, y - 8);

    // Подпись типа бизнеса под столбиком
    ctx.font = "12px Montserrat, Arial";
    ctx.fillStyle = "#374151";
    ctx.fillText(item.label, x + barWidth / 2, h - margin + 26);

    // Подпись окупаемости
    ctx.font = "12px Montserrat, Arial";
    ctx.fillStyle = "#10B981";
    ctx.fillText(item.payback + " мес.", x + barWidth / 2, h - margin + 44);

    x += barWidth + barGap;
  });

  // Ось X
  ctx.strokeStyle = "#bbb";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(margin, h - margin);
  ctx.lineTo(w - margin + 10, h - margin);
  ctx.stroke();

  // Подпись оси Y
  ctx.save();
  ctx.translate(margin - 38, h / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.font = "bold 15px Montserrat, Arial";
  ctx.fillStyle = "#888";
  ctx.fillText("ROI, %", 0, 0);
  ctx.restore();
}