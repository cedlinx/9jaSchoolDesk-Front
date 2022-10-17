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
import useGetInstitutionID from "@/utils/useGetInstitutionID";



const EditClass = () => {

  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modalState.modalData);
  const allTeachersData = useGetAllTeachers();
  const schoolSubjects = useGetAllSubjects();
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedSubjectTeachers, setSelectedSubjectTeachers] = useState(modalData?.subjects);
  let institution_id = useGetInstitutionID();


  const sendRequest = async (data) => {
    console.log(data, "sendRequest");
    let subjectArray = [];
    data.subjects.map((subject) => {
      data?.subject.map((teacher, index)=>{
        if(subject.value === teacher.subject.value){
          subjectArray.push({subject: subject?.value, teacher: teacher?.teacher?.value});
        }
      });
    });
    console.log(subjectArray);

    let {subject, ...rest} = data;

    let response = await dispatch(modifyClass({ ...rest, subjects: subjectArray, id: modalData.id, institution_id: institution_id}));
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
    // teacher_id: getTeacherOptions(allTeachersData).filter((teacher) => teacher.value === modalData?.teacher.id),
    teacher_id: modalData?.teacher.id,
    subject: selectedSubjectTeachers
  };

  console.log(modalData, "modaldata");

  const { register, handleSubmit, formState: { errors }, control, reset, setValue } = useForm({ defaultValues, resolver, mode: "all" });

  useEffect(() =>{
    let selectedSubjectTeachersArray = [];

    selectedSubjectTeachers.map((element) => {
      console.log(element);
      selectedSubjectTeachersArray.push(
        {
          subject: {
            value: element.id,
            label: element.subject
          },
          teacher:{
            value: element?.subject_teacher?.id,
            label: element?.subject_teacher?.name
          }   
        });
    });

    console.log(selectedSubjectTeachersArray);
    setSelectedSubjectTeachers(selectedSubjectTeachersArray);

    reset({
      name: modalData?.name,
      subjects: getSubjectsOptions(modalData?.subjects),
      description: modalData?.description,
      teacher_id: modalData?.teacher.id,
      // teacher_id: getTeacherOptions(allTeachersData).filter((teacher) => teacher.value === modalData?.teacher.id),
      subject: selectedSubjectTeachersArray
    });
  },[modalData, reset]);

  const handleSubjectChange = (data) => {
    console.log(data);
    let selectedSubjectTeachersArray = [];
    data.map((subject) => {
      // selectedSubjectTeachersArray.push({subject: {label: subject.label, value: subject.value}});
      // console.log(selectedSubjectTeachers);
      let answer = selectedSubjectTeachers.find((element) => {
        return element.subject.value === subject.value;
      });
      if(answer){
        console.log(answer);
        selectedSubjectTeachersArray.push(answer);
      }else{
        selectedSubjectTeachersArray.push({subject: {label: subject.label, value: subject.value}, teacher: {label: "", value: ""}});
      }
    });

    console.log(selectedSubjectTeachersArray);
    setValue("subjects", data);
    setSelectedSubjects(data);
    setValue("subject", selectedSubjectTeachersArray);
    setSelectedSubjectTeachers([]);
    setSelectedSubjectTeachers(selectedSubjectTeachersArray);
  };

  const handleSubjectTeacherChange = (data, element, subject) => {
    
    console.log(element);
    console.log(subject);
    console.log(data);

    setValue(element.name, data);
  };

  console.log(selectedSubjectTeachers, "selectedSubjectTeachers");

  console.log(defaultValues.subject);
  console.log(defaultValues);

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
                    {subject?.subject?.label && <p>{subject?.subject?.label}</p>}
                    <input style={{display: "none"}} readOnly 
                      name={`subject[${index}]subject`} 
                      {...register(`subject.${index}.subject`)} 
                      value={"subject"}
                    />
                  </div>
                  <div className={cx(styles.selectDiv)}>
                    <Controller
                      // name="subject_teacher_id"
                      // name={`subject[${index}]teacher`} 
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
                          // defaultValue={{value: subject?.teacher?.value, label: subject?.teacher?.label}}
                          options={getTeacherOptions(allTeachersData)}
                          onChange={(data, element) => handleSubjectTeacherChange(data, element,  subject)}
                          // error={errors?.subject?.[index]?.teacher && errors?.subject?.[index]?.teacher?.message}
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