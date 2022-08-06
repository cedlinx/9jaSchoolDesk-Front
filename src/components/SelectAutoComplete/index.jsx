import React from "react";
import Select from "react-select";
import Creatable from "react-select/creatable";

import styled from "styled-components";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const customStyles = {
   
  control: () => ({
    // backgroundColor: "#f4f5f7",
    // border: "1px solid #c1c7d0",
    display: "flex",
    borderRadius: "2rem",
    padding: "0rem"
  }),

  valueContainer: (base) => ({
    ...base,
    padding: "0.25rem 0rem 0.25rem 1rem",
    margin: "0px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    borderRadius: "4px",
    // backgroundColor: "#f4f5f7",
    overflowY: "auto",
    height: "2.75rem",
    fontSize: "1rem"
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
  margin: 0rem 0rem 1.5rem 0rem;
  height: fit-content;
  width: 100%;
  padding: 0rem 0rem;
  border-radius: 2rem;
  border: 1px solid #DBDDE0;
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
    <>
      <SelectFieldContainer>
        <span style={{fontSize: "0.875rem", margin: "0rem", padding: "0rem", lineHeight: "1"}} >{label}</span>

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
            isMulti={isMulti}
            placeholder={placeholder}
            value={value}
          /> }
        {/* {error && <span className="text-error">{error}</span>} */}
        {helperText && <span className="text-helper">{helperText}</span>}
      </SelectFieldContainer>
      {error && <span style={{fontSize: "0.875rem", color: "tomato", position: "relative", top: "-2rem"}}>{error}</span>}
    </>
  );
};

export default SelectAutoComplete;