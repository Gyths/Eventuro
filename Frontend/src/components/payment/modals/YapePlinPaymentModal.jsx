import yapePlinLogo from "../../../assets/yape-whitebg-plin.svg";
import payMeLogo from "../../../assets/pay-me.svg";
import React from "react";

const inputField =
  "flex rounded-sm p-1.5 bg-gray-100 ring ring-gray-200 hover:ring-gray-300 focus:ring-gray-400 focus:outline-none transform-transition";

export default function YapePlinPaymentModal({ onClose, total, onSuccess }) {
  const [code, setCode] = React.useState(["", "", "", "", "", ""]);
  const inputRefs = React.useRef([]);
  const [phone, setPhone] = React.useState("");

  //Formateador para el input de número de teléfono
  const handleChangePhoneNumber = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value === "" || value === "5") {
      setPhone("");
      return;
    }

    if (!value.startsWith("51")) {
      value = "51" + value;
    }

    value = value.slice(0, 11);

    let formatted = "+";
    if (value.length > 0) formatted += value.slice(0, 2);
    if (value.length > 2) formatted += " " + value.slice(2, 5);
    if (value.length > 5) formatted += "-" + value.slice(5, 8);
    if (value.length > 8) formatted += "-" + value.slice(8, 11);

    setPhone(formatted);
  };

  //Formateador para los inputs del código de aprobación
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

  //Acciones a realizar cuando se suba el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess();
    onClose();
  };

  return (
    <>
      <div
        className={
          "fixed inset-0 flex justify-center items-center transition-colors bg-black/20"
        }
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
          <div className="flex flex-col justify-center items-center gap-2">
            <img src={yapePlinLogo} alt="yape-plin" className="flex p-10"></img>
            <span className="font-black scale-90 text-center">
              Paga usando el código de aprobación disponible en Yape o Plin:
            </span>
          </div>
          <form className="flex flex-col p-0.5 gap-2">
            <div className="flex flex-col flex-1 w-full gap-2">
              <label htmlFor="yape-plin-number">
                Celular afiliado a Yape o Plin
              </label>
              <input
                id="yape-plin-number"
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
                onClick={handleSubmit}
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
