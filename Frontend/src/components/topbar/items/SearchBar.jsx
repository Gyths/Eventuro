import React from "react";

export default function SearchBar() {
  const [query, setQuery] = React.useState("");
  return (
    <div className="flex-1">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onSearch?.(e.target.value);
        }}
        placeholder="Search..."
        className="w-[35vw] rounded-full border border-white/20 bg-white/95 px-4 py-2 text-sm outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-violet-400"
      />
    </div>
  );
}
