class WFTag {
    constructor() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$tagBt = document.querySelectorAll('.tag-item-bt');
    }

    build() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        if (this.$tagBt.length < 1) {
            return;
        }

        this.buildClick();
    }

    buildClick() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        Array.prototype.forEach.call(this.$tagBt, function (item) {
            let $bt = item.querySelector('.tag-bt');

            $bt.addEventListener('click', function () {
                $bt.parentNode.parentNode.parentNode.removeChild($bt.parentNode.parentNode);
            });
        });
    }
}