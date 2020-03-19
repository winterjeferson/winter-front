class WfLoading {
    constructor() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$loadingMain = document.getElementById('loading_main');
        this.$body = document.querySelector('body');
    }

    finish() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$loadingMain.classList.add('loading-main-done');
        this.$body.classList.remove('overflow-hidden');
        setTimeout(this.remove(this.$loadingMain), 1000);
    }

    remove(element) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        element.parentNode.removeChild(element);
    }
}