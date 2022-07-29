import React, {useEffect, useState, useCallback} from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import cx from "classnames";
import styles from "./StudentLogin.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";

import "react-toastify/dist/ReactToastify.css";
import { showModal } from "@/redux/ModalState/ModalSlice";


import { Icon } from "@iconify/react";


import { forgotPassword } from "@/redux/Auth/AuthSlice";

import { useForm, Controller } from "react-hook-form";
import { studentLoginValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import {initialsCase, titleCase} from "@/helpers/textTransform";

const StudentLogin = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalData = useSelector((state) => state.modalState.modalData);

  console.log(modalData);

  const sendRequest = (data) => {
    console.log(data);
    navigate("/student/dashboard");
    // dispatch(forgotPassword(data));
    // dispatch(showModal({ action: "show", type: "resetLinkStatus" }));
  };

  const resolver = yupResolver(studentLoginValidationSchema);

  const defaultValues = {
    password: ""
  };
  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  console.log(errors);
  
  const generateColor = () => {
    const letters = "123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };



  return (

    <section className={cx(styles.studentLoginContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "studentLogin" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
	  <div className={cx(styles.header, "flexCol")}>
          <p>{`${titleCase(modalData.firstName)} ${titleCase(modalData.lastName)}`}</p>
          {modalData.studentImage ? <img src={modalData.studentImage} alt="img" /> : <span style={{backgroundColor: generateColor()}}>{initialsCase(`${modalData.firstName} ${modalData.lastName}`)}</span> }
        </div>
        
        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
        >

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label="PASSWORD"
                placeholder="Enter Password"
                type="password"
                error={errors?.password && errors?.password?.message}
              />
            )}
          />

          <div onClick={handleSubmit((data) => sendRequest(data))} className={cx(styles.btnDiv, "flexRow")}>
            <Button title="Submit" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#D25B5D" hoverColor="#D25B5D" hoverBg="#fff" />
          </div>

     

        </form>
      </div>

    </section>
  );
};

StudentLogin.propTypes = {
  title: PropTypes.string
};

export default StudentLogin;