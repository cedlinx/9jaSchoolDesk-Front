import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import cx from "classnames";
import styles from "./Profile.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import SelectField from "@/components/Select/Select";

import { ToastContainer, toast } from "react-toastify";

import { signUp } from "@/redux/User/user.action";

import { useForm, Controller } from "react-hook-form";
import { signUpValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

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

  return (
    <div className={cx(styles.profileContainer)}>
      <div className={cx(styles.header)}>
        <h5>Profile</h5>
      </div>
      <div className={cx(styles.body, "row")}>
        <div className={cx("col-md-3")}>
                    Tabs here
        </div>
        <div  className={cx("col-md-9")}>
          <div className={cx(styles.header)}>
            <h5>Account</h5>
            <small>Update your account</small>
          </div>

          <div className={cx(styles.imageSection, "flexRow")}>
            <div>
              <img src="" alt="" />
            </div>
            <button>Upload</button><button>Remove</button>
          </div>

          <div className={cx(styles.formWrapper, "flexCol")}>
            <form onSubmit={handleSubmit((data) => createUser(data))}
              className="form"
            >

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

              {/* <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <InputField
                    {...field} 
                    placeholder={" "}
                    label={"Password"}
                    type="password"
                    error={errors?.password && errors?.password?.message}

                  />
                )}
              /> */}



              {/* <Controller
								name="pin"
								control={control}
								render={({ field }) => (
									<InputField
										{...field} 
										placeholder={" "}
										label={"Pin"}
										type="number"
										error={errors?.pin && errors?.pin?.message}

										maxLength="4"
									/>
								)}
							/>

							<Controller
								name="address"
								control={control}
								render={({ field }) => (
									<InputField
										{...field} 
										placeholder={" "}
										label={"Address"}
										type="text"
										error={errors?.address && errors?.address?.message}

									/>
								)}
							/>

							<Controller
								name="phone"
								control={control}
								render={({ field }) => (
									<InputField
										{...field} 
										placeholder={" "}
										label={"Mobile Number"}
										type="number"
										error={errors?.phone && errors?.phone?.message}

									/>
								)}
							/> */}

              <div className={cx(styles.submitBtnDiv, "flexRow")}>
                <Button onClick={handleSubmit((data) => createUser(data))} type title="Save Changes" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#D25B5D" />
              </div>
              
            </form>
          </div>

          <div className={cx(styles.formWrapper, "flexCol")}>
            <form onSubmit={handleSubmit((data) => createUser(data))}
              className="form"
            >    


              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <InputField
                    {...field} 
                    placeholder={" "}
                    label={"Current Password"}
                    type="password"
                    error={errors?.password && errors?.password?.message}

                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <InputField
                    {...field} 
                    placeholder={" "}
                    label={"New Password"}
                    type="password"
                    error={errors?.password && errors?.password?.message}

                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <InputField
                    {...field} 
                    placeholder={" "}
                    label={"Confirm New Password"}
                    type="password"
                    error={errors?.password && errors?.password?.message}

                  />
                )}
              />



              {/* <Controller
								name="pin"
								control={control}
								render={({ field }) => (
									<InputField
										{...field} 
										placeholder={" "}
										label={"Pin"}
										type="number"
										error={errors?.pin && errors?.pin?.message}

										maxLength="4"
									/>
								)}
							/>

							<Controller
								name="address"
								control={control}
								render={({ field }) => (
									<InputField
										{...field} 
										placeholder={" "}
										label={"Address"}
										type="text"
										error={errors?.address && errors?.address?.message}

									/>
								)}
							/>

							<Controller
								name="phone"
								control={control}
								render={({ field }) => (
									<InputField
										{...field} 
										placeholder={" "}
										label={"Mobile Number"}
										type="number"
										error={errors?.phone && errors?.phone?.message}

									/>
								)}
							/> */}

              <div className={cx(styles.submitBtnDiv, "flexRow")}>
                <Button onClick={handleSubmit((data) => createUser(data))} type title="Save Changes" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#D25B5D" />
              </div>
              
            </form>
          </div>

          
        </div>
      </div>  
    </div>
  );
};

export default Profile;