import React, { useState } from "react";

{
  /* Input que solo acepta números y se le puede asignar un máximo de dígitos*/
}
export default function LimitableNumbericInput({
  id,
  label = "",
  name = "",
  placeholder = "",
  maxLength = "",
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  onChange = null,
  onFocus = null,
  isRequired = false,
}) {
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    const cleanedValue = value.replace(/\D/g, "");

    const formattedInput = cleanedValue.slice(0, maxLength);

    setInput(formattedInput);
  };

  const handleBlur = () => {
    if (input && (parseInt(input) < min || parseInt(input) > max)) {
      setInput("");
      alert("Por favor ingrese un valor válido para " + label);
    }
  };

  return (
    <div>
      <label htmlFor={id} className="flex flex-col px-10 gap-2">
        {label}
        <input
          type="text"
          id={id}
          name={name}
          value={input}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          className="flex w-full bg-gray-100 rounded-lg px-4 py-3 border border-gray-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
      </label>
    </div>
  );
}
