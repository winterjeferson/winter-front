class FrameworkModal {
    constructor() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$body = $('body');
        this.$modal = '';
        this.$modalFooter = '';
        this.$modalFooterConfirm = '';
        this.$modalFooterCancel = '';
        this.$modalTitle = '';
        this.$modalClose = '';
        this.$modalContent = '';
        this.$modalBox = '';
        this.$modalNavigationArrow = '';
        this.$modalNavigationArrowLeft = '';
        this.$modalNavigationArrowRight = '';

        this.targetBuildGalleryChange = '';
        this.cssDisplay = 'display-none';
    }

    updateVariable() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$modal = $('#modal');
        this.$modalFooter = this.$modal.find('footer');
        this.$modalFooterConfirm = this.$modalFooter.find('[data-id="confirm"]');
        this.$modalFooterCancel = this.$modalFooter.find('[data-id="cancel"]');
        this.$modalTitle = this.$modal.find('.page-title');
        this.$modalClose = $('#modal_close');
        this.$modalContent = $('#modal_content');
        this.$modalBox = this.$modal.find('.modal-box');
        this.$modalNavigationArrow = this.$modal.find('.navigation-arrow');
        this.$modalNavigationArrowLeft = this.$modalNavigationArrow.find('[data-id="nav-left"]');
        this.$modalNavigationArrowRight = this.$modalNavigationArrow.find('[data-id="nav-right"]');
    }

    buildHtml() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let string = '';

        string += '<div id="modal" class="modal-close">';
        string += '     <div class="modal-box">';
        string += '         <header>';
        string += '             <button id="modal_close" type="button" aria-label="' + objFrameworkTranslation.translation.default.close + '" class="bt bt-sm bt-grey bt-transparent">';
        string += '                 <span class="fa fa-times" aria-hidden="true"></span>';
        string += '             </button>';
        string += '         </header>';
        string += '         <div class="row">';
        string += '             <div id="modal_content" class="col-es-12"></div>';
        string += '         </div>';
        string += '         <div class="menu-horizontal">';
        string += '             <ul class="navigation-arrow">';
        string += '                 <li>';
        string += '                     <button type="button" class="bt bt-bi" data-id="nav-left" aria-label="' + objFrameworkTranslation.translation.default.previous + '" >';
        string += '                         <span class="fa fa-angle-left" aria-hidden="true"></span>';
        string += '                     </button>';
        string += '                 </li>';
        string += '                 <li>';
        string += '                     <button type="button" class="bt bt-bi" data-id="nav-right" aria-label="' + objFrameworkTranslation.translation.default.next + '" >';
        string += '                         <span class="fa fa-angle-right" aria-hidden="true"></span>';
        string += '                     </button>';
        string += '                 </li>';
        string += '             </ul>';
        string += '         </div>';
        string += '         <footer class="display-none text-center">';
        string += '             <nav class="menu menu-horizontal">';
        string += '                 <ul>';
        string += '                     <li>';
        string += '                         <button type="button" class="bt bt-re bt-green" data-id="confirm"></button>';
        string += '                     </li>';
        string += '                     <li>';
        string += '                         <button type="button" class="bt bt-re bt-grey" data-id="cancel"></button>';
        string += '                     </li>';
        string += '                 </ul>';
        string += '             </nav>';
        string += '         </footer>';
        string += '     </div>';
        string += '</div>';

        this.$body.prepend(string);
        this.updateVariable();
    }

    buildTranslation() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        $(this.$modalFooterConfirm).html(objFrameworkTranslation.translation.default.confirm);
        $(this.$modalFooterCancel).html(objFrameworkTranslation.translation.default.cancel);
    }

    buildMenu() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;
        let $arrowLeft = $('[data-id="nav-left"]');
        let $arrowRight = $('[data-id="nav-right"]');

        this.$modalClose.click(function () {
            self.closeModal();
        });

        $(document).keyup(function (e) {
            if (e.keyCode === 27) {
                self.closeModal();
            }
        });

        $(document).keyup(function (e) {
            if (e.keyCode === 37) {
                if ($arrowLeft.hasClass(self.cssDisplay)) {
                    return false;
                } else {
                    $arrowLeft.click();
                }
            }
        });

        $(document).keyup(function (e) {
            if (e.keyCode === 39) {
                if ($arrowRight.hasClass(self.cssDisplay)) {
                    return false;
                } else {
                    $arrowRight.click();
                }
            }
        });

        $(document).click(function (event) {
            if (!$(event.target).closest('button, a').length) {
                self.closeModal();
            }
        });

        $('.gallery').find('a').on('click', function (event) {
            event.preventDefault();
            self.buildModal('gallery', false, 'fu');
            self.buildContentStatic($(this).attr('href'), $(this).find('img').attr('alt'), $(this).find('img').attr('data-description'));
            self.buildGalleryNavigation(this);
        });

        this.$modalNavigationArrowLeft.click(function () {
            $(self.targetBuildGalleryChange).parent().prev().find('a').click();
        });

        this.$modalNavigationArrowRight.click(function () {
            $(self.targetBuildGalleryChange).parent().next().find('a').click();
        });

        this.$modalFooter.find('[data-id="cancel"]').click(function () {
            self.closeModal();
        });

        this.$modal.find('.modal-box').on('click', function (event) {
            event.stopPropagation();
        });
    }

    buildGalleryNavigation(target) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), target); /*endRemoveIf(production)*/
        let verifySiblings = $(target).parent().siblings().find('a').length;
        let currentPosition = $(target).parent().parent().find('a').index(target);

        if (verifySiblings > 0) {
            this.$modalNavigationArrow.removeClass(this.cssDisplay);
            this.targetBuildGalleryChange = target;

            if (currentPosition <= 0) {
                this.$modalNavigationArrowLeft.addClass(this.cssDisplay);
            } else {
                this.$modalNavigationArrowLeft.removeClass(this.cssDisplay);
            }

            if (currentPosition >= verifySiblings) {
                this.$modalNavigationArrowRight.addClass(this.cssDisplay);
            } else {
                this.$modalNavigationArrowRight.removeClass(this.cssDisplay);
            }

        } else {
            this.$modalNavigationArrow.addClass(this.cssDisplay);
        }
    }

    buildModal(kind, content, size = 're', action = 'open') {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), [kind, content, size, action]); /*endRemoveIf(production)*/
        this.$modalFooter.addClass(this.cssDisplay);
        action === 'open' ? this.openModal() : this.closeModal();
        this.buildModalSize(size);
        this.buildModalKind(kind, content);
    }

    buildModalKind(kind, content) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), [kind, content]); /*endRemoveIf(production)*/
        switch (kind) {
            case 'ajax':
                this.buildContentAjax(content);
                this.$modalNavigationArrow.removeClass('arrow-active').addClass('arrow-inactive');
                break;
            case 'gallery':
                this.$modalNavigationArrow.removeClass('arrow-inactive').addClass('arrow-active');
                break;
            case 'confirmation':
                this.$modalNavigationArrow.removeClass('arrow-active').addClass('arrow-inactive');
                this.buildContentConfirmation(content);
                break;
            default:
                this.$modalNavigationArrow.removeClass('arrow-active').addClass('arrow-inactive');
                break;
        }
    }

    openModal() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$modalContent.empty();
        this.$body
                .removeClass('overflow-y')
                .addClass('overflow-hidden')
                .css('overflow-y', 'hidden');
        this.$modal.removeClass('modal-close');
        this.$modalBox.addClass('modal-animate');
    }

    closeModal() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$body.addClass('overflow-y').removeClass('overflow-hidden').css('overflow-y', 'auto').css('position', 'relative');
        this.$modal.addClass('modal-close');
        this.$modalBox.removeClass('modal-animate');
        this.$modalContent.empty();

        if (typeof objFrameworkMenuDropDown !== 'undefined') {
            objFrameworkMenuDropDown.buildMenu();
        }

        if (typeof objFrameworkMenuTab !== 'undefined') {
            objFrameworkMenuTab.defineActive();
        }
    }

    buildModalSize(size = 're') {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), size); /*endRemoveIf(production)*/
        this.$modalBox
                .removeClass('modal-es')
                .removeClass('modal-sm')
                .removeClass('modal-re')
                .removeClass('modal-bi')
                .removeClass('modal-eb')
                .removeClass('modal-fu')
                .addClass('modal-' + size);
    }

    buildContentAjax(target) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), target); /*endRemoveIf(production)*/
        let self = this;

        this.$modalContent.append(objFrameworkLayout.buildSpinner('white'));

        return $.ajax({
            url: target,
            success: function (data) {
                self.$modalContent.empty();
                self.$modalContent.append(data);
                objFrameworkLayout.buildToggle();
                objFrameworkForm.buildInputFile();

                if (typeof objFrameworkMenuDropDown !== 'undefined') {
                    objFrameworkMenuDropDown.buildStyle();
                    objFrameworkMenuDropDown.buildMenu();
                }

                if (typeof objFrameworkMenuTab !== 'undefined') {
                    objFrameworkMenuTab.defineActive();
                }
            }
        });
    }

    buildContentStatic(image, title, description) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), [image, title, description]); /*endRemoveIf(production)*/
        let stringImage = '<img src="' + image + '" class="img-responsive" style="margin:auto;" title="" alt=""/>';

        this.$modalContent.empty();
        this.$modalContent.append(stringImage);
        this.changeText(title, description);
    }

    buildContentConfirmation(content) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), content); /*endRemoveIf(production)*/
        this.$modalFooter.removeClass(this.cssDisplay);
        this.$modalContent.html('<div class="padding-re text-center">' + content + '</div>');
    }

    buildContentConfirmationAction(action) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), action); /*endRemoveIf(production)*/
        this.$modalFooterConfirm.attr('onclick', action);
    }

    changeText(title, description) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), [title, description]); /*endRemoveIf(production)*/
        let string = '';

        if (description === '') {
            return false;
        }

        string += '<p class="modal-description">';
        string += description;
        string += '</p>';

        if (typeof description !== typeof undefined) {
            this.$modalContent.append(string);
        }

        this.$modalTitle.text(title);
    }
}