class FrameworkTranslation {
    constructor() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.translation = '';
    }

    loadFile() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;
        let folder = objFrameworkLayout.verifyHasFodler('admin') ? '../' : '';
        let url = globalFrameworkUrl + folder + 'json/' + globalFrameworkLanguage + '.json';

        return $.ajax({
            url: url,
            success: function (data) {
                self.translation = data;
                self.defineSelectLanguage();
            }
        });
    }

    defineSelectLanguage() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;
        let $select = $('#page_language_select');

        if ($select.length === 0) {
            return false;
        }

//        $select.val(globalFrameworkLanguage);
        $select.change(function (e) {
            self.setLanguage(e.target.options[e.target.selectedIndex].value); /*endRemoveIf(production)*/
        });
    }

    setLanguage(language) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), language); /*endRemoveIf(production)*/
        let self = this;

        $.ajax({
            url: 'php/controller.php',
            data:
                    '&c=FrameworkTranslation' +
                    '&m=changeLanguage' +
                    '&language=' + language,
            type: 'POST',
            success: function (data) {
                switch (data) {
                    case 'r1':
                        location.reload();
                        break;
                    default:
                        self.setLanguage('en');
                }
            }
        });
    }
}
