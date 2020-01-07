class FrameworkManagement {
    verifyLoad() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        objFrameworkTranslation.defineLanguege();
        this.applyClass();
    }

    applyClass() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        objFrameworkLayout.buildLayout();
        objFrameworkLayout.buildToggle();

        objFrameworkForm.buildFocus();
        objFrameworkForm.buildInputFile();
        objFrameworkForm.buildMask();

        objFrameworkModal.buildHtml();
        objFrameworkModal.buildMenu();
        objFrameworkModal.buildTranslation();

        objFrameworkCarousel.buildCarousel();

        objFrameworkMenuDropDown.buildMenu();
        objFrameworkMenuDropDown.buildStyle();

        objFrameworkMenuTab.defineActive();

        objFrameworkNotification.buildHtml();
        objFrameworkNotification.buildNavigation();

        objFrameworkTable.buildTableResponsive();

        objFrameworkTag.buildNavigation();

        objFrameworkTooltip.start();
        objFrameworkProgress.start();
    }

    finishLoading() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        objFrameworkLayout.$loadingMain.addClass('loading-main-done');
        objFrameworkLayout.$body.removeClass('overflow-hidden');
        setTimeout(this.removeLoading, 1000);
    }

    removeLoading() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        objFrameworkLayout.$loadingMain.remove();
    }
}