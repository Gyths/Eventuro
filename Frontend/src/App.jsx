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
 {/* esto es para probar el card de eventos xd */}
const evento = {
  image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800",
  title: "Evento",
  location: "Teatro Aurora – Lima",
  startDate: "2025-07-15",
  endDate: "2025-07-17",
  hour: "18:00",
};


const banners = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836", // comida / festival
  "https://images.unsplash.com/photo-1518976024611-28bf4a6d2a47", // concierto / luces
  "https://images.unsplash.com/photo-1472653431158-6364773b2a56", // fuegos artificiales
];


function App() {


  return (
    <>
      <TopBar
        isLoggedIn
        onSearch={(q) => console.log(q)}
        onFiltersChange={(f) => console.log(f)}
        onProfile={() => console.log("config")}
        onMyTickets={() => console.log("tickets")}
        onClaims={() => console.log("reclamos")}
        onLogout={() => console.log("logout")}
      />
       <main className="pt-0">
        <BannerCarousel images={banners} interval={6000} />
      </main>


    </>
  );
}

export default App;
