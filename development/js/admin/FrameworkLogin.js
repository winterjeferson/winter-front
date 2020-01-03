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