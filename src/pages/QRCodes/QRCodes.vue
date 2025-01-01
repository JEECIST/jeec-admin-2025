<template>
  <div class="wrapper">
    <div v-if="!QR_enable" class="table">
      <form>
        <div class="search_style">
          <label>
            <img src="../../assets/search.svg">
          </label>
          <input v-model="message" placeholder="Search for a user" />
        </div>
      </form>
      <TheTable :data="QR_Activities" :tableHeaders="tablePref" :searchInput="message" :buttons="tableButtons"
        @QrRead="activateReader">
      </TheTable>
    </div>
    <!-- <div v-if="QR_enable">
      <QrcodeStream @decode="onDecode" @init="onInit" @error="onError"></QrcodeStream>
    </div> -->
  </div>
</template>

<script setup>
import TheTable from '../../global-components/TheTable.vue';
import { ref, onMounted } from 'vue';
import qrImage from '../../assets/pages/qrcodes.svg';
import axios from 'axios';
import { QrcodeStream } from 'vue-qrcode-reader';

const QR_Activities = ref([]);

const QR_enable = ref(false);


const datab = ref([
  {
    id: "1",
    name: "Workshop Delloite",
    time: "11:00",
    end_time: "12:00",
    outra: "coisa aleatoria",
  },
  {
    id: "2",
    name: "Main Speaker - Wagas",
    time: "12:00",
    end_time: "13:00",
    outra: "coisa aleatoria",
  },
]);

const tablePref = {
  id: "ID",
  name: "Activity",
  time: "Start",
  end_time: "End",
};

const tableButtons = [{
  name: "QR Reader",
  eventName: "QrRead",
  icon: qrImage
}];

function activateReader() {
  console.log("Activating QR Reader");
  QR_enable.value = !QR_enable.value;
};

function onDecode(content){
  console.log("QR Code Content:", content);
}

function onInit(promise) {
  promise.catch(error => {
    console.error("Could not initialize the QR scanner:", error);
  });
}

function onError(error) {
  console.error("QR  Scanner Error:", error);
}

onMounted(() => {
  console.log("Entrou!")
  axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL+'/activities_vue_for_qr', {auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
      }}).then(response => {
    console.log(response.data)
    QR_Activities.value = response.data.activities
    console.log(QR_Activities)
  })
});

</script>

<style scoped>
.wrapper {
  display: flex;
  position: relative;
  height: calc(100dvh - var(--header-height));
  padding: 5ch 3ch 3ch 3ch;
  overflow-y: hidden;
}

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