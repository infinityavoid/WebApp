<template>
    <div class="item">
        <label>{{Product_data.name}}</label>
        <label>{{Product_data.price}}р</label>
        <img v-if="Product_data.image" :src="Product_data.image" alt="Img">
        <div v-if="allProducts.orderItems.findIndex(item => item.id === Product_data.id) != -1">
            <button @click="del()" class="minusButton">-</button>
            <label class="quantityLabel">{{ allProducts.orderItems[allProducts.orderItems.findIndex(item => item.id === Product_data.id)].quantity }}</label>
            <button @click="add()" class="plusButton">+</button>
        </div>
        <button v-else @click="add()" class="addButton">Добавить</button>
    </div>
</template>

<script>
export default {
    data(){
        return {
        } 
    },
    props:{Product_data:Object},
    methods:{
        add()
        {
            /*let prod = {
                id:this.Product_data.id,
                name:this.Product_data.name,
                quantity:1,
                price:this.Product_data.price
            }
            this.$store.dispatch('add', prod)
            this.IsOrderCompleteted()*/
            //this.$router.push('/Detail')
            this.$store.dispatch('showdetail')
        },
        del()
        { 
            this.$store.dispatch('del', this.Product_data.id)
            this.IsOrderCompleteted()
        },
        IsOrderCompleteted()
        {
            this.$store.dispatch('showhide')
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
.minusButton
{
    pointer-events: auto;
    transform: scale3d(1, 1, 1);
    background-color: #e64d44;
    transition: transform var(--animation), visibility var(--animation);
    width: 38px;
    height: 30px;
    color: #fff;
    outline: none;
    border: none;
    text-transform: uppercase;
    display: inline-block;
    font-family: var(--default-font);
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    padding: 6px 16px;
    height: 30px;
    border-radius: 7px;
    box-sizing: border-box;
    cursor: pointer;
}
.plusButton
{
    width: 38px;
    display: inline-block;
    font-family: var(--default-font);
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    padding: 6px 16px;
    height: 30px;
    border-radius: 7px;
    box-sizing: border-box;
    background-color: #f8a917;;
    text-transform: uppercase;
    color: #fff;
    outline: none;
    border: none;
    cursor: pointer;
}
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
