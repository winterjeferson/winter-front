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

    this.$loadingMain = $('#loading_main');
    this.$body = $('body');
    this.$window = $(window);
    this.breakPointExtraSmall = 0;
    this.breakPointSmall = 576;
    this.breakPointMedium = 768;
    this.breakPointBig = 992;
    this.breakPointExtraBig = 1200;
  }

  _createClass(FrameworkLayout, [{
    key: "buildLayout",
    value: function buildLayout() {
      /*removeIf(production)*/
      objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName());
      /*endRemoveIf(production)*/

      $('button, a').on('click', function (event) {
        event.stopPropagation();
      });
    }
  }, {
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

      switch (action) {
        case 'show':
          $(target).removeClass(classDisplay);
          break;

        case 'hide':
          $(target).addClass(classDisplay);
          break;
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

      $('.bt-toggle').each(function () {
        $(this).unbind();
        $(this).on('click', function () {
          var $nav = $(this).siblings('nav').find(' > ul');
          var $navAll = $(this).siblings('nav').find('ul');
          var $class = 'mobile-show';

          if ($nav.hasClass($class)) {
            $nav.removeClass($class);
            $navAll.removeClass($class);
          } else {
            $nav.addClass($class);
          }
        });
      });
    }
  }, {
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
    key: "verifyHasFodler",
    value: function verifyHasFodler(target) {
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
  }, {
    key: "verifyUndefined",
    value: function verifyUndefined(target) {
      /*removeIf(production)*/
      objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName(), target);
      /*endRemoveIf(production)*/

      if (typeof target === 'undefined' || target === null || target === '') {
        return true;
      } else {
        return false;
      }
    }
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

      var self = this;
      objFrameworkLayout.$window.on('load', function () {
        $.when(objFrameworkTranslation.loadFile()).then(function () {
          self.applyClass();

          if (objFrameworkLayout.verifyHasFodler('admin')) {
            self.applyClassAdmin();
          }
        });
      });
    }
  }, {
    key: "applyClass",
    value: function applyClass() {
      /*removeIf(production)*/
      objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName());
      /*endRemoveIf(production)*/

      objFrameworkLayout.buildLayout();
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
  }, {
    key: "applyClassAdmin",
    value: function applyClassAdmin() {
      /*removeIf(production)*/
      objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName());
      /*endRemoveIf(production)*/

      objFrameworkLogin.buildMenu();
      objFrameworkAdmin.applyClass();
      objFrameworkAdminBlog.applyClass();
      objFrameworkAdminPage.applyClass();
    }
  }, {
    key: "finishLoading",
    value: function finishLoading() {
      /*removeIf(production)*/
      objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName());
      /*endRemoveIf(production)*/

      objFrameworkLayout.$loadingMain.addClass('loading-main-done');
      objFrameworkLayout.$body.removeClass('overflow-hidden');
      setTimeout(this.removeLoading, 1000);
    }
  }, {
    key: "removeLoading",
    value: function removeLoading() {
      /*removeIf(production)*/
      objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName());
      /*endRemoveIf(production)*/

      objFrameworkLayout.$loadingMain.remove();
    }
  }]);

  return FrameworkManagement;
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
    this.buildLoad();
  }

  _createClass(Theme, [{
    key: "buildLoad",
    value: function buildLoad() {
      /*removeIf(production)*/
      objFrameworkDebug.debugMethod(this, 'buildLoad');
      /*endRemoveIf(production)*/

      var self = this;
      $(window).on('load', function () {
        self.buildActiveMenu();
      });
    }
  }, {
    key: "buildActiveMenu",
    value: function buildActiveMenu() {
      /*removeIf(production)*/
      objFrameworkDebug.debugMethod(this, 'buildActiveMenu');
      /*endRemoveIf(production)*/

      var urlParameter = objFrameworkLayout.getUrlParameter('p');
      $('#main_menu').find('[data-id="' + urlParameter + '"]').addClass('active');
    }
  }, {
    key: "buildGoogleMaps",
    value: function buildGoogleMaps() {
      /*removeIf(production)*/
      objFrameworkDebug.debugMethod(this, 'buildGoogleMaps');
      /*endRemoveIf(production)*/

      var $maps1 = $('#google_maps_map');
      var $maps1Box = $('#google_maps_box');
      $maps1.addClass('scroll-off');
      $maps1Box.on('click', function () {
        $maps1.removeClass('scroll-off');
      });
      $maps1Box.mouseleave(function () {
        $maps1.addClass('scroll-off');
      });
    }
  }, {
    key: "doSlide",
    value: function doSlide(target) {
      /*removeIf(production)*/
      objFrameworkDebug.debugMethod(this, 'doSlide', target);
      /*endRemoveIf(production)*/

      $('html, body').animate({
        scrollTop: $(target).offset().top + 'px'
      }, 500);
    }
  }]);

  return Theme;
}();
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
var objTheme = new Theme();

if (objFrameworkLayout.verifyHasFodler('admin')) {
  var objFrameworkAdmin = new FrameworkAdmin();
  var objFrameworkAdminBlog = new FrameworkAdminBlog();
  var objFrameworkAdminPage = new FrameworkAdminPage();
  var objFrameworkLogin = new FrameworkLogin();
}

objFrameworkManagement.verifyLoad();