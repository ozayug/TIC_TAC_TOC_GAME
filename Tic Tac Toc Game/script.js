const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const newGameButton = document.getElementById('new-game-button');
const winnerDisplay = document.getElementById('winner');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkWinner()) {
        gameActive = false;
        winnerDisplay.textContent = `Player ${currentPlayer} wins!`;
    } else if (!gameState.includes('')) {
        gameActive = false;
        winnerDisplay.textContent = 'It\'s a draw!';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
};

const checkWinner = () => {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] !== '' && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
};

const resetGame = () => {
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => (cell.textContent = ''));
    winnerDisplay.textContent = '';
};

const startNewGame = () => {
    resetGame();
    // You can add additional logic for starting a new game if needed
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', startNewGame);
