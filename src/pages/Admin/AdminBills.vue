<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// Reactive state
const query = ref('');
const selectedBill = ref(null);
const showBillDetail = ref(false);
const loading = ref(false);
const error = ref(null);

// Filter states
const statusFilter = ref('All');
const paidFilter = ref('All');

// Bills data from API
const bills = ref([]);

// Computed properties
const filteredBills = computed(() => {
  let filtered = bills.value;
  
  // Apply status filter
  if (statusFilter.value !== 'All') {
    filtered = filtered.filter(bill => bill.status === statusFilter.value);
  }
  
  // Apply paid filter
  if (paidFilter.value !== 'All') {
    filtered = filtered.filter(bill => bill.is_paid === paidFilter.value);
  }
  
  // Apply search query
  if (query.value.trim()) {
    filtered = filtered.filter(bill => 
      bill.shop?.toLowerCase().includes(query.value.toLowerCase()) ||
      bill.username?.toLowerCase().includes(query.value.toLowerCase()) ||
      bill.name?.toLowerCase().includes(query.value.toLowerCase()) ||
      bill.value?.toString().includes(query.value) ||
      bill.status?.toLowerCase().includes(query.value.toLowerCase())
    );
  }
  
  return filtered;
});

// Methods
function fetchBills() {
  loading.value = true;
  axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/admin-bills/all', 
  {},
  {auth: {
         username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
         password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
  }}).then(response => {
    console.log(response.data)
    bills.value = response.data.bills
    loading.value = false;
  })
  .catch(err => {
    console.error("Error fetching bills:", err);
    error.value = "Failed to fetch bills";
    loading.value = false;
  });
}

function showBillDetails(bill) {
  selectedBill.value = bill;
  showBillDetail.value = true;
}

function closeBillDetail() {
  showBillDetail.value = false;
  selectedBill.value = null;
}

function approveBill() {
  if (!selectedBill.value) return;
  
  // Confirmation dialog
  const confirmMessage = `CONFIRM ACTION\n\n` +
    `You are about to APPROVE this bill:\n\n` +
    `Bill ID: ${selectedBill.value.id}\n` +
    `User: ${selectedBill.value.name} (${selectedBill.value.username})\n` +
    `Shop: ${selectedBill.value.shop}\n` +
    `Value: €${Number(selectedBill.value.value).toFixed(2)}\n` +
    `Current Status: ${selectedBill.value.status}\n\n` +
    `This action will be recorded in your name.\n\n` +
    `Do you want to proceed?`;

  if (!confirm(confirmMessage)) {
    return; // User cancelled
  }
  
  axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/admin-bills/approve', 
    {
      id: selectedBill.value.id,
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME
    },
    {auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }
  })
  .then(response => {
    console.log(response.data);
    if (response.data.error == "") {
      alert("Bill Approved Successfully")
      fetchBills()
      closeBillDetail()
    }else{
      alert("Error Approving Bill")
    }
  })
  .catch(error => {
    console.error("Error approving bill:", error);
    alert("Error Approving Bill");
  });
}

function rejectBill() {
  if (!selectedBill.value) return;
  
  // Confirmation dialog
  const confirmMessage = `CONFIRM ACTION\n\n` +
    `You are about to REJECT this bill:\n\n` +
    `Bill ID: ${selectedBill.value.id}\n` +
    `User: ${selectedBill.value.name} (${selectedBill.value.username})\n` +
    `Shop: ${selectedBill.value.shop}\n` +
    `Value: €${Number(selectedBill.value.value).toFixed(2)}\n` +
    `Current Status: ${selectedBill.value.status}\n\n` +
    `This action will be recorded in your name.\n\n` +
    `Do you want to proceed?`;

  if (!confirm(confirmMessage)) {
    return; // User cancelled
  }
  
  axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/admin-bills/reject', 
    {
      id: selectedBill.value.id,
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME
    },
    {auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }
  })
  .then(response => {
    console.log(response.data);
    if (response.data.error == "") {
      alert("Bill Rejected Successfully")
      fetchBills()
      closeBillDetail()
    }else{
      alert("Error Rejecting Bill")
    }
  })
  .catch(error => {
    console.error("Error rejecting bill:", error);
    alert("Error Rejecting Bill");
  });
}

function markPaidBill() {
  if (!selectedBill.value) return;
  
  // Confirmation dialog
  const confirmMessage = `CONFIRM ACTION\n\n` +
    `You are about to MARK AS PAID this bill:\n\n` +
    `Bill ID: ${selectedBill.value.id}\n` +
    `User: ${selectedBill.value.name} (${selectedBill.value.username})\n` +
    `Shop: ${selectedBill.value.shop}\n` +
    `Value: €${Number(selectedBill.value.value).toFixed(2)}\n` +
    `Current Status: ${selectedBill.value.status}\n\n` +
    `This action will be recorded in your name.\n\n` +
    `Do you want to proceed?`;

  if (!confirm(confirmMessage)) {
    return; // User cancelled
  }
  
  axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/admin-bills/mark-paid', 
    {
      id: selectedBill.value.id,
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME
    },
    {auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }
  })
  .then(response => {
    console.log(response.data);
    if (response.data.error == "") {
      alert("Bill Marked as Paid Successfully")
      fetchBills()
      closeBillDetail()
    }else{
      alert("Error Marking Bill as Paid")
    }
  })
  .catch(error => {
    console.error("Error marking bill as paid:", error);
    alert("Error Marking Bill as Paid");
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
        <h1>Bills Management</h1>
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
        
        <!-- Filter Dropdowns -->
        <div class="filter-container">
          <select v-model="statusFilter" class="filter-select">
            <option value="All">All Status</option>
            <option value="Reviewing">Reviewing</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Paid">Paid</option>
          </select>
          
          <select v-model="paidFilter" class="filter-select">
            <option value="All">All Paid</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
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
                <th>Username</th>
                <th>Member</th>
                <th>Value Out</th>
                <th>Date</th>
                <th>Shop</th>
                <th>Status</th>
                <th>Paid</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="bill in filteredBills" :key="bill.id" @click="showBillDetails(bill)">
                <td>{{ bill.id }}</td>
                <td>{{ bill.username }}</td>
                <td>{{ bill.name }}</td>
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
          Bill - {{ selectedBill?.name }}
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
          <button class="action-btn approve-btn" @click="approveBill" title="Approve Bill">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </button>
          <button class="action-btn reject-btn" @click="rejectBill" title="Reject Bill">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <button class="action-btn pay-btn" @click="markPaidBill" title="Mark as Paid">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
          </button>
        </div>
        
        <!-- Bill Details -->
        <div class="bill-details">
          <div class="detail-row">
            <div class="detail-label">Username</div>
            <div class="detail-value">{{ selectedBill?.username }}</div>
          </div>
          
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
          
          <!-- Admin Action Info -->
          <div v-if="selectedBill?.last_action_by" class="detail-row admin-action-info">
            <div class="detail-label">Last Action By</div>
            <div class="detail-value">
              {{ selectedBill.last_action_by }} ({{ selectedBill.last_action_username }})
              <span class="action-date">{{ selectedBill.last_action_date }}</span>
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
  flex-wrap: wrap;
}

.search-container {
  flex: 1;
  min-width: 300px;
  max-width: 2000px;
}

.filter-container {
  display: flex;
  gap: 0.5rem;
}

.filter-select {
  appearance: none;
  background-color: var(--c-accent);
  border: none;
  border-radius: 6px;
  color: var(--c-ft-semi-light);
  font-family: inherit;
  font-size: 1rem;
  padding: 0.75rem 2rem 0.75rem 1rem;
  cursor: pointer;
  outline: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23828282' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  transition: background-color 0.2s ease;
}

.filter-select:hover {
  background-color: #3a3a3a;
}

.filter-select option {
  background-color: var(--c-bg-dark);
  color: var(--c-ft-semi-light);
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
  gap: 1rem;
  margin-bottom: 2rem;
}

.action-btn {
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.2s ease;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.receipt-btn {
  background-color: #9c27b0;
}

.receipt-btn:hover {
  background-color: #7b1fa2;
}

.approve-btn {
  background-color: #4caf50;
}

.approve-btn:hover {
  background-color: #45a049;
}

.reject-btn {
  background-color: #f44336;
}

.reject-btn:hover {
  background-color: #da190b;
}

.pay-btn {
  background-color: #2196F3;
}

.pay-btn:hover {
  background-color: #0b7dda;
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

.admin-action-info {
  background-color: #f0f7ff;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #2196F3;
}

.admin-action-info .detail-label {
  color: #1976D2;
}

.admin-action-info .detail-value {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.action-date {
  font-size: 0.9rem;
  color: #999;
  font-style: italic;
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

  .action-buttons {
    gap: 0.5rem;
  }

  .action-btn {
    width: 50px;
    height: 50px;
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
