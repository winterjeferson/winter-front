class Loading {
    constructor() {
        /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$loadingMain = document.getElementById('loading_main');
        this.$body = document.querySelector('body');
    }

    finish() {
        /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$loadingMain.classList.add('loading-main-done');
        this.$body.classList.remove('overflow-hidden');
        setTimeout(this.remove(this.$loadingMain), 1000);
    }

    remove(element) {
        /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName()); /*endRemoveIf(production)*/
        element.parentNode.removeChild(element);
    }
}