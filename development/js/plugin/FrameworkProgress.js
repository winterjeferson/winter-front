class FrameworkProgress {
    constructor() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$bar = $('#loading_main').find('.progress-bar');
        this.$all = $('div, section, article');
        this.$allLength = Math.round(this.$all.length / 10);

        this.isFinish = false;
        this.progressSize = 0;
    }

    start() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        for (let i = 0; i < this.$allLength; i++) {
            this.checkElement();
        }
    }

    checkElement() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;
        let percent = 100 / this.$allLength;
        let progressWidth = percent + this.progressSize;

        this.progressSize = progressWidth;
        this.$bar.animate({width: progressWidth + '%'}, 0.01, function () {
            if (self.$bar[0].style.width >= '100%') {
                if (!self.isFinish) {
                    objFrameworkManagement.finishLoading();
                    self.isFinish = true;
                }
            }
        });
    }
}