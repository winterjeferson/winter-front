class FrameworkManagement {
    verifyLoad() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        objFrameworkTranslation.defineLanguege();
        this.applyClass();
    }

    applyClass() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        // objFrameworkLayout.buildLayout();
        objFrameworkProgress.build();
        objFrameworkLayout.build();
        objFrameworkForm.build();
        objFrameworkModal.build();
        objFrameworkCarousel.build();
        objFrameworkMenuDropDown.build();
        objFrameworkMenuTab.build();
        objFrameworkNotification.build();
        objFrameworkTable.build();
        objFrameworkTag.build();
        objFrameworkTooltip.build();
    }
}