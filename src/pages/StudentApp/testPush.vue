<template>
    <div>
      <h2>Testar Push Notifications</h2>
      <button @click="subscribe">Subscrever</button>
    </div>
  </template>
  
  <script setup>
  import axios from "axios";
 
  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
    }

  async function subscribe() {
    if ("serviceWorker" in navigator && "PushManager" in window) {

    const response = await axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + "/get_publickey", { 
        auth: {
            username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
            password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
          }
      })
      const publicKey = response.data.publicKey;

      const registration = await navigator.serviceWorker.register("/sw.js");
  
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        alert("Permissão negada para notificações");
        return;
      }
  
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey:  urlBase64ToUint8Array(publicKey)
      });
      
      const user_id = 10
      // envia subscription para o backend
      await axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + "/push/subscribe", {subscription, user_id}, {
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }
      });
  
      alert("Subscreveste! Agora o backend pode enviar-te notificações.");
    }
  }
  </script>
  