import { ChevronLeftIcon } from "@heroicons/react/24/solid";

export default function ArrowButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center rounded hover:scale-115 transition-all duration-300 cursor-pointer"
    >
      <ChevronLeftIcon className="fill-purple-950 size-7 md:size-10 mt-1" />
    </button>
  );
}
