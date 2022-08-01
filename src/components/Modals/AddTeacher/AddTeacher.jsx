import React, {useEffect, useState, useCallback} from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./AddTeacher.module.scss";
import Button from "@/components/Button/Button";
import Select from "@/components/Select/Select";
import InputField from "@/components/Input/Input";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";

import { addTeacher, getAllTeachers } from "@/redux/Proprietor/ProprietorSlice";

import { useForm, Controller } from "react-hook-form";
import { addTeacherValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

const AddTeacher = () => {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.proprietor.loading);

  const proprietorDetails = JSON.parse(localStorage.getItem("userData"));
  console.log(proprietorDetails);
  let institution_id = proprietorDetails.institution_id;
  console.log(institution_id);

  const sendRequest = async (data) => {
    let response = await dispatch(addTeacher({...data, institution_id: institution_id}));
    if(response.payload.success) {
      dispatch(getAllTeachers());
      dispatch(showModal({ action: "hide", type: "addTeacher" }));
    }
  };

  const resolver = yupResolver(addTeacherValidationSchema);

  const defaultValues = {
    fistName: "",
    lastName: "",
    otherNames: "",
    email: "",
    phone: ""
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  return (

    <section className={cx(styles.addTeacherContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "addTeacher" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
	  <div className={cx(styles.header)}>
          <p>Add New Teacher</p>
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
              name="email"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  label={"EMAIL"}
                  placeholder="email@email.com"
                  error={errors?.email && errors?.email?.message}
                  options={[{label: "", value: ""}]}
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  label={"PHONE NUMBER"}
                  placeholder="Phone Number"
                  error={errors?.phone && errors?.phone?.message}
                />
              )}
            />
            
          </div>

       
          <span className={cx(styles.span)}>Or</span>
          <small className={cx(styles.small)}>Add from Teacher Database</small>

          <div onClick={handleSubmit((data) => sendRequest(data))} className={cx(styles.btnDiv, "flexRow")}>
            <Button loading={loading} disabled={loading}title="Add Teacher" borderRadiusType="mediumRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>

     

        </form>
      </div>

    </section>
  );
};

export default AddTeacher;