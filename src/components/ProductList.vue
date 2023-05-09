<template>
  <div class="PList">
    <Product v-for="item in Products"
    :Product_data = "item"
    :key = "item.id"
    >
    </Product>
  </div>
</template>
  
<script>
import Product from '../components/ProductItem.vue'
export default {
  data(){
        return {
          Products:[
              {id:1,name:'q',price: 1000},
              {id:2,name:'w',price: 2000},
              {id:3,name:'e',price: 3000},
              {id:4,name:'r',price: 4000},
              {id:5,name:'t',price: 5000},
              {id:6,name:'y',price: 6000},
              {id:7,name:'u',price: 7000},
              {id:8,name:'i',price: 8000},
          ]
        } 
    },
    components: { 
      Product
  }
}
</script>

<style scoped>
.PList
{
  flex-wrap: wrap;
  align-items: center;
  flex-direction: row;
  width: 100%;
  display: flex;
  overflow: auto;
  align-self: center;
}
</style>
  