import Message from './message.js';
export default class Cell {
    /**
     * @param {number} x
     * @param {number} y
     * @param {Element} destination
     * @param {number} size
     */

    constructor(x, y, destination, size) {
        this.posX = x;
        this.posY = y;
        this.player = null;
        this.size = size;
        this.render = this.render(destination, this.size)
        // window.debug ? console.log(`New cell created : X = ${this.posX}, Y= ${this.posY}, cells size ${this.size} px`) : false;
    }

    /**
     *render a Cell
     *
     * @param {Element} destination
     * @param {number} size 
     * @memberof Cell
     */
    render(destination, size) {
        const render = document.createElement("div");
        render.setAttribute("class", `cell x${this.posX} y${this.posY}`);
        render.setAttribute('data-posX', `${this.posX}`);
        render.setAttribute('data-posY', `${this.posY}`);
        render.setAttribute('data-player', `${this.player}`);
        destination.appendChild(render);
        render.style.width = `${size}px`;
        render.style.height = `${size}px`;
        return render;
    }

    /**
     *
     *
     * @param {*} player
     * @param {String} messageContainer - CSS class for message location
     * @return {boolean} 
     * @memberof Cell
     */
    changePlayer(player, messageContainer) {
        if (this.player === null) {
            this.player = player;
            this.render.setAttribute('data-player', `${this.player}`);
            return true;
        } else {
            new Message(messageContainer, "This cell is not empty, try another cell...", ".not-empty", 2500);
            return false;
        }

    }
    /**
     *Compare this cell player to the another cell player
     *
     * @param {Cell} anotherCell
     * @memberof Cell
     */
    compareCellPlayerTo(anotherCell) {
        if (anotherCell !== undefined) {
            if (this.player === anotherCell.player) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }

    }

}
