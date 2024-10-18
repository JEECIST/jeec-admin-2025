<!-- DayShifts.vue -->
<template>
    <div class="day">
        <div class="weekday">
            <p>{{ day }} - May</p>
            <p>{{ weekDay }}</p>
        </div>
        <SlotShift v-for="slot in shifts" :key="slot" class="slot" :time="slot" :day="day" :weekDay="weekDay" />
    </div>
</template>

<script setup>
import SlotShift from "./SlotShift.vue";


const shifts = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

const props = defineProps({
    day: String,
    weekDay: String
});

</script>

<style>
.day {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-left: 100px;
}

p {
    font-family: Kumbh Sans;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.weekday {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
</style>