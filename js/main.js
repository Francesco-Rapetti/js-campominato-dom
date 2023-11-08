let grid = document.getElementById('grid');
const easy = 100;
const medium = 81;
const hard = 49;
const playBtn = document.getElementById('playBtn');
const difficulty = document.getElementById('difficulty');
const scoreUI = document.getElementById('score');
const glass = document.getElementById('glass');
const endMessage = document.getElementById('endMessage');
const endScore = document.getElementById('endScore');
const highScoreUI = document.getElementById('highScore');
const restart = document.getElementById('restart');
let game = false;
let score = 0;
let highScore = 0;
let maxScore;
let bombs = [];
let safeTiles = [];

playBtn.addEventListener('click', newGame);
restart.addEventListener('click', newGame);

/**
 * Erases the content of a given div element.
 *
 * @param {HTMLElement} div - The div element to be cleared.
 */
function eraser(div) {
    if (div.firstChild) {
        div.innerHTML = '';
    }
}

/**
 * Generates a grid of cells with the specified number and appends the given class to each cell.
 *
 * @param {number} number - The number of cells to generate.
 * @param {string} appendClass - The class to append to each cell.
 */
function gridGenerator(number, appendClass) {
    for (let i = 0; i < number; i++) {
        const cell = document.createElement('div');
        const cellNumber = i+1;
        cell.className = 'square ' + appendClass;
        cell.innerHTML = cellNumber;
        cell.addEventListener('click', () => {
            if (game && (safeTiles.includes(cellNumber) || bombs.includes(cellNumber))) {
                if (bombs.includes(cellNumber)) {
                    cell.classList.add('bomb');
                    endGame(false);
                } else {
                    cell.classList.add('highlighted');
                    score++;
                    scoreUI.innerHTML = 'Score: ' + score;
                    if (score >= maxScore) {
                        endGame(true);
                    }
                    const index = safeTiles.indexOf(cellNumber);
                    safeTiles.splice(index, 1);
                    console.log(safeTiles)
                }
            }
        })
        grid.appendChild(cell);
    }
}

/**
 * Generates an array of random numbers within the specified range.
 *
 * @param {number} maxLength - The maximum value for the random numbers.
 * @return {array} - An array of random numbers.
 */
function bombArrayGenerator(maxLength) {
    let output = [];
    for (let i = 0; i < 16; i++) {
        let element = Math.floor(Math.random() * maxLength) + 1;
        while (output.includes(element)) {
            element = Math.floor(Math.random() * maxLength) + 1;
        }
        output.push(element);
    }
    console.log(output);
    return output;
}

/**
 * Ends the game and updates the game state based on the win condition.
 *
 * @param {boolean} win - Indicates if the player won the game.
 * @return {undefined} This function does not return a value.
 */
function endGame(win) {
    if (win) {
        endMessage.innerHTML = 'HAI VINTO!';
        endMessage.classList.add('text-success');
    } else {
        endMessage.innerHTML = 'HAI PERSO!';
        endMessage.classList.add('text-danger');
    }
    game = false;
    highScoreCalculator();
    endScore.innerHTML = 'Score: ' + score;
    glass.classList.remove('d-none');
}

/**
 * Calculates the high score based on the current score.
 *
 * @param {number} score - The current score.
 * @return {undefined} This function does not return a value.
 */
function highScoreCalculator() {
    if (score > highScore) {
        highScore = score;
        highScoreUI.innerHTML = 'Highest Score: ' + highScore;
    }
}

/**
 * Initializes a new game by resetting the score, hiding the score UI, and generating a new grid based on the selected difficulty.
 *
 * @param {type} difficulty - the selected difficulty level for the game
 * @return {type} undefined
 */
function newGame() {
    scoreUI.classList.remove('d-none');
    glass.classList.add('d-none');
    score = 0;
    scoreUI.innerHTML = 'Score: ' + score;
    game = true;
    eraser(grid);
    switch (difficulty.value) {
        case 'easy':
            console.log('easy');
            gridGenerator(easy, 'easy');
            bombs = bombArrayGenerator(easy);
            safeTiles = safeTilesGenerator(easy, bombs);
            maxScore = easy - 16;
            break;
        case 'medium':
            console.log('medium');
            gridGenerator(medium, 'medium');
            bombs = bombArrayGenerator(medium);
            safeTiles = safeTilesGenerator(medium, bombs);
            maxScore = medium - 16;
            break;
        case 'hard':
            console.log('hard');
            gridGenerator(hard, 'hard');
            bombs = bombArrayGenerator(hard);
            safeTiles = safeTilesGenerator(hard, bombs);
            maxScore = hard - 16;
            break;
        default:
            console.log('default');
            break;
    }
    console.log('cheat: ' + safeTiles);
}

function safeTilesGenerator(number, arrayToExclude) {
    let output = [];
    for (let i = 1; i <= number; i++) {
        if (arrayToExclude.includes(i)) {
            continue;
        }
        output.push(i);
    }
    return output;
}