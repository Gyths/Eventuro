import React from "react";
import useEvent from "../services/Event/EventContext";
import AttendeesTable from "../components/attendees_view/AttendeesTable";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

export default function ViewAttendeesPage() {
  const { event } = useEvent();
  const navigate = useNavigate();
  console.log(event);
  return (
    <div>
      {/* Header de la página */}
      <div className="flex flex-col gap-6 w-full pt-16 mx-10 items-start">
        <div className="flex flex-row gap-5 items-center">
          <ChevronLeftIcon
            onClick={() => {
              navigate("/my-events");
            }}
            className="size-12 text-purple-900 hover:scale-110 cursor-pointer transition-all"
          />
          <span className="inline-block font-bold text-5xl">Listado de asistentes para {event.title}</span>
        </div>
        <hr className="text-gray-400 w-[95%] pr"></hr>
      </div>
      <div className="flex mx-10 justify-center items-center">
        <AttendeesTable attendeesList={event.attendeesList} />
      </div>
    </div>
  );
}
