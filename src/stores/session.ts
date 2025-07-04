import { defineStore } from "pinia";

interface UserProfile {
  id: number;
  firstname: string;
  lastname: string;
  image: string;
  phone: string;
  birthday: string;
  melicode: string;
  gender: string;
  short_link: string;
}

interface SessionState {
  token: string | null;
  expiry: number | null;
  user: UserProfile | null;
}

const SESSION_KEY = "sr_session";
const EXPIRY_KEY = "sr_expiry";

export const useSessionStore = defineStore("session", {
  state: (): SessionState => ({
    token: localStorage.getItem(SESSION_KEY),
    expiry: localStorage.getItem(EXPIRY_KEY)
      ? parseInt(localStorage.getItem(EXPIRY_KEY) as string)
      : null,
    user: null,
  }),
  actions: {
    saveToken(token: string, days = 7) {
      this.token = token;
      const expiry = Date.now() + days * 24 * 60 * 60 * 1000;
      this.expiry = expiry;
      localStorage.setItem(SESSION_KEY, token);
      localStorage.setItem(EXPIRY_KEY, expiry.toString());
    },
    clear() {
      this.token = null;
      this.expiry = null;
      this.user = null;
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(EXPIRY_KEY);
    },
    isExpired(): boolean {
      if (!this.expiry) return true;
      return Date.now() > this.expiry;
    },
    refresh(days = 7) {
      if (this.token && !this.isExpired()) {
        const newExpiry = Date.now() + days * 24 * 60 * 60 * 1000;
        this.expiry = newExpiry;
        localStorage.setItem(EXPIRY_KEY, newExpiry.toString());
      }
    },
    refreshExpiry() {
      if (this.token && !this.isExpired()) {
        const newExpiry = Date.now() + 7 * 24 * 60 * 60 * 1000;
        this.expiry = newExpiry;
        localStorage.setItem(EXPIRY_KEY, newExpiry.toString());
      }
    },
  },
});
