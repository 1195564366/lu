import axios from 'axios'
import { Toast } from 'vant'
import { Cache } from '@utils'

const service = axios.create()

service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

service.interceptors.response.use(response => {
  // if (response.data.code === 500 && response.data.msg === '获取用户ID失败') {
  //   window.location.href="http://cqdaguanjia.com/api/index"
  //   return
  // }
  return response.data
}, err=> {
  return Promise.reject(err);
})

export const fetchPost = function (url, data = {}, config = {}) {
  return new Promise((resolve, reject) => {
    let toast
    if (!config.noLoading) {
      toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...'
      })
    }
    service.post(url, data).then(res => {
      resolve(res)
      !config.noLoading && toast.clear();
    }).catch(err => {
      toast.clear();
      reject(err)
    })
  })
}

export const fetchGet = function (url, data = {}, config = {}) {
  return new Promise((resolve, reject) => {
    let toast
    if (!config.noLoading) {
      toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...'
      })
    }
    service.get(url, {
      params: data
    }).then(res => {
      resolve(res)
      !config.noLoading && toast.clear();
    }).catch(err => {
      toast.clear();
      reject(err)
    })
  })
}

