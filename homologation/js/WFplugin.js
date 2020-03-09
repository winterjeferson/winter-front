"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function getUrlParameter(target) {
  var url = top.location.search.substring(1);
  var parameter = url.split('&');

  for (var i = 0; i < parameter.length; i++) {
    var parameterName = parameter[i].split('=');

    if (parameterName[0] === target) {
      return parameterName[1];
    }
  }
}

function getUrlWord(target) {
  if (window.location.href.indexOf(target) > -1) {
    return true;
  }

  return false;
}

function offset(element) {
  var rect = element.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };
}

function verifyUrlFodler(target) {
  var arrFolder = window.location.pathname.split('/');

  if (arrFolder.indexOf(target) > -1) {
    return true;
  } else {
    return false;
  }
}

var WFCarousel =
/*#__PURE__*/
function () {
  function WFCarousel() {
    _classCallCheck(this, WFCarousel);

    /*removeIf(production)*/
    objWFDebug.debugMethod(this, objWFDebug.getMethodName());
    /*endRemoveIf(production)*/

    this.$carousel = document.querySelectorAll('.carousel');
    this.classDisplay = 'display-none';
    this.counterCurrent = 0;
    this.transition = 5;
  }

  _createClass(WFCarousel, [{
    key: "build",
    value: function build() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      if (this.$carousel.length < 1) {
        return;
      }

      this.interval = setInterval(this.verifyInternval, 1000);
      this.buildLayout();
      this.buildNavigation();
      this.watchResize();
    }
  }, {
    key: "buildLayout",
    value: function buildLayout() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      var self = this;
      Array.prototype.forEach.call(this.$carousel, function (item) {
        var length = item.querySelectorAll('.carousel-list li').length;
        self.resizeLayout(item);
        self.buildLayoutController(item, length);
        self.defineActive(item.querySelector('[data-id="' + item.getAttribute('data-current-slide') + '"]'));

        if (length === 1) {
          item.querySelector('[data-id="nav-left"]').classList.add(self.classDisplay);
          item.querySelector('[data-id="nav-right"]').classList.add(self.classDisplay);
          item.querySelector('.carousel-controller').classList.add(self.classDisplay);
        }
      });
    }
  }, {
    key: "watchResize",
    value: function watchResize() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      var self = this;

      window.onresize = function () {
        Array.prototype.forEach.call(self.$carousel, function (item) {
          var $this = item.parentNode.parentNode.parentNode.parentNode;
          var $carouselList = $this.querySelector('.carousel-list');
          var newSlide = 0;
          self.defineActive($this.querySelector('[data-id="' + newSlide + '"]'));
          self.animate(newSlide, $carouselList, 'arrow');
        });
      };
    }
  }, {
    key: "buildLayoutController",
    value: function buildLayoutController(target, length) {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName(), [target, length]);
      /*endRemoveIf(production)*/

      var concat = '';

      for (var i = 0; i < length; i++) {
        concat += '<li>';
        concat += '     <button type="button" class="bt-sm carousel-controller-bt" data-id="' + i + '" aria-hidden="true">';
        concat += '         <span class="fa fa-circle" aria-hidden="true"></span>';
        concat += '     </button>';
        concat += '</li>';
      }

      target.querySelector('.carousel-controller').innerHTML = concat;
    }
  }, {
    key: "buildNavigation",
    value: function buildNavigation() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      var self = this;
      var $carousel = document.querySelectorAll('.carousel');
      Array.prototype.forEach.call($carousel, function (item) {
        self.buildNavigationControllerBt(item);
        self.buildNavigationArrowLeft(item);
        self.buildNavigationArrowRight(item);
      });
    }
  }, {
    key: "buildNavigationControllerBt",
    value: function buildNavigationControllerBt(target) {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      var self = this;
      var button = target.querySelectorAll('.carousel-controller-bt');
      Array.prototype.forEach.call(button, function (item) {
        item.onclick = function () {
          item.parentNode.parentNode.parentNode.parentNode.querySelector('[data-current-slide="' + item.getAttribute('data-id') + '"]');
          self.defineActive(item);
          self.animate(item.getAttribute('data-id'), item, 'navigation');
        };
      });
    }
  }, {
    key: "buildNavigationArrowLeft",
    value: function buildNavigationArrowLeft(target) {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      var self = this;
      var button = target.querySelector('[data-id="nav-left"]');

      button.onclick = function () {
        var $carousel = button.parentNode.parentNode.parentNode.parentNode;
        var $carouselList = $carousel.querySelector('.carousel-list');
        var $carouselListLength = Number($carouselList.querySelectorAll('li').length);
        var currentSlide = Number($carousel.getAttribute('data-current-slide'));
        var newSlide = 0;

        if (currentSlide === 0) {
          newSlide = $carouselListLength - 1;
          $carousel.setAttribute('data-current-slide', newSlide);
        } else {
          newSlide = currentSlide - 1;
          $carousel.setAttribute('data-current-slide', newSlide);
        }

        self.defineActive($carousel.querySelector('[data-id="' + newSlide + '"]'));
        self.animate(newSlide, $carouselList, 'arrow');
      };
    }
  }, {
    key: "buildNavigationArrowRight",
    value: function buildNavigationArrowRight(target) {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      var self = this;
      var button = target.querySelector('[data-id="nav-right"]');

      button.onclick = function () {
        var $carousel = button.parentNode.parentNode.parentNode.parentNode;
        var $carouselList = $carousel.querySelector('.carousel-list');
        var $carouselListLength = Number($carouselList.querySelectorAll('li').length);
        var currentSlide = Number($carousel.getAttribute('data-current-slide'));
        var newSlide = 0;

        if (currentSlide === $carouselListLength - 1) {
          newSlide = 0;
          $carousel.setAttribute('data-current-slide', newSlide);
        } else {
          newSlide = currentSlide + 1;
          $carousel.setAttribute('data-current-slide', newSlide);
        }

        self.defineActive($carousel.querySelector('[data-id="' + newSlide + '"]'));
        self.animate(newSlide, $carouselList, 'arrow');
      };
    }
  }, {
    key: "animate",
    value: function animate(currentSlide, target, from) {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName(), [currentSlide, target, from]);
      /*endRemoveIf(production)*/

      var $carouselList = from === 'arrow' ? target.parentNode.parentNode.parentNode.querySelector('.carousel-list') : target.parentNode.parentNode.parentNode.parentNode.querySelector('.carousel-list');
      var $carousel = $carouselList.parentNode.parentNode.parentNode;
      var slideSize = Number($carouselList.querySelector('li').offsetWidth);
      var currentPosition = Number(currentSlide * slideSize);
      var transition = '.7s';

      switch ($carousel.getAttribute('data-style')) {
        case 'fade':
          Array.prototype.forEach.call($carouselList.querySelectorAll('li'), function (item) {
            item.style.opacity = 0;
          });
          $carouselList.querySelector('li').style.transition = transition;
          $carouselList.querySelectorAll('li')[currentSlide].style.opacity = 1;
          $carouselList.querySelectorAll('li')[currentSlide].style.left = '-' + currentPosition + 'px';
          $carouselList.querySelectorAll('li')[currentSlide].style.transition = transition;
          break;

        default:
          $carouselList.style.transform = 'translateX(-' + currentPosition + 'px)';
          break;
      }
    }
  }, {
    key: "verifyInternval",
    value: function verifyInternval() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      var self = objWFCarousel;
      self.counterCurrent++;

      if (self.counterCurrent >= self.transition) {
        self.counterCurrent = 0;
        Array.prototype.forEach.call(self.$carousel, function (item) {
          item.querySelector('[data-id="nav-right"]').click();
        });
      }
    }
  }, {
    key: "defineActive",
    value: function defineActive(target) {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName(), target);
      /*endRemoveIf(production)*/

      var listBt = target.parentNode.parentNode.querySelectorAll('.carousel-controller-bt');
      Array.prototype.forEach.call(listBt, function (item) {
        item.classList.remove('active');
      });
      target.classList.add('active');
    }
  }, {
    key: "resizeLayout",
    value: function resizeLayout(target) {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName(), target);
      /*endRemoveIf(production)*/

      var $carouselList = target.querySelector('.carousel-list');
      var $carouselListItem = $carouselList.querySelectorAll('li');
      var length = $carouselListItem.length;
      $carouselList.style.width = +length * 100 + '%';
      Array.prototype.forEach.call($carouselListItem, function (item) {
        item.style.width = +100 / length + '%';
      });
    }
  }]);

  return WFCarousel;
}();
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


var WFForm =
/*#__PURE__*/
function () {
  function WFForm() {
    _classCallCheck(this, WFForm);
  }

  _createClass(WFForm, [{
    key: "build",
    value: function build() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      if (document.querySelectorAll('form').length < 1) {
        return;
      }

      this.buildKeyboard();
      this.buildInputFile();
    }
  }, {
    key: "buildKeyboard",
    value: function buildKeyboard() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      var self = this;
      window.addEventListener('keyup', function (event) {
        if (event.keyCode === 13) {
          self.buildFocus('.radio');
          self.buildFocus('.checkbox');
          self.buildFocus('.input-switch');
        }
      });
    }
  }, {
    key: "buildFocus",
    value: function buildFocus(target) {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      var $arr = document.querySelectorAll(target);
      Array.prototype.forEach.call($arr, function (item) {
        var target = item.querySelector('input');

        if (document.activeElement == item) {
          target.click();
        }
      });
    }
  }, {
    key: "buildInputFile",
    value: function buildInputFile() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      var self = this;
      Array.prototype.forEach.call(document.querySelectorAll('input[type="file"]'), function (item) {
        var target = item.parentNode;
        item.style.display = 'none';
        target.insertAdjacentHTML('beforeend', self.buildInputFileHtml());
        target.setAttribute('tabIndex', 0);
        target.style.outline = 0;

        if (document.activeElement == target) {
          target.querySelector('.input-file').classList.add('focus');
        }

        item.addEventListener('focusout', function () {
          target.querySelector('.input-file').classList.remove('focus');
        });
      });
      Array.prototype.forEach.call(document.querySelectorAll('.input-file'), function (item) {
        var $target = item.parentNode;
        var $targetFileClass = $target.querySelector('.input-file-name');
        var $targetFile = $target.querySelector('input[type="file"]');
        item.addEventListener('click', function () {
          $targetFile.click();
        });
        $targetFile.addEventListener('change', function () {
          $targetFileClass.innerHTML = $targetFile.value;
        });
      });
    }
  }, {
    key: "buildInputFileHtml",
    value: function buildInputFileHtml() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      var inputFile = '';
      var textFile = objWFTranslation.translation["default"].input_upload;
      inputFile += '<div class="input-file">';
      inputFile += '    <div class="input-file-name"></div>';
      inputFile += '    <div class="input-file-text"><span class="fa fa-upload" aria-hidden="true"></span>&nbsp; ' + textFile + '</div>';
      inputFile += '</div>';
      return inputFile;
    }
  }, {
    key: "validateEmpty",
    value: function validateEmpty(arr) {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      var arrEmpty = arr;
      var length = arrEmpty.length;

      for (var i = 0; i < length; i++) {
        if (arrEmpty[i].val() === '') {
          arrEmpty[i].focus();
          return false;
        }
      }

      return true;
    }
  }]);

  return WFForm;
}();

var WFMenuDropDown =
/*#__PURE__*/
function () {
  function WFMenuDropDown() {
    _classCallCheck(this, WFMenuDropDown);

    /*removeIf(production)*/
    objWFDebug.debugMethod(this, objWFDebug.getMethodName());
    /*endRemoveIf(production)*/

    this.isClickBuild = false;
    this.classMenu = 'menu-drop-down';
    this.classArrow = 'bt-arrow';
    this.classMenuText = this.classMenu + '-text';
    this.classShowMobile = 'mobile-show';
    this.$menu = document.querySelectorAll('.' + this.classMenu + ' , ' + '.' + this.classMenuText);
    this.$menuDropDownUl = document.querySelectorAll('.' + this.classMenu + ' ul' + ' , ' + '.' + this.classMenuText + ' ul');
    this.$menuDropDownLi = document.querySelectorAll('.' + this.classMenu + ' ul li' + ' , ' + '.' + this.classMenuText + ' ul li');
    this.$icon = '<span class="' + this.classArrow + '">&nbsp;&nbsp;<span class="fa fa-caret-down" aria-hidden="true"></span></span>';
  }

  _createClass(WFMenuDropDown, [{
    key: "build",
    value: function build() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      if (this.$menu.length < 1) {
        return;
      }

      this.buildIcon();

      if (!this.isClickBuild) {
        this.isClickBuild = true;
        this.buildClick();
      }

      this.buildClickOut();
    }
  }, {
    key: "buildIcon",
    value: function buildIcon() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      var self = this;
      var $arr = document.querySelectorAll('.' + this.classMenu + ' ul > li > ul' + ' , .' + this.classMenuText + ' ul > li > ul');
      Array.prototype.forEach.call($arr, function (item) {
        if (!document.body.contains(item.parentNode.querySelector('.bt .' + self.classArrow + ' , .link .' + self.classArrow))) {
          item.parentNode.querySelector('.bt , .link').insertAdjacentHTML('beforeend', self.$icon);
        }
      });
    }
  }, {
    key: "buildClick",
    value: function buildClick() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      var self = this;
      Array.prototype.forEach.call(this.$menu, function (item) {
        var $bt = item.querySelectorAll('li > .bt , li > .link');
        var $btSubMenu = item.querySelectorAll('ul > li > ul > li > .bt , ul > li > ul > li > .link');
        Array.prototype.forEach.call($bt, function (item) {
          item.addEventListener('click', function () {
            self.buildClickAction(item);
          });
        });
        Array.prototype.forEach.call($btSubMenu, function (item) {
          item.addEventListener('click', function () {
            item.parentNode.parentNode.classList.remove(self.classShowMobile);
          });
        });
      });
    }
  }, {
    key: "buildClickAction",
    value: function buildClickAction(item) {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      var $menuChild = item.parentNode.querySelector('ul');

      if (!document.body.contains($menuChild)) {
        return;
      }

      var $menuDropDown = $menuChild.parentNode.parentNode.parentNode;
      var $menuDropDownUl = $menuDropDown.querySelector('ul > li > ul');

      if ($menuDropDownUl.classList.contains(this.classShowMobile)) {
        $menuDropDownUl.classList.remove(this.classShowMobile);
      }

      if ($menuChild.classList.contains(this.classShowMobile)) {
        $menuChild.classList.remove(this.classShowMobile);
      } else {
        $menuChild.classList.add(this.classShowMobile);
      }

      $menuChild.classList.remove(self.classShowMobile);
      $menuChild.style.opacity = 1;
    }
  }, {
    key: "buildClickOut",
    value: function buildClickOut() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      document.addEventListener('click', this.listener, true);
    }
  }, {
    key: "listener",
    value: function listener(event) {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      if (event.toElement.classList.contains('bt') || event.toElement.classList.contains('link')) {
        return;
      }

      Array.prototype.forEach.call(document.querySelectorAll('.' + objWFMenuDropDown.classShowMobile), function (item) {
        item.classList.remove(objWFMenuDropDown.classShowMobile);
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      document.removeEventListener('click', event, true);
      /*removeIf(production)*/

      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      objWFMenuDropDown = new WFMenuDropDown();
      document.removeEventListener('click', this.listener, true);
      objWFMenuDropDown.build();
    }
  }]);

  return WFMenuDropDown;
}();

var WFMenuTab =
/*#__PURE__*/
function () {
  function WFMenuTab() {
    _classCallCheck(this, WFMenuTab);
  }

  _createClass(WFMenuTab, [{
    key: "build",
    value: function build() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      this.defineActive();
    }
  }, {
    key: "defineActive",
    value: function defineActive() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      var self = this;
      var $arr = document.querySelectorAll('.menu-tab > ul > li > .bt');
      Array.prototype.forEach.call($arr, function (item) {
        item.addEventListener('click', function () {
          self.buildClick(item);
        });
      });
    }
  }, {
    key: "buildClick",
    value: function buildClick(item) {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      var classActive = 'menu-tab-active';
      var $arr = item.parentNode.parentNode.querySelectorAll('li');
      Array.prototype.forEach.call($arr, function (item) {
        item.classList.remove(classActive);
      });
      item.parentNode.classList.add(classActive);
    }
  }]);

  return WFMenuTab;
}();

var WFMenuToggle =
/*#__PURE__*/
function () {
  function WFMenuToggle() {
    _classCallCheck(this, WFMenuToggle);

    /*removeIf(production)*/
    objWFDebug.debugMethod(this, objWFDebug.getMethodName());
    /*endRemoveIf(production)*/
  }

  _createClass(WFMenuToggle, [{
    key: "build",
    value: function build() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      this.updateVariable();
      this.buildBt();
      this.watchResize();
    }
  }, {
    key: "updateVariable",
    value: function updateVariable() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      this.$bt = document.querySelectorAll('.bt-toggle');
    }
  }, {
    key: "buildBt",
    value: function buildBt() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      Array.prototype.forEach.call(this.$bt, function (el, i) {
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
    }
  }, {
    key: "watchResize",
    value: function watchResize() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      var self = this;

      window.onresize = function () {
        self.build();
      };
    }
  }, {
    key: "reset",
    value: function reset() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      this.build();
    }
  }]);

  return WFMenuToggle;
}();

var WFModal =
/*#__PURE__*/
function () {
  function WFModal() {
    _classCallCheck(this, WFModal);

    /*removeIf(production)*/
    objWFDebug.debugMethod(this, objWFDebug.getMethodName());
    /*endRemoveIf(production)*/

    this.$body = document.querySelector('body');
    this.targetBuildGalleryChange = '';
    this.cssDisplay = 'display-none';
  }

  _createClass(WFModal, [{
    key: "updateVariable",
    value: function updateVariable() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      this.$modal = document.querySelector('#modal');
      this.$modalFooter = this.$modal.querySelector('footer');
      this.$modalFooterConfirm = this.$modalFooter.querySelector('[data-id="confirm"]');
      this.$modalFooterCancel = this.$modalFooter.querySelector('[data-id="cancel"]');
      this.$modalClose = document.querySelector('#modal_close');
      this.$modalContent = document.querySelector('#modal_content');
      this.$modalBox = this.$modal.querySelector('.modal-box');
      this.$modalNavigationArrow = this.$modal.querySelector('.navigation-arrow');
      this.$modalNavigationArrowLeft = this.$modalNavigationArrow.querySelector('[data-id="nav-left"]');
      this.$modalNavigationArrowRight = this.$modalNavigationArrow.querySelector('[data-id="nav-right"]');
      this.$gallery = document.querySelectorAll('.gallery');
    }
  }, {
    key: "build",
    value: function build() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      this.buildHtml();
      this.updateVariable();
      this.buildMenu();
      this.buildMenuGallery();
      this.buildKeyboard();
      this.buildTranslation();
    }
  }, {
    key: "buildHtml",
    value: function buildHtml() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      var string = '';
      string += '<div id="modal" class="modal-close">';
      string += '     <div class="modal-box">';
      string += '         <header>';
      string += '             <button id="modal_close" type="button" aria-label="' + objWFTranslation.translation["default"].close + '" class="bt bt-sm bt-grey bt-transparent">';
      string += '                 <span class="fa fa-times" aria-hidden="true"></span>';
      string += '             </button>';
      string += '         </header>';
      string += '         <div class="row">';
      string += '             <div id="modal_content" class="col-es-12"></div>';
      string += '         </div>';
      string += '         <div class="menu-horizontal">';
      string += '             <ul class="navigation-arrow">';
      string += '                 <li>';
      string += '                     <button type="button" class="bt bt-bi" data-id="nav-left" aria-label="' + objWFTranslation.translation["default"].previous + '" >';
      string += '                         <span class="fa fa-angle-left" aria-hidden="true"></span>';
      string += '                     </button>';
      string += '                 </li>';
      string += '                 <li>';
      string += '                     <button type="button" class="bt bt-bi" data-id="nav-right" aria-label="' + objWFTranslation.translation["default"].next + '" >';
      string += '                         <span class="fa fa-angle-right" aria-hidden="true"></span>';
      string += '                     </button>';
      string += '                 </li>';
      string += '             </ul>';
      string += '         </div>';
      string += '         <footer class="display-none text-center">';
      string += '             <nav class="menu menu-horizontal">';
      string += '                 <ul>';
      string += '                     <li>';
      string += '                         <button type="button" class="bt bt-re bt-green" data-id="confirm"></button>';
      string += '                     </li>';
      string += '                     <li>';
      string += '                         <button type="button" class="bt bt-re bt-grey" data-id="cancel"></button>';
      string += '                     </li>';
      string += '                 </ul>';
      string += '             </nav>';
      string += '         </footer>';
      string += '     </div>';
      string += '</div>';
      this.$body.insertAdjacentHTML('afterbegin', string);
    }
  }, {
    key: "buildTranslation",
    value: function buildTranslation() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      this.$modalFooterConfirm.innerHTML = objWFTranslation.translation["default"].confirm;
      this.$modalFooterCancel.innerHTML = objWFTranslation.translation["default"].cancel;
    }
  }, {
    key: "buildKeyboard",
    value: function buildKeyboard() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      var self = this;
      window.addEventListener('keyup', function (event) {
        if (event.keyCode === 27) {
          self.closeModal();
        }

        if (event.keyCode === 37) {
          if (self.$modalNavigationArrowLeft.classList.contains(self.cssDisplay)) {
            return;
          } else {
            self.$modalNavigationArrowLeft.click();
          }
        }

        if (event.keyCode === 39) {
          if (self.$modalNavigationArrowRight.classList.contains(self.cssDisplay)) {
            return;
          } else {
            self.$modalNavigationArrowRight.click();
          }
        }
      });
    }
  }, {
    key: "buildMenuGallery",
    value: function buildMenuGallery() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      var self = this;

      if (!this.$gallery) {
        return;
      }

      Array.prototype.forEach.call(this.$gallery, function (item) {
        var button = item.querySelectorAll('a');
        Array.prototype.forEach.call(button, function (itemBt) {
          itemBt.addEventListener('click', function (event) {
            event.preventDefault();
            self.buildModal('gallery', false, 'fu');
            self.buildGalleryImage(itemBt.getAttribute('href'), itemBt.querySelector('img').getAttribute('data-description'));
            self.buildGalleryNavigation(itemBt);
          });
        });
      });
      this.$modalNavigationArrowLeft.addEventListener('click', function () {
        self.targetBuildGalleryChange.parentNode.previousElementSibling.querySelector('a').click();
      });
      this.$modalNavigationArrowRight.addEventListener('click', function () {
        self.targetBuildGalleryChange.parentNode.nextElementSibling.querySelector('a').click();
      });
    }
  }, {
    key: "buildMenu",
    value: function buildMenu() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      var self = this;
      this.$modalClose.addEventListener('click', function () {
        self.closeModal();
      });
      document.addEventListener('click', function (event) {
        var isButton = event.target.matches('button *, a *');

        if (isButton) {
          return;
        }
      });
      this.$modalFooter.querySelector('[data-id="cancel"]').addEventListener('click', function (event) {
        self.closeModal();
      });
    }
  }, {
    key: "buildGalleryNavigation",
    value: function buildGalleryNavigation(target) {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName(), target);
      /*endRemoveIf(production)*/

      var array = [];
      var currentGallery = target.parentNode.parentNode;
      var siblingLength = currentGallery.querySelectorAll('a').length - 1;
      Array.prototype.forEach.call(currentGallery.querySelectorAll('a'), function (item) {
        array.push(item);
      });
      var currentPosition = array.indexOf(target);

      if (siblingLength > 0) {
        this.$modalNavigationArrow.classList.remove(this.cssDisplay);
        this.targetBuildGalleryChange = target;

        if (currentPosition <= 0) {
          this.$modalNavigationArrowLeft.classList.add(this.cssDisplay);
        } else {
          this.$modalNavigationArrowLeft.classList.remove(this.cssDisplay);
        }

        if (currentPosition >= siblingLength) {
          this.$modalNavigationArrowRight.classList.add(this.cssDisplay);
        } else {
          this.$modalNavigationArrowRight.classList.remove(this.cssDisplay);
        }
      } else {
        this.$modalNavigationArrow.classList.add(this.cssDisplay);
      }
    }
  }, {
    key: "buildModal",
    value: function buildModal(kind, content) {
      var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 're';
      var action = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'open';

      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName(), [kind, content, size, action]);
      /*endRemoveIf(production)*/

      this.$modalFooter.classList.add(this.cssDisplay);
      action === 'open' ? this.openModal() : this.closeModal();
      this.buildModalSize(size);
      this.buildModalKind(kind, content);
    }
  }, {
    key: "buildModalKind",
    value: function buildModalKind(kind, content) {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName(), [kind, content]);
      /*endRemoveIf(production)*/

      if (kind === 'ajax') {
        this.buildContentAjax(content);
      }

      if (kind === 'confirmation') {
        this.buildContentConfirmation(content);
      }

      switch (kind) {
        case 'gallery':
          this.$modalNavigationArrow.classList.remove('arrow-inactive');
          this.$modalNavigationArrow.classList.add('arrow-active');
          break;

        default:
          this.$modalNavigationArrow.classList.remove('arrow-active');
          this.$modalNavigationArrow.classList.add('arrow-inactive');
          break;
      }
    }
  }, {
    key: "openModal",
    value: function openModal() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      this.$body.classList.remove('overflow-y');
      this.$body.classList.add('overflow-hidden');
      this.$body.style.overflowY = 'hidden';
      this.$modal.classList.remove('modal-close');
      this.$modalBox.classList.add('modal-animate');
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      this.$body.classList.add('overflow-y');
      this.$body.classList.remove('overflow-hidden');
      this.$body.style.overflowY = 'auto';
      this.$body.style.position = 'relative';
      this.$modal.classList.add('modal-close');
      this.$modalBox.classList.remove('modal-animate');
      this.resetOtherClass();
    }
  }, {
    key: "buildModalSize",
    value: function buildModalSize() {
      var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 're';

      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName(), size);
      /*endRemoveIf(production)*/

      this.$modalBox.classList.remove('modal-es');
      this.$modalBox.classList.remove('modal-sm');
      this.$modalBox.classList.remove('modal-re');
      this.$modalBox.classList.remove('modal-bi');
      this.$modalBox.classList.remove('modal-eb');
      this.$modalBox.classList.remove('modal-fu');
      this.$modalBox.classList.add('modal-' + size);
    }
  }, {
    key: "buildContentAjax",
    value: function buildContentAjax(target) {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName(), target);
      /*endRemoveIf(production)*/

      var self = this;
      var ajax = new XMLHttpRequest();

      ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          self.$modalContent.innerHTML = this.responseText;
          self.resetOtherClass();
        }
      };

      ajax.open('GET', target, true);
      ajax.send();
    }
  }, {
    key: "buildGalleryImage",
    value: function buildGalleryImage(image, description) {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName(), [image, description]);
      /*endRemoveIf(production)*/

      var stringImage = '<img src="' + image + '" class="img-responsive" style="margin:auto;" title="" alt=""/>';
      this.$modalContent.innerHTML = stringImage;
      this.changeText(description);
    }
  }, {
    key: "buildContentConfirmation",
    value: function buildContentConfirmation(content) {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName(), content);
      /*endRemoveIf(production)*/

      var string = '<div class="padding-re text-center">' + content + '</div>';
      this.$modalFooter.classList.remove(this.cssDisplay);
      this.$modalContent.innerHTML = string;
    }
  }, {
    key: "buildContentConfirmationAction",
    value: function buildContentConfirmationAction(action) {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName(), action);
      /*endRemoveIf(production)*/

      this.$modalFooterConfirm.setAttribute('onclick', action);
    }
  }, {
    key: "changeText",
    value: function changeText(description) {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName(), [description]);
      /*endRemoveIf(production)*/

      var string = '';

      if (description === '') {
        return false;
      }

      string += '<p class="modal-description">';
      string += description;
      string += '</p>';

      if (_typeof(description) !== (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
        this.$modalContent.insertAdjacentHTML('beforeend', string);
      }
    }
  }, {
    key: "resetOtherClass",
    value: function resetOtherClass() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      if (typeof objWFForm !== 'undefined') {
        objWFForm.buildInputFile();
      }

      if (typeof objWFMenuDropDown !== 'undefined') {
        objWFMenuDropDown.reset();
      }

      if (typeof objWFMenuToggle !== 'undefined') {
        objWFMenuToggle.build();
      }

      if (typeof objWFTooltip !== 'undefined') {
        objWFTooltip.reset();
      }

      if (typeof objWFMenuTab !== 'undefined') {
        objWFMenuTab.defineActive();
      }
    }
  }]);

  return WFModal;
}();

var WFNotification =
/*#__PURE__*/
function () {
  function WFNotification() {
    _classCallCheck(this, WFNotification);

    /*removeIf(production)*/
    objWFDebug.debugMethod(this, objWFDebug.getMethodName());
    /*endRemoveIf(production)*/

    this.$body = document.querySelector('body');
    this.$notifyItem = document.querySelectorAll('.notify-item');
    this.notifyId = 0;
  }

  _createClass(WFNotification, [{
    key: "build",
    value: function build() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      this.buildHtml();
      this.buildNavigation();
    }
  }, {
    key: "buildHtml",
    value: function buildHtml() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      var string = '';
      string += '<div id="notify">';
      string += '    <ul class="notify-list">';
      string += '    </ul>';
      string += '</div>';
      this.$body.insertAdjacentHTML('beforeend', string);
      this.$notify = document.querySelector('#notify .notify-list');
    }
  }, {
    key: "buildHtmlItem",
    value: function buildHtmlItem() {
      var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'grey';
      var message = arguments.length > 1 ? arguments[1] : undefined;

      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName(), [style, message]);
      /*endRemoveIf(production)*/

      var string = '';
      string += '<li id="notify_' + this.notifyId + '">';
      string += '     <div class="notify-item notify-' + style + '">';
      string += '         <span class="text">';
      string += message;
      string += '         </span>';
      string += '         <button type="button" class="bt" onclick="$(this).parent().parent().remove();" aria-label="' + objWFTranslation.translation["default"].close + '">';
      string += '            <span class="fa fa-times" aria-hidden="true"></span>';
      string += '         </button>';
      string += '     </div>';
      string += '</li>';
      return string;
    }
  }, {
    key: "buildNavigation",
    value: function buildNavigation() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      Array.prototype.forEach.call(this.$notifyItem, function (item) {
        var bt = item.querySelectorAll('.bt');
        Array.prototype.forEach.call(bt, function (item) {
          item.addEventListener('click', function () {
            item.parentNode.parentNode.parentNode.removeChild(item.parentNode.parentNode);
          });
        });
      });
    }
  }, {
    key: "addNotification",
    value: function addNotification(message, style) {
      var place = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.$notify;

      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName(), [message, style, place]);
      /*endRemoveIf(production)*/

      var string = this.buildHtmlItem(style, message);
      var newPlace = '';

      if (!message) {
        return false;
      }

      if (place !== this.$notify) {
        newPlace = document.querySelector(place);

        if (!newPlace.querySelector('.notify-list')) {
          newPlace.insertAdjacentHTML('beforeend', '<ul class="notify-list"></ul>');
        }
      }

      if (place !== this.$notify) {
        newPlace.querySelector('.notify-list').insertAdjacentHTML('beforeend', string);
      } else {
        place.insertAdjacentHTML('beforeend', string);
      }

      this.removeNotifyListItem(document.querySelector('#notify_' + this.notifyId), message.length);
      this.notifyId++;
    }
  }, {
    key: "removeNotifyListItem",
    value: function removeNotifyListItem(item, messageLength) {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName(), [item, messageLength]);
      /*endRemoveIf(production)*/

      var messageTime = messageLength * 150;

      function remove() {
        item.parentNode.removeChild(item);
      }

      setTimeout(remove, messageTime);
    }
  }]);

  return WFNotification;
}();

var WFProgress =
/*#__PURE__*/
function () {
  function WFProgress() {
    _classCallCheck(this, WFProgress);

    /*removeIf(production)*/
    objWFDebug.debugMethod(this, objWFDebug.getMethodName());
    /*endRemoveIf(production)*/

    this.$bar = document.querySelector('#loading_main .progress-bar');
    this.$all = document.querySelectorAll('div, section, article');
    this.$allLength = this.$all.length;
    this.isFinish = false;
    this.progressSize = 0;
  }

  _createClass(WFProgress, [{
    key: "build",
    value: function build() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      var self = this;
      var interval = setInterval(frame, 1);
      var total = this.buildProportion();

      function frame() {
        var porcentage = self.progressSize * 100 / total;
        self.progressSize++;
        self.$bar.style.width = porcentage + '%';

        if (self.progressSize >= total) {
          clearInterval(interval);
          objWFLoading.finish();
          self.isFinish = true;
        }
      }
    }
  }, {
    key: "buildProportion",
    value: function buildProportion() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      if (this.$allLength > 1000) {
        return this.$allLength / 50;
      }

      if (this.$allLength > 900) {
        return this.$allLength / 45;
      }

      if (this.$allLength > 800) {
        return this.$allLength / 40;
      }

      if (this.$allLength > 700) {
        return this.$allLength / 35;
      }

      if (this.$allLength > 600) {
        return this.$allLength / 30;
      }

      if (this.$allLength > 500) {
        return this.$allLength / 25;
      }

      if (this.$allLength > 400) {
        return this.$allLength / 20;
      }

      if (this.$allLength > 300) {
        return this.$allLength / 15;
      }

      if (this.$allLength > 200) {
        return this.$allLength / 10;
      }

      return this.$allLength;
    }
  }]);

  return WFProgress;
}();

var WFTable =
/*#__PURE__*/
function () {
  function WFTable() {
    _classCallCheck(this, WFTable);

    /*removeIf(production)*/
    objWFDebug.debugMethod(this, objWFDebug.getMethodName());
    /*endRemoveIf(production)*/

    this.$table = document.querySelectorAll('.table');
  }

  _createClass(WFTable, [{
    key: "build",
    value: function build() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      if (this.$table.length < 1) {
        return;
      }

      this.buildResponsive();
    }
  }, {
    key: "buildResponsive",
    value: function buildResponsive() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      Array.prototype.forEach.call(this.$table, function (item) {
        var wrapper = document.createElement('div');
        wrapper.className = 'table-responsive';
        item.parentNode.insertBefore(wrapper, item);
        wrapper.appendChild(item);
      });
    }
  }]);

  return WFTable;
}();

var WFTag =
/*#__PURE__*/
function () {
  function WFTag() {
    _classCallCheck(this, WFTag);

    /*removeIf(production)*/
    objWFDebug.debugMethod(this, objWFDebug.getMethodName());
    /*endRemoveIf(production)*/

    this.$tagBt = document.querySelectorAll('.tag-item-bt');
  }

  _createClass(WFTag, [{
    key: "build",
    value: function build() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      if (this.$tagBt.length < 1) {
        return;
      }

      this.buildClick();
    }
  }, {
    key: "buildClick",
    value: function buildClick() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      Array.prototype.forEach.call(this.$tagBt, function (item) {
        var $bt = item.querySelector('.tag-bt');
        $bt.addEventListener('click', function () {
          $bt.parentNode.parentNode.parentNode.removeChild($bt.parentNode.parentNode);
        });
      });
    }
  }]);

  return WFTag;
}();

var WFTooltip =
/*#__PURE__*/
function () {
  function WFTooltip() {
    _classCallCheck(this, WFTooltip);

    /*removeIf(production)*/
    objWFDebug.debugMethod(this, objWFDebug.getMethodName());
    /*endRemoveIf(production)*/

    this.elementTop = 0;
    this.elementLeft = 0;
    this.elementWidth = 0;
    this.elementHeight = 0;
    this.elementLeft = 0;
    this.style = 'black';
    this.space = 5;
    this.currentWindowScroll = 0;
    this.windowWidth = 0;
    this.windowHeight = 0;
    this.centerWidth = 0;
    this.centerHeight = 0;
    this.positionTop = 0;
    this.positionLeft = 0;
  }

  _createClass(WFTooltip, [{
    key: "build",
    value: function build() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      this.buildHtml();
      this.updateVariable(false);

      if (this.$tooltipData.length < 1) {
        return;
      }

      this.buildMaxWidth();
      this.buildResize();
      this.buildTooltip();
    }
  }, {
    key: "updateVariable",
    value: function updateVariable(element) {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName(), element);
      /*endRemoveIf(production)*/

      this.$tooltip = document.querySelector('#tooltip');
      this.$tooltipBody = document.querySelector('#tooltip_body');
      this.$tooltipPointer = document.querySelector('#tooltip_pointer');
      this.$tooltipData = document.querySelectorAll('[data-tooltip="true"]');
      this.windowWidth = window.offsetWidth;
      this.windowHeight = window.offsetHeight;
      this.currentWindowScroll = window.scrollY;
      this.elementTop = element !== false ? offset(element).top : 0;
      this.elementLeft = element !== false ? offset(element).left : 0;
      this.elementWidth = element !== false ? element.offsetWidth : 0;
      this.elementHeight = element !== false ? element.offsetHeight : 0;
      this.tooltipWidth = element !== false ? this.$tooltip.offsetWidth : 0;
      this.tooltipHeight = element !== false ? this.$tooltip.offsetHeight : 0;
      this.centerWidth = (this.tooltipWidth - this.elementWidth) / 2;
      this.centerHeight = this.elementHeight / 2 - this.tooltipHeight / 2;
      this.positionLeft = this.elementLeft - this.centerWidth;
      this.positionTop = this.elementTop - this.tooltipHeight - this.space;
    }
  }, {
    key: "buildHtml",
    value: function buildHtml() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      var string = '';
      string += '<div id="tooltip">';
      string += '    <div id="tooltip_body"></div>';
      string += '    <div id="tooltip_pointer"></div>';
      string += '</div>';
      document.querySelector('body').insertAdjacentHTML('beforeend', string);
    }
  }, {
    key: "buildResize",
    value: function buildResize() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      var self = this;

      window.onresize = function () {
        self.updateVariable(false);
        self.buildMaxWidth();
      };
    }
  }, {
    key: "buildTooltip",
    value: function buildTooltip() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      var self = this;
      this.showTooltip(false);
      Array.prototype.forEach.call(this.$tooltipData, function (item) {
        var title = item.getAttribute('title');

        if (typeof title !== 'undefined' && title !== null && title !== '') {
          item.setAttribute('data-tooltip-text', title);
          item.removeAttribute('title');

          item.onmouseover = function () {
            self.$tooltipBody.innerHTML = item.getAttribute('data-tooltip-text');
            self.changeLayout(item.getAttribute('data-tooltip-color'));
            self.positionTooltip(item, item.getAttribute('data-tooltip-placement'));
            self.showTooltip(true);
          };

          item.onmouseout = function () {
            self.showTooltip(false);
          };
        }
      });
    }
  }, {
    key: "buildMaxWidth",
    value: function buildMaxWidth() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      this.$tooltip.style.maxWidth = this.windowWidth - this.space * 2;
    }
  }, {
    key: "showTooltip",
    value: function showTooltip(action) {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName(), action);
      /*endRemoveIf(production)*/

      if (action) {
        this.$tooltip.classList.add('tooltip-show');
      } else {
        this.$tooltip.classList.remove('tooltip-show');
      }
    }
  }, {
    key: "positionTooltipSwitchDirection",
    value: function positionTooltipSwitchDirection(placement) {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName(), placement);
      /*endRemoveIf(production)*/

      var direction = typeof placement === 'undefined' ? 'top' : placement;

      switch (direction) {
        case 'top':
          if (this.elementTop - this.tooltipHeight < this.currentWindowScroll) {
            direction = 'bottom';
          }

          break;

        case 'right':
          if (this.elementLeft + this.tooltipWidth + this.elementWidth > this.windowWidth) {
            direction = 'left';
          }

          break;

        case 'bottom':
          if (this.elementTop + this.tooltipHeight + this.elementHeight > this.currentWindowScroll + this.windowHeight) {
            direction = 'top';
          }

          break;

        case 'left':
          if (this.tooltipWidth + this.space > this.elementLeft) {
            direction = 'right';
          }

          break;
      }

      return direction;
    }
  }, {
    key: "positionTooltipTop",
    value: function positionTooltipTop() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      this.positionTop = this.elementTop - this.tooltipHeight - this.space;
      this.positionLeft = this.elementLeft - this.centerWidth;
    }
  }, {
    key: "positionTooltipBottom",
    value: function positionTooltipBottom() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      this.positionTop = this.elementTop + this.elementHeight + this.space;
      this.positionLeft = this.elementLeft - this.centerWidth;
    }
  }, {
    key: "positionTooltipRight",
    value: function positionTooltipRight() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      this.positionTop = this.elementTop + this.centerHeight;
      this.positionLeft = this.elementLeft + this.elementWidth + this.space;
    }
  }, {
    key: "positionTooltipLeft",
    value: function positionTooltipLeft() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      this.positionTop = this.elementTop + this.centerHeight;
      this.positionLeft = this.elementLeft - this.tooltipWidth - this.space;
    }
  }, {
    key: "positionTooltip",
    value: function positionTooltip(element, placement) {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName(), [element, placement]);
      this.updateVariable(element);
      var direction = this.positionTooltipSwitchDirection(placement);

      switch (direction) {
        case 'top':
          this.positionTooltipTop();
          break;

        case 'right':
          this.positionTooltipRight();
          break;

        case 'bottom':
          this.positionTooltipBottom();
          break;

        case 'left':
          this.positionTooltipLeft();
          break;
      }

      this.changeArrowDirection(direction);
      this.buildLimits();
      this.$tooltip.style.top = this.positionTop + 'px';
      this.$tooltip.style.left = this.positionLeft + 'px';

      if (direction === 'top' || direction === 'bottom') {
        this.changeArrowPositionHorizontal();
      } else {
        this.changeArrowPositionVertical();
      }
    }
  }, {
    key: "buildLimits",
    value: function buildLimits() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      if (this.positionLeft <= 0) {
        this.positionLeft = this.space;
      }

      if (this.positionLeft + this.tooltipWidth >= this.windowWidth) {
        this.positionLeft = this.windowWidth - this.tooltipWidth - this.space;
      }
    }
  }, {
    key: "changeArrowPositionHorizontal",
    value: function changeArrowPositionHorizontal() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      this.$tooltipPointer.style.left = this.$tooltip.offsetWidth / 2 + 'px';
    }
  }, {
    key: "changeArrowPositionVertical",
    value: function changeArrowPositionVertical() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      this.$tooltipPointer.style.left = '';
    }
  }, {
    key: "changeArrowDirection",
    value: function changeArrowDirection(direction) {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName(), direction);
      /*endRemoveIf(production)*/

      this.$tooltipPointer.classList.remove('tooltip-direction-top');
      this.$tooltipPointer.classList.remove('tooltip-direction-bottom');
      this.$tooltipPointer.classList.remove('tooltip-direction-left');
      this.$tooltipPointer.classList.remove('tooltip-direction-right');
      this.$tooltipPointer.classList.add('tooltip-direction-' + direction);
    }
  }, {
    key: "changeLayout",
    value: function changeLayout(style) {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName(), style);
      /*endRemoveIf(production)*/

      var newStyle = typeof style === 'undefined' ? newStyle = this.style : style;
      this.$tooltip.removeAttribute('class');
      this.$tooltip.classList.add('tooltip');
      this.$tooltip.classList.add('tooltip-' + newStyle);
    }
  }, {
    key: "reset",
    value: function reset() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      var element = document.getElementById('tooltip');
      element.parentNode.removeChild(element);
      objWFTooltip = new WFTooltip();
      objWFTooltip.build();
    }
  }]);

  return WFTooltip;
}();

var WFTranslation =
/*#__PURE__*/
function () {
  function WFTranslation() {
    _classCallCheck(this, WFTranslation);

    /*removeIf(production)*/
    objWFDebug.debugMethod(this, objWFDebug.getMethodName());
    /*endRemoveIf(production)*/

    this.translation = '';
  }

  _createClass(WFTranslation, [{
    key: "build",
    value: function build() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      this.defineLanguege();
    }
  }, {
    key: "defineLanguege",
    value: function defineLanguege() {
      /*removeIf(production)*/
      objWFDebug.debugMethod(this, objWFDebug.getMethodName());
      /*endRemoveIf(production)*/

      switch (globalFrameworkLanguage) {
        case 'pt':
          this.translation = translationPTBR;
          break;

        case 'en':
          this.translation = translationEN;
          break;
      }
    }
  }]);

  return WFTranslation;
}();