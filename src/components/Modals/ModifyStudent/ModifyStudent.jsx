import React, {useEffect, useState, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./ModifyStudent.module.scss";
import Button from "@/components/Button/Button";
import Select from "@/components/Select/Select";
import InputField from "@/components/Input/Input";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import { modifyStudent } from "@/redux/Proprietor/ProprietorSlice";

import { useForm, Controller } from "react-hook-form";
import { modifyStudentValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

const ModifyStudent = () => {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.proprietor.loading);
  const modalData = useSelector((state) => state.modalState.modalData);
  const sendRequest = async (data) => {
    let response = await dispatch(modifyStudent(data));
    if(response.payload.success) {
      dispatch(showModal({ action: "hide", type: "modifyStudent" }));
    }
  };

  const resolver = yupResolver(modifyStudentValidationSchema);

  const defaultValues = {
    class_id: "",
    name: modalData?.firstName
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  return (

    <section className={cx(styles.modifyStudentContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "modifyStudent" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
	  <div className={cx(styles.header)}>
          <p>Edit Student</p>
        </div>
        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
          className=""
        >

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label={"STUDENT NAME"}
                placeholder=""
                readOnly
                error={errors?.name && errors?.name?.message}
              />
            )}
          />

          <Controller
            name="class_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label={"SELECT CLASS"}
                defaultSelect="Select Class"
                error={errors?.class_id && errors?.class_id?.message}
                options={[{label: "", value: ""}]}
              />
            )}
          />    

          <div onClick={handleSubmit((data) => sendRequest(data))} className={cx(styles.btnDiv, "flexRow")}>
            <Button loading={loading} disabled={loading} title="Save Changes" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>
        </form>
      </div>

    </section>
  );
};

export default ModifyStudent;