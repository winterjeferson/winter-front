export class MenuDropDown {
    update() {
        this.isClickBuild = false;
        this.classMenu = 'drop-down';
        this.classMenuText = `${this.classMenu}-text`;
        this.cssDropDownContent = `${this.classMenu}__content`;
        this.cssOpend = `${this.cssDropDownContent}--opened`;
        this.cssMobileShow = 'mobile-show';
        this.elMenu = document.querySelectorAll(`.${this.classMenu}, .${this.classMenuText}`);

        this.addClickAction = this.addClickAction.bind(this);
        this.close = this.close.bind(this);
    }

    addClick() {
        this.elMenu.forEach((item) => {
            const elButton = item.querySelectorAll('.button:first-child, .link:first-child')[0];

            wfpHelper.addClick(elButton, this.addClickAction);
        });
    }

    addClickAction(item) {
        const elContent = item.target.parentNode.querySelector(`.${this.cssDropDownContent}`);

        if (elContent === null) return;
        wfpHelper.addClass(elContent, this.cssOpend);
    }

    close() {
        const self = window.wfpMenuDropDown;

        if (self.elMenu === typeof 'undefined') return;

        self.elMenu.forEach((item) => {
            const elContent = item.querySelector(`.${self.cssDropDownContent}`);

            if (elContent === null) return;
            wfpHelper.removeClass(elContent, this.cssOpend);
        });
    }

    init() {
        this.update();

        if (!this.elMenu) return;

        if (!this.isClickBuild) {
            this.isClickBuild = true;
            this.addClick();
        }

        document.addEventListener('click', this.close, true);
    }

    listener(event) {
        const el = document.querySelectorAll(`.${window.wfpMenuDropDown.cssMobileShow}`);

        if (
            event.toElement.classList.contains('button') ||
            event.toElement.classList.contains('link')
        ) return;

        el.forEach((item) => {
            wfpHelper.removeClass(item, window.wfpMenuDropDown.cssMobileShow);
        });
    }

    reset() {
        console.log('aqui');
        document.removeEventListener('click', this.listener, true);
        window.wfpMenuDropDown.init();
    }
}