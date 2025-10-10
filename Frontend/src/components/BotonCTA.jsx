import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function BotonCTA({
  children,
  onClick,
  type = "button",
  variant = "primary",   // primary | secondary | pink | ghost
  icon = null,           // "left" | "right" | null
  disabled = false,
  fullWidth = false,
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold text-sm md:text-base " +
    "px-5 py-2.5 rounded-2xl border transition-all duration-150 " +
    "shadow-sm hover:shadow active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-1";

  const variants = {
    primary:  "border-amber-500 text-white bg-amber-500 hover:bg-amber-600 focus:ring-amber-300",
    secondary:"border-[#5F0FBE] text-[#5F0FBE] hover:bg-[#5F0FBE] hover:text-white focus:ring-purple-300",
    pink:     "border-[#DB1C79] text-white bg-[#DB1C79] hover:bg-[#c9186c] focus:ring-rose-300",
    ghost:    "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-300",
  };

  const classes = [
    base,
    variants[variant] ?? variants.primary,
    disabled ? "opacity-60 pointer-events-none" : "",
    fullWidth ? "w-full" : "",
    className,
  ].join(" ");

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {icon === "left" && <ArrowLeftIcon className="h-5 w-5" />}
      {children}
      {icon === "right" && <ArrowRightIcon className="h-5 w-5" />}
    </button>
  );
}

