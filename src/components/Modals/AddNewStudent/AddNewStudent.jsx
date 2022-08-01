import React, {useEffect, useState, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./AddNewStudent.module.scss";
import Button from "@/components/Button/Button";
import Select from "@/components/Select/Select";
import InputField from "@/components/Input/Input";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import { addStudent } from "@/redux/Proprietor/ProprietorSlice";

import { useForm, Controller } from "react-hook-form";
import { addStudentValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

const AddNewStudent = () => {

  const dispatch = useDispatch();

  const sendRequest = async (data) => {
    let response = await dispatch(addStudent(data));

    if(response.payload.success) {
      dispatch(showModal({ action: "hide", type: "addNewStudent" }));
    }
  };

  const resolver = yupResolver(addStudentValidationSchema);

  const defaultValues = {
    fistName: "",
    lastName: "",
    otherNames: "",
    gender: "",
    phone: "",
    class_id: "",
    guardian_id: ""
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  return (

    <section className={cx(styles.addNewStudentContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "addNewStudent" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
	  <div className={cx(styles.header)}>
          <p>Add New Student</p>
        </div>
        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
          className=""
        >

          <div className={cx(styles.inputsWrapper, "flexRow")}>

            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  label={"FIRST NAME"}
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
                  label={"LAST NAME"}
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
                  label={"OTHER NAMES"}
                  placeholder="Other Names"
                  error={errors?.otherNames && errors?.otherNames?.message}
                />
              )}
            />

            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label={"GENDER"}
                  defaultSelect="Select"
                  error={errors?.gender && errors?.gender?.message}
                  options={[{label: "Male", value: "male"}, {label: "Female", value: "female"}]}
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  label={"PHONE"}
                  placeholder="Phone Number"
                  error={errors?.phone && errors?.phone?.message}
                />
              )}
            />

            <Controller
              name="guardian_id"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label={"SELECT GUARDIAN"}
                  defaultSelect="Select"
                  error={errors?.guardian_id && errors?.guardian_id?.message}
                  options={[{label: "", value: ""}]}
                />
              )}
            />

            <Controller
              name="class_id"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label={"ASSIGN CLASS"}
                  defaultSelect="Select"
                  error={errors?.class_id && errors?.class_id?.message}
                  options={[{label: "", value: ""}]}
                />
              )}
            />
            
          </div>

          <div onClick={handleSubmit((data) => sendRequest(data))} className={cx(styles.btnDiv, "flexRow")}>
            <Button title="Add Student" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>
        </form>
      </div>

    </section>
  );
};

export default AddNewStudent;