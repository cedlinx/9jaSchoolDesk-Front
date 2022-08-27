import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./ChangePin.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
// import { changePin } from "@/redux/Student/StudentSlice";

import { useForm, Controller } from "react-hook-form";
import { changePinValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";


const ChangePin = () => {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.proprietor.loading);

  const sendRequest = async (data) => {
    // let response = await dispatch(changePin({ id: modalData.id, ...rest, subjects: subjectArray }));
    // if (response.payload.success) {
    //   dispatch(showModal({ action: "hide" }));
    // }
  };

  const resolver = yupResolver(changePinValidationSchema);

  const defaultValues = {
    current_password: "",
    password: "",
    password_confirmation: ""
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });


  return (
    <section className={cx(styles.changePinContainer, "flexCol")}>
      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={() => dispatch(showModal({ action: "hide", type: "changePin" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
        <div className={cx(styles.header)}>
          <p>Change Password</p>
        </div>
        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
          className=""
        >
          <Controller
            name="current_password"
            control={control}
            render={({ field, ref }) => (
              <InputField
                {...field}
                label={"CURRENT PASSWORD"}
                placeholder="Enter current password"
                error={errors?.current_password && errors?.current_password?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, ref }) => (
              <InputField
                {...field}
                label={"PASSWORD"}
                placeholder="Enter new password"
                error={errors?.password && errors?.password?.message}
              />
            )}
          />

          <Controller
            name="password_confirmation"
            control={control}
            render={({ field, ref }) => (
              <InputField
                {...field}
                label={"PASSWORD CONFIRMATION"}
                placeholder="Confirm new password"
                error={errors?.password_confirmation && errors?.password_confirmation?.message}
              />
            )}
          />

          <div className={cx(styles.btnDiv, "flexRow")}>
            <Button onClick={handleSubmit((data) => sendRequest(data))} loading={loading} disabled={loading} title="Submit" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>
        </form>
      </div>

    </section>
  );
};

export default ChangePin;