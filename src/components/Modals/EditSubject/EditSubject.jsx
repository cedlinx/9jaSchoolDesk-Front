import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./EditSubject.module.scss";
import Button from "@/components/Button/Button";
import Select from "@/components/Select/Select";
import InputField from "@/components/Input/Input";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import { modifySubject, getAllSubjects } from "@/redux/Proprietor/ProprietorSlice";

import { useForm, Controller } from "react-hook-form";
import { editSubjectValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";


const EditSubject = () => {

  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modalState.modalData);

  const sendRequest = async (data) => {
    let response = await dispatch(modifySubject({ ...data, id: modalData.id }));
    if (response.payload.success) {
      dispatch(showModal({ action: "hide", type: "editSubject" }));
      dispatch(getAllSubjects());
    }
  };

  const resolver = yupResolver(editSubjectValidationSchema);

  const defaultValues = {
    subject: modalData?.subject
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  useEffect(() => {
    reset({
      subject: modalData?.subject
    });
  }, [reset]);

  return (

    <section className={cx(styles.editSubjectContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={() => dispatch(showModal({ action: "hide", type: "editSubject" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
        <div className={cx(styles.header)}>
          <p>Edit Subject</p>
        </div>
        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
          className=""
        >

          <Controller
            name="subject"
            control={control}
            render={({ field, ref }) => (
              <InputField
                {...field}
                label={"SUBJECT NAME"}
                placeholder="Subject Name"
                error={errors?.subject && errors?.subject?.message}
              />
            )}
          />

          <div onClick={handleSubmit((data) => sendRequest(data))} className={cx(styles.btnDiv, "flexRow")}>
            <Button title="Save Changes" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>

        </form>
      </div>

    </section>
  );
};

export default EditSubject;