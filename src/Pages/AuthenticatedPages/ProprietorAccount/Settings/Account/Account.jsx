import React, {useEffect, useState, useCallback} from "react";
import cx from "classnames";
import styles from "./Account.module.scss";

import {useDispatch, useSelector} from "react-redux";
import InputField from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { useDropzone } from "react-dropzone";
import { Icon } from "@iconify/react";
import { getDashboard } from "@/redux/Proprietor/ProprietorSlice";


import { useForm, Controller } from "react-hook-form";
import { modifyProprietorValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";


const Account = () => {

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state?.proprietor?.getDashboardData?.proprietor);
  const loading = useSelector((state) => state?.proprietor?.loading);

  const resolver = yupResolver(modifyProprietorValidationSchema);

  const defaultValues = {
    email: userDetails?.email,
    firstName: userDetails?.firstName || "",
    lastName: userDetails?.lastName || "",
    otherNames: userDetails?.otherNames || ""
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  const sendRequest = async (data) => {
    let formData = new FormData();
    imgData.file && formData.append("photo", imgData.file);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("otherNames", data.otherNames);
    formData.append("email", data.email);

    // let response = await dispatch(modifyProprietor(formData));
    // if(response.payload.success){
    //   dispatch(getDashboard());
    // }
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
            <img src={imgData?.imagePreviewUrl ? imgData?.imagePreviewUrl : userDetails?.avatar} alt="" />
          </div>

          <Button {...getRootProps()}  type title="Upload" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" hoverBg="#D25B5D" hoverColor="#fff" />
     
          <Button  type title="Remove" borderRadiusType="fullyRounded" textColor="#828282" bgColor="#fff" bordercolor="#828282" hoverBg="#828282" hoverColor="#fff" />
        </div>

        <div className={cx(styles.formWrapper, "flexCol")}>
          <form onSubmit={handleSubmit((data) => sendRequest(data))}
            className="form"
          >

            <div className={cx(styles.inputsWrapper)}>
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

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <InputField
                    {...field} 
                    placeholder={" "}
                    label={"Email Address"}
                    type="text"
                    readOnly
                    error={errors?.email && errors?.email?.message}

                  />
                )}
              />

            </div>
     

            <div className={cx(styles.submitBtnDiv, "flexRow")}>
              <Button loading={loading} disabled={loading} onClick={handleSubmit((data) => sendRequest(data))} type title="Save Changes" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#D25B5D" hoverColor="#000" />
            </div>
  
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;