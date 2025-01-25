<template>

<div class="dropdown-wrapper" ref="dropDown">
  <div class="dropdown-selected-option" @click="isDropDownVisible = true">
    {{ mappedSelectedOption }}
  </div>
  <transition name="slide-fade">
      <div class="options-wrapper"
      v-if="isDropDownVisible"
      >
      <div class="option"
          v-for="(option, index) in props.options"
          :key="index"
          @click="toggleOptionSelect(option)"
          >
        {{ option.name || option }}
      </div>
    </div>
  </transition>
  
</div>

</template>

<script setup>
import { computed, defineProps, defineEmits, ref, onMounted, onBeforeUnmount } from 'vue';

const dropDown = ref(null)

const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  modelValue: {
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const selectedOption = ref(null)
const isDropDownVisible = ref(false)

const mappedSelectedOption = computed (() => {
  return (selectedOption.value?.name || selectedOption.value) || 'Please select something'
})


const toggleOptionSelect = (option) => {
  selectedOption.value = option;
  emit('update:modelValue', option)
  isDropDownVisible.value = false
}




const closeDropDown = (element) => {
  if(!dropDown.value.contains(element.target)){
    isDropDownVisible.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', closeDropDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', closeDropDown)
})

</script>

<style>

.dropdown-wrapper{
  position: relative;
  padding: 16px 0px;
  cursor: pointer;
  max-width: 70%;
  margin: 0 auto;
}

.dropdown-selected-option{
  padding: 16px;
  border: solid 1px white;
  background-color: #d1edf4;
  border-radius: 8px;
  box-sizing: border-box;
  margin-bottom: 4px;
  width: 100%;
}

.option:hover{
  background: #c5c5c5;
}

.options-wrapper{
  position: absolute;
  top: 80%;
  left: 0;
  right: 0;
  z-index: 10;
  border-radius: 8px;
  background-color: #fff; /* Add a solid background */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Optional shadow for better visibility */
}

.option{
  padding: 16px;
  border: solid 1px #313131;
  box-sizing: border-box;
  background-color: #fff;
}

.option:last-of-type{
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.slide-fade-enter-active{
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active{
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to{
  transform: translateY(-4px);
  opacity: 0;
}

</style>