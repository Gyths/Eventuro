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
  const [selected, setSelected] = React.useState(0);
  const calendarDays = [];
  for (let i = 0; i < firstDayOfWeek; i++) calendarDays.push(null);
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(day);

  return (
    <div className="grid p-6 grid-cols-7 gap-1.5 text-center overflow-auto h-full">
      {daysOfWeek.map((day) => (
        <div
          key={day}
          className="flex font-semibold text-sm justify-center items-center text-gray-700"
        >
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
            className={`flex size-auto text-2x1 rounded-md justify-center items-center py-2 font-medium transition-all duration-200 shadow-sm ${
              !selectable
                ? "bg-gray-200 text-gray-400"
                : selected != day
                ? "cursor-pointer bg-gray-50 border border-transparent hover:border-yellow-400 hover:bg-yellow-400/10 hover:scale-105"
                : "bg-yellow-400/80 text-white"
            }`}
            onClick={() => {
              if (selectable) {
                handleSelectDate(day);
                setSelected(day);
              }
            }}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
}
