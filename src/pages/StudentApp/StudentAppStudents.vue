<template>
  <!-- Container principal da aplicação de estudantes -->
  <div class="student-app-container">
    <!-- Cabeçalho da aplicação -->
    <div class="header">
      <!-- Container da barra de pesquisa -->
      <div class="search-container">
        <!-- Ícone da lupa para pesquisa -->
        <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M10.5 17a6.5 6.5 0 100-13 6.5 6.5 0 000 13z" />
        </svg>
        <!-- Input da barra de pesquisa ligado ao `searchQuery` -->
        <input 
          type="text" 
          placeholder="Search for a student" 
          class="search-bar" 
          v-model="searchQuery" 
        />
      </div>
      <div class="btn-students">
        <!-- Botão para dar reset aos pontos e numero de premios -->
        <button v-if="permissions()" class="btn-banned" @click="resetStudentsPrizes()">
          Reset Students/Prizes
        </button>
        <!-- Botão para abrir o popup de estudantes banidos -->
        <button class="btn-banned" @click="toggleBannedPopup">
          Banned Students
        </button>
      </div>
    </div>

    <!-- Popup de Adicionar/Remover Pontos -->
    <div v-if="showPointsPopup" class="points-popup-overlay">
      <div class="points-popup">
        <h2>Add Points</h2>
        <input v-model="pointsAmount" type="number" class="points-input" placeholder="Enter points amount" min="-1000" />
        <div class="popup-buttons">
          <button class="btn-cancel" @click="showPointsPopup = false">Cancel</button>
          <button class="btn-add" @click="updateStudentPoints(pointsAmount)">Add</button>
        </div>
      </div>
    </div>

    <!-- Popup do QR Code -->
    <div v-if="showQrPopup" class="qr-popup-overlay">
      <div class="qr-popup">
        <h2>Student QR Code</h2>
        <qrcode-vue :value="qrCodeValue" :size="200" level="H"></qrcode-vue>
        <button class="close-button" @click="showQrPopup = false">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="#4f4f4f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>

    <!-- Popup de confirmação de banimento -->
    <div v-if="showDeletePopup" class="delete-popup-overlay">
      <div class="delete-popup">
        <h2>Ban Student?</h2>
        <div class="popup-buttons">
          <button class="btn-cancel" @click="showDeletePopup = false">Cancel</button>
          <button class="btn-confirm" @click="banStudent">Confirm</button>
        </div>
      </div>
    </div>

    <!-- Overlay que sombreia o fundo quando o popup está visível -->
    <div class="overlay" v-if="showBannedPopup"></div>

    <!-- Popup para exibir estudantes banidos -->
    <div v-if="showBannedPopup" class="banned-popup">
      <div class="popup-content">
        <!-- Botão para fechar o popup -->
        <button @click="closePopup" class="close-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="#4f4f4f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <!-- Título do popup -->
        <h2>Banned Students</h2>
        <div v-if="bannedStudents.length === 0" class="no-students">
          No banned students.
        </div>
        <!-- Tabela de estudantes banidos -->
        <TheTable
          :data="bannedStudents"
          :tableHeaders="bannedTableHeaders"
          :buttons="unbanButtons"
          @unban="unbanStudent"
        >
          <!-- Custom unban button -->
          <template #unban="{ row }">
            <button class="unban-button" @click="unbanStudent(row)">
              <img src="../../assets/StudentApp/unban.svg" alt="Unban Icon" class="unban-icon" />
            </button>
          </template>
        </TheTable>
      </div>
    </div>

    <!-- Conteúdo principal -->
    <div class="content">
      <!-- Tabela de estudantes -->
      <div :class="['students-table-container', { 'full-width': !selectedStudent }]">
        <TheTable
          :data="filteredStudents"
          :tableHeaders="tableHeaders"
          :buttons="tableButtons"
          :searchInput="searchQuery"
          @onRowSelect="selectStudent"
        />
        <!-- Mensagem exibida se nenhum estudante for encontrado -->
        <div v-if="!filteredStudents.length" class="no-students">
          No Students found
        </div>
      </div>
      <!-- Detalhes de um estudante selecionado -->
      <div class="student-detail" v-if="selectedStudent">
        <!-- Botão para fechar o painel de detalhes -->
        <button @click="selectStudent(null)" class="close-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="#4f4f4f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <!-- Nome de utilizador do estudante -->
        <p class="username">{{ selectedStudent.username }}</p>
        <!-- Foto de perfil do estudante -->
        <img class="profile-pic" @click="console.log(selectedStudent.profilePic)"  :src="'data:image/png;base64,' + selectedStudent.profilePic" alt="Foto de Perfil" />
        <!-- Nome do estudante -->
        <h3>{{ selectedStudent.name }}</h3>
        <!-- Papel do estudante (fixo como "Estudante") -->
        <p class="role">Student</p>
        <!-- Botões de ações do estudante -->
        <div class="student-actions">
          <div v-if="permissions()" class="action-button" @click="openPointsPopup(selectedStudent)">
            <img src="../../assets/StudentApp/students1.svg" alt="Ícone 1">
          </div>
          <div class="action-button" @click="openQrPopup(selectedStudent)">
            <img src="../../assets/StudentApp/students2.svg" alt="Ícone 2">
          </div>
          <div class="action-button" @click="goToSquad(selectedStudent.squad)">
            <img src="../../assets/StudentApp/students3.svg" alt="Ícone 3">
          </div>
          <div class="action-button" @click="confirmBanStudent(selectedStudent)">
            <img src="../../assets/StudentApp/students4.svg" alt="Ícone 4">
          </div>
        </div>
        <!-- Informações do estudante -->
        <p class="email-title">Email</p>
        <p class="email">{{ selectedStudent.email }}</p>
        <p class="linkedin-title">LinkedIn</p>
        <p class="linkedin"><a :href="selectedStudent.linkedin">{{ selectedStudent.linkedin }}</a></p>
        <!-- Pontuação do estudante -->
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
        <!-- Estado do CV e grau académico do estudante -->
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
import { ref, computed, onMounted } from 'vue'; // Importação de funcionalidades da Vue (reactividade e computação)
import TheTable from '../../global-components/TheTable.vue'; // Importa o componente reutilizável de tabela
import examplePhoto from '../../assets/StudentApp/example_students_photo.svg'; // Importa uma imagem exemplo para perfis
import axios from 'axios'; // Biblioteca para fazer chamadas HTTP
import QrcodeVue from 'qrcode.vue'; // Importando biblioteca de QR Code
import { useUserStore } from '../../stores/user';

const userStore = useUserStore()

const tableButtons = ref([]);

const showQrPopup = ref(false);
const qrCodeValue = ref("");

const showPointsPopup = ref(false);
const pointsAmount = ref(0);
const studentToModify = ref(null);

function permissions(){
  if(userStore.getRole == "admin"){
    return true
  }else{
    return false
  }
}

const openQrPopup = (student) => {
  selectedStudent.value = student;
  qrCodeValue.value = `${student.externalId}`; 
  showQrPopup.value = true;
};

// Abre o popup e define o estudante a modificar
const openPointsPopup = (student) => {
  studentToModify.value = student;
  pointsAmount.value = 0; // Resetar o input
  showPointsPopup.value = true;
};

// Função para adicionar ou remover pontos
const updateStudentPoints = (points) => {
  if (!studentToModify.value || isNaN(points)) return;

  axios.post(
    import.meta.env.VITE_APP_JEEC_BRAIN_URL + "/add_points",
    {
      student_id: studentToModify.value.id,
      xp: parseInt(points, 10)
    },
    {
      headers: { "Content-Type": "application/json" },
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
      },
    }
  )
  .then(response => {
    console.log("Points updated successfully:", response.data);

    // Find the student in the students array and update reactively
    const index = students.value.findIndex(s => s.id === studentToModify.value.id);
    if (index !== -1) {
      students.value[index] = {
        ...students.value[index],
        currentPoints: response.data.currentPoints,
        dailyPoints: response.data.dailyPoints,
        totalPoints: response.data.totalPoints
      };
    }

    // Ensure selected student updates reactively
    if (selectedStudent.value && selectedStudent.value.id === studentToModify.value.id) {
      selectedStudent.value = { 
        ...selectedStudent.value, 
        currentPoints: response.data.currentPoints,
        dailyPoints: response.data.dailyPoints,
        totalPoints: response.data.totalPoints
      };
    }

    showPointsPopup.value = false;
  })
  .catch(error => {
    console.error("Error updating points:", error.response ? error.response.data : error);
  });
};

const studentToBan = ref(null);

const banStudent = () => {
  if (!studentToBan.value) return;

  axios.post(
    `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/studentban`,
    { banstudent: studentToBan.value.id },
    {
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
      },
    }
  )
  .then(() => {
    console.log(`Student ${studentToBan.value.name} banned successfully.`);

    // Remove banned student from the main student list
    students.value = students.value.filter(s => s.id !== studentToBan.value.id);

    // Add to banned students list
    bannedStudents.value.push({
      id: studentToBan.value.id,
      name: studentToBan.value.name,
      username: studentToBan.value.username,
      email: studentToBan.value.email,
      externalId: studentToBan.value.externalId
    });

    // Reset and close popup
    studentToBan.value = null;
    showDeletePopup.value = false;
  })
  .catch((error) => {
    console.error("Error banning student:", error);
  });
};

const confirmBanStudent = (student) => {
  console.log("Student selected for banning:", student);
  if (!student || (!student.externalId && !student.id)) {
    console.error("Invalid student selected for banning:", student);
    return;
  }
  studentToBan.value = student;
  showDeletePopup.value = true; // This is now the ban confirmation popup
};

// Função para buscar os dados dos estudantes da API
const fetchData = () => {
  axios
    .get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + "/studentsAll", {
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
      },
    })
    .then((response) => {
      console.log("Dados recebidos da API:", response.data);
      if (response.data && Array.isArray(response.data.students)) {
        students.value = response.data.students.map(student => ({
          id: student.id,
          externalId: student.external_id,
          name: student.name,
          username: student.username,
          squad: student.squad || "Not in a squad",
          profilePic: student.photo,
          email: student.email || "Not provided",
          linkedin: student.linkedin || "Not provided",
          currentPoints: student.current_points || 0,
          dailyPoints: student.daily_points || 0,
          totalPoints: student.total_points || 0,
          cvStatus: student.cv_status || "Not provided",
          degree: student.degree || "Not provided"
        }));
      } else {
        console.error("Estrutura inesperada dos dados da API:", response.data);
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar dados dos estudantes:", error);
    });
};


function resetStudentsPrizes(){
  axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + "/reset_daily_fields", {
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
      },
    })
    .then((response) => {
      console.log("Resposta obtida", response);
    })
    .catch((error) => {
      console.error("Erro ao buscar dados dos estudantes:", error);
    });
}

const studentToDelete = ref(null);
const showDeletePopup = ref(false);

// Executa a função `fetchData` ao montar o componente
onMounted(fetchData);

// Variável reativa para controlar a exibição do popup de estudantes banidos
const showBannedPopup = ref(false);

// Função para alternar a exibição do popup de estudantes banidos
const toggleBannedPopup = () => {
  showBannedPopup.value = !showBannedPopup.value;
};

// Variável reativa para armazenar os estudantes banidos
const bannedStudents = ref([]); // Inicialmente vazio

// Função para buscar os estudantes banidos da API
const fetchBannedStudents = () => {
  axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + "/banned-studentss", {
    auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
    },
  })
  .then((response) => {    
    console.log("[DEBUG] Raw API Response for Banned Students:", response.data);

    if (response.data && Array.isArray(response.data.students)) {
      bannedStudents.value = response.data.students.map(student => ({
        id: student.id || student.external_id, 
        name: student.name,
        username: student.username || student.ist_id, 
        email: student.email,
        externalId: student.external_id
      }));

      console.log("[DEBUG] Processed Banned Students:", bannedStudents.value);

    } else {
      console.error("[DEBUG] Unexpected API response:", response.data);
    }
  })
  .catch((error) => {
    console.error("[DEBUG] Error fetching banned students:", error);
  });
};

// Executa a função para buscar os estudantes banidos ao montar o componente
onMounted(fetchBannedStudents);

// Estrutura dos cabeçalhos para a tabela de estudantes banidos
const bannedTableHeaders = {
  id: "ID", 
  name: "Name", 
  username: "Username",
  email: "Email", 
  unban: "Unban", 
};

// Botões associados à funcionalidade de desbanir
const unbanButtons = {
  name: "unban",
  eventName: "unban", 
  icon: "../../assets/StudentApp/unban.svg",
};

// Função que desbane um estudante
const unbanStudent = (student) => {
  if (!student || !student.externalId) {
    console.error("Invalid student data:", student);
    return;
  }

  axios
    .post(
      `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/unban`,
      { unbanstudent: student.externalId },  
      {
        headers: { "Content-Type": "application/json" },
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
        },
      }
    )
    .then(() => {
      console.log(`Student ${student.name} unbanned successfully.`);

      // Remove student from the banned list
      bannedStudents.value = bannedStudents.value.filter(s => s.externalId !== student.externalId);

      // Add student back to the normal student list
      students.value.push({
        id: student.id,
        externalId: student.externalId,
        name: student.name,
        username: student.username,
        squad: student.squad || "Not in a squad",
        profilePic: student.profilePic,
        email: student.email || "Not provided",
        linkedin: student.linkedin || "Not provided",
        currentPoints: student.currentPoints || 0,
        dailyPoints: student.dailyPoints || 0,
        totalPoints: student.totalPoints || 0,
        cvStatus: student.cvStatus || "Not provided",
        degree: student.degree || "Not provided"
      });

      console.log("Student moved to normal list:", students.value);
    })
    .catch((error) => {
      console.error("Error unbanning student:", error.response ? error.response.data : error);
    });
};


// Função para fechar o popup de estudantes banidos
const closePopup = () => {
  showBannedPopup.value = false; // Define a variável para false, escondendo o popup
};

// Lista estática de estudantes
// const students = ref([
//   {
//     id: '1',
//     name: 'André Santos',
//     username: 'andregay',
//     profilePic: examplePhoto,
//     squad: 'parkour_is_gay',
//     dailyPoints: -1,
//     totalPoints: -2,
//     email: 'andregay@proton.me',
//     linkedin: 'https://www.linkedin.com/andregay',
//     currentPoints: 66,
//     cvStatus: 'Approved',
//     degree: 'BSc/IST',
//   },
//   // Adicionar estudantes
// ]);

// Lista de estudantes
const students = ref([]); // Inicialmente vazio, os dados serão buscados pela API

// Variável reativa para armazenar o texto de pesquisa inserido pelo utilizador
const searchQuery = ref('');

// Variável reativa para armazenar o estudante atualmente selecionado
const selectedStudent = ref(null);

// Estrutura dos cabeçalhos da tabela que exibe os dados dos estudantes
const tableHeaders = {
  id: "ID", 
  name: "Name", 
  username: "Username", 
  squad: "Squad",
  dailyPoints: "Daily Points", 
  totalPoints: "Total Points" 
};

// Computed property que filtra os estudantes com base no texto de pesquisa
const filteredStudents = computed(() => {
  if (!searchQuery.value.trim()) {
    // Se a pesquisa estiver vazia ou contiver apenas espaços, retorna todos os estudantes
    return students.value;
  }

  // Filtra os estudantes com base no nome ou username que inclui o texto de pesquisa (case insensitive)
  return students.value.filter(student =>
    student.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    student.username.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Função para selecionar um estudante na aplicação
const selectStudent = (student) => {
  selectedStudent.value = student; // Define o estudante selecionado
};

import { useRouter } from 'vue-router';

const router = useRouter();

const goToSquad = (squadName) => {
  if (!squadName) {
    console.error("Student is not in a squad");
    return;
  }

  // Redirect to the Squads page and pass squad name as a query parameter
  router.push({ path: '/student-app/squads', query: { squad: squadName } });
};
</script>

<style scoped>
/* Estilo para os cabeçalhos da tabela */
th {
  color: #424242;
  font-family: 'Kumbh Sans', sans-serif; 
  font-size: 14px;
  font-weight: 600; 
}

/* Estilo para células da tabela */
th, td {
  white-space: nowrap; /* Impede a quebra de linha */
  overflow: hidden; /* Oculta o texto excedente */
  text-overflow: ellipsis; /* Adiciona reticências ao final do texto */
  max-width: 150px; /* Define uma largura máxima para as células */
}

/* Estilo principal do container da aplicação de estudantes */
.student-app-container {
  background: #FFFFFF; 
  display: flex; 
  flex-direction: column; 
  width: 100%; 
  margin: auto; 
  padding: 60px 50px 50px 50px;
}

/* Estilo para o cabeçalho fixo */
.header {
  position: sticky; 
  top: 0; 
  z-index: 10;
  display: flex; 
  justify-content: space-between; 
  align-items: center;
  margin-bottom: 1.5rem;
}

/* Estilo para o container da barra de pesquisa */
.search-container {
  position: relative; /* Necessário para posicionar o ícone corretamente */
  background-color: #EBF6FF; /* Cor de fundo */
  width: 87%; /* Ajuste para ocupar toda a largura disponível */
  max-width: 1500px; 
  height: 49px; 
  border-radius: 8px;
  padding: 0 16px;
  display: flex; 
  align-items: center; 
  gap: 10px; /* Espaçamento entre ícone e input */
  padding: 16px, 20px, 16px, 16px; 
}

.search-icon {
  position: absolute;
  color: #8A8A8A; 
  top: 50%; 
  left: 20px; 
  transform: translateY(-50%); /* Ajusta o ícone para o centro verticalmente */
  width: 16px; 
  height: 16px; 
}

.search-bar {
  width: calc(100% - 40px); /* Ajusta o input para não ocupar o espaço do ícone */
  width: 100%;
  height: 100%; 
  padding: 16px 20px 16px 50px;
  border: none; 
  border-radius: 8px; 
  padding-left: 40px; /* Espaço suficiente para o ícone */
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  background-color: #EBF6FF; 
  color: #8A8A8A; 
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

.overlay {
  position: fixed; /* Garante que o overlay cubra toda a janela */
  top: 0; 
  left: 0;
  width: 100%; 
  height: 100%; 
  background-color: rgba(0, 0, 0, 0.5); /* Sombra */
  z-index: 10; /* Garante que o overlay fique acima de outros elementos */
}

.banned-popup {
  z-index: 20; /* Popup deve estar acima do overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Ajusta a posição para centralizar o popup */
}

.banned-popup .popup-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  max-width: 800px;
  position: relative;
}

.banned-popup > div {
  width: 100%;
  max-width: 950px;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
}

.banned-popup h2 {
  font-size: 32px;
  font-weight: 600;
  line-height: 39.69px;
  text-align: left;
  margin-bottom: 40px;
}

.close-button {
  z-index: 3;
  background: none;
  border: none;
  cursor: pointer;
  align-self: flex-end;
  position: absolute;
  top: 10px;
  right: 10px;
}

.icon-combination {
  position: relative;
  width: 36px; /* Set a fixed size for the button */
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #509CDB; /* Blue background */
  border-radius: 8px;
  cursor: pointer;
}

.icon-base {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-base-img {
  width: 22px; /* Adjust the trash icon size */
  height: 22px;
}

.icon-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 15px; /* Smaller overlay */
  height: 15px;
  transform: translate(-50%, -50%); /* Center it perfectly */
}

.icon-overlay-img {
  width: 15px;
  height: 15px;
  opacity: 0.9; /* Optional: Slight transparency */
}


.content {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start; 
}

.students-table-container {
  flex: 1;
  height: calc(100vh - 300px); 
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
  height: 90%; 
  padding: 2rem;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #4F4F4F;
  border-radius: 8px;
  margin: 2rem auto; 
  box-sizing: border-box; 
}

.student-detail {
  display: flex;
  background-color: #EBF6FF;
  width: 323px;
  height: calc(100vh - 300px); 
  border-radius: 16px;
  padding: 35px;
  flex-direction: column;
  align-items: center;
  margin: 0; 
  text-align: center; 
  max-height: 100vh;
  overflow-y: auto; 
  position: relative; /* Torna a posição do botão relativa ao container */
}

.student-detail h3, .student-detail .username {
  white-space: normal; /* Permite várias linhas de texto */
  overflow: visible; /* Garante que o texto não será oculto */
}

h3 {
  color: #1A1A1A;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  line-height: 29.77px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%; 
  margin-top: 10px;
}

.username {
  color: #424242;
  font-size: 24px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 10px;
  white-space: nowrap; /* Evita quebra de linha */
  overflow: hidden; /* Oculta o texto excedente */
  text-overflow: ellipsis; /* Adiciona reticências ao final do texto excedente */
  max-width: 100%; /* Limita a largura máxima ao tamanho do container */
  display: block; /* Garante que as propriedades de texto sejam aplicadas */
}

.profile-pic {
  width: 100px; /* Adjust size as needed */
  height: 100px; /* Adjust size as needed */
  border-radius: 50%; /* Makes the image circular */
  object-fit: cover; /* Ensures the image fits well inside the circle */
  border: 2px solid #ccc; /* Optional: Add a border */
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

.points-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.points-popup {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
}

.points-input {
  width: 80%;
  padding: 8px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  text-align: center;
}

.popup-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn-cancel, .btn-add, .btn-remove {
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
}

.btn-cancel {
  background: #ccc;
}

.btn-add {
  background: #28a745;
  color: white;
}

.btn-remove {
  background: #dc3545;
  color: white;
}

/* Popup de QR Code */
.qr-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.qr-popup {
  position: relative;
  background: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  width: 280px;
}

.qr-popup h2 {
  margin-bottom: 20px;
}

.qr-popup .close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
}

.delete-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.delete-popup {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
}

.popup-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.btn-cancel, .btn-confirm {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
}

.btn-cancel {
  background: #ccc;
}

.btn-confirm {
  background: #d9534f;
  color: white;
}

.unban-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.unban-icon {
  width: 24px; /* Adjust the size of the icon as needed */
  height: 24px;
}

.btn-students{
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

</style>
  
