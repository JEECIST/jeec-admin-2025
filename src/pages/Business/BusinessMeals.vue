<template>
  <div class="wrapper">
    <div class="table">
      <TheTable
        :data="datab"
        :tableHeaders="tablePref"
        :searchInput="message"
        :buttons="tableButtons"
        @onRowSelect="selectCallback"
      ></TheTable>
    </div>
    <div v-if="selectedRow" class="popUpOverlay"></div>
    <div v-if="selectedRow" class="right-popup-placeholder">
      <button class="close-popup" @click="closeCardInfo">&times;</button>
      <div class="header">
        <h1 class="cardUsername">{{ selectedRow.weekday }}</h1>
      </div>
      <img src="../../assets/JEEC.png" alt="Profile Image" class="pfp">
      <h2>{{ selectedRow.day }}</h2>
      <p :style="{ color: 'gray', fontSize: '18px' }">Meal</p>
      <div class="cardActions">
        <button class="edit-button" type="button" @click="openModal(event)">
          <img src="../../assets/pencil.svg">
        </button>
        <button class="meal-button" type="button" @click="showMeal = true">
          <img src="../../assets/meal_btn.svg">
        </button>
      </div>
      
      <div class="cardInfo">
        <div class="cardInfoMember">
          <p class="cardInfoLabel">Dishes Available</p>
          
          <p v-if="error" class="error">{{ error }}</p>
          <ul v-if="companiesData[0].dishes.length" class="dishes-list">
            <li v-for="dish in companiesData[0].dishes" :key="dish.id">
              <p>{{ dish.name }}</p> 
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal for Editing User Info -->
  <div v-if="editModal" class="modal-overlay">
    <div class="modal">
      <button class="close-popup" @click="closeModal()">&times;</button>
      <h2>Edit Day</h2>
      <form class="popup_form" @submit.prevent="addUser">
        <div class="formReg">
          <div class="form-group">
            <label for="regDay">Registration Day</label>
            <input 
              type="date" 
              v-model="newMeal.regDay" 
              id="regDay" 
              required 
              :min="minDate" 
              :max="maxDate"
            />
          </div>
          <div class="form-group">
            <label for="regHour">Registration Hour</label>
            <input 
              type="time" 
              v-model="newMeal.regHour" 
              id="regHour" 
              required 
            />
          </div>
        </div>

        <!-- Dishes Section -->
        <div class="formRole">
          <div v-for="(dish, index) in newMeal.dishes" :key="index" class="form-group">
            <label :for="'dish' + index">Dish {{ index + 1 }}</label>
            <input v-model="dish.name" :id="'dish' + index" placeholder="Enter Dish Name" required />
          </div>
        </div>
        <!-- Button to add a new dish input -->
        <div class="addDish">
          <button type="button" class="btn-primary" @click="addDish">Add Dish</button>
        </div>

        <!-- Modal actions -->
        <div class="modal-actions">
          <button type="submit" class="btn-primary" @click="submitMeal" >Save</button>
        </div>
      </form>
    </div>
  </div>

  <div v-if="showMeal" class="modal-overlay">
    <div class="modal">
      <button class="close-popup" @click="closeModal()">&times;</button>
      <h2>Meals Ordered</h2>
      <div class="table">
        <TheTable
          :data="companiesData"
          :tableHeaders="mealsTable"
          :searchInput="message"
          :buttons="tableButtons"
          @onRowSelect="selectCallback"
        ></TheTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, computed, watch } from 'vue';
import TheTable from '../../global-components/TheTable.vue';

const dishes = ref([]);
const error = ref(null);
const message = ref('');
const editModal = ref(false);  
const showMeal = ref(false);
const newMeal = ref({
  regDay: '',
  regHour: '',
  dishes: [{ name: "" }] 
});
const selectedRow = ref(null);
watch(
  () => selectedRow.value?.event_id,
  (newEventDayId) => {
    if (newEventDayId) {
      fetchDishes(newEventDayId);
      fetchCompanyDishes(newEventDayId)
    }
  }
);

const fetchData = () => {
  axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/event_day_meal', {auth: {
    username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
    password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
  }}).then((response) => {
    datab.value = response.data.events_days.map((event) => {
      return {
        event_id: event.event_id,
        external_id: event.external_id, 
        day: event.day,
        weekday: event.weekday, 
        registrationDay: event.meal_registration_datetime
          ? event.meal_registration_datetime.split(" ")[0] // Extract Date
          : null,
        registrationTime: event.meal_registration_datetime
          ? event.meal_registration_datetime.split(" ")[1].slice(0,5) // Extract Time
          : null,
        registrationWeekday: event.meal_registration_datetime
          ? new Date(
              event.meal_registration_datetime.split(" ")[0]
                .split("-")
                .reverse()
                .join("-")
            ).toLocaleDateString("en-US", { weekday: "long" }) 
          : null
      };
    });
    console.log(datab.value);
  }).catch(error => console.error('Fetch error:', error)); 
}

onMounted(fetchData);

const fetchDishes = async (eventDayId) => {
  if (!eventDayId) {
    error.value = "Invalid event selected.";
    return;
  }

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/get_dishes?event_day_id=${eventDayId}`,
      {
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
        },
      }
    );

    console.log("Fetched Dishes:", response.data);

    if (response.data.dishes.length) {
      companiesData.value = [
        {
          name: "Company A", 
          dishes: response.data.dishes.map((dish) => dish.name),
        },
      ];
      companiesData.value[0].dishes = response.data.dishes;
      mealsTable.value = {
        name: "Company",
      };

      response.data.dishes.forEach((dish) => {
        mealsTable.value[dish.name] = dish.name;
      });

      error.value = "";
    } else {
      companiesData.value = [{ name: "heinu", dishes: [] }];
      mealsTable.value = { name: "Company" };
      error.value = "No dishes available.";
    }
  } catch (err) {
    console.error("Fetch error:", err);
    companiesData.value = [{ name: "heinu", dishes: [] }];
    mealsTable.value = { name: "Company" };
    error.value = "Failed to fetch dishes.";
  }
};

onMounted(fetchDishes);

function selectCallback(row) {
  selectedRow.value = row;
  onMounted(fetchDishes);
  // onMounted(fetchCompanyDishes);
  console.log(selectedRow.value.event_id);
}

function addDish() {
  newMeal.value.dishes.push({ name: "" });
}

function submitMeal() {
  const payload = {
    newDishes: {
      event_day_id: selectedRow.value.event_id,
      name: newMeal.value.dishes.map(dish => dish.name),
    }
  };

  axios
    .post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + "/submit_dishes", payload, {
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
      },
    })
    .then(() => {
      fetchData();
      fetchDishes(selectedRow.value.event_id);
      closeModal();
    })
    .catch((error) => {
      console.error("Failed to add meal dishes:", error);
    });
}

const formattedRegDay = computed({
  get: () => {
    if (!newMeal.value.regDay) return "";
    const [year, month, day] = newMeal.value.regDay.split("-");
    return `${day}-${month}-${year}`;
  },
  set: (value) => {
    if (!value) {
      newMeal.value.regDay = "";
      return;
    }
    const [day, month, year] = value.split("-");
    newMeal.value.regDay = `${year}-${month}-${day}`;
  }
});

function addUser() {
  axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/update_day_meal',
  { 
    form: { 
      day: selectedRow.value.day,
      registration_day: formattedRegDay.value, 
      registration_time: newMeal.value.regHour, 
      external_id: selectedRow.value.external_id,
    }
  }, 
  { 
    auth: { 
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY 
    }
  })
  .then(() => {
    fetchData();
    closeModal();
  })
  .catch(error => {
    console.error("Failed to add meal :<");
  });
}

function closeModal() {
  editModal.value = false;
  showMeal.value = false;
}

function closeCardInfo(){
  selectedRow.value = null;
}

const openModal = (event) => {
  editModal.value = true;
  newMeal.value = {
    regDay: selectedRow.value.registrationDay 
      ? selectedRow.value.registrationDay.split("-").reverse().join("-") // Convert DD-MM-YYYY → YYYY-MM-DD
      : null,
    regHour: selectedRow.value.registrationTime?.slice(0, 5), // Remove seconds (HH:MM format)
    dishes: selectedRow.value.dishes 
      ? selectedRow.value.dishes.map(dish => ({ name: dish.name }))  // Convert existing dishes
      : [{ name: "" }],
  };
};

const datab = ref([
  {
    day: null,
    weekday: null,
    registrationDay: null,
    registrationTime: null,
    registrationWeekday: null,
    external_id: null,
    event_id: null
  },
]);

const tablePref = {
  day: "Day",
  weekday: "Weekday", 
  registrationDay: "Registration Day",
  registrationWeekday: "Registration Weekday",
  registrationTime: "Registration Time"
};

const companiesData = ref([
  {
    name: "Company X",
    dishes: [],
  },
]);

const mealsTable = ref({});

const fetchCompanyDishes = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/get_company_dishes`,
      {
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
        },
      }
    );

    console.log("Fetched Company Dishes:", response.data);

    if (response.data.company_dishes.length) {
      companiesData.value = response.data.company_dishes.map((company) => ({
        name: company.company_name || "Unknown Company",
        dishes: company.dishes ? company.dishes.map((dish) => dish.name) : [],
      }));

      mealsTable.value = { name: "Company" };
      response.data.company_dishes.forEach((company) => {
        if (company.dishes) {
          company.dishes.forEach((dish) => {
            mealsTable.value[dish.name] = dish.name;
          });
        }
      });

      error.value = "";
    } else {
      companiesData.value = [{ name: "Unknown Company", dishes: [] }];
      mealsTable.value = { name: "Company" };
      error.value = "No company dishes available.";
    }
  } catch (err) {
    console.error("Fetch error:", err);
    companiesData.value = [{ name: "Unknown Company", dishes: [] }];
    mealsTable.value = { name: "Company" };
    error.value = "Failed to fetch company dishes.";
  }
};

</script>


<style scoped>
.wrapper {
  display: flex;
  position: relative;
  height: calc(100dvh - var(--header-height));
  padding: 5ch 3ch 3ch 3ch;
  overflow-y: hidden;
  
}

.table {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 3ch;
  padding-right: 3ch;
}

form {
  display: flex;
  height: 50px;
  line-height: 50px;
  align-items: center;
  gap: 3ch;
  padding-left: 1ch;
  border-radius: 10px;
}

h2 {
  margin-bottom: 0.3rem;
}

.chevron {
  display: inline-block;
  width: 11px;
  height: 11px;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(-45deg);
  border-radius: 2px;
}

/* Right Popup Placeholder */
.right-popup-placeholder {
  position: sticky;
  top: 0;
  right: 0;
  width: 23rem;
  height: 100%;
  border-radius: 20px;
  background-color: #eef4fb;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.1);

}

.right-popup-placeholder .header {
  text-align: center;
  margin-bottom: 10px;
}

.right-popup-placeholder .title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #444;
  margin-bottom: 10px;
}

.right-popup-placeholder .pfp {
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  margin-bottom: 15px;
}

.right-popup-placeholder .cardUsername {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.right-popup-placeholder .cardRole {
  font-weight: 500;
  color: #777;
  margin-bottom: 20px;
}

.right-popup-placeholder .cardActions {
  display: flex;
  gap: 10px;
  margin-top: 0.5rem;
  
}

.right-popup-placeholder .edit-button,
.right-popup-placeholder .meal-button {
  background-color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  font-size: 1.2rem;
}

.right-popup-placeholder .edit-button:hover,
.right-popup-placeholder .meal-button:hover {
  background-color: #f0f0f0;
}

.right-popup-placeholder .cardInfo {
  width: 100%;
  text-align: left;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.right-popup-placeholder .cardInfoLabel {
  font-size: 1.1rem;
  font-weight: 500;
  color: #555;
  /* margin-bottom: 50px; */
}

.right-popup-placeholder .cardInfoValue {
  font-size: 1.1rem;
  font-weight: 250;
  color: #333;
}

/* Modal styles */
.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100000;
}

.modal {
  background: white;
  padding: 2rem;
  
  width: 100%;
  max-width: 700px;
  
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;
}

.popup_form {
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 10px;
  
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  align-self: flex-end;
  padding-top: 1rem;
  gap: 20px;
  width: 100%;
}

.modal h2 {
  padding-left: 8px;
  margin-top: 0;
  margin-bottom: 2%;
  font-size: 1.5rem;
  font-weight: 600;
}

.formReg {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap:2rem;
}

.form-group {
  flex: 1;
  
}

.form-group:last-child {
  margin-right: 0; /* Remove margin for the last input in the row */
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}


.formRole {
  justify-content: flex-start;
  align-self: flex-start;
  width: 60%;
}

/* Label Styling */
.popup,
.formRole label,
.formReg label {
  display: block;
  margin-bottom: -1rem;
  padding: 0px;
  font-size: 1rem;
  font-weight: 500;
}

/* Input Styling */
.formRole input,
.formReg input,
.formRole select,
.formReg select {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
}
.addDish{
  justify-content: flex-start;
  align-self: flex-start;
  width: 100%;
}
/* Button Styling */
.btnCancel,
.btn-primary {
  width: 18%;
  background-color: var(--c-select);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
}

.btnCancel:hover,
.btn-primary:hover {
  background-color: #002855;
}

.close-popup {
        display: block;
        position: absolute;
        top: 5px;
        right: 25px;
        background: none;
        border: none;
        font-size: 2.2rem;
        cursor: pointer;
        color: #333;
    }

    .dishes-list {

  list-style-type: none; 
}

.dishes-list li {
  color:gray;
  font-size: 16px;
}





/* Styles for mobile screens */
@media (max-width: 768px) {
  /* Example: Make the wrapper full-width for mobile */
  .wrapper {
  display: flex;
  position: relative;
  height: calc(100dvh - var(--header-height));
  padding: 5ch 3ch 3ch 3ch;
  
  
}
  .popUpOverlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); 
    z-index: 500; 
}
  .table {
    width: 100%;
    padding-right: 1ch;
    gap: 1ch;
  }

  .right-popup-placeholder {
    position: fixed; 
    top: 50%; 
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%; 
    height: calc(97dvh - var(--header-height)); 
    background-color: #eef4fb;
    padding: 1rem;
    box-shadow: 0px 4px 10px rgba(0.1, 0.1, 0.1, 0.1);
    z-index: 1000; 
  }

  .right-popup-placeholder .close-popup {
        display: block;
        position: absolute;
        top: 5px;
        right: 25px;
        background: none;
        border: none;
        font-size: 2.2rem;
        cursor: pointer;
        color: #333;
    }


  .pfp {
    width: 7rem;
    height: 7rem;
  }

  .cardUsername {
    font-size: 1.2rem;
  }

  .cardInfoLabel, .cardInfoValue {
    font-size: 0.9rem;
  }

  .modal {
    width: 90%;
    max-width: none;
    padding: 1.5rem;
  }

  .btn-primary, .btnCancel {
    width: 100%;  
    margin-top: 10px;
  }

  .formReg, .formRole {
    flex-direction: column;
    gap: 1rem;
  }

  input {
    width: 100%;
    padding: 8px;
  }
}


</style>