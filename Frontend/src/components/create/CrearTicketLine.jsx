// src/components/create/CrearTicketLine.js (or CrearZonasTickets.js)

import React from "react";
import BotonEliminar from "../BotonEliminar"; 
import FormField from "./FormField";         
import TextInput from "./TextInput";         

export default function CrearTicketLine({ zones, onChange, currency = "PEN" }) {

  const updateZones = (newZones) => {
    onChange(newZones);
  };

  // --- Zone Handlers ---
  const handleZoneNameChange = (zoneIndex, newName) => {
    const newZones = [...zones];
    if (newName.length <= 100) {
      newZones[zoneIndex].zoneName = newName;
      updateZones(newZones);
    }
  };
  
  const handleDeleteZone = (zoneIndex) => {
    updateZones(zones.filter((_, i) => i !== zoneIndex));
  };
  
  // --- HANDLER FOR PRESALE TOGGLE ---
  const togglePresale = (zoneIndex) => {
    const newZones = zones.map((zone, zIdx) => {
      if (zIdx === zoneIndex) {
        const isActive = !zone.presaleActive;
        return {
          ...zone,
          presaleActive: isActive,
          subtypes: zone.subtypes.map(s => ({
            ...s,
            presaleQuantity: isActive ? (s.presaleQuantity || "") : undefined,
            presalePrice: isActive ? (s.presalePrice || "") : undefined,
          }))
        };
      }
      return zone;
    });
    updateZones(newZones);
  };
  
  // --- Subtype Handlers ---
  const handleAddSubtype = (zoneIndex) => {
    const newZones = [...zones];
    const presaleFields = newZones[zoneIndex].presaleActive
      ? { presaleQuantity: "", presalePrice: "" }
      : {};

    newZones[zoneIndex].subtypes.push({ type: "", quantity: "", price: "", ...presaleFields });
    updateZones(newZones);
  };

  const handleDeleteSubtype = (zoneIndex, subtypeIndex) => {
    const newZones = [...zones];
    newZones[zoneIndex].subtypes = newZones[zoneIndex].subtypes.filter(
      (_, i) => i !== subtypeIndex
    );
    updateZones(newZones);
  };

  const handleSubtypeChange = (zoneIndex, subtypeIndex, field, value) => {
    let newValue = value;
    const intFields = ["quantity", "presaleQuantity"];
    const moneyFields = ["price", "presalePrice"];

    if (intFields.includes(field)) {
      newValue = value.replace(/\D/g, "").replace(/^0+/, "");
      if (newValue === "" && value !== "") newValue = "0";
      if (newValue.length > 7) return; 
    }

    if (moneyFields.includes(field)) {
      newValue = value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
      if (newValue === "" && value !== "") newValue = "0";
      if (newValue.length > 10) return; 
    }
    
    if (field === "type" && value.length > 100) return; 

    const newZones = zones.map((zone, zIdx) => {
      if (zIdx === zoneIndex) {
        const newSubtypes = zone.subtypes.map((subtype, sIdx) => {
          if (sIdx === subtypeIndex) {
            return { ...subtype, [field]: newValue };
          }
          return subtype;
        });
        return { ...zone, subtypes: newSubtypes };
      }
      return zone;
    });
    updateZones(newZones);
  };

  // --- Rendering ---
  return (
    <div className="space-y-6">
      {zones.map((zone, zoneIndex) => {
        const presaleIsActive = !!zone.presaleActive;
        const totalInputColumns = presaleIsActive ? 5 : 3; 

        return (
          <div key={zoneIndex} className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
            
            {/* --- Zone Header--- */}
            <div className="flex items-start justify-between gap-4 border-b border-gray-200 pb-4 mb-4">
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-0 sm:w-40 sm:flex-shrink-0">
                    Nombre de la Zona*
                  </label>
                  <div className="w-full">
                    <TextInput
                      placeholder="Ej. Platea, VIP, Campo A"
                      value={zone.zoneName}
                      onChange={(v) => handleZoneNameChange(zoneIndex, v)}
                    />
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => togglePresale(zoneIndex)}
                className={`py-2 px-4 rounded-full text-sm font-semibold transition-colors flex-shrink-0 whitespace-nowrap
                  ${presaleIsActive 
                    ? "bg-pink-500 text-white hover:bg-pink-600" 
                    : "border border-pink-500 text-pink-500 hover:bg-pink-50"
                  }`
                }
              >
                {presaleIsActive ? "Preventa ACTIVA" : "Activar preventa"}
              </button>
              <div className="flex-shrink-0">
                <BotonEliminar onClick={() => handleDeleteZone(zoneIndex)} tooltip="Eliminar Zona" />
              </div>
            </div>
            
            {/* --- Subtypes List --- */}
            <div className="space-y-5">
              {zone.subtypes.map((subtype, subtypeIndex) => {
                const isLastSubtype = zone.subtypes.length === 1;
                
                // Determine which field is the LAST one to include the delete button
                const isPriceFieldLast = !presaleIsActive;

                return (
                  <div
                    key={subtypeIndex}
                    className={`grid gap-4 border-b border-gray-100 pb-4 last:border-b-0`}
                    // Grid template now only includes the input columns (3 or 5)
                    style={{
                        gridTemplateColumns: `repeat(${totalInputColumns}, minmax(0, 1fr))`
                    }}
                  >
                    {/* 1. Tipo de entrada */}
                    <FormField label="Tipo de entrada*" hint="Ej. Adulto, Niño">
                      <TextInput
                        placeholder="Ej. Adulto"
                        value={subtype.type}
                        onChange={(v) => handleSubtypeChange(zoneIndex, subtypeIndex, "type", v)}
                      />
                    </FormField>

                    {/* 2. Cantidad General */}
                    <FormField label="Cantidad*" hint="Tickets generales">
                      <TextInput
                        placeholder="0"
                        value={subtype.quantity}
                        onChange={(v) => handleSubtypeChange(zoneIndex, subtypeIndex, "quantity", v)}
                      />
                    </FormField>
                    
                    {/* 3. Precio General */}
                    <FormField label={`Precio* (${currency})`} hint="Precio general">
                      <div className="flex items-center gap-2">
                        <TextInput
                          placeholder="0.00"
                          value={subtype.price}
                          onChange={(v) => handleSubtypeChange(zoneIndex, subtypeIndex, "price", v)}
                        />
                        {/* DELETE BUTTON: Only appears here if Presale is NOT active (i.e., this is the last column) */}
                        {isPriceFieldLast && !isLastSubtype && (
                          <div className="flex-shrink-0 w-[40px] flex justify-end">
                            <BotonEliminar onClick={() => handleDeleteSubtype(zoneIndex, subtypeIndex)} />
                          </div>
                        )}
                      </div>
                    </FormField>
                    
                    {/* 4. Cantidad Preventa */}
                    {presaleIsActive && (
                      <FormField label="Cant. Preventa" hint="Tickets de preventa">
                        <TextInput
                          placeholder="0"
                          value={subtype.presaleQuantity}
                          onChange={(v) => handleSubtypeChange(zoneIndex, subtypeIndex, "presaleQuantity", v)}
                        />
                      </FormField>
                    )}
                    
                    {/* 5. Precio Preventa */}
                    {presaleIsActive && (
                      <FormField label={`Precio Preventa (${currency})`} hint="Precio con descuento">
                        <div className="flex items-center gap-2">
                          <TextInput
                            placeholder="0.00"
                            value={subtype.presalePrice}
                            onChange={(v) => handleSubtypeChange(zoneIndex, subtypeIndex, "presalePrice", v)}
                          />
                          {/* DELETE BUTTON: Only appears here if Presale IS active (i.e., this is the last column) */}
                          {!isLastSubtype && (
                            <div className="flex-shrink-0 w-[40px] flex justify-end">
                              <BotonEliminar onClick={() => handleDeleteSubtype(zoneIndex, subtypeIndex)} />
                            </div>
                          )}
                        </div>
                      </FormField>
                    )}
                  </div>
                );
              })}
            </div>

            {/* --- Add Subtype Button --- */}
            <div className="mt-4 flex justify-start">
              <button
                type="button"
                onClick={() => handleAddSubtype(zoneIndex)}
                className="rounded-full border border-pink-300 bg-pink-500/90 text-white px-5 py-2 text-sm shadow hover:bg-pink-500"
              >
                + Nuevo Tipo
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}