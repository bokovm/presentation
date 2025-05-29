// calculator.js — ROI-калькулятор для слайда ROI

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('openRoiCalc');
  const modal = document.getElementById('roiModal');
  const closeBtn = document.getElementById('closeRoiModal');
  const form = document.getElementById('roiForm');
  const result = document.getElementById('roiResult');

  if (!btn || !modal || !form) return;

  btn.addEventListener('click', () => {
    modal.style.display = 'flex';
    result.innerHTML = '';
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    form.reset();
    result.innerHTML = '';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      form.reset();
      result.innerHTML = '';
    }
  });

  // Пример расчёта ROI
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const type = form.type.value;
    const turnover = parseFloat(form.turnover.value || 0);
    const cost = parseFloat(form.cost.value || 0);

    // Модели экономии (условные значения для примера)
    let save, payback, rec;
    if (type === 'ip') {
      save = Math.round(turnover * 0.12);
      payback = Math.max(2.3, (cost * 12) / save);
      rec = "Рекомендуем: Моё Дело — быстрая окупаемость и простота.";
    } else if (type === 'ooo-uslugi') {
      save = Math.round(turnover * 0.15);
      payback = Math.max(3, (cost * 12) / save);
      rec = "Рекомендуем: Контур.Бухгалтерия — баланс цена/функционал.";
    } else {
      save = Math.round(turnover * 0.22);
      payback = Math.max(6.8, (cost * 12) / save);
      rec = "Рекомендуем: 1С:Бухгалтерия — подходит для торговли.";
    }
    const roi = Math.round(((save * 12) / (cost * 12) - 1) * 100);

    result.innerHTML = `
      <b>Годовая экономия:</b> <span style="color:#10B981">${save.toLocaleString()} ₽</span><br/>
      <b>Срок окупаемости:</b> ${payback.toFixed(1)} мес.<br/>
      <b>ROI:</b> ${roi}%<br/>
      <span style="color:#1E3A8A">${rec}</span>
    `;
  });
});