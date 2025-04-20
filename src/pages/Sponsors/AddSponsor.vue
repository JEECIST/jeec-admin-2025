<template>
  <div class="backdrop">
    <div class="tier-pop-up">
      <div class="header">
        <h1>Add Sponsor</h1>
        <button @click="closePopup" class="close-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"  fill="none" stroke="#4f4f4f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      </div>
      <form class="form">
        <div class="form-line">
          <div class="inputname">
            <label for="name">Name</label>
            <input type="text" v-model="name"/>
          </div>
          <div class="event-filter">
            <label for="event">Event</label>
            <select @change="responsibleFinder" class="selection-box" v-model="eventselected">
                <option v-for="event in events" :key="event.id" :value="{ id: event.id, name: event.name }">{{ event.name }}</option>
            </select>  
          </div>
        </div>
        <div class="form-line">
          <div class="inputdescription">
          <label for="description">Description</label>
          <textarea class="description" v-model="description"></textarea>
          </div>
        </div>
        <div class="form-columns">
          <div class="logo">
            
            <div class="blue-square" v-if="logo_image">
              <!-- Display the selected image -->
              <img :src="logo_image" alt="Logo" class="logo-image" />
            </div>
            <div class="blue-square" v-else>
              <!-- Display this text when no logo is selected -->
              <p>No logo selected yet</p>
            </div>
            <!-- Hidden file input -->
            <label for="logo-upload" class="custom-logo-label">Add new Logo</label>
            <input id="logo-upload" name ="fileSelected" type="file" @change="onLogoSelected" class="button-add-logo" accept="image/*" />
          </div>
          <div class="second-column">
            <div class="form-line">
              <div v-if="jeec_responsible_flag" class="inputjeec">
                <label for="jeecresponsible">JEEC Responsible</label>
                <select class="selection-box-jeec" v-model="jeec_responsible">  
                  <option v-for="responsible in colaborators_for_event" :key="responsible.id" :value="{ id: responsible.id, name: responsible.name }">{{ responsible.name }}</option>
                </select>
              </div>
            </div>
          
            <div class="form-line">
              <div class="radio-label">
                <label for="show_in_website">Show in Website</label>
                <div class="radio">
                  <input type="radio" id="yes" v-model="show_in_website" :value="true"/>
                  <label for="yes">Yes</label>

                  <input type="radio" id="no" v-model="show_in_website" :value="false"/>
                  <label for="no">No</label>
                </div>
              </div>
            

              <div class="inputtier">
                <label for="Tier">Tier</label>
                <select class="selection-box-tier" v-model="tier">
                  <option v-for="tier_ in tiers" :key="tier_.id" :value="tier_.id">{{ tier_.name }}</option>
                </select>
              </div>
            </div>
          </div>
            
        </div>
      </form>
      <button class="button-add-sponsor" @click="addingSponsor">Add</button>
    </div>
  </div>
  
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
const emit = defineEmits(['close'])


function closePopup() {
  emit('close');
}

const props = defineProps({
  events: Array,
  tiers: Array,
})



const name = ref('')
const description = ref('')
const eventselected = ref(null)
const tier = ref(null)
const jeec_responsible = ref({ id: null, name: '' })
var error_response = ref('error')
var fileSelected = ref(null)
var fileToUpload = ref(null)
const show_in_website = ref('false')
const logo_image = ref('')

const colaborators_for_event = ref([])
const jeec_responsible_flag = ref(false)



function onLogoSelected(event){
  fileSelected.value = event.target.files[0].name;
  fileToUpload.value = event.target.files[0];
  logo_image.value = URL.createObjectURL(event.target.files[0]);
  console.log(fileSelected.value)
}

function addingSponsor(e) {
      console.log('adding sponsor')
        e.preventDefault()


        const fd = new FormData();
        if (fileToUpload.value) fd.append('logo_image', fileToUpload.value)
        fd.append('name', name.value)
        fd.append('description', description.value)
        fd.append('event_id', eventselected.value.id)
        fd.append('event_name', eventselected.value.name)
        console.log("Event id",eventselected.value)
        fd.append('show_in_website', show_in_website.value)
        console.log("Show in website",show_in_website.value)
        fd.append('tier_id', tier.value)
        console.log("Tier id",tier.value)
        fd.append('jeec_responsible_id', jeec_responsible.value.id)
        fd.append('jeec_responsible_name', jeec_responsible.value.name)
        console.log("JEEC responsible",jeec_responsible.value.id)

        axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/add-sponsor-vue',fd,{auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {
          console.log(response)
          error_response = response.data.error
          if(error_response==''){
            closePopup()
          }
          else{
            console.log('error on adding sponsor: ', error_response)
          }
        })
        
      }

function responsibleFinder(){
  let event_id = eventselected.value.id;
  console.log(event_id)
  axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/colaborators', {event_id: event_id} ,{auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {
          console.log("Response", response)
          let colaborators = response.data.colaborators
          if(colaborators.length > 0){
            colaborators_for_event.value = colaborators;
            jeec_responsible_flag.value = true;
          }
        })
}

</script>

<style scoped>
.backdrop{
  top:0;
  position: fixed;
  background: rgba(0,0,0,0.5);
  width: 100%;
  height: 100%;
  z-index: 3;
  align-content: center;
}


.tier-pop-up{
  display: flex;
  flex-direction: column;
  width: 80vw;
  max-width: 900px;
  overflow-y: auto;
  padding: 50px 50px 50px 50px;
  height: fit-content;
  max-height: 90vh;
  margin: 3vh auto;
  background-color: #ffff;
  font-size: 0.9em;
  color: var(--text-color);
  font-family: var(--font-family);
  z-index: 10;
  gap: 20px;
}

.header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
}


.close-button{
  z-index: 3;
  background: none;
  border: none;
  cursor: pointer;
  align-self: flex-end;
}

.tier-pop-up h1{
  font-size: 2em;
}


.form{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  height: 100%;
  width: 100%;
  padding-right: 26px;
}

.form-line{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  width: 100%;
}


.radio{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.7em;
  gap: 10px;
  width: 20vw;
}

.radio-label{
  display: flex;
  flex-direction: column;
  gap:1vh;
}

input[type="radio"] {
  /* Adjust size directly using viewport width without calc */
  transform: scale(1 + 0.02 * (2vh)); /* Adjust size based on viewport width */
  margin: 1vw; /* Margin based on viewport width */
}

.form-columns{
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  width:100%;
  gap: 30px;
}

.second-column{
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
  flex-grow: 1;
}

.inputname{
  display: flex;
  flex-direction: column;
  flex-grow: 3;
  width: 20vw;
  gap:1vh; 
}

.inputname input{
  padding: 0.5vh 1vw 0.5vh 1vw;
  border: 1px solid #8A8A8A;
  border-radius: 1vh;
  outline-color: var(--c-ft-semi-light);
  color: var(--c-ft-semi-light);
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 0.9em;
  font-weight: 500;
  height: 35px;
  line-height: 2.67vh;
  flex-grow: 3;
}

.event-filter{
  display: flex;
  flex-direction: column;
  width:fit-content;
  gap:1vh;
}

.selection-box {
  min-height: 35px;
  width: 20vw;
  min-width: 100px;
  border: 1px solid var(--c-ft-semi-light);
  border-radius: 0.7vh;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  padding: 0.5vh 0.5vw;
  font-size: 0.9em;
  color: var(--c-ft-semi-light);
  background-color: #FFFFFF;
  flex-grow: 1;
}

.inputdescription{
  display: flex;
  flex-direction: column;
  width: 100%;
  gap:1vh;
}

.description{
  height: 11vh;
  padding: 1vh 1vw 1vh 1vw;
  border: 1px solid #8A8A8A;
  border-radius: 1vh;
  outline-color: var(--c-ft-semi-light);
  color: var(--c-ft-semi-light);
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 0.8em;
  font-weight: 500;
  line-height: 2.6vh;
  flex-grow: 3;
}


.logo{
  display: flex;
  flex-direction: column;
  align-content: center;
  object-fit: scale-down;
}
/* Hide the file input */
#logo-upload {
  display: none;
}

/* Style the custom label as a button */
.custom-logo-label {
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  margin-top: 10px;
  align-self: center;
}


.blue-square{
  display: flex;
  flex-grow: 3;
  min-width: 100px;
  min-height: 100px;
  max-height: 150px;
  max-width: 150px;
  height: 27vh;
  width: 27vh;
  background-color: var(--c-accent);
  border-radius: 1vh;
  justify-content: center;
}
.blue-square p{
  justify-self: center;
  align-self: center;
  font-weight: 400;
  font-size: 0.8em;
  color:var(--c-ft-semi-light);
}

/* Style the image to fit within the blue square */
.logo-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: scale-down;
}

.button-add-logo {
  align-self: center;
  min-width: 100px;
  max-width: 150px;
  min-height: 30px;
  width: 27vh; 
  border: none;
  border-radius: 0.7vh;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 0.6em;
  font-weight: 500;
  color: #FFFFFF;
  background-color: var(--c-select);
  padding: 0.2vw 1vw;
  cursor: pointer;
}

.selection-box-jeec {
  min-height: 35px;
  width: 100%; 
  border: 1px solid var(--c-ft-semi-light);
  border-radius: 0.7vh;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  padding: 0.5vh 0.5vw;
  font-size: 0.8em;
  color: var(--c-ft-semi-light);
  background-color: #FFFFFF;
}

.inputjeec{
  display: flex;
  flex-direction: column;
  width: 100%;
  gap:1vh;
}

.inputtier{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap:1vh;
}

.selection-box-tier {
  min-height: 35px;
  width: 100%;
  border: 1px solid var(--c-ft-semi-light);
  border-radius: 0.7vh;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  padding: 0.5vh 0.5vw;
  font-size: 0.8em;
  color: var(--c-ft-semi-light);
  background-color: #FFFFFF;
}

.button-add-sponsor {
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 0.7vh;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 1.1em;
  font-weight: 500;
  color: #FFFFFF;
  background-color: #152259;
  padding: 8px 5px 8px 5px;
  cursor: pointer;
  align-self: flex-end;
}

@media (max-width: 700px) {

  .form{
    padding-right: 0;
  }  

  .close-button{
    margin-right: -8px;
  }
}

  


</style>