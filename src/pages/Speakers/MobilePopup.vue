<script setup>
import { defineProps, defineEmits, ref } from "vue";

const props = defineProps({
    isOpen: Boolean,
});

const emit = defineEmits(["modal-close"]);


</script>

<template>
    <div v-if="isOpen" class="modal-mask">
        <div class="right-popup-placeholder-mobile">
            <div class="items">
                <h1>SPEAKER TYPE</h1>
                <div class="speaker-photo">Insert Speaker Photo</div>
                <h3 class="text1">Speaker Name</h3>
                <p class="text2 title">Speaker</p>
                <div class="btns-row">
                    <button class="btn" @click="openOtherModal">
                        <img src="../../assets/pencil.svg">
                    </button>
                    <button class="btn" @click="showfunction">
                        <img src="../../assets/sheet.svg">
                    </button>
                    <button class="btn">
                        <img src="../../assets/linkedin.svg">
                    </button>
                    <button class="btn">
                        <img src="../../assets/trash.svg">
                    </button>
                </div>
                <div id="info">
                    <p>Company</p>
                    <p class="text2">Intel</p>
                    <p>Position</p>
                    <p class="text2">Global Team Technical Lead</p>
                    <div class="row">
                        <div class="col">
                            <p>Country</p>
                            <p class="text2">Germany</p>
                        </div>
                        <div class="col">
                            <p>Event</p>
                            <p class="text2">JEEC 24</p>
                        </div>
                    </div>
                    <p>JEEC Responsible</p>
                    <p class="text2">Francisco Rosa</p>
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
  width: 94.5vw;
  height: 93vh;
  border-radius: 30px;
  background-color: var(--c-accent);
  margin-right: -0vw;

}

.items {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 7vh;
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
    display: flex;
    flex-direction: row;
    gap: 3.5vw;
}

.col {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

#info {
    margin-left: -2.5vw;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 1.3vh;
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

</style>