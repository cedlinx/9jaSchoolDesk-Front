import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import cx from "classnames";
import styles from "./PreSignUp.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import Tabs from "@/components/Tabs/Tabs.jsx";

import SelectField from "@/components/Select/Select";
import AuthPageContainer from "@/components/AuthPageContainer/AuthPageContainer";
import PageContainer from "@/components/PageContainer/PageContainer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { proprietorSignUp } from "@/redux/Auth/AuthSlice";

import { useForm, Controller } from "react-hook-form";
import { preSignUpValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import siteLogo from "@/assets/images/Logo.png";
import curvedHamburgerFlipped from "@/assets/icons/curved-hamburger-flipped.svg";
import TopDivWave from "@/components/WaveSvg/TopDivWave";
import sendOtpBtn from "@/assets/images/send-otp-btn.svg";
import {getOTP, verifyOTP} from "@/redux/Auth/AuthSlice";



const PreSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const verifyOTPData = useSelector((state) => state?.auth?.verifyOTPData);
  const [emailValue, setEmailValue] = useState("");
  const params = useParams();
  const user = params?.user;
  console.log(verifyOTPData);

  useEffect(() => {
    if (verifyOTPData.success) {
      toast.success(verifyOTPData.message);
      navigate(`/signup/${user}`, { state: { email: emailValue } });
    }
  }, [emailValue, navigate, user, verifyOTPData]);


  const resolver = yupResolver(preSignUpValidationSchema);

  const defaultValues = {
    email: "",
    otp: ""
  };

  const { handleSubmit, formState: { errors }, control, reset, setValue } = useForm({ defaultValues, resolver, mode: "all" });

  const sendRequest = (data) => {
    dispatch(verifyOTP(data));
    // navigate(`/signup/${user}`);
  };

  const requestOTP = () => {
    dispatch(getOTP({payload: {email: emailValue}, user:user}));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    name === "email" && setEmailValue(value);
    setValue(e.target.name, e.target.value);
  };

  const handleNumberInputChange = (e, inputName) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    setValue(inputName, value);
  };

  return (
    <AuthPageContainer showTopDivWave={false}>
      <div className={cx(styles.preSignUpWrapper)} >
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
              <form onSubmit={handleSubmit((data) => sendRequest(data))}>
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
                      suffixIcon={<img style={{cursor: "pointer", width: "4.5rem"}} src={sendOtpBtn} onClick={()=>requestOTP()} alt="sendOtpBtn" />}
                      onChange={(e) => handleInputChange(e)}
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
                      type="text"
                      error={errors?.otp && errors?.otp?.message}
                      
                      onChange={(e) => handleNumberInputChange(e, "otp")}
                      maxLength={6}
                    />
                  )}
                />

              
                <div className={cx(styles.submitBtnDiv, "flexRow")}>
                  <Button onClick={handleSubmit((data) => sendRequest(data))} type title="Next" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#D25B5D" />
                </div>

                <p className={cx(styles.resetOTPLink)}>Resend OTP</p>

                <p className={cx(styles.formText)}>Already have an account? <Link to={`/login/${user}`} state={{category: "proprietor"}}>Sign In</Link></p>
              
              </form>
            </div>

          </section>
        </div>
			
      </div>
    </AuthPageContainer>
  );
};

PreSignUp.propTypes = {
  title: PropTypes.string
};

export default PreSignUp;