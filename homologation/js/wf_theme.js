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
  "cancel": "Cancel",
  "close": "Close",
  "confirm": "Confirm",
  "input_upload": "Select File...",
  "next": "Next",
  "previous": "Previous"
};
var translationPT = {
  "cancel": "Cancelar",
  "close": "Fechar",
  "confirm": "Confirmar",
  "input_upload": "Selecione o Arquivo...",
  "next": "Próximo",
  "previous": "Anterior"
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