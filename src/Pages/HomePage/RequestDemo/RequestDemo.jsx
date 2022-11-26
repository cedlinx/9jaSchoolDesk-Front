import React from "react";
import cx from "classnames";
import styles from "./RequestDemo.module.scss";
import heroImage from "@/assets/images/request-demo.jpg";
import InputField from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import "react-phone-number-input/style.css";
import PhoneInput, {isValidPhoneNumber } from "react-phone-number-input";
import "./PhoneInput.scss";
// import MailingList from "@/components/MailingList/MailingList";

import { useForm, Controller } from "react-hook-form";
import { modifyClassValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";


const RequestDemo = () => {

    
  const sendRequest = async (data) => {
  };
    
  const resolver = yupResolver(modifyClassValidationSchema);

  const defaultValues = {
    name: "",
    email: ""
  };

  const { register, handleSubmit, formState: { errors }, control, reset, setValue } = useForm({ defaultValues, resolver, mode: "all" });

  return (
    <div className={cx(styles.demoContainer, "flexRow", "row", "g-0")}>
      <div className={cx(styles.leftSection, "col-sm-6", "col-md-6")}>
        <h3>START FOR FREE NOW</h3>
        <span>Relieving you of the workload while you concentrate on students</span>
        <small>Request our School Management Software Free Demo</small>

        <div className={cx(styles.formWrapper, "flexCol")}>
          <form
            onSubmit={handleSubmit((data) => sendRequest(data))}
            className=""
          >
            <Controller
              name="name"
              control={control}
              render={({ field, ref }) => (
                <InputField
                  {...field}
                  label={"Your Name"}
                  placeholder=""
                  error={errors?.name && errors?.name?.message}
                />
              )}
            />

            <Controller
              name="schoolName"
              control={control}
              render={({ field, ref }) => (
                <InputField
                  {...field}
                  label={"School Name"}
                  placeholder=""
                  error={errors?.schoolName && errors?.schoolName?.message}
                />
              )}
            />

            <Controller
              name="location"
              control={control}
              render={({ field, ref }) => (
                <InputField
                  {...field}
                  label={"Location"}
                  error={errors?.location && errors?.location?.message}
                />
              )}
            />

            <Controller
              name="role"
              control={control}
              render={({ field, ref }) => (
                <InputField
                  {...field}
                  label={"Role in School"}
                  error={errors?.role && errors?.role?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field, ref }) => (
                <InputField
                  {...field}
                  label={"Email"}
                  error={errors?.email && errors?.email?.message}
                />
              )}
            />

            <div className={cx(styles.inputWrapper, "PhoneInputWrapper")}>
              <label htmlFor="phoneNumber">Phone Number</label>
              <Controller
                name="phone"
                control={control}
                render={({ field, ref }) => (
                  <PhoneInput
                    {...field}
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry="NG"
                  />
                )}
              />
              {errors?.phoneNumber && <small>{errors?.phoneNumber?.message}</small> }
            </div>


            <div className={cx(styles.btnDiv, "flexRow")}>
              <Button onClick={handleSubmit((data) => sendRequest(data))} title="Submit" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
            </div>

          </form>
        </div>    
                
      </div>
      <div className={cx(styles.rightSection, "flexCol", "col-sm-6", "col-md-6")}>
        <div className={cx(styles.imageDiv, "flexRow")}>
          <img src={heroImage} alt="img" className={cx("img-responsive")} />
        </div>
      </div>
    </div>
  );
};

export default RequestDemo;