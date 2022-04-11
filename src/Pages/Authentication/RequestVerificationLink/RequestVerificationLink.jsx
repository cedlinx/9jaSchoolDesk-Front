import React, {useState} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux";
import cx from "classnames";
import styles from "./RequestVerificationLink.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import AuthPageContainer from "@/components/AuthPageContainer/AuthPageContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {requestVerificationLink} from "@/redux/User/user.action";

import { useForm, Controller } from "react-hook-form";
import { requestVerificationLinkValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

const verificationLink = () => {

	const dispatch = useDispatch();

	const resolver = yupResolver(requestVerificationLinkValidationSchema);

	const defaultValues = {
		email: ""
	};

	const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all"  });

	const sendRequest =(data)=>{
		dispatch(requestVerificationLink(data));
	};

	return (
		<AuthPageContainer>
			<ToastContainer />
			<section className={cx(styles.container, "flexCol")}>

				<h2>Request New Verification Link</h2>
				<p className="main-caption">Gain Access To Your Account</p>

				<div className={cx(styles.formWrapper, "flexCol")}>
					<form
						onSubmit={handleSubmit((data) => sendRequest(data))}
						className="form flex text-white homepage-mc-form"
					>

						<Controller
							name="email"
							control={control}
							render={({ field }) => (
								<InputField
									{...field}
									label={"Email Address"}
									placeholder=""
									type="email"
									error={errors?.email && errors?.email?.message}
									
								/>
							)}
						/>

						<div onClick={handleSubmit((data) => sendRequest(data))} className={cx(styles.submitBtnDiv, "flexRow")}>
							<Button title="Submit" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#2C0085" />
						</div>

						<p>Don't have an account? <Link to="/signup">Sign Up</Link></p>

					</form>
				</div>

			</section>
		</AuthPageContainer>
	);
};

verificationLink.propTypes = {
	title: PropTypes.string
};

export default verificationLink;