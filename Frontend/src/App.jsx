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
import SolicitudesReembolso from "./pages/SolicitudesReembolso.jsx";

import AdminRoute from "./routes/AdminRoute";

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminSettings from "./pages/admin/AdminSettings.jsx";
import AdminEvents from "./pages/admin/AdminEvents.jsx";
import AdminComplaints from "./pages/admin/AdminComplaints.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminLogs from "./pages/admin/AdminLogs.jsx";
import ManageCategories from "./pages/admin/ManageCategories.jsx";

import MiPerfil from "./pages/MiPerfil.jsx";

import LibroReclamos from "./pages/LibroReclamos.jsx";
import MisReclamos from "./pages/MisReclamos.jsx";

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
          <Route
            path="/solicitudes-reembolso"
            element={<SolicitudesReembolso />}
          />

          {/*<Route> se comenta para evitar que la pagina dentro de ella esté restringida a una sesión autenticada*/}
          <Route element={<ProtectedRoute />}></Route>
          <Route path="app/*" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="pago" element={<PaymentMethod />} />
        </Route>
        <Route path="seleccionTickets" element={<TicketSelection />} />
        <Route path="pago" element={<PaymentMethod />} />
        <Route path="miCalendario" element={<MyCalendar />} />
        <Route path="misTickets" element={<MisTickets />} />
        <Route path="miPerfil" element={<MiPerfil />} />
        <Route path="reclamos/nuevo" element={<LibroReclamos />} />
        <Route path="misReclamos" element={<MisReclamos />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/complaints" element={<AdminComplaints />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/logs" element={<AdminLogs />} />
          <Route path="/admin/categories" element={<ManageCategories />} />
          {/* Redirección de /admin a /admin/dashboard */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />
        </Route>

        <Route path="app/*" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
