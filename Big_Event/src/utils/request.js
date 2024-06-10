//定制请求的实例

//导入axios  npm install axios
import { ElMessage } from 'element-plus';
import axios from 'axios';
//定义一个变量,记录公共的前缀  ,  baseURL
// const baseURL = 'http://localhost:8080';
const baseURL = '/api';
const instance = axios.create({baseURL})

import { useTokenStore } from '@/stores/token.js'
//添加请求拦截器
instance.interceptors.request.use(
    (config)=>{
       //请求前的回调
       //添加token
      const tokenStore = useTokenStore()
      //判断是否有token
      if(tokenStore.token){
        config.headers.Authorization = tokenStore.token
      }
      return config
    },
    (err)=>{
        //请求错误的回调
       return Promise.reject(err)
    }
)

// import { useRouter } from 'vue-router'
// const router = useRouter()
//由于模块加载的顺序，不能直接导入和创建useRouter,应该使用定义的router.js
import router from '@/router'
//添加响应拦截器
instance.interceptors.response.use(
    result=>{
        //判断业务状态码
        if(result.data.code===0){
            //操作成功返回
            return result.data;
        }
           //操作失败
        //    alert(result.data.msg?result.data.msg:'服务异常')
        //使用element-plus的提示框组件
        ElMessage.error(result.data.msg?result.data.msg:'服务异常')
           //异步的状态转化成失败的状态
           return Promise.reject(result.data)
   
    },
    err=>{
        //判断响应状态码是否为401
        if(err.response.status===401){
            ElMessage.error('请先登录')
            router.push('/login')
        }else{
            ElMessage.error('服务异常')
        }
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)

export default instance;