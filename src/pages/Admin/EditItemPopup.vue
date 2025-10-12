<template>
  <div class="background">
    <div class="popup-container">
      <div class="header">Edit Item</div>
      <button class="btn_close" @click="closePopup">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4f4f4f"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div class="content">
        <div class="row">
          <div class="col">
            <label for="name">Name</label>
            <input id="name" type="text" v-model="name" />
          </div>
          <div class="col">
            <label for="quantity">Quantity</label>
            <input id="quantity" type="number" min="0" v-model="quantity" />
          </div>
        </div>
        <div class="end_btn">
          <button class="btn_edit" @click="editItem">Edit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, watch , onMounted } from "vue";

const emit = defineEmits(['close','itemEdited'])

function closePopup() {
    emit('close');
}

const props = defineProps({
    selectedItem: Object,
    foo: String
})

const oldName = props.selectedItem.name;
const name = ref("");
const quantity = ref(0);

watch(() => props.selectedItem, (newVal) => {
    if (newVal) {
        name.value = newVal.name || "";
        quantity.value = newVal.priority || "";
        
    }
}, { immediate: true });

function editItem(){
    if (!name.value.trim()) {
        console.error("Name can not be empty.");
        return;
    }

    const itemData = {
        oldName: oldName,
        name: name.value,
        quantity: quantity.value,
    };

    axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + `/inventory/edit-item`, itemData, {
        auth: {
            username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
            password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
        },
    })
    .then(() => {
        console.log("Item edited successfully!");
        emit("itemEdited", itemData)
        emit("close");
    })
    .catch(error => {
        console.error("Error editing item:", error.response?.data || error);
    });
}

</script>

<style scoped>
.background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.popup-container {
    width: 1100px;
    min-height: 700px;
    background-color: white;
    border-radius: 5px;
    padding: 30px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    position: relative;
    margin: 0px 20px;
}

.header {
    font-size: 1.5em;
    font-weight: 600;
    color: #4f4f4f;
    margin-top: 20px;
    margin-left: 30px;
    margin-right: 20px;
    margin-bottom: 40px;
}

.btn_close {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    cursor: pointer;
}

.content {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.row {
    display: flex;
    justify-content: space-between;
    gap: 30px;
}

.col {
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1;
}

label {
    font-size: 1em;
    color: #4f4f4f;
    font-weight: 500;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1em;
    margin-top: -20px;
    color: #4f4f4f;
}

select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1em;
    margin-top: -20px;
    color: #4f4f4f;
    background-color: white;
}

select:focus {
    outline: none;
    border-color: #aaa;
}

.option-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.option-group label {
    font-size: 14px;
    color: #4f4f4f;
}

.radio-group {
    display: flex;
    gap: 15px;
}

.radio-group label {
    font-size: 14px;
    color: #4f4f4f;
}

.end_btn {
    position: absolute;
    /* Altere para position: absolute */
    bottom: 40px;
    /* Alinhe com a margem inferior */
    right: 40px;
    /* Alinhe com a margem direita */
    display: flex;
    justify-content: flex-end;
    width: auto;
}

.btn_edit {
    background-color: #1a2e4e;
    color: #ffffff;
    padding: 10px 30px;
    font-size: 1em;
    font-weight: 400;
    font-family: 'Kumbh Sans', sans-serif;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn_edit:hover {
    background-color: #162742;
}
</style>