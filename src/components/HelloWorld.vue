<template>
  <div @click="aboba" class="hello">
    dasdasdas
    <button @click="close"></button>
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

</style>
