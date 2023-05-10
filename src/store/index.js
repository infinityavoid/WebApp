import { createStore } from "vuex"
const store = createStore({
    state:{
        tg: window.Telegram.WebApp,
        Products:[
            {id:1,name:'q',price: 1000},
            {id:2,name:'w',price: 2000},
            {id:3,name:'e',price: 3000},


        ],
        orderItems:[],
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
    },
    getters:{
        AllInfo(state)
        {
            return state
        }
    }, 
})
export default store