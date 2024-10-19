<script setup>
import TheTable from '../../global-components/TheTable.vue';
import { defineProps, defineEmits, ref } from "vue";

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["modal-close"]);

function isMobile() {
   if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
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
  },
  {
    name: "Paulo Martins",
  },
  {
    name: "Paulo Martins",
  },
  {
    name: "Paulo Martins",
  },
  {
    name: "Paulo Martins",
  },
  {
    name: "Paulo Martins",
  },

]; 

const tablePref = {
  name: "",
};

</script>

<template>
    <div v-if="isOpen" class="modal-mask">
      <div class="desktop" v-if="!isMobile()">
        <div class="wrapper-wrapper">
            <div class="popup-wrapper">
                <div class="ihatedivs">
                    <h1>Alumni Speakers</h1>
                    <div class="table-wrapper">
                      <TheTable
                        :data="datab"
                        :tableHeaders="tablePref"
                        :searchInput="message"
                        @onRowSelect="selectCallback"
                      ></TheTable>
                      <button class="add" @click.stop="emit('modal-close')">Close</button>
                    </div>
                </div>
            </div>
        </div>
      </div>


      <div class="mobile" v-else>
        <div class="mobile-wrapper-wrapper">
            <div class="popup-wrapper">
                <div class="ihatedivs">
                    <h1>Alumni Speakers</h1>
                    <div class="mobile-table-wrapper">
                      <TheTable
                        :data="datab"
                        :tableHeaders="tablePref"
                        :searchInput="message"
                        @onRowSelect="selectCallback"
                      ></TheTable>
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

.mobile-wrapper-wrapper {
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

.wrapper-wrapper {
    display: flex;
    justify-content: center;
    background-color: white;
    width: 60vw;
    height: 70%;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    overflow-y: auto;
    overflow-x: hidden;
}

.popup-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
}

h1 {
    margin-bottom: 3%;
    margin-top: 6%;
    color: #515151;
}

.flex-1, h1 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 5%;
    margin-right: 15%;
    gap: 1.5vh;
}

.ihatedivs {
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  margin-top: 4%;
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

.add {
    background-color: #152259;
    color: white;
    border-radius: 5px;
    border: none;
    margin-right: -2vw;
    margin-top: 15%;
    margin-bottom: 2%;
    display: flex;
    margin-left: auto;
    width: 8.4vw;
    height: 3.5vh;
    align-items: center;
    justify-content: center;
    gap: 10vh;
    cursor: pointer;
}
</style>