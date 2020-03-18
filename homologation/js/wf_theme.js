"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*removeIf(production)*/
var WFDebug =
/*#__PURE__*/
function () {
  function WFDebug() {
    _classCallCheck(this, WFDebug);

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

  _createClass(WFDebug, [{
    key: "debugMethod",
    value: function debugMethod(objWF, method) {
      var parameter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var string = '';
      var className = objWF.constructor.name; // let arrMethod = objWFect.getOwnPropertyNames(objWFect.getPrototypeOf(objWF));

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
  }, {
    key: "getMethodName",
    value: function getMethodName() {
      var userAgent = window.navigator.userAgent;
      var msie = userAgent.indexOf('.NET ');

      if (msie > 0) {
        return false;
      }

      var e = new Error('dummy');
      var stack = e.stack.split('\n')[2] // " at functionName ( ..." => "functionName"
      .replace(/^\s+at\s+(.+?)\s.+/g, '$1');
      var split = stack.split('.');

      if (stack !== 'new') {
        return split[1];
      } else {
        return 'constructor';
      }
    }
  }]);

  return WFDebug;
}();
/*endRemoveIf(production)*/


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

var WFLayout =
/*#__PURE__*/
function () {
  function WFLayout() {
    _classCallCheck(this, WFLayout);

    /*removeIf(production)*/
    objWFDebug.debugMethod(this, objWFDebug.getMethodName());
    /*endRemoveIf(production)*/

    this.$body = document.querySelector('body'); // this.$window = document.querySelector('window');

    this.breakPointExtraSmall = 0;
    this.breakPointSmall = 576;
    this.breakPointMedium = 768;
    this.breakPointBig = 992;
    this.breakPointExtraBig = 1200;
  }

  _createClass(WFLayout, [{
    key: "buildSpinner",
    value: function buildSpinner(style) {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName(), style);
      /*endRemoveIf(production)*/

      var spinner = '';
      spinner += '<div class="row text-center">';
      spinner += '    <div class="col-es-12">';
      spinner += '        <span class="fa fa-circle-o-notch fa-spin fa-2x color-' + style + '"></span>';
      spinner += '    </div>';
      spinner += '</div>';
      return spinner;
    }
  }]);

  return WFLayout;
}();

var WFLoading =
/*#__PURE__*/
function () {
  function WFLoading() {
    _classCallCheck(this, WFLoading);

    /*removeIf(production)*/
    objWFDebug.debugMethod(this, objWFDebug.getMethodName());
    /*endRemoveIf(production)*/

    this.$loadingMain = document.getElementById('loading_main');
    this.$body = document.querySelector('body');
  }

  _createClass(WFLoading, [{
    key: "finish",
    value: function finish() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      this.$loadingMain.classList.add('loading-main-done');
      this.$body.classList.remove('overflow-hidden');
      setTimeout(this.remove(this.$loadingMain), 1000);
    }
  }, {
    key: "remove",
    value: function remove(element) {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      element.parentNode.removeChild(element);
    }
  }]);

  return WFLoading;
}();

var WFTheme =
/*#__PURE__*/
function () {
  function WFTheme() {
    _classCallCheck(this, WFTheme);

    /*removeIf(production)*/
    objWFDebug.debugMethod(this, 'constructor');
    /*endRemoveIf(production)*/

    this.$body = document.querySelector('body');
    this.arrStyle = ['grey', 'blue', 'green', 'cyan', 'orange', 'red', 'yellow', 'purple', 'brown', 'black', 'white'];
    this.arrStyleLength = this.arrStyle.length;
    this.verifyLoad();
  }

  _createClass(WFTheme, [{
    key: "verifyLoad",
    value: function verifyLoad() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, 'buildLoad');
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
      objWFDebug.debugMethod(this, 'buildActiveMenu');
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
    //     /*removeIf(production)*/ objWFDebug.debugMethod(this, 'buildGoogleMaps'); /*endRemoveIf(production)*/
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
    //     /*removeIf(production)*/ objWFDebug.debugMethod(this, 'doSlide', target); /*endRemoveIf(production)*/
    //     $('html, body').animate({
    //         scrollTop: ($(target).offset().top) + 'px'
    //     }, 500);
    // }

  }]);

  return WFTheme;
}();
/*removeIf(production)*/


var objWFDebug = new WFDebug();
/*endRemoveIf(production)*/

var objWFLayout = new WFLayout();
var objWFCarousel = new WFCarousel();
var objWFForm = new WFForm();
var objWFMenuDropDown = new WFMenuDropDown();
var objWFMenuTab = new WFMenuTab();
var objWFMenuToggle = new WFMenuToggle();
var objWFModal = new WFModal();
var objWFNotification = new WFNotification();
var objWFProgress = new WFProgress();
var objWFTag = new WFTag();
var objWFTable = new WFTable();
var objWFTooltip = new WFTooltip();
var objWFTranslation = new WFTranslation();
var objWFLoading = new WFLoading();
var objWFTheme = new WFTheme();
objWFTranslation.build();
objWFProgress.build();
objWFForm.build();
objWFModal.build();
objWFCarousel.build();
objWFMenuDropDown.build();
objWFMenuTab.build();
objWFMenuToggle.build();
objWFNotification.build();
objWFTable.build();
objWFTag.build();
objWFTooltip.build();