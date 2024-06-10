<script setup>
import { Plus, Upload } from '@element-plus/icons-vue'
import {ref} from 'vue'
import avatar from '@/assets/default.png'
import userInfoStore from '@/stores/userInfo.js'
import useTokenStore from '@/stores/token.js'
import { userUpdateAvatarService } from '@/api/user.js'
import { ElMessage } from 'element-plus'
import router from '@/router'

const uploadRef = ref()
const userinfoStore = userInfoStore()
const useToken = useTokenStore()
//用户头像地址
const imgUrl= ref(userinfoStore.info.userPic)

//头像上传的回调函数
const uploadImg = (result)=>{
    imgUrl.value = result.data
    console.log(result.data)
}

//实现头像上传
const updateImg = async()=>{
    let result = await userUpdateAvatarService(imgUrl.value)
    ElMessage.success(result.msg?result.msg:'头像修改成功')

    //更新pinia中的头像数据
    userInfoStore.info.userPic = imgUrl.value
}

</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>更换头像</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                    <!--
                        :auto-upload:是否自动上传
                        action:设置服务器接口路径
                        headers:设置上传的请求头
                        name:设置上传的文件字段名
                        on-success:设置上传成功的回调函数
                    -->
                <el-upload 
                    ref="uploadRef"
                    class="avatar-uploader"
                    :auto-upload="true"
                    action="/api/upload"
                    name="file"
                    :headers="{'Authorization':useToken.token}"
                    :on-success="uploadImg"
                    :show-file-list="false"
                    >
                    <img v-if="imgUrl" :src="imgUrl" class="avatar" />
                    <img v-else :src=avatar width="278" />
                </el-upload>
                <br/>
                <el-button type="primary" :icon="Plus" size="large"  @click="uploadRef.$el.querySelector('input').click()">
                    选择图片
                </el-button>
                <el-button type="success" :icon="Upload" size="large" @click="updateImg">
                    上传头像
                </el-button>
            </el-col>
        </el-row>
    </el-card>
</template>

<style lang="scss" scoped>
.avatar-uploader {
    :deep() {
        .avatar {
            width: 278px;
            height: 278px;
            display: block;
        }

        .el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }

        .el-upload:hover {
            border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 278px;
            height: 278px;
            text-align: center;
        }
    }
}
</style>