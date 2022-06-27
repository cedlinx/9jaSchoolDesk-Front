import React, {useState} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux";
import cx from "classnames";
import styles from "./ForgotPassword.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import AuthPageContainer from "@/components/AuthPageContainer/AuthPageContainer";
import PageContainer from "@/components/PageContainer/PageContainer";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {forgotPassword} from "@/redux/Auth/AuthSlice";

import { useForm, Controller } from "react-hook-form";
import { forgotPasswordValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import siteLogo from "@/assets/images/Logo.png";


const ForgotPassword = () => {

  const dispatch = useDispatch();

  const sendRequest =(data)=>{
    dispatch(forgotPassword(data));
  };

  const resolver = yupResolver(forgotPasswordValidationSchema);

  const defaultValues = {
    email: ""
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all"  });

  return (
    <AuthPageContainer>
      <section className={cx(styles.forgotPasswordContainer, "flexCol")}>

        <div>
          <img src={siteLogo} alt="" />
        </div>

        <h3>Forgot Password</h3>

        <div className={cx(styles.formWrapper, "flexCol")}>
          <form
            onSubmit={handleSubmit((data) => sendRequest(data))}
            className=""
          >

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  label={"Enter email used to create account"}
                  placeholder=""
                  type="email"
                  error={errors?.email && errors?.email?.message}
									
                />
              )}
            />

            <div onClick={handleSubmit((data) => sendRequest(data))} className={cx(styles.submitBtnDiv, "flexRow")}>
              <Button title="Reset Password" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#D25B5D" />
            </div>

            <p className={cx(styles.formText)}>Don't have an account? <Link to="/signup">Sign Up</Link></p>

          </form>
        </div>

      </section>
    </AuthPageContainer>
  );
};

ForgotPassword.propTypes = {
  title: PropTypes.string
};

export default ForgotPassword;