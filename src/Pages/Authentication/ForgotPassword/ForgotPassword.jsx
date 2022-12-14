import React, {useState} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import cx from "classnames";
import styles from "./ForgotPassword.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import AuthPageContainer from "@/components/AuthPageContainer/AuthPageContainer";

import {forgotPassword} from "@/redux/Auth/AuthSlice";

import { useForm, Controller } from "react-hook-form";
import { forgotPasswordValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import siteLogo from "@/assets/images/logo.png";
import useGetUser from "@/utils/useGetUser";
import { titleCase } from "@/helpers/textTransform";


const ForgotPassword = () => {

  const dispatch = useDispatch();
  const user = useGetUser();
  const loading = useSelector((state) => state.auth.loading);

  const sendRequest =async (data)=>{
    let response = await dispatch(forgotPassword({user: user, payload: data}));
    if(response?.payload?.success){
      reset();
    }
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
        <small>{titleCase(user)}</small>

        <div className={cx(styles.formWrapper, "flexCol")}>
          <form
            onSubmit={handleSubmit((data) => sendRequest(data))}
            className=""
          >

            <Controller
              name="email"
              control={control}
              render={({ field, ref }) => (
                <InputField
                  {...field}
                  label={"Enter email used to create account"}
                  placeholder=""
                  type="email"
                  error={errors?.email && errors?.email?.message}
									
                />
              )}
            />

            <div className={cx(styles.submitBtnDiv, "flexRow")}>
              <Button  type="submit" onClick={handleSubmit((data) => sendRequest(data))} loading={loading} disabled={loading} title="Request Reset Link" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#D25B5D" />
            </div>

            {user === "guardian" && <p className={cx(styles.formText)}>Don&apos;t  have an account? <Link to={`/pre-signup/${user}`}>Sign Up</Link></p>}

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