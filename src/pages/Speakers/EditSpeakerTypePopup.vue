<script setup>
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

</script>

<template>
    <div v-if="isOpen" class="modal-mask">
        <div class="desktop" v-if="!isMobile()">
            <div class="wrapper">
                <div class="popup-wrapper">
                    <div class="ihatedivs">
                        <div class="header">
                            <h1 class="desktop-h1">Edit Speaker Type</h1>
                            <button class="close" @click.stop="emit('modal-close')">X</button>
                        </div>
                        <div class="flex-1">
                            <div class="flex-1-row-1">
                                <div class="labels" id="name">
                                    <label for="name">Name</label>
                                    <input type="text" placeholder="" id="name">
                                </div>
                                <div class="labels" id="priority">
                                    <label for="priority">Priority</label>
                                    <input type="text" placeholder="" id="priority">
                                </div>
                            </div>
                            <div class="flex-1-row-2">
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
                            <div class="flex-1-row-3">
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
                    <div class="btns">
                        <button class="add" @click.stop="emit('modal-close')">Save</button>
                    </div>
                </div>
            </div>
        </div>


        <div class="mobile" v-else>
            <div class="mobile-wrapper">
                <div class="popup-wrapper">
                    <div class="ihatedivs">
                        <div class="header">
                            <h1 class="mobile-h1">Edit Speaker Type</h1>
                            <button class="mobile-close" @click.stop="emit('modal-close')">X</button>
                        </div>
                        <div class="flex-1">
                            <div class="mobile-flex-1-row-1">
                                <div class="labels" id="name">
                                    <label for="name">Name</label>
                                    <input type="text" placeholder="" id="name">
                                </div>
                                <div class="labels" id="priority">
                                    <label for="priority">Priority</label>
                                    <input type="text" placeholder="" id="priority">
                                </div>
                            </div>
                            <div class="mobile-flex-1-row-2">
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
                            <div class="mobile-flex-1-row-3">
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
                    <div class="mobile-btns">
                        <button class="mobile-add" @click.stop="emit('modal-close')">Save</button>
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
    width: 90.5vw;
    height: 70%;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    border-radius: 15px;
    overflow-y: auto;
    overflow-x: hidden;
}

.popup-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.flex-1,
h1 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 5%;
    margin-right: 15%;
    gap: 1.5vh;
    margin-bottom: 3%;
    margin-top: 6%;
    color: #515151;
}

.flex-1-row-1 {
    display: flex;
    flex-direction: row;
    width: 48vw;
    justify-content: space-between;
}

.flex-1-row-2,
.flex-1-row-3 {
    display: flex;
    flex-direction: row;
    justify-content: left;
    gap: 10vw;
    margin-top: 3%;
}

.mobile-flex-1-row-1 {
    display: flex;
    flex-direction: row;
    width: 84.5vw;
    justify-content: space-between;
}

.mobile-flex-1-row-2,
.mobile-flex-1-row-3 {
    display: flex;
    flex-direction: column;
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

.mobile-flex-1-row-1>.labels>#name,
#priority {
    width: 60vw;
}

.labels>#name,
#priority {
    width: 22vw;
}

.radios {
    display: flex;
    justify-content: left;
    gap: 1.3vw;
    align-items: center;
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
    margin-top: 2%;
    margin-bottom: 2%;
    width: 8.4vw;
    height: 3.5vh;
    gap: 20vh;
    cursor: pointer;
}

.mobile-add {
    background-color: #152259;
    color: white;
    border-radius: 5px;
    border: none;
    margin-top: 2%;
    margin-bottom: 4%;
    margin-right: -11%;
    display: flex;
    width: 16vw;
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

.btns {
    display: flex;
    margin-right: 8%;
    margin-top: 8vh;
    justify-content: right;
    gap: 0.1%;
}

.mobile-btns {
    width: 80vw;
    display: flex;
    justify-content: right;
    gap: 4%;
}

</style>