import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import cx from "classnames";
import styles from "./AddNewStudent.module.scss";
import Button from "@/components/Button/Button";
import Select from "@/components/Select/Select";
import InputField from "@/components/Input/Input";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import { addStudent, getAllStudents } from "@/redux/Proprietor/ProprietorSlice";

import { useForm, Controller } from "react-hook-form";
import { addStudentValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import useGetAllClasses from "@/utils/useGetAllClasses";
import useGetAllGuardians from "@/utils/useGetAllGuardians";
import useGetInstitutionID from "@/utils/useGetInstitutionID";
import useGetAllSubjects from "@/utils/useGetAllSubjects";
import SelectAutoComplete from "@/components/SelectAutoComplete";


const AddNewStudent = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allClassesData = useGetAllClasses();
  const allGuardiansData = useGetAllGuardians();
  const schoolSubjects = useGetAllSubjects();
  let institution_id = useGetInstitutionID();

  const sendRequest = async (data) => {
    console.log(data);
    let subjectArray = [];
    Array.isArray(data.subjects) && data.subjects.map((subject) => {
      subjectArray.push(subject.value);
    });
    let response = await dispatch(addStudent({ ...data, institution_id: institution_id, subjects: subjectArray, guardian_email: data?.guardian_email?.value }));

    if (response.payload.success) {
      dispatch(showModal({ action: "hide", type: "addNewStudent" }));
      dispatch(getAllStudents());
    }
  };

  const resolver = yupResolver(addStudentValidationSchema);

  const defaultValues = {
    // name: "",
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
    console.log(allGuardiansData);
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
  console.log(errors);

  const handleNavigateToClasses =()=>{
    dispatch(showModal({action: "hide", type: "addTeacher"}));
    navigate("/proprietor/classes");
  };

  return (

    <section className={cx(styles.addNewStudentContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={() => dispatch(showModal({ action: "hide", type: "addNewStudent" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
        <div className={cx(styles.header)}>
          <p>Add New Student</p>
        </div>

        {Array.isArray(allClassesData) && allClassesData.length === 0 && <div className ={cx(styles.addClassDiv, "flexCol")}>
          <p> No Class has been registered. Kindly create at least one class before continuing </p>
          <Button onClick={()=> handleNavigateToClasses()} title="Add Class" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
        </div>}

        { Array.isArray(allClassesData) && allClassesData.length > 0 &&  <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
          className=""
                                                                         >

          <div className={cx(styles.inputsWrapper, "flexRow")}>

            {/* <Controller
              name="name"
              control={control}
              render={({ field, ref }) => (
                <InputField
                  {...field}
                  label={"NAME"}
                  placeholder="Name"
                  error={errors?.name && errors?.name?.message}
                />
              )}
            /> */}

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

            {/* <Controller
              name="guardian_email"
              control={control}
              render={({ field, ref }) => (
                <Select
                  {...field}
                  label={"SELECT GUARDIAN EMAIL"}
                  defaultSelect="Select Email"
                  options={getGuardianOptions(allGuardiansData)}
                  error={errors?.guardian_email && errors?.guardian_email?.message}
                />
              )}
            /> */}

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

            {/* <Controller
              name="guardian_id"
              control={control}
              render={({ field, ref }) => (
                <Select
                  {...field}
                  label={"SELECT GUARDIAN"}
                  defaultSelect="Select"
                  error={errors?.guardian_id && errors?.guardian_id?.message}
                  options={getGuardianOptions(allGuardiansData)}
                />
              )}
            /> */}

          </div>

          <div className={cx(styles.btnDiv, "flexRow")}>
            <Button onClick={handleSubmit((data) => sendRequest(data))} title="Add Student" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>
        </form>}
      </div>

    </section>
  );
};

export default AddNewStudent;