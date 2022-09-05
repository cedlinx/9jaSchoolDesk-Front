import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./AddTeacher.module.scss";
import Button from "@/components/Button/Button";
import Select from "@/components/Select/Select";
import InputField from "@/components/Input/Input";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

import { addTeacher, getAllSubjects, getAllTeachers } from "@/redux/Proprietor/ProprietorSlice";

import { useForm, Controller } from "react-hook-form";
import { addTeacherValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import useGetInstitutionID from "@/utils/useGetInstitutionID";
import useGetAllSubjects from "@/utils/useGetAllSubjects";
import SelectAutoComplete from "@/components/SelectAutoComplete";


const AddTeacher = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.proprietor.loading);
  const schoolSubjects = useGetAllSubjects();
  let institution_id = useGetInstitutionID();

  console.log(schoolSubjects);

  const sendRequest = async (data) => {
    let subjectArray = [];
    Array.isArray(data.subjects) && data.subjects.map((subject) => {
      subjectArray.push(subject.value);
    });

    let response = await dispatch(addTeacher({ ...data, subjects: subjectArray, institution_id: institution_id }));
    if (response.payload.success) {
      dispatch(getAllTeachers());
      dispatch(showModal({ action: "hide", type: "addTeacher" }));
    }
  };

  const resolver = yupResolver(addTeacherValidationSchema);

  const defaultValues = {
    firstName: "",
    lastName: "",
    otherNames: "",
    email: "",
    phone: "",
    subjects: ""
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

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

  const handleNavigateToSubjects = () => {
    dispatch(showModal({action: "hide", type: "addTeacher"}));
    navigate("/proprietor/subjects");
  };
    

  return (

    <section className={cx(styles.addTeacherContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={() => dispatch(showModal({ action: "hide", type: "addTeacher" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
        <div className={cx(styles.header)}>
          <p>Add New Teacher</p>
        </div>

        {Array.isArray(schoolSubjects) && schoolSubjects.length === 0 && <div className ={cx(styles.addSubjectDiv, "flexCol")}>
          <p> No Subject has been registered. Kindly create at least one subject before continuing </p>
          <Button onClick={()=> handleNavigateToSubjects()} title="Add Subject" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
        </div>}

        {Array.isArray(schoolSubjects) && schoolSubjects.length > 0 &&  <form
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
              name="phone"
              control={control}
              render={({ field, ref }) => (
                <InputField
                  {...field}
                  label={"PHONE NUMBER"}
                  placeholder="Phone Number"
                  error={errors?.phone && errors?.phone?.message}
                />
              )}
            />

            <div className={cx(styles.emailWrapper)} style={{ width: "100%" }}>
              <Controller
                name="email"
                control={control}
                render={({ field, ref }) => (
                  <InputField
                    {...field}
                    label={"EMAIL"}
                    placeholder="email@email.com"
                    error={errors?.email && errors?.email?.message}
                    options={[{ label: "", value: "" }]}
                  />
                )}
              />
            </div>

            <div style={{ width: "100%" }}>
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


          {/* <span className={cx(styles.span)}>Or</span>
          <small className={cx(styles.small)}>Add from Teacher Database</small> */}

          <div className={cx(styles.btnDiv, "flexRow")}>
            <Button onClick={handleSubmit((data) => sendRequest(data))} loading={loading} disabled={loading} title="Add Teacher" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>



        </form>}
      </div>

    </section>
  );
};

export default AddTeacher;