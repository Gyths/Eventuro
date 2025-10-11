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
  const handleFile = (file) => {
    if (!file) return;
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("⚠️ Solo se permiten archivos de imagen (JPG, PNG o WEBP).");
      return;
    }
    onChange({ imageFile: file });
  };

  return (
    <div className="space-y-6">
      <FormField label="Imagen * (836 px x 522 px)">
        <ImageDropzone
          file={form.imageFile}
          onFile={handleFile}
          accept="image/*" // <- filtro visual
          className="h-[320px] md:h-[360px]"
        />
        {imagePreview && (
          <p className="mt-2 text-xs text-gray-500 truncate">
            Previsualización activa
          </p>
        )}
      </FormField>

      <FormField label="Restricción *">
        <Restrictions value={restrictions} onChange={onChangeRestrictions} />
      </FormField>
    </div>
  );
}
