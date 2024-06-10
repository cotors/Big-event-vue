<script setup>
import { ref } from 'vue'
//导入pinia，实现数据回显
import userInfoStore from '@/stores/userInfo.js'
const userinfoStore = userInfoStore()

import { ElMessage } from 'element-plus'

const rePasswordData = ref({
    old_pwd:'',
    new_pwd:'',
    re_pwd:''
})

//校验密码的函数
//rule:校验规则  value:参数 collback:事务提交(回滚)
const checkRePossWord = (rule,value,collback) => {
    if(value===''){
        collback(new Error('请再次确认密码'))
    }else if(value != rePasswordData.value.new_pwd){
        collback(new Error('两次密码不一致'))
    }else{
        collback()
    }
    
}

// const rule =  {
//     //trigger:'blur':点击提交或者鼠标离开时校验
//     oldPassword:[
//         {required:true,message:'请输入原密码',trigger:'blur'},
//         {min:5,max:16,message:'长度为5~16非空字符串',trigger:'blur'}
//     ],
//     newPassword:[
//         {required:true,message:'请输入密码',trigger:'blur'},
//         {min:5,max:16,message:'长度为5~16非空字符串',trigger:'blur'}
//     ],
//     rePassWord:[
//         {validator:checkRePossWord,trigger:'blur'}
//     ]
// }

//修改密码
import { userUpdatePasswordService } from '@/api/user.js'
import router from '@/router'
const userUpdate = async()=>{
    let result = await userUpdatePasswordService(rePasswordData.value)
    ElMessage.success(result.msg?result.msg:'修改密码成功')
    router.push('/login')
}

</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>修改密码</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="rePasswordData" :rules="rule" label-width="100px" size="large">
                    <el-form-item label="原密码" prop="oldPassword">
                        <el-input v-model="rePasswordData.old_pwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPassword">
                        <el-input v-model="rePasswordData.new_pwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="rePassWord">
                        <el-input v-model="rePasswordData.re_pwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="userUpdate">提交修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>