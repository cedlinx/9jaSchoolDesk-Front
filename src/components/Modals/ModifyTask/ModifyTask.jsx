import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./ModifyTask.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import SelectField from "@/components/Select/Select";
import TextArea from "@/components/TextInput/TextInput";
import fileIcon from "@/assets/icons/file-icon.svg";
import videoIcon from "@/assets/icons/video-icon.svg";
import { useDropzone } from "react-dropzone";

import { useForm, Controller } from "react-hook-form";
import { modifyTaskValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { modifyTask, getAllTasks } from "@/redux/Teacher/TeacherSlice";
import SelectAutoComplete from "@/components/SelectAutoComplete";
import useGetClassDetails from "@/utils/useGetClassDetails";


const ModifyTask = () => {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.teacher.loading);
  const modalData = useSelector((state) => state.modalState.modalData);
  const schoolSubjects = useGetClassDetails().subjects;
  const classStudents = useGetClassDetails().students;

  console.log(modalData);

  const sendRequest = async (data) => {
    console.log(data);
    let selected_audience_ids = [];
    Array.isArray(data.selected_audience) && data.selected_audience.map(item => {
      selected_audience_ids.push(item.value);
    });

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("id", modalData.id);
    formData.append("type", data.type);
    // formData.append("format", data.format);
    formData.append("status", data.status);
    // formData.append("audience", data.audience === "0" ? 0 : selected_audience_ids);
    // formData.append("audience", data.audience);
    formData.append("due_date", data.due_date);
    formData.append("attachment", uploadedFile.file);

    let response = await dispatch(modifyTask(formData));

    if (response.payload.success) {
      dispatch(showModal({ action: "hide", type: "modifyTask" }));
      dispatch(getAllTasks());
    }
  };

  const resolver = yupResolver(modifyTaskValidationSchema);

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

  useEffect(() => {
    reset({
      name: modalData?.name,
      type: modalData?.type,
      subject_id: modalData?.subject_id,
      format: modalData?.format,
      status: modalData?.status,
      audience: modalData?.audience,
      due_date: modalData?.due_date,
      attachment: modalData?.attachment
    });

  }, [modalData, reset]);

  const [uploadedFile, setUploadedFile] = useState({
    file: "",
    imagePreviewUrl: "", 
    type: ""
  });

  const onDrop = useCallback(acceptedFiles => {
    let file = (acceptedFiles[0]);
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedFile({ file: file, imagePreviewUrl: reader.result, type: file.type.split("/")[0]});
    };
    reader.readAsDataURL(file);
  }, []);

  const { getInputProps, getRootProps } = useDropzone({ onDrop });

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

  const removeAttachment = () => {
    setUploadedFile({
      file: "",
      imagePreviewUrl: "", 
      type: ""
    });
  };


  return (

    <section className={cx(styles.modifyTaskContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={() => dispatch(showModal({ action: "hide", type: "" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
        <h3 className={cx(styles.title)}>Modify Activity</h3>

        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
          className={cx("flexCol")}
        >

          <div className={cx(styles.wrapper, "row", "g-0")}>
            <div className={cx(styles.leftSection, "col-sm-12", "col-md-12", "col-lg-6", "flexCol")}>

              <Controller
                name="subject_id"
                control={control}
                render={({ field, ref }) => (
                  <SelectField
                    {...field}
                    label="Subject"
                    defaultSelect="Select Subject"
                    options={getSubjectsOptions()}
                    disabled
                    marginbottom="1.5rem"
                    error={errors?.subject_id && errors?.subject_id?.message}
                  />
                )}
              />

              <Controller
                name="name"
                control={control}
                render={({ field, ref }) => (
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
                render={({ field, ref }) => (
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
                render={({ field, ref }) => (
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
                render={({ field, ref }) => (
                  <SelectField
                    {...field}
                    label={"Audience"}
                    defaultSelect="Select Audience"
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
                  render={({ field, ref }) => (
                    <SelectAutoComplete
                      {...field}
                      // label={"Select Student"}
                      isMulti={true}
                      isClearable={true}
                      placeholder=""
                      options={[{ value: "1", label: "johndoe22@gmail.com" }, { value: "0", label: "johndoe22@gmail.com" }, { value: "2", label: "tamsay@gmail.com" }, { value: "3", label: "johndoe22@gmail.com" }]}
                      marginbottom="1.5rem"
                      error={errors?.selected_audience && errors?.selected_audience?.message}
                    />
                  )}
                />} */}

              <Controller
                name="status"
                control={control}
                render={({ field, ref }) => (
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


              <div className={cx(styles.imageSection, "flexCol")}>
                <div className={cx(styles.top, "flexRow")}>
                  {uploadedFile?.imagePreviewUrl && <div {...getRootProps()} className={cx(styles.imageDiv)}>
                    <img src={uploadedFile?.type === "image" ? uploadedFile?.imagePreviewUrl : uploadedFile?.type === "video" ? videoIcon : fileIcon} alt="" />
                  </div>}

                  <Button {...getRootProps()}  title="Attach File" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" hoverBg="#D25B5D" hoverColor="#fff" />

                  <Button onClick={()=>removeAttachment()} type title="Remove" borderRadiusType="fullyRounded" textColor="#828282" bgColor="#fff" bordercolor="#828282" hoverBg="#828282" hoverColor="#fff" />
                </div>
                <small>{uploadedFile?.file.name}</small>
              </div>

              <Controller
                name="due_date"
                control={control}
                render={({ field, ref }) => (
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


          <div  className={cx(styles.btnDiv, "flexRow")}>
            <Button onClick={handleSubmit((data) => sendRequest(data))} loading={loading} disabled={loading} title="Submit" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>



        </form>
      </div>

    </section>
  );
};

export default ModifyTask;