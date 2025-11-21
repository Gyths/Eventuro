import React from "react";
import useEvent from "../../services/Event/EventContext";

function EventPricesTable() {
  const { event } = useEvent();
  const currencies = { PEN: "S/." };

  return (
    <div className="flex w-full flex-col py-2">
      <div className="flex flex-row pl-10">
        {event?.salesPhases && (
          <span className="flex font-semibold text-2xl justify-start mb-6 text-start">
            Precios - Fase {event?.salesPhases[0].name}
          </span>
        )}
      </div>

      <div className="flex w-full flex-col px-5">
        <div className="grid grid-cols-2 justify-between text-start px-5 py-1">
          <span className="flex font-semibold justify-start items">
            Del {event?.salesPhases[0]?.startAt} al{" "}
            {event?.salesPhases[0]?.endAt}
          </span>
          <div className="flex flex-row w-full justify-between">
            {event?.dates &&
              event.dates[0].zoneDates[0].allocations &&
              event.dates[0].zoneDates[0].allocations.map((allocation) => (
                <span
                  key={allocation.id || allocation.audienceName}
                  className="inline-block"
                >
                  {allocation.audienceName}
                </span>
              ))}
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
                      <span
                        key={allocation.id || allocation.audienceName}
                        className="flex font-semibold justify-end items-center"
                      >
                        {currencies.PEN +
                          " " +
                          parseFloat(allocation.price).toFixed(2)}
                      </span>
                    ))}
                  {!zone.allocations && (
                    <span className="flex font-semibold justify-end items-center">
                      {currencies.PEN +
                        " " +
                        parseFloat(zone.basePrice).toFixed(2)}
                    </span>
                  )}
                </div>
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
}

export default EventPricesTable;
