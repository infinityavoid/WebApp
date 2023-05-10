<template>
    <div class="item">
        <label>{{Product_data.name}}</label>
        <label>{{Product_data.price}}р</label>
    </div>
</template>

<script>
export default {
    data(){
        return {
        
        } 
    },
    props:{Product_data:Object}
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
</style>
