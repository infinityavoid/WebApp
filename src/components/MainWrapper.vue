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
      <button style="width: 100%; position: absolute; left: 0; bottom: 0;"
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
