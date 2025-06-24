# SansMobile003

This repository contains a Vue 3 + Vite + Capacitor mobile application for Sans Reserve.

## Development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

The UI is built with Tailwind CSS and always renders inside a fixed mobile frame for consistent layout across devices.

## Environment Variables

Create a `.env.local` file in the project root and define `VITE_API_BASE_URL`:

```bash
VITE_API_BASE_URL=https://api.sans-reserve.com
```

If this variable is not set, the application falls back to `https://api.sans-reserve.com`.

