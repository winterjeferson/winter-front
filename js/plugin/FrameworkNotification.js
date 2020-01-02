class FrameworkNotification {
    constructor() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$body = $('body');
        this.$notify = '';
        this.$notifyItem = $('.notify-item');
        this.notifyId = 0;
    }

    buildHtml() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let concat = '';

        concat += '<div id="notify">';
        concat += '    <ul class="notify-list">';
        concat += '    </ul>';
        concat += '</div>';

        this.$body.prepend(concat);
        this.$notify = $('#notify').find('.notify-list');
    }

    buildNavigation() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$notifyItem.find('.bt').each(function () {
            $(this).on('click', function () {
                $(this).parent().parent().remove();
            });
        });
    }

    addNotification(message, style, place) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), [message, style, place]); /*endRemoveIf(production)*/
        let newPlace = place;
        let newStyle = style;

        if (objFrameworkLayout.verifyUndefined(newPlace)) {
            newPlace = this.$notify;
        }

        if (objFrameworkLayout.verifyUndefined(newStyle)) {
            newStyle = 'grey';
        }

        if (newPlace.length >= 1) {
            this.addNotificationBuildListItem(message, newStyle, newPlace);
        } else {
            this.addNotificationBuildListItem(message, newStyle, newPlace);
        }
    }

    addNotificationBuildListItem(message, style, place) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), [message, style, place]); /*endRemoveIf(production)*/
        let concat = '';
        let newPlace = '';

        if (objFrameworkLayout.verifyUndefined(message)) {
            return false;
        }

        if (place !== this.$notify) {
            newPlace = $(place);


            if (newPlace.children('.notify-list').length < 1) {
                newPlace.append('<ul class="notify-list"></ul>');
            }
        }

        concat += '<li id="notify_' + this.notifyId + '">';
        concat += '     <div class="notify-item notify-' + style + '">';
        concat += '         <span class="text">';
        concat += message;
        concat += '         </span>';
        concat += '         <button type="button" class="bt" onclick="$(this).parent().parent().remove();" aria-label="' + objFrameworkTranslation.translation.default.close + '">';
        concat += '            <span class="fa fa-times" aria-hidden="true"></span>';
        concat += '         </button>';
        concat += '     </div>';
        concat += '</li>';

        if (place !== this.$notify) {
            newPlace.children('.notify-list').prepend(concat);
        } else {
            place.append(concat);
        }

        this.removeNotifyListItem('#notify_' + this.notifyId, message.length);
        this.notifyId++;
    }

    removeNotifyListItem(item, messageLength) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), [item, messageLength]); /*endRemoveIf(production)*/
        let myVar;
        let messageTime = messageLength * 150;

        myVar = setTimeout(remove, messageTime);

        function remove() {
            $(item).remove();
        }
    }
}
