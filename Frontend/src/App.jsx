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
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";


 {/* esto es para probar el card de eventos xd */}


function App() {


  return (
    <>

      <Routes>
        <Route element={<RootLayout />}>
          {/* público */}
          <Route index element={<HomePublic />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />

          {/* privado */}
          <Route element={<ProtectedRoute />}>
            <Route path="/app" element={<HomePrivate />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>


    </>
  );
}

export default App;
