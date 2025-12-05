import React from "react";
import useEvent from "../../services/Event/EventContext";

function AditionalInfoCard({ setModal }) {
  const { event } = useEvent();

  return (
    <div className="flex flex-row pt-10 sm:pt-5 md:pt-5 lg:pt-5 xl:pt-5 ">
      <div className="flex flex-col relative h-auto flex-1 bg-white px-6 md:px-12 xl:py-10 pt-6 pb-12 gap-6">
        <div
          className={`flex flex-col lg:grid lg:grid-cols-${
            event.inPerson ? "3" : "2"
          } justify-between gap-12 lg:gap-20`}
        >
          {/* Texto de política */}
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col w-auto gap-2 text-start justify-start items-start">
              <span className="inline-block font-bold text-3xl">
                Política de devoluciones
              </span>

              {event.refundPolicyFileURLSigned ? (
                <div className="flex justify-start">
                  <button
                    onClick={() => setModal("refundPolicy")}
                    className="flex px-4 py-2 w-auto  bg-gray-100 border border-gray-400 hover:bg-gray-200 hover:scale-98 transition-all text-gray-600 rounded-lg text-sm font-medium cursor-pointer"
                  >
                    Ver pdf
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>

            {event?.refundPolicyText ? (
              <div className="whitespace-pre-line">
                {event.refundPolicyText}
              </div>
            ) : event.refundPolicyFileURLSigned ? (
              <iframe
                src={event.refundPolicyFileURLSigned}
                className="w-full h-full rounded-t-lg"
                title="Política de devoluciones"
              />
            ) : (
              ""
            )}
          </div>

          {/* Descripción del evento */}

          <div className="flex flex-col justify-start text-start gap-5">
            <span className="flex font-bold text-3xl justify-start text-start">
              Detalles del Evento
            </span>
            <div className="whitespace-pre-line">{event.description}</div>
          </div>

          {/* Iframe cuadrado */}
          {event?.inPerson && (
            <div className="flex justify-center w-auto">
              <div className="aspect-square w-[70vw] lg:w-auto xl:w-auto lg:h-[50vh] xl:h-[50vh] border-1 rounded-2xl">
                <iframe
                  className="w-full h-full rounded-2xl"
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
  );
}

export default AditionalInfoCard;
