class WfNotification {
    constructor() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$body = document.querySelector('body');
        this.$notifyItem = document.querySelectorAll('.notify-item');

        this.notifyId = 0;
    }

    build() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.buildHtml();
        this.buildNavigation();
    }

    buildHtml() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let html = `
            <div id="notify">
                <ul class="notify-list">
                </ul>
            </div>
        `;

        this.$body.insertAdjacentHTML('beforeend', html);
        this.$notify = document.querySelector('#notify .notify-list');
    }

    buildHtmlItem(style = 'grey', message) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), [style, message]); /*endRemoveIf(production)*/
        return `
            <li id="notify${this.notifyId}">
                <div class="notify-item notify-${style}">
                    <span class="text">${message}</span>
                    <button type="button" class="bt" onclick="objWfNotification.remove(this.parentNode, 0)" aria-label="${objWfTranslation.translation.close}">
                        <svg class="icon icon-re rotate-45">
                            <use xlink:href="./assets/img/icon.svg#plus"></use>
                        </svg>
                    </button>
                </div>
            </li>
        `;
    }

    buildNavigation() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/

        Array.prototype.forEach.call(this.$notifyItem, function (item) {
            let bt = item.querySelectorAll('.bt')

            Array.prototype.forEach.call(bt, function (item) {
                item.addEventListener('click', function () {
                    item.parentNode.parentNode.parentNode.removeChild(item.parentNode.parentNode);
                });
            });
        });
    }

    add(message, style, place = this.$notify) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), [message, style, place]); /*endRemoveIf(production)*/
        let string = this.buildHtmlItem(style, message);
        let newPlace = '';

        if (!message) {
            return false;
        }

        if (place !== this.$notify) {
            if (typeof place === 'string') {
                newPlace = document.querySelector(place);
            } else {
                newPlace = place;
            }

            if (!newPlace.querySelector('.notify-list')) {
                newPlace.insertAdjacentHTML('beforeend', '<ul class="notify-list"></ul>');
            }

            newPlace.querySelector('.notify-list').insertAdjacentHTML('beforeend', string);
        } else {
            place.insertAdjacentHTML('beforeend', string);
        }

        this.remove(document.querySelector('#notify' + this.notifyId), message.length);
        this.notifyId++;
    }

    remove(item, messageLength) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), [item, messageLength]); /*endRemoveIf(production)*/
        let messageTime = messageLength * 150;

        function remove() {
            item.parentNode.removeChild(item);
        }

        setTimeout(remove, messageTime);
    }
}