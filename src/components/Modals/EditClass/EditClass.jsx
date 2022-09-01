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
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedSubjectTeachers, setSelectedSubjectTeachers] = useState(modalData?.subjects);

  console.log(modalData);

  const sendRequest = async (data) => {
    console.log(data);
    let subjectArray = [];
    data.subjects.map((subject) => {
      data?.subject.map((teacher, index)=>{
        if(subject.label === teacher.subject){
          subjectArray.push({subject: subject?.value, teacher: teacher?.teacher?.value});
        }
      });
    });
    console.log(subjectArray);

    let {subject, ...rest} = data;

    let response = await dispatch(modifyClass({ ...rest, subjects: subjectArray, id: modalData.id }));
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

  const getTeacherOptions = (data) => {
    console.log(data);
    let options = [];
    Array.isArray(data) && data.map((teacher) => {
      options.push({
        value: teacher.id,
        label: teacher.name
      });
    });
    return options;
  };

  const resolver = yupResolver(modifyClassValidationSchema);

  const defaultValues = {
    name: modalData?.name,
    subjects: getSubjectsOptions(modalData?.subjects),
    description: modalData?.description,
    teacher_id: modalData?.teacher_id,
    subject: ""
  };

  const { register, handleSubmit, formState: { errors }, control, reset, setValue } = useForm({ defaultValues, resolver, mode: "all" });

  const handleSubjectChange = (e) => {
    let selectedSubjectsArray = [];
    let selectedSubjectTeachersArray = [];
    let selectedSubjects = e.map((subject) => {
      // return subject;
      selectedSubjectsArray.push(subject);
      selectedSubjectTeachersArray.push({subject: subject.label, id: subject.value});
      return subject;

    });
    console.log(selectedSubjects);
    setValue("subjects", selectedSubjects);
    setSelectedSubjects(selectedSubjectsArray);
    setSelectedSubjectTeachers(selectedSubjectTeachersArray);
  };

  const handleSubjectTeacherChange = (data, element, subject) => {
    console.log(data);
    console.log(element);
    console.log(subject);
    setValue(element.name, data);
  };

  console.log(selectedSubjectTeachers);

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
            render={({ field, ref }) => (
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
            render={({ field, ref }) => (
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
            render={({ field, ref }) => (
              <InputField
                {...field}
                label={"DESCRIPTION"}
                placeholder="Description"
                error={errors?.description && errors?.description?.message}
              />
            )}
          />

          <label className={cx(styles.outsideLabel)}>SELECT SUBJECTS</label>
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
                options={getSubjectsOptions(schoolSubjects)}
                onChange={(e) => handleSubjectChange(e)}
                error={errors?.subjects && errors?.subjects?.message}
              />
            )}
          />

          <label className={cx(styles.outsideLabel)}>SELECT SUBJECT TEACHER</label>
          <div className={cx(styles.subjectTeacherContainer, "flexCol")}>
            {selectedSubjectTeachers.map((subject, index) => {
              return (
                <div key={index} className={cx(styles.subjectTeacherItem, "flexRow")} >
                  <div className={cx(styles.labelDiv)}>
                    <p>{subject.subject}</p>
                    <input style={{display: "none"}} readOnly name={`subject[${index}]subject`} {...register(`subject.${index}.subject`)} value={subject.subject} />
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
                          defaultValue={{value: subject?.subject_teacher?.id, label: subject?.subject_teacher?.name}}
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
            <Button onClick={handleSubmit((data) => sendRequest(data))} title="Save Changes" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>



        </form>
      </div>

    </section>
  );
};

export default EditClass;