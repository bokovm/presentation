window.initComparison = function() {
  // Переключение табов
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.getAttribute('data-tab');
      document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
      document.getElementById('tab-' + tab).classList.add('active');
    };
  });

  // Фильтр по чекбоксам
  const filters = {
    nds: document.getElementById('filter-nds'),
    warehouse: document.getElementById('filter-warehouse'),
    mobile: document.getElementById('filter-mobile'),
    budget: document.getElementById('filter-budget')
  };
  function applyFilters() {
    const rules = {
      '1c':   { nds: true, warehouse: true, mobile: false, budget: false },
      'kontur': { nds: true, warehouse: false, mobile: true, budget: false },
      'moedelo': { nds: false, warehouse: false, mobile: true, budget: true }
    };
    Object.entries(rules).forEach(([key, vals]) => {
      let ok = true;
      if (filters.nds.checked && !vals.nds) ok = false;
      if (filters.warehouse.checked && !vals.warehouse) ok = false;
      if (filters.mobile.checked && !vals.mobile) ok = false;
      if (filters.budget.checked && !vals.budget) ok = false;
      document.querySelector(`.tab-btn[data-tab="${key}"]`).style.opacity = ok ? '1' : '0.45';
      document.getElementById(`tab-${key}`).style.opacity = ok ? '1' : '0.45';
    });
  }
  Object.values(filters).forEach(f => f && f.addEventListener('change', applyFilters));
  applyFilters();
};