<script setup>
import { ref , reactive} from 'vue';

// Define 'Form' props
const props = defineProps({
    inputs: {
        type: Array,
        required: true,
        validator(value) {
            return value.every(
                (input) => 'type' in input && 'id' in input && 'label' in input 
            );
        },
    },
});


// Reactive object for the form data
const formData = reactive({});


// Initialize 'formData' with empty values for each input.
props.inputs.forEach( (input) => {
   formData[input.id] = ''; 
});


</script>

<template>
    <form class="form-grid">
        <div v-for="(input, index) in props.inputs" :key="index" class="form-group">
            <label :for="input.id"> {{ input.label }} </label>
            <input 
                :type="input.type"
                :id="input.id"
                :name="input.id"
                v-model="formData[input.id]"
                :placeholder="input.placeholder || '' "
                required
            />

        </div>
    </form>
</template>
<style scoped>

.form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

.form-group {
    display: flex;
    flex-direction: column;
}

input {
    color: #515151;
    border-style: solid;
    border-width: thin;
    border-radius: 5px;
    outline: none;
    height: 5vh;
}

select {
    border-style: solid;
    border-width: thin;
    border-radius: 5px;
    color: #8a8a8a;
    background-color: white;
    height: 5vh;
    width: 15vw;
}

</style>