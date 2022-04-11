import React, {useState} from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import cx from "classnames";
import styles from "./ResetPassword.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import AuthPageContainer from "@/components/AuthPageContainer/AuthPageContainer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {resetPassword} from "@/redux/User/user.action";

import { useForm, Controller } from "react-hook-form";
import { resetPasswordValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

const ResetPassword = () => {

	const dispatch = useDispatch();
	const params = useParams();
	const navigate = useNavigate();
	const [verificationResponse, setVerificationResponse] = useState("");

	const sendRequest =(data)=>{
		dispatch(resetPassword(data));
	};

	const resolver = yupResolver(resetPasswordValidationSchema);

	const defaultValues = {
		email: "",
		password: "",
		password_confirmation: ""
	};

	const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all"  });

	const handleReset = async (data)=>{
		const response = await dispatch(resetPassword({...data, token: params.token}));
		const message = response.payload.data.message;
		if (message.includes("successful")) {
			toast.success(`${response.payload.data.message}. Kindly Login`);
			reset();
		} else {
			toast.error(response.payload.data.message);
		}
	};

	return (
		<AuthPageContainer>
			<section className={cx(styles.container, "flexCol")}>

				<h2>Reset Password</h2>
				<p className="main-caption">Gain Access To Your Account</p>

				<div className={cx(styles.formWrapper, "flexCol")}>
					<form
						onSubmit={handleSubmit((data) => handleReset(data))}
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

						<Controller
							name="password"
							control={control}
							render={({ field }) => (
								<InputField
									{...field}
									label={"Password"}
									placeholder=""
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
									label={"Confirm Password"}
									placeholder=""
									type="password"
									error={errors?.password_confirmation && errors?.password_confirmation?.message}
									
								/>
							)}
						/>

						<div className={cx(styles.submitBtnDiv, "flexRow")}>
							<Button onClick={handleSubmit((data) => handleReset(data))} title="Submit" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#2C0085" />
						</div>

						<p>Don't have an account? <Link to="/signup">Sign Up</Link></p>

						<p><Link to="/login">Sign In</Link> to continue</p>

					</form>
				</div>

			</section>
		</AuthPageContainer>
	);
};

ResetPassword.propTypes = {
	title: PropTypes.string
};

export default ResetPassword;