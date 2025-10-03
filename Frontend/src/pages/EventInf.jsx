import React from "react";
import { useNavigate } from "react-router-dom";

function EventInf() {
  const navigate = useNavigate();
  return (
    <button
      className="border-2 rounded-2xl h-7 w-15 hover:shadow-lg"
      onClick={() => navigate("/pago")}
    >
      Pagar
    </button>
  );
}

export default EventInf;
