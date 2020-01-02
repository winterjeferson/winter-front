class FrameworkMenuDropDown {

    buildStyle() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let $menuDropDown = $('.menu-drop-down, .menu-drop-down-text').find('ul');

        $menuDropDown.find('li').find('ul').each(function () {
            if ($(this).find('li').find('.link').length) {
                $(this).parent().parent().parent().addClass('menu-drop-down-text');
            } else
            if ($(this).find('li').find('.bt').length) {
                $(this).parent().parent().parent().addClass('menu-drop-down');
            }
        });

        $menuDropDown.children('li').children('ul').each(function () {
            if ($(this).parent('li').children('.bt, .link').find('.bt-arrow').length !== 1) {
                $(this).parent('li').children('.bt, .link').append('<span class="bt-arrow">&nbsp;&nbsp;<i class="fa fa-caret-down" aria-hidden="true"></i></span>');
            }
        });
    }

    buildMenu() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let classString = 'mobile-show';
        let $menuDropDown = $('.menu-drop-down, .menu-drop-down-text').find('ul');

        $('.mobile-show').css('opacity', 0);
        $menuDropDown.find('ul').removeClass(classString);
        $menuDropDown.find('.bt, .link').removeClass('active');

        $menuDropDown.find('.bt, .link').on('click', function () {
            let $menuChild = $(this).siblings('ul');

            $menuDropDown.find('ul').removeClass(classString);
            $menuDropDown.find('.bt, .link').removeClass('active');
            $(this).addClass('active');
            $('.mobile-show').css('opacity', 0);

            if ($menuChild.hasClass(classString)) {
                $menuChild.removeClass(classString);
            } else {
                $menuChild.addClass(classString);
            }

            event.stopPropagation();
        });

        $menuDropDown.find('li').find('.bt, .link').on('click', function () {
            $(this).parent().parent().removeClass(classString);
            $('.mobile-show').css('opacity', 1);
        });
    }
}