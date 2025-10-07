import React from "react";

export default function Titulo({ children, className = "", ...props }) {
  return (
    <h1
      className={`text-[36px] font-bold text-[#37144F] ${className}`}
      {...props}
    >
      {children}
    </h1>
  );
}
