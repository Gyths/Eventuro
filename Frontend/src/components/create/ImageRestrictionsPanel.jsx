import FormField from "./FormField";
import ImageDropzone from "./ImageDropzone";
import Restrictions from "./Restrictions";

export default function ImageRestrictionsPanel({
  form,
  onChange,
  restrictions,
  onChangeRestrictions,
  imagePreview,
  bannerPreview,
}) {
  const handleFile = (file) => {
    if (!file) return;
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("Solo se permiten archivos de imagen (JPG, PNG o WEBP).");
      return;
    }
    onChange({ imageFile: file });
  };

  const handleSecondaryFile = (file) => {
    if (!file) return;
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("Solo se permiten archivos de imagen (JPG, PNG o WEBP).");
      return;
    }
    onChange({ bannerFile: file });
  };

  return (
    <div className="space-y-6">
      {/* Primer FormField con ImageDropzone */}
      <FormField label="Imagen principal * (836 px x 522 px)">
        <ImageDropzone
          file={form.imageFile}
          onFile={handleFile}
          accept="image/*"
          className="h-[320px] md:h-[250px]"
        />
        {imagePreview && (
          <p className="mt-2 text-xs text-gray-500 truncate">
            Previsualización activa
          </p>
        )}
      </FormField>

      {/* Segundo ImageDropzone agregado entre los dos campos */}
      <FormField label="Banner (1200 px x 300 px)">
        <ImageDropzone
          file={form.bannerFile}
          onFile={handleSecondaryFile}
          accept="image/*"
          className="h-[220px] md:h-[200px] border-dashed border-2 border-gray-300 rounded-lg"
        />
        {bannerPreview && (
          <p className="mt-2 text-xs text-gray-500 truncate">
            Previsualización activa
          </p>
        )}
      </FormField>

      {/* Campo de restricciones */}
      <FormField label="Restricción *">
        <Restrictions value={restrictions} onChange={onChangeRestrictions} />
      </FormField>
    </div>
  );
}
