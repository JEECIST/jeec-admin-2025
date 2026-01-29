<template>
    <div class="background">
        <div class="popup-container">
            <div class="header">Edit Activities Type</div>
            <button class="btn_close" @click="closePopup">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none"
                    stroke="#4f4f4f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-x">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <div class="content">
                <div class="row">
                    <div class="col">
                        <label for="name">Name</label>
                        <input id="name" type="text" v-model="name" />
                        <label for="points">Points</label>
                        <input id="points" type="text" v-model="points" />
                    </div>
                    <div class="col">
                        <label for="priority">Priority</label>
                        <input id="priority" type="text" v-model="priority" />
                        <label for="location">Location</label>
                        <select id="location" name="options" v-model="selectedLoc">
                            <option v-for="(loc, index) in locArray" :key="index" :value="loc.name">
                                {{ loc.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <!-- Show in Website -->
                <div class="row">
                    <div class="option-group">
                        <label>Show in Website</label>
                        <div class="radio-group">
                            <label>
                                <input type="radio" name="website-yes" v-model="showInWebsite" :value=true />Yes
                            </label>
                            <label>
                                <input type="radio" name="website-no" v-model="showInWebsite" :value=false />No
                            </label>
                        </div>
                    </div>

                    <!-- Social Media -->
                    <div class="option-group">
                        <label>Social Media</label>
                        <div class="radio-group">
                            <label>
                                <input type="radio" name="social-media-yes" v-model="socialMedia" :value=true />Yes
                            </label>
                            <label>
                                <input type="radio" name="social-media-no" v-model="socialMedia" :value=false />No
                            </label>
                        </div>
                    </div>

                    <!-- Exclusive Video -->
                    <div class="option-group">
                        <label>Exclusive Video</label>
                        <div class="radio-group">
                            <label>
                                <input type="radio" name="exclusive-video-yes" v-model="exclusiveVideos" :value=true />Yes
                            </label>
                            <label>
                                <input type="radio" name="exclusive-video-no" v-model="exclusiveVideos" :value=false />No
                            </label>
                        </div>
                    </div>
                </div>
                <!-- Exclusive Posts -->
                <div class="option-group">
                    <label>Exclusive Posts</label>
                    <div class="radio-group">
                        <label>
                            <input type="radio" name="exclusive-posts-yes" v-model="exclusivePosts" :value=true />Yes
                        </label>
                        <label>
                            <input type="radio" name="exclusive-posts-no" v-model="exclusivePosts" :value=false />No
                        </label>
                    </div>
                </div>

                <div class="end_btn">
                    <button class="btn_add" @click="editType">Edit</button>
                    <!-- function to add and save info v-model -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref, watch , onMounted } from "vue";

const emit = defineEmits(['close','typeEdited'])

function closePopup() {
    emit('close');
}

const props = defineProps({
    selectedType: Object,
    foo: String
})

const oldName = props.selectedType.name;
const name = ref("");
const priority = ref("");
const points = ref("");
const selectedLoc = ref("");
const showInWebsite = ref(false);
const socialMedia = ref(false);
const exclusiveVideos = ref(false);
const exclusivePosts = ref(false);

const locArray = ref([]);

const fetchData = () => {
    axios
        .get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/activities/types/add-infos', {
            auth: {
                username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
                password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
            },
        })
        .then((response) => {
            const data = response.data;
            locArray.value = data.locations.map((location) => ({
                name: location.name,
            }));
        })
        .catch((error) => {
            console.error('Erro ao buscar os dados:', error);
        });
};

onMounted(fetchData)

watch(() => props.selectedType, (newVal) => {
    if (newVal) {
        name.value = newVal.name || "";
        priority.value = newVal.priority || "";
        points.value = newVal.points || "";
        selectedLoc.value = newVal.location|| "";
        showInWebsite.value = newVal.show_in_website || false;
        socialMedia.value = newVal.social_media || false;
        exclusiveVideos.value = newVal.exclusive_videos || false;
        exclusivePosts.value = newVal.exclusive_posts || false;
    }
}, { immediate: true });

function editType(){
    if (!name.value.trim()) {
        console.error("O campo 'Nome' não pode estar vazio.");
        return;
    }

    const typeData = {
        oldName: oldName,
        event_id:'',
        name: name.value,
        points: points.value,
        location: selectedLoc.value,
        priority: priority.value,
        show_in_website: showInWebsite.value,
        social_media: socialMedia.value,
        exclusive_posts: exclusivePosts.value,
        exclusive_videos: exclusiveVideos.value,
    };

    console.log(typeData)

    axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + `/activities/types/edit_type`, typeData, {
        auth: {
            username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
            password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
        },
    })
    .then(() => {
        console.log("Atividade editada com sucesso!");
        emit("typeEdited", typeData)
        emit("close");
    })
    .catch(error => {
        console.error("Erro ao adicionar atividade:", error.response?.data || error);
    });
}

</script>

<style scoped>
.background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.popup-container {
    width: 1100px;
    min-height: 700px;
    background-color: white;
    border-radius: 5px;
    padding: 30px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    position: relative;
    margin: 0px 20px;
}

.header {
    font-size: 1.5em;
    font-weight: 600;
    color: #4f4f4f;
    margin-top: 20px;
    margin-left: 30px;
    margin-right: 20px;
    margin-bottom: 40px;
}

.btn_close {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    cursor: pointer;
}

.content {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.row {
    display: flex;
    justify-content: space-between;
    gap: 30px;
}

.col {
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1;
}

label {
    font-size: 1em;
    color: #4f4f4f;
    font-weight: 500;
    margin-bottom: 5px;
}

input[type="text"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1em;
    margin-top: -20px;
    color: #4f4f4f;
}

select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1em;
    margin-top: -20px;
    color: #4f4f4f;
    background-color: white;
}

select:focus {
    outline: none;
    border-color: #aaa;
}

.option-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.option-group label {
    font-size: 14px;
    color: #4f4f4f;
}

.radio-group {
    display: flex;
    gap: 15px;
}

.radio-group label {
    font-size: 14px;
    color: #4f4f4f;
}

.end_btn {
    position: absolute;
    /* Altere para position: absolute */
    bottom: 40px;
    /* Alinhe com a margem inferior */
    right: 40px;
    /* Alinhe com a margem direita */
    display: flex;
    justify-content: flex-end;
    width: auto;
}

.btn_add {
    background-color: #1a2e4e;
    color: #ffffff;
    padding: 10px 30px;
    font-size: 1em;
    font-weight: 400;
    font-family: 'Kumbh Sans', sans-serif;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn_add:hover {
    background-color: #162742;
}
</style>