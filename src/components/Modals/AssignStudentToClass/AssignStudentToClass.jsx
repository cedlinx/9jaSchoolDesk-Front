import React, {useEffect, useState, useCallback} from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./AssignStudentToClass.module.scss";
import Button from "@/components/Button/Button";
import Select from "@/components/Select/Select";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import { forgotPassword } from "@/redux/Auth/AuthSlice";

import { useForm, Controller } from "react-hook-form";
import { forgotPasswordValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

const AssignStudentToClass = () => {

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

    <section className={cx(styles.assignStudentToClassContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "assignStudentToClass" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
	  <div className={cx(styles.header)}>
          <p>Assign Student To Class</p>
        </div>
        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
          className=""
        >

          <Controller
            name="studentId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label={"Select Student"}
                defaultSelect="Select Student"
                error={errors?.studentId && errors?.studentId?.message}
                options={[{label: "", value: ""}]}
              />
            )}
          />

          <small>Upload Student List</small>

          { modalData?.user && modalData?.user.toLowerCase() === "proprietor" && 
            <>

              <Controller
                name="studentClass"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label={"Assign To Class"}
                    defaultSelect="Assign To Class"
                    error={errors?.studentId && errors?.studentId?.message}
                    options={[{label: "", value: ""}]}
                  />
                )}
              />
              <span>
              *This can be done by the teacher as well on their class dashboards so you can skip if you want to
              </span>
            </>
          }

          <div onClick={handleSubmit((data) => sendRequest(data))} className={cx(styles.btnDiv, "flexRow")}>
            <Button title="Assign Student" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>
        </form>
      </div>

    </section>
  );
};

AssignStudentToClass.propTypes = {
  title: PropTypes.string
};

export default AssignStudentToClass;