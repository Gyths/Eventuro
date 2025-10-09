import React from "react";

export default function ShoppingCart({
  termsAccepted,
  selectedOption,
  openModal,
  setTotal,
}) {
  const tickets = [
    { tipo: "Entrada General", precio: 50 },
    { tipo: "VIP", precio: 120 },
    { tipo: "Estudiante", precio: 30 },
  ];

  const total = tickets.reduce((acc, t) => acc + t.precio, 0);

  React.useEffect(() => {
    setTotal(total);
  }, [total, setTotal]);

  const handleSubmit = () => {
    var valido = true;
    if (!termsAccepted) {
      valido = false;
      alert(
        "Debes aceptar los términos y condiciones para continuar con la compra."
      );
    }
    if (selectedOption === "nada seleccionado") {
      valido = false;
      alert(
        "Debes seleccionar un método de pago para continuar con la compra."
      );
    }
    if (valido) {
      openModal(selectedOption);
      console.log("Procesando compra con el método de pago:", selectedOption);
    }
  };

  return (
    <div className="flex flex-col w-auto h-full bg-white rounded-xl shadow-lg px-11 py-7">
      <h2 className="text-2xl font-bold text-gray-800">Compras</h2>
      <hr className="my-4 border-gray-300 mx-2" />
      <div className="space-y-3">
        {tickets.map((ticket, index) => (
          <div
            key={index}
            className="flex justify-between text-gray-700 gap-52"
          >
            <span>{ticket.tipo}</span>
            <span className="font-semibold">S/. {ticket.precio}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col h-70"></div>
      <div className="flex flex-col">
        <hr className="my-4 border-gray-300 mx-2" />
        <div className="flex justify-between text-lg font-bold text-gray-900">
          <span>Pago</span>
          <span>S/. {total}</span>
        </div>
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
