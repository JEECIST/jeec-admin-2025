<template>
    <div class="admin-login">
        <div class="external-box">
            <div class="welcome-wrap">
                <h class="welcome-header">Welcome to</h>
                <h class="welcome-header">JEEC ADMIN</h>
            </div>
            <div class="internal-box">
                <img src="../assets/brain.svg" class="brain-img">
                <div class="login-inputs">
                    <input v-model="text" placeholder="Enter Username">
                    <input type="password" v-model="password" placeholder="Enter Password">
                    <button>
                        <p>Login</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
/* Para o background dos inputs nao ficar amarelo */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
}


p,
h {
    font-family: Kumbh Sans;
}

::placeholder {
    font-family: Kumbh Sans;
}

.admin-login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
}

.external-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40vw;
    min-width: 350px;
}

.welcome-wrap {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 10vh;
    margin-bottom: 10px;
}

.welcome-header {
    font-weight: bold;
    color: #4F4F4F;
    font-size: 250%;
    text-align: center;
}

.internal-box {
    display: flex;
    flex-direction: column;
    height: 40vh;
    width: 100%;
    align-items: center;
    justify-content: space-around;
}

.login-inputs {
    display: flex;
    flex-direction: column;
    width: 55%;
}

.login-inputs>input,
button {
    height: 40px;
    margin-bottom: 15px;
    border-radius: 4px;
    border: solid;
    border-width: 1px;
    border-color: #8A8A8A;
}

.login-inputs>button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2D88D4;
}


.login-inputs>button>p {
    font-weight: bold;
    color: white;
}


.brain-img {
    height: 30%;
}
</style>