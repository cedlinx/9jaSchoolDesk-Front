import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./UploadLesson.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import SelectField from "@/components/Select/Select";
import TextArea from "@/components/TextInput/TextInput";

import AuthPageContainer from "@/components/AuthPageContainer/AuthPageContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showModal } from "@/redux/ModalState/ModalSlice";
import closeIcon from "@/assets/icons/closeIcon.svg";
import { Icon } from "@iconify/react";
import QuillEditor from "@/components/QuillEditor/QuillEditor";
import studentProfilePic from "@/assets/images/student-profile-pic.png";
import profileCardHeaderBg from "@/assets/images/profile-card-bg.png";
import heroImage from "@/assets/images/student-dashboard-hero-image.png";
import editIcon from "@/assets/icons/edit-icon.svg";

import { useDropzone } from "react-dropzone";


import { forgotPassword } from "@/redux/Auth/AuthSlice";

import { useForm, Controller } from "react-hook-form";
import { uploadLessonValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { createLesson, getClassLessons } from "@/redux/Teacher/TeacherSlice";
import useGetClassID from "@/utils/useGetClassID";
import useGetClassDetails from "@/utils/useGetClassDetails";


const UploadLesson = () => {

  const dispatch = useDispatch();
  const class_id = useGetClassID();
  const schoolSubjects = useGetClassDetails().subjects;
  const loading = useSelector((state) => state.teacher.loading);

  const sendRequest = async (data) => {
    
    const formData = new FormData();
    formData.append("topic", data.topic);
    formData.append("description", data.description);
    formData.append("date", data.date);
    uploadedFile.file && formData.append("type", uploadedFile.file.type.split("/")[0]);
    formData.append("class_id", class_id);
    // formData.append("teacher_id", data.teacher_id);
    formData.append("subject_id", data.subject_id);
    // formData.append("format", data.format);
    // formData.append("status", data.status);
    formData.append("attachment", uploadedFile.file);
    formData.append("thumbnail", uploadedFile.thumbnailFile);

    let response = await dispatch(createLesson(formData));
    
    if (response.payload.success) {
      dispatch(showModal({ action: "hide", type: "uploadLesson" }));
      dispatch(getClassLessons({class_id}));
    }
  };

  const resolver = yupResolver(uploadLessonValidationSchema);

  const defaultValues = {
    topic: "",
    description: "",
    date: "",
    type: "",
    subject_id: "",
    status: "",
    thumbnail: "",
    video: "",
    attachment: ""
  };

  const { handleSubmit, register, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  
  const [uploadedFile, setUploadedFile] = useState({
    file: "",
    imagePreviewUrl: "",
    thumbnailFile: "",
    thumbnailPreviewUrl: ""
  });

  const onDrop = useCallback(acceptedFiles => {
    let file = (acceptedFiles[0]);
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedFile((prev) =>({...prev, file: file, imagePreviewUrl: reader.result}));
    };
    reader.readAsDataURL(file);
  }, []);

  const onThumbnailDrop = useCallback(acceptedFiles => {
    let thumbnailFile = (acceptedFiles[0]);
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedFile((prev)=>({...prev, thumbnailFile: thumbnailFile, thumbnailPreviewUrl: reader.result}));
    };
    reader.readAsDataURL(thumbnailFile);
  }, []);

  const { getInputProps, getRootProps } = useDropzone({ onDrop });
  const { getRootProps : getThumbnailRootProps } = useDropzone({ onDrop: onThumbnailDrop });

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

  return (

    <section className={cx(styles.uploadLessonContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "uploadLesson" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
        <h3>Upload Lesson</h3>

        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
          className={cx("flexCol")}
        >

          <div className={cx(styles.wrapper, "row", "g-0")}>
            <div className={cx(styles.leftSection, "col-sm-12", "col-md-12", "col-lg-6", "flexCol")}>

              {/* <div>
                <label style={{ fontSize: "1rem" }} htmlFor="docType">Response Type</label>
                <div className={cx(styles.radioButtonGroup, "flexRow")}>
                  <span><input name='docType' type="radio" value="video" {...register("type")} /> Video
                  </span>
                  <span> <input name='docType' type="radio" value="document" {...register("type")} /> Document</span>
                </div>
                {errors?.type && <span style={{ color: "red", fontSize: "0.875rem" }}>{errors?.type?.message}</span>}
              </div> */}

              <div {...getRootProps()} {...register("attachment")} className={cx(styles.fileUploadDiv, "flexRow-fully-centered")}>
                {uploadedFile.imagePreviewUrl ? <img src={uploadedFile.imagePreviewUrl} alt="preview" /> : <span>Drop your files here or click to upload</span>}
              </div>

              <div className={cx(styles.thumbnailDiv, "flexCol")}>
                <p>Upload Thumbnail image <Icon {...getThumbnailRootProps()} icon="bi:upload" color="#d25b5d" /></p>
                {uploadedFile.thumbnailPreviewUrl ? <img {...getThumbnailRootProps()} {...register("thumbnail")} src={uploadedFile.thumbnailPreviewUrl} alt="preview" /> : null}
                <small>png, jpg, svg 120x120</small>
              </div>

            </div>
            <div className={cx(styles.rightSection, "col-sm-12", "col-md-12", "col-lg-6")}>
              <Controller
                name="topic"
                control={control}
                render={({ field, ref }) => (
                  <InputField
                    {...field}
                    placeholder={" "}
                    label="Lesson Topic"
                    type="text"
                    error={errors?.topic && errors?.topic?.message}
                  />
                )}
              />

              <Controller
                name="subject_id"
                control={control}
                render={({ field, ref }) => (
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

              <Controller
                name="date"
                control={control}
                render={({ field, ref }) => (
                  <InputField
                    {...field}
                    placeholder={" "}
                    label="Lesson accessible on"
                    type="date"
                    error={errors?.date && errors?.date?.message}
                  />
                )}
              />
            </div>
          </div>


          <div onClick={handleSubmit((data) => sendRequest(data))} className={cx(styles.btnDiv, "flexRow")}>
            <Button loading={loading} disabled={loading} title="Submit" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>

     

        </form>
      </div>

    </section>
  );
};

UploadLesson.propTypes = {
  title: PropTypes.string
};

export default UploadLesson;