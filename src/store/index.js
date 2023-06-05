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
        await axios({method:"POST",url:"http://localhost:8000/createInvoice",data:mergeBasket(store.state.orderItems,store.state.addictions)}).then(res => {  
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
        MainButton.text = `Просмотреть заказ (${store.state.orderItems.length})`
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
    if(store.state.orderItems.length)
    {
        MainButton.show()
    }
}
const mergeAddictions = (firstAddictions, secondAddictions) =>
{
    const mergedAddictions = [...firstAddictions]; 
    secondAddictions.forEach(addiction => {
      const matchedIndex = mergedAddictions.findIndex(a => a.id === addiction.id);
      if (matchedIndex >= 0) {
        mergedAddictions[matchedIndex].quantity += addiction.quantity;
      } else {
        mergedAddictions.push(addiction);
      }
    });
    
    return mergedAddictions;
}
const mergeBasket = (Items,Addictions) =>
{
    if(Addictions.length)
    {
        const resultArray = [...Items, ...Addictions];
        return resultArray
    }
    else return Items
}
const store = createStore({
    state:{
        tg: WebApp,
        orderItems:[],
        username:window.Telegram.WebApp.initDataUnsafe?.user?.username,
        PageNumber:1,
        query_id:window.Telegram.WebApp.initDataUnsafe?.query_id,
        resp:resp,
        selectedItem:[],
        addictions:[],
        selectedItemAddictions:[]
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
            state.addictions = mergeAddictions(state.addictions,state.selectedItemAddictions)
            state.selectedItemAddictions = []
            state.selectedItem = ''
            state.PageNumber = 1
            BackButton.hide()
            MainButton.text = `Просмотреть заказ (${state.orderItems.length})` 
        },
        showhide(state)
        {
            if(state.orderItems.length)
            {
                MainButton.text = `Просмотреть заказ (${state.orderItems.length})`
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
            let search = state.resp.findIndex(item => item.ymlId === info.categoryId)
            let search2 = state.resp[search].products.findIndex(item => item.id === info.productId)
            if(info.size === 1)
            {
                state.selectedItem.price = state.resp[search].products[search2].price - 210
            }
            if(info.size === 2)
            {
                state.selectedItem.price = state.resp[search].products[search2].price
            }
            if(info.size === 3)
            {
                state.selectedItem.price = state.resp[search].products[search2].price + 290
            }
            state.selectedItem.size = info.size
        },
        inc(state,id)
        {
            let search = state.orderItems.findIndex(item => item.id === id)
            state.orderItems[search].quantity++
        },
        dec(state,id)
        {
            let search = state.orderItems.findIndex(item => item.id === id)
            if(state.orderItems[search].quantity === 1)
            {
                state.orderItems.splice(id,1)
                if(!state.orderItems.length)
                {
                    state.PageNumber = 1
                    BackButton.hide()
                    MainButton.hide()
                }
            }
            else
            {
                state.orderItems[search].quantity--
            }
        },
        incAddiction(state, prod)
        {
            let search = state.addictions.findIndex(item => item.id === prod.id)
            if(search === -1)
            {
                state.addictions.push(prod)
            }
            else
            {
                state.addictions[search].quantity++
            }
        },
        decAddiction(state,id)
        {
            let search = state.addictions.findIndex(item => item.id === id)
            if(state.addictions[search].quantity === 1)
            {
                state.addictions.splice(search,1)
            }
            else
            {
                state.addictions[search].quantity--
            }
        },
        incSelectedItemAddictions(state, prod)
        {
            let search = state.selectedItemAddictions.findIndex(item => item.id === prod.id)
            if(search === -1)
            {
                state.selectedItemAddictions.push(prod)
            }
            else
            {
                state.selectedItemAddictions[search].quantity++
            }
        },
        decSelectedItemAddictions(state,id)
        {
            console.log(id)
            let search = state.selectedItemAddictions.findIndex(item => item.id === id)
            if(state.selectedItemAddictions[search].quantity === 1)
            {
                state.selectedItemAddictions.splice(search,1)
            }
            else
            {
                state.selectedItemAddictions[search].quantity--
            }
        },
    },
    actions:{
        add(ctx, prod)
        {
            ctx.commit('add', prod)
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
        },
        inc(ctx,id)
        {
            ctx.commit('inc',id)
        },
        dec(ctx,id)
        {
            ctx.commit('dec',id)
        },
        incAddiction(ctx, prod)
        {
            ctx.commit('incAddiction', prod)
        },
        decAddiction(ctx, id)
        {
            ctx.commit('decAddiction', id)
        },
        incSelectedItemAddictions(ctx, prod)
        {
            ctx.commit('incSelectedItemAddictions', prod)
        },
        decSelectedItemAddictions(ctx, id)
        {
            ctx.commit('decSelectedItemAddictions', id)
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