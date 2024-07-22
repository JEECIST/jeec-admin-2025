import { defineStore } from "pinia";
import accessListJSON from "./accessList.json";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "whatever",
    role: "webdev",
    accessList: {
      dashboard: true,
      admin: false,
      companies: false,
      speakers: false,
      sponsors: false,
      studentapp: false,
      website: false,
    },
  }),
  actions: {
    getAccess() {
      this.accessList = JSON.parse(JSON.stringify(accessListJSON))[this.role];
    },
  },
});
