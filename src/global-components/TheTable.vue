<template>
  <div>
    <thead>
      <tr>
        <template v-for="(value, key) in data[0]">
          <th v-if="filter.indexOf(key) != -1">{{ key }}</th>
        </template>
        <th v-for="n in buttons">{{ buttons[n - 1] }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="i in data.length">
        <template v-for="(value, key) in data[i - 1]">
          <td v-if="filter.indexOf(key) != -1">{{ value }}</td>
        </template>
        <td v-for="n in buttons">
          <button @click="$emit(buttons[n - 1], 1)">{{ buttons[n - 1] }}</button>
        </td>
      </tr>
    </tbody>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array[Object],
    required: true
  },
  filter: Array[String],
  buttons: Array[String]
})
</script>