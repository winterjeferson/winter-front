export class LoadingMain {
    constructor() {
        this.cssHide = 'hide';
        this.cssAnimation = 'animate';

        this.elWrapper = document.querySelector('.loading-main');
        if (!this.elWrapper) return;
        this.elLoading = this.elWrapper.querySelector('.loading');
    }

    hide() {
        if (!this.elWrapper) return;
        this.elWrapper.classList.add(this.cssHide);
        this.elLoading.classList.remove(this.cssAnimation);
        wfpHelper.elBody.style.overflow = 'auto';
    }
}