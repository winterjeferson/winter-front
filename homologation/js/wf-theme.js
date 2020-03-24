"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*removeIf(production)*/
var WfDebug =
/*#__PURE__*/
function () {
  function WfDebug() {
    _classCallCheck(this, WfDebug);

    this.isWfLayout = true;
    this.isWfManagement = true;
    this.isWfLoading = true;
    this.isWfTheme = true;
    this.isWfCarousel = true;
    this.isWfForm = true;
    this.isWfGeneric = true;
    this.isWfMenuDropDown = true;
    this.isWfMenuTab = true;
    this.isWfMenuToggle = true;
    this.isWfModal = true;
    this.isWfNotification = true;
    this.isWfProgress = true;
    this.isWfTable = true;
    this.isWfTag = true;
    this.isWfTooltip = true;
    this.isWfTranslation = true;
  }

  _createClass(WfDebug, [{
    key: "debugMethod",
    value: function debugMethod(objWf, method) {
      var parameter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var string = '';
      var className = objWf.constructor.name; // let arrMethod = objWfect.getOwnPropertyNames(objWfect.getPrototypeOf(objWf));

      if (!this['is' + className]) {
        return false;
      }

      string += '%c';
      string += 'objWf' + className;
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

  return WfDebug;
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

var WfLayout = function WfLayout() {
  _classCallCheck(this, WfLayout);

  /*removeIf(production)*/
  objWfDebug.debugMethod(this, objWfDebug.getMethodName());
  /*endRemoveIf(production)*/

  this.$body = document.querySelector('body');
  this.breakPointExtraSmall = 0;
  this.breakPointSmall = 576;
  this.breakPointMedium = 768;
  this.breakPointBig = 992;
  this.breakPointExtraBig = 1200;
};

var WfLoading =
/*#__PURE__*/
function () {
  function WfLoading() {
    _classCallCheck(this, WfLoading);

    /*removeIf(production)*/
    objWfDebug.debugMethod(this, objWfDebug.getMethodName());
    /*endRemoveIf(production)*/

    this.$loadingMain = document.getElementById('loadingMain');
    this.$body = document.querySelector('body');
  }

  _createClass(WfLoading, [{
    key: "finish",
    value: function finish() {
      /*removeIf(production)*/
      objWfDebug.debugMethod(this, objWfDebug.getMethodName());
      /*endRemoveIf(production)*/

      this.$loadingMain.classList.add('loading-main-done');
      this.$body.classList.remove('overflow-hidden');
      setTimeout(this.remove(this.$loadingMain), 1000);
    }
  }, {
    key: "remove",
    value: function remove(element) {
      /*removeIf(production)*/
      objWfDebug.debugMethod(this, objWfDebug.getMethodName());
      /*endRemoveIf(production)*/

      element.parentNode.removeChild(element);
    }
  }]);

  return WfLoading;
}();

var WfTheme =
/*#__PURE__*/
function () {
  function WfTheme() {
    _classCallCheck(this, WfTheme);

    /*removeIf(production)*/
    objWfDebug.debugMethod(this, 'constructor');
    /*endRemoveIf(production)*/

    this.$body = document.querySelector('body');
    this.arrStyle = ['grey', 'blue', 'green', 'cyan', 'orange', 'red', 'yellow', 'purple', 'brown', 'black', 'white'];
    this.arrStyleLength = this.arrStyle.length;
    this.verifyLoad();
  }

  _createClass(WfTheme, [{
    key: "verifyLoad",
    value: function verifyLoad() {
      /*removeIf(production)*/
      objWfDebug.debugMethod(this, 'buildLoad');
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
      objWfDebug.debugMethod(this, 'buildActiveMenu');
      /*endRemoveIf(production)*/

      var url = top.location.href;
      var urlSplit = url.split('/');
      var length = urlSplit.length;
      var file = urlSplit[length - 1];
      var fileSplit = file.split('.');
      var target = document.querySelectorAll('#mainMenu [data-id="' + fileSplit[0] + '"]');

      if (target.length > 0) {
        target[0].classList.add('active');
      }
    } // buildGoogleMaps() {
    //     /*removeIf(production)*/ objWfDebug.debugMethod(this, 'buildGoogleMaps'); /*endRemoveIf(production)*/
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
    //     /*removeIf(production)*/ objWfDebug.debugMethod(this, 'doSlide', target); /*endRemoveIf(production)*/
    //     $('html, body').animate({
    //         scrollTop: ($(target).offset().top) + 'px'
    //     }, 500);
    // }

  }]);

  return WfTheme;
}();
/*removeIf(production)*/


var objWfDebug = new WfDebug();
/*endRemoveIf(production)*/

var objWfLayout = new WfLayout();
var objWfCarousel = new WfCarousel();
var objWfForm = new WfForm();
var objWfLazyLoad = new WfLazyLoad();
var objWfMenuDropDown = new WfMenuDropDown();
var objWfMenuTab = new WfMenuTab();
var objWfMenuToggle = new WfMenuToggle();
var objWfModal = new WfModal();
var objWfNotification = new WfNotification();
var objWfProgress = new WfProgress();
var objWfTag = new WfTag();
var objWfTable = new WfTable();
var objWfTooltip = new WfTooltip();
var objWfTranslation = new WfTranslation();
var objWfLoading = new WfLoading();
var objWfTheme = new WfTheme();
objWfTranslation.build();
objWfProgress.build();
objWfForm.build();
objWfModal.build();
objWfCarousel.build();
objWfLazyLoad.build();
objWfMenuDropDown.build();
objWfMenuTab.build();
objWfMenuToggle.build();
objWfNotification.build();
objWfTable.build();
objWfTag.build();
objWfTooltip.build();