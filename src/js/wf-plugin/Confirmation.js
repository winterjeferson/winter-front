export class Confirmation {
    draw(props) {
        const buttonSize = props.buttonSize ? props.buttonSize : 'regular';
        const title = props.title ? `<h3>${props.title}</h3>` : '';
        const content = props.content ? `<p>${props.content}</p>` : '';
        const actionClose = modal.getActionClose();
        const translationCancel = props.translationCancel ? props.translationCancel : window.translation.translation.cancel;
        const translationConfirm = props.translationConfirm ? props.translationConfirm : window.translation.translation.confirm;
        const colorConfirm = props.colorConfirm ? props.colorConfirm : 'blue';
        const colorCancel = props.colorCancel ? props.colorCancel : 'grey';
        const buttonCancel = component.drawButton({
            color: colorCancel,
            label: translationCancel,
            size: buttonSize,
            onclick: actionClose
        });
        const buttonConfirm = component.drawButton({
            color: colorConfirm,
            label: translationConfirm,
            size: buttonSize,
            onclick: `${props.onclick};${actionClose}`
        });
        const modalHeader = component.drawModalHeader({
            onclick: actionClose
        });
        const modalContent = component.drawModalContent({
            content: title + content
        });
        const modalFooter = component.drawModalFooter({
            content: buttonCancel + buttonConfirm
        });
        const html = component.drawModal({
            size: props.size,
            content: modalHeader + modalContent + modalFooter
        });

        modal.show(html);
    }

    open(props) {
        this.draw(props);
    }
}