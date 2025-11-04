import React from "react";

export default function Calendar({
  month,
  year,
  selectableDays,
  handleSelectDate,
}) {
  const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const calendarDays = [];
  for (let i = 0; i < firstDayOfWeek; i++) calendarDays.push(null);
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(day);

  return (
    <div className="grid grid-cols-7 gap-1.5 p-4 text-center overflow-auto">
      {daysOfWeek.map((day) => (
        <div key={day} className="font-semibold text-sm text-gray-700">
          {day}
        </div>
      ))}
      {calendarDays.map((day, index) => {
        if (!day) return <div key={index}></div>;
        const selectable = selectableDays.some(
          (d) => d.getTime() === new Date(year, month, day).getTime()
        );
        return (
          <div
            key={index}
            className={`flex text-2x1 rounded-md justify-center items-center py-2 font-medium transition-all duration-200 ${
              selectable
                ? "cursor-pointer bg-gray-50 border border-transparent hover:border-yellow-400 hover:scale-105"
                : "bg-gray-200 text-gray-400"
            }`}
            onClick={() => selectable && handleSelectDate(day)}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
}
