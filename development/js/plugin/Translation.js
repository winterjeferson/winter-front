class Translation {
    constructor() {
        /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName()); /*endRemoveIf(production)*/
        this.translation = '';
    }

    build() {
        /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName()); /*endRemoveIf(production)*/
        this.defineLanguege();
    }

    defineLanguege() {
        /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName()); /*endRemoveIf(production)*/
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
