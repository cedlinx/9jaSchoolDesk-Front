import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import cx from "classnames";
import styles from "./SubmitAssessment.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import AuthPageContainer from "@/components/AuthPageContainer/AuthPageContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showModal } from "@/redux/ModalState/ModalSlice";
import closeIcon from "@/assets/icons/closeIcon.svg";
import { Icon } from "@iconify/react";
import UploadComponent from "@/components/UploadComponent/UploadComponent";
import studentProfilePic from "@/assets/images/student-profile-pic.png";
import profileCardHeaderBg from "@/assets/images/profile-card-bg.png";
import heroImage from "@/assets/images/student-dashboard-hero-image.png";
import editIcon from "@/assets/icons/edit-icon.svg";

import { forgotPassword } from "@/redux/Auth/AuthSlice";

import { useForm, Controller } from "react-hook-form";
import { forgotPasswordValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

const SubmitAssessment = () => {

  const dispatch = useDispatch();

  const sendRequest = (data) => {
    dispatch(forgotPassword(data));
    dispatch(showModal({ action: "show", type: "resetLinkStatus" }));
  };

  const showLoginModal = (e) => {
    e.preventDefault();
    dispatch(showModal({ action: "show", type: "logIn" }));
  };

  const resolver = yupResolver(forgotPasswordValidationSchema);

  const defaultValues = {
    email: ""
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  return (

    <section className={cx(styles.submitAssessmentContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <p>Submit Assessment</p>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "submitAssessment" }))} icon="carbon:close-filled" color="white" />
        {/* <img src={closeIcon} alt="" /> */}
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>

        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
          className={cx("flexCol")}
        >

          <UploadComponent  fileDescription="Supports pdf, docs, png, svg, jpg" />

          <div onClick={handleSubmit((data) => sendRequest(data))} className={cx(styles.btnDiv, "flexRow")}>
            <Button title="Submit" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>

     

        </form>
      </div>

    </section>
  );
};

SubmitAssessment.propTypes = {
  title: PropTypes.string
};

export default SubmitAssessment;