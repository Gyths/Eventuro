import React from "react";
import BaseModal from "../../BaseModal";

import useOrder from "../../../services/Order/OrderContext";
import useEvent from "../../../services/Event/EventContext";
import { useAuth } from "../../../services/auth/AuthContext";

import logo from "../../../assets/logo.svg";
import { XMarkIcon } from "@heroicons/react/24/solid";

import Cards from "react-credit-cards-3";
import "react-credit-cards-3/dist/es/styles-compiled.css";

import { EventuroApi } from "../../../api";

export default function CardPaymentModal({ onClose, onSuccess, onFail }) {
  const inputField =
    "flex p-1.5 bg-gray-50 border-b border-black outline-none focus:scale-101 transition-transform";

  const { order } = useOrder();
  const { event } = useEvent();
  const { user } = useAuth();

  const ticketEnpoint = "/tickets";
  const apiMethod = "POST";
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

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    !form.reportValidity();
    if (event.shoppingCart) {
      const items = Object.entries(event.shoppingCart).map(([zone]) => {
        if (zone.discountsApplied) {
          zone.discountsApplied.map((discount) => {
            return discount.discountid;
          });
        }
      });
    }
    console.log(items);

    const ticketData = {
      orderId: order.orderId,
      buyerUserId: user.userId,
      items: items,
    };
    console.log(ticketData);

    try {
      const response = await EventuroApi({
        endpoint: ticketEnpoint,
        method: apiMethod,
        data: ticketData,
        saveLocalStorage: true,
        storageName: "ticketData",
      });
    } catch (err) {
      onFail();
      console.error("Error al crear al realizar la compra:", err);
      throw err;
    }

    onSuccess();
  }

  return (
    <>
      <BaseModal>
        <div className="flex flex-col bg-white w-auto h-max rounded-2xl ">
          <Header onClose={onClose} />
          <hr className="w-11/12 border-t-1 border-purple-900 mx-auto my-4"></hr>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 p-6 justify-center items-center"
          >
            <div className="flex flex-1 items-center justify-center w-1/3">
              <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                focused={state.focus}
              />
            </div>
            <div className="flex flex-col w-full gap-1.5 pt-4">
              <label htmlFor="card-number">Número de tarjeta</label>
              <input
                id="card-number"
                name="number"
                placeholder="Card Number"
                value={state.number}
                pattern="^(\d{4} ){3}\d{4}$"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className={`${inputField}`}
              ></input>
              <div className="flex flex-row w-full gap-1.5">
                <div className="flex flex-col w-full gap-1.5">
                  <label htmlFor="expire-date">Expiración</label>
                  <input
                    id="expire-date"
                    name="expiry"
                    placeholder="MM/YY"
                    value={state.expiry}
                    pattern="^(0[1-9]|1[0-2])\/\d{2}$"
                    required
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    className={`${inputField}`}
                  ></input>
                </div>
                <div className="flex flex-col w-full gap-1.5">
                  <label htmlFor="cvc-code">Código de seguridad</label>
                  <input
                    id="cvc-code"
                    name="cvc"
                    placeholder="CVV"
                    value={state.cvc}
                    pattern="^\d{3}$"
                    required
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    className={`${inputField}`}
                  ></input>
                </div>
              </div>
              <label htmlFor="holder-name">Nombre del Titular</label>
              <input
                id="holder-name"
                name="name"
                placeholder="Como aparece en la tarjeta"
                value={state.name}
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className={`${inputField}`}
              ></input>
            </div>
            <div className="flex flex-row p-2 pt-4 gap-8">
              <div className="flex flex-1 w-1/2 items-center justify-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex w-50 h-12 items-center justify-center cursor-pointer rounded-2xl border border-red-400/80 text-red-400/80 hover:scale-101 transition-transform duration-300"
                >
                  Cancelar
                </button>
              </div>
              <div className="flex flex-1 w-1/2 items-center justify-center">
                <button
                  type="submit"
                  className="flex w-50 h-12 items-center justify-center cursor-pointer rounded-2xl font-bold bg-purple-600 text-white hover:bg-yellow-500 transition-transfor-all duration-500 ease-in-out hover:scale-102"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </form>
        </div>
      </BaseModal>
    </>
  );
}

const Header = ({ onClose }) => {
  return (
    <div className="flex flex-row">
      <div className="flex items-center pl-6 pt-4">
        <img className="w-30 h-10 rounded-2xl" src={logo} alt="Logo"></img>
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
