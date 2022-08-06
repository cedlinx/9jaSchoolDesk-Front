import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./EditClass.module.scss";
import Button from "@/components/Button/Button";
import Select from "@/components/Select/Select";
import InputField from "@/components/Input/Input";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import { useDropzone } from "react-dropzone";

import { modifyClass, getAllClasses } from "@/redux/Proprietor/ProprietorSlice";
import SelectAutoComplete from "@/components/SelectAutoComplete";

import { useForm, Controller } from "react-hook-form";
import { modifyClassValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import useGetAllTeachers from "@/utils/useGetAllTeachers";
import useGetAllSubjects from "@/utils/useGetAllSubjects";



const EditClass = () => {

  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modalState.modalData);
  const allTeachersData = useGetAllTeachers();
  const schoolSubjects = useGetAllSubjects();

  const sendRequest = async (data) => {
    let subjectArray = [];
    data.subjects.map((subject) => {
      subjectArray.push(subject.value);
    });

    let response = await dispatch(modifyClass({ ...data, subjects: subjectArray, id: modalData.id }));
    if (response.payload.success) {
      dispatch(showModal({ action: "hide", type: "editClass" }));
      dispatch(getAllClasses());
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

  const resolver = yupResolver(modifyClassValidationSchema);

  const defaultValues = {
    name: modalData?.name,
    subjects: getSubjectsOptions(modalData?.subjects),
    description: modalData?.description,
    teacher_id: modalData?.teacher_id
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

  console.log(defaultValues.subjects);

  return (

    <section className={cx(styles.editClassContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={() => dispatch(showModal({ action: "hide", type: "editClass" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
        <div className={cx(styles.header)}>
          <p>Edit Class</p>
        </div>
        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
          className=""
        >

          <Controller
            name="teacher_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label={"CLASS TEACHER"}
                defaultSelect="Select Teacher"
                error={errors?.teacher_id && errors?.teacher_id?.message}
                options={getTeacherOptions(allTeachersData)}
              />
            )}
          />

          {/* <small>Select from Teacher Database</small> */}

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label={"CLASS NAME"}
                placeholder="Class Name"
                error={errors?.name && errors?.name?.message}
                options={[{ label: "", value: "" }]}
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


          <div className={cx(styles.btnDiv, "flexRow")}>
            <Button onClick={handleSubmit((data) => sendRequest(data))} title="Save Changes" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>



        </form>
      </div>

    </section>
  );
};

export default EditClass;