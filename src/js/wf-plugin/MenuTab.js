export class MenuTab {
    constructor() {
        this.cssMenu = 'tab';
        this.cssMenuActive = `${this.cssMenu}--active`;
        this.cssAllButton = `.${this.cssMenu} > .button, .${this.cssMenu} > .drop-down > .button`;
    }

    buildClick() {
        const el = document.querySelectorAll(this.cssAllButton);

        el.forEach((item) => {
            item.addEventListener('click', () => {
                this.buildCss(item);
            });
        });
    }

    buildCss(item) {
        const elTab = item.parentNode.classList.contains(this.cssMenu) ? item.parentNode : item.parentNode.parentNode;
        const elButton = elTab.querySelectorAll(this.cssAllButton);

        elButton.forEach((item) => {
            item.classList.remove(this.cssMenuActive);
        });
        item.classList.add(this.cssMenuActive);
    }

    init() {
        this.el = document.querySelectorAll(`.${this.cssMenu}`);

        if (!this.el) return;
        this.buildClick();
    }
}