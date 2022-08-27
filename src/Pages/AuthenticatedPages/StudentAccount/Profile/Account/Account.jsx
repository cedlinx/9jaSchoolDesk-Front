import React, { useEffect, useState, useCallback } from "react";
import cx from "classnames";
import styles from "./Account.module.scss";

import { useDispatch, useSelector } from "react-redux";
import InputField from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { useDropzone } from "react-dropzone";
import { Icon } from "@iconify/react";
import { modifyStudentProfile } from "@/redux/Student/StudentSlice";
import { initialsCase } from "@/helpers/textTransform";


import { useForm, Controller } from "react-hook-form";
import { modifyStudentProfileValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import useGetLoggedInUser from "@/utils/useGetLoggedInUser";


const Account = () => {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.student?.loading);
  const userDetails = useGetLoggedInUser();
  console.log(userDetails);


  const resolver = yupResolver(modifyStudentProfileValidationSchema);

  const defaultValues = {
    // email: userDetails?.email,
    // firstName: userDetails?.firstName || "",
    // lastName: userDetails?.lastName || "",
    // otherNames: userDetails?.otherNames || "",
    // address: userDetails?.address || ""
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  useEffect(() => {
    reset({
      email: userDetails?.email,
      firstName: userDetails?.firstName,
      lastName: userDetails?.lastName,
      otherNames: userDetails?.otherNames,
      address: userDetails?.address
    });
  }, [dispatch, reset, userDetails?.address, userDetails?.email, userDetails?.firstName, userDetails?.lastName, userDetails?.otherNames]);


  const sendRequest = async (data) => {
    console.log(data);
    let formData = new FormData();
    uploadedFile.file && formData.append("photo", uploadedFile.file);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("otherNames", data.otherNames);
    // formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("id", userDetails?.id);

    dispatch(modifyStudentProfile(formData));
  };

  const [uploadedFile, setUploadedFile] = useState({
    file: "",
    imagePreviewUrl: ""
  });

  const onDrop = useCallback(acceptedFiles => {
    let file = (acceptedFiles[0]);
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedFile({ file: file, imagePreviewUrl: reader.result });
    };
    reader.readAsDataURL(file);
  }, []);

  const { getInputProps, getRootProps } = useDropzone({ onDrop, accept: "image/*" });

  return (
    <div className={cx(styles.settingsTabItemContainer)}>
      <div className={cx(styles.panelContent, "flexCol")}>
        <div className={cx(styles.header)}>
          {/* <h3>Account</h3> */}
          {/* <small>Update your account</small> */}
        </div>
        <div className={cx(styles.imageSection, "flexRow")}>
          <div className={cx(styles.imageDiv)}>
            {userDetails?.avatar || uploadedFile?.imagePreviewUrl ? 
              <img src={uploadedFile?.imagePreviewUrl ? uploadedFile?.imagePreviewUrl : userDetails?.avatar} alt="" />
              :
              <span style={{ backgroundColor: "#D25B5D" }}>{initialsCase(`${userDetails.firstName} ${userDetails.lastName}`)}</span>
            }
          </div>

          {/* <Button {...getRootProps()} type title="Upload" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" hoverBg="#D25B5D" hoverColor="#fff" />

          <Button type title="Remove" borderRadiusType="fullyRounded" textColor="#828282" bgColor="#fff" bordercolor="#828282" hoverBg="#828282" hoverColor="#fff" /> */}
        </div>

        <div className={cx(styles.formWrapper, "flexCol")}>
          {
            <form onSubmit={handleSubmit((data) => sendRequest(data))}
              className="form"
            >

              <div className={cx(styles.inputsWrapper)}>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field, ref }) => (
                    <InputField
                      {...field}
                      placeholder={" "}
                      label={"First Name"}
                      type="text"
                      error={errors?.firstName && errors?.firstName?.message}
                      readOnly
                    />
                  )}
                />

                <Controller
                  name="lastName"
                  control={control}
                  render={({ field, ref }) => (
                    <InputField
                      {...field}
                      placeholder={" "}
                      label={"Last Name"}
                      type="text"
                      error={errors?.lastName && errors?.lastName?.message}
                      readOnly

                    />
                  )}
                />

                <div style={{ width: "100%" }}>
                  <Controller
                    name="otherNames"
                    control={control}
                    render={({ field, ref }) => (
                      <InputField
                        {...field}
                        placeholder={" "}
                        label={"Other Names"}
                        type="text"
                        error={errors?.otherNames && errors?.otherNames?.message}

                        readOnly

                      />
                    )}
                  />
                </div>


                <div style={{ width: "100%" }}>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field, ref }) => (
                      <InputField
                        {...field}
                        placeholder={" "}
                        label={"Address"}
                        type="text"
                        error={errors?.address && errors?.address?.message}


                      />
                    )}
                  />
                </div>

                <div style={{ width: "100%" }}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field, ref }) => (
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


              </div>


              {/* <div className={cx(styles.submitBtnDiv, "flexRow")}>
                <Button loading={loading} disabled={loading} onClick={handleSubmit((data) => sendRequest(data))} type title="Save Changes" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#D25B5D" hoverColor="#000" />
              </div> */}

            </form>
          }
        </div>
      </div>
    </div>
  );
};

export default Account;