import { useState } from "react";
import CrearTicketTajeta from "./components/CrearTicketTajeta";
import UbicacionEvento from "./components/UbicacionEvento";
import BotonCTA from "./components/BotonCTA";
import BotonEliminar from "./components/BotonEliminar";
import LoginCard from "./components/LoginCard";
import RegistroCard from "./components/RegistroCard";
import EventCard from "./components/EventCard";
import TopBar from "./components/topbar/TopBar";
import BannerCarousel from "./components/BannerCarousel";

import { Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import HomePublic from "./pages/HomePublic";
import HomePrivate from "./pages/HomePrivate";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Payment from "./pages/Payment";
import EventInf from "./pages/EventInf";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home.jsx";
import { Navigate } from "react-router-dom";
import { useAuth } from "./services/auth/AuthContext.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />

          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Register />} />
          <Route path="detalle-evento" element={<EventInf />} />
          {/*<Route element={<ProtectedRoute />}>*/}
          <Route path="pago" element={<Payment />} />
          {/*</Route>*/}

          <Route path="app/*" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
