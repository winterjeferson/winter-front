export class Gallery {
    draw(props) {
        const src = props?.target?.getAttribute('data-target');
        const description = props?.target?.getAttribute('data-description');
        const modalHeader = component.drawModalHeader({
            onclick: modal.getActionClose()
        });
        const modalNavigation = component.drawModalNavigation(props);
        const modalDescription = component.drawModalDresciption({ description });
        const modalImage = component.drawImage({
            style: 'margin:auto;',
            css: 'img-responsive',
            src,
        });
        const modalContent = component.drawModalContent({
            content: modalImage + modalDescription
        });
        const html = component.drawModal({
            size: props?.size,
            color: props?.color,
            content: modalHeader + modalContent + modalNavigation
        });

        modal.show(html);
    }

    open(props) {
        this.draw(props);
    }
}