function buildURL(url) {
    /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName()); /*endRemoveIf(production)*/
    return url.toString()               // Convert to string
        .normalize('NFD')               // Change diacritics
        .replace(/[\u0300-\u036f]/g, '') // Remove illegal characters
        .replace(/\s+/g, '-')            // Change whitespace to dashes
        .toLowerCase()                  // Change to lowercase
        .replace(/&/g, '-and-')          // Replace ampersand
        .replace(/[^a-z0-9\-]/g, '')     // Remove anything that is not a letter, number or dash
        .replace(/-+/g, '-')             // Remove duplicate dashes
        .replace(/^-*/, '')              // Remove starting dashes
        .replace(/-*$/, '');             // Remove trailing dashes
}

function getUrlParameter(target) {
    /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName(), target); /*endRemoveIf(production)*/
    let url = top.location.search.substring(1);
    let parameter = url.split('&');

    for (let i = 0; i < parameter.length; i++) {
        let parameterName = parameter[i].split('=');

        if (parameterName[0] === target) {
            return parameterName[1];
        }
    }
}

function offset(element) {
    var rect = element.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

function verifyUrlFodler(target) {
    /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName(), target); /*endRemoveIf(production)*/
    let arrFolder = window.location.pathname.split('/');

    if (arrFolder.indexOf(target) > -1) {
        return true;
    } else {
        return false;
    }
}