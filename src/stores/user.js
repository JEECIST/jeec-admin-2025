import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import CryptoJS from 'crypto-js'
import axios from 'axios'
import { jwtDecode } from "jwt-decode";


const router = useRouter();

export const useUserStore = defineStore("user", {
  state: () => ({
    username: "",
    role: "",
    loggedIn: false,
    jwt_access: "",
    jwt_refresh: "",
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
      try {
        const response = await axios.post(
          import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/login',
          { username },
          {
            auth: {
              username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
              password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
            },
          }
        );
    
        const { password: password_received, jwt_access, jwt_refresh, role: role_received } = response.data;
        console.log("Received data:", response.data);
        if (password_received !== "") {
          const password_decrypted = CryptoJS.DES.decrypt(password_received, import.meta.env.VITE_APP_API_KEY).toString(CryptoJS.enc.Utf8);
          console.log("Decrypted password:", password_decrypted);
          if (password.normalize() === password_decrypted.normalize()) {
            this.loginUser(username, jwt_access, jwt_refresh, role_received);
            console.log("Login success");
            return true;
          } else {
            this.logoutUser();
            console.log("Login Failed");
            return false;
          }
        }
    
        this.logoutUser();
        return false;
      } catch (error) {
        console.error("Login error:", error);
        this.logoutUser();
        return false;
      }
    },
    loginUser(username, jwt_access, jwt_refresh, role){
      this.username = username;
      this.role = role.name;
      this.jwt_access = jwt_access;
      this.jwt_refresh = jwt_refresh;
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
    },
    logoutUser(){
      this.$reset();
      localStorage.removeItem("user");
    },
    
    isTokenExpired() {
      try {
        const decoded = jwtDecode(this.jwt_access);
        if (!decoded || !decoded.exp) return true;

        const now = Math.floor(Date.now() / 1000);
        return decoded.exp < now;
      } catch (e) {
        console.error("Failed to decode token:", e);
        return true;
      }
    },

    async refreshJWT() {
      await axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/refresh_jwt',{refresh_jwt : this.jwt_refresh}, {auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
      }}).then(response=> {
        // let new_access_jwt = response.data.jwt_access;
        // let new_refresh_jwt = response.data.jwt_refresh;
        // refreshTokens(new_access_jwt,new_refresh_jwt);

        this.jwt_access = response.data.jwt_access;
        this.jwt_refresh = response.data.jwt_refresh;
      })
      return false;
    },

    refreshTokens(access_jwt, refresh_jwt){
      this.jwt_access = access_jwt;
      this.jwt_refresh = refresh_jwt;
    },

    async verifyPermission(){
      let permission = false;
      await axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/check_permission',{access_jwt : this.jwt_access}, {auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
      }}).then(response=> {
        permission = response.data.permission;
        let access_list = response.data.access_list;

        this.accessList = {
          dashboard: true,
          activities: access_list.activities,
          admin: access_list.admin,
          bills: access_list.bills,
          business: access_list.business,
          claimprizes: access_list.claim_prizes,
          qrcodes: access_list.qr_codes,
          speakers: access_list.speakers,
          sponsors: access_list.sponsors,
          studentapp: access_list.student_app,
          teams: access_list.teams,
          usershifts: access_list.shifts,
        };
      })

      return permission;
    }
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
