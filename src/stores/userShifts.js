import { defineStore } from 'pinia';

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
    toggleSlot(day, weekday, time) {
      const slotIndex = this.slots.findIndex(
        (slot) => slot.day === day && slot.weekday === weekday && slot.time === time
      );

      if (slotIndex === -1) {
        this.slots.push({ day, weekday, time });
      } else {
        this.slots.splice(slotIndex, 1);
      }

      this.saveSlots();
    },
    saveSlots() {
      localStorage.setItem('slots', JSON.stringify(this.slots));
    },
    isSelected(day, weekday, time) {
      return this.slots.some(
        (slot) => slot.day === day && slot.weekday === weekday && slot.time === time
      );
    },
    showSelected() {
        console.log(this.slots);
    },
    submitSlots() {
        this.stringSlots = JSON.stringify(this.slots);
        console.log("String: " , this.stringSlots);
        this.slots = JSON.parse(this.stringSlots);
        console.log("Parsed: " , this.slots);
        console.log("zero: " , this.slots[0].weekday);
    },
  }
});
