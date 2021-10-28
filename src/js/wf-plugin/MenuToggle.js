export class MenuToggle {
    constructor() {
        this.classButton = 'toggle-menu';
        this.isWatch = false;
        this.addClick = this.addClick.bind(this);
    }

    addClick(args) {
        const attribute = 'style';
        const sibling = args.target.nextElementSibling;
        const isStyle = sibling.hasAttribute(attribute);

        if (isStyle) {
            sibling.removeAttribute(attribute);
            return;
        }

        sibling.style.display = 'flex';
    }

    buildMenu() {
        this.elButton.forEach((el) => {
            helper.addClick(el, this.addClick);
        });
    }

    init() {
        this.update();
        this.buildMenu();

        if (!this.isWatch) {
            this.isWatch = true;
            this.watchResize();
        }
    }

    update() {
        this.elButton = document.querySelectorAll(`.${this.classButton}`);
    }

    reset() {
        this.init();
    }

    watchResize() {
        window.onresize = () => {
            this.init();
        };
    }
}