<script setup>
import {
    Management,
    Promotion,
    UserFilled,
    User,
    Crop,
    EditPen,
    SwitchButton,
    CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'

//顶部导航栏动态显示数据
//调用获取用户详情信息的接口
import userInfoStore from '@/stores/userInfo.js'
import { userInfoService } from '@/api/user.js'
const userinfoStore = userInfoStore()
const getUserInfo = async()=>{
    //调用函数，
    let result = await userInfoService()
    //数据存储到pinia中
    userinfoStore.setInfo(result.data)
}

//调用函数
getUserInfo()
const props = defineProps({

})
//下拉菜单条目被点击后，调用函数
import { useRouter } from 'vue-router'
import { ElMessage,ElMessageBox } from 'element-plus'
import useTokenStore from '@/stores/token.js'
const router = useRouter()
const userTokenStore = useTokenStore()
const handleCommand = (command)=>{
     if(command == 'logout'){
            ElMessageBox.confirm(
                '你确定要退出吗?',
                '温馨提示',
                {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
                center: true,
                }
            )
                .then(async() => {
                //退出登录
                //清空token和个人信息
                userTokenStore.removeToken
                userinfoStore.removeInfo

                //跳转回到登录界面
                router.push('/login')
                ElMessage({
                    type: 'success',
                    message: '退出登录成功',
                })
                
                })
                .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '取消退出登录',
                })
                })
                }else{
                    router.push('/user/'+command)
                }
            }
</script>

<template>
    <el-container class="layout-container">
        <!-- 左侧菜单 -->
        <el-aside width="200px">
            <div class="el-aside__logo"></div>
            <el-menu active-text-color="#ffd04b" background-color="#232323"  text-color="#fff"
                router>
                <el-menu-item index="/article/articleCategory">
                    <el-icon>
                        <Management />
                    </el-icon>
                    <span>文章分类</span>
                </el-menu-item>
                <el-menu-item index="/article/articleManage">
                    <el-icon>
                        <Promotion />
                    </el-icon>
                    <span>文章管理</span>
                </el-menu-item>
                <el-sub-menu >
                    <template #title>
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                        <span>个人中心</span>
                    </template>
                    <el-menu-item index="/user/userInfo">
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>基本资料</span>
                    </el-menu-item>
                    <el-menu-item index="/user/userAvatar">
                        <el-icon>
                            <Crop />
                        </el-icon>
                        <span>更换头像</span>
                    </el-menu-item>
                    <el-menu-item index="/user/userResetPassword">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        <span>修改密码</span>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <!-- 右侧主区域 -->
        <el-container>
            <!-- 头部区域 -->
            <el-header>
                <div>用户名：<strong>{{ userinfoStore.info.nickname }}</strong></div>
                <el-dropdown placement="bottom-end" @command="handleCommand">
                    <span class="el-dropdown__box">
                        <el-avatar :src="userinfoStore.info.userPic?userinfoStore.info.userPic:avatar" />
                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="userInfo" :icon="User">基本资料</el-dropdown-item>
                            <el-dropdown-item command="userAvatar" :icon="Crop">更换头像</el-dropdown-item>
                            <el-dropdown-item command="userResetPassword" :icon="EditPen">修改密码</el-dropdown-item>
                            <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>
            <!-- 中间区域 -->
            <el-main>
                <!-- <div style="width: 1290px; height: 570px;border: 1px solid red;">
                    内容展示区
                </div> -->
                <router-view></router-view>
            </el-main>
            <!-- 底部区域 -->
            <el-footer>大事件</el-footer>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
    height: 100vh;

    .el-aside {
        background-color: #232323;

        &__logo {
            height: 120px;
            background: url('@/assets/logo.png') no-repeat center / 120px auto;
        }

        .el-menu {
            border-right: none;
        }
    }

    .el-header {
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .el-dropdown__box {
            display: flex;
            align-items: center;

            .el-icon {
                color: #999;
                margin-left: 10px;
            }

            &:active,
            &:focus {
                outline: none;
            }
        }
    }

    .el-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #666;
    }
}
</style>