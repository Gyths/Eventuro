import FormField from "./FormField";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import TextArea from "./TextArea";


export default function EventBasicsForm({ form, onChange }) {
return (
<div className="space-y-6">
<FormField label="Nombre del Evento*" hint="Recomendación: Ingrese un nombre llamativo y corto">
<TextInput
placeholder="Recomendación: Ingrese un nombre llamativo y corto"
value={form.name}
onChange={(v) => onChange({ name: v })}
/>
</FormField>


<FormField label="Elige una Categoría">
<SelectInput
placeholder="Elige una Categoría para el evento"
value={form.category}
onChange={(v) => onChange({ category: v })}
options={[
{ value: "", label: "Elige una Categoría para el evento", disabled: true },
{ value: "música", label: "Música" },
{ value: "teatro", label: "Teatro" },
{ value: "conferencia", label: "Conferencia" },
{ value: "deportes", label: "Deportes" },
]}
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