import React, { useState, useMemo, useEffect } from "react";
import Swal from "sweetalert2";
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
  // console.log(dates);

  /*useEffect(() => {
    console.log("Datos originales:", dates);
    console.log("Fechas seleccionables:", selectableDays);
    console.log("Meses disponibles:", months);
    console.log("Días agrupados:", days);
  }, [dates]);*/

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

      days[monthNum][dayNum].push(`${date.startHour} - ${date.endHour}`);
      selectableDays.push(new Date(yearNum, monthNum - 1, dayNum));
    });

    return { selectableDays, months, days };
  }, [dates]);

  const [currentDate, setCurrentDate] = useState(null);

  const year = currentDate?.getFullYear();
  const month = currentDate?.getMonth();

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

  const handleContinue = () => {
    if (!selectedSchedule) return;
    onContinue(selectedSchedule);
  };

  useEffect(() => {
    async function fetchDates() {
      try {
        const response = await EventuroApi({
          endpoint: `/event/${eventId}/dates`,
          method: "GET",
        });

        await new Promise((resolve) => setTimeout(resolve, 300));

        setDates(response);

        if (response.length > 0) {
          setCurrentDate(new Date(response[0].startAt));
        }
      } catch (err) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        Swal.fire({
          icon: "error",
          title: "¡Lo sentimos!",
          text: "Ocurrió un error inseperado",
        });
        onClose();
      } finally {
        setLoading(false);
      }
    }

    fetchDates();
  }, []);

  return (
    <BaseModal>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[55vh] w-[50vw] bg-white rounded-md shadow-lg">
          <div className="w-10 h-10 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin mb-3"></div>
          <span className="text-gray-500">Cargando fechas...</span>
        </div>
      ) : (
        <div className="flex overflow-auto flex-col md:flex-row items-stretch h-[70vh] sm:h-[55vh] w-[80vw] lg:w-[50vw] bg-white shadow-2xl rounded-md">
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

            {currentDate && (
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
                      const horario = `${dateObj.startHour} - ${dateObj.endHour}`;
                      return (
                        <div
                          key={dateObj.eventDateId}
                          onClick={() =>
                            setSelectedSchedule(dateObj.eventDateId)
                          }
                          className={`cursor-pointer  py-3.5 px-4 hover:bg-purple-50 transition-all ${
                            selectedSchedule === dateObj.eventDateId
                              ? "border-y bg-purple-100 border-purple-400"
                              : "border rounded-lg border-gray-200 hover:border-purple-400/60 mx-1 hover:scale-101"
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
