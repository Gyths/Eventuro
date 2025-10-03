import React from "react";

export default function TermsServicesCheckbox({ handleTermsChange = null }) {
  const [isChecked, setIsChecked] = React.useState(true);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (handleTermsChange != null) handleTermsChange(isChecked);
  };

  return (
    <div className="flex items-center gap-2 w-full max-w-l rounded p-2">
      <input
        id="terms-check-box"
        type="checkbox"
        className="h-5 w-5 cursor-pointer"
        onChange={handleCheckboxChange}
      />
      <label htmlFor="terms-check-box" className="text-sm">
        He leído y acepto los {" (*) "}
        <span className="font-semibold">Términos y Condiciones</span> y la
        {" (*) "}
        <span className="font-semibold">Política de Privacidad</span>
      </label>
    </div>
  );
}
