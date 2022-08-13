import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./AddTask.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import SelectField from "@/components/Select/Select";
import TextArea from "@/components/TextInput/TextInput";

import { useDropzone } from "react-dropzone";

import { useForm, Controller } from "react-hook-form";
import { addNewTaskValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { addTask, getAllTasks } from "@/redux/Teacher/TeacherSlice";
import SelectAutoComplete from "@/components/SelectAutoComplete";

import useGetClassDetails from "@/utils/useGetClassDetails";


const AddTask = () => {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.teacher.loading);
  const schoolSubjects = useGetClassDetails().subjects;
  const classStudents = useGetClassDetails().students;


  const sendRequest = async (data) => {
    console.log(data);
    let selected_audience_ids = [];
    Array.isArray(data.selected_audience) && data.selected_audience.map(item => {
      selected_audience_ids.push(item.value);
    });

    console.log(selected_audience_ids);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("subject_id", data.subject_id);
    formData.append("type", data.type);
    // formData.append("format", data.format);
    formData.append("status", data.status);
    // formData.append("audience", data.audience === "0" ? [0] : selected_audience_ids);
    // formData.append("audience", data.audience);
    formData.append("due_date", data.due_date);
    formData.append("attachment", imgData.file);

    let response = await dispatch(addTask(formData));

    if (response.payload.success) {
      dispatch(showModal({ action: "hide", type: "addTask" }));
      dispatch(getAllTasks());
    }
  };

  const resolver = yupResolver(addNewTaskValidationSchema);

  const defaultValues = {
    name: "",
    type: "",
    subject_id: "",
    format: "",
    status: "",
    audience: "",
    due_date: "",
    attachment: ""
  };

  const { handleSubmit, register, formState: { errors }, setValue, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

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

  const [displayStudentSelector, setDisplayStudentSelector] = useState(false);

  const setAudienceType = (e) => {
    let audience = e.target.value;
    setValue("audience", audience);

    if (audience === "1") {
      setDisplayStudentSelector(true);
    }
    else {
      setDisplayStudentSelector(false);
    }

  };

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

  const getStudentsOptions = () => {
    let options = [];
    Array.isArray(classStudents) && classStudents.map((student) => {
      options.push({
        value: student.id,
        label: `${student.firstName} ${student.lastName}`
      });
    });
    return options;
  };

  return (

    <section className={cx(styles.addTaskContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={() => dispatch(showModal({ action: "hide", type: "addTask" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
        <h3 className={cx(styles.title)}>Create Activity</h3>

        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
          className={cx("flexCol")}
        >

          <div className={cx(styles.wrapper, "row", "g-0")}>
            <div className={cx(styles.leftSection, "col-sm-12", "col-md-12", "col-lg-6", "flexCol")}>

              <Controller
                name="subject_id"
                control={control}
                render={({ field }) => (
                  <SelectField
                    {...field}
                    label="Subject"
                    defaultSelect="Select Subject"
                    options={getSubjectsOptions()}
                    marginbottom="1.5rem"
                    error={errors?.subject_id && errors?.subject_id?.message}
                  />
                )}
              />

              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <InputField
                    {...field}
                    placeholder={" "}
                    label={"Task Name"}
                    type="text"
                    error={errors?.name && errors?.name?.message}

                  />
                )}
              />

              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <SelectField
                    {...field}
                    label={"Task Type"}
                    defaultSelect="Select Task Type"
                    options={[{ value: "assignment", label: "Assignment" }, { value: "assessment", label: "Assessment" }]}
                    marginbottom="1.5rem"
                    error={errors?.type && errors?.type?.message}
                  />
                )}
              />

              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    placeholder={"Enter Description"}
                    marginbottom="1.5rem"
                    error={errors?.description && errors?.description?.message}
                  />
                )}
              />


            </div>
            <div className={cx(styles.rightSection, "col-sm-12", "col-md-12", "col-lg-6")}>

              {/* <Controller
                name="audience"
                control={control}
                render={({ field }) => (
                  <SelectField
                    {...field}
                    label={"Assign To"}
                    defaultSelect="Select "
                    options={[{ value: "0", label: "Assign to entire class" }, { value: "1", label: "Assign to selected student(s)" }]}
                    onChange={(e) => setAudienceType(e)}
                    marginbottom="1.5rem"
                    error={errors?.audience && errors?.audience?.message}
                  />
                )}
              />

              {displayStudentSelector &&
                <Controller
                  name="selected_audience"
                  control={control}
                  render={({ field }) => (
                    <SelectAutoComplete
                      {...field}
                      // label={"Select Student"}
                      isMulti={true}
                      isClearable={true}
                      placeholder=""
                      options={getStudentsOptions()}
                      marginbottom="1.5rem"
                      error={errors?.selected_audience && errors?.selected_audience?.message}
                    />
                  )}
                />} */}

              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <SelectField
                    {...field}
                    label={"Status"}
                    defaultSelect="Select Status"
                    options={[{ value: "1", label: "Enabled" }, { value: "0", label: "Disabled" }]}
                    marginbottom="1.5rem"
                    error={errors?.status && errors?.status?.message}
                  />
                )}
              />
              {/* <div>
                <label style={{ fontSize: "1rem" }} htmlFor="docType">Response Type</label>
                <div className={cx(styles.radioButtonGroup, "flexRow")}>
                  <span><input name='docType' type="radio" value="image" {...register("format")} /> Image
                  </span>
                  <span> <input name='docType' type="radio" value="document" {...register("format")} /> Document</span>
                </div>
                {errors?.format && <span style={{ color: "red", fontSize: "0.875rem" }}>{errors?.format?.message}</span>}
              </div> */}


              <div className={cx(styles.imageSection, "flexRow")}>
                <div {...getRootProps()} className={cx(styles.imageDiv)}>
                  <img src={imgData?.imagePreviewUrl ? imgData?.imagePreviewUrl : null} alt="" />
                </div>

                <Button {...getRootProps()} type title="Attach File" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" hoverBg="#D25B5D" hoverColor="#fff" />

                <Button type title="Remove" borderRadiusType="fullyRounded" textColor="#828282" bgColor="#fff" bordercolor="#828282" hoverBg="#828282" hoverColor="#fff" />
              </div>

              <Controller
                name="due_date"
                control={control}
                render={({ field }) => (
                  <InputField
                    {...field}
                    placeholder={" "}
                    label={"Due Date"}
                    type="date"
                    error={errors?.due_date && errors?.due_date?.message}
                  />
                )}
              />

            </div>
          </div>


          <div onClick={handleSubmit((data) => sendRequest(data))} className={cx(styles.btnDiv, "flexRow")}>
            <Button loading={loading} disabled={loading} title="Submit" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>



        </form>
      </div>

    </section>
  );
};

export default AddTask;