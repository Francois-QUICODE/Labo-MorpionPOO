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
        window.debug ? console.log(`New cell created : X = ${this.posX}, Y= ${this.posY}, cells size ${this.size} px`) : false;
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

    changePlayer(player) {
        if (this.player === null) {
            this.player = player;
            this.render.setAttribute('data-player', `${this.player}`);
        } else {
            console.log("This cell is not empty, try another cell...");
        }
        return true;
    }

}
