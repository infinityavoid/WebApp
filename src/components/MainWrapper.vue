<template>
  <div class="main">
    <h3>Здравствуйте {{tg.initDataUnsafe?.user?.username}}, что вы хотите заказать?</h3>
    <Products/>
    <button class="closeButton" @click="close">Закрой эту каку</button>
  </div>
</template>

 

<script>
import Products from '../components/ProductList.vue'
export default {
  data(){
        return {
          tg: window.Telegram.WebApp
        } 
    },
    methods:
    {
      close()
      {
        if (this.tg.MainButton.isVisible){
         this.tg.MainButton.hide()
      }
      else this.tg.MainButton.show()
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
