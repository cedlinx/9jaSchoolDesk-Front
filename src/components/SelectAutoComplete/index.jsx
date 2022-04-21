import React from "react";
import Select from "react-select";
import Creatable from "react-select/creatable";

import styled from "styled-components";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const customStyles = {
   
  control: () => ({
    backgroundColor: "#f4f5f7",
    border: "1px solid #c1c7d0",
    display: "flex",
    borderRadius: "4px",
    padding: "10px 14px"
  }),
    

  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "blue" : "black",
    backgroundColor: state.isSelected ? "#f4f5f7" : "transparent",
    backgroundColor: state.isFocused ? "#f4f5f7" : "transparent",
    padding: "10px",
    cursor: "pointer"
  }),
   
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
  placeholder: () => ({
    fontSize: "16px",
    color: "gray"
  })
};
  
const SelectFieldContainer = styled.div`
  margin: 15px 0;
  height: fit-content;
  width: 100%;
`;

const SelectAutoComplete = (props) => {

  const { 
    error,
    label,
    helperText,
    options,
    placeholder,
    onChange,
    value,
    name,
    onBlur,
    isMulti,
    isCreatable
  } = props;
    
  return (
    <SelectFieldContainer>
      <span className="text-label">{label}</span>

      {isCreatable ? <Creatable
        styles={customStyles}
        components={animatedComponents}
        name={name}
        onChange={onChange}
        options={options}
        onBlur={onBlur}
        isClearable
        isMulti={isMulti}
        placeholder={placeholder}
        value={value}
      /> :
        <Select
          styles={customStyles}
          components={animatedComponents}
          name={name}
          onChange={onChange}
          options={options}
          onBlur={onBlur}
          isClearable
          placeholder={placeholder}
          value={value}
        /> }
      {error && <span className="text-error">{error}</span>}
      {helperText && <span className="text-helper">{helperText}</span>}
    </SelectFieldContainer>
  );
};

export default SelectAutoComplete;