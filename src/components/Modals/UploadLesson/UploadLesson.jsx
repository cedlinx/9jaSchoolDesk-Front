import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import cx from "classnames";
import styles from "./UploadLesson.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
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
import { forgotPasswordValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

const UploadLesson = () => {

  const dispatch = useDispatch();

  const sendRequest = (data) => {
    dispatch(forgotPassword(data));
    dispatch(showModal({ action: "show", type: "resetLinkStatus" }));
  };

  const resolver = yupResolver(forgotPasswordValidationSchema);

  const defaultValues = {
    email: ""
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  const [imgData, setImgData] = useState({
    file: "",
    imagePreviewUrl: ""
  });

  const onDrop = useCallback(acceptedFiles => {
    let file = (acceptedFiles[0]);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgData({file: file, imagePreviewUrl: reader.result});
    };
    reader.readAsDataURL(file);
  }, []);

  const { getInputProps, getRootProps } = useDropzone({ onDrop, accept: "image/*" });

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

              <div className={cx(styles.radioButtonGroup, "flexRow")}>
                <span><input name='docType' type="radio" /> Video
                </span>
                <span> <input name='docType' type="radio" /> Document</span>
              </div>

              <div {...getRootProps()} className={cx(styles.fileUploadDiv, "flexRow-fully-centered")}>
                Drop your files here or click to upload
              </div>

              <div className={cx(styles.thumbnailDiv)}>
                <p>Upload Thumbnail image <Icon {...getRootProps()} icon="bi:upload" color="#d25b5d" /></p>
                <small>png, jpg, svg 120x120</small>
              </div>

            </div>
            <div className={cx(styles.rightSection, "col-sm-12", "col-md-12", "col-lg-6")}>
              <InputField
                label="Lesson Topic"
              />
              <InputField 
                label="Lesson Subject"
            
              />
              <InputField 
                label="Lesson accessible on"
                type="date"
              />
            </div>
          </div>


          <div onClick={handleSubmit((data) => sendRequest(data))} className={cx(styles.btnDiv, "flexRow")}>
            <Button title="Submit" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
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