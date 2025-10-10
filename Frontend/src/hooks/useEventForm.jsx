import { useState } from "react";
import useObjectURL from "./useObjectURL";

export default function useEventForm() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    extraInfo: "",
    restrictions: { general: false, withAdult: false, adultsOnly: false },
    imageFile: null,
  });

  const updateForm = (patch) => setForm((f) => ({ ...f, ...patch }));
  const updateRestrictions = (patch) => setForm((f) => ({ ...f, restrictions: { ...f.restrictions, ...patch } }));

  const imagePreview = useObjectURL(form.imageFile);

  return { form, updateForm, updateRestrictions, imagePreview };
}
