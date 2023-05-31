import { createStore } from "vuex"
import { WebApp } from 'miku-web-app'
import axios from 'axios';
import resp from '@/store/response.json'
const MainButton = WebApp.MainButton;
const BackButton = WebApp.BackButton;
const newFunc = async () =>
{
    if(store.state.PageNumber === 2)
    {
        await axios({method:"POST",url:"http://localhost:8000/createInvoice",data:store.state.orderItems}).then(res => {  
        WebApp.openInvoice(res.data.result,(status) => // тоже не работает
        {
            console.log(status)
        })
        WebApp.onEvent('invoiceClosed',(object) => {console.log(object)} ) // не работает
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
const newFunc3 = () =>
{
    store.state.PageNumber = 1
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
        query_id:window.Telegram.WebApp.initDataUnsafe?.query_id,
        resp:resp,
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
                MainButton.hide()
                window.Telegram.WebApp.MainButton.offClick(newFunc)
            }
        },
        showdetail(state)
        {
            state.PageNumber = 3
            BackButton.show()
            window.Telegram.WebApp.BackButton.onClick(newFunc3)

        }
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
        showdetail(ctx)
        {
            ctx.commit('showdetail')
        }
    },
    getters:{
        AllInfo(state)
        {
            return state
        },
    }, 
})
export default store