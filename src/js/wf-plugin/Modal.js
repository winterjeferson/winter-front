export class Modal {
    constructor() {
        this.isModalOpen = false;

        this.cssHide = 'hide';
        this.cssClose = 'modal--close';
        this.cssScrollbar = 'scrollbar scrollbar--grey';

        this.elBody = document.querySelector('body');
    }

    buildHtml() {
        const string = `
            <div class="modal ${this.cssClose} ${this.cssScrollbar}">
                <div class="modal__box">
                    <header class="modal__header right">
                        <button type="button" aria-label="${window.translation.translation.close}" class="button button--small button--small--proportional button--grey button--transparent button--close">
                            <svg class="icon icon--regular rotate-45">
                                <use xlink:href="./assets/img/icon.svg#plus"></use>
                            </svg>
                        </button>
                    </header>
                    <div class="row">
                        <div class="modal__content"></div>
                    </div>
                    <div class="navigation-change button-wrapper row center ${this.cssHide}">
                        <button type="button" class="button button--big" data-id="previous" aria-label="${window.translation.translation.previous}" >
                            <svg class="icon icon--extra-big icon--white">
                                <use xlink:href="./assets/img/icon.svg#previous"></use>
                            </svg>
                        </button>
                        <button type="button" class="button button--big" data-id="next" aria-label="${window.translation.translation.next}" >
                            <svg class="icon icon--extra-big icon--white rotate-180">
                                <use xlink:href="./assets/img/icon.svg#previous"></use>
                            </svg>
                        </button>
                    </div>
                    <footer class="button-wrapper modal__footer center ${this.cssHide}">
                        <button type="button" class="button button--regular button--green" data-id="confirm"></button>
                        <button type="button" class="button button--regular button--grey" data-id="cancel"></button>
                    </footer>
                </div>
            </div>
        `;

        this.elBody.insertAdjacentHTML('afterbegin', string);
    }

    buildKeyboard() {
        window.addEventListener('keyup', (event) => {
            const key = event.key;

            if (key === 'Escape') this.buildKeyboardEscape();
            if (key === 'ArrowLeft') this.buildKeyboardArrowLeft();
            if (key === 'ArrowRight') this.buildKeyboardArrowRight();
        });
    }

    buildKeyboardEscape() {
        if (this.isModalOpen) this.closeModal();
    }

    buildKeyboardArrowLeft() {
        if (!this.isModalOpen) return;
        if (this.elModalNavigationArrowLeft.classList.contains(this.cssHide)) return;
        this.elModalNavigationArrowLeft.click();
    }

    buildKeyboardArrowRight() {
        if (!this.isModalOpen) return;
        if (this.elModalNavigationArrowRight.classList.contains(this.cssHide)) return;
        this.elModalNavigationArrowRight.click();
    }

    buildMenuGallery() {
        if (!this.elGallery) return;

        this.elGallery.forEach((item) => {
            const elButton = item.querySelectorAll('a');

            elButton.forEach((target) => {
                this.buildMenuGalleryButton(target);
            });
        });

        helper.addClick(this.elModalNavigationArrowLeft, this.handleClickArrowLeft.bind(this));
        helper.addClick(this.elModalNavigationArrowRight, this.handleClickArrowRight.bind(this));
    }

    buildMenuGalleryButton(target) {
        target.addEventListener('click', event => {
            const href = target.getAttribute('href');
            const description = target.querySelector('img').getAttribute('data-description');

            event.preventDefault();
            this.buildModal('gallery', false, 'full');
            this.buildGalleryImage(href, description);
            this.buildGalleryNavigation(target);
        });
    }

    buildMenu() {
        const elButtonCancel = this.elModalFooter.querySelector('[data-id="cancel"]');

        helper.addClick(this.elModalClose, this.closeModal.bind(this));
        helper.addClick(elButtonCancel, this.closeModal.bind(this));
    }

    buildGalleryNavigation(target) {
        const currentGallery = target.parentNode.parentNode;
        const elGallery = currentGallery.querySelectorAll('a');
        const siblingLength = elGallery.length - 1;
        let array = [];

        elGallery.forEach((item) => {
            array.push(item);
        });

        if (siblingLength > 0) {
            this.buildGalleryNavigationShow({
                array,
                target,
                siblingLength
            });

            return;
        }

        this.elModalNavigationArrow.classList.add(this.cssHide);
    }

    buildGalleryNavigationShow(obj) {
        const currentPosition = obj.array.indexOf(obj.target);

        this.elModalNavigationArrow.classList.remove(this.cssHide);
        this.targetBuildGalleryChange = obj.target;

        if (currentPosition <= 0) {
            this.elModalNavigationArrowLeft.classList.add(this.cssHide);
        } else {
            this.elModalNavigationArrowLeft.classList.remove(this.cssHide);
        }

        if (currentPosition >= obj.siblingLength) {
            this.elModalNavigationArrowRight.classList.add(this.cssHide);
        } else {
            this.elModalNavigationArrowRight.classList.remove(this.cssHide);
        }
    }

    buildModal(obj) {
        this.elModalFooter.classList.add(this.cssHide);
        typeof obj.action === 'undefined' ? this.openModal() : this.closeModal();
        typeof obj.click !== 'undefined' ? this.buildContentConfirmationAction(obj.click) : '';
        typeof obj.confirmText !== 'undefined' ? this.elModalFooterConfirm.innerHTML = obj.confirmText : this.translate();
        this.buildModalSize(obj.size);
        this.buildModalKind(obj);
    }

    buildModalKind(obj) {
        if (obj.kind === 'ajax') this.buildContentAjax(obj.content);
        if (obj.kind === 'confirmation') this.buildContentConfirmation(obj.content);
        if (obj.kind === 'gallery') {
            this.elModalNavigationArrow.classList.remove('hide');
            return;
        }

        this.elModalNavigationArrow.classList.add('hide');
    }

    buildModalSize(size = 'regular') {
        const prefix = 'modal--';
        const arr = ['extra-small', 'small', 'regular', 'big', 'extra-big', 'full'];

        arr.forEach((item) => {
            this.elModalBox.classList.remove(`${prefix}${item}`);
        });

        this.elModalBox.classList.add(`${prefix}${size}`);
    }

    buildContentAjax(target) {
        const self = this;
        let ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function () {
            if (!this.readyState === 4 && this.status === 200) return;

            self.buildContentAjaxSuccess(this.responseText);
        };

        ajax.open('GET', target, true);
        ajax.send();
    }

    buildContentAjaxSuccess(data) {
        this.elModalContent.innerHTML = data;
        this.resetOtherClass();
    }

    buildGalleryImage(image, description) {
        const html = `<img src="${image}" class="img-responsive" style="margin:auto;" title="" alt=""/>`;

        this.elModalContent.innerHTML = html;
        this.changeText(description);
    }

    buildContentConfirmation(content) {
        const html = `<div class="center">${content}</div>`;

        this.elModalFooter.classList.remove(this.cssHide);
        this.elModalContent.innerHTML = html;
    }

    buildContentConfirmationAction(action) {
        this.elModalFooterConfirm.setAttribute('onclick', action);
    }

    changeText(description) {
        const html = `<p class="modal__description">${description}</p>`;

        if (description === '' || description === null) return;
        this.elModalContent.insertAdjacentHTML('beforeend', html);
    }

    closeModal() {
        this.isModalOpen = false;
        this.elBody.classList.add('overflow-y');
        this.elBody.classList.remove('overflow-hidden');
        this.elBody.style.overflowY = 'auto';
        this.elBody.style.position = 'relative';
        this.elModal.classList.add(this.cssClose);
        this.elModalBox.classList.remove('modal-animate');
        this.resetOtherClass();
    }

    init() {
        this.buildHtml();
        this.update();
        this.buildMenu();
        this.buildMenuGallery();
        this.buildKeyboard();
        this.translate();
    }

    handleClickArrowLeft() {
        this.targetBuildGalleryChange.previousElementSibling.click();
    }

    handleClickArrowRight() {
        this.targetBuildGalleryChange.nextElementSibling.click();
    }

    openModal() {
        this.isModalOpen = true;
        this.elBody.classList.remove('overflow-y');
        this.elBody.classList.add('overflow-hidden');
        this.elBody.style.overflowY = 'hidden';
        this.elModal.classList.remove(this.cssClose);
        this.elModalBox.classList.add('modal-animate');
    }

    resetOtherClass() {
        if (typeof menuDropDown !== 'undefined') menuDropDown.reset();
        if (typeof menuToggle !== 'undefined') menuToggle.init();
        if (typeof menuTab !== 'undefined') menuTab.init();
        if (typeof lazyLoad !== 'undefined') lazyLoad.init();
    }

    translate() {
        this.elModalFooterConfirm.innerHTML = translation.translation.confirm;
        this.elModalFooterCancel.innerHTML = translation.translation.cancel;
    }

    update() {
        this.targetBuildGalleryChange = '';
        this.elModal = document.querySelector('.modal');
        this.elModalFooter = this.elModal.querySelector('footer');
        this.elModalFooterConfirm = this.elModalFooter.querySelector('[data-id="confirm"]');
        this.elModalFooterCancel = this.elModalFooter.querySelector('[data-id="cancel"]');
        this.elModalClose = document.querySelector('.modal__header .button--close');
        this.elModalContent = document.querySelector('.modal__content');
        this.elModalBox = this.elModal.querySelector('.modal__box');
        this.elModalNavigationArrow = this.elModal.querySelector('.navigation-change');
        this.elModalNavigationArrowLeft = this.elModalNavigationArrow.querySelector('[data-id="previous"]');
        this.elModalNavigationArrowRight = this.elModalNavigationArrow.querySelector('[data-id="next"]');
        this.elGallery = document.querySelectorAll('.gallery');
    }
}