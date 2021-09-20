import request from "../utils/request";


// 无聊图列表
const getBoringDefault = ()=>{
    return request({
        method:'GET',
        url:'/jiandan/api/v1/comment/list/26402'
    })
}
const getBoringWithStartId=(start_id)=>{
    return request({
        method:'GET',
        params:{
            start_id:start_id
        },
        url:'/jiandan/api/v1/comment/list/26402'
    })
}

export default {getBoringDefault,getBoringWithStartId}