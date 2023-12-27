export class Gallery {
    draw(props) {
        const size = props.size ? `modal--${props.size}` : '';
        const actionClose = 'modal.close(this)';
        const modalHeader = component.drawModalHeader({
            onclick: actionClose
        });
        const modalContent = component.drawModalContent({
            content: ''
        });
        const html = component.drawModal({
            size,
            content: modalHeader + modalContent
        });

        helper.elBody.insertAdjacentHTML('afterbegin', html);
    }

    open(props) {
        this.draw(props);
    }
}