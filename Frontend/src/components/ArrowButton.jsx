import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export default function ArrowButton({ destination }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(destination)}
      className="flex items-center justify-center p-2 rounded hover:scale-120 transition-transform cursor-pointer"
    >
      <ChevronLeftIcon className="fill-purple-950 h-10 w-10 mt-1" />
    </button>
  );
}
