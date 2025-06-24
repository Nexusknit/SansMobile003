import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import fa from './locales/fa.json';
import { useLocaleStore } from './stores/locale';
import './assets/main.css';

const pinia = createPinia();
const localeStore = useLocaleStore(pinia);

const i18n = createI18n({
  legacy: false,
  locale: localeStore.locale,
  fallbackLocale: 'en',
  messages: { en, fa },
});

localeStore.$subscribe((_m, state) => {
  i18n.global.locale.value = state.locale;
});

createApp(App)
  .use(pinia)
  .use(i18n)
  .use(router)
  .mount('#app');
