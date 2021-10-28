export class Table {
    constructor() {
        this.elTable = document.querySelectorAll('.table');
        this.cssResponsive = 'table-responsive';
    }

    build() {
        this.elTable.forEach((item) => {
            helper.wrapItem(item, this.cssResponsive);

            const elParent = item.parentNode.parentNode.querySelector(`.${this.cssResponsive}`);
            helper.wrapItem(elParent, `wrapper-${this.cssResponsive}`);
        });
    }

    init() {
        if (!this.elTable) return;

        this.build();
    }
}