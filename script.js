const options = document.querySelectorAll(".options");
const playerPot = document.querySelector("#playerPot");
const computerPot = document.querySelector("#computerPot");
const resultPot = document.querySelector("#resultPot");
const movesTaken = document.querySelector(".movesLeft");
const rec = document.querySelector(".rec");
let playerscoreCum = document.querySelector(".playerScore");
let computerscoreCum = document.querySelector(".computerScore");
let moves = 0;
let player;
let computer;
let result;
let playerScore = 0;
let computerScore = 0;
let record = 0;

//computer choice
function computerChoice() {
  const compPick = ["rock", "paper", "scissors"];
  let random = compPick[Math.floor(Math.random() * compPick.length)];
  return random;
}

//player choice.
function playerChoice() {
  options.forEach((btn) => {
    btn.addEventListener("click", () => {
      player = btn.textContent.toLowerCase();
      playerPot.textContent = `Player: ${player}`;

      computer = computerChoice();
      computerPot.textContent = `Computer: ${computer}`;

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
    result = `VAMOS! ${player} beats ${computer}`;
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
    resultPot.textContent = "You win the game!🎉🍾";
    setTimeout(() => {
      restart();
    }, 1000);

    btnDisable();
    recordChecker();
  } else if (computerScore >= 5) {
    resultPot.textContent = "Game Over!😢";
    setTimeout(() => {
      const restarter = document.createElement("button");
      restarter.textContent = "Play Again";
      restarter.classList.add("restart");
      resultPot.appendChild(restarter);

      restarter.addEventListener("click", () => {
        refresh();
      });
    }, 1000);
    btnDisable();
  }
}

function recordChecker() {
  if (playerScore === 5 && (moves < record || record === 0)) {
    record = moves;
    rec.textContent = `PERSONAL BEST ${record}`;
  } else if (playerScore === 5 && moves < record) {
    rec.textContent = moves;
  }
}

function restart() {
  const restartBtn = document.createElement("button");
  restartBtn.textContent = "Restart";
  restartBtn.id = "restart";
  resultPot.appendChild(restartBtn);

  restartBtn.addEventListener("click", () => {
    refresh();
  });
}
