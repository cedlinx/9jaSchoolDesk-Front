import React, {useEffect, useState, useCallback} from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./AssignTeacherToClass.module.scss";
import Button from "@/components/Button/Button";
import Select from "@/components/Select/Select";
import InputField from "@/components/Input/Input";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import { useDropzone } from "react-dropzone";
import { forgotPassword } from "@/redux/Auth/AuthSlice";

import { useForm, Controller } from "react-hook-form";
import { forgotPasswordValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

const AssignTeacherToClass = () => {

  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modalState.modalData);

  const sendRequest = (data) => {
    dispatch(forgotPassword(data));
    dispatch(showModal({ action: "show", type: "resetLinkStatus" }));
  };

  const resolver = yupResolver(forgotPasswordValidationSchema);

  const defaultValues = {
    email: ""
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  return (

    <section className={cx(styles.assignTeacherToClassContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "assignTeacherToClass" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
	  <div className={cx(styles.header)}>
          <p>Assign Teacher To Class</p>
        </div>
        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
          className=""
        >

          <Controller
            name="studentId"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label={"NAME"}
                placeholder="Name"
                error={errors?.studentId && errors?.studentId?.message}
                options={[{label: "", value: ""}]}
              />
            )}
          />

          <Controller
            name="studentClass"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label={"SELECT CLASS"}
                defaultSelect="Select"
                error={errors?.studentId && errors?.studentId?.message}
                options={[{label: "", value: ""}]}
              />
            )}
          />


          <div onClick={handleSubmit((data) => sendRequest(data))} className={cx(styles.btnDiv, "flexRow")}>
            <Button title="Assign To Class" borderRadiusType="mediumRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>

     

        </form>
      </div>

    </section>
  );
};

AssignTeacherToClass.propTypes = {
  title: PropTypes.string
};

export default AssignTeacherToClass;