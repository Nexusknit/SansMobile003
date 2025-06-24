# SansMobile003

This repository contains a Vue 3 + Vite + Capacitor mobile application for Sans Reserve.

## Development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

### Environment Variables

Create a `.env.local` file (you can copy `.env.example`) and set the base URL
for the backend API:

```bash
VITE_API_BASE_URL=https://api.example.com
```

Vite exposes this value as `import.meta.env.VITE_API_BASE_URL` and the
application will fail to start if it is missing.

The UI is built with Tailwind CSS and always renders inside a fixed mobile frame for consistent layout across devices.

## Building for Android and PWA

To update the native Android project and open it in Android Studio:

```bash
npm run build       # build the web assets
npx cap sync        # copy assets to Capacitor projects
npx cap open android
```

For a Progressive Web App build simply run:

```bash
npm run build
```

The generated files in `dist/` can be served as a standard static site.