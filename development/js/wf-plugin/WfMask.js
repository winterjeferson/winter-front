class WfMask {
    constructor() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$inputMask = document.querySelectorAll('[data-mask]');
    }

    build() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        if (this.$inputMask.length < 1) {
            return;
        }

        this.addListener();
    }

    addListener() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        this.$inputMask.forEach(($input) => {
            $input.addEventListener('input', (e) => {
                let inputValue = e.target.value;
                let inputMask = $input.dataset.mask;
                let capitalized = inputMask.charAt(0).toUpperCase() + inputMask.slice(1);

                e.target.value = self['mask' + capitalized](inputValue);
            })
        })
    }

    maskCep(value) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        return value
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1')
    }

    maskCpf(value) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        return value
            .replace(/\D/g, '') //only numbers
            .replace(/(\d{3})(\d)/, '$1.$2') // add dot
            .replace(/(\d{3})(\d)/, '$1.$2') // add dot
            .replace(/(\d{3})(\d{1,2})/, '$1-$2') // add hyphen
            .replace(/(-\d{2})\d+?$/, '$1') // max length
    }

    maskCnpj(value) {
            /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')
    }

    maskDate(value) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1')
    }

    maskPhone(value) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
            .replace(/(-\d{4})\d+?$/, '$1')
    }

    maskPis(value) {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{5})(\d)/, '$1.$2')
            .replace(/(\d{5}\.)(\d{2})(\d)/, '$1$2-$3')
            .replace(/(-\d)\d+?$/, '$1')
    }
}