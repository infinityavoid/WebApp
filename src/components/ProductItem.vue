<template>
    <div class="item">
        <label>{{Product_data.name}}</label>
        <label>{{Product_data.price}}р</label>
        <div v-if="allProducts.orderItems.findIndex(item => item.id === Product_data.id) != -1">
            <button @click="del()">-</button>
            <label >{{ allProducts.orderItems[Product_data.id].quantity }}</label>
            <button @click="add()">+</button>
        </div>
        <button v-else @click="add()" class="addButton">Добавить</button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            quantity:'',
            alreadyExists:false,
        } 
    },
    props:{Product_data:Object},
    methods:{
        add()
        {
            let prod = {
                id:this.Product_data.id,
                name:this.Product_data.name,
                quantity:1,
                price:this.Product_data.price
            }
            this.$store.dispatch('add', prod)
            let a = this.allProducts.orderItems.findIndex(item => item.id === this.Product_data.id)
            if(a === -1)
            {
                this.alreadyExists = false
            }
            else{this.alreadyExists = true}
            this.quantity = this.allProducts.orderItems[a].quantity
            this.IsOrderCompleteted()
        },
        del()
        { 
            let a = this.allProducts.orderItems.findIndex(item => item.id === this.Product_data.id)
            this.$store.dispatch('del', this.Product_data.id)
            try
            {
                this.quantity = this.allProducts.orderItems[a].quantity 
            }
            catch(e){this.alreadyExists = false}
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
.item
{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
    box-shadow: 0 0 8px 0 #e0e0e0;
    border: 1px solid var(--tg-theme-button-color);
    padding: 15px;
}
.addButton
{
    color: var(--tg-theme-bg-color);
}
</style>
