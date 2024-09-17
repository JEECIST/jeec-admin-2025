<script setup>
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

</script>

<template>
    <div v-if="isOpen" class="modal-mask">
      <div class="desktop" v-if="!isMobile()">
        <div class="wrapper-wrapper">
            <div class="popup-wrapper">
                <div class="ihatedivs">
                    <h1>Edit Speaker Type</h1>
                    <div class="flex-1">
                        <div class ="flex-1-row-4">
                            <div class="labels" id="name">
                                <label for="name">Name</label>
                                <input type="text" placeholder="" id="name">
                            </div>
                            <div class="labels" id="priority">
                                <label for="priority">Priority</label>
                                <input type="text" placeholder="" id="priority">
                            </div>
                        </div>
                        <div class ="flex-1-row-5">  
                            <div class="check" id="website">
                            <label for="website">Show in Website</label>
                                <div class="radios">
                                    <input type="radio" name="perfectpuppy" id="website">Yes
                                    <input type="radio" name="perfectpuppy" id="website">No
                                </div>
                            </div>
                            <div class="check" id="socials">
                                <label for="socials">Social Media</label>
                                <div class="radios">
                                    <input type="radio" name="bigbear" id="socials">Yes
                                    <input type="radio" name="bigbear" id="socials">No
                                </div>
                            </div>
                            <div class="check" id="video">
                                <label for="video">Exclusive Video</label>
                                <div class="radios">
                                    <input type="radio" name="dancingduck" id="video">Yes
                                    <input type="radio" name="dancingduck" id="video">No    
                                </div>
                            </div>
                        </div>
                        <div class ="flex-1-row-6">  
                            <div class="check" id="post">
                                <label for="post">Exclusive Posts</label>
                                    <div class="radios">
                                        <input type="radio" name="cutecat" id="post">Yes
                                        <input type="radio" name="cutecat" id="post">No
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="add" @click.stop="emit('modal-close')">Add</button>
            </div>
        </div>
      </div>


      <div class="mobile" v-else>
        <div class="mobile-wrapper-wrapper">
            <div class="popup-wrapper">
                <div class="ihatedivs">
                    <h1>Edit Speaker Type</h1>
                    <div class="flex-1">
                        <div class ="mobile-flex-1-row-4">
                            <div class="labels" id="name">
                                <label for="name">Name</label>
                                <input type="text" placeholder="" id="name">
                            </div>
                            <div class="labels" id="priority">
                                <label for="priority">Priority</label>
                                <input type="text" placeholder="" id="priority">
                            </div>
                        </div>
                        <div class ="mobile-flex-1-row-5">  
                            <div class="check" id="website">
                            <label for="website">Show in Website</label>
                                <div class="radios">
                                    <input type="radio" name="perfectpuppy" id="website">Yes
                                    <input type="radio" name="perfectpuppy" id="website">No
                                </div>
                            </div>
                            <div class="check" id="socials">
                                <label for="socials">Social Media</label>
                                <div class="radios">
                                    <input type="radio" name="bigbear" id="socials">Yes
                                    <input type="radio" name="bigbear" id="socials">No
                                </div>
                            </div>
                            <div class="check" id="video">
                                <label for="video">Exclusive Video</label>
                                <div class="radios">
                                    <input type="radio" name="dancingduck" id="video">Yes
                                    <input type="radio" name="dancingduck" id="video">No    
                                </div>
                            </div>
                        </div>
                        <div class ="mobile-flex-1-row-6">  
                            <div class="check" id="post">
                                <label for="post">Exclusive Posts</label>
                                    <div class="radios">
                                        <input type="radio" name="cutecat" id="post">Yes
                                        <input type="radio" name="cutecat" id="post">No
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="mobile-add" @click.stop="emit('modal-close')">Add</button>
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
    width: 94.5vw;
    height: 80%;
    position: absolute;
    top: 50%;
    left: 46.5%;
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

.mobile-flex-1-row-4 {
    display: flex;
    flex-direction: row;
    width: 84.5vw;
    justify-content: space-between;
}

.flex-1-row-4 {
    display: flex;
    flex-direction: row;
    width: 48vw;
    justify-content: space-between;
}

.mobile-flex-1-row-5, 
.mobile-flex-1-row-6 {
    display: flex;
    flex-direction: column;
    justify-content: left;
    gap: 10vw;
    margin-top: 3%;
}

.flex-1-row-5, 
.flex-1-row-6 {
    display: flex;
    flex-direction: row;
    justify-content: left;
    gap: 10vw;
    margin-top: 3%;
}

input {
    color: #515151;
    border-style: solid;
    border-width: thin;
    border-radius: 5px;
    outline: none;
    height: 5vh;
}

.labels {
    display: flex;
    flex-direction: column;
    color: #515151;
    font-size: small;
    height: 100%;
}

.mobile-flex-1-row-4 > .labels > #name, #priority {
    width: 60vw;
}

.labels > #name, 
          #priority {
    width: 22vw;
}

.radios {
    display: flex;
    justify-content: left;
    gap: 1.3vw;
    align-items: center;
}

radio {
    display: flex;
    flex-direction: row;
}

.check {
    display: flex;
    flex-direction: column;
    gap: 0.5vh;
    color: #515151;
    font-size: small;
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

.mobile-add {
    background-color: #152259;
    color: white;
    border-radius: 5px;
    border: none;
    margin-right: 3vw;
    margin-top: 13%;
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

</style>