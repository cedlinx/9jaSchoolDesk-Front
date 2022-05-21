import React, {useEffect, useState, useCallback} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import cx from "classnames";
import styles from "./EditProfile.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import AuthPageContainer from "@/components/AuthPageContainer/AuthPageContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showModal } from "@/redux/ModalState/modalState.action";
import closeIcon from "@/assets/icons/closeIcon.svg";
import { Icon } from "@iconify/react";
import studentProfilePic from "@/assets/images/student-profile-pic.png";
import profileCardHeaderBg from "@/assets/images/profile-card-bg.png";
import heroImage from "@/assets/images/student-dashboard-hero-image.png";
import { useDropzone } from "react-dropzone";

import editIcon from "@/assets/icons/edit-icon.svg";

import { forgotPassword } from "@/redux/User/user.action";

import { useForm, Controller } from "react-hook-form";
import { forgotPasswordValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

const EditProfile = () => {

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

    <section className={cx(styles.editProfileContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <p>Edit Profile</p>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "editProfile" }))} icon="carbon:close-filled" color="white" />
        {/* <img src={closeIcon} alt="" /> */}
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
	  <div className={cx(styles.header)}>
          <img className={cx(styles.bgImage)} src={profileCardHeaderBg} alt="bg pic" />
          <img {...getRootProps()} className={cx(styles.profilePic)} src={imgData?.imagePreviewUrl ? imgData?.imagePreviewUrl : studentProfilePic} alt="profile pic" />
		  <img {...getRootProps()}  className={cx(styles.editIcon)}  src={editIcon} alt="" />
		  {/* <Icon icon="prime:pencil" color="white" /> */}
        </div>
        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
          className=""
        >

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label={"First Name"}
                placeholder=""
                type="email"
                error={errors?.email && errors?.email?.message}

              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label={"Last Name"}
                placeholder=""
                type="email"
                error={errors?.email && errors?.email?.message}

              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label={"Email"}
                placeholder=""
                type="email"
                error={errors?.email && errors?.email?.message}

              />
            )}
          />

          <div onClick={handleSubmit((data) => sendRequest(data))} className={cx(styles.btnDiv, "flexRow")}>
            <Button title="Save Changes" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>

     

        </form>
      </div>

    </section>
  );
};

EditProfile.propTypes = {
  title: PropTypes.string
};

export default EditProfile;