<template>
  <div class="student-app-container">
    <div class="header">
      <div class="search-container" v-if="!showBannedPopup">
        <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M10.5 17a6.5 6.5 0 100-13 6.5 6.5 0 000 13z" />
        </svg>
        <input 
          type="text" 
          placeholder="Search for a student" 
          class="search-bar" 
          v-model="searchQuery" 
        />
      </div>
      <button class="btn-banned" v-if="!showBannedPopup" @click="toggleBannedPopup">
        Banned Students
      </button>
    </div>

    <!-- Banned Students Popup -->
    <div v-if="showBannedPopup" class="banned-popup">
      <div class="popup-content">
        <h2>Banned Students</h2>
        <TheTable
          :data="bannedStudents"
          :tableHeaders="bannedTableHeaders"
          :buttons="unbanButtons"
        />
      </div>
    </div>

    <!-- Main Content (Hidden when Banned Popup is active) -->
    <div class="content" v-if="!showBannedPopup">
      <div :class="['students-table-container', { 'full-width': !selectedStudent }]">
        <TheTable
          :data="filteredStudents"
          :tableHeaders="tableHeaders"
          :buttons="tableButtons"
          :searchInput="searchQuery"
          @onRowSelect="selectStudent"
        />
        <div v-if="!filteredStudents.length" class="no-students">
          No Students found
        </div>
      </div>
      <div class="student-detail" v-if="selectedStudent">
        <p class="username">{{ selectedStudent.username }}</p>
        <img class="profile-pic" src="../../assets/StudentApp/example_students_photo.svg" alt="Profile Picture" />
        <h3>{{ selectedStudent.name }}</h3>
        <p class="role">Student</p>
        <div class="student-actions">
          <div class="action-button">
            <img src="../../assets/StudentApp/students1.svg" alt="Icon 1">
          </div>
          <div class="action-button">
            <img src="../../assets/StudentApp/students2.svg" alt="Icon 2">
          </div>
          <div class="action-button">
            <img src="../../assets/StudentApp/students3.svg" alt="Icon 3">
          </div>
          <div class="action-button">
            <img src="../../assets/StudentApp/students4.svg" alt="Icon 4">
          </div>
        </div>
        <p class="email-title">Email</p>
        <p class="email">{{ selectedStudent.email }}</p>
        <p class="linkedin-title">LinkedIn</p>
        <p class="linkedin"><a :href="selectedStudent.linkedin">{{ selectedStudent.linkedin }}</a></p>
        <div class="points">
          <div>
            <p class="points-title">Current Points</p>
            <p class="points-value">{{ selectedStudent.currentPoints }}</p>
          </div>
          <div>
            <p class="points-title">Daily Points</p>
            <p class="points-value">{{ selectedStudent.dailyPoints }}</p>
          </div>
          <div>
            <p class="points-title">Total Points</p>
            <p class="points-value">{{ selectedStudent.totalPoints }}</p>
          </div>
        </div>
        <div class="status-degree">
          <div>
            <p class="status-title">CV Status</p>
            <p class="status-value">{{ selectedStudent.cvStatus }}</p>
          </div>
          <div>
            <p class="degree-title">Degree/School</p>
            <p class="degree-value">{{ selectedStudent.degree }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import TheTable from '../../global-components/TheTable.vue';

const showBannedPopup = ref(false);

const toggleBannedPopup = () => {
  showBannedPopup.value = !showBannedPopup.value;
};

// Sample banned students data
const bannedStudents = ref([
  { id: 1, name: 'André Santos', username: 'andregay', email: 'parkour_is_gay@proton.me' },
  { id: 2, name: 'André Santos 2', username: 'andregay 2', email: 'parkour_is_gay2@proton.me' },
  { id: 3, name: 'André Santos 3', username: 'andregay 3', email: 'parkour_is_gay3@proton.me' },
]);

const bannedTableHeaders = {
  id: "ID",
  name: "Name",
  username: "Username",
  email: "Email",
  unban: "Unban", // NÃO APARECE
};

const unbanButtons = [
  {
    render: () => {
      return `
        <div class="action-button icon-combination">
          <img class="icon-base" src="../../assets/StudentApp/students4.svg" alt="Icon Base">
          <img class="icon-overlay" src="../../assets/StudentApp/squads1.svg" alt="Icon Overlay">
        </div>
      `;
    },
    action: (row) => unbanStudent(row),
  },
];

const unbanStudent = (student) => {
  // Logic to unban student
  console.log('Unbanning student:', student);
};

const students = ref([
  {
    id: '1',
    name: 'André Santos',
    username: 'andregay',
    squad: 'parkour_is_gayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',
    dailyPoints: -1,
    totalPoints: -2,
    email: 'andregay@proton.me',
    linkedin: 'https://www.linkedin.com/andregay',
    currentPoints: 66,
    cvStatus: 'Approved',
    degree: 'BSc/IST',
  },
  {
    id: 2,
    name: 'André Santos Gonçalves Ferreira',
    username: 'andregay2andregay2andregay2',
    squad: 'parkour_is_gay2_parkour_is_gay2',
    dailyPoints: -1,
    totalPoints: -2,
    email: 'andregay2andregay2andregay2@proton.me',
    linkedin: 'https://www.linkedin.com/andregay2andregay2',
    currentPoints: 66,
    cvStatus: 'Approved',
    degree: 'BSc/IST',
  },
  {
    id: 3,
    name: 'Luna Ferreira',
    username: 'lunaferreira',
    squad: 'lu',
    dailyPoints: 5,
    totalPoints: 18,
    email: 'luna@ferreira.com.pt',
    linkedin: 'https://www.linkedin.com/lunaferreira',
    currentPoints: 87,
    cvStatus: 'Approved',
    degree: 'BSc/IST',
  },
  {
    id: 4,
    name: 'André Santos',
    username: 'andregay',
    squad: 'parkour_is_gay',
    dailyPoints: 43,
    totalPoints: 12,
    email: 'andregay@proton.me',
    linkedin: 'https://www.linkedin.com/andregay',
    currentPoints: 6896,
    cvStatus: 'Approved',
    degree: 'BSc/IST',
  },
  {
    id: 5,
    name: 'André Santos Gonçalves Ferreira',
    username: 'andregay2andregay2andregay2',
    squad: 'parkour_is_gay2_parkour_is_gay2',
    dailyPoints: -731,
    totalPoints: 0,
    email: 'andregay2andregay2andregay2@proton.me',
    linkedin: 'https://www.linkedin.com/andregay2andregay2',
    currentPoints: 413,
    cvStatus: 'Approved',
    degree: 'BSc/IST',
  },
  {
    id: 6,
    name: 'Luna Ferreira',
    username: 'lunaferreira',
    squad: 'lu',
    dailyPoints: 5652,
    totalPoints: 1,
    email: 'luna@ferreira.com.pt',
    linkedin: 'https://www.linkedin.com/lunaferreira',
    currentPoints: 90,
    cvStatus: 'Approved',
    degree: 'BSc/IST',
  },
  {
    id: 7,
    name: 'André Santos',
    username: 'andregay',
    squad: 'parkour_is_gay',
    dailyPoints: -1,
    totalPoints: -2,
    email: 'andregay@proton.me',
    linkedin: 'https://www.linkedin.com/andregay',
    currentPoints: 66,
    cvStatus: 'Approved',
    degree: 'BSc/IST',
  },
  {
    id: 8,
    name: 'André Santos Gonçalves Ferreira',
    username: 'andregay2andregay2andregay2',
    squad: 'parkour_is_gay2_parkour_is_gay2',
    dailyPoints: -1,
    totalPoints: -2,
    email: 'andregay2andregay2andregay2@proton.me',
    linkedin: 'https://www.linkedin.com/andregay2andregay2',
    currentPoints: 66,
    cvStatus: 'Approved',
    degree: 'BSc/IST',
  },
  {
    id: 9,
    name: 'Luna Ferreira',
    username: 'lunaferreira',
    squad: 'lu',
    dailyPoints: 5,
    totalPoints: 18,
    email: 'luna@ferreira.com.pt',
    linkedin: 'https://www.linkedin.com/lunaferreira',
    currentPoints: 87,
    cvStatus: 'Approved',
    degree: 'BSc/IST',
  },
  {
    id: 10,
    name: 'André Santos',
    username: 'andregay',
    squad: 'parkour_is_gay',
    dailyPoints: -1,
    totalPoints: -2,
    email: 'andregay@proton.me',
    linkedin: 'https://www.linkedin.com/andregay',
    currentPoints: 66,
    cvStatus: 'Approved',
    degree: 'BSc/IST',
  },
  {
    id: 11,
    name: 'André Santos Gonçalves Ferreira',
    username: 'andregay2andregay2andregay2',
    squad: 'parkour_is_gay2_parkour_is_gay2',
    dailyPoints: -1,
    totalPoints: -2,
    email: 'andregay2andregay2andregay2@proton.me',
    linkedin: 'https://www.linkedin.com/andregay2andregay2',
    currentPoints: 66,
    cvStatus: 'Approved',
    degree: 'BSc/IST',
  },
  {
    id: 12,
    name: 'Luna Ferreira',
    username: 'lunaferreira',
    squad: 'lu',
    dailyPoints: 5,
    totalPoints: 18,
    email: 'luna@ferreira.com.pt',
    linkedin: 'https://www.linkedin.com/lunaferreira',
    currentPoints: 87,
    cvStatus: 'Approved',
    degree: 'BSc/IST',
  },
  // Add students
]);

const searchQuery = ref('');
const selectedStudent = ref(null);

const tableHeaders = {
  id: "ID",
  name: "Name",
  username: "Username",
  squad: "Squad",
  dailyPoints: "Daily Points",
  totalPoints: "Total Points"
};

const filteredStudents = computed(() => {
  if (!searchQuery.value.trim()) {
    // If the search query is empty or just spaces, return all students
    return students.value;
  }

  return students.value.filter(student =>
    student.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    student.username.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const selectStudent = (student) => {
  selectedStudent.value = student;
};
</script>

<style scoped>
/* Style for all table headers in the current component - NÃO FUNCIONA */
th {
  color: #424242;
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
}

.student-app-container {
  background: #FFFFFF;
  display: flex;
  flex-direction: column; 
  width: 100%;
  margin: auto;
  padding: 60px 50px 50px 50px;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem; 
}

.search-container {
  position: relative;
  background-color: #EBF6FF; 
  position: relative;
  width: 87%; 
  max-width: 1500px; 
  height: 49px; 
  border-radius: 8px; 
  padding: 16px, 20px, 16px, 16px; 
}

.search-icon {
  position: absolute;
  color: #8A8A8A;
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
}

.search-bar {
  color: #8A8A8A;
  width: 100%;
  height: 49px;
  padding: 16px 20px 16px 50px;
  border: none;
  border-radius: 8px;
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 14px; 
  font-weight: 500;
  line-height: 17.36px; 
  background-color: #EBF6FF;
}

.btn-banned {
  width: 120px;
  height: 41px;
  background-color: #509CDB;
  color: #FFFFFF;
  border: none; 
  border-radius: 4px;
  padding: 12px 0px;
  cursor: pointer;
  font-family: 'Kumbh Sans', sans-serif; 
  font-weight: 600; 
  font-size: 14px;
  line-height: 17.36px; 
  text-align: center; 
  display: flex;
  justify-content: center; 
  align-items: center; 
}

.banned-popup {
  display: flex;
  justify-content: center;
  align-items: center;
}

.banned-popup > div {
  width: 100%;
  max-width: 950px;
}

.banned-popup h2 {
  font-size: 32px;
  font-weight: 600;
  line-height: 39.69px;
  text-align: left;
  margin-bottom: 40px;
}

.icon-combination {
  position: relative;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-base {
  width: 100%;
  height: 100%;
  position: relative;
}

.icon-overlay {
  position: absolute;
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 70%;
  z-index: 1;
}

.content {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start; 
}

.students-table-container {
  flex: 1;
  height: calc(100vh - 40px - 250px); 
  overflow-y: auto;
  position: relative;
}

.student-actions {
  display: flex;
  justify-content: center;
  gap: 6px;
}

.action-button {
  background-color: #FFFFFF;
  display: flex;
  width: 36px;
  height: 36px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  color: #1A1A1A;
}

.action-button img {
  width: 20px;
  height: 20px;
}

.no-students {
  display: flex;
  background-color: #EBF6FF;
  font-size: 28px;
  width: 100%; 
  max-width: 1500px; 
  height: calc(100vh - 80px - 250px); 
  padding: 2rem;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #4F4F4F;
  border-radius: 8px;
  margin: -2rem auto; /* POSSO FAZER ISTO? */
  box-sizing: border-box; 
}

.student-detail {
  display: flex;
  background-color: #EBF6FF;
  width: 323px;
  height: calc(100vh - 40px - 250px); 
  border-radius: 16px;
  padding: 35px;
  flex-direction: column;
  align-items: center;
  margin: 0; 
  text-align: center; 
  max-height: 100vh;
  overflow-y: auto; 
}

h3 {
  color: #1A1A1A;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  line-height: 29.77px; 
  word-wrap: break-word; 
  max-width: 100%;
  margin-top: 10px; 
}

.username {
  color: #424242;
  font-size: 24px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 10px;
  word-wrap: break-word; 
  max-width: 100%;
}

.role {
  color: #A7A7A7;
  font-size: 18px;
  width: 108px;
  height: 22px;
  font-weight: 500;
  text-align: center;
  line-height: 22.32px; 
  margin: 10px 0;
}

.email-title, .linkedin-title {
  color: #1A1A1A;
  font-size: 12px;
  text-align: left;
  width: 100%; 
  font-weight: 600;
  margin: 5px 0;
  margin-bottom: 10px; 
}

.points-title, .status-title, .degree-title {
  color: #1A1A1A;
  font-size: 12px;
  text-align: left; 
  width: 100%; 
  font-weight: 700;
  margin: 5px 0;
  margin-bottom: 10px;  
}

.email, .linkedin, .points-value, .status-value, .degree-value {
  color: #A7A7A7;
  font-size: 14px;
  text-align: left; 
  width: 100%;
  font-weight: 500;
  margin: 5px 0;
  word-wrap: break-word;
}

.linkedin a {
  color: #A7A7A7;
  text-decoration: none;
}

.student-actions {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.points {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.status-degree {
  display: flex;
  justify-content: space-around;
  width: 100%; 
}

.status-degree div {
  text-align: left;
  width: 100%;
}
</style>
  
