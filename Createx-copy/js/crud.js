// 1. Инициализация данных
let courses = JSON.parse(localStorage.getItem('courses')) || [
  { id: 1, title: 'Менеджмент и лидерство', category: 'Management' },
  { id: 2, title: 'UX/UI Design. С нуля до PRO', category: 'Design' },
  { id: 3, title: 'Digital Marketing Strategy', category: 'Marketing' }
];

const container = document.getElementById('courses-container');
const form = document.getElementById('course-form');
const titleInput = document.getElementById('course-title');
const categoryInput = document.getElementById('course-category');
const idInput = document.getElementById('course-id');
const submitBtn = document.getElementById('submit-btn');

// Функция сохранения в localStorage
function saveToStorage() {
  localStorage.setItem('courses', JSON.stringify(courses));
}

// READ (Просмотр карточек)
function renderCourses() {
  container.innerHTML = '';
  
  if (courses.length === 0) {
    container.innerHTML = '<p>Список курсов пуст.</p>';
    return;
  }

  courses.forEach(course => {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.style.cssText = 'background: #fff; padding: 20px; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); margin-bottom: 15px;';
    
    card.innerHTML = `
      <span style="font-size: 12px; color: #FF3F3A; font-weight: bold;">${course.category}</span>
      <h4 style="margin: 10px 0;">${course.title}</h4>
      <button onclick="editCourse(${course.id})" style="padding: 5px 10px; margin-right: 5px; cursor: pointer;">Изменить</button>
      <button onclick="deleteCourse(${course.id})" style="padding: 5px 10px; background: #ff4d4d; color: #fff; border: none; cursor: pointer;">Удалить</button>
    `;
    container.appendChild(card);
  });
}

//  CREATE & UPDATE (Создание или Изменение)
form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const title = titleInput.value.trim();
  const category = categoryInput.value.trim();
  const editId = idInput.value;

  if (!title || !category) return;

  if (editId) {
    // UPDATE: если ID задан, значит мы редактируем существующий курс
    courses = courses.map(course => {
      if (course.id == editId) {
        return { ...course, title, category };
      }
      return course;
    });
    // Сбрасываем кнопку обратно
    submitBtn.textContent = 'Добавить курс';
    idInput.value = '';
  } else {
    // CREATE: создаем новый объект
    const newCourse = {
      id: Date.now(), // уникальный ID на основе времени
      title,
      category
    };
    courses.push(newCourse);
  }

  saveToStorage();
  renderCourses();
  form.reset();
});

// UPDATE (Подготовка формы для редактирования)
window.editCourse = function(id) {
  const course = courses.find(c => c.id == id);
  if (!course) return;

  titleInput.value = course.title;
  categoryInput.value = course.category;
  idInput.value = course.id;
  
  submitBtn.textContent = 'Сохранить изменения';
  titleInput.focus();
};

// DELETE (Удаление)
window.deleteCourse = function(id) {
  courses = courses.filter(course => course.id != id);
  saveToStorage();
  renderCourses();
};

// Первичный запуск отрисовки при загрузке страницы
document.addEventListener('DOMContentLoaded', renderCourses);