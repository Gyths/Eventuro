import React from "react";

export default function BotonCTA({ children, onClick, variant = "primary" }) {
  const baseClasses = "font-medium text-sm px-4 py-2 rounded transition-colors border";
  const variantClasses =
    variant === "primary"
      ? "border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white"
      : "border-[#5F0FBE] text-[#5F0FBE] hover:bg-[#5F0FBE] hover:text-white";

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses}`}>
      {children}
    </button>
  );
}

