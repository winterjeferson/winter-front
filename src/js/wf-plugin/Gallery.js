export class Gallery {
    draw(props) {
        const modalHeader = component.drawModalHeader({
            onclick: modal.getActionClose()
        });
        const modalContent = component.drawModalContent({
            content: ''
        });
        const html = component.drawModal({
            size: props.size,
            content: modalHeader + modalContent
        });

        modal.show(html);
    }

    open(props) {
        this.draw(props);
    }
}