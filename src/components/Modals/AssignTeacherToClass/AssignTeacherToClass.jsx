import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./AssignTeacherToClass.module.scss";
import Button from "@/components/Button/Button";
import Select from "@/components/Select/Select";
import InputField from "@/components/Input/Input";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";

import { useForm, Controller } from "react-hook-form";
import { assignTeacherToClassValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import useGetAllClasses from "@/utils/useGetAllClasses";
import useGetAllTeachers from "@/utils/useGetAllTeachers";
import { reAssignTeacher, getAllTeachers, getAllClasses } from "@/redux/Proprietor/ProprietorSlice";


const AssignTeacherToClass = () => {

  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modalState.modalData);
  const allClassesData = useGetAllClasses();
  const allTeachersData = useGetAllTeachers();
  console.log(modalData);

  const sendRequest = async (data) => {
    console.log(data);
    let {name, ...rest} = data;
    // let response = await dispatch(reAssignTeacher({...data, teacher_id: modalData?.category === "teacher" ? modalData.id : data?.teacher_id}));
    // console.log(response);
    // if(response.payload.success){
    //   dispatch(showModal({ action: "hide", type: "reAssignTeacher" }));
    //   dispatch(getAllTeachers());
    // }

    let response = await dispatch(reAssignTeacher(rest));
    console.log(response);
    if(response.payload.success){
      dispatch(showModal({ action: "hide", type: "reAssignTeacher" }));
      modalData.category === "class" ? dispatch(getAllClasses()) : dispatch(getAllTeachers());
      // dispatch(getAllTeachers());
    }
  };

  const resolver = yupResolver(assignTeacherToClassValidationSchema);

  const defaultValues = {
    name: modalData.data.name,
    class_id: modalData.category === "class" ? modalData.data.id : "",
    teacher_id: modalData.category === "teacher" ? modalData.data.id : ""
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });
  console.log(errors);
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

  const getTeacherOptions = () => {
    let options = [];
    Array.isArray(allTeachersData) && allTeachersData.map((teacherData) => {
      options.push({
        value: teacherData.id,
        label: teacherData.name
      });
    }).sort((a, b) => a.label.localeCompare(b.label));
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
            render={({ field, ref }) => (
              <InputField
                {...field}
                label={"NAME"}
                placeholder="Name"
                readOnly
                error={errors?.name && errors?.name?.message}
              />
            )}
          />

          {modalData?.category === "teacher" &&
            <Controller
              name="class_id"
              control={control}
              render={({ field, ref }) => (
                <Select
                  {...field}
                  label={"SELECT CLASS"}
                  defaultSelect="Select"
                  error={errors?.class_id && errors?.class_id?.message}
                  options={getClassOptions(allClassesData)}
                />
              )}
            />}

          {modalData?.category === "class" && 
          <Controller
            name="teacher_id"
            control={control}
            render={({ field, ref }) => (
              <Select
                {...field}
                label={"SELECT TEACHER"}
                defaultSelect="Select"
                error={errors?.teacher_id && errors?.teacher_id?.message}
                options={getTeacherOptions(allTeachersData)}
              />
            )}
          />
          }


          <div onClick={handleSubmit((data) => sendRequest(data))} className={cx(styles.btnDiv, "flexRow")}>
            <Button title="Assign To Class" borderRadiusType="mediumRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>
        </form>
      </div>

    </section>
  );
};

export default AssignTeacherToClass;