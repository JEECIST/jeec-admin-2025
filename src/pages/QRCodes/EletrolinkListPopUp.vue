<script setup>
import { defineProps, defineEmits, ref, onMounted, onUnmounted } from "vue";
import axios from 'axios';

const props = defineProps({
    isOpen: Boolean,
    activity: Object
});

const emit = defineEmits(["modal-close"]);
const data = ref([]);

/* mobile screen detection and adjustment */
const isMobile = ref();
function updateIsMobile() { isMobile.value = window.innerWidth <= 800; }
onMounted(() => {
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    fetchData();
});
onUnmounted(() => { window.removeEventListener('resize', updateIsMobile); });

async function fetchData() {
    await axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/get_eletrolink_registrations', {
        external_id: props.activity.external_id
    },
        {
            auth: {
                username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
                password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
            }
        })
        .then(response => {
            data.value = response.data.students
        })
};
</script>

<template>
    <div v-if="isOpen" class="modal-mask">
        <div :class="{ 'desktop': !isMobile, 'mobile': isMobile }">
            <div :class="{ 'wrapper': !isMobile, 'mobile-wrapper': isMobile }">
                <div class="popup-wrapper">
                    <div class="header">
                        <h1>Registrations</h1>
                        <button :class="{ 'close': !isMobile, 'mobile-close': isMobile }"
                            @click.stop="emit('modal-close')">X</button>
                    </div>
                    <div class="grid-wrapper">
                        <div class="table-wrapper">
                            <div v-for="(student, index) in data" :key="index" class="student">
                                <span>{{ index + 1 }} - {{ student.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.425);
}


.wrapper {
    display: flex;
    justify-content: center;
    background-color: white;
    width: 60vw;
    height: 70%;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    border-radius: 15px;
    overflow-y: auto;
    overflow-x: hidden;
}

.mobile-wrapper {
    display: flex;
    justify-content: center;
    background-color: white;
    width: 100%;
    height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    border-radius: 15px;
    overflow-y: auto;
    overflow-x: hidden;
    border-radius: 15px;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.popup-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

h1 {
    margin-top: 3%;
    margin-bottom: 60px;
    word-spacing: 7px;
    color: #515151;
}

.flex-1,
h1 {
    display: flex;
    flex-direction: column;
    margin-left: 5%;
    margin-right: 15%;
    gap: 1.5vh;
}

.mobile-table-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    width: 70vw;
    margin-top: 4%;
}

.grid-wrapper {
    display: flex;
    width: 100%;
    justify-content: center;
}

.table-wrapper {
    width: 80%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding-bottom: 5%;
}

.student {
    background-color: var(--c-accent);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    font-size: 20px;
    text-align: center;
}

.student:nth-child(4n+1),
.student:nth-child(4n+2) {
    background-color: white;
}

.close {
    background-color: #152259;
    color: white;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    width: 2vw;
    height: 3.5vh;
    margin-bottom: 3%;
    margin-top: 2%;
    margin-right: 2%;
}

.mobile-close {
    background-color: #152259;
    color: white;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    width: 9.5vw;
    height: 3.5vh;
    margin-top: 4%;
    margin-right: 2%;
}

span {
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>