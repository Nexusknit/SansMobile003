import { createApp, watch } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { useLocaleStore } from './stores/locale';
import { useSessionStore } from './stores/session';
import './assets/main.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia).use(router);

const session = useSessionStore();
session.refreshExpiry();

// Keep document direction and language in sync with the current locale
const locale = useLocaleStore();
watch(
  () => locale.dir,
  (dir) => {
    document.documentElement.dir = dir;
  },
  { immediate: true }
);
watch(
  () => locale.locale,
  (lang) => {
    document.documentElement.lang = lang;
  },
  { immediate: true }
);

app.mount('#app');
