import React from "react";

export default function StepBadge({ number = 1 }) {
  return (
    <div
      className="grid h-12 w-12 place-items-center rounded-2xl text-white shadow"
      style={{ backgroundColor: "#118069ff" }} // <-- nuevo color
      aria-label={`Paso ${number}`}
      title={`Paso ${number}`}
    >
      <span className="text-2xl font-black">{number}</span>
    </div>
  );
}