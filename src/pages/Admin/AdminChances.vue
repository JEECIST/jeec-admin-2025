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
              v-for="opt in secondaryOptions" :key="opt.value" :value="opt.value">
              {{ opt.text }}
            </option>
          </select>

        <button class="topbtn" @click="showWheel = true">Spin the Wheel</button>
      </div>
    </div>

    <div class="table"  v-if="!loading">
      <TheTable
        :data="tableData"
        :tableHeaders="headers"
        :searchInput="searchQuery"
      />
    </div>

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

// ========== STATE ==========
const searchQuery = ref("");
const option_selected = ref("daily");
const secondary_selected = ref("");
const showWheel = ref(false);
const loading = ref(false);
const tableData = ref([]);
const winner = ref(null);

const options = ref([
  { text: "Sorteio Diário", value: "daily" },
  { text: "Sorteio Semanal", value: "weekly" },
  { text: "Prémio CV", value: "cv" },
  { text: "Prémio Atividades", value: "activities" },
]);

const PRIZE_CONFIG = {
  daily:              { prize_type: "student_daily",        prize_id: 1 },
  weekly_individual:  { prize_type: "student_weekly",       prize_id: 2 },
  weekly_squads:      { prize_type: "squad_weekly",         prize_id: 3 },
  cv:                 { prize_type: "cv",                   prize_id: 4 },
  activity_15_15:     { prize_type: "activity_15_15",       prize_id: 5 },
  activity_inside:    { prize_type: "activity_inside_talks",prize_id: 6 },
  activity_workshops: { prize_type: "activity_workshops",   prize_id: 7 },
};

const secondaryOptions = computed(() => {
  if (option_selected.value === "weekly") {
    return [
      { text: "Individual", value: "individual" },
      { text: "Squads", value: "squads" },
    ];
  }
  if (option_selected.value === "activities") {
    return [
      { text: "15/15", value: "15/15" },
      { text: "Inside Talks", value: "inside_talks" },
      { text: "Workshops", value: "workshops" },
    ];
  }
  return [];
});

// ========== FETCH FUNCTIONS ==========
const onMainChange = () => {
  if (option_selected.value === "weekly") {
    secondary_selected.value = "individual";
  } else if (option_selected.value === "activities") {
    secondary_selected.value = "15/15";
  } else {
    secondary_selected.value = "";
  }
  fetchAllByOption();
};

const fetchAllByOption = async () => {
  if (option_selected.value === "daily") {
    await fetchAllFromStudentsDailyPoints();
    return;
  }

  if (option_selected.value === "weekly") {
    if (secondary_selected.value === "individual") {
      await fetchAllFromStudentsTotalPoints();
    } else if (secondary_selected.value === "squads") {
      await fetchAllFromSquadsTotalPoints(); 
    }
    return;
  }

  if (option_selected.value === "cv") {
    await fetchAllFromApprovedCV();
    return;
  }

  if (option_selected.value === "activities") {
    if (secondary_selected.value === "15/15") {
      await fetchAllFromActivity15_15();
    } else if (secondary_selected.value === "inside_talks") {
      await fetchAllFromActivityInsideTalks();
    } else if (secondary_selected.value === "workshops") {
      await fetchAllFromActivityWorkshops();
    }
    return;
  }

  tableData.value = [];
};


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

const fetchAllFromActivity15_15 = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/get_students_from_activity_15_15`,
      {
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
        },
      }
    );

    const students = response.data.students || [];
    const n = students.length || 1;
    const chance = (100 / n).toFixed(2) + " %";

    tableData.value = students.map((s) => ({
      ...s,
      win_chance: chance,
    }));
  } catch (error) {
    console.error("Error fetching 15/15 students:", error);
    alert("Failed to fetch students from activity 15/15.");
  }
};

const fetchAllFromActivityInsideTalks = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/get_students_from_activity_inside_talks`,
      {
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
        },
      }
    );

    const students = response.data.students || [];
    const n = students.length || 1;
    const chance = (100 / n).toFixed(2) + " %";

    tableData.value = students.map((s) => ({
      ...s,
      win_chance: chance,
    }));
  } catch (error) {
    console.error("Error fetching Inside Talks students:", error);
    alert("Failed to fetch students from Inside Talks.");
  }
};

const fetchAllFromActivityWorkshops = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/get_students_from_activity_workshops`,
      {
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
        },
      }
    );

    const students = response.data.students || [];
    const n = students.length || 1;
    const chance = (100 / n).toFixed(2) + " %";

    tableData.value = students.map((s) => ({
      ...s,
      win_chance: chance,
    }));
  } catch (error) {
    console.error("Error fetching Workshops students:", error);
    alert("Failed to fetch students from Workshops.");
  }
};

const getCurrentPrizeKey = () => {
  if (option_selected.value === "daily") return "daily";

  if (option_selected.value === "weekly") {
    if (secondary_selected.value === "individual") return "weekly_individual";
    if (secondary_selected.value === "squads") return "weekly_squads";
  }

  if (option_selected.value === "cv") return "cv";

  if (option_selected.value === "activities") {
    if (secondary_selected.value === "15/15") return "activity_15_15";
    if (secondary_selected.value === "inside_talks") return "activity_inside";
    if (secondary_selected.value === "workshops") return "activity_workshops";
  }

  return null;
};

const saveStudentWinner = async (winnerData) => {
  const key = getCurrentPrizeKey();
  if (!key || !PRIZE_CONFIG[key]) {
    alert("Invalid prize configuration");
    return;
  }

  const { prize_type, prize_id } = PRIZE_CONFIG[key];

  const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");
  const payload = {
    winners: [
      {
        created_at: createdAt,
        prize_id,
        prize_type,
        winner_username: winnerData.username,
      },
    ],
  };

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/save_winner`,
      payload,
      {
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
        },
      }
    );

    if (response.data && response.data.error) {
      if (response.data.error === "") {
        alert("Winner saved!");
      } else {
        alert(response.data.error);
      }
    } else {
      alert("Winner saved!");
    }
  } catch (error) {
    console.error("Error saving winner:", error);
    alert("Failed to save winner!");
  }
};


const saveSquadWinners = async (winnerData) => {
  const key = getCurrentPrizeKey();
  if (!key || !PRIZE_CONFIG[key]) {
    alert("Invalid prize configuration");
    return;
  }

  const { prize_type, prize_id } = PRIZE_CONFIG[key];
  const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/get_students_from_squad`,
      {
        params: { squad_external_id: winnerData.external_id },
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
        },
      }
    );

    const studentsInSquad = response.data.students || [];

    const winners = studentsInSquad.map((student) => ({
      created_at: createdAt,
      prize_id,
      prize_type,
      winner_username: student.username,
    }));

    const payload = { winners };

    const saveResponse = await axios.post(
      `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/save_winner`,
      payload,
      {
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
        },
      }
    );

    if (saveResponse.data && saveResponse.data.error) {
      if (saveResponse.data.error === "") {
        alert("Squad prize winners saved!");
      } else {
        alert(saveResponse.data.error);
      }
    } else {
      alert("Squad prize winners saved!");
    }
  } catch (error) {
    console.error("Error saving squad prize winners:", error);
    alert("Failed to save squad prize winners!");
  }
};


const saveWinnerToBackend = async (winnerData) => {
  if (option_selected.value === "weekly" && secondary_selected.value === "squads") {
    await saveSquadWinners(winnerData);
  } else {
    await saveStudentWinner(winnerData);
  }
};



// ========== HEADERS ==========
const isMobile = ref(false);
const headers = computed(() => {
  // Daily: sempre pontos + username (students)
  if (option_selected.value === "daily") {
    return isMobile.value
      ? { name: "Name", daily_points: "Daily Points", win_chance: "Win Chance" }
      : { name: "Name", username: "Username", daily_points: "Daily Points", win_chance: "Win Chance" };
  }

  if (option_selected.value === "weekly" && secondary_selected.value === "individual") {
    return isMobile.value
      ? { name: "Name", total_points: "Total Points", win_chance: "Win Chance" }
      : { name: "Name", username: "Username", total_points: "Total Points", win_chance: "Win Chance" };
  }

  if (option_selected.value === "weekly" && secondary_selected.value === "squads") {
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

// ========== WHEEL ==========
function handleWinner(result) {
  console.log("Vencedor:", winner);
  winner.value = result;

  //FZR depois - enviar o vencedor para o backend
}

// ========== LIFECYCLE ==========
onMounted(() => {
  fetchAllByOption();
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
