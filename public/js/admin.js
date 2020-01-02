class FrameworkAdmin {
    constructor() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, 'constructor'); /*endRemoveIf(production)*/
        this.pageCurrent = '';
    }

    applyClass() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.updateVariable();
        this.buildMenu();
        this.buildMenuDifeneActive();
        this.builTableTdWrapper();
    }

    updateVariable() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$page = $('#admin');
        this.$menuMain = this.$page.find('[data-id="menu_main"]');
        this.$btPage = this.$page.find('[data-id="bt_page"]');
        this.$btBlog = this.$page.find('[data-id="bt_blog"]');
        this.$btLogout = this.$page.find('[data-id="bt_logout"]');
    }

    buildMenu() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        this.$menuMain.find('.bt').on('click', function () {
            let dataId = $(this).attr('data-id');

            self.buildMenuChangePage(dataId.substring(3));
        });

        this.$btLogout.on('click', function () {
            self.buildLogout();
        });
    }

    buildMenuChangePage(page) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.buildMenuDifeneActive(page);

        if (page !== 'logout') {
            window.location.href = 'admin/index.php?p=' + page;
        }
    }

    buildMenuDifeneActive() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let classActive = 'menu-tab-active';
        let page = objFrameworkLayout.getUrlParameter('p');

        this.pageCurrent = page;
        this.$menuMain.find('.bt').parent().removeClass(classActive);
        this.$menuMain.find('[data-id="bt_' + page + '"]').parent().addClass(classActive);
    }

    buildLogout() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        $.ajax({
            url: '../php/controller.php',
            data:
                    '&c=FrameworkLogin' +
                    '&m=doLogout',
            success: function (data) {
                switch (data) {
                    case'1':
                        window.location = 'admin/index.php';
                        break;
                }
            }
        });
    }

    builTableTdWrapper() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        $('.td-wrapper').unbind().on('click', function () {
            $(this).toggleClass('td-wrapper-auto');
        });
    }
}
class FrameworkAdminBlog {
    constructor() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, 'constructor'); /*endRemoveIf(production)*/
        this.isEdit = false;
        this.editId = 0;
    }

    applyClass() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.updateVariable();
        this.buildMenu();
        this.buildMenuTable();
        this.watchTitle();
    }

    updateVariable() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$table = objFrameworkAdmin.$page.find('.table');
        this.$tableActive = objFrameworkAdmin.$page.find('[data-id="table_active"]');
        this.$tableInactive = objFrameworkAdmin.$page.find('[data-id="table_inactive"]');
        this.$btRegister = objFrameworkAdmin.$page.find('[data-id="bt_register"]');
        this.$formRegister = objFrameworkAdmin.$page.find('[data-id="form_register"]');
        this.$formFieldTitle = objFrameworkAdmin.$page.find('[data-id="field_title"]');
        this.$formFieldUrl = objFrameworkAdmin.$page.find('[data-id="field_url"]');
        this.$formFieldContent = objFrameworkAdmin.$page.find('[data-id="field_content"]');
        this.$formFieldTag = objFrameworkAdmin.$page.find('[data-id="field_tag"]');
    }

    buildMenu() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        this.$btRegister.on('click', function () {
            if (self.isEdit) {
                self.editSave();
            } else {
                self.registerContent();
            }
        });
    }

    buildMenuTable() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        this.$table.find('.bt').unbind();

        this.$tableActive.find('[data-action="inactivate"]').on('click', function () {
            objFrameworkModal.buildModal('confirmation', 'Deseja realmente desativar este conteúdo?');
            objFrameworkModal.buildContentConfirmationAction('objFrameworkAdminBlog.modify(' + $(this).attr('data-id') + ', "inactivate")');
        });

        this.$tableInactive.find('[data-action="activate"]').on('click', function () {
            self.modify($(this).attr('data-id'), 'activate');
        });

        this.$table.find('[data-action="edit"]').on('click', function () {
            self.editId = $(this).attr('data-id');
            self.editLoadData(self.editId);
        });

        this.$table.find('[data-action="delete"]').on('click', function () {
            objFrameworkModal.buildModal('confirmation', 'Deseja realmente desativar este conteúdo?');
            objFrameworkModal.buildContentConfirmationAction('objFrameworkAdminBlog.delete(' + $(this).attr('data-id') + ')');
        });
    }

    editSave() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        if (this.validateForm()) {
            $.ajax({
                url: '../php/controller.php',
                data:
                        '&c=FrameworkAdminBlog' +
                        '&m=doUpdate' +
                        '&title=' + this.$formFieldTitle.val() +
                        '&url=' + this.$formFieldUrl.val() +
                        '&content=' + this.$formFieldContent.val() +
                        '&tag=' + this.$formFieldTag.val() +
                        '&id=' + self.editId,
                type: 'POST',
                success: function (data) {
                    self.showResponse(data);
                }
            });
        }
    }

    editLoadData(id) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        $.ajax({
            url: '../php/controller.php',
            data:
                    '&c=FrameworkAdminBlog' +
                    '&m=editLoadData' +
                    '&id=' + id,
            type: 'POST',
            success: function (data) {
                let obj = $.parseJSON(data);

                objTheme.doSlide(self.$formRegister);
                self.isEdit = true;
                self.editFillField(obj);
            }
        });
    }

    editFillField(json) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$formFieldTitle.val(json['title']);
        this.$formFieldUrl.val(json['url']);
        this.$formFieldContent.val(json['content']);
        this.$formFieldTag.val(json['tag']);

        this.editId = json['id'];
    }

    modify(id, status) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        $.ajax({
            url: '../php/controller.php',
            data:
                    '&c=FrameworkAdminBlog' +
                    '&m=doModify' +
                    '&s=' + status +
                    '&id=' + Number(id),
            type: 'POST',
            success: function (data) {

                self.showResponse(data);
            }
        });
    }

    delete(id) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        $.ajax({
            url: '../php/controller.php',
            data:
                    '&c=FrameworkAdminBlog' +
                    '&m=doDelete' +
                    '&id=' + Number(id),
            type: 'POST',
            success: function (data) {
                self.showResponse(data);
            }
        });
    }

    validateForm() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let arrField = [this.$formFieldTitle, this.$formFieldUrl, this.$formFieldContent, this.$formFieldTag];

        return objFrameworkForm.validateEmpty(arrField);
    }

    registerContent() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        if (this.validateForm()) {
            $.ajax({
                url: '../php/controller.php',
                data:
                        '&c=FrameworkAdminBlog' +
                        '&m=doRegister' +
                        '&title=' + this.$formFieldTitle.val() +
                        '&url=' + this.$formFieldUrl.val() +
                        '&content=' + this.$formFieldContent.val() +
                        '&tag=' + this.$formFieldTag.val(),
                type: 'POST',
                success: function (data) {
                    self.showResponse(data);
                }
            });
        }
    }

    showResponse(data) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let color = '';
        let response = '';

        switch (data) {
            case '1':
                location.reload();
                break;
            default:
                color = 'red';
                response = 'Acorreu um erro. Contate o administrador.';
                break;
        }

        objFrameworkNotification.addNotification(response, color);
    }

    watchTitle() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        this.$formFieldTitle.on('focusout', function () {
            let url = objFrameworkGeneric.buildURL(self.$formFieldTitle.val());

            self.$formFieldUrl.val(url);
        });
    }
}
class FrameworkAdminPage {
    constructor() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, 'constructor'); /*endRemoveIf(production)*/
    }

    applyClass() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.updateVariable();
    }

    updateVariable() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
    }
}
class FrameworkLogin {
    constructor() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, 'constructor'); /*endRemoveIf(production)*/
        this.isSignUp = false;

        this.$page = $('#page_login');
        this.$buttonLogin = $('#page_login_bt');
        this.$fielEmail = $('#page_login_user');
        this.$fieldPassword = $('#page_login_password');
    }

    buildMenu() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        this.$buttonLogin.on('click', function () {
            self.buildLogin();
        });
    }

    buildLoginPageLogin() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        if (this.$fielEmail.val() === '') {
            this.$fielEmail.focus();
        }
    }

    buildLogin() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        if (this.$fielEmail.val() === '') {
            this.$fielEmail.focus();
            this.buildLoginResponse('empty_email');
            return false;
        }

        if (this.$fieldPassword.val() === '') {
            this.buildLoginResponse('empty_password');
            this.$fieldPassword.focus();
            return false;
        }

        this.$buttonLogin.prop('disabled', true);

        $.ajax({
            url: '../php/controller.php',
            data:
                    '&c=FrameworkLogin' +
                    '&m=doLogin' +
                    '&email=' + this.$fielEmail.val() +
                    '&password=' + this.$fieldPassword.val(),
            type: 'POST',
            success: function (data) {
                self.$buttonLogin.prop('disabled', false);
                self.buildLoginResponse(data);
            }
        });
    }

    buildLoginResponse(data) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let response = '';

        switch (data) {
            case 'inactive':
                response = objFrameworkTranslation.translation.template.login_inactive;
                break;
            case 'wrong_email':
                response = objFrameworkTranslation.translation.template.login_wrong_email;
                this.$fielEmail.focus();
                break;
            case 'wrong_password':
                response = objFrameworkTranslation.translation.template.login_wrong_password;
                this.$fieldPassword.focus();
                break;
            case 'empty_email':
                response = objFrameworkTranslation.translation.template.login_empty;
                this.$fielEmail.focus();
                break;
            case 'empty_password':
                response = objFrameworkTranslation.translation.template.login_empty;
                this.$fieldPassword.focus();
                break;
            case '0':
            case '1':
            case '2':
            case '3':
                window.location = 'admin/index.php?p=page';
                break;
        }

        objFrameworkNotification.addNotification(response, 'red', this.$page.find('.form-field:last'));
    }
}