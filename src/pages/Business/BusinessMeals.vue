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
      <img src="../../assets/wrizz.jpg" alt="Profile Image" class="pfp">
      <h2>{{ selectedRow.day }}</h2>
      <p :style="{ color: 'gray', fontSize: '18px' }">Meal</p>
      <div class="cardActions">
        <button class="edit-button" type="button" @click="editModal = true">
          <img src="../../assets/pencil.svg">
        </button>
        <button class="meal-button" type="button" @click="showMeal = true">
          <img src="../../assets/meal_btn.svg">
        </button>
      </div>
      
      <div class="cardInfo">
        <div class="cardInfoMember">
          <p class="cardInfoLabel">Dishes Available</p>
          <!-- Check if 'name' is an array and iterate, else display it as a single dish -->
          <div v-if="Array.isArray(selectedRow.name)">
            <div v-for="(dish, index) in selectedRow.name" :key="index">
              <p class="cardInfoValue">Dish {{ index + 1 }}: {{ dish }}</p>
            </div>
          </div>
          <div v-else>
            <p class="cardInfoValue">Dish: {{ selectedRow.name }}</p>
          </div>
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
              v-model="newUser.regDay" 
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
              v-model="newUser.regHour" 
              id="regHour" 
              required 
            />
          </div>
        </div>

        <!-- Dishes Section -->
        <div class="formRole">
          <div v-for="(dish, index) in newUser.dishes" :key="index" class="form-group">
            <!-- Dynamic label for each dish -->
            <label :for="'dish' + index">Dish {{ index + 1 }}</label>
            <input v-model="newUser.dishes[index]" :id="'dish' + index" placeholder="Enter Dish Name" required />
          </div>
        </div>

        <!-- Button to add a new dish input -->
        <div class="addDish">
          <button type="button" class="btn-primary" @click="addDish">Add Dish</button>
        </div>

        <!-- Modal actions -->
        <div class="modal-actions">
          <button type="submit" class="btn-primary">Save</button>
          
        </div>
      </form>
    </div>
  </div>

  <div v-if="showMeal" class="modal-overlay">
    <div class="modal">
      <button class="close-popup" @click="closeMeal()">&times;</button>
      <h2>Meals Ordered</h2>
      <div class="table">
      <TheTable
        :data="datab"
        :tableHeaders="tablePref"
        :searchInput="message"
        :buttons="tableButtons"
        @onRowSelect="selectCallback"
      ></TheTable>
    </div>
    </div>
  </div>


</template>


<script setup>
import { ref } from 'vue';
import TheTable from '../../global-components/TheTable.vue';

const message = ref('');
const editModal = ref(false);  // Modal visibility
const showMeal = ref(false);
const newUser = ref({
  regDay: '',
  regHour: '',
  role: '',
  dishes: ['']  // Initially one dish input field
});
const selectedRow = ref(null);  // Track the selected row


// Callback for row selection in the table
function selectCallback(row) {
  selectedRow.value = row;

}
function addDish() {
  newUser.value.dishes.push('');  // Add an empty string for a new dish input
}
// Function to handle adding a new user
function addUser() {
  closeModal();
}

// Function to close the modal
function closeModal() {
  editModal.value = false;
 
  newUser.value = { regDay: '', regHour: '', role: '', dishes: [''] };  // Reset form fields
}
function closeMeal(){
  showMeal.value = false;
 
}

function closeCardInfo(){
  selectedRow.value = null;
}



const datab = ref([
  {
    day: "07-05-2025",
    weekday: "Monday",
    registrationDay: "--:--",
    registrationTime: "--:--",
    registrationWeekday: "--:--"    
  },
  {
    day: "08-05-2025",
    weekday: "Tuesday",
    registrationDay: "--:--",
    registrationTime: "--:--",
    registrationWeekday: "--:--"    
  },
  {
    day: "09-05-2025",
    weekday: "Wednesday",
    registrationDay: "--:--",
    registrationTime: "--:--",
    registrationWeekday: "--:--"    
  },
  {
    day: "10-05-2025",
    weekday: "Thursday",
    registrationDay: "--:--",
    registrationTime: "--:--",
    registrationWeekday: "--:--"    
  },
  {
    day: "11-05-2025",
    weekday: "Friday",
    registrationDay: "--:--",
    registrationTime: "--:--",
    registrationWeekday: "--:--"    
  },
]);

const tablePref = {
  day: "Day",
  weekday: "Weekday", 
  registrationDay: "Registration Day",
  registrationTime: "Registration Time",
  registrationWeekday: "Registration Weekday"
  
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
  width: 10rem;
  height: 10rem;
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
  margin-top: 1rem;
  
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
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.right-popup-placeholder .cardInfoLabel {
  font-size: 1.1rem;
  font-weight: 500;
  color: #555;
  margin-bottom: 5px;
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
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent gray */
    z-index: 500; /* Behind the popup */
}
  /* Adjust the table to fit smaller screens */
  .table {
    width: 100%;
    padding-right: 1ch;
    gap: 1ch;
  }

  /* Make the right popup stack below the table */
  .right-popup-placeholder {
    position: fixed; /* Position the popup above the content */
    top: 50%; /* Vertically center */
    left: 50%; /* Horizontally center */
    transform: translate(-50%, -50%); /* Adjust the position to be truly centered */
    width: 90%; /* Adjust width to fit on smaller screens */
    height: calc(97dvh - var(--header-height)); /* Let the height adapt to content */
    background-color: #eef4fb; /* Add background for better visibility */
    padding: 1rem;
    box-shadow: 0px 4px 10px rgba(0.1, 0.1, 0.1, 0.1); /* Add shadow for a popup effect */
    z-index: 1000; /* Ensure it stays above other content */
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

  /* Adjust modal width for mobile */
  .modal {
    width: 90%;
    max-width: none;
    padding: 1.5rem;
  }

  .btn-primary, .btnCancel {
    width: 100%;  /* Buttons span full width on mobile */
    margin-top: 10px;
  }

  .formReg, .formRole {
    flex-direction: column;
    gap: 1rem;
  }

  /* Adjust form inputs for smaller screens */
  input {
    width: 100%;
    padding: 8px;
  }
}


</style>