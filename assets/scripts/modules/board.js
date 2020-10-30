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
        this.cellPxSize = cellPxSize;
        this.render = this.render(destination);
        this.actualPlayer = "X";
        window.debug ? console.log("Board created.") : false;
        for (let i = 0; i < size; i++) {
            let subArray = [];
            for (let j = 0; j < size; j++) {
                subArray.push(new Cell(i, j, this.render, cellPxSize));
            }
            this.cells.push(subArray);
        }
        window.debug ? console.log("Board Hydrated") : false;
        window.debug ? console.log(this.cells) : false;
        this.listen(this.render);
    }

    render(destination) {
        const render = document.createElement("div");
        render.setAttribute('class', 'board');
        render.setAttribute('data-size', `${this.size}`);
        render.style.gridTemplateColumns = this.autoGridCalc(this.size);
        render.style.width = this.sizeGridCalc(this.size, this.cellPxSize)
        destination.appendChild(render);
        return render;
    }

    autoGridCalc(size) {
        let gtc = "";
        for (let i = 0; i < size; i++) {
            gtc += "auto ";
        }
        return gtc;
    }

    sizeGridCalc(size, cellSize) {
        return size * cellSize + "px";
    }

    listen(element) {
        element.addEventListener("click", (event) => {
            window.debug ? console.log(event.target.attributes) : false;
            let targetCell = {};
            targetCell.posx = event.target.dataset.posx;
            targetCell.posy = event.target.dataset.posy;
            console.log(targetCell);
            this.cells[targetCell.posx][targetCell.posy].changePlayer(this.actualPlayer);
            this.actualPlayer = this.switchToNextPlayer(this.actualPlayer);
        })

    }

    switchToNextPlayer(actualPlayer) {
        switch (actualPlayer) {
            case "X":
                return "Y";

            case "Y":
                return "X";

            default:
                break;
        }
    }

}
