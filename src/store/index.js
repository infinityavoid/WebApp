import { createStore } from "vuex"
import {useWebAppMainButton} from 'vue-tg'
import {useWebApp} from 'vue-tg'
const store = createStore({
    state:{
        tg: window.Telegram.WebApp,
        Products:[
            {id:1,name:'q',price: 1000},
            {id:2,name:'w',price: 2000},
            {id:3,name:'e',price: 3000},


        ],
        orderItems:[],
        aboba:useWebApp.initDataUnsafe?.user?.username
    },
    mutations:{
        add(state, prod)
        {
            let search = state.orderItems.findIndex(item => item.id === prod.id)
            if(search === -1)
            {
                state.orderItems.push(prod)
            }
            else
            {
                state.orderItems[search].quantity++
            }
        },
        del(state, id)
        {
            let search = state.orderItems.findIndex(item => item.id === id)
            console.log(search)
            state.orderItems[search].quantity = state.orderItems[search].quantity - 1
            if (state.orderItems[search].quantity === 0)
            {
                state.orderItems.splice(search,1)
            }
            console.log(state.orderItems)
        },
        showhide()
        {
            console.log(useWebApp.initDataInsafe)
            console.log(useWebAppMainButton().isMainButtonVisible)
            useWebAppMainButton().enableMainButton
            useWebAppMainButton().showMainButton
            useWebAppMainButton().mainButtonText = 'aboba'
            console.log(useWebAppMainButton().isMainButtonVisible)
            console.log(useWebAppMainButton())
        },
    },
    actions:{
        add(ctx, prod)
        {
            ctx.commit('add', prod)
        },
        del(ctx, id)
        {
            ctx.commit('del', id)
        },
        showhide(ctx)
        {
            ctx.commit('showhide')
        }
    },
    getters:{
        AllInfo(state)
        {
            return state
        }
    }, 
})
export default store