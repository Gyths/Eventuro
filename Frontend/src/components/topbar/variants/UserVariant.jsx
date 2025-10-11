import React from "react";
import searchBar from "../items/SearchBar";
import useAuth from "../../../services/auth/AuthContext";
import UserMenu from "../items/UserMenu";
import AuthButtons from "../items/AuthButtons";

export default function UserVariant() {
  const [filters, setFilters] = React.useState({
    category: null,
    dateFrom: null,
    dateTo: null,
    location: "",
  });

  function updateFilters(patch) {
    const { session } = useAuth();
    const next = { ...filters, ...patch };
    /*setFilters(next);*/ //evitamos setear doblemente
    onFiltersChange?.(next);
  }

  return (
    <div className="flex flex-1 items-center gap-4 px-6">
      <searchBar></searchBar>
      <div className="hidden items-center gap-2 md:flex">
        <FilterPill label="Categoria" icon="category">
          <CategorySelector
            value={filters.category}
            onChange={(category) => updateFilters({ category })}
          />
        </FilterPill>
        <FilterPill label="Fecha" icon="date">
          <DateRangeSelector
            from={filters.dateFrom}
            to={filters.dateTo}
            onChange={({ from, to }) =>
              updateFilters({ dateFrom: from, dateTo: to })
            }
          />
        </FilterPill>
        <FilterPill label="Ubicación" icon="location">
          <LocationSelector
            value={filters.location}
            onChange={(location) => updateFilters({ location })}
          />
        </FilterPill>
      </div>
      <div>{session != null ? <UserMenu /> : <AuthButtons />}</div>
    </div>
  );
}
