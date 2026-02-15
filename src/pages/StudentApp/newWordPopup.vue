<template>
  <div v-if="isOpen" class="backdrop">
    <div class="tier-pop-up">
      <div class="header">
        <h1>Add Word</h1>
        <button @click.stop="closeModal" class="close-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="#4f4f4f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <form class="form" @submit.prevent="addWord">
        <div class="form-line">
          <div class="inputname">
            <label>Day</label>
            <input type="date" v-model="day" />
          </div>
        </div>

        <div class="form-line">
          <div class="inputname">
            <label>Words</label>
            <input type="text" v-model="word1" />
            <input type="text" v-model="word2" />
            <input type="text" v-model="word3" />
            <input type="text" v-model="word4" />
          </div>
        </div>

        <div class="form-line">
          <div class="inputdescription">
            <label>Category</label>
            <textarea class="category" v-model="category"></textarea>
          </div>
        </div>

        <button class="add" type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? "Adding..." : "Add" }}
        </button>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { defineProps, defineEmits, ref, watch } from "vue";

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["modal-close", "created"]);

const day = ref("");       // "YYYY-MM-DD"
const word1 = ref("");
const word2 = ref("");
const word3 = ref("");
const word4 = ref("");
const category = ref("");

const isSubmitting = ref(false);
const errorMessage = ref("");

// Optional: clear fields when opening
watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      errorMessage.value = "";
      // keep previous values if you want; or reset:
      // day.value = "";
      // word.value = "";
      // category.value = "";
    }
  }
);

function closeModal() {
  emit("modal-close");
}

async function addWord() {
  const d = day.value;

  const w1 = word1.value.trim();
  const w2 = word2.value.trim();
  const w3 = word3.value.trim();
  const w4 = word4.value.trim();

  const c = category.value.trim();

  if (!d || (!w1 && !w2 && !w3 && !w4) || !c) {
    errorMessage.value = "Please fill Day, Word, and Category.";
    return;
  }

  errorMessage.value = "";
  isSubmitting.value = true;

  try {
    const formData = new FormData();
    formData.append("day", d);
    formData.append("word1", w1);
    formData.append("word2", w2);
    formData.append("word3", w3);
    formData.append("word4", w4);    
    formData.append("category", c);

    const res = await axios.post(
      import.meta.env.VITE_APP_JEEC_BRAIN_URL + "/add-word-connections",
      formData,
      {
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
        },
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (res.data === "Success") {
      emit("created");
      emit("modal-close");

      // reset after success
      day.value = "";
      word1.value = "";
      word2.value = "";
      word3.value = "";
      word4.value = "";
      category.value = "";
    } else {
      errorMessage.value = "Failed to add word.";
    }
  } catch (err) {
    errorMessage.value = "Error adding word.";
    console.error(err);
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
.backdrop{
  top:0;
  left: 0;
  position: fixed;
  background: rgba(0,0,0,0.5);
  width: 100%;
  height: 100%;
  z-index: 3;
  align-content: center;
}

.tier-pop-up{
  display: flex;
  flex-direction: column;
  width: 80vw;
  max-width: 900px;
  overflow-y: auto;
  padding: 50px;
  height: fit-content;
  max-height: 90vh;
  margin: 3vh auto;
  background-color: #fff;
  font-size: 0.9em;
  z-index: 10;
  gap: 20px;
}

.header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.close-button{
  background: none;
  border: none;
  cursor: pointer;
}

.form{
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.form-line{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
}

.inputname{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 8px;
}

.inputname input{
  padding: 10px 12px;
  border: 1px solid #8A8A8A;
  border-radius: 10px;
}

.inputdescription{
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
}

.category{
  height: 11vh;
  padding: 12px;
  border: 1px solid #8A8A8A;
  border-radius: 10px;
}

.add{
  width: 120px;
  height: 40px;
  border: none;
  border-radius: 10px;
  color: #fff;
  background-color: #152259;
  cursor: pointer;
  align-self: flex-end;
}

.add:disabled{
  opacity: 0.6;
  cursor: not-allowed;
}

.error{
  color: #b00020;
  margin-top: 6px;
  text-align: left;
}
</style>
