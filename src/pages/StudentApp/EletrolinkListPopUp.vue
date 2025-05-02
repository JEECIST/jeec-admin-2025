<script setup>
import TheTable from '../../global-components/TheTable.vue';
import { defineProps, defineEmits, ref } from "vue";

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["modal-close"]);

function isMobile() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return true;
  }
  else {
    return false;
  }
}

const message = ref();

function selectCallback(row) {
  console.log(row)
  popupShow.value = true;
}

const datab = [
  {
    name: "Paulo Martins",
    nameother: "André Gay"
  },
  {
    name: "Paulo Martins",
    nameother: "André Gay"
  },
  {
    name: "Paulo Martins",
    nameother: "André Gay"
  },
  {
    name: "Paulo Martins",
    nameother: "André Gay"
  },
  {
    name: "Paulo Martins",
    nameother: "André Gay"
  },
  {
    name: "Paulo Martins",
    nameother: "André Gay"
  },

];

const tablePref = {
  name: "",
  username: "", 
};

</script>

<template>
  <div v-if="isOpen" class="modal-mask">
    <div class="desktop" v-if="!isMobile()">
      <div class="wrapper">
        <div class="popup-wrapper">
          <div class="header">
            <h1>Alumni Speakers</h1>
            <button class="close" @click.stop="emit('modal-close')">X</button>
          </div>
          <div class="table-wrapper">
            <TheTable :data="datab" :tableHeaders="tablePref" :searchInput="message" @onRowSelect="selectCallback">
            </TheTable>
          </div>
        </div>
      </div>
    </div>


    <div class="mobile" v-else>
      <div class="mobile-wrapper">
        <div class="popup-wrapper">
          <div class="ihatedivs">
            <h1>Alumni Speakers</h1>
            <div class="mobile-table-wrapper">
              <TheTable :data="datab" :tableHeaders="tablePref" :searchInput="message" @onRowSelect="selectCallback">
              </TheTable>
              <button class="mobile-add" @click.stop="emit('modal-close')">Close</button>
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


.mobile-wrapper {
  display: flex;
  justify-content: center;
  background-color: white;
  width: 90.5vw;
  height: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
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
  justify-content: space-between;
}

h1 {
  margin-bottom: 3%;
  margin-top: 6%;
  color: #515151;
}

.flex-1,
h1 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

.table-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: 50vw;
  padding-top: 5%;
}

.mobile-add {
  background-color: #152259;
  color: white;
  border-radius: 5px;
  border: none;
  margin-right: -2vw;
  margin-top: 15%;
  margin-bottom: 2%;
  display: flex;
  margin-left: auto;
  width: 20vw;
  height: 3.5vh;
  align-items: center;
  justify-content: center;
  gap: 10vh;
  cursor: pointer;
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
</style>