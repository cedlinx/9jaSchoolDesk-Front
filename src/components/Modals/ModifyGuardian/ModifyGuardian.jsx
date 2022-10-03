import React, {useEffect, useState, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./ModifyGuardian.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import { modifyGuardian, getNewGuardianSignups, getDashboard } from "@/redux/Proprietor/ProprietorSlice";

import { useForm, Controller } from "react-hook-form";
import { modifyGuardianValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

const ModifyGuardian = () => {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.proprietor.loading);
  const modalData = useSelector((state) => state.modalState.modalData);
  console.log(modalData);

  useEffect(() => {
    reset(modalData);
  }, [modalData]);

  const sendRequest = async (data) => {
    let response = await dispatch(modifyGuardian(data));
    if(response.payload.success){
      dispatch(getNewGuardianSignups());
      dispatch(getDashboard());
      dispatch(showModal({ action: "hide", type: "modifyGuardian" }));
    }
  };

  const resolver = yupResolver(modifyGuardianValidationSchema);

  const defaultValues = {
    email: "",
    firstName: "",
    lastName: "",
    otherNames: "",
    message: ""
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  return (

    <section className={cx(styles.modifyGuardianContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "modifyGuardian" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
	  <div className={cx(styles.header)}>
          <p>Modify Guardian</p>
        </div>
        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
        >

          {/* <Controller
            name="name"
            control={control}
            render={({ field, ref }) => (
              <InputField
                {...field}
                label={"Name"}
                placeholder="Name"
                error={errors?.name && errors?.name?.message}
              />
            )}
          /> */}

          <Controller
            name="firstName"
            control={control}
            render={({ field, ref }) => (
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
            render={({ field, ref }) => (
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
            render={({ field, ref }) => (
              <InputField
                {...field}
                label={"Other Names"}
                placeholder="Other Names"
                error={errors?.otherNames && errors?.otherNames?.message}
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
                placeholder="Enter Email"
                error={errors?.email && errors?.email?.message}
              />
            )}
          />

          {/* <Controller
            name="message"
            control={control}
            render={({ field, ref }) => (
              <TextInput
                {...field}
                placeholder="Enter Message"
                error={errors?.message && errors?.message?.message}
              />
            )}
          /> */}


          <div  className={cx(styles.btnDiv, "flexRow")}>
            <Button onClick={handleSubmit((data) => sendRequest(data))} loading={loading} disabled={loading}title="Modify" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>
        </form>
      </div>

    </section>
  );
};

export default ModifyGuardian;