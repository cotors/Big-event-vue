//导入路由函数
import { createRouter,createWebHistory } from "vue-router";

//导入组件
import LoginVue from '@/views/Login.vue'
import LayoutVue from '@/views/Layout.vue'
import Category from '@/views/article/ArticleCategory.vue'
import Manage from '@/views/article/ArticleManage.vue'
import UserAvatar from '@/views/user/UserAvatar.vue'
import UserInfo from '@/views/user/UserInfo.vue'
import UserResetPassword from '@/views/user/UserResetPassword.vue'

//创建路由关系和访问路径
const routes = [
    {path: '/login',component: LoginVue},
    {path: '/',component: LayoutVue,redirect: '/article/ArticleCategory',children:[
        {path: '/article/articleCategory',component: Category},
        {path: '/article/articleManage',component: Manage},
        {path: '/user/userAvatar',component: UserAvatar}, //修改头像
        {path: '/user/userInfo',component: UserInfo},  //基本资料 
        {path: '/user/userResetPassword',component: UserResetPassword} //修改密码
    ]}
]

//创建路由
const router = createRouter({
    history:createWebHistory(),   //慎重是createWebHistory()函数,不是是createWebHistory
    routes:routes
})

//导出路由
export default router