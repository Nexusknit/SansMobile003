import { defineStore } from 'pinia';

const LOCALE_KEY = 'sr_locale';

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    locale: (localStorage.getItem(LOCALE_KEY) as 'en' | 'fa') || 'en',
  }),
  actions: {
    setLocale(l: 'en' | 'fa') {
      this.locale = l;
      localStorage.setItem(LOCALE_KEY, l);
    },
  },
});
