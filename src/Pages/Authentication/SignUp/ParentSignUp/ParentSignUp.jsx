import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import cx from "classnames";
import styles from "./ParentSignUp.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import Tabs from "@/components/Tabs/Tabs.jsx";

import SelectField from "@/components/Select/Select";
import AuthPageContainer from "@/components/AuthPageContainer/AuthPageContainer";
import PageContainer from "@/components/PageContainer/PageContainer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parentSignUp } from "@/redux/Auth/AuthSlice";

import { useForm, Controller } from "react-hook-form";
import { signUpValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import siteLogo from "@/assets/images/Logo.png";
import curvedHamburgerFlipped from "@/assets/icons/curved-hamburger-flipped.svg";
import TopDivWave from "@/components/WaveSvg/TopDivWave";



const ParentSignUp = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const signUpSuccess = useSelector((state) => state?.auth?.signUpData);

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

  const getGenderOptions = () => {
    return(
      [
        { label: "Male",
          value: "Male" },
        { label: "Female",
          value: "Female" }
      ]
    );
  };
  return (
    <AuthPageContainer showTopDivWave={false}>
      <div className={cx(styles.parentSignUpWrapper)} >
        <TopDivWave />

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
                className={cx("flexCol")}
              >

                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      {...field} 
                      placeholder={" "}
                      label={"First Name"}
                      type="text"
                      error={errors?.firstName && errors?.firstName?.message}

                    />
                  )}
                />

                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      {...field} 
                      placeholder={" "}
                      label={"Last Name"}
                      type="text"
                      error={errors?.lastName && errors?.lastName?.message}

                    />
                  )}
                />

                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      {...field} 
                      placeholder={" "}
                      label={"Email"}
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

                {/* <Controller
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
              /> */}

                {/* <Controller
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
              /> */}
                {/* 
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
              /> */}
                {/* 
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
              /> */}

                {/* <Controller
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
              /> */}

                {/* <Controller
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
                  <Button onClick={handleSubmit((data) => createUser(data))} type title="Sign Up" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#D25B5D" />
                </div>

                <p className={cx(styles.formText)}>Already have an account? <Link to="/login" state={{category: "parent"}}>Sign In</Link></p>
              
              </form>
            </div>

          </section>
        </div>
			
      </div>
    </AuthPageContainer>
  );
};

ParentSignUp.propTypes = {
  title: PropTypes.string
};

export default ParentSignUp;