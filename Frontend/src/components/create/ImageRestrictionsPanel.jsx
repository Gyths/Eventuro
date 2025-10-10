import FormField from "./FormField";
import ImageDropzone from "./ImageDropzone";
import Restrictions from "./Restrictions";


export default function ImageRestrictionsPanel({
form,
onChange,
restrictions,
onChangeRestrictions,
imagePreview,
}) {
return (
<div className="space-y-6">
<FormField label="Imagen * (836 px x 522 px)">
<ImageDropzone
file={form.imageFile}
onFile={(file) => onChange({ imageFile: file })}
className="h-[320px] md:h-[360px]"
/>
{/* Si ya tienes el nombre debajo de la previsualización en ImageDropzone, esto es opcional */}
{imagePreview && (
<p className="mt-2 text-xs text-gray-500 truncate">Previsualización activa</p>
)}
</FormField>


<FormField label="Restricción *">
<Restrictions value={restrictions} onChange={onChangeRestrictions} />
</FormField>
</div>
);
}