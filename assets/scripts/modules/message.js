export default class Message {

    /**
     * Creates an instance of Message.
     * @param {String} location - Css selector Where send the message 
     * @param {String} message 
     * @param {String} htmlClass - Css class that the element must take
     * @param {Number} delay - in milliseconds
     * @memberof Message
     */
    constructor(location, message, htmlClass, delay) {
        const container = document.querySelector(location);
        const element = document.createElement("p");
        cleanHtmlElement(container);
        element.innerHTML = message;
        element.setAttribute("class", htmlClass);
        container.appendChild(element);

        if (delay !== undefined) {
            setInterval(() => {
                cleanHtmlElement(container);
            }, delay);
        }

        function cleanHtmlElement(element) {
            while (element.firstChild) {
                element.removeChild(element.lastChild);
            }
        }

    }
}