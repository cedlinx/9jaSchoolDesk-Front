import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./AddNewStudentByTeacher.module.scss";
import Button from "@/components/Button/Button";
import Select from "@/components/Select/Select";
import InputField from "@/components/Input/Input";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import SelectAutoComplete from "@/components/SelectAutoComplete";

import { useForm, Controller } from "react-hook-form";
import { addStudentValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import { addStudent, getAllStudents } from "@/redux/Teacher/TeacherSlice";
import useGetAllGuardians from "@/utils/useGetAllGuardians";
import useGetClassDetails from "@/utils/useGetClassDetails";




const AddNewStudentByTeacher = () => {

  const dispatch = useDispatch();
  const allClassesData = [useGetClassDetails()];
  const allGuardiansData = useGetAllGuardians();
  const schoolSubjects = useGetClassDetails().subjects;
  const classDetails = useGetClassDetails();
  const loading = useSelector((state) => state?.teacher?.loading);

  const sendRequest = async (data) => {
    
    let subjectArray = [];
    data.subjects.map((subject) => {
      subjectArray.push(subject.value);
    });
    let response = await dispatch(addStudent({ ...data, institution_id: classDetails.institution_id, subjects: subjectArray, guardian_email: data?.guardian_email[0]?.value }));

    if (response.payload.success) {
      dispatch(showModal({ action: "hide", type: "addNewStudentByTeacher" }));
      dispatch(getAllStudents(classDetails?.id));
    }
  };

  const resolver = yupResolver(addStudentValidationSchema);

  const defaultValues = {
    firstName: "",
    lastName: "",
    otherNames: "",
    gender: "",
    subjects: "",
    // phone: "",
    class_id: "",
    guardian_email: ""
    // guardian_id: ""
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  const getGuardianOptions = () => {
    let options = [];
    Array.isArray(allGuardiansData) && allGuardiansData.map((guardian) => {
      options.push({
        value: guardian.email,
        label: guardian.email
      });
    });
    return options;
  };

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

  const getSubjectsOptions = () => {
    let options = [];
    Array.isArray(schoolSubjects) && schoolSubjects.map((subject) => {
      options.push({
        value: subject.id,
        label: subject.subject
      });
    });
    return options;
  };

  return (

    <section className={cx(styles.addNewStudentByTeacherContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={() => dispatch(showModal({ action: "hide", type: "addNewStudentByTeacher" }))} icon="carbon:close-filled" color="white" />
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
              name="gender"
              control={control}
              render={({ field, ref }) => (
                <Select
                  {...field}
                  label={"GENDER"}
                  defaultSelect="Select"
                  error={errors?.gender && errors?.gender?.message}
                  options={[{ label: "Male", value: "male" }, { label: "Female", value: "female" }]}
                />
              )}
            />

            {/* <Controller
              name="phone"
              control={control}
              render={({ field, ref }) => (
                <InputField
                  {...field}
                  label={"PHONE"}
                  placeholder="Phone Number"
                  error={errors?.phone && errors?.phone?.message}
                />
              )}
            /> */}

            <Controller
              name="class_id"
              control={control}
              render={({ field, ref }) => (
                <Select
                  {...field}
                  label={"ASSIGN CLASS"}
                  defaultSelect="Select"
                  error={errors?.class_id && errors?.class_id?.message}
                  options={getClassOptions(allClassesData)}
                />
              )}
            />

            <div className={cx(styles.selectAutoCompleteWrapper)} style={{ width: "100%" }}>
              <label className={cx(styles.subjectsLabel)}>SELECT GUARDIAN EMAIL</label>
              <Controller
                name="guardian_email"
                control={control}
                render={({ field, ref }) => (
                  < SelectAutoComplete
                    {...field}
                    isClearable={true}
                    placeholder={""}
                    isMulti
                    marginbottom="1.5rem"
                    options={getGuardianOptions(allGuardiansData)}
                    error={errors?.guardian_email && errors?.guardian_email?.message}
                  />
                )}
              />
            </div>

            <div className={cx(styles.selectAutoCompleteWrapper)} style={{ width: "100%" }}>
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
                    options={getSubjectsOptions()}
                    error={errors?.subjects && errors?.subjects?.message}
                  />
                )}
              />
            </div>

          </div>

          <div className={cx(styles.btnDiv, "flexRow")}>
            <Button loading={loading} disabled={loading} onClick={handleSubmit((data) => sendRequest(data))} title="Add Student" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>
        </form>
      </div>

    </section>
  );
};

export default AddNewStudentByTeacher;