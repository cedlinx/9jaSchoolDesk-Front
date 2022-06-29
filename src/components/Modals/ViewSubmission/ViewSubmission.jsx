import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./ViewSubmission.module.scss";
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

import SelectField from "@/components/Select/Select";
import TextArea from "@/components/TextInput/TextInput";

import { forgotPassword } from "@/redux/Auth/AuthSlice";

import { useForm, Controller } from "react-hook-form";
import { forgotPasswordValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import singleSubmissionIcon from "@/assets/icons/single-submission-icon.svg";
import Accordion from "@/components/SubmissionAccordion/Accordion";


const ViewSubmission = () => {

  const dispatch = useDispatch();

  const sendRequest = (data) => {
    dispatch(forgotPassword(data));
    dispatch(showModal({ action: "show", type: "resetLinkStatus" }));
  };
  const modalData = useSelector((state) => state.modalState.modalData);
  console.log(modalData);

  const resolver = yupResolver(forgotPasswordValidationSchema);

  const defaultValues = {
    email: ""
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  const [imgData, setImgData] = useState({
    file: "",
    imagePreviewUrl: ""
  });

  const accordionData = [
    {
      title: "Submission 1"
    },
    {
      title: "Submission 2"
    },
    {
      title: "Submission 3"
    },
    {
      title: "Submission 4"
    },
    {
      title: "Submission 1"
    },
    {
      title: "Submission 2"
    },
    {
      title: "Submission 3"
    },
    {
      title: "Submission 4"
    },
    {
      title: "Submission 1"
    },
    {
      title: "Submission 2"
    },
    {
      title: "Submission 3"
    },
    {
      title: "Submission 4"
    }
  ];

  return (

    <section className={cx(styles.viewSubmissionContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "viewSubmission" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
        <h3>View Submission</h3>

        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
          className={cx("flexCol")}
        >

          <div className={cx(styles.wrapper, "row", "g-0")}>
            <div className={cx(styles.leftSection, "col-sm-12", "col-md-12", "col-lg-6", "flexCol")}>
              
              <label htmlFor="category">Task Category</label>
              <p>{"Category Here"}</p>

              <label htmlFor="category">Task</label>
              <p>{modalData?.task}</p>

              <label htmlFor="category">Assigned To</label>
              <p><img src="" alt="img" />{modalData?.assignedTo?.name}</p>

            

            </div>
            <div className={cx(styles.rightSection, "col-sm-12", "col-md-12", "col-lg-6")}>

              {<div className={cx(styles.singleSubmissionDiv)}>
                <small>Submission</small>
                <p>
                  <img src={singleSubmissionIcon} alt="icon" />
                  <span>{"document name"}</span>
                  <Icon icon="bi:download" color="#d25b5d" />
                </p>

                <label htmlFor="feedback">Feedback</label>
                <div className={cx(styles.textAreaDiv, "flexCol")}>
                  <TextArea 
                    placeholder={"Leave a feedback for the student"}
                  />
                  <Button  title="Send" bgColor="#BDBDBD" textColor="#fff" />
                </div>
              
              </div>}

              {
                <div className={cx(styles.multiSubmissionDiv)}>
                  <p>Submissions <span>Download All</span> </p>
                  <div className={cx(styles.accordionWrapper)}>
                    <Accordion accordionArray={accordionData} />
                  </div>
                </div>
              }

            </div>
          </div>

        </form>
      </div>

    </section>
  );
};

ViewSubmission.propTypes = {
  title: PropTypes.string
};

export default ViewSubmission;