<template>
  <div class="backdrop">
    <div class="tier-pop-up">
      <div class="header">
        <h1>{{type}} Sponsors</h1>
        <button @click="closePopup" class="close-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4f4f4f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="sponsors-grid">
        <div v-for="(sponsor, index) in data" :key="index" class="sponsor-item">
          <img class="sponsor-logo" :src="sponsor.logo" alt="sponsor logo">
          <span>{{ sponsor.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const emit = defineEmits(['close']);

function closePopup() {
  emit('close');
}

const data = ref([
  { name: 'Galp', logo: "../src/assets/Galp.png" },
  { name: 'EDP', logo: "../src/assets/Galp.png" },
  { name: 'JEEC', logo: "../src/assets/JEEC.png" },
  { name: 'Galp', logo: "../src/assets/Galp.png" },
  { name: 'EDP', logo: "../src/assets/Galp.png" },
  { name: 'JEEC', logo: "../src/assets/JEEC.png" },
  { name: 'Galp', logo: "../src/assets/Galp.png" },
  { name: 'EDP', logo: "../src/assets/Galp.png" },
  { name: 'JEEC', logo: "../src/assets/JEEC.png" },
  { name: 'Galp', logo: "../src/assets/Galp.png" },
  { name: 'EDP', logo: "../src/assets/Galp.png" },
  { name: 'JEEC', logo: "../src/assets/JEEC.png" },
  { name: 'JEEC', logo: "../src/assets/JEEC.png" }
]);

const props = defineProps({
  foo: String,
  type: {
    type: String,
    required: true
  },
});
</script>

<style scoped>
.backdrop {
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 3;
  align-content: center;
}

.tier-pop-up {
  display: flex;
  flex-direction: column;
  max-width: 73%;
  overflow-y: auto;
  padding: 4vw;
  min-height: 500px;
  max-height: 60vh;
  margin: 3vh auto;
  border-radius: 3vw;
  background-color: #ffff;
  font-size: 0.9em;
  color: var(--text-color);
  font-family: var(--font-family);
  z-index: 3;
  gap: 3vh;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.close-button {
  z-index: 3;
  background: none;
  border: none;
  cursor: pointer;
  align-self: flex-end;
}

.tier-pop-up h1 {
  font-size: 2em;
}

/* Use CSS Grid for two columns */
.sponsors-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 columns */
}

/* Alternate row background across two columns */
.sponsor-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
  box-sizing: border-box;
  height: 50px;
}

/* Alternating background color for two-column rows */
.sponsor-item:nth-child(4n+1),
.sponsor-item:nth-child(4n+2) {
  background-color: var(--c-bg-light);
}

.sponsor-item:nth-child(4n+3),
.sponsor-item:nth-child(4n+4) {
  background-color: var(--c-accent);
}

.sponsor-logo {
  width: 2vw;
  height: 2vw;
  min-width: 20px;
  min-height: 20px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
