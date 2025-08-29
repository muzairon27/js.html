const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const restartBtn = document.querySelector("#restart");
const winCondition = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

start();

// Permainan dimulai
function start() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restart);
    statusText.textContent = `Giliran ${currentPlayer}`;
    running = true;
}

// Ketika sel diklik
function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] != "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

// Memperbarui sel
function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

// Memeriksa apakah ada pemenang
function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winCondition.length; i++) {
        const condition = winCondition[i];
        let a = options[condition[0]];
        let b = options[condition[1]];
        let c = options[condition[2]];

        if (a == "" || b == "" || c == "") {
            continue;
        }
        if (a == b && b == c && a != "") {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Pemenang adalah ${currentPlayer}`;
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = "Seri!";
        running = false;
    } else {
        changePlayer();
    }
}

// Mengganti pemain
function changePlayer() {
    currentPlayer = currentPlayer == "X" ? "O" : "X";
    statusText.textContent = `Giliran ${currentPlayer}`;
}

// Memulai ulang permainan
function restart() {
    options = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    cells.forEach(cell => cell.textContent = "");
    running = false;
    start();
}