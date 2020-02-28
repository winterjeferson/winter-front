class Modal {
    constructor() {
        /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$body = document.querySelector('body');

        this.targetBuildGalleryChange = '';
        this.cssDisplay = 'display-none';
    }

    updateVariable() {
        /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$modal = document.querySelector('#modal');
        this.$modalFooter = this.$modal.querySelector('footer');
        this.$modalFooterConfirm = this.$modalFooter.querySelector('[data-id="confirm"]');
        this.$modalFooterCancel = this.$modalFooter.querySelector('[data-id="cancel"]');
        this.$modalClose = document.querySelector('#modal_close');
        this.$modalContent = document.querySelector('#modal_content');
        this.$modalBox = this.$modal.querySelector('.modal-box');
        this.$modalNavigationArrow = this.$modal.querySelector('.navigation-arrow');
        this.$modalNavigationArrowLeft = this.$modalNavigationArrow.querySelector('[data-id="nav-left"]');
        this.$modalNavigationArrowRight = this.$modalNavigationArrow.querySelector('[data-id="nav-right"]');
        this.$gallery = document.querySelectorAll('.gallery');
    }

    build() {
            /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName()); /*endRemoveIf(production)*/
        this.buildHtml();
        this.updateVariable();
        this.buildMenu();
        this.buildMenuGallery();
        this.buildKeyboard();
        this.buildTranslation();
    }

    buildHtml() {
        /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName()); /*endRemoveIf(production)*/
        let string = '';

        string += '<div id="modal" class="modal-close">';
        string += '     <div class="modal-box">';
        string += '         <header>';
        string += '             <button id="modal_close" type="button" aria-label="' + objTranslation.translation.default.close + '" class="bt bt-sm bt-grey bt-transparent">';
        string += '                 <span class="fa fa-times" aria-hidden="true"></span>';
        string += '             </button>';
        string += '         </header>';
        string += '         <div class="row">';
        string += '             <div id="modal_content" class="col-es-12"></div>';
        string += '         </div>';
        string += '         <div class="menu-horizontal">';
        string += '             <ul class="navigation-arrow">';
        string += '                 <li>';
        string += '                     <button type="button" class="bt bt-bi" data-id="nav-left" aria-label="' + objTranslation.translation.default.previous + '" >';
        string += '                         <span class="fa fa-angle-left" aria-hidden="true"></span>';
        string += '                     </button>';
        string += '                 </li>';
        string += '                 <li>';
        string += '                     <button type="button" class="bt bt-bi" data-id="nav-right" aria-label="' + objTranslation.translation.default.next + '" >';
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

        this.$body.insertAdjacentHTML('afterbegin', string);
    }

    buildTranslation() {
        /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$modalFooterConfirm.innerHTML = objTranslation.translation.default.confirm;
        this.$modalFooterCancel.innerHTML = objTranslation.translation.default.cancel;
    }

    buildKeyboard() {
        /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        window.addEventListener('keyup', function (event) {
            if (event.keyCode === 27) {
                self.closeModal();
            }

            if (event.keyCode === 37) {
                if (self.$modalNavigationArrowLeft.classList.contains(self.cssDisplay)) {
                    return;
                } else {
                    self.$modalNavigationArrowLeft.click();
                }
            }

            if (event.keyCode === 39) {
                if (self.$modalNavigationArrowRight.classList.contains(self.cssDisplay)) {
                    return;
                } else {
                    self.$modalNavigationArrowRight.click();
                }
            }
        })
    }

    buildMenuGallery() {
        /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        if (!this.$gallery) {
            return;
        }

        Array.prototype.forEach.call(this.$gallery, function (item) {
            let button = item.querySelectorAll('a');

            Array.prototype.forEach.call(button, function (itemBt) {
                itemBt.addEventListener('click', function (event) {
                    event.preventDefault();
                    self.buildModal('gallery', false, 'fu');
                    self.buildGalleryImage(itemBt.getAttribute('href'), itemBt.querySelector('img').getAttribute('data-description'));
                    self.buildGalleryNavigation(itemBt);
                });
            });
        });

        this.$modalNavigationArrowLeft.addEventListener('click', function () {
            self.targetBuildGalleryChange.parentNode.previousElementSibling.querySelector('a').click();
        });

        this.$modalNavigationArrowRight.addEventListener('click', function () {
            self.targetBuildGalleryChange.parentNode.nextElementSibling.querySelector('a').click();
        });
    }

    buildMenu() {
        /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        this.$modalClose.addEventListener('click', function () {
            self.closeModal();
        });

        document.addEventListener('click', function (event) {
            var isButton = event.target.matches('button *, a *');

            if (isButton) {
                return;
            }

            // self.closeModal();
        });

        this.$modalFooter.querySelector('[data-id="cancel"]').addEventListener('click', function (event) {
            self.closeModal();
        });

        this.$modal.querySelector('.modal-box').addEventListener('click', function (event) {
            event.stopPropagation();
        });
    }

    buildGalleryNavigation(target) {
        /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName(), target); /*endRemoveIf(production)*/
        let array = [];
        let currentGallery = target.parentNode.parentNode;
        let siblingLength = currentGallery.querySelectorAll('a').length - 1;

        Array.prototype.forEach.call(currentGallery.querySelectorAll('a'), function (item) {
            array.push(item);
        });

        let currentPosition = array.indexOf(target);

        if (siblingLength > 0) {
            this.$modalNavigationArrow.classList.remove(this.cssDisplay);
            this.targetBuildGalleryChange = target;

            if (currentPosition <= 0) {
                this.$modalNavigationArrowLeft.classList.add(this.cssDisplay);
            } else {
                this.$modalNavigationArrowLeft.classList.remove(this.cssDisplay);
            }

            if (currentPosition >= siblingLength) {
                this.$modalNavigationArrowRight.classList.add(this.cssDisplay);
            } else {
                this.$modalNavigationArrowRight.classList.remove(this.cssDisplay);
            }

        } else {
            this.$modalNavigationArrow.classList.add(this.cssDisplay);
        }
    }

    buildModal(kind, content, size = 're', action = 'open') {
        /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName(), [kind, content, size, action]); /*endRemoveIf(production)*/
        this.$modalFooter.classList.add(this.cssDisplay);
        action === 'open' ? this.openModal() : this.closeModal();
        this.buildModalSize(size);
        this.buildModalKind(kind, content);
    }

    buildModalKind(kind, content) {
        /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName(), [kind, content]); /*endRemoveIf(production)*/

        if (kind === 'ajax') {
            this.buildContentAjax(content);
        }

        if (kind === 'confirmation') {
            this.buildContentConfirmation(content);
        }

        switch (kind) {
            case 'gallery':
                this.$modalNavigationArrow.classList.remove('arrow-inactive');
                this.$modalNavigationArrow.classList.add('arrow-active');
                break;
            default:
                this.$modalNavigationArrow.classList.remove('arrow-active');
                this.$modalNavigationArrow.classList.add('arrow-inactive');
                break;
        }
    }

    openModal() {
        /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$body.classList.remove('overflow-y');
        this.$body.classList.add('overflow-hidden');
        this.$body.style.overflowY = 'hidden';
        this.$modal.classList.remove('modal-close');
        this.$modalBox.classList.add('modal-animate');
    }

    closeModal() {
        /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$body.classList.add('overflow-y');
        this.$body.classList.remove('overflow-hidden');
        this.$body.style.overflowY = 'auto';
        this.$body.style.position = 'relative';
        this.$modal.classList.add('modal-close');
        this.$modalBox.classList.remove('modal-animate');

        if (typeof objMenuDropDown !== 'undefined') {
            objMenuDropDown.build();
        }

        if (typeof objMenuTab !== 'undefined') {
            objMenuTab.defineActive();
        }
    }

    buildModalSize(size = 're') {
        /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName(), size); /*endRemoveIf(production)*/
        this.$modalBox.classList.remove('modal-es');
        this.$modalBox.classList.remove('modal-sm');
        this.$modalBox.classList.remove('modal-re');
        this.$modalBox.classList.remove('modal-bi');
        this.$modalBox.classList.remove('modal-eb');
        this.$modalBox.classList.remove('modal-fu');
        this.$modalBox.classList.add('modal-' + size);
    }

    buildContentAjax(target) {
        /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName(), target); /*endRemoveIf(production)*/
        let self = this;
        let ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                self.buildContentAjaxSuccess(this.responseText);
            }
        };

        ajax.open('POST', target, true);
        ajax.send();
    }

    buildContentAjaxSuccess(data) {
        /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$modalContent.innerHTML = data;

        if (typeof objLayout !== 'undefined') {
            objLayout.buildToggle();
        }

        if (typeof objForm !== 'undefined') {
            objForm.buildInputFile();
        }

        if (typeof objMenuDropDown !== 'undefined') {
            objMenuDropDown.build();
        }

        if (typeof objTooltip !== 'undefined') {
            objTooltip.build();
        }

        if (typeof objMenuTab !== 'undefined') {
            objMenuTab.defineActive();
        }
    }

    buildGalleryImage(image, description) {
        /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName(), [image, description]); /*endRemoveIf(production)*/
        let stringImage = '<img src="' + image + '" class="img-responsive" style="margin:auto;" title="" alt=""/>';

        this.$modalContent.innerHTML = stringImage;
        this.changeText(description);
    }

    buildContentConfirmation(content) {
        /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName(), content); /*endRemoveIf(production)*/
        let string = '<div class="padding-re text-center">' + content + '</div>';

        this.$modalFooter.classList.remove(this.cssDisplay);
        this.$modalContent.innerHTML = string;
    }

    buildContentConfirmationAction(action) {
        /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName(), action); /*endRemoveIf(production)*/
        this.$modalFooterConfirm.setAttribute('onclick', action);
    }

    changeText(description) {
        /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName(), [description]); /*endRemoveIf(production)*/
        let string = '';

        if (description === '') {
            return false;
        }

        string += '<p class="modal-description">';
        string += description;
        string += '</p>';

        if (typeof description !== typeof undefined) {
            this.$modalContent.insertAdjacentHTML('beforeend', string);
        }
    }
}