<template>
  <div class="main">
    <div class="inner" v-if="AllInfo.PageNumber === 1">
      <h3>Здравствуйте {{AllInfo.username}}, что вы хотите заказать?</h3>
      <Products v-for="category in AllInfo.resp.filter(item => item.ymlId != 2)"
      :name = "category.name"
      :key = "category.id"
      :categoryId = "category.ymlId"
      :products = "category.products"
      />
    </div>
    <div v-if="AllInfo.PageNumber === 2">
      <h3>Ваш заказ:</h3>
      <div v-for="item in AllInfo.orderItems" :key = "item.id" class="orderList">
        <div style="display: flex; justify-content: space-between;">
          <img v-if="item.image" :src="item.image" width="100" height="100" alt="Img">
          <div style="display: flex;flex-direction: column; justify-content: flex-start;">
            <h4>{{item.name}}</h4>
            <label>{{item.price}}₽</label>
          </div>
        </div>
        <div>
          <button class="minusButton" @click="dec(item.id)">-</button>
          <label>{{item.quantity}}</label>
          <button class="plusButton" @click="inc(item.id)">+</button>
        </div>
      </div>
      <div v-for="item2 in AllInfo.resp[AllInfo.resp.findIndex(item => item.ymlId === 2)].products" :key = "item2.id" class="orderList">
        <div style="display: flex; justify-content: space-between;">
          <div style="display: flex;flex-direction: column; justify-content: flex-start;">
            <h4>{{item2.name}}</h4>
            <label>{{item2.price}}₽</label>
          </div>
        </div>
        <div>
          <button class="minusButton" v-if="AllInfo.addictions[AllInfo.addictions.findIndex(item => item.id === item2.id)]?.quantity" @click="decAddiction(item2)">-</button>
          <label v-if="AllInfo.addictions[AllInfo.addictions.findIndex(item => item.id === item2.id)]?.quantity">{{AllInfo.addictions[AllInfo.addictions.findIndex(item => item.id === item2.id)].quantity}}</label>
          <label v-else>0</label>
          <button class="plusButton" @click="incAddiction(item2)">+</button>
        </div>
      </div>
    </div>
    <div v-if="AllInfo.PageNumber === 3">
      <img v-if="AllInfo.selectedItem.image" :src="AllInfo.selectedItem.image" width="100" height="100" alt="Img">
      <h3>{{AllInfo.selectedItem.name}}</h3>
      <div v-if="AllInfo.selectedItem.categoryId === 5">
        <input type="radio" id="option1" @click="sizeChange(1)" name="options" >
        <label for="option1">20см</label>
        <input type="radio" id="option2" @click="sizeChange(2)" name="options" checked >
        <label for="option2">30см</label>
        <input type="radio" id="option3" @click="sizeChange(3)" name="options" >
        <label for="option3">40см</label>
      </div>
      <label>{{AllInfo.selectedItem.composition.reduce((acc, curr) => 
      {
        return acc + curr.name + ", ";
      }, "").slice(0, -2)}}
      </label>
      <div v-if="AllInfo.selectedItem.categoryId === 5">
        <div v-for="item2 in AllInfo.resp[AllInfo.resp.findIndex(item => item.ymlId === 2)].products.filter(item => (item.id === '13c67785-9d1d-4364-b334-9d296dd040cc') || (item.id === '85ee628e-092c-4d15-85ab-e933c920d525'))" :key = "item2.id" class="orderList">
          <div style="display: flex; justify-content: space-between;">
            <div style="display: flex;flex-direction: column; justify-content: flex-start;">
              <h4>{{item2.name}}</h4>
              <label>{{item2.price}}₽</label>
            </div>
          </div>
          <div>
            <button class="minusButton" v-if="AllInfo.selectedItemAddictions[AllInfo.selectedItemAddictions.findIndex(item => item.id === item2.id)]?.quantity" @click="decSelectedItemAddictions(item2)">-</button>
            <label v-if="AllInfo.selectedItemAddictions[AllInfo.selectedItemAddictions.findIndex(item => item.id === item2.id)]?.quantity">{{AllInfo.selectedItemAddictions[AllInfo.selectedItemAddictions.findIndex(item => item.id === item2.id)].quantity}}</label>
            <label v-else>0</label>
            <button class="plusButton" @click="incSelectedItemAddictions(item2)">+</button>
          </div>
        </div>
      </div>
      <div v-if="[11,8,12,13,1].includes(AllInfo.selectedItem.categoryId)">
        <div v-for="item2 in AllInfo.resp[AllInfo.resp.findIndex(item => item.ymlId === 2)].products.filter(item => (item.id === '3feefaa1-fb07-4296-b0bf-178124b710cf') || (item.id === '85ee628e-092c-4d15-85ab-e933c920d525')|| (item.id === '993cace1-4316-41be-b764-b7239e197958')|| (item.id === 'f50f1203-9daa-4220-90d1-671fdadb709c'))" :key = "item2.id" class="orderList">
          <div style="display: flex; justify-content: space-between;">
            <div style="display: flex;flex-direction: column; justify-content: flex-start;">
              <h4>{{item2.name}}</h4>
              <label>{{item2.price}}₽</label>
            </div>
          </div>
          <div>
            <button class="minusButton" v-if="AllInfo.selectedItemAddictions[AllInfo.selectedItemAddictions.findIndex(item => item.id === item2.id)]?.quantity" @click="decSelectedItemAddictions(item2)">-</button>
            <label v-if="AllInfo.selectedItemAddictions[AllInfo.selectedItemAddictions.findIndex(item => item.id === item2.id)]?.quantity">{{AllInfo.selectedItemAddictions[AllInfo.selectedItemAddictions.findIndex(item => item.id === item2.id)].quantity}}</label>
            <label v-else>0</label>
            <button class="plusButton" @click="incSelectedItemAddictions(item2)">+</button>
          </div>
        </div>
      </div>
      <div v-if="AllInfo.selectedItem.categoryId === 4">
        <div v-for="item2 in AllInfo.resp[AllInfo.resp.findIndex(item => item.ymlId === 2)].products.filter(item => (item.id === '1ce05479-6d28-4af1-9c55-aaaf37516481') || (item.id === 'a0dd1326-b1f2-47a3-b043-41a987b24fc2'))" :key = "item2.id" class="orderList">
          <div style="display: flex; justify-content: space-between;">
            <div style="display: flex;flex-direction: column; justify-content: flex-start;">
              <h4>{{item2.name}}</h4>
              <label>{{item2.price}}₽</label>
            </div>
          </div>
          <div>
            <button class="minusButton" v-if="AllInfo.selectedItemAddictions[AllInfo.selectedItemAddictions.findIndex(item => item.id === item2.id)]?.quantity" @click="decSelectedItemAddictions(item2)">-</button>
            <label v-if="AllInfo.selectedItemAddictions[AllInfo.selectedItemAddictions.findIndex(item => item.id === item2.id)]?.quantity">{{AllInfo.selectedItemAddictions[AllInfo.selectedItemAddictions.findIndex(item => item.id === item2.id)].quantity}}</label>
            <label v-else>0</label>
            <button class="plusButton" @click="incSelectedItemAddictions(item2)">+</button>
          </div>
        </div>
      </div>
      <button style="width: 100%;"
      @click="add()"
      >Добавить в корзину за {{itemPrice}}₽</button>
    </div>
  </div>
</template>

 

<script>
import Products from '../components/ProductList.vue'
export default {
  data(){
        return {
        } 
    },
    components: {
      Products
    },
    methods:{
      add()
      {
        
        this.$store.dispatch('add', this.AllInfo.selectedItem)
        this.$store.dispatch('showhide')
      },
      inc(id)
      {
        this.$store.dispatch('inc',id)
      },
      dec(id)
      {
        this.$store.dispatch('dec',id)
      },
      sizeChange(value)
      {
        let info =
        {
          productId:this.AllInfo.selectedItem.id,
          categoryId:this.AllInfo.selectedItem.categoryId,
          size:value
        }
        this.$store.dispatch('sizeChange',info)
      },
      incAddiction(item2)
      {
        let prod = 
        {
          id:item2.id,
          name:item2.name,
          price:item2.price,
          quantity:1
        } 
        this.$store.dispatch('incAddiction',prod)
      },
      decAddiction(item2)
      {
        this.$store.dispatch('decAddiction',item2.id)
      },
      incSelectedItemAddictions(item2)
      {
        let prod = 
        {
          id:item2.id,
          name:item2.name,
          price:item2.price,
          quantity:1
        } 
        this.$store.dispatch('incSelectedItemAddictions',prod)
      },
      decSelectedItemAddictions(item2)
      {
        this.$store.dispatch('decSelectedItemAddictions',item2.id)
      },
    },
    computed:{
      AllInfo()
      {
        return this.$store.getters.AllInfo
      },
      itemPrice()
      {
        let totalObjPrice = this.AllInfo.selectedItem.price * this.AllInfo.selectedItem.quantity;
        let totalArrPrice = this.AllInfo.selectedItemAddictions.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0);
        return totalObjPrice + totalArrPrice
      }
    },  
    mounted()
    {
      
    }
}

</script>

<style scoped>
.orderList
{
  align-items: center;
  justify-content: space-between;
  display: flex;
  margin-left: 5px;
}
.closeButton
{
 color: var(--tg-theme-button-color);
 cursor: pointer;
 outline: none;
 transition: transform var(--animation);
}
.main
{
  width: 100%;
  height: 100%;
}
.minusButton
{
    pointer-events: auto;
    transform: scale3d(1, 1, 1);
    background-color: #e64d44;
    transition: transform var(--animation), visibility var(--animation);
    width: 38px;
    height: 30px;
    color: #fff;
    outline: none;
    border: none;
    text-transform: uppercase;
    display: inline-block;
    font-family: var(--default-font);
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    padding: 6px 16px;
    height: 30px;
    border-radius: 7px;
    box-sizing: border-box;
    cursor: pointer;
}
.plusButton
{
    width: 38px;
    display: inline-block;
    font-family: var(--default-font);
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    padding: 6px 16px;
    height: 30px;
    border-radius: 7px;
    box-sizing: border-box;
    background-color: #f8a917;;
    text-transform: uppercase;
    color: #fff;
    outline: none;
    border: none;
    cursor: pointer;
}
</style>
