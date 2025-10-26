import React from "react";

function Row({ label, children }) {
  return (
    <div className="grid grid-cols-3 gap-4 py-2 border-b border-gray-100 last:border-b-0">
      <div className="col-span-1 text-sm text-gray-500">{label}</div>
      <div className="col-span-2 text-sm text-gray-800">{children}</div>
    </div>
  );
}

export default function ResumenEvento({ basics, imagePreview, bannerPreview, dates = [], location, tickets, returnsPolicy }) {
  {
    if (!basics) basics = {};

    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-3">
        <h4 className="text-base font-semibold text-gray-800">
          Detalles del evento
        </h4>
        <Row label="Nombre">{basics.name || "—"}</Row>
        <Row label="Categoría">{Array.isArray(basics.categories) && basics.categories.length > 0? 
          basics.categoriesLabels? basics.categoriesLabels.join(", "): basics.categories.join(", "): "—"}
        </Row>
        <Row label="Descripción">{basics.description || "—"}</Row>
        <Row label="Información adicional">{basics.extraInfo || "—"}</Row>
        <Row label="Restricciones">
          {basics.restrictions
            ? Object.entries(basics.restrictions)
                .filter(([, v]) => v)
                .map(([k]) => k)
                .join(", ") || "Ninguna"
            : "—"}
        </Row>
        <Row label="Imagen">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="preview"
              className="h-24 rounded-md border"
            />
          ) : (
            "—"
          )}
        </Row>
        
        {/* Banner (igual que la imagen principal) */}
        <Row label="Banner">
          {bannerPreview ? (
            <img src={bannerPreview} alt="banner preview" className="h-24 rounded-md border" />
          ) : (
            "—"
          )}
        </Row>
        {/* Fechas & horarios */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-2">
          <h4 className="text-base font-semibold text-gray-800 mb-1">
            Fechas y horarios
          </h4>
          {!dates || dates.length === 0 ? (
            <div className="text-sm text-gray-500">Sin fechas.</div>
          ) : (
            dates.map((d) => (
              <div key={d.id} className="text-sm">
                <div className="font-medium">
                  {new Date(d.date).toLocaleDateString()}
                </div>
                <div className="text-gray-600">
                  {(d.schedules ?? []).length
                    ? d.schedules.map((s) => `${s.start}–${s.end}`).join(", ")
                    : "Sin horarios"}
                </div>
              </div>
            ))
          )}
        </div>
        {/* Ubicación */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5">
          <h4 className="text-base font-semibold text-gray-800 mb-3">
            Ubicación
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-sm text-gray-500">Ciudad</div>
            <div className="col-span-2 text-sm text-gray-800">
              {location?.city || "—"}
            </div>

            <div className="text-sm text-gray-500">Dirección</div>
            <div className="col-span-2 text-sm text-gray-800">
              {location?.address || "—"}
            </div>

            <div className="text-sm text-gray-500">Referencia</div>
            <div className="col-span-2 text-sm text-gray-800">
              {location?.reference || "—"}
            </div>

            <div className="text-sm text-gray-500">¿Cómo encontrarnos?</div>
            <div className="col-span-2 text-sm text-gray-800">
              {location?.howToFind || "—"}
            </div>

            <div className="text-sm text-gray-500">Aforo</div>
            <div className="col-span-2 text-sm text-gray-800">
              {location?.capacity || "—"}
            </div>
          </div>
        </section>
        {/* Entradas */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5">
          <h4 className="text-base font-semibold text-gray-800 mb-3">
            Entradas
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-sm text-gray-500">Moneda</div>
            <div className="col-span-2 text-sm text-gray-800">
              {tickets?.currency || "—"}
            </div>

            <div className="text-sm text-gray-500">Límite por usuario</div>
            <div className="col-span-2 text-sm text-gray-800">
              {tickets?.maxPerUser || "—"}
            </div>

            <div className="text-sm text-gray-500">Fin de venta</div>
            <div className="col-span-2 text-sm text-gray-800">
              {tickets?.endSaleWhen === "termino"
                ? "Hasta que termine el evento"
                : tickets?.endSaleWhen === "inicio"
                ? "Hasta el inicio del evento"
                : tickets?.endSaleWhen === "2dias"
                ? "2 días antes del evento"
                : tickets?.endSaleWhen || "—"}
            </div>

            <div className="text-sm text-gray-500">Venta escalonada</div>
            <div className="col-span-2 text-sm text-gray-800">
              {tickets?.tier?.enabled
                ? `Sí — ${tickets.tier.qty || "0"} entradas ${
                    tickets.tier.period
                  }`
                : "No"}
            </div>
          </div>

          <div className="mt-3">
            {" "}
            {(tickets?.items || []).length === 0 ? (
              <div className="text-sm text-gray-500">Sin tipos de entrada.</div>
            ) : (
              <div className="overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="text-left px-3 py-2">Tipo</th>
                      <th className="text-left px-3 py-2">Cantidad</th>
                      <th className="text-left px-3 py-2">Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.items.map((it, i) => (
                      <tr key={i} className="border-t">
                        <td className="px-3 py-2">{it.type || "—"}</td>
                        <td className="px-3 py-2">{it.quantity || "—"}</td>
                        <td className="px-3 py-2">{it.price || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
        {/* Política de devoluciones */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5">
            <h4 className="text-base font-semibold text-gray-800 mb-3">Política de devoluciones</h4>
            <div className="text-sm text-gray-800 whitespace-pre-wrap">
            {returnsPolicy?.text || "—"}
            </div>
            <div className="mt-2 text-xs text-gray-600">
            Archivo: {returnsPolicy?.file ? returnsPolicy.file.name : "—"}
            </div>
        </section>
      </div>
    );
  }
}
