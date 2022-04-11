import React, { useState } from "react";
import { FormGroup } from "../Styles";
import eyeIcon from "@/assets/icons/eye.svg";
import searchIcon from "@/assets/icons/search-icon.svg";
import PropTypes from "prop-types";

const Input = ({
	label,
	placeholder,
	required,
	type = "text",
	onChange,
	error,
	icon,
	marginbottom,
	border,
	onBlur,
	...props
}) => {
	const [inputType, setInputType] = useState(type);
	const [isActive, setIsActive] = useState(false);
	// const [value, setValue] = useState("");
	console.log(props);
	const handleTextChange = (e)=>{
		console.log(e.target.value);
		e.target.value !== "" ? setIsActive(true) : setIsActive(false);
		// setValue(e.target.value);
	};
	// console.log(value);
	const handleVisibility = () => {
		if (inputType === "password") {
			return setInputType("text");
		}
		return setInputType("password");
	};

	return (
		<FormGroup marginbottom={marginbottom || "1.5rem"} border={border || "#2C0085"} required={required}>
			<div className="input-container">
				{icon && <img src={searchIcon} alt="search icon" />}
				<input
					type={inputType}
					placeholder={placeholder}
					required={required}
					onChange={onChange}
					onBlur = {(e)=>handleTextChange(e)}
					// value={value}
					// onChange={(e) => handleTextChange(e.target.value)}
					{...props}
				/>
				<label  onClick={(e)=>handleTextChange(e)} className={isActive ? "Active" : ""}>{label}</label>
				{type === "password" && (
					<img src={eyeIcon} alt="eye-icon" className="eye-icon" onClick={handleVisibility}/>
				)}
			</div>
			{error ? <p className="error">{error}</p> : ""}
		</FormGroup>
	);
};

export default Input;
