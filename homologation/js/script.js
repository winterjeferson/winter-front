"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var FrameworkLayout =
/*#__PURE__*/
function () {
  function FrameworkLayout() {
    _classCallCheck(this, FrameworkLayout);
    /*removeIf(production)*/


    objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName());
    /*endRemoveIf(production)*/

    this.$body = document.querySelector('body'); // this.$window = document.querySelector('window');

    this.breakPointExtraSmall = 0;
    this.breakPointSmall = 576;
    this.breakPointMedium = 768;
    this.breakPointBig = 992;
    this.breakPointExtraBig = 1200;
  }

  _createClass(FrameworkLayout, [{
    key: "switchDisplay",
    value: function switchDisplay(target) {
      var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      /*removeIf(production)*/

      objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), [target, action]);
      /*endRemoveIf(production)*/

      var classDisplay = 'display-none';

      if (action === '') {
        if (target.hasClass(classDisplay)) {
          action = 'show';
        } else {
          action = 'hide';
        }
      }

      if (action === 'show') {
        $(target).removeClass(classDisplay);
      } else {
        $(target).addClass(classDisplay);
      }
    }
  }, {
    key: "buildSpinner",
    value: function buildSpinner(style) {
      /*removeIf(production)*/
      objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), style);
      /*endRemoveIf(production)*/

      var spinner = '';
      spinner += '<div class="row text-center">';
      spinner += '    <div class="col-es-12">';
      spinner += '        <span class="fa fa-circle-o-notch fa-spin fa-2x color-' + style + '"></span>';
      spinner += '    </div>';
      spinner += '</div>';
      return spinner;
    }
  }, {
    key: "buildToggle",
    value: function buildToggle() {
      /*removeIf(production)*/
      objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName());
      /*endRemoveIf(production)*/

      var element = document.querySelectorAll('.bt-toggle');
      Array.prototype.forEach.call(element, function (el, i) {
        el.onclick = function () {
          var $ul1 = el.parentNode.querySelector('nav > ul');
          var $ulAll = el.parentNode.querySelector('nav ul');
          var classDisplay = 'mobile-show';

          if ($ul1.classList.contains(classDisplay)) {
            $ul1.classList.remove(classDisplay);
            $ulAll.classList.remove(classDisplay);
          } else {
            $ul1.classList.add(classDisplay);
          }
        };
      });
    } // verifyUndefined(target) {
    //     /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), target); /*endRemoveIf(production)*/
    //     if (typeof target === 'undefined' || target === null || target === '') {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    // buildLayout() {

    /*removeIf(production)*/
    // objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); 

    /*endRemoveIf(production)*/
    // $('button, a').on('click', function (event) {
    //     event.stopPropagation();
    // });
    // }

  }]);

  return FrameworkLayout;
}();

var FrameworkManagement =
/*#__PURE__*/
function () {
  function FrameworkManagement() {
    _classCallCheck(this, FrameworkManagement);
  }

  _createClass(FrameworkManagement, [{
    key: "verifyLoad",
    value: function verifyLoad() {
      /*removeIf(production)*/
      objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName());
      /*endRemoveIf(production)*/

      objFrameworkTranslation.defineLanguege();
      this.applyClass();
    }
  }, {
    key: "applyClass",
    value: function applyClass() {
      /*removeIf(production)*/
      objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName());
      /*endRemoveIf(production)*/
      // objFrameworkLayout.buildLayout();

      objFrameworkLayout.buildToggle();
      objFrameworkForm.buildFocus();
      objFrameworkForm.buildInputFile();
      objFrameworkForm.buildMask();
      objFrameworkModal.buildHtml();
      objFrameworkModal.buildMenu();
      objFrameworkModal.buildTranslation();
      objFrameworkCarousel.buildCarousel();
      objFrameworkMenuDropDown.buildMenu();
      objFrameworkMenuDropDown.buildStyle();
      objFrameworkMenuTab.defineActive();
      objFrameworkNotification.buildHtml();
      objFrameworkNotification.buildNavigation();
      objFrameworkTable.buildTableResponsive();
      objFrameworkTag.buildNavigation();
      objFrameworkTooltip.start();
      objFrameworkProgress.start();
    }
  }]);

  return FrameworkManagement;
}();

var Helper =
/*#__PURE__*/
function () {
  function Helper() {
    _classCallCheck(this, Helper);
    /*removeIf(production)*/


    objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName());
    /*endRemoveIf(production)*/
  }

  _createClass(Helper, [{
    key: "getUrlParameter",
    value: function getUrlParameter(target) {
      /*removeIf(production)*/
      objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), target);
      /*endRemoveIf(production)*/

      var url = top.location.search.substring(1);
      var parameter = url.split('&');

      for (var i = 0; i < parameter.length; i++) {
        var parameterName = parameter[i].split('=');

        if (parameterName[0] === target) {
          return parameterName[1];
        }
      }
    }
  }, {
    key: "verifyUrlFodler",
    value: function verifyUrlFodler(target) {
      /*removeIf(production)*/
      objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), target);
      /*endRemoveIf(production)*/

      var arrFolder = window.location.pathname.split('/');

      if (arrFolder.indexOf(target) > -1) {
        return true;
      } else {
        return false;
      }
    }
  }]);

  return Helper;
}();

var Loading =
/*#__PURE__*/
function () {
  function Loading() {
    _classCallCheck(this, Loading);
    /*removeIf(production)*/


    objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName());
    /*endRemoveIf(production)*/

    this.$loadingMain = document.getElementById('loading_main');
    this.$body = document.querySelector('body');
  }

  _createClass(Loading, [{
    key: "finish",
    value: function finish() {
      /*removeIf(production)*/
      objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName());
      /*endRemoveIf(production)*/

      this.$loadingMain.classList.add('loading-main-done');
      this.$body.classList.remove('overflow-hidden');
      setTimeout(this.remove(this.$loadingMain), 1000);
    }
  }, {
    key: "remove",
    value: function remove(element) {
      /*removeIf(production)*/
      objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName());
      /*endRemoveIf(production)*/

      element.parentNode.removeChild(element);
    }
  }]);

  return Loading;
}();

var Theme =
/*#__PURE__*/
function () {
  function Theme() {
    _classCallCheck(this, Theme);
    /*removeIf(production)*/


    objFrameworkDebug.debugMethod(this, 'constructor');
    /*endRemoveIf(production)*/

    this.$body = $('body');
    this.arrStyle = ['grey', 'blue', 'green', 'cyan', 'orange', 'red', 'yellow', 'purple', 'brown', 'black', 'white'];
    this.arrStyleLength = this.arrStyle.length;
    this.verifyLoad();
  }

  _createClass(Theme, [{
    key: "verifyLoad",
    value: function verifyLoad() {
      /*removeIf(production)*/
      objFrameworkDebug.debugMethod(this, 'buildLoad');
      /*endRemoveIf(production)*/

      var self = this;

      window.onload = function () {
        self.buildActiveMenu();
      };
    }
  }, {
    key: "buildActiveMenu",
    value: function buildActiveMenu() {
      /*removeIf(production)*/
      objFrameworkDebug.debugMethod(this, 'buildActiveMenu');
      /*endRemoveIf(production)*/

      var url = top.location.href;
      var urlSplit = url.split('/');
      var length = urlSplit.length;
      var file = urlSplit[length - 1];
      var fileSplit = file.split('.');
      var target = document.querySelectorAll('#main_menu [data-id="' + fileSplit[0] + '"]');

      if (target.length > 0) {
        target[0].classList.add('active');
      }
    } // buildGoogleMaps() {
    //     /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, 'buildGoogleMaps'); /*endRemoveIf(production)*/
    //     let $maps1 = $('#google_maps_map');
    //     let $maps1Box = $('#google_maps_box');
    //     $maps1.addClass('scroll-off');
    //     $maps1Box.on('click', function () {
    //         $maps1.removeClass('scroll-off');
    //     });
    //     $maps1Box.mouseleave(function () {
    //         $maps1.addClass('scroll-off');
    //     });
    // }
    // doSlide(target) {
    //     /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, 'doSlide', target); /*endRemoveIf(production)*/
    //     $('html, body').animate({
    //         scrollTop: ($(target).offset().top) + 'px'
    //     }, 500);
    // }

  }]);

  return Theme;
}();

var translationEN = {
  "default": {
    "password": "Password",
    "confirm": "Confirm",
    "cancel": "Cancel",
    "input_upload": "Select File...",
    "add": "Add",
    "remove": "Remove",
    "first_page": "First Page",
    "last_page": "Last Page",
    "menu": "Menu",
    "close": "Close",
    "previous": "Previous",
    "next": "Next"
  },
  "template": {
    "blog": "Blog",
    "login_inactive": "Inactive user. Contact an administrator.",
    "login_wrong_email": "E-mail not found.",
    "login_wrong_password": "Wrong password. Try again.",
    "login_empty": "ATTENTION: No field can be empty.",
    "language": "Language / Idioma",
    "home": "Home Page",
    "select_background": "Select background color",
    "modal": "Open Modal",
    "confirmation": "Open Confirmation",
    "url": "Get parameter in URL (l)",
    "navigation": "Navigation",
    "progress": "Progress bars",
    "progress_es": "Progress bars extra small",
    "progress_sm": "Progress bars small",
    "progress_re": "Progress bars regular",
    "progress_bi": "Progress bars big",
    "progress_eb": "Progress bars extra big",
    "button": "Button",
    "button_es": "Buttons extra small",
    "button_sm": "Buttons small",
    "button_re": "Buttons regular",
    "button_bi": "Buttons big",
    "button_eb": "Buttons extra big",
    "button_fu": "Buttons full",
    "button_outline": "Buttons outline",
    "button_active": "Buttons active",
    "button_disabled": "Buttons disabled",
    "button_social": "Buttons social",
    "button_pagination": "Pagination buttons",
    "button_link": "Link",
    "menu_drop_down": "Menu drop down",
    "menu_tab": "Menu Tab",
    "notification": "Notification",
    "notification_default_place": "Notification at default place",
    "notification_pointing_place": "Notification pointing place",
    "responsive": "Responsive grid",
    "table": "Tables",
    "table_scroll": "Tables scroll",
    "tag": "Tag",
    "text": "Text",
    "loading": "Loading",
    "gallery": "Gallery",
    "tooltip": "Tooltip",
    "icon": "Icon",
    "form": "Form",
    "color_palette": "Color palette",
    "carousel": "Carousel",
    "card": "Card",
    "card_small": "Card small",
    "card_regular": "Card regular",
    "card_big": "Card big"
  },
  "error": {
    "403": {
      "title": "Erro 403",
      "text": "Acesso Proibido"
    },
    "404": {
      "title": "Erro 404",
      "text": "Página não encontrada"
    },
    "500": {
      "title": "Erro 500",
      "text": "Erro interno no Servidor"
    }
  },
  "meta_tag": {
    "address": "https://www.jefersonwinter.com/",
    "author": "Jeferson Winter",
    "description": "Description",
    "keywords": "key, words",
    "lang": "en",
    "title": "Framework 12_0_0"
  }
};
var translationPTBR = {
  "default": {
    "password": "Senha",
    "confirm": "Confirmar",
    "cancel": "Cancelar",
    "input_upload": "Selecione o Arquivo...",
    "add": "Adicionar",
    "remove": "Remover",
    "first_page": "Primeira Página",
    "last_page": "Última Página",
    "menu": "Menu",
    "close": "Fechar",
    "previous": "Anterior",
    "next": "Próximo"
  },
  "template": {
    "blog": "Blog",
    "login_inactive": "Usuário inativo. Contate um administrador.",
    "login_wrong_email": "E-mail não encontrado.",
    "login_wrong_password": "Senha incorreta. Tente novamente.",
    "login_empty": "ATENÇÃO: Nenhum campo pode ficar vazio.",
    "language": "Language / Idioma",
    "home": "Página inicial",
    "select_background": "Selecione a cor de fundo",
    "modal": "Abrir Modal",
    "confirmation": "Abrir Confirmação",
    "url": "Pegar parâmetro na URL (l)",
    "navigation": "Navegação",
    "progress": "Barras de progresso",
    "progress_es": "Barras de progresso extra pequenas",
    "progress_sm": "Barras de progresso pequenas",
    "progress_re": "Barras de progresso regulares",
    "progress_bi": "Barras de progresso grandes",
    "progress_eb": "Barras de progresso muito grandes",
    "button": "Botão",
    "button_es": "Botões muito pequenos",
    "button_sm": "Botões pequenos",
    "button_re": "Botões regulares",
    "button_bi": "Botões grandes",
    "button_eb": "Botões muito grandes",
    "button_fu": "Botões largura máxima",
    "button_outline": "Botões contorno",
    "button_active": "Botões ativos",
    "button_disabled": "Botões desativados",
    "button_social": "Botões de redes sociais",
    "button_pagination": "Botões de paginação",
    "button_link": "Link",
    "menu_drop_down": "Menu drop down",
    "menu_tab": "Menu em abas",
    "notification": "Notificações",
    "notification_default_place": "Adicionar notificação",
    "notification_pointing_place": "Adicionar notificação apontando o local",
    "responsive": "Grade responsiva",
    "table": "Tabelas",
    "table_scroll": "Tabelas com scroll",
    "tag": "Etiquetas",
    "text": "Textos",
    "loading": "Carregando",
    "gallery": "Galerias",
    "tooltip": "Tooltip",
    "icon": "Ícones",
    "form": "Formulários",
    "color_palette": "Paleta de cores",
    "carousel": "Carrossel",
    "card": "Cartões",
    "card_small": "Cartão pequeno",
    "card_regular": "Cartão padrão",
    "card_big": "Cartão grande"
  },
  "error": {
    "403": {
      "title": "Erro 403",
      "text": "Acesso Proibido"
    },
    "404": {
      "title": "Erro 404",
      "text": "Página não encontrada"
    },
    "500": {
      "title": "Erro 500",
      "text": "Erro interno no Servidor"
    }
  },
  "meta_tag": {
    "address": "https://www.jefersonwinter.com/",
    "author": "Jeferson Winter",
    "description": "Description",
    "keywords": "key, words",
    "lang": "pt-br",
    "title": "Framework 12_0_0"
  }
};
/*removeIf(production)*/

var objFrameworkDebug = new FrameworkDebug();
/*endRemoveIf(production)*/

var objFrameworkLayout = new FrameworkLayout();
var objFrameworkCarousel = new FrameworkCarousel();
var objFrameworkForm = new FrameworkForm();
var objFrameworkGeneric = new FrameworkGeneric();
var objFrameworkMenuDropDown = new FrameworkMenuDropDown();
var objFrameworkMenuTab = new FrameworkMenuTab();
var objFrameworkModal = new FrameworkModal();
var objFrameworkNotification = new FrameworkNotification();
var objFrameworkProgress = new FrameworkProgress();
var objFrameworkTag = new FrameworkTag();
var objFrameworkTable = new FrameworkTable();
var objFrameworkTooltip = new FrameworkTooltip();
var objFrameworkTranslation = new FrameworkTranslation();
var objFrameworkManagement = new FrameworkManagement();
var objHelper = new Helper();
var objLoading = new Loading();
var objTheme = new Theme();
objFrameworkManagement.verifyLoad();