export class Confirmation {
    close(target) {
        target.parentNode.parentNode.parentNode.remove();
    }

    draw(props) {
        const size = props.size ? `modal--${props.size}` : '';
        const title = props.title ? `<h3>${props.title}</h3>` : '';
        const content = props.content ? `<p>${props.content}</p>` : '';
        const actionClose = 'confirmation.close(this)';
        const translationCancel = props.translationCancel ? props.translationCancel : window.translation.translation.cancel;
        const translationConfirm = props.translationConfirm ? props.translationConfirm : window.translation.translation.confirm;
        const colorConfirm = props.colorConfirm ? props.colorConfirm : 'blue';
        const colorCancel = props.colorCancel ? props.colorCancel : 'grey';
        const buttonClose = component.drawCloseButton({
            onclick: actionClose
        });
        const buttonCancel = component.drawButton({
            color: colorCancel,
            label: translationCancel,
            size: props.buttonSize,
            onclick: actionClose
        });
        const buttonConfirm = component.drawButton({
            color: colorConfirm,
            label: translationConfirm,
            size: props.buttonSize,
            onclick: `${props.onclick};${actionClose}`
        });
        const html = `
            <div class="modal modal-close">
                <div class="modal__box ${size}">
                    <header class="modal__header right">
                        ${buttonClose}
                    </header>
                    <div class="row">
                        <div class="modal__content">
                            ${title}
                            ${content}
                        </div>
                    </div>
                    <footer class="button-wrapper modal__footer right">
                        ${buttonCancel}
                        ${buttonConfirm}
                    </footer>
                </div>
            </div>
        `;

        helper.elBody.insertAdjacentHTML('afterbegin', html);
    }

    open(props) {
        this.draw(props);
    }
}