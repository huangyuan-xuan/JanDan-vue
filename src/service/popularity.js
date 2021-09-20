import request from "../utils/request";


// 树洞列表
const getPopularityDefault = ()=>{
    return request({
        method:'GET',
        url:'/jiandan/api/v1/comment/list/102312'
    })
}
const getPopularityWithStartId=(start_id)=>{
    return request({
        method:'GET',
        params:{
            start_id:start_id
        },
        url:'/jiandan/api/v1/comment/list/102312'
    })
}

export default {getPopularityDefault,getPopularityWithStartId}