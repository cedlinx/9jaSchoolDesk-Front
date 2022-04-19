import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import { Link, useNavigate, Navigate } from "react-router-dom";
import cx from "classnames";
import styles from "./Login.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import AuthPageContainer from "@/components/AuthPageContainer/AuthPageContainer";
import PageContainer from "@/components/PageContainer/PageContainer";

import { isAuthenticated, decodeToken, getToken } from "@/utils/auth";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {loginUser, getUserInfo} from "@/redux/User/user.action";

import { useForm, Controller } from "react-hook-form";
import { signInValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import curvedHamburgerFlipped from "@/assets/icons/curved-hamburger-flipped.svg";


import siteLogo from "@/assets/images/Logo.svg";

const Login = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const checkIsAuthenticated = isAuthenticated();

	useEffect(() => {
		checkIsAuthenticated &&	navigate("/individual-dashboard"); 
	},[checkIsAuthenticated, navigate]);

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
			{checkIsAuthenticated ? <Navigate replace to="#" /> : 
				<>
					<AuthPageContainer>

						<div className={cx(styles.loginWrapper, "row")}>

							<div className={cx(styles.leftCol, "col-md-6")}>
								<h3><span className={cx(styles.wordBreak)}>Sign <img className={cx(styles.floatingIcon)} src={curvedHamburgerFlipped} alt="icon" /></span> In</h3>
								<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis odio tempora cupiditate, iure consequatur molestias, nulla aut vel suscipit a ab dolore sunt quos minima ad alias ullam architecto aliquam?</p>
							</div>

							<section className={cx(styles.rightCol, "col-md-6", "flexCol")}>
								
								<img className={styles.logo} src={siteLogo} alt="" />
								
								<div className={cx(styles.formWrapper, "flexCol")}>
									<form onSubmit={handleSubmit((data) => signIn(data))} 
										className=""
									>
										<Controller
											name="email"
											control={control}
											render={({ field }) => (
												<InputField
													{...field}
													label={"Email"}
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
											{/* <div className={cx(styles.checkboxDiv, "flexRow-left-centered")}>
												<input type="checkbox" /> Remember Me
											</div> */}
											<Link to='/forgot-password'>Forgot Password</Link>
										</div>

										<div onClick={handleSubmit((data) => signIn(data))}  className={cx(styles.submitBtnDiv, "flexRow")}>
											<Button title="Sign In" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#D25B5D"  />
										</div>
										<p>
											<Link to="/login-with-class-code">Login With Class Code</Link>
										</p>
										

										<p>Don't have an account? <Link to="/signup">Sign Up</Link></p>

									</form>
								</div>

							</section>
						</div>

						
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