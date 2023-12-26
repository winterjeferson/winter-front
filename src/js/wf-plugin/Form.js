export class Form {
    validateEmpty(itens) {
        const length = itens.length;

        for (let i = 0; i < length; i++) {
            const el = itens[i];

            if (el.value === '') {
                el.focus();
                return false;
            }
        }
        return true;
    }
}