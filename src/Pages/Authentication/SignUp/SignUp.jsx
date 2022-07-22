import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import cx from "classnames";
import styles from "./SignUp.module.scss";
import Tabs from "@/components/Tabs/Tabs.jsx";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";

import AuthPageContainer from "@/components/AuthPageContainer/AuthPageContainer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useForm, Controller } from "react-hook-form";
import { signUpValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import siteLogo from "@/assets/images/Logo.png";
import curvedHamburgerFlipped from "@/assets/icons/curved-hamburger-flipped.svg";
import TopDivWave from "@/components/WaveSvg/TopDivWave";
import sendOtpBtn from "@/assets/images/send-otp-btn.svg";

import MultiStepForm from "@/components/MultiStepForm/MultiStepForm";

const SignUp = () => {

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const location = useLocation();
  const signUpEmail = location?.state?.email;

  const resolver = yupResolver(signUpValidationSchema);

  const defaultValues = {
    email: "",
    name: "",
    password: "",
    password_confirmation: "",
    addressLine1: "",
    state: "",
    zipCode: "",
    city: "",
    phone: "",
    country: "",
    gender: ""
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  const createUser = async (data) => {
    const response = await dispatch(signUp(data));
    console.log(response);
    if (response.payload.status === 201) {
      toast.success("Account created successfully. Please Login");
      reset();
    } else {
      dispatch({
        type: "USER_INIT_STATE"
      });
    }
  };

  return (
    <AuthPageContainer showTopDivWave={false}>
      <div className={cx(styles.signUpWrapper)} >
        <TopDivWave />
        <MultiStepForm signUpEmail={signUpEmail} />			
      </div>
			
    </AuthPageContainer>
  );
};

SignUp.propTypes = {
  title: PropTypes.string
};

export default SignUp;