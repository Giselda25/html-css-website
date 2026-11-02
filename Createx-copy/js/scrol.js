document.addEventListener("DOMContentLoaded", function () {
  // Настройки наблюдателя
  const options = {
    root: null, // используется область видимости окна браузера
    rootMargin: '0px',
    threshold: 0.15 // анимация начнется, когда элемент появится на 15% в поле зрения
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // Проверяем, появился ли элемент на экране
      if (entry.isIntersecting) {
        // Добавляем класс active, запускающий CSS-переход
        entry.target.classList.add('active');
        
        // Прекращаем следить за элементом после того, как он появился (чтобы анимация не дергалась при обратном скролле)
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // Находим абсолютно все элементы с классом .reveal и «подписываем» их на наблюдателя
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => observer.observe(el));
});