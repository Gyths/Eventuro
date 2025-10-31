import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth/AuthContext";

import { useModal } from "../context/ModalContext";
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
  const { modal, setModal } = useModal(null);

  const [selectedData, setSelectedData] = React.useState();
  const currencies = { PEN: "S/." };

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
        //response.status != "A" && navigate(homeRoute);
        response.dates = formatted;
        response.image = response.imagePrincipalURLSigned ?? placeholder;
        response.bannerEv = response.imageBannerURLSigned ?? placeholder;

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
            src={event?.bannerEv}
            alt="Fondo del evento"
            className={`w-full h-full object-cover transition-all duration-700 ease-in-out
          ${
            scrolled
              ? "blur-2xl brightness-75 scale-105"
              : "blur-0 brightness-100 scale-100"
          }`}
          />
        </div>

        <div className="flex h-screen"></div>
        {/* Contenido */}
        <div className="flex flex-col z-10 justify-center min-h-screen text-center gap-20">
          <div className="flex px-5 relative flex-col md:flex-row xl:flex-row justify-center gap-10 md:gap-0 xl:gap-0 items-stretch md:px-8">
            {/* Imagen */}
            <div className="flex w-full md:max-w-[30vw] scale-y-110 xl:max-w-[30vw] overflow-hidden rounded-lg">
              <img
                src={event?.image}
                className="w-full h-full object-cover"
                alt="Imagen del evento"
              />
            </div>

            {/* Card de Información y entradas*/}
            <div className="flex flex-col items-start xl:pl-5 xl:py-5 justify-start gap-3 w-[95vw] xl:w-[60vw] rounded-lg md:rounded-none md:rounded-r-lg xl:rounded-none xl:rounded-r-lg bg-white shadow-2xl">
              <div className="flex flex-row justify-start items-center lg gap-2">
                <ArrowButton onClick={() => navigate(homeRoute)}></ArrowButton>
                {/* Título */}
                <div className="inline-flex text-start flex-wrap flex-row">
                  <h1 className="inline-block font-bold text-2xl xl:text-3xl">
                    {event?.title}
                  </h1>
                </div>
              </div>
              {/* Categorías */}
              <div className="flex flex-wrap gap-2 pl-5 xl:pl-15">
                {event?.categories?.map((category, index) => (
                  <div
                    key={index}
                    className="flex rounded-4xl bg-purple-700 text-white items-center justify-center p-1 px-2.5"
                  >
                    {category.category.description}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-4 pl-5 xl:pl-10 xl:pt-2.5">
                {/* Detalles del evento*/}
                <div className="inline-flex flex-row justify-start items-center text-center gap-4">
                  <UserIcon className="flex-shrink-0 size-5 justify-start"></UserIcon>
                  <p className="inline-flex text-start max-w-prose">
                    {"Organizado por " + event?.organizer?.companyName}
                  </p>
                </div>
                <div className="inline-flex flex-row justify-start items-start xl:items-center text-center gap-4">
                  <ChatBubbleBottomCenterTextIcon className="flex-shrink-0 size-5 items-end"></ChatBubbleBottomCenterTextIcon>
                  <p className="inline-block text-start max-w-prose">
                    {event?.description}
                  </p>
                </div>
                <div className="flex flex-1 flex-row justify-start items-center text-center gap-4">
                  <UserGroupIcon className="flex size-5"></UserGroupIcon>
                  <p className="inline-block text-start">
                    {event?.accessPolicyDescription}
                  </p>
                </div>
                <div className="flex flex-1 flex-row justify-start items-center text-center gap-4">
                  <MapPinIcon className="inline-block size-5"></MapPinIcon>
                  <span className="flex text-start">
                    {event?.venue?.address}
                  </span>
                </div>
              </div>
              {/* ZONAS */}
              <div className="flex flex-row pl-10">
                <span className="flex font-semibold text-2xl justify-start items py-1.5">
                  Precios
                </span>
              </div>
              <div className="flex w-4/5 flex-col pl-10">
                <div className="grid grid-cols-2 justify-between text-start py-3 px-5">
                  <span className="flex w-1/2"></span>
                  <div className="flex flex-row w-full justify-between">
                    {event.dates &&
                      event.dates[0].zoneDates[0].allocations &&
                      event.dates[0].zoneDates[0].allocations.map(
                        (allocation) => (
                          <span className="inline-block">
                            {allocation.audienceName}
                          </span>
                        )
                      )}
                  </div>
                </div>
                <div className="grid grid-cols-2 justify-between text-start py-3 border border-gray-400 shadow-2xs rounded-2xl px-5">
                  {event?.dates &&
                    event.dates[0]?.zoneDates.map((zone, index) => (
                      <>
                        <span className="inline-block justify-start w-auto font-semibold">
                          {zone.name}
                        </span>
                        <div className="flex flex-row w-full justify-between">
                          {zone.allocations &&
                            zone.allocations.map((allocation) => (
                              <span className="font-semibold justify-end">
                                {currencies.PEN + " " + allocation.price}
                              </span>
                            ))}
                          {!zone.allocations && (
                            <span className="font-semibold justify-end">
                              {currencies.PEN + " " + zone.basePrice}
                            </span>
                          )}
                        </div>
                      </>
                    ))}
                </div>
              </div>
              {/* Botón de compras */}
              <div className="flex flex-row w-full justify-center xl:justify-end px-5 items-center p-2.5">
                <button
                  onClick={handleBuyButtonClick}
                  className="self-start inline-flex w-full xl:w-auto items-center cursor-pointer justify-center rounded-lg bg-purple-600 text-white px-4 py-1.5 hover:scale-105 hover:bg-yellow-500 transition-transform duration-300"
                >
                  Comprar entradas
                </button>
              </div>
            </div>
          </div>
          {/* Información adicional */}
          <div className="flex relative flex-1 flex-col fill-white bg-white p-6">
            <span className="inline-block text-start font-bold text-4xl p-6">
              Información adicional
            </span>
            <div className="flex flex-row gap-10">
              <div lassName="flex flex-col gap-10">
                {event?.inPerson && (
                  <>
                    <h2 className="font-bold text-2xl w-full text-start">
                      Ubicación en mapa
                    </h2>
                    <div className="flex size-auto border-2 h-[40vh] sm:h-[60vh] md:h-[30vh] lg:h-[40vh] sm:w-[60vw] md:w-[40vw] lg:w-[20vw]">
                      <iframe
                        className="flex relative h-autow-full"
                        src={
                          "https://www.google.com/maps?q=" +
                          encodeURIComponent(event?.venue?.address) +
                          "&output=embed"
                        }
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </>
                )}
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
