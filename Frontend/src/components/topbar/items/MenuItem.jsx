export default function MenuItem({ text, onClick, danger = false }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm ${
        danger
          ? "text-red-600 hover:bg-red-50"
          : "text-gray-800 hover:bg-gray-50"
      }`}
    >
      {text}
    </button>
  );
}
