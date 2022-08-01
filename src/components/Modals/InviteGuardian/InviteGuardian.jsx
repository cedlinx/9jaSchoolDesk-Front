import React, {useEffect, useState, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./InviteGuardian.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import { inviteGuardian } from "@/redux/Proprietor/ProprietorSlice";

import { useForm, Controller } from "react-hook-form";
import { inviteGuardianValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

const InviteGuardian = () => {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.proprietor.loading);

  const sendRequest = async (data) => {
    let response = await dispatch(inviteGuardian(data));
    if(response.payload.success){
      dispatch(showModal({ action: "hide", type: "inviteGuardian" }));
    }
  };

  const resolver = yupResolver(inviteGuardianValidationSchema);

  const defaultValues = {
    email: "",
    name: "",
    // firstName: "",
    // lastName: "",
    // otherNames: "",
    message: ""
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  return (

    <section className={cx(styles.inviteGuardianContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "inviteGuardian" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
	  <div className={cx(styles.header)}>
          <p>Invite Parent</p>
        </div>
        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
        >

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label={"Name"}
                placeholder="Name"
                error={errors?.name && errors?.name?.message}
              />
            )}
          />

          {/* <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label={"First Name"}
                placeholder="First Name"
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
                label={"Last Name"}
                placeholder="Last Name"
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
                label={"Other Names"}
                placeholder="Other Names"
                error={errors?.otherNames && errors?.otherNames?.message}
              />
            )}
          /> */}

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label={"Email"}
                placeholder="Enter Email"
                error={errors?.email && errors?.email?.message}
              />
            )}
          />

          {/* <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder="Enter Message"
                error={errors?.message && errors?.message?.message}
              />
            )}
          /> */}


          <div onClick={handleSubmit((data) => sendRequest(data))} className={cx(styles.btnDiv, "flexRow")}>
            <Button loading={loading} disabled={loading}title="Invite" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>
        </form>
      </div>

    </section>
  );
};

export default InviteGuardian;