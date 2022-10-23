const content = document.querySelector(".content");
const form = document.querySelector("form");
const firstPlayer = document.querySelector(".first");
const secondPlayar = document.querySelector(".second");
let marcUp = "";
let player = "X";
let muvesPlayarX = [];
let muvesPlayarO = [];
let winArr = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
for (let i = 0; i < 9; i += 1) {
  marcUp += `<div class="item" data-id = "${i}"></div>`;
}
content.insertAdjacentHTML(`beforeend`, marcUp);
console.log(marcUp);
content.addEventListener(`click`, onStart);
function onStart(evt) {
  if (!evt.target.classList.contains(`item`)) {
    return;
  }

  if (!evt.target.textContent) {
    evt.target.textContent = player;
    if (player === "X") {
      muvesPlayarX.push(evt.target.dataset.id);
      if (onWiner(winArr, muvesPlayarX)) {
        alert(firstPlayer.textContent);
      }
      localStorage.setItem("muvesPlayarX", JSON.stringify(muvesPlayarX));
    } else {
      muvesPlayarO.push(evt.target.dataset.id);
      if (onWiner(winArr, muvesPlayarO)) {
        alert(secondPlayer.textContent);
      }
      localStorage.setItem("muvesPlayarO", JSON.stringify(muvesPlayarO));
    }
    player = player === "X" ? "0" : "X";
    localStorage.setItem("currentPlayar", player);
    firstPlayer.classList.toggle("active");
    firstPlayer.classList.toggle("inactive");
    secondPlayar.classList.toggle("active");
    secondPlayar.classList.toggle("inactive");
  }
}
function onWiner(winArr, playaerArr) {
  const isWiner = winArr.some((item) =>
    item.every((value) => playaerArr.includes(value.toString()))
  );
  console.log(isWiner);
  return isWiner;
}

form.addEventListener("submit", onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  const { first, second } = evt.currentTarget.elements;
  console.log(first, second);
  firstPlayer.textContent = first.value;
  secondPlayar.textContent = second.value;
  firstPlayer.classList.add("active");
  secondPlayar.classList.add("inactive");
}

function comeBack() {
  const saveX = JSON.parse(localStorage.getItem("muvesPlayarX")) || [];
  const saveO = JSON.parse(localStorage.getItem("muvesPlayarO")) || [];
  player = localStorage.getItem("currentPlayar") || "X";
  muvesPlayarX = saveX;
  muvesPlayarO = saveO;
  for (const item of content.children) {
    console.log(item);
    if (saveX.length && saveX.includes(item.dataset.id)) {
      item.textContent = "X";
      continue;
    }
    if (saveO.length && saveO.includes(item.dataset.id)) {
      item.textContent = "O";
      continue;
    }
  }
}
comeBack();
