export class Component {
    drawButton(props) {
        const css = props.css ? props.css : '';
        const onclick = props.onclick ? `onclick="${props.onclick}"` : '';
        const label = props.label ? props.label : '';
        const ariaLabel = props.ariaLabel ? `aria-label="${props.ariaLabel}"` : '';
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
        props.ariaLabel = window?.wfpTranslation?.translation?.close ? window?.wfpTranslation?.translation?.close : 'close';
        props.icon = this.drawIcon({
            rotate: '45',
            size: 'regular',
            icon: 'plus',
        });

        return this.drawButton(props);
    }

    drawIcon(props) {
        const rotate = props.rotate ? `rotate-${props.rotate}` : '';
        const color = props.color ? `icon--${props.color}` : '';
        const size = props.size ? props.size : 'regular';
        const icon = props.icon ? props.icon : '';
        const html = `
            <svg class="icon icon--${size} ${rotate} ${color}">
                <use xlink:href="${wfpIconAddress + icon}"></use>
            </svg>
        `;

        return html;
    }

    drawImage(props) {
        const src = props.src ? `src="${props.src}"` : '';
        const title = props.title ? `title="${props.title}"` : '';
        const alt = props.alt ? `alt="${props.alt}"` : title;
        const style = props.style ? `style="${props.style}"` : '';
        const css = props.css ? `class="${props.css}"` : '';
        const html = `<img ${src} ${css} ${style} ${title} ${alt}>`;

        return html;
    }

    drawModal(props) {
        const size = props.size ? props.size : 'regular';
        const content = props.content ? props.content : '';
        const color = props.color ? props.color : 'grey';
        const zIndex = this.drawModalZIndex();
        const html = `
            <div class="modal" style="z-index:${zIndex}">
                <div class="modal__box modal--${size} modal--${color}">
                    ${content}
                </div>
            </div>
        `;

        return html;
    }

    drawModalZIndex() {
        const modals = wfpModal?.getElModal();
        const modalsLength = modals.length;
        const isModal = modalsLength > 0;
        let zIndex = 5;

        if (isModal) {
            const elModalLast = modals[0];
            const zIndexCurrent = Number(elModalLast.style.zIndex);

            zIndex = zIndexCurrent + 1;
        }
        return zIndex;
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

    drawModalDresciption(props) {
        const description = props.description;
        if (!description) return '';
        const html = `<p class="modal__description">${description}</p>`;

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

    drawModalNavigation(props) {
        const target = props?.target;
        if (!target) return;
        const elGalleryItens = wfpGallery.currentGalleryItens;
        const index = wfpGallery.currentGalleryIndex;
        const isItemFirst = index === 0;
        const isItemLast = elGalleryItens.length === index + 1;

        const iconLeft = this.drawIcon({
            size: 'extra-big',
            icon: 'previous',
            color: 'white',
        });
        const iconRight = this.drawIcon({
            rotate: '180',
            size: 'extra-big',
            icon: 'previous',
            color: 'white',
        });
        const buttonPrevious = this.drawButton({
            size: 'big',
            ariaLabel: window.wfpTranslation.translation.previous,
            icon: iconLeft,
            css: isItemFirst ? 'hide' : '',
            onclick: 'wfpGallery.handlePrevious();'
        });
        const buttonNext = this.drawButton({
            size: 'big',
            ariaLabel: window.wfpTranslation.translation.next,
            icon: iconRight,
            css: isItemLast ? 'hide' : '',
            onclick: 'wfpGallery.handleNext();'
        });
        const html = `
            <div class="navigation-change button-wrapper row center">
                ${buttonPrevious}
                ${buttonNext}
            </div>
        `;

        return html;
    }
}