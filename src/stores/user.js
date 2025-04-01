import { defineStore } from "pinia";
import CryptoJS from 'crypto-js'

export const useUserStore = defineStore("user", {
  state: () => ({
    username: "",
    role: "admin",
    loggedIn: true,
    accessList: {
      dashboard: true,
      activities: true,
      admin: true,
      bills: true,
      business: true,
      claimprizes: true,
      qrcodes: true,
      speakers: true,
      sponsors: true,
      studentapp: true,
      teams: true,
      usershifts: true,
    },
  }),
  getters: {
    getUsername: (state) => state.username,
    getRole: (state) => state.role,
    isLoggedIn: (state) => state.loggedIn,
    getAccessList: (state) => state.accessList,
  },
  actions: {
    async getAccess(username, password) {
      try {
        await axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/login',{username : username}, {auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }}).then(response=> {
          password = response.data.password
          role = response.data.role
          id = response.data.id
          if (password != ""){
            password = CryptoJS.DES.decrypt(password, import.meta.env.VITE_APP_API_KEY).toString(CryptoJS.enc.Utf8);
            
            
            // console.log(CryptoJS.DES.decrypt('U2FsdGVkX1+jKFPpXzYXJHIR/68SP6nyg9hJQPIRP4fjaOomWRo3OQ==', import.meta.env.VITE_APP_API_KEY).toString(CryptoJS.enc.Utf8))
            if (password.normalize() === password.normalize()){
              this.loginUser(username, role, true, accessList)
              console.log("Updated authentication - success")
            }
            else{
              this.logoutUser()
              console.log("Updated authentication - logout")
            }
          }
          else{
            this.logoutUser()
            console.log("Updated authentication - logout")
          }
        })
      } catch (error) {
        this.logoutUser()
        console.error("Login error:", error);
      }
    },
    loginUser(state, username, role, loggedIn, accessList){
      state.username = username;
      state.role = role;
      state.loggedIn = loggedIn;
      state.accessList = accessList;
    },
    logoutUser(state){
      state.username = "";
      state.role = "";
      state.loggedIn = false;
      state.accessList = {
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
      };
    },
  },
});
