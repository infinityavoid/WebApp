<template>
  <div>
    <h3>{{name}}</h3>
    <div class="PList">
      <Product v-for="item in products"
      :Product_data = "item"
      :key = "item.id"
      :categoryId = "categoryId"
      >
      </Product>
    </div>
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
  props:{name:String,categoryId:Number,products:Object},
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
  