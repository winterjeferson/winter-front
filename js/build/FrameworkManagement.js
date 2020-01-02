class FrameworkManagement {
    verifyLoad() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        objFrameworkLayout.$window.on('load', function () {
            $.when(objFrameworkTranslation.loadFile()).then(function () {
                self.applyClass();

                if (objFrameworkLayout.verifyHasFodler('admin')) {
                    self.applyClassAdmin();
                }
            });
        });
    }

    applyClass() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        objFrameworkLayout.buildLayout();
        objFrameworkLayout.buildToggle();

        objFrameworkForm.buildFocus();
        objFrameworkForm.buildInputFile();
        objFrameworkForm.buildMask();

        objFrameworkModal.buildHtml();
        objFrameworkModal.buildMenu();
        objFrameworkModal.buildTranslation();

        objFrameworkCarousel.buildCarousel();

        objFrameworkMenuDropDown.buildMenu();
        objFrameworkMenuDropDown.buildStyle();

        objFrameworkMenuTab.defineActive();

        objFrameworkNotification.buildHtml();
        objFrameworkNotification.buildNavigation();

        objFrameworkTable.buildTableResponsive();

        objFrameworkTag.buildNavigation();

        objFrameworkTooltip.start();
        objFrameworkProgress.start();
    }

    applyClassAdmin() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        objFrameworkLogin.buildMenu();
        objFrameworkAdmin.applyClass();
        objFrameworkAdminBlog.applyClass();
        objFrameworkAdminPage.applyClass();
    }

    finishLoading() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        objFrameworkLayout.$loadingMain.addClass('loading-main-done');
        objFrameworkLayout.$body.removeClass('overflow-hidden');
        setTimeout(this.removeLoading, 1000);
    }

    removeLoading() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        objFrameworkLayout.$loadingMain.remove();
    }
}