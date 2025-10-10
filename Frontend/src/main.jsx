import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./services/auth/AuthContext";
import { ModalProvider } from "./context/ModalContext";
import { EventProvider } from "./services/Event/EventContext.jsx";
import { OrderProvider } from "./services/Order/OrderContext.jsx";

import "./styles/index.css";
import App from "./App.jsx";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <EventProvider>
        <OrderProvider>
          <AuthProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </AuthProvider>
        </OrderProvider>
      </EventProvider>
    </BrowserRouter>
  </StrictMode>
);
