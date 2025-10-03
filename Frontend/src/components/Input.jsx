export default function FormsInput({
  id,
  type = "",
  name = "",
  labelText = "",
  placeholder = "",
  maxLength = "",
  size = "",
  pattern = "",
  onChange = null,
  onFocus = null,
  isRequired = false,
}) {
  return (
    <label htmlFor={id} className="flex flex-col px-10 gap-2">
      {labelText}
      <input
        id={id}
        type={type}
        name={name}
        className="flex w-full bg-gray-100 rounded-lg px-4 py-3 border border-gray-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
        placeholder={placeholder}
        maxLength={maxLength}
        size={size}
        pattern={pattern}
        onChange={onChange}
        onFocus={onFocus}
        required={isRequired}
      ></input>
    </label>
  );
}
