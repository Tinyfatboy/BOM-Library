window.$ = { }

$.bom = {
    openAtCenter: function(url, width, height) {
        window.open(url, '_blank', `
        width=${width}px,
        height=${height}px,
        left=${screen.width/2-width/2}px,
        top=${screen.height/2 - height/2}px`)
    },
    search: function(name, value) {
        // 找到所有查询字符串，并以键值对的形式保存
        let searchAll = function() {
            let result = []
            let search = window.location.search

            // 去掉'?'
            if (search[0] === '?') {
                search = search.slice(1)
            }

            // 在&处分割成数组
            let searchArray = search.split('&')

            // 把=改成键值对的形式
            for (var i = 0; i < searchArray.length; i++) {
                let parts = searchArray[i].split('=')

                // decodeURIComponent() 函数可对 encodeURIComponent() 函数编码的 URI 进行解码
                // 防止中文出现乱码
                result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]) || ''
            }
            return result
        }
        let result = searchAll()
        if (value === undefined) {
            return result[name]
        } else {
            if (result[name] === undefined) {
                // 如果查询字符串原来不存在，则新增
                window.location.search += `&${decodeURIComponent(name)}=${decodeURIComponent(value)}`
            } else {
                // 如果原来存在，则修改
                result[name] = encodeURIComponent(value)
                let newSearch = '?'
                for (let key in result) {
                    newSearch += `${decodeURIComponent(key)}=${decodeURIComponent(result[key])}&`
                }
                window.location.search = newSearch
            }
        }



    }
}
