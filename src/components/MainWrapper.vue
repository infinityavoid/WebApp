<template>
  <div class="main">
    <div v-if="AllInfo.PageNumber === 1">
      <h3>Здравствуйте {{AllInfo.aboba}}, что вы хотите заказать?</h3>
      <Products/>
      <button class="closeButton" @click="close">Закрой эту каку</button>
    </div>
    <div v-if="AllInfo.PageNumber === 2">
      <h3>Ваш заказ:</h3>
      <div v-for="item in AllInfo.orderItems" :key = "item.id" class="orderList">
        <div>
          <label>{{item.name}} {{item.quantity}}x</label>
        </div>
        <label>{{item.price}}</label>
      </div>
    </div>
    <div v-if="AllInfo.PageNumber === 3">
      <label for="">В разработке</label>
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
    methods:
    {
      close()
      {
        this.AllInfo.tg.close()
      },
    },
    components: {
      Products
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
