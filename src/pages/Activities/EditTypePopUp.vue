<template>
    <div class="background">
        <div class="popup-container">
            <div class="header">Edit Activities Type</div>
            <button class="btn_close" @click="closePopup">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none"
                    stroke="#4f4f4f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-x">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <div class="content">
                <div class="row">
                    <div class="col">
                        <label for="name">Name</label>
                        <input type="text" v-model="name" />
                        <label for="name">Points</label>
                        <input type="text" v-model="points" />
                    </div>
                    <div class="col">
                        <label for="priority">Priority</label>
                        <input type="text" v-model="priority" />
                        <label for="priority">Location</label>
                        <input type="text" v-model="priority" />
                    </div>
                </div>
                <!-- Show in Website -->
                <div class="row">
                    <div class="option-group">
                        <label>Show in Website</label>
                        <div class="radio-group">
                            <label>
                                <input type="radio" name="website" value="Yes" />Yes
                            </label>
                            <label>
                                <input type="radio" name="website" value="No" />No
                            </label>
                        </div>
                    </div>

                    <!-- Social Media -->
                    <div class="option-group">
                        <label>Social Media</label>
                        <div class="radio-group">
                            <label>
                                <input type="radio" name="social-media" value="Yes" />Yes
                            </label>
                            <label>
                                <input type="radio" name="social-media" value="No" />No
                            </label>
                        </div>
                    </div>

                    <!-- Exclusive Video -->
                    <div class="option-group">
                        <label>Exclusive Video</label>
                        <div class="radio-group">
                            <label>
                                <input type="radio" name="exclusive-video" value="Yes" />Yes
                            </label>
                            <label>
                                <input type="radio" name="exclusive-video" value="No" />No
                            </label>
                        </div>
                    </div>
                </div>
                <!-- Exclusive Posts -->
                    <div class="option-group">
                        <label>Exclusive Posts</label>
                        <div class="radio-group">
                            <label>
                                <input type="radio" name="exclusive-posts" value="Yes" />Yes
                            </label>
                            <label>
                                <input type="radio" name="exclusive-posts" value="No" />No
                            </label>
                        </div>
                    </div>
            </div>
            <div class="end_btn">
                <button class="btn_add" @click="closePopup">Edit</button>
                <!-- function to add and save info v-model -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

/*export{
  data() {
    return {
      showInWebsite: null,
      socialMedia: null,
      exclusiveVideo: null,
      exclusivePosts: null,
    }
  }
};*/

const emit = defineEmits(['close'])

function closePopup() {
    emit('close');
}

const props = defineProps({
    foo: String
})

const name = ref('');
const priority = ref('');

</script>

<style scoped>
.background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.popup-container {
    width: 1100px;
    min-height: 700px;
    background-color: white;
    border-radius: 5px;
    padding: 30px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    position: relative;
    margin: 0px 20px;
}

.header {
    font-size: 1.5em;
    font-weight: 600;
    color: #4f4f4f;
    margin-top: 20px;
    margin-left: 30px;
    margin-right: 20px;
    margin-bottom: 40px;
}

.btn_close {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    cursor: pointer;
}

.content {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.row {
    display: flex;
    justify-content: space-between;
    gap: 30px;
}

.col {
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1;
}

label {
    font-size: 1em;
    color: #4f4f4f;
    font-weight: 500;
    margin-bottom: 5px;
}

input[type="text"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1em;
    margin-top: -20px;
    color: #4f4f4f;
}

.option-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.option-group label {
  font-size: 14px;
  color: #4f4f4f;
}

.radio-group {
  display: flex;
  gap: 15px;
}

.radio-group label {
  font-size: 14px;
  color: #4f4f4f;
}

.end_btn {
    position: absolute; /* Altere para position: absolute */
    bottom: 40px; /* Alinhe com a margem inferior */
    right: 40px; /* Alinhe com a margem direita */
    display: flex;
    justify-content: flex-end;
    width: auto;
}

.btn_add {
    background-color: #1a2e4e;
    color: #ffffff;
    padding: 10px 30px;
    font-size: 1em;
    font-weight: 400;
    font-family: 'Kumbh Sans', sans-serif;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn_add:hover {
    background-color: #162742;
}
</style>