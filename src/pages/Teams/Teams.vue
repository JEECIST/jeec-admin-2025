<template>
  <div class="teams">
    <div class="headerteams">
      <div class="searchteam">
        <svg xmlns="http://www.w3.org/2000/svg" class="searchicon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M10.5 17a6.5 6.5 0 100-13 6.5 6.5 0 000 13z" />
        </svg>
        <input 
          type="text" 
          placeholder="Search for a team" 
          class="searchbar" 
          v-model="searchQuery" 
        />
      </div>
      <div class="evento">
        <div class="title">
          <select v-model="selectedEvent" id="event" @change="handleEventChange">
            <option v-for="event in events" :key="event.id" :value="event.name"> 
              {{ event.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="add-team">
        <button class="button">Add Team</button>
      </div>
    </div>
    <div>
      <div v-if="filteredTeams.length === 0" class="form">
        <label class="title">No teams found</label>
      </div>
    </div>
  </div>
</template>

<script>
import TheTable from '../../global-components/TheTable.vue';

export default {
  data() {
    return {
      selectedEvent: 'Select an event',
      searchQuery: '',
      events: [  /*mal-feito*/
        { id: 1, name: 'Evento 1' },
        { id: 2, name: 'Evento 2' },
        { id: 3, name: 'Evento 3' },
      ],
      teams: [  /*mal-feito*/
        { id: 1, name: 'Team 1' },
        { id: 2, name: 'Team 2' },
        { id: 3, name: 'Team 3' },
      ],
    };
  },
  computed: {
    filteredTeams() {
      return this.teams.filter(team => 
        team.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    handleEventChange() {
      console.log(this.selectedEvent);
    },
  },
};
</script>

<style scoped>
.teams {
  width: 100%;
  max-width: 1200px;
  margin: auto;
  background: #FFFFFF;
  padding: 50px;
  max-height: 101dvh;
}

.headerteams {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.searchteam {
  position: relative;
  width: 638px;
  height: 49px;
  background-color: #EBF6FF;
  border-radius: 4px;
  padding: 16px, 20px, 16px, 16px;
}

.searchicon {
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #8A8A8A;
}

.searchbar{
  width: 100%;
  height: 49px;
  padding: 16px 20px 16px 40px;
  border: none;
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 14px; 
  font-weight: 500;
  line-height: 17.36px; 
  background-color: #EBF6FF;
  outline: none;
}

.evento {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 4px;
}

.title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 14px; 
  font-weight: 500;
  line-height: 17.36px; 
} 

.evento-lable{
  flex-direction: column;
}

.evento select {
  width: 100%; 
  height: 49px; 
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  font-size: 14px;
}

.add-team {
  display: flex;
  justify-content: flex-end;
}

.button {
  height: 49px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  background-color: var(--c-select);
  border-radius: 10px;
  color: var(--c-bg-light);
  cursor: pointer;
  padding: 0.5ch 3ch;
  margin-left: 10px;
}

.form {
  display: flex;
  justify-content: center;
  background-color: var(--c-accent);
  margin: auto ;
  align-items: center;
  height: calc( 74dvh - var(--header-height));
  overflow-y: hidden;
  position: relative;
  padding: 5ch 3ch 3ch 3ch;
}

</style>