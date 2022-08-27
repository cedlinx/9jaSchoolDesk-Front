import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./ModifyStudent.module.scss";
import Button from "@/components/Button/Button";
import Select from "@/components/Select/Select";
import InputField from "@/components/Input/Input";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import { getAllStudents, modifyStudent } from "@/redux/Proprietor/ProprietorSlice";
import SelectAutoComplete from "@/components/SelectAutoComplete";
import { useForm, Controller } from "react-hook-form";
import { modifyStudentValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import useGetAllClasses from "@/utils/useGetAllClasses";
import useGetAllSubjects from "@/utils/useGetAllSubjects";


const ModifyStudent = () => {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.proprietor.loading);
  const modalData = useSelector((state) => state.modalState.modalData);
  const schoolSubjects = useGetAllSubjects();
  const allClassesData = useGetAllClasses();

  const sendRequest = async (data) => {
    let subjectArray = [];
    data.subjects.map((subject) => {
      subjectArray.push(subject.value);
    });

    let response = await dispatch(modifyStudent({ ...data, id: modalData.id, subjects: subjectArray }));
    if (response.payload.success) {
      dispatch(showModal({ action: "hide", type: "modifyStudent" }));
      dispatch(getAllStudents());
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

  const resolver = yupResolver(modifyStudentValidationSchema);

  const defaultValues = {
    class_id: modalData?.class_id,
    firstName: modalData?.firstName,
    lastName: modalData?.lastName,
    otherNames: modalData?.otherNames,
    subjects: getSubjectsOptions(modalData?.subjects)
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  const getClassOptions = () => {
    let options = [];
    Array.isArray(allClassesData) && allClassesData.map((classData) => {
      options.push({
        value: classData.id,
        label: classData.name
      });
    });
    return options;
  };

  return (

    <section className={cx(styles.modifyStudentContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={() => dispatch(showModal({ action: "hide", type: "modifyStudent" }))} icon="carbon:close-filled" color="white" />
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
            name="firstName"
            control={control}
            render={({ field, ref }) => (
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
            render={({ field, ref }) => (
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
            render={({ field, ref }) => (
              <InputField
                {...field}
                label={"OTHER NAMES"}
                placeholder="Other Names"
                error={errors?.otherNames && errors?.otherNames?.message}
              />
            )}
          />

          <Controller
            name="class_id"
            control={control}
            render={({ field, ref }) => (
              <Select
                {...field}
                label={"SELECT CLASS"}
                defaultSelect="Select Class"
                error={errors?.class_id && errors?.class_id?.message}
                options={getClassOptions(allClassesData)}
              />
            )}
          />

          <label className={cx(styles.subjectsLabel)}>SELECT SUBJECTS</label>
          <Controller
            name="subjects"
            control={control}
            render={({ field, ref }) => (
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



          <div onClick={handleSubmit((data) => sendRequest(data))} className={cx(styles.btnDiv, "flexRow")}>
            <Button loading={loading} disabled={loading} title="Save Changes" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>
        </form>
      </div>

    </section>
  );
};

export default ModifyStudent;