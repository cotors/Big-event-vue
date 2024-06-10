import { defineStore } from "pinia"
import { ref } from "vue"
const userInfoStore = defineStore('userInfo',()=>{
     //定义状态相关的内容
     const info = ref({})

     const setInfo = (newInfo)=>{
        info.value = newInfo
     }

     const removeInfo = ()=>{
        info.value = {}
     }

     return {info,setInfo,removeInfo}
},{persist:true})//pinia持久化存储

//导出
export default userInfoStore