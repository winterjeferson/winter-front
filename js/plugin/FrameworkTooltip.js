class FrameworkTooltip {
    constructor() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$window = $(window);
        this.$body = $('body');
        this.$tooltip = '';
        this.$tooltipBody = '';
        this.$tooltipPointer = '';

        this.style = 'black';
        this.space = 5;
        this.elementTop = 0;
        this.elementLeft = 0;
        this.elementWidth = 0;
        this.elementHeight = 0;
        this.elementLeft = 0;
        this.tooltipWidth = 0;
        this.tooltipHeight = 0;
        this.currentWindowScroll = 0;
        this.windowWidth = 0;
        this.windowHeight = 0;
        this.centerWidth = 0;
        this.centerHeight = 0;
        this.positionTop = 0;
        this.positionLeft = 0;
    }

    start() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.buildHtml();
        this.updateVariable(false);
        this.buildMaxWidth();
        this.buildResize();
        this.buildTooltip();
        this.buildAjax();
    }

    buildHtml() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let concat = '';

        concat += '<div id="tooltip">';
        concat += '    <div id="tooltip_body"></div>';
        concat += '    <div id="tooltip_pointer"></div>';
        concat += '</div>';

        this.$body.prepend(concat);

        this.$tooltip = $('#tooltip');
        this.$tooltipBody = $('#tooltip_body');
        this.$tooltipPointer = $('#tooltip_pointer');
    }

    buildAjax() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        $(document).ajaxSuccess(function () {
            self.buildTooltip();
        });
    }

    buildResize() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        this.$window.resize(function () {
            self.updateVariable(false);
            self.buildMaxWidth();
        });
    }

    buildTooltip() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        self.showTooltip(false);

        $('.has-tooltip').each(function () {
            let element = $(this);
            let attr = element.attr('title');

            if (typeof attr !== 'undefined' && attr !== null && attr !== '') {
                element.attr('data-tooltip-text', attr);
                element.removeAttr('title');

                element.hover(function () {
                    self.$tooltipBody.html(element.attr('data-tooltip-text'));
                    self.changeLayout(element.attr('data-tooltip-color'));
                    self.positionTooltip(element, element.attr('data-tooltip-placement'));
                    self.showTooltip(true);
                }, function () {
                    self.showTooltip(false);
                });
            }
        });
    }

    buildMaxWidth() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$tooltip.css('max-width', this.windowWidth - (this.space * 2));
    }

    showTooltip(action) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), action); /*endRemoveIf(production)*/
        if (action) {
            this.$tooltip.addClass('tooltip-show');
        } else {
            this.$tooltip.removeClass('tooltip-show');
        }
    }

    updateVariable(element) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), element); /*endRemoveIf(production)*/
        this.windowWidth = this.$window.width();
        this.windowHeight = this.$window.height();
        this.currentWindowScroll = this.$window.scrollTop();

        this.elementTop = element !== false ? element.offset().top : 0;
        this.elementLeft = element !== false ? element.offset().left : 0;
        this.elementWidth = element !== false ? element.outerWidth(true) : 0;
        this.elementHeight = element !== false ? element.outerHeight(true) : 0;

        this.tooltipWidth = this.$tooltip.outerWidth(true);
        this.tooltipHeight = this.$tooltip.outerHeight(true);

        this.centerWidth = (this.tooltipWidth - this.elementWidth) / 2;
        this.centerHeight = (this.elementHeight / 2) - (this.tooltipHeight / 2);

        this.positionLeft = this.elementLeft - this.centerWidth;
        this.positionTop = this.elementTop - this.tooltipHeight - this.space;
    }

    positionTooltipSwitchDirection(placement) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), placement); /*endRemoveIf(production)*/
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
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.positionTop = this.elementTop - this.tooltipHeight - this.space;
        this.positionLeft = this.elementLeft - this.centerWidth;
    }

    positionTooltipBottom() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.positionTop = this.elementTop + this.elementHeight + this.space;
        this.positionLeft = this.elementLeft - this.centerWidth;
    }

    positionTooltipRight() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.positionTop = this.elementTop + this.centerHeight;
        this.positionLeft = this.elementLeft + this.elementWidth + this.space;
    }

    positionTooltipLeft() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.positionTop = this.elementTop + this.centerHeight;
        this.positionLeft = this.elementLeft - this.tooltipWidth - this.space;
    }

    positionTooltip(element, placement) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), [element, placement]);
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
        this.$tooltip.css('top', this.positionTop).css('left', this.positionLeft);

        if (direction === 'top' || direction === 'bottom') {
            this.changeArrowPositionHorizontal();
        } else {
            this.changeArrowPositionVertical();
        }
    }

    buildLimits() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        if (this.positionLeft <= 0) {
            this.positionLeft = this.space;
        }

        if (this.positionLeft + this.tooltipWidth >= this.windowWidth) {
            this.positionLeft = this.windowWidth - this.tooltipWidth - this.space;
        }
    }

    changeArrowPositionHorizontal() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$tooltipPointer.css('left', this.elementLeft - this.$tooltipBody.position().left - this.$tooltip.position().left + (this.elementWidth / 2));
    }

    changeArrowPositionVertical() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$tooltipPointer.css('left', '');
    }

    changeArrowDirection(direction) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), direction); /*endRemoveIf(production)*/
        this.$tooltipPointer.removeClass('tooltip-direction-top').removeClass('tooltip-direction-bottom').removeClass('tooltip-direction-left').removeClass('tooltip-direction-right').addClass('tooltip-direction-' + direction);
    }

    changeLayout(style) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), style); /*endRemoveIf(production)*/
        let newStyle = typeof style === 'undefined' ? newStyle = this.style : style;

        this.$tooltip.removeAttr("class").addClass("tooltip tooltip-" + newStyle);
    }
}