<template>
  <div class="backdrop">
    <div class="tier-pop-up"> 
      <div class="header">
        <h1>{{tier.name}} Sponsors</h1>
        <button @click="closePopup" class="close-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4f4f4f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="sponsors-grid">
        <div v-for="(sponsor, index) in data" :key="index" class="sponsor-item">
          <img v-if="sponsor.logo" class="sponsor-logo" :src="sponsor.logo" alt="sponsor logo">
          <div v-else class="default-logo"></div>
          <span>{{ sponsor.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const emit = defineEmits(['close']);
const data = ref([]); // Make data reactive

function closePopup() {
  emit('close');
}

const props = defineProps({
  tier: Object
});

import axios from 'axios';
import { onMounted } from 'vue';

onMounted(async () => {
  axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/sponsors_tiers_list_vue', {
    params: {
      tier_id: props.tier.id
    },
    auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }
  }).then((response) => {
    data.value = response.data.sponsors
      .filter(sponsor => sponsor !== null) // Filter out null values
      .map(sponsor => {
        if (sponsor.logo) {
          sponsor.logo = import.meta.env.VITE_APP_JEEC_BRAIN_URL.replace('/admin', '') + sponsor.logo;
        }
        return sponsor;
      });
    console.log(data.value);
  }).catch((error) => {
    console.log(error);
  });
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
  width: 90vw;
  max-width: 900px;
  overflow-y: auto;
  padding: 50px 50px 50px 50px;
  height: fit-content;
  max-height: 80vh;
  margin: 3vh auto;
  background-color: #ffff;
  font-size: 0.9em;
  color: var(--text-color);
  font-family: var(--font-family);
  z-index: 3;
  gap: 40px;
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
  gap: 15px;
  padding: 6px 10px;
  box-sizing: border-box;
  height: 60px;
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
  width: 3vw;
  height: 3vw;
  min-width: 40px;
  min-height: 40px;
  border-radius: 50%;
  object-fit: scale-down;
}

.default-logo {
  width: 3vw;
  height: 3vw;
  min-width: 40px;
  min-height: 40px;
  border-radius: 50%;
  background-color: var(--c-select);
}

@media (max-width: 700px) {

  .sponsors-grid {
    grid-template-columns: 1fr; /* 1 column */
  }

  /* Alternate row background across two columns */
.sponsor-item:nth-child(odd) {
  background-color: var(--c-bg-light);
}

.sponsor-item:nth-child(even) {
  background-color: var(--c-accent);
}


}
</style>
