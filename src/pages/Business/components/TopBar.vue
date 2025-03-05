<script setup>
const emit = defineEmits(['toggle-add-modal', 'go-to-tiers','refresh-companies']);
const message = defineModel('message')

const props = defineProps({
    events:{
        type: Array,
    },
});

</script>

<template>
  <form>
    <div class="first-div">
        <div class="search_style">
            <label>
                <img src="../../assets/search.svg">
            </label>
            
            <input v-model="message" placeholder="Search for a company" />
        </div>
        
        <select class="select" v-model="selectedEvent" @change="filterByEvent">
            <option v-for="event in events" :key="event.id" :value="event.id">
                {{ event.name }}
            </option>
        </select>
    </div>
    
    <div class="buttons-div">
        <button type="button" @click="emit('toggle-add-modal')" >Add Company</button>
        <!-- <button type="button" @click="emit('refresh-companies')" > Company Tiers <span class = "chevron"> </span></button> -->
        <button type="button" @click="()=>$router.push('/business/companies/tiers')" > Company Tiers <span class = "chevron"> </span></button>
    </div>
</form>
</template>

<style scoped>
@import '../companies.css'

</style>