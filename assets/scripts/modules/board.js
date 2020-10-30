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
        element.addEventListener("mousedown", (event) => {
            let targetCell = {};
            targetCell.posX = event.target.dataset.posx;
            targetCell.posY = event.target.dataset.posy;
            console.log(typeof targetCell.posX);
            let chosenCell = this.cells[targetCell.posX][targetCell.posY]
            let cellHasChanged = chosenCell.changePlayer(this.actualPlayer);
            this.checkVictoryVertical(chosenCell, 5);
            cellHasChanged ? this.actualPlayer = this.switchToNextPlayer(this.actualPlayer) : false;
        })

    }

    switchToNextPlayer(actualPlayer) {
        switch (actualPlayer) {
            case "X":
                return "O";

            case "O":
                return "X";

            default:
                break;
        }
    }

    /**
     *
     *
     * @param {Cell} targetCell cell who's just played
     * @param {number} goal
     * @memberof Board
     */
    checkVictoryVertical(targetCell, goal) {
        let samePlayerCellsCount = 0;
        for (let i = 0; i < goal; i++) {
            const comparedCell = this.cells[targetCell.posX + i][targetCell.posY]
            if (targetCell.compareCellPlayerTo(comparedCell)) {
                samePlayerCellsCount += 1;
            } else {
                break;
            }
        }
        for (let i = 0; i < goal; i++) {
            const comparedCell = this.cells[targetCell.posX - i][targetCell.posY]
            if (targetCell.compareCellPlayerTo(comparedCell)) {
                samePlayerCellsCount += 1;
            } else {
                break;
            }
        }
        if (samePlayerCellsCount === goal) {
            console.log("Victoire");
        }
        console.log(samePlayerCellsCount);

    }

}
