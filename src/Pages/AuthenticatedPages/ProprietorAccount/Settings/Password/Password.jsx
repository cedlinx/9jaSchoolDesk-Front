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
import { signUpValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import studentProfilePic from "@/assets/images/student-profile-pic.png";

const Password = () => {

  const dispatch = useDispatch();

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

  const [imgData, setImgData] = useState({
    file: "",
    imagePreviewUrl: ""
  });

  const onDrop = useCallback(acceptedFiles => {
    let file = (acceptedFiles[0]);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgData({file: file, imagePreviewUrl: reader.result});
    };
    reader.readAsDataURL(file);
  }, []);

  const { getInputProps, getRootProps } = useDropzone({ onDrop, accept: "image/*" });

  return (
    <div className={cx(styles.settingsTabItemContainer)}>
      <div className={cx(styles.panelContent, "flexCol")}>
        <div className={cx(styles.header)}>
          <h3>Password</h3>
          <small>Please enter your current password to change your password.</small>
        </div>
        <div className={cx(styles.formWrapper, "flexCol")}>
          <form onSubmit={handleSubmit((data) => createUser(data))}
            className={cx(styles.passwordFormContainer, "flexCol")}
          >    
            <>
              <small>PASSWORD</small>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <InputField
                    {...field} 
                    placeholder={" "}
                    // label={"Current Password"}
                    type="password"
                    error={errors?.password && errors?.password?.message}

                  />
                )}
              />
            </>
            <small>NEW PASSWORD</small>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field} 
                  placeholder={" "}
                  // label={"New Password"}
                  type="password"
                  error={errors?.password && errors?.password?.message}

                />
              )}
            />

            <small>CONFIRM NEW PASSWORD</small>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field} 
                  placeholder={" "}
                  // label={"Confirm New Password"}
                  type="password"
                  error={errors?.password && errors?.password?.message}

                />
              )}
            />

            <div className={cx(styles.submitBtnDiv, "flexRow")}>
              <Button onClick={handleSubmit((data) => createUser(data))} type title="Save Changes" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#D25B5D" />
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;