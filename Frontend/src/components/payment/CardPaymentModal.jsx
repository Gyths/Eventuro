import { Dialog } from "@radix-ui/themes";
import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import logo from "../../assets/logo.svg";
import FormsInput from "../Input";
import LimitableNumbericInput from "./LimitableNumbericInput";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

export default function CardPaymentModal({ isOpen, onClose, children }) {
  if (!isOpen) {
    console.log("Modal closed");
    return null;
  }

  const [state, setState] = React.useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <>
      <div
        className={`fixed inset-0 flex justify-center items-center transition-colors ${
          isOpen ? "visible bg-black/20" : "invisible"
        }`}
      >
        <div className="flex flex-col bg-white w-1/2 h-max rounded-2xl">
          <Header onClose={onClose} />
          <hr className="w-11/12 border-t-1 border-purple-900 mx-auto my-4"></hr>
          <div className="flex flex-col gap-2">
            {/*<Body />*/}
            <Cards
              number={state.number}
              expiry={state.expiry}
              cvc={state.cvc}
              name={state.name}
              focused={state.focus}
            />
            <form className="flex flex-col">
              <FormsInput
                type="number"
                name="number"
                labelText="Número de tarjeta"
                placeholder="Card Number"
                value={state.number}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              ></FormsInput>
              <LimitableNumbericInput
                type="number"
                name="expiry"
                label="Fecha de vencimiento"
                placeholder="MM/YY"
                value={state.expiry}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              ></LimitableNumbericInput>
              <LimitableNumbericInput
                type="number"
                name="cvc"
                placeholder="CVV"
                label="Código CVV"
                value={state.cvc}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              ></LimitableNumbericInput>
              <input />
            </form>
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
        </div>
      </div>
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

const Body = () => {
  return (
    <>
      <FormsInput
        id="card-num"
        type="number"
        labelText={"Número de tarjeta"}
        placeholder={"#### #### #### ####"}
        maxLength={12}
        isRequired={true}
      />
      <FormsInput
        id="holder-name"
        type="text"
        labelText="Nombre Completo del titular"
        placeholder="Como aparece en la tarjeta"
        isRequired={true}
      />

      <div className="flex flex-row">
        <div className="flex flex-row w-1/2">
          <LimitableNumbericInput
            id="expiration-month"
            label="Mes"
            placeholder="MM"
            maxLength={2}
            min={"1"}
            max={"12"}
          ></LimitableNumbericInput>
          <LimitableNumbericInput
            id="expiration-year"
            label="Año"
            placeholder="YY"
            maxLength={2}
            min={"1"}
            max={"99"}
          ></LimitableNumbericInput>
        </div>
        <LimitableNumbericInput
          id="cvv-code"
          label="Código (CVV)"
          placeholder="###"
          maxLength={3}
          min={"100"}
          max={"999"}
        ></LimitableNumbericInput>
      </div>
      <FormsInput
        id="payment-email"
        type="email"
        labelText={"Dirección de correo electrónico"}
        placeholder={"ejemplo@correo.com"}
        isRequired={true}
      />

      <FormsInput
        id="cuotes-number"
        type="dropdown"
        labelText={"Número de cuotas"}
        placeholder={"1"}
        isRequired={true}
      />
    </>
  );
};
