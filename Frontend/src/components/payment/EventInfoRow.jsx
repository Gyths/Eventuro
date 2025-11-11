import { MapPinIcon } from "@heroicons/react/24/solid";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { ClockIcon } from "@heroicons/react/24/solid";
import useEvent from "../../services/Event/EventContext";

export default function EventInfoRow({ Event }) {
  const { event } = useEvent();
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-3 text-gray-600 text-sm">
      <div className="flex items-center gap-1">
        <MapPinIcon className="h-5 w-5 text-purple-800" />
        {event?.inPerson ? (
          <span className="flex text-start">{event?.venue?.address}</span>
        ) : (
          <span>Modalidad Virtual</span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-1">
          <CalendarDaysIcon className="h-5 w-5 text-purple-800" />
          <span>{event?.selectedDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <ClockIcon className="h-5 w-5 text-purple-800" />
          <span>{event?.selectedSchedule}</span>
        </div>
      </div>
    </div>
  );
}
