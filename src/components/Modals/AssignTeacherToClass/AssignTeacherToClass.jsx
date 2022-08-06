import React, {useEffect, useState, useCallback} from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./AssignTeacherToClass.module.scss";
import Button from "@/components/Button/Button";
import Select from "@/components/Select/Select";
import InputField from "@/components/Input/Input";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import { useDropzone } from "react-dropzone";

import { useForm, Controller } from "react-hook-form";
import { assignTeacherToClassValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import useGetAllClasses from "@/utils/useGetAllClasses";
import { reAssignTeacher, getAllTeachers } from "@/redux/Proprietor/ProprietorSlice";


const AssignTeacherToClass = () => {

  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modalState.modalData);
  const allClassesData = useGetAllClasses();
  console.log(modalData);

  const sendRequest = async (data) => {
    let response = await dispatch(reAssignTeacher({...data, teacher_id: modalData.id}));
    console.log(response);
    if(response.payload.success){
      dispatch(showModal({ action: "hide", type: "reAssignTeacher" }));
      dispatch(getAllTeachers());
    }
  };

  const resolver = yupResolver(assignTeacherToClassValidationSchema);

  const defaultValues = {
    name: modalData.name,
    class_id: ""
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

    <section className={cx(styles.assignTeacherToClassContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "assignTeacherToClass" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
	  <div className={cx(styles.header)}>
          <p>Assign Teacher To Class</p>
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
                label={"NAME"}
                placeholder="Name"
                readOnly
                error={errors?.name && errors?.name?.message}
              />
            )}
          />

          <Controller
            name="class_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label={"SELECT CLASS"}
                defaultSelect="Select"
                error={errors?.class_id && errors?.class_id?.message}
                options={getClassOptions(allClassesData)}
              />
            )}
          />


          <div onClick={handleSubmit((data) => sendRequest(data))} className={cx(styles.btnDiv, "flexRow")}>
            <Button title="Assign To Class" borderRadiusType="mediumRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>

     

        </form>
      </div>

    </section>
  );
};

AssignTeacherToClass.propTypes = {
  title: PropTypes.string
};

export default AssignTeacherToClass;