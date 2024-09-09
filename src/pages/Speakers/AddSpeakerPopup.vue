<script setup>

</script>

<template>
    <div class="popup-wrapper">
        <h1>Add Speaker</h1>
        <div class="flex-1">
            <div class="flex-1-row-1">
                <div class="labels" id="name">
                    <label for="name">Name</label>
                    <input type="text" placeholder="" id="name">
                </div>
                <div class="labels" id="event">
                    <label for="event">Event</label>
                    <select placeholder="Choose Event" id="event">
                        <option>event test</option>
                    </select>
                </div>
            </div>
            <div class="flex-1-row-2">
                <div class="labels" id="linkedin">
                    <label for="linkedin">LinkedIn</label>
                    <input type="text" placeholder="" id="linkedin">
                </div>
                <div class="labels" id="type">
                    <label for="type">Type</label>
                    <select placeholder="" id="type">
                        <option>type test</option>
                    </select>
                </div>
            </div>
            <div class="flex-1-row-3">
                <div class="labels" id="biography">
                    <label for="biography">Biography</label>
                    <input type="text" placeholder="" id="biography">
                </div>
            </div>
            <div class="flex-1-row-4">
                <div class="labels" id="company">
                    <label for="company">Company</label>
                    <input type="text" placeholder="" id="company">
                </div>
                <div class="labels" id="position">
                    <label for="position">Position</label>
                    <input type="text" placeholder="" id="position">
                </div>
            </div>
            <div class="flex-1-row-5">
                <div class="labels" id="website">
                    <label for="website">Company Website</label>
                    <input type="text" placeholder="" id="website">
                </div>
                <div class="labels" id="country">
                    <label for="country">Country</label>
                    <input type="text" placeholder="Odivelas - Terra das Oportunidades" id="country">
                </div>
            </div>
        </div>
        <div class="flex-2">
            <div class="labels" id="speakerdickpic">
                <label for="speakerdickpic">Speaker Dick Pic</label>
                <p class="idk">
                    Size too small please insert larger dick 🥺
                </p>
                <button id="coolbutton">Add Dic Pic</button>
            </div>
            <div class="labels" id="companylogo">
                <label for="companylogo">Company Logo</label>
                <p class="idk">
                    No logo selected yet
                </p>
                <button id="coolbutton">Add New Logo</button>
            </div>
            <div class="irresponsible">
                <div class="labels" id="responsible">
                    <label for="responsible">JEEC Responsible</label>
                    <select id="responsible">
                        <option value="0" disabled selected hidden>Select</option>
                        <option value="1">LARA</option>
                        <option value="2">ZE</option>
                        <option value="3">EMO LARA</option>
                        <option value="4">AFONSO VILELA</option>
                    </select>
                </div>

            </div>
        </div>
        <button class="add">Add</button>
    </div>
</template>

<style scoped>
.popup-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
}

h1 {
    color: #515151;
}

template {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2.3vh;
}

.flex-1,
h1 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 5vw;
    margin-right: 15vw;
    gap: 2.3vh;

}

.flex-1-row-1,
.flex-1-row-2,
.flex-1-row-3,
.flex-1-row-4,
.flex-1-row-5 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

input {
    color: #515151;
    border-style: solid;
    border-width: thin;
    border-radius: 5px;
    outline: none;
    height: 5vh;
}

#biography {
    height: 20vh;
    flex: 1 0 100%;
}

select {
    border-style: solid;
    border-width: thin;
    border-radius: 5px;
    padding: 12px;
    color: #8a8a8a;
    background-color: white;
    height: 5vh;
}

.add {
    background-color: #152259;
    color: white;
    border-radius: 5px;
    border: none;
    margin-right: 5vw;
    display: flex;
    margin-left: auto;
    width: 14vw;
    height: 3.5vh;
    align-items: center;
    justify-content: center;
    gap: 10vh;
}

.labels {
    display: flex;
    flex-direction: column;
    color: #515151;
    font-size: smaller;
    height: 100%;
}

.labels>#name {
    width: 51.8vw;
}

.labels>#event {
    width: 22.2vw;
}

.labels>#company,
#position,
#website,
#country,
#linkedin,
#type {
    width: 37vw;
}

.flex-2 {
    display: flex;
    flex-direction: row;
    margin-right: 15vw;
    margin-left: 5vw;
    gap: 2vw;
    justify-content: space-between;
}

#speakerdickpic,
#companylogo {
    width: 21vw;
}

.irresponsible {
    width: 34vw;
}

p {
    display: flex;
    align-items: center;
    vertical-align: middle;
    justify-content: center;
    text-align: center;
    background-color: #ebf6ff;
    border: none;
    border-radius: 5px;
    height: 21vh;
}

#coolbutton {
    background-color: #509cdb;
    color: white;
    border: none;
    border-radius: 5px;
    width: 14vw;
    height: 3.5vh;
    font-size: smaller;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    justify-content: center;
}
</style>