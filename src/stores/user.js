import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "user name",
    role: "team",
    loggedIn: true,
    accessList: {
      dashboard: true,
      activities: true,
      admin: true,
      business: true,
      claimprizes: false,
      qrcodes: true,
      speakers: false,
      sponsors: false,
      studentapp: true,
    },
  }),
  actions: {
    getAccess() {
      // do axios shit here
    },
  },
});
