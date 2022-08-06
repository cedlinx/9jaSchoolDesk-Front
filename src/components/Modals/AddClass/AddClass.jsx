import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./AddClass.module.scss";
import Button from "@/components/Button/Button";
import Select from "@/components/Select/Select";
import InputField from "@/components/Input/Input";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import { useDropzone } from "react-dropzone";
import { addClass, getAllClasses } from "@/redux/Proprietor/ProprietorSlice";
import useGetInstitutionID from "@/utils/useGetInstitutionID";

import { useForm, Controller } from "react-hook-form";
import { addClassValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import useGetAllTeachers from "@/utils/useGetAllTeachers";
import SelectAutoComplete from "@/components/SelectAutoComplete";
// import schoolSubjects from "@/helpers/schoolSubjects";
import useGetAllSubjects from "@/utils/useGetAllSubjects";




const AddClass = () => {

  const dispatch = useDispatch();
  let institution_id = useGetInstitutionID();
  const loading = useSelector((state) => state.proprietor.loading);
  const allTeachersData = useGetAllTeachers();
  const schoolSubjects = useGetAllSubjects();

  const sendRequest = async (data) => {
    let subjectArray = [];
    data.subjects.map((subject, index) => {
      subjectArray.push(index);
    });

    let response = await dispatch(addClass({ ...data, subjects: subjectArray, institution_id: institution_id }));
    if (response.payload.success) {
      dispatch(showModal({ action: "hide", type: "addClass" }));
      dispatch(getAllClasses());
    }
  };

  const resolver = yupResolver(addClassValidationSchema);

  const defaultValues = {
    name: "",
    description: "",
    subjects: ""
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  const [imgData, setImgData] = useState({
    file: "",
    imagePreviewUrl: ""
  });

  const onDrop = useCallback(acceptedFiles => {
    let file = (acceptedFiles[0]);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgData({ file: file, imagePreviewUrl: reader.result });
    };
    reader.readAsDataURL(file);
  }, []);

  const { getInputProps, getRootProps } = useDropzone({ onDrop, accept: "image/*" });

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

  const getTeacherOptions = () => {
    let options = [];
    Array.isArray(allTeachersData) && allTeachersData.map((teacher) => {
      options.push({
        value: teacher.id,
        label: teacher.name
      });
    });
    return options;
  };

  return (

    <section className={cx(styles.addClassContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={() => dispatch(showModal({ action: "hide", type: "addClass" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
        <div className={cx(styles.header)}>
          <p>Add New Class</p>
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
                label={"CLASS NAME"}
                placeholder="Class Name"
                error={errors?.name && errors?.name?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label={"DESCRIPTION"}
                placeholder="Description"
                error={errors?.description && errors?.description?.message}
              />
            )}
          />

          <Controller
            name="teacher_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label={"CLASS TEACHER"}
                defaultSelect="Select"
                error={errors?.teacher_id && errors?.teacher_id?.message}
                options={getTeacherOptions(allTeachersData)}
              />
            )}
          />

          <label className={cx(styles.subjectsLabel)}>SELECT SUBJECTS</label>
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
            <Button loading={loading} disabled={loading} onClick={handleSubmit((data) => sendRequest(data))} title="Add Class" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>



        </form>
      </div>

    </section>
  );
};

export default AddClass;