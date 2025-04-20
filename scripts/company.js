let companies = [];

// Ссылка на базу
const companiesRef = firebase.database().ref("companies");

// Загрузка данных из Firebase
function loadCompanies() {
  companiesRef.on("value", (snapshot) => {
    const data = snapshot.val();
    companies = [];

    if (data) {
      Object.keys(data).forEach((key) => {
        companies.push({ ...data[key], id: key });
      });
    }

    renderTable();
  });
}

// Сохранение новой компании
function addCompany(company) {
  const newRef = companiesRef.push();
  newRef.set(company);
}

// Удаление компании
function deleteCompany(index) {
  const id = companies[index].id;
  firebase.database().ref(`companies/${id}`).remove();
}

// Редактирование компании
function editCompany(index) {
  const company = companies[index];
  const newName = prompt("Изменить название компании:", company.name);
  const newContact = prompt("Изменить email:", company.contact);
  const newStatus = prompt("Изменить статус (Активна / На паузе):", company.status);

  if (newName && newContact && newStatus && newContact.includes("@")) {
    const updated = {
      name: newName,
      contact: newContact,
      status: newStatus,
    };
    firebase.database().ref(`companies/${company.id}`).set(updated);
  } else {
    alert("❗ Введите корректные данные. Email должен содержать @");
  }
}

// Отрисовка таблицы
function renderTable() {
  const tbody = document.getElementById("companyTable");
  const filter = document.getElementById("statusFilter").value;
  const search = document.getElementById("searchInput").value.toLowerCase();

  tbody.innerHTML = "";

  companies.forEach((company, index) => {
    const matchStatus = filter === "all" || company.status === filter;
    const matchSearch = company.name.toLowerCase().includes(search);

    if (matchStatus && matchSearch) {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${company.name}</td>
        <td>${company.contact}</td>
        <td>${company.status}</td>
        <td>
          <button onclick="editCompany(${index})">✏️</button>
          <button onclick="deleteCompany(${index})">🗑️</button>
        </td>
      `;

      tbody.appendChild(row);
    }
  });
}

// Добавление новой компании через prompt
document.getElementById("addCompanyBtn").addEventListener("click", () => {
  const name = prompt("Название компании:");
  const contact = prompt("Email компании:");

  if (name && contact && contact.includes("@")) {
    const company = {
      name,
      contact,
      status: "Активна",
    };
    addCompany(company);
  } else {
    alert("❗ Введите корректный email и название.");
  }
});

// Фильтр и поиск
document.getElementById("searchInput").addEventListener("input", renderTable);
document.getElementById("statusFilter").addEventListener("change", renderTable);

// Запуск
loadCompanies();
