const utils = {
    /**
     * 对象转url参数
     * @param {*} data
     * @param {*} isPrefix
     */
    queryParams(data, isPrefix = false) {
        let prefix = isPrefix ? '?' : ''
        let _result = []
        for (let key in data) {
            let value = data[key]
            // 去掉为空的参数
            if (['', undefined, null].includes(value)) {
                //continue
            }
            if (value.constructor === Array) {
                value.forEach(_value => {
                    _result.push(encodeURIComponent(key) + '[]=' + encodeURIComponent(_value))
                })
            } else {
                _result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
            }
        }

        return _result.length ? prefix + _result.join('&') : ''
    },

    // ....其他函数....
    formatTime(date = new Date, fmt = 'YYYY-MM-dd HH:mm:ss') {
        //date = date || new Date
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()

        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "H+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        return fmt;
    },
    // 计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度 
    getDistance(lat1, lng1, lat2, lng2) {
        var radLat1 = lat1 * Math.PI / 180.0;
        var radLat2 = lat2 * Math.PI / 180.0;
        var a = radLat1 - radLat2;
        var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * 6378.137; // EARTH_RADIUS 赤道半径
        s = Math.round(s * 10000) / 10000; //  输出为KM
        // s = s.toFixed(4); // 保留4位小数点
        return s;
    }
}
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

export default utils
