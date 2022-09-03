import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./OTPVerification.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import AuthPageContainer from "@/components/AuthPageContainer/AuthPageContainer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginWithOTPCode } from "@/redux/Auth/AuthSlice";

import { useForm, Controller } from "react-hook-form";
import { loginWithOTPCodeValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import siteLogo from "@/assets/images/logo.png";
import OTPComponent from "@/components/OTP/OTP";

const OTPVerification = () => {

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);

  const { user } = useParams();


  const resolver = yupResolver(loginWithOTPCodeValidationSchema);

  const defaultValues = {
    otp: ""
  };

  const { handleSubmit, formState: { errors }, setValue, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  const handleLogin = async (data) => {
    console.log(data);
    const response = await dispatch(loginWithOTPCode({ payload: data, user: params.user }));
    console.log(response);
    if (response?.payload?.success) {
      toast.success(response?.payload?.message);
      reset();
      // user === "teacher" ? navigate(`/select-class/${user}/`) : user === "guardian" ? navigate(`/select-ward/${user}/`) :  navigate(`/${user}/dashboard`);

      user === "teacher" ? navigate(`/select-class/${user}/`) : user === "guardian" ? navigate(`/select-ward/${user}/`) :  navigate(`/select-institution/${user}/`);
    } else {
      toast.error(response.payload.error);
    }
  };
  const handleInputChange = (e) => {
    console.log(e);
    setValue("otp", e);
  };

  return (
    <AuthPageContainer>
      <section className={cx(styles.otpVerificationContainer, "flexCol")}>

        <div>
          <img src={siteLogo} alt="" />
        </div>

        <h3>OTP Verification</h3>

        <div className={cx(styles.formWrapper, "flexCol")}>
          <form
            onSubmit={handleSubmit((data) => handleLogin(data))}
          >

            <div>
              <Controller
                name="otp"
                control={control}
                render={({ field, ref }) => (
                  <OTPComponent
                    {...field}
                    numberOfInputs={6}
                    handleInputChange={handleInputChange}
                  />
                )}
              />
              {errors?.otp && <small style={{ marginTop: "1rem" }}>{errors?.otp?.message}</small>}
            </div>




            {/* <small style={{marginTop: "2rem"}}>Timer here - 40secs</small> */}

            <div className={cx(styles.submitBtnDiv, "flexRow")}>
              <Button loading={loading} disabled={loading} onClick={handleSubmit((data) => handleLogin(data))} title="Login" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#D25B5D" />
            </div>

            <Button onClick={() => navigate(-1)} title="Back" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#D25B5D" />

            {/* <p>Don't get OTP? <Link to="#">Resend OTP</Link></p> */}

          </form>
        </div>

      </section>
    </AuthPageContainer>
  );
};

OTPVerification.propTypes = {
  title: PropTypes.string
};

export default OTPVerification;