// PageTitle.jsx
import React from "react";

export default function Titulo({ children, className = "", ...props }) {
  return (
    <h1
      className={`text-[36px] font-semibold text-[#37144F] ${className}`}
      {...props}
    >
      {children}
    </h1>
  );
}
