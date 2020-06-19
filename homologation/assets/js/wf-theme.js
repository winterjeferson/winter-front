class WfManagementTheme {
    verifyLoad() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        window.addEventListener('load', this.applyClass(), { once: true });
    }

    applyClass() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        objWfTheme.build();
    }
}
class WfTheme {
    constructor() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, 'constructor'); /*endRemoveIf(production)*/
        this.$body = document.querySelector('body');
        this.arrStyle = ['grey', 'blue', 'green', 'cyan', 'orange', 'red', 'yellow', 'purple', 'brown', 'black', 'white'];
        this.arrStyleLength = this.arrStyle.length;
    }
    
    build() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, 'buildLoad'); /*endRemoveIf(production)*/
        this.buildActiveMenu();
    }

    buildActiveMenu() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, 'buildActiveMenu'); /*endRemoveIf(production)*/
        let url = top.location.href;
        let urlSplit = url.split('/');
        let length = urlSplit.length;
        let file = urlSplit[length - 1];
        let fileSplit = file.split('.');
        let target = document.querySelectorAll('#mainMenu [data-id="' + fileSplit[0] + '"]');

        if (target.length > 0) {
            target[0].classList.add('active');
        }
    }
}
const objWfManagementTheme = new WfManagementTheme();
const objWfTheme = new WfTheme();


objWfManagementTheme.verifyLoad();