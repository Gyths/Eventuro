import { useState } from "react";
import CrearTicketTajeta from "./components/CrearTicketTajeta";
import UbicacionEvento from "./components/UbicacionEvento";
import BotonCTA from "./components/BotonCTA";
import BotonEliminar from "./components/BotonEliminar";
import LoginCard from "./components/LoginCard";
import RegistroCard from "./components/RegistroCard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <RegistroCard/>
    </div>
  );
}

export default App;
