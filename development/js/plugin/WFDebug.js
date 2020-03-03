/*removeIf(production)*/
class WFDebug {
    constructor() {
        this.isWFLayout = true;
        this.isWFManagement = true;

        this.isWFLoading = true;
        this.isWFTheme = true;

        this.isWFCarousel = true;
        this.isWFForm = true;
        this.isWFGeneric = true;
        this.isWFMenuDropDown = true;
        this.isWFMenuTab = true;
        this.isWFMenuToggle = true;
        this.isWFModal = true;
        this.isWFNotification = true;
        this.isWFProgress = true;
        this.isWFTable = true;
        this.isWFTag = true;
        this.isWFTooltip = true;
        this.isWFTranslation = true;
    }

    debugMethod(objWF, method, parameter = '') {
        let string = '';
        let className = objWF.constructor.name;
        // let arrMethod = objWFect.getOwnPropertyNames(objWFect.getPrototypeOf(objWF));

        if (!this['is' + className]) {
            return false;
        }

        string += '%c';
        string += 'objWF' + className;
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