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
          <div class="action-button">1</div>
          <div class="action-button">2</div>
          <div class="action-button">3</div>
          <div class="action-button">4</div>
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

        <!-- <div class="student-actions">
          <button class="action-button"><img src="path/to/icon1.png" alt="Action 1"></button>
          <button class="action-button"><img src="path/to/icon2.png" alt="Action 2"></button>
          <button class="action-button"><img src="path/to/icon3.png" alt="Action 3"></button>
          <button class="action-button"><img src="path/to/icon4.png" alt="Action 4"></button>
        </div> -->

<script setup>
import { ref, computed } from 'vue';
import TheTable from '../../global-components/TheTable.vue';

const students = ref([
  {
    id: 1,
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
  // Add students
]);

const searchQuery = ref('');
const selectedStudent = ref(null);

const tableHeaders = ["id", "name", "username", "squad", "dailyPoints", "totalPoints"];

const filteredStudents = computed(() => {
  if (!searchQuery.value) {
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
  width: 100%;
  max-width: 1200px;
  margin: auto;
  background: #FFFFFF;
  padding: 50px; 
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;  
}

.search-container {
  position: relative;
  width: 638px;
  height: 49px; 
  background-color: #EBF6FF; 
  border-radius: 4px; /* quanto? */
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
  padding: 16px 20px 16px 40px; /* Adjust padding to include space for the icon */
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

.no-students {
  width: 1121px;
  height: 490px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: #4F4F4F;
  background-color: #EBF6FF;
  border-radius: 8px;
  margin-top: 234px;
  margin-left: 280px;
}

.student-detail {
  width: 313px;
  height: 604px;
  background-color: #EBF6FF;
  border-radius: 16px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-pic {
  width: 150px;
  height: 150px;
  background-color: #509CDB;
  border-radius: 50%;
  /* margin-top: 72px;
  margin-top: 82px; */
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
  /* margin-top: 234px;
  margin-left: 77px; */
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
  /* margin-top: 33px;
  margin-left: 90px; */
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
  /* margin-top: 270px;
  margin-left: 103px; */
}

.email-title, .linkedin-title {
  width: 93px;
  height: 15px;
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 12px;
  font-weight: 600;
  text-align: left;
  color: #1A1A1A;
  line-height: 14.88px; 
}

.points-title, .status-title, .degree-title {
  width: 83px;
  height: 15px;
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #1A1A1A;
  line-height: 14.88px; 
}

.email, .linkedin, .points-value, .status-value, .degree-value {
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: #A7A7A7;
  margin: 0;
}

.linkedin a {
  color: #A7A7A7;
  text-decoration: none;
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

.points, .status-degree {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.points div, .status-degree div {
  text-align: center;
}

.points-title, .points-value, .status-title, .status-value, .degree-title, .degree-value {
  margin: 10;
}
</style>
