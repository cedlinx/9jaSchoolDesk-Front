import React from "react";
import { FormGroup, StyledTextArea } from "../Styles"; 

const TextArea = ({ label, placeholder, required, type, onChange, error, ...props }) => {
  return (
    <FormGroup required={required}>
      <label>{label}</label>
      <StyledTextArea
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        {...props}
      />
      {error ? <p className="error">{error}</p> : ""}
    </FormGroup>
  );
};

export default TextArea;
