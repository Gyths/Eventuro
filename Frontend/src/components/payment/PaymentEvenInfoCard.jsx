import React from "react";
import logo from "../../assets/logo.svg";
import EventInfoRow from "./EventInfoRow";
import useEvent from "../../services/Event/EventContext";

export default function EventInfoCard() {
  const { event } = useEvent();

  return (
    <div className="flex w-auto rounded-3xl p-4 items-center gap-5 shadow-xl bg-white">
      <div className="flex-shrink-0 size-20 rounded-2xl border border-gray-200 flex items-center justify-center overflow-hidden">
        <img
          src={event?.image}
          alt={event?.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="flex flex-col gap-2 overflow-hidden">
        <strong className="font-bold text-lg sm:text-xl truncate">
          {event?.title}
        </strong>
        <EventInfoRow />
      </div>
    </div>
  );
}
