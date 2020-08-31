/*removeIf(production)*/
class WfDebug {
    constructor() {
        this.isWfLayout = true;
        this.isWfLoading = true;
        this.isWfTheme = true;

        this.isWfCarousel = true;
        this.isWfForm = true;
        this.isWfLazyLoad = true;
        this.isWfMenuDropDown = true;
        this.isWfMenuTab = true;
        this.isWfMenuToggle = true;
        this.isWfMask = true;
        this.isWfModal = true;
        this.isWfNotification = true;
        this.isWfProgress = true;
        this.isWfTable = true;
        this.isWfTag = true;
        this.isWfTooltip = true;
        this.isWfTranslation = true;
    }

    debugMethod(objWf, method, parameter = '') {
        let string = '';
        let className = objWf.constructor.name;
        // let arrMethod = objWfect.getOwnPropertyNames(objWfect.getPrototypeOf(objWf));

        if (!this['is' + className]) {
            return false;
        }

        string += '%c';
        string += 'obj' + className;
        string += '.';
        string += '%c';
        string += method;
        string += '(';

        string += '%c';
        if (parameter !== '') {
            string += parameter;
        }

        string += '%c';
        string += ');';

        console.log(string, 'color: black', 'color: blue', 'color: red', 'color: blue');
    }

    getMethodName() {
        let userAgent = window.navigator.userAgent;
        let msie = userAgent.indexOf('.NET ');

        if (msie > 0) {
            return false;
        }

        let e = new Error('dummy');
        let stack = e.stack.split('\n')[2]
            // " at functionName ( ..." => "functionName"
            .replace(/^\s+at\s+(.+?)\s.+/g, '$1');
        let split = stack.split('.');

        if (stack !== 'new') {
            return split[1];
        } else {
            return 'constructor';
        }
    }
}
/*endRemoveIf(production)*/
var translationEN = {
    "cancel": "Cancel",
    "close": "Close",
    "confirm": "Confirm",
    "input_upload": "Select File...",
    "next": "Next",
    "previous": "Previous",
}
var translationES = {
    "cancel": "Cancelar",
    "close": "Cerrar",
    "confirm": "Confirmar",
    "input_upload": "Seleccione Archivo...",
    "next": "Siguiente",
    "previous": "Anterior",
}
var translationPT = {
    "cancel": "Cancelar",
    "close": "Fechar",
    "confirm": "Confirmar",
    "input_upload": "Selecione o Arquivo...",
    "next": "Próximo",
    "previous": "Anterior",
}
function getUrlParameter(target) {
    let url = top.location.search.substring(1);
    let parameter = url.split('&');

    for (let i = 0; i < parameter.length; i++) {
        let parameterName = parameter[i].split('=');

        if (parameterName[0] === target) {
            return parameterName[1];
        }
    }
}

function getUrlWord(target) {
    return new RegExp('\\b' + target + '\\b', 'i').test(window.location.href);
}

function offset(element) {
    var rect = element.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

function verifyUrlRoute(target) {
    let arrFolder = window.location.pathname.split('/');

    if (arrFolder.indexOf(target) > -1) {
        return true;
    } else {
        return false;
    }
}

function wrapItem(target, cssClass) {
    let wrapper = document.createElement('div');

    wrapper.className = cssClass;
    target.parentNode.insertBefore(wrapper, target);
    wrapper.appendChild(target);
}
class WfCarousel {
    constructor() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$carousel = document.querySelectorAll('.carousel');

        this.classDisplay = 'display-none';
        this.counterCurrent = 0;
        this.transition = 5;
    }

    build() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        if (this.$carousel.length < 1) {
            return;
        }

        this.interval = setInterval(this.verifyInternval, 1000);
        this.buildLayout();
        this.buildNavigation();
        this.watchResize();
    }

    buildLayout() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        Array.prototype.forEach.call(this.$carousel, function (item) {
            let length = item.querySelectorAll('.carousel-list li').length;

            self.resizeLayout(item);
            self.buildLayoutController(item, length);
            self.defineActive(item.querySelector('[data-id="' + item.getAttribute('data-current-slide') + '"]'));

            if (length === 1) {
                item.querySelector('[data-id="navLeft"]').classList.add(self.classDisplay);
                item.querySelector('[data-id="navRight"]').classList.add(self.classDisplay);
                item.querySelector('.carousel-controller').classList.add(self.classDisplay);
            }
        });
    }

    watchResize() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        window.onresize = function () {
            Array.prototype.forEach.call(self.$carousel, function (item) {
                let $this = item.parentNode.parentNode.parentNode.parentNode;
                let $carouselList = $this.querySelector('.carousel-list');
                let newSlide = 0;

                self.defineActive($this.querySelector('[data-id="' + newSlide + '"]'));
                self.animate(newSlide, $carouselList, 'arrow');
            });
        };
    }

    buildLayoutController(target, length) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), [target, length]); /*endRemoveIf(production)*/
        let concat = '';

        for (let i = 0; i < length; i++) {
            concat += `
                <li>
                    <button type="button" class="bt-sm carousel-controller-bt" data-id="${i}" aria-hidden="true">
                        <span aria-hidden="true">&bull;</span>
                    </button>
                </li>
            `;
        }

        target.querySelector('.carousel-controller').innerHTML = concat;
    }

    buildNavigation() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;
        let $carousel = document.querySelectorAll('.carousel');

        Array.prototype.forEach.call($carousel, function (item) {
            self.buildNavigationControllerBt(item);
            self.buildNavigationArrowLeft(item);
            self.buildNavigationArrowRight(item);
        });
    }

    buildNavigationControllerBt(target) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;
        let button = target.querySelectorAll('.carousel-controller-bt');

        Array.prototype.forEach.call(button, function (item) {
            item.onclick = function () {
                item.parentNode.parentNode.parentNode.parentNode.querySelector('[data-current-slide="' + item.getAttribute('data-id') + '"]');
                self.defineActive(item);
                self.animate(item.getAttribute('data-id'), item, 'navigation');
            }
        });
    }

    buildNavigationArrowLeft(target) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;
        let button = target.querySelector('[data-id="navLeft"]');

        button.onclick = function () {
            let $carousel = button.parentNode.parentNode.parentNode.parentNode;
            let $carouselList = $carousel.querySelector('.carousel-list');
            let $carouselListLength = Number($carouselList.querySelectorAll('li').length);
            let currentSlide = Number($carousel.getAttribute('data-current-slide'));
            let newSlide = 0;

            if (currentSlide === 0) {
                newSlide = $carouselListLength - 1;
                $carousel.setAttribute('data-current-slide', newSlide);
            } else {
                newSlide = currentSlide - 1;
                $carousel.setAttribute('data-current-slide', newSlide);
            }

            self.defineActive($carousel.querySelector('[data-id="' + newSlide + '"]'));
            self.animate(newSlide, $carouselList, 'arrow');
        }
    }

    buildNavigationArrowRight(target) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;
        let button = target.querySelector('[data-id="navRight"]');

        button.onclick = function () {
            let $carousel = button.parentNode.parentNode.parentNode.parentNode;
            let $carouselList = $carousel.querySelector('.carousel-list');
            let $carouselListLength = Number($carouselList.querySelectorAll('li').length);
            let currentSlide = Number($carousel.getAttribute('data-current-slide'));
            let newSlide = 0;

            if (currentSlide === ($carouselListLength - 1)) {
                newSlide = 0;
                $carousel.setAttribute('data-current-slide', newSlide);
            } else {
                newSlide = currentSlide + 1;
                $carousel.setAttribute('data-current-slide', newSlide);
            }

            self.defineActive($carousel.querySelector('[data-id="' + newSlide + '"]'));
            self.animate(newSlide, $carouselList, 'arrow');
        }
    }

    animate(currentSlide, target, from) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), [currentSlide, target, from]); /*endRemoveIf(production)*/
        let $carouselList = from === 'arrow'
            ? target.parentNode.parentNode.parentNode.querySelector('.carousel-list')
            : target.parentNode.parentNode.parentNode.parentNode.querySelector('.carousel-list');
        let $carousel = $carouselList.parentNode.parentNode.parentNode;
        let slideSize = Number($carouselList.querySelector('li').offsetWidth);
        let currentPosition = Number(currentSlide * slideSize);
        let transition = '.7s';

        switch ($carousel.getAttribute('data-style')) {
            case 'fade':
                Array.prototype.forEach.call($carouselList.querySelectorAll('li'), function (item) {
                    item.style.opacity = 0;
                });

                $carouselList.querySelector('li').style.transition = transition;
                $carouselList.querySelectorAll('li')[currentSlide].style.opacity = 1;
                $carouselList.querySelectorAll('li')[currentSlide].style.left = '-' + currentPosition + 'px';
                $carouselList.querySelectorAll('li')[currentSlide].style.transition = transition;
                break;
            default:
                $carouselList.style.transform = 'translateX(-' + currentPosition + 'px)';
                break;
        }
    }

    verifyInternval() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = objWfCarousel;

        self.counterCurrent++;

        if (self.counterCurrent >= self.transition) {
            self.counterCurrent = 0;

            Array.prototype.forEach.call(self.$carousel, function (item) {
                item.querySelector('[data-id="navRight"]').click();
            });
        }
    }

    defineActive(target) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), target); /*endRemoveIf(production)*/
        let listBt = target.parentNode.parentNode.querySelectorAll('.carousel-controller-bt');

        Array.prototype.forEach.call(listBt, function (item) {
            item.classList.remove('active');
        });

        target.classList.add('active');
    }

    resizeLayout(target) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), target); /*endRemoveIf(production)*/
        let $carouselList = target.querySelector('.carousel-list');
        let $carouselListItem = $carouselList.querySelectorAll('li');
        let length = $carouselListItem.length;

        $carouselList.style.width = + length * 100 + '%';

        Array.prototype.forEach.call($carouselListItem, function (item) {
            item.style.width = + 100 / length + '%';
        });
    }
}
class WfForm {
    build() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        if (document.querySelectorAll('form').length < 1) {
            return;
        }

        this.buildKeyboard();
        this.buildInputFile();
    }

    buildKeyboard() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        window.addEventListener('keyup', function (event) {
            if (event.keyCode === 13) {
                self.buildFocus('.radio');
                self.buildFocus('.checkbox');
                self.buildFocus('.input-switch');
            }
        });
    }

    buildFocus(target) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let $arr = document.querySelectorAll(target);

        Array.prototype.forEach.call($arr, function (item) {
            let target = item.querySelector('input');

            if (document.activeElement == item) {
                target.click();
            }
        });
    }

    buildInputFile() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        Array.prototype.forEach.call(document.querySelectorAll('input[type="file"]'), function (item) {
            let target = item.parentNode;

            if (item.getAttribute('style')) {
                if (item.getAttribute('style').indexOf('display:') != -1) {
                    return;
                }
            }

            item.style.display = 'none';
            target.insertAdjacentHTML('beforeend', self.buildInputFileHtml());
            target.setAttribute('tabIndex', 0);
            target.style.outline = 0;

            if (document.activeElement == target) {
                target.querySelector('.input-file').classList.add('focus');
            }

            item.addEventListener('focusout', function () {
                target.querySelector('.input-file').classList.remove('focus');
            });

            self.buildInputFileAddAction(item);
        });
    }

    buildInputFileAddAction(item) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let $target = item.parentNode;
        let $targetFileClass = $target.querySelector('.input-file-name');
        let $targetFile = $target.querySelector('input[type="file"]');

        $target.addEventListener('click', function () {
            $targetFile.click();
        });

        $targetFile.addEventListener('change', function () {
            $targetFileClass.innerHTML = $targetFile.value;
        });
    }

    buildInputFileHtml() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let inputFile = '';
        let textFile = objWfTranslation.translation.input_upload;

        inputFile += '<div class="input-file">';
        inputFile += '    <div class="input-file-name"></div>';
        inputFile += '    <div class="input-file-text"><span class="fa fa-upload" aria-hidden="true"></span>&nbsp; ' + textFile + '</div>';
        inputFile += '</div>';

        return inputFile;
    }

    validateEmpty(arr) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let arrEmpty = arr;
        let length = arrEmpty.length;

        for (let i = 0; i < length; i++) {
            if (arrEmpty[i].value === '') {
                arrEmpty[i].focus();
                return false;
            }
        }

        return true;
    }
}
class WfLayout {
    constructor() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$body = document.querySelector('body');

        this.breakPointExtraSmall = 0;
        this.breakPointSmall = 576;
        this.breakPointMedium = 768;
        this.breakPointBig = 992;
        this.breakPointExtraBig = 1200;
        this.breakPointFullHd = 1920;
    }
}
class WfLazyLoad {
    build() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        if (document.querySelectorAll('[data-lazy-load="true"]').length < 1) {
            return;
        }

        this.addListener();
        this.buildLoop();
    }

    addListener() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        window.addEventListener('scroll', function (e) {
            window.requestAnimationFrame(function () {
                self.buildLoop();
            });
        });
    }

    buildLoop() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;
        let $arr = document.querySelectorAll('[data-lazy-load="true"]');

        Array.prototype.forEach.call($arr, function (item) {
            self.verifyPosition(item);
        });
    }

    verifyPosition(target) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let windowScroll = window.scrollY;
        let elemntPosition = offset(target).top;
        let margin = window.outerHeight;

        if (windowScroll >= elemntPosition - margin) {
            this.buildImage(target);
        }
    }

    buildImage(target) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        target.setAttribute('src', target.getAttribute('data-src'));
        target.removeAttribute('data-lazy-load');
    }
}
class WfMask {
    constructor() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$inputMask = document.querySelectorAll('[data-mask]');
    }

    build() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        if (this.$inputMask.length < 1) {
            return;
        }

        this.addListener();
    }

    addListener() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        this.$inputMask.forEach(($input) => {
            $input.addEventListener('input', (e) => {
                let inputValue = e.target.value;
                let inputMask = $input.dataset.mask;
                let capitalized = inputMask.charAt(0).toUpperCase() + inputMask.slice(1);

                e.target.value = self['mask' + capitalized](inputValue);
            })
        })
    }

    maskCep(value) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        return value
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1')
    }

    maskCpf(value) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        return value
            .replace(/\D/g, '') //only numbers
            .replace(/(\d{3})(\d)/, '$1.$2') // add dot
            .replace(/(\d{3})(\d)/, '$1.$2') // add dot
            .replace(/(\d{3})(\d{1,2})/, '$1-$2') // add hyphen
            .replace(/(-\d{2})\d+?$/, '$1') // max length
    }

    maskCnpj(value) {
            /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')
    }

    maskDate(value) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1')
    }

    maskPhone(value) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
            .replace(/(-\d{4})\d+?$/, '$1')
    }

    maskPis(value) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{5})(\d)/, '$1.$2')
            .replace(/(\d{5}\.)(\d{2})(\d)/, '$1$2-$3')
            .replace(/(-\d)\d+?$/, '$1')
    }
}
class WfMenuDropDown {
    update() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.isClickBuild = false;
        this.classMenu = 'menu-drop-down';
        this.classArrow = 'bt-arrow';
        this.classMenuText = this.classMenu + '-text';
        this.classShowMobile = 'mobile-show';

        this.$menu = document.querySelectorAll('.' + this.classMenu + ' , ' + '.' + this.classMenuText);
        this.$menuDropDownUl = document.querySelectorAll('.' + this.classMenu + ' ul' + ' , ' + '.' + this.classMenuText + ' ul');
        this.$menuDropDownLi = document.querySelectorAll('.' + this.classMenu + ' ul li' + ' , ' + '.' + this.classMenuText + ' ul li');
        this.$icon = `
            <svg class="icon icon-re ${this.classArrow}">
                <use xlink:href="./assets/img/icon.svg#triangle"></use>
            </svg>
        `;
    }

    build() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.update();

        if (this.$menu.length < 1) {
            return;
        }

        this.buildIcon();

        if (!this.isClickBuild) {
            this.isClickBuild = true;
            this.buildClick();
        }

        this.buildClickOut();
    }

    buildIcon() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;
        let $arr = document.querySelectorAll('.' + this.classMenu + ' ul > li > ul' + ' , .' + this.classMenuText + ' ul > li > ul');

        Array.prototype.forEach.call($arr, function (item) {
            if (!document.body.contains(item.parentNode.querySelector('.bt .' + self.classArrow + ' , .link .' + self.classArrow))) {
                item.parentNode.querySelector('.bt , .link').insertAdjacentHTML('beforeend', self.$icon);
            }
        });
    }

    buildClick() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        Array.prototype.forEach.call(this.$menu, function (item) {
            let $bt = item.querySelectorAll('li > .bt , li > .link');
            let $btSubMenu = item.querySelectorAll('ul > li > ul > li > .bt , ul > li > ul > li > .link');

            Array.prototype.forEach.call($bt, function (item) {
                item.addEventListener('click', function () {
                    self.buildClickAction(item);
                });
            });

            Array.prototype.forEach.call($btSubMenu, function (item) {
                item.addEventListener('click', function () {
                    item.parentNode.parentNode.classList.remove(self.classShowMobile);
                });
            });
        });
    }

    buildClickAction(item) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let $menuChild = item.parentNode.querySelector('ul');

        if (!document.body.contains($menuChild)) {
            return;
        }

        let $menuDropDown = $menuChild.parentNode.parentNode.parentNode;
        let $menuDropDownUl = $menuDropDown.querySelector('ul > li > ul');

        if ($menuDropDownUl.classList.contains(this.classShowMobile)) {
            $menuDropDownUl.classList.remove(this.classShowMobile);
        }

        if ($menuChild.classList.contains(this.classShowMobile)) {
            $menuChild.classList.remove(this.classShowMobile);
        } else {
            $menuChild.classList.add(this.classShowMobile);
        }

        $menuChild.classList.remove(self.classShowMobile);
        $menuChild.style.opacity = 1;
    }

    buildClickOut() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        document.addEventListener('click', this.listener, true);
    }

    listener(event) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        if (event.toElement.classList.contains('bt') || event.toElement.classList.contains('link')) {
            return;
        }

        Array.prototype.forEach.call(document.querySelectorAll('.' + objWfMenuDropDown.classShowMobile), function (item) {
            item.classList.remove(objWfMenuDropDown.classShowMobile);
        });
    }

    reset() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        document.removeEventListener('click', event, true);
        document.removeEventListener('click', this.listener, true);
        objWfMenuDropDown.build();
    }
}
class WfMenuTab {
    build() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.defineActive();
    }

    defineActive() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;
        let $arr = document.querySelectorAll('.menu-tab > ul > li > .bt');

        Array.prototype.forEach.call($arr, function (item) {
            item.addEventListener('click', function () {
                self.buildClick(item);
            });
        });
    }

    buildClick(item) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let classActive = 'menu-tab-active';
        let $arr = item.parentNode.parentNode.querySelectorAll('li');

        Array.prototype.forEach.call($arr, function (item) {
            item.classList.remove(classActive);
        });

        item.parentNode.classList.add(classActive);
    }
}
class WfMenuToggle {
    build() {
       /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.updateVariable();
        this.buildBt();
        this.watchResize();
    }

    updateVariable() {
       /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$bt = document.querySelectorAll('.bt-toggle');
    }

    buildBt() {
       /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
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
       /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        window.onresize = function () {
            self.build();
        };
    }

    reset() {
       /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.build();
    }
}
class WfModal {
    updateVariable() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.targetBuildGalleryChange = '';
        this.cssDisplay = 'display-none';
        this.isModalOpen = false;

        this.$body = document.querySelector('body');
        this.$modal = document.querySelector('#modal');
        this.$modalFooter = this.$modal.querySelector('footer');
        this.$modalFooterConfirm = this.$modalFooter.querySelector('[data-id="confirm"]');
        this.$modalFooterCancel = this.$modalFooter.querySelector('[data-id="cancel"]');
        this.$modalClose = document.querySelector('#modalClose');
        this.$modalContent = document.querySelector('#modalContent');
        this.$modalBox = this.$modal.querySelector('.modal-box');
        this.$modalNavigationArrow = this.$modal.querySelector('.navigation-arrow');
        this.$modalNavigationArrowLeft = this.$modalNavigationArrow.querySelector('[data-id="navLeft"]');
        this.$modalNavigationArrowRight = this.$modalNavigationArrow.querySelector('[data-id="navRight"]');
        this.$gallery = document.querySelectorAll('.gallery');
    }

    build() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.buildHtml();
        this.updateVariable();
        this.buildMenu();
        this.buildMenuGallery();
        this.buildKeyboard();
        this.buildTranslation();
    }

    buildHtml() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let string = `
            <div id="modal" class="modal-close">
                <div class="modal-box">
                    <header>
                        <button id="modalClose" type="button" aria-label="${objWfTranslation.translation.close}" class="bt bt-sm bt-grey bt-transparent">
                            <svg class="icon icon-bi rotate-45">
                                <use xlink:href="./assets/img/icon.svg#plus"></use>
                            </svg>
                        </button>
                    </header>
                    <div class="row">
                        <div id="modalContent" class="col-es-12"></div>
                    </div>
                    <div class="menu-horizontal">
                        <ul class="navigation-arrow">
                            <li>
                                <button type="button" class="bt bt-bi" data-id="navLeft" aria-label="${objWfTranslation.translation.previous}" >
                                    <svg class="icon icon-eb">
                                        <use xlink:href="./assets/img/icon.svg#previous"></use>
                                    </svg>
                                </button>
                            </li>
                            <li>
                                <button type="button" class="bt bt-bi" data-id="navRight" aria-label="${objWfTranslation.translation.next}" >
                                    <svg class="icon icon-eb rotate-180">
                                        <use xlink:href="./assets/img/icon.svg#previous"></use>
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <footer class="display-none text-center">
                        <div class="menu menu-horizontal">
                            <ul>
                                <li>
                                    <button type="button" class="bt bt-re bt-green" data-id="confirm"></button>
                                </li>
                                <li>
                                    <button type="button" class="bt bt-re bt-grey" data-id="cancel"></button>
                                </li>
                            </ul>
                        </div>
                    </footer>
                </div>
            </div>
        `;

        document.querySelector('body').insertAdjacentHTML('afterbegin', string);
    }

    buildTranslation() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$modalFooterConfirm.innerHTML = objWfTranslation.translation.confirm;
        this.$modalFooterCancel.innerHTML = objWfTranslation.translation.cancel;
    }

    buildKeyboard() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        window.addEventListener('keyup', function (event) {
            if (event.keyCode === 27) {
                if (self.isModalOpen) {
                    self.closeModal();
                }
            }

            if (event.keyCode === 37) {
                if (!self.isModalOpen) {
                    return;
                }
                if (self.$modalNavigationArrowLeft.classList.contains(self.cssDisplay)) {
                    return;
                } else {
                    self.$modalNavigationArrowLeft.click();
                }
            }

            if (event.keyCode === 39) {
                if (!self.isModalOpen) {
                    return;
                }
                if (self.$modalNavigationArrowRight.classList.contains(self.cssDisplay)) {
                    return;
                } else {
                    self.$modalNavigationArrowRight.click();
                }
            }
        })
    }

    buildMenuGallery() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        if (!this.$gallery) {
            return;
        }

        Array.prototype.forEach.call(this.$gallery, function (item) {
            let button = item.querySelectorAll('a');

            Array.prototype.forEach.call(button, function (itemBt) {
                itemBt.addEventListener('click', function (event) {
                    event.preventDefault();
                    self.buildModal('gallery', false, 'fu');
                    self.buildGalleryImage(itemBt.getAttribute('href'), itemBt.querySelector('img').getAttribute('data-description'));
                    self.buildGalleryNavigation(itemBt);
                });
            });
        });

        this.$modalNavigationArrowLeft.addEventListener('click', function () {
            self.targetBuildGalleryChange.parentNode.previousElementSibling.querySelector('a').click();
        });

        this.$modalNavigationArrowRight.addEventListener('click', function () {
            self.targetBuildGalleryChange.parentNode.nextElementSibling.querySelector('a').click();
        });
    }

    buildMenu() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        this.$modalClose.addEventListener('click', function () {
            self.closeModal();
        });

        document.addEventListener('click', function (event) {
            var isButton = event.target.matches('button *, a *');

            if (isButton) {
                return;
            }
        });

        this.$modalFooter.querySelector('[data-id="cancel"]').addEventListener('click', function (event) {
            self.closeModal();
        });
    }

    buildGalleryNavigation(target) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), target); /*endRemoveIf(production)*/
        let array = [];
        let currentGallery = target.parentNode.parentNode;
        let siblingLength = currentGallery.querySelectorAll('a').length - 1;

        Array.prototype.forEach.call(currentGallery.querySelectorAll('a'), function (item) {
            array.push(item);
        });

        let currentPosition = array.indexOf(target);

        if (siblingLength > 0) {
            this.$modalNavigationArrow.classList.remove(this.cssDisplay);
            this.targetBuildGalleryChange = target;

            if (currentPosition <= 0) {
                this.$modalNavigationArrowLeft.classList.add(this.cssDisplay);
            } else {
                this.$modalNavigationArrowLeft.classList.remove(this.cssDisplay);
            }

            if (currentPosition >= siblingLength) {
                this.$modalNavigationArrowRight.classList.add(this.cssDisplay);
            } else {
                this.$modalNavigationArrowRight.classList.remove(this.cssDisplay);
            }

        } else {
            this.$modalNavigationArrow.classList.add(this.cssDisplay);
        }
    }

    buildModal(kind, content, size = 're', action = 'open') {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), [kind, content, size, action]); /*endRemoveIf(production)*/
        this.$modalFooter.classList.add(this.cssDisplay);
        action === 'open' ? this.openModal() : this.closeModal();
        this.buildModalSize(size);
        this.buildModalKind(kind, content);
    }

    buildModalKind(kind, content) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), [kind, content]); /*endRemoveIf(production)*/

        if (kind === 'ajax') {
            this.buildContentAjax(content);
        }

        if (kind === 'confirmation') {
            this.buildContentConfirmation(content);
        }

        switch (kind) {
            case 'gallery':
                this.$modalNavigationArrow.classList.remove('arrow-inactive');
                this.$modalNavigationArrow.classList.add('arrow-active');
                break;
            default:
                this.$modalNavigationArrow.classList.remove('arrow-active');
                this.$modalNavigationArrow.classList.add('arrow-inactive');
                break;
        }
    }

    openModal() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.isModalOpen = true;

        this.$body.classList.remove('overflow-y');
        this.$body.classList.add('overflow-hidden');
        this.$body.style.overflowY = 'hidden';
        this.$modal.classList.remove('modal-close');
        this.$modalBox.classList.add('modal-animate');
    }

    closeModal() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.isModalOpen = false;

        this.$body.classList.add('overflow-y');
        this.$body.classList.remove('overflow-hidden');
        this.$body.style.overflowY = 'auto';
        this.$body.style.position = 'relative';
        this.$modal.classList.add('modal-close');
        this.$modalBox.classList.remove('modal-animate');

        this.resetOtherClass();
    }

    buildModalSize(size = 're') {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), size); /*endRemoveIf(production)*/
        this.$modalBox.classList.remove('modal-es');
        this.$modalBox.classList.remove('modal-sm');
        this.$modalBox.classList.remove('modal-re');
        this.$modalBox.classList.remove('modal-bi');
        this.$modalBox.classList.remove('modal-eb');
        this.$modalBox.classList.remove('modal-fu');
        this.$modalBox.classList.add('modal-' + size);
    }

    buildContentAjax(target) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), target); /*endRemoveIf(production)*/
        let self = this;
        let ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                self.$modalContent.innerHTML = this.responseText;
                self.resetOtherClass();
            }
        };

        ajax.open('GET', target, true);
        ajax.send();
    }

    buildGalleryImage(image, description) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), [image, description]); /*endRemoveIf(production)*/
        let stringImage = '<img src="' + image + '" class="img-responsive" style="margin:auto;" title="" alt=""/>';

        this.$modalContent.innerHTML = stringImage;
        this.changeText(description);
    }

    buildContentConfirmation(content) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), content); /*endRemoveIf(production)*/
        let string = '<div class="padding-re text-center">' + content + '</div>';

        this.$modalFooter.classList.remove(this.cssDisplay);
        this.$modalContent.innerHTML = string;
    }

    buildContentConfirmationAction(action) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), action); /*endRemoveIf(production)*/
        this.$modalFooterConfirm.setAttribute('onclick', action);
    }

    changeText(description) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), [description]); /*endRemoveIf(production)*/
        let string = '';

        if (description === '' || description === null) {
            return;
        }

        string += '<p class="modal-description">';
        string += description;
        string += '</p>';

        if (typeof description !== typeof undefined) {
            this.$modalContent.insertAdjacentHTML('beforeend', string);
        }
    }

    resetOtherClass() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/

        if (typeof objWfForm !== 'undefined') {
            objWfForm.buildInputFile();
        }

        if (typeof objWfMenuDropDown !== 'undefined') {
            objWfMenuDropDown.reset();
        }

        if (typeof objWfMenuToggle !== 'undefined') {
            objWfMenuToggle.build();
        }

        if (typeof objWfTooltip !== 'undefined') {
            objWfTooltip.reset();
        }

        if (typeof objWfMenuTab !== 'undefined') {
            objWfMenuTab.defineActive();
        }

        if (typeof objWfLazyLoad !== 'undefined') {
            objWfLazyLoad.build();
        }
    }
}
class WfNotification {
    constructor() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$body = document.querySelector('body');
        this.$notifyItem = document.querySelectorAll('.notify-item');

        this.notifyId = 0;
    }

    build() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.buildHtml();
        this.buildNavigation();
    }

    buildHtml() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let html = `
            <div id="notify">
                <ul class="notify-list">
                </ul>
            </div>
        `;

        this.$body.insertAdjacentHTML('beforeend', html);
        this.$notify = document.querySelector('#notify .notify-list');
    }

    buildHtmlItem(style = 'grey', message) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), [style, message]); /*endRemoveIf(production)*/
        return `
            <li id="notify${this.notifyId}">
                <div class="notify-item notify-${style}">
                    <span class="text">${message}</span>
                    <button type="button" class="bt" onclick="objWfNotification.remove(this.parentNode, 0)" aria-label="${objWfTranslation.translation.close}">
                        <svg class="icon icon-re rotate-45">
                            <use xlink:href="./assets/img/icon.svg#plus"></use>
                        </svg>
                    </button>
                </div>
            </li>
        `;
    }

    buildNavigation() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/

        Array.prototype.forEach.call(this.$notifyItem, function (item) {
            let bt = item.querySelectorAll('.bt')

            Array.prototype.forEach.call(bt, function (item) {
                item.addEventListener('click', function () {
                    item.parentNode.parentNode.parentNode.removeChild(item.parentNode.parentNode);
                });
            });
        });
    }

    add(message, style, place = this.$notify) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), [message, style, place]); /*endRemoveIf(production)*/
        let string = this.buildHtmlItem(style, message);
        let newPlace = '';

        if (!message) {
            return false;
        }

        if (place !== this.$notify) {
            if (typeof place === 'string') {
                newPlace = document.querySelector(place);
            } else {
                newPlace = place;
            }

            if (!newPlace.querySelector('.notify-list')) {
                newPlace.insertAdjacentHTML('beforeend', '<ul class="notify-list"></ul>');
            }

            newPlace.querySelector('.notify-list').insertAdjacentHTML('beforeend', string);
        } else {
            place.insertAdjacentHTML('beforeend', string);
        }

        this.remove(document.querySelector('#notify' + this.notifyId), message.length);
        this.notifyId++;
    }

    remove(item, messageLength) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), [item, messageLength]); /*endRemoveIf(production)*/
        let messageTime = messageLength * 150;

        function remove() {
            item.parentNode.removeChild(item);
        }

        setTimeout(remove, messageTime);
    }
}
class WfProgress {
    update() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.isFinish = false;
        this.progressSize = 0;
        this.$loadingMain = document.getElementById('loadingMain');
        this.$body = document.querySelector('body');
        this.$bar = document.querySelector('#loadingMain').querySelector('.progress-bar');
        this.$all = document.querySelectorAll('div, section, article');
        this.$allLength = this.$all.length;
    }

    build() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        if (document.getElementById('loadingMain') < 1) {
            return;
        }

        this.update();
        this.start();
    }

    start() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;
        let interval = setInterval(frame, 1);
        let total = this.buildProportion();

        function frame() {
            let porcentage = self.progressSize * 100 / total;

            self.progressSize++;
            self.$bar.style.width = porcentage + '%';

            if (self.progressSize >= total) {
                clearInterval(interval);
                self.finish();
                self.isFinish = true;
            }
        }
    }

    finish() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$loadingMain.classList.add('loading-main-done');
        this.$body.style.overflowY = 'auto';
        setTimeout(this.remove(this.$loadingMain), 1000);
    }

    remove(element) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        element.parentNode.removeChild(element);
    }

    buildProportion() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        if (this.$allLength > 1000) {
            return this.$allLength / 50;
        }
        if (this.$allLength > 900) {
            return this.$allLength / 45;
        }
        if (this.$allLength > 800) {
            return this.$allLength / 40;
        }
        if (this.$allLength > 700) {
            return this.$allLength / 35;
        }
        if (this.$allLength > 600) {
            return this.$allLength / 30;
        }
        if (this.$allLength > 500) {
            return this.$allLength / 25;
        }
        if (this.$allLength > 400) {
            return this.$allLength / 20;
        }
        if (this.$allLength > 300) {
            return this.$allLength / 15;
        }
        if (this.$allLength > 200) {
            return this.$allLength / 10;
        }

        return this.$allLength;
    }
}
class WfTable {
    constructor() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$table = document.querySelectorAll('.table');
    }

    build() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        if (this.$table.length < 1) {
            return;
        }

        this.buildResponsive();
    }

    buildResponsive() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        Array.prototype.forEach.call(this.$table, function (item) {
            wrapItem(item, 'table-responsive');
            wrapItem(item.parentNode.parentNode.querySelector('.table-responsive'), 'table-responsive-wrapper');
        });
    }
}
class WfTag {
    constructor() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$tagBt = document.querySelectorAll('.tag-item-bt');
    }

    build() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        if (this.$tagBt.length < 1) {
            return;
        }

        this.buildClick();
    }

    buildClick() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        Array.prototype.forEach.call(this.$tagBt, function (item) {
            let $bt = item.querySelector('.tag-bt');

            $bt.addEventListener('click', function () {
                $bt.parentNode.parentNode.parentNode.removeChild($bt.parentNode.parentNode);
            });
        });
    }
}
class WfTooltip {
    constructor() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.elementTop = 0;
        this.elementLeft = 0;
        this.elementWidth = 0;
        this.elementHeight = 0;
        this.elementLeft = 0;
        this.style = 'black';
        this.space = 5;
        this.currentWindowScroll = 0;
        this.windowWidth = 0;
        this.windowHeight = 0;
        this.centerWidth = 0;
        this.centerHeight = 0;
        this.positionTop = 0;
        this.positionLeft = 0;
    }

    build() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.buildHtml();
        this.updateVariable(false);

        if (this.$tooltipData.length < 1) {
            return;
        }

        this.buildMaxWidth();
        this.buildResize();
        this.buildTooltip();
    }

    updateVariable(element) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), element); /*endRemoveIf(production)*/
        this.$tooltip = document.querySelector('#tooltip');
        this.$tooltipBody = document.querySelector('#tooltipBody');
        this.$tooltipPointer = document.querySelector('#tooltipPointer');
        this.$tooltipData = document.querySelectorAll('[data-tooltip="true"]');

        this.windowWidth = window.offsetWidth;
        this.windowHeight = window.offsetHeight;
        this.currentWindowScroll = window.scrollY;

        this.elementTop = element !== false ? offset(element).top : 0;
        this.elementLeft = element !== false ? offset(element).left : 0;
        this.elementWidth = element !== false ? element.offsetWidth : 0;
        this.elementHeight = element !== false ? element.offsetHeight : 0;

        this.tooltipWidth = element !== false ? this.$tooltip.offsetWidth : 0;
        this.tooltipHeight = element !== false ? this.$tooltip.offsetHeight : 0;

        this.centerWidth = (this.tooltipWidth - this.elementWidth) / 2;
        this.centerHeight = (this.elementHeight / 2) - (this.tooltipHeight / 2);

        this.positionLeft = this.elementLeft - this.centerWidth;
        this.positionTop = this.elementTop - this.tooltipHeight - this.space;
    }

    buildHtml() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let html = `
            <div id="tooltip">
                <div id="tooltipBody"></div>
                <div id="tooltipPointer"></div>
            </div>
        `;

        document.querySelector('body').insertAdjacentHTML('beforeend', html);
    }

    buildResize() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        window.onresize = function () {
            self.updateVariable(false);
            self.buildMaxWidth();
        }
    }

    buildTooltip() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        this.showTooltip(false);
        Array.prototype.forEach.call(this.$tooltipData, function (item) {
            let title = item.getAttribute('title');
            
            if (typeof title !== 'undefined' && title !== null && title !== '') {
                item.setAttribute('data-tooltip-text', title);
                item.removeAttribute('title');
                item.onmouseover = function () {

                    self.$tooltipBody.innerHTML = item.getAttribute('data-tooltip-text');
                    self.changeLayout(item.getAttribute('data-tooltip-color'));
                    self.positionTooltip(item, item.getAttribute('data-tooltip-placement'));
                    self.showTooltip(true);
                };

                item.onmouseout = function () {
                    self.showTooltip(false);
                };
            }
        });
    }

    buildMaxWidth() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$tooltip.style.maxWidth = this.windowWidth - (this.space * 2);
    }

    showTooltip(action) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), action); /*endRemoveIf(production)*/
        if (action) {
            this.$tooltip.classList.add('tooltip-show');
        } else {
            this.$tooltip.classList.remove('tooltip-show');
        }
    }

    positionTooltipSwitchDirection(placement) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), placement); /*endRemoveIf(production)*/
        let direction = typeof placement === 'undefined' ? 'top' : placement;

        switch (direction) {
            case 'top':
                if ((this.elementTop - this.tooltipHeight) < (this.currentWindowScroll)) {
                    direction = 'bottom';
                }
                break;
            case 'right':
                if ((this.elementLeft + this.tooltipWidth + this.elementWidth) > this.windowWidth) {
                    direction = 'left';
                }
                break;
            case 'bottom':
                if ((this.elementTop + this.tooltipHeight + this.elementHeight) > (this.currentWindowScroll + this.windowHeight)) {
                    direction = 'top';
                }
                break;
            case 'left':
                if ((this.tooltipWidth + this.space) > this.elementLeft) {
                    direction = 'right';
                }
                break;
        }

        return direction;
    }

    positionTooltipTop() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.positionTop = this.elementTop - this.tooltipHeight - this.space;
        this.positionLeft = this.elementLeft - this.centerWidth;
    }

    positionTooltipBottom() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.positionTop = this.elementTop + this.elementHeight + this.space;
        this.positionLeft = this.elementLeft - this.centerWidth;
    }

    positionTooltipRight() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.positionTop = this.elementTop + this.centerHeight;
        this.positionLeft = this.elementLeft + this.elementWidth + this.space;
    }

    positionTooltipLeft() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.positionTop = this.elementTop + this.centerHeight;
        this.positionLeft = this.elementLeft - this.tooltipWidth - this.space;
    }

    positionTooltip(element, placement) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), [element, placement]);
        this.updateVariable(element);

        let direction = this.positionTooltipSwitchDirection(placement);

        switch (direction) {
            case 'top':
                this.positionTooltipTop();
                break;
            case 'right':
                this.positionTooltipRight();
                break;
            case 'bottom':
                this.positionTooltipBottom();
                break;
            case 'left':
                this.positionTooltipLeft();
                break;
        }

        this.changeArrowDirection(direction);
        this.buildLimits();
        this.$tooltip.style.top = this.positionTop + 'px';
        this.$tooltip.style.left = this.positionLeft + 'px';

        if (direction === 'top' || direction === 'bottom') {
            this.changeArrowPositionHorizontal();
        } else {
            this.changeArrowPositionVertical();
        }
    }

    buildLimits() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        if (this.positionLeft <= 0) {
            this.positionLeft = this.space;
        }

        if (this.positionLeft + this.tooltipWidth >= this.windowWidth) {
            this.positionLeft = this.windowWidth - this.tooltipWidth - this.space;
        }
    }

    changeArrowPositionHorizontal() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$tooltipPointer.style.left = this.$tooltip.offsetWidth / 2 + 'px';
    }

    changeArrowPositionVertical() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$tooltipPointer.style.left = '';
    }

    changeArrowDirection(direction) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), direction); /*endRemoveIf(production)*/
        this.$tooltipPointer.classList.remove('tooltip-direction-top');
        this.$tooltipPointer.classList.remove('tooltip-direction-bottom');
        this.$tooltipPointer.classList.remove('tooltip-direction-left');
        this.$tooltipPointer.classList.remove('tooltip-direction-right');
        this.$tooltipPointer.classList.add('tooltip-direction-' + direction);
    }

    changeLayout(style) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), style); /*endRemoveIf(production)*/
        let newStyle = typeof style === 'undefined' ? newStyle = this.style : style;

        this.$tooltip.removeAttribute('class');
        this.$tooltip.classList.add('tooltip');
        this.$tooltip.classList.add('tooltip-' + newStyle);
    }

    reset() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let element = document.getElementById('tooltip');

        element.parentNode.removeChild(element);
        objWfTooltip.build();
    }
}
class WfTranslation {
    constructor() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.translation = '';
    }

    build() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.defineLanguege();
    }

    defineLanguege() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        switch (globalLanguage) {
            case 'pt':
                this.translation = translationPT;
                break;
            case 'en':
                this.translation = translationEN;
                break;
        }
    }
}
class WfManagementPlugin {
    verifyLoad() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        window.addEventListener('load', this.applyClass(), { once: true });
    }

    applyClass() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        objWfTranslation.build();
        objWfProgress.build();
        objWfForm.build();
        objWfMask.build();
        objWfModal.build();
        objWfCarousel.build();
        objWfLazyLoad.build();
        objWfMenuDropDown.build();
        objWfMenuTab.build();
        objWfMenuToggle.build();
        objWfNotification.build();
        objWfTable.build();
        objWfTag.build();
        objWfTooltip.build();
    }
}

/*removeIf(production)*/
const objWfDebug = new WfDebug();
/*endRemoveIf(production)*/
const objWfManagementPlugin = new WfManagementPlugin();

const objWfCarousel = new WfCarousel();
const objWfForm = new WfForm();
const objWfLayout = new WfLayout();
const objWfLazyLoad = new WfLazyLoad();
const objWfMask = new WfMask();
const objWfMenuDropDown = new WfMenuDropDown();
const objWfMenuTab = new WfMenuTab();
const objWfMenuToggle = new WfMenuToggle();
const objWfModal = new WfModal();
const objWfNotification = new WfNotification();
const objWfProgress = new WfProgress();
const objWfTable = new WfTable();
const objWfTag = new WfTag();
const objWfTooltip = new WfTooltip();
const objWfTranslation = new WfTranslation();

objWfManagementPlugin.verifyLoad();