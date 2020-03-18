class WFNotification {
    constructor() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$body = document.querySelector('body');
        this.$notifyItem = document.querySelectorAll('.notify-item');

        this.notifyId = 0;
    }

    build() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.buildHtml();
        this.buildNavigation();
    }

    buildHtml() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        let string = '';

        string += '<div id="notify">';
        string += '    <ul class="notify-list">';
        string += '    </ul>';
        string += '</div>';

        this.$body.insertAdjacentHTML('beforeend', string);
        this.$notify = document.querySelector('#notify .notify-list');
    }

    buildHtmlItem(style = 'grey', message) {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName(), [style, message]); /*endRemoveIf(production)*/
        let string = '';

        string += '<li id="notify_' + this.notifyId + '">';
        string += '     <div class="notify-item notify-' + style + '">';
        string += '         <span class="text">';
        string += message;
        string += '         </span>';
        string += '         <button type="button" class="bt" onclick="$(this).parent().parent().remove();" aria-label="' + objWFTranslation.translation.default.close + '">';
        string += '            <span class="fa fa-times" aria-hidden="true"></span>';
        string += '         </button>';
        string += '     </div>';
        string += '</li>';

        return string;
    }

    buildNavigation() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/

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
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName(), [message, style, place]); /*endRemoveIf(production)*/
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

        this.remove(document.querySelector('#notify_' + this.notifyId), message.length);
        this.notifyId++;
    }

    remove(item, messageLength) {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName(), [item, messageLength]); /*endRemoveIf(production)*/
        let messageTime = messageLength * 150;

        function remove() {
            item.parentNode.removeChild(item);
        }

        setTimeout(remove, messageTime);
    }
}
