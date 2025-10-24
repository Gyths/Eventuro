import { useState } from "react";
import CrearTicketTajeta from "./components/CrearTicketTajeta";
import UbicacionEvento from "./components/UbicacionEvento";
import BotonCTA from "./components/BotonCTA";
import BotonEliminar from "./components/BotonEliminar";
import LoginCard from "./components/LoginCard";
import RegistroCard from "./components/RegistroCard";
import EventCard from "./components/EventCard";
import BannerCarousel from "./components/BannerCarousel";

import { Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import HomePublic from "./pages/HomePublic";
import HomePrivate from "./pages/HomePrivate";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PaymentMethod from "./pages/PaymentMethod";

import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home.jsx";
import { Navigate } from "react-router-dom";
import AuthCallback from "./pages/AuthCallback";
import CrearEventoCards from "./pages/CrearEventoCards.jsx";
import MisTickets from "./pages/MisTickets";
import OrganizerRoute from "./routes/OrganizerRoute";
import MyCalendar from "./pages/MyCalendar.jsx";
import TicketSelection from "./pages/EventInformation.jsx";

function App() {
  return (
    <Routes>
      <Route path="auth/callback" element={<AuthCallback />} />

      <Route element={<RootLayout />}>
        <Route index element={<Home />} />

        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Register />} />
        <Route element={<OrganizerRoute requireApproved={true} />}>
          <Route path="/crearEvento" element={<CrearEventoCards />} />

          {/*<Route> se comenta para evitar que la pagina dentro de ella esté restringida a una sesión autenticada*/}
          <Route path="app/*" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="pago" element={<PaymentMethod />} />
        </Route>
        <Route path="seleccionTickets" element={<TicketSelection />} />

        <Route path="miCalendario" element={<MyCalendar />} />
        <Route path="misTickets" element={<MisTickets />} />

        <Route element={<ProtectedRoute />}>
          <Route path="pago" element={<PaymentMethod />} />
        </Route>

        <Route path="app/*" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
