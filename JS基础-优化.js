/**
 * 防抖
 * @param {Function} fn 
 * @param {Number} delay 
 */

function debounce(fn, delay = 300) {
    if (typeof fn !== 'function') {
        throw TypeError('fn must be a function')
    }
    if (typeof delay !== 'number') {
        throw TypeError('delay must be a number')
    }
    let _timer = null;
    return function () {
        if (_timer) {
            clearTimeout(_timer)
        }
        let context = this
        let args = arguments
        _timer = setTimeout(function () {
            fn.apply(context, args)
            _timer = null
        }, delay)
    }
}

/**
 * 节流
 * @param {Function} fn 
 * @param {Number} delay 
 */
function throttle(fn, delay = 300) {
    if (typeof fn !== 'function') {
        throw TypeError('fn must be a function')
    }
    if (typeof delay !== 'number') {
        throw TypeError('delay must be a number')
    }
    let _timer = new Date()
    return function () {
        if (new Date() - _timer >= delay) {
            fn.apply(this, arguments)
            _timer = new Date()
        }

    }
}

/**
 * 柯里化
 * @param {Function} fn 
 * @param  {...any} args 
 */
function curry(fn, ...args) {
    return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args);
}

/**
 * 实现add(1)(2)(3)
 * @param  {...any} args 
 */
function add(...args) {
    return args.reduce((pre, cur) => pre + cur, 0)
}

function curry(fn) {
    let args = []
    return function tmp(...newArgs) {
        if (newArgs.length) {
            args = [...args, ...newArgs]
            return tmp
        } else {
            return fn.apply(this, args)
        }
    }
}
