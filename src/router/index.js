import {createRouter, createWebHashHistory} from "vue-router";

//
// const News =()=>import('../page/news/News.vue')
// const Popularity =()=>import('../page/popularity/Popularity.vue')
// const Boring =()=>import('../page/boring/Boring.vue')
// const Girls =()=>import('../page/girls/Girls.vue')
const PreviewImageList = ()=> import('../page/PreviewImageList.vue')


const routes =[
    {
        path:'/preview-image-list',
        component:PreviewImageList,
        name:'previewImage'
    }

    // {path:'/', redirect:'/news'},
    // {path:'/news',component:News},
    // {path:'/popularity',component:Popularity},
    // {path:'/boring',component:Boring},
    // {path:'/girls',component:Girls},

]

const router = createRouter({
    history:createWebHashHistory(),
    routes

})

export default router;