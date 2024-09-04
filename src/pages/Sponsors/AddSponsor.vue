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
        <div class="logo">
          <label for="logo">Logo</label>
          
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

<style>
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
  margin: 10vw auto;
  border-radius: 3vw;
  background-color: #ffff;
  font-size: 0.8vw;
  color: var(--text-color);
  font-family: var(--font-family);
  z-index: 3;
  gap:4vh;
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
  gap: 4vh;
}

.form-line{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 3vw;
  width: 100%;
}

.inputname{
  display: flex;
  flex-direction: column;
  width: 40vw;
  gap:1vh;
}

.inputname input{
  height: 3vw;
  padding: 0.5vh 1vw 0.5vh 1vw;
  border: 1px solid #8A8A8A;
  border-radius: 1vh;
  outline-color: var(--c-select);
  color: #8A8A8A;
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
  width: 10vw;
  height: 3vw; 
  border: 1px solid #8A8A8A;
  border-radius: 0.7vh;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  padding: 0.5vh 0.5vw;
  font-size: 0.8vw;
  color: #8A8A8A;
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
  padding: 0.5vh 1vw 0.5vh 1vw;
  border: 1px solid #8A8A8A;
  border-radius: 1vh;
  outline-color: var(--c-select);
  color: #8A8A8A;
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 1vw;
  font-weight: 500;
  line-height: 2.67vh;
  flex-grow: 3;
}


</style>