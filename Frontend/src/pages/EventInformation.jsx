import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth/AuthContext";
import { select_test } from "../components/payment/tests";
import useEvent from "../services/Event/EventContext";
import useOrder from "../services/Order/OrderContext";
import { EventuroApi } from "../api";

import ArrowButton from "../components/ArrowButton";
import { AnimatePresence, motion } from "framer-motion";

import SelectDateModal from "../components/selection/SelectDateModal";
import SelectTicketModal from "../components/selection/SelectTicketModal";
import placeholder from "../assets/DefaultEvent.webp";
import SeatNumberSelectionModal from "../components/selection/SeatNumberSelectionModal";

import {
  ChatBubbleBottomCenterTextIcon,
  MapPinIcon,
  UserIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

export default function TicketSelection() {
  const homeRoute = "/home";
  const availabilityEndpoint = "/event/availability";
  const apiMethod = "POST";
  const loginPage = "/login";
  const navigate = useNavigate();
  //Manejo de objetos de negocio
  const { isAuthenticated, user } = useAuth();
  const { event, setEvent } = useEvent();
  const [dates, setDates] = React.useState(null);
  //State para el manejo del scroll
  const [scrolled, setScrolled] = React.useState(false);
  //State para manejar modales
  const [modal, setModal] = React.useState("");

  const [selectedData, setSelectedData] = React.useState();

  React.useEffect(() => {
    //Llamada a la api del back para consultar disponibilidad de un evento
    const fetchAvailability = async () => {
      try {
        console.log(event.eventId);
        const response = await EventuroApi({
          endpoint: availabilityEndpoint,
          method: apiMethod,
          data: { eventId: event.eventId },
        });

        const formatted = response.dates.map((dateInfo) => ({
          ...dateInfo,
          formattedStartDate: new Date(dateInfo.startAt).toLocaleDateString(
            "es-PE",
            {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }
          ),
          formattedStartHour: new Date(dateInfo.startAt).toLocaleTimeString(
            "es-PE",
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),
          formattedEndDate: new Date(dateInfo.endAt).toLocaleDateString(
            "es-PE",
            {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }
          ),
          formattedEndHour: new Date(dateInfo.endAt).toLocaleTimeString(
            "es-PE",
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),
        }));
        response.status != "A" && navigate(homeRoute);
        response.dates = formatted;
        response.image = response.image ?? placeholder;
        setEvent(response);
        console.log(response);
      } catch (err) {
        console.error("Error al consultar la disponibilidad:", err);
        throw err;
      }
    };

    fetchAvailability();
  }, []);

  React.useEffect(() => {
    //Lógica para manejar la apariencia del bg
    const handleScroll = () => {
      //El threshold se situa en 1/4 del tamaño de la pantalla del usuario
      const threshold = window.innerHeight * 0.25;
      //Se settea scrolled en base a la distancia escrolleada comparada con el threshold
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBuyButtonClick = () => {
    if (!isAuthenticated) {
      navigate(loginPage);
      return;
    }
    setModal("dates");
  };

  const handleContinue = (selectedData) => {
    if (!isAuthenticated) {
      navigate(loginPage);
      return;
    }
    setSelectedData(selectedData);
    setModal("tickets");
  };

  return (
    <>
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
          <div className="flex relative flex-wrap justify-center gap-10 xl:gap-0 items-center px-4 py-5 md:px-8">
            {/* Imagen */}
            <div className="flex w-96 aspect-[3/5] overflow-hidden rounded-xl">
              <img src={event?.image} className="w-full h-full object-cover" />
            </div>
            {/* Card de Información y entradas*/}
            <div className="flex flex-col justify-end rounded-lg xl:rounded-none xl:rounded-r-lg bg-white h-auto shadow-2xl pt-6 pb-12 pr-24 pl-10">
              <div className="flex flex-row justify-start items-center gap-2">
                <ArrowButton onClick={() => navigate(homeRoute)}></ArrowButton>
                {/* Título */}
                <div className="flex flex-wrap flex-row">
                  <h1 className="flex font-bold text-3xl">{event?.title}</h1>
                </div>
              </div>
              <div className="flex flex-row gap-2 pl-20">
                {/* Categorías */}
                {event?.categories?.map((category, index) => (
                  <div
                    key={index}
                    className="flex rounded-4xl bg-purple-700 text-white items-center justify-center p-1 px-2.5"
                  >
                    {category.category.description}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-4 pl-16 pt-10 ">
                {/* Detalles del evento*/}
                <div className="inline-flex flex-row justify-start items-center text-center gap-4">
                  <UserIcon className="flex-shrink-0 size-5 justify-start"></UserIcon>
                  <p className="inline-flex text-start max-w-prose">
                    {"Organizado por " + event?.organizer?.companyName}
                  </p>
                </div>
                <div className="inline-flex flex-row justify-start items-center text-center gap-4">
                  <ChatBubbleBottomCenterTextIcon className="flex-shrink-0 size-5 justify-start"></ChatBubbleBottomCenterTextIcon>
                  <p className="inline-flex text-start max-w-prose">
                    {event?.description}
                  </p>
                </div>
                <div className="flex flex-1 flex-row justify-start items-center text-center gap-4">
                  <UserGroupIcon className="flex size-5 justify-center"></UserGroupIcon>
                  <p className="flex text-center">
                    {event?.accessPolicyDescription}
                  </p>
                </div>
                <div className="flex flex-1 flex-row justify-start items-center text-center gap-4">
                  <MapPinIcon className="flex size-5 justify-center"></MapPinIcon>
                  <span className="flex text-center">
                    {event?.venue?.address}
                  </span>
                </div>
                <div className="flex flex-row justify-end">
                  <button
                    onClick={handleBuyButtonClick}
                    className="self-start inline-flex w-auto items-center cursor-pointer justify-center rounded-lg bg-purple-600 text-white px-6 py-1 hover:scale-101 hover:bg-yellow-500 transition-transform duration-300"
                  >
                    Comprar entradas
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Información adicional */}
          <div className="flex relative flex-1 flex-col fill-white bg-white p-6">
            <span className="flex font-bold text-4xl p-6">
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
                    src={
                      "https://www.google.com/maps?q=" +
                      event?.venue?.address +
                      "&output=embed"
                    }
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
      {modal === "dates" && (
        <AnimatePresence>
          <SelectDateModal
            dates={event.dates}
            onClose={() => setModal(null)}
            onContinue={handleContinue}
          />
        </AnimatePresence>
      )}

      {(modal === "tickets" || modal === "seats") && (
        <AnimatePresence>
          <SelectTicketModal
            modal={modal}
            setModal={setModal}
            selectedData={selectedData}
            onReturn={() => setModal("dates")}
          />
        </AnimatePresence>
      )}

      {/* Comentado por si se usa posteriormente (no creo pero porsiaca)

       Barra inferior 
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md p-4 flex items-center justify-between z-50">
        <div className="text-lg font-semibold text-gray-800">
          Subtotal:{" "}
          <span className="text-purple-700">{subtotal ? subtotal : "0"}</span>
        </div>

        <div className="flex flex-row class justify-end items-end">
          <button
            onClick={() => onClick(event.id)}
            className="rounded-2xl h-8 w-24 p-2 cursor-pointer flex justify-center items-center text-white bg-purple-600 hover:bg-yellow-500 hover:shadow-lg hover:scale-105 transition-transform duration-200"
          >
            Continuar
          </button>
        </div>
      </div>*/}
    </>
  );
}
