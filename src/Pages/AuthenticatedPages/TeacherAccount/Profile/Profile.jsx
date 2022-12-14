import React, {useEffect, useState, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import cx from "classnames";
import styles from "./Profile.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import SelectField from "@/components/Select/Select";
// import {Tab, Row, Col, Nav} from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";
import "./react-tabs.css";
import { ToastContainer, toast } from "react-toastify";

// import { proprietorSignUp } from "@/redux/Auth/AuthSlice";

import { useForm, Controller } from "react-hook-form";
import { signUpValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import studentProfilePic from "@/assets/images/student-profile-pic.png";

import { useDropzone } from "react-dropzone";



const Profile = () => {

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

  const [uploadedFile, setUploadedFile] = useState({
    file: "",
    imagePreviewUrl: ""
  });

  const onDrop = useCallback(acceptedFiles => {
    let file = (acceptedFiles[0]);
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedFile({file: file, imagePreviewUrl: reader.result});
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps } = useDropzone({ onDrop, accept: "image/*" });

  const removeAttachment = () => {
    setUploadedFile({
      file: "",
      imagePreviewUrl: "", 
      type: ""
    });
  };

  return (
    <div className={cx(styles.profileContainer, "flexCol")}>
      <div className={cx(styles.header, styles.mainHeader)}>
        <h3 className="text-center">Profile</h3>
      </div>
      <hr />

      <div className={cx(styles.body)}>
        <Tabs className={cx(styles.tabContainer, "row")}>
          <TabList className={cx(styles.tabList, "col-sm-3")}>
            <Tab>
              <p>Account</p>
            </Tab>
            <Tab>
              <p>Password</p>
            </Tab>
           
          </TabList>

          <div className={cx(styles.tabPanelContainer, "col-sm-9")}>
            <TabPanel>
              <div className={cx(styles.panelContent, "flexCol")}>
                <div className={cx(styles.header)}>
                  <h3>Account</h3>
                  <small>Update your account</small>
                </div>
                <div className={cx(styles.imageSection, "flexRow")}>
                  <div className={cx(styles.imageDiv)}>
                    <img src={uploadedFile?.imagePreviewUrl ? uploadedFile?.imagePreviewUrl : studentProfilePic} alt="" />
                  </div>

                  <Button {...getRootProps()}  type title="Upload" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" />
                 
                  <Button  onClick={()=> removeAttachment()} title="Remove" borderRadiusType="fullyRounded" textColor="#828282" bgColor="#fff" bordercolor="#828282" />
                </div>

                <div className={cx(styles.formWrapper, "flexCol")}>
                  <form onSubmit={handleSubmit((data) => createUser(data))}
                    className="form"
                  >

                    <div className={cx(styles.inputsWrapper)}>
                      <Controller
                        name="name"
                        control={control}
                        render={({ field, ref }) => (
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
                        render={({ field, ref }) => (
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
                        render={({ field, ref }) => (
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
                        render={({ field, ref }) => (
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
            </TabPanel>
            <TabPanel>
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
                        render={({ field, ref }) => (
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
                      render={({ field, ref }) => (
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
                      render={({ field, ref }) => (
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
            </TabPanel>

          </div>
          
        </Tabs>
      </div>
      
    </div>
  );
};

export default Profile;