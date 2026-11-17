// O cardápio continua disponível mesmo quando JavaScript está desativado.
const filters = document.querySelector('.filters');
const products = document.querySelectorAll('.product');
const status = document.querySelector('#filter-status');

filters.hidden = false;
filters.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-filter]');
  if (!button) return;

  const category = button.dataset.filter;
  let visibleCount = 0;
  for (const product of products) {
    const visible = category === 'todos' || product.dataset.category === category;
    product.hidden = !visible;
    if (visible) visibleCount += 1;
  }
  for (const filterButton of filters.querySelectorAll('button')) {
    filterButton.setAttribute('aria-pressed', String(filterButton === button));
  }
  status.textContent = `${visibleCount} opções no cardápio.`;
});
