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
          <button @click="dec(item.id)">-</button>
          <label>{{item.quantity}}</label>
          <button @click="inc(item.id)">+</button>
        </div>
      </div>
      <div v-for="item2 in AllInfo.resp[AllInfo.resp.findIndex(item => item.ymlId === 2)].products" :key = "item2.id" class="orderList">
        <div style="display: flex; justify-content: space-between;">
          <img v-if="item2.image" :src="item2.image" width="100" height="100" alt="Img">
          <div style="display: flex;flex-direction: column; justify-content: flex-start;">
            <h4>{{item2.name}}</h4>
            <label>{{item2.price}}₽</label>
          </div>
        </div>
        <div>
          <button v-if="AllInfo.addictions[AllInfo.addictions.findIndex(item => item.id === item2.id)]?.quantity" @click="decAddiction(item2)">-</button>
          <label v-if="AllInfo.addictions[AllInfo.addictions.findIndex(item => item.id === item2.id)]?.quantity">{{AllInfo.addictions[AllInfo.addictions.findIndex(item => item.id === item2.id)].quantity}}</label>
          <label v-else>0</label>
          <button @click="incAddiction(item2)">+</button>
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
      <div v-for="item2 in AllInfo.resp[AllInfo.resp.findIndex(item => item.ymlId === 2)].products" :key = "item2.id" class="orderList">
        <div style="display: flex; justify-content: space-between;">
          <img v-if="item2.image" :src="item2.image" width="100" height="100" alt="Img">
          <div style="display: flex;flex-direction: column; justify-content: flex-start;">
            <h4>{{item2.name}}</h4>
            <label>{{item2.price}}₽</label>
          </div>
        </div>
        <div>
          <button v-if="AllInfo.selectedItemAddictions[AllInfo.selectedItemAddictions.findIndex(item => item.id === item2.id)]?.quantity" @click="decSelectedItemAddictions(item2)">-</button>
          <label v-if="AllInfo.selectedItemAddictions[AllInfo.selectedItemAddictions.findIndex(item => item.id === item2.id)]?.quantity">{{AllInfo.selectedItemAddictions[AllInfo.selectedItemAddictions.findIndex(item => item.id === item2.id)].quantity}}</label>
          <label v-else>0</label>
          <button @click="incSelectedItemAddictions(item2)">+</button>
        </div>
      </div>
      <button style="width: 100%;"
      @click="add()"
      >Добавить в корзину</button>
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
</style>
