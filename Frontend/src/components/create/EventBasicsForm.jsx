import { useEffect, useState } from "react";
import FormField from "./FormField";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import TextArea from "./TextArea";

import {BASE_URL} from "../../config.js"

export default function EventBasicsForm({ form, onChange }) {
  const [categories, setCategories] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [errorCats, setErrorCats] = useState(null);

  useEffect(() => {
    let abort = false;

    (async () => {
      try {
        setLoadingCats(true);
        setErrorCats(null);

        const res = await fetch(`${BASE_URL}/eventuro/api/event-category/`);
        const payload = await res.json();

        if (abort) return;

        // Soporta estructura con o sin "category"
        const parsed = (payload ?? [])
          .map((it) => (it?.category ? it.category : it))
          .map((c) => ({
            value: Number(c.eventCategoryId), // lo que se guarda
            label: String(c.description).trim(), // lo que se muestra
          }));

        setCategories([
          {
            value: "",
            label: "Elige una Categoría para el evento",
            disabled: true,
          },
          ...parsed,
        ]);
      } catch (err) {
        if (!abort) setErrorCats(err.message || "Error cargando categorías");
      } finally {
        if (!abort) setLoadingCats(false);
      }
    })();

    return () => {
      abort = true;
    };
  }, []);

  return (
    <div className="space-y-6">
      <FormField
        label="Nombre del Evento*"
        hint="Recomendación: Ingrese un nombre llamativo y corto"
      >
        <TextInput
          placeholder="Recomendación: Ingrese un nombre llamativo y corto"
          value={form.name}
          onChange={(v) => onChange({ name: v })}
        />
      </FormField>

      <FormField label="Elige una Categoría*">
        <SelectInput
        placeholder="Elige una Categoría para el evento"
        value={form.category || ""}
        onChange={(v) => onChange({ category: v })}
        options={categories}
        />
      </FormField>

      <FormField label="Descripción del Evento*">
        <TextArea
          placeholder="Escribe un párrafo que describa sobre que trata tu evento."
          value={form.description}
          onChange={(v) => onChange({ description: v })}
        />
      </FormField>

      <FormField label="Información adicional">
        <TextArea
          placeholder="Escribe un párrafo que describa sobre que trata tu evento."
          value={form.extraInfo}
          onChange={(v) => onChange({ extraInfo: v })}
        />
      </FormField>
    </div>
  );
}
