let buttons = document.querySelectorAll(".click");
let turnX = true;
let count = 0;
let newGameBtn = document.getElementById("start");
let xcount = 0;
let ocount = 0;
let tcount = 0;
let h3X = document.querySelector('h3.p1');
let h3O = document.querySelector('h3.p2');
let h3T = document.querySelector('h3.p3');
let px = document.querySelector('span.p1');
let po = document.querySelector('span.p2');
const Xsound = new Audio('images/X.mp3');
const Osound = new Audio('images/O.mp3');

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

buttons.forEach((click) => {
  click.addEventListener("click", () => {
    if (turnX) {
      Xsound.play();
      var img = document.createElement('img');
      click.innerText = "X";
      img.src = '/images/X.png';
      click.appendChild(img);
      po.style.visibility = 'visible';
      px.style.visibility = 'hidden';
      turnX = false;
    } else {
      Osound.play();
      var img = document.createElement('img');
      img.src = '/images/O.png';
      click.innerText = "O";
      po.style.visibility = 'hidden';
      px.style.visibility = 'visible';
      click.appendChild(img);
      turnX = true;
    }

    click.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  tcount++;
  h3T.textContent = tcount;
  var koMessage = document.getElementById('koMessage');
  koMessage.textContent = "OOPS! It's Draw";
  koMessage.classList.remove('hidden');
  setTimeout(function () {
    koMessage.classList.add('hidden');
  }, 3000);
};

const disableBoxes = () => {
  for (let btn of buttons) {
    btn.disabled = true;
  }
};

const enableBoxes = () => {
  for (let btn of buttons) {
    btn.disabled = false;
    btn.innerText = "";
  }
};

const showWinner = (winner) => {
  if (winner === "X") {
    xcount++;
    h3X.textContent = xcount;
  }
  else {
    ocount++;
    h3O.textContent = ocount;
  }
  showKO(winner);
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = buttons[pattern[0]].innerText;
    let pos2Val = buttons[pattern[1]].innerText;
    let pos3Val = buttons[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

const showKO = (winner) => {
  var koMessage = document.getElementById('koMessage');
  koMessage.textContent = 'KO! "' + winner + '" Wins';
  koMessage.classList.remove('hidden');
  setTimeout(function () {
    koMessage.classList.add('hidden');
  }, 3000);
}

newGameBtn.addEventListener("click", () => {
  turnX = true;
  count = 0;
  enableBoxes();
  po.style.visibility = 'hidden';
  px.style.visibility = 'visible';
});