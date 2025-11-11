import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth/AuthContext";

import { useModal } from "../context/ModalContext";
import useEvent from "../services/Event/EventContext";
import { EventuroApi } from "../api";

import ArrowButton from "../components/ArrowButton";
import { AnimatePresence, motion } from "framer-motion";

import SelectDateModal from "../components/selection/SelectDateModal";
import SelectTicketModal from "../components/selection/SelectTicketModal";
import placeholder from "../assets/DefaultEvent.webp";

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
  const [bluredBackgrund, setBluredBackgrund] = React.useState(false);
  //State para manejar modales
  const { modal, setModal } = useModal(null);

  const [showContent, setShowContent] = React.useState(false);
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
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = window.innerHeight;

      // Fondo: se activa al 25% del viewport
      setBluredBackgrund(scrollY > height * 0.2);

      // Contenido animado: aparece después del 50%
      if (scrollY > height * 0.1 && !showContent) {
        setShowContent(true);
      } else if (scrollY <= height * 0.2 && showContent) {
        setShowContent(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showContent]);

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
            bluredBackgrund
              ? "blur-2xl brightness-75 scale-105"
              : "blur-0 brightness-100 scale-100"
          }`}
          />
        </div>
        <div className="h-[50vh]"></div>
        {/* Contenido */}
        <motion.div
          className="flex flex-col z-10 justify-center min-h-screen text-center gap-20"
          initial={{ opacity: 0, y: 100 }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex px-5 relative flex-wrap xl:flex-row justify-center gap-10 md:gap-20 xl:gap-0 items-stretch">
            {/* Imagen */}
            <div className="flex w-full scale-y-110 xl:max-w-[30vw] rounded-lg">
              <img
                src={event?.image}
                className="w-full h-full object-cover rounded-lg"
                alt="Imagen del evento"
              />
            </div>

            {/* Card de Información y entradas*/}
            <div className="flex w-full lg:auto xl:w-1/2 justify-center items-center ">
              <div className="flex flex-col items-start xl:pl-5 xl:py-5 justify-start gap-3 w-[95vw] xl:w-[60vw] rounded-lg md:rounded-lg xl:rounded-none xl:rounded-r-lg bg-white">
                <div className="flex flex-row justify-start items-center lg gap-2">
                  <ArrowButton
                    onClick={() => navigate(homeRoute)}
                  ></ArrowButton>
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
                      className="flex rounded-4xl bg-purple-700 text-white items-center justify-center p-1 px-2.5 shadow-xl"
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
                    {event?.inPerson ? (
                      <span className="flex text-start">
                        {event?.venue?.address}
                      </span>
                    ) : (
                      <span>Modalidad Virtual</span>
                    )}
                  </div>
                </div>
                {/* ZONAS */}
                <div className="flex w-full flex-col">
                  <div className="flex flex-row pl-10">
                    <span className="flex font-semibold text-2xl justify-start items">
                      Precios
                    </span>
                  </div>
                  <div className="flex w-full flex-col px-5">
                    <div className="grid grid-cols-2 justify-between text-start px-5">
                      <span className="flex w-1/2"></span>
                      <div className="flex flex-row w-full justify-between">
                        {event.dates &&
                          event.dates[0].zoneDates[0].allocations &&
                          event.dates[0].zoneDates[0].allocations.map(
                            (allocation) => (
                              <span key={allocation.id || allocation.audienceName} className="inline-block">
                                {allocation.audienceName}
                              </span>
                            )
                          )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 justify-between text-start py-3 border border-gray-400 bg-gray-50 shadow-lg rounded-2xl px-5 gap-y-4 xl:ml-4">
                      {event?.dates &&
                        event.dates[0]?.zoneDates.map((zone, index) => (
                          <React.Fragment key={zone.id || index}>
                            <span className="inline-block justify-start w-auto font-semibold">
                              {zone.name}
                            </span>
                            <div className="flex flex-row w-full justify-between">
                              {zone.allocations &&
                                zone.allocations.map((allocation) => (
                                  <span key={allocation.id || allocation.audienceName} className="flex font-semibold justify-end items-center">
                                    {currencies.PEN + " " + allocation.price}
                                  </span>
                                ))}
                              {!zone.allocations && (
                                <span className="flex font-semibold justify-end items-center">
                                  {currencies.PEN + " " + zone.basePrice}
                                </span>
                              )}
                            </div>
                          </React.Fragment>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Botón de compras */}
                <div className="flex flex-row w-full justify-center xl:justify-end px-5 items-center p-2.5 ">
                  <button
                    onClick={handleBuyButtonClick}
                    className="self-start inline-flex w-full xl:w-auto items-center cursor-pointer justify-center rounded-lg bg-purple-600 text-white px-4 py-1.5 hover:scale-105 hover:bg-yellow-500 transition-all duration-200 shadow-2xl"
                  >
                    Comprar entradas
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Información adicional */}
        <div className="flex flex-row pt-10 sm:pt-5 md:pt-5 lg:pt-5 xl:pt-5">
          <div className="flex flex-col relative h-auto flex-1 bg-white px-6 md:px-12 pt-6 pb-12 gap-6">
            <span className="inline-block text-start font-bold text-4xl pt-5">
              Información adicional
            </span>

            {/* Contenedor general responsive */}
            <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20">
              {/* Texto de política */}
              <div className="flex flex-col gap-4 w-full lg:w-1/3 pt-16">
                <h1 className="font-bold text-3xl">Política de devoluciones</h1>

                {event?.refundPolicy ? (
                  <span>{event.refundPolicyText}</span>
                ) : (
                  <span className="inline-block text-justify leading-relaxed text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vestibulum gravida ullamcorper massa in convallis. Nunc non
                    viverra lacus. Ut est tellus, iaculis in imperdiet a, tempus
                    a neque. Nulla auctor sagittis purus. Nullam libero turpis,
                    mollis quis mauris eu, interdum porta odio. Mauris egestas
                    euismod ipsum, sed tincidunt ipsum blandit a. Pellentesque
                    habitant morbi tristique senectus et netus et malesuada
                    fames ac turpis egestas. Praesent vel semper eros. Aenean
                    sit amet lorem aliquet, lobortis est vel, rhoncus arcu.
                  </span>
                )}
              </div>

              {/* Iframe cuadrado */}
              {event?.inPerson && (
                <div className="flex justify-center xl:justify-end w-full lg:w-1/2">
                  <div className="aspect-square w-full sm:w-3/4 md:w-2/3 lg:w-3/5 xl:w-1/2 border-2 rounded-md overflow-hidden shadow-2xl">
                    <iframe
                      className="w-full h-full"
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
                </div>
              )}
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
    </>
  );
}
