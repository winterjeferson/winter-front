class Theme {
    constructor() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, 'constructor'); /*endRemoveIf(production)*/
        this.$body = $('body');
        this.arrStyle = ['grey', 'blue', 'green', 'cyan', 'orange', 'red', 'yellow', 'purple', 'brown', 'black', 'white'];
        this.arrStyleLength = this.arrStyle.length;

        this.buildLoad();
    }

    buildLoad() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, 'buildLoad'); /*endRemoveIf(production)*/
        let self = this;

        $(window).on('load', function () {
            self.buildActiveMenu();
        });
    }

    buildActiveMenu() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, 'buildActiveMenu'); /*endRemoveIf(production)*/
        let urlParameter = objFrameworkLayout.getUrlParameter('p');

        $('#main_menu').find('[data-id="' + urlParameter + '"]').addClass('active');
    }

    buildGoogleMaps() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, 'buildGoogleMaps'); /*endRemoveIf(production)*/
        let $maps1 = $('#google_maps_map');
        let $maps1Box = $('#google_maps_box');

        $maps1.addClass('scroll-off');

        $maps1Box.on('click', function () {
            $maps1.removeClass('scroll-off');
        });

        $maps1Box.mouseleave(function () {
            $maps1.addClass('scroll-off');
        });
    }

    doSlide(target) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, 'doSlide', target); /*endRemoveIf(production)*/
        $('html, body').animate({
            scrollTop: ($(target).offset().top) + 'px'
        }, 500);
    }
}