class FrameworkMenuDropDown {
    constructor() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.classMenu = 'menu-drop-down';
        this.classArrow = 'bt-arrow';
        this.classMenuText = this.classMenu + '-text';
        this.classShowMobile = 'mobile-show';

        this.$menuDropDown = document.querySelectorAll('.' + this.classMenu);
        this.$menuDropDownUl = document.querySelectorAll('.' + this.classMenu + ' ul');
        this.$menuDropDownLi = document.querySelectorAll('.' + this.classMenu + ' ul li');
        this.$menuDropDownText = document.querySelectorAll('.' + this.classMenuText);
        this.$menuDropDownTextUl = document.querySelectorAll('.' + this.classMenuText + ' ul');
        this.$menuDropDownTextLi = document.querySelectorAll('.' + this.classMenuText + ' ul li');
        this.$icon = '<span class="' + this.classArrow + '">&nbsp;&nbsp;<span class="fa fa-caret-down" aria-hidden="true"></span></span>';
    }

    build() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        if (this.$menuDropDown.length < 1 && this.$menuDropDownText.length < 1) {
            return;
        }

        this.buildIcon();
        this.buildClickButton();
        this.buildClickText();
        this.buildClickOut();
        this.fixOpening();
    }

    buildIcon() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;
        let $target = document.querySelectorAll('.' + this.classMenu + ' ul > li > ul' + ' , .' + this.classMenuText + ' ul > li > ul');

        Array.prototype.forEach.call($target, function (item) {
            if (!document.body.contains(item.parentNode.querySelector('.bt .' + self.classArrow + ' , .link .' + self.classArrow))) {
                item.parentNode.querySelector('.bt , .link').insertAdjacentHTML('beforeend', self.$icon);
            }
        });
    }

    buildClickButton() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        Array.prototype.forEach.call(this.$menuDropDown, function (item) {
            let $bt = item.querySelectorAll('li > .bt');
            let $btSubMenu = item.querySelectorAll('ul > li > ul > li > .bt');

            Array.prototype.forEach.call($bt, function (item) {
                item.addEventListener('click', function () {
                    let $menuChild = item.parentNode.querySelector('ul');

                    if (!document.body.contains($menuChild)) {
                        return;
                    }

                    let $menuDropDown = $menuChild.parentNode.parentNode.parentNode;
                    let $menuDropDownUl = $menuDropDown.querySelector('ul > li > ul');

                    if ($menuDropDownUl.classList.contains(self.classShowMobile)) {
                        $menuDropDownUl.classList.remove(self.classShowMobile);
                    }

                    if ($menuChild.classList.contains(self.classShowMobile)) {
                        $menuChild.classList.remove(self.classShowMobile);
                    } else {
                        $menuChild.classList.add(self.classShowMobile);
                    }
                });
            });

            Array.prototype.forEach.call($btSubMenu, function (item) {
                item.addEventListener('click', function () {
                    item.parentNode.parentNode.classList.remove(self.classShowMobile);
                });
            });
        });
    }

    buildClickText() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        Array.prototype.forEach.call(this.$menuDropDownText, function (item) {
            let $bt = item.querySelectorAll('li > .link');
            let $btSubMenu = item.querySelectorAll('ul > li > ul > li > .link');

            Array.prototype.forEach.call($bt, function (item) {
                item.addEventListener('click', function () {
                    let $menuChild = item.parentNode.querySelector('ul');

                    if (!document.body.contains($menuChild)) {
                        return;
                    }

                    let $menuDropDown = $menuChild.parentNode.parentNode.parentNode;
                    let $menuDropDownUl = $menuDropDown.querySelector('ul > li > ul');

                    if ($menuDropDownUl.classList.contains(self.classShowMobile)) {
                        $menuDropDownUl.classList.remove(self.classShowMobile);
                    }

                    if ($menuChild.classList.contains(self.classShowMobile)) {
                        $menuChild.classList.remove(self.classShowMobile);
                    } else {
                        $menuChild.classList.add(self.classShowMobile);
                    }
                });
            });

            Array.prototype.forEach.call($btSubMenu, function (item) {
                item.addEventListener('click', function () {
                    item.parentNode.parentNode.classList.remove(self.classShowMobile);
                });
            });
        });
    }

    buildClickOut() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        Array.prototype.forEach.call(this.$menuDropDownUl, function (item) {
            let bt = item.querySelectorAll('.bt, .link');

            item.classList.remove(self.classShowMobile);

            Array.prototype.forEach.call(bt, function (itemBt) {
                if (itemBt.classList.contains('active')) {
                    itemBt.classList.remove('active');
                }
            });
        });

        Array.prototype.forEach.call(this.$menuDropDownTextUl, function (item) {
            let bt = item.querySelectorAll('.link');

            item.classList.remove(self.classShowMobile);

            Array.prototype.forEach.call(bt, function (itemBt) {
                if (itemBt.classList.contains('active')) {
                    itemBt.classList.remove('active');
                }
            });
        });
    }

    fixOpening() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        Array.prototype.forEach.call(this.$menuDropDownLi, function (item) {
            item.querySelector('.bt').onclick = function () {
                let target = item.parentNode.parentNode.querySelector('ul');

                target.classList.remove(self.classShowMobile);
                target.style.opacity = 1;
            }
        });
    }
}