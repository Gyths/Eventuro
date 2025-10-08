import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null); // "credit-debit-card" | "yape-plin" | "success" | "fail" | null
  const location = useLocation();

  //useEffect que maneja el scroll cuando se abre un modal
  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "auto";
  }, [modal]);

  //useEffect que cierra el modal activo cuando se cambia de página
  useEffect(() => {
    setModal(null);
  }, [location]);

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
