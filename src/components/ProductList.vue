<template>
  <div class="PList">
    <Product v-for="item in allProducts.Products"
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
        } 
    },
    components: { 
      Product
  },
  computed:{
    allProducts(){
      return this.$store.getters.AllInfo  
    }
  }
  
}
</script>

<style scoped>
.PList
{
  vertical-align: middle;
  margin-left: 10%;
  margin-right: 10%;
  height: 100%;
  display: flex; 
  flex-wrap: wrap;
  justify-content: center;
}
</style>
  