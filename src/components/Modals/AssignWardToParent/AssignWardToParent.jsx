import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./AssignWardToParent.module.scss";
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

import { assignGuardianToSingleStudent, getAllGuardians, getGuardianStatus } from "@/redux/Proprietor/ProprietorSlice";

import { useForm, Controller } from "react-hook-form";
import { assignWardToParentValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import useGetAllStudents from "@/utils/useGetAllStudents";



const AssignWardToParent = () => {

  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modalState.modalData);
  const allStudentsData = useGetAllStudents();

  const sendRequest = async (data) => {
    console.log(data);
    let response = await dispatch(assignGuardianToSingleStudent(data));
    if (response.payload.success) {
      dispatch(showModal({ action: "hide", type: "assignWardToParent" }));
      dispatch(getAllGuardians());
      dispatch(getGuardianStatus());
    }
  };

  const resolver = yupResolver(assignWardToParentValidationSchema);

  const defaultValues = {
    email: modalData.email,
    student_id: ""
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  const getWardsOptions = (data) => {
    console.log(data);
    let options = [];
    Array.isArray(data) && data.map((studentData) => {
      options.push({
        value: studentData.id,
        label: studentData.name
      });
    });
    return options;
  };


  return (

    <section className={cx(styles.assignWardToParentContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={() => dispatch(showModal({ action: "hide", type: "assignWardToParent" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
        <div className={cx(styles.header)}>
          <p>Add New Ward</p>
        </div>
        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
          className=""
        >


          <Controller
            name="email"
            control={control}
            render={({ field, ref }) => (
              <InputField
                {...field}
                label={"GUARDIAN EMAIL"}
                placeholder="Email"
                readOnly={true}
                error={errors?.email && errors?.email?.message}
              />
            )}
          />

          {/* <Controller
            name="studentId"
            control={control}
            render={({ field, ref }) => (
              <InputField
                {...field}
                label={"NAME"}
                placeholder="Name"
                error={errors?.studentId && errors?.studentId?.message}
              />
            )}
          /> */}

          <Controller
            name="student_id"
            control={control}
            render={({ field, ref }) => (
              <Select
                {...field}
                label={"SELECT WARD TO ATTACH"}
                defaultSelect="Select Ward"
                error={errors?.student_id && errors?.student_id?.message}
                options={getWardsOptions(allStudentsData)}
              />
            )}
          />


          <div onClick={handleSubmit((data) => sendRequest(data))} className={cx(styles.btnDiv, "flexRow")}>
            <Button title="Attach" borderRadiusType="mediumRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>

        </form>
      </div>

    </section>
  );
};

AssignWardToParent.propTypes = {
  title: PropTypes.string
};

export default AssignWardToParent;