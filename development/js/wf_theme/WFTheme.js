class WfTheme {
    constructor() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, 'constructor'); /*endRemoveIf(production)*/
        this.$body = document.querySelector('body');
        this.arrStyle = ['grey', 'blue', 'green', 'cyan', 'orange', 'red', 'yellow', 'purple', 'brown', 'black', 'white'];
        this.arrStyleLength = this.arrStyle.length;

        this.verifyLoad();
    }

    verifyLoad() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, 'buildLoad'); /*endRemoveIf(production)*/
        let self = this;

        window.onload = function () {
            self.buildActiveMenu();
        };
    }

    buildActiveMenu() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, 'buildActiveMenu'); /*endRemoveIf(production)*/
        let url = top.location.href;
        let urlSplit = url.split('/');
        let length = urlSplit.length;
        let file = urlSplit[length - 1];
        let fileSplit = file.split('.');
        let target = document.querySelectorAll('#main_menu [data-id="' + fileSplit[0] + '"]');

        if (target.length > 0) {
            target[0].classList.add('active');
        }
    }

    // buildGoogleMaps() {
    //     /*removeIf(production)*/ objWfDebug.debugMethod(this, 'buildGoogleMaps'); /*endRemoveIf(production)*/
    //     let $maps1 = $('#google_maps_map');
    //     let $maps1Box = $('#google_maps_box');

    //     $maps1.addClass('scroll-off');

    //     $maps1Box.on('click', function () {
    //         $maps1.removeClass('scroll-off');
    //     });

    //     $maps1Box.mouseleave(function () {
    //         $maps1.addClass('scroll-off');
    //     });
    // }

    // doSlide(target) {
    //     /*removeIf(production)*/ objWfDebug.debugMethod(this, 'doSlide', target); /*endRemoveIf(production)*/
    //     $('html, body').animate({
    //         scrollTop: ($(target).offset().top) + 'px'
    //     }, 500);
    // }
}