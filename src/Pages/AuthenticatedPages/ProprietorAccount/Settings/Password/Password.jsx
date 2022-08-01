import React, {useEffect, useState, useCallback} from "react";
import cx from "classnames";
import styles from "./Password.module.scss";

import {useDispatch, useSelector} from "react-redux";
import InputField from "@/components/Input/Input";
import SelectField from "@/components/Select/Select";
import Button from "@/components/Button/Button";
import { useDropzone } from "react-dropzone";
import { Icon } from "@iconify/react";

import { useForm, Controller } from "react-hook-form";
import { changePasswordValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import { changePassword } from "@/redux/Auth/AuthSlice";
import useGetUser from "@/utils/useGetUser";

const Password = () => {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const user = useGetUser();

  const resolver = yupResolver(changePasswordValidationSchema);

  const defaultValues = {
    password: "",
    password_confirmation: "",
    current_password: ""
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  const submitRequest = (data) => {
    dispatch(changePassword({user: user, payload: data}));
  };

  return (
    <div className={cx(styles.settingsTabItemContainer)}>
      <div className={cx(styles.panelContent, "flexCol")}>
        <div className={cx(styles.header)}>
          <h3>Password</h3>
          <small>Please enter your current password to change your password.</small>
        </div>
        <div className={cx(styles.formWrapper, "flexCol")}>
          <form onSubmit={handleSubmit((data) => submitRequest(data))}
            className={cx(styles.passwordFormContainer, "flexCol")}
          >    
            <>
              {/* <small>PASSWORD</small> */}
              <Controller
                name="current_password"
                control={control}
                render={({ field }) => (
                  <InputField
                    {...field} 
                    label={"Current Password"}
                    type="password"
                    error={errors?.current_password && errors?.current_password?.message}

                  />
                )}
              />
            </>
            {/* <small>NEW PASSWORD</small> */}
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field} 
                  label={"New Password"}
                  type="password"
                  error={errors?.password && errors?.password?.message}

                />
              )}
            />

            {/* <small>CONFIRM NEW PASSWORD</small> */}
            <Controller
              name="password_confirmation"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field} 
                  label={"Confirm New Password"}
                  type="password"
                  error={errors?.password_confirmation && errors?.password_confirmation?.message}

                />
              )}
            />

            <div className={cx(styles.submitBtnDiv, "flexRow")}>
              <Button loading={loading} disabled={loading} onClick={handleSubmit((data) => submitRequest(data))} type title="Save Changes" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#D25B5D" />
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;