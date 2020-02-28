/*removeIf(production)*/
class Debug {
    constructor() {
        this.isLayout = true;
        this.isManagement = true;

        this.isLoading = true;
        this.isTheme = true;

        this.isCarousel = true;
        this.isForm = true;
        this.isGeneric = true;
        this.isMenuDropDown = true;
        this.isMenuTab = true;
        this.isModal = true;
        this.isNotification = true;
        this.isProgress = true;
        this.isTable = true;
        this.isTag = true;
        this.isTooltip = true;
        this.isTranslation = true;
    }

    debugMethod(obj, method, parameter = '') {
        let string = '';
        let className = obj.constructor.name;
        // let arrMethod = Object.getOwnPropertyNames(Object.getPrototypeOf(obj));

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
        let split = stack.split('.');

        if (stack !== 'new') {
            return split[1];
        } else {
            return 'constructor';
        }
    }
}
/*endRemoveIf(production)*/