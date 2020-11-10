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
        this.actualPlayer = "X";
        this.goal = parseInt(document.querySelector("#goal").dataset.value);
        this.messageLocation = messageLocation

        for (let i = 0; i < size; i++) {
            let subArray = [];
            for (let j = 0; j < size; j++) {
                subArray.push(new Cell(i, j, this.render, cellPxSize));
            }
            this.cells.push(subArray);
        }
        // window.debug ? console.log("Board Hydrated") : false;
        // window.debug ? console.log(this.cells) : false;
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

            this.checkVictory(playedCell, this.goal) ?
                new Message(this.messageLocation, `And the winner is : ${this.actualPlayer}`, 'victory') :
                false;

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
     *Check if a cell exists relatively at a played cell
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
            //console.log("%c X = OK", "color: chartreuse");
            if (this.cells[playedCell.posX + i * X][playedCell.posY + i * Y] !== undefined) {
                //console.log("%c Y = OK", "color: chartreuse");
                return this.cells[playedCell.posX + i * X][playedCell.posY + i * Y]
            } else {
                //console.log("%c Y = KO", "color: pink");
                return undefined;
            }
        } else {
            //console.log("%c X = KO", "color: pink");
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

        //console.log(`%c Ver : ${samePlayerCellsCount}`, "color: green;");

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

        //console.log(`%c UD : ${samePlayerCellsCount}`, "color: green;");

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

        //console.log(`%c DD : ${samePlayerCellsCount}`, "color: green;");

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

        //console.log(`%c Hor : ${samePlayerCellsCount}`, "color: green;");

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

        //TODO: Use a json to male all verifications with only one method
        /**
        const verificationArray = [
            {
                "orientation": "horizontal",
                "directions": [
                    {
                        "firstDirection": {
                            "xMod": 0,
                            "yMod": 1
                        }
                    },
                    {
                        "secondDirection": {
                            "xMod": 0,
                            "yMod": -1
                        }
                    }
                ]
            },
            {
                "orientation": "vertical",
                "directions": [
                    {
                        "firstDirection": {
                            "xMod": 1,
                            "yMod": 0
                        }
                    },
                    {
                        "secondDirection": {
                            "xMod": -1,
                            "yMod": 0
                        }
                    }
                ]
            },
            {
                "orientation": "diagonalUp",
                "directions": [
                    {
                        "firstDirection": {
                            "xMod": 1,
                            "yMod": 1
                        }
                    },
                    {
                        "secondDirection": {
                            "xMod": -1,
                            "yMod": -1
                        }
                    }
                ]
            },
            {
                "orientation": "diagonalDown",
                "directions":
                    [
                        {
                            "firstDirection": {
                                "xMod": 1,
                                "yMod": -1
                            }
                        },
                        {
                            "secondDirection": {
                                "xMod": -1,
                                "yMod": 1
                            }
                        }
                    ]
            }
        ]
 
        function getJson(dir) {
            verificationArray.forEach(res => {
 
                if (dir === res.orientation) {
                    return res.directions;
                }
 
                return res;
            });
        }
*/
    }


}
