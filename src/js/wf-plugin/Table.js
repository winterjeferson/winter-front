export class Table {
    constructor() {
        this.elTable = document.querySelectorAll('.table');
        this.cssResponsive = 'table-responsive';
        this.colorSeparator = '--';
    }

    build() {
        this.elTable.forEach((item) => {
            helper.wrapItem(item, this.cssResponsive);
            const elParent = item.parentNode.parentNode.querySelector(`.${this.cssResponsive}`);
            const color = this.getTableColor(item);

            helper.addClass(elParent, 'scrollbar');
            helper.addClass(elParent, `scrollbar--${color}`);
            helper.wrapItem(elParent, `wrapper-${this.cssResponsive}`);
        });
    }

    init() {
        if (!this.elTable) return;

        this.build();
    }

    getTableColor(target) {
        const css = target.classList;
        let color = '';

        css.forEach((item) => {
            const isColor = item.includes(this.colorSeparator);

            if (isColor) {
                color = item.split(this.colorSeparator)[1];
            }
        });
        return color;
    }
}