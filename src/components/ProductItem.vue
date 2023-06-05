<template>
    <div class="item">
        <label>{{Product_data.name}}</label>
        <img v-if="Product_data.image" :src="Product_data.image" alt="Img">
        <label>{{Product_data.price}}р</label>
        <button @click="add()" class="addButton">Добавить</button>
    </div>
</template>

<script>
export default {
    data(){
        return {
        } 
    },
    props:{Product_data:Object,categoryId:Number},
    methods:{
        add()
        {
            let prod = {
                id:this.Product_data.id,
                name:this.Product_data.name,
                price:this.Product_data.price,
                image:this.Product_data.image,
                quantity:1,
                categoryId:this.categoryId,
                composition:this.Product_data.composition,
                size:this.isPizza()
            }
            /*this.$store.dispatch('add', prod)
            this.IsOrderCompleteted()
            //this.$router.push('/Detail')*/
            this.$store.dispatch('showdetail', prod)
        },
        isPizza()
        {
            if(this.categoryId === 5)
            {
                return 2
            }
            else return 0
        }
    },
    computed:{
    allProducts(){
      return this.$store.getters.AllInfo  
    },
},
}
</script>

<style scoped>

.item
{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100px;
    height: 200px;
    margin-bottom: 10px;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: 15px;
}
.addButton
{
    border: none;
    background: rgb(248, 168, 24);
    border-radius: 10px;
    color: #fff;
    text-transform: uppercase;
    font-weight: 700;
    height: 30px;
    cursor: pointer;
}
</style>
