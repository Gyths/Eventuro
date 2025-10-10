import React from "react";
import { PAYMENT_OPTION_DESCRIPTIONS } from "./texts";
import { motion, AnimatePresence } from "framer-motion";

export default function PaymentOption({
  id,
  image,
  selectedOption,
  handleOptionChange,
}) {
  const isSelected = selectedOption === id;

  const paymentOptionInfo = PAYMENT_OPTION_DESCRIPTIONS[id];
  const title = paymentOptionInfo.title;
  const description = paymentOptionInfo.description;

  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={id}
        className={`flex justify-between items-center bg-white shadow-md p-4 ${
          isSelected
            ? "border-b-2 border-purple-700 rounded-t-lg"
            : "hover:scale-101 transition-transform cursor-pointer rounded-lg"
        }`}
      >
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id={id}
            name="payment-method"
            className="h-5 w-5 accent-purple-600 cursor-pointer"
            onChange={() => handleOptionChange(id)}
          />
          <span className="font-medium">{title}</span>
        </div>
        <div className="flex h-10 w-10">
          <img
            src={image}
            alt={title}
            className="flex justify-center items-center"
          ></img>
        </div>
      </label>
      <AnimatePresence mode="wait">
        {isSelected && (
          <motion.div
            key="description"
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden p-4 rounded-b-lg shadow-md bg-gray-50 border-l-4 border-purple-600 text-sm text-gray-700"
          >
            <h3 className="font-bold">{title}</h3>
            <p className="my-2">{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
