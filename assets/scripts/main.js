import Board from '/assets/scripts/modules/board.js';

window.onload = () => {



    console.log("Script lancé");

    const size = document.querySelector('#size').getAttribute('data-value');
    const goal = document.querySelector('#goal').getAttribute('data-value');
    const cellsSize = 50

    console.log(`size : ${size}, goal : ${goal}`);

    const board = new Board(size, ".game", cellsSize);
}