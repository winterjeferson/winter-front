class MenuToggle {
    constructor() {
        /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName()); /*endRemoveIf(production)*/
    }

    build() {
       /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName()); /*endRemoveIf(production)*/
        this.updateVariable();
        this.buildBt();
        this.watchResize();
    }

    updateVariable() {
       /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$bt = document.querySelectorAll('.bt-toggle');
    }

    buildBt() {
       /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName()); /*endRemoveIf(production)*/
        Array.prototype.forEach.call(this.$bt, function (el, i) {
            el.onclick = function () {
                let $ul1 = el.parentNode.querySelector('nav > ul');
                let $ulAll = el.parentNode.querySelector('nav ul');
                let classDisplay = 'mobile-show';

                if ($ul1.classList.contains(classDisplay)) {
                    $ul1.classList.remove(classDisplay);
                    $ulAll.classList.remove(classDisplay);
                } else {
                    $ul1.classList.add(classDisplay);
                }
            }
        });
    }

    watchResize() {
       /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        window.onresize = function () {
            self.build();
        };
    }

    reset() {
       /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName()); /*endRemoveIf(production)*/
        this.build();
    }
}
