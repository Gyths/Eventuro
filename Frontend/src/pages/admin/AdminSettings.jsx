import React from "react";

import CategoriasCard from "../../components/create/CategoriasCard";
import EventCommissionsCard from "../../components/create/EventCommissionsCard";

export default function AdminSettings() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-10">
      <CategoriasCard />
      <EventCommissionsCard />
    </div>
  );
}
