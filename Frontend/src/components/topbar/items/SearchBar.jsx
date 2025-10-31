import React from "react";

// Debounce ligero
function useDebouncedCallback(cb, delay = 300) {
  const ref = React.useRef();
  return React.useCallback((...args) => {
    clearTimeout(ref.current);
    ref.current = setTimeout(() => cb(...args), delay);
  }, [cb, delay]);
}

export default function SearchBar({
  onSearch = () => {},      // 👈 ahora recibe callback
  placeholder = "Buscar por eventos, artistas o lugares…",
  defaultValue = "",
  compact = false,          // opcional si lo usas dentro del input grande
  onEnter,                  // opcional: acción al presionar Enter
}) {
  const [query, setQuery] = React.useState(defaultValue);

  const debounced = useDebouncedCallback((q) => onSearch(q), 300);

  function handleChange(e) {
    const q = e.target.value;
    setQuery(q);
    debounced(q);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      onSearch(query);
      onEnter?.(query);
    }
  }

  return (
    <div className="flex-1">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`w-full rounded-full border border-white/20 bg-white/95 px-4 ${
          compact ? "py-1.5 text-xs" : "py-2 text-sm"
        } outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-violet-400`}
      />
    </div>
  );
}
