/**
 * 日期格式化
 * @param {Date} dateInput 
 * @param {String} format 
 */
const dateFormat = (dateInput, format) => {
    // 获取年月日
    let year = dateInput.getFullYear()
    let month = dateInput.getMonth() + 1
    let day = dateInput.getDate()
    // 通过replace正则替换 
    format = format.replace('yyyy', year)
    format = format.replace('MM', month)
    format = format.replace('dd', day)
    return format
}


/**
 * 交换a,b的值，不能用临时变量
 * @param {Number} a 
 * @param {Number} b 
 */
function changeAtoB(a, b) {
    b = a + b
    a = b - a
    b = b - a
}


/**
 * 数组乱序（洗牌算法）
 * @param {Array} arr 
 */
function shuffle(arr) {
    for (let index = arr.length - 1; index > 0; index--) {
        randomIndex = Math.floor(Math.random() * (index - 1));
        [arr[randomIndex], arr[index]] = [arr[index], arr[randomIndex]];
    }
}


/**
 * 多层数组求和
 * @param {Array} array 
 * @returns 
 */
// 字符串
function arrSum(array) {
    return array.toString().split(',').reduce((total, i) => total += Number(i), 0)
}
// flat
function arrSum(array) {
    return array.flat(Infinity).reduce((total, i) => total += Number(i), 0)
}
// 递归
function arrSum(array) {
    return array.reduce((pre, cur) => {
        if (Array.isArray(cur)) {
            return pre + arrSum(cur)
        } else {
            return pre + cur
        }
    }, 0)
}


/**
 * 手写flat
 * @param {Array} arr 
 * @param {Number} depth 
 * @returns 
 */
Array.prototype._flat = function (depth = 1) {
    if (!Array.isArray(this) || depth <= 0) return this
    return this.reduce(function (pre, cur) {
        return pre.concat(Array.isArray(cur) ? Array.prototype._flat.call(cur, depth - 1) : cur)
    }, [])
}


/**
 * 字符串重复
 * @param {String} str 
 * @param {number} count 
 */
function _repeat(str, count) {
    return count > 0 ? str.concat(_repeat(str, --count)) : ''
}


/**
 * 手写push 
 */
Array.prototype._push = function () {
    for (let i = 0; i < arguments.length; i++) {
        this[this.length] = arguments[i];
    }
    return this.length;
}


/**
 * 手写map
 * @param {Function} fn 
 */
Array.prototype._map = function (fn) {
    if (typeof fn !== 'function') {
        throw TypeError('fn must be function')
    }
    let res = []
    for (let index = 0; index < this.length; index++) {
        res.push(fn.call(this, this[index], index))
    }
    return res
}



/**
 * 字符串反转
 * @param {String} str 
 */
function _reverse(str) {
    let arr = str.split('')
    let l = 0,
        r = arr.length - 1
    while (r > l) {
        [arr[l], arr[r]] = [arr[r], arr[l]]
        l++
        r--
    }
    return arr.join('')
}


/**
 * 转化千分位
 * @param {Number} number 
 */
function _priceFormat(number) {
    function addPoint(str) {
        let arr = str.split('')
        let len = 0
        let res = ''
        for (let index = 0; index < arr.length; index++) {
            len++
            res += arr[index];
            if (len == 3 && index != arr.length - 1) {
                res += ','
                len = 0
            }
        }
        for (let index = 0; index < arr.length; index++) {
            len++
            res += arr[index];
            if (len == 3 && index != arr.length - 1) {
                res += ','
                len = 0
            }
        }
        return res
    }
    let str = number.toString()
    let arr = str.split('.')
    if (arr.length > 1) {
        return _reverse(addPoint(_reverse(arr[0]))) + '.' + addPoint(arr[1])
    } else {
        return _reverse(addPoint(_reverse(arr[0])))
    }
}


/**
 * 大正整数相加
 * @param {String} a 
 * @param {String} b 
 */
function sumBigNumber(a, b) {
    let res = '';
    let temp = 0;

    a = a.split('');
    b = b.split('');

    while (a.length || b.length || temp) {
        temp += ~~a.pop() + ~~b.pop();
        res = (temp % 10) + res;
        temp = temp > 9
    }
    return res.replace(/^0+/, '');
}


/**
 * 对象转化为树
 * @param {Array} data 
 */
function jsonToTree(data) {
    // 初始化结果数组，并判断输入数据的格式
    let result = []
    if (!Array.isArray(data)) {
        return result
    }
    // 使用map，将当前对象的id与当前对象对应存储起来
    let map = {};
    data.forEach(item => {
        map[item.id] = item;
    });
    // 
    data.forEach(item => {
        let parent = map[item.pid];
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            result.push(item);
        }
    });
    return result;
}


/**
 * 解析params
 * @param {String} url 
 */
function parseParam(url) {
    const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来
    const paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组中
    let paramsObj = {};
    // 将 params 存到对象中
    paramsArr.forEach(param => {
        if (/=/.test(param)) { // 处理有 value 的参数
            let [key, val] = param.split('='); // 分割 key 和 value
            val = decodeURIComponent(val); // 解码
            val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字
            if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key，则添加一个值
                paramsObj[key] = [].concat(paramsObj[key], val);
            } else { // 如果对象没有这个 key，创建 key 并设置值
                paramsObj[key] = val;
            }
        } else { // 处理没有 value 的参数
            paramsObj[param] = true;
        }
    })
    return paramsObj;
}