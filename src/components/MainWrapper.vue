<template>
  <div class="main">
    <h3>Здравствуйте {{AllInfo.tg.initDataUnsafe?.user?.username}}, что вы хотите заказать?</h3>
    <Products/>
    <button class="closeButton" @click="close">Закрой эту каку</button>
    <MainButton></MainButton>
  </div>
</template>

 

<script>
import Products from '../components/ProductList.vue'
import { MainButton } from "vue-tg"
export default {
  data(){
        return {
        } 
    },
    methods:
    {
      close()
      {
        /*if (this.AllInfo.tg.MainButton.isVisible){
          this.AllInfo.tg.MainButton.hide()
      }
      else this.AllInfo.tg.MainButton.show()*/
      this.$store.dispatch('showhide')
      }
    },
    components: {
      Products, MainButton
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
