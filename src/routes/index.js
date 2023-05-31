import { createRouter,createWebHistory } from 'vue-router'
import Main from '../components/MainWrapper.vue'
import Detail from '../components/ProductDetail.vue'

 const router = createRouter({
    history: createWebHistory(),
    routes:[
    {
        path:'/',
        component: Main
    },
    {
        name:'Detail',
        path:'/Detail',
        component: Detail,
    }
]

    }
)
export default router