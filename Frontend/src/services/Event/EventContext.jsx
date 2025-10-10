import React, { createContext, useContext, useState, useEffect } from "react";

const EventContext = createContext();

// Hook para usar el contexto fácilmente
export default function useEvent() {
  return useContext(EventContext);
}

export function EventProvider({ children }) {
  const [event, setEvent] = useState(null);

  // Cargar el evento desde localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem("eventoSeleccionado");
    if (stored) setEvent(JSON.parse(stored));
  }, []);

  // Guardar automáticamente en localStorage cuando cambie
  useEffect(() => {
    if (event) {
      localStorage.setItem("eventoSeleccionado", JSON.stringify(event));
    } else {
      localStorage.removeItem("eventoSeleccionado");
    }
  }, [event]);

  return (
    <EventContext.Provider value={{ event, setEvent }}>
      {children}
    </EventContext.Provider>
  );
}
