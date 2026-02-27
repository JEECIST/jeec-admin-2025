<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css';
import { useUserStore } from "../../stores/user.js";
import axios from "axios";

// BACKEND STRUCTURE:

// timeSlots --> []
// days --> day.name
//          day.week_day
//          day.shifts
// day[shifts][timeSlot] = role

/* variable initialization */
const userStore = useUserStore();
const timeSlots = ref([])
const days = ref([])
const index = ref(0)
const description = ref("");
const descriptionShow = ref(false);
const name = ref("");

function openDescription(role) {
  descriptionShow.value = true;
  name.value = role.name;
  description.value = role.description;
}

function closeDescription() { descriptionShow.value = false; }


/* fetch backend data */
const fetchData = () => {
  let username = userStore.getUsername
  console.log(username);
  axios.post(`${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/shifts/user-schedule`, { username: username }, {
    auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }
  }).then((response) => {
    timeSlots.value = response.data.timeSlots
    days.value = response.data.days
    console.log(days.value)
    console.log(timeSlots.value)

  }).catch((error) => {
    console.log(error)
  })
}
onMounted(fetchData)
const currentDay = computed(() => days.value[index.value] || { shifts: {} })

/* carousel controls */
const nextDay = () => { if (index.value < days.value.length - 1) index.value++ }
const prevDay = () => { if (index.value > 0) index.value-- }
</script>

<template>
  <!-- show role description popup -->
  <div class="popup-mask" v-if="descriptionShow">
    <div class="description-wrap">
      <button class="close-popup" @click="closeDescription">X</button>
      <h1 class="description-name"> {{ name }}</h1>
      <div class="description">
        <p> {{ description }} </p>
      </div>
    </div>
  </div>

  <div class="table-wrap">

    <!-- top bar: title and carousel controls  -->
    <div class="carousel">
      <button @click="prevDay" :disabled="index === 0"> &lt; </button>
      <h2>{{ currentDay.name }}</h2>
      <button @click="nextDay" :disabled="index === days.length - 1"> &gt; </button>
    </div>

    <!-- daily schedule table -->
    <transition name="slide" mode="out-in">
      <table :key="currentDay.name">
        <thead>
          <tr>
            <th>Time</th>
            <th>Shift</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="time in timeSlots" :key="time">
            <td class="hours">{{ time }}</td>
            <td :class="{ disabled: !currentDay.shifts[time] }"
              @click="currentDay.shifts[time] && openDescription(currentDay.shifts[time])">
              {{ currentDay.shifts[time]?.name || '' }}
            </td>
          </tr>
        </tbody>
      </table>
    </transition>

  </div>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  margin: 0;
  padding: 0;
}

h1 {
  text-align: center;
  margin-top: 10px;
  color: var(--c-ft)
}

table {
  border-collapse: collapse;
  margin: 20px auto;
  background-color: #fff;
  /* border: 2px solid #dee2e6; */
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  width: 90vw;
  /* height: 90vh; */
  border-bottom: 1px solid var(--c-select);
}


th,
td {
  border-left: 1px solid var(--c-select);
  border-right: 1px solid var(--c-select);
  padding: 10px;
  text-align: center;
}

th {
  background-color: var(--c-accent);
  color: #343a40;
  border: 1px solid var(--c-select);
  margin-bottom: 3%;
}

tr {
  border: none;
}

tr:nth-child(odd) {
  background-color: var(--c-accent);
}

button {
  background-color: var(--c-accent);
  border-radius: 7px;
  border: none;
  width: 15%;
  height: 80%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--c-ft);
  font-size: 150%;
  font-weight: bolder;
  text-align: center;
}

button:hover {
  background-color: var(--c-select);
  color: white;
}

button:disabled {
  background-color: var(--c-ft-light);
  opacity: 0.3;
  color: white;
}

.highlight {
  background-color: #f8f9fa;
}

.special {
  background-color: #f0f0f0;
}

.hours {
  width: 30vw;
}

.carousel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  gap: 6vw;
  margin-top: 30px;
  color: var(--c-ft);
  /* background-color: var(--c-accent); */
  margin-left: 20vw;
  margin-right: 20vw;
  border-radius: 10px;
  height: 4vh;
  padding-left: 2vw;
  padding-right: 2vw;

}

.description-btn {
  height: 50px;
  width: 50px;
  align-items: center;
  vertical-align: middle;
  background-color: var(--c-accent);
  border-radius: 10px;
  border: none;
}

.description-btn:hover {
  background-color: #509CDB;
}

.description-wrap {
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 80vw;
  height: 60%;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  border-radius: 15px;
  overflow-y: auto;
  overflow-x: hidden;

}

.description {
  display: flex;
  justify-content: left;
  overflow-y: auto;
  overflow-x: hidden;
}

.description>p {
  display: flex;
  align-items: center;
  vertical-align: center;
  font-weight: 500;
  font-size: medium;
  margin-left: 5vw;
  margin-right: 5vw;
  margin-top: 5vw;
  color: (--c-ft-semi-light);
  text-wrap: wrap;
}

.description-name {
  display: flex;
  align-items: center;
  vertical-align: center;
  font-weight: 700;
  margin-left: 5vw;
  margin-right: 5vw;
  font-size: large;
  color: (--c-ft);
  text-wrap: wrap;
  font-size: 30px;
}

.close-popup {
  background-color: var(--c-accent);
  border-radius: 5px;
  border: none;
  margin-right: 2%;
  margin-top: 2%;
  margin-bottom: 2%;
  display: flex;
  margin-left: auto;
  width: 8.0vw;
  height: 3.5vh;
  align-items: center;
  justify-content: center;
  gap: 10vh;
  cursor: pointer;
  padding: 0.5vw;
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

.disabled {
  background-color: #509CDB;
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}
</style>