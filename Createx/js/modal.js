document.addEventListener('DOMContentLoaded', () => {
  let coursesData = {};

  // 1. Загружаем JSON-файл
  fetch('directions.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(course => {
        coursesData[course.category] = course;
      });
    })
    .catch(error => console.log('Ошибка загрузки JSON:', error));

  // 2. Находим все карточки
  const listItems = document.querySelectorAll('.directions__list-item:not(.directions__list-item--empty)');

  listItems.forEach(item => {
    const link = item.querySelector('.directions__list-link');
    const btn = item.querySelector('.directions__list-btn');
    const category = item.getAttribute('data-category');
    const detailsBox = item.querySelector('.directions__details');

    if (link && detailsBox) {
      link.addEventListener('click', (e) => {
        e.preventDefault(); // Защита от прыжка страницы по решетке '#'

        const isOpen = detailsBox.style.display === 'block';

        // Закрываем все остальные детали и возвращаем всем кнопкам текст по умолчанию
        document.querySelectorAll('.directions__details').forEach(box => {
          box.style.display = 'none';
        });
        document.querySelectorAll('.directions__list-btn').forEach(b => {
          b.textContent = 'Check courses';
        });

        // Если текущая картошка была закрыта — открываем и заполняем данными
        if (!isOpen) {
          const data = coursesData[category];
          if (data) {
            detailsBox.querySelector('.details-title').textContent = data.title;
            detailsBox.querySelector('.details-desc').textContent = data.text;
            detailsBox.querySelector('.details-duration').textContent = `Duration: ${data.duration}`;
            detailsBox.querySelector('.details-price').textContent = `Price: ${data.price}`;

            detailsBox.style.display = 'block';
            if (btn) btn.textContent = 'Hide details';
          }
        }
      });
    }
  });
});