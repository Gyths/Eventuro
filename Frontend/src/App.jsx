import { useState } from "react";
import CrearTicketTajeta from "./components/CrearTicketTajeta";
import UbicacionEvento from "./components/UbicacionEvento";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="w-full flex items-center justify-center p-2">
        <UbicacionEvento />
      </div>
      <div className="w-full flex items-start justify-center p-2">
        <CrearTicketTajeta />
      </div>
    </>
  );
}

export default App;
