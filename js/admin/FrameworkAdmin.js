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