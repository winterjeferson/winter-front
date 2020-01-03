class FrameworkCarousel {
    constructor() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.counterCurrent = 0;
    }

    buildCarousel() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.buildLayout();
        this.buildNavigation();
        this.buildCounter();
    }

    buildLayout() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        $('.carousel').each(function () {
            let target = $(this);
            let length = target.find('.carousel-list').find('li').length;

            self.resizeLayout(target);
            self.buildLayoutController(target, length);
            self.defineActive(target.find('.carousel-controller').find('[data-id="' + target.attr('data-current-slide') + '"]'));
        });
    }

    buildLayoutController(target, length) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), [target, length]); /*endRemoveIf(production)*/
        let concat = '';

        for (let i = 0; i < length; i++) {
            concat += '<li>';
            concat += '     <button type="button" class="bt-sm carousel-controller-bt" data-id="' + i + '" aria-hidden="true">';
            concat += '         <span class="fa fa-circle" aria-hidden="true"></span>';
            concat += '     </button>';
            concat += '</li>';
        }

        target.find('.carousel-controller').append(concat);
    }

    buildNavigation() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;
        let $carousel = $('.carousel');

        $carousel.find('.carousel-controller-bt').each(function () {
            $(this).on('click', function () {
                $(this).parent().parent().parent().parent().attr('data-current-slide', $(this).attr('data-id'));
                self.defineActive($(this));
                self.buildAnimation($(this).attr('data-id'), $(this), 'navigation');
            });
        });

        $carousel.find('[data-id="nav-left"]').each(function () {
            $(this).on('click', function () {
                let $carousel = $(this).parent().parent().parent().parent();
                let $carouselList = $carousel.find('.carousel-list');
                let $carouselListLength = Number($carouselList.find('li').length);
                let currentSlide = Number($carousel.attr('data-current-slide'));
                let newSlide = 0;

                if (currentSlide === 0) {
                    newSlide = $carouselListLength - 1;
                    $carousel.attr('data-current-slide', newSlide);
                } else {
                    newSlide = currentSlide - 1;
                    $carousel.attr('data-current-slide', newSlide);
                }

                self.defineActive($carousel.find('[data-id="' + newSlide + '"]'));
                self.buildAnimation(newSlide, $carouselList, 'arrow');
            });
        });

        $carousel.find('[data-id="nav-right"]').each(function () {
            $(this).on('click', function () {
                let $carousel = $(this).parent().parent().parent().parent();
                let $carouselList = $carousel.find('.carousel-list');
                let $carouselListLength = Number($carouselList.find('li').length);
                let currentSlide = Number($carousel.attr('data-current-slide'));
                let newSlide = 0;

                if (currentSlide === ($carouselListLength - 1)) {
                    newSlide = 0;
                    $carousel.attr('data-current-slide', newSlide);
                } else {
                    newSlide = currentSlide + 1;
                    $carousel.attr('data-current-slide', newSlide);
                }

                self.defineActive($carousel.find('[data-id="' + newSlide + '"]'));
                self.buildAnimation(newSlide, $carouselList, 'arrow');
            });
        });

        $carousel.each(function () {
            let $this = $(this);
            let carouselLength = $this.find('.carousel-list').find('li').length;

            if (carouselLength === 1) {
                $this.find('[data-id="nav-left"]').addClass('display-none');
                $this.find('[data-id="nav-right"]').addClass('display-none');
                $this.find('.carousel-controller').addClass('display-none');
            }
        });

        $(window).resize(function () {
            $carousel.each(function () {
                let $this = $(this).parent().parent().parent().parent();
                let $carouselList = $this.find('.carousel-list');
                let newSlide = 0;

                self.defineActive($this.find('[data-id="' + newSlide + '"]'));
                self.buildAnimation(newSlide, $carouselList, 'arrow');
            });
        });
    }

    buildAnimation(currentSlide, target, from) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), [currentSlide, target, from]); /*endRemoveIf(production)*/
        let $carouselList = from === 'arrow' ? target.parent().parent().parent().find('.carousel-list') : target.parent().parent().parent().parent().find('.carousel-list');
        let $carousel = $carouselList.parent().parent().parent();
        let slideSize = Number($carouselList.find('li').width());
        let currentPosition = Number(currentSlide * slideSize);
        let transition = '.7s';

        switch ($carousel.attr('data-style')) {
            case 'fade':
                $carouselList.find('li').css('opacity', '0').css('transition', transition);
                $carouselList.find('li:eq(' + currentSlide + ')').css('left', '-' + currentPosition + 'px').css('opacity', '1').css('transition', transition);
                break;
            default:
                $carouselList.css('transform', ' translate(-' + currentPosition + 'px, 0)');
                break;
        }
    }

    buildCounter() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;
        const interval = setInterval(verifyInternval, 1000);

        function verifyInternval() {
            self.counterCurrent++;
            if (self.counterCurrent >= 5) {
                self.counterCurrent = 0;

                $('.carousel').each(function () {
                    $(this).find('[data-id="nav-right"]').click();
                });
            }
        }
    }

    defineActive(target) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), target); /*endRemoveIf(production)*/
        target.parent().parent().find('.carousel-controller-bt').removeClass('active');
        target.addClass('active');
    }

    resizeLayout(target) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), target); /*endRemoveIf(production)*/
        let carouselList = $(target).find('.carousel-list');
        let carouselListItem = carouselList.find('li');
        let carouselItemLength = carouselListItem.length;

        carouselList.css('width', carouselItemLength * 100 + "%");
        carouselListItem.css('width', 100 / carouselItemLength + "%");
    }
}