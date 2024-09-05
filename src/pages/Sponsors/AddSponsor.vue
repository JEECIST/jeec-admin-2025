<template>
  <div class="backdrop">
    <div class="tier-pop-up">
      <div class="header">
        <h1>Add Sponsor</h1>
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
            <input type="text"/>
          </div>
          <div class="event-filter">
            <label for="event">Event</label>
            <select class="selection-box" v-model="eventselected">
              <option value="all">All</option>
              <option value="JEEC 23/24">JEEC 23/24</option>
              <option value="JEEC 24/25">JEEC 24/25</option>
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
            <label for="logo">Logo</label>
              <div class="blue-square">
                <p>
                  No logo selected yet
                </p>
              </div>
              <button class="button-add-logo" >Add New Logo</button>
          </div>
          <div class="second-column">
            <div class="form-line">
              <div class="inputjeec">
                <label for="jeecresponsible">JEEC Responsible</label>
                <select class="selection-box-jeec">
                  <option value="all">All</option>
                  <option value="Maria">Maria</option>
                  <option value="Francisca">Francisca</option>
                </select>
              </div>
            </div>
          
            <div class="form-line">
              <div class="radio-label">
                <label for="show">Show in Website</label>
                <div class="radio">
                  <input type="radio" id="yes" name="show" value="Yes"/>
                  <label for="yes">Yes</label>

                  <input type="radio" id="no" name="show" value="No"/>
                  <label for="no">No</label>
                </div>
              </div>
            

              <div class="inputtier">
                <label for="Tier">Tier</label>
                <select class="selection-box-tier">
                  <option value="Gold">Gold</option>
                  <option value="Bronze">Bronze</option>
                  <option value="Sliver">Silver</option>
                </select>
              </div>
            </div>

            <div class="form-line">
              <div class="button">
                <button class="button-add-sponsor">Add</button>
              </div>
            </div>
          </div>
          
        </div>
        
      </form>
    </div>
  </div>
  
</template>

<script setup>
const emit = defineEmits(['close'])

function closePopup() {
emit('close');
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
}

.tier-pop-up{
  display: flex;
  flex-direction: column;
  width: 70vw;
  padding: 4vw;
  max-height: 95%;
  margin: 3vh auto;
  border-radius: 3vw;
  background-color: #ffff;
  font-size: 0.8vw;
  color: var(--text-color);
  font-family: var(--font-family);
  z-index: 3;
  gap:3vh;
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
  margin-right: 1vw;
}

.tier-pop-up h1{
  font-size: 2vw;
  padding: auto;
}


.form{
  display: flex;
  flex-direction: column;
  margin-right:5vw;
  gap: 3vw;
}

.form-line{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1vw;
  width: 100%;
}


.radio{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 1vw;
  gap: 1vw;
  width: 20vw;
}

.radio-label{
  display: flex;
  flex-direction: column;
  gap:1vw;
}

input[type="radio"] {
    /* Adjust size directly using viewport width without calc */
    transform: scale(1 + 0.02 * (1vw)); /* Adjust size based on viewport width */
    margin: 1vw; /* Margin based on viewport width */
  }

.form-columns{
  display: flex;
  flex-direction: row;
  gap: 3vw;
}

.second-column{
  display:flex;
  flex-direction: column;
  gap: 4vh;
}

.inputname{
  display: flex;
  flex-direction: column;
  width: 45vw;
  gap:1vh;
}

.inputname input{
  height: 3vw;
  padding: 0.5vh 1vw 0.5vh 1vw;
  border: 1px solid #8A8A8A;
  border-radius: 1vh;
  outline-color: var(--c-ft-semi-light);
  color: var(--c-ft-semi-light);
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 1vw;
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
  width: 11vw;
  height: 3vw; 
  border: 1px solid var(--c-ft-semi-light);
  border-radius: 0.7vh;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  padding: 0.5vh 0.5vw;
  font-size: 0.8vw;
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
  padding: 0.5vh 1vw 0.5vh 1vw;
  border: 1px solid #8A8A8A;
  border-radius: 1vh;
  outline-color: var(--c-ft-semi-light);
  color: var(--c-ft-semi-light);
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 1vw;
  font-weight: 500;
  line-height: 2.67vh;
  flex-grow: 3;
}

.logo{
  display: flex;
  flex-direction: column;
  gap:1vh;
  align-content: center;
}

.blue-square{
  display: flex;
  width: 10vw;
  height: 10vw;
  background-color: var(--c-accent);
  border-radius: 1vh;
  justify-content: center;
}
.blue-square p{
  align-self: center;
  font-weight: 500;
  color:var(--c-ft-semi-light);
}

.button-add-logo {
  max-width: 8vw;
  height: 2.5vw; 
  border: none;
  border-radius: 0.7vh;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 0.8vw;
  font-weight: 500;
  color: #FFFFFF;
  background-color: var(--c-select);
  padding: 0.2vw 1vw;
  cursor: pointer;
}

.selection-box-jeec {
  width: 44.5vw;
  height: 3vw; 
  border: 1px solid var(--c-ft-semi-light);
  border-radius: 0.7vh;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  padding: 0.5vh 0.5vw;
  font-size: 0.8vw;
  color: var(--c-ft-semi-light);
  background-color: #FFFFFF;
  flex-grow: 1;
}

.inputjeec{
  display: flex;
  flex-direction: column;
  gap:1vh;
}

.inputtier{
  display: flex;
  flex-direction: column;
  gap:1vh;
}

.selection-box-tier {
  width: 25vw;
  height: 3vw; 
  border: 1px solid var(--c-ft-semi-light);
  border-radius: 0.7vh;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  padding: 0.5vh 0.5vw;
  font-size: 0.8vw;
  color: var(--c-ft-semi-light);
  background-color: #FFFFFF;
}

.button-add-sponsor {

  width: 9vw;
  height: 3vw; 
  border: none;
  border-radius: 0.7vh;
  outline-color: #152259;
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 1vw;
  font-weight: 500;
  color: #FFFFFF;
  background-color: #152259;
  padding: 0.2vw 1vw;
  cursor: pointer;
}

.button{
  margin-left:38vw;
}
  


</style>