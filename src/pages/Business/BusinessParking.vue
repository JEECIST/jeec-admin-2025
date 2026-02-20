<template>
  <div class="wrapper">
    <div class="wrapper-sec">
      <div class="table">
        <form>
          <div class="first-div">
            <div class="search_style">
              <label>
                <img src="../../assets/search.svg">
              </label>
              <input v-model="message" placeholder="Search for a company" />
            </div>
            <select class="select" v-model="selectedDay" @change="change_day($event.target.value)">
              <option v-for="day in days" :value="day.str">
                {{ day.str }}
              </option>
            </select>
          </div>
        </form>
        <TheTable
          :data="day_cars"
          :tableHeaders="tablePref"
          :searchInput="message"
          
          @onRowSelect="selectCallback"
        ></TheTable>
        <div class="nocompanies" v-if=noCompanies>No Parking Today</div>
        <div class="nocompanies" v-if=noDay>Select the day</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import TheTable from '../../global-components/TheTable.vue';
import { ref, onMounted } from 'vue';
import CryptoJS from "crypto-js";
import { useUserStore } from "../../stores/user.js";

const userStore = useUserStore();

let day_cars = ref([]);
const cars = ref([]);
const days = ref([]);
let selectedDay = ref(null);

const selectedRow = ref(null);

const message = ref('');
let noCompanies = ref();
let noDay = ref(true);

const tablePref = {
  day: "Day",
  company: "Company",
  plate: "Plate"
};

function selectCallback(row) {
  if (selectedRow.value == row) {
    selectedRow.value = null;
  } else {
    selectedRow.value = {...row};
  }
}

async function fetchParking() {
    try {
        const response = await axios.get(
        import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/get_parking',
        { 
            auth: {
            username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
            password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
            }
        }
        );

        days.value = response.data.days;
        cars.value = response.data.cars;

    } catch (err) {
        console.error("Erro ao buscar carros:", err);
    }
}

function getTodayString() {
  const today = new Date();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const dayName = days[today.getDay()];
  const dayNumber = String(today.getDate()).padStart(2, "0");
  const monthName = months[today.getMonth()];
  const year = today.getFullYear();

  return `${dayName}, ${dayNumber} ${monthName} ${year}`;
}

function setDay(){
  const today = getTodayString();


  const match = days.value.find(day => day.str === today);

  if (match) {
    selectedDay.value = match.str;
    change_day(match.str);
  }
}


onMounted(async () => {
  await fetchParking();   // espera terminar
  setDay();      // só executa depois
});

function change_day(day) {
  noDay.value = false

  day_cars.value = cars.value.filter(car => car.day === day);

  if (day_cars.value.length === 0) {
    noCompanies.value = true; // Se o array estiver vazio, a flag é true
  } else {
    noCompanies.value = false; // Caso contrário, a flag é false
  }

}


</script>

<style scoped>

@import './companies.css';


</style>