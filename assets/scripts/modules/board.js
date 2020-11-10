import Cell from "./cell.js";
import Message from "./message.js";
/**
 *Board ClassS
 *
 * @export
 * @class Board
 */
export default class Board {

    /**
     * Creates an instance of Board.
     * @param {Number} size - number of rows and columns
     * @param {String} destinationQuerySelector - query selector write like in css files
     * @param {Number} cellPxSize - size of cells, will be converted in pixels
     * @param {String} messageLocation - Css selector for messages
     * @memberof Board
     */
    constructor(size, destinationQuerySelector, cellPxSize, messageLocation) {

        /** @type {Element} */
        const destination = document.querySelector(destinationQuerySelector)
        this.size = size;
        this.cells = [];
        this.cellPxSize = cellPxSize;
        this.render = this.render(destination);
        this.actualPlayer = "Red square";
        this.goal = parseInt(document.querySelector("#goal").dataset.value);
        this.messageLocation = messageLocation;
        this.cellsQuantity = 0;

        for (let i = 0; i < size; i++) {
            let subArray = [];
            for (let j = 0; j < size; j++) {
                subArray.push(new Cell(i, j, this.render, cellPxSize));
                this.cellsQuantity++;
            }
            this.cells.push(subArray);
        }
        this.listen(this.render);
    }

    render(destination) {
        const render = document.createElement("div");
        render.setAttribute("class", "board");
        render.setAttribute("data-size", `${this.size}`);
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
            let playedCell = this.cells[targetCell.posX][targetCell.posY]
            let cellHasChanged = playedCell.changePlayer(this.actualPlayer, this.messageLocation);
            this.checkEndOfTheGame(playedCell);
            cellHasChanged ? this.actualPlayer = this.switchToNextPlayer(this.actualPlayer) : false;
        })

    }

    switchToNextPlayer(actualPlayer) {
        switch (actualPlayer) {
            case "Red square":
                return "Lime circle";

            case "Lime circle":
                return "Red square";

            default:
                break;
        }
    }

    /**
     *Check if a cell exists relatively at the played cell
     *
     * @param {Cell} playedCell
     * @param {number} i - i value in the loop
     * @param {number} X - -1, 0, 1
     * @param {number} Y - -1, 0, 1
     * @return {Cell} 
     * @memberof Board
     */

    checkExistingCell(playedCell, i, X, Y) {

        if (this.cells[playedCell.posX + i * X] !== undefined) {
            if (this.cells[playedCell.posX + i * X][playedCell.posY + i * Y] !== undefined) {
                return this.cells[playedCell.posX + i * X][playedCell.posY + i * Y]
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    }

    /**
     *Check victory Vertically
     *
     * @param {Cell} playedCell cell who"s just played
     * @param {number} goal
     * @memberof Board
     */

    checkVictoryVertical(playedCell, goal) {
        let samePlayerCellsCount = 1;
        for (let i = 1; i < goal; i++) {
            const comparedCell = this.checkExistingCell(playedCell, i, +1, 0)
            if (typeof comparedCell !== undefined) {
                if (playedCell.compareCellPlayerTo(comparedCell) && samePlayerCellsCount < goal) {
                    samePlayerCellsCount += 1;
                } else {
                    break;
                }
            }
        }

        for (let i = 1; i < goal; i++) {
            const comparedCell = this.checkExistingCell(playedCell, i, -1, 0)
            if (typeof comparedCell !== undefined) {
                if (playedCell.compareCellPlayerTo(comparedCell) && samePlayerCellsCount < goal) {
                    samePlayerCellsCount += 1;
                } else {
                    break;
                }
            }
        }

        if (samePlayerCellsCount === goal) {
            return true;
        } else {
            return false;
        }
    }

    /**
     *Check victory up-diagonally
     *
     * @param {Cell} playedCell cell who"s just played
     * @param {number} goal
     * @memberof Board
     */
    checkVictoryDiagonalUp(playedCell, goal) {
        let samePlayerCellsCount = 1;
        /** @type {Cell} */

        for (let i = 1; i < goal; i++) {
            const comparedCell = this.checkExistingCell(playedCell, i, 1, 1)
            if (typeof comparedCell !== undefined) {
                if (playedCell.compareCellPlayerTo(comparedCell) && samePlayerCellsCount < goal) {
                    samePlayerCellsCount += 1;
                } else {
                    break;
                }
            }
        }
        for (let i = 1; i < goal; i++) {
            const comparedCell = this.checkExistingCell(playedCell, i, -1, -1)
            if (typeof comparedCell !== undefined) {
                if (playedCell.compareCellPlayerTo(comparedCell) && samePlayerCellsCount < goal) {
                    samePlayerCellsCount += 1;
                } else {
                    break;
                }
            }
        }

        if (samePlayerCellsCount === goal) {
            return true;
        } else {
            return false;
        }
    }


    /**
     *Check victory down-diagonally
     *
     * @param {Cell} playedCell cell who"s just played
     * @param {number} goal
     * @memberof Board
     */
    checkVictoryDiagonalDown(playedCell, goal) {
        let samePlayerCellsCount = 1;
        for (let i = 1; i < goal; i++) {
            const comparedCell = this.checkExistingCell(playedCell, i, -1, 1);
            if (typeof comparedCell !== undefined) {
                if (playedCell.compareCellPlayerTo(comparedCell) && samePlayerCellsCount < goal) {
                    samePlayerCellsCount += 1;
                } else {
                    break;
                }
            }
        }
        for (let i = 1; i < goal; i++) {
            const comparedCell = this.checkExistingCell(playedCell, i, 1, -1)
            if (typeof comparedCell !== undefined) {
                if (playedCell.compareCellPlayerTo(comparedCell) && samePlayerCellsCount < goal) {
                    samePlayerCellsCount += 1;
                } else {
                    break;
                }
            }
        }

        if (samePlayerCellsCount === goal) {
            return true;
        } else {
            return false;
        }

    }

    /**
     *Check victory Horizontally
     *
     * @param {Cell} playedCell cell who"s just played
     * @param {number} goal
     * @memberof Board
     */

    checkVictoryHorizontal(playedCell, goal) {
        let samePlayerCellsCount = 1;
        for (let i = 1; i < goal; i++) {
            const comparedCell = this.checkExistingCell(playedCell, i, 0, 1)
            if (typeof comparedCell !== undefined) {
                if (playedCell.compareCellPlayerTo(comparedCell) && samePlayerCellsCount < goal) {
                    //compare to the right direction
                    samePlayerCellsCount += 1;
                } else {
                    break;
                }
            }
        }
        for (let i = 1; i < goal; i++) {

            if (typeof comparedCell !== undefined) {
                const comparedCell = this.checkExistingCell(playedCell, i, 0, -1)
                if (playedCell.compareCellPlayerTo(comparedCell) && samePlayerCellsCount < goal) {
                    //compare to the left direction
                    samePlayerCellsCount += 1;
                } else {
                    break;
                }
            }
        }

        if (samePlayerCellsCount === goal) {
            return true;
        } else {
            return false;
        }
    }


    /**
     *Check victory
     *
     * @param {Cell} playedCell cell who"s just played
     * @param {number} goal
     * @memberof Board
     */

    checkVictory(playedCell, goal) {

        if (this.checkVictoryDiagonalDown(playedCell, goal) ||
            this.checkVictoryDiagonalUp(playedCell, goal) ||
            this.checkVictoryHorizontal(playedCell, goal) ||
            this.checkVictoryVertical(playedCell, goal)) {
            return true
        } else {
            return false;
        }
    }

    checkFullBoard() {
        let playedCellCount = 0;
        for (const row of this.cells) {
            for (const cell of row) {
                cell.player !== null ? playedCellCount++ : false;
            }
        }
        return playedCellCount === this.cellsQuantity;
    }



    /**
     *Check if the game ending after a check victory and check if board is full
     *
     * @memberof Board
     */
    checkEndOfTheGame(playedCell) {
        if (this.checkVictory(playedCell, this.goal)) {
            new Message(this.messageLocation, ` Victory of the player : ${this.actualPlayer}`, "victory", undefined, false, [{ 'text': 'Change Configuration', 'link': './' }]);
        } else if (this.checkFullBoard()) {
            new Message(this.messageLocation, "The Board is full !!!", "victory", undefined, false, [{ 'text': 'Change Configuration', 'link': './' }]);
        }
    }

}
