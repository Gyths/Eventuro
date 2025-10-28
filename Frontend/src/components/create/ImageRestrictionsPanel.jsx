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
      <FormField label="Imagen principal * (836 px x 522 px)">
        <ImageDropzone
          file={form.imageFile}
          onFile={handleFile}
          previewUrl={imagePreview} 
          accept="image/*"
          className="h-[320px] md:h-[250px]"
        />
      </FormField>
      
      <FormField label="Banner (1200 px x 300 px)">
        <ImageDropzone
          file={form.bannerFile}
          onFile={handleSecondaryFile}
          previewUrl={bannerPreview} 
          accept="image/*"
          className="h-[220px] md:h-[200px] border-dashed border-2 border-gray-300 rounded-lg"
        />
      </FormField>

      <FormField label="Restricción *">
        <Restrictions value={restrictions} onChange={onChangeRestrictions} />
      </FormField>
    </div>
  );
}