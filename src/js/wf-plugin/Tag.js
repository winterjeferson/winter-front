export class Tag {
    constructor() {
        this.elTag = document.querySelectorAll('.tag');
        this.addClick = this.addClick.bind(this);
    }

    addClick(target) {
        target.addEventListener('click', () => {
            target.parentNode.parentNode.removeChild(target.parentNode);
        });
    }

    buildClick() {
        this.elTag.forEach((item) => {
            const button = item.querySelector('.button__close');

            if (!button) return;
            this.addClick(button);
        });
    }

    init() {
        if (!this.elTag) return;

        this.buildClick();
    }
}