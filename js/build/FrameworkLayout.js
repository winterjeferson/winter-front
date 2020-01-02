class FrameworkLayout {
    constructor() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$loadingMain = $('#loading_main');
        this.$body = $('body');
        this.$window = $(window);

        this.breakPointExtraSmall = 0;
        this.breakPointSmall = 576;
        this.breakPointMedium = 768;
        this.breakPointBig = 992;
        this.breakPointExtraBig = 1200;
    }

    buildLayout() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        $('button, a').on('click', function (event) {
            event.stopPropagation();
        });
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

        switch (action) {
            case 'show':
                $(target).removeClass(classDisplay);
                break;
            case 'hide':
                $(target).addClass(classDisplay);
                break;
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
        $('.bt-toggle').each(function () {
            $(this).unbind();

            $(this).on('click', function () {
                let $nav = $(this).siblings('nav').find(' > ul');
                let $navAll = $(this).siblings('nav').find('ul');
                let $class = 'mobile-show';

                if ($nav.hasClass($class)) {
                    $nav.removeClass($class);
                    $navAll.removeClass($class);
                } else {
                    $nav.addClass($class);
                }
            });
        });
    }

    getUrlParameter(target) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), target); /*endRemoveIf(production)*/
        let url = top.location.search.substring(1);
        let parameter = url.split('&');

        for (let i = 0; i < parameter.length; i++) {
            let parameterName = parameter[i].split('=');

            if (parameterName[0] === target) {
                return parameterName[1];
            }
        }
    }

    verifyHasFodler(target) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), target); /*endRemoveIf(production)*/
        let arrFolder = window.location.pathname.split('/');

        if (arrFolder.indexOf(target) > -1) {
            return true;
        } else {
            return false;
        }
    }

    verifyUndefined(target) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), target); /*endRemoveIf(production)*/
        if (typeof target === 'undefined' || target === null || target === '') {
            return true;
        } else {
            return false;
        }
    }
}