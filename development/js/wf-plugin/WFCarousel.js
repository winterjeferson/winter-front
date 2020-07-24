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

const objWfCarousel = new WfCarousel();