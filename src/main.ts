import { createApp, watch } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { useLocaleStore } from './stores/locale';
import './assets/main.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia).use(router);

// Keep document direction in sync with the current locale
const locale = useLocaleStore();
watch(
  () => locale.dir,
  (dir) => {
    document.documentElement.dir = dir;
  },
  { immediate: true }
);

app.mount('#app');
