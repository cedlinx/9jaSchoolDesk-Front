import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./AddSubject.module.scss";
import Button from "@/components/Button/Button";
import Select from "@/components/Select/Select";
import InputField from "@/components/Input/Input";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import { useDropzone } from "react-dropzone";
import { addSubject, getAllSubjects } from "@/redux/Proprietor/ProprietorSlice";
import useGetInstitutionID from "@/utils/useGetInstitutionID";

import { useForm, Controller } from "react-hook-form";
import { addSubjectValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectAutoComplete from "@/components/SelectAutoComplete";
import schoolSubjects from "@/helpers/schoolSubjects";


const AddSubject = () => {

  const dispatch = useDispatch();
  let institution_id = useGetInstitutionID();
  const loading = useSelector((state) => state.proprietor.loading);

  const sendRequest = async (data) => {
    let subjectArray = [];
    data.subjects.map((subject) => {
      subjectArray.push(subject.label);
    });

    console.log(subjectArray, "sub array");

    let response = await dispatch(addSubject({ subjects: subjectArray }));
    if (response.payload.success) {
      dispatch(showModal({ action: "hide", type: "addSubject" }));
      dispatch(getAllSubjects());
    }
  };

  const resolver = yupResolver(addSubjectValidationSchema);

  const defaultValues = {
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

  return (

    <section className={cx(styles.addSubjectContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={() => dispatch(showModal({ action: "hide", type: "addSubject" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
        <div className={cx(styles.header)}>
          <p>Add Subject(s)</p>
        </div>
        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
          className=""
        >

          <span htmlFor="subjects">*Kindly select the subject. You can also create new subjects by typing the subject and pressing enter or click the create option in the dropdown</span>
          <Controller
            name="subjects"
            control={control}
            render={({ field }) => (
              <SelectAutoComplete
                {...field}
                // label={"Select Student"}
                isMulti={true}
                isClearable={true}
                isCreatable={true}
                marginbottom="1.5rem"
                placeholder=""
                options={getSubjectsOptions(schoolSubjects)}
                error={errors?.subjects && errors?.subjects?.message}
              />
            )}
          />




          <div className={cx(styles.btnDiv, "flexRow")}>
            <Button loading={loading} disabled={loading} onClick={handleSubmit((data) => sendRequest(data))} title="Add Subjects" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>



        </form>
      </div>

    </section>
  );
};

export default AddSubject;