import { useState, useMemo } from "react";
import { ChevronUpIcon, ChevronDownIcon, UserIcon, IdentificationIcon, CalendarIcon, TableCellsIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import useEvent from "../../services/Event/EventContext";

import { DocumentIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

export default function AttendeesTable({ attendeesList }) {
  const { event } = useEvent();
  const exportToCSV = (attendeesList) => {
    const filename = "Listado de asistentes " + event.title + ".csv";
    // Aplanar la estructura
    const flat = attendeesList.flatMap((date) =>
      date.attendees.map((a) => ({
        attendeeName: a.attendeeName,
        attendeeDni: a.attendeeDni,
        ticketNum: a.ticketId,
        zoneName: a.zoneName,
        allocationName: a.allocationName,
        eventDateId: date.eventDateId,
        eventStartAt: date.startAt,
        eventEndAt: date.endAt,
      }))
    );

    if (flat.length === 0) return;

    // Definir columnas en orden
    const headers = ["Nombre", "DNI", "Num de ticket", "Zona", "Allocation", "Fecha", "Hora Inicio", "Hora Fin"];

    const rows = flat
      .map((item) => {
        const date = new Date(item.eventStartAt);
        const end = new Date(item.eventEndAt);

        return [
          item.attendeeName,
          item.attendeeDni,
          item.ticketNum,
          item.zoneName,
          item.allocationName,
          date.toLocaleDateString(),
          date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        ]
          .map((v) => `"${v ?? ""}"`)
          .join(",");
      })
      .join("\n");

    const csv = headers.join(",") + "\n" + rows;

    // Descargar archivo
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
  };

  function exportToPDF({ data = [] }) {
    const filename = "Listado de asistentes para " + event.title + ".pdf";

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "A4",
    });

    // --- TÍTULO ---
    const title = "Listado de asistentes para " + event.title;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(title, 40, 40);

    // --- COLUMNAS ---
    const columns = ["Nombre", "DNI", "Num de ticket", "Zona", "Allocation", "Fecha", "Hora Inicio", "Hora Fin"];

    // --- MAPEAR / APLANAR IGUAL QUE CSV ---
    const flat = attendeesList.flatMap((date) =>
      date.attendees.map((a) => ({
        attendeeName: a.attendeeName,
        attendeeDni: a.attendeeDni,
        ticketNum: a.ticketId,
        zoneName: a.zoneName,
        allocationName: a.allocationName,
        eventStartAt: date.startAt,
        eventEndAt: date.endAt,
      }))
    );

    // --- CUERPO DE TABLA ---
    const body = flat.map((item) => {
      const start = new Date(item.eventStartAt);
      const end = new Date(item.eventEndAt);

      return [
        item.attendeeName ?? "",
        item.attendeeDni ?? "",
        item.ticketNum ?? "",
        item.zoneName ?? "",
        item.allocationName ?? "",
        start.toLocaleDateString(),
        start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      ];
    });

    // --- TABLA ---
    autoTable(doc, {
      startY: 60,
      head: [columns],
      body,
      styles: {
        fontSize: 9,
        cellPadding: 5,
      },
      headStyles: {
        fillColor: [230, 230, 230],
        textColor: 20,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { left: 40, right: 40 },
      pageBreak: "auto",

      didDrawPage: (data) => {
        const pageNumber = doc.internal.getNumberOfPages();
        const pageSize = doc.internal.pageSize;
        const pageHeight = pageSize.height || pageSize.getHeight();

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(`Página ${pageNumber}`, data.settings.margin.left, pageHeight - 15);
      },
    });

    doc.save(filename);
  }

  const flatAttendees = useMemo(
    () =>
      attendeesList.flatMap((date) =>
        date.attendees.map((a) => ({
          ...a,
          eventDateId: date.eventDateId,
          eventStartAt: date.startAt,
          eventEndAt: date.endAt,
        }))
      ),
    [attendeesList]
  );

  const [selectedDate, setSelectedDate] = useState("ALL");
  const [selectedLetter, setSelectedLetter] = useState("ALL");
  const [search, setSearch] = useState("");

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const uniqueDates = useMemo(() => {
    const setDates = new Map();
    attendeesList.forEach((d) => {
      const dateOnly = new Date(d.startAt).toISOString().split("T")[0];
      setDates.set(d.eventDateId, dateOnly);
    });
    return [...setDates.entries()];
  }, [attendeesList]);

  const availableHours = useMemo(() => {
    if (selectedDate === "ALL") return [];

    const event = attendeesList.find((d) => d.eventDateId === Number(selectedDate));
    if (!event) return [];

    const hour = new Date(event.startAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return [hour];
  }, [selectedDate, attendeesList]);

  const sortedFiltered = useMemo(() => {
    let data = [...flatAttendees];

    if (selectedDate !== "ALL") {
      data = data.filter((a) => a.eventDateId === Number(selectedDate));
    }

    if (selectedLetter !== "ALL") {
      data = data.filter((a) => a.attendeeName.toUpperCase().startsWith(selectedLetter));
    }

    if (search.trim() !== "") {
      data = data.filter((a) => a.attendeeName.toLowerCase().includes(search.toLowerCase()) || a.attendeeDni.includes(search));
    }

    if (sortConfig.key) {
      data.sort((a, b) => {
        let x = a[sortConfig.key];
        let y = b[sortConfig.key];

        if (typeof x === "string") x = x.toLowerCase();
        if (typeof y === "string") y = y.toLowerCase();

        if (x < y) return sortConfig.direction === "asc" ? -1 : 1;
        if (x > y) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return data;
  }, [flatAttendees, search, sortConfig, selectedDate, selectedLetter]);

  const toggleSort = (key) =>
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));

  const SortIcon = ({ column }) => (
    <span className="ml-1">
      {sortConfig.key !== column ? (
        <>
          <ChevronUpIcon className="size-3" /> <ChevronDownIcon className="size-3" />
        </>
      ) : sortConfig.direction === "asc" ? (
        <ChevronUpIcon className="size-3" />
      ) : (
        <ChevronDownIcon className="size-3" />
      )}
    </span>
  );

  return (
    <div className="flex flex-col gap-4 mt-6 p-4 w-full">
      <div className="mb-4 flex flex-row gap-6 justify-between items-center">
        <div className="flex flex-row w-1/2 items-center gap-6">
          <input
            type="text"
            placeholder="Buscar por nombre o DNI..."
            className="bg-gray-50/30 outline-none rounded-2xl border border-gray-200 shadow px-3 py-2 w-1/3 hover:scale-101 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="bg-gray-50/30 rounded-2xl border border-gray-200 shadow px-4 py-3 hover:scale-101 cursor-pointer transition-all"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
            }}
          >
            <option value="ALL">Todas las fechas</option>
            {uniqueDates.map(([id, date]) => (
              <option key={id} value={id}>
                {date}
              </option>
            ))}
          </select>
        </div>
        <div className="text-gray-500 mr-15">Total: {sortedFiltered.length} asistentes</div>
      </div>

      <div className="flex flex-row gap-2 justify-start items-center mb-2">
        <button
          onClick={() => setSelectedLetter("ALL")}
          className={`px-3 h-9 rounded-lg border border-gray-200  transition-all shadow-sm ${
            selectedLetter === "ALL" ? "bg-purple-700 text-white" : "bg-gray-50 hover:bg-gray-200 cursor-pointer hover:scale-105 text-gray-500"
          }`}
        >
          Todas
        </button>

        {alphabet.map((L) => (
          <button
            key={L}
            onClick={() => setSelectedLetter(L)}
            className={`flex px-3 size-9 rounded-lg border border-gray-200 transition-all justify-center text-sm items-center text-center hover:scale-105 focus:scale-105 shadow-sm ${
              selectedLetter === L ? "bg-purple-700 text-white" : "bg-gray-50 hover:bg-gray-200 cursor-pointer  text-gray-500 "
            }`}
          >
            {L}
          </button>
        ))}

        <div className="flex flex-row justify-end items-center gap-12 w-1/2 pr-15">
          <span className="text-gray-500">Exportar a </span>

          <button onClick={() => exportToPDF(attendeesList)} className="flex flex-col items-center hover:scale-105 cursor-pointer transition-all">
            <DocumentIcon className="size-7 text-red-700" />
            PDF
          </button>
          <button onClick={() => exportToCSV(attendeesList)} className="flex flex-col items-center hover:scale-105 cursor-pointer transition-all">
            <DocumentTextIcon className="size-7 text-blue-700" />
            CSV
          </button>
        </div>
      </div>

      <div className="overflow-auto rounded-xl shadow border border-gray-400/80">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="grid grid-cols-6 py-2 bg-gray-200/30 text-left">
              <th className="p-3 flex items-center gap-2 cursor-pointer" onClick={() => toggleSort("attendeeName")}>
                <UserIcon className="size-5 text-purple-900/90" />
                Nombre
                <SortIcon column="attendeeName" />
              </th>
              <th className="p-3 flex items-center gap-2 cursor-pointer" onClick={() => toggleSort("attendeeDni")}>
                <IdentificationIcon className="size-5 text-purple-900/90" />
                DNI
                <SortIcon column="attendeeDni" />
              </th>
              <th className="p-3 flex items-center gap-2 cursor-pointer" onClick={() => toggleSort("attendeeDni")}>
                <IdentificationIcon className="size-5 text-purple-900/90" />
                <span className="inline-block">Num. de ticket</span>
                <SortIcon column="attendeeDni" />
              </th>
              <th className="p-3 flex items-center gap-2 cursor-pointer" onClick={() => toggleSort("zoneName")}>
                <TableCellsIcon className="size-5 text-purple-900/90" />
                Zona
                <SortIcon column="zoneName" />
              </th>
              <th className="p-3 flex items-center gap-2 cursor-pointer" onClick={() => toggleSort("allocationName")}>
                <UserGroupIcon className="size-5 text-purple-900/90" />
                Allocation
                <SortIcon column="allocationName" />
              </th>
              <th className="p-3 flex items-center gap-2 cursor-pointer" onClick={() => toggleSort("eventStartAt")}>
                <CalendarIcon className="size-5 text-purple-900/90" />
                <span className="inline-block">Fecha y hora del evento</span>
                <SortIcon column="eventStartAt" />
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedFiltered.map((a) => (
              <tr key={a.ticketId} className="grid grid-cols-6 border-t border-gray-400/80 hover:bg-gray-50">
                <td className="p-3">{a.attendeeName}</td>
                <td className="p-3">{a.attendeeDni}</td>
                <td className="p-3">{"#" + a.ticketId}</td>
                <td className="p-3">{a.zoneName}</td>
                <td className="p-3">{a.allocationName}</td>
                <td className="p-3">
                  {new Date(a.eventStartAt).toLocaleDateString()}{" "}
                  {new Date(a.eventStartAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </td>
              </tr>
            ))}

            {sortedFiltered.length === 0 && (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan={5}>
                  No se encontraron resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
