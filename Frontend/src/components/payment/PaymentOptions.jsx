import React from "react";

export default function PaymentOption({
  id,
  title,
  image,
  handleOptionChange,
}) {
  const [used, setUsed] = React.useState(false);
  const handleChange = () => {
    setUsed(!true);
    handleOptionChange(id);
  };
  return (
    <label
      htmlFor={id}
      className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 hover:scale-101 transition-transform cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <input
          type="radio"
          id={id}
          name="payment-method"
          className="h-5 w-5 accent-purple-600 cursor-pointer"
          onChange={handleChange}
        />
        <span className="font-medium">{title}</span>
      </div>
      <div className="h-10 w-10">
        <img src={image} alt={title}></img>
      </div>
    </label>
  );
}
