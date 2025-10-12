import { useEffect, useRef, useState } from "react";
import {
  AdjustmentsHorizontalIcon,
  CalendarIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const icons = {
  category: AdjustmentsHorizontalIcon,
  date: CalendarIcon,
  location: MapPinIcon,
};

export default function FilterPill({ label, icon = "category", children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const Icon = icons[icon] ?? AdjustmentsHorizontalIcon;

  useEffect(() => {
    const onDoc = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-white/30 bg-transparent px-4 py-1.5 text-sm text-white hover:bg-white/10"
      >
        <Icon className="h-4 w-4" />
        {label}
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-72 rounded-2xl bg-white p-3 shadow-xl">
          {children}
        </div>
      )}
    </div>
  );
}
