document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    // Получаем значения из инпутов
    let firstName = document.getElementById("firstName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let formMsg = document.getElementById("formMsg");

    // Регулярные выражения (RegExp) для проверки:
    let nameRegex = /^[А-Яа-яA-Za-z\-]+$/;          // Только буквы (и дефис для двойных имён)
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   // Стандартная проверка почты (наличие @ и домена)
    let phoneRegex = /^\+?[0-9\s\-\(\)]{10,15}$/;  // Проверка телефона (цифры, пробелы, скобки, плюс)

    // Проверка First Name
    if (!nameRegex.test(firstName)) {
        formMsg.style.color = "red";
        formMsg.innerText = "Ошибка: First Name должно содержать только буквы!";
        return;
    }

    // Проверка Last Name
    if (!nameRegex.test(lastName)) {
        formMsg.style.color = "red";
        formMsg.innerText = "Ошибка: Last Name должно содержать только буквы!";
        return;
    }

    // Проверка Email
    if (!emailRegex.test(email)) {
        formMsg.style.color = "red";
        formMsg.innerText = "Ошибка: Неверный формат Email (проверьте @ и точку)!";
        return;
    }

    // Проверка Phone (если пользователь его вообще начал заполнять)
    if (phone !== "" && !phoneRegex.test(phone)) {
        formMsg.style.color = "red";
        formMsg.innerText = "Ошибка: Неверный формат номера телефона!";
        return;
    }

    // Если всё прошло успешно
    formMsg.style.color = "green";
    formMsg.innerText = "Спасибо! Ваше сообщение успешно отправлено.";
    
    // Очистить форму (по желанию)
    document.getElementById("contactForm").reset();
});