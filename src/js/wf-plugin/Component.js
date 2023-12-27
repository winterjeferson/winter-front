export class Component {
    drawButton(props) {
        const css = props.css ? props.css : '';
        const onclick = props.onclick ? `onclick="${props.onclick}"` : '';
        const label = props.label ? props.label : '';
        const ariaLabel = label ? `aria-label="${label}"` : '';
        const icon = props.icon ? props.icon : '';
        const color = props.color ? props.color : 'grey';
        const size = props.size ? props.size : 'regular';
        const html = `
            <button type="button" ${ariaLabel} class="button ${css} button--${color} button--${size}" ${onclick}>
                ${icon}${label} 
            </button>
        `;

        return html;
    }

    drawCloseButton(props) {
        props.size = 'extra-small';
        props.css = `button--${props.size} button--${props.size}--proportional button--transparent button--close`;
        props.ariaLabel = window.translation.translation.close;
        props.icon = this.drawIcon({
            rotate: '45',
            size: 'regular',
            icon: 'plus',
        });

        return this.drawButton(props);
    }

    drawIcon(props) {
        const rotate = props.rotate ? `rotate-${props.rotate}` : '';
        const size = props.size ? props.size : 'regular';
        const icon = props.icon ? props.icon : '';
        const html = `
            <svg class="icon icon--${size} ${rotate}">
                <use xlink:href="./assets/${globalVersion}/img/icon.svg#${icon}"></use>
            </svg>
        `;

        return html;
    }

    drawModal(props) {
        const content = props.content ? props.content : '';
        const size = props.size ? props.size : 'regular';
        const html = `
            <div class="modal">
                <div class="modal__box ${size}">
                    ${content}
                </div>
            </div>
        `;

        return html;
    }

    drawModalContent(props) {
        const content = props.content ? props.content : '';
        const html = `
            <div class="row">
                <div class="modal__content">
                    ${content}
                </div>
            </div>
        `;

        return html;
    }

    drawModalFooter(props) {
        const content = props.content ? props.content : '';
        const html = `
            <footer class="button-wrapper modal__footer right">
                ${content}
            </footer>
        `;

        return html;
    }

    drawModalHeader(props) {
        const buttonClose = this.drawCloseButton({
            onclick: props.onclick
        });
        const html = `
            <header class="modal__header right">
                ${buttonClose}
            </header>
        `;

        return html;
    }
}