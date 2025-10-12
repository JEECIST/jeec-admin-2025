<template>
    <div class="inventory">
        <div :class="['content', { 'shrink': selectedItem }]">
            <div class="header">
                <div class="search-container">
                    <img class="search-icon" src="../../assets/search.svg">
                    <input type="text" placeholder="Search for an item" class="search-bar" v-model="searchQuery" />
                </div>
                <button class="btn-header" @click="popup_additem">Add Item</button>
            </div>
            <div class="table-container" v-if="filteredInv.length > 0">
                <TheTable :data="database_inv" :tableHeaders="tableHeaders" :searchInput="searchQuery"
                    @onRowSelect="selectItem"></TheTable>
            </div>
            <div v-if="filteredInv.length === 0" class="no-inv">
                No item found
            </div>
        </div>
        <AddItemPopup v-if="isadditem" @close="popup_additem" @itemAdded="fetchData"></AddItemPopup>
        <div class="right-popup-placeholder" v-if="selectedItem && filteredInv.length > 0">
            <button class="btn_close_rpp" @click="close_rpp">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none"
                    stroke="#4f4f4f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-x">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <div class="items">
                <div class="row">
                    <h1 class="item-title">{{ selectedItem.name }}</h1>
                </div>
                <div class="row">
                    <input type="number" laceholder="Number of items" class="input-item" min="0" v-model="changed_quantity"></input>
                </div>
                <div class="row">
                    <button class="item-button remove" @click="edit_quantity(selectedItem.name, 0)">Remove</button>
                    <button class="item-button add" @click="edit_quantity(selectedItem.name, 1)">Add</button>
                </div>
                <div class="row">
                    <button class="edit-btn" @click="delete_item(selectedItem.name)">
                        <img src="../../assets/trash.svg">
                    </button>
                    <button class="edit-btn" @click="popup_edititem">
                        <img src="../../assets/pencil.svg">
                    </button>
                </div>
            </div>
            <EditItemPopup v-if="isedititem" :selectedItem="selectedItem" @close="popup_edititem" @itemEdited="fetchData"></EditItemPopup>
        </div>
    </div>
</template>

<script setup>

import TheTable from '../../global-components/TheTable.vue';
import { ref, computed , onMounted } from 'vue';
import  axios from 'axios';
import AddItemPopup from './AddItemPopup.vue';
import EditItemPopup from './EditItemPopup.vue';

const emit = defineEmits(['close'])

const searchQuery = ref('');
const selectedItem = ref();
const isadditem = ref(false);
const isedititem = ref(false);
const changed_quantity = ref(0);

const tableHeaders = {
    name: 'Item Name',
    quantity: 'Quantity',
}

const database_inv = ref([
    {
        name: null,
        quantity: null,
    }
])

const fetchData = () => {
    axios
        .get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/inventory/get-items', {
            auth: {
                username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
                password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
            },
        })
        .then((response) => {
            const data = response.data;
            console.log(data)
            database_inv.value = data.items.map((item) => ({
                name: item.name,
                quantity: item.quantity,
            }));
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
};
onMounted(fetchData)

function edit_quantity(name, action) {
    let quantity = changed_quantity.value;
    if (quantity <= 0) {
        console.error("Quantity must be a positive number.");
        return;
    }

    if (action === 0) { // Remove
        if (selectedItem.value.quantity - quantity < 0) {
            console.error("Resulting quantity cannot be negative.");
            return;
        }
        quantity = -quantity;
    }

    const itemData = {
        name: name,
        changed_quantity: quantity,
    };

    axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + `/inventory/update-item`, itemData, {
        auth: {
            username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
            password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
        },
    })
        .then(() => {
            console.log("Item updated successfully!");
            fetchData();
            selectedItem.value = null;
            changed_quantity.value = 0;
        })
        .catch(error => {
            console.error("Error updating item:", error.response?.data || error);
        });
}

function delete_item(name) {
    const itemData = {
        name: name,
    };

    axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + `/inventory/delete-item`, itemData, {
        auth: {
            username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
            password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
        },
    })
        .then(() => {
            console.log("Item deleted successfully!");
            fetchData();
            selectedItem.value = null;
        })
        .catch(error => {
            console.error("Error deleting item:", error.response?.data || error);
        });
}

function selectItem(row) {
    selectedItem.value = row;
}

function close_rpp() {
    selectedItem.value = null;
    changed_quantity.value = 0;
}

function popup_additem() {
    isadditem.value = !isadditem.value;
}

function popup_edititem() {
    isedititem.value = !isedititem.value;
}

const filteredInv = computed(() => {
    if (!searchQuery.value) {
        return database_inv.value
    }

    const filtered = database_inv.value.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );

    // Se não houver resultados na busca, limpar o selectedType
    if (filtered.length === 0) {
        selectedItem.value = null;
    }

    //   if (isMobile.value) {
    //     // Mostrar apenas algumas informações no modo mobile
    //     return filtered.map(({ name, number_act, location }) => ({ name, number_act, location }));
    //   }

    return filtered;
});


</script>

<style scoped>
.inventory {
    display: flex;
    width: calc(200dvh - var(--sidebar-width));
    background: #FFFFFF;
    height: calc(100vh - var(--header-height));
    overflow: hidden;
    box-sizing: border-box;
    padding: 50px 3ch 3ch 3ch;
}

.content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
}

.content.shrink {
    flex-grow: 0.7;
    width: calc(100% - 390px);
}

.header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 2vw;
    margin-bottom: 10px;
    color: #8A8A8A;
}

.search-container {
    display: flex;
    align-items: center;
    position: relative;
    min-width: 30%;
    height: 3.5rem;
    background-color: #EBF6FF;
    border-radius: 0.5rem;
    flex-grow: 1;
}

.search-icon {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    width: 1rem;
    height: 1.5rem;
    color: #8A8A8A;
}

.search-bar {
    width: 100%;
    height: 100%;
    padding: 0.5rem 1rem 0.5rem 3rem;
    border: none;
    border-radius: 0.5rem;
    color: #8A8A8A;
    font-family: 'Kumbh Sans', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    background-color: #EBF6FF;
}

.btn-header {
    width: 9rem;
    height: 90%;
    align-self: center;
    border: none;
    border-radius: 0.5rem;
    outline-color: var(--c-select);
    font-family: 'Kumbh Sans', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: #FFFFFF;
    background-color: var(--c-select);
    padding: 0.3rem 1rem;
    cursor: pointer;
}

.table-container {
    flex-grow: 1;
    transition: flex-grow 0.3s ease;
    margin-top: 1vh;
    overflow-y: auto;
}

.no-inv {
    width: 100%;
    height: 95%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Kumbh Sans', sans-serif;
    font-size: 28px;
    font-weight: 600;
    color: #4F4F4F;
    background-color: #EBF6FF;
    border-radius: 2vh;
    margin-top: 2vh;
}

.right-popup-placeholder {
    display: flex;
    flex-direction: column;
    height: calc(92vh - var(--header-height));
    width: 380px;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: -10px;
    border-radius: 10px;
    background-color: var(--c-accent);
    overflow-y: auto;
    padding: 15px;
}

.btn_close_rpp {
    align-self: flex-end;
    position: relative;
    background: none;
    border: none;
    cursor: pointer;
}

.items {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 10%;
}

.edit-btn {
    margin-top: 30px;
    width: 36px;
    height: 36px;
    background: #FFFFFF;
    border-radius: 8px;
    border-color: #FFFFFF;
    cursor: pointer;
}

.row {
    display: flex;
    width: 80%;
    flex-direction: row;
    justify-self: flex-start;
    gap: 12px;
    align-items: center;
    justify-content: center;
}

.item-title {
    margin-bottom: 30px;
}

.input-item {
    width: 100%;
    height: 3rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    font-family: 'Kumbh Sans', sans-serif;
    font-size: 1rem;
    font-weight: 500;
}

.item-button {
    width: 100%;
    height: 3rem;
    border: none;
    border-radius: 0.5rem;
    outline-color: var(--c-select);
    font-family: 'Kumbh Sans', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: #FFFFFF;
    background-color: var(--c-select);
    padding: 0.3rem 1rem;
    cursor: pointer;
}

.item-button.remove {
    background-color: #EB5757;
}

.item-button.add {
    background-color: #27AE60;
}
</style>