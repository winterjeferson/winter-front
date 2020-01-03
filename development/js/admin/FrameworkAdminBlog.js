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