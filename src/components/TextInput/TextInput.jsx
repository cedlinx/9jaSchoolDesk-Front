import React from "react";
import "./TextInput.scss";

export default function TextInput({
  label,
  placeholder,
  onChange,
  error,
  onBlur,
  name,
  value,
  containerClassName,
  marginbottom,
  readonly,
  defaultValue
}) {
  return (
    <div style={{marginBottom: marginbottom}} className={`form-group text-area-wrapper ${containerClassName}`}>
      {label && <label htmlFor="text-area-component">{label}</label>}
      <textarea
        className="form-control"
        id="text-area-component"
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        onBlur={onBlur}
        value={value}
        readOnly={readonly}
        defaultValue={defaultValue}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
