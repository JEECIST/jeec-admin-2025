<template>
    <div class="table">
        <form>
            <div class="search_style">
                <label>
                    <img src="../../assets/search.svg">
                </label>
                <input v-model="message" placeholder="Search for a user" />
            </div>
        </form>
        <TheTable :data="data" :tableHeaders="tablePref" :searchInput="message">
        </TheTable>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import TheTable from '../../global-components/TheTable.vue';

const data = ref([])

const tablePref = {
    id: "ID",
    username: "Username",
    team: "Team",
    taskCount: "#Tasks",
};

function fetchCounters() {
    axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/count-tasks-for-each-person', {
        auth: {
            username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
            password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }
    }).then(response => {
        console.log(response.data)
        data.value = response.data.userTaskCounts
    })
}


onMounted(() => {
    fetchCounters();
});

</script>

<style scoped>
.table {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 3ch;
    padding-right: 3ch;
}

form {
    display: flex;
    height: 50px;
    line-height: 50px;
    align-items: center;
    gap: 3ch;
    padding-left: 1ch;
    border-radius: 10px;
}

.search_style {
    display: flex;
    background-color: var(--c-accent);
    height: 50px;
    line-height: 50px;
    align-items: center;
    gap: 1ch;
    padding-left: 1ch;
    border-radius: 6px;
    width: 60%;
}

.search_style>label>img {
    width: 20px;
    position: relative;
    top: 4px;
    left: 3px;
}

.search_style>input {
    appearance: none;
    background-color: transparent;
    border: 0px;
    color: var(--c-ft-semi-light);
    font-style: inherit;
    font-variant: inherit;
    font-weight: inherit;
    font-stretch: inherit;
    line-height: inherit;
    font-family: inherit;
    font-size-adjust: inherit;
    font-kerning: inherit;
    font-optical-sizing: inherit;
    font-language-override: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    font-size: 1rem;
    height: 100%;
    outline: none;
    padding: 0px 0px 0px 8px;
    width: 100%;
}

.search_style input::placeholder {
    color: var(--c-ft-semi-light);
}
</style>
