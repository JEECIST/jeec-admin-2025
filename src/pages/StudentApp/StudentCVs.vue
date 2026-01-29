<template>
    <div class="table">
      <form>
        <div class="search_style">
          <label>
            <img src="../../assets/search.svg">
          </label>
          <input v-model="message" placeholder="Search for a user" />
        </div>
      </form>
      <TheTable :data="students_with_cv" :tableHeaders="tablePref" :searchInput="message" :buttons="tableButtons"
      @inspect_cv="get_cv" @approve_cv="accept_cv" @reject_cv="remove_cv">
      </TheTable>
    </div>
</template>

<script setup>
import TheTable from '../../global-components/TheTable.vue';
import { ref, onMounted } from 'vue';
import check from '../../assets/check.svg';
import trash from '../../assets/trash.svg';
import inspect from '../../assets/search.svg';
import axios from 'axios';

// const datab = ref([
//   {
//     id: "1",
//     name: "Duarte",
//     username: "duartehd"
//   },
//   {
//     id: "2",
//     name: "Marco",
//     username: "Supimpa"
//   },
// ]);

const message = ref();

const tablePref = {
  id: "ID",
  name: "Student Name",
  username: "Student Username"
};

const tableButtons = [{
  name: "Inspect",
  eventName: "inspect_cv",
  icon: inspect
}, {
   name: "Approve",
   eventName: "approve_cv",
   icon: check 
}, {
   name: "Reject",
   eventName: "reject_cv",
   icon: trash 
}];

const students_with_cv = ref([]);

function get_students_with_cv () {
  axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/get_students_with_cv', {
    auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }
  }).then(response => {
    console.log(response.data)
    students_with_cv.value = response.data.students
  })
}

function get_cv(student) {
  axios.post(
    import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/get_cv',
    {
      student_username: student.username,
      tecnico: student.isFromTecnico,
      educationLevel: student.educationLevel
    },
    {
      responseType: 'blob', // IMPORTANT: Treat the response as binary
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
      }
    }
  )
  .then(response => {
    // Ensure that the response data is not empty
    if (!response.data || response.data.size === 0) {
      console.error("Received empty PDF data");
      return;
    }
    
    // Create a blob URL for the PDF file
    const fileURL = window.URL.createObjectURL(
      new Blob([response.data], { type: 'application/pdf' })
    );
    // Open the PDF in a new browser tab
    window.open(fileURL, '_blank');
  })
  .catch(error => {
    console.error("Error fetching the CV:", error);
  });
}


function accept_cv (student){
  axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/accept_cv', {
    student_username: student.username,
    tecnico: student.isFromTecnico,
    educationLevel: student.educationLevel},
    {auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    },
  }).then(response => {
    console.log(response.data)
    get_students_with_cv();
  })
}

function remove_cv (student){
  axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/remove_cv', {
    student_username: student.username,
    tecnico: student.isFromTecnico,
    educationLevel: student.educationLevel},
    {auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    },
  }).then(response => {
    console.log(response.data)
    get_students_with_cv();
  })
}

onMounted(() => {
  get_students_with_cv();
});

</script>

<style scoped>
.wrapper {
  /* display: flex; */
  position: relative;
  height: calc(100dvh - var(--header-height));
  padding: 5ch 3ch 3ch 3ch;
  overflow-y: hidden;
}

.table {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 3ch;
  padding-right: 3ch;
}

form {
  display: flex;
  height: 50px;
  line-height: 50px;
  align-items: center;
  gap: 3ch;
  padding-left: 1ch;
  border-radius: 10px;
}

.search_style {
  display: flex;
  background-color: var(--c-accent);
  height: 50px;
  line-height: 50px;
  align-items: center;
  gap: 1ch;
  padding-left: 1ch;
  border-radius: 6px;
  width: 60%;
}

.search_style>label>img {
  width: 20px;
  position: relative;
  top: 4px;
  left: 3px;
}

.search_style>input {
  appearance: none;
  background-color: transparent;
  border: 0px;
  color: var(--c-ft-semi-light);
  font-style: inherit;
  font-variant: inherit;
  font-weight: inherit;
  font-stretch: inherit;
  line-height: inherit;
  font-family: inherit;
  font-size-adjust: inherit;
  font-kerning: inherit;
  font-optical-sizing: inherit;
  font-language-override: inherit;
  font-feature-settings: inherit;
  font-variation-settings: inherit;
  font-size: 1rem;
  height: 100%;
  outline: none;
  padding: 0px 0px 0px 8px;
  width: 100%;
}

.search_style input::placeholder {
  color: var(--c-ft-semi-light);
}

.scanner {
  max-width: 800px;
  height: 100%;
}

.closeQR-button {
  position: absolute;
  z-index: 1000;
  margin-top: 10px;
  margin-left: 10px;
  border: none;
  background: transparent;
}

.closeQR-button > img {
  height: 3vh;
  width: 3vh;
}

.scanned-pop-up {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  z-index: 1000;
  margin-top: 30vh;
  left: 0; 
  right: 0; 
  margin-inline: auto; 
  width: fit-content;
  background-color: var(--c-bg-light);
  border-radius: 10px;
  height: 10%;
  width: 50%;
  opacity: 80%;
}

.scanned-pop-up > button {
  border: none;
  border-radius: 10px;
  height: 2.5rem;
  width: 2.5rem;
  background-color: var(--c-select);
}

</style>

