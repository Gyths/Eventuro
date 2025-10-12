import { ChevronLeftIcon } from "@heroicons/react/24/solid";

export default function ArrowButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center p-2 rounded hover:scale-120 transition-transform cursor-pointer"
    >
      <ChevronLeftIcon className="fill-purple-950 h-10 w-10 mt-1" />
    </button>
  );
}
