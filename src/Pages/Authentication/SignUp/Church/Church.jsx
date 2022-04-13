import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import cx from "classnames";
import styles from "./Church.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import Tabs from "@/components/Tabs/Tabs.jsx";

import SelectField from "@/components/Select/Select";
import AuthPageContainer from "@/components/AuthPageContainer/AuthPageContainer";
import PageContainer from "@/components/PageContainer/PageContainer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signUp } from "@/redux/User/user.action";

import { useForm, Controller } from "react-hook-form";
import { signUpValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import siteLogo from "@/assets/images/Logo.svg";


const ChurchSignUp = () => {
	const dispatch = useDispatch();
	// const navigate = useNavigate();
	const signUpSuccess = useSelector((state) => state.user.signUpData);

	useEffect(() => {
		// signUpSuccess && navigate("/login");
		signUpSuccess && reset();
	}, [signUpSuccess]);

	const resolver = yupResolver(signUpValidationSchema);

	const defaultValues = {
		email: "",
		name: "",
		password: "",
		password_confirmation: "",
		address: "",
		phone: "",
		pin: ""
		// accountType: ""
	};

	const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

	// const selectOptions = [        
	// 	{label:"Account One", value:"Account One"},
	// 	{label:"Account Two", value:"Account Two"},
	// 	{label:"Account Three", value:"Account Three"},
	// 	{label:"Account Four", value:"Account Four"},
	// 	{label:"Account Five", value:"Account Five"}
	// ];

	const createUser = async (data) => {
		const response = await dispatch(signUp(data));
		if (response.payload.status === 201) {
			toast.success("Account created successfully. Please Login");
			reset();
		} else {
			dispatch({
				type: "USER_INIT_STATE"
			});
		}
	};

	return (
		<div className={cx(styles.signUpWrapper, "row")} >
			<div className={cx(styles.leftCol, "col-md-6")}>
				<h3>Sign Up</h3>
				<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis odio tempora cupiditate, iure consequatur molestias, nulla aut vel suscipit a ab dolore sunt quos minima ad alias ullam architecto aliquam?</p>
			</div>

			<section className={cx(styles.contentWrapper, "col-md-6", "flexCol")}>

				<div>
					<img src={siteLogo} alt="" />
				</div>
				<div className={cx(styles.formWrapper, "flexCol")}>
					<form onSubmit={handleSubmit((data) => createUser(data))}
						className="form"
					>

						<Controller
							name="email"
							control={control}
							render={({ field }) => (
								<InputField
									{...field} 
									placeholder={" "}
									label={"Email Address"}
									type="email"
									error={errors?.email && errors?.email?.message}

								/>
							)}
						/>

						<Controller
							name="name"
							control={control}
							render={({ field }) => (
								<InputField
									{...field} 
									placeholder={" "}
									label={"Full Name"}
									type="text"
									error={errors?.name && errors?.name?.message}

								/>
							)}
						/>

						<Controller
							name="accountType"
							control={control}
							render={({ field }) => (
								<SelectField
									{...field}
									label={"Account Type"}
									type="text"
									required={true}
									error={errors?.accountType && errors?.accountType?.message}
									options={[]}
								/>
							)}
						/>

						<Controller
							name="password"
							control={control}
							render={({ field }) => (
								<InputField
									{...field} 
									placeholder={" "}
									label={"Password"}
									type="password"
									error={errors?.password && errors?.password?.message}

								/>
							)}
						/>

						<Controller
							name="password_confirmation"
							control={control}
							render={({ field }) => (
								<InputField
									{...field} 
									placeholder={" "}
									label={"Confirm Password"}
									type="password"
									error={errors?.password_confirmation && errors?.password_confirmation?.message}

								/>
							)}
						/>

						<Controller
							name="pin"
							control={control}
							render={({ field }) => (
								<InputField
									{...field} 
									placeholder={" "}
									label={"Pin"}
									type="number"
									error={errors?.pin && errors?.pin?.message}

									maxLength="4"
								/>
							)}
						/>

						<Controller
							name="address"
							control={control}
							render={({ field }) => (
								<InputField
									{...field} 
									placeholder={" "}
									label={"Address"}
									type="text"
									error={errors?.address && errors?.address?.message}

								/>
							)}
						/>

						<Controller
							name="phone"
							control={control}
							render={({ field }) => (
								<InputField
									{...field} 
									placeholder={" "}
									label={"Mobile Number"}
									type="number"
									error={errors?.phone && errors?.phone?.message}

								/>
							)}
						/>

						<div className={cx(styles.submitBtnDiv, "flexRow")}>
							<Button onClick={handleSubmit((data) => createUser(data))} type title="Sign Up" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#D25B5D" />
						</div>

						<p>Already have an account? <Link to="/login">Sign In</Link></p>

					</form>
				</div>

			</section>
		</div>
	);
};

ChurchSignUp.propTypes = {
	title: PropTypes.string
};

export default ChurchSignUp;