// EventZoneDropdownList.jsx
import React, { useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";

export default function EventZoneDropdownList({ selectedSchedule }) {
  const [selectedZone, setSelectedZone] = useState(null);
  const zones = selectedSchedule?.zoneDates ?? [];

  return (
    <div className="px-3">
      <label className="block text-sm font-semibold mb-1 text-gray-700">
        Seleccione una Categoría
      </label>

      <Listbox value={selectedZone} onChange={setSelectedZone}>
        <div className="relative mt-1">
          {/* Botón principal */}
          <ListboxButton className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 sm:text-sm">
            <span className="block truncate">
              {selectedZone ? selectedZone.name : "-- Seleccione una zona --"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>

          {/* Opciones desplegables */}

          {selectedSchedule && (
            <Transition
              as={React.Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {zones.length === 0 && (
                  <div className="px-3 py-2 text-gray-500 text-sm">
                    No hay zonas disponibles
                  </div>
                )}

                {zones.map((zone) => (
                  <ListboxOption
                    key={zone.eventDateZoneId}
                    value={zone}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active
                          ? "bg-purple-100 text-purple-900"
                          : "text-gray-900"
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-semibold" : "font-normal"
                          }`}
                        >
                          {zone.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          )}
        </div>
      </Listbox>
    </div>
  );
}
