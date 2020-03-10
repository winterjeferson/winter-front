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

function verifyUrlFodler(target) {
    let arrFolder = window.location.pathname.split('/');

    if (arrFolder.indexOf(target) > -1) {
        return true;
    } else {
        return false;
    }
}
class WFCarousel {
    constructor() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$carousel = document.querySelectorAll('.carousel');
        
        this.classDisplay = 'display-none';
        this.counterCurrent = 0;
        this.transition = 5;
    }

    build() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        if (this.$carousel.length < 1) {
            return;
        }

        this.interval = setInterval(this.verifyInternval, 1000);
        this.buildLayout();
        this.buildNavigation();
        this.watchResize();
    }

    buildLayout() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        Array.prototype.forEach.call(this.$carousel, function (item) {
            let length = item.querySelectorAll('.carousel-list li').length;

            self.resizeLayout(item);
            self.buildLayoutController(item, length);
            self.defineActive(item.querySelector('[data-id="' + item.getAttribute('data-current-slide') + '"]'));

            if (length === 1) {
                item.querySelector('[data-id="nav-left"]').classList.add(self.classDisplay);
                item.querySelector('[data-id="nav-right"]').classList.add(self.classDisplay);
                item.querySelector('.carousel-controller').classList.add(self.classDisplay);
            }
        });
    }

    watchResize() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
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
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName(), [target, length]); /*endRemoveIf(production)*/
        let concat = '';

        for (let i = 0; i < length; i++) {
            concat += '<li>';
            concat += '     <button type="button" class="bt-sm carousel-controller-bt" data-id="' + i + '" aria-hidden="true">';
            concat += '         <span class="fa fa-circle" aria-hidden="true"></span>';
            concat += '     </button>';
            concat += '</li>';
        }

        target.querySelector('.carousel-controller').innerHTML = concat;
    }

    buildNavigation() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;
        let $carousel = document.querySelectorAll('.carousel');

        Array.prototype.forEach.call($carousel, function (item) {
            self.buildNavigationControllerBt(item);
            self.buildNavigationArrowLeft(item);
            self.buildNavigationArrowRight(item);
        });
    }

    buildNavigationControllerBt(target) {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
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
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;
        let button = target.querySelector('[data-id="nav-left"]');

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
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;
        let button = target.querySelector('[data-id="nav-right"]');

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
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName(), [currentSlide, target, from]); /*endRemoveIf(production)*/
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
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = objWFCarousel;

        self.counterCurrent++;

        if (self.counterCurrent >= self.transition) {
            self.counterCurrent = 0;

            Array.prototype.forEach.call(self.$carousel, function (item) {
                item.querySelector('[data-id="nav-right"]').click();
            });
        }
    }

    defineActive(target) {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName(), target); /*endRemoveIf(production)*/
        let listBt = target.parentNode.parentNode.querySelectorAll('.carousel-controller-bt');

        Array.prototype.forEach.call(listBt, function (item) {
            item.classList.remove('active');
        });

        target.classList.add('active');
    }

    resizeLayout(target) {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName(), target); /*endRemoveIf(production)*/
        let $carouselList = target.querySelector('.carousel-list');
        let $carouselListItem = $carouselList.querySelectorAll('li');
        let length = $carouselListItem.length;

        $carouselList.style.width = + length * 100 + '%';

        Array.prototype.forEach.call($carouselListItem, function (item) {
            item.style.width = + 100 / length + '%';
        });
    }
}
/*removeIf(production)*/
class WFDebug {
    constructor() {
        this.isWFLayout = true;
        this.isWFManagement = true;

        this.isWFLoading = true;
        this.isWFTheme = true;

        this.isWFCarousel = true;
        this.isWFForm = true;
        this.isWFGeneric = true;
        this.isWFMenuDropDown = true;
        this.isWFMenuTab = true;
        this.isWFMenuToggle = true;
        this.isWFModal = true;
        this.isWFNotification = true;
        this.isWFProgress = true;
        this.isWFTable = true;
        this.isWFTag = true;
        this.isWFTooltip = true;
        this.isWFTranslation = true;
    }

    debugMethod(objWF, method, parameter = '') {
        let string = '';
        let className = objWF.constructor.name;
        // let arrMethod = objWFect.getOwnPropertyNames(objWFect.getPrototypeOf(objWF));

        if (!this['is' + className]) {
            return false;
        }

        string += '%c';
        string += 'objWF' + className;
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
class WFForm {
    constructor() {
    }

    build() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        if (document.querySelectorAll('form').length < 1) {
            return;
        }

        this.buildKeyboard();
        this.buildInputFile();
    }

    buildKeyboard() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
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
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        let $arr = document.querySelectorAll(target);

        Array.prototype.forEach.call($arr, function (item) {
            let target = item.querySelector('input');

            if (document.activeElement == item) {
                target.click();
            }
        });
    }

    buildInputFile() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        Array.prototype.forEach.call(document.querySelectorAll('input[type="file"]'), function (item) {
            let target = item.parentNode;
            
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
        });

        Array.prototype.forEach.call(document.querySelectorAll('.input-file'), function (item) {
            let $target = item.parentNode;
            let $targetFileClass = $target.querySelector('.input-file-name');
            let $targetFile = $target.querySelector('input[type="file"]');

            item.addEventListener('click', function () {
                $targetFile.click();
            });

            $targetFile.addEventListener('change', function () {
                $targetFileClass.innerHTML = $targetFile.value;
            });

        });
    }

    buildInputFileHtml() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        let inputFile = '';
        let textFile = objWFTranslation.translation.default.input_upload;

        inputFile += '<div class="input-file">';
        inputFile += '    <div class="input-file-name"></div>';
        inputFile += '    <div class="input-file-text"><span class="fa fa-upload" aria-hidden="true"></span>&nbsp; ' + textFile + '</div>';
        inputFile += '</div>';

        return inputFile;
    }

    validateEmpty(arr) {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
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
class WFMenuDropDown {
    constructor() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.isClickBuild = false;
        this.classMenu = 'menu-drop-down';
        this.classArrow = 'bt-arrow';
        this.classMenuText = this.classMenu + '-text';
        this.classShowMobile = 'mobile-show';

        this.$menu = document.querySelectorAll('.' + this.classMenu + ' , ' + '.' + this.classMenuText);
        this.$menuDropDownUl = document.querySelectorAll('.' + this.classMenu + ' ul' + ' , ' + '.' + this.classMenuText + ' ul');
        this.$menuDropDownLi = document.querySelectorAll('.' + this.classMenu + ' ul li' + ' , ' + '.' + this.classMenuText + ' ul li');
        this.$icon = '<span class="' + this.classArrow + '">&nbsp;&nbsp;<span class="fa fa-caret-down" aria-hidden="true"></span></span>';
    }

    build() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
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
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;
        let $arr = document.querySelectorAll('.' + this.classMenu + ' ul > li > ul' + ' , .' + this.classMenuText + ' ul > li > ul');

        Array.prototype.forEach.call($arr, function (item) {
            if (!document.body.contains(item.parentNode.querySelector('.bt .' + self.classArrow + ' , .link .' + self.classArrow))) {
                item.parentNode.querySelector('.bt , .link').insertAdjacentHTML('beforeend', self.$icon);
            }
        });
    }

    buildClick() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
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
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
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
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        document.addEventListener('click', this.listener, true);
    }

    listener(event) {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        if (event.toElement.classList.contains('bt') || event.toElement.classList.contains('link')) {
            return;
        }

        Array.prototype.forEach.call(document.querySelectorAll('.' + objWFMenuDropDown.classShowMobile), function (item) {
            item.classList.remove(objWFMenuDropDown.classShowMobile);
        });
    }

    reset() {
        document.removeEventListener('click', event, true);
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        objWFMenuDropDown = new WFMenuDropDown();
        document.removeEventListener('click', this.listener, true);
        objWFMenuDropDown.build();
    }
}
class WFMenuTab {
    build() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.defineActive();
    }

    defineActive() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;
        let $arr = document.querySelectorAll('.menu-tab > ul > li > .bt');

        Array.prototype.forEach.call($arr, function (item) {
            item.addEventListener('click', function () {
                self.buildClick(item);
            });
        });
    }

    buildClick(item) {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        let classActive = 'menu-tab-active';
        let $arr = item.parentNode.parentNode.querySelectorAll('li');

        Array.prototype.forEach.call($arr, function (item) {
            item.classList.remove(classActive);
        });

        item.parentNode.classList.add(classActive);
    }
}
class WFMenuToggle {
    constructor() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
    }

    build() {
       /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.updateVariable();
        this.buildBt();
        this.watchResize();
    }

    updateVariable() {
       /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$bt = document.querySelectorAll('.bt-toggle');
    }

    buildBt() {
       /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
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
       /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        window.onresize = function () {
            self.build();
        };
    }

    reset() {
       /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.build();
    }
}

class WFModal {
    constructor() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$body = document.querySelector('body');

        this.targetBuildGalleryChange = '';
        this.cssDisplay = 'display-none';
    }

    updateVariable() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$modal = document.querySelector('#modal');
        this.$modalFooter = this.$modal.querySelector('footer');
        this.$modalFooterConfirm = this.$modalFooter.querySelector('[data-id="confirm"]');
        this.$modalFooterCancel = this.$modalFooter.querySelector('[data-id="cancel"]');
        this.$modalClose = document.querySelector('#modal_close');
        this.$modalContent = document.querySelector('#modal_content');
        this.$modalBox = this.$modal.querySelector('.modal-box');
        this.$modalNavigationArrow = this.$modal.querySelector('.navigation-arrow');
        this.$modalNavigationArrowLeft = this.$modalNavigationArrow.querySelector('[data-id="nav-left"]');
        this.$modalNavigationArrowRight = this.$modalNavigationArrow.querySelector('[data-id="nav-right"]');
        this.$gallery = document.querySelectorAll('.gallery');
    }

    build() {
            /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.buildHtml();
        this.updateVariable();
        this.buildMenu();
        this.buildMenuGallery();
        this.buildKeyboard();
        this.buildTranslation();
    }

    buildHtml() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        let string = '';

        string += '<div id="modal" class="modal-close">';
        string += '     <div class="modal-box">';
        string += '         <header>';
        string += '             <button id="modal_close" type="button" aria-label="' + objWFTranslation.translation.default.close + '" class="bt bt-sm bt-grey bt-transparent">';
        string += '                 <span class="fa fa-times" aria-hidden="true"></span>';
        string += '             </button>';
        string += '         </header>';
        string += '         <div class="row">';
        string += '             <div id="modal_content" class="col-es-12"></div>';
        string += '         </div>';
        string += '         <div class="menu-horizontal">';
        string += '             <ul class="navigation-arrow">';
        string += '                 <li>';
        string += '                     <button type="button" class="bt bt-bi" data-id="nav-left" aria-label="' + objWFTranslation.translation.default.previous + '" >';
        string += '                         <span class="fa fa-angle-left" aria-hidden="true"></span>';
        string += '                     </button>';
        string += '                 </li>';
        string += '                 <li>';
        string += '                     <button type="button" class="bt bt-bi" data-id="nav-right" aria-label="' + objWFTranslation.translation.default.next + '" >';
        string += '                         <span class="fa fa-angle-right" aria-hidden="true"></span>';
        string += '                     </button>';
        string += '                 </li>';
        string += '             </ul>';
        string += '         </div>';
        string += '         <footer class="display-none text-center">';
        string += '             <nav class="menu menu-horizontal">';
        string += '                 <ul>';
        string += '                     <li>';
        string += '                         <button type="button" class="bt bt-re bt-green" data-id="confirm"></button>';
        string += '                     </li>';
        string += '                     <li>';
        string += '                         <button type="button" class="bt bt-re bt-grey" data-id="cancel"></button>';
        string += '                     </li>';
        string += '                 </ul>';
        string += '             </nav>';
        string += '         </footer>';
        string += '     </div>';
        string += '</div>';

        this.$body.insertAdjacentHTML('afterbegin', string);
    }

    buildTranslation() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$modalFooterConfirm.innerHTML = objWFTranslation.translation.default.confirm;
        this.$modalFooterCancel.innerHTML = objWFTranslation.translation.default.cancel;
    }

    buildKeyboard() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        window.addEventListener('keyup', function (event) {
            if (event.keyCode === 27) {
                self.closeModal();
            }

            if (event.keyCode === 37) {
                if (self.$modalNavigationArrowLeft.classList.contains(self.cssDisplay)) {
                    return;
                } else {
                    self.$modalNavigationArrowLeft.click();
                }
            }

            if (event.keyCode === 39) {
                if (self.$modalNavigationArrowRight.classList.contains(self.cssDisplay)) {
                    return;
                } else {
                    self.$modalNavigationArrowRight.click();
                }
            }
        })
    }

    buildMenuGallery() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
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
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
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
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName(), target); /*endRemoveIf(production)*/
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
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName(), [kind, content, size, action]); /*endRemoveIf(production)*/
        this.$modalFooter.classList.add(this.cssDisplay);
        action === 'open' ? this.openModal() : this.closeModal();
        this.buildModalSize(size);
        this.buildModalKind(kind, content);
    }

    buildModalKind(kind, content) {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName(), [kind, content]); /*endRemoveIf(production)*/

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
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$body.classList.remove('overflow-y');
        this.$body.classList.add('overflow-hidden');
        this.$body.style.overflowY = 'hidden';
        this.$modal.classList.remove('modal-close');
        this.$modalBox.classList.add('modal-animate');
    }

    closeModal() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$body.classList.add('overflow-y');
        this.$body.classList.remove('overflow-hidden');
        this.$body.style.overflowY = 'auto';
        this.$body.style.position = 'relative';
        this.$modal.classList.add('modal-close');
        this.$modalBox.classList.remove('modal-animate');

        this.resetOtherClass();
    }

    buildModalSize(size = 're') {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName(), size); /*endRemoveIf(production)*/
        this.$modalBox.classList.remove('modal-es');
        this.$modalBox.classList.remove('modal-sm');
        this.$modalBox.classList.remove('modal-re');
        this.$modalBox.classList.remove('modal-bi');
        this.$modalBox.classList.remove('modal-eb');
        this.$modalBox.classList.remove('modal-fu');
        this.$modalBox.classList.add('modal-' + size);
    }

    buildContentAjax(target) {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName(), target); /*endRemoveIf(production)*/
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
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName(), [image, description]); /*endRemoveIf(production)*/
        let stringImage = '<img src="' + image + '" class="img-responsive" style="margin:auto;" title="" alt=""/>';

        this.$modalContent.innerHTML = stringImage;
        this.changeText(description);
    }

    buildContentConfirmation(content) {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName(), content); /*endRemoveIf(production)*/
        let string = '<div class="padding-re text-center">' + content + '</div>';

        this.$modalFooter.classList.remove(this.cssDisplay);
        this.$modalContent.innerHTML = string;
    }

    buildContentConfirmationAction(action) {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName(), action); /*endRemoveIf(production)*/
        this.$modalFooterConfirm.setAttribute('onclick', action);
    }

    changeText(description) {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName(), [description]); /*endRemoveIf(production)*/
        let string = '';

        if (description === '') {
            return false;
        }

        string += '<p class="modal-description">';
        string += description;
        string += '</p>';

        if (typeof description !== typeof undefined) {
            this.$modalContent.insertAdjacentHTML('beforeend', string);
        }
    }

    resetOtherClass() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/

        if (typeof objWFForm !== 'undefined') {
            objWFForm.buildInputFile();
        }

        if (typeof objWFMenuDropDown !== 'undefined') {
            objWFMenuDropDown.reset();
        }

        if (typeof objWFMenuToggle !== 'undefined') {
            objWFMenuToggle.build();
        }

        if (typeof objWFTooltip !== 'undefined') {
            objWFTooltip.reset();
        }

        if (typeof objWFMenuTab !== 'undefined') {
            objWFMenuTab.defineActive();
        }
    }
}
class WFNotification {
    constructor() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$body = document.querySelector('body');
        this.$notifyItem = document.querySelectorAll('.notify-item');

        this.notifyId = 0;
    }

    build() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.buildHtml();
        this.buildNavigation();
    }

    buildHtml() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        let string = '';

        string += '<div id="notify">';
        string += '    <ul class="notify-list">';
        string += '    </ul>';
        string += '</div>';

        this.$body.insertAdjacentHTML('beforeend', string);
        this.$notify = document.querySelector('#notify .notify-list');
    }

    buildHtmlItem(style = 'grey', message) {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName(), [style, message]); /*endRemoveIf(production)*/
        let string = '';

        string += '<li id="notify_' + this.notifyId + '">';
        string += '     <div class="notify-item notify-' + style + '">';
        string += '         <span class="text">';
        string += message;
        string += '         </span>';
        string += '         <button type="button" class="bt" onclick="$(this).parent().parent().remove();" aria-label="' + objWFTranslation.translation.default.close + '">';
        string += '            <span class="fa fa-times" aria-hidden="true"></span>';
        string += '         </button>';
        string += '     </div>';
        string += '</li>';

        return string;
    }

    buildNavigation() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/

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
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName(), [message, style, place]); /*endRemoveIf(production)*/
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

        this.remove(document.querySelector('#notify_' + this.notifyId), message.length);
        this.notifyId++;
    }

    remove(item, messageLength) {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName(), [item, messageLength]); /*endRemoveIf(production)*/
        let messageTime = messageLength * 150;

        function remove() {
            item.parentNode.removeChild(item);
        }

        setTimeout(remove, messageTime);
    }
}

class WFProgress {
    constructor() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$bar = document.querySelector('#loading_main .progress-bar');
        this.$all = document.querySelectorAll('div, section, article');
        this.$allLength = this.$all.length;

        this.isFinish = false;
        this.progressSize = 0;
    }

    build() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;
        let interval = setInterval(frame, 1);
        let total = this.buildProportion();

        function frame() {
            let porcentage = self.progressSize * 100 / total;

            self.progressSize++;
            self.$bar.style.width = porcentage + '%';

            if (self.progressSize >= total) {
                clearInterval(interval);
                objWFLoading.finish();
                self.isFinish = true;
            }
        }
    }

    buildProportion() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
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
class WFTable {
    constructor() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$table = document.querySelectorAll('.table');
    }

    build() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        if (this.$table.length < 1) {
            return;
        }
        
        this.buildResponsive();
    }

    buildResponsive() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        Array.prototype.forEach.call(this.$table, function (item) {
            let wrapper = document.createElement('div');
            wrapper.className = 'table-responsive';
            item.parentNode.insertBefore(wrapper, item);
            wrapper.appendChild(item);
        });
    }
}

class WFTag {
    constructor() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$tagBt = document.querySelectorAll('.tag-item-bt');
    }

    build() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        if (this.$tagBt.length < 1) {
            return;
        }

        this.buildClick();
    }

    buildClick() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        Array.prototype.forEach.call(this.$tagBt, function (item) {
            let $bt = item.querySelector('.tag-bt');

            $bt.addEventListener('click', function () {
                $bt.parentNode.parentNode.parentNode.removeChild($bt.parentNode.parentNode);
            });
        });
    }
}
class WFTooltip {
    constructor() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
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
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
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
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName(), element); /*endRemoveIf(production)*/
        this.$tooltip = document.querySelector('#tooltip');
        this.$tooltipBody = document.querySelector('#tooltip_body');
        this.$tooltipPointer = document.querySelector('#tooltip_pointer');
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
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        let string = '';

        string += '<div id="tooltip">';
        string += '    <div id="tooltip_body"></div>';
        string += '    <div id="tooltip_pointer"></div>';
        string += '</div>';

        document.querySelector('body').insertAdjacentHTML('beforeend', string);
    }

    buildResize() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        window.onresize = function () {
            self.updateVariable(false);
            self.buildMaxWidth();
        }
    }

    buildTooltip() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
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
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$tooltip.style.maxWidth = this.windowWidth - (this.space * 2);
    }

    showTooltip(action) {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName(), action); /*endRemoveIf(production)*/
        if (action) {
            this.$tooltip.classList.add('tooltip-show');
        } else {
            this.$tooltip.classList.remove('tooltip-show');
        }
    }

    positionTooltipSwitchDirection(placement) {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName(), placement); /*endRemoveIf(production)*/
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
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.positionTop = this.elementTop - this.tooltipHeight - this.space;
        this.positionLeft = this.elementLeft - this.centerWidth;
    }

    positionTooltipBottom() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.positionTop = this.elementTop + this.elementHeight + this.space;
        this.positionLeft = this.elementLeft - this.centerWidth;
    }

    positionTooltipRight() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.positionTop = this.elementTop + this.centerHeight;
        this.positionLeft = this.elementLeft + this.elementWidth + this.space;
    }

    positionTooltipLeft() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.positionTop = this.elementTop + this.centerHeight;
        this.positionLeft = this.elementLeft - this.tooltipWidth - this.space;
    }

    positionTooltip(element, placement) {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName(), [element, placement]);
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
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        if (this.positionLeft <= 0) {
            this.positionLeft = this.space;
        }

        if (this.positionLeft + this.tooltipWidth >= this.windowWidth) {
            this.positionLeft = this.windowWidth - this.tooltipWidth - this.space;
        }
    }

    changeArrowPositionHorizontal() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$tooltipPointer.style.left = this.$tooltip.offsetWidth / 2 + 'px';
    }

    changeArrowPositionVertical() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$tooltipPointer.style.left = '';
    }

    changeArrowDirection(direction) {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName(), direction); /*endRemoveIf(production)*/
        this.$tooltipPointer.classList.remove('tooltip-direction-top');
        this.$tooltipPointer.classList.remove('tooltip-direction-bottom');
        this.$tooltipPointer.classList.remove('tooltip-direction-left');
        this.$tooltipPointer.classList.remove('tooltip-direction-right');
        this.$tooltipPointer.classList.add('tooltip-direction-' + direction);
    }

    changeLayout(style) {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName(), style); /*endRemoveIf(production)*/
        let newStyle = typeof style === 'undefined' ? newStyle = this.style : style;

        this.$tooltip.removeAttribute('class');
        this.$tooltip.classList.add('tooltip');
        this.$tooltip.classList.add('tooltip-' + newStyle);
    }

    reset() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        let element = document.getElementById('tooltip');

        element.parentNode.removeChild(element);
        objWFTooltip = new WFTooltip();
        objWFTooltip.build();
    }
}
class WFTranslation {
    constructor() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.translation = '';
    }

    build() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.defineLanguege();
    }

    defineLanguege() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        switch (globalLanguage) {
            case 'pt':
                this.translation = translationPTBR;
                break;
            case 'en':
                this.translation = translationEN;
                break;
        }
    }
}
