import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import { Link, useNavigate, Navigate, useParams } from "react-router-dom";
import cx from "classnames";
import styles from "./LoginWithClassCode.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import AuthPageContainer from "@/components/AuthPageContainer/AuthPageContainer";
import PageContainer from "@/components/PageContainer/PageContainer";

import { isAuthenticated, decodeToken, getToken } from "@/utils/auth";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {loginWithClassCode} from "@/redux/Auth/AuthSlice";

import { useForm, Controller } from "react-hook-form";
import { loginWithClassCodeValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import qrCode from "@/assets/images/qrCode.png";

const LoginWithClassCodeComponent = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const isOTPVerified = localStorage.getItem("userData")?.hasverifiedotp;

  const checkIsAuthenticated = isAuthenticated();

  useEffect(() => {
    checkIsAuthenticated && isOTPVerified && navigate("/student/dashboard");
  }, [checkIsAuthenticated, isOTPVerified, navigate]);

  const signIn= async (data)=>{
    let response = await dispatch(loginWithClassCode({code: data?.accessCode}));
    console.log(response);
    if(response.payload.success){
      navigate("/select-account/student", {state: {payload: response.payload.students}});
    }
  };

  const resolver = yupResolver(loginWithClassCodeValidationSchema);

  const defaultValues = {
    accessCode: ""
  };
  
  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all"  });

  return (
    <>
      {checkIsAuthenticated && isOTPVerified ? <Navigate replace to={"/student/dashboard"} /> :
        <>
          <AuthPageContainer>

            <div className={cx(styles.loginWithCodeWrapper, "row")}>

              <div className={cx(styles.leftCol, "flexCol", "col-md-5")}>
                <img src={qrCode} alt="img" />
                <p>Scan QR Code</p>
              </div>

              <div className={cx(styles.middleCol, "flexCol", "col-md-2")}>
                <p>or</p>
              </div>

              <section className={cx(styles.rightCol, "col-md-5", "flexCol")}>
								
                <form onSubmit={handleSubmit((data) => signIn(data))} 
                  className={cx("flexCol")}
                >
                  <Controller
                    name="accessCode"
                    control={control}
                    render={({ field, ref }) => (
                      <InputField
                        {...field}
                        label={"Enter Access Code"}
                        placeholder=""
                        type="text"
                        error={errors?.accessCode && errors?.accessCode?.message}
												
                      />
                    )}
                  />

                  <div onClick={handleSubmit((data) => signIn(data))}  className={cx(styles.submitBtnDiv, "flexRow-fully-centered")}>
                    <Button loading={loading} disabled={loading} title="Sign In" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#D25B5D"  />
                  </div>

                  {/* <p className={cx(styles.formText)}>Don't have an account? <Link to="/signup">Sign Up</Link></p> */}

                </form>
							
              </section>
            </div>

						
          </AuthPageContainer>
        </>
      }
    </>	
  );
};

LoginWithClassCodeComponent.propTypes = {
  title: PropTypes.string
};

export default LoginWithClassCodeComponent;