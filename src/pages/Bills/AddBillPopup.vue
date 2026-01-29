<script setup>
import { ref } from 'vue';

import axios from 'axios';

import { useUserStore } from "../../stores/user";
const userStore = useUserStore();

import * as HttpAdmin from "@utils/http-admin";

const props = defineProps({
    isOpen: Boolean,
});

const emit = defineEmits(["modal-close","modal-submit"]);

// Add ref for file input and filename display
const fileInput = ref(null);
const selectedFileName = ref('');

let value = ref();
let date = ref();
let shop = ref();
let description = ref();
let status = ref('Pending');
let is_paid = ref('No');
let bill_image_binary = ref();

async function submitAddBill(e) {
    e.preventDefault();
    
    // Validate required fields
    if (!value.value || !date.value || !shop.value || !bill_image_binary.value) {
        alert("Please fill in all required fields and select an image");
        return;
    }
    
    const formData = new FormData(); 
    formData.append("bill_image_binary", bill_image_binary.value);
    formData.append("is_paid", is_paid.value);
    formData.append("status", status.value);
    formData.append("shop", shop.value);
    formData.append("date", date.value);
    formData.append("value", value.value);
    formData.append("username", userStore.username)

    axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/insert-bill', formData,
        {auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }
    })
    .then(response => {
        console.log(response.data);
        if (response.data.error == "") {
            alert("Bill added sucessfully")
            // Reset form
            value.value = null;
            date.value = null;
            shop.value = null;
            description.value = null;
            status.value = 'Pending';
            is_paid.value = 'No';
            removeFile();
            
            emit('modal-close');
            emit('modal-submit');
        }else{
            alert("Error adding bill")
        }
    })
    .catch(error => {
        console.error("Error")
    });
    
    // try {
    //     const response = await HttpAdmin.POST("/insert-bill", formData);
    //     if(response.request.status != 200){ 
    //         alert("Something went wrong when creating a new bill...")
    //     } else {
    //         // Reset form
    //         value.value = null;
    //         date.value = null;
    //         shop.value = null;
    //         description.value = null;
    //         status.value = 'Pending';
    //         is_paid.value = 'No';
    //         removeFile();
            
    //         emit('modal-close');
    //         emit('modal-submit');
    //     }
    // } catch (error) {
    //     console.error("Error creating bill:", error);
    //     alert("Failed to create bill. Please try again.");
    // }
};

function handleFileChange(e) {
    const file = e.target.files[0];
    
    if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file (PNG, JPG, etc.)');
            return;
        }
        
        bill_image_binary.value = file;
        selectedFileName.value = file.name;
    }
}

// Function to trigger file input
function selectFile() {
    fileInput.value?.click();
}

// Function to remove selected file
function removeFile() {
    bill_image_binary.value = null;
    selectedFileName.value = '';
    if (fileInput.value) {
        fileInput.value.value = '';
    }
}




</script>



<template>
<div class="modal-mask" v-if="props.isOpen"> 
    <div class="popup">
        <form class="form" @submit.prevent="submitAddBill">
            <h2>Add Bill</h2>
            
            <div class="form-grid">
                <!-- Row 1: Value and Shop -->
                <div class="form-group">
                    <label for="value">Value</label>
                    <input 
                        required 
                        type="number" 
                        step="0.01" 
                        min="0" 
                        placeholder="0.00" 
                        id="value" 
                        v-model="value"
                    >
                </div>
                
                <div class="form-group">
                    <label for="shop">Shop</label>
                    <input 
                        required 
                        type="text" 
                        placeholder="Enter shop name" 
                        id="shop" 
                        v-model="shop"
                    >
                </div>
                
                <!-- Row 2: Description (full width) -->
                <div class="form-group full-width">
                    <label for="description">Description</label>
                    <textarea 
                        id="description" 
                        v-model="description"
                        placeholder="Enter bill description"
                        rows="4"
                    ></textarea>
                </div>
                
                <!-- Row 3: Date and Bill Photo -->
                <div class="form-group">
                    <label for="date">Date</label>
                    <input 
                        required 
                        type="date" 
                        id="date" 
                        v-model="date"
                        class="date-input"
                    >
                </div>
                
                <div class="form-group">
                    <label for="bill-photo">Bill Photo</label>
                    <div class="file-upload">
                        <!-- Hidden file input -->
                        <input 
                            type="file" 
                            ref="fileInput"
                            id="bill-photo"
                            accept="image/*" 
                            @change="handleFileChange"
                            style="display: none;"
                        >
                        
                        <!-- File upload UI -->
                        <div v-if="!selectedFileName" class="file-upload-area">
                            <button 
                                type="button" 
                                class="add-photo-btn"
                                @click="selectFile"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                    <circle cx="8.5" cy="8.5" r="1.5"/>
                                    <polyline points="21,15 16,10 5,21"/>
                                </svg>
                                Add Photo
                            </button>
                        </div>
                        
                        <!-- Selected file display -->
                        <div v-else class="file-selected">
                            <div class="file-info">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                    <circle cx="8.5" cy="8.5" r="1.5"/>
                                    <polyline points="21,15 16,10 5,21"/>
                                </svg>
                                <span class="file-name">{{ selectedFileName }}</span>
                            </div>
                            <div class="file-actions">
                                <button 
                                    type="button" 
                                    class="change-file-btn"
                                    @click="selectFile"
                                    title="Change file"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                        <path d="m18.5 2.5 3 3L12 15l-4 1 1-4Z"/>
                                    </svg>
                                </button>
                                <button 
                                    type="button" 
                                    class="remove-file-btn"
                                    @click="removeFile"
                                    title="Remove file"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="18" y1="6" x2="6" y2="18"/>
                                        <line x1="6" y1="6" x2="18" y2="18"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="form-actions">
                <button 
                    class="cancel-btn" 
                    type="button"
                    @click="emit('modal-close')"
                >
                    Cancel
                </button>
                <button 
                    class="add-btn" 
                    type="submit"
                >
                    Add
                </button>
            </div>
        </form>
    </div>
</div>
</template>



<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup {
    background-color: white;
    border-radius: 16px;
    padding: 2rem;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.form h2 {
    color: var(--c-ft-dark);
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 2rem;
    text-align: left;
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group.full-width {
    grid-column: 1 / -1;
}

.form-group label {
    color: var(--c-ft-dark);
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea {
    padding: 0.75rem 1rem;
    border: 1.5px solid #e1e1e1;
    border-radius: 8px;
    font-size: 1rem;
    color: var(--c-ft-dark);
    background-color: white;
    outline: none;
    transition: border-color 0.2s ease;
}

.form-group input:focus,
.form-group textarea:focus {
    border-color: var(--c-select);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
    color: var(--c-ft-light);
}

.form-group textarea {
    resize: vertical;
    min-height: 80px;
}

/* Enhanced Date Input Styling for Mobile */
.date-input {
    /* Minimal styling to avoid interfering with native mobile behavior */
    position: relative;
    cursor: pointer;
    min-height: 48px; /* Better touch target */
    font-size: 16px; /* Prevents iOS zoom */
}

/* Only override appearance on desktop, leave mobile native */
@media (min-width: 769px) {
    .date-input {
        /* Desktop styling with calendar icon */
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='4' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Cline x1='16' y1='2' x2='16' y2='6'%3E%3C/line%3E%3Cline x1='8' y1='2' x2='8' y2='6'%3E%3C/line%3E%3Cline x1='3' y1='10' x2='21' y2='10'%3E%3C/line%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 0.75rem center;
        background-size: 20px;
        padding-right: 3rem;
    }
}

/* Mobile-specific: Keep native behavior */
@media (max-width: 768px) {
    .date-input {
        /* Ensure native mobile date picker works */
        -webkit-appearance: auto;
        -moz-appearance: auto;
        appearance: auto;
        padding-right: 1rem; /* Remove extra padding */
        background-image: none; /* Remove custom icon on mobile */
    }
    
    .date-input::-webkit-calendar-picker-indicator {
        /* Let the native indicator show on mobile */
        opacity: 1;
        cursor: pointer;
    }
}

/* File Upload Styles */
.file-upload {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.file-upload-area {
    display: flex;
    align-items: center;
}

.add-photo-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--c-select);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.add-photo-btn:hover {
    background-color: #4088c4;
}

.file-selected {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f8f9fa;
    border: 1.5px solid #e1e1e1;
    border-radius: 8px;
    padding: 0.75rem 1rem;
}

.file-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
}

.file-info svg {
    color: var(--c-select);
}

.file-name {
    color: var(--c-ft-dark);
    font-size: 0.9rem;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.file-actions {
    display: flex;
    gap: 0.5rem;
}

.change-file-btn,
.remove-file-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.change-file-btn {
    background-color: #e3f2fd;
    color: var(--c-select);
}

.change-file-btn:hover {
    background-color: #bbdefb;
}

.remove-file-btn {
    background-color: #ffebee;
    color: #f44336;
}

.remove-file-btn:hover {
    background-color: #ffcdd2;
}

.form-actions {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
}

.cancel-btn {
    background-color: #f3f4f6;
    color: var(--c-ft-dark);
    border: 1px solid #d1d5db;
    border-radius: 8px;
    padding: 0.875rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.cancel-btn:hover {
    background-color: #e5e7eb;
    border-color: #9ca3af;
}

.add-btn {
    background-color: #1e3a8a;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.875rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.add-btn:hover {
    background-color: #1d4ed8;
}

@media (max-width: 768px) {
    .popup {
        width: 95%;
        padding: 1.5rem;
    }
    
    .form-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .form-group.full-width {
        grid-column: 1;
    }
    
    .form h2 {
        font-size: 1.25rem;
        margin-bottom: 1.5rem;
    }
    
    .file-selected {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
    }
    
    .file-actions {
        align-self: flex-end;
    }
    
    /* Enhanced mobile date input */
    .date-input {
        /* Larger touch target for mobile */
        min-height: 48px;
        font-size: 16px; /* Prevents zoom on iOS */
        /* Ensure native behavior on mobile */
        -webkit-appearance: auto !important;
        -moz-appearance: auto !important;
        appearance: auto !important;
    }
}
</style>