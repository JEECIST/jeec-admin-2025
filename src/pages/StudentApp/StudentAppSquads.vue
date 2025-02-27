<template>
  <!-- Container principal da aplicação para squads -->
  <div class="squads-app-container">
    <!-- Cabeçalho fixo com barra de pesquisa -->
    <div class="header">
      <!-- Container da barra de pesquisa -->
      <div class="search-container">
        <!-- Ícone de lupa para indicar pesquisa -->
        <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M10.5 17a6.5 6.5 0 100-13 6.5 6.5 0 000 13z" />
        </svg>
        <!-- Input da barra de pesquisa ligado ao modelo `searchQuery` -->
        <input 
          type="text" 
          placeholder="Search for a squad" 
          class="search-bar" 
          v-model="searchQuery" 
        />
      </div>
    </div>

    <div class="content">
      <!-- Tabela com rolagem para exibir squads -->
      <div class="squads-table-container">
        <div class="table-header-fixed">
          <!-- Componente de tabela reutilizável -->
          <TheTable
            :data="filteredSquads" 
            :tableHeaders="tableHeaders"
            :buttons="tableButtons"
            :searchInput="searchQuery" 
            @onRowSelect="selectSquad" 
          />
        </div>
        <!-- Mensagem exibida caso não existam squads no filtro -->
        <div v-if="!filteredSquads.length" class="no-squads">
          No Squads found
        </div>
      </div>

      <!-- Detalhes de uma squad selecionada -->
      <div class="squad-detail" v-if="selectedSquad">
        <!-- Botão para fechar os detalhes da squad -->
        <button @click="closeSquadDetail" class="close-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="#4f4f4f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <!-- Nome ou "grito" da squad -->
        <p class="squad-name">{{ selectedSquad.scream }}</p>
        <!-- Imagem representativa da squad -->
        <img class="squad-pic" :src="selectedSquad.squadPic" alt="Squad Picture" />
        <!-- Nome da squad -->
        <h3>{{ selectedSquad.name }}</h3>
        <!-- Papel fixo: Squad -->
        <p class="role">Squad</p>
        <!-- Ações disponíveis para a squad -->
        <div class="squad-actions">
          <!-- Button for "Delete Squad and Ban Students" -->
          <div class="action-button icon-combination" @click="confirmDeleteAndBanSquad(selectedSquad)">
            <img class="icon-base" src="../../assets/StudentApp/students3.svg" alt="Icon Base">
            <img class="icon-overlay" src="../../assets/StudentApp/squads1.svg" alt="Icon Overlay">
          </div>
          <!-- Botão adicional com um único ícone -->
          <div class="action-button" @click="confirmDeleteSquad(selectedSquad)">
            <img src="../../assets/StudentApp/students4.svg" alt="Trash Icon">
          </div>
        </div>

        <!-- Popup para "Delete Squad and Ban Students" -->
        <!-- Popup for confirming squad deletion and banning -->
        <div v-if="showDeleteBanPopup" class="delete-popup-overlay">
          <div class="delete-popup">
            <h2>Delete Squad and Ban Students?</h2>
            <div class="popup-buttons">
              <button class="btn-cancel" @click="showDeleteBanPopup = false">Cancel</button>
              <button class="btn-confirm" @click="deleteAndBanSquad">Confirm</button>
            </div>
          </div>
        </div>

        <!-- Popup for confirming squad deletion -->
        <div v-if="showDeleteSquadPopup" class="delete-popup-overlay">
          <div class="delete-popup">
            <h2>Delete Squad?</h2>
            <div class="popup-buttons">
              <button class="btn-cancel" @click="showDeleteSquadPopup = false">Cancel</button>
              <button class="btn-confirm" @click="deleteSquad">Confirm</button>
            </div>
          </div>
        </div>

        <!-- Informação do capitão da squad -->
        <p class="captain-username">Captain Username</p>
        <p class="captain">{{ selectedSquad.captainUsername }}</p>
        <!-- Lista de membros da squad -->
        <p class="members-username">Members Usernames</p>
        <div class="members">
          <!-- Loop para exibir todos os membros -->
          <p v-for="(member, index) in selectedSquad.members" :key="index">{{ member }}</p>
        </div>
        <!-- Pontuação da squad -->
        <div class="points">
          <div>
            <p class="points-title">Daily Points</p>
            <p class="points-value">{{ selectedSquad.dailyPoints }}</p>
          </div>
          <div>
            <p class="points-title">Total Points</p>
            <p class="points-value">{{ selectedSquad.totalPoints }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Importação de dependências e componentes
import { ref, computed, onMounted, watch } from 'vue'; // `ref` e `computed` são utilizados para estados reativos e propriedades computadas
import TheTable from '../../global-components/TheTable.vue'; // Importa o componente de tabela reutilizável
import axios from 'axios';
import examplePhoto from '../../assets/StudentApp/example_squad_photo.svg'; // Importa uma imagem exemplo para squads
import { useRoute } from 'vue-router';

// Lista estática de squads
// const squads = ref([
//   {
//     id: 1,
//     name: 'Interracial Rangers',
//     captainUsername: 'marco_looongo',
//     squadPic: examplePhoto,
//     dailyPoints: 420,
//     totalPoints: 11111,
//     members: ['andregay', 'joel_big_wang', 'paradela_o_rei_delas'],
//     scream: 'AAAAAAAAAAAAAAAAAAAAAAA'
//   },
//   // Adicionar squads
// ]);

const tableButtons = ref([]);

// Lista de squads (inicialmente vazia, preenchida com dados da API)
const squads = ref([]);

// Variável reativa para armazenar o texto de pesquisa inserido pelo utilizador
const searchQuery = ref('');

// Variável reativa para armazenar o squad atualmente selecionado
const selectedSquad = ref(null);

const showDeleteBanPopup = ref(false);
const squadToDeleteAndBan = ref(null);

const showDeleteSquadPopup = ref(false);
const squadToDelete = ref(null);

// Estrutura dos cabeçalhos da tabela que exibe os dados dos squads
const tableHeaders = {
  id: "ID", 
  name: "Name", 
  captainUsername: "Captain Username", 
  dailyPoints: "Daily Points", 
  totalPoints: "Total Points" 
};

// Função para buscar os squads da API
const fetchSquads = () => {

  axios
    .get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + "/squadsAll", {
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
      },
    })
    .then((response) => {

      if (response.data && Array.isArray(response.data.squads)) {
        console.log("[DEBUG] Squads array received:", response.data.squads);

        squads.value = response.data.squads.map(squad => {
          console.log(`[DEBUG] Processing squad: ${squad.name}`, squad);
          return {
            id: squad.id,
            name: squad.name,
            captainUsername: squad.captain_username || squad.captain || squad.leader || "Not Assigned",
            squadPic: squad.photo 
              ? import.meta.env.VITE_APP_BASE_URL + "/uploads/" + squad.photo 
              : examplePhoto,
            dailyPoints: squad.daily_points || 0,
            totalPoints: squad.total_points || 0,
            members: squad.members || [],
            scream: squad.scream && squad.scream.trim() !== "" ? squad.scream : "No Scream"
          };
        });

        console.log("[DEBUG] Squads successfully stored:", squads.value);
      } else {
        console.error("[DEBUG] Unexpected API response structure:", response.data);
      }
    })
    .catch((error) => {
      console.error("[DEBUG] Error fetching squads:", error);
      if (error.response) {
        console.error("[DEBUG] Server response error:", error.response.status, error.response.data);
      } else if (error.request) {
        console.error("[DEBUG] No response received. Request:", error.request);
      } else {
        console.error("[DEBUG] Unexpected error:", error.message);
      }
    });
};

onMounted(() => {
  fetchSquads();
});

// Computed property que filtra os squads com base no texto de pesquisa
const filteredSquads = computed(() => {
  if (!searchQuery.value.trim()) {
    // Se a pesquisa estiver vazia ou contiver apenas espaços, retorna todos os squads
    return squads.value;
  }

  // Filtra os squads com base no nome ou no username do capitão que inclui o texto de pesquisa (case insensitive)
  return squads.value.filter(squad =>
    squad.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    squad.captainUsername.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Função para selecionar um squad na aplicação
const selectSquad = (squad) => {
  selectedSquad.value = squad; // Define o squad selecionado
};

// Função para fechar os detalhes do squad selecionado
const closeSquadDetail = () => {
  selectedSquad.value = null; // Remove a seleção do squad
};

// Open the "Delete Squad and Ban Students?" confirmation popup
const confirmDeleteAndBanSquad = (squad) => {
  console.log("Confirming deletion and banning for squad:", squad);
  if (!squad) {
    console.error("No squad provided to delete and ban.");
    return;
  }
  squadToDeleteAndBan.value = squad;
  showDeleteBanPopup.value = true;
};

// Perform the deletion and banning operation
const deleteAndBanSquad = async () => {
  if (!squadToDeleteAndBan.value) return;

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/bansquad`,
      { squad_id: squadToDeleteAndBan.value.id },
      {
        headers: { "Content-Type": "application/json" },
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
        },
      }
    );

    if (response.status === 204) {
      console.log(`Squad with ID ${squadToDeleteAndBan.value.id} deleted and students banned successfully.`);

      // Remove the squad from the local state
      squads.value = squads.value.filter((s) => s.id !== squadToDeleteAndBan.value.id);

      // Close the popup
      showDeleteBanPopup.value = false;
      squadToDeleteAndBan.value = null;
    } else {
      console.error("Unexpected response status:", response.status);
    }
  } catch (error) {
    console.error("Error deleting and banning squad:", error.response ? error.response.data : error);
  }
};


const confirmDeleteSquad = (squad) => {
  console.log("Confirming deletion for squad:", squad);
  if (!squad) {
    console.error("No squad provided to delete.");
    return;
  }
  squadToDelete.value = squad;
  showDeleteSquadPopup.value = true;
};

const deleteSquad = async () => {
  if (!squadToDelete.value) return;

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/delete_squad`,
      { squad_id: squadToDelete.value.id },
      {
        headers: { "Content-Type": "application/json" },
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
        },
      }
    );

    if (response.status === 204) {
      console.log(`Squad with ID ${squadToDelete.value.id} deleted successfully.`);

      // Remove the squad from the local state
      squads.value = squads.value.filter((s) => s.id !== squadToDelete.value.id);

      // Close the popup
      showDeleteSquadPopup.value = false;
      squadToDelete.value = null;
    } else {
      console.error("Unexpected response status:", response.status);
    }
  } catch (error) {
    console.error("Error deleting squad:", error.response ? error.response.data : error);
  }
};

const route = useRoute();

onMounted(() => {
  fetchSquads(); // Load squads first

  watch(() => squads.value, (newSquads) => {
    if (route.query.squad && newSquads.length) {
      const squadToOpen = newSquads.find(squad => squad.name === route.query.squad);
      if (squadToOpen) {
        selectedSquad.value = squadToOpen; // Automatically open squad popup
      }
    }
  }, { immediate: true });
});
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

.squads-app-container {
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
  width: 100%; 
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
  background-color: #EBF6FF;
  color: #8A8A8A;
  width: 100%;
  height: 49px;
  padding: 16px 20px 16px 50px;
  border: none;
  border-radius: 8px;
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 14px; 
  font-weight: 500;
}

.content {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start; 
}

.squads-table-container {
  flex: 1;
  height: calc(100vh - 300px); 
  overflow-y: auto;
  position: relative;
}

.table-header-fixed {
  position: sticky;
  top: 0;
  z-index: 5;
}

.squad-actions {
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

.icon-combination {
  position: relative;
  width: 36px;
  height: 36px;
}

.icon-base {
  position: relative;
  width: 100%;
  height: 100%;
}

.icon-overlay {
  position: absolute;
  width: 70%;
  height: 70%;
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%);
}

.no-squads {
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

.squad-scream {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.squad-detail {
  position: relative; /* Necessário para posicionar o botão de fechar */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #EBF6FF;
  border-radius: 16px;
  max-height: calc(100vh - 200px);
  width: 323px;
  overflow-y: auto;
}

.squad-pic {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

h3 {
  color: #1A1A1A;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  line-height: 29.77px; 
  margin-top: 10px;
}

.squad-name {
  color: #424242;
  font-size: 24px;
  font-weight: 800;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%; 
  margin-bottom: 10px;
}

.role {
  color: #A7A7A7;
  font-size: 18px;
  width: 108px;
  height: 22px;
  font-weight: 500;
  text-align: center;
  margin: 10px 0;
}

.captain-username, .members-username {
  color: #1A1A1A;
  font-size: 12px;
  text-align: left;
  width: 100%; 
  font-weight: 600;
  margin: 5px 0;
}

.captain {
  color: #A7A7A7;
  font-size: 14px;
  text-align: left; 
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%; 
  margin: 5px 0;
  display: block;
  width: 100%;
}
  
.members {
  color: #A7A7A7;
  font-size: 14px;
  text-align: left; 
  width: 100%;
  font-weight: 500;
  margin: 5px 0;
  word-wrap: break-word;
}

.members p {
  color: #A7A7A7;
  font-size: 14px;
  text-align: left; 
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  margin: 5px 0;
}

.points {
  display: flex;
  justify-content: space-between;
  text-align: left; 
  width: 100%;
}

.points-title {
  color: #1A1A1A;
  font-size: 12px;
  font-weight: 700;
  margin: 5px 0;
}

.points-value {
  color: #A7A7A7;
  font-size: 14px;
  font-weight: 500;
  margin: 5px 0;
}

.close-button {
  z-index: 3;
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}

.close-button svg {
  width: 24px;
  height: 24px;
}

.squad-detail {
  position: relative; /* Necessário para posicionar o botão de fechar */
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
</style>
