export class Gallery {
    constructor() {
        this.currentGallery;
        this.currentGalleryItens;
        this.currentGalleryIndex;
        this.currentModal;
    }

    draw(props) {
        const src = props?.target?.getAttribute('data-target');
        const description = props?.target?.getAttribute('data-description');
        const modalHeader = wfpComponent.drawModalHeader({
            onclick: wfpModal.getActionClose()
        });
        const modalNavigation = wfpComponent.drawModalNavigation(props);
        const modalDescription = wfpComponent.drawModalDresciption({ description });
        const modalImage = wfpComponent.drawImage({
            style: 'margin:auto;',
            css: 'img-responsive',
            src,
        });
        const modalContent = wfpComponent.drawModalContent({
            content: modalImage + modalDescription
        });
        const html = wfpComponent.drawModal({
            size: props?.size,
            color: props?.color,
            content: modalHeader + modalContent + modalNavigation
        });

        wfpModal.show(html);
    }

    open(props) {
        const target = props?.target;

        this.currentGallery = target?.parentNode;
        this.currentGalleryItens = Array.from(this.currentGallery.querySelectorAll('.gallery__item'));
        this.currentGalleryIndex = this.currentGalleryItens.indexOf(target);
        this.draw(props);
    }

    handleChange(elTarget) {
        if (!elTarget) return;
        wfpModal.closeByKey();
        elTarget.click();
    }

    handleNext() {
        const elTarget = this.currentGalleryItens[this.currentGalleryIndex + 1];

        this.handleChange(elTarget);
    }

    handlePrevious() {
        const elTarget = this.currentGalleryItens[this.currentGalleryIndex - 1];

        this.handleChange(elTarget);
    }
}