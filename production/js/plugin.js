"use strict";function _typeof2(e){return(_typeof2="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"===_typeof2(Symbol.iterator)?function(e){return _typeof2(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":_typeof2(e)})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var o=0;o<t.length;o++){var i=t[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function _createClass(e,t,o){return t&&_defineProperties(e.prototype,t),o&&_defineProperties(e,o),e}var Carousel=function(){function e(){_classCallCheck(this,e),objDebug.debugMethod(this,objDebug.getMethodName()),this.$carousel=document.querySelectorAll(".carousel"),this.classDisplay="display-none",this.counterCurrent=0,this.transition=5}return _createClass(e,[{key:"build",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),this.$carousel.length<1||(this.interval=setInterval(this.verifyInternval,1e3),this.buildLayout(),this.buildNavigation(),this.watchResize())}},{key:"buildLayout",value:function(){objDebug.debugMethod(this,objDebug.getMethodName());var e=this;Array.prototype.forEach.call(this.$carousel,function(t){var o=t.querySelectorAll(".carousel-list li").length;e.resizeLayout(t),e.buildLayoutController(t,o),e.defineActive(t.querySelector('[data-id="'+t.getAttribute("data-current-slide")+'"]')),1===o&&(t.querySelector('[data-id="nav-left"]').classList.add(e.classDisplay),t.querySelector('[data-id="nav-right"]').classList.add(e.classDisplay),t.querySelector(".carousel-controller").classList.add(e.classDisplay))})}},{key:"watchResize",value:function(){objDebug.debugMethod(this,objDebug.getMethodName());var e=this;window.onresize=function(){Array.prototype.forEach.call(e.$carousel,function(t){var o=t.parentNode.parentNode.parentNode.parentNode,i=o.querySelector(".carousel-list");e.defineActive(o.querySelector('[data-id="0"]')),e.animate(0,i,"arrow")})}}},{key:"buildLayoutController",value:function(e,t){objDebug.debugMethod(this,objDebug.getMethodName(),[e,t]);for(var o="",i=0;i<t;i++)o+="<li>",o+='     <button type="button" class="bt-sm carousel-controller-bt" data-id="'+i+'" aria-hidden="true">',o+='         <span class="fa fa-circle" aria-hidden="true"></span>',o+="     </button>",o+="</li>";e.querySelector(".carousel-controller").innerHTML=o}},{key:"buildNavigation",value:function(){objDebug.debugMethod(this,objDebug.getMethodName());var e=this,t=document.querySelectorAll(".carousel");Array.prototype.forEach.call(t,function(t){e.buildNavigationControllerBt(t),e.buildNavigationArrowLeft(t),e.buildNavigationArrowRight(t)})}},{key:"buildNavigationControllerBt",value:function(e){objDebug.debugMethod(this,objDebug.getMethodName());var t=this,o=e.querySelectorAll(".carousel-controller-bt");Array.prototype.forEach.call(o,function(e){e.onclick=function(){e.parentNode.parentNode.parentNode.parentNode.querySelector('[data-current-slide="'+e.getAttribute("data-id")+'"]'),t.defineActive(e),t.animate(e.getAttribute("data-id"),e,"navigation")}})}},{key:"buildNavigationArrowLeft",value:function(e){objDebug.debugMethod(this,objDebug.getMethodName());var t=this,o=e.querySelector('[data-id="nav-left"]');o.onclick=function(){var e=o.parentNode.parentNode.parentNode.parentNode,i=e.querySelector(".carousel-list"),a=Number(i.querySelectorAll("li").length),l=Number(e.getAttribute("data-current-slide")),n=0;0===l?(n=a-1,e.setAttribute("data-current-slide",n)):(n=l-1,e.setAttribute("data-current-slide",n)),t.defineActive(e.querySelector('[data-id="'+n+'"]')),t.animate(n,i,"arrow")}}},{key:"buildNavigationArrowRight",value:function(e){objDebug.debugMethod(this,objDebug.getMethodName());var t=this,o=e.querySelector('[data-id="nav-right"]');o.onclick=function(){var e=o.parentNode.parentNode.parentNode.parentNode,i=e.querySelector(".carousel-list"),a=Number(i.querySelectorAll("li").length),l=Number(e.getAttribute("data-current-slide")),n=0;l===a-1?(n=0,e.setAttribute("data-current-slide",n)):(n=l+1,e.setAttribute("data-current-slide",n)),t.defineActive(e.querySelector('[data-id="'+n+'"]')),t.animate(n,i,"arrow")}}},{key:"animate",value:function(e,t,o){objDebug.debugMethod(this,objDebug.getMethodName(),[e,t,o]);var i="arrow"===o?t.parentNode.parentNode.parentNode.querySelector(".carousel-list"):t.parentNode.parentNode.parentNode.parentNode.querySelector(".carousel-list"),a=i.parentNode.parentNode.parentNode,l=Number(i.querySelector("li").offsetWidth),n=Number(e*l);switch(a.getAttribute("data-style")){case"fade":Array.prototype.forEach.call(i.querySelectorAll("li"),function(e){e.style.opacity=0}),i.querySelector("li").style.transition=".7s",i.querySelectorAll("li")[e].style.opacity=1,i.querySelectorAll("li")[e].style.left="-"+n+"px",i.querySelectorAll("li")[e].style.transition=".7s";break;default:i.style.transform="translateX(-"+n+"px)"}}},{key:"verifyInternval",value:function(){objDebug.debugMethod(this,objDebug.getMethodName());var e=objCarousel;e.counterCurrent++,e.counterCurrent>=e.transition&&(e.counterCurrent=0,Array.prototype.forEach.call(e.$carousel,function(e){e.querySelector('[data-id="nav-right"]').click()}))}},{key:"defineActive",value:function(e){objDebug.debugMethod(this,objDebug.getMethodName(),e);var t=e.parentNode.parentNode.querySelectorAll(".carousel-controller-bt");Array.prototype.forEach.call(t,function(e){e.classList.remove("active")}),e.classList.add("active")}},{key:"resizeLayout",value:function(e){objDebug.debugMethod(this,objDebug.getMethodName(),e);var t=e.querySelector(".carousel-list"),o=t.querySelectorAll("li"),i=o.length;t.style.width=100*+i+"%",Array.prototype.forEach.call(o,function(e){e.style.width=100/i+"%"})}}]),e}(),Debug=function(){function e(){_classCallCheck(this,e),this.isLayout=!0,this.isManagement=!0,this.isLoading=!0,this.isTheme=!0,this.isCarousel=!0,this.isForm=!0,this.isGeneric=!0,this.isMenuDropDown=!0,this.isMenuTab=!0,this.isMenuToggle=!0,this.isModal=!0,this.isNotification=!0,this.isProgress=!0,this.isTable=!0,this.isTag=!0,this.isTooltip=!0,this.isTranslation=!0}return _createClass(e,[{key:"debugMethod",value:function(e,t){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",i="",a=e.constructor.name;if(!this["is"+a])return!1;i+="%c",i+="obj"+a,i+=".",i+="%c",i+=t,i+="(",i+="%c",""!==o&&(i+=o),i+="%c",i+=");",console.log(i,"color: black","color: blue","color: red","color: blue")}},{key:"getMethodName",value:function(){if(window.navigator.userAgent.indexOf(".NET ")>0)return!1;var e=new Error("dummy").stack.split("\n")[2].replace(/^\s+at\s+(.+?)\s.+/g,"$1"),t=e.split(".");return"new"!==e?t[1]:"constructor"}}]),e}(),Form=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"build",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),document.querySelectorAll("form").length<1||(this.buildKeyboard(),this.buildInputFile())}},{key:"buildKeyboard",value:function(){objDebug.debugMethod(this,objDebug.getMethodName());var e=this;window.addEventListener("keyup",function(t){13===t.keyCode&&(e.buildFocus(".radio"),e.buildFocus(".checkbox"),e.buildFocus(".input-switch"))})}},{key:"buildFocus",value:function(e){objDebug.debugMethod(this,objDebug.getMethodName());var t=document.querySelectorAll(e);Array.prototype.forEach.call(t,function(e){var t=e.querySelector("input");document.activeElement==e&&t.click()})}},{key:"buildInputFile",value:function(){objDebug.debugMethod(this,objDebug.getMethodName());var e=this;Array.prototype.forEach.call(document.querySelectorAll('input[type="file"]'),function(t){var o=t.parentNode;t.style.display="none",o.insertAdjacentHTML("beforeend",e.buildInputFileHtml()),o.setAttribute("tabIndex",0),o.style.outline=0,document.activeElement==o&&o.querySelector(".input-file").classList.add("focus"),t.addEventListener("focusout",function(){o.querySelector(".input-file").classList.remove("focus")})}),Array.prototype.forEach.call(document.querySelectorAll(".input-file"),function(e){var t=e.parentNode,o=t.querySelector(".input-file-name"),i=t.querySelector('input[type="file"]');e.addEventListener("click",function(){i.click()}),i.addEventListener("change",function(){o.innerHTML=i.value})})}},{key:"buildInputFileHtml",value:function(){objDebug.debugMethod(this,objDebug.getMethodName());var e="";return e+='<div class="input-file">',e+='    <div class="input-file-name"></div>',e+='    <div class="input-file-text"><span class="fa fa-upload" aria-hidden="true"></span>&nbsp; '+objTranslation.translation.default.input_upload+"</div>",e+="</div>"}},{key:"validateEmpty",value:function(e){objDebug.debugMethod(this,objDebug.getMethodName());for(var t=e,o=t.length,i=0;i<o;i++)if(""===t[i].val())return t[i].focus(),!1;return!0}}]),e}();function buildURL(e){return objDebug.debugMethod(this,objDebug.getMethodName()),e.toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g,"-").toLowerCase().replace(/&/g,"-and-").replace(/[^a-z0-9\-]/g,"").replace(/-+/g,"-").replace(/^-*/,"").replace(/-*$/,"")}function getUrlParameter(e){objDebug.debugMethod(this,objDebug.getMethodName(),e);for(var t=top.location.search.substring(1).split("&"),o=0;o<t.length;o++){var i=t[o].split("=");if(i[0]===e)return i[1]}}function offset(e){var t=e.getBoundingClientRect(),o=window.pageXOffset||document.documentElement.scrollLeft,i=window.pageYOffset||document.documentElement.scrollTop;return{top:t.top+i,left:t.left+o}}function verifyUrlFodler(e){return objDebug.debugMethod(this,objDebug.getMethodName(),e),window.location.pathname.split("/").indexOf(e)>-1}var MenuDropDown=function(){function e(){_classCallCheck(this,e),objDebug.debugMethod(this,objDebug.getMethodName()),this.isClickBuild=!1,this.classMenu="menu-drop-down",this.classArrow="bt-arrow",this.classMenuText=this.classMenu+"-text",this.classShowMobile="mobile-show",this.$menu=document.querySelectorAll("."+this.classMenu+" , ."+this.classMenuText),this.$menuDropDownUl=document.querySelectorAll("."+this.classMenu+" ul , ."+this.classMenuText+" ul"),this.$menuDropDownLi=document.querySelectorAll("."+this.classMenu+" ul li , ."+this.classMenuText+" ul li"),this.$icon='<span class="'+this.classArrow+'">&nbsp;&nbsp;<span class="fa fa-caret-down" aria-hidden="true"></span></span>'}return _createClass(e,[{key:"build",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),this.$menu.length<1||(this.buildIcon(),this.isClickBuild||(this.isClickBuild=!0,this.buildClick()),this.buildClickOut())}},{key:"buildIcon",value:function(){objDebug.debugMethod(this,objDebug.getMethodName());var e=this,t=document.querySelectorAll("."+this.classMenu+" ul > li > ul , ."+this.classMenuText+" ul > li > ul");Array.prototype.forEach.call(t,function(t){document.body.contains(t.parentNode.querySelector(".bt ."+e.classArrow+" , .link ."+e.classArrow))||t.parentNode.querySelector(".bt , .link").insertAdjacentHTML("beforeend",e.$icon)})}},{key:"buildClick",value:function(){objDebug.debugMethod(this,objDebug.getMethodName());var e=this;Array.prototype.forEach.call(this.$menu,function(t){var o=t.querySelectorAll("li > .bt , li > .link"),i=t.querySelectorAll("ul > li > ul > li > .bt , ul > li > ul > li > .link");Array.prototype.forEach.call(o,function(t){t.addEventListener("click",function(){e.buildClickAction(t)})}),Array.prototype.forEach.call(i,function(t){t.addEventListener("click",function(){t.parentNode.parentNode.classList.remove(e.classShowMobile)})})})}},{key:"buildClickAction",value:function(e){objDebug.debugMethod(this,objDebug.getMethodName());var t=e.parentNode.querySelector("ul");if(document.body.contains(t)){var o=t.parentNode.parentNode.parentNode.querySelector("ul > li > ul");o.classList.contains(this.classShowMobile)&&o.classList.remove(this.classShowMobile),t.classList.contains(this.classShowMobile)?t.classList.remove(this.classShowMobile):t.classList.add(this.classShowMobile),t.classList.remove(self.classShowMobile),t.style.opacity=1}}},{key:"buildClickOut",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),document.addEventListener("click",this.listener,!0)}},{key:"listener",value:function(e){objDebug.debugMethod(this,objDebug.getMethodName()),e.toElement.classList.contains("bt")||e.toElement.classList.contains("link")||Array.prototype.forEach.call(document.querySelectorAll("."+objMenuDropDown.classShowMobile),function(e){e.classList.remove(objMenuDropDown.classShowMobile)})}},{key:"reset",value:function(){document.removeEventListener("click",event,!0),objDebug.debugMethod(this,objDebug.getMethodName()),objMenuDropDown=new e,document.removeEventListener("click",this.listener,!0),objMenuDropDown.build()}}]),e}(),MenuTab=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"build",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),this.defineActive()}},{key:"defineActive",value:function(){objDebug.debugMethod(this,objDebug.getMethodName());var e=this,t=document.querySelectorAll(".menu-tab > ul > li > .bt");Array.prototype.forEach.call(t,function(t){t.addEventListener("click",function(){e.buildClick(t)})})}},{key:"buildClick",value:function(e){objDebug.debugMethod(this,objDebug.getMethodName());var t=e.parentNode.parentNode.querySelectorAll("li");Array.prototype.forEach.call(t,function(e){e.classList.remove("menu-tab-active")}),e.parentNode.classList.add("menu-tab-active")}}]),e}(),MenuToggle=function(){function e(){_classCallCheck(this,e),objDebug.debugMethod(this,objDebug.getMethodName())}return _createClass(e,[{key:"build",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),this.updateVariable(),this.buildBt(),this.watchResize()}},{key:"updateVariable",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),this.$bt=document.querySelectorAll(".bt-toggle")}},{key:"buildBt",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),Array.prototype.forEach.call(this.$bt,function(e,t){e.onclick=function(){var t=e.parentNode.querySelector("nav > ul"),o=e.parentNode.querySelector("nav ul");t.classList.contains("mobile-show")?(t.classList.remove("mobile-show"),o.classList.remove("mobile-show")):t.classList.add("mobile-show")}})}},{key:"watchResize",value:function(){objDebug.debugMethod(this,objDebug.getMethodName());var e=this;window.onresize=function(){e.build()}}},{key:"reset",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),this.build()}}]),e}(),Modal=function(){function e(){_classCallCheck(this,e),objDebug.debugMethod(this,objDebug.getMethodName()),this.$body=document.querySelector("body"),this.targetBuildGalleryChange="",this.cssDisplay="display-none"}return _createClass(e,[{key:"updateVariable",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),this.$modal=document.querySelector("#modal"),this.$modalFooter=this.$modal.querySelector("footer"),this.$modalFooterConfirm=this.$modalFooter.querySelector('[data-id="confirm"]'),this.$modalFooterCancel=this.$modalFooter.querySelector('[data-id="cancel"]'),this.$modalClose=document.querySelector("#modal_close"),this.$modalContent=document.querySelector("#modal_content"),this.$modalBox=this.$modal.querySelector(".modal-box"),this.$modalNavigationArrow=this.$modal.querySelector(".navigation-arrow"),this.$modalNavigationArrowLeft=this.$modalNavigationArrow.querySelector('[data-id="nav-left"]'),this.$modalNavigationArrowRight=this.$modalNavigationArrow.querySelector('[data-id="nav-right"]'),this.$gallery=document.querySelectorAll(".gallery")}},{key:"build",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),this.buildHtml(),this.updateVariable(),this.buildMenu(),this.buildMenuGallery(),this.buildKeyboard(),this.buildTranslation()}},{key:"buildHtml",value:function(){objDebug.debugMethod(this,objDebug.getMethodName());var e="";e+='<div id="modal" class="modal-close">',e+='     <div class="modal-box">',e+="         <header>",e+='             <button id="modal_close" type="button" aria-label="'+objTranslation.translation.default.close+'" class="bt bt-sm bt-grey bt-transparent">',e+='                 <span class="fa fa-times" aria-hidden="true"></span>',e+="             </button>",e+="         </header>",e+='         <div class="row">',e+='             <div id="modal_content" class="col-es-12"></div>',e+="         </div>",e+='         <div class="menu-horizontal">',e+='             <ul class="navigation-arrow">',e+="                 <li>",e+='                     <button type="button" class="bt bt-bi" data-id="nav-left" aria-label="'+objTranslation.translation.default.previous+'" >',e+='                         <span class="fa fa-angle-left" aria-hidden="true"></span>',e+="                     </button>",e+="                 </li>",e+="                 <li>",e+='                     <button type="button" class="bt bt-bi" data-id="nav-right" aria-label="'+objTranslation.translation.default.next+'" >',e+='                         <span class="fa fa-angle-right" aria-hidden="true"></span>',e+="                     </button>",e+="                 </li>",e+="             </ul>",e+="         </div>",e+='         <footer class="display-none text-center">',e+='             <nav class="menu menu-horizontal">',e+="                 <ul>",e+="                     <li>",e+='                         <button type="button" class="bt bt-re bt-green" data-id="confirm"></button>',e+="                     </li>",e+="                     <li>",e+='                         <button type="button" class="bt bt-re bt-grey" data-id="cancel"></button>',e+="                     </li>",e+="                 </ul>",e+="             </nav>",e+="         </footer>",e+="     </div>",e+="</div>",this.$body.insertAdjacentHTML("afterbegin",e)}},{key:"buildTranslation",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),this.$modalFooterConfirm.innerHTML=objTranslation.translation.default.confirm,this.$modalFooterCancel.innerHTML=objTranslation.translation.default.cancel}},{key:"buildKeyboard",value:function(){objDebug.debugMethod(this,objDebug.getMethodName());var e=this;window.addEventListener("keyup",function(t){if(27===t.keyCode&&e.closeModal(),37===t.keyCode){if(e.$modalNavigationArrowLeft.classList.contains(e.cssDisplay))return;e.$modalNavigationArrowLeft.click()}if(39===t.keyCode){if(e.$modalNavigationArrowRight.classList.contains(e.cssDisplay))return;e.$modalNavigationArrowRight.click()}})}},{key:"buildMenuGallery",value:function(){objDebug.debugMethod(this,objDebug.getMethodName());var e=this;this.$gallery&&(Array.prototype.forEach.call(this.$gallery,function(t){var o=t.querySelectorAll("a");Array.prototype.forEach.call(o,function(t){t.addEventListener("click",function(o){o.preventDefault(),e.buildModal("gallery",!1,"fu"),e.buildGalleryImage(t.getAttribute("href"),t.querySelector("img").getAttribute("data-description")),e.buildGalleryNavigation(t)})})}),this.$modalNavigationArrowLeft.addEventListener("click",function(){e.targetBuildGalleryChange.parentNode.previousElementSibling.querySelector("a").click()}),this.$modalNavigationArrowRight.addEventListener("click",function(){e.targetBuildGalleryChange.parentNode.nextElementSibling.querySelector("a").click()}))}},{key:"buildMenu",value:function(){objDebug.debugMethod(this,objDebug.getMethodName());var e=this;this.$modalClose.addEventListener("click",function(){e.closeModal()}),document.addEventListener("click",function(e){e.target.matches("button *, a *")}),this.$modalFooter.querySelector('[data-id="cancel"]').addEventListener("click",function(t){e.closeModal()})}},{key:"buildGalleryNavigation",value:function(e){objDebug.debugMethod(this,objDebug.getMethodName(),e);var t=[],o=e.parentNode.parentNode,i=o.querySelectorAll("a").length-1;Array.prototype.forEach.call(o.querySelectorAll("a"),function(e){t.push(e)});var a=t.indexOf(e);i>0?(this.$modalNavigationArrow.classList.remove(this.cssDisplay),this.targetBuildGalleryChange=e,a<=0?this.$modalNavigationArrowLeft.classList.add(this.cssDisplay):this.$modalNavigationArrowLeft.classList.remove(this.cssDisplay),a>=i?this.$modalNavigationArrowRight.classList.add(this.cssDisplay):this.$modalNavigationArrowRight.classList.remove(this.cssDisplay)):this.$modalNavigationArrow.classList.add(this.cssDisplay)}},{key:"buildModal",value:function(e,t){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"re",i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"open";objDebug.debugMethod(this,objDebug.getMethodName(),[e,t,o,i]),this.$modalFooter.classList.add(this.cssDisplay),"open"===i?this.openModal():this.closeModal(),this.buildModalSize(o),this.buildModalKind(e,t)}},{key:"buildModalKind",value:function(e,t){switch(objDebug.debugMethod(this,objDebug.getMethodName(),[e,t]),"ajax"===e&&this.buildContentAjax(t),"confirmation"===e&&this.buildContentConfirmation(t),e){case"gallery":this.$modalNavigationArrow.classList.remove("arrow-inactive"),this.$modalNavigationArrow.classList.add("arrow-active");break;default:this.$modalNavigationArrow.classList.remove("arrow-active"),this.$modalNavigationArrow.classList.add("arrow-inactive")}}},{key:"openModal",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),this.$body.classList.remove("overflow-y"),this.$body.classList.add("overflow-hidden"),this.$body.style.overflowY="hidden",this.$modal.classList.remove("modal-close"),this.$modalBox.classList.add("modal-animate")}},{key:"closeModal",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),this.$body.classList.add("overflow-y"),this.$body.classList.remove("overflow-hidden"),this.$body.style.overflowY="auto",this.$body.style.position="relative",this.$modal.classList.add("modal-close"),this.$modalBox.classList.remove("modal-animate"),this.resetOtherClass()}},{key:"buildModalSize",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"re";objDebug.debugMethod(this,objDebug.getMethodName(),e),this.$modalBox.classList.remove("modal-es"),this.$modalBox.classList.remove("modal-sm"),this.$modalBox.classList.remove("modal-re"),this.$modalBox.classList.remove("modal-bi"),this.$modalBox.classList.remove("modal-eb"),this.$modalBox.classList.remove("modal-fu"),this.$modalBox.classList.add("modal-"+e)}},{key:"buildContentAjax",value:function(e){objDebug.debugMethod(this,objDebug.getMethodName(),e);var t=this,o=new XMLHttpRequest;o.onreadystatechange=function(){4==this.readyState&&200==this.status&&(t.$modalContent.innerHTML=this.responseText,t.resetOtherClass())},o.open("POST",e,!0),o.send()}},{key:"buildGalleryImage",value:function(e,t){objDebug.debugMethod(this,objDebug.getMethodName(),[e,t]);var o='<img src="'+e+'" class="img-responsive" style="margin:auto;" title="" alt=""/>';this.$modalContent.innerHTML=o,this.changeText(t)}},{key:"buildContentConfirmation",value:function(e){objDebug.debugMethod(this,objDebug.getMethodName(),e);var t='<div class="padding-re text-center">'+e+"</div>";this.$modalFooter.classList.remove(this.cssDisplay),this.$modalContent.innerHTML=t}},{key:"buildContentConfirmationAction",value:function(e){objDebug.debugMethod(this,objDebug.getMethodName(),e),this.$modalFooterConfirm.setAttribute("onclick",e)}},{key:"changeText",value:function(e){objDebug.debugMethod(this,objDebug.getMethodName(),[e]);var t="";if(""===e)return!1;t+='<p class="modal-description">',t+=e,t+="</p>","undefined"!==_typeof(e)&&this.$modalContent.insertAdjacentHTML("beforeend",t)}},{key:"resetOtherClass",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),"undefined"!=typeof objForm&&objForm.buildInputFile(),"undefined"!=typeof objMenuDropDown&&objMenuDropDown.reset(),"undefined"!=typeof objMenuToggle&&objMenuToggle.build(),"undefined"!=typeof objTooltip&&objTooltip.reset(),"undefined"!=typeof objMenuTab&&objMenuTab.defineActive()}}]),e}(),Notification=function(){function e(){_classCallCheck(this,e),objDebug.debugMethod(this,objDebug.getMethodName()),this.$body=document.querySelector("body"),this.$notifyItem=document.querySelectorAll(".notify-item"),this.notifyId=0}return _createClass(e,[{key:"build",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),this.buildHtml(),this.buildNavigation()}},{key:"buildHtml",value:function(){objDebug.debugMethod(this,objDebug.getMethodName());var e="";e+='<div id="notify">',e+='    <ul class="notify-list">',e+="    </ul>",e+="</div>",this.$body.insertAdjacentHTML("beforeend",e),this.$notify=document.querySelector("#notify .notify-list")}},{key:"buildHtmlItem",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"grey",t=arguments.length>1?arguments[1]:void 0;objDebug.debugMethod(this,objDebug.getMethodName(),[e,t]);var o="";return o+='<li id="notify_'+this.notifyId+'">',o+='     <div class="notify-item notify-'+e+'">',o+='         <span class="text">',o+=t,o+="         </span>",o+='         <button type="button" class="bt" onclick="$(this).parent().parent().remove();" aria-label="'+objTranslation.translation.default.close+'">',o+='            <span class="fa fa-times" aria-hidden="true"></span>',o+="         </button>",o+="     </div>",o+="</li>"}},{key:"buildNavigation",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),Array.prototype.forEach.call(this.$notifyItem,function(e){var t=e.querySelectorAll(".bt");Array.prototype.forEach.call(t,function(e){e.addEventListener("click",function(){e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode)})})})}},{key:"addNotification",value:function(e,t){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.$notify;objDebug.debugMethod(this,objDebug.getMethodName(),[e,t,o]);var i=this.buildHtmlItem(t,e),a="";if(!e)return!1;o!==this.$notify&&((a=document.querySelector(o)).querySelector(".notify-list")||a.insertAdjacentHTML("beforeend",'<ul class="notify-list"></ul>')),o!==this.$notify?a.querySelector(".notify-list").insertAdjacentHTML("beforeend",i):o.insertAdjacentHTML("beforeend",i),this.removeNotifyListItem(document.querySelector("#notify_"+this.notifyId),e.length),this.notifyId++}},{key:"removeNotifyListItem",value:function(e,t){objDebug.debugMethod(this,objDebug.getMethodName(),[e,t]),setTimeout(function(){e.parentNode.removeChild(e)},150*t)}}]),e}(),Progress=function(){function e(){_classCallCheck(this,e),objDebug.debugMethod(this,objDebug.getMethodName()),this.$bar=document.querySelector("#loading_main .progress-bar"),this.$all=document.querySelectorAll("div, section, article"),this.$allLength=this.$all.length,this.isFinish=!1,this.progressSize=0}return _createClass(e,[{key:"build",value:function(){objDebug.debugMethod(this,objDebug.getMethodName());var e=this,t=setInterval(function(){var i=100*e.progressSize/o;e.progressSize++,e.$bar.style.width=i+"%",e.progressSize>=o&&(clearInterval(t),objLoading.finish(),e.isFinish=!0)},1),o=this.buildProportion()}},{key:"buildProportion",value:function(){return objDebug.debugMethod(this,objDebug.getMethodName()),this.$allLength>1e3?this.$allLength/50:this.$allLength>900?this.$allLength/45:this.$allLength>800?this.$allLength/40:this.$allLength>700?this.$allLength/35:this.$allLength>600?this.$allLength/30:this.$allLength>500?this.$allLength/25:this.$allLength>400?this.$allLength/20:this.$allLength>300?this.$allLength/15:this.$allLength>200?this.$allLength/10:this.$allLength}}]),e}(),Table=function(){function e(){_classCallCheck(this,e),objDebug.debugMethod(this,objDebug.getMethodName()),this.$table=document.querySelectorAll(".table")}return _createClass(e,[{key:"build",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),this.$table.length<1||this.buildResponsive()}},{key:"buildResponsive",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),Array.prototype.forEach.call(this.$table,function(e){var t=document.createElement("div");t.className="table-responsive",e.parentNode.insertBefore(t,e),t.appendChild(e)})}}]),e}(),Tag=function(){function e(){_classCallCheck(this,e),objDebug.debugMethod(this,objDebug.getMethodName()),this.$tagBt=document.querySelectorAll(".tag-item-bt")}return _createClass(e,[{key:"build",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),this.$tagBt.length<1||this.buildClick()}},{key:"buildClick",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),Array.prototype.forEach.call(this.$tagBt,function(e){var t=e.querySelector(".tag-bt");t.addEventListener("click",function(){t.parentNode.parentNode.parentNode.removeChild(t.parentNode.parentNode)})})}}]),e}(),Tooltip=function(){function e(){_classCallCheck(this,e),objDebug.debugMethod(this,objDebug.getMethodName()),this.elementTop=0,this.elementLeft=0,this.elementWidth=0,this.elementHeight=0,this.elementLeft=0,this.style="black",this.space=5,this.currentWindowScroll=0,this.windowWidth=0,this.windowHeight=0,this.centerWidth=0,this.centerHeight=0,this.positionTop=0,this.positionLeft=0}return _createClass(e,[{key:"build",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),this.buildHtml(),this.updateVariable(!1),this.$tooltipData.length<1||(this.buildMaxWidth(),this.buildResize(),this.buildTooltip())}},{key:"updateVariable",value:function(e){objDebug.debugMethod(this,objDebug.getMethodName(),e),this.$tooltip=document.querySelector("#tooltip"),this.$tooltipBody=document.querySelector("#tooltip_body"),this.$tooltipPointer=document.querySelector("#tooltip_pointer"),this.$tooltipData=document.querySelectorAll('[data-tooltip="true"]'),this.windowWidth=window.offsetWidth,this.windowHeight=window.offsetHeight,this.currentWindowScroll=window.scrollY,this.elementTop=!1!==e?offset(e).top:0,this.elementLeft=!1!==e?offset(e).left:0,this.elementWidth=!1!==e?e.offsetWidth:0,this.elementHeight=!1!==e?e.offsetHeight:0,this.tooltipWidth=!1!==e?this.$tooltip.offsetWidth:0,this.tooltipHeight=!1!==e?this.$tooltip.offsetHeight:0,this.centerWidth=(this.tooltipWidth-this.elementWidth)/2,this.centerHeight=this.elementHeight/2-this.tooltipHeight/2,this.positionLeft=this.elementLeft-this.centerWidth,this.positionTop=this.elementTop-this.tooltipHeight-this.space}},{key:"buildHtml",value:function(){objDebug.debugMethod(this,objDebug.getMethodName());var e="";e+='<div id="tooltip">',e+='    <div id="tooltip_body"></div>',e+='    <div id="tooltip_pointer"></div>',e+="</div>",document.querySelector("body").insertAdjacentHTML("beforeend",e)}},{key:"buildResize",value:function(){objDebug.debugMethod(this,objDebug.getMethodName());var e=this;window.onresize=function(){e.updateVariable(!1),e.buildMaxWidth()}}},{key:"buildTooltip",value:function(){objDebug.debugMethod(this,objDebug.getMethodName());var e=this;this.showTooltip(!1),Array.prototype.forEach.call(this.$tooltipData,function(t){var o=t.getAttribute("title");void 0!==o&&null!==o&&""!==o&&(t.setAttribute("data-tooltip-text",o),t.removeAttribute("title"),t.onmouseover=function(){e.$tooltipBody.innerHTML=t.getAttribute("data-tooltip-text"),e.changeLayout(t.getAttribute("data-tooltip-color")),e.positionTooltip(t,t.getAttribute("data-tooltip-placement")),e.showTooltip(!0)},t.onmouseout=function(){e.showTooltip(!1)})})}},{key:"buildMaxWidth",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),this.$tooltip.style.maxWidth=this.windowWidth-2*this.space}},{key:"showTooltip",value:function(e){objDebug.debugMethod(this,objDebug.getMethodName(),e),e?this.$tooltip.classList.add("tooltip-show"):this.$tooltip.classList.remove("tooltip-show")}},{key:"positionTooltipSwitchDirection",value:function(e){objDebug.debugMethod(this,objDebug.getMethodName(),e);var t=void 0===e?"top":e;switch(t){case"top":this.elementTop-this.tooltipHeight<this.currentWindowScroll&&(t="bottom");break;case"right":this.elementLeft+this.tooltipWidth+this.elementWidth>this.windowWidth&&(t="left");break;case"bottom":this.elementTop+this.tooltipHeight+this.elementHeight>this.currentWindowScroll+this.windowHeight&&(t="top");break;case"left":this.tooltipWidth+this.space>this.elementLeft&&(t="right")}return t}},{key:"positionTooltipTop",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),this.positionTop=this.elementTop-this.tooltipHeight-this.space,this.positionLeft=this.elementLeft-this.centerWidth}},{key:"positionTooltipBottom",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),this.positionTop=this.elementTop+this.elementHeight+this.space,this.positionLeft=this.elementLeft-this.centerWidth}},{key:"positionTooltipRight",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),this.positionTop=this.elementTop+this.centerHeight,this.positionLeft=this.elementLeft+this.elementWidth+this.space}},{key:"positionTooltipLeft",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),this.positionTop=this.elementTop+this.centerHeight,this.positionLeft=this.elementLeft-this.tooltipWidth-this.space}},{key:"positionTooltip",value:function(e,t){objDebug.debugMethod(this,objDebug.getMethodName(),[e,t]),this.updateVariable(e);var o=this.positionTooltipSwitchDirection(t);switch(o){case"top":this.positionTooltipTop();break;case"right":this.positionTooltipRight();break;case"bottom":this.positionTooltipBottom();break;case"left":this.positionTooltipLeft()}this.changeArrowDirection(o),this.buildLimits(),this.$tooltip.style.top=this.positionTop+"px",this.$tooltip.style.left=this.positionLeft+"px","top"===o||"bottom"===o?this.changeArrowPositionHorizontal():this.changeArrowPositionVertical()}},{key:"buildLimits",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),this.positionLeft<=0&&(this.positionLeft=this.space),this.positionLeft+this.tooltipWidth>=this.windowWidth&&(this.positionLeft=this.windowWidth-this.tooltipWidth-this.space)}},{key:"changeArrowPositionHorizontal",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),this.$tooltipPointer.style.left=this.$tooltip.offsetWidth/2+"px"}},{key:"changeArrowPositionVertical",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),this.$tooltipPointer.style.left=""}},{key:"changeArrowDirection",value:function(e){objDebug.debugMethod(this,objDebug.getMethodName(),e),this.$tooltipPointer.classList.remove("tooltip-direction-top"),this.$tooltipPointer.classList.remove("tooltip-direction-bottom"),this.$tooltipPointer.classList.remove("tooltip-direction-left"),this.$tooltipPointer.classList.remove("tooltip-direction-right"),this.$tooltipPointer.classList.add("tooltip-direction-"+e)}},{key:"changeLayout",value:function(e){objDebug.debugMethod(this,objDebug.getMethodName(),e);var t=void 0===e?t=this.style:e;this.$tooltip.removeAttribute("class"),this.$tooltip.classList.add("tooltip"),this.$tooltip.classList.add("tooltip-"+t)}},{key:"reset",value:function(){objDebug.debugMethod(this,objDebug.getMethodName());var t=document.getElementById("tooltip");t.parentNode.removeChild(t),objTooltip=new e,objTooltip.build()}}]),e}(),Translation=function(){function e(){_classCallCheck(this,e),objDebug.debugMethod(this,objDebug.getMethodName()),this.translation=""}return _createClass(e,[{key:"build",value:function(){objDebug.debugMethod(this,objDebug.getMethodName()),this.defineLanguege()}},{key:"defineLanguege",value:function(){switch(objDebug.debugMethod(this,objDebug.getMethodName()),globalFrameworkLanguage){case"pt":this.translation=translationPTBR;break;case"en":this.translation=translationEN}}}]),e}();