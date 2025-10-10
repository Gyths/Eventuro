import React from "react";
import BotonEliminar from "../BotonEliminar";
import FormField from "./FormField";
import TextInput from "./TextInput";

export default function CrearTicketLine({
  items,
  setItems,
  currency = "PEN",
  sanitizeInt = (v) => v,
  sanitizeMoney = (v) => v,
}) {
  const handleChange = (idx, field, value) => {
    setItems(items.map((it, i) => (i === idx ? { ...it, [field]: value } : it)));
  };
  const handleDelete = (idx) => setItems(items.filter((_, i) => i !== idx));

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className="space-y-5">
        {items.map((item, idx) => (
          <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-gray-100 pb-4 last:border-b-0">
            <FormField label="Tipo de entrada*" hint="Ej. VIP, General, Premium">
              <TextInput
                placeholder="Ej. VIP"
                value={item.type}
                onChange={(v) => {
                  if (v.length <= 100) handleChange(idx, "type", v);
                }}
              />
            </FormField>

            <FormField label="Cantidad disponible*" hint="Número de tickets a la venta">
              <TextInput
                placeholder="0"
                value={item.quantity}
                onChange={(v) => {
                  if (v.length <= 7) handleChange(idx, "quantity", sanitizeInt(v));
                }}
              />
            </FormField>

            <FormField label={`Precio* (${currency})`} hint="Ej. 50.00">
              <div className="flex items-center gap-2">
                <TextInput
                  placeholder="0.00"
                  value={item.price}
                  onChange={(v) => {
                    if (v.length <= 7) handleChange(idx, "price", sanitizeMoney(v));
                  }}
                />
                <div className="w-[96px] flex justify-end">
                  <BotonEliminar onClick={() => handleDelete(idx)} />
                </div>
              </div>
            </FormField>
          </div>
        ))}
      </div>
    </div>
  );
}
