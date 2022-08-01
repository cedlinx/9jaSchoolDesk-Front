import React from "react";
import cx from "classnames";
import {useNavigate, Link, useParams} from "react-router-dom";
import styles from "./StepOne.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import curvedHamburgerFlipped from "@/assets/icons/curved-hamburger-flipped.svg";

import { useForm, Controller } from "react-hook-form";
import { stepOneValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import "react-phone-number-input/style.css";
import PhoneInput, {isValidPhoneNumber } from "react-phone-number-input";
import "./PhoneInput.scss";


const StepOne = ({ nextStep, handleFormData, values, signUpEmail }) => {
  const navigate = useNavigate();
  const { user } = useParams();

  const resolver = yupResolver(stepOneValidationSchema);
  console.log(signUpEmail);
  const defaultValues = {
    email: signUpEmail || values.email,
    firstName: values.firstName,
    lastName: values.lastName,
    otherNames: values.otherNames,
    phone: values.phone,
    password: values.password,
    password_confirmation: values.password_confirmation
  };
    
  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all"  });

  const register = (data) => {
    handleFormData(data);
    nextStep();
  };

  return (
    <div className={cx(styles.signUpWrapper, "flexCol")}>
      <div className={cx(styles.container, "row")}>
        <div className={cx(styles.leftCol, "col-md-6")}>
          <h3><span className={cx(styles.wordBreak)}>Sign <img className={cx(styles.floatingIcon)} src={curvedHamburgerFlipped} alt="icon" /></span> Up</h3>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis odio tempora cupiditate, iure consequatur molestias, nulla aut vel suscipit a ab dolore sunt quos minima ad alias ullam architecto aliquam?</p>
        </div>

        <section className={cx(styles.rightCol, "col-md-6", "flexCol")}>
          <div className={cx(styles.formWrapper, "flexRow")}>
            <form onSubmit={handleSubmit((data) => register(data))}
              className={cx("flexCol")}
            >
              <div className={cx(styles.formInputsContainer, "flexRow")}>

                <div className={cx(styles.maxWidth)}>
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
                </div>

                <div className={cx(styles.inputWrapper)}>
                  <Controller
                    className={cx(styles.controller)}
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
                </div>
               
                <div className={cx(styles.inputWrapper)}>
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
                </div>

                <div className={cx(styles.inputWrapper)}>
                  <Controller
                    name="otherNames"
                    control={control}
                    render={({ field }) => (
                      <InputField
                        {...field} 
                        placeholder={" "}
                        label={"Other Names"}
                        type="text"
                        error={errors?.otherNames && errors?.otherNames?.message}

                      />
                    )}
                  />
                </div>
               
                <div className={cx(styles.inputWrapper)}>
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
                </div>

                <div className={cx(styles.inputWrapper)}>
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
                </div>

                <div className={cx(styles.inputWrapper, "PhoneInputWrapper")}>
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <PhoneInput
                        placeholder="Enter phone number"
                        {...field}
                        international
                        countryCallingCodeEditable={false}
                        defaultCountry="NG"
                      />
                    )}
                  />
                  {errors?.phoneNumber && <small>{errors?.phoneNumber?.message}</small> }
                </div>

              </div>

              <div className={cx(styles.submitBtnDiv, "flexRow")}>
                <Button onClick={()=>navigate(`/login/${user}`)} title="Cancel" borderRadiusType="lowRounded" bordercolor="transparent" textColor="#f4f4f4" bgColor="gray" hoverColor="#1A3B4A" hoverBg="#f4f4f4" />
        
                <Button onClick={handleSubmit((data) => register(data))} title="Continue" borderRadiusType="lowRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="transparent" hoverColor="#000"   />
              </div>

              <p className={cx(styles.formText)}>Already have an account? <Link to={`/login/${user}`} state={{category: user}}>Sign In</Link></p>
              
            </form>
          </div>

        </section>
      </div>
    </div>
  );
};

export default StepOne;