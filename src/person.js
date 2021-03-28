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


function getDatepickerPop() {
    var rootId = '_extension_fix_datepicker';
    var inputId = rootId + '_input';
    var submitId = rootId + '_submit';
    var closeId = rootId + '_close';
    var ele = document.getElementById(rootId);
    if (!ele) {
        ele = document.createElement('div');
        ele.id = rootId;
        ele.setAttribute('style', 'display:none;position: fixed; background: rgba(0,0,0,.5);width: 100%;height: 100%;top:0;left:0');
        ele.innerHTML = `
            <div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%)">
                日期: <input type="date" id="${inputId}">
                <button style="margin-left: 20px" id="${submitId}">确定</button>
                <button style="margin-left: 20px" id="${closeId}">返回</button>
            </div>
        `;
        document.body.appendChild(ele);
        console.log('wwl extension append datepicker div');
    }
    var input = document.getElementById(inputId);
    var submit = document.getElementById(submitId);
    var close = document.getElementById(closeId);
    return {
        root: ele,
        input,
        submit,
        close
    };
}

function showDatepickerPop(dateStr) {
    var nodes = getDatepickerPop();
    nodes.input.value = dateStr;
    var hide = function () {
        nodes.submit.onclick = null;
        nodes.close.onclick = null;
        nodes.root.style.display = 'none';
    }
    return new Promise((resolve, reject) => {
        nodes.root.style.display = 'block';
        nodes.submit.onclick = function () {
            hide();
            resolve(nodes.input.value);
        };
        nodes.close.onclick = function () {
            hide();
            reject();
        }
    })
}

function fixDatepicker() {
    var nodes = document.querySelectorAll('input[readonly][onclick*=fPopCalendar]');
    for (let node of nodes) {
        node.onclick = function () {
            showDatepickerPop(this.value).then((val) => {
                this.value = val;
            }, () => {
                // 这里必须传一个reject回调，因为在showDatepickerPop里，把关闭事件当做reject状态了
            })
        }
    }
    console.log('wwl fix datepicker ', nodes.length);
}

fixDatepicker();