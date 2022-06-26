import React, {useEffect, useState, useCallback} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./ViewStudentProfile.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import AuthPageContainer from "@/components/AuthPageContainer/AuthPageContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showModal } from "@/redux/ModalState/modalState.action";
import closeIcon from "@/assets/icons/closeIcon.svg";
import { Icon } from "@iconify/react";
import studentProfilePic from "@/assets/images/student-profile-pic.png";
import profileCardHeaderBg from "@/assets/images/student-profile-modal-image.png";
import heroImage from "@/assets/images/student-dashboard-hero-image.png";
import { useDropzone } from "react-dropzone";

import editIcon from "@/assets/icons/edit-icon.svg";

import { forgotPassword } from "@/redux/User/user.action";

import { useForm, Controller } from "react-hook-form";
import { forgotPasswordValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import gratitudeIcon from "@/assets/icons/gratitude-icon.svg";
import curiosityIcon from "@/assets/icons/curiosity-icon.svg";
import teamworkIcon from "@/assets/icons/teamwork-icon.svg";
import persistenceIcon from "@/assets/icons/persistence-icon.svg";

const ViewStudentProfile = () => {

  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modalState.modalData);
  console.log(modalData);

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

    <section className={cx(styles.viewStudentProfileContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "viewStudentProfile" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.content, "flexCol")}>

	      <div className={cx(styles.header)}>
          <img className={cx(styles.bgImage)} src={profileCardHeaderBg} alt="bg pic" />
          <img className={cx(styles.profilePic)} src={imgData?.imagePreviewUrl ? imgData?.imagePreviewUrl : studentProfilePic} alt="profile pic" />
        </div>

        <div className={cx(styles.body, "flexCol")}>

          <div className={cx(styles.topSection, "flexCol")}>
            <p>{modalData?.name}</p>
            <small>{modalData?.email || "janedoe@gmail.coom"}</small>
          </div>

          <div className={cx(styles.bottomSection, "flexCol")}>
            <p>Behavioural Feedback</p>
            <div className={cx(styles.behavioursDiv, "flexCol")}>
              <div><span><img src={curiosityIcon} alt="" /></span><span>Curiosity</span><span>2 pts</span></div>
              <div><span><img src={gratitudeIcon} alt="" /></span><span>Gratitude</span><span>2 pts</span></div>
              <div><span><img src={teamworkIcon} alt="" /></span><span>Teamwork</span><span>2 pts</span></div>
              <div><span><img src={persistenceIcon} alt="" /></span><span>Persistence</span><span>2 pts</span></div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

ViewStudentProfile.propTypes = {
  title: PropTypes.string
};

export default ViewStudentProfile;