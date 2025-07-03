import { defineStore } from 'pinia';

/**
 * Basic locale store holding current locale and text direction.
 */
interface LocaleState {
  locale: string;
  dir: 'ltr' | 'rtl';
}

export const useLocaleStore = defineStore('locale', {
  state: (): LocaleState => ({
    locale: 'fa',
    dir: 'rtl',
  }),
  actions: {
    setLocale(locale: string) {
      this.locale = locale;
      this.dir = ['ar', 'fa', 'he', 'ur'].some((l) => locale.startsWith(l))
        ? 'rtl'
        : 'ltr';
    },
  },
});
