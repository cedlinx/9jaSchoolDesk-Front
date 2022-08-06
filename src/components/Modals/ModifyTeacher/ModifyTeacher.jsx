import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./ModifyTeacher.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import { modifyTeacher, getAllTeachers } from "@/redux/Proprietor/ProprietorSlice";
import SelectAutoComplete from "@/components/SelectAutoComplete";

import { useForm, Controller } from "react-hook-form";
import { modifyTeacherValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import useGetAllSubjects from "@/utils/useGetAllSubjects";


const ModifyTeacher = () => {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.proprietor.loading);
  const modalData = useSelector((state) => state.modalState.modalData);
  const schoolSubjects = useGetAllSubjects();

  const sendRequest = async (data) => {
    const { email, ...rest } = data;
    let subjectArray = [];
    data.subjects.map((subject) => {
      subjectArray.push(subject.value);
    });
    let response = await dispatch(modifyTeacher({ id: modalData.id, ...rest, subjects: subjectArray }));
    if (response.payload.success) {
      dispatch(showModal({ action: "hide", type: "modifyTeacher" }));
      dispatch(getAllTeachers());
    }
  };

  const getSubjectsOptions = (data) => {
    let options = [];
    Array.isArray(data) && data.map((subject) => {
      options.push({
        value: subject.id,
        label: subject.subject
      });
    });
    return options;
  };

  const resolver = yupResolver(modifyTeacherValidationSchema);

  const defaultValues = {
    firstName: modalData?.firstName,
    lastName: modalData?.lastName,
    otherNames: modalData?.otherNames,
    email: modalData?.email,
    phone: modalData?.phone,
    subjects: getSubjectsOptions(modalData?.subjects)

  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });



  return (

    <section className={cx(styles.modifyTeacherContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={() => dispatch(showModal({ action: "hide", type: "modifyTeacher" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
        <div className={cx(styles.header)}>
          <p>Edit Teacher</p>
        </div>
        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
          className=""
        >

          {/* <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label={"TEACHER NAME"}
                placeholder=""
                error={errors?.name && errors?.name?.message}
              />
            )}
          /> */}

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
                readOnly={true}
                placeholder="email@email.com"
                error={errors?.email && errors?.email?.message}
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


          <label className={cx(styles.subjectsLabel)}>SELECT SUBJECTS</label>
          <Controller
            name="subjects"
            control={control}
            render={({ field }) => (
              < SelectAutoComplete
                {...field}
                isMulti={true}
                isClearable={true}
                marginbottom="1.5rem"
                placeholder=""
                options={getSubjectsOptions(schoolSubjects)}
                error={errors?.subjects && errors?.subjects?.message}
              />
            )}
          />

          {/* <Controller
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
          />     */}

          <div className={cx(styles.btnDiv, "flexRow")}>
            <Button onClick={handleSubmit((data) => sendRequest(data))} loading={loading} disabled={loading} title="Save Changes" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>
        </form>
      </div>

    </section>
  );
};

export default ModifyTeacher;