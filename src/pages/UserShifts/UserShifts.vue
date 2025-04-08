<template>
    <div class="week">
        <div class="wrap">
            <DayShifts v-for="day in days" :key="day" class="day" :day="day" :weekDay="weekDays[day - 3]" />
        </div>
        <button @click="submitShifts" class="submit-button">Submit</button>
        <button @click="extractShifts" class="submit-button">Extract</button>
    </div>
</template>

<script setup>
import DayShifts from "./DayShifts.vue";
import { useSlotStore } from "../../stores/userShifts"; // Adjust the path if needed

const days = ["3", "4", "5", "6", "7", "8", "9", "10", "11"];
const weekDays = ["Saturday 1", "Sunday 1", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday 2", "Sunday 2"];

const slotStore = useSlotStore();

function submitShifts() {
    slotStore.submitSlots()
}

function extractShifts() {
    slotStore.extractShifts()
}

</script>

<style>
.week {
    display: flex;
    flex-direction: column;
    height: 87vh; /* Full height of screen */
    overflow: hidden; /* Prevent weird scrollbars */
}

.wrap {
    display: flex;
    flex: 1; /* Take up all space except button */
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    padding: 1rem;
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

</style>