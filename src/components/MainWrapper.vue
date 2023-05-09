<template>
  <div @click="aboba" class="hello">
    <h3>Здравствуйте {{tg.initDataUnsafe?.user?.username}}, что вы хотите заказать?</h3>
    <button class="closeButton" @click="close">Закрой эту каку</button>
    <Products/>
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
      aboba()
      {
        console.log(this.tg)
      },
      close()
      {
        this.tg.close()
      }
    },
    components: {
      Products
    }
}

</script>

<style scoped>
.closeButton
{

}
</style>
