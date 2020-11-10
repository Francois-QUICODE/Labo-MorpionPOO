export default class Button {
    /**
     * Creates an instance of Button.
     * @param {String} text - text to display
     * @param {String} link - web link or action
     * @memberof Button
     */
    constructor(text, link) {
        this.text = text;
        this.link = link;

        const elmt = document.createElement('a');
        elmt.innerHTML = text;
        elmt.setAttribute("href", link);
        elmt.classList.add = 'button'

        return elmt;
    }
}