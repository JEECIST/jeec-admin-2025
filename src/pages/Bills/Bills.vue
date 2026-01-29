<script setup>
import { ref, computed, onMounted } from 'vue';
import AddBillPopup from './AddBillPopup.vue';
import * as HttpAdmin from "@utils/http-admin";
import axios from 'axios';
import { useUserStore } from "../../stores/user";
const userStore = useUserStore();

// Reactive state
const query = ref('');
const showAddModal = ref(false);
const selectedBill = ref(null);
const showBillDetail = ref(false);
const loading = ref(false);
const error = ref(null);

// //Mockup bills data
// const bills = ref([
//   {
//     id: 1,
//     value: 1.50,
//     date: '12-01-2024',
//     shop: 'Pingo Doce',
//     status: 'Approved',
//     is_paid: 'Yes'
//   },
//   {
//     id: 2,
//     value: 15.00,
//     date: '22-01-2024',
//     shop: 'Social',
//     status: 'Rejected',
//     is_paid: 'No'
//   },
//   {
//     id: 3,
//     value: 4.00,
//     date: '17-02-2024',
//     shop: 'Pingo Doce',
//     status: 'Approved',
//     is_paid: 'No'
//   },
//   {
//     id: 41,
//     value: 1.00,
//     date: '28-02-2024',
//     shop: 'Continente',
//     status: 'Reviewing',
//     is_paid: 'No'
//   }
// ]);

// Bills data from API
const bills = ref([]);

// Computed properties
const filteredBills = computed(() => {
  if (!query.value.trim()) return bills.value;
  return bills.value.filter(bill => 
    bill.shop?.toLowerCase().includes(query.value.toLowerCase()) ||
    bill.value?.toString().includes(query.value) ||
    bill.status?.toLowerCase().includes(query.value.toLowerCase())
  );
});

// Methods
function onAddBill() {
  showAddModal.value = true;
}

function closeAddModal() {
  showAddModal.value = false;
}

async function onBillSubmitted() {
  // Refresh bills list after adding new bill
  await fetchBills();
}

function fetchBills() {
  axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/bills', 
  {username: userStore.username},
  {auth: {
         username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
         password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
  }}).then(response => {
    bills.value = response.data.bills
  })
}

function showBillDetails(bill) {
  selectedBill.value = bill;
  showBillDetail.value = true;
}

function closeBillDetail() {
  showBillDetail.value = false;
  selectedBill.value = null;
}

function deleteBill() {
  if (!selectedBill.value) return;
  
  axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/delete-bill', 
    {id: selectedBill.value.id },
    {auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }
  })
  .then(response => {
    if (response.data.error == "") {
      alert("Deleted Sucessfully")
      fetchBills()
      closeBillDetail()
    }else{
      alert("Error Deleting")
    }
  })
  .catch(error => {
    console.error("Error deleting bill:", error);
    error_flag.value = true;
  });
}

function viewBillReceipt() {
  if (!selectedBill.value) return;

  axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/get-image-by-bill-id',
    { id: selectedBill.value.id },
    {
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
      },
      responseType: 'blob'
    }
  )
  .then(async (response) => {
    const ct = response.headers['content-type'] || '';

    // If backend returned JSON error, parse blob text
    if (ct.includes('application/json')) {
      const text = await response.data.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch (err) {
        console.error('Failed to parse JSON error response', err);
        alert('Error fetching receipt');
        return;
      }
      alert(json.error || 'Error fetching receipt');
      return;
    }

    // Otherwise, we received an image blob — open in new tab
    const blob = response.data;
    const objectUrl = URL.createObjectURL(blob);
    window.open(objectUrl, '_blank');

    // Revoke object URL later to free memory
    setTimeout(() => URL.revokeObjectURL(objectUrl), 10000);
  })
  .catch((error) => {
    console.error('Error fetching image:', error);
    alert('Error fetching receipt');
  });
}

function getStatusClass(status) {
  switch (status.toLowerCase()) {
    case 'approved':
      return 'status-approved';
    case 'rejected':
      return 'status-rejected';
    case 'reviewing':
      return 'status-reviewing';
    case 'pending':
      return 'status-pending';
    default:
      return '';
  }
}

// Fetch bills on component mount
onMounted(() => {
  fetchBills();
});
</script>

<template>
  <div class="wrapper">
    <div class="page-content">
      <!-- Page Header -->
      <div class="page-header">
        <h1>Bills</h1>
      </div>
      
      <!-- Toolbar -->
      <div class="toolbar">
        <div class="search-container">
          <div class="search-input">
            <img src="../../assets/search.svg" alt="Search">
            <input 
              v-model="query" 
              type="text" 
              placeholder="Search for a bill"
            >
          </div>
        </div>
        <button class="add-btn" @click="onAddBill">
          Add Bill
        </button>
      </div>
      
      <!-- Main Content Card -->
      <div class="content-card">
        <div v-if="loading" class="empty-state">
          <p>Loading bills...</p>
        </div>
        
        <div v-else-if="error" class="empty-state error">
          <p>{{ error }}</p>
          <button @click="fetchBills" class="retry-btn">Retry</button>
        </div>
        
        <div v-else-if="filteredBills.length === 0" class="empty-state">
          <p>No Bills found</p>
        </div>
        
        <!-- Bills Table -->
        <div v-else class="bills-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Value</th>
                <th>Date</th>
                <th>Shop</th>
                <th>Status</th>
                <th>Paid</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="bill in filteredBills" :key="bill.id" :class="getStatusClass(bill.status)" @click="showBillDetails(bill)">
                <td>{{ bill.id }}</td>
                <td>€{{ Number(bill.value).toFixed(2) }}</td>
                <td>{{ bill.date }}</td>
                <td>{{ bill.shop }}</td>
                <td>{{ bill.status }}</td>
                <td>{{ bill.is_paid }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <!-- Add Bill Modal -->
    <AddBillPopup
      :isOpen="showAddModal"
      @modal-close="closeAddModal"
      @modal-submit="onBillSubmitted"
    />

    <!-- Bill Detail Modal -->
    <div v-if="showBillDetail" class="modal-overlay" @click="closeBillDetail">
      <div class="bill-detail-card" @click.stop>
        <!-- JEEC Logo -->
        <div class="logo-section">
          <div class="jeec-logo">
            <img src="../../assets/jeec25.png" alt="JEEC 2024" class="logo-img">
          </div>
        </div>
        
        <!-- Date -->
        <div class="bill-date">
          {{ selectedBill?.date }}
        </div>
        
        <!-- Bill Title -->
        <div class="bill-title">
          Bill
        </div>
        
        <!-- Action Buttons -->
        <div class="action-buttons">
          <button class="action-btn receipt-btn" @click="viewBillReceipt" title="View Receipt">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10,9 9,9 8,9"></polyline>
            </svg>
          </button>
          <!-- <button class="action-btn delete-btn" @click="deleteBill" title="Delete Bill">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3,6 5,6 21,6"></polyline>
              <path d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button> -->
        </div>
        
        <!-- Bill Details -->
        <div class="bill-details">
          <div class="detail-row">
            <div class="detail-label">Value</div>
            <div class="detail-value">€{{ Number(selectedBill?.value).toFixed(2) }}</div>
          </div>
          
          <div class="detail-row">
            <div class="detail-label">Shop</div>
            <div class="detail-value">{{ selectedBill?.shop }}</div>
          </div>
          
          <div class="detail-row-double">
            <div class="detail-column">
              <div class="detail-label">Status</div>
              <div class="detail-value">{{ selectedBill?.status }}</div>
            </div>
            <div class="detail-column">
              <div class="detail-label">Paid</div>
              <div class="detail-value">{{ selectedBill?.is_paid }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  position: relative;
  height: calc(100dvh - var(--header-height));
  padding: 2rem;
  overflow-y: auto;
}

.page-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: 600;
  color: var(--c-ft-dark);
  margin: 0;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.search-container {
  flex: 1;
  max-width: 2000px;
}

.search-input {
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

.search-input img {
  width: 20px;
  height: 20px;
  opacity: 0.6;
}

.search-input input {
  appearance: none;
  background-color: transparent;
  border: 0;
  color: var(--c-ft-semi-light);
  font-family: inherit;
  font-size: 1rem;
  width: 100%;
  outline: none;
}

.search-input input::placeholder {
  color: var(--c-ft-light);
}

.add-btn {
  font-size: 1rem;
  font-weight: 600;
  border: none;
  background-color: var(--c-select);
  border-radius: 10px;
  color: var(--c-bg-light);
  cursor: pointer;
  padding: 0.8rem 2rem;
  height: 50px;
  white-space: nowrap;
  transition: background-color 0.2s ease;
}

.add-btn:hover {
  background-color: #4088c4;
}

.content-card {
  flex: 1;
  background-color: var(--c-bg-light);
  border-radius: 12px;
  padding: 2rem;
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-size: 28px;
  font-weight: 600;
  color: #4F4F4F;
  gap: 1rem;
}

.empty-state.error {
  color: #f44336;
}

.retry-btn {
  font-size: 1rem;
  font-weight: 600;
  border: none;
  background-color: var(--c-select);
  border-radius: 8px;
  color: var(--c-bg-light);
  cursor: pointer;
  padding: 0.6rem 1.5rem;
  transition: background-color 0.2s ease;
}

.retry-btn:hover {
  background-color: #4088c4;
}

.bills-table {
  flex: 1;
  overflow-x: auto;
}

.bills-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  border-spacing: 0;
}

.bills-table th {
  color: var(--c-ft-dark);
  font-weight: 600;
  padding: 1rem 1.5rem;
  text-align: left;
  border: none;
  font-size: 0.9rem;
}

.bills-table td {
  padding: 1rem 1.5rem;
  border: none;
  color: var(--c-ft-dark);
  font-weight: 400;
}

.bills-table tbody tr {
  transition: background-color 0.2s ease;
  border-radius: 8px;
}

/* Alternating row colors for visual styling */
.bills-table tbody tr:nth-child(odd) {
  background-color: transparent;
}

.bills-table tbody tr:nth-child(even) {
  background-color: var(--c-accent);
}

/* Hover and click effects */
.bills-table tbody tr:hover {
  background-color: #509CDB !important;
  color: white;
  cursor: pointer;
}

.bills-table tbody tr:hover td {
  color: white;
}

/* Remove status-based styling - no longer needed */

/* Bill Detail Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.bill-detail-card {
  background: #ddf0ff;
  border-radius: 20px;
  padding: 2rem;
  width: 400px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.logo-section {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.jeec-logo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333;
}

.logo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bill-date {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  color: #333;
  margin-bottom: 0.5rem;
}

.bill-title {
  font-size: 1.2rem;
  font-weight: 400;
  text-align: center;
  color: #666;
  margin-bottom: 1.5rem;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.action-btn {
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

.bill-details {
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
}

.detail-row {
  margin-bottom: 1.5rem;
}

.detail-row-double {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.detail-column {
  flex: 1;
}

.detail-label {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.detail-value {
  font-size: 1.1rem;
  font-weight: 400;
  color: #666;
}

/* Mobile responsiveness for modal */
@media screen and (max-width: 600px) {
  .bill-detail-card {
    width: 350px;
    padding: 1.5rem;
  }
  
  .jeec-logo {
    width: 120px;
    height: 120px;
  }
  
  .bill-date {
    font-size: 1.5rem;
  }
  
  .detail-row-double {
    flex-direction: column;
    gap: 1rem;
  }
}

/* Mobile responsiveness */
@media screen and (max-width: 1000px) {
  .wrapper {
    height: calc(100dvh - var(--mobile-header-height));
    padding: 1rem;
  }
  
  .page-header h1 {
    font-size: 1.5rem;
  }
  
  .toolbar {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .search-container {
    max-width: none;
  }
  
  .add-btn {
    width: 100%;
  }
  
  .content-card {
    padding: 1rem;
    min-height: 300px;
  }
  
  .bills-table {
    font-size: 0.85rem;
  }
  
  .bills-table th,
  .bills-table td {
    padding: 0.75rem 0.5rem;
  }
}

@media screen and (max-width: 600px) {
  .wrapper {
    padding: 0.5rem;
  }
  
  .page-content {
    gap: 1rem;
  }
  
  .bills-table {
    font-size: 0.8rem;
  }
  
  .bills-table th,
  .bills-table td {
    padding: 0.5rem 0.25rem;
  }
}
</style>
