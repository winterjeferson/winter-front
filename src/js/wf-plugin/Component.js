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
}