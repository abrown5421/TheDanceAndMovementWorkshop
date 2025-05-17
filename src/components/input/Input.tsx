import React, { useState } from "react";
import clsx from "clsx";
import type { InputProps } from "./inputTypes";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error = false,
      helperText,
      startAdornment,
      endAdornment,
      onStartAdornmentClick,
      onEndAdornmentClick,
      type = "text",
      className = "",
      min = 0,
      max = 0,
      fillSpace = false,
      ...rest
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState(rest.value ?? "");

    const isActive = focused || (rest.value && rest.value !== '');

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      rest.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      rest.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      rest.onChange?.(e);
    };
    
    return (
      <div className={clsx(
        "w-full relative bg-inherit",
        fillSpace ? "flex flex-1" : "mb-5"
      )}>
        <div
          className={clsx(
            "relative flex items-center rounded border px-3 pb-2 pt-2 w-full transition-all",
            error
              ? "border-red-500 focus-within:ring-2 focus-within:ring-red-300"
              : "border-gray-300 focus-within:ring-2 focus-within:ring-blue-300",
            className
          )}
        >
          {label && (
            <label
              className={clsx(
                "absolute text-sm transition-all duration-200 px-1",
                isActive
                  ? "bg-white text-xs -top-3 left-2 text-blue-400"
                  : "bg-inherit text-sm top-2.5 left-3 text-gray-500"
              )}
            >
              {label}
            </label>
          )}
          {startAdornment && (
            <div
              className="mr-2 cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={onStartAdornmentClick}
            >
              {startAdornment}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            value={value}
            className="flex-1 bg-transparent outline-none text-gray-900 placeholder-transparent text-sm pt-1"
            placeholder={label}
            min={min}
            max={max}
            onKeyDown={(e) => {
            if (
            type === "number" &&
              !["ArrowUp", "ArrowDown", "Tab", "Shift", "Control"].includes(e.key)
              ) {
              e.preventDefault();
            }
            }}
            {...rest}
          />
          {endAdornment && (
            <div
              className="ml-2 cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={onEndAdornmentClick}
            >
              {endAdornment}
            </div>
          )}
        </div>
        {helperText && error && (
          <p className="mt-1 text-xs text-red-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
