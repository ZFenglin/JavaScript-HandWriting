/**
 * 发布订阅模式
 */
class EventCenter {
    // 1. 定义事件容器，用来装事件数组
    handlers = {}
    // 2. 添加事件方法，参数：事件名 事件方法
    addEventListener(type, handler) {
        // 创建新数组容器
        if (!this.handlers[type]) {
            this.handlers[type] = []
        }
        // 存入事件
        this.handlers[type].push(handler)
    }

    // 3. 触发事件，参数：事件名 事件参数
    dispatchEvent(type, params) {
        // 若没有注册该事件则抛出错误
        if (!this.handlers[type]) {
            return new Error('该事件未注册')
        }
        // 触发事件
        this.handlers[type].forEach(handler => {
            handler(...params)
        })
    }

    // 4. 事件移除，参数：事件名 要删除事件，若无第二个参数则删除该事件的订阅和发布
    removeEventListener(type, handler) {
        if (!this.handlers[type]) {
            return new Error('事件无效')
        }
        if (!handler) {
            // 移除事件
            delete this.handlers[type]
        } else {
            const index = this.handlers[type].findIndex(el => el === handler)
            if (index === -1) {
                return new Error('无该绑定事件')
            }
            // 移除事件
            this.handlers[type].splice(index, 1)
            if (this.handlers[type].length === 0) {
                delete this.handlers[type]
            }
        }
    }
}


/**
 * 数据双向绑定
 */
let obj = {}
let input = document.getElementById('input')
let span = document.getElementById('span')
// 数据劫持
Object.defineProperty(obj, 'text', {
    configurable: true,
    enumerable: true,
    get() {
        console.log('获取数据了')
    },
    set(newVal) {
        console.log('数据更新了')
        input.value = newVal
        span.innerHTML = newVal
    }
})
// 输入监听
input.addEventListener('keyup', function (e) {
    obj.text = e.target.value
})


/**
 * 简单路由
 */
class Route {
    constructor() {
        // 路由存储对象
        this.routes = {}
        // 当前hash
        this.currentHash = ''
        // 绑定this，避免监听时this指向改变
        this.freshRoute = this.freshRoute.bind(this)
        // 监听
        window.addEventListener('load', this.freshRoute, false)
        window.addEventListener('hashchange', this.freshRoute, false)
    }
    // 存储
    storeRoute(path, cb) {
        this.routes[path] = cb || function () { }
    }
    // 更新
    freshRoute() {
        this.currentHash = location.hash.slice(1) || '/'
        this.routes[this.currentHash]()
    }
}


/**
 * 对象是否循环使用
 * @param {Object} obj 
 * @param {Object} parent 
 */
const isCycleObject = (obj, parent) => {
    const parentArr = parent || [obj];
    for (let i in obj) {
        if (typeof obj[i] === 'object') {
            let flag = false;
            parentArr.forEach((pObj) => {
                if (pObj === obj[i]) {
                    flag = true;
                }
            })
            if (flag) return true;
            flag = isCycleObject(obj[i], [...parentArr, obj[i]]);
            if (flag) return true;
        }
    }
    return false;
}
