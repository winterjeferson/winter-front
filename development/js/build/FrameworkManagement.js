class FrameworkManagement {
    verifyLoad() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        objFrameworkTranslation.defineLanguege();
        this.applyClass();
    }

    applyClass() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        // objFrameworkLayout.buildLayout();
        objFrameworkLayout.buildToggle();

        objFrameworkForm.buildFocus();
        objFrameworkForm.buildInputFile();
        objFrameworkForm.buildMask();

        objFrameworkModal.buildHtml();
        objFrameworkModal.buildMenu();
        objFrameworkModal.buildTranslation();

        objFrameworkCarousel.build();

        objFrameworkMenuDropDown.build();

        objFrameworkMenuTab.defineActive();

        objFrameworkNotification.buildHtml();
        objFrameworkNotification.buildNavigation();

        objFrameworkTable.buildTableResponsive();

        objFrameworkTag.buildNavigation();

        objFrameworkTooltip.start();
        objFrameworkProgress.start();
    }
}