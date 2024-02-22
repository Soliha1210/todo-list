// Define an interface for your store

  
  // Import necessary dependencies
  import { defineStore } from "pinia";
  import { ref } from 'vue'
  
  // Define and export your store
  export const useUsefull = defineStore('usefull',()=>{
      const toggle = ref(false)
      const setToggle = (payload:boolean) => {
          toggle.value = payload
      }
  
      const deleteToggle = ref(false)
      const setDeleteToggle = (payload:boolean) => {
          deleteToggle.value = payload
      }
      const editToggle = ref(false)
      const setEditToggle = (payload:boolean) => {
          editToggle.value = payload
      }
      
      return {
          toggle,
          setToggle,
          deleteToggle,
          setDeleteToggle,
          editToggle,
          setEditToggle,
      }
  })
  
  