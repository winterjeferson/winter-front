class FrameworkTranslation {
    constructor() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.translation = '';
    }

    defineLanguege() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        switch (globalFrameworkLanguage) {
            case 'pt':
                this.translation = translationPTBR;
                break;
            case 'en':
                this.translation = translationEN;
                break;
        }
    }
}
