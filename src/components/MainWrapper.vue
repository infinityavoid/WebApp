<template>
  <div @click="aboba" class="hello">
    <h3>Здравствуйте {{tg.initDataUnsafe?.user?.username}}, что вы хотите заказать?</h3>
    <button class="closeButton" @click="close"></button>
    <h3>{{tg.initDataUnsafe?.user?.username}}</h3>
  </div>
</template>

 

<script>
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
    }
}

</script>

<style scoped>
.closeButton
{

}
</style>
