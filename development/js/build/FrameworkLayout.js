class FrameworkLayout {
    constructor() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$body = document.querySelector('body');
        // this.$window = document.querySelector('window');

        this.breakPointExtraSmall = 0;
        this.breakPointSmall = 576;
        this.breakPointMedium = 768;
        this.breakPointBig = 992;
        this.breakPointExtraBig = 1200;
    }
    
    build() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.buildToggle();
    }
    
    switchDisplay(target, action = '') {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), [target, action]); /*endRemoveIf(production)*/
        let classDisplay = 'display-none';

        if (action === '') {
            if (target.hasClass(classDisplay)) {
                action = 'show';
            } else {
                action = 'hide';
            }
        }

        if (action === 'show') {
            $(target).removeClass(classDisplay);
        } else {
            $(target).addClass(classDisplay);
        }
    }

    buildSpinner(style) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), style); /*endRemoveIf(production)*/
        let spinner = '';

        spinner += '<div class="row text-center">';
        spinner += '    <div class="col-es-12">';
        spinner += '        <span class="fa fa-circle-o-notch fa-spin fa-2x color-' + style + '"></span>';
        spinner += '    </div>';
        spinner += '</div>';

        return spinner;
    }

    buildToggle() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let element = document.querySelectorAll('.bt-toggle');

        Array.prototype.forEach.call(element, function (el, i) {
            el.onclick = function () {
                let $ul1 = el.parentNode.querySelector('nav > ul');
                let $ulAll = el.parentNode.querySelector('nav ul');
                let classDisplay = 'mobile-show';

                if ($ul1.classList.contains(classDisplay)) {
                    $ul1.classList.remove(classDisplay);
                    $ulAll.classList.remove(classDisplay);
                } else {
                    $ul1.classList.add(classDisplay);
                }
            }
        });
    }
}