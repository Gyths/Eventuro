import React from "react";
import { useAuth } from "../services/auth/AuthContext";
import { EventuroApi } from "../api";
import { useNavigate } from "react-router-dom";
import { select_test } from "../components/payment/tests";
import useEvent from "../services/Event/EventContext";
import useOrder from "../services/Order/OrderContext";
import ArrowButton from "../components/ArrowButton";

export default function TicketSelection() {
  const navigate = useNavigate();
  const homeRoute = "/home";
  const orderEnpoint = "/orders";
  const apiMethod = "POST";
  const paymentPage = "/pago";
  const loginPage = "/login";

  const { isAuthenticated, user } = useAuth();
  const { event } = useEvent();
  console.log(event);
  const { setOrder } = useOrder();

  //Crea una orden de compra
  async function onClick(testNum) {
    !isAuthenticated && navigate(loginPage);

    const orderData = {};
    orderData.buyerUserId = user.userId;
    orderData.currency = "PEN";
    orderData.items = select_test(testNum, event.id);
    console.log(orderData);

    try {
      const response = await EventuroApi({
        endpoint: orderEnpoint,
        method: apiMethod,
        data: orderData,
        saveLocalStorage: true,
        storageName: "orderData",
      });
      setOrder(response);
    } catch (err) {
      console.error("Error al crear la orden:", err);
      throw err;
    }

    navigate(paymentPage);
  }

  const [scrolled, setScrolled] = React.useState(false);

  //Controla cuando el estilo del background debe cambiar
  React.useEffect(() => {
    const handleScroll = () => {
      //El treshold se situa en 1/4 del tamaño de la pantalla del usuario
      const threshold = window.innerHeight * 0.25;
      //Se settea scrolled en base a la distancia escroleada comparada con el treshold
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Imagen de fondo */}
      <div className="fixed inset-0 h-screen w-full overflow-hidden">
        <img
          src={event?.image}
          alt="Fondo del evento"
          className={`w-full h-full object-contain transition-all duration-700 ease-in-out
        ${
          scrolled
            ? "blur-2xl brightness-75 scale-105"
            : "blur-0 brightness-100 scale-100"
        }`}
        />
      </div>

      {/* Contenido */}
      <div className="flex h-screen"></div>
      <div className="flex flex-col z-10 justify-center min-h-screen text-center gap-20">
        <div className="flex relative flex-wrap justify-between items-center gap-4 px-4 py-5 md:px-8">
          {/* Imagen */}
          <div className="flex justify-start p-6 py-20 max-w-1/3">
            <img
              src={event.image}
              className="flex flex-1 size-full bg-none shadow-2xl"
            />
          </div>
          {/* Card de Información y entradas*/}
          <div className="flex flex-1 flex-col justify-end rounded-lg bg-white max-w-3/5 h-auto shadow-2xl p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-row justify-start items-center gap-2">
                <ArrowButton onClick={() => navigate(homeRoute)}></ArrowButton>
                <div className="flex flex-wrap flex-row">
                  <h1 className="flex font-bold text-3xl">{event?.title}</h1>
                  <div id="date-selector"></div>
                </div>
              </div>

              <p className="flex pl-16">{event?.description}</p>
            </div>
            <div className="flex flex-1 h-100">TODO: Selección de tickets</div>
            <div className="flex flex-row class justify-end items-end">
              <button
                onClick={() => onClick(event.id)}
                className="rounded-2xl h-8 w-24 p-2 cursor-pointer flex justify-center items-center text-white bg-purple-600 hover:bg-yellow-500 hover:shadow-lg hover:scale-105 transition-transform duration-200"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
        <div className="flex relative flex-1 flex-col fill-white bg-white p-6">
          <span className="flex flex-1 font-bold text-4xl p-6">
            Información adicional
          </span>
          <div className="flex flex-row px-6">
            <div className="flex flex-col gap-6">
              <h2 className="font-bold text-2xl text-start">
                Ubicación en mapa :D
              </h2>
              <div className="flex size-auto border-2">
                <iframe
                  className="flex relative max-h-96 max-w-96  size-dvh"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    event.location
                  )}&output=embed`}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
