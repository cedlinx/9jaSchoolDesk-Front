import React from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./OTPVerification.module.scss";
import Button from "@/components/Button/Button";
import AuthPageContainer from "@/components/AuthPageContainer/AuthPageContainer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginWithOTPCode, logout } from "@/redux/Auth/AuthSlice";

import { useForm, Controller } from "react-hook-form";
import { loginWithOTPCodeValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import siteLogo from "@/assets/images/logo.png";
import OTPComponent from "@/components/OTP/OTP";

import { setToken } from "@/utils/auth";

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
    const response = await dispatch(loginWithOTPCode({ payload: data, user: params.user }));

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
    setValue("otp", e);
  };

  const handleBack =()=>{
    dispatch(logout());
    navigate(-1);
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

            <div className={cx(styles.submitBtnDiv, "flexRow")}>
              <Button loading={loading} disabled={loading} onClick={handleSubmit((data) => handleLogin(data))} title="Login" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#D25B5D" />
            </div>

            <Button onClick={() => handleBack()} title="Back" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#D25B5D" />

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