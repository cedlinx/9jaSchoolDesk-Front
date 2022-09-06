import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, Navigate, useLocation, useParams } from "react-router-dom";
import cx from "classnames";
import styles from "./Login.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import AuthPageContainer from "@/components/AuthPageContainer/AuthPageContainer";
import PageContainer from "@/components/PageContainer/PageContainer";

import { isAuthenticated, decodeToken, getToken } from "@/utils/auth";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, logout } from "@/redux/Auth/AuthSlice";

import { useForm, Controller } from "react-hook-form";
import { signInValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import curvedHamburgerFlipped from "@/assets/icons/curved-hamburger-flipped.svg";


import siteLogo from "@/assets/images/logo.png";

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {user} = useParams();
  const rootPath = location.pathname.split("/")[1];
  const actualPath = location.pathname.split("/").pop();
  const isOTPVerified = localStorage.getItem("userData")?.hasverifiedotp;
  const loading = useSelector((state) => state?.auth?.loading);
  console.log(loading, "loading state");

  const checkIsAuthenticated = isAuthenticated();

  useEffect(() => {
    if(user === "undefined"){
      navigate("/");
      return;
    }
    checkIsAuthenticated && isOTPVerified && navigate(`/${user}/dashboard`);
  }, [checkIsAuthenticated, isOTPVerified, navigate, user]);

  const signIn = async (data) => {
 
    let response = await dispatch(login({payload:  {email: data.email, password: data.password}, user: user}));
    console.log(response);
    console.log(response?.payload);
    if (response?.payload?.success) {
      toast.success(response?.payload?.message);
      // dispatch(getUserInfo());
      navigate("otp-verification", { state: { email: data.email } });
    }
  
  };

  const resolver = yupResolver(signInValidationSchema);

  const defaultValues = {
    email: "",
    password: ""
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  const handleBack =()=>{
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      {checkIsAuthenticated && isOTPVerified ? <Navigate replace to={`/${user}/dashboard`} /> :
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
                      render={({ field, ref }) => (
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
                      render={({ field, ref }) => (
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
                      <Link to={`/${user}/forgot-password`}>Forgot Password</Link>
                    </div>

                    <div  className={cx(styles.submitBtnDiv, "flexCol")}>
                      <Button onClick={handleSubmit((data) => signIn(data))} loading={loading} disabled={loading} title="Sign In" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#D25B5D" />
                      <Button onClick={() => handleBack()} title="Back" borderRadiusType="lowRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" />
                    </div>
                    {/* <p className={cx(styles.formText)}>
                      <Link to="/login-with-class-code">Login With Class Code</Link>
                    </p> */}

                    {/* {user === "guardian" && 
                    <p className={cx(styles.formText)}>Don't have an account? <Link to="/guardian-signup">Sign Up</Link></p> } */}

 
                    { user === "guardian" || user === "proprietor" ?  <p className={cx(styles.formText)}>Don&apos;t have an account? <Link to={`/pre-signup/${user}`}>Sign Up</Link></p> : null }

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