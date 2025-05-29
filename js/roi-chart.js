// js/roi-chart.js
// Столбчатый график ROI на слайде ROI автоматизации
// Данные берутся из data/roi-data.json

window.drawRoiChart = function() {
  const canvas = document.getElementById('roiBarChart');
  if (!canvas) return;

  fetch('data/roi-data.json')
    .then(resp => resp.json())
    .then(data => {
      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Настройки
      const margin = 60;
      const barWidth = 54;
      const barGap = 60;
      const colors = ['#10B981', '#2A5CAA', '#F97316'];
      const maxValue = Math.max(...data.map(x => x.roi), 300);

      // Ось Y (0, 100, 200, 300)
      ctx.font = "bold 14px Montserrat, Arial, sans-serif";
      ctx.fillStyle = "#aaa";
      ctx.textAlign = "right";
      [0, 100, 200, 300].forEach(yVal => {
        let y = h - margin - (yVal / 300) * (h - margin * 2);
        ctx.fillText(yVal + "%", margin - 10, y + 5);
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
        let barHeight = (item.roi / 300) * (h - margin * 2);
        let y = h - margin - barHeight;

        ctx.fillStyle = colors[i % colors.length];
        ctx.fillRect(x, y, barWidth, barHeight);

        // Обводка
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, barWidth, barHeight);

        // ROI над
        ctx.font = "bold 15px Montserrat, Arial, sans-serif";
        ctx.fillStyle = "#2A5CAA";
        ctx.textAlign = "center";
        ctx.fillText(item.roi + "%", x + barWidth / 2, y - 8);

        // Название
        ctx.font = "12px Montserrat, Arial, sans-serif";
        ctx.fillStyle = "#374151";
        ctx.fillText(item.label, x + barWidth / 2, h - margin + 26);

        // Окупаемость
        ctx.font = "12px Montserrat, Arial, sans-serif";
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
      ctx.font = "bold 15px Montserrat, Arial, sans-serif";
      ctx.fillStyle = "#888";
      ctx.fillText("ROI, %", 0, 0);
      ctx.restore();
    });
}