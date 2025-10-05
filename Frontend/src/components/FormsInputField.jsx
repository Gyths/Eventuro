import React from "react";

export default function FormsInpuField({
  id,
  label = "",
  style = "",
  ...props
}) {
  const [state, setState] = React.useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    let newValue = value;

    if (name === "number") {
      newValue = newValue.replace(/\D/g, "");
      newValue = newValue.slice(0, 16);
      newValue = newValue.replace(/(\d{4})(?=\d)/g, "$1 ");
    }

    if (name === "expiry") {
      newValue = newValue.replace(/\D/g, "");
      newValue = newValue.slice(0, 4);
      if (newValue.length > 2) {
        newValue = newValue.slice(0, 2) + "/" + newValue.slice(2);
      }
    }

    if (name === "cvc") {
      newValue = newValue.replace(/\D/g, "").slice(0, 3);
    }

    setState((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        {...props}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        className={`flex p-1.5 rounded-lg bg-gray-100 border border-gray-300 outline-none focus:ring-2 focus:ring-gray-200 ${style}`}
      ></input>
    </>
  );
}
