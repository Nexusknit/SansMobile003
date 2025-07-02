# 📁 Project Structure — SansMobile003

## 🔹 Overview

**SansMobile003** is a mobile-only Vue.js application, styled with Tailwind CSS, using Axios for API interactions. It connects to a Laravel backend secured by custom JWT authentication. The app supports Persian and English languages and is designed to work both online and offline as a PWA.

- **Frontend:** Vue.js + Vite
- **Mobile-only UI** (even on desktop)
- **Styling:** Tailwind CSS
- **API Client:** Axios
- **Auth:** Custom JWT
- **Routing:** Vue Router
- **State Management:** Pinia
- **Localization:** i18n (multi-language)
- **Offline Support:** PWA
- **API Base URL:** Set via `VITE_API_BASE_URL`

---

## 📁 Folder Structure (as of repo)

```
SansMobile003-main/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.cjs
├── tsconfig.json
├── README.md
├── .env.local / .env.example
└── src/
    ├── App.vue
    ├── main.ts
    ├── config/         # API base URL config
    │   └── api.ts
    ├── api/            # (expected location of axios service modules)
    ├── stores/         # Pinia stores
    ├── views/          # Pages/screens
    ├── assets/
    └── router/         # Vue Router config
```

---

## 📡 API Handling

- **Base URL config:** in `src/config/api.ts`
- **Axios instance** should be placed in `src/api/axios.ts` (recommended)
- Each module (auth, user, etc.) should have its own API wrapper in `src/api/`

```ts
// Example: src/api/axios.ts
import axios from 'axios';
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
```

---

## 🔐 Authentication

- Use localStorage or Pinia store to persist JWT
- Add login/logout methods to `auth.ts` under `src/api/`
- Auto-refresh handling can be added later

---

## 🌍 Multi-language (i18n)

- Add `src/i18n/index.ts` with language detection and fallback
- Use key-based translation (`$t('auth.login')`)

---

## ⚠️ Error Handling

Recommended structure:

- `src/helpers/handleError.ts` → unified error handler
- `src/components/common/Toast.vue` → reusable toast
- Use interceptors for global Axios error catching

---

## ⚙️ PWA Support

- Add service worker + manifest setup in `vite.config.ts`
- Consider using [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)

---

## 🧾 API Documentation Flow

- Every new route should be:
  1. Added to `src/config/api.ts` with method/type
  2. Described in `README.md` with sample JSON request/response

---

Let me know when to open next document: `api-docs.md`, `axios.ts`, or `i18n-guide.md`

