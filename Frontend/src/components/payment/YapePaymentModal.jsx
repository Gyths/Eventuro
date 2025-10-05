import yapeLogo from "../../assets/yape-white-bg.svg";
import payMeLogo from "../../assets/pay-me-logo.svg";
import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";

const inputField =
  "flex rounded-sm p-1.5 bg-gray-100 ring ring-gray-200 hover:ring-gray-300 focus:ring-gray-400 focus:outline-none transform-transition";

export default function YapePaymentModal({ isOpen, onClose, total }) {
  const [code, setCode] = React.useState(["", "", "", "", "", ""]);
  const inputRefs = React.useRef([]);
  const [phone, setPhone] = React.useState("");

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup al desmontar
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleChangePhoneNumber = (e) => {
    // Eliminar todo lo que no sea número
    let value = e.target.value.replace(/\D/g, "");

    // Si está vacío, limpiar el input
    if (value === "" || value === "5") {
      setPhone("");
      return;
    }

    // Si empieza con 51, mantenerlo; si no, añadirlo
    if (!value.startsWith("51")) {
      value = "51" + value;
    }

    // Limitar longitud (2 dígitos del país + 9 del número)
    value = value.slice(0, 11);

    // Formatear: +51 123-456-789
    let formatted = "+";
    if (value.length > 0) formatted += value.slice(0, 2);
    if (value.length > 2) formatted += " " + value.slice(2, 5);
    if (value.length > 5) formatted += "-" + value.slice(5, 8);
    if (value.length > 8) formatted += "-" + value.slice(8, 11);

    setPhone(formatted);
  };
  const handleChangeApprovalCode = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    if (newCode.join("").length === 6) {
      console.log("Código completo:", newCode.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  /*const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(code.join(""));
  };
  if (!isOpen) {
    console.log("Modal closed");
    return null;
  }*/

  return (
    <>
      <div
        className={`p-6 fixed inset-0 flex justify-center items-center transition-colors ${
          isOpen ? "visible bg-black/20" : "invisible"
        }`}
      >
        <div className="flex flex-col rounded-xl bg-white p-4 max-w-96">
          <div className="flex flex-row">
            <div className="flex justify-end flex-1">
              <span
                className="cursor-pointer font-black scale-75"
                onClick={onClose}
              >
                Salir
              </span>
            </div>
          </div>
          <div className="flex flex-col p-4 justify-center items-center gap-2">
            <img src={yapeLogo} alt="yape" className="flex size-28"></img>
            <span className="font-black scale-90 text-center">
              Paga usando el código de aprobación disponible en Yape:
            </span>
          </div>
          <form className="flex flex-col p-0.5 gap-2">
            <div className="flex flex-col flex-1 w-full gap-2">
              <label htmlFor="yape-number">Celular afiliado a Yape</label>
              <input
                id="yape-number"
                placeholder="+51 123-456-789"
                className={`${inputField}`}
                value={phone}
                pattern="^\+51\s9\d{2}-\d{3}-\d{3}$"
                onChange={handleChangePhoneNumber}
                required
              ></input>
            </div>
            <label htmlFor="approval-code" className="text-start">
              Código de aprobación
            </label>
            <div id="approval-code" className="flex gap-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChangeApprovalCode(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center text-lg font-semibold rounded-sm bg-gray-100 ring ring-gray-200 hover:ring-gray-300 focus:ring-gray-400 focus:outline-none transform-transition"
                  required
                />
              ))}
            </div>
            <div className=" py-2 pl-32">
              <img
                src={payMeLogo}
                alt="pay-me"
                className="flex flex-1 w-20 justify-center items-center"
              />
            </div>
            <hr className="mt-1/4 border-gray-800/30 border-1"></hr>
            <div className="flex justify-between text-lg font-black text-gray-900 p-2">
              <span>Pago total</span>
              <span>S/. {total}</span>
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="flex flex-1 py-1 font-semibold rounded-xl justify-center text-center cursor-pointer bg-blue-400 text-white hover:bg-blue-400/80 transition-transform "
              >
                Pagar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
