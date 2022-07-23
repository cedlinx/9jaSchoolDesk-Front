import React, {useEffect, useState, useCallback} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./AddPerformanceIndicator.module.scss";
import Button from "@/components/Button/Button";
import Select from "@/components/Select/Select";
import InputField from "@/components/Input/Input";
import AuthPageContainer from "@/components/AuthPageContainer/AuthPageContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showModal } from "@/redux/ModalState/ModalSlice";
import closeIcon from "@/assets/icons/closeIcon.svg";
import { Icon } from "@iconify/react";
import studentProfilePic from "@/assets/images/student-profile-pic.png";
import profileCardHeaderBg from "@/assets/images/profile-card-bg.png";
import heroImage from "@/assets/images/student-dashboard-hero-image.png";
import { useDropzone } from "react-dropzone";

import editIcon from "@/assets/icons/edit-icon.svg";

import { forgotPassword } from "@/redux/Auth/AuthSlice";

import { useForm, Controller } from "react-hook-form";
import { forgotPasswordValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

const AddPerformanceIndicator = () => {

  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modalState.modalData);

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

    <section className={cx(styles.addPerformanceIndicatorContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "addPerformanceIndicator" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
	  <div className={cx(styles.header)}>
          <p>Add Indicator</p>
        </div>
        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
          className=""
        >

          <Controller
            name="studentId"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label={"INDICATOR NAME"}
                placeholder="Name"
                error={errors?.studentId && errors?.studentId?.message}
              />
            )}
          />

          <div className={cx(styles.imageSection, "flexRow")}>
            <p>Upload Image</p>
            <div {...getRootProps()}  className={cx(styles.imageDiv)}>
              {imgData?.imagePreviewUrl ? <img src={imgData?.imagePreviewUrl ? imgData?.imagePreviewUrl : studentProfilePic} alt="" />
                :
                <Icon  icon="bx:upload" color="#d25b5d" width="28" height="28"/>              
              }
            </div>
          </div>
  
    
          <div onClick={handleSubmit((data) => sendRequest(data))} className={cx(styles.btnDiv, "flexRow")}>
            <Button title="Save" borderRadiusType="mediumRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>

        </form>
      </div>

    </section>
  );
};

AddPerformanceIndicator.propTypes = {
  title: PropTypes.string
};

export default AddPerformanceIndicator;