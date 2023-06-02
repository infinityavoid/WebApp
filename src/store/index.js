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
        console.log('a')
        store.state.PageNumber = 1
        BackButton.hide()
        MainButton.text = 'Просмотреть заказ'
    }
    else
    {
        console.log('b')
        store.state.PageNumber = 2
        MainButton.show()
        MainButton.text = 'Перейти к оплате'
    }
}
const newFunc3 = () =>
{
    console.log('c')
    store.state.PageNumber = 1
    BackButton.hide()
}
const store = createStore({
    state:{
        tg: WebApp,
        orderItems:[],
        aboba:window.Telegram.WebApp.initDataUnsafe?.user?.username,
        PageNumber:1,
        query_id:window.Telegram.WebApp.initDataUnsafe?.query_id,
        resp:resp,
        selectedItem:''
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
            state.selectedItem = ''
            state.PageNumber = 1
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
        showdetail(state, prod)
        {
            state.selectedItem = prod
            state.PageNumber = 3
            BackButton.show()
            window.Telegram.WebApp.BackButton.onClick(newFunc3)
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
        showdetail(ctx, prod)
        {
            ctx.commit('showdetail', prod)
        },
        /*addToBakset(ctx, prod)
        {
            ctx.commit('addToBakset', prod)
        }*/
    },
    getters:{
        AllInfo(state)
        {
            return state
        },
    }, 
})
export default store