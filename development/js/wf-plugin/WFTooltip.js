class WfTooltip {
    constructor() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.elementTop = 0;
        this.elementLeft = 0;
        this.elementWidth = 0;
        this.elementHeight = 0;
        this.elementLeft = 0;
        this.style = 'black';
        this.space = 5;
        this.currentWindowScroll = 0;
        this.windowWidth = 0;
        this.windowHeight = 0;
        this.centerWidth = 0;
        this.centerHeight = 0;
        this.positionTop = 0;
        this.positionLeft = 0;
    }

    build() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.buildHtml();
        this.updateVariable(false);

        if (this.$tooltipData.length < 1) {
            return;
        }

        this.buildMaxWidth();
        this.buildResize();
        this.buildTooltip();
    }

    updateVariable(element) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), element); /*endRemoveIf(production)*/
        this.$tooltip = document.querySelector('#tooltip');
        this.$tooltipBody = document.querySelector('#tooltipBody');
        this.$tooltipPointer = document.querySelector('#tooltipPointer');
        this.$tooltipData = document.querySelectorAll('[data-tooltip="true"]');

        this.windowWidth = window.offsetWidth;
        this.windowHeight = window.offsetHeight;
        this.currentWindowScroll = window.scrollY;

        this.elementTop = element !== false ? offset(element).top : 0;
        this.elementLeft = element !== false ? offset(element).left : 0;
        this.elementWidth = element !== false ? element.offsetWidth : 0;
        this.elementHeight = element !== false ? element.offsetHeight : 0;

        this.tooltipWidth = element !== false ? this.$tooltip.offsetWidth : 0;
        this.tooltipHeight = element !== false ? this.$tooltip.offsetHeight : 0;

        this.centerWidth = (this.tooltipWidth - this.elementWidth) / 2;
        this.centerHeight = (this.elementHeight / 2) - (this.tooltipHeight / 2);

        this.positionLeft = this.elementLeft - this.centerWidth;
        this.positionTop = this.elementTop - this.tooltipHeight - this.space;
    }

    buildHtml() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let html = `
            <div id="tooltip">
                <div id="tooltipBody"></div>
                <div id="tooltipPointer"></div>
            </div>
        `;

        document.querySelector('body').insertAdjacentHTML('beforeend', html);
    }

    buildResize() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        window.onresize = function () {
            self.updateVariable(false);
            self.buildMaxWidth();
        }
    }

    buildTooltip() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        this.showTooltip(false);
        Array.prototype.forEach.call(this.$tooltipData, function (item) {
            let title = item.getAttribute('title');
            
            if (typeof title !== 'undefined' && title !== null && title !== '') {
                item.setAttribute('data-tooltip-text', title);
                item.removeAttribute('title');
                item.onmouseover = function () {

                    self.$tooltipBody.innerHTML = item.getAttribute('data-tooltip-text');
                    self.changeLayout(item.getAttribute('data-tooltip-color'));
                    self.positionTooltip(item, item.getAttribute('data-tooltip-placement'));
                    self.showTooltip(true);
                };

                item.onmouseout = function () {
                    self.showTooltip(false);
                };
            }
        });
    }

    buildMaxWidth() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$tooltip.style.maxWidth = this.windowWidth - (this.space * 2);
    }

    showTooltip(action) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), action); /*endRemoveIf(production)*/
        if (action) {
            this.$tooltip.classList.add('tooltip-show');
        } else {
            this.$tooltip.classList.remove('tooltip-show');
        }
    }

    positionTooltipSwitchDirection(placement) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), placement); /*endRemoveIf(production)*/
        let direction = typeof placement === 'undefined' ? 'top' : placement;

        switch (direction) {
            case 'top':
                if ((this.elementTop - this.tooltipHeight) < (this.currentWindowScroll)) {
                    direction = 'bottom';
                }
                break;
            case 'right':
                if ((this.elementLeft + this.tooltipWidth + this.elementWidth) > this.windowWidth) {
                    direction = 'left';
                }
                break;
            case 'bottom':
                if ((this.elementTop + this.tooltipHeight + this.elementHeight) > (this.currentWindowScroll + this.windowHeight)) {
                    direction = 'top';
                }
                break;
            case 'left':
                if ((this.tooltipWidth + this.space) > this.elementLeft) {
                    direction = 'right';
                }
                break;
        }

        return direction;
    }

    positionTooltipTop() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.positionTop = this.elementTop - this.tooltipHeight - this.space;
        this.positionLeft = this.elementLeft - this.centerWidth;
    }

    positionTooltipBottom() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.positionTop = this.elementTop + this.elementHeight + this.space;
        this.positionLeft = this.elementLeft - this.centerWidth;
    }

    positionTooltipRight() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.positionTop = this.elementTop + this.centerHeight;
        this.positionLeft = this.elementLeft + this.elementWidth + this.space;
    }

    positionTooltipLeft() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.positionTop = this.elementTop + this.centerHeight;
        this.positionLeft = this.elementLeft - this.tooltipWidth - this.space;
    }

    positionTooltip(element, placement) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), [element, placement]);
        this.updateVariable(element);

        let direction = this.positionTooltipSwitchDirection(placement);

        switch (direction) {
            case 'top':
                this.positionTooltipTop();
                break;
            case 'right':
                this.positionTooltipRight();
                break;
            case 'bottom':
                this.positionTooltipBottom();
                break;
            case 'left':
                this.positionTooltipLeft();
                break;
        }

        this.changeArrowDirection(direction);
        this.buildLimits();
        this.$tooltip.style.top = this.positionTop + 'px';
        this.$tooltip.style.left = this.positionLeft + 'px';

        if (direction === 'top' || direction === 'bottom') {
            this.changeArrowPositionHorizontal();
        } else {
            this.changeArrowPositionVertical();
        }
    }

    buildLimits() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        if (this.positionLeft <= 0) {
            this.positionLeft = this.space;
        }

        if (this.positionLeft + this.tooltipWidth >= this.windowWidth) {
            this.positionLeft = this.windowWidth - this.tooltipWidth - this.space;
        }
    }

    changeArrowPositionHorizontal() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$tooltipPointer.style.left = this.$tooltip.offsetWidth / 2 + 'px';
    }

    changeArrowPositionVertical() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$tooltipPointer.style.left = '';
    }

    changeArrowDirection(direction) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), direction); /*endRemoveIf(production)*/
        this.$tooltipPointer.classList.remove('tooltip-direction-top');
        this.$tooltipPointer.classList.remove('tooltip-direction-bottom');
        this.$tooltipPointer.classList.remove('tooltip-direction-left');
        this.$tooltipPointer.classList.remove('tooltip-direction-right');
        this.$tooltipPointer.classList.add('tooltip-direction-' + direction);
    }

    changeLayout(style) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), style); /*endRemoveIf(production)*/
        let newStyle = typeof style === 'undefined' ? newStyle = this.style : style;

        this.$tooltip.removeAttribute('class');
        this.$tooltip.classList.add('tooltip');
        this.$tooltip.classList.add('tooltip-' + newStyle);
    }

    reset() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let element = document.getElementById('tooltip');

        element.parentNode.removeChild(element);
        objWfTooltip.build();
    }
}