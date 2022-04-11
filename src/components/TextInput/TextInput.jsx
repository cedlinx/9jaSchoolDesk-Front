import React from "react";
// import FormError from 'components/Errors/FormError';
import "./TextInput.scss";

export default function TextInput({
  label,
  placeholder,
  onChange,
  errorMessage,
  onBlur,
  name,
  value,
  containerClassName,
}) {
  return (
    <div className={`form-group text-area-wrapper ${containerClassName}`}>
      <label htmlFor="text-area-component">{label}</label>
      <textarea
        className="form-control"
        id="text-area-component"
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        onBlur={onBlur}
        value={value}
      />
      {/* <FormError errorMessage={errorMessage} /> */}
    </div>
  );
}
