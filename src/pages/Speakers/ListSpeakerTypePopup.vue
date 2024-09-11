<script setup>
import TheTable from '../../global-components/TheTable.vue';
import { defineProps, defineEmits, ref } from "vue";

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["modal-close"]);

const message = ref();

function selectCallback
(row) {
  console.log(row)
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

};

</script>

<template>
    <div v-if="isOpen" class="modal-mask">
        <div class="wrapper-wrapper">
            <div class="popup-wrapper">
                <div class="ihatedivs">
                    <h1>Alumni Speakers</h1>
                    <TheTable
                        :data="datab"
                        :tableHeaders="tablePref"
                        :searchInput="message"
                        @onRowSelect="selectCallback"
                    ></TheTable>
                </div>
                <button class="add" @click.stop="emit('modal-close')">Close</button>
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
}

.popup-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
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

.add {
    background-color: #152259;
    color: white;
    border-radius: 5px;
    border: none;
    margin-right: 3vw;
    margin-top: 13%;
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