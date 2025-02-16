<script setup>
import { defineProps, defineEmits, ref } from "vue";
import EditSpeakerPopup from './EditSpeakerPopup.vue';

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

const descriptionShow = ref(false);

function showfunction() {
  descriptionShow.value=true;
}

function closeDescription() {
  descriptionShow.value=false;
}

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
                    <Transition name="fade" appear>
                        <EditSpeakerPopup :isOpen="isOtherModalOpened" @modal-close="closeOtherModal">
                        </EditSpeakerPopup>
                    </Transition>
                    <button class="btn" @click="openOtherModal">
                        <img src="../../assets/pencil.svg">
                    </button>
                    <button class="btn" @click="showfunction">
                        <img src="../../assets/sheet.svg">
                    </button>
                    <div class="popup-mask" v-show="descriptionShow">
                        <div class="description-mobile">
                            <p>
                                description of speaker Once upon a time there was a lovely
                                princess. But she had an enchantment
                                upon her of a fearful sort which could
                                only be broken by love's first kiss.
                                She was locked away in a castle guarded
                                by a terrible fire-breathing dragon.
                                Many brave knights had attempted to
                                free her from this dreadful prison,
                                but non prevailed. She waited in the
                                dragon's keep in the highest room of
                                the tallest tower for her true love
                                and true love's first kiss. (laughs)
                                Like that's ever gonna happen. What
                                a load of - (toilet flush)

                                Allstar - by Smashmouth begins to play. Shrek goes about his
                                day. While in a nearby town, the villagers get together to go
                                after the ogre.
                            </p>
                            <button class="mobile-closedescription" @click="closeDescription">X</button>
                        </div>
                    </div>
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
    margin-top: 4vh;
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

button {
    outline: none;
    border: none;
    cursor: pointer;
}

.popup-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.425);
}

.description-mobile {
  display: flex;
  justify-content: left;
  background-color: white;
  width: 90.5vw;
  height: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  border-radius: 15px;
}

.description-mobile > p {
   display: flex;
   align-items: center;
   vertical-align: center;
   justify-content: center;
   padding: 3.5vw;
   font-weight: 350;
   color: (--c-ft-semi-light);
}

.mobile-closedescription {
  background-color: #152259;
  color: white;
  border-radius: 5px;
  border: none;
  margin-right: 3vw;
  margin-top: 2%;
  margin-bottom: 2%;
  display: flex;
  margin-left: auto;
  width: 90vw;
  height: 3.5vh;
  align-items: center;
  justify-content: center;
  gap: 10vh;
  cursor: pointer;
  padding: 0.5vw;
}

</style>