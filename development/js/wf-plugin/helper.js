function getUrlParameter(target) {
    let url = top.location.search.substring(1);
    let parameter = url.split('&');

    for (let i = 0; i < parameter.length; i++) {
        let parameterName = parameter[i].split('=');

        if (parameterName[0] === target) {
            return parameterName[1];
        }
    }
}

function getUrlWord(target) {
    return new RegExp('\\b' + target + '\\b', 'i').test(window.location.href);
}

function offset(element) {
    var rect = element.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

function verifyUrlRoute(target) {
    let arrFolder = window.location.pathname.split('/');

    if (arrFolder.indexOf(target) > -1) {
        return true;
    } else {
        return false;
    }
}

function wrapItem(target, cssClass) {
    let wrapper = document.createElement('div');

    wrapper.className = cssClass;
    target.parentNode.insertBefore(wrapper, target);
    wrapper.appendChild(target);
}