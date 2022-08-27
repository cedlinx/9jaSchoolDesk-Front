import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./ChangeTaskStatus.module.scss";
import Button from "@/components/Button/Button";
import "react-toastify/dist/ReactToastify.css";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import { titleCase } from "@/helpers/textTransform";
import { enableAndDisableTask, getAllTasks } from "@/redux/Teacher/TeacherSlice";


const ChangeTaskStatus = () => {

  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modalState.modalData);
  const loading = useSelector((state) => state.teacher.loading);
  console.log(modalData);
  let action = modalData.action;

  console.log(modalData);

  const sendRequest = async () => {
    if (action === "enable") {
      let response = await dispatch(enableAndDisableTask({status: 1, ids: [modalData.data.id]}));
      console.log(response);
      if(response.payload.success){
        dispatch(showModal({ action: "hide" }));
        dispatch(getAllTasks());
      }
    } else {
      let response = await dispatch(enableAndDisableTask({status: 0, ids: [modalData.data.id]}));
      console.log(response);

      if(response.payload.success){
        dispatch(showModal({ action: "hide"}));
        dispatch(getAllTasks());

      }
    }
  };



  return (

    <section className={cx(styles.changeTaskStatusContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={() => dispatch(showModal({ action: "hide", type: "" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
        <div className={cx(styles.header, "flexCol")}>
          <p>{titleCase(action)} Task</p>
        </div>

        <div style={{ textAlign: "center" }}>
          Are you sure you want to {action} this task?
        </div>

        <div className={cx(styles.btnGroup, "flexRow")}>
          <Button onClick={() => dispatch(showModal({ action: "hide", type: "" }))} type title="Cancel" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" />
          <Button loading={loading} disabled={loading} onClick={()=>sendRequest()} type title={titleCase(action)} borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
        </div>

      </div>

    </section>
  );
};

ChangeTaskStatus.propTypes = {
  title: PropTypes.string
};

export default ChangeTaskStatus;