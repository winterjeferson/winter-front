class FrameworkTable {
    build() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        $('.table').each(function () {
            $(this).wrap('<div class="table-responsive"></div>');
        });
    }
}
