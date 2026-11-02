document.addEventListener("DOMContentLoaded", function () {
  const options = {
    root: null, // используется область вьюпорта
    rootMargin: '0px',
    threshold: 0.15 // анимация начнется, когда элемент появится на 15% в поле зрения
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Класс active, запускающий CSS-переход
        entry.target.classList.add('active');
        
        // Прекращаем следить за элементом после того, как он появился, чтобы не дергалась
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // Находим все элементы с классом .reveal
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => observer.observe(el));
});
