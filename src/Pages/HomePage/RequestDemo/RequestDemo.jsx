import React from "react";
import cx from "classnames";
import styles from "./RequestDemo.module.scss";
import heroImage from "@/assets/images/request-demo.jpg";
import InputField from "@/components/Input/Input";
import Button from "@/components/Button/Button";

// import MailingList from "@/components/MailingList/MailingList";

import { useForm, Controller } from "react-hook-form";
import { modifyClassValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";


const RequestDemo = () => {

    
  const sendRequest = async (data) => {
    console.log(data);
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
        <h3>School management Made Easy</h3>
        <small>Get In Touch For A Demo Today</small>

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
                  label={"NAME"}
                  placeholder="John Doe"
                  error={errors?.name && errors?.name?.message}
                  options={[{ label: "", value: "" }]}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field, ref }) => (
                <InputField
                  {...field}
                  label={"EMAIL"}
                  placeholder="email@email.com"
                  error={errors?.email && errors?.email?.message}
                />
              )}
            />

            <div className={cx(styles.btnDiv, "flexRow")}>
              <Button onClick={handleSubmit((data) => sendRequest(data))} title="Submit" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
            </div>

          </form>
        </div>    
                
      </div>
      <div className={cx(styles.rightSection, "col-sm-6", "col-md-6")}>
        <div className={cx(styles.imageDiv)}>
          <img src={heroImage} alt="img" />
        </div>
      </div>
    </div>
  );
};

export default RequestDemo;