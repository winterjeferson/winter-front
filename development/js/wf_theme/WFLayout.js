class WfLayout {
    constructor() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$body = document.querySelector('body');
        // this.$window = document.querySelector('window');

        this.breakPointExtraSmall = 0;
        this.breakPointSmall = 576;
        this.breakPointMedium = 768;
        this.breakPointBig = 992;
        this.breakPointExtraBig = 1200;
    }

    buildSpinner(style) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), style); /*endRemoveIf(production)*/
        let spinner = '';

        spinner += '<div class="row text-center">';
        spinner += '    <div class="col-es-12">';
        spinner += '        <span class="fa fa-circle-o-notch fa-spin fa-2x color-' + style + '"></span>';
        spinner += '    </div>';
        spinner += '</div>';

        return spinner;
    }
}