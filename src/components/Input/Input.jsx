import React, { useState, useEffect } from "react";
import { FormGroup } from "../Styles";
import eyeIcon from "@/assets/icons/eye.svg";
import searchIcon from "@/assets/icons/search-icon.svg";

const Input = ({
  label,
  placeholder,
  required,
  type = "text",
  onChange,
  error,
  icon,
  suffixIcon,
  marginbottom,
  border,
  onBlur,
  ...props
}) => {
  const [inputType, setInputType] = useState(type);
  const [isActive, setIsActive] = useState(false);
  const handleTextChange = (e)=>{
    e.target.value !== "" ? setIsActive(true) : setIsActive(false);
  };
  const handleVisibility = () => {
    if (inputType === "password") {
      return setInputType("text");
    }
    return setInputType("password");
  };

  useEffect(() => {
    props.value !== "" && setIsActive(true);
  },[props.value]);

  return (
    <FormGroup marginbottom={marginbottom || "2rem"} border={border || "#DBDDE0"} required={required}>
      <div className="input-container">
        {icon && <img src={searchIcon} alt="search icon" />}
        <input
          type={inputType}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          onBlur = {(e)=>handleTextChange(e)}
          {...props}
          // autoComplete="new-password"
          autoComplete="none"

        />
        <label  onClick={(e)=>handleTextChange(e)} className={isActive ? "Active" : ""}>{label}</label>
        {type === "password" && (
          <img src={eyeIcon} alt="eye-icon" className="eye-icon" onClick={handleVisibility}/>
        )}
        {suffixIcon && suffixIcon}
      </div>
      {error ? <span className="error">{error}</span> : ""}
    </FormGroup>
  );
};

export default Input;
