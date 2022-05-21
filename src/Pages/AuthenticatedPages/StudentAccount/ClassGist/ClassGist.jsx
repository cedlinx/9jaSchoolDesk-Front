
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import cx from "classnames";
import styles from "./ClassGist.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import AuthPageContainer from "@/components/AuthPageContainer/AuthPageContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showModal } from "@/redux/ModalState/modalState.action";
import closeIcon from "@/assets/icons/closeIcon.svg";
import { Icon } from "@iconify/react";
import QuillEditor from "@/components/QuillEditor/QuillEditor";
import studentProfilePic from "@/assets/images/student-profile-pic.png";
import profileCardHeaderBg from "@/assets/images/profile-card-bg.png";
import heroImage from "@/assets/images/student-dashboard-hero-image.png";
import editIcon from "@/assets/icons/edit-icon.svg";

import { forgotPassword } from "@/redux/User/user.action";

import { useForm, Controller } from "react-hook-form";
import { forgotPasswordValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";


const ClassGist = () => {

  const resolver = yupResolver(forgotPasswordValidationSchema);

  const defaultValues = {
    email: ""
  };
  
  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });
    
  return (
    <div className={cx(styles.classGistContainer, "flexCol")}>
    
      <div className={cx(styles.formWrapper, "flexCol")}>

        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
          className={cx("flexCol")}
        >
          <QuillEditor placeholder="Tell us what is happening" />

          <div onClick={handleSubmit((data) => sendRequest(data))} className={cx(styles.btnDiv, "flexRow")}>
            <Button title="Post" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>
        </form>
      </div>

      <div className={cx(styles.body, "flexCol")}>

        <div className={cx(styles.postContainer, "flexCol")}>
          <div className={cx(styles.header, "flexRow")}>
            <div className={cx(styles.userImageDiv)}>
              <img src={studentProfilePic} alt="thumbnail" />
            </div>
            <p>John Doe</p>
          </div>

          <p className={cx(styles.introText)}>This topic Circle Theorem seems very interesting and tough at the same time. 
Let’s see how it gets over time</p>

          <div className={cx(styles.courseCoverImageDiv)}>
            <img src={profileCardHeaderBg} alt="course preview" />
          </div>

          <InputField
            placeholder={" "}
            label={"Leave a comment"}
            type="text"
            error={errors?.name && errors?.name?.message}
          />
        </div>

      </div>
    </div>
  );
};

export default ClassGist;