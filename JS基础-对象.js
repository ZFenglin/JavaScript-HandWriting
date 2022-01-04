//// 创建对象
/**
 * 手写Object._create
 * @param {Object} obj 
 */
Object._create = function (obj) {
    function Fn() { }
    Fn.prototype = obj
    return new Fn()
}

/**
 * 手写new
 * @param {Function} fn 
 * @param {Array} args 
 */
function _new(fn, args) {
    if (typeof fn !== 'function') {
        throw TypeError('fn is not function')
    }
    let obj = new Object()
    obj.__proto__ = fn.prototype
    let res = fn.apply(obj, args)
    return typeof res == 'object' ? res : obj
}

//// this指定
/**
 * 手写call
 * @param {Object} context 
 * @param  {...any} args 
 */
Function.prototype._call = function (context, ...args) {
    if (typeof this !== 'function') {
        throw TypeError('this must be function')
    }
    context = context || window
    context.fn = this
    let res = context.fn(...args)
    delete context.fn
    return res
}

/**
 * 手写apply
 * @param {Object} context 
 * @param {Array} args 
 */
Function.prototype._apply = function (context, args) {
    return this.call(context, ...args)
}

/**
 * 手写bind
 * @param {Object} context 
 * @param {Array} args 
 */
Function.prototype._bind = function (context, ...args) {
    if (typeof this !== 'function') {
        throw TypeError('this must be function')
    }
    let fn = this
    return function Fn() {
        // 注意，当绑定函数被new调用时，this会被变更
        context = this instanceof Fn ? this : context
        fn._apply(context, args.concat(arguments))
    }
}

//// 类型判断
/**
 * 手写instanceof
 * @param {Object} left 
 * @param {Object} right 
 */
function _instanceof(left, right) {
    let proto = Object.getPrototypeOf(left)
    prototype = right.prototype
    while (proto) {
        if (proto === prototype) {
            return true
        }
        proto = Object.getPrototypeOf(proto);
    }
    return false
}

/**
 * 手写类型判断
 * @param {any} value 
 */
function _typeOf(obj) {
    let type = typeof obj
    if (type !== 'object') return type
    // slice 参数为负数则返回从后向前的数组
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

//// 拷贝
/**
 * 对象拷贝支持深浅拷贝
 * @param {*} obj 
 * @param {*} deep 
 * @returns 
 */
function objectCopy(obj, deep = false) {
    if (typeof obj !== 'object') return obj
    let newObj = obj instanceof Array ? [] : {}
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let element = obj[key]
            newObj[key] = deep && typeof element === 'object' ? objectCopy(element, deep) : element
        }
    }
    return newObj
}

