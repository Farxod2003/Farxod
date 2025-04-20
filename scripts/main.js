document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".sidebar ul li");
  const frame = document.getElementById("content-frame");

  links.forEach(link => {
    link.addEventListener("click", () => {
      const text = link.textContent.trim();

      if (text.includes("Главная")) {
        frame.src = "dashboard.html";
      } else if (text.includes("Компании")) {
        frame.src = "company.html";
      } else if (text.includes("Звонки")) {
        frame.src = "calls.html";
      } else if (text.includes("Чаты")) {
        frame.src = "chats.html";
      } else if (text.includes("Аналитика")) {
        frame.src = "analytics.html";
      } else if (text.includes("Настройки")) {
        frame.src = "settings.html";
      }
    });
  });
});
