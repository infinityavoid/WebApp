<template>
  <div class="main">
    <div class="inner" v-if="AllInfo.PageNumber === 1">
      <h3>Здравствуйте {{AllInfo.aboba}}, что вы хотите заказать?</h3>
      <Products v-for="category in AllInfo.resp"
      :name = "category.name"
      :key = "category.id"
      :categoryId = "category.ymlId"
      :products = "category.products"
      />
    </div>
    <div v-if="AllInfo.PageNumber === 2">
      <h3>Ваш заказ:</h3>
      <div v-for="item in AllInfo.orderItems" :key = "item.id" class="orderList">
        <div>
          <label>{{item.name}} x{{item.quantity}}</label>
        </div>
        <label>{{item.price}}</label>
      </div>
    </div>
    <div v-if="AllInfo.PageNumber === 3">
      <img v-if="AllInfo.selectedItem.image" :src="AllInfo.selectedItem.image" alt="Img">
      <h3>{{AllInfo.selectedItem.name}}</h3>
      <div v-if="AllInfo.selectedItem.categoryId === 5">
        <input type="radio" id="option1" @click="sizeChange()" value=290 name="options" checked v-model="pizzaSize">
        <label for="option1">30см</label>
        <input type="radio" id="option2" value=500 name="options" v-model="pizzaSize">
        <label for="option2">40см</label>
        <input type="radio" id="option3" value=790 name="options" v-model="pizzaSize">
        <label for="option3">50см</label>
        <label >{{pizzaSize}}</label>
      </div>
      <button
      @click="add()"
      />
    </div>
  </div>
</template>

 

<script>
import Products from '../components/ProductList.vue'
export default {
  data(){
        return {
          pizzaSize:290
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
      sizeChange()
      {
        this.$store.dispatch('sizeChange',this.pizzaSize)
      }
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
