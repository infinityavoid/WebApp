<template>
    <div class="item">
        {{Product_data.name}}
        {{Product_data.price}}р
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
    flex-direction: column;
}
</style>
