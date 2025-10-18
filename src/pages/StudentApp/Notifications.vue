<template>
    <div class="wrapper">
      <div class="table">
        <form>
          <div class="search_style">
            <label>
              <img src="../../assets/search.svg">
            </label>
            <input v-model="message" placeholder="Search Notifications" />
          </div>
          
          <button type="button" @click="showAddNotifModal = true">Add Notification</button>
        </form>
        <TheTable
          :data="datab"
          :tableHeaders="tablePref"
          :searchInput="message"
          :buttons="tableButtons"
          @onRowSelect="selectCallback"
          @notFound="handleNotFound"
        />
        <div v-if="noResultsFound" class = "tableBackground">
          <p class="no-users-found">No Notifications found</p>
        </div>
        
  
  
      </div>
      
      <!-- Conditionally render the right popup placeholder -->
      <div v-if="selectedRow" class="popUpOverlay"></div>
      <div v-if="selectedRow" class="right-popup-placeholder">
        <button class="close-popup" @click="closeCardInfo">&times;</button>
        
        <!-- Header: Scheduled Time -->
        <div class="header">
            <p class="cardUsername">{{formatWeekday(selectedRow.scheduled_at)}}</p>
            <p class="cardInfoValue">{{ formatFullDateTime(selectedRow.scheduled_at) }}</p>
        </div>
        <div class="cardActions">
            <button class="edit-button" @click="openEditNotifPopup(selectedRow)">
            <img src="../../assets/pencil.svg" />
            </button>
            <button class="delete-button" @click="deleteNotification(selectedRow.id)">
            <img src="../../assets/trash.svg" />
            </button>


            <button
            class="sendnow-button"
            :disabled="sending"
            @click="sendNowAll(selectedRow)"
            title="Enviar agora para todos os subscritores"
          >
            {{ sending ? 'A enviar…' : 'Send now to all' }}
          </button>


        </div>
        <!-- Message -->
        <div class="cardInfo">
            <div class="cardInfoMember">
            <p class="cardInfoLabel">Message</p>
            <p class="cardInfoValue">{{ selectedRow.message }}</p>
            </div>

            <!-- Sent status -->
            <div class="cardInfoMember">
            <p class="cardInfoLabel"> Already Sent?</p>
            <p class="cardInfoValue">
                <span v-if="selectedRow.sent">Yes</span>
                <span v-else> No</span>
            </p>
            </div>
        </div>

        <!-- Actions -->

        </div>
  
    </div>
  
    <!-- Modal Popup -->
    <!-- Add Notification Modal -->
    <div v-if="showAddNotifModal" class="modal-overlay">
        <div class="modal">
            <button class="close-popup" @click="closeNotifModal()">&times;</button>
            <h2>Add Notification</h2>
            
            <form class="popup_form" @submit.prevent="addNotification">
            <div class="formField">
                <label for="notif_message">Message</label>
                <input v-model="newNotif.message" id="notif_message" required />
            </div>
            <div class="formField">
                <label for="notif_time">Scheduled Time</label>
                <input type="datetime-local" v-model="newNotif.scheduled_at" id="notif_time" required />
            </div>
            <div class="modal-actions">
                <button type="submit" class="btn-primary">Add</button>
            </div>
            </form>
        </div>
    </div>
        <!-- Edit Notification Modal -->
    <div v-if="showEditNotifModal" class="modal-overlay">
        <div class="modal">
            <button class="close-popup" @click="closeEditNotifModal()">&times;</button>
            <h2>Edit Notification</h2>
            
            <form class="popup_form" @submit.prevent="updateNotification">
            <div class="formField">
                <label for="edit_notif_message">Message</label>
                <input v-model="editNotif.message" id="edit_notif_message" required />
            </div>
            <div class="formField">
                <label for="edit_notif_time">Scheduled Time</label>
                <input type="datetime-local" v-model="editNotif.scheduled_at" id="edit_notif_time" required />
            </div>
            <div class="modal-actions">
                <button type="submit" class="btn-primary">Update</button>
            </div>
            </form>
        </div>
    </div>


  </template>
  
  <script setup>
  import axios from 'axios';
  import CryptoJS from "crypto-js";
  import TheTable from '../../global-components/TheTable.vue';
  import { ref, onMounted } from 'vue';
  import { useUserStore } from "../../stores/user.js";
  
  const userStore = useUserStore();
  const sending = ref(false);
  const message = ref('');
  const editNotif = ref({ id: null, message: '', scheduled_at: '' });
  const showEditNotifModal = ref(false);
  const newUser = ref({ username: '', role_id: '' });
  const editUser = ref({ username: '', role_id: '', external_id: ''});
  const selectedRow = ref(null);
  const showAddNotifModal = ref(false);
  const newNotif = ref({ message: '', scheduled_at: '' });
  
  function selectCallback(row) {
    selectedRow.value = {...row};
  }

  async function sendNowAll(notif) {
    if (!notif || !notif.message) {
      alert("Sem mensagem para enviar.");
      return;
    }
    sending.value = true;
    try {
      await axios.post(
        import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/notifications/send_notifications',
        { id: notif.id },
        {
          auth: {
            username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
            password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
          }
        }
      );
      await fetchData();
      if (selectedRow.value && selectedRow.value.id === notif.id) {
        selectedRow.value.sent = true;
      }
      alert('Notificação enviada para todos os subscritores.');
    } catch (e) {
      console.error('Falha no envio:', e);
      alert('Falhou enviar a notificação.');
    } finally {
      sending.value = false;
    }
  }



  
    function closeNotifModal() {
    showAddNotifModal.value = false;
    }

    function addNotification() {
    axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/notifications/add',
        { 
        message: newNotif.value.message,
        scheduled_at: newNotif.value.scheduled_at
        }, 
        { 
        auth: { 
            username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
            password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY 
        }
        }
    )
    .then(() => {
        fetchData();   // reload notifications
        closeNotifModal();
    })
    .catch(error => {
        console.error("Failed to add notification:", error);
    });
    }

    function deleteNotification(id) {
        axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/notifications/delete',
            { id: id },
            { 
            auth: { 
                username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
                password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY 
            }
            }
        )
        .then(() => {
            fetchData();       // refresh table
            closeCardInfo();   // close right popup
        })
        .catch(error => {
            console.error("Failed to delete notification:", error);
        });
        }

  function closeEditModal() {
    showEditUserModal.value = false;
  }
  
  function closeCardInfo(){
    selectedRow.value = null;
  }
  function formatWeekday(dateString) {
    if (!dateString) return "—";
    const clean = dateString.split(/[+-]\d{2}:\d{2}(:\d{2})?$/)[0];
    const date = new Date(clean);
    if (isNaN(date)) return dateString;

    return date.toLocaleDateString("en-US", { weekday: "long" });
    }

    function formatFullDateTime(dateString) {
        if (!dateString) return "—";
        const clean = dateString.split(/[+-]\d{2}:\d{2}(:\d{2})?$/)[0];
        const date = new Date(clean);
        if (isNaN(date)) return dateString;

        return date.toLocaleString("en-US", { 
            month: "numeric", 
            day: "numeric", 
            year: "numeric",
            hour: "numeric", 
            minute: "2-digit", 
            hour12: true 
        });
    }


  
  const datab = ref([{
    id: null,
    message: null,
    scheduled_at: null,
    sent: null
  }])

  const noResultsFound = ref(false);
  function handleNotFound(isEmpty) {
    noResultsFound.value = isEmpty;
  }
  
  const fetchData = () => {
    axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/notifications', {
        auth: {
            username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
            password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }
        })
        .then((response) => {
            datab.value = response.data.notifications.map(n => ({
      ...n,
      scheduled_at: formatFullDateTime(n.scheduled_at)   
    }));
        noResultsFound.value = datab.value.length === 0;
        })
        .catch(error => {
        console.error('Fetch error:', error);
        noResultsFound.value = true;
    });

  }

  
  onMounted(fetchData)
  const tablePref = {
    id: "ID",
    message: "Message",
    scheduled_at: "Scheduled Time",
    sent: "Sent"
  }
  
  function addUser() {
  
    let password = Math.random().toString(36).substring(2)+Math.random().toString(36).substring(2)
    let encryptedPassword = CryptoJS.DES.encrypt(password, import.meta.env.VITE_APP_API_KEY).toString();
  
    axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/user/addteamuser',
    { 
      user: { 
        name: "Not attributed yet",
        username: newUser.value.username, 
        role_id: newUser.value.role_id,
        password: encryptedPassword
      }
    }, 
    { 
      auth: { 
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY 
      }
    })
    .then(() => {
      fetchData();
      closeModal();
    })
    .catch(error => {
      console.error("Failed to add user :<");
    });
  }
  
  function deleteUser(external_id) {
    axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/userss/delete', {external_id: external_id},{ 
      auth: { 
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY 
      }
    })
    .then(() => {
      fetchData();
      closeCardInfo();
    })
    .catch(error => {
      console.error("Failed to delete user");
    });
  }
  

  
  function openEditNotifPopup(notif) {
    editNotif.value = { 
        id: notif.id,
        message: notif.message,
        scheduled_at: notif.scheduled_at
    };
    showEditNotifModal.value = true;
    }

    function updateNotification() {
        axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/notifications/update',
            { 
            id: editNotif.value.id,
            message: editNotif.value.message,
            scheduled_at: editNotif.value.scheduled_at
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
            closeEditNotifModal();
            closeCardInfo();
        })
        .catch(error => {
            console.error("Failed to update notification:", error);
        });
    }

function closeEditNotifModal() {
  showEditNotifModal.value = false;
}



  function updateUser() {
    axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/userss/update',
    { 
      new_username: editUser.value.username, 
      new_role: editUser.value.role_id,
      external_id: editUser.value.external_id,
    }, 
    { 
      auth: { 
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY 
      }
    })
    .then(() => {
      fetchData();
      closeEditModal();
      closeCardInfo();
    })
    .catch(error => {
      console.error("Failed to add user :<");
    });
  }
  
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
  .cardUseless{
    color: gray;
    margin-bottom: 1rem;
  }
  .search_style {
    display: flex;
    background-color: var(--c-accent);
    height: 50px;
    line-height: 50px;
    align-items: center;
    gap: 1ch;
    padding-left: 1ch;
    border-radius: 6px;
    width: 100%;
  }
  
  .search_style > label > img {
    width: 20px;
    position: relative;
    top: 4px;
    left: 3px;
  }
  
  .search_style > input {
    appearance: none;
    background-color: transparent;
    border: 0px;
    color: var(--c-ft-semi-light);
    font-style: inherit;
    font-variant: inherit;
    font-weight: inherit;
    font-stretch: inherit;
    line-height: inherit;
    font-family: inherit;
    font-size-adjust: inherit;
    font-kerning: inherit;
    font-optical-sizing: inherit;
    font-language-override: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    font-size: 1rem;
    height: 100%;
    outline: none;
    padding: 0px 0px 0px 8px;
    width: 100%;
  }
  
  .search_style input::placeholder {
    color: var(--c-ft-semi-light);
  }
  
  
  form > button {
    font-size: 1rem;
    font-weight: 500;
    border: none;
    background-color: var(--c-select);
    border-radius: 6px;
    color: var(--c-bg-light);
    cursor: pointer;
    padding: 0px 15px;
    height: 100%;
    width: 25%;
  }
  
  .router-link {
    font-size: 1rem;
    font-weight: 500;
    border: none;
    background-color: var(--c-select);
    border-radius: 6px;
    color: var(--c-bg-light);
    cursor: pointer;
    padding: 0px 15px;
    height: 100%;
    width: 25%;
    text-decoration: none; /* Remove underline */
  }
  
  
  .chevron{
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
    border-radius: 1.5rem;
    background-color: #eef4fb;
    padding: 1.5rem;
    margin-left: 2rem;
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
    font-size: 1.5rem ;
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
    margin-top: 2rem;
    margin-bottom: 1rem;
    display: flex;
    gap: 10px;
    
  }
  
  .right-popup-placeholder .edit-button,
  .right-popup-placeholder .delete-button {
    background-color: #ffffff;
    border: none;
    border-radius: 8px;
    padding: 8px;
    cursor: pointer;
    font-size: 1.2rem;
    
  }
  
  .right-popup-placeholder .edit-button:hover,
  .right-popup-placeholder .delete-button:hover {
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
    margin: 1rem;
    max-width: 700px;
    width: 100%;
    /* min-height: 70%; */
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
  
  .formUsername {
    width: 100%;
  }
  
  .formRole {
    
    justify-content: flex-start;
    align-self: flex-start;
    width: 60%;
  }
  
  /* Label Styling */
  .popup,
  .formRole label,
  .formUsername label {
    display: block;
    margin-bottom: -1rem;
    padding: 0px;
    font-size: 1rem;
    font-weight: 500;
  }
  
  /* Input Styling */
  .formRole input,
  .formUsername input,
  .formRole select,
  .formUsername select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
  }
  
  /* Button Styling */
  .btnCancel,
  .btn-primary {
    width: 15%;
    background-color: var(--c-select);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    font-size: 1rem;
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
  
  .tableBackground {
    background-color: var(--c-accent);
    border-radius: 6px;
    min-height: 70%;
    
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
  
  
  @media (max-width: 768px) {
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
      left: 43%;
      transform: translate(-50%, -50%);
      width: 90%; 
      height: calc(97dvh - var(--header-height)); 
      background-color: #eef4fb; 
      padding: 1rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  
    
    .btnCancel,
    .btn-primary {
      width: 5rem;
      background-color: var(--c-select);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
  
    form > button {
      font-size: 1rem;
      font-weight: 500;
      border: none;
      background-color: var(--c-select);
      border-radius: 6px;
      color: var(--c-bg-light);
      cursor: pointer;
      width: 6rem;
      padding-right: 1rem;
      
    }
  
    .router-link {
      font-size: 1rem;
      font-weight: 500;
      border: none;
      background-color: var(--c-select);
      border-radius: 6px;
      color: var(--c-bg-light);
      cursor: pointer;
      width: 6rem;
      padding-right: 1rem;
      text-decoration: none; /* Remove underline */
      
    }
  
    .chevron{
      display: none;
    
    }
    .no-users-found {
    text-align: center;
    font-size: 1.2rem;
    color: gray;
    margin-top: 20px;
  }
  
  }
  
  .right-popup-placeholder .sendnow-button {
  background-color: #0e7a0d;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 0.95rem;
}
.right-popup-placeholder .sendnow-button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

  </style>