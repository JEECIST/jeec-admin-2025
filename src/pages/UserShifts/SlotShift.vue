<template>
    <div class="slot-scroll-container">
      <button
        @click="selectSlot"
        :class="isSelected ? 'slot-selected' : 'slot-not-selected'"
      >
        <p>{{ time }}</p>
      </button>
    </div>
</template>
  

<script setup>
import { defineProps, computed } from 'vue';
import { useSlotStore } from '../../stores/userShifts.js'; // Importe a store


// Recebendo as props
const props = defineProps({
    time: String,
    // day: String,
    weekDay: String,
});

// Usando a store
const slotStore = useSlotStore();

// Computed property para verificar se o slot está selecionado
const isSelected = computed(() =>
    slotStore.isSelected(props.weekDay, props.time)
);

// Função para alternar a seleção de slots
function selectSlot() {
    slotStore.toggleSlot(props.weekDay, props.time);
}
</script>

<style>
.slot-selected {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #509CDB;
    border-radius: 10px;
    border: none;
    /* height: 5%; */
    height: 40px;
    margin: 5px;
    width: 100px;
}

.slot-not-selected {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #EBF6FF;
    border-radius: 10px;
    border: none;
    /* height: 5%; */
    height: 40px;
    margin: 5px;
    width: 100px;
}

p {
    font-family: Kumbh Sans;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 15px;
}

button:active {
  transform: scale(0.96);
  /* background-color: #4782c0; */
}

</style>