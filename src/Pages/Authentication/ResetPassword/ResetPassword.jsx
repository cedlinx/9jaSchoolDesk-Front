import React, {useState} from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import cx from "classnames";
import styles from "./ResetPassword.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import AuthPageContainer from "@/components/AuthPageContainer/AuthPageContainer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {resetPassword} from "@/redux/Auth/AuthSlice";

import { useForm, Controller } from "react-hook-form";
import { resetPasswordValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import siteLogo from "@/assets/images/logo.png";
import { titleCase } from "@/helpers/textTransform";

const ResetPassword = () => {

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const [verificationResponse, setVerificationResponse] = useState("");

  const resolver = yupResolver(resetPasswordValidationSchema);

  const defaultValues = {
    email: "",
    password: "",
    password_confirmation: ""
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all"  });

  const handleReset = async (data)=>{
    const response = await dispatch(resetPassword({user: params.user, payload: data, token: params.token}));
    console.log(response);
    if(response?.payload?.success){
      toast.success("You will be redirected to the login page in 5 seconds");
      setTimeout(()=>{
        navigate(`/login/${params?.user}`);
      }, 5000);
    }
  };

  return (
    <AuthPageContainer>
      <section className={cx(styles.resetPasswordContainer, "flexCol")}>

        <div>
          <img src={siteLogo} alt="" />
        </div>

        <h3>Reset Password</h3>
        <small style={{marginTop: "-2rem"}}>{titleCase(params?.user)}</small>

        <div className={cx(styles.formWrapper, "flexCol")}>
          <form
            onSubmit={handleSubmit((data) => handleReset(data))}
            className=""
          >

            <Controller
              name="email"
              control={control}
              render={({ field, ref }) => (
                <InputField
                  {...field}
                  label={"Email Address"}
                  placeholder=""
                  type="email"
                  error={errors?.email && errors?.email?.message}
									
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field, ref }) => (
                <InputField
                  {...field}
                  label={"Enter New Password"}
                  placeholder=""
                  type="password"
                  error={errors?.password && errors?.password?.message}
									
                />
              )}
            />

            <Controller
              name="password_confirmation"
              control={control}
              render={({ field, ref }) => (
                <InputField
                  {...field}
                  label={"Confirm New Password"}
                  placeholder=""
                  type="password"
                  error={errors?.password_confirmation && errors?.password_confirmation?.message}
									
                />
              )}
            />

            <div className={cx(styles.submitBtnDiv, "flexRow")}>
              <Button type="submit" loading={loading} disabled={loading}  onClick={handleSubmit((data) => handleReset(data))} title="Reset Password" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#D25B5D" />
            </div>

            <p><Link to={`/login/${params?.user}`}>Sign In</Link> to continue</p>

          </form>
        </div>

      </section>
    </AuthPageContainer>
  );
};

ResetPassword.propTypes = {
  title: PropTypes.string
};

export default ResetPassword;