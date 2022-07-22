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
import { Icon } from "@iconify/react";
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
              <p>Notification</p>
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
            </TabPanel>
            <TabPanel>
              <div className={cx(styles.panelContent, "flexCol")}>
                <div className={cx(styles.header)}>
                  <h3>Notification</h3>
                  <small>How do you want to be communicated</small>
                </div>
                <div className={cx(styles.formWrapper, "flexCol")}>
                  <form onSubmit={handleSubmit((data) => createUser(data))}
                    className={cx(styles.notificationFormContainer, "flexCol")}
                  >    
                    <div className={cx(styles.inputWrapper, "flexRow-align-center")}>
                      <div className={cx(styles.leftSection, "flexRow-align-center")}>
                        <div><Icon icon="logos:google-gmail" color="#1d1e24" width="28" height="28" /></div>
                        <span>Gmail</span>
                      </div>
                      <div className={cx(styles.rightSection, "flexRow-align-center")}>
                        <Controller
                          name="password"
                          control={control}
                          render={({ field }) => (
                            <InputField
                              {...field} 
                              placeholder={"johndoe@gmail.com"}
                              type="email"
                              error={errors?.email && errors?.email?.message}
                              border="none"
                              borderradius="0rem"
                              marginbottom="0.5rem"
                            />
                          )}
                        />
                      </div>
                   
                    </div>

                    <div className={cx(styles.inputWrapper, "flexRow-align-center")}>
                      <div className={cx(styles.leftSection, "flexRow-align-center")}>
                        <div><Icon icon="bx:phone-call" color="#1d1e24" width="28" height="28" /></div>
                        <span>Phone</span>
                      </div>
                      <div className={cx(styles.rightSection, "flexRow-align-center")}>
                        <Controller
                          name="phoneNumber"
                          control={control}
                          render={({ field }) => (
                            <InputField
                              {...field} 
                              placeholder={"+2348000000000"}
                              type="number"
                              error={errors?.phoneNumber && errors?.phoneNumber?.message}
                              border="none"
                              borderradius="0rem"
                              marginbottom="0.5rem"
                            />
                          )}
                        />
                        <small>Setup</small>

                      </div>
                   
                    </div>
                    
                    <div className={cx(styles.inputWrapper, "flexRow-align-center")}>
                      <div className={cx(styles.leftSection, "flexRow-align-center")}>
                        <div><Icon icon="logos:whatsapp" color="#1d1e24" width="28" height="28" /></div>
                        <span>WhatsApp</span>
                      </div>
                      <div className={cx(styles.rightSection, "flexRow-align-center")}>
                        <Controller
                          name="whatsApp"
                          control={control}
                          render={({ field }) => (
                            <InputField
                              {...field} 
                              placeholder={"@--------"}
                              type="number"
                              error={errors?.whatsApp && errors?.whatsApp?.message}
                              border="none"
                              borderradius="0rem"
                              marginbottom="0.5rem"
                              rightPlaceholder={true}
                            />
                          )}
                        />
                        <small>Setup</small>

                      </div>
                   
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
            </TabPanel>

          </div>
          
        </Tabs>
      </div>
      
    </div>
  );
};

export default Profile;