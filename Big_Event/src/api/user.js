import request from '@/utils/request.js'

//1.提供注册接口
//不能传输以json进行传输 
//请求参数格式：x-www-form-urlencoded 
export const userRegisterService = (registerData) => {
    //通过URLSearchParams接受数据并转换成json格式
    const paras = new URLSearchParams
    for(let key in registerData){
        paras.append(key,registerData[key])
    }
    return request.post('/user/register',paras)
}

//2.提供登录接口
//不能传输以json进行传输 
//请求参数格式：x-www-form-urlencoded 
export const userLoginService = (loginData) => {
    const paras = new URLSearchParams
    for(let key in loginData){
        paras.append(key,loginData[key])
    }
    return request.post('/user/login',paras)
}

//3.提供获取用户详情信息接口
export const userInfoService = ()=>{
    return request.get('/user/userInfo')
}

//4.提供修改用户基本信息接口
export const userUpdateService = (userData)=>{
    return request.put('/user/update',userData)
}

//5.提供修改用户头像接口
export const userUpdateAvatarService = (avatar)=>{
    return request.patch('/user/updateAvatar?avatarUrl='+avatar)
}

//6.提供修改密码接口
export const userUpdatePasswordService = (pwdData)=>{
   return request.patch('/user/updatePwd',pwdData)
}