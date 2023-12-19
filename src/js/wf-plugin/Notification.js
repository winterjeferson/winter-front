export class Notification {
    constructor() {
        this.elBody = document.querySelector('body');
        this.elNotificationId = 'notification';
        this.colorDefault = 'grey';

        this.notificationId = 0;
    }

    add(obj) {
        if (!obj.text) return;

        this.placeItem(obj);

        const el = document.querySelector(`#${this.elNotificationId + this.notificationId}`);
        this.remove(el, obj.text.length);
        this.notificationId++;
    }

    buildHtml() {
        const html = `<div id="${this.elNotificationId}" class="${this.elNotificationId} ${this.elNotificationId}--default"></div>`;

        this.elBody.insertAdjacentHTML('beforeend', html);
    }

    buildHtmlItem(obj) {
        const color = typeof obj.color !== 'undefined' ? obj.color : this.colorDefault;

        return `
            <div class="${this.elNotificationId}__item ${this.elNotificationId}--regular ${this.elNotificationId}--${color}" id="${this.elNotificationId}${this.notificationId}">
                <span class="${this.elNotificationId}__text">${obj.text}</span>
                <button type="button" class="button button--small button--small--proportional button--transparent" onclick="Notification.remove(this.parentNode, 0)" aria-label="${window.translation.translation.close}">
                    <svg class="icon icon--regular rotate-45">
                        <use xlink:href="./assets/${globalVersion}/img/icon.svg#plus"></use>
                    </svg>
                </button>
            </div>
        `;
    }

    init() {
        this.buildHtml();
        this.update();
    }

    placeItem(obj) {
        let string = this.buildHtmlItem(obj);
        let place = '';

        if (typeof obj.place === 'undefined') {
            place = this.elNotification;
        } else {
            let elList = document.querySelector(obj.place).querySelector(`.${this.elNotificationId}`);

            if (elList === null) {
                let newString = `<div class="${this.elNotificationId}">${string}</div>`;

                string = newString;
                place = document.querySelector(obj.place);
            } else {
                place = elList;
            }
        }

        place.insertAdjacentHTML('beforeend', string);
    }

    remove(item, messageLength) {
        const messageTime = messageLength * 150;

        setTimeout(() => {
            this.removeItem(item);
        }, messageTime);
    }

    removeItem(item) {
        if (item.parentNode === null) return;

        item.parentNode.removeChild(item);
    }

    update() {
        const el = document.querySelector(`#${this.elNotificationId}`);

        this.elNotification = el;
    }
}