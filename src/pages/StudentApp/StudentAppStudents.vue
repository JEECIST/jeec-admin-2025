<template>
  <div class="student-app-container">
    <div class="header">
      <div class="search-container">
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
      <button class="btn-banned">Banned Students</button>
    </div>
    <div class="content">
      <!-- <pre>{{ filteredStudents }}</pre>

      <ul>
  <li v-for="student in filteredStudents" :key="student.id">
    {{ student.name }} ({{ student.username }})
  </li>
</ul> -->
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
        <div class="profile-pic"></div>
        <h3>{{ selectedStudent.name }}</h3>
        <p class="role">Student</p>
        <div class="student-actions">
          <div class="action-button">
            <img :src="students1Icon" alt="Icon 1">
          </div>
          <div class="action-button">
            <img :src="students2Icon" alt="Icon 2">
          </div>
          <div class="action-button">
            <img :src="students3Icon" alt="Icon 3">
          </div>
          <div class="action-button">
            <img :src="students4Icon" alt="Icon 4">
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

// import students1Icon from '../assets/students/students1.svg';
// import students2Icon from '../assets/students/students2.svg';
// import students3Icon from '../assets/students/students3.svg';
// import students4Icon from '../assets/students/students4.png';

const students = ref([
  {
    id: 1,
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
    name: 'André Santos 2',
    username: 'andregay2',
    squad: 'parkour_is_gay2',
    dailyPoints: -1,
    totalPoints: -2,
    email: 'andregay2@proton.me',
    linkedin: 'https://www.linkedin.com/andregay2',
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
.student-app-container {
  display: flex;
  flex-direction: column; /* Vertical stacking */
  width: 100%;
  margin: auto;
  background: #FFFFFF;
  padding: 50px; 
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem; /* Using rem for spacing */
}

.search-container {
  position: relative;
  width: 85%; 
  max-width: 1000px; 
  height: 49px; 
  background-color: #EBF6FF; 
  border-radius: 8px; /* quanto? */
  padding: 16px, 20px, 16px, 16px; 
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #8A8A8A;
}

.search-bar {
  width: 100%;
  height: 49px;
  padding: 16px 20px 16px 40px;
  border: none;
  border-radius: 4px;
  color: #8A8A8A;
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

.content {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.students-table-container {
  flex: 1;
  overflow-x: auto;
}

.students-table-container.full-width {
  width: 100%;
}

.student-actions {
  display: flex;
  justify-content: center;
  gap: 6px;
}

.action-button {
  width: 36px;
  height: 36px;
  border: none;
  cursor: pointer;
  background-color: #FFFFFF;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1A1A1A;
}

.action-button img {
  width: 20px;
  height: 20px;
}

.no-students {
  width: 100%; 
  height: calc(100vh - 100px); /* viewport height - padding for the header */
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: #4F4F4F;
  background-color: #EBF6FF;
  border-radius: 8px;
  margin: 2rem auto; 
  box-sizing: border-box; 
}

.student-detail {
  width: 313px;
  height: auto; 
  background-color: #EBF6FF;
  border-radius: 16px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto; 
  text-align: center; 
}

.profile-pic {
  width: 150px;
  height: 150px;
  background-color: #509CDB;
  border-radius: 50%;
  object-fit: cover;
}

h3 {
  width: 159px;
  height: 30px;
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  color: #1A1A1A;
  line-height: 29.77px; 
}

.username {
  width: 133px;
  height: 30px;
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 24px;
  font-weight: 800;
  line-height: 29.77px; 
  text-align: center;
  color: #424242;
}

.role {
  width: 108px;
  height: 22px;
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  color: #A7A7A7;
  margin: 10px 0;
  line-height: 22.32px; 
}

.email-title, .linkedin-title {
  font-size: 12px;
  font-weight: 600;
  color: #1A1A1A;
  margin: 10px 0 0;
  text-align: left;
  width: 100%; 

}

.points-title, .status-title, .degree-title {
  height: 15px;
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #1A1A1A;
  line-height: 14.88px; 
  text-align: left; 
  width: 100%; 
}

.email, .linkedin, .points-value, .status-value, .degree-value {
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #A7A7A7;
  margin: 5px 0;
  text-align: left; 
  width: 100%;
}

.linkedin a {
  color: #A7A7A7;
  text-decoration: none;
}

.student-actions {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: 10px; /* Space before email section */
}

.action-button {
  width: 36px;
  height: 36px;
  border: none;
  cursor: pointer;
  background-color: #FFFFFF;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1A1A1A;
}

.points {
  display: flex;
  justify-content: space-between;
  width: 100%; 
  padding: 20px 0;
  font-family: 'Kumbh Sans', sans-serif;
}

.status-degree {
  display: flex;
  justify-content: space-around;
  width: 100%; 
}

.points div, .status-degree div {
  text-align: left;
  width: 100%;
}

.points-title, .points-value, .status-title, .status-value, .degree-title, .degree-value {
  margin: 10;
}
</style>
