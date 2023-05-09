<template>
  <div @click="aboba" class="hello">
    dasdasdas
    <button class="closeButton" @click="close"></button>
    <h3>{{window.Telegram.WebApp.initDataUnsafe?.user?.username}}</h3>
  </div>
</template>

 

<script>
const tg = window.Telegram.WebApp
export default {
  data(){
        return {

        } 
    },
    methods:
    {
      aboba()
      {
        console.log(tg)
      },
      close()
      {
        tg.close()
      }
    }
}

</script>

<style scoped>
.closeButton
{

}
</style>
