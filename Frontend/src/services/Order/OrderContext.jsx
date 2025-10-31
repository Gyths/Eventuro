import React, { createContext, useContext, useState, useEffect } from "react";

const OrderContext = createContext();

// Hook para usar el contexto fácilmente
export default function useOrder() {
  return useContext(OrderContext);
}

export function OrderProvider({ children }) {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("orderData");
    if (stored) setOrder(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (order) {
      localStorage.setItem("orderData", JSON.stringify(order));
    } else {
      localStorage.removeItem("orderData");
    }
  }, [order]);

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
