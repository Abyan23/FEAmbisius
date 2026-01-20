Menjalankan Project

1. install dependencies yang akan digunakan, dalam hal ini saya menginstall
   a. npm create vite@latest . -- --template react (instalasi react)
   b. npm install tailwindcss @tailwindcss/vite (instalasi taliwind)
   c npm install react-hot-toast (instalasi toaster untuk errror/success handling)

2. Menjalankan development server
   NPM run dev, lalu o untuk membukanya di lokal server

3. Build Untuk Production
   npm run build

4. Deploy ke Github Pages
   npm run deploy

src/
├─ components/ Komponen UI (Header)
├─ services/ API calls (auth.js)
├─ pages/ Halaman (ActiveQuiz, Profile, HistoryQuiz, dll.)
├─ App.jsx Root component + routing
├─ main.jsx Entry point
public/
├─ index.html

Base API URL berada di src/services/auth.js
