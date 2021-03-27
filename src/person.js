function resetElementsProp() {
    var keys = [
        'focusObj',
        'GetObjVal',
        'checkAllObj'
    ]

    function fix() {
        var reg = /\.elements\((.+?)\)/g;
        keys.forEach((k) => {
            var fnStr = window[k].toString();
            if (!reg.test(fnStr)) return;

            var fixFnStr = fnStr.replace(reg, '.elements[$1]');
            window[k] = new Function('return ' + fixFnStr)();
        })
        console.log('wwl extension reset elements');
    }

    if (keys.every(k => window[k])) fix();
    else {
        document.addEventListener('DOMContentLoaded', fix);
    }
}

function execAllReset() {
    resetElementsProp();
}


var actualCode = `(function(){
    ${resetElementsProp.toString()}
    ${execAllReset.toString()}
    ${execAllReset.name}();
})()`;

var customEventKey = 'reset'
document.documentElement.setAttribute('on' + customEventKey, actualCode);
document.documentElement.dispatchEvent(new CustomEvent(customEventKey));
document.documentElement.removeAttribute('on' + customEventKey);