import React, {useEffect, useState, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import cx from "classnames";
import styles from "./RateTeacher.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";

import "react-toastify/dist/ReactToastify.css";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import { rateTeacherByGuardian } from "@/redux/Guardian/GuardianSlice";
import { rateTeacherByStudent } from "@/redux/Student/StudentSlice";

import { useForm, Controller } from "react-hook-form";
import { rateTeacherValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import {initialsCase, titleCase} from "@/helpers/textTransform";
import generateColor from "@/helpers/generateColor";
import { getDashboard } from "@/redux/Student/StudentSlice";
import useGetLoggedInUser from "@/utils/useGetLoggedInUser";
import useGetUser from "@/utils/useGetUser";
import TextInput from "@/components/TextInput/TextInput";



const RateTeacher = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalData = useSelector((state) => state.modalState.modalData);
  const userDetails = useGetLoggedInUser();
  const loading = useSelector((state) => state.student.loading);
  const user = useGetUser();
  console.log(userDetails);
  console.log(modalData);

  const sendRequest = async (data) => {
    console.log(data);
    
    let response = user === "student" ? await dispatch(rateTeacherByStudent({rating : modalData?.rating, teacher_id: modalData?.teacherData?.id, comment: data?.comment, user_id: modalData?.studentID})) : await dispatch(rateTeacherByGuardian({rating : modalData?.rating, teacher_id: modalData?.teacherData?.id, comment: data?.comment, user_id: modalData?.guardianID}));
    console.log(response);
    if(response.payload.success){
      dispatch(showModal({ action: "hide", type: "rateTeacher" }));
      dispatch(getDashboard());
    }
  };

  const resolver = yupResolver(rateTeacherValidationSchema);

  const defaultValues = {
    comment: ""
  };
  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  console.log(errors);
  
  return (

    <section className={cx(styles.rateTeacherContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
	  <div className={cx(styles.header, "flexCol")}>
          <p>Rate Teacher</p>
          {/* <p>{`${titleCase(modalData.firstName)} ${titleCase(modalData.lastName)}`}</p>
          {modalData.studentImage ? <img src={modalData.studentImage} alt="img" /> : <span style={{backgroundColor: generateColor()}}>{initialsCase(`${modalData.firstName} ${modalData.lastName}`)}</span> } */}
        </div>
        
        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
        >

          <Controller
            name="comment"
            control={control}
            render={({ field, ref }) => (
              <TextInput
                {...field}
                label="COMMENT"
                placeholder="Enter Comment Here"
                type="text"
                error={errors?.comment && errors?.comment?.message}
                inputRef={ref}
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

export default RateTeacher;