/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";
import "./Select.scss";

const Select = ({
  options,
  defaultSelect,
  name,
  onChange,
  value,
  label,
  error,
  required,
  marginbottom,
  disabled
}) => (
  <div style={{marginBottom: marginbottom || "1rem"}} className="select-container">
    <div className="select-wrapper" >
      <label className="select-label">{label}</label>
      <select disabled={disabled} required={required} name={name} onChange={onChange} value={value}>
        <option value="">{defaultSelect}</option>
        {options.map((option, index) => (
          <option value={option.value} key={index}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
    <span className="select-error">{error}</span>
  </div>
);

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  defaultSelect: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Select.defaultProps = {
  options: [],
  defaultSelect: "Select",
  name: "",
  onChange: () => {},
  value: ""
};

export default Select;
