let grid = document.getElementById('grid');
const easy = 100;
const medium = 81;
const hard = 49;
const playBtn = document.getElementById('playBtn');
const difficulty = document.getElementById('difficulty');

playBtn.addEventListener('click', () => {
    eraser(grid);
    switch (difficulty.value) {
        case 'easy':
            console.log('easy');
            gridGenerator(easy, 'easy');
            break;
        case 'medium':
            gridGenerator(medium, 'medium');
            console.log('medium');
            break;
        case 'hard':
            gridGenerator(hard, 'hard');
            console.log('hard');
            break;
        default:
            console.log('default');
            break;
    }
})

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
        cell.className = 'square ' + appendClass;
        cell.innerHTML = i + 1;
        cell.addEventListener('click', () => {
            cell.classList.toggle('highlighted');
        })
        grid.appendChild(cell);
    }
}