class FrameworkMenuTab {
    defineActive() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let activeClass = 'menu-tab-active';

        $('.menu-tab').children('ul').children('li').children('.bt').on('click', function () {
            $(this).parent().parent().find('li').removeClass(activeClass);
            $(this).parent().addClass(activeClass);
        });
    }
}