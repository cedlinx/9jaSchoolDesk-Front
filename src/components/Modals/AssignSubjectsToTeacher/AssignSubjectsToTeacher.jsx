import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./AssignSubjectsToTeacher.module.scss";
import Button from "@/components/Button/Button";
import Select from "@/components/Select/Select";
import InputField from "@/components/Input/Input";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";

import { useForm, Controller } from "react-hook-form";
import { assignSubjectsToTeacherValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import useGetAllClasses from "@/utils/useGetAllClasses";
import { assignSubjectToTeacher, getAllTeachers } from "@/redux/Proprietor/ProprietorSlice";

import useGetInstitutionID from "@/utils/useGetInstitutionID";
import useGetAllSubjects from "@/utils/useGetAllSubjects";
import SelectAutoComplete from "@/components/SelectAutoComplete";


const AssignSubjectsToTeacher = () => {

  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modalState.modalData);
  const allClassesData = useGetAllClasses();
  
  const schoolSubjects = useGetAllSubjects();
  let institution_id = useGetInstitutionID();

  const sendRequest = async (data) => {
    
    let subjects = [];
    data.subjects.map((subject) => {
      subjects.push(subject.value);
    } );

    let response = await dispatch(assignSubjectToTeacher({subjects: subjects, id: modalData.id}));
    
    if(response.payload.success){
      dispatch(showModal({ action: "hide", type: "assignSubjectToTeacher" }));
      dispatch(getAllTeachers());
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

  const resolver = yupResolver(assignSubjectsToTeacherValidationSchema);

  const defaultValues = {
    name: modalData?.name,
    subjects: getSubjectsOptions(modalData?.subjects)
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });
  

  // const getClassOptions = () => {
  //   let options = [];
  //   Array.isArray(allClassesData) && allClassesData.map((classData) => {
  //     options.push({
  //       value: classData.id,
  //       label: classData.name
  //     });
  //   });
  //   return options;
  // };



  return (

    <section className={cx(styles.assignSubjectsToTeacherContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "assignSubjectsToTeacher" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
	  <div className={cx(styles.header)}>
          <p>Assign Subject(s) To Teacher</p>
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
                  // defaultValue={getSubjectsOptions()}
                  options={getSubjectsOptions(schoolSubjects)}
                  error={errors?.subjects && errors?.subjects?.message}
                />
              )}
            />
          </div>


          <div className={cx(styles.btnDiv, "flexRow")}>
            <Button onClick={handleSubmit((data) => sendRequest(data))} title="Assign Subjects" borderRadiusType="mediumRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>
        </form>
      </div>

    </section>
  );
};

export default AssignSubjectsToTeacher;