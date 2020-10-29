import Cell from "./cell.js";
/**
 *Board ClassS
 *
 * @export
 * @class Board
 */
export default class Board {

    /**
     * Creates an instance of Board.
     * @param {Number} size number of rows and columns
     * @param {String} destinationQuerySelector query selector write like in css files
     * @param {Number} cellPxSize size of cells, will be converted in pixels
     * @memberof Board
     */
    constructor(size, destinationQuerySelector, cellPxSize) {
        /** @type {Element} */

        const destination = document.querySelector(destinationQuerySelector)
        this.size = size;
        this.cells = [];
        const render = document.createElement("div");
        this.render = render;
        render.setAttribute('class', 'board');
        render.setAttribute('data-size', `${this.size}`);
        render.style.gridTemplateColumns = this.autoGridCalc(this.size);
        render.style.width = this.sizeGridCalc(this.size, cellPxSize)
        destination.appendChild(render);
        console.log("Board created.");
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                this.cells.push(new Cell(i, j, this.render, cellPxSize));
            }
        }
    }

    autoGridCalc(size) {
        let gtc = "";
        for (let i = 0; i < size; i++) {
            gtc += "auto "
            console.log(gtc)
        }
        return gtc;
    }

    sizeGridCalc(size, cellSize) {
        return size * cellSize + "px";
    }

}
