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
        this.goal = parseInt(document.querySelector("#goal").dataset.value);


        window.debug ? console.log(`${this.goal}`) : false;

        // window.debug ? console.log("Board created.") : false;
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
            let cellHasChanged = playedCell.changePlayer(this.actualPlayer);
            /**
                            this.checkVictoryVertical(playedCell, this.goal);
                            this.checkVictoryHorizontal(playedCell, this.goal);
            */
            this.checkVictory(playedCell, this.goal)
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
     *Check victory Vertically
     *
     * @param {Cell} playedCell cell who"s just played
     * @param {number} goal
     * @memberof Board
     */
    checkVictoryVertical(playedCell, goal) {
        let samePlayerCellsCount = 1;
        for (let i = 1; i < goal; i++) {
            const comparedCell = this.cells[playedCell.posX + i][playedCell.posY]
            if (typeof comparedCell !== undefined) {
                if (playedCell.compareCellPlayerTo(comparedCell) && samePlayerCellsCount < goal) {
                    samePlayerCellsCount += 1;
                } else {
                    break;
                }
            }
        }
        for (let i = 1; i < goal; i++) {
            const comparedCell = this.cells[playedCell.posX - i][playedCell.posY]
            if (typeof comparedCell !== undefined) {
                if (playedCell.compareCellPlayerTo(comparedCell) && samePlayerCellsCount < goal) {
                    samePlayerCellsCount += 1;
                } else {
                    break;
                }
            }
        }

        console.log(`Horizontal : ${samePlayerCellsCount}`);

        if (samePlayerCellsCount === goal) {
            console.log("%c ----Victoire----", "color:red; font-size:12px");
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
            const comparedCell = this.cells[playedCell.posX][playedCell.posY + i];
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
                const comparedCell = this.cells[playedCell.posX][playedCell.posY - i]
                if (playedCell.compareCellPlayerTo(comparedCell) && samePlayerCellsCount < goal) {
                    //compare to the left direction
                    samePlayerCellsCount += 1;
                } else {
                    break;
                }
            }
        }

        console.log(`Horizontal : ${samePlayerCellsCount}`);

        if (samePlayerCellsCount === goal) {
            console.log("%c ----Victoire----", "color:red; font-size:12px");
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

        const verificationArray = [
            {
                "orientation": "horizontal",
                "directions": {
                    "firstDirection": {
                        "xMod": 0,
                        "yMod": 1
                    },
                    "secondDirection": {
                        "xMod": 0,
                        "yMod": -1
                    }
                }
            },
            {
                "orientation": "vertical",
                "directions": {
                    "firstDirection": {
                        "xMod": 1,
                        "yMod": 0
                    },
                    "secondDirection": {
                        "xMod": -1,
                        "yMod": 0
                    }
                }
            },
            {
                "orientation": "diagonalUp",
                "directions": {
                    "firstDirection": {
                        "xMod": 1,
                        "yMod": 1
                    },
                    "secondDirection": {
                        "xMod": -1,
                        "yMod": -1
                    }
                }
            },
            {
                "orientation": "diagonalDown",
                "directions":
                {
                    "firstDirection": {
                        "xMod": 1,
                        "yMod": -1
                    },
                    "secondDirection": {
                        "xMod": -1,
                        "yMod": 1
                    }
                }
            }
        ]

        console.log(verificationArray)

        for (const verification of verificationArray) {
            let samePlayerCellsCount = 1;
            for (const direction in verification.directions) {
                console.log(direction);
                console.log(direction.xMod);
                for (let i = 1; i < goal; i++) {
                    const comparedCell = this.cells[playedCell.posX + direction.xMod][playedCell.posY + direction.yMod];
                    if (typeof comparedCell !== undefined) {
                        if (playedCell.compareCellPlayerTo(comparedCell) && samePlayerCellsCount < goal) {
                            //compare to the right direction
                            samePlayerCellsCount += 1;
                        } else {
                            break;
                        }
                    }
                }
            }
            if (samePlayerCellsCount === goal) {
                console.log("%c ----Victoire----", "color:red; font-size:12px");
                return true;
            } else {
                return false;
            }
        }



    }
}
