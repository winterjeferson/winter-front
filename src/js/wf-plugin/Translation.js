export class Translation {
    constructor() {
        this.translation = '';
        this.translationEn = {
            'cancel': 'Cancel',
            'close': 'Close',
            'confirm': 'OK',
            'input_upload': 'Select File...',
            'next': 'Next',
            'previous': 'Previous',
        };
        this.translationEs = {
            'cancel': 'Cancelar',
            'close': 'Cerrar',
            'confirm': 'OK',
            'input_upload': 'Seleccione Archivo...',
            'next': 'Siguiente',
            'previous': 'Anterior',
        };
        this.translationPt = {
            'cancel': 'Cancelar',
            'close': 'Fechar',
            'confirm': 'OK',
            'input_upload': 'Selecione o Arquivo...',
            'next': 'Próximo',
            'previous': 'Anterior',
        };
    }

    defineLanguege() {
        const capitalize = wfpLanguage.charAt(0).toUpperCase() + wfpLanguage.slice(1);

        this.translation = this[`translation${capitalize}`];
    }

    init() {
        this.defineLanguege();
    }
}