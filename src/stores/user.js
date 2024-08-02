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
      bills: true,
      business: true,
      claimprizes: true,
      qrcodes: true,
      speakers: true,
      sponsors: true,
      studentapp: true,
      teams: true,
    },
  }),
  actions: {
    getAccess() {
      // do axios shit here
    },
  },
});
