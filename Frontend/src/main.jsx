import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./services/auth/AuthContext";
import './styles/index.css'
import App from './App.jsx'
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
