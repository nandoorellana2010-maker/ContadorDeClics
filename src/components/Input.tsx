import type { InputProps } from "../types/InputProps"

const Input: React.FC<InputProps> = ({
    value = '',
    onChange,
    label,
    type = 'text',
    placeholder,
    min,
    max,
    ariaLabel,
}) => {
    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        aria-label={ariaLabel ?? label}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        type={type}
        value={value}
        placeholder={placeholder}
        min={min}
        max={max}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
        </div>
    );
};
export default Input;