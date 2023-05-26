import { createStore } from "vuex"
import { WebApp } from 'miku-web-app'
import axios from 'axios';
const MainButton = WebApp.MainButton;
const BackButton = WebApp.BackButton;
const newFunc = async () =>
{
    if(store.state.PageNumber === 2)
    {
        await axios(
            {
                method:"POST",url:"http://localhost:8000/createInvoice",data:store.state.orderItems}).then(res => {
                WebApp.openInvoice(res.data.result, (object) => 
                {
                    console.log('a')
                    console.log(object)
                    if (object.status === "paid")
                    {
                        store.state.tg.close()
                    }
                })
            })
    }
    else
    {
        store.state.PageNumber = 2 
        MainButton.text = 'Перейти к оплате'
        BackButton.show()
        window.Telegram.WebApp.BackButton.onClick(newFunc2)
    }
    //WebApp.sendData(JSON.stringify(store.state.orderItems))
}
const newFunc2 = () =>
{
    if(store.state.PageNumber === 2)
    {
        store.state.PageNumber = 1
        BackButton.hide()
        MainButton.text = 'Просмотреть заказ'
    }
    else
    {
        store.state.PageNumber = 2
        MainButton.show()
        MainButton.text = 'Перейти к оплате'
    }
}

const store = createStore({
    state:{
        tg: WebApp,
        Products:[
            {id:1,name:'Пепперони',price: 550},
            {id:2,name:'Чикита',price: 550},
            {id:3,name:'Бонито Hot',price: 530},


        ],
        orderItems:[],
        aboba:window.Telegram.WebApp.initDataUnsafe?.user?.username,
        PageNumber:1,
        query_id:window.Telegram.WebApp.initDataUnsafe?.query_id
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
                MainButton.text = 'Просмотреть заказ'
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