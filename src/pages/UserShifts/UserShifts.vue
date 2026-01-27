<template>
    <div class="week" v-if="!submit">
        <div class="wrap">
            <DayShifts v-for="day in days" :key="day" class="day" :day="day" :weekDay="weekDays[day - 3]" />
        </div>
        <button @click="submitShifts" class="submit-button">Submit</button>
    </div>
    <div class="week" v-if="submit">
        meter aqui os shifts 
        <button @click="alterShifts" class="alter-button">Change Shifts</button>
    </div>
</template>

<script setup>
import DayShifts from "./DayShifts.vue";
import { useSlotStore } from "../../stores/userShifts"; // Adjust the path if needed
import { onMounted, ref } from "vue";

const submit = ref(false)
const days = ["3", "4", "5", "6", "7", "8", "9", "10", "11"];
const weekDays = ["Saturday 1", "Sunday 1", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday 2", "Sunday 2"];

const slotStore = useSlotStore();

function submitShifts() {
    slotStore.submitSlots()
    submit.value = true;
}

function alterShifts() {
    submit.value = false;
}

function getShifts() {
    slotStore.getShifts()
}

onMounted(() => {
  getShifts()
});

</script>

<style>
.week {
    display: flex;
    flex-direction: column;
    height: 100%; /* Full height of screen */
    overflow: hidden; /* Prevent weird scrollbars */
}

.wrap {
    display: flex;
    flex: 1;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    padding: 1rem;
    scroll-snap-type: x mandatory; /* for nice snapping */
    -webkit-overflow-scrolling: touch; /* smooth scrolling on iOS */
}

.day {
    flex: 0 0 auto;
    width: 100px;
    height: 100%;
    margin-left: 10px;
}

.submit-button {
    align-self: center;
    margin: 1rem;
    height: 3rem;
    width: 10rem;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    background-color: var(--c-select);
    border-radius: 10px;
    color: var(--c-bg-light);
    cursor: pointer;
}

button:hover {
  background-color: #4782c0;
}

button:active {
  transform: scale(0.96);
  background-color: #4782c0;
}

</style>