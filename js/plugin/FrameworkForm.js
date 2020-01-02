class FrameworkForm {
    constructor() {
    }

    buildMask() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/

        $('[data-id="mask_number"]').mask('0#');
        $('[data-id="mask_phone"]').mask('(00) 0000-0000');
        $('[data-id="mask_cpf"]').mask('000.000.000-00');
    }

    buildFocus() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        $(document).keypress(function (e) {
            if (e.which === 13) {

                $('.radio').each(function () {
                    if ($(this).is(':focus')) {
                        $(this).find('input').click();
                    }
                });

                $('.input-switch').each(function () {
                    if ($(this).is(':focus')) {
                        $(this).find('input').click();
                    }
                });

                $('.checkbox').each(function () {
                    if ($(this).is(':focus')) {
                        $(this).find('input').click();
                    }
                });
            }
        });
    }

    buildInputFile() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let inputFile = '';
        let textFile = objFrameworkTranslation.translation.default.input_upload;

        inputFile += '<div class="input-file">';
        inputFile += '    <div class="input-file-name"></div>';
        inputFile += '    <div class="input-file-text"><span class="fa fa-upload" aria-hidden="true"></span>&nbsp; ' + textFile + '</div>';
        inputFile += '</div>';

        $('input[type="file"]').each(function () {
            objFrameworkLayout.switchDisplay($(this), 'hide');
            $(this).parent().append(inputFile).attr('tabIndex', 0).css('outline', 0).focus(function () {
                $(this).find('.input-file').addClass('focus');
            }).focusout(function () {
                $(this).find('.input-file').removeClass('focus');
            });
        });

        $('.input-file').each(function () {
            $(this).on("click", function () {
                $(this).parent().find('input[type="file"]').click();
                $(this).parent().find('input[type="file"]').change(function () {
                    $(this).parent().find('.input-file-name').text($(this).parent().find('input[type="file"]').val());
                });
            });
        });
    }

    validateEmpty(arr) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let arrEmpty = arr;
        let arrEmptyLength = arrEmpty.length;

        for (let i = 0; i < arrEmptyLength; i++) {
            if (arrEmpty[i].val() === '') {
                arrEmpty[i].focus();
                return false;
            }
        }

        return true;
    }
}