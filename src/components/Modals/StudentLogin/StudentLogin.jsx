import React, {useEffect, useState, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import cx from "classnames";
import styles from "./StudentLogin.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";

import "react-toastify/dist/ReactToastify.css";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import { validatePin } from "@/redux/Auth/AuthSlice";

import { useForm, Controller } from "react-hook-form";
import { studentLoginValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import {initialsCase, titleCase} from "@/helpers/textTransform";
import generateColor from "@/helpers/generateColor";
import { getDashboard } from "@/redux/Student/StudentSlice";


const StudentLogin = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalData = useSelector((state) => state.modalState.modalData);
  const loading = useSelector((state) => state.auth.loading);
  let classCode = modalData?.dashboard_url.split("/")[8];

  const sendRequest = async (data) => {
    
    localStorage.setItem("loggedInStudentID", modalData.id);
    localStorage.setItem("loggedInStudentClassCode", classCode);
    localStorage.setItem("userData", JSON.stringify(modalData));

    let response = await dispatch(validatePin({pin: data.pin, student_id: modalData.id}));
    
    if(response.payload.success){
      const studentID = localStorage.getItem("loggedInStudentID");

      let dashboardRequest = await dispatch(getDashboard({id: studentID, classCode: classCode}));

      if( dashboardRequest.payload.success){
        navigate("/student/dashboard", {state: {studentID: modalData?.id}});
        dispatch(showModal({action: "hide"}));
      }
    }
  };

  const resolver = yupResolver(studentLoginValidationSchema);

  const defaultValues = {
    pin: ""
  };
  const { handleSubmit, formState: { errors }, control, setValue } = useForm({ defaultValues, resolver, mode: "all" });

  const handleNumberInputChange = (e, inputName) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    setValue(inputName, value);
  };
  
  return (

    <section className={cx(styles.studentLoginContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "studentLogin" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
	      <div className={cx(styles.header, "flexCol")}>
          <p>{`${titleCase(modalData.firstName)}${titleCase(modalData.lastName)}`}</p>
          {
            modalData.avatar ? 
              <img src={modalData.avatar} alt="img" /> : <span style={{backgroundColor: generateColor()}}>{initialsCase(`${modalData.firstName} ${modalData.lastName}`)}</span> 
          }
        </div>
        
        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
        >
          <Controller
            name="pin"
            control={control}
            render={({ field, ref }) => (
              <InputField
                {...field}
                label="PIN"
                placeholder="Enter Pin"
                type="password"
                error={errors?.pin && errors?.pin?.message}
                inputRef={ref}
                onChange={(e) => handleNumberInputChange(e, "pin")}
                maxLength={4}
              />
            )}
          />

          <div className={cx(styles.btnDiv, "flexRow")}>
            <Button onClick={handleSubmit((data) => sendRequest(data))} loading={loading} disabled={loading} title="Submit" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#D25B5D" hoverColor="#D25B5D" hoverBg="#fff" />
          </div>
        </form>
      </div>

    </section>
  );
};

export default StudentLogin;