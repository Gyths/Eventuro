import { Dialog } from "@radix-ui/themes";
import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import logo from "../../assets/logo.svg";

export default function CardPaymentModal({ isOpen, onClose, children }) {
  if (!isOpen) {
    console.log("Modal closed");
    return null;
  }

  return (
    <>
      <div
        className={`fixed inset-0 flex justify-center items-center transition-colors ${
          isOpen ? "visible bg-black/20" : "invisible"
        }`}
      >
        <div className="flex flex-col bg-white w-2xl h-max rounded-2xl">
          <Header onClose={onClose} />
          <hr className="w-11/12 border-t-1 border-purple-900 mx-auto my-4"></hr>
          <form className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <Body />
            </div>
            <hr className="w-11/12 border-t-1 border-purple-900 mx-auto my-4"></hr>
            <div className="flex flex-row pb-4">
              <div className="flex flex-1 w-1/2 items-center justify-center">
                <button
                  onClick={onClose}
                  className="flex w-50 h-12 border border-yellow-500/80 text-yellow-500/80 rounded-2xl items-center justify-center cursor-pointer hover:scale-103 transition-transform duration-300"
                >
                  Cancelar
                </button>
              </div>
              <div className="flex flex-1 w-1/2 items-center justify-center">
                <button
                  type="submit"
                  className="flex w-50 h-12 border bg-purple-600 text-white rounded-2xl items-center justify-center cursor-pointer hover:scale-103 transition-transform duration-300"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

const Header = ({ onClose }) => {
  return (
    <div className="flex flex-row">
      <div className="flex items-center pl-6 pt-4">
        <img className="w-30 h-10 rounded-2xl" src={logo} alt={"Logo"}></img>
      </div>

      <div className="flex justify-end flex-1 pt-6 pr-8">
        <XMarkIcon
          className="flex size-6 cursor-pointer fill-gray-500 hover:fill-gray-700 hover:scale-105 transition-transform duration-300"
          onClick={onClose}
        ></XMarkIcon>
      </div>
    </div>
  );
};

const Body = () => {
  return (
    <>
      <label htmlFor="card-num" className="flex flex-col px-10 gap-2">
        Número de tarjeta
        <input
          itemType="card-num"
          id="card-num"
          className="flex w-full bg-gray-100 rounded-lg px-4 py-3 border border-gray-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="#### #### #### ####"
          required
        ></input>
      </label>
      <label htmlFor="holder-name" className="flex flex-col px-10 gap-2">
        Nombre del titular
        <input
          itemType="text"
          id="holder-name"
          className="flex w-full bg-gray-100 rounded-lg px-4 py-3 border border-gray-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Como aparece en la tarjeta"
          required
        ></input>
      </label>
      <div className="flex flex-row">
        <div className="flex flex-row w-1/2">
          <label htmlFor="expire-month" className="flex flex-col px-10 gap-2">
            Mes
            <input
              itemType="month"
              id="expire-month"
              className="flex w-full bg-gray-100 rounded-lg px-4 py-3 border border-gray-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="MM"
              required
            ></input>
          </label>
          <label htmlFor="expire-year" className="flex flex-col px-10 gap-2">
            Año
            <input
              itemType="year"
              id="expire-year"
              className="flex w-full bg-gray-100 rounded-lg px-4 py-3 border border-gray-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="AA"
              required
            ></input>
          </label>
        </div>

        <label htmlFor="cvv-code" className="flex flex-col px-10 gap-2">
          Código (CVV)
          <input
            itemType="text"
            id="cvv-code"
            className="flex w-full bg-gray-100 rounded-lg px-4 py-3 border border-gray-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
            placeholder="###"
            required
          ></input>
        </label>
      </div>
      <label htmlFor="payment-email" className="flex flex-col px-10 gap-2">
        Corre electrónico
        <input
          itemType="email"
          id="payment-email"
          className="flex w-full bg-gray-100 rounded-lg px-4 py-3 border border-gray-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="ejemplo@correo.com"
          required
        ></input>
      </label>
      <label htmlFor="cuotes-number" className="flex flex-col px-10 gap-2">
        Número de cuotas
        <input
          itemType="email"
          id="cuotes-number"
          className="flex w-full bg-gray-100 rounded-lg px-4 py-3 border border-gray-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="1"
          required
        ></input>
      </label>
    </>
  );
};
