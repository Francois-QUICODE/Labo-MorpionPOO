import Board from '/assets/scripts/modules/board.js';

window.debug = true;

window.onload = () => {

    window.debug ? console.log("Script lancé") : false;

    const size = document.querySelector('#size').getAttribute('data-value');
    const goal = document.querySelector('#goal').getAttribute('data-value');
    const cellsSize = 50

    window.debug ? console.log(`size : ${size}, goal : ${goal}`) : false;

    new Board(size, ".game", cellsSize, ".message-panel");
}