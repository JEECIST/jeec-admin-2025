<template>
  <div class="sponsors-container">
    <div class="header">
      <div class="search-container">
        <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M10.5 17a6.5 6.5 0 100-13 6.5 6.5 0 000 13z" />
        </svg>
        <input 
          type="text" 
          placeholder="Search for sponsor" 
          class="search-bar" 
          v-model="searchQuery"
        />
      </div>
    </div>
    
  </div>
</template>

<script setup>
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px; 
}

.search-container {
  display: flex;
  align-content: center;
  position: relative;
  width: 40vw;
  height: 5vh; 
  background-color: #EBF6FF; 
  border-radius: 4px;
  padding: 16px, 20px, 16px, 16px; 
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #8A8A8A;
}

.search-bar {
  width: 100%;
  height: 100%;
  padding: 16px 20px 16px 40px; /* Adjust padding to include space for the icon */
  border: none;
  border-radius: 6px;
  outline-color: var( --c-select);
  color: #8A8A8A;
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 14px; 
  font-weight: 500;
  line-height: 17.36px; 
  background-color: #EBF6FF;
}

</style>