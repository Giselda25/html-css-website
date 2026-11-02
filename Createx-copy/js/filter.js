document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.directions__filter-btn');
  const items = document.querySelectorAll('.directions__list > .directions__list-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('directions__filter-btn--active'));
      button.classList.add('directions__filter-btn--active');

      const filterValue = button.getAttribute('data-filter');

      // Шаг А: Скрываем текущие видимые карточки
      items.forEach(item => {
        if (item.classList.contains('directions__list-item--empty')) return;
        item.style.transition = 'all 0.3s ease';
        item.style.opacity = '0';
        item.style.transform = 'scale(0.85)';
      });

      // Шаг Б: Показываем нужные после смены фильтра
      setTimeout(() => {
        items.forEach(item => {
          if (item.classList.contains('directions__list-item--empty')) return;

          const itemCategory = item.getAttribute('data-category');
          const shouldShow = (filterValue === 'all' || itemCategory === filterValue);

          if (shouldShow) {
            item.style.display = 'flex'; // или 'block'
            item.style.opacity = '0';
            item.style.transform = 'scale(0.85)';

            requestAnimationFrame(() => {
              item.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            });
          } else {
            item.style.display = 'none';
          }
        });
      }, 300);
    });
  });
});