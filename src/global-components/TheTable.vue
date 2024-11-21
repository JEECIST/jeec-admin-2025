<template>
  <div class="scroll-wrapper">
    <table v-if="rows.length != 0">
      <thead>
        <tr>
          <template v-for="(value, key) in tableHeaders">
            <th>{{ value }}</th>
          </template>
          <th class="button" v-for="button in props.buttons">{{ button.name }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" @click="selectRow($event, row)">
          <template v-for="(value, key) in tableHeaders">
            <td>{{ row[key] }}</td>
          </template>
          <td class="button" v-for="button in props.buttons">
            <button v-if="!button.icon" @click="$emit(button.eventName, row)">{{ button.name }}</button>
            <button v-else @click="$emit(button.eventName, row)">
              <img :src="button.icon" alt="">
            </button>
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
  tableHeaders: {
    type: Object,
    required: true
  },
  buttons: {
    type: Array[{
      icon: {
        type: String,
        default: false,
        required: false,
      },
      eventName: String,
      name: String
    }],
    required: false,
  },
  searchInput: String,
  isSelectable: {
    type: Boolean,
    default: true,
  }
});

const emit = defineEmits(['onRowSelect', 'notFound']);

const isAnySelected = ref(false);
const whichIsSelected = ref();

function selectRow(e, row) {
  if (!props.isSelectable)
    return

  if (e.target.tagName == 'BUTTON')
    return

  if (isAnySelected.value)
    whichIsSelected.value.classList.remove("selected");

  whichIsSelected.value = e.target.parentElement;
  whichIsSelected.value.classList.add("selected");
  isAnySelected.value = true;

  emit('onRowSelect', row)
}


function normalizeStr(str) {
  if (typeof str !== 'string') {
    // Return an empty string if the input is not a string
    return '';
  }
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
}

const rows = computed(() => {
  if (!props.data.length) 
    return []
  else
    var filter = props.data.filter(row => {
        return Object.values(row).some(
          cell => !props.searchInput || ((typeof cell === 'string')
            ? normalizeStr(cell).includes(normalizeStr(props.searchInput))
            : normalizeStr(cell).toString(10).includes(normalizeStr(props.searchInput))
          ))
      })
      var isEmpty = false
      if (filter == 0)
      {
        isEmpty = true
        emit ('notFound', isEmpty)
        return []
      } 
      else{
        isEmpty = false
        emit ('notFound', isEmpty)
        return filter
      }
       
})
</script>

<style scoped>
.scroll-wrapper {
  overflow: auto;
}

table {
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;
}

thead {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  z-index: 2;
}

th {
  text-align: left;
  text-transform: capitalize;
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

tbody>tr:hover {
  filter: brightness(0.9);
}

tr.selected {
  background-color: var(--c-select);
  color: white;
}

tbody>tr.selected:hover {
  filter: none;
}

td,
th {
  min-width: 10ch;
  padding: 0 1ch;
}

:is(th, td).button {
  min-width: 60px;
  text-align: center;
}

td.button>button {
  border: none;
  background-color: var(--c-select);
  width: 37px;
  height: 37px;
  border-radius: 10px;
  color: var(--c-bg-light);
  cursor: pointer;
}

tr.selected>td.button>button {
  background-color: var(--c-bg-light);
  color: var(--c-select);
  transition: all 0.2s;
}
</style>