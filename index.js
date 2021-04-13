let cardsElem = document.querySelector("#cards");
let addItemButton = document.querySelector("#add-item");
let addBackgroundInput = document.querySelector("#add-background");
let cards = [
  // {
  //   title: "bmw",
  //   desc: "Немецкая машина",
  //   buttonText: "Купить",
  // },
  // { title: "audi", desc: "Надежная Машина", buttonText: "Приобрести" },
  // { title: "lada", desc: "Без комментариев", buttonText: "Беги" },
  // { title: "toyta", desc: "Японское Авто ", buttonText: "Возьми" },
  // { title: "Volvo", desc: "Безопасная машина", buttonText: "Бери" },
];
if (localStorage.getItem("cards")) {
  cards = JSON.parse(localStorage.getItem("cards"));
}
if (localStorage.getItem("background")) {
  document.body.style.backgroundImage = `url(${localStorage.getItem(
    "background"
  )})`;
}
function cardTemplate(card, index) {
  return `
    <div class="card col">
        <div class="title">${card.title}</div>
        <div class="text">${card.desc}</div>
        <button onclick="deleteItem(${index})" class="button">${card.buttonText}</button>
    </div>`;
}
function autoRating(auto) {
  if (auto === "bmw") {
    return "10/10";
  } else {
    return "0/10";
  }
}
function updateHTML() {
  cardsElem.innerHTML = "";
  for (let i = 0; i < cards.length; i += 1) {
    cardsElem.innerHTML += cardTemplate(cards[i], i);
  }
}
function addItem() {
  let title = prompt("Введите заголовок");
  while (!title || title === "") {
    title = prompt("Введите заголовок");
  }
  let desc = prompt("Введите описание");
  while (!desc || desc === "") {
    desc = prompt("Введите описание");
  }
  let buttonText = prompt("Введите текст кнопки");
  while (!buttonText || buttonText === "") {
    buttonText = prompt("Введите текст кнопки");
  }
  cards.push({ title: title, desc: desc, buttonText: buttonText });
  localStorage.setItem("cards", JSON.stringify(cards));
  updateHTML();
}

function changeBackground(file) {
  if (file.size / 1024 / 1024 > 2) {
    console.log(file);
    alert("Размер файла слишком большой!!!");
    return;
  }
  let reader = new FileReader();
  reader.onload = function (e) {
    document.body.style.backgroundImage = `url(${e.target.result})`;
    localStorage.setItem("background", e.target.result);
  };
  reader.readAsDataURL(file);
}

function readURL(input) {
  if (input.files && input.files[0]) {
    changeBackground(input.files[0]);
  }
}

function deleteItem(index) {
  cards.splice(index, 1);
  localStorage.setItem("cards", JSON.stringify(cards));
  updateHTML();
}

updateHTML();
addItemButton.onclick = addItem;
addBackgroundInput.onchange = function (e) {
  readURL(e.target);
  // console.log(e.target);
};
