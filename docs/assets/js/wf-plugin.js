export class Carousel{constructor(){this.attCurrentSlide="data-current-slide",this.attPrevious='[data-id="previous"]',this.attNext='[data-id="next"]',this.cssCarouselList="carousel__list",this.cssCarouselListItem="carousel__item",this.cssCarouselController="carousel__controller",this.cssButton="carousel__controller-button",this.cssButtonActive=`${this.cssButton}--active`,this.cssDisplay="hide",this.cssTransition=".7s",this.elCarousel=document.querySelectorAll(".carousel"),this.counterCurrent=0,this.transition=5,this.isAutoplay=!0,this.interval=1e3,this.buildNavigationControllerClick=this.buildNavigationControllerClick.bind(this)}animate(t){const e="arrow"===t.from?t.target.parentNode.querySelector(`.${this.cssCarouselList}`):t.target.parentNode.parentNode.querySelector(`.${this.cssCarouselList}`),i=e.parentNode.getAttribute("data-style"),s=Number(e.querySelector(`.${this.cssCarouselListItem}`).offsetWidth),o=t.currentSlide,l=Number(o*s);"fade"!==i?this.animateSlide({elCarouselList:e,currentPosition:l}):this.animateFade({elCarouselList:e,currentPosition:l,currentSlide:o})}animateFade(t){const e=t.elCarouselList.querySelectorAll(`.${this.cssCarouselListItem}`),i=e[t.currentSlide];e.forEach(t=>{t.style.opacity=0,t.style.transition=this.cssTransition}),i.style.opacity=1,i.style.left=`-${t.currentPosition}px`,i.style.transition=this.cssTransition}animateSlide(t){t.elCarouselList.style.transform=`translateX(-${t.currentPosition}px)`}buildAutoplay(){this.isAutoplay&&(this.interval=setInterval(this.verifyInterval,this.interval),this.isAutoplay=!1)}buildLayout(){this.elCarousel.forEach(t=>{const e=t.querySelectorAll(`.${this.cssCarouselList} .${this.cssCarouselListItem}`).length,i=t.getAttribute("data-autoplay"),s=t.getAttribute(this.attCurrentSlide);"true"===i&&this.buildAutoplay(),this.resize(t),this.buildController(t,e),this.defineActive(t.querySelector(`[data-id="${s}"]`)),1===e&&(t.querySelector(this.attPrevious).classList.add(this.cssDisplay),t.querySelector(this.attNext).classList.add(this.cssDisplay),t.querySelector(`.${this.cssCarouselController}`).classList.add(this.cssDisplay))})}buildController(t,e){const i=`button button--small button--small--proportional ${this.cssButton}`,s=t.querySelector(`.${this.cssCarouselController}`);let o="";for(let t=0;t<e;t++)o+=`<button type="button"  class="${i}" data-id="${t}" aria-hidden="true"></button>`;s.innerHTML=o}buildNavigation(){this.elCarousel.forEach(t=>{this.buildNavigationController(t),this.buildNavigationLeft(t),this.buildNavigationRight(t)})}buildNavigationController(t){t.querySelectorAll(`.${this.cssButton}`).forEach(t=>{helper.addClick(t,this.buildNavigationControllerClick)})}buildNavigationControllerClick(t){const e=t.target,i=t.target.getAttribute("data-id");e.parentNode.parentNode.setAttribute(this.attCurrentSlide,i),this.defineActive(e),this.animate({currentSlide:e.getAttribute("data-id"),target:e,from:"navigation"})}buildNavigationArrow(t){t.button.onclick=(()=>{const e=t.button.parentNode.parentNode,i=e.querySelector(`.${this.cssCarouselList}`),s=Number(i.querySelectorAll(`.${this.cssCarouselListItem}`).length),o=Number(e.getAttribute(this.attCurrentSlide));let l=0;l="previous"===t.side?0===o?s-1:o-1:o===s-1?0:o+1,e.setAttribute(this.attCurrentSlide,l),this.defineActive(e.querySelector(`[data-id="${l}"]`)),this.animate({currentSlide:l,target:i,from:"arrow"})})}buildNavigationLeft(t){const e=t.querySelector(this.attPrevious);this.buildNavigationArrow({button:e,side:"previous"})}buildNavigationRight(t){const e=t.querySelector(this.attNext);this.buildNavigationArrow({button:e,side:"next"})}defineActive(t){t.parentNode.parentNode.querySelectorAll(`.${this.cssButton}`).forEach(t=>{t.classList.remove(this.cssButtonActive)}),t.classList.add(this.cssButtonActive)}init(){this.elCarousel&&(this.buildLayout(),this.buildNavigation(),this.watchResize())}resize(t){const e=t.querySelector(`.${this.cssCarouselList}`),i=e.querySelectorAll(`.${this.cssCarouselListItem}`).length;e.style.width+=`${100*i}%`}verifyInterval(){const t=window.carousel;t.counterCurrent++,t.counterCurrent>=t.transition&&(t.counterCurrent=0,t.elCarousel.forEach(e=>{const i=e.getAttribute("data-autoplay"),s=e.querySelector(t.attNext);"true"===i&&s.click()}))}watchResize(){window.onresize=(()=>{this.elCarousel.forEach(t=>{this.watchResizeLoop(t)})})}watchResizeLoop(){const t=item.parentNode.parentNode.parentNode.parentNode,e=t.querySelector(`.${this.cssCarouselList}`);this.defineActive(t.querySelector('[data-id="0"]')),this.animate({currentSlide:0,target:e,from:"arrow"})}};export class Form{validateEmpty(t){const e=t.length;for(let i=0;i<e;i++)if(""===t[i].value)return t[i].focus(),!1;return!0}};export class Helper{addClass(t,e){if(t&&e)if(e instanceof Array)for(let i in e)t.classList.add(e[i]);else t.classList.add(e)}addClick(t,e){t&&this.addEvent({el:t,action:e,event:"click"})}addEvent(t){const e=t.action,i=t.el,s=t.event;i&&(i.removeEventListener(s,e),i.addEventListener(s,e))}ajax(t){return new Promise((e,i)=>{const s=void 0===t.kind?"POST":t.kind;let o=new XMLHttpRequest;o.open(s,t.controller,!0),o.setRequestHeader("Content-type","application/x-www-form-urlencoded"),o.onload=(()=>{o.status>=200&&o.status<300?e(o.responseText):i(o.statusText)}),o.onerror=(()=>i(o.statusText))})}capitalize(t){return t.charAt(0).toUpperCase()+t.slice(1)}getUrlParameter(t){const e=top.location.search.substring(1).split("&");for(let i=0;i<e.length;i++){let s=e[i].split("=");if(s[0]===t)return s[1]}}getUrlWord(t){return new RegExp("\\b"+t+"\\b","i").test(window.location.href)}offset(t){let e=t.getBoundingClientRect();const i=window.pageXOffset||document.documentElement.scrollLeft,s=window.pageYOffset||document.documentElement.scrollTop;return{top:e.top+s,left:e.left+i}}removeClass(t,e){if(t&&e)if(e instanceof Array)for(let i in e)t.classList.contains(e[i])&&t.classList.remove(e[i]);else t.classList.contains(e)&&t.classList.remove(e)}verifyUrlRoute(t){return window.location.pathname.split("/").indexOf(t)>-1}wrapItem(t,e){const i=document.createElement("div");i.className=e,t.parentNode.insertBefore(i,t),i.appendChild(t)}};export class Layout{constructor(){this.breakPointSmartphone=320,this.breakPointTablet=768,this.breakPointTabletLandscape=1024,this.breakPointNotebook=1366,this.breakPointDesktop=1600,this.breakPointFullHd=1920}};export class LazyLoad{constructor(){this.cssAttribute="data-lazy-load",this.cssData=`[${this.cssAttribute}="true"]`}addListener(){document.querySelector("body").addEventListener("scroll",()=>{window.requestAnimationFrame(()=>{this.buildLoop()})})}buildLoop(){document.querySelectorAll(this.cssData).forEach(t=>{this.verifyPosition(t)})}buildImage(t){const e=t.getAttribute("data-src");t.setAttribute("src",e),t.removeAttribute(this.cssAttribute)}init(){document.querySelector(this.cssData)&&(this.addListener(),this.buildLoop())}verifyPosition(t){window.scrollY>=window.helper.offset(t).top-window.outerHeight&&this.buildImage(t)}};export class LoadingMain{constructor(){this.cssHide="hide",this.cssAnimation="animate",this.elWrapper=document.querySelector(".loading-main"),this.elWrapper&&(this.elLoading=this.elWrapper.querySelector(".loading"),this.elBody=document.querySelector("body"))}hide(){this.elWrapper&&(this.elWrapper.classList.add(this.cssHide),this.elLoading.classList.remove(this.cssAnimation),this.elBody.style.overflow="auto")}};export class Mask{constructor(){this.elMask=document.querySelectorAll("[data-mask]")}addListener(){this.elMask.forEach(t=>{this.addListenerLoop(t)})}addListenerLoop(t){t.addEventListener("input",e=>{const i=e.target.value,s=t.dataset.mask,o=helper.capitalize(s);e.target.value=this[`mask${o}`](i)})}init(){this.elMask&&this.addListener()}maskCep(t){return t.replace(/\D/g,"").replace(/(\d{5})(\d)/,"$1-$2").replace(/(-\d{3})\d+?$/,"$1")}maskCpf(t){return t.replace(/\D/g,"").replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d{1,2})/,"$1-$2").replace(/(-\d{2})\d+?$/,"$1")}maskCnpj(t){return t.replace(/\D/g,"").replace(/(\d{2})(\d)/,"$1.$2").replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d)/,"$1/$2").replace(/(\d{4})(\d)/,"$1-$2").replace(/(-\d{2})\d+?$/,"$1")}maskDate(t){return t.replace(/\D/g,"").replace(/(\d{2})(\d)/,"$1/$2").replace(/(\d{2})(\d)/,"$1/$2").replace(/(\d{4})(\d)/,"$1")}maskPhone(t){return t.replace(/\D/g,"").replace(/(\d{2})(\d)/,"($1) $2").replace(/(\d{4})(\d)/,"$1-$2").replace(/(\d{4})-(\d)(\d{4})/,"$1$2-$3").replace(/(-\d{4})\d+?$/,"$1")}maskPis(t){return t.replace(/\D/g,"").replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{5})(\d)/,"$1.$2").replace(/(\d{5}\.)(\d{2})(\d)/,"$1$2-$3").replace(/(-\d)\d+?$/,"$1")}};export class MenuDropDown{update(){this.isClickBuild=!1,this.classMenu="drop-down",this.classMenuText=`${this.classMenu}-text`,this.cssDropDownContent=`${this.classMenu}__content`,this.cssOpend=`${this.cssDropDownContent}--opened`,this.cssMobileShow="mobile-show",this.elMenu=document.querySelectorAll(`.${this.classMenu}, .${this.classMenuText}`),this.addClickAction=this.addClickAction.bind(this),this.close=this.close.bind(this)}addClick(){this.elMenu.forEach(t=>{const e=t.querySelectorAll(".button:first-child, .link:first-child")[0];helper.addClick(e,this.addClickAction)})}addClickAction(t){const e=t.target.parentNode.querySelector(`.${this.cssDropDownContent}`);null!==e&&helper.addClass(e,this.cssOpend)}close(){const t=window.menuDropDown;"string"!==this.elMenu&&t.elMenu.forEach(e=>{const i=e.querySelector(`.${t.cssDropDownContent}`);null!==i&&helper.removeClass(i,this.cssOpend)})}init(){this.update(),this.elMenu&&(this.isClickBuild||(this.isClickBuild=!0,this.addClick()),document.addEventListener("click",this.close,!0))}listener(t){const e=document.querySelectorAll(`.${window.menuDropDown.cssMobileShow}`);t.toElement.classList.contains("button")||t.toElement.classList.contains("link")||e.forEach(t=>{helper.removeClass(t,menuDropDown.cssMobileShow)})}reset(){document.removeEventListener("click",this.listener,!0),window.menuDropDown.init()}};export class MenuTab{constructor(){this.cssMenu="tab",this.cssMenuActive=`${this.cssMenu}--active`,this.cssAllButton=`.${this.cssMenu} > .button, .${this.cssMenu} > .drop-down > .button`}buildClick(){document.querySelectorAll(this.cssAllButton).forEach(t=>{t.addEventListener("click",()=>{this.buildCss(t)})})}buildCss(t){(t.parentNode.classList.contains(this.cssMenu)?t.parentNode:t.parentNode.parentNode).querySelectorAll(this.cssAllButton).forEach(t=>{t.classList.remove(this.cssMenuActive)}),t.classList.add(this.cssMenuActive)}init(){this.el=document.querySelectorAll(`.${this.cssMenu}`),this.el&&this.buildClick()}};export class MenuToggle{constructor(){this.classButton="toggle-menu",this.isWatch=!1,this.addClick=this.addClick.bind(this)}addClick(t){const e=t.target.nextElementSibling;e.hasAttribute("style")?e.removeAttribute("style"):e.style.display="flex"}buildMenu(){this.elButton.forEach(t=>{helper.addClick(t,this.addClick)})}init(){this.update(),this.buildMenu(),this.isWatch||(this.isWatch=!0,this.watchResize())}update(){this.elButton=document.querySelectorAll(`.${this.classButton}`)}reset(){this.init()}watchResize(){window.onresize=(()=>{this.init()})}};export class Modal{constructor(){this.isModalOpen=!1,this.cssHide="hide",this.cssClose="modal--close",this.cssScrollbar="scrollbar scrollbar--grey",this.elBody=document.querySelector("body")}buildHtml(){const t=`\n            <div class="modal ${this.cssClose} ${this.cssScrollbar}">\n                <div class="modal__box">\n                    <header class="modal__header right">\n                        <button type="button" aria-label="${window.translation.translation.close}" class="button button--small button--small--proportional button--grey button--transparent button--close">\n                            <svg class="icon icon--regular rotate-45">\n                                <use xlink:href="./assets/img/icon.svg#plus"></use>\n                            </svg>\n                        </button>\n                    </header>\n                    <div class="row">\n                        <div class="modal__content"></div>\n                    </div>\n                    <div class="navigation-change button-wrapper row center ${this.cssHide}">\n                        <button type="button" class="button button--big" data-id="previous" aria-label="${window.translation.translation.previous}" >\n                            <svg class="icon icon--extra-big icon--white">\n                                <use xlink:href="./assets/img/icon.svg#previous"></use>\n                            </svg>\n                        </button>\n                        <button type="button" class="button button--big" data-id="next" aria-label="${window.translation.translation.next}" >\n                            <svg class="icon icon--extra-big icon--white rotate-180">\n                                <use xlink:href="./assets/img/icon.svg#previous"></use>\n                            </svg>\n                        </button>\n                    </div>\n                    <footer class="button-wrapper modal__footer center ${this.cssHide}">\n                        <button type="button" class="button button--regular button--green" data-id="confirm"></button>\n                        <button type="button" class="button button--regular button--grey" data-id="cancel"></button>\n                    </footer>\n                </div>\n            </div>\n        `;this.elBody.insertAdjacentHTML("afterbegin",t)}buildKeyboard(){window.addEventListener("keyup",t=>{const e=t.key;"Escape"===e&&this.buildKeyboardEscape(),"ArrowLeft"===e&&this.buildKeyboardArrowLeft(),"ArrowRight"===e&&this.buildKeyboardArrowRight()})}buildKeyboardEscape(){this.isModalOpen&&this.closeModal()}buildKeyboardArrowLeft(){this.isModalOpen&&(this.elModalNavigationArrowLeft.classList.contains(this.cssHide)||this.elModalNavigationArrowLeft.click())}buildKeyboardArrowRight(){this.isModalOpen&&(this.elModalNavigationArrowRight.classList.contains(this.cssHide)||this.elModalNavigationArrowRight.click())}buildMenuGallery(){this.elGallery&&(this.elGallery.forEach(t=>{t.querySelectorAll("a").forEach(t=>{this.buildMenuGalleryButton(t)})}),helper.addClick(this.elModalNavigationArrowLeft,this.handleClickArrowLeft.bind(this)),helper.addClick(this.elModalNavigationArrowRight,this.handleClickArrowRight.bind(this)))}buildMenuGalleryButton(t){t.addEventListener("click",e=>{const i=t.getAttribute("href"),s=t.querySelector("img").getAttribute("data-description");e.preventDefault(),this.buildModal("gallery",!1,"full"),this.buildGalleryImage(i,s),this.buildGalleryNavigation(t)})}buildMenu(){const t=this.elModalFooter.querySelector('[data-id="cancel"]');helper.addClick(this.elModalClose,this.closeModal.bind(this)),helper.addClick(t,this.closeModal.bind(this))}buildGalleryNavigation(t){const e=t.parentNode.parentNode.querySelectorAll("a"),i=e.length-1;let s=[];e.forEach(t=>{s.push(t)}),i>0?this.buildGalleryNavigationShow({array:s,target:t,siblingLength:i}):this.elModalNavigationArrow.classList.add(this.cssHide)}buildGalleryNavigationShow(t){const e=t.array.indexOf(t.target);this.elModalNavigationArrow.classList.remove(this.cssHide),this.targetBuildGalleryChange=t.target,e<=0?this.elModalNavigationArrowLeft.classList.add(this.cssHide):this.elModalNavigationArrowLeft.classList.remove(this.cssHide),e>=t.siblingLength?this.elModalNavigationArrowRight.classList.add(this.cssHide):this.elModalNavigationArrowRight.classList.remove(this.cssHide)}buildModal(t){this.elModalFooter.classList.add(this.cssHide),void 0===t.action?this.openModal():this.closeModal(),void 0!==t.click&&this.buildContentConfirmationAction(t.click),this.buildModalSize(t.size),this.buildModalKind(t)}buildModalKind(t){"ajax"===t.kind&&this.buildContentAjax(t.content),"confirmation"===t.kind&&this.buildContentConfirmation(t.content),"gallery"!==t.kind?this.elModalNavigationArrow.classList.add("hide"):this.elModalNavigationArrow.classList.remove("hide")}buildModalSize(t="regular"){["extra-small","small","regular","big","extra-big","full"].forEach(t=>{this.elModalBox.classList.remove(`modal--${t}`)}),this.elModalBox.classList.add(`modal--${t}`)}buildContentAjax(t){const e=this;let i=new XMLHttpRequest;i.onreadystatechange=function(){4===!this.readyState&&200===this.status||e.buildContentAjaxSuccess(this.responseText)},i.open("GET",t,!0),i.send()}buildContentAjaxSuccess(t){this.elModalContent.innerHTML=t,this.resetOtherClass()}buildGalleryImage(t,e){const i=`<img src="${t}" class="img-responsive" style="margin:auto;" title="" alt=""/>`;this.elModalContent.innerHTML=i,this.changeText(e)}buildContentConfirmation(t){const e=`<div class="center">${t}</div>`;this.elModalFooter.classList.remove(this.cssHide),this.elModalContent.innerHTML=e}buildContentConfirmationAction(t){this.elModalFooterConfirm.setAttribute("onclick",t)}changeText(t){const e=`<p class="modal__description">${t}</p>`;""!==t&&null!==t&&this.elModalContent.insertAdjacentHTML("beforeend",e)}closeModal(){this.isModalOpen=!1,this.elBody.classList.add("overflow-y"),this.elBody.classList.remove("overflow-hidden"),this.elBody.style.overflowY="auto",this.elBody.style.position="relative",this.elModal.classList.add(this.cssClose),this.elModalBox.classList.remove("modal-animate"),this.resetOtherClass()}init(){this.buildHtml(),this.update(),this.buildMenu(),this.buildMenuGallery(),this.buildKeyboard(),this.translate()}handleClickArrowLeft(){this.targetBuildGalleryChange.previousElementSibling.click()}handleClickArrowRight(){this.targetBuildGalleryChange.nextElementSibling.click()}openModal(){this.isModalOpen=!0,this.elBody.classList.remove("overflow-y"),this.elBody.classList.add("overflow-hidden"),this.elBody.style.overflowY="hidden",this.elModal.classList.remove(this.cssClose),this.elModalBox.classList.add("modal-animate")}resetOtherClass(){"undefined"!=typeof menuDropDown&&menuDropDown.reset(),"undefined"!=typeof menuToggle&&menuToggle.init(),"undefined"!=typeof menuTab&&menuTab.init(),"undefined"!=typeof lazyLoad&&lazyLoad.init()}translate(){this.elModalFooterConfirm.innerHTML=translation.translation.confirm,this.elModalFooterCancel.innerHTML=translation.translation.cancel}update(){this.targetBuildGalleryChange="",this.elModal=document.querySelector(".modal"),this.elModalFooter=this.elModal.querySelector("footer"),this.elModalFooterConfirm=this.elModalFooter.querySelector('[data-id="confirm"]'),this.elModalFooterCancel=this.elModalFooter.querySelector('[data-id="cancel"]'),this.elModalClose=document.querySelector(".modal__header .button--close"),this.elModalContent=document.querySelector(".modal__content"),this.elModalBox=this.elModal.querySelector(".modal__box"),this.elModalNavigationArrow=this.elModal.querySelector(".navigation-change"),this.elModalNavigationArrowLeft=this.elModalNavigationArrow.querySelector('[data-id="previous"]'),this.elModalNavigationArrowRight=this.elModalNavigationArrow.querySelector('[data-id="next"]'),this.elGallery=document.querySelectorAll(".gallery")}};export class Notification{constructor(){this.elBody=document.querySelector("body"),this.elNotificationId="notification",this.colorDefault="grey",this.notificationId=0}add(t){if(!t.text)return;this.placeItem(t);const e=document.querySelector(`#${this.elNotificationId+this.notificationId}`);this.remove(e,t.text.length),this.notificationId++}buildHtml(){const t=`<div id="${this.elNotificationId}" class="${this.elNotificationId} ${this.elNotificationId}--default"></div>`;this.elBody.insertAdjacentHTML("beforeend",t)}buildHtmlItem(t){const e=void 0!==t.color?t.color:this.colorDefault;return`\n            <div class="${this.elNotificationId}__item ${this.elNotificationId}--regular ${this.elNotificationId}--${e}" id="${this.elNotificationId}${this.notificationId}">\n                <span class="${this.elNotificationId}__text">${t.text}</span>\n                <button type="button" class="button button--small button--small--proportional button--transparent" onclick="Notification.remove(this.parentNode, 0)" aria-label="${window.translation.translation.close}">\n                    <svg class="icon icon--regular rotate-45">\n                        <use xlink:href="./assets/img/icon.svg#plus"></use>\n                    </svg>\n                </button>\n            </div>\n        `}init(){this.buildHtml(),this.update()}placeItem(t){let e=this.buildHtmlItem(t),i="";if(void 0===t.place)i=this.elNotification;else{let s=document.querySelector(t.place).querySelector(`.${this.elNotificationId}`);if(null===s){e=`<div class="${this.elNotificationId}">${e}</div>`,i=document.querySelector(t.place)}else i=s}i.insertAdjacentHTML("beforeend",e)}remove(t,e){setTimeout(()=>{this.removeItem(t)},150*e)}removeItem(t){null!==t.parentNode&&t.parentNode.removeChild(t)}update(){const t=document.querySelector(`#${this.elNotificationId}`);this.elNotification=t}};export class Table{constructor(){this.elTable=document.querySelectorAll(".table"),this.cssResponsive="table-responsive"}build(){this.elTable.forEach(t=>{helper.wrapItem(t,this.cssResponsive);const e=t.parentNode.parentNode.querySelector(`.${this.cssResponsive}`);helper.wrapItem(e,`wrapper-${this.cssResponsive}`)})}init(){this.elTable&&this.build()}};export class Tag{constructor(){this.elTag=document.querySelectorAll(".tag"),this.addClick=this.addClick.bind(this)}addClick(t){t.addEventListener("click",()=>{t.parentNode.parentNode.removeChild(t.parentNode)})}buildClick(){this.elTag.forEach(t=>{const e=t.querySelector(".button__close");e&&this.addClick(e)})}init(){this.elTag&&this.buildClick()}};export class Translation{constructor(){this.translation="",this.translationEn={cancel:"Cancel",close:"Close",confirm:"Confirm",input_upload:"Select File...",next:"Next",previous:"Previous"},this.translationEs={cancel:"Cancelar",close:"Cerrar",confirm:"Confirmar",input_upload:"Seleccione Archivo...",next:"Siguiente",previous:"Anterior"},this.translationPt={cancel:"Cancelar",close:"Fechar",confirm:"Confirmar",input_upload:"Selecione o Arquivo...",next:"Próximo",previous:"Anterior"}}defineLanguege(){const t=globalLanguage.charAt(0).toUpperCase()+globalLanguage.slice(1);this.translation=this[`translation${t}`]}init(){this.defineLanguege()}};window.carousel=new Carousel,window.form=new Form,window.helper=new Helper,window.layout=new Layout,window.lazyLoad=new LazyLoad,window.loadingMain=new LoadingMain,window.mask=new Mask,window.menuDropDown=new MenuDropDown,window.menuTab=new MenuTab,window.menuToggle=new MenuToggle,window.modal=new Modal,window.notification=new Notification,window.table=new Table,window.tag=new Tag,window.translation=new Translation,window.addEventListener("load",window.translation.init(),window.mask.init(),window.modal.init(),window.carousel.init(),window.lazyLoad.init(),window.menuDropDown.init(),window.menuTab.init(),window.menuToggle.init(),window.notification.init(),window.table.init(),window.tag.init(),window.loadingMain.hide(),{once:!0});