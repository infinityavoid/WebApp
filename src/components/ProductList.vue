<template>
  <div>
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
              {id:1,name:'q'},
              {id:2,name:'w'},
              {id:3,name:'e'},
              {id:4,name:'r'},
              {id:5,name:'t'},
              {id:6,name:'y'},
              {id:7,name:'u'},
              {id:8,name:'i'},
          ]
        } 
    },
    components: { 
      Product
  }
}
</script>

<style scoped>

</style>
  