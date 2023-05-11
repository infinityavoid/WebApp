import { createStore } from "vuex"
import { WebApp } from 'miku-web-app'

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
            console.log(search)
            state.orderItems[search].quantity = state.orderItems[search].quantity - 1
            if (state.orderItems[search].quantity === 0)
            {
                state.orderItems.splice(search,1)
            }
            console.log(state.orderItems)
        },
        showhide(state)
        {
            if(state.orderItems.length)
            {
                WebApp.MainButton.show()
                WebApp.MainButton.enable()
                WebApp.onEvent('mainButtonClicked', newFunc())
            }
            else{
                
                WebApp.MainButton.hide()
                WebApp.MainButton.disable()
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
const newFunc = () =>
{
    let data = 
    {
        items: store.orderItems
    }
    console.log(data)
    WebApp.sendData(JSON.stringify(data))
}
export default store