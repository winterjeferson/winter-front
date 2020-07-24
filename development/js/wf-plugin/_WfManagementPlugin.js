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

/*removeIf(production)*/
const objWfDebug = new WfDebug();
/*endRemoveIf(production)*/
const objWfManagementPlugin = new WfManagementPlugin();

const objWfCarousel = new WfCarousel();
const objWfForm = new WfForm();
const objWfLayout = new WfLayout();
const objWfLazyLoad = new WfLazyLoad();
const objWfMask = new WfMask();
const objWfMenuDropDown = new WfMenuDropDown();
const objWfMenuTab = new WfMenuTab();
const objWfMenuToggle = new WfMenuToggle();
const objWfModal = new WfModal();
const objWfNotification = new WfNotification();
const objWfProgress = new WfProgress();
const objWfTable = new WfTable();
const objWfTag = new WfTag();
const objWfTooltip = new WfTooltip();
const objWfTranslation = new WfTranslation();

objWfManagementPlugin.verifyLoad();