import { defineStore } from 'pinia';
import axios from 'axios';
import { useUserStore } from "../stores/user.js";

const userStore = useUserStore();

export const useSlotStore = defineStore('slotStore', {
  state: () => ({
    slots: [],
    stringSlots: '',
  }),
  actions: {
    initializeStore() {
      const storedSlots = localStorage.getItem('slots');
      if (storedSlots) {
        this.slots = JSON.parse(storedSlots);
      }
    },
    toggleSlot(weekday, time) {
      const slotIndex = this.slots.findIndex(
        (slot) => slot.weekday === weekday && slot.time === time
      );

      if (slotIndex === -1) {
        this.slots.push({ weekday, time });
      } else {
        this.slots.splice(slotIndex, 1);
      }

      this.saveSlots();
    },
    saveSlots() {
      localStorage.setItem('slots', JSON.stringify(this.slots));
    },
    isSelected(weekday, time) {
      return this.slots.some(
        (slot) => slot.weekday === weekday && slot.time === time
      );
    },
    showSelected() {
        console.log(this.slots);
    },
    submitSlots() {
        let username = userStore.username;
        console.log(this.slots)
        axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/add_shifts_to_user', {
          username: username,  
          user_shifts: this.slots},
          {auth: {
            username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
            password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
          }
        }).then(response => {
          // console.log(response.data)
          alert(response.data)
        })
    },
    extractShifts() {
      axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/extract_member_shifts_to_json', {
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }
      }).then(response => {
        console.log(response.data)
      })
    },
    getShifts() {
      let username = userStore.username;
      console.log(username)
      axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/get_user_shifts', {
        username: username},
        {auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }
      }).then(response => {
        console.log(response.data)
        this.slots = response.data.shifts;
      })
    }
  }
});
