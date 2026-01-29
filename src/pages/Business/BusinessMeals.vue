<template>
  <div class="wrapper">
    <!-- Main Event Day Table -->
    <div class="table">
      <TheTable
        :data="datab"
        :tableHeaders="tablePref"
        :searchInput="message"
        :buttons="tableButtons"
        @onRowSelect="selectCallback"
      />
    </div>

    <!-- Detail Popup for Selected Event Day -->
    <div v-if="selectedRow" class="popUpOverlay"></div>
    <div v-if="selectedRow" class="right-popup-placeholder">
      <button class="close-popup" @click="closeCardInfo">&times;</button>
      <div class="header">
        <h1 class="cardUsername">{{ selectedRow.weekday }}</h1>
      </div>
      <img src="../../assets/JEEC.png" alt="Profile Image" class="pfp" />
      <h2>{{ selectedRow.day }}</h2>
      <p :style="{ color: 'gray', fontSize: '18px' }">Meal</p>
      <div class="cardActions">
        <button class="edit-button" type="button" @click="openModal">
          <img src="../../assets/pencil.svg" />
        </button>
        <button class="meal-button" type="button" @click="showMeal = true">
          <img src="../../assets/meal_btn.svg" />
        </button>
      </div>
      <div class="cardInfo">
        <div class="cardInfoMember">
          <p class="cardInfoLabel">Dishes Available</p>
          <p v-if="error" class="error">{{ error }}</p>
          <!-- List of available dishes for the selected event day -->
          <ul v-if="selectedRow.dishes && selectedRow.dishes.length" class="dishes-list">
            <li v-for="dish in selectedRow.dishes" :key="dish.id">
              <p>{{ dish.name }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Modal for Editing Day Info -->
    <div v-if="editModal" class="modal-overlay">
      <div class="modal">
        <button class="close-popup" @click="closeModal">&times;</button>
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
            <button type="submit" class="btn-primary" @click="submitMeal">Save</button>
          </div>
        </form>
      </div>
    </div>


    <div v-if="showMeal" class="modal-overlay">
      <div class="modal">
        <button class="close-popup" @click="closeModal">&times;</button>
        <h2>Meals Ordered</h2>
        <div class="table">
          <template v-if="companyMeals && companyMeals.length">
            <TheTable
              :data="companyMeals"
              :tableHeaders="mealsTable"
              :searchInput="message"
              :buttons="tableButtons"
              @onRowSelect="selectCallback"
            />
          </template>
          <template v-else>
            <div class = "tableBackground">
              <p class="no-users-found">No Orders found</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, computed, watch } from 'vue';
import TheTable from '../../global-components/TheTable.vue';

const message = ref('');
const editModal = ref(false);
const showMeal = ref(false);
const error = ref(null);

// Data for the Edit Modal
const newMeal = ref({
  regDay: '',
  regHour: '',
  dishes: [{ name: "" }]
});

// Data for the main event day table
const datab = ref([]);

// Data for the pivoted Meals Ordered table (company meals)
const companyMeals = ref([]);

// Table headers for the main event day table
const tablePref = {
  day: "Day",
  weekday: "Weekday", 
  registrationDay: "Registration Day",
  registrationWeekday: "Registration Weekday",
  registrationTime: "Registration Time"
};

// Table headers for the Meals Ordered table will be generated dynamically.
const mealsTable = ref({});

// Currently selected event day row
const selectedRow = ref(null);

// Placeholder for any table buttons
const tableButtons = ref([]);

// Fetch main event day data
const fetchData = () => {
  axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/event_day_meal', {
    auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }
  })
  .then((response) => {
    datab.value = response.data.events_days.map((event) => ({
      event_id: event.event_id,
      external_id: event.external_id,
      day: event.day,
      weekday: event.weekday,
      registrationDay: event.meal_registration_datetime
        ? event.meal_registration_datetime.split(" ")[0]
        : null,
      registrationTime: event.meal_registration_datetime
        ? event.meal_registration_datetime.split(" ")[1].slice(0, 5)
        : null,
      registrationWeekday: event.meal_registration_datetime
        ? new Date(
            event.meal_registration_datetime.split(" ")[0]
              .split("-")
              .reverse()
              .join("-")
          ).toLocaleDateString("en-US", { weekday: "long" })
        : null,
      dishes: event.dishes || []
    }));
    console.log("Main Table Data:", datab.value);
  })
  .catch(err => console.error('Fetch error:', err));
};

onMounted(fetchData);

// Fetch available dishes for the selected event day (for the detail popup)
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
    if (response.data.dishes && response.data.dishes.length) {
      selectedRow.value.dishes = response.data.dishes;
      error.value = "";
    } else {
      error.value = "No dishes available.";
    }
  } catch (err) {
    console.error("Fetch error:", err);
    error.value = "Failed to fetch dishes.";
  }
};

// Fetch and pivot company meals data for the Meals Ordered table.
// This endpoint returns only records for the given event_day_id.
const fetchCompanyMeals = async () => {
  if (!selectedRow.value || !selectedRow.value.event_id) {
    error.value = "No event selected.";
    return;
  }
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/get_all_dish_quantities?event_day_id=${selectedRow.value.event_id}`,
      {
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
        },
      }
    );
    console.log("Fetched Company Meals:", response.data);
    if (Array.isArray(response.data)) {
      const pivot = {};
      const dishSet = new Set();
      
      // Build pivot and collect dish names
      response.data.forEach(item => {
        dishSet.add(item.dish_name);
        if (!pivot[item.company_name]) {
          pivot[item.company_name] = { company: item.company_name };
        }
        // Use 0 if quantity is undefined, even if quantity is 0.
        pivot[item.company_name][item.dish_name] =
          item.quantity !== undefined ? item.quantity : 0;
      });
      
      // Ensure every company row has all dish columns (defaulting to 0 if missing)
      const dishArray = Array.from(dishSet);
      Object.values(pivot).forEach(row => {
        dishArray.forEach(dish => {
          if (row[dish] === undefined) {
            row[dish] = 0;
          }
        });
      });
      
      // Generate dynamic headers: first column "Company", then one per unique dish.
      const headers = { company: "Company" };
      dishArray.forEach(dish => {
        headers[dish] = dish;
      });
      mealsTable.value = headers;
      companyMeals.value = Object.values(pivot);
      
      // If the response has no records, then show "No Data Found"
      if (response.data.length === 0) {
        error.value = "No Data Found";
      } else {
        error.value = "";
      }
      console.log("Pivoted Meals Data:", companyMeals.value);
    } else {
      companyMeals.value = [];
      error.value = "No Data Found";
    }
  } catch (err) {
    
    companyMeals.value = [];
    
  }
};


// Watch for changes in the selected event day and fetch associated data.
watch(
  () => selectedRow.value?.event_id,
  (newEventDayId) => {
    if (newEventDayId) {
      fetchDishes(newEventDayId);
      fetchCompanyMeals();
    }
  }
);

// Callback when a row is selected from the main table.
function selectCallback(row) {
  selectedRow.value = row;
  if (row.event_id) {
    fetchDishes(row.event_id);
    fetchCompanyMeals();
  }
  console.log("Selected Event ID:", selectedRow.value.event_id);
}

// Add a new dish input in the Edit Modal.
function addDish() {
  newMeal.value.dishes.push({ name: "" });
}

// Submit new meal (adding new dishes).
function submitMeal() {
  // Trim and filter out any blank dish names.
  const validDishNames = newMeal.value.dishes
    .map(dish => dish.name.trim())
    .filter(name => name !== "");
    
  // Optionally, you could check if no dish is provided and then abort submission.
  if (validDishNames.length === 0) {
    console.error("No valid dish names provided. Aborting submission.");
    return;
  }

  const payload = {
    newDishes: {
      event_day_id: selectedRow.value.event_id,
      name: validDishNames
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
      fetchCompanyMeals();
      closeModal();
    })
    .catch(err => {
      console.error("Failed to add meal dishes:", err);
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

// Update event day information.
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
    }
  )
  .then(() => {
    fetchData();
    closeModal();
  })
  .catch(err => {
    console.error("Failed to update meal:", err);
  });
}

// Close modals.
function closeModal() {
  editModal.value = false;
  showMeal.value = false;
}

function closeCardInfo(){
  selectedRow.value = null;
}

// Open the Edit Modal with pre-filled data from the selected row.
function openModal() {
  editModal.value = true;
  newMeal.value = {
    regDay: selectedRow.value.registrationDay 
      ? selectedRow.value.registrationDay.split("-").reverse().join("-")
      : null,
    regHour: selectedRow.value.registrationTime?.slice(0, 5),
    dishes: selectedRow.value.dishes 
      ? selectedRow.value.dishes.map(dish => ({ name: dish.name }))
      : [{ name: "" }],
  };
}

// Optional: Define minDate and maxDate for the date input.
const minDate = computed(() => new Date().toISOString().split("T")[0]);
const maxDate = computed(() => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  return date.toISOString().split("T")[0];
});
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

.tableBackground {
  background-color: var(--c-accent);
  border-radius: 6px;
  min-height: 300px;
  
  display: flex;
  justify-content: center;  /* Centers horizontally */
  align-items: center;  /* Centers vertically */
}

.no-users-found {
  font-weight: 700;
  text-align: center;
  font-size: 1.2rem;
  color: darkgray;
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
  min-height: 70%;
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