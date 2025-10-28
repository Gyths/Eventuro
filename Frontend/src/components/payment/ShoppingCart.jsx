import React from "react";
import useOrder from "../../services/Order/OrderContext";
import useEvent from "../../services/Event/EventContext";

export default function ShoppingCart({
  termsAccepted,
  selectedOption,
  openModal,
  setShowTermsAlert,
  setSelectedOptionTermsAlert,
}) {
  const tickets = [];

  const { order } = useOrder();
  const { event } = useEvent();
  console.log(event);

  const currencies = { PEN: "S/." };

  const handleSubmit = () => {
    //Validación de inputs necesarios
    var valido = termsAccepted && selectedOption != "nada seleccionado";

    //Se verifica que alertas se deben subir o bajar
    !termsAccepted ? setShowTermsAlert(true) : setShowTermsAlert(false);
    selectedOption === "nada seleccionado"
      ? setSelectedOptionTermsAlert(true)
      : setSelectedOptionTermsAlert(false);

    //El flujo continua de ser posible
    if (valido) {
      openModal(selectedOption);
      console.log("Procesando compra con el método de pago:", selectedOption);
    }
  };

  return (
    <div className="flex flex-col w-auto h-auto bg-white rounded-xl shadow-lg px-11 py-7">
      <h2 className="text-2xl font-bold text-gray-800">Resumen de compra</h2>
      <hr className="my-4 border-gray-300 mx-2 min-w-60" />
      {/*Acá se muestran los tickets a comprar*/}
      <div className="space-y-3"></div>
      <div className="flex flex-col h-70">
        {event.shoppingCart != null &&
          Object.entries(event.shoppingCart).map(([key, item], index) => {
            return (
              <div
                key={index}
                className="flex justify-between font-semibold items-center text-black gap-10"
              >
                <span className="inline-block">{key}</span>
                <span>{"x" + item.quantity}</span>
                <div className="flex flex-row items-center">
                  {currencies.PEN + " "}
                  <span>{item.price}</span>
                </div>
              </div>
            );
          })}
      </div>
      {/*Acá se muestra el total a pagar*/}
      <div className="flex flex-col">
        <hr className="my-4 border-gray-300 mx-2" />
        <div className="flex justify-between text-lg font-bold text-gray-900">
          <span>Pago</span>
          <span>S/. {order.totalAmount}</span>
        </div>
        {/*Botón de compra duh*/}
        <button
          onClick={handleSubmit}
          className="mt-6 w-full font-bold py-3 rounded-lg cursor-pointer bg-purple-700 text-white  hover:bg-yellow-500 transition-transfor-all duration-300 ease-in-out hover:scale-101"
        >
          Comprar
        </button>
      </div>
    </div>
  );
}
