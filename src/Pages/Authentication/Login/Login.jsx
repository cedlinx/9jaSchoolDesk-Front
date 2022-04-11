import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import { Link, useNavigate, Navigate } from "react-router-dom";
import cx from "classnames";
import styles from "./Login.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import AuthPageContainer from "@/components/AuthPageContainer/AuthPageContainer";
import { isAuthenticated, decodeToken, getToken } from "@/utils/auth";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {loginUser, getUserInfo} from "@/redux/User/user.action";

import { useForm, Controller } from "react-hook-form";
import { signInValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

const Login = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const checkIsAuthenticated = isAuthenticated();

	useEffect(() => {
		checkIsAuthenticated &&	navigate("/individual-dashboard"); 
	},[]);

	const signIn= async (data)=>{
		try {
			let response = await dispatch(loginUser(data));
			if(response?.payload?.status === 200){
				dispatch(getUserInfo());
				navigate("/individual-dashboard");
			}
		} catch (error) {
			toast.error("An Error Occured, please try again");
		}
	};

	const resolver = yupResolver(signInValidationSchema);

	const defaultValues = {
		email: "",
		password: ""
	};
  
	const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all"  });

	return (
		<>
			{checkIsAuthenticated ? <Navigate replace to="/individual-dashboard" /> : 
				<>
					<AuthPageContainer>
						<ToastContainer />
						<section className={cx(styles.container, "flexCol")}>
							<h2>Sign In</h2>
							<p className="main-caption">Login To Access Your Account</p>

							<div className={cx(styles.formWrapper, "flexCol")}>
								<form onSubmit={handleSubmit((data) => signIn(data))} 
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

									<div className={cx(styles.forgotPasswordWrapper, "flexRow")}>
										<div className={cx(styles.checkboxDiv, "flexRow-left-centered")}>
											<input type="checkbox" /> Remember Me
										</div>
										<Link to='/forgot-password'>Forget Password</Link>
									</div>

									<div onClick={handleSubmit((data) => signIn(data))}  className={cx(styles.submitBtnDiv, "flexRow")}>
										<Button title="Sign In" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#2C0085"  />
									</div>

									<p>Don't have an account? <Link to="/signup">Sign Up</Link></p>

								</form>
							</div>

						</section>
					</AuthPageContainer>
				</>
			}
		</>	
	);
};

Login.propTypes = {
	title: PropTypes.string
};

export default Login;