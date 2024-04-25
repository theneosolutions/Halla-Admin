import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function InputField(props: {
  id: string;
  label: string;
  extra?: string;
  placeholder: string;
  variant?: string;
  state?: string;
  value?: string;
  disabled?: boolean;
  type?: string;
  onChange?: any;
}) {
  const {
    label,
    id,
    extra,
    type,
    placeholder,
    variant,
    state,
    disabled,
    onChange,
    value
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`${extra}`}>
      <label
        htmlFor={id}
        className={`text-sm text-navy-700 dark:text-white ${variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"
          }`}
      >
        {label}
      </label>
      <div className="relative">
        <input
          onChange={onChange}
          disabled={disabled}
          type={showPassword ? 'text' : type}
          id={id}
          value={value}
          placeholder={placeholder}
          className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${disabled === true
            ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
            : state === "error"
              ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
              : state === "success"
                ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
                : "border-gray-200 dark:!border-white/10 dark:text-white"
            }`}
        />

        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
          >
            {showPassword ? (
              <FaEye />
            ) : (
              <FaEyeSlash />
            )}
          </button>
        )}


      </div>
    </div>
  );
}

export default InputField;
