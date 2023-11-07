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

function eraser(div) {
    if (div.firstChild) {
        div.innerHTML = '';
    }
}

function gridGenerator(number, appendClass) {
    for (let i = 0; i < number; i++) {
        const cell = document.createElement('div');
        cell.className = 'square ' + appendClass;
        cell.innerHTML = i + 1;
        grid.appendChild(cell);
    }
}