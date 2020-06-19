class WfManagementPlugin {
    verifyLoad() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        window.addEventListener('load', this.applyClass(), { once: true });
    }

    applyClass() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        objWfTranslation.build();
        objWfProgress.build();
        objWfForm.build();
        objWfMask.build();
        objWfModal.build();
        objWfCarousel.build();
        objWfLazyLoad.build();
        objWfMenuDropDown.build();
        objWfMenuTab.build();
        objWfMenuToggle.build();
        objWfNotification.build();
        objWfTable.build();
        objWfTag.build();
        objWfTooltip.build();
    }
}