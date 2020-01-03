/*removeIf(production)*/
class FrameworkDebug {
    constructor() {
        this.isFrameworkLayout = true;
        this.isFrameworkManagement = true;

        this.isFrameworkAdmin = true;
        this.isFrameworkAdminBlog = true;
        this.isFrameworkAdminPage = true;
        this.isFrameworkLogin = true;

        this.isTheme = true;

        this.isFrameworkCarousel = true;
        this.isFrameworkGeneric = true;
        this.isFrameworkMenuDropDown = true;
        this.isFrameworkMenuTab = true;
        this.isFrameworkModal = true;
        this.isFrameworkNotification = true;
        this.isFrameworkProgress = true;
        this.isFrameworkTable = true;
        this.isFrameworkTag = true;
        this.isFrameworkTooltip = true;
        this.isFrameworkTranslation = true;
    }

    debugMethod(obj, method, parameter = '') {
        let string = '';
        let className = obj.constructor.name;
//        let arrMethod = Object.getOwnPropertyNames(Object.getPrototypeOf(obj));

        if (!this['is' + className]) {
            return false;
        }

        string += '%c';
        string += 'obj' + className;
        string += '.';
        string += '%c';
        string += method;
        string += '(';

        string += '%c';
        if (parameter !== '') {
            string += parameter;
        }

        string += '%c';
        string += ');';

        console.log(string, 'color: black', 'color: blue', 'color: red', 'color: blue');
    }

    getMethodName() {
        let userAgent = window.navigator.userAgent;
        let msie = userAgent.indexOf('.NET ');

        if (msie > 0) {
            return false;
        }

        let e = new Error('dummy');
        let stack = e.stack.split('\n')[2]
                // " at functionName ( ..." => "functionName"
                .replace(/^\s+at\s+(.+?)\s.+/g, '$1');
        let split = stack.split(".");

        if (stack !== 'new') {
            return split[1];
        } else {
            return 'constructor';
        }
    }
}
/*endRemoveIf(production)*/