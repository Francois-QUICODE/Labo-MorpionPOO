import Button from './button.js';
export default class Message {

    /**
     * Creates an instance of Message.
     * @param {String} location - Css selector Where send the message 
     * @param {String} message 
     * @param {String} htmlClass - Css class that the element must take
     * @param {Number} delay - in milliseconds, "undefined" for no delay
     * @param {boolean} disappear - this must disappear on click ? 
     * @param {Array} buttons - Button object {text: 'someText', link : 'a link'}
     * @memberof Message
     */
    constructor(location, message, htmlClass, delay = undefined, disappear = true, buttons = []) {
        const container = document.querySelector(location);
        const element = document.createElement("p");
        cleanHtmlElement(container);
        element.innerHTML = message;
        element.classList.add('message');
        element.classList.add(htmlClass)
        container.appendChild(element);
        container.style.visibility = 'visible';

        if (buttons.length > 0) {
            buttons.forEach(button => {
                const btn = new Button(button.text, button.link);
                container.appendChild(btn);
            });
        }


        if (delay !== undefined) {
            setInterval(() => {
                cleanHtmlElement(container);
            }, delay);
        }

        if (disappear) {
            container.addEventListener("click", () => {
                cleanHtmlElement(container);
            })
        }

        function cleanHtmlElement(element) {
            while (element.firstChild) {
                element.removeChild(element.lastChild);
                element.style.visibility = 'hidden';
            }
        }

    }
}