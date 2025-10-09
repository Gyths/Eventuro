import logo from "../../assets/logo.svg";
import EventInfoRow from "./EventInfoRow";

export default function EventInfoCard({ Event }) {
  const eventName = Event?.name || "Evento";
  const eventImage = Event?.image || logo;

  return (
    <div className="flex w-full max-w-md rounded-lg p-4 items-center gap-5 shadow-xl bg-white">
      <div className="flex-shrink-0 size-20 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
        <img
          src={eventImage}
          alt={eventName}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="flex flex-col gap-2 overflow-hidden">
        <strong className="font-bold text-lg sm:text-xl truncate">
          {eventName}
        </strong>
        <EventInfoRow Event={Event} />
      </div>
    </div>
  );
}
