import { createStore } from "vuex"
import { WebApp } from 'miku-web-app'
const MainButton = WebApp.MainButton;
const newFunc = () =>
{
    store.state.PageNumber = 2
    window.Telegram.WebApp.MainButton.onClick(()=>{store.state.PageNumber = 3})
    //WebApp.sendData(JSON.stringify(store.state.orderItems))
}
const store = createStore({
    state:{
        tg: WebApp,
        Products:[
            {id:1,name:'Бургир',price: 1000},
            {id:2,name:'Пица',price: 2000},
            {id:3,name:'Мет',price: 3000},


        ],
        orderItems:[],
        aboba:window.Telegram.WebApp.initDataUnsafe?.user?.username,
        PageNumber:1
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
                MainButton.text = 'View Order'
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