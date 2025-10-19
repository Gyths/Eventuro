import React, { useState, useMemo, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import EventZoneDropdownList from "./EventZoneDropdownList";
import Calendar from "./Calendar";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function SelectDateModal({ dates, onClose }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSchedule, setSelectedEvent] = useState(null);

  const parsedDates = useMemo(
    () =>
      dates?.map((d) => ({
        ...d,
        dateObj: new Date(d.startAt), // Se guarda la conversión aquí
      })) ?? [],
    [dates]
  );

  const { selectableDays, months, days } = useMemo(() => {
    const selectableDays = [];
    const months = [];
    const days = {};

    dates?.forEach((date) => {
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

  const [currentDate, setCurrentDate] = useState(new Date(dates[0].startAt));
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePrevMonth = () => {
    const prevMonth = month;
    if (months.includes(prevMonth)) {
      setCurrentDate(new Date(year, month - 1, 1));
    }
  };

  const handleNextMonth = () => {
    const nextMonth = month + 2;
    if (months.includes(nextMonth)) {
      setCurrentDate(new Date(year, month + 1, 1));
    }
  };

  const handleSelectDate = (day) => {
    setSelectedDate(new Date(year, month, day));
  };

  const handleSelectSchedule = (horario, dateObj) => {
    const foundEvent = dates.find(
      (d) =>
        new Date(d.startAt).toISOString() ===
          new Date(dateObj.startAt).toISOString() &&
        d.formattedStartHour === horario.split(" - ")[0]
    );

    if (foundEvent) {
      setSelectedEvent(foundEvent);
    }
  };

  useEffect(() => {
    console.time("Render completo");
    return () => {
      console.timeEnd("Render completo");
    };
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="flex flex-col md:flex-row items-stretch w-full max-w-4xl bg-white overflow-hidden shadow-2xl rounded-md">
        <div className="flex flex-col flex-[3] border-r border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-3  text-gray-900">
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

          {/* Días del calendario */}
          {useMemo(
            () => (
              <Calendar
                month={month}
                year={year}
                selectableDays={selectableDays}
                handleSelectDate={handleSelectDate}
              />
            ),
            [months, selectableDays, currentDate]
          )}
        </div>

        <div className="flex flex-col flex-[2] bg-white">
          <div className="flex flex-row justify-between px-6 py-3 bg-gray-100 border-b border-gray-200">
            <span className="font-semibold">Seleccione un Horario</span>
            <div className="flex justify-center items-center">
              <XMarkIcon
                onClick={onClose}
                className="size-4 cursor-pointer"
              ></XMarkIcon>
            </div>
          </div>

          <div className="flex flex-col flex-1 justify-between">
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
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
                        className={`cursor-pointer rounded-md border p-2 hover:bg-purple-50 ${
                          selectedSchedule?.eventDateId === dateObj.eventDateId
                            ? "bg-purple-100 border-purple-400"
                            : "border-gray-200"
                        }`}
                      >
                        {horario}
                      </div>
                    );
                  })}
            </div>

            <div className="flex flex-col gap-4 p-4 border-t border-gray-100">
              <EventZoneDropdownList selectedSchedule={selectedSchedule} />

              <button className="bg-purple-600 w-full text-white rounded-lg py-1.5 hover:bg-purple-700 transition cursor-pointer">
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
