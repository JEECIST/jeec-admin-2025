<template>
    <div class="week">
        <DayShifts v-for="day in days" :key="day" class="day" :day="day" :weekDay="weekDays[day - 3]" />
    </div>
</template>

<script setup>
import DayShifts from "./DayShifts.vue";

const days = ["3", "4", "5", "6", "7", "8", "9", "10", "11"];
const weekDays = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
</script>

<style>
.week {
    display: flex;
    height: 80vh;
    overflow: auto;
}

.day {
    width: 80px;
    height: 100%;
    margin-left: 10px;
}
</style>