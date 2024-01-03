export class Notification {
    constructor() {
        this.elBody = document.querySelector('body');
        this.id = 'notification';
        this.colorDefault = 'grey';

        this.notificationId = 0;
    }

    add(props) {
        if (!props.content) return;

        this.placeItem(props);

        const el = document.querySelector(`#${this.id + this.notificationId}`);
        this.remove(el, props.content.length);
        this.notificationId++;
    }

    buildHtml(props) {
        const id = props.id ? `id="${this.id}_${props.id}"` : '';
        const position = props.position ? props.position : 'left';
        const content = props.content ? props.content : '';

        return `<div ${id} class="${this.id} ${this.id}--${position}">${content}</div>`;
    }

    buildHtmlDefault() {
        const positions = ['center', 'left', 'right'];
        let html = '';

        positions.forEach((item) => {
            html += this.buildHtml({ id: item, position: item });

        });
        this.elBody.insertAdjacentHTML('beforeend', html);
    }

    buildHtmlItem(props) {
        const color = typeof props.color !== 'undefined' ? props.color : this.colorDefault;
        const size = typeof props.size !== 'undefined' ? props.size : 'regular';
        const ariaLabel = window?.translation?.translation?.close ? window?.translation?.translation?.close : 'close';
        const icon = wfpComponent.drawIcon({
            rotate: '45',
            size: 'regular',
            icon: 'plus',
        });

        return `
            <div class="${this.id}__item ${this.id}--${size} ${this.id}--${color}" id="${this.id}${this.notificationId}">
                <span class="${this.id}__text">${props.content}</span>
                <button type="button" 
                    class="button button--small button--small--proportional button--transparent" 
                    onclick="wfpNotification.remove(this.parentNode, 0)" 
                    aria-label="${ariaLabel}"
                >
                    ${icon}
                </button>
            </div>
        `;
    }

    init() {
        this.buildHtmlDefault();
    }

    placeItem(props) {
        const isPlaceId = typeof props.place !== 'undefined';
        const position = typeof props.position !== 'undefined' ? props.position : 'right';
        let string = this.buildHtmlItem(props);
        let elPlace = '';

        if (isPlaceId) {
            let elList = document.querySelector(props.place).querySelector(`.${this.id}`);

            if (elList === null) {
                let newString = this.buildHtml({ content: string, position });

                string = newString;
                elPlace = document.querySelector(props.place);
            } else {
                elList.style.position = 'relative';
                elPlace = elList;
            }
        } else {
            elPlace = document.getElementById(`${this.id}_${position}`);
        }
        if (elPlace) elPlace.insertAdjacentHTML('beforeend', string);
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
}