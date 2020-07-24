class WfForm {
    build() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        if (document.querySelectorAll('form').length < 1) {
            return;
        }

        this.buildKeyboard();
        this.buildInputFile();
    }

    buildKeyboard() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        window.addEventListener('keyup', function (event) {
            if (event.keyCode === 13) {
                self.buildFocus('.radio');
                self.buildFocus('.checkbox');
                self.buildFocus('.input-switch');
            }
        });
    }

    buildFocus(target) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let $arr = document.querySelectorAll(target);

        Array.prototype.forEach.call($arr, function (item) {
            let target = item.querySelector('input');

            if (document.activeElement == item) {
                target.click();
            }
        });
    }

    buildInputFile() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        Array.prototype.forEach.call(document.querySelectorAll('input[type="file"]'), function (item) {
            let target = item.parentNode;

            if (item.getAttribute('style')) {
                if (item.getAttribute('style').indexOf('display:') != -1) {
                    return;
                }
            }

            item.style.display = 'none';
            target.insertAdjacentHTML('beforeend', self.buildInputFileHtml());
            target.setAttribute('tabIndex', 0);
            target.style.outline = 0;

            if (document.activeElement == target) {
                target.querySelector('.input-file').classList.add('focus');
            }

            item.addEventListener('focusout', function () {
                target.querySelector('.input-file').classList.remove('focus');
            });

            self.buildInputFileAddAction(item);
        });
    }

    buildInputFileAddAction(item) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let $target = item.parentNode;
        let $targetFileClass = $target.querySelector('.input-file-name');
        let $targetFile = $target.querySelector('input[type="file"]');

        $target.addEventListener('click', function () {
            $targetFile.click();
        });

        $targetFile.addEventListener('change', function () {
            $targetFileClass.innerHTML = $targetFile.value;
        });
    }

    buildInputFileHtml() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let inputFile = '';
        let textFile = objWfTranslation.translation.input_upload;

        inputFile += '<div class="input-file">';
        inputFile += '    <div class="input-file-name"></div>';
        inputFile += '    <div class="input-file-text"><span class="fa fa-upload" aria-hidden="true"></span>&nbsp; ' + textFile + '</div>';
        inputFile += '</div>';

        return inputFile;
    }

    validateEmpty(arr) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let arrEmpty = arr;
        let length = arrEmpty.length;

        for (let i = 0; i < length; i++) {
            if (arrEmpty[i].value === '') {
                arrEmpty[i].focus();
                return false;
            }
        }

        return true;
    }
}