import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import cx from "classnames";
import styles from "./Mosque.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import Tabs from "@/components/Tabs/Tabs.jsx";

import SelectField from "@/components/Select/Select";
import AuthPageContainer from "@/components/AuthPageContainer/AuthPageContainer";
import PageContainer from "@/components/PageContainer/PageContainer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signUp } from "@/redux/User/user.action";

import { useForm, Controller } from "react-hook-form";
import { signUpValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import siteLogo from "@/assets/images/Logo.png";
import curvedHamburgerFlipped from "@/assets/icons/curved-hamburger-flipped.svg";
import TopDivWave from "@/components/WaveSvg/TopDivWave";
import sendOtpBtn from "@/assets/images/send-otp-btn.svg";

const MosqueSignUp = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const signUpSuccess = useSelector((state) => state.user.signUpData);

  useEffect(() => {
    // signUpSuccess && navigate("/login");
    signUpSuccess && reset();
  }, [signUpSuccess]);

  const resolver = yupResolver(signUpValidationSchema);

  const defaultValues = {
    email: "",
    name: "",
    password: "",
    password_confirmation: "",
    address: "",
    phone: "",
    pin: ""
    // accountType: ""
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  // const selectOptions = [        
  // 	{label:"Account One", value:"Account One"},
  // 	{label:"Account Two", value:"Account Two"},
  // 	{label:"Account Three", value:"Account Three"},
  // 	{label:"Account Four", value:"Account Four"},
  // 	{label:"Account Five", value:"Account Five"}
  // ];

  const createUser = async (data) => {
    const response = await dispatch(signUp(data));
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
    <div className={cx(styles.signUpWrapper)} >
      <TopDivWave />
      <small className={cx("flexRow-fully-centered")}>*Sign Up as Mosque Leader</small>
      <div className={cx(styles.container, "row")}>
        <div className={cx(styles.leftCol, "col-md-6")}>
          <h3><span className={cx(styles.wordBreak)}>Sign <img className={cx(styles.floatingIcon)} src={curvedHamburgerFlipped} alt="icon" /></span> Up</h3>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis odio tempora cupiditate, iure consequatur molestias, nulla aut vel suscipit a ab dolore sunt quos minima ad alias ullam architecto aliquam?</p>
        </div>

        <section className={cx(styles.rightCol, "col-md-6", "flexCol")}>

          <div>
            <img src={siteLogo} alt="" />
          </div>
          <div className={cx(styles.formWrapper, "flexCol")}>
            <form onSubmit={handleSubmit((data) => createUser(data))}
              className="form"
            >
              <small>Let us verify your email</small>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <InputField
                    {...field} 
                    placeholder={" "}
                    label={"Enter Email"}
                    type="email"
                    error={errors?.email && errors?.email?.message}

                  />
                )}
              />

              <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                  <InputField
                    {...field} 
                    placeholder={" "}
                    label={"Enter OTP sent to email"}
                    type="number"
                    error={errors?.otp && errors?.otp?.message}
                    suffixIcon={<img style={{cursor: "pointer", width: "4.5rem"}} src={sendOtpBtn} alt="sendOtpBtn" />}
                  />
                )}
              />

              <p className={cx(styles.resetOTPLink)}>Resend OTP</p>
              {/* <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field} 
                  placeholder={" "}
                  label={"Full Name"}
                  type="text"
                  error={errors?.name && errors?.name?.message}

                />
              )}
            />

            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label={"Gender"}
                  type="text"
                  required={true}
                  error={errors?.gender && errors?.gender?.message}
                  options={getGenderOptions()}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field} 
                  placeholder={" "}
                  label={"Password"}
                  type="password"
                  error={errors?.password && errors?.password?.message}

                />
              )}
            />

            <Controller
              name="password_confirmation"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field} 
                  placeholder={" "}
                  label={"Confirm Password"}
                  type="password"
                  error={errors?.password_confirmation && errors?.password_confirmation?.message}

                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field} 
                  placeholder={" "}
                  label={"Mobile Number"}
                  type="number"
                  error={errors?.phone && errors?.phone?.message}

                />
              )}
            />

            <Controller
              name="addressLine1"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field} 
                  placeholder={" "}
                  label={"Address Line 1"}
                  type="text"
                  error={errors?.addressLine1 && errors?.addressLine1?.message}

                />
              )}
            />

            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field} 
                  placeholder={" "}
                  label={"City"}
                  type="text"
                  error={errors?.city && errors?.city?.message}

                />
              )}
            />

            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field} 
                  placeholder={" "}
                  label={"State"}
                  type="text"
                  error={errors?.state && errors?.state?.message}

                />
              )}
            />

            <Controller
              name="zipCode"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field} 
                  placeholder={" "}
                  label={"Zip Code"}
                  type="number"
                  error={errors?.zipCode && errors?.zipCode?.message}

                />
              )}
            />

            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field} 
                  placeholder={" "}
                  label={"Country"}
                  type="text"
                  error={errors?.country && errors?.country?.message}

                />
              )}
            /> */}


       

              <div className={cx(styles.submitBtnDiv, "flexRow")}>
                <Button onClick={handleSubmit((data) => createUser(data))} type title="Next" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#D25B5D" />
              </div>

              <p className={cx(styles.formText)}>Already have an account? <Link to="/login" state={{category: "administrator"}}>Sign In</Link></p>
            
            </form>
          </div>

        </section>
      </div>
    
    </div>
  );
};

MosqueSignUp.propTypes = {
  title: PropTypes.string
};

export default MosqueSignUp;