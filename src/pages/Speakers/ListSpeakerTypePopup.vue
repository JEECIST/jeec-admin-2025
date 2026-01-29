<!-- FEITO -->

<script setup>
import { defineProps, defineEmits, ref, onMounted, onUnmounted, watch} from "vue";
import axios from 'axios';

const props = defineProps({
  isOpen: Boolean,
  stype: Object
});

const emit = defineEmits(["modal-close"]);
const data = ref([]);

/* mobile screen detection and adjustment */
const isMobile = ref();
function updateIsMobile() { isMobile.value = window.innerWidth <= 800; }
onMounted(() => { 
  updateIsMobile();
  window.addEventListener('resize', updateIsMobile); });
onUnmounted(() => { window.removeEventListener('resize', updateIsMobile); });

async function fetchData() {
  axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/stypes_list_vue', {
    params: {
      type_id: props.stype.id
    },
    auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }
  }).then((response) => {
    data.value = response.data.speakers
      .filter(speaker => speaker !== null)
      .map(speaker => {
        return speaker;
      });
  }).catch((error) => {
    console.log(error);
  });
};

watch(() => props.stype, (newStype) => {
  if (newStype && newStype.id) {
    fetchData(newStype.id);
  }
}, { immediate: true });
</script>

<template>
  <div v-if="isOpen" class="modal-mask">
    <div :class="{'desktop' : !isMobile, 'mobile' : isMobile}">
      <div :class="{'wrapper' : !isMobile, 'mobile-wrapper' : isMobile}">
        <div class="popup-wrapper">
          <div class="header">
            <h1>{{ stype.name }} Speakers</h1>
            <button :class="{'close' : !isMobile, 'mobile-close' : isMobile}" @click.stop="emit('modal-close')">X</button>
          </div>
          <div class="grid-wrapper">
            <div class="table-wrapper">
              <div v-for="(speaker, index) in data" :key="index" class="speaker">
                <span> {{ speaker.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.425);
}


.wrapper {
  display: flex;
  justify-content: center;
  background-color: white;
  width: 60vw;
  height: 70%;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  border-radius: 15px;
  overflow-y: auto;
  overflow-x: hidden;
}

.mobile-wrapper {
    display: flex;
    justify-content: center;
    background-color: white;
    width: 100%;
    height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    border-radius: 15px;
    overflow-y: auto;
    overflow-x: hidden;
    border-radius: 15px;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.popup-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

h1 {
  margin-top: 3%;
  margin-bottom: 60px;
  word-spacing: 7px;
  color: #515151;
}

.flex-1,
h1 {
  display: flex;
  flex-direction: column;
  margin-left: 5%;
  margin-right: 15%;
  gap: 1.5vh;
}

.mobile-table-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: 70vw;
  margin-top: 4%;
}

.grid-wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
}

.table-wrapper {
  width: 80%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding-bottom: 5%;
}

.speaker {
  background-color: var(--c-accent);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  font-size: 20px;
  text-align: center;
}

.speaker:nth-child(4n+1),
.speaker:nth-child(4n+2) {
  background-color: white;
}

.close {
  background-color: #152259;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  width: 2vw;
  height: 3.5vh;
  margin-bottom: 3%;
  margin-top: 2%;
  margin-right: 2%;
}

.mobile-close {
    background-color: #152259;
    color: white;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    width: 9.5vw;
    height: 3.5vh;
    margin-top: 4%;
    margin-right: 2%;
}

span {
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>