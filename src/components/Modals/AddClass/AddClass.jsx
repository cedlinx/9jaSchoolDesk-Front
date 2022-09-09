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
import { useNavigate } from "react-router-dom";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { addClassValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import useGetAllTeachers from "@/utils/useGetAllTeachers";
import SelectAutoComplete from "@/components/SelectAutoComplete";
// import schoolSubjects from "@/helpers/schoolSubjects";
import useGetAllSubjects from "@/utils/useGetAllSubjects";




const AddClass = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let institution_id = useGetInstitutionID();
  const loading = useSelector((state) => state.proprietor.loading);
  const allTeachersData = useGetAllTeachers();
  const schoolSubjects = useGetAllSubjects();
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedSubjectTeachers, setSelectedSubjectTeachers] = useState([]);

  const sendRequest = async (data) => {
    
    let subjectArray = [];
    Array.isArray(data.subjects) && data.subjects.map((subject, index) => {
      data.subject.map((subjectName, index) => {
        if(subjectName.subject === subject.label){
          subjectArray.push({subject_id: subject?.value, teacher_id: subjectName?.teacher?.value});
        }
      });
    });
    let {subject, ...rest} = data;

    let response = await dispatch(addClass({ ...rest, subjects: subjectArray, institution_id: institution_id }));
    if (response.payload.success) {
      dispatch(showModal({ action: "hide", type: "addClass" }));
      dispatch(getAllClasses());
    }
  };

  const resolver = yupResolver(addClassValidationSchema);

  const defaultValues = {
    name: "",
    description: "",
    subjects: "",
    subject: ""
  };

  const { register, watch, handleSubmit, formState: { errors }, control, reset, setValue } = useForm({ defaultValues, resolver, mode: "all" });

  // const { append, remove } = useFieldArray({
  //   control,
  //   name: "test"
  // });

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

  const handleSubjectChange = (e) => {
    let selectedSubjects = e.map((subject) => {
      return subject;
    });
    setValue("subjects", selectedSubjects);
    setSelectedSubjects(selectedSubjects);
    setSelectedSubjectTeachers(selectedSubjects);
  };

  const handleSubjectTeacherChange = (data, element, subject) => {
    setValue(element.name, data);
  };

  const handleNavigateToSubjects = () => {
    dispatch(showModal({action: "hide", type: "addTeacher"}));
    navigate("/proprietor/subjects");
  };

  const handleNavigateToTeachers = () => {
    dispatch(showModal({action: "hide", type: "addTeacher"}));
    navigate("/proprietor/teachers");
  };

  console.log(schoolSubjects);
  console.log(allTeachersData);

  return (

    <section className={cx(styles.addClassContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={() => dispatch(showModal({ action: "hide", type: "addClass" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
        <div className={cx(styles.header)}>
          <p>Add New Class</p>
        </div>

        {Array.isArray(schoolSubjects) && schoolSubjects.length === 0 || Array.isArray(allTeachersData) && allTeachersData.length === 0 ? <div className ={cx(styles.addSubjectDiv, "flexCol")}>
          <p> No Subject and/or Teacher has been registered. Kindly create at least one of each before continuing </p>
          <div className={cx(styles.btnDiv, "flexRow")}>

            {schoolSubjects.length === 0 && <Button onClick={()=> handleNavigateToSubjects()} title="Add Subject" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />}

            {allTeachersData.length === 0 && <Button onClick={()=> handleNavigateToTeachers()} title="Add Teacher" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />}

          </div>
        </div> : null}

        {Array.isArray(schoolSubjects) && schoolSubjects.length > 0 && Array.isArray(allTeachersData) && allTeachersData.length > 0 &&  <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
          className=""
                                                                                                                                        >

          <Controller
            name="name"
            control={control}
            render={({ field, ref }) => (
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
            render={({ field, ref }) => (
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
            render={({ field, ref }) => (
              <Select
                {...field}
                label={"CLASS TEACHER"}
                defaultSelect="Select"
                error={errors?.teacher_id && errors?.teacher_id?.message}
                options={getTeacherOptions(allTeachersData)}
              />
            )}
          />

          <label className={cx(styles.outsideLabel)}>SELECT SUBJECTS</label>
          <Controller
            name="subjects"
            control={control}
            render={({ field, ref }) => (
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
                onChange={(e) => handleSubjectChange(e)}
              />
            )}
          />

          <label className={cx(styles.outsideLabel)}>SELECT SUBJECT TEACHER</label>
          <div className={cx(styles.subjectTeacherContainer, "flexCol")}>
            {selectedSubjectTeachers.map((subject, index) => {
              return (
                <div key={index} className={cx(styles.subjectTeacherItem, "flexRow")} >
                  <div className={cx(styles.labelDiv)}>
                    <p>{subject.label}</p>
                    <input style={{display: "none"}} readOnly name={`subject[${index}]subject`} {...register(`subject.${index}.subject`)} value={subject.label} />
                  </div>
                  <div className={cx(styles.selectDiv)}>
                    <Controller
                      // name="subject_teacher_id"
                      name={`subject[${index}]teacher`} 
                      {...register(`subject.${index}.teacher`)}
                      control={control}
                      render={({ field, ref }) => (
                        <SelectAutoComplete
                          {...field}
                          // label={"Select Teacher"}
                          isMulti={false}
                          isClearable={false}
                          isCreatable={false}
                          marginbottom="0rem"
                          placeholder=""
                          options={getTeacherOptions(allTeachersData)}
                          onChange={(data, element) => handleSubjectTeacherChange(data, element,  subject)}
                          error={errors?.subject?.[index]?.teacher && errors?.subject?.[index]?.teacher?.message}
                        />
                      )}
                    />
                  </div>
                
                </div>
              );
            }
            )}


          </div>
        

     




          <div className={cx(styles.btnDiv, "flexRow")}>
            <Button loading={loading} disabled={loading} onClick={handleSubmit((data) => sendRequest(data))} title="Add Class" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>



        </form>}
      </div>

    </section>
  );
};

export default AddClass;