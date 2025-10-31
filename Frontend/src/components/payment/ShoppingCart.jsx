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
    <div className="flex justify-between h-auto flex-col w-auto min-w-[28vw] aspect-[4/5] bg-white rounded-xl shadow-lg px-11 py-7">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Resumen de compra</h2>
        <hr className="my-4 border-gray-300 mx-2 min-w-60" />
        {/*Acá se muestran los tickets a comprar*/}
        <div className="flex flex-col h-auto gap-4">
          {event.shoppingCart != null &&
            Object.entries(event.shoppingCart).map(
              ([zoneName, zone], index) => {
                if (zone.quantity && zone.price) {
                  return (
                    <div
                      key={index}
                      className="grid grid-cols-[1fr_auto_auto] items-center text-black gap-10"
                    >
                      <span className="inline-block">{zoneName}</span>
                      <span>{"x" + zone.quantity}</span>
                      <div className="flex flex-row items-center">
                        {currencies.PEN + " "}
                        <span>{zone.price}</span>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={index} className="flex flex-col gap-2">
                      <span className="inline-block font-semibold">
                        {zoneName}
                      </span>
                      {Object.entries(zone).map(
                        ([zoneInfoName, zoneInfo], zoneInfoIndex) => {
                          if (
                            zoneInfoName != "totalZonePrice" &&
                            zoneInfoName != "discountsApplied"
                          ) {
                            return (
                              <div
                                key={zoneInfoIndex}
                                className="grid grid-cols-[1fr_auto_auto] items-center text-black gap-4"
                              >
                                <span className="truncate">{zoneInfoName}</span>
                                <span className="text-center">
                                  {"x" + zoneInfo.quantity}
                                </span>
                                <div className="flex flex-row items-center justify-end w-20">
                                  {currencies.PEN + " "}
                                  <span>{zoneInfo.price}</span>
                                </div>
                              </div>
                            );
                          } else if (zoneInfoName === "discountsApplied") {
                            return zoneInfo.map((discount, discountIndex) => {
                              return (
                                <div
                                  key={discountIndex}
                                  className="grid grid-cols-[1fr_auto_auto] items-center text-black gap-4"
                                >
                                  <span>{"Dscto " + discount.allocation}</span>
                                  <span className="text-center">
                                    {"x" + discount.discountedQty}
                                  </span>
                                  <span>
                                    {"-" +
                                      currencies.PEN +
                                      discount.discountAmount}
                                  </span>
                                </div>
                              );
                            });
                          }
                        }
                      )}
                    </div>
                  );
                }
              }
            )}
        </div>
      </div>

      {/*Acá se muestra el total a pagar*/}
      <div className="flex flex-col justify-end">
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
