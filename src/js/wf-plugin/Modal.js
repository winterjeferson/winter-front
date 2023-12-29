export class Modal {
    close(target) {
        target.parentNode.parentNode.parentNode.remove();
    }

    closeByKey() {
        const elModals = this.getElModal();
        const length = elModals.length;
        const elTarget = elModals[0];
        const elButton = elTarget?.querySelector('.button--close');

        if (length < 1) return;
        elButton.click();
    }

    async draw(props) {
        const title = props.title ? `<h3>${props.title}</h3>` : '';
        const content = props.kind === 'ajax' ? await helper.ajax({ controller: props.content }) : props.content;
        const modalHeader = component.drawModalHeader({
            onclick: this.getActionClose()
        });
        const modalContent = component.drawModalContent({
            content: title + content
        });
        const html = component.drawModal({
            size: props.size,
            content: modalHeader + modalContent
        });
        this.show(html);
    }

    getActionClose() {
        return 'modal.close(this)';
    }

    getElModal() {
        return document.querySelectorAll('.modal');
    }

    async open(props) {
        await this.draw(props);
        if (typeof menuDropDown !== 'undefined') menuDropDown.reset();
        if (typeof menuToggle !== 'undefined') menuToggle.init();
        if (typeof menuTab !== 'undefined') menuTab.init();
        if (typeof lazyLoad !== 'undefined') lazyLoad.init();
    }

    show(html) {
        helper.elBody.insertAdjacentHTML('afterbegin', html);
    }
}