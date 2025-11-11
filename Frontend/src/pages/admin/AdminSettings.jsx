import React from "react";

import CategoriasCard from "../../components/create/CategoriasCard";
import EventCommissionsCard from "../../components/create/EventCommissionsCard";

export default function AdminSettings() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
      <CategoriasCard />
    </div>
  );
}
