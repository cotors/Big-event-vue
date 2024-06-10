<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)

//定义数据模型
const registData = ref({
    username:'',
    password:'',
    rePassWord:''
})

//校验密码的函数
//rule:校验规则  value:参数 collback:事务提交(回滚)
const checkRePossWord = (rule,value,collback) => {
    if(value===''){
        collback(new Error('请再次确认密码'))
    }else if(value != registData.value.password){
        collback(new Error('两次密码不一致'))
    }else{
        collback()
    }
    
}

//自定义表单校验规则
const rules =  {
    //trigger:'blur':点击提交或者鼠标离开时校验
    username:[
        {required:true,message:'请输入用户名',trigger:'blur'},
        {min:5,max:16,message:'长度为5~16非空字符串',trigger:'blur'}
    ],
    password:[
        {required:true,message:'请输入密码',trigger:'blur'},
        {min:5,max:16,message:'长度为5~16非空字符串',trigger:'blur'}
    ],
    rePassWord:[
        {validator:checkRePossWord,trigger:'blur'}
    ]
}

//注册功能
import {userRegisterService,userLoginService} from '@/api/user.js'
//添加async:添加await必须添加async
const register = async() => {
    //await:同步等待 异步请求的结果
    let result = await userRegisterService(registData.value)
    // if(result.code===0){
    //     ElMessage.success(result.msg? result.msg:'注册成功')
    // }else{
    //     ElMessage.error('注册失败')
    // }
    ElMessage.success(result.msg? result.msg:'注册成功')
}

//登录功能(数据复用注册的数据)
//绑定数据和校验规则
//提供登录接口

import { useRouter } from 'vue-router'
import { useTokenStore } from '@/stores/token.js'
const route = useRouter()
const tokenStore = useTokenStore()
const login = async() => {
    let result = await userLoginService(registData.value)
    // if(result.code===0){
    //     ElMessage.success(result.msg?msg : '登录成功')
    //     route.push('/')
    // }else{
    //     ElMessage.error('登陆失败')
    // }
    ElMessage.success(result.msg?msg : '登录成功')
    //登录成功，储存token在pinia中
    tokenStore.setToken(result.data)
    route.push('/')
}

//清除数据参数
const clearRegisterData = () => {
     registData.value={
        username:'',
        password:'',
        rePassWord:''
     }
}

</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <!-- 注册表单 :rules="" 绑定校验规则 -->
            <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registData" :rules="rules">
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>
                <el-form-item prop="username"> <!-- prop="属性名"  绑定指定校验规则的名称-->
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registData.password"></el-input>
                </el-form-item>
                <el-form-item prop="rePassWord">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码" v-model="registData.rePassWord"></el-input>
                </el-form-item>
                <!-- 注册按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="register">
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = false;clearRegisterData()">
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>
            <!-- 登录表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-else :model="registData" :rules="rules">
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registData.password"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <el-link type="primary" :underline="false">忘记密码？</el-link>
                    </div>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = true;clearRegisterData()">
                        注册 →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
    height: 100vh;
    background-color: #fff;

    .bg {
        background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
            url('@/assets/login_bg.jpg') no-repeat center / cover;
        border-radius: 0 20px 20px 0;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;

        .title {
            margin: 0 auto;
        }

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>