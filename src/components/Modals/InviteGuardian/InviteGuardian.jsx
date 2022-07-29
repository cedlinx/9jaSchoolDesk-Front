import React, {useEffect, useState, useCallback} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./InviteGuardian.module.scss";
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

import { inviteGuardian } from "@/redux/Proprietor/ProprietorSlice";

import { useForm, Controller } from "react-hook-form";
import { inviteGuardianValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@/components/TextInput/TextInput";

const InviteGuardian = () => {

  const dispatch = useDispatch();

  const sendRequest = async (data) => {
    let response = await dispatch(inviteGuardian(data));
    if(response.payload.success){
      dispatch(showModal({ action: "hide", type: "inviteGuardian" }));
    }
  };

  const resolver = yupResolver(inviteGuardianValidationSchema);

  const defaultValues = {
    email: "",
    name: "",
    message: ""
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  return (

    <section className={cx(styles.inviteGuardianContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "inviteGuardian" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
	  <div className={cx(styles.header)}>
          <p>Invite Parent</p>
        </div>
        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
        >

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label={"Name"}
                placeholder="Name"
                error={errors?.name && errors?.name?.message}
                options={[{label: "", value: ""}]}
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
                placeholder="Enter Email"
                error={errors?.email && errors?.email?.message}
                options={[{label: "", value: ""}]}
              />
            )}
          />

          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder="Enter Message"
                error={errors?.message && errors?.message?.message}
              />
            )}
          />


          <div onClick={handleSubmit((data) => sendRequest(data))} className={cx(styles.btnDiv, "flexRow")}>
            <Button title="Invite" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>

     

        </form>
      </div>

    </section>
  );
};

InviteGuardian.propTypes = {
  title: PropTypes.string
};

export default InviteGuardian;