import React, { useState, useMemo, useEffect } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Calendar from "./Calendar";
import BaseModal from "../BaseModal";
import { EventuroApi } from "../../api";

export default function SelectDateModal({ eventId, onClose, onContinue }) {
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const monthNames = [
    "",
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Setiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  console.log(dates);
  useEffect(() => {
    async function fetchDates() {
      try {
        const response = await EventuroApi({
          endpoint: `/event/${eventId}/dates`,
          method: "GET",
        });

        const formatted = response.map((dateInfo) => ({
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

        setDates(formatted);
      } catch (err) {
        console.error("Error al consultar la disponibilidad:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDates();
  }, [eventId]);

  useEffect(() => {
    console.log("Datos originales:", dates);
    console.log("Fechas seleccionables:", selectableDays);
    console.log("Meses disponibles:", months);
    console.log("Días agrupados:", days);
  }, [dates]);

  const parsedDates = useMemo(() => {
    if (!dates || !dates.length) return [];
    return dates.map((d) => ({ ...d, dateObj: new Date(d.startAt) }));
  }, [dates]);

  const { selectableDays, months, days } = useMemo(() => {
    if (!dates || !dates.length)
      return { selectableDays: [], months: [], days: {} };

    const selectableDays = [];
    const months = [];
    const days = {};

    dates.forEach((date) => {
      const dateObj = new Date(date.startAt);
      const monthNum = dateObj.getMonth() + 1;
      const dayNum = dateObj.getDate();
      const yearNum = dateObj.getFullYear();

      if (!months.includes(monthNum)) months.push(monthNum);
      if (!days[monthNum]) days[monthNum] = {};
      if (!days[monthNum][dayNum]) days[monthNum][dayNum] = [];

      days[monthNum][dayNum].push(
        `${date.formattedStartHour} - ${date.formattedEndHour}`
      );
      selectableDays.push(new Date(yearNum, monthNum - 1, dayNum));
    });

    return { selectableDays, months, days };
  }, [dates]);

  const [currentDate, setCurrentDate] = useState(
    dates && dates.length ? new Date(dates[0].startAt) : new Date()
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePrevMonth = () => {
    const prevMonth = month;
    if (months.includes(prevMonth))
      setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    const nextMonth = month + 2;
    if (months.includes(nextMonth))
      setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleSelectDate = (day) => {
    setSelectedSchedule(null);
    setSelectedDate(new Date(year, month, day));
  };

  const handleSelectSchedule = (horario, dateObj) => {
    const foundEvent = dates.find(
      (d) =>
        new Date(d.startAt).toISOString() ===
          new Date(dateObj.startAt).toISOString() &&
        d.formattedStartHour === horario.split(" - ")[0]
    );
    if (foundEvent) setSelectedSchedule(foundEvent);
  };

  const handleContinue = () => {
    if (!selectedSchedule) return;
    onContinue(selectedSchedule);
  };

  return (
    <BaseModal>
      {loading ? (
        <div className="flex items-center justify-center h-[55vh] w-[50vw] bg-white rounded-md shadow-lg">
          <span className="text-gray-500">Cargando fechas...</span>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-stretch h-[70vh] sm:h-[55vh] w-[80vw] lg:w-[50vw] bg-white shadow-2xl rounded-md">
          {/* Calendario */}
          <div className="flex flex-col flex-[3] border-r border-gray-200">
            <div className="flex items-center justify-between px-6 py-3 text-gray-900">
              <button onClick={handlePrevMonth}>
                <ChevronLeftIcon className="w-5 h-5 hover:text-purple-600 transition-colors" />
              </button>
              <h2 className="font-semibold text-lg">
                {monthNames[month + 1]} {year}
              </h2>
              <button onClick={handleNextMonth}>
                <ChevronRightIcon className="w-5 h-5 hover:text-purple-600 transition-colors" />
              </button>
            </div>

            {dates && (
              <Calendar
                month={month}
                year={year}
                selectableDays={selectableDays}
                handleSelectDate={handleSelectDate}
              />
            )}
          </div>

          {/* Columna derecha */}
          <div className="flex flex-col flex-[2] bg-white rounded-md">
            <div className="flex flex-row justify-between px-6 py-3 bg-gray-100 border-b border-gray-200">
              <span className="font-semibold">Seleccione un Horario</span>
              <XMarkIcon
                onClick={onClose}
                className="size-4 cursor-pointer hover:scale-120 duration-200 transition-all"
              />
            </div>

            <div className="flex flex-col flex-1 justify-between">
              <div className="relative inline-box font-semibold pl-3.5 py-2">
                {selectedDate &&
                  selectedDate.toLocaleDateString("es-PE", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
              </div>

              <div className="flex-1 overflow-y-auto space-y-2">
                {selectedDate &&
                  parsedDates
                    .filter(
                      (d) =>
                        d.dateObj.getDate() === selectedDate.getDate() &&
                        d.dateObj.getMonth() === selectedDate.getMonth()
                    )
                    .map((dateObj) => {
                      const horario = `${dateObj.formattedStartHour} - ${dateObj.formattedEndHour}`;
                      return (
                        <div
                          key={dateObj.eventDateId}
                          onClick={() => handleSelectSchedule(horario, dateObj)}
                          className={`cursor-pointer border-y py-3.5 px-4 hover:bg-purple-50 transition-all ${
                            selectedSchedule?.eventDateId ===
                            dateObj.eventDateId
                              ? "bg-purple-100 border-purple-400"
                              : "border-gray-200 hover:border-purple-400/60 mx-1 hover:scale-101"
                          }`}
                        >
                          {horario}
                        </div>
                      );
                    })}
              </div>

              <div className="flex flex-col gap-4 p-4 px-6 border-t border-gray-300">
                <button
                  disabled={!selectedSchedule}
                  onClick={handleContinue}
                  className={`disabled:bg-purple-800 bg-purple-600 w-full text-white rounded-lg py-1.5 ${
                    selectedSchedule &&
                    "hover:bg-yellow-500/70 hover:scale-101 transition-all enabled:cursor-pointer"
                  }`}
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </BaseModal>
  );
}
