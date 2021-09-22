import request from "../utils/request";


// 妹子图列表
const getGirlsDefault = ()=>{
    return request({
        method:'GET',
        url:'/jiandan/api/v1/comment/list/108629'
    })
}
const getGirlsWithStartId=(start_id)=>{
    return request({
        method:'GET',
        params:{
            start_id:start_id
        },
        url:'/jiandan/api/v1/comment/list/108629'
    })
}

export default {getGirlsDefault,getGirlsWithStartId}