import React from "react";
import SearchBar from "../items/SearchBar";
import { useAuth } from "../../../services/auth/AuthContext";
import UserMenu from "../items/UserMenu";
import AuthButtons from "../items/AuthButtons";
import FilterPill from "../items/FilterPill";
import CategorySelector from "../items/CategorySelector";
import DateRangeSelector from "../items/DateRangeSelector";
import LocationSelector from "../items/LocationSelector";

export default function UserVariant() {
  const [filters, setFilters] = React.useState({
    category: null,
    dateFrom: null,
    dateTo: null,
    location: "",
  });
  const { isAuthenticated } = useAuth();
  function updateFilters(patch) {
    const next = { ...filters, ...patch };
    /*setFilters(next);*/ //evitamos setear doblemente
    onFiltersChange?.(next);
  }

  return (
    <div className="flex flex-1 items-center gap-4 px-6">
      <SearchBar></SearchBar>
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
      <div>{isAuthenticated ? <UserMenu /> : <AuthButtons />}</div>
    </div>
  );
}
