import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import { Link, useNavigate, Navigate } from "react-router-dom";
import cx from "classnames";
import styles from "./LoginWithClassCode.module.scss";
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

const LoginWithClassCode = () => {

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
			{checkIsAuthenticated ? <Navigate replace to="/individual-dashboard" /> : 
				<>
					<PageContainer>

						<div className={cx(styles.loginWrapper, "row")}>

							<div className={cx(styles.leftCol, "col-md-5")}>
								<img src="" alt="img" />
								<p>Scan QR Code</p>
							</div>

							<div className={cx(styles.middleCol, "col-md-2")}>
								<p>or</p>
							</div>



							<section className={cx(styles.rightCol, "col-md-5", "flexCol")}>
								
								<div className={cx(styles.formWrapper, "flexCol")}>
									<form onSubmit={handleSubmit((data) => signIn(data))} 
										className="form flex text-white homepage-mc-form"
									>
										<Controller
											name="accessCode"
											control={control}
											render={({ field }) => (
												<InputField
													{...field}
													label={"Access Code"}
													placeholder=""
													type="text"
													error={errors?.accessCode && errors?.accessCode?.message}
												
												/>
											)}
										/>

										<div onClick={handleSubmit((data) => signIn(data))}  className={cx(styles.submitBtnDiv, "flexRow")}>
											<Button title="Sign In" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#D25B5D"  />
										</div>

										<p>Don't have an account? <Link to="/signup">Sign Up</Link></p>

									</form>
								</div>
								<p className="main-caption">Enter Class Code</p>

							</section>
						</div>

						
					</PageContainer>
				</>
			}
		</>	
	);
};

LoginWithClassCode.propTypes = {
	title: PropTypes.string
};

export default LoginWithClassCode;