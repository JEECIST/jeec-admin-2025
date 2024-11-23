<template>
    <div class="background">
      <div class="popup-container">
        <div class="header">Edit Location</div>
        <button class="btn_close" @click="closePopup">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4f4f4f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div class="content">
          <div class="row">
            <div class="col">
              <label for="name">Name</label>
              <input type="text" v-model="name" />
            </div>
            <div class="col">
              <label for="priority">Priority</label>
              <input type="text" v-model="priority" />
            </div>
          </div>
          <div class="end_btn">
            <button class = "btn_edit" @click="closePopup">Edit</button> <!-- function to add and save info v-model -->
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const emit = defineEmits(['close'])
  
  function closePopup() {
    emit('close');
  }
  
  const props = defineProps({
    foo: String
  })
  
  const name = ref('');
  const priority = ref('');
  
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
    gap: 20px;
  }
  
  .col {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  
  label {
    font-size: 1em;
    color: #4f4f4f;
    font-weight: 500;
    margin-bottom: 5px;
  }
  
  input[type="text"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1em;
    color: #4f4f4f;
  }
  
  .end_btn {
    position: absolute; /* Altere para position: absolute */
    bottom: 40px; /* Alinhe com a margem inferior */
    right: 40px; /* Alinhe com a margem direita */
    display: flex;
    justify-content: flex-end;
    width: auto;
  }
  
  .btn_edit {
    background-color: #1a2e4e;
    color: #ffffff;
    padding: 10px 20px;
    font-size: 1em;
    font-weight: 400;
    font-family: 'Kumbh Sans', sans-serif;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn_add:hover {
    background-color: #162742;
  }
  
  </style>