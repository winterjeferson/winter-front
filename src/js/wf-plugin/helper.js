export class Helper {
    constructor() {
        this.elBody = document.querySelector('body');
        this.onkeypress();
    }

    addClass(target, classCss) {
        if (!target || !classCss) return;

        if (classCss instanceof Array) {
            for (let i in classCss) {
                target.classList.add(classCss[i]);
            }

            return;
        }

        target.classList.add(classCss);
    }

    addClick(el, action) {
        if (!el) return;

        this.addEvent({
            el,
            action,
            event: 'click'
        });
    }

    addEvent(args) {
        const action = args.action;
        const el = args.el;
        const event = args.event;

        if (!el) return;

        el.removeEventListener(event, action);
        el.addEventListener(event, action);
    }

    ajax(props) {
        return new Promise((resolve, reject) => {
            const controller = props.controller;
            const kind = props.kind ? props.kind : 'GET';
            let xhr = new XMLHttpRequest();

            xhr.open(kind, controller, true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.responseText);
                }
                reject(xhr.statusText);
            };
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
        });
    }

    capitalize(target) {
        return target.charAt(0).toUpperCase() + target.slice(1);
    }

    getUrlParameter(target) {
        const url = top.location.search.substring(1);
        const parameter = url.split('&');

        for (let i = 0; i < parameter.length; i++) {
            let parameterName = parameter[i].split('=');

            if (parameterName[0] === target) {
                return parameterName[1];
            }
        }
    }

    getUrlWord(target) {
        return new RegExp('\\b' + target + '\\b', 'i').test(window.location.href);
    }

    offset(element) {
        let rect = element.getBoundingClientRect();
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const props = {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft,
        };

        return props;
    }

    onkeypress() {
        window.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'Escape':
                    if (wfpModal) wfpModal.closeByKey();
                    break;
                case 'ArrowLeft':
                    if (wfpGallery) wfpGallery.handlePrevious();
                    break;
                case 'ArrowRight':
                    if (wfpGallery) wfpGallery.handleNext();
                    break;
            }
        });
    }

    removeClass(target, classCss) {
        if (!target || !classCss) return;

        if (classCss instanceof Array) {
            for (let i in classCss) {
                if (target.classList.contains(classCss[i])) {
                    target.classList.remove(classCss[i]);
                }
            }
            return;
        }

        if (target.classList.contains(classCss)) {
            target.classList.remove(classCss);
        }
    }

    verifyUrlRoute(target) {
        const arrFolder = window.location.pathname.split('/');

        if (arrFolder.indexOf(target) > -1) {
            return true;
        } else {
            return false;
        }
    }

    wrapItem(target, cssClass) {
        const wrapper = document.createElement('div');

        wrapper.className = cssClass;
        target.parentNode.insertBefore(wrapper, target);
        wrapper.appendChild(target);
    }
}