import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./UrgentInfoTeacher.module.scss";
import Button from "@/components/Button/Button";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import TextInput from "@/components/TextInput/TextInput";
import InputField from "@/components/Input/Input";

import { sendNotification } from "@/redux/Teacher/TeacherSlice";

import { useForm, Controller } from "react-hook-form";
import { urgentInfoTeacherValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectAutoComplete from "@/components/SelectAutoComplete";
import useGetAllClassStudents from "@/utils/useGetAllClassStudents";
import useGetClassID from "@/utils/useGetClassID";


const UrgentInfoTeacher = () => {

  const dispatch = useDispatch();
  const classID = useGetClassID();
  const allStudentsData = useGetAllClassStudents(classID);
  const loading = useSelector((state) => state.teacher.loading);

  const sendRequest = async (data) => {
    
    let response = await dispatch(sendNotification({ message: data.message, student_id: data?.student_id?.value}));
    if(response.payload.success){
      dispatch(showModal({ action: "hide", type: "urgentInfoTeacher" }));
    }
  };

  const resolver = yupResolver(urgentInfoTeacherValidationSchema);

  const defaultValues = {
    message: "",
    student_id: ""
  };

  const { handleSubmit, formState: { errors }, control } = useForm({ defaultValues, resolver, mode: "all" });

  const getStudentOptions = (data) => {
    let options = [];
    
    Array.isArray(data) && data.map((student) => {
      options.push({
        value: student.id,
        label: student.name
      });
    });
    return options;
  };

  


  return (

    <section className={cx(styles.urgentInfoTeacherContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "urgentInfoTeacher" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
	  <div className={cx(styles.header, "flexCol")}>
          <p>Urgent Info</p>
          <small>*This sends an instant notification to the parent of the ward</small>
        </div>
        
        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
        >

          {/* <Controller
            name="recipients"
            control={control}
            render={({ field, ref }) => (
              <InputField
                {...field}
                label="Guardians Email"
                placeholder="Enter recipient(s) email separated by commas"
                error={errors?.recipients && errors?.recipients?.message}
              />
            )}
          /> */}

          <div className={cx(styles.selectAutoCompleteWrapper)} style={{ width: "100%" }}>
            <label className={cx(styles.subjectsLabel)}>SELECT GUARDIAN EMAIL</label>
            <Controller
              name="student_id"
              control={control}
              render={({ field, ref }) => (
                < SelectAutoComplete
                  {...field}
                  isClearable={true}
                  placeholder={""}
                  marginbottom="0rem"
                  options={getStudentOptions(allStudentsData?.wards)}
                  error={errors?.student_id && errors?.student_id?.message}
                />
              )}
            />
          </div>
            
          <Controller
            name="message"
            control={control}
            render={({ field, ref }) => (
              <TextInput
                {...field}
                placeholder="Enter message"
                error={errors?.message && errors?.message?.message}
              />
            )}
          />
               
          <div  className={cx(styles.btnDiv, "flexRow")}>
            <Button loading={loading} disabled ={loading} onClick={handleSubmit((data) => sendRequest(data))} title="Send" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#D25B5D" hoverColor="#D25B5D" hoverBg="#fff" />
          </div>

        </form>
      </div>

    </section>
  );
};

export default UrgentInfoTeacher;