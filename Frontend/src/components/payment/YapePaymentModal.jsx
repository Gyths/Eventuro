import React from "react";
import yapeLogo from "../../assets/yape-white-bg.svg";
import FormsInput from "../Input.jsx";
import { Form } from "react-router-dom";

export default function YapePaymentModal(isOpen, onClose, children) {
  return (
    <>
      {" "}
      <div
        className={`fixed inset-0 flex justify-center items-center transition-colors ${
          isOpen ? "visible bg-black/20" : "invisible"
        }`}
      >
        <div className="flex flex-col h-3/4 w-1/2 rounded-2x1 bg-white">
          <div className="flex p-5">
            <img src="yapeLogo" alt="yape" className="flex size-20"></img>
          </div>
          <div className="flex flex-col h-max w-max">
            <FormsInput
              id={"yape-num-telef"}
              itemType="tel"
              labelText="Número de teléfono"
              placeholder="+51 000-000-000"
              maxLength="9"
              isRequired={true}
            ></FormsInput>
          </div>
        </div>
      </div>
    </>
  );
}
