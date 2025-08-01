import { createApp, watch } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { useLocaleStore } from "./stores/locale";
import { useSessionStore } from "./stores/session";
import i18n from "./i18n";
import "./assets/main.css";
import "./styles/theme.scss";
import {
  create,
  NButton,
  NInput,
  NInputGroup,
  NInputGroupLabel,
  NCard,
  NAlert,
  NInputOtp,
  NMessageProvider,
} from "naive-ui";

const naive = create({
  components: [
    NButton,
    NInput,
    NInputGroup,
    NInputGroupLabel,
    NCard,
    NAlert,
    NInputOtp,
    NMessageProvider,
  ],
});
import "@fortawesome/fontawesome-free/css/all.min.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia).use(router).use(i18n).use(naive);

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
    i18n.global.locale.value = lang;
  },
  { immediate: true }
);

app.mount("#app");
