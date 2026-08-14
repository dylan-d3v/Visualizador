import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initializeDatabase } from "./db/seed/initializeDatabase";

initializeDatabase()
  .then(() => {
    createRoot(
      document.getElementById("root")!
    ).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  })
  .catch((error) => {
    console.error(
      "Error inicializando la aplicación:",
      error
    );
  });
