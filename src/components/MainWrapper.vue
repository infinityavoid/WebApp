<template>
  <div class="main">
    <h3>Здравствуйте {{AllInfo.aboba}}, что вы хотите заказать?</h3>
    <Products/>
    <button class="closeButton" @click="close">Закрой эту каку</button>
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
      }
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
}

</script>

<style scoped>
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
