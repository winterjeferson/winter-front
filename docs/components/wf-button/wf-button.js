class wfButton extends HTMLElement {
    static get observedAttributes() {
        return ['text', 'theme', 'size'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    buildAttribute(props) {
        const label = props.label;
        const value = props.value;
        if (!value) return '';
        const html = `
            ${label}="${value}"
        `;

        return html;
    }

    buildCss() {
        const theme = this.getAttribute('theme') || 'grey';
        const size = this.getAttribute('size') || 'regular';
        const props = {
            label: 'class',
            value: ''
        };

        props.value += `theme--${theme} `;
        props.value += `size--${size} `;
        return this.buildAttribute(props)
    }

    buildId() {
        const props = {
            label: 'id',
            value: this.getAttribute('id')
        };

        return this.buildAttribute(props)
    }

    buildType() {
        const type = this.getAttribute('type') || 'button';
        const props = {
            label: 'type',
            value: type
        };

        return this.buildAttribute(props)
    }

    attributeChangedCallback(name, valueOld, valueNew) {
        if (valueOld !== valueNew) this.render();
    }

    async render() {
        const html = await fetch('./components/wf-button/wf-button.html').then(res => res.text());
        const template = html + this.draw();

        this.shadowRoot.innerHTML = template;
    }

    draw() {
        const text = this.getAttribute('text');
        const type = this.buildType();
        const id = this.buildId();
        const css = this.buildCss();

        const html = `
            <button ${type} ${css} ${id}>
                ${text}
            </button>
        `;

        return html;
    }
}

customElements.define('wf-button', wfButton);