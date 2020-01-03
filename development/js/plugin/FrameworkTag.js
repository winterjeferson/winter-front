class FrameworkTag {
    buildNavigation() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        $('.tag-item-bt').find('.tag-bt').each(function () {
            $(this).on('click', function () {
                $(this).parent().parent().parent().remove();
            });
        });
    }
}