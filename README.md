# Hollowgate: install as a mobile app

## 1. Host it (needed once)
Service workers only run on HTTPS. Upload this whole folder to any static host
(Netlify Drop, GitHub Pages, Cloudflare Pages). No server code is needed.

## 2. Install on Android (no APK needed)
Open the hosted link in Chrome, wait for it to load once, then tap
menu > "Install app" / "Add to Home screen". It launches fullscreen, landscape,
with its own icon, and works offline from then on (Three.js is cached on first load).

## 3. Real APK (optional)
Easiest: go to pwabuilder.com, paste your hosted URL, choose Android, download the package.
Or with Capacitor on a computer with Node + Android Studio:
    npm init -y && npm i @capacitor/core @capacitor/cli @capacitor/android
    npx cap init Hollowgate com.yourname.hollowgate --web-dir=.
    curl -o three.min.js https://cdnjs.cloudflare.com/ajax/libs/three.js/0.152.2/three.min.js
    (in index.html change the CDN <script src> to "three.min.js")
    npx cap add android && npx cap open android
In Android Studio set the activity to landscape, then Build > Build APK.

## Updating
Change `V` in sw.js (e.g. hollowgate-v2) whenever you edit index.html so phones fetch the new version.
