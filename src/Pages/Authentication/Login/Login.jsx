import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, Navigate, useParams } from "react-router-dom";
import cx from "classnames";
import styles from "./Login.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import AuthPageContainer from "@/components/AuthPageContainer/AuthPageContainer";

import { isAuthenticated, decodeToken, getToken } from "@/utils/auth";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, logout } from "@/redux/Auth/AuthSlice";

import { useForm, Controller } from "react-hook-form";
import { signInValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import curvedHamburgerFlipped from "@/assets/icons/curved-hamburger-flipped.svg";


import siteLogo from "@/assets/images/logo.png";
import { titleCase } from "@/helpers/textTransform";


const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useParams();

  const isOTPVerified = JSON.parse(localStorage.getItem("userData"))?.hasverifiedotp;
  const userRole = JSON.parse(localStorage.getItem("userData"))?.role.toLowerCase();
  const loading = useSelector((state) => state?.auth?.loading);

  const checkIsAuthenticated = isAuthenticated();

  useEffect(() => {
    if(user === "undefined"){
      navigate("/");
      return;
    }
    checkIsAuthenticated && userRole === user && navigate(`/${user}/dashboard`);
    checkIsAuthenticated && !userRole === user && <Navigate to={`/login/${user}`} state={{ from: location }} />;
  }, [checkIsAuthenticated, isOTPVerified, navigate, user, userRole]);

  const signIn = async (data) => {
 
    let response = await dispatch(login({payload:  {email: data.email, password: data.password}, user: user}));
    
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
      {checkIsAuthenticated && userRole === user ? <Navigate replace to={`/${user}/dashboard`} /> :
        <>
          <AuthPageContainer>

            <div className={cx(styles.loginWrapper, "row")}>

              <div className={cx(styles.leftCol, "col-md-6")}>
                <h3><span className={cx(styles.wordBreak)}>Sign <img className={cx(styles.floatingIcon)} src={curvedHamburgerFlipped} alt="icon" /></span> In</h3>
                <p>Securely manage your schools from anywhere, automate, workload, and so much more!</p>
              </div>

              <section className={cx(styles.rightCol, "col-md-6", "flexCol")}>

                <img className={styles.logo} src={siteLogo} alt="" />
                <small style={{marginTop: "-1.75rem"}}>{titleCase(user)}</small>

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
                      <Button type="submit" onClick={handleSubmit((data) => signIn(data))} loading={loading} disabled={loading} title="Sign In" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#D25B5D" />
                      <Button onClick={() => handleBack()} title="Back" borderRadiusType="lowRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" />
                    </div>
                    {/* <p className={cx(styles.formText)}>
                      <Link to="/login-with-class-code">Login With Class Code</Link>
                    </p> */}

                    {/* {user === "guardian" && 
                    <p className={cx(styles.formText)}>Don't have an account? <Link to="/guardian-signup">Sign Up</Link></p> } */}

 
                    { user === "guardian" || user === "proprietor" ?  <p className={cx(styles.formText)}>Don&apos;t have an account? <Link to={`/pre-signup/${user}`}>Sign Up</Link></p> : null}

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