import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { useSessionStore } from './stores/session';
import './assets/main.css';

const app = createApp(App);
const pinia = createPinia();
const session = useSessionStore(pinia);
session.refresh();

app.use(pinia).use(router).mount('#app');
