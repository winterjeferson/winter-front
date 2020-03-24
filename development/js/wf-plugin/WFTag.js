class WfTag {
    constructor() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$tagBt = document.querySelectorAll('.tag-item-bt');
    }

    build() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        if (this.$tagBt.length < 1) {
            return;
        }

        this.buildClick();
    }

    buildClick() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        Array.prototype.forEach.call(this.$tagBt, function (item) {
            let $bt = item.querySelector('.tag-bt');

            $bt.addEventListener('click', function () {
                $bt.parentNode.parentNode.parentNode.removeChild($bt.parentNode.parentNode);
            });
        });
    }
}