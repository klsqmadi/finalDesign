import originAxios from 'axios'
export default function axios(option) {
    return new Promise((resolve, reject) => {
        // 1.创建axios的实例
        const instance = originAxios.create({
            // withCredentials: true,
            // baseURL: 'http://192.168.1.101:9999/community',
            // baseURL: '/help',
            // baseURL: 'http://10.33.222.130:8080',
            baseURL: 'http://192.168.1.102:8080',
            // baseURL: '',
            timeout: 150000,
        });
        // 配置请求和响应拦截
        instance.interceptors.request.use(config => {
            config.headers = {
                'Content-Type': 'application/json'
            }
            config.headers.Authorization = window.localStorage.getItem('token') || ''
            // 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画
            // 2.某些请求要求用户必须登录, 判断用户是否有token, 如果没有token跳转到login页面
            // const token = localStorage.getItem('takeAwayManage_TOKEN') || null
            // config.headers.token = token
            //     // 3.对请求的参数进行序列化(看服务器是否需要序列化)
            // if (typeof config.data == 'object' && Object.prototype.toString.call(config.data) !== '[object FormData]' && JSON.stringify(config.data).indexOf('{') == 0) { //判断变量m是不是json对象
            //     config.data = qs.stringify(config.data)
            // }
            // 4.等等
            return config
        }, err => {
            return err
        })

        instance.interceptors.response.use(response => {
            // console.log('来到了response拦截success中');
            return response.data
        }, err => {
            console.log('来到了response拦截failure中');
            console.log(err);
            if (err && err.response) {
                switch (err.response.status) {
                    case 400:
                        err.message = '请求错误'
                        break
                    case 401:
                        err.message = '未授权的访问'
                        break
                }
            }
            return err
        })

        // 2.传入对象进行网络请求
        instance(option).then(res => {
            resolve(res)
        }).catch(err => {
            console.log('axios', '统一报错')
            // requestErrorTip()
            reject(err)
        })










    })
}