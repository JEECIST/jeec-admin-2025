import { defineStore } from "pinia";

export const useStateStore = defineStore("state", {
  state: () => ({
    sideNavOpen: false,
  }),
});
