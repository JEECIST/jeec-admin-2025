<template>
  <div class="backdrop">
    <div class="tier-pop-up">
      <div class="header">
        <h1>Update Sponsor Tier</h1>
        <button @click="closePopup" class="close-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4f4f4f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      </div>
      <form class="form">
        <div class="form-line">
          <div class="inputname">
            <label for="name">Name</label>
            <input type="text" v-model="sponsorData.name"/>
          </div>
          <div class="inputname">
            <label for="Priority">Priority</label>
            <input type="text" v-model="sponsorData.priority"/>
          </div>
        </div>
        <div class="form-columns">
          
          <div class="second-column">
              <div class="radio-label">
                <label for="includedMeal">Included Meal</label>
                <div class="radio">
                  <input type="radio" id="includedMealYes" v-model="sponsorData.includedMeal" :value="true"/>
                  <label for="includedMealYes">Yes</label>

                  <input type="radio" id="includedMealNo" v-model="sponsorData.includedMeal" :value="false"/>
                  <label for="includedMealNo">No</label>
                </div>
              </div>
              <div class="radio-label">
                <label for="logoInCanvas">Logo in Canvas</label>
                <div class="radio">
                  <input type="radio" id="logoInCanvasYes" v-model="sponsorData.logoInCanvas" :value="true"/>
                  <label for="logoInCanvasYes">Yes</label>

                  <input type="radio" id="logoInCanvasNo" v-model="sponsorData.logoInCanvas" :value="false"/>
                  <label for="logoInCanvasNo">No</label>
                </div>
              </div>
              <div class="radio-label">
                <label for="teaser">Teaser</label>
                <div class="radio">
                  <input type="radio" id="teaserYes" v-model="sponsorData.teaser" :value="true"/>
                  <label for="teaserYes">Yes</label>

                  <input type="radio" id="teaserNo" v-model="sponsorData.teaser" :value="false"/>
                  <label for="teaserNo">No</label>
                </div>
              </div>
          </div>
          <div class="second-column">
              <div class="radio-label">
                <label for="showInWebsite">Show in Website</label>
                <div class="radio">
                  <input type="radio" id="showInWebsiteYes" v-model="sponsorData.showInWebsite" :value="true"/>
                  <label for="showInWebsiteYes">Yes</label>

                  <input type="radio" id="showInWebsiteNo" v-model="sponsorData.showInWebsite" :value="false"/>
                  <label for="showInWebsiteNo">No</label>
                </div>
              </div>
              <div class="radio-label">
                <label for="logoInPosters">Logo in posters</label>
                <div class="radio">
                  <input type="radio" id="logoInPostersYes" v-model="sponsorData.logoInPosters" :value="true"/>
                  <label for="logoInPostersYes">Yes</label>

                  <input type="radio" id="logoInPostersNo" v-model="sponsorData.logoInPosters" :value="false"/>
                  <label for="logoInPostersNo">No</label>
                </div>
              </div>
              <div class="radio-label">
                <label for="exclusivePosts">Exclusive Posts</label>
                <div class="radio">
                  <input type="radio" id="exclusivePostsYes" v-model="sponsorData.exclusivePosts" :value="true"/>
                  <label for="exclusivePostsYes">Yes</label>

                  <input type="radio" id="exclusivePostsNo" v-model="sponsorData.exclusivePosts" :value="false"/>
                  <label for="exclusivePostsNo">No</label>
                </div>
              </div>
          </div>
          <div class="second-column">
              <div class="radio-label">
                <label for="socialMedia">Social Media</label>
                <div class="radio">
                  <input type="radio" id="socialMediaYes" v-model="sponsorData.socialMedia" :value="true"/>
                  <label for="socialMediaYes">Yes</label>

                  <input type="radio" id="socialMediaNo" v-model="sponsorData.socialMedia" :value="false"/>
                  <label for="socialMediaNo">No</label>
                </div>
              </div>
              <div class="radio-label">
                <label for="exclusiveVideo">Exclusive Video</label>
                <div class="radio">
                  <input type="radio" id="exclusiveVideoYes" v-model="sponsorData.exclusiveVideo" :value="true"/>
                  <label for="exclusiveVideoYes">Yes</label>

                  <input type="radio" id="exclusiveVideoNo" v-model="sponsorData.exclusiveVideo" :value="false"/>
                  <label for="exclusiveVideoNo">No</label>
                </div>
              </div>
          </div>
            
        </div>
      </form>
      <button class="button-add-sponsor" @click="updateSponsorTier">Update</button>
      
    </div>
  </div>
  
</template>


<script setup>
const emit = defineEmits(['close'])
import { defineProps } from 'vue';
import axios from 'axios';

function closePopup() {
  emit('close');
}

const props = defineProps({
  sponsorData: Object
})


function updateSponsorTier() {
  // Update sponsor tier logic here
  console.log('Update sponsor tier');
  const fd = new FormData();
  fd.append('tier_id', props.sponsorData.id);
  fd.append('name', props.sponsorData.name);
  fd.append('priority', props.sponsorData.priority);
  fd.append('included_meal', props.sponsorData.includedMeal);
  fd.append('logo_in_canvas', props.sponsorData.logoInCanvas);
  fd.append('teaser', props.sponsorData.teaser);
  fd.append('show_in_website', props.sponsorData.showInWebsite);
  fd.append('logo_in_posters', props.sponsorData.logoInPosters);
  fd.append('exclusive_posts', props.sponsorData.exclusivePosts);
  fd.append('social_media', props.sponsorData.socialMedia);
  fd.append('exclusive_video', props.sponsorData.exclusiveVideo);

  axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/update-sponsor-tier-vue', fd, {
    auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }
  }).then(response => {
    console.log(response);
    const error_response = response.data.error;
    if (error_response == '') {
      closePopup();
    } else {
      console.log('error on updating sponsor tier: ', error_response);
    }
  });
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
  width: 90vw;
  max-width: 900px;
  overflow-y: auto;
  padding: 50px 50px 50px 50px;
  height: fit-content;
  max-height: 95vh;
  margin: 3vh auto;
  background-color: #ffff;
  font-size: 0.9em;
  color: var(--text-color);
  font-family: var(--font-family);
  z-index: 3;
  gap: 20px;
}

.header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}


.close-button{
  z-index: 3;
  background: none;
  border: none;
  cursor: pointer;
  align-self: flex-end;
  margin-right: -8px;
}

.tier-pop-up h1{
  font-size: 2em;
}


.form{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 30px;
  height: 100%;
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
  width: fit-content;
  padding-left: 10px;
}

.radio-label{
  display: flex;
  flex-direction: column;
  gap:10px;
}

input[type="radio"] {
    /* Adjust size directly using viewport width without calc */
    transform: scale(1 + 0.02 * (2vh)); /* Adjust size based on viewport width */
    margin: 5px; /* Margin based on viewport width */
}

.form-columns{
  min-height: 200px;
  display: flex;
  justify-content: space-around;
  align-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  width:100%;
  gap: 20px;
}

.second-column{
  display:flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex-grow: 1;
  gap: 20px;
}

.inputname{
  min-height: 60px;
  display: flex;
  flex-direction: column;
  flex-grow: 3;
  max-width: 500px;
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
  width: 77vw;
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

  .tier-pop-up{
    padding: 50px 30px 50px 30px;
  }
  .second-column{
    align-content: center;
    width: fit-content;
    font-size: 1em;
  }
}



</style>