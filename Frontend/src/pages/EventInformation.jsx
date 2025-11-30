import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth/AuthContext";
import { EVENT_INFORMATION_TEXTS } from "../components/payment/texts";

import { useModal } from "../context/ModalContext";
import useEvent from "../services/Event/EventContext";
import { EventuroApi } from "../api";

import { AnimatePresence, motion } from "framer-motion";

import EventInfoCard from "../components/selection/EventInfoCard";
import AditionalInfoCard from "../components/selection/AditionalInfoCard";

import SelectDateModal from "../components/selection/SelectDateModal";
import SelectTicketModal from "../components/selection/SelectTicketModal";
import AttendantsNameModal from "../components/selection/AttendantsNameModal";
import RefundPolicyModal from "../components/selection/RefundPolicyModal";
import placeholder from "../assets/DefaultEvent.webp";

import { FaceFrownIcon } from "@heroicons/react/24/outline";

export default function TicketSelection() {
  const loginPage = "/login";
  const navigate = useNavigate();

  // Manejo de objetos de negocio
  const { isAuthenticated, user } = useAuth();
  const { event, setEvent } = useEvent();
  const [errorCode, setErrorCode] = React.useState(-1);
  //State para el manejo del scroll
  const [bluredBackgrund, setBluredBackgrund] = React.useState(false);

  // State para manejar modales
  const { modal, setModal } = useModal(null);
  const [selectedDate, setSelectedDate] = React.useState(false);

  const [showContent, setShowContent] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    //Llamada a la api del back para consultar disponibilidad de un evento
    const fetchEventInfo = async () => {
      try {
        const availabilityEndpoint = `/event/${event.eventId}/info`;
        const apiMethod = "GET";
        const response = await EventuroApi({
          endpoint: availabilityEndpoint,
          method: apiMethod,
        });
        response.image = response.imagePrincipalURLSigned ?? placeholder;
        response.bannerEv = response.imageBannerURLSigned ?? placeholder;
        setEvent(response);

        await new Promise((res) => setTimeout(res, 300));
      } catch (err) {
        setErrorCode(err.code || 0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventInfo();
  }, []);
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = window.innerHeight;

      // Fondo: se activa al 20% del viewport
      setBluredBackgrund(scrollY > height * 0.2);

      // Card de información: aparece después del 10%
      if (scrollY > height * 0.1 && !showContent) {
        setShowContent(true);
      } else if (scrollY <= height * 0.2 && showContent) {
        setShowContent(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showContent]);

  const handleContinue = (selectedId) => {
    if (!isAuthenticated) {
      navigate(loginPage);
      return;
    }
    setSelectedDate(selectedId);
    setModal("tickets");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin mb-3"></div>
        <span className="text-gray-600 text-sm">Cargando evento...</span>
      </div>
    );
  }

  return (
    <>
      {!event || errorCode !== -1 ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <FaceFrownIcon className="text-gray-500 size-14" />
          <span className="text-gray-500 text-2xl">¡Lo sentimos!</span>
          <span className="text-gray-500 text-2xl">
            {EVENT_INFORMATION_TEXTS.alerts[errorCode]}
          </span>
        </div>
      ) : (
        <>
          <div className="relative min-h-screen overflow-x-hidden">
            {/* Imagen de fondo */}
            <div className="fixed inset-0 h-screen w-full overflow-hidden">
              <img
                src={event?.bannerEv}
                alt="Fondo del evento"
                className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${
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
              animate={
                showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }
              }
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex px-5 relative flex-wrap xl:flex-row justify-center gap-10 md:gap-20 xl:gap-0 items-stretch">
                {/* Imagen */}
                <div className="flex w-full scale-y-110 xl:max-w-[30vw] rounded-4xl">
                  <img
                    src={event?.image}
                    className="w-full h-full object-cover rounded-3xl"
                    alt="Imagen del evento"
                  />
                </div>

                {/* Card de Información y entradas*/}
                <EventInfoCard setModal={setModal} />
              </div>
            </motion.div>

            {/* Información adicional */}
            <AditionalInfoCard setModal={setModal} />
          </div>
          {modal === "dates" && (
            <AnimatePresence>
              <SelectDateModal
                eventId={event.eventId}
                onClose={() => setModal(null)}
                onContinue={handleContinue}
              />
            </AnimatePresence>
          )}

          {(modal === "tickets" ||
            modal === "seats" ||
            modal === "attendants") && (
            <AnimatePresence>
              <SelectTicketModal
                eventDateId={selectedDate}
                modal={modal}
                setModal={setModal}
                onClose={() => setModal(null)}
                onContinue={() => setModal("attendants")}
                onReturn={() => setModal("dates")}
              />
            </AnimatePresence>
          )}
        </>
      )}

      {modal === "refundPolicy" && (
        <AnimatePresence>
          <RefundPolicyModal onClose={() => setModal(null)} />
        </AnimatePresence>
      )}
    </>
  );
}
  