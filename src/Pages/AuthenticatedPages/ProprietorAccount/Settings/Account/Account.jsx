import React, {useEffect, useState, useCallback} from "react";
import cx from "classnames";
import styles from "./Account.module.scss";

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

const Account = () => {

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
          <h3>Account</h3>
          <small>Update your account</small>
        </div>
        <div className={cx(styles.imageSection, "flexRow")}>
          <div className={cx(styles.imageDiv)}>
            <img src={imgData?.imagePreviewUrl ? imgData?.imagePreviewUrl : studentProfilePic} alt="" />
          </div>

          <Button {...getRootProps()}  type title="Upload" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" />
     
          <Button  type title="Remove" borderRadiusType="fullyRounded" textColor="#828282" bgColor="#fff" bordercolor="#828282" />
        </div>

        <div className={cx(styles.formWrapper, "flexCol")}>
          <form onSubmit={handleSubmit((data) => createUser(data))}
            className="form"
          >

            <div className={cx(styles.inputsWrapper)}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <InputField
                    {...field} 
                    placeholder={" "}
                    label={"First Name"}
                    type="text"
                    error={errors?.name && errors?.name?.message}

                  />
                )}
              />

              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <InputField
                    {...field} 
                    placeholder={" "}
                    label={"Last Name"}
                    type="text"
                    error={errors?.name && errors?.name?.message}

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
                    label={"Email Address"}
                    type="email"
                    error={errors?.email && errors?.email?.message}

                  />
                )}
              />

              <Controller
                name="accountType"
                control={control}
                render={({ field }) => (
                  <SelectField
                    {...field}
                    label={"Account Type"}
                    type="text"
                    required={true}
                    error={errors?.accountType && errors?.accountType?.message}
                    options={[]}
                  />
                )}
              />
            </div>
     

            <div className={cx(styles.submitBtnDiv, "flexRow")}>
              <Button onClick={handleSubmit((data) => createUser(data))} type title="Save Changes" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#D25B5D" />
            </div>
  
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;