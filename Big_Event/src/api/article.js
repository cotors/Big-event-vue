import ArticleCategoryVue from '@/views/article/ArticleCategory.vue'
import request from '@/utils/request.js'
import { useTokenStore } from '@/stores/token.js'
//文章分类列表查询
export const articleCategoryVueService = ()=>{
    // const tokenStore = useTokenStore()
    //headers:请求头
    //在pinia中定义的响应式数据，使用时都不需要.value
    // return request.get('/category',{headers:{'Authorization':tokenStore.token}})
    return request.get('/category')
}

//提供添加文章分类接口
export const articleCategoryAddService = (categoryData)=>{
    return request.post('/category',categoryData)
}

//提供更新文章分类接口
export const articleCategoryUpdateService = (categoryData)=>{
    return request.put('/category',categoryData)
}

//提供删除文章分类接口
export const articleCategoryDeleteService = (id)=>{
    return request.delete('/category?id='+id)
}

//提供文章列表查询的接口
export const articleListService = (params)=>{
    return request.get('/article',{params:params})
}

//提供添加文章的接口
export const articleAddService = (articleData)=>{
    return request.post('/article',articleData)
}

//提供修改文章的接口
export const articleUpdateService = (articleUpdate)=>{
    return request.put('/article',articleUpdate)
}

//提供删除文章的接口
export const articleDeleteService = (id)=>{
    return request.delete('/article?id='+id)
}