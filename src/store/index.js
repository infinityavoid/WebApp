import { createStore } from "vuex"
import { WebApp } from 'miku-web-app'
const MainButton = WebApp.MainButton;
const newFunc = () =>
{
    console.log(store.state.orderItems)
    WebApp.sendData(JSON.stringify(store.state.orderItems))
}
const store = createStore({
    state:{
        tg: WebApp,
        Products:[
            {id:1,name:'q',price: 1000},
            {id:2,name:'w',price: 2000},
            {id:3,name:'e',price: 3000},


        ],
        orderItems:[],
        aboba:WebApp.initDataUnsafe?.user?.username
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
            state.orderItems[search].quantity = state.orderItems[search].quantity - 1
            if (state.orderItems[search].quantity === 0)
            {
                state.orderItems.splice(search,1)
            }
        },
        showhide(state)
        {
            if(state.orderItems.length)
            {
                MainButton.show();
                window.Telegram.WebApp.MainButton.onClick(newFunc)
            }
            else{
                WebApp.MainButton.hide()
                window.Telegram.WebApp.MainButton.offClick(newFunc)
            }
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
        },
    },
    getters:{
        AllInfo(state)
        {
            return state
        },
    }, 
})
export default store