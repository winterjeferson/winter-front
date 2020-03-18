class WFTranslation {
    constructor() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.translation = '';
    }

    build() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        this.defineLanguege();
    }

    defineLanguege() {
        /*removeIf(production)*/ objWFDebug.debugMethod(this, objWFDebug.getMethodName()); /*endRemoveIf(production)*/
        switch (globalLanguage) {
            case 'pt':
                this.translation = translationPT;
                break;
            case 'en':
                this.translation = translationEN;
                break;
        }
    }
}
