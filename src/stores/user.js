import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import CryptoJS from 'crypto-js'
import axios from 'axios'

const router = useRouter();

export const useUserStore = defineStore("user", {
  state: () => ({
    username: "",
    role: "",
    loggedIn: false,
    accessList: {
      dashboard: false,
      activities: false,
      admin: false,
      bills: false,
      business: false,
      claimprizes: false,
      qrcodes: false,
      speakers: false,
      sponsors: false,
      studentapp: false,
      teams: false,
      usershifts: false,
    },
  }),
  getters: {
    getUsername: (state) => state.username,
    getRole: (state) => state.role,
    isLoggedIn: (state) => state.loggedIn,
    getAccessList: (state) => state.accessList,
  },
  actions: {
    testUserStore(username,password){
      console.log(username);
      console.log(password);
    },
    async getAccess(username, password) {
      console.log(password)
      await axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/login',{username : username}, {auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
      }}).then(response=> {
        let password_received = response.data.password
        let role_received = response.data.role
        
        if (password_received != ""){
          let password_decrypted = CryptoJS.DES.decrypt(password_received, import.meta.env.VITE_APP_API_KEY).toString(CryptoJS.enc.Utf8);
          
          // console.log(CryptoJS.DES.decrypt('U2FsdGVkX1+jKFPpXzYXJHIR/68SP6nyg9hJQPIRP4fjaOomWRo3OQ==', import.meta.env.VITE_APP_API_KEY).toString(CryptoJS.enc.Utf8))
          if (password.normalize() === password_decrypted.normalize()){
            this.loginUser(username, role_received, true)
            console.log("Login success")
            return true;
          }
          else{
            this.logoutUser()
            console.log("Login Failed")
            return false;
          }
        }
      })
      return false;
    },
    loginUser(username, role, loggedIn){
      console.log("HEREERERE")
      this.username = username;
      this.role = role.name;
      this.loggedIn = true;
      this.accessList = {
        dashboard: true,
        activities: role.activities,
        admin: role.admin,
        bills: role.bills,
        business: role.business,
        claimprizes: role.claim_prizes,
        qrcodes: role.qr_codes,
        speakers: role.speakers,
        sponsors: role.sponsors,
        studentapp: role.student_app,
        teams: role.teams,
        usershifts: role.shifts,
      };
      console.log(this.role)
    },
    logoutUser(){
      this.$reset();
      localStorage.removeItem("user");
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});
