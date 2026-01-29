<template>
  <div class="wrapper">
    <div class="searchbar-and-bottons">
      <div class="topbar">
        <form>
          <label>
            <img src="../../assets/search.svg" />
          </label>
          <input v-model="searchQuery" placeholder="Search for a student or squad" />
        </form>

        <select class="selection-box" v-model="option_selected" @change="onMainChange">
          <option v-for="option in options" :key="option.value" :value="option.value">
            {{ option.text }}
          </option>
        </select>

         <select v-if="option_selected === 'weekly' || option_selected === 'activities'" 
                class="selection-box second-select" v-model="secondary_selected" @change="fetchAllByOption">
            <option
              v-for="opt in secondaryOptions" :key="opt.id" :value="opt">
              {{ opt.name }}
            </option>
          </select>

        <button class="topbtn" @click="showWheel = true">Spin the Wheel</button>
      </div>
    </div>

    <div v-if="option_selected === 'activities'">
      <h2>{{ secondary_selected.name }}</h2>
      <h2>{{ secondary_selected.type }}</h2>
      <h2>{{ secondary_selected.time }} - {{ secondary_selected.end_time }}</h2>
    </div>

    <TheTable
      :data="tableData"
      :tableHeaders="headers"
      :searchInput="searchQuery"
    />
   

    <transition name="fade">
    <div v-if="showWheel" class="modal-overlay">
      <div class="modal-content">
        <button class="close-btn" @click="showWheel = false">X</button>
        <TheWheel
          :participants="tableData"
          @winner="handleWinner"
          @save-winner="saveWinnerToBackend"
          @close="showWheel = false"
        />
      </div>
    </div>
    </transition>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, computed, onMounted, onUnmounted } from "vue";
import TheWheel from "../../global-components/TheWheel.vue";
import TheTable from "../../global-components/TheTable.vue";

const isMobile = ref(false);

const searchQuery = ref("");
const option_selected = ref("");
const secondary_selected = ref({});
const showWheel = ref(false);
const loading = ref(false);
const tableData = ref([]);
const winner = ref(null);

const actual_activities = ref([]);

const options = ref([
  { text: "Sorteio Diário", value: "daily" },
  { text: "Sorteio Semanal", value: "weekly" },
  { text: "Prémio CV", value: "cv" },
  { text: "Prémio Atividades", value: "activities" },
]);

const secondaryOptions = computed(() => {
  if (option_selected.value === "weekly") {
    return [
      { name: "Individual", id: "individual" },
      { name: "Squads", id: "squads" },
    ];
  }
  if (option_selected.value === "activities") {
    return actual_activities.value;
  }
  return [];
});


const onMainChange = () => {
  secondary_selected.value = {};
  tableData.value = [];
  if (option_selected.value === "weekly") {
    secondary_selected.value.id = "individual";
  } else if (option_selected.value === "activities") {
    fetchActualActivities();
  } 
  fetchAllByOption();
};

const fetchAllByOption = async () => {
  if (option_selected.value === "daily") {
    await fetchAllFromStudentsDailyPoints();
    return;
  }

  if (option_selected.value === "weekly") {
    if (secondary_selected.value.id === "individual") {
      await fetchAllFromStudentsTotalPoints();
    } else if (secondary_selected.value.id === "squads") {
      await fetchAllFromSquadsTotalPoints(); 
    }
    return;
  }

  if (option_selected.value === "cv") {
    await fetchAllFromApprovedCV();
    return;
  }

  if (option_selected.value === "activities") {
    if (secondary_selected.value.id !== ""){
      await fetchAllByActivity();
    }
    return;
  }

  tableData.value = [];
};


const fetchActualActivities = async () => {
  const response = await axios.get(
      `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/activities_vue_for_qr`, //ignore the name of endpoint, it does the same for getting actual activities
      {
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
        },
      }
    );
  actual_activities.value = response.data.activities;
}

const fetchAllByActivity = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/get_activity_participants`, 
      {activity_id: secondary_selected.value.id},
      {
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
        },
      }
    );

    const participants = response.data.participants || [];
    const n = participants.length || 1;

    tableData.value = participants.map((s) => ({
      ...s,
      win_chance: (100 / n).toFixed(2) + " %",
    }));
}


const fetchAllFromStudentsDailyPoints = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/get_students_with_daily_points`,
      {
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
        },
      }
    );

    const students = response.data.students || [];
    const totalPoints = students.reduce((sum, s) => sum + s.daily_points, 0);

    tableData.value = students.map((s) => ({
      ...s,
      win_chance:
        totalPoints > 0 ? ((s.daily_points / totalPoints) * 100).toFixed(2) + " %" : "0 %",
    }));
  } catch (error) {
    console.error("Error fetching students:", error);
    alert("Failed to fetch students with daily points.");
  }
};

const fetchAllFromStudentsTotalPoints = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/get_students_with_points`,
      {
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
        },
      }
    );

    const students = response.data.students || [];
    const totalPointsSum = students.reduce((sum, s) => sum + s.total_points, 0);

    tableData.value = students.map((s) => ({
      ...s,
      win_chance:
        totalPointsSum > 0
          ? ((s.total_points / totalPointsSum) * 100).toFixed(2) + " %"
          : "0 %",
    }));
  } catch (error) {
    console.error("Error fetching weekly students:", error);
    alert("Failed to fetch students with total points.");
  }
};

const fetchAllFromSquadsTotalPoints = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/get_squads_with_points`,
      {
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
        },
      }
    );

    const squads = response.data.squads || [];
    const totalPointsSum = squads.reduce((sum, s) => sum + s.total_points, 0);

    tableData.value = squads.map((s) => ({
      ...s,
      win_chance:
        totalPointsSum > 0 ? ((s.total_points / totalPointsSum) * 100).toFixed(2) + " %" : "0 %",
    }));
  } catch (error) {
    console.error("Error fetching weekly squads:", error);
    alert("Failed to fetch squads with total points.");
  }
};

const fetchAllFromApprovedCV = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/get_students_with_approved_cv`,
      {
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
        },
      }
    );

    const students = response.data.students || [];
    const n = students.length || 1;

    tableData.value = students.map((s) => ({
      ...s,
      win_chance: (100 / n).toFixed(2) + " %",
    }));
  } catch (error) {
    console.error("Error fetching CV students:", error);
    alert("Failed to fetch students with approved CV.");
  }
};


const headers = computed(() => {
  if (option_selected.value === "daily") {
    return isMobile.value
      ? { name: "Name", daily_points: "Daily Points", win_chance: "Win Chance" }
      : { name: "Name", username: "Username", daily_points: "Daily Points", win_chance: "Win Chance" };
  }

  if (option_selected.value === "weekly" && secondary_selected.value.id === "individual") {
    return isMobile.value
      ? { name: "Name", total_points: "Total Points", win_chance: "Win Chance" }
      : { name: "Name", username: "Username", total_points: "Total Points", win_chance: "Win Chance" };
  }

  if (option_selected.value === "weekly" && secondary_selected.value.id === "squads") {
    return {name: "Name", total_points: "Total Points", win_chance: "Win Chance"};
  }

  if (option_selected.value === "cv" || option_selected.value === "activities") {
    return isMobile.value
      ? { name: "Name", win_chance: "Win Chance" }
      : { name: "Name", username: "Username", win_chance: "Win Chance" };
  }

  // Fallback
  return isMobile.value
    ? { name: "Name", win_chance: "Win Chance" }
    : { name: "Name", username: "Username", win_chance: "Win Chance" };
});


const updateIsMobile = () => {
  isMobile.value = window.matchMedia("(max-width: 768px)").matches;
};

function handleWinner(result) {
  console.log("Vencedor:", winner);
  winner.value = result;

  //FZR depois - enviar o vencedor para o backend
}

onMounted(() => {
  // fetchAllByOption();
  updateIsMobile();
  window.addEventListener("resize", updateIsMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateIsMobile);
});
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  height: calc(100dvh - var(--header-height));
  padding: 5ch 3ch 3ch 3ch;
  overflow-y: hidden;
  gap: 3ch;
}

.topbar {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

form {
  flex: 1;
  display: flex;
  width: 60%;
  background-color: var(--c-accent);
  height: 50px;
  align-items: center;
  gap: 1ch;
  padding-left: 1ch;
  border-radius: 10px;
}

form > input {
  appearance: none;
  background: transparent;
  border: 0;
  color: var(--c-ft-semi-light);
  font-size: 1rem;
  height: 100%;
  outline: none;
  width: 100%;
}

.selection-box {
  height: 50px;
  border: 1px solid #8a8a8a;
  border-radius: 4px;
  font-family: "Kumbh Sans", sans-serif;
  padding: 1px 1px;
  font-size: 0.95rem;
  color: #8a8a8a;
  background-color: #ffffff;
  cursor: pointer;
  width: 14%;
}

.topbtn {
  background-color: var(--c-select);
  color: white;
  border: none;
  border-radius: 7px;
  height: 50px;
  width: 14%;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
}

/* ========== MODAL ========== */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 600px;
  max-height: 90vh;
  overflow-y: visible;
  position: relative;
  text-align: center;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.loading {
  text-align: center;
  font-weight: 600;
  padding: 2rem;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.winner-text {
  margin-top: 1.5rem;
  font-size: 1.2rem;
  color: #2c3e50;
  font-weight: bold;
}
</style>
