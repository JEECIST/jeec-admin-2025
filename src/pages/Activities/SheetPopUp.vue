<template>
    <div class="background">
        <div class="popup-container">
            <div class="header">{{ typeName }} Activities</div>
            <button class="btn_close" @click="closePopup">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none"
                    stroke="#4f4f4f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-x">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <div class="content">
                <TheTable 
                :data="database_names"
                :tableHeaders="tableHeaders" 
                :isSelectable="false"></TheTable>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref , onMounted} from "vue";
import TheTable from "../../global-components/TheTable.vue";
import axios from 'axios';

const database_names = ref([
    {
    name1: null,
    name2: null,
    }
]);

const tableHeaders = {
    name1: "",
    name2: ""
};

const emit = defineEmits(['close'])

function closePopup() {
    emit('close');
}

const props = defineProps({
    foo: String,
    typeName: {
        type: String,
        default: '', // Valor padrão, caso nenhum nome seja passado
    },
})

const fetchData = () => {
  axios
    .post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/activities/types/sheet', {typename: props.typeName}, {
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
      },
    })
    .then((response) => {
      const data = response.data.activities;

      let formattedData = [];

      for (let i = 0; i < data.length; i += 2) {
        formattedData.push({
          name1: data[i]?.name || "", // Se existir, coloca em name1
          name2: data[i + 1]?.name || "", // Se existir, coloca em name2
        });
      }

      // Atualiza a variável reativa
      database_names.value = formattedData;
    })
    .catch((error) => {
      console.error('Erro ao buscar os dados:', error);
    });
};

onMounted(fetchData)

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
}

.btn_close {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    cursor: pointer;
}

::v-deep(.content table td) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}

</style>