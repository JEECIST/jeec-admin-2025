<!-- DayShifts.vue -->
<template>
    <div class="day">
        <div class="weekday">
            <p>{{ day }} - March</p>
            <p>{{ weekDay }}</p>
        </div>
        <SlotShift v-for="slot in shifts" :key="slot" class="slot" :time="slot" :weekDay="weekDay" />
    </div>
</template>

<script setup>
import SlotShift from "./SlotShift.vue";

const shifts = ["9:30-10:30", "10:30-11:30", "11:30-12:30", "12:30-13:30", "13:30-14:30", "14:30-15:30", "15:30-16:30", "16:30-17:30", "17:30-18:30", "18:30-19:30", "19:30-20:30"]

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