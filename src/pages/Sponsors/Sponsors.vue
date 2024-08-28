<template>
  <div class="sponsors-container">
    <div class="header">
      <div class="search-container">
        <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M10.5 17a6.5 6.5 0 100-13 6.5 6.5 0 000 13z" />
        </svg>
        <input 
          type="text" 
          placeholder="Search for a sponsor" 
          class="search-bar" 
          v-model="searchQuery"
        />
      </div>
    <div class="event-filter">
      <p>Event</p>
      <select class="selection-box" v-model="selected">
        <option value="all">All</option>
        <option value="event1">Event 1</option>
        <option value="event2">Event 2</option>
        <option value="event3">Event 3</option>
      </select>
    </div>
    <button class="button-add-sponsor">Add Sponsor</button>
    <button class="button-sponsor-tiers">Sponsor Tiers
      <svg xmlns="http://www.w3.org/2000/svg" class="chevron-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
    </div>
    
      
  </div>
</template>

<script setup>
</script>

<style scoped>

.header {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  align-items: end;
  padding: 2vh 2vw; 
  gap: 1vw;
  color: #8A8A8A;
}

.search-container {
  display: flex;
  align-content: center;
  position: relative;
  width: 40vw;
  height: 3vw; 
  background-color: #EBF6FF; 
  border-radius: 1vh; 
  flex-shrink: 3;
  flex-grow: 1;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 1vw;
  transform: translateY(-50%);
  width: 1.33vw;
  height: 3.5vh;
  color: #8A8A8A;
}


.search-bar {
    width: 100%;
    height: 100%;
    padding: 0.5vh 1vw 0.5vh 4vw;
    border: none;
    border-radius: 1vh;
    outline-color: var(--c-select);
    color: #8A8A8A;
    font-family: 'Kumbh Sans', sans-serif;
    font-size: 1.3vw;
    font-weight: 500;
    line-height: 2.67vh;
    background-color: #EBF6FF;
    flex-grow: 1;
}


.event-filter {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 1vw;
  gap: 0.5vh;
}

.selection-box {
  width: 8vw;
  height: 3vw; 
  border: 1px solid #8A8A8A;
  border-radius: 0.7vh;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  padding: 1vh 1vw;
  font-size: 1vw;
  color: #8A8A8A;
  background-color: #FFFFFF;
  flex-grow: 1;
}

.button-add-sponsor {
  width: 7vw;
  height: 3vw; 
  border: none;
  border-radius: 0.7vh;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 1vw;
  color: #FFFFFF;
  background-color: var(--c-select);
  padding: 0.2vw 1vw;
  flex-grow: 1;
}

.button-sponsor-tiers {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 12vw;
  height: 3vw; 
  border: none;
  border-radius: 0.7vh;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 1vw;
  color: #FFFFFF;
  background-color: var(--c-select);
  padding: 0.2vw 1vw;
}

.chevron-icon {
  height: 1.5vw;
  width: 3vw;
}

</style>