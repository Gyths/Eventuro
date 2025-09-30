import React from "react";

export default function BotonCTA({ children, onClick, className = "", ...props }) {
  return (
    <button
      onClick={onClick}
      className={`
        border border-amber-500
        text-amber-500
        bg-transparent
        font-medium
        text-sm
        px-4 py-2
        rounded
        hover:bg-amber-50
        transition-colors
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
