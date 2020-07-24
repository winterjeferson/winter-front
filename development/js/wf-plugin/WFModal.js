class WfModal {
    updateVariable() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.targetBuildGalleryChange = '';
        this.cssDisplay = 'display-none';
        this.isModalOpen = false;

        this.$body = document.querySelector('body');
        this.$modal = document.querySelector('#modal');
        this.$modalFooter = this.$modal.querySelector('footer');
        this.$modalFooterConfirm = this.$modalFooter.querySelector('[data-id="confirm"]');
        this.$modalFooterCancel = this.$modalFooter.querySelector('[data-id="cancel"]');
        this.$modalClose = document.querySelector('#modalClose');
        this.$modalContent = document.querySelector('#modalContent');
        this.$modalBox = this.$modal.querySelector('.modal-box');
        this.$modalNavigationArrow = this.$modal.querySelector('.navigation-arrow');
        this.$modalNavigationArrowLeft = this.$modalNavigationArrow.querySelector('[data-id="navLeft"]');
        this.$modalNavigationArrowRight = this.$modalNavigationArrow.querySelector('[data-id="navRight"]');
        this.$gallery = document.querySelectorAll('.gallery');
    }

    build() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.buildHtml();
        this.updateVariable();
        this.buildMenu();
        this.buildMenuGallery();
        this.buildKeyboard();
        this.buildTranslation();
    }

    buildHtml() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let string = `
            <div id="modal" class="modal-close">
                <div class="modal-box">
                    <header>
                        <button id="modalClose" type="button" aria-label="${objWfTranslation.translation.close}" class="bt bt-sm bt-grey bt-transparent">
                            <svg class="icon icon-bi rotate-45">
                                <use xlink:href="./assets/img/icon.svg#plus"></use>
                            </svg>
                        </button>
                    </header>
                    <div class="row">
                        <div id="modalContent" class="col-es-12"></div>
                    </div>
                    <div class="menu-horizontal">
                        <ul class="navigation-arrow">
                            <li>
                                <button type="button" class="bt bt-bi" data-id="navLeft" aria-label="${objWfTranslation.translation.previous}" >
                                    <svg class="icon icon-eb">
                                        <use xlink:href="./assets/img/icon.svg#previous"></use>
                                    </svg>
                                </button>
                            </li>
                            <li>
                                <button type="button" class="bt bt-bi" data-id="navRight" aria-label="${objWfTranslation.translation.next}" >
                                    <svg class="icon icon-eb rotate-180">
                                        <use xlink:href="./assets/img/icon.svg#previous"></use>
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <footer class="display-none text-center">
                        <div class="menu menu-horizontal">
                            <ul>
                                <li>
                                    <button type="button" class="bt bt-re bt-green" data-id="confirm"></button>
                                </li>
                                <li>
                                    <button type="button" class="bt bt-re bt-grey" data-id="cancel"></button>
                                </li>
                            </ul>
                        </div>
                    </footer>
                </div>
            </div>
        `;

        document.querySelector('body').insertAdjacentHTML('afterbegin', string);
    }

    buildTranslation() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$modalFooterConfirm.innerHTML = objWfTranslation.translation.confirm;
        this.$modalFooterCancel.innerHTML = objWfTranslation.translation.cancel;
    }

    buildKeyboard() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        window.addEventListener('keyup', function (event) {
            if (event.keyCode === 27) {
                if (self.isModalOpen) {
                    self.closeModal();
                }
            }

            if (event.keyCode === 37) {
                if (!self.isModalOpen) {
                    return;
                }
                if (self.$modalNavigationArrowLeft.classList.contains(self.cssDisplay)) {
                    return;
                } else {
                    self.$modalNavigationArrowLeft.click();
                }
            }

            if (event.keyCode === 39) {
                if (!self.isModalOpen) {
                    return;
                }
                if (self.$modalNavigationArrowRight.classList.contains(self.cssDisplay)) {
                    return;
                } else {
                    self.$modalNavigationArrowRight.click();
                }
            }
        })
    }

    buildMenuGallery() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
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
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        this.$modalClose.addEventListener('click', function () {
            self.closeModal();
        });

        document.addEventListener('click', function (event) {
            var isButton = event.target.matches('button *, a *');

            if (isButton) {
                return;
            }
        });

        this.$modalFooter.querySelector('[data-id="cancel"]').addEventListener('click', function (event) {
            self.closeModal();
        });
    }

    buildGalleryNavigation(target) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), target); /*endRemoveIf(production)*/
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
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), [kind, content, size, action]); /*endRemoveIf(production)*/
        this.$modalFooter.classList.add(this.cssDisplay);
        action === 'open' ? this.openModal() : this.closeModal();
        this.buildModalSize(size);
        this.buildModalKind(kind, content);
    }

    buildModalKind(kind, content) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), [kind, content]); /*endRemoveIf(production)*/

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
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.isModalOpen = true;

        this.$body.classList.remove('overflow-y');
        this.$body.classList.add('overflow-hidden');
        this.$body.style.overflowY = 'hidden';
        this.$modal.classList.remove('modal-close');
        this.$modalBox.classList.add('modal-animate');
    }

    closeModal() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.isModalOpen = false;

        this.$body.classList.add('overflow-y');
        this.$body.classList.remove('overflow-hidden');
        this.$body.style.overflowY = 'auto';
        this.$body.style.position = 'relative';
        this.$modal.classList.add('modal-close');
        this.$modalBox.classList.remove('modal-animate');

        this.resetOtherClass();
    }

    buildModalSize(size = 're') {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), size); /*endRemoveIf(production)*/
        this.$modalBox.classList.remove('modal-es');
        this.$modalBox.classList.remove('modal-sm');
        this.$modalBox.classList.remove('modal-re');
        this.$modalBox.classList.remove('modal-bi');
        this.$modalBox.classList.remove('modal-eb');
        this.$modalBox.classList.remove('modal-fu');
        this.$modalBox.classList.add('modal-' + size);
    }

    buildContentAjax(target) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), target); /*endRemoveIf(production)*/
        let self = this;
        let ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                self.$modalContent.innerHTML = this.responseText;
                self.resetOtherClass();
            }
        };

        ajax.open('GET', target, true);
        ajax.send();
    }

    buildGalleryImage(image, description) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), [image, description]); /*endRemoveIf(production)*/
        let stringImage = '<img src="' + image + '" class="img-responsive" style="margin:auto;" title="" alt=""/>';

        this.$modalContent.innerHTML = stringImage;
        this.changeText(description);
    }

    buildContentConfirmation(content) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), content); /*endRemoveIf(production)*/
        let string = '<div class="padding-re text-center">' + content + '</div>';

        this.$modalFooter.classList.remove(this.cssDisplay);
        this.$modalContent.innerHTML = string;
    }

    buildContentConfirmationAction(action) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), action); /*endRemoveIf(production)*/
        this.$modalFooterConfirm.setAttribute('onclick', action);
    }

    changeText(description) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName(), [description]); /*endRemoveIf(production)*/
        let string = '';

        if (description === '' || description === null) {
            return;
        }

        string += '<p class="modal-description">';
        string += description;
        string += '</p>';

        if (typeof description !== typeof undefined) {
            this.$modalContent.insertAdjacentHTML('beforeend', string);
        }
    }

    resetOtherClass() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/

        if (typeof objWfForm !== 'undefined') {
            objWfForm.buildInputFile();
        }

        if (typeof objWfMenuDropDown !== 'undefined') {
            objWfMenuDropDown.reset();
        }

        if (typeof objWfMenuToggle !== 'undefined') {
            objWfMenuToggle.build();
        }

        if (typeof objWfTooltip !== 'undefined') {
            objWfTooltip.reset();
        }

        if (typeof objWfMenuTab !== 'undefined') {
            objWfMenuTab.defineActive();
        }

        if (typeof objWfLazyLoad !== 'undefined') {
            objWfLazyLoad.build();
        }
    }
}