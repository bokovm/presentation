window.initCalculator = function() {
    const btn = document.getElementById('openRoiCalc');
    const modal = document.getElementById('roiModal');
    const closeBtn = document.getElementById('closeRoiModal');
    const form = document.getElementById('roiForm');
    const result = document.getElementById('roiResult');
    
    if (!btn || !modal) return;
    
    btn.onclick = () => {
        modal.style.display = 'flex';
        result.innerHTML = '';
    };
    
    closeBtn.onclick = () => {
        modal.style.display = 'none';
        form.reset();
        result.innerHTML = '';
    };
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            form.reset();
            result.innerHTML = '';
        }
    });
    
    form.onsubmit = (e) => {
        e.preventDefault();
        const type = form.type.value;
        const turnover = parseFloat(form.turnover.value || 0);
        const cost = parseFloat(form.cost.value || 0);
        let save, payback, rec;
        
        if (type === 'ip') {
            save = Math.round(turnover * 0.12);
            payback = Math.max(2.3, (cost * 12) / (save || 1));
            rec = "Рекомендуем: Моё Дело — быстрая окупаемость и простота.";
        } else if (type === 'ooo-uslugi') {
            save = Math.round(turnover * 0.15);
            payback = Math.max(3, (cost * 12) / (save || 1));
            rec = "Рекомендуем: Контур.Бухгалтерия — баланс цена/функционал.";
        } else {
            save = Math.round(turnover * 0.22);
            payback = Math.max(6.8, (cost * 12) / (save || 1));
            rec = "Рекомендуем: 1С:Бухгалтерия — подходит для торговли.";
        }
        
        const roi = Math.round(((save * 12) / ((cost || 1) * 12) - 1) * 100);
        
        result.innerHTML = `
            <div style="padding: 15px; background: #f0f7ff; border-radius: 8px;">
                <p><b>Годовая экономия:</b> <span style="color:#10B981; font-weight:700">${save.toLocaleString()} ₽</span></p>
                <p><b>Срок окупаемости:</b> ${payback.toFixed(1)} мес.</p>
                <p><b>ROI:</b> ${roi}%</p>
                <p style="margin-top: 15px; color:#1E3A8A"><b>${rec}</b></p>
            </div>
        `;
    };
};