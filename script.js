const options = document.querySelectorAll(".options");
const playerPot = document.querySelector("#playerPot");
const computerPot = document.querySelector("#computerPot");
const resultPot = document.querySelector("#resultPot");
const movesTaken = document.querySelector(".movesLeft");
const rec = document.querySelector(".rec");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
let playerscoreCum = document.querySelector(".playerScore");
let computerscoreCum = document.querySelector(".computerScore");
let moves = 0;
let player;
let computer;
let result;
let playerScore = 0;
let computerScore = 0;
let record = 0;


//MODAL

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//computer choice
function computerChoice() {
  const compPick = ["ROCK", "PAPER", "SCISSORS"];
  let random = compPick[Math.floor(Math.random() * compPick.length)].toLowerCase();
  return random;
}

//player choice.
function playerChoice() {
  options.forEach((btn) => {
    btn.addEventListener("click", () => {
      player = btn.alt.toLowerCase();
      playerPot.textContent = `PLAYER: ${player}`;

      computer = computerChoice();
      computerPot.textContent = `COMPUTER: ${computer}`;

      gameRules();
    });
  });
}
playerChoice();

//logic of the game, how it is played together with checking winner and restarting the game.
function gameRules() {
  if (player === computer) {
    result = "Tied";
    moves++;
    movesTaken.textContent = `Moves: ${moves}`;
    resultPot.textContent = ` ${result}`;
  } else if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    result = `Good Guess! ${player} beats ${computer}`;
    resultPot.textContent = ` ${result}`;
    playerScore++;
    moves++;
    movesTaken.textContent = `MOVES: ${moves}`;
    playerscoreCum.textContent = ` ${playerScore}`;
  } else {
    result = `OOPS! ${computer} beats ${player}`;
    resultPot.textContent = ` ${result}`;
    computerScore++;
    moves++;
    movesTaken.textContent = `MOVES: ${moves}`;
    computerscoreCum.textContent = `${computerScore}`;
  }
  checkWinner();
  // restart();
}

//disbale buttons after a winner is gotten
function btnDisable() {
  options.forEach((btn) => {
    btn.disabled = true;
  });
}

//enable the options button after you click the restart button.
function btnEnabled() {
  options.forEach((btn) => {
    btn.disabled = false;
  });
}

function refresh() {
  resultPot.textContent = "Result: ";
  movesTaken.textContent = "Moves: 0";
  playerPot.textContent = "Player: ";
  computerPot.textContent = "Computer: ";
  playerscoreCum.textContent = "0";
  computerscoreCum.textContent = "0";
  moves = 0;
  playerScore = 0;
  computerScore = 0;
  btnEnabled();
}

function checkWinner() {
  if (playerScore >= 5) {
    resultPot.textContent = "NA ME NAU!🎉🍾";
    setTimeout(() => {
      restart();
    }, 2000);

    btnDisable();
    recordChecker();
  } else if (computerScore >= 5) {
    resultPot.textContent = "GAME OVER!💩";
    setTimeout(() => {
      const restarter = document.createElement("button");
      restarter.textContent = "RETRY";
      restarter.classList.add("restart");
      resultPot.appendChild(restarter);

      restarter.addEventListener("click", () => {
        refresh();
      });
    }, 2000);
    btnDisable();
  }
}

function recordChecker() {
  if (playerScore === 5 && (moves < record || record === 0)) {
    record = moves;
    rec.textContent = `PERSONAL BEST --- ${record}`;
  } else if (playerScore === 5 && moves < record) {
    rec.textContent = moves;
  }
}

function restart() {
  const restartBtn = document.createElement("button");
  restartBtn.textContent = "RESTART";
  restartBtn.id = "restart";
  resultPot.appendChild(restartBtn);

  restartBtn.addEventListener("click", () => {
    refresh();
  });
}
