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
      <!-- Botão para abrir o popup de estudantes banidos -->
      <button class="btn-banned" @click="toggleBannedPopup">
        Banned Students
      </button>
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
        <!-- Tabela de estudantes banidos -->
        <TheTable
          :data="bannedStudents"
          :tableHeaders="bannedTableHeaders"
          :buttons="unbanButtons"
          @unban="unbanStudent"
        >
          <!-- Botão personalizado para remover o banimento -->
          <template #unban="{ row }">
            <div class="icon-combination" @click="unbanStudent(row)">
              <div class="icon-base">
                <img src="../../assets/StudentApp/students4.svg" alt="Trash Icon" />
              </div>
              <div class="icon-overlay">
                <img src="../../assets/StudentApp/squads1.svg" alt="Circle X Icon" />
              </div>
            </div>
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
        <img class="profile-pic" :src="selectedStudent.profilePic" alt="Profile Picture" />
        <!-- Nome do estudante -->
        <h3>{{ selectedStudent.name }}</h3>
        <!-- Papel do estudante (fixo como "Student") -->
        <p class="role">Student</p>
        <!-- Botões de ações do estudante -->
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
import { ref, computed } from 'vue'; // Importação de funcionalidades da Vue (reactividade e computação)
import TheTable from '../../global-components/TheTable.vue'; // Importa o componente reutilizável de tabela
import examplePhoto from '../../assets/StudentApp/example_students_photo.svg'; // Importa uma imagem exemplo para perfis

// Variável reativa para controlar a exibição do popup de estudantes banidos
const showBannedPopup = ref(false);

// Função para alternar a exibição do popup de estudantes banidos
const toggleBannedPopup = () => {
  showBannedPopup.value = !showBannedPopup.value;
};

// Dados fictícios de estudantes banidos (exemplo)
const bannedStudents = ref([
  { id: 1, name: 'André Santos', username: 'andregay', email: 'parkour_is_gay@proton.me' }, // Estudante 1
  { id: 2, name: 'André Santos 2', username: 'andregay 2', email: 'parkour_is_gay2@proton.me' }, // Estudante 2
  { id: 3, name: 'André Santos 3', username: 'andregay 3', email: 'parkour_is_gay3@proton.me' }, // Estudante 3
]);

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
  icon: "../../assets/StudentApp/students1.svg",
};

// Função que desbane um estudante
const unbanStudent = (student) => {
  // Lógica para desbanir o estudante (atualmente apenas exibe no console)
  console.log('Unbanning student:', student);
};

// Função para fechar o popup de estudantes banidos
const closePopup = () => {
  showBannedPopup.value = false; // Define a variável para false, escondendo o popup
};

// Lista de estudantes
const students = ref([
  {
    id: '1',
    name: 'André Santos',
    username: 'andregay',
    profilePic: examplePhoto,
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
    profilePic: examplePhoto,
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
    profilePic: examplePhoto,
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
    profilePic: examplePhoto,
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
    profilePic: examplePhoto,
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
    profilePic: examplePhoto,
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
    profilePic: examplePhoto,
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
    profilePic: examplePhoto,
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
    profilePic: examplePhoto,
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
    profilePic: examplePhoto,
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
    profilePic: examplePhoto,
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
    profilePic: examplePhoto,
    squad: 'lu',
    dailyPoints: 5,
    totalPoints: 18,
    email: 'luna@ferreira.com.pt',
    linkedin: 'https://www.linkedin.com/lunaferreira',
    currentPoints: 87,
    cvStatus: 'Approved',
    degree: 'BSc/IST',
  },
  // Adicionar estudantes
]);

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
  width: 36px; 
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #509CDB; 
  border-radius: 8px; 
  cursor: pointer;
}

.icon-base img {
  width: 20px; 
  height: 20px;
}

.icon-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
  width: 14px; 
  height: 14px;
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
  
