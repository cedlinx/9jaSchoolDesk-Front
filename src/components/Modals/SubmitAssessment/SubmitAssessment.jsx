import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cx from "classnames";
import styles from "./SubmitAssessment.module.scss";
import Button from "@/components/Button/Button";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import { submitTask } from "@/redux/Student/StudentSlice";


const SubmitAssessment = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalData = useSelector((state) => state.modalState.modalData);
  const loading = useSelector((state) => state.student.loading);
  

  const sendRequest = async () => {
    let formData = new FormData();
    modalData?.data?.solution && formData.append("solution", modalData?.data?.solution);
    modalData?.attachment && formData.append("attachment", modalData?.attachment);
    formData.append("studentID", modalData?.taskData?.pivot?.student_id);
    formData.append("task_id", modalData?.taskData?.id);
    
    let response = await dispatch(submitTask(formData));
    
    if(response.payload.success){
      dispatch(showModal({ action: "hide"}));
      navigate("/student/tasks");
    }
  };

  return (

    <section className={cx(styles.submitAssessmentContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "submitAssessment" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
        <div className={cx(styles.header, "flexCol")}>
          <p>Submit Task</p>
        </div>

        <div style={{textAlign: "center"}}>
        Are you sure you want to submit this task?
        </div>

        <div className={cx(styles.btnGroup, "flexRow")}>
          <Button onClick={() => dispatch(showModal({action: "hide", type: "submitAssessment"}))} type title="Cancel" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" />

          <Button loading={loading} onClick={()=> sendRequest()} type="button" title="Submit" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
        </div>

      </div>

    </section>
  );
};

export default SubmitAssessment;