export class Confirmation {
    draw(props) {
        const buttonSize = props.buttonSize ? props.buttonSize : 'regular';
        const title = props.title ? `<h3>${props.title}</h3>` : '';
        const content = props.content ? `<p>${props.content}</p>` : '';
        const actionClose = wfpModal.getActionClose();
        const translationCancel = props.translationCancel ? props.translationCancel : window.wfpTranslation.translation.cancel;
        const translationConfirm = props.translationConfirm ? props.translationConfirm : window.wfpTranslation.translation.confirm;
        const colorConfirm = props.colorConfirm ? props.colorConfirm : 'blue';
        const colorCancel = props.colorCancel ? props.colorCancel : 'grey';
        const buttonCancel = wfpComponent.drawButton({
            color: colorCancel,
            label: translationCancel,
            size: buttonSize,
            onclick: actionClose
        });
        const buttonConfirm = wfpComponent.drawButton({
            color: colorConfirm,
            label: translationConfirm,
            size: buttonSize,
            onclick: `${props.onclick};${actionClose}`
        });
        const modalHeader = wfpComponent.drawModalHeader({
            onclick: actionClose
        });
        const modalContent = wfpComponent.drawModalContent({
            content: title + content
        });
        const modalFooter = wfpComponent.drawModalFooter({
            content: buttonCancel + buttonConfirm
        });
        const html = wfpComponent.drawModal({
            size: props.size,
            content: modalHeader + modalContent + modalFooter
        });

        wfpModal.show(html);
    }

    open(props) {
        this.draw(props);
    }
}