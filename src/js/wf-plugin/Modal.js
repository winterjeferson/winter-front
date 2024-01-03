export class Modal {
    constructor() {
        this.cssButtonClose = 'button--close';
    }

    close(target) {
        target.parentNode.parentNode.parentNode.remove();
    }

    closeByKey() {
        const elModals = this.getElModal();
        const length = elModals.length;
        const elTarget = elModals[0];
        const elButton = elTarget?.querySelector(`.${this.cssButtonClose}`);

        if (length < 1) return;
        elButton.click();
    }

    async draw(props) {
        const title = props.title ? `<h3>${props.title}</h3>` : '';
        const content = props.kind === 'ajax' ? await wfpHelper.ajax({ controller: props.content }) : props.content;
        const modalHeader = wfpComponent.drawModalHeader({
            onclick: this.getActionClose()
        });
        const modalContent = wfpComponent.drawModalContent({
            content: title + content
        });
        const html = wfpComponent.drawModal({
            size: props.size,
            content: modalHeader + modalContent
        });
        this.show(html);
    }

    getActionClose() {
        return 'wfpModal.close(this)';
    }

    getElModal() {
        return document.querySelectorAll('.modal');
    }

    async open(props) {
        await this.draw(props);
        if (typeof wfpMenuDropDown !== 'undefined') wfpMenuDropDown.reset();
        if (typeof wfpMenuToggle !== 'undefined') wfpMenuToggle.init();
        if (typeof wfpMenuTab !== 'undefined') wfpMenuTab.init();
        if (typeof wfpLazyLoad !== 'undefined') wfpLazyLoad.init();
    }

    show(html) {
        wfpHelper.elBody.insertAdjacentHTML('afterbegin', html);
    }
}