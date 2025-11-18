<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import TheTable from '../../global-components/TheTable.vue';

const wordleData = ref([])
const eventDays = ref([])
const events = ref([])
const selectedEvent = ref(null)
const loading = ref(true)
const newWord = ref('')
const editWord = ref('') // Separate variable for editing existing words
const editingWordId = ref(null)
const message = ref('')
const messageType = ref('')
const selectedRow = ref(null)
const showWordsModal = ref(false)

// Cache for events data and wordle words
const eventsCache = ref(null)
const wordleWordsCache = ref(null)

// Table configuration
const tableHeaders = {
  day_name: 'Day',
  word_count: 'Words Count',
  words_preview: 'Words Preview'
}

// Remove the manage words button since we'll use the side menu
const tableButtons = ref([])

// Computed data for the table
const tableData = computed(() => {
  return wordleData.value.map(day => ({
    ...day,
    day_name: day.day_formatted.replace(/(\d{2}) (\d{2}) (\d{4})/, '$1/$2/$3'), // Replace only date spaces with slashes
    word_count: day.words.length,
    words_preview: day.words.length > 0 
      ? day.words.map(w => w.word).join(', ')
      : 'No words set'
  }))
})

// Handle table row selection
const onRowSelect = (row) => {
  selectedRow.value = row
}

// Close the side menu
const closeCardInfo = () => {
  selectedRow.value = null
}

// Open the words management modal
const openWordsModal = () => {
  showWordsModal.value = true
}

// Close the words management modal
const closeWordsModal = () => {
  showWordsModal.value = false
  editingWordId.value = null
  newWord.value = ''
}

// Start editing a word
const startEdit = (word) => {
  editingWordId.value = word.id
  editWord.value = word.word
}

// Start adding a new word
const startAdd = () => {
  editingWordId.value = null
  newWord.value = ''
}

// Cancel editing
const cancelEdit = () => {
  editingWordId.value = null
  newWord.value = ''
  editWord.value = ''
}

// Fetch all events and wordle words once
const fetchInitialData = async () => {
  try {
    // Fetch both in parallel
    const [eventsResponse, wordleResponse] = await Promise.all([
      axios.get(
        `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/get-event-days`,
        {
          auth: {
            username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
            password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
          }
        }
      ),
      axios.get(
        `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/get-wordle-words`,
        {
          auth: {
            username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
            password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
          }
        }
      )
    ])

    // Cache the data
    eventsCache.value = eventsResponse.data
    wordleWordsCache.value = wordleResponse.data

    // Extract events from get-event-days response
    events.value = eventsCache.value.map(eventData => eventData.event)
    
    // Auto-select the first event if available
    if (events.value.length > 0) {
      selectedEvent.value = events.value[0]
      buildWordleDataForEvent(selectedEvent.value.id)
    }
  } catch (error) {
    console.error('Error fetching initial data:', error)
    showMessage('Error fetching data', 'error')
  } finally {
    loading.value = false
  }
}

const buildWordleDataForEvent = (eventId) => {
  if (!eventsCache.value || !wordleWordsCache.value) return

  // Find the selected event's data from get-event-days cache
  const selectedEventData = eventsCache.value.find(
    eventData => eventData.event.id === eventId
  )

  // Find the selected event's wordle data from get-wordle-words cache
  const selectedWordleData = wordleWordsCache.value.find(
    eventData => eventData.event.id === eventId
  )

  // Extract days from the selected event
  eventDays.value = selectedEventData?.days || []
  
  // Initialize wordle data with event days and merge with wordle words
  wordleData.value = eventDays.value.map(day => {
    // Find the corresponding day in wordle data
    const wordleDay = selectedWordleData?.event_days?.find(wd => wd.id === day.id)
    // Get all words for this day
    const words = wordleDay?.words || []
    
    return {
      ...day,
      date: day.day,
      day_name: day.day_formatted,
      words: words
    }
  })
}

// Handle event selection change
const onEventChange = () => {
  if (selectedEvent.value) {
    selectedRow.value = null // Close side menu
    closeWordsModal() // Close modal
    buildWordleDataForEvent(selectedEvent.value.id)
  }
}

const refreshWordleWords = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/get-wordle-words`,
      {
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }
      }
    )
    
    // Update cache
    wordleWordsCache.value = response.data
    
    // Rebuild current event's data
    if (selectedEvent.value) {
      buildWordleDataForEvent(selectedEvent.value.id)
    }
  } catch (error) {
    console.error('Error refreshing wordle words:', error)
    showMessage('Error refreshing data', 'error')
  }
}

// Show message
const showMessage = (text, type = 'success') => {
  message.value = text
  messageType.value = type
  setTimeout(() => {
    message.value = ''
  }, 3000)
}

// Save word (create or update)
const saveWord = async () => {
  const wordToSave = editingWordId.value ? editWord.value : newWord.value
  
  if (!wordToSave || wordToSave.length !== 5) {
    showMessage('Word must be exactly 5 letters long', 'error')
    return
  }

  if (!/^[A-Za-z]+$/.test(wordToSave)) {
    showMessage('Word must contain only letters', 'error')
    return
  }

  try {
    let response
    if (editingWordId.value) {
      // Update existing word
      const wordData = {
        date: selectedRow.value.date,
        word: wordToSave.toUpperCase(),
        id: editingWordId.value
      }
      
      response = await axios.put(
        `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/update-wordle-word`,
        wordData,
        {
          auth: {
            username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
            password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
          }
        }
      )
    } else {
      // Create new word
      const wordData = {
        word: wordToSave.toUpperCase(),
        event_day_id: selectedRow.value.id
      }
      
      response = await axios.post(
        `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/create-wordle-word`,
        wordData,
        {
          auth: {
            username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
            password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
          }
        }
      )
    }

    if (response.status === 200) {
      showMessage(`Word ${editingWordId.value ? 'updated' : 'created'} successfully`, 'success')
      cancelEdit()
      await refreshWordleWords()

      // Update selectedRow to reflect new data
      if (selectedRow.value) {
        const updatedDay = wordleData.value.find(day => day.id === selectedRow.value.id)
        if (updatedDay) {
          selectedRow.value = { ...updatedDay }
        }
      }
    }
  } catch (error) {
    console.error('Error saving word:', error)
    const errorMessage = error.response?.data?.error || 'Error saving word'
    showMessage(errorMessage, 'error')
  }
}

// Delete word
const deleteWord = async (wordData) => {
  if (!confirm(`Are you sure you want to delete the word "${wordData.word}"?`)) {
    return
  }

  try {
    await axios.delete(
      `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/delete-wordle-word`,
      {
        data: { word_id: wordData.id },
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }
      }
    )

    showMessage('Word deleted successfully', 'success')
    await refreshWordleWords()

    if (selectedRow.value) {
      const updatedDay = wordleData.value.find(day => day.id === selectedRow.value.id)
      if (updatedDay) {
        selectedRow.value = { ...updatedDay }
      }
    }
  } catch (error) {
    console.error('Error deleting word:', error)
    showMessage('Error deleting word', 'error')
  }
}

onMounted(() => {
  fetchInitialData()
})
</script>

<template>
  <div class="wrapper">
    <!-- Main Content -->
    <div class="table">
      <!-- Header with inline event selection -->
      <div class="header-with-selection">
        <div class="header">
          <h1>Wordle Words Management</h1>
          <p>Manage the daily words for the Wordle game</p>
        </div>
        
        <!-- Event Selection -->
        <div class="event-selection-inline">
          <label for="event-select">Event:</label>
          <select 
            id="event-select"
            v-model="selectedEvent" 
            @change="onEventChange"
            class="event-dropdown"
            :disabled="loading"
          >
            <option v-if="events.length === 0" disabled value="">Loading events...</option>
            <option 
              v-for="event in events" 
              :key="event.id" 
              :value="event"
            >
              {{ event.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Message -->
      <div v-if="message" class="message" :class="messageType">
        {{ message }}
      </div>

      <!-- Loading -->
      <div v-if="loading" class="loading">
        <p>{{ events.length === 0 ? 'Loading events...' : 'Loading event days...' }}</p>
      </div>

      <!-- Words Table using TheTable component -->
      <div v-else-if="selectedEvent && wordleData.length > 0" class="table-container">
        <TheTable
          :data="tableData"
          :table-headers="tableHeaders"
          :buttons="tableButtons"
          @onRowSelect="onRowSelect"
        />
      </div>

      <!-- No days message -->
      <div v-else-if="selectedEvent" class="no-days">
        <p>No event days found for {{ selectedEvent.name }}</p>
      </div>

      <!-- No event selected -->
      <div v-else-if="!loading" class="no-event">
        <p>No events available</p>
      </div>
    </div>

    <!-- Side Menu for Selected Day -->
    <div v-if="selectedRow" class="popUpOverlay"></div>
    <div v-if="selectedRow" class="right-popup-placeholder">
      <button class="close-popup" @click="closeCardInfo">&times;</button>
      <div class="header">
        <h1 class="cardUsername">{{ selectedRow.day_formatted.split(',')[0].replace(/(\d{2}) (\d{2}) (\d{4})/, '$1/$2/$3') }}</h1>
        <p class="cardDay">{{ selectedRow.day_formatted.split(',')[1]?.trim() }}</p>
      </div>
      <img src="../../assets/JEEC.png" alt="Event Logo" class="pfp" />
      <h2>{{ selectedEvent.name }}</h2>
      <p :style="{ color: 'gray', fontSize: '18px' }">Wordle Words</p>
      
      <div class="cardActions">
        <button class="edit-button" type="button" @click="openWordsModal">
          <img src="../../assets/pencil.svg" />
        </button>
      </div>

      <div class="cardInfo">
        <div class="cardInfoMember">
          <p class="cardInfoLabel">Words Available</p>
          <!-- List of available words for the selected day -->
          <ul v-if="selectedRow.words && selectedRow.words.length" class="words-list">
            <li v-for="word in selectedRow.words" :key="word.id">
              <p>{{ word.word }}</p>
            </li>
          </ul>
          <p v-else class="no-words">No words set for this day</p>
        </div>
      </div>
    </div>

    <!-- Words Management Modal -->
    <div v-if="showWordsModal" class="modal-overlay" @click="closeWordsModal">
      <div class="modal" @click.stop>
        <button class="close-popup" @click="closeWordsModal">&times;</button>
        <h2>Manage Words for {{ selectedRow?.day_name }}</h2>
        
        <div class="modal-content">
          <!-- Words List -->
          <div v-if="selectedRow?.words && selectedRow.words.length > 0" class="words-section">
            <h3>Existing Words</h3>
            <div class="words-list-modal">
              <div 
                v-for="word in selectedRow.words" 
                :key="word.id"
                class="word-item"
                :class="{ 'editing': editingWordId === word.id }"
              >
                                  <template v-if="editingWordId === word.id">
                    <!-- Edit Mode -->
                    <input 
                      v-model="editWord"
                      type="text"
                      maxlength="5"
                      class="word-edit-input"
                      :class="{ 'invalid': editWord && (editWord.length !== 5 || !/^[A-Za-z]+$/.test(editWord)) }"
                      @input="editWord = editWord.toUpperCase()"
                      @keyup.enter="saveWord"
                      @keyup.escape="cancelEdit"
                    />
                  <div class="word-actions">
                    <button @click="saveWord" class="btn-save-small">Save</button>
                    <button @click="cancelEdit" class="btn-cancel-small">Cancel</button>
                  </div>
                </template>
                <template v-else>
                  <!-- View Mode -->
                  <span class="word-text">{{ word.word }}</span>
                  <div class="word-actions">
                    <button @click="startEdit(word)" class="btn-edit-small">Edit</button>
                    <button @click="deleteWord(word)" class="btn-delete-small">Delete</button>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <!-- Add New Word Section -->
          <div class="add-word-section">
            <h3>Add New Word</h3>
            <div class="add-word-form">
              <input 
                v-model="newWord"
                type="text"
                maxlength="5"
                placeholder="Enter 5-letter word"
                class="word-add-input"
                :class="{ 'invalid': newWord && (newWord.length !== 5 || !/^[A-Za-z]+$/.test(newWord)) }"
                @input="newWord = newWord.toUpperCase()"
                @keyup.enter="saveWord"
                @keyup.escape="cancelEdit"
              />
              <div class="add-word-actions">
                <button 
                  @click="saveWord" 
                  class="btn-add-save"
                  :disabled="!newWord || newWord.length !== 5 || !/^[A-Za-z]+$/.test(newWord)"
                >
                  Add Word
                </button>
                <button @click="cancelEdit" class="btn-add-cancel">Clear</button>
              </div>
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
  min-height: calc(100dvh - var(--header-height));
  padding: 5ch 3ch 3ch 3ch;
  overflow-y: auto;
}

.table {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1ch;
  padding-right: 3ch;
}

.table-container {
  width: 100%;
}

.header {
  margin-bottom: 2rem;
}

.header-with-selection {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
}

.event-selection-inline {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  flex-shrink: 0;
}

.event-selection-inline label {
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
}

.header h1 {
  color: #333;
}

.header p {
  color: #666;
  font-size: 1.1rem;
}

.event-selection {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.event-selection label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.event-dropdown {
  width: 200px;
  padding: 0.5rem;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s;
}

.event-dropdown:focus {
  outline: none;
  border-color: #007bff;
}

.event-dropdown:disabled {
  background: #f8f9fa;
  cursor: not-allowed;
}

.no-days, .no-event {
  text-align: center;
  padding: 3rem;
  color: #666;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.message {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-weight: 500;
}

.message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
}

/* Right Popup Placeholder (Side Menu) */
.right-popup-placeholder {
  position: sticky;
  top: 0;
  right: 0;
  width: 23rem;
  height: 100%;
  border-radius: 20px;
  background-color: #eef4fb;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.1);
}

.right-popup-placeholder .header {
  text-align: center;
  margin-bottom: 10px;
}

.right-popup-placeholder .pfp {
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  margin-bottom: 15px;
}

.right-popup-placeholder .cardUsername {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.right-popup-placeholder .cardDay {
  font-size: 1.1rem;
  font-weight: 400;
  color: #666;
  margin: 0;
}

.right-popup-placeholder .cardActions {
  display: flex;
  gap: 10px;
  margin-top: 0.5rem;
}

.right-popup-placeholder .edit-button {
  background-color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  font-size: 1.2rem;
}

.right-popup-placeholder .edit-button:hover {
  background-color: #f0f0f0;
}

.right-popup-placeholder .cardInfo {
  width: 100%;
  text-align: left;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.right-popup-placeholder .cardInfoLabel {
  font-size: 1.1rem;
  font-weight: 500;
  color: #555;
}

.words-list {
  list-style-type: none;
  padding: 0;
}

.words-list li {
  color: gray;
  font-size: 16px;
  font-family: monospace;
  font-weight: bold;
  letter-spacing: 1px;
}

.no-words {
  color: #999;
  font-style: italic;
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
  z-index: 10000;
}

.modal {
  background: white;
  padding: 2rem;
  min-height: 70%;
  width: 100%;
  max-width: 700px;
  max-height: 90vh; /* Added max height */
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;
  border-radius: 12px;
  overflow-y: auto; /* Added scrolling to modal */
}

.modal h2 {
  padding-left: 8px;
  margin-top: 0;
  margin-bottom: 2%;
  font-size: 1.5rem;
  font-weight: 600;
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1;
}

.words-section h3,
.add-word-section h3 {
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.2rem;
}

.words-list-modal {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 300px;
  overflow-y: auto;
}

.word-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 6px;
  transition: all 0.2s;
}

.word-item.editing {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
}

.word-text {
  font-family: monospace;
  font-size: 1.1rem;
  font-weight: bold;
  color: #2c3e50;
  letter-spacing: 1px;
}

.word-actions {
  display: flex;
  gap: 0.5rem;
}

.word-edit-input, .word-add-input {
  padding: 0.5rem;
  border: 2px solid #dee2e6;
  border-radius: 4px;
  font-family: monospace;
  font-size: 1rem;
  letter-spacing: 1px;
  text-align: center;
  text-transform: uppercase;
  width: 100px;
}

.word-edit-input:focus, .word-add-input:focus {
  outline: none;
  border-color: #007bff;
}

.word-edit-input.invalid, .word-add-input.invalid {
  border-color: #dc3545;
}

.btn-edit-small, .btn-delete-small, .btn-save-small, .btn-cancel-small {
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-edit-small {
  background: #007bff;
  color: white;
}

.btn-edit-small:hover {
  background: #0056b3;
}

.btn-delete-small {
  background: #dc3545;
  color: white;
}

.btn-delete-small:hover {
  background: #c82333;
}

.btn-save-small {
  background: #28a745;
  color: white;
}

.btn-save-small:hover:not(:disabled) {
  background: #1e7e34;
}

.btn-cancel-small {
  background: #6c757d;
  color: white;
}

.btn-cancel-small:hover {
  background: #545b62;
}

.add-word-form {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.add-word-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-add-save, .btn-add-cancel {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-add-save {
  background: #28a745;
  color: white;
}

.btn-add-save:hover:not(:disabled) {
  background: #1e7e34;
}

.btn-add-save:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.btn-add-cancel {
  background: #6c757d;
  color: white;
}

.btn-add-cancel:hover {
  background: #545b62;
}

/* Responsive */
@media (max-width: 768px) {
  .wrapper {
    display: flex;
    position: relative;
    height: calc(100dvh - var(--header-height));
    padding: 5ch 3ch 3ch 3ch;
  }
  
  .header-with-selection {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .event-selection-inline {
    align-items: flex-start;
  }
  
  .event-dropdown {
    width: 100%;
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
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: calc(97dvh - var(--header-height));
    background-color: #eef4fb;
    padding: 1rem;
    box-shadow: 0px 4px 10px rgba(0.1, 0.1, 0.1, 0.1);
    z-index: 1000;
  }

  .right-popup-placeholder {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: calc(97dvh - var(--header-height));
    background-color: #eef4fb;
    padding: 1rem;
    box-shadow: 0px 4px 10px rgba(0.1, 0.1, 0.1, 0.1);
    z-index: 1000;
    border-radius: 20px;
  }

  .pfp {
    width: 7rem;
    height: 7rem;
  }

  .cardUsername {
    font-size: 1.2rem;
  }

  .modal {
    width: 90%;
    max-width: none;
    padding: 1.5rem;
  }

  .word-item {
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
  }

  .word-actions {
    justify-content: center;
  }

  .add-word-form {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>