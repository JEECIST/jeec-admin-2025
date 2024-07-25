<template>
  <div class="scroll-wrapper">
    <table>
      <thead>
        <tr>
          <template v-for="(value, key) in props.data[0]">
            <th v-if="toShow.indexOf(key) != -1">{{ key }}</th>
          </template>
          <th class="button" v-for="button in props.buttons">{{ button }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" @click="selectRow">
          <template v-for="(value, key) in row">
            <td v-if="toShow.indexOf(key) != -1">{{ value }}</td>
          </template>
          <td class="button" v-for="button in props.buttons">
            <button @click="$emit('on' + button, row)">{{ button }}</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  data: {
    type: Array[Object],
    required: true
  },
  toShow: {
    type: Array[String],
    required: true
  },
  buttons: Array[String],
  searchInput: String,
  isSelectable: {
    type: Boolean,
    default: true,
  }
});

defineEmits(['onRowSelect']);


const isAnySelected = ref(false);
const whichIsSelected = ref();

function selectRow(e) {
  if (!props.isSelectable)
    return

  if (e.target.tagName == 'BUTTON')
    return

  if (isAnySelected.value)
    whichIsSelected.value.classList.remove("selected");

  whichIsSelected.value = e.target.parentElement;
  whichIsSelected.value.classList.add("selected");
  isAnySelected.value = true;
}


function normalizeStr(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
}

const rows = computed(() => {
  if (!props.data.length)
    return []
  else
    return props.data.filter(row => {
      return Object.values(row).some(
        cell => !props.searchInput || ((typeof cell === 'string')
        ? normalizeStr(cell).includes(normalizeStr(props.searchInput))
        : normalizeStr(cell).toString(10).includes(normalizeStr(props.searchInput))
      ))
    })
})
</script>

<style scoped>
.scroll-wrapper {
  overflow: auto;
}

table {
  border-spacing: 0;
  width: 100%;
}
th {
  text-align: left;
  color: var(--c-ft-dark);
}

tr {
  height: 50px;
}

tr:nth-child(odd) {
  background-color: var(--c-bg-light);
}

tr:nth-child(even) {
  background-color: var(--c-accent);
}

tbody > tr:hover {
  filter: brightness(0.9);
}

tr.selected {
  background-color: var(--c-select);
}

tbody > tr.selected:hover {
  filter: none;
}

td, th {
  min-width: 10ch;
  padding: 0 1ch;
}

:is(th, td).button  {
  min-width: 60px;
  text-align: center;
}

td.button > button {
  border: none;
  background-color: var(--c-select);
  width: 37px;
  height: 37px;
  border-radius: 10px;
  color: var(--c-bg-light);
  cursor: pointer;
}

tr.selected > td.button > button {
  background-color: var(--c-bg-light);
  color: var(--c-select);
  transition: all 0.2s;
}
</style>