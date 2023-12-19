export class Carousel {
    constructor() {
        this.attCurrentSlide = 'data-current-slide';
        this.attPrevious = '[data-id="previous"]';
        this.attNext = '[data-id="next"]';
        this.cssCarouselList = 'carousel__list';
        this.cssCarouselListItem = 'carousel__item';
        this.cssCarouselController = 'carousel__controller';
        this.cssButton = 'carousel__controller-button';
        this.cssButtonActive = `${this.cssButton}--active`;
        this.cssDisplay = 'hide';
        this.cssTransition = '.7s';
        this.elCarousel = document.querySelectorAll('.carousel');

        this.counterCurrent = 0;
        this.transition = 5;
        this.isAutoplay = true;
        this.interval = 1000;

        this.buildNavigationControllerClick = this.buildNavigationControllerClick.bind(this);
    }

    animate(obj) {
        const elCarouselList = obj.from === 'arrow' ?
            obj.target.parentNode.querySelector(`.${this.cssCarouselList}`) :
            obj.target.parentNode.parentNode.querySelector(`.${this.cssCarouselList}`);
        const elCarousel = elCarouselList.parentNode;
        const carouselStyle = elCarousel.getAttribute('data-style');
        const slideSize = Number(elCarouselList.querySelector(`.${this.cssCarouselListItem}`).offsetWidth);
        const currentSlide = obj.currentSlide;
        const currentPosition = Number(currentSlide * slideSize);

        if (carouselStyle === 'fade') {
            this.animateFade({
                elCarouselList,
                currentPosition,
                currentSlide,
            });
            return;
        }

        this.animateSlide({
            elCarouselList,
            currentPosition,
        });
    }

    animateFade(obj) {
        const el = obj.elCarouselList.querySelectorAll(`.${this.cssCarouselListItem}`);
        const elCurrent = el[obj.currentSlide];

        el.forEach((item) => {
            item.style.opacity = 0;
            item.style.transition = this.cssTransition;
        });

        elCurrent.style.opacity = 1;
        elCurrent.style.left = `-${obj.currentPosition}px`;
        elCurrent.style.transition = this.cssTransition;
    }

    animateSlide(obj) {
        obj.elCarouselList.style.transform = `translateX(-${obj.currentPosition}px)`;
    }

    buildAutoplay() {
        if (!this.isAutoplay) return;

        this.interval = setInterval(this.verifyInterval, this.interval);
        this.isAutoplay = false;
    }

    buildLayout() {
        this.elCarousel.forEach((item) => {
            const el = item.querySelectorAll(`.${this.cssCarouselList} .${this.cssCarouselListItem}`);
            const length = el.length;
            const autoplay = item.getAttribute('data-autoplay');
            const atributte = item.getAttribute(this.attCurrentSlide);
            const elImage = item.querySelectorAll('img');
            const isImage = elImage.length > 0;

            if (autoplay === 'true') this.buildAutoplay();
            this.resize(item);
            this.buildController(item, length);
            this.defineActive(item.querySelector(`[data-id="${atributte}"]`));
            if (length === 1) {
                item.querySelector(this.attPrevious).classList.add(this.cssDisplay);
                item.querySelector(this.attNext).classList.add(this.cssDisplay);
                item.querySelector(`.${this.cssCarouselController}`).classList.add(this.cssDisplay);
            }
            if (isImage) {
                const width = elImage[0].naturalWidth;

                item.style.maxWidth = `${width}px`;
            }
        });
    }

    buildController(target, length) {
        const css = `button button--small button--small--proportional ${this.cssButton}`;
        const elController = target.querySelector(`.${this.cssCarouselController}`);
        let html = '';

        for (let i = 0; i < length; i++) {
            html += `<button type="button"  class="${css}" data-id="${i}" aria-hidden="true"></button>`;
        }

        elController.innerHTML = html;
    }

    buildNavigation() {
        this.elCarousel.forEach((item) => {
            this.buildNavigationController(item);
            this.buildNavigationLeft(item);
            this.buildNavigationRight(item);
        });
    }

    buildNavigationController(target) {
        const elButton = target.querySelectorAll(`.${this.cssButton}`);

        elButton.forEach((item) => {
            helper.addClick(item, this.buildNavigationControllerClick);
        });
    }

    buildNavigationControllerClick(el) {
        const target = el.target;
        const dataId = el.target.getAttribute('data-id');
        const elCarousel = target.parentNode.parentNode;

        elCarousel.setAttribute(this.attCurrentSlide, dataId);

        this.defineActive(target);
        this.animate({
            'currentSlide': target.getAttribute('data-id'),
            'target': target,
            'from': 'navigation'
        });
    }

    buildNavigationArrow(obj) {
        obj.button.onclick = () => {
            const elCarousel = obj.button.parentNode.parentNode;
            const elCarouselList = elCarousel.querySelector(`.${this.cssCarouselList}`);
            const elCarouselListLength = Number(elCarouselList.querySelectorAll(`.${this.cssCarouselListItem}`).length);
            const currentSlide = Number(elCarousel.getAttribute(this.attCurrentSlide));
            let slide = 0;

            if (obj.side === 'previous') {
                slide = currentSlide === 0 ? elCarouselListLength - 1 : currentSlide - 1;
            } else {
                slide = currentSlide === (elCarouselListLength - 1) ? 0 : currentSlide + 1;
            }

            elCarousel.setAttribute(this.attCurrentSlide, slide);
            this.defineActive(elCarousel.querySelector(`[data-id="${slide}"]`));
            this.animate({
                'currentSlide': slide,
                'target': elCarouselList,
                'from': 'arrow'
            });
        };
    }

    buildNavigationLeft(target) {
        const button = target.querySelector(this.attPrevious);

        this.buildNavigationArrow({
            button,
            'side': 'previous'
        });
    }

    buildNavigationRight(target) {
        const button = target.querySelector(this.attNext);

        this.buildNavigationArrow({
            button,
            'side': 'next'
        });
    }

    defineActive(target) {
        const el = target.parentNode.parentNode.querySelectorAll(`.${this.cssButton}`);

        el.forEach((item) => {
            item.classList.remove(this.cssButtonActive);
        });

        target.classList.add(this.cssButtonActive);
    }

    init() {
        if (!this.elCarousel) return;

        this.buildLayout();
        this.buildNavigation();
        this.watchResize();
    }

    resize(target) {
        const elCarouselList = target.querySelector(`.${this.cssCarouselList}`);
        const elCarouselListItem = elCarouselList.querySelectorAll(`.${this.cssCarouselListItem}`);
        const length = elCarouselListItem.length;

        elCarouselList.style.width += `${length * 100}%`;
    }

    verifyInterval() {
        const self = window.carousel;

        self.counterCurrent++;

        if (self.counterCurrent >= self.transition) {
            self.counterCurrent = 0;

            self.elCarousel.forEach((item) => {
                const autoplay = item.getAttribute('data-autoplay');
                const elNext = item.querySelector(self.attNext);

                if (autoplay === 'true') elNext.click();
            });
        }
    }

    watchResize() {
        window.addEventListener('resize', () => {
            this.elCarousel.forEach((item) => {
                this.watchResizeLoop(item);
            });
        }, true);
    }

    watchResizeLoop(item) {
        const el = item.parentNode.parentNode.parentNode.parentNode;
        const elCarouselList = el.querySelector(`.${this.cssCarouselList}`);
        let newSlide = 0;

        this.defineActive(el.querySelector(`[data-id="${newSlide}"]`));
        this.animate({
            'currentSlide': newSlide,
            'target': elCarouselList,
            'from': 'arrow'
        });
    }
}
export class Form {
    validateEmpty(arr) {
        const length = arr.length;

        for (let i = 0; i < length; i++) {
            if (arr[i].value === '') {
                arr[i].focus();
                return false;
            }
        }

        return true;
    }
}
export class Helper {
    addClass(target, classCss) {
        if (!target || !classCss) return;

        if (classCss instanceof Array) {
            for (let i in classCss) {
                target.classList.add(classCss[i]);
            }

            return;
        }

        target.classList.add(classCss);
    }

    addClick(el, action) {
        if (!el) return;

        this.addEvent({
            el,
            action,
            event: 'click'
        });
    }

    addEvent(args) {
        const action = args.action;
        const el = args.el;
        const event = args.event;

        if (!el) return;

        el.removeEventListener(event, action);
        el.addEventListener(event, action);
    }

    ajax(obj) {
        return new Promise((resolve, reject) => {
            const kind = typeof obj.kind === 'undefined' ? 'POST' : obj.kind;
            let xhr = new XMLHttpRequest();

            xhr.open(kind, obj.controller, true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.statusText);
                }
            };
            xhr.onerror = () => reject(xhr.statusText);
        });
    }

    capitalize(target) {
        return target.charAt(0).toUpperCase() + target.slice(1);
    }

    getUrlParameter(target) {
        const url = top.location.search.substring(1);
        const parameter = url.split('&');

        for (let i = 0; i < parameter.length; i++) {
            let parameterName = parameter[i].split('=');

            if (parameterName[0] === target) {
                return parameterName[1];
            }
        }
    }

    getUrlWord(target) {
        return new RegExp('\\b' + target + '\\b', 'i').test(window.location.href);
    }

    offset(element) {
        let rect = element.getBoundingClientRect();
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const obj = {
            'top': rect.top + scrollTop,
            'left': rect.left + scrollLeft,
        };

        return obj;
    }

    removeClass(target, classCss) {
        if (!target || !classCss) return;

        if (classCss instanceof Array) {
            for (let i in classCss) {
                if (target.classList.contains(classCss[i])) {
                    target.classList.remove(classCss[i]);
                }
            }
            return;
        }

        if (target.classList.contains(classCss)) {
            target.classList.remove(classCss);
        }
    }

    verifyUrlRoute(target) {
        const arrFolder = window.location.pathname.split('/');

        if (arrFolder.indexOf(target) > -1) {
            return true;
        } else {
            return false;
        }
    }

    wrapItem(target, cssClass) {
        const wrapper = document.createElement('div');

        wrapper.className = cssClass;
        target.parentNode.insertBefore(wrapper, target);
        wrapper.appendChild(target);
    }
}
export class Layout {
    constructor() {
        this.breakPointSmartphone = 320;
        this.breakPointTablet = 768;
        this.breakPointTabletLandscape = 1024;
        this.breakPointNotebook = 1366;
        this.breakPointDesktop = 1600;
        this.breakPointFullHd = 1920;
    }
}
export class LazyLoad {
    constructor() {
        this.cssAttribute = 'data-lazy-load';
        this.cssData = `[${this.cssAttribute}="true"]`;
    }

    addListener() {
        const elBody = document.querySelector('body');

        elBody.addEventListener('scroll', () => {
            window.requestAnimationFrame(() => {
                this.buildLoop();
            });
        });
    }

    buildLoop() {
        const el = document.querySelectorAll(this.cssData);

        el.forEach((item) => {
            this.verifyPosition(item);
        });
    }

    buildImage(target) {
        const src = target.getAttribute('data-src');

        target.setAttribute('src', src);
        target.removeAttribute(this.cssAttribute);
    }

    init() {
        if (!document.querySelector(this.cssData)) return;

        this.addListener();
        this.buildLoop();
    }

    verifyPosition(target) {
        const windowScroll = window.scrollY;
        const elemntPosition = window.helper.offset(target).top;
        const margin = window.outerHeight;

        if (windowScroll >= elemntPosition - margin) this.buildImage(target);
    }
}
export class LoadingMain {
    constructor() {
        this.cssHide = 'hide';
        this.cssAnimation = 'animate';

        this.elWrapper = document.querySelector('.loading-main');
        if (!this.elWrapper) return;
        this.elLoading = this.elWrapper.querySelector('.loading');
        this.elBody = document.querySelector('body');
    }

    hide() {
        if (!this.elWrapper) return;
        this.elWrapper.classList.add(this.cssHide);
        this.elLoading.classList.remove(this.cssAnimation);
        this.elBody.style.overflow = 'auto';
    }
}
export class Mask {
    constructor() {
        this.elMask = document.querySelectorAll('[data-mask]');
    }

    addListener() {
        this.elMask.forEach((item) => {
            this.addListenerLoop(item);
        });
    }

    addListenerLoop(target) {
        target.addEventListener('input', (e) => {
            const inputValue = e.target.value;
            const inputMask = target.dataset.mask;
            const capitalized = helper.capitalize(inputMask);

            e.target.value = this[`mask${capitalized}`](inputValue);
        });
    }

    init() {
        if (!this.elMask) return;

        this.addListener();
    }

    maskCep(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1');
    }

    maskCpf(value) {
        return value
            .replace(/\D/g, '') //only numbers
            .replace(/(\d{3})(\d)/, '$1.$2') // add dot
            .replace(/(\d{3})(\d)/, '$1.$2') // add dot
            .replace(/(\d{3})(\d{1,2})/, '$1-$2') // add hyphen
            .replace(/(-\d{2})\d+?$/, '$1'); // max length
    }

    maskCnpj(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    }

    maskDate(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1');
    }

    maskPhone(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
            .replace(/(-\d{4})\d+?$/, '$1');
    }

    maskPis(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{5})(\d)/, '$1.$2')
            .replace(/(\d{5}\.)(\d{2})(\d)/, '$1$2-$3')
            .replace(/(-\d)\d+?$/, '$1');
    }
}
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

            helper.addClick(elButton, this.addClickAction);
        });
    }

    addClickAction(item) {
        const elContent = item.target.parentNode.querySelector(`.${this.cssDropDownContent}`);

        if (elContent === null) return;
        helper.addClass(elContent, this.cssOpend);
    }

    close() {
        const self = window.menuDropDown;

        if (this.elMenu === typeof 'undefined') return;

        self.elMenu.forEach((item) => {
            const elContent = item.querySelector(`.${self.cssDropDownContent}`);

            if (elContent === null) return;
            helper.removeClass(elContent, this.cssOpend);
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
        const el = document.querySelectorAll(`.${window.menuDropDown.cssMobileShow}`);

        if (
            event.toElement.classList.contains('button') ||
            event.toElement.classList.contains('link')
        ) return;

        el.forEach((item) => {
            helper.removeClass(item, menuDropDown.cssMobileShow);
        });
    }

    reset() {
        document.removeEventListener('click', this.listener, true);
        window.menuDropDown.init();
    }
}
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
export class MenuToggle {
    constructor() {
        this.cssButton = 'toggle-menu';
        this.cssOpen = 'toggle-menu__open';
        this.isWatch = false;
        this.handleClick = this.handleClick.bind(this);
    }

    buildMenu() {
        this.elButton.forEach((el) => {
            helper.addClick(el, this.handleClick);
        });
    }

    handleClick(args) {
        const elSibling = args.target.nextElementSibling;
        const isCss = elSibling.classList.contains(this.cssOpen);

        if (isCss) {
            elSibling.classList.remove(this.cssOpen);
            return;
        }
        elSibling.classList.add(this.cssOpen);
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
        this.elButton = document.querySelectorAll(`.${this.cssButton}`);
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
                                <use xlink:href="./assets/${globalVersion}/img/icon.svg#plus"></use>
                            </svg>
                        </button>
                    </header>
                    <div class="row">
                        <div class="modal__content"></div>
                    </div>
                    <div class="navigation-change button-wrapper row center ${this.cssHide}">
                        <button type="button" class="button button--big" data-id="previous" aria-label="${window.translation.translation.previous}" >
                            <svg class="icon icon--extra-big icon--white">
                                <use xlink:href="./assets/${globalVersion}/img/icon.svg#previous"></use>
                            </svg>
                        </button>
                        <button type="button" class="button button--big" data-id="next" aria-label="${window.translation.translation.next}" >
                            <svg class="icon icon--extra-big icon--white rotate-180">
                                <use xlink:href="./assets/${globalVersion}/img/icon.svg#previous"></use>
                            </svg>
                        </button>
                    </div>
                    <footer class="button-wrapper modal__footer center ${this.cssHide}">
                        <button type="button" class="button button--regular button--grey" data-id="cancel"></button>
                        <button type="button" class="button button--regular button--blue" data-id="confirm"></button>
                    </footer>
                </div>
            </div>
        `;

        this.elBody.insertAdjacentHTML('afterbegin', string);
    }

    buildKeyboard() {
        window.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'Escape': return this.buildKeyboardEscape();
                case 'ArrowLeft': return this.buildKeyboardArrowLeft();
                case 'ArrowRight': return this.buildKeyboardArrowRight();
            }
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
            this.buildModal({ kind: 'gallery', size: 'big' });
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
        typeof obj.click !== 'undefined' ? this.buildContentConfirmationAction(obj.click) : this.buildContentConfirmationAction('modal.closeModal()');
        typeof obj.confirmText !== 'undefined' ? this.elModalFooterConfirm.innerHTML = obj.confirmText : this.translate();
        this.buildModalSize(obj.size);
        this.buildModalKind(obj);
        typeof obj.action === 'undefined' ? this.openModal() : this.closeModal();
    }

    buildModalKind(obj) {
        if (obj.kind === 'ajax') this.buildContentAjax(obj.content);
        if (obj.kind === 'confirmation') this.buildContentConfirmation(obj);
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

    buildContentConfirmation(props) {
        const content = props.content;
        const isCancelButton = props.isCancelButton;
        const html = `<div class="center">${content}</div>`;

        if (isCancelButton) {
            this.elModalFooterCancel.classList.add(this.cssHide);
        } else {
            this.elModalFooterCancel.classList.remove(this.cssHide);
        }
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
        this.elModalBox.classList.add('modal-animate');
        this.elModal.classList.remove(this.cssClose);
    }

    openConfirmation(props) {
        props.kind = 'confirmation';

        this.buildModal(props);
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
export class Notification {
    constructor() {
        this.elBody = document.querySelector('body');
        this.elNotificationId = 'notification';
        this.colorDefault = 'grey';

        this.notificationId = 0;
    }

    add(obj) {
        if (!obj.text) return;

        this.placeItem(obj);

        const el = document.querySelector(`#${this.elNotificationId + this.notificationId}`);
        this.remove(el, obj.text.length);
        this.notificationId++;
    }

    buildHtml() {
        const html = `<div id="${this.elNotificationId}" class="${this.elNotificationId} ${this.elNotificationId}--default"></div>`;

        this.elBody.insertAdjacentHTML('beforeend', html);
    }

    buildHtmlItem(obj) {
        const color = typeof obj.color !== 'undefined' ? obj.color : this.colorDefault;

        return `
            <div class="${this.elNotificationId}__item ${this.elNotificationId}--regular ${this.elNotificationId}--${color}" id="${this.elNotificationId}${this.notificationId}">
                <span class="${this.elNotificationId}__text">${obj.text}</span>
                <button type="button" class="button button--small button--small--proportional button--transparent" onclick="Notification.remove(this.parentNode, 0)" aria-label="${window.translation.translation.close}">
                    <svg class="icon icon--regular rotate-45">
                        <use xlink:href="./assets/${globalVersion}/img/icon.svg#plus"></use>
                    </svg>
                </button>
            </div>
        `;
    }

    init() {
        this.buildHtml();
        this.update();
    }

    placeItem(obj) {
        let string = this.buildHtmlItem(obj);
        let place = '';

        if (typeof obj.place === 'undefined') {
            place = this.elNotification;
        } else {
            let elList = document.querySelector(obj.place).querySelector(`.${this.elNotificationId}`);

            if (elList === null) {
                let newString = `<div class="${this.elNotificationId}">${string}</div>`;

                string = newString;
                place = document.querySelector(obj.place);
            } else {
                place = elList;
            }
        }

        place.insertAdjacentHTML('beforeend', string);
    }

    remove(item, messageLength) {
        const messageTime = messageLength * 150;

        setTimeout(() => {
            this.removeItem(item);
        }, messageTime);
    }

    removeItem(item) {
        if (item.parentNode === null) return;

        item.parentNode.removeChild(item);
    }

    update() {
        const el = document.querySelector(`#${this.elNotificationId}`);

        this.elNotification = el;
    }
}
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
export class Translation {
    constructor() {
        this.translation = '';
        this.translationEn = {
            'cancel': 'Cancel',
            'close': 'Close',
            'confirm': 'OK',
            'input_upload': 'Select File...',
            'next': 'Next',
            'previous': 'Previous',
        };
        this.translationEs = {
            'cancel': 'Cancelar',
            'close': 'Cerrar',
            'confirm': 'OK',
            'input_upload': 'Seleccione Archivo...',
            'next': 'Siguiente',
            'previous': 'Anterior',
        };
        this.translationPt = {
            'cancel': 'Cancelar',
            'close': 'Fechar',
            'confirm': 'OK',
            'input_upload': 'Selecione o Arquivo...',
            'next': 'Próximo',
            'previous': 'Anterior',
        };
    }

    defineLanguege() {
        const capitalize = globalLanguage.charAt(0).toUpperCase() + globalLanguage.slice(1);

        this.translation = this[`translation${capitalize}`];
    }

    init() {
        this.defineLanguege();
    }
}
window.carousel = new Carousel();
window.form = new Form();
window.helper = new Helper();
window.layout = new Layout();
window.lazyLoad = new LazyLoad();
window.loadingMain = new LoadingMain();
window.mask = new Mask();
window.menuDropDown = new MenuDropDown();
window.menuTab = new MenuTab();
window.menuToggle = new MenuToggle();
window.modal = new Modal();
window.notification = new Notification();
window.table = new Table();
window.tag = new Tag();
window.translation = new Translation();


window.addEventListener('load',
    window.translation.init(),
    window.mask.init(),
    window.modal.init(),
    window.carousel.init(),
    window.lazyLoad.init(),
    window.menuDropDown.init(),
    window.menuTab.init(),
    window.menuToggle.init(),
    window.notification.init(),
    window.table.init(),
    window.tag.init(),
    window.loadingMain.hide(), {
        once: true
    });