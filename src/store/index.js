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
        window.Telegram.WebApp.BackButton.offClick(newFunc3)
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
                if(state.orderItems.findIndex(item => item.id === prod.id && item.size === prod.size) != -1)
                {
                    state.orderItems[search].quantity++
                }
                else
                {
                    state.orderItems.push(prod)
                }
            }
            state.selectedItem = ''
            state.PageNumber = 1
            BackButton.hide()
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
            MainButton.hide()
            window.Telegram.WebApp.BackButton.onClick(newFunc3)
        },
        sizeChange(state, info) //поиск товара в json, чтобы узнать его дефолтную цену(дефолтная цена = 2 размер пиццы, т.е 30см)
        {
            //let search = state.resp.findIndex(item => item.ymlId === info.categoryId)
            //let search2 = state.resp[search].products.findIndex(item => item.id === info.productId)
            if(info.size === 1)
            {
                state.selectedItem.price = state.resp[info.categoryId].products[info.productId].price - 210
            }
            if(info.size === 2)
            {
                state.selectedItem.price = state.resp[info.categoryId].products[info.productId].price
            }
            if(info.size === 3)
            {
                state.selectedItem.price = state.resp[info.categoryId].products[info.productId].price + 290
            }
            state.selectedItem.size = info.size
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
        showdetail(ctx, prod)
        {
            ctx.commit('showdetail', prod)
        },
        sizeChange(ctx, info)
        {
            ctx.commit('sizeChange',info)
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