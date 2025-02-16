<script setup>
import { defineProps, defineEmits, ref } from "vue";
import EditSpeakerTypePopup from './EditSpeakerTypePopup.vue';
import ListSpeakerTypePopup from "./ListSpeakerTypePopup.vue";

const props = defineProps({
    isOpen: Boolean,
});

const emit = defineEmits(["modal-close"]);

const isOtherModalOpened = ref(false);

const openOtherModal = () => {
    isOtherModalOpened.value = true;
};
const closeOtherModal = () => {
    isOtherModalOpened.value = false;
};


const isAnotherModalOpened = ref(false);

const openAnotherModal = () => {
  isAnotherModalOpened.value = true;
};
const closeAnotherModal = () => {
  isAnotherModalOpened.value = false;
};

</script>

<template>
    <div v-if="isOpen" class="modal-mask">
        <div class="right-popup-placeholder-mobile">
            <div class="items">
                <div class="speaker-photo">Insert Speaker Photo</div>
                <h3 class="text1">Speaker Type</h3>
                <p class="text2 title">Speaker Type</p>
                <div class="btns-row">
                    <ListSpeakerTypePopup :isOpen="isAnotherModalOpened" @modal-close="closeAnotherModal"></ListSpeakerTypePopup>
                    <Transition name="fade" appear>
                        <EditSpeakerTypePopup :isOpen="isOtherModalOpened" @modal-close="closeOtherModal">
                        </EditSpeakerTypePopup>
                    </Transition>
                    <button class="btn" @click="openOtherModal">
                        <img src="../../assets/pencil.svg">
                    </button>
                    <button class="btn" @click="openAnotherModal">
                        <img src="../../assets/mic.svg">
                    </button>
                    <button class="btn">
                        <img src="../../assets/trash.svg">
                    </button>
                </div>
                <div id="info">
                    <div class="row">
                        <div class="col item1">
                            <p>Priority</p>
                            <p class="text2">3</p>
                        </div>
                        <div class="col item2">
                            <p># Speakers</p>
                            <p class="text2">9</p>
                        </div>
                        <div class="col item3">
                            <p>Show in Website</p>
                            <p class="text2">Yes</p>
                        </div>
                        <div class="col item4">
                            <p>Social Media</p>
                            <p class="text2">Yes</p>
                        </div>
                        <div class="col item5">
                            <p>Exclusive Video</p>
                            <p class="text2">No</p>
                        </div>
                        <div class="col item6">
                            <p>Exclusive Posts</p>
                            <p class="text2">No</p>
                        </div>
                    </div>
                </div>
                <button class="close" @click.stop="emit('modal-close')"> Close </button>
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

.right-popup-placeholder-mobile {
    width: 90.5vw;
    height: 88vh;
    border-radius: 30px;
    background-color: var(--c-accent);
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;

}

.items {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 6vh;
}

.speaker-photo {
    height: 165px;
    width: 165px;
    background-color: var(--c-select);
    border-radius: 100%;
    display: flex;
    align-items: center;
    text-align: center;
    color: white;

}

.text1 {
    color: black;
    font-size: x-large;
}

.text2 {
    color: var(--c-ft-semi-light);
}

.title {
    font-size: larger;
    font-weight: 550;
}

.row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 30px;
    width: 300px;
    margin-left: 0px;
}

.col {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

#info {
    margin-left: 0vw;
    ;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 30px;
}

.btns-row {
    display: flex;
    flex-direction: row;
    gap: 15px;
}

.btn {
    width: 36px;
    height: 36px;
    background: #FFFFFF;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}

button {
    outline: none;
    border: none;
    cursor: pointer;
}
</style>