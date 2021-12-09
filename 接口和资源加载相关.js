/**
 * Promise封装AJAX
 * @param {String} url 
 * @param {String} method 
 * @param {any} params 
 */
function fetchUrl(url, method, params) {
    if (!url || typeof url !== 'string') throw TypeError('url must be string')
    let methods = ['get', 'put', 'post']
    if (!methods.includes(method)) throw TypeError(`method must in ${methods.toString()}`)

    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest()
        xhr.open(method, url, true)
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return
            }
            if (xhr.status === 200) {
                resolve(xhr.response)
            } else {
                reject(xhr.statusText)
            }
        }
        xhr.onerror = function () {
            console.log('onerror' + xhr.statusText)
        }
        // 设置请求头信息
        xhr.responseType = "json";
        xhr.setRequestHeader("Accept", "application/json");
        xhr.send(params)
    })
}


/**
 * fetch封装类
 */
class HttpRequestUtil {
    async get(url) {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }
    async post(url, data) {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        return result;
    }
    async put(url, data) {
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        });
        const result = await res.json();
        return result;
    }
    async delete(url, data) {
        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        });
        const result = await res.json();
        return result;
    }
}


/**
 * 图片异步加载
 * @param {String} url 
 */
let imageAsync = (url) => {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = url;
        img.οnlοad = () => {
            console.log(`图片请求成功，此处进行通用操作`);
            resolve(image);
        }
        img.οnerrοr = (err) => {
            console.log(`失败，此处进行失败的通用操作`);
            reject(err);
        }
    })
}

imageAsync("url").then(() => {
    console.log("加载成功");
}).catch((error) => {
    console.log("加载失败");
})
