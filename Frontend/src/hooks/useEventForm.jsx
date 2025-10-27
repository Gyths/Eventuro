import { useState, useEffect } from "react";
import useObjectURL from "./useObjectURL";

export default function useEventForm() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    extraInfo: "",
    restrictions: { general: false, conUnAdulto: false, soloAdultos: false }, 
    imageFile: null,
    bannerFile: null,
    imagePrincipalKey: null, 
    imageBannerKey: null,
    imagePrincipalURL: null, 
    imageBannerURL: null,
  });

  const updateForm = (patch) => setForm((f) => ({ ...f, ...patch }));
  const updateRestrictions = (patch) => setForm((f) => ({ ...f, restrictions: { ...f.restrictions, ...patch } }));

  // Previsualización de archivos locales (si se sube uno nuevo)
  const localImagePreview = useObjectURL(form.imageFile);
  const localBannerPreview = useObjectURL(form.bannerFile);

  // Lógica para determinar la URL final de previsualización:
  // Si hay un archivo local, usa su URL. Si no, usa la URL copiada.
  const imagePreview = form.imageFile ? localImagePreview : form.imagePrincipalURL;
  const bannerPreview = form.bannerFile ? localBannerPreview : form.imageBannerURL;

  return { form, updateForm, updateRestrictions, imagePreview, bannerPreview };
}